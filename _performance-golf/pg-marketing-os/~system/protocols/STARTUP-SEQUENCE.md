# Startup Sequence Protocol

**Version:** 1.0
**Created:** 2026-03-17
**Purpose:** Standardized 5-step session initialization for every marketing-OS session
**Authority:** Referenced by SYSTEM-CORE.md — mandatory before any skill execution

---

## WHEN THIS RUNS

Every session. No exceptions. Before any skill execution, before any creative work, before any protocol loading. The startup sequence is Step 0.

If a session was interrupted (crash, timeout, context limit), the NEXT session still runs the full startup sequence. The sequence is designed to recover state from any interruption.

---

## THE 5 STEPS

### Step 1: Confirm Working Directory

```
pwd
```

Verify you are in the vault root: `/Users/anthonyflores/Vaults/Anthony-Main-Vault/`

If not, navigate there. All paths in marketing-OS are relative to this root.

**HALT if:** Working directory cannot be confirmed.

---

### Step 2: Read Project Progress

```
Read: marketing-os/~outputs/[project-code]/project-progress.json
```

Extract:
- **Current session number** — increment by 1 for this session
- **Last active skill** — where work stopped
- **Tier designation** — Full / Standard / Quick
- **Completed skills** — what's done
- **Pending gates** — any gates awaiting human approval
- **Audience agent status** — constructed / not_constructed
- **Context reservoir status** — created / not_created
- **Active engines** — which branch engines are in progress

**If file doesn't exist:** This is either a new project (run Initializer Protocol) or a legacy project that predates the progress system. Ask the human which.

**If file exists but is corrupted:** Reconstruct from output files + git log. Report reconstruction to human.

---

### Step 3: Read Recent Git History

```
git log --oneline -20
```

Understand:
- What was committed in the last session
- Whether there are uncommitted changes (run `git status`)
- Whether the last session ended cleanly (look for session-end commit message pattern)

**If uncommitted changes exist:** Report them to the human. Do NOT auto-commit. Ask: "Uncommitted changes found from a previous session. Commit these before proceeding?"

---

### Step 4: Validate Output Packages

For each skill marked `completed` in project-progress.json:
1. Verify the output file exists at `output_path`
2. Verify file is non-empty
3. For handoff-critical outputs (per `~system/pipeline-handoff-registry.md`): verify required fields exist

**Do NOT re-validate every file every session.** Only validate:
- The LAST completed skill's output (most likely to be incomplete from interruption)
- Any skill whose output is consumed by the NEXT skill to execute

Report validation results. If a required output is missing or invalid:
- Mark the skill as `failed` in progress file
- Report to human: "Skill [X] output is missing/invalid. Re-execution required before proceeding."

---

### Step 5: Identify Next Skill and Load Layer 0

Using project-progress.json:
1. Find the first skill in pipeline order with status `pending` whose dependencies are ALL `completed`
2. Check if a human gate blocks this skill — if so, present gate materials and wait
3. Load the skill's `SKILL.md`
4. Execute Layer 0 (Foundation) — load upstream packages, protocols per loading profile

Present to human:
```
SESSION [N] STARTUP COMPLETE
Project: [project-code] ([project-name])
Tier: [Full/Standard/Quick]
Last completed: Skill [XX] ([name])
Next skill: Skill [YY] ([name])
Dependencies: [list] — all met
Pending gates: [none / list]
Ready to execute.
```

---

## STARTUP SEQUENCE OUTPUT

After completing all 5 steps, update project-progress.json:
```json
{
  "session_log": [
    ...existing,
    {
      "session": N,
      "started": "ISO 8601 timestamp",
      "startup_status": "clean",
      "uncommitted_changes": false,
      "validation_issues": [],
      "next_skill": "XX",
      "ended": null,
      "skills_completed": []
    }
  ]
}
```

---

## FAILURE MODES

| Condition | Action |
|-----------|--------|
| No project-progress.json | Ask human: new project or legacy? |
| Corrupted progress file | Reconstruct from outputs + git, report |
| Uncommitted changes | Report to human, ask before committing |
| Missing output file | Mark skill as failed, report |
| Gate blocking next skill | Present gate materials, wait for approval |
| All skills completed | Report: "All pipeline skills complete. Run editorial or branch engines?" |

---

## CRITICAL RULES

1. **NEVER skip the startup sequence.** Even if the human says "just continue where we left off" — run the sequence. It takes <30 seconds and prevents hours of wasted work from stale state.
2. **NEVER auto-commit during startup.** Uncommitted changes might be intentional work-in-progress.
3. **NEVER load a skill before completing all 5 steps.** Step 5 depends on Steps 2-4.
4. **ALWAYS increment the session counter.** Even if the previous session was very short.
5. **Report, don't assume.** If something is ambiguous, tell the human what you found and ask.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-17 | Initial creation as part of Harness Architecture Phase 2. |
