# Core Agent Operations

Make Claude Code work autonomously, verify its work, and never crash unexpectedly.

## What This Does

Installs operational protocols that make Claude Code:

1. **Work autonomously** - Completes tasks without asking "should I proceed?" every 30 seconds
2. **Prove it read your files** - Produces consumption receipts showing it actually read what you gave it
3. **Track requirements** - Creates checklists so nothing gets missed
4. **Never crash unexpectedly** - Monitors context window and hands off before hitting limits
5. **Recover from interruptions** - Logs progress to files so work survives session timeouts

## Installation (2 minutes)

```bash
cd ~/Downloads/core-agent-operations-package
bash install.sh
```

That's it. The rules are now active for all Claude Code sessions.

## What Changes

The installer adds a `CLAUDE.md` file to your `~/.claude/` directory. Claude Code reads this file automatically at the start of every session.

**Before:** Claude asks for permission constantly, loses progress on timeout, sometimes skims documents.

**After:** Claude works autonomously, proves it read your materials, tracks all requirements, and hands off gracefully before context limits.

## Key Behaviors You'll Notice

### Consumption Receipts
When you give Claude a document, it will produce a receipt proving it read the whole thing:

```
## CONSUMPTION RECEIPT: project-requirements.md
Total length: 3 pages, 12 sections
Sections identified:
1. Overview - Project goals and timeline
2. Technical Requirements - Stack and architecture
3. User Stories - 8 stories with acceptance criteria
...
Key requirements extracted:
- Must use PostgreSQL
- Authentication via OAuth
- Mobile responsive
...
Confirmation: Full document consumed.
```

### Requirements Checklists
Before starting work, Claude creates a traceable checklist:

```
| # | Requirement | Source | Status |
|---|-------------|--------|--------|
| 1 | PostgreSQL database | Line 23 | Complete |
| 2 | OAuth authentication | Line 45 | In Progress |
| 3 | Mobile responsive | Line 67 | Pending |
```

### Context Window Handoffs
Instead of crashing mid-task, Claude creates a handoff document:

```
## HANDOFF DOCUMENT
Session objective: Build user authentication system
Completed: Database schema, user model, login endpoint
Current state: Working on password reset flow
Next steps: Complete reset endpoint, add email sending
Files modified: models/user.py, routes/auth.py
```

### Autonomous Execution
Claude will:
- Make reasonable implementation decisions without asking
- Choose between valid approaches without confirmation
- Continue through all steps without check-ins
- Only interrupt for genuinely critical issues

## Customizing

Edit `~/.claude/CLAUDE.md` to adjust the rules. Common changes:

- Add project-specific exceptions
- Modify the handoff threshold (default: 70-80% context)
- Add standing authorizations for your workflow

## Uninstalling

```bash
rm ~/.claude/CLAUDE.md
```

Or to disable temporarily, rename it:
```bash
mv ~/.claude/CLAUDE.md ~/.claude/CLAUDE.md.disabled
```

## Troubleshooting

### Claude isn't following the rules
Make sure the file exists:
```bash
cat ~/.claude/CLAUDE.md
```

### I want different rules for different projects
Create a `CLAUDE.md` in each project directory. Project-level instructions take precedence.

### Claude is too autonomous
Edit `~/.claude/CLAUDE.md` and add specific items to the "Interrupt ONLY For" section.
