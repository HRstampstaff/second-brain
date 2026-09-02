---
name: bamboohr
description: "PLACEHOLDER, not yet proven. Load before any work touching BambooHR: PTO approvals, timesheets/punches, or the API. Trigger on 'BambooHR', 'timesheet', 'PTO approval', 'coach approved', or any request to pull data out of BambooHR automatically."
---

# BambooHR

**Version: 0.1 (PLACEHOLDER) - 2026-09-02**

**This is a placeholder. It has not been proven against the real BambooHR API. Nothing below is
tested — it is what was known at the moment this file was created. Fill it in the first time real
work happens against BambooHR, per the vera skill's placeholder pattern.**

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

- **The API key.** Ailynn said she was sending it (2026-09-02) but it did not arrive in the message
  (this has happened twice now — worth checking how she's sending things, something may be getting
  stripped). It should never be pasted into chat or stored in this repo in plain text — it belongs in
  whatever system actually calls the API (an n8n credential, most likely), not inside Claude or a
  skill file. See "Secrets do not live inside Claude" in the vera skill.
- **Whether Ailynn has an n8n account already connected.** Per the [[n8n]] skill's decision
  framework, this is an n8n flow (joins two systems that don't talk to each other, runs on a
  schedule with nobody present) — not a routine Vera runs by hand, and not buildable in this session
  without n8n access. No BambooHR connector is available here either.
- **Exact field names/report ID inside BambooHR** for the timesheet entries report — not seen yet,
  needs the actual API/account to check.
- **What happens if PTO isn't approved by the time a cutoff check runs.** Needs a defined fallback
  (flag and wait vs. pull without it) rather than silently pulling incomplete hours — undecided.

## Do not build from this file yet

The requirements above are confirmed, but nothing has been built or tested — no BambooHR access, no
n8n access yet. Whoever picks this up next should get n8n set up first (or check whether it already
is), then get the API key attached there directly, never through chat. Once the first real
automation is built and tested end to end, replace this file with what was actually learned — what
the API returns, what the webhook/schedule run looks like, what broke — and remove the placeholder
warning.
