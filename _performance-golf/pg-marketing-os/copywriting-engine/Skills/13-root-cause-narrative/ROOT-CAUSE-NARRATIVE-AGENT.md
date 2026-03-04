# Root Cause Narrative Skill — Master Agent

**Version:** 1.2
**Skill:** 13-root-cause-narrative
**Position:** Phase 3, Step 1 (Copy Execution)
**Type:** Master Orchestrator (State Machine)
**Dependencies:** 03-root-cause, 08-structure, 02-proof-inventory, 01-research
**Output:** `root-cause-narrative-package.json`

---

## PURPOSE

Transform the strategic root cause package (from Skill 11) into persuasive narrative prose — the actual copy section that communicates the root cause to the prospect. This skill takes the three-part structure (what_they_think / what_it_really_is / why_nothing_worked) and crafts it into a narrative sequence that shifts the prospect's worldview, externalizes blame, kills competitor solutions, and creates the conceptual space for the mechanism.

**Success Criteria:**
- Human-confirmed root cause selection loaded and validated
- Communication type classified for niche and audience sophistication
- All 7 narrative phases drafted with appropriate evidence patterns
- Countersell architecture integrated into narrative flow
- All 10 critical rules validated with zero violations
- Root cause threading guide produced for downstream skills
- Anti-slop validation passes with zero generic language violations
- Overall weighted average score >= 7.0/10
- Full narrative text assembled and handoffs packaged

**Critical Distinction:** This is an EXECUTION skill, not a strategy skill. Skill 03-root-cause derives and validates the root cause. This skill WRITES the narrative prose that communicates it. The root cause strategy is already decided — this skill translates it into compelling copy.

---

## IDENTITY

**This skill IS:**
- A narrative execution engine that translates strategic root cause decisions into copy
- A TIER1-taught writing system — all patterns learned from elite control analysis
- A classification-driven drafting pipeline (classify type → select patterns → generate prose)
- A seven-phase narrative sequence builder following the universal root cause arc
- A countersell integration system that weaponizes root cause against competitors
- A threading guide generator that ensures root cause permeates the entire promotion

**This skill is NOT:**
- A root cause derivation tool (that is 03-root-cause)
- A mechanism narrative writer (that is 14-mechanism-narrative)
- A structure/argument architect (that is 08-structure)
- A proof inventory builder (that is 02-proof-inventory)
- A direct executor of analysis (delegated to microskills)
- A source-teaching-dependent system (all teachings are TIER1-derived)

**Upstream:** Receives `root-cause-package.yaml` (02), `structure-package.json` (07), `proof-inventory-output.json` (01)
**Downstream:** Feeds `root-cause-narrative-package.json` to 14-mechanism-narrative, body copy assembly, and close skills

---

## TEACHING FOUNDATIONS

### Primary: TIER1-Derived Root Cause Narrative Intelligence
**Source:** `CopywritingEngine/DeepAnalysisProtocol/outputs/root-cause-narrative-intelligence.md`

This skill has NO external source teachings. All narrative patterns, communication types, framing techniques, evidence patterns, emotional arcs, and critical rules were extracted directly from deep analysis of 14 TIER1 control extractions. The patterns found ARE the teachings.

**Core Knowledge Base:**
1. **Three-Part Structure** — Universal atomic unit (what_they_think / what_it_really_is / why_nothing_worked)
2. **10 Communication Types** — conspiracy_reveal, scientific_explanation, direct_confrontation, metaphor_driven, data_presentation, conspiracy_expose, opposite_of_truth, hidden_truth, not_your_fault, suppressed_science
3. **7-Phase Universal Sequence** — Problem Agitation → False Belief Installation → Authority Establishment → Root Cause Reveal → Failure Explanation → Villain Deep Dive → Mechanism Bridge
4. **6 Framing Patterns** — villain-driven (65%), science-driven (40%), conspiracy-driven (30%), ignorance-driven (25%), inversion-driven (15%), historical-driven (10%)
5. **7 Evidence Patterns** — villain's own data, paradox proof, specific number, institutional name-drop, geographic/historical proof, visual demonstration, person-as-proof
6. **5 Emotional Arcs** — frustration→vindication, fear→hope, confusion→clarity, outrage→righteous_action, shame→dignity
7. **Countersell Architecture** — 4 patterns: treats_symptoms, makes_worse, wrong_enemy, dangerous
8. **Reframe Technique Taxonomy** — not_your_fault (35%), conspiracy (25%), hidden_truth (15%), opposite_of_truth (10%), suppressed_science (10%), conspiracy_expose (5%)
9. **10 Critical Rules** — externalization, failure explanation, specificity, solution path, villain pairing, counter-intuition, threading, anchor phrase, authority-first, competitor killing
10. **Cross-Vertical Patterns** — niche-specific dominant types, villains, reframes, and evidence patterns

### Secondary: Vault Intelligence
**Source:** `TIER1_EXTRACTIONS/` batch files
- Root cause architecture fields from v3 extraction schema
- `root_cause_architecture.three_part_structure` across all extractions
- `root_cause_architecture.expression_method` patterns
- `root_cause_architecture.reframe_technique` patterns
- `narrative_flow.section_sequence` positioning data

### Tertiary: Structure Package Integration
**Source:** `structure-package.json` (from 08-structure)
- CPB chunk placement guides WHERE root cause narrative fits in the argument
- Campaign thesis alignment ensures root cause supports the central argument
- Flow architecture integration points for root cause threading

---

## HUMAN CHECKPOINT PROTOCOL

### Purpose
Before writing any narrative prose, the agent must confirm the chosen root cause with the human operator. The strategic root cause was selected in Skill 11, but the narrative skill provides a curation checkpoint because:

1. The human may want to modify the expression for this specific campaign
2. The chosen root cause may need adjustment for the current audience
3. Multiple root causes may be viable — the human selects the primary
4. The three-part structure may need refinement before narrative execution

### Checkpoint Flow

```
LAYER_0 completes (all upstream loaded and validated)
           ↓
   HUMAN_CHECKPOINT state entered
           ↓
   Present to human:
   ┌──────────────────────────────────────────────────┐
   │ ROOT CAUSE SELECTION CONFIRMATION                │
   │                                                  │
   │ Selected Root Cause (from 03-root-cause):        │
   │   Three-Part Structure:                          │
   │     WHAT THEY THINK: [text]                      │
   │     WHAT IT REALLY IS: [text]                    │
   │     WHY NOTHING WORKED: [text]                   │
   │                                                  │
   │   Expression Method: [type]                      │
   │   Reframe Technique: [type]                      │
   │   Villain: [name and role]                       │
   │                                                  │
   │ Niche: [niche]                                   │
   │ Sub-niche: [sub_niche]                           │
   │ Market Sophistication: [stage]                   │
   │                                                  │
   │ OPTIONS:                                         │
   │   [1] CONFIRM — proceed with this root cause     │
   │   [2] MODIFY — adjust the three-part structure   │
   │   [3] SWITCH — use alternative root cause        │
   │   [4] PROVIDE — supply custom root cause data    │
   │                                                  │
   │ DEFAULT: [1] CONFIRM                             │
   └──────────────────────────────────────────────────┘
           ↓
   Human response received
           ↓
   If CONFIRM: proceed to LAYER_1 with original data
   If MODIFY: update three-part fields, re-validate, proceed
   If SWITCH: load alternative, re-validate, proceed
   If PROVIDE: ingest custom data, validate schema, proceed
```

### Checkpoint Constraints
- **BLOCKING:** Cannot proceed to Layer 1 without human response
- **TIMEOUT:** No timeout — waits indefinitely for human input
- **DEFAULT:** If human says "proceed" or "yes" without specifics, use CONFIRM
- **VALIDATION:** Any modification must still pass input validation before proceeding
- **LOGGING:** Checkpoint response is logged in the learning log for pattern analysis

---

## STATE MACHINE

```
IDLE → TRIGGERED → LAYER_0 → HUMAN_CHECKPOINT → LAYER_1 → LAYER_2 → ARENA → LAYER_3 → LAYER_4 → COMPLETE
                      │              │              │          │        │        │          │
                      ▼              ▼              ▼          ▼        ▼        ▼          ▼
                   [GATE_0]    [CONFIRM/MOD]    [GATE_1]   [GATE_2] [GATE_2.5] [GATE_3]  [GATE_4]
                   PASS/FAIL    BLOCKING        PASS/FAIL  PASS/FAIL HUMAN_SEL PASS/FAIL PASS/FAIL
                      │              │              │          │        │        │          │
                      ▼              ▼              ▼          ▼        ▼        ▼          ▼
                 [Remediate]   [Wait/Adjust]  [Remediate] [Remediate] [Re-gen] [Remediate] [Remediate]
                      │              │              │          │        │        │          │
                      └──────────────┴──────────────┴──────────┴────────┴────────┴──────────┘
                                                          ▲
                                                          │
                                                    Max 3 iterations
                                                    per layer, then
                                                    HUMAN CHECKPOINT
```

**CRITICAL: Two BLOCKING checkpoints exist:**
1. **HUMAN_CHECKPOINT (after Layer 0):** Root cause selection confirmation — cannot classify without human approval
2. **GATE_2.5 (Arena):** Narrative candidate selection — cannot refine without human selecting winning narrative

### State Definitions

| State | Description | Entry Condition | Exit Condition |
|-------|-------------|-----------------|----------------|
| IDLE | Awaiting trigger | Default | User or upstream trigger |
| TRIGGERED | Processing request | Trigger received | Inputs identified |
| LAYER_0 | Foundation loading | Inputs identified | Gate 0 passes |
| HUMAN_CHECKPOINT | Awaiting human confirmation | Gate 0 passes | Human confirms root cause selection |
| LAYER_1 | Strategic classification | Human confirms | Gate 1 passes |
| LAYER_2 | Draft generation | Gate 1 passes | Gate 2 passes |
| LAYER_3 | Refinement & polish | Gate 2 passes | Gate 3 passes |
| LAYER_4 | Validation & assembly | Gate 3 passes | Gate 4 passes |
| COMPLETE | Package assembled | Gate 4 passes | Output delivered |

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

**Purpose:** Load all upstream packages, TIER1 narrative intelligence, verbatim Gold specimens, and validate completeness. Present human checkpoint for root cause confirmation.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load root-cause-package.yaml, structure-package.json, proof-inventory-output.json |
| 0.2 | `0.2-vault-intelligence-loader.md` | Load vault-intelligence JSON with tiered specimen metadata |
| 0.2.5 | `0.2.5-specimen-decomposer.md` | Decompose specimens into structural templates and technique catalogs |
| 0.2.6 | `0.2.6-curated-gold-specimens.md` | Load verbatim Gold specimens as statistical attractors for generation |
| 0.3 | `0.3-input-validator.md` | Validate all inputs present, schema-compliant, and above minimum thresholds |
| 0.4 | `0.4-human-checkpoint-curator.md` | Present root cause selection to human for confirmation/modification |

**Execution Order:** 0.1 → 0.2 → 0.2.5 → 0.2.6 (parallel with 0.2.5) → 0.3 → 0.4

**Specimen Loading Protocol:**
- 0.2.6 specimens are TYPE-MATCHED to the campaign's communication_type
- Maximum 3 specimens loaded per generation to manage context budget
- Gold tier specimens prioritized over Silver
- Specimens serve as statistical attractors — their rhetorical DNA influences generation

**GATE_0:** All upstream packages loaded, TIER1 intelligence indexed, inputs validated, human confirmation received. FAIL = missing upstream outputs OR human rejects without providing alternative.

---

### Layer 1: Strategic Classification

**Purpose:** Classify the root cause narrative strategy based on the confirmed root cause, niche characteristics, and audience sophistication level. Map to TIER1 patterns.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-communication-type-classifier.md` | Classify into one of 10 communication types based on niche, audience, and root cause characteristics |
| 1.2 | `1.2-framing-pattern-selector.md` | Select primary and secondary framing patterns from the 6 frame taxonomy |
| 1.3 | `1.3-emotional-arc-designer.md` | Design the emotional progression from the 5 arc types, with phase-by-phase emotional targets |
| 1.4 | `1.4-narrative-sequence-mapper.md` | Map the 7-phase universal sequence to the specific campaign, with word count allocations and phase ordering |

**Execution Order:** 1.1 → 1.2, 1.3 (parallel) → 1.4

**GATE_1:** Communication type classified with vault reference. Framing pattern selected with evidence requirements identified. Emotional arc designed with phase targets. Sequence mapped with word count allocations. All selections cross-referenced against cross-vertical patterns for niche fit. FAIL = classification doesn't match niche patterns OR sequence mapping conflicts with structure-package.

### Layer-1 Chain-of-Refinement Protocol

AFTER Layer 1 skill execution, IF any output scores below threshold:

```
REFINEMENT_LOOP:
  IF selected_output.confidence_score < 0.75 OR quality_score < 7.0:
    1. DIAGNOSE: Identify which scoring dimension(s) failed
       - Classification confidence too low?
       - Insufficient evidence for selection?
       - Competing options too close in score?

    2. ADJUST: Modify parameters based on diagnosis
       - If confidence low → narrow candidate pool
       - If evidence weak → request additional vault context
       - If tie-breaker needed → apply domain-specific heuristics

    3. RE-EXECUTE: Generate new candidates with adjusted parameters
       - MUST use different seed/approach than first pass
       - MUST NOT simply re-run identical query

    4. RE-SCORE: Evaluate new candidates against same rubric

    5. ITERATION_LIMIT: 3 attempts maximum
       IF still below threshold after 3 iterations:
         LOG: "Layer-1 refinement exhausted. Escalating to human review."
         FLAG: output for human checkpoint
         PROCEED: with best available candidate (clearly marked as below-threshold)
```

NEVER proceed to Layer 2 with unvalidated Layer-1 output.
MUST document any below-threshold outputs that proceed after exhausting refinement.

---

### Layer 2: Draft Generation

**Purpose:** Generate the actual narrative prose for each phase of the root cause sequence. This is where copy is WRITTEN.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-problem-agitation-writer.md` | Write Phase 1 (symptom identification) and Phase 2 (false belief installation) — establish what they believe and make them feel understood |
| 2.2 | `2.2-root-cause-revelation-writer.md` | Write Phase 3 (authority bridge) and Phase 4 (the root cause reveal) — build credibility then shatter the false belief |
| 2.3 | `2.3-failure-explanation-writer.md` | Write Phase 5 (failure explanation) and Phase 6 (villain deep dive) — explain all past failures and give the root cause a villain face |
| 2.4 | `2.4-countersell-bridge-writer.md` | Write countersell sequences and Phase 7 (mechanism bridge) — kill competitor solutions and transition to mechanism |

**Execution Order:** 2.1 → 2.2 → 2.3 → 2.4 (sequential — each phase builds on the previous)

**GATE_2:** All 7 phases drafted with prose text. Word counts within target ranges. Each phase hits its emotional target from the arc design. Countersells integrated. Mechanism bridge written. Three-part structure clearly communicated within the narrative. FAIL = missing phases OR emotional arc broken OR three-part structure not communicated.

---

### Layer 2.5: Arena Persona Evaluation

**Purpose:** Generate multiple root cause narrative variations through 6 legendary copywriter persona lenses, judge each against root-cause-narrative-specific criteria, rank candidates, and present top performers for human selection.

**Reference:** `13-root-cause-narrative/ARENA-LAYER.md`

**Persona Panel:**

| Persona | Lens Focus | Root Cause Narrative Contribution |
|---------|------------|-----------------------------------|
| Makepeace | Flow, architecture, rhythm | Narrative flow from problem through revelation to mechanism bridge |
| Halbert | Entertainment, hook, engagement | Opening hook power; entertaining villain portrayal |
| Schwartz | Market sophistication, positioning | Audience-appropriate revelation intensity; sophistication-calibrated reframes |
| Ogilvy | Credibility, clarity, elegance | Evidence authority; clarity of three-part structure |
| Clemens | Scientific clarity, binary reframes | Binary villain framing; accessible mechanism language |
| Bencivenga | Proof-first, credibility, specificity | Evidence-led narrative; specific villain data |

**7 Judging Criteria (100% total):**

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| Three-Part Structure Clarity | 20% | How powerfully what_they_think / what_it_really_is / why_nothing_worked lands |
| Blame Externalization | 20% | How completely the prospect is absolved (Rule 1 — CRITICAL) |
| Counter-Intuitive Impact | 15% | How surprising the root cause revelation feels (Rule 6) |
| Villain Portrayal | 15% | How specific, memorable, and emotionally resonant the villain is (Rule 5) |
| Evidence Integration | 10% | How naturally proof is woven into narrative (not bolted on) |
| Reframe Stack Depth | 10% | Whether multiple reframe techniques are layered (minimum 2) |
| Countersell Effectiveness | 10% | How effectively the narrative kills competitor solutions (Rule 10) |

**10 Critical Rules Compliance:** Every candidate must pass validation against all 10 critical rules before ranking. Rule violations = disqualification.

**Gate 2.5:** Human must select winning narrative candidate from ranked shortlist. This is a BLOCKING checkpoint — execution HALTS until human selection is received.

---

### Layer 3: Refinement & Polish

**Purpose:** Refine the draft narrative with evidence integration, reframe stacking, transition polish, and threading guide generation.

| Skill | File | Function |
|-------|------|----------|
| 3.1 | `3.1-evidence-integration-calibrator.md` | Weave evidence patterns (7 types) naturally into the narrative — ensure proof feels organic, not bolted on |
| 3.2 | `3.2-reframe-stacking-optimizer.md` | Layer multiple reframe techniques for maximum worldview shift — stack 2-3 reframes per the reframe hierarchy |
| 3.3 | `3.3-transition-flow-polisher.md` | Polish all in/out transitions using the 6 entry and 4 exit transition patterns from TIER1 analysis |
| 3.4 | `3.4-threading-guide-generator.md` | Produce the root cause threading guide — anchor phrase, repetition points, emphasis level, placement recommendations for downstream skills |

**Execution Order:** 3.1, 3.2 (parallel) → 3.3 → 3.4

**GATE_3:** Evidence naturally woven (not bolted on). Reframes stacked (minimum 2 layers). All transitions smooth and pattern-matched. Threading guide complete with anchor phrase and repetition map. FAIL = evidence feels forced OR reframes unstacked OR transitions jarring OR threading guide incomplete.

---

### Layer 4: Validation & Assembly

**Purpose:** Validate against all critical rules, anti-slop check, vault pattern comparison, and assemble the final package.

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-critical-rules-checker.md` | Validate all 10 critical rules from TIER1 analysis with evidence for each rule |
| 4.2 | `4.2-anti-slop-validator.md` | Zero-tolerance check for generic, cliched, or AI-default language |
| 4.3 | `4.3-vault-pattern-comparator.md` | Compare against elite root cause narratives from TIER1 with differentiation documented |
| 4.4 | `4.4-final-narrative-assembler.md` | Assemble root-cause-narrative-package.json with all sections, scores, threading guide, and downstream handoffs |

**Execution Order:** 4.1, 4.2, 4.3 (parallel) → 4.4

**GATE_4:** All 10 rules pass (zero violations). Anti-slop passes (zero generic language). Vault comparison completed with differentiation. Overall weighted average >= 7.0. Full narrative text assembled. Downstream handoffs packaged. FAIL = any rule violation OR slop detected OR score < 7.0.

---

## OUTPUT SCHEMA

```yaml
root_cause_narrative_package:
  metadata:
    skill: "13-root-cause-narrative"
    version: "1.0"
    timestamp: string
    niche: string
    sub_niche: string
    run_id: string

  root_cause_confirmed:
    three_part:
      what_they_think: string
      what_it_really_is: string
      why_nothing_worked: string
    expression_method: string
    reframe_technique: string
    villain:
      name: string
      type: enum[pharma, medical_establishment, government, government_conspiracy, food_industry, misinformation, biological_process, industry]
      role: enum[suppressor, profiteer, deceiver, blocker, betrayer]
    anchor_phrase: string
    human_checkpoint_response: enum[confirm, modify, switch, provide]

  narrative_strategy:
    communication_type: string  # one of 10 types
    communication_type_rationale: string
    framing_patterns:
      primary: string  # one of 6 frames
      secondary: string  # optional second frame
    emotional_arc:
      type: string  # one of 5 arcs
      phase_targets:
        - phase: string
          target_emotion: string
          intensity: enum[low, medium, high, peak]
    narrative_sequence:
      phases:
        - phase_number: integer
          phase_name: string
          word_count_target: integer
          percentage_of_copy: string
      total_word_count_target: integer
      format_variation: enum[vsl_sequence, magalog_sequence, advertorial_sequence]

  narrative_sections:
    problem_agitation:
      text: string
      word_count: integer
      phase: "1"
      symptoms_named: [string]
      emotional_target: string
    false_belief_installation:
      text: string
      word_count: integer
      phase: "2"
      false_belief_articulated: string
      emotional_target: string
    authority_bridge:
      text: string
      word_count: integer
      phase: "3"
      credentials_cited: [string]
      bridge_type: string
    root_cause_revelation:
      text: string
      word_count: integer
      phase: "4"
      three_part_delivered: boolean
      counter_intuitive_element: string
      emotional_target: string
    failure_explanation:
      text: string
      word_count: integer
      phase: "5"
      failures_explained: [string]
      blame_externalized: boolean
    villain_deep_dive:
      text: string
      word_count: integer
      phase: "6"
      villain_named: boolean
      motive_established: boolean
      evidence_presented: [string]
    mechanism_bridge:
      text: string
      word_count: integer
      phase: "7"
      transition_type: string
      connects_to_mechanism: boolean

  countersells:
    - target_solution: string
      pattern: enum[treats_symptoms, makes_worse, wrong_enemy, dangerous]
      argument: string
      text: string
      placement: string  # which phase it appears in

  threading_guide:
    anchor_phrase: string
    emphasis_level: enum[foundation, heavy, moderate]
    repetition_points:
      - location: string  # e.g., "lead", "story", "mechanism_section", "close"
        usage: string  # how root cause language appears at this point
    placement_pattern: enum[throughout, lead_and_throughout, mid_body, early_body]
    repetition_pattern: enum[woven_throughout, restated_multiple_times, single_powerful_reveal]

  evidence_integration:
    patterns_used:
      - pattern: string  # one of 7 evidence patterns
        location: string
        specific_evidence: string
    total_evidence_points: integer

  reframe_stack:
    reframes:
      - technique: string  # from reframe taxonomy
        application: string
        text_excerpt: string
    stack_depth: integer  # minimum 2

  full_narrative_text: string  # complete assembled prose

  validation:
    scores:
      narrative_persuasion: float
      three_part_clarity: float
      emotional_arc_execution: float
      evidence_integration: float
      countersell_effectiveness: float
      threading_completeness: float
      vault_pattern_comparison: float
    overall_weighted_average: float
    critical_rules_check:
      rule_1_external: boolean
      rule_2_explains_failures: boolean
      rule_3_more_specific: boolean
      rule_4_path_to_solution: boolean
      rule_5_villain_paired: boolean
      rule_6_counter_intuitive: boolean
      rule_7_woven_throughout: boolean
      rule_8_anchor_phrase: boolean
      rule_9_authority_first: boolean
      rule_10_kills_competitors: boolean
      all_rules_pass: boolean
    anti_slop:
      violations: integer  # must be 0
      pass: boolean

  downstream_handoffs:
    for_mechanism_narrative:
      mechanism_bridge_text: string
      root_cause_context: string
      villain_established: string
      emotional_state_at_handoff: string
    for_body_copy:
      threading_guide: object  # full threading guide
      anchor_phrase: string
      countersell_references: [string]
    for_close:
      root_cause_callback: string
      fear_of_return: string
      villain_reminder: string
```

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER derive root cause** — the strategic root cause comes from Skill 02. This skill WRITES, not discovers.
2. **ALWAYS execute human checkpoint** — cannot proceed past Layer 0 without human confirmation of root cause selection.
3. **ALWAYS classify before writing** — Layer 1 classification must complete before any prose generation in Layer 2.
4. **SEQUENTIAL Layer 2 execution** — narrative phases must be drafted in order because each builds on the previous.
5. **NEVER skip the anchor phrase** — every root cause narrative must have a memorable, repeatable anchor phrase (Rule 8).
6. **NEVER internalize blame** — root cause must ALWAYS externalize blame to villain/biology/misinformation (Rule 1).
7. **ALWAYS produce threading guide** — the root cause is not a section; it is a thread that runs through the entire promotion (Rule 7).

### Quality Constraints
8. **Evidence must be organic** — proof elements woven into narrative, never bolted on as lists or citations outside the story flow.
9. **Minimum 2 reframe layers** — every root cause narrative must stack at least 2 reframe techniques.
10. **Counter-intuitive element required** — the root cause must surprise the reader (Rule 6). If it doesn't surprise, it has no persuasive power.
11. **Countersells are weapons** — every competing solution must be killed through the root cause lens, not through generic comparison.
12. **Authority before reveal** — the credibility stack must precede the counter-intuitive root cause claim (Rule 9).

### Anti-Slop Constraints
13. **ZERO generic language** — no "imagine," "discover," "unlock," "journey," or other AI-default phrases.
14. **ZERO vague claims** — every statement must be specific, concrete, and grounded in the root cause data.
15. **ZERO format violations** — prose must match the classified communication type's tone and evidence requirements.
16. **ZERO unsupported transitions** — every phase transition must use a pattern from the TIER1 transition catalog.

### Integration Constraints
17. **Structure-aligned** — narrative must fit within the CPB chunk framework from structure-package.json.
18. **Mechanism-compatible** — mechanism bridge must set up Skill 12's entry point cleanly.
19. **Thread-complete** — threading guide must cover all downstream touchpoints (lead callback, story integration, mechanism reference, close callback).
20. **Format-appropriate** — sequence variation (VSL/magalog/advertorial) must match the campaign format from structure.

### Enforcement Constraints
21. **IF three-part structure missing any component → HALT** — all three elements (what_they_think, what_it_really_is, why_nothing_worked) are mandatory before narrative execution proceeds.
22. **IF villain not named with specific entity → WARN** — generic villains ("the industry") must be rejected in favor of specific named entities.
23. **IF anchor phrase not memorable and repeatable → REJECT** — anchor phrase must pass the "can you say it in one breath?" test.
24. **IF emotional arc breaks between phases → HALT** — emotional continuity validation runs after each phase draft; any discontinuity blocks progression.
25. **IF countersell targets fewer than 2 competitor categories → WARN** — root cause narrative must kill multiple alternative solutions.
26. **IF reframe stack depth < 2 → REJECT** — single-layer reframes lack persuasive compound effect; minimum 2 reframe techniques required.
27. **IF evidence pattern is "bolted on" rather than narrative-woven → REJECT** — proof elements appearing as citations or lists outside story flow trigger immediate rewrite.

### Failure Modes

| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| Upstream root-cause-package.yaml missing | HIGH | Input validation | HALT with field name + request upstream Skill 02 re-run |
| Three-part structure incomplete | HIGH | Schema validation | HALT + enumerate missing components |
| Villain not externalized (blame internalized to prospect) | HIGH | Content analysis | REJECT + rewrite with external blame target |
| Anchor phrase generic or forgettable | MEDIUM | Memorability check | Flag for human review + suggest alternatives |
| Emotional arc discontinuity between phases | MEDIUM | Phase transition validator | Rewrite transition phase before proceeding |
| Evidence feels "bolted on" not narrative-woven | MEDIUM | Integration quality check | REJECT section + rewrite with organic evidence |
| Countersell missing competitor category | MEDIUM | Coverage analysis | WARN + expand countersell targets |
| Reframe stack depth insufficient | MEDIUM | Stack depth counter | REJECT + add secondary reframe technique |
| Communication type mismatched to niche | HIGH | Cross-vertical pattern check | Re-classify with niche-specific patterns |
| Schema violation in output | HIGH | Output validation | REJECT + re-execute failing microskill |

### Anti-Slop Lexicon

NEVER use these words/phrases in generated root cause narrative output:

**Vague qualifiers:** many, often, most, some, several, usually, typically, around, approximately, about, roughly, nearly, almost, kind of, sort of

**AI telltales:** revolutionary, game-changing, unlock, harness, leverage, dive deep, journey, empower, transform your life, discover the secret, breakthrough, cutting-edge, next-level

**Corporate filler:** comprehensive, robust, innovative, state-of-the-art, synergy, best-in-class, world-class, leading-edge, holistic, optimize, streamline

**Hedge words:** might, could potentially, should consider, may want to, perhaps, arguably, it seems, appears to be, tends to, in some cases

**Copywriting clichés (root cause specific):** imagine if you could, picture this, what if I told you, the truth is, here's the thing, little-known secret, they don't want you to know, hidden in plain sight, shocking discovery

**Empty intensifiers:** literally, absolutely, totally, completely, incredibly, extremely, amazingly, remarkably, unbelievably, truly

**Root cause narrative poison words:** simple trick, easy fix, one weird thing, doctors hate this, this changes everything, mind-blowing, life-changing (without proof)

---

## REMEDIATION PROTOCOL

### Gate Failure Response

| Gate | Common Failures | Remediation |
|------|----------------|-------------|
| Gate 0 | Missing upstream packages | Request upstream skill re-run or manual data entry |
| Gate 1 | Classification doesn't match niche | Re-classify with additional niche context, check cross-vertical patterns |
| Gate 2 | Emotional arc broken between phases | Rewrite the transition between failing phases, check phase emotional targets |
| Gate 2 | Three-part structure unclear in narrative | Strengthen the revelation phase, add specificity to the reframe |
| Gate 3 | Evidence feels forced | Rewrite evidence as narrative elements, not citations; use paradox proof or person-as-proof patterns |
| Gate 3 | Reframes unstacked | Add secondary reframe technique, check reframe hierarchy for compatible stack |
| Gate 4 | Critical rule violations | Rewrite specific section that violates the rule; rules are non-negotiable |
| Gate 4 | Anti-slop failure | Find and replace all generic language with specific, concrete alternatives |
| Gate 4 | Score below 7.0 | Identify lowest-scoring dimensions, remediate targeted sections |

### Escalation
- Max 3 remediation iterations per gate
- After 3 failures: HUMAN CHECKPOINT with failure log and remediation attempts documented
- Human may: override score, provide direction, request full restart, or approve with noted exceptions

---

## FEEDBACK BUS

### Upstream Dependencies

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 03-root-cause | Three-part structure too abstract for compelling narrative | `{ skill: "03-root-cause", request: "narrative_concreteness", issue: string }` |
| 03-root-cause | Expression method doesn't translate to target communication type | `{ skill: "03-root-cause", request: "expression_realignment", current: string, needed: string }` |
| 02-proof-inventory | Insufficient evidence for the selected communication type | `{ skill: "02-proof-inventory", request: "evidence_gap", type: string, needed: string }` |
| 08-structure | Root cause placement in CPB structure conflicts with narrative sequence | `{ skill: "08-structure", request: "placement_adjustment", conflict: string }` |
| 01-research | Niche-specific villain data insufficient for villain deep dive | `{ skill: "01-research", request: "villain_intelligence", niche: string }` |

### Downstream Skills

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 14-mechanism-narrative | root-cause-narrative-package.json assembled | Uses `downstream_handoffs.for_mechanism_narrative` |
| Body copy assembly | root-cause-narrative-package.json assembled | Uses `downstream_handoffs.for_body_copy` + `threading_guide` |
| 17-close | root-cause-narrative-package.json assembled | Uses `downstream_handoffs.for_close` |

---

## GUARDRAILS

### Locked Tool Grammar

All skill invocations MUST follow this exact sequence:
1. STATE the skill being called and its purpose
2. VERIFY all required inputs are available and valid
3. EXECUTE the skill with explicit parameters
4. VALIDATE the output against the expected schema
5. LOG the result before proceeding to the next skill

NEVER invoke a skill without verifying its inputs first.
NEVER skip output validation between skill executions.
NEVER proceed past a failed skill without logging the failure and determining remediation.

### Post-Tool Reflection

AFTER EVERY SKILL EXECUTION, verify:
1. Output file exists and is non-empty
2. Output schema matches the expected contract from the skill's output specification
3. No quality gate violations are present in the output
4. Context state is updated to reflect the completed step
5. The next skill in the sequence is identified and its inputs are confirmed available

IF any verification fails: LOG the failure, HALT the pipeline, and REPORT which verification failed and why.

---

## SESSION PERSISTENCE

After each skill execution, update the session context:

```yaml
session_state:
  current_phase: [phase number]
  current_step: [skill ID just completed]
  completed_steps: [append completed skill to list]
  output_status: [PASS/FAIL/PENDING for last skill]
  next_action: [next skill to execute]
  blockers: [any blocking issues encountered]
```

On session resume:
1. Read the session state
2. Identify the last completed step
3. Resume from the next uncompleted step
4. NEVER re-execute a completed step unless explicitly instructed

MUST update session state after every skill completion.
MUST persist state before any human checkpoint or pause point.

---

## LEARNING LOG

### Log Location
`13-root-cause-narrative/outputs/narrative-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  communication_type: string
  framing_patterns: [string]
  emotional_arc: string
  reframe_stack_depth: integer
  evidence_patterns_used: [string]
  countersell_count: integer
  anchor_phrase: string
  word_count: integer
  human_checkpoint_response: string
  gate_results:
    layer_0: enum[pass, fail]
    layer_1: enum[pass, fail]
    layer_2: enum[pass, fail]
    layer_3: enum[pass, fail]
    layer_4: enum[pass, fail]
  validation_scores:
    narrative_persuasion: float
    three_part_clarity: float
    emotional_arc_execution: float
    evidence_integration: float
    countersell_effectiveness: float
    threading_completeness: float
    overall_weighted_average: float
  critical_rules_violations: [string]  # empty if all pass
  feedback_requests: [object]
  failure_log: [object]

communication_type_pattern_entry:
  niche: string
  communication_type: string
  framing_patterns: [string]
  emotional_arc: string
  effectiveness_score: float
  notes: string
```

### Manager Responsibility
- Log every run automatically upon completion
- Track communication type effectiveness across niches
- Track framing pattern combinations that produce highest scores
- Track which evidence patterns integrate most naturally
- Track reframe stack combinations for optimal worldview shift
- Surface recurring rule violations for microskill improvement
- Track human checkpoint modification patterns to inform default selections

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.2 | 2026-02-03 | Added Layer 2.5 Arena Persona Evaluation with 6-persona generation panel, 7 root-cause-narrative-specific judging criteria (Three-Part Structure Clarity 20%, Blame Externalization 20%, Counter-Intuitive Impact 15%, Villain Portrayal 15%, Evidence Integration 10%, Reframe Stack Depth 10%, Countersell Effectiveness 10%), 10 Critical Rules compliance verification, HUMAN_SELECT blocking checkpoint at Gate 2.5. Reference: ARENA-LAYER.md |
| 1.1 | 2026-02-01 | Added 0.2.6-curated-gold-specimens.md with verbatim specimens for type-indexed loading; updated Layer 0 execution order |
| 1.0 | 2026-01-27 | Initial build: TIER1-taught execution skill with human checkpoint, 10 communication types, 7-phase sequence, 10 critical rules, 4-layer microskill pipeline, countersell architecture, threading guide system |
