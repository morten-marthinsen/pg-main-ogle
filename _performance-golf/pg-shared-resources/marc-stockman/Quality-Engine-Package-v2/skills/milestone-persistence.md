---
name: milestone-persistence
description: R-24 enforcement — compaction self-detection, milestone file updates, checkpoint gates, staleness alarm, and correction checkpoint
version: 1.0
---
# Milestone Persistence Protocol

**Version:** 1.0 | March 11, 2026
**Implements:** R-24 (Compaction Self-Detection + Milestone Persistence)
**Provenance:** Extracted from marc-ops-framework R-24 per Reflect Proposal #1 (March 11, 2026). R-24 had grown to 814 tokens (3,319 chars) — the longest rule by 2x — containing 7 sub-features competing for attention in a single table cell. This skill gives each sub-feature independent description and checkability.

---

## Sub-Feature 1: Compaction Self-Detection (Pre-Action Gate)

**Trigger:** Before every substantive action.

**Protocol:** Verify:
1. Can I name the current task?
2. Do I know which skills are loaded?
3. Can I reference the active todo list?

If ANY answer is "no" → STOP, read `/workspace/session-state.md`, and run `re-initialize` before proceeding.

---

## Sub-Feature 2: Milestone Persistence (HARD GATE)

**Trigger:** After every milestone (skill saved, task completed, key decision made, audit loop completed).

**Protocol:** Update ALL operational files — not just `session-state.md`:

| File | What to Update |
|------|---------------|
| `session-state.md` | Current task, completed items, decisions |
| `commitment-registry.md` | New/changed commitments |
| `reasoning-log.md` | Pre-action entry before starting, post-action columns after completing |
| `staleness-map.md` | Any artifact created, modified, or with changed dependencies |
| `session-learning-log.md` | Any lesson learned or mistake caught |

**Rules:**
- Updates must be incremental (update as you go), not batch (dump everything at end of session)
- If you catch yourself about to start a new major action without having logged the previous one, STOP and log first

---

## Sub-Feature 3: Milestone Checkpoint Gate

**Trigger:** When marking any todo task "completed" OR saving any skill to the library.

**Protocol:** IMMEDIATELY run a file-update sweep before proceeding to the next task.

**Tempo scaling (Q1):**
- Light-tempo = `session-state.md` only
- Standard+ = all five operational files

This gate is attached to specific trigger actions (task completion, skill save) to reduce behavioral dependency.

---

## Sub-Feature 4: R-26 Enforcement Sub-Gate

**Trigger:** When the milestone being completed involves a new or enhanced feature (new rule, new skill, new enforcement mechanism).

**Protocol:** The Milestone Checkpoint Gate also verifies that R-26 acceptance tests have been run and documented before allowing the task to be marked complete.

If no test result is documented, STOP and run the acceptance test before proceeding.

This converts R-26 from a behavioral reminder into a structurally-attached gate.

---

## Sub-Feature 5: File Freshness Gate (STRUCTURAL ENFORCEMENT)

**Trigger:** Before calling `share_file` OR marking a todo task "completed."

**Protocol:** Verify `session-state.md` has been updated since the last major action. If stale, update it first.

**Provenance:** 3+ class-c violations in a single session triggered the escalation threshold per audit protocol Pass 5 Step 5. This converts the behavioral milestone persistence requirement into a structurally-enforced check.

---

## Sub-Feature 6: 60-Minute Staleness Alarm

**Trigger:** Before starting any new major action.

**Protocol:** Check the `Last Updated` timestamps in `staleness-map.md`. If ANY operational file shows a timestamp 60+ minutes older than current time, STOP and run a full file-update sweep before proceeding.

Timestamp source is the staleness-map itself — never estimate mentally.

---

## Sub-Feature 7: Correction Checkpoint (HARD GATE)

**Trigger:** After fixing any problem that Marc surfaced (directly or via question), BEFORE moving on.

**Protocol:**
1. Log the issue in `session-learning-log.md` using `issue-logger` format
2. Classify (a/b/c/d)
3. Check for 3+ class-c threshold on the same rule
4. Propose a systemic fix if warranted

Only THEN proceed to the next task.

**Tempo scaling (Q1):** Light-tempo gets a one-line log entry; standard+ gets full classification.

This gate closes the self-learning loop — no more silent fixes that bypass D-12.

---

## Cross-Skill Integration

| Skill | Integration Point |
|-------|-------------------|
| `audit` | Pre-Flight PF-0 checks these files for proportional population. PF-3 uses the staleness map. |
| `structural-gates` | Gate 3 (R-24 File Freshness) enforces Sub-Feature 5. Gate 6 (R-26) enforces Sub-Feature 4. |
| `issue-logger` | Sub-Feature 7 (Correction Checkpoint) triggers issue-logger classification. |
| `event-driven-reminders` | Detectors #1 (todo completion) and #3 (share_file) fire the checkpoint gate and freshness gate. |

---

*This is the canonical definition of R-24 enforcement. The R-24 entry in marc-ops-framework is a summary pointing here.*

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Initial | NEW | 2026-03-11 | AI | v1.0: Extracted from marc-ops-framework R-24 per Reflect Proposal #1. Content unchanged — restructured into 7 independently-checkable sub-features. |
