# ROOT-CAUSE-NARRATIVE-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent root cause narrative skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates narratives WITHOUT loading type-matched specimens
- AI skips the three-part structure requirement
- AI reveals root cause BEFORE establishing authority (Rule #9 violation)
- AI internalizes blame to the reader (Rule #1 violation)
- AI skips the 10 critical rules validation
- AI produces narratives without memorable anchor phrase
- AI selects narrative without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/13-root-cause-narrative/checkpoints/LAYER_0_COMPLETE.yaml  # Human confirms root cause
[project]/13-root-cause-narrative/checkpoints/LAYER_1_COMPLETE.yaml
[project]/13-root-cause-narrative/checkpoints/LAYER_2_COMPLETE.yaml
[project]/13-root-cause-narrative/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/13-root-cause-narrative/checkpoints/LAYER_3_COMPLETE.yaml
[project]/13-root-cause-narrative/HUMAN_SELECTION.yaml  # BLOCKING
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/13-root-cause-narrative/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/13-root-cause-narrative/checkpoints/LAYER_2_COMPLETE.yaml
[project]/13-root-cause-narrative/checkpoints/ARENA_COMPLETE.yaml
```

### LAYER 0 HUMAN CHECKPOINT (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml
# Created ONLY when human confirms root cause to use

human_checkpoint:
  root_cause_confirmed: true
  confirmed_by: "human"
  timestamp: "[ISO 8601]"
  root_cause_selected: "[exact root cause from 03-root-cause package]"

  IF root_cause_confirmed != true:
    HALT — "Cannot proceed without human confirmation of root cause"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **Three-part structure** | 3/3 | HALT — Include all parts |
| **10 critical rules** | 10/10 | HALT — Fix violations |
| **Anchor phrase** | Present & memorable | HALT — Create anchor |
| **Reframe techniques** | 2 minimum | HALT — Add reframes |
| **Arena personas** | 6/6 | HALT — All generate |
| **Human selection** | BLOCKING | HALT — Get selection |

### The Three-Part Structure (MANDATORY)

Every root cause narrative MUST communicate:

```yaml
three_part_structure:
  what_they_think:
    present: [Y/N]
    content: "[The false belief]"

  what_real:
    present: [Y/N]
    content: "[The counter-intuitive root cause]"

  why_nothing_worked:
    present: [Y/N]
    content: "[Traced to addressing symptoms]"

  IF any_part.present == N:
    HALT — "All 3 parts of structure required"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "two parts communicate enough" | Three-part structure is MANDATORY | HALT — Add missing part |
| "authority can come after reveal" | Authority MUST precede reveal (Rule #9) | HALT — Resequence |
| "subtle blame is okay" | All blame must be EXTERNAL (Rule #1) | HALT — Externalize |
| "anchor phrase will emerge" | Anchor must be DESIGNED | HALT — Create anchor |
| "8/10 rules is strong" | 10/10 rules required | HALT — Fix violations |

---

## STRUCTURAL FIX 4: THE 10 CRITICAL RULES GATE

### All 10 Rules MUST Pass

| Rule | Requirement | Validation |
|------|-------------|------------|
| 1 | Root cause is EXTERNAL | Does it blame something outside reader? |
| 2 | Explains ALL past failures | Accounts for why everything failed? |
| 3 | More specific than false belief | More concrete than what they think? |
| 4 | Creates clear path to solution | Naturally leads to mechanism? |
| 5 | Pairs with villain | Specific external villain identified? |
| 6 | Counter-intuitive | Would it surprise the prospect? |
| 7 | Woven throughout | Can be referenced repeatedly? |
| 8 | Has memorable anchor phrase | Quotable phrase exists? |
| 9 | Authority before reveal | Credibility established first? |
| 10 | Kills competitor solutions | Invalidates other approaches? |

```yaml
ten_rules_validation:
  rule_1_external: [PASS | FAIL]
  rule_2_explains_failures: [PASS | FAIL]
  rule_3_specific: [PASS | FAIL]
  rule_4_path_to_solution: [PASS | FAIL]
  rule_5_villain: [PASS | FAIL]
  rule_6_counter_intuitive: [PASS | FAIL]
  rule_7_woven: [PASS | FAIL]
  rule_8_anchor_phrase: [PASS | FAIL]
  rule_9_authority_first: [PASS | FAIL]
  rule_10_kills_competitors: [PASS | FAIL]

  total_passing: [number]
  required: 10

  IF total_passing < 10:
    HALT — "All 10 critical rules must pass"
    failures: [list failed rules]
```

---

## STRUCTURAL FIX 5: AUTHORITY-BEFORE-REVEAL GATE

### The Problem
AI reveals the root cause before establishing why the reader should believe the messenger.

### The Fix

**SEQUENCE VALIDATION:**

```yaml
sequence_validation:
  authority_establishment:
    position_in_narrative: "[early | middle | late]"
    type: "[qualification | experience | social_proof | institutional]"
    established_before_reveal: [Y/N]

  root_cause_reveal:
    position_in_narrative: "[early | middle | late]"
    comes_after_authority: [Y/N]

  IF comes_after_authority == N:
    HALT — "Rule #9 violation: Authority must be established BEFORE root cause reveal"
    ACTION: "Move authority establishment earlier OR move reveal later"
```

---

## STRUCTURAL FIX 6: RC-NARRATIVE-SPECIFIC MC-CHECK

```yaml
RC-NARRATIVE-MC-CHECK:
  timestamp: "[current time]"

  human_checkpoint_verification:
    root_cause_confirmed_by_human: [Y/N]
    if_no: "STOP — Human must confirm root cause before narrative begins"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  structure_verification:
    what_they_think_present: [Y/N]
    what_real_present: [Y/N]
    why_nothing_worked_present: [Y/N]
    if_any_no: "STOP — Three-part structure required"

  rules_verification:
    rules_passing: [number]
    if_under_10: "STOP — All 10 rules must pass"

    rule_1_blame_external: [Y/N]
    if_no: "🛑 CRITICAL: Rule #1 violation — blame must be external"

    rule_9_authority_first: [Y/N]
    if_no: "🛑 CRITICAL: Rule #9 violation — authority must precede reveal"

  anchor_verification:
    anchor_phrase_exists: [Y/N]
    anchor_is_memorable: [Y/N]
    if_any_no: "STOP — Memorable anchor phrase required"

  result: [CONTINUE | HALT_HUMAN | HALT_SPECIMENS | HALT_STRUCTURE | HALT_RULES | HALT_ANCHOR]
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 0 (FOUNDATION + HUMAN CHECKPOINT):
[ ] Upstream packages loaded (03-root-cause, campaign-brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Root cause package reviewed
[ ] HUMAN CONFIRMS root cause to use
[ ] LAYER_0_COMPLETE.yaml created (with human confirmation)

LAYER 1 (CLASSIFICATION):
[ ] Communication type classified
[ ] Vault reference identified
[ ] Framing pattern selected
[ ] Type-matched specimens loaded VERBATIM
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DRAFT):
[ ] All 7 phases drafted
[ ] Authority established BEFORE reveal
[ ] Three-part structure present
[ ] Anchor phrase created
[ ] All 6 Arena personas generate
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (ARENA — MANDATORY, CANNOT BE SKIPPED):
[ ] All 7 competitors generated across 3 rounds
[ ] Adversarial critique completed each round
[ ] Targeted revision completed each round
[ ] Post-Arena Synthesis: 2-3 hybrids created
[ ] 9-10 candidates presented to human
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 3 (REFINEMENT):
[ ] Evidence woven (not cited)
[ ] Minimum 2 reframe techniques stacked
[ ] Threading guide complete
[ ] All 10 rules validated (10/10)
[ ] Anti-slop passed
[ ] Score >= 7.0
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] root-cause-narrative-package.json created
[ ] ROOT-CAUSE-NARRATIVE-SUMMARY.md created

ON CONTEXT RESUME:
[ ] VERIFY human confirmed root cause (LAYER_0)
[ ] VERIFY specimens loaded
[ ] VERIFY three-part structure
[ ] VERIFY 10/10 rules pass
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"Root cause narrative that blames the reader destroys rapport. Reveal before authority has no weight. Without anchor phrase, nothing is quotable."**

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/13-root-cause-narrative/checkpoints/ARENA_COMPLETE.yaml
```

This file is created ONLY after:
1. All 7 competitors have generated entries (7 unique personas)
2. 3 full rounds completed (not 1, not 2 — THREE)
3. Adversarial critique completed each round (ONE weakness per competitor)
4. Targeted revision completed each round
5. Post-Arena Synthesis: 2-3 hybrids created from top performers
6. Human selection received (BLOCKING — cannot proceed without it)

### Updated Checkpoint Progression
```
[project]/13-root-cause-narrative/checkpoints/LAYER_0_COMPLETE.yaml
[project]/13-root-cause-narrative/checkpoints/LAYER_1_COMPLETE.yaml
[project]/13-root-cause-narrative/checkpoints/LAYER_2_COMPLETE.yaml
[project]/13-root-cause-narrative/checkpoints/ARENA_COMPLETE.yaml    <- NEW (MANDATORY)
[project]/13-root-cause-narrative/checkpoints/LAYER_3_COMPLETE.yaml
```

### Arena-Specific Forbidden Rationalizations

| Rationalization | Why It's Wrong | Required Response |
|----------------|---------------|-------------------|
| "Context is too long for Arena" | Arena is the HIGHEST-VALUE step. Context management is YOUR problem, not a reason to skip. | Manage context. Run Arena. |
| "The Layer 2 output is already strong" | Single-perspective output is NEVER as strong as 7-competitor tested output. | Run Arena regardless of perceived quality. |
| "I'll run Arena separately/later" | "Later" means never. Arena runs between Layer 2 and Layer 3. Period. | Run Arena NOW, before Layer 3. |
| "Arena would be redundant here" | Arena is NEVER redundant. It catches blind spots single-perspective generation cannot. | Run Arena. No exceptions. |
| "The user didn't specifically request Arena" | Arena is MANDATORY per engine architecture. It doesn't require a request. | Run Arena. It's structural, not optional. |
| "I can incorporate Arena-style thinking" | Simulating competition is not competition. 7 real personas generating real alternatives is irreplaceable. | Run full Arena protocol. No shortcuts. |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
