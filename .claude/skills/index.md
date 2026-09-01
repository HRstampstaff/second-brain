# Skills manifest

Everything in the library, with the version your assistant compares against. One folder per skill
under `skills/<name>/`, holding its `SKILL.md` plus anything it needs.

Two files outside `skills/` are part of the system and are versioned the same way:

| File | Version | What it is |
|---|---|---|
| `reference/how-we-work.md` | 4.3 | **The rulebook. The only copy.** Vera reads it every session; the specialists carry a short floor from it and nothing else |
| `templates/your-base.template.md` | 4.1 | The empty snapshot Vera copies into your own repo and fills in from your base |
| `templates/repo-layout.template.md` | 1.1 | The standard folder layout and naming for your second brain. Vera copies it into your repo as `reference/repo-layout.md`; you may change it and she follows your copy |

## Your team

You talk to Vera. She loads first and hands work to the other three.

| Folder | Version | What it does |
|---|---|---|
| `vera/` | 4.40 | Chief of staff. Keeps your skills current, runs the daily pass, routes everything, holds anything legal. 4.40: Cloud sessions name their bound repo (public or private) before the first commit, and they CAN merge and push to main, so work lands instead of stranding on branches |
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
| `github/` | 1.0 | **Load before any question about how their repos are organised.** The repo is the smallest thing you can give someone access to, so repo boundaries are drawn by access and never by tidiness; one assistant across many repos rather than one each; pointers instead of copies; and what does not belong in a repo at all |
| `google-drive/` | 1.4 | **Load before ANY Drive work.** The connector really does rename and move, but it CANNOT change the contents of a document that already exists, which is why people get sent to a terminal for what feels like a small edit. Also: the Memory Vault must be set up first, sharing so files are visible, and never reporting a move you have not read back |
| `gmail/` | 1.0 | **Load before ANY work in your mailbox.** Drafts only and never sends, replying inside a thread, searching properly, labels as a queue rather than decoration, and getting what matters out of the mailbox and into the hub |
| `turbotenant/` | 1.0 | **Load before ANY work on the rent platform.** No connector exists and what that means, the device check at sign-in that cannot be switched off, how charges actually reach a tenant, and what to do when the platform and the hub disagree about money |
| `quickbooks/` | 1.0 | **Load before touching the books.** Reading reports and drafting entries you post yourself, tracking money per property, and the bank feed trap that double counts |
| `docusign/` | 1.0 | **Load before getting anything signed.** You prepare and the owner sends, why a document out for signature cannot be quietly corrected, templates, signing order, and filing what comes back |
| `furnished-finder/` | 1.0 | **Load before touching a Furnished Finder inbox.** Why the notification email is nearly empty, the message box that sends on its own, the two names one listing has, and what must stay on the platform |
| `google-sheets/` | 1.0 | **Load before reading or writing a spreadsheet, and before agreeing something should be one.** Your old spreadsheets as the best history in the business, importing without silently corrupting it, and the three jobs a sheet still does best |
| `n8n/` | 1.3 | **Load before building an automation, and before agreeing it needs one.** The four-way decision that comes first, naming, credentials, testing for real instead of trusting a green tick, why a run history full of ticks proves nothing, how repairing one step breaks the next, and the failures that cost the most time |
| `skyvern/` | 1.0 | **Load before driving a site that has no connector.** When to use it versus a connector versus your own browser, what it costs, writing goals it can follow, the two kinds of two-factor, and keeping runs cheap |
| `smartthings/` | 1.0 | **Load before touching a smart lock, and before agreeing to set one up.** The prerequisite to raise first (a public web address you control, free to get if they have none), why a code change can report success while the door never changed, why an unnamed code may be the one you most need to keep, and why two locks in the same house answer the same command differently |
| `slack/` | 1.0 | OPTIONAL, and only if you already work in Slack. The one failure that explains nearly every missing message, how many channels to have, and why most things people want posted are really tasks |
| `netlify/` | 1.0 | OPTIONAL. Where a hand-built site actually lives: publishing, the stored-settings step everyone forgets, domains and certificates, and what the free tier really means |

## How you work

| Folder | Version | What it does |
|---|---|---|
| `cloud-vs-local/` | 2.1 | **Load before answering any "can Cloud do X" question.** Which jobs belong in a Cloud session and which need Local, what Cloud genuinely cannot do, and the rule that these are settled by testing rather than by reasoning. Every claim carries an evidence label |
| `second-brain/` | 1.0 | Builds a written memory of your business your assistant reads at the start of every session |
| `landlord-inbox-handler/` | 1.2 | Reads your email and turns it into what needs doing today, drafting replies you send yourself. Feeds the day plan rather than producing a second thing to read |
| `daily-brain-feed/` | 1.1 | OPTIONAL. Feeds your Memory Vault every day from your emails and meeting transcripts. The opposite of the inbox handler: it keeps what changes how the business runs and throws away what merely needs doing. Heavy on reading, so only for owners with many conversations |
| `drive-organizer/` | 1.1 | Turns a messy Google Drive into a clear structure, previewing before it moves anything |
| `file-namer/` | 1.2 | Gives every document one consistent name and one correct home |
| `skill-creator/` | 1.0 | Turning a repeatable process into a skill, the placeholder pattern for a tool you have not started using yet, and filling that placeholder in while the work is actually happening |
| `prompt-architect/` | 1.0 | Turns a vague request into a reusable, properly built prompt |

## Building things for yourself

Start at the top and only move down when the one above genuinely will not do it.

| Folder | Version | What it does |
|---|---|---|
| `artifacts/` | 1.0 | **The default for anything you want to LOOK at.** A dashboard, a tracker, a calculator, a one-page summary, built and published in one step with nothing to host. Includes the version trap that catches everyone the first time they share one |
| `command-center/` | 1.0 | The one page you open in the morning: what is empty, who is behind, what expires, what needs you. What belongs on it, the two panels almost everyone gets wrong, and keeping it honest when the data behind it is incomplete |
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
