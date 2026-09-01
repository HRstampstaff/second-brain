---
name: docusign
description: "Load before ANY work involving getting something signed: sending a lease, an amendment, a release, a notice or an addendum for signature, chasing one that has not come back, or filing one that has. Covers the rule that you prepare and the owner sends, why a document out for signature cannot be quietly corrected, templates and why they are worth the setup, signing order, what actually comes back and where it goes, and the difference between a signature and an agreement. Trigger on 'DocuSign', 'send for signature', 'e-sign', 'get this signed', 'the lease is ready', 'they have not signed', 'countersign', 'addendum', 'amendment', or any moment a document needs somebody's name on it."
---

# DocuSign

**Version: 1.0 - 2026-08-24**

This is the point where a draft becomes a binding document. Everything before it is reversible.
Everything after it is not, and it is visible to a tenant.

## The rule that governs everything else

**You prepare. The owner sends.**

Not because sending is technically hard, but because sending is the irreversible step: it puts a
document in front of a real person, it starts a legal process, and pulling it back is embarrassing
rather than routine. Prepare it so completely that sending is one click, and leave the click to them.

The same applies at the other end. **Countersigning is the owner's signature, and only they can give
it.** Never treat a countersignature as a formality to be got through.

## Before anything goes out

A document sent with an error is not a data problem, it is a tenant reading the wrong terms.

- **Check the parties, the property, the dates and the money.** Every time, against the hub, not
  against memory.
- **Check who is actually signing.** Everyone on the tenancy, spelled as they spell it. A missing
  signer means the whole thing is sent again.
- **Check the email addresses.** The single most common cause of "they never got it" is a typo, and
  it looks identical to being ignored.
- **Read it as the tenant will read it.** Anything ambiguous now becomes a question later, and the
  question comes back to the owner.

**Anything with legal weight goes past the owner before it goes out, and anything unusual goes past
their attorney.** Wording that varies by place, notice periods, deposit handling, anything about
ending a tenancy early: these are not judgement calls to make on the owner's behalf. Lay out the
facts, name the choice, and stop.

## A document out for signature cannot be quietly corrected

Once it has been sent, the version the tenant is looking at is the version that exists. **There is no
edit.** Fixing a mistake means withdrawing it and sending a corrected one, which the tenant sees.

**So the checking happens before, and it happens properly.** This is the reason the preparation step
is worth being slow about.

If something does have to be corrected: withdraw it, send the corrected version, and say plainly to
the tenant that a corrected copy is coming. Silence here makes an honest error look like something
worse.

## Templates

A lease that goes out twenty times a year should not be assembled twenty times. **A template holds
the document and the positions of every field, so preparing one becomes filling in values rather
than rebuilding a layout.**

Worth knowing before setting them up:

- **The setup is genuinely fiddly and worth doing once, carefully.** Field positions are the part
  that goes wrong, and a field in the wrong place is not obvious until somebody signs in the wrong
  box.
- **Changing the underlying document breaks the field positions.** After any change to the document
  itself, check every field again.
- **A template per document type, not per property.** Property-specific values are filled in, not
  built in. Templates that multiply stop being maintained.

## Signing order

Who signs first is a real decision, not a default.

- **Tenants first, owner last** is usually right for a lease: the owner countersigns what has been
  agreed, and the completed document is final the moment they do.
- **All at once** is faster and gives up that control.

Whichever is chosen, **it has to be the same every time**, because the routine that watches for
completion depends on knowing what "done" looks like.

## What comes back, and where it goes

A completed signing produces the signed document and a record of who signed it and when. **Both
matter.** The second one is the evidence, and it is the thing people forget to keep.

- **File the signed copy the same day**, named and stored the way everything else is. See
  `file-namer` and `google-drive`.
- **Record in the hub that it is signed, and when.** A signed lease that nothing knows about will be
  chased.
- **Keep the completion record with the document**, not separately.

## A signature is not the same as an agreement

Worth saying because it causes real trouble.

- **A signature on the wrong version is still a signature on that version.** What was signed is what
  applies, not what was meant.
- **A tenancy that has started without a signed document has still started.** The absence of a
  signature does not undo what has been agreed and acted on. It just means nobody can prove the
  terms, which is the owner's problem rather than the tenant's.
- **When the signed document and the hub disagree about a date, a name or an amount, the signed
  document wins.** Correct the hub, never the other way round.

## Chasing

A document sitting unsigned is a tenancy not starting.

- **Chase on a rhythm rather than on somebody remembering.** A routine that lists everything
  outstanding and how long it has been outstanding.
- **The first chase is a nudge, not a warning.** Most non-signatures are an unread email or a phone
  that will not open the attachment, not reluctance.
- **After two chases, the question is whether they still want it**, and that is a conversation, not
  another reminder.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| They say they never received it | A typo in the address, or it went to spam | Check the address character by character before assuming anything |
| It went out with a mistake in it | It was not checked against the hub before sending | Withdraw, correct, resend, and tell them plainly |
| Signatures landed in the wrong places | The underlying document changed after the template was built | Re-check every field position after any document change |
| It is signed and something is still chasing it | The hub was never told | Record signed and the date in the hub the same day |
| The lease and the hub disagree | Somebody edited the hub after signing | The signed document wins. Correct the hub |
| It has been outstanding for weeks | Nobody is watching the outstanding list | Put chasing on a routine |
| Nobody can find the signed copy | It was never filed | File it the day it completes, with the completion record |
