/*
 * Step 8 of the BambooHR payroll pull: Code by Zapier, "Run JavaScript".
 * Written 2026-09-07. NOT yet verified against a live run - see SKILL.md.
 *
 * Input Data mapping this expects (left column = these exact names):
 *   timesheetRaw  -> step 4 "Response"
 *   ptoRaw        -> step 5 "Response"
 *   directoryRaw  -> step 6 "Response"
 *   sheetRaw      -> Object.to_json( step 7 Raw Output )
 *
 * Steps 4/5/6 must be Webhooks by Zapier "Custom Request" with
 * Return Raw Response = Yes, or they hand over one flattened record.
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

function parseDays(text) {
  if (!text) return [];
  return String(text).toLowerCase().split(/[,;/&]+|\band\b/)
    .map(s => s.trim())
    .map(s => DAY[s])
    .filter(n => n !== undefined);
}

// "9:00 AM", "09:00:00 AM", "13:30", "9am" -> { min, meridiem }
// `meridiem` says whether the VA actually wrote am/pm. It matters: a bare
// "6:00" as an END time nearly always means 6pm, and reading it as 6am is
// what produced a 21-hour working day on the first live run (2026-09-07).
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
  return { min: h * 60 + min, meridiem: !!ap };
}

// A VA shift is between 1 and 12 hours. Anything outside that is a misread
// time, not a real roster, so it is flagged and excluded rather than totalled.
const MAX_SHIFT_MIN = 12 * 60;

// ------------------------------------------------------ build schedules
// One schedule per VA email, taken from that VA's MOST RECENT submission.
const schedules = {};
for (const row of sheetRows) {
  const email = String(row[COL.email] || '').trim().toLowerCase();
  if (!email) continue;
  const stamp = String(row[COL.timestamp] || '');
  if (schedules[email] && schedules[email].stamp >= stamp) continue;

  const blocks = [];
  for (let i = 0; i < 3; i++) {
    const client = String(row[COL.client[i]] || '').trim();
    if (!client) continue;
    const startT = parseTime(row[COL.start[i]]);
    const endT   = parseTime(row[COL.end[i]]);
    const startMin = startT ? startT.min : null;
    let endMin = endT ? endT.min : null;
    let hoursPerDay = null;
    if (startT && endT) {
      let span = endMin - startMin;
      if (span <= 0) {
        // A bare end time that lands before the start is almost always a
        // missing "pm". Try that first, and only fall back to a genuine
        // overnight shift if the pm reading is not plausible either.
        const pmSpan = (endMin + 12 * 60) - startMin;
        if (!endT.meridiem && pmSpan > 0 && pmSpan <= MAX_SHIFT_MIN) {
          endMin += 12 * 60;
          span = pmSpan;
          flag('schedule-end-assumed-pm',
            email + ' / ' + client + ': end "' + row[COL.end[i]] + '" read as ' +
            Math.floor(endMin / 60) + ':' + String(endMin % 60).padStart(2, '0'));
        } else {
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
  if (e.workEmail) emailById[String(e.id)] = String(e.workEmail).trim().toLowerCase();
  nameById[String(e.id)] = e.displayName || '';
}

// ---------------------------------------------------------------- totals
const totals = {};
function bucket(email, fullName, client) {
  const key = email + '||' + client;
  if (!totals[key]) {
    totals[key] = {
      email: email, fullName: fullName, client: client,
      workedHours: 0, workedHoursApproved: 0, ptoHours: 0, punches: 0, ptoDays: 0
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
  const sched = schedules[email];
  if (!sched) { flag('no-schedule-row', email + ' (employeeId ' + id + ')'); continue; }

  const d = new Date(entry.start);
  if (d.toISOString().slice(0, 10) !== entry.date) utcDateMismatches++;

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
      chosen = candidates[0];
      flag('punch-outside-every-window',
        email + ' ' + entry.date + ' ' + entry.start + ' -> assigned to ' + chosen.client + ' as first scheduled');
    }
  } else {
    flag('punch-on-unscheduled-day', email + ' ' + entry.date + ' (' + entry.hours + 'h) not on any schedule');
    continue;
  }

  const b = bucket(email, sched.fullName, chosen.client);
  const hrs = Number(entry.hours) || 0;
  b.workedHours += hrs;
  if (entry.approved) b.workedHoursApproved += hrs;
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
  const sched = schedules[email];
  if (!sched) { flag('pto-no-schedule-row', email + ' (' + (req.name || '?') + ')'); continue; }

  const dates = req.dates || {};
  for (const date of Object.keys(dates)) {
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
  punches: r.punches,
  workedHours: round2(r.workedHours),
  workedHoursApproved: round2(r.workedHoursApproved),
  ptoDays: round2(r.ptoDays),
  ptoHours: round2(r.ptoHours),
  totalHours: round2(r.workedHours + r.ptoHours)
})).sort((a, b) =>
  (a.fullName || '').localeCompare(b.fullName || '') || a.client.localeCompare(b.client));

const uniqueEmails = {};
rows.forEach(r => { uniqueEmails[r.email] = true; });

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
  flagsByKind: JSON.stringify(flagsByKind),
  flagSample: JSON.stringify(flags.slice(0, 20)),
  rows: JSON.stringify(rows),
  flags: JSON.stringify(flags),
  diagnostics: JSON.stringify({
    timesheetEntries: timesheet.length,
    ptoRequests: pto.length,
    directoryEmployees: (directory.employees || []).length,
    sheetRows: sheetRows.length,
    schedulesBuilt: Object.keys(schedules).length,
    utcDateMismatches: utcDateMismatches,
    timestampReading: utcDateMismatches > 0
      ? 'start/end carry a real UTC offset - times were converted'
      : 'no mismatches: start/end are almost certainly already local time'
  })
};
