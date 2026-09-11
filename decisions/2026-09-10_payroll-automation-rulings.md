# Five rulings on the BambooHR payroll automation

**Decided 2026-09-10 by Ailynn.** All five are binding on the Zap's join step (step 8) and on anyone
reviewing its output. Detail on the build: `.claude/skills/bamboohr/SKILL.md`.

## 1. A punch that fits no scheduled window is held for review

When a VA works for more than one client on the same day and a punch falls outside every window
they declared, **it is not charged to anyone.** Its hours go into a `FOR REVIEW` line on the output
sheet, with a flag naming the date, time and hours, and a person assigns it.

**Replaces** the earlier default of charging it to the first client listed, which could bill the wrong
client silently. On the first live run that default fired 125 times.

## 2. PTO still waiting for approval at cutoff: the coaches get reminded

The pull counts **approved** PTO only, and it does not guess at pending requests. The fix is upstream:
coaches are reminded to approve before the pull runs. **That reminder already exists** as the
"Monthly BambooHR leave-approval reminders" routine, so this ruling is about making sure it fires
**before** the pull, not about building something new.

## 3. When two email addresses belong to one VA, the Stamp Staff address wins

The join matches people by email. Where a VA used a personal address on the schedule form and a
Stamp Staff address elsewhere, **both are treated as one person under the Stamp Staff address.**

| VA | Stamp Staff address used | Other address |
|---|---|---|
| Emmanuel Abapo | emmanuel.stampstaff@gmail.com | emmanuel.abpo@gmail.com |
| June Airen Riego de Dios | june.stampstaff@gmail.com | annehilgaga15@gmail.com |
| Nhorbert John Balcera | nhorbert.stampstaff@gmail.com | enjeybalcera2025@gmail.com |
| Prince Haidee Ramos | princehaidee.stampstaff@gmail.com | phaideeramos@gmail.com |
| Rejohn Roman III Avila Gonzalo | johngonzalo.stampstaff@gmail.com | rejohn.gonzalo@gmail.com |
| Osaimi Hassan | **none exists**, osaimi.gvaco@gmail.com used | mike@markarianrealty.com |

**Two rows did not fit the rule cleanly:**

- **Rejohn:** the Stamp Staff address is the one on the **form**. Payroll holds his personal address.
  The rule still picks the Stamp Staff one, so payroll is the side that is out of step.
- **Osaimi:** neither address is a Stamp Staff one. His payroll address (`gvaco`) is used so his hours
  are not lost, and his form row was submitted under `mike@markarianrealty.com`, which looks like his
  client's address. **Unresolved:** whether he should have a Stamp Staff address, and whether he
  should resubmit under his own.

## 4. `workedHoursApproved` is ignored

It came back 0 on every row of the first live run. It is removed from the output entirely, so it
cannot be mistaken for a real figure.

## 5. The Zapier plan lives in teamasst@gmail.com

**That is the account holding Stamp Staff's paid Zapier plan.** It supersedes the 2026-09-08 guess
that `humanresources@stampstaff.com` was the account to open the Zap in.

**Verified the same day, from Zapier's own account data:** that login is Mark Stampini's, workspace "Personal Account" (id 23593249), on **Pro 1500**: Professional, billed annually, 1,500 tasks a month, not a trial. It is not unlimited. **The original Payroll Zap is not in it**, so the Zap is being rebuilt there. The other Zapier logins found in the browsers that day ("Stamp", reached through humanresources@stampstaff.com) are on free trials and must not be built in.

## 6. A Client Paid Holiday pays the hours BambooHR states: 8, not the VA's schedule

**Decided later on 2026-09-10 by Ailynn: "8 hours only".**

BambooHR records "Client Paid Holidays" in hours (`amount.unit: "hours"`, one date worth 8). The
holiday pays **exactly those 8 hours**, even for a VA whose schedule is 9 hours a day. On a day the
VA works for more than one client, the 8 hours are shared across those clients by their scheduled
hours, so the total is still 8.

**Scope, and what it does not cover:** this ruling is about hours-based holidays. **Ordinary PTO
recorded in days** for a placed VA still follows the 2026-09-07 decision (each client gets the hours
that client lost from the schedule), which can mean 9 hours for a 9-hour day. In-house staff are
already 8 hours a PTO day (4 for Key Bantola). Whether a placed VA's ordinary PTO day should also be
capped at 8 was not asked and is not decided.

## 7. A day-by-day timesheet tab, laid out like the coaches' cutoff sheet

**Decided later on 2026-09-10 by Ailynn**, from a screenshot of the sheet the coaches already use
(Coach, Client, Employee Number, Employee Name, Date, Schedule TimeIn/TimeOut, Actual TimeIn/TimeOut,
Final Working Hours, Remarks):

- **Where it goes:** a new tab in Payroll Automation Output, next to Automated Pull. The Zap does not
  write into any sheet people edit by hand.
- **Automated Pull keeps running.** Both tabs come from the same run: the detail tab is for coaches to
  check, the totals tab is for payroll.
- **Coach comes from the Revenue 2026 tracker, current month tab.** It is looked up per VA and client,
  because one VA can have a different coach for each client.
- **Final Working Hours** is the scheduled block, minus lateness past the 5-minute grace
  (policies/va-clock-in-out-rules.md), **minus any minutes left early**. Time worked past the
  scheduled end is not paid. These were read from the screenshot: a 3-minute-late start pays 4.00, a
  7-minute-late start pays 3.88 with the remark "7mins LATE", and 7:00-11:55 on a 7-11 block pays 4.00.
  **The early clock-out deduction was confirmed separately**, and it gets no grace.
- **Lunch for placed VAs: 1 hour comes off any scheduled block of 9 hours or longer.** Shorter
  blocks (4 hours, 2 hours) are paid in full. Chosen by Ailynn after seeing Emmanuel Abapo's row in
  the coaches' day-by-day tab: scheduled 8:00 AM to 5:00 PM, clocked 7:52 to 5:03, paid 8.00. The
  free-text lunch notes on the schedule form ("No lunch", "30-minute lunch") are **not** used.
- **A day with no clock-out is paid 0**, with a remark. The VA can dispute it for the next cutoff
  (policies/va-clock-in-out-rules.md).
- **Ailynn's own hours are left out of the pull entirely** ("leave me out", 2026-09-10). Her
  BambooHR punches had been showing as NO SCHEDULE FORM rows.
- **Employee Number is created manually by HR** (Ailynn, 2026-09-10: "HR manually creates it").
  No system generates it, so the Zap copies it from Payroll Main's Emp# by email. A blank Employee
  Number on the detail tab means HR has not entered one in Payroll Main yet: 21 of the 53 rows the
  connector returned on 2026-09-10, John Lloyd Gaza among them.
- **Revenue StampStaff month tabs are named "Mon YYYY"** ("Oct 2026", "Nov 2026"), confirmed by
  Ailynn 2026-09-10. The Zap picks the coach tab by that name from the pull date, so a tab named
  any other way ("October 2026", "Sept 2026") will not be found.
- **The coach lookup follows the month automatically (Ailynn chose "A", 2026-09-11).** Zapier's
  Google Sheets step can only read a worksheet by its fixed tab ID, so it cannot follow a month name.
  Instead a "Coach Lookup" tab in Payroll Automation Output copies the current month's Revenue
  StampStaff tab with IMPORTRANGE, choosing the tab with TEXT(TODAY(),"mmm yyyy"). It falls back to
  last month's tab if this month's does not exist yet. Step 9 reads Coach Lookup as a fixed tab.
  Ailynn clicks "Allow access" once to connect the two sheets.
- **Times are shown in Eastern.** Not asked; read from the coaches' own tab. John Lloyd Gaza's form
  says D. Brasel 6-10 AM Central, and the coaches' tab shows 7:00-11:00 AM.

## 8. In-house pay: flexible staff capped at 10 hours a day, fixed 9-6 staff paid their schedule

**Decided 2026-09-11 by Ailynn**, after the Aug 11-25 comparison showed in-house staff 12 to 20 hours
over the hand-built payroll because the join paid every punched hour.

- **Flexible:** Ann (Eydie Ann Embuscado Lugay), Kate (Katherine Barin), Janet Mangrobang, Key
  Bantola and Marfil Ganelo ("in house ann kate janet - flexible, keyverly marfil flexible"). Paid as
  punched, **capped at 10 hours a day** ("cap 10 hours a day"). Payroll already paid Ann and Janet 110
  and Kate 109 for Aug 11-25, which is 10 hours x 11 days. Key was a fixed 5-9pm shift until this
  answer; her PTO day stays 4 hours.
- **Fixed 9-6, Monday to Friday:** Rafael Reyes, Marmil Olorga and Benjomin Kristian Reyes. **Paid
  their schedule like a placed VA** (confirmed "yes"): late past the 5-minute grace and early out come
  off, 1 hour of unpaid lunch comes off the 9-hour block, and a day with no clock-out pays 0. A normal
  day pays 8, matching payroll's 88 for 11 days. PTO stays 8 hours a day.
- **Eastern for the 9-6 was not stated.** It is read from Raf's detail rows, which clock
  9:00 AM-6:00 PM ET.
