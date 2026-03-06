# A01-AD-INTELLIGENCE-ANTI-DEGRADATION.md

**Version:** 1.1
**Created:** 2026-02-22
**Updated:** 2026-02-27 (v1.1 — Tool-Assisted mode failure modes)
**Purpose:** STRUCTURAL enforcement to prevent ad intelligence skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI scrapes fewer than 500 ads and calls it "representative sample"
- AI skips platforms with rationalization "this platform isn't relevant"
- AI classifies fewer than 100% of ads and invents "unclassified" bucket
- AI extracts winning specimens without verbatim copy transcription
- AI skips Continuous Monitor mode when rerunning A01 for active campaigns
- AI assembles AD-INTELLIGENCE-HANDOFF.md in single write (fails due to 30KB output limit)
- AI proceeds to Layer 2 classification with fewer than 500 ads scraped
- AI proceeds to Layer 3 synthesis with incomplete classification
- AI produces handoff file under 100KB minimum (summary instead of intelligence)
- AI invents gate statuses like "PARTIAL_PASS" when scraping targets not met
- AI uses MCP tools without trying fallbacks when tools fail
- AI imports Meta Ad Spy JSON without validating schema (missing required fields)
- AI treats impression data as absolute truth without per-brand normalization
- AI drops graceful degradation — fails when impression data is absent instead of falling back
- AI mixes Tool-Assisted brands with manually-scraped brands without flagging source
- AI assigns dual-signal tiers without computing normalized performance_score first

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/A01-ad-intelligence/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/A01-ad-intelligence/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/A01-ad-intelligence/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/A01-ad-intelligence/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_0_COMPLETE.yaml
gate: GATE_0
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  vertical_profile_loaded: true
  campaign_brief_loaded: true
  mcp_firecrawl_available: true
  mcp_apify_available: true
  competitor_list_count: "[integer >= 10]"
  all_inputs_validated: true

microskill_outputs:
  - id: "0.0.1"
    file: "layer-0-outputs/0.0.1-vertical-profile-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.1"
    file: "layer-0-outputs/0.1-campaign-brief-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.2"
    file: "layer-0-outputs/0.2-mcp-tool-validator.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.3"
    file: "layer-0-outputs/0.3-competitor-list-builder.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.4"
    file: "layer-0-outputs/0.4-input-validator.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.5"
    file: "layer-0-outputs/0.5-json-import-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
    executed: "[true if Tool-Assisted mode / false otherwise]"
  - id: "0.6"
    file: "layer-0-outputs/0.6-brand-database-matcher.md"
    size_bytes: "[integer]"
    minimum_met: true
    executed: "[true if Tool-Assisted mode / false otherwise]"

IF competitor_list_count < 10: GATE CLOSED — expand competitor discovery
IF any mcp tool unavailable: GATE CLOSED — resolve MCP configuration
IF campaign_brief missing: GATE CLOSED — execute Skill 09 first
```

```yaml
# LAYER_1_COMPLETE.yaml
gate: GATE_1
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  total_ads_scraped: "[integer >= 500]"
  meta_ads: "[integer >= 200]"
  tiktok_ads: "[integer >= 150]"
  google_ads: "[integer >= 100]"
  competitor_brands_with_ads: "[integer >= 10]"
  platforms_covered: "[integer >= 2]"
  duplicates_removed: true
  all_required_fields_populated: true

expansion_rounds_completed: "[0-3]"

microskill_outputs:
  - id: "1.1"
    file: "layer-1-outputs/1.1-meta-ad-library-scraper.md"
    size_bytes: "[integer]"
    minimum_met: true
    ads_extracted: "[integer]"
  - id: "1.2"
    file: "layer-1-outputs/1.2-tiktok-creative-center-scraper.md"
    size_bytes: "[integer]"
    minimum_met: true
    ads_extracted: "[integer]"
  - id: "1.3"
    file: "layer-1-outputs/1.3-google-ads-transparency-scraper.md"
    size_bytes: "[integer]"
    minimum_met: true
    ads_extracted: "[integer]"
  - id: "1.4"
    file: "layer-1-outputs/1.4-additional-platform-scanner.md"
    size_bytes: "[integer]"
    minimum_met: true
    ads_extracted: "[integer]"
    executed: "[true/false]"
  - id: "1.5"
    file: "layer-1-outputs/1.5-raw-data-validator.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.6"
    file: "layer-1-outputs/1.6-meta-ad-spy-ingester.md"
    size_bytes: "[integer]"
    minimum_met: true
    executed: "[true if Tool-Assisted mode / false otherwise]"
    ads_ingested: "[integer]"

IF total_ads_scraped < 500: GATE CLOSED — continue scraping
IF competitor_brands_with_ads < 10: GATE CLOSED — expand competitor list
IF platforms_covered < 2: GATE CLOSED — add platform
```

```yaml
# LAYER_2_COMPLETE.yaml
gate: GATE_2
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  hook_type_classification_pct: 100
  format_classification_pct: 100
  visual_style_classification_pct: 100
  copy_patterns_extracted: true
  run_duration_estimated_pct: 100
  top_50_verbatim_copy_extracted: true
  all_dimensions_complete: true
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "2.1"
    file: "layer-2-outputs/2.1-hook-type-classifier.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      ads_classified: "[integer — must equal total scraped]"
      hook_types_found: "[integer]"
  - id: "2.2"
    file: "layer-2-outputs/2.2-format-analyzer.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.3"
    file: "layer-2-outputs/2.3-visual-style-analyzer.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.4"
    file: "layer-2-outputs/2.4-copy-pattern-extractor.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      verbatim_copies_extracted: "[integer >= 50]"
  - id: "2.5"
    file: "layer-2-outputs/2.5-run-duration-estimator.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      tier_winner_count: "[integer]"
      tier_performer_count: "[integer]"
  - id: "2.6"
    file: "layer-2-outputs/2.6-layer-2-validator.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.7"
    file: "layer-2-outputs/2.7-impression-scorer.md"
    size_bytes: "[integer]"
    minimum_met: true
    executed: "[true if impression data available / false otherwise]"
    key_metrics:
      brands_with_impressions: "[integer]"
      dual_signal_tiers_assigned: "[integer]"

IF any classification_pct < 100: GATE CLOSED — classify remaining ads
IF top_50_verbatim_copy_extracted = false: GATE CLOSED — extract copy
IF validator_verdict != PASS: GATE CLOSED — address validation failures
```

```yaml
# LAYER_3_COMPLETE.yaml
gate: GATE_3
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  competitive_landscape_brands: "[integer >= 10]"
  hook_distribution_types_covered: 32
  format_platform_analysis_complete: true
  winning_specimens_extracted: "[integer >= 20]"
  winning_specimens_have_verbatim_copy: true
  opportunity_gaps_identified: "[integer >= 5]"
  opportunity_gaps_ranked: true
  trend_detection_executed: "[true if Continuous Monitor / N/A if Initial Scan]"
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "3.1"
    file: "layer-3-outputs/3.1-competitive-landscape-map.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.2"
    file: "layer-3-outputs/3.2-hook-type-distribution.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.3"
    file: "layer-3-outputs/3.3-format-platform-intelligence.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.4"
    file: "layer-3-outputs/3.4-winning-ad-specimens.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      specimens_extracted: "[integer >= 20]"
      all_have_verbatim_copy: true
  - id: "3.5"
    file: "layer-3-outputs/3.5-opportunity-gap-analysis.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      gaps_identified: "[integer >= 5]"
  - id: "3.6"
    file: "layer-3-outputs/3.6-trend-detection.md"
    size_bytes: "[integer]"
    minimum_met: "[true / N/A]"
    executed: "[true if Continuous Monitor / false if Initial Scan]"
  - id: "3.7"
    file: "layer-3-outputs/3.7-layer-3-validator.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.8"
    file: "layer-3-outputs/3.8-impression-weighted-analysis.md"
    size_bytes: "[integer]"
    minimum_met: true
    executed: "[true if impression data available / false otherwise]"

IF winning_specimens_extracted < 20: GATE CLOSED — extract more specimens
IF winning_specimens_have_verbatim_copy = false: GATE CLOSED — transcribe copy
IF opportunity_gaps_identified < 5: GATE CLOSED — deepen analysis
IF validator_verdict != PASS: GATE CLOSED — address validation failures
```

```yaml
# LAYER_4_COMPLETE.yaml
gate: GATE_4
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  handoff_file_exists: true
  handoff_file_path: "AD-INTELLIGENCE-HANDOFF.md"
  handoff_file_size_kb: "[integer >= 100]"
  all_10_sections_populated: true
  execution_log_exists: true
  all_checkpoint_files_exist: true

post_assembly_size_validation:
  file_size_kb: "[integer]"
  minimum_required_kb: 100
  status: "[PASS if >= 100KB / FAIL if < 100KB]"

microskill_outputs:
  - id: "4.1"
    file: "layer-4-outputs/4.1-handoff-assembler.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "4.2"
    file: "layer-4-outputs/4.2-execution-log.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "4.3"
    file: "layer-4-outputs/4.3-checkpoint-files.md"
    size_bytes: "[integer]"
    minimum_met: true

IF handoff_file_size_kb < 100: GATE CLOSED — re-assemble with chunked protocol
IF any section missing or empty: GATE CLOSED — complete missing sections
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Total ads scraped** | 500 | HALT -- Continue scraping across platforms |
| **Meta ads** | 200 | HALT -- Continue Meta Ad Library scraping |
| **TikTok ads** | 150 | HALT -- Continue TikTok Creative Center scraping |
| **Google ads** | 100 | HALT -- Continue Google Ads Transparency scraping |
| **Competitor brands** | 10 | HALT -- Expand competitor discovery |
| **Platforms covered** | 2 | HALT -- Add required platform |
| **Hook type classification** | 100% of ads | HALT -- Classify remaining ads |
| **Format classification** | 100% of ads | HALT -- Classify remaining ads |
| **Visual style classification** | 100% of ads | HALT -- Classify remaining ads |
| **Run duration estimation** | 100% of ads | HALT -- Estimate remaining ads |
| **Verbatim copy specimens** | 20 (top winning ads) | HALT -- Extract more specimens |
| **Opportunity gaps identified** | 5 minimum | HALT -- Deepen analysis |
| **Hook distribution coverage** | All 32 types | HALT -- Cover all taxonomy types |
| **AD-INTELLIGENCE-HANDOFF.md size** | 100KB | HALT -- Re-assemble with chunked protocol |

### Scraping Volume Check (Mandatory After Every Session)

**AFTER EVERY SCRAPING SESSION, produce this table:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AD VOLUME CHECK - [timestamp]                                              │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ METRIC              │ REQUIRED │ ACTUAL │ STATUS     │ DEFICIT          │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │ TOTAL ADS           │ 500      │ [X]    │ PASS/FAIL  │ [500-X if fail]  │ │
│  │ Meta Ads            │ 200      │ [X]    │ PASS/FAIL  │ [deficit]        │ │
│  │ TikTok Ads          │ 150      │ [X]    │ PASS/FAIL  │ [deficit]        │ │
│  │ Google Ads          │ 100      │ [X]    │ PASS/FAIL  │ [deficit]        │ │
│  │ Other Platform Ads  │ 50*      │ [X]    │ PASS/FAIL  │ [deficit]        │ │
│  │ Competitor Brands   │ 10       │ [X]    │ PASS/FAIL  │ [deficit]        │ │
│  │ Platforms Covered   │ 2        │ [X]    │ PASS/FAIL  │ [deficit]        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  * Other Platform Ads required ONLY if vertical profile includes them.      │
│  OVERALL: [PASS - proceed] or [FAIL - expand before proceeding]            │
└─────────────────────────────────────────────────────────────────────────────┘
```

**IF OVERALL = FAIL:** You MUST expand (return to scraping) before attempting Layer 2.

### Classification Completeness Check (Mandatory After Layer 2)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CLASSIFICATION COMPLETENESS CHECK - [timestamp]                            │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ DIMENSION         │ TOTAL ADS │ CLASSIFIED │ % COMPLETE │ STATUS      │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │ Hook Type         │ [X]       │ [X]        │ [X]%       │ PASS/FAIL   │ │
│  │ Format            │ [X]       │ [X]        │ [X]%       │ PASS/FAIL   │ │
│  │ Visual Style      │ [X]       │ [X]        │ [X]%       │ PASS/FAIL   │ │
│  │ Copy Patterns     │ [X]       │ [X]        │ [X]%       │ PASS/FAIL   │ │
│  │ Run Duration      │ [X]       │ [X]        │ [X]%       │ PASS/FAIL   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  REQUIRED: 100% on ALL dimensions. Any row < 100% = FAIL.                  │
│  OVERALL: [PASS - proceed] or [FAIL - classify remaining]                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "representative sample of competitor ads" | ALL competitors on the list must be scanned. Sampling is forbidden. | HALT -- scan remaining competitors |
| "the top ads are sufficient" | Classification must cover 100% of scraped ads, not just "top" ones. | HALT -- classify ALL ads |
| "this platform isn't relevant" | Minimum 2 platforms is mandatory. Platform relevance was determined at Layer 0 by vertical profile. | HALT -- scrape the required platforms |
| "500 is approximately 500" / "close enough to 500" | Numbers are exact. 499 is not 500. | HALT -- scrape until threshold met |
| "quality over quantity" | BOTH required. Quality assessment happens AFTER quantity threshold met. | HALT -- meet quantity first |
| "we have enough for analysis" | "Enough" is defined by exact thresholds, not subjective assessment. | HALT -- meet thresholds |
| "the market doesn't have that many ads" | This requires verification through 3 expansion rounds before escalation. | HALT -- run expansion rounds |
| "I can infer the patterns from a subset" | Inference from subset is sampling. 100% classification is required. | HALT -- classify all |
| "partial pass" / "conditional pass" | Does not exist. Gates are PASS or FAIL only. | HALT -- gates are binary |
| "these 300 ads are highly representative" | 300 is not 500. Numbers are exact. | HALT -- continue scraping |
| "Continuous Monitor isn't needed for first run" | Mode is determined by project state, not subjective judgment. | HALT -- verify mode selection logic |
| "handoff file is 50KB but comprehensive" | 100KB is the FLOOR, not a suggestion. 20 verbatim specimens alone should be 30-50KB. | HALT -- re-assemble with chunked protocol |
| "I'll summarize the specimens to save space" | Specimens must be VERBATIM. Summaries are not specimens. | HALT -- extract verbatim copy |
| "MCP tool failed so I skipped this platform" | Tool failure requires fallbacks. Only after ALL fallbacks can you escalate. | HALT -- try fallback tools |
| "opportunity gaps are obvious from the data" | Must identify 5+ specific, actionable gaps with evidence. | HALT -- complete gap analysis |
| "impression data validates this ad" | Impressions indicate spend, not effectiveness. Dual-signal scoring normalizes within brand. | HALT -- use normalized performance_score, not raw impressions |
| "we don't need manual scraping for this brand" | Tool-Assisted mode supplements, never replaces. Manual scraping covers platforms/angles the tool misses. | HALT -- verify coverage before skipping manual scraping |
| "impression data is unavailable so analysis is limited" | All impression inputs are OPTIONAL. Count-based analysis is fully valid. No degradation of output quality. | HALT -- proceed with count-based analysis at full quality |

---

## STRUCTURAL FIX 4: A01-SPECIFIC MC-CHECK

```yaml
A01-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

  mode_verification:
    mode: "[INITIAL_SCAN | CONTINUOUS_MONITOR | TOOL_ASSISTED_SCAN]"
    previous_handoff_exists: [Y/N]
    previous_handoff_date: "[date or N/A]"
    mode_selection_correct: [Y/N]
    if_no: "STOP -- Verify mode selection logic"

  scraping_volume_check:
    total_ads_scraped: [number]
    meta_ads: [number]
    tiktok_ads: [number]
    google_ads: [number]
    other_platform_ads: [number]
    competitor_brands_with_ads: [number]
    platforms_covered: [number]
    all_minimums_met: [Y/N]
    if_no: "STOP -- Continue scraping until all thresholds met"

  classification_completeness_check:
    hook_type_pct: [number]
    format_pct: [number]
    visual_style_pct: [number]
    copy_patterns_pct: [number]
    run_duration_pct: [number]
    all_100_pct: [Y/N]
    if_no: "STOP -- Classification must be 100% on all dimensions"

  specimen_extraction_check:
    winning_specimens_extracted: [number]
    all_have_verbatim_copy: [Y/N]
    minimum_20_met: [Y/N]
    if_no: "STOP -- Extract minimum 20 specimens with verbatim copy"

  synthesis_quality_check:
    opportunity_gaps_count: [number]
    gaps_actionable: [Y/N]
    competitive_landscape_brands: [number]
    hook_distribution_covers_32: [Y/N]
    if_any_no: "STOP -- Synthesis incomplete or insufficiently detailed"

  handoff_assembly_check:
    handoff_file_exists: [Y/N]
    handoff_file_size_kb: [number]
    all_10_sections_populated: [Y/N]
    chunked_assembly_used: [Y/N]
    if_any_no: "STOP -- Handoff assembly incomplete or under 100KB"

  mcp_tool_check:
    firecrawl_available: [Y/N]
    apify_available: [Y/N]
    tool_failures_encountered: [Y/N]
    fallbacks_attempted: [Y/N]
    if_failures_and_no_fallbacks: "STOP -- Must try fallback tools before claiming platform inaccessible"

  rationalization_check:
    am_i_thinking_representative_sample: [Y/N]
    am_i_thinking_close_enough: [Y/N]
    am_i_thinking_quality_over_quantity: [Y/N]
    am_i_thinking_platform_not_relevant: [Y/N]
    am_i_thinking_partial_pass: [Y/N]
    am_i_summarizing_specimens: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_SCRAPING | HALT_CLASSIFICATION | HALT_SYNTHESIS | HALT_ASSEMBLY | HALT_MCP]
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session ad intelligence projects lose continuity without persistent state files. Without PROJECT-STATE.md, which platforms were scraped and which ads were classified is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/A01-ad-intelligence/
  PROJECT-STATE.md          # Living document -- updated after every scraping/classification session
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
  layer-3-outputs/
  layer-4-outputs/
  AD-INTELLIGENCE-HANDOFF.md  # Primary deliverable (100KB+)
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "A01-ad-intelligence"
created: "[date]"
last_updated: "[date]"
current_layer: "[0/1/2/3/4]"
mode: "[INITIAL_SCAN | CONTINUOUS_MONITOR]"
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"

scraping_progress:
  total_ads: [number]
  meta_ads: [number]
  tiktok_ads: [number]
  google_ads: [number]
  other_platform_ads: [number]
  competitor_brands: [number]
  platforms_covered: [number]
  last_scraping_session: "[date]"

classification_progress:
  hook_type_pct: [number]
  format_pct: [number]
  visual_style_pct: [number]
  copy_patterns_pct: [number]
  run_duration_pct: [number]
  last_classification_session: "[date]"

synthesis_progress:
  competitive_landscape_complete: [Y/N]
  hook_distribution_complete: [Y/N]
  format_platform_complete: [Y/N]
  winning_specimens_count: [number]
  opportunity_gaps_count: [number]
  trend_detection_complete: [Y/N]

gate_status:
  GATE_0: [PASS/PENDING]
  GATE_1: [PASS/FAIL/PENDING]
  GATE_2: [PASS/FAIL/PENDING]
  GATE_3: [PASS/FAIL/PENDING]
  GATE_4: [PASS/FAIL/PENDING]

expansion_rounds:
  gate_1_rounds: [0-3]
  gate_2_rounds: [0-3]
  gate_3_rounds: [0-3]

next_action: "[specific next step]"
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 6: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

### The Problem
Previous skills had models invent gate statuses like "PARTIAL_PASS" and "CONDITIONAL_PASS" -- statuses that don't exist.

### The Fix

**Gate statuses are BINARY: PASS or FAIL. Decision statuses are explicit.**

```
VALID GATE STATUSES (checkpoint files):
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

VALID DECISION STATUSES (validation layer):
  approved
  revision (return to previous layer)
  blocked (return to earlier layer)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  PROCEED_WITH_CONCERNS / WARNING
  "good enough" / "acceptable for now"
  "scraping is close enough" / "classification is approximately complete"
  "representative sample collected"

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE any output files created under the false status
  3. RETURN to the failing layer
  4. Re-evaluate with valid statuses only
```

---

## STRUCTURAL FIX 7: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing AD-INTELLIGENCE-HANDOFF.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/AD-INTELLIGENCE-HANDOFF.md (root -- from failed attempts)
     - [project]/A01-ad-intelligence/AD-INTELLIGENCE-HANDOFF.md (correct location)
     - [project]/outputs/AD-INTELLIGENCE-HANDOFF.md (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 8: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol -- BEFORE any A01 execution:**

```
SESSION STARTUP:
  1. READ this file (A01-AD-INTELLIGENCE-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ A01-AD-INTELLIGENCE-AGENT.md -- agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin ad intelligence gathering without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ./CLAUDE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.0.1-vertical-profile-loader | layer-0-outputs/0.0.1-vertical-profile-loader.md | 1KB |
| 0 | 0.1-campaign-brief-loader | layer-0-outputs/0.1-campaign-brief-loader.md | 1KB |
| 0 | 0.2-mcp-tool-validator | layer-0-outputs/0.2-mcp-tool-validator.md | 1KB |
| 0 | 0.3-competitor-list-builder | layer-0-outputs/0.3-competitor-list-builder.md | 2KB |
| 0 | 0.4-input-validator | layer-0-outputs/0.4-input-validator.md | 1KB |
| 0 | 0.5-json-import-loader | layer-0-outputs/0.5-json-import-loader.md | 2KB |
| 0 | 0.6-brand-database-matcher | layer-0-outputs/0.6-brand-database-matcher.md | 1KB |
| 1 | 1.1-meta-ad-library-scraper | layer-1-outputs/1.1-meta-ad-library-scraper.md | 5KB |
| 1 | 1.2-tiktok-creative-center-scraper | layer-1-outputs/1.2-tiktok-creative-center-scraper.md | 5KB |
| 1 | 1.3-google-ads-transparency-scraper | layer-1-outputs/1.3-google-ads-transparency-scraper.md | 5KB |
| 1 | 1.4-additional-platform-scanner | layer-1-outputs/1.4-additional-platform-scanner.md | 5KB |
| 1 | 1.5-raw-data-validator | layer-1-outputs/1.5-raw-data-validator.md | 2KB |
| 1 | 1.6-meta-ad-spy-ingester | layer-1-outputs/1.6-meta-ad-spy-ingester.md | 5KB |
| 2 | 2.1-hook-type-classifier | layer-2-outputs/2.1-hook-type-classifier.md | 5KB |
| 2 | 2.2-format-analyzer | layer-2-outputs/2.2-format-analyzer.md | 5KB |
| 2 | 2.3-visual-style-analyzer | layer-2-outputs/2.3-visual-style-analyzer.md | 5KB |
| 2 | 2.4-copy-pattern-extractor | layer-2-outputs/2.4-copy-pattern-extractor.md | 5KB |
| 2 | 2.5-run-duration-estimator | layer-2-outputs/2.5-run-duration-estimator.md | 5KB |
| 2 | 2.6-layer-2-validator | layer-2-outputs/2.6-layer-2-validator.md | 2KB |
| 2 | 2.7-impression-scorer | layer-2-outputs/2.7-impression-scorer.md | 3KB |
| 3 | 3.1-competitive-landscape-map | layer-3-outputs/3.1-competitive-landscape-map.md | 5KB |
| 3 | 3.2-hook-type-distribution | layer-3-outputs/3.2-hook-type-distribution.md | 5KB |
| 3 | 3.3-format-platform-intelligence | layer-3-outputs/3.3-format-platform-intelligence.md | 5KB |
| 3 | 3.4-winning-ad-specimens | layer-3-outputs/3.4-winning-ad-specimens.md | 30KB |
| 3 | 3.5-opportunity-gap-analysis | layer-3-outputs/3.5-opportunity-gap-analysis.md | 5KB |
| 3 | 3.6-trend-detection | layer-3-outputs/3.6-trend-detection.md | 5KB |
| 3 | 3.7-layer-3-validator | layer-3-outputs/3.7-layer-3-validator.md | 2KB |
| 3 | 3.8-impression-weighted-analysis | layer-3-outputs/3.8-impression-weighted-analysis.md | 3KB |
| 4 | 4.1-handoff-assembler | layer-4-outputs/4.1-handoff-assembler.md | 5KB |
| 4 | 4.2-execution-log | layer-4-outputs/4.2-execution-log.md | 3KB |
| 4 | 4.3-checkpoint-files | layer-4-outputs/4.3-checkpoint-files.md | 2KB |

### Layer Gate Enhancement

Each LAYER_N_COMPLETE.yaml checkpoint MUST list all microskill output files with sizes. If ANY output file is missing, the checkpoint CANNOT be created.

### Execution Log Enhancement

Each microskill entry in execution-log.md MUST include:
- Spec file read: [Y/N] with path
- Output file created: [Y/N] with path
- Output file size: [X]KB
- Schema compliance: [Y/N]

### Forbidden Behaviors

1. Executing microskills without reading their .md spec files
2. Producing summary output without per-microskill files
3. Checkpoint YAML without microskill output file listing
4. Output files below minimum size thresholds
5. Output files missing required section headers from spec

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 5, 8):
[ ] A01-AD-INTELLIGENCE-ANTI-DEGRADATION.md read (THIS FILE)
[ ] A01-AD-INTELLIGENCE-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)
[ ] Input files validated (campaign brief, vertical profile)
[ ] Mode determined (INITIAL_SCAN or CONTINUOUS_MONITOR)

LAYER 0 (FOUNDATION):
[ ] Vertical profile loaded and validated
[ ] Campaign brief loaded
[ ] Firecrawl MCP server validated (test scrape)
[ ] Apify MCP server validated (test actor call)
[ ] Competitor list built (10+ brands)
[ ] All inputs validated
[ ] LAYER_0_COMPLETE.yaml created
[ ] All 5 per-microskill output files exist

LAYER 1 (SCRAPING):
[ ] Meta Ad Library scraping complete (200+ ads)
[ ] TikTok Creative Center scraping complete (150+ ads)
[ ] Google Ads Transparency scraping complete (100+ ads)
[ ] Additional platform scraping (if vertical requires)
[ ] Total ads >= 500
[ ] Competitor brands >= 10
[ ] Platforms covered >= 2
[ ] Duplicates removed
[ ] AD VOLUME CHECK table produced
[ ] LAYER_1_COMPLETE.yaml created
[ ] All per-microskill output files exist with ads_extracted counts

LAYER 2 (CLASSIFICATION):
[ ] Hook type classification: 100% of ads
[ ] Format classification: 100% of ads
[ ] Visual style classification: 100% of ads
[ ] Copy pattern extraction complete
[ ] Run duration estimation: 100% of ads
[ ] Top 50 verbatim copy extracted
[ ] CLASSIFICATION COMPLETENESS CHECK table produced
[ ] LAYER_2_COMPLETE.yaml created
[ ] All per-microskill output files exist

LAYER 3 (SYNTHESIS):
[ ] Competitive landscape mapped (10+ brands)
[ ] Hook type distribution calculated (all 32 types)
[ ] Format/platform intelligence analyzed
[ ] Winning ad specimens extracted (20+ with verbatim copy)
[ ] Opportunity gaps identified (5+ actionable)
[ ] Opportunity gaps ranked
[ ] Trend detection executed (if Continuous Monitor mode)
[ ] LAYER_3_COMPLETE.yaml created
[ ] All per-microskill output files exist

LAYER 4 (OUTPUT PACKAGING):
[ ] AD-INTELLIGENCE-HANDOFF.md assembled using CHUNKED protocol
[ ] Handoff file size >= 100KB verified
[ ] All 10 required sections populated
[ ] Execution log complete with per-microskill entries
[ ] All checkpoint files verified
[ ] LAYER_4_COMPLETE.yaml created
[ ] All per-microskill output files exist

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with completion status
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY mode selection (Initial Scan vs Continuous Monitor)
[ ] VERIFY scraping counts from actual files (not summaries)
[ ] VERIFY classification percentages are 100%
[ ] VERIFY handoff file exists and is >= 100KB
[ ] If any threshold not met, RETURN to that layer
```

---

## KEY INSIGHT

> **"Ad intelligence without 500+ ads is market guessing. Classification without 100% coverage is sampling. Specimens without verbatim copy are summaries. A handoff under 100KB is an outline. Numbers are exact, not approximate."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation with 8 structural fixes, per-microskill output table (22 microskills), implementation checklist. Full A01 anti-degradation architecture: 500+ ad minimum, 100% classification requirement, 20+ verbatim specimens, 100KB+ handoff, chunked assembly protocol, MCP tool fallback requirements, mode selection logic, expansion round protocol, forbidden rationalizations. Two operational modes (Initial Scan + Continuous Monitor) with mode-specific requirements. |
| 1.1 | 2026-02-27 | Tool-Assisted Scan mode support. Added 5 anticipated failure patterns for Meta Ad Spy integration. Added 3 forbidden rationalizations for impression data handling. Added 5 per-microskill output rows (0.5, 0.6, 1.6, 2.7, 3.8 — total now 27). Updated all 4 layer checkpoint templates with new microskill entries (conditional on mode). Updated MC-CHECK mode_verification to include TOOL_ASSISTED_SCAN. |
