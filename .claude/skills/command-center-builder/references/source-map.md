# The Source Map — making it work for ANY student's accounts

The routine doesn't care *how* an inbox, workspace, or calendar is reached. It reads one
config file — `command-center/sources.json` — that says **which account feeds which
company, and by which method**, runs every query in it, and files each result under the
company it's tagged to. Same routine code for everyone; only the map differs. That is what
makes this teachable: a student with one Gmail and one Slack writes one line each; a
power user with an account per business maps each one.

**The file lives OUTSIDE the served folder** (`command-center/sources.json`, not
`public/`) so the email addresses are never published. It contains no secrets — only
account identifiers and the *names* of the secrets that hold each token.

## Two ways to reach any service (explain this to the student — it's the crux)
| Path | How | Good for | Requirement |
|---|---|---|---|
| **connector** | a claude.ai connector (MCP tools); OAuth/refresh handled | **the day-one path for everything**: Calendar, Slack, Gmail, QuickBooks | the account is connected on **claude.ai** AND attached to the morning routine's `mcp_connections` (local MCP servers in Claude Code are invisible to the cloud routine) |
| **api** | the routine's shell calls the HTTP API directly | multiple Slack workspaces, a self-hosted multi-Gmail server, anything with a token | the **token is copied into the routine's secrets** |

"We already have the credentials" ≠ "the routine has them." The routine runs isolated on
Anthropic's servers and cannot see the student's Mac, password manager, or local servers.
Each credential is handed to it once, as a routine secret. The student pastes; you never do.

## ⛔ This is NOT a separate conversation any more (09-09-2026)
The routing is **question 4 of the ONE intake message** (Phase 0b in SKILL.md, template and the
plain-English explainer in `assets/intake-message.md`). You list the actual accounts in the warm-up,
propose the map with your best guess in the intake, they correct it in their single reply, and you
record it here. **Do not walk them through Gmail, then Slack, then Calendar as three separate
asks.** What follows is the reference for building that guess and writing the file.

## What decides each source's mapping

### Gmail
Ask: *which inbox belongs to which company?* Two kinds:
- **Dedicated inboxes** — everything in them belongs to one company. No filter.
- **A shared / "wildcard" inbox** (e.g. a personal Gmail that gets mail about every
  business). Include it in **every** company, each with its own filter, so each page sees
  only what's relevant. Filter with **"best of both"**:
  1. **Gmail labels** (deterministic): the student creates one Gmail filter per company
     that auto-labels incoming mail by business (sender domains + subject keywords). Each
     company's query is then `label:<Company>` on that inbox. Reliable, cheap, teachable.
  2. **LLM fallback**: the routine also reads recent *unlabeled* mail from the wildcard
     and classifies it to a company, so nothing slips through while the label rules
     mature.
  Draft the filter rules for the student (Gmail → Settings → Filters → Create → "Has the
  words" → Apply label). Keep shared senders (e.g. Stripe, which two businesses may both
  use) *out* of domain lists and match on product names/subjects instead. Tell them the
  rules are starters to refine; the LLM fallback covers misses.
- **Access:** a self-hosted multi-Gmail server (the reference student runs one for several
  mailboxes) = `via: multi-gmail-server` → the routine needs its URL + bearer token as
  secrets. A single Gmail = `via: connector`.

### Slack
Ask: *one workspace with company channels, or a workspace per company?*
- **Per-workspace** (reference build: three workspaces, one per company) → each workspace
  is its own API token → `via: api` with a `tokenSecret` name per workspace. Whole
  workspace feeds its company; add a `channels` array later to narrow.
- The workspace that's already a claude.ai connector = `via: connector` with its
  `connectorUuid`.
- **One workspace, many channels** → map channels to companies instead (a `channels` list
  per company) — same connector, filtered by channel.
- Gotcha from the reference build: workspace *names* didn't match their companies (the
  "the-lean-landlord" workspace was actually the PAM business's), and one workspace
  temporarily held another company's channels. Record the map exactly as the student
  states it, note the cleanup, and don't infer from names.

### Calendar
Ask: *separate calendars per business, or one calendar with everything?* Most solo
operators have **one calendar**. Then it's like the wildcard inbox: one source, sorted per
company. Calendar events can't be Gmail-labeled, so use **LLM classification with keyword
hints** per company (tenant/showing/lease → the rental business; cohort/waitlist → the
education business; demo/investor → the product). `via: connector` (Google Calendar) is
easiest — token refresh is handled.

## `sources.json` schema (see `assets/sources.template.json`)
```json
{
  "_readme": "what this is",
  "companies": ["companyA", "companyB", "companyC"],
  "gmail": {
    "companyA": [
      { "account": "ops@companyA.com", "via": "multi-gmail-server" },
      { "account": "me@gmail.com", "via": "multi-gmail-server", "filter": "label:CompanyA", "llmFallback": true }
    ]
  },
  "slack": {
    "companyA": { "workspace": "companya", "via": "api", "tokenSecret": "SLACK_TOKEN_COMPANYA" },
    "companyC": { "workspace": "companyc", "via": "connector", "connectorUuid": "<uuid>" }
  },
  "calendar": {
    "shared": { "account": "me@gmail.com", "via": "connector", "connectorUuid": "<uuid>",
                "classify": "llm", "hints": { "companyA": ["tenant","lease"], "companyB": ["cohort"] } }
  }
}
```
Field meanings: `via` = connector | api | multi-gmail-server; `tokenSecret` = the name
of the routine secret holding that token; `filter` = a Gmail search applied to a
shared inbox for this company; `llmFallback` = also classify unlabeled mail;
`hints` = keyword nudges for calendar classification.

## The "pending credential" contract
When the routine finds a source's secret is **not set**, it doesn't fail — it emits
`{"pending": true, "note": "Add <SECRET_NAME> … to enable."}` for that panel, and the
page renders a 🔒 with that note. This is deliberate: the page is always honest about
what's wired, and the student can add credentials one at a time and watch panels light
up. Test-run the routine after mapping to *see* the real state (on the reference build,
the first real run showed Calendar + Slack + Power Moves live and Email 🔒 — exactly the
one missing secret).
