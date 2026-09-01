---
name: website-building
description: "Load when an Artifact is genuinely not enough and the owner needs a real site: a page at their own address, a form that captures what people type, a dashboard that is always current without anyone regenerating it, or anything needing a secret to reach its data. Covers the test for whether they have actually outgrown an Artifact, what a small static site really is, forms, the pattern that keeps a key off the page, unguessable addresses as access control, and the ongoing cost nobody mentions at the start. Trigger on 'a website', 'a real site', 'my own domain', 'a public page', 'an application form', 'a live dashboard', 'people need to submit something', or any request an Artifact cannot carry."
---

# Website Building

**Version: 1.0 - 2026-08-24**

This is the step past an Artifact, and it should feel like a step. Read `artifacts` first. **Most
requests that sound like a website are an Artifact**, and building the site instead costs an
afternoon at the start and a small tax forever.

## The test for whether they have actually outgrown an Artifact

Build a site only when one of these is true. If none is, build the Artifact.

- **It must always show current data**, without anybody regenerating it.
- **Somebody other than the owner has to put information IN**, and it has to be kept. A form.
- **Reaching the data needs a secret**, and a secret can never go on a page.
- **It has to live at the owner's own address**, because tenants or applicants will see it.
- **It changes constantly and several people hold the link**, so re-sharing the newest version
  becomes a weekly irritation.

**Wanting it to look more professional is not on the list.** An Artifact can look professional.

## What a small site actually is

Three files and no more, unless something forces otherwise: the page, its styling, and whatever makes
it move. Written by hand, uploaded, done. **No framework, no build step, no package manager.**

This matters because the ongoing cost of a site is almost entirely maintenance, and every layer added
at the start is a thing that breaks later without being touched. **A hand-written page still works in
three years. A project with a build step usually does not.**

Where it is hosted is a separate question and a smaller one. `netlify` covers the one we use.

## Forms, which is the most common real reason to build one

A form is the honest reason most owners need a site: an application, an enquiry, a maintenance
request. Something typed by somebody who is not the owner and kept.

- **The submission has to land somewhere the owner will actually see**, which in practice means an
  email as well as wherever it is stored. A form that files silently gets missed.
- **Assume it will be spammed.** A public form always is.
- **Ask for the least you need.** Every field is somebody deciding whether to bother. This is the
  difference between an application form that gets finished and one that gets abandoned.
- **Anything personal that a form collects is now the owner's responsibility.** Do not collect what
  is not needed, and never collect anything financial or identifying through a form built this way.
  Those belong on a platform built for it.
- **Say what happens next on the confirmation.** "We will come back to you" prevents most of the
  follow-up emails.

## Keeping a secret off the page

**Anything on a page is readable by anyone who opens it.** Not hidden, not obscured, readable. So a
key that reaches the owner's data can never be written into the page, however clever the hiding.

**The pattern that works: the page asks a small piece of code sitting with the host, and that code
holds the key and does the fetching.** The key lives in the host's settings, never in the files, and
never in anything the owner might later put in version control.

Two things about it that catch people:

- **After changing a stored setting the site has to be published again** before the change takes
  effect. This produces a very confusing few minutes where the correct value is saved and the old one
  is still being used.
- **The small piece of code should return only what the page needs**, not everything it can reach. If
  it hands back the whole table, the whole table is public.

## Who can see it

For an internal dashboard, a long unguessable address is usually the right answer: no login to build,
no password for the owner to lose, and nothing linked to it from anywhere. **It is genuinely private
until somebody forwards the link**, and that is the whole model. Say that out loud to the owner
rather than letting them assume there is a login.

**Anything that would matter if a stranger read it does not go behind an unguessable address.** That
needs a real login, and a real login is a much bigger project than this skill covers. At that point
the honest answer is usually that the data belongs in the hub, where permissions already exist, and
the site should show less.

## The cost nobody mentions at the start

A site is not finished when it is published.

- **A domain has to be renewed**, and a lapsed one takes the site down completely.
- **Certificates and hosting settings drift**, particularly after a domain change.
- **The thing it reads changes.** A renamed column silently empties a panel.
- **Whoever built it is the only one who knows how**, unless it is written down.

**So write down, in the owner's own repository: where it is hosted, what it reads, what settings it
needs, and how to publish a change.** Without that the site becomes unmaintainable the moment the
person who built it moves on, and it will be quietly abandoned rather than fixed.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| The site shows nothing | What it reads was renamed or moved | Check the source before touching the page |
| A setting was changed and nothing happened | The site was not published again afterwards | Publish it again |
| The whole site is down | The domain lapsed, or the certificate did | Check renewal before debugging anything |
| Form submissions are being missed | They file silently with no notification | Send an email on every submission as well |
| The form is full of spam | It is public, so it always will be | Add the host's own protection, do not hand-roll one |
| It works for the owner and not for anyone else | Something depends on being signed in somewhere | Open it in a browser that is signed in to nothing |
| Nobody can change it but the person who built it | It was never written down | Write it into the owner's repository now |
