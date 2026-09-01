# The Second Brain
## A Persistent Memory System for Coaches and Consultants Using Obsidian, Claude Code, and GitHub

*Built by The Prepared Performer. So your AI finally knows who you are.*

---

## What This Is

Right now, every time you open a new Claude conversation, you start from zero.

You re-explain who you are.

You re-explain what you sell.

You re-explain your voice, your clients, your context.

This system fixes that.

By the end of this setup, Claude will open every session already knowing everything about you.

Your business. Your voice. Your dreams. Your stories. Your best content.

And when something changes, you update one file and everything syncs across every device you own.

No re-explaining. No uploading. Just continuity.

---

## How It Works (Plain English)

**Obsidian** is a free note-taking app that stores everything as simple text files on your computer. No cloud lock-in. No subscriptions required.

**Claude Code** is Claude's agent that can read and write files directly on your computer. So instead of just chatting, it can open your notes, update them, and save new information automatically.

**GitHub** is free version control software. Think of it as a private, version-controlled backup for your Second Brain. It syncs across every computer you own and keeps a full history of every change ever made.

**Auto-Save** is a tiny background script that runs on your Mac every 60 seconds. If anything in your vault changed, it commits and pushes to GitHub automatically. No clicking. No remembering. It just runs quietly in the background forever.

**Together:** Claude reads your Second Brain at the start of every session. After the session, it updates the right files. Auto-save pushes everything to GitHub automatically. Every device stays in sync. Your AI is always current, always synced, always yours.

---

## What You Will Need

- A Mac or PC (both supported -- auto-save setup differs slightly, both covered in this guide)
- Obsidian (free at obsidian.md)
- Claude Code access, either in the Claude desktop app or in a terminal (see Part 2)
- GitHub Desktop (free at desktop.github.com) -- must be installed and logged in at least once so your credentials are cached
- A free GitHub account at github.com
- About 60 to 90 minutes for first-time setup

---

## Part 1: Create Your Vault in Obsidian

This is the only step you must do yourself. Everything after this can be handled by Claude.

### Step 1: Download and Install Obsidian

Go to obsidian.md and download the free app.

Open it and click "Create new vault."

Name it something you will remember. We suggest **Second Brain** or **[YourName] Second Brain**.

Choose a location on your computer. Your Desktop works perfectly.

**A note on Obsidian Sync:** If you are currently paying for Obsidian Sync ($8/month), you can cancel it. GitHub handles all syncing for free as part of this system. Same result. Zero monthly fee.

### Step 2: Find Your Vault's Exact Location

Before moving on, you need to know exactly where your vault lives on your computer. You will need this path in the next step.

**On Mac:**

Open Obsidian. In the bottom left corner, click the vault icon (it looks like a safe). Hover over your vault name and you will see the file path listed beneath it.

It will look something like:
```
/Users/yourname/Desktop/Second Brain
```

Write this down or copy it. You will need it shortly.

**Can't find it?** Open Terminal and run this command -- it will search your whole computer and tell you exactly where the folder is:

```bash
find ~ -type d -name "Second Brain*" 2>/dev/null
```

If you named your vault something different, replace "Second Brain*" with the first few letters of your vault name:

```bash
find ~ -type d -name "YourVaultName*" 2>/dev/null
```

Paste what comes back and you will have your exact path.

---

## Part 2: Launch Claude Code

You have two ways to run Claude Code. Choose whichever feels most comfortable.

---

### Option 1: Use the Claude desktop app (easier for most people)

This is the most comfortable option if you are already using Claude in the browser or desktop app.

You do not need to open Terminal at all.

**How to get started:**

1. Open Claude at claude.ai or in the Claude desktop app
2. Make sure Claude Code is enabled in that session (you will see a file/folder icon or computer use indicator)
3. Tell Claude where your vault is by saying:

*"My Obsidian vault is located at [paste your vault path here]. Please set up my Second Brain."*

For example:

*"My Obsidian vault is located at /Users/mollymahoney/Desktop/Second Brain. Please set up my Second Brain."*

Claude will navigate to your vault folder, scan what exists, and walk you through the full setup from right inside the app.

**Troubleshooting:**

If Claude says it cannot find the folder, double-check your path using the find command above and try again with the exact path it returns.

If Claude does not seem to have file access, check that Computer Use is enabled in your Claude settings.

---

### Option 2: Use Terminal (More Control)

This is the classic Claude Code experience. It runs entirely in your Terminal app.

**Step 1: Install Node.js**

Open Terminal (press Cmd + Space, type Terminal, hit Enter).

Run:
```bash
brew install node
```

If that says "command not found," install Homebrew first:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then run `brew install node` again.

**Step 2: Install Claude Code**

```bash
npm install -g @anthropic-ai/claude-code
```

Note: the package name is `@anthropic-ai/claude-code` with a hyphen between anthropic and ai.

**Step 3: Navigate to Your Vault**

Replace the path below with your actual vault location:

```bash
cd "/Users/yourname/Desktop/Second Brain"
```

If your path has spaces in it, keep the quotes around it exactly as shown.

**Troubleshooting -- "No such file or directory":**

This means the path is slightly wrong. Run this to find the exact path:

```bash
find ~ -type d -name "Second Brain*" 2>/dev/null
```

Then use whatever it returns in your cd command, wrapped in quotes.

**Step 4: Launch Claude Code**

```bash
claude
```

**Step 5: Start Your Second Brain Setup**

Once Claude Code is running, say:

*"Set up my Second Brain."*

Claude Code will take over from there.

---

## Part 3: What Claude Does During Setup

Whichever launch method you chose, Claude will now do the following automatically.

It scans your vault first to see what already exists.

Then it offers you two paths for creating your files:

---

### Path A: Claude Creates Everything For You (Recommended)

Claude creates all folders and files automatically, asks you questions one at a time, drafts the content from your answers, shows you the draft, and writes the file after you confirm.

You never manually create a single file.

Here is what gets built:

**Folders:**
```
decisions/
wins/
clients/  (optional -- only if you work with 1:1 clients)
```

**Files:**
```
CLAUDE.md
01-identity-and-positioning.md
02-brand-voice.md
03-ideal-client.md
04-programs-and-offers.md
05-market-and-competitors.md
company-details.md
glossary.md
dreams.md
story-bank.md
best-content.md
```

---

### Path B: You Create Files Manually (For Customizers)

Choose this if you want to customize file names or folder structure before filling them in.

Claude will give you the full list of files and folders to create in Obsidian, then fill them in through guided questions once you are ready.

To create files in Obsidian: right-click in the left sidebar and choose "New Note" or "New Folder."

Once your structure is ready, tell Claude: **"Ready to fill in my Second Brain files."**

---

## Part 4: What Each File Is For

Claude asks you questions to fill these in. This is just so you understand what you are building.

**01-identity-and-positioning.md**
Who you are. Your origin story. Your positioning. What makes you different. The transformation you deliver.

**02-brand-voice.md**
How you sound. Words you use. Words you never use. Tone. Energy. Examples of copy you love.

**03-ideal-client.md**
Your dream client. Their dreams, fears, frustrations. What they want to feel. What they say about their problem.

**04-programs-and-offers.md**
Every offer you have. Name, price, who it is for, what is included, the transformation it delivers.

**05-market-and-competitors.md**
Who else does what you do. How you are different. What your audience is being told by others.

**company-details.md**
Business name, website, social handles, email, team members, tools, current goals.

**glossary.md**
Your own language. Terms you have coined. Frameworks you use. Words that mean something specific in your world.

**dreams.md**
Your big vision. What you are building. The life you are creating. Claude reads this when you need big-picture strategy or when you seem stuck.

**story-bank.md**
Real things that happened to you. Funny moments. Vulnerable moments. Lessons learned. Client breakthroughs. Claude pulls from this when creating content so everything is grounded in your real life.

**best-content.md**
Your greatest hits. Posts that landed. Emails that got replies. Captions that felt like you. Claude reads this before writing anything for you. It teaches Claude what great looks like specifically for you.

**CLAUDE.md**
Your standing instructions. Claude reads this automatically every time it opens in your vault. Claude generates this for you at the end of setup -- you do not need to write it yourself.

---

## Part 5: Connect to GitHub

Once your files are created, connect your vault to GitHub so it syncs across every device.

Claude will walk you through this during setup. Or you can do it yourself:

### Step 1: Create a GitHub Account

Go to github.com and sign up for a free account.

### Step 2: Download GitHub Desktop

Go to desktop.github.com and install it. Sign in with your GitHub account.

### Step 3: Add Your Vault as a Repository

Because your Obsidian vault already has files in it, you will use "Add an Existing Repository" rather than cloning or creating from scratch.

In GitHub Desktop, click **Add an Existing Repository from your Local Drive...**

Point it to your vault folder (e.g. `/Users/yourname/Claude/HAE Second Brain`).

It will likely say "This folder is not a Git repository."

That is fine. Click **"create a repository here instead"** when it offers that option.

A dialog called "Create a New Repository" will appear.

The name and local path should already be filled in correctly.

You do not need to check "Initialize this repository with a README."

Leave Git Ignore and License set to None.

Click **Create Repository.**

**Important:** You will NOT see a privacy setting on this screen. The privacy option comes in the next step.

### Step 4: Publish to GitHub

After creating the repository, you will see a **Publish Repository** button in GitHub Desktop.

Click it.

A dialog will appear with a **"Keep this code private"** checkbox.

Make sure that box is checked before clicking Publish.

Click **Publish Repository.**

Your vault is now backed up privately on GitHub.

### Step 5: Verify It Is Private

Go to github.com and sign in.

Find your repository in the list.

You should see a lock icon next to the name confirming it is private.

### Step 6: Set Up on Other Computers

On any other computer:

1. Install Obsidian
2. Install GitHub Desktop and sign in
3. Click **File -> Clone Repository**
4. Find your second brain repo and clone it to a new empty folder
5. Open Obsidian and point it to the cloned folder

Every time you make changes, open GitHub Desktop, write a quick commit note, and push. It syncs to every other device automatically.

**Note:** When setting up on a second computer, use Clone (not Add Existing Repository) because the folder will be empty on that machine. Clone only works with empty folders -- that is intentional and correct for the second device setup.

---

## Part 5B: Set Up Auto-Save (Highly Recommended)

This is the step that makes the whole system feel like magic.

Without this, you have to remember to open GitHub Desktop and push your changes manually after every session.

With this, your Mac quietly checks your vault every 60 seconds in the background. If anything changed, it commits and pushes automatically with a timestamp. You never think about it again.

Zero tokens. Zero AI calls. Zero cost. No battery drain.

### What You Need First

Your vault must already be connected to a GitHub repo (Part 5 above).

GitHub Desktop must be installed and you must have logged in at least once. This caches your GitHub credentials in the Mac keychain so the auto-save can push without asking for a password every time.

### Step 1: Create the Auto-Save Installer

Open a Claude session pointed at your vault and say:

*"Create a file called setup-auto-save.command in my Second Brain folder. The script should:*
*1. Make a hidden support folder at ~/Library/Application Support/HAE-Auto-Save/*
*2. Write a bash script there that checks for changes and commits with a timestamp message*
*3. Write a launchd plist to ~/Library/LaunchAgents/com.hae.secondbrain.autosave.plist that runs the script every 60 seconds*
*4. Load the launchd job so it starts immediately"*

Claude will create the installer file directly in your vault.

### Step 2: Run the Installer

Open Terminal (Cmd + Space, type Terminal, hit Enter).

Paste this line -- replacing YOURNAME and YOUR-BRAIN-FOLDER with your actual folder names:

```bash
bash "/Users/YOURNAME/Claude/YOUR-BRAIN-FOLDER/setup-auto-save.command"
```

For example:
```bash
bash "/Users/yourname/Claude/HAE Second Brain/setup-auto-save.command"
```

Hit Enter.

You should see "Done" in the Terminal window.

Close Terminal.

That is it. Auto-save is now running in the background.

### What Happens Now

Every 60 seconds your Mac quietly checks your Second Brain folder for changes.

If nothing changed, nothing happens.

If something changed, it auto-commits with a message like `Auto-save: 2026-05-17 18:32:11` and pushes to GitHub.

### How To Check It Is Working

1. Edit any brain file -- add a word, change a sentence, anything
2. Wait 60 seconds
3. Open your GitHub repo in a browser
4. You should see a new commit titled `Auto-save: [today's date and time]`

If you see it, you are fully live.

### Update Your CLAUDE.md

Add this rule to your CLAUDE.md so Claude stops reminding you to commit manually:

```
## Auto-Commit Rule

Auto-save runs every 60 seconds via a background job on this Mac.
Any change to brain files is committed and pushed to GitHub automatically.
Do NOT remind me to commit or push manually.
```

### Turning It Off and Back On

**To turn off:**
```bash
launchctl unload ~/Library/LaunchAgents/com.hae.secondbrain.autosave.plist
```

**To turn back on:**
```bash
launchctl load ~/Library/LaunchAgents/com.hae.secondbrain.autosave.plist
```


---

## Part 6: Your Daily Workflow

### Starting a Session

**In the Claude desktop app:**
Open a new session and say: "Open my Second Brain vault at [your path] and load my brain files."

**In Terminal:**
```bash
cd "/Users/yourname/Desktop/Second Brain"
claude
```

Claude reads your CLAUDE.md automatically, scans your files, loads them silently, and confirms:

**"Brain loaded. I know who you are. What are we building today?"**

### During a Session

Work normally. If something worth saving comes up, just say it:

"Add this to my story bank: [what happened]"

"Add this to my best content: [paste the post]"

"Log this decision: [what you decided]"

Claude handles the filing. You stay in flow.

### Ending a Session

Say: **"Run end of session."**

Claude asks what needs saving, updates the right files, and confirms what changed.

That is it. Auto-save handles the rest.

Within 60 seconds your changes will be committed and pushed to GitHub automatically.

---

## Part 7: The Weekly Brain Update

Every Sunday (or whatever day works for you), open Claude in your vault and say:

**"Run my weekly Brain Update."**

Claude walks you through seven questions:

1. What happened this week worth remembering?
2. Any stories for the Story Bank?
3. Did anything change about your offers, pricing, or positioning?
4. Any decisions you made this week?
5. Any wins to capture?
6. Any content that performed really well?
7. Did your dreams shift or get clearer?

Answer conversationally. Claude writes updates to the right files after each answer.

About 10 minutes. Auto-save will push everything to GitHub within 60 seconds.

Your Second Brain gets smarter every single week.

---

## Part 8: Client Files (Optional)

*For coaches and consultants who want to track client work. Skip entirely if this does not apply to you.*

If you added a clients folder during setup, every client gets their own file inside it.

**Before a client call:** "Prep me for [Client Name]'s call."

Claude reads their file and gives you a full briefing in about 30 seconds.

**After a client call:** "Update [Client Name]'s file. Here is what happened: [paste notes or transcript]"

Claude extracts the key information, updates their file, and confirms what was added.

No more scrambling to remember where you left off.

---

## Quick Start Checklist

- [ ] Download Obsidian (free at obsidian.md)
- [ ] Cancel Obsidian Sync if you have it (saves $8/month)
- [ ] Create your vault and name it
- [ ] Find and copy your exact vault path
- [ ] Choose your launch method: the Claude desktop app or a terminal
- [ ] Tell Claude your vault path and say "Set up my Second Brain"
- [ ] Let Claude create your files (Path A) OR create them manually first (Path B)
- [ ] Connect your vault to a private GitHub repository
- [ ] Set up Auto-Save so changes push to GitHub automatically (Part 5B for Mac, Part 5C for PC)
- [ ] Test by editing a file and checking GitHub 60 seconds later
- [ ] Update your CLAUDE.md with the Auto-Commit Rule
- [ ] Set a weekly reminder to run your Brain Update
- [ ] (Optional) Add a clients folder for client tracking

---

## What This Unlocks

Once this system is running:

You open Claude on your laptop at a coffee shop. It already knows you.

You open Claude on your desktop at home. It still knows you.

You prep for a client call in 2 minutes instead of 20.

You never explain your brand voice to AI again.

Your story bank fills up and content ideas stop being hard.

Your best content teaches Claude what great looks like for you specifically.

Your dreams stay visible so every session is pointed at what actually matters.

That is not a tool anymore. That is a second brain.

---

## Levels to Unlock Later

**Level 2:** Set up separate vaults for business and personal.

**Level 3:** Pull call transcripts from Grain or Zoom and automatically add them to client files.

**Level 4:** Create a shared team vault on GitHub so your whole team stays in sync.

**Level 5:** Connect to your CRM so client wins automatically update in GoHighLevel.

But start here. Get your Second Brain built. Get it synced.

And feel what it is like to have AI that actually knows you.

---

*Built by The Prepared Performer.*
*For more AI systems for coaches and consultants, visit mollymahoney.com.*

---

## Part 5C: Auto-Save for PC (Windows)

The auto-save system works on Windows too.

Instead of launchd (which is Mac only), Windows uses Task Scheduler to run a script in the background every 60 seconds.

The result is identical.

Every 60 seconds Windows quietly checks your vault for changes. If something changed, it commits and pushes to GitHub automatically with a timestamp.

No clicking. No remembering. Just runs forever.

### What You Need First

Your vault must already be connected to a GitHub repo (Part 5 above).

GitHub Desktop must be installed and you must have logged in at least once. This caches your credentials so the auto-save can push without asking for a password.

Git must be installed on your PC. Download it free at git-scm.com if you do not have it. Run `git --version` in Command Prompt to check.

### Step 1: Create the Auto-Save Installer

Open a Claude session pointed at your vault and say:

*"Create a file called setup-auto-save.bat in my Second Brain folder. The script should:*
*1. Create a bash script at %APPDATA%\HAE-Auto-Save\autosave.sh that checks for git changes and commits with a timestamp message*
*2. Create a Task Scheduler task called HAE-Second-Brain-Auto-Save that runs that script every 60 seconds using Git Bash*
*3. Start the task immediately"*

Claude will create the installer file directly in your vault.

### Step 2: Run the Installer

Find the `setup-auto-save.bat` file in your vault folder using File Explorer.

Right-click it and choose **Run as administrator.**

You may see a Windows security prompt asking if you want to allow it. Click **Yes.**

A Command Prompt window will open, run the script, and close automatically.

That is it. Auto-save is now running in the background.

### What Happens Now

Every 60 seconds Windows quietly checks your Second Brain folder for changes.

If nothing changed, nothing happens.

If something changed, it auto-commits with a message like `Auto-save: 2026-05-17 18:32:11` and pushes to GitHub.

### How To Check It Is Working

1. Edit any brain file -- add a word, change a sentence, anything
2. Wait 60 seconds
3. Open your GitHub repo in a browser
4. You should see a new commit titled `Auto-save: [today's date and time]`

If you see it, you are fully live.

### Update Your CLAUDE.md

Add this rule to your CLAUDE.md so Claude stops reminding you to commit manually:

```
## Auto-Commit Rule

Auto-save runs every 60 seconds via Task Scheduler on this Windows PC.
Any change to brain files is committed and pushed to GitHub automatically.
Do NOT remind me to commit or push manually.
```

### Turning It Off and Back On

**To turn off:**

Open Command Prompt and run:
```
schtasks /end /tn "HAE-Second-Brain-Auto-Save"
schtasks /change /tn "HAE-Second-Brain-Auto-Save" /disable
```

**To turn back on:**
```
schtasks /change /tn "HAE-Second-Brain-Auto-Save" /enable
schtasks /run /tn "HAE-Second-Brain-Auto-Save"
```

Or open **Task Scheduler** from the Start menu, find the task called HAE-Second-Brain-Auto-Save, and right-click to enable or disable it.

### Troubleshooting

**"Git is not recognized as a command"**
Git is not installed or not on your PATH. Download it at git-scm.com and install with default settings. Restart Command Prompt and try again.

**The task runs but nothing pushes to GitHub**
Make sure GitHub Desktop is installed and you have logged in at least once. Open GitHub Desktop, sign in, and try again.

**Windows Defender blocked the script**
Right-click the .bat file, choose Properties, and check "Unblock" at the bottom of the General tab. Then run as administrator again.

