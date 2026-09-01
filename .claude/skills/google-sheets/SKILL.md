---
name: google-sheets
description: "Load before reading from or writing to a spreadsheet, and BEFORE agreeing that something should be a spreadsheet at all. Covers the decision between a sheet and the hub, why an owner's existing spreadsheets are the best source of history in the business, importing one properly, the traps that silently corrupt data on the way in, and the narrow set of jobs a sheet still does better than anything else. Trigger on 'spreadsheet', 'Google Sheets', 'Excel', 'my sheet', 'export this', 'import this', 'a CSV', 'the tracker I keep', or any request touching a spreadsheet."
---

# Google Sheets

**Version: 1.0 - 2026-08-24**

Almost every owner arrives with spreadsheets, and they usually contain the only written history of
the business. This skill is about respecting that, getting it in cleanly, and then being honest about
what a sheet should still be used for afterwards.

## The decision that comes first

**Most things an owner keeps in a spreadsheet belong in the hub.** A sheet cannot link a tenant to a
lease to a unit, it cannot be reliably filtered by several people at once, and every automation built
on it is fragile because a sheet has no fixed shape.

**A spreadsheet is still the right answer for exactly three things:**

- **Arithmetic somebody wants to see and check.** A model, a projection, a what-if. The working being
  visible is the point.
- **A one-off pile of data being worked through**, on its way somewhere else.
- **Something that has to be handed to an outsider** who does not have access to anything else. An
  accountant, a lender, a contractor.

**Everything else, particularly anything that gets updated over time, belongs in the hub.** Suggest
the move once, explain why, and then respect the answer. An owner who trusts their spreadsheet is not
being irrational, they are protecting the thing that has run their business for years.

## Their old spreadsheets are the most valuable thing they have

**Before importing anything, read it as history rather than as data.** A rent tracker going back
years contains what actually happened, what the terms really were, who paid late and how the owner
thinks about their own business. That understanding is worth more than the rows.

Two things to look for while reading:

- **The columns they created themselves.** Those name what they actually care about. Anything they
  built a column for should probably exist in the hub.
- **The notes column.** It is always the messiest and always the most informative. Read it before
  deciding it cannot be imported.

## Importing without silently corrupting it

The failures here are quiet. Nothing errors, and the data is wrong.

- **Dates are the biggest one.** The same written date means two different days depending on where it
  was typed, and nothing warns you. **Establish which order the day and month are in before importing
  anything, using a date that could only be one of the two.**
- **A number stored as text is not a number.** It will not add up, and it will not sort. Anything with
  a currency symbol, a comma or a space in it arrives as text.
- **Leading zeros disappear.** Anything that looks like a number but is really a code loses them.
- **Blank is not zero.** A blank cell means nobody filled it in. Importing it as zero turns "unknown"
  into "none", and every report built on it is then confidently wrong.
- **Merged cells and multiple tables on one sheet do not import.** They have to be untangled by hand
  first, and that is normal rather than a sign of a bad sheet.
- **One row per thing.** A sheet with a row per month per property has to be reshaped before it can
  become records.

**Import a handful of rows first and look at them properly.** Every one of these problems is obvious
in ten rows and invisible in a thousand.

## Writing to a sheet

- **Never overwrite a sheet the owner maintains by hand.** Add a new tab, or write to a sheet built
  for the purpose. Their working copy is theirs.
- **A sheet somebody else is editing at that moment will fight you.** Write when nobody is in it, or
  write somewhere else.
- **Anything computed should be a formula, not a pasted value**, or it silently stops being true the
  first time something changes.
- **Say when it was written, on the sheet.** Same rule as everywhere else.

## When a sheet is being used as a database

A sheet that several people update, that things depend on, that has grown columns over years: this
is the case for moving to the hub, and it is worth making once, clearly.

**The argument that lands is not that a sheet is bad. It is that two people cannot safely use it at
the same time, and that nothing can be linked to anything else.** That is what the owner has actually
been suffering from, usually without naming it.

**Then move it properly rather than half-moving it.** A hub and a sheet holding the same thing is the
worst of both, because they diverge within a week and nobody can say which is right.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| Dates are wrong by a predictable amount | Day and month were read the wrong way round | Check with a date that could only be one of the two, and reimport |
| Numbers will not add up | They came in as text, with a symbol or a comma | Strip the formatting and convert, then check the total |
| Everything looks fine but a total is far too low | Blanks were imported as zero, or rows were skipped | Compare the row count and the total against the original |
| A code lost its leading zeros | It was treated as a number | Import that column as text |
| The import produced nonsense | Merged cells, or several tables on one sheet | Untangle it by hand first. This is normal |
| Writes are failing or reverting | Somebody has the sheet open | Write when nobody is in it, or write elsewhere |
| Two versions of the truth exist | The same data lives in the hub and in a sheet | Pick one. Half a migration is worse than none |
