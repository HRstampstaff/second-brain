# Chasing a VA for their schedule form row

**Written 2026-09-08. Drafted by Owen, never sent without the owners' yes.**

## When to use it

A VA appears on the payroll but has no row in the **Form Responses 1** tab of the StampStaff Payroll
sheet, so their clocked hours cannot be charged to a client. Working list of who is missing:
[notes/2026-09-08_va-schedule-form-gaps.md](../notes/2026-09-08_va-schedule-form-gaps.md).

**Check the person is actually placed with a client before sending.** In-house staff never need a
row and chasing them is a mistake: see
[policies/in-house-team-hours.md](../policies/in-house-team-hours.md).

## The form

**"Stamp Staff Schedule"**, in humanresources@stampstaff.com's Drive, created 2026-09-01.
File id `1-O-_BTj0lkekSrWxCc1BPeQj9x2Ur1wMsP2wq1B3aIg`.

**The responder link, confirmed by Ailynn 2026-09-08. This is the one that goes to VAs:**

```
https://docs.google.com/forms/d/e/1FAIpQLSe1DSteSdpK7i7ziKbsvxYpy292X_5YsURQQ6TvPO_HhOlAmw/viewform
```

**⛔ Do NOT paste the `/edit` link into the message.** That is the link Drive returns for the form,
and it lets the recipient change the form itself.

**⛔ And do NOT paste the payroll spreadsheet link.** That happened once while this was being set up.
The sheet holds every person's rate, net pay, bank name and personal email, and was at the time
shared as anyone-with-the-link-can-**edit**. Sending it to VAs would publish the whole payroll to
each other.

## The message

> **Subject:** Quick one - your work schedule, needed for payroll
>
> Hi {{FIRST_NAME}},
>
> We're tightening up how your hours get matched to your client each payroll, and we don't have your
> schedule on file yet.
>
> Could you fill this in when you get a moment? It takes about two minutes: {{FORM_LINK}}
>
> It asks for your client, the days you work, and your start and end times. If you work with more
> than one client, there's room for up to three.
>
> Please use **{{PAYROLL_EMAIL}}** so it matches our records.
>
> Thanks,
> Stamp Staff HR

| Tag | Fill with |
|---|---|
| `{{FIRST_NAME}}` | The VA's first name, as they are actually called |
| `{{FORM_LINK}}` | The responder link from the form's Send button |
| `{{PAYROLL_EMAIL}}` | Their email as it appears on the Payroll Main tab |

## Two things that make it work, learned 2026-09-08

**Name the email address they should use.** Six VAs had already filled the form in under a personal
address that does not match payroll, so their submissions were invisible to the match and they looked
like non-responders. Naming the address heads off the next six.

**Send it individually, not as one group email.** Each person needs to see their own address named,
which a group send cannot do. It also stops nineteen people discussing whose fault the gap is.

## What NOT to say

**Do not imply their pay is at risk.** It is not: the payroll sheet is filled in by hand today and
nobody is paid late because of a missing form row. This is about automating that matching. A chase
that reads as a threat to someone's pay will get a fast answer and cost more than it gains.
