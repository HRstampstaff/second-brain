---
name: skyvern
description: "Load before ANY work involving Skyvern, or whenever a job needs a website driven that has no connector at all. Covers when to reach for Skyvern versus a connector versus the owner's own browser, what it costs and that it is a separate paid account, writing navigation goals it can actually follow, logins and the two very different kinds of two-factor, keeping runs cheap, and diagnosing a run that failed. Trigger on 'Skyvern', 'drive the website for me', 'it has no connector', 'log into that site and get X', 'automate a site with no API', 'the browser automation failed', or any request to read from or post to a site nothing else can reach."
---

# Skyvern

**Version: 1.0 - 2026-08-24**

Skyvern is a service that drives a website for you, in its own browser, in the cloud. You describe
what is on the screen and what to do; it looks, clicks and types. Use it for sites that offer no
connector and no API, when the job has to happen without you sitting there.

## ⛔ Read this before you reach for it

**It is hands, not brains.** The intelligence has to come from you. Skyvern follows instructions as
precise as your description of the screen and no more. Vague goals fail, retry, and cost money. Every
minute you spend describing the page exactly is repaid several times over.

**It is a separate paid account.** It is not part of Claude and it is not included in anything the
owner already has. Logins and two-factor in particular sit on a higher tier. **Say the cost out loud
before anyone designs around it**, and check the current pricing on the day rather than quoting a
number from memory, because it changes.

## Reach for these in order, and stop at the first that works

1. **A connector.** If the tool has one, use it. It is free, it is reliable, and nothing about a page
   layout can break it. Always check the connector shelf before assuming there is nothing.
2. **The owner's own browser**, with the Claude extension, on their own machine. **This is the right
   answer far more often than people expect**, and it is free. Their browser is already signed in and
   already trusted by the site, so there is no login to automate and no two-factor to solve. The
   limits are real but narrow: it runs only while their machine is on and they are there, so it suits
   a job they trigger, not one that has to fire at three in the morning.
3. **Skyvern.** Only when the job genuinely has to run without them: overnight, on a schedule, or
   fast enough that waiting for them to be at the desk would lose the opportunity.

**The cheapest correct answer is usually 2, and the one people jump to is 3.** Ask what actually
breaks if the job waits until they are at their desk. Often the honest answer is "nothing".

## The permission rules, and they are not negotiable

- **Reading is free to do. Acting is not.** Extracting information, reading a list, checking a status:
  go ahead. Anything that sends, submits, pays, books, cancels or posts on a site gets prepared and
  shown to the owner first.
- **Never let it send a message to a real person unattended.** Draft it, hand it over, let them press
  send. A wrong message to a tenant, a guest or a client is not something an apology fixes.
- **Never put a password anywhere except the credential store the service provides.** Not in a goal,
  not in a note, not in a skill file.
- If a run is going to cost real money in credits, say so before starting it, not after.

## Writing goals it can actually follow

This is where almost every failure comes from.

**Describe what is visibly on the screen.** "Click the blue button labelled Sign In below the email
box." "Find the row with a bold name, a date and a short preview, and click it."

**Do not describe what the site means.** "Go to the messages section" is not something a pair of eyes
can act on. Neither is "navigate to the dashboard". It does not know what those look like.

**Never write "wait for the code to arrive" or "wait until it is ready".** It will wait forever and
burn every step you gave it. Say the concrete action: "enter the verification code".

**Build one step at a time.** Walk the site yourself first and write down every screen and every
button. Then write one block, run it, read what came back, fix that block, and only then write the
next. Rewriting the whole thing after a failure hides which step was actually wrong.

## Logins, and the two kinds of two-factor that behave completely differently

**A code sent to email or SMS.** Solvable. The service can be handed the code, or it can fetch the
code from somewhere you provide at the moment it hits the screen. Fetching on demand is the better
shape, because a pushed code can arrive stale or late and both look like the login simply failing.

**A "confirm this device" link.** Usually not solvable in the cloud, and this is the wall people
waste days on. The site emails a link that must be clicked from the same machine and the same network
that tried to log in. A cloud browser is a different machine on a different address every time, so
the link authorises the wrong thing and the login is refused forever. Clicking it from somewhere else
does not help. **When a site does this, stop and use the owner's own browser instead.** Their machine
is already trusted, so the question never arises.

**⭐ A login that reaches the code screen and then dies is almost always a code delivery problem, not
a Skyvern problem.** Read the run's own termination reason before blaming the service. If it says no
verification code was found, the code never arrived and the fault is on your side of the wire. This
distinction has cost real people real days, because "the tool is broken" is a comfortable conclusion
and it is usually wrong.

## Keeping runs cheap

A typical run takes several minutes. That fact drives everything below.

- **Do not poll it every few seconds.** Nothing can have changed. Confirm it started, go and do
  something else entirely, and check back once it has had time to finish.
- **Screenshots are the most expensive thing you can ask for.** Read the run status instead. Take a
  picture only when the status gives you nothing useful.
- **Cap the steps low.** A generous step limit does not make a bad goal succeed, it just lets it fail
  many times at full price. If it cannot do the job in a handful of steps, the goal is wrong.
- **Say "do not retry" in the goal** for anything that would be harmful to do twice.
- If a site checks the address you connect from, run everything through one persistent browser
  session rather than a fresh browser each time, and close the session when you are done, because an
  idle open session still bills.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| It retries the login many times and never gets in | The goal describes the page in the abstract | Rewrite it describing what is literally on screen, colours, labels, positions |
| It waits forever on the code screen | The goal says to wait for the code | Say "enter the verification code" instead |
| The login reaches the code screen then terminates | The code never arrived | Read the termination reason, then check your own code delivery. Do not assume an outage |
| Every login triggers a fresh device check | The connecting address changes between page loads | One persistent session for the whole job, or move to the owner's own browser |
| It clicked the wrong row in a list | The goal was generic | Describe what that specific row looks like, not what it is |
| It says it succeeded but there is no data | The result is nested under the block's own name | Read the raw result once and build from the real field names |
| The site is fine by hand and fails in the run | The site changed its layout | Walk it yourself again and update the goals. Layouts move without warning |
| Credits vanished with nothing to show | It looped on a bad goal at a high step limit | Lower the step limit, fix the goal, then raise it |
| It stalls at the very first step on one particular site | That site actively blocks automated browsers | Do not fight it. Use the owner's own browser |

## A note that will save someone a week

**A tool that fights back is not always a tool to beat.** Some sites are built to stop exactly this.
When a site stalls at step one across every approach you try, that is the answer, not a puzzle. The
owner's own browser, on their own machine, signed in as themselves, walks through that site without
noticing it was ever a problem. Reaching for it is not giving up; it is picking the tool that fits.
