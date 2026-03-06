# EMAIL-EDITORIAL-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-21
**Purpose:** STRUCTURAL enforcement to prevent email editorial process breakdown
**Authority:** This document has EQUAL authority to EMAIL-ENGINE-CLAUDE.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI applies revisions without establishing baseline scores first
- AI uses direct fixes for P1/P2 issues instead of running Arena
- AI skips rescoring after revision (no proof of improvement)
- AI declares emails "close enough" at 7.4 instead of enforcing 7.5 minimum
- AI checks campaign-level criteria superficially or not at all
- AI verifies SL-body alignment for some emails but not all
- AI checks voice consistency within individual emails but not across the sequence
- AI clusters all issues as P3/P4 to avoid Arena overhead

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/E4-email-editorial/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/E4-email-editorial/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/E4-email-editorial/checkpoints/LAYER_2_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "E4-email-editorial"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  all_microskills_executed: true
  minimum_thresholds_met: true
  quality_gates_passed: true

layer_specific:
  # Layer 0:
  emails_loaded: [integer]
  emails_scored: [integer]
  baseline_average: [float]
  rubric_file_read: true

  # Layer 1:
  audit_dimensions_complete: 4
  total_issues_found: [integer]
  p1_count: [integer]
  p2_count: [integer]
  p3_count: [integer]
  p4_count: [integer]

  # Layer 2:
  arena_runs_completed: [integer]
  direct_fixes_applied: [integer]
  p1_resolved: [integer]
  p2_resolved: [integer]
  unresolved_p1: 0  # MUST be 0

  # Layer 3:
  all_emails_rescored: true
  lowest_final_score: [float]  # must be >= 7.5
  all_above_7_5: true
  campaign_criteria_pass: true
```

---

## STRUCTURAL FIX 2: BASELINE SCORES MUST EXIST BEFORE ANY REVISION

```
HARD RULE: No revision may be applied to any email until
           0.2-quality-baseline.md has produced baseline scores
           for EVERY email in the sequence.

IF baseline scores do not exist:
  HALT -- Return to Layer 0. Score first, revise second.

WHY: Without baselines, you cannot prove the editorial improved anything.
     Revisions without baselines are unverifiable.
```

---

## STRUCTURAL FIX 3: ARENA MANDATORY FOR P1/P2 ISSUES

```
P1 (Critical) issues → MUST use full Arena (3 rounds, 7 competitors)
P2 (Major) issues    → MUST use full Arena (3 rounds, 7 competitors)
P3 (Minor) issues    → Direct fix (no Arena needed)
P4 (Cosmetic) issues → Direct fix (no Arena needed)

FORBIDDEN:
  - Using direct fix for P1 issues (NEVER acceptable)
  - Using direct fix for P2 issues (NEVER acceptable)
  - Downgrading P1 to P3 to avoid Arena
  - Downgrading P2 to P3 to avoid Arena
  - Clustering P1/P2 issues as "minor" to skip Arena

IF P1 or P2 issue is identified and resolved via direct fix:
  HALT -- The fix is INVALID. Re-run through Arena.
```

---

## STRUCTURAL FIX 4: ALL EMAILS MUST BE RESCORED AFTER REVISION

```
HARD RULE: After ALL revisions are applied (Layer 2 complete),
           EVERY email must be rescored against email-quality-rubric.md.
           Not just revised emails -- ALL emails (revisions can affect
           adjacent email flow).

SCORING REQUIREMENTS:
  - Same 9 criteria as baseline
  - Same weighting formula
  - Same rubric file (must re-read if context is large)
  - Scores recorded alongside baseline for comparison

IF rescoring is skipped:
  HALT -- Return to Layer 3. Rescore all emails.
```

---

## STRUCTURAL FIX 5: MINIMUM 7.5 THRESHOLD (NO EXCEPTIONS)

```
EVERY email in the final sequence must score >= 7.5 weighted average.

FORBIDDEN:
  - "7.4 is close enough" → NOT close enough. Fix it.
  - "7.3 but the rest are strong" → Does not matter. Fix it.
  - "Rounding up from 7.45" → 7.45 < 7.5. Fix it.
  - "The baseline was 6.2 so 7.4 is a big improvement" → Improvement is irrelevant. Threshold is 7.5.

IF any email scores below 7.5 after revision:
  HALT -- Return to Layer 2. Apply additional revisions.
  If it was a P3/P4 fix, escalate to P2 and run Arena.
```

---

## STRUCTURAL FIX 6: CAMPAIGN-LEVEL CRITERIA MUST ALL PASS

```
ALL 5 campaign-level criteria must be verified:

C1: Body Type Variety
  - No same body type in consecutive positions
  - In any 5-email window, at least 3 different body types
  CHECK: Enumerate body types by position. Verify.

C2: Emotional Arc
  - Clear progression: trust -> education -> desire -> urgency
  CHECK: Map emotional target per email. Verify progression.

C3: Cross-Email Continuity
  - Later emails reference earlier content
  CHECK: Search for callbacks/references in emails 3+.

C4: Urgency Escalation
  - No urgency in first 2/3 of sequence
  - Clear escalation in final 1/3
  CHECK: Map urgency_level per email. Verify pattern.

C5: Subject Line Diversity
  - At least 3 different formula categories used
  CHECK: Classify each SL by formula category. Count unique.

IF any campaign-level criterion FAILS:
  HALT -- This is a P2 issue. Address before packaging.
```

---

## STRUCTURAL FIX 7: SL-BODY ALIGNMENT VERIFIED FOR EVERY EMAIL

```
HARD RULE: Subject line / body alignment must be verified
           for EVERY email in the sequence. Not a sample. ALL.

VERIFICATION METHOD:
  For each email:
    1. Read the subject line
    2. Read the email body
    3. Ask: "Does the body deliver on the promise/curiosity of the SL?"
    4. Score alignment: [ALIGNED | MISALIGNED | PARTIALLY_ALIGNED]
    5. MISALIGNED = P2 issue → Arena required
    6. PARTIALLY_ALIGNED = P3 issue → Direct fix

IF any email is not checked:
  HALT -- All emails must be verified. No exceptions.
```

---

## STRUCTURAL FIX 8: VOICE CONSISTENCY VERIFIED ACROSS SEQUENCE

```
HARD RULE: Voice consistency must be checked ACROSS the sequence,
           not just within individual emails.

TWO CHECKS REQUIRED:

CHECK 1: Within-Email Voice Consistency
  For each email:
    - Does the voice stay consistent from opening to CTA?
    - Any jarring register shifts mid-email?
    - Score: 1-10 per email-quality-rubric.md criterion 5

CHECK 2: Across-Sequence Voice Consistency
  Across all emails:
    - Is the persona voice recognizably the same across all emails?
    - Any emails that sound like a different writer?
    - Any emails with different formality levels?
    - Cross-email voice drift = P1 issue → Arena required

IF Check 2 is skipped:
  HALT -- Across-sequence voice check is mandatory.
```

---

## STRUCTURAL FIX 9: ANTI-DEGRADATION MANDATORY READ

```
SESSION STARTUP:
  1. READ this file (EMAIL-EDITORIAL-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ EMAIL-EDITORIAL-AGENT.md
  3. READ email-quality-rubric.md (scoring criteria)
  4. IF resuming: READ PROJECT-STATE.md
  5. IF resuming: READ checkpoint files
  6. CREATE infrastructure if not exists
  7. ONLY THEN begin execution
```

---

## STRUCTURAL FIX 10: MANDATORY PROJECT INFRASTRUCTURE

**BEFORE any execution begins, create:**

```
[project]/E4-email-editorial/
  PROJECT-STATE.md
  PROGRESS-LOG.md
  checkpoints/
  execution-log.md
  revised-sequence.yaml          # PRIMARY OUTPUT
  EDITORIAL-REPORT.md            # HUMAN-READABLE REPORT
```

---

## STRUCTURAL FIX 11: BINARY GATE ENFORCEMENT

```
VALID GATE STATUSES:
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  "good enough" / "acceptable for now"
  "close enough to 7.5"
```

---

## STRUCTURAL FIX 12: STALE ARTIFACT CLEANUP

```
BEFORE writing revised-sequence.yaml:
  1. SEARCH for existing files at ALL possible locations
  2. DELETE stale artifacts from previous attempts
  3. LOG deletion in PROGRESS-LOG.md
  4. ONLY THEN write new output files
```

---

## STRUCTURAL FIX 13: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "7.4 is close enough to 7.5" | Thresholds are exact | HALT -- revise until >= 7.5 |
| "This P1 issue is really more of a P3" | Severity downgrade to avoid Arena | HALT -- apply correct severity |
| "I already know the rubric criteria" | Must READ rubric file in session | HALT -- read email-quality-rubric.md |
| "Baseline scores aren't necessary" | Cannot prove improvement without baselines | HALT -- score before revising |
| "Voice is consistent enough" | Must verify across entire sequence | HALT -- complete voice audit |
| "Most subject lines align" | ALL must be checked | HALT -- check every SL |
| "Campaign criteria probably pass" | Must verify all 5 explicitly | HALT -- verify C1-C5 |
| "Arena is overkill for this issue" (P1/P2) | Arena is mandatory for P1/P2 | HALT -- run Arena |
| "Direct fix is faster and just as good" (P1/P2) | Speed is irrelevant. Arena required. | HALT -- run Arena |
| "The original from E1 was strong" | Editorial judges the assembled sequence, not E1 output | HALT -- score what exists now |

---

## E4-SPECIFIC MC-CHECK

```yaml
E4-MC-CHECK:
  timestamp: "[current time]"

  baseline_verification:
    rubric_file_read_in_session: [Y/N]
    all_emails_scored: [Y/N]
    baseline_scores_recorded: [Y/N]
    if_any_no: "STOP -- Complete baseline scoring first"

  audit_verification:
    structural_audit_complete: [Y/N]
    voice_consistency_complete: [Y/N]
    pitch_ratio_check_complete: [Y/N]
    sl_body_alignment_complete: [Y/N]
    all_issues_severity_tagged: [Y/N]
    if_any_no: "STOP -- Complete all 4 audit dimensions"

  revision_verification:
    p1_issues_use_arena: [Y/N]
    p2_issues_use_arena: [Y/N]
    all_p1_resolved: [Y/N]
    all_p3_p4_fixed: [Y/N]
    if_any_no: "STOP -- Complete revisions per severity protocol"

  rescore_verification:
    all_emails_rescored: [Y/N]
    all_above_7_5: [Y/N]
    campaign_criteria_verified: [Y/N]
    if_any_no: "STOP -- Complete rescoring and verification"

  rationalization_check:
    am_i_skipping_baseline: [Y/N]
    am_i_downgrading_severity: [Y/N]
    am_i_using_direct_fix_for_p1_p2: [Y/N]
    am_i_rounding_up_scores: [Y/N]
    am_i_skipping_campaign_criteria: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT]
```

---

## Per-Microskill Output Protocol

Every microskill execution MUST produce a dedicated output file.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-sequence-loader | layer-0-outputs/0.1-sequence-loader.md | 1KB |
| 0 | 0.2-quality-baseline | layer-0-outputs/0.2-quality-baseline.md | 5KB |
| 1 | 1.1-structural-audit | layer-1-outputs/1.1-structural-audit.md | 3KB |
| 1 | 1.2-voice-consistency | layer-1-outputs/1.2-voice-consistency.md | 3KB |
| 1 | 1.3-pitch-ratio-check | layer-1-outputs/1.3-pitch-ratio-check.md | 3KB |
| 1 | 1.4-sl-body-alignment | layer-1-outputs/1.4-sl-body-alignment.md | 3KB |
| 2 | 2.1-issue-clustering | layer-2-outputs/2.1-issue-clustering.md | 3KB |
| 2 | 2.2-revision-executor | layer-2-outputs/2.2-revision-executor.md | 5KB |
| 3 | 3.1-rescore | layer-3-outputs/3.1-rescore.md | 5KB |
| 3 | 3.2-output-packager | layer-3-outputs/3.2-output-packager.md | 5KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] EMAIL-EDITORIAL-ANTI-DEGRADATION.md read (THIS FILE)
[ ] EMAIL-EDITORIAL-AGENT.md read
[ ] email-quality-rubric.md read
[ ] PROJECT-STATE.md created
[ ] PROGRESS-LOG.md created
[ ] checkpoints/ directory created

LAYER 0 (LOADING + BASELINE):
[ ] E3 assembled sequence loaded (all emails parsed)
[ ] Every email scored against 9 rubric criteria
[ ] Weighted average calculated per email
[ ] Campaign-level criteria (C1-C5) scored
[ ] Baseline scores recorded
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (ISSUE IDENTIFICATION):
[ ] 1.1 Structural audit complete (every email vs. body type template)
[ ] 1.2 Voice consistency complete (within-email AND across-sequence)
[ ] 1.3 Pitch ratio check complete (every email measured)
[ ] 1.4 SL-body alignment complete (every email checked)
[ ] All issues tagged with severity (P1/P2/P3/P4)
[ ] All issues tagged with affected email position(s)
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (REVISION):
[ ] Issues clustered by type and severity
[ ] Revision plan created (Arena for P1/P2, direct fix for P3/P4)
[ ] Arena executed for EVERY P1 issue cluster (3 rounds, 7 competitors)
[ ] Arena executed for EVERY P2 issue cluster (3 rounds, 7 competitors)
[ ] Direct fixes applied for all P3 issues
[ ] Direct fixes applied for all P4 issues
[ ] Zero unresolved P1 issues
[ ] LAYER_2_COMPLETE.yaml created

LAYER 3 (FINAL OUTPUT):
[ ] Every email rescored against 9 rubric criteria
[ ] Every email >= 7.5 weighted average
[ ] Campaign-level criteria (C1-C5) all PASS
[ ] Before/after comparison calculated per email
[ ] revised-sequence.yaml created
[ ] EDITORIAL-REPORT.md created
[ ] LAYER_3_COMPLETE.yaml created
[ ] Human reviews editorial report (BLOCKING)

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full timeline
[ ] All output files verified
```

---

## KEY INSIGHT

> **"Score before you fix. Fix with the right tool. Score again to prove it worked. Every email, every time, no exceptions."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-21 | Initial creation -- full structural enforcement with 13 fixes |

---

**Status:** COMPLETE

---

## FAILURE MODE TABLE

| Failure Mode | Detection Signal | Automated Response | Human Escalation Threshold |
|-------------|-----------------|-------------------|---------------------------|
| Missing baseline | Revision attempted without baseline score | HALT — score baseline first | Immediately |
| Arena skip for P1/P2 | P1 or P2 issue without Arena treatment | HALT — run Arena for priority issues | Immediately |
| Per-email score too low | Any email < 7.5 after revision | HALT — additional revision rounds | After 3 revision rounds |
| Score regression | Post-revision score lower than baseline | HALT — revert and try different approach | Immediately |
| 4-dimension audit skip | Fewer than 4 audit dimensions evaluated | HALT — complete all 4 dimensions | Never — always completable |
