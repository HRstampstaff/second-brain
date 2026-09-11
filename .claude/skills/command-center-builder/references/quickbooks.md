# QuickBooks — the optional "money in / money out" source

**This is an OPTIONAL source. Do not build it unless the student asks for money on the
page.** Everything else in the Command Center describes work; this describes cash. Offer it
when a student says they want to see income and expenses, a monthly money view, or "how the
business is actually doing" alongside the operational panels.

It adds, to one company page:
- **Money in** and **money out** for the current month, plus a month-by-month trend.
- Optionally a single money line in that company's HQ pulse card.

---

## ⛔ Before you build anything: check the books are current

**Run the P&L first and look at the last three months.** If income or expenses are flat zero
in recent months while the business is obviously trading, the books are behind — and a money
panel will display a confident, wrong number on the student's home page every morning.

This is not hypothetical. On the reference build the P&L showed rental income of $33k, $36k,
$36k, $30k for Jan–Apr, then **$0 for June, July and August** while the portfolio sat at 100%
occupancy with a $40k/month rent roll. Roughly four months of income had never been
categorized. Had the panel shipped, the HQ page would have read "money in: $0" — faithful to
QuickBooks, and completely wrong about the business.

**A QBO report only ever shows POSTED transactions.** Money that the bank has downloaded into
QuickBooks but that nobody has accepted and categorized yet sits in the **"For Review"**
queue: it is inside QuickBooks, but it has not hit an account, so it is invisible to the P&L,
the balance sheet, and every report the connector can read. Money collected in a rent
platform (TurboTenant, Buildium, Stessa) that is never pushed to QBO is invisible too.

**The connector cannot see the For Review queue** — it exposes no tool for it. That check
happens on QBO's own Banking screen, by the student.

So the order is: **run the P&L → eyeball the recent months → if there's a gap, say so plainly
and stop.** Fixing the books is the student's job and it comes first. Offer to look at the
Banking screen with them; do not build a panel on top of a gap, and do not quietly render the
zero.

Two quick diagnostics that narrow the cause without leaving the connector:
- **A/R aging empty + income zero** → they aren't invoicing in QBO at all; income can only be
  arriving by categorizing bank deposits, so the deposits are the thing that stalled.
- **Balance sheet still coherent** (deposit liabilities matching deposit bank balances, loan
  balances current) → the books aren't abandoned, it's income categorization specifically.

---

## Why the connector, and not the API

Use the **QuickBooks MCP connector** on the morning routine. Do not send a student down the
Intuit REST API route.

The API is genuinely better data (QBO's own nested report rows, correct subtotals, and it can
run in the 2-hourly baker instead of once a morning). It is also gated behind an Intuit
developer app, production-key unlock, and a **compliance questionnaire that Intuit reviews
over several days** — required even for a private, single-company, internal integration.
There is no lighter tier. On the reference build that took months of false starts. No student
is going to do it, and a skill that requires it is a skill nobody finishes.

The connector is a few clicks, and money in/out is a monthly figure — a once-a-morning refresh
is entirely adequate for a number that only moves when transactions post.

If a student *already* has a working QBO API credential (say, in an automation platform), the
baker route is strictly better and you can wire `data.json` instead. That is the exception,
not the path.

---

## Wiring it

1. **Student connects QuickBooks** in their claude.ai connector settings, and authorizes it
   against the right company. Their click, their login — you never touch the credential.
2. **Add the connector to the morning routine's `mcp_connections`**, alongside Calendar /
   Slack / Airtable. See `routine.md`. No routine secret is needed — the connector carries
   its own auth.
3. **The connector may refuse until the QBO profile has an `industry` set**, returning
   `profile_info_required`. Setting it writes to the student's QuickBooks account, so **ask
   before doing it** and let them confirm the value. The suggested-industry list is short and
   often misses the real business (it offered brokerage, lending and a catch-all to a
   residential landlord, whose actual NAICS is 531110 "Lessors of Residential Buildings and
   Dwellings"); pick the accurate code rather than the closest offered option, and tell them
   what you set.
4. **Add the source to `sources.json`** under `accounting` (see `sources.template.json`), so
   the routine knows which company page the money belongs to.

---

## ⚠️ Reading the numbers: the connector's totals are WRONG

This is the trap. The connector returns **correct account-level detail with broken rollups**.

Do **not** use its computed fields:
- top-level `totalExpenses` came back `0` for a period with ~$170k of real expenses;
- per-month `totalIncome` came back `582.49` for a month whose own `incomeAccounts` showed
  `1 - Rental Income = 33004.04`;
- `grossProfit` and `netIncome` are derived from those, so they inherit the error;
- cross-check: the **balance sheet** reported net income `-15,516.52` while the **P&L**
  reported `-33,966.38` for the same books over the same period.

**Do** read the named rollup rows inside `monthlyBreakdown["<start> - <end>"]`:

| Value | Where it lives |
|---|---|
| money in | `incomeAccountsAggregated["Income"]` |
| cost of goods sold | `cogsAccountsAggregated["Cost of Goods Sold"]` |
| operating expenses | `expenseAccountsAggregated["Expenses"]` |

`money out = COGS + operating expenses`.

**Never sum those maps.** They flatten parent rows, `"Total for X"` subtotal rows, and detail
rows into a single object, so naive addition double-counts. **Copy the named value; do not
compute it.** That discipline also keeps an LLM out of the arithmetic — the routine transcribes
three numbers per month rather than adding up a ledger, which is the difference between a
figure that's reproducible and one that drifts.

The P&L response is large (60k+ characters). Have the routine save it and pull only the fields
it needs rather than reading the whole payload.

---

## The `personal.json` shape

The routine writes, under the owning company:

```json
"money": {
  "currency": "USD",
  "asOf": "2026-09-04",
  "months": [
    { "m": "2026-07", "in": 0, "out": 24664.22 },
    { "m": "2026-08", "in": 0, "out": 22449.70 }
  ],
  "note": "optional one-line caveat, e.g. books behind since May"
}
```

If the connector is missing or the student hasn't wired it, emit the standard pending object
so the panel renders 🔒 with the reason, exactly like the other sources:

```json
"money": { "pending": true, "note": "Connect QuickBooks to the routine to show money in/out." }
```

**Structural note, worth saying out loud to the student:** money in/out is hard structured
metrics, and the architecture's own split puts those in `data.json` (baked, never paraphrased)
rather than `personal.json` (LLM-written prose). It lives in `personal.json` only because the
connector is reachable from the routine and not from the baker. Copying named values rather
than computing them is what keeps that compromise honest. If they ever get an API credential,
move it to the baker.

---

## Rendering

Money in/out belongs on the **owning company's page**, not HQ — QuickBooks holds one company
file, and a student with three businesses in one QBO file should be asked which page it maps
to. A single money line in that company's HQ pulse card is a good default so the number is
visible without clicking in.

Use the existing chart and card idiom in `index.template.html`; don't invent a new one. Two
bars per month (in / out) reads better than a line pair. Label the panel with the `asOf` date
— a figure that refreshes once a morning should say when it was true.
