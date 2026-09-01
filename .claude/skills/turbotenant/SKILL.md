---
name: turbotenant
description: "Load before ANY work touching TurboTenant: adding a charge to a tenant, reading who has paid, accepting or declining an application, publishing a listing, screening, or chasing a payment. Covers the fact that there is no connector and what that means, the device-check sign-in that cannot be switched off and why it defeats cloud browsers, how charges actually reach a tenant, the difference between a charge and money received, and what to do when the platform and the hub disagree. Trigger on 'TurboTenant', 'TT', 'add a charge', 'bill the tenant', 'did they pay', 'rent payment', 'the application', 'accept the applicant', 'screening', 'my listing', 'utility charge', 'late fee', or any question about rent collection through the platform."
---

# TurboTenant

**Version: 1.0 - 2026-08-24**

TurboTenant is where rent is actually collected and where applicants actually apply. That makes it
one of the few places in this system where a mistake is visible to a tenant within minutes, in the
form of money they are being asked for.

## There is no connector, and that changes everything

**TurboTenant has no official Claude connector and no public way in.** Everything happens through
the website, driven by a browser, which means every job on this platform is slower, more fragile and
more supervised than the same job on the hub.

Two consequences worth stating plainly, because they set expectations:

- **Nothing here happens in the background.** Anything on TurboTenant needs a real browser session
  with the owner signed in.
- **Prefer to do the thinking outside and the clicking inside.** Work out WHAT should be charged, to
  whom, for how much, from the hub, where the data is reliable. Use the browser only to enter the
  result. That way the fragile part is short and the checkable part is written down.

## The sign-in that cannot be switched off

**Signing in sends a code, every time the platform does not recognise the device, and there is no
setting that turns it off.** This is not the usual two-factor toggle. It is a device check, and it
is not optional.

**What this rules out:** a cloud browser, or any automation running on a machine that is not the
owner's. Each new session looks like a new device, so each one triggers a fresh code, so it can
never run unattended. Attempts to work around this reliably fail, and the failure is slow.

**What works instead: the owner's own browser, on their own machine, already signed in and trusted.**
Once a device is trusted, sessions on it stop being challenged. So the practical rule is: **this
platform is driven from the owner's machine, in a browser they are already logged into, with them
nearby.** Do not design anything that assumes otherwise, and do not promise the owner an unattended
version of it.

If a code is needed anyway, the owner reads it and gives it to you. **Never ask for their password.**

## Charges: how money is actually asked for

A charge is the platform telling a tenant they owe something. Getting one wrong is not a data problem,
it is a tenant seeing an incorrect bill.

- **Every charge needs the right tenant, the right amount, the right kind of charge and the right
  date.** All four. Getting the tenant right matters most, because the wrong person receives a
  demand for money.
- **Work the amount out before you open the browser, and show it to the owner first.** The
  arithmetic for a part month, a utility split or a late fee belongs in the hub, written down, where
  it can be checked. Not typed straight into a form.
- **Say what the charge is for in the description, in words the tenant will understand.** They will
  read it, and a vague description generates a message you then have to answer.
- **A charge is a demand, not a receipt.** Creating it does not mean anyone paid. Whether it was paid
  is a separate fact, read separately.
- **A charge already sent is awkward to take back.** Check before, not after.

**Recurring rent and one-off charges are different things.** The monthly rent normally sits as a
standing arrangement. A utility share, a repair recharge or a fee is a one-off. Adding a one-off does
not touch the standing arrangement, and changing the standing arrangement changes every future month.
Be certain which one the owner is asking for.

## Applications and screening

- **The platform holds the application, the screening result and the documents.** The hub holds the
  decision and everything that follows. Do not duplicate one into the other beyond what is needed.
- **A screening result is an input to a decision, never the decision.** The owner decides.
- **Accepting or declining an applicant is not yours to click.** It is a decision with legal weight,
  it goes to a real person, and it cannot be quietly undone. Prepare everything, then stop.
- **How applicants are treated has to be consistent**, because inconsistency is how a fair-housing
  problem is created without anyone intending one. Keep the process the same for everyone, and never
  volunteer a reason for a decline. Anything touching the wording of a decline goes past the owner.

## When the platform and the hub disagree

They will. A tenant moves out, the lease is closed in one place and left open in the other, and the
platform keeps billing someone who has gone. That is the single most common real failure on this
platform and it always looks the same: **money being asked of somebody who no longer lives there.**

- **A move-out has two halves. Closing the tenancy in the hub is one. Ending the arrangement on the
  platform is the other, and it is the half that stops the money.** Neither one does the other's job.
- **When the two disagree about money, the platform is what the tenant actually sees, so it is the
  one that has to be corrected first.** Then reconcile the hub.
- **When they disagree about facts of the tenancy, dates, names, terms, the signed lease wins**, not
  either system.

## The rhythm that keeps this clean

Most trouble here comes from doing things late rather than doing them wrong.

- Charges that recur monthly get done as a routine, not remembered.
- Anyone who has moved out gets closed on the platform in the same pass, or it silently keeps
  charging.
- Anything you were unsure about gets written down in the hub with the reason, because in a month
  nobody will remember why an amount was what it was.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| Sign-in asks for a code again on a machine that was fine | The session is being seen as a new device | The owner reads the code. Never try to route around the device check |
| It works for the owner and never for anything automated | The device check, doing exactly its job | Drive it from the owner's own trusted browser, with them present |
| A tenant is billed after moving out | The tenancy was closed in the hub but not on the platform | Close it on the platform. That is the half that stops the money |
| A tenant queries a charge they do not recognise | The description was too vague, or the split was never explained | Show them the working. Fix the description for next time |
| The hub and the platform disagree about what is owed | Something was recorded in one place only | Correct the platform first, because that is what the tenant sees |
| A charge went to the wrong person | The tenant was picked from a list without checking | Contact them yourself before anything else. Then fix it |
| An amount is right this month and wrong next month | A one-off was added to the standing arrangement, or the reverse | Check which of the two was changed |
