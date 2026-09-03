---
name: bamboohr
description: "IN PROGRESS — API access proven, join logic not yet built. Load before any work touching BambooHR: PTO approvals, timesheets/punches, or the API. Trigger on 'BambooHR', 'timesheet', 'PTO approval', 'coach approved', or any request to pull data out of BambooHR automatically."
---

# BambooHR

**Version: 0.2 (IN PROGRESS) - 2026-09-02**

**Not a placeholder anymore — the API is live-tested and the endpoints below are proven against
Stamp Staff's real BambooHR account. What's still missing is the join logic (matching punches to
clients) and the actual n8n build. Fill in the rest the same way: test for real, write down what's
actually true, don't guess.**

## Account and access — proven 2026-09-02

- **Subdomain:** `stampstaff` — base URL `https://stampstaff.bamboohr.com/api/v1/...`
- **Auth:** HTTP Basic Auth. Username = the BambooHR API key, password = literal `x` (any string
  works — that's BambooHR's convention, not a real password). Set up once as a generic Basic Auth
  credential in n8n (named "BambooHR API key"); never re-enter the key anywhere else.
- **`Accept: application/json` header is required** — BambooHR returns XML by default without it.
- Working n8n workflow: **bamboohr-timesheet-payroll-pull**. Built so far, all live-tested:
  **Schedule Trigger** (daily, 11am) → **Code in JavaScript** (date-gating, below) → two parallel
  **HTTP Request** nodes (timesheet entries, approved PTO), both using
  `{{ $json.periodStart }}`/`{{ $json.periodEnd }}` from the Code node and the shared "BambooHR API
  key" Basic Auth credential. Both proven against real data for the Aug 26–Sep 10 period (842 real
  punches, 8 real approved PTO requests).
- **Date-gating Code node**, tested and correct: computes whether "today" is 24 hours after the
  weekend-adjusted day-after-cutoff (11th→12th-ish, 26th→28th-ish, skipping Sat/Sun on the reminder
  day only), matching the separately-built coach-reminder routine from the "In-house team event
  calendar" session. Returns 0 items on a non-pull day (verified 2026-09-02 is correctly a no-op),
  returns `{periodStart, periodEnd, cutoffLabel, today}` on a pull day (verified against a hardcoded
  2026-09-12 test date → correctly produced `2026-08-26`/`2026-09-10`). The exact code is worth
  copying from the live n8n workflow rather than retyping from memory if this file needs it again.

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

- **The join logic itself, not yet built.** Need a step (Code node in n8n, most likely) that: reads
  the Form Responses schedule tab, reads timesheet entries, reads approved PTO requests, and for each
  VA maps punches/PTO days to a client by day-of-week + time-of-day. Not started.
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
- **The Schedule Trigger, and the two HTTP Request calls, still need to be wired into one flow** —
  so far this has all been one HTTP Request node in n8n, manually re-pointed and re-run by hand to
  prove each endpoint works. Nothing runs on its own yet.

## Do not build the rest of this from memory

Everything above the "not known yet" section is proven against real data, live, 2026-09-02 — safe to
build on. Everything in "not known yet" still needs the same treatment: test for real, don't assume.
Once the flow runs end to end unattended and the payroll sheet actually gets the right numbers,
replace this whole file with what was actually learned and drop the "in progress" framing.
