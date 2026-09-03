---
name: second-brain
description: >
  Sets up and manages the AI Second Brain, a persistent wiki-style knowledge base using
  Claude Code and GitHub for coaches and consultants. Built on the Karpathy LLM Wiki pattern:
  knowledge compounds over time through Ingest, Query, and Lint operations. ALWAYS runs a
  vault scan first to check which files exist before deciding what to do. Handles first-time
  setup, partial setup, daily session start and end rituals, weekly Brain Updates, story bank
  and content capture, web clipper ingestion, scheduled task automation, and optional client
  file management. Trigger when anyone says "AI Second Brain," "Second Brain," "brain update," "set up my second
  brain," "weekly update," "add to my story bank," "add to best content," "run end of
  session," "update my brain files," "brain check-in," "check my brain files," "ingest this,"
  "set up scheduled tasks," "automate my second brain," or when asked. Vera loads first in every session, so this skill loads after her, when
  CLAUDE.md is present in the current directory.
---
# AI Second Brain Skill

**Version: 1.1 - 2026-09-02 (git steps run one at a time, never joined with `&&`). Every save in this
file used to be one chained command, which is the exact shape a permission system refuses, and the
Auto-Commit Rule made it standing policy and told you to do it silently. A real owner lost a day to
that: nothing was wrong with git or their repo, the command shape was simply always refused. Layered
on 1.0 - 2026-08-10**

## What This Skill Does

This skill manages the full AI Second Brain lifecycle for a coach or consultant.

Built on the Karpathy LLM Wiki pattern: instead of re-deriving knowledge from scratch each session, Claude incrementally builds and maintains a persistent wiki. Knowledge compounds. Sources are ingested once and integrated across all relevant pages.

It ALWAYS starts by scanning the vault to see what exists.

It never assumes. It checks first. Then it acts.

---

## Migration Note: Old "Soul System" Vaults

This skill was previously called the "AI Soul System." Some existing vaults still use that wording.

After the vault scan (Step 0), check whether any files contain the old language:

```bash
grep -rl -i "soul system\|soul loaded\|soul update\|soul check-in\|soul files\|soul check" . 2>/dev/null | grep -v "/.git/"
```

If matches are found, say:

"I noticed this vault still uses the old 'Soul System' wording. Want me to update everything to 'Second Brain' across your files? It's a clean find-and-replace, fully reversible through GitHub."

If they say yes, run the rename:

```bash
grep -rl --include="*.md" -i "soul system\|soul loaded\|soul update\|soul check-in\|soul files\|soul check\|soul update sunday" . 2>/dev/null | grep -v "/.git/" | while read -r f; do
  sed -i \
    -e 's/Soul System/Second Brain/g' \
    -e 's/soul system/second brain/g' \
    -e 's/Soul Update Sunday/Brain Update Sunday/g' \
    -e 's/Soul Update/Brain Update/g' \
    -e 's/soul update/brain update/g' \
    -e 's/Soul loaded/Brain loaded/g' \
    -e 's/soul loaded/brain loaded/g' \
    -e 's/Soul check-in/Brain check-in/g' \
    -e 's/soul check-in/brain check-in/g' \
    -e 's/soul files/brain files/g' \
    -e 's/Soul Files/Brain Files/g' \
    "$f"
done
git add <the files you changed>
git commit -m "Rename: Soul System -> Second Brain"
git pull --rebase
git push origin main
```

Confirm: "Updated everything to Second Brain and saved to GitHub."

---

## AI Second Brain Default File Structure

```
YourName-Second-Brain/
├── CLAUDE.md                          <- Schema: auto-read by Claude every session
├── index.md                           <- Catalog: read first to navigate the wiki
├── log.md                             <- Append-only ingest/query/lint record
├── wiki/                              <- LLM-maintained knowledge base
│   ├── 01-identity-and-positioning.md
│   ├── 02-brand-voice.md
│   ├── 03-ideal-client.md
│   ├── 04-programs-and-offers.md
│   ├── 05-market-and-competitors.md
│   ├── company-details.md
│   ├── glossary.md
│   ├── dreams.md
│   └── best-content.md
├── sources/                           <- Raw web clips (immutable, never edit)
│   └── README.md
├── my-content/                        <- Published and in-progress content
├── stories/                           <- Real moments tagged for reuse
├── frameworks/                        <- Your frameworks and methodologies
├── program-materials/                 <- Program content, curriculum, and assets
├── presentations/                     <- Talks, keynotes, and slide decks
├── decisions/
├── wins/
└── clients/                           <- Optional
```

---

## Step 0: Always Run a Vault Scan First

Before doing ANYTHING, run this scan:

```bash
echo "=== AI SECOND BRAIN VAULT SCAN ===" && \
for f in CLAUDE.md index.md log.md; do
  [ -f "$f" ] && echo "EXISTS: $f" || echo "MISSING: $f"
done && \
for f in wiki/01-identity-and-positioning.md wiki/02-brand-voice.md \
  wiki/03-ideal-client.md wiki/04-programs-and-offers.md wiki/05-market-and-competitors.md \
  wiki/company-details.md wiki/glossary.md wiki/dreams.md wiki/best-content.md; do
  [ -f "$f" ] && echo "EXISTS: $f" || echo "MISSING: $f"
done && \
for d in wiki sources my-content stories frameworks program-materials presentations decisions wins clients; do
  [ -d "$d" ] && echo "EXISTS (folder): $d" || echo "MISSING (folder): $d"
done
```

Also check for files that exist but are empty:

```bash
for f in wiki/01-identity-and-positioning.md wiki/02-brand-voice.md wiki/03-ideal-client.md \
  wiki/04-programs-and-offers.md wiki/05-market-and-competitors.md wiki/company-details.md \
  wiki/glossary.md wiki/dreams.md; do
  if [ -f "$f" ]; then
    chars=$(wc -c < "$f")
    [ "$chars" -lt 50 ] && echo "EMPTY: $f" || echo "HAS CONTENT: $f"
  fi
done
```

Then choose the right path:

- **All files exist with content** -> Session Start Ritual (Flow 2)
- **Some files missing or empty** -> Partial Setup (Flow 1B)
- **Most or all files missing** -> Full First Time Setup (Flow 1A)
- **Old "Soul System" wording detected** -> offer the Migration rename above
- **User said "ingest" or pasted a URL** -> Web Clipper Ingest (Flow 8)
- **User asked about scheduled tasks / automation** -> Scheduled Tasks Setup (Flow 11)
- **User asked for a specific flow** -> Run that flow, but scan first and note gaps

---

## Flow 1A: Full First Time Setup

Trigger when: most or all brain files are missing.

### Step 1: Offer Two Setup Paths

Say:

"I scanned your vault and you're starting fresh.

I can set this up two ways:

Option A. I do it for you. I create all the files and folders automatically, then ask you questions to fill them in. You never have to touch a file manually.

Option B. Manual mode. I give you the full list of files and folders to create yourself, so you can customize names, structure, or anything you want before we fill them in.

Which would you prefer?"

---

### If they choose Option A: Automated Setup

Say: "Perfect. I'm creating your AI Second Brain structure now."

**Create all folders:**

```bash
mkdir -p wiki sources my-content stories frameworks program-materials presentations decisions wins
```

Ask: "Do you work with 1:1 clients and want to track them in your AI Second Brain?"

If yes:
```bash
mkdir -p clients
```

**Create index.md and log.md:**

```bash
cat > index.md << 'EOF'
# AI Second Brain Index

Read this first. It tells you where everything lives.

## Wiki (Core Knowledge)

| File | What's in it |
|------|-------------|
| [wiki/01-identity-and-positioning.md](wiki/01-identity-and-positioning.md) | Who you are, origin story, positioning, mission |
| [wiki/02-brand-voice.md](wiki/02-brand-voice.md) | Voice rules, banned phrases, content quality tests |
| [wiki/03-ideal-client.md](wiki/03-ideal-client.md) | Ideal client avatar, pain points, transformation |
| [wiki/04-programs-and-offers.md](wiki/04-programs-and-offers.md) | All programs, pricing, what's confirmed |
| [wiki/05-market-and-competitors.md](wiki/05-market-and-competitors.md) | Market landscape, competitors, positioning notes |
| [wiki/company-details.md](wiki/company-details.md) | Business logistics, team, tools, accounts |
| [wiki/dreams.md](wiki/dreams.md) | Big vision, goals, what you're building toward |
| [wiki/best-content.md](wiki/best-content.md) | Examples of great content with why it worked |
| [wiki/glossary.md](wiki/glossary.md) | Your specific terms and definitions |

## Content & Stories

| Folder | What's in it |
|--------|-------------|
| [my-content/](my-content/) | Published and in-progress content |
| [stories/](stories/) | Real moments from your life, tagged for reuse |
| [frameworks/](frameworks/) | Your frameworks and methodologies |
| [program-materials/](program-materials/) | Program content, curriculum, and assets |
| [presentations/](presentations/) | Talks, keynotes, and slide decks |
| [wins/](wins/) | Captured wins by date |
| [decisions/](decisions/) | Decisions made with context |
| [clients/](clients/) | Per-client files (optional) |

## Sources (Raw Clips)

| Folder | What's in it |
|--------|-------------|
| [sources/](sources/) | Raw web clips, articles, URLs saved for ingestion |

---
*Updated by Claude after each ingest. Add new wiki pages to the table above.*
EOF

cat > log.md << 'EOF'
# Ingest Log

Append-only. One entry per ingest, query, or lint pass.

Format:
- [INGEST] YYYY-MM-DD, source title, pages touched
- [QUERY] YYYY-MM-DD, question, answer saved to
- [LINT] YYYY-MM-DD, issues found/fixed

---
EOF
```

**Create sources/README.md:**

```bash
cat > sources/README.md << 'EOF'
# Sources

Raw, immutable clips. Drop things here. Never edit files once saved.

## How to add a source

**Option 1. URL in chat:**
Paste a link and say "ingest this." Claude fetches it, extracts what matters, updates the wiki,
and saves the raw content here automatically.

**Option 2. Save a file here manually:**
Use a browser extension (MarkDownload, Obsidian Web Clipper, etc.) to save a page as markdown.
Drop it in this folder with the naming format: YYYY-MM-DD-short-title.md
Then say "ingest [filename]" and Claude does the rest.

## What happens on ingest

Claude reads the source, updates relevant wiki pages, updates index.md if needed, and appends
to log.md. The raw file stays here untouched as the source of truth.
EOF
```

**Create starter wiki files:**

```bash
cat > wiki/best-content.md << 'EOF'
# Best Content

Your greatest hits live here.
Posts that landed. Emails that got replies. Captions that felt like YOU.
Claude reads this before writing anything for you.

Format: Date / Platform / Description / Why it worked

---
EOF

cat > wiki/dreams.md << 'EOF'
# Dreams

Your big vision lives here.
Not the next 90-day goal. The real thing.
What you are building. Who you are becoming. What your life looks like when it all works.

---
EOF

cat > wiki/glossary.md << 'EOF'
# Glossary

Your own language lives here.
Terms you have coined. Frameworks you use. Words that mean something specific in your world.

---
EOF
```

Say: "Structure is ready. Now let's fill in your core brain files. I'll ask you one question at a time and write each file for you. Just answer naturally."

Then work through each core file one at a time.

**For each file: ask the question, draft from their answer, show the draft, confirm, then write the file using bash.**

**wiki/01-identity-and-positioning.md**
Ask: "Tell me who you are and what you do. Talk to me like I'm someone you just met at a conference."

**wiki/02-brand-voice.md**
Ask: "How do you sound? What words do you love? What do you NEVER want to sound like? Any examples of copy that felt perfectly you?"

**wiki/03-ideal-client.md**
Ask: "Describe your dream client like they're sitting across from you right now. Who are they, what do they want, and what keeps them up at night?"

**wiki/04-programs-and-offers.md**
Ask: "Walk me through every offer you have right now: name, price, who it's for, and what they get."

**wiki/05-market-and-competitors.md**
Ask: "Who else does what you do? How are you different? What are your clients being told by others in your space?"

**wiki/company-details.md**
Ask: "Give me your business basics: name, website, social handles, email, team members, tools you use, and your current main goal."

**wiki/glossary.md**
Ask: "Any terms, frameworks, or phrases that are uniquely yours? Things you've coined or that mean something specific in your world?"

**wiki/dreams.md**
Ask: "What's the big dream? Not the next 90-day goal. The real vision. What are you building and what does life look like when it all works?"

**wiki/best-content.md**
Ask: "Do you have any past content that performed really well or felt most like you? Paste one or two pieces and I'll format them as your first entries."

Write each file after they confirm the draft. Then move to Step 2.

---

### If they choose Option B: Manual Mode

Say: "Got it. Here's everything you need to create:"

**Folders to create:**
```
wiki/
sources/
my-content/
stories/
frameworks/
program-materials/
presentations/
decisions/
wins/
clients/ (optional)
```

**Files to create:**
```
CLAUDE.md
index.md
log.md
sources/README.md
wiki/01-identity-and-positioning.md
wiki/02-brand-voice.md
wiki/03-ideal-client.md
wiki/04-programs-and-offers.md
wiki/05-market-and-competitors.md
wiki/company-details.md
wiki/glossary.md
wiki/dreams.md
wiki/best-content.md
```

"Come back when the structure is created and say 'ready to fill in my files.'"

When they return, scan the vault again, then fill in each file using the question-and-draft process above.

---

### Step 2: Finalize CLAUDE.md (Both Paths)

Generate a fully personalized CLAUDE.md using the CLAUDE.md Template below.

Write it with bash, then confirm: "Your CLAUDE.md is written. Want me to read it back to you?"

---

### Step 3: GitHub Check

Ask: "Do you have GitHub Desktop installed and your vault connected to a private repository?"

If yes: "Great. Commit and push now so everything is backed up."

If no, guide them:
- Create a free account at github.com
- Install GitHub Desktop at desktop.github.com
- Open GitHub Desktop and click **Add an Existing Repository from your Local Drive...**
- Point it to this vault folder
- It will likely say "This folder is not a Git repository" then click **"create a repository here instead"**
- Click **Create Repository**, then **Publish Repository**
- Check **"Keep this code private"** before clicking Publish

**Note for second computer:** Use **File -> Clone Repository** (not Add Existing) because the folder will be empty on the second machine.

---

### Step 4: Test

Read all core files silently. Deliver a one-paragraph summary:

"Here is what I know about you: [summary]

Does that feel right? Anything I missed or got wrong?"

Adjust any files based on their feedback.

---

### Step 5: Offer Scheduled Tasks Automation

Say:

"One powerful upgrade: I can set up three scheduled tasks that run your AI Second Brain on autopilot. A morning briefing, an end-of-day recap that files everything, and a weekly Brain Update that processes itself. Want me to walk you through those now?"

If yes, run Flow 11: Scheduled Tasks Setup.

If no:
"No problem. Say 'set up scheduled tasks' anytime and I'll walk you through it.

One last thing. Set a recurring Sunday reminder to open Claude and say 'Run my weekly Brain Update.' That 10-minute habit is what keeps this system getting smarter every week."

Close: "Your AI Second Brain is live. Commit and push in GitHub Desktop and you're done."

---

## Flow 1B: Partial Setup

Trigger when: some files exist with content, some are missing or empty.

Report the scan results, then work through only the missing or empty files using the same question-and-draft process from Flow 1A.

Also silently create any missing top-level folders:
```bash
mkdir -p my-content stories frameworks program-materials presentations
```

---

## Flow 2: Session Start Ritual

Trigger when: all core files exist and user has not asked for setup.

1. Read index.md first to orient.
2. Silently read:
   - wiki/01-identity-and-positioning.md
   - wiki/02-brand-voice.md
   - wiki/03-ideal-client.md
   - wiki/04-programs-and-offers.md
   - wiki/company-details.md
   - wiki/dreams.md (if exists)
   - wiki/best-content.md (if exists)

3. Confirm with exactly:
   "Brain loaded. I know who you are. What are we building today?"

Do not summarize files out loud unless asked.

---

## Flow 3: Session End Ritual

Trigger when: user says "run end of session," "wrap up," or "let's close out."

Say: "Before we close, let's update your AI Second Brain. Did anything happen today worth saving?"

Based on their answer, write updates using bash:

Story -> stories/:
```bash
cat > stories/YYYY-MM-DD-short-title.md << 'EOF'
# [Story Title]

[3-5 sentence capture]

**Use for:** [content angle]
EOF
```

Framework -> frameworks/:
```bash
cat > frameworks/YYYY-MM-DD-name.md << 'EOF'
# [Framework Name]

[Description and how to use it]
EOF
```

Win -> wins/:
```bash
cat > wins/YYYY-MM-DD-short-title.md << 'EOF'
# [Win Title]
**Date:** [date]

[Win description]
EOF
```

Decision -> decisions/:
```bash
cat > decisions/YYYY-MM-DD-short-title.md << 'EOF'
# [Decision Title]
**Date:** [date]

[Decision and reasoning]
EOF
```

Great content -> wiki/best-content.md:
```bash
cat >> wiki/best-content.md << 'EOF'

---
## [Date] - [Platform] - [Description]
[Content]
**Why it worked:** [analysis]
---
EOF
```

Confirm what was updated, then auto-commit:

```bash
git add <the files you changed>
git commit -m "Session end: [brief description of what was saved]"
git pull --rebase
git push origin main
```

Say: "All saved to GitHub."

---

## Flow 4: Weekly Brain Update

Trigger when: user says "run my weekly Brain Update," "brain check-in," or "weekly update."

Say: "Let's do your weekly Brain Update. Seven questions. Answer naturally and I'll handle the filing."

Ask one at a time. Write the update to the appropriate file immediately after each answer.

1. "What happened this week that's worth remembering?"
2. "Any stories for the Story Bank? Funny moments, real moments, lessons learned, client breakthroughs?"
3. "Did anything change about your offers, pricing, or positioning this week?"
4. "Any decisions you made that we should document?"
5. "Any wins to capture, yours or a client's?"
6. "Did any content perform really well? Anything that should go in Best Content?"
7. "Did your dreams shift or get clearer at all?"

When all 7 are done, summarize what was added and confirm everything is committed.

---

## Flow 5: Story Bank Capture

Trigger when: user says "add this to my story bank" or shares a story mid-session.

```bash
cat > stories/YYYY-MM-DD-short-title.md << 'EOF'
# [One-line title]

[3-5 sentence story capture]

**Use for:** [content angle]
EOF
```

Confirm: "Added to your Story Bank."

---

## Flow 6: Best Content Capture

Trigger when: user says "add this to best content" or shares content that performed well.

```bash
cat >> wiki/best-content.md << 'EOF'

---
## [Date] - [Platform] - [One-line description]
[Content]
**Why it worked:** [one-line analysis]
---
EOF
```

Confirm: "Added to Best Content."

---

## Flow 7: Client File Management (Optional)

Only activate if user has a clients/ folder OR explicitly asks for client support.

Check before creating:
```bash
ls clients/ 2>/dev/null && echo "folder exists" || echo "no clients folder"
```

### Creating a New Client File

```bash
cat > clients/firstname-lastname.md << 'EOF'
# [Client Name]
**Started:** [date]
**Program:** [program name]
**Current Goal:** [what they are working toward]

## Their Business
[What they do, who they serve, what they sell]

## Their Personality
[How they communicate, their energy, their style]

## Where They Are Now
[Current situation and challenges]

## Decisions Made
- [date] [decision]

## Wins
- [date] [win]

## Session Notes
### [Date]
[Key insights, what we worked on, next steps]
EOF
```

### Pre-Call Briefing

Read their file and deliver: current goal, where they left off, key context, open action items.

---

## Flow 8: Web Clipper Ingest

Trigger when: user says "ingest this," "ingest [filename]," pastes a URL, or drops a file in sources/.

### Step 1: Get the source

**If a URL:** fetch the full content. Save raw to sources/:
```bash
cat > sources/YYYY-MM-DD-short-title.md << 'EOF'
# [Page Title]
Source: [URL]
Clipped: [date]

---
[full raw content]
EOF
```

**If a filename in sources/:** read the file directly.

### Step 2: Extract and integrate

Read the source. Extract: key ideas, quotes, positioning insights, competitor moves, research, stories.

Update every wiki page that is relevant. Add, revise, cross-reference. Typical: 3 to 10 pages.

Do not just summarize. Integrate. The wiki should be smarter after every ingest.

If a topic deserves its own wiki page, create it and add it to index.md.

### Step 3: Log and commit

```bash
cat >> log.md << 'EOF'
[INGEST] YYYY-MM-DD, [source title], pages touched: [list]
EOF

git add <the files you changed>
git commit -m "Ingest: [source title]"
git pull --rebase
git push origin main
```

Confirm: "Ingested. Updated [X] wiki pages. Saved to GitHub."

---

## Flow 9: Query (Synthesis on Demand)

Trigger when: user asks a question that requires synthesizing across multiple wiki pages.

1. Read index.md to locate relevant pages.
2. Read those pages.
3. Synthesize an answer with citations.
4. If the answer is substantial and reusable, save it as a new wiki page and update index.md.
5. Append to log.md.

---

## Flow 10: Lint (Health Check)

Trigger when: user says "lint," "health check," or "check the wiki."

Check for:
- Contradictions between wiki pages
- Stale claims (old pricing, discontinued programs)
- Orphan pages not listed in index.md
- Missing cross-references
- Missing top-level folders (my-content/, stories/, frameworks/, program-materials/, presentations/)

Report findings. Fix what you can. Append to log.md:
```bash
cat >> log.md << 'EOF'
[LINT] YYYY-MM-DD, [X] issues found, [Y] fixed: [description]
EOF
```

---

## Flow 11: Scheduled Tasks Setup

Trigger when: user says "set up scheduled tasks," "automate my second brain," or said yes at the end of Flow 1A.

First, say this, because it changes what you are about to set up: "Scheduled runs are capped per day by your Claude plan, and one schedule per job runs out fast. So we will not make a schedule for each of these. We will add them as rows to your routines table, and your assistant runs them as part of the one daily pass."

Then: "Let's set up three pieces of automatic housekeeping for your Second Brain. You'll need Claude running on your own computer, with access to your files."

These tasks use capture files. today.md for daily drops and this-week.md for weekly notes. You jot things down during the day or week, and Claude files everything automatically.

Want all three, or just some?"

---

### Before Setting Up Tasks: Create the Capture Files

```bash
cat > today.md << 'EOF'
# Today's Captures

Drop anything here during the day. Claude files it automatically at 4pm.

## Stories

## Wins

## Decisions

## Great Content

## Notes
EOF

cat > this-week.md << 'EOF'
# This Week's Brain Update

Fill this in during the week. Claude processes it Sunday evening.

## What happened worth remembering?

## Stories for the Story Bank?

## Offers, pricing, or positioning changes?

## Decisions made?

## Wins to capture?

## Content that performed well?

## Did your dreams shift or get clearer?
EOF
```

---

### Task 1: Morning Briefing

**What it does:** Reads your Second Brain each weekday morning and sends a punchy briefing to Slack.

**Schedule:** Weekdays at 7am (or their preferred time)

Give them this prompt to paste into Claude Scheduled Tasks:

```
Open my Second Brain vault at [VAULT_PATH] and read index.md, wiki/dreams.md,
the 3 most recent files in decisions/, and the 3 most recent files in wins/.

Then deliver a morning briefing to my Slack with:
- My current top priority (from dreams.md)
- Any open decisions worth revisiting today
- A recent win to start the day with good energy
- One sentence on what to focus on today

Keep it short and punchy. [Their voice]. No walls of text.
```

Tell them: "Replace [VAULT_PATH] with your actual vault path and [Their voice] with how you like to sound."

---

### Task 2: End of Day Recap

**What it does:** Reads today.md each weekday afternoon, files everything to the right place, clears the file, commits to GitHub, and posts a Slack summary.

**Schedule:** Weekdays at 4pm (or their preferred time)

Prompt to paste into Claude Scheduled Tasks:

```
Open my Second Brain vault at [VAULT_PATH] and read today.md.

If today.md has content beyond the template headings:
- Stories go to stories/ as a new file named YYYY-MM-DD-title.md
- Wins go to wins/ as a new file
- Decisions go to decisions/ as a new file
- Great content gets appended to wiki/best-content.md with a "Why it worked:" note
- Clear today.md back to the blank template after filing
- Commit and push to GitHub

Post a recap to my Slack listing what was saved.
If today.md was empty, post: "Nothing captured today. Tomorrow's a new day."
```

---

### Task 3: Weekly Brain Update (Automated)

**What it does:** Reads this-week.md each Sunday, processes all 7 Brain Update sections, updates the right files, clears the capture file, commits to GitHub, and posts a Slack summary.

**Schedule:** Sundays at 5pm (or whenever they like)

Prompt to paste into Claude Scheduled Tasks:

```
Open my Second Brain vault at [VAULT_PATH] and read this-week.md.

If this-week.md has content beyond the template headings, process all 7 sections:
- Stories to stories/ as individual files
- Wins to wins/
- Decisions to decisions/
- Offer/positioning changes to the relevant wiki/ file
- Best content to wiki/best-content.md
- Dreams updates to wiki/dreams.md

Clear this-week.md back to the blank template. Commit and push to GitHub.

Post a summary to my Slack of everything that was updated.
If this-week.md was empty, post: "Brain Update Sunday! Fill in this-week.md and I'll handle the rest."
```

---

### Finishing Scheduled Tasks Setup

Say:

"To activate these: open Claude desktop, go to Scheduled Tasks, paste each prompt with your actual vault path, and set the schedule.

Your capture files are ready. Drop notes in today.md during the day, and this-week.md during the week. Claude handles all the filing.

One more thing: want me to create the auto-save script so GitHub syncs every 60 seconds in the background? That's what makes sure the scheduled tasks always have fresh data to push."

If yes, walk them through auto-save from references/setup-guide.md (Part 5B for Mac, Part 5C for PC).

**Note on scheduling, and it matters more than it looks:**
Scheduled runs are capped per day by your Claude plan, and the cap is low enough that one schedule per job runs out fast. So do not create a schedule for each of these. **Add them as rows to your routines table instead**, and your assistant runs them as part of the one daily pass. One schedule, many jobs. A run on your own machine can reach your files; a run in the cloud cannot, so anything touching the vault belongs in a session on your computer.

---

## CLAUDE.md Template

Generate a fully personalized version using everything the user shared during setup. Never leave placeholder brackets in the final file.

```markdown
# Claude's Instructions for This Second Brain

You are the disciplined wiki maintainer for [NAME]'s Second Brain.

This system follows the Karpathy LLM Wiki pattern: incrementally build and maintain
a persistent, interlinked knowledge base. Knowledge compounds. It does not re-derive
from scratch each session.

## Step 0: Session Start

Read index.md first. It tells you where everything lives.

Then read:
1. wiki/01-identity-and-positioning.md
2. wiki/02-brand-voice.md
3. wiki/03-ideal-client.md
4. wiki/04-programs-and-offers.md
5. wiki/company-details.md
6. wiki/dreams.md and wiki/best-content.md if they exist

Confirm: "Brain loaded. I know who you are. What are we building today?"

Do not summarize files out loud unless asked.

## Three Core Operations

### INGEST
Triggered when a URL is pasted or user says "ingest [source]."

1. Fetch content (URL) or read file (sources/).
2. Extract key ideas, quotes, positioning insights, stories, competitor intel.
3. Update 3-15 wiki pages touched by this source.
4. Update index.md if a new wiki page was created.
5. Append to log.md: [INGEST] YYYY-MM-DD, source title, pages touched: list
6. Auto-commit.

Do not just summarize the source. Integrate it. The wiki should be smarter after every ingest.

### QUERY
Triggered when a question requires synthesizing across wiki pages.

1. Read index.md to locate relevant pages.
2. Read those pages.
3. Synthesize with citations.
4. If the answer is substantial, save as a new wiki page.
5. Append to log.md: [QUERY] YYYY-MM-DD, question, saved to: file

### LINT
Triggered when user says "lint" or "health check."

Check for contradictions, stale claims, orphan pages, missing cross-references,
and missing top-level folders. Fix what you can.
Log: [LINT] YYYY-MM-DD, X issues found, Y fixed.

## Session End

When asked to wrap up:
1. Ask what happened today worth saving.
2. Story -> stories/ with date and Use for tag.
3. Framework -> frameworks/ with date in filename.
4. Win -> wins/ with date in filename.
5. Decision -> decisions/ with date in filename.
6. Great content -> append to wiki/best-content.md with Why it worked note.
7. Positioning change -> update the relevant wiki file.
8. Auto-commit and push.

## Weekly Brain Update

Ask 7 questions one at a time. Write each update before asking the next.

## Auto-Commit Rule (Always On)

Any time a file is created or edited, save it. **Run the steps one at a time, never joined with
`&&`.** A joined command is the shape Claude's permission system refuses, and the refusal reads to
the owner as lost work when nothing is lost:

git add <the files you changed>
git commit -m "[description]"
git pull --rebase
git push origin main

Do not narrate it. **You will see a permission prompt the first time: tell them it is coming and that
Allow, or Always allow for git, is the answer.** That is not asking permission for the work, it is
their machine asking once about git itself.

## Voice Rules
[Specific phrases this person uses. Specific phrases they never use. Tone. Energy.]

## Never Do This
[Their banned words, banned behaviors, red lines.]

## Key File Notes
- Read wiki/dreams.md for big-picture strategy or when they seem stuck.
- Read wiki/best-content.md before writing anything.
- Read stories/ when creating content to pull from real moments.
- Read frameworks/ for their methodology and how-to content.
- sources/ is for raw clips. Files there are immutable, never edit, only ingest.
- The clients/ folder exists. Always check before creating a new client file.
- today.md and this-week.md are capture files for scheduled tasks, do not delete them.
```

---

## Full Setup Guide

The complete member-facing written guide lives at references/setup-guide.md.

Read it when:
- A user says "give me the full setup guide"
- A user needs the GitHub or Obsidian installation walkthrough
- A user asks about auto-save setup (Mac or PC)

---

## Tone

Warm but efficient.

One question at a time.

Always show the draft and confirm before writing the file.

Never summarize files out loud during a session start.

Never use em-dashes.

Every sentence is its own paragraph.

No buzzwords. No "Hey love" or "Hey beautiful" openers.
