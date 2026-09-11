# Decision Log — every fork on the reference build, the choice, and why

Use these as **defaults with reasons**. Offer the recommended option, explain the
tradeoff in one breath, let the student choose. Where the student's situation differs,
the reasoning tells you which way to lean.

| # | Decision | Options considered | Chosen | Why / outcome |
|---|---|---|---|---|
| 1 | Where should the dashboard live? | Claude Artifact snapshot (desktop-only refresh) · Static site + cloud daily bake · Live web app | **Static site + cloud bake** (evolved to Cloudflare Workers + scheduled refresh) | Student wanted phone access with the laptop off and code they own. An Artifact can't self-refresh from the cloud. The "self-hosted on my computer" version fails when the computer's off — both refresh *and* hosting must be cloud. |
| 2 | Interim while building | — | Publish an Artifact snapshot first | Gave a phone-viewable page in minutes; kept as a fallback. Always show something early. |
| 3 | Host: GitHub Pages vs Netlify vs Cloudflare | all three | **Cloudflare** | Only free option with a real login gate (Access). GitHub Pages free = public; Netlify password = paid tier. Cloudflare also allows serverless later. Decision recorded as "add Cloudflare to the student stack." |
| 4 | Dedicated repo vs subfolder in the student's second-brain repo | both | **Subfolder** (`command-center/` in the vault repo) | Student edits from phone/cloud sessions that are one-repo scoped; one repo means the dashboard and notes are always together. Risk (exposing the vault) mitigated by serving only `command-center/public/` + Access on top. A dedicated repo is the safer default for a student without that workflow need. |
| 5 | Cloudflare Pages vs Workers | the account only offered the Workers flow | **Workers static assets** | The modern UI; needs a root `wrangler.jsonc` + `npx wrangler deploy`. Pages' "output directory" concept doesn't apply. |
| 6 | Data-file refresh mechanism | deploy hook (dead on Workers) · scheduled commit that bumps a file · GitHub Action that bakes + deploys directly | **GitHub Action bake + deploy** | No deploy hooks on Workers. Scheduled commits clutter the vault. The Action is clean, uses no Cloudflare build minutes, needs one Cloudflare API token. |
| 7 | Refresh cadence | hourly · every 2h · daily | **Every 2 hours** | "More than once a day" satisfied; free build/Action minutes comfortably covered. |
| 8 | Where the database token lives | plaintext build var · encrypted secret | **Encrypted secret** (Cloudflare build secret + GitHub Actions secret) | Never plaintext; student pastes, Claude never sees it. |
| 9 | Brand | inherited green/gold · dark header · the real site's palette | **Match the real site** (light cream header, serif greeting with accent-colored name, terracotta accents) | The dark header was rejected on sight. Always open the student's actual site and copy it. |
| 10 | Placeholder/seed chart data | keep (looks full) · remove + leave empty · remove + placeholder text | **Remove entirely, no placeholder text** | Fake seed months produced fake rent/collection charts. Student: "just remove them, we'll repopulate." Baker now filters `/placeholder|seed/`; unbacked sections deleted. |
| 11 | KPI cards with no data source | keep at $0 · remove | **Remove** (the "Overdue balance" card) | An always-$0 card because the payments table was empty misleads. Only show what's tracked. |
| 12 | The exec briefing's name/place | "Personal" tab | **"HQ"** — the it-all-comes-together home | "Personal" was the wrong word; the content is the executive layer above the companies. |
| 13 | Company pages | one shared Daily · one per company | **One tab per company** + HQ | Each business gets its own snapshot; HQ rolls them up with pulse cards. |
| 14 | Which companies get tabs | 3 vs 4 (a sub-brand as its own tab) | **3** (sub-brand lives inside its parent's page) | Fewer tabs; the active launch is the *content* of the parent page, not a separate tab. |
| 15 | Calendar/Slack/Email/Power Move placement | on HQ · on each company page | **On each company page; removed from HQ** | HQ keeps only mindset + High-Leverage action + worth anchor + pulses. |
| 16 | "Q4 / Q1" shorthand | keep · drop | **Drop** — use "High Leverage / Long-Term Payoff" and "Low Leverage / Short-Term Payoff" | Student's request; clearer for anyone not steeped in her 2×2. |
| 17 | Multi-account Gmail | connector only · direct API only · both via a map | **Both, via a source map** | A student with one inbox uses the connector line; a power user maps each inbox; same routine. |
| 18 | Wildcard inbox filtering | labels · LLM · both | **Both** (labels deterministic + LLM fallback) | Labels are reliable and teachable; LLM catches what labels miss. |
| 19 | Slack mapping | by channel · by workspace | **By workspace** (one token each; the connected one via connector) | Student had a workspace per company. If a student has one workspace, map channels instead. |
| 20 | Calendar mapping | per-business calendars · one shared | **One shared calendar, LLM-classified with hints** | Student keeps everything on one calendar. |
| 21 | Which routine generates the briefing | extend the local morning task · new cloud routine | **New dedicated cloud routine at 5am** | Cloud = laptop off; dedicated = one job, one prompt. |
| 22 | Routine model | Sonnet · Opus | **Opus** | Narrative quality and the "don't contradict outreach" judgment matter. |
| 23 | Stale-priority bug in the briefing | hard-code the new priority · weight by the vault | **Lead with the active launch AND weight by the vault's programs/offers note** | Hard-coding goes stale again; the vault is the living source of truth. |
| 24 | "Beta / PostHog" references in the prompt | keep · remove | **Removed** | Student had retired those; a briefing must reflect current tooling. |
| 25 | Old daily-briefing automations | delete · disable | **Disable, don't delete** (old Cowork routine off; Slack Canvas still running) | Reversible; decide after living with the new tab. |
| 26 | Test the routine before trusting 5am? | wait · test-run now | **Test-run now** | Proved push-to-main + content in minutes instead of discovering a failure at dawn. |
| 27 | Seed vs real data on day one | keep the hand-seeded page · run for real | **Run for real** ("so I see what's missing") | The honest 🔒 map told the student exactly which secret to add next (Email). |
| 28 | Worth Anchor on HQ | keep · remove | **Remove** (09-08-2026) | Stephanie's call on review. HQ is now mindset + High Leverage action + pulses. |
| 29 | One business | HQ tab + company tab · one page | **One page** (09-08-2026) | "No need for 2 tabs if only 1 business." HQ content on top, company below. |
| 30 | Several businesses, first build | populate all · populate one | **All tabs created, ONE populated** (09-08-2026) | One company done end to end beats three half-done; the rest are honest 🔒 placeholders filled one per session. |
| 31 | Tools not yet connected | stop and connect · placeholder | **Placeholder** (09-08-2026) | Day one uses only connectors they already have. Anything else is a 🔒 naming the tool; it fills after they connect it. |
| 32 | Hand-seeded first briefing | keep · drop | **Drop** (09-08-2026) | The numbers connect instantly anyway; the briefing is generated for real at the end of the build, so a seed only had to be overwritten. |
| 33 | Creating the morning briefing routine | ask the student · automatic | **Automatic, first run in the build session** (09-08-2026) | Vera adds the routines row and runs it once before hand-off. |
| 35 | When the Cloudflare account work happens | in the build session · before it | **Before the session, student alone** (09-08-2026, Stephanie) | Account, GitHub authorization, Zero Trust with the card, the API token and the Airtable token need no dashboard to exist. Only import + deploy stay in the session (~10 min). Matches the cohort shape: setup before, teaching during. |
| 39 | When the reconnaissance happens | inside the build · a warm-up phase before it | **A warm-up phase (Phase 0a) run first, alone** (09-09-2026, Stephanie) | "I want to run something at the beginning of the call to set them up so the actual build doesn't take as long." Installing the skill, verifying prep, inventorying connectors, reading their business and base, and checking the books are all things Vera can do without the student. Running them before the teaching means the intake questions land on someone who now understands what they are choosing, and Vera already holds the facts to make them specific. |
| 38 | How much the build conversation asks | ask nothing (what actually happened) · open design conversation · ONE intake message | **One message, three questions, one reply, as a hard gate** (09-09-2026, Stephanie) | The first real build shipped without asking about metrics or money, so the student got a copy of somebody else's dashboard. An open conversation is the opposite failure and never reaches a live page. Recommendations pre-filled make "go" a complete answer. Permission is never asked; content always is. |
| 37 | Who pastes the Airtable token into Cloudflare | student pastes it themselves · student sends it to Vera in chat | **Vera asks for it in chat and pastes it** (09-09-2026, Stephanie) | No hands-on step for the student at all. Safe because the token is read-only, one base, revocable, re-issued free. Card, passwords, the Cloudflare API token and any write-capable token remain the student's alone. Trade-off accepted: it sits in the chat transcript. |
| 36 | Brand palette | read their website · ask them · use it only if already known, else a default | **Already known or The Lean Landlord default** (09-09-2026, Stephanie) | "I don't want her to bother with brand colors unless those are already known to her." No website reading, no asking. Colors are one "change the colors" request away later. |
| 34 | Where the briefing runs | Daily Routines row on the student's machine · scheduled cloud routine | **Cloud routine** (09-08-2026, Stephanie) | Every day-one source is a connector and connectors work from the cloud; a row runs only when they open Claude, so it would lose currentness. A row is the fallback only for a local source. The reference build stays on its 5am cloud routine. |

## Variables the reference build settled on (so you have concrete defaults)
- Tabs: **HQ · Sunrise · The Lean Landlord · PAM** (VA Optional inside Lean Landlord)
- Palette: terracotta `#C4622D` accent, ink `#1C1C1C`, cream `#F9F7F4`, border `#E0DEDA`,
  muted `#6B6B6B`; light header `#fbf9f4`; heading serif **Fraunces** (Google Fonts)
- Cloudflare project name = `wrangler.jsonc` name; build `node command-center/bake.mjs`;
  deploy `npx wrangler deploy`; build vars `NODE_VERSION=20` + `AIRTABLE_TOKEN` (encrypted)
- Access policy: **Cloudflare account members**, All traffic, 24h session
- Build watch path: `command-center/*`
- Data refresh: GitHub Action, `0 */2 * * *`, secrets `AIRTABLE_TOKEN` + `CLOUDFLARE_API_TOKEN`
- Routine: cloud, cron `0 9 * * *` (5am ET in summer), Opus, repo attached, connectors Calendar + Slack + Airtable attached; created and run once at the end of the build (decisions 33, 34)
- Files: `data.json` git-ignored; `personal.json` tracked; `sources.json` outside `public/`
