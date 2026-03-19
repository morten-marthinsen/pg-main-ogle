# STRUCTURE-AGENT.md

> **Version:** 1.2
> **Skill:** 08-structure
> **Position:** Post-Offer, Pre-Lead Writing
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** 02-proof-inventory, 03-root-cause, 04-mechanism, 05-promise, 07-offer
> **Output:** `structure-package.json`

---

## PURPOSE

Engineer the complete **Campaign Argument** — the logical backbone of persuasion that proves the campaign thesis through a sequence of Claim-Proof-Benefit (CPB) chunks. This skill transforms upstream strategic assets (mechanism, proof inventory, root cause, promise, offer) into a structured argumentative architecture that is 75% education-based marketing and 25% selling transition.

**Success Criteria:**
- Campaign thesis crystallized from upstream assets with single-sentence clarity
- All prospect gap questions identified and converted to CPB chunks
- Every claim is specific, factual, defensible — zero opinion-based statements
- Every proof element mapped from inventory with proof_type classification
- Benefits dimensionalized across functional, dimensionalized, and emotional layers
- Logical flow validated with coherence markers and connectors
- Overall structure score ≥ 7.0/10 weighted average
- Anti-slop validation passes with zero generic language violations
- Vault comparison demonstrates structural differentiation from elite controls

This agent is a **workflow orchestrator**. It delegates to microskills and validates outputs at each gate. It does NOT write copy, generate creative content, or make strategic decisions directly.

---

## IDENTITY

**This skill IS:**
- The architectural blueprint for the campaign's logical argument
- The prosecution case that proves the campaign thesis through evidence
- The bridge between upstream strategy (mechanism, proof, promise) and downstream execution (lead, body copy, close)
- The structural sequence that transforms attention into belief
- A CPB chunk engineering system grounded in the E5 framework
- The logical coherence layer that ensures every claim connects to proof and benefit

**This skill is NOT:**
- A copy-writing tool (that is downstream: skills 09-15)
- A mechanism discovery tool (that is 04-mechanism)
- A proof generation tool (that is 02-proof-inventory)
- A promise formulation tool (that is 05-promise)
- An offer construction tool (that is 07-offer)
- A headline or lead writing tool (downstream)
- A root cause derivation tool (that is 03-root-cause)

**Upstream:** Receives `proof-inventory-output.json`, `root-cause-package.json`, `mechanism-package.json`, `promise-package.json`, `offer-package.json`
**Downstream:** Feeds `structure-package.json` to 09-campaign-brief, 11-lead, 12-story, and all narrative execution skills (11-15)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Input validation + loading | haiku | Simple validation |
| 1 | Structure analysis + segmentation | opus | Strategic architecture decisions |
| 2 | Copy power block sequencing + proportioning | opus | Creative ordering decisions |
| 2.5 | Arena (7 competitors × 2 rounds + audience evaluation) | opus | Maximum quality generation |
| 3 | Validation + coherence check | opus | Judgment-heavy evaluation |
| 4 | Output packaging | sonnet | Assembly from existing content |

---

## TEACHING FOUNDATIONS

**Primary: E5 Campaign Argument Framework (Todd Brown)**
1. The campaign argument proves the campaign thesis — not the product
2. Think like a prosecutor building an airtight case, not a salesperson
3. Education-based marketing content demonstrates the unique mechanism's value
4. CPB chunks (Claim-Proof-Benefit) are the fundamental building blocks
5. Prospect gap questions determine what chunks are needed
6. "How can I get started?" always comes last
7. Read aloud — the argument must sound conversational, not written

**Secondary: Clayton Makepeace Logical Argument Framework**
1. The logical argument is the series of claims from beginning to end forming the backbone of persuasion
2. An argument requires premises/claims + evidence/proof = conclusion
3. A string of claims alone is NOT an argument — reasons must follow
4. People buy on emotion BUT rationalize with logic — you need BOTH
5. "Reason why" is the most powerful and versatile proof method
6. Interrogate the mechanism deeply to uncover all claims and their supporting reasons
7. Coherence markers connect sentences into continuation of thought

**Tertiary: Structural Patterns from Vault Intelligence**
- `narrative_flow.section_sequence` from TIER1 extractions
- `story_architecture.story_beats` progression patterns
- Proof density distribution across sections
- Transition technique catalogs from elite controls

---

## STATE MACHINE

```
                    ┌────────────────────────────────────────────────────────────────────────┐
                    │                                                                        │
                    ▼                                                                        │
IDLE ──► LOADING ──► ARCHITECTURE ──► CONSTRUCTION ──► ARENA ──► SEQUENCING ──► VALIDATION ──► COMPLETE
            │              │                │            │            │               │
            ▼              ▼                ▼            ▼            ▼               ▼
         FAIL_L0        FAIL_L1          FAIL_L2    HUMAN_SELECT   FAIL_L3         FAIL_L4
            │              │                │            │            │               │
            ▼              ▼                ▼            │            ▼               ▼
        [Remediate]   [Remediate]     [Remediate]       │       [Remediate]     [Remediate]
            │              │                │            │            │               │
            └──────────────┴────────────────┴────────────┴────────────┴───────────────┘
                                        ▲
                                        │
                                  Max 3 iterations per layer, then HUMAN CHECKPOINT
```

**CRITICAL:** Layer 2.5 (Arena) contains a BLOCKING HUMAN CHECKPOINT. Execution cannot proceed to Layer 3 until human selection is received. See [ARENA-LAYER.md](./ARENA-LAYER.md) for complete Arena Layer specification.

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

**Purpose:** Load all upstream packages, source teachings, and vault intelligence. Validate completeness before proceeding.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load and parse all upstream skill packages |
| 0.2 | `0.2-vault-intelligence-loader.md` | Load structural patterns from TIER1 extractions |
| 0.3 | `0.3-teachings-loader.md` | Load E5 campaign argument framework principles |
| 0.4 | `0.4-input-validator.md` | Validate all inputs present and above minimum thresholds |

**Execution Order:**
1. 0.1, 0.2, 0.3 run in parallel (independent data loading)
2. 0.4 runs after all three complete (validates aggregated data)

**Gate 0:** All upstream packages loaded, teachings indexed, vault patterns available, validation status = PASS. FAIL = missing upstream package OR proof inventory overall_strength < 40 OR mechanism package absent.

---

### Layer 1: Argument Architecture

**Purpose:** Crystallize the campaign thesis, map all prospect gap questions, convert gaps to CPB chunk assignments, and select the overall argument strategy.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-campaign-thesis-crystallizer.md` | Formulate the core thesis the argument must prove |
| 1.2 | `1.2-prospect-gap-mapper.md` | Identify all belief gaps the argument must address |
| 1.3 | `1.3-gap-to-chunk-converter.md` | Convert gap questions into CPB chunk assignments |
| 1.4 | `1.4-argument-strategy-selector.md` | Select overall argument strategy and emphasis distribution |

**Execution Order:**
1. 1.1 first (thesis establishes the target for all subsequent work)
2. 1.2 next (gaps derive from thesis + upstream context)
3. 1.3 after 1.2 (converts gaps to chunk assignments)
4. 1.4 after 1.1 and 1.2 (strategy informed by thesis and gap landscape)

**Gate 1:** Campaign thesis crystallized in single sentence, minimum 5 prospect gap questions identified, all gaps converted to chunk assignments, argument strategy selected with emphasis distribution. FAIL = thesis vague or multi-sentence OR fewer than 5 gap questions OR strategy not aligned with Schwartz stage.

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

### Layer 2: CPB Chunk Construction

**Purpose:** Build each CPB chunk with engineered claims, mapped proof elements, and dimensionalized benefits.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-claim-engineer.md` | Craft specific, factual, defensible claims for each chunk |
| 2.2 | `2.2-proof-to-claim-mapper.md` | Map proof inventory elements to specific claims |
| 2.3 | `2.3-benefit-dimensionalizer.md` | Create functional, dimensionalized, emotional benefits |
| 2.4 | `2.4-cpb-chunk-assembler.md` | Combine claim + proof + benefit into complete chunk units |

**Execution Order:**
1. 2.1 first (claims must exist before proof mapping or benefit writing)
2. 2.2 and 2.3 in parallel (proof mapping and benefit writing are independent once claims exist)
3. 2.4 after 2.2 and 2.3 complete (assembles all components)

**Gate 2:** Every chunk has minimum 1 claim, 1 proof element, 1 benefit triplet (functional + dimensionalized + emotional). All claims pass specificity test (no opinion-based statements). Proof elements sourced from inventory with valid proof_ids. Overall chunk coherence ≥ 6.0/10 per chunk. FAIL = any chunk missing components OR opinion-based claim detected OR proof not traceable to inventory.

---

### Layer 2.5: ARENA (Multi-Perspective Structure Competition)

**Purpose:** Transform single-perspective structure development into multi-perspective competition. Six legendary copywriter personas each generate their complete campaign argument architecture, which are judged against structure-specific criteria to surface the strongest candidate.

**See:** [ARENA-LAYER.md](./ARENA-LAYER.md) for complete specification.

| Phase | Name | Function |
|-------|------|----------|
| 2.5.1 | Multi-Perspective Generation | Each of 6 personas generates complete structure package |
| 2.5.2 | Judging Round | Score all candidates on 7 structure-specific criteria |
| 2.5.3 | Ranking & Rationale | Rank top 3, document reasoning, identify patterns |
| 2.5.4 | Human Selection Checkpoint | **BLOCKING** — Present finalists, await human selection |

**7 Judging Criteria (Structure-Specific):**

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| Campaign Thesis Clarity | 20% | Single-sentence thesis connecting mechanism + promise + root cause |
| Claim Defensibility | 20% | All claims factual, specific, verifiable; zero opinion violations |
| Proof Density & Quality | 15% | Every claim has traced proof from inventory; adequate strength |
| Benefit Dimensionalization | 15% | Functional + dimensionalized + emotional benefit triplets |
| Gap Coverage | 10% | All prospect questions mapped; minimum 5 gaps; access question final |
| TIER1 Pattern Match | 10% | Alignment with elite TIER1 vault patterns |
| Flow Architecture | 10% | Conversational flow; coherence markers; segues present |

**GATE_2.5 (BLOCKING):**
- All 6 persona candidates generated
- All 42 criterion scores recorded (7 × 6)
- Top candidate weighted score ≥ 8.5/10
- No critical gaps (single criterion below 6.0 = critical gap)
- All claims defensible (zero opinion violations)
- All proof_ids traced to inventory
- **Human selection received and recorded**

**Quality Standard:** 8.5/10 minimum weighted score. This is non-negotiable. 7.0-7.5 is insufficient for campaign argument architecture.

---

### Layer 3: Sequencing & Flow

**Purpose:** Order CPB chunks optimally, build the simple segue, engineer connectors, integrate coherence markers, and build the SIN segue transition.

| Skill | File | Function |
|-------|------|----------|
| 3.1 | `3.1-chunk-sequencer.md` | Determine optimal ordering of CPB chunks |
| 3.2 | `3.2-simple-segue-builder.md` | Create the opening segue from intro to first chunk |
| 3.3 | `3.3-connector-engineer.md` | Build natural transitions between chunks |
| 3.4 | `3.4-coherence-marker-integrator.md` | Weave coherence markers throughout argument |
| 3.5 | `3.5-sin-segue-builder.md` | Create transition from argument to offer |

**Execution Order:**
1. 3.1 first (sequence must be determined before segues and connectors)
2. 3.2 and 3.5 in parallel after 3.1 (opening and closing segues are independent)
3. 3.3 after 3.1 (connectors depend on sequence)
4. 3.4 after 3.3 (coherence markers layer on top of connectors)

**Gate 3:** Chunk sequence established with logical justification, simple segue connects intro to first chunk, connectors exist between chunks where needed (not forced between every pair), coherence markers integrated, SIN segue transitions to offer. Conversational flow score ≥ 7.0/10. FAIL = sequence unjustified OR segues missing OR flow score < 7.0.

---

### Layer 4: Validation & Assembly

**Purpose:** Validate logical coherence, audit persuasion flow, run anti-slop checks, compare to vault patterns, and assemble the final structure package.

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-logical-coherence-validator.md` | Validate the argument holds together as a logical whole |
| 4.2 | `4.2-persuasion-flow-auditor.md` | Audit emotional and logical flow across the full argument |
| 4.3 | `4.3-anti-slop-validator.md` | Check for generic language, opinion-based claims, violations |
| 4.4 | `4.4-vault-pattern-comparator.md` | Compare structure to elite control patterns from vault |
| 4.5 | `4.5-final-argument-assembler.md` | Assemble complete structure-package.json |

**Execution Order:**
1. 4.1, 4.2, 4.3, 4.4 run in parallel (independent validation passes)
2. 4.5 after all four validators complete (assembles final output with all scores)

**Gate 4:** Logical coherence ≥ 7.0/10, persuasion flow ≥ 7.0/10, anti-slop = PASS (zero violations), vault comparison completed with differentiation notes, overall weighted average ≥ 7.0/10. FAIL = any score < 7.0 OR anti-slop violations detected OR vault comparison reveals structural mimicry without differentiation.

---

## PERSONA DEPLOYMENT

| Layer | Task | Primary Persona | Secondary Persona |
|-------|------|-----------------|-------------------|
| 1.1 | Campaign thesis crystallization | Alex Rivera — Strategic Integration Director | Dr. James Liu — Research Director |
| 1.2 | Prospect gap mapping | Sarah Chen — Competitive Intelligence Analyst | Dr. Richard Stern — Skeptical Academic |
| 1.3 | Gap-to-chunk conversion | Marcus Webster — Pattern Synthesis Analyst | Alex Rivera — Strategic Integration Director |
| 1.4 | Argument strategy selection | Alex Rivera — Strategic Integration Director | Marcus Webster — Pattern Synthesis Analyst |
| 2.1 | Claim engineering | The Legendary Copywriter — Master Copy Composite | Sarah A. Conco — Client Protection Specialist |
| 2.2 | Proof-to-claim mapping | Dr. Alena Vasquez — Evidence Evaluation Specialist | Dr. James Liu — Research Director |
| 2.3 | Benefit dimensionalization | The Legendary Copywriter — Master Copy Composite | Jake Torres — Viral Content Architect |
| 2.4 | CPB chunk assembly | The Legendary Copywriter — Master Copy Composite | Alex Rivera — Strategic Integration Director |
| 3.1 | Chunk sequencing | Marcus Webster — Pattern Synthesis Analyst | Dr. Richard Stern — Skeptical Academic |
| 3.2 | Simple segue building | The Legendary Copywriter — Master Copy Composite | Jake Torres — Viral Content Architect |
| 3.3 | Connector engineering | The Legendary Copywriter — Master Copy Composite | Marcus Webster — Pattern Synthesis Analyst |
| 3.4 | Coherence marker integration | Marcus Webster — Pattern Synthesis Analyst | The Legendary Copywriter — Master Copy Composite |
| 3.5 | SIN segue building | The Legendary Copywriter — Master Copy Composite | Alex Rivera — Strategic Integration Director |
| 4.1 | Logical coherence validation | Dr. Richard Stern — Skeptical Academic | Dr. James Liu — Research Director |
| 4.2 | Persuasion flow audit | The Legendary Copywriter — Master Copy Composite | Marcus Webster — Pattern Synthesis Analyst |
| 4.3 | Anti-slop validation | Sarah A. Conco — Client Protection Specialist | Dr. Richard Stern — Skeptical Academic |
| 4.4 | Vault pattern comparison | Sarah Chen — Competitive Intelligence Analyst | Marcus Webster — Pattern Synthesis Analyst |
| 4.5 | Final assembly | Alex Rivera — Strategic Integration Director | Dr. James Liu — Research Director |

Reference: `~brain/documentation/PERSONA-SYSTEM.md`

---

## OUTPUT: structure-package.json

```yaml
structure_package:
  metadata:
    version: "1.0"
    skill: "08-structure"
    generated: timestamp
    niche: string
    sub_niche: string
    schwartz_stage: integer[1-5]

  campaign_thesis:
    statement: string
    mechanism_connection: string
    promise_connection: string
    root_cause_connection: string
    thesis_type: enum[mechanism_superiority, result_inevitability, root_cause_discovery, paradigm_shift]
    single_sentence_test: boolean

  argument_strategy:
    type: enum[prosecution, revelation, education, demonstration]
    sophistication_adjustment: string
    emphasis_distribution:
      mechanism_proof_pct: integer
      result_proof_pct: integer
      ease_proof_pct: integer
      speed_proof_pct: integer
      safety_proof_pct: integer
    primary_gap_sequence: [string]
    argument_density: enum[dense, moderate, lean]

  prospect_gap_map:
    total_gaps: integer
    gaps:
      - gap_id: "GAP-001"
        question: string
        gap_type: enum[results, differentiation, superiority, mechanism, ease, speed, safety, personalization, access]
        priority: enum[critical, important, supporting]
        assigned_chunk: string

  cpb_chunks:
    - chunk_id: "CPB-001"
      gap_question: string
      gap_id: string
      position: integer
      claim:
        statement: string
        claim_type: enum[factual, specific, reframed, interrogation_derived]
        specificity_score: integer[1-10]
        defensibility_score: integer[1-10]
        opinion_test: enum[pass, fail]
      proof_elements:
        - proof_id: string
          proof_type: enum[demonstration, reason_why, example, before_after, study, statistic, authority, logic_flow]
          content_summary: string
          proof_strength: integer[1-10]
          source_inventory_id: string
      benefit:
        functional: string
        dimensionalized: string
        emotional: string
        benefit_clarity_score: integer[1-10]
      chunk_coherence_score: integer[1-10]

  flow_architecture:
    simple_segue:
      text: string
      promise_echo: string
      mechanism_reference: string
    chunk_sequence:
      order: [string]
      sequence_logic: string
    connectors:
      - between: [string, string]
        connector_text: string
        connector_type: enum[escalation, elaboration, contrast, pivot, revelation]
    coherence_markers:
      - position: string
        marker_text: string
        marker_type: enum[continuation, elaboration, contrast, consequence, summary, cause_effect]
    sin_segue:
      text: string
      mechanism_callback: string
      result_callback: string
      offer_bridge: string

  validation_scores:
    logical_coherence: integer[1-10]
    persuasion_flow: integer[1-10]
    claim_defensibility: integer[1-10]
    proof_density: integer[1-10]
    benefit_clarity: integer[1-10]
    conversational_flow: integer[1-10]
    anti_slop: enum[pass, fail]
    anti_slop_violations: integer
    vault_comparison: integer[1-10]
    vault_differentiation_notes: string
    overall_weighted_average: float

  downstream_handoffs:
    for_lead_writing:
      thesis_statement: string
      primary_promise_echo: string
      emotional_entry_point: string
      first_chunk_preview: string
    for_body_copy:
      cpb_chunks: [object]
      flow_architecture: object
      chunk_count: integer
      total_proof_elements: integer
    for_close:
      sin_segue: string
      final_belief_state: string
      last_chunk_benefit: string
    for_offer_presentation:
      offer_bridge_text: string
      mechanism_name_reference: string
      result_summary: string
```

---

## CONSTRAINTS

### Input Constraints
1. NEVER begin Layer 1 without validated upstream packages from 02-proof-inventory, 03-root-cause, 04-mechanism, 05-promise
2. NEVER proceed if mechanism_package is absent — the campaign argument proves the mechanism works
3. NEVER proceed if proof_inventory overall_strength < 40 — insufficient evidence for argument construction
4. ALWAYS load vault intelligence patterns before strategy selection

### Layer 1 Constraints
5. NEVER allow a campaign thesis longer than two sentences — one sentence is the target
6. NEVER accept fewer than 5 prospect gap questions — a thin argument fails to build belief
7. ALWAYS include "How can I get started?" as the final gap question
8. NEVER select argument strategy without considering Schwartz sophistication stage
9. ALWAYS derive thesis from the intersection of mechanism + promise + root cause — not from product features

### Layer 2 Constraints
10. NEVER allow claims that sound like opinion — every claim must be verifiable or specific
11. NEVER fabricate proof elements — every proof must trace to proof-inventory-output.json with valid proof_id
12. NEVER write benefits as features — benefits must answer "So what does this mean for ME?"
13. ALWAYS test claims against the three rules: no opinion, must be true, must be specific
14. ALWAYS include at least one "reason why" proof type per CPB chunk — it is the most versatile proof method
15. NEVER create a CPB chunk with fewer than 1 claim, 1 proof element, and 1 benefit triplet

### Layer 3 Constraints
16. NEVER force connectors between every chunk — use them for flow, not as mandatory padding
17. NEVER place the "How can I get started?" chunk anywhere but last position
18. ALWAYS read the assembled argument aloud (simulate conversational flow check) — it must sound spoken, not written
19. NEVER use the simple segue to introduce the product — it introduces the MECHANISM and PROMISE
20. ALWAYS include mechanism name and primary promise in the SIN segue
21. NEVER allow choppy transitions — coherence markers must create continuation of thought

### Layer 4 Constraints
22. NEVER pass Gate 4 with any validation score below 7.0/10
23. NEVER pass Gate 4 with anti-slop violations > 0
24. NEVER accept structural mimicry of vault patterns without documented differentiation
25. ALWAYS verify every proof_id in the output traces to a valid entry in proof-inventory-output.json
26. NEVER output structure-package.json without all downstream_handoffs populated
27. ALWAYS run all four validators before assembly — no shortcuts

### Process Constraints
28. NEVER skip a layer — sequential execution only (Layer 0 → 1 → 2 → 3 → 4)
29. NEVER iterate more than 3 times on any single layer before human checkpoint
30. ALWAYS log gate failures with specific failure reasons before remediation
31. NEVER allow the orchestrator to write copy directly — delegate to microskills only

---

## CONSTRAINTS ENFORCEMENT (ADDITIONAL)

### Input Integrity Constraints
32. MUST validate all required upstream fields exist before Layer 1 begins
33. MUST NOT proceed if any required_field from input schema is null or empty
34. ONLY accept proof_inventory with overall_strength ≥ 40 — below threshold = HALT
35. MUST verify mechanism.name is a specific named mechanism, not a generic description
36. MUST cross-reference root_cause.three_part_structure completeness before thesis crystallization

### Claim Quality Constraints
37. MUST test every claim against the three rules: no opinion, must be true, must be specific
38. MUST NOT allow any claim that cannot be verified or sourced to upstream data
39. ONLY accept claims with specificity_score ≥ 7/10 — vague claims = REJECT
40. MUST ensure every claim has at least one "reason why" proof type attached
41. NEVER allow claims that start with "I believe," "I think," or "In my opinion"

### Proof Traceability Constraints
42. MUST trace every proof_id in output to a valid entry in proof-inventory-output.json
43. MUST NOT fabricate proof elements — every proof must have source attribution
44. ONLY use proof elements with proof_strength ≥ 6/10 for critical claims
45. MUST log warning if any CPB chunk relies on single proof element (fragile construction)

### Flow Architecture Constraints
46. MUST verify simple_segue references mechanism and promise — never product
47. MUST NOT place "How can I get started?" anywhere except final position
48. ONLY allow connectors where natural flow requires them — forced connectors = REJECT
49. MUST ensure coherence markers create continuation of thought, not choppy transitions
50. MUST verify SIN segue includes mechanism_callback AND result_callback AND offer_bridge

---

## FAILURE MODES

| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| Upstream package missing | CRITICAL | Layer 0.4 validation | HALT with "[package]-package.json not found — run Skill [N] first" |
| Mechanism package absent | CRITICAL | Gate 0 check | HALT — "Cannot engineer campaign argument without mechanism" |
| Proof inventory strength < 40 | HIGH | Input validation | HALT — "Insufficient proof for argument construction" |
| Thesis longer than 2 sentences | MEDIUM | Gate 1 check | Remediate — condense to single sentence |
| Fewer than 5 gap questions | MEDIUM | Gate 1 check | Remediate — expand gap identification |
| Opinion-based claim detected | HIGH | Layer 2.1 check | REJECT claim + replace with verifiable statement |
| Proof_id not traceable | HIGH | Layer 2.2 validation | HALT — "Proof [ID] not found in inventory" |
| CPB chunk missing components | MEDIUM | Gate 2 check | Remediate — complete missing elements |
| Flow score < 7.0 | MEDIUM | Gate 3 check | Remediate — improve transitions and markers |
| Anti-slop violations > 0 | HIGH | Layer 4.3 check | REJECT + list violations + re-execute |
| Vault comparison shows mimicry | HIGH | Layer 4.4 check | Flag for differentiation revision |
| Schema violation in output | HIGH | Final assembly | REJECT + schema diff + re-execute |

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

**Weak Claim Language:**
- helps you, allows you to, gives you the ability to
- designed to, intended to, meant to, aims to

**Opinion Markers (PROHIBITED in claims):**
- I believe, I think, in my opinion, it seems to me
- arguably, supposedly, allegedly

---

## ACTIVE QUALITY GATE ENFORCEMENT

### Gate 0: Foundation
```
IF mechanism_package_missing:
  LOG: "GATE_0 FAILED: mechanism-package.json not found"
  ACTION: HALT
  REMEDIATION: "Run 04-mechanism before 08-structure"

IF proof_inventory_strength < 40:
  LOG: "GATE_0 FAILED: Proof inventory strength [X] below minimum 40"
  ACTION: HALT
  REMEDIATION: "Strengthen proof inventory before argument construction"
```

### Gate 1: Architecture
```
IF thesis_sentence_count > 2:
  LOG: "GATE_1 FAILED: Thesis is [N] sentences, must be 1-2"
  ACTION: REMEDIATE
  REMEDIATION: "Condense thesis to single sentence capturing mechanism + promise + root cause"

IF gap_questions_count < 5:
  LOG: "GATE_1 FAILED: Only [N] gap questions, minimum 5 required"
  ACTION: REMEDIATE
  REMEDIATION: "Expand prospect gap identification"
```

### Gate 2: Construction
```
IF claim_opinion_test_fail:
  LOG: "GATE_2 FAILED: Claim '[claim]' sounds like opinion"
  ACTION: REJECT
  REMEDIATION: "Replace with verifiable, specific statement"

IF proof_id_not_found:
  LOG: "GATE_2 FAILED: proof_id [ID] not in proof-inventory-output.json"
  ACTION: HALT
  REMEDIATION: "Use only proof elements from inventory"
```

### Gate 3: Flow
```
IF conversational_flow_score < 7.0:
  LOG: "GATE_3 FAILED: Flow score [X] below 7.0 threshold"
  ACTION: REMEDIATE
  REMEDIATION: "Improve transitions, add coherence markers"

IF how_can_i_get_started_not_last:
  LOG: "GATE_3 FAILED: 'How can I get started?' chunk not in final position"
  ACTION: REMEDIATE
  REMEDIATION: "Resequence chunks to place access question last"
```

### Gate 4: Validation
```
IF anti_slop_violations > 0:
  LOG: "GATE_4 FAILED: [N] anti-slop violations: [list]"
  ACTION: REJECT
  REMEDIATION: "Replace flagged language with specific alternatives"

IF overall_weighted_average < 7.0:
  LOG: "GATE_4 FAILED: Overall score [X] below 7.0 threshold"
  ACTION: REMEDIATE
  REMEDIATION: "Identify lowest-scoring dimension, return to relevant layer"
```

---

## EXECUTION RULES

1. Begin in IDLE state. Transition to LOADING when invoked.
2. Execute each layer's microskills in the specified execution order (sequential or parallel as noted).
3. After each layer completes, evaluate the gate conditions.
4. If a gate PASSES, transition to the next layer.
5. If a gate FAILS, log the failure reason, remediate within the current layer (max 3 iterations), then re-evaluate the gate.
6. After 3 failed iterations on any gate, halt and request human checkpoint.
7. Upon reaching COMPLETE state, output `structure-package.json` to the outputs directory.

---

## POST-PROCESSING CHECKPOINT

Before outputting `structure-package.json`, verify:

1. [ ] Campaign thesis is single-sentence and connects mechanism + promise + root cause
2. [ ] All prospect gap questions mapped to CPB chunks
3. [ ] Every CPB chunk has claim + proof + benefit (no incomplete chunks)
4. [ ] Every claim passes the opinion test (no opinion-based statements)
5. [ ] Every proof_id traces to proof-inventory-output.json
6. [ ] "How can I get started?" is the final chunk in sequence
7. [ ] Simple segue references mechanism and promise (not product)
8. [ ] SIN segue transitions from mechanism proof to offer presentation
9. [ ] Connectors placed where needed (not forced everywhere)
10. [ ] Coherence markers create continuation of thought
11. [ ] All validation scores ≥ 7.0/10
12. [ ] Anti-slop = PASS with 0 violations
13. [ ] Vault comparison completed with differentiation notes
14. [ ] All downstream_handoffs populated
15. [ ] Read-aloud simulation confirms conversational flow

---

## GUARDRAILS

### Trigger-Template Refusals

**Missing Mechanism Package:**
> "Cannot engineer campaign argument without mechanism-package.json. The campaign argument exists to prove the mechanism works. Run 04-mechanism first."

**Missing Proof Inventory:**
> "Cannot construct CPB chunks without proof-inventory-output.json. Every claim requires mapped proof. Run 02-proof-inventory first."

**Missing Root Cause:**
> "Cannot crystallize campaign thesis without root-cause-package.json. The thesis connects root cause to mechanism to promise. Run 03-root-cause first."

**Insufficient Proof Strength:**
> "Proof inventory overall_strength is [X], below minimum threshold of 40. Cannot build defensible argument. Strengthen proof inventory before proceeding."

**Opinion-Based Claims Detected:**
> "Claim '[claim text]' in CPB-[N] sounds like opinion. Claims must be factual and specific. Remediate: Replace with verifiable statement or add specificity."

**Anti-Slop Violations:**
> "Anti-slop validator detected [N] violations: [list]. Cannot assemble structure-package.json until all violations resolved."

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
      - mechanism.e5_mechanism_type
      - mechanism.uniqueness_claim
      - mechanism.proof_elements

  proof_inventory:
    source: "02-proof-inventory/outputs/proof-inventory-output.json"
    required_fields:
      - summary.total_elements
      - summary.overall_strength
      - summary.promise_ceiling
      - by_category
      - rankings

  root_cause_package:
    source: "03-root-cause/outputs/root-cause-package.json"
    required_fields:
      - root_cause.expression
      - root_cause.three_part_structure
      - root_cause.villain_profile

  promise_package:
    source: "05-promise/outputs/promise-package.json"
    required_fields:
      - primary_promise.statement
      - primary_promise.emotional_frame
      - supporting_promises

  offer_package:
    source: "07-offer/outputs/offer-package.json"
    required_fields:
      - core_offer.product_name
      - core_offer.positioning
    optional_fields:
      - enhancement_stack
      - guarantee

optional_inputs:
  product_context:
    niche: enum[health, wealth, relationships, self_improvement, sports_instruction]
    sub_niche: string
    market_sophistication: integer[1-5]
```

---

## QUALITY PROTOCOL INTEGRATION

This skill follows the three-tier quality threshold system:

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Campaign thesis | CRITICAL | 95% alignment | trace: mechanism + promise + root cause connection |
| Gap question mapping | ELEVATED | 85% coverage | count: minimum 5 gaps, coverage across all gap types |
| Individual CPB chunks | ELEVATED | 85% coherence | score: claim specificity ≥ 7, proof mapping valid, benefit complete |
| Flow architecture | ELEVATED | 85% flow quality | score: conversational flow ≥ 7.0 |
| Final structure-package | CRITICAL | 95% integrity | score: overall weighted average ≥ 7.0, anti-slop = PASS |

---

## VAULT EXEMPLAR REFERENCE

| Extraction | Structure Pattern | Key Innovation |
|------------|-------------------|----------------|
| weiss_betrayal2012 | Prophecy → Evidence cascade → Urgency | Conspiracy thesis with institutional proof stacking |
| nightingale_cummuta_wealthmachine | Mechanism explanation → Step-by-step → Proof density | Dense CPB chunks with "reason why" dominance |
| sunchlorella_japaneselongevity | Discovery story → Root cause → Mechanism → Proof | Cultural authority + physiological mechanism proof |
| stansberry_america2020 | Warning → Three-part reframe → Evidence → Opportunity | Paradigm shift thesis with political proof layering |
| nightingale_tracy_ultimategoals | Education → System reveal → Step demonstration → Results | Education-first argument with minimal enemy framing |
| sinatra_omegaqmax | Medical authority → Root cause → Mechanism → Clinical proof | Dense proof inventory with study/statistic dominance |

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
- Upstream: Mechanism (Vertical Line Method), proof inventory (47 elements), root cause (hip restriction), promise (30+ yards)

**Layer 0 → 1 Transition:**
- Loader validated: all 5 upstream packages present
- Proof inventory overall_strength: 72 (above 40 threshold)
- Vault structural patterns loaded: 6 TIER1 extractions indexed
- Input threshold: PASS

**Layer 1 Execution:**
- Campaign thesis crystallized: "The Vertical Line Method defeats hip restriction to add 30+ yards because it realigns your swing plane without flexibility training."
- Prospect gap questions identified: 7 gaps mapped
  - "Will this work for my age/flexibility?" (critical)
  - "How is this different from other distance methods?" (critical)
  - "What proof do you have it works?" (critical)
  - "Is it easy to learn?" (important)
  - "How fast will I see results?" (important)
  - "Is it safe for my back?" (supporting)
  - "How can I get started?" (final)
- Argument strategy: DEMONSTRATION (show the method working)
- Confidence score: 0.87 (above 0.75 threshold)

**Layer 2 Execution:**
- 7 CPB chunks constructed:
  - CPB-001: "The Vertical Line targets the exact hip restriction causing your distance loss" (claim) + biomechanics study (proof) + "finally understand why you've been stuck" (benefit)
  - CPB-002 through CPB-007: All complete with claim + proof + benefit triplet
- All claims passed opinion test (factual, specific, defensible)
- Every proof_id traced to proof-inventory-output.json
- Chunk coherence scores: all ≥ 7.0/10

**Layer 3-4 Execution:**
- Chunk sequence established: Gap priority order with "How can I get started?" final
- Simple segue built: References Vertical Line Method and 30-yard promise
- SIN segue built: Transitions from mechanism proof to offer with result callback
- Connectors placed between chunks 1-2, 3-4, 5-6 (not forced everywhere)
- Coherence markers integrated throughout
- Validation scores: Logical coherence 8.2, Persuasion flow 8.0, Anti-slop PASS (0 violations)
- Overall weighted average: 7.8/10

**Result:** COMPLETE state, `structure-package.json` output with all downstream_handoffs populated.

---

### Exemplar B: Refinement Loop Triggered (Health Supplement Niche)

**Input Context:**
- Niche: Health supplements
- Sub-niche: Joint pain relief for active adults
- Product: Supplement + exercise guide bundle

**Layer 2 Initial Execution:**
- First-pass CPB chunk construction: 6 chunks built
- Claim in CPB-003: "Our formula is the best joint support available"
- Opinion test: FAIL (sounds like opinion, not factual)
- Gate 2 status: FAIL

**Refinement Loop:**
- Iteration 1: Revised claim to "Clinical trial showed 73% reduction in joint stiffness within 21 days"
- Opinion test: PASS (specific, verifiable, traced to proof_id PROOF-017)
- Gate 2 re-evaluation: 5 of 6 chunks pass
- CPB-005 claim: "You'll feel amazing results" → FAIL (vague opinion)
- Iteration 2: Revised to "87% of participants reported improved mobility within 30 days (verified by range-of-motion testing)"
- All 6 chunks now pass opinion test and have complete claim + proof + benefit
- Gate 2: PASS

**Result:** Proceeded to Layer 3 after 2 refinement iterations. Final structure-package.json output with overall score 7.4/10.

---

### Exemplar C: Human Checkpoint Triggered (Financial Niche)

**Input Context:**
- Niche: Financial education
- Sub-niche: Crypto investing for beginners
- Product: Newsletter + trading alerts

**Layer 1 Execution:**
- Campaign thesis drafted: "Our crypto alerts beat the market"
- Single-sentence test: PASS (one sentence)
- Mechanism + promise + root cause connection test: FAIL
- Diagnosis: Thesis does not connect to mechanism (timing algorithm) or root cause (emotional trading)
- Iteration 1: "The Halving Cycle Algorithm defeats emotional trading to capture 3x gains"
- Connection test: PASS
- Gap question identification: 4 gaps found
- Minimum threshold: FAIL (need ≥ 5 gaps)
- Iteration 2: Added "Is crypto safe for my retirement funds?" and "What if I've never traded before?"
- Gap count: 6 (PASS threshold)
- Argument strategy selection: Competing strategies scored equally (prosecution vs. revelation)
- Iteration 3: Applied Schwartz stage 4 heuristic → still ambiguous

**Human Checkpoint:**
- Operator reviewed argument strategy options
- Selected REVELATION strategy: "Market is skeptical, need to reveal hidden pattern rather than prosecute old methods"
- Documented rationale: "Crypto audience has high skepticism of 'guru' claims; revelation feels more authentic"

**Layer 2-4 Execution (post-checkpoint):**
- CPB chunks built with revelation framing
- All validation scores ≥ 7.0
- Below-threshold flag preserved from Layer 1

**Result:** COMPLETE state with human-approved strategy selection. Output includes checkpoint documentation in metadata.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.2 | 2026-02-12 | Model Assignment Table: Added Binding Model Assignment Table. Haiku for infrastructure (Pre/0), opus for all strategic/creative layers (1-3), sonnet for packaging (4). |
| 1.0 | 2025-01-27 | Initial architecture: 5 layers, 22 microskills, full persona deployment, E5 + Makepeace framework integration |
| 1.1 | 2026-02-03 | Added Layer 2.5 (Arena) with 6-persona multi-perspective structure competition, 7 structure-specific judging criteria, 8.5/10 minimum quality threshold, human selection checkpoint. Created ARENA-LAYER.md specification. |
