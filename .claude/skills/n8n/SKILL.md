---
name: n8n
description: "Load before building, changing or debugging anything in n8n, and BEFORE agreeing that a job needs n8n at all. Covers the decision that comes first, which is whether this should be an n8n flow, an automation inside the hub, a field default, or one of your own routines. Then: what a flow is made of, the naming rule that keeps a growing instance findable, credentials and why they never copy between accounts, testing a flow for real instead of trusting a green tick, and the failure modes that cost the most time. Trigger on 'n8n', 'a workflow', 'a flow', 'automate this', 'run it automatically', 'trigger', 'webhook', 'it should happen every day', 'why did the automation not run', or any request for something to happen without anyone present."
---

# n8n

**Version: 1.3 - 2026-08-31**

n8n runs automations on a schedule or on an event, with nobody watching. It is the right tool for a
narrow band of jobs and the wrong tool for most of what an owner will ask for, so the first section
matters more than the rest.

## The decision that comes first

**Before building anything, ask which of four things this actually is.** Getting this wrong is the
expensive mistake, not writing the flow badly.

- **A default value on a field.** The answer is always the same for a new record. This is not
  automation at all, and it is the cheapest thing that could possibly work. Try it first.
- **An automation inside the hub.** Something must happen the instant a record changes, every time,
  reliably, with no judgement involved. Keep two fields in step. Set a status when a box is ticked.
  The hub does this natively, it is free, and it lives next to the data it touches.
- **An n8n flow.** It has to run at a set time with nobody present, or it has to join two systems
  that do not talk to each other, or it needs several steps in a fixed order. **That is what n8n is
  for.**
- **One of your own routines.** It needs judgement, or reading, or writing something a person will
  send. A routine is a written playbook you execute when the owner is there. Anything involving
  wording, a decision, or a document belongs here.

**The strong bias is toward the last one.** A routine can be changed in a sentence and it fails
loudly, in front of somebody. A flow fails silently at four in the morning.

## What a flow is

A trigger and then a chain of steps. The trigger is either a time, or something happening, or another
system calling in. The steps read, transform, decide and write.

**Two kinds of trigger and the difference is the whole design.**

- **A schedule** runs at a time whether or not anything happened. Simple, predictable, and always
  late by up to one interval.
- **An event** runs when something actually changes. Faster and cheaper, because it does nothing when
  nothing happened.

**When an owner asks for something to be checked every few minutes, that is almost always the wrong
shape.** It burns runs to find nothing, and it is still slower than an event. The honest answer is
that an event trigger is both cheaper and faster, and to build that instead.

**Keep a schedule as a backstop even when an event trigger exists.** Events get missed. A daily sweep
that finds nothing costs almost nothing and catches the day the webhook did not arrive.

## Naming, and why it is a real rule

An instance goes from five flows to a hundred faster than anyone expects, and at that point the only
thing that makes it navigable is the names.

- **The name says what it does and to what.** Not "Flow 3". Not "New workflow".
- **Whatever the flow is called in the owner's own automation list, the flow itself carries exactly
  the same name.** Character for character. When those two drift, nobody can tell which record
  describes which flow, and the list stops being trusted.
- **Anything temporary is named so it is obviously temporary**, and it gets deleted the same day.
  A test flow that survives the day becomes permanent by accident.

**Every flow that exists gets a row in the owner's automations list**, saying what it does in plain
words, what triggers it, whether it is on, and **whether it is actually reaching real people**. Those
last two are different facts and one of them cannot stand in for the other. A flow nobody has written
down is a flow nobody can maintain, and it will be rediscovered a year later by whoever is trying to
work out why an email went out.

## Credentials

A credential is how a flow signs in to something. **Credentials never travel between accounts.**
Copying a flow from one place to another copies the steps and loses the sign-ins, every time, and the
copy will not run until each one is reattached.

- **The owner connects their own accounts.** Anything involving a sign-in screen is theirs to do.
  Never ask for a password.
- **Name credentials for what they are and whose they are**, because the moment there are two of
  anything, an unlabelled one gets attached to the wrong flow.
- **A flow that suddenly fails everywhere at once is usually one expired credential**, not a hundred
  broken flows.

## Testing, and the only thing that counts as proof

**A flow is not working because it looks right, because every step is green, or because it worked
last month. It is working when you have watched it do the real thing and checked the result at the
other end.**

This sounds obvious and it is the rule most often broken, because the alternative is convenient.

- **Make the event happen rather than waiting for one.** Create the record. Tick the box. Send the
  message. Almost nothing is genuinely untestable, and "waiting for a real one" is how a broken flow
  reaches a tenant.
- **Check the destination, not the flow.** Did the email arrive. Did the row change. A run that
  reports success while writing nothing is common.
- **The exception is anything that would reach a real person if it worked.** Then it is tested with
  the destination pointed somewhere safe, and switched over afterwards.
- **A green tick with zero items is a failure wearing a success badge.** The step ran and found
  nothing. Always look at how many items each step actually handled.
- **A rehearsal proves the flow you set up, not the flow you have.** If you test a step against a
  stand-in for what feeds it, that stand-in is a copy of the wiring as you believe it to be. Change
  the wiring and the rehearsal keeps passing while the real thing has already moved on. After any
  rewiring, rebuild the stand-in from the flow as it is now, not from memory.

**Anything that sends to a tenant gets a quiet period first**, where it runs for real but delivers to
the owner instead. That is what catches the wrong name, the wrong date and the empty gap where a
value should have been.

**Which is why the list needs two live statuses, not one.** A flow in its quiet period is switched on,
runs on schedule and reports success every day, and reaches nobody. Recording that as simply "live"
is a false claim: it says the work is done and the owner is covered, when in fact not one message has
left the building. Keep a separate status for running-but-delivering-to-the-owner.

**Ending the quiet period is two changes, and the second one gets forgotten.** Repointing the flow at
the real recipient is the first. Moving its row from the quiet-period status to live is the second,
and it happens in the same sitting, as the last step of the same change - not "later", because later
is how a list stops being trusted. A row left on the quiet-period status understates what is now
running, and every future reader will assume that flow is still safe to ignore.

**A status nobody can check by hand goes stale.** Where the flow delivers is a fact about the flow
itself, not a note somebody remembers to keep. Prefer reading it back off the flow - is the recipient
a real address or the owner's - over trusting what the row claims, and correct the row whenever the
two disagree.

## Failure modes worth knowing before they cost a day

- **A flow was switched off and nobody noticed.** There is no alarm for this. When something has not
  happened for a while, check that it is on before looking for a bug.
- **A filter that is slightly wrong does not fail, it just quietly matches the wrong set.** Always
  check the count.
- **A step that finds nothing halts the chain**, so everything downstream never runs, and the run
  still says it succeeded.
- **The same logic copied into three flows will disagree within a month.** If two flows need the same
  answer, build it once and have both ask it. Copies drift, and each drift is a wrong answer to
  somebody real.
- **A flow that reacts to a change it also causes will run forever.** Anything writing back to what it
  watches needs a guard that stops it when nothing actually differs.
- **Adding a step in the middle quietly changes what the next step receives.** Most steps read
  "whatever the previous step produced". Insert a step and that phrase now means something else, all
  the way down the chain, with no error and nothing turning red. **Whenever you insert or reorder a
  step, check every step after it for what it is actually reading**, and where a step needs a
  specific earlier one, have it name that step rather than take whatever is nearest. Naming survives
  insertion; "the previous step" does not.
- **The dangerous version of that is the one with a sensible fallback.** A step that cannot find what
  it expected and quietly substitutes a default does not look broken - it looks fine, and it stays
  looking fine until the one place the default differs shows up in front of a real person. Prefer a
  loud failure over a tidy default for anything a tenant will read.
- **When something goes wrong at three in the morning, nobody is told unless you built the telling.**
  Send failures somewhere a person looks.

## A run history full of ticks is not evidence it works

This is the one that lets a flow stay broken for weeks, and it is invisible unless you go looking.

**A flow that only acts when it finds something does nothing on most days, and reports doing nothing
as success.** A daily flow that looks for "anyone moving in today" finds nobody on a normal Tuesday,
finishes in half a second, and shows a green tick. Thirteen of those in a row look like a healthy
automation. They are thirteen days it was never asked to do anything.

A real case: a daily flow showed green on thirteen days and failed on two. The two red days were the
only two days it had anything to send. **It had failed on 100% of the occasions that mattered, and
its success rate was 87%.** Both sentences are true, and only one of them is useful.

**So when you want to know whether a flow works:**

- **Look at how many items the first real step found**, not at the status of the run. Green with zero
  items found means "nothing to do today", which tells you nothing at all.
- **Look at how long the run took.** A run that found nothing finishes almost instantly. A run that
  actually did the work takes noticeably longer. Scanning the durations is the fastest way to find
  the runs worth opening.
- **Never quote a success rate for a flow that only fires when it finds a match.** Say how many times
  it actually had work to do, and how many of those it completed.

## Fixing one step is when you break the next one

The riskiest moment for a working flow is somebody repairing a different part of it.

**Most steps take their input from "whatever ran immediately before".** So the moment you add a step,
replace a step, or reorder anything, every step below your edit is now being handed something
different, and nothing warns you. The flow saves fine. The run goes green up to the point it breaks.

A real case worth remembering: a flow's lookup step was broken and got replaced. The replacement was
correct. But it left a different kind of step sitting directly above the one that sends the email,
so the email step - which had been told to take the address from "the previous step" - started
reading the wrong thing and sent to an empty address. **The repair was right and it still broke the
flow**, because it changed the shape of the chain rather than the logic.

**Two habits that prevent it:**

1. **Have every step name the step it needs, instead of taking whatever is nearest.** This costs
   nothing while building and it survives any amount of rearranging later. Make it the default on
   anything that sends, not a repair you apply after a break.
2. **After any edit that changes the ORDER of steps, check every step below it**, not just the one
   you touched. Especially the recipient, the subject, and anything that decides yes or no.

**And read the error for what it is.** "The email address '' is not valid" reads like a missing
address on the record. It was not - the address was correct and sitting right there one step up. An
empty value almost always means the step is reading from the wrong place, not that the data is
missing. Check what feeds the step before you go hunting through records.

## After a fix, say whether it is fixed or only changed

A flow that runs on a schedule and only acts when it finds a match **cannot be tested whenever you
feel like it.** There may be nothing for it to find until next week.

That leaves an honest gap, and the gap is where trust gets lost. **Say "fixed, not yet proved" and
name what will prove it** - the next real event, and roughly when that is. Do not report a fix as
done because the change is saved and the flow looks right, which is the exact mistake that let the
original break survive a month of green ticks.

Write the same thing into the row on your automations list, because that is where the next person
looks, and a row that says live when the flow has never once delivered is worse than no row.

## When a send fails, finish BOTH halves by hand

A flow that dies while sending has already done everything above that point and none of what comes
after. People remember to resend the message and forget the rest.

- **Everything above the failure already happened.** Do not redo it; check first, or you write the
  same thing twice.
- **Send the message the flow actually produced**, which is sitting in the failed run. Do not retype
  it from memory - a re-written message contains differences nobody reviewed.
- **Everything below the failure never happened**, and it is usually the bookkeeping: statuses moved
  on, records marked done, something archived. Read those off the steps themselves rather than
  guessing what should have happened.

**If the message grants someone access to something, check the real thing before resending.** A
record saying a code was created is a claim about the past. The lock, the account, the door is the
only thing that actually knows.

## Debugging

Reading a broken run through the interface is slow. Be systematic instead of clicking around.

1. **Is it switched on.**
2. **Did it run at all.** No run at all is a trigger problem. A run that did nothing is a filter
   problem. These have completely different causes.
3. **How many items did each step handle.** The first step that drops to zero is the answer.
4. **Look at the actual data that step received**, not what it was supposed to receive.

n8n has its own assistant built in, and for a broken run it is genuinely faster than reasoning from
outside. Use it for diagnosis. Keep building in your own hands.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| It never ran | The trigger, or the flow is switched off | Check it is on before anything else |
| It ran and did nothing | A filter matched nothing | Look at the item count on each step and find the first zero |
| It worked and then stopped, with nothing changed | A credential expired | Check the sign-in, especially if several flows failed together |
| It works in a test and not for real | The test skipped the real trigger | Make the real event happen and watch it |
| Two flows give different answers to the same question | The logic was copied instead of shared | Build it once, have both call it |
| It runs over and over | It reacts to a change it makes itself | Add a guard so it only writes when something actually differs |
| A step started using default or blank values after an unrelated edit | A step was inserted above it, so "the previous step" now means something else | Have it name the step it needs instead of taking whatever is nearest |
| Almost every run is green, yet it has never actually delivered anything | The green runs are days it found nothing to do; it failed on the days that mattered | Count the items the first real step found, not the runs that succeeded |
| A message went out with an empty recipient, subject or body | The sending step is reading from whatever ran before it, and something new was put there | Check what feeds the step before hunting through records; the value is usually correct one step up |
| It broke right after somebody fixed something else in it | The repair changed the ORDER of the steps, not just the logic | Check every step below the edit, especially recipients and yes/no decisions |
| Something went out that should not have | It was switched on before a quiet period | Point it at the owner, run it for real, then switch over |
| The list says live, but nobody ever receives anything | It is still in its quiet period and the row was never moved across | Check where the flow actually delivers, then correct the row |
| A flow that should be quiet reaches a real person | The recipient was switched over before anyone meant it to go live | Point it back at the owner, then move the row to match |
| Nobody knows what a flow does | It has no row in the automations list | Write the row. A flow nobody wrote down cannot be maintained |
