# STORY-AGENT.md

> **Version:** 1.2
> **Skill:** 12-story
> **Position:** Post-Lead, Pre-Close (or embedded within campaign argument)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** 02-proof-inventory, 03-root-cause, 04-mechanism, 05-promise, 08-structure, 09-campaign-brief, 11-lead
> **Output:** `story-package.json`

---

## PURPOSE

Engineer the **Campaign Story** -- the narrative engine that transports the prospect into an experience that makes the mechanism, promise, and proof FEEL real. The story is not decoration. It is the vehicle through which the prospect emotionally validates the campaign thesis -- they don't just believe the argument, they FEEL it through the protagonist's journey.

**Story functions in copy:**
- **Discovery Story:** Shows HOW the mechanism was found (most common in health supplements)
- **Proof Story / Live Experiment:** Shows the mechanism WORKING on real people with documented results (finance, golf, performance)
- **Origin Story:** Shows WHY the product/method exists
- **Transformation Story:** Shows WHAT happened when the protagonist used the mechanism
- **Revelation Story:** Shows an expert uncovering a hidden truth
- **Warning Story:** Shows WHAT happens if the prospect does NOT act
- **Underdog / Vulnerability Story:** Shows a shame-to-dignity arc that mirrors the prospect's experience

**Success Criteria:**
- Story type classified from vault patterns, niche context, and available campaign assets
- Story beats mapped to a structured sequence appropriate for the classified type
- Protagonist designed to mirror the prospect (or serve as aspirational authority)
- Emotional arc engineered from prospect's current state to belief/desire
- Setup establishes context and stakes without over-explaining
- Discovery/experiment sequence builds suspense and curiosity
- Mechanism revelation emerges naturally from the narrative (not inserted artificially)
- Transformation/payoff delivers emotional proof that the mechanism works
- Carlton storytelling principles applied: concise, breathless, empathetic, conversational
- Proof elements woven naturally into the narrative (not bolted on)
- Sensory details calibrated for believability and immersion
- Suspense and pacing optimized with strategic tension points
- Story achieves its persuasion function (the prospect FEELS the mechanism is real)
- "And here's what that means for YOU" segue connects story to prospect's life
- Anti-slop validated: zero generic, cliched, or unbelievable story elements
- Overall quality score >= 7.0/10 weighted average

This agent is a **workflow orchestrator**. It delegates to microskills and validates outputs at each gate. It does NOT write final body copy, construct the full campaign argument, or present the offer.

---

## IDENTITY

**This skill IS:**
- The narrative engine that makes the mechanism FEEL real through story
- A story type classification and engineering system
- The emotional proof delivery vehicle (complementing logical proof)
- A discovery/experiment sequence builder
- A character and protagonist architecture system
- The "transporting" mechanism that puts the prospect inside the experience
- A suspense, pacing, and tension engineering system
- The bridge between the lead's tease and the argument's proof

**This skill is NOT:**
- A lead writer (that is 11-lead -- the lead TEASES the story, this skill TELLS it)
- A campaign argument builder (that is 08-structure)
- A logical proof delivery system (proof comes in CPB chunks)
- A mechanism explanation tool (the mechanism explanation is separate from the story)
- A close or offer presentation tool (downstream)
- A headline writer (upstream)
- A feature list or product description

**Upstream:** Receives `lead-package.json`, `structure-package.json`, `mechanism-package.json`, `proof-inventory-output.json`, `root-cause-package.json`, `promise-package.json`
**Downstream:** Feeds `story-package.json` to body copy, campaign argument, and close skills

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Foundation + specimen loading | haiku | Input loading, no reasoning needed |
| 1 | Story type classification + beat structure mapping | sonnet | Pattern matching from vault |
| 2 | Full story construction (beat by beat) | opus | Creative generation — max quality |
| 2.5 | Arena (7 competitors × 2 rounds + audience evaluation) | opus | Maximum quality generation |
| 3 | Refinement + Carlton compliance | opus | Judgment-heavy evaluation |
| 4 | Validation + packaging | sonnet | Assembly from existing content |

### Layer 2.5: Arena (MANDATORY FILE READS)

**BEFORE generating ANY Arena competitor output, READ these files:**

1. `12-story/ARENA-LAYER.md` — skill-specific criteria and weights
2. `~system/protocols/ARENA-CORE-PROTOCOL.md` — execution protocol
3. `~system/protocols/ARENA-PERSONA-PANEL.md` — persona specifications

**VERIFY personas match protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect**

**If personas don't match → HALT — FABRICATION DETECTED**

---

## TEACHING FOUNDATIONS

**Primary: John Carlton Storytelling Principles**
1. Three-line story structure: SETUP (tease of payoff), ACTION (fulfillment of tease), MORAL (punchline)
2. The concept of "transporting" is critical -- reader must feel they're IN the world you create
3. Breathless prose: make prospect afraid to exhale, for fear of missing a delicious detail
4. Trim excess: delete everything that doesn't need to be there -- concise stories pack a punch
5. "And here's what that means for YOU..." -- complete the thought, connect story to reader's life
6. The story is about your READER, not you -- readers want to see THEMSELVES in the story
7. Conversational approach: imagine talking face-to-face, stay in the reader's pocket
8. Empathy requirement: the story must demonstrate understanding of the prospect's experience
9. Reader should FEEL something: happiness, alarm, astonishment, or greed
10. Don't try clever transitions -- just say "And here's what that means for YOU"

**Secondary: Discovery Story Formats (from Source Teachings)**

*Standard Discovery Format:*
1. The Trip (inciting incident that puts protagonist in position to discover)
2. Finding Yoda (encountering the person/source who holds the secret)
3. The Cry for Help (emotional breakdown/vulnerability that opens the door)
4. Yoda Reveals Secret (the mechanism/solution is shared)
5. Studying / Verification (protagonist researches and validates)
6. Root Cause Addressed (the mechanism's connection to the real problem)

*Accidental Discovery Format:*
1. The Accident / Inciting Event (unplanned event leads to discovery)
2. Finding Yoda (encountering the guide)
3. Yoda Reveals Secret (the ingredient/method is shared)
4. Studying / Verification (research and validation)
5. Root Cause Addressed

*Straight-to-Expert Format:*
1. Finding Yoda (direct connection to expert/authority)
2. Trip to New Reality (expert reveals shocking information)
3. Yoda Reveals Secret (the mechanism is explained)
4. Verification (proof and research)
5. Root Cause Addressed

**Tertiary: Proof Story / Live Experiment (Makepeace Pattern)**
1. Beta-tester / live experiment framing: "I invited X people to test this..."
2. Data cascade: specific results with dates, numbers, percentages (ascending)
3. Escalation narrative: "imagine if you had invested..." / "but it didn't stop there..."
4. Ordinariness proof: "most were ordinary people just like you and me"
5. Transparency paradox: acknowledge losses/limitations (builds credibility)
6. Simplicity proof: "even a 12-year old can do it" / Step 1, Step 2, Step 3
7. Specificity as proof: document EVERY result, winners AND losers
8. Re-investment compounding: show wealth/results building over time
9. Exclusivity frame: "only 1 out of every 100 readers" / keeping it under the radar
10. Works across niches: finance (documented trades), golf (live experiment proving method), health (clinical trials)

**Quaternary: Lead-Story Integration (Georgi Framework)**
1. The lead TEASES the discovery story (Georgi DO: "Briefly tease discovery story")
2. The lead does NOT tell the discovery story (Georgi DON'T: "Go deeply into the discovery story")
3. 12-story is the DOWNSTREAM expansion of what 11-lead only TEASED
4. The story must deliver on the tease without repeating the lead's setup

**Vault Intelligence: Story Patterns from TIER1 Extractions**
- Standard Discovery stories (health supplements -- trip/yoda/secret/verification)
- Proof/data cascade stories (finance -- documented trades, ascending results)
- Authority revelation stories (doctor/expert reveals hidden mechanism)
- Vulnerability/shame stories (personal failure leading to discovery)
- Warning/conspiracy stories (evidence of cover-up or hidden danger)
- Transformation narratives (before/after arc with sensory detail)
- Live experiment narratives (beta-test with real people, real results)

---

## STATE MACHINE

```
IDLE → LOADING → ARCHITECTURE → CONSTRUCTION → ARENA → REFINEMENT → VALIDATION → COMPLETE
         │            │              │            │          │            │
         ▼            ▼              ▼            ▼          ▼            ▼
      [GATE_0]     [GATE_1]      [GATE_2]    [GATE_2.5]  [GATE_3]     [GATE_4]
      PASS/FAIL    PASS/FAIL     PASS/FAIL   HUMAN_SEL   PASS/FAIL    PASS/FAIL
         │            │              │            │          │            │
         ▼            ▼              ▼            ▼          ▼            ▼
     FAIL_L0      FAIL_L1        FAIL_L2    FAIL_ARENA   FAIL_L3      FAIL_L4
         │            │              │            │          │            │
         ▼            ▼              ▼            ▼          ▼            ▼
    [Remediate]  [Remediate]   [Remediate]  [Re-generate] [Remediate] [Remediate]
         │            │              │            │          │            │
         └────────────┴──────────────┴────────────┴──────────┴────────────┘
                                        ▲
                                        │
                                  Max 3 iterations
                                  per layer, then
                                  HUMAN CHECKPOINT
```

**CRITICAL: GATE_2.5 is a BLOCKING checkpoint requiring explicit human input. The agent MUST present ranked story candidates and WAIT for human selection before proceeding to Layer 3.**

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

**Purpose:** Load all upstream packages, source teachings, and vault intelligence. Validate completeness before story engineering begins.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load and parse all upstream skill packages including lead-package |
| 0.2 | `0.2-vault-intelligence-loader.md` | Load story patterns from TIER1 extractions |
| 0.3 | `0.3-teachings-loader.md` | Load Carlton principles, discovery story formats, Makepeace proof story pattern |
| 0.4 | `0.4-input-validator.md` | Validate all inputs present and above minimum thresholds |

**Execution Order:**
1. 0.1, 0.2, 0.3 run in parallel (independent data loading)
2. 0.4 runs after all three complete (validates aggregated data)

**Gate 0:** All upstream packages loaded, teachings indexed, vault story patterns available, validation status = PASS. FAIL = missing mechanism package OR structure package absent OR lead package not provided OR teaching index incomplete.

---

### Layer 1: Story Architecture

**Purpose:** Classify the optimal story type, map the story beats, design the protagonist and supporting characters, and engineer the emotional arc from the prospect's current state through the story to belief/desire.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-story-type-classifier.md` | Classify optimal story type from vault patterns + niche + available assets |
| 1.2 | `1.2-story-beat-mapper.md` | Map the story beats/structure for the classified type |
| 1.3 | `1.3-character-architect.md` | Design protagonist, supporting characters, antagonist/villain |
| 1.4 | `1.4-emotional-arc-designer.md` | Design emotional progression from prospect's state to belief/desire |

**Execution Order:**
1. 1.1 first (story type determines everything downstream)
2. 1.2 after 1.1 (beat mapping depends on story type)
3. 1.3 in parallel with 1.2 (character design can begin once type is known)
4. 1.4 after 1.2 and 1.3 (emotional arc integrates beats and characters)

**Gate 1:** Story type classified with vault reference, story beats mapped to classified type, protagonist designed with prospect-mirroring elements, emotional arc designed from current state through story to belief/desire. FAIL = no story type selected OR beats don't match type OR protagonist doesn't mirror prospect OR emotional arc doesn't end at belief/desire.

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

### Layer 2: Story Construction

**Purpose:** Build the story's four core sections: setup/context, discovery/experiment sequence, mechanism revelation, and transformation/payoff.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-setup-context-builder.md` | Build the story's opening -- setup, context, inciting incident |
| 2.2 | `2.2-discovery-sequence-builder.md` | Build the discovery/experiment sequence (yoda, clue, reveal) |
| 2.3 | `2.3-mechanism-revelation-constructor.md` | Build the moment the mechanism/secret is revealed |
| 2.4 | `2.4-transformation-payoff-builder.md` | Build the resolution, results, and emotional payoff |

**Execution Order:**
1. 2.1 first (setup establishes context for everything that follows)
2. 2.2 after 2.1 (discovery sequence continues from setup)
3. 2.3 after 2.2 (mechanism revelation is the climax of the discovery)
4. 2.4 after 2.3 (transformation/payoff follows revelation)

**Gate 2:** Setup establishes context and stakes without over-explaining, discovery/experiment sequence builds suspense with strategic tension points, mechanism revelation emerges naturally from narrative, transformation/payoff delivers emotional proof. FAIL = setup over-explains OR discovery sequence lacks suspense OR mechanism revelation feels artificial OR payoff doesn't deliver emotional proof.

---

### Layer 2.5: Arena Persona Evaluation

**Purpose:** Generate multiple story variations through 6 legendary copywriter persona lenses, judge each against story-specific criteria, rank candidates, and present top performers for human selection.

**Reference:** `12-story/ARENA-LAYER.md`

**Persona Panel:**

| Persona | Lens Focus | Story Contribution |
|---------|------------|-------------------|
| Makepeace | Flow, architecture, rhythm | Structure, pacing, narrative architecture |
| Halbert | Entertainment, hook, engagement | Hook power, reader engagement, entertainment value |
| Schwartz | Market sophistication, positioning | Audience calibration, awareness-appropriate framing |
| Ogilvy | Credibility, clarity, elegance | Authority, clarity, proof integration |
| Clemens | Scientific clarity, binary reframes | Mechanism-backed beats, 12-year-old language, binary framing |
| Bencivenga | Proof-first, credibility, specificity | Evidence weaving, credibility establishment |

**7 Judging Criteria (100% total):**

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| Narrative Transportation | 20% | Reader feels IN the world (Carlton "transporting") |
| Emotional Arc Quality | 20% | Progression from prospect's state to belief/desire |
| Mechanism Revelation Naturalness | 15% | Mechanism emerges from story (not inserted) |
| Suspense & Pacing | 15% | Tension points, breathless prose, rhythm |
| Carlton Compliance | 10% | 9-point checklist adherence |
| Proof Integration | 10% | Evidence woven naturally (not bolted on) |
| Story Function Achievement | 10% | Prospect FEELS mechanism is real |

**Gate 2.5:** Human must select winning story candidate from ranked shortlist. This is a BLOCKING checkpoint — execution HALTS until human selection is received.

---

### Layer 3: Story Refinement

**Purpose:** Apply Carlton storytelling principles, calibrate sensory details, optimize suspense and pacing, and validate proof integration.

| Skill | File | Function |
|-------|------|----------|
| 3.1 | `3.1-sensory-detail-calibrator.md` | Calibrate sensory details for believability and immersion |
| 3.2 | `3.2-suspense-pacing-optimizer.md` | Optimize pacing, tension, and suspense with strategic open loops |
| 3.3 | `3.3-proof-integration-validator.md` | Validate proof/credibility elements woven naturally into narrative |
| 3.4 | `3.4-carlton-compliance-checker.md` | Apply Carlton principles: concise, breathless, empathetic, conversational |

**Execution Order:**
1. 3.1 and 3.2 in parallel (independent refinement passes)
2. 3.3 after 3.1 (proof integration checked after sensory details are calibrated)
3. 3.4 after all three (Carlton compliance is the final refinement pass)

**Gate 3:** Sensory details calibrated for immersion without over-description, suspense optimized with minimum 2 tension points, proof elements woven naturally (not bolted on), Carlton compliance = PASS (concise, breathless, empathetic, conversational, "here's what that means for YOU" present). FAIL = sensory details unbelievable or excessive OR pacing flat OR proof feels artificial OR Carlton violations.

---

### Layer 4: Validation & Assembly

**Purpose:** Validate the story achieves its persuasion function, check mechanism-story alignment, run anti-slop checks, compare to vault patterns, and assemble the final story package.

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-story-function-validator.md` | Validate the story achieves its persuasion function |
| 4.2 | `4.2-mechanism-story-alignment-checker.md` | Verify story properly supports/proves the mechanism |
| 4.3 | `4.3-anti-slop-validator.md` | Check for generic, cliched, or unbelievable story elements |
| 4.4 | `4.4-vault-pattern-comparator.md` | Compare story to elite patterns from vault |
| 4.5 | `4.5-final-story-assembler.md` | Assemble complete story-package.json |

**Execution Order:**
1. 4.1, 4.2, 4.3, 4.4 run in parallel (independent validation passes)
2. 4.5 after all four validators complete (assembles final output with all scores)

**Gate 4:** Story function validated (prospect FEELS mechanism is real), mechanism-story alignment confirmed, anti-slop = PASS (zero violations), vault comparison completed with differentiation notes, overall weighted average >= 7.0/10. FAIL = story doesn't achieve persuasion function OR mechanism-story misaligned OR anti-slop violations > 0 OR overall score < 7.0.

---

## PERSONA DEPLOYMENT

| Layer | Task | Primary Persona | Secondary Persona |
|-------|------|-----------------|-------------------|
| 0.1-0.3 | Data loading | Dr. James Liu -- Research Director | -- |
| 0.4 | Input validation | Dr. James Liu -- Research Director | Sarah A. Conco -- Client Protection |
| 1.1 | Story type classification | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 1.2 | Story beat mapping | The Legendary Copywriter | Marcus Webster -- Pattern Synthesis |
| 1.3 | Character architecture | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 1.4 | Emotional arc design | The Legendary Copywriter | Marcus Webster -- Pattern Synthesis |
| 2.1 | Setup/context building | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 2.2 | Discovery/experiment sequence | The Legendary Copywriter | Alex Rivera -- Strategic Integration |
| 2.3 | Mechanism revelation | The Legendary Copywriter | Dr. Alena Vasquez -- Evidence Evaluation |
| 2.4 | Transformation/payoff | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 3.1 | Sensory detail calibration | The Legendary Copywriter | Dr. Richard Stern -- Skeptical Academic |
| 3.2 | Suspense/pacing optimization | Jake Torres -- Viral Content Architect | The Legendary Copywriter |
| 3.3 | Proof integration | Dr. Alena Vasquez -- Evidence Evaluation | The Legendary Copywriter |
| 3.4 | Carlton compliance | The Legendary Copywriter | Sarah A. Conco -- Client Protection |
| 4.1 | Story function validation | Alex Rivera -- Strategic Integration | The Legendary Copywriter |
| 4.2 | Mechanism-story alignment | Dr. James Liu -- Research Director | Alex Rivera -- Strategic Integration |
| 4.3 | Anti-slop validation | Sarah A. Conco -- Client Protection | Dr. Richard Stern -- Skeptical Academic |
| 4.4 | Vault pattern comparison | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 4.5 | Final assembly | Alex Rivera -- Strategic Integration | Dr. James Liu -- Research Director |

Reference: `~brain/documentation/PERSONA-SYSTEM.md`

---

## OUTPUT: story-package.json

```yaml
story_package:
  metadata:
    version: "1.0"
    skill: "12-story"
    generated: timestamp
    niche: string
    sub_niche: string
    target_placement: enum[discovery_story, proof_story, origin_story, body_narrative, standalone]

  story_classification:
    story_type: enum[standard_discovery, accidental_discovery, straight_to_expert, proof_story_live_experiment, origin_story, transformation_story, revelation_story, warning_story, underdog_vulnerability, hybrid]
    story_format: enum[standard_discovery, accidental_discovery, straight_to_expert, proof_data_cascade, origin_narrative, transformation_arc, revelation_sequence, warning_narrative, vulnerability_arc]
    vault_reference: string  # which TIER1 pattern influenced the classification
    classification_rationale: string

  protagonist:
    name: string
    role: enum[everyman_proxy, authority_figure, reluctant_discoverer, beta_tester_group, patient_zero, protagonist_couple]
    prospect_mirror_elements:
      - element: string
        connection: string  # how this mirrors the prospect
    vulnerability: string  # what makes them relatable
    credibility: string  # why the prospect should trust their experience
    emotional_starting_state: string

  supporting_characters:
    - character_id: string
      name: string
      role: enum[yoda_guide, authority_validator, villain_antagonist, supporting_witness, beta_tester, spouse_partner, skeptic_converted]
      function_in_story: string
      introduction_point: string  # which beat introduces them

  story_beats:
    - beat_id: string
      beat_type: enum[setup, inciting_incident, trip, finding_yoda, cry_for_help, yoda_reveals, clue_discovery, experiment_launch, data_point, escalation, verification, root_cause_reveal, mechanism_revelation, transformation, payoff, segue_to_reader]
      sequence_position: integer
      content_summary: string
      emotional_state: string
      tension_level: enum[low, medium, high, peak]
      open_loops_created: [string]
      open_loops_closed: [string]

  story_sections:
    setup:
      text: string
      word_count: integer
      inciting_incident: string
      stakes_established: boolean
      over_explains: boolean  # MUST be false
    discovery_sequence:
      text: string
      word_count: integer
      sequence_type: enum[trip_yoda_reveal, experiment_data_cascade, expert_teaching, accidental_encounter]
      tension_points: integer
      suspense_devices: [string]
    mechanism_revelation:
      text: string
      word_count: integer
      revelation_feels_natural: boolean  # MUST be true
      mechanism_named: boolean
      explains_how_fully: boolean  # may be true in story (unlike lead)
      connects_to_root_cause: boolean
    transformation_payoff:
      text: string
      word_count: integer
      emotional_proof_delivered: boolean  # MUST be true
      results_specific: boolean
      segue_to_reader: string  # "And here's what that means for YOU..."

  proof_story_elements:  # populated only for proof_story_live_experiment type
    experiment_framing: string  # "I invited 487 people to beta-test..."
    data_cascade:
      - data_point_id: string
        date: string
        result: string
        percentage: string
    escalation_narrative: string  # "imagine if you had invested..."
    ordinariness_proof: string  # "most were ordinary people just like you"
    transparency_element: string  # admits losses/limitations
    simplicity_proof: string  # "Step 1, Step 2, Step 3"
    specificity_score: integer[1-10]  # how specific are the results

  emotional_arc:
    starting_state: string
    ending_state: string  # must include "believes mechanism is real"
    progression_stages:
      - stage: string
        emotional_state: string
        triggered_by: string
    peak_moment: string
    arc_shape: enum[tension_to_relief, shame_to_dignity, confusion_to_clarity, skepticism_to_belief, fear_to_hope, curiosity_to_conviction]

  carlton_compliance:
    three_line_structure: boolean  # setup, action, moral present
    transporting: boolean  # reader feels IN the world
    breathless_prose: boolean  # afraid to exhale
    excess_trimmed: boolean  # nothing that doesn't need to be there
    means_for_you_segue: boolean  # "And here's what that means for YOU"
    about_reader_not_writer: boolean  # reader sees themselves
    conversational: boolean  # sounds spoken, not written
    empathy_present: boolean  # demonstrates understanding
    reader_feels_something: boolean  # happiness, alarm, astonishment, or greed
    compliance_status: enum[pass, fail]

  full_story_text: string  # the complete assembled story copy

  validation_scores:
    story_function: integer[1-10]  # does the story achieve its persuasion purpose
    mechanism_alignment: integer[1-10]  # story supports the mechanism
    emotional_arc_quality: integer[1-10]  # emotional journey is compelling
    suspense_pacing: integer[1-10]  # tension and pacing effective
    sensory_immersion: integer[1-10]  # reader feels transported
    proof_integration: integer[1-10]  # proof woven naturally
    carlton_compliance: enum[pass, fail]
    anti_slop: enum[pass, fail]
    anti_slop_violations: integer
    vault_comparison: integer[1-10]
    vault_differentiation_notes: string
    overall_weighted_average: float

  downstream_handoffs:
    for_body_copy:
      story_placement: string  # where in the campaign this story goes
      story_callbacks: [string]  # references the body can call back to
      emotional_state_at_handoff: string
      open_loops_from_story: [object]
    for_campaign_argument:
      mechanism_proof_from_story: string  # how the story proves the mechanism
      credibility_established: [string]
      belief_shifts_achieved: [string]
    for_close:
      transformation_to_reference: string
      protagonist_result_for_future_pace: string
      urgency_elements_from_story: [string]
```

---

## CONSTRAINTS

### Input Constraints
1. NEVER begin Layer 1 without validated upstream packages from mechanism, promise, structure, and lead skills
2. NEVER proceed if mechanism_package is absent -- the story must support the mechanism
3. NEVER proceed without lead-package -- the story expands what the lead teased
4. ALWAYS load vault story patterns before type classification

### Layer 1 Constraints
5. NEVER classify a story type without vault pattern reference -- classification must be informed by elite controls
6. NEVER select a story type that doesn't match available campaign assets (don't classify as "proof story" without proof data)
7. ALWAYS map story beats to the classified type's format -- don't mix formats without justification
8. NEVER design a protagonist that the prospect cannot see themselves in (or cannot admire as authority)
9. NEVER design an emotional arc that ends at "interested" -- it must end at "believes mechanism is real"

### Layer 2 Constraints
10. NEVER over-explain in the setup -- establish context and stakes quickly, then move to action
11. NEVER let the discovery/experiment sequence go flat -- maintain tension with at least 2 strategic tension points
12. NEVER make the mechanism revelation feel artificial or inserted -- it must emerge NATURALLY from the narrative
13. NEVER skip the transformation/payoff -- the prospect must see/feel the results
14. ALWAYS include specificity in the payoff -- vague results do not persuade
15. NEVER write the proof story without a data cascade -- the Makepeace pattern requires specific, documented results
16. ALWAYS include the "ordinariness proof" in proof stories -- "ordinary people just like you"
17. ALWAYS include the transparency paradox in proof stories -- acknowledge losses/limitations

### Layer 3 Constraints
18. NEVER include sensory details that strain believability -- immersion without fantasy
19. NEVER allow the pacing to go flat for more than 2 consecutive beats -- maintain reader's oxygen-debt
20. NEVER bolt proof onto the story -- proof must emerge from the narrative naturally
21. ALWAYS apply Carlton's conciseness principle -- delete everything that doesn't need to be there
22. ALWAYS include the "And here's what that means for YOU" segue -- connect story to reader's life
23. ALWAYS verify conversational flow -- the story must sound spoken, not written
24. ALWAYS verify empathy -- the story must demonstrate understanding of the prospect's experience

### Layer 4 Constraints
25. NEVER pass Gate 4 if the story doesn't achieve its persuasion function -- the prospect must FEEL the mechanism is real
26. NEVER pass Gate 4 if the story doesn't support the mechanism -- story-mechanism alignment is non-negotiable
27. NEVER pass Gate 4 with anti-slop violations > 0
28. NEVER output story-package.json without full_story_text populated
29. ALWAYS verify the story expands what the lead teased (not repeats it)

### Process Constraints
30. NEVER skip a layer -- sequential execution only (Layer 0 -> 1 -> 2 -> 3 -> 4)
31. NEVER iterate more than 3 times on any single layer before human checkpoint
32. ALWAYS log gate failures with specific failure reasons before remediation
33. NEVER allow the orchestrator to write story copy directly -- delegate to microskills only

---

## CONSTRAINTS ENFORCEMENT (ADDITIONAL)

### Input Integrity Constraints
34. MUST validate lead-package.json exists before story engineering begins
35. MUST NOT proceed without mechanism_package -- story must support the mechanism
36. MUST verify structure_package contains campaign_thesis for alignment
37. ONLY accept inputs that pass schema validation -- malformed data = HALT

### Story Classification Constraints
38. MUST classify story type with vault pattern reference -- no ungrounded classification
39. MUST NOT select story type that doesn't match available proof assets
40. MUST verify selected format matches classified type -- no format mixing without justification
41. ONLY use approved story types from vault patterns and teachings

### Character Architecture Constraints
42. MUST design protagonist with explicit prospect_mirror_elements
43. MUST NOT allow protagonist that prospect cannot see themselves in (or admire as authority)
44. MUST specify emotional_starting_state for protagonist
45. ONLY include supporting characters that serve clear narrative functions

### Story Construction Constraints
46. MUST establish stakes in setup without over-explaining
47. MUST include minimum 2 strategic tension points in discovery/experiment sequence
48. MUST NOT allow mechanism revelation that feels artificial or inserted
49. MUST ensure transformation/payoff includes specific results (not vague)
50. ONLY proceed to revelation after discovery sequence builds sufficient suspense

### Proof Story Specific Constraints
51. MUST include data cascade for proof_story_live_experiment type
52. MUST include ordinariness proof ("ordinary people just like you")
53. MUST include transparency paradox (acknowledge losses/limitations)
54. MUST NOT fabricate experiment data -- all data must trace to proof inventory

### Carlton Compliance Constraints
55. MUST apply three-line structure: setup, action, moral
56. MUST achieve "transporting" -- reader feels IN the world
57. MUST trim excess -- delete everything that doesn't need to be there
58. MUST include "And here's what that means for YOU" segue
59. MUST verify conversational flow -- sounds spoken, not written
60. MUST verify empathy -- story demonstrates understanding of prospect experience

### Output Constraints
61. MUST NOT output story-package.json without full_story_text populated
62. MUST verify story expands what lead teased (not repeats it)
63. MUST populate all downstream_handoffs before assembly
64. ONLY output schema-compliant JSON -- violations = automatic rejection

---

## FAILURE MODES

| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| Lead package missing | CRITICAL | Layer 0.4 | HALT -- "Story expands what lead teased" |
| Mechanism package missing | CRITICAL | Input validation | HALT -- "Story must support mechanism" |
| Structure package missing | HIGH | Input validation | HALT -- "Story must integrate with campaign argument" |
| Story type no vault reference | MEDIUM | Layer 1.1 check | REMEDIATE -- ground in elite patterns |
| Story type mismatches assets | HIGH | Layer 1.1 check | REJECT -- select type that matches available proof |
| Protagonist not relatable | HIGH | Layer 1.3 check | REMEDIATE -- add prospect mirror elements |
| Setup over-explains | MEDIUM | Layer 2.1 check | REMEDIATE -- trim to context and stakes only |
| Discovery sequence flat | HIGH | Layer 2.2 check | REMEDIATE -- add tension points (minimum 2) |
| Mechanism revelation artificial | CRITICAL | Layer 2.3 check | REJECT -- must emerge naturally from narrative |
| Payoff lacks specificity | HIGH | Layer 2.4 check | REMEDIATE -- add specific results |
| Proof story missing data cascade | HIGH | Type check | REMEDIATE -- add documented results |
| Carlton violation | HIGH | Layer 3.4 check | REMEDIATE -- apply specific principle |
| Story doesn't achieve function | HIGH | Layer 4.1 check | REMEDIATE -- prospect must FEEL mechanism is real |
| Mechanism-story misalignment | CRITICAL | Layer 4.2 check | REJECT -- story must support mechanism |
| Anti-slop violations > 0 | HIGH | Layer 4.3 check | REJECT -- replace flagged language |

---

## ANTI-SLOP LEXICON

NEVER use these words/phrases in generated output:

**Vague Qualifiers:**
- many, often, most, some, several, usually, typically
- around, approximately, a lot of, various, numerous

**AI Telltales:**
- revolutionary, game-changing, unlock, harness, leverage
- dive deep, journey, empower, transform your life
- cutting-edge, next-level, paradigm shift

**Corporate Filler:**
- comprehensive, robust, innovative, state-of-the-art
- synergy, holistic, seamless, scalable, best-in-class

**Hedge Words:**
- might, could potentially, should consider, may want to
- perhaps, arguably, it seems, in some ways

**Cliched Story Language:**
- "little did I know," "everything changed," "that's when I realized"
- "I couldn't believe my eyes," "my jaw dropped"
- "fast forward to today," "long story short"

**Generic Descriptions:**
- "beautiful," "amazing," "incredible" (without specific detail)
- "a breakthrough moment," "a turning point" (without showing)

---

## ACTIVE QUALITY GATE ENFORCEMENT

### Gate 0: Foundation
```
IF lead_package_missing:
  LOG: "GATE_0 FAILED: lead-package.json not found"
  ACTION: HALT
  REMEDIATION: "Run 11-lead before 12-story"

IF mechanism_package_missing:
  LOG: "GATE_0 FAILED: mechanism-package.json not found"
  ACTION: HALT
  REMEDIATION: "Run 04-mechanism before 12-story"
```

### Gate 1: Architecture
```
IF story_type_no_vault_reference:
  LOG: "GATE_1 FAILED: Story type [type] has no vault pattern reference"
  ACTION: REMEDIATE
  REMEDIATION: "Ground classification in elite control patterns"

IF story_type_mismatches_assets:
  LOG: "GATE_1 FAILED: Story type [type] requires assets not available"
  ACTION: REJECT
  REMEDIATION: "Select story type matching available proof assets"

IF protagonist_not_relatable:
  LOG: "GATE_1 FAILED: Protagonist lacks prospect mirror elements"
  ACTION: REMEDIATE
  REMEDIATION: "Add elements that allow prospect to see themselves"

IF emotional_arc_ends_at_interested:
  LOG: "GATE_1 FAILED: Arc ends at 'interested' not 'believes mechanism is real'"
  ACTION: REMEDIATE
  REMEDIATION: "Redesign arc to achieve belief/desire endpoint"
```

### Gate 2: Construction
```
IF setup_over_explains:
  LOG: "GATE_2 FAILED: Setup over-explains at [location]"
  ACTION: REMEDIATE
  REMEDIATION: "Trim to context and stakes only"

IF tension_points < 2:
  LOG: "GATE_2 FAILED: Discovery sequence has only [N] tension points"
  ACTION: REMEDIATE
  REMEDIATION: "Add suspense devices: cliffhanger, obstacle, escalation"

IF mechanism_revelation_artificial:
  LOG: "GATE_2 FAILED: Mechanism revelation feels inserted at [location]"
  ACTION: REJECT
  REMEDIATION: "Mechanism must emerge naturally from narrative"

IF payoff_lacks_specificity:
  LOG: "GATE_2 FAILED: Transformation/payoff uses vague results"
  ACTION: REMEDIATE
  REMEDIATION: "Add specific, documented results"
```

### Gate 3: Refinement
```
IF sensory_details_unbelievable:
  LOG: "GATE_3 FAILED: Sensory details strain believability at [location]"
  ACTION: REMEDIATE
  REMEDIATION: "Calibrate for immersion without fantasy"

IF proof_bolted_on:
  LOG: "GATE_3 FAILED: Proof elements feel bolted on at [location]"
  ACTION: REMEDIATE
  REMEDIATION: "Weave proof naturally into narrative"

IF carlton_violation:
  LOG: "GATE_3 FAILED: Carlton principle violated: [specific]"
  ACTION: REMEDIATE
  REMEDIATION: "Apply: concise, breathless, empathetic, conversational"

IF segue_missing:
  LOG: "GATE_3 FAILED: 'And here's what that means for YOU' segue missing"
  ACTION: REMEDIATE
  REMEDIATION: "Add explicit reader connection segue"
```

### Gate 4: Validation
```
IF story_function_not_achieved:
  LOG: "GATE_4 FAILED: Story doesn't achieve persuasion function"
  ACTION: REMEDIATE
  REMEDIATION: "Prospect must FEEL mechanism is real"

IF mechanism_story_misaligned:
  LOG: "GATE_4 FAILED: Story doesn't support mechanism"
  ACTION: REJECT
  REMEDIATION: "Realign story to mechanism -- non-negotiable"

IF anti_slop_violations > 0:
  LOG: "GATE_4 FAILED: [N] anti-slop violations: [list]"
  ACTION: REJECT
  REMEDIATION: "Replace flagged language with specific alternatives"

IF overall_score < 7.0:
  LOG: "GATE_4 FAILED: Overall score [X] below 7.0 threshold"
  ACTION: REMEDIATE
  REMEDIATION: "Identify lowest dimension, return to relevant layer"
```

---

## EXECUTION RULES

1. Begin in IDLE state. Transition to LOADING when invoked.
2. Execute each layer's microskills in the specified execution order (sequential or parallel as noted).
3. After each layer completes, evaluate the gate conditions.
4. If a gate PASSES, transition to the next layer.
5. If a gate FAILS, log the failure reason, remediate within the current layer (max 3 iterations), then re-evaluate the gate.
6. After 3 failed iterations on any gate, halt and request human checkpoint.
7. Upon reaching COMPLETE state, output `story-package.json` to the outputs directory.

---

## POST-PROCESSING CHECKPOINT

Before outputting `story-package.json`, verify:

1. [ ] Story type classified with vault reference
2. [ ] Story beats mapped to classified type format
3. [ ] Protagonist designed with prospect-mirroring or authority elements
4. [ ] Supporting characters serve clear narrative functions
5. [ ] Setup establishes context and stakes without over-explaining
6. [ ] Discovery/experiment sequence builds suspense with tension points
7. [ ] Mechanism revelation emerges naturally from narrative
8. [ ] Transformation/payoff delivers emotional proof with specific results
9. [ ] Carlton three-line structure present (setup, action, moral)
10. [ ] "Transporting" achieved -- reader feels IN the world
11. [ ] Breathless prose -- afraid to exhale
12. [ ] Excess trimmed -- nothing that doesn't need to be there
13. [ ] "And here's what that means for YOU" segue present
14. [ ] Conversational flow -- sounds spoken, not written
15. [ ] Empathy demonstrated -- understands prospect's experience
16. [ ] Proof woven naturally into narrative (not bolted on)
17. [ ] Sensory details calibrated for immersion without fantasy
18. [ ] Anti-slop = PASS with 0 violations
19. [ ] Overall weighted average >= 7.0/10
20. [ ] All downstream handoffs populated
21. [ ] full_story_text assembled and populated

---

## GUARDRAILS

### Trigger-Template Refusals

**Missing Mechanism Package:**
> "Cannot engineer story without mechanism-package.json. The story must support and emotionally prove the mechanism. Run 04-mechanism first."

**Missing Lead Package:**
> "Cannot engineer story without lead-package.json. The story expands what the lead teased. Run 11-lead first."

**Missing Structure Package:**
> "Cannot engineer story without structure-package.json. The story must integrate with the campaign argument flow. Run 08-structure first."

**Mechanism Revelation Artificial:**
> "Story's mechanism revelation at [location] feels artificially inserted. The mechanism must emerge naturally from the narrative -- the prospect should feel they discovered it alongside the protagonist."

**Story Flat / No Suspense:**
> "Story discovery sequence lacks tension. Minimum 2 strategic tension points required. Add suspense devices: cliffhanger, obstacle, unexpected complication, or data escalation."

**Carlton Violation -- Over-Explanation:**
> "Story violates Carlton's conciseness principle at [location]. Delete everything that doesn't need to be there. The story should create breathless prose, not bloated prose."

**Proof Bolted On:**
> "Proof elements at [location] feel bolted onto the story rather than woven into the narrative. Proof must emerge naturally from the protagonist's experience."

### Three-Tier Uncertainty Protocol

When encountering ambiguous inputs, missing context, or unclear instructions:

- **HIGH CONFIDENCE (>90%):** Proceed with execution. No flag needed.
- **MEDIUM CONFIDENCE (60-90%):** Proceed but FLAG the assumption in output metadata. Document what was assumed and why.
- **LOW CONFIDENCE (<60%):** HALT execution. Log the uncertainty source. Request clarification before proceeding.

NEVER proceed at low confidence. NEVER suppress medium-confidence flags.

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

## INPUT REQUIREMENTS

```yaml
required_upstream:
  mechanism_package:
    source: "04-mechanism/outputs/mechanism-package.json"
    required_fields:
      - mechanism.name
      - mechanism.type
      - mechanism.explanation_text
      - mechanism.uniqueness_claim

  structure_package:
    source: "08-structure/outputs/structure-package.json"
    required_fields:
      - campaign_thesis.statement
      - argument_strategy.type
      - flow_architecture.simple_segue

  promise_package:
    source: "05-promise/outputs/promise-package.json"
    required_fields:
      - primary_promise.statement
      - primary_promise.emotional_frame

  root_cause_package:
    source: "03-root-cause/outputs/root-cause-package.json"
    required_fields:
      - root_cause.expression
      - root_cause.three_part_structure

  proof_inventory:
    source: "02-proof-inventory/outputs/proof-inventory-output.json"
    required_fields:
      - summary.overall_strength
      - rankings.knockout_proof

  lead_package:
    source: "11-lead/outputs/lead-package.json"
    required_fields:
      - lead_components.open_loops
      - downstream_handoffs.for_body_copy.discovery_story_teased

optional_inputs:
  product_context:
    niche: enum[health, wealth, relationships, self_improvement, sports_instruction]
    sub_niche: string
    market_sophistication: integer[1-5]
  story_assets:
    protagonist_name: string
    discovery_location: string
    expert_name: string
    experiment_data: [object]
    testimonial_data: [object]
```

---

## QUALITY PROTOCOL INTEGRATION

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Upstream loading | STANDARD | 70% completeness | count: required fields present |
| Story type classification | ELEVATED | 85% alignment | match: vault pattern + niche fit documented |
| Story beat mapping | CRITICAL | 95% accuracy | match: beats match classified type format |
| Character architecture | ELEVATED | 85% quality | match: protagonist mirrors prospect |
| Emotional arc design | CRITICAL | 95% quality | trace: arc ends at belief/desire |
| Setup/context | ELEVATED | 85% quality | match: establishes stakes, no over-explanation |
| Discovery/experiment sequence | CRITICAL | 95% quality | count: minimum 2 tension points |
| Mechanism revelation | CRITICAL | 95% naturalness | match: emerges from narrative, not inserted |
| Transformation/payoff | CRITICAL | 95% quality | match: emotional proof with specific results |
| Carlton compliance | CRITICAL | 100% compliance | count: all 9 principles applied |
| Anti-slop | CRITICAL | 100% pass | count: violations = 0 |
| Final story-package | CRITICAL | 95% integrity | score: overall >= 7.0 |

---

## VAULT EXEMPLAR REFERENCE

| Extraction | Story Type | Key Pattern | Niche |
|------------|-----------|-------------|-------|
| leptitox | Standard Discovery | Trip/Yoda/Secret/Verification -- Malaysia firefighter discovery | Health (weight loss) |
| elixir_of_eros | Standard Discovery | Trip/Yoda/Secret -- Athens/fanfiction discovery | Relationships |
| erect_on_demand | Standard Discovery | Trip/Yoda/Secret -- Peru ceremony discovery | Health (ED) |
| fat_flusher | Accidental Discovery | Accident leads to African plant discovery | Health (weight loss) |
| resurge | Straight-to-Expert | Celebrity sleep specialist reveals mechanism | Health (sleep/weight) |
| montezumas_secret | Straight-to-Expert | Doctor reveals Montezuma's ancient remedy | Health (ED) |
| desire_system | Straight-to-Expert | Expert teaches emotional contagion technique | Relationships |
| makepeace_speed_profits | Proof Story/Live Experiment | 487 beta-testers, 23 documented trades, data cascade | Finance (currency) |

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

## Worked Exemplars

### Exemplar A: Successful Execution (Golf Instruction Niche)

**Input Context:**
- Niche: Golf instruction
- Sub-niche: Driver distance for amateur golfers 50+
- Product: Video training program
- Upstream: Mechanism (Vertical Line Method), lead package (teased discovery story), structure package

**Layer 0 → 1 Transition:**
- Loader validated: mechanism_package, lead_package, structure_package, proof_inventory all present
- Lead package confirmed: discovery_story_teased = true
- Vault story patterns loaded: 8 story types indexed (including makepeace_speed_profits proof story pattern)
- Teachings loaded: Carlton principles, discovery story formats, Makepeace proof story pattern
- Input threshold: PASS

**Layer 1 Execution:**
- Story type classification: PROOF STORY / LIVE EXPERIMENT (vault reference: makepeace_speed_profits)
- Rationale: Golf instruction benefits from "beta-tester" framing showing real golfers getting results
- Story format selected: Proof data cascade with ordinariness proof
- Protagonist: Group of 47 amateur golfers (beta-tester collective)
- Supporting characters:
  - "Mike, 58, retired accountant" (everyman proxy)
  - "Dr. Jim Reynolds, biomechanics researcher" (authority validator)
- Emotional arc: Skepticism → Curiosity → Astonishment → "I need this for myself"
- Confidence score: 0.88 (above 0.75 threshold)

**Layer 2 Execution:**
- Story beats mapped to proof story format:
  - Beat 1 (setup): "Last spring, I invited 47 amateur golfers to test something..."
  - Beat 2 (experiment launch): Criteria for selection, baseline measurements
  - Beat 3-6 (data cascade): Results from Mike (27 yards), Susan (31 yards), Tom (24 yards)...
  - Beat 7 (escalation): "But here's where it gets interesting..."
  - Beat 8 (ordinariness proof): "Most were ordinary weekend golfers, just like you"
  - Beat 9 (transparency): "Now, not everyone saw dramatic results. 6 participants saw gains under 15 yards..."
  - Beat 10 (mechanism revelation): Natural emergence from "what made the difference" analysis
  - Beat 11 (segue to reader): "And here's what that means for YOU..."
- Setup establishes context without over-explaining
- Data cascade builds with specific dates, names, yardage gains
- Mechanism revelation emerges naturally from pattern analysis

**Layer 3-4 Execution:**
- Sensory details calibrated: "the crack of the driver face," "watching the ball sail past his usual landing spot"
- Suspense optimized: 3 tension points (initial skepticism, mid-experiment plateau, breakthrough moment)
- Proof woven naturally into beta-tester narrative
- Carlton compliance: PASS (all 9 principles verified)
  - Three-line structure: setup/action/moral present
  - Transporting: reader feels on the driving range
  - Breathless: pacing maintains urgency
  - "And here's what that means for YOU" segue: present
- Anti-slop: PASS (0 violations)
- Overall weighted average: 8.3/10

**Result:** COMPLETE state, `story-package.json` output with proof_story_elements populated, full_story_text assembled.

---

### Exemplar B: Refinement Loop Triggered (Health Supplement Niche)

**Input Context:**
- Niche: Health supplements
- Sub-niche: Joint pain relief for active adults
- Product: Supplement + exercise guide bundle

**Layer 2 Initial Execution:**
- Story type: STANDARD DISCOVERY (trip/yoda/secret/verification)
- Setup drafted: "Dr. Sarah Chen had spent 20 years researching joint health when she made a discovery that would change everything. It was a Tuesday afternoon in her lab at Stanford. The fluorescent lights hummed overhead. Her coffee had gone cold hours ago. She was reviewing the latest batch of clinical data when she noticed something unusual in the inflammation markers..."
- Carlton conciseness check: FAIL (excess detail, fluorescent lights and cold coffee don't advance story)
- Gate 2 status: FAIL

**Refinement Loop:**
- Iteration 1: Trimmed setup: "Dr. Sarah Chen was reviewing clinical data when she noticed something that stopped her cold. The inflammation markers weren't behaving the way they should."
- Carlton conciseness: PASS
- Discovery sequence drafted: Builds to mechanism revelation
- Mechanism revelation check: "And that's when Dr. Chen realized she had discovered the Cartilage Repair Protocol, a breakthrough method that targets the root cause of joint deterioration."
- Naturalness test: FAIL (revelation feels inserted, not discovered)
- Iteration 2: Revised revelation to emerge from Dr. Chen's investigation: "She ran the test again. Same result. Then she tested it on herself - her own tennis elbow that had plagued her for years. Within three weeks, she could serve pain-free for the first time in a decade. That's when she knew she had found something."
- Naturalness test: PASS
- Gate 2: PASS

**Result:** Proceeded to Layer 3 after 2 refinement iterations. Final story-package.json output with overall score 7.5/10.

---

### Exemplar C: Human Checkpoint Triggered (Financial Niche)

**Input Context:**
- Niche: Financial education
- Sub-niche: Crypto investing for beginners
- Product: Newsletter + trading alerts

**Layer 1 Execution:**
- Story type classification attempted: PROOF STORY vs. REVELATION STORY vs. WARNING STORY
- Available assets: Some trade data, but not enough for full Makepeace-style data cascade
- Confidence after iteration 1: 0.65 (proof story without sufficient data)
- Iteration 2: Attempted REVELATION STORY → 0.69
- Iteration 3: Attempted WARNING STORY hybrid → 0.72 (still below 0.75)
- Diagnosis: Available proof data insufficient for pure proof story; revelation story requires authority figure not present in assets

**Human Checkpoint:**
- Operator reviewed story type options and available assets
- Selected HYBRID: Revelation + Proof elements
- Added asset: Interview quotes from crypto analyst (authority figure)
- Rationale: "Can build revelation story around analyst's discovery of halving pattern, with proof elements from historical data"
- Protagonist selected: "Marcus Webb, former Wall Street quant turned crypto researcher"

**Layer 2-4 Execution (post-checkpoint):**
- Story beats mapped to revelation format with proof data integration
- Setup: Marcus's background and what led him to crypto research
- Revelation sequence: Discovery of halving cycle pattern through historical analysis
- Proof elements: Historical halving data (2012, 2016, 2020 results)
- Carlton compliance: PASS
- Mechanism revelation emerges naturally from Marcus's research journey
- Below-threshold flag preserved in metadata
- Overall weighted average: 7.2/10

**Result:** COMPLETE state with human-approved hybrid story type. Output includes supplemented assets and checkpoint documentation.

---

## STATUS

| Version | Date | Changes |
|---------|------|---------|
| 1.2 | 2026-02-12 | Model Assignment Table: Added Binding Model Assignment Table. Haiku for infrastructure (Pre/0), sonnet for classification (1) and packaging (4), opus for generation/Arena/scoring (2-3). |
| 1.1 | 2026-02-03 | Added Layer 2.5 Arena Persona Evaluation with 6-persona generation panel (Makepeace, Halbert, Schwartz, Ogilvy, Carlton, Bencivenga), 7 story-specific judging criteria (Narrative Transportation 20%, Emotional Arc Quality 20%, Mechanism Revelation Naturalness 15%, Suspense & Pacing 15%, Carlton Compliance 10%, Proof Integration 10%, Story Function Achievement 10%), HUMAN_SELECT blocking checkpoint at Gate 2.5. Reference: ARENA-LAYER.md |
| 1.0 | 2025-01-27 | Initial architecture: 5 layers, 21 microskills, full persona deployment, Carlton + Discovery Story + Makepeace Proof Story + Georgi integration, 8+ story types from vault and teachings |
