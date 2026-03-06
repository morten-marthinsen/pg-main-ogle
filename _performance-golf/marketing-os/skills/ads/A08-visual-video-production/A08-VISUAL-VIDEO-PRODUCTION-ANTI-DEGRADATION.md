# A08-VISUAL-VIDEO-PRODUCTION-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-22
**Purpose:** STRUCTURAL enforcement to prevent visual/video production skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI reads visual brief but produces "inspired by" assets instead of matching it exactly
- AI defaults to stock footage before trying AI generation tools
- AI uses wrong tool for asset type (not matching Layer 1.2 assignment)
- AI generates all assets at one aspect ratio then crops for other platforms
- AI skips quality review for individual assets (batch approves without per-asset evaluation)
- AI accepts AI artifacts (extra fingers, morphing, blurred text, robotic voice)
- AI proceeds to assembly before all component assets pass quality review
- AI generates assets without proper naming convention (lineage tracing lost)
- AI doesn't log exact prompts used (reproducibility impossible)
- AI skips dependency sequencing (starts video assembly before voiceover exists)
- AI invents gate statuses other than PASS or FAIL
- AI uses same voice/style for all voiceovers regardless of script emotional arc
- AI produces assets that violate platform technical specs

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/A08-visual-video-production/checkpoints/GATE_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/A08-visual-video-production/checkpoints/GATE_1_COMPLETE.yaml
```

**Layer 2.5 CANNOT execute unless this file exists:**
```
[project]/A08-visual-video-production/checkpoints/GATE_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/A08-visual-video-production/checkpoints/GATE_2.5_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/A08-visual-video-production/checkpoints/GATE_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# GATE_[N]_COMPLETE.yaml
gate: [N]
skill: "A08-visual-video-production"
timestamp: "[ISO 8601]"
result: PASS

verification:
  upstream_packages_loaded:
    visual_direction: true
    copy_production: true
    arena_results: true
    format_strategy: true
  tool_availability_checked: true
  minimum_viable_production: true

asset_inventory:
  total_assets_planned: [number]
  total_assets_generated: [number]
  total_assets_passed_quality: [number]
  total_fallback_briefs: [number]

quality_metrics:
  acceptance_rate: [percent]  # must be >= 70%
  average_brief_fidelity: [number]
  average_production_quality: [number]

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
| **Tool availability check** | At least 1 tool per category (image, voice, video, music, assembly) | HALT -- Cannot produce assets |
| **Concept-to-asset decomposition** | Every winning concept decomposed | HALT -- Production planning incomplete |
| **Tool assignment** | Every asset has tool assigned | HALT -- Cannot generate |
| **Dependency sequencing** | All dependencies mapped | HALT -- Assembly will fail |
| **Asset naming convention** | 100% compliance | HALT -- Lineage tracking broken |
| **Prompt logging** | Every generation prompt logged | HALT -- Reproducibility lost |
| **Quality review** | Every asset reviewed (100%) | HALT -- Cannot proceed to assembly |
| **Brief fidelity score** | >= 7.0 average per asset | HALT -- Regenerate failed assets |
| **Technical compliance** | 100% (all platform specs met) | HALT -- Platform rejection risk |
| **Production quality score** | >= 6.0 average per asset | HALT -- Regenerate failed assets |
| **Acceptance rate** | >= 70% of assets pass quality | HALT -- Escalate to human |
| **Maximum regeneration attempts** | 3 attempts per asset | After 3, create human brief |
| **Assembled ad validation** | All sync/spec/text checks pass | HALT -- Fix before packaging |
| **PRODUCTION-ASSETS-PACKAGE size** | >= 30KB | HALT -- Package too thin |

### Asset Naming Convention (100% COMPLIANCE REQUIRED)

```
[concept-id]-[variant-id]-[platform]-[asset-type]-[version].[format]

Components:
  concept-id:  C01, C02, C03... (from Arena winning concepts)
  variant-id:  V01, V02, V03... (hook swap variant within concept)
  platform:    meta-feed, meta-story, tiktok, youtube-pre, youtube-short, google
  asset-type:  hero-img, bg-img, product-shot, talking-head, vo, music, b-roll, text-overlay, lower-third
  version:     v1, v2, v3 (regeneration attempts)
  format:      jpg, png, mp4, wav, mp3, webm

Examples:
  C01-V01-meta-feed-hero-img-v1.jpg
  C01-V01-tiktok-talking-head-v2.mp4
  C02-V03-meta-story-vo-v1.wav
```

**IF any asset violates naming convention -> HALT. Rename before proceeding.**

### Platform Technical Specs (EXACT COMPLIANCE REQUIRED)

**Meta Feed Images:**
- Aspect Ratio: 1:1 (1080x1080) OR 4:5 (1080x1350) — EXACT, not approximate
- Max File Size: 30MB
- Formats: JPG, PNG only

**Meta Stories/Reels:**
- Aspect Ratio: 9:16 (1080x1920) — EXACT
- Max File Size: 30MB (images), 4GB (video)
- Safe Zone: 250px from top/bottom for text

**TikTok:**
- Aspect Ratio: 9:16 (1080x1920) — EXACT
- Max File Size: 10MB (images), 500MB (video)
- Safe Zone: 150px from bottom for CTA

**YouTube Pre-Roll:**
- Aspect Ratio: 16:9 (1920x1080) — EXACT
- Max File Size: 1GB
- Format: MP4 (H.264), AAC audio 256kbps+

**YouTube Shorts:**
- Aspect Ratio: 9:16 (1080x1920) — EXACT
- Max Duration: 60 seconds
- Max File Size: 1GB

**IF any asset violates platform specs -> FAIL technical compliance. Regenerate correctly.**

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "This image is good enough" | Quality review has specific thresholds. Brief fidelity <7.0 = FAIL. | HALT -- Regenerate |
| "Close to the brief" | Brief fidelity is scored 1-10. <7.0 average = regeneration required. | HALT -- Improve prompt |
| "Stock footage will work fine" | Stock is LAST resort after AI generation attempts + fallbacks fail. | HALT -- Try AI tools first |
| "We can fix it in assembly" | Assembly does NOT fix generation failures. Assets must pass review BEFORE assembly. | HALT -- Regenerate |
| "The tool can't do this" | Try fallback tool. Try different approach. THEN create human brief. | HALT -- Follow fallback tree |
| "This aspect ratio is close enough" | Platform specs are EXACT. 1:1 means 1:1. Not 1.05:1. | HALT -- Regenerate correct ratio |
| "One voiceover style works for all" | Different hook types require different vocal delivery. See voice selection matrix. | HALT -- Match voice to script |
| "The naming convention is too complicated" | Naming enables lineage tracing. Without it, assembly fails. | HALT -- Use exact convention |
| "I'll update the manifest later" | Update IMMEDIATELY after each asset generated. Later never comes. | HALT -- Update now |
| "The brief is unrealistic for AI" | Produce what you can. Create fallback brief for rest. NOT skip entirely. | HALT -- Follow degradation protocol |
| "Brief drift isn't significant" | Brief fidelity score quantifies drift. <7.0 = significant. | HALT -- Regenerate to match brief |
| "Platform specs don't matter for testing" | Every asset either production-ready or rejected. No "good enough for testing." | HALT -- Meet specs exactly |
| "Quality review takes too long" | Every asset gets reviewed. No batch approvals. | HALT -- Review each asset |

---

## STRUCTURAL FIX 4: A08-SPECIFIC MC-CHECK

```yaml
A08-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 2.5 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

  tool_availability_check:
    image_tools_available: [count]
    video_tools_available: [count]
    voice_tools_available: [count]
    music_tools_available: [count]
    assembly_tools_available: [count]
    minimum_viable_production: [true/false]
    if_false: "STOP -- Cannot produce assets. Skip to Layer 4 with human briefs."

  brief_compliance_check:
    am_i_matching_brief_exactly: [Y/N]
    am_i_drifting_inspired_by: [Y/N]
    if_drift: "STOP -- Re-read visual brief section. Match it EXACTLY."

  tool_assignment_check:
    using_assigned_tool_from_1_2: [Y/N]
    defaulting_to_stock_first: [Y/N]
    if_no_or_stock: "STOP -- Use assigned AI tool first. Stock is fallback."

  naming_check:
    assets_named_per_convention: [Y/N]
    lineage_traceable: [Y/N]
    if_no: "STOP -- Rename assets to convention format."

  quality_review_check:
    every_asset_reviewed: [Y/N]
    any_batch_approvals: [Y/N]
    acceptance_rate: [percent]
    if_batch_or_low_rate: "STOP -- Review each asset individually."

  platform_spec_check:
    all_aspect_ratios_exact: [Y/N]
    all_resolutions_meet_minimum: [Y/N]
    all_file_sizes_under_maximum: [Y/N]
    safe_zones_respected: [Y/N]
    if_any_no: "STOP -- Regenerate with correct specs."

  dependency_check:
    voiceover_before_video_timing: [Y/N]
    music_matches_vo_duration: [Y/N]
    text_overlays_reference_final_copy: [Y/N]
    if_any_no: "STOP -- Respect dependency sequence."

  manifest_check:
    all_assets_logged: [Y/N]
    all_prompts_recorded: [Y/N]
    all_quality_scores_recorded: [Y/N]
    if_any_no: "STOP -- Update manifest immediately."

  rationalization_check:
    am_i_saying_good_enough: [Y/N]
    am_i_saying_close_to_brief: [Y/N]
    am_i_saying_fix_in_assembly: [Y/N]
    am_i_using_stock_first: [Y/N]
    am_i_skipping_quality_review: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_TOOLS | HALT_BRIEF | HALT_QUALITY | HALT_SPECS | HALT_NAMING]
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session production projects lose continuity without persistent state files. Without PROJECT-STATE.md, which assets were produced and which passed quality review is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/A08-visual-video-production/
  PROJECT-STATE.md          # Living document -- updated after every asset batch
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
  layer-2.5-outputs/
  layer-3-outputs/
  layer-4-outputs/
  AD-ASSETS/
    meta-feed/
    meta-story/
    tiktok/
    youtube-pre/
    youtube-short/
    google/
    audio/
      voiceover/
      music/
    stock/
    fallback-briefs/
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "A08-visual-video-production"
created: "[date]"
last_updated: "[date]"
current_layer: [0 | 1 | 2 | 2.5 | 3 | 4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
degradation_level: [0 | 1 | 2 | 3]  # See Graceful Degradation Protocol

tool_availability:
  image_generation: "[tool name] -- AVAILABLE/UNAVAILABLE"
  video_generation: "[tool name] -- AVAILABLE/UNAVAILABLE"
  voice_generation: "[tool name] -- AVAILABLE/UNAVAILABLE"
  music_generation: "[tool name] -- AVAILABLE/UNAVAILABLE"
  assembly: "[tool name] -- AVAILABLE/UNAVAILABLE"
  minimum_viable_production: [true/false]

asset_counts:
  total_planned: [number]
  total_generated: [number]
  total_passed_quality: [number]
  total_failed_quality: [number]
  total_fallback_briefs: [number]

concept_progress:
  - concept_id: "C01"
    variants: [list]
    platforms: [list]
    assets_planned: [number]
    assets_complete: [number]
    status: "[NOT_STARTED | IN_PROGRESS | COMPLETE]"
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
  PASS (gate evaluation)
  COMPLETE (layer checkpoint)

VALID DECISION STATUSES (quality review):
  PASS (asset meets all thresholds)
  FAIL (asset requires regeneration)
  FALLBACK (asset failed 3 attempts, needs human brief)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  PROCEED_WITH_CONCERNS / WARNING
  "good enough" / "acceptable for testing"
  "brief fidelity is close enough" / "specs are approximately right"
  "quality is reasonable" / "passes most criteria"

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE any asset files created under the false status
  3. RETURN to the failing layer/microskill
  4. Re-evaluate with valid statuses only
```

---

## STRUCTURAL FIX 7: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing asset files or packages:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/AD-ASSETS/[platform]/[filename] (correct location)
     - [project]/[filename] (root -- from failed attempts)
     - [project]/assets/[filename] (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new asset files

AFTER any FAILED generation attempt:
  1. DELETE the failed asset file
  2. LOG the failure and deletion in PROGRESS-LOG.md
  3. LOG the failed prompt in execution log (for learning)

BEFORE creating new PRODUCTION-ASSETS-PACKAGE.md:
  1. CHECK for previous version
  2. IF exists and being replaced:
     - RENAME old version to PRODUCTION-ASSETS-PACKAGE-[timestamp].md
     - LOG replacement in PROGRESS-LOG.md
  3. Write new package
```

---

## STRUCTURAL FIX 8: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol -- BEFORE any production execution:**

```
SESSION STARTUP:
  1. READ this file (A08-VISUAL-VIDEO-PRODUCTION-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ A08-VISUAL-VIDEO-PRODUCTION-AGENT.md -- agent architecture and constraints
  3. READ AD-ENGINE-CLAUDE.md -- Ad Engine master constraints
  4. IF resuming: READ PROJECT-STATE.md for current position
  5. IF resuming: READ checkpoint files to verify layer completion
  6. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md, AD-ASSETS/) if not exists
  7. ONLY THEN begin execution

NEVER begin asset generation without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ./CLAUDE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.0.1-vertical-profile-loader | layer-0-outputs/0.0.1-vertical-profile.md | 1KB |
| 0 | 0.1-visual-direction-loader | layer-0-outputs/0.1-visual-direction-loader.md | 2KB |
| 0 | 0.2-copy-production-loader | layer-0-outputs/0.2-copy-production-loader.md | 2KB |
| 0 | 0.3-arena-results-loader | layer-0-outputs/0.3-arena-results-loader.md | 1KB |
| 0 | 0.4-format-strategy-loader | layer-0-outputs/0.4-format-strategy-loader.md | 1KB |
| 0 | 0.5-tool-availability-validator | layer-0-outputs/0.5-tool-availability.md | 2KB |
| 1 | 1.1-concept-asset-decomposition | layer-1-outputs/1.1-asset-decomposition.md | 5KB |
| 1 | 1.2-tool-assignment | layer-1-outputs/1.2-tool-assignment.md | 3KB |
| 1 | 1.3-platform-variant-expansion | layer-1-outputs/1.3-platform-variants.md | 3KB |
| 1 | 1.4-dependency-sequencing | layer-1-outputs/1.4-dependency-sequence.md | 3KB |
| 1 | 1.5-production-schedule | layer-1-outputs/1.5-production-schedule.md | 3KB |
| 2 | 2.1-image-generation | layer-2-outputs/2.1-image-generation.md | 5KB |
| 2 | 2.2-voiceover-generation | layer-2-outputs/2.2-voiceover-generation.md | 5KB |
| 2 | 2.3-music-generation | layer-2-outputs/2.3-music-generation.md | 3KB |
| 2 | 2.4-video-generation | layer-2-outputs/2.4-video-generation.md | 5KB |
| 2 | 2.5-stock-sourcing | layer-2-outputs/2.5-stock-sourcing.md | 2KB |
| 2 | 2.6-text-overlay-specification | layer-2-outputs/2.6-text-overlay-specs.md | 3KB |
| 2.5 | 2.5.1-image-quality-audit | layer-2.5-outputs/2.5.1-image-quality-audit.md | 5KB |
| 2.5 | 2.5.2-voiceover-quality-audit | layer-2.5-outputs/2.5.2-voiceover-quality-audit.md | 5KB |
| 2.5 | 2.5.3-video-quality-audit | layer-2.5-outputs/2.5.3-video-quality-audit.md | 5KB |
| 2.5 | 2.5.4-regeneration-fallback | layer-2.5-outputs/2.5.4-regeneration-log.md | 3KB |
| 3 | 3.1-static-assembly | layer-3-outputs/3.1-static-assembly.md | 3KB |
| 3 | 3.2-video-assembly | layer-3-outputs/3.2-video-assembly.md | 5KB |
| 3 | 3.3-platform-rendering | layer-3-outputs/3.3-platform-rendering.md | 3KB |
| 3 | 3.4-assembly-validation | layer-3-outputs/3.4-assembly-validation.md | 3KB |
| 4 | 4.1-asset-manifest | layer-4-outputs/4.1-asset-manifest.md | 5KB |
| 4 | 4.2-production-summary | layer-4-outputs/4.2-production-summary.md | 3KB |
| 4 | 4.3-downstream-handoff | layer-4-outputs/4.3-downstream-handoff.md | 3KB |

### Layer Gate Enhancement

Each GATE_N_COMPLETE.yaml checkpoint MUST list all microskill output files with sizes. If ANY output file is missing, the checkpoint CANNOT be created.

### Execution Log Enhancement

Each microskill entry in execution-log.md MUST include:
- Spec file read: [Y/N] with path
- Output file created: [Y/N] with path
- Output file size: [X]KB
- Tool used: [tool name] or "N/A"
- Assets generated: [count] or "N/A"
- Schema compliance: [Y/N]

### Forbidden Behaviors

1. Executing microskills without reading their .md spec files
2. Producing summary output without per-microskill files
3. Checkpoint YAML without microskill output file listing
4. Output files below minimum size thresholds
5. Output files missing required section headers from spec

---

## GRACEFUL DEGRADATION PROTOCOL

A08 is the most tool-dependent skill in the Ad Engine. Tools may be unavailable, unreliable, or produce inadequate results. The protocol must handle this gracefully.

### Degradation Levels

```
LEVEL 0: FULL PRODUCTION (all tools available, all assets AI-generated)
  -> Best case. Every asset produced by AI tools.
  -> A09 receives complete asset library.

LEVEL 1: PARTIAL PRODUCTION (some tools unavailable)
  -> Use fallback tools for affected asset types.
  -> Quality may be lower for some assets.
  -> Log which assets used fallback tools.

LEVEL 2: MIXED PRODUCTION (some assets AI-generated, some require human)
  -> AI-produced assets proceed normally.
  -> Failed assets get human production briefs.
  -> A09 receives partial asset library + fallback briefs.
  -> Campaign can launch with AI assets while human produces remaining.

LEVEL 3: BRIEF-ONLY OUTPUT (no production tools available)
  -> A08 produces COMPREHENSIVE production briefs for ALL assets.
  -> Briefs include: exact specifications, style references, timing, platform specs.
  -> A human production team or freelancer executes from the briefs.
  -> A08 still provides value: the production PLANNING is complete even without execution.
  -> This is NOT a failure -- it's a valid degradation mode.

LEVEL DETECTION:
  Layer 0.5 (Tool Availability) determines the level.
  Level is logged in PROJECT-STATE.md.
  All downstream processing adjusts accordingly.
```

### Fallback Decision Tree

```
WHEN A TOOL FAILS FOR A SPECIFIC ASSET:

1. Is there a fallback tool in the hierarchy? (Layer 1.2)
   YES -> Use fallback tool. Log the switch.
   NO -> Go to step 2.

2. Can a different APPROACH produce the same result?
   (e.g., static image + Ken Burns effect instead of AI video)
   YES -> Use alternative approach. Log the change.
   NO -> Go to step 3.

3. Is there STOCK content that matches the brief closely enough?
   YES -> Source stock. Log "stock substitution" in manifest.
   NO -> Go to step 4.

4. Create HUMAN PRODUCTION BRIEF.
   -> Include all brief specs, failed attempts, recommendations.
   -> Save to AD-ASSETS/fallback-briefs/[asset-id]-human-brief.md
   -> Mark asset as FALLBACK in manifest.
   -> Continue with other assets.
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 5, 8):
[ ] A08-VISUAL-VIDEO-PRODUCTION-ANTI-DEGRADATION.md read (THIS FILE)
[ ] A08-VISUAL-VIDEO-PRODUCTION-AGENT.md read
[ ] AD-ENGINE-CLAUDE.md read (Integration Architecture section)
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] AD-ASSETS/ directory structure created (all platform subdirectories)
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)
[ ] Input files validated (A05, A07, A06, A03 packages exist)

LAYER 0 (FOUNDATION & LOADING):
[ ] Vertical profile loaded (if applicable)
[ ] A05 Visual Direction Package loaded
[ ] A07 Copy Production Package loaded
[ ] A06 Arena Results loaded
[ ] A03 Format Strategy loaded
[ ] Tool availability checked for ALL tool categories
[ ] Minimum viable production assessment complete
[ ] GATE_0_COMPLETE.yaml created
[ ] All Layer 0 per-microskill output files exist (6 files)

LAYER 1 (PRODUCTION PLANNING):
[ ] Every winning concept decomposed into asset list
[ ] Every asset assigned to specific tool (no unassigned assets)
[ ] Platform variant expansion complete
[ ] Dependency graph built (all dependencies identified)
[ ] Production schedule created with phase ordering
[ ] GATE_1_COMPLETE.yaml created
[ ] All Layer 1 per-microskill output files exist (5 files)

LAYER 2 (ASSET GENERATION):
[ ] All Phase 1 assets generated (no dependencies)
[ ] All Phase 2 assets generated (first-order dependencies)
[ ] All Phase 3 assets generated (second-order dependencies)
[ ] Every asset named per convention (100% compliance)
[ ] Every prompt logged with exact text
[ ] Manifest updated with every asset (no missing entries)
[ ] Tool usage logged per asset
[ ] GATE_2_COMPLETE.yaml created
[ ] All Layer 2 per-microskill output files exist (6 files)

LAYER 2.5 (ASSET QUALITY REVIEW):
[ ] Every image reviewed against A05 brief (100% coverage)
[ ] Every voiceover reviewed against A07 script (100% coverage)
[ ] Every video reviewed against A05 brief (100% coverage)
[ ] Failed assets regenerated (up to 3 attempts each)
[ ] Fallback briefs created for assets that failed all 3 attempts
[ ] Acceptance rate >= 70% (or escalation to human)
[ ] Quality scores logged for every asset
[ ] GATE_2.5_COMPLETE.yaml created
[ ] All Layer 2.5 per-microskill output files exist (4 files)

LAYER 3 (ASSET ASSEMBLY):
[ ] Static ads assembled with text overlays + CTAs + logos
[ ] Video ads assembled with VO + music + text overlays + b-roll
[ ] Multi-platform renders complete (all aspect ratios)
[ ] Assembly validation passed for all units (sync/spec/text checks)
[ ] NO assets with FAIL verdict included in assembly
[ ] GATE_3_COMPLETE.yaml created
[ ] All Layer 3 per-microskill output files exist (4 files)

LAYER 4 (OUTPUT PACKAGING):
[ ] PRODUCTION-ASSETS-PACKAGE.md created (>= 30KB)
[ ] Asset manifest complete (every asset with full metadata)
[ ] Production summary complete (quality metrics, tool usage, lessons)
[ ] Downstream handoff to A09 complete
[ ] Execution log complete (all microskills verified)
[ ] GATE_4_COMPLETE.yaml created
[ ] All Layer 4 per-microskill output files exist (3 files)

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with final status + degradation level
[ ] PROGRESS-LOG.md updated with session summary
[ ] All per-microskill output files verified to exist (32 total)
[ ] All checkpoint YAML files exist (6 gates: 0, 1, 2, 2.5, 3, 4)
[ ] AD-ASSETS/ directory contains all produced assets with correct naming
[ ] Fallback briefs directory contains briefs for any failed assets
[ ] Manifest verified complete (no missing asset entries)

ON CONTEXT RESUME:
[ ] VERIFY tool availability hasn't changed (re-run 0.5)
[ ] VERIFY assets exist at expected paths (file system check)
[ ] VERIFY manifest entries match actual files (no orphans)
[ ] VERIFY quality review completion (all assets have verdicts)
[ ] If any verification fails, RETURN to appropriate layer
```

---

## KEY INSIGHT

> **"Production serves the concept. Always. The visual brief and the copy define what must be produced. A08 does not invent, reinterpret, or 'improve' the creative direction. If the brief says 'close-up of weathered hands holding a bottle,' A08 produces a close-up of weathered hands holding a bottle. Not a medium shot. Not young hands. Not holding something else. The creative decisions were made upstream. A08 executes them."**

---

## ASSET GENERATION ANTI-PATTERNS (SPECIFIC TO A08)

### Brief Drift Patterns

| Pattern | Example | Why Invalid | Fix |
|---------|---------|-------------|-----|
| **Aesthetic over accuracy** | Brief: "weathered hands holding bottle"; Generated: "young hands, perfect manicure, clean studio lighting" | AI optimized for visual appeal over brief match | Re-read brief. Extract EXACT subject description. Regenerate. |
| **"Inspired by" generation** | Brief: "35mm film grain, golden hour lighting"; Generated: "clean digital, bright daylight" | AI used brief as suggestion, not requirement | Brief specs are REQUIREMENTS. Match them exactly. |
| **Tool capability override** | Brief: "photorealistic product shot"; Generated: "artistic illustration because Midjourney does that well" | Tool capability does NOT override brief requirements | Use tool that CAN produce brief requirements. Try fallback. |
| **Generic substitution** | Brief: "specific bottle design, label visible"; Generated: "generic bottle shape, label blurred" | Specificity lost during generation | Add negative prompts. Increase guidance scale. Regenerate. |

### Tool Selection Failures

| Failure | Example | Why Invalid | Fix |
|---------|---------|-------------|-----|
| **Stock-first mentality** | "I'll just find stock footage" without trying AI generation | Stock is LAST resort, after all AI tools + fallbacks fail | Follow tool hierarchy. Try AI tools first. |
| **Wrong tool for asset type** | Using Midjourney for product shots requiring accuracy (should use Flux) | Tool assignment in 1.2 optimizes tool-to-task fit | Use assigned tool from Layer 1.2 tool assignment. |
| **Skipping fallback tools** | Primary tool fails once, immediately goes to human brief | 3 attempts required: primary, fallback, different approach | Follow fallback decision tree (4 steps). |
| **Tool unavailability ignored** | Proceeding without checking tool availability (0.5) | Can't generate if tools unavailable | Run 0.5 tool probe BEFORE planning. |

### Quality Review Failures

| Failure | Example | Why Invalid | Fix |
|---------|---------|-------------|-----|
| **Batch approval** | "All 10 images look good" without individual scoring | Every asset scored individually on 3 dimensions | Review EACH asset separately. Score all 3 dimensions. |
| **AI artifact acceptance** | Accepting images with extra fingers, morphing, blurred text | AI artifacts = automatic FAIL | Regenerate with negative prompts targeting artifacts. |
| **"Close enough" scoring** | Brief fidelity 6.5, rounded to 7.0 "close enough" | Scores are EXACT. 6.5 < 7.0 = regeneration required | Don't round. If <7.0, regenerate with improved prompt. |
| **Skipping technical compliance** | "Resolution looks fine" without checking exact specs | Platform specs are binary. Either exact or FAIL. | Check resolution, aspect ratio, file size EXACTLY. |
| **Missing regeneration** | First attempt fails, immediately creates human brief | Must try 3 times: refined prompt, fallback tool, different approach | Attempt 2 with refined prompt. Attempt 3 with fallback tool. |

### Assembly Failures

| Failure | Example | Why Invalid | Fix |
|---------|---------|-------------|-----|
| **Assembly before review** | Starting video assembly with unreviewed component assets | Assembly requires PASS assets only. FAIL assets excluded. | Complete Layer 2.5 quality review before Layer 3 assembly. |
| **Dependency violation** | Cutting video before voiceover exists | Voiceover sets timing. Video cut to match audio. | Follow dependency sequence from Layer 1.4. |
| **Platform spec violation** | Cropping 16:9 to 9:16 instead of native generation | Cropping loses critical visual information. Safe zones violated. | Generate assets at target aspect ratio natively. |
| **Missing sync validation** | Video + voiceover assembled without sync check | Audio-visual sync is MANDATORY validation step | Run sync check (Layer 3.4). Fix timing before packaging. |

### Naming & Tracking Failures

| Failure | Example | Why Invalid | Fix |
|---------|---------|-------------|-----|
| **Convention violation** | "hero-image-1.jpg" instead of "C01-V01-meta-feed-hero-img-v1.jpg" | Lineage tracking broken. Assembly can't match assets to concepts. | Rename to exact convention format. 100% compliance. |
| **Missing manifest entries** | Asset generated but not logged in manifest | If not in manifest, asset is orphaned. A09 won't find it. | Update manifest IMMEDIATELY after each asset generated. |
| **Prompt not logged** | Asset generated but prompt not recorded | Reproducibility lost. Can't regenerate if needed. | Log exact prompt text for every generation. |
| **Quality scores missing** | Asset passed but scores not recorded | Learning impossible. Can't improve future prompts. | Record all 3 dimension scores for every asset. |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation. Full 8-section anti-degradation architecture for A08 Visual/Video Production skill. Structural fixes: mandatory checkpoint files (6 gates), minimum thresholds (30+ metrics), forbidden rationalizations (13 patterns), A08-specific MC-CHECK, mandatory project infrastructure, binary gate enforcement, stale artifact cleanup, anti-degradation mandatory read protocol. Per-microskill output protocol (32 microskills across 6 layers). Graceful degradation protocol (Levels 0-3). Implementation checklist (80+ verification items). Asset generation anti-patterns table (25+ specific patterns across 5 categories: brief drift, tool selection, quality review, assembly, naming/tracking). Platform technical specs table. Asset naming convention enforcement. Quality review criteria (3 dimensions). Regeneration protocol (3 attempts then fallback). Tool landscape documentation. Degradation level tracking. A08-specific degradation patterns: brief drift, generic stock fallback, tool-first thinking, platform spec amnesia, voiceover monotony, missing dependency ordering, no per-asset quality gate, untracked asset lineage. |
