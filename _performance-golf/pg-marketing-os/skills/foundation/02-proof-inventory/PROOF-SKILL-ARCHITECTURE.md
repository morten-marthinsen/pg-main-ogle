# Proof Skill Architecture (Ultra-Think)

**Version:** 2.0
**Date:** 2026-02-12
**Status:** Architecture Complete — Battle-Tested (Transformation Academy execution)

---

## Executive Summary

The Proof skill is NOT a single operation. It's **four distinct operations** that serve different purposes in the copywriting workflow:

| Operation | Purpose | When Used | Output |
|-----------|---------|-----------|--------|
| **INVENTORY** | Catalog what proof exists | Start of every project | proof-inventory.json |
| **DISCOVERY** | Research external proof | When inventory has gaps | proof-discoveries.json |
| **GENERATION** | Recommend proof to create | When gaps need filling | proof-generation-plan.json |
| **RANKING** | Prioritize proof for copy | Before writing begins | proof-rankings.json |
| **FINAL_HANDOFF** | Package everything for downstream | After ranking complete | FINAL_HANDOFF.md |

These can run independently or as a pipeline. The skill must support both modes.

**CRITICAL:** When running as `full_pipeline`, a `FINAL_HANDOFF.md` is the PRIMARY DELIVERABLE — a single comprehensive document that packages all inventory, discovery, ranking, and strategic outputs into one file that downstream skills can consume without reading multiple files.

---

## Part 1: The Four Operations

### Operation 1: INVENTORY

**Purpose:** Catalog all existing proof assets before any strategic decisions.

**Inputs:**
- Product materials (sales pages, previous promotions, testimonial files)
- Client-provided assets (studies, credentials, data)
- Deep Research output (competitor proof patterns)

**Process:**
1. Extract proof elements from all sources
2. Classify by taxonomy (6 categories, 80+ sub-types)
3. Score each element (Specificity, Credibility, Relevance, Novelty, Emotional Impact)
4. Identify gaps by category
5. Calculate overall proof strength score

**Output:**
```yaml
proof_inventory:
  by_category:
    social:           # Testimonials, reviews, user counts, bandwagon
      elements: [...]
      count: integer
      quality_distribution: {...}
    authority:        # Studies, credentials, endorsements, validations
      elements: [...]
      count: integer
      authority_level: enum
    demonstration:    # Live demos, before/after, video proof
      elements: [...]
      count: integer
      visual_potential: enum
    mechanism:        # Proof that the specific mechanism works
      elements: [...]
      count: integer
    data:             # Statistics, numbers, percentages
      elements: [...]
      count: integer
      specificity_level: enum
    risk_reversal:    # Guarantees, trials, warranties
      elements: [...]
      count: integer
      guarantee_strength: enum

  gaps:
    missing_categories: [...]
    weak_categories: [...]

  strength_score: 0-100
  promise_ceiling: string  # What can credibly be claimed
```

---

### Operation 2: DISCOVERY

**Purpose:** Research and find external proof that could support claims.

**Inputs:**
- Inventory gaps
- Mechanism to prove
- Promise to support
- Niche/market context

**Process:**
1. Identify what needs proving (from inventory gaps)
2. Search for relevant studies, data, expert opinions
3. Find analogous proof (related mechanisms, adjacent markets)
4. Evaluate source credibility
5. Package findings with citation information

**Output:**
```yaml
proof_discoveries:
  studies_found:
    - title: string
      source: string
      relevance: string
      key_finding: string
      citation: string
      credibility_score: 1-10

  data_points_found:
    - stat: string
      source: string
      date: string

  expert_quotes_found:
    - quote: string
      expert: string
      credentials: string

  analogous_proof:
    - mechanism_proven: string
      how_it_applies: string
```

---

### Operation 3: GENERATION

**Purpose:** Recommend proof assets the client should CREATE.

**Inputs:**
- Inventory gaps
- Discovery limitations (what couldn't be found)
- Promise requirements
- Budget/timeline context

**Process:**
1. Identify critical proof gaps
2. Recommend testimonial collection strategies
3. Suggest demonstration formats
4. Propose data collection methods
5. Prioritize by impact vs. effort

**Output:**
```yaml
proof_generation_plan:
  high_priority:
    - proof_type: string
      what_to_create: string
      why_critical: string
      how_to_collect: string
      expected_impact: string

  medium_priority: [...]

  nice_to_have: [...]

  total_gap_coverage: percentage
```

---

### Operation 4: RANKING

**Purpose:** Prioritize and sequence proof for maximum persuasive impact.

**Inputs:**
- Complete proof inventory (post-discovery)
- Schwartz stage of market
- Dominant objections to overcome
- Copy format (VSL, sales letter, etc.)
- Lead type being used

**Process:**
1. Apply Schwartz stage weighting (what proof matters most at each stage)
2. Match proof to specific objections
3. Sequence proof for "stream of acceptances" (Gradualization)
4. Select proof for key copy positions (lead, mechanism, close)
5. Identify "knockout punch" proof

**Output:**
```yaml
proof_rankings:
  knockout_proof: # Single most powerful element
    element: string
    why_strongest: string
    best_position: string

  by_copy_position:
    lead_proof: [top 3 for opening]
    mechanism_proof: [top 3 for proving mechanism]
    close_proof: [top 3 for final push]

  by_objection:
    objection_1:
      objection: string
      proof_sequence: [ordered list]

  sequence_recommendation:
    - position: 1
      proof: string
      rationale: string
```

---

## Part 2: The Proof Taxonomy (2-Level)

### Level 1: Categories (6 Approved)

1. **SOCIAL** — Testimonials, reviews, user counts, bandwagon effects
2. **AUTHORITY** — Credentials, studies, expert endorsements, certifications
3. **DEMONSTRATION** — Live demos, before/after, video proof, side-by-side tests
4. **MECHANISM** — Proof that the specific mechanism works (distinct from general demos)
5. **DATA** — Statistics, numbers, percentages, specific figures
6. **RISK REVERSAL** — Guarantees, trial offers, money-back promises

### Level 2: Sub-Types (~75 total)

---

### Category 1: SOCIAL

**Definition:** Proof derived from other people's experiences, behaviors, and validation.

**Sub-Types:**

| Sub-Type | Description | Strength Signal |
|----------|-------------|-----------------|
| testimonial_transformation | Full before/after narrative from customer | Highest |
| testimonial_specific_result | Customer citing exact numbers/outcomes | High |
| testimonial_video | On-camera customer endorsement | High |
| testimonial_audio | Voice recording | Medium-High |
| testimonial_written | Text testimonial | Medium |
| testimonial_anonymous | No name given | Low |
| testimonial_celebrity | Famous person endorsement | Variable |
| review_rating | Stars, platform ratings | Medium |
| review_volume | Quantity of reviews | Medium |
| user_count | "10,000+ customers" | Medium |
| bestseller_status | Rankings, #1 claims | High |
| waitlist_demand | Demand/scarcity indicators | Medium |
| geographic_spread | "Customers in 47 countries" | Medium |
| community_size | Group/membership numbers | Medium |
| user_generated_content | Customer-created content | Medium |

**Quality Markers:**
- Specificity: Exact results > vague praise
- Attribution: Full name + photo > initials > anonymous
- Verification: Platform-verified > self-reported
- Relevance: Same demographic/problem > adjacent
- Recency: Recent > dated

---

### Category 2: AUTHORITY

**Definition:** Proof derived from credentials, expertise, institutional backing, and third-party validation.

**Sub-Types:**

| Sub-Type | Description | Strength Signal |
|----------|-------------|-----------------|
| study_peer_reviewed | Published in journals | Highest |
| study_clinical_trial | Controlled medical study | Highest |
| study_university | Academic institution research | High |
| study_independent_lab | Third-party testing | High |
| study_company | Internal research | Medium |
| study_meta_analysis | Analysis of multiple studies | Highest |
| credential_inventor | Creator's qualifications | High |
| credential_company | Business authority markers | Medium |
| credential_education | Degrees, certifications | Medium |
| credential_experience | Years in field | Medium |
| credential_achievements | Awards, recognitions | High |
| credential_famous_clients | Notable people served | High |
| credential_patents | Innovation proof | High |
| endorsement_expert | Authority figure approval | High |
| endorsement_professional | "Doctor recommended" | High |
| endorsement_celebrity | Famous person backing | Variable |
| validation_government | FDA approval, etc. | Highest |
| validation_certification | Official seals/badges | Medium |
| validation_industry_award | Recognition from field | High |
| validation_media | News coverage, "As seen in" | Medium |

**Quality Markers:**
- Relevance: Same field > general authority
- Prestige: Harvard > unknown institution
- Independence: Third-party > self-reported
- Recency: Current > dated
- Verifiability: Easy to check > hard to verify

---

### Category 3: DEMONSTRATION

**Definition:** Visual, sensory, or experiential proof that SHOWS the product/result in action.

**Sub-Types:**

| Sub-Type | Description | Strength Signal |
|----------|-------------|-----------------|
| demo_live | Real-time demonstration | Highest |
| demo_video | Recorded proof | High |
| demo_side_by_side | A/B comparison test | High |
| demo_stress_test | Extreme conditions test | High |
| demo_destruction | Proving durability | High |
| demo_speed | Showing quick results | High |
| demo_contrast | Ours vs. theirs comparison | High |
| before_after_photo | Side-by-side transformation images | Highest |
| before_after_video | Video transformation/timelapse | Highest |
| before_after_screenshot | Digital results comparison | High |
| before_after_metrics | Numbers before vs. after | High |
| before_after_lifestyle | Quality of life change shown | Medium |
| behind_scenes | How it's made/works | Medium |
| ingredient_showcase | Components displayed | Medium |
| process_walkthrough | Step-by-step visualization | Medium |
| calculator_interactive | User can calculate own result | Medium |

**Quality Markers:**
- Tangibility: Physical proof > conceptual explanation
- Drama: Memorable moment > forgettable
- Repeatability: Anyone can verify > one-time event
- Simplicity: Easy to understand > complex to follow
- Relatability: "Could be me" factor

---

### Category 4: MECHANISM

**Definition:** Proof that the SPECIFIC MECHANISM (how it works) is valid, distinct from general demonstrations. This proves WHY and HOW, not just THAT.

**Sub-Types:**

| Sub-Type | Description | Strength Signal |
|----------|-------------|-----------------|
| mechanism_study | Research proving how it works | Highest |
| mechanism_scientific_principle | Underlying science explained | High |
| mechanism_analogy_proof | Proven concept applied to new domain | Medium |
| mechanism_ingredient_research | Studies on specific components | High |
| mechanism_process_validation | Steps verified by authority | High |
| mechanism_historical_precedent | "Used for centuries" proof | Medium |
| mechanism_expert_explanation | Authority explains why it works | High |
| mechanism_logical_chain | Step-by-step causation proof | Medium |
| mechanism_competitor_admission | Rivals acknowledge the approach | High |
| mechanism_patent_citation | Innovation legally validated | High |

**Quality Markers:**
- Scientific backing: Peer-reviewed > anecdotal
- Specificity: Explains exact process > vague "it works"
- Uniqueness: Proprietary mechanism > generic approach
- Credibility: Who vouches for the mechanism
- Comprehensibility: Prospect can follow the logic

---

### Category 5: DATA

**Definition:** Numerical, statistical, and quantified proof elements.

**Sub-Types:**

| Sub-Type | Description | Strength Signal |
|----------|-------------|-----------------|
| data_exact_statistic | Precise numbers (97.3%) | High |
| data_percentage | X% improvement/result | Medium |
| data_success_rate | "97% success rate" | High |
| data_money_figures | Dollar amounts saved/earned | High |
| data_time_figures | Hours/days/weeks | Medium |
| data_comparison | "3x faster than..." | Medium |
| data_source_cited | Statistics with attribution | High |
| data_proprietary | Exclusive/internal numbers | Medium |
| data_real_time | Current/live stats | High |
| data_historical | Track record over time | Medium |
| data_aggregated | Combined results across users | Medium |
| data_case_count | Number of cases/examples | Medium |

**Quality Markers:**
- Precision: "97.3%" > "almost all"
- Source: Cited > uncited
- Relevance: Directly applicable > general industry
- Recency: Current > dated
- Magnitude: Impressive numbers > modest

---

### Category 6: RISK REVERSAL

**Definition:** Proof that reduces or eliminates buyer risk — guarantees, trials, and protection mechanisms.

**Sub-Types:**

| Sub-Type | Description | Strength Signal |
|----------|-------------|-----------------|
| guarantee_money_back | Full refund promise | High |
| guarantee_extended | Long guarantee period (365 days) | Highest |
| guarantee_double | "Double your money back" | Highest |
| guarantee_conditional | "If X doesn't happen..." | Medium |
| guarantee_unconditional | No questions asked | High |
| guarantee_specific_result | Guaranteeing specific outcome | High |
| trial_free | Try before you buy | High |
| trial_discounted | Reduced-price trial | Medium |
| trial_keep_bonus | "Keep the bonus either way" | High |
| support_included | Ongoing help promised | Medium |
| warranty_product | Physical product protection | Medium |
| warranty_lifetime | Lifetime coverage | High |

**Quality Markers:**
- Duration: Longer > shorter
- Conditions: Unconditional > conditional
- Generosity: Double money back > partial refund
- Specificity: Clear terms > vague promises
- Uniqueness: Stands out from competitors

---

## Part 3: Schwartz Integration

### The Three Demands (Chapter 11)

Every prospect has three demands your copy must satisfy:

1. **Demand for Information** — "Tell me more"
2. **Demand for Proof** — "Who says so?"
3. **Demand for Mechanism** — "How does it work?"

The Proof skill focuses on Demand #2, but proof also serves Demand #3 (mechanism proof).

---

### Proof Positioning by Schwartz Stage

| Stage | Primary Proof Strategy | Secondary Strategy |
|-------|------------------------|-------------------|
| **Stage 1** (First in market) | Simple demonstration | Basic credentials |
| **Stage 2** (Second in market) | Bigger/better results proof | More testimonials |
| **Stage 3** (Crowded) | Mechanism proof | Scientific backing |
| **Stage 4** (Sophisticated) | Unique mechanism proof | Differentiated results |
| **Stage 5** (Exhausted) | Identification-based proof | Social proof, belonging |

---

### The Architecture of Belief (Chapter 9)

Every proof element has TWO sources of strength:
1. **The content itself** — What the proof says
2. **The preparation** — What precedes it in the copy

You can strengthen proof in TWO ways:
1. **Increase intensity** — More dramatic, more specific, more credible
2. **Change position** — Place it where reader unconsciously demands it

**Key Principle:** "One fully-believed proof has ten times the sales power of ten partially-believed proofs."

---

### Gradualization: The Stream of Acceptances

Proof must be sequenced to create a "stream of acceptances":

1. Start with easily-accepted proof (common ground)
2. Build credibility with each piece
3. Introduce stronger claims once acceptance established
4. Reserve "knockout punch" for optimal moment

**Anti-Pattern:** Frontloading strongest proof when reader isn't ready to accept it.

---

### The Four Positioning Processes

Schwartz identifies four processes that determine where proof appears:

1. **Gradualization** — Building acceptance layer by layer
2. **Redefinition** — Proof that reframes objections
3. **Mechanization** — Proof that shows HOW it works
4. **Concentration** — Proof that alternatives don't work

Each process has an optimal position for proof insertion.

---

## Part 3.5: Phase Tagging for Multi-Phase Products

### Why Phase Tagging Matters

For products with distinct phases (e.g., 3-phase golf school, multi-step supplement protocol, staged coaching program), proof elements have different persuasive functions depending on WHICH phase they support. A flat proof inventory that ignores phases forces downstream skills to re-sort everything — wasting context and risking misplacement.

### When to Apply Phase Tags

**Apply phase tags when the product has 2+ distinct phases/stages/steps that the customer experiences sequentially.** If the product is a single-step purchase (pill, book, single event), phase tagging is not needed.

### Standard Phase Tag Set

| Tag | Definition | Copy Function |
|-----|------------|---------------|
| `PREPARE` | Proof for pre-experience/onboarding phase | Story "before" narrative, anticipation building |
| `TRANSFORM` | Proof for core experience/active phase | Mechanism narrative, breakthrough testimonials |
| `MASTER` | Proof for post-experience/maintenance phase | Permanence claims, long-term results |
| `ALL_PHASES` | Proof that the multi-phase SYSTEM itself works | Structural argument, system-as-proof |
| `CROSS_PHASE` | Proof from phase interdependency | "Skipping phases" failure evidence, full-system testimonials |

**Custom phase names:** If the product uses different phase names (e.g., "Reset > Retrain > Resiliency"), map to the standard tags AND note the product-specific phase name in the element metadata.

### Phase Proof Matrix (Required in FINAL_HANDOFF.md Section 6)

The FINAL_HANDOFF.md must include a Phase Proof Matrix showing:
- Proof elements organized by phase tag
- Proof gaps per phase (which phases lack sufficient proof)
- Downstream skill mapping (which skill uses which phase's proof)

### Downstream Skill Consumption by Phase

| Downstream Skill | Primary Phase Tags Consumed |
|------------------|----------------------------|
| 12-Story | PREPARE (before narrative), TRANSFORM (breakthrough) |
| 13-Root-Cause-Narrative | ALL_PHASES (system failure evidence), MASTER (fade/regression) |
| 14-Mechanism-Narrative | TRANSFORM (core mechanism proof), CROSS_PHASE (interdependency) |
| 15-Product-Introduction | TRANSFORM (what happens on-site), PREPARE (what you get first) |
| 16-Offer-Copy | MASTER (ongoing value), ALL_PHASES (system value) |
| 17-Close | CROSS_PHASE (system IS the guarantee), MASTER (permanence) |

---

## Part 3.6: Model Assignment + Execution Architecture

### Binding Model Assignment Table

| Layer | Task | Model | Persona | Rationale |
|-------|------|-------|---------|-----------|
| Pre | Infrastructure setup | haiku | — | File creation only |
| 0 | Validation + Routing | haiku | — | Simple input checks |
| 1 | Extraction | sonnet | EXTRACTOR | Pattern matching from docs |
| 1 | Scoring | opus | ANALYST | Judgment-heavy scoring |
| 2 | Gap Analysis + Promise Ceiling | opus | ANALYST/STRATEGIST | Strategic analysis |
| 3.2-3.3 | Study + Data Discovery | sonnet | SOURCE_HUNTER | Web search + extraction |
| 3.4-3.5 | Expert + Analogous Discovery | sonnet/opus | SOURCE_HUNTER/SYNTHESIZER | Search + cross-domain reasoning |
| 3.6-3.7 | Generation Recommendations | opus | STRATEGIST | Recommendation design |
| 4 | Ranking + Final Assembly | opus | ASSEMBLER | Full-context integration |

### Recommended Execution Architecture

```
SEQUENTIAL:
  Pre-Execution → Layer 0 → Layer 1 → Layer 2

PARALLEL (Layer 3):
  Agent 1 (sonnet): Study + Data Discovery → DISCOVERY_LOG Parts 1-3
  Agent 2 (sonnet/opus): Expert + Analogous Discovery → DISCOVERY_LOG Parts 4-6
  [Optional] Agent 3 (opus): Generation Recommendations → can run after 1+2

SEQUENTIAL:
  Layer 4 (opus): Ranking + Assembly → FINAL_HANDOFF.md (staged write if ≥50 elements)
```

### Subagent Structured Context Template

Every subagent MUST receive 8 mandatory sections: MODEL, PERSONA, OBJECTIVE, PROOF CONTEXT, INPUTS, CONSTRAINTS, OUTPUT FORMAT, COORDINATION. See PROOF-ANTI-DEGRADATION.md Fix 12 for full template.

---

## Part 4: Microskill Layer Architecture

### Pre-Execution: Project Infrastructure (MANDATORY)

**Purpose:** Establish persistent state before any execution begins.

**Before ANY layer executes, create:**
```
[project]/02-proof-inventory/
├── PROJECT-STATE.md     # Living document — tracks current layer, status, outputs
├── PROGRESS-LOG.md      # Append-only execution timeline
└── checkpoints/         # Gate checkpoint files (created by each layer)
```

**Also:** Read PROOF-ANTI-DEGRADATION.md v2.0 before execution. Search for and delete any stale artifacts from previous failed attempts.

---

### Layer 0: Validation + Routing

**Purpose:** Validate inputs and route to appropriate operation(s)
**Model:** haiku (simple validation checks)

**Functions:**
- `validate_inventory_inputs()` — Check source materials exist
- `validate_discovery_inputs()` — Check mechanism/promise defined
- `validate_generation_inputs()` — Check gaps identified
- `validate_ranking_inputs()` — Check inventory complete
- `route_to_operation()` — Determine which operation(s) needed

**Output:** Operation queue with validated inputs

---

### Layer 1: Extraction + Classification

**Purpose:** Extract proof elements and classify by taxonomy
**Model:** sonnet for extraction, opus for scoring

**Functions:**
- `extract_from_testimonial_file()` — Parse testimonials
- `extract_from_sales_copy()` — Mine existing promotions
- `extract_from_studies()` — Parse research documents
- `classify_proof_element()` — Apply taxonomy
- `score_proof_element()` — Calculate quality scores
- `apply_phase_tags()` — Tag elements by product phase (see Phase Tagging below)

**Scoring Dimensions:**
- **Specificity** (0.25 weight): How precise/concrete is the proof?
- **Credibility** (0.25 weight): How believable is the source?
- **Relevance** (0.20 weight): How directly does it support the claim?
- **Novelty** (0.15 weight): How fresh/unused is this proof?
- **Emotional Impact** (0.15 weight): How does it make the reader feel?

**Composite Score:** Weighted average (weights above are defaults; Schwartz stage adjustments applied in Layer 2)

---

### Layer 2: Gap Analysis + Scoring

**Purpose:** Identify what's missing, score overall strength, determine promise ceiling
**Model:** opus (strategic analysis requiring market context)

**Functions:**
- `calculate_composite_scores()` — Weighted formula across 5 dimensions
- `apply_schwartz_adjustment()` — Stage-specific category multipliers
- `identify_category_gaps()` — What categories are empty/weak?
- `identify_quality_gaps()` — Where is proof insufficient?
- `identify_claim_gaps()` — What claims lack support?
- `calculate_overall_strength()` — 0-100 score
- `calculate_promise_ceiling()` — What can/cannot be credibly claimed
- `identify_knockout_proof()` — Single most powerful element

---

### Layer 3: Discovery + Generation

**Purpose:** Research additional proof beyond what exists in provided materials
**Model:** sonnet for web search/extraction, opus for analysis/synthesis

**THIS LAYER CANNOT BE SKIPPED — See PROOF-ANTI-DEGRADATION.md**

**Functions:**
- `route_discovery_priorities()` — Prioritize by gap severity (3.1)
- `search_for_studies()` — Minimum 5 search queries (3.2)
- `search_for_data()` — Minimum 3 search queries (3.3)
- `search_for_expert_quotes()` — Minimum 3 search queries (3.4)
- `find_analogous_proof()` — Cross-domain evidence models (3.5)
- `recommend_proof_generation()` — What client should CREATE (3.6)
- `provide_implementation_guidance()` — How to collect/create proof (3.7)

**Parallel Execution Pattern (Recommended):**

```
Agent 1 (sonnet/SOURCE_HUNTER): Study Discovery (3.2) + Data Discovery (3.3)
  → Writes DISCOVERY_LOG.md Parts 1-3
  → Receives: gap list, Schwartz stage, mechanism, promise, search minimums

Agent 2 (sonnet/SOURCE_HUNTER): Expert Quote (3.4) + Analogous Proof (3.5)
  → Appends DISCOVERY_LOG.md Parts 4-6
  → Receives: gap list, mechanism name, product category, proof inventory summary

Agent 3 (opus/STRATEGIST): Generation Recommendations (3.6) + Implementation (3.7)
  → Can run concurrently OR after Agents 1-2 complete
  → Receives: full gap analysis, discovery findings, product context
```

**Coordination Rules:**
- Design DISCOVERY_LOG.md section structure BEFORE spawning agents
- Agent 1 creates the file; Agent 2 appends after Agent 1 completes
- Both agents receive the 8-section structured context template
- If parallel agents need to write to the same file, use orchestrator-level merging

---

### Layer 4: Ranking + Output + Handoff

**Purpose:** Prioritize proof for copy and package for downstream skills
**Model:** opus (full-context integration and judgment)

**Functions:**
- `select_knockout_proof()` — Single most powerful element with rationale
- `rank_by_copy_position()` — Top elements for lead, mechanism, close
- `map_proof_to_objections()` — Match proof to each objection cluster
- `design_gradualization()` — Credibility-building sequence
- `compile_phase_proof_matrix()` — Proof organized by product phase
- `package_downstream_handoffs()` — YAML blocks for skills 03, 04, 05, 06, 18
- `assemble_final_handoff()` — Compile FINAL_HANDOFF.md (MANDATORY)

**Staged Write Protocol (Fix 7):**

When element count >= 50 (which it will be for any real project), FINAL_HANDOFF.md MUST be written in 3 stages:
- Stage 1: Sections 0-2 (Executive Summary + Full Element Inventory)
- Stage 2: Sections 3-7 (Scoring + Gap Analysis + Rankings + Phase Matrix)
- Stage 3: Sections 8-10 (Objection Mapping + Downstream Handoffs + Element Index)

DO NOT attempt a single Write call for files expected to exceed 50KB.

### FINAL_HANDOFF.md — Mandatory Primary Deliverable

**Purpose:** Single comprehensive document that downstream skills consume. No downstream skill should need to read the individual category YAML files — FINAL_HANDOFF.md contains everything.

**FINAL_HANDOFF.md Required Sections:**

```markdown
# PROOF INVENTORY — FINAL HANDOFF
## [Project Name]
## Generated: [timestamp]

### Section 0: Executive Summary
- Total elements, strength score, promise ceiling
- Category counts and quality distributions
- Critical gaps and generation recommendations

### Section 1: Inventory by Category
- For EACH of 6 categories: count, avg composite, quality distribution, sub-type breakdown, top 5 elements (full content + scores + copy usability)

### Section 2: Gap Analysis
- Missing categories
- Weak categories
- Claim gaps (what claims lack proof)
- Framework coverage assessment

### Section 3: Strength Score
- Overall score (1-100) with calculation breakdown
- Per-category strength table

### Section 4: Promise Ceiling
- Maximum credible claim statement
- What we CAN claim (with element IDs)
- What we CANNOT claim
- Believability constraints

### Section 5: Rankings
- Knockout proof (single most powerful element)
- By copy position (lead, mechanism, close — top 3 each)
- By objection (5+ objections with proof sequences)
- Gradualization sequence (layer-by-layer belief building)

### Section 6: Schwartz Stage Fit
- Market stage assessment
- Primary and secondary proof strategies

### Section 7: Mechanism Proof Path
- Step-by-step proof sequence for proving the mechanism

### Section 8: Generation Recommendations
- High/medium/low priority proof the client must CREATE
- Implementation guidance

### Section 9: Downstream Skill Handoffs
- For 03-Root-Cause: top proof elements
- For 04-Mechanism: proof pathway elements
- For 05-Promise: ceiling + constraints
- For 06-Big-Idea: strength score + calibration
- For 18-Proof-Weaving: position elements + sequencing strategy

### Section 10: All Elements (Full Inventory)
- Complete listing of ALL elements grouped by category
- Each element: ID, sub_type, content, source, citation, composite score, copy_usability, framework_connection
```

**Minimum Size:** 50KB (ensures comprehensive coverage, not a summary)

**FINAL_HANDOFF.md is the file that gets referenced by downstream skills.** The category YAML files are working artifacts. FINAL_HANDOFF.md is the deliverable.

---

## Part 5: Input/Output Schemas

### Master Input Schema

```yaml
proof_skill_input:
  operation: enum[inventory, discovery, generation, ranking, full_pipeline]

  # For INVENTORY operation
  source_materials:
    testimonial_files: [filepath]
    study_documents: [filepath]
    previous_promotions: [filepath]
    product_materials: [filepath]
    video_transcripts: [filepath]

  # For DISCOVERY operation
  discovery_context:
    mechanism_to_prove: string
    promise_to_support: string
    niche: string
    market_beliefs: [string]

  # For GENERATION operation
  generation_context:
    inventory_gaps: [string]
    budget_level: enum[low, medium, high]
    timeline: enum[urgent, standard, extended]

  # For RANKING operation
  ranking_context:
    schwartz_stage: integer (1-5)
    dominant_objections: [string]
    copy_format: enum[vsl, sales_letter, email, etc.]
    lead_type: string

  # From upstream skills
  from_deep_research:
    competitor_proof_patterns: object
    market_beliefs: [string]
    schwartz_stage: integer
```

### Master Output Schema

```yaml
proof_skill_output:
  inventory:
    by_category:
      social:
        count: integer
        quality_distribution: {strong: int, medium: int, weak: int}
        sub_type_breakdown:
          testimonials: integer
          reviews: integer
          user_counts: integer
          other: integer
        elements: [ProofElement]

      authority:
        count: integer
        quality_distribution: {strong: int, medium: int, weak: int}
        sub_type_breakdown:
          studies: integer
          credentials: integer
          endorsements: integer
          validations: integer
        authority_level: enum[elite, strong, adequate, weak]
        elements: [ProofElement]

      demonstration:
        count: integer
        quality_distribution: {strong: int, medium: int, weak: int}
        sub_type_breakdown:
          live_demos: integer
          before_after: integer
          video_proof: integer
          other: integer
        visual_potential: enum[high, medium, low]
        elements: [ProofElement]

      mechanism:
        count: integer
        quality_distribution: {strong: int, medium: int, weak: int}
        sub_type_breakdown:
          mechanism_studies: integer
          scientific_principles: integer
          expert_explanations: integer
          other: integer
        elements: [ProofElement]

      data:
        count: integer
        quality_distribution: {strong: int, medium: int, weak: int}
        sub_type_breakdown:
          exact_statistics: integer
          percentages: integer
          money_figures: integer
          other: integer
        specificity_level: enum[exact, general, vague]
        elements: [ProofElement]

      risk_reversal:
        count: integer
        quality_distribution: {strong: int, medium: int, weak: int}
        sub_type_breakdown:
          guarantees: integer
          trials: integer
          warranties: integer
        guarantee_strength: enum[aggressive, standard, weak, none]
        elements: [ProofElement]

    gaps:
      missing_categories: [string]  # Categories with 0 elements
      weak_categories: [string]     # Categories scoring below threshold
      claim_gaps: [string]          # Claims without supporting proof

    strength_score: integer (1-100)

  discoveries:
    studies_found: [DiscoveryElement]
    data_found: [DiscoveryElement]
    expert_quotes_found: [DiscoveryElement]

  generation_plan:
    high_priority: [GenerationRecommendation]
    medium_priority: [GenerationRecommendation]

  rankings:
    knockout_proof:
      element: ProofElement
      rationale: string
      best_position: string

    by_copy_position:
      lead: [ProofElement]
      mechanism: [ProofElement]
      close: [ProofElement]

    by_objection:
      - objection: string
        proof_sequence: [ProofElement]

  strategic_outputs:
    promise_ceiling: string  # Maximum credible claim given proof
    mechanism_proof_path: string  # How to prove the mechanism
    believability_constraints: [string]  # What we CAN'T claim
    schwartz_stage_fit: string  # Why proof matches market stage

# Sub-schemas
ProofElement:
  id: string
  category: string
  sub_type: string
  content: string
  source: string
  scores:
    specificity: integer
    credibility: integer
    relevance: integer
    novelty: integer
    emotional_impact: integer
    composite: float
  raw_text: string

DiscoveryElement:
  type: string
  content: string
  source: string
  citation: string
  credibility_score: integer
  relevance_notes: string

GenerationRecommendation:
  proof_type: string
  what_to_create: string
  why_critical: string
  how_to_collect: string
  expected_impact: string
  effort_level: enum[low, medium, high]
```

---

## Part 6: Constraints

### Hard Constraints

1. **NEVER fabricate proof** — Only inventory what actually exists
2. **NEVER inflate quality scores** — Score based on explicit criteria
3. **NEVER ignore gaps** — Silence about missing proof is failure
4. **NEVER recommend impossible proof** — Generation must be achievable
5. **NEVER sequence randomly** — Rankings must follow Schwartz principles

### Soft Constraints

1. **PREFER specific over general** — "97.3%" over "almost all"
2. **PREFER attributed over anonymous** — Names > initials > anonymous
3. **PREFER visual over verbal** — Demonstrations > descriptions
4. **PREFER third-party over first-party** — External validation > self-claims
5. **PREFER recent over dated** — Current data > historical

---

## Part 7: Integration Points

### Upstream Dependencies

| Skill | What It Provides |
|-------|------------------|
| 01-research | Schwartz stage, competitor proof patterns, market beliefs |

### Downstream Consumers

| Skill | What It Needs |
|-------|---------------|
| 03-root-cause | Proof that supports the real cause |
| 04-mechanisms | Proof pathway for mechanism |
| 05-promise | Promise ceiling, believability constraints |
| 06-big-idea | Overall proof strength for concept calibration |
| 11-proof-demonstration | Tactical proof for copy (sequences, positioning) |

---

## Part 8: Quality Gates

### Inventory Completeness Gate

- [ ] All 6 categories assessed
- [ ] Each element scored on 5 dimensions
- [ ] Gaps explicitly identified
- [ ] Strength score calculated
- [ ] Promise ceiling determined

### Discovery Thoroughness Gate

- [ ] All gaps addressed
- [ ] Sources credibility-vetted
- [ ] Citations complete
- [ ] Analogous proof considered

### Generation Actionability Gate

- [ ] All recommendations achievable
- [ ] Priority clear (high/medium/low)
- [ ] How-to-collect specified
- [ ] Impact estimates realistic

### Ranking Validity Gate

- [ ] Schwartz stage factored
- [ ] Objections mapped to proof
- [ ] Sequence follows gradualization
- [ ] Knockout proof identified

### FINAL_HANDOFF Completeness Gate (MANDATORY)

- [ ] FINAL_HANDOFF.md EXISTS in project outputs folder
- [ ] All 11 sections present (Sections 0-10)
- [ ] Section 10 contains ALL elements (not a subset)
- [ ] File size >= 50KB (comprehensive, not abbreviated)
- [ ] Promise ceiling statement populated
- [ ] Knockout proof identified with rationale
- [ ] All downstream skill handoffs populated (03, 04, 05, 06, 18)
- [ ] Every element has ID, content, source, composite score, copy_usability

**IF FINAL_HANDOFF.md DOES NOT EXIST → SKILL IS NOT COMPLETE**

Proof inventory without FINAL_HANDOFF.md is like research without FINAL_HANDOFF.md — working files exist but the deliverable does not. Downstream skills consume FINAL_HANDOFF.md, not the category YAML files.

---

## Part 9: Vault Analysis Plan

### Current State

The vault has **category-level** proof extraction only:
- `types_used`: array of categories present
- `density`: light/moderate/heavy
- Many fields unpopulated (testimonial_count, strongest_proof_element, proof_sequence)

### Enhanced Extraction Needed

To build the skill properly, need **sub-element level** extraction:

**Cluster 1: Results Proof Pass**
- Testimonial sub-types (8)
- Before/after sub-types (6)
- Case study elements (5)

**Cluster 2: Authority Proof Pass**
- Study sub-types (10)
- Credential sub-types (10)
- Expert endorsement elements (5)

**Cluster 3: Concrete Proof Pass**
- Demonstration sub-types (12)
- Data/specifics sub-types (10)

**Cluster 4: Social Proof Pass**
- Social proof sub-types (10)
- Third-party validation sub-types (10)

### V1 Approach

Build skill using current category-level data. Identify patterns at macro level:
- Which niches use which proof types
- Which formats have highest proof density
- Correlation between proof density and quality scores

Iterate with enhanced extraction for V2.

---

## Part 10: Build Sequence

1. **Layer 0** — Input validation + operation routing
2. **Layer 1** — Extraction + classification (taxonomy implementation)
3. **Layer 2** — Gap analysis + discovery framework
4. **Layer 3** — Generation recommendations + ranking algorithms
5. **Layer 4** — Output packaging + handoff formatting

**Estimated complexity:** High (4 operations, 80+ sub-types, 5 scoring dimensions)

**Dependencies:** unified-extraction-schema.json update for enhanced proof fields

---

## Appendix: Schwartz Proof Principles Summary

1. **Proof must sell** — Not just prove, but make reader want more
2. **Timing matters** — Reader must unconsciously demand it
3. **Position amplifies** — Same proof in right spot = 2x impact
4. **One > ten** — One fully-believed proof beats ten partial
5. **Build bridges** — Never ask reader to jump believability chasms
6. **Weave together** — Promise + logic + emotion + image in every sentence
7. **Borrow believability** — Use trusted sources' credibility
