---
name: check-protocol
version: 1.0
updated: 2026-03-06
author: Marc Stockman
description: 8-step operational compliance audit (CHECK command) — rules, commitments, reasoning log, staleness, file visibility, quality
scope: Full compliance audit triggered by Marc's 'check' command
trigger: Marc says 'check', 'check yourself', 'run a check', or 'checkpoint'
---

# CHECK Command Protocol

**Rule:** R-13
**Version:** 1.0 | March 5, 2026
**Trigger:** Marc says "check" (or variations: "check yourself", "run a check", "checkpoint")

---

## Action

Stop all current work. Execute the following 8-step protocol (Step 0 through Step 7). Post results. Fix issues before continuing.

---

### Step 0: Pre-Check Orientation

Before any step begins, answer these four questions and document at the top of the check report:

1. **What work was just completed?** (type, scope, complexity)
2. **Which 8–12 rules are most relevant to this work?** (from the 45 total: D-01–D-13, R-01–R-20, Q1–Q6, L1–L6)
3. **What is the most likely failure mode based on recurring patterns?** (reference Marc's top frustrations: training data reliance, missing steps, feature regressions, font sizes, context drift)
4. **Initialize checkpoint file** at `/workspace/audit-checkpoint.md`

**Checkpoint format:**
```
---
Protocol: CHECK
Status: IN PROGRESS
Work Scope: [description from Q1]
Relevant Rules: [list from Q2]
Likely Failure Mode: [from Q3]
Completed Steps: []
Current Step: 0
Timestamp: [current time]
---
```

---

### Step 1: Rules Compliance

Scan all rules: D-01 through D-13, R-01 through R-20. Focus heaviest attention on rules identified in Step 0.

For each rule, check: was it followed in all work since last CHECK? Document compliance or violation.

**R-07 specific check:** For any work completed since last CHECK that involved factual claims about current state (APIs, pricing, capabilities, legal, specifications):
- Verify that live research was completed BEFORE conclusions were drafted — not after
- Evidence: research files in workspace, web search citations in deliverables
- If conclusions preceded research, flag as R-07 violation

**R-20 specific check:** For any Tier 1 claims (pricing, specs, features, compatibility, vendor timelines) in work since last CHECK:
- Was the vendor's primary source page fetched at time of writing?
- Were comparison sites or third-party articles treated as primary sources?
- Flag any Tier 1 claim verified only to Level 1 (URL exists) that should have been Level 2 (content verified from primary source)

**Update checkpoint:** Completed Steps: [0, 1], findings count

---

### Step 2: Commitment Accuracy

Read commitment registry (`commitment-registry.md`). Verify every status against actual artifacts:
- For each commitment marked BUILT: verify the artifact exists at the stated path
- For each commitment marked IN PROGRESS: verify work has actually progressed
- For each commitment marked PLANNED: verify it hasn't been superseded or abandoned
- Flag any status that doesn't match reality

**Update checkpoint:** Completed Steps: [0, 1, 2], findings count

---

### Step 3: Reasoning Log Completeness

Read reasoning log (`reasoning-log.md`). Verify:
- All entries have complete pre-action columns (A–F)
- All completed actions have post-action columns (G–J) filled
- Flag any TBD entries or incomplete post-action columns
- Per R-16: if the log hasn't been updated in 2+ hours or after 3+ major actions, flag as stale

**Update checkpoint:** Completed Steps: [0, 1, 2, 3], findings count

---

### Step 4: Staleness Sweep

Read staleness map (`staleness-map.md`). Check all artifacts for currency against recent work:
- Any artifact referenced in current work that hasn't been updated to reflect recent changes
- Any file paths in documents that point to moved or deleted files
- Any rule counts, version numbers, or dates that no longer match current state
- Per L3: flag anything not updated in 2+ hours or after 3+ major actions

**Update checkpoint:** Completed Steps: [0, 1, 2, 3, 4], findings count

---

### Step 5: File Visibility

Verify every file created or modified since last CHECK has been shared with Marc via share_file (R-11):
- Check conversation history for share_file calls
- Compare against files modified in workspace
- Flag any file that was created or updated but never shared

**Update checkpoint:** Completed Steps: [0, 1, 2, 3, 4, 5], findings count

---

### Step 6: Active Work Quality

Assess the substance and quality of work since last CHECK:
- Is the work substantive? (R-04 — 70%+ substance, not quality theater)
- Is there spec-as-goal? (Degradation Pattern 2.2 — the AI described what should be done rather than doing it)
- Is there quality degradation? (Patterns: lazy output, invisible refusal, enthusiastic agreement, assumption cascading, self-congratulation, scope drift)
- Are visual assets properly formatted? (Q3 — fonts readable, no text wrapping/truncation/overflow)

**Update checkpoint:** Completed Steps: [0, 1, 2, 3, 4, 5, 6], findings count

---

### Step 7: Rule Integrity Audit (CONDITIONAL)

**This step fires ONLY if issues were found in Steps 1–6.** If all steps passed clean, skip to output.

For each issue found:
1. **Trace to rule** — Which specific rule (D/R/Q/L) should have prevented this?
2. **Classify:**
   - (a) Rule is missing — no rule covers this class of issue
   - (b) Rule exists but is incomplete — triggers or checks don't cover this scenario
   - (c) Rule exists and is sufficient — it just wasn't followed (execution discipline gap)
   - (d) Net-new gap — doesn't fit any current rule
3. **For (a), (b), or (d):** Propose a specific patch or new rule. State what the patch is, where it goes, and the provenance (which CHECK finding triggered it).
4. **Present to Marc for approval** — never auto-apply rule changes

**Update checkpoint:** Completed Steps: [0, 1, 2, 3, 4, 5, 6, 7], Status: COMPLETE

---

## Output Format

Post a structured report:

```
## CHECK Report — [Date/Time]

### Step 0: Orientation
- Work scope: [description]
- Relevant rules: [list]
- Likely failure mode: [prediction]

### Step 1: Rules Compliance
- [Rule]: [PASS / VIOLATION — description]
- R-07 check: [PASS / VIOLATION]
- R-20 check: [PASS / VIOLATION]

### Step 2: Commitment Accuracy
- [X] commitments checked, [Y] accurate, [Z] mismatched

### Step 3: Reasoning Log
- [CURRENT / STALE — details]

### Step 4: Staleness Sweep
- [X] artifacts checked, [Y] current, [Z] stale

### Step 5: File Visibility
- [X] files created/modified, [Y] shared, [Z] unshared

### Step 6: Work Quality
- Substance ratio: [assessment]
- Degradation patterns: [none / findings]

### Step 7: Rule Integrity (if triggered)
- [Finding]: Rule [X], Classification: [(a/b/c/d)], Proposed patch: [description]

---

### Summary

| Issues Found | Severity | Disposition |
|-------------|----------|-------------|
| [issue] | [high/medium/low] | [fixed / flagged / rule patch proposed] |

**Overall: [CLEAN / X issues found, Y fixed, Z pending]**
```

---

## Checkpoint Behavior

Write `/workspace/audit-checkpoint.md` after every step.

**On session resume (context reload):** Check for `/workspace/audit-checkpoint.md`:
- If it exists and is less than 2 hours old: resume from last completed step (do not restart from Step 0)
- If it exists and is more than 2 hours old: start fresh from Step 0 (context may have shifted)
- If the referenced work scope no longer matches current work: start fresh from Step 0

**On completion:** Update checkpoint to Status: COMPLETE, then delete the checkpoint file.

---

*Codified as Rule R-13. This is the canonical definition of the CHECK command. Paired with self-audit-command for the self audit protocol.*

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Self Audit | NOT RUN | — | — | — |
| CHECK | NOT RUN | — | — | — |