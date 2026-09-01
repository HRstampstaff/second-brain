---
name: cloud-vs-local
description: "Decides whether a piece of work should run in a Cloud session or a Local one, and answers any 'can a Cloud session do X' question without re-testing from scratch. Load it when someone asks which to use, whether their computer has to be on, why a login or 2FA failed in a session, why something worked locally but not in the cloud, how many sessions can run at once, whether many sessions will slow their machine, or how to hand work from one session to another. Also load it BEFORE answering any capability question of that shape, because the rule in here is that these are settled by testing and never by reasoning, and every claim carries an evidence label and a date. Trigger on: cloud, local, cloud session, local session, cloud vs local, which environment, Claude Code on the web, from my phone, does my computer need to be on, run overnight, routine, unattended, headless, 2FA, verification code, trusted device, it worked locally but not in the cloud, running many sessions at once, machine slowdown."
---

# Cloud or Local

**Version: 2.2 - 2026-08-31**

Claude can run in two places and they are not equally capable. Picking the wrong one is the most
common cause of "it said it worked and nothing happened", and of a session burning an hour
rediscovering a limit somebody already mapped.

- **Local** runs **on your own computer**. It can reach your files and **your real browser, already
  signed in to everything you use**. It only runs while your computer is on and awake.
- **Cloud** runs **on a server**. It runs whether your computer is on or not, and it cannot see your
  machine at all. It gets its own fresh container every time.

---

## The decision, in one pass

**Cloud** for anything reached through a connection or an API: your database and CRM work, your
automation platform, your website and deploys, writing documents, anything in your repo. Also the
right answer whenever your own machine is loaded, because a cloud session costs it nothing.

**Local** for anything that needs **your browser identity**: a site you have to be logged into as
you, anything with SMS two-factor, anything that trusts your device. Also anything touching files on
your computer. Landing repository work in main is not on this list - a cloud session does that
itself.

**Split it deliberately** when a job has both halves. Build in the cloud, push, then open a local
session on the same branch and do only the browser steps there. **Deciding that up front beats
discovering it halfway through**, because a cloud session cannot hand over to a local one mid-flight.

---

## ⛔ How a "can Cloud do X?" question gets answered

**By testing it. Never by reasoning about it.** This skill exists because that rule was broken twice
in one day and it cost real time and real credibility.

If this file does not already answer it, **the honest answer is "I do not know yet, let me test it"**,
followed by an actual test. An inference is not an answer, and stating one as though it were a finding
is worse than saying nothing.

**The standard test, cheap enough that there is no excuse:**

1. **Create a throwaway fixture** named so it is obviously disposable (`ZZ TEST ... DELETE ME`).
2. **Run the exact operation in the environment actually in question.** Not a similar one somewhere
   else. This is the step that got skipped: a Local test was run to answer a question about Cloud.
3. **Read the result back from somewhere independent.** A tool's own success message is not evidence.
4. **Delete the fixture** and confirm it is gone.
5. **Write the answer in here with the date and the word MEASURED.**

**Every claim below is labelled.** **MEASURED** means we ran it, and the date says when.
**DOCUMENTED** means it comes from vendor documentation rather than from us. **UNVERIFIED** means
believed but never tested: **treat it as unknown and say so out loud.**

---

## The real fault line is browser IDENTITY, not "UI versus API"

**MEASURED 2026-08-19, from inside a live cloud session.** This is the correction that matters most,
because the usual mental model is wrong.

**A cloud container HAS a browser.** Chromium and Playwright are preinstalled, so UI automation is
possible there. What it does not have is **you**:

| | Local | Cloud |
|---|---|---|
| Browser | Your real profile | Fresh, anonymous |
| Logins | Already signed in | Signed in to nothing |
| Two-factor | Trusted device, no prompt | Untrusted device, prompts every time |
| Network address | Your home connection | A datacentre, different each session |

So a site fails in the cloud not because there is no browser, but because the container looks like a
brand new device on a strange connection, which is exactly what triggers device verification. Any
tool that runs **its own** persistent cloud browsers is the exception and works fine from a cloud
session, because the identity lives with that tool rather than with the container.

**Two-factor, specifically:** a code sent to **email** is solvable, because a session with the Gmail
connection can read its own code and finish the login. A code sent by **SMS** is a hard stop. Route
that job Local.

## What Cloud CAN do, contrary to what people assume

**MEASURED 2026-08-19:**

- **Connections work.** Google Drive, Gmail, Calendar, Slack, Airtable, GitHub and others were all
  available inside a cloud session and fully functional. **The Google Drive connection performed
  search, create folder, rename and move from a cloud container.** So filing and organising documents
  does not need a local session.
- **Anything reached by API behaves identically to local.** Same calls, same results, no
  cloud-specific degradation.
- **Connections survive a SCHEDULED, unattended run. MEASURED 2026-08-28** with a one-shot cloud
  routine running headless: Gmail, Google Calendar, Google Drive, Airtable, Supabase, Slack and
  GitHub all answered real reads with no person present. **The ones that fail are the ones whose
  stored sign-in is dead or that demand an interactive sign-in** - three connectors raised
  sign-in-required in that same run. A headless run cannot open a sign-in window, so a connector
  that fails this way stays dead until someone reconnects it in a browser (claude.ai settings,
  Connectors), and it fails silently from the routine's point of view. So before building an
  unattended job on a connector, run one throwaway scheduled run that does a single read on it and
  read the result back. Token health is per-account and changes without notice.
- **Why this works at all:** the skills live in the shared repository rather than on one computer, so
  any session on any machine loads them. If they lived only on a desktop, a cloud session would start
  blank.

## What Cloud genuinely cannot do

- **It cannot see your computer.** No files on your disk, nothing you have installed, and none of
  the tools that live ON your machine: a local MCP server, the Chrome browser extension, your
  scheduled tasks. **DOCUMENTED.**
- **It cannot be you in a browser.** See the identity table above. **MEASURED.**
- **It cannot receive an SMS code.** **MEASURED.**
- **It does not remember anything between runs.** Containers are reclaimed after inactivity and
  **unpushed work is lost.** Anything worth keeping gets pushed. **MEASURED.**
- ~~It cannot save straight to the main copy.~~ **WRONG - corrected 2026-08-31, MEASURED.** A cloud
  session can push straight to main, and it can open a pull request and merge that itself, including
  resolving a conflict first. The old claim was worse than wrong: sessions that read it stopped at
  the push and stranded finished work on branches. If a session leaves work on a side branch, that
  is a session that stopped early, not a platform limit - ask it to finish the merge.
- **It cannot hand over to a local session mid-flight.** There is no bridge between the two.
  **MEASURED: a cloud container asked for reachable local agents and got none.**

## Handing work between the two: the handoff is git

A cloud session cannot pass the baton to your desktop. **Push from the cloud session, then open a
local session on the same branch and carry on there** with your real browser available. That is the
whole mechanism, and it is also why "build in the cloud, finish locally" is a plan rather than a
compromise.

## Running many sessions at once

**MEASURED 2026-08-19.** Useful when the question is "will this slow my machine down".

- **Every cloud session gets its own container**, around 4 processors and 15 GB of memory, with about
  30 GB of disk. **Twenty cloud sessions is twenty separate machines and your own computer
  contributes nothing.** That is the real fix for a slow machine, not closing tabs.
- **Fanning out helpers INSIDE one session is small.** The limit is processors minus two, so on a
  cloud container that is **two helpers running at once**. Queue more and they all finish, but only
  two run in parallel. **Real parallelism comes from more sessions, not more helpers in one session.**
- **The bottleneck moves, it does not vanish.** Locally you run out of processor and memory. In the
  cloud you run out of your account's usage allowance, and every session draws on the same one, so
  many parallel sessions spend it fast.
- **Give every session its own branch and a self-contained brief.** Sessions cannot see each other's
  work until it is pushed, so twenty on one branch collide and twenty on twenty branches is an
  ordinary merge.
- **If the disk fills**, the symptom is confusing: it reports low usage but no space available. That
  means delete files, not that the machine is broken.

## Still unverified. Say so, do not guess

- **Whether an account caps how many cloud sessions run at once, and at what number.** Cannot be
  determined from inside a container. Needs a real test.

## Scheduled routines

- **A Local routine only runs while the computer is on and awake.** If the machine is off at 3am, it
  does not run, and there is no catch-up queue.
- **There is a daily cap on scheduled runs per account, low enough that one schedule per job runs out
  fast. DOCUMENTED 2026-08-10.** So the shape that works is **one schedule whose only job is to read
  a list of work and do everything due**, with new recurring work added as a row rather than as a new
  schedule.
- **Anything that cannot run unattended should say so on its row**, rather than failing quietly
  overnight.

## When something fails in Cloud, check these four first

1. **Does it need a file on your computer?** Then Local, and it was never going to work.
2. **Does it need to be signed in as you, or an SMS code?** Local.
3. **Did it actually save?** Read the destination back rather than believing the report, and check
   whether it landed on main or on a side branch - a session can and should finish the merge itself.
4. **Did it lose something from last time?** Every run starts fresh. Anything it must remember has to
   have been written somewhere that persists.

If none of those explain it, **stop guessing and run the test at the top of this file.**

## Answering someone else's cloud-or-local question

Three sentences, in this order, and nothing more:

1. **Which one to use, and the one reason.**
2. **What they lose by choosing the other.**
3. **If you do not actually know, say you do not know and that you will test it.** Never fill the gap
   with a plausible explanation. A confident wrong answer here sends somebody off to rebuild
   something that was never broken.
