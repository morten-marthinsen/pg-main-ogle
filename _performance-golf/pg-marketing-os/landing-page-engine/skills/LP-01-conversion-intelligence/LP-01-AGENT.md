# LP-01: Conversion Intelligence Loader — Master Agent

> **Version:** 1.0
> **Skill:** LP-01-conversion-intelligence
> **Position:** Phase 1 — Intelligence Layer (Runs after LP-00)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** `page-brief.json` from LP-00 (required)
> **Output:** `conversion-intelligence.json` + `CONVERSION-INTELLIGENCE-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Load, match, filter, and synthesize conversion intelligence for the specific page type + vertical classified by LP-00. This skill bridges the raw data layer (conversion-data-reference.md, specimen-index.md, cross-page-pattern-analysis.md, element-taxonomy.md) and all downstream architecture/writing skills.

**Three critical functions this skill performs:**

1. **Benchmark Loading:** Pull vertical-specific and page-type-specific conversion benchmarks from conversion-data-reference.md — not median/generic numbers, but the narrowest applicable data slice.
2. **Specimen Matching:** Identify which specimens from specimen-index.md are most relevant to this specific build, ranked by match quality (page_type + vertical + proof_density + offer_model).
3. **Strategic Synthesis:** Transform raw data + specimen patterns + element impact data into actionable strategic context that LP-03, LP-04, LP-05, LP-06, and LP-17 can consume directly.

**Success Criteria:**
- All benchmarks sourced from conversion-data-reference.md with explicit citations (zero hallucinated stats)
- At minimum 2 specimens matched (or explicit documentation that <2 exist for this vertical/type)
- Element impact ranking contains at minimum 8 elements ranked by relevance to this page type
- Cross-page patterns filtered to patterns relevant to this page type (not raw dump of all patterns)
- Strategic context section contains actionable guidance for at minimum LP-03, LP-04, and LP-06
- `conversion-intelligence.json` schema complete — zero empty required fields
- Data confidence score calculated and documented

This agent is a **loading, matching, and synthesis orchestrator**. It reads data files, matches specimens, ranks elements, synthesizes patterns, and packages intelligence. It does NOT write copy, design page architecture, or make structural decisions — those belong to downstream skills.

---

## IDENTITY

**This skill IS:**
- The data enrichment layer between LP-00's brief and all downstream architecture/writing skills
- The single source of truth for "what conversion data applies to THIS specific build"
- A matching engine that connects the right specimens, benchmarks, and patterns to the classified page type + vertical
- A synthesis skill that transforms raw reference data into strategic context

**This skill is NOT:**
- A copy writer (LP-07 through LP-14 handle that)
- An architecture planner (LP-03, LP-04, LP-05, LP-06 handle that)
- A competitive auditor (LP-02 handles live competitor analysis)
- A data source — it ONLY uses data from conversion-data-reference.md, specimen-index.md, cross-page-pattern-analysis.md, and element-taxonomy.md

**Upstream:** Receives `page-brief.json` from LP-00
**Downstream:** Feeds `conversion-intelligence.json` to LP-03 (Above-Fold Architecture), LP-04 (Section Sequence), LP-05 (Social Proof Architecture), LP-06 (Offer/CTA Architecture), LP-17 (Conversion Audit)

---

## STATE MACHINE

```
IDLE → TRIGGERED
  ↓
LAYER_0: Data Loading
  → 0.1: Load page-brief.json (extract page_type, vertical, traffic, awareness)
  → 0.2: Load conversion-data-reference.md (full benchmark database)
  → 0.3: Load specimen-index.md (full specimen registry)
  ↓ [GATE_0: page-brief.json loaded AND page_type extracted AND vertical extracted?]
LAYER_1: Matching & Filtering
  → 1.1: Select vertical-specific benchmarks
  → 1.2: Select page-type-specific benchmarks
  → 1.3: Match specimens by page_type + vertical (with fallback)
  → 1.4: Rank elements by impact for this page type
  ↓ [GATE_1: ≥4 benchmarks sourced AND ≥2 specimens matched (or gap documented) AND ≥8 elements ranked?]
LAYER_2: Synthesis
  → 2.1: Synthesize benchmark package (vertical + page_type + traffic temp)
  → 2.2: Extract specimen analysis (patterns from matched specimens)
  → 2.3: Filter cross-page patterns to this page type
  → 2.4: Build strategic context (actionable guidance for downstream skills)
  ↓ [GATE_2: All 4 synthesis outputs exist AND strategic context covers LP-03, LP-04, LP-06?]
LAYER_3: Validation
  → 3.1: Validate all benchmarks against conversion-data-reference.md (zero hallucination check)
  → 3.2: Audit completeness (all required fields populated, data confidence scored)
  ↓ [GATE_3: Zero hallucinated benchmarks AND completeness audit PASS?]
LAYER_4: Package Assembly
  → 4.1: Compile conversion-intelligence.json
  → 4.2: Write CONVERSION-INTELLIGENCE-SUMMARY.md
  → 4.3: Write execution-log.md
  ↓
COMPLETE
```

---

## MODEL ASSIGNMENT TABLE

| Layer | Microskill | Model | Rationale |
|-------|-----------|-------|-----------|
| 0 | 0.1 Brief Loader | haiku | File loading, extraction — no analysis needed |
| 0 | 0.2 Data Reference Loader | haiku | File loading — no analysis needed |
| 0 | 0.3 Specimen Index Loader | haiku | File loading — no analysis needed |
| 1 | 1.1 Vertical Benchmark Selector | sonnet | Requires matching logic and filtering judgment |
| 1 | 1.2 Page-Type Benchmark Selector | sonnet | Requires matching logic and filtering judgment |
| 1 | 1.3 Specimen Matcher | sonnet | Requires multi-dimensional matching with fallback logic |
| 1 | 1.4 Element Impact Ranker | sonnet | Requires ranking judgment based on page type and vertical |
| 2 | 2.1 Benchmark Synthesizer | sonnet | Requires synthesis of multiple data sources into coherent package |
| 2 | 2.2 Specimen Analysis Extractor | sonnet | Requires pattern extraction and relevance assessment |
| 2 | 2.3 Cross-Page Pattern Filter | sonnet | Requires filtering and relevance ranking of pattern data |
| 2 | 2.4 Strategic Context Builder | sonnet | Requires strategic reasoning and downstream-skill-aware synthesis |
| 3 | 3.1 Intelligence Validator | sonnet | Requires source verification against reference data |
| 3 | 3.2 Completeness Audit | sonnet | Requires schema completeness assessment |
| 4 | 4.1 Intelligence Compiler | haiku | JSON compilation from existing outputs — no analysis |
| 4 | 4.2 Summary Writer | haiku | Markdown summary from existing outputs — structured template |
| 4 | 4.3 Log Writer | haiku | Execution log from existing outputs — structured template |

---

## LAYER DETAILS

### Layer 0: Data Loading

> **POSITIONAL REINFORCEMENT:** You are in Layer 0 — DATA LOADING. Your job is to load files and extract key fields. You are NOT filtering, ranking, matching, or synthesizing. Load the data. Extract the fields. Write them to files. Move on.

| ID | Name | Spec File | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 0.1 | Brief Loader | `skills/layer-0/0.1-brief-loader.md` | Load page-brief.json and extract classification fields | page-brief.json | brief-extract.md | haiku |
| 0.2 | Data Reference Loader | `skills/layer-0/0.2-data-reference-loader.md` | Load conversion-data-reference.md into working memory | conversion-data-reference.md | data-reference-load.md | haiku |
| 0.3 | Specimen Index Loader | `skills/layer-0/0.3-specimen-index-loader.md` | Load specimen-index.md into working memory | specimen-index.md | specimen-index-load.md | haiku |

**GATE_0:** `page-brief.json` loaded successfully AND `page_type` extracted (type_a, type_b, or hybrid) AND `vertical.primary` extracted AND `traffic.temperature` extracted. If ANY of these fail → HALT with error message.

### Layer 1: Matching & Filtering

> **POSITIONAL REINFORCEMENT:** You are in Layer 1 — MATCHING AND FILTERING. Your job is to select the right data for this specific build. You are matching benchmarks to vertical/page_type, matching specimens to page_type/vertical, and ranking elements by relevance. You are NOT synthesizing, writing strategic guidance, or making architecture decisions.

| ID | Name | Spec File | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 1.1 | Vertical Benchmark Selector | `skills/layer-1/1.1-vertical-benchmark-selector.md` | Select benchmarks matching the primary vertical | brief-extract.md + data-reference-load.md | vertical-benchmarks.md | sonnet |
| 1.2 | Page-Type Benchmark Selector | `skills/layer-1/1.2-page-type-benchmark-selector.md` | Select benchmarks matching the page type + traffic temp | brief-extract.md + data-reference-load.md | page-type-benchmarks.md | sonnet |
| 1.3 | Specimen Matcher | `skills/layer-1/1.3-specimen-matcher.md` | Match specimens by page_type + vertical with fallback | brief-extract.md + specimen-index-load.md | matched-specimens.md | sonnet |
| 1.4 | Element Impact Ranker | `skills/layer-1/1.4-element-impact-ranker.md` | Rank elements by impact for this page type + vertical | brief-extract.md + data-reference-load.md + element-taxonomy.md | element-impact-ranking.md | sonnet |

**GATE_1:** At minimum 4 benchmarks sourced with citations AND at minimum 2 specimens matched (OR explicit documentation that fewer than 2 exist with gap noted) AND at minimum 8 elements ranked. If ANY threshold not met → return to Layer 1.

### Layer 2: Synthesis

> **POSITIONAL REINFORCEMENT:** You are in Layer 2 — SYNTHESIS. Your job is to transform the filtered/matched data from Layer 1 into synthesized intelligence packages. Every output must cite its source data. You are NOT inventing benchmarks, hallucinating specimen patterns, or making final architecture decisions.

| ID | Name | Spec File | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 2.1 | Benchmark Synthesizer | `skills/layer-2/2.1-benchmark-synthesizer.md` | Merge vertical + page-type benchmarks into unified package | vertical-benchmarks.md + page-type-benchmarks.md | benchmark-synthesis.md | sonnet |
| 2.2 | Specimen Analysis Extractor | `skills/layer-2/2.2-specimen-analysis-extractor.md` | Extract actionable patterns from matched specimens | matched-specimens.md + specimen-index.md + cross-page-pattern-analysis.md | specimen-analysis.md | sonnet |
| 2.3 | Cross-Page Pattern Filter | `skills/layer-2/2.3-cross-page-pattern-filter.md` | Filter cross-page patterns to this page type | brief-extract.md + cross-page-pattern-analysis.md | filtered-patterns.md | sonnet |
| 2.4 | Strategic Context Builder | `skills/layer-2/2.4-strategic-context-builder.md` | Synthesize all data into downstream-skill-aware guidance | benchmark-synthesis.md + specimen-analysis.md + filtered-patterns.md + element-impact-ranking.md | strategic-context.md | sonnet |

**GATE_2:** All 4 synthesis outputs (benchmark-synthesis.md, specimen-analysis.md, filtered-patterns.md, strategic-context.md) exist AND strategic-context.md contains explicit guidance for at minimum LP-03, LP-04, and LP-06. If ANY output missing → return to Layer 2.

### Layer 3: Validation

> **POSITIONAL REINFORCEMENT:** You are in Layer 3 — VALIDATION. Your job is to verify that every benchmark in the synthesis can be traced back to conversion-data-reference.md and that the output schema is complete. You are the quality gate. If you find a hallucinated statistic, HALT. If you find an empty required field, HALT. Zero tolerance.

| ID | Name | Spec File | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 3.1 | Intelligence Validator | `skills/layer-3/3.1-intelligence-validator.md` | Verify all benchmarks against source data | benchmark-synthesis.md + conversion-data-reference.md | validation-report.md | sonnet |
| 3.2 | Completeness Audit | `skills/layer-3/3.2-completeness-audit.md` | Verify all required fields populated, calculate data confidence | All Layer 2 outputs | completeness-audit.md | sonnet |

**GATE_3:** Zero hallucinated benchmarks (every stat traced to source) AND completeness audit PASS (all required fields populated, data confidence scored). If validation finds hallucinated data → HALT, return to Layer 1/2 to fix. If completeness fails → HALT, return to missing layer.

### Layer 4: Package Assembly

> **POSITIONAL REINFORCEMENT:** You are in Layer 4 — PACKAGE ASSEMBLY. Your job is to compile the validated outputs into the final deliverables. You are NOT re-analyzing, re-filtering, or changing any data. Compile what exists. Format it. Write it to files.

| ID | Name | Spec File | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 4.1 | Intelligence Compiler | `skills/layer-4/4.1-intelligence-compiler.md` | Compile conversion-intelligence.json from all validated outputs | All Layer 2+3 outputs | conversion-intelligence.json | haiku |
| 4.2 | Summary Writer | `skills/layer-4/4.2-summary-writer.md` | Write human-readable CONVERSION-INTELLIGENCE-SUMMARY.md | conversion-intelligence.json | CONVERSION-INTELLIGENCE-SUMMARY.md | haiku |
| 4.3 | Log Writer | `skills/layer-4/4.3-log-writer.md` | Write execution-log.md | All layer outputs | execution-log.md | haiku |

---

## OUTPUT SCHEMA: conversion-intelligence.json

```json
{
  "schema_version": "1.0",
  "created": "[ISO timestamp]",
  "project_name": "[from page-brief.json]",
  "source_brief": "[path to page-brief.json]",

  "classification_context": {
    "page_type": "[type_a | type_b | hybrid]",
    "vertical_primary": "[vertical_id]",
    "vertical_secondary": "[vertical_id | null]",
    "traffic_temperature": "[cold | warm | hot]",
    "awareness_stage": "[1_unaware | 2_problem_aware | 3_solution_aware | 4_product_aware | 5_most_aware]"
  },

  "vertical_benchmarks": {
    "conversion_rate_range": "[e.g., 2-4%]",
    "conversion_rate_top_performer": "[e.g., 8-15%]",
    "traffic_type": "[cold | warm | hot]",
    "aov_lift_from_bundles": "[e.g., +35-60% | not_applicable]",
    "guarantee_claim_rate": "[e.g., 8-12% | not_available]",
    "review_rating_threshold": "[e.g., 4.4+ stars | not_available]",
    "source_citations": ["[citation with source name]"]
  },

  "page_type_benchmarks": {
    "target_conversion_rate": "[e.g., 5-10%]",
    "bounce_rate_target": "[e.g., 40-60%]",
    "page_speed_target": "[e.g., <3 seconds]",
    "mobile_speed_target": "[e.g., <2 seconds]",
    "section_count_range": "[e.g., 9-23 sections]",
    "cta_count_range": "[e.g., 3-8 CTAs]",
    "source_citations": ["[citation with source name]"]
  },

  "element_level_impact": {
    "personalized_ctas": "+202% vs generic (HubSpot)",
    "video_on_page": "+86% lift (VWO)",
    "long_form_vs_short": "+220% leads (KlientBoost)",
    "multiple_offers_penalty": "-266% (KlientBoost)",
    "mobile_responsive": "+25.2% mobile CVR (VWO)",
    "load_delay_per_second": "-7% conversions (Google)",
    "simple_copy_grade_5_7": "+56% (VWO)",
    "source": "conversion-data-reference.md"
  },

  "matched_specimens": [
    {
      "specimen_id": "[e.g., LP-SPEC-10]",
      "name": "[e.g., BiOptimizers — Magnesium Breakthrough Trial]",
      "match_score": "[1-10]",
      "match_reason": "[why this specimen matches this build]",
      "page_type": "[type_a | type_b]",
      "vertical": "[vertical]",
      "proof_density": "[LOW | MEDIUM | HIGH | EXTREME]",
      "key_pattern": "[primary pattern to study]",
      "specimen_file": "[path to specimen file]",
      "relevance_to_build": "[specific aspects of this specimen that inform this build]"
    }
  ],

  "element_priority_ranking": [
    {
      "rank": 1,
      "element": "[element name]",
      "category": "[ATTENTION | TRUST | PROOF | EDUCATION | CONVERSION | OFFER | NAVIGATION | BRAND]",
      "frequency_in_specimens": "[X/11]",
      "impact_data": "[lift data if available | 'observed high impact' | 'vertical-specific requirement']",
      "required_for_this_build": "[true | false]",
      "rationale": "[why this element is ranked here for this page type + vertical]"
    }
  ],

  "cross_page_patterns": {
    "section_sequence_pattern": "[relevant Type A or Type B universal skeleton]",
    "proof_architecture_pattern": "[relevant proof density pattern from specimens]",
    "cta_architecture_pattern": "[relevant CTA count and placement pattern]",
    "headline_pattern": "[relevant headline type distribution]",
    "offer_structure_pattern": "[relevant offer model from specimens]",
    "vertical_specific_sections": ["[sections required for this vertical that others don't need]"],
    "source": "cross-page-pattern-analysis.md"
  },

  "strategic_context": {
    "lp_03_above_fold_guidance": "[specific guidance for above-fold architecture decisions]",
    "lp_04_section_sequence_guidance": "[specific guidance for section sequence decisions]",
    "lp_05_social_proof_guidance": "[specific guidance for proof strategy]",
    "lp_06_offer_cta_guidance": "[specific guidance for offer/CTA architecture]",
    "lp_17_conversion_audit_targets": "[specific targets to audit against]",
    "key_risks": ["[risk 1]", "[risk 2]"],
    "key_opportunities": ["[opportunity 1]", "[opportunity 2]"],
    "data_gaps": ["[gap 1 — what data is missing for this vertical/type]"]
  },

  "data_confidence": {
    "overall_score": "[1-10]",
    "benchmark_confidence": "[1-10]",
    "specimen_match_confidence": "[1-10]",
    "element_ranking_confidence": "[1-10]",
    "pattern_confidence": "[1-10]",
    "rationale": "[why this confidence level — e.g., 'strong vertical match but limited specimens']"
  },

  "downstream_handoffs": {
    "lp_03_above_fold": "Load conversion-intelligence.json for above-fold element selection, CTA placement, trust signal decisions",
    "lp_04_section_sequence": "Load conversion-intelligence.json for section count targets, section ordering by page type, vertical-specific required sections",
    "lp_05_social_proof": "Load conversion-intelligence.json for proof density targets, proof type selection, placement timing by awareness stage",
    "lp_06_offer_cta": "Load conversion-intelligence.json for CTA count targets, offer model patterns, pricing display patterns",
    "lp_17_conversion_audit": "Load conversion-intelligence.json for benchmark comparison, element completeness check, pattern compliance"
  }
}
```

---

## SPECIMEN MATCHING LOGIC

### Primary Match (page_type + vertical)
Search specimen-index.md for specimens where BOTH page_type AND vertical match the build.

### Secondary Match (page_type only)
If <2 primary matches, expand to specimens matching page_type regardless of vertical.

### Tertiary Match (vertical only)
If still <2, expand to specimens matching vertical regardless of page_type.

### Fallback
If <2 total matches exist in specimen-index.md, document the gap explicitly and proceed with whatever matches are available. Note the gap in `data_confidence` and `strategic_context.data_gaps`.

### Match Scoring (1-10)
- Page type match: +4 points
- Vertical match: +3 points
- Proof density match (within 1 tier): +1 point
- Offer model similarity: +1 point
- Specimen value rating HIGH: +1 point

---

## FORBIDDEN BEHAVIORS

1. Citing a benchmark not found in conversion-data-reference.md
2. Referencing a specimen ID not found in specimen-index.md
3. Outputting generic/median benchmarks when vertical-specific data exists
4. Skipping specimen matching and outputting an empty matched_specimens array without documenting why
5. Writing strategic context without referencing specific benchmark data or specimen patterns
6. Leaving any required JSON field empty — use `not_available` with rationale
7. Proceeding past any gate without the required checkpoint files existing
8. Using "conditional pass" or "partial pass" at any gate — gates are PASS or FAIL
9. Inventing cross-page patterns not documented in cross-page-pattern-analysis.md
10. Ranking elements without referencing element-taxonomy.md frequency data
