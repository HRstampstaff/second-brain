---
name: command-center-builder
description: >-
  Step-by-step guide for building a student's own hosted, private, auto-refreshing
  multi-company Command Center dashboard — a single web page with an HQ overview
  plus one page per business, pulling live data from the Airtable, Google Calendar,
  Slack, Gmail and (optionally) QuickBooks connectors, deployed on Cloudflare, with metrics
  the student chooses and a briefing their own Vera regenerates each morning. USE THIS SKILL whenever a VA Optional student (or Stephanie) wants to
  build, set up, or replicate the Command Center / "command center dashboard" /
  personal HQ dashboard for their own accounts and businesses — even if they only
  say "build my dashboard," "the command center," "a daily briefing page," "one
  page for each of my companies," or "the thing Steph built." Claude runs this
  interactively and can drive the browser for the parts that are safe to automate.
  This is a teaching artifact: assume nothing, guide the student through every step,
  and never skip the credential-handoff and confirmation rules.
metadata:
  tier: 3.Tool
---

# Command Center Builder

**Version: 2.3 - 09-10-2026** (from the Week 4 dry run: every connected tool gets a SYNTHESIS,
never a list, unless the owner asks for a list — golden rule 7 and the routine prompt. Two students
got a raw dump of every Todoist item and every CRM transaction because only Calendar, Slack and
Email had synthesis instructions. And this skill now lives in the cohort library, so "no
command-center-builder skill exists" stops being the first thing Vera says.) (2.2: the pre-work is TEN minutes, not twenty; on the Week 4 page it is a
collapsed dropdown because it is assumed done, and the lesson opens with the warm-up prompt so the
student starts it and reads while Vera works.) (2.1: the intake asks a FOURTH question, the routing map: which Gmail,
Slack workspace, calendar and QuickBooks company feeds which business. The warm-up now lists the
accounts behind each connector, not just the service names, because that list is what the question
is built from. Phase 4 stops being a second conversation and becomes recording the answer.) (2.0: the build now opens with a WARM-UP phase Vera runs alone — install
the skill, verify the prep, inventory connectors, read their business and their base, check the
books — reporting facts and no suggestions, so a live call can run it before the teaching. Then ONE
intake message, three questions, one reply, as a hard gate before any file is written; metrics come
from their base AND what Vera knows of their business, and an unfed metric is still suggested as a
🔒 placeholder; QuickBooks is offered after the books check instead of waiting to be asked.) (1.10: no hands-on step for the student: Vera ASKS for the read-only
Airtable token in chat and puts it into Cloudflare herself. Card, passwords, the Cloudflare API
token and any write-capable token stay the student's alone.) (1.9: rule 4 rewritten: "build my command center" is the standing approval
for every push, merge, deploy and the routine creation and first run; Vera narrates, never asks.
Only secrets, card, terms, OAuth, account creation and the two student decisions remain stops.) (1.8.2: Airtable token step: Access before Scopes, save the token privately BEFORE pasting it into GitHub, no "save it twice".) (1.8.1: paste the token value before typing the secret name; team name is not a step.) (1.8: prep steps rewritten to Stephanie's real-screen wording: Create
application, Connect to GitHub, Install & Authorize OR Save, Zero Trust via the left menu, Profile →
API Tokens, "scroll to Account Resources, dropdown after Include", the repository's own Settings tab
not the profile menu; the Vera prompt is now a STUCK helper with a screenshot, not a follow-along.) (1.7: brand: use it only if already known, otherwise default to The Lean
Landlord palette without looking or asking; hand-off tells them the address, the login, and to save
it to the home screen.) (1.6.1: Workers & Pages is reached through the dashboard search box, not the left menu, on a new account.) (1.6: the page opens on a phone OR a computer, never "on your phone" alone;
both refresh jobs only READ, nothing is written back to any connected tool; and the GitHub-authorize
prep step now spells out every click, because "authorize it" told a student nothing.) (1.5: student-facing vocabulary from Stephanie: "memory vault" not
"skills repo", "credit card" not "card", explain Cloudflare as the company that hosts the page and
puts a login on it, the Command Center WILL show private information; and the token never goes into
the chat even without a password manager, a locked phone note or a fresh token in the session is the
fallback.) (1.4: adds `assets/prep-prompt.md`, the prompt a student pastes into Vera
to be walked through the before-the-session steps; it sits behind a copy button on the Week 4 prep
page.) (1.3: Phase 3 split: the account half of Cloudflare — account, GitHub
authorization, Zero Trust with the card, the API token, the Airtable token — is now a BEFORE THE
SESSION checklist the student does alone, so the build session only imports and deploys. Matches
how the cohort is onboarded: setup before the live session, teaching during it.) (1.2: Stephanie's
review, two passes: no Worth Anchor; one business = one
page; several businesses = all tabs created, ONE populated first; connectors they already have or a
placeholder, nothing else on day one; no hand-seeded briefing, the first briefing is generated
automatically as the last build step; the old "remaining secrets" phase is now an advanced note.
Second pass: the briefing runs as a **scheduled cloud routine**, not a Daily Routines row. Her
reason, which is correct: every day-one source is a connector, connectors work from the cloud, and a
cloud routine fires at 5am whether or not the laptop is open, while a routines row waits for the
student to open Claude. A row would cost currentness for nothing. 1.1 had this backwards.)

You are guiding a student (a self-managing landlord / small-business owner in the
VA Optional program) through building **their own** version of the Command Center:
a single, private, phone-viewable web page that shows, for each of their businesses,
what needs their attention today — the hard numbers refreshed automatically in the
cloud, and the written briefing refreshed each morning by their own Vera.

**This is a live, guided build.** The student is not a developer. You do the technical
work; they make the decisions and supply the credentials only you're not allowed to
touch. Go one piece at a time, confirm each decision, and explain *why* at each step so
they understand what they're building. The more carefully you follow this the fewer
questions you'll face, because you are the one who will walk them through it.

---

## What you're building (the finished shape)

A static web page (`index.html`) + a data file per source, hosted on **Cloudflare**,
gated by **Cloudflare Access** (private to the student's own login). Tabs:

- **HQ** — the executive layer that sits above every business: a daily mindset, ONE
  "High Leverage / Long-Term Payoff" action, and a one-line "pulse" card per company.
  (There is no Worth Anchor. Stephanie removed it 09-08-2026.)
- **One tab per company** — each with that company's own snapshot: the metrics *they chose*,
  its Calendar, its Slack, its Email, and its Power Move. **Every business gets a tab, including
  ones with nothing wired yet** — an empty tab renders 🔒 placeholders naming what it's waiting
  for, which is exactly the to-do list for the rest of the build. **But only ONE company is
  populated in the first build**; the others stay as honest placeholders until the next session.
- **A student with ONE business gets ONE page, not two tabs.** The HQ content (mindset,
  leverage action) sits at the top and the company content below it, on the same page. Two tabs
  for one business is a tab bar with nothing to switch between.

Two data files drive it:
- `data.json` — hard, structured metrics baked from a database (Airtable in the
  reference build). Refreshed every ~2 hours by a build script.
- `personal.json` — the written briefing + per-company Calendar/Slack/Email/Power Move,
  produced each morning by **a scheduled Claude cloud routine** with the student's connectors and
  their repo attached. It needs an LLM reading their connectors, so a build script cannot make it,
  and it is generated for the FIRST time automatically at the end of the build (Phase 5).

Read **`references/architecture.md`** for the full picture and the reasoning behind
every structural choice before you start building. It will save you and the student
from dead ends.

---

## The golden rules (read before touching anything)

1. **One credential you DO handle, everything else is theirs (Stephanie, 09-09-2026).**
   **The read-only Airtable token is the exception**: when Cloudflare needs it, ASK the student
   for it in chat, they paste it to you, and you put it into the Cloudflare field yourself.
   There is no "hands on the keyboard" moment in this build. It is a safe exception because that
   token is read-only, scoped to one base, and re-created free in seconds. Say one line when you
   ask: it will sit in this chat's history, and they can revoke and re-issue it from Airtable any
   time. **Everything else stays theirs and you never type, paste or read it**: passwords, card
   numbers, the Cloudflare API token, any write-capable token. If one of those is needed, stop
   and tell them where to paste it themselves.

2. **Hand off at terms, payments, OAuth grants, and account creation.** Creating a
   Cloudflare account, accepting a Terms of Service, adding a payment method, authorizing
   an OAuth app — these are the student's clicks. You set everything up to that point and
   pause. See `references/cloudflare.md` for exactly where these moments fall.

3. **"We have it" ≠ "the cloud routine has it."** A token existing on the student's
   machine, in their password manager, or in a local server does NOT mean the cloud
   routine can use it. The routine runs isolated on Anthropic's servers; every credential
   must be copied into the routine's own secrets before it can use them. Explain this
   plainly — it is the single most common point of confusion.

4. **"Vera, build my command center" IS the approval. Do not ask again (Stephanie, 09-09-2026).**
   Once the student has asked for the build, every technical step inside it is pre-approved:
   committing and pushing to their memory vault, merging, importing the repo into Cloudflare,
   deploying, turning on Access, narrowing the watch path, creating the morning routine, and
   running it once. Say in one line what you are doing as you do it; never stop to ask "may I
   push?" or "shall I create the routine?". A student who has to approve six invisible steps
   stops trusting the build. The ONLY stops are the ones in rule 1 and rule 2: a secret value, a
   card, a terms page, an OAuth grant, an account creation, and the two decisions only they can
   make (which business first, which metrics). Everything else, do.

5. **Never commit secrets or third-party PII into the repo, and never serve them.** The
   baked data file with personal/tenant data is git-ignored; the source map with email
   addresses lives *outside* the served folder. See `references/gotchas.md`.

6. **When something is genuinely faster for you to do in the browser and it's not a
   credential/terms/payment/OAuth step, take over and do it** rather than narrating
   clicks. `references/cloudflare.md` marks every "you drive" vs "they click" boundary.

7. **Every connected tool gets a SYNTHESIS, never a list, unless the owner asks for a list
   (Stephanie, 09-10-2026).** This applies to EVERY tool the page reads — Calendar, Slack, Email,
   and any other tool the student has connected (a task manager like Todoist, a CRM, GoHighLevel,
   a project board, anything). For each one, the panel says what matters today and why, in a few
   lines: what needs them, what changed, what is stuck, what is winning. It never reproduces the
   tool's own list. **A command center is not a to-do list**; the student already has the tool for
   that, and a page that repeats it gets closed. The rule of thumb is five items or fewer per panel,
   each one a judgement, and a link or a sentence pointing at the tool for the rest. **Why:** on
   the Week 4 dry run one student got every open Todoist item on her page and another got every
   transaction her coordinators were handling, because only Calendar, Slack and Email had synthesis
   instructions and Vera fell back to "here is everything, you decide." **If the student asks for a
   list** ("show me all leases expiring", "list the open tickets"), give them the list — that is the
   one exception, and it is theirs to make, not yours.

---

## The build, in phases

Do these in order. Each phase has a dedicated reference file — open it when you reach
that phase; don't try to hold it all in your head. Confirm completion of each phase with
the student before moving on.

### Before the session — the student does this alone, ahead of time
Everything in Cloudflare that needs THEIR login, THEIR card, or THEIR copy of a secret has no
dependency on the dashboard existing yet, so it comes out of the build session entirely. Send them
the Week 4 page. The steps are theirs to do from the page (a Loom video under each). The page's
"Copy the stuck prompt for Vera" button carries **`assets/prep-prompt.md`**, used ONLY when a screen
does not match: they paste it with the step number and a screenshot, and Vera gives the next click
from **`references/cloudflare.md` → "Before the session"**. They arrive with:

1. A Cloudflare account they can sign into.
2. Cloudflare's GitHub app authorized on their skills repo (the repo exists from Week 1).
3. Zero Trust switched on for the account: team name, Free plan, card on file, terms accepted.
   This is the most friction-heavy step in the whole build and it has nothing to do with the page.
4. A Cloudflare API token ("Edit Cloudflare Workers" template, scoped to their account) already
   pasted into their GitHub repo as the Actions secret `CLOUDFLARE_API_TOKEN`.
5. A read-only token for their database (Airtable: `data.records:read`, that base only) pasted into
   the same repo as the Actions secret `AIRTABLE_TOKEN`, and kept in their password manager so
   they can paste it once more into Cloudflare during the session.

**First thing in the session, verify the prep** (two minutes): they can open dash.cloudflare.com;
Workers & Pages → Create → Continue with GitHub shows their repo; the Access tab of any Worker no
longer says "Set up Zero Trust"; the repo's Actions secrets list shows both names. Anything missing
is done right then, before Phase 0, using the same checklist. **What cannot be done ahead:**
importing the repo and deploying, because Cloudflare builds what is on GitHub and the page does
not exist until Phase 2. A pre-session import would fail its first build, which is the confusing
moment this checklist exists to avoid.

### Phase 0a — WARM-UP: everything Vera can find out on her own (do this FIRST, before any teaching)
**Trigger:** the student pastes `assets/warmup-prompt.md`, or says "get me set up for the command
center build". On a live call this runs at the top, while Stephanie is still setting up, so the
build later is short. It works just as well solo, minutes or days before the build.

**In this phase Vera gathers and reports. She makes NO suggestions, asks NO questions, and writes
NO files.** The point is to arrive at the build already knowing the answers she would otherwise
have to stop and look up, and to arrive at the teaching with the student's own facts on screen.

1. **Make sure the skill is here.** If `command-center-builder` is not installed, install it:
   sync it from the student's memory vault (`skills/command-center-builder/`), or install the
   `.skill` file they were given. Say which version loaded.
2. **Verify the prep** (`references/cloudflare.md` → "Before the session"), four checks: they can
   sign into Cloudflare; GitHub shows as connected on Cloudflare's Create an application screen;
   Zero Trust opens to its own dashboard; both `CLOUDFLARE_API_TOKEN` and `AIRTABLE_TOKEN` are in
   the memory vault's Actions secrets. Report each as done or missing. **A missing one is a fact,
   not a lecture** — say what to do and move on.
3. **Inventory the connectors AND the accounts behind them, then stop there.** Not just "Gmail is
   connected" — **which Gmail addresses, which Slack workspaces, which calendar, which QuickBooks
   company**. That list is what question 4 of the intake is built from, and you cannot guess it
   later. List which of Airtable, Google Calendar, Slack, Gmail and QuickBooks are connected right
   now, each with its account names, and which are not connected at all. **Do NOT suggest
   connecting anything yet** and do not say what each one would unlock. That comes in the intake.
4. **Read their business.** The five foundational skills the Week 1 interview wrote (identity and
   positioning, ideal client, programs and offers, brand voice) plus their vault. You are learning
   how they actually make money and what they chase, because that is what makes your metric
   suggestions theirs instead of a copy of somebody else's dashboard.
5. **Read their Airtable base.** List the tables and note which hold real data versus which are
   empty or seeded. Many students have barely used Airtable; an empty base is normal and is NOT
   a problem to raise here. It just means more of their metrics will start as 🔒 placeholders.
6. **If QuickBooks is connected, check whether the books are current** — run the P&L and look at
   the last three months (`references/quickbooks.md`). Hold the finding; you will use it in the
   intake. Do not raise money yet.
7. **Report back in about eight lines, facts only.** Skill and version, prep four checks, what is
   connected and what is not, one line on what their business does, the tables that hold real
   data, and the books finding if there is one. End with one sentence: "That is everything I can
   work out on my own. When you are ready, say build my command center and I will ask you three
   questions." **Then stop.** Do not roll into the build.

### Phase 0b — THE INTAKE: one message, four questions, one reply
**⛔ HARD GATE: you may not create a file, a repo entry, a Cloudflare project or a routine until
this message has been sent and answered.** Everything after it is pre-approved (golden rule 4);
this is the one place in the whole build where you stop.

**Why this exists (Stephanie, 09-09-2026).** A build ran that never asked which metrics to show
or whether to put money on the page, so the student got a copy of somebody else's dashboard. The
opposite failure is just as bad: an open-ended design conversation that never reaches a live page.
One message with your recommendation already on each line solves both. The student replies once.

**Send ONE message, in this shape** (full template with worked examples in
`assets/intake-message.md`):

> Before I build, four things. My pick is on each, so reply "go" to take them all, or tell me
> what to change.
> 1. **Which business first.** *(Skip this question entirely if they have one business.)* Name
>    their businesses, say you will make a tab for each and fully build ONE today, name which one
>    you would start with and why, and say the others get placeholders you fill in later sessions.
> 2. **Which numbers.** Suggest four to six, each one they would act on TODAY if it moved the
>    wrong way. Draw them from BOTH sources: the tables in their base that hold real data, AND
>    what you learned about their business in the warm-up. **A metric that matters to them but
>    has nothing feeding it yet is still worth suggesting** — say so plainly and it becomes a 🔒
>    placeholder naming what it needs, which is the honest to-do list. Never install a default set.
> 3. **Money in and out.** Say what you found in the books, then ask. Books current: "rent income
>    posts through August, so money in and out will be accurate — want it on the page?" Books
>    behind: "your books show no income since May, which usually means deposits are sitting
>    uncategorized, so a money panel would read zero and be wrong — I would leave it off until
>    that is caught up. Agree?" QuickBooks not connected: "not connected, so money is off for now;
>    connect it any time and I will add it."
> 4. **Which account feeds which business.** Show the routing map you would use, built from the
>    accounts you listed in the warm-up, and ask them to correct it. This is the question they are
>    most likely to have to fix, because **you can guess an email domain but you cannot guess a
>    Slack workspace** — on the reference build a workspace literally named "the-lean-landlord"
>    held a different company's channels. Rules for building the guess: a dedicated inbox on a
>    business's own domain routes entirely to that business; **a catch-all personal inbox feeds
>    EVERY business, listed once per business with its own filter**, so the same address legitimately
>    appears more than once; one calendar holding everything is normal and gets sorted per event by
>    reading what the event is about, so propose two or three keyword hints per business; QuickBooks
>    holds one company file, so name the single business page its money lands on.
> Then one line, not a question: which colours you are using (theirs if you already know them,
> otherwise The Lean Landlord palette) and that "change the colours" is one sentence away later.

**Keeping it to one round trip:**
- **One message, one reply, then build.** If they answer two of three, take your recommendation on
  the third, say which you took, and start.
- **If they ask something back, answer in one line and re-ask only what is outstanding.** Never
  more than two rounds. A third round means you are designing, not building.
- **Anything else they raise mid-build gets "noted, we will do that once it is live."** The page
  is edited by asking, so deferring costs them nothing and costs the session everything if you
  do not.
- **Never re-open a choice they already made.** Cap the numbers at six; if they want a seventh,
  ask which comes off.

### Phase 0c — The shape, settled without asking
These are decided by rule, not by conversation. Do not spend intake questions on them:
- **One business = one page.** No tab bar: HQ content on top, the company below.
- **Two or more = a tab per business plus HQ**, every tab created on day one, **only the one they
  named in question 1 populated**. The rest carry honest 🔒 placeholders and get filled one per
  later session. One company done properly beats three done halfway.
- **The HQ page is called HQ** unless they say otherwise.
- **Only tools they have already connected.** Anything else is a 🔒 placeholder naming the tool;
  it fills the first morning after they connect it. No API tokens, no self-hosted mail server, no
  per-workspace Slack keys on day one (`source-map.md` and `_advanced` in
  `sources.template.json` cover the student who later outgrows a connector).
- **Every company page gets Calendar, Slack, Email and Power Move** on top of its numbers, plus
  one synthesized panel per OTHER connected tool (task manager, CRM, project board). Every one of
  those panels is a synthesis, not a list — golden rule 7.
- **Brand: use theirs only if you ALREADY know it** — hex colours in the Week 1 foundational
  skills, or a brand book in their vault's `sources/`. Otherwise **default to The Lean Landlord
  palette and move on**: terracotta `#C4622D` accent, ink `#1C1C1C`, cream `#F9F7F4` ground,
  border `#E0DEDA`, muted `#6B6B6B`, light header `#fbf9f4`, heading serif Fraunces. Do not read
  their website, do not ask for hex values.
- **Hosting: Cloudflare Workers static assets + a scheduled refresh**, code in their own GitHub
  repo. `references/architecture.md` has the reasoning against the alternatives.

### Phase 1 — The page (`index.html`)
Build the page. Use `assets/index.template.html` as the starting point — it already has HQ +
per-company tabs, the palette tokens, the render logic, the 🔒 "add credential" states, and
the charts. Fill in the student's companies, brand tokens, and database field IDs. For a
single-business student, collapse HQ and the company into one page (no tab bar). **There is
no hand-seeded briefing any more**: the numbers connect the moment the baker runs, and the
written briefing is generated for real at the end of Phase 5, in the same build session. Until
then the HQ section shows its one-line "not generated yet" note, which is honest and lasts
minutes. Preview locally (serve the folder, open it) before deploying. Details + the exact
token list: `references/architecture.md` → "Building the page."

### Phase 2 — The database baker (structured metrics)
If a company has a real database, write/adapt the baker that reads it and writes
`data.json`. The reference build reads Airtable via REST with a read-only token and does
all aggregation in the baker. Use `assets/bake.mjs` as the reference implementation and
`references/architecture.md` → "The baker" for how to remap it to the student's own base,
tables, and fields. Key discipline: the baker owns `data.json` and nothing else; it runs
in the cloud build with the token as a build env var; `data.json` is git-ignored.

### Phase 3 — Deploy on Cloudflare (about ten minutes, you drive nearly all of it)
With the prep done, this phase is: import the repo (Workers "Import a repository" flow), set
the build and deploy commands, add `NODE_VERSION` and the database token (ask the student for the
read-only Airtable token in chat, then type the name AND paste the value yourself and click
**Encrypt**), deploy, visit, protect the Worker behind Access (policy: Cloudflare account
members), narrow the build watch path to `command-center/*`. Follow **`references/cloudflare.md`**
→ "In the session" exactly; it carries the field-input quirks (some fields drop the first typed
character — prepend a throwaway one) so you don't fight the UI. **There is no student click left
in this phase**; you drive all of it. If the prep
was skipped, the account half of `cloudflare.md` is done first, in the session, and the phase
takes closer to forty minutes.

### Phase 4 — The source map (multi-account inputs)
**This is no longer a conversation — it is writing down what they answered in intake question 4.**
Do not re-open it. Record the routing they confirmed in `sources.json` (template:
`assets/sources.template.json`), which lives **outside** the served folder. **Every `via` says `connector` on day one.** The same file records
their chosen `metrics` per company. This is the heart of making it work for any
student's accounts. Full pattern — dedicated vs. shared/"wildcard" inboxes, Gmail labels +
LLM fallback, per-workspace Slack tokens, connector vs. direct-API access, and the exact
JSON schema — is in **`references/source-map.md`**. A student with one Gmail and one Slack
fills in one line each; a power user with an account per business maps each one.

### Phase 5 — The morning briefing (a cloud routine, created automatically, first run now)
Regenerate `personal.json` each morning from the source map and push it (Cloudflare
redeploys). **Vera does this phase without being asked and without asking, as the last step of
the build** (rule 4: creating the routine and running it once are inside the approval the student
already gave):

1. **Create a scheduled Claude cloud routine** (the `schedule` skill / RemoteTrigger): daily at
   5am their local time (cron in UTC), model Opus, the student's repo attached as a source, and
   every connector they have already connected attached (`mcp_connections`: Calendar, Slack,
   Gmail, Airtable, QuickBooks as applicable). Its prompt is `assets/routine-prompt.md`, filled
   in. No question to the student; the routine IS the deliverable.
2. **Run it once right now** (`RemoteTrigger run`) and watch for the commit. Cloudflare
   redeploys on the push. Open the page and show them their real HQ and company content within
   minutes of the build finishing. This replaces the old hand-seeded briefing entirely.
3. Tell them: "From tomorrow this rewrites itself at 5am, laptop open or closed."

**Why the cloud and not a row in their Daily Routines table (settled by Stephanie 09-08-2026).**
Every day-one source is a claude.ai connector, and connectors work from a cloud routine; the
repo is attached, so the push works too (proven on the reference build, five mornings running).
A routines row runs only when the student opens Claude on their machine, so the briefing would
be as late as their morning. The cloud routine fires at 5am regardless. The only thing a cloud
routine cannot reach is something local to their machine (a self-hosted server, a local MCP
server), and a connector-only student has none. **A routines row is the fallback for a source
that is local**, not the default. Vera's manual's one-scheduled-task rule is about tasks on the
machine and does not forbid this.

**One trap that IS real: a cloud routine can report SUCCEEDED while doing nothing** (a previous
Cowork-based routine did exactly that for weeks). So never trust the status flag: watch for the
commit on the briefing file and read the run log the first time. `routine.md` has the full
detail, the secrets a power user may need, and the graceful "🔒 pending" behavior.

### Phase 6 — Fill the padlocks, later, one per session
A 🔒 on a company page means one of two things, and the note under it says which:
- **A tool they have not connected yet** (the day-one case). The fix is the student connecting
  it on claude.ai; the panel fills on the next morning run. Nothing to paste.
- **A source reached by API instead of a connector** (advanced, only if they later outgrow a
  connector: a second Slack workspace, a self-hosted mail server). Then a secret has to be
  handed to the morning run, and the note names it.
Connectors carry their own login, so **a connector-only student never pastes a secret in this
phase.** Do one padlock per session and confirm each; the other company tabs from Phase 0 are
filled the same way, one company per session.

### Phase 6b — money in / money out (QuickBooks)
**Not opt-in by the student any more (Stephanie, 09-09-2026): you check the books in the warm-up
and OFFER it as question 3 of the intake.** A student who does not know the option exists never
asks for it, which is why the first real build shipped without money on the page. Build it if they
said yes. Read **`references/quickbooks.md`** first.
The short version: it runs through the **QuickBooks connector on the morning routine** (never
send a student to the Intuit REST API — it needs a developer app and a compliance review that
takes days), it lands in `personal.json` under the owning company, and there are two traps that
will otherwise bite you. **Check the books are current before building** — a QBO report shows
only POSTED transactions, so uncategorized deposits sitting in "For Review" read as $0 income
and the panel will confidently display a wrong number every morning. And **the connector's
computed totals are wrong** — read the named `Income` / `Cost of Goods Sold` / `Expenses` rows
and never sum the account maps.

### Phase 7 — Record + hand off
- Update the student's own skills/automation catalog if they keep one.
- For Stephanie's own copy: update the Sunrise Airtable skills catalog (see the
  skill-creator "Sunrise rule").
- Leave the student with: their live URL (say it out loud and put it in the chat), how they log
  in (their Cloudflare email and password, remembered for a day), that they should save it to their
  phone's home screen and bookmark it on the computer, that "what is my command center address?"
  gets it back any time, how it refreshes, and how to ask you to change it later ("change X on my command center" → you edit the repo files,
  push, it redeploys).

---

## How to run this with a student (interaction style)

- **One piece at a time.** This build has a lot of moving parts. Resist doing five things
  at once — the reference build went cleanly precisely because each source (Gmail, then
  Slack, then Calendar) was mapped and confirmed on its own.
- **Explain the why, not just the click.** They're learning a system they'll own. When you
  hit a fork (connector vs API, replace vs keep, labels vs LLM), give them the tradeoff and
  a recommendation, then let them choose.
- **Show, don't assert.** Preview locally and screenshot; deploy and verify; test-run and
  read the result back. Never tell them it works — show them.
- **Protect their live site.** Don't leave a half-finished `index.html` sitting modified on
  disk in a repo that auto-syncs — it can deploy an intermediate version. Revert drafts you
  aren't ready to ship (see `references/gotchas.md`).

---

## Reference files (open as you reach each phase)

- `references/architecture.md` — the whole design, why each choice was made, and how to
  build/adapt the page and the baker. Read first.
- `references/cloudflare.md` — click-by-click Cloudflare deploy + Access, with the
  drive-vs-handoff boundaries and UI quirks.
- `references/source-map.md` — multi-account Gmail/Slack/Calendar mapping, connector vs
  API, labels + LLM fallback, and the `sources.json` schema.
- `references/routine.md` — creating, prompting, securing, and testing the morning cloud
  routine.
- `references/decisions.md` — every decision made on the reference build and its outcome,
  so you can offer sane defaults and explain them.
- `references/metrics.md` — the metric catalog Vera offers, how to run the choice, and the
  rules that keep the page honest.
- `references/quickbooks.md` — OPTIONAL money in/out: why the connector and not the API,
  checking the books are current first, and the connector's broken totals.
- `references/gotchas.md` — the traps we hit and how to avoid them.

## Asset templates (copy and fill in)

- `assets/index.template.html` — the dashboard page (HQ + per-company tabs, palette tokens,
  render logic, 🔒 states, charts).
- `assets/bake.mjs` — the database baker (Airtable reference implementation).
- `assets/wrangler.jsonc` — Cloudflare Workers static-assets config.
- `assets/refresh-data.yml` — GitHub Action that refreshes `data.json` on a schedule.
- `assets/sources.template.json` — the per-source→company map.
- `assets/routine-prompt.md` — the morning routine's full prompt.
- `assets/PLACEHOLDERS.md` — every placeholder token across the templates and what to
  replace it with; open it alongside the templates you're filling in.
- `assets/prep-prompt.md` — the prompt behind the Week 4 prep page's copy button; a student pastes
  it into a new Vera chat to be guided through the before-the-session account steps.
- `assets/warmup-prompt.md` — what the student pastes to start the warm-up (Phase 0a): Vera finds
  out everything she can alone and reports facts, no suggestions and no questions.
- `assets/intake-message.md` — the ONE message Vera sends before building (Phase 0b), with the
  three questions, two worked examples and the one-round-trip rules.
