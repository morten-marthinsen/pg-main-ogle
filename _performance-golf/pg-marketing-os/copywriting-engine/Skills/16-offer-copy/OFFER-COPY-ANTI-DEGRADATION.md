# OFFER-COPY-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent offer copy skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates offer copy WITHOUT loading type-matched specimens
- AI presents deliverables as features without D-F-W-B-P format (Principle #1 violation)
- AI repeats identical promise text instead of restating differently (Principle #2 violation)
- AI reveals price before establishing value stack (Principle #3 violation)
- AI skips "if all it did was..." value demonstration (Principle #4 violation)
- AI uses generic "money-back guarantee" (Principle #5 violation)
- AI creates fewer than 3 CTAs or identical CTA language (Principle #6 violation)
- AI adds urgency without justified reason (Principle #8 violation)
- AI selects offer copy without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/16-offer-copy/checkpoints/LAYER_0_COMPLETE.yaml  # Human confirms offer details
[project]/16-offer-copy/checkpoints/LAYER_1_COMPLETE.yaml
[project]/16-offer-copy/checkpoints/LAYER_2_COMPLETE.yaml
[project]/16-offer-copy/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/16-offer-copy/checkpoints/LAYER_3_COMPLETE.yaml
[project]/16-offer-copy/HUMAN_SELECTION.yaml  # BLOCKING
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
[project]/16-offer-copy/checkpoints/LAYER_2_COMPLETE.yaml

**Layer 3 CANNOT execute unless BOTH files exist:**
[project]/16-offer-copy/checkpoints/LAYER_2_COMPLETE.yaml
[project]/16-offer-copy/checkpoints/ARENA_COMPLETE.yaml

### LAYER 0 HUMAN CHECKPOINT (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml

human_checkpoint:
  offer_details_confirmed: true
  confirmed_by: "human"
  timestamp: "[ISO 8601]"
  offer_format: "[supplement | info_product | digital_bundle | financial | service | hybrid]"
  deliverables_confirmed: [Y/N]
  bonuses_confirmed: [Y/N]
  price_point_confirmed: [Y/N]
  guarantee_terms_confirmed: [Y/N]

  IF offer_details_confirmed != true:
    HALT — "Cannot proceed without human confirmation of offer details"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **D-F-W-B-P format** | All deliverables & bonuses | HALT — Format all items |
| **"If all it did" iterations** | 3 minimum | HALT — Add iterations |
| **CTAs (different)** | 3 minimum | HALT — Add variety |
| **Guarantee** | Branded/named | HALT — Brand guarantee |
| **Urgency** | Justified | HALT — Add justification |
| **10 principles validated** | 10/10 | HALT — Fix violations |
| **Arena personas** | 6/6 | HALT — All generate |
| **Human selection** | BLOCKING | HALT — Get selection |

### The D-F-W-B-P Structure (MANDATORY FOR ALL ITEMS)

Every deliverable and bonus MUST include:

```yaml
dfwbp_validation:
  item_name: "[name]"

  deliverable: "[what they get]"
  present: [Y/N]

  feature: "[what it does/contains]"
  present: [Y/N]

  why: "[why this matters]"
  present: [Y/N]

  benefit: "[outcome for them]"
  present: [Y/N]

  proof: "[evidence it works]"
  present: [Y/N]

  IF any_element.present == N:
    HALT — "D-F-W-B-P incomplete for: [item_name]"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "features are self-explanatory" | D-F-W-B-P is MANDATORY for all items | HALT — Complete format |
| "two value demos is enough" | Minimum 3 "if all it did was..." required | HALT — Add iteration |
| "CTA variety is minor" | Identical CTAs cause prospect fatigue | HALT — Vary language |
| "money-back is universal" | Guarantee must be BRANDED (Principle #5) | HALT — Name guarantee |
| "limited time is understood" | Urgency must be JUSTIFIED | HALT — Add reason |
| "promise restating is repetitive" | DIFFERENT words each time (Principle #2) | HALT — Vary language |
| "value is implied by components" | Value totaling MUST precede price | HALT — Calculate total |

---

## STRUCTURAL FIX 4: VALUE DEMONSTRATION GATE

### The Problem
AI skips or abbreviates the "if all it did was..." value demonstration framework.

### The Fix

**MANDATORY VALUE DEMONSTRATION:**

```yaml
value_demonstration_validation:
  iterations_present: [number]
  minimum_required: 3

  iteration_1:
    benefit: "[specific benefit]"
    would_it_be_worth_it: [present]
    reason_why: "[specific reason]"

  iteration_2:
    benefit: "[DIFFERENT benefit]"
    would_it_be_worth_it: [present]
    reason_why: "[specific reason]"

  iteration_3:
    benefit: "[DIFFERENT benefit]"
    would_it_be_worth_it: [present]
    reason_why: "[specific reason]"

  benefits_are_different: [Y/N]  # Cannot be variations of same benefit

  IF iterations_present < 3:
    HALT — "Principle #4 violation: Minimum 3 value demonstration iterations required"

  IF benefits_are_different == N:
    HALT — "Each iteration must use a DIFFERENT benefit, not variations"
```

---

## STRUCTURAL FIX 5: CTA VARIETY GATE

### The Problem
AI creates identical or near-identical CTA language throughout offer copy.

### The Fix

**CTA VARIETY VALIDATION:**

```yaml
cta_validation:
  total_ctas: [number]
  minimum_required: 3

  cta_analysis:
    - cta_1:
        text: "[CTA text]"
        emotional_appeal: "[confidence | consequence | urgency | curiosity | fear | hope]"
    - cta_2:
        text: "[CTA text]"
        emotional_appeal: "[different from cta_1]"
    - cta_3:
        text: "[CTA text]"
        emotional_appeal: "[different from cta_1 and cta_2]"

  variety_check:
    all_texts_different: [Y/N]
    at_least_3_emotional_appeals: [Y/N]

  IF total_ctas < 3:
    HALT — "Principle #6 violation: Minimum 3 CTAs required"

  IF all_texts_different == N:
    HALT — "CTAs must have DIFFERENT language"

  IF at_least_3_emotional_appeals == N:
    HALT — "CTAs must appeal to DIFFERENT emotions"
```

---

## STRUCTURAL FIX 6: THE 10 PRINCIPLES GATE

### All 10 Principles MUST Pass

```yaml
ten_principles_validation:
  principle_1_dfwbp_sacred: [PASS | FAIL]
    detail: "Every deliverable/bonus follows D-F-W-B-P"

  principle_2_promise_restated_not_repeated: [PASS | FAIL]
    detail: "Primary promise appears with DIFFERENT words"

  principle_3_value_before_price: [PASS | FAIL]
    detail: "Total value established before price reveal"

  principle_4_if_all_it_did: [PASS | FAIL]
    detail: "3+ value demonstration iterations"

  principle_5_guarantee_is_feature: [PASS | FAIL]
    detail: "Guarantee is BRANDED and NAMED"

  principle_6_three_ctas_minimum: [PASS | FAIL]
    detail: "3+ CTAs with DIFFERENT emotional appeals"

  principle_7_consequence_amplification: [PASS | FAIL]
    detail: "Pain/frustration reminder between CTAs"

  principle_8_urgency_justified: [PASS | FAIL]
    detail: "Urgency has specific, credible reason"

  principle_9_stack_review_before_price: [PASS | FAIL]
    detail: "Full stack re-listed with values before price"

  principle_10_seamless_entry: [PASS | FAIL]
    detail: "First line flows from product introduction handoff"

  total_passing: [number]
  required: 10

  IF total_passing < 10:
    HALT — "All 10 offer copy principles must pass"
    failures: [list failed principles]
```

---

## STRUCTURAL FIX 7: OFFER-COPY-SPECIFIC MC-CHECK

```yaml
OFFER-COPY-MC-CHECK:
  timestamp: "[current time]"

  human_checkpoint_verification:
    offer_details_confirmed_by_human: [Y/N]
    if_no: "STOP — Human must confirm offer details before drafting"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  dfwbp_verification:
    all_deliverables_complete: [Y/N]
    all_bonuses_complete: [Y/N]
    if_any_no: "STOP — D-F-W-B-P required for all items"

  value_demo_verification:
    iterations_present: [number]
    if_under_3: "STOP — Minimum 3 value demonstration iterations"

  cta_verification:
    ctas_present: [number]
    if_under_3: "STOP — Minimum 3 CTAs with variety"
    cta_variety: [Y/N]
    if_no: "STOP — CTAs must have different language and emotions"

  principles_verification:
    principles_passing: [number]
    if_under_10: "STOP — All 10 principles must pass"

  result: [CONTINUE | HALT_HUMAN | HALT_SPECIMENS | HALT_DFWBP | HALT_VALUE | HALT_CTA | HALT_PRINCIPLES]
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 0 (FOUNDATION + HUMAN CHECKPOINT):
[ ] Upstream packages loaded (product-introduction, offer-package, campaign-brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Offer details reviewed with human
[ ] HUMAN CONFIRMS deliverables, bonuses, price, guarantee terms
[ ] LAYER_0_COMPLETE.yaml created (with human confirmation)

LAYER 1 (CLASSIFICATION):
[ ] Offer format classified
[ ] D-F-W-B-P sequence mapped for all items
[ ] Value demo designed (3+ iterations)
[ ] Price presentation planned
[ ] Type-matched specimens loaded VERBATIM
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DRAFT):
[ ] All deliverables in D-F-W-B-P format
[ ] All bonuses in D-F-W-B-P format with values
[ ] 3+ "if all it did was..." iterations
[ ] Price revealed with anchoring
[ ] Guarantee branded with specific name
[ ] 3+ CTAs with variety
[ ] Consequence amplification between CTAs
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
[ ] Promise restated with variety (not repeated)
[ ] Emotional arc ascending
[ ] Urgency justified
[ ] Stack review before price
[ ] All 10 principles validated
[ ] Anti-slop passed
[ ] Score >= 7.0
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] offer-copy-package.json created
[ ] OFFER-COPY-SUMMARY.md created

ON CONTEXT RESUME:
[ ] VERIFY human confirmed offer details (LAYER_0)
[ ] VERIFY specimens loaded
[ ] VERIFY all D-F-W-B-P complete
[ ] VERIFY 3+ value demo iterations
[ ] VERIFY 3+ CTAs with variety
[ ] VERIFY 10/10 principles pass
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"D-F-W-B-P is sacred — features without format are forgettable. 'If all it did' is not optional — it's the value demonstration framework. Identical CTAs cause prospect fatigue."**

---

## STRUCTURAL FIX 8: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/16-offer-copy/checkpoints/ARENA_COMPLETE.yaml
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
[project]/16-offer-copy/checkpoints/LAYER_1_COMPLETE.yaml
[project]/16-offer-copy/checkpoints/LAYER_2_COMPLETE.yaml
[project]/16-offer-copy/checkpoints/ARENA_COMPLETE.yaml    ← NEW (MANDATORY)
[project]/16-offer-copy/checkpoints/LAYER_3_COMPLETE.yaml
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
