# A09 -- Assembly & Variant Matrix

**Version:** 1.0
**Created:** 2026-02-22
**Role:** Workflow Orchestrator (State Machine)
**Skill Type:** Assembly / Validation / Matrix Generation
**Pipeline Position:** 9th Ad Engine skill. Executes after A07 (Copy Production) and A08 (Visual/Video Production). Feeds A10 (Pre-Launch Scoring).
**Related Documents:**
- `./skills/ads/AD-ENGINE-CLAUDE.md` (Ad Engine master)
- `./skills/ads/A07-copy-production/A07-COPY-PRODUCTION-AGENT.md` (upstream copy variants)
- `./skills/ads/A08-visual-video-production/A08-VISUAL-VIDEO-PRODUCTION-AGENT.md` (upstream production assets)
- `./skills/ads/A03-format-strategy/A03-FORMAT-STRATEGY-AGENT.md` (platform specs and format strategy)
- `./CLAUDE.md` (CopywritingEngine master -- metacognitive, gates, anti-degradation)
**Anti-Degradation Document:** `A09-ASSEMBLY-VARIANT-MATRIX-ANTI-DEGRADATION.md` (MANDATORY -- read BEFORE execution)

---

## TABLE OF CONTENTS

- [THE 3 LAWS OF ASSEMBLY & VARIANT MATRIX (Never Scroll Past This)](#the-3-laws-of-assembly--variant-matrix-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [VARIANT NAMING CONVENTION (BINDING)](#variant-naming-convention-binding)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [MANDATORY FIRST READS](#mandatory-first-reads)
- [VARIANT MATRIX TARGETS](#variant-matrix-targets)
- [GATE ENFORCEMENT](#gate-enforcement)
- [FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)](#forbidden-rationalizations-immediate-halt)
- [Current Phase](#current-phase)
- [Input Inventory (updated at Layer 0)](#input-inventory-updated-at-layer-0)
- [Combination Progress](#combination-progress)
- [Coherence Validation Progress](#coherence-validation-progress)
- [Gate Status](#gate-status)
- [Key Decisions](#key-decisions)
- [Next Action](#next-action)
- [Timestamp](#timestamp)
- [OUTPUT SCHEMA: VARIANT-MATRIX.yaml](#output-schema-variant-matrixyaml)
- [OUTPUT SCHEMA: AD-VARIANT-MATRIX-SUMMARY.md](#output-schema-ad-variant-matrix-summarymd)
- [Metadata](#metadata)
- [Section 1: Executive Summary](#section-1-executive-summary)
- [Section 2: Variant Matrix Overview](#section-2-variant-matrix-overview)
- [Section 3: Coherence Results Summary](#section-3-coherence-results-summary)
- [Section 4: Testing Priority Recommendations](#section-4-testing-priority-recommendations)
- [Section 5: Platform Deployment Guide](#section-5-platform-deployment-guide)
- [Section 6: File Manifest Summary](#section-6-file-manifest-summary)
- [Section 7: Flagged Variants for Human Review](#section-7-flagged-variants-for-human-review)
- [GATE ARCHITECTURE -- COMPLETE REFERENCE](#gate-architecture----complete-reference)
- [COHERENCE VALIDATION RULES (DETAILED)](#coherence-validation-rules-detailed)
- [INCOMPATIBILITY FILTER RULES (DETAILED)](#incompatibility-filter-rules-detailed)
- [TESTING PRIORITY ALGORITHM](#testing-priority-algorithm)
- [ANTI-DEGRADATION ENFORCEMENT](#anti-degradation-enforcement)
- [SUBAGENT CONTEXT TEMPLATE](#subagent-context-template)
- [1. MODEL](#1-model)
- [2. PERSONA](#2-persona)
- [3. OBJECTIVE](#3-objective)
- [4. VARIANT TARGETS](#4-variant-targets)
- [5. INPUTS](#5-inputs)
- [6. CONSTRAINTS](#6-constraints)
- [7. ERROR HANDLING](#7-error-handling)
- [8. OUTPUT FORMAT](#8-output-format)
- [PER-MICROSKILL OUTPUT PROTOCOL](#per-microskill-output-protocol)
- [Execution Context](#execution-context)
- [Output](#output)
- [Quality Metrics](#quality-metrics)
- [FORBIDDEN BEHAVIORS (A09-Specific)](#forbidden-behaviors-a09-specific)
- [MC-CHECK SCHEDULE](#mc-check-schedule)
- [INTEGRATION WITH DOWNSTREAM SKILLS](#integration-with-downstream-skills)
- [VERSION HISTORY](#version-history)

---

## THE 3 LAWS OF ASSEMBLY & VARIANT MATRIX (Never Scroll Past This)

1. **Coherence is non-negotiable.** Every assembled variant must work as a complete, coherent ad unit. A hook that promises one thing paired with a body that delivers another is not a "testable variant" -- it is waste. Assembly without coherence validation produces 90 broken ads instead of 90 testable ones. The coherence gate is the entire value of this skill.
2. **Every variant must be testable.** A variant that cannot be deployed to a specific platform in a specific format with a specific file manifest is not a variant -- it is a concept. Every row in the variant matrix must map to concrete copy files, concrete asset files, a named platform, and verified format specs. Incomplete variants do not count toward the 30-variant minimum.
3. **The matrix is the product.** The Ad Engine does not produce "ads." It produces a variant matrix -- a combinatorial testing infrastructure that feeds the algorithm. A09 is the skill that transforms upstream creative work into that matrix. The matrix is not a summary document. It is the exhaustive, validated, deployable catalog of every testable combination.

---

## CRITICAL: READ THIS FIRST

This file exists because **assembly has its own degradation patterns** distinct from copy generation, visual production, and other ad skills:

1. **Incoherent assemblies** -- Hook promises "3 foods destroying your gut" but body discusses energy levels. Modular generation creates this naturally when hooks and bodies are produced independently. Without coherence validation, the majority of combinations will be logically disconnected.
2. **Missing variants** -- The model produces 15 variants and declares the matrix complete. The minimum is 30 testable variants. The target is 90. The combinatorial math (concepts x hooks x bodies x CTAs x visuals) produces the volume; the model must enumerate, not estimate.
3. **Untestable combinations** -- Variants listed without platform assignment, without file manifest, without format verification. These cannot be uploaded to an ad platform. They are theoretical, not testable.
4. **Platform-blind assembly** -- Same variant assembled identically for Meta and TikTok. A 16:9 video uploaded to TikTok (9:16 native) is not platform-native. Assembly must apply platform-specific format constraints.
5. **Naming chaos** -- Variants labeled inconsistently (some with concept IDs, some without; some with platform tags, some without). Without rigorous naming convention, the matrix cannot be navigated, tested, or analyzed.
6. **Copy-visual mismatch** -- A testimonial hook paired with a motion graphics visual. A UGC-style body paired with a polished studio visual. The visual treatment must match the copy register.
7. **Phantom variants** -- Variants listed in the matrix that reference copy files or asset files that do not exist. The file manifest must be verified against actual files.

**This file is the fix.** Before executing A09, read the relevant sections below.

---

## PURPOSE

Assemble **complete, testable ad units** from upstream copy variants (A07) and produced visual/video assets (A08), validate coherence across every combination, and organize the validated combinations into a **deployment-ready variant matrix**.

A09 answers the questions that downstream skills (A10, A11) need answered:
- What are ALL the valid hook x body x CTA x visual combinations?
- Which combinations are coherent (hook matches visual, CTA matches body, whole unit works)?
- Which combinations should be tested FIRST (based on Arena scores, A01 intelligence, and coherence scores)?
- What platform does each variant deploy to, and what are the exact file specs?
- Where are the actual files for each variant (copy file path + asset file path)?

**Success Criteria:**
- All A07 copy variants loaded and catalogued (hooks, bodies, CTAs by concept and platform)
- All A08 production assets loaded and catalogued (visuals, videos, audio by concept and platform)
- All valid combinations enumerated (combinatorial expansion with incompatible pairs filtered)
- Coherence validation completed for EVERY enumerated combination (pass/fail/flag)
- Minimum 30 testable variants pass coherence validation
- Target 90 testable variants pass coherence validation
- Every passing variant has: naming convention ID, platform assignment, format specs, file manifest
- Testing priority assigned (Tier 1 / Tier 2 / Tier 3) based on upstream scores and coherence
- VARIANT-MATRIX.yaml produced with ALL passing variants
- Per-platform variant directories created with assembly instructions or assembled files
- AD-VARIANT-MATRIX-SUMMARY.md produced as human-readable overview

This agent is a **workflow orchestrator**. It delegates enumeration, validation, and organization to subagents and validates outputs at each gate. It produces the variant matrix for downstream consumption by A10 (Pre-Launch Scoring) and A11 (Launch Package).

---

## IDENTITY

**This skill IS:**
- The assembly engine that combines copy variants with production assets into complete ad units
- The coherence validator that checks hook-body-CTA-visual logical flow for every combination
- The combinatorial enumerator that builds the full matrix of testable combinations
- The incompatibility filter that removes combinations that don't work (hook type x visual style mismatches, platform constraint violations, CTA x platform mismatches)
- The naming authority that assigns standardized IDs to every variant
- The testing prioritizer that ranks variants for deployment order
- The file manifest builder that maps every variant to concrete copy and asset files

**This skill is NOT:**
- A copy generator (that is A04/A07 -- A09 uses copy as-is from A07)
- A visual/video producer (that is A08 -- A09 uses assets as-is from A08)
- A creative strategy tool (that is A02/A03 -- A09 assembles, it does not ideate)
- An ad scorer (that is A10 -- A09 validates coherence, not performance prediction)
- A launch packager (that is A11 -- A09 produces the matrix, A11 produces deployment files)
- A hook generator or body writer (A09 NEVER writes new copy -- it assembles existing copy)
- A visual editor (A09 NEVER modifies assets -- it pairs them with copy)

**Upstream:** Receives AD-COPY-FINAL/ from A07, AD-ASSETS/ from A08, FORMAT-STRATEGY.md from A03, AD-ARENA-RESULTS.md from A06, platform specs
**Downstream:** Feeds VARIANT-MATRIX.yaml + per-platform variant files to A10 (Pre-Launch Scoring) and A11 (Launch Package)

---

## VARIANT NAMING CONVENTION (BINDING)

Every variant in the matrix MUST follow this naming convention:

```
[CONCEPT]-[HOOK]-[BODY]-[CTA]-[VISUAL]-[PLATFORM]

Components:
  CONCEPT:  C1, C2, C3           (winning concept from Arena, numbered)
  HOOK:     H01-H99              (hook variant number, zero-padded)
  BODY:     B1, B2, B3           (body variant per concept)
  CTA:      CTA1, CTA2, CTA3    (call-to-action variant)
  VISUAL:   V01-V99              (visual/video treatment, zero-padded)
  PLATFORM: META, TIKTOK, YT, GOOG, PIN, SNAP  (deployment platform)

Examples:
  C1-H03-B1-CTA2-V01-META       → Concept 1, Hook 3, Body 1, CTA 2, Visual 1, Meta
  C2-H01-B2-CTA1-V03-TIKTOK     → Concept 2, Hook 1, Body 2, CTA 1, Visual 3, TikTok
  C1-H07-B1-CTA3-V02-YT         → Concept 1, Hook 7, Body 1, CTA 3, Visual 2, YouTube
  C3-H02-B1-CTA1-V01-META       → Concept 3, Hook 2, Body 1, CTA 1, Visual 1, Meta
```

### Naming Rules (NON-NEGOTIABLE)

1. **All components present.** Every variant ID must contain all 6 components. No shortcuts (`C1-H3-META` is INVALID -- missing BODY, CTA, VISUAL).
2. **Zero-padded where specified.** Hook and Visual numbers are zero-padded to 2 digits (H01, not H1; V03, not V3). This ensures alphabetical sorting matches numerical sorting.
3. **Platform is LAST.** The platform tag is always the final component. This enables platform-level filtering and grouping.
4. **Concept numbering matches Arena.** C1/C2/C3 must correspond to the winning concepts from A06 Arena results, in the order they were selected.
5. **Hook numbering is global per concept.** H01 for Concept 1 is a different hook than H01 for Concept 2. The hook number is unique WITHIN its concept.
6. **No spaces, no special characters.** Only alphanumeric + hyphens. File-system safe.

---

### Model Assignment Table (Binding)

```
+------------------------------------------------------------------------------+
|  MODEL SELECTION IS MANDATORY, NOT ADVISORY.                                   |
|  The orchestrator MUST use the model specified below when spawning each         |
|  subagent type. Using a different model requires HUMAN APPROVAL with           |
|  documented reason.                                                            |
+------------------------------------------------------------------------------+

+------------------------+--------------+----------+----------------------------+
|  PHASE                 |  SKILLS      |  MODEL   |  REASON                    |
+------------------------+--------------+----------+----------------------------+
|  Pre-Execution         |  Infra       |  haiku   |  File creation, directory  |
|  infrastructure        |              |          |  setup -- mechanical only   |
+------------------------+--------------+----------+----------------------------+
|  Layer 0               |  0.0.1-0.5   |  haiku   |  Loading, validation,      |
|  foundation            |              |          |  cataloguing -- mechanical  |
|                        |              |          |  extraction, no reasoning  |
+------------------------+--------------+----------+----------------------------+
|  Layer 1               |  1.1-1.4     |  sonnet  |  Combinatorial expansion   |
|  combination gen       |              |          |  is algorithmic/mechanical  |
|                        |              |          |  but filtering requires    |
|                        |              |          |  moderate reasoning        |
+------------------------+--------------+----------+----------------------------+
|  Layer 2               |  2.1-2.5     |  opus    |  Coherence validation is   |
|  coherence validation  |              |          |  the CORE VALUE of A09.    |
|                        |              |          |  Requires deep reasoning   |
|                        |              |          |  about hook-body-CTA-      |
|                        |              |          |  visual semantic alignment  |
+------------------------+--------------+----------+----------------------------+
|  Layer 3               |  3.1-3.5     |  sonnet  |  Matrix organization,      |
|  matrix organization   |              |          |  naming, priority is       |
|                        |              |          |  structured/mechanical.    |
|                        |              |          |  Arena score lookup, not   |
|                        |              |          |  creative reasoning.       |
+------------------------+--------------+----------+----------------------------+
|  Layer 4               |  4.1-4.4     |  sonnet  |  Assembly and formatting   |
|  output packaging      |              |          |  -- structured packaging,   |
|                        |              |          |  not creative reasoning    |
+------------------------+--------------+----------+----------------------------+
```

### Model Selection Enforcement

```
WHEN SPAWNING A SUBAGENT:

1. LOOK UP the skill number in the table above
2. USE the specified model
3. LOG the model used in the execution log

IF you want to override the table:
  -> You MUST have HUMAN APPROVAL
  -> You MUST document the reason in the execution log
  -> "I thought it would be better" is NOT a valid reason

FORBIDDEN:
  - Defaulting ALL subagents to opus (wastes tokens on mechanical assembly)
  - Defaulting ALL subagents to haiku (loses quality on coherence validation)
  - Omitting the model parameter
  - Changing model mid-task without logging the switch
```

---

## STATE MACHINE

```
IDLE -> LOADING -> COMBINATION_GEN -> COHERENCE_VALIDATION -> MATRIX_ORG -> PACKAGING -> COMPLETE
         |             |                    |                    |             |
         v             v                    v                    v             v
      [GATE_0]      [GATE_1]            [GATE_2]            [GATE_3]       [GATE_4]
      PASS/FAIL     PASS/FAIL           PASS/FAIL           PASS/FAIL      PASS/FAIL
         |             |                    |                    |             |
         +-------------+--------------------+--------------------+-------------+
                                            ^
                                            |
                                    Max 3 expansion rounds
                                    per gate, then
                                    HUMAN ESCALATION
```

**State Transitions (VALID):**
- IDLE -> LOADING (always allowed)
- LOADING -> COMBINATION_GEN (only if GATE_0 = PASS)
- COMBINATION_GEN -> COHERENCE_VALIDATION (only if GATE_1 = PASS)
- COHERENCE_VALIDATION -> MATRIX_ORG (only if GATE_2 = PASS)
- MATRIX_ORG -> PACKAGING (only if GATE_3 = PASS)
- PACKAGING -> COMPLETE (only if GATE_4 = PASS)

**State Transitions (INVALID -- BLOCKED):**
- LOADING -> COHERENCE_VALIDATION (cannot skip combination generation)
- COMBINATION_GEN -> MATRIX_ORG (cannot skip coherence validation)
- ANY -> PACKAGING without GATE_3 passing
- ANY -> COMPLETE without GATE_4 passing

---

## LAYER ARCHITECTURE

### Pre-Execution: Project Infrastructure

**BEFORE any assembly work begins, the following files MUST exist in the project folder:**

#### 1. Project CLAUDE.md

```markdown
# [Project Name] -- A09 Assembly & Variant Matrix CLAUDE.md

## MANDATORY FIRST READS
1. READ: ./skills/ads/A09-assembly-variant-matrix/A09-ASSEMBLY-VARIANT-MATRIX-ANTI-DEGRADATION.md
2. READ: ./skills/ads/A09-assembly-variant-matrix/A09-ASSEMBLY-VARIANT-MATRIX-AGENT.md
3. READ: This file (project CLAUDE.md)
4. READ: PROJECT-STATE.md (current phase, decisions, next steps)

## VARIANT MATRIX TARGETS
| Metric | Minimum | Target | Status |
|--------|---------|--------|--------|
| Total combinations enumerated | -- | -- | PENDING |
| Coherent variants (passing) | 30 | 90 | PENDING |
| Flagged variants (review needed) | -- | -- | PENDING |
| Failed variants (incoherent) | -- | -- | PENDING |
| Platforms covered | 2 | -- | PENDING |
| Concepts represented | 3 | -- | PENDING |

## GATE ENFORCEMENT
- Gates are BINARY: PASS or FAIL. No other status exists.
- "PARTIAL_PASS", "conditional pass", "close enough to 30" -- NONE of these exist.

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)
- "most variants are coherent"
- "30 is approximately 30"
- "we can validate coherence later"
- "the matrix is essentially complete"
- "these variants are close enough to testable"
- "platform specs can be added later"
```

#### 2. PROJECT-STATE.md

```markdown
# [Project Name] -- A09 Assembly & Variant Matrix State

## Current Phase
- Layer: [0/1/2/3/4]
- Step: [e.g., 2.1 Hook-Body Coherence Check]
- Status: [IN_PROGRESS / BLOCKED / COMPLETE]

## Input Inventory (updated at Layer 0)
| Input Type | Count | Source | Status |
|------------|-------|--------|--------|
| Concepts (winning) | -- | A06 Arena | PENDING |
| Hook variants | -- | A07 | PENDING |
| Body variants | -- | A07 | PENDING |
| CTA variants | -- | A07 | PENDING |
| Visual treatments | -- | A08 | PENDING |
| Platforms targeted | -- | A03 | PENDING |

## Combination Progress
| Metric | Current | Status |
|--------|---------|--------|
| Total combinations enumerated | 0 | PENDING |
| Incompatible pairs filtered | 0 | PENDING |
| Valid combinations for validation | 0 | PENDING |

## Coherence Validation Progress
| Status | Count | % |
|--------|-------|---|
| PASS | 0 | 0% |
| FAIL | 0 | 0% |
| FLAG (human review) | 0 | 0% |
| Pending validation | 0 | 0% |

## Gate Status
- GATE_0: [PASS/PENDING]
- GATE_1: [PASS/FAIL/PENDING]
- GATE_2: [PASS/FAIL/PENDING]
- GATE_3: [PASS/FAIL/PENDING]
- GATE_4: [PASS/FAIL/PENDING]

## Key Decisions
- [None yet]

## Next Action
- [Initialize project]
```

#### 3. PROGRESS-LOG.md

```markdown
# [Project Name] -- A09 Progress Log
## [Timestamp]
**Phase:** Pre-Execution
**Action:** Project infrastructure created
**Files:** project CLAUDE.md, PROJECT-STATE.md, PROGRESS-LOG.md
**Next:** Begin Layer 0 execution
```

**These 3 files are created at Pre-Execution, BEFORE any Layer 0 skills run.**

---

### Layer 0: Foundation & Loading

**Purpose:** Load ALL required inputs from upstream skills (A07 copy variants, A08 production assets, A03 format strategy, A06 Arena results), validate completeness, and build the input catalog that drives combinatorial expansion.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 0.0.1 | `0.0.1-vertical-profile-loader.md` | Load ad-specific vertical config from `ad-verticals/` (platform priorities, compliance constraints, anti-slop rules). Extract platform-specific format specs (aspect ratios, file types, max durations, max file sizes). | haiku |
| 0.1 | `0.1-copy-variant-loader.md` | Load ALL copy variants from A07 `AD-COPY-FINAL/` directory. Build copy catalog: for each concept, enumerate all hooks (with IDs), all body variants (with IDs), all CTA variants (with IDs). Record platform-specific versions if A07 produced them. Verify no missing files. Output: COPY-CATALOG.yaml listing every copy element with file path, concept, element type, platform, and A07 variant ID. | haiku |
| 0.2 | `0.2-asset-loader.md` | Load ALL production assets from A08 `AD-ASSETS/` directory. Build asset catalog: for each concept, enumerate all visual treatments (with IDs), all video assets (with IDs), all audio assets (with IDs). Record format specs per asset (resolution, aspect ratio, duration, file size, file type). Verify no missing files. Output: ASSET-CATALOG.yaml listing every asset with file path, concept, asset type, format specs, and A08 asset ID. | haiku |
| 0.3 | `0.3-format-strategy-loader.md` | Load FORMAT-STRATEGY.md from A03. Extract: platform list with priority, format requirements per platform (aspect ratios, durations, file types, max sizes), platform-specific constraints (Meta sound-off requirements, TikTok vertical-first, YouTube skip-button timing). Output: PLATFORM-SPECS.yaml. | haiku |
| 0.4 | `0.4-arena-results-loader.md` | Load AD-ARENA-RESULTS.md from A06. Extract: winning concept IDs with Arena scores, per-concept scoring breakdown, human selection notes, any priority guidance. This data drives testing priority assignment in Layer 3. Output: ARENA-SCORES.yaml. | haiku |
| 0.5 | `0.5-input-validator.md` | Validate ALL inputs present and cross-referenced. Verify: (a) Every concept in Arena results has copy variants in A07, (b) Every concept in Arena results has assets in A08, (c) Copy catalog and asset catalog reference same concept IDs, (d) Platform list in format strategy matches platforms represented in copy/asset catalogs, (e) Minimum 3 winning concepts loaded, (f) Minimum 5 hooks per concept loaded, (g) Minimum 2 visual treatments per concept loaded. Output: INPUT-VALIDATION-REPORT.md. | haiku |

**Execution Order:**
1. 0.0.1, 0.1, 0.2, 0.3, 0.4 run in parallel (independent loading)
2. 0.5 runs after ALL above complete (validates cross-references)

**Gate 0 -- Layer 0 Complete:**

```yaml
# LAYER_0_COMPLETE.yaml
gate: GATE_0
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  vertical_profile_loaded: true
  copy_catalog_created: true
  asset_catalog_created: true
  format_strategy_loaded: true
  arena_results_loaded: true
  concepts_loaded: "[integer >= 3]"
  hooks_per_concept_minimum: "[integer >= 5]"
  visuals_per_concept_minimum: "[integer >= 2]"
  copy_asset_concept_alignment: true
  platform_coverage_verified: true
  all_inputs_validated: true

microskill_outputs:
  - id: "0.0.1"
    file: "layer-0-outputs/0.0.1-vertical-profile-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.1"
    file: "layer-0-outputs/0.1-copy-variant-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.2"
    file: "layer-0-outputs/0.2-asset-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.3"
    file: "layer-0-outputs/0.3-format-strategy-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.4"
    file: "layer-0-outputs/0.4-arena-results-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.5"
    file: "layer-0-outputs/0.5-input-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF concepts_loaded < 3: GATE CLOSED -- insufficient winning concepts from Arena
IF hooks_per_concept_minimum < 5: GATE CLOSED -- insufficient hook variants from A07
IF visuals_per_concept_minimum < 2: GATE CLOSED -- insufficient visual treatments from A08
IF copy_asset_concept_alignment = false: GATE CLOSED -- concept ID mismatch between copy and assets
```

### Schema Validation Reference

Input validators MUST verify field presence — not just file existence — for all consumed handoff files. See `skills/ads/ad-engine-schema-registry.md` for required fields per handoff file.

---

### Layer 1: Combination Generation

**Purpose:** Enumerate ALL valid hook x body x CTA x visual x platform combinations. Filter out incompatible pairs. Produce the complete list of candidate combinations for coherence validation.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 1.1 | `1.1-combinatorial-expander.md` | For each concept, compute the full Cartesian product: hooks x bodies x CTAs x visuals x platforms. Record: total theoretical combinations (before filtering). Example: 3 concepts x 5 hooks x 2 bodies x 3 CTAs x 2 visuals x 2 platforms = 360 theoretical combinations. Output: RAW-COMBINATIONS.yaml with every combination listed by variant ID. | sonnet |
| 1.2 | `1.2-incompatibility-filter.md` | Apply incompatibility rules to filter out invalid combinations. Rules: (a) Hook type x visual style mismatches (e.g., testimonial hook cannot pair with motion graphics visual), (b) CTA x platform mismatches (e.g., "Swipe Up" CTA only valid on Stories/Reels), (c) Body length x platform mismatches (e.g., 3-minute body cannot run on TikTok 15s slot), (d) Format constraint violations (e.g., static image visual paired with video-only hook), (e) Compliance exclusions from vertical profile. Output: INCOMPATIBILITY-LOG.yaml listing every removed combination with reason. | sonnet |
| 1.3 | `1.3-platform-specific-mapper.md` | For each surviving combination, verify platform-specific format requirements are met: aspect ratio, duration limit, file type, sound-on/sound-off handling, text overlay requirements. Flag combinations that COULD be valid but need format adaptation (e.g., 16:9 video that needs 9:16 crop for TikTok). Output: PLATFORM-MAPPING.yaml with format status per combination (READY / NEEDS_ADAPTATION / BLOCKED). | sonnet |
| 1.4 | `1.4-combination-validator.md` | Validate the filtered combination list. Count: total valid combinations (after filtering). Count: combinations per concept, per platform, per hook type. Verify: minimum 30 valid combinations survive filtering (if not, identify which input dimension is the bottleneck -- too few hooks? too few visuals? too few CTAs?). Output: COMBINATION-VALIDATION-REPORT.md with counts, distribution analysis, and bottleneck identification. | sonnet |

**Execution Order:**
1. 1.1 first (generates full combinatorial set)
2. 1.2 after 1.1 (filters incompatible pairs)
3. 1.3 after 1.2 (maps platform-specific requirements)
4. 1.4 after 1.3 (validates and counts)

**MANDATORY COMBINATION COUNT CHECK (After Layer 1):**

```
+-----------------------------------------------------------------------------+
|  COMBINATION COUNT CHECK - [timestamp]                                        |
|                                                                               |
|  +------------------------------------------------------------------------+  |
|  | METRIC                      | VALUE    | STATUS                        |  |
|  +------------------------------------------------------------------------+  |
|  | Theoretical combinations    | [X]      | (reference only)              |  |
|  | Incompatible pairs removed  | [X]      | (reference only)              |  |
|  | Platform-blocked removed    | [X]      | (reference only)              |  |
|  | Valid combinations remaining| [X]      | PASS if >= 30 / FAIL if < 30  |  |
|  | Combinations per Concept 1  | [X]      | (reference only)              |  |
|  | Combinations per Concept 2  | [X]      | (reference only)              |  |
|  | Combinations per Concept 3  | [X]      | (reference only)              |  |
|  | Platforms represented       | [X]      | PASS if >= 2 / FAIL if < 2    |  |
|  +------------------------------------------------------------------------+  |
|                                                                               |
|  IF valid_combinations < 30:                                                  |
|    BOTTLENECK ANALYSIS:                                                       |
|    - Hooks per concept: [X] (need >= 5)                                       |
|    - Bodies per concept: [X] (need >= 2)                                      |
|    - CTAs per concept: [X] (need >= 2)                                        |
|    - Visuals per concept: [X] (need >= 2)                                     |
|    - Platforms targeted: [X] (need >= 2)                                      |
|    ACTION: Escalate to human -- which upstream skill needs more variants?     |
|                                                                               |
|  OVERALL: [PASS - proceed] or [FAIL - address bottleneck]                    |
+-----------------------------------------------------------------------------+
```

**IF OVERALL = FAIL:** You MUST escalate to human with bottleneck analysis before attempting Layer 2.

**Gate 1 -- Layer 1 Complete:**

```yaml
# LAYER_1_COMPLETE.yaml
gate: GATE_1
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  theoretical_combinations: "[integer]"
  incompatible_pairs_removed: "[integer]"
  platform_blocked_removed: "[integer]"
  valid_combinations: "[integer >= 30]"
  concepts_represented: "[integer >= 3]"
  platforms_represented: "[integer >= 2]"
  all_combinations_have_variant_ids: true
  incompatibility_log_exists: true

microskill_outputs:
  - id: "1.1"
    file: "layer-1-outputs/1.1-combinatorial-expander.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      theoretical_combinations: "[integer]"
  - id: "1.2"
    file: "layer-1-outputs/1.2-incompatibility-filter.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      pairs_removed: "[integer]"
      removal_reasons: "[list of reason categories]"
  - id: "1.3"
    file: "layer-1-outputs/1.3-platform-specific-mapper.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      ready_count: "[integer]"
      needs_adaptation_count: "[integer]"
      blocked_count: "[integer]"
  - id: "1.4"
    file: "layer-1-outputs/1.4-combination-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF valid_combinations < 30: GATE CLOSED -- escalate bottleneck to human
IF concepts_represented < 3: GATE CLOSED -- missing concept combinations
IF platforms_represented < 2: GATE CLOSED -- insufficient platform coverage
```

---

### Layer 2: Coherence Validation

**Purpose:** Validate EVERY enumerated combination for semantic coherence. This is the core value of A09 -- assembly without coherence validation produces broken ads. For each combination, check: Does the hook match the visual? Does the body deliver on the hook's promise? Does the CTA match the body? Does the visual register match the copy register? Does the whole unit work as a coherent ad?

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 2.1 | `2.1-hook-body-coherence.md` | For EVERY valid combination, evaluate: does the body DELIVER on what the hook PROMISES? The hook creates an expectation (curiosity gap, pain identification, result promise, question). The body must fulfill that expectation. Score: PASS (body fulfills hook promise), FAIL (body delivers something different), FLAG (borderline -- human review needed). Output: HOOK-BODY-COHERENCE.yaml with per-combination verdicts and reasoning. | opus |
| 2.2 | `2.2-body-cta-coherence.md` | For EVERY valid combination, evaluate: does the CTA logically follow from the body? A body that educates about a mechanism should CTA to "learn more" or "watch the full explanation," not "buy now." A body that presents proof and builds desire should CTA to "try it today." Score: PASS/FAIL/FLAG. Output: BODY-CTA-COHERENCE.yaml. | opus |
| 2.3 | `2.3-hook-visual-coherence.md` | For EVERY valid combination, evaluate: does the visual MATCH the hook's register? A testimonial hook needs a UGC or talking-head visual, not motion graphics. A data hook needs a chart or text-overlay visual, not lifestyle footage. A demonstration hook needs a product-in-use visual. Score: PASS/FAIL/FLAG. Output: HOOK-VISUAL-COHERENCE.yaml. | opus |
| 2.4 | `2.4-full-unit-coherence.md` | For EVERY combination that passed 2.1, 2.2, AND 2.3: evaluate the COMPLETE unit as a coherent ad. Does the hook -> body -> CTA -> visual sequence tell a coherent micro-story? Would a viewer who watches this ad from start to finish receive a single, unified message? Are there tonal mismatches between copy register and visual register? Score: PASS/FAIL/FLAG with overall coherence rating (1-10). Combinations scoring below 6.0 = FAIL. Combinations scoring 6.0-7.0 = FLAG. Combinations scoring above 7.0 = PASS. Output: FULL-UNIT-COHERENCE.yaml. | opus |
| 2.5 | `2.5-coherence-validator.md` | Aggregate all coherence results. Count: total PASS, total FAIL, total FLAG. Verify: minimum 30 combinations have PASS status. If fewer than 30 PASS, identify the most common failure reasons and determine if FLAGged combinations can be promoted to PASS with minor adjustments (document the adjustments). Output: COHERENCE-VALIDATION-REPORT.md. | opus |

**Execution Order:**
1. 2.1, 2.2, 2.3 run in parallel (independent coherence dimensions)
2. 2.4 runs after 2.1, 2.2, AND 2.3 complete (needs all three dimension results)
3. 2.5 runs after 2.4 complete (aggregates all results)

**MANDATORY COHERENCE VALIDATION CHECK:**

```
+-----------------------------------------------------------------------------+
|  COHERENCE VALIDATION CHECK - [timestamp]                                     |
|                                                                               |
|  +------------------------------------------------------------------------+  |
|  | DIMENSION               | TOTAL | PASS | FAIL | FLAG | % PASS         |  |
|  +------------------------------------------------------------------------+  |
|  | Hook-Body Coherence     | [X]   | [X]  | [X]  | [X]  | [X]%           |  |
|  | Body-CTA Coherence      | [X]   | [X]  | [X]  | [X]  | [X]%           |  |
|  | Hook-Visual Coherence   | [X]   | [X]  | [X]  | [X]  | [X]%           |  |
|  | Full Unit Coherence     | [X]   | [X]  | [X]  | [X]  | [X]%           |  |
|  +------------------------------------------------------------------------+  |
|                                                                               |
|  AGGREGATE:                                                                   |
|  | Total PASS (all 4 dimensions)    | [X]  | PASS if >= 30 / FAIL if < 30 |  |
|  | Total FLAG (any dimension)       | [X]  | For human review              |  |
|  | Total FAIL (any dimension)       | [X]  | Excluded from matrix          |  |
|  +------------------------------------------------------------------------+  |
|                                                                               |
|  IF TOTAL PASS < 30:                                                          |
|    TOP FAILURE REASONS:                                                       |
|    1. [reason] -- [count] combinations                                        |
|    2. [reason] -- [count] combinations                                        |
|    3. [reason] -- [count] combinations                                        |
|    FLAGGED COMBINATIONS PROMOTABLE: [count]                                   |
|    NET AVAILABLE (PASS + promotable FLAG): [count]                            |
|    IF net < 30: ESCALATE TO HUMAN                                             |
|                                                                               |
|  OVERALL: [PASS - proceed] or [FAIL - address coherence shortfall]           |
+-----------------------------------------------------------------------------+
```

**Gate 2 -- Layer 2 Complete:**

```yaml
# LAYER_2_COMPLETE.yaml
gate: GATE_2
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  total_combinations_validated: "[integer]"
  hook_body_pass_count: "[integer]"
  body_cta_pass_count: "[integer]"
  hook_visual_pass_count: "[integer]"
  full_unit_pass_count: "[integer >= 30]"
  full_unit_flag_count: "[integer]"
  full_unit_fail_count: "[integer]"
  minimum_30_coherent_variants: true
  all_dimensions_evaluated: true
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "2.1"
    file: "layer-2-outputs/2.1-hook-body-coherence.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      combinations_evaluated: "[integer]"
      pass_count: "[integer]"
  - id: "2.2"
    file: "layer-2-outputs/2.2-body-cta-coherence.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      combinations_evaluated: "[integer]"
      pass_count: "[integer]"
  - id: "2.3"
    file: "layer-2-outputs/2.3-hook-visual-coherence.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      combinations_evaluated: "[integer]"
      pass_count: "[integer]"
  - id: "2.4"
    file: "layer-2-outputs/2.4-full-unit-coherence.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      pass_count: "[integer]"
      average_coherence_score: "[float]"
  - id: "2.5"
    file: "layer-2-outputs/2.5-coherence-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF full_unit_pass_count < 30: GATE CLOSED -- address coherence shortfall
IF validator_verdict != PASS: GATE CLOSED -- address validation failures
```

---

### Layer 3: Matrix Organization

**Purpose:** Organize all coherent (PASS) variants into the final variant matrix. Assign standardized naming IDs, testing priority tiers, and platform deployment assignments. Build the file manifest that maps every variant to its concrete copy and asset files.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 3.1 | `3.1-variant-id-assigner.md` | Assign standardized variant IDs to every PASS combination using the binding naming convention: [CONCEPT]-[HOOK]-[BODY]-[CTA]-[VISUAL]-[PLATFORM]. Verify: all IDs are unique, all IDs follow the format, no duplicate IDs exist. Cross-reference concept numbering with Arena results. Output: VARIANT-ID-MAP.yaml (variant ID -> combination components -> source file paths). | sonnet |
| 3.2 | `3.2-testing-priority-assigner.md` | Assign testing priority tier to every variant based on: (a) Arena scores for parent concept (higher Arena score = higher priority), (b) Coherence score from Layer 2 (higher coherence = higher priority), (c) Hook type performance data from A01 intelligence (proven hook types = higher priority), (d) Platform priority from A03 format strategy (primary platform = higher priority). Tiers: TIER_1 (test first -- top 20% of variants), TIER_2 (test second -- middle 50%), TIER_3 (test third -- bottom 30%). Output: TESTING-PRIORITY.yaml. | sonnet |
| 3.3 | `3.3-file-manifest-builder.md` | For EVERY variant, build a concrete file manifest: (a) Copy file path (exact path to the A07 copy file), (b) Asset file path(s) (exact path(s) to A08 asset file(s)), (c) Platform (deployment target), (d) Format specs (aspect ratio, duration, file type, max size), (e) Assembly status (READY if all files exist and specs match, BLOCKED if any file missing or spec mismatch). Verify: every referenced file EXISTS on disk. Output: FILE-MANIFEST.yaml. | sonnet |
| 3.4 | `3.4-platform-grouper.md` | Group all variants by platform for deployment efficiency. For each platform: list all variants with IDs, count total variants, verify all meet platform-specific format requirements. Identify platform-level gaps (e.g., "TikTok has only 8 variants -- below recommended 15 per platform"). Output: PLATFORM-GROUPS.yaml. | sonnet |
| 3.5 | `3.5-matrix-validator.md` | Validate the complete organized matrix. Verify: (a) Every PASS variant from Layer 2 has a variant ID, (b) Every variant has a testing priority, (c) Every variant has a complete file manifest with verified file paths, (d) Every variant has a platform assignment, (e) No orphaned variants (in matrix but not in file manifest, or vice versa), (f) Distribution is reasonable (no concept with fewer than 5 variants, no platform with fewer than 5 variants). Output: MATRIX-VALIDATION-REPORT.md. | sonnet |

**Execution Order:**
1. 3.1 first (IDs must be assigned before priority or manifest)
2. 3.2 after 3.1 (needs variant IDs)
3. 3.3 after 3.1 (needs variant IDs, runs in parallel with 3.2)
4. 3.4 after 3.3 (needs file manifest for format verification)
5. 3.5 after ALL above complete (validates everything)

**MANDATORY MATRIX COMPLETENESS CHECK:**

```
+-----------------------------------------------------------------------------+
|  MATRIX COMPLETENESS CHECK - [timestamp]                                      |
|                                                                               |
|  +------------------------------------------------------------------------+  |
|  | METRIC                         | VALUE  | STATUS                       |  |
|  +------------------------------------------------------------------------+  |
|  | Total variants in matrix       | [X]    | PASS if >= 30 / FAIL < 30    |  |
|  | All have variant IDs           | [Y/N]  | MUST be Y                    |  |
|  | All have testing priority      | [Y/N]  | MUST be Y                    |  |
|  | All have file manifest         | [Y/N]  | MUST be Y                    |  |
|  | All files verified on disk     | [Y/N]  | MUST be Y                    |  |
|  | All have platform assignment   | [Y/N]  | MUST be Y                    |  |
|  | TIER_1 variants                | [X]    | (top 20%)                    |  |
|  | TIER_2 variants                | [X]    | (middle 50%)                 |  |
|  | TIER_3 variants                | [X]    | (bottom 30%)                 |  |
|  | Variants per Concept 1         | [X]    | WARN if < 5                  |  |
|  | Variants per Concept 2         | [X]    | WARN if < 5                  |  |
|  | Variants per Concept 3         | [X]    | WARN if < 5                  |  |
|  | Variants on Meta               | [X]    | WARN if < 5                  |  |
|  | Variants on TikTok             | [X]    | WARN if < 5                  |  |
|  | Variants on YouTube            | [X]    | (reference only)             |  |
|  | Variants on other platforms    | [X]    | (reference only)             |  |
|  | Orphaned variants              | [X]    | MUST be 0                    |  |
|  +------------------------------------------------------------------------+  |
|                                                                               |
|  OVERALL: [PASS - proceed] or [FAIL - address gaps]                          |
+-----------------------------------------------------------------------------+
```

**Gate 3 -- Layer 3 Complete:**

```yaml
# LAYER_3_COMPLETE.yaml
gate: GATE_3
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  total_variants_in_matrix: "[integer >= 30]"
  all_have_variant_ids: true
  all_have_testing_priority: true
  all_have_file_manifest: true
  all_files_verified_on_disk: true
  all_have_platform_assignment: true
  orphaned_variants: 0
  tier_1_count: "[integer]"
  tier_2_count: "[integer]"
  tier_3_count: "[integer]"
  concepts_each_have_5_plus_variants: true
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "3.1"
    file: "layer-3-outputs/3.1-variant-id-assigner.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.2"
    file: "layer-3-outputs/3.2-testing-priority-assigner.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.3"
    file: "layer-3-outputs/3.3-file-manifest-builder.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      files_verified: "[integer]"
      files_missing: "[integer -- must be 0]"
  - id: "3.4"
    file: "layer-3-outputs/3.4-platform-grouper.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.5"
    file: "layer-3-outputs/3.5-matrix-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF total_variants_in_matrix < 30: GATE CLOSED -- insufficient coherent variants
IF all_files_verified_on_disk = false: GATE CLOSED -- resolve missing files
IF orphaned_variants > 0: GATE CLOSED -- reconcile orphaned variants
IF validator_verdict != PASS: GATE CLOSED -- address validation failures
```

---

### Layer 4: Output Packaging

**Purpose:** Assemble all Layer 0-3 outputs into the primary deliverables: VARIANT-MATRIX.yaml (structured data for A10/A11), per-platform variant directories, and AD-VARIANT-MATRIX-SUMMARY.md (human-readable overview).

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 4.1 | `4.1-variant-matrix-assembler.md` | Assemble the primary output: VARIANT-MATRIX.yaml. For EVERY variant: variant ID, concept, hook (ID + text), body (ID + summary), CTA (ID + text), visual (ID + description), platform, format specs, testing priority, coherence score, copy file path, asset file path(s), assembly status. This is the COMPLETE structured database of every testable variant. Chunked assembly required for large matrices (15+ write operations for 90+ variants). | sonnet |
| 4.2 | `4.2-platform-directory-builder.md` | Create per-platform directories under AD-VARIANT-MATRIX/. For each platform: create directory, create platform-specific variant index (listing all variants for that platform with file references), create assembly instructions (how to combine copy + asset for upload to that specific platform). Output: AD-VARIANT-MATRIX/[PLATFORM]/ directories with index files. | sonnet |
| 4.3 | `4.3-summary-assembler.md` | Assemble AD-VARIANT-MATRIX-SUMMARY.md (human-readable overview). Required sections: (1) Executive Summary (total variants, per-concept, per-platform, testing priority distribution), (2) Variant Matrix Overview (tabular display of all variants with key attributes), (3) Coherence Results Summary (pass/fail/flag distribution, common failure patterns), (4) Testing Priority Recommendations (TIER_1 variants to test first, rationale), (5) Platform Deployment Guide (per-platform variant lists with format notes), (6) File Manifest Summary (all files referenced, verification status), (7) Flagged Variants for Human Review (if any FLAG results from coherence). Minimum size: 20KB. | sonnet |
| 4.4 | `4.4-checkpoint-and-log.md` | Create all checkpoint YAML files. Produce execution-log.md with per-microskill entries. Verify all output files exist with sizes. Create LAYER_4_COMPLETE.yaml. | sonnet |

**Execution Order:**
1. 4.1 first (primary structured output)
2. 4.2 after 4.1 (needs variant matrix as reference)
3. 4.3 after 4.1 and 4.2 (needs both for comprehensive summary)
4. 4.4 after ALL above (final checkpoint)

**Gate 4 -- Layer 4 Complete (Skill Complete):**

```yaml
# LAYER_4_COMPLETE.yaml
gate: GATE_4
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  variant_matrix_yaml_exists: true
  variant_matrix_yaml_path: "AD-VARIANT-MATRIX/VARIANT-MATRIX.yaml"
  variant_matrix_variant_count: "[integer >= 30]"
  platform_directories_exist: true
  platform_directory_count: "[integer >= 2]"
  summary_md_exists: true
  summary_md_path: "AD-VARIANT-MATRIX-SUMMARY.md"
  summary_md_size_kb: "[integer >= 20]"
  summary_all_7_sections_populated: true
  execution_log_exists: true
  all_checkpoint_files_exist: true

post_assembly_validation:
  variant_count_matches_layer_3: true
  file_manifest_all_verified: true
  no_orphaned_entries: true
  status: "[PASS if all true / FAIL otherwise]"

IF variant_matrix_variant_count < 30: GATE CLOSED -- re-assemble with correct variants
IF summary_md_size_kb < 20: GATE CLOSED -- expand summary with required sections
IF any section missing or empty: GATE CLOSED -- complete missing sections
```

---

## OUTPUT SCHEMA: VARIANT-MATRIX.yaml

The primary structured output. Every variant is a complete record:

```yaml
# VARIANT-MATRIX.yaml
metadata:
  project: "[project name]"
  created: "[ISO 8601]"
  skill: "A09 -- Assembly & Variant Matrix"
  total_variants: "[integer]"
  concepts: "[integer]"
  platforms: "[list]"
  tier_1_count: "[integer]"
  tier_2_count: "[integer]"
  tier_3_count: "[integer]"

variants:
  - variant_id: "C1-H01-B1-CTA1-V01-META"
    concept:
      id: "C1"
      name: "[concept name from Arena]"
      arena_score: "[float]"
    hook:
      id: "H01"
      text: "[verbatim hook text]"
      hook_type: "[from 32-type taxonomy]"
      hook_category: "[A-J]"
    body:
      id: "B1"
      summary: "[1-2 sentence body summary]"
      word_count: "[integer]"
      script_framework: "[PAS/AIDA/BAB/etc.]"
    cta:
      id: "CTA1"
      text: "[verbatim CTA text]"
      cta_type: "[urgency/risk_reversal/low_friction/etc.]"
    visual:
      id: "V01"
      description: "[visual treatment description]"
      visual_type: "[UGC/polished/motion_graphics/text_overlay/etc.]"
      format:
        aspect_ratio: "[16:9/9:16/1:1/4:5]"
        duration_seconds: "[integer or null for static]"
        file_type: "[mp4/jpg/png/gif]"
    platform: "META"
    platform_specs:
      ad_format: "[feed/stories/reels/in_stream]"
      sound_requirement: "[sound_on/sound_off/both]"
      text_overlay_required: "[true/false]"
      max_file_size_mb: "[integer]"
    testing_priority: "TIER_1"
    coherence:
      overall_score: "[float 1-10]"
      hook_body: "PASS"
      body_cta: "PASS"
      hook_visual: "PASS"
      full_unit: "PASS"
    file_manifest:
      copy_file: "[exact path to A07 copy file]"
      asset_files:
        - "[exact path to A08 visual/video file]"
        - "[exact path to A08 audio file, if applicable]"
      assembly_status: "READY"

  - variant_id: "C1-H01-B1-CTA1-V01-TIKTOK"
    # ... same structure for every variant
```

---

## OUTPUT SCHEMA: AD-VARIANT-MATRIX-SUMMARY.md

Human-readable overview document. Minimum 20KB.

```markdown
# AD-VARIANT-MATRIX-SUMMARY.md

## Metadata
- Project: [name]
- Created: [ISO 8601]
- Total Variants: [integer]
- Concepts: [integer]
- Platforms: [list]

## Section 1: Executive Summary
- Total testable variants in matrix
- Distribution by concept (C1: X, C2: X, C3: X)
- Distribution by platform (Meta: X, TikTok: X, YouTube: X)
- Distribution by testing priority (TIER_1: X, TIER_2: X, TIER_3: X)
- Key coherence metrics (pass rate, most common failure patterns)
- Recommendation for first testing wave (which TIER_1 variants, which platform)

## Section 2: Variant Matrix Overview
- Full tabular display of ALL variants with columns:
  | Variant ID | Concept | Hook Type | Body Framework | CTA Type | Visual Type | Platform | Priority | Coherence |
- Sorted by testing priority (TIER_1 first)

## Section 3: Coherence Results Summary
- Overall coherence pass rate
- Per-dimension pass rates (hook-body, body-CTA, hook-visual, full-unit)
- Most common failure patterns with counts
- Flagged variants requiring human review (if any)
- Recommendations for improving coherence in future campaigns

## Section 4: Testing Priority Recommendations
- TIER_1 variants listed with rationale for each:
  - Arena score for parent concept
  - Coherence score
  - Hook type performance data from A01
  - Platform priority from A03
- Recommended first-wave testing plan (5-10 variants to launch first)
- Recommended testing cadence (how many variants per week)

## Section 5: Platform Deployment Guide
- For each platform:
  - Total variants
  - Format requirements summary
  - Variants ready for deployment
  - Variants needing adaptation
  - Platform-specific assembly notes

## Section 6: File Manifest Summary
- Total unique copy files referenced
- Total unique asset files referenced
- All files verified on disk: [Y/N]
- Any missing files: [list or "none"]

## Section 7: Flagged Variants for Human Review
- List of all FLAG variants with:
  - Variant ID
  - Which coherence dimension was flagged
  - Specific concern
  - Recommendation (promote to PASS / demote to FAIL / needs copy adjustment / needs visual swap)
```

---

## GATE ARCHITECTURE -- COMPLETE REFERENCE

### Gate Summary Table

| Gate | Location | Blocks | Key Criteria | Expansion Protocol |
|------|----------|--------|--------------|-------------------|
| GATE_0 | Layer 0 -> Layer 1 | Combination generation entry | A07 copy loaded, A08 assets loaded, A03 format loaded, A06 scores loaded, concepts >= 3 | Fix missing inputs |
| GATE_1 | Layer 1 -> Layer 2 | Coherence validation entry | >= 30 valid combinations after filtering, 3+ concepts, 2+ platforms | Escalate bottleneck to human |
| GATE_2 | Layer 2 -> Layer 3 | Matrix organization entry | >= 30 variants pass full coherence validation | Promote FLAGged variants or escalate |
| GATE_3 | Layer 3 -> Layer 4 | Output packaging entry | All variants have IDs, priorities, manifests, platform assignments; 0 orphaned | Fix organizational gaps |
| GATE_4 | Skill completion | Downstream consumption | VARIANT-MATRIX.yaml exists, SUMMARY.md >= 20KB, all files verified | Re-assemble |

### Structural Checkpoint Files

```
[project]/A09-assembly-variant-matrix/checkpoints/
  LAYER_0_COMPLETE.yaml
  LAYER_1_COMPLETE.yaml
  LAYER_2_COMPLETE.yaml
  LAYER_3_COMPLETE.yaml
  LAYER_4_COMPLETE.yaml
```

**IF checkpoint file does not exist, the next layer is BLOCKED.**

### Gate Failure Response Protocol

```
GATE FAILED -> DO NOT proceed. DO NOT invent new gate statuses.
Gate status can ONLY be PASS or FAIL.

EXPANSION ROUND 1:
  1. IDENTIFY which metrics failed (from count/validation check table)
  2. For combination shortfall: identify bottleneck dimension (hooks? visuals? CTAs?)
  3. For coherence shortfall: identify most common failure patterns
  4. For organizational gaps: fix missing IDs, priorities, or manifests
  5. UPDATE PROJECT-STATE.md
  6. Re-run the relevant check table
  7. IF PASS -> proceed. IF FAIL -> ROUND 2.

EXPANSION ROUND 2:
  1. IDENTIFY REMAINING deficits
  2. For combination shortfall: recommend specific upstream additions to human
  3. For coherence shortfall: review FLAGged variants for promotion with documented reasoning
  4. For organizational gaps: rebuild affected organizational outputs
  5. UPDATE PROJECT-STATE.md
  6. Re-run check
  7. IF PASS -> proceed. IF FAIL -> ROUND 3.

EXPANSION ROUND 3:
  1. IDENTIFY REMAINING deficits
  2. Use all available fallback approaches
  3. For coherence: present all FLAG variants to human for decision
  4. UPDATE PROJECT-STATE.md
  5. Re-run check
  6. IF PASS -> proceed. IF FAIL -> ESCALATE TO HUMAN.

HUMAN ESCALATION (only after ALL 3 rounds):
  Present exact metrics vs targets, what was tried, and options:
  (a) approve reduced threshold with documented reason
  (b) request additional upstream variants from A07/A08
  (c) accept FLAG variants as PASS with human override
  (d) adjust matrix scope
```

### Forbidden Rationalizations (IMMEDIATE HALT)

```
+------------------------------------------------------------------------------+
|  IF ANY OF THESE PHRASES APPEAR IN GATE REASONING, THE GATE CHECK             |
|  IS INVALID AND EXECUTION MUST HALT IMMEDIATELY.                              |
+------------------------------------------------------------------------------+
```

| Rationalization | Why Forbidden | Required Response |
|-----------------|---------------|-------------------|
| "most variants are coherent" | "Most" is not 100%. Every variant in the matrix must have PASS coherence. | HALT -- validate remaining variants |
| "30 is approximately 30" | Numbers are exact. 29 is not 30. | HALT -- reach exact threshold |
| "we can validate coherence later" | Coherence validation IS the value of A09. Deferring it defeats the purpose. | HALT -- validate now |
| "the matrix is essentially complete" | "Essentially" means incomplete. Complete means every field populated. | HALT -- populate remaining fields |
| "these variants are close enough to testable" | "Close enough" = untestable. A variant without a file manifest cannot be uploaded. | HALT -- complete file manifests |
| "platform specs can be added later" | Platform specs are part of assembly. Without them, variants are platform-blind. | HALT -- assign platform specs |
| "coherence is subjective" | Coherence criteria are defined: hook-body alignment, body-CTA flow, hook-visual match. Not subjective. | HALT -- evaluate against criteria |
| "we have enough variants to start testing" | "Enough" is defined as 30 minimum. Subjective assessment is not allowed. | HALT -- meet threshold |
| "partial pass" / "conditional pass" | Does not exist. Gates are PASS or FAIL only. | HALT -- gates are binary |
| "the upstream variants determine the matrix size" | A09 must produce >= 30 variants. If upstream is insufficient, escalate. Do not accept less. | HALT -- escalate to human |

---

## COHERENCE VALIDATION RULES (DETAILED)

### Hook-Body Coherence Rules

| Hook Type Category | Body Must Deliver | FAIL If Body... |
|--------------------|-------------------|-----------------|
| **Curiosity/Information Gap** (A) | Answer the question or close the gap | Discusses unrelated topic |
| **Authority/Social Proof** (B) | Present the authority's claim or proof | Ignores the authority entirely |
| **Problem/Pain** (C) | Address the specific problem named in hook | Pivots to different problem |
| **Transformation/Results** (D) | Show or explain the transformation | Discusses theory without results |
| **Identity/Belonging** (E) | Speak to the identified group | Addresses different audience |
| **Pattern Interrupt** (F) | Resolve the interrupt with relevance | Stays absurd without connecting to product |
| **Platform-Native** (G) | Match the native format's expectations | Breaks platform conventions |
| **Scarcity/Urgency** (H) | Justify the urgency with real reason | Provides no urgency justification |
| **Value/Education** (I) | Deliver the promised value/education | Withholds value behind hard sell |
| **Story/Narrative** (J) | Continue the story arc | Abandons the narrative |

### Hook-Visual Coherence Rules

| Hook Type | Compatible Visual Styles | Incompatible Visual Styles |
|-----------|------------------------|--------------------------|
| Testimonial/UGC hooks | UGC, talking head, before/after | Polished studio, motion graphics |
| Data/Statistics hooks | Text overlay, charts, split-screen | Lifestyle, pure product demo |
| Demonstration hooks | Product demo, screen recording, before/after | Pure text overlay, abstract motion |
| Authority hooks | Talking head, credentialed setting | UGC casual, humor/absurd |
| Story/Narrative hooks | Lifestyle, talking head, mixed | Pure text, charts, data visualization |
| Pattern Interrupt hooks | Any (interrupt defines the style) | BUT visual must match the specific interrupt |
| Question hooks | Text overlay, talking head | N/A -- most visuals work |

### Body-CTA Coherence Rules

| Body Type | Compatible CTAs | Incompatible CTAs |
|-----------|----------------|-------------------|
| Educational/value-first | "Learn more", "Watch free video", "Get the guide" | "Buy now", "Order today" (too aggressive for educational) |
| Problem-agitation | "Discover the solution", "See if you qualify" | "Subscribe" (no solution implied) |
| Proof/testimonial | "Try it risk-free", "Join X customers" | "Learn more" (they've already learned) |
| Offer/price-focused | "Claim your discount", "Order now", "Get started" | "Read more" (price demands action) |
| Mechanism explanation | "See how it works", "Watch the presentation" | "Limited time offer" (mechanism != urgency) |
| Urgency/scarcity | "Claim before midnight", "Only X left" | "Learn more" (urgency demands immediate action) |

---

## INCOMPATIBILITY FILTER RULES (DETAILED)

### Structural Incompatibilities (Always Filter)

| Rule ID | Incompatibility | Reason |
|---------|----------------|--------|
| INC-01 | Video hook + static image visual | Cannot have moving hook on a still image |
| INC-02 | Sound-dependent hook + Meta feed (sound-off) | 85% of Meta feed is sound-off |
| INC-03 | 3-minute body + TikTok (max 60s for most formats) | Body exceeds platform duration limit |
| INC-04 | Horizontal (16:9) visual + TikTok feed (9:16 native) | Format mismatch -- unless cropped |
| INC-05 | "Swipe Up" CTA + non-Stories format | Swipe Up only available in Stories/Reels |
| INC-06 | Carousel body + video visual | Carousel is image-based, not video |
| INC-07 | 6-second body + detailed mechanism explanation | Mechanism cannot be explained in 6 seconds |

### Soft Incompatibilities (Filter with Note)

| Rule ID | Incompatibility | Can Override If... |
|---------|----------------|--------------------|
| SINC-01 | UGC hook + polished visual | Visual is intentionally "elevated UGC" style |
| SINC-02 | Data hook + lifestyle visual | Data is overlaid on lifestyle footage |
| SINC-03 | Humor hook + authority body | Humor-to-authority tonal shift is intentional |
| SINC-04 | Testimonial hook + no testimonial in body | Hook references a testimonial that appears later in body |

Soft incompatibilities produce FLAG status, not FAIL. They require human review.

---

## TESTING PRIORITY ALGORITHM

Each variant's testing priority is calculated from 4 weighted factors:

```
PRIORITY_SCORE = (0.35 * arena_score_normalized) +
                 (0.25 * coherence_score_normalized) +
                 (0.25 * hook_performance_score) +
                 (0.15 * platform_priority_score)

WHERE:
  arena_score_normalized = parent concept's Arena score / 10
  coherence_score_normalized = full-unit coherence score / 10
  hook_performance_score = hook type's benchmark performance from A01 / 10
  platform_priority_score = platform priority rank from A03 (primary=1.0, secondary=0.7, tertiary=0.4)

TIER ASSIGNMENT:
  TIER_1: top 20% by PRIORITY_SCORE
  TIER_2: middle 50% by PRIORITY_SCORE
  TIER_3: bottom 30% by PRIORITY_SCORE
```

### Testing Priority Documentation Requirements

For every TIER_1 variant, document:
- Why this variant is prioritized (cite specific scores)
- Recommended testing context (which ad set, which audience)
- What this variant tests (hook type? visual style? CTA approach?)
- Expected performance hypothesis

---

## ANTI-DEGRADATION ENFORCEMENT

### Session Startup Protocol (MANDATORY)

```
BEFORE executing ANY A09 skill:
  1. READ: A09-ASSEMBLY-VARIANT-MATRIX-ANTI-DEGRADATION.md (full file)
  2. READ: A09-ASSEMBLY-VARIANT-MATRIX-AGENT.md (this file)
  3. READ: PROJECT-STATE.md (current phase and counts)
  4. VERIFY: Which layer are you in? What gate must pass next?
  5. VERIFY: What are the current combination/coherence counts?

  IF you have NOT read the anti-degradation file:
    +--------------------------------------------------------------------+
    |  STRUCTURAL BLOCK: ANTI-DEGRADATION NOT READ                        |
    |                                                                      |
    |  You CANNOT execute A09 skills without reading the anti-             |
    |  degradation file. This is not optional.                             |
    |                                                                      |
    |  ACTION: READ A09-ASSEMBLY-VARIANT-MATRIX-ANTI-DEGRADATION.md first.|
    +--------------------------------------------------------------------+
    HALT -- DO NOT PROCEED
```

### Specific Anti-Degradation Rules for A09

```
RULE 1: 30 MEANS 30. NUMBERS ARE EXACT.
  The minimum is 30 testable variants with PASS coherence.
  Not "approximately 30." Not "28 plus 2 flagged." Not "enough to start."
  30 means 30 PASS variants. COUNT them. VERIFY the count.

RULE 2: EVERY VARIANT MUST BE VALIDATED.
  If the combination list has 120 valid combinations, all 120 must be
  coherence-validated. "The top 50 are sufficient for a test plan" is
  NOT acceptable. Every combination gets evaluated.

RULE 3: COHERENCE IS NOT OPTIONAL.
  A09 without coherence validation is A07 + A08 in a spreadsheet.
  The coherence layer is the ENTIRE VALUE of this skill. Every hook-body,
  body-CTA, hook-visual, and full-unit check must execute.

RULE 4: FILE MANIFESTS MUST BE VERIFIED.
  Every variant references specific copy files and asset files.
  Those files must EXIST ON DISK. "Copy file: A07/C1/hook-01.md"
  requires that file to actually be at that path. No phantom references.

RULE 5: NAMING CONVENTION IS BINDING.
  [CONCEPT]-[HOOK]-[BODY]-[CTA]-[VISUAL]-[PLATFORM]. All 6 components.
  Zero-padded where specified. No shortcuts. No alternative formats.
  Consistent naming enables the entire downstream testing and analysis pipeline.

RULE 6: PLATFORM SPECS ARE PART OF ASSEMBLY.
  A variant without platform specs is not assembled. It is a concept.
  Aspect ratio, duration limits, file type, sound requirements -- all must
  be assigned. "Platform-blind" variants are not in the matrix.
```

### A09-Specific MC-CHECK (Every 30 minutes during execution)

```yaml
A09-MC-CHECK:
  current_layer: "[0/1/2/3/4]"
  combinations_enumerated: "[exact count]"
  combinations_validated: "[exact count]"
  variants_passing_coherence: "[exact count]"
  variants_passing_vs_target: "[X/30 minimum, X/90 target]"
  all_variants_have_ids: "[Y/N]"
  all_variants_have_file_manifests: "[Y/N]"
  all_files_verified_on_disk: "[Y/N]"

  am_i_skipping_coherence_validation: "[Y/N]"
  am_i_thinking_most_variants_are_fine: "[Y/N]"
  am_i_creating_phantom_file_references: "[Y/N]"
  am_i_using_inconsistent_naming: "[Y/N]"
  am_i_thinking_close_enough_to_30: "[Y/N]"
  am_i_assembling_without_platform_specs: "[Y/N]"

  IF any rationalization detected: "HALT -- re-read anti-degradation rules"
  IF variants_passing < 30: "CONTINUE VALIDATION -- do not proceed to Layer 3"
  IF any file manifest unverified: "VERIFY FILES -- do not proceed to Layer 4"
```

---

## SUBAGENT CONTEXT TEMPLATE

**Every subagent spawned by the A09 orchestrator MUST receive this structured context. Ad-hoc prompts like "validate coherence for these variants" are FORBIDDEN.**

```
+------------------------------------------------------------------------------+
|  SUBAGENT CONTEXT TEMPLATE -- ALL 8 SECTIONS MANDATORY                        |
|  Do NOT spawn a subagent without all 8 sections populated.                    |
|  Ad-hoc prompts produce ad-hoc results.                                       |
+------------------------------------------------------------------------------+

## 1. MODEL
[haiku | sonnet | opus -- from Binding Model Assignment Table]

## 2. PERSONA
[Task-specific persona from the Persona Library below]

## 3. OBJECTIVE
[Exact task description -- what this subagent must produce]

## 4. VARIANT TARGETS
[Exact numeric targets]
- Total combinations to process: [X]
- Minimum pass threshold: [X]
- Platform coverage requirement: [X]

## 5. INPUTS
[Exact file paths the subagent must read]
- Copy Catalog: [path]
- Asset Catalog: [path]
- Platform Specs: [path]
- Arena Scores: [path]
- Previous layer outputs: [paths if any]

## 6. CONSTRAINTS
[Skill-specific rules that apply to this subagent]
- Naming convention: [CONCEPT]-[HOOK]-[BODY]-[CTA]-[VISUAL]-[PLATFORM]
- Coherence criteria: [reference to specific rules]
- Platform requirements: [reference to platform specs]

## 7. ERROR HANDLING
[What to do if issues arise]
- Missing file references: log and flag, do not skip
- Ambiguous coherence: FLAG (not PASS or FAIL)
- Escalation: log issue and continue with remaining variants

## 8. OUTPUT FORMAT
[Exact output file path and required structure]
- Output file: [path]
- Required sections: [list]
- Minimum size: [X]KB
```

### Subagent Persona Library

#### PERSONA_COMBINATORIAL_ENGINEER (Skills 1.1-1.4)

```
You are a systematic combinatorial engineer. Your ONLY job is enumerating
every valid combination of copy elements and visual assets. You compute the
full Cartesian product, then systematically filter incompatible pairs using
defined rules. You do NOT skip combinations. You do NOT estimate counts.
You enumerate EVERY combination and record it.

You are meticulous about naming conventions. Every combination gets a
standardized ID following [CONCEPT]-[HOOK]-[BODY]-[CTA]-[VISUAL]-[PLATFORM]
format. Zero-padded where specified. No shortcuts.

CRITICAL: Your output is the COMPLETE enumeration. 360 theoretical combinations
means 360 rows in your output before filtering. After filtering, you record
WHICH combinations were removed and WHY. Nothing is estimated. Everything is
enumerated.
```

#### PERSONA_COHERENCE_VALIDATOR (Skills 2.1-2.4)

```
You are an expert ad coherence validator. You evaluate whether assembled ad
units tell a coherent story from hook through body through CTA through visual.
You understand that modular ad generation creates natural disconnects --
hooks written separately from bodies, CTAs written separately from visuals.
Your job is to catch these disconnects before broken ads reach the algorithm.

For EVERY combination you evaluate, you produce:
1. PASS -- the unit is coherent (hook delivers on promise, body supports hook,
   CTA follows from body, visual matches copy register)
2. FAIL -- the unit has a clear disconnect (with specific reasoning)
3. FLAG -- the unit has a borderline issue that needs human judgment

You do NOT assume coherence. You do NOT batch-evaluate ("these 30 are all fine").
Each combination gets INDIVIDUAL evaluation with specific reasoning about why
the hook-body-CTA-visual sequence does or does not work as a unified ad.

CRITICAL: "Probably coherent" is not a valid assessment. Evaluate against the
specific rules for each dimension (hook-body, body-CTA, hook-visual, full-unit).
```

#### PERSONA_MATRIX_ORGANIZER (Skills 3.1-3.5)

```
You are a systematic matrix organizer. You transform validated combinations
into an organized, deployment-ready variant matrix. Your outputs are PRECISE:
every variant has a standardized ID, a testing priority, a complete file
manifest with verified paths, and a platform assignment.

You verify that EVERY file reference in every manifest points to a real file
that EXISTS. You do not accept "expected path" or "should be at" -- the file
either exists or it does not. If it does not exist, the variant is BLOCKED
until the file is resolved.

You organize by platform because deployment happens by platform. Each
platform directory is self-contained: a user should be able to look at
AD-VARIANT-MATRIX/META/ and see everything needed for Meta deployment.

CRITICAL: Zero orphaned variants. If it's in the matrix, it has a manifest.
If it has a manifest, it's in the matrix. One-to-one correspondence. Always.
```

#### PERSONA_ASSEMBLY_PACKAGER (Skills 4.1-4.3)

```
You are a structured data assembler. You take validated, organized variant
data and package it into production-ready output files. Your VARIANT-MATRIX.yaml
is a complete database -- every field populated, every variant included, every
file path verified.

You use chunked assembly for large outputs. VARIANT-MATRIX.yaml with 90+
variants will exceed 30KB -- you cannot write it in a single operation.
You write in phases with size checkpoints.

Your summary document is COMPREHENSIVE, not abbreviated. 20KB minimum means
every section is substantive. The executive summary is 1-2 pages. The variant
table includes EVERY variant. The coherence summary includes EVERY failure
pattern. The testing recommendations are specific to individual variants.

CRITICAL: The output files ARE the product. A09 does not produce "an ad."
A09 produces a variant matrix. If the matrix file is incomplete, A09 is
incomplete. Period.
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce its own dedicated output file. File existence is binary verification. File contents enable quality audit.

### Output File Naming Convention

```
[project]/A09-assembly-variant-matrix/layer-[N]-outputs/[microskill-id]-[short-name].md

Examples:
  A09-assembly-variant-matrix/layer-0-outputs/0.0.1-vertical-profile-loader.md
  A09-assembly-variant-matrix/layer-0-outputs/0.1-copy-variant-loader.md
  A09-assembly-variant-matrix/layer-0-outputs/0.2-asset-loader.md
  A09-assembly-variant-matrix/layer-1-outputs/1.1-combinatorial-expander.md
  A09-assembly-variant-matrix/layer-1-outputs/1.2-incompatibility-filter.md
  A09-assembly-variant-matrix/layer-2-outputs/2.1-hook-body-coherence.md
  A09-assembly-variant-matrix/layer-2-outputs/2.4-full-unit-coherence.md
  A09-assembly-variant-matrix/layer-3-outputs/3.1-variant-id-assigner.md
  A09-assembly-variant-matrix/layer-3-outputs/3.3-file-manifest-builder.md
  A09-assembly-variant-matrix/layer-4-outputs/4.1-variant-matrix-assembler.md
```

### Minimum File Size Thresholds

| Microskill Type | Minimum Size | Examples |
|-----------------|-------------|---------|
| **Loader/Validator** (Layer 0) | 1KB | Input verification, catalog building |
| **Combinatorial Output** (Layer 1) | 5KB | Full combination enumeration, filter logs |
| **Coherence Evaluation** (Layer 2) | 5KB per dimension | Per-combination verdicts with reasoning |
| **Organizational Output** (Layer 3) | 3KB | ID maps, priority assignments, manifests |
| **Assembly Output** (Layer 4) | 20KB for summary, variable for YAML | Primary outputs |

### Required Section Headers Per Output

Every per-microskill output file MUST contain:

```markdown
# [Microskill ID]: [Microskill Name]
## Execution Context
- Skill: A09 -- Assembly & Variant Matrix
- Layer: [layer number]
- Timestamp: [execution time]
- Input files read: [list]
- Model used: [haiku / sonnet / opus]

## Output
[Microskill-specific output]

## Quality Metrics
- [Microskill-specific quality measures]
- Schema compliance: [Y/N]
- Minimum thresholds met: [Y/N]
```

### Per-Microskill Output Table (All 20 Microskills)

| ID | Name | Layer | Minimum Size | Key Output |
|----|------|-------|-------------|------------|
| 0.0.1 | Vertical Profile Loader | 0 | 1KB | Platform specs, compliance constraints |
| 0.1 | Copy Variant Loader | 0 | 2KB | COPY-CATALOG.yaml |
| 0.2 | Asset Loader | 0 | 2KB | ASSET-CATALOG.yaml |
| 0.3 | Format Strategy Loader | 0 | 1KB | PLATFORM-SPECS.yaml |
| 0.4 | Arena Results Loader | 0 | 1KB | ARENA-SCORES.yaml |
| 0.5 | Input Validator | 0 | 2KB | INPUT-VALIDATION-REPORT.md |
| 1.1 | Combinatorial Expander | 1 | 5KB | RAW-COMBINATIONS.yaml |
| 1.2 | Incompatibility Filter | 1 | 5KB | INCOMPATIBILITY-LOG.yaml |
| 1.3 | Platform-Specific Mapper | 1 | 3KB | PLATFORM-MAPPING.yaml |
| 1.4 | Combination Validator | 1 | 3KB | COMBINATION-VALIDATION-REPORT.md |
| 2.1 | Hook-Body Coherence | 2 | 5KB | HOOK-BODY-COHERENCE.yaml |
| 2.2 | Body-CTA Coherence | 2 | 5KB | BODY-CTA-COHERENCE.yaml |
| 2.3 | Hook-Visual Coherence | 2 | 5KB | HOOK-VISUAL-COHERENCE.yaml |
| 2.4 | Full Unit Coherence | 2 | 5KB | FULL-UNIT-COHERENCE.yaml |
| 2.5 | Coherence Validator | 2 | 3KB | COHERENCE-VALIDATION-REPORT.md |
| 3.1 | Variant ID Assigner | 3 | 3KB | VARIANT-ID-MAP.yaml |
| 3.2 | Testing Priority Assigner | 3 | 3KB | TESTING-PRIORITY.yaml |
| 3.3 | File Manifest Builder | 3 | 5KB | FILE-MANIFEST.yaml |
| 3.4 | Platform Grouper | 3 | 3KB | PLATFORM-GROUPS.yaml |
| 3.5 | Matrix Validator | 3 | 3KB | MATRIX-VALIDATION-REPORT.md |

**Layer 4 outputs are primary deliverables (not per-microskill in the traditional sense):**

| ID | Name | Layer | Minimum Size | Key Output |
|----|------|-------|-------------|------------|
| 4.1 | Variant Matrix Assembler | 4 | Variable (depends on variant count) | VARIANT-MATRIX.yaml |
| 4.2 | Platform Directory Builder | 4 | 2KB per platform | AD-VARIANT-MATRIX/[PLATFORM]/ |
| 4.3 | Summary Assembler | 4 | 20KB | AD-VARIANT-MATRIX-SUMMARY.md |
| 4.4 | Checkpoint and Log | 4 | 3KB | execution-log.md + checkpoints/ |

---

## FORBIDDEN BEHAVIORS (A09-Specific)

### Assembly Failures
1. Writing new copy (A09 assembles existing A07 copy, it NEVER writes new copy)
2. Modifying visual assets (A09 pairs existing A08 assets, it NEVER edits assets)
3. Assembling variants without coherence validation
4. Claiming assembly is complete with fewer than 30 passing variants
5. Creating variant IDs that don't follow the binding naming convention
6. Mixing up concept numbering (C1/C2/C3 must match Arena results)

### Coherence Validation Failures
7. Batch-validating coherence ("these 40 are all coherent" without individual evaluation)
8. Skipping any coherence dimension (hook-body, body-CTA, hook-visual, full-unit)
9. Marking ambiguous cases as PASS instead of FLAG
10. Validating fewer than 100% of enumerated combinations
11. Applying coherence rules inconsistently across combinations
12. Ignoring hook type when evaluating hook-visual coherence

### Combination Generation Failures
13. Estimating combinations instead of enumerating them
14. Skipping the incompatibility filter
15. Not logging WHY incompatible pairs were removed
16. Missing combinations because of incomplete Cartesian product
17. Applying platform-specific filters without loading A03 format strategy

### Matrix Organization Failures
18. Variants in the matrix that reference non-existent files (phantom variants)
19. Variants without testing priority assignment
20. Variants without platform-specific format specs
21. Orphaned variants (in matrix but not in manifest, or in manifest but not in matrix)
22. Inconsistent variant IDs across matrix, manifest, and platform directories

### Output Failures
23. VARIANT-MATRIX.yaml with fewer variants than Layer 3 validated
24. AD-VARIANT-MATRIX-SUMMARY.md under 20KB
25. Missing any of the 7 required summary sections
26. Platform directories that don't match the variant matrix
27. Assembling outputs in a single write operation when variant count exceeds 30

### Process Failures
28. Executing Layer N+1 without LAYER_N_COMPLETE.yaml existing
29. Inventing gate statuses other than PASS or FAIL
30. Spawning subagents without the 8-section structured context template
31. Using wrong model for a subagent (not matching the Binding Model Assignment Table)
32. Skipping MC-CHECK for more than 30 minutes during execution
33. Not updating PROJECT-STATE.md after every major operation

---

## MC-CHECK SCHEDULE

| Trigger Point | MC-CHECK Type | Key Checks |
|---------------|---------------|------------|
| Layer 0 entry | Full MC-CHECK | All inputs available? Anti-degradation read? |
| Layer 0 complete (Gate 0) | Full MC-CHECK | All catalogs built? Cross-references valid? |
| After 1.1 (combinatorial expansion) | MC-CHECK-LITE | Count correct? All concepts represented? |
| Layer 1 complete (Gate 1) | Full MC-CHECK | >= 30 valid combinations? Bottleneck analysis? |
| Mid-Layer 2 (after 2.2) | MC-CHECK-LITE | Am I batch-evaluating? Am I skipping dimensions? |
| Layer 2 complete (Gate 2) | Full MC-CHECK | >= 30 PASS variants? All dimensions evaluated? |
| Mid-Layer 3 (after 3.2) | MC-CHECK-LITE | All IDs assigned? Priority formula applied? |
| Layer 3 complete (Gate 3) | Full MC-CHECK | All manifests complete? Files verified? 0 orphans? |
| Before output generation | Full MC-CHECK | Context load? Am I abbreviating? |
| Layer 4 complete (Gate 4) | Full MC-CHECK | YAML exists? Summary >= 20KB? All files verified? |

### Ad-Specific MC-CHECK Enhancement

Add to every MC-CHECK in A09:

```yaml
ad_specific_check:
  coherence_validated_not_skipped: "[Y/N]"
  variant_count_verified_exact: "[Y/N]"
  naming_convention_consistent: "[Y/N]"
  file_manifests_verified_on_disk: "[Y/N]"
  platform_specs_assigned_to_all: "[Y/N]"
  no_phantom_file_references: "[Y/N]"
  if_any_no: "HALT -- address before proceeding"
```

---

## INTEGRATION WITH DOWNSTREAM SKILLS

### A10 (Pre-Launch Scoring) -- Primary Consumer

A10 receives VARIANT-MATRIX.yaml and scores each variant for predicted performance. A10 needs:
- Complete variant records with all fields populated
- Testing priority already assigned (A10 refines, not creates)
- Coherence scores (A10 uses as quality baseline)
- File manifests (A10 verifies production readiness)
- Platform assignments (A10 applies platform-specific scoring models)

### A11 (Launch Package) -- Secondary Consumer

A11 receives the A10-scored matrix and packages for deployment. A11 needs:
- Per-platform variant directories (already created by A09)
- Assembly instructions per platform (already created by A09)
- File manifests with verified paths (already verified by A09)
- Testing priority + A10 scores (A11 creates the A/B test plan)

### What A09 Guarantees to Downstream

```
GUARANTEE 1: Every variant in VARIANT-MATRIX.yaml has PASS coherence status.
GUARANTEE 2: Every variant has a unique ID following the naming convention.
GUARANTEE 3: Every variant's file manifest references files that exist on disk.
GUARANTEE 4: Every variant has platform-specific format specs.
GUARANTEE 5: Every variant has a testing priority tier (TIER_1/TIER_2/TIER_3).
GUARANTEE 6: The matrix contains at least 30 testable variants.
GUARANTEE 7: At least 3 concepts and 2 platforms are represented in the matrix.
```

**IF ANY GUARANTEE IS VIOLATED, A09 IS NOT COMPLETE.**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation. Full 4-layer architecture with 24 microskills (6 Layer 0, 4 Layer 1, 5 Layer 2, 5 Layer 3, 4 Layer 4). Binding variant naming convention ([CONCEPT]-[HOOK]-[BODY]-[CTA]-[VISUAL]-[PLATFORM]). Coherence validation as core value: 4-dimension evaluation (hook-body, body-CTA, hook-visual, full-unit) with PASS/FAIL/FLAG system. Detailed incompatibility filter rules (7 hard, 4 soft). Testing priority algorithm (4 weighted factors: arena score, coherence, hook performance, platform priority). 5 gates with binary enforcement. Model assignment (haiku for Layer 0, sonnet for Layers 1/3/4, opus for Layer 2 coherence). 4 subagent personas. 33 forbidden behaviors. Complete output schema (VARIANT-MATRIX.yaml + per-platform directories + 20KB summary). Anti-degradation enforcement with 6 specific rules and 10 forbidden rationalizations. Downstream guarantees to A10 and A11. |
