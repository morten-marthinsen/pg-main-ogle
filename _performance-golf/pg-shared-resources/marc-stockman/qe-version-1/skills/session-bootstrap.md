---
name: session-bootstrap
version: 1.1
updated: 2026-03-06
author: Marc Stockman
description: Session initialization protocol (initialize command) — reads operational files, checks for interrupted audits, confirms readiness
scope: Session start protocol — operational file loading, status presentation, infrastructure creation
trigger: Marc says 'initialize' or starts a new multi-step project
---

# Session Bootstrap Protocol (Initialize Command)

**Version:** 1.1 | March 6, 2026
**Trigger:** Marc says "initialize" or pastes the bootstrap prompt, or starts a new multi-step project

---

## Action

Execute the following session start protocol. Do not skip any step. Confirm completion of each step before proceeding.

---

### Step 1: Read All Operational Files

Check the workspace for these files and read any that exist. Read in this order:

1. `persistent-rules.md` — All directives and rules (READ FIRST — canonical source of truth)
2. `Skill_0_Prompt_Optimization.md` — Prompt optimization engine (READ SECOND)
3. `self-audit-command.md` — Self audit protocol definition
4. `check-command.md` — CHECK protocol definition
5. `convergence-gate.md` — Convergence gate loop definition
6. `reasoning-log.md` — Pre/post-action reasoning entries
7. `staleness-map.md` — Artifact dependency tracking
8. `session-learning-log.md` — Lessons learned and rule promotions
9. `commitment-registry.md` — Promise tracking
10. `PROJECT.md` — Project charter (if one exists for current project)
11. Any `HANDOFF*.md` — Thread transition documents

If any of these files don't exist, note which ones are missing but proceed. They will be created as needed during work.

---

### Step 2: Search Memory for Context

Run memory searches for:
- Active projects and standing rules
- Marc's current priorities and open items
- Any recent session context that carries forward

This ensures continuity across sessions. Marc's memory contains standing preferences, project history, and operational context that may not be in workspace files.

---

### Step 3: Check for Interrupted Audits

Check for `/workspace/audit-checkpoint.md`:
- If it exists and is less than 2 hours old: there is an interrupted audit to resume. Note the protocol (SELF AUDIT or CHECK), the step it reached, and the deliverable being audited. Present this to Marc and ask whether to resume or start fresh.
- If it exists and is more than 2 hours old: note that a stale checkpoint exists and will be discarded.
- If it doesn't exist: no interrupted audits.

---

### Step 4: Check Reasoning Log Currency

If `reasoning-log.md` exists:
- Is it current? (updated within last 2 hours or within last 3 major actions)
- If stale, note this in the session status

If it doesn't exist: note that it will be created when first needed.

---

### Step 5: Create Missing Operational Infrastructure

If any of these files don't exist, create them with minimal scaffolding:

**reasoning-log.md** (if missing):
```markdown
# Reasoning Log
| # | Task | A: Stakeholders | B: Domain | C: Tempo | D: Pre-Mortem | E: Rollback | F: Plan | G: Outcome | H: Delta | I: Lesson | J: Promote? |
|---|------|-----------------|-----------|----------|---------------|-------------|---------|------------|----------|-----------|-------------|
```

**staleness-map.md** (if missing):
```markdown
# Staleness Map
| Artifact | Last Updated | Depends On | Status |
|----------|-------------|------------|--------|
```

**session-learning-log.md** (if missing):
```markdown
# Session Learning Log
| # | Date | What Happened | Why | Fix | Preventive Rule | Promoted? |
|---|------|--------------|-----|-----|----------------|-----------|
```

**commitment-registry.md** (if missing):
```markdown
# Commitment Registry
| # | Commitment | Status | Artifact | Notes |
|---|-----------|--------|----------|-------|
```

Share each created file via share_file (R-11).

---

### Step 6: Present Session Status

Present a structured status to Marc:

```
## Session Status

**Rules loaded:** [count] (expected: 33 directives + rules, 12 Accelerator)
**Skill 0:** [loaded / not found]
**Objective Intake:** [loaded / not found]
**Operational files:** [which exist, which are missing]
**Interrupted audits:** [none / details]
**Open items from prior work:** [from commitment registry, reasoning log, handoff docs]
**Memory context:** [key items from memory search]

Ready for your prompt.
```

---

### Step 7: Confirm Skill 0 and Objective Intake Active

Verify that both upstream layers are loaded and will fire on Marc's next prompt:

1. **Skill 0 (Prompt Optimization Engine):** If `Skill_0_Prompt_Optimization.md` was not found in the workspace, note this but proceed — the `prompt-optimizer` saved skill contains the same protocol and will auto-load on complex tasks.

2. **Objective Intake:** Confirm that `objective-intake` is loaded or will load when Marc states a new objective. Objective Intake runs BEFORE Skill 0 — it resolves outcome framing, persona selection, skill routing, and execution mode so that Skill 0 receives a contextualized objective rather than a raw request. If it is not loaded, load it now.

The full upstream sequence is: Marc states objective → Objective Intake → Skill 0 → Marc says "run" → Execution.

---

## Setup Confirmation Format

After completing all steps, respond with:

1. **Number of rules loaded** (should be 33: 13 directives + 20 preventive rules)
2. **Number of Accelerator rules loaded** (should be 12: Q1-Q6, L1-L6)
3. **Skill 0 status** (loaded / not found / available via saved skill)
4. **Objective Intake status** (loaded / not found / available via saved skill)
5. **Operational files status** (which exist, which are missing, which were created)
6. **Open items** from prior work (from commitment registry, reasoning log, or handoff docs)
7. **"Ready for your prompt."**

---

## Edge Cases

- **Marc pastes the full bootstrap prompt instead of just saying "initialize":** Execute the same protocol. The bootstrap prompt contains the full framework; this skill's protocol is the operational execution of that framework.
- **Workspace is completely empty (brand new thread):** Create all operational files from Step 5. Note that persistent-rules.md is not available and the framework is being loaded from saved skills and memory instead.
- **Marc says "initialize" mid-session:** Re-read all operational files (they may have been updated). Present updated status. Do not recreate files that already exist.

---

*This is the canonical definition of the initialize command and session start protocol. Per L4 (Context Continuity).*

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Self Audit | NOT RUN | — | — | — |
| CHECK | NOT RUN | — | — | — |