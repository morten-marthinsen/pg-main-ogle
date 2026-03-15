# Kill Criteria Protocol

**Version:** 1.0
**Created:** 2026-03-15
**Source:** QE 3.0 Evaluation — Gap #14 (Kill Criteria) + Gap #4 (Priority Hierarchy)
**Purpose:** Define explicit thresholds for when to STOP iterating on a skill execution and escalate to human decision

---

## WHY THIS EXISTS

Without kill criteria, the system defaults to infinite iteration. A convergence loop that isn't converging burns context, tokens, and session time. Worse, the agent may produce increasingly degraded output as context fills — each "fix" introducing new issues while the original problem remains.

Kill criteria are structural guardrails that prevent doom-loops. They do NOT prevent iteration — they prevent *unproductive* iteration.

---

## WHEN TO USE

Apply kill criteria during ANY iterative execution:
- Convergence loops (Arena rounds, revision cycles)
- Fix-and-recheck cycles (quality issues, voice drift corrections)
- Decomposition attempts (when a skill is too complex for single-pass execution)

---

## THE MECHANISM: 5 Kill Thresholds

### Threshold 1: Convergence Cap

**Default:** 3 loops

If 3 convergence loops have not produced a passing result, STOP. The issue is not addressable through further iteration — it requires a structural change (different approach, decomposition, or human input).

**Override:** Human can set a higher cap for specific skills with justification logged to execution-log.md.

### Threshold 2: Time Threshold

**Default:** 2x estimated time

If a skill execution has consumed more than 2x its estimated time (based on tier and skill complexity), STOP. Extended execution correlates with context pressure, not quality improvement.

**Estimation basis:** Skill YAML frontmatter `estimated_time` field, or tier defaults (Full: 45min, Standard: 30min, Quick: 15min per skill).

### Threshold 3: Assumption Failure

**Trigger:** Immediate

If a foundational assumption is invalidated during execution — the root cause doesn't hold, the mechanism is contradicted by evidence, the audience data is wrong — STOP immediately. No amount of iteration fixes a broken premise.

**Examples:**
- Skill 13 discovers the root cause (Skill 03) is factually incorrect
- Skill 14 finds the mechanism (Skill 04) contradicts loaded proof elements
- Skill 12 discovers the story type doesn't fit the audience vertical

### Threshold 4: Scope Drift

**Trigger:** When fix scope exceeds original skill scope

If the fix for a quality issue requires changes OUTSIDE the current skill's scope — modifying upstream outputs, restructuring the campaign brief, revising foundation decisions — STOP. This is not a fix; it is a new task.

**Test:** Would the fix require reading or modifying files that belong to a different skill? If yes, scope drift.

### Threshold 5: Complexity Threshold

**Trigger:** When fix introduces more issues than it resolves

If applying a fix creates new quality issues (voice drift from the fix, threading breaks, proof misalignment), the fix is net-negative. STOP. The section may need to be regenerated from scratch rather than patched.

**Detection:** Post-fix quality check shows new findings that did not exist before the fix was applied.

---

## GOVERNANCE MODEL

### Kill = Human Decision

The system RECOMMENDS a kill. The human DECIDES.

When a kill threshold is reached:

1. **Agent surfaces the kill recommendation** with:
   - Which threshold was triggered
   - Evidence (loop count, time elapsed, assumption contradiction, scope analysis)
   - Current state of the output (best version so far)

2. **Human chooses a remediation path** (see below)

3. **If human overrides the kill recommendation:**
   - Override justification is logged to execution-log.md
   - Agent continues with the override noted
   - If the SAME threshold triggers again after override, the kill is MANDATORY (no second override for the same threshold in the same execution)

### 4 Remediation Paths

When a kill is accepted, the human selects one of:

| Path | Action | When to Use |
|------|--------|-------------|
| **Simplify** | Reduce the scope or ambition of the current skill output | The goal is right but the execution is too complex |
| **Reframe** | Change the approach entirely (different lead type, different story angle, different mechanism framing) | The current approach has hit a ceiling |
| **Decompose** | Break the skill into smaller sub-tasks and execute them sequentially | The skill is trying to do too much in one pass |
| **Escalate** | Flag for human to write or heavily direct the section manually | The task exceeds current AI capability for this specific content |

---

## PRIORITY HIERARCHY

When protocols conflict, this hierarchy resolves the conflict:

```
1. Human judgment (always overrides, with logged justification)
   ↓
2. Kill Criteria (structural gate — overrides behavioral rules)
   ↓
3. Convergence Loop (behavioral rule — governs iteration)
   ↓
4. Individual skill rules (execution-level constraints)
```

**Key implications:**
- Kill Criteria always override Convergence Loop — if the kill threshold says stop, the convergence loop cannot force another iteration
- Structural gates (Kill Criteria, Scoped Verification, Foundation Integrity Check) always override behavioral rules (voice matching, pacing targets, proof density)
- Human judgment always overrides any mechanism, but the override must be logged with justification

---

## INTEGRATION POINTS

### With Convergence Intervention Protocol
Kill Criteria are the OUTER boundary. The Convergence Intervention Protocol handles WITHIN-boundary interventions (persona divergence, round stagnation). When convergence interventions fail to resolve the issue within the kill threshold, Kill Criteria trigger.

### With Scoped Verification Protocol
Scoped Verification provides the quality signals that inform kill decisions. A verification FLAG is not automatically a kill — but repeated flags after attempted fixes trigger Threshold 1 (Convergence Cap) or Threshold 5 (Complexity Threshold).

### With Task Triage Protocol
Tier does NOT affect kill thresholds. Quick campaigns hit the same kill criteria as Full campaigns. The thresholds protect quality — tiers only adjust exploration depth.

### With execution-log.md
All kill events, overrides, and remediation path selections are logged to the project's execution-log.md with timestamp, threshold triggered, and outcome.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-15 | Initial creation. 5 kill thresholds, governance model (human decides), 4 remediation paths, priority hierarchy. From QE 3.0 Gap #14 + Gap #4. |
