---
name: quickbooks
description: "Load before ANY work touching QuickBooks: reading the profit and loss or any other report, looking up what was paid, drafting an invoice, a bill or an expense, or answering a question about the books. Covers connecting it to Claude and checking what the connection actually allows, the hard rule that the owner posts and you draft, how a property business should be tracked so the reports are worth reading, the bank feed trap that double counts money, and diagnosing a number that looks wrong. Trigger on 'QuickBooks', 'QBO', 'the books', 'my P&L', 'profit and loss', 'did they pay', 'send an invoice', 'log this expense', 'categorise this receipt', 'reconcile', or any question about income, expenses or what a property actually made."
---

# QuickBooks

**Version: 1.0 - 2026-08-24**

QuickBooks is where the money story of the business is written down. Everything else can be rebuilt.
This cannot, and it is what the owner's accountant, their lender and their tax filing all read.

**That fact sets the tone for the whole skill: be extremely willing to READ, and extremely reluctant
to WRITE.**

## Connecting it, and checking what you actually got

There is an official QuickBooks connector for Claude, and it is the way in. The owner turns it on the
same way they turned on the others: settings, connectors, find QuickBooks, connect, and sign in to
QuickBooks itself to authorise it. It works from the desktop app, the web, and Claude Code.

**⛔ Check availability before promising it.** The connector has not been available everywhere at
once, and owners outside the United States have hit a flat refusal to connect rather than a helpful
message. If it will not connect, that is worth checking before anyone spends an afternoon on it.

**⭐ On the first session, ask it what it can do rather than assuming.** This connector is new and
what it exposes has been changing. Read a small report, then try the smallest possible write, and
find out. **Then write what you learned into this file with the date**, because the next session
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
