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
Ailynn wants an automation: when a coach approves a VA's PTO request in BambooHR, download the
VA's timesheet.

## What is NOT known yet — named explicitly

- **The API key.** Ailynn said she was sending it (2026-09-02) but it did not arrive in the message.
  It should never be pasted into chat or stored in this repo in plain text — it belongs in whatever
  system actually calls the API (e.g. an n8n credential), not inside Claude or a skill file. See
  "Secrets do not live inside Claude" in the vera skill.
- **How approval actually happens in BambooHR.** Whether coaches approve time-off requests through
  BambooHR's own approval workflow (which can fire a webhook/notification) or somewhere else. This
  decides whether an event trigger is even possible.
  - "Coach" is a field on the VAs table in Airtable (reference/your-base.md) — need to confirm the
    same person is the BambooHR approver.
- **Which report "timesheet" means.** BambooHR's time-off request and its worked-hours timesheet are
  different reports. Need to confirm which one, for what date range, and for which VA.
- **Destination.** Where the downloaded file should land — Google Drive, Airtable attachment,
  somewhere else — and in what format (CSV/PDF).
- **Whether Claude/n8n can reach BambooHR at all.** No BambooHR connector is currently available in
  this session. This would likely run as an n8n flow (event trigger on approval, or a scheduled
  backstop) per the [[n8n]] skill's decision framework, not as a routine Vera runs by hand — but
  that is unconfirmed until the trigger mechanism above is known.

## Do not build from this file yet

Whoever picks this up next should re-ask Ailynn the questions above rather than guessing. Once the
first real automation is built and tested end to end, replace this file with what was actually
learned — what the API returns, what the webhook payload looks like, what broke — and remove the
placeholder warning.
