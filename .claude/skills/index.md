# Skills manifest

Everything in the library, with the version your assistant compares against. One folder per skill
under `skills/<name>/`, holding its `SKILL.md` plus anything it needs.

Some files outside `skills/` are part of the system and are versioned the same way:

| File | Version | What it is |
|---|---|---|
| `reference/how-we-work.md` | 4.3 | **The rulebook. The only copy.** Vera reads it every session; the specialists carry a short floor from it and nothing else |
| `reference/troubleshooting.md` | 1.3 | **For the owner to read, not for you to recite.** Symptoms in the words an owner would use, what is usually behind each one, and the prompt they give their own assistant so they diagnose it themselves. Setup and first-connection problems are NOT here, they stay in `download/vera-setup.md`, and neither file repeats the other. 1.1: says plainly that a cloud session cannot see their computer, so machine questions get asked from a local one. 1.2: adds the morning routine section, why the routines page on the website cannot make the one that runs on your own machine, what to do when a morning does not fire, and the permission stall. 1.3: the same confusion from the OTHER direction, asking for a routine and landing on a Cloud screen, with the line drawn properly. Cloud CAN use the connections you linked on claude.ai, Drive included, so that is not the blocker; what it cannot do is open a file on your own computer or use a site you are signed in to. Local is still the recommendation, because nobody has proven those connections behave the same on an unattended scheduled Cloud run |
| `reference/why-this-stack.md` | 1.1 | **For you to think with, not to recite, and not written for the owner to read.** Why Claude, Airtable and n8n rather than nine tools that need wiring to each other, plus the platforms nobody gets to choose because that is where the tenants, the money and the listings already are. Why all-in-one property software fits furnished mid-term renting worst, and where it IS the right buy. The one test for whether a visual database earns its cost. Airtable's honest weakness, that it reports a record changed but never which field. Why a platform with no API costs you forever. And the people section, which is the heart of it: automation multiplies an operator rather than replacing one, the order that gets it right, the split between deciding and doing, and the two things that make handing the automation layer over safe rather than blind. Read it before answering "why these tools", "should I buy property software", "why not a spreadsheet" or "will this replace my VA". Plus both branches of the hiring decision, handled honestly: what an owner genuinely gets by hiring nobody and what it costs them, the observable signs they have crossed the line, the few-hours-a-week middle option, and if they do hire, the checklist, what to hire for, what to hand over first, and the failure mode of a badly briefed operator |
| `templates/your-base.template.md` | 4.1 | The empty snapshot Vera copies into your own repo and fills in from your base |
| `templates/repo-layout.template.md` | 1.1 | The standard folder layout and naming for your second brain. Vera copies it into your repo as `reference/repo-layout.md`; you may change it and she follows your copy |

## Your team

You talk to Vera. She loads first and hands work to the other three.

| Folder | Version | What it does |
|---|---|---|
| `vera/` | 4.48 | Chief of staff. Keeps your skills current, runs the daily pass, routes everything, holds anything legal. 4.43: a refused git push is urgent on Cloud and harmless on Local, because a Cloud container is reclaimed and unpushed work in it is gone. 4.42 added the ordered check for a repo that will not show in the Cloud picker. 4.44: "set this up as a routine" means a row in the routines table, never a second schedule and never a scheduled cloud agent, which cannot reach their connectors anyway. 4.45: the good-morning thread is named by passing "self" as the session id, which renames the session you are in without looking anything up and cannot touch your other open threads 4.46: how API keys are handled. One file in your vault holds every key Vera uses and she looks there first; a key another system uses lives in that system and is never copied into the repo; two things needing the same service get two separate keys; and a key never goes inside a script. Says plainly that this is built for speed rather than security, and that making it stricter is your call as long as it does not slow the work down 4.47: an owner who already has their own assistant merges it into Vera, because there must only ever be ONE central skill and two of them disagree with each other in ways nobody can see. Their business, preferences and processes cross over, the general operating rules do not, their assistant's NAME is taken immediately because it costs nothing, their old folder is retired rather than deleted, and Vera's own folder stays named vera so the library does not reinstall a second one |
| `tessa/` | 4.2 | Tenants and applicants: enquiries, applications, leases, tenancy messages, renewals, move-out, listings |
| `fiona/` | 4.2 | Money: rent and arrears, deposits, part months, charges, your own insurance renewals |
| `owen/` | 4.2 | Property: repairs, contractors, turnovers, seasonal work, post, access codes, filing |

## Your tools

**One skill per tool, loaded BEFORE the tool is touched.** Each one holds how that tool really
behaves, not how it looks: the traps, the things that fail silently, and the jobs it should not be
used for. A tool with no skill here gets a placeholder and a parked row on your hub, and the
placeholder is filled in the first time you actually work with that tool. See `skill-creator/`.

| Folder | Version | What it does |
|---|---|---|
| `airtable/` | 1.1 | **Load before ANY work on the hub.** Reading your own schema instead of assuming one, fields you cannot write, linked records, the dropdown that silently invents junk options, deleting safely, and when a job belongs to an automation inside the base instead of to your assistant. **v1.1: receiving a base someone shared, and giving one away.** A share link plus Copy base never brings the automations; the route that does is an email invite with Creator permission onto a duplicate, which you then duplicate into your own workspace, and the automations arrive switched off |
| `github/` | 1.2 | **Load before any question about how their repos are organised.** The repo is the smallest thing you can give someone access to, so repo boundaries are drawn by access and never by tidiness; one assistant across many repos rather than one each; pointers instead of copies; and what does not belong in a repo at all (1.1: files and images go to Drive, the repo keeps an index pointing at them) (1.2: index from now on, never a retroactive sweep) |
| `google-drive/` | 1.6 | **Load before ANY Drive work.** The connector really does rename and move, but it CANNOT change the contents of a document that already exists, which is why people get sent to a terminal for what feels like a small edit. Also: the Memory Vault must be set up first, sharing so files are visible, and never reporting a move you have not read back (1.5: every file that matters gets a row in the vault document index) (1.6: index from now on, never a retroactive sweep) |
| `gmail/` | 1.0 | **Load before ANY work in your mailbox.** Drafts only and never sends, replying inside a thread, searching properly, labels as a queue rather than decoration, and getting what matters out of the mailbox and into the hub |
| `turbotenant/` | 1.0 | **Load before ANY work on the rent platform.** No connector exists and what that means, the device check at sign-in that cannot be switched off, how charges actually reach a tenant, and what to do when the platform and the hub disagree about money |
| `quickbooks/` | 1.4 | **Load before touching the books.** Reading reports and drafting entries you post yourself, tracking money per property, and the bank feed trap that double counts. Plus three things measured on real books: the reported connector bug that says connected while never sending you to Intuit to sign in (specific, not universal, so match the symptom, and it is a user report with no vendor reply since May 2026, so never promise a fix), the `profile_info_required` refusal that is really a missing industry on the QuickBooks profile, and the fact that the connector's own totals are WRONG so you copy the named rollup rows and never sum or compute them. And the check that comes before believing any number, which is whether months of income are still sitting uncategorised in For Review |
| `docusign/` | 1.0 | **Load before getting anything signed.** You prepare and the owner sends, why a document out for signature cannot be quietly corrected, templates, signing order, and filing what comes back |
| `furnished-finder/` | 1.0 | **Load before touching a Furnished Finder inbox.** Why the notification email is nearly empty, the message box that sends on its own, the two names one listing has, and what must stay on the platform |
| `google-sheets/` | 1.0 | **Load before reading or writing a spreadsheet, and before agreeing something should be one.** Your old spreadsheets as the best history in the business, importing without silently corrupting it, and the three jobs a sheet still does best |
| `n8n/` | 1.4 | **Load before building an automation, and before agreeing it needs one.** The four-way decision that comes first, naming, credentials, testing for real instead of trusting a green tick, why a run history full of ticks proves nothing, how repairing one step breaks the next, why a flow that waits for a person can only hold one conversation and has to be split into a sweep plus one run per record, and the failures that cost the most time |
| `connect-quickbooks-to-n8n/` | 1.3 | **Load before wiring QuickBooks into n8n, and before promising it can be done today.** The real wall is Intuit's review of your developer app, not the build: an app starts in development with sandbox keys only, and production keys arrive only after the App details form and the Compliance questionnaire are done and Intuit reviews them over several days, private one-company use included. Also: why the sandbox returns "there is no Sandbox account" and is a dead end for real books, copying the redirect URL from your own n8n screen into the app's Production list rather than a guide's, setting Environment to Production inside the credential, the Company ID that the connection does not give you, pinning the minor version, and the only finish that counts, which is a live read of data the owner recognizes as their own. **v1.1: it has now been done end to end.** Submitted 09-01-2026, production keys granted 09-03-2026, credential connected first try because the traps were read before the forms were touched, so the real cost is the wait plus the forms. Adds the half that comes after connecting: n8n's native QuickBooks node has no Class, no Account and cannot CREATE a Purchase, so calls go through HTTP Request nodes on the predefined QuickBooks OAuth2 credential, and the credential plus the Company ID live in ONE sub-flow every other flow calls. **v1.2 opens with the decision that should come first: it costs about two hours of forms, then several days of waiting, plus published legal pages and several steps only the owner can do, so it is worth it ONLY if the automations it unlocks save many hours every month. If they only need to read the books, the connector does that in a few clicks and none of this is needed. What is easier now is that the traps are written down, which changes the frustration and not the clock** |
| `skyvern/` | 1.0 | **Load before driving a site that has no connector.** When to use it versus a connector versus your own browser, what it costs, writing goals it can follow, the two kinds of two-factor, and keeping runs cheap |
| `smartthings/` | 1.0 | **Load before touching a smart lock, and before agreeing to set one up.** The prerequisite to raise first (a public web address you control, free to get if they have none), why a code change can report success while the door never changed, why an unnamed code may be the one you most need to keep, and why two locks in the same house answer the same command differently |
| `slack/` | 1.0 | OPTIONAL, and only if you already work in Slack. The one failure that explains nearly every missing message, how many channels to have, and why most things people want posted are really tasks |
| `netlify/` | 1.0 | OPTIONAL. Where a hand-built site actually lives: publishing, the stored-settings step everyone forgets, domains and certificates, and what the free tier really means |

## How you work

| Folder | Version | What it does |
|---|---|---|
| `cloud-vs-local/` | 2.1 | **Load before answering any "can Cloud do X" question.** Which jobs belong in a Cloud session and which need Local, what Cloud genuinely cannot do, and the rule that these are settled by testing rather than by reasoning. Every claim carries an evidence label |
| `second-brain/` | 1.1 | Builds a written memory of your business your assistant reads at the start of every session (1.1: git steps run one at a time, a joined `&&` command is what gets refused) |
| `landlord-inbox-handler/` | 1.2 | Reads your email and turns it into what needs doing today, drafting replies you send yourself. Feeds the day plan rather than producing a second thing to read |
| `daily-brain-feed/` | 1.1 | OPTIONAL. Feeds your Memory Vault every day from your emails and meeting transcripts. The opposite of the inbox handler: it keeps what changes how the business runs and throws away what merely needs doing. Heavy on reading, so only for owners with many conversations |
| `drive-organizer/` | 1.1 | Turns a messy Google Drive into a clear structure, previewing before it moves anything |
| `file-namer/` | 1.2 | Gives every document one consistent name and one correct home |
| `document-to-template/` | 1.0 | Turns a document you send repeatedly into a signature-ready template: `{{tags}}` where the data goes, numbered anchors where the signing fields go, and the tag-to-field map your automation needs. It never asks which field feeds a tag — it proposes one and shows you a real value, because recognizing a number is easy and recalling a field name is not. Carries the two failures that ruin finished documents: tags styled to stand out hand their formatting to every filled value, and an anchor whose party has no recipient produces no field and no error |
| `skill-creator/` | 1.0 | Turning a repeatable process into a skill, the placeholder pattern for a tool you have not started using yet, and filling that placeholder in while the work is actually happening |
| `prompt-architect/` | 1.0 | Turns a vague request into a reusable, properly built prompt |

## Building things for yourself

Start at the top and only move down when the one above genuinely will not do it.

| Folder | Version | What it does |
|---|---|---|
| `artifacts/` | 1.0 | **The default for anything you want to LOOK at.** A dashboard, a tracker, a calculator, a one-page summary, built and published in one step with nothing to host. Includes the version trap that catches everyone the first time they share one |
| `command-center/` | 1.1 | The one page you open in the morning: what is empty, who is behind, what expires, what needs you. What belongs on it, the two panels almost everyone gets wrong, and keeping it honest when the data behind it is incomplete. **1.1: it is a private website on Cloudflare built by `command-center-builder`, NEVER an Artifact** (1.0 said Artifact and four dry-run students got one), and every connected tool is synthesized, never listed |
| `command-center-builder/` | 2.3 | **Load when the owner says "build my command center".** The step-by-step build of the hosted, private, auto-refreshing Command Center: HQ page plus one tab per business, numbers from Airtable refreshed every two hours, the written briefing (calendar, Slack, email, any other connected tool, power move) regenerated at 5am by a cloud routine, deployed on Cloudflare behind the owner's own login. Vera does every technical step; the owner supplies only the read-only Airtable token in chat and the clicks that must be theirs. 2.3: every connected tool gets a synthesis, never a list |
| `website-building/` | 1.0 | Only when an Artifact genuinely is not enough: a form, your own address, data that must always be current, or anything needing a secret. Includes the test for whether you have actually outgrown an Artifact |

## Notes for whoever maintains this

- **Nothing specific to one business belongs here.** No keys, tokens or account ids. No Airtable base,
  table or field ids. No real tenant, vendor or property names. No portfolio facts. These files are
  public and every reader is a different landlord.
- **The rules live in `reference/how-we-work.md` and nowhere else.** The specialists carry the floor
  from the bottom of that file, verbatim, and nothing more. **Any rule that exists in two places will
  disagree within a day.** That is not a prediction, it is what happened twice.
- **No skill hardcodes a table or field name.** Read the owner's own base file.
- **No skill states a number**, a threshold, a deadline or a point of law.
- **Every tool the owner touches gets a skill here.** If we do not know the tool well enough yet, it
  gets a placeholder and a parked row on the hub rather than being left out. A missing tool skill is
  how the same lesson gets learned three times.
- Bump a version here and in the file itself in the same commit, or the sync cannot tell anything
  changed.
