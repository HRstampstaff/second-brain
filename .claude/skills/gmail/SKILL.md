---
name: gmail
description: "Load before ANY work in the owner's mailbox: reading it, searching it, drafting a reply, filing something, or setting up labels. Covers the hard rule that you draft and never send, searching properly instead of scrolling, replying inside a thread rather than starting a new one, labels as a queue rather than decoration, what to pull out of an email and put in the hub, and the traps that make a search look empty when it is not. Trigger on 'my email', 'my inbox', 'check my mail', 'reply to this', 'draft a response', 'did they email', 'find the email where', 'label', 'archive', or any request touching mail."
---

# Gmail

**Version: 1.0 - 2026-08-24**

The mailbox is where most of the business actually arrives. It is also the place where a mistake is
instantly visible to somebody outside the business, which is why the first rule is absolute.

## You draft. You never send.

**Every message is prepared as a draft and the owner sends it.** No exceptions, no "this one is
obviously fine", no standing permission.

The reason is not that the writing is untrustworthy. It is that a sent email cannot be recalled, it
goes to a real person, and the cost of one wrong one is out of all proportion to the time saved.
**A draft in the right thread, ready to send, is the finished deliverable.**

If the owner says they trust you to send: the answer is that everything will be ready to go in one
click, and the click stays theirs.

## Reply inside the thread

**A reply belongs in the conversation it answers.** Starting a new message instead splits the thread,
so the recipient loses the context, and so does everyone looking at it later.

**Create the reply as a reply.** Do not compose a fresh message and paste the history in.

**Never rebuild a reply draft by editing a different draft**, either. A reply is anchored to the
thread it was created in, and rewriting it a different way loses that anchor. The reply then leaves
the conversation and arrives as an orphan. If a reply draft is wrong, discard it and create a new
reply on the same thread.

## Searching properly

Scrolling is not searching, and the mailbox is bigger than it looks.

- **Search by who, by when, and by a word that would definitely be in it.** Not by what it was
  about, because the sender described it differently.
- **A search that finds nothing is not proof it does not exist.** Attachments, quoted text and
  slightly different spellings all defeat an exact search. Widen it before concluding.
- **The most recent message in a thread is not always the one that shows in a search result.** When
  something matters, open the thread and look at the end of it. A reply that changes everything is
  very easy to miss this way.
- **When searching by label, use the label the owner actually sees**, not an internal identifier. A
  search that returns nothing when the label clearly has messages in it is almost always this.

## Labels are a queue, not decoration

The useful way to think about a label: **anything wearing it still needs somebody. Anything dealt
with loses it.**

That single discipline turns a label into a to-do list that is always correct, and it is worth more
than any amount of elaborate filing.

- **One label per thing that needs doing**, and it comes off when the thing is done.
- **A message that has been dealt with gets archived or moved out of the queue in the same pass.**
  Leaving it wearing the label breaks the whole model, because now the label means "maybe".
- **Do not build a deep hierarchy of labels.** Nobody maintains it. The search is better than the
  filing.

**Anything the automations produce follows the same rule.** A notification that has been reviewed is
moved out. A queue that only ever grows stops being read.

## Getting what matters out of the mailbox

**An email is a delivery mechanism, not a filing system.** Anything that needs to be acted on, or
remembered, or reported on, belongs in the hub.

- **A request becomes a task.** With who, what and when, in the hub, not left in the thread.
- **A fact becomes a field.** A new phone number, a move-out date, a confirmed amount. Put it where
  it is looked up, then it is found by whoever needs it.
- **A document becomes a filed document.** Not an attachment somebody will search for later. See
  `file-namer` and `google-drive`.
- **A decision becomes a written record.** Somebody agreeing to something in an email is the only
  evidence it happened. Save the words, not a summary.

**Do this in the same pass as reading it.** Anything left for later stays in the mailbox, and the
mailbox is where things go to be forgotten.

## Writing the draft

- **Answer the question first.** Not context, not background. The answer.
- **Short.** Almost every draft is improved by deleting half of it, and the half worth keeping is the
  part that says what happens next.
- **Numbered points when there is more than one thing**, because a wall of text gets one reply to the
  first item.
- **Never more than a few asks in one message.** More than that and none of them get done.
- **Say what happens next and who does it.** Most follow-up emails exist because that was left
  unsaid.
- **Formatting written for a chat window does not survive in an email.** Asterisks around a word
  arrive as asterisks. If something needs emphasis, use the mail formatting, or write the sentence so
  it does not need any.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| A search returns nothing on something that exists | Too exact, or the words are in an attachment | Widen it. Search by sender and date range instead |
| A label search is empty but the label has mail in it | The internal identifier was used instead of the visible name | Use the label name the owner sees |
| A reply arrived outside the conversation | It was composed fresh, or a draft was rewritten and lost its anchor | Discard and create a new reply on the thread |
| The owner missed something important | It was read and left in place, with nothing created in the hub | Turn it into a task in the same pass as reading it |
| The queue label keeps growing | Things are not being taken out when they are dealt with | Take the label off as part of dealing with it |
| A thread looks unanswered and was not | The latest reply did not surface in the search | Open the thread and read the end of it |
| Formatting arrived as symbols | Chat formatting was used in an email | Write it plainly or use real formatting |
