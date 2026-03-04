# ZenithPro Copy Arsenal v1.0
## Installation Guide

---

## What You're Installing

The ZenithPro Copy Arsenal is a complete AI-powered copywriting system that gives you:

- **4 World-Class Copywriting Masters** - Clayton Makepeace, John Carlton, David Deutsch, and Evaldo Albuquerque, each with their complete methodology encoded into AI skills
- **51 Specialized Skills** - From headlines to closes, emails to VSLs, each element of copywriting has dedicated tools
- **9 Intelligent Agents** - Critics that evaluate your copy, judges that pick winners, and systems that evolve and improve
- **The Arena** - A revolutionary competitive system where copywriters compete on YOUR projects, with the skills improving after every match

**This represents:**
- 882+ copywriting frameworks extracted and encoded
- Hundreds of hours of methodology analysis
- A system that gets BETTER the more you use it

---

## Prerequisites

Before installing, ensure you have:

1. **Claude Code CLI installed and working**
   - You should be able to open a terminal and type `claude` to start a session
   - If not installed, visit: https://claude.ai/code

2. **A working terminal**
   - Mac: Terminal app (built-in)
   - Windows: PowerShell (built-in)

---

## Installation Instructions

### For Mac Users

**Option A: Run from Claude Code CLI (Recommended)**

1. Download and unzip `ZenithPro-Copy-Arsenal-v1.0.zip`

2. Open Claude Code CLI in your terminal

3. Navigate to the unzipped folder:
   ```
   cd /path/to/ZenithPro-Copy-Arsenal-v1.0
   ```

4. Ask Claude to run the installer:
   ```
   Run the install.sh script in this folder
   ```

5. Follow the prompts to enter your name and email (for license registration)

6. Installation complete!

**Option B: Run directly from Terminal**

1. Download and unzip `ZenithPro-Copy-Arsenal-v1.0.zip`

2. Open Terminal

3. Navigate to the unzipped folder:
   ```
   cd /path/to/ZenithPro-Copy-Arsenal-v1.0
   ```

4. Run the installer:
   ```
   ./install.sh
   ```

5. Follow the prompts

---

### For Windows Users

**Option A: Run from Claude Code CLI (Recommended)**

1. Download and unzip `ZenithPro-Copy-Arsenal-v1.0.zip`

2. Open Claude Code CLI in PowerShell

3. Navigate to the unzipped folder:
   ```
   cd C:\path\to\ZenithPro-Copy-Arsenal-v1.0
   ```

4. Ask Claude to run the installer:
   ```
   Run the install.ps1 script in this folder
   ```

5. Follow the prompts to enter your name and email

6. Installation complete!

**Option B: Run directly from PowerShell**

1. Download and unzip `ZenithPro-Copy-Arsenal-v1.0.zip`

2. Open PowerShell as Administrator

3. Navigate to the unzipped folder:
   ```
   cd C:\path\to\ZenithPro-Copy-Arsenal-v1.0
   ```

4. Enable script execution (if needed):
   ```
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

5. Run the installer:
   ```
   .\install.ps1
   ```

6. Follow the prompts

---

## What Gets Installed

The installer creates the following structure:

```
~/.claude/
├── skills/                    # 51 copywriting skills
│   ├── clayton/              # Master orchestrator
│   ├── clayton-headlines/    # Headlines skill
│   ├── clayton-leads/        # Leads skill
│   ├── ... (12 more Clayton skills)
│   ├── carlton/              # Master orchestrator
│   ├── ... (15 more Carlton skills)
│   ├── deutsch/              # Master orchestrator
│   ├── ... (9 more Deutsch skills)
│   ├── evaldo/               # Master orchestrator
│   ├── ... (8 more Evaldo skills)
│   └── copywriting-arena/    # Arena system
│
├── agents/                    # 9 intelligent agents
│   ├── clayton-critic/
│   ├── carlton-critic/
│   ├── deutsch-critic/
│   ├── evaldo-critic/
│   ├── marketplace-judge/
│   ├── arena-synthesist/
│   ├── synthesis-critic/
│   ├── skill-evolver/
│   └── copywriter-spawner/
│
├── arena/                     # Arena system files
│   ├── ledger.md             # Match history
│   ├── config.md             # Your settings
│   ├── win-records/          # Per-copywriter records
│   ├── synthesis-registry/   # Combination tracking
│   └── sample-briefs/        # Test briefs
│
└── docs/
    └── copy-arsenal/          # All documentation
```

---

## Verifying Installation

After installation, test that everything works:

1. Open Claude Code CLI

2. Try a simple command:
   ```
   /clayton-headlines
   ```

3. You should see Claude load the Clayton Headlines skill

4. Try the Arena:
   ```
   /arena test 1
   ```

5. The Arena should initialize and ask for a project brief

---

## Troubleshooting

### "Command not found" when running install script

**Mac:** Make sure the script is executable:
```
chmod +x install.sh
```

**Windows:** Make sure you've enabled script execution (see installation steps above)

### Skills not appearing after installation

1. Restart Claude Code CLI completely (close terminal, reopen)
2. Check that files exist in `~/.claude/skills/`
3. Try running `/skill list` to see available skills

### "Permission denied" errors

**Mac:** You may need to run with sudo:
```
sudo ./install.sh
```

**Windows:** Run PowerShell as Administrator

### Arena not creating project folders

Check your Arena config file at `~/.claude/arena/config.md` and verify the output path is correct for your system.

---

## Updating

When a new version of the Copy Arsenal is released:

1. Download the new version
2. Run the installer again
3. It will update existing files while preserving your Arena history and win records

---

## Uninstalling

To remove the Copy Arsenal:

1. Delete the skill folders from `~/.claude/skills/`
2. Delete the agent folders from `~/.claude/agents/`
3. Delete the arena folder from `~/.claude/arena/`
4. Delete the docs folder from `~/.claude/docs/copy-arsenal/`

---

## License

This software is exclusively licensed to ZenithPro members.

**You may NOT:**
- Share this with anyone outside ZenithPro
- Redistribute in any form
- Remove the license tracking

Your installation is registered and tracked.

---

## Next Steps

After installation:

1. Read `01-QUICK-START.md` for your first 5 minutes
2. Read `02-THE-FOUR-MASTERS.md` to understand each copywriter
3. Read `05-THE-ARENA-COMPLETE-GUIDE.md` to understand the evolution system

---

*ZenithPro Copy Arsenal v1.0*
*Created by Rich Schefren for ZenithPro Members*
