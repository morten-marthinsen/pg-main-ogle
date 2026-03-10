# A11 -- Launch Package

**Version:** 1.0
**Created:** 2026-02-22
**Role:** Workflow Orchestrator (State Machine)
**Skill Type:** Packaging / Delivery
**Pipeline Position:** Penultimate Ad Engine skill. Executes after A10 (Pre-Launch Scoring). Feeds A12 (Performance Learning Loop) post-launch.
**Related Documents:**
- `./ads/AD-ENGINE.md` (Ad Engine master)
- `~system/SYSTEM-CORE.md` (system governance -- metacognitive, gates, anti-degradation)
- `./References/AD-HOOK-TAXONOMY.md` (32 hook types, 10 categories)
- `./References/AD-SCRIPT-STRUCTURES.md` (8 frameworks, platform specs)
**Anti-Degradation Document:** `A11-LAUNCH-PACKAGE-ANTI-DEGRADATION.md` (MANDATORY -- read BEFORE execution)

---

## TABLE OF CONTENTS

- [THE 3 LAWS OF LAUNCH PACKAGING (Never Scroll Past This)](#the-3-laws-of-launch-packaging-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [MODEL ASSIGNMENT TABLE (Binding)](#model-assignment-table-binding)
- [STATE MACHINE](#state-machine)
- [PLATFORM SPECIFICATION REFERENCE (NON-NEGOTIABLE)](#platform-specification-reference-non-negotiable)
- [NAMING CONVENTION (CRITICAL)](#naming-convention-critical)
- [LAYER ARCHITECTURE](#layer-architecture)
- [MANDATORY FIRST READS](#mandatory-first-reads)
- [LAUNCH TARGETS](#launch-targets)
- [GATE ENFORCEMENT](#gate-enforcement)
- [FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)](#forbidden-rationalizations-immediate-halt)
- [Current Phase](#current-phase)
- [Package Counts](#package-counts)
- [Compliance Status](#compliance-status)
- [Gate Status](#gate-status)
- [Key Decisions](#key-decisions)
- [Next Action](#next-action)
- [Timestamp](#timestamp)
- [OUTPUT SCHEMA: LAUNCH-PACKAGE/](#output-schema-launch-package)
- [OUTPUT SCHEMA: LAUNCH-GUIDE.md](#output-schema-launch-guidemd)
- [1. Executive Summary](#1-executive-summary)
- [2. Package Contents](#2-package-contents)
- [3. Meta (Facebook + Instagram) Setup Guide](#3-meta-facebook--instagram-setup-guide)
- [4. TikTok Setup Guide](#4-tiktok-setup-guide)
- [5. YouTube Setup Guide](#5-youtube-setup-guide)
- [6. Google Display Setup Guide](#6-google-display-setup-guide)
- [7. Campaign Structure Walkthrough](#7-campaign-structure-walkthrough)
- [8. Audience Targeting Walkthrough](#8-audience-targeting-walkthrough)
- [9. Budget & Testing Walkthrough](#9-budget--testing-walkthrough)
- [10. Launch Sequence](#10-launch-sequence)
- [11. Tracking & Compliance](#11-tracking--compliance)
- [12. Launch Checklist](#12-launch-checklist)
- [NON-NEGOTIABLE THRESHOLDS](#non-negotiable-thresholds)
- [ANTI-DEGRADATION PATTERNS](#anti-degradation-patterns)
- [AD-SPECIFIC ANTI-DEGRADATION PROTOCOL](#ad-specific-anti-degradation-protocol)
- [PER-MICROSKILL OUTPUT PROTOCOL](#per-microskill-output-protocol)
- [FORBIDDEN BEHAVIORS](#forbidden-behaviors)
- [MC-CHECK SCHEDULE](#mc-check-schedule)
- [CAMPAIGN STRUCTURE REFERENCE](#campaign-structure-reference)
- [BUDGET DISTRIBUTION REFERENCE](#budget-distribution-reference)
- [INTEGRATION WITH A12 (PERFORMANCE LEARNING LOOP)](#integration-with-a12-performance-learning-loop)
- [VERSION HISTORY](#version-history)

---

## THE 3 LAWS OF LAUNCH PACKAGING (Never Scroll Past This)

1. **Launch-ready means COMPLETE.** A launch package with missing files, wrong aspect ratios, absent UTM parameters, or incomplete naming conventions is NOT launch-ready. The media buyer must be able to take this package and go live without asking a single question. If they have to ask, the package failed.

2. **Platform specs are non-negotiable.** Meta requires H.264 MP4 under 4GB at specific aspect ratios. TikTok requires 1080x1920 under 500MB at 5-60 seconds. YouTube requires 1920x1080 with 1280x720 thumbnails. Google Display has its own size matrix. There is no "close enough" for platform specs. An ad that cannot upload is an ad that does not exist.

3. **The package serves the media buyer.** Every file name, every folder structure, every campaign recommendation exists to make the media buyer's job faster and easier. This is NOT organized for the creative team. Creative work is done. This is organized for LAUNCH -- campaign hierarchy, audience targeting suggestions, budget distribution, test plan, and go-live sequence. The media buyer's workflow dictates the package structure.

---

## CRITICAL: READ THIS FIRST

This file exists because **launch packaging has its own degradation patterns** distinct from creative generation and scoring:

1. **Incomplete packages** -- LLM assembles "the main things" (ad files, maybe a brief) but misses tracking setup, compliance final check, naming conventions, or campaign structure. Media buyer opens the package and immediately has 20 questions.

2. **Wrong file specifications** -- Ad files are produced at wrong dimensions, wrong codec, wrong file size. An ad that cannot upload to the platform literally does not exist. "Close enough" to the spec is a rejected upload.

3. **Creative-team organization** -- Package is organized by concept or creative stage (Hook A, Hook B, Variant 1) instead of by platform and campaign structure. Media buyer has to mentally reorganize everything before they can set up campaigns.

4. **Missing campaign structure** -- Package contains ad files but no guidance on campaign/ad set/ad hierarchy, no testing methodology, no audience suggestions, no budget recommendations. Media buyer has to make all strategic decisions themselves.

5. **Naming convention chaos** -- Files named with internal IDs that mean nothing in-platform. "HK-A3-BODY-2-CTA-1-VIS-B.mp4" tells the media buyer nothing when they're looking at 90 ads inside Ads Manager. Names must be human-readable AND traceable back to the variant matrix.

6. **Missing compliance final check** -- Creative passed A10 scoring but nobody verified platform policy compliance for the SPECIFIC platform it's being uploaded to. Ad gets rejected, campaign launch delayed.

7. **No launch sequence** -- All variants dumped at once with no guidance on what to test first, when to add backup variants, or when to kill underperformers. Media buyer flies blind.

**This file is the fix.** Before executing A11, read the relevant sections below.

---

## PURPOSE

Produce the **FINAL LAUNCH-READY package** -- everything a media buyer needs to set up and launch the ad campaign across all target platforms. This is the "last mile" between scored creative (A10) and live ads.

A11 answers the questions that media buyers ask BEFORE they touch Ads Manager:
- Where are my final ad files, organized by platform, in the correct specs?
- What is the campaign structure -- how many campaigns, ad sets, and ads?
- What audiences should I target, and how should I structure the testing?
- How should I distribute the budget across platforms and variants?
- What goes live first? What are the backup variants? When do I kill losers?
- Are all ads compliant with platform policies?
- What are the UTM parameters for tracking?
- What is the naming convention for in-platform ad naming?

**Success Criteria:**
- All approved variants from A10 packaged by platform with correct file specifications
- Campaign structure recommendations for every target platform
- Audience targeting suggestions (broad, interest, lookalike, retargeting) with rationale
- Budget distribution recommendations per platform and per test phase
- Launch sequence with Phase 1 (initial test), Phase 2 (backup deploy), Phase 3 (scale/kill decisions)
- Complete compliance review -- every ad checked against its target platform's policies
- UTM parameter structure defined with consistent taxonomy
- In-platform naming convention defined (human-readable + traceable to variant matrix)
- Launch checklist with every pre-launch item verified
- LAUNCH-PACKAGE/ directory with all files organized for media buyer workflow
- LAUNCH-GUIDE.md produced at 30KB+ minimum

This agent is a **workflow orchestrator**. It delegates platform packaging, campaign structuring, compliance review, and documentation to subagents and validates outputs at each gate. It produces the final deliverable that the media buyer takes into Ads Manager.

---

## IDENTITY

**This skill IS:**
- The final packaging and delivery system for ad campaigns
- The media buyer's complete launch kit -- organized for THEIR workflow
- The platform specification enforcer -- every file meets exact platform requirements
- The campaign structure recommender -- hierarchy, audiences, budgets, test plan
- The compliance final checkpoint -- every ad reviewed against platform policies before launch
- The bridge between creative/strategic work (A01-A10) and live campaign execution
- The launch sequence planner -- what goes first, what's backup, what gets killed

**This skill is NOT:**
- A creative tool (all copy was written in A04/A07 -- A11 does NOT modify ad copy)
- A visual production tool (all assets were produced in A08 -- A11 does NOT create visuals)
- A scoring/evaluation tool (all scoring was done in A10 -- A11 does NOT re-score)
- A media buying decision-maker (A11 RECOMMENDS structure and targeting -- the media buyer DECIDES)
- A performance analysis tool (that is A12, which runs post-launch with actual data)
- A variant assembly tool (that is A09 -- variants are already assembled before A11)
- An alternative to human media buying expertise (recommendations require human judgment and override)

**Upstream:** Receives SCORING-REPORT.md (A10), AD-VARIANT-MATRIX/ (A09), AD-ASSETS/ (A08), AD-COPY-FINAL/ (A07), FORMAT-STRATEGY.md (A03), Campaign Brief (Skill 09)
**Downstream:** Feeds LAUNCH-PACKAGE/ to media buyer for campaign setup. Feeds launch configuration to A12 (Performance Learning Loop) for post-launch performance tracking.

---

## MODEL ASSIGNMENT TABLE (Binding)

```
+--------------------------+--------------+----------+-------------------------------+
|  PHASE                   |  SKILLS      |  MODEL   |  REASON                       |
+--------------------------+--------------+----------+-------------------------------+
|  Pre-Execution           |  Infra       |  haiku   |  File creation, directory     |
|  infrastructure          |              |          |  setup -- mechanical only     |
+--------------------------+--------------+----------+-------------------------------+
|  Layer 0                 |  0.0.1-0.5   |  haiku   |  Loading, validation,         |
|  foundation              |              |          |  file existence checks --     |
|                          |              |          |  mechanical extraction        |
+--------------------------+--------------+----------+-------------------------------+
|  Layer 1                 |  1.1-1.6     |  sonnet  |  Platform packaging is        |
|  platform packaging      |              |          |  mechanical assembly --       |
|                          |              |          |  matching files to specs,     |
|                          |              |          |  renaming, organizing.        |
|                          |              |          |  Opus adds zero quality here. |
+--------------------------+--------------+----------+-------------------------------+
|  Layer 2                 |  2.1-2.5     |  opus    |  Campaign structure,          |
|  campaign structure      |              |          |  audience strategy, budget    |
|                          |              |          |  allocation require strategic |
|                          |              |          |  reasoning about platform     |
|                          |              |          |  dynamics and testing theory  |
+--------------------------+--------------+----------+-------------------------------+
|  Layer 3                 |  3.1-3.5     |  sonnet  |  Compliance checking is       |
|  launch prep             |              |          |  rule-matching (policy vs.    |
|                          |              |          |  creative). Documentation is  |
|                          |              |          |  structured assembly. Opus    |
|                          |              |          |  not needed.                  |
+--------------------------+--------------+----------+-------------------------------+
|  Layer 4                 |  4.1-4.3     |  sonnet  |  Assembly and formatting --   |
|  output                  |              |          |  structured packaging, not    |
|                          |              |          |  creative reasoning           |
+--------------------------+--------------+----------+-------------------------------+
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
  - Defaulting ALL subagents to opus (wastes tokens on packaging tasks)
  - Defaulting ALL subagents to haiku (loses quality on campaign structure)
  - Omitting the model parameter
  - Changing model mid-task without logging the switch
```

---

## STATE MACHINE

```
IDLE -> LOADING -> PACKAGING -> STRUCTURING -> LAUNCH_PREP -> OUTPUT -> COMPLETE
         |            |             |              |            |
         v            v             v              v            v
      [GATE_0]     [GATE_1]     [GATE_2]       [GATE_3]     [GATE_4]
      PASS/FAIL    PASS/FAIL    PASS/FAIL      PASS/FAIL    PASS/FAIL
         |            |             |              |            |
         +------------+-------------+--------------+------------+
                                      ^
                                      |
                                Max 3 expansion rounds
                                per gate, then
                                HUMAN ESCALATION
```

**State Transitions (VALID):**
- IDLE -> LOADING (always allowed)
- LOADING -> PACKAGING (only if GATE_0 = PASS)
- PACKAGING -> STRUCTURING (only if GATE_1 = PASS)
- STRUCTURING -> LAUNCH_PREP (only if GATE_2 = PASS)
- LAUNCH_PREP -> OUTPUT (only if GATE_3 = PASS)
- OUTPUT -> COMPLETE (only if GATE_4 = PASS)

**State Transitions (INVALID -- BLOCKED):**
- LOADING -> STRUCTURING (cannot skip platform packaging)
- PACKAGING -> LAUNCH_PREP (cannot skip campaign structure)
- ANY -> OUTPUT without GATE_3 passing
- ANY -> COMPLETE without GATE_4 passing

---

## PLATFORM SPECIFICATION REFERENCE (NON-NEGOTIABLE)

These are hard technical requirements. Files that do not meet these specs CANNOT be uploaded to the platform. There is no "close enough."

### Meta (Facebook + Instagram)

```
VIDEO:
  Codec: H.264
  Container: MP4
  Max file size: 4GB
  Max duration: 241 minutes (feed), 120s (Stories/Reels)
  Aspect ratios:
    Feed:    1:1 (1080x1080), 4:5 (1080x1350)
    Stories: 9:16 (1080x1920)
    Reels:   9:16 (1080x1920)
  Min resolution: 1080px on shortest side
  Frame rate: 30fps recommended
  Audio: AAC, 128kbps+ stereo

STATIC IMAGE:
  Format: JPG or PNG
  Max file size: 30MB
  Aspect ratios: 1:1 (1080x1080), 4:5 (1080x1350), 9:16 (1080x1920)
  Text overlay: < 20% of image area (guideline, not hard rule since 2020, but still affects distribution)

CAROUSEL:
  2-10 cards
  All cards same aspect ratio
  Per-card: same specs as static image
```

### TikTok

```
VIDEO:
  Codec: H.264 or H.265
  Container: MP4 or MOV
  Max file size: 500MB
  Duration: 5-60 seconds (recommended 21-34s for best performance)
  Aspect ratio: 9:16 (1080x1920)
  Min resolution: 720x1280
  Frame rate: 24-60fps
  Audio: AAC or MP3

STATIC IMAGE (Spark Ads):
  Format: JPG or PNG
  Max file size: 100MB (unlikely to hit)
  Aspect ratio: 9:16 (1080x1920)
```

### YouTube

```
VIDEO:
  Codec: H.264 (recommended), VP9
  Container: MP4, MOV, AVI, WMV, FLV
  Max file size: 128GB (or 12 hours, whichever is less)
  Aspect ratios:
    Standard:    16:9 (1920x1080)
    Shorts:      9:16 (1080x1920)
    Bumper ads:  16:9 (1920x1080), 6 seconds max
    Pre-roll:    16:9 (1920x1080), 15-30 seconds
    Skippable:   16:9 (1920x1080), any length (5s skip point)
  Min resolution: 1920x1080
  Frame rate: 24-60fps
  Audio: AAC, 48kHz

THUMBNAIL:
  Resolution: 1280x720
  Format: JPG, PNG, GIF, BMP
  Max file size: 2MB
  Aspect ratio: 16:9
```

### Google Display Network

```
RESPONSIVE DISPLAY ADS (Recommended):
  Images: at least one 1200x628 landscape + one 1200x1200 square
  Logos: 1200x1200 square + 1200x300 landscape
  Format: JPG, PNG (no animated GIF for responsive)
  Max file size: 5120KB per asset

STANDARD DISPLAY SIZES:
  Leaderboard:       728x90
  Medium Rectangle:  300x250
  Half Page:         300x600
  Large Rectangle:   336x280
  Billboard:         970x250
  Skyscraper:        160x600
  Mobile Banner:     320x50
  Mobile Interstitial: 320x480
  Format: JPG, PNG, GIF (animated OK), HTML5
  Max file size: 150KB per asset (standard), 5120KB (responsive)
```

### Spec Validation Rule

```
FOR EVERY AD FILE IN THE LAUNCH PACKAGE:
  1. CHECK file format matches platform requirement
  2. CHECK resolution matches target placement
  3. CHECK file size is under platform maximum
  4. CHECK duration is within platform limits (video only)
  5. CHECK aspect ratio matches target placement
  6. CHECK codec matches platform requirement (video only)
  7. CHECK audio format and bitrate (video only)

IF ANY CHECK FAILS:
  -> Flag the file with specific failure reason
  -> DO NOT include non-compliant files in launch package
  -> Return to A08/A09 for re-export at correct specs
  -> GATE_1 remains CLOSED until all files pass
```

---

## NAMING CONVENTION (CRITICAL)

Every ad file and every in-platform ad name must follow a consistent naming convention that is BOTH human-readable AND traceable to the variant matrix from A09.

### File Naming Convention

```
[PLATFORM]-[CONCEPT]-[HOOK]-[BODY]-[CTA]-[VISUAL]-[PLACEMENT].[ext]

Examples:
  META-C1-HK03-BD01-CT02-VIS-A-FEED.mp4
  META-C1-HK03-BD01-CT02-VIS-A-STORY.mp4
  TIKTOK-C2-HK07-BD02-CT01-VIS-B.mp4
  YOUTUBE-C1-HK01-BD01-CT03-VIS-A-PREROLL.mp4
  GOOGLE-C3-HK12-BD01-CT01-VIS-C-300x250.jpg

Where:
  PLATFORM:  META, TIKTOK, YOUTUBE, GOOGLE
  CONCEPT:   C1, C2, C3 (maps to winning concept from A06/A10)
  HOOK:      HK01-HK99 (maps to hook ID from A02 HOOK-ANGLE-MATRIX)
  BODY:      BD01-BD99 (maps to body version from A04 SCRIPT-PACKAGE)
  CTA:       CT01-CT99 (maps to CTA version)
  VISUAL:    VIS-A, VIS-B, VIS-C (maps to visual treatment from A05)
  PLACEMENT: FEED, STORY, REEL, PREROLL, BUMPER, SHORTS, or display size
  ext:       mp4, jpg, png
```

### In-Platform Ad Naming Convention

The name as it appears inside Ads Manager / TikTok Ads / Google Ads:

```
[Date]-[Concept]-[Hook Type]-[Body Version]-[CTA Type]-[Visual]-[Notes]

Examples:
  0222-HealthMech-CuriosityGap-PAS-Urgency-UGC-Phase1
  0222-ProofLead-AuthorityReveal-BAB-RiskReversal-Polished-Phase1
  0222-PainHook-WarningDoc-HookBodyCTA-LowFriction-TextOverlay-Backup

Where:
  Date:       MMDD of launch
  Concept:    Short descriptive name of the strategic concept
  Hook Type:  From AD-HOOK-TAXONOMY.md type name (abbreviated)
  Body:       Script framework (PAS, BAB, AIDA, HookBodyCTA, etc.)
  CTA Type:   Urgency, RiskReversal, LowFriction, SocialProof, etc.
  Visual:     UGC, Polished, TextOverlay, Demo, Mixed
  Notes:      Phase1, Phase2, Backup, Scale, etc.
```

### Naming Convention Cross-Reference

The Launch Package MUST include a NAMING-KEY.md file that maps:
- Every file name to its full variant matrix coordinates
- Every in-platform name to the file name
- Every variant ID to the A10 scoring rank

This is the Rosetta Stone that lets the media buyer trace any in-platform ad back to the variant matrix and scoring data.

---

## LAYER ARCHITECTURE

### Pre-Execution: Project Infrastructure

**BEFORE any launch packaging begins, the following files MUST exist in the project folder:**

#### 1. Project CLAUDE.md

```markdown
# [Project Name] -- A11 Launch Package CLAUDE.md

## MANDATORY FIRST READS
1. READ: ./ads/A11-launch-package/A11-LAUNCH-PACKAGE-ANTI-DEGRADATION.md
2. READ: ./ads/A11-launch-package/A11-LAUNCH-PACKAGE-AGENT.md
3. READ: This file (project CLAUDE.md)
4. READ: PROJECT-STATE.md (current phase, decisions, next steps)

## LAUNCH TARGETS
| Metric | Target | Status |
|--------|--------|--------|
| Platforms packaged | [from A03] | PENDING |
| Variants per platform | [from A10] | PENDING |
| All files spec-compliant | 100% | PENDING |
| Campaign structures defined | [per platform] | PENDING |
| Compliance checks passed | 100% | PENDING |
| Launch guide produced | 30KB+ | PENDING |

## GATE ENFORCEMENT
- Gates are BINARY: PASS or FAIL. No other status exists.
- "PARTIAL_PASS", "conditional pass", "good enough for launch" -- NONE of these exist.

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)
- "close enough to spec"
- "the media buyer can adjust this"
- "we can fix this after launch"
- "this platform isn't important"
- "the file will probably upload fine"
- "compliance can be checked later"
```

#### 2. PROJECT-STATE.md

```markdown
# [Project Name] -- A11 Launch Package State

## Current Phase
- Layer: [0/1/2/3/4]
- Step: [e.g., 1.1 Meta Platform Packaging]
- Status: [IN_PROGRESS / BLOCKED / COMPLETE]

## Package Counts
| Platform | Variants Approved (A10) | Files Packaged | Spec-Compliant | Status |
|----------|------------------------|----------------|----------------|--------|
| Meta | [X] | [X] | [X] | PENDING |
| TikTok | [X] | [X] | [X] | PENDING |
| YouTube | [X] | [X] | [X] | PENDING |
| Google | [X] | [X] | [X] | PENDING |

## Compliance Status
| Platform | Ads Reviewed | Ads Passed | Ads Flagged | Status |
|----------|-------------|------------|-------------|--------|
| Meta | 0 | 0 | 0 | PENDING |
| TikTok | 0 | 0 | 0 | PENDING |
| YouTube | 0 | 0 | 0 | PENDING |
| Google | 0 | 0 | 0 | PENDING |

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
# [Project Name] -- A11 Progress Log
## [Timestamp]
**Phase:** Pre-Execution
**Action:** Project infrastructure created
**Files:** project CLAUDE.md, PROJECT-STATE.md, PROGRESS-LOG.md
**Next:** Begin Layer 0 execution
```

**These 3 files are created at Pre-Execution, BEFORE any Layer 0 skills run.**

---

### Model Assignment Table (Binding)

| Phase | Model | Rationale |
|-------|-------|-----------|
| Pre-Execution | haiku | Infrastructure creation (PROJECT-STATE.md, PROGRESS-LOG.md, checkpoints/) |
| Layer 0 | haiku | Mechanical loading and validation — no analysis required |
| Layer 1 | sonnet | Platform packaging — formatting and adaptation, not creative generation |
| Layer 2 | opus | Campaign structure and strategy — analytical planning of launch approach |
| Layer 3 | opus | Launch preparation and compliance — critical validation requiring deep analysis |
| Layer 4 | sonnet | Output packaging — mechanical assembly of launch deliverables |

---

### Layer 0: Foundation & Loading

**Purpose:** Load all required upstream outputs, validate their existence and completeness, determine which platforms are in scope, and confirm readiness for launch packaging.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 0.0.1 | `0.0.1-vertical-profile-loader.md` | Load ad-specific vertical config from `ad-verticals/`. Extract compliance constraints for the vertical (health claims, financial disclaimers, etc.). | haiku |
| 0.1 | `0.1-scoring-report-loader.md` | Load A10 SCORING-REPORT.md. Extract: approved variants (passing score threshold), per-variant scores, compliance flags from A10, performance predictions, recommended test priority. This is the PRIMARY input -- only variants that passed A10 scoring get packaged. | haiku |
| 0.2 | `0.2-variant-matrix-loader.md` | Load A09 AD-VARIANT-MATRIX/. Extract: complete variant matrix with all variant IDs, hook-body-CTA-visual combinations, per-variant file paths to production assets. Cross-reference with A10 approved variants -- identify which matrix entries are approved for launch. | haiku |
| 0.3 | `0.3-production-assets-loader.md` | Load A08 AD-ASSETS/. Inventory all production asset files: verify existence, check file formats, check file sizes, check resolutions. Map each asset to its variant matrix entry. Flag missing or corrupted assets. | haiku |
| 0.4 | `0.4-format-strategy-loader.md` | Load A03 FORMAT-STRATEGY.md. Extract: target platforms, platform-specific placement requirements, format assignments per concept. This determines which platforms the package serves. | haiku |
| 0.5 | `0.5-input-validator.md` | Validate all inputs present. A10 scoring report loaded and has approved variants. A09 variant matrix loaded. A08 assets inventoried with no critical missing files. A03 format strategy loaded with platform targets. Campaign Brief available. Vertical profile loaded. | haiku |

**Execution Order:**
1. 0.0.1 and 0.1 run in parallel (independent loading)
2. 0.2 runs after 0.1 (needs A10 approved list to cross-reference matrix)
3. 0.3 runs after 0.2 (needs variant-to-asset mapping)
4. 0.4 runs in parallel with 0.2 (independent loading)
5. 0.5 runs after all above complete (validates aggregated inputs)

**Gate 0 -- Layer 0 Complete:**

```yaml
# LAYER_0_COMPLETE.yaml
gate: GATE_0
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  vertical_profile_loaded: true
  scoring_report_loaded: true
  approved_variants_count: "[integer >= 1]"
  variant_matrix_loaded: true
  production_assets_inventoried: true
  missing_critical_assets: 0
  format_strategy_loaded: true
  target_platforms: "[list of platforms]"
  campaign_brief_available: true
  all_inputs_validated: true

microskill_outputs:
  - id: "0.0.1"
    file: "layer-0-outputs/0.0.1-vertical-profile-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.1"
    file: "layer-0-outputs/0.1-scoring-report-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      approved_variants: "[integer]"
      platforms_with_variants: "[list]"
  - id: "0.2"
    file: "layer-0-outputs/0.2-variant-matrix-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      total_matrix_entries: "[integer]"
      approved_entries: "[integer]"
  - id: "0.3"
    file: "layer-0-outputs/0.3-production-assets-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      total_assets: "[integer]"
      assets_verified: "[integer]"
      assets_missing: "[integer]"
  - id: "0.4"
    file: "layer-0-outputs/0.4-format-strategy-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.5"
    file: "layer-0-outputs/0.5-input-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF approved_variants_count < 1: GATE CLOSED -- nothing to package (return to A10)
IF missing_critical_assets > 0: GATE CLOSED -- return to A08 for missing assets
IF target_platforms is empty: GATE CLOSED -- return to A03 for platform decisions
```

### Schema Validation Reference

Input validators MUST verify field presence — not just file existence — for all consumed handoff files. See `ads/ad-engine-schema-registry.md` for required fields per handoff file.

---

### Layer 1: Platform Packaging

**Purpose:** Organize all approved variants by platform. Every ad file is placed in the correct platform folder with correct file specifications, correct naming convention, and correct placement targeting. This is a MECHANICAL ASSEMBLY operation -- no creative decisions are made here.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 1.1 | `1.1-meta-package-builder.md` | Package all Meta-targeted variants. Organize into Feed (1:1 + 4:5), Stories (9:16), Reels (9:16). Verify H.264 MP4, <4GB. Verify image specs (JPG/PNG, <30MB). Apply file naming convention. Generate per-variant spec sheet (dimensions, duration, file size, codec). Produce META-PACKAGE-MANIFEST.md listing every file with specs. | sonnet |
| 1.2 | `1.2-tiktok-package-builder.md` | Package all TikTok-targeted variants. Verify 9:16 (1080x1920), H.264/H.265, <500MB, 5-60s. Apply file naming convention. Generate per-variant spec sheet. Produce TIKTOK-PACKAGE-MANIFEST.md. | sonnet |
| 1.3 | `1.3-youtube-package-builder.md` | Package all YouTube-targeted variants. Organize by type: Pre-roll (15-30s, 16:9), Bumper (6s, 16:9), Skippable (any length, 16:9), Shorts (9:16). Verify 1920x1080 (or 1080x1920 for Shorts). Generate thumbnail files (1280x720) or verify thumbnails exist from A08. Apply file naming convention. Produce YOUTUBE-PACKAGE-MANIFEST.md. | sonnet |
| 1.4 | `1.4-google-display-package-builder.md` | Package all Google Display-targeted variants. Organize responsive display assets (1200x628 landscape, 1200x1200 square, logos). Organize standard display sizes (728x90, 300x250, 300x600, 336x280, 160x600, 320x50). Verify file sizes <150KB (standard) or <5120KB (responsive). Apply file naming convention. Produce GOOGLE-PACKAGE-MANIFEST.md. | sonnet |
| 1.5 | `1.5-naming-key-generator.md` | Generate NAMING-KEY.md -- the Rosetta Stone that maps every file name to variant matrix coordinates, every in-platform name to file name, every variant ID to A10 scoring rank. This is the cross-reference document that makes the entire package traceable. | sonnet |
| 1.6 | `1.6-spec-compliance-validator.md` | Validate every packaged file against platform specifications. Check: file format, resolution, file size, duration, aspect ratio, codec, audio format. Produce SPEC-COMPLIANCE-REPORT.md with pass/fail per file. ANY file that fails spec compliance is flagged and excluded from the package until fixed. | sonnet |

**Execution Order:**
1. 1.1, 1.2, 1.3, 1.4 run in parallel (independent platform packaging)
2. 1.5 runs after all platform packages complete (needs all file names)
3. 1.6 runs after 1.5 (validates all packaged files across all platforms)

**MANDATORY SPEC COMPLIANCE CHECK:**

```
+-----------------------------------------------------------------------------+
|  SPEC COMPLIANCE CHECK - [timestamp]                                         |
|                                                                              |
|  +------------------------------------------------------------------------+ |
|  | PLATFORM   | TOTAL FILES | PASS | FAIL | % COMPLIANT | STATUS          | |
|  +------------+-------------+------+------+-------------+-----------------+ |
|  | Meta       | [X]         | [X]  | [X]  | [X]%        | PASS/FAIL       | |
|  | TikTok     | [X]         | [X]  | [X]  | [X]%        | PASS/FAIL       | |
|  | YouTube    | [X]         | [X]  | [X]  | [X]%        | PASS/FAIL       | |
|  | Google     | [X]         | [X]  | [X]  | [X]%        | PASS/FAIL       | |
|  +------------------------------------------------------------------------+ |
|                                                                              |
|  REQUIRED: 100% compliant on ALL platforms. Any file failure = overall FAIL. |
|  OVERALL: [PASS - proceed] or [FAIL - fix non-compliant files]              |
+-----------------------------------------------------------------------------+
```

**IF OVERALL = FAIL:** You MUST fix or exclude non-compliant files before proceeding. Non-compliant files CANNOT be included in the launch package.

**Gate 1 -- Layer 1 Complete:**

```yaml
# LAYER_1_COMPLETE.yaml
gate: GATE_1
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  meta_package_complete: "[true/false/N/A]"
  meta_files_count: "[integer]"
  tiktok_package_complete: "[true/false/N/A]"
  tiktok_files_count: "[integer]"
  youtube_package_complete: "[true/false/N/A]"
  youtube_files_count: "[integer]"
  google_package_complete: "[true/false/N/A]"
  google_files_count: "[integer]"
  naming_key_generated: true
  spec_compliance_100_pct: true
  non_compliant_files: 0
  total_packaged_files: "[integer]"

microskill_outputs:
  - id: "1.1"
    file: "layer-1-outputs/1.1-meta-package-builder.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      files_packaged: "[integer]"
      placements_covered: "[list: feed, stories, reels]"
  - id: "1.2"
    file: "layer-1-outputs/1.2-tiktok-package-builder.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      files_packaged: "[integer]"
  - id: "1.3"
    file: "layer-1-outputs/1.3-youtube-package-builder.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      files_packaged: "[integer]"
      thumbnails_included: "[integer]"
  - id: "1.4"
    file: "layer-1-outputs/1.4-google-display-package-builder.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      files_packaged: "[integer]"
      sizes_covered: "[list]"
  - id: "1.5"
    file: "layer-1-outputs/1.5-naming-key-generator.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.6"
    file: "layer-1-outputs/1.6-spec-compliance-validator.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      total_files_checked: "[integer]"
      files_passed: "[integer]"
      files_failed: "[integer]"

IF non_compliant_files > 0: GATE CLOSED -- fix or exclude non-compliant files
IF naming_key_generated = false: GATE CLOSED -- generate naming key
IF any platform package incomplete for a target platform: GATE CLOSED -- complete packaging
```

---

### Layer 2: Campaign Structure & Strategy

**Purpose:** Define the campaign architecture for each platform -- campaign hierarchy, audience targeting suggestions, budget distribution, and testing methodology. This is the STRATEGIC layer that requires understanding of platform dynamics, testing theory, and media buying workflows.

**CRITICAL DISTINCTION:** A11 RECOMMENDS campaign structure. The media buyer DECIDES. Every recommendation includes rationale so the media buyer can accept, modify, or override with informed judgment.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 2.1 | `2.1-campaign-hierarchy-architect.md` | Define Campaign -> Ad Set -> Ad hierarchy for each platform. **Meta:** Recommend CBO (Campaign Budget Optimization) vs. ABO (Ad Set Budget Optimization) with rationale. Define campaign grouping logic (by concept? by objective? by funnel stage?). Define ad set grouping logic (by audience? by placement? by concept?). Map specific variants to specific ad sets. **TikTok:** Equivalent hierarchy adapted for TikTok Ads Manager. **YouTube:** Campaign type selection (Video Views, Video Reach, App Installs, etc.). **Google:** Campaign type (Display, Discovery, Performance Max) with ad group structure. Output: CAMPAIGN-HIERARCHY.md with per-platform architecture. | opus |
| 2.2 | `2.2-audience-targeting-strategy.md` | Define audience targeting suggestions per platform. **Four targeting tiers:** (1) Broad (no targeting -- let algorithm optimize), (2) Interest-based (vertical-specific interest stacking), (3) Lookalike/Similar (from customer list or pixel data), (4) Retargeting (website visitors, video viewers, engagers). For each tier: define the audience parameters, estimated audience size (when possible), rationale for inclusion, which ad set it maps to. Include exclusion recommendations (existing customers, recent purchasers, etc.). Mark which tiers require client-provided data (customer lists, pixel data). Output: AUDIENCE-STRATEGY.md. | opus |
| 2.3 | `2.3-budget-distribution-planner.md` | Recommend budget allocation across platforms, campaigns, and test phases. **Phase 1 (Testing):** Per-platform daily budget, duration, kill threshold (when to turn off a variant), success threshold (when to scale a variant). **Phase 2 (Scaling):** Budget increase methodology (20-30% incremental), platform rebalancing based on Phase 1 results. **Phase 3 (Optimization):** Ongoing budget reallocation cadence. Include: recommended total weekly budget (or work from client-provided budget), per-platform split with rationale, CBO/ABO budget settings per campaign, minimum spend per variant before making kill/scale decisions (typically 3x AOV). Reference AD-ENGINE.md testing volume reference data. Output: BUDGET-PLAN.md. | opus |
| 2.4 | `2.4-testing-methodology-planner.md` | Define the A/B testing plan. **Phase 1 priority order:** (1) Hook tests -- same body, different hooks (highest-ROI test per AD-ENGINE.md). (2) Body tests -- same hook, different bodies. (3) Visual tests -- same hook+body, different visual treatment. (4) CTA tests -- same everything, different CTA. Define which variants go into which test and why. Define win criteria (statistical significance or practical significance). Define minimum sample size per variant. Define test duration recommendations. Map A10 scoring predictions to test priority. Output: TEST-PLAN.md. | opus |
| 2.5 | `2.5-layer-2-validator.md` | Validate all campaign structure outputs. Verify: every platform has a campaign hierarchy, audience targeting covers at least broad + one other tier, budget plan is realistic and adds up, testing methodology has clear Phase 1 priority order, all variants are assigned to campaigns/ad sets. Cross-check: variant count in campaign structure matches variant count from Layer 1. Produce CAMPAIGN-STRUCTURE-VALIDATION.md. | opus |

**Execution Order:**
1. 2.1 first (hierarchy must exist before audiences, budgets, and tests can be mapped to it)
2. 2.2, 2.3, 2.4 run in parallel (independent strategy layers that reference 2.1 hierarchy)
3. 2.5 runs after all above complete (validates completeness and cross-references)

**Gate 2 -- Layer 2 Complete:**

```yaml
# LAYER_2_COMPLETE.yaml
gate: GATE_2
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  campaign_hierarchy_defined: true
  platforms_with_hierarchy: "[list -- must match Layer 1 platforms]"
  audience_strategy_defined: true
  audience_tiers_covered: "[integer >= 2]"
  budget_plan_defined: true
  budget_totals_add_up: true
  testing_methodology_defined: true
  phase_1_priority_clear: true
  all_variants_assigned_to_campaigns: true
  variant_count_matches_layer_1: true
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "2.1"
    file: "layer-2-outputs/2.1-campaign-hierarchy-architect.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      campaigns_defined: "[integer]"
      ad_sets_defined: "[integer]"
  - id: "2.2"
    file: "layer-2-outputs/2.2-audience-targeting-strategy.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      targeting_tiers: "[integer >= 2]"
      platforms_covered: "[list]"
  - id: "2.3"
    file: "layer-2-outputs/2.3-budget-distribution-planner.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      total_weekly_budget: "[dollar amount or 'client-provided']"
      phase_1_duration: "[days]"
  - id: "2.4"
    file: "layer-2-outputs/2.4-testing-methodology-planner.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      test_groups_defined: "[integer]"
      phase_1_variants: "[integer]"
  - id: "2.5"
    file: "layer-2-outputs/2.5-layer-2-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF any platform missing campaign hierarchy: GATE CLOSED -- define hierarchy
IF audience_tiers_covered < 2: GATE CLOSED -- add targeting tiers
IF budget_totals_add_up = false: GATE CLOSED -- fix budget math
IF variant_count_matches_layer_1 = false: GATE CLOSED -- reconcile variant counts
IF validator_verdict != PASS: GATE CLOSED -- address validation failures
```

---

### Layer 3: Launch Preparation & Compliance

**Purpose:** Final pre-launch checks. Every ad reviewed for platform policy compliance. Tracking infrastructure defined. Launch checklist created with every pre-launch item verified. This is the "final inspection" before go-live.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 3.1 | `3.1-compliance-reviewer.md` | Review every ad against its target platform's advertising policies. **Meta policies:** Prohibited content, restricted content (health, finance, political), personal attributes, misleading claims, before/after requirements, text overlay guidelines. **TikTok policies:** Prohibited/restricted categories, community guidelines for ads, vertical-specific restrictions. **YouTube policies:** Ad content policies, restricted ad categories, political content rules. **Google policies:** Misrepresentation, unreliable claims, inappropriate content, restricted categories. For each ad: PASS (compliant), FLAG (needs human review -- potential issue), FAIL (clear violation -- must be modified or removed). Include vertical-specific compliance from vertical profile (health claims, financial disclaimers, etc.). Output: COMPLIANCE-REPORT.md with per-ad verdicts. | sonnet |
| 3.2 | `3.2-utm-tracking-builder.md` | Define UTM parameter structure for all campaign tracking. **Standard parameters:** utm_source (platform), utm_medium (paid_social / paid_search / display), utm_campaign (campaign name following naming convention), utm_content (variant ID from naming key), utm_term (audience targeting tier). Define parameter values for every variant. Verify all UTMs are properly formatted (no spaces, consistent case). Generate UTM-TRACKING.md with the complete parameter matrix. Include pixel/conversion tracking verification checklist (client's pixel ID, conversion events, attribution window). | sonnet |
| 3.3 | `3.3-launch-sequence-planner.md` | Define the go-live sequence. **Phase 1 -- Initial Test (Days 1-7):** Which variants go live first (highest-scored from A10, highest test priority from 2.4). How many variants per platform. Monitoring cadence (check metrics at 24h, 48h, 72h, 7d). Kill criteria (variant at 3x AOV spend with no conversions or CPA > 2x target). **Phase 2 -- Backup Deploy (Days 7-14):** When to deploy backup variants (when Phase 1 winners are identified and losers are killed). Which backup variants (next highest-scored from A10). **Phase 3 -- Scale/Kill (Days 14-30):** When to scale winners (20-30% budget increases). When to refresh creative (if best variant CPA rises 30%+). When to request new creative from A01-A10 pipeline. Output: launch-sequence.md. | sonnet |
| 3.4 | `3.4-launch-checklist-generator.md` | Generate the complete pre-launch checklist. Every item must be verified before go-live. **Categories:** (1) Account setup (ad accounts active, payment methods, team permissions). (2) Tracking (pixel installed, conversion events firing, UTMs configured, attribution window set). (3) Creative (all files uploaded to platform, all specs verified, all naming applied). (4) Targeting (audiences created, exclusions set, geo-targeting configured). (5) Budget (daily budgets set, bid strategy selected, campaign budgets allocated). (6) Compliance (all ads reviewed, flagged items resolved, disclaimers added). (7) Approval (client sign-off on creative, client sign-off on budget, internal QA). Output: LAUNCH-CHECKLIST.md with checkbox format. | sonnet |
| 3.5 | `3.5-layer-3-validator.md` | Validate all launch preparation outputs. Verify: compliance review covers 100% of ads, UTM structure is complete and consistent, launch sequence has all 3 phases defined, launch checklist has all 7 categories populated. Flag any FAIL compliance verdicts that haven't been addressed. Produce LAUNCH-PREP-VALIDATION.md. | sonnet |

**Execution Order:**
1. 3.1 and 3.2 run in parallel (independent checks)
2. 3.3 runs after 3.1 (needs compliance results to know which variants are cleared for launch)
3. 3.4 runs after 3.1, 3.2, 3.3 (needs all above to generate complete checklist)
4. 3.5 runs after all above (validates completeness)

**MANDATORY COMPLIANCE CHECK:**

```
+-----------------------------------------------------------------------------+
|  COMPLIANCE CHECK - [timestamp]                                              |
|                                                                              |
|  +------------------------------------------------------------------------+ |
|  | PLATFORM   | TOTAL ADS | PASS | FLAG | FAIL | % CLEAR  | STATUS        | |
|  +------------+-----------+------+------+------+----------+---------------+ |
|  | Meta       | [X]       | [X]  | [X]  | [X]  | [X]%     | PASS/REVIEW   | |
|  | TikTok     | [X]       | [X]  | [X]  | [X]  | [X]%     | PASS/REVIEW   | |
|  | YouTube    | [X]       | [X]  | [X]  | [X]  | [X]%     | PASS/REVIEW   | |
|  | Google     | [X]       | [X]  | [X]  | [X]  | [X]%     | PASS/REVIEW   | |
|  +------------------------------------------------------------------------+ |
|                                                                              |
|  STATUS KEY:                                                                 |
|    PASS = All ads PASS compliance                                            |
|    REVIEW = Some ads FLAGGED -- requires human review before launch          |
|    BLOCKED = Some ads FAIL compliance -- must be modified or removed         |
|                                                                              |
|  FLAGGED ADS require HUMAN DECISION before Gate 3 can pass.                 |
|  FAILED ADS must be modified by returning to A07/A08 or excluded from       |
|  the launch package. A FAIL verdict cannot be overridden by A11.            |
+-----------------------------------------------------------------------------+
```

**Gate 3 -- Layer 3 Complete:**

```yaml
# LAYER_3_COMPLETE.yaml
gate: GATE_3
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  compliance_review_complete: true
  compliance_fail_count: 0
  compliance_flag_count: "[integer]"
  compliance_flags_resolved: true  # human reviewed all flags
  utm_structure_defined: true
  utm_parameters_validated: true
  launch_sequence_defined: true
  phase_1_variants_identified: true
  phase_2_backup_variants_identified: true
  launch_checklist_complete: true
  launch_checklist_categories: 7
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "3.1"
    file: "layer-3-outputs/3.1-compliance-reviewer.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      total_ads_reviewed: "[integer]"
      pass_count: "[integer]"
      flag_count: "[integer]"
      fail_count: "[integer]"
  - id: "3.2"
    file: "layer-3-outputs/3.2-utm-tracking-builder.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      utm_parameters_defined: "[integer]"
  - id: "3.3"
    file: "layer-3-outputs/3.3-launch-sequence-planner.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      phase_1_variants: "[integer]"
      phase_2_variants: "[integer]"
  - id: "3.4"
    file: "layer-3-outputs/3.4-launch-checklist-generator.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      checklist_items: "[integer]"
      categories: 7
  - id: "3.5"
    file: "layer-3-outputs/3.5-layer-3-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF compliance_fail_count > 0: GATE CLOSED -- modify or exclude failed ads
IF compliance_flags_resolved = false: GATE CLOSED -- human must review flagged ads
IF launch_checklist_categories < 7: GATE CLOSED -- complete all checklist categories
IF validator_verdict != PASS: GATE CLOSED -- address validation failures
```

---

### Layer 4: Output Packaging

**Purpose:** Assemble all Layer 1-3 outputs into the final deliverable: the LAUNCH-PACKAGE/ directory and LAUNCH-GUIDE.md. This is an ASSEMBLY operation -- it combines pre-validated artifacts, it does NOT generate new analysis.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 4.1 | `4.1-launch-package-assembler.md` | Assemble the LAUNCH-PACKAGE/ directory with final folder structure. Create platform subdirectories with all spec-compliant ad files. Include all manifests, naming key, compliance report, UTM tracking, campaign hierarchy, audience strategy, budget plan, test plan, launch sequence, and launch checklist. Verify directory structure matches the output schema below. | sonnet |
| 4.2 | `4.2-launch-guide-writer.md` | Write LAUNCH-GUIDE.md -- the single document the media buyer reads before launching. Include: executive summary, platform-by-platform setup instructions, campaign structure walkthrough, audience targeting walkthrough, budget walkthrough, test plan walkthrough, launch sequence, tracking verification instructions, compliance notes, FAQ/troubleshooting. Minimum size: 30KB. Use chunked assembly (5-8 write operations). | sonnet |
| 4.3 | `4.3-execution-log-and-checkpoints.md` | Produce execution-log.md with per-microskill entries. Create all checkpoint YAML files. Verify all output files exist with sizes. Create LAYER_4_COMPLETE.yaml. Final directory tree verification. | sonnet |

**Execution Order:**
1. 4.1 first (directory assembly)
2. 4.2 after 4.1 (guide references assembled package)
3. 4.3 after 4.2 (final checkpoint)

**Gate 4 -- Layer 4 Complete (Skill Complete):**

```yaml
# LAYER_4_COMPLETE.yaml
gate: GATE_4
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  launch_package_directory_exists: true
  launch_guide_exists: true
  launch_guide_size_kb: "[integer >= 30]"
  all_platform_directories_populated: true
  all_manifests_present: true
  naming_key_present: true
  compliance_report_present: true
  utm_tracking_present: true
  campaign_hierarchy_present: true
  audience_strategy_present: true
  budget_plan_present: true
  test_plan_present: true
  launch_sequence_present: true
  launch_checklist_present: true
  execution_log_exists: true
  all_checkpoint_files_exist: true

post_assembly_validation:
  total_ad_files: "[integer]"
  total_documentation_files: "[integer]"
  launch_guide_size_kb: "[integer]"
  minimum_required_kb: 30
  status: "[PASS if >= 30KB / FAIL if < 30KB]"

IF launch_guide_size_kb < 30: GATE CLOSED -- re-assemble with chunked protocol
IF any required file missing: GATE CLOSED -- complete missing files
IF any platform directory empty for a target platform: GATE CLOSED -- package missing platform
```

---

## OUTPUT SCHEMA: LAUNCH-PACKAGE/

```
LAUNCH-PACKAGE/
|
+-- LAUNCH-GUIDE.md                    # Primary deliverable (30KB+)
|
+-- meta/                              # Meta (Facebook + Instagram) platform files
|   +-- feed/                          # 1:1 and 4:5 ad files
|   |   +-- [naming convention files]
|   +-- stories/                       # 9:16 Stories ad files
|   |   +-- [naming convention files]
|   +-- reels/                         # 9:16 Reels ad files
|   |   +-- [naming convention files]
|   +-- META-PACKAGE-MANIFEST.md       # Per-file spec sheet
|
+-- tiktok/                            # TikTok platform files
|   +-- [naming convention files]      # All 9:16
|   +-- TIKTOK-PACKAGE-MANIFEST.md
|
+-- youtube/                           # YouTube platform files
|   +-- pre-roll/                      # 15-30s, 16:9
|   +-- bumper/                        # 6s, 16:9
|   +-- skippable/                     # Any length, 16:9
|   +-- shorts/                        # 9:16
|   +-- thumbnails/                    # 1280x720
|   +-- YOUTUBE-PACKAGE-MANIFEST.md
|
+-- google/                            # Google Display Network files
|   +-- responsive/                    # Responsive display assets
|   +-- standard/                      # Standard display sizes
|   +-- GOOGLE-PACKAGE-MANIFEST.md
|
+-- documentation/                     # All strategic and operational docs
|   +-- NAMING-KEY.md                  # File name <-> variant matrix cross-reference
|   +-- CAMPAIGN-HIERARCHY.md          # Campaign/ad set/ad structure per platform
|   +-- AUDIENCE-STRATEGY.md           # Targeting tiers and recommendations
|   +-- BUDGET-PLAN.md                 # Budget distribution and phase plans
|   +-- TEST-PLAN.md                   # A/B testing methodology and priority
|   +-- launch-sequence.md            # Phase 1/2/3 go-live sequence
|   +-- LAUNCH-CHECKLIST.md           # Pre-launch verification checklist
|   +-- UTM-TRACKING.md               # UTM parameter matrix
|   +-- COMPLIANCE-REPORT.md          # Per-ad compliance verdicts
|   +-- SPEC-COMPLIANCE-REPORT.md     # Per-file spec validation
|
+-- checkpoints/                       # Gate verification files
|   +-- LAYER_0_COMPLETE.yaml
|   +-- LAYER_1_COMPLETE.yaml
|   +-- LAYER_2_COMPLETE.yaml
|   +-- LAYER_3_COMPLETE.yaml
|   +-- LAYER_4_COMPLETE.yaml
|
+-- execution-log.md                   # Per-microskill execution log
+-- PROJECT-STATE.md                   # Final project state
```

---

## OUTPUT SCHEMA: LAUNCH-GUIDE.md

**Minimum size: 30KB.** This is a comprehensive launch document, not a summary.

**Chunked Assembly Required:** Use 5-8 write operations.

```
PHASE 1: HEADER + EXECUTIVE SUMMARY (>= 3KB)
  Write metadata, table of contents, executive summary

PHASE 2: PLATFORM SETUP GUIDES (>= 12KB cumulative)
  Append per-platform setup instructions (Meta, TikTok, YouTube, Google)

PHASE 3: STRATEGY SECTIONS (>= 22KB cumulative)
  Append campaign structure, audience targeting, budget, test plan

PHASE 4: LAUNCH OPERATIONS (>= 30KB cumulative)
  Append launch sequence, tracking, compliance, checklist, FAQ

SIZE CHECKPOINTS (BLOCKING):
  After Phase 1: File >= 3KB   -> IF NOT: HALT
  After Phase 2: File >= 12KB  -> IF NOT: HALT
  After Phase 3: File >= 22KB  -> IF NOT: HALT
  After Phase 4: File >= 30KB  -> IF NOT: HALT
```

### The 12 Required Sections

```markdown
# LAUNCH-GUIDE.md

## 1. Executive Summary
- Campaign overview (product, vertical, target audience)
- Total variants in launch package (by platform)
- Recommended initial test budget
- Estimated timeline: test (7d) -> scale (14d) -> optimize (30d+)
- Key platform priorities

## 2. Package Contents
- Complete inventory of all files in LAUNCH-PACKAGE/
- Directory structure diagram
- How to use NAMING-KEY.md to trace any ad

## 3. Meta (Facebook + Instagram) Setup Guide
- Campaign creation step-by-step
- Campaign structure (CBO vs ABO, campaign grouping)
- Ad set configuration (audiences, placements, optimization events)
- Ad creation (file upload, copy paste, CTA selection)
- Platform-specific notes (text overlay guidelines, compliance notes)

## 4. TikTok Setup Guide
- Campaign creation step-by-step
- Campaign structure and optimization
- Ad group configuration
- Spark Ads vs. standard format recommendations
- Platform-specific notes

## 5. YouTube Setup Guide
- Campaign creation step-by-step (by ad type: pre-roll, bumper, shorts)
- Campaign structure
- Targeting configuration
- Thumbnail upload
- Platform-specific notes

## 6. Google Display Setup Guide
- Campaign creation step-by-step
- Responsive display ad setup
- Standard display size deployment
- Placement targeting
- Platform-specific notes

## 7. Campaign Structure Walkthrough
- Full hierarchy diagram (campaign -> ad set -> ad for each platform)
- Rationale for grouping decisions
- CBO vs ABO recommendation with reasoning
- How variant testing maps to campaign structure

## 8. Audience Targeting Walkthrough
- Tier 1: Broad targeting parameters
- Tier 2: Interest-based targeting parameters
- Tier 3: Lookalike/similar audience setup (requires client data)
- Tier 4: Retargeting setup (requires pixel data)
- Exclusion recommendations
- Which tiers to test first

## 9. Budget & Testing Walkthrough
- Phase 1 budget allocation per platform
- Per-variant minimum spend before kill/scale decisions
- Kill criteria and scale criteria
- Testing priority order (hooks first, then bodies, then visuals, then CTAs)
- Budget increase methodology

## 10. Launch Sequence
- Phase 1: Initial test variants (which, when, how many)
- Phase 2: Backup deployment (triggered by Phase 1 results)
- Phase 3: Scale/kill decisions (criteria and timing)
- Monitoring cadence (24h, 48h, 72h, 7d check-ins)
- Creative refresh triggers

## 11. Tracking & Compliance
- UTM parameter structure (copy-paste ready per variant)
- Pixel verification steps
- Conversion event setup
- Attribution window recommendations
- Compliance notes per platform (what was flagged, what to watch for)

## 12. Launch Checklist
- Complete pre-launch checklist (all 7 categories)
- Each item with verification method
- Sign-off fields
```

---

## NON-NEGOTIABLE THRESHOLDS

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Spec compliance** | 100% of files pass platform specs | HALT -- fix non-compliant files |
| **Compliance review** | 100% of ads reviewed | HALT -- review remaining ads |
| **Compliance FAIL resolution** | 0 unresolved FAILs | HALT -- modify or exclude |
| **Compliance FLAG resolution** | 0 unresolved FLAGs (human review) | HALT -- escalate to human |
| **Platform coverage** | All platforms from A03 FORMAT-STRATEGY.md | HALT -- package missing platform |
| **Naming key completeness** | Every file traceable to variant matrix | HALT -- complete naming key |
| **Launch guide size** | 30KB | HALT -- expand with chunked protocol |
| **UTM coverage** | Every variant has UTM parameters | HALT -- define missing UTMs |
| **Launch sequence phases** | 3 phases defined | HALT -- define missing phases |
| **Budget plan** | Adds up (no math errors) | HALT -- fix budget math |
| **Checklist categories** | 7 of 7 | HALT -- complete missing categories |

---

## ANTI-DEGRADATION PATTERNS

### Pattern 1: The Incomplete Package

**Symptom:** Media buyer opens the package and immediately has 20 questions. Missing campaign structure, missing tracking setup, missing compliance check, or missing launch sequence.

**Why it happens:** LLM prioritizes the "obvious" outputs (ad files, brief) and skips the operational infrastructure that media buyers actually need.

**Structural fix:** Gate 4 requires ALL 14 documentation files to exist. Missing any single file = gate CLOSED. The launch guide size check (30KB) also catches thin documentation.

### Pattern 2: The Wrong Spec

**Symptom:** Media buyer tries to upload ad files and gets rejection errors. Wrong aspect ratio, wrong codec, file too large, wrong format.

**Why it happens:** LLM doesn't have native awareness of platform-specific technical requirements. Specifications are treated as "approximately right."

**Structural fix:** Layer 1 microskill 1.6 runs a spec compliance validator against every file. Any failure = Gate 1 CLOSED. The spec reference in this file is exhaustive -- no "approximately" allowed.

### Pattern 3: The Creative-Team Organization

**Symptom:** Package is organized by concept or creative stage, not by platform and campaign structure. Media buyer has to mentally reorganize everything.

**Why it happens:** LLM organizes based on how the creative pipeline works (concepts, hooks, variants), not how the media buyer works (platforms, campaigns, ad sets).

**Structural fix:** LAUNCH-PACKAGE/ output schema enforces platform-first directory structure. Media buyer opens the folder and sees: meta/, tiktok/, youtube/, google/, documentation/.

### Pattern 4: The Missing Launch Strategy

**Symptom:** Package contains ad files but no guidance on what to test first, how to allocate budget, when to kill losers, or when to deploy backups.

**Why it happens:** LLM treats launch packaging as a file organization task rather than a strategic + operational task.

**Structural fix:** Layer 2 is entirely dedicated to campaign strategy. Five separate microskills cover hierarchy, audiences, budget, testing, and validation. Gate 2 verifies all strategic components exist.

### Pattern 5: The Naming Chaos

**Symptom:** File names are internal IDs that mean nothing to the media buyer. In-platform ad names don't trace back to the variant matrix or scoring data.

**Why it happens:** LLM uses programmatic naming (variant IDs) without translating to human-readable names.

**Structural fix:** Dual naming convention (file names AND in-platform names) plus mandatory NAMING-KEY.md cross-reference document. Gate 1 verifies naming key exists.

### Pattern 6: The Compliance Shortcut

**Symptom:** Ads get rejected by platform after launch because compliance wasn't properly checked.

**Why it happens:** LLM either skips compliance entirely or checks generically without platform-specific policy knowledge.

**Structural fix:** Layer 3 microskill 3.1 reviews every ad against its specific target platform's policies. Compliance results have three tiers (PASS/FLAG/FAIL) and FAILs block Gate 3. FLAGs require human decision.

### Pattern 7: The Budget That Doesn't Add Up

**Symptom:** Budget plan allocates more than the total budget, or allocates nothing to a platform, or doesn't specify per-variant spend minimums.

**Why it happens:** LLM generates plausible-sounding budget percentages without doing the math.

**Structural fix:** Gate 2 checks `budget_totals_add_up: true`. The validator in 2.5 verifies arithmetic. Budget plan must specify absolute numbers (or ranges), not just percentages.

---

## AD-SPECIFIC ANTI-DEGRADATION PROTOCOL

```
WHEN YOU NOTICE YOURSELF:
- Packaging files without checking specs against platform requirements -> STOP. Check every spec.
- Organizing by concept instead of by platform -> STOP. Media buyer workflow, not creative workflow.
- Skipping campaign structure ("just deliver the files") -> STOP. Files without strategy = useless.
- Writing a launch guide under 30KB -> STOP. Chunk the writes. Cover all 12 sections.
- Assuming compliance will be "fine" -> STOP. Review every ad against platform policies.
- Using internal variant IDs without human-readable names -> STOP. Build the naming key.
- Skipping budget math verification -> STOP. Add it up. Numbers must be exact.
- Generating campaign structure without considering platform differences -> STOP. Each platform is different.
- Skipping UTM parameter definition -> STOP. Tracking is not optional.
- Writing a launch sequence without kill/scale criteria -> STOP. The media buyer needs decision rules.

IF CONTEXT IS LARGE:
- This does NOT excuse incomplete packages
- This does NOT excuse spec violations
- This does NOT excuse missing documentation
- Request continuation rather than abbreviating quality
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce its own dedicated output file. File existence = binary verification. No file = process violation.

### Per-Microskill Output Table

| Layer | Microskill | Output File | Min Size | Type |
|-------|-----------|-------------|----------|------|
| 0 | 0.0.1 Vertical Profile | `layer-0-outputs/0.0.1-vertical-profile-loader.md` | 1KB | Loader |
| 0 | 0.1 Scoring Report | `layer-0-outputs/0.1-scoring-report-loader.md` | 2KB | Loader |
| 0 | 0.2 Variant Matrix | `layer-0-outputs/0.2-variant-matrix-loader.md` | 2KB | Loader |
| 0 | 0.3 Production Assets | `layer-0-outputs/0.3-production-assets-loader.md` | 2KB | Loader |
| 0 | 0.4 Format Strategy | `layer-0-outputs/0.4-format-strategy-loader.md` | 1KB | Loader |
| 0 | 0.5 Input Validator | `layer-0-outputs/0.5-input-validator.md` | 1KB | Validator |
| 1 | 1.1 Meta Package | `layer-1-outputs/1.1-meta-package-builder.md` | 3KB | Assembly |
| 1 | 1.2 TikTok Package | `layer-1-outputs/1.2-tiktok-package-builder.md` | 3KB | Assembly |
| 1 | 1.3 YouTube Package | `layer-1-outputs/1.3-youtube-package-builder.md` | 3KB | Assembly |
| 1 | 1.4 Google Display Package | `layer-1-outputs/1.4-google-display-package-builder.md` | 3KB | Assembly |
| 1 | 1.5 Naming Key | `layer-1-outputs/1.5-naming-key-generator.md` | 5KB | Assembly |
| 1 | 1.6 Spec Compliance | `layer-1-outputs/1.6-spec-compliance-validator.md` | 3KB | Validator |
| 2 | 2.1 Campaign Hierarchy | `layer-2-outputs/2.1-campaign-hierarchy-architect.md` | 5KB | Strategy |
| 2 | 2.2 Audience Targeting | `layer-2-outputs/2.2-audience-targeting-strategy.md` | 5KB | Strategy |
| 2 | 2.3 Budget Distribution | `layer-2-outputs/2.3-budget-distribution-planner.md` | 5KB | Strategy |
| 2 | 2.4 Testing Methodology | `layer-2-outputs/2.4-testing-methodology-planner.md` | 5KB | Strategy |
| 2 | 2.5 Layer 2 Validator | `layer-2-outputs/2.5-layer-2-validator.md` | 2KB | Validator |
| 3 | 3.1 Compliance Review | `layer-3-outputs/3.1-compliance-reviewer.md` | 5KB | Analysis |
| 3 | 3.2 UTM Tracking | `layer-3-outputs/3.2-utm-tracking-builder.md` | 3KB | Assembly |
| 3 | 3.3 Launch Sequence | `layer-3-outputs/3.3-launch-sequence-planner.md` | 3KB | Strategy |
| 3 | 3.4 Launch Checklist | `layer-3-outputs/3.4-launch-checklist-generator.md` | 3KB | Assembly |
| 3 | 3.5 Layer 3 Validator | `layer-3-outputs/3.5-layer-3-validator.md` | 2KB | Validator |
| 4 | 4.1 Package Assembler | `layer-4-outputs/4.1-launch-package-assembler.md` | 3KB | Assembly |
| 4 | 4.2 Launch Guide | LAUNCH-GUIDE.md | 30KB | Primary Deliverable |
| 4 | 4.3 Execution Log | execution-log.md + checkpoint YAMLs | 5KB | Documentation |

### File Size Enforcement

```
FOR EVERY PER-MICROSKILL OUTPUT FILE:
  1. CHECK file exists at expected path
  2. CHECK file size >= minimum from table above
  3. CHECK file contains required section headers

IF ANY CHECK FAILS:
  -> Microskill execution is NOT complete
  -> Checkpoint YAML CANNOT list this microskill as complete
  -> Gate for this layer remains CLOSED
```

---

## FORBIDDEN BEHAVIORS

### Package Completeness Violations
1. Producing a launch package with any missing platform directory (for target platforms)
2. Including ad files that fail spec compliance validation
3. Omitting NAMING-KEY.md (the Rosetta Stone between file names and variant matrix)
4. Omitting any of the 10 documentation files from documentation/ folder
5. LAUNCH-GUIDE.md under 30KB
6. Claiming the package is "ready" when any Gate is not PASS

### Specification Violations
7. Including files at wrong aspect ratio for the target placement
8. Including video files with wrong codec, wrong container format, or over file size limits
9. Including image files over maximum file size
10. Including video files outside platform duration limits
11. Treating platform specs as "approximate" -- specs are exact or the file does not upload

### Scope Violations
12. Modifying ad copy (that is A04/A07 territory -- A11 packages, not edits)
13. Re-scoring variants (that is A10 territory -- A11 uses A10 scores as-is)
14. Creating new visual assets (that is A08 territory -- A11 packages existing assets)
15. Making final media buying decisions (A11 RECOMMENDS -- the media buyer DECIDES)
16. Running performance analysis (that is A12 territory -- A12 runs post-launch)

### Strategic Violations
17. Omitting campaign structure (just dumping files is not a launch package)
18. Omitting audience targeting recommendations
19. Omitting budget distribution plan
20. Omitting testing methodology and priority order
21. Omitting launch sequence (Phase 1/2/3)
22. Budget plan with math errors (totals must add up)

### Compliance Violations
23. Skipping compliance review for any ad
24. Overriding a FAIL compliance verdict (must modify ad or exclude)
25. Ignoring FLAG compliance verdicts (must escalate to human)
26. Skipping UTM parameter definition for any variant
27. Omitting pixel/tracking verification from launch checklist

### Process Violations
28. Executing any microskill without reading its .md spec file
29. Producing summary-level output without per-microskill files
30. Creating checkpoint YAML without listing all microskill outputs
31. Skipping any layer (Layers 0-4 execute in order, no skipping)
32. Proceeding past a CLOSED gate
33. Inventing gate statuses other than PASS/FAIL

---

## MC-CHECK SCHEDULE

### Launch-Package-Specific MC-CHECK

Execute at every gate transition and at mid-layer checkpoints:

```yaml
A11-MC-CHECK:
  trigger: "[layer_entry | mid_layer | gate | output]"

  package_completeness:
    all_platforms_packaged: "[Y/N]"
    all_files_spec_compliant: "[Y/N]"
    naming_key_complete: "[Y/N]"
    if_any_no: "HALT -- address before proceeding"

  strategy_completeness:
    campaign_hierarchy_defined: "[Y/N]"
    audience_targeting_defined: "[Y/N]"
    budget_plan_defined: "[Y/N]"
    test_plan_defined: "[Y/N]"
    launch_sequence_defined: "[Y/N]"
    if_any_no: "HALT -- address before proceeding"

  compliance_status:
    all_ads_reviewed: "[Y/N]"
    fail_count: "[integer]"
    unresolved_flags: "[integer]"
    if_fails_or_flags: "HALT -- resolve before proceeding"

  documentation_status:
    launch_guide_exists: "[Y/N]"
    launch_guide_size_kb: "[integer]"
    all_documentation_files_exist: "[Y/N]"
    if_any_no: "HALT -- complete documentation"

  rushing_detection:
    skipping_spec_checks: "[Y/N]"
    organizing_by_concept_not_platform: "[Y/N]"
    skipping_compliance: "[Y/N]"
    skipping_budget_math: "[Y/N]"
    if_any_yes: "STOP -- slow down, follow protocol"

  result: "[PROCEED | PAUSE | HALT]"
```

### MC-CHECK-LITE (every 3-4 microskills)

```
MC-CHECK-LITE:
- Confidence: [1-10]
- Rushing: [Y/N]
- Synthesizing instead of reading spec files: [Y/N]
- All per-microskill output files created so far: [Y/N]
- Action: [PROCEED | SLOW_DOWN | STOP]
```

---

## CAMPAIGN STRUCTURE REFERENCE

### Meta Campaign Architecture (Recommended Starting Point)

```
CAMPAIGN LEVEL (CBO recommended for testing phase):
  Objective: Conversions (or Purchase if pixel has enough data)
  Budget: Daily, at campaign level

  AD SET LEVEL (audience testing):
    Ad Set 1: Broad (no targeting)
      -> 3-5 ads (Phase 1 variants)
    Ad Set 2: Interest Stack A (vertical-specific interests)
      -> 3-5 ads (same Phase 1 variants)
    Ad Set 3: Interest Stack B (related interests)
      -> 3-5 ads (same Phase 1 variants)
    Ad Set 4: Lookalike (1-3% if data available)
      -> 3-5 ads (same Phase 1 variants)

  AD LEVEL (creative testing):
    Each ad = one variant from the scored matrix
    Use Dynamic Creative for automated hook/body/CTA testing
    OR use individual ads for manual control
```

### TikTok Campaign Architecture

```
CAMPAIGN LEVEL:
  Objective: Website Conversions (or Complete Payment)
  Budget: Campaign-level (equivalent to CBO)

  AD GROUP LEVEL:
    Ad Group 1: Broad
      -> 3-5 ads
    Ad Group 2: Interest-based
      -> 3-5 ads
    Ad Group 3: Custom audience (if data available)
      -> 3-5 ads

  AD LEVEL:
    Spark Ads format recommended for UGC-style creative
    Standard format for polished creative
```

### YouTube Campaign Architecture

```
CAMPAIGN LEVEL:
  Types by ad format:
    - Video Reach (bumper, non-skippable in-stream)
    - Video Views (skippable in-stream, in-feed video)

  AD GROUP LEVEL:
    Grouped by audience + format

  AD LEVEL:
    One ad per video asset
    Companion banner if applicable
    Custom thumbnail required
```

### Google Display Campaign Architecture

```
CAMPAIGN LEVEL:
  Type: Display (or Performance Max for automated)

  AD GROUP LEVEL:
    Grouped by audience targeting
    Responsive Display Ads recommended (algorithm optimizes combinations)

  AD LEVEL:
    Responsive: upload all assets, Google assembles
    Standard: individual banner sizes
```

---

## BUDGET DISTRIBUTION REFERENCE

### Default Budget Split (Starting Point -- Adjust Per Vertical)

| Platform | Typical Allocation | Best For | Notes |
|----------|--------------------|----------|-------|
| Meta | 40-60% | DTC, health, supplements, general consumer | Largest audience, best targeting, most mature optimization |
| TikTok | 15-30% | Younger demo, UGC-native products | Growing fast, lower CPMs, requires native creative |
| YouTube | 10-25% | Considered purchases, educational products | Higher CPCs but higher intent |
| Google Display | 5-15% | Retargeting, brand awareness | Best as supplement to social, not primary |

### Kill/Scale Decision Framework

```
KILL CRITERIA (turn off variant):
  - Spent 3x AOV with 0 conversions
  - CPA > 2x target CPA after minimum sample
  - Hook rate < 15% (below industry minimum)
  - CTR < 0.5% (not generating interest)

SCALE CRITERIA (increase budget):
  - CPA at or below target CPA after minimum sample
  - ROAS at or above target ROAS
  - Hook rate > 30% (strong attention)
  - Consistent performance over 3+ days

SCALE METHODOLOGY:
  - Increase budget 20-30% per increment
  - Wait 24-48h between increases
  - If CPA rises after increase, hold for 48h before adjusting
  - Never more than double budget in a single week
```

### Minimum Sample Size Per Variant

```
BEFORE MAKING KILL/SCALE DECISIONS:
  - Minimum impressions: 1,000 (for hook rate evaluation)
  - Minimum link clicks: 50 (for CTR evaluation)
  - Minimum spend: 3x AOV (for CPA evaluation)
  - Minimum time: 72 hours (for algorithm learning)

DO NOT kill a variant before these minimums are met.
DO NOT scale a variant before these minimums are met.
```

---

## INTEGRATION WITH A12 (PERFORMANCE LEARNING LOOP)

A11 creates the launch configuration. A12 ingests performance data post-launch. For A12 to work effectively, A11 must produce:

1. **NAMING-KEY.md** -- so A12 can trace performance data back to variant matrix coordinates (hook type, body framework, CTA type, visual treatment)
2. **TEST-PLAN.md** -- so A12 can compare actual performance to A10 predictions
3. **launch-sequence.md** -- so A12 knows which variants launched when and in what phase
4. **UTM-TRACKING.md** -- so A12 can match analytics data to specific variants
5. **CAMPAIGN-HIERARCHY.md** -- so A12 can map performance data to audience/targeting variables

Without these documents, A12 cannot perform meaningful learning. A11 produces them. This is not optional.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation. Complete A11 Launch Package agent specification with 4-layer architecture (Foundation, Platform Packaging, Campaign Structure, Launch Preparation), 25 microskills across 5 layers (0-4), platform specification reference (Meta, TikTok, YouTube, Google Display), dual naming convention (file + in-platform), campaign structure reference, budget distribution reference, kill/scale decision framework, compliance review with 3-tier verdicts (PASS/FLAG/FAIL), UTM tracking builder, launch sequence planner (3 phases), launch checklist (7 categories), LAUNCH-GUIDE.md output (30KB+, 12 sections), 33 forbidden behaviors, 7 anti-degradation patterns, per-microskill output protocol with 25-entry table, A12 integration requirements, MC-CHECK schedule. |
