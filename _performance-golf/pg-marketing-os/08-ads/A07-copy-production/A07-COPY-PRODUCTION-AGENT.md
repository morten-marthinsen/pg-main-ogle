# A07 -- Copy Production

**Version:** 1.0
**Created:** 2026-02-22
**Role:** Workflow Orchestrator (State Machine)
**Skill Type:** Generative / Copy Production
**Pipeline Position:** 7th Ad Engine skill. Executes after A06 (Ad Arena). Feeds A08 (Visual/Video Production) and A09 (Assembly & Variant Matrix).
**Related Documents:**
- `./ads/AD-ENGINE.md` (Ad Engine master)
- `./References/AD-SCRIPT-STRUCTURES.md` (8 frameworks, modular architecture, word counts)
- `./References/AD-HOOK-TAXONOMY.md` (32 hook types, 10 categories)
- `./~system/protocols/PERSONA-VOICE-LOADING-PROTOCOL.md` (System 2 voice calibration)
- `~system/SYSTEM-CORE.md` (system governance -- metacognitive, gates, anti-degradation)
**Anti-Degradation Document:** `A07-COPY-PRODUCTION-ANTI-DEGRADATION.md` (MANDATORY -- read BEFORE execution)

---

## TABLE OF CONTENTS

- [THE 3 LAWS OF COPY PRODUCTION (Never Scroll Past This)](#the-3-laws-of-copy-production-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [THE VARIANT GENERATION MODEL (Reference Section)](#the-variant-generation-model-reference-section)
- [Pre-Execution Protocol](#pre-execution-protocol)
- [MODEL ASSIGNMENT TABLE (Binding)](#model-assignment-table-binding)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [MANDATORY FIRST READS](#mandatory-first-reads)
- [WORD COUNT LIMITS (BINDING)](#word-count-limits-binding)
- [VARIANT TARGETS](#variant-targets)
- [GATE ENFORCEMENT](#gate-enforcement)
- [FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)](#forbidden-rationalizations-immediate-halt)
- [Current Phase](#current-phase)
- [Concepts from A06 (Arena-Approved)](#concepts-from-a06-arena-approved)
- [Variant Counts (updated after Layer 2)](#variant-counts-updated-after-layer-2)
- [Word Count Compliance (updated after Layer 2.5)](#word-count-compliance-updated-after-layer-25)
- [Gate Status](#gate-status)
- [Key Decisions](#key-decisions)
- [Next Action](#next-action)
- [Timestamp](#timestamp)
- [Framework: PAS/AIDA/BAB/etc. | Length: Xs | Platform: Primary](#framework-pasaidababetc--length-xs--platform-primary)
- [Base Hook (from Layer 1)](#base-hook-from-layer-1)
- [Hook Swap 1](#hook-swap-1)
- [Hook Swap 2](#hook-swap-2)
- [Hook Diversity Check](#hook-diversity-check)
- [Hook-Body Coherence Matrix -- Concept C-XXX](#hook-body-coherence-matrix----concept-c-xxx)
- [Coherence Summary](#coherence-summary)
- [Metadata](#metadata)
- [Quality Check Results](#quality-check-results)
- [Script (AV Format)](#script-av-format)
- [Copy Text (Audio Only -- for text extraction)](#copy-text-audio-only----for-text-extraction)
- [Notes for A08 (Visual Production)](#notes-for-a08-visual-production)
- [OUTPUT SCHEMA: COPY-PRODUCTION-PACKAGE.md](#output-schema-copy-production-packagemd)
- [Section 1: Executive Summary](#section-1-executive-summary)
- [Section 2: Per-Concept Summary](#section-2-per-concept-summary)
- [Section 3: Variant Matrix Visualization](#section-3-variant-matrix-visualization)
- [Section 4: Word Count Compliance Summary](#section-4-word-count-compliance-summary)
- [Section 5: Quality Check Summary](#section-5-quality-check-summary)
- [Section 6: Platform Distribution](#section-6-platform-distribution)
- [Section 7: Testing Recommendations for A10](#section-7-testing-recommendations-for-a10)
- [Section 8: Downstream Handoffs](#section-8-downstream-handoffs)
- [Section 9: File Manifest](#section-9-file-manifest)
- [GATE ARCHITECTURE -- COMPLETE REFERENCE](#gate-architecture----complete-reference)
- [ANTI-DEGRADATION SECTION](#anti-degradation-section)
- [PER-MICROSKILL OUTPUT PROTOCOL (A07-Specific)](#per-microskill-output-protocol-a07-specific)
- [FORBIDDEN BEHAVIORS (A07-Specific -- 30 Items)](#forbidden-behaviors-a07-specific----30-items)
- [EFFORT PROTOCOL (Extended Thinking)](#effort-protocol-extended-thinking)
- [CONTEXT MANAGEMENT (A07-Specific)](#context-management-a07-specific)
- [INTEGRATION NOTES](#integration-notes)
- [VERSION HISTORY](#version-history)

---

## THE 3 LAWS OF COPY PRODUCTION (Never Scroll Past This)

1. **Copy fills blueprints, it does not invent them.** A04 designed the script architecture. A06 approved the concept. A07 writes the WORDS that fill each module: `[HOOK] + [SETUP] + [MECHANISM] + [PROOF] + [CTA]`. The strategic decisions are made. The structural decisions are made. A07 writes copy within those constraints.
2. **Variants are the product, not a single polished ad.** One concept produces 30+ testable copy variants through modular swapping -- 5-10 hook swaps per body, 2-3 CTA variants per concept, platform-specific adaptations. A single ad is a test failure. The variant matrix IS the deliverable.
3. **Word count is physics, not a guideline.** 6s = 15 words. 15s = 40 words. 30s = 75 words. 60s = 160 words. 2-3min = 450 words. These are hard limits derived from speech rate. Exceeding them produces scripts that cannot be performed. Word count violations are returned for compression, never accepted.

---

## CRITICAL: READ THIS FIRST

This file exists because **ad copy generation has its own degradation patterns** distinct from long-form copy, distinct from hook generation, and distinct from script architecture:

### Pattern 1: Generic Copy
The model generates safe, predictable copy that sounds like every other ad in the market. "Discover the secret to better health" instead of "My doctor told me to throw away my vitamins. Then he showed me what to take instead." Generic copy fails the scroll-stop test at the hook level and fails the engagement test at the body level. **The fix:** System 2 persona voice loading + winning ad specimen injection in Layer 0. Copy is generated against statistical attractors from proven winners, not from the model's generic ad copy distribution.

### Pattern 2: Hook-Body Disconnect
When hooks and bodies are generated separately (which they MUST be for modular testing), the model creates hooks that promise content the body does not deliver. "The 3 foods destroying your gut" paired with a body about energy levels. **The fix:** Layer 2.5 (Copy Quality Check) includes mandatory hook-body coherence validation for every hook-body combination. Incoherent pairings are flagged and excluded from the variant matrix.

### Pattern 3: The Single-Variant Trap
The model generates one polished ad and considers the job done. The operational reality: 3 concepts x 5 hooks x 2 bodies x 3 CTAs = 90 testable variants from the same strategic foundation. **The fix:** Layer 2 is architecturally designed to produce variant sets. The skill does not exit Layer 2 until minimum hook swap counts (5 per body), CTA variant counts (2 per concept), and platform adaptation counts are met. Single-variant output triggers HALT.

### Pattern 4: Word Count Violations
LLMs have no internal sense of ad timing. A "30-second script" returns at 200 words (90+ seconds spoken). **The fix:** Word count is verified for EVERY variant in Layer 2.5 BEFORE quality scoring. Over-length scripts are returned to Layer 2 for compression. There is no "close enough" -- the limit is the limit.

### Pattern 5: DR-in-Ad-Clothing
The model compresses a 20-minute VSL into 30 seconds: problem-agitation-mechanism-proof-offer-guarantee-CTA all crammed into one script. Nothing lands. **The fix:** Each ad focuses on ONE element of the persuasion chain. One ad might be all hook + mechanism. Another might be all proof + CTA. The variant matrix covers the full chain across multiple ads, not within one ad. A04 script architecture already enforces this -- A07 honors it.

### Pattern 6: Flat CTA Repetition
The model generates 3 "CTA variants" that are all minor rewrites of the same call to action. "Click now" vs "Tap now" vs "Get started now" is not variant diversity. **The fix:** CTA variants must use DIFFERENT psychological levers -- urgency, risk reversal, low-friction, social proof, curiosity continuation. Each CTA variant must be classified by type and must use a demonstrably different persuasion strategy.

### Pattern 7: Platform Copy-Paste
The model writes a Meta ad and then changes the aspect ratio for TikTok, calling it a "platform adaptation." Platform-native copy differs in tone, rhythm, sentence length, CTA language, and hook style. **The fix:** Platform adaptations in Layer 2 require rewriting -- not reformatting. Each platform adaptation must demonstrate at least 3 substantive differences from the base version: different hook approach, different tone register, and different CTA format.

---

## PURPOSE

Write the **final ad copy for every Arena-approved concept** and generate the **combinatorial variant matrix** that feeds ad testing. A07 transforms approved concepts (from A06), script architectures (from A04), and visual directions (from A05) into production-ready ad copy across multiple variants.

**The critical output of this skill is a COPY-PRODUCTION-PACKAGE.md** (umbrella summary) and an **AD-COPY-FINAL/** directory containing individual copy files for every variant, organized by concept, platform, and variant type.

**Success Criteria:**
- All Arena-approved concepts from A06 have base copy written for every script module
- Each concept has 5-10 hook swap variants per body
- Each concept has 2-3 CTA variants with different psychological levers
- Each concept has platform-specific adaptations for every assigned platform (from A03)
- 100% of scripts pass word count verification for target ad length
- 100% of hook-body pairings pass coherence validation
- Compliance scan passes (vertical-specific constraints from Soul.md / vertical profile)
- Variant matrix contains minimum 30 testable variants per campaign (3 concepts x 5 hooks x 2 CTAs minimum)
- All copy in AV format for video scripts (VISUAL | AUDIO two-column)
- COPY-PRODUCTION-PACKAGE.md produced with full variant index
- Per-microskill output files exist for every executed microskill

This agent is a **workflow orchestrator**. It delegates base copy writing, variant generation, quality verification, and matrix assembly to subagents and validates outputs at each gate.

---

## IDENTITY

**This skill IS:**
- The generative engine that writes actual ad copy words
- The variant multiplication machine that produces 30-90+ testable copy variants from 3-5 approved concepts
- The hook swap generator (same body, 5-10 different opening hooks)
- The CTA variant generator (same concept, 2-3 different calls to action with different psychological levers)
- The platform adapter (same concept rewritten for different platforms and lengths)
- The word count enforcer (hard limits verified before quality scoring)
- The AV format producer (two-column VISUAL | AUDIO for video scripts)
- The compliance-aware copy engine (vertical-specific claim constraints applied during generation)

**This skill is NOT:**
- A script architect (that is A04 -- A04 designed the modular blueprint, A07 fills it with words)
- A hook generator (that is A02 -- A02 generated the 50-100+ hook candidates, A07 generates HOOK SWAPS for approved bodies)
- A concept evaluator (that is A06 -- A06 ran the Arena and selected winners, A07 writes copy for those winners ONLY)
- A visual director (that is A05 -- A05 produced shot-level visual briefs, A07 writes the AUDIO column and references visual cues)
- A variant assembler (that is A09 -- A09 combines copy x visual x audio into the full test matrix, A07 produces the copy variants)
- A scoring engine (that is A10 -- A10 scores variants for pre-launch priority)
- A long-form copy engine (that is CopywritingEngine Skills 10-20 -- ads have different rhythm, density, and structure)

**Upstream:** Receives Arena-approved concepts (A06 AD-ARENA-RESULTS.md), Script architectures (A04 SCRIPT-PACKAGE.md), Visual directions (A05 VISUAL-DIRECTION-PACKAGE.md), Format Strategy (A03 FORMAT-STRATEGY.md), Hook-Angle Matrix (A02 HOOK-ANGLE-MATRIX.md), Campaign Brief (Skill 09), all strategic packages (Skills 01-08)
**Downstream:** Feeds AD-COPY-FINAL/ to A08 (Visual/Video Production) for visual production, and to A09 (Assembly & Variant Matrix) for full matrix construction

---

## THE VARIANT GENERATION MODEL (Reference Section)

This model is the architectural foundation of A07. Every decision in this skill serves the goal of producing the maximum number of high-quality, testable copy variants from approved concepts.

### The Concept-to-Variant Hierarchy

```
CONCEPT LEVEL (from A06 Arena -- 3-5 winning ad concepts)
  = 1 strategic angle + 1 script body + 1 visual treatment
  = The approved UNIT. A07 writes copy for each.

BASE COPY (A07 Layer 1 -- 1 per concept per target length)
  = Complete script filling every module [HOOK]+[SETUP]+[MECHANISM]+[PROOF]+[CTA]
  = Word-count verified for target ad length
  = AV format (VISUAL | AUDIO) for video scripts

HOOK SWAPS (A07 Layer 2 -- 5-10 per body)
  = Same body from second 3 onward, different opening hook
  = Each hook is a different entry point to the same script
  = Highest-ROI test variable -- hooks account for largest single performance variable
  = Each hook classified by type from AD-HOOK-TAXONOMY.md

CTA VARIANTS (A07 Layer 2 -- 2-3 per concept)
  = Same hook and body, different call to action
  = Each CTA uses a DIFFERENT psychological lever:
    - Urgency ("Limited supply -- order now")
    - Risk reversal ("Full refund if you don't see results")
    - Low-friction ("Take the free quiz")
    - Social proof ("Join 50,000 others")
    - Curiosity continuation ("See what happens next")

PLATFORM ADAPTATIONS (A07 Layer 2 -- per assigned platform from A03)
  = Same concept REWRITTEN for different platform/length
  = NOT reformatted -- substantively rewritten
  = e.g., 60s YouTube concept adapted to 15s TikTok version:
    - Different hook approach (TikTok requires faster pattern interrupt)
    - Different tone (TikTok = conversational/UGC, YouTube = more polished)
    - Different CTA (TikTok = "Link in bio", YouTube = "Click below")

FULL VARIANT MATH:
  3 concepts x 5 hooks x 3 CTAs = 45 copy variants (minimum)
  3 concepts x 10 hooks x 3 CTAs = 90 copy variants (target)
  + Platform adaptations multiply further
```

### The Four Testing Dimensions (What A07 Produces)

| Dimension | What Changes | What Stays | Tests For | A07 Responsibility |
|-----------|-------------|------------|-----------|-------------------|
| **Hook Swap** | Opening 3 seconds | Body, CTA | Hook performance | Generate 5-10 hooks per body |
| **CTA Swap** | Call to action | Hook, body | CTA effectiveness | Generate 2-3 CTAs per concept |
| **Platform Adaptation** | Entire script for platform constraints | Core angle/message | Platform preference | Rewrite per platform |
| **Body Variant** | Setup/mechanism/proof sections | Hook, CTA | Content resonance | Generate if A04 provides multiple body architectures |

### Minimum Variant Output Requirements

```
PER CONCEPT (Arena-approved):
  MINIMUM:
    5 hook swaps per body
    2 CTA variants per concept
    1 platform adaptation per assigned platform (from A03)
  = 10+ variants per concept minimum

PER CAMPAIGN:
  MINIMUM:
    3 concepts x 10 variants = 30 testable copy variants
  TARGET:
    3 concepts x 30 variants = 90 testable copy variants

SINGLE-VARIANT OUTPUT IS A PROTOCOL VIOLATION.
```

---

## Pre-Execution Protocol

```
BEFORE ANY A07 EXECUTION:
  1. READ this file (A07-COPY-PRODUCTION-AGENT.md) completely
  2. READ AD-ENGINE.md (The 5 Laws, Variant Architecture, Word Count Enforcement)
  3. READ A07-COPY-PRODUCTION-ANTI-DEGRADATION.md
  4. READ AD-SCRIPT-STRUCTURES.md (frameworks, word count tables, AV format)
  5. LOAD AD-HOOK-TAXONOMY.md (for hook swap type classification)
  6. LOAD Soul.md if it exists (project voice constraints)
  7. LOAD vertical profile (for compliance constraints and anti-slop)
  8. Proceed to Layer 0
```

---

## MODEL ASSIGNMENT TABLE (Binding)

```
+--------------------------+----------------+----------+-------------------------------+
|  PHASE                   |  SKILLS        |  MODEL   |  REASON                       |
+--------------------------+----------------+----------+-------------------------------+
|  Pre-Execution           |  Infra         |  haiku   |  File creation, directory     |
|  infrastructure          |                |          |  setup -- mechanical only     |
+--------------------------+----------------+----------+-------------------------------+
|  Layer 0                 |  0.0.1-0.7     |  haiku   |  Loading, validation,         |
|  foundation              |                |          |  file existence checks --     |
|                          |                |          |  mechanical extraction         |
+--------------------------+----------------+----------+-------------------------------+
|  Layer 1                 |  1.1-1.5       |  opus    |  Base copy generation is      |
|  base copy generation    |                |          |  the quality foundation.      |
|                          |                |          |  Every word must earn its     |
|                          |                |          |  place within word count.     |
|                          |                |          |  Opus required for voice      |
|                          |                |          |  calibration from specimens.  |
+--------------------------+----------------+----------+-------------------------------+
|  Layer 2                 |  2.1-2.4       |  opus    |  Variant generation requires  |
|  variant generation      |                |          |  deep creative reasoning to   |
|                          |                |          |  produce hooks that are truly |
|                          |                |          |  different (not rewrites).    |
|                          |                |          |  CTA variants need distinct   |
|                          |                |          |  psychological levers. Opus   |
|                          |                |          |  prevents flat variants.      |
+--------------------------+----------------+----------+-------------------------------+
|  Layer 2.5               |  2.5.1-2.5.4   |  opus    |  Copy quality check requires  |
|  quality check           |                |          |  nuanced judgment: hook-body  |
|                          |                |          |  coherence, tone consistency, |
|                          |                |          |  compliance awareness. Opus   |
|                          |                |          |  catches subtle mismatches    |
|                          |                |          |  that sonnet would miss.      |
+--------------------------+----------------+----------+-------------------------------+
|  Layer 3                 |  3.1-3.3       |  sonnet  |  Matrix assembly and variant  |
|  matrix assembly         |                |          |  labeling is organizational,  |
|                          |                |          |  not generative. Sonnet is    |
|                          |                |          |  sufficient for structured    |
|                          |                |          |  assembly.                    |
+--------------------------+----------------+----------+-------------------------------+
|  Layer 4                 |  4.1-4.4       |  sonnet  |  Output packaging, execution  |
|  output packaging        |                |          |  log assembly, checkpoint     |
|                          |                |          |  creation -- mechanical       |
|                          |                |          |  assembly, not creative       |
|                          |                |          |  reasoning.                   |
+--------------------------+----------------+----------+-------------------------------+
```

### Model Selection Enforcement

```
WHEN SPAWNING A SUBAGENT:

1. LOOK UP the skill number in the table above
2. USE the specified model
3. LOG the model used in the execution log

IF you want to override the table:
  --> You MUST have HUMAN APPROVAL
  --> You MUST document the reason in the execution log
  --> "I thought it would be better" is NOT a valid reason

FORBIDDEN:
  - Defaulting ALL subagents to opus (wastes tokens on assembly tasks)
  - Defaulting ALL subagents to haiku (loses quality on generation)
  - Omitting the model parameter
  - Changing model mid-task without logging the switch
```

---

## STATE MACHINE

```
IDLE --> LOADING --> BASE_COPY --> VARIANTS --> QUALITY_CHECK --> MATRIX_ASSEMBLY --> PACKAGING --> COMPLETE
           |           |            |              |                  |                 |
           v           v            v              v                  v                 v
        [GATE_0]    [GATE_1]    [GATE_2]       [GATE_2.5]         [GATE_3]          [GATE_4]
        PASS/FAIL   PASS/FAIL   PASS/FAIL      PASS/FAIL          PASS/FAIL         PASS/FAIL
           |           |            |              |                  |                 |
           +-----------+------------+--------------+------------------+-----------------+
                                            ^
                                            |
                                    Max 3 expansion rounds
                                    per gate, then
                                    HUMAN ESCALATION
```

**State Transitions (VALID):**
- IDLE --> LOADING (always allowed)
- LOADING --> BASE_COPY (only if GATE_0 = PASS)
- BASE_COPY --> VARIANTS (only if GATE_1 = PASS)
- VARIANTS --> QUALITY_CHECK (only if GATE_2 = PASS)
- QUALITY_CHECK --> MATRIX_ASSEMBLY (only if GATE_2.5 = PASS)
- MATRIX_ASSEMBLY --> PACKAGING (only if GATE_3 = PASS)
- PACKAGING --> COMPLETE (only if GATE_4 = PASS)

**State Transitions (INVALID -- BLOCKED):**
- LOADING --> VARIANTS (cannot skip base copy generation)
- BASE_COPY --> QUALITY_CHECK (cannot skip variant generation)
- VARIANTS --> MATRIX_ASSEMBLY (cannot skip quality check)
- ANY --> PACKAGING without GATE_3 passing
- ANY --> COMPLETE without GATE_4 passing

---

## LAYER ARCHITECTURE

### Pre-Execution: Project Infrastructure

**BEFORE any copy generation begins, the following files MUST exist in the project folder:**

#### 1. Project CLAUDE.md

```markdown
# [Project Name] -- A07 Copy Production CLAUDE.md

## MANDATORY FIRST READS
1. READ: ./ads/A07-copy-production/A07-COPY-PRODUCTION-AGENT.md
2. READ: ./ads/A07-copy-production/A07-COPY-PRODUCTION-ANTI-DEGRADATION.md
3. READ: ./ads/AD-ENGINE.md
4. READ: This file (project CLAUDE.md)
5. READ: PROJECT-STATE.md (current phase, decisions, next steps)

## WORD COUNT LIMITS (BINDING)
| Ad Length | Max Words | HARD LIMIT |
|-----------|----------|------------|
| 6 seconds | 15 | ABSOLUTE |
| 15 seconds | 40 | ABSOLUTE |
| 30 seconds | 75 | ABSOLUTE |
| 60 seconds | 160 | ABSOLUTE |
| 2-3 minutes | 450 | ABSOLUTE |

## VARIANT TARGETS
| Metric | Minimum | Status |
|--------|---------|--------|
| Concepts with base copy | [from A06] | PENDING |
| Hook swaps per body | 5 | PENDING |
| CTA variants per concept | 2 | PENDING |
| Platform adaptations per concept | [from A03] | PENDING |
| Total testable variants | 30 | PENDING |

## GATE ENFORCEMENT
- Gates are BINARY: PASS or FAIL. No other status exists.
- "PARTIAL_PASS", "conditional pass", "close enough to word count" -- NONE of these exist.

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)
- "word count is approximately within limits"
- "these hook variants are similar but each is unique"
- "one CTA variant is sufficient for this concept"
- "the platform adaptation is just a reformatted version"
- "we have enough variants for testing"
- "quality over quantity on variants"
```

#### 2. PROJECT-STATE.md

```markdown
# [Project Name] -- A07 Copy Production State

## Current Phase
- Layer: [0/1/2/2.5/3/4]
- Step: [e.g., 1.1 Base Copy -- Concept 1]
- Status: [IN_PROGRESS / BLOCKED / COMPLETE]

## Concepts from A06 (Arena-Approved)
| Concept ID | Name/Description | Assigned Platforms | Assigned Lengths | Status |
|------------|-----------------|-------------------|-----------------|--------|
| C-001 | [from A06] | [from A03] | [from A03] | PENDING |
| C-002 | [from A06] | [from A03] | [from A03] | PENDING |
| C-003 | [from A06] | [from A03] | [from A03] | PENDING |

## Variant Counts (updated after Layer 2)
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Base copies written | 0 | [# concepts x # lengths] | PENDING |
| Hook swaps generated | 0 | [# concepts x 5 minimum] | PENDING |
| CTA variants generated | 0 | [# concepts x 2 minimum] | PENDING |
| Platform adaptations | 0 | [# concepts x # platforms] | PENDING |
| Total variants | 0 | 30 minimum | PENDING |

## Word Count Compliance (updated after Layer 2.5)
| Metric | Status |
|--------|--------|
| Base copies -- all within limits | PENDING |
| Hook swaps -- all within limits | PENDING |
| CTA variants -- all within limits | PENDING |
| Platform adaptations -- all within limits | PENDING |

## Gate Status
- GATE_0: [PASS/PENDING]
- GATE_1: [PASS/FAIL/PENDING]
- GATE_2: [PASS/FAIL/PENDING]
- GATE_2.5: [PASS/FAIL/PENDING]
- GATE_3: [PASS/FAIL/PENDING]
- GATE_4: [PASS/FAIL/PENDING]

## Key Decisions
- [None yet]

## Next Action
- [Initialize project]
```

#### 3. PROGRESS-LOG.md

```markdown
# [Project Name] -- A07 Progress Log
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
| Layer 1 | opus | Base copy generation — creative writing from Arena-selected concepts |
| Layer 2 | opus | Variant generation — creative adaptation across hooks, platforms, lengths |
| Layer 2.5 | opus | Copy quality check — analytical evaluation against 7 criteria |
| Layer 3 | sonnet | Variant matrix assembly — organizational packaging, not generation |
| Layer 4 | sonnet | Output packaging — mechanical assembly of production files |

---

### Layer 0: Foundation & Loading

**Purpose:** Load all required inputs from upstream skills, load reference materials, load persona voice specimens for copy generation, validate readiness for copy production.

| Microskill | File | Function | Model |
|------------|------|----------|-------|
| 0.0.1 | `0.0.1-vertical-profile-loader.md` | Load ad-specific vertical config from `ad-verticals/`. Extract platform priorities, hook patterns, compliance constraints, anti-slop rules, vertical-specific banned patterns. | haiku |
| 0.1 | `0.1-campaign-brief-loader.md` | Load Campaign Brief (Skill 09). Extract: product name, target audience, awareness level, price point, offer details, brand voice guidelines, competitive positioning. | haiku |
| 0.2 | `0.2-arena-results-loader.md` | Load A06 AD-ARENA-RESULTS.md. Extract: winning concept IDs, concept descriptions, Arena scores per criterion, human selection notes, any human edits to selected concepts. This is the PRIMARY input -- copy is written for THESE concepts ONLY. | haiku |
| 0.3 | `0.3-script-architecture-loader.md` | Load A04 SCRIPT-PACKAGE.md. Extract: script frameworks per concept, module definitions ([HOOK]+[SETUP]+[MECHANISM]+[PROOF]+[CTA]), swap points, target ad lengths per concept, AV format templates. These are the BLUEPRINTS that A07 fills with words. | haiku |
| 0.4 | `0.4-visual-direction-loader.md` | Load A05 VISUAL-DIRECTION-PACKAGE.md. Extract: visual treatment type per concept (Talking Head, B-Roll+VO, Text-on-Screen, Screen Recording, Mixed), shot list summaries, text overlay requirements, visual cues that copy must reference or complement. | haiku |
| 0.5 | `0.5-format-strategy-loader.md` | Load A03 FORMAT-STRATEGY.md. Extract: platform assignments per concept, target ad lengths per platform, platform-specific constraints (sound-on/off, vertical/horizontal, character limits, CTA button options). | haiku |
| 0.6 | `0.6-hook-matrix-loader.md` | Load A02 HOOK-ANGLE-MATRIX.md. Extract: human-selected hooks (the 8-10 winning hooks), hook type classifications, angle attributions. These inform hook swap generation in Layer 2 -- swaps should span different hook types, not just rewrite the same type. | haiku |
| 0.7 | `0.7-persona-voice-loader.md` | Load winning ad specimens for voice calibration. Source: A01 winning ad specimens (Section 6 of AD-INTELLIGENCE-HANDOFF.md) + ad-persona-specimens/ for relevant verticals. Hold 3-5 verbatim winning ad scripts in active context as voice calibration specimens during Layers 1-2. These are the statistical attractors that prevent generic copy. Also load Soul.md if it exists for project-level voice constraints. | haiku |

**Execution Order:**
1. 0.0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6 run in parallel (independent loading)
2. 0.7 runs after 0.0.1 and 0.1 complete (needs vertical profile and campaign brief for specimen selection)

**Input Validation Requirements (ALL MUST EXIST):**

| Input | Source | Required? | If Missing |
|-------|--------|-----------|------------|
| AD-ARENA-RESULTS.md | A06 | REQUIRED | HALT -- cannot write copy without approved concepts |
| SCRIPT-PACKAGE.md | A04 | REQUIRED | HALT -- cannot fill blueprints that don't exist |
| VISUAL-DIRECTION-PACKAGE.md | A05 | REQUIRED | HALT -- cannot write AV format without visual column |
| FORMAT-STRATEGY.md | A03 | REQUIRED | HALT -- cannot do platform adaptations without platform assignments |
| HOOK-ANGLE-MATRIX.md | A02 | REQUIRED | HALT -- hook swaps require the hook taxonomy context |
| Campaign Brief | Skill 09 | REQUIRED | HALT -- foundational context |
| Vertical Profile | ad-verticals/ | REQUIRED | HALT -- compliance constraints needed |
| Soul.md | Project-level | RECOMMENDED | WARN -- generate without taste constraints |
| Persona voice specimens | A01 + ad-persona-specimens/ | RECOMMENDED | WARN -- generate without voice calibration |

**Gate 0 -- Layer 0 Complete:**

```yaml
# LAYER_0_COMPLETE.yaml
gate: GATE_0
skill: "A07-copy-production"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"

inputs_loaded:
  arena_results: true
  arena_concepts_count: "[integer >= 2]"
  script_package: true
  visual_direction_package: true
  format_strategy: true
  hook_angle_matrix: true
  campaign_brief: true
  vertical_profile: true
  soul_md: "[true/false]"
  persona_specimens_loaded: "[integer -- count of specimens held in context]"

concepts_to_produce:
  - concept_id: "[C-001]"
    name: "[from A06]"
    framework: "[from A04]"
    target_lengths: "[list from A03]"
    target_platforms: "[list from A03]"
    visual_treatment: "[from A05]"
  - concept_id: "[C-002]"
    name: "[from A06]"
    framework: "[from A04]"
    target_lengths: "[list from A03]"
    target_platforms: "[list from A03]"
    visual_treatment: "[from A05]"
  - concept_id: "[C-003]"
    name: "[from A06]"
    framework: "[from A04]"
    target_lengths: "[list from A03]"
    target_platforms: "[list from A03]"
    visual_treatment: "[from A05]"

word_count_limits:
  6s: 15
  15s: 40
  30s: 75
  60s: 160
  2_3min: 450

all_required_inputs: true

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
    file: "layer-0-outputs/0.2-arena-results-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.3"
    file: "layer-0-outputs/0.3-script-architecture-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.4"
    file: "layer-0-outputs/0.4-visual-direction-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.5"
    file: "layer-0-outputs/0.5-format-strategy-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.6"
    file: "layer-0-outputs/0.6-hook-matrix-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.7"
    file: "layer-0-outputs/0.7-persona-voice-loader.md"
    size_bytes: "[integer]"
    minimum_met: true

IF arena_concepts_count < 2: GATE CLOSED -- A06 must produce at least 2 approved concepts
IF script_package missing: GATE CLOSED -- execute A04 first
IF format_strategy missing: GATE CLOSED -- execute A03 first
IF visual_direction missing: GATE CLOSED -- execute A05 first
```

### Schema Validation Reference

Input validators MUST verify field presence — not just file existence — for all consumed handoff files. See `ads/ad-engine-schema-registry.md` for required fields per handoff file.

---

### Layer 1: Base Copy Generation

**Purpose:** Write the COMPLETE base copy for each Arena-approved concept, filling every module of the A04 script architecture with actual words. This is the primary generative layer -- the foundation that all variants build from.

**For each approved concept, write ONE complete base script that:**
1. Fills every module defined in A04: [HOOK] + [SETUP] + [MECHANISM] + [PROOF] + [CTA]
2. Is written in AV format (VISUAL | AUDIO) for video scripts
3. Meets the word count limit for the target ad length
4. Matches the visual treatment from A05 (visual column complements the visual direction)
5. Uses the framework assigned by A04 (PAS, AIDA, BAB, Hook-Body-CTA, etc.)
6. Reflects persona voice calibration from loaded specimens

| Microskill | File | Function | Model |
|------------|------|----------|-------|
| 1.1 | `1.1-concept-brief-extraction.md` | For each Arena-approved concept, extract: the concept's strategic angle, the A06 Arena score breakdown, the assigned framework from A04, the target ad lengths, the platform assignments, the visual treatment type. Create a per-concept mini-brief that the copy generation subagent receives as context. | opus |
| 1.2 | `1.2-base-copy-concept-1.md` | Write complete base copy for Concept 1. Fill every module. AV format. Word count within limits. Visual column specific (not vague). Match framework from A04. Use persona voice specimens as calibration. Output: the complete base script with all modules populated. | opus |
| 1.3 | `1.3-base-copy-concept-2.md` | Write complete base copy for Concept 2. Same protocol as 1.2. | opus |
| 1.4 | `1.4-base-copy-concept-3.md` | Write complete base copy for Concept 3. Same protocol as 1.2. If more than 3 concepts approved, create additional microskill files (1.5, 1.6, etc.) | opus |
| 1.5 | `1.5-base-copy-validator.md` | Validate all base copies: (a) Every module filled -- no empty or placeholder modules. (b) Word count within hard limits for target ad length. (c) AV format correct -- visual column has specific shot descriptions, not "Show product." (d) Framework compliance -- does the copy follow the assigned framework structure? (e) Voice consistency -- does the copy match the loaded specimens in tone and register? | opus |

#### 1.2 Base Copy Generation Protocol (Per Concept)

**This protocol applies to microskills 1.2, 1.3, 1.4, and any additional concept microskills.**

**Input:** Concept mini-brief (from 1.1), script architecture (from A04), visual direction (from A05), persona voice specimens (from 0.7), word count limits, Soul.md constraints

**Process:**

```
STEP 1: READ the A04 script architecture for this concept.
  - Identify every module: [HOOK], [SETUP], [MECHANISM], [PROOF], [CTA]
  - Identify the framework (PAS, AIDA, BAB, etc.)
  - Note word count budget per module (approximate from total limit)

STEP 2: READ the A05 visual direction for this concept.
  - Identify the visual treatment type
  - Note specific visual cues the copy must reference or complement
  - Understand what the visual is SHOWING so the copy doesn't repeat it

STEP 3: PLAN the word budget per module.
  For a 60-second script (160 words max):
    [HOOK]: 10-15 words (0-5 seconds)
    [SETUP]: 30-40 words (5-20 seconds)
    [MECHANISM]: 40-50 words (20-40 seconds)
    [PROOF]: 20-30 words (40-50 seconds)
    [CTA]: 15-20 words (50-60 seconds)
    TOTAL: 115-155 words (within 160 limit)

STEP 4: WRITE each module as the assigned framework dictates.
  - Use persona voice specimens as statistical attractors
  - Respect Soul.md voice constraints
  - Write the AUDIO column with dialogue/voiceover
  - Write the VISUAL column with specific shot descriptions:
    - Shot type (CU/MS/WS)
    - Subject (what's in frame)
    - Action (what's happening)
    - Duration (seconds)
    - Text overlay content (if any)
    - Transition (cut/dissolve/swipe)

STEP 5: VERIFY word count.
  - Count words in AUDIO column only (visual column doesn't contribute to spoken time)
  - IF over limit: compress. Do NOT accept over-limit scripts.
  - IF under limit by more than 20%: expand. Use the budget.

STEP 6: VERIFY visual column specificity.
  - Every row in the visual column MUST specify shot type, subject, and action
  - "Show product" is a PROTOCOL VIOLATION
  - "B-roll of nature" is a PROTOCOL VIOLATION
  - "CU of woman's face, expressing relief, looking at camera" is ACCEPTABLE
```

**Output Format (AV Script):**

```markdown
# Concept [C-XXX]: [Name]
## Framework: [PAS/AIDA/BAB/etc.] | Length: [Xs] | Platform: [Primary]

| VISUAL | AUDIO |
|--------|-------|
| [MODULE: HOOK] | [MODULE: HOOK] |
| CU -- Subject holding product, looking directly at camera. Text overlay: "[hook text]" | "[spoken hook text -- 10 words max for 6s]" |
| [MODULE: SETUP] | [MODULE: SETUP] |
| MS -- Subject in [relevant context]. Quick cut to [problem visual]. | "[setup copy -- words addressing the problem]" |
| [MODULE: MECHANISM] | [MODULE: MECHANISM] |
| CU -- Animated diagram showing [mechanism visual]. Text overlay: "[key term]" | "[mechanism explanation -- simple, concrete language]" |
| [MODULE: PROOF] | [MODULE: PROOF] |
| Split screen -- Before/after. Text overlay: "[specific result]" | "[proof copy -- specific claims with attribution]" |
| [MODULE: CTA] | [MODULE: CTA] |
| Product shot with URL overlay. CTA button: "[button text]" | "[call to action -- clear, specific, one instruction]" |

**Word Count:** [X] words (Limit: [Y] words) -- [PASS/FAIL]
**Module Completion:** [5/5 modules filled]
**Visual Specificity:** [All rows specify shot type, subject, action]
```

**Execution Order:**
1. 1.1 first (creates per-concept mini-briefs)
2. 1.2, 1.3, 1.4 run in parallel (independent concept generation)
3. 1.5 runs after all base copies complete (validates all)

**Gate 1 -- Base Copy Complete:**

```yaml
# LAYER_1_COMPLETE.yaml
gate: GATE_1
skill: "A07-copy-production"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"

checks:
  concepts_with_base_copy: "[integer -- must equal concepts_to_produce count]"
  all_modules_filled: true
  all_word_counts_within_limits: true
  all_av_format_correct: true
  all_visual_columns_specific: true
  all_frameworks_followed: true
  voice_consistency_check: "[PASS/FAIL]"
  validator_ran: true
  validator_verdict: PASS

per_concept_validation:
  - concept_id: "[C-001]"
    modules_filled: "[5/5]"
    word_count: "[X]"
    word_limit: "[Y]"
    word_count_status: PASS
    visual_specificity: PASS
    framework_compliance: PASS
  - concept_id: "[C-002]"
    modules_filled: "[5/5]"
    word_count: "[X]"
    word_limit: "[Y]"
    word_count_status: PASS
    visual_specificity: PASS
    framework_compliance: PASS
  - concept_id: "[C-003]"
    modules_filled: "[5/5]"
    word_count: "[X]"
    word_limit: "[Y]"
    word_count_status: PASS
    visual_specificity: PASS
    framework_compliance: PASS

microskill_outputs:
  - id: "1.1"
    file: "layer-1-outputs/1.1-concept-brief-extraction.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.2"
    file: "layer-1-outputs/1.2-base-copy-concept-1.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      word_count: "[integer]"
      word_limit: "[integer]"
      modules_filled: "[X/X]"
  - id: "1.3"
    file: "layer-1-outputs/1.3-base-copy-concept-2.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      word_count: "[integer]"
      word_limit: "[integer]"
      modules_filled: "[X/X]"
  - id: "1.4"
    file: "layer-1-outputs/1.4-base-copy-concept-3.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      word_count: "[integer]"
      word_limit: "[integer]"
      modules_filled: "[X/X]"
  - id: "1.5"
    file: "layer-1-outputs/1.5-base-copy-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF concepts_with_base_copy < concepts_to_produce: GATE CLOSED -- write missing base copies
IF all_word_counts_within_limits = false: GATE CLOSED -- compress over-length scripts
IF all_visual_columns_specific = false: GATE CLOSED -- add visual specificity
IF all_modules_filled = false: GATE CLOSED -- fill empty modules
```

---

### Layer 2: Variant Generation

**Purpose:** Multiply each base copy into testable variants. Generate hook swaps, CTA variants, and platform adaptations. This is where A07 delivers its core operational value -- the combinatorial explosion from a small number of approved concepts into a large variant matrix.

| Microskill | File | Function | Model |
|------------|------|----------|-------|
| 2.1 | `2.1-hook-swap-generation.md` | For each base copy, generate 5-10 alternate hooks. Each hook must: (a) be a different hook TYPE from AD-HOOK-TAXONOMY.md (not rewrites of the same type), (b) lead coherently into the existing body, (c) meet the word count budget for the hook module (typically 10-15 words for a 60s ad), (d) be classified by taxonomy type, (e) maintain platform-native tone. Use A02 HOOK-ANGLE-MATRIX.md for type diversity -- ensure hook swaps span at least 4 different hook categories (A-J). | opus |
| 2.2 | `2.2-cta-variant-generation.md` | For each concept, generate 2-3 CTA variants. Each CTA must use a DIFFERENT psychological lever. See CTA Lever Taxonomy below. Each CTA must: (a) be classified by lever type, (b) match the platform's CTA conventions (TikTok "Link in bio" vs Meta "Shop Now" button), (c) meet the word count budget for the CTA module, (d) flow naturally from the body/proof module. | opus |
| 2.3 | `2.3-platform-adaptation.md` | For each concept, rewrite for every assigned platform from A03. Platform adaptations are NOT reformats -- they are substantive rewrites. Each adaptation must demonstrate at least 3 substantive differences from the base: (a) different hook approach suited to platform, (b) different tone register (TikTok = casual/UGC, YouTube = polished/authoritative, Meta = visual-first/sound-off capable), (c) different CTA format (platform-native CTA language). Adaptations must also adjust word count for platform-specific lengths (e.g., 60s YouTube base adapted to 15s TikTok). | opus |
| 2.4 | `2.4-variant-inventory.md` | Count and catalog all variants. Produce a variant inventory table showing: concept ID, variant type (hook_swap / cta_variant / platform_adaptation), variant ID, hook type (if hook swap), CTA lever (if CTA variant), platform (if adaptation), target length, word count. Verify minimum variant counts met per concept (5 hooks, 2 CTAs, all platform adaptations). | opus |

#### 2.1 Hook Swap Generation Protocol

**For each base copy (from Layer 1):**

```
STEP 1: IDENTIFY the base hook type (from Layer 1 output).
  - What hook type is the base copy using?
  - What hook category (A-J)?
  - What is the body expecting from the hook? (What does the setup module assume?)

STEP 2: IDENTIFY 5-10 target hook types for swaps.
  - MUST span at least 4 hook categories (A-J)
  - Prioritize types that: (a) performed well in A01 intelligence, (b) are underused by competitors (opportunity gaps), (c) match the platform conventions
  - AVOID: all 5 hooks being variations of the same type

STEP 3: For EACH target hook type, WRITE the hook.
  - Read the AD-HOOK-TAXONOMY.md entry for this type
  - Write the hook using the patterns specific to this type
  - Verify hook-body coherence: does this hook logically lead into the existing body?
  - Verify word count: hook module must fit within its word budget
  - Write the matching VISUAL column entry for the hook

STEP 4: CLASSIFY each hook swap.
  - Taxonomy type (e.g., A3 -- Surprising Fact)
  - Taxonomy category (e.g., A -- Curiosity & Information Gap)
  - Coherence assessment: HIGH / MEDIUM / LOW with the existing body
  - Word count
```

**Hook Swap Output Format:**

```markdown
# Hook Swaps -- Concept [C-XXX]

## Base Hook (from Layer 1)
- Type: [taxonomy type]
- Category: [taxonomy category]
- Text: "[verbatim base hook]"

## Hook Swap 1
- Type: [taxonomy type -- MUST be different from base]
- Category: [taxonomy category]
- Body Coherence: [HIGH/MEDIUM/LOW] -- [1-sentence rationale]
| VISUAL | AUDIO |
|--------|-------|
| [specific visual for this hook] | "[hook text]" |
**Word Count:** [X] words (budget: [Y])

## Hook Swap 2
[... continue for all 5-10 swaps ...]

## Hook Diversity Check
- Categories represented: [list -- must be 4+]
- Types represented: [list -- must be 5+]
- All coherence ratings MEDIUM or above: [Y/N]
- All within word budget: [Y/N]
```

#### CTA Lever Taxonomy (For Microskill 2.2)

Every CTA variant MUST be classified using this taxonomy. CTA variants within the same concept MUST use DIFFERENT levers.

| Lever | Psychology | Example | When to Use |
|-------|-----------|---------|-------------|
| **Urgency** | Fear of missing out, time pressure | "Order now -- sale ends Friday" | When genuine time limit exists |
| **Risk Reversal** | Remove purchase anxiety | "Try it for 60 days. Full refund if you're not thrilled." | When price is a barrier |
| **Low-Friction** | Reduce commitment threshold | "Take the free quiz" / "Get your free sample" | When awareness is low or product is complex |
| **Social Proof** | Bandwagon, safety in numbers | "Join 50,000 customers" / "See what everyone's talking about" | When social validation drives the vertical |
| **Curiosity Continuation** | Open loop, next-step curiosity | "See what your results could look like" / "Find out your score" | When the ad is educational/value-first |
| **Direct Command** | Simple instruction, no friction | "Tap the link below" / "Click Shop Now" | When intent is already high (retargeting) |
| **Value Restatement** | Remind of value before asking | "Get all 3 bonuses plus free shipping -- tap below" | When offer is strong and multi-component |

**CTA Variant Rules:**
1. Each CTA variant must use a DIFFERENT lever from the taxonomy
2. "Click now" vs "Tap now" vs "Order now" are NOT different variants -- they all use the same lever (Direct Command)
3. Each CTA must match platform-native CTA conventions
4. Each CTA must be within the word count budget for the CTA module

#### 2.3 Platform Adaptation Protocol

**For each concept, for each assigned platform from A03:**

```
REQUIRED SUBSTANTIVE DIFFERENCES (Minimum 3):

1. HOOK APPROACH:
   - TikTok: Pattern interrupt in frame 1. Raw, immediate. "POV:" or direct address.
   - YouTube: Must deliver value before 5s skip. More structured.
   - Meta: Sound-off capable. Text overlay carries the hook. Visual-first.
   - Google: Search intent aligned. Keyword-conscious.

2. TONE REGISTER:
   - TikTok: Conversational, peer-to-peer, UGC-native. Imperfect is better.
   - YouTube: More polished, authoritative. Longer attention span assumed.
   - Meta: Visual-forward. Copy is concise. Caption + text overlay economy.
   - Google: Professional, benefit-led. Shorter format.

3. CTA FORMAT:
   - TikTok: "Link in bio" / "Comment [keyword]" / swipe-up gestures
   - YouTube: "Click the link below" / "Subscribe for more" / end screen
   - Meta: CTA button ("Shop Now", "Learn More", "Get Offer") + text
   - Google: Headline CTA, description CTA, sitelink CTAs

4. LENGTH ADJUSTMENT:
   - If base is 60s and TikTok target is 15s: This is a REWRITE, not a cut.
     Compress to the single most powerful element (hook + one benefit + CTA).
   - If base is 30s and YouTube target is 2min: EXPAND with additional proof,
     deeper mechanism, more story context.

5. SOUND-ON vs SOUND-OFF:
   - Meta: 85% sound-off. Text overlays must carry full message.
   - TikTok: Sound-on dominant. Music/voice is primary carrier.
   - YouTube: Sound-on assumed. Voiceover can carry.
```

**Execution Order:**
1. 2.1, 2.2, 2.3 run in parallel (independent variant dimensions)
2. 2.4 runs after all above complete (inventory and validation)

**Gate 2 -- Variant Generation Complete:**

```yaml
# LAYER_2_COMPLETE.yaml
gate: GATE_2
skill: "A07-copy-production"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"

checks:
  hook_swaps_per_concept: "[list -- each must be >= 5]"
  hook_categories_represented: "[list -- each concept must have 4+ categories]"
  cta_variants_per_concept: "[list -- each must be >= 2]"
  cta_levers_different: true
  platform_adaptations_per_concept: "[list -- must match A03 assignments]"
  total_variants: "[integer >= 30]"
  all_variants_inventoried: true
  variant_inventory_file_exists: true

per_concept_variants:
  - concept_id: "[C-001]"
    hook_swaps: "[integer >= 5]"
    cta_variants: "[integer >= 2]"
    platform_adaptations: "[integer]"
    total_concept_variants: "[integer]"
  - concept_id: "[C-002]"
    hook_swaps: "[integer >= 5]"
    cta_variants: "[integer >= 2]"
    platform_adaptations: "[integer]"
    total_concept_variants: "[integer]"
  - concept_id: "[C-003]"
    hook_swaps: "[integer >= 5]"
    cta_variants: "[integer >= 2]"
    platform_adaptations: "[integer]"
    total_concept_variants: "[integer]"

microskill_outputs:
  - id: "2.1"
    file: "layer-2-outputs/2.1-hook-swap-generation.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      total_hook_swaps: "[integer]"
      hook_categories_used: "[integer]"
  - id: "2.2"
    file: "layer-2-outputs/2.2-cta-variant-generation.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      total_cta_variants: "[integer]"
      levers_used: "[list]"
  - id: "2.3"
    file: "layer-2-outputs/2.3-platform-adaptation.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      total_adaptations: "[integer]"
      platforms_covered: "[list]"
  - id: "2.4"
    file: "layer-2-outputs/2.4-variant-inventory.md"
    size_bytes: "[integer]"
    minimum_met: true

IF any concept has < 5 hook swaps: GATE CLOSED -- generate more hooks
IF any concept has < 2 CTA variants: GATE CLOSED -- generate more CTAs
IF CTA levers are not different: GATE CLOSED -- replace duplicate-lever CTAs
IF total_variants < 30: GATE CLOSED -- expand variants
IF platform adaptations don't match A03 assignments: GATE CLOSED -- add missing platforms
```

---

### Layer 2.5: Copy Quality Check

**Purpose:** Validate every variant against quality criteria BEFORE organizing into the variant matrix. This is the quality gate between raw generation and structured delivery. No variant passes into the matrix without passing all checks.

| Microskill | File | Function | Model |
|------------|------|----------|-------|
| 2.5.1 | `2.5.1-word-count-verification.md` | Count words in the AUDIO column of every single variant (base copies, hook swaps, CTA variants, platform adaptations). Produce a WORD COUNT COMPLIANCE TABLE. Any variant exceeding the hard limit for its target length is flagged FAIL and returned to Layer 2 for compression. No "close enough." | opus |
| 2.5.2 | `2.5.2-hook-body-coherence-check.md` | For every hook-body combination: verify logical coherence. Does the hook promise something the body delivers? Does the setup module flow naturally from the hook? Score each pairing: HIGH (seamless), MEDIUM (acceptable), LOW (disconnect). LOW-rated pairings are flagged for revision or exclusion. Produce HOOK-BODY COHERENCE MATRIX. | opus |
| 2.5.3 | `2.5.3-compliance-scan.md` | Scan every variant for compliance violations based on vertical profile constraints. Health: no disease claims, no unapproved medical claims, "results may vary" present where needed, before/after restrictions (Meta). Finance: regulatory language present, no guaranteed returns, risk disclosures. Golf: distance claims cite conditions. Check each variant against platform-specific ad policies. Produce COMPLIANCE AUDIT table. | opus |
| 2.5.4 | `2.5.4-tone-consistency-check.md` | Verify all variants for a given concept maintain consistent tone and voice. Hook swaps should feel like they belong to the same campaign even though they use different entry points. CTA variants should maintain brand voice. Platform adaptations should adapt tone appropriately (not randomly). Check against Soul.md voice constraints if loaded. Produce TONE CONSISTENCY AUDIT. | opus |

#### 2.5.1 Word Count Compliance Table

**MANDATORY FORMAT -- produced for every variant:**

```
+-------------------------------------------------------------------+
|  WORD COUNT COMPLIANCE TABLE                                       |
|  A07 Copy Production -- [Project Name] -- [Timestamp]             |
|                                                                    |
|  +-------+--------+----------+-------+-------+--------+--------+ |
|  | VAR ID | CONCEPT | TYPE     | PLAT  | LIMIT | ACTUAL | STATUS | |
|  +-------+--------+----------+-------+-------+--------+--------+ |
|  | V-001  | C-001  | base     | Meta  | 160   | 152    | PASS   | |
|  | V-002  | C-001  | hook_1   | Meta  | 160   | 158    | PASS   | |
|  | V-003  | C-001  | hook_2   | Meta  | 160   | 167    | FAIL   | |
|  | V-004  | C-001  | cta_1    | Meta  | 160   | 155    | PASS   | |
|  | V-005  | C-001  | plat_tk  | TikTok| 40    | 38     | PASS   | |
|  +-------+--------+----------+-------+-------+--------+--------+ |
|                                                                    |
|  OVERALL: [X] PASS / [Y] FAIL out of [Z] variants               |
|                                                                    |
|  IF ANY FAIL: Return to Layer 2 for compression before proceeding |
+-------------------------------------------------------------------+
```

#### 2.5.2 Hook-Body Coherence Matrix

**For every hook-body combination in the variant set:**

```markdown
## Hook-Body Coherence Matrix -- Concept [C-XXX]

| Hook Variant | Body Version | Hook Promise | Body Delivers | Rating | Issue (if any) |
|-------------|-------------|-------------|---------------|--------|----------------|
| Base hook | Base body | "[summary of hook promise]" | "[summary of body content]" | HIGH | -- |
| Hook Swap 1 | Base body | "[summary]" | "[summary]" | HIGH | -- |
| Hook Swap 2 | Base body | "[summary]" | "[summary]" | LOW | Hook promises "3 foods" but body discusses energy |
| Hook Swap 3 | Base body | "[summary]" | "[summary]" | MEDIUM | Slight mismatch on timeframe claim |

## Coherence Summary
- HIGH: [X] combinations
- MEDIUM: [X] combinations
- LOW: [X] combinations (MUST be revised or excluded)
```

**LOW-rated combinations MUST be either:**
1. Revised (hook rewritten to match body, or body extended to deliver on hook promise)
2. Excluded from the variant matrix with documented reason

**MEDIUM-rated combinations are ACCEPTABLE but flagged for human review.**

**Execution Order:**
1. 2.5.1, 2.5.2, 2.5.3, 2.5.4 run in parallel (independent quality dimensions)

**Gate 2.5 -- Copy Quality Check Complete:**

```yaml
# LAYER_2_5_COMPLETE.yaml
gate: GATE_2_5
skill: "A07-copy-production"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"

checks:
  word_count_compliance:
    total_variants_checked: "[integer]"
    pass: "[integer]"
    fail: "[integer]"
    all_pass: "[true if fail = 0]"
  hook_body_coherence:
    total_combinations_checked: "[integer]"
    high: "[integer]"
    medium: "[integer]"
    low: "[integer]"
    low_resolved: "[true if all LOW-rated were revised or excluded]"
  compliance_audit:
    violations_found: "[integer]"
    violations_resolved: "[integer]"
    all_resolved: "[true if violations_found = violations_resolved]"
  tone_consistency:
    per_concept_consistency: "[PASS for each concept]"
    soul_md_alignment: "[PASS/N/A]"

microskill_outputs:
  - id: "2.5.1"
    file: "layer-2.5-outputs/2.5.1-word-count-verification.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.5.2"
    file: "layer-2.5-outputs/2.5.2-hook-body-coherence-check.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.5.3"
    file: "layer-2.5-outputs/2.5.3-compliance-scan.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.5.4"
    file: "layer-2.5-outputs/2.5.4-tone-consistency-check.md"
    size_bytes: "[integer]"
    minimum_met: true

IF word_count_compliance.all_pass = false: GATE CLOSED -- return FAIL variants to Layer 2 for compression
IF hook_body_coherence.low > 0 AND low_resolved = false: GATE CLOSED -- revise or exclude LOW pairings
IF compliance_audit.all_resolved = false: GATE CLOSED -- resolve compliance violations
IF any concept fails tone_consistency: GATE CLOSED -- revise for consistency
```

---

### Layer 3: Variant Matrix Assembly

**Purpose:** Organize all quality-checked variants into a structured, labeled matrix. Assign unique variant IDs. Create the organizational framework that A09 will use for full asset assembly. This is an ORGANIZATIONAL layer, not a generative layer.

| Microskill | File | Function | Model |
|------------|------|----------|-------|
| 3.1 | `3.1-variant-id-assignment.md` | Assign unique, structured IDs to every variant following the naming convention: `[ConceptID]-[Platform]-[Length]-[VariantType]-[Number]`. Example: `C001-META-60s-HOOK03` or `C002-TIKTOK-15s-CTA02`. Produce the MASTER VARIANT ID TABLE. | sonnet |
| 3.2 | `3.2-per-variant-file-creation.md` | Create individual copy files for every variant in the AD-COPY-FINAL/ directory, organized by platform. Each file contains: the variant ID, full AV script, word count, hook type classification (if hook swap), CTA lever (if CTA variant), platform, target length, quality check results, and a reference to the base concept. | sonnet |
| 3.3 | `3.3-variant-matrix-summary.md` | Create the VARIANT MATRIX SUMMARY -- a single document that maps every variant with cross-references. Includes: (a) matrix visualization (concept x hook x CTA grid), (b) recommended test priority (which variants to test first based on hook diversity and competitive gap exploitation), (c) platform distribution (how many variants per platform), (d) testing recommendations (suggested A/B test pairings). | sonnet |

#### Variant ID Naming Convention

```
STRUCTURE: [ConceptID]-[Platform]-[Length]-[VariantType]-[Number]

COMPONENTS:
  ConceptID: C001, C002, C003, etc.
  Platform: META, TIKTOK, YOUTUBE, GOOGLE, LINKEDIN, PINTEREST
  Length: 6s, 15s, 30s, 60s, 2min, 3min
  VariantType: BASE, HOOK01-HOOK10, CTA01-CTA03, PLAT (platform adaptation)
  Number: Sequential if needed for disambiguation

EXAMPLES:
  C001-META-60s-BASE         -- Concept 1, Meta, 60 seconds, base version
  C001-META-60s-HOOK03       -- Concept 1, Meta, 60 seconds, hook swap #3
  C001-META-60s-CTA02        -- Concept 1, Meta, 60 seconds, CTA variant #2
  C001-TIKTOK-15s-PLAT       -- Concept 1, TikTok, 15 seconds, platform adaptation
  C002-YOUTUBE-2min-HOOK07   -- Concept 2, YouTube, 2 minutes, hook swap #7
```

#### AD-COPY-FINAL/ Directory Structure

```
AD-COPY-FINAL/
  META/
    C001-META-60s-BASE.md
    C001-META-60s-HOOK01.md
    C001-META-60s-HOOK02.md
    C001-META-60s-HOOK03.md
    C001-META-60s-HOOK04.md
    C001-META-60s-HOOK05.md
    C001-META-60s-CTA01.md
    C001-META-60s-CTA02.md
    C001-META-60s-CTA03.md
    C002-META-60s-BASE.md
    C002-META-60s-HOOK01.md
    ...
  TIKTOK/
    C001-TIKTOK-15s-PLAT.md
    C001-TIKTOK-15s-HOOK01.md
    ...
  YOUTUBE/
    C001-YOUTUBE-2min-PLAT.md
    ...
```

#### Per-Variant File Format

```markdown
# [Variant ID]
## Metadata
- Concept: [C-XXX] -- [concept name]
- Platform: [platform]
- Target Length: [Xs]
- Variant Type: [base / hook_swap / cta_variant / platform_adaptation]
- Hook Type: [taxonomy classification -- if hook swap]
- CTA Lever: [lever type -- if CTA variant]
- Base Concept Reference: [C-XXX-PLATFORM-LENGTH-BASE]

## Quality Check Results
- Word Count: [X] / [limit] -- PASS
- Hook-Body Coherence: [HIGH/MEDIUM]
- Compliance: PASS
- Tone Consistency: PASS

## Script (AV Format)

| VISUAL | AUDIO |
|--------|-------|
| [detailed visual for each beat] | [spoken copy for each beat] |
| ... | ... |

## Copy Text (Audio Only -- for text extraction)
[Full audio column text for easy copy-paste into ad platforms]

## Notes for A08 (Visual Production)
- Visual treatment: [from A05]
- Key visual moments: [list]
- Text overlay content: [list all text overlays]
```

**Execution Order:**
1. 3.1 first (variant IDs required for file creation)
2. 3.2 after 3.1 (creates the individual files)
3. 3.3 after 3.2 (summarizes the complete matrix)

**Gate 3 -- Variant Matrix Assembly Complete:**

```yaml
# LAYER_3_COMPLETE.yaml
gate: GATE_3
skill: "A07-copy-production"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"

checks:
  total_variant_files_created: "[integer >= 30]"
  all_variant_ids_unique: true
  all_variant_files_exist: true
  directory_structure_correct: true
  per_variant_files_have_metadata: true
  per_variant_files_have_quality_results: true
  variant_matrix_summary_exists: true
  test_priority_recommendations_included: true

matrix_summary:
  total_variants: "[integer]"
  by_concept:
    C-001: "[integer]"
    C-002: "[integer]"
    C-003: "[integer]"
  by_platform:
    META: "[integer]"
    TIKTOK: "[integer]"
    YOUTUBE: "[integer]"
    OTHER: "[integer]"
  by_type:
    base: "[integer]"
    hook_swap: "[integer]"
    cta_variant: "[integer]"
    platform_adaptation: "[integer]"

microskill_outputs:
  - id: "3.1"
    file: "layer-3-outputs/3.1-variant-id-assignment.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.2"
    file: "layer-3-outputs/3.2-per-variant-file-creation.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      files_created: "[integer]"
  - id: "3.3"
    file: "layer-3-outputs/3.3-variant-matrix-summary.md"
    size_bytes: "[integer]"
    minimum_met: true

IF total_variant_files_created < 30: GATE CLOSED -- return to Layer 2 for expansion
IF any variant file missing metadata: GATE CLOSED -- add metadata
IF variant_matrix_summary missing: GATE CLOSED -- create summary
```

---

### Layer 4: Output Packaging

**Purpose:** Produce the final deliverables: COPY-PRODUCTION-PACKAGE.md (umbrella summary), execution log, and all checkpoint files. Verify all outputs exist with correct sizes and content.

| Microskill | File | Function | Model |
|------------|------|----------|-------|
| 4.1 | `4.1-copy-production-package.md` | Assemble COPY-PRODUCTION-PACKAGE.md -- the umbrella summary document. Includes: project metadata, concept summaries, variant matrix visualization, per-concept variant counts, word count compliance summary, quality check summary, platform distribution, testing recommendations for A10, handoff notes for A08 and A09. This is the human-readable summary of what A07 produced. | sonnet |
| 4.2 | `4.2-downstream-handoff.md` | Prepare structured handoff for downstream skills. For A08 (Visual Production): list all variant IDs that need visual assets, reference A05 visual directions per concept, note text overlay content per variant. For A09 (Assembly): provide the variant matrix structure, the combinatorial mapping (which hooks go with which bodies with which CTAs), the platform-specific file paths. | sonnet |
| 4.3 | `4.3-execution-log.md` | Produce execution-log.md with per-microskill entries. Each entry: spec file read confirmation, output file created, output file size, key metrics, gate status. Include timestamps, model used per layer, and total variant counts. | sonnet |
| 4.4 | `4.4-final-checkpoint.md` | Create all checkpoint YAML files (if not yet created at prior gates). Verify all output files exist with sizes. Create LAYER_4_COMPLETE.yaml. Run final integrity check: every variant ID in the matrix summary must have a corresponding file in AD-COPY-FINAL/. | sonnet |

**Execution Order:**
1. 4.1 first (primary deliverable)
2. 4.2 in parallel with 4.1 (independent downstream handoff)
3. 4.3 after 4.1 and 4.2 (logs all assembly)
4. 4.4 after 4.3 (final checkpoint)

**Gate 4 -- Skill Complete:**

```yaml
# LAYER_4_COMPLETE.yaml
gate: GATE_4
skill: "A07-copy-production"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"

checks:
  copy_production_package_exists: true
  copy_production_package_path: "COPY-PRODUCTION-PACKAGE.md"
  downstream_handoff_exists: true
  execution_log_exists: true
  ad_copy_final_directory_exists: true
  total_variant_files_in_directory: "[integer >= 30]"
  all_variant_ids_have_files: true
  all_checkpoint_files_exist: true

integrity_check:
  variant_ids_in_summary: "[integer]"
  variant_files_in_directory: "[integer]"
  match: "[true if equal]"

final_metrics:
  total_concepts: "[integer]"
  total_variants: "[integer]"
  total_hook_swaps: "[integer]"
  total_cta_variants: "[integer]"
  total_platform_adaptations: "[integer]"
  word_count_compliance: "100%"
  hook_body_coherence: "[X]% HIGH, [Y]% MEDIUM, 0% LOW"
  compliance_violations: 0

microskill_outputs:
  - id: "4.1"
    file: "layer-4-outputs/4.1-copy-production-package.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "4.2"
    file: "layer-4-outputs/4.2-downstream-handoff.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "4.3"
    file: "layer-4-outputs/4.3-execution-log.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "4.4"
    file: "layer-4-outputs/4.4-final-checkpoint.md"
    size_bytes: "[integer]"
    minimum_met: true

IF variant_ids don't match files: GATE CLOSED -- reconcile
IF copy_production_package missing: GATE CLOSED -- create it
IF execution_log missing: GATE CLOSED -- create it
```

---

## OUTPUT SCHEMA: COPY-PRODUCTION-PACKAGE.md

The primary deliverable. This is the umbrella summary that downstream skills and humans use to understand what A07 produced.

```markdown
# COPY-PRODUCTION-PACKAGE.md
## Metadata
- Project: [name]
- Skill: A07 -- Copy Production
- Execution Date: [ISO 8601]
- Upstream Inputs: A06 Arena Results, A04 Script Package, A05 Visual Direction,
  A03 Format Strategy, A02 Hook-Angle Matrix, Campaign Brief (Skill 09)
- Total Concepts: [integer]
- Total Variants: [integer]
- Platforms Covered: [list]

## Section 1: Executive Summary
- Concepts produced: [count] Arena-approved concepts, each with base copy + variants
- Total testable variants: [count]
- Variant breakdown: [X] hook swaps, [Y] CTA variants, [Z] platform adaptations
- Word count compliance: 100% (all variants within hard limits)
- Quality check: [X]% HIGH coherence, [Y]% MEDIUM, 0% LOW
- Compliance status: [PASS -- zero violations / X violations resolved]
- Recommended first tests: [top 5 variant IDs to test first with rationale]

## Section 2: Per-Concept Summary
### Concept [C-001]: [Name]
- Arena Score: [from A06]
- Framework: [from A04]
- Primary Platform: [from A03]
- Target Length: [Xs]
- Base Copy: [variant ID] -- [1-sentence summary]
- Hook Swaps: [count] -- types: [list of hook types used]
- CTA Variants: [count] -- levers: [list of levers used]
- Platform Adaptations: [list of platform-length pairs]
- Total Variants for This Concept: [count]

### Concept [C-002]: [Name]
[Same structure]

### Concept [C-003]: [Name]
[Same structure]

## Section 3: Variant Matrix Visualization
[Grid showing Concept x Hook x CTA combinations with variant IDs]

## Section 4: Word Count Compliance Summary
[Summary table -- all variants, all within limits]

## Section 5: Quality Check Summary
### Hook-Body Coherence
- Total combinations checked: [X]
- HIGH: [X] | MEDIUM: [X] | LOW: 0
### Compliance Audit
- Violations found: [X]
- Violations resolved: [X]
- Remaining: 0
### Tone Consistency
- All concepts: PASS

## Section 6: Platform Distribution
| Platform | Variants | Concepts | Lengths |
|----------|----------|----------|---------|
| Meta | [X] | [list] | [list] |
| TikTok | [X] | [list] | [list] |
| YouTube | [X] | [list] | [list] |

## Section 7: Testing Recommendations for A10
- Highest priority tests: [top 5-10 variant pairs for A/B testing]
- Hook diversity tests: [variant pairs that test hook type effectiveness]
- CTA lever tests: [variant pairs that test CTA approach]
- Platform comparison tests: [same concept across platforms]

## Section 8: Downstream Handoffs
### For A08 (Visual Production)
- Variant IDs requiring visual assets: [list]
- Visual direction references: [A05 file paths per concept]
- Text overlay content: [extracted from variants]
### For A09 (Assembly & Variant Matrix)
- Variant matrix structure: [file path to 3.3 summary]
- AD-COPY-FINAL/ directory path: [path]
- Combinatorial mapping: [which hooks x which bodies x which CTAs]

## Section 9: File Manifest
[Complete list of all output files with paths and sizes]
```

---

## GATE ARCHITECTURE -- COMPLETE REFERENCE

### Gate Summary Table

| Gate | Location | Blocks | Key Criteria | Expansion Protocol |
|------|----------|--------|--------------|-------------------|
| GATE_0 | Layer 0 --> Layer 1 | Base copy entry | Arena results loaded, script architecture loaded, format strategy loaded, visual direction loaded, all inputs validated | Fix missing inputs |
| GATE_1 | Layer 1 --> Layer 2 | Variant generation entry | All concepts have base copy, all modules filled, all word counts within limits, all visual columns specific | Return to Layer 1 for completion/compression |
| GATE_2 | Layer 2 --> Layer 2.5 | Quality check entry | 5+ hooks per concept, 2+ CTAs per concept, all platform adaptations complete, 30+ total variants | Return to Layer 2 for expansion |
| GATE_2.5 | Layer 2.5 --> Layer 3 | Matrix assembly entry | 100% word count compliance, all LOW coherence resolved, compliance violations resolved, tone consistent | Return to Layer 2 for revision, then re-check |
| GATE_3 | Layer 3 --> Layer 4 | Output packaging entry | All variant files created, all IDs unique, directory structure correct, matrix summary exists | Fix missing files/structure |
| GATE_4 | Skill completion | Downstream consumption | COPY-PRODUCTION-PACKAGE.md exists, execution log exists, all variant IDs have files, integrity check passes | Complete missing outputs |

### Structural Checkpoint Files

```
[project]/A07-copy-production/checkpoints/
  LAYER_0_COMPLETE.yaml
  LAYER_1_COMPLETE.yaml
  LAYER_2_COMPLETE.yaml
  LAYER_2_5_COMPLETE.yaml
  LAYER_3_COMPLETE.yaml
  LAYER_4_COMPLETE.yaml
```

**IF checkpoint file does not exist, the next layer is BLOCKED.**

### Gate Failure Response Protocol

```
GATE FAILED --> DO NOT proceed. DO NOT invent new gate statuses.
Gate status can ONLY be PASS or FAIL.

EXPANSION ROUND 1:
  1. IDENTIFY which metrics failed (from the gate YAML)
  2. For word count failures: Compress the specific variant(s)
  3. For variant count failures: Generate additional variants
  4. For coherence failures: Revise or exclude LOW-rated pairings
  5. For compliance failures: Rewrite violating copy
  6. UPDATE PROJECT-STATE.md with new counts
  7. Re-run the gate check
  8. IF PASS --> proceed. IF FAIL --> ROUND 2.

EXPANSION ROUND 2:
  1. IDENTIFY REMAINING failures
  2. For persistent word count: More aggressive compression, restructure modules
  3. For persistent variant gaps: Try different hook categories, different CTA levers
  4. For persistent coherence: Rewrite hooks with explicit body-matching
  5. UPDATE PROJECT-STATE.md
  6. Re-run gate check
  7. IF PASS --> proceed. IF FAIL --> ROUND 3.

EXPANSION ROUND 3:
  1. IDENTIFY REMAINING failures
  2. Use all available techniques
  3. UPDATE PROJECT-STATE.md
  4. Re-run gate check
  5. IF PASS --> proceed. IF FAIL --> ESCALATE TO HUMAN.

HUMAN ESCALATION (only after ALL 3 rounds):
  Present exact metrics vs targets, what was tried, why threshold may need adjustment.
  Options: (a) approve reduced threshold, (b) provide direction on problematic variants,
           (c) adjust platform assignments, (d) modify concept scope.
```

---

## ANTI-DEGRADATION SECTION

### Forbidden Rationalizations (IMMEDIATE HALT)

```
+--------------------------------------------------------------------------+
|  IF ANY OF THESE PHRASES APPEAR IN GATE REASONING, THE GATE CHECK         |
|  IS INVALID AND EXECUTION MUST HALT IMMEDIATELY.                          |
+--------------------------------------------------------------------------+
```

| Rationalization | Why Forbidden | Required Response |
|-----------------|---------------|-------------------|
| "word count is approximately within limits" | Word count limits are EXACT. 161 words for a 160-word limit is a FAIL. | HALT -- compress to within limits |
| "these hook variants are similar but each is unique" | If hook swaps don't use DIFFERENT taxonomy types, they are not true variants. | HALT -- generate hooks from different categories |
| "one CTA variant is sufficient for this concept" | Minimum is 2 CTA variants with different psychological levers. | HALT -- generate additional CTA variant |
| "the platform adaptation is just a reformatted version" | Platform adaptations require 3+ substantive differences. Reformatting is not adaptation. | HALT -- rewrite for platform |
| "we have enough variants for testing" | "Enough" is defined by exact thresholds (30 minimum), not subjective assessment. | HALT -- meet thresholds |
| "quality over quantity on variants" | BOTH required. Quality verification happens AFTER quantity threshold met. | HALT -- meet quantity first |
| "close enough to word count" | Does not exist. Word count limits are physics. | HALT -- compress |
| "the body is similar enough for this hook" | Hook-body coherence must be validated, not assumed. | HALT -- run coherence check |
| "compliance isn't relevant for this vertical" | Every vertical has compliance constraints. | HALT -- run compliance scan |
| "partial pass" / "conditional pass" | Does not exist. Gates are PASS or FAIL only. | HALT -- gates are binary |

### A07-Specific MC-CHECK (Every 3-4 Microskills)

```yaml
A07-MC-CHECK:
  trigger: "[layer_entry | mid_layer | gate | output]"

  ad_specific_check:
    word_count_within_limits: "[Y/N]"
    platform_constraints_applied: "[Y/N]"
    hook_classified_by_type: "[Y/N]"
    visual_column_specific_not_vague: "[Y/N]"
    variant_matrix_producing_multiple: "[Y/N]"
    if_any_no: "HALT -- address before proceeding"

  copy_production_specific:
    am_i_writing_generic_copy: "[Y/N -- check against loaded specimens]"
    am_i_generating_flat_CTA_variants: "[Y/N -- are CTAs using different levers?]"
    am_i_reformatting_instead_of_rewriting_for_platforms: "[Y/N]"
    am_i_skipping_hook_body_coherence_check: "[Y/N]"
    am_i_treating_word_counts_as_approximate: "[Y/N]"
    if_any_yes: "HALT -- slow down, reread protocol"

  variant_count_check:
    hooks_per_concept: "[count per concept -- each >= 5?]"
    ctas_per_concept: "[count per concept -- each >= 2?]"
    platform_adaptations: "[count per concept -- matches A03?]"
    total_variants: "[count -- >= 30?]"
    if_any_below_minimum: "CONTINUE GENERATING -- do not proceed to quality check"

  confidence_assessment:
    score: "[1-10]"
    if_below_7: "PAUSE -- identify uncertainty, re-read requirements"

  result: "[PROCEED | PAUSE | HALT | SESSION_BREAK]"
```

### Session Startup Protocol (MANDATORY)

```
ON EVERY A07 SESSION START:
  1. READ this file (A07-COPY-PRODUCTION-AGENT.md)
  2. READ A07-COPY-PRODUCTION-ANTI-DEGRADATION.md
  3. READ AD-ENGINE.md (5 Laws, Variant Architecture, Word Counts)
  4. IF resuming: READ PROJECT-STATE.md and SESSION-HANDOFF.md
  5. IF resuming: VERIFY checkpoint files match claimed state
  6. NEVER trust summary claims about gate status -- verify from checkpoint files
  7. MC-CHECK before proceeding
```

---

## PER-MICROSKILL OUTPUT PROTOCOL (A07-Specific)

Every microskill produces its own dedicated output file. This is MANDATORY. See ~system/SYSTEM-CORE.md for the universal protocol.

### A07 Per-Microskill Output Table

| Microskill | Output File | Min Size | Key Content |
|------------|-------------|----------|-------------|
| 0.0.1 | `layer-0-outputs/0.0.1-vertical-profile-loader.md` | 1KB | Vertical ID, compliance constraints, anti-slop rules |
| 0.1 | `layer-0-outputs/0.1-campaign-brief-loader.md` | 1KB | Product name, audience, awareness level, price |
| 0.2 | `layer-0-outputs/0.2-arena-results-loader.md` | 2KB | Winning concept IDs, descriptions, scores, human notes |
| 0.3 | `layer-0-outputs/0.3-script-architecture-loader.md` | 2KB | Framework per concept, module definitions, swap points |
| 0.4 | `layer-0-outputs/0.4-visual-direction-loader.md` | 2KB | Visual treatment per concept, shot list summaries |
| 0.5 | `layer-0-outputs/0.5-format-strategy-loader.md` | 2KB | Platform assignments, lengths, constraints |
| 0.6 | `layer-0-outputs/0.6-hook-matrix-loader.md` | 2KB | Selected hooks, types, angle attributions |
| 0.7 | `layer-0-outputs/0.7-persona-voice-loader.md` | 2KB | Specimens loaded, voice calibration notes |
| 1.1 | `layer-1-outputs/1.1-concept-brief-extraction.md` | 3KB | Per-concept mini-briefs |
| 1.2 | `layer-1-outputs/1.2-base-copy-concept-1.md` | 5KB | Complete AV script, word count, module completion |
| 1.3 | `layer-1-outputs/1.3-base-copy-concept-2.md` | 5KB | Complete AV script, word count, module completion |
| 1.4 | `layer-1-outputs/1.4-base-copy-concept-3.md` | 5KB | Complete AV script, word count, module completion |
| 1.5 | `layer-1-outputs/1.5-base-copy-validator.md` | 3KB | Validation results for all base copies |
| 2.1 | `layer-2-outputs/2.1-hook-swap-generation.md` | 10KB | 5-10 hooks per concept, type classification, coherence |
| 2.2 | `layer-2-outputs/2.2-cta-variant-generation.md` | 5KB | 2-3 CTAs per concept, lever classification |
| 2.3 | `layer-2-outputs/2.3-platform-adaptation.md` | 8KB | Platform rewrites with substantive differences |
| 2.4 | `layer-2-outputs/2.4-variant-inventory.md` | 3KB | Complete variant inventory table |
| 2.5.1 | `layer-2.5-outputs/2.5.1-word-count-verification.md` | 3KB | Word count compliance table |
| 2.5.2 | `layer-2.5-outputs/2.5.2-hook-body-coherence-check.md` | 5KB | Coherence matrix for all combinations |
| 2.5.3 | `layer-2.5-outputs/2.5.3-compliance-scan.md` | 3KB | Compliance audit per variant |
| 2.5.4 | `layer-2.5-outputs/2.5.4-tone-consistency-check.md` | 3KB | Tone audit per concept |
| 3.1 | `layer-3-outputs/3.1-variant-id-assignment.md` | 3KB | Master variant ID table |
| 3.2 | `layer-3-outputs/3.2-per-variant-file-creation.md` | 3KB | File creation log with paths |
| 3.3 | `layer-3-outputs/3.3-variant-matrix-summary.md` | 5KB | Matrix visualization, test recommendations |
| 4.1 | `layer-4-outputs/4.1-copy-production-package.md` | 10KB | Umbrella summary (primary deliverable) |
| 4.2 | `layer-4-outputs/4.2-downstream-handoff.md` | 5KB | Structured handoff for A08 and A09 |
| 4.3 | `layer-4-outputs/4.3-execution-log.md` | 5KB | Per-microskill execution entries |
| 4.4 | `layer-4-outputs/4.4-final-checkpoint.md` | 2KB | Final integrity check and LAYER_4_COMPLETE.yaml |

**IF any output file is missing or below minimum size --> the layer containing that microskill is NOT complete.**

---

## FORBIDDEN BEHAVIORS (A07-Specific -- 30 Items)

### Copy Generation Failures
1. Writing copy without loading A06 Arena-approved concepts (writing for unapproved concepts)
2. Writing copy without loading A04 script architecture (inventing structure instead of filling blueprints)
3. Writing copy without loading persona voice specimens (generating from generic ad copy distribution)
4. Generating base copy without the AV format (VISUAL | AUDIO two-column) for video scripts
5. Leaving visual column entries vague ("Show product" without shot type, subject, action)
6. Exceeding word count limits for ANY variant and accepting it as "close enough"
7. Generating copy that doesn't follow the assigned framework from A04 (PAS, AIDA, BAB, etc.)
8. Writing DR-in-ad-clothing: cramming problem-agitation-mechanism-proof-offer-guarantee-CTA into 30 seconds
9. Generating a single ad copy and calling the skill complete
10. Writing copy without checking Soul.md voice constraints (if Soul.md exists)

### Variant Generation Failures
11. Producing fewer than 5 hook swaps per body
12. Producing hook swaps that all use the SAME hook type (must span 4+ taxonomy categories)
13. Producing fewer than 2 CTA variants per concept
14. Producing CTA variants that use the SAME psychological lever ("Click now" vs "Tap now" is not diversity)
15. Producing platform adaptations that are reformats, not substantive rewrites (must have 3+ differences)
16. Claiming variant generation complete with fewer than 30 total variants
17. Generating hook swaps without classifying them by taxonomy type
18. Generating CTA variants without classifying them by lever type

### Quality Check Failures
19. Skipping word count verification for any variant
20. Accepting hook-body combinations rated LOW without revision or exclusion
21. Skipping compliance scan
22. Skipping tone consistency check
23. Treating word count limits as approximate ("161 is close enough to 160")
24. Proceeding past Layer 2.5 with unresolved compliance violations

### Assembly Failures
25. Creating variant files without unique IDs
26. Creating variant files missing metadata (concept, platform, length, type)
27. Creating variant files missing quality check results
28. Producing the variant matrix summary without test priority recommendations
29. Allowing variant IDs in the summary that don't have corresponding files in AD-COPY-FINAL/
30. Skipping the downstream handoff for A08 and A09

---

## EFFORT PROTOCOL (Extended Thinking)

A07 is a GENERATIVE skill. Copy quality requires deep reasoning.

| Phase | Effort Level | Why |
|-------|-------------|-----|
| Pre-Execution infrastructure | `low` | Mechanical file creation |
| Layer 0 (loading) | `medium` | Careful extraction but not creative |
| Layer 1 (base copy generation) | `max` | Primary creative generation. Every word must earn its place within strict word count limits. Voice calibration from specimens requires deep integration. |
| Layer 2 (variant generation) | `max` | Creative diversity. Hook swaps must be genuinely different, not rewrites. CTA variants must use different psychological levers. Platform adaptations must be substantive rewrites. |
| Layer 2.5 (quality check) | `high` | Nuanced judgment on coherence, compliance, and tone consistency. Must catch subtle mismatches. |
| Layer 3 (matrix assembly) | `medium` | Organizational, not creative. Accurate labeling and file creation. |
| Layer 4 (output packaging) | `medium` | Assembly and documentation. |
| MC-CHECK | `medium` | Quick but honest self-assessment. |

### What Extended Thinking Enables During Copy Generation (Layer 1)

When `effort: max` is active, the model should use the thinking budget to:

1. **Re-read the A04 script architecture** for this concept -- understand every module's purpose before writing a word
2. **Cross-reference loaded specimens** -- find the winning ad copy patterns most relevant to this concept's angle and framework
3. **Plan the word budget** per module BEFORE writing -- knowing you have 160 words for 60s, how should those be distributed across 5 modules?
4. **Write multiple draft openings** before committing -- the first hook phrasing is rarely the best
5. **Read each module aloud mentally** -- does it sound natural spoken? Is the rhythm right for the platform?
6. **Verify visual-audio complementarity** -- the visual column should SHOW while the audio TELLS. They shouldn't duplicate each other.

### What Extended Thinking Enables During Variant Generation (Layer 2)

When `effort: max` is active, the model should use the thinking budget to:

1. **Analyze the hook taxonomy** entry for each target hook type -- understand the psychological mechanism, not just the format
2. **Reason about hook-body coherence** BEFORE writing the hook -- will this hook create expectations the body fulfills?
3. **Explore 3+ CTA lever options** before committing to the final 2-3 -- which levers are most psychologically appropriate for this product, price point, and awareness level?
4. **Deeply understand platform differences** before writing adaptations -- not just format changes but fundamental differences in how people consume content on each platform
5. **Check each variant against competitors** -- would this hook stop someone who has already seen 100 ads in this vertical today?

---

## CONTEXT MANAGEMENT (A07-Specific)

A07 generates a HIGH volume of output (30-90+ variant files). This puts significant pressure on context.

### Context Zone Management

| Zone | Condition | Action |
|------|-----------|--------|
| GREEN | Layers 0-1 (loading + base copy) | Normal MC-CHECK frequency |
| YELLOW | Layer 2 (variant generation -- high volume) | MC-CHECK every 2-3 microskills. Begin writing variant files to disk IMMEDIATELY (don't hold in context). |
| RED | Layer 2.5+ (quality check + assembly) | MC-CHECK every microskill. All intermediate outputs on disk. Work from file references, not memory. |

### Volume Management Strategy

```
DO NOT hold all 30-90 variants in context simultaneously.

INSTEAD:
  1. Generate variants per concept (not all concepts at once)
  2. Write each concept's variants to disk IMMEDIATELY after generation
  3. Move to next concept with fresh context for that concept's variants
  4. Layer 2.5 quality checks read variants from disk, not from memory
  5. Layer 3 assembly reads from disk and creates files

The variant inventory (2.4) is the coordination document --
it tracks what has been generated and written to disk.
```

---

## INTEGRATION NOTES

### How A07 Relates to Adjacent Skills

```
A04 (Script Architecture) -- UPSTREAM
  A04 designs the BLUEPRINT: which framework, which modules, swap points, lengths.
  A07 FILLS the blueprint with actual words.
  A07 does NOT redesign the blueprint. If the blueprint is wrong, escalate to human.

A05 (Visual Direction) -- UPSTREAM
  A05 designs the VISUAL TREATMENT: shot types, styles, mood, reference ads.
  A07 writes the VISUAL COLUMN to complement (not duplicate) A05's direction.
  A07's visual column must be SPECIFIC enough for a video editor to execute.

A06 (Ad Arena) -- UPSTREAM
  A06 SELECTED the winning concepts through 3-round adversarial competition.
  A07 writes copy for THESE concepts ONLY.
  A07 does NOT generate new concepts or modify Arena-selected concepts.

A08 (Visual/Video Production) -- DOWNSTREAM
  A08 needs from A07: variant IDs, text overlay content, visual column specifics.
  A07's visual column feeds A08's shot list construction.

A09 (Assembly & Variant Matrix) -- DOWNSTREAM
  A09 needs from A07: the complete copy variant matrix, combinatorial mapping,
  per-variant files in AD-COPY-FINAL/.
  A09 ASSEMBLES copy + visual + audio into final production-ready variants.
```

### What A07 Does NOT Do

```
A07 does NOT:
  - Generate new strategic angles (that was A02)
  - Design new script frameworks (that was A04)
  - Create visual assets (that is A08)
  - Assemble the final multi-asset variants (that is A09)
  - Score variants for testing priority (that is A10)
  - Make platform strategy decisions (that was A03)
  - Run quality arenas on concepts (that was A06)

A07 DOES:
  - Fill blueprints with words
  - Generate hook swap variants
  - Generate CTA variants
  - Adapt copy for platforms
  - Verify word counts
  - Verify hook-body coherence
  - Check compliance
  - Organize into variant matrix
  - Hand off clean copy to A08 and A09
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation. Full layer architecture (Pre-Exec, Layer 0-4 with Layer 2.5 quality check). 3 Laws of Copy Production. 7 degradation patterns with fixes. Variant Generation Model with concept-to-variant hierarchy. CTA Lever Taxonomy (7 levers). Platform Adaptation Protocol (5 required differences). Hook Swap Generation Protocol with taxonomy diversity requirements. Word Count Compliance Table format. Hook-Body Coherence Matrix format. Variant ID naming convention. AD-COPY-FINAL/ directory structure. Per-variant file format. COPY-PRODUCTION-PACKAGE.md output schema (9 sections). 6 gates (0, 1, 2, 2.5, 3, 4) with full YAML schemas. Gate failure expansion protocol (3 rounds + human escalation). 10 forbidden rationalizations. 30 forbidden behaviors. Model assignment table (opus for generation/quality, sonnet for assembly/packaging, haiku for infrastructure/loading). A07-specific MC-CHECK. Effort protocol (max for Layers 1-2, high for Layer 2.5). Context management with volume management strategy. Per-microskill output table (28 microskills). Integration notes for A04, A05, A06, A08, A09. |
