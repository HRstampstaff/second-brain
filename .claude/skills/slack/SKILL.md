---
name: slack
description: "Load before posting anything to Slack, setting up a channel for automation output, or diagnosing a message that never arrived. Optional, and only relevant to owners who already work in Slack. Covers the honest question of whether Slack should be in the picture at all, the one failure that accounts for nearly every missing message, how many channels to have, what should and should not be posted automatically, and why a notification nobody acts on is worse than none. Trigger on 'Slack', 'post to the channel', 'notify me', 'send it to Slack', 'the channel', 'a webhook', 'nothing arrived in Slack', or any request to route output somewhere other than email."
---

# Slack

**Version: 1.0 - 2026-08-24**

Slack is where a team already talks. **If the owner does not already live in Slack, do not introduce
it.** A one-person business does not need a chat tool to talk to itself, and a channel nobody opens
is a worse destination than an email.

This skill is optional and stays optional.

## The one failure that explains nearly every missing message

**An app can only post to a channel it has been added to.** Not "has permission for". Added to, as a
member, in that specific channel.

This produces a failure that looks like a hundred other things: everything is configured correctly,
the sign-in works, the message builds correctly, and it does not arrive. There is usually an error
saying the channel cannot be found, which reads like the channel does not exist, and it does.

**So, before believing anything else: is the app actually in that channel.** It is the first check,
every time, and it is right more often than every other cause combined.

**Private channels make this worse**, because the app cannot be added by anyone who is not in the
channel themselves. Adding a private channel is an owner action, not something to be worked around.

## Connecting it

The owner connects their own Slack, in their own workspace, and adds the app to whichever channels
should receive anything. **Never ask for a password, and never try to route around a permission
screen.**

Worth knowing: **an owner in more than one workspace can usually only have one connected at a time.**
Switching quietly disconnects the other, so anything that was posting to the first stops without
saying so. If somebody works across two workspaces, plan for it rather than discovering it.

## How many channels

**One channel for everything automated.** That is almost always right, and the instinct to split by
topic is almost always wrong.

The reasoning: a person checks one channel. Split it into five and four go unread, so the messages
that mattered are the ones nobody saw. Splitting is worth doing only when different people genuinely
need different subsets, and that means more than one person.

**Automated output and human conversation do not share a channel.** Once a channel is a mix, the
notifications get muted, and muting takes the real messages with it.

## What is worth posting automatically

**A notification nobody acts on is worse than no notification**, because it trains everyone to ignore
the channel, which costs the ones that mattered.

Post:

- **Something has gone wrong and somebody needs to know now.** A failure, a missed run.
- **Something time-critical has arrived** that would otherwise sit unseen.

Do not post:

- **A routine confirmation that something worked.** That belongs in the run notes, not in front of a
  person.
- **The same list every day.** The seasonal checklist posted every Monday is the classic version of
  this: after the second week nobody reads it, and the fact that nobody reads it is invisible.
- **Anything that is really a task.** A task belongs on the hub where it can be assigned, ranked and
  closed. A message in a channel cannot be any of those, and it scrolls away.

**That last one is the most useful rule here.** Most things people want posted to Slack are tasks in
disguise, and turning them into tasks is a straight improvement.

## Writing a message

- **The first line has to work on its own**, because that is what appears in the notification and
  often that is all anyone reads.
- **Short. Link to the detail rather than reproducing it.** The hub holds the detail.
- **Say what is needed and from whom.** A message that describes a situation without naming an action
  gets read and forgotten.
- **Nothing about a named person's finances or private circumstances**, unless the channel is
  genuinely limited to the people who should see it. Channels are more public than they feel, and
  history is searchable forever.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| The message never arrived and nothing looks broken | The app is not in that channel | Add it. Check this before anything else |
| Channel not found, but the channel is right there | Same thing. The app cannot see a channel it is not in | Add the app to the channel |
| It worked and then silently stopped | The connection was pointed at a different workspace | Check which workspace is connected |
| A private channel will not work | The app cannot be added by anyone outside it | The owner adds it from inside |
| Nobody reacts to anything in the channel | Too many low-value messages trained them to ignore it | Cut it to failures and things needing action today |
| People miss messages that mattered | Automated output shares a channel with conversation | Separate them, or the whole channel gets muted |
| The owner wants everything posted | Most of it is really tasks | Put tasks on the hub. Keep the channel for what is urgent |
