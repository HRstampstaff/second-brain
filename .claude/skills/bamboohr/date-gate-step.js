/*
 * Step 2 of the BambooHR payroll pull: Code by Zapier, "Run JavaScript".
 * Decides whether today is a pull day and, if so, which cutoff period to pull.
 * Rebuilt 2026-09-10 from the logic proven in n8n on 2026-09-02 and in the
 * original Zap on 2026-09-03 (policies/payroll-cutoff.md for the periods).
 *
 * Periods:   26th of last month -> 10th   (paid on the 20th)
 *            11th -> 25th                 (paid on the 5th of next month)
 * Reminder:  the 11th and the 26th, moved to Monday if it lands on a weekend.
 * Pull day:  the day AFTER the reminder, so coaches have had a day to approve.
 *
 * Input Data (optional):
 *   testDate -> YYYY-MM-DD. Pretend today is this date, to test without
 *               waiting for a real pull day. LEAVE BLANK IN PRODUCTION.
 *               The output says `usingTestDate: yes` whenever it is set, so a
 *               forgotten value is visible on every run.
 *
 * Step 3 (Filter) continues only when `isPullDay` exactly matches `true`.
 */

function pad(n) { return String(n).padStart(2, '0'); }
function fmt(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }

let now;
const testDate = String((inputData && inputData.testDate) || '').trim();
if (/^\d{4}-\d{2}-\d{2}$/.test(testDate)) {
  const [y, m, d] = testDate.split('-').map(Number);
  now = new Date(y, m - 1, d);
} else {
  // "Today" in Florida, not in the UTC server Zapier runs on.
  const et = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const p = new Date(et);
  now = new Date(p.getFullYear(), p.getMonth(), p.getDate());
}

const year = now.getFullYear();
const month = now.getMonth();

// Weekend reminder moves forward to Monday.
function nextBusinessDay(d) {
  const r = new Date(d);
  if (r.getDay() === 6) r.setDate(r.getDate() + 2);
  else if (r.getDay() === 0) r.setDate(r.getDate() + 1);
  return r;
}
function plusOne(d) { const r = new Date(d); r.setDate(r.getDate() + 1); return r; }

const pullA = plusOne(nextBusinessDay(new Date(year, month, 11)));
const pullB = plusOne(nextBusinessDay(new Date(year, month, 26)));

const today = fmt(now);
let periodStart = '', periodEnd = '', cutoffLabel = '';

if (fmt(pullA) === today) {
  const start = new Date(year, month - 1, 26);   // JS rolls month -1 back into last year
  const end = new Date(year, month, 10);
  periodStart = fmt(start);
  periodEnd = fmt(end);
  cutoffLabel = periodStart + ' to ' + periodEnd + ' (paid on the 20th)';
} else if (fmt(pullB) === today) {
  periodStart = fmt(new Date(year, month, 11));
  periodEnd = fmt(new Date(year, month, 25));
  cutoffLabel = periodStart + ' to ' + periodEnd + ' (paid on the 5th)';
}

// The Revenue StampStaff tab the coach lookup reads: the pull date's month,
// written the way Ailynn's recent tabs are named ("Aug 2026", "Sep 2026").
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const revenueTab = MONTHS_SHORT[month] + ' ' + year;

return {
  revenueTab: revenueTab,
  isPullDay: periodStart ? 'true' : 'false',
  periodStart: periodStart,
  periodEnd: periodEnd,
  cutoffLabel: cutoffLabel,
  today: today,
  usingTestDate: testDate ? 'yes' : 'no',
  nextPullA: fmt(pullA),
  nextPullB: fmt(pullB)
};
