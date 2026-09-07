# Training a new VA batch

The full day-by-day schedule lives in Google Drive as "STAMPSTAFF TRAINING SOP V.1.2026" (owned by
Kate Barin, last updated 2026-08-04) and is not duplicated here, since a 20-day schedule this detailed
will drift out of date fast if copied. Read it directly in Drive when a routine needs the specifics.

## What's worth remembering here

- It's a combined 20-day track covering Social Media Manager (SMM) and Executive Assistant (EA)
  roles, from Day 0 pre-onboarding through graduation and client endorsement.
- SMM trainers: Rafael Reyes / Marmil / Ben. EA trainers: Coach Ann / Coach Kate.
- Applies to Batch 4 (2026) onward.
- Day 0 (pre-training): Recruitment hands off the invite list to Training; the trainee gets the
  onboarding email (create Stamp Staff email, install Discord, watch the welcome/orientation video,
  follow Stamp Staff's Facebook and TikTok); a confirmation call happens the Friday before Day 1
  training starts; Training reports actual Day 1 attendance back to Recruitment (with no-shows
  flagged).
- Each training day is 8 working hours.

## The master schedule spreadsheet

The trainers work from a Google Sheet called **Training Start**, which is a separate thing from the
SOP doc and is **owned by aj@sharperprocess.com**, not by Stamp Staff. Ailynn has writer access
through a link. As of 2026-09-06 it held a half-built time-blocked layout
(`Time | Training Type | Coach | SMM | Resources | Coach | EA | Resources`) covering Day 1 and part
of Day 2, with a to-do list at the top reading "Add breaks / Add lunch / edit who is doing what /
add resources".

On 2026-09-06 the full SOP was extracted into that file's 8-column format
(`Day, Block, Duration, Track, Trainer (assign here), Topic / Activity, Materials & Links,
Notes / Deliverable`), 137 rows, and left in Ailynn's Drive as
`2026-09-06_20-day-gva-training-schedule-sop-extract.csv` for her to import as a new tab. It is not
in this repo: the SOP doc stays the source of truth and a copy here would drift.

Two things to carry forward:

- **Trainer names are filled for Day 0 and Day 1 only**, blank from Day 2 on so trainers assign
  themselves. That is Ailynn's rule, not the SOP's — the SOP fills the column for every day and its
  own Notes call those suggested defaults rather than final assignments. An open offer stands to
  rebuild it with those defaults greyed in instead of blank.
- **The Training Start file is shared as "anyone with the link can edit."** Raised with Ailynn on
  2026-09-06; she chose not to flag it to AJ. Do not raise it again unasked.

## Daily Huddle — 9:00-9:30 every day

Decided by Ailynn 2026-09-06. **Every training day opens with a 30-minute huddle at 9:00-9:30**:
calling a few trainees to share what they have learned based on the previous day of training. AJ had
already put a "Daily Huddle" in that slot on her Day 2 draft with Kate as coach, so this formalises
what was already intended.

Two consequences to settle:

- **Day 1 has no previous day to recap**, so its 9:00-9:30 slot stays Welcome & Orientation, labelled
  as the huddle. This keeps Day 1's timings matching AJ's existing rows exactly.
- **The huddle is 30 minutes on top of the SOP's 8 hours**, not carved out of them, so Days 2-20 now
  run 9:00 to 5:30 and the Friday Coaches Sync moves to 5:30-6:00. Nothing in the SOP was trimmed to
  make room. Whether the day extends to 5:30 or a block gets cut is Kate's call.

## Tracking a batch: attendance and scorecards

Built 2026-09-06, and moved the same day into **its own Airtable base, `Stamp Staff — Training`**, so
a coach can be given access to training without ever seeing clients, fees, payroll or candidates.
Mirrored in Google Sheets as a fallback. Four tables, and they chain: **Training Batches -> Trainees -> Attendance**, with
**Trainee Scorecard** hanging off Trainees.

**Attendance** is one row per trainee per training day. A coach picks the date, the trainee, the day
number, Present/Late/Absent, Full Day/Half Day, and stamps who checked it. `Fee Earned` works itself
out and the trainee's row totals it up, so nobody adds up a payroll figure by hand.

**Trainee Scorecard** is one row per trainee per assessment point (Week 1-4 and Final), not one row
per trainee, so improvement is visible instead of only the last mark. Ratings are 1-5 stars: 1 needs
a lot of help, 3 can do it with supervision, 5 is ready for a client.

Three things to know before trusting a number:

- **An unscored star counts as 0**, in both Airtable and the Sheets copy, so the three Average
  columns only mean something once a whole group is filled in. This is deliberate and consistent
  across both systems, but it will read as a bad score if someone half-fills a row.
- **Adding a coach to any dropdown is a by-hand job in Airtable.** The connector cannot add select
  options.
- **The batch header and trainee sub-header** that trainers asked for is a grid grouping, not a
  field: group by Batch, then by Trainee. Setting a view is screen-only, so a person does it once.

## Why the attendance grid uses Day 1-20, not calendar dates

Ailynn asked for the classic wall-chart layout: a row per trainee, a column per day, ✅ ❌ ⛔ 🌡️
markers and totals on the right. Built as **Attendance Grid** in the Training base on 2026-09-06.

The columns are **Day 1 to Day 20**, not real dates, and Ailynn confirmed that on 2026-09-06 after
being given the correct facts. Airtable field names are fixed text, so dated columns would have to be
renamed twenty times for every new batch. The connector *can* rename fields (Vera said otherwise
earlier that day, wrongly), so it would not be a by-hand job — but it would still be twenty renames a
batch and a table whose column headings lie about any batch other than the current one. Day numbers
make one table serve every batch forever. The real dates live on the batch's Training Start Date,
which Attendance Grid looks up onto every row.

Weekends are not columns either. The sheet template carried them because a calendar needs them; a
20-day programme does not.

## Gaps found in the SOP itself (2026-09-06)

Rebuilding the schedule as clock times from a 9:00 start surfaced five days that do not add up to the
8 working hours the SOP's own DAY TOTAL bars claim. These are errors in the SOP document, not in the
rebuild. Kate owns the fix:

| Day | Track | Blocks total | Problem |
|---|---|---|---|
| 1 | SMM | 8 hrs 30 min | 30 min over. The 4 hr 45 min "EA Systems Orientation" block is tagged BOTH, which cannot be right — SMM runs its own 5 hr 15 min PM at the same time. Treated as EA-only in the rebuild. |
| 2 | EA | 4 hrs | **4 hours unaccounted for.** The EA column lists only four 1-hour blocks for a full day. This is the big one. |
| 2 | SMM | 7 hrs 57 min | 3 min short, from the "~1h 42m" Ryan Magin block. Rounding, ignore. |
| 11 | SMM and EA | 7 hrs 55 min | 5 min short, from the "1h 40m" webinar video. Rounding, ignore. |

Every other day balances to exactly 8 hours on both tracks.

Also still missing from both the SOP and AJ's sheet: **lunch and breaks**. The SOP says every training
day is 8 working hours with "lunch break separate", but no lunch slot is written anywhere, so a 9:00
start puts the day's end at 5:00 with no break in it. "Add breaks" and "Add lunch" are the first two
lines of AJ's own to-do list at the top of Training Start. Not invented in the rebuild — it is a
decision for Kate and AJ.

## The SOP document (Version 2)

**STAMPSTAFF TRAINING SOP V.2.2026** — https://docs.google.com/document/d/18DuMqqOUhielE75aFIYakMg5_6XT1Iu65scECPpMxz8/edit

Rebuilt 2026-09-06 from the original SOP doc
(1sxYul0RpfKP5ziAMOaZEFg9FODZDsQQ4b-DaTRJqNfg), which stays untouched as the v1 record. What v2 adds
on top of v1:

- Every day laid out as **real clock times** from a 9:00 start, with the 9:00-9:30 Daily Huddle on
  every one of the 20 days.
- A **"How to use the Airtable attendance tracker"** section written for a coach, not for Vera: the
  base link, the four markers, the fee rules, how to open a batch, how to score a trainee, how to
  change the pay rates, and the clicks for putting a $ sign on TOTAL FEE EARNED.
- An **Appendix — Known gaps in this SOP** carrying the five days that do not total 8 hours, and the
  missing lunch and breaks, so the defects travel with the document instead of living only here.

The master markdown is `templates/training-sop-v2.md` in this vault. Any future rebuild should start
from that file, not from the Google Doc, because a Doc cannot be edited by the connector — a change
means publishing a new Doc.

### Two things Vera could not do, and Ailynn has to click

- **Add it as a tab of the original SOP doc.** The Drive connector's `update_file` takes only title
  and parent_id. It cannot add a Docs tab or move content into one. v2 is therefore a separate file.
- **Set bookmarks.** Same limit. The markdown headings give a working document outline instead
  (View > Show outline), which is what bookmarks would have been used for.

### Published twice on 2026-09-06 — use only the second one

The first published Doc was made from an earlier draft and was missing the huddle description
Ailynn asked for ("calling a few trainees to share what they have learned based on the previous day
of training") on Days 2-20 — it just said "Daily Huddle". Caught by reading the published Doc back
against this vault's master. The Doc was republished in full from the master and the first copy was
moved to Google Drive's trash, where it stays recoverable for 30 days. **Only the ID above is live.**

The lesson: publishing is one-way. `create_file` takes a snapshot of whatever the markdown says at
that moment, and the Doc cannot be edited afterwards, so the master and the Doc drift silently unless
the Doc is read back and compared. Read the published Doc back every time, against the master, not
just for "did it publish".

A second thing that came out of the same read-back: the thermometer emoji used for the On Leave
marker is a four-byte character and came back garbled from the published Doc, while the three-byte
markers (checkmark, cross, no-entry) read back clean. The SOP now writes it as
"On Leave (thermometer icon)" with a sentence naming the dropdown option, so nothing in the document
depends on that character rendering. The Airtable dropdown itself is correct and unaffected.

## Still to confirm

- Whether the recruitment doc's stated training rate ($4/hr post-onboarding, $10/day during training)
  matches what the Training SOP itself says, since Vera has only read the recruitment doc's version.
