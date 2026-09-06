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
| Base name | STAMP STAFF (Ailynn renamed it; confirmed 2026-09-06) |
| Base id | apptst9VRUlVdybNZ |
| Last read | 2026-09-06 |

**This is NOT the course's TLL Central Hub starter base — that one is built for property managers.**
Ailynn confirmed on 2026-09-01: rather than duplicate the property-manager base in, Vera built
Clients, VAs, Placements and Candidates tables from scratch to match Stamp Staff's actual business.
See `decisions/2026-09-01_built-airtable-hub-for-staffing-business.md`.

## You now have TWO bases

As of 2026-09-06 the training work lives in its own base so trainers can be given it without
seeing clients, fees, payroll or candidates.

| Base | id | What is in it |
|---|---|---|
| **STAMP STAFF** (the hub) | `apptst9VRUlVdybNZ` | Clients, VAs, Placements, Candidates, Skills, Routines, Tasks |
| **Stamp Staff — Training** | `appvYMsLEajwprjBs` | Training Batches, Trainees, Attendance, Trainee Scorecard |

⚠️ **REVERSED 2026-09-06.** Ailynn put real Batch 4 trainees into the HUB copies, then asked for the
training work to live in the hub after all. **The hub is now the live one. The `Stamp Staff — Training`
base is dead** and Ailynn will delete it herself (Vera cannot delete a base, only tables).

⚠️ **The Trainees table in the hub holds DUPLICATES.** Two pastes, 20:29 and 20:32 on 2026-09-06: the
first set carries a trailing line break on each name, so Airtable sees 23 records for 15 real people.
Duplicated: Ann Frances Ecalnir, Marccrix Pialago, Miguel Rodriguez, Shayne Anne Diangco, Zchaena
Datulayta, Sheeny Todenio, Jamie Caumeran, Rommel John Sevilla. The 15 Attendance rows mostly link to
the *trailing-break* copies. Not cleaned up: deleting real records is Ailynn's call and she has not
given it.

## Tables in STAMP STAFF (the hub)

| Table | Fields |
|---|---|
| Clients | Client Name, Main Contact, Status (Lead/Discovery Scheduled/Candidates Presented/Contracted/Active/Ended), Placement Type (Part-time/Full-time/Both), Monthly Fee, Contract Start Date, 6-Month Minimum Ends, Payment Status (Current/Late/Overdue), Client Success Manager, Notes |
| VAs | VA Name, Role Type (EA/Creative-SMM/Other — **needs a CSM choice added by hand, see Notes**), Status (In Training/Active/Pooled/Inactive), Coach, Rate, Start Date, Contact, Notes |
| Placements | Placement, Client (link), VA (link), Type (Part-time/Full-time), Start Date, End Date, Status (Active/Ended/Replaced), Reason Ended |
| Candidates | Candidate Name, Role Applying For (EA/Creative-SMM/Other — **needs a CSM choice added by hand, see Notes**), Status (Applied/Screened-Qualified/Screened-Unqualified/Interview 1/Assessment/Interview 2/Passed-Training Date/Passed-Pooled/Regretted), Source, Applied Date, Contact, Notes |
| Table 1 | Name, Notes, Assignee, Status, Attachments, Attachment Summary — generic leftover from base creation, empty, not used by anything. Ailynn's call whether to delete it (the connector can't delete fields, only tables). |
| Skills | Name, What it does, Version, Path in repo, Last updated, Status (Active/Parked) — 32 rows as of 2026-09-06 |
| Routines | Name, What it does, Instructions, How often, Last ran, How it went, Notes, Active, Order, Prepare and wait |
| Tasks | Title, Status, Note |
| Training Batches, Trainees, Attendance, Trainee Scorecard | **Superseded copies.** Rebuilt in the Training base on 2026-09-06. Delete these four by hand when ready. |

## Tables in Stamp Staff — Training (`appvYMsLEajwprjBs`)

| Table | Fields |
|---|---|
| Training Batches | Batch, Training Start Date, Training End Date, Tracks in this Batch (SMM/EA), Status (Planned/In Training/Graduated/Cancelled), Notes. Seeded with **Batch 4**; start date still blank. |
| Trainees | Trainee Name, Track (SMM/EA), Coach, Contact, Status, Notes, Batch (link), plus auto totals: Total Training Fee, Days Present, Days Late, Days Absent, Days Logged |
| **Attendance Grid** ⭐ | The wall-chart Ailynn asked for, 2026-09-06. One row per trainee: Trainee Name, ID No., Track, Shift Type (Whole/Half Day), Batch (link), Trainee (link), **Day 1 … Day 20** each a dropdown of ✅ Present / ❌ Absent / ⛔ Undertime / 🌡️ On Leave, then TOTAL PRESENT, TOTAL ABSENT, TOTAL UNDERTIME, TOTAL ON LEAVE, DAYS MARKED, TOTAL FEE EARNED. |
| **Attendance Grid** ⭐ | `tbl9ugdvzmEbCyWFV`. The wall-chart layout, built 2026-09-06 in the HUB (not the Training base). One row per trainee: Trainee Name, ID No., Track, Shift Type, Batch (link), Trainee (link), **Day 1 … Day 20** each a dropdown of ✅ Present / ❌ Absent / ⛔ Undertime / 🌡️ On Leave, then TOTAL PRESENT, TOTAL ABSENT, TOTAL UNDERTIME, TOTAL ON LEAVE, DAYS MARKED, TOTAL FEE EARNED. Seeded with the 15 real Batch 4 trainees. **This is the live attendance sheet.** |
| Attendance | The earlier one-row-per-trainee-per-day design. **Superseded by Attendance Grid** — two tables now do the same job, so pick one and delete the other. Date, Training Day, Attendance (Present/Late/Absent), Day Type, Time In, Checked By, Notes, Trainee (link), Batch (lookup), Fee Earned, Is Present, Is Late, Is Absent |
| Trainee Scorecard | Trainee Name, Trainee (link), Assessed By, Date Assessed, Assessment Point (Week 1-4/Final); ratings 1-5 for Project Management Tools, Call Handling Experience, Communication Skills, AI Mastery, CRM Management, Video Editing, Graphics Design, Automation, Funnel Creation, Proactive, Team Activities, Recitation, Fast Learner; checkboxes Sleeping During Training, Attendance Issues; Strengths, Areas to Improve, Concerns, Recommendation; auto averages: Core Skills, Creative & Tech, Behaviour; Batch and Track lookups |

## Notes

| Note | |
|---|---|
| Which table holds your routines | Routines — 1 active row: "Monthly BambooHR leave-approval reminders". Ran and completed for Sep on 2026-09-01 (row stamped 2026-09-02). Daily-pass schedule (good-morning-vera, 9am daily) already exists and runs this. |
| Which table holds your tasks | Tasks (1 open as of 2026-09-06: the BambooHR-to-Zapier build, paused on a platform blocker) |
| Your timezone | America/New_York (Islamorada, FL) |
| Your currency | Not recorded yet |
| How you prorate a partial month | Not recorded yet |
| What a complete application looks like to you | Not recorded yet |
| CSM | A VA role type (like EA or Creative/SMM), placed with a client — not an internal Stamp Staff position. The "Client Success Manager" text field on Clients is superseded; track it via Placements instead. "CSM" still needs adding as a choice on Role Type (VAs) and Role Applying For (Candidates) — the connector can't add select options, so this is a manual add in Airtable. |
| How you name documents | Not recorded yet |
| Training fee rule | $10 per full training day, $5 per half day, $0 if absent. On Attendance Grid, Undertime pays $5 (Vera's assumption, not confirmed). **Late still earns the full amount** — only Absent pays nothing. Built into the Fee Earned formula on Attendance and into the Google Sheets copy. Confirmed as Vera's reading of Ailynn's instruction on 2026-09-06, not yet confirmed back. |
| Coach dropdowns | Coach Ann, Coach Kate, Rafael Reyes, Marmil, Ben (plus Kay on Attendance's Checked By). Adding another coach is a by-hand job in Airtable — the connector cannot add select options. |
| ⚠️ The four business tables are EMPTY | Clients, VAs, Candidates and Placements all held 0 records on 2026-09-06, five days after they were built. Stamp Staff runs 100+ VAs and 90 active clients, so nothing in this base reflects the real business yet, and Fiona and Tessa have nothing to read. Whether to import from ClickUp, export from BambooHR, or start with a subset is Ailynn's call — see `decisions/2026-09-01_airtable-over-clickup-for-now.md`. |

---

## For your assistant

- **Read this file before touching data.** It is faster and safer than exploring the base every time.
- **If something you need is not here, re-read the base rather than guessing**, then update this file.
- **If a table or field you need genuinely does not exist, say so and stop.** Never write into the
  closest-looking alternative. Getting it wrong in a base full of real tenant data is worse than
  stopping and asking.
- **Keep this file in the owner's own repo.** The copy in the shared library is an empty template.
