/*
 * Step 8 of the BambooHR payroll pull: Code by Zapier, "Run JavaScript".
 * Written 2026-09-07. First full end-to-end run 2026-09-10.
 *
 * v2, 2026-09-10:
 *   - Punch times are read as UTC, which is what BambooHR sends. v1 read
 *     them as local time, so every punch was matched against the schedule
 *     four or five hours late and multi-client punches fell into FOR REVIEW.
 *   - Schedule blocks are placed in their own declared timezone.
 *   - A second output, the d* arrays, is one row per scheduled block per day
 *     for the Timesheet Detail tab (ruling 7 in
 *     decisions/2026-09-10_payroll-automation-rulings.md).
 *
 * Input Data mapping this expects (left column = these exact names):
 *   timesheetRaw   -> step 4 "Response"
 *   ptoRaw         -> step 5 "Response"
 *   directoryRaw   -> step 6 "Response"
 *   sheetRaw       -> step 7 "Raw Rows"   (Form Responses 1)
 *   periodStart    -> step 2 "Period Start"
 *   periodEnd      -> step 2 "Period End"
 *   payrollMainRaw -> "Raw Rows" of the StampStaff Payroll / Payroll Main read   (optional: Employee Number)
 *   revenueRaw     -> "Raw Rows" of the Revenue StampStaff month-tab read       (optional: Coach)
 * Leaving an optional one unmapped leaves that column blank; nothing else changes.
 *
 * Steps 4/5/6 must be Webhooks by Zapier "Custom Request" with
 * Return Raw Response = Yes, or they hand over one flattened record.
 *
 * Output:
 *   - `rows` / `flags` as JSON strings, for reading and debugging
 *   - `col*` parallel arrays: one row per VA per client (Automated Pull tab)
 *   - `d*` parallel arrays: one row per scheduled block per day (Timesheet Detail tab)
 * Zapier reads same-length arrays as line items, so one "Create Multiple
 * Spreadsheet Rows" step writes each tab in a single task.
 */

// ---------------------------------------------------------------- parse
// Tolerant of a mapped value arriving wrapped in stray text. Falls back to the
// outermost {...} or [...] in the string, and names the input if even that fails.
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
function optionalParse(text, label) {
  if (text === undefined || text === null || String(text).trim() === '') return null;
  return looseParse(text, label);
}

// The Google Sheets step wraps its rows and the key name has moved before.
function toRows(blob) {
  if (!blob) return [];
  let r = Array.isArray(blob) ? blob : (blob.rows || blob.Rows || blob.data || []);
  if (!Array.isArray(r)) r = Object.values(r);
  return r.map(x => (Array.isArray(x) ? x : Object.values(x)));
}

const timesheet   = looseParse(inputData.timesheetRaw, 'timesheetRaw');
const pto         = looseParse(inputData.ptoRaw, 'ptoRaw');
const directory   = looseParse(inputData.directoryRaw, 'directoryRaw');
const sheetRows   = toRows(looseParse(inputData.sheetRaw, 'sheetRaw'));
const payrollRows = toRows(optionalParse(inputData.payrollMainRaw, 'payrollMainRaw'));
const revenueRows = toRows(optionalParse(inputData.revenueRaw, 'revenueRaw'));

const flags = [];
const flag = (kind, detail) => flags.push({ kind, detail });

const round2 = n => Math.round(n * 100) / 100;

// Cutoff window. BambooHR's time_off/requests returns every approved request
// that OVERLAPS the period, with ALL of its dates attached, so dates outside the
// period are dropped. Dates are YYYY-MM-DD strings, so string comparison orders them.
const P_START = String(inputData.periodStart || '').trim();
const P_END = String(inputData.periodEnd || '').trim();
let ptoDatesOutsidePeriod = 0;
// Dates taken from requests whose amount is in HOURS, not days. BambooHR records
// 'Client Paid Holidays' this way: one date whose value is 8 means 8 HOURS.
let ptoHoursUnitDates = 0;
function inPeriod(d) {
  if (!P_START || !P_END) return true;   // no window supplied: count everything, and the diagnostics say so
  if (d < P_START || d > P_END) { ptoDatesOutsidePeriod++; return false; }
  return true;
}

// ---------------------------------------------------------------- time
// BambooHR timesheet `start`/`end` are real UTC instants. Proven 2026-09-10
// from the step 4 sample: nine-hour days ran 12:xx to 21:xx, i.e. 8-9am to
// 5-6pm Eastern. The per-punch `timezone` field is the VA's BambooHR setting
// and says nothing about the timestamps. Everything shown on the sheet is
// Eastern, matching the coaches' own day-by-day tab.
const ET = 'America/New_York';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const fmtCache = {};
function fmtFor(tz) {
  if (!fmtCache[tz]) {
    fmtCache[tz] = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hourCycle: 'h23',
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
    });
  }
  return fmtCache[tz];
}
// Wall-clock date and minute-of-day of an instant, in a timezone.
function localParts(ms, tz) {
  const p = {};
  fmtFor(tz).formatToParts(new Date(ms)).forEach(x => { p[x.type] = x.value; });
  return { date: p.year + '-' + p.month + '-' + p.day, min: (Number(p.hour) % 24) * 60 + Number(p.minute) };
}
function tzOffsetMin(ms, tz) {
  const lp = localParts(ms, tz);
  const [y, m, d] = lp.date.split('-').map(Number);
  return Math.round((Date.UTC(y, m - 1, d, 0, lp.min) - (ms - (ms % 60000))) / 60000);
}
// The UTC instant of a wall-clock time on a date in a timezone. Checked twice
// so a daylight-saving change on that day lands on the right hour.
function zonedToUtc(y, m, d, minutes, tz) {
  const guess = Date.UTC(y, m - 1, d, 0, minutes);
  const off1 = tzOffsetMin(guess, tz);
  let t = guess - off1 * 60000;
  const off2 = tzOffsetMin(t, tz);
  if (off2 !== off1) t = guess - off2 * 60000;
  return t;
}
function addDays(dateStr, n) {
  return new Date(Date.parse(dateStr + 'T00:00:00Z') + n * 86400000).toISOString().slice(0, 10);
}
function weekdayOf(dateStr) {
  return new Date(Date.parse(dateStr + 'T00:00:00Z')).getUTCDay();
}
function fmtClock(ms) {
  const m = localParts(ms, ET).min;
  const h = Math.floor(m / 60);
  return ((h % 12) || 12) + ':' + String(m % 60).padStart(2, '0') + ' ' + (h >= 12 ? 'PM' : 'AM');
}
function fmtDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return WEEKDAYS[weekdayOf(dateStr)] + ', ' + MONTHS[m - 1] + ' ' + d + ', ' + y;
}
// "7mins", "1hr and 8mins", "2hrs and 52mins": the wording the coaches' tab uses.
function fmtDur(min) {
  const h = Math.floor(min / 60), m = min % 60;
  const hs = h ? h + (h === 1 ? 'hr' : 'hrs') : '';
  const ms = m ? m + (m === 1 ? 'min' : 'mins') : '';
  return hs && ms ? hs + ' and ' + ms : (hs || ms || '0mins');
}

// The form's "Time zone this schedule is in". Real values on 2026-09-10:
// Eastern 72, Pacific 36, Central 25, Mountain 16, Hawaii 1.
function tzFor(label) {
  const s = String(label || '').toLowerCase();
  if (/\b(pacific|pst|pdt|pt)\b/.test(s)) return 'America/Los_Angeles';
  if (/\barizona\b/.test(s)) return 'America/Phoenix';
  if (/\b(mountain|mst|mdt|mt)\b/.test(s)) return 'America/Denver';
  if (/\b(central|cst|cdt|ct)\b/.test(s)) return 'America/Chicago';
  if (/\b(hawaii|hst)\b/.test(s)) return 'Pacific/Honolulu';
  if (/\b(eastern|est|edt|et)\b|new[_ ]?york/.test(s)) return ET;
  return null;
}

// ------------------------------------------------------ pay rules, ruling 7
// Scheduled block, minus lateness past the grace window, minus minutes left
// early, minus lunch on long blocks. Nothing past the scheduled end is paid.
// policies/va-clock-in-out-rules.md and decisions/2026-09-10_payroll-automation-rulings.md
const GRACE_MIN = 5;            // a clock-in up to 5 minutes late is on time
const LUNCH_BLOCK_MIN = 9 * 60; // Ailynn, 2026-09-10: 1 hour off any block of 9 hours or longer
const LUNCH_MIN = 60;
// How early a clock-in with no clock-out may open and still count for the block.
const OPEN_PUNCH_LEAD_MS = 60 * 60000;

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
// Stamp Staff's own people. Never placed with a client, so their hours are
// totalled straight and never split, and they never appear in Form Responses.
// Source of truth for this list, and the only place to change it:
// policies/in-house-team-hours.md
//
// Why a list here rather than reading the payroll sheet: the payroll sheet's
// `Contract Type` column identifies only five of the eight (Benjomin, Key and
// Marfil are mislabelled `New VA Contract`). Anyone in BambooHR who is neither
// here nor in Form Responses already raises `no-schedule-row`.
//
// ptoHoursPerDay: what one approved PTO day is worth. Ailynn, 2026-09-08:
// "for regular in house 8". Key Bantola is 4, set when she worked a 5-9pm
// shift, and must never be moved to 8, which would pay her PTO at double.
// She was moved to flexible on 2026-09-11; her PTO stays at 4.
// schedIn / schedOut: shown on the detail tab. Blank for flexi schedules.
// fixed: paid the 9-6 Eastern block like a placed VA (late, early out and the
// unpaid lunch hour come off). Everyone else is paid as punched.
const IN_HOUSE_CLIENT = 'IN HOUSE';

// Ailynn, 2026-09-10: a punch that fits no scheduled window is held for a
// person to assign. Never charged to a guessed client.
const REVIEW_CLIENT = 'FOR REVIEW';
const UNSCHEDULED_CLIENT = 'NOT ON SCHEDULE';
const NO_FORM_CLIENT = 'NO SCHEDULE FORM';

// Ailynn, 2026-09-10: when one VA has two addresses, the Stamp Staff one
// wins. Each group is one person; the first entry is the address used.
// Osaimi Hassan has NO Stamp Staff address; his payroll address stands in.
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
  'annfpg@gmail.com':                  { name: 'Eydie Ann Embuscado Lugay', schedule: 'flexi 9am-8pm ET', ptoHoursPerDay: 8, schedIn: '',        schedOut: '' },
  'katherineba.gvaco@gmail.com':       { name: 'Katherine Barin',           schedule: 'flexi 9am-8pm ET', ptoHoursPerDay: 8, schedIn: '',        schedOut: '' },
  'janet2.gvaco@gmail.com':            { name: 'Janet Mangrobang',          schedule: 'flexi 9am-8pm ET', ptoHoursPerDay: 8, schedIn: '',        schedOut: '' },
  'marf.ganelo@gmail.com':             { name: 'Marfil Ganelo',             schedule: 'flexi',            ptoHoursPerDay: 8, schedIn: '',        schedOut: '' },
  'rafael.gvaco@gmail.com':            { name: 'Rafael Reyes',              schedule: 'fixed 9-6',        ptoHoursPerDay: 8, schedIn: '9:00 AM', schedOut: '6:00 PM', fixed: true },
  'shainaolarga.stampstaff@gmail.com': { name: 'Marmil Olorga',             schedule: 'fixed 9-6',        ptoHoursPerDay: 8, schedIn: '9:00 AM', schedOut: '6:00 PM', fixed: true },
  'benjkris.stampstaff@gmail.com':     { name: 'Benjomin Kristian Reyes',   schedule: 'fixed 9-6',        ptoHoursPerDay: 8, schedIn: '9:00 AM', schedOut: '6:00 PM', fixed: true },
  'keyverlybantola@gmail.com':         { name: 'Key Bantola',               schedule: 'flexi',            ptoHoursPerDay: 4, schedIn: '',        schedOut: '' }
};

function parseDays(text) {
  if (!text) return [];
  return String(text).toLowerCase().split(/[,;/&]+|\band\b/)
    .map(s => s.trim())
    .map(s => DAY[s])
    .filter(n => n !== undefined);
}

// "9:00 AM", "09:00:00 AM", "13:30", "9am" -> { min, meridiem }
// `meridiem` is 'a', 'p', or '' when the VA wrote no am/pm at all. A bare
// "6:00" as an END time nearly always means 6pm, and an explicit "5:00 AM" end
// against an "8:00 AM" start is a wrong answer rather than a missing one.
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
// tighter than MAX_SHIFT_MIN. It also keeps the junk `12:00 AM -> 12:00 AM`
// rows out: those flip to exactly 12 hours, which clears MAX_SHIFT_MIN but not this.
const MAX_INFER_MIN = 10 * 60;

// Form Responses timestamps are M/D/YYYY H:MM:SS, US order.
// ⛔ These MUST be compared as dates, never as text. "9/10/2026" sorts BEFORE
// "9/2/2026" as a string, so a resubmission would lose to a stale row.
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
  if (!email || email.indexOf('@') === -1) continue;
  const stamp = parseStamp(row[COL.timestamp]);
  if (schedules[email] && schedules[email].stamp >= stamp) continue;

  const blocks = [];
  for (let i = 0; i < 3; i++) {
    const client = String(row[COL.client[i]] || '').trim();
    if (!client) continue;
    // VAs with only one or two clients type something into the boxes for the
    // ones they do not have: "N/A", "NA", "None", "Mandatory Field".
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
    let spanMin = null;
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
          // Both times say AM and the end lands before the start: a wrong
          // answer rather than an overnight shift. Ailynn approved this rule
          // 2026-09-08 after ten VAs made the same slip.
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
          '" is ' + (span / 60).toFixed(2) + 'h, excluded');
      } else {
        hoursPerDay = span / 60;
        spanMin = span;
      }
    } else {
      flag('schedule-time-unreadable',
        email + ' / ' + client + ': start "' + row[COL.start[i]] + '" end "' + row[COL.end[i]] + '"');
    }
    const days = parseDays(row[COL.days[i]]);
    if (!days.length) {
      flag('schedule-days-unreadable', email + ' / ' + client + ': "' + row[COL.days[i]] + '"');
    }
    const tzLabel = String(row[COL.tz[i]] || '').trim();
    let tz = tzFor(tzLabel);
    if (!tz) {
      tz = ET;
      flag('schedule-timezone-assumed-eastern', email + ' / ' + client + ': timezone "' + tzLabel + '"');
    }
    // Some VAs repeat the same client in all three boxes (Keith Jimenez, Aug
    // 11-25: Nick Field three times). Identical blocks cover the same minutes,
    // so each one took the same punches and his hours came out tripled.
    const dupe = blocks.some(o =>
      o.client.toLowerCase() === client.toLowerCase() && o.startMin === startMin &&
      o.spanMin === spanMin && o.tz === tz && o.days.join() === days.join());
    if (dupe) {
      flag('schedule-block-repeated',
        email + ' / ' + client + ': client ' + (i + 1) + ' repeats an earlier block, counted once');
      continue;
    }
    blocks.push({
      client,
      empType: String(row[COL.empType[i]] || '').trim(),
      days: days, startMin: startMin, endMin: endMin, spanMin: spanMin, hoursPerDay: hoursPerDay,
      tzLabel: tzLabel, tz: tz
    });
  }
  schedules[email] = { stamp: stamp, fullName: String(row[COL.fullName] || '').trim(), blocks: blocks };
}

// Fixed 9-6 in-house staff get a built-in schedule instead of a form row, so
// their days run through the same late / early-out / lunch rules as a placed
// VA. Read from Ailynn's 2026-09-11 answer naming who is flexible (Ann, Kate,
// Janet, Key, Marfil), after the Aug 11-25 comparison showed Raf, Marmil and
// Benjomin paid every punched hour against payroll's 8 a day. Eastern: Raf's
// detail rows clock 9:00 AM-6:00 PM ET.
const IN_HOUSE_FIXED_DAYS = parseDays('monday, tuesday, wednesday, thursday, friday');
for (const email of Object.keys(IN_HOUSE)) {
  const ih = IN_HOUSE[email];
  if (!ih.fixed) continue;
  schedules[email] = { stamp: 0, fullName: ih.name, blocks: [{
    client: IN_HOUSE_CLIENT, empType: 'In house', days: IN_HOUSE_FIXED_DAYS,
    startMin: 9 * 60, endMin: 18 * 60, spanMin: 9 * 60, hoursPerDay: 9, tzLabel: 'Eastern', tz: ET
  }] };
}

// ------------------------------------------------ employeeId -> workEmail
// Timesheet entries and PTO requests both carry employeeId, so both go
// through the directory and neither needs fragile name matching.
const emailById = {};
const nameById = {};
const dirNameByEmail = {};
for (const e of (directory.employees || [])) {
  if (e.workEmail) {
    emailById[String(e.id)] = canon(e.workEmail);
    dirNameByEmail[canon(e.workEmail)] = e.displayName || '';
  }
  nameById[String(e.id)] = e.displayName || '';
}
// People who clock in to BambooHR but are not part of payroll at all.
// Ailynn, 2026-09-10: "leave me out". Matched by BambooHR display name as well
// as email, because her work email in BambooHR is not recorded here.
const EXCLUDED_NAMES = ['ailynn perez'];
const EXCLUDED_EMAILS = ['ailynnfpg@gmail.com', 'humanresources@stampstaff.com'];
let excludedPunches = 0;
Object.keys(emailById).forEach(id => {
  if (EXCLUDED_NAMES.indexOf(String(nameById[id] || '').trim().toLowerCase()) !== -1) EXCLUDED_EMAILS.push(emailById[id]);
});
function isExcluded(email) { return EXCLUDED_EMAILS.indexOf(email) !== -1; }

const activeEmails = {};
Object.keys(emailById).forEach(id => { activeEmails[emailById[id]] = true; });

// ---------------------------------------- Employee Number, from Payroll Main
// Matched by email. The header row is found by its labels, not a fixed row
// number, because Payroll Main has three summary rows above it.
const empByEmail = {};
let payrollHeaderFound = false;
if (payrollRows.length) {
  const h = payrollRows.findIndex(r =>
    r.some(c => /emp\s*#/i.test(String(c))) && r.some(c => /^email$/i.test(String(c).trim())));
  if (h === -1) {
    flag('payroll-main-unreadable', 'no header row holding both "Emp#" and "Email"');
  } else {
    payrollHeaderFound = true;
    const hdr = payrollRows[h].map(c => String(c || '').trim());
    const empCol = hdr.findIndex(c => /emp\s*#/i.test(c));
    const vaCol = hdr.findIndex(c => /^va$/i.test(c));
    const emCol = hdr.findIndex(c => /^email$/i.test(c));
    for (const r of payrollRows.slice(h + 1)) {
      const em = canon(r[emCol]);
      if (!em || em.indexOf('@') === -1) continue;
      const emp = String(r[empCol] || '').trim();
      if (!empByEmail[em] || (!empByEmail[em].emp && emp)) {
        empByEmail[em] = { emp: emp, name: vaCol === -1 ? '' : String(r[vaCol] || '').trim() };
      }
    }
  }
}

// --------------------------------------- Coach, from Revenue StampStaff
// The month tab holds one row per VA per client. Coach sits in column B with a
// blank header on "Sep 2026", so a "Coach" header is used when there is one
// and column B otherwise. Names there are spelled differently from the form
// ("Angelo Hugo", "Barry Rabinovitz - Classic Homes Real Estate"), so VA and
// client are matched on shared name words, never on exact text.
const STOP = { and: 1, the: 1, of: 1, jr: 1, sr: 1, ii: 1, iii: 1, iv: 1, ma: 1, mr: 1, mrs: 1, ms: 1, dr: 1 };
function tokens(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(t => t.length >= 2 && !STOP[t]);
}
const coachRows = [];
let revenueHeaderFound = false;
if (revenueRows.length) {
  const h = revenueRows.findIndex(r =>
    r.some(c => /name\s*of\s*va/i.test(String(c))) && r.some(c => /^\s*client/i.test(String(c))));
  if (h === -1) {
    flag('coach-sheet-unreadable', 'no header row holding both "Name Of VA" and "Client"');
  } else {
    revenueHeaderFound = true;
    const hdr = revenueRows[h].map(c => String(c || '').trim());
    const vaCol = hdr.findIndex(c => /name\s*of\s*va/i.test(c));
    const clCol = hdr.findIndex(c => /^client/i.test(c));
    let coCol = hdr.findIndex(c => /coach/i.test(c));
    if (coCol === -1) coCol = 1;
    const stCol = hdr.findIndex(c => /^status$/i.test(c));
    for (const r of revenueRows.slice(h + 1)) {
      const va = String(r[vaCol] || '').trim();
      const coach = String(r[coCol] || '').trim();
      if (!va || !coach) continue;
      coachRows.push({
        va: va, vaTok: tokens(va), clTok: tokens(r[clCol]), coach: coach,
        active: stCol === -1 || /active/i.test(String(r[stCol] || ''))
      });
    }
  }
}
// The Revenue tab also carries typos ("Grizelle Manze", "Marenzo Oolorga",
// "Shaunn Barnales", "Analynn Apostol" on Sep 2026, found 2026-09-10), so a name
// word also matches one a letter or two off. Two matching words are still
// required, which keeps "Mark"/"Marc" from pairing strangers.
function nearWord(a, b) {
  if (a === b) return true;
  const shorter = Math.min(a.length, b.length);
  const max = shorter >= 7 ? 2 : (shorter >= 4 ? 1 : 0);
  if (!max || Math.abs(a.length - b.length) > max) return false;
  let prev = [];
  for (let j = 0; j <= b.length; j++) prev.push(j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length] <= max;
}
const coachMemo = {};
const coachMissing = {};
const SPECIAL_CLIENTS = [REVIEW_CLIENT, UNSCHEDULED_CLIENT, NO_FORM_CLIENT];
function coachFor(email, names, client) {
  if (!coachRows.length || client === IN_HOUSE_CLIENT) return '';
  const key = email + '||' + client;
  if (key in coachMemo) return coachMemo[key];
  const mine = {};
  names.forEach(n => tokens(n).forEach(t => { mine[t] = true; }));
  const mineList = Object.keys(mine);
  let rows = coachRows
    .map(r => ({ r: r, s: r.vaTok.filter(t => mine[t] || mineList.some(m => nearWord(t, m))).length }))
    .filter(x => x.r.vaTok.length && x.s >= Math.min(2, x.r.vaTok.length));
  if (rows.length) {
    // Keep only the best-matching VA name, then prefer active rows.
    const best = Math.max.apply(null, rows.map(x => x.s));
    rows = rows.filter(x => x.s === best).map(x => x.r);
    const vaNames = rows.map(r => r.va.toLowerCase()).filter((v, i, a) => a.indexOf(v) === i);
    if (vaNames.length > 1) rows = [];   // two different VAs match equally: do not guess
  }
  const act = rows.filter(r => r.active);
  if (act.length) rows = act;
  let result = '';
  const coaches = rows.map(r => r.coach).filter((v, i, a) => a.indexOf(v) === i);
  if (coaches.length === 1) {
    result = coaches[0];
  } else if (coaches.length > 1 && SPECIAL_CLIENTS.indexOf(client) === -1) {
    const cTok = tokens(client);
    const scored = rows.map(r => ({ r: r, s: r.clTok.filter(t => cTok.indexOf(t) !== -1).length }))
      .sort((a, b) => b.s - a.s);
    if (scored[0].s > 0 && (scored.length === 1 || scored[1].s < scored[0].s)) result = scored[0].r.coach;
  }
  if (!result) coachMissing[key] = true;
  coachMemo[key] = result;
  return result;
}

// ---------------------------------------------------------------- period days
let D_START = P_START, D_END = P_END;
if (!D_START || !D_END) {
  const ds = timesheet.map(e => e.date).filter(Boolean).sort();
  D_START = ds[0] || '';
  D_END = ds[ds.length - 1] || '';
}
// One day either side, so an overnight or west-coast shift that crosses the
// period edge still finds its block.
const DATES = [];
if (D_START && D_END) {
  for (let d = addDays(D_START, -1); d <= addDays(D_END, 1); d = addDays(d, 1)) DATES.push(d);
}

// Every scheduled block on every date, as real UTC instants.
const instCache = {};
function instancesFor(email) {
  if (instCache[email]) return instCache[email];
  const out = [];
  const sched = schedules[email];
  if (sched) {
    sched.blocks.forEach(b => {
      if (b.startMin === null || b.spanMin === null) return;
      for (const d of DATES) {
        if (b.days.indexOf(weekdayOf(d)) === -1) continue;
        const [y, m, dd] = d.split('-').map(Number);
        const bs = zonedToUtc(y, m, dd, b.startMin, b.tz);
        out.push({ email: email, block: b, date: d, bs: bs, be: bs + b.spanMin * 60000, punches: [], extras: [] });
      }
    });
    out.sort((a, b) => a.bs - b.bs);
  }
  instCache[email] = out;
  return out;
}

// ---------------------------------------------------------------- totals
const totals = {};
function bucket(email, fullName, client) {
  const key = email + '||' + client;
  if (!totals[key]) {
    totals[key] = {
      email: email, fullName: fullName, client: client, inHouse: client === IN_HOUSE_CLIENT,
      workedHours: 0, ptoHours: 0, punches: 0, ptoDays: 0
    };
  }
  return totals[key];
}

// ------------------------------------------------------ worked punches
let openPunches = 0;
const openDays = {};        // email|ET date -> true: a punch that day has no clock-out
const unassigned = [];      // punches no scheduled block took, for their own detail rows
const inHouseDays = {};     // email|ET date -> day summary

for (const entry of timesheet) {
  const id = String(entry.employeeId);
  const email = emailById[id];
  if (!email) {
    flag('no-email-for-employee', 'employeeId ' + id + ' (' + (nameById[id] || 'unknown') + ')');
    continue;
  }
  if (isExcluded(email)) { excludedPunches++; continue; }
  const ps = Date.parse(entry.start);
  const pe = entry.end ? Date.parse(entry.end) : null;
  if (isNaN(ps) || (pe !== null && isNaN(pe))) {
    flag('punch-time-unreadable', email + ' ' + entry.date + ': "' + entry.start + '" to "' + entry.end + '"');
    continue;
  }
  const hrs = pe === null ? 0 : (Number(entry.hours) || 0);
  const etDate = localParts(ps, ET).date;
  const punch = { ps: ps, pe: pe, hours: hrs, date: entry.date };
  if (pe === null) {
    openPunches++;
    openDays[email + '|' + etDate] = true;
    flag('no-clock-out', email + ' ' + etDate + ': clocked in ' + fmtClock(ps) + ' ET, never clocked out');
  }

  // Flexible in-house staff are totalled straight: no schedule lookup, no client
  // matching. Fixed 9-6 staff fall through to their built-in schedule below.
  if (IN_HOUSE[email] && !IN_HOUSE[email].fixed) {
    const t = bucket(email, IN_HOUSE[email].name, IN_HOUSE_CLIENT);
    t.inHouse = true;
    t.workedHours += hrs;
    t.punches++;
    const k = email + '|' + etDate;
    const g = inHouseDays[k] || (inHouseDays[k] = { email: email, date: etDate, firstIn: ps, lastOut: null, hours: 0, open: false });
    g.firstIn = Math.min(g.firstIn, ps);
    if (pe === null) g.open = true; else g.lastOut = Math.max(g.lastOut || 0, pe);
    g.hours += hrs;
    continue;
  }

  const sched = schedules[email];
  if (!sched) {
    flag('no-schedule-row', email + ' (employeeId ' + id + ')');
    unassigned.push({ email: email, punch: punch, client: NO_FORM_CLIENT,
      why: 'No schedule form row: ' + round2(hrs) + 'h not assigned to a client' });
    continue;
  }

  // Which scheduled blocks does this punch actually overlap, in real time?
  const peEff = pe === null ? ps + 60000 : pe;
  const hits = [];
  for (const inst of instancesFor(email)) {
    let ov = Math.min(peEff, inst.be) - Math.max(ps, inst.bs);
    // A clock-in that was never clocked out still belongs to the block it
    // opened, even when it opened a little before the scheduled start.
    if (pe === null && ps >= inst.bs - OPEN_PUNCH_LEAD_MS && ps < inst.be) ov = Math.max(ov, 60000);
    if (ov > 0) hits.push({ inst: inst, ov: ov });
  }
  if (hits.length) {
    // The block the punch mostly sits in, plus any other block it covers at
    // least half of. A VA running a few minutes over into the next client's
    // block is still on the first client: found in testing 2026-09-10, when a
    // 4-minute run-over made the next row's Actual TimeIn read 7:01 AM, not 11:04.
    hits.sort((a, b) => b.ov - a.ov);
    const taken = hits.filter((h, i) => i === 0 || h.ov >= (h.inst.be - h.inst.bs) / 2);
    const sumOv = taken.reduce((a, h) => a + h.ov, 0);
    taken.forEach(h => {
      h.inst.punches.push(punch);
      bucket(email, sched.fullName, h.inst.block.client).workedHours += hrs * h.ov / sumOv;
    });
    bucket(email, sched.fullName, taken[0].inst.block.client).punches++;
    continue;
  }

  // Overlaps no block. entry.date is the authoritative work date for the weekday.
  const weekday = weekdayOf(entry.date);
  const cands = sched.blocks.filter(b => b.days.indexOf(weekday) !== -1);
  if (cands.length === 1) {
    // Only one client that day, so there is no one else it could belong to.
    const b = bucket(email, sched.fullName, cands[0].client);
    b.workedHours += hrs;
    b.punches++;
    flag('punch-outside-schedule', email + ' ' + etDate + ' ' + fmtClock(ps) + ' ET (' + round2(hrs) + 'h) outside the ' + cands[0].client + ' window');
    const inst = instancesFor(email).find(i => i.block === cands[0] && i.date === entry.date);
    if (inst) inst.extras.push(punch);
    else unassigned.push({ email: email, punch: punch, client: cands[0].client,
      why: 'Outside the scheduled window: ' + round2(hrs) + 'h charged to this client' });
  } else if (cands.length > 1) {
    // Held for review, never charged to a guessed client (Ailynn, 2026-09-10).
    const held = bucket(email, sched.fullName, REVIEW_CLIENT);
    held.workedHours += hrs;
    held.punches++;
    flag('punch-outside-every-window',
      email + ' ' + etDate + ' ' + fmtClock(ps) + ' ET (' + round2(hrs) + 'h) held FOR REVIEW, no scheduled window fits');
    unassigned.push({ email: email, punch: punch, client: REVIEW_CLIENT,
      why: 'Fits no scheduled window: ' + round2(hrs) + 'h held for review' });
  } else {
    flag('punch-on-unscheduled-day', email + ' ' + entry.date + ' (' + round2(hrs) + 'h) not on any schedule');
    unassigned.push({ email: email, punch: punch, client: UNSCHEDULED_CLIENT,
      why: 'Day not on the schedule: ' + round2(hrs) + 'h not counted' });
  }
}

// ---------------------------------------------------------------- PTO
// Decision 2026-09-07: each client gets the hours THAT client lost, from the
// VA's declared schedule. Decision 2026-09-10 (ruling 6): an hours-based
// Client Paid Holiday pays the stated hours, shared across that day's clients.
const ptoNote = {};   // email|date|client -> PTO hours, for the detail tab's remarks
for (const req of pto) {
  const id = String(req.employeeId);
  const email = emailById[id];
  if (!email) {
    flag('pto-no-email-for-employee', 'employeeId ' + id + ' (' + (req.name || '?') + ')');
    continue;
  }
  if (isExcluded(email)) continue;
  const dates = req.dates || {};
  const unit = String((req.amount && req.amount.unit) || 'days').toLowerCase();
  if (unit !== 'days' && unit !== 'hours') {
    flag('pto-unknown-unit', 'employeeId ' + id + ' request ' + req.id + ': unit "' + unit + '", skipped');
    continue;
  }

  if (IN_HOUSE[email]) {
    const ih = IN_HOUSE[email];
    const t = bucket(email, ih.name, IN_HOUSE_CLIENT);
    t.inHouse = true;
    for (const date of Object.keys(dates)) {
      if (!inPeriod(date)) continue;
      const amt = Number(dates[date]) || 0;
      let h;
      if (unit === 'hours') { t.ptoDays += 1; h = amt; ptoHoursUnitDates++; }
      else { t.ptoDays += amt; h = ih.ptoHoursPerDay * amt; }
      t.ptoHours += h;
      const nk = email + '|' + date + '|' + IN_HOUSE_CLIENT;
      ptoNote[nk] = (ptoNote[nk] || 0) + h;
    }
    continue;
  }

  const sched = schedules[email];
  if (!sched) { flag('pto-no-schedule-row', email + ' (' + (req.name || '?') + ')'); continue; }

  for (const date of Object.keys(dates)) {
    if (!inPeriod(date)) continue;
    const dayAmount = Number(dates[date]) || 0;      // days: 1 = full, 0.5 = half. hours: the hours.
    const candidates = sched.blocks.filter(b => b.days.indexOf(weekdayOf(date)) !== -1 && b.hoursPerDay !== null);

    if (!candidates.length) {
      flag('pto-on-unscheduled-day', email + ' ' + date + ': approved PTO on a day with no schedule');
      continue;
    }
    const totalSched = candidates.reduce((a, c) => a + c.hoursPerDay, 0) || 1;
    if (candidates.length > 1) {
      flag('pto-split-across-clients',
        email + ' ' + date + ': ' + candidates.map(c => c.client + ' ' +
          (unit === 'hours' ? dayAmount * c.hoursPerDay / totalSched : c.hoursPerDay * dayAmount).toFixed(2) + 'h').join(', '));
    }
    if (unit === 'hours') ptoHoursUnitDates++;
    for (const b of candidates) {
      const t = bucket(email, sched.fullName, b.client);
      let h;
      if (unit === 'hours') {
        const share = b.hoursPerDay / totalSched;
        h = dayAmount * share;
        t.ptoDays += share;
      } else {
        h = b.hoursPerDay * dayAmount;
        t.ptoDays += dayAmount;
      }
      t.ptoHours += h;
      const nk = email + '|' + date + '|' + b.client;
      ptoNote[nk] = (ptoNote[nk] || 0) + h;
    }
  }
}

// ------------------------------------------------------- detail rows
function namesFor(email, fallback) {
  return [(empByEmail[email] || {}).name, (schedules[email] || {}).fullName, dirNameByEmail[email], fallback]
    .filter(Boolean);
}
function baseRow(email, fallbackName, client, etDate, sortMs) {
  const emp = empByEmail[email] || {};
  return {
    email: email, name: emp.name || fallbackName || dirNameByEmail[email] || '', empNo: emp.emp || '',
    client: client, coach: coachFor(email, namesFor(email, fallbackName), client),
    date: etDate, sortMs: sortMs, schedIn: '', schedOut: '', actIn: '', actOut: '', final: 0, remarks: ''
  };
}

function detailForInstance(inst, prev) {
  const b = inst.block;
  const email = inst.email;
  const etDate = localParts(inst.bs, ET).date;
  const row = baseRow(email, schedules[email].fullName, b.client, etDate, inst.bs);
  row.schedIn = fmtClock(inst.bs);
  row.schedOut = fmtClock(inst.be);
  const remarks = [];
  const ptoH = ptoNote[email + '|' + inst.date + '|' + b.client] || 0;
  if (ptoH) remarks.push('Approved PTO ' + round2(ptoH) + 'h');

  if (inst.punches.some(p => p.pe === null) || openDays[email + '|' + etDate]) {
    // policies/va-clock-in-out-rules.md: no clock-out means the whole day is
    // unpaid, every block of it. Checked before "No login" so a missed
    // clock-out is never reported as an absence.
    if (inst.firstIn !== null) {
      row.actIn = fmtClock(inst.firstIn);
      row.actOut = inst.lastOut ? fmtClock(inst.lastOut) : '--';
    }
    remarks.push('No clock-out: day unpaid, VA can dispute for next cutoff');
  } else if (!inst.punches.length) {
    if (!ptoH) remarks.push('No login');
  } else {
    row.actIn = fmtClock(inst.firstIn);
    row.actOut = fmtClock(inst.lastOut);

    const late = Math.max(0, Math.round((inst.firstIn - inst.bs) / 60000));
    let lateDed = 0;
    if (late > GRACE_MIN) {
      // Client-to-client crossover: a late start caused by running over on the
      // previous client is not an unexcused late, but the VA is still told.
      const crossover = prev && prev.be <= inst.bs && prev.lastOut !== null &&
        prev.lastOut > inst.bs && inst.firstIn - prev.lastOut <= GRACE_MIN * 60000;
      if (crossover) {
        remarks.push(fmtDur(late) + ' late after running over on ' + prev.block.client + ', not deducted');
      } else {
        lateDed = late;
        remarks.push(fmtDur(late) + ' LATE');
      }
    }
    const early = Math.max(0, Math.round((inst.be - inst.lastOut) / 60000));
    if (early > 0) remarks.push(fmtDur(early) + ' EARLY OUT');

    // Time inside the block with no punch running, between the first and last punch.
    const segs = inst.punches
      .map(p => [Math.max(p.ps, inst.bs), Math.min(p.pe, inst.be)])
      .filter(s => s[1] > s[0])
      .sort((x, y) => x[0] - y[0]);
    let gap = 0;
    let cur = segs.length ? segs[0][1] : 0;
    for (let i = 1; i < segs.length; i++) {
      if (segs[i][0] > cur) gap += segs[i][0] - cur;
      cur = Math.max(cur, segs[i][1]);
    }
    const gapMin = Math.round(gap / 60000);
    // A clocked-out lunch counts toward the lunch hour, so it is never taken twice.
    const lunch = b.spanMin >= LUNCH_BLOCK_MIN ? LUNCH_MIN : 0;
    if (gapMin > lunch) remarks.push(fmtDur(gapMin - lunch) + ' not clocked in during the shift');

    row.final = round2(Math.max(0, b.spanMin - lateDed - early - Math.max(gapMin, lunch)) / 60);
  }
  inst.extras.forEach(p => remarks.push(
    'Extra punch ' + fmtClock(p.ps) + ' - ' + (p.pe === null ? '--' : fmtClock(p.pe)) +
    ' outside the schedule (' + round2(p.hours) + 'h), not paid here'));
  row.remarks = remarks.join('; ');
  return row;
}

const detail = [];

// Placed VAs: one row per scheduled block per day, for VAs still in BambooHR.
for (const email of Object.keys(schedules)) {
  if (!activeEmails[email] || (IN_HOUSE[email] && !IN_HOUSE[email].fixed)) continue;
  let prev = null;
  for (const inst of instancesFor(email)) {
    const ps = inst.punches.slice().sort((a, b) => a.ps - b.ps);
    inst.firstIn = ps.length ? ps[0].ps : null;
    const closed = ps.filter(p => p.pe !== null);
    inst.lastOut = closed.length ? Math.max.apply(null, closed.map(p => p.pe)) : null;
    if (inst.date >= D_START && inst.date <= D_END) detail.push(detailForInstance(inst, prev));
    if (ps.length) prev = inst;
  }
}

// Punches no block took: review, unscheduled day, no form row.
for (const u of unassigned) {
  const etDate = localParts(u.punch.ps, ET).date;
  const row = baseRow(u.email, (schedules[u.email] || {}).fullName, u.client, etDate, u.punch.ps);
  row.actIn = fmtClock(u.punch.ps);
  row.actOut = u.punch.pe === null ? '--' : fmtClock(u.punch.pe);
  row.remarks = u.why + (u.punch.pe === null ? '; No clock-out' : '');
  detail.push(row);
}

// In-house: one row per day worked, hours as punched.
for (const k of Object.keys(inHouseDays)) {
  const g = inHouseDays[k];
  const ih = IN_HOUSE[g.email];
  const row = baseRow(g.email, ih.name, IN_HOUSE_CLIENT, g.date, g.firstIn);
  row.schedIn = ih.schedIn;
  row.schedOut = ih.schedOut;
  row.actIn = fmtClock(g.firstIn);
  row.actOut = g.lastOut ? fmtClock(g.lastOut) : '--';
  row.final = round2(g.hours);
  const remarks = [];
  const ptoH = ptoNote[g.email + '|' + g.date + '|' + IN_HOUSE_CLIENT];
  if (ptoH) remarks.push('Approved PTO ' + round2(ptoH) + 'h');
  if (g.open) remarks.push('No clock-out on one punch');
  row.remarks = remarks.join('; ');
  detail.push(row);
}
for (const nk of Object.keys(ptoNote)) {
  const [email, date, client] = nk.split('|');
  // Fixed staff already carry the PTO remark on their scheduled row.
  if (client !== IN_HOUSE_CLIENT || IN_HOUSE[email].fixed || inHouseDays[email + '|' + date]) continue;
  const row = baseRow(email, IN_HOUSE[email].name, IN_HOUSE_CLIENT, date, Date.parse(date + 'T12:00:00Z'));
  row.schedIn = IN_HOUSE[email].schedIn;
  row.schedOut = IN_HOUSE[email].schedOut;
  row.remarks = 'Approved PTO ' + round2(ptoNote[nk]) + 'h';
  detail.push(row);
}

detail.sort((a, b) =>
  a.name.localeCompare(b.name) || a.date.localeCompare(b.date) || a.sortMs - b.sortMs);

Object.keys(coachMissing).forEach(k => {
  const [email, client] = k.split('||');
  flag('coach-not-found', email + ' / ' + client);
});

// ---------------------------------------------------------------- output
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

// Attach each VA's own flags to their own totals row, so the person reviewing
// the sheet sees "CHECK THIS ONE" beside the name.
const flagsForEmail = {};
flags.forEach(f => {
  const m = String(f.detail).match(/[\w.+-]+@[\w.-]+/);
  if (!m) return;
  const e = canon(m[0]);
  (flagsForEmail[e] = flagsForEmail[e] || []).push(f.kind);
});

const cutoff = (inputData.periodStart || '?') + ' to ' + (inputData.periodEnd || '?');
const runAt = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';

// Automated Pull: one row per VA per client.
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
  colFlags.push(fs.filter((v, i) => fs.indexOf(v) === i).join(', '));
});

// Timesheet Detail: one row per scheduled block per day. Same order as its header row.
const dCutoff = [], dRunAt = [], dCoach = [], dClient = [], dEmpNo = [], dName = [], dDate = [];
const dSchedIn = [], dSchedOut = [], dActIn = [], dActOut = [], dFinal = [], dRemarks = [];
detail.forEach(r => {
  dCutoff.push(cutoff);
  dRunAt.push(runAt);
  dCoach.push(r.coach);
  dClient.push(r.client);
  dEmpNo.push(r.empNo);
  dName.push(r.name);
  dDate.push(fmtDate(r.date));
  dSchedIn.push(r.schedIn);
  dSchedOut.push(r.schedOut);
  dActIn.push(r.actIn);
  dActOut.push(r.actOut);
  dFinal.push(r.final);
  dRemarks.push(r.remarks);
});

const flagsByKind = {};
flags.forEach(f => { flagsByKind[f.kind] = (flagsByKind[f.kind] || 0) + 1; });

// `return` is what this Zapier account's Code step honours. `output = {...}`
// produced a blank Output on 2026-09-07 with no error at all.
return {
  periodRows: rows.length,
  detailRows: detail.length,
  vaCount: Object.keys(uniqueEmails).length,
  flagCount: flags.length,
  cutoff: cutoff,
  runAt: runAt,
  flagsByKind: JSON.stringify(flagsByKind),
  diagnostics: JSON.stringify({
    timesheetEntries: timesheet.length,
    openPunches: openPunches,
    excludedPunches: excludedPunches,
    ptoRequests: pto.length,
    directoryEmployees: (directory.employees || []).length,
    sheetRows: sheetRows.length,
    schedulesBuilt: Object.keys(schedules).length,
    unparsedStamps: unparsedStamps,
    inHouseListed: Object.keys(IN_HOUSE).length,
    inHouseSeenInPeriod: rows.filter(r => r.inHouse).length,
    ptoDatesOutsidePeriod: ptoDatesOutsidePeriod,
    ptoHoursUnitDates: ptoHoursUnitDates,
    ptoWindow: P_START && P_END ? P_START + ' to ' + P_END : 'NOT SUPPLIED - all PTO dates counted',
    punchTimes: 'read as UTC, shown in Eastern',
    employeeNumbers: payrollRows.length ? (payrollHeaderFound ? Object.keys(empByEmail).length + ' emails from Payroll Main' : 'Payroll Main header not found') : 'payrollMainRaw not mapped',
    coachRows: revenueRows.length ? (revenueHeaderFound ? coachRows.length + ' rows from the Revenue tab' : 'Revenue header not found') : 'revenueRaw not mapped',
    coachNotFound: Object.keys(coachMissing).length
  }),
  flagSample: JSON.stringify(flags.slice(0, 20)),
  rows: JSON.stringify(rows),
  flags: JSON.stringify(flags),
  // Automated Pull line items. Same length, same order.
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
  // Timesheet Detail line items. Same length, same order.
  dCutoff: dCutoff,
  dRunAt: dRunAt,
  dCoach: dCoach,
  dClient: dClient,
  dEmpNo: dEmpNo,
  dName: dName,
  dDate: dDate,
  dSchedIn: dSchedIn,
  dSchedOut: dSchedOut,
  dActIn: dActIn,
  dActOut: dActOut,
  dFinal: dFinal,
  dRemarks: dRemarks
};
