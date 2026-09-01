---
name: drive-organizer
description: "One-time cleanup that takes ANY messy Google Drive folder and rebuilds it into a clean, numbered, easy-to-find structure, then ACTUALLY renames and moves every file and folder in place so links never break. Works for any use case, not just real estate: client/agency drives, business operations, marketing assets, a single client engagement folder, a personal drive, or a landlord/property drive. Use whenever the user wants to organize, clean up, declutter, restructure, or set up a filing system for a Google Drive folder, or says their files are a mess, everything is in one folder, or nothing is named consistently. Also use for 'where did you put X' lookups after an organize run. It bundles the renamer: it asks whether to also rename files and folders and does the organize plus rename in a single Apps Script run. Trigger on: organize my drive, clean up my folder, sort my files, build me a folder structure, my drive is a mess, set up a filing system, restructure this drive."
---

# Drive Organizer (general purpose, any use case)

**Version: 1.1 - 2026-08-19**

This is the big first cleanup for a Google Drive folder. Point it at a folder where files are
dumped with names like `Scan_0423.pdf`, `raw file.xlsx`, or `final FINAL v2`, and it builds a
clean numbered structure, then renames and refiles everything consistently. It works **in
place**, so existing links keep working, and it writes an index of what moved where so nothing
ever feels lost.

It is **not** limited to real estate. The same engine organizes a client/agency drive, a
marketing folder, an operations drive, a single client engagement folder, or a personal drive.
Real estate is just one supported example (its template is in the appendix). The job is always
the same: read what is actually there, propose the best structure for THAT content using the
best-practice principles below, then build it.

It bundles the renamer. Organizing without fixing names is half a job, and one Apps Script run
can do both at once (rename + move = one permission grant), so the wizard asks whether to also
clean up names and, by default, does both. It applies changes directly (no forced test run); the memory index it writes is the revert net if anything is wrong.

---

## ⛔ Three things the first real users got wrong, read before Step 1

**1. The property template is NOT the default.** Read the owner's business profile
(`business/profile.md` in their repo) before proposing any structure or convention. Property gets the
appendix. Everything else gets the general principles below, in the owner's own vocabulary (clients,
matters, engagements, campaigns), never property shortcodes and unit codes. Two of the first three
owners here ran no rental property at all and both were handed a landlord structure.

**2. "Agree a naming convention" does NOT mean "rename everything they own".** These are two separate
jobs and you must not slide from the first into the second. A real owner had to stop it: *"I think
she's planning on renaming all your documents... we're not doing that. We're talking about what the
naming convention is going to be going forward."* **Ask which one they want, in one line:** the
convention for new files from here on, a retrospective clean-up of what already exists, or both. Then
do only that. A retro clean-up on a drive with years of history and other people's links in it is a
decision with consequences, so it is always theirs to ask for.

**3. Offer to build the new structure ALONGSIDE what they have, touching nothing.** Their existing
folders may carry permissions, shared links and other people's habits that you cannot see, and moving
them is not obviously safe. **Default offer: build the proposed structure as new empty folders, named
so they stand out and are trivial to delete** (an owner suggested `ZZ Proposed` and it is a good
pattern), **leave every existing folder exactly where it is**, and let them decide afterwards whether
anything moves. Say this as the recommendation rather than waiting to be asked. If the owner has a
large existing structure and wants a new parent above it, work out the permission consequences with
them BEFORE moving anything.

**One thing that worked well and is worth repeating:** when auditing an old drive, sort what you find
by when it was last opened. Telling an owner which files have not been touched in two years, and
asking whether a 2023 procedures manual nobody has opened is still current, is far more useful than
a flat list of everything.

## Step 1: First-Run Wizard (ask before touching anything)

Organizing someone's whole folder is high-trust. Ask these up front and confirm before acting.
Do not generate or run anything until the user has answered.

1. **The folder to organize.** Get the folder link; the ID is the part of the URL after
   `/folders/`. Confirm you are pointed at the right folder.
2. **What is this folder for?** One line of context (a client's deliverables, marketing assets,
   company operations, a rental portfolio, personal docs). This drives the structure you
   propose. If it is obvious from the contents after you read them (Step 2), you can infer it
   and confirm rather than ask cold.
3. **Also rename, or just move?** Ask: "Do you want me to also clean up the file and folder
   NAMES while I organize, or only move things into the new structure?" Most users say yes, and
   it is the same single script run either way, so default to **yes (organize + rename)** unless
   they decline. Renaming makes the result far easier to scan.
4. **Approach (how safe).** Present both, let them choose:
   - **Rename/move in place (recommended):** the real files get renamed and moved into the new
     structure. Old folders are left in place but empty (never deleted, never renamed). Pro:
     every link stays valid, clean, space-efficient. Con: no separate "before" copy.
   - **Keep old + new (backup):** copy each file into the new structure, leave the originals
     untouched. Pro: a full untouched "before" copy. Con: doubles the space, and the COPIES get
     new links, so anyone still editing the old originals will diverge.
   This maps to `BACKUP_ENABLED` in the script (false = in place, true = keep backup).

You do not need a "company name / shortcode" unless the use case is real estate (see appendix).
For a general drive, clean human-readable names are enough.

---

## Step 2: Read the Folder

1. List everything under the chosen root **recursively** (Drive search by parent folder, descend
   into each subfolder, page through results). Capture for each item: **ID**, current name,
   current parent folder, and MIME type (note which are folders).
2. If a file's purpose is unclear from its name, read a snippet of its content to classify it.
3. Build a working inventory (a scratch file is fine): every file and folder with its ID and a
   first-pass guess of where it belongs.

---

## Step 3: Design the Structure (best practices, fit to the content)

Do not force a fixed template. Look at what is actually in the folder and design the simplest
structure that makes those things easy to find. Apply these principles:

- **Number the top folders by priority.** Prefix with `1_`, `2_`, `3_`... ordered by how often
  the user reaches for them, most-used first. Numbers force a deliberate order and make folders
  easy to find instead of alphabetical noise. (For 10+ top folders, zero-pad: `01_`, `02_`.)
- **Group by function or theme, not by file type.** "1_Deliverables" beats "PDFs" and
  "Spreadsheets". People look for things by what they ARE, not their format.
- **Keep it shallow.** Aim for 2 to 3 levels. Every extra level is a place to lose a file.
- **One clear home per file.** If a file could live in two places, pick the primary and note it;
  do not duplicate.
- **Archive the dead weight.** Put superseded, old, or "just in case" material in a high-numbered
  folder (e.g. `9_Archive`) so the working folders stay clean. Absorb any existing "old" / "misc"
  folder into it rather than leaving a second junk drawer.
- **Names: human-readable and consistent.** Title-Case or Hyphen-Case, no `final FINAL v2`, no
  random spaces or scan numbers. Put a date on anything time-bound (`YYYY-MM-DD` or `MMDDYYYY`,
  pick one and stay consistent). Keep file extensions on uploads.

**Mislabeling guard (important):** if you are not confident what a file is, DO NOT file it on a
guess. Collect the doubtful ones and ASK the user before generating the script. A misfiled
document is effectively lost, so a question is always cheaper than a wrong move.

For common use cases you can start from these and adapt (these are starting points, not rules):

- **Client / agency drive:** `1_Clients`, `2_Marketing`, `3_Sales`, `4_Operations`,
  `5_Finance`, `6_Templates`, `9_Archive`.
- **Single client engagement folder:** `1_Deliverables`, `2_Scope-and-Criteria`,
  `3_Commercial`, `4_Source-Data`, `5_Guides-and-Process`, `9_Archive`.
- **Real estate / landlord drive:** the five-domain tree in the appendix.

---

## Step 4: Show the Plan, Then Build It

1. **Present the full plan as a table**, grouped by destination folder so it is easy to scan:
   `Current Name | New Name | Destination | Notes`. If the user chose move-only (no rename), the
   New Name column just repeats the current name. Mark any assumptions. Get a thumbs-up before
   generating the script.
2. **Fill the Apps Script** `scripts/drive_rename_move.gs`:
   - `ROOT_FOLDER_ID` = the folder being organized.
   - `BACKUP_ENABLED` = the user's Step-1 choice.
   - `FOLDERS` = the full skeleton of new folders to create (so empty branches still exist), `/`
     between levels.
   - `OPERATIONS` = one row per item: `{ fileId, newName, destPath }`, plus `isFolder: true` for
     a folder. `newName` carries the rename (leave `""` to keep the current name if move-only);
     `destPath` carries the move. **The same single run does rename AND move** -- that is the
     2-in-1: fill both fields and one authorized run applies both.

This is the engine the file-namer skill uses, unchanged. It renames and moves files AND folders
in place by ID, so every link survives.

---

## Step 5: Run It For Them (browser-driven, the proven model)

**RUN IT FOR THEM in the browser. Do NOT hand a non-technical user a script plus written steps.**
Most users have zero coding background and little patience, so drive script.google.com yourself
with the Claude-in-Chrome tools. The user's ONLY step is the one-time Google permission grant
(Google gates account consent; Claude cannot click it for them). Exact flow:

a. Open `https://script.google.com/home/projects/create` in their browser (fresh project).
b. Click into the `Code.gs` editor, select all, delete, then **PASTE** the filled script via the
   clipboard (Ctrl/Cmd+V). PASTE, never type it: the editor auto-closes brackets and quotes and
   will corrupt typed code.
c. Save (Ctrl/Cmd+S). Confirm the function dropdown shows `organizeDrive`.
d. **Run directly to apply** (the script ships with `DRY_RUN = true`, so the first run always previews). After the preview, set `DRY_RUN = false` and run again to apply. The skill does NOT force a second
   dry-run preview step, because the real safety net is the memory index in Step 6: it logs every
   old name, new name, file ID, and original parent, so any wrong move can be reverted. You already
   showed the plan table in Step 4 and the user approved it, so apply for real. Offer a `DRY_RUN =
   true` preview only when the user asks, or for a very large or high-risk reorg where a dry log is
   worth the extra step.
e. **The one user step:** the first Run shows Google's authorization popup (the script touches
   their Drive). Pause and give them the exact clicks: *Review permissions -> choose your Google
   account -> "Google hasn't verified this app". This appears because YOU are the author of this script and Google has not reviewed it. Read the screen, confirm the project is the one you just created, then Advanced -> Go to <project> ->
   Allow.* It is safe; the app is their own script. Wait for them to finish.
f. **After the user clicks Allow, the script RUNS AUTOMATICALLY** (the authorized run fires on
   its own). Do NOT wait for them to click Run again, and do not click it yourself. Give it a few
   seconds, then read the log to confirm it finished. (If you ran a dry preview, this is where you
   set `DRY_RUN = false`, Save, and Run again to apply.)
g. **Verify, and tell the user first WHY.** Before checking, say something like "I'll now re-list
   the folder to confirm every item got its new name and landed in the right place, so we catch
   any mistake while it's still easy to fix." Then re-list the parent recursively via Drive
   search and confirm each target shows its new name and home (IDs unchanged, so links still
   work). Report the result.
h. **Write the memory index so nothing is ever lost** (Step 6).

Hand over the script + written steps ONLY as a fallback when the browser tools are unavailable.

The old folders are simply left empty (the files moved out by ID). Do not rename or delete the
user's old folders.

---

## Step 6: The Moved-Files Index (and "where did you put X?")

After the run, write the index so nothing feels lost:
- Append every item to `references/file-index.md` with: `Date | Original name | New name |
  Destination path | File link | Notes/Code`.
- Remind the user the **link is unchanged** for in-place moves (the item kept its ID), so any
  bookmarks or shared links still work.

When the user later asks "where is the pricing sheet?" or "what did you rename raw file.xlsx
to?", answer from `references/file-index.md` (match on original name or destination). If it is
missing, do a live Drive title search.

---

## Notes

- This is a one-time job per folder; for ongoing single-file naming, use the file-namer skill.
- Large folders: chunk the work. It is fine to organize one section per script run and append to
  the index each time, rather than one giant run.
- Never delete anything. The strongest version of "organize" here still leaves the originals'
  folders in place (empty) and, in backup mode, the originals themselves.
- Reverting: because every move is logged in the index with the file ID, a later run can move
  things back. If the user wants to undo, build an OPERATIONS list from the index (swap
  original/new) and run the same engine.

---

## Appendix: Real Estate / Landlord Template

When the folder IS a landlord or property-management drive, use the five-domain structure (this
is what the file-namer skill documents in full; read it for naming codes and shortcodes):

```
[COMPANY]
|-- 01_Legal
|-- 02_Finance        (Banking, Accounting, Taxes, Insurance-Portfolio-Level, Lending)
|-- 03_Operations
|-- 04_Properties
|   \-- [Address]/ Finance{Purchases-and-Sales, Loans-and-Refinances,
|        Mortgage-Statements/YYYY-Statements, Insurance, Taxes/YYYY-Taxes},
|        Leasing{[Tenant]/{01_Due-Diligence,02_Lease,03_Tenant-Communication}, Prior-Tenants},
|        Maintenance{Invoices, Photos}, Asset-Docs{Permits, Warranties}
\-- 05_Archive
```

For real estate, also collect the **company shortcode** and per-property shortcodes, and name
files `[DESCRIPTOR]-v[N]-[PARTY]-[SCOPE]-[CATEGORY]-[MMDDYYYY].[ext]` per the file-namer skill.
Everything else (the run model, the index, the in-place guarantee) is identical to the general
flow above.
