# OFFER-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent offer skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI skips value equation optimization (4 components required)
- AI produces fewer than 3 bonuses
- AI skips guarantee architecture (leaves generic "money-back")
- AI doesn't calculate value-to-price ratio
- AI skips scarcity/urgency justification
- AI produces offer without branded naming

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/07-offer/checkpoints/LAYER_1_COMPLETE.yaml
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/07-offer/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/07-offer/checkpoints/LAYER_2_COMPLETE.yaml
[project]/07-offer/checkpoints/ARENA_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/07-offer/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "07-offer"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  value_equation_components:
    required: 4
    actual: [number]
    verified: true
  bonuses_created:
    required: 3
    actual: [number]
    verified: true
  guarantee_branded:
    required: true
    actual: [Y/N]
    verified: true
  value_to_price_ratio:
    minimum: 10
    actual: [number]
    verified: true

completeness:
  all_microskills_executed: true
  minimum_thresholds_met: true
  quality_gates_passed: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Value equation components** | 4/4 | HALT — All components required |
| **Bonuses** | 3 | HALT — Create more bonuses |
| **Value-to-price ratio** | 10:1 | HALT — Increase perceived value |
| **Guarantee** | Branded/named | HALT — No generic guarantees |
| **Scarcity justification** | Real reason | HALT — No fake scarcity |
| **Urgency justification** | Real reason | HALT — No fake urgency |

### The 4 Value Equation Components (Hormozi Model)

Every offer MUST optimize ALL 4 components:

| Component | Formula Direction | Check |
|-----------|-------------------|-------|
| **Dream Outcome** | MAXIMIZE | [ ] Outcome clearly defined and desirable |
| **Perceived Likelihood** | MAXIMIZE | [ ] Proof makes success feel achievable |
| **Time Delay** | MINIMIZE | [ ] Results come quickly |
| **Effort & Sacrifice** | MINIMIZE | [ ] Easy to implement |

```
Value = (Dream Outcome × Perceived Likelihood) / (Time Delay × Effort)
```

**IF ANY COMPONENT UNADDRESSED → OFFER INCOMPLETE**

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

**FORBIDDEN RATIONALIZATIONS — These statements are INVALID and trigger immediate HALT:**

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "2 bonuses are enough" | Minimum 3 bonuses required | HALT — Create 3rd bonus |
| "money-back guarantee is fine" | Guarantee must be BRANDED | HALT — Name the guarantee |
| "limited time creates urgency" | Urgency needs REAL reason | HALT — Justify the deadline |
| "scarcity sells" | Scarcity needs REAL constraint | HALT — Justify the limit |
| "value is obvious" | Value must be CALCULATED and stated | HALT — Calculate value stack |
| "10:1 ratio is aspirational" | 10:1 is the NON-NEGOTIABLE minimum | HALT — Increase value |

### Enforcement Protocol

```
DURING OFFER EXECUTION:

IF you find yourself thinking ANY of the above rationalizations:
  1. STOP immediately
  2. OUTPUT: "🛑 RATIONALIZATION DETECTED: [which one]"
  3. Do NOT act on the rationalization
  4. Return to proper execution

This is not optional. Rationalizations are degradation signals.
```

---

## STRUCTURAL FIX 4: GUARANTEE BRANDING GATE

### The Problem
AI produces generic "30-day money-back guarantee" which has zero persuasive power.

### The Fix

**MANDATORY GUARANTEE BRANDING:**

```yaml
guarantee_validation:
  guarantee_text: "[the guarantee]"

  is_generic: [Y/N]
    # Generic examples: "money-back guarantee," "satisfaction guaranteed," "risk-free"

  IF is_generic == Y:
    HALT — "Guarantee must be branded with specific name"

  branded_name: "[e.g., 'Triple-Your-Money Promise,' 'Results or Free Guarantee']"

  guarantee_type:
    unconditional: [Y/N]  # No questions asked
    conditional: [Y/N]    # Must do X first
    results_based: [Y/N]  # Specific outcome promised

  guarantee_features:
    time_period: "[X days]"
    what_they_get_back: "[money, double money, product + money, etc.]"
    how_to_claim: "[simple process]"

  branded_validation:
    has_unique_name: [Y/N]
    name_memorable: [Y/N]
    name_suggests_confidence: [Y/N]

    IF any == N:
      HALT — "Strengthen guarantee branding"
```

### Guarantee Naming Examples

| Generic (BAD) | Branded (GOOD) |
|---------------|----------------|
| "Money-back guarantee" | "The Triple-Your-Results Promise" |
| "Satisfaction guaranteed" | "The 'Love It or Eat Free' Guarantee" |
| "Risk-free trial" | "The 90-Day Transformation Test" |
| "Full refund policy" | "The 'See It Working' Guarantee" |

---

## STRUCTURAL FIX 5: VALUE STACK VALIDATION

### The Problem
AI produces offers without calculating the actual value-to-price ratio.

### The Fix

**MANDATORY VALUE STACK CALCULATION:**

```yaml
value_stack:
  core_product:
    item: "[main product/service]"
    stated_value: $[amount]
    value_justification: "[why it's worth this]"

  bonus_1:
    item: "[bonus name]"
    stated_value: $[amount]
    value_justification: "[why it's worth this]"

  bonus_2:
    item: "[bonus name]"
    stated_value: $[amount]
    value_justification: "[why it's worth this]"

  bonus_3:
    item: "[bonus name]"
    stated_value: $[amount]
    value_justification: "[why it's worth this]"

  total_value: $[sum]
  price: $[actual price]

  value_to_price_ratio: [total_value / price]

  IF value_to_price_ratio < 10:
    HALT — "Value-to-price ratio below 10:1"
    ACTION: "Add value OR justify current ratio"
```

---

## STRUCTURAL FIX 6: SCARCITY/URGENCY JUSTIFICATION GATE

### The Problem
AI adds "limited time" or "only X available" without real justification, which sophisticated prospects see through.

### The Fix

**MANDATORY SCARCITY JUSTIFICATION:**

```yaml
scarcity_validation:
  scarcity_claim: "[what's limited]"

  justification_type:
    production_constraint: [Y/N]  # "Only X made per batch"
    capacity_constraint: [Y/N]    # "We can only handle X clients"
    supply_constraint: [Y/N]      # "Ingredient is rare"
    time_constraint: [Y/N]        # "Offer expires when"

  real_reason_provided: [Y/N]
  reason_is_believable: [Y/N]

  IF real_reason_provided == N:
    HALT — "Scarcity needs real justification"

  IF reason_is_believable == N:
    HALT — "Scarcity justification not credible"

urgency_validation:
  urgency_claim: "[why act now]"

  justification_type:
    price_increase: [Y/N]         # "Price goes up on [date]"
    bonus_removal: [Y/N]          # "Bonuses only available until"
    seasonal_relevance: [Y/N]     # "Best time to start is now because"
    external_deadline: [Y/N]      # "Tax deadline," "enrollment closes"

  real_reason_provided: [Y/N]

  IF real_reason_provided == N:
    HALT — "Urgency needs real justification"
```

---

## STRUCTURAL FIX 7: OFFER-SPECIFIC MC-CHECK

**OFFER-MC-CHECK (Required at each layer transition):**

```yaml
OFFER-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [1 | 2 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP — Cannot proceed without checkpoint file"

  value_equation_verification:
    dream_outcome_defined: [Y/N]
    perceived_likelihood_addressed: [Y/N]
    time_delay_minimized: [Y/N]
    effort_sacrifice_minimized: [Y/N]
    if_any_no: "STOP — All 4 value equation components required"

  bonus_verification:
    bonuses_created: [number]
    if_under_3: "STOP — Minimum 3 bonuses required"

  guarantee_verification:
    guarantee_branded: [Y/N]
    if_no: "STOP — Guarantee must have branded name"

  value_stack_verification:
    value_to_price_ratio: [number]
    if_under_10: "STOP — Ratio must be 10:1 or higher"

  scarcity_urgency_verification:
    scarcity_justified: [Y/N]
    urgency_justified: [Y/N]
    if_any_no: "STOP — Justify scarcity/urgency with real reason"

  rationalization_check:
    am_i_accepting_generic_guarantee: [Y/N]
    am_i_skipping_value_calculation: [Y/N]
    am_i_using_fake_scarcity: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected"

  result: [CONTINUE | HALT_VALUE_EQUATION | HALT_BONUSES | HALT_GUARANTEE | HALT_RATIO | HALT_SCARCITY]
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 0 (FOUNDATION):
[ ] Upstream packages loaded (research, proof, root-cause, mechanism, promise)
[ ] Vault intelligence loaded
[ ] Teachings loaded
[ ] Input validated

LAYER 1 (CONSTRUCTION):
[ ] Dream outcome crystallized
[ ] Problem-solution mapped
[ ] Value equation optimized (all 4 components)
[ ] Delivery vehicle designed
[ ] Trim and stack architecture completed
[ ] Core offer defined
[ ] Construction gate passed
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (ENHANCEMENT):
[ ] Bonuses designed (3+ bonuses)
[ ] Guarantee architected (branded, not generic)
[ ] Scarcity strategist run (justified)
[ ] Urgency strategist run (justified)
[ ] Offer naming generated
[ ] Price architect executed
[ ] Value demonstration scripted
[ ] Enhancement gate passed
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (ARENA — MANDATORY, CANNOT BE SKIPPED):
[ ] All 7 competitors generated across 3 rounds
[ ] Adversarial critique completed each round
[ ] Targeted revision completed each round
[ ] Post-Arena Synthesis: 2-3 hybrids created
[ ] 9-10 candidates presented to human
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 3 (VALIDATION):
[ ] Value equation scored
[ ] Vault pattern comparison completed
[ ] Competitor differentiation checked
[ ] Promise-offer alignment validated
[ ] Anti-slop validator passed
[ ] Value-to-price ratio >= 10:1
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (PACKAGING):
[ ] Offer brief compiled
[ ] Presentation script assembled
[ ] Handoff package created

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims about offer completeness
[ ] RE-READ checkpoint files
[ ] VERIFY all 4 value equation components
[ ] VERIFY 3+ bonuses created
[ ] VERIFY guarantee is branded (not generic)
[ ] VERIFY value-to-price ratio calculated
[ ] If any component missing, RETURN to appropriate layer
```

---

## KEY INSIGHT

> **"An offer without value calculation is a guess. An offer without branded guarantee shows no confidence. An offer with fake scarcity insults intelligent prospects."**

The Offer skill has 4 layers for a reason:
- Layer 1: CONSTRUCT the core offer with value equation optimization
- Layer 2: ENHANCE with bonuses, guarantee, scarcity, urgency
- Layer 3: VALIDATE the complete offer package
- Layer 4: Package for downstream copy skills

Skipping value calculation means guessing instead of engineering.

---

## STRUCTURAL FIX 8: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/07-offer/checkpoints/ARENA_COMPLETE.yaml
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
[project]/07-offer/checkpoints/LAYER_1_COMPLETE.yaml
[project]/07-offer/checkpoints/LAYER_2_COMPLETE.yaml
[project]/07-offer/checkpoints/ARENA_COMPLETE.yaml    ← NEW (MANDATORY)
[project]/07-offer/checkpoints/LAYER_3_COMPLETE.yaml
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
