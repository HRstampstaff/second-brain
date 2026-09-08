# In-house team hours

**Confirmed by Ailynn, 2026-09-08.**

**Ann, Kate and Janet work flexible hours anywhere between 9:00am and 8:00pm Eastern.**

- Ann = Eydie Ann Embuscado Lugay, Coach
- Kate = Katherine Barin, COO
- Janet = Janet Mangrobang, Coach

That 9am-8pm is a **window they may work within**, not a shift. A punch anywhere inside it is normal
and needs no explanation.

## What follows from this

**They are not placed with a client, so their hours are never split by client.** On the payroll sheet
their client column reads `K. Stampini` because they work for Stamp Staff itself.

**So they do not need a row in the VA schedule form**, and their absence from it is correct rather
than a gap. Do not chase them for one. See
[2026-09-08 form gaps](../notes/2026-09-08_va-schedule-form-gaps.md).

**And the BambooHR payroll join must treat them as a separate case:** total their hours straight,
with no day-of-week or time-of-day matching against a schedule, and no `no-schedule-row` flag. Any
attempt to charge their punches to a client is wrong by definition. See
[the bamboohr skill](../.claude/skills/bamboohr/SKILL.md).

## Still open

**Two other people sit on the payroll as `In house` and were NOT named in this ruling**, so it is not
yet known whether the same applies to them:

- **Rafael Reyes**, Coach. The same job as Ann and Janet, so the same rule probably applies, but
  Ailynn named only three people and this was not confirmed.
- **Marmil Olorga**, contract type `In house` but position `VA`. Genuinely ambiguous: if she is
  placed with a client she needs a schedule row like any VA, and if she is internal she does not.
