# Your base

**Version: 4.1 - 2026-08-10**

**Vera writes this file into your own repo and keeps it current. You never fill it in by hand,
though you can correct anything she gets wrong.**

It is a plain snapshot of your Airtable base: what tables you have, what fields are in them, and a
note on anything unusual. The agents read it so they know where your data lives without guessing.

**If you rename a table or add a field, just tell Vera "my base changed" and she rewrites this.**

---

## Base

| | |
|---|---|
| Base name | Untitled Base (Ailynn may want to rename this by hand in Airtable — the connector has no rename tool) |
| Base id | apptst9VRUlVdybNZ |
| Last read | 2026-09-01 |

**This is NOT the course's TLL Central Hub starter base — that one is built for property managers.**
Ailynn confirmed on 2026-09-01: rather than duplicate the property-manager base in, Vera built
Clients, VAs, Placements and Candidates tables from scratch to match Stamp Staff's actual business.
See `decisions/2026-09-01_built-airtable-hub-for-staffing-business.md`.

## Tables

| Table | Fields |
|---|---|
| Clients | Client Name, Main Contact, Status (Lead/Discovery Scheduled/Candidates Presented/Contracted/Active/Ended), Placement Type (Part-time/Full-time/Both), Monthly Fee, Contract Start Date, 6-Month Minimum Ends, Payment Status (Current/Late/Overdue), Client Success Manager, Notes |
| VAs | VA Name, Role Type (EA/Creative-SMM/Other), Status (In Training/Active/Pooled/Inactive), Coach, Rate, Start Date, Contact, Notes |
| Placements | Placement, Client (link), VA (link), Type (Part-time/Full-time), Start Date, End Date, Status (Active/Ended/Replaced), Reason Ended |
| Candidates | Candidate Name, Role Applying For (EA/Creative-SMM/Other), Status (Applied/Screened-Qualified/Screened-Unqualified/Interview 1/Assessment/Interview 2/Passed-Training Date/Passed-Pooled/Regretted), Source, Applied Date, Contact, Notes |
| Table 1 | Name, Notes, Assignee, Status, Attachments, Attachment Summary — generic leftover from base creation, empty, not used by anything. Ailynn's call whether to delete it (the connector can't delete fields, only tables). |
| Skills | Name, What it does, Version, Path in repo, Last updated, Status (Active/Parked) |
| Routines | Name, What it does, Instructions, How often, Last ran, How it went, Notes, Active, Order, Prepare and wait |
| Tasks | Title, Status, Note |

## Notes

| Note | |
|---|---|
| Which table holds your routines | Routines (empty — no routines set up yet, no daily-pass schedule exists) |
| Which table holds your tasks | Tasks (2 open, both "Needs you") |
| Your timezone | Not recorded yet |
| Your currency | Not recorded yet |
| How you prorate a partial month | Not recorded yet |
| What a complete application looks like to you | Not recorded yet |
| How you name documents | Not recorded yet |

---

## For your assistant

- **Read this file before touching data.** It is faster and safer than exploring the base every time.
- **If something you need is not here, re-read the base rather than guessing**, then update this file.
- **If a table or field you need genuinely does not exist, say so and stop.** Never write into the
  closest-looking alternative. Getting it wrong in a base full of real tenant data is worse than
  stopping and asking.
- **Keep this file in the owner's own repo.** The copy in the shared library is an empty template.
