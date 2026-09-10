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
