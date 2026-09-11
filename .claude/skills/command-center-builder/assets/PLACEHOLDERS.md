# PLACEHOLDERS — every value baked into the reference assets that a student must replace

The asset files were copied from the reference build (Stephanie Cabral / Sunrise Real Estate)
so they are proven working, not hand-simplified. That means they carry HER values. Work
through this list top to bottom with the student; do not deploy until every row is done.
Never type a secret VALUE into any file — only secret NAMES appear in the repo.

## 1. Identity & brand (`index.template.html`)
| Find | Replace with | Notes |
|---|---|---|
| `Steph` in the greeting (`greetWord()+', <span …>Steph</span>'`) | student's first name | |
| `<title>Sunrise Command Center</title>` and header wordmark | their name / company | |
| Tab list `["hq","sunrise","leanlandlord","pam"]` + the tab buttons + `renderCompany(...)` calls | their company ids (lowercase, no spaces) | ids must equal the keys in `personal.json` → `companies` and `sources.json` → `companies` |
| Tab labels "Sunrise · The Lean Landlord · PAM" | their display names | |
| `--green:#c4622d` `--green-d:#1c1c1c` `--gold:#c4622d` `--cream:#f9f7f4` `--ink:#1c1c1c` `--muted:#6b6b6b` `--line:#e0deda` | their site's palette | Open their real site; copy hex from CSS/brand kit. (Var names are legacy — `--green` is the accent.) |
| header `background:#fbf9f4` | their header tone | light/dark is a taste call — show, don't assume |
| Google Fonts link `Fraunces` | their heading serif/sans | keep a real fallback stack |
| `renderSunrise()` — the database-backed page | rename to their DB-backed company; delete if none | a company with no database uses `renderCompany` only |

## 2. Data baker (`bake.mjs`)
| Find | Replace with |
|---|---|
| `BASE = "appbDvSpJX6LKRkBc"` | their Airtable base id |
| Table ids: Units, Properties, Leases `tbl5KW9x8Zu9H9WxE`, Tasks, Maintenance, Rent Payments, Reports | THEIR current table ids — pull the schema fresh; never trust field names |
| Field ids (e.g. Tasks Due Date `fldssJhMEWkpcwYkF`, Immediate Need `fldataqIQDIrWaIhi`, Archive lookup `fldorXKZqCgsLRJFY`, Future Plans `fldTxxwSHGZfjL1fn`) | their field ids | keep `returnFieldsByFieldId=true` |
| Occupancy exclusions (`NA` status, archived property) | whatever their base uses for inactive units |
| Seed filter `/placeholder\|seed/i` | keep; extend if their seed rows are named differently |
| Env var name `AIRTABLE_TOKEN` | keep (it's what the workflow + Cloudflare build var expect) |

## 3. Cloudflare (`wrangler.jsonc`)
| Find | Replace with |
|---|---|
| `"name": "sunrise-command-center"` | their project name (becomes `<name>.<subdomain>.workers.dev`) |
| `"assets": { "directory": "./command-center/public" }` | keep unless they used a different folder |
| `compatibility_date` | today's date is fine |

## 4. GitHub Action (`refresh-data.yml`)
| Find | Replace with |
|---|---|
| `CLOUDFLARE_ACCOUNT_ID: "e8629207788bf5bd56ab587ea0c84fe9"` | THEIR account id (Cloudflare dashboard → Workers & Pages → right rail "Account ID") — this one is Stephanie's |
| cron `0 */2 * * *` | keep (2h) or their cadence; min 1h is polite to free tiers |
| secret names `AIRTABLE_TOKEN`, `CLOUDFLARE_API_TOKEN` | keep; the student pastes the values into GitHub → Settings → Secrets and variables → Actions |
| `node command-center/bake.mjs` | path if their folder differs |

## 5. Source map (`sources.template.json`)
| Find | Replace with |
|---|---|
| `companyA/B/C` | their company ids (same as §1) |
| example addresses `ops@companyA.example`, `me@gmail.com` | their real inboxes (this file lives OUTSIDE `public/`, never served) |
| `label:CompanyA` filters | the Gmail label their filters apply on the wildcard inbox |
| `SLACK_TOKEN_COMPANYA` etc. | one secret NAME per workspace reached via api |
| `<slack-connector-uuid>`, `<google-calendar-connector-uuid>` | UUIDs from their claude.ai connectors (reuse from an existing routine config if the session can't list them). Reference values were Slack `fb36c891-c2a8-48c8-90b3-42d26f76a35e`, Calendar `0bf481e9-6272-45e6-b002-d88cc0d58560`, Airtable `01255303-c477-438a-8793-1088c85a4739` — those are Stephanie's, not reusable |
| calendar `hints` | words that identify each company's events |

## 6. Routine (`routine-prompt.md`) — there is no seed file any more (dropped 09-08-2026)
| Find | Replace with |
|---|---|
| `companya/b/c` keys | their company ids (one key for a single-business student) |
| `<STUDENT_NAME>`, `<REPO_NAME>`, `<America/New_York>`, `<5am>` | theirs |
| `<PATH_TO_PRIORITIES_NOTE>` / `<OTHER_CONTEXT_PATHS>` | the living note in their repo that ranks current priorities (reference: `wiki/04-programs-and-offers.md` + `wiki/03-current-priorities.md`) — this is what stops the briefing going stale |
| `<ASSET_1..3>`, drift pattern, doubt pattern, credentials | from their own briefing spec / interview — do not invent |
| `<MULTI_GMAIL_URL_VAR>` / `<MULTI_GMAIL_TOKEN_VAR>` | reference used `MULTI_GMAIL_URL` + `MULTI_GMAIL_TOKEN`; keep the names, student pastes values as routine secrets |
| routine cron | 5am local → UTC (`0 9 * * *` for ET in summer, `0 10 * * *` in winter) |
| routine model | `claude-opus-5` (decision #22) |
| routine `sources` | `https://github.com/<org>/<repo>` |
| routine `mcp_connections` | every connector the student has already connected, by UUID; add any they connect later |

## 7. Things that are NOT placeholders (leave alone)
- `.gitignore` entry `public/data.json` — required, PII
- `personal.json` tracked in git — required, or redeploys wipe it
- `feedHtml` 🔒 rendering of `{pending:true,note}` — the credential contract the routine relies on
- `returnFieldsByFieldId=true` — field names are unstable, ids are not
- Access policy "Cloudflare account members" — the safe default; broaden only on request
