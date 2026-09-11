---
name: command-center
description: "Load when the owner wants ONE page that tells them how the whole portfolio is doing: what is empty, who is behind, what expires, what is broken, what needs them today. Covers what actually belongs on it and what does not, the two panels almost everyone gets wrong, building it as a private hosted web page on Cloudflare through the `command-center-builder` skill (never as an Artifact), synthesizing every connected tool instead of listing it, keeping it honest when the underlying data is incomplete, and the routine that keeps it current. Trigger on 'command center', 'command centre', 'dashboard', 'my daily view', 'one page for everything', 'how is the portfolio doing', 'KPIs', 'occupancy', 'what needs my attention', or any request for a single overview of the business."
---

# Command Center

**Version: 1.1 - 09-10-2026** (Stephanie, after the Week 4 dry run: this page is NEVER an Artifact.
1.0 said "build it as an Artifact" and on 09-10-2026 four students' assistants did exactly that,
which is why nobody got a real command center. It is a private website on Cloudflare that updates
itself, and `command-center-builder` is the skill that builds it. Also new: every connected tool is
synthesized, never listed.) (1.0 - 2026-08-24: first version.)

The Command Center is one page the owner opens in the morning that tells them what today looks like.
It is the single most requested thing in this whole system, and the most commonly built badly.

**⛔ It is a private, hosted website, NOT an Artifact. Build it with `command-center-builder`.**
When the owner says "build my command center", load `command-center-builder` and run it — that skill
carries the whole build: a web page on Cloudflare behind the owner's own login, the numbers refreshed
every two hours by a build script, the written briefing regenerated every morning by a scheduled
cloud routine. This skill is the thinking about WHAT belongs on the page; that one is HOW it gets
built. **Never build it as an Artifact, even as a preview, even if the owner has not finished the
Cloudflare pre-work** — an Artifact does not refresh, cannot be opened from a phone bookmark without
Claude, and has to be rebuilt by hand, which is the exact problem the page exists to remove. If the
pre-work is missing, `command-center-builder` says what to do; follow it.

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

## Every connected tool is synthesized, never listed

**A command center is not a to-do list (Stephanie, 09-10-2026).** For every tool the page reads —
calendar, Slack, email, and ANY other tool the owner has connected (a task manager, a CRM, a project
board) — the panel is a synthesis: what needs them today, what changed, what is stuck, what is
winning, in a few lines, each one a judgement. It never reproduces the tool's own list of records.
The owner already has the tool for that, and a page that repeats it gets closed within a week. Five
items or fewer per panel; if there are more, say how many and point at the tool.

**The one exception is a list the owner explicitly asks for** ("show me every lease expiring this
quarter"). Then give them the list. That call is theirs, never the assistant's default.

**Why it is written down:** on the Week 4 dry run one owner got every open Todoist item on her page
and another got every transaction her coordinators were handling, because the assistant only had
synthesis instructions for calendar, Slack and email and fell back to "here is everything, you
decide" for everything else.

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

The page refreshes itself; nobody rebuilds it by hand. The hard numbers are re-read from the
owner's database every two hours by a build script that runs in the cloud, and the written briefing
(calendar, Slack, email, other tools, the power move, the morning mindset) is regenerated at 5am
every day by a scheduled cloud routine the assistant creates as the last step of the build. The owner
can ask for a refresh any time ("refresh my command center") and gets to-the-minute data, but the
point is that they never need to. `command-center-builder` → Phase 5 has the routine.

**It is private by design.** Cloudflare Access puts the owner's own login in front of it, because the
page surfaces the most sensitive picture of the business there is. Keep it to the owner.

## Building it

1. **Ask what they look at first thing in the morning today**, and what they wish they could see
   without going and looking. Build that. Not a generic dashboard.
2. **Find out what data actually exists** before designing panels. A panel with no data behind it is
   the fastest way to lose the owner's trust in the whole page.
3. **Build the smallest version that is useful and show it.** Four panels. Let them ask for more.
4. **Make it work on a phone**, because that is where it will be opened.
5. **Let the build create the refresh and the morning routine** so it stays current without anyone
   remembering. `command-center-builder` does this as part of the build; it is not a separate task.

## Teaching it

This is a good thing to build with an owner rather than for them, once they already have their hub
populated and a routine or two running. It is visual, the payoff is immediate, and it is the moment
the data-entry work of the earlier weeks suddenly pays off.

The complementary skill is `command-center-builder`, which is how it is built: Cloudflare hosting,
the login gate, the two-hourly data refresh and the morning routine. Do not reach for `artifacts`,
`website-building` or `netlify` for this page; the builder already made those choices and explains
why in its architecture notes.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| The owner stopped opening it | Too many panels | Cut it to the four that change what they do today |
| It says everything is fine and it is not | A panel rendered a zero from missing data | Make panels say what they do not know |
| The numbers are stale | The cloud refresh or the morning routine stopped running | Check the refresh job and the routine's last run in `command-center-builder`, and date the page |
| It was built as an Artifact | The assistant skipped `command-center-builder` | Rebuild it with the builder on Cloudflare; an Artifact is never the answer |
| Every task from a connected tool is on the page | The panel listed instead of synthesized | Rewrite the panel as a synthesis, five items or fewer, per the rule above |
| Two panels disagree | Two sources disagree, and one of them is wrong | Show both and say so. Do not average them |
| It looks impressive and nobody acts on it | It shows status rather than what needs doing | Put their own open items at the top |
