# Referral partners

How somebody who sends us business gets set up, welcomed and paid.

Written 2026-09-09 from the referral partner welcome email and Ailynn's own account of the process.
Anything not confirmed by her is marked as such rather than guessed.

## The moment it starts

**Someone expresses an intention to refer clients to us.** That is the trigger, not a signed
anything. Ailynn owns this step (confirmed 2026-09-09).

## Order of operations, and why this order

1. **Create their referral link and put it in their GHL contact, in the custom field
   `contact.referral_link`.** Ailynn does this. It is per-partner: the link is how a referral gets
   credited to the right person, so two partners must never share one.
2. **Then send the welcome email.** Not before.

**⛔ Step 1 comes before step 2, and this is the whole reason the order is written down.** The welcome
email pulls `{{contact.referral_link}}` into a button and into the visible link under it. **If the
field is empty when the email sends, the button renders with an empty address and goes nowhere. There
is no error and no bounce** — the partner just gets a dead button, and neither they nor we find out
until a referral that should have arrived never does. Populate the field first, then send, then test.

## Which email to send

Two templates, identical except for two lines of wording:

- `templates/referral-partner-welcome-email-physician.html` — for medical partners. Says "outside of
  their medical practice" and "the female doctors in your community".
- `templates/referral-partner-welcome-email-general.html` — for everybody else. Says "outside of
  their business" and "the business owners in your network".

Sending the physician version to a non-physician makes it read like a forwarded template. **Any future
change goes into BOTH files**; `git diff` between them should show only those two lines.

## What the email commits us to

Everything here is a promise already made in writing to every partner, so it is a standing obligation
rather than a nice idea:

- **Referral fees: $1,000 when a referral hires a full-time VA, $500 for part-time.**
- **A completed W-9 from the partner before any referral payment can be processed.**
- **A status update at the end of every month** on every referral that partner has sent, from Ailynn.
- The partner is told **Ailynn is their single point of contact**.

## What happens to the referral

Per the email: we contact them and schedule an inquiry call with Mark, he learns about their business
and where they need support, we explore what a VA could take off them, we present candidates and set
up interviews, and once they choose we run onboarding and assign a mentor coach.

## Open

- **Nobody has written down how a referral fee actually gets paid**, or who checks that the W-9 is on
  file before it goes out. Fiona holds the money side but has no referral-fee routine. Raise it before
  the first fee falls due rather than after.
- **There is no record of which partners exist**, their links, or what they have referred. If the
  programme grows past a handful of people, that belongs in the hub as a table rather than in GHL
  alone.
