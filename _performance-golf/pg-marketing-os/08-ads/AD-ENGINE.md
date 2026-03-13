# Ad Engine — AD-ENGINE.md

**Version:** 1.7
**Created:** 2026-02-21
**Updated:** 2026-02-28
**Purpose:** Institutional memory and execution constraints for Ad Engine sessions. This is the master instruction file for the Ad Engine subsystem of the CopywritingEngine.

---

## TABLE OF CONTENTS

- [THE 5 LAWS (Never Scroll Past This)](#the-5-laws-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [THE CORE PROBLEM: AD-SPECIFIC DEGRADATION PATTERNS](#the-core-problem-ad-specific-degradation-patterns)
- [ARCHITECTURE OVERVIEW](#architecture-overview)
- [LAYER ARCHITECTURE (Per Skill)](#layer-architecture-per-skill)
- [THE HOOK VS. BIG IDEA DISTINCTION (STRUCTURAL)](#the-hook-vs-big-idea-distinction-structural)
- [AD ARENA ADAPTATION](#ad-arena-adaptation)
- [VERTICAL SPECIALIZATION (Ad-Specific)](#vertical-specialization-ad-specific)
- [AD PERSONA REGISTRY](#ad-persona-registry)
- [SCRIPT FRAMEWORK REFERENCE](#script-framework-reference)
- [HOOK TAXONOMY REFERENCE](#hook-taxonomy-reference)
- [MODULAR VARIANT ARCHITECTURE](#modular-variant-architecture)
- [INTEGRATION ARCHITECTURE (External Tools)](#integration-architecture-external-tools)
- [GATE ARCHITECTURE](#gate-architecture)
- [OUTPUT PATH CONVENTION](#output-path-convention)
- [METACOGNITIVE PROTOCOL (Inherited)](#metacognitive-protocol-inherited)
- [PER-MICROSKILL OUTPUT PROTOCOL (Inherited)](#per-microskill-output-protocol-inherited)
- [SKILL-SPECIFIC REQUIREMENTS](#skill-specific-requirements)
- [FORBIDDEN BEHAVIORS (Ad Engine)](#forbidden-behaviors-ad-engine)
- [TESTING VOLUME REFERENCE DATA](#testing-volume-reference-data)
- [REFERENCES](#references)
- [ANTI-DEGRADATION ENFORCEMENT FILES (COMPLETE SYSTEM)](#anti-degradation-enforcement-files-complete-system)
- [PER-MICROSKILL SPEC FILE ARCHITECTURE (v1.2)](#per-microskill-spec-file-architecture-v12)
- [VERSION HISTORY](#version-history)

---

## THE 5 LAWS (Never Scroll Past This)

1. **The hook is NOT the big idea.** The big idea (Skill 06) is the strategic foundation. The hook is a 3-second attention mechanism that LEADS to the big idea. One big idea generates 20+ hooks. Never conflate them.
2. **The output is a test matrix, not an ad.** The Ad Engine produces combinatorial variant matrices (hooks × bodies × CTAs × visuals). A single ad is a test failure. Volume and diversity feed the algorithm.
3. **Ads are modular, not monolithic.** Every script is a stack of interchangeable modules: `[HOOK] + [SETUP] + [MECHANISM] + [PROOF] + [CTA]`. Any module swaps independently.
4. **Platform-native or die.** A TikTok ad is NOT a Facebook ad reformatted. Each platform has its own rhythm, aesthetic, and audience expectation. Platform-blind scripts are protocol violations.
5. **Intelligence is continuous, not one-time.** Ad markets move weekly. The competitive intelligence layer must be alive — not archival. Winning ads fatigue in 1-2 weeks at high spend.

---

## CRITICAL: READ THIS FIRST

This file exists because **ad creation has its own degradation patterns** distinct from long-form copy. The failures are predictable:

1. **Hooks are generic** — LLM generates safe, predictable hooks that don't pattern-interrupt ("Discover the secret to..." instead of scroll-stopping specificity)
2. **Scripts are over-written** — 30 seconds = 60-75 words. LLMs write 200+ words and call it a "30-second script"
3. **Platform blindness** — Same script regardless of TikTok vs. YouTube pre-roll vs. Meta feed
4. **Visual afterthought** — Script is audio-complete but visual column says "Show product" instead of specific shot direction
5. **Single-variant output** — LLM generates ONE ad instead of a variant matrix. Misses the core operational value (volume)
6. **DR-in-ad-clothing** — Long-form DR copy structure compressed into 30 seconds. Doesn't work. Ads have their own rhythm.
7. **Hook-body disconnect** — Hook promises one thing, body delivers another. Especially with modular variant generation.

**This file is the fix.** Before executing ANY Ad Engine skill, read the relevant sections below.

---

## THE CORE PROBLEM: AD-SPECIFIC DEGRADATION PATTERNS

Ad copy degrades differently from long-form copy and email. The specific patterns:

### Pattern 1: The Generic Hook
The model defaults to safe, category-level hooks instead of specific, scroll-stopping hooks. "Want better skin?" instead of "I threw out every product my dermatologist recommended." The model avoids specificity because general statements are "safer" and more likely to be technically correct. **The fix:** A02 generates hooks from the 32-type taxonomy (see `References/AD-HOOK-TAXONOMY.md`). Each hook must be classified by type and scored against scroll-stop power before advancing. Generic hooks score below threshold and are cut.

### Pattern 2: The Word Count Violation
LLMs have no internal sense of ad length. A "30-second script" comes back at 200 words (90+ seconds when spoken). **The fix:** Hard word count limits per ad length are enforced structurally:

| Ad Length | Max Words | Max Lines (Visual Column) |
|-----------|----------|--------------------------|
| 6 seconds | 15 | 3 |
| 15 seconds | 40 | 6 |
| 30 seconds | 75 | 10 |
| 60 seconds | 160 | 16 |
| 2-3 minutes | 450 | 30 |

Word counts are verified BEFORE scoring. Over-length scripts are returned for compression, not accepted.

### Pattern 3: The Platform-Blind Script
The model writes scripts that could run on any platform — which means they're optimized for none. TikTok requires native-feeling, vertical, UGC-style content. YouTube pre-roll must deliver value before the 5-second skip. Meta feed needs to work sound-off with text overlays. **The fix:** A03 (Format Strategy) sets platform-specific constraints BEFORE script generation. A04 receives these constraints as hard parameters, not suggestions.

### Pattern 4: The Visual Afterthought
In two-column AV scripts, the audio column is detailed and the visual column reads: "Show product. Show happy customer. Show results." This is unusable for production. **The fix:** A05 (Visual Direction) produces shot-level visual briefs. The visual column must specify: shot type (CU/MS/WS), subject, action, duration, text overlay content, and transition. "Show product" is a protocol violation.

### Pattern 5: The Single-Variant Trap
The model generates one complete ad and considers the job done. The operational reality: 3 concepts × 5 hooks × 2 bodies × 3 CTAs × 2 visual treatments = 180 testable variants. **The fix:** The skill pipeline is architecturally designed to produce variant matrices. A07 multiplies hooks, A09 assembles the full matrix. Single-variant output triggers re-execution.

### Pattern 6: The DR-in-Ad-Clothing
The model compresses a 20-minute VSL into 30 seconds: problem-agitation-mechanism-proof-offer-guarantee-CTA all crammed into one ad. Result: nothing lands. **The fix:** Each ad focuses on ONE element of the persuasion chain. One ad might be all hook + mechanism. Another might be all proof + CTA. The variant matrix covers the full chain across multiple ads, not within one ad.

### Pattern 7: The Hook-Body Disconnect
When hooks are generated separately from bodies (which they must be, for modular testing), the model creates hooks that promise content the body doesn't deliver. "The 3 foods destroying your gut" paired with a body that talks about energy. **The fix:** A09 (Assembly) includes a coherence validation step that checks hook → body → CTA logical flow for every variant combination. Disconnected variants are flagged and excluded.

### Anti-Degradation Protocol (Ad-Specific)

```
WHEN YOU NOTICE YOURSELF:
- Writing a hook without checking the 32-type taxonomy → STOP. Load AD-HOOK-TAXONOMY.md.
- Writing a script over word count → STOP. Count words. Enforce limits.
- Writing the same script for TikTok and Meta → STOP. Check platform constraints.
- Leaving visual column vague → STOP. Specify shot type, subject, action, duration.
- Generating one ad → STOP. The output is a matrix, not a single ad.
- Cramming full DR structure into 30 seconds → STOP. One element per ad.
- Pairing hooks with mismatched bodies → STOP. Run coherence validation.

IF CONTEXT IS LARGE:
- This does NOT excuse generic hooks
- This does NOT excuse word count violations
- This does NOT excuse platform blindness
- Request continuation rather than compressing quality
```

---

## ARCHITECTURE OVERVIEW

The Ad Engine is a 12-skill pipeline that generates paid ad campaigns — downstream from CopywritingEngine Skills 00-09 (the shared strategic foundation).

### Relationship to CopywritingEngine

```
SHARED FOUNDATION (CopywritingEngine Skills 00-09)
═══════════════════════════════════════════════════
Brief (00) → Research (01) → Proof Inventory (02)
Root Cause (03) → Mechanism (04) → Promise (05)
Big Idea (06) → Offer (07) → Structure (08)
Campaign Brief (09)
         │
         ├── Copy Engine (Skills 10-20)      — Long-form sales copy
         ├── Ad Engine (Skills A01-A12)      — Paid ads ← THIS DOCUMENT
         ├── Email Engine (Skills E0-E4)      — Email sequences
         └── Advertorial Engine (Skills V01-V??) — Bridge pages (future)
```

The Ad Engine REQUIRES outputs from Skills 00-09 as inputs. Specifically:

| Upstream Skill | What the Ad Engine Uses |
|---------------|------------------------|
| **01 Research** | Pain quotes, hope language, awareness level, language patterns, market intelligence |
| **02 Proof Inventory** | Proof elements for social proof hooks, testimonial content, data claims |
| **03 Root Cause** | Root cause framing for problem/agitation sections of scripts |
| **04 Mechanism** | Unique mechanism explanation for "why this is different" sections |
| **05 Promise** | Calibrated promise for headline/hook claims (what we CAN say) |
| **06 Big Idea** | Campaign concept that hooks lead toward (strategic anchor) |
| **07 Offer** | Offer stack, guarantee, price anchoring for CTA sections |
| **09 Campaign Brief** | Complete strategic summary document |

### Skill Pipeline

```
A01: Ad Intelligence & Competitive Scan
  → Scrapes 500+ competitor ads from Facebook Ad Library, TikTok Creative Center
  → Analyzes winning hooks, formats, visual patterns
  → Two modes: Initial Scan (per project) + Continuous Monitor (ongoing)
  → Outputs: AD-INTELLIGENCE-HANDOFF.md

A02: Hook & Angle Discovery
  → Generates 50-100 hook/angle combinations from research + strategy + intelligence
  → Tier 1: Bulk generation + automated scoring (cut bottom 70%)
  → Tier 2: Human curation (select 8-10 from top 15-20)
  → Outputs: HOOK-ANGLE-MATRIX.md

A03: Format Strategy & Platform Mapping
  → Maps hooks to formats (video, static, carousel) and platforms (Meta, TikTok, YouTube, Google)
  → Sets platform-specific constraints (aspect ratios, lengths, compliance)
  → Creative volume plan
  → Outputs: FORMAT-STRATEGY.md

A04: Script Architecture
  → Selects optimal framework per hook (PAS, AIDA, BAB, Hook-Body-CTA, Story, Edutainment, UGC-DR, Viral)
  → Writes modular scripts with swap-points (hook, setup, mechanism, proof, CTA)
  → Two-column AV format (visual left, audio right)
  → Multiple body versions per hook
  → Outputs: SCRIPT-PACKAGE.md

A05: Visual Direction
  → Visual brief per script: style, shot list, mood, reference ads
  → 5 treatment types: Talking Head, B-Roll+VO, Text-on-Screen, Screen Recording, Mixed
  → Outputs: VISUAL-DIRECTION-PACKAGE.md

A06: Ad Arena
  → 7 ad-specific personas, 3 rounds, adversarial critique
  → Evaluates COMPLETE AD CONCEPTS (hook + script + visual direction as unit)
  → Ad-specific judging criteria (scroll-stop power, visual-copy coherence, etc.)
  → Outputs: AD-ARENA-RESULTS.md

A07: Copy Production
  → Finalizes all ad copy for winning concepts
  → Variant generation: 5-10 hook swaps per winning body
  → Platform-specific formatting and compliance check
  → Outputs: AD-COPY-FINAL/

A08: Visual/Video Production
  → Orchestrates external tools (Midjourney, ElevenLabs, Arcads, etc.)
  → Static image generation with text overlay specs
  → Video generation (AI actors, B-roll, voiceover, music)
  → Human review and selection
  → Outputs: AD-ASSETS/

A09: Assembly & Variant Matrix
  → Combines copy × visual × audio variants
  → Coherence validation (hook-body-CTA logical flow per variant)
  → Platform-specific formatting (aspect ratios, file specs)
  → Full variant matrix
  → Outputs: AD-VARIANT-MATRIX/

A10: Pre-Launch Scoring
  → Internal quality scoring per variant
  → Performance prediction (which variants to test first)
  → Compliance audit (platform policies, legal flags)
  → Outputs: SCORING-REPORT.md

A11: Launch Package
  → Final production files by platform
  → Campaign structure recommendations (ad sets, targeting, budget)
  → A/B test plan (which variants against which)
  → Outputs: LAUNCH-PACKAGE/

A12: Performance Learning Loop
  → Ingest performance data (client-provided)
  → Map results to hook types, visual styles, script structures
  → Compare predictions (A10) to actual performance → refine model
  → Update vertical creative intelligence
  → Feed winning patterns back to A01
  → Outputs: PERFORMANCE-LEARNING.md
```

### Dependency Chain

```
Campaign Brief (Skill 09) ─── required ───→ A01, A02

A01 (Ad Intelligence) ──────→ A02 (Hook Discovery)
A02 (Hook Discovery) ───────→ A03 (Format Strategy)
A03 (Format Strategy) ──────→ A04 (Script Architecture)
A04 (Script Architecture) ──→ A05 (Visual Direction)
A05 (Visual Direction) ─────→ A06 (Ad Arena)
A06 (Ad Arena) ─────────────→ A07 (Copy Production)
A07 (Copy Production) ──────→ A08 (Visual/Video Production)
A08 (Visual/Video Production) → A09 (Assembly)
A09 (Assembly) ─────────────→ A10 (Pre-Launch Scoring)
A10 (Pre-Launch Scoring) ───→ A11 (Launch Package)

A12 (Performance Learning) ←── post-launch data ←── A11

A01 has parallel continuous monitor mode (independent of project pipeline)
```

---

## LAYER ARCHITECTURE (Per Skill)

Each Ad Engine skill follows a layered architecture consistent with the CopywritingEngine pattern:

### Layer 0: Foundation & Loading
- 0.0.1 — Vertical Profile Loader (ad-specific vertical configs from `ad-verticals/`)
- 0.1 — Upstream Package Loader (Campaign Brief + relevant strategic outputs)
- 0.2 — Ad Intelligence Loader (competitive scan data from A01)
- 0.2.6 — System 1: Structural Specimens (winning ad examples by type)
- 0.2.7 — System 2: Persona Voice Specimens (winning ad copy by persona archetype)
- 0.3 — Reference Loading (Hook Taxonomy, Script Structures, platform specs)
- 0.4 — Input Validator
- **Gate 0:** All inputs loaded and validated

### Layer 1: Classification / Analysis
- Skill-specific analysis of inputs
- Framework selection (A04), format mapping (A03), hook type classification (A02)
- **Gate 1:** Classification outputs validated

### Layer 2: Generation / Drafting
- Primary creative generation
- Modular output structure (hooks, bodies, CTAs as separate modules)
- **Gate 2:** Draft complete, word counts verified, platform constraints met

### Layer 2.5: Ad Arena (skills A02 conceptual scoring, A06 full Arena)
- 7 ad-specific personas, 3 rounds, adversarial Critic
- **Gate 2.5:** Human selects winning concepts

### Layer 3: Validation / Refinement
- Coherence validation (hook-body-CTA flow)
- Platform compliance check
- Anti-slop validation
- **Gate 3:** Quality thresholds met

### Layer 4: Output Packaging
- Primary structured output
- Human-readable summary
- Execution log
- Per-microskill output files
- **Gate 4:** All outputs exist, all schema fields populated

---

## THE HOOK VS. BIG IDEA DISTINCTION (STRUCTURAL)

This distinction is the most important architectural concept in the Ad Engine. It MUST be understood structurally, not just conceptually.

```
BIG IDEA (Campaign Level — CopywritingEngine Skill 06)
  "Certain plants contain gut-damaging lectins that cause
   inflammation, weight gain, and chronic health problems"
  → This is the STRATEGIC FOUNDATION. It doesn't change per ad.
  → Derived from research, mechanism, root cause.
  → ONE big idea per campaign.

HOOK (Ad Level — Ad Engine Skill A02)
  "Never eat this vegetable"
  "The #1 'healthy' food destroying your gut"
  "Doctor begs: stop eating this veggie immediately"
  "Why this grandma threw out all her tomatoes"
  → These are 3-SECOND ATTENTION MECHANISMS.
  → They lead TO the big idea, but they are NOT the big idea.
  → MANY hooks serve ONE big idea.
  → Some hooks barely reference the big idea at all.
```

### The Hook-Angle Multiplication Principle

One winning ANGLE generates 20+ hook VARIATIONS. The angle (strategic idea) and hook (expression) are separate variables:

```
ANGLE: "You're overpaying for skincare"

HOOKS (8 different types, same angle):
  Curiosity:     "The $200 moisturizer secret that costs $12 to make"
  Authority:     "Dermatologist reveals: your $80 serum is 90% water"
  Social Proof:  "Why 50,000 women ditched luxury skincare this month"
  Contrarian:    "The best skincare routine is the cheapest one"
  Pain:          "I spent $3,000 on skincare last year. My skin got worse."
  Demo:          [Video: pouring $200 serum into water, showing it dissolve]
  UGC:           "OK I finally tried the $12 alternative everyone's talking about"
  Data:          "We lab-tested 6 luxury serums. Here's what we found."
```

A02 must understand this multiplication. It generates ANGLES first, then HOOKS per angle.

---

## AD ARENA ADAPTATION

The Ad Arena follows the same 3-round mandatory structure as the CopywritingEngine Arena but with adapted personas, criteria, and evaluation methodology.

### The 7 Ad Personas

| # | Persona | Editorial Lens | Generation Focus |
|---|---------|---------------|------------------|
| 1 | **The DR Strategist** | Conversion architecture | Persuasion sequence, offer framing, CTA engineering — "Does every second earn its place in the conversion path?" |
| 2 | **The Scroll Stopper** | Hook engineering | Pattern interrupt, curiosity gap, first-frame impact — "Would they stop scrolling for this?" |
| 3 | **The UGC Native** | Platform authenticity | Raw feel, native format, unpolished trust — "Does this feel like a friend's recommendation, not an ad?" |
| 4 | **The Brand Builder** | Memorability & positioning | Distinctiveness, brand recall, elegant restraint — "Would they remember this tomorrow?" |
| 5 | **The Data Scientist** | Performance optimization | A/B patterns, tested structures, conversion data — "What does the performance data say works?" |
| 6 | **The Visual Storyteller** | Visual-copy coherence | Storyboard mastery, shot composition, visual metaphor — "Does the visual DO the selling, or just illustrate it?" |
| 7 | **The Architect** | Integration & synthesis | Multi-lens optimization — "Does this score well on EVERY criterion?" |

**The Critic** (adversarial, NOT a competitor):
- Evaluates using same 7 ad-specific criteria as Judge
- Identifies ONE weakest element per ad concept
- Must cite evidence and provide actionable fix direction
- Key question: "Would I stop scrolling? If not, why specifically?"

### The 7 Ad Arena Judging Criteria

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| **Scroll-Stop Power** | 25% | Does the hook stop the scroll in 3 seconds? Pattern interrupt + relevance + effort threshold. |
| **Visual-Copy Coherence** | 15% | Do the visual and copy work together? Or could the visual be swapped without loss? |
| **Mechanism Clarity** | 15% | Is the "why this works" clear enough for a 12-year-old? (Clemens standard) |
| **Platform Nativeness** | 15% | Would this feel natural in-feed on the target platform? Or does it scream "ad"? |
| **Proof Integration** | 10% | Is there a proof element (social, data, demo, authority)? How naturally is it integrated? |
| **CTA Strength** | 10% | Is the call to action clear, specific, and matched to the funnel stage? |
| **Memorability / Shareability** | 10% | Would someone remember this? Share it? Talk about it? |

### Quality Thresholds

```
MINIMUM SCORES FOR ACCEPTANCE:
- Overall weighted score: >= 8.0
- Scroll-stop power: >= 7.0 (deal-breaker if below — the ad fails at its primary job)
- Platform nativeness: >= 6.5 (must feel natural on intended platform)
- No criterion below 5.0
```

### Ad Arena Mode

The Ad Arena runs in a single mode: `ad_concept`

Unlike the CopywritingEngine Arena which has three modes (strategic, generative_full_draft, editorial_revision), the Ad Arena evaluates complete ad concepts as atomic units:

```
AD CONCEPT = Hook + Script + Visual Direction

Competitors generate the COMPLETE concept.
Critique evaluates the COMPLETE concept.
Scoring measures the COMPLETE concept.
```

This is because in ads, the hook, script, and visual are inseparable. A brilliant hook with a weak script fails. A strong script with a generic visual fails. The Arena must evaluate the integrated unit.

### Specimen Requirements (CRITICAL)

Each persona MUST have verbatim winning ad specimens loaded before Arena execution. Descriptive personas without specimens are protocol violations.

**Specimen Library Location:** `ads/ad-persona-specimens/`

```
ad-persona-specimens/
  01-dr-strategist/      # Winning DR ads (health, finance, info-product)
  02-scroll-stopper/     # Highest hook-rate ads across platforms
  03-ugc-native/         # Best-performing UGC-style ads
  04-brand-builder/      # Memorable brand ads with DR elements
  05-data-scientist/     # Performance-optimized ads with clear A/B winners
  06-visual-storyteller/ # Visually-driven ads where the image/video IS the hook
```

**Minimum specimen count per persona: 15 verbatim ad scripts/copy**
**Target specimen count per persona: 30-50 verbatim specimens**

Specimens must include:
- Verbatim ad copy (headline, body, CTA)
- Video script transcription (if video ad)
- Platform it ran on
- Vertical/niche
- Hook type classification (from AD-HOOK-TAXONOMY.md)
- Why it was classified under this persona archetype

**STATUS: Specimen collection IN PROGRESS. Do NOT run Arena without minimum specimens loaded.**

---

## VERTICAL SPECIALIZATION (Ad-Specific)

The Ad Engine serves the same 5 verticals as the CopywritingEngine, but with ad-specific configurations.

**Location:** `ads/ad-verticals/` (5 files: golf.md, health.md, finance.md, personal-dev.md, technology.md)

**Full Vertical Profiles:** `ads/ad-verticals/` — 5 per-vertical configuration files with persona panel overrides, specimen directories, taste defaults, ad-specific anti-slop, and ad market context.

### Vertical-Specific Hook Patterns

| Vertical | Dominant Hook Types | Key Pattern |
|----------|-------------------|-------------|
| **Health/Supplement** | Weird Food, Doctor Reveals, Ancient Secret, Unique Mechanism | UGC testimonials + mechanism explainers dominate. Compliance-first (no banned medical claims). |
| **Golf/Sports** | Distance Promise, Pro Secret, Age-Defier, Equipment Revelation | Transformation narratives + demonstration/results. Instructor authority. |
| **Finance** | Crisis Warning, Prediction Lead, Scenario Pain, ROI Proof | Scenario-specific pain. Low-friction CTAs. Trust signals mandatory. |
| **Personal Development** | Identity Shift, Counter-Intuitive, Teacher Format, Origin Story | Value-first (mini-lesson as ad). Authority + vulnerability balance. |
| **Technology/SaaS** | Time Save, Pain Elimination, ROI Proof, Role-Based Targeting | Product-in-context demos. Benefits over features. |

### Vertical-Specific Script Structures

| Vertical | Primary Formats | Key Difference |
|----------|----------------|----------------|
| **Health** | Doctor Reveals (2-5min), Testimonial Compilation (60-120s), "Did You Know?" Educational (60-180s) | Mechanism explainer is linchpin. 44.2% of top ads are product demos. |
| **Golf** | Demo/Results (30-90s), "Secret/Hack" (60-180s), Comparison/Before-After (30-60s) | Show measurable results (launch monitor data, swing analysis). |
| **Finance** | Quantified Pain → Simplify → Low-Friction CTA (60-90s) | CTA must be low-commitment ("See your rate" not "Buy now"). |
| **Personal Dev** | Transformation Story (60-180s), Mini-Lesson/Expert Teaching (2-5min), PASTOR framework | Education IS the selling. 2-5 min length works for sophisticated audiences. |
| **Technology** | Workflow Problem-Solution (30-90s), "Old Way vs. New Way" (15-60s) | Screen recording + PiP talking head. Lead with benefits, not features. |

### Vertical-Specific Compliance Constraints

| Vertical | Hard Constraints |
|----------|-----------------|
| **Health** | No disease claims. Weight loss before/after restricted (Meta). "Results may vary" required. No FDA-unapproved claims. |
| **Finance** | Regulatory compliance language. No "guaranteed returns." Risk disclosures. |
| **Golf** | Minimal compliance issues. Distance claims should cite conditions. |
| **Personal Dev** | Income claims require disclaimers. No "guaranteed" life changes. |
| **Technology** | Data privacy claims must be accurate. No false performance metrics. |

### Vertical-Specific Anti-Slop

| Vertical | Banned Patterns |
|----------|----------------|
| **Health** | "cure," "treat," "clinically proven" (without actual clinical proof), "doctor-approved" (without specific doctor) |
| **Golf** | Health language ("hidden toxin"), finance language ("wealth secret"), guru language |
| **Finance** | "risk-free," "guaranteed returns," "sure thing," health language, casual/UGC tone in compliance sections |
| **Personal Dev** | "get rich quick," "overnight transformation," false scarcity on evergreen products |
| **Technology** | "revolutionary," "game-changing," "disruptive" (emptied of meaning), fake urgency |

---

## AD PERSONA REGISTRY

The 7 Ad Arena personas are fully specified in individual registry files. Each file contains the persona's philosophy, signature approaches, judging lens, anti-voice, specimen index, vertical relevance, and generation focus per Arena round.

**Location:** `ads/ad-persona-registry/`

| File | Persona | Slot | Specimen Status |
|------|---------|------|----------------|
| `dr-strategist.md` | The DR Strategist | 1 | 15 specimens (Batch 1) |
| `scroll-stopper.md` | The Scroll Stopper | 2 | 15 specimens (Batch 1) |
| `ugc-native.md` | The UGC Native | 3 | 15 specimens (Batch 1) |
| `brand-builder.md` | The Brand Builder | 4 | INCOMPLETE — 0 specimens (Batch 2 required) |
| `data-scientist.md` | The Data Scientist | 5 | INCOMPLETE — 0 specimens (Batch 2 required) |
| `visual-storyteller.md` | The Visual Storyteller | 6 | INCOMPLETE — 0 specimens (Batch 2 required) |
| `ad-architect.md` | The Architect | 7 | N/A — synthesizer role, loads other personas' specs |

### When Executing Arena (A06)

Before Arena execution, load the relevant persona registry file(s) for each competitor. The registry files provide the behavioral specification; the specimen files (in `ad-persona-specimens/`) provide verbatim voice calibration.

```
FOR EACH persona in Arena:
  1. LOAD persona spec from ad-persona-registry/[persona].md
  2. LOAD specimens from ad-persona-specimens/[NN]-[persona]/
  3. Persona generates using spec (behavioral) + specimens (voice calibration)
```

---

## SCRIPT FRAMEWORK REFERENCE

The Ad Engine uses 8 proven script frameworks. A04 selects the optimal framework based on vertical, platform, length, and awareness level.

**Full Reference:** `./References/AD-SCRIPT-STRUCTURES.md`

### Framework Selection Matrix

| Framework | Best Length | Best Vertical | Best Platform | Best Awareness Level |
|-----------|-----------|---------------|---------------|---------------------|
| **PAS** | 15-60s | Health, Golf | Meta, TikTok | Problem-Aware |
| **AIDA** | 30-90s | All | All | Solution-Aware |
| **BAB** | 15-60s | Health, Golf, Personal Dev | Meta, TikTok | Problem-Aware |
| **Hook-Body-CTA** | 15-30s | All (social-native) | TikTok, Reels | All levels |
| **Story Narrative** | 60-120s | Personal Dev, Health | YouTube, Meta | Unaware to Problem-Aware |
| **Edutainment** | 2-5min | Personal Dev, SaaS | YouTube | Most-Aware (Stage 4-5) |
| **UGC-DR** | 15-45s | DTC, Health, Golf | TikTok, Meta | Problem-Aware to Solution-Aware |
| **Fast-Paced Viral** | 6-15s | All (young demo) | TikTok, Shorts | Unaware |

### Word Count Enforcement

Scripts MUST meet these hard limits:

| Ad Length | Max Words (Audio) | Framework Options |
|-----------|------------------|-------------------|
| 6 seconds | 15 | Bumper only (one idea, one message) |
| 15 seconds | 40 | PAS compressed, single-benefit demo |
| 30 seconds | 75 | Full PAS, BAB, Hook-Body-CTA |
| 60 seconds | 160 | Full AIDA, PAS, UGC-DR. First length for mechanism. |
| 2-3 minutes | 450 | Story, Edutainment, Harmon Brothers, full DR structure |

**Enforcement:** Word count is checked BEFORE quality scoring. Over-length scripts are returned for compression. No exceptions.

---

## HOOK TAXONOMY REFERENCE

The Ad Engine classifies all hooks into 32 types across 10 categories.

**Full Reference:** `./References/AD-HOOK-TAXONOMY.md`

### The 10 Hook Categories

| Category | Types | Psychological Pathway |
|----------|-------|----------------------|
| **A: Curiosity & Information Gap** | Question, Curiosity Gap, Surprising Fact, Cliffhanger, Belief Reversal, Secret/Insider | Information Gap |
| **B: Authority & Social Proof** | Social Proof/Numbers, Authority/Expert, Skeptic Conversion Arc | Direct Solution |
| **C: Problem & Pain** | Problem Statement, Pain Agitation, Warning/Fear, "Stop Doing This" | Direct Solution |
| **D: Transformation & Results** | Before-After, Demonstration, Testimonial/UGC, Result Showcase | Direct Solution |
| **E: Identity & Belonging** | Audience Call-Out, "People Like You", Lifestyle Aspiration, Identity Shift | Direct Solution |
| **F: Pattern Interrupt** | Unusual Visual, Unexpected Action, Humor/Absurdity, Controversy | Pattern Interrupt |
| **G: Platform-Native** | Reply to Comment, Stitch/Duet, "TikTok Made Me Buy", Trending Sound/Format | Pattern Interrupt |
| **H: Scarcity & Urgency** | Limited Time, Limited Quantity, Exclusive Access | Direct Solution |
| **I: Value & Education** | Quick Tip, Listicle ("3 Reasons"), How-To Tease, Myth Bust | Information Gap |
| **J: Story & Narrative** | Mini Origin Story, "I Was Wrong", Journey Arc, Founder's Confession | Information Gap |

### Performance Benchmarks

- **Hook rate target:** 30%+ (only 14% of tested hooks achieve this)
- **Top performer:** "Industry Secret" hook at 47% hook rate
- **Hook refresh cycle:** Every 7-10 days for high-spend campaigns
- **Performance drops 37% after 7 days** at high spend levels

---

## MODULAR VARIANT ARCHITECTURE

The Ad Engine's core operational advantage is producing variant matrices, not individual ads. This section defines the variant architecture.

### The Concept-to-Variant Hierarchy

```
CONCEPT LEVEL (1 winning ad concept from Arena)
  = 1 strategic angle + 1 script body + 1 visual treatment

HOOK LEVEL (5-10 variants per concept)
  = Same body, different first 3 seconds
  = Each hook is a different entry point to the same script

VISUAL LEVEL (2-3 variants per hook)
  = Same hook + script, different visual treatment
  = UGC vs. polished, different actors/avatars, different B-roll

CTA LEVEL (2-3 variants per visual)
  = Same everything, different call to action
  = Urgency vs. risk reversal vs. low-friction

FULL MATRIX
  = 1 concept × 5 hooks × 2 visuals × 3 CTAs = 30 ads from 1 concept
  = 3 concepts × 5 hooks × 2 visuals × 3 CTAs = 90 ads per campaign
```

### The Four Testing Patterns

| Pattern | What Changes | What Stays | Tests For |
|---------|-------------|------------|-----------|
| **Hook Swap** | Opening 3 seconds | Body, visual, CTA | Hook performance (highest ROI test) |
| **Proof Swap** | Social proof element | Hook, setup, CTA | Evidence type resonance |
| **Visual Swap** | Visual treatment | Script, audio | Format preference |
| **Format Swap** | Entire creative execution | Core angle/message | Container trust |

### Minimum Variant Output

For any campaign, the Ad Engine must produce:

```
MINIMUM:
  3 winning concepts (from Arena)
  × 5 hooks per concept
  × 2 visual treatments
  = 30 testable variants

TARGET:
  3 concepts × 5 hooks × 2 visuals × 3 CTAs = 90 variants
```

Single-variant output (1 concept, 1 hook, 1 visual) is a protocol violation unless explicitly requested by human for a specific purpose.

---

## INTEGRATION ARCHITECTURE (External Tools)

A08 (Visual/Video Production) orchestrates external AI tools via MCP servers and APIs.

### Tool Integration Map

```
A08 orchestrates:
├── IMAGE GENERATION
│   ├── Nano Banana 2 / gemini-3.1-flash-image-preview (PRIMARY — 4K, text rendering, character consistency, 9:16 native)
│   ├── Nano Banana Pro / gemini-3-pro-image-preview (highest quality, complex compositions)
│   ├── Imagen 4 / imagen-4.0-generate-001 (photorealism, product shots)
│   └── Imagen 4 Ultra / imagen-4.0-ultra-generate-001 (maximum fidelity)
│
├── VIDEO GENERATION
│   ├── Veo 3.1 / veo-3.1-generate-preview (PRIMARY — 4K, 4-8s, native audio, 9:16 portrait)
│   ├── Veo 3.1 Fast / veo-3.1-fast-generate-preview (lower latency, same quality tier)
│   └── Veo 3.1 UGC mode (selfie-style talking heads, realistic camera angles, authentic feel)
│
├── VOICE GENERATION
│   └── ElevenLabs / elevenlabs-mcp (voice cloning, TTS, voice design, audio isolation, transcription)
│
├── MUSIC & SOUND EFFECTS
│   ├── ElevenLabs Eleven Music / elevenlabs-mcp (text-to-music, 3s-5min, any style, commercially licensed)
│   └── ElevenLabs Sound Effects / elevenlabs-mcp (text-to-SFX, up to 30s, Foley/ambient/cinematic)
│
└── ASSEMBLY
    └── FFmpeg pipeline (multi-format output, aspect ratio conversion)
```

### MCP Integration Points

| Tool | MCP Server | Status | Usage in Pipeline |
|------|-----------|--------|-------------------|
| **Firecrawl** | `firecrawl-mcp` | LIVE | A01: Scrape Facebook Ad Library, competitor pages |
| **Apify** | `apify` | LIVE | A01: Facebook Ad Library actors, TikTok Creative Center extraction |
| **Perplexity** | `perplexity` | LIVE | A01/Research: Web-grounded search, competitive intelligence |
| **Nano Banana 2** | `gemini-media` | LIVE | A08: Image generation (4K, text overlays, character consistency, 14 aspect ratios) |
| **Nano Banana Pro** | `gemini-media` | LIVE | A08: High-quality image generation (complex scenes, brand imagery) |
| **Imagen 4** | `gemini-media` | LIVE | A08: Photorealistic image generation (product shots) |
| **Veo 3.1** | `gemini-media` | LIVE | A08: Video generation (4K, 9:16, native audio synthesis, scene extension) |
| **Google Drive** | `google-drive` | LIVE | Output delivery, asset storage |
| **ElevenLabs Voice** | `elevenlabs` | LIVE | A08: Text-to-speech, voice cloning, voice design, audio isolation, transcription |
| **ElevenLabs Music** | `elevenlabs` | LIVE | A08: Text-to-music (3s-5min, any style, commercially licensed for ad use) |
| **ElevenLabs SFX** | `elevenlabs` | LIVE | A08: Text-to-sound-effects (up to 30s, Foley/ambient/cinematic) |

### Gemini Media MCP — Tool Reference

**`generate_image` parameters:**
- `prompt` (required): Image description
- `model`: `gemini-3.1-flash-image-preview` (Nano Banana 2, default), `gemini-3-pro-image-preview` (Pro), `imagen-4.0-generate-001`, `imagen-4.0-ultra-generate-001`
- `image_size`: `1K`, `2K`, `4K`
- `reference_image_uris`: Up to 14 reference images for style/subject consistency
- `thinking_level`: `low` or `high` (complex compositions benefit from `high`)

**`generate_video` parameters:**
- `prompt` (required): Video description (supports audio cues — quote dialogue, describe SFX)
- `model`: `veo-3.1-generate-preview` (default), `veo-3.1-fast-generate-preview`
- `aspect_ratio`: `16:9` (landscape) or `9:16` (portrait — TikTok/Reels/Shorts native)
- `duration_seconds`: `4`, `6`, `8`
- `include_audio`: true/false (Veo 3.1 — native audio synthesis)
- `audio_prompt`: Describe desired audio (dialogue, SFX, ambient)
- `reference_image_uris`: Up to 3 images for subject consistency
- `extend_video_uri`: Chain videos for longer content (up to ~148s total)
- `negative_prompt`: Elements to exclude

**Ad-specific usage patterns:**
- Static ad mockups: `generate_image` with `image_size: 2K`, aspect `9:16` for social
- Text overlay ads: Nano Banana 2's text rendering generates legible ad copy on images
- UGC-style video ads: `generate_video` with `aspect_ratio: 9:16`, `include_audio: true`, prompt for selfie-style/talking-head framing
- Polished video ads: `generate_video` with `aspect_ratio: 16:9`, cinematic prompting, `reference_image_uris` for brand consistency
- Product demo videos: Use `reference_image_uris` with product photos for subject consistency
- Hook testing: Generate 5-10 visual variants of the same hook concept rapidly
- Scene extension: Chain 8s clips for 30-60s ad scripts via `extend_video_uri`
- Background music: ElevenLabs Eleven Music — prompt with mood/genre/tempo, 3s-5min, commercially cleared
- Sound design: ElevenLabs SFX — Foley, ambient, transitions, up to 30s per generation
- Voiceover: ElevenLabs TTS — voice cloning for brand consistency, expressive narration, multilingual

**Limitations:**
- Video generation is asynchronous (11s–6min latency)
- Generated videos persist 2 days server-side — download immediately
- All outputs include SynthID watermark (AI-generated content marker)
- 1080p/4K video requires 8s duration setting
- Video extension is 720p only
- Person generation has regional restrictions (EU/UK/MENA)

### A01 Continuous Monitor Architecture

```
INITIAL SCAN (per project launch):
  1. Apify actor: Scrape Facebook Ad Library for competitor brands (500+ ads)
  2. Firecrawl: Scrape TikTok Creative Center top ads for vertical
  3. Classify each ad: hook type, format, platform, estimated run duration
  4. Build competitive intelligence database
  5. Output: AD-INTELLIGENCE-HANDOFF.md

CONTINUOUS MONITOR (scheduled, ongoing):
  1. Weekly: Re-scan competitor ad libraries for new creative
  2. Detect: New ads since last scan
  3. Analyze: Emerging hook types, format shifts, new competitors
  4. Alert: When competitor launches high-volume new creative
  5. Update: Vertical intelligence database

  Implementation options:
  - Scheduled Apify actor (runs weekly, outputs to dataset)
  - Open Claude instance with recurring task
  - Cron job triggering MCP-based scan
```

---

## GATE ARCHITECTURE

The Ad Engine uses the same binary gate enforcement as the CopywritingEngine.

### Gate Types

| Gate | Where | What It Blocks | Key Criteria |
|------|-------|---------------|--------------|
| **Gate 0** | Layer 0 → Layer 1 | Execution entry | All inputs loaded, Campaign Brief exists, vertical config loaded |
| **Gate 1** | Layer 1 → Layer 2 | Generation | Classification/analysis outputs validated |
| **Gate 2** | Layer 2 → Layer 2.5 | Arena entry | Drafts complete, word counts verified, platform constraints met |
| **Gate 2.5** | Arena → Layer 3 | Post-Arena | Human selection of winning concepts (BLOCKING) |
| **Gate 3** | Layer 3 → Layer 4 | Output packaging | Coherence validation passed, compliance check passed |
| **Gate 4** | Skill completion | Downstream consumption | All output files exist, all schema fields populated |

### Binary Enforcement

Gates are PASS or FAIL only. The following statuses are FORBIDDEN and trigger IMMEDIATE HALT:

- "PARTIAL_PASS"
- "conditional pass"
- "good enough for testing"
- "close enough to word count"
- "sufficient variants generated"

### Structural Gate Files

```
[project]/[skill-id]/checkpoints/
  LAYER_0_COMPLETE.yaml
  LAYER_1_COMPLETE.yaml
  LAYER_2_COMPLETE.yaml
  ARENA_COMPLETE.yaml       (A06 only — human selection received)
  LAYER_3_COMPLETE.yaml
  LAYER_4_COMPLETE.yaml
```

**IF checkpoint file does not exist → next layer is BLOCKED.**

---

## OUTPUT PATH CONVENTION

All Ad Engine outputs go to the same output root as CopywritingEngine outputs:

```
./
  ~outputs/
    [project-name]/
      A01-ad-intelligence/
        AD-INTELLIGENCE-HANDOFF.md
        execution-log.md
        checkpoints/
      A02-hook-angle-discovery/
        HOOK-ANGLE-MATRIX.md
        execution-log.md
        checkpoints/
      A03-format-strategy/
        FORMAT-STRATEGY.md
      A04-script-architecture/
        SCRIPT-PACKAGE.md
        scripts/
          [hook-id]-[framework]-[platform].md
      A05-visual-direction/
        VISUAL-DIRECTION-PACKAGE.md
        visual-briefs/
          [script-id]-visual-brief.md
      A06-ad-arena/
        AD-ARENA-RESULTS.md
        arena/
      A07-copy-production/
        AD-COPY-FINAL/
          [platform]/
            [variant-id].md
      A08-visual-video-production/
        AD-ASSETS/
          [platform]/
            [variant-id].[format]
      A09-assembly-variant-matrix/
        AD-VARIANT-MATRIX/
          VARIANT-MATRIX.yaml
          [platform]/
            [variant-id]-assembled.[format]
      A10-pre-launch-scoring/
        SCORING-REPORT.md
      A11-launch-package/
        LAUNCH-PACKAGE/
          [platform]/
      A12-performance-learning/
        PERFORMANCE-LEARNING.md
```

---

## METACOGNITIVE PROTOCOL (Inherited)

The Ad Engine inherits the full MC-CHECK protocol from ~system/SYSTEM-CORE.md:

- MC-CHECK at layer entry, mid-layer, gates, output, context threshold
- MC-CHECK-LITE every 3-4 microskills
- Context zone management (GREEN/YELLOW/RED/CRITICAL)
- Simulated Type 1 signals
- Session continuity protocol

### Ad-Specific MC-CHECK Enhancement

Add to every MC-CHECK in ad skills:

```yaml
ad_specific_check:
  word_count_within_limits: [Y/N]
  platform_constraints_applied: [Y/N]
  hook_classified_by_type: [Y/N]
  visual_column_specific_not_vague: [Y/N]
  variant_matrix_producing_multiple: [Y/N]
  if_any_no: "HALT — address before proceeding"
```

---

## PER-MICROSKILL OUTPUT PROTOCOL (Inherited)

The Ad Engine inherits the full per-microskill output protocol from ~system/SYSTEM-CORE.md:

- Every microskill produces its own dedicated output file
- Files named to match the microskill
- Section headers match output schema
- Minimum size thresholds enforced
- Checkpoint YAML lists all files with sizes
- Execution log confirms spec file read
- Summary files cite per-microskill files

---

## SKILL-SPECIFIC REQUIREMENTS

### A01 — Ad Intelligence & Competitive Scan

**Purpose:** Build a comprehensive intelligence picture of what's working in the target vertical's ad market. This is the ad-specific research layer — it mines what ADS work, complementing Skill 01 which mines what PEOPLE say and feel.

**v1.5: Tool-Assisted Scan Mode** — A01 now supports a 3rd operating mode: importing pre-scraped, impression-sorted data from the Meta Ad Spy tool. When Tool-Assisted mode is active, A01 uses dual-signal performance scoring (40% run duration + 60% impressions) for more accurate winner identification. See `meta-ad-spy-integration.md` for the shared protocol. 5 new microskills: 0.5 (JSON Import Loader), 0.6 (Brand Database Matcher), 1.6 (Meta Ad Spy Ingester), 2.7 (Impression Scorer), 3.8 (Impression-Weighted Analysis). A01 total: 31 microskills.

**Three Operational Modes:**

| Mode | Trigger | Scope | Output |
|------|---------|-------|--------|
| **Initial Scan** | New project/campaign launch | 500+ competitor ads across platforms | AD-INTELLIGENCE-HANDOFF.md |
| **Continuous Monitor** | Scheduled (weekly/bi-weekly) | Delta since last scan | INTELLIGENCE-UPDATE.md |
| **Tool-Assisted Scan** | Pre-scraped impression-sorted data available (Meta Ad Spy) | Import + dual-signal scoring (40% duration + 60% impressions) | AD-INTELLIGENCE-HANDOFF.md (enriched) |

**Layer Architecture:**

| Layer | Function | Model |
|-------|----------|-------|
| Pre-Execution | Infrastructure creation, MCP validation | haiku |
| Layer 0 | Load Campaign Brief, vertical config, previous intelligence (if exists) | haiku |
| Layer 1 | Scraping — Facebook Ad Library, TikTok Creative Center, Google Ads Transparency | sonnet |
| Layer 2 | Analysis — classify each ad by hook type, format, visual style, estimated run duration | opus |
| Layer 3 | Synthesis — identify winning patterns, format distribution, hook type prevalence, emerging trends | opus |
| Layer 4 | Output packaging — AD-INTELLIGENCE-HANDOFF.md | sonnet |

**Non-Negotiable Thresholds:**

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Ads scraped** | 500 | HALT — continue scraping |
| **Competitor brands analyzed** | 10 | HALT — expand competitor list |
| **Platforms covered** | 2 (minimum Meta + one other) | HALT — add platform |
| **Ads classified by hook type** | 100% of scraped ads | HALT — classify remaining |
| **Format distribution calculated** | Yes | HALT — calculate |

**Output: AD-INTELLIGENCE-HANDOFF.md**

Required sections:
1. Executive Summary (market overview, dominant patterns)
2. Competitor Landscape (brands analyzed, ad volume per brand, estimated spend signals)
3. Hook Type Distribution (which hook types are most prevalent, which are underused)
4. Format Distribution (video vs. static vs. carousel ratios, platform breakdown)
5. Visual Style Analysis (UGC vs. polished, color patterns, text overlay patterns)
6. Winning Ad Specimens (top 20 ads with longest run times — full copy transcription)
7. Emerging Trends (new formats, new hook types, shifts from previous scan)
8. Opportunity Gaps (underused hook types, underserved formats, whitespace)
9. Platform-Specific Intelligence (per-platform patterns and constraints)
10. Recommended Hooks (top 10 hook types to prioritize based on competitive landscape)

**Minimum size:** 100KB (ensures comprehensive coverage, not a summary)

---

### A02 — Hook & Angle Discovery

**Purpose:** Generate the hook and angle taxonomy for the campaign — the 3-second attention mechanisms that will stop the scroll and lead to the big idea.

**Layer Architecture:**

| Layer | Function | Model |
|-------|----------|-------|
| Pre-Execution | Infrastructure creation | haiku |
| Layer 0 | Load Campaign Brief, Research Handoff, Strategic Outputs (03-08), Ad Intelligence Handoff | haiku |
| Layer 1 | Angle Discovery — identify 10-15 strategic angles from research + strategy | opus |
| Layer 2 | Hook Generation — generate 5-10 hooks per angle across 32 hook types (50-100+ total) | opus |
| Layer 2.5 | Automated Scoring — score each hook against 6 criteria, cut bottom 70% | opus |
| Layer 3 | Human Curation — present top 15-20 hooks, human selects 8-10 (BLOCKING) | — |
| Layer 4 | Output packaging — HOOK-ANGLE-MATRIX.md | sonnet |

**The Angle → Hook Separation (CRITICAL):**

```
STEP 1: ANGLE DISCOVERY (Layer 1)
  Input: Research pain quotes, root cause, mechanism, big idea, market sophistication
  Process: Derive 10-15 strategic angles in PLAIN LANGUAGE
  Output: Angle candidates with rationale

  Example angles for a gut health supplement:
  - "The foods you trust are harming you" (belief reversal)
  - "Your doctor is treating symptoms, not causes" (authority challenge)
  - "One ingredient is missing from every probiotic" (mechanism gap)
  - "The real reason diets don't work" (root cause reframe)

STEP 2: HOOK GENERATION (Layer 2)
  Input: Approved angles + 32 hook types from taxonomy
  Process: For each angle, generate hooks across multiple types
  Output: 50-100+ hooks classified by type and angle

  Example hooks for angle "The foods you trust are harming you":
  - Curiosity: "The #1 'healthy' food that's destroying your gut"
  - Warning: "Doctor begs: stop eating this vegetable immediately"
  - UGC: "I stopped eating this one food and lost 12 pounds in 3 weeks"
  - Data: "73% of Americans eat this gut-damaging food daily"
  - Demo: [Image: beloved vegetable with X through it]

STEP 3: AUTOMATED SCORING (Layer 2.5)
  Score each hook 1-10 on:
  - Scroll-stop power (pattern interrupt + novelty)
  - Curiosity gap strength (open loop created?)
  - Big idea alignment (does it lead to the strategic foundation?)
  - Platform nativeness (would it feel natural in-feed?)
  - Compliance safety (any claims we can't support?)
  - Specificity (concrete detail vs. vague promise)

  Cut hooks scoring below 7.0 average.
  Present top 15-20 to human.
```

**Non-Negotiable Thresholds:**

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Angles generated** | 10 | HALT — continue angle discovery |
| **Hooks generated** | 50 | HALT — continue hook generation |
| **Hook types represented** | 8 of 32 types minimum | HALT — generate in underrepresented types |
| **Hooks presented to human** | 15 | HALT — scoring threshold too aggressive |
| **Human selections** | 8 (BLOCKING) | Cannot proceed without human curation |

**Output: HOOK-ANGLE-MATRIX.md**

Required sections:
1. Strategic Angles (all 10-15 angles with rationale, ranked)
2. Hook Bank (all 50-100+ hooks, classified by type and angle, scored)
3. Top 15-20 Presentation (hooks advancing to human curation, with scores and rationale)
4. Human Selections (the 8-10 hooks selected by human, with any notes)
5. Hook-Angle Cross-Reference (which hooks serve which angles)
6. Platform Recommendations (which hooks for which platforms)
7. Variant Potential (estimated hook swap variants per selected hook)

---

## FORBIDDEN BEHAVIORS (Ad Engine)

### Universal Forbidden Behaviors

1. ❌ Generating ads without loading Campaign Brief (Skill 09 output)
2. ❌ Generating hooks without loading AD-HOOK-TAXONOMY.md
3. ❌ Generating scripts without loading AD-SCRIPT-STRUCTURES.md
4. ❌ Writing scripts that exceed word count limits for target length
5. ❌ Writing platform-blind scripts (must specify platform constraints)
6. ❌ Leaving visual column vague ("Show product" without shot specifics)
7. ❌ Producing single-variant output when matrix is required
8. ❌ Cramming full DR persuasion chain into one short-form ad
9. ❌ Conflating hooks with big ideas (they are structurally distinct)
10. ❌ Running Arena without loaded persona specimens
11. ❌ Skipping coherence validation when assembling hook-body-CTA variants
12. ❌ Accepting word counts "close enough" to limits (limits are exact)
13. ❌ Generating hooks without classifying them by taxonomy type
14. ❌ Skipping platform compliance check before output packaging
15. ❌ Claiming A01 is complete with fewer than 500 scraped ads

### Arena-Specific Forbidden Behaviors

1. ❌ Running fewer than 3 rounds
2. ❌ Skipping adversarial critique
3. ❌ Scoring against fewer than 7 ad-specific criteria
4. ❌ Proceeding without human selection of winning concepts
5. ❌ Evaluating hooks in isolation (must evaluate complete ad concepts)
6. ❌ Generating without loaded persona specimens
7. ❌ Accepting candidates below minimum thresholds
8. ❌ Learning that merges VOICE (absorb TECHNIQUES only)

---

## TESTING VOLUME REFERENCE DATA

For campaign planning and A10 (Pre-Launch Scoring):

### Creative Testing Formula

```
Minimum creatives per week = Weekly ad spend / (3 × Average Order Value)
```

Example: $7,000/week spend, $100 AOV = ~23 creatives per week

### Creative Lifespan

| Spend Level | Typical Lifespan | Refresh Strategy |
|-------------|-----------------|-----------------|
| Low (<$5K/week) | 4-8 weeks | Monthly concept refresh |
| Medium ($5-25K/week) | 2-4 weeks | Bi-weekly hook refresh |
| High (>$25K/week) | 1-2 weeks | Weekly hook refresh, bi-weekly concept |

### Win Rate Expectations

- **6.6-30% of tested creatives will be winners** (1-3 out of 10)
- **Kill threshold:** Cut losers at 3× AOV spend
- **Scale threshold:** Increase winners by 20-30% incremental spend

### Key Performance Benchmarks

- Hook rate target: 30%+ (only 14% of hooks achieve this)
- UGC outperforms polished production by 15-25% on Meta/TikTok
- 83% of top-performing social ads are 15-30 seconds
- 90% of Meta inventory is vertical (9:16) — design for 9:16 first
- Sound-off optimization is critical (85% of Facebook is sound-off)
- 63% of top TikTok ads place core message in first 3 seconds

---

## REFERENCES

| Document | Location | Purpose |
|----------|----------|---------|
| **AD-HOOK-TAXONOMY.md** | `./References/AD-HOOK-TAXONOMY.md` | 32 hook types, 10 categories, examples, performance data |
| **AD-SCRIPT-STRUCTURES.md** | `./References/AD-SCRIPT-STRUCTURES.md` | 8 frameworks, length structures, vertical patterns, modular architecture |
| **System Core** | `~system/SYSTEM-CORE.md` | Master system document (metacognitive, gates, anti-degradation) |
| **~system/protocols/ARENA-CORE-PROTOCOL.md** | `./~system/protocols/ARENA-CORE-PROTOCOL.md` | Arena base protocol (adapted for ads in this document) |
| **Campaign Brief output** | `[project]/09-campaign-brief/` | Required input for all Ad Engine skills |

---

## ANTI-DEGRADATION ENFORCEMENT FILES (COMPLETE SYSTEM)

**All 12 Ad Engine skills have dedicated anti-degradation files.**

These files contain STRUCTURAL enforcement that CANNOT be bypassed (unlike instructions which can be ignored under context pressure). Each file has EQUAL authority to this AD-ENGINE.md and to ~system/SYSTEM-CORE.md.

### Complete Anti-Degradation File Index

| Skill | Anti-Degradation File | Key Enforcement |
|-------|----------------------|-----------------|
| A01 Ad Intelligence | `A01-ad-intelligence/A01-AD-INTELLIGENCE-ANTI-DEGRADATION.md` | 500 ads scraped minimum, 100% classification, 10+ competitors, platform coverage |
| A02 Hook & Angle Discovery | `A02-hook-angle-discovery/A02-HOOK-ANGLE-DISCOVERY-ANTI-DEGRADATION.md` | 10+ angles, 50+ hooks, 8+ hook types, taxonomy classification, human curation gate |
| A03 Format Strategy | `A03-format-strategy/A03-FORMAT-STRATEGY-ANTI-DEGRADATION.md` | Platform-specific constraints, sound behavior analysis, variant matrix calculator |
| A04 Script Architecture | `A04-script-architecture/A04-SCRIPT-ARCHITECTURE-ANTI-DEGRADATION.md` | Word count physics (hard limits), modular swap-point structure, AV format compliance |
| A05 Visual Direction | `A05-visual-direction/A05-VISUAL-DIRECTION-ANTI-DEGRADATION.md` | Shot-level specificity (no "show product"), platform safe zones, tool-specific production specs |
| A06 Ad Arena | `A06-ad-arena/A06-AD-ARENA-ANTI-DEGRADATION.md` | 3 rounds mandatory, 7 personas, atomic concept evaluation, specimen loading, human selection blocking |
| A07 Copy Production | `A07-copy-production/A07-COPY-PRODUCTION-ANTI-DEGRADATION.md` | Variant generation (5-10 hook swaps per body), word count enforcement, CTA lever taxonomy |
| A08 Visual/Video Production | `A08-visual-video-production/A08-VISUAL-VIDEO-PRODUCTION-ANTI-DEGRADATION.md` | 4-level graceful degradation, tool orchestration, asset naming with lineage tracing |
| A09 Assembly & Variant Matrix | `A09-assembly-variant-matrix/A09-ASSEMBLY-VARIANT-MATRIX-ANTI-DEGRADATION.md` | 4-dimension coherence validation, testing priority algorithm, binding variant naming |
| A10 Pre-Launch Scoring | `A10-pre-launch-scoring/A10-PRE-LAUNCH-SCORING-ANTI-DEGRADATION.md` | 5 prediction dimensions, 3-tier system, prediction confidence enforcement |
| A11 Launch Package | `A11-launch-package/A11-LAUNCH-PACKAGE-ANTI-DEGRADATION.md` | Platform-first directory structure, compliance review, kill/scale decision framework |
| A12 Performance Learning | `A12-performance-learning/A12-PERFORMANCE-LEARNING-ANTI-DEGRADATION.md` | Prediction vs reality comparison, element-level attribution, propagation enforcement |

### Universal Enforcement Patterns

**Every ad anti-degradation file contains:**

1. **Mandatory Checkpoint Files** — LAYER_N_COMPLETE.yaml files that must exist before proceeding
2. **Minimum Quantifiable Thresholds** — Exact numbers that trigger HALT if not met
3. **Forbidden Rationalizations** — Specific excuses that ALWAYS trigger HALT
4. **Skill-Specific MC-CHECK** — YAML format metacognitive checkpoint with ad-specific checks
5. **Per-Microskill Output Table** — Every microskill must produce a dedicated output file
6. **Implementation Checklist** — Pre-execution and post-execution verification steps
7. **Mandatory Project Infrastructure** — PROJECT-STATE.md + PROGRESS-LOG.md + checkpoints/
8. **Binary Gate Enforcement** — PASS/FAIL only, no invented statuses

### Binding Model Assignment Tables

All 12 AGENT.md files now have Binding Model Assignment Tables specifying which model (haiku/sonnet/opus) executes each layer. Universal pattern: haiku for pre-execution infrastructure + Layer 0, sonnet for Layer 1 classification + Layer 4 packaging, opus for Layers 2-3 (generation, Arena, validation). See individual AGENT.md files for skill-specific assignments.

### Quick Reference: When to Read Which File

| If You're Executing... | READ THIS FIRST |
|------------------------|-----------------|
| Any Ad Engine skill | This AD-ENGINE.md (you're here) + ~system/SYSTEM-CORE.md |
| A01 Ad Intelligence | A01-AD-INTELLIGENCE-ANTI-DEGRADATION.md |
| A02 Hook Discovery | A02-HOOK-ANGLE-DISCOVERY-ANTI-DEGRADATION.md |
| A03 Format Strategy | A03-FORMAT-STRATEGY-ANTI-DEGRADATION.md |
| A04 Script Architecture | A04-SCRIPT-ARCHITECTURE-ANTI-DEGRADATION.md |
| A05 Visual Direction | A05-VISUAL-DIRECTION-ANTI-DEGRADATION.md |
| A06 Ad Arena | A06-AD-ARENA-ANTI-DEGRADATION.md + ~system/protocols/ARENA-CORE-PROTOCOL.md |
| A07 Copy Production | A07-COPY-PRODUCTION-ANTI-DEGRADATION.md |
| A08 Visual/Video Production | A08-VISUAL-VIDEO-PRODUCTION-ANTI-DEGRADATION.md |
| A09 Assembly | A09-ASSEMBLY-VARIANT-MATRIX-ANTI-DEGRADATION.md |
| A10 Pre-Launch Scoring | A10-PRE-LAUNCH-SCORING-ANTI-DEGRADATION.md |
| A11 Launch Package | A11-LAUNCH-PACKAGE-ANTI-DEGRADATION.md |
| A12 Performance Learning | A12-PERFORMANCE-LEARNING-ANTI-DEGRADATION.md |

### Key Insight

> **"Instructions can be ignored under context pressure. Structures cannot be bypassed. Every ad skill now has structural enforcement."**

---

## PER-MICROSKILL SPEC FILE ARCHITECTURE (v1.2)

**All 333 microskill spec files have been extracted into individual `.md` files.**

Previously, all microskill definitions were embedded inline within massive AGENT.md files (70-103KB each). This created the **Synthesis Trap** risk: agents read the large AGENT.md and synthesize plausible output without actually reading or executing individual microskill logic.

Now, each microskill has its own dedicated spec file that agents MUST read before execution.

### Directory Structure

```
[skill]/skills/
├── layer-0/
│   ├── 0.0.1-vertical-profile-loader.md
│   ├── 0.1-[first-loader].md
│   ├── 0.2-[second-loader].md
│   └── ...
├── layer-1/
│   ├── 1.1-[first-microskill].md
│   └── ...
├── layer-2/
│   ├── 2.1-[first-microskill].md
│   └── ...
├── layer-2.5/  (if applicable)
│   └── ...
├── layer-3/
│   └── ...
├── layer-3.5/  (A12 only — propagation layer)
│   └── ...
└── layer-4/
    └── ...
```

### Spec File Format

Every extracted microskill spec file follows this structure:

```markdown
# [ID]: [Name]
## Purpose
[What this microskill does and why]

## Inputs
[Required inputs with source references]

## Process
[Step-by-step execution logic, pseudocode, decision trees]

## Output Schema
[Required fields, formats, data structures]

## Output File
[Path convention and minimum file size]

## Quality Checks
[Validation criteria, thresholds, gate conditions]

## Dependencies
[Upstream microskills that must complete first]
```

### File Counts Per Skill

| Skill | Spec Files | Key Architecture Note |
|-------|-----------|----------------------|
| A01 Ad Intelligence | 31 | Three modes (Initial Scan + Continuous Monitor + Tool-Assisted Scan), Layers 0-4 |
| A02 Hook & Angle Discovery | 32 | Layer 2.5 has 7 individual scoring microskills |
| A03 Format Strategy | 25 | Master Format Assignment Table schema in Layer 2 |
| A04 Script Architecture | 30 | 8-framework selection, modular script architecture |
| A05 Visual Direction | 32 | 5 treatment types, tool-specific production specs in Layer 3 |
| A06 Ad Arena | 32 | 3 rounds × 5 microskills each in Layer 2, synthesis in Layer 2.5 |
| A07 Copy Production | 28 | Variant generation architecture in Layer 2 |
| A08 Visual/Video Production | 28 | Tool orchestration (13 tools), quality audit in Layer 2.5 |
| A09 Assembly & Variant Matrix | 24 | 4-dimension coherence validation in Layer 2 |
| A10 Pre-Launch Scoring | 23 | 5 scoring dimensions in Layer 1, ranking in Layer 2 |
| A11 Launch Package | 25 | Platform-specific builders in Layer 1 |
| A12 Performance Learning | 28 | Layer 3.5 for upstream engine propagation (5 update targets) |
| **TOTAL** | **333** | |

### Enforcement Rule

```
BEFORE EXECUTING ANY AD ENGINE MICROSKILL:
1. READ the microskill's .md spec file from skills/layer-N/
2. EXECUTE per the spec file's Process section
3. PRODUCE output matching the spec file's Output Schema
4. VERIFY against the spec file's Quality Checks

❌ FORBIDDEN: Reading AGENT.md and synthesizing expected output
❌ FORBIDDEN: Executing without reading the individual spec file
❌ FORBIDDEN: Producing output that doesn't match the spec's Output Schema
```

### Pre-Execution Spec File Verification

Before starting any Ad Engine skill execution, verify that the required microskill spec files exist on disk:

```
FOR EACH microskill listed in the skill's AGENT.md Layer 0 table:
  1. CHECK: skills/layer-N/<microskill-id>.md exists
  2. CHECK: File is non-empty (> 100 bytes)
  3. IF any spec file is missing or empty → HALT with specific missing file path

This prevents the Synthesis Trap where agents read AGENT.md summaries
and generate output without reading actual spec file instructions.
```

### Schema Validation Reference

Input validators (Layer 0) MUST verify field presence — not just file existence — for all consumed handoff files. See `ads/ad-engine-schema-registry.md` for:
- Required fields per handoff file (10 schemas documented)
- Field validation rules (minimum counts, non-empty checks)
- Producer → Consumer cross-reference map
- Minimum file size thresholds

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.7 | 2026-02-28 | Complete A08 production stack: Dropped Arcads (Veo 3.1 handles UGC natively) and Beatoven.ai (ElevenLabs covers music + SFX). Added Veo 3.1 UGC mode, ElevenLabs Eleven Music (text-to-music, 3s-5min, commercially licensed), ElevenLabs SFX (text-to-SFX, 30s). All 5 A08 categories now LIVE: image, video, voice, music, SFX. Zero PLANNED integrations remain. |
| 1.6 | 2026-02-28 | Production integration map: Replaced placeholder tool references with live MCP servers. Gemini Media MCP (`gemini-media`) provides Nano Banana 2 (image), Nano Banana Pro (image), Imagen 4 (image), Veo 3.1 (video). Added tool reference with parameters, ad-specific usage patterns, and limitations. Status column added to MCP table (LIVE/PLANNED). |
| 1.5 | 2026-02-27 | Meta Ad Spy integration: Tool-Assisted Scan mode for A01, dual-signal scoring, 5 new A01 microskills, impression-weighted analysis, downstream updates to A02/A10/A12, schema registry v1.1, 5 vertical config brand databases |
| 1.4 | 2026-02-25 | POST-AUDIT REMEDIATION: Added pre-execution spec file verification step (prevents Synthesis Trap). Added schema validation reference pointing to new ad-engine-schema-registry.md (10 handoff schemas with required fields, validation rules, cross-reference map). |
| 1.3 | 2026-02-23 | AD PERSONA REGISTRY + VERTICAL CONFIGS + MODEL ASSIGNMENT: (1) 7 ad persona registry files created in `ad-persona-registry/` (dr-strategist.md, scroll-stopper.md, ugc-native.md, brand-builder.md, data-scientist.md, visual-storyteller.md, ad-architect.md) — 4 complete with 15 Batch 1 specimens each, 3 INCOMPLETE (Batch 2 required). (2) 5 ad vertical config files created in `ad-verticals/` (golf.md, health.md, finance.md, personal-dev.md, technology.md) with ad-specific persona panels, hook patterns, script structures, compliance constraints, and anti-slop. (3) Model Assignment Tables added to A06, A07, A11 AGENT.md files (A02, A05 already had them). (4) A06 anti-degradation microskill count corrected: phantom 2.5.4-coherence-validation row removed, count corrected to 31. Added AD PERSONA REGISTRY section and vertical config references. |
| 1.2 | 2026-02-23 | PER-MICROSKILL SPEC FILE EXTRACTION: All 333 microskill definitions extracted from inline AGENT.md files into individual `.md` spec files. Each skill now has a `skills/` directory with `layer-N/` subdirectories containing one spec file per microskill. Eliminates Synthesis Trap risk. Added PER-MICROSKILL SPEC FILE ARCHITECTURE section with directory structure, file format, counts per skill, and enforcement rule. |
| 1.1 | 2026-02-22 | ANTI-DEGRADATION ENFORCEMENT: All 12 Ad Engine skills now have dedicated ANTI-DEGRADATION.md files with 8 structural fixes each (checkpoint files, minimum thresholds, forbidden rationalizations, skill-specific MC-CHECK, per-microskill output tables, mandatory project infrastructure, binary gate enforcement, stale artifact cleanup). Added complete anti-degradation file index section. |
| 1.0 | 2026-02-21 | Initial creation with 5 Laws, 7 degradation patterns, 12-skill architecture, hook taxonomy reference, script framework reference, modular variant architecture, Ad Arena adaptation (7 personas, 7 criteria), integration architecture, gate architecture, vertical specialization, testing volume reference data. |
