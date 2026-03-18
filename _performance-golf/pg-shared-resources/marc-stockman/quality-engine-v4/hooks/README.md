# Hooks — Quality Engine v4
**Quality Engine v4** | Component: Hooks
**Purpose:** Automated validation system that catches quality issues as the agent writes files

---

## What This Is

A portable hook system that fires validators automatically when an AI agent writes files. Validators return structured JSON feedback that the agent sees in context, enabling self-correction without human intervention.

---

## Architecture

```
AI Agent writes a file
    |
    v
dispatch-validator.sh (PostToolUse hook)
    |
    +-- Routes to validator(s) based on file path patterns
    |
    v
validators/
    +-- gate_validator.py          -- Forbidden checkpoint statuses
    +-- schema_validator.py        -- Required fields in package files
    +-- token_estimator.py         -- Cumulative context load tracking
    +-- fact_change_validator.py   -- Stale upstream values
    +-- forbidden_status_validator.py -- Invented pass/fail variants
    |
    v
JSON feedback injected into agent context
```

Additionally, `reset-token-state.sh` runs at session start to clear the token estimator's accumulated state from previous sessions.

---

## Setup for Claude Code

### 1. Copy hooks into your project

```bash
cp -r hooks/ your-project/.hooks/
```

### 2. Configure the project root

Set the `QE_PROJECT_ROOT` environment variable, or the hooks will auto-detect based on the `.hooks/` directory location:

```bash
export QE_PROJECT_ROOT="/path/to/your/project"
```

### 3. Register hooks in your Claude Code settings

Add to `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": ".hooks/dispatch-validator.sh",
        "event": "PostToolUse",
        "tools": ["Write", "Edit"]
      }
    ],
    "PreToolUse": [
      {
        "type": "command",
        "command": ".hooks/reset-token-state.sh",
        "event": "PreToolUse",
        "tools": ["Read"],
        "once": true
      }
    ],
    "Stop": [
      {
        "type": "command",
        "command": ".hooks/dispatch-validator.sh --final-check",
        "event": "Stop"
      }
    ]
  }
}
```

### 4. Configure path scoping (IMPORTANT)

By default, the dispatcher validates ALL files the agent writes. To scope validation to a specific directory (recommended), set:

```bash
export QE_SCOPE_DIR="/path/to/your/system"
```

Only files inside `QE_SCOPE_DIR` will be validated. Files outside are silently skipped. This prevents false positives when the agent writes files in other parts of the repository.

---

## Setup for Gemini CLI

Gemini CLI uses a similar hook system. Register the dispatch validator as a post-write hook in your Gemini configuration. The validators are pure Python and work with any tool that can invoke shell scripts and read JSON from stdout.

---

## Setup for Other AI Tools

The hook system is tool-agnostic. Requirements:

1. **A way to run a shell script after file writes** (PostToolUse equivalent)
2. **A way to pipe JSON from stdin** (the hook input format)
3. **A way to inject stdout back into agent context** (the feedback loop)
4. **Python 3.6+** for the validators (no external dependencies)

If your tool supports post-write hooks, point them at `dispatch-validator.sh`. If not, you can call validators directly:

```bash
python3 validators/gate_validator.py /path/to/checkpoint.yaml
python3 validators/schema_validator.py /path/to/package.json
python3 validators/token_estimator.py /path/to/any-file.md
python3 validators/fact_change_validator.py /path/to/output-file.md
python3 validators/forbidden_status_validator.py /path/to/any-file.yaml
```

---

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `QE_PROJECT_ROOT` | Root directory of your project | Auto-detected from `.hooks/` location |
| `QE_SCOPE_DIR` | Only validate files inside this directory | `QE_PROJECT_ROOT` |
| `QE_OUTPUTS_DIR` | Where project outputs live | `QE_PROJECT_ROOT/outputs` |
| `QE_GREEN_ZONE` | Upper token limit for GREEN zone | `150000` |
| `QE_YELLOW_ZONE` | Upper token limit for YELLOW zone | `200000` |
| `QE_ORANGE_ZONE` | Upper token limit for ORANGE zone | `500000` |
| `QE_RED_ZONE` | Upper token limit for RED zone | `750000` |

---

## Validators

### gate_validator.py

Scans checkpoint YAML files for forbidden gate statuses. Gates are PASS or FAIL only -- no conditional pass, no partial pass, no invented statuses.

**Fires on:** `*checkpoints/*`, `*_COMPLETE.yaml`

### schema_validator.py

Validates handoff package files against schema contracts. Checks required field presence, non-emptiness, arena verification flags, and minimum file sizes.

**Fires on:** `*-package.json`, `*-package.yaml`
**Configurable:** Edit `SCHEMA_CONTRACTS` dict to define your own package schemas.

### token_estimator.py

Tracks cumulative file writes as a proxy for context growth. Classifies into cost/quality zones (GREEN through CRITICAL). Includes the session reset fix -- state resets cleanly at session start.

**Fires on:** All file writes (`.md`, `.json`, `.yaml`, `.yml`, `.txt`, `.py`)
**Configurable:** Zone boundaries via environment variables.

### fact_change_validator.py

Detects stale upstream values in output files. Reads `fact-changes.yaml` from the project output directory and checks written files for old values that should have been propagated.

**Fires on:** Output files (`.md`, `.json`, `.yaml`)

### forbidden_status_validator.py

Catches invented gate statuses beyond the gate_validator's checkpoint-specific checks. Scans ANY file for status-like patterns that use forbidden values. This is a broader net than gate_validator, which only fires on checkpoint files.

**Fires on:** All YAML and markdown files

---

## The Stop Hook

When the agent tries to finish, `dispatch-validator.sh --final-check` runs a comprehensive validation across the most recent project outputs. If critical failures are found (missing mandatory outputs, forbidden gate statuses), it exits with code 2, which **blocks the agent from completing**. The agent must fix the issues first.

---

## Adding Custom Validators

1. Create a new Python file in `validators/`
2. Accept a file path as `sys.argv[1]`
3. Print JSON to stdout if issues found, or `{}` if clean
4. Add a routing rule in `dispatch-validator.sh` (see the numbered sections)

JSON output format:

```json
{
  "validator": "your_validator_name",
  "file": "/path/to/file",
  "severity": "WARNING",
  "issues": ["Issue 1", "Issue 2"],
  "message": "Summary message for the agent"
}
```

---

## Troubleshooting

### Validators not firing

- Check that `.hooks/dispatch-validator.sh` is executable: `chmod +x .hooks/dispatch-validator.sh`
- Check that Python 3 is available: `python3 --version`
- Check hook registration in settings

### False positives on files outside your system

- Set `QE_SCOPE_DIR` to limit validation scope
- The dispatcher skips files outside the scope directory

### Token estimator shows CRITICAL zone at session start

- Run `reset-token-state.sh` at session start to clear accumulated state
- This should happen automatically via the PreToolUse hook

### Validators return empty but issues exist

- Run validators directly to see error output: `python3 validators/gate_validator.py file.yaml 2>&1`
- Validators suppress stderr by default in hook mode
