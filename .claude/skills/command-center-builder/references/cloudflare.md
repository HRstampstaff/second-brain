# Cloudflare — deploy, lock down, and schedule (click-by-click)

This is the exact flow that worked on the reference build (Sept 2026, the *new* unified
Workers UI). Cloudflare changes its UI; if a screen differs, the *principles* still hold —
build command → deploy command → variables → deploy → Access.

## Two halves: before the session (student alone) and in the session (you drive)

Everything in Cloudflare that needs the student's login, card, agreement or a secret value has
NO dependency on the dashboard existing, so it moves ahead of the build session (decision 35,
09-08-2026). The session then only imports and deploys. Rule of thumb for the in-session half: the read-only Airtable token is yours to handle (ask for
it in chat); a card, a password, a write-capable token or an agreement is still theirs. **Don't
screenshot while any secret is visible**, including the one you are pasting.

### Before the session — the student does these alone

These are the student's steps, written the way the Week 4 page writes them (Stephanie corrected the
wording from a real screen on 09-09-2026; keep to it). Vera's role here is ONLY the "stuck" helper:
the student pastes the stuck prompt (`assets/prep-prompt.md`) with the step number and a screenshot,
and Vera reads the screenshot and gives the next click. Vera does not narrate the steps unprompted.

| Step | Depends on | The clicks, in the page's words |
|---|---|---|
| 1. Create the Cloudflare account | nothing | dash.cloudflare.com → Sign up, the email they check daily, confirm the verification email. Done when they can sign in. |
| 2. Let Cloudflare see the memory vault | their GitHub repo (Week 1) | Sign in at dash.cloudflare.com → the **search box at the top**, type Workers, choose Workers & Pages (it is not in the left menu on a new account) → **Create application** → **Connect to GitHub** → a GitHub window: their own login if asked, pick their GitHub account → Repository access: **Only select repositories**, pick the memory vault → the bottom button reads **Install & Authorize or Save** depending on the screen (GitHub may re-ask the password) → they land back in Cloudflare on the **Create an application** screen. **Stop there**: no repository picked, nothing that says Deploy or Save; close the tab. Done when they are back on Create an application with GitHub connected. If they do not know the vault's name: github.com → profile picture → Your repositories → the one Vera set up in Week 1 (it holds folders like skills and wiki); or ask Vera. |
| 3. Turn on the login gate (Zero Trust) | nothing | From the Cloudflare dashboard: **Zero Trust in the left-hand menu → Get Started** (or one.dash.cloudflare.com if they closed it) → team name (Cloudflare asks; anything works, do not make it a step) → Free plan → checkout: billing address, **credit card**, terms. Expect no charge at this size. Done when Zero Trust opens to its own dashboard. |
| 4. Cloudflare API token → GitHub | nothing | Cloudflare: **profile icon top right → Profile → API Tokens → Create Token** → "Edit Cloudflare Workers" → Use template → **scroll down to Account Resources, open the dropdown after Include, select their account** → Zone Resources: All zones → Continue to summary (must list Workers Scripts: Edit) → Create Token → copy once. Then GitHub: open the memory vault ITSELF (profile picture → Your repositories → the vault), click the vault's **own Settings tab across the top of the repository page, not the profile Settings** → Secrets and variables → Actions → New repository secret → **paste the token into the Secret box FIRST, then type the name** `CLOUDFLARE_API_TOKEN` (copying the name from the page overwrites the clipboard and loses the token) → save. Done when the vault's Actions secrets page lists it. |
| 5. Read-only Airtable token → save it, then GitHub | their Airtable | Airtable: account icon → Builder hub → Personal access tokens → Create token → name like command-center-read → **Access: only their operating base** → scope only `data.records:read` → create, copy once (starts with pat). **SAVE IT FIRST**: into their password manager or a locked phone note, before closing the Airtable window; this saved copy is what they come back to in the build session (a Cloudflare field needs the same token). Then GitHub: the vault's Actions secrets the same way as step 4, **token into the Secret box first, then the name** `AIRTABLE_TOKEN`. Never into a chat with Vera; a lost one is re-created in the session. The page no longer says "save it twice"; it says save it, use it, keep it. |

**Traps to say out loud:** Account Resources is empty by default and the form lets you create a
useless token; a 404 on the GitHub secrets page means not signed into GitHub in that browser; the
GitHub Settings they need is the repository's tab, not the profile menu. The Week 4 page carries a
Loom video under each step; point a stuck student at the video before anything else.

### In the session — you drive, the student pastes one value

| Step | Who | Why |
|---|---|---|
| Verify the prep (sign in works; Continue with GitHub shows the repo; Zero Trust is on; both Actions secrets exist) | **You** | two minutes; anything missing is done now from the table above |
| "Create application" → "Continue with GitHub" → select the repo | **You** | navigation |
| Fill project name, build command, deploy command, root directory | **You** | plain text fields |
| Add build variable `NODE_VERSION = 20` | **You** | not sensitive |
| Add the database token variable — the **name** | **You** | a field name |
| Ask the student in chat for the read-only Airtable token, paste the **value** yourself, click **Encrypt** | **You** | the one credential exception (09-09-2026): read-only, one base, re-issued free. Say in one line that it will sit in the chat history and can be revoked in Airtable. |
| Click **Deploy** | **Student** (or you, after confirming) | the irreversible click |
| Watch the build log, read errors, fix code | **You** | verification |
| Click **Visit**, confirm the page renders | **You** | verification |
| "Protect this Worker behind Access" → All traffic + Cloudflare account policy → Apply | **You** | configuration (Zero Trust already exists from the prep) |
| Verify the gate from a browser that's *not* logged in | **You** | verification |
| Settings → Builds → narrow the watch path to `command-center/*` | **You** | configuration |
| `gh workflow run` the refresh Action and watch it go green | **You** | proves the two secrets from the prep work |

**What cannot move ahead:** importing and deploying. Cloudflare builds what is on GitHub; before
Phase 2 there is no `wrangler.jsonc`, no baker and no page, so a pre-session import fails its first
build. Ten minutes in the session is the right price.

## Prerequisite: the files are on GitHub
Cloudflare builds from what is *on GitHub*, not the student's disk. Before connecting,
confirm the repo contains `wrangler.jsonc` (repo root), `command-center/bake.mjs`,
`command-center/public/index.html`, and the workflow. Push them yourself (your `gh` login
usually has the `workflow` scope that a note-syncing tool like Obsidian's git plugin lacks —
a `.github/workflows/*.yml` push fails without it). Commit **only** the command-center
files; don't sweep unrelated changes.

## 1. Import the repo (Workers flow) — in the session
1. dash.cloudflare.com → **Workers & Pages** (on a new account it is not in the left menu; use the
   top search box, type Workers, pick Workers & Pages) → **Create application**. (A tiny link at the
   bottom, "Need to use the legacy Pages workflow? Continue to Pages," still exists — don't
   use it; we build for Workers static assets.)
2. **Continue with GitHub** (a green dot means GitHub is already connected, which the prep
   guarantees — no OAuth handoff). Select the repo → **Next**.
3. **Set up your application:**
   - **Project name:** e.g. `command-center` (becomes `<name>.<subdomain>.workers.dev`).
     Match the `name` in `wrangler.jsonc`.
   - **Build command:** `node command-center/bake.mjs`
   - **Deploy command:** `npx wrangler deploy` (pre-filled; leave it)
   - **Root directory:** leave as repo root (the root `wrangler.jsonc` points assets at
     `./command-center/public`)
   - "Builds for non-production branches": fine either way.
4. **Advanced settings** → **API token: "Create new token"** (leave — Cloudflare auto-creates
   its own deploy token; this is *not* the student's secret).
5. **Variables** (still in Advanced settings): add
   - `NODE_VERSION` = `20` — you type both.
   - `<DATABASE_TOKEN_NAME>` (e.g. `AIRTABLE_TOKEN`) — you type the **name**; the student
     read-only Airtable token in chat, then YOU paste it into the value box and click **Encrypt**
     (stores it as a masked secret). No keyboard handoff.
   Adding both here means the *first* build succeeds instead of failing on a missing token.
6. **Deploy.** Build phases: Initializing → Cloning → Installing → Building → Deploying.
   "Building ✓" means the baker ran (its summary line appears in the log). Deploying runs
   `npx wrangler deploy` (it downloads wrangler; a minute or two). The log then prints the
   live URL. The log pane sometimes stops streaming — reload the page to refresh it.
7. **Visit** → the page should render with live numbers. Verify each tab.

### `wrangler.jsonc` (repo root) — see `assets/wrangler.jsonc`
```
{ "name": "<project-name>", "compatibility_date": "2025-09-01",
  "assets": { "directory": "./command-center/public" } }
```
No `main` — an assets-only Worker. Deploying it will warn that `workers_dev` and
`preview_urls` default to enabled; harmless.

## 2. Lock it down — Cloudflare Access (private login gate)
Zero Trust is already on from the prep. If the Worker's **Access** tab still says "Set up Zero
Trust for this account," the prep was skipped:
1. **Set up Zero Trust** → onboarding: team name, **Choose a plan → Free**, then a **checkout
   page** (billing address, payment card, Terms of Service, and an authorization to charge for
   usage *beyond* free limits). **This is the student's screen** — card, address, terms. Tell them
   plainly: for an Access gate with a handful of logins they stay well within free limits, but
   they *are* putting a card on file. (If they refuse the card, the fallback is HTTP Basic Auth
   coded into the Worker — real privacy, no Zero Trust. Offer it.)
2. On the Worker's **Access** tab → **Protect this Worker behind Access**:
   - **Scope: All traffic** (not "Previews only" — the default; switch it).
   - **Authentication policy → Add policy → "Cloudflare account"** ("Only members of this
     Cloudflare account can reach this Worker") — the simplest, tightest gate for a solo
     owner. Session 24h. **Apply Access.**
3. **Verify** by loading the URL in a browser that is *not* logged into the student's
   Cloudflare (the in-app preview browser works): it must redirect to a "Sign in ·
   Cloudflare Access" page. That's proof. Tell the student their login = their Cloudflare
   account (email + password); no new password was created.

## 3. Stop unrelated pushes from burning build minutes
Default **build watch path** is `*` — *every* push to the repo (including a note-sync
tool auto-pushing notes) triggers a rebuild and can exhaust free build minutes fast.
Settings → Builds → **Build watch paths → Include paths**: remove `*`, add
`command-center/*`, **Save**. Now only dashboard changes build.

## 4. The refresh Action needs a Cloudflare API token — normally done in the prep
If both Actions secrets already exist in the repo (the prep), skip to the last sentence. Otherwise:
Cloudflare → profile → **API Tokens → Create Token → "Edit Cloudflare Workers"** template.
You (Claude) can prepare the form: **Account Resources → Include → <the student's
account>** (it's *empty* by default and must be set), **Zone Resources → All zones** (the
template's Workers Routes permission wants a zone; leave "Specific zone" empty and it
may block), then **Continue to summary**. The summary must show **Workers Scripts:Edit**.
Then **hand off**: the student clicks **Create Token**, copies it (shown once), and pastes
it as the GitHub Actions secret `CLOUDFLARE_API_TOKEN`, alongside `AIRTABLE_TOKEN` (the
same read-only database token). Then you can `gh workflow run` the Action and
`gh run watch` it to prove the 2-hour refresh works end to end.

## UI quirks that will waste your time if you don't know them
- **Some Cloudflare text fields drop the first character you type** through the browser
  automation (typed `NODE_VERSION`, got `ODE_VERSION`). Prepend a throwaway character
  (`XNODE_VERSION` → `NODE_VERSION`). *But not every field does this* — the watch-path
  chip field kept the `X`. Type, screenshot, verify, fix.
- **⌘A doesn't select-all** in those fields. Clear with `End` then repeated `Backspace`.
- **Clicking a settings anchor in the right rail (e.g. "Builds") doesn't scroll** — scroll
  the page yourself.
- **GitHub shows a 404, not "access denied," for a private repo's settings when you're not
  signed in.** If the student "gets a 404" on the secrets page, they clicked it in a
  browser that isn't logged into GitHub. Open it in the logged-in one.
- **The Workers flow has no "deploy hook"** and "Triggers cannot be added to a Worker that
  only has static assets." Don't plan a refresh around a hook — use the GitHub Action.
- **Build variables vs runtime variables:** the Settings page says "Variables cannot be
  added to a Worker that only has static assets" — that's *runtime*. Build-time variables
  (the token, NODE_VERSION) live under **Settings → Builds → Variables and secrets** and
  work fine.
- Cron is **UTC** everywhere; a 5am-local schedule shifts by an hour when daylight time
  ends. Note it for the student.
