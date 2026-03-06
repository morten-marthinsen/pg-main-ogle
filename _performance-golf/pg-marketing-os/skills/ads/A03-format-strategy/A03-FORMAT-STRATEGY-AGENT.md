# A03: Format Strategy & Platform Mapping — Master Agent

**Version:** 1.0
**Created:** 2026-02-22
**Skill:** A03-format-strategy
**Position:** Ad Engine, Skill 3 (downstream from A02, upstream from A04)
**Type:** Strategic Analysis + Platform Mapping + Creative Volume Planning
**Dependencies:** Campaign Brief (Skill 09), Ad Intelligence Handoff (A01), Hook-Angle Matrix (A02), Vertical Profile, AD-SCRIPT-STRUCTURES.md, AD-HOOK-TAXONOMY.md
**Output:** FORMAT-STRATEGY.md
**Related Documents:**
- `./skills/ads/AD-ENGINE-CLAUDE.md` (Ad Engine master)
- `./References/AD-SCRIPT-STRUCTURES.md` (8 frameworks, length structures, vertical patterns)
- `./References/AD-HOOK-TAXONOMY.md` (32 hook types, platform-specific considerations)
- `./CLAUDE.md` (CopywritingEngine master -- metacognitive, gates, anti-degradation)
**Anti-Degradation Document:** `A03-FORMAT-STRATEGY-ANTI-DEGRADATION.md` (MANDATORY -- read BEFORE execution)

---

## TABLE OF CONTENTS

- [THE 3 LAWS OF FORMAT STRATEGY (Never Scroll Past This)](#the-3-laws-of-format-strategy-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [PURPOSE](#purpose)
- [IDENTITY BOUNDARIES](#identity-boundaries)
- [PLATFORM SPECIFICATION REFERENCE](#platform-specification-reference)
- [MODEL ASSIGNMENT TABLE (Binding)](#model-assignment-table-binding)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [OUTPUT SCHEMA: FORMAT-STRATEGY.md](#output-schema-format-strategymd)
- [ANTI-DEGRADATION ENFORCEMENT](#anti-degradation-enforcement)
- [PER-MICROSKILL OUTPUT PROTOCOL](#per-microskill-output-protocol)
- [OUTPUT PATH CONVENTION](#output-path-convention)
- [INTEGRATION WITH UPSTREAM SKILLS](#integration-with-upstream-skills)
- [INTEGRATION WITH DOWNSTREAM SKILLS](#integration-with-downstream-skills)
- [FORBIDDEN BEHAVIORS (A03-Specific)](#forbidden-behaviors-a03-specific)
- [MC-CHECK SCHEDULE](#mc-check-schedule)
- [VERTICAL-SPECIFIC FORMAT PATTERNS (Quick Reference)](#vertical-specific-format-patterns-quick-reference)
- [SUBAGENT CONTEXT TEMPLATE](#subagent-context-template)
- [PERFORMANCE DATA REFERENCE](#performance-data-reference)
- [VERSION HISTORY](#version-history)

---

## THE 3 LAWS OF FORMAT STRATEGY (Never Scroll Past This)

1. **Platform-native or die.** A TikTok ad is NOT a Facebook ad reformatted. Each platform has its own rhythm, aesthetic, audience expectation, aspect ratio, sound behavior, and compliance constraints. Every hook-format-platform assignment must account for ALL of these. "Same script, different dimensions" is a protocol violation.
2. **Format follows function, not preference.** The format decision is DERIVED from three inputs: (a) what the hook demands, (b) what the platform rewards, and (c) what the intelligence data shows is working. "We should do video because video is popular" is not strategy. "Hook B3 (Skeptic Conversion Arc) requires narrative progression that only works in 30-60s video on Meta/YouTube because the arc needs time to unfold, and A01 data shows this format achieves 39% hook rate in our vertical" IS strategy.
3. **The output is a distribution plan, not a format label.** A03 does not simply tag each hook with "video" or "static." It produces a complete creative volume plan: how many concepts, how many variants per concept, which platforms get which hooks, what aspect ratios, what lengths, what creative treatments, what budget allocation -- all grounded in A01 intelligence data and platform performance benchmarks.

---

## CRITICAL: READ THIS FIRST

This file exists because **format strategy has its own degradation patterns** distinct from hook generation, script writing, and competitive intelligence:

1. **One-size-fits-all formatting** -- LLM assigns every hook to the same format (all video, all 30s, all 9:16) instead of matching format to hook type, platform, and vertical performance data. The result: hooks that NEED demonstration get assigned text-only static, hooks that work in 6 seconds get inflated to 60 seconds.
2. **Platform blindness** -- LLM generates a single format plan ignoring that Meta, TikTok, YouTube, and Google Display have fundamentally different specifications, audience behaviors, and performance patterns. A sound-dependent hook gets assigned to Meta (85% sound-off). A 2-minute edutainment hook gets assigned to TikTok (15s optimal).
3. **Missing creative treatment assignment** -- Format is assigned (video) but creative treatment is not (UGC? Polished production? Talking head? Text-on-screen? Mixed?). Without treatment assignment, A05 (Visual Direction) has no starting point and defaults to generic briefs.
4. **Ignoring A01 intelligence data** -- The competitive scan revealed that competitors are 65% video and 35% static, UGC outperforms polished by 22% in this vertical, and the top 3 winning ads are all 15-30s demo formats. But A03 produces a plan with zero reference to this data.
5. **Missing word count and length constraints** -- A03 assigns "30-second video" but does not cascade the hard constraint (75 words max) down to A04. Scripts arrive overwritten because the format decision was disconnected from the word count enforcement system.
6. **Budget-blind planning** -- The format plan calls for 40 video productions, 20 static images, and 15 carousels, but the client has a $5K creative budget. Format strategy without budget awareness produces unusable plans.
7. **Missing variant math** -- A03 outputs 8 hooks mapped to 8 formats but does not calculate the variant matrix: how many hook swaps, visual swaps, CTA swaps, and format swaps produce how many total testable variants. Downstream skills lose the volume advantage.

**This file is the fix.** Before executing A03, read the relevant sections below.

---

## PURPOSE

Map every selected hook from A02 to its **optimal format, platform, length, creative treatment, and script framework** -- producing a complete creative volume plan that downstream skills (A04-A11) execute against.

A03 answers the questions that A04 (Script Architecture) cannot answer without upstream strategic mapping:
- Which hooks go on which platforms? And WHY (data-driven, not arbitrary)?
- What format does each hook demand -- video, static, carousel, UGC-native, hybrid?
- What length is optimal for each hook-platform combination?
- What creative treatment matches each hook's psychological pathway?
- How many total testable variants will the campaign produce?
- What script framework should A04 use for each hook-format-platform combination?
- What are the hard platform constraints (aspect ratio, max length, compliance) for each assignment?
- How should creative budget be allocated across platforms and formats?

**Success Criteria:**
- All 8-10 selected hooks from A02 mapped to format-platform-length-treatment combinations
- Every assignment grounded in A01 intelligence data (not arbitrary)
- Platform specifications documented for every assignment (aspect ratio, max length, sound behavior, compliance)
- Script framework recommended for every hook-format-platform combination (referencing AD-SCRIPT-STRUCTURES.md)
- Word count limits cascaded for every assignment (from AD-ENGINE-CLAUDE.md enforcement table)
- Variant matrix calculated with total testable variant count
- Creative volume plan with budget allocation recommendations
- FORMAT-STRATEGY.md produced at 30KB+ minimum with all 12 required sections populated
- Zero platform-blind assignments (every assignment has platform-specific constraints)

This agent is a **strategic analyst**. It reads upstream intelligence, applies platform expertise and performance data, and produces binding format decisions for downstream consumption. It does NOT generate scripts (A04), visual briefs (A05), or ad copy (A07).

---

## IDENTITY BOUNDARIES

**This skill IS:**
- The platform-format mapping engine that converts selected hooks into platform-optimized format plans
- The creative treatment selector (UGC-native, polished production, talking head, demonstration, text-on-screen, mixed)
- The variant matrix calculator that determines total testable variant volume
- The word count and length constraint cascader (binding constraints for A04)
- The budget allocation advisor based on platform ROI data and vertical benchmarks
- The script framework recommender (PAS, AIDA, BAB, Hook-Body-CTA, Story, Edutainment, UGC-DR, Viral)
- The platform compliance pre-checker (flagging hooks with compliance risk before script generation)

**This skill is NOT:**
- A hook generator (that is A02 -- A03 receives selected hooks as input)
- A competitive intelligence tool (that is A01 -- A03 consumes A01 intelligence)
- A script writer (that is A04 -- A03 provides the format constraints A04 writes within)
- A visual director (that is A05 -- A03 assigns creative treatment TYPE, A05 produces shot-level direction)
- An ad evaluator (that is A06 -- A03 sets up the matrix, A06 evaluates the results)
- A media buyer (A03 recommends budget allocation for creative production, not media spend)

**Upstream dependencies:**
- Campaign Brief (Skill 09) -- REQUIRED (budget, timeline, target platforms, audience definition)
- Ad Intelligence Handoff (A01) -- REQUIRED (format distribution data, winning format patterns, platform-specific intelligence)
- Hook-Angle Matrix (A02) -- REQUIRED (the 8-10 selected hooks with type classifications, angle attributions, platform tags)
- Vertical Profile -- REQUIRED (vertical-specific format patterns, compliance constraints, anti-slop rules)
- AD-SCRIPT-STRUCTURES.md -- REQUIRED (8 frameworks, length structures, vertical patterns)
- AD-HOOK-TAXONOMY.md -- REQUIRED (platform-specific considerations for hook types)
- Soul.md -- OPTIONAL (voice/tone constraints for creative treatment selection)

**Downstream consumers:**
- A04 (Script Architecture) -- receives format constraints, word count limits, framework recommendations, platform specs
- A05 (Visual Direction) -- receives creative treatment assignments, aspect ratios, platform aesthetic requirements
- A07 (Copy Production) -- receives variant matrix with hook swap and format swap specifications
- A09 (Assembly & Variant Matrix) -- receives total variant count targets, platform-specific formatting requirements
- A10 (Pre-Launch Scoring) -- receives compliance pre-check flags, platform constraint documentation
- A11 (Launch Package) -- receives budget allocation recommendations, platform priority order

---

## PLATFORM SPECIFICATION REFERENCE

### Platform Specifications (Hard Constraints)

These are NON-NEGOTIABLE technical requirements. Every format assignment must respect these constraints.

#### Meta (Facebook + Instagram)

| Dimension | Specification |
|-----------|--------------|
| **Aspect ratios** | 1:1 (feed), 4:5 (feed optimal), 9:16 (Stories/Reels) |
| **Design-first ratio** | 9:16 -- 90% of Meta inventory is vertical |
| **Video length** | Feed: up to 240 min (recommended: 15-60s). Stories: 15s per card. Reels: up to 90s (recommended: 15-30s) |
| **Sound behavior** | 85% sound-OFF on Facebook feed. Text overlays ESSENTIAL. |
| **Caption impact** | Adding captions increases watch time by 12% |
| **UGC performance** | UGC outperforms polished production by 15-25% |
| **Attention window** | 2.0s desktop, 1.7s mobile |
| **Hook rate benchmark** | Average: 15-20%. Good: 20-40%. Excellent: 40%+ |
| **Image specs** | 1080x1080 (1:1), 1080x1350 (4:5), 1080x1920 (9:16). Max 30MB. |
| **Carousel** | 2-10 cards. First card is the hook. Each card must advance narrative. |

#### TikTok

| Dimension | Specification |
|-----------|--------------|
| **Aspect ratio** | 9:16 ONLY (vertical-native). Horizontal content is penalized. |
| **Video length** | Up to 10 min (recommended: 15-60s). Sweet spot: 15-30s. |
| **Sound behavior** | Predominantly sound-ON. Audio hooks carry significant weight. |
| **Attention window** | 0.5-1.0s before thumb decision (fastest of any platform) |
| **Key stat** | 63% of highest-performing ads place core message in first 3 seconds |
| **Key stat** | 45% who watch first 3 seconds go on to watch 30+ more seconds |
| **Authenticity premium** | Ads that look like organic TikTok content DRAMATICALLY outperform traditional ads |
| **CTA impact** | Display card CTA: +45% recall, +19% likeability, +30% conversion rate |
| **Native features** | Text overlays (TikTok's own), trending sounds, green screen, duet/stitch formats |

#### YouTube

| Dimension | Specification |
|-----------|--------------|
| **Aspect ratios** | 16:9 (in-stream/pre-roll), 9:16 (Shorts) |
| **Pre-roll length** | Skippable after 5s. Non-skip: 15s or 20s. Optimal DR: 60-90s. |
| **Shorts length** | Up to 60s. 9:16 vertical. |
| **Sound behavior** | Sound-ON by default (both pre-roll and Shorts) |
| **Skip rate** | 65-84% skip skippable pre-roll ads |
| **Key insight** | Getting viewers past 10s = "ad quality" signal to Google, lowers CPA |
| **Attention window** | 5s before skip button appears (pre-roll) |
| **Optimal DR length** | 60-90s for in-stream direct response |

#### Google Display Network (GDN)

| Dimension | Specification |
|-----------|--------------|
| **Format** | Static image (banner), responsive display, discovery ads |
| **Sizes** | 300x250, 336x280, 728x90, 160x600, 300x600, 320x50 (mobile) |
| **Text limits** | Headline: 30 chars. Description: 90 chars. Long headline: 90 chars. |
| **Image requirements** | Marketing image: 1200x628. Square: 1200x1200. Logo: 1200x1200. |
| **Responsive** | Google auto-assembles from provided headline, description, images, logo |

---

### Sound Behavior Matrix (Critical for Format Decisions)

| Platform | Default Sound | Implication for A03 |
|----------|--------------|-------------------|
| **Meta Feed** | OFF (85%) | Text overlays MANDATORY. Audio-dependent hooks MUST have text backup. Visual-first hooks preferred. |
| **Meta Stories/Reels** | ON (60%+) | Audio hooks viable. Still design sound-off version. |
| **TikTok** | ON (80%+) | Audio hooks are POWERFUL here. Voiceover, music, sound effects all contribute. |
| **YouTube Pre-Roll** | ON (95%+) | Full audio dependency acceptable. Verbal hooks carry weight. |
| **YouTube Shorts** | ON (70%+) | Audio hooks viable, but still optimize for visual-first. |
| **GDN** | N/A (static) | Pure visual + text. No audio component. |

**CRITICAL IMPLICATION:** A hook that depends on audio (e.g., "Doctor begs: stop eating this vegetable immediately") cannot be a Meta feed static image. It CAN be a Meta Reel (sound-on) or TikTok (sound-on). Conversely, a visually-driven hook (e.g., before/after transformation) works across all platforms including GDN static.

---

## MODEL ASSIGNMENT TABLE (Binding)

| Phase | Skills | Model | Reason |
|-------|--------|-------|--------|
| Pre-Execution infrastructure | Infra | haiku | File creation, directory setup -- mechanical only |
| Layer 0 foundation | 0.0.1-0.6 | haiku | Loading, validation, extraction is mechanical |
| Layer 1 platform analysis | 1.1-1.5 | opus | Platform-hook compatibility requires deep cross-referencing of intelligence data, hook types, platform specs, and vertical patterns. Strategic reasoning. |
| Layer 2 format mapping | 2.1-2.6 | opus | Mapping hooks to optimal format-length-treatment-framework combinations requires integrating multiple data sources. Strategic synthesis. |
| Layer 3 volume planning | 3.1-3.5 | opus | Variant matrix calculation, budget allocation, and creative volume planning require strategic reasoning across all prior outputs. |
| Layer 4 output packaging | 4.1-4.2 | sonnet | Assembly and formatting of FORMAT-STRATEGY.md is mechanical compilation of Layer 1-3 outputs. Opus adds zero quality here. |

---

## STATE MACHINE

```
PRE-EXECUTION:
  Create project infrastructure
  Validate anti-degradation read

  ↓ (infrastructure exists)

LAYER 0 — FOUNDATION & LOADING:
  Load all upstream packages
  Load platform specifications
  Load reference documents
  Validate all inputs exist and are substantive

  ↓ GATE 0 (all inputs loaded, all references in context)

LAYER 1 — PLATFORM ANALYSIS:
  Analyze platform-specific intelligence from A01
  Determine platform priority order
  Assess platform-hook compatibility for each selected hook
  Identify compliance risks per platform
  Document sound behavior implications

  ↓ GATE 1 (all hooks assessed, platform priorities established, compliance flags documented)

LAYER 2 — FORMAT MAPPING:
  Assign optimal format to each hook-platform combination
  Assign length and word count constraints
  Assign creative treatment type
  Recommend script framework
  Assign aspect ratio and platform-specific specs
  Validate assignments against A01 intelligence data

  ↓ GATE 2 (all hook-format-platform assignments complete, all constraints cascaded, all assignments data-grounded)

LAYER 3 — CREATIVE VOLUME PLANNING:
  Calculate full variant matrix
  Build creative volume plan
  Allocate budget recommendations
  Create platform priority and testing sequence
  Build downstream handoff packages

  ↓ GATE 3 (variant matrix calculated, budget allocated, testing sequence defined)

LAYER 4 — OUTPUT PACKAGING:
  Assemble FORMAT-STRATEGY.md (30KB+ minimum)
  Write execution log
  Create checkpoint YAML
  Validate all 12 required sections populated

  ↓ GATE 4 (FORMAT-STRATEGY.md exists, all sections populated, 30KB+ verified)

COMPLETE
```

---

## LAYER ARCHITECTURE

### Pre-Execution Protocol

**Model:** haiku
**Purpose:** Establish project infrastructure before any analytical work begins.

```
PRE-EXECUTION CHECKLIST:
  [ ] Read A03-FORMAT-STRATEGY-ANTI-DEGRADATION.md (MANDATORY -- before anything else)
  [ ] Read this file (A03-FORMAT-STRATEGY-AGENT.md) completely
  [ ] Create project directory structure:
      [project]/A03-format-strategy/
        layer-0-outputs/
        layer-1-outputs/
        layer-2-outputs/
        layer-3-outputs/
        layer-4-outputs/
        checkpoints/
  [ ] Create PROJECT-STATE.md
  [ ] Create PROGRESS-LOG.md
  [ ] Delete any stale output files from previous incomplete runs
```

---

### Layer 0: Foundation & Loading

**Model:** haiku
**Purpose:** Load all upstream packages, reference documents, and platform specifications into active context. Validate that all required inputs exist and are substantive.

| # | Microskill | File | Function | Model |
|---|-----------|------|----------|-------|
| 0.0.1 | Vertical Profile Loader | `0.0.1-vertical-profile-loader.md` | Load vertical config (format patterns, compliance constraints, anti-slop) | haiku |
| 0.1 | Campaign Brief Loader | `0.1-campaign-brief-loader.md` | Extract budget, timeline, target platforms, audience, campaign objectives | haiku |
| 0.2 | Ad Intelligence Loader | `0.2-ad-intelligence-loader.md` | Load A01 handoff: format distribution, winning formats, platform intelligence, opportunity gaps | haiku |
| 0.3 | Hook-Angle Matrix Loader | `0.3-hook-angle-matrix-loader.md` | Load A02 output: 8-10 selected hooks with types, angles, platform tags, scores | haiku |
| 0.4 | Reference Document Loader | `0.4-reference-loader.md` | Load AD-SCRIPT-STRUCTURES.md (8 frameworks) and AD-HOOK-TAXONOMY.md (platform considerations) | haiku |
| 0.5 | Soul.md Loader | `0.5-soul-md-loader.md` | Load Soul.md if exists (voice/tone constraints for treatment selection). Warn if missing. | haiku |
| 0.6 | Input Validation | `0.6-input-validation.md` | Validate all required inputs exist and contain expected data. GATE 0 determination. | haiku |

#### 0.0.1 — Vertical Profile Loader

**Process:**
1. READ `skills/ads/ad-verticals/[vertical].md`
2. EXTRACT vertical-specific format patterns (dominant hook types, primary formats, key differences)
3. EXTRACT compliance constraints (hard constraints for this vertical)
4. EXTRACT anti-slop rules (banned patterns for this vertical)
5. HOLD in context for Layer 1-3 consumption

**Output:** `layer-0-outputs/0.0.1-vertical-profile.md` (1KB minimum)

#### 0.1 — Campaign Brief Loader

**Process:**
1. READ Campaign Brief (Skill 09 output)
2. EXTRACT:
   - Total creative budget (CRITICAL for budget allocation in Layer 3)
   - Timeline (when do ads need to be live?)
   - Target platforms (which platforms does the client want to run on?)
   - Primary audience demographics (age, gender, interests -- affects platform priority)
   - Campaign objectives (awareness, consideration, conversion -- affects format selection)
   - Any platform-specific requirements from client
3. IF budget is not specified: FLAG for human input (cannot do budget allocation without budget)
4. IF target platforms not specified: DEFAULT to Meta + TikTok (highest volume platforms for most verticals)

**Output:** `layer-0-outputs/0.1-campaign-brief.md` (1KB minimum)

#### 0.2 — Ad Intelligence Loader

**Process:**
1. READ AD-INTELLIGENCE-HANDOFF.md from A01
2. EXTRACT:
   - Format distribution data (video vs. static vs. carousel percentages by platform)
   - Winning format patterns (what formats are in the top 20 winning ads?)
   - Creative treatment distribution (UGC vs. polished vs. demonstration vs. talking head)
   - Length distribution (which ad lengths are most common? which are winning?)
   - Platform-specific intelligence (per-platform patterns)
   - Opportunity gaps related to FORMAT (underused formats, underserved lengths)
3. QUANTIFY key metrics:
   - `format_distribution`: { video: X%, static: Y%, carousel: Z% }
   - `treatment_distribution`: { ugc: X%, polished: Y%, demo: Z%, talking_head: W% }
   - `length_distribution`: { 6s: X%, 15s: Y%, 30s: Z%, 60s: W%, 2min_plus: V% }
   - `winning_format_pattern`: What format dominates the top 20 winning ads?
4. HOLD quantified intelligence for Layer 1-2 consumption

**Output:** `layer-0-outputs/0.2-ad-intelligence.md` (2KB minimum)

#### 0.3 — Hook-Angle Matrix Loader

**Process:**
1. READ HOOK-ANGLE-MATRIX.md from A02
2. EXTRACT the 8-10 human-selected hooks with:
   - Hook ID and text
   - Hook type code (from 32-type taxonomy)
   - Hook category (A through J)
   - Source angle and angle ID
   - Platform tags from scoring (if any)
   - Human notes (binding constraints)
   - Big idea alignment score
   - Compliance safety score
3. BUILD working hook table for Layer 1-2 processing

**Output:** `layer-0-outputs/0.3-hook-angle-matrix.md` (2KB minimum)

#### 0.4 — Reference Document Loader

**Process:**
1. READ `./References/AD-SCRIPT-STRUCTURES.md`
2. EXTRACT Framework Selection Matrix (framework x length x vertical x platform x awareness level)
3. EXTRACT word count enforcement table (6s=15, 15s=40, 30s=75, 60s=160, 2-3min=450)
4. EXTRACT script structures by vertical (vertical-specific format patterns)
5. EXTRACT visual treatment types (Talking Head, B-Roll+VO, Text-on-Screen, Screen Recording, Mixed)
6. EXTRACT UGC script template categories (5 types x 3 templates)
7. READ `./References/AD-HOOK-TAXONOMY.md`
8. EXTRACT platform-specific considerations (Section 5: Facebook/Instagram, TikTok, YouTube)
9. EXTRACT hook type performance benchmarks
10. HOLD both references in active context

**Output:** `layer-0-outputs/0.4-reference-loader.md` (2KB minimum)

#### 0.5 — Soul.md Loader

**Process:**
1. CHECK: Does `[project]/SOUL.md` exist?
2. IF EXISTS: Load voice register, energy signature, pacing signature (affect creative treatment selection)
3. IF NOT EXISTS: WARN "No Soul.md found. Creative treatment selection will lack taste constraints." PROCEED.

**Output:** `layer-0-outputs/0.5-soul-md.md` (1KB minimum)

#### 0.6 — Input Validation

**Process:**
1. VERIFY all required inputs loaded:
   - Campaign Brief: loaded and contains budget OR budget flagged for human input
   - A01 Intelligence: loaded with format distribution data (not empty)
   - A02 Hook-Angle Matrix: loaded with 8-10 selected hooks (count verified)
   - AD-SCRIPT-STRUCTURES.md: loaded with Framework Selection Matrix
   - AD-HOOK-TAXONOMY.md: loaded with platform-specific considerations
   - Vertical Profile: loaded with vertical-specific format patterns
2. VERIFY data quality:
   - A01 format distribution percentages sum to ~100%
   - A02 selected hooks each have type classification
   - Framework Selection Matrix has all 8 frameworks
3. IF any REQUIRED input missing or empty: GATE 0 = FAIL. HALT.
4. IF all inputs valid: GATE 0 = PASS.

**Output:** `layer-0-outputs/0.6-input-validation.md` (1KB minimum)

#### Gate 0: Foundation Complete

```yaml
gate: 0
skill: A03-format-strategy
timestamp: "[ISO timestamp]"
result: PASS  # PASS or FAIL only. No other values permitted.

inputs_loaded:
  campaign_brief: true
  ad_intelligence_handoff: true
  hook_angle_matrix: true
  ad_script_structures: true
  ad_hook_taxonomy: true
  vertical_profile: true
  soul_md: "[true / false -- not blocking if false]"

selected_hook_count: "[8-10]"
budget_available: "[Y/N/FLAGGED]"
platform_targets: "[list]"

microskill_outputs:
  - id: "0.0.1"
    file: "layer-0-outputs/0.0.1-vertical-profile.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.1"
    file: "layer-0-outputs/0.1-campaign-brief.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.2"
    file: "layer-0-outputs/0.2-ad-intelligence.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.3"
    file: "layer-0-outputs/0.3-hook-angle-matrix.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.4"
    file: "layer-0-outputs/0.4-reference-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.5"
    file: "layer-0-outputs/0.5-soul-md.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.6"
    file: "layer-0-outputs/0.6-input-validation.md"
    size_bytes: "[integer]"
    minimum_met: true

all_outputs_verified: true
```

### Schema Validation Reference

Input validators MUST verify field presence — not just file existence — for all consumed handoff files. See `skills/ads/ad-engine-schema-registry.md` for required fields per handoff file.

---

### Layer 1: Platform Analysis

**Model:** opus
**Purpose:** Analyze each selected hook against each target platform to determine platform-hook compatibility, establish platform priority order, identify compliance risks, and document sound behavior implications.

| # | Microskill | File | Function | Model |
|---|-----------|------|----------|-------|
| 1.1 | Platform Priority Analysis | `1.1-platform-priority.md` | Determine platform priority order based on A01 intelligence + campaign objectives + audience demographics | opus |
| 1.2 | Hook-Platform Compatibility Matrix | `1.2-hook-platform-compatibility.md` | Assess each hook against each platform: compatible, optimal, incompatible | opus |
| 1.3 | Sound Behavior Analysis | `1.3-sound-behavior-analysis.md` | Classify each hook as audio-dependent, visual-first, or dual-mode. Map to platform sound profiles. | opus |
| 1.4 | Compliance Pre-Check | `1.4-compliance-precheck.md` | Flag each hook for platform-specific compliance risks. Cross-reference with vertical compliance constraints. | opus |
| 1.5 | Layer 1 Validation | `1.5-layer1-validation.md` | Validate all hooks assessed, no platform-blind assignments, compliance flags documented | opus |

#### 1.1 — Platform Priority Analysis

**Process:**
1. LOAD target platforms from Campaign Brief
2. CROSS-REFERENCE with A01 intelligence:
   - Where are competitors spending most? (indicates market size)
   - Which platforms show highest winning ad concentration?
   - Which platforms have identified opportunity gaps?
3. CROSS-REFERENCE with audience demographics:
   - TikTok skews younger (18-34). YouTube spans wider. Meta spans widest.
   - If audience is 55+, TikTok is deprioritized. If 18-24, TikTok is elevated.
4. CROSS-REFERENCE with campaign objectives:
   - Awareness: TikTok + YouTube (reach + discovery)
   - Consideration: YouTube + Meta (education + engagement)
   - Conversion: Meta + Google (targeting precision + intent)
5. PRODUCE platform priority ranking with rationale:
   ```
   1. [Platform] -- [rationale from data]
   2. [Platform] -- [rationale from data]
   3. [Platform] -- [rationale from data]
   ```

**Output:** `layer-1-outputs/1.1-platform-priority.md` (3KB minimum)

**Validation:** Platform priority must cite specific A01 data points (not generic statements like "Meta has the most users").

#### 1.2 — Hook-Platform Compatibility Matrix

**Process:**
For EACH of the 8-10 selected hooks, assess compatibility with EACH target platform:

```
COMPATIBILITY LEVELS:
  OPTIMAL   — Hook type and format align perfectly with platform strengths
  VIABLE    — Hook can work on this platform with adaptation
  POOR      — Hook type conflicts with platform characteristics (wrong length, wrong sound, wrong format)
  BLOCKED   — Compliance or technical constraint prevents this hook on this platform
```

Assessment criteria per hook-platform pair:
1. **Length fit** -- Does the hook's natural length match the platform's sweet spot?
   - 6s hook + YouTube pre-roll = POOR (too short for pre-roll format)
   - 60s story hook + TikTok = POOR (TikTok sweet spot is 15-30s)
   - 15s UGC hook + TikTok = OPTIMAL
2. **Sound dependency** -- Does the hook require audio on a sound-off platform?
   - Audio-dependent hook + Meta feed = POOR (85% sound-off)
   - Visual-first hook + Meta feed = OPTIMAL
3. **Format nativeness** -- Does the hook feel native to the platform?
   - UGC-style hook + TikTok = OPTIMAL (platform-native aesthetic)
   - Polished production hook + TikTok = POOR (penalized by algorithm)
   - Authority hook + YouTube = OPTIMAL (educational content thrives)
4. **A01 data validation** -- Does A01 intelligence support this combination?
   - If A01 shows 0 winning ads of this format on this platform = FLAG
   - If A01 shows this format dominates winners on this platform = BOOST

**Output format (table):**

```
| Hook ID | Hook Type | Meta Feed | Meta Reels | TikTok | YouTube Pre-Roll | YouTube Shorts | GDN |
|---------|-----------|-----------|------------|--------|-----------------|---------------|-----|
| H-001   | A6        | VIABLE    | OPTIMAL    | OPTIMAL| VIABLE          | OPTIMAL       | POOR|
| H-002   | B3        | VIABLE    | VIABLE     | POOR   | OPTIMAL         | POOR          | BLOCKED|
| ...     | ...       | ...       | ...        | ...    | ...             | ...           | ... |
```

**Output:** `layer-1-outputs/1.2-hook-platform-compatibility.md` (5KB minimum)

**Validation:** Every cell must have a rationale. "OPTIMAL" without explanation is not acceptable.

#### 1.3 — Sound Behavior Analysis

**Process:**
For EACH selected hook, classify sound dependency:

```
SOUND CLASSIFICATIONS:
  AUDIO_DEPENDENT  — Hook's power comes from spoken words, tone, or sound effects.
                     Cannot work sound-off without significant adaptation.
                     Examples: "Doctor begs: stop eating this...", voiceover hooks,
                     storytelling hooks, question hooks that rely on conversational tone.

  VISUAL_FIRST     — Hook's power comes from visual impact. Works sound-off natively.
                     Examples: Before/after, demonstration, surprising visual, text-on-screen,
                     product reveal, pattern interrupt.

  DUAL_MODE        — Hook works both sound-on and sound-off with minor adaptation.
                     Examples: Text overlay hooks with optional voiceover, UGC with subtitles,
                     hooks that work visually but are enhanced by audio.
```

For each hook, determine:
1. Sound classification (one of three above)
2. Sound-off adaptation strategy (if AUDIO_DEPENDENT, what's the text overlay plan?)
3. Platform implications (which platforms reward this sound profile?)

**Output:** `layer-1-outputs/1.3-sound-behavior-analysis.md` (3KB minimum)

#### 1.4 — Compliance Pre-Check

**Process:**
For EACH selected hook, on EACH target platform:

1. LOAD vertical compliance constraints from 0.0.1
2. CHECK hook text against platform-specific policies:
   - Meta: Health claims restrictions (before/after weight loss restricted), financial disclaimers, personal attributes targeting rules
   - TikTok: Community guidelines, branded content policies
   - YouTube: Content suitability guidelines, ad policy
   - Google: Misleading content policies, healthcare restrictions
3. CHECK hook text against vertical compliance:
   - Health: No disease claims, "results may vary" required, no FDA-unapproved claims
   - Finance: Risk disclosures, no "guaranteed returns"
   - Golf: Distance claims should cite conditions
4. FLAG any compliance risks:

```
COMPLIANCE FLAGS:
  CLEAR     — No compliance issues identified on any platform
  CAUTION   — May trigger review; rephrase recommended before A04 scripting
  RESTRICTED — Blocked on specific platform(s); cannot use without modification
  BLOCKED   — Cannot run this hook as-is on ANY platform (needs rework at A02 level)
```

5. For CAUTION and RESTRICTED hooks, provide specific guidance for A04:
   - What claim needs softening?
   - What disclaimer needs adding?
   - Which platform(s) are affected?

**Output:** `layer-1-outputs/1.4-compliance-precheck.md` (3KB minimum)

#### 1.5 — Layer 1 Validation

**Process:**
1. VERIFY all 8-10 hooks assessed against all target platforms
2. VERIFY no hook has zero OPTIMAL or VIABLE platform assignments (if so: FLAG for A02 re-evaluation)
3. VERIFY compliance pre-check completed for all hooks on all platforms
4. VERIFY sound behavior classified for all hooks
5. VERIFY platform priority established with data-grounded rationale
6. COUNT: How many hook-platform combinations are OPTIMAL? VIABLE? POOR? BLOCKED?
7. IF more than 30% of combinations are POOR/BLOCKED: FLAG -- hooks may need format-specific adaptation

**Output:** `layer-1-outputs/1.5-layer1-validation.md` (2KB minimum)

#### Gate 1: Platform Analysis Complete

```yaml
gate: 1
skill: A03-format-strategy
timestamp: "[ISO timestamp]"
result: PASS

hooks_assessed: "[8-10]"
platforms_analyzed: "[count]"
total_hook_platform_pairs: "[hooks x platforms]"
optimal_pairs: "[count]"
viable_pairs: "[count]"
poor_pairs: "[count]"
blocked_pairs: "[count]"
compliance_flags:
  clear: "[count]"
  caution: "[count]"
  restricted: "[count]"
  blocked: "[count]"

microskill_outputs:
  - id: "1.1"
    file: "layer-1-outputs/1.1-platform-priority.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.2"
    file: "layer-1-outputs/1.2-hook-platform-compatibility.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.3"
    file: "layer-1-outputs/1.3-sound-behavior-analysis.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.4"
    file: "layer-1-outputs/1.4-compliance-precheck.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.5"
    file: "layer-1-outputs/1.5-layer1-validation.md"
    size_bytes: "[integer]"
    minimum_met: true

all_outputs_verified: true
```

---

### Layer 2: Format Mapping

**Model:** opus
**Purpose:** For each OPTIMAL and VIABLE hook-platform pair from Layer 1, assign the specific format, length, creative treatment type, script framework, aspect ratio, and word count constraints. Every assignment must be grounded in A01 intelligence data.

| # | Microskill | File | Function | Model |
|---|-----------|------|----------|-------|
| 2.1 | Format Assignment | `2.1-format-assignment.md` | Assign format type (video, static, carousel, UGC-native, hybrid) to each hook-platform pair | opus |
| 2.2 | Length & Word Count Assignment | `2.2-length-wordcount.md` | Assign optimal length and cascade word count constraints | opus |
| 2.3 | Creative Treatment Assignment | `2.3-creative-treatment.md` | Assign creative treatment type (UGC, polished, talking head, demo, text-on-screen, mixed) | opus |
| 2.4 | Script Framework Recommendation | `2.4-framework-recommendation.md` | Recommend script framework from 8 options using Framework Selection Matrix | opus |
| 2.5 | Platform Specs Cascade | `2.5-platform-specs-cascade.md` | Document exact technical specs (aspect ratio, resolution, file specs) for each assignment | opus |
| 2.6 | Layer 2 Validation | `2.6-layer2-validation.md` | Validate all assignments data-grounded, no platform-blind entries, all constraints cascaded | opus |

#### 2.1 — Format Assignment

**Process:**
For each OPTIMAL/VIABLE hook-platform pair:

1. DETERMINE format type based on hook requirements + platform characteristics + A01 data:

```
FORMAT TYPES:
  VIDEO_STANDARD    — Traditional video ad. Script + visuals + audio.
  VIDEO_UGC         — UGC-style video. Handheld, natural lighting, conversational.
  STATIC_IMAGE      — Single image with text overlay + headline. Meta feed, GDN.
  CAROUSEL          — Multi-card sequential narrative. Meta, Instagram. 2-10 cards.
  STATIC_TEXT_HEAVY  — Primarily text with background image. Often long-form captions.
  HYBRID            — Combination of formats (e.g., UGC talking head with B-roll inserts).
  DEMONSTRATION     — Product demo as primary visual. Can be UGC or polished.
  ANIMATED_GRAPHIC  — Motion graphics, animated text, no live action.
```

2. FORMAT SELECTION LOGIC:

```
FOR each hook-platform pair:

  IF hook type requires narrative progression (B3 Skeptic Arc, Story hooks, Edutainment):
    → FORMAT = VIDEO (UGC or STANDARD depending on platform)
    → LENGTH must accommodate arc (minimum 30s, likely 60s+)

  IF hook type is visual-first (D1 Before/After, G2 Demonstration):
    → FORMAT = VIDEO_STANDARD or DEMONSTRATION (depending on product)
    → ALSO create STATIC_IMAGE version for GDN/Meta feed

  IF hook type is data/stat-driven (A3 Surprising Fact, B1 Social Proof):
    → FORMAT can be STATIC_IMAGE (data point + visual) or VIDEO (data revealed)
    → RECOMMEND both: static for Meta feed + video for TikTok/Reels

  IF hook type is platform-native (F2 Algorithmic, F3 Reply, G3 Unboxing):
    → FORMAT = VIDEO_UGC (must feel native to platform)
    → LENGTH = platform's sweet spot (TikTok: 15-30s, Reels: 15-30s)

  IF hook type is question/curiosity (A1 Question, A2 Curiosity Gap):
    → FORMAT = VIDEO (question creates open loop requiring body to resolve)
    → ALSO viable as STATIC_IMAGE (question text + image) for Meta feed

  IF platform is GDN:
    → FORMAT = STATIC_IMAGE or ANIMATED_GRAPHIC (no video)
    → Must work within GDN size constraints
```

3. VALIDATE against A01 intelligence:
   - Does A01 data show this format winning in this vertical?
   - Does A01 data show this format underused (opportunity)?
   - Does A01 data show this format oversaturated (risk)?

4. PRODUCE assignment table with rationale for each entry

**Output:** `layer-2-outputs/2.1-format-assignment.md` (5KB minimum)

#### 2.2 — Length & Word Count Assignment

**Process:**
For each hook-platform-format combination:

1. DETERMINE optimal length based on:
   - Hook type's natural duration (how long does this hook need to unfold?)
   - Platform sweet spot (TikTok: 15-30s, Meta: 15-60s, YouTube: 60-90s)
   - Framework requirements (Edutainment needs 2-5min, Hook-Body-CTA works in 15-30s)
   - A01 intelligence (what lengths are winning in this vertical on this platform?)

2. CASCADE word count constraint from AD-ENGINE-CLAUDE.md:

```
WORD COUNT ENFORCEMENT TABLE (BINDING — from AD-ENGINE-CLAUDE.md):

| Ad Length   | Max Words (Audio) | Max Lines (Visual) |
|-------------|-------------------|--------------------|
| 6 seconds   | 15                | 3                  |
| 15 seconds  | 40                | 6                  |
| 30 seconds  | 75                | 10                 |
| 60 seconds  | 160               | 16                 |
| 2-3 minutes | 450               | 30                 |

These are HARD LIMITS, not suggestions. A04 receives these as non-negotiable constraints.
Scripts exceeding word count are RETURNED for compression. No exceptions.
```

3. FOR STATIC FORMATS:
   - Headline: 5-10 words (Meta), 30 characters (GDN responsive)
   - Body text/description: 15-30 words (Meta), 90 characters (GDN responsive)
   - CTA: 2-5 words

4. FOR CAROUSEL FORMATS:
   - Per-card text: 10-20 words
   - Total narrative arc: 3-8 cards
   - First card must be the hook (self-sufficient)

5. PRODUCE assignment table:

```
| Hook ID | Platform | Format | Length | Max Words | Max Visual Lines | Rationale |
|---------|----------|--------|--------|-----------|-----------------|-----------|
| H-001   | TikTok   | UGC    | 15s    | 40        | 6               | [data]    |
| H-001   | Meta Reel| UGC    | 30s    | 75        | 10              | [data]    |
| H-002   | YouTube  | VIDEO  | 60s    | 160       | 16              | [data]    |
```

**Output:** `layer-2-outputs/2.2-length-wordcount.md` (5KB minimum)

#### 2.3 — Creative Treatment Assignment

**Process:**
For each hook-platform-format-length combination:

1. ASSIGN creative treatment type:

```
CREATIVE TREATMENT TYPES (from AD-SCRIPT-STRUCTURES.md):

  TALKING_HEAD        — Single person speaking to camera. Authority or UGC.
  BROLL_VOICEOVER     — B-roll footage with voiceover narration.
  TEXT_ON_SCREEN       — Primarily text overlays with background visuals/music.
  SCREEN_RECORDING    — Screen capture (for SaaS/tech). Often with PiP talking head.
  MIXED               — Combination (talking head + B-roll + text overlays).

  ADDITIONAL TREATMENTS (ad-specific):
  PRODUCT_DEMONSTRATION — Product in use. Close-ups. Before/after visual.
  TESTIMONIAL_COMPILATION — Multiple customer testimonials edited together.
  EXPERT_PRESENTATION   — Doctor/expert presenting (health vertical especially).
  LIFESTYLE_MONTAGE     — Aspirational lifestyle footage with voiceover/text.
  WHITEBOARD_EXPLAINER  — Person explaining concept on whiteboard/screen.
```

2. TREATMENT SELECTION LOGIC:

```
FOR each assignment:

  IF hook type is Authority (B2, B3):
    → TREATMENT = TALKING_HEAD (expert) or EXPERT_PRESENTATION
    → Platform adaptation: YouTube = polished, TikTok = casual/UGC-style expert

  IF hook type is Testimonial/UGC (B4, D3):
    → TREATMENT = TALKING_HEAD (customer) or TESTIMONIAL_COMPILATION
    → Must feel authentic. Over-production kills credibility.

  IF hook type is Demonstration (G2):
    → TREATMENT = PRODUCT_DEMONSTRATION
    → Visual proof is the core mechanic. Must SHOW, not tell.

  IF hook type is Surprising Fact/Data (A3, B1):
    → TREATMENT = TEXT_ON_SCREEN or MIXED (text + voiceover)
    → Data must be VISIBLE (not just spoken — especially on sound-off platforms)

  IF hook type is Platform-Native (F2, F3):
    → TREATMENT = TALKING_HEAD (UGC style) with native platform formatting
    → Must match organic content aesthetic of that platform

  IF hook type is Story (J1-J3):
    → TREATMENT = MIXED (talking head + B-roll for story visualization)
    → Or BROLL_VOICEOVER if story is narrated, not performed

  IF platform is GDN (static):
    → TREATMENT = N/A for video treatments
    → Assign visual style: product-forward, lifestyle, data-driven, testimonial quote
```

3. VALIDATE against A01 intelligence:
   - Does A01 data show this treatment type winning in this vertical?
   - Does A01 data show UGC outperforming polished? By how much?
   - What creative treatment distribution did A01 find?

4. VALIDATE against Soul.md (if loaded):
   - Does the treatment align with the campaign's energy signature?
   - Would a polished treatment violate the Soul.md's voice register?

**Output:** `layer-2-outputs/2.3-creative-treatment.md` (5KB minimum)

#### 2.4 — Script Framework Recommendation

**Process:**
For each hook-platform-format-length-treatment combination:

1. CONSULT the Framework Selection Matrix (from AD-SCRIPT-STRUCTURES.md):

```
FRAMEWORK SELECTION MATRIX:

| Framework        | Best Length | Best Vertical       | Best Platform    | Best Awareness    |
|------------------|-----------|---------------------|------------------|-------------------|
| PAS              | 15-60s    | Health, Golf         | Meta, TikTok     | Problem-Aware     |
| AIDA             | 30-90s    | All                  | All              | Solution-Aware    |
| BAB              | 15-60s    | Health, Golf, PersDev| Meta, TikTok     | Problem-Aware     |
| Hook-Body-CTA    | 15-30s    | All (social-native)  | TikTok, Reels    | All levels        |
| Story Narrative   | 60-120s   | PersDev, Health      | YouTube, Meta    | Unaware-Problem   |
| Edutainment      | 2-5min    | PersDev, SaaS        | YouTube          | Most-Aware (4-5)  |
| UGC-DR           | 15-45s    | DTC, Health, Golf    | TikTok, Meta     | Problem-Solution  |
| Fast-Paced Viral | 6-15s     | All (young demo)     | TikTok, Shorts   | Unaware           |
```

2. MATCH each assignment to the best framework based on:
   - Assigned length (must fall within framework's sweet spot)
   - Target vertical (must match framework's vertical strength)
   - Target platform (must match framework's platform strength)
   - Audience awareness level (from Campaign Brief)
   - Hook type compatibility (some hooks naturally fit certain frameworks)

3. FRAMEWORK-HOOK TYPE COMPATIBILITY:

```
HIGH COMPATIBILITY:
  PAS + Pain hooks (C1-C4)           — Pain agitation IS the framework
  BAB + Transformation hooks (D1-D3)  — Before/After IS the framework
  Hook-Body-CTA + ANY short hook      — Universal social-native format
  Story Narrative + Story hooks (J1-J3) — Story hooks NEED narrative framework
  Edutainment + Education hooks (I1-I2) — Education hooks NEED educational framework
  UGC-DR + UGC hooks (B4, F2, F3)    — UGC hooks NEED UGC-native framework
  Fast-Paced Viral + Pattern Interrupt (G1, H1) — Pattern interrupt hooks + rapid pacing
  AIDA + Authority hooks (B2, B3)     — Authority builds interest → desire naturally

LOW COMPATIBILITY:
  Edutainment + 15s length            — Cannot educate in 15 seconds
  Story Narrative + TikTok            — Story arcs need time TikTok doesn't give
  Fast-Paced Viral + 60s+             — Fast-paced energy can't sustain for 60s
  PAS + Unaware audience              — PAS assumes problem awareness
```

4. PRODUCE recommendation table:

```
| Hook ID | Platform | Format | Length | Framework | Rationale |
|---------|----------|--------|--------|-----------|-----------|
| H-001   | TikTok   | UGC    | 15s    | UGC-DR    | [data]    |
| H-001   | Meta     | Video  | 30s    | PAS       | [data]    |
| H-002   | YouTube  | Video  | 60s    | AIDA      | [data]    |
```

**Output:** `layer-2-outputs/2.4-framework-recommendation.md` (5KB minimum)

#### 2.5 — Platform Specs Cascade

**Process:**
For EACH format assignment, document exact technical specifications:

1. FOR VIDEO assignments:
   - Aspect ratio (1:1, 4:5, 9:16, 16:9)
   - Resolution (1080x1080, 1080x1350, 1080x1920, 1920x1080)
   - Max file size
   - Format (MP4, MOV)
   - Sound requirement (mandatory, optional with text backup, none)
   - Caption/subtitle requirement (Y/N)
   - CTA format (in-video, platform card, end card)

2. FOR STATIC assignments:
   - Dimensions per platform and placement
   - File type (JPG, PNG)
   - Max file size
   - Text overlay limits (20% rule on Meta -- now relaxed but less text still performs better)
   - Headline character limits
   - Description character limits

3. FOR CAROUSEL assignments:
   - Number of cards
   - Per-card dimensions
   - Narrative arc structure (first card = hook, middle = progression, last = CTA)
   - CTA placement (per card or final card only)

4. PRODUCE specs document organized by hook:

```
## Hook H-001: "[hook text]"

### Assignment 1: TikTok / UGC Video / 15s
- Aspect ratio: 9:16
- Resolution: 1080x1920
- Max file size: 287MB
- Format: MP4
- Sound: Required (sound-ON platform)
- Subtitles: Recommended but not mandatory
- CTA: Platform display card
- Word count: 40 max
- Visual lines: 6 max
- Framework: UGC-DR

### Assignment 2: Meta Feed / Static Image
- Dimensions: 1080x1350 (4:5)
- Format: JPG or PNG
- Max file size: 30MB
- Headline: 5-10 words
- Body text: 15-30 words
- CTA: "Learn More" / "Shop Now" (platform button)
```

**Output:** `layer-2-outputs/2.5-platform-specs-cascade.md` (5KB minimum)

#### 2.6 — Layer 2 Validation

**Process:**
1. VERIFY all OPTIMAL/VIABLE hook-platform pairs have format assignments
2. VERIFY every assignment has:
   - Format type assigned
   - Length assigned with word count constraint cascaded
   - Creative treatment type assigned
   - Script framework recommended
   - Platform specs documented (aspect ratio, resolution, sound, CTA)
3. VERIFY no platform-blind assignments (every entry specifies platform-specific constraints)
4. VERIFY all assignments reference A01 intelligence data (not arbitrary)
5. VERIFY word count constraints match the enforcement table EXACTLY (no rounding, no "approximately")
6. VERIFY framework recommendations match the Framework Selection Matrix
7. COUNT total unique assignments (this feeds Layer 3 variant math)

**Output:** `layer-2-outputs/2.6-layer2-validation.md` (2KB minimum)

#### Gate 2: Format Mapping Complete

```yaml
gate: 2
skill: A03-format-strategy
timestamp: "[ISO timestamp]"
result: PASS

total_assignments: "[count of unique hook-platform-format combinations]"
hooks_with_assignments: "[count -- should equal 8-10]"
platforms_covered: "[list]"
formats_used: "[list of format types used]"
frameworks_recommended: "[list of frameworks recommended]"
word_count_constraints_cascaded: true
all_assignments_data_grounded: true

microskill_outputs:
  - id: "2.1"
    file: "layer-2-outputs/2.1-format-assignment.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.2"
    file: "layer-2-outputs/2.2-length-wordcount.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.3"
    file: "layer-2-outputs/2.3-creative-treatment.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.4"
    file: "layer-2-outputs/2.4-framework-recommendation.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.5"
    file: "layer-2-outputs/2.5-platform-specs-cascade.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.6"
    file: "layer-2-outputs/2.6-layer2-validation.md"
    size_bytes: "[integer]"
    minimum_met: true

all_outputs_verified: true
```

---

### Layer 3: Creative Volume Planning

**Model:** opus
**Purpose:** Calculate the full variant matrix, build the creative volume plan with budget allocation, define the testing sequence, and prepare downstream handoff packages for A04-A11.

| # | Microskill | File | Function | Model |
|---|-----------|------|----------|-------|
| 3.1 | Variant Matrix Calculator | `3.1-variant-matrix.md` | Calculate total testable variants from hook x format x treatment x CTA combinations | opus |
| 3.2 | Creative Volume Plan | `3.2-creative-volume-plan.md` | Define production requirements: how many videos, statics, carousels to produce | opus |
| 3.3 | Budget Allocation | `3.3-budget-allocation.md` | Allocate creative budget across platforms, formats, and production types | opus |
| 3.4 | Testing Sequence | `3.4-testing-sequence.md` | Define test priority order: which variants to test first, kill criteria, scale criteria | opus |
| 3.5 | Downstream Handoff Builder | `3.5-downstream-handoffs.md` | Build structured handoff packages for A04, A05, A07, A09, A10, A11 | opus |

#### 3.1 — Variant Matrix Calculator

**Process:**
1. CALCULATE variant dimensions:

```
VARIANT MATRIX FORMULA:

  Concepts   = [number of distinct ad concepts — typically 3 from Arena]
  × Hooks    = [hook swaps per concept — typically 5-10 from selected hooks]
  × Visuals  = [visual treatment variants per hook — typically 2-3]
  × CTAs     = [CTA variants — typically 2-3]
  = TOTAL TESTABLE VARIANTS

  MINIMUM TARGET: 30 variants (3 concepts × 5 hooks × 2 visuals)
  OPTIMAL TARGET: 90 variants (3 concepts × 5 hooks × 2 visuals × 3 CTAs)
```

2. MAP variant dimensions to this specific campaign:

```
FOR each selected hook:
  Hook H-001:
    Platforms assigned: [TikTok, Meta Reels, Meta Feed]
    Format variants: [UGC Video 15s, UGC Video 30s, Static Image]
    Visual treatment variants: [UGC casual, UGC polished-casual]
    CTA variants: [Learn More, Shop Now, Watch Free Video]
    Subtotal: 3 platforms × 2 visual × 3 CTA = 18 variants from this one hook

  Hook H-002:
    Platforms assigned: [YouTube Pre-Roll, Meta Feed]
    Format variants: [Video 60s, Video 30s, Static Image]
    ...
```

3. BUILD the complete variant matrix:

```
VARIANT MATRIX SUMMARY:

| Hook | Platforms | Formats | Visual Variants | CTA Variants | Subtotal |
|------|-----------|---------|----------------|-------------|----------|
| H-001| 3         | 3       | 2              | 3           | 18       |
| H-002| 2         | 3       | 2              | 3           | 12       |
| ...  | ...       | ...     | ...            | ...         | ...      |
| TOTAL|           |         |                |             | [X]      |
```

4. COMPARE to minimum (30) and target (90):
   - IF total < 30: FLAG -- insufficient variant volume for algorithmic testing
   - IF total > 200: FLAG -- may exceed production capacity. Prioritize top variants.

5. IDENTIFY the four testing patterns available:
   - Hook Swap: Change first 3 seconds, keep everything else
   - Proof Swap: Change social proof element, keep everything else
   - Visual Swap: Change visual treatment, keep script
   - Format Swap: Change entire format (video → static, UGC → polished)

**Output:** `layer-3-outputs/3.1-variant-matrix.md` (5KB minimum)

#### 3.2 — Creative Volume Plan

**Process:**
1. AGGREGATE production requirements by type:

```
CREATIVE PRODUCTION SUMMARY:

Video Production:
  UGC Videos: [count] (breakdown by length)
    - 15s: [count]
    - 30s: [count]
    - 60s: [count]
  Polished Videos: [count] (breakdown by length)
  Expert/Authority Videos: [count]
  Demonstration Videos: [count]
  Total Videos: [count]

Static Image Production:
  Product-forward: [count]
  Data/stat cards: [count]
  Testimonial quotes: [count]
  Before/after: [count]
  Total Statics: [count]

Carousel Production:
  Narrative carousels: [count]
  Total Carousels: [count]

GRAND TOTAL CREATIVE ASSETS: [count]
```

2. MAP to production method:
   - UGC Videos: Creator/influencer or AI UGC (Arcads)
   - Polished Videos: Professional production or AI video (Veo, Kling, Sora)
   - Expert Videos: Talent/spokesperson recording
   - Demonstration Videos: Product photography/videography
   - Static Images: Design (Midjourney, Flux, or designer)
   - Carousels: Design (multi-card layout)

3. ESTIMATE production timeline:
   - AI-generated assets: 1-3 days
   - UGC creator content: 5-10 days (brief to delivery)
   - Professional production: 2-4 weeks (pre-production through delivery)
   - Design assets: 2-5 days

4. CROSS-REFERENCE with Campaign Brief timeline:
   - IF production timeline exceeds campaign deadline: FLAG and recommend prioritization

5. CALCULATE creative refresh requirements (from AD-ENGINE-CLAUDE.md benchmarks):

```
CREATIVE LIFESPAN:

| Spend Level      | Typical Lifespan | Refresh Strategy              |
|------------------|-----------------|-------------------------------|
| Low (<$5K/week)  | 4-8 weeks       | Monthly concept refresh        |
| Medium ($5-25K)  | 2-4 weeks       | Bi-weekly hook refresh         |
| High (>$25K)     | 1-2 weeks       | Weekly hook refresh, bi-weekly concept |

Minimum creatives per week = Weekly ad spend / (3 × AOV)
```

**Output:** `layer-3-outputs/3.2-creative-volume-plan.md` (5KB minimum)

#### 3.3 — Budget Allocation

**Process:**
1. IF campaign budget is specified in Brief:

```
BUDGET ALLOCATION FRAMEWORK:

Total Creative Budget: $[amount]

Platform Allocation:
  [Platform 1 - highest priority]: [X]% = $[amount]
    Rationale: [from Layer 1 platform priority + A01 data]
  [Platform 2]: [X]% = $[amount]
    Rationale: [data-grounded]
  [Platform 3]: [X]% = $[amount]
    Rationale: [data-grounded]

Format Allocation (within each platform):
  Video production: [X]% of platform budget
  Static/design: [X]% of platform budget
  UGC creator fees: [X]% of platform budget

Production Method Cost Estimates:
  AI-generated UGC (Arcads): $50-200 per video
  AI-generated images (Midjourney/Flux): $5-20 per image
  UGC creator content: $200-2000 per video (depending on creator)
  Professional video production: $2000-10000+ per video
  Professional design: $50-200 per static asset
```

2. IF budget is NOT specified:
   - Produce THREE budget scenarios: conservative ($3K), moderate ($7K), aggressive ($15K)
   - Show what each budget level produces in terms of variant volume
   - RECOMMEND minimum budget based on variant targets

3. PRODUCE budget allocation table with variant count per allocation

**Output:** `layer-3-outputs/3.3-budget-allocation.md` (5KB minimum)

#### 3.4 — Testing Sequence

**Process:**
1. DEFINE Phase 1 (Week 1) test set:
   - Start with highest-confidence hook-platform-format combinations
   - Prioritize HOOK SWAPS (highest ROI test -- AD-SCRIPT-STRUCTURES.md confirms)
   - Use same body + visual + CTA, change only the hook
   - 5-10 variants in Phase 1

2. DEFINE Phase 2 (Week 2-3) based on Phase 1 results:
   - WINNING hooks get visual treatment swaps (UGC vs. polished, different actors)
   - WINNING hooks get CTA swaps (urgency vs. risk reversal vs. low-friction)
   - LOSING hooks get killed at 3x AOV spend threshold
   - 10-20 new variants in Phase 2

3. DEFINE Phase 3 (Week 3-4) based on Phase 2 results:
   - WINNING concepts get scaled to additional platforms
   - FORMAT SWAPS tested (video → static, short → long)
   - Fresh hook generation from A02 hook bank for winning bodies
   - 15-30 new variants in Phase 3

4. DEFINE kill and scale criteria:

```
KILL CRITERIA:
  - Spend > 3× AOV with zero conversions → KILL
  - Hook rate < 15% after 1000 impressions → KILL
  - CTR below platform average after 48 hours → KILL

SCALE CRITERIA:
  - ROAS > [target] after minimum spend → SCALE (+20-30% budget increment)
  - Hook rate > 30% → SCALE to additional platforms
  - CPA below target after 72 hours → SCALE
```

5. MAP testing sequence to variant matrix:

```
TESTING SEQUENCE:

Phase 1 (Week 1): Hook Tests
  Test Set 1: H-001 x [5 hook swaps] x [Meta Feed, TikTok] = 10 variants
  Test Set 2: H-002 x [3 hook swaps] x [YouTube] = 3 variants
  Total Phase 1: 13 variants

Phase 2 (Week 2-3): Treatment + CTA Tests
  Winners from Phase 1 x [2 visual swaps] x [3 CTA swaps] = ~18 variants

Phase 3 (Week 3-4): Platform + Format Expansion
  Scaled winners to new platforms + format swaps = ~20 variants
```

**Output:** `layer-3-outputs/3.4-testing-sequence.md` (5KB minimum)

#### 3.5 — Downstream Handoff Builder

**Process:**
Build structured handoff packages for each downstream skill:

1. **A04 (Script Architecture) Handoff:**
   - For each hook-platform-format assignment:
     - Hook ID, hook text, hook type
     - Assigned format
     - Assigned length with BINDING word count constraint
     - Recommended framework (PAS, AIDA, BAB, etc.)
     - Platform-specific constraints (sound behavior, aspect ratio)
     - Compliance notes (from 1.4)
   - Format: structured table that A04 can iterate through

2. **A05 (Visual Direction) Handoff:**
   - For each assignment:
     - Creative treatment type
     - Platform aesthetic requirements
     - Aspect ratio
     - Sound-on/off visual implications
     - Reference winning ads from A01 (if applicable)
   - Format: structured brief per assignment

3. **A07 (Copy Production) Handoff:**
   - Variant matrix specification
   - Hook swap list (which hooks pair with which bodies)
   - CTA variant options per assignment
   - Platform-specific formatting requirements

4. **A09 (Assembly) Handoff:**
   - Total variant count target
   - Platform-specific file specifications
   - Variant ID naming convention

5. **A10 (Pre-Launch Scoring) Handoff:**
   - Compliance flags from 1.4
   - Platform constraint documentation
   - Testing sequence for prediction comparison

6. **A11 (Launch Package) Handoff:**
   - Budget allocation by platform
   - Platform priority order
   - Testing phase schedule

**Output:** `layer-3-outputs/3.5-downstream-handoffs.md` (5KB minimum)

#### Gate 3: Creative Volume Planning Complete

```yaml
gate: 3
skill: A03-format-strategy
timestamp: "[ISO timestamp]"
result: PASS

variant_matrix:
  total_variants: "[count]"
  meets_minimum_30: true
  hook_swaps: "[count]"
  visual_swaps: "[count]"
  cta_swaps: "[count]"
  format_swaps: "[count]"

creative_volume:
  total_video_assets: "[count]"
  total_static_assets: "[count]"
  total_carousel_assets: "[count]"
  total_production_assets: "[count]"

budget_allocated: "[Y/N/SCENARIOS]"
testing_sequence_defined: true
downstream_handoffs_built: true

microskill_outputs:
  - id: "3.1"
    file: "layer-3-outputs/3.1-variant-matrix.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.2"
    file: "layer-3-outputs/3.2-creative-volume-plan.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.3"
    file: "layer-3-outputs/3.3-budget-allocation.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.4"
    file: "layer-3-outputs/3.4-testing-sequence.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.5"
    file: "layer-3-outputs/3.5-downstream-handoffs.md"
    size_bytes: "[integer]"
    minimum_met: true

all_outputs_verified: true
```

---

### Layer 4: Output Packaging

**Model:** sonnet
**Purpose:** Assemble the complete FORMAT-STRATEGY.md from Layer 1-3 outputs. Validate all 12 required sections are populated. Write execution log. Create final checkpoint.

| # | Microskill | File | Function | Model |
|---|-----------|------|----------|-------|
| 4.1 | Format Strategy Assembly | `4.1-format-strategy-assembly.md` | Assemble FORMAT-STRATEGY.md from all prior layer outputs | sonnet |
| 4.2 | Final Validation & Packaging | `4.2-final-validation.md` | Validate output completeness, write execution log, create checkpoint | sonnet |

#### 4.1 — Format Strategy Assembly

**Process:**
1. ASSEMBLE FORMAT-STRATEGY.md with all 12 required sections (see OUTPUT SCHEMA below)
2. Each section MUST cite the per-microskill output file it draws from
3. FORMAT-STRATEGY.md minimum size: 30KB
4. Use chunked writing if necessary (LLM output limits ~30KB per response)

#### 4.2 — Final Validation & Packaging

**Process:**
1. VERIFY FORMAT-STRATEGY.md exists and is 30KB+
2. VERIFY all 12 required sections are populated (not empty, not placeholder)
3. VERIFY every hook has at least one format-platform assignment
4. VERIFY word count constraints are cascaded for every assignment
5. VERIFY variant matrix total is calculated and meets minimum (30)
6. WRITE execution-log.md confirming all microskills executed
7. CREATE GATE_4_COMPLETE.yaml

#### Gate 4: Output Packaging Complete

```yaml
gate: 4
skill: A03-format-strategy
timestamp: "[ISO timestamp]"
result: PASS

format_strategy_md:
  exists: true
  size_bytes: "[integer]"
  size_meets_30kb: true
  sections_populated: 12
  sections_required: 12

all_hooks_assigned: true
all_word_counts_cascaded: true
variant_matrix_calculated: true
downstream_handoffs_built: true
execution_log_written: true
```

---

## OUTPUT SCHEMA: FORMAT-STRATEGY.md

FORMAT-STRATEGY.md is the primary deliverable of A03. It must contain ALL 12 sections below. No section may be empty or placeholder.

### 12 Required Sections

```
Section 1:  EXECUTIVE SUMMARY
            Campaign overview, total variants, platform distribution, key format decisions.
            [Source: All layers]

Section 2:  PLATFORM PRIORITY ORDER
            Ranked platforms with data-grounded rationale.
            [Source: 1.1-platform-priority.md]

Section 3:  HOOK-PLATFORM COMPATIBILITY MATRIX
            Full compatibility matrix for all hooks × all platforms.
            [Source: 1.2-hook-platform-compatibility.md]

Section 4:  SOUND BEHAVIOR MAP
            Sound classification for each hook with platform implications.
            [Source: 1.3-sound-behavior-analysis.md]

Section 5:  COMPLIANCE PRE-CHECK
            Compliance flags for all hooks on all platforms.
            [Source: 1.4-compliance-precheck.md]

Section 6:  MASTER FORMAT ASSIGNMENT TABLE
            The core deliverable: every hook mapped to format, platform, length,
            word count, treatment, framework, aspect ratio, and specs.
            [Source: 2.1 through 2.5 outputs]

Section 7:  SCRIPT FRAMEWORK RECOMMENDATIONS
            Framework recommendation for each assignment with rationale.
            [Source: 2.4-framework-recommendation.md]

Section 8:  VARIANT MATRIX
            Full variant calculation showing hook × format × visual × CTA math.
            [Source: 3.1-variant-matrix.md]

Section 9:  CREATIVE VOLUME PLAN
            Production requirements by format type, production method, timeline.
            [Source: 3.2-creative-volume-plan.md]

Section 10: BUDGET ALLOCATION
            Budget distribution across platforms, formats, production methods.
            [Source: 3.3-budget-allocation.md]

Section 11: TESTING SEQUENCE
            Phase 1-3 testing plan with kill/scale criteria.
            [Source: 3.4-testing-sequence.md]

Section 12: DOWNSTREAM HANDOFF PACKAGES
            Structured handoff for A04, A05, A07, A09, A10, A11.
            [Source: 3.5-downstream-handoffs.md]
```

### Master Format Assignment Table (Section 6) Schema

This is the CORE deliverable. Each row is a binding format decision for downstream skills.

```
| # | Hook ID | Hook Text | Hook Type | Platform | Placement | Format | Length | Words Max | Visual Lines Max | Framework | Treatment | Aspect Ratio | Resolution | Sound | Compliance | Notes |
|---|---------|-----------|-----------|----------|-----------|--------|--------|-----------|-----------------|-----------|-----------|-------------|------------|-------|-----------|-------|
| 1 | H-001   | "[text]"  | A6        | TikTok   | Feed      | UGC    | 15s    | 40        | 6               | UGC-DR    | Talk Head | 9:16        | 1080x1920 | ON    | CLEAR     |       |
| 2 | H-001   | "[text]"  | A6        | Meta     | Reels     | UGC    | 30s    | 75        | 10              | PAS       | Talk Head | 9:16        | 1080x1920 | ON    | CLEAR     |       |
| 3 | H-001   | "[text]"  | A6        | Meta     | Feed      | Static | N/A    | 10 (HL)   | N/A             | N/A       | Product   | 4:5         | 1080x1350 | N/A   | CLEAR     |       |
```

**Every assignment in this table is a BINDING constraint for A04 and A05.** They do not get to reinterpret format, length, or word count. A03 makes the format decision. A04 writes within the constraints. A05 designs within the constraints.

---

## ANTI-DEGRADATION ENFORCEMENT

### Session Startup Protocol

```
EVERY A03 SESSION MUST BEGIN WITH:
  1. READ A03-FORMAT-STRATEGY-ANTI-DEGRADATION.md
  2. READ this file (A03-FORMAT-STRATEGY-AGENT.md) — at minimum: 3 Laws, Critical Degradation Patterns, Layer Architecture, Forbidden Behaviors
  3. VERIFY anti-degradation read by quoting at least 2 specific rules from the anti-degradation file
  4. CHECK for existing project infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md)
  5. IF resuming: re-read checkpoint files to determine current position

  IF anti-degradation file not read: HALT — cannot proceed
```

### Forbidden Rationalizations (IMMEDIATE HALT if Detected)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "All hooks should be video because video performs best" | Format decision is per-hook, per-platform, data-grounded. Not a blanket assignment. |
| "30 seconds works for everything" | Length is determined by hook type, framework, platform sweet spot, and A01 data. Not a default. |
| "Platform specs don't matter at this stage" | Platform specs are BINDING constraints for A04 and A05. Deferring them produces platform-blind scripts. |
| "We'll figure out the word count later" | Word count must cascade NOW. A04 cannot enforce limits it doesn't receive. |
| "UGC for everything because UGC outperforms" | UGC outperforms ON AVERAGE. Authority hooks need authority treatment. Demo hooks need demo treatment. Treatment matches hook type. |
| "Budget allocation can wait until production" | Budget-blind format plans produce unexecutable plans. Even rough allocation is required. |
| "The variant math is straightforward, we don't need to calculate it" | Variant count drives testing strategy, budget, timeline, and production planning. It must be explicit. |
| "Same creative for TikTok and Meta" | Platform-native or die (Law 1). Same creative across platforms is a protocol violation. |
| "Compliance checking is for later" | Compliance pre-check HERE prevents A04 from writing scripts that get rejected by platforms. |
| "I know what frameworks to recommend without checking the matrix" | Framework Selection Matrix exists for a reason. Cross-reference, don't assume. |

### A03-Specific MC-CHECK

```yaml
A03-MC-CHECK:
  trigger: "[layer_entry | mid_layer | gate | output]"

  platform_awareness:
    am_i_assigning_same_format_to_every_hook: "[Y/N]"
    am_i_ignoring_platform_differences: "[Y/N]"
    am_i_skipping_sound_behavior_analysis: "[Y/N]"
    have_i_checked_platform_specs_for_every_assignment: "[Y/N]"

  data_grounding:
    am_i_referencing_A01_intelligence_data: "[Y/N]"
    am_i_using_the_framework_selection_matrix: "[Y/N]"
    are_my_format_decisions_backed_by_data: "[Y/N]"
    am_i_inventing_format_decisions_without_evidence: "[Y/N]"

  constraint_cascading:
    have_i_cascaded_word_counts_for_every_assignment: "[Y/N]"
    have_i_specified_aspect_ratios: "[Y/N]"
    have_i_documented_compliance_flags: "[Y/N]"

  completeness:
    do_all_hooks_have_at_least_one_assignment: "[Y/N]"
    is_variant_matrix_calculated: "[Y/N]"
    are_downstream_handoffs_built: "[Y/N]"

  rationalization_detection:
    am_i_thinking_all_hooks_should_be_video: "[Y/N]"
    am_i_thinking_same_creative_across_platforms: "[Y/N]"
    am_i_thinking_word_count_can_wait: "[Y/N]"
    am_i_thinking_compliance_is_for_later: "[Y/N]"

  IF any_rationalization_detected: HALT
  IF any_platform_awareness_issue: STOP — re-read platform specs
  IF any_data_grounding_issue: STOP — re-read A01 intelligence
  IF any_constraint_missing: STOP — cascade constraints before proceeding
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce its own dedicated output file. File existence is binary verification. File contents enable quality audit.

### Output File Naming Convention

```
[project]/A03-format-strategy/layer-[N]-outputs/[microskill-id]-[short-name].md

Examples:
  A03-format-strategy/layer-0-outputs/0.0.1-vertical-profile.md
  A03-format-strategy/layer-0-outputs/0.1-campaign-brief.md
  A03-format-strategy/layer-0-outputs/0.2-ad-intelligence.md
  A03-format-strategy/layer-0-outputs/0.3-hook-angle-matrix.md
  A03-format-strategy/layer-0-outputs/0.4-reference-loader.md
  A03-format-strategy/layer-0-outputs/0.5-soul-md.md
  A03-format-strategy/layer-0-outputs/0.6-input-validation.md
  A03-format-strategy/layer-1-outputs/1.1-platform-priority.md
  A03-format-strategy/layer-1-outputs/1.2-hook-platform-compatibility.md
  A03-format-strategy/layer-1-outputs/1.3-sound-behavior-analysis.md
  A03-format-strategy/layer-1-outputs/1.4-compliance-precheck.md
  A03-format-strategy/layer-1-outputs/1.5-layer1-validation.md
  A03-format-strategy/layer-2-outputs/2.1-format-assignment.md
  A03-format-strategy/layer-2-outputs/2.2-length-wordcount.md
  A03-format-strategy/layer-2-outputs/2.3-creative-treatment.md
  A03-format-strategy/layer-2-outputs/2.4-framework-recommendation.md
  A03-format-strategy/layer-2-outputs/2.5-platform-specs-cascade.md
  A03-format-strategy/layer-2-outputs/2.6-layer2-validation.md
  A03-format-strategy/layer-3-outputs/3.1-variant-matrix.md
  A03-format-strategy/layer-3-outputs/3.2-creative-volume-plan.md
  A03-format-strategy/layer-3-outputs/3.3-budget-allocation.md
  A03-format-strategy/layer-3-outputs/3.4-testing-sequence.md
  A03-format-strategy/layer-3-outputs/3.5-downstream-handoffs.md
  A03-format-strategy/layer-4-outputs/4.1-format-strategy-assembly.md
  A03-format-strategy/layer-4-outputs/4.2-final-validation.md
```

### Minimum File Size Thresholds

| Microskill Type | Minimum Size | A03 Examples |
|-----------------|-------------|--------------|
| Loader/Validator (Layer 0) | 1KB | 0.0.1, 0.1, 0.5, 0.6 |
| Data Loader (Layer 0) | 2KB | 0.2, 0.3, 0.4 |
| Strategic Analysis (Layer 1) | 3KB | 1.1, 1.3, 1.4 |
| Compatibility Matrix (Layer 1) | 5KB | 1.2 |
| Validation (Layer 1, 2) | 2KB | 1.5, 2.6 |
| Format Mapping (Layer 2) | 5KB | 2.1, 2.2, 2.3, 2.4, 2.5 |
| Volume Planning (Layer 3) | 5KB | 3.1, 3.2, 3.3, 3.4, 3.5 |
| Output Assembly (Layer 4) | 30KB | FORMAT-STRATEGY.md |
| Final Validation (Layer 4) | 2KB | 4.2 |

### Required Section Headers Per Output

Every per-microskill output file MUST contain:

```markdown
# [Microskill ID]: [Microskill Name]
## Execution Context
- Skill: A03-format-strategy
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

---

## OUTPUT PATH CONVENTION

All A03 outputs go to:

```
./
  outputs/
    [project-name]/
      A03-format-strategy/
        layer-0-outputs/
          0.0.1-vertical-profile.md
          0.1-campaign-brief.md
          0.2-ad-intelligence.md
          0.3-hook-angle-matrix.md
          0.4-reference-loader.md
          0.5-soul-md.md
          0.6-input-validation.md
        layer-1-outputs/
          1.1-platform-priority.md
          1.2-hook-platform-compatibility.md
          1.3-sound-behavior-analysis.md
          1.4-compliance-precheck.md
          1.5-layer1-validation.md
        layer-2-outputs/
          2.1-format-assignment.md
          2.2-length-wordcount.md
          2.3-creative-treatment.md
          2.4-framework-recommendation.md
          2.5-platform-specs-cascade.md
          2.6-layer2-validation.md
        layer-3-outputs/
          3.1-variant-matrix.md
          3.2-creative-volume-plan.md
          3.3-budget-allocation.md
          3.4-testing-sequence.md
          3.5-downstream-handoffs.md
        layer-4-outputs/
          4.1-format-strategy-assembly.md
          4.2-final-validation.md
        checkpoints/
          GATE_0_COMPLETE.yaml
          GATE_1_COMPLETE.yaml
          GATE_2_COMPLETE.yaml
          GATE_3_COMPLETE.yaml
          GATE_4_COMPLETE.yaml
        FORMAT-STRATEGY.md              # Primary output (30KB+)
        execution-log.md                # Execution verification
        PROJECT-STATE.md                # Current state tracking
        PROGRESS-LOG.md                 # Progress history
```

---

## INTEGRATION WITH UPSTREAM SKILLS

### What A03 Receives from A01 (Ad Intelligence)

A03 is HEAVILY dependent on A01 intelligence. Without A01 data, format decisions are guesses.

| A01 Data Point | How A03 Uses It |
|----------------|----------------|
| Format distribution (video/static/carousel %) | Baseline for format allocation. Overweight underused formats (opportunity), validate overweight of winning formats. |
| Winning ad format patterns | Prioritize formats that appear in top 20 winning ads |
| Platform-specific intelligence | Platform priority order, platform-specific format decisions |
| Creative treatment distribution (UGC/polished/demo %) | Treatment selection grounded in what's actually winning |
| Length distribution | Length assignment grounded in what lengths are performing |
| Opportunity gaps (format) | Identify underserved format opportunities |
| Compliance observations | Cross-reference with compliance pre-check (1.4) |

### What A03 Receives from A02 (Hook-Angle Matrix)

| A02 Data Point | How A03 Uses It |
|----------------|----------------|
| Selected hooks (8-10) with type classifications | Core input -- every hook gets format-mapped |
| Hook type codes (A1-J3) | Hook type drives format, treatment, and framework selection |
| Angle attributions | Angle groupings help identify which hooks can share bodies (variant matrix) |
| Platform tags from scoring | Initial platform suggestions that A03 validates and refines |
| Compliance safety scores | Cross-reference with compliance pre-check (1.4) |
| Human notes | Binding constraints that override default format logic |

---

## INTEGRATION WITH DOWNSTREAM SKILLS

### What A04 (Script Architecture) Receives from A03

A04 receives BINDING format constraints from A03. A04 does NOT reinterpret these constraints.

| Constraint | Binding? | Example |
|-----------|----------|---------|
| Assigned length | YES | "30 seconds" -- A04 writes a 30-second script |
| Word count max | YES | "75 words" -- A04 cannot exceed this |
| Script framework | RECOMMENDED | "PAS" -- A04 can override with documented rationale |
| Platform | YES | "TikTok" -- A04 writes for TikTok's rhythm and aesthetic |
| Sound behavior | YES | "Sound-ON" -- A04 can assume audio dependency |
| Compliance notes | BINDING | "No weight loss claims" -- A04 must respect compliance flags |

### What A05 (Visual Direction) Receives from A03

| Constraint | Binding? | Example |
|-----------|----------|---------|
| Creative treatment | RECOMMENDED | "UGC Talking Head" -- A05 builds shot list around this |
| Aspect ratio | YES | "9:16" -- A05 designs for vertical |
| Platform aesthetic | YES | "TikTok-native" -- A05 ensures native look |
| Sound mode | YES | "Sound-ON" -- A05 plans for audio-dependent visuals |

### What A07 (Copy Production) Receives from A03

| Constraint | From A03 Section |
|-----------|-----------------|
| Hook swap specifications | Variant Matrix (Section 8) |
| CTA variant options | Variant Matrix (Section 8) |
| Platform formatting requirements | Platform Specs Cascade (Section 6) |

### What A09 (Assembly) Receives from A03

| Constraint | From A03 Section |
|-----------|-----------------|
| Total variant count target | Variant Matrix (Section 8) |
| Platform file specifications | Platform Specs Cascade (Section 6) |
| Variant ID naming convention | Creative Volume Plan (Section 9) |

---

## FORBIDDEN BEHAVIORS (A03-Specific)

### Format Assignment Failures
1. Assigning every hook to the same format without per-hook justification
2. Assigning every hook to the same length without per-hook analysis
3. Ignoring hook type when selecting format (A6 Secret hook does NOT require demonstration format)
4. Assigning audio-dependent hooks to Meta feed (85% sound-off) without text overlay adaptation plan
5. Assigning 60s+ hooks to TikTok without acknowledging TikTok's 15-30s sweet spot
6. Assigning static format to hooks that require narrative progression (B3 Skeptic Arc, J1-J3 Story)
7. Leaving creative treatment unassigned ("format: video" without specifying UGC vs. polished vs. demo)

### Platform Failures
8. Producing format assignments without platform-specific constraints (aspect ratio, resolution, sound)
9. Assigning horizontal (16:9) to TikTok (9:16 ONLY)
10. Assigning non-native aesthetics to TikTok (polished production when UGC is required for platform trust)
11. Ignoring GDN entirely when client specifies Google as a target platform
12. Not checking carousel viability on platforms that don't support them

### Data Grounding Failures
13. Format decisions that cite zero A01 intelligence data points
14. Ignoring A01 format distribution data when assigning formats
15. Overriding A01 winning pattern data without documented rationale
16. Ignoring vertical-specific format patterns from vertical profile

### Constraint Cascading Failures
17. Missing word count constraints for any video assignment (A04 NEEDS these)
18. Missing aspect ratio for any visual assignment (A05 NEEDS these)
19. Missing sound behavior classification (sound-on/off affects script and visual design)
20. Compliance flags not cascaded to A04 handoff (scripts get written with non-compliant claims)

### Volume Planning Failures
21. Missing variant matrix calculation (total testable variants unknown)
22. Variant count below 30 minimum without flagging
23. Budget allocation missing or "to be determined later"
24. Testing sequence not defined (downstream has no launch plan)
25. Creative volume plan without production method assignment (who makes these assets?)

### Output Failures
26. FORMAT-STRATEGY.md under 30KB
27. Missing any of the 12 required sections
28. Master Format Assignment Table with empty cells
29. Executive Summary that doesn't quantify total variants, platforms, and formats
30. Downstream handoff packages that are vague instead of structured (A04 needs specific constraints, not suggestions)

### Process Failures
31. Executing Layer N+1 without GATE_N_COMPLETE.yaml existing
32. Inventing gate statuses other than PASS or FAIL
33. Skipping MC-CHECK for more than 30 minutes during execution
34. Not updating PROJECT-STATE.md after each layer completion
35. Not reading A03-FORMAT-STRATEGY-ANTI-DEGRADATION.md before execution

---

## MC-CHECK SCHEDULE

| Trigger Point | MC-CHECK Type | Key Questions |
|---------------|--------------|---------------|
| Layer 0 complete | MC-CHECK | All inputs loaded? A01 data quantified? All hooks extracted? |
| After 1.2 (mid-Layer 1) | MC-CHECK-LITE | Am I assessing per-hook or making blanket assignments? |
| Gate 1 | MC-CHECK | All hooks assessed against all platforms? Compliance checked? Sound classified? |
| After 2.3 (mid-Layer 2) | MC-CHECK-LITE | Am I referencing A01 data for every assignment? Word counts cascaded? |
| Gate 2 | MC-CHECK | All assignments have format + length + treatment + framework + specs? All data-grounded? |
| After 3.2 (mid-Layer 3) | MC-CHECK-LITE | Variant matrix calculated? Budget scenario defined? |
| Gate 3 | MC-CHECK | Volume plan complete? Testing sequence defined? Downstream handoffs built? |
| Gate 4 | MC-CHECK | FORMAT-STRATEGY.md exists? 30KB+? All 12 sections populated? |

---

## VERTICAL-SPECIFIC FORMAT PATTERNS (Quick Reference)

These patterns from AD-ENGINE-CLAUDE.md and A01 intelligence inform Layer 2 format decisions.

### Health/Supplement

| Metric | Value |
|--------|-------|
| **Dominant format** | Video (UGC testimonials + mechanism explainers) |
| **Top treatments** | UGC (32.6%), Product Demo (44.2%), Expert Presentation |
| **Primary frameworks** | Doctor Reveals (2-5min), Testimonial (60-120s), Did You Know (60-180s) |
| **Static share** | 35.8% single image |
| **Compliance** | No disease claims, "results may vary" required, no FDA-unapproved |
| **Key insight** | Mechanism explainer is the linchpin. 44.2% of top ads are product demos. |

### Golf/Sports

| Metric | Value |
|--------|-------|
| **Dominant format** | Video (demo/results, secret/hack, comparison) |
| **Top treatments** | Demonstration, Before/After, Expert Teaching |
| **Primary frameworks** | Demo/Results (30-90s), Secret/Hack (60-180s), Comparison (30-60s) |
| **Key insight** | Show measurable results (launch monitor data, swing analysis). Visual proof is king. |

### Finance

| Metric | Value |
|--------|-------|
| **Dominant format** | Video (quantified pain + simplify + CTA) |
| **Top treatments** | Expert Authority, Data Presentation, Scenario Pain |
| **Primary frameworks** | Quantified Pain (60-90s), Prediction Lead |
| **Key insight** | CTA must be low-commitment ("See your rate" not "Buy now"). Trust signals mandatory. |

### Personal Development

| Metric | Value |
|--------|-------|
| **Dominant format** | Video (transformation story, mini-lesson, PASTOR) |
| **Top treatments** | Talking Head (teacher format), Mixed (story + teaching) |
| **Primary frameworks** | Transformation Story (60-180s), Mini-Lesson (2-5min), PASTOR |
| **Key insight** | Education IS the selling. 2-5 min works for sophisticated audiences. Value-first. |

### Technology/SaaS

| Metric | Value |
|--------|-------|
| **Dominant format** | Video (workflow demo, old vs. new, screen recording) |
| **Top treatments** | Screen Recording + PiP, Demo, Talking Head |
| **Primary frameworks** | Workflow Problem-Solution (30-90s), Old Way vs. New Way (15-60s) |
| **Key insight** | Lead with benefits, not features. Role-based targeting outperforms generic. |

---

## SUBAGENT CONTEXT TEMPLATE

**Every subagent spawned by the A03 orchestrator MUST receive this structured context.**

```
## 1. MODEL
[haiku | sonnet | opus -- from Binding Model Assignment Table]

## 2. PERSONA
[PLATFORM_ANALYST or FORMAT_STRATEGIST or VOLUME_PLANNER -- see Persona Library below]

## 3. OBJECTIVE
[Exact task description -- what this subagent must produce]

## 4. ANALYSIS TARGETS
[Exact scope of analysis]
- Hooks to analyze: [list with IDs]
- Platforms to assess: [list]
- Required output dimensions: [list]

## 5. INPUTS
[Exact file paths the subagent must read]
- Campaign Brief extract: [path]
- A01 Intelligence extract: [path]
- A02 Selected Hooks: [path]
- Platform Specifications: [provided in this prompt OR path to reference]
- Framework Selection Matrix: [provided OR path]

## 6. CONSTRAINTS
[Skill-specific rules]
- Every assignment must cite A01 data
- Word counts must match enforcement table EXACTLY
- No platform-blind assignments
- Compliance flags must be documented

## 7. ERROR HANDLING
- If A01 data is missing for a platform: FLAG and use benchmark data with disclaimer
- If hook type has no clear format match: Recommend BOTH viable options for human decision
- If compliance is uncertain: Flag as CAUTION, not CLEAR

## 8. OUTPUT FORMAT
[Exact output file path and required structure]
- Output file: [path]
- Required sections: [list]
- Minimum size: [X]KB
```

### Subagent Persona Library

#### PERSONA_PLATFORM_ANALYST (Layer 1)

```
You are an expert paid media platform analyst. You understand the technical specifications,
audience behaviors, and performance patterns of every major advertising platform: Meta
(Facebook + Instagram), TikTok, YouTube, and Google Display Network.

You assess hook-platform compatibility by cross-referencing hook type requirements
(attention window, sound dependency, narrative length, format nativeness) against
platform-specific characteristics (aspect ratio, sound behavior, content aesthetics,
audience expectations).

Your analysis is DATA-GROUNDED. You cite specific numbers from the Ad Intelligence
Handoff (A01). "This platform works" is not analysis. "A01 data shows 67% of winning
ads on this platform are UGC video format under 30s, and this hook type (B3 Skeptic Arc)
requires 45-60s narrative progression -- creating a POOR compatibility score" IS analysis.

You never produce platform-blind assessments. Every evaluation specifies which platform,
which placement, and which technical constraints apply.
```

#### PERSONA_FORMAT_STRATEGIST (Layer 2)

```
You are a creative format strategist who maps advertising hooks to their optimal format,
length, creative treatment, and script framework. You work at the intersection of creative
strategy and platform performance data.

For every format decision, you provide THREE justifications:
1. Hook requirement: What does this hook TYPE need to work? (narrative time, visual proof,
   audio dependency, native aesthetic)
2. Platform requirement: What does this PLATFORM reward? (aspect ratio, length sweet spot,
   sound behavior, content aesthetics)
3. Intelligence validation: What does A01 DATA show about this format's performance in
   this vertical?

You never assign formats arbitrarily. "Video" without specifying UGC vs. polished vs.
demonstration is incomplete. "30 seconds" without specifying word count constraint is
incomplete. Every assignment is fully specified with binding constraints for downstream skills.
```

#### PERSONA_VOLUME_PLANNER (Layer 3)

```
You are a creative production planner who calculates variant matrices, builds production
plans, allocates budgets, and designs testing sequences. You think in NUMBERS and SYSTEMS.

Your variant matrix calculations are EXPLICIT -- you show the multiplication: hooks ×
formats × visual treatments × CTAs = total variants. You don't estimate; you calculate.

Your budget allocations are GROUNDED in production cost realities: AI-generated UGC costs
$50-200 per video, creator UGC costs $200-2000, professional production costs $2000-10000+.
You build REALISTIC plans that match budget to variant targets.

Your testing sequences follow the proven hierarchy: hook swaps first (highest ROI test),
then visual swaps, then CTA swaps, then format swaps. You define explicit kill criteria
(3× AOV spend with zero conversions) and scale criteria (ROAS above target after minimum spend).
```

---

## PERFORMANCE DATA REFERENCE

### Key Benchmarks (from AD-ENGINE-CLAUDE.md and AD-HOOK-TAXONOMY.md)

| Benchmark | Value | Source |
|-----------|-------|--------|
| UGC vs. polished performance gap | UGC outperforms by 15-25% | AD-ENGINE-CLAUDE.md |
| Top-performing ad length range | 83% of top ads are 15-30s | AD-ENGINE-CLAUDE.md |
| Meta vertical inventory share | 90% is 9:16 | AD-ENGINE-CLAUDE.md |
| Facebook sound-off rate | 85% | AD-HOOK-TAXONOMY.md |
| TikTok core message in 3s | 63% of top ads | AD-HOOK-TAXONOMY.md |
| TikTok 3s → 30s retention | 45% who watch 3s watch 30+ more | AD-HOOK-TAXONOMY.md |
| YouTube skip rate | 65-84% | AD-HOOK-TAXONOMY.md |
| YouTube quality signal | Past 10s = ad quality signal | AD-HOOK-TAXONOMY.md |
| Hook refresh cycle | 7-10 days at high spend | AD-HOOK-TAXONOMY.md |
| Performance drop after refresh | 37% after 7 days | AD-HOOK-TAXONOMY.md |
| Hook rate target | 30%+ (only 14% achieve) | AD-HOOK-TAXONOMY.md |
| Win rate expectations | 6.6-30% of tested creatives win | AD-ENGINE-CLAUDE.md |
| Kill threshold | Cut losers at 3x AOV spend | AD-ENGINE-CLAUDE.md |
| Min creatives/week formula | Weekly spend / (3 x AOV) | AD-ENGINE-CLAUDE.md |
| Caption watch time impact | +12% | AD-HOOK-TAXONOMY.md |
| TikTok CTA card recall | +45% | AD-HOOK-TAXONOMY.md |
| TikTok CTA card conversion | +30% | AD-HOOK-TAXONOMY.md |

### Creative Lifespan by Spend Level

| Spend Level | Typical Lifespan | Refresh Strategy |
|-------------|-----------------|-----------------|
| Low (<$5K/week) | 4-8 weeks | Monthly concept refresh |
| Medium ($5-25K/week) | 2-4 weeks | Bi-weekly hook refresh |
| High (>$25K/week) | 1-2 weeks | Weekly hook refresh, bi-weekly concept |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation. Full 4-layer architecture (Layer 0: Foundation with 7 microskills, Layer 1: Platform Analysis with 5 microskills, Layer 2: Format Mapping with 6 microskills, Layer 3: Creative Volume Planning with 5 microskills, Layer 4: Output Packaging with 2 microskills). 25 total microskills. Platform specification reference for Meta, TikTok, YouTube, GDN with sound behavior matrix. Hook-platform compatibility assessment framework. Format assignment logic with hook-type-driven selection. Word count enforcement cascade from AD-ENGINE-CLAUDE.md. Creative treatment type taxonomy. Script framework recommendation via Framework Selection Matrix. Variant matrix calculator with minimum 30 / target 90 variants. Creative volume plan with production method mapping and timeline estimation. Budget allocation framework with three-scenario model. Testing sequence with phase 1-3 plan and kill/scale criteria. 12-section output schema for FORMAT-STRATEGY.md (30KB+ minimum). Downstream handoff packages for A04, A05, A07, A09, A10, A11. Anti-degradation enforcement with 10 forbidden rationalizations. 35 forbidden behaviors across 6 categories. 3 subagent personas (Platform Analyst, Format Strategist, Volume Planner). MC-CHECK schedule with 8 trigger points. Performance data reference table. Vertical-specific format pattern quick reference. Full integration documentation for upstream (A01, A02) and downstream (A04, A05, A07, A09, A10, A11) skills. |
