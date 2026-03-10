# Marketing-OS Automated Validation Hooks

**Version:** 1.0
**Created:** 2026-03-07
**Purpose:** Automated validation of marketing-os outputs via Claude Code hooks

---

## Manual Setup Required

These hooks are shipped with marketing-os but must be registered in your **root-level** `.claude/settings.json` to auto-fire. The hooks live at `pg-marketing-os/.claude/hooks/` — Claude Code only loads hooks from the project root's `.claude/` directory.

**To activate:**

1. Copy or symlink the hooks directory to your project root:
   ```bash
   # Option A: Symlink (recommended — stays in sync)
   ln -s marketing-os/.claude/hooks .claude/hooks

   # Option B: Copy
   cp -r marketing-os/.claude/hooks .claude/hooks
   ```

2. Ensure your root `.claude/settings.json` registers the hooks:
   ```json
   {
     "hooks": {
       "PostToolUse": [
         {
           "matcher": "Write|Edit",
           "command": ".claude/hooks/dispatch-validator.sh"
         }
       ],
       "Stop": [
         {
           "command": ".claude/hooks/dispatch-validator.sh --final-check"
         }
       ]
     }
   }
   ```

**Without this setup:** The hooks exist as standalone scripts you can run manually (see Testing Hooks Manually below), but they won't auto-fire on file writes.

---

## How It Works

Claude Code hooks fire validators **automatically** when the agent writes files. Zero human action required.

```
Agent writes a file (Write/Edit tool)
    ↓
PostToolUse hook fires automatically
    ↓
dispatch-validator.sh reads file path from JSON stdin
    ↓
Routes to appropriate Python validator based on file path patterns
    ↓
Validator returns structured JSON feedback
    ↓
Agent receives validation result in context and can self-correct
```

---

## Hook Events

| Event | Matcher | What Fires | Can Block? |
|-------|---------|-----------|-----------|
| `PostToolUse` | `Write\|Edit` | `dispatch-validator.sh` — routes to validator based on file path | No (file already written), but result injected into agent context |
| `Stop` | — | `dispatch-validator.sh --final-check` — comprehensive validation | **Yes** — exit 2 blocks agent if critical failures exist |

> **Known limitation:** The hooks only fire on `Write|Edit` events. Read events are not tracked, so Detector 1 (Synthesis Without Reading) and Detector 7 (Stale Reads) rely solely on write-side tracking. To enable full read tracking, a `PreToolUse` hook matching `Read` would need to call `reminder_detector.py --record-read <file_path>`. This is planned for a future phase.

---

## Validators

| Validator | Triggers On | What It Checks |
|-----------|------------|----------------|
| `gate_validator.py` | Checkpoint YAML files | Forbidden statuses (CONDITIONAL_PASS, PARTIAL_PASS, etc.), missing anti_degradation section. Also emits event-driven reminders for gate drift (Detector 5). |
| `output_validator.py` | Output files in outputs/ | Minimum file sizes, naming conventions, completeness (3 outputs per skill) |
| `checkpoint_validator.py` | *_COMPLETE.yaml files | Required fields, ISO 8601 timestamps, Arena fields, chain ordering |
| `schema_validator.py` | *-package.json/yaml files | Required fields per ~system/pipeline-handoff-registry.md, arena_selection_verified |
| `proportionality_check.py` | Package files with scores | Threshold clustering detection (>50% at minimums = gate-passing optimization) |
| `token_estimator.py` | All file writes | Cumulative context tracking, zone classification (GREEN/YELLOW/ORANGE/RED/CRITICAL). Also emits event-driven reminders on zone transitions (Detector 6). |
| `reminder_detector.py` | All file writes | Event-driven degradation detection: abbreviation patterns (Detector 4), rushing/undersized outputs (Detector 2), stale reads (Detector 7), synthesis from memory (Detector 1). Supports `--record-read <path>` flag for Read event tracking (see Known Limitation above). See `~system/protocols/EVENT-DRIVEN-REMINDERS.md`. |

---

## Routing Logic

```
File path contains "checkpoints/" or ends with "_COMPLETE.yaml"
    → checkpoint_validator.py + gate_validator.py

File path ends with "-package.json" or "-package.yaml"
    → schema_validator.py + proportionality_check.py

File path is in "outputs/" and ends with .md/.json/.yaml
    → output_validator.py

All writes:
    → token_estimator.py (tracks cumulative file sizes)
    → reminder_detector.py (event-driven degradation reminders)
```

---

## What the Agent Sees

When a validator catches an issue, the agent receives structured feedback:

```
VALIDATION WARNING: LAYER_1_COMPLETE.yaml contains forbidden status
'CONDITIONAL_PASS'. Valid statuses: COMPLETE, PASS, approved. Fix
required before proceeding to Layer 2.
```

The agent can then self-correct in its next action.

---

## Testing Hooks Manually

Each validator can be run standalone:

```bash
# Test gate validator
python3 .claude/hooks/validators/gate_validator.py path/to/checkpoint.yaml

# Test output validator on a project directory
python3 .claude/hooks/validators/output_validator.py outputs/project-name/

# Test schema validator
python3 .claude/hooks/validators/schema_validator.py path/to/mechanism-package.json

# Test proportionality check
python3 .claude/hooks/validators/proportionality_check.py path/to/scored-package.json

# Test token estimator
python3 .claude/hooks/validators/token_estimator.py path/to/any-file.md

# Token estimator project summary
python3 .claude/hooks/validators/token_estimator.py --summary outputs/project-name/
```

---

## Temporarily Disabling Hooks

To disable all hooks, rename or move the settings file:

```bash
mv .claude/settings.json .claude/settings.json.disabled
```

To re-enable:

```bash
mv .claude/settings.json.disabled .claude/settings.json
```

To disable a single validator, comment out or remove its routing block in `dispatch-validator.sh`.

---

## File Structure

```
.claude/
├── settings.json                  ← Hook configuration (PostToolUse + Stop)
└── hooks/
    ├── dispatch-validator.sh       ← Shell router
    ├── .token-estimator-state.json ← Cumulative tracking state (auto-generated)
    ├── .reminder-state.json        ← Reminder detector state (auto-generated)
    ├── README.md                   ← This file
    └── validators/
        ├── __init__.py
        ├── gate_validator.py
        ├── output_validator.py
        ├── checkpoint_validator.py
        ├── schema_validator.py
        ├── proportionality_check.py
        ├── token_estimator.py
        └── reminder_detector.py
```
