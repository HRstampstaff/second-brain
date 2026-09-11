# Gotchas — every trap we hit, so you don't

## Data & schema
- **Inherited templates are stale.** The reference build's original dashboard template
  pointed at a Leases table that no longer existed and at moved field IDs. Always pull the
  *current* schema and remap every field ID before baking. Never trust field names.
- **Formula/lookup fields return odd shapes** (`[2035]` arrays; lookup objects). Normalize.
- **Occupancy math needs exclusions.** Units with status "NA"/placeholders and units whose
  *property* is archived must not count as active, or the rate is wrong (the reference
  base read 100% because its only vacant units sat under an archived property — surface
  that on the page rather than hide it; a task already existed to fix it at the source).
- **Empty source tables make zero-KPIs.** An empty payments table produced a permanent
  "$0 overdue" card and $0 rent history. Remove cards nothing feeds; don't display fake
  confidence.
- **Seed/placeholder rows poison charts.** Filter `/placeholder|seed/i` in the baker; a
  "cleared" month with 0/0 rent should be "no data," not a collapse to zero.
- **Month-to-month leases legitimately have past end dates.** Don't flag them.
- **A 360-item task backlog is not a dashboard list.** Scope to immediate/dated/prioritized.

## Privacy / repo hygiene
- **`data.json` contains tenant names → git-ignore it.** It's regenerated at every build,
  so it never needs to be committed. (The reference build committed one seed by accident
  before catching it; the vault's own rule forbids PII in git.)
- **`personal.json` MUST be tracked**, or the 2-hour redeploy (which uploads the served
  folder from the repo) wipes it. It can mention people from Slack — acceptable in a
  private repo of the student's own notes; say so.
- **`sources.json` (email addresses) lives outside `public/`** so it's never served.
- **Only serve `public/`.** If the repo is also a notes vault, the assets directory scope +
  Access are what keep the notes private.
- **A note-syncing tool that auto-pushes (Obsidian git) will deploy a half-finished
  `index.html` sitting modified on disk.** Never leave a draft uncommitted in that repo;
  `git checkout -- <file>` to revert drafts you aren't shipping.
- Pushing a `.github/workflows/*.yml` needs a token with the `workflow` scope; the sync
  tool's token usually lacks it — push workflows yourself with `gh`.

## Cloudflare
- **Workers & Pages is not in the left menu on a fresh account.** A student following "click Workers
  & Pages in the menu" gets stuck at step one. Use the search box at the top of the dashboard: type
  Workers, choose Workers & Pages. (Stephanie, 09-09-2026, from a real screen.)
- New accounts get the **Workers** flow, not classic Pages. No output-directory field; use
  a root `wrangler.jsonc` with `assets.directory` and `npx wrangler deploy`.
- **No deploy hooks, no cron triggers** on a static-asset Worker. Refresh via a GitHub
  Action that bakes and `wrangler deploy`s directly.
- **Build watch path defaults to `*`** → every note push rebuilds → burns free minutes.
  Narrow to `command-center/*`.
- **Zero Trust (for Access) requires a card on file even on the Free plan**, plus Terms
  acceptance — the student's screen. Free limits cover a personal login gate; say so
  honestly. Fallback if they refuse a card: Basic Auth coded into the Worker.
- **"Variables cannot be added to a Worker that only has static assets"** refers to
  *runtime* vars. Build-time vars/secrets are under Settings → Builds and work.
- Deploy log streaming sometimes stalls — reload the page.
- Field quirks: first typed character dropped in some fields (prepend a throwaway char,
  then verify); ⌘A doesn't select-all (End + Backspace); right-rail anchors don't scroll.
- The API-token form's **Account Resources is empty by default** — set it to the student's
  account; set Zone Resources to All zones; the summary must list Workers Scripts:Edit.

## GitHub
- **404 on a private repo's settings = not signed in** in that browser. Open the link in
  the logged-in browser.
- `gh workflow run` + `gh run watch --exit-status` proves the Action end to end. A "Node
  20 is deprecated" annotation is harmless.

## The morning routine
- **The briefing is a scheduled CLOUD routine, and this file said the opposite twice.** One
  version claimed a cloud agent "cannot reach connectors" (false: with connectors attached it
  reads Calendar, Slack, Gmail, Airtable and pushes to the attached repo, proven five mornings
  running on the reference build) and moved the briefing into a Daily Routines row. Stephanie
  reversed that 09-08-2026: a row runs only when the student opens Claude, so the briefing would
  lose currentness for nothing. Cloud is the default; a routines row is only for a source that is
  local to their machine. **Attach every connector to the routine's `mcp_connections`**, including
  ones they connect later — a connector on claude.ai that is not attached is invisible to the run.
- **"We have the credentials" ≠ "the run has them."** Anything running outside the student's
  own session (the GitHub Action that bakes `data.json`) needs its tokens as build secrets.
  A credential on their machine or in a connector is invisible to it.
- **A prompt that hard-codes priorities goes stale.** The first real run led with a
  dormant course because the pasted spec was old; the vault was actually up to date.
  Weight by the student's living priorities note.
- **Old "beta/PostHog"-style references** survive in inherited specs; strip retired tools.
- **Success ≠ work.** A prior routine reported SUCCEEDED daily while doing nothing (its
  environment lacked the tool it needed). Read run logs; watch for the actual commit.
- **The `data.json` GitHub Action cron is UTC**; local-time schedules drift an hour at DST.
- **There is no hand-seeded briefing** (dropped 09-08-2026). The first real briefing is generated
  at the end of the build. If you find yourself writing sample content into `personal.json`,
  stop and run the routine prompt instead.
- The routine reached "pending" Slack workspaces anyway on the reference build because
  their channels currently lived inside the connected workspace. Not a bug — but the map
  should be cleaned up so each workspace truly holds one company.

## Accounting (optional QuickBooks source)
- **Check the books before building the panel.** A QBO report shows POSTED transactions only.
  The reference build's P&L read $0 rental income for three straight months while the
  portfolio sat at 100% occupancy — four months of deposits had never been categorized, so
  they were invisible to every report. Run the P&L, eyeball recent months, and if there's a
  gap say so and stop. Never render the zero as if it were the business.
- **The connector's computed totals are WRONG.** `totalExpenses` came back `0` against ~$170k
  of real expenses; per-month `totalIncome` said `582.49` for a month with $33k of rent. The
  balance sheet and the P&L reported different net income for the same period. Read the named
  rows — `incomeAccountsAggregated["Income"]`, `cogsAccountsAggregated["Cost of Goods Sold"]`,
  `expenseAccountsAggregated["Expenses"]` — and **never sum the maps**, which mix parent rows,
  "Total for X" subtotals and detail rows into one object.
- **The connector can't see the "For Review" queue.** There is no tool for it. If income looks
  missing, that check happens on QBO's Banking screen, by the student.
- **The connector may demand an `industry` on the QBO profile first.** Setting it writes to
  their account — ask first, and pick the accurate NAICS rather than the closest of the three
  it suggests (they're often all wrong).
- **Don't send a student to the Intuit REST API.** Better data, but it needs a developer app
  and a compliance questionnaire Intuit reviews over days, even for a private single-company
  integration. Full reasoning in `quickbooks.md`.

## Process
- **Don't build the whole thing in one go.** Map one source at a time (Gmail → Slack →
  Calendar), confirm, record, move on. It's slower per step and faster overall.
- **The student's mental model will be wrong in specific, predictable ways** (Artifact vs
  hosted refresh; seed vs real; "we have the creds"). Correct them plainly, with a table.
- **Show, don't tell.** Local preview → deploy → verify gate from an unauthenticated
  browser → test-run → read the commit. Each step produced a screenshot or log we showed.
- **Never claim it works.** Verified working means: page renders, gate redirects strangers
  to sign-in, Action run green, routine commit landed and content reads right.
