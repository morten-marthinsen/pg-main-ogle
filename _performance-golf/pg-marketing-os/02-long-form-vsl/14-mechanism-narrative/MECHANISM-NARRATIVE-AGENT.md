# Mechanism Narrative Skill — Master Agent

**Version:** 1.3
**Skill:** 14-mechanism-narrative
**Position:** Phase 3, Step 2 (Copy Execution)
**Type:** Master Orchestrator (State Machine)
**Dependencies:** 04-mechanism, 13-root-cause-narrative, 08-structure, 02-proof-inventory
**Output:** `mechanism-narrative-package.json`

---

## PURPOSE

Transform the strategic mechanism package (from Skill 11) into persuasive narrative prose — the actual copy section that explains, names, simplifies, and proves the mechanism to the prospect. This skill takes the mechanism winner (name, type, explanation, proof elements, E-level strategy, copy integration map) and crafts it into a narrative that educates the prospect, builds belief in the mechanism, and bridges to the product introduction.

**Success Criteria:**
- Human-confirmed mechanism selection loaded and validated
- Narrative type classified based on E-level, niche, and mechanism characteristics
- All 5 explanation phases drafted with appropriate simplification techniques
- Villain-mechanism pairing established and woven into narrative
- Mechanism-to-product bridge constructed for Skill 13 handoff
- Anti-slop validation passes with zero generic language violations
- Overall weighted average score >= 7.0/10
- Full narrative text assembled and handoffs packaged

**Critical Distinction:** This is an EXECUTION skill, not a strategy skill. Skill 04-mechanism develops and scores the mechanism. This skill WRITES the narrative prose that communicates it. The mechanism strategy is already decided — this skill translates it into compelling copy.

---

## IDENTITY

**This skill IS:**
- A narrative execution engine that translates strategic mechanism decisions into copy
- A TIER1-taught writing system — all patterns learned from elite control analysis
- A classification-driven drafting pipeline (classify narrative type → select patterns → generate prose)
- A five-phase explanation sequence builder following the universal mechanism arc
- A simplification engine using 6 calibrated techniques to make complex mechanisms graspable
- A mechanism-to-product bridge constructor that sets up Skill 13's entry point

**This skill is NOT:**
- A mechanism development tool (that is 04-mechanism)
- A root cause narrative writer (that is 13-root-cause-narrative)
- A product introduction writer (that is 15-product-introduction)
- A structure/argument architect (that is 08-structure)
- A direct executor of analysis (delegated to microskills)
- A source-teaching-dependent system (all teachings are TIER1-derived)

**Upstream:** Receives `mechanism-package.json` (03), `root-cause-narrative-package.json` (11), `structure-package.json` (07), `proof-inventory-output.json` (01)
**Downstream:** Feeds `mechanism-narrative-package.json` to 15-product-introduction, body copy assembly, and close skills

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Foundation + specimen loading | haiku | Input loading, no reasoning needed |
| 1 | Narrative type classification + simplification technique selection | sonnet | Pattern matching from vault |
| 2 | Full narrative draft (6 phases) | opus | Creative generation — max quality |
| 2.5 | Arena (7 competitors × 2 rounds + audience evaluation) | opus | Maximum quality generation |
| 3 | Refinement + 12-year-old comprehension test | opus | Judgment-heavy evaluation |
| 4 | Validation + packaging | sonnet | Assembly from existing content |

### Layer 2.5: Arena (MANDATORY FILE READS)

**BEFORE generating ANY Arena competitor output, READ these files:**

1. `14-mechanism-narrative/ARENA-LAYER.md` — skill-specific criteria and weights
2. `~system/protocols/ARENA-CORE-PROTOCOL.md` — execution protocol
3. `~system/protocols/ARENA-PERSONA-PANEL.md` — persona specifications

**VERIFY personas match protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect**

**If personas don't match → HALT — FABRICATION DETECTED**

---

## TEACHING FOUNDATIONS

### Primary: TIER1-Derived Mechanism Narrative Intelligence
**Source:** `tier1-extractions/MECHANISM_NARRATIVE_ANALYSIS.md`

This skill has NO external source teachings. All narrative patterns were extracted directly from deep analysis of 11 TIER1 control extractions. The patterns found ARE the teachings.

**Core Knowledge Base:**
1. **7 Narrative Types** — scientific_revelation, accidental_discovery, historical_ancient_secret, paradigm_shift, proprietary_technology, identity_driven, data_driven_debunking
2. **5-Phase Explanation Sequence** — Problem Amplification → Root Cause Revelation → Mechanism Naming/Introduction → Mechanism Explanation → Mechanism Proof Integration
3. **8 Framing Patterns** — hidden_truth, suppressed_secret, scientific_breakthrough, expert_revelation, engineering_innovation, personal_transformation, ancient_wisdom_validated, competitor_debunking
4. **6 Proof Integration Strategies** — institutional_stacking, escalating_proof_ladder, self_proving_mechanism, personal_transformation_anchor, competitor_debunking_proof, visual_demonstration
5. **5 Naming Architectures** — metaphorical_rename, proprietary_branded, scientific_label, villain_contrast, historical_origin
6. **6 Simplification Techniques** — binary_reduction, single_metaphor_anchor, layered_analogy_chain, just_think_shortcut, relatable_body_knowledge, numbered_system
7. **4 Mechanism-to-Product Bridge Patterns** — mechanism_is_product, formula_activates_mechanism, information_teaches_mechanism, proof_first_bridge
8. **5 Emotional Arcs** — fear→education→hope, shame→vindication→dignity, frustration→revelation→confidence, curiosity→aha→urgency, empathy→belief→aspiration
9. **E-Level Narrative Strategy Matrix** — E2 (amplify claims), E3 (reframe emphasis), E4 (maximum explanation depth), E5 (paradigm shift narrative)
10. **4 Villain-Mechanism Pairing Architectures** — villain_causes_absence, villain_is_competitor, villain_suppresses_mechanism, villain_creates_wrong_framework
11. **Decision Matrix** — Market sophistication + mechanism type → recommended narrative type, framing, and emotional arc

### Secondary: Vault Intelligence
**Source:** `TIER1_EXTRACTIONS/` batch files
- `mechanism_framework` fields from v3 extraction schema
- `mechanism_framework.winner` data across all extractions
- `mechanism_framework.e5_strategy` patterns
- `mechanism_framework.copy_integration_map` guidelines
- `narrative_flow.section_sequence` mechanism positioning data

### Tertiary: Root Cause Narrative Handoff
**Source:** `root-cause-narrative-package.json` (from 13-root-cause-narrative)
- `downstream_handoffs.for_mechanism_narrative` — bridge text, root cause context, villain established, emotional state at handoff
- The mechanism narrative MUST continue the emotional arc from where the root cause narrative left off
- The villain established in root cause must be consistent with the villain-mechanism pairing

---

## HUMAN CHECKPOINT PROTOCOL

### Purpose
Before writing any narrative prose, the agent must confirm the chosen mechanism with the human operator. The strategic mechanism was selected in Skill 11, but the narrative skill provides a curation checkpoint because:

1. The human may want to emphasize different aspects of the mechanism for this campaign
2. The naming may need refinement for the specific audience
3. The E-level strategy may need adjustment based on campaign format
4. Multiple mechanism candidates may exist — the human confirms the winner

### Checkpoint Flow

```
LAYER_0 completes (all upstream loaded and validated)
           ↓
   HUMAN_CHECKPOINT state entered
           ↓
   Present to human:
   ┌──────────────────────────────────────────────────┐
   │ MECHANISM SELECTION CONFIRMATION                 │
   │                                                  │
   │ Selected Mechanism (from 04-mechanism):          │
   │   Name: [mechanism_name]                         │
   │   Type: [mechanism_type]                         │
   │   E-Level: [E2/E3/E4/E5]                        │
   │   Core Explanation:                              │
   │     Core Logic: [text]                           │
   │     Primary Analogy: [text]                      │
   │     Step-by-Step: [text]                         │
   │   Proof Elements: [count] available              │
   │   Scorecard Average: [score]/10                  │
   │                                                  │
   │ Root Cause Context (from 11):                    │
   │   Villain: [name] ([role])                       │
   │   Emotional State at Handoff: [state]            │
   │   Bridge Text Preview: [text]                    │
   │                                                  │
   │ OPTIONS:                                         │
   │   [1] CONFIRM — proceed with this mechanism      │
   │   [2] MODIFY — adjust name, emphasis, or angle   │
   │   [3] SWITCH — use alternative mechanism         │
   │   [4] PROVIDE — supply custom mechanism data     │
   │                                                  │
   │ DEFAULT: [1] CONFIRM                             │
   └──────────────────────────────────────────────────┘
           ↓
   Human response received
           ↓
   If CONFIRM: proceed to LAYER_1 with original data
   If MODIFY: update mechanism fields, re-validate, proceed
   If SWITCH: load alternative candidate, re-validate, proceed
   If PROVIDE: ingest custom data, validate schema, proceed
```

### Checkpoint Constraints
- **BLOCKING:** Cannot proceed to Layer 1 without human response
- **TIMEOUT:** No timeout — waits indefinitely for human input
- **DEFAULT:** If human says "proceed" or "yes" without specifics, use CONFIRM
- **VALIDATION:** Any modification must still pass input validation before proceeding
- **LOGGING:** Checkpoint response is logged in the learning log

---

## STATE MACHINE

```
                    ┌───────────────────────────────────────────────────────────────────────────────────┐
                    │                                                                                   │
                    ▼                                                                                   │
IDLE ──► TRIGGERED ──► LAYER_0 ──► HUMAN_CHECKPOINT ──► LAYER_1 ──► LAYER_2 ──► ARENA ──► LAYER_3 ──► LAYER_4 ──► COMPLETE
                          ↓                                 ↓          ↓          ↓          ↓          ↓
                       [GATE_0]                          [GATE_1]   [GATE_2]  [GATE_2.5] [GATE_3]   [GATE_4]
                          ↓                                 ↓          ↓          ↓          ↓          ↓
                       PASS/FAIL                         PASS/FAIL  PASS/FAIL  HUMAN_SEL PASS/FAIL  PASS/FAIL
                          ↓                                 ↓          ↓          ↓          ↓          ↓
                      [Remediate]                       [Remediate] [Remediate] BLOCKING [Remediate] [Remediate]
                          ↓                                 ↓          ↓          ↓          ↓          ↓
                          └─────────────────────────────────┴──────────┴──────────┴──────────┴──────────┘
                                                          ▲
                                                          │
                                                    Max 3 iterations
                                                    per layer, then
                                                    HUMAN CHECKPOINT
```

### State Definitions

| State | Description | Entry Condition | Exit Condition |
|-------|-------------|-----------------|----------------|
| IDLE | Awaiting trigger | Default | User or upstream trigger |
| TRIGGERED | Processing request | Trigger received | Inputs identified |
| LAYER_0 | Foundation loading | Inputs identified | Gate 0 passes |
| HUMAN_CHECKPOINT | Awaiting human confirmation | Gate 0 passes | Human confirms mechanism selection |
| LAYER_1 | Strategic classification | Human confirms | Gate 1 passes |
| LAYER_2 | Draft generation | Gate 1 passes | Gate 2 passes |
| ARENA | Multi-perspective generation & judging | Gate 2 passes | Human selects winner (Gate 2.5) |
| LAYER_3 | Refinement & polish | Gate 2.5 passes | Gate 3 passes |
| LAYER_4 | Validation & assembly | Gate 3 passes | Gate 4 passes |
| COMPLETE | Package assembled | Gate 4 passes | Output delivered |

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

**Purpose:** Load all upstream packages, TIER1 narrative intelligence, verbatim Gold specimens, root cause handoff, and validate completeness. Present human checkpoint for mechanism confirmation.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load mechanism-package.json, root-cause-narrative-package.json, structure-package.json, proof-inventory-output.json |
| 0.2 | `0.2-vault-intelligence-loader.md` | Load vault-intelligence JSON with tiered specimen metadata |
| 0.2.5 | `0.2.5-specimen-decomposer.md` | Decompose specimens into structural templates and technique catalogs |
| 0.2.6 | `0.2.6-curated-gold-specimens.md` | Load verbatim Gold specimens as statistical attractors for generation |
| 0.3 | `0.3-input-validator.md` | Validate all inputs present, schema-compliant, and above minimum thresholds |
| 0.4 | `0.4-human-checkpoint-curator.md` | Present mechanism selection to human for confirmation/modification |

**Execution Order:** 0.1 → 0.2 → 0.2.5 → 0.2.6 (parallel with 0.2.5) → 0.3 → 0.4

**Specimen Loading Protocol:**
- 0.2.6 specimens are TYPE-MATCHED to the campaign's narrative_type and E-level
- Maximum 3 specimens loaded per generation to manage context budget
- Gold tier specimens prioritized over Silver
- Specimens serve as statistical attractors — their naming moments, metaphor anchors, and proof integration patterns reshape generation

**GATE_0:** All upstream packages loaded, TIER1 intelligence indexed, Gold specimens loaded, root cause handoff integrated, inputs validated, human confirmation received. FAIL = missing upstream outputs OR human rejects without alternative.

---

### Layer 1: Strategic Classification

**Purpose:** Classify the mechanism narrative strategy based on the confirmed mechanism, E-level, niche, and audience. Map to TIER1 patterns using the decision matrix.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-narrative-type-classifier.md` | Classify into one of 7 narrative types using the E-level decision matrix |
| 1.2 | `1.2-framing-pattern-selector.md` | Select primary and secondary framing patterns from the 8 frame taxonomy |
| 1.3 | `1.3-emotional-arc-designer.md` | Design the emotional progression from the 5 arc types, continuing from root cause handoff state |
| 1.4 | `1.4-explanation-sequence-mapper.md` | Map the 5-phase explanation sequence with simplification technique selection and word count allocations |

**Execution Order:** 1.1 → 1.2, 1.3 (parallel) → 1.4

**GATE_1:** Narrative type classified with E-level alignment. Framing patterns selected with evidence strategy. Emotional arc continues from root cause handoff state. Explanation sequence mapped with simplification techniques assigned per phase. All selections validated against decision matrix. FAIL = E-level mismatch OR emotional arc discontinuity OR sequence-structure conflict.

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

**Purpose:** Generate the actual narrative prose for each phase of the mechanism explanation sequence.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-problem-amplification-writer.md` | Write Phase 1 — escalate the problem beyond what root cause established, set up mechanism as the only answer |
| 2.2 | `2.2-mechanism-naming-reveal-writer.md` | Write Phase 3 — the dramatic moment where the mechanism is named and introduced using selected naming architecture |
| 2.3 | `2.3-mechanism-explanation-writer.md` | Write Phase 4 — the full explanation using metaphor anchor + escalating detail + "think about it" simplification |
| 2.4 | `2.4-mechanism-proof-integrator.md` | Write Phase 5 — proof integration using selected strategy (institutional stacking, escalating ladder, self-proving, etc.) |

**Execution Order:** 2.1 → 2.2 → 2.3 → 2.4 (sequential — each phase builds on the previous)

**Note:** Phase 2 (Root Cause Revelation bridge) is handled by the Skill 11 handoff — it flows naturally from the root cause narrative's mechanism_bridge into this skill's problem amplification. The bridge text from Skill 17 serves as Phase 2.

**GATE_2:** All mechanism explanation phases drafted with prose text. Mechanism named with selected naming architecture. Metaphor anchor established. Escalating detail layer present. "Think about it" simplification included. Proof elements integrated. Word counts within target ranges. FAIL = missing phases OR naming moment flat OR metaphor unclear OR proof insufficient.

---

### Layer 2.5: Arena (Multi-Perspective Generation & Judging)

**Purpose:** Generate multiple mechanism narrative candidates through 6 legendary copywriter personas, score against skill-specific criteria, and present ranked options for human selection.

**Reference:** Full Arena specification in `ARENA-LAYER.md`

#### Arena Persona Panel

| Persona | Lens | Mechanism Narrative Focus |
|---------|------|---------------------------|
| **Makepeace** | Flow & Architecture | Smooth transitions, explanation pacing, revelation timing |
| **Halbert** | Entertainment & Hook | Memorable naming, dramatic reveals, "aha" construction |
| **Schwartz** | Market Sophistication | E-level calibration, proof density, claim substantiation |
| **Ogilvy** | Credibility & Clarity | Institutional validation, clear explanation, scientific framing |
| **Clemens** | Scientific Clarity | Binary mechanism framing, 12-year-old language, accessible metaphors |
| **Bencivenga** | Proof-First | Evidence integration, logical building, skeptic conversion |

#### Execution Sequence

1. **Multi-Perspective Generation** — Each persona generates complete mechanism narrative draft
2. **Judging Round** — Score all 6 candidates against 7 criteria
3. **Ranking & Rationale** — Order candidates by weighted score with strengths/weaknesses
4. **Human Selection Checkpoint** — Present top 3-5 candidates for human choice

#### Judging Criteria (7 Dimensions)

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| Mechanism Graspability | 20% | 12-year-old comprehension test — can non-expert understand? |
| Naming Memorability | 20% | Water cooler test — can prospect explain mechanism name to friend? |
| Metaphor Anchor Quality | 15% | Single graspable image that carries full explanation |
| Simplification Effectiveness | 15% | Complex made simple without dumbing down |
| "Aha Moment" Clarity | 10% | Clear point where understanding clicks |
| Proof Integration | 10% | Evidence woven naturally, not listed |
| Product Bridge Smoothness | 10% | Natural transition to Skill 15 without jarring "now I'm selling" |

#### Quality Threshold

- **Minimum weighted average:** 8.5/10 to proceed
- **Critical threshold:** Mechanism Graspability must be >= 7 (12-year-old test is non-negotiable)
- Below threshold → additional generation round with adjusted parameters
- Max 3 Arena iterations before human escalation

**GATE_2.5 (BLOCKING):** Human must explicitly select one candidate narrative. Cannot proceed without human input. Selection is logged with rationale.

---

### Layer 3: Refinement & Polish

**Purpose:** Refine the draft with simplification calibration, villain-mechanism pairing, product bridge construction, and narrative flow polish.

| Skill | File | Function |
|-------|------|----------|
| 3.1 | `3.1-simplification-calibrator.md` | Calibrate the 6 simplification techniques — ensure mechanism is graspable by target audience without dumbing down |
| 3.2 | `3.2-villain-mechanism-pairing-optimizer.md` | Optimize the villain-mechanism pairing using one of the 4 pairing architectures — villain from root cause, mechanism contrast |
| 3.3 | `3.3-product-bridge-constructor.md` | Construct the mechanism-to-product bridge using one of the 4 bridge patterns — set up Skill 13 entry |
| 3.4 | `3.4-narrative-flow-polisher.md` | Polish full narrative flow — ensure emotional arc continuity, pacing, transitions, and "aha moment" placement |

**Execution Order:** 3.1, 3.2 (parallel) → 3.3 → 3.4

**GATE_3:** Simplification calibrated (12-year-old test passes but not dumbed down). Villain-mechanism pairing coherent with root cause villain. Product bridge constructed with clean Skill 13 handoff. Full narrative flows without jarring transitions. FAIL = mechanism confusing OR villain inconsistent OR bridge missing OR flow breaks.

---

### Layer 4: Validation & Assembly

**Purpose:** Validate against E-level strategy, anti-slop, vault patterns, and assemble the final package.

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-e-level-alignment-checker.md` | Validate narrative matches E-level strategy — E2 amplifies claims, E3 reframes, E4 maximizes depth, E5 shifts paradigm |
| 4.2 | `4.2-anti-slop-validator.md` | Zero-tolerance check for generic, cliched, or AI-default language |
| 4.3 | `4.3-vault-pattern-comparator.md` | Compare against elite mechanism narratives from TIER1 with differentiation documented |
| 4.4 | `4.4-final-narrative-assembler.md` | Assemble mechanism-narrative-package.json with all sections, scores, and downstream handoffs |

**Execution Order:** 4.1, 4.2, 4.3 (parallel) → 4.4

**GATE_4:** E-level alignment confirmed. Anti-slop passes (zero violations). Vault comparison completed. Overall weighted average >= 7.0. Full narrative text assembled. Product bridge handoff packaged. FAIL = E-level mismatch OR slop detected OR score < 7.0.

---

## OUTPUT SCHEMA

```yaml
mechanism_narrative_package:
  metadata:
    skill: "14-mechanism-narrative"
    version: "1.0"
    timestamp: string
    niche: string
    sub_niche: string
    run_id: string

  mechanism_confirmed:
    name: string
    type: string
    e_level: enum[E2, E3, E4, E5]
    core_logic: string
    primary_analogy: string
    proof_elements_available: integer
    scorecard_average: float
    human_checkpoint_response: enum[confirm, modify, switch, provide]

  narrative_strategy:
    narrative_type: string  # one of 7 types
    narrative_type_rationale: string
    framing_patterns:
      primary: string  # one of 8 frames
      secondary: string
    emotional_arc:
      type: string  # one of 5 arcs
      continues_from: string  # root cause handoff state
      phase_targets:
        - phase: string
          target_emotion: string
          intensity: enum[low, medium, high, peak]
    explanation_sequence:
      phases:
        - phase_number: integer
          phase_name: string
          simplification_technique: string  # one of 6
          word_count_target: integer
      total_word_count_target: integer
    villain_mechanism_pairing:
      pairing_type: string  # one of 4 architectures
      villain: string
      mechanism_contrast: string

  narrative_sections:
    problem_amplification:
      text: string
      word_count: integer
      phase: "1"
      escalation_technique: string
      emotional_target: string
    root_cause_bridge:
      text: string  # from Skill 17 handoff
      word_count: integer
      phase: "2"
      source: "13-root-cause-narrative"
    mechanism_naming_reveal:
      text: string
      word_count: integer
      phase: "3"
      naming_architecture: string  # one of 5
      name_introduced: string
      drama_technique: string
    mechanism_explanation:
      simple_metaphor_anchor: string
      escalating_detail_text: string
      think_about_it_simplification: string
      full_text: string
      word_count: integer
      phase: "4"
      simplification_techniques_used: [string]
    mechanism_proof_integration:
      text: string
      word_count: integer
      phase: "5"
      proof_strategy: string  # one of 6
      proof_elements_used: [string]
      institutional_references: [string]
    product_bridge:
      text: string
      word_count: integer
      bridge_type: string  # one of 4
      connects_to_skill_13: boolean
      bridge_sentence: string

  full_narrative_text: string  # complete assembled prose

  validation:
    scores:
      narrative_clarity: float
      mechanism_graspability: float
      simplification_quality: float
      proof_integration: float
      emotional_arc_continuity: float
      naming_memorability: float
      product_bridge_smoothness: float
      vault_pattern_comparison: float
    overall_weighted_average: float
    e_level_alignment:
      expected_strategy: string
      actual_strategy: string
      aligned: boolean
    anti_slop:
      violations: integer  # must be 0
      pass: boolean

  downstream_handoffs:
    for_product_introduction:
      product_bridge_text: string
      mechanism_context: string
      mechanism_name: string
      proof_elements_established: [string]
      emotional_state_at_handoff: string
      belief_level_at_handoff: string
    for_body_copy:
      mechanism_threading: object
      naming_reference: string
      simplification_anchors: [string]
    for_close:
      mechanism_callback: string
      naming_reference: string
      proof_summary: string
```

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER develop the mechanism** — the strategic mechanism comes from Skill 03. This skill WRITES, not discovers.
2. **ALWAYS execute human checkpoint** — cannot proceed past Layer 0 without human confirmation.
3. **ALWAYS continue from root cause emotional state** — the emotional arc must pick up where Skill 11 left off.
4. **ALWAYS classify before writing** — Layer 1 classification must complete before prose generation.
5. **SEQUENTIAL Layer 2 execution** — explanation phases must be drafted in order.
6. **ALWAYS include the "aha moment"** — every mechanism narrative must have a clear moment where understanding clicks.
7. **ALWAYS construct product bridge** — the mechanism narrative must cleanly hand off to Skill 13.
8. **NEVER let mechanism explanation exceed audience comprehension** — simplification calibration is mandatory.

### Quality Constraints
9. **Metaphor anchor required** — every mechanism explanation must center on ONE graspable metaphor (Simplification Technique 2).
10. **"Think about it" moment required** — after detail layer, the mechanism must be re-simplified into a single sentence.
11. **Villain-mechanism pairing required** — villain from root cause must be paired with mechanism using one of 4 architectures.
12. **E-level strategy compliance** — narrative depth, claim amplification, and paradigm shifting must match E-level.
13. **Naming moment must be dramatic** — the mechanism name introduction cannot be flat or incidental.

### Anti-Slop Constraints
14. **ZERO generic language** — no "cutting-edge," "revolutionary," "game-changing," or other AI-default phrases.
15. **ZERO vague explanations** — every mechanism step must be concrete and specific.
16. **ZERO unsupported proof claims** — every proof element must trace to proof-inventory.

### Integration Constraints
17. **Root cause continuity** — villain, emotional state, and worldview shift from Skill 17 must be maintained.
18. **Structure-aligned** — mechanism narrative must fit within CPB chunk framework from structure-package.
19. **Product-bridge-ready** — final section must set up Skill 13's entry point with appropriate emotional and belief state.
20. **Copy integration map compliance** — narrative must follow the reveal timing, explanation depth, and proof interweaving from the mechanism's copy_integration_map.

### Enforcement Constraints
21. **IF mechanism name not memorable → REJECT** — mechanism names must pass the "water cooler test" (can prospect explain it to a friend?).
22. **IF E-level strategy violated → HALT** — E2/E3/E4/E5 narrative depth requirements are hard constraints; misalignment blocks progression.
23. **IF simplification fails 12-year-old comprehension test → REJECT** — mechanism explanation must be graspable by non-expert; technical jargon without simplification is rejected.
24. **IF metaphor anchor missing → HALT** — every mechanism explanation requires ONE central metaphor that grounds the concept.
25. **IF villain-mechanism pairing inconsistent with root cause → REJECT** — villain established in Skill 11 must carry through; contradictory villain references trigger rewrite.
26. **IF "aha moment" not identifiable → WARN** — mechanism narrative must have a clear moment where understanding clicks; flat explanations flagged.
27. **IF product bridge sentence missing → HALT** — explicit transition sentence to Skill 13 is mandatory; implicit bridges rejected.

### Failure Modes

| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| Upstream mechanism-package.json missing | HIGH | Input validation | HALT with field name + request upstream Skill 03 re-run |
| Root cause narrative handoff incomplete | HIGH | Handoff validation | HALT + request Skill 11 re-run or manual provision |
| E-level strategy mismatch | HIGH | E-level validator | HALT + re-classify using decision matrix |
| Mechanism explanation exceeds comprehension ceiling | MEDIUM | Simplification checker | REJECT + apply additional simplification technique |
| Metaphor anchor unclear or missing | HIGH | Metaphor extraction check | HALT + require central metaphor before proceeding |
| Naming moment lacks drama | MEDIUM | Drama intensity check | Flag for rewrite with buildup techniques |
| Villain-mechanism pairing inconsistent | HIGH | Continuity validator | REJECT + align with root cause villain |
| Product bridge missing or weak | HIGH | Bridge sentence check | HALT + write explicit transition sentence |
| Proof elements insufficient for E-level | MEDIUM | Proof density check | WARN + request proof-inventory supplement |
| Schema violation in output | HIGH | Output validation | REJECT + re-execute failing microskill |

### Anti-Slop Lexicon

NEVER use these words/phrases in generated mechanism narrative output:

**Vague qualifiers:** many, often, most, some, several, usually, typically, around, approximately, about, roughly, nearly, almost, kind of, sort of

**AI telltales:** revolutionary, game-changing, unlock, harness, leverage, dive deep, journey, empower, transform your life, discover the secret, breakthrough, cutting-edge, next-level, groundbreaking

**Corporate filler:** comprehensive, robust, innovative, state-of-the-art, synergy, best-in-class, world-class, leading-edge, holistic, optimize, streamline, proprietary blend

**Hedge words:** might, could potentially, should consider, may want to, perhaps, arguably, it seems, appears to be, tends to, in some cases

**Copywriting clichés (mechanism specific):** imagine if you could, picture this, what if I told you, the truth is, here's the thing, secret formula, hidden mechanism, scientists were shocked, this one thing

**Empty intensifiers:** literally, absolutely, totally, completely, incredibly, extremely, amazingly, remarkably, unbelievably, truly

**Mechanism narrative poison words:** magic bullet, silver bullet, miracle cure, overnight results, instant transformation, effortless, no effort required, simple trick, one weird thing, doctors baffled

---

## REMEDIATION PROTOCOL

### Gate Failure Response

| Gate | Common Failures | Remediation |
|------|----------------|-------------|
| Gate 0 | Missing upstream packages | Request upstream skill re-run or manual data entry |
| Gate 1 | E-level mismatch | Re-classify using decision matrix with manual E-level override |
| Gate 1 | Emotional arc discontinuity | Rewrite arc to bridge from root cause handoff state |
| Gate 2 | Metaphor unclear | Try alternative metaphor from same simplification technique category |
| Gate 2 | Naming moment flat | Add drama technique — delayed reveal, contextual buildup, contrast naming |
| Gate 3 | Mechanism confusing | Increase simplification — add binary reduction or "think about it" shortcut |
| Gate 3 | Product bridge missing | Write bridge using one of 4 bridge patterns appropriate to product type |
| Gate 4 | E-level strategy violation | Adjust narrative depth to match E-level requirements |
| Gate 4 | Anti-slop failure | Find and replace all generic language with specific alternatives |
| Gate 4 | Score below 7.0 | Identify lowest-scoring dimensions, remediate targeted sections |

### Escalation
- Max 3 remediation iterations per gate
- After 3 failures: HUMAN CHECKPOINT with failure log
- Human may: override score, provide direction, request full restart, or approve with exceptions

---

## FEEDBACK BUS

### Upstream Dependencies

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 04-mechanism | Mechanism explanation doesn't simplify cleanly for narrative | `{ skill: "04-mechanism", request: "narrative_simplification", issue: string }` |
| 04-mechanism | Naming doesn't create dramatic reveal moment | `{ skill: "04-mechanism", request: "naming_drama", current_name: string }` |
| 13-root-cause-narrative | Root cause bridge doesn't connect to mechanism entry point | `{ skill: "13-root-cause-narrative", request: "bridge_alignment", issue: string }` |
| 02-proof-inventory | Insufficient proof for selected integration strategy | `{ skill: "02-proof-inventory", request: "mechanism_proof_gap", strategy: string }` |
| 08-structure | Mechanism placement in CPB structure conflicts with explanation sequence | `{ skill: "08-structure", request: "mechanism_placement", conflict: string }` |

### Downstream Skills

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 15-product-introduction | mechanism-narrative-package.json assembled | Uses `downstream_handoffs.for_product_introduction` |
| Body copy assembly | mechanism-narrative-package.json assembled | Uses `downstream_handoffs.for_body_copy` |
| 17-close | mechanism-narrative-package.json assembled | Uses `downstream_handoffs.for_close` |

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
`14-mechanism-narrative/outputs/narrative-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  mechanism_name: string
  e_level: string
  narrative_type: string
  framing_patterns: [string]
  emotional_arc: string
  simplification_techniques: [string]
  naming_architecture: string
  bridge_type: string
  villain_mechanism_pairing: string
  word_count: integer
  human_checkpoint_response: string
  gate_results:
    layer_0: enum[pass, fail]
    layer_1: enum[pass, fail]
    layer_2: enum[pass, fail]
    layer_3: enum[pass, fail]
    layer_4: enum[pass, fail]
  validation_scores:
    narrative_clarity: float
    mechanism_graspability: float
    simplification_quality: float
    proof_integration: float
    emotional_arc_continuity: float
    naming_memorability: float
    product_bridge_smoothness: float
    overall_weighted_average: float
  feedback_requests: [object]
  failure_log: [object]

narrative_type_pattern_entry:
  niche: string
  e_level: string
  narrative_type_selected: string
  framing_patterns: [string]
  simplification_techniques: [string]
  effectiveness_score: float
  word_count: integer
  notes: string
```

### Manager Responsibility
- Log every run automatically upon completion
- Track narrative type effectiveness by E-level and niche
- Track simplification technique combinations that produce highest graspability scores
- Track naming architecture performance across niches
- Track villain-mechanism pairing effectiveness
- Track product bridge type smoothness scores
- Surface recurring E-level alignment issues for classification improvement
- Track human checkpoint modification patterns

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.3 | 2026-02-12 | Model Assignment Table: Added Binding Model Assignment Table. Haiku for infrastructure (Pre/0), sonnet for classification (1) and packaging (4), opus for generation/Arena/validation (2-3). |
| 1.2 | 2026-02-03 | Added Layer 2.5 Arena integration with 6-persona generation panel, 7 judging criteria (Mechanism Graspability 20%, Naming Memorability 20%, Metaphor Anchor Quality 15%, Simplification Effectiveness 15%, "Aha Moment" Clarity 10%, Proof Integration 10%, Product Bridge Smoothness 10%), BLOCKING human selection checkpoint at Gate 2.5, updated state machine |
| 1.1 | 2026-02-01 | Added 0.2.5 and 0.2.6 to Layer 0 with specimen loading protocol; integrated verbatim Gold specimens for type-indexed loading |
| 1.0 | 2026-01-27 | Initial build: TIER1-taught execution skill with human checkpoint, 7 narrative types, 5-phase sequence, E-level decision matrix, 6 simplification techniques, 4 bridge patterns, villain-mechanism pairing system |
