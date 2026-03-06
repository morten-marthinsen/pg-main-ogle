# A04 -- Script Architecture

**Version:** 1.0
**Created:** 2026-02-22
**Role:** Workflow Orchestrator (State Machine)
**Skill Type:** Structural Design / Creative Architecture
**Pipeline Position:** Fourth Ad Engine skill. Receives selected hooks from A02, format strategy from A03, and campaign strategic foundation from Skills 03-08. Feeds A05 (Visual Direction) and A07 (Copy Production).
**Related Documents:**
- `./skills/ads/AD-ENGINE-CLAUDE.md` (Ad Engine master)
- `./References/AD-SCRIPT-STRUCTURES.md` (8 frameworks, modular architecture, length structures, vertical patterns)
- `./References/AD-HOOK-TAXONOMY.md` (32 hook types, 10 categories)
- `./CLAUDE.md` (CopywritingEngine master -- metacognitive, gates, anti-degradation)
**Anti-Degradation Document:** `A04-SCRIPT-ARCHITECTURE-ANTI-DEGRADATION.md` (MANDATORY -- read BEFORE execution)

---

## TABLE OF CONTENTS

- [THE 3 LAWS OF SCRIPT ARCHITECTURE (Never Scroll Past This)](#the-3-laws-of-script-architecture-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [THE HOOK-BODY COHERENCE PRINCIPLE (Reference Section)](#the-hook-body-coherence-principle-reference-section)
- [THE 8 FRAMEWORKS -- SELECTION CRITERIA](#the-8-frameworks----selection-criteria)
- [MODULAR SCRIPT ARCHITECTURE](#modular-script-architecture)
- [Pre-Execution Protocol](#pre-execution-protocol)
- [MODEL ASSIGNMENT TABLE (Binding)](#model-assignment-table-binding)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [OUTPUT SCHEMA: SCRIPT-ARCHITECTURE-PACKAGE.md](#output-schema-script-architecture-packagemd)
- [GATE ARCHITECTURE -- COMPLETE REFERENCE](#gate-architecture----complete-reference)
- [ANTI-DEGRADATION ENFORCEMENT](#anti-degradation-enforcement)
- [PER-MICROSKILL OUTPUT PROTOCOL](#per-microskill-output-protocol)
- [SUBAGENT CONTEXT TEMPLATE](#subagent-context-template)
- [FORBIDDEN BEHAVIORS (A04-Specific)](#forbidden-behaviors-a04-specific)
- [MC-CHECK SCHEDULE](#mc-check-schedule)
- [INTEGRATION WITH DOWNSTREAM SKILLS](#integration-with-downstream-skills)
- [OUTPUT PATH CONVENTION](#output-path-convention)
- [VERTICAL-SPECIFIC SCRIPT PATTERNS](#vertical-specific-script-patterns)
- [WORD COUNT ENFORCEMENT -- DETAILED REFERENCE](#word-count-enforcement----detailed-reference)
- [VERSION HISTORY](#version-history)

---

## THE 3 LAWS OF SCRIPT ARCHITECTURE (Never Scroll Past This)

1. **The script serves the hook AND the big idea.** The hook's promise MUST be fulfilled by the body. The body MUST lead to the big idea. If the hook says "3 foods destroying your gut," the script cannot talk about energy levels. Hook-body coherence is the non-negotiable structural requirement. Every module exists to bridge the 3-second hook to the campaign's strategic foundation.
2. **Word count is physics, not suggestion.** 6 seconds = 15 words. 15 seconds = 40 words. 30 seconds = 75 words. 60 seconds = 160 words. 2-3 minutes = 450 words. These are not guidelines. They are the physics of spoken audio at 2.5 words/second. Over-length scripts are returned for compression. No exceptions. No "approximately." Count every word.
3. **Modules are independent, scripts are not.** Every script is a stack of swappable modules: `[HOOK] + [SETUP] + [MECHANISM] + [PROOF] + [CTA]`. Any module can be swapped independently for variant testing. But within a single assembled script, the modules must flow -- each module must logically follow the one before it. Modularity is structural; coherence is experiential.

---

## CRITICAL: READ THIS FIRST

This file exists because **script architecture has its own degradation patterns** distinct from hook generation, visual direction, and long-form copy:

1. **Hook-body disconnect** -- The hook promises one thing but the body delivers another. Especially common when hooks and bodies are generated separately (which they must be for modular variant testing). "The 3 foods destroying your gut" paired with a body about energy optimization.
2. **Framework mismatch** -- The model selects a framework randomly or defaults to PAS for everything. PAS is wrong for a 6-second bumper. AIDA is wrong for a TikTok-native ad. Framework selection must match hook type + platform + length + vertical + awareness level.
3. **Word count violation** -- LLMs have no internal sense of time. A "30-second script" comes back at 200 words (80+ seconds spoken). This is the most predictable failure in ad script generation. Word counts are verified BEFORE any quality assessment.
4. **Mechanism-less scripts** -- The script omits the campaign's unique mechanism entirely, or mentions it so briefly it has no persuasive weight. For 60+ second ads, mechanism integration is mandatory.
5. **Generic CTAs** -- Every script ends with "Click the link below" or "Shop now." CTAs must be specific, matched to funnel stage, and varied across the variant matrix (urgency vs. risk reversal vs. low-friction).
6. **Monolithic scripts** -- The model writes a complete script as a single block instead of designing it as swappable modules. Without explicit module boundaries, variant testing is impossible.
7. **Platform-blind architecture** -- Same script structure regardless of TikTok vs. YouTube pre-roll vs. Meta feed. TikTok demands hook-in-first-frame. YouTube pre-roll must deliver value before the 5-second skip. Meta must work sound-off.
8. **Visual afterthought** -- The audio column is detailed; the visual column says "Show product." This skill designs content briefs per module -- visual direction detail comes in A05, but the architectural intent (what the visual DOES in each module) must be specified here.

**This file is the fix.** Before executing A04, read the relevant sections below.

---

## PURPOSE

Design the **structural blueprint for every ad script** in the campaign -- selecting the optimal framework, architecting the module sequence, specifying content briefs per module, enforcing word count budgets, and planning which modules are swappable for variant testing.

**The critical output of this skill is a SCRIPT-ARCHITECTURE-PACKAGE.md** that contains:
- Framework assignment per ad concept (which of the 8 frameworks, with rationale)
- Module-level script blueprints (what each module does, word count budget, content brief)
- AV format specifications (two-column audio-visual structure)
- Variant swap plan (which modules are independently testable)
- Word count verification for every script at every length

**Success Criteria:**
- AD-SCRIPT-STRUCTURES.md loaded and all 8 frameworks available during architecture
- Framework selection documented with rationale per ad concept (not arbitrary)
- Every script blueprint specifies modules: [HOOK] + [SETUP] + [MECHANISM] + [PROOF] + [CTA]
- Word count budgets per module sum to target length (within tolerance)
- Content briefs tell A07 WHAT to write per module (not the actual copy)
- AV format specifies visual intent per module (what the visual column DOES)
- Variant swap plan identifies which modules are independently testable
- Hook-body coherence verified: hook promise maps to body content
- Mechanism integration planned for all 60+ second scripts
- CTA variants specified (minimum 3 different CTA approaches per concept)
- SCRIPT-ARCHITECTURE-PACKAGE.md exists with all required sections populated

This agent is a **workflow orchestrator**. It delegates framework analysis, module design, and variant planning to subagents and validates outputs at each gate. It produces structural blueprints for downstream consumption by A05 (Visual Direction), A06 (Ad Arena), and A07 (Copy Production).

---

## IDENTITY

**This skill IS:**
- The structural architect for ad scripts -- it designs the BLUEPRINT, not the copy
- The framework selection engine -- matching hook type + platform + length + vertical to the optimal script framework
- The modular decomposition system -- breaking scripts into independently testable [HOOK] + [SETUP] + [MECHANISM] + [PROOF] + [CTA] modules
- The word count enforcer -- budgeting exact word counts per module per ad length
- The content brief generator -- telling A07 WHAT each module must communicate
- The variant planning engine -- identifying which modules swap independently for testing
- The hook-body coherence validator -- ensuring the hook's promise is fulfilled by the body

**This skill is NOT:**
- A copywriter (that is A07 -- A04 produces blueprints, not finished copy)
- A visual director (that is A05 -- A04 specifies visual INTENT per module, A05 creates shot-level briefs)
- A hook generator (that is A02 -- A04 receives selected hooks as input)
- A format strategist (that is A03 -- A04 receives format/platform assignments as input)
- An ad evaluator (that is A06 -- A04 designs structures, A06 evaluates complete ad concepts)
- A variant assembler (that is A09 -- A04 plans variant swaps, A09 assembles the matrix)

**Upstream dependencies:**
- Campaign Brief (Skill 09) -- REQUIRED
- Research Handoff (Skill 01) -- REQUIRED (pain quotes, hope language for content briefs)
- Root Cause (Skill 03) -- REQUIRED (root cause framing for [SETUP] module content)
- Mechanism (Skill 04) -- REQUIRED (mechanism for [MECHANISM] module content)
- Promise (Skill 05) -- REQUIRED (calibrated promise for claims)
- Big Idea (Skill 06) -- REQUIRED (strategic anchor -- all scripts lead to the big idea)
- Offer (Skill 07) -- REQUIRED (for [CTA] module design)
- Hook-Angle Matrix (A02) -- REQUIRED (selected hooks, hook types, angle attributions)
- Format Strategy (A03) -- REQUIRED (format assignments, platform constraints, lengths, creative volume plan)

**Downstream consumers:**
- A05 (Visual Direction) -- receives module-level visual intent to create shot-level briefs
- A06 (Ad Arena) -- receives complete script architectures as part of ad concept evaluation
- A07 (Copy Production) -- receives content briefs per module as generation instructions
- A09 (Assembly) -- receives variant swap plan for matrix construction

---

## THE HOOK-BODY COHERENCE PRINCIPLE (Reference Section)

Hook-body coherence is the single most important structural requirement in A04. When hooks are generated separately from bodies (which they MUST be for modular testing), the risk of disconnect is highest at the architecture stage -- where the hook's promise is mapped to the body's content.

### The Coherence Chain

```
HOOK (from A02)          BODY (designed in A04)         BIG IDEA (from Skill 06)
"3 foods destroying      [SETUP]: Why certain foods     "Lectins in common plants
 your gut"               damage your digestive system    cause inflammation, weight
                         [MECHANISM]: The lectin          gain, and chronic health
                         protein explanation               problems"
                         [PROOF]: Study/testimonial
                         [CTA]: Take the gut quiz

COHERENCE CHECK:
- Does the hook promise "3 foods"? YES
- Does the body deliver those 3 foods? MUST YES
- Does the mechanism explain WHY those foods are damaging? YES
- Does it connect to the big idea (lectins)? YES
- Would a viewer who stopped for the hook feel satisfied by the body? YES
```

### Common Disconnect Patterns (FORBIDDEN)

```
DISCONNECT TYPE 1: Promise mismatch
  HOOK: "3 foods destroying your gut"
  BODY: Talks about stress and sleep quality
  FIX: Body MUST address the 3 foods promised

DISCONNECT TYPE 2: Mechanism bypass
  HOOK: "Doctor begs: stop eating this veggie"
  BODY: Lists product benefits without explaining WHY the veggie is harmful
  FIX: Body MUST explain the mechanism (lectins) before product

DISCONNECT TYPE 3: Awareness level jump
  HOOK: "Tired of bloating?" (problem-aware)
  BODY: Immediately pitches product (product-aware)
  FIX: Body must bridge through solution-awareness first

DISCONNECT TYPE 4: Angle abandonment
  HOOK: "What dermatologists use but don't tell patients" (insider/secret angle)
  BODY: Standard product pitch with no insider framing
  FIX: Body must maintain the insider/exclusive framing from the hook
```

### Coherence Validation Protocol

For EVERY hook-to-script mapping, A04 must answer these 5 questions:

1. **Does the hook make a promise?** (explicit or implicit)
2. **Does the [SETUP] module begin fulfilling that promise within the first 5 seconds of body?**
3. **Does the [MECHANISM] module explain WHY at a level matching the hook's specificity?**
4. **Does the script lead to the big idea without contortion?**
5. **Would a viewer who stopped for THIS hook feel the body was written FOR them?**

If ANY answer is NO, the architecture must be revised before proceeding.

---

## THE 8 FRAMEWORKS -- SELECTION CRITERIA

A04 selects the optimal framework for each ad concept. Selection is NOT arbitrary -- it is determined by the intersection of 5 variables.

### Framework Quick Reference

| # | Framework | Structure | Best Length | Best Platform | Best Hook Types | Best Awareness |
|---|-----------|-----------|------------|---------------|----------------|----------------|
| 1 | **PAS** | Problem-Agitate-Solution | 15-60s | Meta, TikTok | C1-C4 (Pain), A5 (Contrarian) | Problem-Aware |
| 2 | **AIDA** | Attention-Interest-Desire-Action | 30-90s | All | B1-B4 (Authority), D1-D3 (Transformation) | Solution-Aware |
| 3 | **BAB** | Before-After-Bridge | 15-60s | Meta, TikTok | D1 (Before/After), B4 (Testimonial) | Problem-Aware |
| 4 | **Hook-Body-CTA** | Hook (3-5s) + Value (5-20s) + CTA (3-5s) | 15-30s | TikTok, Reels, Shorts | All (social-native default) | All levels |
| 5 | **Story Narrative** | Protagonist + Conflict + Resolution | 60-120s | YouTube, Meta | J1 (Taboo), B4 (Testimonial), E1-E3 (Identity) | Unaware to Problem-Aware |
| 6 | **Edutainment** | Teach → Lesson → Soft CTA | 2-5min | YouTube | I1-I2 (List/Claim), A1-A3 (Curiosity) | Most-Aware (Stage 4-5) |
| 7 | **UGC-DR** | Problem → Discovery → Recommendation | 15-45s | TikTok, Meta | B3-B4 (Skeptic, Testimonial), C1 (Pain) | Problem to Solution-Aware |
| 8 | **Fast-Paced Viral** | Interrupt (1s) + Rapid-fire (2-12s) + CTA | 6-15s | TikTok, Shorts | F1-F4 (Platform-Native), G1-G4 (Visual) | Unaware |

### The 5 Selection Variables

```
VARIABLE 1: HOOK TYPE (from A02)
  Which hook type was selected? This constrains the framework.
  - Pain hooks (C1-C4) → PAS or BAB
  - Authority hooks (B1-B4) → AIDA or Edutainment
  - Testimonial hooks (B4, D1) → UGC-DR or BAB
  - Curiosity hooks (A1-A6) → Hook-Body-CTA or Edutainment
  - Platform-native hooks (F1-F4) → Fast-Paced Viral or Hook-Body-CTA
  - Visual hooks (G1-G4) → Fast-Paced Viral or Hook-Body-CTA

VARIABLE 2: PLATFORM (from A03)
  Which platform is this ad running on?
  - TikTok → Hook-Body-CTA, UGC-DR, Fast-Paced Viral
  - YouTube pre-roll → AIDA, Story Narrative, Edutainment
  - Meta feed → PAS, BAB, Hook-Body-CTA, UGC-DR
  - Reels/Shorts → Hook-Body-CTA, Fast-Paced Viral
  - Google Display → Hook-Body-CTA (compressed)

VARIABLE 3: AD LENGTH (from A03)
  What is the target length?
  - 6 seconds → Bumper only (not a full framework)
  - 15 seconds → PAS compressed, Hook-Body-CTA, Fast-Paced Viral
  - 30 seconds → Full PAS, BAB, Hook-Body-CTA
  - 60 seconds → Full AIDA, PAS, UGC-DR (first length for mechanism)
  - 2-3 minutes → Story, Edutainment, full DR structure

VARIABLE 4: VERTICAL (from Vertical Profile)
  Which vertical is this campaign in?
  - Health → PAS, AIDA (mechanism explainers), UGC-DR (testimonials)
  - Golf → BAB (demo results), Hook-Body-CTA (tips), Edutainment (lessons)
  - Finance → AIDA (quantified pain), PAS (fear/urgency)
  - Personal Dev → Story Narrative, Edutainment, AIDA
  - Technology → Hook-Body-CTA (product demos), BAB (old way/new way)

VARIABLE 5: AWARENESS LEVEL (from Campaign Brief / Research)
  Where is the prospect on the awareness ladder?
  - Unaware → Pattern interrupt frameworks (Fast-Paced Viral, Story)
  - Problem-Aware → Problem-first frameworks (PAS, BAB)
  - Solution-Aware → Desire-building frameworks (AIDA, Edutainment)
  - Product-Aware → Proof-first frameworks (UGC-DR, Hook-Body-CTA)
  - Most-Aware → Direct offer frameworks (Hook-Body-CTA with CTA focus)
```

### Framework Selection Decision Tree

```
START: What is the ad length?

IF 6 seconds:
  → BUMPER STRUCTURE (not a framework -- one idea, one message)

IF 15 seconds:
  → Hook-Body-CTA (default for short social)
  → Fast-Paced Viral (if TikTok/Shorts + young demo)
  → PAS compressed (if pain hook + Meta)

IF 30 seconds:
  IS the hook a pain/problem type (C1-C4)?
    YES → PAS or BAB (PAS if agitation-heavy, BAB if transformation-heavy)
    NO  → Hook-Body-CTA (default 30s social framework)

IF 60 seconds:
  IS the hook authority/expert (B1-B2)?
    YES → AIDA (authority builds interest → desire → action)
  IS the hook testimonial/UGC (B3-B4)?
    YES → UGC-DR (authentic peer recommendation)
  IS the hook pain/problem (C1-C4)?
    YES → PAS (full version with mechanism integration)
  ELSE → AIDA (flexible 60s default)

IF 2-3 minutes:
  IS the platform YouTube?
    IS the audience sophisticated (Stage 4-5)?
      YES → Edutainment (teach-then-sell)
      NO  → Story Narrative (mini hero's journey)
    IS the hook identity/transformation (D, E)?
      YES → Story Narrative
      NO  → AIDA extended or Edutainment
  IS the platform Meta?
    → Story Narrative or full PAS with mechanism
  IS the vertical health?
    → AIDA with mechanism explainer (Craig Clemens model)
```

### Framework Selection CANNOT Be:

- **Random** -- "I'll use PAS" without matching it to the 5 variables
- **One-size-fits-all** -- Using the same framework for every ad concept
- **Length-blind** -- PAS for a 6-second bumper, Edutainment for a 15-second ad
- **Platform-blind** -- Story Narrative for TikTok, Fast-Paced Viral for YouTube long-form

---

## MODULAR SCRIPT ARCHITECTURE

### The 5 Standard Modules

Every ad script (15 seconds and longer) is decomposed into these 5 modules:

```
[HOOK MODULE]       3-5 seconds     The attention mechanism (from A02)
[SETUP MODULE]      5-15 seconds    Problem context / story / education
[MECHANISM MODULE]  5-20 seconds    Why this works / unique explanation
[PROOF MODULE]      3-10 seconds    Evidence / testimonial / data
[CTA MODULE]        3-5 seconds     Call to action
```

**Not all modules appear in all lengths.** Module presence by length:

| Length | [HOOK] | [SETUP] | [MECHANISM] | [PROOF] | [CTA] |
|--------|--------|---------|-------------|---------|-------|
| 6s | YES (ultra-compressed) | NO | NO | NO | YES (single word/action) |
| 15s | YES | MINI (5-10 words) | NO | NO | YES |
| 30s | YES | YES | MINI (10-15 words) | MINI (5-10 words) | YES |
| 60s | YES | YES | YES (first length for full mechanism) | YES | YES |
| 2-3min | YES | YES (extended) | YES (extended) | YES (extended) | YES (multiple CTAs) |

### Module Word Count Budgets

These budgets enforce the ad length physics. The total MUST equal the target ad length word count.

**15-Second Script (40 words total):**

| Module | Words | Duration | Content Brief Focus |
|--------|-------|----------|-------------------|
| [HOOK] | 8-10 | 3s | Scroll-stop statement from A02 |
| [SETUP] | 10-12 | 4s | Single problem/benefit statement |
| [CTA] | 8-10 | 3s | Clear action with reason |
| **Subtotal** | **~35-40** | **~15s** | |

**30-Second Script (75 words total):**

| Module | Words | Duration | Content Brief Focus |
|--------|-------|----------|-------------------|
| [HOOK] | 10-12 | 3-4s | Scroll-stop + audience ID |
| [SETUP] | 18-22 | 7-8s | Problem statement / context |
| [MECHANISM] | 12-15 | 5-6s | Brief "why this works" |
| [PROOF] | 8-10 | 3-4s | Single proof element |
| [CTA] | 10-12 | 4-5s | Action + urgency/reason |
| **Subtotal** | **~65-75** | **~30s** | |

**60-Second Script (160 words total):**

| Module | Words | Duration | Content Brief Focus |
|--------|-------|----------|-------------------|
| [HOOK] | 12-15 | 4-5s | Scroll-stop + hook promise |
| [SETUP] | 35-45 | 14-18s | Problem agitation + context |
| [MECHANISM] | 40-50 | 16-20s | Full mechanism explanation |
| [PROOF] | 25-30 | 10-12s | Study/testimonial/data |
| [CTA] | 18-22 | 7-9s | Offer summary + action |
| **Subtotal** | **~140-160** | **~60s** | |

**2-3 Minute Script (450 words total):**

| Module | Words | Duration | Content Brief Focus |
|--------|-------|----------|-------------------|
| [HOOK] | 15-20 | 5-8s | Big promise + hook |
| [SETUP] | 80-100 | 30-40s | Problem deep-dive + failed solutions |
| [MECHANISM] | 100-120 | 40-48s | Full mechanism with metaphor + naming |
| [PROOF] | 80-100 | 30-40s | Testimonial cascade + data |
| [CTA] | 60-80 | 24-32s | Offer stack + guarantee + action |
| **Subtotal** | **~380-450** | **~2-3min** | |

### Module Independence Rules

For variant testing, modules must be designed so they can swap independently:

```
RULE 1: [HOOK] modules swap without body changes
  - 5 different hooks paired with the same [SETUP] + [MECHANISM] + [PROOF] + [CTA]
  - The hook-body transition point must be a CLEAN SEAM
  - The [SETUP] module's first sentence must work with ANY hook in the swap set

RULE 2: [CTA] modules swap without body changes
  - 3 different CTAs paired with the same body
  - Urgency CTA: "Limited supply -- get yours before midnight"
  - Risk Reversal CTA: "Try it for 60 days -- if you don't love it, full refund"
  - Low-Friction CTA: "Take the free gut health quiz"

RULE 3: [PROOF] modules swap for different evidence types
  - Testimonial proof vs. data proof vs. authority proof
  - The module before [PROOF] must transition cleanly to ANY proof type

RULE 4: [SETUP] + [MECHANISM] are usually paired
  - These two modules have the tightest coupling
  - Swapping SETUP usually requires swapping MECHANISM too
  - Exception: different problem framings with the same mechanism

RULE 5: CLEAN SEAMS between every module
  - Each module's last sentence and next module's first sentence must be a VALID transition
  - A04 specifies the transition type at each seam (question, statement, contrast, continuation)
```

### The AV Format (Audio-Visual Two-Column)

Every script blueprint specifies both audio and visual intent per module:

```
┌──────────────────────────────────────────┬──────────────────────────────────────────┐
│  VISUAL                                   │  AUDIO                                   │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│  [HOOK MODULE - 3-5s]                     │  [HOOK MODULE - 3-5s]                     │
│  Visual intent: what the viewer SEES      │  Audio intent: what the viewer HEARS      │
│  Shot type direction (CU/MS/WS)          │  Script text / voiceover direction        │
│  Text overlay content                     │  Music/SFX cues                          │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│  [SETUP MODULE - varies]                  │  [SETUP MODULE - varies]                  │
│  Visual intent for this module            │  Audio intent for this module             │
│  ...                                      │  ...                                      │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│  [MECHANISM MODULE - varies]              │  [MECHANISM MODULE - varies]              │
│  Visual intent for this module            │  Audio intent for this module             │
│  ...                                      │  ...                                      │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│  [PROOF MODULE - varies]                  │  [PROOF MODULE - varies]                  │
│  Visual intent for this module            │  Audio intent for this module             │
│  ...                                      │  ...                                      │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│  [CTA MODULE - 3-5s]                      │  [CTA MODULE - 3-5s]                      │
│  Visual intent for this module            │  Audio intent for this module             │
│  Product shot / button overlay            │  CTA script text                         │
└──────────────────────────────────────────┴──────────────────────────────────────────┘
```

**A04 specifies INTENT, not shot-level detail.** The visual column at A04 level says things like:
- "Close-up of food being prepared -- visual surprise when 'healthy' food is X-ed out"
- "Talking head with authority backdrop (lab coat, bookshelf)"
- "Text overlay emphasizing the data stat"
- "Product close-up with ingredient callouts"

A05 (Visual Direction) takes these intents and produces shot-level briefs with camera angles, lighting, transitions, and production specifications.

---

## Pre-Execution Protocol

```
BEFORE ANY A04 EXECUTION:
  1. READ this file (A04-SCRIPT-ARCHITECTURE-AGENT.md) completely
  2. READ AD-ENGINE-CLAUDE.md (The 5 Laws, Script Framework Reference, Word Count Enforcement)
  3. READ A04-SCRIPT-ARCHITECTURE-ANTI-DEGRADATION.md (when it exists)
  4. LOAD AD-SCRIPT-STRUCTURES.md (all 8 frameworks, modular architecture, vertical patterns, UGC templates)
  5. LOAD AD-HOOK-TAXONOMY.md (hook type context for framework matching)
  6. LOAD Soul.md if it exists (project voice constraints)
  7. Proceed to Layer 0
```

---

## MODEL ASSIGNMENT TABLE (Binding)

```
+-------------------------+--------------+----------+----------------------------+
|  PHASE                  |  SKILLS      |  MODEL   |  REASON                    |
+-------------------------+--------------+----------+----------------------------+
|  Pre-Execution          |  Infra       |  haiku   |  File creation, directory  |
|  infrastructure         |              |          |  setup -- mechanical only  |
+-------------------------+--------------+----------+----------------------------+
|  Layer 0                |  0.0.1-0.6   |  haiku   |  Loading, validation,     |
|  foundation             |              |          |  input assembly is        |
|                         |              |          |  mechanical extraction    |
+-------------------------+--------------+----------+----------------------------+
|  Layer 1                |  1.1-1.5     |  opus    |  Framework selection       |
|  framework selection    |              |          |  requires deep reasoning   |
|                         |              |          |  across 5 variables per   |
|                         |              |          |  ad concept               |
+-------------------------+--------------+----------+----------------------------+
|  Layer 2                |  2.1-2.7     |  opus    |  Module design requires   |
|  module design          |              |          |  strategic reasoning about |
|                         |              |          |  content, word count,     |
|                         |              |          |  coherence, mechanism     |
|                         |              |          |  integration              |
+-------------------------+--------------+----------+----------------------------+
|  Layer 2.5              |  2.5.1-2.5.4 |  opus   |  Structural evaluation    |
|  Arena (optional)       |              |          |  of competing script      |
|                         |              |          |  architectures            |
+-------------------------+--------------+----------+----------------------------+
|  Layer 3                |  3.1-3.4     |  opus    |  Variant planning         |
|  variant planning       |              |          |  requires understanding   |
|                         |              |          |  of module dependencies   |
|                         |              |          |  and coherence            |
+-------------------------+--------------+----------+----------------------------+
|  Layer 4                |  4.1-4.3     |  sonnet  |  Assembly and formatting  |
|  output packaging       |              |          |  -- structured packaging, |
|                         |              |          |  not creative reasoning   |
+-------------------------+--------------+----------+----------------------------+
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
  - Defaulting ALL subagents to opus (wastes tokens on loading tasks)
  - Defaulting ALL subagents to haiku (loses quality on framework selection/module design)
  - Omitting the model parameter
  - Changing model mid-task without logging the switch
```

---

## STATE MACHINE

```
IDLE --> LOADING --> FRAMEWORK_SELECTION --> MODULE_DESIGN --> VARIANT_PLANNING --> PACKAGING --> COMPLETE
           |              |                     |                  |                  |
           v              v                     v                  v                  v
        [GATE_0]       [GATE_1]             [GATE_2]           [GATE_3]          [GATE_4]
        PASS/FAIL      PASS/FAIL            PASS/FAIL          PASS/FAIL         PASS/FAIL
           |              |                     |                  |                  |
           +------+-------+---------------------+------------------+---------+--------+
                                                    ^
                                                    |
                                              Max 3 expansion rounds
                                              per gate, then
                                              HUMAN ESCALATION
```

**State Transitions (VALID):**
- IDLE --> LOADING (always allowed)
- LOADING --> FRAMEWORK_SELECTION (only if GATE_0 = PASS)
- FRAMEWORK_SELECTION --> MODULE_DESIGN (only if GATE_1 = PASS)
- MODULE_DESIGN --> VARIANT_PLANNING (only if GATE_2 = PASS)
- VARIANT_PLANNING --> PACKAGING (only if GATE_3 = PASS)
- PACKAGING --> COMPLETE (only if GATE_4 = PASS)

**Optional Arena insertion:**
- MODULE_DESIGN --> ARENA (between Layer 2 and Layer 3, for high-budget campaigns)
- ARENA --> VARIANT_PLANNING (after human selection of winning architectures)

**State Transitions (INVALID -- BLOCKED):**
- LOADING --> MODULE_DESIGN (cannot skip framework selection)
- FRAMEWORK_SELECTION --> VARIANT_PLANNING (cannot skip module design)
- ANY --> PACKAGING without GATE_3 passing
- ANY --> COMPLETE without GATE_4 passing

---

## LAYER ARCHITECTURE

### Pre-Execution: Project Infrastructure

**BEFORE any architecture work begins, the following files MUST exist in the project folder:**

#### 1. Project CLAUDE.md

```markdown
# [Project Name] -- A04 Script Architecture CLAUDE.md

## MANDATORY FIRST READS
1. READ: ./skills/ads/A04-script-architecture/A04-SCRIPT-ARCHITECTURE-ANTI-DEGRADATION.md
2. READ: ./skills/ads/A04-script-architecture/A04-SCRIPT-ARCHITECTURE-AGENT.md
3. READ: This file (project CLAUDE.md)
4. READ: PROJECT-STATE.md (current phase, decisions, next steps)

## AD CONCEPT TARGETS
| Metric | Minimum | Status |
|--------|---------|--------|
| Ad concepts with architectures | [from A03 creative volume plan] | PENDING |
| Word count verification passes | 100% | PENDING |
| Hook-body coherence passes | 100% | PENDING |
| Framework selections documented | 100% | PENDING |
| Module blueprints complete | 100% | PENDING |

## GATE ENFORCEMENT
- Gates are BINARY: PASS or FAIL. No other status exists.
- "PARTIAL_PASS", "close enough to word count", "approximately 30 seconds" -- NONE of these exist.

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)
- "close enough to the word count"
- "the framework doesn't matter that much"
- "we'll fix the hook-body coherence in A07"
- "mechanism can be added later"
- "all scripts can use the same framework"
```

#### 2. PROJECT-STATE.md

```markdown
# [Project Name] -- A04 Script Architecture State

## Current Phase
- Layer: [0/1/2/2.5/3/4]
- Step: [e.g., 1.1 Framework Analysis]
- Status: [IN_PROGRESS / BLOCKED / COMPLETE]

## Architecture Progress
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Ad concepts loaded | 0 | [X] | PENDING |
| Frameworks assigned | 0 | [X] | PENDING |
| Module blueprints designed | 0 | [X] | PENDING |
| Word count verifications | 0 | [X] | PENDING |
| Variant plans designed | 0 | [X] | PENDING |

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
# [Project Name] -- A04 Progress Log
## [Timestamp]
**Phase:** Pre-Execution
**Action:** Project infrastructure created
**Files:** project CLAUDE.md, PROJECT-STATE.md, PROGRESS-LOG.md
**Next:** Begin Layer 0 execution
```

**These 3 files are created at Pre-Execution, BEFORE any Layer 0 skills run.**

---

### Layer 0: Foundation & Loading

**Purpose:** Load all required inputs from upstream skills, validate data completeness, and prepare the context for framework selection and module design.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 0.0.1 | `0.0.1-vertical-profile-loader.md` | Load ad-specific vertical config from `ad-verticals/`. Extract: vertical-specific script structures, dominant formats, compliance constraints, anti-slop rules. | haiku |
| 0.1 | `0.1-upstream-strategic-loader.md` | Load Campaign Brief (09), Root Cause (03), Mechanism (04), Promise (05), Big Idea (06), Offer (07). Extract: big idea statement, mechanism name + explanation, root cause framing, calibrated promise, offer stack summary, guarantee type. | haiku |
| 0.2 | `0.2-hook-angle-matrix-loader.md` | Load A02 HOOK-ANGLE-MATRIX.md. Extract: all human-selected hooks (8-10), hook type classifications, angle attributions, platform recommendations, scoring data, human notes. | haiku |
| 0.3 | `0.3-format-strategy-loader.md` | Load A03 FORMAT-STRATEGY.md. Extract: format assignments per hook (video/static/carousel), platform assignments, target lengths per ad concept, creative volume plan, platform-specific constraints. | haiku |
| 0.4 | `0.4-script-structures-loader.md` | Load `References/AD-SCRIPT-STRUCTURES.md`. Extract: all 8 frameworks with structures, length-specific beat structures, vertical-specific script patterns, modular architecture reference, UGC templates, Harmon Brothers formula. HOLD IN ACTIVE CONTEXT for Layer 1. | haiku |
| 0.5 | `0.5-soul-md-loader.md` | Load project Soul.md if exists. Extract voice constraints that affect script tone and language register. Note: A04 designs architecture, not copy -- but voice constraints inform module content brief direction. | haiku |
| 0.6 | `0.6-input-validator.md` | Validate all required inputs loaded. Campaign Brief exists. A02 output exists with 8+ selected hooks. A03 output exists with format/length assignments. AD-SCRIPT-STRUCTURES.md loaded. Mechanism loaded (required for 60+ second scripts). All validation passes. | haiku |

**Execution Order:**
1. 0.0.1, 0.1, 0.2, 0.3, 0.4, 0.5 run in parallel (independent loading)
2. 0.6 runs after all above complete (validates aggregated inputs)

**Gate 0 -- Layer 0 Complete:**

```yaml
# LAYER_0_COMPLETE.yaml
gate: GATE_0
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  vertical_profile_loaded: true
  campaign_brief_loaded: true
  big_idea_loaded: true
  mechanism_loaded: true
  root_cause_loaded: true
  promise_loaded: true
  offer_loaded: true
  hook_angle_matrix_loaded: true
  selected_hooks_count: "[integer >= 8]"
  format_strategy_loaded: true
  ad_concepts_count: "[integer -- from A03 creative volume plan]"
  script_structures_loaded: true
  soul_md_loaded: "[true/false -- optional but recommended]"
  all_required_inputs: true

microskill_outputs:
  - id: "0.0.1"
    file: "layer-0-outputs/0.0.1-vertical-profile-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.1"
    file: "layer-0-outputs/0.1-upstream-strategic-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.2"
    file: "layer-0-outputs/0.2-hook-angle-matrix-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.3"
    file: "layer-0-outputs/0.3-format-strategy-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.4"
    file: "layer-0-outputs/0.4-script-structures-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.5"
    file: "layer-0-outputs/0.5-soul-md-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.6"
    file: "layer-0-outputs/0.6-input-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF selected_hooks_count < 8: GATE CLOSED -- A02 must provide 8+ selected hooks
IF format_strategy missing: GATE CLOSED -- execute A03 first
IF mechanism missing: GATE CLOSED -- execute Skill 04 first (required for 60s+ scripts)
```

### Schema Validation Reference

Input validators MUST verify field presence — not just file existence — for all consumed handoff files. See `skills/ads/ad-engine-schema-registry.md` for required fields per handoff file.

---

### Layer 1: Framework Selection

**Purpose:** For each ad concept (hook + format + platform + length from A02/A03), select the optimal script framework from the 8 available options. Produce a documented framework assignment with rationale.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 1.1 | `1.1-ad-concept-inventory.md` | Build the complete inventory of ad concepts requiring script architectures. Each concept = selected hook + assigned format + assigned platform + target length. Cross-reference A02 hooks with A03 format assignments. | opus |
| 1.2 | `1.2-framework-analysis-matrix.md` | For each ad concept, analyze the 5 selection variables (hook type, platform, length, vertical, awareness level) and score each framework's fit (1-10). Produce a scored matrix per concept. | opus |
| 1.3 | `1.3-framework-assignments.md` | Select the winning framework per ad concept based on the analysis matrix. Document: selected framework, rationale (citing all 5 variables), alternative frameworks considered, why alternatives were rejected. | opus |
| 1.4 | `1.4-bumper-ad-design.md` | CONDITIONAL: Only execute if any ad concepts are 6-second bumpers. Bumpers don't use standard frameworks. Design single-idea, single-message structures with 10-15 word budgets. | opus |
| 1.5 | `1.5-layer-1-validator.md` | Verify: every ad concept has a framework assignment. Every assignment cites all 5 selection variables. No framework was assigned without rationale. No framework is length-incompatible (e.g., Edutainment for 15s). No framework is platform-incompatible (e.g., Story Narrative for TikTok 15s). | opus |

**Execution Order:**
1. 1.1 runs first (builds the concept inventory)
2. 1.2 runs after 1.1 (analyzes frameworks against concepts)
3. 1.3 runs after 1.2 (makes final assignments)
4. 1.4 runs in parallel with 1.2-1.3 if bumpers exist (independent design track)
5. 1.5 runs after all above complete (validates completeness and correctness)

**Gate 1 -- Framework Selection Complete:**

```yaml
# LAYER_1_COMPLETE.yaml
gate: GATE_1
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  ad_concepts_inventoried: "[integer]"
  framework_assignments_complete: "[integer -- must equal ad_concepts_inventoried]"
  all_assignments_have_rationale: true
  all_assignments_cite_5_variables: true
  no_length_incompatible_assignments: true
  no_platform_incompatible_assignments: true
  bumper_ads_designed: "[integer or 0 if none]"
  validator_ran: true
  validator_verdict: PASS

framework_distribution:
  PAS: "[count]"
  AIDA: "[count]"
  BAB: "[count]"
  Hook_Body_CTA: "[count]"
  Story_Narrative: "[count]"
  Edutainment: "[count]"
  UGC_DR: "[count]"
  Fast_Paced_Viral: "[count]"
  Bumper: "[count]"

microskill_outputs:
  - id: "1.1"
    file: "layer-1-outputs/1.1-ad-concept-inventory.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      concepts_inventoried: "[integer]"
  - id: "1.2"
    file: "layer-1-outputs/1.2-framework-analysis-matrix.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.3"
    file: "layer-1-outputs/1.3-framework-assignments.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.4"
    file: "layer-1-outputs/1.4-bumper-ad-design.md"
    size_bytes: "[integer -- 0 if no bumpers]"
    minimum_met: true
    executed: "[true/false]"
  - id: "1.5"
    file: "layer-1-outputs/1.5-layer-1-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF any concept missing framework: GATE CLOSED -- assign framework
IF any assignment lacks rationale: GATE CLOSED -- document rationale
IF length-incompatible assignment detected: GATE CLOSED -- reassign
IF platform-incompatible assignment detected: GATE CLOSED -- reassign
```

---

### Layer 2: Module Design

**Purpose:** For each ad concept with an assigned framework, design the complete module sequence. Specify content briefs per module, word count budgets, visual intent, transition types, and mechanism integration points.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 2.1 | `2.1-module-sequence-design.md` | For each ad concept, map the framework's structure to the 5 standard modules. Determine which modules appear at this length. Define module sequence order. Specify word count budget per module (MUST sum to target length). | opus |
| 2.2 | `2.2-hook-module-briefs.md` | Design the [HOOK] module content brief for each ad concept. Specify: the selected hook text (from A02), how it opens (text overlay, spoken, visual action), the transition point to [SETUP] (clean seam design). | opus |
| 2.3 | `2.3-setup-module-briefs.md` | Design the [SETUP] module content brief for each ad concept. Specify: what problem/context to establish, how it connects to the hook's promise, root cause framing (from Skill 03), awareness level bridging, word count target. Verify: setup fulfills the hook's promise. | opus |
| 2.4 | `2.4-mechanism-module-briefs.md` | Design the [MECHANISM] module content brief for each ad concept. For 60+ second ads: full mechanism integration with naming moment, metaphor anchor, "why this works" explanation adapted from Skill 04. For 30-second ads: compressed mechanism hint (10-15 words). For 15-second ads: mechanism omitted (noted). Specify how the mechanism serves the hook's angle. | opus |
| 2.5 | `2.5-proof-module-briefs.md` | Design the [PROOF] module content brief for each ad concept. Select proof type (testimonial, data stat, demonstration, authority citation, social proof number). Specify which proof element from Proof Inventory (Skill 02) to use. Design for the proof type that best serves the hook's angle. | opus |
| 2.6 | `2.6-cta-module-briefs.md` | Design the [CTA] module content brief for each ad concept. Specify 3 CTA variants per concept: (a) urgency CTA, (b) risk reversal CTA, (c) low-friction CTA. Each CTA must be specific to the offer (from Skill 07) and funnel stage. Match CTA style to platform norms. Word count budget per CTA. | opus |
| 2.7 | `2.7-av-format-blueprints.md` | Assemble the complete AV (Audio-Visual) two-column blueprint for each ad concept. Left column: visual intent per module. Right column: audio intent per module. Module boundaries clearly marked. Transition types specified at each seam. | opus |

**Execution Order:**
1. 2.1 runs first (establishes module sequences and word budgets)
2. 2.2, 2.3, 2.4, 2.5, 2.6 run in parallel after 2.1 (independent module design using word budgets from 2.1)
3. 2.7 runs after 2.2-2.6 complete (assembles modules into AV blueprints)

**MANDATORY WORD COUNT VERIFICATION (After every module design):**

```
+-------------------------------------------------------------------------+
|  WORD COUNT VERIFICATION -- [Ad Concept ID]                              |
|                                                                          |
|  Target Length: [X] seconds                                              |
|  Target Words: [Y] words (from AD-ENGINE-CLAUDE.md enforcement table)   |
|                                                                          |
|  +-------------------------------------------------------------------+  |
|  | MODULE       | BUDGET | ACTUAL | STATUS   | DELTA                 |  |
|  +-------------------------------------------------------------------+  |
|  | [HOOK]       | [X]    | [X]    | PASS/FAIL | [+/- words]          |  |
|  | [SETUP]      | [X]    | [X]    | PASS/FAIL | [+/- words]          |  |
|  | [MECHANISM]  | [X]    | [X]    | PASS/FAIL | [+/- words]          |  |
|  | [PROOF]      | [X]    | [X]    | PASS/FAIL | [+/- words]          |  |
|  | [CTA]        | [X]    | [X]    | PASS/FAIL | [+/- words]          |  |
|  +-------------------------------------------------------------------+  |
|  | TOTAL        | [Y]    | [Z]    | PASS/FAIL | [Y-Z]                |  |
|  +-------------------------------------------------------------------+  |
|                                                                          |
|  TOLERANCE: Total within +/- 5% of target. Any module within +/- 20%.  |
|  OVERALL: [PASS -- proceed] or [FAIL -- rebalance word budgets]        |
+-------------------------------------------------------------------------+
```

**IF OVERALL = FAIL:** Rebalance module word budgets before proceeding. Do NOT advance over-length scripts.

**MANDATORY HOOK-BODY COHERENCE CHECK (After every AV blueprint):**

```
+-------------------------------------------------------------------------+
|  HOOK-BODY COHERENCE CHECK -- [Ad Concept ID]                            |
|                                                                          |
|  Hook: "[hook text]"                                                     |
|  Hook Type: [type code]                                                  |
|  Angle: "[angle statement]"                                              |
|                                                                          |
|  +-------------------------------------------------------------------+  |
|  | QUESTION                                      | ANSWER | STATUS   |  |
|  +-------------------------------------------------------------------+  |
|  | Does the hook make a promise?                  | [Y/N]  | --       |  |
|  | Does [SETUP] begin fulfilling within 5 seconds?| [Y/N]  | PASS/FAIL|  |
|  | Does [MECHANISM] match hook's specificity?      | [Y/N]  | PASS/FAIL|  |
|  | Does the script lead to the big idea?           | [Y/N]  | PASS/FAIL|  |
|  | Would a viewer feel the body was for them?      | [Y/N]  | PASS/FAIL|  |
|  +-------------------------------------------------------------------+  |
|                                                                          |
|  OVERALL: [PASS -- all 4 checks pass] or [FAIL -- redesign modules]    |
+-------------------------------------------------------------------------+
```

**IF OVERALL = FAIL:** Redesign the failing modules. Do NOT advance disconnected scripts.

**Gate 2 -- Module Design Complete:**

```yaml
# LAYER_2_COMPLETE.yaml
gate: GATE_2
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  ad_concepts_with_blueprints: "[integer -- must equal concepts from Layer 1]"
  all_module_sequences_defined: true
  all_word_count_verifications_pass: true
  all_hook_body_coherence_checks_pass: true
  all_av_blueprints_complete: true
  mechanism_integrated_60s_plus: true
  cta_variants_per_concept: "[integer >= 3]"
  all_hook_modules_have_clean_seams: true
  all_cta_modules_have_3_variants: true

word_count_summary:
  total_scripts: "[integer]"
  all_within_tolerance: true
  any_over_length: "[list or 'none']"

coherence_summary:
  total_checks: "[integer]"
  all_pass: true
  any_disconnect: "[list or 'none']"

microskill_outputs:
  - id: "2.1"
    file: "layer-2-outputs/2.1-module-sequence-design.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.2"
    file: "layer-2-outputs/2.2-hook-module-briefs.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.3"
    file: "layer-2-outputs/2.3-setup-module-briefs.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.4"
    file: "layer-2-outputs/2.4-mechanism-module-briefs.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.5"
    file: "layer-2-outputs/2.5-proof-module-briefs.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.6"
    file: "layer-2-outputs/2.6-cta-module-briefs.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.7"
    file: "layer-2-outputs/2.7-av-format-blueprints.md"
    size_bytes: "[integer]"
    minimum_met: true

IF any word count verification fails: GATE CLOSED -- rebalance word budgets
IF any hook-body coherence fails: GATE CLOSED -- redesign failing modules
IF mechanism missing from 60s+ scripts: GATE CLOSED -- integrate mechanism
IF any concept has fewer than 3 CTA variants: GATE CLOSED -- design additional CTAs
```

---

### Layer 2.5: Script Architecture Arena (OPTIONAL)

**Purpose:** For high-budget campaigns or campaigns with 5+ ad concepts, run competing structural variants through Arena evaluation. This tests whether different framework choices or module designs produce stronger architectures for the same hook.

**Trigger Conditions:**
- Human requests Arena evaluation for script architectures
- Campaign has 5+ ad concepts (structural decisions have high variance)
- High-budget campaign where architecture quality directly impacts ROI

**If Arena is NOT triggered, skip to Layer 3.**

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 2.5.1 | `2.5.1-alternative-architecture-generation.md` | For each ad concept entering Arena, generate 2-3 alternative architectures: different framework selection, different module emphasis, different mechanism integration approach. Each alternative must be structurally valid (pass word count and coherence checks). | opus |
| 2.5.2 | `2.5.2-architecture-scoring.md` | Score each architecture variant on 5 criteria: (1) Hook-body coherence strength, (2) Mechanism integration quality, (3) Variant testability (how many modules swap independently), (4) Platform nativeness of structure, (5) Persuasion sequence logic. Weighted composite. | opus |
| 2.5.3 | `2.5.3-architecture-selection.md` | Present scored architectures to human. Human selects winning architecture per concept. Capture selections and notes. BLOCKING gate. | opus |
| 2.5.4 | `2.5.4-arena-validator.md` | Verify all selections captured. Update ad concept inventory with selected architectures. Ensure all winning architectures pass word count and coherence checks. | opus |

**Arena Scoring Criteria (A04-specific):**

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| **Hook-Body Coherence** | 30% | Does the architecture perfectly bridge the hook to the body? |
| **Mechanism Integration** | 20% | Is the mechanism naturally woven into the structure? |
| **Variant Testability** | 20% | How many modules swap independently? More = better for testing. |
| **Platform Nativeness** | 15% | Does the structure feel natural on the target platform? |
| **Persuasion Sequence** | 15% | Does the module order create optimal persuasion flow? |

**Gate 2.5 -- Arena Complete (if triggered):**

```yaml
# GATE_2.5_COMPLETE.yaml
gate: GATE_2.5
status: PASS
timestamp: "[ISO 8601]"
arena_triggered: true
concepts_in_arena: "[integer]"
alternatives_generated: "[integer]"
human_selections_received: true
all_winning_architectures_valid: true
```

---

### Layer 3: Variant Planning

**Purpose:** Plan which modules are swappable for variant testing. Identify hook swap groups, CTA swap groups, and proof swap groups. Calculate the total variant matrix per concept.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 3.1 | `3.1-hook-swap-groups.md` | For each ad concept, identify which additional hooks (from the full A02 bank, not just the 8-10 selected) can share the same body. Group hooks by body compatibility. Verify: each swap hook's promise is fulfilled by the body (coherence check). Design the clean seam: the transition sentence that works with ANY hook in the group. Target: 3-5 compatible hooks per body. | opus |
| 3.2 | `3.2-cta-swap-groups.md` | For each ad concept, verify the 3 CTA variants designed in Layer 2.6 are truly independent. Verify: each CTA works with the same [PROOF] module exit. Design CTA swap points. Add 1-2 additional CTA variants if the concept supports them (e.g., quiz CTA, free sample CTA). | opus |
| 3.3 | `3.3-proof-swap-groups.md` | For each ad concept, identify alternative proof elements that could replace the primary proof module. Design 2-3 proof swap options: (a) testimonial proof, (b) data/study proof, (c) demonstration proof. Verify: each proof option works with the same [MECHANISM] module exit and [CTA] module entry. | opus |
| 3.4 | `3.4-variant-matrix-calculator.md` | Calculate the total variant count per concept: hooks x bodies x CTAs x proof options. Aggregate across all concepts. Produce the campaign-level variant matrix. Verify minimum variant count meets AD-ENGINE-CLAUDE.md thresholds (3 concepts x 5 hooks x 2 visuals x 3 CTAs = 90 target). | opus |

**Execution Order:**
1. 3.1, 3.2, 3.3 run in parallel (independent swap group analysis)
2. 3.4 runs after all above complete (calculates variant totals)

**Gate 3 -- Variant Planning Complete:**

```yaml
# LAYER_3_COMPLETE.yaml
gate: GATE_3
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  hook_swap_groups_defined: true
  avg_hooks_per_swap_group: "[float >= 3.0]"
  all_swap_hooks_pass_coherence: true
  cta_swap_groups_defined: true
  min_cta_variants_per_concept: "[integer >= 3]"
  proof_swap_groups_defined: true
  min_proof_variants_per_concept: "[integer >= 2]"
  variant_matrix_calculated: true
  total_campaign_variants: "[integer]"
  meets_minimum_threshold: "[true if >= 30]"

variant_matrix:
  concepts: "[integer]"
  avg_hooks_per_concept: "[float]"
  avg_ctas_per_concept: "[float]"
  avg_proofs_per_concept: "[float]"
  total_estimated_variants: "[integer]"

microskill_outputs:
  - id: "3.1"
    file: "layer-3-outputs/3.1-hook-swap-groups.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      swap_groups_defined: "[integer]"
      avg_hooks_per_group: "[float]"
  - id: "3.2"
    file: "layer-3-outputs/3.2-cta-swap-groups.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.3"
    file: "layer-3-outputs/3.3-proof-swap-groups.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.4"
    file: "layer-3-outputs/3.4-variant-matrix-calculator.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      total_variants: "[integer]"

IF avg_hooks_per_swap_group < 3.0: GATE CLOSED -- expand hook swap groups
IF any swap hooks fail coherence: GATE CLOSED -- remove or redesign
IF total_campaign_variants < 30: GATE CLOSED -- expand variant opportunities
```

---

### Layer 4: Output Packaging

**Purpose:** Assemble all Layer 1-3 outputs into the primary deliverable: SCRIPT-ARCHITECTURE-PACKAGE.md.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 4.1 | `4.1-package-assembler.md` | Assemble SCRIPT-ARCHITECTURE-PACKAGE.md from all Layer 1-3 outputs. Include all required sections (see Output Schema below). Minimum size: 40KB. Use chunked assembly if needed. | sonnet |
| 4.2 | `4.2-execution-log.md` | Produce execution-log.md with per-microskill entries. Each entry: spec file read confirmation, output file created, output file size, key metrics, gate status. | sonnet |
| 4.3 | `4.3-checkpoint-files.md` | Create all checkpoint YAML files. Verify all output files exist with sizes. Create LAYER_4_COMPLETE.yaml. | sonnet |

**Execution Order:**
1. 4.1 first (primary deliverable)
2. 4.2 after 4.1 (logs assembly process)
3. 4.3 after 4.2 (final checkpoint)

**Gate 4 -- Layer 4 Complete (Skill Complete):**

```yaml
# LAYER_4_COMPLETE.yaml
gate: GATE_4
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  package_file_exists: true
  package_file_path: "SCRIPT-ARCHITECTURE-PACKAGE.md"
  package_file_size_kb: "[integer >= 40]"
  all_sections_populated: true
  execution_log_exists: true
  all_checkpoint_files_exist: true

IF package_file_size_kb < 40: GATE CLOSED -- expand output detail
IF any section missing or empty: GATE CLOSED -- complete missing sections
```

---

## OUTPUT SCHEMA: SCRIPT-ARCHITECTURE-PACKAGE.md

**Minimum size: 40KB.** This is a comprehensive architecture document with per-concept blueprints, not a summary.

### Required Sections

```markdown
# SCRIPT-ARCHITECTURE-PACKAGE.md

## Metadata
- Project: [name]
- Date: [ISO 8601]
- Ad Concepts Architected: [integer]
- Total Variant Matrix Size: [integer]
- Frameworks Used: [list with counts]

## Section 1: Ad Concept Inventory
- Complete list of all ad concepts (hook + format + platform + length)
- Cross-reference: A02 Hook ID, A03 Format Assignment, framework selection
- Organized by concept group (concepts sharing the same angle)

## Section 2: Framework Assignments
- Per-concept framework selection with rationale
- 5-variable analysis per concept (hook type, platform, length, vertical, awareness)
- Framework distribution summary across the campaign
- Alternatives considered and why rejected

## Section 3: Module Blueprints (Per Concept)
- For EACH ad concept:
  - Module sequence: which modules appear at this length
  - Word count budget per module (with verification total)
  - Content brief per module:
    - [HOOK]: Hook text, opening method, transition to [SETUP]
    - [SETUP]: Problem/context to establish, root cause connection, hook fulfillment
    - [MECHANISM]: Mechanism integration (full/compressed/omitted with rationale)
    - [PROOF]: Proof type, specific proof element, integration approach
    - [CTA]: 3 CTA variants with emotional appeal and funnel stage
  - AV format blueprint (two-column visual + audio intent per module)
  - Module transition types at each seam
  - Hook-body coherence verification result

## Section 4: Word Count Verification Table
- Per-concept word count verification (module-level and total)
- Summary: how many concepts pass, how many required rebalancing
- Any concepts flagged for length concerns

## Section 5: Mechanism Integration Guide
- How the campaign mechanism (Skill 04) is adapted per ad length:
  - 6s: Not included (mechanism-free)
  - 15s: Not included (mechanism-free)
  - 30s: Compressed hint (10-15 words, the "why" in one sentence)
  - 60s: Full integration with naming moment and metaphor anchor
  - 2-3min: Extended with proof integration and "think about it" moment
- Mechanism naming decision: does the mechanism name appear in ad or is it implied?
- Mechanism simplification for ad context (12-year-old test compressed further)

## Section 6: CTA Variant Library
- All CTA variants across all concepts, organized by type:
  - Urgency CTAs (limited time, limited supply, deadline)
  - Risk Reversal CTAs (guarantee, free trial, money-back)
  - Low-Friction CTAs (quiz, guide, free sample, learn more)
  - Authority CTAs (expert recommendation, "doctor-approved")
  - Social Proof CTAs (join X customers, best-seller)
- Per-concept CTA assignment (which 3 variants per concept)
- Platform-specific CTA notes (TikTok "link in bio" vs. Meta "Shop Now" button)

## Section 7: Variant Swap Plan
- Hook swap groups: which hooks share which bodies
  - Per group: body description, compatible hooks, clean seam design
- CTA swap groups: which CTAs interchange per concept
- Proof swap groups: alternative proof modules per concept
- Variant matrix per concept: hooks x CTAs x proofs = total
- Campaign-level variant matrix: sum of all concept matrices

## Section 8: Platform-Specific Architecture Notes
- Per platform, any structural considerations:
  - TikTok: vertical 9:16, hook in first frame, text overlay required, sound-on assumed
  - Meta: sound-off optimization, text overlay strategy, hook in first 3 seconds
  - YouTube pre-roll: value before 5-second skip, longer format acceptable
  - Reels/Shorts: matching TikTok constraints, cross-platform optimization
  - Google Display: static/text-heavy, no AV structure needed

## Section 9: Downstream Handoff Notes
- For A05 (Visual Direction): visual intent summaries per module per concept
- For A07 (Copy Production): content brief summaries per module per concept
- For A09 (Assembly): variant swap plan with clean seam specifications
- Any human notes from A02/A03 that constrain downstream execution
```

---

## GATE ARCHITECTURE -- COMPLETE REFERENCE

### Gate Summary Table

| Gate | Location | Blocks | Key Criteria | Expansion Protocol |
|------|----------|--------|--------------|-------------------|
| GATE_0 | Layer 0 --> Layer 1 | Framework selection | All inputs loaded. A02 hooks loaded (8+). A03 format strategy loaded. Script Structures loaded. | Fix missing inputs |
| GATE_1 | Layer 1 --> Layer 2 | Module design | Every concept has framework assignment with rationale. No incompatible assignments. | Reassign frameworks |
| GATE_2 | Layer 2 --> Layer 3 | Variant planning | All blueprints complete. All word counts pass. All coherence checks pass. 3+ CTA variants per concept. | Rebalance / redesign |
| GATE_2.5 | Arena --> Layer 3 (optional) | Variant planning | Human selected winning architectures. All selections valid. | N/A -- human gate |
| GATE_3 | Layer 3 --> Layer 4 | Output packaging | Variant swap groups defined. Coherence verified for swap hooks. Variant count >= 30. | Expand swap groups |
| GATE_4 | Skill completion | Downstream consumption | SCRIPT-ARCHITECTURE-PACKAGE.md exists at 40KB+. All sections populated. | Expand output |

### Structural Checkpoint Files

```
[project]/A04-script-architecture/checkpoints/
  LAYER_0_COMPLETE.yaml
  LAYER_1_COMPLETE.yaml
  LAYER_2_COMPLETE.yaml
  LAYER_2.5_COMPLETE.yaml       (only if Arena triggered)
  LAYER_3_COMPLETE.yaml
  LAYER_4_COMPLETE.yaml
```

**IF checkpoint file does not exist, the next layer is BLOCKED.**

### Gate Failure Response Protocol

```
GATE FAILED --> DO NOT proceed. DO NOT invent new gate statuses.
Gate status can ONLY be PASS or FAIL.

EXPANSION ROUND 1:
  1. IDENTIFY which metrics failed
  2. For framework failures: re-analyze using 5-variable matrix
  3. For word count failures: rebalance module budgets
  4. For coherence failures: redesign modules to match hook promise
  5. UPDATE PROJECT-STATE.md
  6. Re-run validation
  7. IF PASS --> proceed. IF FAIL --> ROUND 2.

EXPANSION ROUND 2:
  1. IDENTIFY REMAINING deficits
  2. For persistent word count failures: simplify module content
  3. For persistent coherence failures: consider different framework
  4. For variant count failures: expand hook swap groups
  5. UPDATE PROJECT-STATE.md
  6. Re-run validation
  7. IF PASS --> proceed. IF FAIL --> ROUND 3.

EXPANSION ROUND 3:
  1. IDENTIFY REMAINING deficits
  2. Use all available approaches
  3. UPDATE PROJECT-STATE.md
  4. Re-run validation
  5. IF PASS --> proceed. IF FAIL --> ESCALATE TO HUMAN.

HUMAN ESCALATION (only after ALL 3 rounds):
  Present: exact metrics vs targets, what was tried, specific structural conflicts.
  Options: (a) approve with documented tradeoffs, (b) modify constraints,
           (c) change hook selections, (d) adjust target lengths.
```

### Forbidden Rationalizations (IMMEDIATE HALT)

```
+--------------------------------------------------------------------------+
|  IF ANY OF THESE PHRASES APPEAR IN GATE REASONING, THE GATE CHECK         |
|  IS INVALID AND EXECUTION MUST HALT IMMEDIATELY.                          |
+--------------------------------------------------------------------------+
```

| Rationalization | Why Forbidden | Required Response |
|-----------------|---------------|-------------------|
| "close enough to the word count" | Word counts are physics. 85 words is not 75. | HALT -- rebalance to hit exact target |
| "the framework doesn't really matter" | Framework determines persuasion sequence. Wrong framework = wrong structure. | HALT -- analyze 5 variables properly |
| "we'll fix coherence in A07" | A07 writes copy from A04's blueprint. If the blueprint is disconnected, the copy will be disconnected. | HALT -- fix coherence NOW |
| "mechanism isn't needed for this ad" | For 60+ seconds, mechanism is mandatory. For shorter, the omission must be documented. | HALT -- integrate mechanism or document omission |
| "all concepts can use PAS" | If all concepts have the same framework, the 5-variable analysis wasn't done. | HALT -- analyze each concept independently |
| "visual intent can wait for A05" | A04 specifies visual INTENT (what the visual does). A05 specifies visual DETAIL (how it's shot). | HALT -- specify visual intent per module |
| "3 CTAs is excessive" | Minimum 3 CTA variants per concept. More = better testing. | HALT -- design all 3 variants |
| "approximately 60 seconds" | Scripts are exact lengths with exact word counts. | HALT -- verify exact word count |
| "partial pass" / "conditional pass" | Does not exist. Gates are binary. | HALT -- gates are PASS or FAIL |
| "hook-body coherence is subjective" | Coherence is validated with 5 specific questions. All must pass. | HALT -- answer the 5 questions |

---

## ANTI-DEGRADATION ENFORCEMENT

### Session Startup Protocol (MANDATORY)

```
BEFORE executing ANY A04 skill:
  1. READ: A04-SCRIPT-ARCHITECTURE-ANTI-DEGRADATION.md (full file, when it exists)
  2. READ: A04-SCRIPT-ARCHITECTURE-AGENT.md (this file)
  3. READ: PROJECT-STATE.md (current phase and progress)
  4. VERIFY: Which layer are you in? What gate must pass next?
  5. VERIFY: How many ad concepts need architectures?

  IF you have NOT read the anti-degradation file:
    +----------------------------------------------------------------------+
    |  STRUCTURAL BLOCK: ANTI-DEGRADATION NOT READ                          |
    |                                                                        |
    |  You CANNOT execute A04 skills without reading the anti-               |
    |  degradation file. This is not optional.                              |
    |                                                                        |
    |  ACTION: READ A04-SCRIPT-ARCHITECTURE-ANTI-DEGRADATION.md first.     |
    +----------------------------------------------------------------------+
    HALT -- DO NOT PROCEED
```

### Specific Anti-Degradation Rules for A04

```
RULE 1: WORD COUNTS ARE EXACT. 75 IS NOT 90.
  A 30-second script = 75 words maximum. Not "approximately 75."
  Not "80 is close enough." Count every word. Verify the count.
  Word count is checked BEFORE any quality assessment.

RULE 2: FRAMEWORK SELECTION IS ANALYTICAL, NOT ARBITRARY.
  Every framework assignment must cite all 5 selection variables.
  "I'll use PAS" without analysis is a protocol violation.
  "All concepts use Hook-Body-CTA" means the analysis wasn't done.

RULE 3: HOOK-BODY COHERENCE IS STRUCTURAL, NOT OPTIONAL.
  Every hook-to-body mapping must answer 5 coherence questions.
  "The coherence is fine" without answering the questions is forbidden.
  Disconnected scripts are caught HERE, not in A07.

RULE 4: MODULES ARE INDEPENDENT. SCRIPTS ARE NOT.
  Each module must be swappable (independent for testing).
  But within a script, modules must flow (coherent for the viewer).
  "Clean seam" design at every module boundary is required.

RULE 5: MECHANISM IS MANDATORY FOR 60+ SECONDS.
  For 60-second and longer ads, the [MECHANISM] module must contain
  the campaign's unique mechanism adapted for ad length.
  "We'll add mechanism later" is not acceptable.
  For 30-second ads, a compressed hint is required.
  For 15-second and shorter, documented omission is acceptable.

RULE 6: 3 CTA VARIANTS MINIMUM PER CONCEPT.
  Every ad concept must have at least 3 CTA variants:
  urgency, risk reversal, and low-friction.
  "One CTA is enough" is never acceptable.
  CTAs must be specific to the offer and funnel stage.

RULE 7: VISUAL INTENT IS NOT AN AFTERTHOUGHT.
  Every module in every AV blueprint must specify visual intent.
  "Show product" is NOT visual intent. "Product close-up with
  ingredient callouts while voiceover explains mechanism" IS.
  A05 creates shot-level detail; A04 specifies what the visual DOES.

RULE 8: VARIANT PLANNING IS STRUCTURAL.
  Hook swap groups must be defined with coherence verification.
  "Any hook can go with any body" is false -- coherence varies.
  Each swap must be validated. Non-coherent swaps are excluded.
```

### A04-Specific MC-CHECK (Every 30 minutes during execution)

```yaml
A04-MC-CHECK:
  current_layer: "[0/1/2/2.5/3/4]"
  concepts_architected: "[count]"
  concepts_remaining: "[count]"

  framework_selection:
    all_assignments_use_5_variables: "[Y/N]"
    any_arbitrary_assignments: "[Y/N]"
    framework_diversity_reasonable: "[Y/N]"

  word_count:
    all_scripts_verified: "[Y/N]"
    any_over_length: "[Y/N]"
    any_under_length: "[Y/N]"

  coherence:
    all_hook_body_checks_done: "[Y/N]"
    any_disconnects: "[Y/N]"

  mechanism:
    all_60s_plus_have_mechanism: "[Y/N]"
    mechanism_adapted_per_length: "[Y/N]"

  am_i_using_same_framework_for_everything: "[Y/N]"
  am_i_skipping_word_count_verification: "[Y/N]"
  am_i_thinking_close_enough_on_word_count: "[Y/N]"
  am_i_leaving_visual_column_vague: "[Y/N]"
  am_i_designing_only_one_cta: "[Y/N]"
  am_i_skipping_coherence_checks: "[Y/N]"

  IF any rationalization detected: "HALT -- re-read anti-degradation rules"
  IF any over-length scripts: "REBALANCE -- compress before proceeding"
  IF any disconnects: "REDESIGN -- fix coherence before proceeding"
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce its own dedicated output file. File existence is binary verification. File contents enable quality audit.

### Output File Naming Convention

```
[project]/A04-script-architecture/layer-[N]-outputs/[microskill-id]-[short-name].md

Examples:
  A04-script-architecture/layer-0-outputs/0.0.1-vertical-profile-loader.md
  A04-script-architecture/layer-0-outputs/0.1-upstream-strategic-loader.md
  A04-script-architecture/layer-1-outputs/1.1-ad-concept-inventory.md
  A04-script-architecture/layer-1-outputs/1.2-framework-analysis-matrix.md
  A04-script-architecture/layer-2-outputs/2.1-module-sequence-design.md
  A04-script-architecture/layer-2-outputs/2.7-av-format-blueprints.md
  A04-script-architecture/layer-3-outputs/3.1-hook-swap-groups.md
  A04-script-architecture/layer-3-outputs/3.4-variant-matrix-calculator.md
  A04-script-architecture/layer-4-outputs/4.1-package-assembler.md
```

### Minimum File Size Thresholds

| Microskill Type | Minimum Size | Examples |
|-----------------|-------------|---------|
| **Loader/Validator** (Layer 0) | 1KB | Input verification, upstream loading |
| **Concept Inventory** (Layer 1) | 3KB | Ad concept inventory with cross-references |
| **Framework Analysis** (Layer 1) | 5KB | 5-variable analysis per concept |
| **Module Design** (Layer 2) | 5KB per module type | Hook briefs, setup briefs, mechanism briefs |
| **AV Blueprints** (Layer 2) | 8KB | Complete two-column blueprints |
| **Variant Planning** (Layer 3) | 5KB per group type | Hook swaps, CTA swaps, proof swaps |
| **Variant Matrix** (Layer 3) | 3KB | Campaign-level variant calculation |
| **Package Assembly** (Layer 4) | 40KB | SCRIPT-ARCHITECTURE-PACKAGE.md |

### Required Section Headers Per Output

Every per-microskill output file MUST contain:

```markdown
# [Microskill ID]: [Microskill Name]
## Execution Context
- Skill: A04 -- Script Architecture
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

## SUBAGENT CONTEXT TEMPLATE

**Every subagent spawned by the A04 orchestrator MUST receive this structured context. Ad-hoc prompts like "design a script" are FORBIDDEN.**

```
+--------------------------------------------------------------------------+
|  SUBAGENT CONTEXT TEMPLATE -- ALL 8 SECTIONS MANDATORY                    |
|  Do NOT spawn a subagent without all 8 sections populated.               |
|  Ad-hoc prompts produce ad-hoc results.                                  |
+--------------------------------------------------------------------------+

## 1. MODEL
[haiku | sonnet | opus -- from Binding Model Assignment Table]

## 2. PERSONA
[Task-specific persona from the Persona Library below]

## 3. OBJECTIVE
[Exact task description -- what this subagent must produce]

## 4. ARCHITECTURE TARGETS
[Exact metrics this subagent must hit]
- Ad concepts to architect: [count or specific IDs]
- Word count limits: [per length]
- Framework constraints: [any pre-assigned frameworks]
- Module requirements: [which modules per length]

## 5. INPUTS
[Exact file paths the subagent must read]
- A02 Hook-Angle Matrix: [path]
- A03 Format Strategy: [path]
- AD-SCRIPT-STRUCTURES.md: [path]
- Campaign strategic outputs: [paths]

## 6. CONSTRAINTS
[Skill-specific rules that apply to this subagent]
- Word count enforcement (exact, not approximate)
- Hook-body coherence (5 questions must pass)
- Framework-to-5-variable matching (mandatory)
- Mechanism integration requirements by length

## 7. VERIFICATION REQUIREMENTS
[What the subagent must verify before claiming completion]
- Word count verification table (per module, per concept)
- Hook-body coherence check (per concept)
- Framework rationale documentation (per concept)

## 8. OUTPUT FORMAT
[Exact output file path and required structure]
- Output file: [path]
- Required sections: [list]
- Minimum size: [X]KB
```

### Subagent Persona Library

#### PERSONA_FRAMEWORK_ANALYST (Skills 1.1-1.5)

```
You are a script framework analyst who matches ad concepts to optimal script
frameworks using a systematic 5-variable analysis: hook type, platform, ad
length, vertical, and awareness level. You do NOT guess frameworks. You do
NOT default to PAS for everything. You analyze EACH concept independently
against ALL 8 available frameworks and select the best match with documented
rationale.

Your analysis must cite all 5 variables for every assignment. "PAS because
it's a good framework" is NOT rationale. "PAS because: (1) hook type C2
is pain-focused, (2) Meta feed rewards problem-agitation, (3) 30 seconds
is PAS sweet spot, (4) health vertical uses PAS for symptom hooks, (5)
problem-aware audience needs agitation before solution" IS rationale.
```

#### PERSONA_MODULE_ARCHITECT (Skills 2.1-2.7)

```
You are a modular script architect who designs ad scripts as independent,
swappable modules. Every script you design follows the [HOOK] + [SETUP] +
[MECHANISM] + [PROOF] + [CTA] pattern with exact word count budgets per
module. You think in TWO COLUMNS: audio AND visual.

You are obsessed with two things: WORD COUNT PRECISION and HOOK-BODY
COHERENCE. Every module has a word budget that sums to the target length.
You count words. You verify totals. And every hook's promise is fulfilled
by the body -- you check this with 5 specific questions before signing off.

You design CONTENT BRIEFS, not copy. You tell A07 WHAT each module must
communicate, not the exact words. Your output is a BLUEPRINT that a
copywriter follows, not a finished script.
```

#### PERSONA_VARIANT_PLANNER (Skills 3.1-3.4)

```
You are a variant testing strategist who identifies which script modules
can be swapped independently for A/B testing. You think combinatorially:
5 hooks x 3 CTAs x 2 proofs = 30 variants from one concept.

Your job is to maximize testable combinations while maintaining coherence.
Not every hook can pair with every body -- you verify each swap with a
coherence check. You design "clean seams" at module boundaries so modules
snap together without awkward transitions.

You are NOT a copywriter. You are a testing architect. Your output is a
VARIANT MAP that tells A09 (Assembly) exactly which modules interchange.
```

---

## FORBIDDEN BEHAVIORS (A04-Specific)

### Framework Selection Failures
1. Assigning frameworks without analyzing the 5 selection variables
2. Using the same framework for every ad concept ("all PAS")
3. Assigning Edutainment to a 15-second ad (length-incompatible)
4. Assigning Story Narrative to a 6-second bumper (length-incompatible)
5. Assigning Fast-Paced Viral to a 3-minute YouTube ad (length-incompatible)
6. Not documenting why alternative frameworks were rejected
7. Changing framework assignment after Gate 1 without re-validating downstream modules

### Word Count Failures
8. Accepting scripts over the word count limit for target length
9. Not counting words per module (only checking total)
10. "Close enough" to word count (word counts are exact)
11. "Approximately 30 seconds" (lengths are exact)
12. Module word budgets that don't sum to target total
13. Not running the word count verification table for EVERY concept

### Coherence Failures
14. Not running the 5-question hook-body coherence check for every concept
15. Hook promising X but body delivering Y (disconnect type 1)
16. Hook-body coherence "seems fine" without answering the 5 specific questions
17. Advancing disconnected scripts to downstream skills
18. Ignoring the hook's angle when designing the body modules

### Module Design Failures
19. Writing finished copy instead of content briefs (A04 architects, A07 writes)
20. Visual column left vague ("Show product" without intent specification)
21. Missing clean seam design at module boundaries
22. [MECHANISM] module missing from 60+ second scripts
23. Fewer than 3 CTA variants per concept
24. CTA variants that are identical except for one word ("Buy now" vs. "Shop now")
25. Modules that can't swap independently (too tightly coupled to adjacent modules)

### Variant Planning Failures
26. Claiming "any hook works with any body" without coherence verification
27. Hook swap groups with fewer than 3 compatible hooks (minimum)
28. Variant matrix calculation that doesn't account for coherence exclusions
29. Total campaign variants below 30 (minimum threshold)
30. Proof swap options that don't work with the module exit/entry seams

### Process Failures
31. Executing Layer N+1 without LAYER_N_COMPLETE.yaml existing
32. Inventing gate statuses other than PASS or FAIL
33. Spawning subagents without the 8-section structured context template
34. Using wrong model for a subagent (not matching the Binding Model Assignment Table)
35. Skipping MC-CHECK for more than 30 minutes during execution
36. Not updating PROJECT-STATE.md after every layer completion

---

## MC-CHECK SCHEDULE

| Trigger Point | MC-CHECK Type | Key Questions |
|---------------|--------------|---------------|
| Layer 0 complete | MC-CHECK | All inputs loaded? Script Structures in context? A02 hooks loaded? |
| After 1.2 (mid-Layer 1) | MC-CHECK-LITE | Framework analysis using all 5 variables? Not defaulting to one framework? |
| Gate 1 | MC-CHECK | Every concept has framework? All assignments have rationale? No incompatible assignments? |
| After 2.3 (mid-Layer 2) | MC-CHECK-LITE | Word counts on track? Hook-body coherence holding? Visual intents specified? |
| After 2.6 (mid-Layer 2) | MC-CHECK-LITE | CTA variants designed? 3+ per concept? Mechanism integrated for 60s+? |
| Gate 2 | MC-CHECK | All blueprints complete? All word counts pass? All coherence checks pass? |
| After 3.2 (mid-Layer 3) | MC-CHECK-LITE | Hook swap groups reasonable? Coherence verified for swaps? |
| Gate 3 | MC-CHECK | Variant matrix calculated? Total >= 30? All swap groups defined? |
| Gate 4 | MC-CHECK | SCRIPT-ARCHITECTURE-PACKAGE.md exists? 40KB+? All sections populated? |

---

## INTEGRATION WITH DOWNSTREAM SKILLS

### A05 (Visual Direction) Consumes:
- Visual intent per module per concept (from AV blueprints)
- Module timing and duration (for shot duration planning)
- Framework type (different visual approaches for different frameworks)
- Platform constraints (vertical/horizontal, sound-on/off)

### A06 (Ad Arena) References:
- Complete script architectures as part of ad concept evaluation
- Framework selections and rationale (structural quality assessment)
- Word count compliance (verified before Arena entry)

### A07 (Copy Production) Consumes:
- Content briefs per module per concept (what to write)
- Word count budgets per module (how much to write)
- Mechanism integration guide (how to adapt mechanism per length)
- CTA variant library (which CTA approaches to produce)
- Hook-body coherence requirements (what the body must deliver)

### A09 (Assembly) Consumes:
- Variant swap plan (which modules interchange)
- Hook swap groups with clean seam specifications
- CTA swap groups
- Proof swap groups
- Variant matrix calculations (total variants per concept)

---

## OUTPUT PATH CONVENTION

All A04 outputs go to:

```
./
  outputs/
    [project-name]/
      A04-script-architecture/
        layer-0-outputs/
          0.0.1-vertical-profile-loader.md
          0.1-upstream-strategic-loader.md
          0.2-hook-angle-matrix-loader.md
          0.3-format-strategy-loader.md
          0.4-script-structures-loader.md
          0.5-soul-md-loader.md
          0.6-input-validator.md
        layer-1-outputs/
          1.1-ad-concept-inventory.md
          1.2-framework-analysis-matrix.md
          1.3-framework-assignments.md
          1.4-bumper-ad-design.md
          1.5-layer-1-validator.md
        layer-2-outputs/
          2.1-module-sequence-design.md
          2.2-hook-module-briefs.md
          2.3-setup-module-briefs.md
          2.4-mechanism-module-briefs.md
          2.5-proof-module-briefs.md
          2.6-cta-module-briefs.md
          2.7-av-format-blueprints.md
        layer-2.5-outputs/                  # Only if Arena triggered
          2.5.1-alternative-architecture-generation.md
          2.5.2-architecture-scoring.md
          2.5.3-architecture-selection.md
          2.5.4-arena-validator.md
        layer-3-outputs/
          3.1-hook-swap-groups.md
          3.2-cta-swap-groups.md
          3.3-proof-swap-groups.md
          3.4-variant-matrix-calculator.md
        layer-4-outputs/
          4.1-package-assembler.md
          4.2-execution-log-assembler.md
          4.3-checkpoint-assembler.md
        checkpoints/
          LAYER_0_COMPLETE.yaml
          LAYER_1_COMPLETE.yaml
          LAYER_2_COMPLETE.yaml
          LAYER_2.5_COMPLETE.yaml           # Only if Arena triggered
          LAYER_3_COMPLETE.yaml
          LAYER_4_COMPLETE.yaml
        SCRIPT-ARCHITECTURE-PACKAGE.md      # Primary output
        execution-log.md                    # Execution verification
        PROJECT-STATE.md                    # State tracking
        PROGRESS-LOG.md                     # Progress history
```

---

## VERTICAL-SPECIFIC SCRIPT PATTERNS

A04 must adapt architectures based on the campaign vertical. These patterns override generic framework defaults:

### Health/Supplement
- **Dominant frameworks:** AIDA (mechanism explainer), UGC-DR (testimonial), PAS (symptom hook)
- **Mechanism is linchpin:** Even in 30-second ads, a mechanism hint is strongly recommended
- **Doctor Reveals pattern:** Authority [HOOK] + Scientific [SETUP] + Root cause [MECHANISM] + Study [PROOF] + Low-friction [CTA]
- **Compliance note:** No disease claims. "Results may vary." Weight loss before/after restricted on Meta.
- **UGC dominance:** 32.6% of top health ads are UGC format. Prioritize UGC-DR framework.

### Golf/Sports
- **Dominant frameworks:** BAB (demo results), Hook-Body-CTA (tips), Edutainment (lessons)
- **Demo is king:** Visual proof (launch monitor data, swing analysis) outperforms verbal claims
- **Pro Secret pattern:** Authority [HOOK] + Technique [SETUP] + Method [MECHANISM] + Results [PROOF] + Try it [CTA]
- **Shorter formats work:** 30-60 second ads for quick tips; 2-3 minutes for full lessons

### Finance
- **Dominant frameworks:** AIDA (quantified pain), PAS (fear/loss)
- **Low-friction CTAs mandatory:** "See your rate" not "Buy now." Financial decisions carry high anxiety.
- **Quantified pain pattern:** Dollar figure [HOOK] + Concrete cost [SETUP] + Why it happens [MECHANISM] + Simplification [PROOF] + Easy first step [CTA]
- **Trust signals required:** Compliance language, security features, regulatory markers

### Personal Development
- **Dominant frameworks:** Story Narrative (transformation), Edutainment (mini-lesson)
- **Education IS the selling:** 2-5 minute formats work for sophisticated audiences
- **Value-first pattern:** Promise insight [HOOK] + Deliver teaching [SETUP+MECHANISM] + Social proof [PROOF] + Next step [CTA]
- **Longer formats acceptable:** YouTube audience expects more depth

### Technology/SaaS
- **Dominant frameworks:** Hook-Body-CTA (product demo), BAB (old way/new way)
- **Screen recording + PiP:** Visual treatment is product-in-context
- **Benefits over features:** "Save 4 hours/week" beats "Automated dashboard"
- **Old Way vs New Way pattern:** Pain visual [HOOK] + Manual process [SETUP] + Product demo [MECHANISM+PROOF] + Free trial [CTA]

---

## WORD COUNT ENFORCEMENT -- DETAILED REFERENCE

This section exists because word count violation is the MOST PREDICTABLE failure in ad script generation. These numbers are NON-NEGOTIABLE.

### The Physics of Ad Timing

Average speaking rate: 2.5 words per second (broadcast narration pace)
- 6 seconds x 2.5 = 15 words
- 15 seconds x 2.5 = 37.5 words (round to 40)
- 30 seconds x 2.5 = 75 words
- 60 seconds x 2.5 = 150 words (allow to 160 for pacing variation)
- 120 seconds x 2.5 = 300 words
- 180 seconds x 2.5 = 450 words

### Word Count Table (BINDING)

| Ad Length | Max Words (Audio) | Tolerance | Hard Cap |
|-----------|------------------|-----------|----------|
| 6 seconds | 15 | +/- 2 | 17 |
| 15 seconds | 40 | +/- 5 | 45 |
| 30 seconds | 75 | +/- 5 | 80 |
| 60 seconds | 160 | +/- 10 | 170 |
| 90 seconds | 240 | +/- 15 | 255 |
| 2 minutes | 300 | +/- 20 | 320 |
| 3 minutes | 450 | +/- 25 | 475 |

**Tolerance** is for minor pacing variation. **Hard cap** is the absolute maximum -- scripts exceeding the hard cap are REJECTED without review.

### Word Count Verification Protocol

```
FOR EVERY SCRIPT BLUEPRINT:

1. SUM the word count budgets of all modules
2. COMPARE to the target length word count from the table above
3. IF total > hard cap: REJECT -- compress modules
4. IF total > target but within tolerance: FLAG -- note the overage
5. IF total <= target: PASS
6. RECORD the verification in the Word Count Verification Table
7. This verification happens at Layer 2 (module design) AND Layer 4 (output packaging)
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation. Full 4-layer architecture (0-4 + optional 2.5 Arena) with 25 microskills. 8-framework selection system with 5-variable analysis. Modular script architecture ([HOOK]+[SETUP]+[MECHANISM]+[PROOF]+[CTA]) with word count budgets per module per length. Hook-body coherence validation protocol (5 questions). AV two-column format specification. Variant planning with hook swap groups, CTA swap groups, proof swap groups. Word count enforcement with physics-based limits. Framework selection decision tree. Vertical-specific script patterns. 5 gates with binary enforcement. 3 subagent personas. 36 forbidden behaviors. Anti-degradation enforcement with forbidden rationalizations. Per-microskill output protocol with minimum size thresholds. |
