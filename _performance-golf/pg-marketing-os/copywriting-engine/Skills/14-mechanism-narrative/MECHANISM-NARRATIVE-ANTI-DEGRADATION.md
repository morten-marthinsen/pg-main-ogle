# MECHANISM-NARRATIVE-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent mechanism narrative skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates narratives WITHOUT loading type-matched specimens
- AI skips the 6-phase unit structure
- AI produces mechanism without dramatic naming moment
- AI skips metaphor anchor (mechanism incomprehensible)
- AI skips "Think about it" simplification moment
- AI presents proof as bullet lists instead of woven narrative
- AI uses hedge words ("may," "could," "potentially")
- AI selects narrative without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/14-mechanism-narrative/checkpoints/LAYER_0_COMPLETE.yaml  # Human confirms mechanism
[project]/14-mechanism-narrative/checkpoints/LAYER_1_COMPLETE.yaml
[project]/14-mechanism-narrative/checkpoints/LAYER_2_COMPLETE.yaml
[project]/14-mechanism-narrative/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/14-mechanism-narrative/checkpoints/LAYER_3_COMPLETE.yaml
[project]/14-mechanism-narrative/HUMAN_SELECTION.yaml  # BLOCKING
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/14-mechanism-narrative/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/14-mechanism-narrative/checkpoints/LAYER_2_COMPLETE.yaml
[project]/14-mechanism-narrative/checkpoints/ARENA_COMPLETE.yaml
```

### LAYER 0 HUMAN CHECKPOINT (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml

human_checkpoint:
  mechanism_confirmed: true
  confirmed_by: "human"
  timestamp: "[ISO 8601]"
  mechanism_name: "[exact name from 04-mechanism package]"

  IF mechanism_confirmed != true:
    HALT — "Cannot proceed without human confirmation of mechanism"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **6 phases present** | 6/6 | HALT — Complete all phases |
| **Metaphor anchor** | 1 graspable | HALT — Create metaphor |
| **"Think about it" moment** | Present | HALT — Add simplification |
| **Naming moment** | Dramatic | HALT — Create anticipation |
| **Hedge words** | 0 | HALT — Remove all |
| **Arena personas** | 6/6 | HALT — All generate |
| **12-year-old test** | Pass | HALT — Simplify |

### The 6-Phase Unit Structure (MANDATORY)

```yaml
six_phase_structure:
  phase_1_problem_amplification:
    present: [Y/N]
    escalates_beyond_root_cause: [Y/N]

  phase_2_root_cause_bridge:
    present: [Y/N]
    connects_root_cause_to_mechanism: [Y/N]

  phase_3_naming_reveal:
    present: [Y/N]
    has_anticipation_buildup: [Y/N]
    naming_is_dramatic: [Y/N]

  phase_4_mechanism_explanation:
    present: [Y/N]
    uses_metaphor_anchor: [Y/N]
    uses_think_about_it: [Y/N]
    escalates_simple_to_complex: [Y/N]

  phase_5_proof_integration:
    present: [Y/N]
    proof_is_woven: [Y/N]  # NOT bullet lists
    institutional_stacking_OR_escalating: [Y/N]

  phase_6_product_bridge:
    present: [Y/N]
    transitions_to_product: [Y/N]

  IF any_phase.present == N:
    HALT — "All 6 phases required"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "5 phases is enough" | 6-phase structure is MANDATORY | HALT — Add missing phase |
| "metaphor is optional" | Metaphor is REQUIRED for comprehension | HALT — Create metaphor |
| "readers understand technical" | 12-year-old test is mandatory | HALT — Simplify |
| "proof list is clearer" | Proof must be WOVEN into narrative | HALT — Rewrite |
| "hedge words are safe" | Hedge words kill believability | HALT — Remove all |
| "naming happens naturally" | Naming moment must be DRAMATIC | HALT — Build anticipation |

---

## STRUCTURAL FIX 4: HEDGE WORD GATE

### The Problem
AI uses hedge words that undermine mechanism credibility.

### The Fix

**ZERO HEDGE WORDS ALLOWED:**

```yaml
hedge_word_scan:
  forbidden_words:
    - "may"
    - "might"
    - "could"
    - "potentially"
    - "possibly"
    - "perhaps"
    - "it seems"
    - "appears to"
    - "tends to"
    - "can sometimes"

  scan_result:
    hedge_words_found: [list]
    count: [number]

  IF count > 0:
    HALT — "Zero hedge words allowed in mechanism narrative"
    words_to_remove: [list]
    suggested_replacements:
      "may help" → "helps"
      "could reduce" → "reduces"
      "might improve" → "improves"
```

---

## STRUCTURAL FIX 5: METAPHOR ANCHOR GATE

### The Problem
AI explains mechanisms technically without graspable mental image.

### The Fix

**MANDATORY METAPHOR ANCHOR:**

```yaml
metaphor_validation:
  metaphor_present: [Y/N]
  metaphor_text: "[the metaphor used]"

  metaphor_criteria:
    everyday_object_or_concept: [Y/N]  # Switch, valve, key, door, etc.
    visual_and_graspable: [Y/N]
    explains_function: [Y/N]
    12_year_old_would_understand: [Y/N]

  IF metaphor_present == N:
    HALT — "Mechanism must have metaphor anchor"

  IF any_criteria == N:
    HALT — "Metaphor fails criteria: [which one]"

  good_metaphor_examples:
    - "AMPK acts like an on-off switch"
    - "HSL is like a one-way valve"
    - "Think of it like a key that fits only one lock"
    - "Imagine your metabolism has a dimmer switch"
```

---

## STRUCTURAL FIX 6: NAMING MOMENT GATE

### The Problem
AI introduces mechanism name without dramatic buildup.

### The Fix

**DRAMATIC NAMING VALIDATION:**

```yaml
naming_moment_validation:
  naming_position_in_narrative: "[early | middle | late]"

  anticipation_buildup:
    teased_before_reveal: [Y/N]
    curiosity_created: [Y/N]
    reveal_feels_earned: [Y/N]

  naming_structure:
    has_anticipation_phrase: [Y/N]  # "I call it...", "Scientists named it...", "It's called..."
    name_stands_alone: [Y/N]  # Not buried in sentence

  IF any_element == N:
    HALT — "Naming moment must be dramatic with anticipation"

  good_naming_examples:
    - "After months of research, I finally understood what was happening. I call it the [NAME]."
    - "Scientists have a name for this phenomenon: the [NAME]."
    - "There's a reason nothing worked before. It's called [NAME]."
```

---

## STRUCTURAL FIX 7: MECH-NARRATIVE-SPECIFIC MC-CHECK

```yaml
MECH-NARRATIVE-MC-CHECK:
  timestamp: "[current time]"

  human_checkpoint_verification:
    mechanism_confirmed_by_human: [Y/N]
    if_no: "STOP — Human must confirm mechanism before narrative begins"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  structure_verification:
    phases_present: [number]
    if_under_6: "STOP — All 6 phases required"

  metaphor_verification:
    metaphor_present: [Y/N]
    passes_12yo_test: [Y/N]
    if_any_no: "STOP — Metaphor anchor required"

  naming_verification:
    naming_moment_dramatic: [Y/N]
    has_anticipation: [Y/N]
    if_any_no: "STOP — Naming moment must be dramatic"

  hedge_word_verification:
    hedge_words_found: [number]
    if_above_0: "STOP — Zero hedge words allowed"

  think_about_it_verification:
    simplification_moment_present: [Y/N]
    if_no: "STOP — 'Think about it' simplification required"

  proof_verification:
    proof_woven: [Y/N]
    proof_as_lists: [Y/N]
    if_proof_as_lists: "STOP — Proof must be woven, not listed"

  result: [CONTINUE | HALT_HUMAN | HALT_SPECIMENS | HALT_STRUCTURE | HALT_METAPHOR | HALT_NAMING | HALT_HEDGE | HALT_PROOF]
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 0 (FOUNDATION + HUMAN CHECKPOINT):
[ ] Upstream packages loaded (04-mechanism, campaign-brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Mechanism package reviewed
[ ] HUMAN CONFIRMS mechanism to use
[ ] LAYER_0_COMPLETE.yaml created (with human confirmation)

LAYER 1 (CLASSIFICATION):
[ ] Narrative type classified
[ ] Simplification technique selected
[ ] Type-matched specimens loaded VERBATIM
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DRAFT):
[ ] All 6 phases drafted
[ ] Phase 3 has dramatic naming moment
[ ] Phase 4 has metaphor anchor
[ ] Phase 4 has "Think about it" simplification
[ ] Phase 5 has proof WOVEN (not listed)
[ ] Zero hedge words
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
[ ] 12-year-old comprehension test passes
[ ] Proof fully integrated (not academic citations)
[ ] Anti-slop passed
[ ] Score >= 7.0
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] mechanism-narrative-package.json created
[ ] MECHANISM-NARRATIVE-SUMMARY.md created

ON CONTEXT RESUME:
[ ] VERIFY human confirmed mechanism (LAYER_0)
[ ] VERIFY specimens loaded
[ ] VERIFY all 6 phases present
[ ] VERIFY zero hedge words
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"Mechanism without metaphor is incomprehensible. Naming without anticipation is forgettable. Hedge words kill believability."**

---

## STRUCTURAL FIX 8: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/14-mechanism-narrative/checkpoints/ARENA_COMPLETE.yaml
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
[project]/14-mechanism-narrative/checkpoints/LAYER_0_COMPLETE.yaml
[project]/14-mechanism-narrative/checkpoints/LAYER_1_COMPLETE.yaml
[project]/14-mechanism-narrative/checkpoints/LAYER_2_COMPLETE.yaml
[project]/14-mechanism-narrative/checkpoints/ARENA_COMPLETE.yaml    <- NEW (MANDATORY)
[project]/14-mechanism-narrative/checkpoints/LAYER_3_COMPLETE.yaml
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
