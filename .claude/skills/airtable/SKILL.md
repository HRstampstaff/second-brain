---
name: airtable
description: "Load before ANY work that reads from or writes to the hub: looking something up, adding or changing a record, adding a field or a table, building a view, or setting up an automation inside the base. Covers connecting it, why you read the owner's own schema instead of assuming one, the difference between a field you can write and a field you cannot, linked records, the dropdown trap that silently invents junk options, deleting things safely, and when a job belongs to an automation inside Airtable rather than to you. Trigger on 'Airtable', 'the base', 'the hub', 'a table', 'a field', 'a record', 'a view', 'add a column', 'link these', 'automation', or any request to look up, change or organise the owner's own business data."
---

# Airtable

**Version: 1.1 - 2026-08-25**

Airtable is the hub. It holds the properties, the units, the leases, the tenants, the tasks and the
routines. Almost everything else in this system either reads from it or writes to it, so a mistake
here does not stay here.

**This skill is about handling the hub safely. What is actually IN the owner's hub lives in their own
base file, which you read at the start of a session. Never assume a table or a field exists because
another owner has it.**

## Connecting it

Airtable has an official connector. The owner turns it on in their connector settings and signs in to
Airtable to authorise it. It works from the desktop app, the web and Claude Code, and it is the right
way in. Do not reach for anything else first.

**Access is per base, not per account.** The connector can only see bases the owner's Airtable login
can see, and if they were given access to just one screen rather than the whole base, some things
will refuse. If a read fails with a permission message rather than a not-found message, that is
usually what happened.

## Read the schema, never guess it

**The most common failure by far is writing to a field that does not exist, or that exists under a
slightly different name.** Every owner renames things. Every owner adds their own columns. Anything
that assumes a fixed name breaks the first time somebody tidies up.

- **Before your first write in a session, read the table's real fields.** Not the owner's description
  of them. The real ones.
- **Refer to things by ROLE, not by name.** "The table that holds leases" is stable. A specific name
  is not.
- **If you cannot find the field the job needs, say so and stop.** Do not pick the nearest-looking
  one. A rent figure written into the wrong column is invisible until it reaches an invoice.

**Never rename a table or a field just because a tidier name occurs to you.** Other things point at
it: views, automations, and anything connected from outside. Suggest it, let the owner decide, and if
they do rename something, that is the moment to re-read the schema.

## Fields you can write and fields you cannot

Some columns are answers the base works out for itself: a formula, a rollup, a lookup, a count, a
created time. **These cannot be written to, and trying gives a confusing error rather than a clear
one.** If a value looks wrong in one of them, the cause is upstream, in the fields it reads.

The useful consequence: **when a computed number is wrong, do not chase the number. Go and look at
what feeds it.** Usually something it depends on is empty, or linked to the wrong record.

## Linked records, and the mistake everyone makes

A link between two tables is not text. **It points at one specific record, and it has to be written as
that record's identity, not as its name.** Writing a name into a link field either fails or, on some
paths, quietly creates a brand new empty record carrying that name. The owner then has two of
something and one of them is hollow.

**So: find the record you mean first, then link to the thing you found.** If the search returns more
than one match, stop and ask which. Guessing between two tenants with the same surname is exactly the
kind of error nobody catches for a month.

**Two tables can be joined in more than one way at the same time**, and that is a real design rather
than a mistake: for example a current relationship and a full history. When you write a link, know
which of the two you are writing. Putting a finished thing into the current relationship is what
makes live reports quietly wrong.

## The dropdown trap that invents junk

A single-select or multi-select field has a fixed list of choices. **Writing a value that is not on
the list normally fails, which is good, because it tells you the list has changed. But there is a
setting that instead makes the write succeed by silently ADDING your value as a new choice.**

That is how a base ends up with "Complete", "complete" and "Completed" as three separate statuses,
each holding some of the records, with every view and automation seeing only part of the picture.

- **Re-read the choices before writing to a dropdown.** Owners rename and reorder options without
  telling anyone.
- **Use the automatic-conversion setting only when creating an option is genuinely what you intend**,
  and say so when you do.
- **A write rejected because the value is not a valid choice is information, not an obstacle.** The
  list changed. Go and look at it.

## Adding to the base

You can add fields and tables, and sometimes that is the right answer. Two rules keep it safe:

- **Changing the shape of the data is the most expensive kind of change**, because everything built on
  top of it has to be revisited. Do it early and deliberately, or not at all.
- **A new field with no description is a mystery in three weeks.** Write what it is for, in the
  field's own description, in the same breath as creating it.

**Deleting is different.** A table or a field can be deleted, and it takes everything in it with it.
Before deleting anything, find out what points at it: views, automations, links from other tables, and
anything connected from outside the base. **Deleting a field cannot be done through the connector at
all, only by hand, which is a useful accident, because it forces a pause.**

## When the job belongs to an automation, not to you

Airtable can run its own automations inside the base: when a record changes, do something. **That is
the right home for anything that must happen every time, immediately, with nobody present.** Setting a
default on a new record. Keeping two fields in step. Reacting the second a box is ticked.

**You are the wrong tool for that**, because you only run when someone is talking to you.

The reverse is also true: **anything needing judgement, or reading an email, or looking at a document,
is yours and does not belong in a base automation.**

A useful third case: **a default value on a field.** If the answer is always the same for a new
record, that is not an automation at all, it is a default, and it is the cheapest of the three.

**Automations inside a base are invisible unless you go looking.** When something changes by itself
and nobody knows why, check them before assuming a bug.

## Working with a lot of records at once

- **Writes go in batches, and there is a limit per batch.** A long job is several batches, not one.
- **Filter and sort on the Airtable side rather than pulling everything and sifting.** Pulling a whole
  large table wastes the session and usually still comes back cut off.
- **Ask for only the fields you need.** Almost every "the result was too big" problem is really "I
  asked for every column".
- **Before a bulk change, say what you are about to change and how many records it will touch, and
  check that number is what you expected.** A filter that is slightly wrong does not fail. It just
  updates the wrong two hundred rows.

## Getting a base someone shared, and giving one away

This comes up twice: when the owner receives a starter base from somebody else, and when they hand a
base to a partner, an assistant or a client of their own.

**The thing everyone gets wrong: automations do not travel through a share link.** Clicking **Copy
base** on a public share link copies the tables, the views and the interfaces, and leaves every
automation behind. The shared page has no Automations tab on it at all. Airtable does that on purpose,
because an automation can hold a webhook address or an email address belonging to whoever shared the
base. So a base that arrives with no automations is not broken and nothing was forgotten. It came the
wrong way.

### Receiving a base properly

1. The owner needs an Airtable account and **a workspace of their own already created**. Airtable will
   tell them if they have none. A blank one is fine and it does not need a name.
2. They open the invitation email and then the shared base.
3. **In the shared base they click Duplicate, and choose THEIR OWN workspace as the destination.**
4. **Working inside the shared base instead is a real mistake, not a shortcut.** Whoever shared it can
   see everything put into it, and a hub like this ends up holding the whole business.
5. **The automations arrive switched OFF.** Open the **Automations** tab and turn on the ones they
   want. That is normal Airtable behaviour, not a fault in the base. Say this out loud to the owner,
   because nobody thinks to look.
6. Anything using a connected account, such as Gmail, Slack or a calendar, has to be reconnected under
   their own login.

### Giving a base to someone else

1. **Duplicate the base first, name the copy after that one recipient, and share the duplicate. Never
   share the master.** A Creator on the master can change it, and everyone invited afterwards inherits
   the change. One copy per recipient also means recipients never see each other.
2. Open that duplicate and click **Share** at the **top right of the base**.
3. Type the recipient's email address.
4. **Grant them Creator permission.** This is the level that carries the ability to duplicate a base.
   Grant anything lower and they have no way to take their own copy, and the whole thing stalls there.
5. Delete the intermediate copy once they have theirs.

### Audit a base before handing it to anyone

Whatever sits in it ships to the recipient, switched off but one click away from running. Go through
the **Automations** tab and look for anything that points at the SENDER'S systems rather than the
recipient's: webhooks, scripts, connected accounts, and anything whose name is really an internal
note. An automation the recipient innocently switches on can start sending their own records somewhere
they never chose.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| Field not found | The owner renamed it, or it never existed in this base | Re-read the schema. Never substitute a similar-looking field |
| Permission error on a base that clearly exists | The owner has screen-only access, not full base access | Read through the screens they were given instead |
| A write to a dropdown fails | The option list changed | Re-read the choices. Do not force it through |
| A duplicate empty record appeared | Something wrote a name into a link field | Delete the hollow record, then link properly |
| A computed column is wrong | Something it depends on is blank or linked wrongly | Fix the source. The computed column cannot be written |
| A value looks right in the grid but arrives as gibberish elsewhere | It is a lookup showing a friendly label while passing along an identity | Add a lookup of the value you actually want |
| Records changed and nobody did it | An automation inside the base | List the base's automations before assuming a bug |
| The result came back cut off | Too many rows, or too many columns asked for | Filter on the Airtable side and name the fields you need |
| A base someone shared has no automations in it | It was taken through a share link, which never carries them | Ask them to invite you to a duplicate by email with Creator permission, then duplicate that into your own workspace |
