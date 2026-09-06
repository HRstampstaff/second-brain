# STAMPSTAFF TRAINING SOP

**20-Day GVA Training Programme — Version 2, 6 September 2026**

Combined Social Media Manager (SMM) + Executive Assistant (EA) track, from Day 0 pre-onboarding through graduation and client endorsement.

| | |
|---|---|
| SOP Owner | Kate Barin (Katherine Barin) — Training Process Owner |
| SMM Trainer | Rafael Reyes / Marmil / Ben |
| EA Trainer | Coach Ann / Coach Kate |
| Applies To | Batch 4 (2026) onward |
| Version | 2 — daily huddle added, attendance now tracked in Airtable |
| Last Updated | 6 September 2026 |

**Every training day is 8 working hours** (lunch separate), **plus a 30-minute Daily Huddle at 9:00–9:30**. Days therefore run 9:00 to 5:30.

---

## How to use the Airtable attendance tracker

Attendance and trainee assessment live in Airtable, not in a spreadsheet. One place, no versions, totals that add themselves up.

**The base:** https://airtable.com/apptst9VRUlVdybNZ

| Table | What it is for | Who touches it |
|---|---|---|
| **Attendance Grid** | The daily wall chart. One row per trainee, one column per training day. | Coaches, every morning |
| **Trainee Scorecard** | Skills and behaviour ratings at each assessment point. | Trainers, weekly |
| **Trainees** | The roster for the batch. | Training lead, at batch start |
| **Training Batches** | Batch number, start date, end date, status. | Training lead, once per batch |

**Attendance Grid:** https://airtable.com/apptst9VRUlVdybNZ/tbl9ugdvzmEbCyWFV/viwnHSVnZGuE649xf

### Taking attendance — every morning, about two minutes

1. Open the **Attendance Grid** table.
2. Find today's column: **Day 1** through **Day 20**. Day 1 is the batch's Training Start Date, shown on every row.
3. For each trainee, click that day's cell and pick one:

| Mark | Means | Pays |
|---|---|---|
| ✅ Present | Attended the full session | Full rate |
| ❌ Absent | Did not attend | $0 |
| ⛔ Undertime | Attended part of the day | Half rate |
| On Leave (thermometer icon) | Approved leave | $0 |

4. That is the whole job. **TOTAL PRESENT**, **TOTAL ABSENT**, **TOTAL UNDERTIME**, **TOTAL ON LEAVE**, **DAYS MARKED** and **TOTAL FEE EARNED** update themselves on the right of the row.

The fourth option shows in Airtable as a thermometer icon followed by "On Leave"; it is the last one in the dropdown list.

**Never leave a cell blank for a day that has happened.** A blank is not the same as absent — it counts as nothing at all, and DAYS MARKED will show under 20 at graduation so you can spot it.

### The training fee

- **$10** per day present on a **Whole Day** shift
- **$5** per day present on a **Half Day** shift
- **$5** per Undertime day
- **$0** for Absent and On Leave

Shift Type is set once per trainee, in the **Shift Type** column. TOTAL FEE EARNED is the figure payroll uses.

### At the start of a batch

1. Open **Training Batches** and create the batch, or open the existing one.
2. Fill in **Training Start Date** and **Training End Date**. Every Attendance Grid row picks these up automatically — they are never typed per trainee.
3. Open **Trainees** and add one row per trainee.
4. Open **Attendance Grid** and add one row per trainee, linking each to the batch.

### Scoring a trainee

Open **Trainee Scorecard** and add one row per trainee **per assessment point** — Week 1, Week 2, Week 3, Week 4, Final. One row per assessment, not one per trainee, so improvement is visible rather than only the last mark.

Star ratings are 1 to 5:

| Stars | Means |
|---|---|
| 1 | Needs a lot of help |
| 3 | Can do it with supervision |
| 5 | Ready for a client |

**Core skills:** Project Management Tools · Call Handling Experience · Communication Skills · AI Mastery · CRM Management

**Creative & tech:** Video Editing · Graphics Design · Automation · Funnel Creation

**Training behaviour:** Proactive · Team Activities · Recitation · Fast Learner

**Red flags (tick boxes):** Sleeping During Training · Attendance Issues

Fill in a whole group or leave it blank. **An unscored star counts as zero**, so a half-filled row drags the averages down and reads as a bad score.

### Changing the pay rates later

The rates live in one formula. On the **TOTAL FEE EARNED** column: click the **▾** on the field header → **Edit field**. You will see:

`{TOTAL PRESENT} * IF({Shift Type} = "Half Day", 5, 10) + {TOTAL UNDERTIME} * 5`

Change the `10` for the whole-day rate, the first `5` for the half-day rate, the last `5` for undertime. Save, and every row recalculates. Those three numbers appear nowhere else.

### Showing the fee with a $ sign

Field header **▾** → **Edit field** → **Formatting** → **Currency**, symbol **$**. Keep the field numeric; do not rewrite the formula to produce text like "$120", because text sorts $100 before $20 and the column can no longer be totalled.

---

## Day 0 — Pre-Training

*Before Day 1 begins*

| Block | Trainer | Topic / Activity | Materials & Links | Notes |
|---|---|---|---|---|
| Recruitment → Training Handoff | Recruitment Team / Training Team | Recruitment tells Training how many trainees were invited to the batch (names, roles — SMM/EA, contact info) | Batch Invite List: https://docs.google.com/spreadsheets/d/1bFzdq7zR5njsgNp26TbZWB4k4-s45-0IxEvgzPkQA0Q/edit?usp=sharing | Must be sent before the onboarding email goes out |
| Onboarding Email | Rafael Reyes / Coach Ann | Create StampStaff email; download & create Discord account; watch Welcome + Orientation Video; Like & Follow StampStaff FB and TikTok | Onboarding Email Template · Discord Invite · FB: https://www.facebook.com/profile.php?id=61566579276247 · TikTok: https://www.tiktok.com/@stampstaffcareers · SMM should have a raw video file to edit (PRE INTERVIEW) | Sent Thursday. Screenshot/proof of Like+Follow required before Day 1 |
| Confirmation Call | Rafael Reyes / Coach Ann | Kay calls Friday AM to confirm all pre-training items are complete | Pre-Training Checklist | Must be complete before Monday Day 1 start |
| Training → Recruitment Handback | Recruitment Team / Training Team | Training reports actual Day 1 attendance back to Recruitment (names, no-shows flagged) | Batch Attendance Report – ClickUp | Reconciles against the Day 0 invite list; triggers follow-up on no-shows |
| Training Feedback Form | — | The form trainees complete each week | https://forms.gle/dNTKksLYsYh5cNVv5 | — |
| Feedback Form Responses | — | Where the weekly responses land | https://docs.google.com/spreadsheets/d/1zU4u0lmDBVJsCdzCK5AiOLE-1spY6SSSpZgL9gn8yzU/edit?usp=sharing | — |

---

## Week 1 — Foundations

*Orientation, role fundamentals, SMM editing basics, EA fundamentals*

### Day 1

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH | Rafael, Ann | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training — on Day 1 this is Welcome & Orientation instead, there being no previous day | ▢ Orientation Video | — |
| 9:30–10:30 | 1 hr | BOTH | Rafael, Ann | What Is Your Role — EA version / SMM version | ▢ What Is Your Role – EA / SMM | Use role-specific slides, not the combined deck |
| 10:30–11:15 | 45 min | BOTH | Rafael, Ann | Who Is Our Clientele (industries, US culture, time zones, 50-state coverage) | ▢ Who Is Our Clientele Slides | — |
| 11:15–11:45 | 30 min | BOTH | Rafael, Ann | VA Mindset — Task Taker → Problem Solver → Trusted Partner | ▢ VA Mindset Deck | — |
| 11:45–12:15 | 30 min | BOTH | Ann | EOD/SOD Tracker setup & walkthrough; Discord access granted | ▢ EOD Tracker Template | — |
| 12:15–5 | 4 hrs 45 min | EA | Ann | EA Systems Orientation & Access — GHL account, Discord channels, systems overview | ▢ EA Systems Orientation Guide | SOP tags this BOTH; it cannot be, SMM runs its own PM |
| 12:15–2:45 | 2 hrs 30 min | SMM | Rafael | Adly Kinsman video series: Hook / Billion Dollar Edit / Raising the Stakes / Payoff | ▢ Adly Kinsman Playlist | — |
| 2:45–3:30 | 45 min | SMM | Rafael | Brand Guide & step-by-step editing workflow | ▢ Brand Guide Doc | — |
| 3:30–5:30 | 2 hrs | SMM | Rafael | Edit first video with live feedback from Mark/Marmil | ▢ Raw Footage Drive | Deliverable: 1 video (cum. 1) |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 2

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–11:12 | 1 hr 42 min | SMM |  | Ryan Magin daily video — “Identifying Hook” | ▢ Ryan Magin Video Library | Daily recurring Ryan Magin video, whole week |
| 9:30–10:30 | 1 hr | EA |  | Project Management tools (Asana, ClickUp) discussion + Coursebox exam | ▢ PM Tools Coursebox | — |
| 10:30–11:30 | 1 hr | EA |  | Fundamentals of Email Management discussion + Coursebox | ▢ Email Mgmt Coursebox | — |
| 11:12–5:27 | 6 hrs 15 min | SMM |  | Edit video #2 + continue editing, real-time feedback from Mark/Marmil | ▢ Raw Footage Drive | Deliverable: +1 (cum. 2) |
| 11:30–12:30 | 1 hr | EA |  | Calendar Management & Customer Service fundamentals | ▢ Calendar Mgmt Materials | — |
| 12:30–1:30 | 1 hr | EA |  | EA Practice & Application — project management & email lessons | ▢ EA Practice Task List | — |
| **Day ends 5:27** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 3

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–5:30 | 8 hrs | SMM |  | Ryan Magin daily video + continue editing | ▢ Ryan Magin Video Library | — |
| 9:30–10:30 | 1 hr | EA |  | Calendar Management deep dive — creating invites, client scheduling | ▢ Calendar Mgmt SOP | — |
| 10:30–11:30 | 1 hr | EA |  | Document Preparation & Travel Management intro | ▢ Travel Mgmt Simulation | — |
| 11:30–12:30 | 1 hr | EA |  | Bookkeeping / QuickBooks intro | ▢ QuickBooks Basics | — |
| 12:30–5:30 | 5 hrs | EA |  | EA Practice & Application — calendar management | ▢ EA Practice Task List | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 4

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–5:30 | 8 hrs | SMM |  | Ryan Magin daily video + continue editing | ▢ Ryan Magin Video Library | — |
| 9:30–10:30 | 1 hr | EA |  | Bookkeeping/QuickBooks practice; Data Entry & Document Mgmt (Dotloop) | ▢ Dotloop Training | — |
| 10:30–11:30 | 1 hr | EA |  | Customer Service roleplay/scenarios | ▢ CS Roleplay Script | — |
| 11:30–5:30 | 6 hrs | EA |  | EA Practice & Application — bookkeeping/QuickBooks | ▢ EA Practice Task List | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 5

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–11 | 1 hr 30 min | BOTH |  | Refresher Day 1–4 recap + open Q&A | — | — |
| 11–4:45 | 5 hrs 45 min | SMM |  | Continue editing + Week 1 Assessment | ▢ SMM Week 1 Assessment | Confirm cumulative 2 approved videos |
| 11–4:45 | 5 hrs 45 min | EA |  | Week 1 Assessment — PM tools, email, calendar, bookkeeping | ▢ EA Week 1 Assessment | — |
| 4:45–5:30 | 45 min | BOTH |  | Training Feedback Form + Trainer weekly sit-down | ▢ Training Feedback Form / ▢ Trainer Assessment Tracker | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |
| 5:30–6 | 30 min | COACHES |  | Weekly Coaches' Evaluation Call — not part of the trainee's day | ▢ Trainee Evaluation Tracker – ClickUp | Assess: Project Management tools, Landing Page creation, Video Editing, Communication skills, Attendance observation, Best in Participation (overall) |

## Week 2 — GHL, Backend Selling, AI Tools

*GoHighLevel, “Hammer Them” backend selling, AI tech stack & prompting*

### Day 6

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–10:30 | 1 hr | BOTH |  | Backend Selling System Overview with Mark | ▢ Hammer Them – Overview Video | — |
| 10:30–1:30 | 3 hrs | BOTH |  | Backend Selling “Hammer Them” Deep Dive, Part 1 (Jeremy Haynes framework, in-market demographic) | ▢ Hammer Them Deep Dive – Trainer Notes | — |
| 1:30–5:30 | 4 hrs | SMM |  | Continue editing | ▢ Raw Footage Drive | Deliverable: +1 (cum. 3) |
| 1:30–2:30 | 1 hr | EA |  | Email Marketing fundamentals — how to build a marketing email | ▢ Email Marketing SOP | — |
| 2:30–5:30 | 3 hrs | EA |  | EA Practice & Application — Backend Selling / Hammer Them, self-paced review | ▢ EA Practice Task List | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 7

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–11:30 | 2 hrs | BOTH |  | Backend Selling “Hammer Them” Deep Dive, Part 2 | ▢ Hammer Them Deep Dive – Trainer Notes | — |
| 11:30–1:30 | 2 hrs | BOTH |  | Introduction to GHL — navigation, contacts, funnels basics | ▢ GHL – Getting Started Series | — |
| 1:30–3:30 | 2 hrs | BOTH |  | GHL Activity — merge duplicate contacts, customer journey, lead sources, analytics | ▢ GHL Contacts Activity Sheet | — |
| 3:30–5:30 | 2 hrs | SMM |  | Continue editing | ▢ Raw Footage Drive | Deliverable: +1 (cum. 4) |
| 3:30–5:30 | 2 hrs | EA |  | EA Practice & Application — GHL contacts & customer journey | ▢ EA Practice Task List | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 8

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–11 | 1 hr 30 min | BOTH |  | GHL Calendar Management — calendar types, connecting client & agent calendars (1 hr discussion + 30 min activity) | ▢ GHL Calendar Mgmt Guide | — |
| 11–12 | 1 hr | BOTH |  | GHL Opportunities & Pipelines (30 min discussion + 30 min activity) | ▢ GHL Pipelines Guide | — |
| 12–12:30 | 30 min | BOTH |  | Customer Journey discussion | ▢ Customer Journey Guide | — |
| 12:30–1:15 | 45 min | BOTH |  | AI Agents in GHL — discussion | ▢ GHL AI Agents Overview | — |
| 1:15–3:45 | 2 hrs 30 min | BOTH |  | GHL Landing Page discussion + build | ▢ GHL Landing Page Activity | — |
| 3:45–4:45 | 1 hr | BOTH |  | Landing Page activity + 30-min feedback | — | — |
| 4:45–5:30 | 45 min | SMM |  | Continue editing (as time allows around GHL blocks) | ▢ Raw Footage Drive | — |
| 4:45–5:30 | 45 min | EA |  | EA Practice & Application — GHL calendar/opportunities | ▢ EA Practice Task List | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 9

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–10:30 | 1 hr | BOTH |  | GHL Confirmation Page — discussion / Jeremy refresher | ▢ GHL Confirmation Page Guide | — |
| 10:30–11:15 | 45 min | BOTH |  | Confirmation Page activity | — | — |
| 11:15–12:15 | 1 hr | BOTH |  | Trainee presentations — landing page + confirmation page walkthroughs (max 3 presenters) | — | — |
| 12:15–2:15 | 2 hrs | BOTH |  | Introduction to Automation | ▢ GHL Automation Intro | — |
| 2:15–4:15 | 2 hrs | BOTH |  | Process Map & SOP discussion — connected to automation, with activity + feedback | ▢ Process Map Templates | — |
| 4:15–5:30 | 1 hr 15 min | SMM |  | Continue editing | ▢ Raw Footage Drive | — |
| 4:15–5:30 | 1 hr 15 min | EA |  | EA Practice & Application — GHL automation & process map | ▢ EA Practice Task List | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 10

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–11 | 1 hr 30 min | BOTH |  | Refresher Week 2 recap + Q&A | — | — |
| 11–12:30 | 1 hr 30 min | BOTH |  | AI Tech Stack — ChatGPT, Claude, Gemini, Grok, Perplexity, Google Labs, Kimi | ▢ AI Tech Stack Deck | — |
| 12:30–1:30 | 1 hr | BOTH |  | The Art of Prompting | ▢ Art of Prompting Coursebox | — |
| 1:30–4 | 2 hrs 30 min | SMM |  | Social Media Platform Deep Dive — FB, IG, YouTube, TikTok, LinkedIn, GBP, LSA, Reading Analytics | ▢ Social Media Deep Dive Slides | — |
| 1:30–4:45 | 3 hrs 15 min | EA |  | Email Marketing wrap-up + Week 2 Assessment | ▢ Email Marketing SOP / ▢ EA Week 2 Assessment | — |
| 4–4:45 | 45 min | SMM |  | Continue editing + Week 2 Assessment | ▢ Raw Footage Drive / ▢ SMM Week 2 Assessment | Deliverable: +1 (cum. 5) — Week 2 target met |
| 4:45–5:30 | 45 min | BOTH |  | Training Feedback Form + Trainer weekly sit-down | ▢ Training Feedback Form / ▢ Trainer Assessment Tracker | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |
| 5:30–6 | 30 min | COACHES |  | Weekly Coaches' Evaluation Call — not part of the trainee's day | ▢ Trainee Evaluation Tracker – ClickUp | Assess: Project Management tools, Landing Page creation, Video Editing, Communication skills, Attendance observation, Best in Participation (overall) |

## Week 3 — Webinar Mastery & Mock Interviews

*Webinar SOP, lead/utility calls, WordPress — mock interviews begin*

### Day 11

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–11:10 | 1 hr 40 min | BOTH |  | Mastering Webinar SOP video (Jeremy Haynes) | ▢ Mastering Webinar SOP Video | — |
| 11:10–11:55 | 45 min | BOTH |  | Takeaways / Recitation on webinar video | — | — |
| 11:55–5:25 | 5 hrs 30 min | SMM |  | Continue editing / webinar asset prep | ▢ Raw Footage Drive | Deliverable: +1 (cum. 6) |
| 11:55–12:55 | 1 hr | EA |  | Mock Interview — Round 1 (orientation): interview Q&A format, roleplay with coach | ▢ Mock Interview Question Bank | Mock interviews begin this week |
| 12:55–5:25 | 4 hrs 30 min | EA |  | EA Practice & Application — real estate lead follow-up, webinar support tasks | ▢ EA Practice Task List | — |
| **Day ends 5:25** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 12

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–10:30 | 1 hr | BOTH |  | Webinar task groupings & script assignment discussion | ▢ Webinar Script Template | — |
| 10:30–3:45 | 5 hrs 15 min | BOTH |  | Webinar build activity (split: some on script, some on tech setup) | ▢ Webinar Build Tracker | — |
| 3:45–5:30 | 1 hr 45 min | SMM |  | Continue editing | ▢ Raw Footage Drive | Deliverable: +1 (cum. 7) |
| 3:45–4:45 | 1 hr | EA |  | Real estate lead / utility company practice calls | ▢ Call Script – Lead Gen | — |
| 4:45–5:30 | 45 min | EA |  | Mock Interview — Round 2 (roleplay with coach) | ▢ Mock Interview Question Bank | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 13

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–11:30 | 2 hrs | BOTH |  | Social Media Calendar & Content Creation — reading analytics, building a content calendar with AI | ▢ Content Calendar Template | — |
| 11:30–5:30 | 6 hrs | SMM |  | Continue editing / webinar prep | ▢ Raw Footage Drive | Deliverable: +1 (cum. 8) |
| 11:30–12:30 | 1 hr | EA |  | Lead/utility practice calls continue | ▢ Call Script – Lead Gen | — |
| 12:30–1:15 | 45 min | EA |  | Mock Interview — Round 3 | ▢ Mock Interview Question Bank | — |
| 1:15–5:30 | 4 hrs 15 min | EA |  | EA Practice & Application — content calendar & analytics | ▢ EA Practice Task List | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 14

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–2:45 | 5 hrs 15 min | BOTH |  | Webinar build & rehearsal continues | ▢ Webinar Build Tracker | — |
| 2:45–5:30 | 2 hrs 45 min | SMM |  | Continue editing | ▢ Raw Footage Drive | Deliverable: +1 (cum. 9) |
| 2:45–3:45 | 1 hr | EA |  | WordPress Basics (Coursebox) | ▢ WordPress Basics Coursebox | — |
| 3:45–4:45 | 1 hr | EA |  | Property Website creation intro (Google Sites) | ▢ Property Website Guide | — |
| 4:45–5:30 | 45 min | EA |  | Mock Interview — Round 4 | ▢ Mock Interview Question Bank | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 15

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–3:30 | 6 hrs | BOTH |  | Webinar full-day live rehearsal / dry run | ▢ Webinar Build Tracker | — |
| 3:30–4:45 | 1 hr 15 min | SMM |  | Week 3 Assessment + continue editing | ▢ SMM Week 3 Assessment | Deliverable: +1 (cum. 10) — Week 3 target met |
| 3:30–3:45 | 15 min | EA |  | Week 3 Assessment — calls, WordPress, property sites | ▢ EA Week 3 Assessment | — |
| 3:45–4:45 | 1 hr | EA |  | Mock Interview — Round 5 (graded) | ▢ Mock Interview Question Bank | — |
| 4:45–5:30 | 45 min | BOTH |  | Training Feedback Form + Trainer weekly sit-down | ▢ Training Feedback Form / ▢ Trainer Assessment Tracker | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |
| 5:30–6 | 30 min | COACHES |  | Weekly Coaches' Evaluation Call — not part of the trainee's day | ▢ Trainee Evaluation Tracker – ClickUp | Assess: Project Management tools, Landing Page creation, Video Editing, Communication skills, Attendance observation, Best in Participation (overall) |

## Week 4 — Production Push & Final Readiness

*Full video production, other CRMs, final assessment & graduation*

### Day 16

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–3:30 | 6 hrs | BOTH |  | Webinar delivery practice (live, continued) | ▢ Webinar Build Tracker | — |
| 3:30–5:30 | 2 hrs | SMM |  | Full production edit push | ▢ Raw Footage Drive | Deliverable: +2 (cum. 12) |
| 3:30–4:30 | 1 hr | EA |  | Intro to Other CRMs & PM Tools (beyond GHL) | ▢ Other CRMs Overview | — |
| 4:30–5:30 | 1 hr | EA |  | CMA (Comparative Market Analysis) basics | ▢ CMA Training Materials | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 17

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–2:45 | 5 hrs 15 min | BOTH |  | Webinar delivery practice continued | ▢ Webinar Build Tracker | — |
| 2:45–5:30 | 2 hrs 45 min | SMM |  | Continue production edit push | ▢ Raw Footage Drive | Deliverable: +2 (cum. 14) |
| 2:45–3:45 | 1 hr | EA |  | Property Website build (Google Sites) | ▢ Property Website Guide | — |
| 3:45–4:45 | 1 hr | EA |  | Set up Google Analytics for website performance tracking | ▢ Google Analytics Setup Guide | — |
| 4:45–5:30 | 45 min | EA |  | Mock Interview — Round 6 | ▢ Mock Interview Question Bank | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 18

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–2:45 | 5 hrs 15 min | BOTH |  | Webinar Q&A / troubleshooting session | ▢ Webinar Build Tracker | — |
| 2:45–5:30 | 2 hrs 45 min | SMM |  | Continue production edit push | ▢ Raw Footage Drive | Deliverable: +2 (cum. 16) |
| 2:45–4:45 | 2 hrs | EA |  | GBP & LSA — local SEO deep dive, Backend Sales wrap-up | ▢ GBP & LSA Local SEO Guide | — |
| 4:45–5:30 | 45 min | EA |  | Mock Interview — Round 7 | ▢ Mock Interview Question Bank | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 19

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–5:30 | 8 hrs | SMM |  | Final production push to close out approved video target | ▢ Raw Footage Drive | Deliverable: +2 (cum. 18) |
| 9:30–4:30 | 7 hrs | EA |  | Advanced Customer Service roleplay + admin skills polish | ▢ CS Roleplay Script | — |
| 4:30–5:30 | 1 hr | EA |  | Mock Interview — Final Round (formal, graded) | ▢ Mock Interview Question Bank | — |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |

### Day 20

| Time | Duration | Track | Trainer | Topic / Activity | Materials & Links | Notes / Deliverable |
|---|---|---|---|---|---|---|
| 9–9:30 | 30 min | BOTH |  | Daily Huddle — calling a few trainees to share what they have learned based on the previous day of training | — | — |
| 9:30–2 | 4 hrs 30 min | SMM |  | Close out final approved videos | ▢ Raw Footage Drive | Deliverable: +2 (cum. 20 per VA — target met) |
| 9:30–2 | 4 hrs 30 min | EA |  | Final Admin Checklist & Handoff Prep — confirm all EA deliverables complete | ▢ Onboarding Handoff Checklist | — |
| 2–4 | 2 hrs | BOTH |  | Final Overall Assessment (both tracks) | ▢ Final Assessment – SMM / ▢ Final Assessment – EA | — |
| 4–4:15 | 15 min | BOTH |  | Final Training Feedback Form | ▢ Training Feedback Form | — |
| 4:15–5 | 45 min | BOTH |  | Trainer Final Evaluation Sit-Down — Pass/Fail decision, client endorsement | ▢ Trainer Assessment Tracker | — |
| 5–5:30 | 30 min | BOTH |  | GVA Onboarding Handoff — endorse to client, separate EA/Creative group chats, endorsement video | ▢ Onboarding Handoff Checklist | Graduation |
| **Day ends 5:30** | **8 hrs + 30 min huddle** |  |  |  |  |  |
| 5:30–6 | 30 min | COACHES |  | Weekly Coaches' Evaluation Call — not part of the trainee's day | ▢ Trainee Evaluation Tracker – ClickUp | Assess: Project Management tools, Landing Page creation, Video Editing, Communication skills, Attendance observation, Best in Participation (overall) |
---

## Notes

- The **Trainer** column shows suggested defaults based on track (SMM/EA). They are not final assignments — trainers assign themselves in Airtable.
- The **20-video target is per SMM trainee**, not a batch total. Every SMM VA is tracked against the same number.
- Every Friday, all coaches hold a 30-minute **Weekly Coaches' Evaluation Call** to share observations per trainee. This is coach-to-coach time and is not counted in the trainee's 8-hour day.
- **Recruitment ↔ Training headcount handoff:** Recruitment reports the invited headcount before Day 0; Training reports actual Day 1 attendance back.
- The Week 2 GHL/Backend sequence reflects the final agreed order from the planning call: Hammer Them → GHL basics → Calendar/Opportunities → Landing Page → Confirmation Page → Automation → AI Tools/Prompting → Social Media Deep Dive.
- **New in Version 2:** the 9:00–9:30 Daily Huddle, and attendance moved from spreadsheets into Airtable.

---

## Appendix — Known gaps in this SOP

Found on 6 September 2026 by laying the schedule out as real clock times. These are defects in the schedule itself and need Kate's decision. Nothing here has been invented or silently patched.

| Day | Track | Blocks total | Problem |
|---|---|---|---|
| **2** | **EA** | **4 hrs** | **Half the day is unaccounted for.** The EA column lists only four 1-hour blocks for a full day. This is the serious one. |
| 1 | SMM | 8 hrs 30 min | 30 min over. The 4 hr 45 min "EA Systems Orientation" block is tagged BOTH, which cannot be right — SMM runs its own 5 hr 15 min PM at the same hour. Treated as EA-only. |
| 2 | SMM | 7 hrs 57 min | 3 min short, rounding from "~1h 42m". Ignore. |
| 11 | both | 7 hrs 55 min | 5 min short, rounding from "1h 40m". Ignore. |

Every other day balances to exactly 8 hours on both tracks.

**Also unresolved: lunch and breaks.** The SOP says each day is 8 working hours with lunch separate, but no lunch slot is written anywhere. A 9:00 start with the huddle puts the day's end at 5:30 with no break in it. Kate and the training lead need to decide where lunch sits.
