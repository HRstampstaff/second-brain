# In-house team hours

**Confirmed by Ailynn, 2026-09-08.**

Stamp Staff's own people, as opposed to VAs placed with a client. **There are two schedules, not
one.**

## Flexible, 9:00am to 8:00pm Eastern

They may work anywhere inside that window. It is a **window**, not a shift, so a punch anywhere in it
is normal and needs no explanation.

| Person | Payroll name | Role |
|---|---|---|
| Ann | Eydie Ann Embuscado Lugay | Coach |
| Kate | Katherine Barin | COO |
| Janet | Janet Mangrobang | Coach |

## Fixed, 9 to 6

Same in-house status, but a set schedule rather than a window.

| Person | Payroll name | Role |
|---|---|---|
| Raf | Rafael Reyes | Coach |
| Marmil | Marmil Olorga | listed as VA, but in-house |
| Benjomin | Benjomin Kristian Reyes | in-house |

**Assumed Eastern**, by analogy with the flexi group. Not stated explicitly, so confirm before any
figure built on it reaches a person.

## What follows from this

**None of these six are placed with a client, so their hours are never split by client.** On the
payroll sheet their client column reads `K. Stampini` because they work for Stamp Staff itself.

**So none of them need a row in the VA schedule form**, and their absence from it is correct rather
than a gap. Do not chase them. See
[2026-09-08 form gaps](../notes/2026-09-08_va-schedule-form-gaps.md).

**And the BambooHR payroll join must treat them as a separate case:** total their hours straight,
with no day-of-week or time-of-day matching against a schedule and no `no-schedule-row` flag. Any
attempt to charge their punches to a client is wrong by definition. See
[the bamboohr skill](../.claude/skills/bamboohr/SKILL.md).

## ⛔ Contract Type does NOT identify who is in-house

**The obvious field is unreliable, and this was nearly built on it.** Five of the six carry
`Contract Type = In house` on the Payroll Main tab. **Benjomin Kristian Reyes carries
`New VA Contract`** despite being in-house, so anything keying off that column silently drops him
back into the client-attribution logic and mis-bills his hours.

**The cheapest fix is to correct the sheet rather than work around it:** set Benjomin's Contract Type
to `In house` so the column means what it says, then the join can trust it. Until that is done, the
column is not a safe signal.

## Still open

**Two more people have `K. Stampini` or `project` as their client but were not named in this
ruling**, so it is not known whether they are in-house too:

- **Key Bantola**, client `K. Stampini`, Contract Type `New VA Contract`
- **Marfil Ganelo**, client `project`, position `Project`, Contract Type `New VA Contract`

**How the join should learn who is in-house was left to Vera** (Ailynn had no preference, 2026-09-08).
Recommended: fix Benjomin's Contract Type, then have the Zap read the Payroll Main tab as a fifth
data source and key off `Contract Type = In house`. Not built.
