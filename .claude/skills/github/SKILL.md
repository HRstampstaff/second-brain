---
name: github
description: "Load before ANY question about how the owner's repositories are organised: how many they should have, who can see what, sharing with a team member or a VA, running more than one business, folders inside a repo, or connecting a second account. Covers the rule that decides everything, which is that the repo is the smallest thing you can give someone access to, why one assistant works across many repos instead of one assistant per repo, pointers instead of copies, and what does NOT belong in a repo at all. Trigger on 'GitHub', 'my repo', 'repository', 'Memory Vault', 'give access', 'share the repo', 'permissions', 'a second business', 'my team', 'my VA', 'separate repos', 'branches', or any question about where something should be stored."
---

# GitHub

**Version: 1.0 - 2026-08-24**

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
