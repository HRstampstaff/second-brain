---
name: smartthings
description: Load before touching a smart lock, and before agreeing to set one up. Reading who can actually open a door right now, adding and removing codes on move-in and move-out, and the reason a lock change can report success while the door never changed. Covers the prerequisite to raise before any of it (a web address you control, free to get if the owner has none), connecting SmartThings once so it keeps working, why access is granted per property rather than per account, and why two locks in the same house behave differently.
---

# Smart locks

**Version 1.0**

A smart lock is the one place where your records and reality come apart without anyone noticing.
The code is in your hub. The tenant is standing at the door. Nobody finds out those are different
things until she calls you.

This skill is about closing that gap: reading what is genuinely programmed on a lock, changing it,
and knowing when a change did not take.

---

## ⛔ CHECK THIS BEFORE YOU START: you need a web address you control

**Raise this at the very beginning, before any setup work.** The lasting connection requires a
**public web address you own**, and an owner who does not have one will otherwise discover it
halfway through and be stuck.

Why it exists: at the end of the approval step, the lock company sends the browser to an address you
nominate, carrying a one-time code. That address has to be a real public one — **pointing it at your
own computer is rejected outright**, with an error that explains nothing.

Three things make this much smaller than it sounds:

- **The page does not have to exist.** A page-not-found is fine. Nothing needs to run there and
  nobody ever visits it. The only thing that matters is that the code appears in the address bar.
- **You do not need a custom domain.** A free hosting subdomain is a valid address and comes with
  the secure certificate already set up.
- **It costs nothing.** The free tier of a static host is more than enough.

**So the real requirement is not "a website", it is "an address you control".** Any public address
works mechanically, including a public testing service that the internet suggests — **do not use
one.** Your authorization code would pass through a stranger's server and into their logs. Owning
the address is a privacy decision, not a technical one.

### If the owner has no site

Ask first: many owners already have one for their rentals, and any page on it will do.

If not, **a free static host solves it in minutes** — see the `netlify` skill. A single placeholder
page published to a free subdomain is enough, and it is genuinely a one-time job. That is the whole
prerequisite.

**Do not begin the connection steps until this is settled**, because the failure arrives at the
approval step, after the account, the tool install and the application have all been created.

---

## ⛔ The first thing to understand: "success" does not mean the door changed

When your assistant sends a code change, the response says **accepted**. That means the lock
company's servers took the request. It does **not** mean the lock did anything.

These locks run on batteries and sleep between check-ins. Send several changes quickly and the lock
wakes up, handles one or two, and the rest are simply dropped. Nothing reports an error. Every
single one says accepted.

This has been measured, not guessed: **seven code deletions sent in quick succession all reported
success, and only two of them actually happened.** Five codes stayed live on an exterior door, and
the only reason anyone found out is that somebody read the lock back afterwards.

**So the rule is: one change at a time, roughly twenty-five seconds apart, and read the lock back to
confirm each one before moving on.** Retried at that pace, every one of those five failures worked
first time. It is slower and it is the only way the result is true.

**Never report a lock change as done from the response. Only from re-reading the lock.**

---

## What you can and cannot see

**You can see which slots hold a code and what each one is named.** You cannot see the codes
themselves. The lock never gives them back, to anyone, ever.

Two consequences, and both matter:

- **A name proves a code exists, not that it is the right one.** A slot labelled with a tenant's
  name tells you nothing about whether it matches the code in your records.
- **You cannot back up a code before deleting it.** Once removed it is gone, and you cannot look up
  what it was. Say this out loud before clearing anything, because it is the difference between a
  tidy-up and locking somebody out permanently.

---

## ⛔ An unnamed code is not a spare code

Locks accumulate slots with meaningless auto-generated names. It is tempting to treat them as junk.

**They are not.** On one real property the unnamed codes included **the owner's own master code**,
which had been sitting there unlabelled for years. Clearing them "to tidy up" would have removed her
own access to her own building.

**Before deleting any unnamed code, check whether the people who must always have access are
explicitly named elsewhere on that same lock.** If your own access and your cleaner's access are
both visibly named, the unnamed ones are more likely genuinely stale. If they are not, one of the
unnamed codes probably belongs to somebody who needs it.

Then ask the owner about that specific lock. Never sweep unnamed codes across a whole property on a
general instruction.

---

## ⛔ Two locks in the same house do not behave the same way

This is the trap that produces confident wrong answers.

Locks from different makes and models handle a repeated code differently. **Some refuse to accept a
code that is already programmed somewhere on that lock. Others accept it happily and end up holding
it twice.** Both behaviours have been seen on locks in the same building.

Why it matters: when a code change fails for no visible reason, the natural conclusion is "that code
must already be on this lock". On a lock that refuses duplicates, that is right. On a lock that
allows them, the failure means something else entirely.

**Worse, the reverse inference is never safe.** If a code goes on successfully, that does **not**
prove it was absent before. It may simply be a lock that permits duplicates.

This produced a real false alarm: a cleaner was reported as carrying two different codes, on the
strength of a test code being accepted. She had one code all along. The lock just allowed a
duplicate.

**So: work out how a given lock behaves before drawing any conclusion from it, and when you cannot,
report what you observed rather than what you think it means.**

### Working out why a change failed, without guessing

Change one thing at a time. Three tests separate the causes:

| Test | If it works | If it fails |
|---|---|---|
| Same code, a different empty slot | the slot was the problem | not the slot |
| A different code, the same slot | the lock and the radio are fine | the lock is not accepting new codes at all |
| A different code of the **same length**, empty slot | length is not the issue | the lock wants longer or shorter codes |

Run all three before naming a cause. A single failed attempt is consistent with several
explanations, and picking one early is how you end up telling the owner something untrue.

**Never send a fourth identical retry.** If two attempts fail the same way, the next thing you send
must be different, or you are just burning the battery.

### Test codes are real codes

If you put a code on a lock to test something, it opens the door. Name it so it can never be
mistaken for a real person, delete it the moment the test is done, and **confirm the deletion by
reading the lock back.** A forgotten test code is an unlocked door.

---

## Connecting it, once, so it keeps working

### The short-lived token trap

The quick way in is a personal access token from your account settings. **It expires twenty-four
hours after you create it.** Older ones used to last for years, which is why a lot of guidance still
assumes they are permanent.

A token like that is fine for looking at something once. **It is useless for anything that runs on a
schedule** — it works the first day and then fails silently every morning after.

For anything ongoing you need the proper connection below.

### The proper connection

It takes about ten minutes and you do it once.

1. **The developer website cannot set this up.** Its project types are all built around you running
   a server that the lock company calls. That is the opposite of what you want. Starting a project
   there is a dead end.
2. **Use the command-line tool instead**, installed through your package manager. If one installation
   route demands you grant blanket trust to a third-party source, use the other one rather than
   granting it.
3. **Create an API-only application.** Ask for permission to read devices, read locations, and send
   commands to devices, and nothing more.
4. **The address it sends you back to must be a real public web address** — the prerequisite at the
   top of this skill, which should already be settled before you reach this step. ⛔ **Pointing it at
   your own computer fails with a flat "forbidden" error that explains nothing**, and that single
   choice can cost an afternoon.
5. **Approve it in your browser.** ⛔ **Tell the owner in advance what success looks like, because it
   looks like failure:** they approve, then land on their own site's page-not-found. That is correct.
   The thing that matters is in the **address bar**, which now has a one-time code on the end.
6. **Exchange that code within a few minutes.** It expires quickly.

### ⛔ Access is granted per property, not per account

Approving once covers **one property**. Every property is a separate approval producing a completely
separate set of credentials.

**This is where a whole property's access gets destroyed silently.** Store the second property's
credentials over the first property's and the first stops working, with no error — calls simply
start failing for doors that worked an hour ago.

**Keep one credential file per property, named for the property**, and keep a note of which doors
belong to which. When a lock "does not exist", the overwhelmingly likely reason is that its property
was never approved, not that the lock is missing.

### ⛔ The credential replaces itself every time it is used

The working credential lasts a day and is renewed automatically using a second, longer-lived one.
**That longer-lived credential is replaced every single time it is used.** The old one dies
immediately.

Two ways that breaks, and both mean doing the browser approval again by hand:

1. **A renewal succeeds and the replacement is not saved.** Everything is dead from that moment.
2. **Nothing renews it for thirty days.** It expires unused.

So the file must be written carefully, keeping the previous one until the new one is proven, and
something must touch it at least monthly. A daily routine covers this comfortably. **If your daily
routine's schedule changes, check this still holds.**

### ⛔ None of this belongs in a chat

The application secret is shown **once**, at creation, and never again. Send it straight into a
protected file. Never let it print into a conversation, and never paste a credential into a chat to
"let the assistant use it" — a chat log is not a safe place for a key that opens doors.

---

## Not every lock is on the same system

An owner with several properties often has one on the lock maker's own app and the others on a hub,
without thinking of it as a difference.

**The catch: the ones administered elsewhere can still appear in the hub, as empty shells with no
codes on them.** That looks exactly like a lock with no codes programmed. It is not the same thing
at all, and reporting it as fact is wrong.

**Before acting on any lock, confirm the property is genuinely administered where you are looking.**

---

## Where this fits

- **Your hub holds the code you intended. The lock holds the code that works.** They drift. If your
  records have a field meaning "the code was actually programmed", treat it as a claim — **reading
  the lock is cheaper and more honest than trusting it.**
- **Any move-in message that promises a tenant their code should be reconciled against the lock**,
  not against your records. A correct email about a code that was never programmed is worse than no
  email, because now she is standing at a door with a number she trusts.
- **On a move-out, removing a code is not one action.** A departing tenant is usually on several
  doors — their own, plus shared entrances. Work from the lock, because a list of which doors
  somebody is on is exactly the kind of record that goes stale.
- **Timing on a move-out is genuinely narrow.** Remove the code before they are physically out and
  you lock out someone who still lives there. Leave it late and a former tenant keeps working access
  to a room somebody else is moving into. Both have a real cost; neither is the safe default.

## Can this run in the cloud?

**The lock service itself does not care where the request comes from.** Unlike the platforms that
demand a device check at sign-in, this is an ordinary web service and a cloud session can reach it.

**What does not survive is the credential.** A cloud session is built fresh and does not have your
saved files, so there is no credential and no saved setup. It also has nowhere durable to store the
replacement credential each time it renews, which the section above makes essential.

So: possible in the cloud, but only once the credentials are supplied to that environment properly
and there is somewhere permanent for the renewed one to live. Until then this is a local job.
