# A11-LAUNCH-PACKAGE-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-22
**Purpose:** STRUCTURAL enforcement to prevent launch package skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI packages files with wrong platform specifications (aspect ratio, codec, file size)
- AI organizes by creative concept instead of media buyer workflow (platform-first)
- AI produces incomplete packages missing campaign structure, tracking, or compliance
- AI uses naming conventions that are internal IDs instead of human-readable
- AI skips compliance review or accepts non-compliant files
- AI produces launch guide under 30KB (surface-level summary instead of comprehensive)
- AI invents rationalization: "close enough to spec" / "the media buyer can adjust this"
- AI skips budget math verification (totals don't add up)
- AI bypasses human checkpoint for flagged compliance issues
- AI delivers ad files without campaign hierarchy / audience strategy / test plan

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/A11-launch-package/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/A11-launch-package/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/A11-launch-package/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/A11-launch-package/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "A11-launch-package"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  all_upstream_packages_loaded: true
  platforms_in_scope: "[list: META, TIKTOK, YOUTUBE, GOOGLE]"
  approved_variants_count: "[integer]"
  spec_compliance_100_pct: "[Y/N]"
  campaign_structure_defined: "[Y/N]"
  compliance_review_complete: "[Y/N]"
  launch_guide_size_kb: "[integer >= 30]"

completeness:
  all_microskills_executed: true
  minimum_thresholds_met: true
  quality_gates_passed: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Spec compliance** | 100% of files pass platform specs | HALT -- fix or exclude non-compliant files |
| **Compliance review** | 100% of ads reviewed | HALT -- review remaining ads |
| **Compliance FAIL resolution** | 0 unresolved FAILs | HALT -- modify or exclude failed ads |
| **Compliance FLAG resolution** | 0 unresolved FLAGs | HALT -- escalate to human |
| **Platform coverage** | All platforms from A03 format strategy | HALT -- package missing platform |
| **Naming key completeness** | Every file traceable to variant matrix | HALT -- complete naming key |
| **Launch guide size** | 30KB | HALT -- expand with chunked protocol |
| **UTM coverage** | Every variant has UTM parameters | HALT -- define missing UTMs |
| **Launch sequence phases** | 3 phases defined | HALT -- define missing phases |
| **Budget plan totals** | Math adds up correctly | HALT -- fix budget math |
| **Checklist categories** | 7 of 7 | HALT -- complete missing categories |
| **Campaign hierarchy** | Defined for ALL target platforms | HALT -- define missing hierarchy |
| **Audience targeting** | At least 2 tiers per platform | HALT -- add targeting tiers |

### Platform Specification Enforcement

**EVERY ad file MUST pass ALL 7 checks:**

```
FOR EACH FILE:
  1. Format matches platform requirement (H.264 MP4 for Meta, etc.)
  2. Resolution matches target placement (1080x1080, 9:16, etc.)
  3. File size under platform maximum (4GB Meta, 500MB TikTok, etc.)
  4. Duration within platform limits (video only)
  5. Aspect ratio matches target placement
  6. Codec matches platform requirement (video only)
  7. Audio format and bitrate correct (video only)

IF ANY CHECK FAILS:
  -> Flag file with specific failure reason
  -> DO NOT include non-compliant file in launch package
  -> Return to A08/A09 for re-export at correct specs
  -> GATE_1 remains CLOSED until all files pass
```

**There is NO "close enough" for platform specifications. An ad that cannot upload is an ad that does not exist.**

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "close enough to spec" | Platforms reject uploads that don't match exact specs. No tolerance. | HALT -- Fix file to exact spec |
| "the media buyer can adjust this" | Launch-ready means NO questions. If they ask, package failed. | HALT -- Complete missing element |
| "we can fix this after launch" | Launch package is final. Post-launch is A12 (Performance Learning). | HALT -- Fix before packaging |
| "this platform isn't important" | ALL platforms in A03 format strategy are in scope. | HALT -- Package missing platform |
| "the file will probably upload fine" | VERIFY, don't assume. Spec compliance validator exists for a reason. | HALT -- Run spec compliance check |
| "compliance can be checked later" | Layer 3 compliance review is MANDATORY before Layer 4. | HALT -- Complete compliance review |
| "the naming convention doesn't matter" | Media buyer sees 90 ads in Ads Manager. Names MUST be human-readable AND traceable. | HALT -- Apply naming convention |
| "budget is approximately right" | Budget math must be EXACT. "Approximately" doesn't exist. | HALT -- Fix budget arithmetic |
| "campaign structure is obvious from the files" | Media buyer needs EXPLICIT campaign/ad set/ad hierarchy. | HALT -- Define campaign structure |
| "30KB is too much for a launch guide" | Comprehensive guide, not summary. 30KB is minimum. Use chunked assembly. | HALT -- Expand launch guide |

---

## STRUCTURAL FIX 4: A11-SPECIFIC MC-CHECK

```yaml
LAUNCH-PACKAGE-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

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

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which platforms were packaged and which compliance issues were resolved is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/A11-launch-package/
  PROJECT-STATE.md          # Living document -- updated after every layer
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
  layer-3-outputs/
  layer-4-outputs/
  LAUNCH-PACKAGE/           # Final deliverable directory
  LAUNCH-GUIDE.md           # Primary deliverable (30KB+ minimum)
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "A11-launch-package"
created: "[date]"
last_updated: "[date]"
current_layer: "[0/1/2/3/4]"
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"

inputs_validated:
  scoring_report_loaded: [Y/N]
  variant_matrix_loaded: [Y/N]
  production_assets_loaded: [Y/N]
  format_strategy_loaded: [Y/N]
  vertical_profile_loaded: [Y/N]

package_counts:
  total_variants_approved: "[integer]"
  meta_files_packaged: "[integer]"
  tiktok_files_packaged: "[integer]"
  youtube_files_packaged: "[integer]"
  google_files_packaged: "[integer]"

compliance_status:
  total_ads_reviewed: "[integer]"
  ads_passed: "[integer]"
  ads_flagged: "[integer]"
  ads_failed: "[integer]"

gate_status:
  GATE_0: "[PASS/PENDING]"
  GATE_1: "[PASS/FAIL/PENDING]"
  GATE_2: "[PASS/FAIL/PENDING]"
  GATE_3: "[PASS/FAIL/PENDING]"
  GATE_4: "[PASS/FAIL/PENDING]"

key_decisions:
  - "[None yet]"

next_action: "[Initialize project]"
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
  "spec is close enough" / "budget is approximately right"
  "campaign structure is implied"

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

BEFORE writing launch package or guide files:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/LAUNCH-PACKAGE/ (correct location)
     - [project]/launch-package/ (wrong case)
     - [project]/outputs/LAUNCH-PACKAGE/ (wrong path)
     - [project]/A11-launch-package/LAUNCH-PACKAGE/ (wrong nesting)
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

**Session startup protocol -- BEFORE any launch package execution:**

```
SESSION STARTUP:
  1. READ this file (A11-LAUNCH-PACKAGE-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ A11-LAUNCH-PACKAGE-AGENT.md -- agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current layer position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin launch packaging without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ./CLAUDE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.0.1-vertical-profile-loader | layer-0-outputs/0.0.1-vertical-profile-loader.md | 1KB |
| 0 | 0.1-scoring-report-loader | layer-0-outputs/0.1-scoring-report-loader.md | 2KB |
| 0 | 0.2-variant-matrix-loader | layer-0-outputs/0.2-variant-matrix-loader.md | 2KB |
| 0 | 0.3-production-assets-loader | layer-0-outputs/0.3-production-assets-loader.md | 2KB |
| 0 | 0.4-format-strategy-loader | layer-0-outputs/0.4-format-strategy-loader.md | 1KB |
| 0 | 0.5-input-validator | layer-0-outputs/0.5-input-validator.md | 1KB |
| 1 | 1.1-meta-package-builder | layer-1-outputs/1.1-meta-package-builder.md | 3KB |
| 1 | 1.2-tiktok-package-builder | layer-1-outputs/1.2-tiktok-package-builder.md | 3KB |
| 1 | 1.3-youtube-package-builder | layer-1-outputs/1.3-youtube-package-builder.md | 3KB |
| 1 | 1.4-google-display-package-builder | layer-1-outputs/1.4-google-display-package-builder.md | 3KB |
| 1 | 1.5-naming-key-generator | layer-1-outputs/1.5-naming-key-generator.md | 5KB |
| 1 | 1.6-spec-compliance-validator | layer-1-outputs/1.6-spec-compliance-validator.md | 3KB |
| 2 | 2.1-campaign-hierarchy-architect | layer-2-outputs/2.1-campaign-hierarchy-architect.md | 5KB |
| 2 | 2.2-audience-targeting-strategy | layer-2-outputs/2.2-audience-targeting-strategy.md | 5KB |
| 2 | 2.3-budget-distribution-planner | layer-2-outputs/2.3-budget-distribution-planner.md | 5KB |
| 2 | 2.4-testing-methodology-planner | layer-2-outputs/2.4-testing-methodology-planner.md | 5KB |
| 2 | 2.5-layer-2-validator | layer-2-outputs/2.5-layer-2-validator.md | 2KB |
| 3 | 3.1-compliance-reviewer | layer-3-outputs/3.1-compliance-reviewer.md | 5KB |
| 3 | 3.2-utm-tracking-builder | layer-3-outputs/3.2-utm-tracking-builder.md | 3KB |
| 3 | 3.3-launch-sequence-planner | layer-3-outputs/3.3-launch-sequence-planner.md | 3KB |
| 3 | 3.4-launch-checklist-generator | layer-3-outputs/3.4-launch-checklist-generator.md | 3KB |
| 3 | 3.5-layer-3-validator | layer-3-outputs/3.5-layer-3-validator.md | 2KB |
| 4 | 4.1-launch-package-assembler | layer-4-outputs/4.1-launch-package-assembler.md | 3KB |
| 4 | 4.2-launch-guide-writer | LAUNCH-GUIDE.md | 30KB |
| 4 | 4.3-execution-log-and-checkpoints | execution-log.md + checkpoint YAMLs | 5KB |

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

## PLATFORM SPECIFICATION REFERENCE (EXACT REQUIREMENTS)

**These are HARD technical requirements. Files that do not meet these specs CANNOT upload.**

### Meta (Facebook + Instagram)

```
VIDEO:
  Codec: H.264 (EXACT — not H.265)
  Container: MP4 (EXACT — not MOV)
  Max file size: 4GB (HARD LIMIT)
  Duration: 241 min (feed), 120s (Stories/Reels)
  Aspect ratios (EXACT):
    Feed:    1:1 (1080x1080), 4:5 (1080x1350)
    Stories: 9:16 (1080x1920)
    Reels:   9:16 (1080x1920)
  Min resolution: 1080px shortest side
  Frame rate: 30fps recommended
  Audio: AAC, 128kbps+ stereo

IMAGE:
  Format: JPG or PNG (ONLY)
  Max file size: 30MB (HARD LIMIT)
  Aspect ratios: 1:1, 4:5, 9:16
```

### TikTok

```
VIDEO:
  Codec: H.264 or H.265
  Container: MP4 or MOV
  Max file size: 500MB (HARD LIMIT)
  Duration: 5-60s (21-34s recommended)
  Aspect ratio: 9:16 (1080x1920) ONLY
  Min resolution: 720x1280
  Frame rate: 24-60fps
```

### YouTube

```
VIDEO:
  Codec: H.264 recommended
  Container: MP4, MOV, AVI, WMV, FLV
  Max file size: 128GB (HARD LIMIT)
  Aspect ratios:
    Standard: 16:9 (1920x1080)
    Shorts:   9:16 (1080x1920)
  Min resolution: 1920x1080

THUMBNAIL:
  Resolution: 1280x720 (EXACT)
  Format: JPG, PNG, GIF, BMP
  Max file size: 2MB (HARD LIMIT)
  Aspect ratio: 16:9
```

### Google Display Network

```
RESPONSIVE:
  Images: 1200x628 landscape + 1200x1200 square (BOTH required)
  Logos: 1200x1200 square + 1200x300 landscape
  Format: JPG, PNG
  Max file size: 5120KB per asset

STANDARD SIZES:
  728x90, 300x250, 300x600, 336x280, 970x250, 160x600, 320x50, 320x480
  Format: JPG, PNG, GIF (animated OK), HTML5
  Max file size: 150KB (standard), 5120KB (responsive)
```

**IF ANY FILE FAILS ANY SPEC: FLAG IT. DO NOT INCLUDE IT. GATE_1 STAYS CLOSED.**

---

## NAMING CONVENTION ENFORCEMENT

**Every file and every in-platform ad name MUST follow the dual naming convention.**

### File Naming Convention (EXACT FORMAT)

```
[PLATFORM]-[CONCEPT]-[HOOK]-[BODY]-[CTA]-[VISUAL]-[PLACEMENT].[ext]

Example: META-C1-HK03-BD01-CT02-VIS-A-FEED.mp4

Components (NO flexibility):
  PLATFORM:  META, TIKTOK, YOUTUBE, GOOGLE (EXACT — all caps)
  CONCEPT:   C1, C2, C3 (maps to A06/A10 winning concept)
  HOOK:      HK01-HK99 (maps to A02 HOOK-ANGLE-MATRIX)
  BODY:      BD01-BD99 (maps to A04 SCRIPT-PACKAGE)
  CTA:       CT01-CT99 (maps to CTA version)
  VISUAL:    VIS-A, VIS-B, VIS-C (maps to A05 visual treatment)
  PLACEMENT: FEED, STORY, REEL, PREROLL, BUMPER, SHORTS, or display size
  ext:       mp4, jpg, png
```

### In-Platform Naming Convention (HUMAN-READABLE)

```
[Date]-[Concept]-[Hook Type]-[Body Version]-[CTA Type]-[Visual]-[Notes]

Example: 0222-HealthMech-CuriosityGap-PAS-Urgency-UGC-Phase1

Components:
  Date:       MMDD of launch
  Concept:    Short descriptive name
  Hook Type:  From AD-HOOK-TAXONOMY.md (abbreviated)
  Body:       Script framework (PAS, BAB, AIDA, etc.)
  CTA Type:   Urgency, RiskReversal, LowFriction, SocialProof
  Visual:     UGC, Polished, TextOverlay, Demo, Mixed
  Notes:      Phase1, Phase2, Backup, Scale
```

### NAMING-KEY.md Cross-Reference (MANDATORY)

```
NAMING-KEY.md MUST MAP:
  - Every file name → full variant matrix coordinates
  - Every in-platform name → file name
  - Every variant ID → A10 scoring rank

This is the Rosetta Stone. Without it, media buyer cannot trace ads back to scoring data.

IF NAMING-KEY.md is incomplete: GATE_1 CLOSED.
```

---

## CAMPAIGN STRUCTURE REQUIREMENTS

**Every target platform MUST have:**

1. **Campaign hierarchy defined** (Campaign → Ad Set → Ad structure with grouping logic)
2. **CBO vs ABO recommendation** with rationale (Meta-specific but principle applies to all)
3. **Variant-to-campaign mapping** (which variants go in which campaigns/ad sets)
4. **Placement targeting** (Feed vs Stories vs Reels, etc.)

**Audience targeting MUST have at least 2 tiers:**
- Broad (no targeting — algorithm optimization)
- Interest-based (vertical-specific interest stacking)
- Lookalike/Similar (if customer data available)
- Retargeting (if pixel data available)

**Budget plan MUST:**
- Specify per-platform allocation with rationale
- Define Phase 1 daily budget per platform
- Define per-variant minimum spend before kill/scale decisions (typically 3x AOV)
- Include kill criteria AND scale criteria
- TOTALS MUST ADD UP (math errors trigger HALT)

**Testing methodology MUST:**
- Define Phase 1 priority order (hooks first per AD-ENGINE-CLAUDE.md)
- Define win criteria (statistical or practical significance)
- Map A10 scoring predictions to test priority

**Launch sequence MUST have 3 phases:**
- Phase 1: Initial test (which variants, duration, monitoring cadence)
- Phase 2: Backup deploy (when triggered, which variants)
- Phase 3: Scale/kill decisions (criteria, timing, refresh triggers)

**IF ANY ELEMENT MISSING: GATE_2 CLOSED.**

---

## COMPLIANCE REVIEW REQUIREMENTS

**Every ad MUST be reviewed against its target platform's policies.**

### Three-Tier Compliance Verdicts

```
PASS:  Compliant — can be included in launch package
FLAG:  Potential issue — requires HUMAN REVIEW before launch
FAIL:  Clear violation — must be modified or excluded

PASS verdicts: Proceed
FLAG verdicts: BLOCK Gate 3 until human reviews and decides
FAIL verdicts: BLOCK Gate 3 until ad is modified (return to A07/A08) or excluded
```

### Compliance Checks Per Platform

**Meta:** Prohibited content, restricted content (health/finance/political), personal attributes, misleading claims, before/after requirements, text overlay guidelines

**TikTok:** Prohibited/restricted categories, community guidelines for ads, vertical-specific restrictions

**YouTube:** Ad content policies, restricted ad categories, political content rules

**Google:** Misrepresentation, unreliable claims, inappropriate content, restricted categories

**Vertical-specific compliance** from vertical profile (health claims, financial disclaimers, etc.)

### Compliance Enforcement

```
COMPLIANCE REVIEW MANDATORY:
  - 100% of ads reviewed (no sampling)
  - Every FAIL addressed (modify or exclude)
  - Every FLAG escalated to human
  - GATE_3 BLOCKED until compliance is 100% clear

GATE_3 cannot pass if:
  - Any ads have FAIL verdict unresolved
  - Any ads have FLAG verdict without human decision
```

---

## LAUNCH GUIDE REQUIREMENTS (30KB MINIMUM)

**LAUNCH-GUIDE.md is the PRIMARY deliverable.** This is the document the media buyer reads before launching.

### 12 Required Sections (ALL MANDATORY)

```
1. Executive Summary (campaign overview, variant counts, budget, timeline, priorities)
2. Package Contents (file inventory, directory structure, naming key usage)
3. Meta Setup Guide (campaign creation step-by-step, CBO/ABO, audiences, placements)
4. TikTok Setup Guide (campaign creation, optimization, Spark Ads vs standard)
5. YouTube Setup Guide (campaign types, targeting, thumbnail upload)
6. Google Display Setup Guide (responsive vs standard, placement targeting)
7. Campaign Structure Walkthrough (hierarchy diagrams, grouping rationale)
8. Audience Targeting Walkthrough (tier descriptions, which to test first)
9. Budget & Testing Walkthrough (allocation, kill/scale criteria, priority order)
10. Launch Sequence (Phase 1/2/3, monitoring cadence, refresh triggers)
11. Tracking & Compliance (UTM structure, pixel verification, compliance notes)
12. Launch Checklist (all 7 categories, verification method per item)
```

### Chunked Assembly Protocol (MANDATORY)

```
LAUNCH-GUIDE.md MUST be written in 4-5 PHASES with size checkpoints:

PHASE 1: HEADER + EXECUTIVE SUMMARY (>= 3KB)
  Write metadata, TOC, executive summary

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

**IF LAUNCH-GUIDE.md < 30KB: GATE_4 CLOSED. This is a comprehensive guide, not a summary.**

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 5, 8):
[ ] A11-LAUNCH-PACKAGE-ANTI-DEGRADATION.md read (THIS FILE)
[ ] A11-LAUNCH-PACKAGE-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)
[ ] Input files validated (A10 scoring report, A09 variant matrix, A08 assets, A03 format strategy)

LAYER 0 (LOADING):
[ ] Vertical profile loaded (0.0.1)
[ ] A10 scoring report loaded — approved variants extracted
[ ] A09 variant matrix loaded — cross-referenced with A10 approved list
[ ] A08 production assets inventoried — file existence/format verified
[ ] A03 format strategy loaded — target platforms identified
[ ] Campaign brief available
[ ] All inputs validated
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (PLATFORM PACKAGING):
[ ] Meta package built (if in scope) — feed/stories/reels organized
[ ] TikTok package built (if in scope) — 9:16 files verified
[ ] YouTube package built (if in scope) — pre-roll/bumper/shorts organized, thumbnails verified
[ ] Google Display package built (if in scope) — responsive + standard sizes organized
[ ] File naming convention applied to ALL files
[ ] NAMING-KEY.md generated — every file traceable to variant matrix
[ ] Spec compliance validator run — 100% pass required
[ ] All platform package manifests created
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (CAMPAIGN STRUCTURE):
[ ] Campaign hierarchy defined for ALL target platforms
[ ] CBO vs ABO recommendation with rationale (Meta)
[ ] Audience targeting strategy defined (minimum 2 tiers per platform)
[ ] Budget plan defined with per-platform allocation
[ ] Budget totals add up (math verified)
[ ] Testing methodology defined with Phase 1 priority order
[ ] All variants assigned to campaigns/ad sets
[ ] Variant count matches Layer 1 package count
[ ] Layer 2 validator run
[ ] LAYER_2_COMPLETE.yaml created

LAYER 3 (LAUNCH PREPARATION):
[ ] Compliance review complete (100% of ads reviewed)
[ ] All FAIL verdicts addressed (ads modified or excluded)
[ ] All FLAG verdicts escalated to human (decisions received)
[ ] UTM parameter structure defined for ALL variants
[ ] UTM parameters properly formatted (no spaces, consistent case)
[ ] Launch sequence defined (Phase 1/2/3 all complete)
[ ] Launch checklist generated (all 7 categories populated)
[ ] Layer 3 validator run
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (OUTPUT PACKAGING):
[ ] LAUNCH-PACKAGE/ directory assembled with platform subdirectories
[ ] All spec-compliant ad files moved to platform folders
[ ] All documentation files moved to documentation/ subdirectory
[ ] LAUNCH-GUIDE.md written using chunked protocol (30KB+ verified)
[ ] All 12 required sections present in launch guide
[ ] All checkpoint YAML files created
[ ] execution-log.md complete with all microskills logged
[ ] Final directory tree verified
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with skill completion
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified (sizes, content, completeness)
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY all upstream packages still loaded
[ ] VERIFY spec compliance results from Layer 1
[ ] VERIFY compliance review results from Layer 3
[ ] VERIFY budget math from Layer 2
[ ] If any verification fails, RETURN to that layer
```

---

## KEY INSIGHT

> **"Launch-ready means COMPLETE. A launch package with missing files, wrong specs, absent tracking, or incomplete documentation is NOT launch-ready. The media buyer must be able to take this package and go live without asking a single question. If they have to ask, the package failed."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation with 8 structural fixes, per-microskill output table (25 microskills across Layers 0-4), implementation checklist, platform specification reference (Meta, TikTok, YouTube, Google Display — EXACT requirements), dual naming convention enforcement, campaign structure requirements, 3-tier compliance review protocol, 30KB launch guide with chunked assembly protocol, 13 minimum thresholds, 10 forbidden rationalizations, A11-specific MC-CHECK. Full A11 anti-degradation architecture built from EMAIL-WRITER-ANTI-DEGRADATION.md template and A11-LAUNCH-PACKAGE-AGENT.md skill spec. |
