# LP-14: CTA Copy Optimizer — Master Agent

> **Version:** 1.0
> **Skill:** LP-14-cta-optimizer
> **Position:** Phase 3 — Final Writing Skill
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (`page-brief.json`), LP-03 (`above-fold-blueprint.json`), LP-06 (`offer-cta-architecture.json`), LP-07 (`hero-section-package.json`), LP-13 (`urgency-package.json`)
> **Output:** `cta-copy-package.json` + `CTA-COPY-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Write **all CTA copy** for the landing page — button text, surrounding context, P.S. copy, final close paragraph, and inline micro-CTAs. This is the last piece of persuasion between the reader and the conversion event.

CTA copy is deceptively simple. The button says 3-8 words. But those 3-8 words must carry the full emotional weight of every section that preceded them. Bad CTA copy undoes thousands of words of persuasion. Good CTA copy converts a reader who was 60% convinced into a buyer.

**This skill produces 6-10 primary CTA variations** using the 3-Lens system (3 lenses x 2+ emotional appeals each), plus secondary CTAs for different page positions, P.S. copy, a final close paragraph, and micro-CTAs for inline use.

**Success Criteria:**
- 9+ primary CTA candidates generated (3 lenses x 3+ each)
- All 6 emotional appeal types represented across candidates
- Human selects primary, secondary, and P.S. copy before validation
- P.S. copy restates — does NOT introduce new claims
- Final close paragraph references the threading anchor from LP-07
- CTA audit score >= 7.5/10
- Zero AI telltales in all copy
- All CTA button text is 3-8 words (max 12 for surrounding context copy)

This agent **writes actual copy**, not blueprints. Phase 2 skills made the architecture decisions — this skill executes them.

---

## IDENTITY

**This skill IS:**
- The final copy-writing skill in the Landing Page Engine
- The execution layer for LP-06's CTA architecture decisions (placement count, emotional categories, guarantee terms)
- The source of every CTA, P.S., and final close paragraph on the page
- The skill that closes the promise loop opened in LP-07's hero section

**This skill is NOT:**
- A strategy or architecture skill (LP-06 handled CTA architecture)
- The urgency/scarcity writer (LP-13 produced urgency copy — LP-14 REFERENCES it, does not recreate it)
- The offer/pricing writer (LP-11 handled pricing, value stacks, guarantee copy)
- The hero section writer (LP-07 wrote the headline and lead that LP-14's CTAs must thread back to)

**Upstream:** `page-brief.json` (LP-00), `above-fold-blueprint.json` (LP-03), `offer-cta-architecture.json` (LP-06), `hero-section-package.json` (LP-07), `urgency-package.json` (LP-13)
**Downstream:** `cta-copy-package.json` feeds LP-15 (Page Assembly)

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Load upstream packages + specimens
  -> 0.1: Brief loader (page-brief, offer-cta-architecture, hero-section-package)
  -> 0.2: CTA architecture loader (placement count, emotional appeal categories, guarantee terms)
  -> 0.3: Specimen CTA loader (type-matched CTA specimens by vertical + page type)
  | [GATE_0: Required inputs present? CTA architecture loaded? Specimens loaded?]
LAYER_1: Planning
  -> 1.1: CTA type planner (map 6 emotional appeals to page positions)
  -> 1.2: Emotional appeal mapper (assign lenses to appeal types)
  -> 1.3: P.S. strategy planner (how many P.S. lines, which benefit to restate)
  | [GATE_1: CTA plan covers all page positions? P.S. strategy defined?]
LAYER_2: Generation — 3-Lens System
  -> 2.1: Primary CTA generator (3-Lens x 3+ each = 9+ candidates)
  -> 2.2: Secondary CTA generator (variants for different page positions)
  -> 2.3: P.S. copy writer (1-3 P.S. lines)
  -> 2.4: Final close paragraph writer (3-5 sentences bridging to final CTA)
  -> 2.5: Micro-CTA writer (inline/contextual CTAs between sections)
  |
* HUMAN SELECTION CHECKPOINT (BLOCKING)
  -> Present: top CTA candidates + P.S. options + final close draft
  -> Human selects primary CTA, secondary CTAs, P.S. copy, confirms final close
  -> Creates CTA_SELECTION.yaml
  -> Layer 3 CANNOT begin without CTA_SELECTION.yaml
  | [GATE_2: CTA_SELECTION.yaml exists?]
LAYER_3: Validation
  -> 3.1: CTA copy validator (threading, length, emotional appeal coverage)
  -> 3.2: Emotional appeal audit (all 6 types represented in final set)
  -> 3.3: Anti-slop scanner (zero AI telltales)
  -> 3.4: CTA audit (10-point scoring, >= 7.5)
  | [GATE_3: CTA audit score >= 7.5? All validation checks pass?]
LAYER_4: Package assembly
  -> 4.1: CTA package compiler (cta-copy-package.json)
  -> 4.2: Summary writer (CTA-COPY-SUMMARY.md)
  -> 4.3: Log writer (execution-log.md)
  |
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Brief Loader | Load page-brief, offer-cta-architecture, hero-section-package, urgency-package | packages-loaded.md |
| 0.2: CTA Architecture Loader | Extract CTA placement count, emotional appeal categories, guarantee terms, page positions | cta-architecture-loaded.md |
| 0.3: Specimen CTA Loader | Load type-matched CTA specimens from swipe vault (by vertical + page type) | specimens-loaded.md |

**GATE_0:** All upstream package files loaded. CTA architecture extracted. Specimens loaded with at least 3 examples.

### Layer 1: Planning

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: CTA Type Planner | Map 6 emotional appeal types to page positions from LP-06 architecture | cta-type-plan.md |
| 1.2: Emotional Appeal Mapper | Assign 3 lenses to the 6 emotional appeal types for generation | emotional-appeal-map.md |
| 1.3: P.S. Strategy Planner | Decide P.S. count (1-3), select benefit to restate, select proof point | ps-strategy.md |

**GATE_1:** CTA plan covers all CTA positions defined in LP-06. P.S. strategy defined with specific benefit and proof point selected.

### Layer 2: Generation

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Primary CTA Generator | 3-lens x 3+ each = 9+ primary CTA candidates with emotional appeal tags | primary-cta-candidates.md |
| 2.2: Secondary CTA Generator | Position-specific CTA variants (above-fold, mid-page, post-proof, post-testimonial) | secondary-cta-candidates.md |
| 2.3: P.S. Copy Writer | Write 1-3 P.S. lines that RESTATE (never introduce) | ps-copy-draft.md |
| 2.4: Final Close Writer | Write final close paragraph (3-5 sentences) bridging to terminal CTA | final-close-draft.md |
| 2.5: Micro-CTA Writer | Write inline/contextual CTAs for between-section placement | micro-cta-candidates.md |

**Note:** 2.1 runs for all page types. 2.2 adapts based on LP-06's CTA placement count. 2.5 is for Type A and Hybrid pages only (Type B typically has fewer inline CTAs).

**GATE_2 (BLOCKING — HUMAN CHECKPOINT):**
Present all candidates. Require CTA_SELECTION.yaml before Layer 3 begins.

### Layer 3: Validation

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: CTA Copy Validator | Threading check, length check, emotional appeal coverage | cta-validation.md |
| 3.2: Emotional Appeal Audit | Verify all 6 appeal types represented in final CTA set | emotional-appeal-audit.md |
| 3.3: Anti-Slop Scanner | Zero AI telltales check — must pass | anti-slop-scan.md |
| 3.4: CTA Audit | 10-point scoring — minimum 7.5 to proceed | cta-audit.md |

**GATE_3:** CTA audit >= 7.5/10 AND anti-slop passes AND emotional appeal audit shows >= 5 of 6 types represented AND all CTA button text 3-8 words.

### Layer 4: Package Assembly

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Package Compiler | Assemble cta-copy-package.json | cta-copy-package.json |
| 4.2: Summary Writer | Write CTA-COPY-SUMMARY.md | CTA-COPY-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Loading + extraction | haiku | Mechanical file operations |
| 1 | Planning + classification | sonnet | Decision + classification |
| 2.1 | Primary CTA generation (3-Lens) | opus | Highest-leverage creative — max quality on button text |
| 2.2 | Secondary CTA variants | sonnet | Structured variants of primary selections |
| 2.3 | P.S. copy | opus | P.S. is high-conversion copy — requires nuance |
| 2.4 | Final close paragraph | opus | Must thread back to LP-07's promise — creative integration |
| 2.5 | Micro-CTAs | sonnet | Shorter, more formulaic inline prompts |
| 3.1-3.3 | Validation checks | sonnet | Systematic checks, not creative generation |
| 3.4 | CTA audit | sonnet | Scoring against checklist |
| 4 | Package assembly | haiku | Mechanical assembly |

---

## THE 3-LENS CTA SYSTEM

LP-14 uses the same **3-Lens** framework as LP-07, adapted from headline generation to CTA copy generation.

### Lens 1: The Converter
**Perspective:** Pure DR optimization. What CTA formula has been proven to work in this market? Action-oriented, benefit-first, specificity-driven.
**Generates:** CTAs built from proven DR formulas — "Get Your [Specific Result] Now" / "Start My Free Trial" / "Add to Cart — Save 25%"
**Voice characteristics:** Direct, imperative, benefit-first, specific where possible, action verb opening.
**CTA patterns:** Command + Benefit, Command + Specificity, Command + Urgency.
**Primary sources:** Tested CTA formulas from DR specimens, e-commerce conversion data.

### Lens 2: The Empath
**Perspective:** Voice of customer. The CTA uses the reader's own language to describe what they want. The button says what the reader is thinking.
**Generates:** CTAs built from audience language — "Yes, I Want [How Customer Describes Result]" / "Help Me [Customer's Own Language for Problem]"
**Voice characteristics:** First-person possessive ("my"), conversational, emotionally resonant, uses audience vocabulary not brand vocabulary.
**CTA patterns:** "Yes, I Want..." / "Give Me..." / "Help Me..." / "Show Me..."
**Primary sources:** Research quotes (from LP-00 copy assets or CopywritingEngine research package), voice-of-customer language.

### Lens 3: The Skeptic
**Perspective:** Proof-anchored. The CTA addresses the reader's hesitation directly. The button text reduces risk or provides evidence.
**Generates:** CTAs that prove before they ask — "Try Risk-Free for 365 Days" / "See the Clinical Results" / "Join 83,502+ Customers"
**Voice characteristics:** Matter-of-fact, proof-embedded, risk-reduction language, specific numbers.
**CTA patterns:** Risk Removal + Action, Proof Anchor + Action, Social Proof + Action.
**Primary sources:** Guarantee terms from LP-06, social proof volumes from LP-10, clinical/authority data.

### 3-Lens x 3+ Rounds = 9+ Candidates Minimum

```
ROUND 1:
  Each lens generates 3+ CTA candidates (button text + surrounding context)
  = 9+ total candidates
  Tag each with emotional appeal type (1-6)
  Score each against 6-criteria CTA scoring rubric

ROUND 2 (Refinement):
  Top scorer per lens refines using best technique from other lenses
  = 3 refined candidates

SYNTHESIS:
  1-2 hybrid candidates combining best elements
  = 1-2 additional candidates

FINAL PRESENTATION:
  Top 6-10 candidates presented for human selection
```

---

## 6 CTA EMOTIONAL APPEAL TYPES

Every CTA candidate must be tagged with one or more of these emotional appeal types:

| # | Appeal Type | Core Emotion | CTA Pattern | Best For |
|---|------------|-------------|-------------|---------|
| 1 | **Confidence/Desire** | Forward momentum, assumed sale | "Get [X] Now" / "Start [X] Today" | Primary CTA, warm traffic |
| 2 | **Consequence Awareness** | Loss aversion, fear of inaction | "Don't Wait — [Risk]" / "Stop [Bad Outcome]" | Mid-page after problem agitation |
| 3 | **Urgency** | Time pressure, justified scarcity | "Claim Your [X] Before [Deadline]" | Final CTA, post-urgency section (LP-13) |
| 4 | **Social Proof** | Belonging, safety in numbers | "Join [X] Others" / "See Why [X] Chose This" | Post-testimonial position |
| 5 | **Value** | Getting more than paying for | "Get [X] + [Y] + [Z] — Just [Price]" | Post-offer stack, near pricing |
| 6 | **Specificity** | Concrete expectation, tangible result | "Start Seeing [Result] in [Timeframe]" | Above-fold, outcome-aware traffic |

**Coverage requirement:** The final CTA set (after human selection) must represent >= 5 of 6 appeal types across all page positions.

---

## CTA COPY RULES

### Button Text Rules
1. **3-8 words** for button text. Maximum 12 words only for surrounding context copy.
2. **Start with a verb.** Get, Start, Join, Claim, Try, Add, See, Discover.
3. **Use "my" not "your"** when using possessive language. "Start My Free Trial" outperforms "Start Your Free Trial."
4. **Be specific over generic.** "Get My Energy Boost" beats "Buy Now."
5. **Match the page's awareness stage.** Cold traffic: softer CTAs ("See How It Works"). Hot traffic: direct CTAs ("Add to Cart").
6. **Never use "Click Here"** or "Submit" — these are conversion killers.
7. **One verb per CTA.** "Get Started and Save" has two competing actions. Pick one.

### Surrounding Context Rules
1. Context text sits immediately above or below the CTA button.
2. Maximum 1-2 sentences. Function: reduce friction or add proof.
3. Common patterns: guarantee reminder, social proof stat, risk removal.
4. Example: "Join 83,502+ customers. 365-day money-back guarantee." [BUTTON: Get My Bottle Now]

### P.S. Copy Rules
1. P.S. #1: Restate the single strongest benefit + CTA link/button.
2. P.S. #2 (optional): Scarcity/urgency reminder — ONLY if LP-13 provided justified urgency.
3. P.S. #3 (optional): Final proof point (authority or social proof stat).
4. 2-4 sentences MAX per P.S. line.
5. **P.S. MUST NOT introduce new claims, new benefits, new proof, or new mechanisms.** P.S. restates and reminds. If it was not mentioned earlier on the page, it cannot appear in the P.S.
6. P.S. is read by scanners who skip to the bottom — it must stand alone as a mini-pitch.

### Final Close Paragraph Rules
1. 3-5 sentences bridging from the last content section to the terminal CTA.
2. Sentence 1: Brief recap of mechanism or approach (1 sentence, not a re-explanation).
3. Sentence 2: Restate the core promise from LP-07's threading anchor.
4. Sentence 3: Address the final hesitation (risk removal, guarantee, or social proof).
5. Sentence 4-5: CTA with emotional pull — the reader either acts or leaves.
6. The final close CLOSES the promise loop opened in the hero section. Reference LP-07's `threading_anchors.primary_hook_phrase`.

---

## CTA SCORING RUBRIC (6 Criteria)

Score each CTA candidate 1-10 on each criterion. Calculate weighted score.

| Criterion | Weight | 1 (Poor) | 5 (Average) | 10 (Excellent) |
|-----------|--------|----------|-------------|----------------|
| **Specificity** | 25% | Generic ("Buy Now") | Partial benefit hint | Specific benefit/result in button text |
| **Action Clarity** | 20% | Unclear what happens next | Somewhat clear | Reader knows exactly what clicking does |
| **Emotional Pull** | 20% | No emotional trigger | Mild motivation | Strong emotional reason to click |
| **Threading** | 15% | No connection to page promise | Vague reference | Directly echoes LP-07 threading anchor |
| **Risk Reduction** | 10% | No risk addressed | Slight reassurance | Guarantee/proof embedded in CTA context |
| **Freshness** | 10% | Identical to every competitor | Somewhat unique | Original phrasing for this market |

**Weighted score formula:**
`score = (S x 0.25) + (A x 0.20) + (E x 0.20) + (T x 0.15) + (R x 0.10) + (F x 0.10)`

**Minimum to qualify for human presentation:**
- Weighted score >= 7.0
- Specificity >= 6.0 (generic CTAs disqualified)
- Button text 3-8 words (hard requirement)
- Zero forbidden words from anti-slop list

---

## CTA_SELECTION.YAML SCHEMA

Required before Layer 3 begins:

```yaml
# CTA_SELECTION.yaml
project: "[product name]"
created: "[ISO timestamp]"
selected_by: "human"

primary_cta:
  selected_candidate_id: "[e.g., L1-Confidence-R1]"
  button_text: "[exact button text]"
  context_text: "[surrounding context text — or: 'None']"
  emotional_appeal: "[1-6 type name]"
  score: "[X.X/10]"
  modification_notes: "[Any edits — or: 'Use as-is']"

secondary_ctas:
  above_fold:
    button_text: "[text]"
    context_text: "[text or 'None']"
    modification_notes: "[text or 'Use as-is']"
  mid_page:
    button_text: "[text]"
    context_text: "[text or 'None']"
    modification_notes: "[text or 'Use as-is']"
  post_proof:
    button_text: "[text]"
    context_text: "[text or 'None']"
    modification_notes: "[text or 'Use as-is']"
  post_testimonial:
    button_text: "[text]"
    context_text: "[text or 'None']"
    modification_notes: "[text or 'Use as-is']"

ps_copy:
  ps_1:
    text: "[selected P.S. #1 text]"
    modification_notes: "[text or 'Use as-is']"
  ps_2:
    text: "[selected P.S. #2 text — or: 'Skip']"
    modification_notes: "[text or 'Use as-is']"
  ps_3:
    text: "[selected P.S. #3 text — or: 'Skip']"
    modification_notes: "[text or 'Use as-is']"

final_close:
  text: "[selected final close paragraph text]"
  modification_notes: "[text or 'Use as-is']"

micro_ctas:
  selected_count: "[number]"
  selections: "[list of selected micro-CTA IDs — or: 'Use all generated']"
  modification_notes: "[text or 'Use as-is']"
```

---

## ANTI-SLOP WORD LIST (CTA SPECIFIC)

The following words/phrases are **FORBIDDEN** in all CTA copy:

```
CATEGORY 1 -- AI Telltales:
revolutionary, game-changing, groundbreaking, cutting-edge, breakthrough,
innovative, state-of-the-art, next-level, unprecedented, transformative,
unlock your potential, harness the power, leverage, synergy, holistic approach

CATEGORY 2 -- Vague CTA Language:
click here, learn more (as button text), submit, continue,
discover the secret, find out how, see more, read more (as primary CTA)

CATEGORY 3 -- Fabricated Urgency:
act now (without justified deadline), limited time (without LP-13 urgency data),
don't miss out (without specific consequence), hurry (without deadline),
last chance (without verified scarcity from LP-13)

CATEGORY 4 -- Unearned Claims in Context:
the best, the most effective, the #1 [without sourced data],
proven [without specifying what was proven], guaranteed results [without specific guarantee terms from LP-06]

CATEGORY 5 -- Passive/Hedge Language:
may help, could potentially, might support, has been known to,
try it and see, give it a shot, why not try
```

---

## SPECIMEN CTA PATTERNS (Reference)

Known high-performing CTA patterns from specimens:

| Brand | CTA Text | Type | Appeal |
|-------|----------|------|--------|
| LMNT | "Add 1 Lemonade Salt to cart" | Button | Confidence + Specificity |
| MAMG | "start my free trial" | Button | Confidence (possessive, lowercase) |
| Graziosi | "Join The AI Advantage Club" | Button | Social Proof |
| Closers.io | "Schedule Demo" | Button | Confidence (B2B direct) |
| Hyros | "Get started below" | Button | Confidence (low-commitment) |
| Richmond Dinh | "Join The Free Masterclass Now!" | Button | Urgency + Social Proof |
| Native | "ADD TO BUNDLE" | Button | Confidence + Value |

---

## 10-POINT CTA AUDIT

Score each point 0 (fail) or 1 (pass). Minimum 7.5/10 to proceed.

**CTA Quality (4 points)**
1. Primary CTA button text is 3-8 words and starts with a verb
2. Primary CTA contains a specific benefit reference (not generic)
3. Primary CTA threads back to LP-07's promise (uses hook phrase or promise language)
4. At least 3 distinct CTAs exist for different page positions

**P.S. Quality (2 points)**
5. P.S. #1 restates the strongest benefit (does NOT introduce new claims)
6. P.S. copy is 2-4 sentences each (not longer)

**Final Close Quality (2 points)**
7. Final close paragraph references LP-07's threading anchor
8. Final close addresses a specific hesitation (guarantee, proof, or risk removal)

**Coverage + Compliance (2 points)**
9. >= 5 of 6 emotional appeal types represented across all CTA positions
10. Zero AI telltales in any CTA copy element (button text, context, P.S., final close)

**Type A: All 10 points apply**
**Type B: Points 1-4 + 9-10 = 6 core points. P.S. and final close optional for Type B (points 5-8 scored only if included).**

---

## FORBIDDEN BEHAVIORS

1. Generating fewer than 9 primary CTA candidates (3 lenses x 3 minimum each)
2. Presenting CTAs for selection without scores against the 6-criteria rubric
3. Beginning Layer 3 without CTA_SELECTION.yaml — this gate is absolute
4. P.S. copy that introduces NEW claims, benefits, mechanisms, or proof not already on the page
5. CTA button text longer than 8 words
6. Final close paragraph that does NOT reference LP-07's threading anchor
7. Fabricating urgency in CTA text without LP-13 data — if LP-13 has no justified urgency, do NOT add urgency language to CTAs
8. Any AI telltales from the anti-slop word list — immediate revision required
9. CTA audit score below 7.5 — must revise until score is met
10. Skipping specimen loading — specimens are required before any generation begins
11. Using "Click Here" or "Submit" as CTA button text — immediate disqualification
12. Writing P.S. before the primary CTA candidates are generated — P.S. references the CTA
13. Context copy longer than 2 sentences — context is friction-reduction, not persuasion
14. Using "your" instead of "my" in possessive CTA text — "my" outperforms "your"
