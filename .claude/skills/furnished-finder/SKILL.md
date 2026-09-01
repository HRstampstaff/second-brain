---
name: furnished-finder
description: "Load before ANY work involving Furnished Finder: reading enquiries, drafting replies, qualifying a lead, or automating the message inbox. Covers why the notification email is nearly empty, the message box that sends on its own and how to stop it, email-only login, the two different names one listing has, how to write the policy the replies are built from, and what Furnished Finder's own rules say must stay on the platform. Trigger on 'Furnished Finder', 'FF', 'mid-term rental enquiry', 'a traveling nurse messaged me', 'reply to the enquiry', 'my listing got a message', or any job that reads from or posts to the Furnished Finder inbox."
---

# Furnished Finder

**Version: 1.0 - 2026-08-24**

Furnished Finder is a marketplace for furnished mid-term stays, roughly a month and up. Travelling
professionals message owners through its own inbox. If the owner lists there, this is where their
leads arrive.

**It has no connector and no public interface for other software.** Everything below happens by
driving the website: the owner's own browser is the normal answer, and a cloud browser service is the
answer only when a reply genuinely cannot wait for them. Load `skyvern` before choosing.

## ⛔ Two things that surprise everyone, and both change the design

**1. The notification email does not contain the message.** When someone enquires, the email says who
it is from and which listing, and that is all. There is no message text, no dates, no number of
people, no contact details. That is deliberate, to pull owners back onto the platform. **So the email
tells you a lead exists and nothing about what they asked.** Anything that drafts a reply has to open
the inbox and read the conversation first. A design that tries to answer from the email alone will
answer questions nobody asked.

**2. The message box sends the moment it sees a line break.** There is no draft state. This is the
single most expensive thing to learn late, so it has its own section below.

## ⛔⛔ The message box sends on its own

Typing into the reply box character by character means every line break in the text is a press of
Enter, and Enter sends. A two paragraph reply therefore arrives as two messages, the first one half
finished, to a real person who is deciding whether to rent from this owner.

**The fix is to strip every line break out of the reply before it goes anywhere near the browser.**
Collapse them to single spaces. If the text contains no line breaks, no Enter can be simulated, and
the problem cannot happen.

**⛔ Telling the automation "never press Enter" DOES NOT WORK, and this is the part people get wrong.**
The keystrokes happen at a lower level than any instruction it reads. By the time it considers your
rule, the message has already gone. Instructions are worth adding as a second layer, but **the
sanitising step is the actual fix and nothing substitutes for it.**

Everything else is belt and braces: keep the step limit low so a retry cannot resend, paste the whole
message in one action rather than typing it, click the send arrow rather than pressing Enter, and
stop if the message already appears in the thread.

**Write single paragraph replies anyway.** This is a chat. Real people send one paragraph. A tidy
multi paragraph letter reads more like a robot, not less.

## What you may do alone, and what stops for the owner

The person at the other end is a stranger deciding whether to hand this owner several thousand
pounds or dollars and move into their building. Treat the inbox accordingly.

**On your own:** read the inbox, read a conversation end to end, pull out what the enquirer said,
work out whether they fit the owner's criteria, and write a draft.

**Stops for the owner, every time:** sending anything. Also agreeing a price, a date, a discount or
an exception; declining someone; and saying yes to a booking. Those are the owner's word, not yours.

**Never invent a fact to keep a conversation moving.** If the policy does not answer it, say so to
the owner and let the reply wait. A made up availability date or price becomes something they have to
honour or take back, and taking it back is how a lead is lost and a review is earned.

## Signing in

**Email address, then a code sent to that address. There is no password.** Tell an automation to
enter a password and it will hunt for a field that does not exist and fail. Say that the sign in
takes an email, then a code.

Because the code arrives by email, this is the solvable kind of two factor. See `skyvern` for how to
handle codes, and for the rule that a login dying at the code screen is a delivery problem rather
than a broken tool.

## The kinds of lead, because they are not the same job

**A first enquiry.** Somebody found the listing and wrote. The notification names the enquirer and the
listing and carries a listing reference.

**A reply in a conversation already running.** The notification looks different: it usually gives only
a first name where the first kind gave a fuller one, the fuller name sits in the body rather than the
subject line, and there is no listing reference at all. **A trigger written only around the first kind
silently ignores every ongoing conversation**, which is the worst failure available here, because the
owner looks unresponsive to exactly the people who are furthest along.

So watch for both, read the subject AND the body, and do not assume the shape of the first kind.

**A recommendation from the platform.** The platform's own matching suggests somebody. **Nobody has
written anything**, so there is no conversation to reply to and the job is to decide whether to reach
out first. These are pre-filtered by the platform, not by the owner's criteria, so they often do not
fit at all. Run them through the owner's own rules before contacting anyone.

**Whatever kind it is, the same conversation-reading applies.** A thread may be on its tenth message,
so the reply must answer the newest message in the context of everything already said, without
re-greeting or re-asking. That behaviour belongs in the owner's policy, not buried in an automation.

### ⛔ The name in the notification is not the name in the inbox

The conversation list shows people as a first name plus a single initial. What arrives in a
notification can be a full name, or a username with a dot and some digits in it, or a first name
alone. **Searching the inbox for the raw notification name will find nothing**, and finding nothing
looks exactly like having no new messages.

Convert to the first-name-plus-initial form before searching. Where only a first name is available,
it can match more than one person, so use the listing to tell them apart.

## Screening

The platform has its own tenant screening, offered from inside the conversation. It is separate from
whatever standards the owner applies themselves, and different owners use one, the other, or both.

**Write down which of the two this owner uses**, in the general policy, because a reply that offers
platform screening to someone whose owner does their own checks, or the reverse, is confusing at the
exact moment trust matters. Screening is also never something to start on the owner's behalf without
asking: it involves the enquirer's personal data.

## ⛔ One listing has two different names, and they do not match

The same listing is described one way in the notification email and a different way on the live site.
Both are real. **Anything that identifies a listing by matching its name will silently stop
recognising it the day the owner renames it**, and the failure is quiet: enquiries simply stop being
answered while everything reports as working.

**So store both names against the listing, and match a lead against either one.** Guard each match so
an empty name cannot match everything, or one blank reading will attach a lead to a random listing.

**Do not "fix" this by loosening to a fuzzy or partial match.** Match exactly, but match against every
name the platform actually uses. When you correct one name, put the old wording in the other field
rather than deleting it, because that is what makes the second path work.

## The policy is the product, not the prompt

Every reply is only as good as what the owner has written down. **When replies are weak, the answer
is always to improve the policy, never to tinker with the wording of the instruction.**

Keep it in two layers:

- **One general policy** for how they want to sound, what to do when something is unclear, and
  anything true across everything they own.
- **One policy per listing** for what is specific to it: what it costs, when it is free, minimum
  stay, pets, parking, laundry, utilities, smoking, guests.

**The listing policy always wins over the general one.** The general one is the fallback.

Keep both somewhere the owner edits themselves, in their hub, so changing how replies read is a cell
they type in rather than a change to any automation.

What a policy has to cover before it is finished: what it costs and when it is available, the house
rules, what makes someone a good fit and what rules them out, the questions to ask every enquirer,
and when to stop and hand it to the owner.

## Drafting a reply

Read the WHOLE conversation, never just the newest message. Re-asking something they already answered
is the fastest way to look automated.

Then: answer what they asked, and work the owner's own questions in naturally rather than
interrogating them. If they have already answered everything, move towards booking or decline kindly
and point at something else the owner has. **If the answer is not in the policy, stop and hand it to
the owner.** Never invent a price, a date or a rule. An invented answer on this platform becomes a
promise the owner has to honour or retract.

**Nothing sends without a person reading it**, in any mode. This is the standing rule and this
platform is exactly why it exists.

## What Furnished Finder itself expects

Worth knowing, because a well meant reply can break their rules:

- **Money and terms stay on the platform.** Price, deposits, lease terms and how to pay are to be
  discussed in the Furnished Finder chat, not moved to email. Only messages on the platform can be
  reviewed if there is ever a dispute, which is the whole reason.
- **Moving to email or phone for logistics is allowed**, and contact details are the enquirer's to
  share when they choose. Telling someone where to send their documents is fine.
- **The chat carries no file uploads.** Documents come as a shared cloud link pasted into the chat, or
  by email. Do not tell someone to attach a file to the conversation, because they cannot.
- Their standards of conduct apply to conversations that started there even after they move off it.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| The reply arrived split into pieces, or twice | Line breaks in the text, or a retry | Strip line breaks before the text reaches the browser. Lower the step limit |
| A reply answers something nobody asked | It was written from the notification email | Read the conversation on the platform first. The email holds no message |
| One listing stopped getting answers, everything else works | The listing was renamed | Match against both stored names, and update the one that changed without deleting the other |
| A lead got attached to the wrong listing | A blank name matched everything | Guard every name match so an empty value matches nothing |
| The sign in fails looking for a password | There is no password on this platform | Email, then the code, and nothing else |
| Replies are vague or generic | The policy is thin | Fill the policy. Do not rewrite the instruction |
| The enquirer says they cannot send a photo | The chat has no uploads | Ask for a shared cloud link, or an email |
