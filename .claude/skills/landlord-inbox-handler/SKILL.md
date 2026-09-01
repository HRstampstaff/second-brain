---
name: landlord-inbox-handler
description: "Read a self-managing landlord's email inbox and triage the landlord mail: produce a prioritized daily brief, draft replies for routine items (drafts only, never auto-send), and flag anything urgent. Covers tenant requests, maintenance reports, lease questions, payment and utility notices, and vendor mail. Trigger when the user says 'check my inbox', 'run my inbox', 'triage my email', 'daily brief', 'anything urgent in my email', 'handle my landlord mail', or when a scheduled daily routine invokes this skill. Works with Gmail or Outlook through the user's own email connector. Never sends email and never makes rental decisions about applicants or tenants."
---

# Landlord Inbox Handler

**Version: 1.2 - 2026-08-24**

## Where this sits, and the two skills it is confused with

**This skill is the ACTION lane. It reads today's mail and turns it into things to do today.** That is
its whole job, and everything below serves it.

It gets confused with `daily-brain-feed`, because both read the same mailbox once a day as a routine
row. **They are not the same job and neither replaces the other:**

- **This skill keeps what needs doing.** A leak, a quote, a question, a decision. Its output is
  short-lived and it is thrown away once acted on.
- **`daily-brain-feed` keeps what changes how the business runs**, and throws away everything
  actionable. Its output is permanent and it goes into the Memory Vault.

They are opposites, which is exactly why one file cannot do both: each one's output is the other's
rubbish. **They also stay separate because this one is core and that one is optional and heavy.**
An owner should be able to run this and never turn that on.

**What they DO share is the reading, and reading the same mailbox twice in one morning is pure
waste.** So: **this skill runs first in the pass and does the reading. `daily-brain-feed` runs later
and works from what this pass already read, rather than going back to the mailbox.** It only reaches
the mailbox directly for sources this skill does not cover, such as meeting transcripts.

**And the brief does not go to the owner as its own message.** See "Running this every morning".

Your inbox is where your rental business actually happens: tenants report leaks, ask about their lease, vendors send quotes, banks and utilities send notices. This skill makes Claude your inbox first-responder. Once a day (or whenever you ask), Claude reads the new mail, sorts the landlord items from the noise, writes you a short prioritized brief, drafts replies for the routine stuff, and flags anything that cannot wait.

**Three hard promises this skill keeps, always:**

1. **Drafts only, never auto-send.** Every reply Claude writes lands in your Drafts folder or in the chat for you to review. You are the only one who ever hits Send.
2. **No rental decisions.** Claude never decides, recommends, or implies who should get, keep, or lose a rental (see the Fair Housing / FCRA guardrail below).
3. **Read and draft, nothing destructive.** Claude never deletes, archives, or forwards your mail unless you explicitly ask in the moment.

---

## Setup (once)

This skill uses YOUR email account through YOUR connector. Claude never holds your password.

1. **Connect your email provider.** In Claude's connector settings, connect **Gmail** (Google Workspace connector) or **Outlook / Microsoft 365** (Microsoft connector) and sign in through the provider's own login screen. Claude only needs read and draft-create access; do not grant send permissions if your provider offers granular scopes.
2. **Tell Claude your setup** the first time you run the skill. It will ask for and remember:
   - Which mailbox to watch (your main inbox, or a dedicated folder/label like "Rentals" if you already filter).
   - Where your properties, units and tenants are recorded, so mail can be matched to the right place. If Vera has written your base file, read that instead of keeping a second list here, because two lists drift apart.
   - Your preferred vendors (plumber, electrician, handyman) so vendor mail is recognized.
   - Your emergency line: what YOU consider drop-everything urgent (default list is in the Urgent category below).
3. **Optional: a "Landlord" label/folder.** If you want Claude to also label triaged mail (Gmail labels or Outlook categories/folders), say so during setup. Labeling is off by default; the brief works without it.

No properties list yet? The skill still works. Claude will infer property context from the emails themselves and ask you when it cannot tell.

---

## Triage categories and rules

Every new email in the watch window gets exactly one primary category. When two could apply, the higher row in this table wins (it is ordered by priority).

| # | Category | What belongs here | What Claude does |
|---|----------|-------------------|------------------|
| 1 | **URGENT - flag now** | Anything threatening safety, habitability, or the property: active leaks or flooding, no heat in winter / no AC in extreme heat, no hot water, gas smell, electrical hazard, break-in or lock failure, fire, sewage backup. Also: any legal service (court notice, attorney letter, government/code-enforcement notice) and any tenant message that reads as an emergency even if vaguely worded. | Top of the brief, bolded, with the one next action. NO draft that could delay action ("we'll look into it"); instead a short acknowledgment draft that tells the tenant help is being arranged, plus a suggested vendor to call from your list. When in doubt between urgent and routine, choose urgent. |
| 2 | **Maintenance - routine** | Repair requests that are real but not emergencies: dripping faucet, appliance acting up, pest sighting, door sticking, light fixture out. | Draft an acknowledgment to the tenant (received, what happens next, asks for photos/access windows if missing) and, if you have a matching vendor, a separate draft to the vendor requesting availability and a quote. Both drafts, you send. |
| 3 | **Tenant requests - non-maintenance** | Anything a tenant asks that is not a repair: guest or parking questions, adding an occupant or pet, early move-out or transfer asks, complaint about a neighbor, request for a document copy. | Summarize the ask in the brief. Draft a reply ONLY if the answer is factual and already established (in the lease, in your stated policies, or in something you told Claude before). If the answer requires a decision you have not made, the brief presents the question to YOU with the relevant lease/policy language if known - no draft that commits you. |
| 4 | **Lease questions** | Renewal timing, notice periods, security deposit questions, lease term clarifications, requests to review or sign documents. | Brief item with the key dates pulled from the email. Draft a reply only for pure factual questions where you have given Claude the answer (e.g. your standard notice period). Anything about CHANGING lease terms, rent amount, or renewal decisions goes to you undrafted - those are your calls. |
| 5 | **Payment and money notices** | Rent received/failed notices from your payment platform, tenant messages about paying late, bank and mortgage notices, utility bills, insurance notices, tax documents. | Brief item with the amount and due date extracted. For a tenant writing about a late payment: a neutral acknowledgment draft that confirms receipt of their message and states you will follow up - never a draft that waives, threatens, or negotiates. Platform/bank/utility notices are summarized only (no reply needed). |
| 6 | **Vendor mail** | Quotes, invoices, scheduling confirmations, follow-ups from contractors and service companies. | Brief item with the number that matters (quote amount, invoice total, appointment time). Draft simple logistics replies (confirm a time, request an itemized quote, ask for COI/W-9). Approving a quote or paying an invoice is always yours - Claude drafts the acceptance only after you say yes in the brief conversation. |
| 7 | **Prospective tenants / listing inquiries** | Someone asking about an advertised unit: availability, viewing, application questions. | Brief item only, plus (if you have given Claude your listing facts) a draft that shares ONLY objective listing information: rent, deposit, availability date, viewing process, how to apply. See the Fair Housing guardrail - these drafts never comment on the person, never pre-screen, never discourage or encourage anyone. |
| 8 | **Everything else** | Newsletters, promotions, personal mail, anything not landlord business. | One collapsed line at the bottom of the brief ("14 other emails, nothing landlord-related") unless you asked Claude to handle your whole inbox. |

**Matching rules:** match sender addresses against your tenant/vendor lists first, then property mentions in the subject/body, then context. If Claude cannot tell which property or tenant an email belongs to, it says so in the brief and asks - it never guesses silently.

---

## Fair Housing / FCRA guardrail (non-negotiable)

This skill is an inbox assistant, not a screening or decision tool, and it draws a hard line:

- **Claude never makes, recommends, or implies a rental decision.** It will not say or draft anything about whether to accept, reject, renew, not renew, evict, or otherwise select or remove a tenant or applicant. Those decisions are yours, made outside this skill.
- **Claude never evaluates or characterizes applicants or tenants as people.** No scoring, ranking, "good tenant / red flag" commentary, and no inferences about anyone's protected characteristics. Which characteristics are protected is a matter of federal, state and city law, and this skill does not state them: Vera holds that, and your attorney settles it.
- **Prospect drafts contain only objective listing facts** - rent, deposit, availability, viewing logistics, application process - and the identical facts go to every prospect. Claude will not tailor availability or terms per person and will not draft steering language ("this neighborhood might not be a fit").
- **Reports about applicants are out of scope.** Claude does not order, summarize, or act on credit reports, background checks, or eviction histories here, and does not draft the message that communicates a decision resting on one. If such material shows up, the brief flags that it exists and stops. Ask Vera, and your attorney, what that message has to contain.
- **Reasonable-accommodation and discrimination-related messages are handled with care:** if a tenant raises a disability accommodation, service/assistance animal, or a discrimination concern, Claude flags it prominently in the brief, drafts at most a neutral "received, I will respond shortly" acknowledgment, and recommends you respond personally, with your attorney where it matters.
- If you ask for something that crosses these lines, Claude declines that part, explains why in one sentence, and completes the rest of the task.

None of this is legal advice. This skill never states what the law requires: ask Vera, who reads what you have recorded, and confirm anything that matters with your own attorney.

---

## Draft-tone rules

Every draft Claude writes follows these:

1. **Sound like a professional landlord, not a bot.** Warm, plain English, short sentences. No corporate filler ("per my last email"), no legalese unless quoting the lease.
2. **First person, your voice.** Drafts are written as you. If you have a preferred sign-off, Claude uses it; otherwise drafts end on the last content line and you add your own signature.
3. **Acknowledge, state the next step, give a time expectation you control.** The skeleton of almost every tenant draft: "Got your message about X. Here's what happens next: Y. You'll hear from me/the plumber by Z." Claude only writes a time expectation you have approved as standard.
4. **Never commit money, terms, or decisions.** No draft agrees to a price, waives a fee, changes a lease term, or promises an outcome unless you already made that decision in the conversation.
5. **One topic per draft.** If a tenant email raises three issues, the draft addresses all three briefly or Claude tells you it split them - but it never leaves an issue silently unanswered.
6. **Empathy where it belongs.** Repairs are disruptions in someone's home. A line of acknowledgment ("sorry you're dealing with this") costs nothing and de-escalates.
7. **No em dashes. No jargon.** And nothing in a draft you would not want read aloud in small-claims court.

---

## The daily brief (output format)

The brief is one message, scannable in under a minute:

```
INBOX BRIEF - Tue Jul 16 - 9 landlord emails since yesterday

URGENT (1)
1. [123 Main, Unit 2 - Dana R.] Water heater leaking into closet, sent 7:42am.
   -> Draft ack ready. Suggest calling Reyes Plumbing (your water-heater vendor). Say "approve 1" to keep the ack draft ready in your Drafts.

NEEDS YOUR DECISION (2)
2. [456 Oak - Marcus T.] Asks to add a roommate to the lease. Lease sec. 14 requires your written approval. Your call - want me to draft a yes-with-application reply or a follow-up question?
3. [Vendor - ACME Roofing] Quote came in: $2,850 for the flat-roof patch. Approve, negotiate, or get a second quote?

HANDLED - DRAFTS WAITING (3)
4. [123 Main, Unit 1 - Priya S.] Dishwasher not draining -> tenant ack draft + availability request to Reyes Plumbing.
5. [789 Pine - prospect] Viewing request -> listing-facts reply drafted.
6. [456 Oak - Marcus T.] Asked for a copy of his lease -> reply drafted pointing to the attached copy (attach before sending).

FYI - NO ACTION (3)
7. Rent received: 123 Main Unit 1, $1,650 (RentRedi).
8. City water bill, 456 Oak: $118.40 due Aug 1.
9. Insurance renewal notice, policy ending Sep 30 - flagging again 30 days out.

(11 other emails, nothing landlord-related.)
```

Rules for the brief: urgent always first; every item names the property and person; every draft is announced, never silently created; "needs your decision" items ask a clear either/or question; money items always show the amount and date. After the brief, you reply in plain English ("approve 1 and 4, hold 5, get a second roof quote") and Claude executes - still creating drafts, never sending.

---

## Running this every morning

The skill shines when it runs every morning without you asking.

**⛔ Do NOT create a scheduled task for this.** Scheduled runs are capped per day by your plan, and
that budget is spent by the one schedule that runs everything. **Add a ROW to your routines table
instead**, and Vera will run this as part of the daily pass. One schedule, many jobs. If you create a
separate schedule for each job you will run out within a week.

**What to put in the row:**

1. Frequency daily, and a priority that puts it where you want it in the morning order.
2. Set its instructions to exactly this (adjust the mailbox or time window if you customized setup):

   > Use the landlord-inbox-handler skill. Read my connected inbox for everything new since the last run (default: the past 24 hours), triage per the skill, create the reply drafts in my Drafts folder, and deliver the daily brief. Do not send anything. If there is at least one URGENT item, put URGENT and the property in the first line.

3. **The brief is NOT a separate thing you read. It folds into Vera's day plan.** This is the part
   people get wrong, and it is worth being blunt about: if the morning produces a day plan AND an
   inbox brief AND a feed report, you have three things to read and you will read one of them. **One
   surface, every morning: the day plan.**

   So the row's output goes into the pass, not around it:
   - **URGENT items go to the top of the day plan**, marked as needing you, with the one next action.
   - **Decision items become items in the day plan** that need you, phrased as the actual question.
   - **Drafts that are ready say so in one line each**, not as a separate list to go and find.
   - **Everything with no action gets one collapsed line**, or nothing at all.

   The full categorised brief in the format below is still how you THINK. It is a working format, and
   it is worth writing out when you are asked for the inbox specifically, or when something is
   complicated enough to need laying out. It is not the daily delivery.
4. Leave the row paused, run it manually once ("run my inbox brief now") to confirm the connector works and the categories match your mail, then set it active.

**Nothing here ever sends.** Replies are drafted and left for you. That holds whether you run it by hand or as part of the daily pass, and there is no setting anywhere that changes it. Nothing this system produces reaches a tenant or a vendor without you reading it first.

**If you are not running routines yet:** say "run my inbox" each morning. The skill behaves identically and you lose nothing but the automation.

**Routine hygiene:**
- One run per day is the sweet spot. Urgent items do not wait for the routine anyway once real-time triage exists (see roadmap below); until then, the daily run plus your phone's normal notifications cover it.
- The routine must run with the SAME connector permissions as an interactive session: read + create-draft, no send.
- If a run finds zero landlord mail, the brief is one line ("Nothing today - 6 emails, none landlord-related"). No news is a valid brief.

---

## What this skill deliberately does NOT do (v1)

- **No sending.** Not even "safe" ones. Version 1 has no auto-send and no send-after-timeout.
- **No real-time monitoring.** It runs when scheduled or asked. Instant triage of incoming mail (n8n watching the mailbox) and instant pings (Slack/SMS "URGENT: leak at 123 Main") are the planned v2, built on the same categories and guardrails in this file.
- **No tenant screening, no applications processing, no consumer reports** (guardrail above).
- **No payment actions.** It reads money notices; it never pays, charges, or moves money.
- **No calendar writes, no CRM writes.** Logging maintenance items into your property tracker is a natural v2 hook once this skill and your tracker are both in place.
