# CLOSE-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent close skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates closes WITHOUT loading type-matched specimens
- AI creates benefit summary under 5 "You get" items (Element #1 violation)
- AI writes guarantee as "if not satisfied, return for refund" (Element #2 violation)
- AI produces fewer than 6 CTAs or identical CTA phrases (Element #3 violation)
- AI skips specific action instructions (Element #4 violation)
- AI creates weak P.S. sections that don't advance the close (Element #5 violation)
- AI uses generic urgency without justification
- AI creates fabricated crossroads that prospects see through
- AI selects close without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/17-close/checkpoints/LAYER_0_COMPLETE.yaml  # Human confirms close approach
[project]/17-close/checkpoints/LAYER_1_COMPLETE.yaml
[project]/17-close/checkpoints/LAYER_2_COMPLETE.yaml
[project]/17-close/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/17-close/checkpoints/LAYER_3_COMPLETE.yaml
[project]/17-close/HUMAN_SELECTION.yaml  # BLOCKING
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
[project]/17-close/checkpoints/LAYER_2_COMPLETE.yaml

**Layer 3 CANNOT execute unless BOTH files exist:**
[project]/17-close/checkpoints/LAYER_2_COMPLETE.yaml
[project]/17-close/checkpoints/ARENA_COMPLETE.yaml

### LAYER 0 HUMAN CHECKPOINT (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml

human_checkpoint:
  close_approach_confirmed: true
  confirmed_by: "human"
  timestamp: "[ISO 8601]"
  closing_theme: "[crossroads | logical_restatement | reasons_why | dont_go_alone | simple_restatement | but_wait | usp_close]"

  IF close_approach_confirmed != true:
    HALT — "Cannot proceed without human confirmation of close approach"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **"You get" items** | 5 minimum | HALT — Add items |
| **CTAs (different)** | 6-10 range | HALT — Add CTAs |
| **CTA variety** | Different phrases/emotions | HALT — Vary CTAs |
| **Guarantee** | Contract/promise format | HALT — Rewrite |
| **Action instructions** | Specific steps | HALT — Add clarity |
| **P.S. sections** | 1+ using Makepeace techniques | HALT — Strengthen P.S. |
| **6 Makepeace elements** | 6/6 | HALT — Complete all |
| **Arena personas** | 6/6 | HALT — All generate |
| **Human selection** | BLOCKING | HALT — Get selection |

### The 6 Makepeace Foundational Elements (ALL MUST BE PRESENT)

```yaml
six_elements_validation:
  element_1_benefit_summary:
    present: [Y/N]
    uses_you_get_format: [Y/N]
    item_count: [number]  # Must be >= 5

  element_2_guarantee_as_confidence:
    present: [Y/N]
    format: "[contract | promise | generic]"  # Must NOT be generic
    written_as_commitment: [Y/N]  # Not "if not satisfied, return for refund"

  element_3_ask_for_sale:
    present: [Y/N]
    cta_count: [number]  # Must be 6-10
    phrases_different: [Y/N]
    emotions_varied: [Y/N]

  element_4_tell_what_to_do:
    present: [Y/N]
    step_by_step: [Y/N]
    checkout_process_clear: [Y/N]

  element_5_ps_power_section:
    present: [Y/N]
    technique_used: "[bonus | testimonial | guarantee_restatement | urgency_reason]"
    advances_close: [Y/N]  # Not "P.S. Don't forget"

  element_6_sidebars_callouts:
    present: [Y/N]
    type: "[value | risk_relief | proof]"

  total_present: [number]
  required: 6

  IF total_present < 6:
    HALT — "All 6 Makepeace elements required"
    missing: [list missing elements]
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "3-4 You get items covers it" | Minimum 5 items required (Element #1) | HALT — Add items |
| "money-back guarantee is clear" | Guarantee must be CONTRACT format (Element #2) | HALT — Rewrite |
| "5 CTAs is enough" | 6-10 CTAs required with variety (Element #3) | HALT — Add CTAs |
| "action is obvious" | Step-by-step instructions required (Element #4) | HALT — Add clarity |
| "P.S. is just a reminder" | P.S. must ADVANCE the close (Element #5) | HALT — Strengthen |
| "limited time" urgency" | Urgency must be JUSTIFIED | HALT — Add reason |
| "crossroads is a close pattern" | Crossroads must be SINCERE, not fabricated | HALT — Authentify |

---

## STRUCTURAL FIX 4: CTA VARIETY GATE

### The Problem
AI creates identical or near-identical CTA phrases, causing prospect fatigue.

### The Fix

**CTA COMPREHENSIVE VALIDATION:**

```yaml
cta_validation:
  total_ctas: [number]
  minimum_required: 6
  maximum_recommended: 10

  phrase_variety_check:
    cta_texts: [list all CTA phrases]
    all_different: [Y/N]

  emotional_variety_check:
    emotions_used: [list]  # confidence, consequence, urgency, curiosity, fear, hope
    minimum_3_different: [Y/N]

  reason_variety_check:
    different_reasons_given: [Y/N]  # Why click NOW

  IF total_ctas < 6:
    HALT — "Element #3 violation: Minimum 6 CTAs required"

  IF all_different == N:
    HALT — "CTAs must have DIFFERENT phrases"

  IF minimum_3_different == N:
    HALT — "CTAs must appeal to at least 3 DIFFERENT emotions"
```

---

## STRUCTURAL FIX 5: GUARANTEE FORMAT GATE

### The Problem
AI defaults to generic "money-back guarantee" language instead of confidence-building contract format.

### The Fix

**GUARANTEE FORMAT VALIDATION:**

```yaml
guarantee_validation:
  guarantee_text: "[the actual guarantee text]"

  forbidden_patterns_check:
    contains_if_not_satisfied: [Y/N]  # Should be N
    contains_return_for_refund: [Y/N]  # Should be N
    uses_generic_money_back: [Y/N]  # Should be N

  required_patterns_check:
    written_as_commitment: [Y/N]  # Should be Y
    feels_like_contract: [Y/N]  # Should be Y
    demonstrates_confidence: [Y/N]  # Should be Y

  IF any_forbidden_pattern == Y:
    HALT — "Element #2 violation: Guarantee must be CONTRACT format, not generic refund policy"

  rewrite_guidance:
    bad: "If you're not satisfied, return for a full refund"
    good: "I'm so confident [Product] will [specific result] that I'm putting my reputation on the line..."
```

---

## STRUCTURAL FIX 6: CLOSE-SPECIFIC MC-CHECK

```yaml
CLOSE-MC-CHECK:
  timestamp: "[current time]"

  human_checkpoint_verification:
    close_approach_confirmed_by_human: [Y/N]
    if_no: "STOP — Human must confirm close approach before drafting"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  benefit_summary_verification:
    you_get_format: [Y/N]
    item_count: [number]
    if_under_5: "STOP — Element #1: Minimum 5 'You get' items"

  guarantee_verification:
    contract_format: [Y/N]
    not_generic: [Y/N]
    if_any_no: "STOP — Element #2: Guarantee must be contract format"

  cta_verification:
    cta_count: [number]
    if_under_6: "STOP — Element #3: Minimum 6 CTAs"
    phrases_different: [Y/N]
    emotions_varied: [Y/N]
    if_any_no: "STOP — CTAs must have variety in phrase and emotion"

  action_instructions_verification:
    step_by_step: [Y/N]
    checkout_clear: [Y/N]
    if_any_no: "STOP — Element #4: Specific action instructions required"

  ps_verification:
    present: [Y/N]
    advances_close: [Y/N]
    if_any_no: "STOP — Element #5: P.S. must advance the close"

  elements_verification:
    elements_present: [number]
    if_under_6: "STOP — All 6 Makepeace elements required"

  result: [CONTINUE | HALT_HUMAN | HALT_SPECIMENS | HALT_ELEMENTS | HALT_CTA | HALT_GUARANTEE]
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 0 (FOUNDATION + HUMAN CHECKPOINT):
[ ] Upstream packages loaded (offer-copy, campaign-brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Close approach reviewed with human
[ ] HUMAN CONFIRMS closing theme
[ ] LAYER_0_COMPLETE.yaml created (with human confirmation)

LAYER 1 (CLASSIFICATION):
[ ] Closing theme selected (1 of 7 Makepeace themes)
[ ] Benefit summary designed (5+ items)
[ ] CTA plan has 6-10+ asks with variety
[ ] P.S. strategy selected
[ ] Type-matched specimens loaded VERBATIM
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DRAFT):
[ ] Benefit summary uses "You get" (5+ items)
[ ] Guarantee is contract/promise (not generic)
[ ] Closing theme section complete
[ ] CTA sequence has 6+ with variety in phrase/emotion/reason
[ ] Action instructions specific with checkout clarity
[ ] P.S. written using Makepeace techniques
[ ] Sidebars/callouts present
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
[ ] Urgency justified with real-world reason
[ ] Crossroads/future pacing vivid (if applicable)
[ ] Cialdini integration subtle
[ ] Checkout process clear
[ ] All 6 Makepeace elements validated
[ ] Anti-slop passed
[ ] Score >= 7.0
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] close-package.json created
[ ] CLOSE-SUMMARY.md created

ON CONTEXT RESUME:
[ ] VERIFY human confirmed close approach (LAYER_0)
[ ] VERIFY specimens loaded
[ ] VERIFY 6/6 Makepeace elements present
[ ] VERIFY 6+ CTAs with variety
[ ] VERIFY guarantee is contract format
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"Guarantee as policy says 'we have a return process.' Guarantee as contract says 'I'm betting my reputation.' CTAs without variety cause prospect fatigue at the moment of decision."**

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/17-close/checkpoints/ARENA_COMPLETE.yaml
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
[project]/17-close/checkpoints/LAYER_1_COMPLETE.yaml
[project]/17-close/checkpoints/LAYER_2_COMPLETE.yaml
[project]/17-close/checkpoints/ARENA_COMPLETE.yaml    ← NEW (MANDATORY)
[project]/17-close/checkpoints/LAYER_3_COMPLETE.yaml
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
