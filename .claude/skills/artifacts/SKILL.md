---
name: artifacts
description: "Load before building anything the owner wants to LOOK at rather than read: a dashboard, a tracker, a calculator, a one-page summary, a checklist they tick, a chart. Artifacts are the cheap way to give somebody a real page without hosting anything. Covers what an Artifact is and what it is not, why it is the default over building a website, the sharing model, the version trap that catches everyone the first time, what data an Artifact can and cannot reach, and the point at which the answer stops being an Artifact and becomes a real site. Trigger on 'artifact', 'dashboard', 'make me a page', 'a tracker', 'a calculator', 'show me this visually', 'a chart', 'something I can look at every morning', or any request for a visual tool rather than an answer in the chat."
---

# Artifacts

**Version: 1.0 - 2026-08-24**

An Artifact is a real page that Claude builds and publishes for the owner in one step. No hosting, no
account, no deploy, no domain. It gets a link, and it works.

**This is the default answer whenever somebody wants something visual.** Not a website. Not a
spreadsheet pretending to be a dashboard. The bar for reaching past an Artifact is high, and this
skill says where it is.

## Why this is the default

The honest comparison, because owners ask why we are not building a "proper" site:

- **Setup is minutes rather than an afternoon.** There is nothing to sign up for and nothing to
  configure. Most owners never get past the setup step on the alternatives, so the alternative
  usually means no dashboard at all.
- **Nothing to maintain.** No hosting to pay for, no certificate to renew, no build that starts
  failing six months later.
- **Changing it is a sentence.** The owner says what is wrong and it is rebuilt in front of them.
  That is the real advantage: they will actually ask for the third and fourth change, which is where
  a dashboard becomes good.

**The trade is capability.** An Artifact is more limited than a site. When the limit genuinely bites,
go and read `website-building`. Until then, this.

## What an Artifact is good at

- **Showing a state at a glance.** Occupancy, who is behind, what expires soon, what is empty.
- **Working something out.** A part month, a split, a deposit, a yield. A page where numbers are typed
  in and the answer appears beats a formula nobody can check.
- **A page somebody works through.** A move-in checklist, a viewing form, a turnover list.
- **A document that should look like a document.** A one-page summary, a report, a property sheet.

## What it is not

- **It is not a database.** Anything typed into an Artifact is not automatically kept anywhere.
- **It is not automatically live.** By default the numbers in it are the numbers that were true when
  it was built. A dashboard that silently shows last week's figures is worse than no dashboard, so
  **either wire it to real data properly, or put the date it was built on the page in plain sight.**
- **It is not private by accident.** It starts private, and it stays that way until the owner shares
  it. But once shared, the link is the security. Anyone holding it can open it.

**Because the link is the security: never put anything on a shared Artifact that would matter if a
stranger read it.** Tenant contact details, anything financial about a named person, anything from a
lease. A dashboard of counts and dates is fine. A list of people and what they owe is not, unless the
owner has decided who it goes to and knows the link travels.

## The version trap, and it catches everybody once

**When an Artifact is updated, the people it was shared with do not automatically see the new one.**
The shared link keeps showing the version that was shared. Making the change is only half the job:
**the new version has to be selected and shared as the current one, by hand, every time.**

This produces the most confusing failure in this whole skill, because nothing is broken:

- The owner asks for a fix. It gets made. They look at their own screen and see it.
- Whoever they sent the link to still sees the old page, sometimes for weeks.
- Both people are looking at a real, working page, and they disagree about what it says.

**So, every time an Artifact that has been shared gets changed:**

1. Make the change.
2. **Select the new version as the shared one.** This is the step everyone forgets.
3. **Say to the owner, out loud, that the people holding the link now see the new one.** Do not leave
   it implied.

**If a page is going to change often, that is an argument against sharing it widely at all.** Keep it
to the owner, or accept that a real site handles this better and read `website-building`.

## Getting data into one

Three levels, and pick the lowest one that does the job.

- **Typed in when it is built.** The numbers are read out of the hub and written into the page. Fine
  for anything reviewed rather than watched, as long as the date is on the page.
- **Rebuilt on a routine.** The page is regenerated as part of a daily or weekly pass, which is
  usually what "live" really means to an owner. Cheap, and honest, because the page can say when it
  was last refreshed.
- **Reading data by itself.** A page that fetches current figures every time it is opened. This is
  where an Artifact starts to be as much work as a site, and it is the point at which to check
  whether the owner actually needs it.

**Never put a key, a token or a password into a page.** Anything on the page is readable by anyone
who opens it, however it is written. If reaching the data needs a secret, the secret does not go in
the page, and that constraint alone is often what pushes a project to a real site.

## Building one well

- **One question per page.** The most common failure is putting everything on it. A page answering
  one question gets looked at every day. A page answering nine gets looked at once.
- **Lead with the thing that needs action.** What is overdue, what is empty, what expires this month.
  Not a decorative summary.
- **Say when the data is from.** Every single time.
- **Say when a section has no data rather than showing a reassuring zero.** "No insurance dates
  recorded for eighteen of nineteen properties" is useful. A green tick built on missing data is a
  lie the owner will act on.
- **It has to work on a phone**, because that is where it will be opened.

## When to stop and build a site instead

Go and read `website-building` when any of these is true:

- It must always show current data without anyone regenerating it.
- Somebody other than the owner needs to put information INTO it and have that kept.
- It needs a secret to reach the data.
- It is public-facing, for tenants or applicants, at the owner's own address.
- It changes constantly and is shared with several people, so the version step becomes a weekly
  irritation.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| The owner sees the fix and somebody else does not | The new version was never selected as the shared one | Select it. Then say so out loud |
| The numbers are stale | It was built once and nothing refreshes it | Rebuild it on a routine, and put the date on the page |
| It shows all clear and the owner knows that is wrong | The underlying data is missing, and the page rendered zero as good news | Make the page say what it does not know |
| Nobody looks at it | It answers too many questions at once | Cut it to one. Build a second page if there is a second question |
| It cannot reach the data | It needs a secret, and a secret cannot go in a page | This is the moment to read `website-building` |
| The owner is nervous about who can see it | The link is the security, and links travel | Take anything about a named person off it |
