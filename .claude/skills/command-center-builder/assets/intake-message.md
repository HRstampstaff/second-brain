# The intake message — the ONE message Vera sends before building

Phase 0b. This is the only stop in the whole build. Send it once, get one reply, then build with
no further questions. Four questions, or three if they have one business. Fill in your recommendation on every line so "go" is a complete answer.

**Where the content comes from:** the warm-up (Phase 0a). Question 1 from their company list,
question 2 from their Airtable tables AND what you learned about their business, question 3 from
the books check, question 4 from the account names you listed in the warm-up. If you find yourself asking for something the warm-up should have found, you
skipped the warm-up.

---

## The shape

> Before I build, three things. My pick is on each, so reply "go" to take them all, or tell me what
> to change.
>
> **1. Which business first.** *(omit entirely if they have one)*
> You have [A], [B] and [C]. I will make a tab for each and fully build **[A]** today, because
> [one honest reason: most data, the one paying the bills, the one they mentioned first]. [B] and
> [C] get placeholders and we fill them in later sessions, one each. Want a different one first?
>
> **2. Which numbers on [A]'s page.**
> I suggest [four to six], because each is one you would do something about TODAY if it moved the
> wrong way: [name each with a half-line of why]. [If one has nothing feeding it: "[X] matters to
> your business but nothing feeds it yet, so it will show a padlock naming what it needs — that is
> your to-do list rather than a gap."] Swap any?
>
> **3. Money in and out.**
> [Books current] Your books look current, income posts through [month], so money in and out will
> be accurate. Want it on the page?
> [Books behind] Your books show no income since [month], which usually means deposits are sitting
> uncategorized. A money panel would read zero and be wrong, so I would leave it off until that is
> caught up. Agree?
> [Not connected] QuickBooks is not connected, so money is off for now. Connect it any time and I
> will add it.
>
> **4. Which account feeds which business.**
> Here is how I would route what you have connected. Correct anything wrong:
> - [business] ← [dedicated inbox], plus [catch-all inbox] filtered to [business]
> - [business] ← [Slack workspace], [calendar events about X, Y, Z]
> - [business] ← QuickBooks
> [Name anything connected that you could not place, and anything not connected that will show a
> padlock until they connect it.]
>
> Colours: [using your brand from Week 1 / using The Lean Landlord palette]. Say "change the
> colours" any time later.

## How the routing actually works — the part to get right

**Everything comes through connectors.** The same Claude connections they already set up. Nothing
is coded, and nothing new is authorised during the build. A service they have not connected is a
🔒 placeholder naming it, and it fills the first morning after they connect it (and after you add
it to the routine's `mcp_connections` — see `references/routine.md`).

| Source | The normal shape | What you can guess | What you must ask |
|---|---|---|---|
| **Gmail** | Often TWO per business: a dedicated inbox on that business's domain, plus a catch-all personal inbox that gets mail about everything | The domain. `tessa@acmerentals.com` is obviously the rentals business | Which inbox is the catch-all, and whether a dedicated inbox is really single-business |
| **Slack** | Usually one workspace per business; sometimes one workspace with a channel per business | **Nothing. Never guess from the name** — on the reference build a workspace called "the-lean-landlord" held a different company's channels entirely | Which workspace (or which channels) belongs to which business |
| **Calendar** | Usually ONE calendar holding everything | That it is a catch-all, if there is only one | Two or three keyword hints per business so events sort correctly |
| **QuickBooks** | One company file | Nothing | Which single business page the money belongs on |

**The catch-all pattern is the one students find surprising, so say it plainly.** A shared personal
inbox is listed once for EVERY business, each time with its own filter, so the same address
appears several times in the map and that is correct, not a mistake. Each business page then shows
only the mail that belongs to it. Filtering is belt and braces: a Gmail label per business catches
the predictable senders, and anything unlabelled gets read and assigned by content, so nothing
slips through while their label rules are still young.

**The calendar works the same way by content alone**, since a calendar event cannot carry a Gmail
label. Each event is read and assigned to a business, which is why the keyword hints matter: a
showing or a lease signing is the rental business, a cohort call is the teaching business.

Full schema and the advanced paths (a second Slack workspace by API token, a self-hosted mail
server) are in `references/source-map.md`. Neither is a day-one concern.

## Worked example (a landlord with a busy base)

> Before I build, three things. My pick is on each, so reply "go" to take them all, or tell me what
> to change.
>
> **1. Which business first.** You have the rentals and the coaching side. I will make a tab for
> each and fully build **the rentals** today, since that is where your Airtable actually lives. The
> coaching tab gets placeholders and we fill it next session. Want it the other way round?
>
> **2. Which numbers on the rentals page.** I suggest four: units filled, rent owed right now,
> leases ending in the next 60 days, and open maintenance. Each one you would act on the same day
> it moved. Your Applications table is empty, so I have left applications out for now. Swap any?
>
> **3. Money in and out.** Your books look current, income posts through August, so money in and
> out will be accurate. Want it on the page?
>
> **4. Which account feeds which business.** Here is how I would route what you have connected:
> - Rentals ← tessa@acmerentals.com, plus your personal Gmail filtered to rental mail, plus the
>   "acme-ops" Slack workspace, plus calendar events about showings, leases, inspections and repairs
> - Coaching ← your personal Gmail filtered to coaching mail, plus calendar events about cohorts,
>   office hours and content
> - Rentals ← QuickBooks (it is one company file, so the money lands on the rentals page)
> Your personal inbox appears on both on purpose: it gets mail about everything, so each page sees
> only its own. Correct anything wrong.
>
> Colours: using The Lean Landlord palette. Say "change the colours" any time later.

## Worked example (a coach with almost nothing in Airtable)

> Before I build, three things. My pick is on each, so reply "go" to take them all, or tell me what
> to change.
>
> **1.** One business, so nothing to choose here — the whole page is yours.
>
> **2. Which numbers.** Your base only has a Contacts table with real rows, so I suggest starting
> with two live numbers and three placeholders that matter to how you actually earn: people in the
> pipeline (live, from Contacts), sessions booked this week (live, from your calendar), then
> revenue this month, spots left in the cohort, and unanswered enquiries — those three show a
> padlock naming what each needs, so you can see the shortlist rather than a blank page. Swap any?
>
> **3. Money in and out.** QuickBooks is not connected, so money is off for now. Connect it any
> time and I will add it.
>
> **4. Which account feeds which business.** One business, so everything routes to the one page:
> your Gmail, your calendar, and your Slack. Nothing to sort. Correct me if any of those is
> actually somebody else's or shared.
>
> Colours: using your brand from Week 1. Say "change the colours" any time later.

## Rules

- **One message, one reply, then build.** Two of three answered means you take your pick on the
  third, say which you took, and start.
- **A question back gets a one-line answer**, then re-ask only what is outstanding. Never a third
  round; a third round means you are designing, not building.
- **Anything else raised mid-build:** "noted, we will do that once it is live."
- **Four to six numbers.** A seventh means asking which one comes off.
- **Never re-open a settled choice**, and never ask about anything in Phase 0c (page shape, HQ
  name, colours, hosting). Those are decided by rule.
