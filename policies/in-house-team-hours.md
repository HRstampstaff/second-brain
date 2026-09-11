# In-house team hours

**Confirmed by Ailynn, 2026-09-08.**

Stamp Staff's own people, as opposed to VAs placed with a client. **Eight people on three different
schedules.**

## ⚠️ Marfil Ganelo and Marmil Olorga are two different people

Similar names, different people, **different schedules**, and they sit next to each other on any
alphabetical list. Getting them the wrong way round pays somebody wrong.

| | Marfil Ganelo | Marmil Olorga |
|---|---|---|
| Email | marf.ganelo@gmail.com | shainaolarga.stampstaff@gmail.com |
| Schedule | **Flexible** | **Fixed 9-6** |
| Payroll client column | `project` | `K. Stampini` |
| Contract Type on payroll | `New VA Contract` | `In house` |

## Flexible, 9:00am to 8:00pm Eastern

A **window** they may work anywhere inside, not a shift. A punch anywhere in it is normal.

| Person | Payroll name | Role |
|---|---|---|
| Ann | Eydie Ann Embuscado Lugay | Coach |
| Kate | Katherine Barin | COO |
| Janet | Janet Mangrobang | Coach |
| Marfil | Marfil Ganelo | Project |
| Key | Key Bantola | in-house |

**Marfil was confirmed as "flexible hour" without the window being restated**, so she is assumed to
share the 9am-8pm window. Confirm before any figure built on it reaches a person.

**Key moved to flexible on 2026-09-11** (Ailynn: "keyverly marfil flexible"). Until then she was
recorded as a fixed 5:00pm to 9:00pm Eastern shift. Her window was not restated. Her payroll rate is
$2.50/hr, unlike everyone else here, so if a figure for Key looks wrong that is the first thing to
check rather than the hours.

## Fixed, 9 to 6

| Person | Payroll name | Role |
|---|---|---|
| Raf | Rafael Reyes | Coach |
| Marmil | Marmil Olorga | listed as VA, but in-house |
| Benjomin | Benjomin Kristian Reyes | in-house |

**Assumed Eastern** for the 9-6. It was not stated with a timezone; confirm before it reaches a person.

## What an approved PTO day is worth

**Ailynn, 2026-09-08: "for regular in house 8", and a half day is 0.5.**

So a full PTO day pays **8 hours** and a half day pays **4**. BambooHR already reports a half day as
`amount: 0.5`, so the 8 is multiplied out and no second number is needed.

**This covers the seven on the flexi and 9-6 schedules.**

**The 8 is deliberate and is NOT a rounding of the 9 hours a 9-to-6 spans. Lunch is unpaid**,
confirmed by Ailynn 2026-09-08. So a 9-to-6 person is paid 8 hours, not 9. **Do not "fix" this to 9**
on the reasoning that the span is nine hours: that would overpay three people on every PTO day.

**⛔ Key Bantola is 4, not 8.** Set by Ailynn on 2026-09-08, matching her four-hour evening shift.
She is not "regular in house", and **moving her to 8 would pay her PTO at double**. If anyone ever
tidies the list by making all eight the same number, that is the mistake it will be.

## What follows from this

**None of these eight are placed with a client, so their hours are never split by client.** On the
payroll sheet their client column reads `K. Stampini` or `project` because they work for Stamp Staff
itself.

**So none of them need a row in the VA schedule form**, and their absence from it is correct rather
than a gap. Do not chase them. See
[2026-09-08 form gaps](../notes/2026-09-08_va-schedule-form-gaps.md).

**And the BambooHR payroll join must treat them as a separate case:** total their hours straight,
with no day-of-week or time-of-day matching against a schedule and no `no-schedule-row` flag. Any
attempt to charge their punches to a client is wrong by definition. See
[the bamboohr skill](../.claude/skills/bamboohr/SKILL.md).

## ⛔ Contract Type does NOT identify who is in-house

**The obvious field is unreliable, and this was nearly built on it.** Only four of the eight carry
`Contract Type = In house` on the Payroll Main tab. **Benjomin Kristian Reyes, Key Bantola and
Marfil Ganelo all carry `New VA Contract`** despite being in-house, so anything keying off that
column silently drops them back into the client-attribution logic and mis-bills their hours.

**The cheapest fix is to correct the sheet rather than work around it:** set those three to
`In house` so the column means what it says, then the join can trust it. Until that is done, the
column is not a safe signal.

## How Key and Marfil were established

Ailynn was asked whether Key Bantola and Marfil Ganelo were in-house like the others, and answered
with their working hours rather than with a yes. **Their in-house status is therefore inferred from
that answer, not stated outright.** The hours themselves are stated and reliable.
