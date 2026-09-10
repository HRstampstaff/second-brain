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

**Still not verified:** that the Payroll Zap (`zapier.com/editor/378947092/draft`, owned by Kristin
Stampini) lives in that account, and what the plan tier actually includes.
