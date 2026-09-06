---
name: google-drive
description: "How this system works with Google Drive, and the rules that stop Drive jobs failing quietly. Load this BEFORE any Drive work: moving a file, renaming one, building a folder structure, filing a document, sharing something, or answering where did you put X. Covers what the connector can really do (it renames and moves, in Cloud or Local), which Drive jobs need Local anyway, what must be set up before Drive work is attempted at all, sharing so the assistant can actually see a file, and never reporting a move or rename without reading the destination back. The two skills that do the work are drive-organizer for a whole messy folder and file-namer for one or a few files. Trigger on: google drive, my drive, move this file, rename this file, file this, organize my drive, set up my folders, share this document, where did you put this, shared drive, folder structure. Also trigger on where to keep photos, scans, PDFs, leases or property documents, and on the document index that points at them from the vault."
---

# Google Drive

**Version: 1.6 - 2026-09-03 (Drive holds the files, the vault holds an index pointing at them).
Adds the document index, so the assistant can answer "where is the signed lease" without the repo
ever carrying the file. 1.6: index from now on, never a retroactive sweep.**

This skill is the rules. The work itself lives in two other skills:

- **`drive-organizer`** for a whole messy folder: build a structure, then move and rename everything.
- **`file-namer`** for one file or a few: name it, put it in the right place.

Load this one first. It exists because Drive is where this system fails quietly, and every rule below
came from a real session going wrong rather than from a manual.

---

## 1. ⛔ Before any Drive work at all: is the Memory Vault actually set up?

**Do not start Drive work until the owner's Memory Vault is connected, the team has been brought home
into it, and this skill and the two Drive skills are loaded.** If any of that is missing, say so in
one line and finish the setup first.

Why this is a hard gate and not a preference: a Drive job produces decisions (what the folder
structure is, what the naming convention is, where a document belongs). **Without the vault there is
nowhere to save those decisions, so they die with the conversation and the next session starts from
nothing.** That has already happened to a real owner: a naming convention was agreed in one thread,
the work moved to a second thread, and the second thread had never heard of it.

The same applies to the skills. If the owner does not yet have their own copies of `drive-organizer`
and `file-namer`, they are relying on whatever happens to be loaded right now, which is exactly how
inconsistent results appear.

## 2. What the connector can actually do, in either kind of session

**Load the `cloud-vs-local` skill for the general rule.** It holds the Cloud versus Local decision for
every kind of job and it is the only place that rule lives. This section holds only the Drive-specific
part.

**MEASURED 2026-08-19, in BOTH a Local and a Cloud session: the Drive connector renames AND moves
files, and folders, on its own.** One call sets a new title and a new parent folder. **The item's id
and its share link survive**, so nothing pointing at it breaks: existing links, bookmarks and any
script that refers to it by id all keep working. Only somewhere that stores the literal old NAME as
text needs updating. Folders behave exactly like files. No browser, no script, no permission popup.

**So filing a document is not a Local job.** It works the same in a Cloud session, which was tested
from inside one rather than assumed.

**⛔ The old rule was wrong and it was taught out loud, so expect to meet it.** Until 2026-08-19 these
skills said the connector could not rename or move AT ALL and that only an Apps Script could. **That
is false.** If an owner tells you they were taught to switch to Local before they can rename one
document, they were told that in good faith and it is out of date. Say so in one line and get on with
the job.

**What was always right: a whole-drive sweep of hundreds of items is still a Local job.** Not because
the cloud cannot do the operations, but because doing them one at a time means hundreds of calls,
while the bundled Apps Script does the same work in one run, and that script needs a browser and a
one-time permission grant. So the `drive-organizer` bulk flow is Local. Filing one document is not.

## 2b. ⛔ The connector CANNOT change the contents of a document that already exists

**MEASURED 2026-08-24 on a real Google Doc, and this is the single most confusing gap in the whole
connector**, because everything around it works so well that people assume this must too.

What was actually tested, in order:

- **Creating a document WITH its content: works.** One call, the text lands, reading it back returns
  exactly what was written.
- **Reading an existing document's content: works.** Docs, Sheets, Slides, PDFs and Word files.
- **Renaming it or moving it: works**, as section 2 says.
- **Changing what is INSIDE an existing document: does not work at all.** The update call accepts a
  new title and a new folder and nothing else. It has no way to take content, and asking it to
  simply fails.

**So "open my document and change this paragraph" has no connector path.** Not a permissions problem,
not a Local versus Cloud problem, not something a different phrasing gets round.

**This is why an owner gets sent to a terminal.** An assistant that finds no connector route reaches
for the next thing that could work, which is a script talking to Google directly, and that needs a
terminal and a one-time credential setup. It does work, and the owner ends up somewhere they never
wanted to be for what felt like a small edit. **If that has already happened to them, say plainly
that it was the tool's limit and not their mistake.**

### What to do instead

**The everyday answer: read it, rewrite it, create it fresh, then bin the old one.** Entirely inside
the connector, no terminal, and it is genuinely quick.

1. Read the current content.
2. Produce the full new version, with the change made.
3. Create a new document with the same title and the new content.
4. Show them both, and only then move the old one to the bin.

**⚠️ Say the cost out loud before doing it, because it is not obvious and it is sometimes
unacceptable.** The replacement is a NEW document, so it has a new link, and it does not carry the
old one's comments, suggestions or version history. **Anything that pointed at the old document now
points at the wrong one.**

**So do NOT do it when the document has a life of its own:** anything with comments on it, anything
out for review, anything linked from elsewhere, anything somebody else is working in, or anything
that has been sent to a tenant or a contractor. **For those, the honest answer is that they make the
edit themselves.** It takes them ten seconds and it keeps the document intact. Prepare the exact
wording and hand it over. That is not a failure, it is the cheaper path.

### The real fix is upstream

**Anything that gets edited repeatedly should not live only as a Google Doc.** Keep the real version
in their Memory Vault as an ordinary text file, where changing it is trivial and every change is
recorded, and generate a Google Doc from it whenever somebody actually needs a Doc. Then editing is
easy, and the Doc is just the copy that gets shared.

**Reserve Google Docs for what they are good at**, which is a finished thing that people read,
comment on and sign.

## 3. Never report a move or a rename you have not read back

**Do not trust the response to the write.** After any change, **re-list the destination folder with a
separate search and confirm the file is there under its new name.** Say what you verified, in one
line. If you cannot verify it, say the change is unconfirmed rather than done.

This matters more in Drive than almost anywhere else, because a misfiled document is not visibly
broken. It is simply lost, and nobody notices for months. It is also the check that would have
settled the Cloud argument above months earlier: someone reported a move, nobody looked at the
destination, and a true report got treated as a false one for want of one search.

## 4. The assistant cannot see a private file

**A file or folder must be shared as "anyone with the link can view" before this system can read or
act on it.** View is enough, edit is not required. A private file is invisible, and the symptom is
confusing: the assistant says it cannot find something the owner is looking straight at.

**The pattern worth setting up once:** a single catch-all folder, named something obvious like
`To File`, with that share setting applied **to the folder**. Everything dropped into it inherits the
setting, so the owner never has to think about sharing again. Filing then becomes a routine: read the
catch-all folder, file what is in it, report what moved where.

## 5. Moving a file keeps its link. Say so, because it is the reassuring part

A move and a rename keep the file's identity, so **every existing link to it keeps working**, in
emails, in documents, in other people's bookmarks. Nothing breaks and nothing has to be re-shared.

Copying does not do this. A copy gets a new link, and the old link keeps pointing at the old file,
which then quietly diverges as people edit the wrong one. **Only copy when the owner explicitly wants
a duplicate**, and say plainly what it means when they do.

## 6. Do not reorganize what you were not asked to reorganize

Three separate jobs, and they are not the same:

1. **Agree a naming convention for new files from here on.**
2. **File specific documents** into the right place.
3. **Retrospectively clean up everything that already exists.**

**Job 3 is never implied by jobs 1 or 2.** Ask which one they want. A real owner had to interrupt to
say it: "I think she's planning on renaming all your documents. We're not doing that. We're talking
about what the naming convention is going to be going forward."

A retrospective clean-up on a drive with years of history in it touches other people's links,
permissions and habits, so it is always the owner's decision to ask for, never yours to start.

**When building a new structure, offer to build it alongside what exists and touch nothing.** New
empty folders, named so they stand out and are easy to delete if the owner changes their mind. Then
they decide, with the thing in front of them, whether anything actually moves.

## 7. Google Drive is not the Memory Vault, and the split matters

- **Google Drive is working IN the business:** the documents themselves, the ones a person opens and
  reads. Contracts, statements, forms, photos, anything with a human reader.
- **The Memory Vault is working ON the business:** decisions, policies, procedures, what the
  assistant knows and how it works. Written for the assistant to read.

They are not competing and neither replaces the other. **A naming convention or a folder standard is
a decision, so it goes in the Memory Vault**, even though the files it governs live in Drive.

### ⭐ Every file that matters gets a row in the vault's document index

**Files and images live here in Drive. They never go in the Memory Vault.** A repository keeps every
version of every file forever and images do not merge, so each save is a whole new copy, and deleting
it later shrinks nothing. It also slows every sync, which the owner feels first. GitHub blocks any
single file over 100 MB in any case, and no paid plan lifts that.

**So the file stays in Drive and a ROW about it goes in the vault**, at
`reference/document-index.md`. One row per document that matters to the business:

| What it is | Relates to | Link | Date |
|---|---|---|---|
| Signed lease | 14 Oak St, Unit 2, tenant J. Rivera | [Drive](https://drive.google.com/...) | 2026-06-01 |
| Building insurance policy | 22 Pine Ave | [Drive](https://drive.google.com/...) | 2026-01-09 |

**This is what makes the filing worth having.** Asked where the signed lease for a unit is, you read
one small text file and answer with the link. Without the index the document is somewhere in Drive and
finding it costs a search every time, which is the state most owners are already in.

**Write the row in the same pass that files the document, never as a tidy-up later.** An index that
lags behind Drive is one nobody trusts, and an untrusted index gets bypassed, which puts everyone back
to searching.

**⛔ Start from now, never go back and index everything already in Drive.** A retroactive sweep of a
Drive that has been filling up for years is a big job with no owner, and it is the reason an index
like this usually never gets started at all. **The index earns its keep from the first row.** Index
what you file from today onward, and add an older document the moment somebody actually asks for it,
which is the only proof it was worth a row.

**Moving a file keeps its link** (section 5), so a later reorganisation of Drive does not break the
index. That is what makes this safe to maintain.
