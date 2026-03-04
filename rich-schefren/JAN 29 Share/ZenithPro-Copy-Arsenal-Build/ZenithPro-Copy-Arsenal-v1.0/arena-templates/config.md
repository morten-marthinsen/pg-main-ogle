# Copywriting Arena - Configuration

**Created:** [Auto-populated on install]
**Owner:** [Auto-populated on install]

---

## Output Location

**Default:** `~/Documents/Obsidian/Active-Brain/00 Projects/`

**To change:** Edit the path below:

```
ARENA_OUTPUT_PATH=~/Documents/Obsidian/Active-Brain/00 Projects/
```

Arena will create project folders at: `[ARENA_OUTPUT_PATH]/[project-name]-arena-[date]/`

---

## Default Settings

| Setting | Value | Description |
|---------|-------|-------------|
| Default Rounds | 3 | Number of rounds if not specified |
| Auto-Save Frequency | After each phase | When to save progress |
| Parallel Execution | Enabled | Run drafts/critiques in parallel |
| Auto-Evolution | Enabled | Automatically update skills after matches |
| Evolution Approval | Major changes only | What requires user approval |

---

## Copywriter Preferences

*Set preferences for which copywriters compete by default.*

| Copywriter | Include by Default |
|------------|-------------------|
| Clayton | Yes |
| Carlton | Yes |
| Deutsch | Yes |
| Evaldo | Yes |
| Synthesis | Yes |

To exclude a copywriter from a specific run, use:
`/arena [project] [rounds] --exclude=[copywriter]`

---

## Notification Settings

| Event | Notify |
|-------|--------|
| Round Complete | Yes |
| Winner Declared | Yes |
| Skill Update Proposed | Yes |
| Synthesis Spawning Triggered | Yes |

---

*Edit this file to customize your Arena experience.*
