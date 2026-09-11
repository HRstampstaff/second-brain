# Metrics — what each page tracks, and letting the student choose

The Command Center is not a report. Every panel on it is something the student decided was
worth seeing every morning. **Vera suggests; the student picks.** Do not install a default set
and move on — a dashboard full of numbers nobody chose is one they stop opening within a week.

## How to run the choice

This is question 2 of the ONE intake message (Phase 0b in SKILL.md, template in
`assets/intake-message.md`). It is asked once, for the ONE company being built today, with your
suggestions already filled in so "go" is a complete answer.

0. **Draw from TWO sources, not one (Stephanie, 09-09-2026).** Their Airtable schema tells you what
   can be fed today. **What you learned about their business in the warm-up tells you what is worth
   watching at all** — the five foundational skills from Week 1, their offers, how they actually
   make money. Many students have barely used Airtable, so a base-only reading would hand them a
   near-empty page and miss the numbers that run their week. **A metric that matters but has nothing
   feeding it yet is still worth suggesting**: it renders as a 🔒 naming what it needs, which is an
   honest shortlist rather than a gap. Never let their thin base shrink your suggestions to nothing.
1. **Offer a short menu for the sources they have connected** — from the catalog below, three
   to five per source, in plain words, not field names. "Rent you're owed right now," not
   `overdueBalance`.
2. **Ask them to pick the few that would change their day.** The useful question is not "what
   would you like to see?" (answer: everything) but **"if this number went the wrong way, would
   you do something about it today?"** If no, it's a report, not a dashboard metric.
3. **Cap it.** Four to six per company page is the working range. Past that the page becomes
   wallpaper and the important number stops standing out. If they want more, ask which one
   comes off.
4. **Record the choice** in `sources.json` under the company's `metrics` array (see
   `sources.template.json`). That file already lives outside `public/`, and keeping the display
   choice next to the source map means one place to look when a panel is wrong.
5. **Say what each pick depends on.** A metric whose source isn't wired yet renders 🔒 with the
   connection it needs — that's honest, and it gives Vera the follow-up list for later.

## The catalog — suggestions by source

Offer only from sources they've actually connected. These are starting points, not a fixed
list; a student's own idea beats anything here.

**Airtable (their hub)** — the shape depends on their base, so read their schema first and
translate these into what they actually track:
- Occupancy — units filled vs. empty, and the rate
- Money owed right now — arrears / overdue balances
- Monthly recurring revenue — the rent roll or equivalent
- Contracts ending soon — leases expiring in the next 30 / 60 / 90 days
- Open work — maintenance tickets or jobs not yet closed
- Today's commitments — tasks due or overdue
- Pipeline — applications, leads or deals in flight

**QuickBooks** (see `quickbooks.md` — optional, and check the books are current first):
- Money in and money out this month
- Net this month, and the month-by-month trend
- Largest expense category this month
- Cash on hand

**Gmail:**
- Waiting on a reply from them — unanswered mail addressed to them
- Oldest thing unanswered — the age, not the count
- A named queue — whatever label they already use to mean "deal with this"

**Calendar:**
- Today, in order
- The next seven days, condensed
- Anything unconfirmed

**Slack:**
- Mentions and DMs not yet answered
- Threads they're the blocker on
- A named channel's headline

**HQ level** (across companies — these are usually written, not counted):
- One pulse line per company
- The single highest-leverage action for the day
- A mindset or anchor line

## Rules that keep the page honest

- **Never show a metric nothing feeds.** An unwired source renders 🔒 naming what it needs —
  not a zero, not a dash. A confident `$0` is worse than an obvious gap, because a zero looks
  like an answer. This is the same failure the QuickBooks phase warns about at length.
- **A count needs a comparison to mean anything.** "11 open tickets" is a number; "11 open, 3
  more than last week" is a metric. Where the source can give a prior period cheaply, show it.
- **Prefer things they can act on today** over things that describe the past. Occupancy this
  morning beats occupancy last quarter.
- **Let them change it later.** Say explicitly, at handoff: "tell Vera to add or drop a metric
  and she'll edit the repo and push." The choice is not permanent and they should know it.
- **Revisit after a week.** Ask which panels they actually looked at. Drop the rest. This is the
  single highest-value follow-up in the whole build.
