# LEAD-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent lead skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates leads WITHOUT loading type-matched specimens
- AI produces leads missing one or more of the 4 required elements
- AI skips emotional arc design
- AI produces leads without open loops
- AI selects lead without human approval
- AI skips lead type classification

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/11-lead/checkpoints/LAYER_1_COMPLETE.yaml
[project]/11-lead/checkpoints/LAYER_2_COMPLETE.yaml
[project]/11-lead/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/11-lead/checkpoints/LAYER_3_COMPLETE.yaml
[project]/11-lead/HUMAN_SELECTION.yaml  # BLOCKING for Layer 4
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/11-lead/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/11-lead/checkpoints/LAYER_2_COMPLETE.yaml
[project]/11-lead/checkpoints/ARENA_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "11-lead"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  specimens_loaded: true
  four_elements_present:
    hook: true
    problem_callout: true
    mechanism_hint: true
    credibility_insertion: true
  open_loops_created: [number]
  human_selection: [received | pending]
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **Four elements present** | 4/4 | HALT — Include all elements |
| **Open loops** | 2 minimum | HALT — Create more loops |
| **Arena personas** | 6/6 | HALT — All personas generate |
| **Human selection** | BLOCKING | HALT — Cannot package without |
| **Emotional arc** | Designed | HALT — Design arc |

### The 4 Required Lead Elements

Every lead MUST contain ALL 4 elements:

| Element | Purpose | Check |
|---------|---------|-------|
| **Hook** | Arrest attention, create pattern interrupt | [ ] |
| **Problem Callout** | Validate reader's experience | [ ] |
| **Mechanism Hint** | Tease solution without revealing | [ ] |
| **Credibility Insertion** | Establish authority/trust | [ ] |

```yaml
four_element_validation:
  hook:
    present: [Y/N]
    type: "[curiosity | story | benefit | warning | question]"
    attention_power: [1-10]

  problem_callout:
    present: [Y/N]
    validates_experience: [Y/N]
    emotional_resonance: [1-10]

  mechanism_hint:
    present: [Y/N]
    hints_without_revealing: [Y/N]
    curiosity_created: [1-10]

  credibility_insertion:
    present: [Y/N]
    type: "[qualification | social_proof | experience | authority]"
    believability: [1-10]

  IF any_element.present == N:
    HALT — "All 4 elements required"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "3 elements is enough" | All 4 elements mandatory | HALT — Add missing element |
| "credibility comes later" | Credibility MUST be in lead | HALT — Insert credibility |
| "mechanism reveal is fine" | Lead HINTS, doesn't reveal | HALT — Replace with hint |
| "Arena is optional" | All 6 personas must generate | HALT — Complete Arena |
| "I can select the best lead" | Human selection is BLOCKING | HALT — Get selection |

---

## STRUCTURAL FIX 4: OPEN LOOP REQUIREMENT

### The Problem
AI produces leads that answer questions instead of opening curiosity loops.

### The Fix

**MANDATORY OPEN LOOPS:**

```yaml
open_loop_validation:
  loops_created:
    - loop_1:
        question_opened: "[what curiosity is created]"
        where_resolved: "[later section where this pays off]"
    - loop_2:
        question_opened: "[curiosity]"
        where_resolved: "[section]"

  minimum_loops: 2
  actual_loops: [number]

  IF actual_loops < 2:
    HALT — "Lead must open minimum 2 curiosity loops"

  loop_check:
    any_loop_closed_in_lead: [Y/N]
    IF yes: HALT — "Loops must remain OPEN in lead"
```

---

## STRUCTURAL FIX 5: LEAD-SPECIFIC MC-CHECK

```yaml
LEAD-MC-CHECK:
  timestamp: "[current time]"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  four_element_verification:
    hook_present: [Y/N]
    problem_callout_present: [Y/N]
    mechanism_hint_present: [Y/N]
    credibility_insertion_present: [Y/N]
    if_any_no: "STOP — All 4 elements required"

  open_loop_verification:
    loops_created: [number]
    if_under_2: "STOP — Minimum 2 open loops"

  arena_verification:
    personas_completed: [number]
    if_under_6: "STOP — All 6 Arena personas required"

  human_selection_verification:
    selection_received: [Y/N]
    if_at_packaging_and_no_selection: "STOP — Human selection BLOCKING"

  result: [CONTINUE | HALT_SPECIMENS | HALT_ELEMENTS | HALT_LOOPS | HALT_SELECTION]
```

---

## IMPLEMENTATION CHECKLIST

```
LAYER 0 (FOUNDATION):
[ ] Upstream packages loaded (headline, campaign brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Type-matched specimens loaded VERBATIM
[ ] Input validated

LAYER 1 (ARCHITECTURE):
[ ] Lead type classified
[ ] Hook engineered
[ ] Four element mapper executed
[ ] Emotional arc designed
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (CONSTRUCTION):
[ ] Problem callout built
[ ] Mechanism elevator pitch (hint) built
[ ] Open loops engineered (2+ loops)
[ ] Credibility insertion architected
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
[ ] Vagueness calibrated
[ ] Georgi compliance checked
[ ] Conversational flow optimized
[ ] Attention lock built
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Four element completeness validated
[ ] Emotional sale audited
[ ] Anti-slop validated
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] lead-package.json created
[ ] LEAD-SUMMARY.md created

ON CONTEXT RESUME:
[ ] VERIFY specimens loaded (execution log)
[ ] VERIFY all 4 elements present
[ ] VERIFY 2+ open loops
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"A lead missing any of the 4 elements is incomplete. A lead without open loops is a dead end. A lead without specimen injection lacks elite patterns."**

---

## STRUCTURAL FIX 8: LEAD COMPONENT SPECIFICITY GATE (CRITICAL — ADDED 2026-02-06)

### The Problem (Ultra Liver Failure 2026-02-06)

The lead passed the "4 elements" check but was WEAK because:
- Generic symptom list instead of opening statistic
- Single sentence authority ("I'm a Yale-trained physician") instead of depth build
- No emotional hook creating anger/fear/curiosity
- No industry indictment or dramatic tension

**Root cause:** The 4 elements (hook, problem callout, mechanism hint, credibility) are TOO ABSTRACT. They can be checked off with minimal content.

### The Fix

**MANDATORY LEAD COMPONENT SPECIFICS:**

```yaml
lead_component_specificity_gate:

  opening_statistic:
    required: true
    definition: "A specific NUMBER establishing market scale"
    examples:
      - "85 million Americans have fatty liver disease"
      - "66% of Americans are overweight"
      - "74% of Americans suffer from GI discomfort"
    validation:
      has_number: [Y/N]
      number_establishes_scale: [Y/N]
      appears_in_first_50_words: [Y/N]
    IF any_validation == N:
      HALT — "Lead must open with statistic establishing scale"

  authority_depth:
    required: true
    definition: "Authority build with SPECIFIC depth, not generic credentials"
    minimum_components:
      - years_of_experience: "[specific number]"
      - specific_achievement: "[publication, practice size, patients helped]"
      - personal_stake: "[why they devoted themselves to this]"
    validation:
      has_years: [Y/N]
      has_achievement: [Y/N]
      has_personal_stake: [Y/N]
      word_count: "[must be >= 50 words on authority]"
    IF word_count < 50 OR any_component_missing:
      HALT — "Authority must have depth, not just credentials"

    forbidden_patterns:
      - "I'm a [credential]-trained [profession]" without elaboration
      - Single sentence authority
      - Generic expertise claims

  emotional_hook:
    required: true
    definition: "Explicit emotional trigger with NAMED emotion"
    valid_emotions:
      - anger: "I need to share something that will make you angry"
      - fear: "What I'm about to tell you is disturbing"
      - curiosity: "What I discovered shocked me"
      - frustration: "You've been lied to"
    validation:
      emotion_named_or_clearly_triggered: [Y/N]
      emotion_type: "[anger | fear | curiosity | frustration]"
    IF emotion_not_triggered:
      HALT — "Lead must create specific emotional response"

  discovery_mystery:
    required: true
    definition: "Something discovered/revealed that creates anticipation"
    validation:
      discovery_language_present: [Y/N]
      mystery_created: [Y/N]
    examples:
      - "What I discovered shocked me"
      - "For 18 months, I investigated..."
      - "I found something nobody else noticed"
    IF discovery_not_present:
      HALT — "Lead must create discovery/mystery anticipation"

  problem_escalation:
    required: true
    definition: "Problem shown to be BIGGER than reader assumed"
    validation:
      problem_scope_expanded: [Y/N]
      reader_assumption_challenged: [Y/N]
    examples:
      - "This isn't just about supplements — it's a $50 billion industry failure"
      - "85 million Americans — and most don't know it"
    IF problem_not_escalated:
      FLAG — "Problem should feel bigger than reader expected"
```

### Updated LEAD-MC-CHECK Addition

```yaml
lead_specificity_verification:  # NEW SECTION

  opening_statistic:
    present: [Y/N]
    statistic: "[the actual number]"
    in_first_50_words: [Y/N]
    if_no: "🛑 HALT — Lead must open with scale-establishing statistic"

  authority_depth:
    word_count_on_authority: [number]
    has_years: [Y/N]
    has_specific_achievement: [Y/N]
    has_personal_stake: [Y/N]
    if_word_count_under_50: "🛑 HALT — Authority needs depth, not single sentence"
    if_any_component_missing: "FLAG — Authority missing component"

  emotional_hook:
    emotion_triggered: [Y/N]
    emotion_type: "[anger | fear | curiosity | frustration | none]"
    if_none: "🛑 HALT — Lead must create specific emotional response"

  discovery_mystery:
    discovery_language: [Y/N]
    mystery_created: [Y/N]
    if_no: "FLAG — Lead should create discovery anticipation"

  problem_escalation:
    problem_expanded: [Y/N]
    if_no: "FLAG — Problem should feel bigger than expected"
```

### Emma/Gundry Lead Comparison

```yaml
lead_benchmark_comparison:

  gundry_lead_components:
    - "Pattern interrupt opening (food advice clips)"
    - "Statistics: 66% overweight, projecting 85%"
    - "Personal transformation story (70 lbs lost)"
    - "Authority depth (Yale, Loma Linda, artificial heart, Dr. Oz)"
    - "Discovery: 'I realized much of what we were telling patients was flat out wrong'"
    - "Emotional hook: anger at Big Pharma, righteous mission"

  emma_lead_components:
    - "Mystery opening: 'Trust me. It's not what you think it is.'"
    - "Authority with 9/11 personal tragedy (sacred mission)"
    - "Discovery: archaea/gut vampires mechanism"
    - "Emotional hook: disgust at parasites inside you"

  ultra_liver_lead_BEFORE_fix:
    - "Generic symptom list (bloating, fatigue, fog, belly fat)"
    - "Single sentence authority: 'I'm a Yale-trained physician'"
    - "No statistic establishing scale"
    - "No emotional hook"
    - "No discovery/mystery"
    VERDICT: "FAILED benchmark comparison"

  ultra_liver_lead_AFTER_fix:
    - "85 million Americans statistic"
    - "Authority depth: 25 years, published, trained doctors, largest practice"
    - "Emotional hook: 'make you angry'"
    - "Discovery: 'What I discovered shocked me'"
    - "Problem escalation: $50 billion industry failure"
    VERDICT: "PASSES benchmark comparison"
```

---

## DOCUMENTED FAILURE: ULTRA LIVER LEAD 2026-02-06

```yaml
failure_record:
  id: "FAIL_LEAD_001"
  date: "2026-02-06"
  campaign: "Ultra Liver"

  lead_as_submitted:
    opening: "The bloating that won't go away no matter what you eat."
    authority: "My name is Dr. Josh Levitt. I'm a Yale-trained physician."

  why_it_passed_existing_gates:
    - "Hook present: YES (symptom list hooks readers with problems)"
    - "Problem callout present: YES (symptoms validated)"
    - "Mechanism hint present: YES (Phase 3 teased)"
    - "Credibility insertion present: YES (Yale mentioned)"
    - "All 4 elements checked: PASS"

  why_it_was_actually_weak:
    - "No statistic establishing scale — no sense of how big this problem is"
    - "Authority was ONE SENTENCE — no depth, no years, no achievements"
    - "No emotional hook — just neutral symptom listing"
    - "No discovery/mystery — reader not anticipating revelation"
    - "No problem escalation — problem felt individual, not systemic"

  comparison_to_benchmarks:
    gundry: "Opens with media clips + 66% statistic + 70 lb personal story"
    emma: "Opens with mystery hook + authority depth + 9/11 sacred mission"
    ultra_liver_original: "Opens with symptom list + one sentence authority"
    VERDICT: "Ultra Liver lead was D-tier compared to A-tier benchmarks"

  fix_implemented:
    - "Added lead_component_specificity_gate to LEAD-ANTI-DEGRADATION.md"
    - "Now requires: opening statistic, authority depth, emotional hook, discovery"
    - "Added Emma/Gundry benchmark comparison requirement"
```

---

## STRUCTURAL FIX 9: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/11-lead/checkpoints/ARENA_COMPLETE.yaml
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
[project]/11-lead/checkpoints/LAYER_1_COMPLETE.yaml
[project]/11-lead/checkpoints/LAYER_2_COMPLETE.yaml
[project]/11-lead/checkpoints/ARENA_COMPLETE.yaml    <- NEW (MANDATORY)
[project]/11-lead/checkpoints/LAYER_3_COMPLETE.yaml
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
