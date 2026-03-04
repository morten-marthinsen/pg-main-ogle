# Code to Staging Site Deployment Workflow

## Overview
This guide walks you through the complete process of setting up and using a code deployment pipeline—from installing Git to seeing your changes live on a staging site. Written for someone who has never written code or used these tools before.

**What you'll set up:**
- Git (version control on your computer)
- GitHub (cloud storage for your code)
- Vercel (hosting platform that shows your site to the world)
- A staging environment (test site before going live)

**Time to complete initial setup:** 45-60 minutes (one-time)
**Time for ongoing deployments:** 2-5 minutes

**What computer do you have?**
This guide covers both Mac and Windows. Look for the 🍎 (Mac) and 🪟 (Windows) icons to find instructions for your system.

---

## Before You Start: Terminal Basics

The Terminal (Mac) or Git Bash (Windows) is a text-based way to control your computer. Don't be intimidated—you'll only need to copy and paste commands.

### 🍎 Mac: Opening Terminal
1. Press `Cmd + Space` (opens Spotlight search)
2. Type `Terminal`
3. Press `Enter`
4. A window with a white or black background appears—this is Terminal

### 🪟 Windows: Opening Git Bash
After installing Git (Part 1), you'll use "Git Bash" instead of the regular Command Prompt:
1. Click the Start menu
2. Type `Git Bash`
3. Click to open
4. A window appears—this is your terminal

### Terminal Tips for Beginners
- **The `$` symbol:** When you see `$ git status`, you only type `git status`. The `$` just indicates "type this command."
- **Copy/Paste in Terminal:**
  - 🍎 Mac: `Cmd + C` to copy, `Cmd + V` to paste
  - 🪟 Windows Git Bash: Select text to copy, right-click to paste
- **If you make a typo:** Press `Ctrl + C` to cancel, then try again
- **If Terminal seems frozen:** Press `Enter` or `Ctrl + C`
- **To close Terminal:** Type `exit` and press Enter, or just close the window

---

## Part 1: Install Git

Git is software that tracks changes to your code. Think of it like "Track Changes" in Microsoft Word, but for code.

### 🍎 Mac Installation

**Step 1:** Open Terminal (see "Terminal Basics" above)

**Step 2:** Check if Git is already installed
```bash
git --version
```

**What you might see:**
- ✅ `git version 2.39.0` (or any version number) → Git is installed! Skip to Part 2.
- ❌ `command not found` → Continue to Step 3
- ❓ A popup appears asking to install "Command Line Developer Tools" → Click "Install" and wait (this installs Git!)

**Step 3:** If no popup appeared, install Homebrew first
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**During installation, you may see:**
- "Press RETURN to continue" → Press `Enter`
- "Password:" → Type your Mac login password (you won't see characters as you type—this is normal) → Press `Enter`

⚠️ **Important:** After Homebrew installs, it may show commands to run. Look for text that says "Run these commands in your terminal." Copy and run each command shown.

**Step 4:** Install Git
```bash
brew install git
```

**Step 5:** Close and reopen Terminal, then verify
```bash
git --version
```

✅ **Checkpoint:** You see `git version X.XX.X`

---

### 🪟 Windows Installation

**Step 1:** Download Git
- Go to: https://git-scm.com/download/win
- Download starts automatically. If not, click "Click here to download manually."

**Step 2:** Find and run the installer
- Open your Downloads folder
- Double-click `Git-X.XX.X-64-bit.exe`
- If asked "Do you want to allow this app to make changes?" click "Yes"

**Step 3:** Installation wizard
Click "Next" on each screen. The default settings are correct. Specifically:
- "Select Components" → Leave defaults, click Next
- "Choosing the default editor" → Leave as "Vim" or select "Notepad" if you prefer
- "Adjusting your PATH" → Select "Git from the command line and also from 3rd-party software"
- "Choosing HTTPS transport backend" → Leave as "Use the OpenSSL library"
- Continue clicking Next until "Install"
- Click "Install"
- Click "Finish"

**Step 4:** Open Git Bash
- Click Start menu
- Type `Git Bash`
- Click to open

**Step 5:** Verify installation
```bash
git --version
```

✅ **Checkpoint:** You see `git version X.XX.X`

---

## Part 2: Configure Git Locally

This tells Git who you are, so your changes are labeled with your name.

### All Systems (Mac & Windows)

**Step 1:** Set your name
```bash
git config --global user.name "Your Full Name"
```
Example:
```bash
git config --global user.name "John Smith"
```

**Step 2:** Set your email
Use the same email you'll use for GitHub.
```bash
git config --global user.email "your.email@company.com"
```

**Step 3:** Verify your settings
```bash
git config --global --list
```

✅ **Checkpoint:** You see output like:
```
user.name=John Smith
user.email=john.smith@company.com
```

### Made a typo? Here's how to fix it:
Just run the command again with the correct information:
```bash
git config --global user.name "Correct Name"
```

---

## Part 3: Create a GitHub Account

GitHub is like Google Drive for code—it stores your code in the cloud and lets teams collaborate.

### If You Already Have a GitHub Account
Skip to Part 4. Make sure you know your login credentials.

### Creating a New Account

**Step 1:** Go to https://github.com

**Step 2:** Click "Sign up" (top right)

**Step 3:** Enter your information:
- **Email:** Use your work email
- **Password:** Create a strong password (save it in a password manager!)
- **Username:** Choose something professional
  - Good: `jsmith-performancegolf`, `john-smith-pg`
  - Avoid: `cooldude123`, `xxx_hacker_xxx`

**Step 4:** Complete the puzzle verification

**Step 5:** Check your email
- Open the verification email from GitHub
- Click the verification link
- ⚠️ Check spam folder if you don't see it within 2 minutes

**Step 6:** Choose the FREE plan
When asked about features, select the free tier.

**Step 7:** Skip personalization
You can click "Skip this" when asked about what you'll use GitHub for.

### Setting Up Two-Factor Authentication (2FA)

GitHub may require or strongly recommend 2FA. This adds security to your account.

**Step 1:** Go to https://github.com/settings/security

**Step 2:** Click "Enable two-factor authentication"

**Step 3:** Choose your method:
- **Authenticator app (recommended):** Use Google Authenticator, Authy, or 1Password
- **SMS:** Less secure but easier

**Step 4:** Follow the on-screen instructions

**Step 5:** **IMPORTANT:** Save your recovery codes somewhere safe (password manager, printed paper in a safe place)

✅ **Checkpoint:** You can log into github.com and see your dashboard

---

## Part 4: Set Up SSH Key (Secure Connection to GitHub)

SSH keys let your computer securely communicate with GitHub without entering your password every time.

### 🍎 Mac SSH Setup

**Step 1:** Check for existing SSH keys
```bash
ls -la ~/.ssh
```

**What you might see:**
- Files named `id_ed25519` and `id_ed25519.pub` → You have keys! Skip to Step 6.
- Files named `id_rsa` and `id_rsa.pub` → You have older keys. They work, but skip to Step 6.
- `No such file or directory` → No keys yet. Continue to Step 2.

**Step 2:** Generate a new SSH key
```bash
ssh-keygen -t ed25519 -C "your.email@company.com"
```
Replace with your actual email.

**Step 3:** When prompted "Enter file in which to save the key"
Just press `Enter` to accept the default location.

**Step 4:** When prompted "Enter passphrase"
Press `Enter` twice for no passphrase (simpler for beginners).

You'll see output including "Your public key has been saved."

**Step 5:** Add your key to the SSH agent
```bash
eval "$(ssh-agent -s)"
```
You should see: `Agent pid XXXXX`

Then:
```bash
ssh-add ~/.ssh/id_ed25519
```

**Step 6:** Copy your public key
```bash
pbcopy < ~/.ssh/id_ed25519.pub
```
This copies your key to the clipboard. You won't see any output—that's normal.

If that doesn't work, try:
```bash
cat ~/.ssh/id_ed25519.pub
```
Then manually select ALL the text and copy it (`Cmd + C`).

**Step 7:** Add the key to GitHub
1. Go to https://github.com/settings/ssh/new
2. **Title:** Enter a name for this computer (e.g., "MacBook Pro Work")
3. **Key type:** Leave as "Authentication Key"
4. **Key:** Paste your key (`Cmd + V`)
5. Click "Add SSH key"
6. If prompted, enter your GitHub password

**Step 8:** Test the connection
```bash
ssh -T git@github.com
```

If you see: `Are you sure you want to continue connecting (yes/no)?`
Type `yes` and press `Enter`.

✅ **Checkpoint:** You see: `Hi username! You've successfully authenticated, but GitHub does not provide shell access.`

---

### 🪟 Windows SSH Setup

**Step 1:** Open Git Bash

**Step 2:** Check for existing SSH keys
```bash
ls -la ~/.ssh
```

**What you might see:**
- Files named `id_ed25519` and `id_ed25519.pub` → You have keys! Skip to Step 6.
- `No such file or directory` → No keys yet. Continue to Step 3.

**Step 3:** Generate a new SSH key
```bash
ssh-keygen -t ed25519 -C "your.email@company.com"
```

**Step 4:** When prompted "Enter file in which to save the key"
Press `Enter` to accept the default.

**Step 5:** When prompted "Enter passphrase"
Press `Enter` twice for no passphrase.

**Step 6:** Start the SSH agent
```bash
eval "$(ssh-agent -s)"
```

Then add your key:
```bash
ssh-add ~/.ssh/id_ed25519
```

**Step 7:** Copy your public key
```bash
cat ~/.ssh/id_ed25519.pub
```
Select ALL the text that appears (starts with `ssh-ed25519`, ends with your email).
Right-click to copy.

**Step 8:** Add the key to GitHub
1. Go to https://github.com/settings/ssh/new
2. **Title:** Enter a name for this computer (e.g., "Work Laptop Windows")
3. **Key:** Paste your key (right-click → Paste)
4. Click "Add SSH key"

**Step 9:** Test the connection
```bash
ssh -T git@github.com
```

Type `yes` if asked about fingerprint.

✅ **Checkpoint:** You see: `Hi username! You've successfully authenticated`

---

## Part 5: Install Cursor (Code Editor)

Cursor is the code editor you'll use to make changes. If you already have Cursor or VS Code installed, skip this part.

**Step 1:** Go to https://cursor.sh

**Step 2:** Click "Download"
- 🍎 Mac: Download the .dmg file
- 🪟 Windows: Download the .exe file

**Step 3:** Install
- 🍎 Mac: Open the .dmg, drag Cursor to Applications folder
- 🪟 Windows: Run the .exe installer, click through the prompts

**Step 4:** Open Cursor
- Launch from Applications (Mac) or Start Menu (Windows)

✅ **Checkpoint:** Cursor opens and you see a welcome screen

---

## Part 6: Create a GitHub Repository

A repository (repo) is a project folder that GitHub tracks.

### If a Repository Already Exists
If someone else already created the repo, skip to "Clone an Existing Repository" below.

### Create a New Repository

**Step 1:** Go to https://github.com/new

**Step 2:** Fill in details:
- **Repository name:** Use lowercase and hyphens, no spaces
  - Good: `company-website`, `landing-page-2024`
  - Bad: `Company Website`, `my_project`
- **Description:** Brief description (optional)
- **Visibility:** Select "Private" (keeps code hidden from public)
- ✅ Check "Add a README file"
- **Add .gitignore:** Click dropdown, select the framework you're using (e.g., "Node") — this prevents junk files from being tracked
- Click "Create repository"

### Clone the Repository to Your Computer

**Step 1:** On your new repo page, click the green "Code" button

**Step 2:** Select the "SSH" tab

**Step 3:** Copy the URL (looks like `git@github.com:username/repo-name.git`)

**Step 4:** Open Terminal (Mac) or Git Bash (Windows)

**Step 5:** Navigate to where you want the project
```bash
cd ~/Documents
```
This puts it in your Documents folder.

**Step 6:** Clone the repository
```bash
git clone git@github.com:username/repo-name.git
```
Paste your actual URL instead.

**Step 7:** Enter the project folder
```bash
cd repo-name
```

**Step 8:** Open in Cursor
```bash
cursor .
```
The `.` means "current folder."

✅ **Checkpoint:** Cursor opens with your project files visible in the sidebar

---

## Part 7: Create a Vercel Account

Vercel hosts your website and automatically deploys changes when you push code.

### If You Already Have a Vercel Account
Log in and skip to "Import Your Project" below.

### Create New Account

**Step 1:** Go to https://vercel.com

**Step 2:** Click "Sign Up"

**Step 3:** Click "Continue with GitHub"
- This is the easiest method—it links your accounts automatically
- Click "Authorize Vercel" when prompted

**Step 4:** You're now logged into Vercel

✅ **Checkpoint:** You see the Vercel dashboard

---

## Part 8: Connect GitHub Repository to Vercel

This makes Vercel automatically deploy your site whenever you push code.

### Import Your Project

**Step 1:** From Vercel dashboard, click "Add New" → "Project"

**Step 2:** Find your repository
- You should see a list of your GitHub repos
- If you don't see it: Click "Adjust GitHub App Permissions" → Select your repo → Save

**Step 3:** Click "Import" next to your repository

**Step 4:** Configure settings
- **Project Name:** Vercel auto-fills this. You can change it.
- **Framework Preset:** Usually auto-detected. If not, select yours (e.g., Next.js)
- **Root Directory:** Leave as `./` unless your code is in a subfolder
- Leave other settings as default

**Step 5:** Click "Deploy"

**Step 6:** Wait 1-3 minutes
- Watch the build log for progress
- If it says "Error," see Troubleshooting section

**Step 7:** Celebrate! 🎉
- Click "Continue to Dashboard"
- Click the preview URL to see your live site

✅ **Checkpoint:** Your site is live at `your-project.vercel.app`

---

## Part 9: Set Up Staging Branch

By default, pushing to `main` updates your live site immediately. That's risky! We'll create a `staging` branch for testing first.

### Create the Staging Branch

**Step 1:** Open Terminal and navigate to your project
```bash
cd ~/Documents/your-project-name
```

**Step 2:** Make sure you're on the main branch
```bash
git checkout main
```

**Step 3:** Pull the latest code
```bash
git pull origin main
```

**Step 4:** Create the staging branch
```bash
git checkout -b staging
```

**Step 5:** Push staging to GitHub
```bash
git push -u origin staging
```

### How Vercel Handles Branches

| When you push to... | What happens | URL |
|---------------------|--------------|-----|
| `main` | Production deployment (LIVE site) | `your-project.vercel.app` |
| `staging` | Preview deployment (test site) | `your-project-git-staging-yourname.vercel.app` |
| Any other branch | Preview deployment | Unique preview URL |

### Finding Your Preview URL

After pushing to staging:
1. Go to Vercel dashboard
2. Click on your project
3. Click "Deployments" tab
4. Find the deployment with "staging" label
5. Click the URL in the "Preview" column

✅ **Checkpoint:** You understand that `main` = live site, `staging` = test site

---

## Part 10: Daily Workflow - Pushing Code to Staging

**This is what you'll do every time you make changes.**

### Step 1: Open your project

Open Terminal/Git Bash and navigate to your project:
```bash
cd ~/Documents/your-project-name
```

Or open Cursor and use its built-in terminal (`Ctrl + ~` or `Cmd + ~`).

### Step 2: Make sure you're on the staging branch
```bash
git branch
```

You should see:
```
  main
* staging
```

The `*` shows your current branch. If it's not on staging:
```bash
git checkout staging
```

### Step 3: Pull latest changes
Always do this before making changes (especially if working with a team):
```bash
git pull origin staging
```

### Step 4: Make your changes
Edit files in Cursor, Claude Code, or your editor.

### Step 5: Check what changed
```bash
git status
```

You'll see:
- **Red files:** Changed but not staged
- **Green files:** Staged and ready to commit
- **"nothing to commit":** No changes detected

### Step 6: Stage your changes
To stage all changes:
```bash
git add .
```

To stage specific files:
```bash
git add filename.tsx
```

### Step 7: Commit with a clear message
```bash
git commit -m "Add hero section with new images"
```

**Commit message rules:**
- Start with a verb: Add, Update, Fix, Remove, Change
- Be specific: "Fix header logo size" not "Fixed stuff"
- Keep it under 50 characters

### Step 8: Push to staging
```bash
git push origin staging
```

### Step 9: Verify on Vercel

1. Go to https://vercel.com/dashboard
2. Click your project
3. Click "Deployments"
4. Wait for "staging" deployment to show ✓ (Ready)
5. Click the preview URL
6. Verify your changes look correct

✅ **Checkpoint:** Changes visible on staging preview URL

---

## Part 11: Promoting Staging to Production

Once your changes are tested and approved on staging:

### Option A: Via GitHub (Recommended for Teams)

**Step 1:** Go to your GitHub repository

**Step 2:** Click "Pull requests" tab

**Step 3:** Click "New pull request"

**Step 4:** Set the branches:
- **base:** `main` (where changes go TO)
- **compare:** `staging` (where changes come FROM)

**Step 5:** Click "Create pull request"

**Step 6:** Add details:
- **Title:** Describe what's changing (e.g., "Add new homepage hero section")
- **Description:** List specific changes

**Step 7:** Click "Create pull request"

**Step 8:** Review changes (or have someone else review)

**Step 9:** Click "Merge pull request" → "Confirm merge"

**Step 10:** Vercel automatically deploys to production

✅ **Checkpoint:** Changes are live on your production URL

### Option B: Via Terminal (Quick for Solo Work)

```bash
git checkout main
git pull origin main
git merge staging
git push origin main
```

---

## Part 12: Quality Control Checklist

### Before Pushing to Staging
- [ ] Saved all files in editor
- [ ] Checked `git status` to see what's changed
- [ ] Reviewed changes make sense

### Before Promoting to Production
- [ ] Opened staging URL and checked all pages
- [ ] Tested on mobile (use phone or browser dev tools: right-click → Inspect → phone icon)
- [ ] Clicked all buttons and links
- [ ] All images load correctly
- [ ] Forms work (if applicable)
- [ ] No errors in browser console (right-click → Inspect → Console tab → no red text)
- [ ] Page loads within 3 seconds

### After Deploying to Production
- [ ] Opened live site and verified changes
- [ ] Hard refreshed (`Cmd+Shift+R` or `Ctrl+Shift+R`) to clear cache
- [ ] Checked 3 random pages
- [ ] Notified team that changes are live

---

## Part 13: Inviting Team Members

### Adding Collaborators to GitHub Repo

**Step 1:** Go to your repository on GitHub

**Step 2:** Click "Settings" tab

**Step 3:** Click "Collaborators" in the left sidebar

**Step 4:** Click "Add people"

**Step 5:** Enter their GitHub username or email

**Step 6:** Select their role:
- **Read:** Can view code only
- **Write:** Can push code
- **Admin:** Full access including settings

**Step 7:** Click "Add"

They'll receive an email invitation to accept.

### Adding Team Members to Vercel

**Step 1:** Go to Vercel dashboard

**Step 2:** Click your team name (top left)

**Step 3:** Click "Settings" → "Members"

**Step 4:** Click "Invite"

**Step 5:** Enter their email

**Step 6:** Select role and click "Send Invite"

---

## Part 14: Things to NEVER Commit

### Files That Should NOT Be in Git

| File/Folder | Why |
|-------------|-----|
| `.env` | Contains passwords and API keys |
| `.env.local` | Local environment secrets |
| `node_modules/` | Dependencies—too large, auto-generated |
| `.DS_Store` | Mac system files |
| `Thumbs.db` | Windows system files |

### How to Prevent Committing These

Your `.gitignore` file (in your project root) should include:
```
.env
.env.local
node_modules/
.DS_Store
Thumbs.db
```

If you accidentally committed a secret file:
1. Remove it from Git tracking: `git rm --cached .env`
2. Add to `.gitignore`
3. Commit: `git commit -m "Remove sensitive file"`
4. **IMPORTANT:** The secret is still in Git history. If it was a password/API key, rotate it immediately!

---

## Part 15: Undoing Mistakes

### "I made changes but haven't committed yet"

**Undo ALL uncommitted changes (careful—this deletes your work!):**
```bash
git checkout .
```

**Undo changes to ONE file:**
```bash
git checkout filename.tsx
```

### "I committed but haven't pushed yet"

**Undo the last commit but keep changes:**
```bash
git reset --soft HEAD~1
```

**Undo the last commit and discard changes:**
```bash
git reset --hard HEAD~1
```

### "I pushed to the wrong branch"

If you pushed to `main` instead of `staging`:

**Step 1:** Don't panic. Go to Vercel dashboard.

**Step 2:** Find the deployment and click "..." → "Rollback" to restore the previous version.

**Step 3:** Fix the branch situation:
```bash
git checkout staging
git merge main
git checkout main
git reset --hard HEAD~1
git push origin main --force
```
⚠️ Only use `--force` if you're the only one working on the repo.

### "Vercel deployed something broken"

**Step 1:** Go to Vercel dashboard

**Step 2:** Click on your project

**Step 3:** Click "Deployments"

**Step 4:** Find the last working deployment

**Step 5:** Click "..." → "Promote to Production"

This instantly reverts your live site to the previous version while you fix the issue.

---

## Troubleshooting Guide

### Connection Issues

| Error | Cause | Solution |
|-------|-------|----------|
| `Permission denied (publickey)` | SSH key not set up | Re-do Part 4 |
| `Could not resolve host github.com` | Internet/DNS issue | Check internet connection. Try: `ping google.com`. If on VPN, try disconnecting. |
| `Connection timed out` | Firewall blocking Git | If on corporate network, contact IT. May need to use HTTPS instead of SSH. |

### Git Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `fatal: not a git repository` | Not in a project folder | `cd` into your project folder first |
| `Updates were rejected` | Someone else pushed first | Run `git pull origin staging` then try pushing again |
| `Merge conflict in file.tsx` | Two people edited same lines | See "Resolving Merge Conflicts" below |
| `nothing to commit` | No changes detected | Make sure you saved your files |
| `error: failed to push some refs` | Branch doesn't exist on remote | Run `git push -u origin branch-name` |

### Vercel Errors

| Issue | Solution |
|-------|----------|
| Build failed | Click "View Build Logs" in Vercel, find the red error, fix in code, push again |
| Changes not showing | Hard refresh browser (`Cmd+Shift+R`), or open in incognito |
| "No framework detected" | In Vercel project settings, manually select your framework |

### Resolving Merge Conflicts

When two people edit the same lines, Git can't automatically combine them.

**Step 1:** Git will tell you which files have conflicts

**Step 2:** Open the file in Cursor

**Step 3:** Look for conflict markers:
```
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> staging
```

**Step 4:** Decide which version to keep (or combine both)

**Step 5:** Delete the markers (`<<<<<<<`, `=======`, `>>>>>>>`)

**Step 6:** Save the file

**Step 7:** Complete the merge:
```bash
git add .
git commit -m "Resolve merge conflict"
git push origin staging
```

---

## Quick Reference Card

Print this and keep at your desk:

```
═══════════════════════════════════════
DAILY WORKFLOW CHEAT SHEET
═══════════════════════════════════════

1. OPEN PROJECT
   cd ~/Documents/project-name

2. CHECK BRANCH (should say *staging)
   git branch

3. SWITCH TO STAGING (if needed)
   git checkout staging

4. GET LATEST CHANGES
   git pull origin staging

5. [Make your edits in Cursor]

6. SEE WHAT CHANGED
   git status

7. STAGE CHANGES
   git add .

8. COMMIT
   git commit -m "Your message"

9. PUSH TO STAGING
   git push origin staging

10. CHECK VERCEL FOR PREVIEW URL
    https://vercel.com/dashboard

═══════════════════════════════════════
ONE-LINE VERSION:
git add . && git commit -m "Message" && git push origin staging
═══════════════════════════════════════
```

---

## Glossary

| Term | Simple Definition |
|------|-------------------|
| **Git** | Software that tracks changes to files (like Track Changes in Word) |
| **GitHub** | Website that stores your code in the cloud |
| **Repository (Repo)** | A project folder tracked by Git |
| **Clone** | Download a copy of a repo to your computer |
| **Commit** | Save a snapshot of your changes (with a note about what you did) |
| **Push** | Upload your commits to GitHub |
| **Pull** | Download the latest changes from GitHub |
| **Branch** | A separate version of your code (like a parallel universe) |
| **Main** | The primary branch—usually the live/production code |
| **Staging** | A branch for testing before going live |
| **Merge** | Combine changes from one branch into another |
| **Vercel** | Service that hosts your website on the internet |
| **Deploy** | Make your code live on the internet |
| **Production** | The live website that users see |
| **Preview** | A test version of your site |
| **Terminal** | Text-based interface to control your computer |
| **SSH Key** | A secure password-less way to connect to GitHub |

---

## Emergency Contacts

When you're stuck and this guide doesn't help:

1. **Screenshot the error message**
2. **Copy the command you ran**
3. **Note what you expected vs. what happened**
4. **Contact:** [Add your team's support contact here]

---

*Last updated: January 2026*
*Version: 2.0*
*Created for Performance Golf team*
