/*
 * Step 8 of the BambooHR payroll pull: Code by Zapier, "Run JavaScript".
 * Written 2026-09-07. NOT yet verified against a live run - see SKILL.md.
 *
 * Input Data mapping this expects (left column = these exact names):
 *   timesheetRaw  -> step 4 "Response"
 *   ptoRaw        -> step 5 "Response"
 *   directoryRaw  -> step 6 "Response"
 *   sheetRaw      -> Object.to_json( step 7 Raw Output )
 *   periodStart   -> step 2 "Period Start"     (for the Cutoff label)
 *   periodEnd     -> step 2 "Period End"       (for the Cutoff label)
 *
 * Steps 4/5/6 must be Webhooks by Zapier "Custom Request" with
 * Return Raw Response = Yes, or they hand over one flattened record.
 *
 * The output carries BOTH shapes on purpose:
 *   - `rows` / `flags` as JSON strings, for reading and debugging
 *   - `col*` parallel arrays, which Zapier reads as line items so a single
 *     Google Sheets "Create Multiple Spreadsheet Rows" step can write the
 *     whole cutoff at once, instead of fanning out one task per VA.
 */

// ---------------------------------------------------------------- parse
// Tolerant of a mapped value arriving wrapped in stray text (the step 7
// mapping can hand over the literal `Object.to_json(...)` rather than the
// evaluated result). Falls back to the outermost {...} or [...] in the
// string, and names the input in the error if even that fails.
function looseParse(text, label) {
  if (text === undefined || text === null || text === '') {
    throw new Error(label + ' arrived empty. Check the step mapping on this input.');
  }
  const s = String(text);
  try { return JSON.parse(s); } catch (e) { /* fall through */ }
  const firstBrace = s.indexOf('{'), firstBracket = s.indexOf('[');
  const start = (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace))
    ? firstBracket : firstBrace;
  const end = Math.max(s.lastIndexOf('}'), s.lastIndexOf(']'));
  if (start !== -1 && end > start) {
    try { return JSON.parse(s.slice(start, end + 1)); } catch (e) { /* fall through */ }
  }
  throw new Error(label + ' is not JSON. First 120 chars: ' + s.slice(0, 120));
}

const timesheet = looseParse(inputData.timesheetRaw, 'timesheetRaw');
const pto       = looseParse(inputData.ptoRaw, 'ptoRaw');
const directory = looseParse(inputData.directoryRaw, 'directoryRaw');
const sheetBlob = looseParse(inputData.sheetRaw, 'sheetRaw');

// The Google Sheets step wraps its rows and the key name has moved before.
let sheetRows = Array.isArray(sheetBlob)
  ? sheetBlob
  : (sheetBlob.rows || sheetBlob.Rows || sheetBlob.data || []);
if (!Array.isArray(sheetRows)) sheetRows = Object.values(sheetRows);
sheetRows = sheetRows.map(r => (Array.isArray(r) ? r : Object.values(r)));

const flags = [];
const flag = (kind, detail) => flags.push({ kind, detail });

// Cutoff window for PTO. BambooHR's time_off/requests returns every approved
// request that OVERLAPS the period, with ALL of its dates attached, so a long
// request touching the cutoff would otherwise be counted in full. Found on the
// first full end-to-end run, 2026-09-10: VAs showed 8 PTO days / 72 hours on
// top of a full schedule worked in the same 16-day cutoff.
// Dates are YYYY-MM-DD strings, so plain string comparison orders them.
const P_START = String(inputData.periodStart || '').trim();
const P_END = String(inputData.periodEnd || '').trim();
let ptoDatesOutsidePeriod = 0;
function inPeriod(d) {
  if (!P_START || !P_END) return true;   // no window supplied: count everything, and the diagnostics say so
  if (d < P_START || d > P_END) { ptoDatesOutsidePeriod++; return false; }
  return true;
}

// ------------------------------------------------- Form Responses layout
// 0-indexed against the 22-column header, after the 2026-09-02 header rename.
const COL = {
  timestamp: 0, fullName: 1, email: 2,
  client:  [3, 9, 15],
  empType: [4, 10, 16],
  days:    [5, 11, 17],
  start:   [6, 12, 18],
  end:     [7, 13, 19],
  tz:      [8, 14, 20]
};

const DAY = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 };

// ------------------------------------------------------ in-house staff
// Stamp Staff's own people. They are never placed with a client, so their
// hours are totalled straight and never split, and they will never appear in
// the Form Responses tab. Source of truth for this list, and the only place
// to change it: policies/in-house-team-hours.md
//
// Why a list here rather than reading the payroll sheet: it is eight people
// who rarely change, and the payroll sheet's own `Contract Type` column
// identifies only five of them (Benjomin, Key and Marfil are mislabelled
// `New VA Contract`). This list CANNOT rot silently - anyone in BambooHR who
// is neither here nor in Form Responses already raises `no-schedule-row`.
// If it ever grows past ~15 people or starts churning, move it to a read of
// the Payroll Main tab instead.
//
// ptoHoursPerDay: what one approved PTO day is worth.
// Ailynn, 2026-09-08: "for regular in house 8". A half day arrives from
// BambooHR as amount 0.5 and is multiplied out below, so 8 gives 4 hours
// for a half day with no second number needed.
// Key Bantola is 4, set by Ailynn 2026-09-08, matching her 5-9pm shift.
// She is NOT "regular in house" and must never be moved to 8, which would
// pay her PTO at double.
const IN_HOUSE_CLIENT = 'IN HOUSE';

// Ailynn, 2026-09-10: a punch that fits no scheduled window is held for a
// person to assign. Never charged to a guessed client.
// decisions/2026-09-10_payroll-automation-rulings.md
const REVIEW_CLIENT = 'FOR REVIEW';

// Ailynn, 2026-09-10: when one VA has two addresses, the Stamp Staff one
// wins. Each group is one person; the first entry is the address used.
// The join keys everybody by email, so both the BambooHR directory and the
// Form Responses rows go through canon() and land on the same key whichever
// address each system happens to hold.
// Osaimi Hassan has NO Stamp Staff address; his payroll address stands in
// until that is resolved.
const EMAIL_ALIASES = [
  ['emmanuel.stampstaff@gmail.com',     'emmanuel.abpo@gmail.com'],
  ['june.stampstaff@gmail.com',         'annehilgaga15@gmail.com'],
  ['nhorbert.stampstaff@gmail.com',     'enjeybalcera2025@gmail.com'],
  ['princehaidee.stampstaff@gmail.com', 'phaideeramos@gmail.com'],
  ['johngonzalo.stampstaff@gmail.com',  'rejohn.gonzalo@gmail.com'],
  ['osaimi.gvaco@gmail.com',            'mike@markarianrealty.com']
];
const CANON = {};
EMAIL_ALIASES.forEach(group => group.forEach(addr => { CANON[addr] = group[0]; }));
// Whitespace is stripped too: a form row once held "myka. stampstaff@gmail.com".
function canon(addr) {
  const k = String(addr || '').replace(/\s+/g, '').toLowerCase();
  return CANON[k] || k;
}
const IN_HOUSE = {
  'annfpg@gmail.com':                  { name: 'Eydie Ann Embuscado Lugay', schedule: 'flexi 9am-8pm ET', ptoHoursPerDay: 8 },
  'katherineba.gvaco@gmail.com':       { name: 'Katherine Barin',           schedule: 'flexi 9am-8pm ET', ptoHoursPerDay: 8 },
  'janet2.gvaco@gmail.com':            { name: 'Janet Mangrobang',          schedule: 'flexi 9am-8pm ET', ptoHoursPerDay: 8 },
  'marf.ganelo@gmail.com':             { name: 'Marfil Ganelo',             schedule: 'flexi',            ptoHoursPerDay: 8 },
  'rafael.gvaco@gmail.com':            { name: 'Rafael Reyes',              schedule: 'fixed 9-6',        ptoHoursPerDay: 8 },
  'shainaolarga.stampstaff@gmail.com': { name: 'Marmil Olorga',             schedule: 'fixed 9-6',        ptoHoursPerDay: 8 },
  'benjkris.stampstaff@gmail.com':     { name: 'Benjomin Kristian Reyes',   schedule: 'fixed 9-6',        ptoHoursPerDay: 8 },
  'keyverlybantola@gmail.com':         { name: 'Key Bantola',               schedule: 'fixed 5-9pm ET',   ptoHoursPerDay: 4 }
};

function parseDays(text) {
  if (!text) return [];
  return String(text).toLowerCase().split(/[,;/&]+|\band\b/)
    .map(s => s.trim())
    .map(s => DAY[s])
    .filter(n => n !== undefined);
}

// "9:00 AM", "09:00:00 AM", "13:30", "9am" -> { min, meridiem }
// `meridiem` is 'a', 'p', or '' when the VA wrote no am/pm at all. WHICH one
// they wrote matters, not just whether: a bare "6:00" as an END time nearly
// means 6pm, and an explicit "5:00 AM" end against an "8:00 AM" start is a
// wrong answer rather than a missing one. Both are corrected below, by
// different rules, because one is filling a gap and the other is overriding
// what somebody actually typed.
function parseTime(text) {
  if (!text) return null;
  const s = String(text).trim();
  const withAp = s.match(/^(\d{1,2})(?:[:.](\d{2}))?(?::(\d{2}))?\s*([ap])\.?\s*m\.?/i);
  const m = withAp || s.match(/^(\d{1,2})[:.](\d{2})/);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const ap = (withAp && withAp[4] || '').toLowerCase();
  if (ap === 'p' && h < 12) h += 12;
  if (ap === 'a' && h === 12) h = 0;
  if (h > 23 || min > 59) return null;
  return { min: h * 60 + min, meridiem: ap };
}

// A VA shift is between 1 and 12 hours. Anything outside that is a misread
// time, not a real roster, so it is flagged and excluded rather than totalled.
const MAX_SHIFT_MIN = 12 * 60;

// The ceiling for OVERRIDING an am/pm the VA actually typed, deliberately
// tighter than MAX_SHIFT_MIN. Be more cautious when contradicting somebody
// than when trusting them. It is also what keeps the junk `12:00 AM ->
// 12:00 AM` rows out: those flip to exactly 12 hours, which clears
// MAX_SHIFT_MIN but not this, so they stay flagged instead of being
// quietly turned into a real-looking shift.
const MAX_INFER_MIN = 10 * 60;

// Form Responses timestamps are M/D/YYYY H:MM:SS, US order (confirmed: the
// form was created 2026-09-01 and its earliest rows read "9/1/2026").
//
// ⛔ These MUST be compared as dates, never as text. "9/10/2026" sorts BEFORE
// "9/2/2026" as a string, so a resubmission on the 10th would lose to a stale
// row from the 2nd and the old schedule would silently win. Caught 2026-09-08,
// two days before it would have started happening.
let unparsedStamps = 0;
function parseStamp(text) {
  const m = String(text || '').trim()
    .match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})[ ,]+(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (!m) { if (String(text || '').trim()) unparsedStamps++; return 0; }
  return Date.UTC(+m[3], +m[1] - 1, +m[2], +m[4], +m[5], +(m[6] || 0));
}

// ------------------------------------------------------ build schedules
// One schedule per VA email, taken from that VA's MOST RECENT submission.
const schedules = {};
for (const row of sheetRows) {
  const email = canon(row[COL.email]);
  if (!email) continue;
  const stamp = parseStamp(row[COL.timestamp]);
  if (schedules[email] && schedules[email].stamp >= stamp) continue;

  const blocks = [];
  for (let i = 0; i < 3; i++) {
    const client = String(row[COL.client[i]] || '').trim();
    if (!client) continue;
    // VAs with only one or two clients type something into the boxes for the
    // ones they do not have. Seen in real data: "N/A", "NA", "None" and
    // "Mandatory Field". Treated as blank, or they become phantom clients
    // with real hours totalled against them.
    if (/^(n\.?\/?a\.?|none|nil|n\/a|mandatory\s*field|-{1,2})$/i.test(client)) {
      flag('client-name-is-a-placeholder',
        email + ': client ' + (i + 1) + ' reads "' + client + '", treated as blank');
      continue;
    }
    const startT = parseTime(row[COL.start[i]]);
    const endT   = parseTime(row[COL.end[i]]);
    const startMin = startT ? startT.min : null;
    let endMin = endT ? endT.min : null;
    let hoursPerDay = null;
    if (startT && endT) {
      let span = endMin - startMin;
      if (span <= 0) {
        const pmSpan = (endMin + 12 * 60) - startMin;
        const asTime = mins =>
          Math.floor(mins / 60) + ':' + String(mins % 60).padStart(2, '0');

        if (!endT.meridiem && pmSpan > 0 && pmSpan <= MAX_SHIFT_MIN) {
          // No am/pm given at all. Filling a gap, so the normal ceiling applies.
          endMin += 12 * 60;
          span = pmSpan;
          flag('schedule-end-assumed-pm',
            email + ' / ' + client + ': end "' + row[COL.end[i]] + '" read as ' + asTime(endMin));

        } else if (startT.meridiem === 'a' && endT.meridiem === 'a' &&
                   pmSpan > 0 && pmSpan <= MAX_INFER_MIN) {
          // Both times say AM and the end lands before the start. Nobody
          // starts at 8am and finishes at 5am the same day, so this is a
          // wrong answer rather than an overnight shift. Overriding what
          // somebody typed, so the tighter MAX_INFER_MIN ceiling applies.
          // Ailynn approved this rule 2026-09-08 after ten VAs made the
          // same slip. It affects PTO hours, so every one is flagged.
          const wasEnd = row[COL.end[i]];
          endMin += 12 * 60;
          span = pmSpan;
          flag('schedule-end-am-flipped-to-pm',
            email + ' / ' + client + ': end "' + wasEnd + '" read as ' + asTime(endMin) +
            ' (' + (span / 60).toFixed(2) + 'h shift). CHECK THIS ONE.');

        } else {
          // A genuine overnight shift, e.g. 8:50 PM to 1:10 AM.
          span += 24 * 60;
        }
      }
      if (span > MAX_SHIFT_MIN) {
        flag('schedule-span-implausible',
          email + ' / ' + client + ': "' + row[COL.start[i]] + '" to "' + row[COL.end[i]] +
          '" is ' + (span / 60).toFixed(2) + 'h, excluded from PTO totals');
      } else {
        hoursPerDay = span / 60;
      }
    } else {
      flag('schedule-time-unreadable',
        email + ' / ' + client + ': start "' + row[COL.start[i]] + '" end "' + row[COL.end[i]] + '"');
    }
    const days = parseDays(row[COL.days[i]]);
    if (!days.length) {
      flag('schedule-days-unreadable', email + ' / ' + client + ': "' + row[COL.days[i]] + '"');
    }
    blocks.push({
      client,
      empType: String(row[COL.empType[i]] || '').trim(),
      days: days, startMin: startMin, endMin: endMin, hoursPerDay: hoursPerDay,
      tz: String(row[COL.tz[i]] || '').trim()
    });
  }
  schedules[email] = { stamp: stamp, fullName: String(row[COL.fullName] || '').trim(), blocks: blocks };
}

// ------------------------------------------------ employeeId -> workEmail
// Timesheet entries carry only employeeId. PTO requests carry employeeId too,
// so both go through the directory and neither needs fragile name matching.
const emailById = {};
const nameById = {};
for (const e of (directory.employees || [])) {
  if (e.workEmail) emailById[String(e.id)] = canon(e.workEmail);
  nameById[String(e.id)] = e.displayName || '';
}

// ---------------------------------------------------------------- totals
const totals = {};
function bucket(email, fullName, client) {
  const key = email + '||' + client;
  if (!totals[key]) {
    totals[key] = {
      email: email, fullName: fullName, client: client, inHouse: false,
      workedHours: 0, ptoHours: 0, punches: 0, ptoDays: 0
    };
  }
  return totals[key];
}

function blocksForWeekday(sched, weekday) {
  return sched.blocks.filter(b => b.days.indexOf(weekday) !== -1);
}

// ------------------------------------------------------ worked punches
// Diagnostic: is `start` local time or UTC? If any punch's UTC date differs
// from its own `date` field, the timestamps are genuinely offset-bearing.
let utcDateMismatches = 0;

for (const entry of timesheet) {
  const id = String(entry.employeeId);
  const email = emailById[id];
  if (!email) {
    flag('no-email-for-employee', 'employeeId ' + id + ' (' + (nameById[id] || 'unknown') + ')');
    continue;
  }
  const d = new Date(entry.start);
  if (d.toISOString().slice(0, 10) !== entry.date) utcDateMismatches++;

  // In-house staff are totalled straight. No schedule lookup, no client
  // matching, and no flag: charging their hours to a client is wrong by
  // definition, not a gap to be filled.
  if (IN_HOUSE[email]) {
    const t = bucket(email, IN_HOUSE[email].name, IN_HOUSE_CLIENT);
    t.inHouse = true;
    const h = Number(entry.hours) || 0;
    t.workedHours += h;
    t.punches++;
    continue;
  }

  const sched = schedules[email];
  if (!sched) { flag('no-schedule-row', email + ' (employeeId ' + id + ')'); continue; }

  // entry.date is the authoritative work date, so read the weekday from it
  // rather than from the timestamp: a UTC/local mix-up cannot then silently
  // move a shift onto the wrong day.
  const parts = entry.date.split('-').map(Number);
  const weekday = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])).getUTCDay();
  const punchMin = d.getUTCHours() * 60 + d.getUTCMinutes();

  const candidates = blocksForWeekday(sched, weekday);
  let chosen = null;
  if (candidates.length === 1) {
    chosen = candidates[0];
  } else if (candidates.length > 1) {
    chosen = candidates.find(b =>
      b.startMin !== null && b.endMin !== null &&
      (b.endMin > b.startMin
        ? punchMin >= b.startMin && punchMin < b.endMin
        : punchMin >= b.startMin || punchMin < b.endMin));
    if (!chosen) {
      // Held for review, never charged to a guessed client (Ailynn, 2026-09-10).
      const held = bucket(email, sched.fullName, REVIEW_CLIENT);
      held.workedHours += Number(entry.hours) || 0;
      held.punches++;
      flag('punch-outside-every-window',
        email + ' ' + entry.date + ' ' + entry.start + ' (' + entry.hours + 'h) held FOR REVIEW, no scheduled window fits');
      continue;
    }
  } else {
    flag('punch-on-unscheduled-day', email + ' ' + entry.date + ' (' + entry.hours + 'h) not on any schedule');
    continue;
  }

  const b = bucket(email, sched.fullName, chosen.client);
  const hrs = Number(entry.hours) || 0;
  b.workedHours += hrs;
  b.punches++;
}

// ---------------------------------------------------------------- PTO
// Decision 2026-09-07: each client gets the hours THAT client lost, from the
// VA's declared schedule. Not a division of one day between clients.
// See decisions/2026-09-07_pto-hours-split-by-scheduled-hours.md
for (const req of pto) {
  const id = String(req.employeeId);
  const email = emailById[id];
  if (!email) {
    flag('pto-no-email-for-employee', 'employeeId ' + id + ' (' + (req.name || '?') + ')');
    continue;
  }
  const dates = req.dates || {};

  // In-house PTO. What a PTO day is WORTH for these people is not decided
  // (a 5-9pm shift is plainly 4 hours; a flexi day has no fixed length at
  // all), so days are counted and hours are left at zero rather than
  // invented. Filling ptoHoursPerDay in the IN_HOUSE map turns this on.
  if (IN_HOUSE[email]) {
    const ih = IN_HOUSE[email];
    const t = bucket(email, ih.name, IN_HOUSE_CLIENT);
    t.inHouse = true;
    for (const date of Object.keys(dates)) {
      if (!inPeriod(date)) continue;
      const amt = Number(dates[date]) || 0;
      t.ptoDays += amt;
      if (ih.ptoHoursPerDay !== null && ih.ptoHoursPerDay !== undefined) {
        t.ptoHours += ih.ptoHoursPerDay * amt;
      } else {
        flag('in-house-pto-needs-a-rule',
          email + ' ' + date + ': ' + amt + ' day approved PTO, schedule "' + ih.schedule +
          '", hours not set. Counted as days only.');
      }
    }
    continue;
  }

  const sched = schedules[email];
  if (!sched) { flag('pto-no-schedule-row', email + ' (' + (req.name || '?') + ')'); continue; }

  for (const date of Object.keys(dates)) {
    if (!inPeriod(date)) continue;
    const dayAmount = Number(dates[date]) || 0;      // 1 = full day, 0.5 = half
    const p = date.split('-').map(Number);
    const weekday = new Date(Date.UTC(p[0], p[1] - 1, p[2])).getUTCDay();
    const candidates = blocksForWeekday(sched, weekday).filter(b => b.hoursPerDay !== null);

    if (!candidates.length) {
      flag('pto-on-unscheduled-day', email + ' ' + date + ': approved PTO on a day with no schedule');
      continue;
    }
    if (candidates.length > 1) {
      flag('pto-split-across-clients',
        email + ' ' + date + ': ' + candidates.map(c => c.client + ' ' + (c.hoursPerDay * dayAmount).toFixed(2) + 'h').join(', '));
    }
    for (const b of candidates) {
      const t = bucket(email, sched.fullName, b.client);
      t.ptoHours += b.hoursPerDay * dayAmount;
      t.ptoDays += dayAmount;
      // A schedule declared in a different timezone from the punches is not
      // handled; surface it rather than quietly assuming they match.
      if (b.tz && !/new[_ ]?york|est|edt|eastern/i.test(b.tz)) {
        flag('schedule-timezone-differs', email + ' / ' + b.client + ': schedule says "' + b.tz + '"');
      }
    }
  }
}

// ---------------------------------------------------------------- output
const round2 = n => Math.round(n * 100) / 100;

const rows = Object.keys(totals).map(k => totals[k]).map(r => ({
  email: r.email,
  fullName: r.fullName,
  client: r.client,
  inHouse: r.inHouse,
  punches: r.punches,
  workedHours: round2(r.workedHours),
  ptoDays: round2(r.ptoDays),
  ptoHours: round2(r.ptoHours),
  totalHours: round2(r.workedHours + r.ptoHours)
})).sort((a, b) =>
  (a.fullName || '').localeCompare(b.fullName || '') || a.client.localeCompare(b.client));

const uniqueEmails = {};
rows.forEach(r => { uniqueEmails[r.email] = true; });

// ------------------------------------------------- flags onto the row
// A flag list nobody reads next to a number nobody questions is how a bad
// figure gets paid. Attach each VA's own flags to their own row, so the
// person reviewing the sheet sees "CHECK THIS ONE" beside the name.
const flagsForEmail = {};
flags.forEach(f => {
  const m = String(f.detail).match(/[\w.+-]+@[\w.-]+/);
  if (!m) return;
  const e = canon(m[0]);
  (flagsForEmail[e] = flagsForEmail[e] || []).push(f.kind);
});

const cutoff = (inputData.periodStart || '?') + ' to ' + (inputData.periodEnd || '?');
const runAt = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';

// Parallel arrays. Zapier reads same-length arrays as line items, which is
// what lets one "Create Multiple Spreadsheet Rows" step write every row.
const colCutoff = [], colRunAt = [], colName = [], colEmail = [], colClient = [];
const colInHouse = [], colPunches = [], colWorked = [];
const colPtoDays = [], colPtoHours = [], colTotal = [], colFlags = [];
rows.forEach(r => {
  colCutoff.push(cutoff);
  colRunAt.push(runAt);
  colName.push(r.fullName);
  colEmail.push(r.email);
  colClient.push(r.client);
  colInHouse.push(r.inHouse ? 'yes' : '');
  colPunches.push(r.punches);
  colWorked.push(r.workedHours);
  colPtoDays.push(r.ptoDays);
  colPtoHours.push(r.ptoHours);
  colTotal.push(r.totalHours);
  const fs = flagsForEmail[r.email] || [];
  const uniq = fs.filter((v, i) => fs.indexOf(v) === i);
  colFlags.push(uniq.join(', '));
});

// `return` is what this Zapier account's Code step actually honours.
// `output = {...}`, the older convention, produced a blank Output on
// 2026-09-07 with no error at all.
// 503 raw flags on the first live run is unreadable. The histogram is what
// actually gets looked at; the full list stays available underneath it.
const flagsByKind = {};
flags.forEach(f => { flagsByKind[f.kind] = (flagsByKind[f.kind] || 0) + 1; });

return {
  periodRows: rows.length,
  vaCount: Object.keys(uniqueEmails).length,
  flagCount: flags.length,
  cutoff: cutoff,
  runAt: runAt,
  flagsByKind: JSON.stringify(flagsByKind),
  flagSample: JSON.stringify(flags.slice(0, 20)),
  rows: JSON.stringify(rows),
  flags: JSON.stringify(flags),
  // Line items for the Google Sheets write step. Same length, same order.
  colCutoff: colCutoff,
  colRunAt: colRunAt,
  colName: colName,
  colEmail: colEmail,
  colClient: colClient,
  colInHouse: colInHouse,
  colPunches: colPunches,
  colWorked: colWorked,
  colPtoDays: colPtoDays,
  colPtoHours: colPtoHours,
  colTotal: colTotal,
  colFlags: colFlags,
  diagnostics: JSON.stringify({
    timesheetEntries: timesheet.length,
    ptoRequests: pto.length,
    directoryEmployees: (directory.employees || []).length,
    sheetRows: sheetRows.length,
    schedulesBuilt: Object.keys(schedules).length,
    unparsedStamps: unparsedStamps,
    inHouseListed: Object.keys(IN_HOUSE).length,
    inHouseSeenInPeriod: rows.filter(r => r.inHouse).length,
    utcDateMismatches: utcDateMismatches,
    ptoDatesOutsidePeriod: ptoDatesOutsidePeriod,
    ptoWindow: P_START && P_END ? P_START + ' to ' + P_END : 'NOT SUPPLIED - all PTO dates counted',
    timestampReading: utcDateMismatches > 0
      ? 'start/end carry a real UTC offset - times were converted'
      : 'no mismatches: start/end are almost certainly already local time'
  })
};
