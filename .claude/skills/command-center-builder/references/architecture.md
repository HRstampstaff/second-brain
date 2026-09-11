# Architecture — what the Command Center is and why it's built this way

Read this first. Every structural choice below was made on the reference build
(Stephanie Cabral's, Sept 2026) after evaluating alternatives. Knowing the *why* lets you
give a student sane defaults and explain them instead of re-litigating.

## The one-sentence design
A **static web page** (HTML/JS, no server) that renders two JSON data files, hosted on
**Cloudflare** as a Worker serving static assets, locked behind **Cloudflare Access**
(the student's own login), with the data files regenerated in the cloud: structured
metrics by a **build script on a 2-hour schedule**, and the written briefing by a
**scheduled Claude cloud routine every morning**, with the student's connectors and repo
attached. The code lives in the student's own **GitHub repo**. Nothing runs on their computer.

## Why this shape won (the three models we compared)

| Model | Where data is read | Cloud refresh? | Phone-viewable? | Own the code? | Verdict |
|---|---|---|---|---|---|
| **1. Claude Artifact snapshot** | Desktop Code at build time | ❌ (cloud has no publish tool) | ✅ | in the artifact | Great quick interim; can't self-refresh |
| **2. Static site + scheduled cloud bake** (the "João model") | a cloud job, on a timer | ✅ | ✅ | ✅ GitHub | **Chosen** — but hosted in the cloud, not on a laptop |
| **3. Live web app** (serverless function queries on load) | the page, every open | n/a — always fresh | ✅ | ✅ | Strong; more setup, and needs a token on the host |

Model 2 won because the student explicitly wanted: refresh in the cloud with the computer
off, view from a phone anytime, and own the code in git. One correction to the "João
model" the student admired: João hosted on *his own computer*, which means the site is
unreachable when it's off. **Both the refresh job and the page must live in the cloud.**

## Why Cloudflare (not GitHub Pages, not Netlify)
- **Privacy.** A dashboard with rent/occupancy/tenant names must not sit at a guessable
  public URL. GitHub Pages' free tier is public-only. Netlify's password gate is a paid
  tier (~$19/mo). **Cloudflare Access is free** (Zero Trust free plan, up to 50 users) and
  gives a real login gate. Decisive.
- **Student stack.** The VA Optional course commits students to Airtable, Drive, GitHub,
  Slack, Claude, n8n. Cloudflare was *added* to that stack deliberately (decision recorded).
- **Room to grow.** Cloudflare can run serverless functions later if a company page ever
  wants a live query (Model 3) — GitHub Pages never can.
- **Note on the UI:** Cloudflare has merged "Pages" into "Workers." New accounts land in the
  *Workers* "Import a repository" flow (`npx wrangler deploy`), not the classic Pages flow
  with a "build output directory." Build for Workers static assets — see `cloudflare.md`.

## The two data files (and why there are two)
| File | What | Made by | Refresh | Tracked in git? |
|---|---|---|---|---|
| `data.json` | hard numbers from a database (occupancy, tasks, leases, KPIs…) | `bake.mjs`, a plain script | every 2h via GitHub Action | **No** — git-ignored (it can hold tenant/PII names); regenerated at every build |
| `personal.json` | the written briefing + per-company Calendar/Slack/Email/Power Move | the **cloud routine** (needs an LLM + connectors); first run happens automatically at the end of the build | every morning, 5am | **Yes** — must be committed so the 2-hour redeploys don't wipe it |

The split matters: a build script can bake numbers but cannot *write* a leverage frame
or classify Slack messages — that needs an agent. And the agent's output must be
committed, because the 2-hour Airtable redeploy re-uploads the served folder from the
repo; if `personal.json` weren't in the repo, each redeploy would delete it.

## Page structure (tabs)
- **HQ** — the "it all comes together" executive layer:
  - clickable **pulse card per company** (one line each; the database-backed company's
    pulse is derived live from `data.json`, the others come from the routine)
  - **Daily Mindset** (a real neuroscience quote + 2-sentence note tied to a current build)
  - **High Leverage / Long-Term Payoff** — ONE action to protect today, plus the
    Low Leverage / Short-Term Payoff pull most likely to steal it. (The original spec used
    "Q4/Q1" shorthand; the student asked to drop it — use the full phrases.)
- **One business = one page.** HQ content on top, the company below, no tab bar (Stephanie,
  09-08-2026). The tab structure below is for two or more businesses, and even then only ONE
  company is populated in the first build; the rest carry 🔒 placeholders.
- **One tab per company**, each with:
  - its structured data if it has a database (KPIs, wins, tasks, leases, charts…)
  - or, for companies without a wired database: an agent-written **headline + status +
    focus/open items**
  - its own **Calendar**, **Slack**, **Email** (each renders a 🔒 "add credential" note
    when its source isn't wired yet), and **Power Move**

Everything the student sees on a company page belongs *to that company*. HQ never shows
calendar/Slack/email — those were deliberately moved off HQ onto the company pages. HQ also no
longer carries a Worth Anchor (removed 09-08-2026).

## Brand
Pull the palette and type from the student's **actual website** — open it and read the
colors — never guess. The reference build's first attempt used a dark header the student
hated; the real site had a *light cream* header, dark serif headings with a terracotta
accent word, terracotta buttons. Match the real thing: light header, serif greeting with
the name in the accent color, accent underline on the active tab, accent section rules.
Keep semantic red for alerts. The page uses CSS custom properties for the palette so
recoloring is a one-block edit.

## Building the page (`assets/index.template.html`)
The template is the working reference page. To adapt it for a student:
1. **Palette tokens** in the `:root` block (`--green` is the primary accent, `--green-d`
   the ink/dark, `--gold` the accent rule, `--cream` the page ground, `--line`, `--muted`).
   Also the header background and the chart color constants (`const C={...}` and the
   `rgba(...)` fills in the chart options).
2. **Heading font** — the Google Fonts `<link>` and `font-family` on `header h1`,
   `.frame h4`, `.quote`, `.cohead`. Swap for the student's serif.
3. **Greeting name** — the `greeting` innerHTML sets the first name in the accent color.
4. **Companies** — the tab buttons, the `showTab` array, the `tab-<id>` sections, the
   `renderCompany(...)` calls, and the pulse cards in `renderHQ`. Company ids are lowercase
   identifiers (e.g. `sunrise`, `leanlandlord`, `pam`); the element ids are
   `<id>Head/Status/Items/Cal/Slack/Mail/Power`.
5. **Database section** — the KPI/wins/tasks/leases/occupancy block is Airtable-specific.
   Keep it for a database-backed company, delete it for others, and point the
   `tableUrl`/`BASE`/`T` constants at the student's base and tables.
6. **Footer/stamp text** — says which data is baked vs routine-written.

Preview locally before deploying: serve the `public/` folder (`python3 -m http.server`),
open it, click every tab, then screenshot. The page uses `fetch('./data.json')` and
`fetch('./personal.json')`, so it needs http, not `file://`.

## The baker (`assets/bake.mjs`)
A Node script (no dependencies — native `fetch`, Node 18+) that reads the database via
REST with a **read-only token from an env var**, aggregates, and writes
`public/data.json`. The token never appears in the output; only computed numbers do.
For an Airtable base:
- Use `returnFieldsByFieldId=true` and reference **field IDs**, not names — names get
  renamed. Pull the current schema (`list_tables_for_base` / `get_table_schema`) and map
  every field you use. **Do this fresh** — the reference build's inherited template was
  stale (a replaced Leases table, moved Due Date/Priority fields, a lookup where a
  single-select used to be) and would have silently broken.
- Normalize odd shapes: formula fields that return `[2035]` arrays → take the first
  element; lookup fields that return objects → test for the value (`JSON.stringify(v)
  .includes('"Yes"')`).
- Aggregation rules that mattered (adapt to the student's data, but keep the *spirit*):
  - occupancy counts only units whose status is Occupied/Vacant — exclude "NA"/placeholder
    units and units whose *property* is archived, otherwise the rate is nonsense;
  - exclude rows flagged as placeholder/seed (`/placeholder|seed/i` in a notes field) —
    seeded months produce fake charts;
  - treat 0/0 rent months as "no data," not a collapse to zero;
  - scope a "tasks needing attention" list to items that are immediate, dated, or
    explicitly prioritized — not the whole backlog (a 360-item backlog is useless on a
    dashboard);
  - lease expirations = current leases with an end date in the next 90 days; leases that
    auto-roll month-to-month legitimately have *past* end dates — don't flag them.
- The baker prints a one-line summary so the build log shows what it baked.

## The scheduled data refresh (`assets/refresh-data.yml`)
A GitHub Action on a cron (every 2 hours) that: checks out the repo → runs the baker with
the database token as a secret → `npx wrangler deploy` with a Cloudflare API token +
account id. It deploys **directly**, so it uses no Cloudflare build minutes and makes no
commits (no vault clutter). Why not a deploy hook? Cloudflare's Workers builds have **no
deploy hooks and no cron for static-asset workers** — that Pages-era mechanism is gone.
The alternative (a scheduled commit that bumps a file) works but litters the repo with
commits; the student chose the clean Action. Secrets it needs, in the repo's Actions
secrets: `AIRTABLE_TOKEN` (or the student's database token) and `CLOUDFLARE_API_TOKEN`;
the account id is not secret and is inline.

## Repo layout (the reference build lives in the student's "second brain" vault repo)
```
<repo>/
  wrangler.jsonc                      ← Cloudflare config, at repo ROOT (assets dir → command-center/public)
  .github/workflows/refresh-data.yml  ← 2-hour bake + deploy
  command-center/
    bake.mjs                          ← the baker
    sources.json                      ← the per-source→company map (NOT served)
    README.md                         ← setup notes
    .gitignore                        ← ignores public/data.json
    public/                           ← the ONLY folder Cloudflare serves
      index.html
      data.json                       ← baked (ignored)
      personal.json                   ← routine-written (tracked)
```
Only `command-center/public/` is published; the rest of the repo is never served. If the
student's repo also holds private notes (as a second-brain vault does), this scoping is
what keeps them private — plus Access on top. See `decisions.md` for the dedicated-repo
vs subfolder discussion.

## Data reach: what the cloud routine can use
The morning routine runs isolated on Anthropic's servers. It reaches a service two ways:
1. **A claude.ai connector** (MCP tools) attached to the routine — clean, OAuth handled. Day-one
   students use only connectors they have ALREADY set up; anything else is a 🔒 placeholder
   until they connect it and Vera attaches it to the routine. Local MCP servers configured in
   Claude Code are invisible to the cloud.
2. **A direct API call from its shell** (curl/node) — advanced, for a student who later outgrows
   a connector, and it needs the credential copied into the routine's secrets (student pastes).
So "the student has the token" ≠ "the routine has it", and the same is true of the GitHub Action
that bakes `data.json`. `source-map.md` and `routine.md` spell out which is which.
