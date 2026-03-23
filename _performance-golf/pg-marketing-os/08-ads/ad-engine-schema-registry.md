# ad-engine-schema-registry.md

**Version:** 1.1
**Created:** 2026-02-25
**Updated:** 2026-02-27
**Purpose:** Define required fields for all inter-skill handoff files in the Ad Engine pipeline. Input validators (Layer 0) should verify field presence — not just file existence — against this registry.

---

## WHY THIS EXISTS

The Ad Engine has 10+ handoff files passing between A01→A12. Previously, input validators checked that a file exists but NOT that it contains the required fields. A silent schema mismatch (e.g., A01 changes its output structure but A02's loader still expects the old fields) causes downstream failures with no clear error message.

This registry is the **single source of truth** for what each handoff file MUST contain.

---

## VALIDATION PROTOCOL

```
FOR EACH handoff file consumed by a skill's Layer 0:
  1. CHECK: File exists at expected path → if not, HALT
  2. CHECK: File size >= minimum threshold → if not, HALT
  3. CHECK: All REQUIRED fields present (per this registry) → if not, HALT with specific missing field
  4. CHECK: REQUIRED fields are non-empty → if not, HALT with specific empty field
  5. OPTIONAL fields: log if missing, do not HALT
```

---

## HANDOFF 1: AD-INTELLIGENCE-HANDOFF.md

**Producer:** A01 (Ad Intelligence & Competitive Scan)
**Consumers:** A02, A03, A05, A06, A07, A10, A12
**Minimum Size:** 100KB
**Path:** `[project]/A01-ad-intelligence/AD-INTELLIGENCE-HANDOFF.md`

### Required Sections (10)

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Executive Summary | market_overview, dominant_patterns, total_ads_analyzed | All |
| 2 | Competitor Landscape | brands[] (name, ad_count, estimated_spend_signal), total_brands >= 10 | A02, A10 |
| 3 | Hook Type Distribution | hook_types[] (type_code, count, percentage, trend), at least 8 types represented | A02, A10 |
| 4 | Format Distribution | formats[] (format, platform, percentage), platform_breakdown | A03, A10 |
| 5 | Visual Style Analysis | ugc_vs_polished_ratio, color_patterns, text_overlay_patterns, platform_visual_norms | A05, A07 |
| 6 | Winning Ad Specimens | specimens[] (ad_copy_verbatim, platform, vertical, hook_type, estimated_run_duration), count >= 20 | A07, A12 |
| 7 | Emerging Trends | new_formats[], new_hook_types[], shifts_from_previous | A02 |
| 8 | Opportunity Gaps | underused_hook_types[], underserved_formats[], whitespace_description | A02, A10 |
| 9 | Platform-Specific Intelligence | per_platform[] (platform, dominant_formats, compliance_notes, audience_behavior) | A03, A05, A10 |
| 10 | Recommended Hooks | recommended_hooks[] (hook_type, rationale, priority_rank), count >= 10 | A02 |

### Field Validation Rules

```
REQUIRED: total_ads_analyzed >= 500
REQUIRED: brands[].length >= 10
REQUIRED: hook_types[].length >= 8
REQUIRED: specimens[].length >= 20
REQUIRED: recommended_hooks[].length >= 10
REQUIRED: Each specimen has: ad_copy_verbatim (non-empty), platform, hook_type
```

### Optional Impression Data Section (v1.1)

When Meta Ad Spy data is available, the handoff MAY include an additional `impression_data` block. All downstream consumers MUST handle this being absent (graceful degradation).

```yaml
impression_data:  # OPTIONAL — present only when Meta Ad Spy data was ingested
  data_source_breakdown:
    meta_ad_spy: integer      # ads imported from Meta Ad Spy tool
    apify: integer            # ads scraped via Apify
    firecrawl: integer        # ads scraped via Firecrawl
    total: integer            # sum of all sources

  impression_weighted_hook_distribution:
    # Same structure as hook_types[] in Section 3, but weighted by performance_score
    - type_code: string
      weighted_count: float   # sum of performance_scores for ads with this type
      weighted_pct: float     # weighted_count / total_weighted_count
      impression_validated_count: integer  # how many ads in this type have impression data
      raw_count: integer      # unweighted count (same as Section 3)

  impression_validated_specimens:
    # Specimen IDs from Section 6 that have impression data
    - specimen_id: string
      impressions: integer
      performance_score: float
      impression_validated: true

  impression_benchmarks:
    vertical: string
    total_impression_validated_ads: integer
    median_impressions: integer
    p75_impressions: integer
    p90_impressions: integer
    median_performance_score: float
    p75_performance_score: float
    p90_performance_score: float
    date_range:
      from: string  # ISO 8601
      to: string    # ISO 8601
```

**Validation Rules (OPTIONAL section — only validate IF present):**
```
IF impression_data exists:
  REQUIRED: data_source_breakdown.total = sum of all source counts
  REQUIRED: impression_benchmarks.total_impression_validated_ads >= 1
  REQUIRED: Each impression_validated_specimen has: specimen_id, impressions, performance_score
```

---

## HANDOFF 2: HOOK-ANGLE-MATRIX.md

**Producer:** A02 (Hook & Angle Discovery)
**Consumers:** A03, A04, A06, A07, A09
**Minimum Size:** 30KB
**Path:** `[project]/A02-hook-angle-discovery/HOOK-ANGLE-MATRIX.md`

### Required Sections (7)

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Strategic Angles | angles[] (description, rationale, rank), count >= 10 | A03, A04, A06 |
| 2 | Hook Bank | hooks[] (text, hook_type, angle_id, score), count >= 50 | A03, A04, A06 |
| 3 | Top Presentation | top_hooks[] (text, hook_type, scores{}, rationale), count >= 15 | A06 |
| 4 | Human Selections | selected_hooks[] (text, hook_type, human_notes), count >= 8 | A03, A04, A06, A07 |
| 5 | Hook-Angle Cross-Reference | cross_ref[] (hook_id, angle_id) | A04 |
| 6 | Platform Recommendations | platform_hooks[] (platform, recommended_hook_ids[]) | A03, A07 |
| 7 | Variant Potential | variant_estimates[] (hook_id, estimated_variants) | A07, A09 |

### Field Validation Rules

```
REQUIRED: angles[].length >= 10
REQUIRED: hooks[].length >= 50
REQUIRED: selected_hooks[].length >= 8
REQUIRED: Each hook has: text (non-empty), hook_type (from 32-type taxonomy), score (1-10)
REQUIRED: Human Selections section exists (BLOCKING gate output)
```

---

## HANDOFF 3: FORMAT-STRATEGY.md

**Producer:** A03 (Format Strategy & Platform Mapping)
**Consumers:** A04, A05, A07, A09
**Minimum Size:** 15KB
**Path:** `[project]/A03-format-strategy/FORMAT-STRATEGY.md`

### Required Sections

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Master Format Assignment Table | assignments[] (hook_id, format, platform, ad_length, aspect_ratio) | A04, A05, A07 |
| 2 | Platform Constraints | per_platform[] (platform, max_length, aspect_ratios[], compliance_rules[]) | A04, A05 |
| 3 | Creative Volume Plan | total_variants_planned, variants_per_concept, concepts_planned | A07, A09 |
| 4 | Sound Behavior | per_platform[] (sound_on_ratio, text_overlay_required) | A04, A05 |

### Field Validation Rules

```
REQUIRED: assignments[].length >= selected_hooks count from A02
REQUIRED: Each assignment has: hook_id, format, platform, ad_length
REQUIRED: platform_constraints covers at least 2 platforms
```

---

## HANDOFF 4: SCRIPT-ARCHITECTURE-PACKAGE.md

**Producer:** A04 (Script Architecture)
**Consumers:** A05, A06, A07
**Minimum Size:** 30KB
**Path:** `[project]/A04-script-architecture/SCRIPT-ARCHITECTURE-PACKAGE.md`

### Required Sections

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Script Inventory | scripts[] (script_id, hook_id, framework, platform, ad_length, word_count) | A05, A06, A07 |
| 2 | Per-Script Content | per_script[] (script_id, hook_text, audio_column, swap_points[]) | A05, A06, A07 |
| 3 | Framework Selections | per_script[] (script_id, framework_selected, rationale) | A06 |
| 4 | Modular Architecture | per_script[] (swap_points: hook_slot, setup_slot, mechanism_slot, proof_slot, cta_slot) | A07, A09 |

### Field Validation Rules

```
REQUIRED: scripts[].length >= selected_hooks count
REQUIRED: Each script has: audio_column (non-empty), word_count <= max for ad_length
REQUIRED: swap_points defined for each script (minimum: hook_slot, cta_slot)
REQUIRED: word_count verified against AD-ENGINE.md limits (15/40/75/160/450)
```

---

## HANDOFF 5: VISUAL-DIRECTION-PACKAGE.md

**Producer:** A05 (Visual Direction)
**Consumers:** A06, A08, A09
**Minimum Size:** 25KB
**Path:** `[project]/A05-visual-direction/VISUAL-DIRECTION-PACKAGE.md`

### Required Sections

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Visual Brief Index | briefs[] (brief_id, script_id, treatment_type, platform) | A06, A08 |
| 2 | Per-Brief Shot Lists | per_brief[] (brief_id, shots[]: shot_type, subject, action, duration, text_overlay, transition) | A08 |
| 3 | Treatment Types | per_brief[] (treatment: talking_head / b_roll_vo / text_on_screen / screen_recording / mixed) | A06, A08 |
| 4 | Production Specs | per_platform[] (platform, aspect_ratio, resolution, file_format, safe_zones) | A08, A09 |

### Field Validation Rules

```
REQUIRED: briefs[].length >= scripts count from A04
REQUIRED: Each shot has: shot_type (CU/MS/WS), subject, action, duration
REQUIRED: "Show product" is FORBIDDEN as a shot description — must be specific
REQUIRED: treatment_type is one of 5 valid types
```

---

## HANDOFF 6: AD-ARENA-RESULTS.md + A07-HANDOFF.md

**Producer:** A06 (Ad Arena)
**Consumers:** A07 (primary), A09 (reference)
**Minimum Size:** AD-ARENA-RESULTS.md: 50KB, A07-HANDOFF.md: 5KB
**Paths:**
- `[project]/A06-ad-arena/AD-ARENA-RESULTS.md`
- `[project]/A06-ad-arena/A07-HANDOFF.md`

### AD-ARENA-RESULTS.md Required Sections

| # | Section | Required Fields |
|---|---------|----------------|
| 1 | Arena Summary | total_rounds (=2 + audience evaluation), total_competitors (=7), concepts_evaluated, concepts_selected |
| 2 | Selected Concepts | concepts[] (concept_id, hook_text, script_summary, visual_treatment, overall_score) |
| 3 | Per-Round Results | rounds[] (round_number, competitors[], scores[], critic_feedback[]) |
| 4 | Human Selection | selected_concept_ids[], human_notes |

### A07-HANDOFF.md Required Fields

```
REQUIRED: selected_concepts[] with:
  - concept_id
  - hook_text (verbatim)
  - script_architecture (full script)
  - visual_direction (treatment + key shots)
  - improvement_recommendations (from Arena critique)
  - word_count_limits (from A03/A04)
  - platform_constraints (from A03)
  - variant_generation_guidance (how many hook swaps, CTA variants)
```

---

## HANDOFF 7: COPY-PRODUCTION-PACKAGE.md + Downstream Handoff

**Producer:** A07 (Copy Production)
**Consumers:** A08, A09
**Minimum Size:** COPY-PRODUCTION-PACKAGE.md: 20KB
**Paths:**
- `[project]/A07-copy-production/COPY-PRODUCTION-PACKAGE.md`
- `[project]/A07-copy-production/layer-4-outputs/4.2-downstream-handoff.md`

### Required Fields (Downstream Handoff for A08)

```
REQUIRED: variant_ids[] (all variants needing visual assets)
REQUIRED: per_variant[] (variant_id, visual_direction_ref, text_overlay_content)
REQUIRED: platform_file_paths[] (where A08 should output assets)
```

### Required Fields (Downstream Handoff for A09)

```
REQUIRED: variant_matrix_structure (hook_ids × body_ids × cta_ids)
REQUIRED: combinatorial_mapping[] (which hooks go with which bodies with which CTAs)
REQUIRED: platform_specific_paths[]
```

---

## HANDOFF 8: PRODUCTION-ASSETS-PACKAGE.md

**Producer:** A08 (Visual/Video Production)
**Consumers:** A09
**Minimum Size:** 5KB
**Path:** `[project]/A08-visual-video-production/layer-4-outputs/4.3-downstream-handoff.md`

### Required Fields

```
REQUIRED: file_manifest[] (variant_id, file_path, file_format, file_size, platform)
REQUIRED: platform_directory_structure
REQUIRED: assembly_status_per_variant[] (variant_id, status: complete/partial/missing)
REQUIRED: a09_instructions (what A09 needs to assemble vs. what's already done)
```

---

## HANDOFF 9: AD-VARIANT-MATRIX-SUMMARY.md

**Producer:** A09 (Assembly & Variant Matrix)
**Consumers:** A10, A11, A12
**Minimum Size:** 15KB
**Path:** `[project]/A09-assembly-variant-matrix/AD-VARIANT-MATRIX-SUMMARY.md`

### Required Fields

```
REQUIRED: total_variants (integer >= 30)
REQUIRED: variants[] (variant_id, concept_id, hook_text, body_ref, cta_ref, visual_ref, platform, format)
REQUIRED: coherence_validation_results[] (variant_id, hook_body_coherence, body_cta_coherence, overall_pass)
REQUIRED: testing_priority[] (variant_id, priority_rank, rationale)
REQUIRED: platform_distribution (per_platform variant counts)
```

---

## HANDOFF 10: PRE-LAUNCH-SCORECARD.md / SCORING-REPORT.md

**Producer:** A10 (Pre-Launch Scoring)
**Consumers:** A11, A12
**Minimum Size:** 20KB
**Path:** `[project]/A10-pre-launch-scoring/SCORING-REPORT.md`

### Required Fields

```
REQUIRED: variants_scored (integer = total from A09)
REQUIRED: per_variant_scores[] with:
  - variant_id
  - creative_quality_score (1-10)
  - audience_alignment_score (1-10)
  - competitive_differentiation_score (1-10)
  - platform_optimization_score (1-10)
  - compliance_score (1-10)
  - overall_weighted_score (1-10)
  - predicted_performance_tier (A/B/C/D)
  - confidence_level (HIGH/MEDIUM/LOW)
REQUIRED: testing_recommendations[] (which variants to test first, budget allocation)
REQUIRED: compliance_flags[] (variant_id, flag_type, severity, recommendation)
REQUIRED: prediction_baselines (for A12 comparison)
```

---

## CROSS-REFERENCE: WHO PRODUCES, WHO CONSUMES

```
A01 → AD-INTELLIGENCE-HANDOFF.md → A02, A03, A05, A06, A07, A10, A12
A02 → HOOK-ANGLE-MATRIX.md → A03, A04, A06, A07, A09, A12
A03 → FORMAT-STRATEGY.md → A04, A05, A07, A09
A04 → SCRIPT-ARCHITECTURE-PACKAGE.md → A05, A06, A07
A05 → VISUAL-DIRECTION-PACKAGE.md → A06, A08, A09
A06 → AD-ARENA-RESULTS.md + A07-HANDOFF.md → A07, A09
A07 → COPY-PRODUCTION-PACKAGE.md + downstream-handoff → A08, A09
A08 → PRODUCTION-ASSETS-PACKAGE.md → A09
A09 → AD-VARIANT-MATRIX-SUMMARY.md → A10, A11, A12
A10 → SCORING-REPORT.md → A11, A12
```

---

## UPSTREAM: CopywritingEngine Handoff Files (Consumed by A01/A02)

These files are produced by CopywritingEngine Skills 01-09 and consumed by the Ad Engine.

| File | Producer | Consumer | Key Fields |
|------|----------|----------|------------|
| Campaign Brief | Skill 09 | A01, A02, A06 | product_description, target_audience, awareness_level, campaign_goal |
| Research Handoff | Skill 01 | A02, A06 | pain_quotes[], hope_language[], market_sophistication |
| Root Cause Package | Skill 03 | A04, A06 | root_cause_framing, villain, reframe |
| Mechanism Package | Skill 04 | A04, A06 | mechanism_name, explanation, "how it works" story |
| Promise Package | Skill 05 | A04, A06 | core_promise, promise_ceiling, calibrated_claims |
| Big Idea Package | Skill 06 | A04, A06 | central_concept, creative_wrapper |
| Offer Package | Skill 07 | A04, A07 | offer_stack, guarantee, price_anchoring |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-27 | META AD SPY INTEGRATION: Added optional `impression_data` section to Handoff 1 (AD-INTELLIGENCE-HANDOFF.md) with fields: data_source_breakdown, impression_weighted_hook_distribution, impression_validated_specimens[], impression_benchmarks{}. All fields optional with validation rules that only apply when section is present. No breaking changes to existing schemas. |
| 1.0 | 2026-02-25 | Initial creation — 10 handoff schemas + upstream reference + cross-reference map |
