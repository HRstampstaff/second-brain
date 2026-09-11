---
name: bamboohr
description: "IN PROGRESS — API access proven, being rebuilt in Zapier (not n8n). Load before any work touching BambooHR: PTO approvals, timesheets/punches, or the API. Trigger on 'BambooHR', 'timesheet', 'PTO approval', 'coach approved', or any request to pull data out of BambooHR automatically."
---

# BambooHR

**Version: 0.4 (IN PROGRESS) - 2026-09-07**

**Not a placeholder anymore — the BambooHR API is live-tested and proven, below, against Stamp
Staff's real account. Fill in the rest the same way: test for real, write down what's actually true,
don't guess.**

## Platform decision, 2026-09-02: building in Zapier, not n8n

**⚠️ Corrected and verified 2026-09-10:** Stamp Staff's paid Zapier plan is **Pro 1500** (Professional, billed annually, 1,500 tasks a month, **not unlimited**) on the Zapier login **teamasst@gmail.com**, which is Mark Stampini's, workspace "Personal Account", id 23593249. Read from Zapier's own account data, not assumed. The original Payroll Zap (378947092) is not in that account and is being rebuilt there. **Two other Zapier logins turn up in the browsers, both on free trials** ("Stamp", reached through humanresources@stampstaff.com): never build in those.

**A partial workflow (schedule + date logic + both BambooHR calls + the Form Responses read) was
built and proven live in n8n first, on n8n's 14-day free trial. That n8n workflow is being abandoned,
not finished.** Reason: Stamp Staff already pays for Zapier Professional (unlimited Zaps, billed on a
shared monthly task pool — building this costs nothing extra beyond the existing subscription), while
the n8n trial expires 2026-09-16 and deletes the whole workspace on expiry with no grace period.
Finishing in n8n first and then moving to Zapier would mean building it twice — there is no
import/export between the two platforms, no shared credential or expression format. Decided to stop
adding to the n8n version and build the rest directly in Zapier instead.

**What carries over from the n8n work (still 100% valid, platform-independent):** every proven
BambooHR endpoint, the auth method, the date-gating rule, the Form Responses duplicate-header fix,
and the whole join-logic plan below. **What does NOT carry over:** the actual n8n nodes themselves
(Schedule Trigger, Code node, HTTP Request nodes) — those need to be rebuilt as Zapier steps (likely:
Schedule trigger → Code by Zapier for date-gating → Webhooks by Zapier for each BambooHR call →
Google Sheets action → Code by Zapier for the join logic → Google Sheets write). Zapier's
Professional plan supports Code steps and Webhooks; confirm that's still the plan Stamp Staff has
before assuming these are available.

## Zapier build progress — started 2026-09-03

**Built so far, all live-tested in the real Zapier account:**

1. **Trigger: Schedule by Zapier, "Every Day"**, 11:00 AM, Timezone Override `America/New_York`,
   "Trigger on weekends?" = yes (the date-gating step below decides whether to actually do anything,
   not the trigger).
2. **Code by Zapier, "Run JavaScript"** — the same date-gating logic as the n8n version, adapted:
   Zapier's Code step returns one object (not an array), so instead of returning `[]` on a non-pull
   day, it returns `{periodStart: '', periodEnd: '', ..., isPullDay: 'false'}` and a separate Filter
   step (next) does the actual stopping. Exact code is in the live Zap; port from the n8n version
   above if this file needs it rebuilt.
3. **Filter by Zapier**: "Only continue if" → `Is Pull Day` (Text) Exactly matches `true`. Verified
   correctly stops the Zap on a non-pull day (tested live, 2026-09-03 correctly did not continue).
4. **Webhooks by Zapier, GET**, timesheet entries — **fully working**, verified against real data
   (same real records as the n8n test: employeeId 192, 2026-08-26, 0.2333 hours).
5. **Webhooks by Zapier, GET**, approved PTO — **fully working**, same URL/params as the n8n version,
   status query param must be typed as **literal text** `approved`, not an inserted data chip (easy
   to fat-finger the wrong thing into that field since Zapier's insert-data UI sits right there).
   Verified against real data (same record as n8n: id 4752, Rubiemar Dela Torre).
6. **Webhooks by Zapier, GET**, employee directory (`/v1/employees/directory`, no query params) —
   **fully working**. Needed because timesheet entries only carry `employeeId`, no name/email; this
   step's `workEmail` per employee is how a punch gets matched to a VA in the join step later.
7. **Google Sheets, "Get Many Spreadsheet Rows (Advanced)"**, Form Responses 1 tab, Row count 1500,
   First row 2 (skips the header) — **fully working**, real data confirmed. Output format is
   positional/raw (`Rows.1.1`, `Rows.1.2`, etc., not header-keyed), which sidesteps the duplicate-
   header problem entirely regardless of the header-row fix — column positions (0-indexed from the
   original 22-column header list): 0 Timestamp, 1 Full Name, 2 Email Address, 3 Client1 Name,
   4 Employment Type, 5 Days worked 1, 6 Start 1, 7 End 1, 8 Timezone 1, 9 Client2 Name,
   10 Employment Type 2, 11 Days worked 2, 12 Start 2, 13 End 2, 14 Timezone 2, 15 Client3 Name,
   16 Employment Type 3, 17 Days worked 3, 18 Start 3, 19 End 3, 20 Timezone 3, 21 Anything else.

**All four data sources are now proven live in Zapier, and as of 2026-09-07 all three BambooHR ones
return their full raw payload. Not yet built: the join logic (Code by
Zapier) that actually matches punches/PTO to a client and computes per-VA-per-client hours, and the
write-back into the payroll sheet.**

## Blocker cleared, 2026-09-07: Return Raw Response on a Custom Request

**Solved and live-tested against the real account.** The array-flattening problem is gone and **no
Zapier upgrade was needed**, so option 1 (paying for extended Code runtime) is off the table and
option 3 (pause) is closed. Option 2's "raw body" hunch was right.

**The fix:** in Webhooks by Zapier, change the action event from **GET** to **Custom Request**, then
set **Return Raw Response** to **Yes**. The step then exposes a single `Response` field holding the
entire unparsed response body as one text string, root-level bare arrays included. The Code step does
`JSON.parse(inputData.x)` and has the whole list.

**Custom Request alone is NOT enough.** It is the `Return Raw Response` toggle that does it, and that
toggle sits at the BOTTOM of the Configure section, below Headers, where it is easy to miss.

Applied to all three BambooHR steps on 2026-09-07, each verified against real data:

- **step 4, timesheet entries** - `[{"id":155841,"employeeId":192,...},{"id":155842,"employeeId":400,...}`
- **step 5, approved PTO** - `[{"id":"4752","employeeId":"217",...},{"id":"4778","employeeId":"391",...}`
- **step 6, employee directory** - `{"fields":[...],"employees":[...]}`

**Custom Request has NO "Query String Params" section**, unlike GET. Query parameters go inline in the
URL, with the step 2 date chips inserted between literal text:
`...timesheet_entries?start=<chip>&end=<chip>`. Typing the literal `&end=` between the two chips is
easy to forget, and the result is a silently malformed URL (`?start=2026-08-262026-09-10`) rather than
an error.

**⚠️ Switching the action event BLANKS the whole Configure section, including the Authorization
header.** This cost real time on 2026-09-07. The header was re-copied from the field's COLLAPSED
display, which truncates, so what landed was the literal text `Basic ...` and then just `Basic`.
**Copy from INSIDE the field (click in, Ctrl+A, Ctrl+C), never from the collapsed display, and park
the value in a scratch window outside the browser before converting anything** - otherwise converting
the last unconverted step destroys the only remaining good copy of it.

**Two different failures both mean "auth is wrong", and only one of them is a 401:**

- **`401`** from `time_tracking/timesheet_entries` - header missing or malformed.
- **A 200 carrying BambooHR's HTML login page** (`<!DOCTYPE html>` ... `<title>Login - Stamp Staff
  Remote Teams and Talents`) from `employees/directory`. Same cause, different endpoint behaviour.
  Do not read this as a URL or routing problem.

**XML back instead of JSON means the `Accept` header did not survive the event switch.** Re-add the
second Headers row `Accept` / `application/json` after every conversion.

**Superseded:** the Code-step-fetches-everything approach below hit Zapier's Code runtime limit and is
no longer needed, since the three Webhooks steps now hand their full bodies to the Code step directly.
Kept only as a record of what was tried.

```javascript
// SUPERSEDED 2026-09-07 - correct JavaScript, but exceeded Zapier's Code step runtime limit.
const authHeader = 'Basic ' + Buffer.from(inputData.apiKey + ':x').toString('base64');
const headers = { Accept: 'application/json', Authorization: authHeader };

const [timesheetRes, ptoRes, dirRes] = await Promise.all([
  fetch(`https://stampstaff.bamboohr.com/api/v1/time_tracking/timesheet_entries?start=${inputData.periodStart}&end=${inputData.periodEnd}`, { headers }),
  fetch(`https://stampstaff.bamboohr.com/api/v1/time_off/requests?start=${inputData.periodStart}&end=${inputData.periodEnd}&status=approved`, { headers }),
  fetch('https://stampstaff.bamboohr.com/api/v1/employees/directory', { headers })
]);
const [timesheet, pto, directory] = await Promise.all([timesheetRes.json(), ptoRes.json(), dirRes.json()]);
const sheet = JSON.parse(inputData.sheetRaw);
```

**Bug hit and fixed: Webhooks by Zapier's dedicated "Basic Auth" field could not be made to work.**
Tried `username:password` format, tried with/without stray characters from browser autofill
contaminating the field — consistently got 401 regardless of what was entered. This is a documented,
unresolved issue in Zapier's own community forum (other users report the same thing, no official fix
posted). **Verified independently that the credential itself was never the problem**: ran
`curl -u "<key>:x" https://stampstaff.bamboohr.com/api/v1/employees/directory` directly, got 200.
**Fix: skip the "Basic Auth" field entirely.** Instead, manually compute the Basic Auth header value
(`Basic ` + base64 of `apikey:x`) and set it as a literal **Headers** row: key `Authorization`, value
the precomputed string, pasted as static text — not built dynamically per-request via a Code step
(that path was tried first and repeatedly got corrupted, most likely by manual retyping of the raw
key into an Input Data field — small 1-2 character differences each attempt, classic typo pattern in
a 40-character hex string). A static value is fine here since the credential doesn't change between
runs; if the BambooHR API key is ever rotated, this header value needs recomputing and repasting into
every Webhooks by Zapier step that uses it (there is no shared/reusable credential store for this
approach the way n8n's credential system had one — a real downside of this workaround, accepted for
now given the Basic Auth field doesn't work at all).

**Zapier gotcha: a Code by Zapier step's "Run Code" button (inside the expanded code editor) does
NOT refresh the sample data other steps see.** Downstream steps' dynamic field references (the
"insert data" chips) kept showing stale/empty values after editing and running code in the editor.
Fix: after editing code, close the editor and use the step's own **Test → Retest step** button (not
"Run Code") to actually register a fresh sample for the rest of the Zap to reference.

## ⛔ The real blocker now is the Form Responses data, not the build

**First live run of the join, 2026-09-07, period 2026-08-26 to 2026-09-10: 92 VA-client rows across
75 VAs, and 527 flags.** The arithmetic works. The schedule data it depends on does not, and the
totals are NOT fit for payroll until that is fixed.

| Count | Flag | What it is |
|---|---|---|
| **335** | `no-schedule-row` | Punches from VAs with **no row at all** in the Form Responses tab |
| **125** | `punch-outside-every-window` | Punch outside every scheduled window on a multi-client day, assigned to the first client as a fallback and possibly billed to the wrong one. **Since 2026-09-10 held as `FOR REVIEW` instead** |
| **23** | `schedule-span-implausible` | Impossible spans, excluded from PTO totals |
| 17 | `no-email-for-employee` | In BambooHR with no `workEmail`, so nothing can match them |
| 12 | `punch-on-unscheduled-day` | Worked a day they are not rostered for |
| 4 + 1 | `pto-on-unscheduled-day`, `pto-no-schedule-row` | Same, for approved PTO |
| 4 | `schedule-timezone-differs` | Schedule declares a timezone other than Eastern; not handled |
| 2 | `pto-split-across-clients` | Working as designed, listed so it can be eyeballed |
| 2 + 2 | `schedule-time-unreadable`, `schedule-days-unreadable` | Literal `undefined` in the sheet |

**Real examples worth keeping**, because they show the shape of the problem:

- `alyssadawn.stampstaff@gmail.com / Jarrett Cesmat: "8:00:00 AM" to "5:00:00 AM"` - 21 hours. The
  `AM` is explicit, so no parser can safely correct it. **Before this was caught she came out with
  168 PTO hours over 8 days and a 242-hour period total.** The sheet row needs changing to 5:00 PM.
- `angelo.stampstaff@gmail.com / N/A: "12:00:00 AM" to "12:00:00 AM"` - 24 hours, and the client is
  the literal text `N/A`.
- `annalyn.stampinigroup@gmail.com / NA: start "undefined" end "undefined"`.

**Ignored and removed from the output since 2026-09-10, by Ailynn's ruling.** `workedHoursApproved` came back 0 on every single row, because no punch in the period carries
`approved: true`. Either coaches had not approved yet when this ran, or that field does not mean what
it looks like. Do not build a payroll rule on it until that is settled.

**What unblocks the most, and it is not a code change:** every active VA needs a current row in the
Form Responses tab. 335 unattributed punches is a large share of the period. The real chase list,
worked out from the Payroll Main tab on 2026-09-08, is 22 people, not 335 punches or 35 rows:
[notes/2026-09-08_va-schedule-form-gaps.md](../../../notes/2026-09-08_va-schedule-form-gaps.md).

## ⛔ In-house staff are a separate case and the join does not handle them yet

**Ailynn, 2026-09-08: Ann, Kate and Janet work flexible hours between 9:00am and 8:00pm Eastern.**
They are Stamp Staff's own people, not placed with a client, so **their hours are never split by
client and they will never appear in the Form Responses tab.** See
[policies/in-house-team-hours.md](../../../policies/in-house-team-hours.md).

**Handled as of 2026-09-08.** The join carries an `IN_HOUSE` map keyed by work email. Those punches
are totalled straight into a single `IN HOUSE` client bucket, with no schedule lookup, no
day-of-week or time-of-day matching, and no `no-schedule-row` flag.

**Changed 2026-09-11: only the flexible staff are totalled straight.** Ann, Kate, Janet, Key and
Marfil are flexible. Raf, Marmil and Benjomin carry `fixed: true` and get a built-in 9-6 Eastern
Monday-Friday schedule, so their days go through the placed-VA rules: late past grace and early out
deducted, 1h unpaid lunch off the 9h block, a no-clock-out day paid 0. Their PTO still pays
`ptoHoursPerDay` (8). The bucket stays `IN HOUSE`.

**Why a list in the code and not a read of the payroll sheet.** This reverses the earlier
recommendation in this file, deliberately. Keying off the payroll sheet's `Contract Type` column was
the obvious answer and it is wrong: **that column identifies only five of the eight.** Benjomin
Kristian Reyes, Key Bantola and Marfil Ganelo all read `New VA Contract` despite being in-house.
Checked 2026-09-08 against the real Payroll Main tab: the client column (`K. Stampini` or `project`)
does identify all eight, and no VA carries Stampini as a second or third client, but that is a
coincidence of the current data rather than a field anybody maintains for the purpose.

**The list cannot rot silently, which was the objection to it.** Anyone in BambooHR who is neither in
the list nor in Form Responses already raises `no-schedule-row`, so a new coach shows up as a flag
rather than as silence. **If it ever grows past about fifteen people or starts churning, move it to a
read of Payroll Main.**

**PTO for in-house staff is counted in DAYS and left at zero HOURS**, and each one raises
`in-house-pto-needs-a-rule`. What a PTO day is worth is genuinely undecided: a 5-9pm shift is plainly
four hours, a 9-6 could be eight or nine depending on lunch, and a flexi day has no fixed length at
all. **Filling `ptoHoursPerDay` in the `IN_HOUSE` map is what turns this on**, one number per person,
and the flag stops firing by itself.

## Step 8, the join: written 2026-09-07, first live run same day

**The code lives at `.claude/skills/bamboohr/join-step.js` in this folder.** It is written but has
never been executed against a live run, so treat every number it produces as unverified until a real
test says otherwise.

**Input Data mapping the Code step needs** (left column is the exact name the code reads):

| Name | Maps to |
|---|---|
| `timesheetRaw` | step 4 `Response` |
| `ptoRaw` | step 5 `Response` |
| `directoryRaw` | step 6 `Response` |
| `sheetRaw` | `Object.to_json( step 7 Raw Output )` |

**An improvement on the earlier plan: PTO requests carry `employeeId` too.** The old plan had PTO
matching Form Responses on "Full Name" as text, because `time_off/requests` returns `name`. It also
returns `employeeId`, so both punches AND PTO go through the directory's `employeeId` -> `workEmail`
map and nothing depends on two people's names being spelled the same way in two systems.

**It reads the weekday from `entry.date`, not from `entry.start`.** Whether BambooHR's `start`/`end`
are UTC or already local is not settled (both carry a `+00:00` offset while a sibling `timezone`
field says `America/New_York`). Using the date field means a wrong guess cannot move a shift onto the
wrong day. **The code counts the disagreements and reports them** as `utcDateMismatches` in its
`diagnostics` output: zero across a real period means the timestamps are local, and that is the
thing to read first on the first live test.

**It never silently guesses.** Everything ambiguous goes into a `flags` array in the output rather
than into a total: a punch on a day the VA is not scheduled, a punch that falls outside every
scheduled window, PTO on an unscheduled day, a VA with no Form Responses row, an unreadable time or
day list, and a schedule declaring a timezone other than Eastern. **Read `flagCount` before trusting
`rows`.**

## Rulings of 2026-09-10

Full record: [decisions/2026-09-10_payroll-automation-rulings.md](../../../decisions/2026-09-10_payroll-automation-rulings.md). All five are applied in `join-step.js`.

1. **A punch outside every scheduled window goes to a `FOR REVIEW` line**, never to a guessed client.
2. **Pending PTO is solved upstream: coaches are reminded to approve before the pull.** The "Approve leaves in BambooHR" calendar events already do this. **⚠️ They only work if they land BEFORE the pull, and nothing enforces that.** Checked against the real calendar 2026-09-10: Ann and Raf on Fri 9/11 before the Sat 9/12 pull, fine; **Kate's was moved to Mon 9/14 for birthday leave, two days AFTER the pull.** The 9/28 reminders precede the 9/29 pull. **Any time a reminder moves, check it against the pull date.** Those invites also still carried the stale "Sep 25 pay date" and "Sep 11 - 26" wording that policies/payroll-cutoff.md had corrected.
3. **Two addresses for one VA: the Stamp Staff one wins.** `EMAIL_ALIASES` maps six VAs, and `canon()` runs on both the BambooHR directory and the form rows. Osaimi Hassan has no Stamp Staff address; his `gvaco` one stands in, unresolved.
4. **`workedHoursApproved` is ignored** and removed from the output. The output sheet's `Approved hrs` column has to be deleted to match: 12 columns, not 13.
5. **The paid Zapier plan is on teamasst@gmail.com** (Mark's login, Pro 1500, verified). The Payroll Zap was not in it, so it is being rebuilt there.

## The write-back, step 9

**Design settled 2026-09-08. The code side is built; the Zapier step is not.**

**One append-only tab, NOT a new tab per cutoff.** A tab per cutoff needs a `Create Worksheet` step
and leaves a pile of tabs nobody clears. One tab with a `Cutoff` column is filterable, and a re-run
shows as visible duplicate rows rather than silently overwriting a good pull. **It never touches
Payroll Main**, per the google-sheets skill: never overwrite a sheet the owner maintains by hand.

**Step 8 now emits parallel arrays** (`colCutoff`, `colName`, `colEmail`, `colClient`, `colInHouse`,
`colPunches`, `colWorked`, `colPtoDays`, `colPtoHours`, `colTotal`, `colFlags`),
same length and same order. Zapier reads same-length arrays as **line items**, so a single Google
Sheets **Create Multiple Spreadsheet Rows** step writes the whole cutoff in one task instead of
fanning out one task per VA.

**⚠️ The line-item behaviour is the one part not proven on this account.** Every other Zapier
assumption made from memory during this build turned out wrong at least once (`output =` vs
`return`, and the Custom Request raw body). **Test it on a real run before trusting it.** If Zapier
will not read the arrays as line items, the fallback is to return the array of row objects directly
from the Code step and let Zapier fan out, at the cost of one task per VA per run.

**Each row carries its own flags** in `colFlags`. A flag list nobody reads, sitting next to a number
nobody questions, is how a wrong figure gets paid; putting `CHECK THIS ONE` beside the name is what
makes the review actually happen.

**Step 8 needs `periodStart` and `periodEnd` added back to its Input Data**, mapped to step 2. They
were removed when the Code step stopped fetching BambooHR itself, and the `Cutoff` column needs them.

**The destination, created by Ailynn 2026-09-08:** a separate spreadsheet, **"Payroll Automation
Output"**, id `1_jLgIlNhRkC_WUqLFc0QYBNqJXyLtOPZRTXsU1fjPOo`, tab `Automated Pull`, owned by
humanresources@stampstaff.com and **private, no link sharing** (unlike the payroll sheet itself).
Header row already in place, matching the `col*` fields in order.

**⚠️ It was originally named "Stamp Staff Payroll", one space away from the real "StampStaff
Payroll".** Renamed to "Payroll Automation Output" the same day, because Zapier's Google Sheets step
picks the spreadsheet from a dropdown of names and two near-identical entries is exactly how an
automation writes into the live payroll sheet by mistake. **Do not name anything near this
"payroll" again.**

**Not built:** the Google Sheets step itself.

## Account and access — proven 2026-09-02

- **Subdomain:** `stampstaff` — base URL `https://stampstaff.bamboohr.com/api/v1/...`
- **Auth:** HTTP Basic Auth. Username = the BambooHR API key, password = literal `x` (any string
  works — that's BambooHR's convention, not a real password). Set this up as a Basic Auth credential
  in whatever tool calls the API (Zapier now, not n8n — see platform decision above); never re-enter
  the key anywhere else, and never put it in this repo or in chat.
- **`Accept: application/json` header is required** — BambooHR returns XML by default without it.
- **Abandoned n8n workflow (reference only, not being continued): bamboohr-timesheet-payroll-pull.**
  Built and live-tested there before the platform decision above: Schedule Trigger (daily, 11am) →
  Code node (date-gating, logic described below) → two parallel HTTP Request nodes (timesheet
  entries, approved PTO), both using the computed period dates and the shared Basic Auth credential.
  Both proven against real data for the Aug 26–Sep 10 period (842 real punches, 8 real approved PTO
  requests). This n8n workflow itself will disappear when the trial expires (2026-09-16) — nothing
  further needs doing with it, the point of keeping this section is just the proof that the approach
  works, not the n8n workflow as an artifact.
- **Date-gating logic**, tested and correct (needs porting to a Zapier Code step, logic unchanged):
  computes whether "today" is 24 hours after the weekend-adjusted day-after-cutoff (11th→12th-ish,
  26th→28th-ish, skipping Sat/Sun on the reminder day only), matching the separately-built
  coach-reminder routine from the "In-house team event calendar" session. Should return "not a pull
  day, stop" on a non-pull day (verified 2026-09-02 is correctly a no-op in n8n), and compute
  `{periodStart, periodEnd, cutoffLabel, today}` on a pull day (verified against a hardcoded
  2026-09-12 test date in n8n → correctly produced `2026-08-26`/`2026-09-10`). The exact JavaScript is
  below — same language works in Zapier's Code by Zapier step, should port with minimal changes.

```javascript
const now = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}));
const day = now.getDate();
const month = now.getMonth();
const year = now.getFullYear();

function nextBusinessDay(d) {
  const wd = d.getDay();
  if (wd === 6) d.setDate(d.getDate() + 2);
  else if (wd === 0) d.setDate(d.getDate() + 1);
  return d;
}
function fmt(d) { return d.toISOString().slice(0, 10); }

const reminderA = nextBusinessDay(new Date(year, month, 11));
const pullA = new Date(reminderA); pullA.setDate(pullA.getDate() + 1);

const reminderB = nextBusinessDay(new Date(year, month, 26));
const pullB = new Date(reminderB); pullB.setDate(pullB.getDate() + 1);

const today = fmt(now);
let periodStart, periodEnd, cutoffLabel;

if (fmt(pullA) === today) {
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  periodStart = fmt(new Date(prevYear, prevMonth, 26));
  periodEnd = fmt(new Date(year, month, 10));
  cutoffLabel = 'Aug26-Sep10 style (paid 20th)';
} else if (fmt(pullB) === today) {
  periodStart = fmt(new Date(year, month, 11));
  periodEnd = fmt(new Date(year, month, 25));
  cutoffLabel = '11th-25th style (paid 5th next month)';
}

// In n8n this returned []  to stop the workflow on a non-pull day.
// In Zapier, use this as a Filter step condition instead: only continue if periodStart is set.
```

## Endpoints proven live

- **`GET /v1/time_off/requests?start=YYYY-MM-DD&end=YYYY-MM-DD&status=approved`** — approved PTO for
  a date range. **⚠️ Corrected 2026-09-10: NOT whole days only.** Ordinary PTO comes as `amount: {unit: "days"}`, but **"Client Paid Holidays" come as `unit: "hours"`, and each date's value is then HOURS** (e.g. one date worth `"8"`). On the first full run the join read that 8 as 8 days and paid it at the VA's scheduled hours, so 14 VAs showed 8 PTO days / 72 hours (68 on an 8.5-hour day, 64 on a 4-hour block). In the Aug 26 - Sep 10 data, 17 of the first 18 requests were hours-based holidays. The join now reads `amount.unit` on every request. No client, no
  hours, no notes field populated. `type.name` is either "Paid Time Off" (generic) or "Client Paid
  Time Off" (still doesn't say *which* client) — confirmed on real data, 2026-09-02.
- **`GET /v1/time_tracking/timesheet_entries?start=YYYY-MM-DD&end=YYYY-MM-DD`** — real clock
  punches, one row per punch: `employeeId`, `date`, `start`, `end`, `hours`, `timezone`,
  `projectInfo`, `note`, `approved`, `approvedAt`. **`projectInfo` and `note` are null on every real
  entry tested** — BambooHR is not configured to record which client a punch was for. Do not build
  on the assumption this field will ever be populated without Ailynn changing how VAs clock in.
- **`GET /v1/meta/fields`** — lists all 269 account fields (id, name, type, alias). Useful for
  finding custom fields, but see the dead end below.
- **`GET /v1/employees/{id}?fields=...`** — per BambooHR's own docs, "unknown or unauthorized fields
  are silently dropped from the response" — a missing key does NOT mean the field is empty, it could
  also mean the API key lacks permission. Tested field id `4549` ("Schedule", type textarea) against
  a real employee (id 192, Matthew John Lorizo) and got nothing back either way — inconclusive by
  design of the API, never treat a missing field as proof it's blank.

## Dead end: no client info inside BambooHR

Went looking for which client a shift/PTO day belongs to, since the payroll sheet needs hours broken
out per client. **BambooHR itself doesn't have it**, confirmed two ways: timesheet `projectInfo`/
`note` are null on every real entry, and the "Schedule" custom field (id 4549) on the employee Job
tab returned nothing via the API (inconclusive whether blank or a permissions gap — not confirmed in
the BambooHR web UI itself).

**Decided with Ailynn, 2026-09-02: use the payroll Google Sheet's own "Form Responses" tab instead.**
VAs submit their own schedule there (client, days worked, start/end time, timezone) — see the payroll
sheet linked in the routines/automations context. That's the source of truth for which client a punch
or a PTO day belongs to: match a timesheet entry's day-of-week + time-of-day, or a PTO day's
day-of-week, against the VA's declared schedule for that client.

**Bug caught and fixed, 2026-09-02: the Form Responses tab had duplicate column headers.** "Days
worked", "Scheduled start time", "Scheduled end time", and "Time zone this schedule is in" each
appear 3 times (once per client block), byte-for-byte identical. n8n's Google Sheets node reads rows
keyed by header text, so the duplicate headers were silently colliding — Client 2/3's schedule was
overwriting Client 1's on every VA with more than one client, with no error, no warning. Confirmed
by comparing pulled data against the raw sheet dump: Vince Charles de Guzman's Client 1 "Days worked"
came back as "Monday, Wednesday" (his Client 3 value) instead of the correct "Monday, Tuesday,
Wednesday, Thursday, Friday". **Fixed by renaming the header row in the actual sheet** (not
workaroundable in the n8n node itself — no raw/positional output mode available in this version):
`Days worked` → `Days worked 1`/`2`/`3` (cols F/L/R), same pattern for `Scheduled start time`
(G/M/S), `Scheduled end time` (H/N/T), and `Time zone this schedule is in` (I/O/U). Re-pulled after
the rename and every VA's data now comes back correct and separated per client.

## What this is for

Stamp Staff uses BambooHR for VA PTO ([policies/va-paid-time-off.md](../../../policies/va-paid-time-off.md))
and clock in/out punches used for payroll ([policies/va-clock-in-out-rules.md](../../../policies/va-clock-in-out-rules.md)).
Ailynn wants an automation: at each [payroll cutoff](../../../policies/payroll-cutoff.md) (10th and
25th/26th), after coaches have approved PTO for the period in BambooHR (so approved PTO hours count
toward each VA's total hours), pull the timesheet entries report for the whole cutoff period and drop
it into the payroll folder in the format of the existing payroll Google Sheet.

**Confirmed with Ailynn, 2026-09-02:**

- **Approval:** coaches approve PTO requests through BambooHR's own workflow (not elsewhere).
- **Report:** the timesheet entries report, for the whole cutoff period (not just the approved VA) —
  approved PTO hours need to be added into each VA's total hours.
- **Trigger:** one check per cutoff (10th and 25th/26th — see policies/payroll-cutoff.md), not
  instant-on-approval. Simpler to build, matches how the payroll sheet already fills per pay period.
- **Destination/format:** a payroll folder, matching the existing payroll Google Sheet's layout
  (read via the Drive connector, 2026-09-02: per VA — Status, Emp#, Contract Type, then per client
  (up to 3) hours + rate, rolling up to Total Hours, Base Pay, HMO, add-ons, bonus, deductions, Net
  Pay). So the pull has to break out **per VA, per client** — matched against the Placements table
  in Airtable — not just a flat total per VA.

## What is NOT known yet — named explicitly

- **The join logic (step 8), and it is now the only thing standing between this and a working pull.**
  Steps 1-7 are built and all four data sources are proven raw against real data (see "Blocker
  cleared" above). Step 8 has to: `JSON.parse` the three BambooHR payloads plus the sheet rows, build
  an `employeeId` -> `workEmail` map from the directory (timesheet entries carry only `employeeId`,
  while PTO requests carry `name` directly and can match Form Responses' "Full Name" instead), then
  map each punch and each PTO day to a client by day-of-week and time-of-day, and total hours per VA
  per client. Nothing of this is written yet.
- **PTO days → hours conversion.** A PTO request gives whole days (`amount.unit: "days"`), the
  payroll sheet needs hours per client. Convert using the VA's scheduled hours for that client on
  that day-of-week from the Form Responses tab — not yet built, and not yet confirmed with Ailynn
  that this is the right conversion when a VA is scheduled with more than one client on the same day.
- **What happens if PTO isn't approved by the time a cutoff check runs.** Needs a defined fallback
  (flag and wait vs. pull without it) rather than silently pulling incomplete hours — undecided.
- **Whether the API key's permissions cover everything needed.** The Job-tab "Schedule" custom field
  (id 4549) returned nothing for a real employee and BambooHR's own docs say a missing field could
  mean either "blank" or "unauthorized" — not distinguished yet. Moot for now since the Form
  Responses sheet is the chosen path instead, but worth knowing if BambooHR-side data is needed again.
- **Writing the result into the payroll Google Sheet** — not attempted yet. Per the google-sheets
  skill: never overwrite a sheet Ailynn maintains by hand; this pull-per-VA-per-client output should
  probably land on its own tab or a sheet built for the purpose, not directly onto her working tab.
- **Whether Zapier's Google Sheets action has the same duplicate-header collision n8n's did.** The
  header rename in the actual sheet (done 2026-09-02) fixes this regardless of which tool reads it,
  but worth a specific check the first time Zapier reads that tab, rather than assuming it's fine.

## Do not build the rest of this from memory

Everything above the "not known yet" section is proven against real data, live, 2026-09-02 — safe to
build on, in Zapier, from scratch. Everything in "not known yet" still needs the same treatment: test
for real, don't assume. Once the flow runs end to end unattended in Zapier and the payroll sheet
actually gets the right numbers, replace this whole file with what was actually learned and drop the
"in progress" framing.
