---
name: bamboohr
description: "IN PROGRESS — API access proven, being rebuilt in Zapier (not n8n). Load before any work touching BambooHR: PTO approvals, timesheets/punches, or the API. Trigger on 'BambooHR', 'timesheet', 'PTO approval', 'coach approved', or any request to pull data out of BambooHR automatically."
---

# BambooHR

**Version: 0.3 (IN PROGRESS) - 2026-09-02**

**Not a placeholder anymore — the BambooHR API is live-tested and proven, below, against Stamp
Staff's real account. Fill in the rest the same way: test for real, write down what's actually true,
don't guess.**

## Platform decision, 2026-09-02: building in Zapier, not n8n

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
4. **Webhooks by Zapier, GET**, timesheet entries — **fully working**, verified against real data.

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
  a date range. **Gives whole days off only**: `amount: {unit: "days", amount: "1"}`. No client, no
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

- **The whole Zapier build itself.** Nothing has been built in Zapier yet — everything above is
  proven in n8n (now abandoned) or via raw API calls. Start fresh in Zapier using the endpoints,
  auth, and date logic above, confirmed against the real account, but re-test every step live again
  once it's actually in Zapier — a different platform can behave differently even calling the same
  API (see the n8n skill's testing philosophy: a green run isn't proof, checking the real output is).
- **Timesheet entries need an extra lookup step that PTO requests don't.** `time_off/requests` returns
  the VA's `name` directly, so it can match Form Responses' "Full Name" column with no extra call. But
  `time_tracking/timesheet_entries` returns only `employeeId` — no name, no email — so matching a
  punch to a VA requires also calling `GET /v1/employees/directory` (proven live, returns
  `id`/`displayName`/`workEmail` etc. per employee) and joining on `employeeId`, then matching that
  employee's `workEmail` against Form Responses' "Email Address" column. Not yet wired into a step.
- **The join logic itself, not yet built.** Needs a step (Code by Zapier, most likely) that: reads
  the Form Responses schedule tab, the employee directory, timesheet entries, and approved PTO
  requests, and for each VA maps punches/PTO days to a client by day-of-week + time-of-day. Not
  started in Zapier.
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
