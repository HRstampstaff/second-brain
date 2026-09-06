---
name: connect-quickbooks-to-n8n
description: "Load before connecting QuickBooks to n8n, before creating an Intuit developer app, and BEFORE agreeing that automating the books is a job that can be finished today. Covers the one thing that actually blocks it, which is Intuit's review of your app and not the build. Then: why the sandbox is a dead end for real books, filling the App details form and the Compliance questionnaire, getting production keys, building the n8n credential with the redirect URL n8n shows you and the environment set to production, finding the Company ID that is separate from the connection, pinning the minor version, and the only finish that counts, which is a live read of your own real data. Trigger on 'connect QuickBooks to n8n', 'QuickBooks API', 'Intuit developer app', 'production keys', 'app is in development', 'my QuickBooks credential will not connect', 'the QuickBooks credential says not connected', 'there is no Sandbox account', 'realm ID', 'Company ID', or any attempt to get an n8n flow reading from or writing to QuickBooks."
---

# Connect QuickBooks to n8n

**Version: 1.0 - 2026-09-03**

This is one job and one job only: get the owner's own n8n instance talking to the owner's own
QuickBooks Online company, starting from nothing and finishing at a credential that provably works.
It does not build any automation on top of that. It gets you a connection you have proven is real, so
the next skill can use it.

## Read this before anyone starts: the wall is Intuit's review, not the build

**The forms and the setup are under an hour of work. The waiting is the cost.** An Intuit developer
app is born "in development" and hands out sandbox keys only. Production keys, the ones that reach the
owner's real books, unlock only after two things are done in the developer portal, App details and a
Compliance questionnaire, and then Intuit reviews what was submitted. That review takes **several
days, sometimes longer.**

**This is true for a private, one-company, internal connection exactly as it is for a public app in an
app store.** There is no lighter tier for "it is just for me". There is no way to skip the review.

**So do not start this on a Friday afternoon expecting a working connection by evening.** Set the
expectation on day one: fill the forms, submit, and then wait. The connection cannot be finished in
one sitting, and that is normal, not a sign anything went wrong.

## Go straight to production. The sandbox is a trap for this use

It is tempting to build the n8n credential from the development keys Intuit gives you right away and
press Connect. **Do not.** For real books it fails, and it fails confusingly: pressing Connect returns
**"there is no Sandbox account"**, because the sandbox needs a separate fake test company that you
have not created. Even if you create one, its data is invented and useless for real bookkeeping.

**The sandbox is for people writing software to sell.** The owner is connecting their own live
company. Skip it entirely. Every step below is about production.

## The road, in order

### Step 1 - Create the Intuit developer account and the app

The owner signs in to the Intuit developer portal with the same Intuit login they use for QuickBooks,
and creates a new app that uses the Accounting API. The app appears "in development". This is expected.
It does not mean you did anything wrong, and it does not mean production is one click away.

### Step 2 - Fill the App details form

**This form is written for a software company that has customers, and the owner is not one.** It still
has to be answered. Fields ask for a host domain, a launch URL, a disconnect URL and a privacy policy
URL. The standard practice for a private connection is to point these at the owner's own domain: the
website they already have, or the one they use for their business.

**⛔ The privacy policy URL and the EULA link have to resolve to real pages before this form will let
you finish.** A made-up address fails. If the owner has no privacy policy or terms of use published
anywhere, that has to be sorted first, because the form will not accept a link to a page that does not
exist.

### Step 3 - Fill the Compliance questionnaire  **(OWNER ONLY)**

**This asks real security questions, and the answers must be the owner's own truthful ones.** It is not
a formality to click through. It asks how data is protected, who can reach it, and what other systems
touch it.

**⛔ Never invent an answer to make the form happy, and keep the answers consistent with each other.**
The classic trap: if the owner declares that an AI service processes any of this data, the form then
expects them to declare the platforms that AI is integrated with. An answer that contradicts an
earlier one is what gets a submission bounced.

**Honest "no" answers do not block approval.** A small private integration is allowed to say it does
not do the things a large consumer app does. Truthful and plain beats impressive and invented.

This is marked owner only because the answers describe the owner's real security posture. You can
explain what a question means. You cannot answer it for them.

### Step 4 - Answer the hosting location question honestly  **(part of Step 3)**

The questionnaire asks where the integration runs. **A cloud n8n instance may leave the internet from
a different country than the owner assumes**, and the published address ranges for that provider
change without warning. The filing is a snapshot of one moment.

**Do not paste a set of addresses from memory or from a guide.** Send the owner to their own n8n
provider's current published list and have them read today's answer off it. If the provider's egress
region surprises them, better to see it here than after the fact.

### ⏸ PAUSE HERE - submit, then wait for Intuit's review

**Once App details and the Compliance questionnaire are both complete, the owner submits the app for
production and the process legitimately stops.** Intuit reviews it over **several days, sometimes
longer.** Nothing is broken. There is no button that speeds this up and no one to call. This pause is
the whole reason this skill exists: so nobody thinks they failed when the screen simply says they are
waiting.

Come back when Intuit has granted production keys. Everything below needs them.

### Step 5 - Collect the production keys  **(OWNER ONLY for the secret)**

When production is approved, the app's Keys and credentials section shows a **production** Client ID
and Client Secret. These are a different pair from the development ones.

**The owner copies the Client Secret themselves.** It is a password to the company's books. It is
shown once in full, it is never read aloud, and it is never pasted into chat. Marked owner only for
that reason.

### Step 6 - Build the n8n credential

In n8n, create a new QuickBooks OAuth2 credential.

**⭐ Copy the OAuth Redirect URL that YOUR n8n screen shows you.** Do not type one from a guide and do
not reuse one from someone else. The exact host depends on your n8n version and how it is hosted, and
published guides very often list the wrong one. The n8n credential screen displays the correct URL for
your instance. That displayed value is the source of truth. Copy it exactly.

**⛔ Set the Environment field to Production inside the credential.** This is a separate setting from
which keys you pasted. Pasting production keys does not set it. If the keys are production and the
Environment says sandbox, the connection fails in a way that reads like a key problem when it is not.

Then paste the production Client ID, and the owner pastes the production Client Secret.

### Step 7 - Register the redirect URL on the Intuit side

Take the redirect URL you copied from the n8n screen and add it to the app's **Production** redirect
URI list in the developer portal.

**⛔ The production list and the development list are two different lists.** Adding the URL to the
development one does nothing for a production connection. It has to go in the production list, and it
has to match what n8n showed you character for character.

### Step 8 - Connect and choose the real company  **(OWNER ONLY)**

Back in n8n, press Connect. This opens Intuit's own "Sign in with Intuit" consent screen. **The owner
signs in and grants consent themselves**, because this authorizes access to their live financial data
and only they can agree to that. On that screen the owner also **chooses which company to connect.**

**⛔ Choose the real company, not a sandbox or test company.** If a test company is offered, it is the
wrong one. Marked owner only end to end: the sign-in, the consent, and the choice of company are all
the owner's to make and cannot be delegated or automated.

### Step 9 - Get the Company ID, which the connection does not give you

**A connected credential does not carry the Company ID.** Every single API call has to name which
company it targets, by its Company ID, also called the realm ID. Connecting does not supply it, so you
have to fetch it once and keep it.

The owner finds it inside QuickBooks: the gear icon, then Account and Settings, then Billing and
Subscription. The Company ID is shown there.

**⛔ The Company ID is never pasted into chat, into this file, or into the repo.** It is stored the way
every other secret is stored, in the owner's own second brain or credential store, and read from there
when a flow needs it.

### Step 10 - Prove it, with the minor version pinned  **(the only real finish)**

**A green checkmark proves nothing. A saved credential proves nothing. A screen that says "connected"
proves nothing.** The connection is only real when a live read comes back with data the owner
recognizes.

Make one small read against the real company, using the Company ID from Step 9, and **pin the minor
version on the call.** Pinning the minor version means a future change on Intuit's side cannot silently
reshape what comes back and break a flow that was working. Set it now, before anything is built on top.

Read something the owner can eyeball: the company name, or the list of accounts, or the list of
classes. Then show it to them.

**Pass condition: the owner looks at the result and recognizes their own business.** Their real
company name. Their real account names. If the names and numbers are unfamiliar, you are reading a
sandbox company and the connection is pointed at the wrong place. Not passed. Go back to Step 8 and
reconnect against the real company.

Only when the owner has recognized their own data is this done.

## What never goes into chat, this file, or the repo

The Client Secret, any access or refresh token, and the Company ID all stay out of the conversation,
out of this SKILL.md, and out of any repo. They live in the owner's own credential store. This file is
public and every reader is a different landlord, so it holds the method and never a single real value.

## When it will not connect: symptom to cause

| What you see | What it actually is | What to do |
|---|---|---|
| "There is no Sandbox account" on Connect | You built the credential from development keys, or the Environment field is set to Sandbox. Sandbox needs a separate fake test company you do not want | Use the production keys and set Environment to Production. Do not create a sandbox company |
| "Redirect URI mismatch" or the consent screen errors out | The redirect URL registered on the Intuit app does not match what n8n shows, or it was added to the development list instead of the production list | Copy the exact URL from your n8n credential screen into the app's Production redirect URI list |
| No production Client ID or Secret is shown yet | The app is still "in development". App details or the Compliance questionnaire is not complete, or Intuit has not finished its review | Finish both forms, submit, and wait several days, sometimes longer. There is nothing to fix in the meantime |
| Credential looks connected but every call returns 401 | The Environment does not match the keys (production keys with Environment on Sandbox, or the reverse), the token needs refreshing, or it is connected to the wrong company | Set Environment to match the production keys and reconnect. Confirm you chose the real company |
| Calls fail saying no company, or return nothing for a real query | You connected the credential but never supplied the Company ID. Every call needs it and the connection does not carry it | Get the Company ID from the gear icon, Account and Settings, Billing and Subscription, and pass it on the call |
| The read returns names and numbers the owner does not recognize | You are connected to a sandbox or test company, not the real one | Reconnect from Step 8 and choose the owner's real company. Verify again against their real data |

## Why this connection at all

The owner already has an official QuickBooks connector for Claude, and for reading reports and drafting
entries that is the right tool. See the `quickbooks/` skill. This API route into n8n is for the narrow
case where an automation, running with nobody present, needs to read from or write to the books on a
schedule or on an event. If the job does not need that, the connector is simpler and this whole review
gate is avoidable. Decide that first, the way the `n8n/` skill's four-way decision describes, before
anyone opens the developer portal.
