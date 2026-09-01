---
name: netlify
description: "Load when a site actually needs hosting: publishing it, republishing after a change, pointing the owner's domain at it, storing a key so it stays off the page, or diagnosing a site that has gone down. Optional, and only reached after `website-building` has established that an Artifact is not enough. Covers publishing by hand, the stored-settings step everyone forgets, forms that need no code, domains and certificates, and what the free tier really means. Trigger on 'Netlify', 'host it', 'publish the site', 'deploy', 'point my domain', 'the site is down', 'HTTPS', 'environment variable', or any question about where a site actually lives."
---

# Netlify

**Version: 1.0 - 2026-08-24**

Netlify is where a small hand-built site lives. This skill is optional: most owners never need it,
because `artifacts` covers what they wanted. Reach for it only after `website-building` has
established that an Artifact genuinely will not do.

**The owner sets this up themselves.** It is their account, their domain and their bill. Prepare
everything, tell them exactly what to click, and let them click it.

## Publishing, and why by hand is fine

The whole site is a folder. Publishing is dragging that folder onto the deploy area, and it is live in
seconds. **Do not connect it to a repository unless the owner asks.** Connecting adds a build step,
and a build step is the thing that starts failing six months later without anyone touching the site.
For a hand-written page there is nothing to build.

Publishing again replaces what was there. Old versions are kept, so a bad publish is recoverable, and
that is worth knowing before the owner panics.

## The stored-settings step everyone forgets

If the site reaches data using a key, the key belongs in the site's stored settings, not in the files.
See `website-building` for why.

**After adding or changing a stored setting, the site has to be published again before the change is
picked up.** This produces the single most confusing few minutes in the whole process: the correct
value is visibly saved, and the site is visibly still using the old one. Nothing is broken. It just
has not been republished.

**Say this to the owner before they hit it**, not afterwards.

## Forms without writing any code

Netlify can take form submissions with no code behind them, which for an enquiry or application form
removes most of the work. Two things to get right:

- **Turn on the notification email.** Submissions sitting in a dashboard nobody opens are submissions
  that were missed.
- **Turn on the spam protection.** A public form always gets spammed, and the built-in protection is
  better than anything hand-rolled.

There is a limit on how many submissions the free tier accepts each month. For a landlord that is
almost never reached, but it is worth knowing it exists rather than discovering it during a busy
letting period.

## Domains and certificates

Pointing the owner's own domain at the site is done in their domain provider's settings, not in
Netlify, and it is the part most likely to go wrong.

- **Changes take a while to take effect.** Not minutes. Do not start debugging a domain change on the
  same day.
- **The secure certificate is issued automatically, but only once the domain is actually pointing at
  the site.** Trying to fix a certificate before the domain has moved is chasing the wrong problem.
- **A site that has been up for months and suddenly dies is almost always the domain, not the site.**
  Check renewal first, every time. It is the fastest thing to rule out and the most common cause.

## What the free tier really means

It is genuinely enough for a landlord's dashboard or a small brochure site, and there is no reason to
pay at the start.

The limits worth knowing about, without pretending to know today's numbers, because they change:

- **There is a monthly allowance on how much gets served.** A small site never approaches it.
- **There is an allowance on build minutes**, which is irrelevant if the site is published by hand,
  because nothing is built. Another reason to publish by hand.
- **There is a limit on form submissions.**
- **Some team and access features are paid**, which only matters if more than one person needs to
  manage it.

**Check current limits rather than quoting a number.** They move, and a confidently wrong figure is
worse than a pointer.

## What is worth writing down

In the owner's own repository, so this survives whoever set it up: which account and which site the
page lives on, what the site reads, what stored settings it needs, where the domain is registered and
when it renews, and how to publish a change.

**Without that, the site becomes unmaintainable the moment the person who built it moves on**, and
what happens next is that it is quietly abandoned rather than fixed.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| The whole site is gone | The domain lapsed | Check renewal before anything else |
| A stored setting was changed and nothing happened | It was not published again | Publish again |
| The certificate is not working on a new domain | The domain has not finished pointing at the site yet | Wait for the domain, then look at the certificate |
| The last publish broke it | A bad folder was dragged over | Roll back to the previous version |
| Form submissions are being missed | Notifications were never switched on | Switch them on |
| A page loads but shows no data | What it reads was renamed or the key expired | Check the source, then the stored setting |
| It works on the owner's machine and not elsewhere | Something is cached, or something depends on being signed in | Open it in a browser signed in to nothing |
