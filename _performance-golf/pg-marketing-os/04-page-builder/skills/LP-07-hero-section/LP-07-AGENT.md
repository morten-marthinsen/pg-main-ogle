# LP-07: Hero Section Writer — Master Agent

> **Version:** 1.0
> **Skill:** LP-07-hero-section
> **Position:** Phase 3 — First Writing Skill
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (`page-brief.json`), LP-03 (`above-fold-blueprint.json`), LP-04 (`section-sequence.json`)
> **Output:** `hero-section-package.json` + `HERO-SECTION-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Write the **hero section copy** — everything from the first word a visitor reads to the end of the lead (Type A) or the end of the above-fold copy block (Type B).

This is the **single most conversion-critical copy on the page.** Research shows 5–500% conversion variance based on headline alone. The lead (Type A) determines whether 90% of visitors continue reading or bounce. This skill warrants the highest effort and the most candidates.

**Two fundamentally different executions:**

**Type A output** (Long-Form Sales Page):
- Pre-head / attention getter
- Headline (primary) — 5+ candidates, human selection required
- Deck copy / subheadline
- Lead copy (300–1,000 words) — opens loops, qualifies audience, earns readership

**Type B output** (Ecomm/PDP):
- Product title / H1 (benefit-forward formulation)
- Short description (2–3 sentences, above fold)
- Key benefits bullets (4–6 bullet points)
- Trust badge copy (what the 3–4 badges say)
- Rating strip context (surrounding text)

**Success Criteria:**
- Type A: ≥5 headline candidates scored; human selects before lead is written
- Type A: Lead opens ≥3 curiosity loops that are NOT resolved within the lead
- Type A: Lead passes 5th–7th grade reading level check
- Type B: Product title contains benefit (not just ingredient/name)
- Both types: Zero AI telltales in all copy
- Both types: Self-selection test passes (right audience recognized immediately)
- Hero section score ≥7.5/10 on 10-point audit

This agent **writes actual copy**, not blueprints. Phase 2 skills made the architecture decisions — this skill executes them.

---

## IDENTITY

**This skill IS:**
- The first copy-writing skill in the Landing Page Engine
- The execution layer for LP-03's above-fold blueprint
- The source of the headline, deck, and lead that all other sections must be consistent with
- The single highest-leverage creative output in the system

**This skill is NOT:**
- A strategy or architecture skill (LP-00, LP-03, LP-04 handled strategy)
- The benefits section writer (LP-09 handles ingredient/feature deep-dives)
- The social proof writer (LP-10 handles testimonials)
- The trust element generator (LP-08 handles trust bars below fold)

**Upstream:** `page-brief.json` (LP-00), `above-fold-blueprint.json` (LP-03), `section-sequence.json` (LP-04), `copy_assets` from LP-00 (headline territory, mechanism name, promise statement if available)
**Downstream:** `hero-section-package.json` feeds LP-15 (Assembly). Selected headline feeds LP-08, LP-09, LP-10 as the threading anchor. Lead feeds LP-15 for threading callbacks.

---

## STATE MACHINE

```
IDLE → TRIGGERED
  ↓
LAYER_0: Load upstream packages + specimens
  → 0.1: Package loader (brief, above-fold blueprint, section sequence)
  → 0.2: Copy asset extractor (headline territory, mechanism, promise from LP-00)
  → 0.3: Specimen loader (type-matched hero section specimens)
  ↓ [GATE_0: Required inputs present?]
LAYER_1: Structural decisions
  → 1.1: Headline type confirmation (confirm LP-03 selection OR re-evaluate)
  → 1.2: Lead type selector (Type A only — 6-type taxonomy)
  → 1.3: Hook strategy planner (first sentence approach)
  ↓ [GATE_1: Headline type confirmed? Lead type selected (Type A)?]
LAYER_2: Generation — 3-Lens System
  → 2.1: Pre-head generator (3 options)
  → 2.2: Headline generator (3 lenses × 3+ candidates = 9+ total → score → top 5)
  → 2.3: Deck copy generator (3 options per top headline candidate)
  → 2.4: Lead generator (Type A only — 3 lenses, first draft)
  → 2.5: Type B above-fold copy (product title + short desc + benefits + badge copy)
  ↓
★ HUMAN SELECTION CHECKPOINT (BLOCKING)
  → Present: top 5 headlines + deck options + (Type A) lead draft
  → Human selects headline + deck + confirms or revises lead approach
  → Creates HERO_SELECTION.yaml
  → Layer 3 CANNOT begin without HERO_SELECTION.yaml
  ↓ [GATE_2: HERO_SELECTION.yaml exists?]
LAYER_3: Polish + validation
  → 3.1: Selected lead revision (Type A — incorporate selection feedback)
  → 3.2: Loop audit (Type A — verify ≥3 open loops)
  → 3.3: Self-selection test
  → 3.4: Anti-slop scanner
  → 3.5: Reading level check
  → 3.6: 10-point hero audit
  ↓ [GATE_3: Hero audit score ≥7.5? All validation checks pass?]
LAYER_4: Package assembly
  → 4.1: hero-section-package.json compiler
  → 4.2: HERO-SECTION-SUMMARY.md writer
  → 4.3: execution-log.md writer
  ↓
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Package Loader | Load page-brief, above-fold-blueprint, section-sequence | packages-loaded.md |
| 0.2: Copy Asset Extractor | Pull headline territory, mechanism name, promise, FSSIT if available | copy-assets.md |
| 0.3: Specimen Loader | Load type-matched hero section specimens (by vertical + page type) | specimens-loaded.md |

**GATE_0:** All three upstream package files loaded. Copy assets extracted (even if `not_available`). Specimens loaded with at least 3 examples.

### Layer 1: Structural Decisions

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Headline Type Confirmation | Confirm LP-03 headline type OR re-evaluate based on full copy asset context | headline-type-confirmed.md |
| 1.2: Lead Type Selector (Type A) | Select from 6 lead types against audience + awareness stage | lead-type-selected.md |
| 1.3: Hook Strategy Planner | Decide first-sentence approach for headline and lead | hook-strategy.md |

**GATE_1:** Headline type confirmed with rationale. Lead type selected (Type A) or marked N/A (Type B).

### Layer 2: Generation

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Pre-Head Generator | Write 3 pre-head variants | pre-heads.md |
| 2.2: Headline Generator | 3-lens × 3+ each = 9+ candidates, scored, top 5 presented | headline-candidates.md |
| 2.3: Deck Copy Generator | 3 deck variants per top-2 headline candidates | deck-candidates.md |
| 2.4: Lead Generator (Type A) | Full lead draft in selected lead type using 3-lens system | lead-draft.md |
| 2.5: Type B Above-Fold Copy | Product title + short desc + benefits bullets + badge copy | typeb-abovefold.md |

**Note:** 2.4 runs for Type A only. 2.5 runs for Type B only. Both run for Hybrid (2.5 for above-fold zone, 2.4 for lead below the fold zone).

**GATE_2 (BLOCKING — HUMAN CHECKPOINT):**
Present all candidates. Require HERO_SELECTION.yaml before Layer 3 begins.

### Layer 3: Polish + Validation

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: Lead Revision (Type A) | Revise lead based on human selection notes | lead-final.md |
| 3.2: Loop Audit (Type A) | Count and verify open curiosity loops — minimum 3 | loop-audit.md |
| 3.3: Self-Selection Test | Verify right audience identified in first 2 sentences | self-selection-test.md |
| 3.4: Anti-Slop Scanner | Zero AI telltales check — must pass | anti-slop-scan.md |
| 3.5: Reading Level Check | Hemingway score — must be ≤ grade 8 | reading-level.md |
| 3.6: 10-Point Hero Audit | Score final hero section package | hero-audit.md |

**GATE_3:** Hero audit ≥7.5/10 AND loop audit ≥3 loops (Type A) AND anti-slop passes AND reading level ≤ grade 8.

### Layer 4: Package Assembly

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Package Compiler | Assemble hero-section-package.json | hero-section-package.json |
| 4.2: Summary Writer | Write HERO-SECTION-SUMMARY.md | HERO-SECTION-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Loading + extraction | haiku | Mechanical file operations |
| 1 | Structural decisions | sonnet | Decision + classification |
| 2.1–2.3 | Headline + deck generation | opus | Highest-leverage creative output — max quality |
| 2.4 | Lead generation (Type A) | opus | Second-highest conversion driver |
| 2.5 | Type B above-fold | sonnet | More structured, less open-ended than Type A |
| 3.1 | Lead revision | opus | Revisions require full understanding of selection |
| 3.2–3.5 | Validation checks | sonnet | Systematic checks, not creative generation |
| 3.6 | Hero audit | sonnet | Scoring against checklist |
| 4 | Package assembly | haiku | Mechanical assembly |

## POSITIONAL REINFORCEMENT — READ THIS AT EVERY LAYER ENTRY

> **CRITICAL CONSTRAINTS REMINDER:** Read LP-07-ANTI-DEGRADATION.md. Every microskill produces its own file. Gates are PASS/FAIL only. Numbers are exact. No synthesis without reading individual specs.

---

## THE 3-LENS GENERATION SYSTEM

LP-07 uses a **3-Lens** system for headline and lead generation. This replaces the CopywritingEngine's 7-persona Arena with a landing-page-specific perspective framework.

### Lens 1: The Converter
**Perspective:** Pure direct response optimization. What formula has been proven to work in this market?
**Generates:** Proven headline formulas applied to this specific offer. Benefit-forward, specific-claim, curiosity-gap techniques.
**Voice characteristics:** Direct, benefit-first, number-specific where possible, action-oriented.
**Primary sources:** Classic DR copywriting patterns (Halbert, Makepeace, Bencivenga formulas).

### Lens 2: The Empath
**Perspective:** Voice of customer. Mirrors the exact language the audience uses to describe their problem and desired outcome.
**Generates:** Headlines and leads built from verbatim audience language. Speaks FROM the reader's perspective, not AT them.
**Voice characteristics:** Conversational, validating, uses the audience's own vocabulary, emotionally resonant.
**Primary sources:** Research quotes (from LP-00 copy assets or CopywritingEngine research package).

### Lens 3: The Skeptic
**Perspective:** Credibility-first. Proof anchors, specificity, anti-hype. Would a suspicious reader believe this in the first 10 seconds?
**Generates:** Headlines and leads that lead with evidence, specifics, and established authority. Counterintuitive, pattern-interrupting.
**Voice characteristics:** Matter-of-fact, number-rich, credential-forward, makes claims that feel EARNED not ASSERTED.
**Primary sources:** Clinical data, authority figures, social proof volumes, counterintuitive truths.

### 3-Lens × 3 Rounds = 9+ Candidates Minimum

```
ROUND 1:
  Each lens generates 3+ headline candidates
  = 9+ total candidates
  Score each against 7-criteria scoring rubric
  Identify winner per lens

ROUND 2 (Refinement):
  Each lens refines its Round 1 winner
  Lenses learn from each other's winning techniques (not voice)
  = 3 refined candidates

SYNTHESIS:
  Architect creates 1–2 phrase-level hybrids
  = 1–2 additional candidates

FINAL PRESENTATION:
  Top 5 scored candidates presented for human selection
  = 5 distinct options
```

---

## HEADLINE GENERATION FRAMEWORK

### The 7 Headline Types (from LP-03 taxonomy)

| Type | Pattern | Best For |
|------|---------|---------|
| T1: Direct Benefit | "[Specific Result] in [Timeframe] Without [Common Objection]" | Warm traffic, Stage 3+ |
| T2: Curiosity/Revelation | "[Authority] Reveals/Discovers the [Specific Reason] [Target Audience] [Problem]" | Cold traffic, Stage 1-2 |
| T3: Problem-First | "If You've [Tried X] and Still [Problem], [Revelation Promise]" | Problem-Aware |
| T4: Warning/Alert | "WARNING: The [Popular/Common Thing] That's [Secretly Doing Bad Thing]" | Cold, pattern interrupt |
| T5: Question | "Are You [Doing/Experiencing Problem] That [Consequence]?" | Self-identification |
| T6: How-To/Discovery | "How a [Credentialed Person/Situation] Discovered [Solution] [Specifics]" | Story-first |
| T7: Number-Specific | "[Specific Number] [Target Audience] Have [Result] — Here's [What/How]" | Social proof anchor |

### Headline Scoring Rubric (7 Criteria)

Score each headline 1–10 on each criterion. Calculate weighted score.

| Criterion | Weight | What It Measures |
|-----------|--------|-----------------|
| **Specificity** | 25% | Does it contain a specific number, timeframe, person, claim? Generic = 1, Highly specific = 10 |
| **Relevance** | 20% | Would the target audience immediately recognize this is for them? Wrong audience = 1, Perfect self-selection = 10 |
| **Curiosity Gap** | 20% | Does it open a loop without closing it? Fully explained = 1, Tantalizing incomplete = 10 |
| **Believability** | 15% | Would a skeptical reader believe this claim without thinking it's BS? Unbelievable = 1, Immediately credible = 10 |
| **Urgency / Pull** | 10% | Does it create a reason to read now rather than later? No pull = 1, Compelling = 10 |
| **Freshness** | 5% | Is it differentiated from every headline in this market? Total cliché = 1, Original = 10 |
| **Voice Match** | 5% | Does it match the voice direction from page-brief.json? Mismatched = 1, Perfect = 10 |

**Minimum thresholds:**
- Overall weighted score: ≥7.0 to qualify for top-5 presentation
- Specificity: ≥6.0 (generic headlines are disqualified)
- Believability: ≥6.0 (unbelievable headlines are disqualified regardless of other scores)

---

## LEAD TYPE TAXONOMY (TYPE A)

The lead is the first 300–1,000 words after the headline. It determines whether 90% of visitors continue reading.

### Lead Type 1: Story Lead
**Structure:** Opens immediately in a specific scene. No setup, no explanation — you're in the moment.
**Best for:** Cold traffic, high-skepticism markets, audiences who've tried everything (health, financial, personal development)
**Opening pattern:** "[Specific Scene]..." — first sentence drops reader into a vivid specific moment
**Example opener:** "It was 3 AM when Dr. [Name] finally made the connection that would change how doctors treat [condition]."
**Loop function:** Opens the story loop — reader must know what happened next

### Lead Type 2: Promise Lead
**Structure:** States the core promise in the first sentence. Then immediately qualifies who it's for and why it's different.
**Best for:** Warm traffic, Stage 3–4 awareness, audiences who know solutions exist
**Opening pattern:** "[Primary Benefit] is now possible for [Specific Audience] — even if [Common Objection]."
**Loop function:** Opens the "how" loop — reader must know the mechanism

### Lead Type 3: Probing Question Lead
**Structure:** Opens with a series of questions the target reader mentally says "yes" to. Each question increases identification.
**Best for:** Problem-aware audiences, self-selection-first markets
**Opening pattern:** "Do you [experience problem]? Have you tried [common solution] with no results? Are you [specific frustration]?"
**Loop function:** Opens the "there's an answer" loop — implied solution

### Lead Type 4: Secret/Revelation Lead
**Structure:** Opens with a promise that hidden information is about to be shared. Creates immediate curiosity and importance.
**Best for:** Curiosity-heavy markets, cold traffic with financial/health/insider angle
**Opening pattern:** "What I'm about to share has been [kept hidden / unknown / used only by X] — until now."
**Loop function:** Opens the "what is it" loop — reader must know the secret

### Lead Type 5: Agitation Lead (Problem-First)
**Structure:** Opens by agitating the pain as specifically as possible. Reader feels seen and validated before solution is mentioned.
**Best for:** High-pain markets, audiences who feel no one understands their problem
**Opening pattern:** "[Vivid description of the worst moment / feeling of the problem]."
**Loop function:** Opens the "relief" loop — reader must know the way out

### Lead Type 6: If-Then (Conditional Qualifier) Lead
**Structure:** Qualifies the audience immediately. "If you [specific condition], then this is for you."
**Best for:** Highly targeted traffic, niche-specific claims, direct offers to specific segments
**Opening pattern:** "If you're a [specific descriptor] who [specific situation], pay close attention."
**Loop function:** Opens the "what's about to be revealed" loop — specificity creates urgency

---

## CURIOSITY LOOP FRAMEWORK (TYPE A)

A curiosity loop is a gap between what the reader knows and what they want to know. Great leads open MULTIPLE loops without closing any of them.

### Types of Loops

| Loop Type | How to Open It | Example |
|-----------|---------------|---------|
| **The Story Loop** | Begin a story and don't finish it | "That discovery would change everything — but first, you need to understand why..." |
| **The Revelation Loop** | Promise a revelation, delay it | "In a moment, I'll show you exactly what [expert] discovered. But first..." |
| **The Mechanism Loop** | Name the mechanism, don't explain it | "The reason is something called [Named Thing]. I'll explain exactly how it works in a minute." |
| **The Villain Loop** | Identify a villain, don't indict them yet | "There's something most doctors don't tell you about [condition] — and once you know it, everything changes." |
| **The Proof Loop** | Tease proof that will appear later | "By the time you finish reading this, you'll have seen the clinical results that convinced even the most skeptical researchers." |
| **The Identification Loop** | Create self-recognition, promise specific relevance | "If that sounds familiar, you need to read every word of this page." |

### Loop Rules

1. **Open at least 3 loops** before the first CTA appears
2. **Never close a loop** within the lead — loops that close are satisfied readers who stop
3. **Reference loops from earlier** to keep them active: "Remember what I said about [X]..."
4. **Layer loops** — open a new one before fully developing the previous
5. **Promise resolution** — every loop must eventually close (in the mechanism, product intro, or proof sections — NOT in the lead)

---

## TYPE B ABOVE-FOLD COPY FRAMEWORK

### Product Title / H1 Formula

The H1 is not the brand name. It is the **benefit-forward product description**.

**Bad (brand-first):** "NeuroBoost Pro 500mg"
**Good (benefit-forward):** "Advanced Focus & Memory Support — Clinically Studied Nootropic Formula"

**H1 Formula options:**

| Formula | Example |
|---------|---------|
| `[Primary Benefit] + [Secondary Benefit] + [Mechanism Hint]` | "Deeper Sleep + More Energy — Natural Magnesium Supplement" |
| `[Mechanism Name] + [Primary Benefit]` | "Magnesium Breakthrough — 7 Forms for Complete Absorption & Relaxation" |
| `[Audience Qualifier] + [Primary Benefit]` | "For Women 40+ — Hormone Balance & Energy Support" |
| `[Result] + [Timeframe]` | "Visible Skin Improvement in 30 Days — Marine Collagen Formula" |

### Short Description Rules

- 2–3 sentences maximum
- Sentence 1: Core benefit claim (specific, credible)
- Sentence 2: Mechanism hint or differentiation
- Sentence 3: Risk removal (guarantee mention) OR social proof signal

**Example:**
> "Clinically studied magnesium complex supports deeper sleep, less stress, and sustained energy — without the laxative effect of inferior forms. Our 7-form blend delivers what your body actually absorbs. Backed by a 365-day unconditional guarantee."

### Key Benefits Bullets (4–6 items)

**Each bullet format:** `[Icon/Emoji] [Benefit in 8–12 words — present tense, outcome-focused]`

**Rules:**
- Start with a BENEFIT verb (Supports, Promotes, Helps restore, Delivers, Naturally boosts)
- Avoid starting with the ingredient name
- Each bullet is a distinct benefit (no overlap)
- Order: Most compelling first, second-most compelling last (middle bullets are skimmed)

**Example:**
> ⚡ Supports sustained energy without crashes or jitters
> 😴 Promotes deeper, more restorative sleep quality
> 🧠 Helps maintain sharp mental focus throughout the day
> 💪 Supports healthy muscle recovery after exercise
> 🌿 Sourced from 100% natural, third-party tested ingredients

### Trust Badge Copy

Each badge = 3–5 words maximum. Use specific certifications where real; use benefit language where not certified.

| Badge Type | Copy Example |
|-----------|-------------|
| Guarantee | "365-Day Money Back" |
| Manufacturing | "GMP Certified Facility" |
| Testing | "Third-Party Tested" |
| Shipping | "Free Shipping Over $50" |
| Security | "Secure Checkout" |
| Formula | "Non-GMO · Gluten Free" |

---

## 10-POINT HERO SECTION AUDIT

Score each point 0 (fail) or 1 (pass). Minimum 7.5/10 to proceed.

**Headline Quality (3 points)**
1. Headline specificity score ≥7.0 (contains specific number, name, timeframe, or claim)
2. Headline believability score ≥7.0 (a skeptic would not immediately dismiss it)
3. Headline opens at least one curiosity loop without closing it

**Lead Quality — Type A (3 points)**
4. Lead opens ≥3 curiosity loops by the end of the first 200 words
5. Lead reading level ≤ grade 8 (Hemingway check)
6. Lead self-selects the target audience within the first 2 sentences

**Above-Fold Quality — Type B (3 points — replaces points 4-6 for Type B)**
4. Product title is benefit-forward (not brand name alone)
5. Short description states a specific claim in the first sentence
6. Key benefits bullets are outcome-focused (not ingredient/feature names)

**Universal (1 point for both types)**
7. Zero AI telltales in any copy element
8. Hero section answers "What is this?" in 5 seconds
9. Hero section answers "Who is this for?" in 8 seconds
10. Primary CTA visible or immediately accessible after hero section

**Type A: Points 1–3 + 4–6 + 7–10 = 10 points**
**Type B: Points 1–3 + (Type B 4–6) + 7–10 = 10 points**

---

## HERO_SELECTION.YAML SCHEMA

Required before Layer 3 begins:

```yaml
# HERO_SELECTION.yaml
project: "[product name]"
created: "[ISO timestamp]"
selected_by: "human"

headline:
  selected_candidate_id: "[e.g., H2-Lens2-R2]"
  selected_text: "[exact headline text]"
  score: "[X.X/10]"
  modification_notes: "[Any edits the human reviewer wants — or: 'Use as-is']"

deck_copy:
  selected_option: "[A | B | C]"
  selected_text: "[exact deck copy text]"
  modification_notes: "[Any edits — or: 'Use as-is']"

pre_head:
  selected_option: "[1 | 2 | 3 | 'Skip']"
  selected_text: "[exact pre-head text or: 'None']"

type_a_lead: # (Type A and Hybrid only)
  lead_type_confirmed: "[lead type name]"
  first_draft_rating: "[1-10]"
  revision_direction: "[Specific notes for Layer 3.1 revision — or: 'Approved as-is']"

type_b_above_fold: # (Type B and Hybrid only)
  product_title_approved: "[Y/N]"
  product_title_revision: "[text if revision needed — or: 'Approved as-is']"
  description_approved: "[Y/N]"
  benefits_approved: "[Y/N]"
  notes: "[any additional notes]"

threading_anchor:
  primary_hook_phrase: "[The key phrase from the selected headline that will thread through the page]"
  promise_statement: "[The core promise as stated in the selected headline + deck]"
```

---

## ANTI-SLOP WORD LIST (HERO SECTION SPECIFIC)

The following words/phrases are **FORBIDDEN** in all hero section copy:

```
CATEGORY 1 — AI Telltales:
revolutionary, game-changing, groundbreaking, cutting-edge, breakthrough,
innovative, state-of-the-art, next-level, unprecedented, transformative,
unlock your potential, harness the power, leverage, synergy, holistic approach

CATEGORY 2 — Vague Benefit Language:
feel better, feel amazing, live your best life, optimal health,
overall wellness, total wellbeing, achieve your goals, on your journey,
life-changing, powerful results, incredible benefits, amazing formula

CATEGORY 3 — Unearned Claims:
the best, the most effective, the #1 [without sourced data],
proven [without specifying what was proven], scientifically proven [without study],
doctor-approved [without named doctor], clinically proven [without citation]

CATEGORY 4 — Generic CTA Language:
click here to learn more, discover the secret, find out how,
don't miss out, act now, limited time offer [without deadline]

CATEGORY 5 — Passive / Hedge Language:
may help, could potentially, might support, has been known to,
some people find, many users report [in headline — acceptable in testimonials]
```

---

## SPECIMEN LOADING PROTOCOL

Before any generation, load specimens by page type and vertical:

**Type A — Long-Form:**
- Load 2–3 headlines from the same vertical (health supplement DR, info product, financial)
- Load 1–2 lead openings from the same lead type selected in Layer 1
- Source: `04-page-builder/specimens/long-form-sales-pages/[vertical]/`

**Type B — Ecomm/PDP:**
- Load 2–3 product titles and short descriptions from comparable DTC brands
- Load 1–2 key benefits bullet examples from similar category
- Source: `04-page-builder/specimens/ecomm-pdp/[vertical]/`

**If specimen directory is empty (early build):** Load specimens from the Trello swipe vault index. Reference the relevant brand examples from MASTER-PRD.md SWIPE VAULT INDEX.

---

## FORBIDDEN BEHAVIORS

1. ❌ Generating fewer than 9 headline candidates (3 lenses × 3 minimum each)
2. ❌ Presenting headlines for selection without scores against the 7-criteria rubric
3. ❌ Beginning Layer 3 without HERO_SELECTION.yaml — this gate is absolute
4. ❌ Writing the lead (Type A) before the headline is selected — lead must reflect the selected headline's promise and angle
5. ❌ Fewer than 3 open curiosity loops in the lead (Type A) — loops are the mechanism of continued readership
6. ❌ Closing any loop within the lead — loops that close produce satisfied readers who stop reading
7. ❌ Product title that is only the brand/product name (Type B) — must be benefit-forward
8. ❌ Key benefits bullets that start with ingredient names — benefits lead, ingredients follow
9. ❌ Any AI telltales from the anti-slop word list — immediate revision required
10. ❌ Hero audit score below 7.5 — must revise until score is met
11. ❌ Skipping specimen loading — specimens are required before any generation begins
12. ❌ Using a generic pre-head ("ATTENTION: [demographic]") — pre-head must be specific to the problem or promise
13. ❌ Deck copy that simply repeats the headline in different words — must add new information (mechanism hint, specificity, audience qualification, or benefit expansion)
14. ❌ Reading level above grade 8 in the lead — revise until compliant
