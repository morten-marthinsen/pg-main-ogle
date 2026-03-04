# Troubleshooting
## Common Issues and Solutions

---

## Installation Issues

### "Permission denied" during installation

**Mac:**
```bash
chmod +x install.sh
./install.sh
```

**Windows (PowerShell):**
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
.\install.ps1
```

### "Directory already exists" warning

This is normal if you're reinstalling. The installer will:
- Backup existing skills to `~/.claude/skills-backup-[date]/`
- Backup existing agents to `~/.claude/agents-backup-[date]/`
- Install fresh copies

### Installer completes but skills don't work

1. **Restart Claude Code CLI**
   ```
   exit
   ```
   Then relaunch Claude Code.

2. **Verify installation:**
   ```bash
   ls ~/.claude/skills/
   ls ~/.claude/agents/
   ```
   You should see all 51 skill folders and 9 agent folders.

3. **Check skill format:**
   Each skill folder should contain a `.md` file. If empty, re-run installer.

---

## Skill Not Found Errors

### "Skill not found: /clayton"

1. **Check the skill exists:**
   ```bash
   ls ~/.claude/skills/clayton/
   ```

2. **Verify the skill file:**
   ```bash
   cat ~/.claude/skills/clayton/clayton.md | head -20
   ```

3. **Re-run installer if missing**

### "Unknown command" when using /skill-name

Skills require Claude Code CLI. They won't work in:
- Standard Claude.ai chat
- ChatGPT
- Other AI interfaces

**Solution:** Use Claude Code CLI for all skill commands.

---

## Arena Issues

### "Arena folder not found"

The arena folder should be at `~/.claude/arena/`

**To fix:**
```bash
mkdir -p ~/.claude/arena/win-records
```

Then copy templates from your package:
```bash
cp -r /path/to/ZenithPro-Copy-Arsenal-v1.0/arena-templates/* ~/.claude/arena/
```

### Arena runs but doesn't save results

Check the output path in `~/.claude/arena/config.md`:
```markdown
## Output Location
ARENA_OUTPUT_PATH=~/Documents/Arena-Output/
```

Make sure this directory exists:
```bash
mkdir -p ~/Documents/Arena-Output/
```

### Critic agents not found

Verify agents are installed:
```bash
ls ~/.claude/agents/
```

Should see:
- clayton-critic/
- carlton-critic/
- deutsch-critic/
- evaldo-critic/
- synthesis-critic/
- marketplace-judge/
- arena-synthesist/
- skill-evolver/
- copywriter-spawner/

---

## Performance Issues

### Skills running slowly

Large skill files (1000+ lines) can take a moment to load. This is normal.

**Tips:**
- Use element skills for quick tasks (e.g., `/clayton-headlines` instead of `/clayton`)
- Full orchestrators like `/clayton` load all 514 frameworks

### Context limit warnings

If Claude Code warns about context limits:

1. **Break into smaller requests**
   Instead of: "Write a full sales page"
   Do: "Write the headline" → "Write the lead" → "Write the body"

2. **Use element skills**
   Element skills have smaller context footprints.

---

## Output Quality Issues

### Copy doesn't match the methodology

**Solution:** Be more specific in your brief.

Bad:
```
Write a headline for my product.
```

Good:
```
/clayton-headlines

Product: [Specific details]
Audience: [Who they are, what they believe]
Key emotion: [What should they feel]
Constraints: [Length, tone, etc.]
```

### Copy feels generic

**Solution:** Add more context from your ZenithPro work.

Include:
- Desire hierarchy (L1-L4)
- Psychographic insights
- Failure patterns
- Core Concept

The copywriters perform dramatically better with strategic context.

### Arena keeps choosing the same winner

Each copywriter has different strengths. If one keeps winning:

1. **Check if the brief favors a style**
   - VSL briefs favor Evaldo
   - Emotional briefs favor Clayton
   - Sophisticated briefs favor Deutsch
   - Attention-grabbing briefs favor Carlton

2. **The system is learning correctly**
   Over time, patterns emerge. This is by design.

---

## File/Path Issues

### Skills installed in wrong location

Skills must be in `~/.claude/skills/` (note the dot in `.claude`)

**Common mistake:** Installing to `~/claude/skills/` (no dot)

**Fix:**
```bash
# Check current location
ls ~/.claude/skills/

# If skills are in wrong place
mv ~/claude/skills/* ~/.claude/skills/
```

### Windows path issues

Windows users: The installer creates:
```
C:\Users\[YourName]\.claude\skills\
C:\Users\[YourName]\.claude\agents\
```

If Claude Code can't find skills, verify this path exists.

---

## Getting Help

### 1. Check the documentation first
All 15 guides in the `/docs/` folder cover common questions.

### 2. Re-run the installer
Many issues resolve with a fresh installation.

### 3. Verify your Claude Code version
Make sure you're running a recent version of Claude Code CLI.

### 4. Contact support
For issues not covered here, reach out through the ZenithPro community.

---

## Quick Diagnostic Checklist

Run through this if something's not working:

- [ ] Claude Code CLI is running (not web chat)
- [ ] Skills exist in `~/.claude/skills/`
- [ ] Agents exist in `~/.claude/agents/`
- [ ] Arena folder exists in `~/.claude/arena/`
- [ ] Skill files contain content (not empty)
- [ ] Using correct skill names (case-sensitive)
- [ ] Providing adequate brief information

---

*Most issues resolve with a reinstall. When in doubt, run the installer again.*
