# A05-VISUAL-DIRECTION-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-22
**Purpose:** STRUCTURAL enforcement to prevent A05 Visual Direction skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: A05-VISUAL-DIRECTION-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Write vague shot descriptions like "Show product" (this is a placeholder, not visual direction), skip sound-off strategy for any concept (85% of Meta views are mute), or apply the same visual treatment to all concepts without strategic justification.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**

1. **The Visual Afterthought** — Script is audio-complete with detailed dialogue, but visual column reads "Show product. Show happy customer. Show results." This is not visual direction. This is a placeholder.
2. **Generic Stock Imagery** — AI defaults to vague, category-level visual descriptions ("woman smiling while holding supplement") instead of specific, branded, production-ready shots.
3. **Visual-Copy Disconnect** — Audio says "ancient Himalayan compound" while visual shows modern lab. Hook says "I threw out all my skincare" while visual shows product glamour shot. Visual must MIRROR and AMPLIFY copy's emotional trajectory.
4. **Platform-Blind Visuals** — Same visual brief regardless of whether ad runs on TikTok (9:16, raw/authentic, text-heavy) or YouTube (16:9, higher production, thumbnail-critical).
5. **Style Monotony** — All concepts receive same visual treatment (all polished or all UGC) instead of matching visual style to concept strategy.
6. **Missing Sound-Off Strategy** — No consideration for how ad communicates without audio. 85% of Meta video is watched on mute. Sound-off is PRIMARY viewing mode.
7. **Tool-Blind Specs** — Visual briefs written without awareness of what AI production tools can actually generate. Midjourney has different strengths than Flux. Arcads differs from Creatify.

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/A05-visual-direction/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/A05-visual-direction/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 2.5 (Coherence Check) CANNOT execute unless this file exists:**
```
[project]/A05-visual-direction/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/A05-visual-direction/checkpoints/LAYER_2.5_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/A05-visual-direction/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "A05-visual-direction"
status: COMPLETE  # The ONLY acceptable value
timestamp: "[ISO 8601]"

verification:
  all_scripts_have_visual_briefs: true
  all_shots_fully_specified: true
  vague_descriptions_count: 0  # MUST be zero
  platform_specs_complete: true
  sound_off_strategy_complete: true
  tool_specs_complete: true

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
| **Scripts with visual briefs** | 100% coverage | HALT -- Complete missing briefs |
| **Shot specificity** | Every beat specified (type, subject, action, duration, framing, text overlay, transition) | HALT -- Replace vague with specific |
| **Vague descriptions** | 0 instances | HALT -- "Show product" is FORBIDDEN |
| **Platform-specific specs** | All target platforms | HALT -- Add missing platform specs |
| **Sound-off strategy** | Every concept | HALT -- 85% of Meta views are mute |
| **Visual-copy coherence** | >= 7.0 overall score | HALT -- Fix misalignments |
| **Tool-specific production specs** | All concepts | HALT -- A08 needs executable specs |
| **VISUAL-DIRECTION-PACKAGE.md size** | >= 80KB | HALT -- Expand to comprehensive coverage |

### Shot Specification Requirements (EVERY SHOT)

```yaml
required_shot_elements:
  shot_type: "[CU/MCU/MS/MWS/WS/ECU] -- REQUIRED"
  subject: "[Specific description -- NOT 'person' or 'product'] -- REQUIRED"
  action: "[What happens in frame] -- REQUIRED"
  duration: "[X seconds] -- REQUIRED"
  framing: "[Rule of thirds placement, headroom, leading space] -- REQUIRED"
  text_overlay: "[Exact words, position, style, OR 'none'] -- REQUIRED"
  transition: "[cut/dissolve/swipe/zoom to next shot] -- REQUIRED"

IF any element missing: SHOT IS INCOMPLETE → HALT
```

### Platform-Specific Safe Zones (MANDATORY)

| Platform | Safe Zone Rules | If Violated |
|----------|----------------|-------------|
| **Meta** | Top 14% NO critical content, Bottom 10% NO critical content, Max 20% text coverage | HALT -- Meta enforces algorithmically |
| **TikTok** | Top 15% NO critical, Bottom 20% NO critical, Right 15% NO critical, CENTER 50-60% for all key visuals | HALT -- Content will be obscured |
| **YouTube** | Bottom 20% NO critical text (controls bar), Thumbnail MUST be designed separately | HALT -- Poor UX/discovery |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "The script is descriptive enough" | Visual direction is a separate deliverable. Scripts describe AUDIO, not VISUALS. | HALT -- Write the visual brief |
| "Production team will figure it out" | If production team has questions, visual direction is incomplete. | HALT -- Specify until no questions possible |
| "Visual direction can be refined later" | Later = never. Visual gaps discovered in production are expensive. | HALT -- Complete now |
| "Close enough to a visual brief" | Binary: either every shot is specified or it's not. No middle ground. | HALT -- Complete all shots |
| "Generic stock will work" | Generic visuals produce generic ads. Specificity = quality. | HALT -- Write specific shot descriptions |
| "Same treatment works for all concepts" | Different hooks/scripts/platforms demand different visual treatments. | HALT -- Strategic treatment selection required |
| "The visual is just 'show product'" | "Show product" is not a shot specification. It's a placeholder. | HALT -- Specify: type, angle, lighting, surface, background |
| "Text overlays aren't critical" | 85% of Meta video is watched on mute. Text overlays ARE the message. | HALT -- Design text overlay strategy |
| "Platform specs are formatting details" | Platform constraints are CREATIVE constraints. TikTok ≠ YouTube. | HALT -- Platform-specific visual design |
| "Sound-off can be handled later" | Sound-off is PRIMARY viewing mode. Must be designed from start. | HALT -- Complete sound-off strategy |

---

## STRUCTURAL FIX 4: A05-SPECIFIC MC-CHECK

```yaml
VISUAL-DIRECTION-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 2.5 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

  script_coverage:
    total_scripts_from_A04: [count]
    scripts_with_visual_briefs: [count]
    coverage_percentage: [number]
    if_under_100: "STOP -- Complete missing visual briefs"

  shot_specificity_check:
    total_shots_specified: [count]
    vague_descriptions_found: [count]
    examples_of_vague: ["show product", "happy customer", etc. OR "none"]
    if_any_vague: "STOP -- Replace ALL vague descriptions with specific shots"

  platform_compliance:
    target_platforms: ["Meta", "TikTok", "YouTube", etc.]
    platforms_with_specs: ["Meta", "TikTok", etc.]
    safe_zones_documented: [Y/N]
    if_any_missing: "STOP -- Add platform-specific visual specs"

  sound_off_verification:
    concepts_with_sound_off_strategy: [count]
    total_concepts: [count]
    text_overlay_plan_complete: [Y/N]
    if_incomplete: "STOP -- 85% of Meta views are mute. Sound-off is mandatory."

  visual_copy_coherence:
    concepts_scored: [count]
    minimum_coherence_score: [lowest score]
    concepts_below_7_0: [count]
    if_any_below: "STOP -- Fix visual-audio misalignments"

  tool_spec_completeness:
    midjourney_prompts: [Y/N]
    arcads_briefs: [Y/N if UGC concepts exist]
    elevenlabs_specs: [Y/N if voiceover concepts exist]
    stock_queries: [Y/N]
    if_any_missing: "STOP -- A08 needs executable production specs"

  rationalization_check:
    am_i_writing_vague_shots: [Y/N]
    am_i_skipping_platform_specs: [Y/N]
    am_i_ignoring_sound_off: [Y/N]
    am_i_using_same_treatment_for_all: [Y/N]
    am_i_thinking_production_will_figure_it_out: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_COVERAGE | HALT_SPECIFICITY | HALT_PLATFORM | HALT_COHERENCE | HALT_TOOLS]
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem

Multi-session visual direction projects lose continuity without persistent state files. Without PROJECT-STATE.md, which concepts were visually directed and which treatment types were assigned is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/A05-visual-direction/
  PROJECT-STATE.md          # Living document -- updated after every concept
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
  layer-2.5-outputs/
  layer-3-outputs/
  layer-4-outputs/
  visual-briefs/            # Per-concept visual brief files
  VISUAL-DIRECTION-PACKAGE.md  # PRIMARY DELIVERABLE
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "A05-visual-direction"
created: "[date]"
last_updated: "[date]"
current_concept: "[concept ID being worked on]"
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"

inputs_validated:
  script_package_loaded: [Y/N]
  format_strategy_loaded: [Y/N]
  ad_intelligence_loaded: [Y/N]
  brand_guidelines_loaded: [Y/N]

concepts_completed:
  - id: "concept-01"
    script_id: "script-01"
    treatment_type: "UGC-Native"
    visual_brief_status: "COMPLETE"
    coherence_score: 8.2
  - id: "concept-02"
    script_id: "script-02"
    treatment_type: "Hybrid"
    visual_brief_status: "IN_PROGRESS"
    current_phase: "shot-list-generation"
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
  "visual is approximately right" / "close enough to specific"

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

BEFORE writing visual direction package or per-concept briefs:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/visual-direction-package.md (root -- from failed attempts)
     - [project]/A05-visual-direction/VISUAL-DIRECTION-PACKAGE.md (correct)
     - [project]/outputs/visual-direction.md (wrong path)
     - [project]/A05-visual-direction/visual-briefs/*.md (old concept files)
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

**Session startup protocol -- BEFORE any visual direction execution:**

```
SESSION STARTUP:
  1. READ this file (A05-VISUAL-DIRECTION-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ A05-VISUAL-DIRECTION-AGENT.md -- agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin visual direction without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ./CLAUDE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.0.1-vertical-profile-loader | layer-0-outputs/0.0.1-vertical-profile-loader.md | 1KB |
| 0 | 0.1-script-package-loader | layer-0-outputs/0.1-script-package-loader.md | 2KB |
| 0 | 0.2-format-strategy-loader | layer-0-outputs/0.2-format-strategy-loader.md | 1KB |
| 0 | 0.3-ad-intelligence-visual-loader | layer-0-outputs/0.3-ad-intelligence-visual-loader.md | 2KB |
| 0 | 0.4-brand-asset-loader | layer-0-outputs/0.4-brand-asset-loader.md | 1KB |
| 0 | 0.5-soul-md-visual-loader | layer-0-outputs/0.5-soul-md-visual-loader.md | 1KB |
| 0 | 0.6-input-validator | layer-0-outputs/0.6-input-validator.md | 1KB |
| 1 | 1.1-treatment-type-selector | layer-1-outputs/1.1-treatment-type-selector.md | 3KB |
| 1 | 1.2-color-palette-designer | layer-1-outputs/1.2-color-palette-designer.md | 3KB |
| 1 | 1.3-typography-system | layer-1-outputs/1.3-typography-system.md | 2KB |
| 1 | 1.4-visual-competitive-positioning | layer-1-outputs/1.4-visual-competitive-positioning.md | 3KB |
| 1 | 1.5-layer-1-validator | layer-1-outputs/1.5-layer-1-validator.md | 2KB |
| 2 | 2.1-shot-list-generator | layer-2-outputs/2.1-shot-list-generator.md | 10KB |
| 2 | 2.2-talent-direction-brief | layer-2-outputs/2.2-talent-direction-brief.md | 5KB |
| 2 | 2.3-product-staging-spec | layer-2-outputs/2.3-product-staging-spec.md | 5KB |
| 2 | 2.4-motion-graphics-design | layer-2-outputs/2.4-motion-graphics-design.md | 5KB |
| 2 | 2.5-broll-strategy | layer-2-outputs/2.5-broll-strategy.md | 5KB |
| 2 | 2.6-sound-off-strategy | layer-2-outputs/2.6-sound-off-strategy.md | 5KB |
| 2 | 2.7-thumbnail-design | layer-2-outputs/2.7-thumbnail-design.md | 3KB |
| 2 | 2.8-layer-2-validator | layer-2-outputs/2.8-layer-2-validator.md | 3KB |
| 2.5 | 2.5.1-visual-audio-alignment | layer-2.5-outputs/2.5.1-visual-audio-alignment.md | 5KB |
| 2.5 | 2.5.2-emotional-arc-alignment | layer-2.5-outputs/2.5.2-emotional-arc-alignment.md | 5KB |
| 2.5 | 2.5.3-coherence-validator | layer-2.5-outputs/2.5.3-coherence-validator.md | 3KB |
| 3 | 3.1-midjourney-prompt-generator | layer-3-outputs/3.1-midjourney-prompt-generator.md | 5KB |
| 3 | 3.2-arcads-talent-brief | layer-3-outputs/3.2-arcads-talent-brief.md | 3KB |
| 3 | 3.3-elevenlabs-voice-spec | layer-3-outputs/3.3-elevenlabs-voice-spec.md | 3KB |
| 3 | 3.4-stock-footage-queries | layer-3-outputs/3.4-stock-footage-queries.md | 3KB |
| 3 | 3.5-platform-export-specs | layer-3-outputs/3.5-platform-export-specs.md | 2KB |
| 3 | 3.6-layer-3-validator | layer-3-outputs/3.6-layer-3-validator.md | 2KB |
| 4 | 4.1-visual-direction-package-assembler | layer-4-outputs/4.1-visual-direction-package-assembler.md | 5KB |
| 4 | 4.2-per-concept-brief-files | layer-4-outputs/4.2-per-concept-brief-files.md | 5KB |
| 4 | 4.3-output-validator | layer-4-outputs/4.3-output-validator.md | 2KB |

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
[ ] A05-VISUAL-DIRECTION-ANTI-DEGRADATION.md read (THIS FILE)
[ ] A05-VISUAL-DIRECTION-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)
[ ] Input files validated (A04 script package, A03 format strategy, A01 ad intelligence, brief)

LAYER 0 (LOADING):
[ ] Vertical profile loaded (0.0.1)
[ ] A04 Script Package loaded with all scripts (0.1)
[ ] A03 Format Strategy loaded with platform specs (0.2)
[ ] A01 Ad Intelligence visual section loaded (0.3)
[ ] Campaign Brief brand guidelines loaded (0.4)
[ ] Soul.md loaded if exists (0.5)
[ ] All inputs validated (0.6)
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (VISUAL STYLE STRATEGY):
[ ] Treatment type selected for EVERY script (1.1)
[ ] Color palettes designed per concept (1.2)
[ ] Typography system defined (1.3)
[ ] Visual competitive positioning analyzed (1.4)
[ ] Layer 1 validation passed (1.5)
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (VISUAL BRIEF GENERATION):
[ ] Shot lists generated for ALL scripts (2.1)
[ ] Shot Specificity Check passed (zero vague descriptions)
[ ] Talent direction briefs complete (2.2)
[ ] Product staging specs complete (2.3)
[ ] Motion graphics designed (2.4)
[ ] B-roll strategy complete with specific descriptions (2.5)
[ ] Sound-off strategy complete for EVERY concept (2.6)
[ ] Thumbnail design complete for YouTube concepts (2.7)
[ ] Layer 2 validation passed (2.8)
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (COHERENCE CHECK):
[ ] Visual-audio alignment scored for all concepts (2.5.1)
[ ] Emotional arc alignment scored for all concepts (2.5.2)
[ ] All concepts scored >= 7.0 overall coherence (2.5.3)
[ ] LAYER_2.5_COMPLETE.yaml created

LAYER 3 (PRODUCTION SPECIFICATION):
[ ] Midjourney prompts generated with correct syntax (3.1)
[ ] Arcads talent briefs complete (if UGC/testimonial concepts) (3.2)
[ ] ElevenLabs voice specs complete (if voiceover concepts) (3.3)
[ ] Stock footage queries complete with specific descriptions (3.4)
[ ] Platform export specs complete for all target platforms (3.5)
[ ] Layer 3 validation passed (3.6)
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & OUTPUT):
[ ] VISUAL-DIRECTION-PACKAGE.md assembled with ALL sections (4.1)
[ ] VISUAL-DIRECTION-PACKAGE.md size >= 80KB
[ ] Per-concept visual brief files created in visual-briefs/ (4.2)
[ ] All concepts have individual brief files
[ ] Output validation passed (4.3)
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with completion status
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY all upstream packages still loaded
[ ] VERIFY no missing visual briefs
[ ] VERIFY coherence scores from actual validation files
[ ] If any gaps, RETURN to appropriate layer
```

---

## A05-SPECIFIC DEGRADATION PATTERNS

### Pattern 1: The Visual Afterthought

**What it looks like:** Shot list reads "Show product. Show happy customer. Show results." instead of specific shot direction.

**Why it happens:** The model treats visual direction as an afterthought to the "real" work (scripts). It generates vague visual descriptions because the audio column is where the persuasion lives.

**The fix:** Layer 2 validator (2.8) checks every shot for specificity. Any shot described in fewer than 15 words is flagged. "Show product" is a FAIL. The SHOT SPECIFICITY CHECK is mandatory.

### Pattern 2: Generic Stock Imagery

**What it looks like:** B-roll strategy says "nature footage" or "healthy lifestyle" instead of "close-up of green tea leaves being picked by hand in morning mist, slow motion, warm golden light."

**Why it happens:** The model defaults to category-level descriptions because they are "safe" and broadly applicable.

**The fix:** Every B-roll shot must have a description specific enough to generate a Midjourney prompt or find in a stock library. If you can swap the shot description between two different campaigns and it still works, it is too generic.

### Pattern 3: Visual-Copy Disconnect

**What it looks like:** Audio says "ancient Himalayan compound" while visual shows a modern laboratory. Hook says "I threw out all my skincare" while visual shows a product glamour shot.

**Why it happens:** Visual and audio are generated in separate passes without cross-referencing. Or the visual defaults to "brand-safe" imagery regardless of script content.

**The fix:** Layer 2.5 (Visual-Copy Coherence Check) forces a beat-by-beat comparison of visual and audio. Minimum 7.0 alignment score required. Misaligned beats are revised before proceeding.

### Pattern 4: Platform-Blind Visuals

**What it looks like:** Same visual brief regardless of TikTok, Meta, or YouTube. Same aspect ratio, same pacing, same text overlay rules.

**Why it happens:** The model generates "a visual brief" without platform context. Platform-specific requirements are seen as formatting, not creative direction.

**The fix:** Layer 0 loads platform-specific specs from A03. Layer 1 validates no platform-treatment mismatches. Layer 3 generates platform-specific export specs. Every visual decision is platform-aware.

### Pattern 5: Style Monotony

**What it looks like:** All 8 concepts get the same visual treatment (all UGC or all polished) regardless of script strategy.

**Why it happens:** The model finds one treatment type and applies it universally because it is "efficient."

**The fix:** Layer 1 microskill 1.1 uses the Visual Treatment Selection Matrix to strategically assign treatment types. The Layer 1 validator checks for treatment variety. If all concepts share one treatment, the strategy must be explicitly justified.

### Pattern 6: Missing Sound-Off Strategy

**What it looks like:** Visual brief assumes sound-on viewing. No text overlay plan, no visual narrative arc, no caption design. When audio is removed, the ad communicates nothing.

**Why it happens:** The model defaults to "the audio carries the message" because that is how copy is traditionally written.

**The fix:** Layer 2 microskill 2.6 forces explicit sound-off design. The test: strip ALL audio. Can the viewer understand the core message? If not, the sound-off strategy is incomplete.

### Pattern 7: Tool-Blind Specs

**What it looks like:** Visual brief describes shots that Midjourney cannot generate, or talent direction that Arcads cannot execute, or visual effects that require real-world production.

**Why it happens:** The model generates idealized visual direction without awareness of tool capabilities and limitations.

**The fix:** Layer 3 translates visual briefs into tool-specific specs. If a shot cannot be produced by available tools, it must be flagged with an alternative approach. Layer 3 validator checks feasibility.

### Anti-Degradation Protocol (A05-Specific)

```
WHEN YOU NOTICE YOURSELF:
- Writing "Show product" in a shot list --> STOP. Specify shot type, angle, lighting, surface, background.
- Writing "lifestyle footage" as B-roll --> STOP. Describe the specific shot in enough detail for a Midjourney prompt.
- Not checking visual against audio beat-by-beat --> STOP. Run coherence check.
- Using the same treatment for all concepts --> STOP. Check Selection Matrix.
- Ignoring platform safe zones --> STOP. Load platform specs.
- Not designing for sound-off --> STOP. Strip audio mentally. Does the ad still work?
- Generating Midjourney prompts without proper parameters --> STOP. Check syntax.

IF CONTEXT IS LARGE:
- This does NOT excuse vague shot descriptions
- This does NOT excuse skipping coherence check
- This does NOT excuse platform-blind visuals
- Request continuation rather than reducing specificity
```

---

## KEY INSIGHT

> **"The visual sells before the audio does. 85% of social video is watched on mute initially. The first frame must stop the scroll, the first 3 seconds must communicate the hook, and the visual must carry the full persuasion story independent of sound. If you strip the audio and the ad loses its meaning, the visual direction has failed."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation with 8 structural fixes, per-microskill output table (33 microskills), implementation checklist, 7 A05-specific degradation patterns, shot specificity requirements, platform safe zone enforcement, sound-off strategy mandates, visual-copy coherence validation. Full A05 anti-degradation architecture. |
