---
name: daily-brain-feed
description: "OPTIONAL. Feeds the owner's Memory Vault every day from what happened: the day's emails and meeting transcripts (Fathom, Fireflies, Otter or any recorder), reduced to lessons, decisions and updates and written into the right folders. Runs as ONE row in the routines table inside Vera's daily pass, never as its own schedule. Trigger when the owner says 'daily brain feed', 'feed my second brain', 'feed my memory vault from my emails', 'set up the daily feed', 'brain feed', or asks Vera to learn from their emails or meetings every day. Vera offers it once after the Memory Vault, Airtable and the daily pass are working; never installs it unasked."
---

# Daily brain feed (optional)

**Version: 1.1 - 2026-08-24**

## Where this sits, and why it is not the inbox handler

**This skill is the MEMORY lane. It keeps what changes how the business runs, and throws away
everything that merely needs doing today.**

`landlord-inbox-handler` is the opposite: it keeps what needs doing and throws away everything else.
**Each one's output is the other's rubbish, which is exactly why they are two files.** They also stay
separate because that one is core and this one is optional and heavy: an owner should be able to run
their inbox every day and never turn this on.

**They do share the reading, and reading the same mailbox twice in one morning is pure waste.**

- **The inbox handler runs first in the pass and does the reading.**
- **This runs later and works from what that pass already read**, rather than going back to the
  mailbox. It goes to a source directly only for things the inbox pass does not cover, which in
  practice means meeting transcripts.
- **If the inbox handler is not installed or did not run**, this reads the mailbox itself, exactly as
  described below. It never depends on the other skill being there.

**Neither of them produces its own morning report.** Everything reaches the owner through the day
plan. Three morning messages means one gets read.

**What it is.** Once a day, Vera reads what happened yesterday (emails, meeting transcripts), keeps
only what changes how the business runs, and writes it into the Memory Vault. The vault stops being a
thing the owner has to remember to update.

**What it costs.** This is the heaviest thing Vera does: it reads a lot of text every day. Say that
before setting it up. Two rules keep it sane: it reads only the sources the owner named, and it runs
inside the daily pass as a routine row, so it obeys the owner's per-day cap like everything else. If
the owner has a cloud routine available, prefer running the daily pass there so the feed does not
occupy their machine.

**Who wants it.** Owners with many conversations a day. Owners with few will find it noise: tell
them so and let them decide.

---

## Offer it, do not install it

Only after all three are true: the Memory Vault is saving, Airtable is connected with the routines
table, and "Good morning, Vera" has run at least once. Then, once:

> "I can also feed your Memory Vault every day from your emails and meeting notes, so it learns
> without you telling me. It reads a lot of text every day. Want it? If not, I will not ask again."

If no, log it in `log.md` and never offer again. If yes, set it up as below.

## Setting it up (one conversation, three questions)

1. **Which sources?** Email (which mailbox), and which recorder: Fathom, Fireflies, Otter, or none.
   Ask how Vera should reach each: the connector already on (Gmail connector, Google Drive folder the
   recorder saves into), or a folder or forwarding rule the owner sets up. Never ask for a password.
   If a source cannot be reached from where Vera runs, drop it and say so.
2. **Which lookback?** Default: since the last run, capped at 2 days. Never "everything".
3. **Where do things go?** Use `reference/repo-layout.md`. Defaults: a decision the owner made goes to
   `decisions/YYYY-MM-DD_topic.md`; a rule they stated goes to `policies/`; a fact about the business
   (new vendor, new attorney, new unit) goes to `business/`; a lesson or an open thread goes to
   `notes/YYYY-MM-DD_daily-feed.md`; anything about a tenant, lease or money that should be a record
   goes to the tasks table as a proposed row, never written into Airtable records directly.

Then create ONE row in the routines table:

| Field | Value |
|---|---|
| Name | Daily brain feed |
| What it does | Reads yesterday's emails and meeting notes, keeps what changes how the business runs, writes it into the Memory Vault, and proposes tasks for anything that needs a person. |
| Instructions | Load the daily-brain-feed skill and run "The daily run" with the sources and folders recorded there. |
| How often | Daily |
| Active | Yes |
| Prepare and wait | No (it writes only to the vault and to the tasks table as proposals) |
| Order | Last in the pass |

Record the owner's answers (sources, how reached, lookback, destinations) in
`.claude/skills/daily-brain-feed/config.md` in THEIR vault, so the run needs no questions. Push. Add
the skill's row to the skills table.

## The daily run

1. Read `config.md`. Read `log.md` for the last feed timestamp.
2. **Collect** everything new from each source since then, capped at the lookback.
   - **If the inbox pass already ran this morning, take the mail from what it read. Do not read the
     mailbox again.** That pass has already been through every message and knows which ones carry
     anything. Re-reading them is the single biggest avoidable cost in this skill.
   - For sources the inbox pass does not cover, read them here: the transcript summary first, and the
     full transcript only when the summary shows a decision, a rule, a number or a name that matters.
   - **If the inbox pass did not run**, read the mailbox yourself: subject and body.
3. **Reduce, hard.** Keep only: decisions made, rules stated, facts that changed, lessons learned,
   commitments with a date, and open threads that need a person. Drop pleasantries, newsletters,
   notifications, anything already in the vault (check before writing), and anything that is only a
   record update (that becomes a proposed task instead).
4. **Write** each kept item to its folder per `config.md`, one item per file or one dated feed note
   with headed sections, in the naming rules of `reference/repo-layout.md`. Quote the source in one
   line (who, when, subject) so it can be checked. Never invent a fact to fill a gap.
5. **Propose tasks** for anything that needs a person: one row each in the tasks table, status not
   started, with the source line. Never send anything, never edit a tenant, lease or money record.
6. **Commit, push, read back.** Append one line to `log.md`: date, sources read, count kept, count
   dropped, count of tasks proposed.
7. **Report** in the daily pass, three lines maximum: what was learned (the two or three items that
   matter), what was proposed as tasks, and anything a source refused to open.

## Guardrails

- **Reads are free, writes go to the vault and the tasks table only.** No email replies, no record
  edits, no sends. The rulebook stands.
- **When the same source fails twice, stop reading it and report it precisely.** Do not retry daily
  in silence.
- **If a day's material is enormous** (a long meeting plus a full inbox), read summaries and subjects,
  keep the top ten items, and say that the rest was skimmed. Better a short honest feed than a stalled
  pass.
- **Nothing sensitive gets copied verbatim.** Numbers, names and dates that matter, yes. Whole email
  bodies, bank details, documents, no. Link or cite instead.
- **The owner can turn it off by setting the row inactive.** Say so when you set it up.
