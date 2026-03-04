# PROOF-WEAVING-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent proof weaving skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates proof blocks WITHOUT loading type-matched specimens
- AI creates testimonial cascades without proper flow rhythm (8-beat pattern)
- AI writes before/afters without maximum contrast structure
- AI presents study citations as dry academic references instead of persuasively framed
- AI creates demonstration proof without quantified outcomes
- AI builds social proof without scale progression (individual → pattern → scale)
- AI writes transformation reminders that don't callback to earlier proof
- AI creates proof sections without smooth into/out transitions
- AI fails to meet density targets for sections
- AI selects proof approach without human approval

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/18-proof-weaving/checkpoints/LAYER_0_COMPLETE.yaml  # Human confirms proof approach
[project]/18-proof-weaving/checkpoints/LAYER_1_COMPLETE.yaml
[project]/18-proof-weaving/checkpoints/LAYER_2_COMPLETE.yaml
[project]/18-proof-weaving/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/18-proof-weaving/checkpoints/LAYER_3_COMPLETE.yaml
[project]/18-proof-weaving/HUMAN_SELECTION.yaml  # BLOCKING
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
[project]/18-proof-weaving/checkpoints/LAYER_2_COMPLETE.yaml

**Layer 3 CANNOT execute unless BOTH files exist:**
[project]/18-proof-weaving/checkpoints/LAYER_2_COMPLETE.yaml
[project]/18-proof-weaving/checkpoints/ARENA_COMPLETE.yaml

### LAYER 0 HUMAN CHECKPOINT (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml

human_checkpoint:
  proof_approach_confirmed: true
  confirmed_by: "human"
  timestamp: "[ISO 8601]"
  proof_sequencing_strategy: "[proof_first | authority_to_social | scale_cascade | testimonial_parade | wave_pattern]"

  IF proof_approach_confirmed != true:
    HALT — "Cannot proceed without human confirmation of proof approach"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **Proof types covered** | All required per structure | HALT — Complete types |
| **Testimonial cascade** | 8-beat flow pattern | HALT — Fix rhythm |
| **Before/after** | Maximum contrast | HALT — Increase contrast |
| **Study citations** | Persuasively framed | HALT — Reframe |
| **Social proof** | Scale progression | HALT — Add progression |
| **Transitions** | Into AND out of sections | HALT — Add transitions |
| **Density targets** | Per-section minimums | HALT — Add elements |
| **Arena personas** | 6/6 | HALT — All generate |
| **Human selection** | BLOCKING | HALT — Get selection |

### Proof Density Requirements (TIER1 Benchmarks)

```yaml
density_validation:
  lead:
    target: "1-2 elements"
    required_types: ["authority_anchor", "credibility_mention"]
    actual_count: [number]
    meets_target: [Y/N]

  mechanism_narrative:
    target: "3-4 elements"
    required_types: ["study_citation", "demonstration"]
    actual_count: [number]
    meets_target: [Y/N]

  proof_section:
    target: "6-8+ elements"
    required_types: ["testimonial_cascade", "before_after_progression"]
    actual_count: [number]
    meets_target: [Y/N]

  product_introduction:
    target: "2-3 elements"
    required_types: ["single_testimonial", "results_summary"]
    actual_count: [number]
    meets_target: [Y/N]

  offer_copy:
    target: "1-2 elements"
    required_types: ["value_testimonial", "guarantee_proof"]
    actual_count: [number]
    meets_target: [Y/N]

  close:
    target: "2-3 elements"
    required_types: ["transformation_reminder", "scale_proof_callback"]
    actual_count: [number]
    meets_target: [Y/N]

  IF any_section.meets_target == N:
    HALT — "Density target not met for: [section]"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "testimonial flow is subjective" | 8-beat pattern is REQUIRED (Gold #1) | HALT — Fix rhythm |
| "before/after is clear enough" | Maximum CONTRAST required (Gold #3) | HALT — Increase contrast |
| "studies speak for themselves" | Persuasive FRAMING required | HALT — Reframe |
| "scale is implied" | Individual → pattern → scale REQUIRED | HALT — Add progression |
| "transitions will be added later" | Transitions must be drafted NOW | HALT — Add transitions |
| "density is approximate" | Targets are NON-NEGOTIABLE | HALT — Add elements |
| "callbacks are optional" | Transformation reminders MUST reference earlier proof | HALT — Add callbacks |

---

## STRUCTURAL FIX 4: TESTIMONIAL CASCADE GATE

### The Problem
AI creates testimonials without proper flow rhythm, making them feel like disconnected quotes.

### The Fix

**8-BEAT FLOW PATTERN VALIDATION:**

```yaml
testimonial_cascade_validation:
  using_8_beat_pattern: [Y/N]

  beat_sequence:
    beat_1_relatable_problem: [present]
    beat_2_skepticism_overcome: [present]
    beat_3_specific_result: [present]
    beat_4_unexpected_benefit: [present]
    beat_5_life_change: [present]
    beat_6_emotional_payoff: [present]
    beat_7_recommendation: [present]
    beat_8_call_to_action: [present]

  flow_elements:
    names_and_locations: [Y/N]  # "— Sarah M., Denver, CO"
    varied_quote_lengths: [Y/N]  # Not all same length
    natural_voice: [Y/N]  # Not corporate/scripted

  IF using_8_beat_pattern == N:
    HALT — "Testimonial cascade must use 8-beat flow pattern from Gold #1"
```

---

## STRUCTURAL FIX 5: TRANSITION GATE

### The Problem
AI creates proof sections that start and end abruptly without smooth transitions.

### The Fix

**TRANSITION VALIDATION:**

```yaml
transition_validation:
  sections_with_proof: [list]

  per_section_check:
    section_name: "[name]"

    into_transition:
      present: [Y/N]
      pattern_used: "[but_dont_take_my_word | skeptical_good | nothing_speaks_louder | not_alone]"
      feels_natural: [Y/N]

    out_transition:
      present: [Y/N]
      pattern_used: "[you_could_be_next | imagine_yourself | only_question_now]"
      feels_natural: [Y/N]

  approved_into_patterns:
    - "But don't take my word for it..."
    - "Skeptical? Good. Let me show you the evidence..."
    - "Nothing speaks louder than results..."
    - "[Name] isn't alone. Not by a long shot..."

  approved_out_patterns:
    - "And you could be next..."
    - "Imagine yourself [timeframe] from now..."
    - "The only question now is: will you take the step?"

  IF any_section.into_transition.present == N:
    HALT — "All proof sections need INTO transition"

  IF any_section.out_transition.present == N:
    HALT — "All proof sections need OUT transition"
```

---

## STRUCTURAL FIX 6: PROOF-WEAVING-SPECIFIC MC-CHECK

```yaml
PROOF-WEAVING-MC-CHECK:
  timestamp: "[current time]"

  human_checkpoint_verification:
    proof_approach_confirmed_by_human: [Y/N]
    if_no: "STOP — Human must confirm proof approach before drafting"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  density_verification:
    lead_density_met: [Y/N]
    mechanism_density_met: [Y/N]
    proof_section_density_met: [Y/N]
    product_intro_density_met: [Y/N]
    offer_density_met: [Y/N]
    close_density_met: [Y/N]
    if_any_no: "STOP — Density targets must be met for all sections"

  testimonial_verification:
    uses_8_beat_pattern: [Y/N]
    if_no: "STOP — Testimonial cascade requires 8-beat flow pattern"

  before_after_verification:
    uses_maximum_contrast: [Y/N]
    if_no: "STOP — Before/after requires maximum contrast structure"

  study_verification:
    persuasively_framed: [Y/N]
    if_no: "STOP — Study citations must be persuasively framed"

  social_proof_verification:
    has_scale_progression: [Y/N]
    if_no: "STOP — Social proof requires individual → pattern → scale"

  transition_verification:
    all_into_transitions: [Y/N]
    all_out_transitions: [Y/N]
    if_any_no: "STOP — All proof sections need into AND out transitions"

  callback_verification:
    transformation_reminders_callback: [Y/N]
    if_no: "STOP — Transformation reminders must reference earlier proof"

  result: [CONTINUE | HALT_HUMAN | HALT_SPECIMENS | HALT_DENSITY | HALT_TESTIMONIAL | HALT_CONTRAST | HALT_STUDY | HALT_SOCIAL | HALT_TRANSITION | HALT_CALLBACK]
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 0 (FOUNDATION + HUMAN CHECKPOINT):
[ ] Upstream packages loaded (proof-inventory, structure, campaign-brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Proof approach reviewed with human
[ ] HUMAN CONFIRMS proof sequencing strategy
[ ] LAYER_0_COMPLETE.yaml created (with human confirmation)

LAYER 1 (ARCHITECTURE):
[ ] All proof sections mapped by position
[ ] Elements selected per section
[ ] Density targets confirmed achievable
[ ] Type-matched specimens loaded VERBATIM
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DRAFTING):
[ ] All proof blocks drafted for each section
[ ] Testimonial cascades use 8-beat flow pattern
[ ] Before/afters use maximum contrast
[ ] Study citations persuasively framed
[ ] Social proof has scale progression
[ ] Transitions smooth into AND out of sections
[ ] Density targets met for all sections
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

LAYER 3 (VALIDATION):
[ ] Emotional register matches campaign
[ ] Avatar resonance validated
[ ] Assembly instructions complete
[ ] No orphaned proof elements (or justified)
[ ] Anti-slop passed
[ ] Score >= 7.0
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created

OUTPUT:
[ ] proof-weaving-package.json created
[ ] PROOF-WEAVING-SUMMARY.md created

ON CONTEXT RESUME:
[ ] VERIFY human confirmed proof approach (LAYER_0)
[ ] VERIFY specimens loaded
[ ] VERIFY density targets met
[ ] VERIFY 8-beat testimonial pattern
[ ] VERIFY all transitions present
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"Testimonials without flow rhythm are disconnected quotes. Before/afters without maximum contrast are underwhelming. Study citations without persuasive framing are academic. Proof sections without transitions are jarring."**

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/18-proof-weaving/checkpoints/ARENA_COMPLETE.yaml
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
[project]/18-proof-weaving/checkpoints/LAYER_1_COMPLETE.yaml
[project]/18-proof-weaving/checkpoints/LAYER_2_COMPLETE.yaml
[project]/18-proof-weaving/checkpoints/ARENA_COMPLETE.yaml    ← NEW (MANDATORY)
[project]/18-proof-weaving/checkpoints/LAYER_3_COMPLETE.yaml
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
