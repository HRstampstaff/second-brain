---
name: github
description: "Load before ANY question about how the owner's repositories are organised: how many they should have, who can see what, sharing with a team member or a VA, running more than one business, folders inside a repo, or connecting a second account. Covers the rule that decides everything, which is that the repo is the smallest thing you can give someone access to, why one assistant works across many repos instead of one assistant per repo, pointers instead of copies, and what does NOT belong in a repo at all. Trigger on 'GitHub', 'my repo', 'repository', 'Memory Vault', 'give access', 'share the repo', 'permissions', 'a second business', 'my team', 'my VA', 'separate repos', 'branches', or any question about where something should be stored. Also trigger on storage limits, repo size, file size, an upload that was rejected as too large, whether to pay GitHub for more space, and where to keep photos, scans, PDFs, leases or property documents."
---

# GitHub

**Version: 1.2 - 2026-09-03 (files and images live in Drive, the repo holds an index that points at
them). Adds the size limits, the reason paying GitHub does not solve a big-files problem, and the
document index pattern. 1.2: index from now on, never a retroactive sweep of an existing Drive.**

GitHub holds the Memory Vault. It is where every skill, decision, policy and note about the business
lives, and it is the one thing that makes tomorrow's session know what today's session learned.

Almost every question owners ask about it is really one question: **how many repos, and who can see
them.** That is what this skill answers.

## The rule everything else follows: the repo is the unit of access

**You cannot share a folder inside a repository. Access is granted per repository, and that is the
smallest unit there is.**

This is the single fact that decides the whole layout, and it is the one people get wrong, because
they reason from cloud storage where a single folder can be shared on its own. **A repository is the
GitHub equivalent of a shared Drive folder: it is the thing permissions attach to.** Folders inside it
are just organisation, visible to everyone who can see the repo.

**So the repo boundary is drawn by ACCESS, never by tidiness.** Ask one question: *is there anybody
who should see this and not that?* Every yes is a repo boundary.

**A consequence worth saying out loud, because it surprises people: an owner can easily end up with
more repos than they expected, including several for one business.** A VA who should only see leasing,
a bookkeeper who should only see the money side, a contractor who should see nothing else at all.
Each of those is its own repo, because there is no way to give them a slice of a bigger one.

## How to decide the layout

Two normal shapes, and the choice between them is not about size.

**One repo, folders inside it.** Right when everybody involved can see everything. Most single owners,
and most small teams where the same two or three people handle all of it. Folders per department or
per area, and it stays simple.

**Several repos.** Right the moment somebody must be kept out of part of it. Separate businesses, and
also separate slices of one business where access genuinely differs.

**Do not split just because two things feel different.** Every split has a real cost: whatever both
sides need has to live in one of them, and the other is then half blind. Split for access, keep
together for everything else.

**When in doubt, start with one and split later.** Splitting later is ordinary work. Un-splitting is
worse, because by then two copies of the shared half exist and they disagree.

## Pointers, never copies

When there is more than one repo, **the main one holds a line pointing at each of the others**: what
it is, where it lives, and where it is cloned locally.

**Never a copy of another repo's content.** Two copies of the same thing start disagreeing almost
immediately, and then nobody can say which is right. A pointer stays true. A copy rots.

## One assistant, not one per repo

**Keep one assistant working across all the repos. Do not set up a second one per business, per
department or per account.**

The reason is maintenance, not capability. **A second assistant means a second set of skills, and two
sets drift apart within a week.** Every improvement then has to be made twice, and in practice it gets
made once and the other copy quietly falls behind. That is the same failure as copying content between
repos, one level up.

Working across repos is not a conflict and it is not slow. **The only real risk is writing to the
wrong one**, and one habit removes it:

**Name the business or the area at the start of the request.** "For [business], ..." Left unsaid, the
assistant works in the main repo, which is fine when that is what you meant and confusing when it is
not.

## Sharing with a person

- **Give read-only access unless they genuinely need to write.** Read is enough for almost everyone.
- **Share the specific repo, never the account.**
- **Everything private by default.** A repo made public is public to the internet, including its whole
  history, so anything committed once stays findable even after being deleted.
- **Each person connects with their OWN login.** It is tempting to share one, and it works, but then
  every change looks like it came from the same person and the record of who did what is lost.

## What does NOT belong in a repo

**A repo is memory: decisions, policies, skills, what the business knows.** Two things people try to
put in one that should go elsewhere:

- **Tasks and to-dos.** In a repo they cannot be assigned, ranked or closed, and nobody outside that
  session ever sees them. **They belong on the hub, as one shared board with an owner per row.** This
  is the most common wrong turn, and it is expensive because the board never gets started.
- **Secrets.** Passwords, keys, tokens, anything identifying about a person. History is permanent, so
  a secret committed once is not fixed by deleting it later.
- **Files and images.** Photos, scans, PDFs, leases, statements, anything a person opens and reads.
  These go in Drive. The section below says what the repo keeps instead.

## ⭐ Files and images go to Drive. The repo keeps an index that points at them

**This is the rule, and the reason is how git works rather than what it costs.** A repository keeps
every version of every file forever, and images and PDFs do not merge the way text does, so each save
stores a whole new copy instead of just the change. One 5 MB photo edited ten times sits in there ten
times. **Deleting it later does not shrink anything**, because the history is permanent, which is the
same trap as a committed secret.

And everyone who connects pulls the whole history, so the assistant re-downloads all of it every time
she syncs. **The person who feels a bloated repo first is the owner**, on every single session.

**The limits, so nobody has to guess:** GitHub blocks any single file over 100 MB and warns above
50 MB. It asks that a repo stay under 1 GB, and strongly recommends under 5 GB. A vault of written
notes never comes close. A folder of scanned leases gets there quickly.

**⛔ Paying does not fix it, so do not suggest an upgrade.** The paid plans add build minutes and
package storage, and none of them lifts the 100 MB file limit or grants repository space.

### What to do instead: the document index

**Keep the file in Drive and keep a row about it in the vault**, at `reference/document-index.md`. The
layout standard puts maps and lookups in `reference/`, and that is exactly what this is.

One row per document that matters to the business, as a plain markdown table:

| What it is | Relates to | Link | Date |
|---|---|---|---|
| Signed lease | 14 Oak St, Unit 2, tenant J. Rivera | [Drive](https://drive.google.com/...) | 2026-06-01 |
| Roof inspection report | 14 Oak St | [Drive](https://drive.google.com/...) | 2026-04-18 |
| Building insurance policy | 22 Pine Ave | [Drive](https://drive.google.com/...) | 2026-01-09 |

**Why this is worth the small effort: it gives the assistant instant lookup without the repo ever
carrying the bytes.** Asked where the signed lease for a unit is, she reads one small text file and
answers with the link, instead of hunting through Drive or being unable to answer at all. **Add the
row in the same moment the file goes into Drive**, never as a tidy-up later, because an index that
lags is one nobody trusts.

**⛔ Start from now, never go back and index everything already in Drive.** A retroactive sweep of a
Drive that has been filling up for years is a big job with no owner, and it is the reason an index
like this usually never gets started at all. **The index earns its keep from the first row.** Index
what you file from today onward, and add an older document the moment somebody actually asks for it,
which is the only proof it was worth a row.

**The honest exception:** a few small images that are genuinely part of a note, a diagram or a
screenshot inside a document, are fine in the repo. This rule is about scans, photos and volume.

## Diagnosis

| What you see | What it usually is | What to do |
|---|---|---|
| They want to share one folder with somebody | Not possible. Access is per repo | That folder needs to be its own repo |
| A change was made and it is not there | It went to a different repo | Say which repo at the start of the request |
| Two repos disagree about the same thing | Content was copied instead of pointed at | Keep one copy, replace the other with a pointer |
| A second assistant is behaving differently | Two sets of skills that have drifted | Go back to one working across repos |
| Nobody can tell who changed something | Everyone connects with the same login | One login per person |
| A secret is sitting in a file | It is in the history permanently now | Rotate the secret. Deleting the file does not undo it |
| The to-do list keeps getting lost | It is in the repo instead of on the hub | Move it to the hub, where rows have an owner |
| A file will not upload, it is too big | Anything over 100 MB is blocked, and it does not belong here anyway | Put it in Drive and add a row to the document index |
| The repo has got slow to sync | Images or PDFs are in it, and every version of each is kept forever | Move them to Drive, index them, and expect the history to stay large |
| They ask which GitHub plan gives more space | None of them do. Paid tiers add build minutes and package storage | Drive for the files, the repo for the index |
