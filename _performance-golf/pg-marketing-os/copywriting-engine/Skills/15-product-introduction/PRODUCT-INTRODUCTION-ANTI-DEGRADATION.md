# PRODUCT-INTRODUCTION-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent product introduction skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates product introductions WITHOUT loading type-matched specimens
- AI creates bridge moments that feel like "now I'm selling" (pitch shift)
- AI positions product as hero instead of mechanism (Principle #1 violation)
- AI presents components as features without proof packages (Principle #4 violation)
- AI reveals price before value stack established (Principle #5 violation)
- AI uses generic "money-back guarantee" instead of branded guarantee (Principle #6 violation)
- AI uses urgency/scarcity without justified real-world reason (Principle #7 violation)
- AI selects product intro without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/15-product-introduction/checkpoints/LAYER_0_COMPLETE.yaml  # Human confirms product details
[project]/15-product-introduction/checkpoints/LAYER_1_COMPLETE.yaml
[project]/15-product-introduction/checkpoints/LAYER_2_COMPLETE.yaml
[project]/15-product-introduction/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/15-product-introduction/checkpoints/LAYER_3_COMPLETE.yaml
[project]/15-product-introduction/HUMAN_SELECTION.yaml  # BLOCKING
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
[project]/15-product-introduction/checkpoints/LAYER_2_COMPLETE.yaml

**Layer 3 CANNOT execute unless BOTH files exist:**
[project]/15-product-introduction/checkpoints/LAYER_2_COMPLETE.yaml
[project]/15-product-introduction/checkpoints/ARENA_COMPLETE.yaml

### LAYER 0 HUMAN CHECKPOINT (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml

human_checkpoint:
  product_details_confirmed: true
  confirmed_by: "human"
  timestamp: "[ISO 8601]"
  product_name: "[exact product name]"
  price_points_confirmed: [Y/N]
  component_list_confirmed: [Y/N]

  IF product_details_confirmed != true:
    HALT — "Cannot proceed without human confirmation of product details"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **8 principles validated** | 8/8 | HALT — Fix violations |
| **Bridge architecture** | Assigned | HALT — Select architecture |
| **Component proof packages** | All components | HALT — Add proof |
| **Value stack** | Before price | HALT — Resequence |
| **Guarantee** | Branded/named | HALT — Brand guarantee |
| **Scarcity/urgency** | Justified | HALT — Add justification |
| **Arena personas** | 6/6 | HALT — All generate |
| **Human selection** | BLOCKING | HALT — Get selection |

### The 8 Master Principles (ALL MUST VALIDATE)

```yaml
eight_principles_validation:
  principle_1_product_never_hero:
    validated: [Y/N]
    mechanism_is_hero: [Y/N]

  principle_2_withholding_creates_value:
    validated: [Y/N]
    product_name_position: "[percentage]"  # Should be 60-75% in story formats

  principle_3_bridge_moment_dangerous:
    validated: [Y/N]
    feels_natural: [Y/N]
    no_pitch_shift: [Y/N]

  principle_4_components_are_proof:
    validated: [Y/N]
    all_components_have_proof: [Y/N]

  principle_5_value_before_price:
    validated: [Y/N]
    value_stack_precedes_price: [Y/N]

  principle_6_guarantees_named_branded:
    validated: [Y/N]
    guarantee_name: "[specific name]"
    not_generic: [Y/N]

  principle_7_scarcity_justified:
    validated: [Y/N]
    justification: "[real-world reason]"

  principle_8_close_is_binary:
    validated: [Y/N]
    two_futures_presented: [Y/N]

  total_passing: [number]
  required: 8

  IF total_passing < 8:
    HALT — "All 8 principles must validate"
    failures: [list failed principles]
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "product can be hero sometimes" | Mechanism is ALWAYS hero (Principle #1) | HALT — Reposition |
| "bridge shift is natural in sales" | Pitch shift kills rapport (Principle #3) | HALT — Smooth bridge |
| "features speak for themselves" | Components need proof packages (Principle #4) | HALT — Add proof |
| "price can come first for transparency" | Value stack MUST precede price (Principle #5) | HALT — Resequence |
| "money-back guarantee is clear" | Guarantees must be BRANDED (Principle #6) | HALT — Name guarantee |
| "limited time is understood" | Urgency must be JUSTIFIED (Principle #7) | HALT — Add reason |

---

## STRUCTURAL FIX 4: BRIDGE MOMENT GATE

### The Problem
AI creates bridge moments that feel like "now I'm selling" — breaking rapport and triggering prospect resistance.

### The Fix

**BRIDGE SMOOTHNESS VALIDATION:**

```yaml
bridge_validation:
  bridge_architecture_selected: "[type]"

  pitch_shift_detection:
    tone_change_detected: [Y/N]  # Should be N
    "now_im_selling_feeling": [Y/N]  # Should be N
    natural_continuation: [Y/N]  # Should be Y

  mechanism_to_product_connection:
    mechanism_naturally_leads_to_product: [Y/N]
    product_feels_inevitable_solution: [Y/N]

  IF tone_change_detected == Y:
    HALT — "Bridge moment fails — pitch shift detected"

  IF natural_continuation == N:
    HALT — "Bridge must feel like natural conclusion, not commercial pivot"
```

---

## STRUCTURAL FIX 5: PRICE-VALUE SEQUENCE GATE

### The Problem
AI reveals price before establishing value, triggering price resistance.

### The Fix

**VALUE-PRICE SEQUENCE VALIDATION:**

```yaml
sequence_validation:
  value_stack:
    total_value_established: [Y/N]
    value_amount: "$[amount]"
    position_in_copy: "[early | middle | late]"

  price_reveal:
    position_in_copy: "[early | middle | late]"
    anchor_cascade_used: [Y/N]
    comparison_anchor_present: [Y/N]

  sequence_check:
    value_before_price: [Y/N]

  IF value_before_price == N:
    HALT — "Principle #5 violation: Value must be established BEFORE price reveal"
```

---

## STRUCTURAL FIX 6: PRODUCT-INTRO-SPECIFIC MC-CHECK

```yaml
PRODUCT-INTRO-MC-CHECK:
  timestamp: "[current time]"

  human_checkpoint_verification:
    product_details_confirmed_by_human: [Y/N]
    if_no: "STOP — Human must confirm product details before drafting"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  bridge_verification:
    bridge_feels_natural: [Y/N]
    no_pitch_shift: [Y/N]
    if_any_no: "STOP — Fix bridge moment"

  principles_verification:
    principles_passing: [number]
    if_under_8: "STOP — All 8 principles must pass"

    principle_1_mechanism_hero: [Y/N]
    if_no: "🛑 CRITICAL: Product is not the hero — mechanism is"

    principle_5_value_before_price: [Y/N]
    if_no: "🛑 CRITICAL: Value stack must precede price"

    principle_6_guarantee_branded: [Y/N]
    if_no: "🛑 CRITICAL: Guarantee must be named, not generic"

  result: [CONTINUE | HALT_HUMAN | HALT_SPECIMENS | HALT_BRIDGE | HALT_PRINCIPLES]
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 0 (FOUNDATION + HUMAN CHECKPOINT):
[ ] Upstream packages loaded (mechanism-narrative, campaign-brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Product details reviewed with human
[ ] HUMAN CONFIRMS product name, price points, components
[ ] LAYER_0_COMPLETE.yaml created (with human confirmation)

LAYER 1 (CLASSIFICATION):
[ ] Introduction type classified
[ ] Bridge architecture selected
[ ] Component reveal pattern selected
[ ] Price reveal architecture selected
[ ] Type-matched specimens loaded VERBATIM
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DRAFT):
[ ] Bridge moment drafted (no pitch shift)
[ ] Product revealed with positioning statement
[ ] All components revealed with proof packages
[ ] Value stack assembled with total value
[ ] Price revealed through appropriate architecture
[ ] Guarantee branded with specific name
[ ] Scarcity justified with real-world reason
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
[ ] All 8 principles validated
[ ] Binary choice established for close handoff
[ ] Anti-slop passed
[ ] Score >= 7.0
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] product-introduction-package.json created
[ ] PRODUCT-INTRODUCTION-SUMMARY.md created

ON CONTEXT RESUME:
[ ] VERIFY human confirmed product details (LAYER_0)
[ ] VERIFY specimens loaded
[ ] VERIFY 8/8 principles pass
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"The bridge moment is the most dangerous transition in any promotion. Product never hero — mechanism is. Generic guarantees signal generic products."**

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/15-product-introduction/checkpoints/ARENA_COMPLETE.yaml
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
[project]/15-product-introduction/checkpoints/LAYER_1_COMPLETE.yaml
[project]/15-product-introduction/checkpoints/LAYER_2_COMPLETE.yaml
[project]/15-product-introduction/checkpoints/ARENA_COMPLETE.yaml    ← NEW (MANDATORY)
[project]/15-product-introduction/checkpoints/LAYER_3_COMPLETE.yaml
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
