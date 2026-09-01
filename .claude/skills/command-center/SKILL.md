---
name: command-center
description: "Load when the owner wants ONE page that tells them how the whole portfolio is doing: what is empty, who is behind, what expires, what is broken, what needs them today. Covers what actually belongs on it and what does not, the two panels almost everyone gets wrong, building it as an Artifact rather than a website, keeping it honest when the underlying data is incomplete, and the routine that keeps it current. Trigger on 'command center', 'command centre', 'dashboard', 'my daily view', 'one page for everything', 'how is the portfolio doing', 'KPIs', 'occupancy', 'what needs my attention', or any request for a single overview of the business."
---

# Command Center

**Version: 1.0 - 2026-08-24**

The Command Center is one page the owner opens in the morning that tells them what today looks like.
It is the single most requested thing in this whole system, and the most commonly built badly.

**Build it as an Artifact.** Read `artifacts` before starting. Only reach for `website-building` if
one of the limits named there genuinely bites.

## The one rule that decides whether it gets used

**Every panel earns its place by changing what the owner does today. If it does not, it is a
decoration and it is costing you the page.**

This is not a style preference. A page with six panels gets read every morning. A page with fifteen
gets read twice and then never again, and once that happens it is very hard to win back. **Cut
ruthlessly, and add a panel only when the owner asks for it twice.**

The test to apply to each candidate panel: *if this number were bad, would they do something today?*
If the answer is no, it belongs in a monthly review, not here.

## What belongs on it

Roughly in the order it should appear.

- **What needs THEM.** Their own open tasks, most urgent first. This goes at the top, because it is
  the only panel that is about action rather than status.
- **Empty units.** How many, which ones, and available from when. This is the number that costs money
  every day it is wrong.
- **Money owed.** Who is behind, how much, how long. Names and amounts, not a total, because a total
  is not actionable.
- **Ending soon.** Leases expiring, and anyone who has given notice. Far enough ahead that something
  can be done about it.
- **Expiring soon.** Insurance, certificates, inspections, anything with a date that lapses. This is
  the panel that prevents the expensive surprise.
- **Open maintenance.** What is outstanding and how long it has been outstanding. Age matters more
  than count.

## The two panels almost everyone gets wrong

- **Occupancy.** Easy to compute and almost never actionable, because by the time it moves the owner
  already knew. **Show which units are empty, not the percentage.** A percentage is a monthly review
  number.
- **A tasks panel.** Tempting, and it usually duplicates the task list the owner already has open
  somewhere else. **Include it only if it shows something the task list does not**, such as their own
  items ranked across every workstream. Otherwise leave it off and link to the real list.

## Keeping it honest

**This is what separates a dashboard that is trusted from one that quietly does harm.**

- **A panel with no data must say so, in words, rather than rendering an encouraging zero.** "No
  renewal dates recorded for eighteen of nineteen properties" tells the owner to go and fill them in.
  A green "nothing expiring" built on the same missing data tells them everything is fine, and they
  will believe it.
- **Put the date and time the page was built on the page.** Always.
- **Never round away a discrepancy.** If two sources disagree, show both and say they disagree. The
  disagreement is the finding.
- **When a panel depends on a field the owner has not been filling in, say that on the panel**, not
  in a note somewhere. That is how the field gets filled in.

## Keeping it current

An Artifact does not refresh itself. **Rebuild it as part of a routine**, daily or weekly, whichever
matches how often the owner actually opens it. The routine reads the hub, regenerates the page, and
says what changed since last time.

**If it has been shared with anyone, rebuilding is only half the job.** The new version has to be
selected as the shared one by hand or everyone else keeps seeing the old page. This is the trap in
`artifacts`, and on a page that is rebuilt daily it bites daily. **On a page that changes this often,
the honest advice is to keep it to the owner rather than sharing it around.**

## Building it

1. **Ask what they look at first thing in the morning today**, and what they wish they could see
   without going and looking. Build that. Not a generic dashboard.
2. **Find out what data actually exists** before designing panels. A panel with no data behind it is
   the fastest way to lose the owner's trust in the whole page.
3. **Build the smallest version that is useful and show it.** Four panels. Let them ask for more.
4. **Make it work on a phone**, because that is where it will be opened.
5. **Put it on a routine** so it stays current without anyone remembering.

## Teaching it

This is a good thing to build with an owner rather than for them, once they already have their hub
populated and a routine or two running. It is visual, the payoff is immediate, and it is the moment
the data-entry work of the earlier weeks suddenly pays off.

The complementary skills, in the order they matter: `artifacts` first, because that is how it is
built. `website-building` only if the limits bite. `netlify` only if they choose to host it
themselves.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| The owner stopped opening it | Too many panels | Cut it to the four that change what they do today |
| It says everything is fine and it is not | A panel rendered a zero from missing data | Make panels say what they do not know |
| The numbers are stale | Nothing rebuilds it | Put the rebuild on a routine, and date the page |
| Somebody else sees an old version | The new version was not selected as the shared one | Select it, or stop sharing a page that changes daily |
| Two panels disagree | Two sources disagree, and one of them is wrong | Show both and say so. Do not average them |
| It looks impressive and nobody acts on it | It shows status rather than what needs doing | Put their own open items at the top |
