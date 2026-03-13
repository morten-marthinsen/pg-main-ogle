# Layer 0: Validation + Routing

**Layer:** 0
**Type:** Orchestration
**Purpose:** Validate inputs and route to appropriate operation(s)

---

## OPERATIONS OVERVIEW

The Proof skill supports four operations that can run independently or as a pipeline:

| Operation | Purpose | Required Inputs |
|-----------|---------|-----------------|
| **INVENTORY** | Catalog existing proof | Source materials |
| **DISCOVERY** | Research external proof | Inventory gaps + mechanism/promise |
| **GENERATION** | Recommend proof to create | Gaps + budget/timeline |
| **RANKING** | Prioritize for copy | Complete inventory + Schwartz stage |

---

## ROUTING LOGIC

### Determine Operation Mode

```
IF user_specifies_operation:
    route_to(specified_operation)

ELSE IF source_materials_provided AND no_existing_inventory:
    route_to(INVENTORY)

ELSE IF inventory_exists AND gaps_identified AND mechanism_defined:
    route_to(DISCOVERY)

ELSE IF inventory_complete AND generation_requested:
    route_to(GENERATION)

ELSE IF inventory_complete AND schwartz_stage_known:
    route_to(RANKING)

ELSE IF full_pipeline_requested:
    route_to([INVENTORY → DISCOVERY → GENERATION → RANKING])

ELSE:
    ask_for_clarification()
```

---

## INPUT VALIDATION

### Operation: INVENTORY

**Required:**
- [ ] At least ONE source material provided:
  - testimonial_files, OR
  - study_documents, OR
  - previous_promotions, OR
  - product_materials, OR
  - video_transcripts

**Optional but Valuable:**
- [ ] Deep Research output (for competitor proof patterns)
- [ ] Product/offer context (for relevance scoring)

**Validation Checks:**
```
validate_inventory_inputs():
    sources = collect_all_sources()

    IF len(sources) == 0:
        FAIL: "No source materials provided. Please provide at least one of:
               - Testimonial files
               - Study documents
               - Previous promotions
               - Product materials
               - Video transcripts"

    FOR source IN sources:
        IF not file_exists(source):
            WARN: f"Source file not found: {source}"

    IF all_sources_invalid:
        FAIL: "None of the provided source files could be found"

    RETURN {valid: true, sources: valid_sources}
```

---

### Operation: DISCOVERY

**Required:**
- [ ] Inventory gaps identified (from INVENTORY operation or explicit input)
- [ ] Mechanism to prove defined
- [ ] Promise to support defined

**Optional but Valuable:**
- [ ] Niche context
- [ ] Market beliefs (from Deep Research)
- [ ] Competitor proof patterns

**Validation Checks:**
```
validate_discovery_inputs():
    IF not gaps_identified AND not inventory_exists:
        FAIL: "Discovery requires inventory gaps. Run INVENTORY first or provide gaps explicitly."

    IF not mechanism_defined:
        WARN: "No mechanism specified. Discovery will search for general proof."

    IF not promise_defined:
        WARN: "No promise specified. Discovery will search without promise context."

    RETURN {
        valid: true,
        gaps: gaps_identified or extract_from_inventory(),
        mechanism: mechanism_defined or null,
        promise: promise_defined or null
    }
```

---

### Operation: GENERATION

**Required:**
- [ ] Inventory gaps identified

**Optional but Valuable:**
- [ ] Discovery limitations (what couldn't be found)
- [ ] Budget level
- [ ] Timeline constraints
- [ ] Promise requirements

**Validation Checks:**
```
validate_generation_inputs():
    IF not gaps_identified AND not inventory_exists:
        FAIL: "Generation requires identified gaps. Run INVENTORY first."

    budget = budget_level or 'medium'  # Default to medium
    timeline = timeline or 'standard'  # Default to standard

    RETURN {
        valid: true,
        gaps: gaps_identified or extract_from_inventory(),
        budget: budget,
        timeline: timeline
    }
```

---

### Operation: RANKING

**Required:**
- [ ] Complete proof inventory
- [ ] Schwartz stage of market

**Optional but Valuable:**
- [ ] Dominant objections to overcome
- [ ] Copy format (VSL, sales letter, etc.)
- [ ] Lead type being used
- [ ] Mechanism (for mechanism proof prioritization)

**Validation Checks:**
```
validate_ranking_inputs():
    IF not inventory_exists:
        FAIL: "Ranking requires a complete proof inventory. Run INVENTORY first."

    IF inventory.strength_score < 20:
        WARN: "Proof inventory is weak (score < 20). Rankings may be limited."

    IF not schwartz_stage:
        FAIL: "Schwartz stage is required for ranking. Provide stage 1-5."

    IF schwartz_stage < 1 OR schwartz_stage > 5:
        FAIL: f"Invalid Schwartz stage: {schwartz_stage}. Must be 1-5."

    RETURN {
        valid: true,
        inventory: inventory,
        schwartz_stage: schwartz_stage,
        objections: objections or [],
        copy_format: copy_format or 'general',
        lead_type: lead_type or null
    }
```

---

## PIPELINE MODE

When running full pipeline (INVENTORY → DISCOVERY → GENERATION → RANKING):

```
run_full_pipeline(inputs):
    # Phase 1: Inventory
    inventory_inputs = validate_inventory_inputs(inputs)
    IF not inventory_inputs.valid:
        FAIL: inventory_inputs.error

    inventory_result = run_inventory(inventory_inputs)

    # Phase 2: Discovery (if gaps exist)
    IF inventory_result.gaps.missing_categories OR inventory_result.gaps.weak_categories:
        discovery_inputs = {
            gaps: inventory_result.gaps,
            mechanism: inputs.mechanism_to_prove,
            promise: inputs.promise_to_support
        }
        discovery_result = run_discovery(discovery_inputs)

        # Merge discoveries into inventory
        inventory_result = merge_discoveries(inventory_result, discovery_result)

    # Phase 3: Generation (if still gaps)
    IF inventory_result.gaps.missing_categories OR inventory_result.gaps.weak_categories:
        generation_inputs = {
            gaps: inventory_result.gaps,
            budget: inputs.budget_level,
            timeline: inputs.timeline
        }
        generation_result = run_generation(generation_inputs)

    # Phase 4: Ranking (always run)
    IF not inputs.schwartz_stage:
        WARN: "Schwartz stage not provided. Defaulting to Stage 3 (crowded market)."
        schwartz_stage = 3
    ELSE:
        schwartz_stage = inputs.schwartz_stage

    ranking_inputs = {
        inventory: inventory_result,
        schwartz_stage: schwartz_stage,
        objections: inputs.dominant_objections,
        copy_format: inputs.copy_format
    }
    ranking_result = run_ranking(ranking_inputs)

    RETURN {
        inventory: inventory_result,
        discoveries: discovery_result,
        generation_plan: generation_result,
        rankings: ranking_result
    }
```

---

## ERROR HANDLING

### Common Errors + Recovery

| Error | Recovery |
|-------|----------|
| No source materials | Ask user to provide testimonials, studies, or previous promotions |
| Empty source files | Skip file, continue with remaining sources, warn user |
| No mechanism defined | Proceed without mechanism context, flag in output |
| Invalid Schwartz stage | Ask user to specify 1-5 or provide market context for inference |
| Weak inventory (<20 score) | Proceed but flag that rankings will be limited |

### Graceful Degradation

```
IF operation_partially_fails:
    complete_what_is_possible()
    document_what_failed()
    provide_recommendations_for_resolution()
```

---

## OUTPUT: ROUTING DECISION

After validation, Layer 0 outputs:

```yaml
routing_decision:
  operations_to_run: [INVENTORY, DISCOVERY, RANKING]  # Ordered list
  mode: "pipeline"  # or "single"

  validated_inputs:
    inventory:
      sources: [list of valid source files]
      context: {...}
    discovery:
      gaps: [list of gaps to fill]
      mechanism: "string or null"
      promise: "string or null"
    ranking:
      schwartz_stage: 3
      objections: [...]
      copy_format: "vsl"

  warnings: [
    "No mechanism specified - discovery will be broad",
    "3 source files not found - proceeding with remaining"
  ]

  ready_for_layer_1: true
```

---

## HANDOFF TO LAYER 1

Once validation complete, hand off to Layer 1 (Extraction + Classification) with:

1. **Validated source list** — Files confirmed to exist
2. **Operation context** — What we're trying to accomplish
3. **Taxonomy reference** — Link to PROOF-TAXONOMY.md
4. **Scoring context** — Schwartz stage for weighted scoring

Layer 1 will read sources and classify each proof element using the taxonomy.
