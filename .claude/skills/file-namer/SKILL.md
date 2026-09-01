---
name: file-namer
description: "Name, rename, audit, and file documents in Google Drive with total consistency, and ACTUALLY rename and move them in place (not just suggest names) so links never break. Works for ANY use case, not just real estate: client files, business documents, marketing assets, personal files, or a landlord/property drive. Use whenever the user wants to name a new document, rename an existing file or folder, decide where a file belongs, clean up messy or inconsistent names, audit a folder for naming consistency, or set up folders. Triggers on: name this file, rename this doc, what should I call this, where does this go, file this for me, clean up these names, fix these file names, audit my folder, set up folders. For rebuilding a whole messy drive at once, use the drive-organizer skill instead. Real estate is one supported example (see the appendix)."
---

# File Namer (general purpose, any use case)

**Version: 1.2 - 2026-08-19**

> ## ⛔ HARD RULE: never just suggest a name. Execute the rename and the move.
> **A few files: use the Drive connector directly.** It renames and moves files AND folders in a
> single call, keeping the file id and every existing link, with no browser and no permission
> grant. Verified against the live connector on 2026-08-19.
> **A whole-drive sweep, hundreds of files at once: use the bundled Apps Script**
> (`scripts/drive_rename_move.gs`) per "Executing the Rename" below, because one script run beats
> hundreds of calls. Run it FOR the user in the browser; **NEVER hand a non-technical user the
> script with written steps.**
> Either way, **NEVER hand back a list of suggested names without carrying out the change.**
>
> ⚠️ **This rule was WRONG until 2026-08-19 and said the connector could not rename or move at
> all.** That was never tested and it is false. If you are reading a copy that still says the
> Apps Script is the only mechanism, it is out of date: check the library for a newer version.

Give documents one consistent name and one correct home, every time, and then actually carry
out the rename and the move in Google Drive. This is the single-file / few-file tool; for a
whole-drive backlog cleanup use the drive-organizer skill (same engine, bulk flow).

It replaces guesswork ("what did I call that file again?") with a simple, consistent rule set,
and it does the renaming for you instead of leaving you a to-do list. It works **in place**, so
the file keeps its ID and every existing link keeps working.

It is **not** limited to real estate. The naming principles below apply to client documents,
business paperwork, marketing assets, or personal files. Real estate has a dedicated template in
the appendix (five-domain structure, shortcodes, category codes) for when that is the use case.

**It handles files AND folders, and it is great for BULK.** Point it at a HIGH parent folder and
one run can sweep every file and subfolder underneath (fix inconsistent or non-English folder
names in the same pass). Enumerate the parent recursively to build the full operation list.

---

## First Run: Learn the Setup (ask once, then remember)

Before naming anything, get what you need. If it is already in the conversation, do not re-ask.

1. **The file(s) or folder to work on.** For a single file, its name/ID. For a bulk job, the
   parent folder link (the ID is the part of the URL after `/folders/`).
2. **Context / convention.** Does the user already have a naming convention to match, or should
   you propose one from the best practices below? One line about what these documents are helps
   you name them well (a client's contracts, invoices, marketing exports, property leases).
3. **(Real estate only)** the company name, to derive the all-caps company shortcode. Skip this
   for a general use case; clean human-readable names are enough.

---

## ⛔ Pick the right convention FIRST, and the property one is NOT the default

**The general rules below are the default. The real-estate template in the appendix applies ONLY when
the owner's own business profile says they run property.** Getting this backwards is a real failure,
not a theoretical one: two of the first three owners to use this ran no rental property at all, and
both were handed a property-manager convention full of property shortcodes and unit codes that meant
nothing in their business. One of them had to say *"the current naming convention is real
estate property manager specific, how would you suggest we update it to reflect my business model?"*
That question should never have to be asked.

**So, in order, every time:**

1. **Read the owner's business profile** (`business/profile.md` in their repo) before proposing any
   convention. If there is no profile, ask one line: what are these documents and what is the
   business.
2. **Property business: use the appendix.** Anything else: use the general rules below, and derive
   the parts that need their vocabulary (client code, matter, engagement, campaign) from what they
   actually call things, never from `[PROPERTY]` and `[UNIT]`.
3. **When they have no client or party for a file, do not drop the slot silently.** Use their company
   or business-line code instead, because an intentional code reads differently from an omission. One
   owner asked for exactly this: most of her files are firm-level templates, and she wanted the firm
   code present rather than the field left blank.
4. **⭐ Write the agreed convention into their repo the moment it is agreed** (`reference/repo-layout.md`,
   or the file their layout names for conventions) **and push it in the same turn.** A convention that
   lives only in the conversation is gone when they open the next thread, which is exactly how one
   owner lost hers.
5. **⛔ Once a convention is agreed, apply it to every file, with no exceptions of your own
   invention.** If it produces a name you think is wrong for a particular document, **apply it anyway
   and say in one line why you think it is wrong.** The real case: minutes after agreeing a new
   convention, a document was left under its old name because a dated name "would be misleading" for
   that one file. The owner's ruling: even if the title is wrong, the formula should have been
   applied. **Deciding a rule does not fit a case is the owner's call, never yours.**

## Naming Best Practices (use these unless the user has their own convention)

A good filename tells you what the document is at a glance and sorts sensibly next to its
siblings. Apply these:

- **Be descriptive first.** Lead with what the document IS (`Signed-Lease`, `Q3-Invoice`,
  `Buy-Box-Criteria`), not a scan number or `final FINAL v2`.
- **Consistent casing, no raw spaces.** Use Hyphen-Case or PascalCase (`Cold-Calling-List`,
  `MortgageStatement`). Avoid spaces and random capitalization so names are clean and
  machine-friendly.
- **Date anything time-bound**, one format throughout: `YYYY-MM-DD` (sorts chronologically) or
  `MMDDYYYY`. Use the document's effective date when visible, else the filing date, and note it.
- **Version when it matters.** Add `-v2`, `-v3` for revisions; keep the prior version, do not
  overwrite it.
- **Keep the extension** on uploaded files (`.pdf`, `.xlsx`, `.mkv`). For a NEW native Google
  file, omit the extension (the title is the name).
- **One home per document.** Decide the right folder; if it could live in two places, pick the
  primary and note the secondary in the name.
- **When unsure what a document is, ASK.** Do not name or file a doubtful file on a guess. A
  misnamed or misfiled document is effectively lost, so a question is always cheaper.

---

## Executing the Rename (the part that actually changes Drive)

This is what makes the skill more than advice.

**For one file, or a handful, do NOT reach for the script.** The Drive connector updates a file's
title and its parent folder in a single call, for files and folders alike, keeping the file id so
every existing link survives. Change it, then re-list the destination to confirm, then say what you
verified. That is the whole job and it works in a Cloud session or a Local one.

**The steps below are for BULK: a whole folder tree, hundreds of items in one pass.** There the Apps
Script wins, because it does in one run what would otherwise be hundreds of calls. It needs a browser
and a one-time permission grant, so it is a Local job.

1. **Identify the item(s).** Use Drive search to get each file/folder **ID**, current name, and
   location. Never guess an ID.
2. **Decide the new name + destination** with the best practices above (or the user's convention).
3. **Show the plan** as a table (`Current Name | New Name | Destination | Notes`) and confirm
   anything ambiguous BEFORE running.
4. **Fill the Apps Script** `scripts/drive_rename_move.gs`: set `ROOT_FOLDER_ID` (a HIGH parent
   for bulk), the `FOLDERS` skeleton if you are creating folders, and one `OPERATIONS` row per
   item: `{ fileId, newName, destPath }`, plus `isFolder: true` for a folder. `newName` does the
   rename, `destPath` does the move; the same single run does both.
5. **RUN IT FOR THEM in the browser. Do NOT hand a non-technical user a script plus written
   steps.** Drive script.google.com yourself with the Claude-in-Chrome tools; the user's ONLY
   step is the one-time Google permission grant. Flow:
   a. Open `https://script.google.com/home/projects/create` (fresh project).
   b. Click into `Code.gs`, select all, delete, then **PASTE** the filled script (Ctrl/Cmd+V).
      PASTE, never type it: the editor auto-closes brackets/quotes and corrupts typed code.
   c. Save (Ctrl/Cmd+S). Confirm the function dropdown shows `organizeDrive`.
   d. **Run directly to apply** (the script ships with `DRY_RUN = true`, so the first run always previews). After the preview, set `DRY_RUN = false` and run again to apply. Do NOT force a further dry-run
      preview: you already showed the plan in step 3, and the memory index in the next section is
      the real revert net. Offer a `DRY_RUN = true` preview only if the user asks or for a large,
      high-risk run.
   e. **The one user step:** approve Google's popup: *Review permissions -> their account ->
      "Google hasn't verified this app". This appears because YOU are the author of this script and Google has not reviewed it. Read the screen, confirm the project is the one you just created, then Advanced -> Go to <project> -> Allow.*
   f. **After Allow, the script RUNS AUTOMATICALLY.** Do not click Run again or click it yourself.
      Wait a few seconds, then read the log until it says **Finished**.
   g. **Verify, and tell the user first WHY.** Say something like "I'll re-list the folder to
      confirm each item got its new name, so we catch any mistake while it's easy to fix," then
      re-list via Drive search and confirm. Report the result.
   h. **Write the memory index** (next section) so nothing is ever lost and any change can be
      reverted.
   Hand over the script + written steps ONLY as a fallback when browser tools are unavailable.

Why in place and not copy-then-delete: `moveTo` and `setName` keep the file's original ID, so
**every existing link keeps working**. A copy creates a new link and orphans the old one. Only
offer copy-based handling if the user explicitly wants a duplicate.

---

## The Index (so you can answer "where did you put X?" and revert)

Memory lives in a bundled markdown file, `references/file-index.md` (create if missing). Each
run, append a row: `Date | Original name | New name | Destination path | File ID/link | Notes`.
Record the file ID and original location so any change can be reverted (build a reversing
OPERATIONS list from the index and run the same engine).

When the user later asks "where is the Doe lease?" or "what did you rename Scan_0423 to?", answer
from the index (match on original name, party, or destination). If it is not there, fall back to
a live Drive title search.

---

## Audit Mode

When asked to audit a folder:
1. Pull the file/folder list from Drive (titles + IDs).
2. Check each item against the convention: descriptive? consistent casing, no stray spaces?
   date format consistent? version where needed? correct destination folder?
3. Return a table: `Current Name | Recommended Name | Destination | Action | Notes`.
4. Flag anything whose correct home is ambiguous and ask before recommending a move.
5. Offer to execute the fixes via the Apps Script (Executing the Rename, above).

---

## Appendix: Real Estate / Landlord Template

When the documents ARE landlord/property paperwork, use this convention.

**Five-domain structure:** `[COMPANY]/ 01_Legal, 02_Finance{Banking, Accounting, Taxes,
Insurance-Portfolio-Level, Lending}, 03_Operations, 04_Properties/[Address]/{Finance, Leasing/
[Tenant]/{01_Due-Diligence,02_Lease,03_Tenant-Communication}, Maintenance, Asset-Docs}, 05_Archive`.

**Filename formula:** `[DESCRIPTOR]-v[N]-[PARTY]-[SCOPE]-[CATEGORY]-[MMDDYYYY].[ext]`
(PascalCase descriptors, version from v1, party = last name or company first word).

**Property shortcode:** `[StreetNumber][StreetNameAbbrev]` (4-6 caps, drop St/Ave/Rd; add `-U[N]`
for unit-specific files). Examples: `123 Main St -> 123MAIN`, `456 Oak Ave -> 456OAK`.

**Category codes:** LEGAL, FINANCE, TAX, INS, OPS, VENDOR (company); PURCHASE, LOAN, MORT, MAINT,
RENO, PERMIT, WARRANTY, PHOTO (property); APP, LEASE, NOTICE, COMM (tenant).

Examples: `SignedLease-v1-Doe-123MAIN-LEASE-02152026.pdf`,
`Statement-Mar2026-v1-123MAIN-MORT-04012026.pdf`, `W9-v1-ABCPlumbing-ACME-VENDOR-03012026.pdf`.
Keep a running shortcode list in `references/file-index.md` so the same property reuses one code.
