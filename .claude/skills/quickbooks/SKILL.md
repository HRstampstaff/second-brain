---
name: quickbooks
description: "Load before ANY work touching QuickBooks: reading the profit and loss or any other report, looking up what was paid, drafting an invoice, a bill or an expense, or answering a question about the books. Covers connecting it to Claude and checking what the connection actually allows, the hard rule that the owner posts and you draft, how a property business should be tracked so the reports are worth reading, the bank feed trap that double counts money, and diagnosing a number that looks wrong. Trigger on 'QuickBooks', 'QBO', 'the books', 'my P&L', 'profit and loss', 'did they pay', 'send an invoice', 'log this expense', 'categorise this receipt', 'reconcile', or any question about income, expenses or what a property actually made."
---

# QuickBooks

**Version: 1.4 - 2026-09-07**

QuickBooks is where the money story of the business is written down. Everything else can be rebuilt.
This cannot, and it is what the owner's accountant, their lender and their tax filing all read.

**That fact sets the tone for the whole skill: be extremely willing to READ, and extremely reluctant
to WRITE.**

## Connecting it, and checking what you actually got

There is an official QuickBooks connector for Claude, and it is the way in. The owner turns it on the
same way they turned on the others: settings, connectors, find QuickBooks, connect, and sign in to
QuickBooks itself to authorise it. Once connected it is reachable from the desktop app, the web and
Claude Code alike. **⛔ "Connect" is the step that fails for some owners, so read the block below
before you tell anyone this is a few clicks.**

**⛔ Check availability before promising it.** The connector has not been available everywhere at
once, and owners outside the United States have hit a flat refusal to connect rather than a helpful
message. If it will not connect, that is worth checking before anyone spends an afternoon on it.

**⛔ SOME OWNERS CANNOT AUTHENTICATE IT AT ALL, AND THE FAILURE IS SPECIFIC. Match the symptom before
you say anything, because it works fine for plenty of people and telling a working owner it is broken
is its own damage.** The failing shape, seen 2026-09-07: they press Connect, it finishes in a second
or two, it reports itself connected, and **they are never sent to Intuit to sign in.** Every later
request then fails on authentication. If they DID reach an Intuit sign-in screen, this is not their
problem and the rest of this block does not apply.

- **It is not their machine and it is not a setting.** Disconnecting and reconnecting, restarting the
  app, signing out of QuickBooks first, a different browser and clearing cookies have all been tried
  by other owners and none of them fixes it. **A user filed it on `anthropics/claude-ai-mcp` as issue
  334, opened 2026-05-21**, labelled `auth`, `bug` and **`user-report`**. ⛔ **Nobody from Anthropic
  has responded, there is no assignee and no fix commitment**, so say "a reported bug", never
  "Anthropic has logged it", which implies an acknowledgment that does not exist.
- **The reported cause, and it is the reporter's reading rather than a vendor statement, so say it
  that way:** the connector is registered as not requiring authentication, because it also supports
  an owner with no subscription who just pastes their numbers in. That flag short-circuits the sign-in
  step for everyone, including the owners who do hold a subscription and need live data.
- **What to do meanwhile: export the report out of QuickBooks and hand over the file.** A CSV of the
  profit and loss, or whichever report the question actually needs, answers nearly everything this
  skill is for. Reading is where the value was anyway, and writing was never allowed unattended.
- **Rule out the two dead ends first**, because both look identical from the owner's chair: it is
  **QuickBooks Online only** (an installed QuickBooks Desktop company file will never connect, and
  "my QuickBooks file" is the phrase that gives it away), and it is **US only**.
- **The other route in is a developer app plus the Intuit API, and it does work.** It is what an owner
  needs anyway the moment an automation has to reach the books with nobody present. Be straight about
  the price: **roughly two hours of forms, then several days waiting on Intuit's review**, plus a
  published privacy policy and terms page, plus several steps only they can do. **Only worth it if the
  automations it unlocks save them many hours every month, every month.** If they just want to read
  reports and draft entries, this connector is the right tool and that road is a waste of their
  afternoon. Load `connect-quickbooks-to-n8n` before saying another word about it.
- **⭐ It is NOT broken for everyone, and that matters when you answer someone.** A reference build on
  2026-09-04 connected it normally and read a full profit and loss out of it. So the honest line is
  "this specific failure is a known bug", never "the connector does not work".
- **⏰ Re-check before repeating this, and do NOT tell anyone a fix is coming.** The report has sat
  with no vendor reply since 2026-05-21, which is evidence against a quick fix rather than for one.
  Try one connect yourself before quoting any of this; if the sign-in screen now appears, delete this
  block and date the correction.

## Two things that bite AFTER it connects, and both look like your mistake

**⛔ `profile_info_required`: the connector refuses to answer until the QuickBooks profile has an
industry set (measured 2026-09-04).** It reads as a permissions or a connection failure and is
neither. Fixing it WRITES to the owner's QuickBooks account, so **ask them first and let them choose
the value.** Intuit's suggested list is short and often misses the real business: it offered
brokerage, lending and a catch-all to a residential landlord, whose actual code is NAICS 531110,
"Lessors of Residential Buildings and Dwellings". **Pick the accurate code rather than the closest one
offered, and tell them what you set.**

**⛔⛔ THE CONNECTOR'S OWN TOTALS ARE WRONG. READ THE NAMED ROWS, NEVER THE COMPUTED FIELDS (measured
2026-09-04 on a real company).** Account-level detail comes back correct and the rollups on top of it
do not. What was actually seen: top-level `totalExpenses` returned **exactly `0`** for a period
holding six figures of real expenses; a month's `totalIncome` came back **roughly two orders of
magnitude below** that same month's own rental-income account row; `grossProfit` and `netIncome`
inherit the error because they are derived from those. The balance sheet and the profit and loss
**reported different net income for the same books over the same period**, which is the cheapest
single check that something is wrong.

- **Read instead, inside `monthlyBreakdown["<start> - <end>"]`:** money in is
  `incomeAccountsAggregated["Income"]`, cost of goods sold is
  `cogsAccountsAggregated["Cost of Goods Sold"]`, operating expenses is
  `expenseAccountsAggregated["Expenses"]`, and money out is the last two added together.
- **⛔ Never SUM those maps.** They flatten parent rows, "Total for X" subtotal rows and detail rows
  into one object, so adding them up double counts. **Copy the named value. Do not compute it.**
- The profit and loss response runs past 60,000 characters, so save it and pull the fields you need
  rather than reading the whole thing.

## ⛔ Before you believe any QuickBooks number: check the books are current

**Run the profit and loss and look at the last three months before you report anything off it.** A
report only ever shows POSTED transactions. Money the bank has downloaded but nobody has accepted and
categorised yet sits in the **For Review** queue: it is inside QuickBooks, it has not hit an account,
and it is invisible to every report. Money collected in a rent platform and never pushed across is
invisible too. **The connector cannot see the For Review queue at all**, so that check happens on
QuickBooks' own Banking screen, by the owner.

This is not hypothetical. On a real portfolio that was fully occupied and collecting rent every
month, the profit and loss showed a normal, steady income figure through the first months of the year
and then **exactly zero for each of the three most recent months**, because months of income had
never been categorised. Reported without the check, that is a confident and completely wrong number,
and the zero reads like a real business result rather than a gap.

**Two diagnostics that narrow it without leaving the connector:** accounts receivable aging empty AND
income zero means they are not invoicing in QuickBooks at all, so income can only be arriving through
categorised bank deposits and the deposits are what stalled. A coherent balance sheet, with deposit
liabilities matching deposit bank balances and loan balances current, means the books are not
abandoned and it is income categorisation specifically.

**Say it plainly and stop.** Fixing the books is the owner's job and it comes first. Do not build on
top of the gap and do not quietly render the zero.

**⭐ On the first session, ask it what it can do rather than assuming.** This connector is new and
what it exposes has been changing. Read a small report and learn it that way. **⛔ Do NOT probe its
write side by writing to the owner's real books**, not even a small one: the rule below is that they
post and you draft, and a test entry is still an entry on a real ledger. If you need to know whether
a write is supported, ask the connector what tools it has. **Then write what you learned into this file with the date**, because the next session
should not have to discover it again. Do not tell the owner a capability exists until you have seen
it work.

Their QuickBooks data is not used to train the model. Worth saying plainly, because owners ask.

## ⛔ The rule that matters more than everything else: you draft, they post

**Never post anything to the books unattended.** Not an invoice, not a bill, not an expense, not a
categorisation, not a reconciliation. Prepare it, show it, let them press the button.

This is stricter than the rule elsewhere in this system, and deliberately so:

- A wrong entry does not just look wrong, it changes what the business appears to have earned.
- It flows into a tax return and a lender's view of the business.
- It is often discovered months later by an accountant, at which point nobody remembers why.
- And an entry that is merely in the wrong place still balances, so nothing looks broken.

**Reading is different and you should do plenty of it.** Pull the reports, answer the questions, spot
the thing that looks odd. That is where the value is anyway.

If the owner ever says "just post it, you do not need to ask me", the answer is that you will prepare
everything so it is one click, and the click stays theirs.

## Get the shape right or the reports are worthless

A property business has one question the books must answer: **which property made or lost money.**
QuickBooks does not answer that by itself, so this has to be set up deliberately, and it is the single
thing most worth getting right at the start.

- **Every transaction needs to carry which property it belongs to**, through whichever grouping
  feature their QuickBooks plan offers for that. Without it there is one big pile and no report can
  split it.
- **A tenant paying rent and a contractor being paid are different kinds of relationship.** One is who
  money comes from, the other is who it goes to. Set them up as the right kind or reports about either
  will be wrong.
- **Money owed and money received are different events.** Recording an amount as due, and recording it
  as arrived, are two separate things. Collapsing them loses the ability to see who is behind.
- **Money spent has the same split**, between a bill that is owed and a payment that has gone out.
- **The account each transaction is filed under is the whole game.** A repair filed as an improvement,
  or an owner's own money filed as income, produces a report that is confidently wrong. **When the
  right account is not obvious, that is an accountant question, not a guess.** Say so and stop.

**⛔ Do not answer tax questions and do not decide accounting treatment.** What counts as a repair
versus an improvement, what is deductible, how something should be classified: these depend on rules
that vary and change, and getting them wrong is expensive. Lay out the facts, name the choice, and
send it to their accountant.

## ⛔ The bank feed trap, and it double counts real money

QuickBooks pulls transactions in from the bank by itself. **So a transaction typed in by hand and the
same transaction arriving from the bank become two records of one payment.** The books then show
twice the expense, or twice the income, and it balances perfectly while being wrong.

**Before creating anything, check whether the bank feed is going to bring it in on its own.** In most
cases the correct action is not to create a transaction at all, but to match the one the feed already
brought, or to categorise it. Creating is for things the bank will never see.

**Never touch a period that has been reconciled or closed.** Reconciliation is the owner and their
accountant agreeing that a stretch of time is finished and correct. Changing something inside it
silently breaks that agreement, and it is found much later by someone who has to redo the work.

## Reading the books well

- **Profit and loss** is what happened over a stretch of time. **The balance sheet** is what is owned
  and owed at a single moment. **Cash flow** is what actually moved. They disagree with each other on
  purpose, and an owner asking "why does my profit not match my bank account" is usually asking about
  that difference.
- **Cash basis and accrual basis give different answers from the same data.** Say which one a number
  came from whenever it could matter, because the same report on the other basis is also correct and
  says something else.
- **Always name the date range and the basis with any figure you report.** A number without them is
  not checkable, and an unfalsifiable number is worse than no number.
- **When something looks wrong, look at the account it landed in first.** Miscategorisation explains
  far more surprises than missing data does.

## Where it fits with the rest of the system

The hub holds the operation: the properties, the tenants, the leases, who owes what and when. The
books hold the money as an accountant reads it. **They are not copies of each other and neither is the
backup for the other.** Where they overlap, decide once which one is the source and keep it that way,
or two answers to the same question start circulating and nobody knows which to trust.

Receipts, statements and anything signed live in their document storage, filed and named, with the
books holding the entry. See `google-drive` and `file-namer`.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| The connector will not connect at all | Not available for that country or that account yet | Check availability before spending more time. It is not a settings problem you can solve |
| An amount appears twice | It was entered by hand and also arrived from the bank | Match or categorise what the feed brings. Create only what the bank will never see |
| Profit does not match the bank balance | Profit and cash are different questions | Show the profit and loss and the cash flow side by side and explain the difference |
| The same report gives two different totals | One is cash basis, one is accrual | State the basis with every figure |
| A property looks unprofitable and the owner disagrees | Transactions are not tagged to that property, so its costs and income are landing in the wrong place | Check the grouping is applied consistently before believing the report |
| An old figure changed by itself | Something inside a reconciled period was edited | Stop. This is an accountant conversation, not a fix |
| You cannot tell which account something belongs in | It is a judgement call, not a lookup | Lay out the facts and send it to their accountant. Never guess |
