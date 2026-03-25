# CopywritingEngine — ~system/pipeline-handoff-registry.md

**Version:** 1.1
**Created:** 2026-03-01
**Purpose:** Define required fields for all inter-skill handoff files in the main 20-skill pipeline + cross-engine handoffs. Layer 0 input validators MUST verify field presence — not just file existence — against this registry.

---

## TABLE OF CONTENTS

- [WHY THIS EXISTS](#why-this-exists)
- [VALIDATION PROTOCOL](#validation-protocol)
- [FOUNDATION PIPELINE HANDOFFS (Skills 01→09)](#foundation-pipeline-handoffs-skills-0109)
- [LONG-FORM PIPELINE HANDOFFS (Skills 10→20)](#long-form-pipeline-handoffs-skills-1020)
- [CROSS-ENGINE HANDOFFS](#cross-engine-handoffs)
- [CROSS-REFERENCE MAP](#cross-reference-map)
- [ARENA SELECTION VERIFICATION (CRITICAL)](#arena-selection-verification-critical)
- [VERSION HISTORY](#version-history)

---

## WHY THIS EXISTS

The main pipeline has 20+ handoff files passing between Skills 01→20. Previously, input validators checked that an upstream file *exists* but NOT that it contains the required fields. A silent schema mismatch (e.g., Skill 03 changes its output structure but Skill 06's loader still expects the old fields) causes downstream failures with no clear error message.

**Specific failure this prevents:** Skill 19 (Campaign Assembly) consumed a pre-Arena draft instead of the Arena-selected Hybrid A, resulting in the entire lead being missing from the assembled promotion. If Skill 19's input validator had checked for `arena_selection_verified: true` in each upstream package, this could not have happened.

**Pattern:** Follows `ad-engine-schema-registry.md` (v1.1) which defines 10 handoff schemas for the Ad Engine pipeline.

This registry is the **single source of truth** for what each handoff file MUST contain.

---

## VALIDATION PROTOCOL

```
FOR EACH handoff file consumed by a skill's Layer 0:
  1. CHECK: File exists at expected path → if not, HALT
  2. CHECK: File size >= minimum threshold → if not, HALT
  3. CHECK: All REQUIRED fields present (per this registry) → if not, HALT with specific missing field
  4. CHECK: REQUIRED fields are non-empty → if not, HALT with specific empty field
  5. CHECK: Arena-dependent fields have arena_selection_verified: true → if not, HALT
  6. OPTIONAL fields: log if missing, do not HALT
```

---

## FOUNDATION PIPELINE HANDOFFS (Skills 01→09)

### HANDOFF 1: FINAL_HANDOFF.md (Research)

**Producer:** Skill 01 (Deep Research v3)
**Consumers:** Skills 02, 03, 04, 05, 06, 07, 08, 09
**Minimum Size:** 300KB (for 1000+ quote projects — see ANTI-DEGRADATION Fix 13)
**Path:** `[project]/01-research/FINAL_HANDOFF.md`

#### Required Sections

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Executive Summary | market_overview, total_quotes, bucket_distribution | All |
| 2 | Quote Database | quotes[] with source_id, verbatim_text, bucket, scores | All |
| 3 | Pain Cluster Analysis | clusters[] (theme, quote_count, representative_quotes) | 03, 06, 09 |
| 4 | Hope/Desire Patterns | patterns[] (desire_type, intensity, quote_ids) | 05, 06, 09 |
| 5 | Root Cause Evidence | evidence[] (suspected_cause, supporting_quotes, frequency) | 03, 09 |
| 6 | Solutions Tried Inventory | solutions[] (solution_name, sentiment, failure_reasons) | 03, 04, 09 |
| 7 | Competitor Mechanism Map | competitors[] (name, claimed_mechanism, market_position) | 04, 06, 09 |
| 8 | Villain Identification | villains[] (entity, blame_intensity, quote_ids) | 03, 06, 09 |
| 9 | Market Sophistication | stage (1-5), evidence, dominant_claims | 04, 06, 09 |
| 10 | Vertical Intelligence | vertical_specific_patterns, language_register | All |
| 11 | Synthesis Validation | transformation_pairs, now_after_grid, language_patterns | 06, 09 |

#### Field Validation Rules

```
REQUIRED: total_quotes >= 1000
REQUIRED: bucket_distribution.pain >= 300
REQUIRED: bucket_distribution.hope >= 250
REQUIRED: bucket_distribution.root_cause >= 200
REQUIRED: bucket_distribution.solutions_tried >= 150
REQUIRED: bucket_distribution.competitor_mechanism >= 100
REQUIRED: bucket_distribution.villain >= 75
REQUIRED: Each quote has: source_id (non-empty), verbatim_text (non-empty), bucket
```

---

### HANDOFF 2: proof-inventory-package.yaml

**Producer:** Skill 02 (Proof Inventory)
**Consumers:** Skills 05, 09, 11, 18
**Minimum Size:** 50KB
**Path:** `[project]/02-proof-inventory/proof-inventory-package.yaml`

#### Required Sections

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Proof Blocks | proof_blocks[] (id, type, claim, evidence, source, confidence_score) | All |
| 2 | Confidence Tiers | tier_1[] (highest), tier_2[], tier_3[] with block_ids | 05, 11 |
| 3 | Proof Type Distribution | types_available (statistical, testimonial, authority, demonstration, etc.) | 18 |
| 4 | Proof-Promise Ceiling | max_provable_claim, supporting_proof_ids, ceiling_confidence | 05, 09 |
| 5 | Discovery Log Reference | discovery_log_path, discovery_searches_completed | 09 |
| 6 | Vertical Proof Map | vertical_specific_proof_patterns, niche_credibility_signals | 18 |

#### Field Validation Rules

```
REQUIRED: proof_blocks[].length >= 20
REQUIRED: Each proof_block has: id, type, claim (non-empty), evidence (non-empty), confidence_score (1-10)
REQUIRED: tier_1[].length >= 5 (at least 5 high-confidence proofs)
REQUIRED: max_provable_claim is non-empty
REQUIRED: DISCOVERY_LOG.md exists (per Proof ANTI-DEGRADATION)
REQUIRED: LAYER_3_COMPLETE.yaml checkpoint exists
```

---

### HANDOFF 3: root-cause-package.yaml

**Producer:** Skill 03 (Root Cause)
**Consumers:** Skills 04, 05, 06, 09, 13
**Minimum Size:** 2KB
**Path:** `[project]/03-root-cause/root-cause-package.yaml`

#### Required Sections

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Core Statement | statement (plain language), three_part.what_they_think, three_part.what_real, three_part.why_nothing_worked | All |
| 2 | Copy Blocks | copy_blocks[] (context, usage_guidance) | 13, 09 |
| 3 | Validation Scores | truth_score (>=6.0), mechanism_alignment (>=7.0), composite_score (>=6.5) | All |
| 4 | Downstream Handoffs | mechanism_name_seed, promise_anchor, big_idea_seed | 04, 05, 06 |
| 5 | RSF Metadata | rsf_inputs_used (boolean), fssit_alignment_if_available | 06 |
| 6 | Expression Anchoring | anchoring_score, quote_penetration, tier1_pattern_match | 06, 09 |

#### Field Validation Rules

```
REQUIRED: three_part structure complete (all 3 parts non-empty)
REQUIRED: truth_score >= 6.0
REQUIRED: mechanism_alignment >= 7.0
REQUIRED: composite_score >= 6.5
REQUIRED: mechanism_name_seed is non-empty
REQUIRED: CONCEPT_APPROVED.yaml exists (Phase A gate passed)
REQUIRED: arena_selection_verified: true (Arena output, not pre-Arena draft)
```

---

### HANDOFF 4: mechanism-package.json

**Producer:** Skill 04 (Mechanism)
**Consumers:** Skills 05, 06, 09, 14
**Minimum Size:** 2KB
**Path:** `[project]/04-mechanism/mechanism-package.json`

#### Required Sections

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Core | mechanism_name, mechanism_statement, mechanism_type | All |
| 2 | Naming Variants | naming_candidates[] (>=15), selected_name, selection_rationale | 06, 09 |
| 3 | Validation Scores | mechanism_clarity, uniqueness_score, believability | All |
| 4 | Downstream Handoffs | promise_compatibility_notes, big_idea_mechanism_hook | 05, 06 |
| 5 | Expression Anchoring | anchoring_score, quote_first_names[] (>=5) | 06, 09 |

#### Field Validation Rules

```
REQUIRED: mechanism_name is non-empty
REQUIRED: mechanism_statement is non-empty
REQUIRED: naming_candidates[].length >= 15
REQUIRED: mechanism_clarity >= 7.0
REQUIRED: CONCEPT_APPROVED.yaml exists (Phase A gate passed)
REQUIRED: arena_selection_verified: true
```

---

### HANDOFF 5: promise-output.json

**Producer:** Skill 05 (Promise)
**Consumers:** Skills 06, 09
**Minimum Size:** 2KB
**Path:** `[project]/05-promise/promise-output.json`

#### Required Sections

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Core | promise_statement, proof_anchor (from Skill 02 ceiling) | All |
| 2 | Calibration | proof_ceiling_alignment, overreach_risk (low/medium/high) | 06, 09 |
| 3 | Validation Scores | promise_credibility, proof_support_score | All |
| 4 | Downstream Handoffs | big_idea_promise_seed | 06 |

#### Field Validation Rules

```
REQUIRED: promise_statement is non-empty
REQUIRED: proof_anchor references valid proof_block IDs from Skill 02
REQUIRED: promise_credibility >= 7.0
REQUIRED: overreach_risk != "high" (HALT if promise exceeds proof ceiling)
REQUIRED: arena_selection_verified: true
```

---

### HANDOFF 6: big-idea-output.json

**Producer:** Skill 06 (Big Idea)
**Consumers:** Skills 07, 08, 09, 10, 11
**Minimum Size:** 3KB
**Path:** `[project]/06-big-idea/big-idea-output.json`

#### Required Sections

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Concept Approved | concept_text (plain language, from Phase A), concept_approval_timestamp | All |
| 2 | Naming Variants | naming_variants[] (>=5), selected_name, selection_rationale | 07, 09, 10 |
| 3 | Expression Anchoring | anchoring_score (>=6.5), quote_penetration, vocab_match, tier1_pattern, fssit_echo | 09 |
| 4 | Schema Distance | schema_distance (4-8 optimal), distance_rationale | 09 |
| 5 | Validation | fssit_alignment (>=7.0), expression_quality, composite_score | All |
| 6 | Downstream Handoff | offer_hook, structure_theme, headline_seed, lead_emotional_anchor | 07, 08, 10, 11 |

#### Field Validation Rules

```
REQUIRED: CONCEPT_APPROVED.yaml exists (Phase A human gate)
REQUIRED: concept_text is non-empty (plain language, no packaging)
REQUIRED: naming_variants[].length >= 5
REQUIRED: anchoring_score >= 6.5 (5.0-6.4 = flagged, <5.0 = rejected)
REQUIRED: schema_distance between 4-8 (<4 reject, >8 flag)
REQUIRED: fssit_alignment >= 7.0
REQUIRED: arena_selection_verified: true
```

---

### HANDOFF 7: offer-package.json

**Producer:** Skill 07 (Offer)
**Consumers:** Skills 08, 09, 16
**Minimum Size:** 3KB
**Path:** `[project]/07-offer/offer-package.json`

#### Required Sections

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Core Offer | offer_statement, value_equation (4 components required) | All |
| 2 | Value Equation | dream_outcome, perceived_likelihood, time_delay, effort_sacrifice | 16, 09 |
| 3 | Enhancement Stack | bonuses[], guarantees[], urgency_elements[] | 16, 09 |
| 4 | Price Architecture | price_point, price_anchoring, payment_options | 16 |
| 5 | Validation | value_equation_complete (4/4), stack_completeness | All |
| 6 | Downstream Handoff | structure_offer_position, upsell_compatibility_notes | 08, U0 |

#### Field Validation Rules

```
REQUIRED: value_equation has all 4 components (dream_outcome, perceived_likelihood, time_delay, effort_sacrifice)
REQUIRED: offer_statement is non-empty
REQUIRED: price_point is specified
REQUIRED: guarantees[].length >= 1
REQUIRED: arena_selection_verified: true
```

---

### HANDOFF 8: structure-package.json

**Producer:** Skill 08 (Structure)
**Consumers:** Skills 09, 10-18, 19
**Minimum Size:** 3KB
**Path:** `[project]/08-structure/structure-package.json`

#### Required Sections

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Section Sequence | sections[] (id, name, purpose, target_word_count, proof_insertion_points) | 19, all narrative skills |
| 2 | CPB Chunks | cpb_chunks[] (>=5), coherence_score (>=7.0) | 09, 19 |
| 3 | Threading Guide | mechanism_name_frequency, root_cause_anchor_points, key_phrase_schedule | 19 |
| 4 | Gap Mapping | gaps[] (between_sections, segue_strategy) | 19 |
| 5 | Word Count Blueprint | total_target_words, per_section_targets, proportion_percentages | 19 |
| 6 | Proof Density | proof_insertion_points[] (section, type, density_target) | 18, 19 |

#### Field Validation Rules

```
REQUIRED: sections[].length >= 5
REQUIRED: cpb_chunks[].length >= 5
REQUIRED: coherence_score >= 7.0
REQUIRED: Each section has: target_word_count, purpose (non-empty)
REQUIRED: total_target_words is specified
REQUIRED: threading_guide.mechanism_name_frequency is specified
REQUIRED: arena_selection_verified: true
```

---

### HANDOFF 9: campaign-brief.json

**Producer:** Skill 09 (Campaign Brief)
**Consumers:** Skills 10-20, E0, U0, LP-00
**Minimum Size:** 4KB
**Path:** `[project]/09-campaign-brief/campaign-brief.json`

#### Required Sections

| # | Section | Required Fields | Consumer Skills |
|---|---------|----------------|-----------------|
| 1 | Upstream Package References | all_8_packages_verified (boolean), package_paths[] | 19 (verification) |
| 2 | Coherence Scores | 10 dimension scores, overall_coherence_score (>=7.0) | All |
| 3 | Voice Direction | voice_register, tone, pacing_rhythm, anti_voice | All narrative skills |
| 4 | Transition Style | transition_patterns, segue_vocabulary, rhythm_notes | 11-18, 19 |
| 5 | Threading Warnings | weak_threads[], reinforcement_recommendations | 19 |
| 6 | Key Phrases | mechanism_name, root_cause_anchor, big_idea_name, promise_phrase | All |
| 7 | Audience Calibration | awareness_stage, sophistication_level, emotional_temperature | 10, 11 |
| 8 | Validation | state (PASS/HUMAN_REVIEW/FAIL), approval_timestamp | All |

#### 10 Coherence Dimensions (All Required)

| # | Dimension | Measures | Minimum |
|---|-----------|----------|---------|
| 1 | RC→Mechanism | Root cause flows logically to mechanism | 7.0 |
| 2 | Mechanism→Promise | Mechanism justifies promise | 7.0 |
| 3 | Promise→Proof | Proof supports promise claims | 7.0 |
| 4 | BigIdea→Mechanism | Big idea aligns with mechanism | 7.0 |
| 5 | BigIdea→RootCause | Big idea reframes root cause | 6.5 |
| 6 | Villain→RootCause | Villain connects to root cause | 6.5 |
| 7 | Offer→Promise | Offer delivers on promise | 7.0 |
| 8 | Structure→BigIdea | Structure serves big idea | 6.5 |
| 9 | Avatar→RootCause | Audience matches root cause | 6.5 |
| 10 | CompLandscape→BigIdea | Big idea differentiated from competitors | 7.0 |

#### Field Validation Rules

```
REQUIRED: all_8_packages_verified = true (Skills 01-08 all consumed)
REQUIRED: overall_coherence_score >= 7.0
REQUIRED: All 10 coherence dimensions scored
REQUIRED: voice_register is non-empty
REQUIRED: mechanism_name matches Skill 04 output exactly
REQUIRED: root_cause_anchor matches Skill 03 output exactly
REQUIRED: big_idea_name matches Skill 06 output exactly
REQUIRED: state = "PASS" (HUMAN_REVIEW is blocking)
```

---

## LONG-FORM PIPELINE HANDOFFS (Skills 10→20)

### HANDOFF 10: headlines-package.json

**Producer:** Skill 10 (Headlines)
**Consumers:** Skills 11, 19
**Minimum Size:** 2KB
**Path:** `[project]/10-headlines/headlines-package.json`

#### Required Fields

```yaml
required:
  selected_headline: string          # Arena-selected winning headline (non-empty)
  headline_variants: array           # All Arena candidates (>=90 total generated)
  emotional_anchor: string           # Primary emotional hook of selected headline
  arena_audience_evaluation_winner: string  # Persona that won after audience evaluation
  arena_selection_verified: true     # BLOCKING — must be Arena output
  quality_score: number              # >= 8.5
```

---

### HANDOFF 11: lead-package.json

**Producer:** Skill 11 (Lead)
**Consumers:** Skills 12, 19
**Minimum Size:** 3KB
**Path:** `[project]/11-lead/lead-package.json`

#### Required Fields

```yaml
required:
  lead_draft: string                 # 350-800 words (Arena-selected)
  four_e5_elements:
    new_different: string            # Non-empty
    simple_easy: string              # Non-empty
    works_quickly: string            # Non-empty
    predictable_reliable: string     # Non-empty
  arena_winner: object               # {persona, round, score}
  quality_score: number              # >= 8.5
  arena_selection_verified: true     # BLOCKING
  human_selection_timestamp: string  # Gate 2.5 approval

validation:
  word_count: "350-800 (fail if outside range)"
  four_e5_complete: "All 4 elements present and non-empty"
```

---

### HANDOFFS 12-18: Narrative Skill Packages

All narrative skills (12-18) follow the same schema pattern:

| Handoff | Producer | File | Min Size |
|---------|----------|------|----------|
| 12 | Story | `story-package.json` | 3KB |
| 13 | Root Cause Narrative | `root-cause-narrative-package.json` | 3KB |
| 14 | Mechanism Narrative | `mechanism-narrative-package.json` | 3KB |
| 15 | Product Introduction | `product-introduction-package.json` | 3KB |
| 16 | Offer Copy | `offer-copy-package.json` | 3KB |
| 17 | Close | `close-package.json` | 3KB |
| 18 | Proof Weaving | `proof-weaving-package.json` | 3KB |

#### Common Required Fields (All Narrative Packages)

```yaml
required:
  draft: string                      # Full section draft (Arena-selected, non-empty)
  arena_winner: object               # {persona, round, score}
  quality_score: number              # >= 8.5
  arena_selection_verified: true     # BLOCKING — prevents pre-Arena draft consumption
  human_selection_timestamp: string  # Gate 2.5 approval timestamp
  threading_verification:
    mechanism_name_present: boolean  # true
    root_cause_anchor_present: boolean  # true
    key_phrases_preserved: boolean   # true
  word_count: number                 # Within structure-package target range

  # Layer 2 Prose Quality Verification (added by Upgrade 1.5)
  prose_quality_verified: boolean     # true if Layer 2 scoped verification PASS
  voice_consistency_with_upstream: string  # "PASS" or "FLAG:[description]"
  root_angle_drift_check: string     # "PASS" or "FLAG:[description]"
```

**Prose Quality Fields:** These fields are populated by the Layer 2 scoped verification step (see `PROSE-QUALITY-VERIFICATION.md`). For Quick tier tasks where Layer 2 is skipped, set `prose_quality_verified: false` and leave the other fields as `"NOT_CHECKED"`.

#### Skill-Specific Additional Fields

**Skill 13 (Root Cause Narrative):**
```yaml
additional_required:
  three_part_narrative:              # Maps to Skill 03 three_part structure
    what_they_think_section: boolean # Present in narrative
    what_real_section: boolean       # Present in narrative
    why_nothing_worked_section: boolean # Present in narrative
```

**Skill 14 (Mechanism Narrative):**
```yaml
additional_required:
  mechanism_name_occurrences: number # >= 3 (mechanism must be named repeatedly)
  credibility_elements: array        # Proof blocks woven into mechanism explanation
```

**Skill 16 (Offer Copy):**
```yaml
additional_required:
  value_equation_coverage:           # All 4 components from Skill 07 addressed
    dream_outcome: boolean
    perceived_likelihood: boolean
    time_delay: boolean
    effort_sacrifice: boolean
  enhancement_stack_included: boolean # Bonuses/guarantees from Skill 07
```

**Skill 17 (Close):**
```yaml
additional_required:
  cta_elements: array                # Call-to-action components (non-empty)
  urgency_elements: array            # From Skill 07 offer
  open_loop_resolutions: array       # All planted open loops resolved
```

**Skill 18 (Proof Weaving):**
```yaml
additional_required:
  proof_blocks_placed: array         # {proof_id, section_target, placement_verified}
  proof_density_per_section: object  # Matches structure-package density targets
  assembly_instructions: object      # How proof blocks integrate with narrative sections
```

---

### HANDOFF 19: Campaign Assembly Package

**Producer:** Skill 19 (Campaign Assembly)
**Consumers:** Skill 20 (Editorial)
**Minimum Size:** 8KB (package) + 8-18KB (assembled draft)
**Path:** `[project]/19-campaign-assembly/`

#### Output Files (3 Required)

| File | Purpose | Min Size |
|------|---------|----------|
| `campaign-assembly-package.json` | Metadata, audits, scores | 8KB |
| `assembled-draft.md` | Complete assembled campaign copy | 8KB |
| `CAMPAIGN-ASSEMBLY-SUMMARY.md` | Executive summary of assembly | 2KB |

#### campaign-assembly-package.json Required Fields

```yaml
required:
  assembly_metadata:
    timestamp: string
    versions: object                  # Version of each upstream package consumed
    gates_verified: array             # List of all upstream GATE_2.5 checkpoints verified

  section_manifest:                   # Per-section accounting
    - section_id: string
      source_package: string          # Which skill produced this section
      arena_selection_verified: true  # CRITICAL — must be Arena output for each section
      word_count: number
      percentage_of_total: number
      proof_blocks_inserted: number
      modifications: string           # Only transitions, no body copy changes

  threading_audit:
    mechanism_name_occurrences: number    # Count across full draft
    root_cause_anchor_occurrences: number # Count across full draft
    key_phrase_consistency: boolean

  callback_audit:
    open_loops_planted: number
    open_loops_resolved: number
    orphaned_loops: array              # Must be empty

  transition_audit:
    transitions_written: number
    smoothness_scores: array           # Per-transition score

  drift_report:
    structure_compliance_pct: number   # >= 85% (i.e., drift < 15%)
    word_count_variance_pct: number
    section_proportion_variances: object

  quality_scores:
    overall: number                    # >= 7.0
    threading: number
    flow: number
    consistency: number
```

#### Field Validation Rules

```
REQUIRED: ALL section_manifest entries have arena_selection_verified: true
REQUIRED: orphaned_loops is empty array
REQUIRED: structure_compliance_pct >= 85
REQUIRED: overall quality_score >= 7.0
REQUIRED: mechanism_name_occurrences >= sections.length (at least once per section)
CRITICAL: Each section's source_package must reference an Arena-selected draft, NOT a pre-Arena draft
```

---

### HANDOFF 20: Editorial Output

**Producer:** Skill 20 (Editorial)
**Consumer:** Final delivery (human review)
**Minimum Size:** 8KB
**Path:** `[project]/20-editorial/`

#### Output Files

| File | Purpose | Min Size |
|------|---------|----------|
| `final-draft.md` | Production-ready campaign copy | 8KB |
| `editorial-package.json` | Issue log, severity breakdown, before/after | 5KB |
| `EDITORIAL-SUMMARY.md` | Executive summary of editorial changes | 2KB |

#### editorial-package.json Required Fields

```yaml
required:
  issue_clusters: array               # Grouped issues with P1-P4 severity
  total_issues_found: number
  total_issues_resolved: number
  severity_breakdown:
    P1_critical: number               # Must be 0 in final output
    P2_major: number                   # Must be 0 in final output
    P3_minor: number
    P4_polish: number
  quality_progression:
    pre_editorial_score: number
    post_editorial_score: number        # >= 8.5
    improvement_delta: number
  arena_mode: "editorial_revision"
  voice_preservation_score: number      # >= 7.0
  threading_preservation_score: number  # >= 7.0
```

---

## CROSS-ENGINE HANDOFFS

### CROSS-ENGINE 1: Campaign Brief → Email Engine

**Producer:** Skill 09 (Campaign Brief)
**Consumer:** E0 (Email Strategist)
**File:** `campaign-brief.json` (same as Handoff 9)
**Additional E0-specific requirements:** E0 extracts voice_direction, key_phrases, audience_calibration

---

### CROSS-ENGINE 2: Campaign Brief → Upsell Engine

**Producer:** Skill 09 (Campaign Brief)
**Consumer:** U0 (Upsell Strategist)
**File:** `campaign-brief.json` (same as Handoff 9)
**Additional U0-specific requirements:** U0 extracts offer-package reference for congruence scoring

---

### CROSS-ENGINE 3: Campaign Brief → Landing Page Engine

**Producer:** Skill 09 (Campaign Brief)
**Consumer:** LP-00 (Brief Classifier, Downstream Mode)
**File:** `campaign-brief.json` (same as Handoff 9)
**Additional LP-00 requirements:** LP-00 consumes full package in Downstream Mode

---

### CROSS-ENGINE 4: Upsell Assembler → Email Engine

**Producer:** U4 (Upsell Sequence Assembler)
**Consumer:** E0 (Email Strategist)
**File:** `e0-handoff.yaml`
**Path:** `[project]/U4-upsell-assembler/e0-handoff.yaml`

#### Required Fields

```yaml
required:
  funnel_summary:
    fe_product: string
    upsell_sequence: array             # {position, product, price, type}
    narrative_thread: string           # Congruence thread across sequence
  email_triggers:
    purchase_confirmation: boolean
    upsell_followup: boolean
    downsell_recovery: boolean
  voice_direction: string              # From campaign-brief
  congruence_score: number             # >= 7.0 (from U4 validation)
```

---

### CROSS-ENGINE 5: Campaign Brief → PDP Pipeline

**Producer:** Skill 09 (Campaign Brief)
**Consumer:** PDP-01 (PDP Strategist, Downstream Mode)
**File:** `campaign-brief.json` (same as Handoff 9)
**Additional PDP-01 requirements:** PDP-01 extracts product details, mechanism, feature seeds, audience, voice

---

### CROSS-ENGINE 6: Campaign Brief → Advertorial Engine

**Producer:** Skill 09 (Campaign Brief)
**Consumer:** ADV-00 (Advertorial Strategist)
**File:** `campaign-brief.json` (same as Handoff 9)
**Additional ADV-00 requirements:** ADV-00 extracts mechanism, story elements, proof inventory, audience targeting

---

### CROSS-ENGINE 7: Campaign Brief → Checkout Engine

**Producer:** Skill 09 (Campaign Brief) + Skill 07 (Offer Package)
**Consumer:** CK-00 (Checkout Strategist)
**Files:** `campaign-brief.json` (Handoff 9) + `offer-package.json` (Handoff 7)
**Additional CK-00 requirements:** CK-00 extracts offer architecture, pricing, guarantee, payment options

---

### CROSS-ENGINE 8: PDP Assembly → LP Pipeline (Internal to 04-page-builder)

**Producer:** LP-15 (Page Assembly, PDP path)
**Consumer:** LP-00 (Brief Classifier) — when LP pipeline runs after PDP
**File:** `pdp-copy-assembled.md`
**Path:** `[project]/pdp/pdp-copy-assembled.md`
**Note:** This is now an internal handoff within 04-page-builder. PDP and LP pipelines share the same engine but can run independently.

---

### CROSS-ENGINE 9: Checkout Strategist → Upsell Engine

**Producer:** CK-00 (Checkout Strategist)
**Consumer:** U1 (Order Bump Writer)
**File:** `checkout-strategy.yaml`
**Path:** `[project]/checkout/checkout-strategy.yaml`
**Additional U1 requirements:** U1 receives checkout flow context, order bump placement spec

---

## CROSS-REFERENCE MAP

### What Each Skill Consumes

| Skill | Upstream Packages Required |
|-------|--------------------------|
| 02 | 01 |
| 03 | 01, 02, SOUL.md |
| 04 | 01, 02, 03, SOUL.md |
| 05 | 01, 02, 03, 04 |
| 06 | 01, 02, 03, 04, 05, SOUL.md, RSF (if available) |
| 07 | 01, 02, 06 |
| 08 | 01, 02, 06, 07 |
| 09 | 01, 02, 03, 04, 05, 06, 07, 08 (ALL 8) |
| 10 | 09 |
| 11 | 02, 03, 04, 05, 08, 09, 10 |
| 12 | 09, 11 |
| 13 | 03, 09, 12 |
| 14 | 04, 09, 13 |
| 15 | 06, 09, 14 |
| 16 | 07, 09, 15 |
| 17 | 09, 16 |
| 18 | 02, 08, 09 |
| 19 | 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18 (ALL narrative outputs) |
| 20 | 19 |

### What Each Skill Produces (Downstream Consumers)

| Skill | Output Package | Consumed By |
|-------|---------------|-------------|
| 01 | FINAL_HANDOFF.md | 02, 03, 04, 05, 06, 07, 08, 09 |
| 02 | proof-inventory-package.yaml | 05, 09, 11, 18 |
| 03 | root-cause-package.yaml | 04, 05, 06, 09, 13 |
| 04 | mechanism-package.json | 05, 06, 09, 14 |
| 05 | promise-output.json | 06, 09 |
| 06 | big-idea-output.json | 07, 08, 09, 10, 11 |
| 07 | offer-package.json | 08, 09, 16, U0 |
| 08 | structure-package.json | 09, 10-18, 19 |
| 09 | campaign-brief.json | 10-20, E0, U0, LP-00 |
| 10 | headlines-package.json | 11, 19 |
| 11 | lead-package.json | 12, 19 |
| 12-18 | [skill]-package.json | 19 (+ next sequential skill) |
| 19 | assembled-draft.md + package.json | 20 |
| 20 | final-draft.md | Final output |

---

## ARENA SELECTION VERIFICATION (CRITICAL)

**This field prevents the Skill 19 failure pattern.**

Every handoff from an Arena skill (03-08, 10-18) MUST include:

```yaml
arena_selection_verified: true
human_selection_timestamp: "[ISO 8601]"
arena_audience_evaluation_source: "[persona name or hybrid ID]"
```

**Validation rule for Skill 19 (Campaign Assembly):**

```
FOR EACH section in assembled draft:
  1. READ the source package
  2. CHECK: arena_selection_verified == true
  3. CHECK: human_selection_timestamp is non-empty
  4. IF either check fails:
     ┌────────────────────────────────────────────────────────────────────┐
     │  STRUCTURAL BLOCK: PRE-ARENA DRAFT DETECTED                       │
     │                                                                    │
     │  Section [X] source package does NOT have arena verification.     │
     │  This may be a pre-Arena draft, not the Arena-selected output.    │
     │                                                                    │
     │  This EXACT failure happened in the RSF promo (2026-02):          │
     │  Skill 19 consumed section-2B-draft.md instead of Arena Hybrid A, │
     │  and the entire lead was missing from the assembled promotion.    │
     │                                                                    │
     │  ACTION: Verify the correct Arena-selected file is being loaded.  │
     └────────────────────────────────────────────────────────────────────┘
     HALT — DO NOT ASSEMBLE WITH UNVERIFIED DRAFT
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-01 | Initial creation — 20 main pipeline handoffs + 4 cross-engine handoffs + Arena verification protocol. Derived from Nate Jones specification engineering analysis (decomposition primitive). |
| 1.1 | 2026-03-01 | Corrected 5 file name mismatches to match AGENT.md ground truth (mechanism .yaml→.json, promise-package→promise-output, offer .yaml→.json, structure .yaml→.json, campaign-brief-package→campaign-brief). Added registry references to Skills 06, 09, 19 AGENT.md files. |

---

*This registry follows the pattern established by `ad-engine-schema-registry.md` (v1.1). For Ad Engine handoffs, see that file. For Upsell Engine handoffs, see `05-upsells/UPSELL-ENGINE.md`. For Landing Page Engine handoffs, see `04-page-builder/LANDING-PAGE-ENGINE.md`.*
