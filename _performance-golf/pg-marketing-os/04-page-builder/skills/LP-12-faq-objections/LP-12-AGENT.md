# LP-12: FAQ/Objection Crusher — Master Agent

> **Version:** 1.1
> **Skill:** LP-12-faq-objections
> **Position:** Phase 3 — Element-Level Writing (Post-Offer, Pre-Close)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (`page-brief.json`), LP-01 (`conversion-intelligence.json`), LP-04 (`section-sequence.json`)
> **Output:** `faq-package.json` + `FAQ-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Write the **FAQ/Objection Crusher section** — the 8-12 question-and-answer pairs that systematically dismantle every remaining purchase objection a prospect holds after reading the offer.

The FAQ section is NOT an afterthought. It is the **last line of objection defense** before the final CTA. Conversion data shows a well-constructed FAQ section can lift conversions 5-15% by addressing the exact concerns that prevent a "yes." A bad FAQ (5 softball questions, corporate voice, evasive answers) does nothing — or worse, introduces new doubt.

**Two fundamentally different executions:**

**Type A output** (Long-Form Sales Page):
- 10-12 FAQ items
- Sequenced hardest-first (the biggest objection opens the section — you are not afraid of tough questions)
- Answer tone matches page voice — conversational, direct, confident
- Answers include proof/data where available
- "Hidden objection" technique: address the REAL concern behind the surface question
- Objection categories covered: price/value, efficacy/results, trust/guarantee, timing, comparison, technical/logistics

**Type B output** (Ecomm/PDP) — **PDP Enhancement Layer active:**
- 5-7 FAQ items (Baymard curated rule — NOT the 8-12 used for Type A)
- Curated from real customer sources: reviews > support tickets > competitor FAQs > research quotes
- Sequenced hardest-last (warm readers up with logistics questions, build to price/value/trust)
- Answer tone is factual, direct, helpful — NOT persuasive. No marketing language.
- If answerable in 1 sentence, answer in 1 sentence (no padding)
- Accordion-only format: tap to expand, one open at a time, full accessibility
- Positioned AFTER reviews section (not before it like Type A)
- Uses microskills 1.4 + 2.5 instead of 1.2 + 2.2 + 2.3 + 2.4
- Objection categories covered: product quality, ingredients/formulation, shipping/returns, usage/dosing, price/value, trust/guarantee

**Success Criteria (Type A):**
- 8-12 FAQ items total (hard minimum 8, no exceptions)
- At least 1 price/value objection addressed
- At least 1 "does it work?" / efficacy objection addressed
- At least 1 trust/guarantee objection addressed
- Zero "Great question!" or sycophantic answer openers
- Every answer is product-specific (not generic template fill)
- Answers lead with the direct answer, not a preamble
- FAQ audit score >=7.5/10
- Zero AI telltales in all copy

**Success Criteria (Type B/Hybrid — PDP Enhancement Layer):**
- 5-7 FAQ items total (Baymard curated — hard minimum 5, hard maximum 7)
- At least 1 price/value objection addressed
- At least 1 "does it work?" / efficacy objection addressed
- At least 1 trust/guarantee objection addressed
- Zero marketing language in any answer (Baymard: decreases trust)
- Zero sycophantic answer openers
- Every answer is factual and direct — 1-3 sentences max
- 1-sentence-answerable questions ARE answered in 1 sentence
- Source attribution for every FAQ item (review, support ticket, competitor FAQ, research quote)
- Accordion UX spec complete (behavior, typography, accessibility)
- FAQ audit score >=7.5/10
- Zero AI telltales in all copy

This agent **writes actual FAQ copy**, not strategy documents. Upstream skills made the architecture decisions — this skill executes them.

---

## IDENTITY

**This skill IS:**
- The final objection-handling layer before the close
- The section that converts hesitant prospects into buyers by removing doubt
- The place where price, efficacy, trust, and logistics objections get addressed head-on
- A writing skill that produces production-ready Q&A copy

**This skill is NOT:**
- A strategy skill (LP-00, LP-04 handled strategy; LP-06 handled offer architecture)
- The offer section writer (LP-11 handles pricing and value stack)
- The trust element generator (LP-08 handles trust bars and badges)
- The social proof writer (LP-10 handles testimonials)
- The CTA optimizer (LP-14 handles call-to-action copy)

**Upstream:** `page-brief.json` (LP-00), `conversion-intelligence.json` (LP-01), `section-sequence.json` (LP-04). Optional: `hero-section-package.json` (LP-07), `offer-pricing-package.json` (LP-11) for threading.
**Downstream:** `faq-package.json` feeds LP-15 (Assembly). FAQ items feed LP-17 (Conversion Audit) for objection coverage scoring.

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Load upstream packages + specimens + objection inventory
  -> 0.1: Brief loader (page-brief, conversion-intelligence, section-sequence)
  -> 0.2: Objection inventory loader (extract objections from research/brief)
  -> 0.3: Specimen FAQ loader (type-matched FAQ specimens from swipe vault)
  | [GATE_0: Required inputs present? Objection inventory >= 8 items?]
LAYER_1: Classification + sequencing
  -> 1.1: Objection classifier (categorize each objection into 6 categories)
  -> IF Type A: 1.2: Sequence planner (hardest-first vs hardest-last based on page type)
  -> IF Type B/Hybrid: 1.4: PDP FAQ curation (Baymard top 5-7, sources from reviews/support/competitors)
  -> 1.3: Answer strategy planner (plan answer approach per objection)
  | [GATE_1: All objections classified? Sequence locked? Answer strategies assigned?]
  | [GATE_1 Type B/Hybrid additional: Curated FAQ = 5-7 items? Source attribution present?]
LAYER_2: Generation
  -> 2.1: FAQ header writer (section headline + optional subhead)
  -> IF Type A:
    -> 2.2: Objection answer writer (core objections — price, efficacy, trust, timing, comparison)
    -> 2.3: Technical FAQ writer (product-specific technical questions)
    -> 2.4: Shipping/returns writer (logistics objections — Type B heavy, Type A light)
  -> IF Type B/Hybrid:
    -> 2.5: PDP accordion FAQ writer (all FAQ copy + accordion UX spec)
  |
  [No human checkpoint — structured output, no Arena]
  |
  | [GATE_2 Type A: 8-12 items written? All 3 mandatory categories covered? Zero sycophantic openers?]
  | [GATE_2 Type B/Hybrid: 5-7 items written? All 3 mandatory categories? Zero marketing language? Accordion UX spec complete?]
LAYER_3: Validation
  -> 3.1: FAQ validator (10-point audit)
  -> 3.2: Objection coverage audit (verify all categories represented)
  | [GATE_3: FAQ audit score >= 7.5? Coverage audit PASS?]
LAYER_4: Package assembly
  -> 4.1: faq-package.json compiler
  -> 4.2: FAQ-SUMMARY.md writer
  -> 4.3: execution-log.md writer
  |
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Brief Loader | Load page-brief, conversion-intelligence, section-sequence | packages-loaded.md |
| 0.2: Objection Inventory Loader | Extract and inventory all objections from research/brief data | objection-inventory.md |
| 0.3: Specimen FAQ Loader | Load type-matched FAQ specimens from swipe vault | specimens-loaded.md |

**GATE_0:** All upstream packages loaded. Objection inventory contains >= 8 distinct objections. Specimens loaded with at least 2 real-page FAQ examples.

### Layer 1: Classification + Sequencing

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Objection Classifier | Categorize each objection into 6 categories + identify hidden objection | objection-classification.md |
| 1.2: Sequence Planner | Determine sequence order based on page type (hardest-first vs hardest-last) | sequence-plan.md |
| 1.3: Answer Strategy Planner | Plan answer approach for each objection (proof-based, reframe, direct, social proof) | answer-strategies.md |
| 1.4: PDP FAQ Curation | Baymard "Top 5-7" curated FAQ for PDP pages — sources from reviews, support tickets, competitor FAQs | pdp-faq-curation.md |

**Type B/Hybrid routing:** 1.4 runs INSTEAD of 1.2 for Type B and Hybrid pages. 1.4 both curates (selects top 5-7) AND sequences (hardest-last) in a single pass. 1.1 still runs for all page types. 1.3 still runs for all page types after either 1.2 or 1.4.

**GATE_1:** All objections classified with category + hidden objection identified. Sequence locked with rationale. Answer strategy assigned to each item. For Type B/Hybrid: curated FAQ contains exactly 5-7 items with source attribution.

### Layer 2: Generation

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: FAQ Header Writer | Write section headline + optional subhead | faq-header.md |
| 2.2: Objection Answer Writer | Write Q&A pairs for core objections (price, efficacy, trust, timing, comparison) | core-objection-answers.md |
| 2.3: Technical FAQ Writer | Write Q&A pairs for product-specific technical questions | technical-faq-answers.md |
| 2.4: Shipping/Returns Writer | Write Q&A pairs for logistics objections | logistics-faq-answers.md |
| 2.5: PDP Accordion FAQ Writer | Write all FAQ copy in accordion-ready format + UX spec for PDP pages | pdp-accordion-faq.md |

**Type A routing:** 2.1 + 2.2 + 2.3 + 2.4 run as normal (10-12 items).

**Type B/Hybrid routing:** 2.1 + 2.5 run. 2.5 runs INSTEAD of 2.2 + 2.3 + 2.4 for Type B and Hybrid pages — it combines all FAQ writing into accordion-formatted output with UX specification. Do NOT run 2.2, 2.3, or 2.4 when 2.5 is active.

**Note (Type A only):** 2.2 runs for Type A. 2.3 runs primarily for Type B (supplements, physical products) but may include 1-2 items for Type A (info products — access, format). 2.4 runs primarily for Type B but includes guarantee/refund questions for Type A.

**GATE_2 (Type A):** Total FAQ items across 2.2 + 2.3 + 2.4 = 8-12. All three mandatory objection categories present (price/value, efficacy, trust/guarantee). Zero sycophantic openers ("Great question!", "That's a common concern!", "Absolutely!"). Every answer is product-specific.

**GATE_2 (Type B/Hybrid):** Total FAQ items in 2.5 = 5-7. All three mandatory objection categories present. Zero marketing language in answers. Zero sycophantic openers. All answers factual and direct. Accordion UX spec complete. Every 1-sentence-answerable question IS answered in 1 sentence.

### Layer 3: Validation

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: FAQ Validator | 10-point audit of complete FAQ section | faq-audit.md |
| 3.2: Objection Coverage Audit | Verify all 6 objection categories represented (or justified absent) | coverage-audit.md |

**GATE_3:** FAQ audit score >= 7.5/10 AND coverage audit PASS (all mandatory categories present + at least 4 of 6 total categories covered).

### Layer 4: Package Assembly

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Package Compiler | Assemble faq-package.json | faq-package.json |
| 4.2: Summary Writer | Write FAQ-SUMMARY.md | FAQ-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Loading + extraction + inventory | haiku | Mechanical file operations |
| 1 (1.1, 1.2, 1.3) | Classification + sequencing + strategy | sonnet | Decision + classification |
| 1.4 | PDP FAQ curation (Type B/Hybrid only) | sonnet | Curation requires judgment about which questions matter most |
| 2.1 | FAQ header writing | sonnet | Structured, short output |
| 2.2 | Core objection answer writing (Type A) | opus | Highest-quality answers needed — these handle price/efficacy/trust |
| 2.3 | Technical FAQ writing (Type A) | sonnet | More structured, factual — less creative latitude |
| 2.4 | Shipping/returns writing (Type A) | sonnet | Straightforward logistics copy |
| 2.5 | PDP accordion FAQ writer (Type B/Hybrid only) | opus | FAQ copy must be factual and direct, not persuasive — requires discipline to avoid marketing language |
| 3 | Validation + auditing | sonnet | Systematic checks, not creative generation |
| 4 | Package assembly | haiku | Mechanical assembly |

---

## THE 6 OBJECTION CATEGORIES

Every FAQ section must draw from these 6 categories. Not every category appears in every FAQ, but at least 4 of 6 must be represented, and the 3 mandatory categories (marked with **) MUST appear.

| # | Category | Surface Question | Hidden Objection | Mandatory? |
|---|----------|-----------------|-------------------|------------|
| 1 | **Price/Value** | "Is it worth the money?" "Why so expensive?" "Are there cheaper options?" | "I'm not convinced the value justifies the cost." | **YES** |
| 2 | **Efficacy/Results** | "Does it actually work?" "What results can I expect?" "How fast will I see results?" | "I've been burned before and I don't trust product claims." | **YES** |
| 3 | **Trust/Guarantee** | "What if I don't like it?" "Is this company legitimate?" "What's the return policy?" | "I need an escape hatch before I commit money." | **YES** |
| 4 | Timing | "Do I need this now?" "Can I wait?" "Is there a better time to start?" | "I'm not ready to act — give me permission to delay." | No |
| 5 | Comparison | "How is this different from X?" "Why not just use Y?" "What makes this better?" | "I need to justify choosing this over the alternatives I already know about." | No |
| 6 | Technical/Logistics | "How do I take it?" "How fast does it ship?" "What's in it?" "How do I access it?" | "I need practical answers before I can make a decision." | No |

---

## ANSWER WRITING RULES (Non-Negotiable)

### Structure: Direct Answer -> Supporting Detail -> Confidence Builder

Every answer follows this 3-part structure:

```
[Direct Answer] — 1 sentence. Answers the question. No preamble.
[Supporting Detail] — 1-2 sentences. Proof, data, mechanism, or specifics.
[Confidence Builder] — 1 sentence. Removes remaining doubt or reframes.
```

**Example (Price/Value):**

Q: "Why is this more expensive than other magnesium supplements?"

A: "Magnesium Breakthrough contains all 7 forms of magnesium — most supplements contain only 1-2 cheap forms with poor absorption. Independent testing shows our 7-form blend delivers 3x more bioavailable magnesium per serving than the top 5 competitors. That means you're actually paying less per milligram of magnesium your body can actually use."

### Rules

1. **Lead with the answer.** First sentence directly answers the question. No "That's a great question!" No "Many people ask this." No "Absolutely!" The reader asked a question — answer it.

2. **2-4 sentences maximum.** FAQ answers are scan-friendly. If the answer needs a paragraph, the question is too broad — split it into two questions.

3. **Include proof where available.** Numbers, studies, comparison data, testimonials, specific credentials. A claim without evidence is just another assertion the prospect won't believe.

4. **Address the REAL objection.** "How long does shipping take?" is really "Will I have to wait a long time?" Answer the hidden concern, not just the surface question.

5. **End with confidence, not information.** The last sentence should make the reader feel MORE confident about buying, not just more informed. Reframe, guarantee reference, social proof close.

6. **Product-specific, not generic.** "We stand behind our products" is generic. "1,561 verified reviews averaging 4.8 stars — and a 365-day money-back guarantee if you disagree" is specific.

7. **Match the page voice.** If the page is conversational and direct, the FAQ is conversational and direct. If the page is clinical and authoritative, the FAQ is clinical and authoritative. FAQ voice mismatch is jarring and breaks trust.

---

## SEQUENCING STRATEGIES

### Type A: Hardest First

Open with the biggest objection. This is usually price ("Is it worth the money?") or efficacy ("Does this actually work?"). Starting with the hardest question signals confidence — you are not hiding from tough concerns.

**Type A Sequence Pattern:**
```
1. [Price/Value OR Efficacy — whichever is the #1 objection in this market]
2. [The OTHER of Price/Value or Efficacy]
3. [Trust/Guarantee]
4. [Comparison — "How is this different from..."]
5. [Timing — "Do I need this now?"]
6-8. [Technical/Logistics questions specific to this product]
9-10. [Secondary objections from research]
11-12. [Cleanup — edge case questions that a small % of prospects ask]
```

### Type B: Hardest Last

Start with easy/logistics questions. Build the reader's comfort with short, helpful answers. Then address the harder concerns (price, efficacy, trust) when the reader is already in a positive "this company answers questions well" frame.

**Type B Sequence Pattern:**
```
1-2. [Technical/Logistics — "How do I take it?" "What's in it?"]
3-4. [Product-specific technical — dosing, ingredients, interactions]
5-6. [Comparison — "What makes this different?" "Can I get this elsewhere?"]
7-8. [Efficacy — "Does it work?" "How fast?"]
9. [Trust/Guarantee — "What if it doesn't work for me?"]
10. [Price/Value — "Why is it this price?"]
```

**Hybrid pages:** Use Type B sequence (hardest-last) because the FAQ section in a hybrid page sits after the Type B purchase zone.

---

## ANTI-SLOP WORD LIST (FAQ SECTION SPECIFIC)

The following words/phrases are **FORBIDDEN** in all FAQ copy:

```
CATEGORY 1 -- Sycophantic Openers:
Great question!, That's a common concern, Absolutely!, Of course!,
We're glad you asked, Many people wonder, That's understandable,
We totally get it, Thanks for asking

CATEGORY 2 -- AI Telltales:
revolutionary, game-changing, groundbreaking, cutting-edge, breakthrough,
innovative, state-of-the-art, next-level, unprecedented, transformative,
unlock your potential, harness the power, holistic approach

CATEGORY 3 -- Corporate Evasion:
We stand behind our products [without specifics],
We are committed to quality [without proof],
Your satisfaction is our priority [without guarantee details],
We take [concern] seriously [without action],
Rest assured [without reason]

CATEGORY 4 -- Vague Benefit Language:
optimal health, overall wellness, feel better, powerful results,
incredible benefits, amazing formula, life-changing, total wellbeing

CATEGORY 5 -- Hedge Language in Answers:
may help, could potentially, might support, has been known to,
results may vary [as the primary answer — acceptable as a disclaimer AFTER a direct answer],
individual results differ [as the primary answer]
```

---

## FAQ HEADER OPTIONS

The FAQ section needs a headline. NOT just "Frequently Asked Questions" — that is the default and adds zero persuasive value.

**Type A Headers (conversational, address skepticism):**
- "Still Have Questions? We Figured You Might."
- "Before You Decide — Let's Address the Elephant in the Room"
- "What You're Probably Wondering Right Now"
- "Honest Answers to the Questions That Matter"
- "[X] People Had These Same Questions Before They [Result]"

**Type B Headers (clean, scan-friendly):**
- "Common Questions About [Product Name]"
- "Everything You Need to Know About [Product Name]"
- "Questions? Answers."
- "FAQ"  (acceptable for Type B if the page design handles the section visually)

---

## 10-POINT FAQ AUDIT

Score each point 0 (fail) or 1 (pass). Minimum 7.5/10 to proceed.

**Count + Coverage (3 points)**
1. Total FAQ items: 8-12 (not fewer, not more than 15)
2. Price/value objection addressed (at least 1 item)
3. Efficacy/results objection addressed (at least 1 item)

**Answer Quality (4 points)**
4. Every answer leads with a direct answer (no sycophantic openers, no preambles)
5. Every answer is product-specific (no generic template answers that could apply to any product)
6. At least 3 answers include proof, data, or specific credentials
7. Every answer is 2-4 sentences (scan-friendly length)

**Structural Quality (3 points)**
8. Sequence matches page type strategy (hardest-first for Type A, hardest-last for Type B)
9. Trust/guarantee objection addressed (at least 1 item with specific guarantee details)
10. Zero AI telltales or sycophantic openers in any answer

**Type A: All 10 points apply**
**Type B: All 10 points apply**

---

## SPECIMEN LOADING PROTOCOL

Before any generation, load FAQ specimens by page type and vertical:

**Type A — Long-Form:**
- Load 1-2 FAQ sections from comparable long-form sales pages
- Note: info product FAQs tend to focus on access, time commitment, results timeline
- Source: `04-page-builder/specimens/raw/richmond-dinh-tiny-challenge-raw.md` (info product FAQ example)

**Type B — Ecomm/PDP:**
- Load 2-3 FAQ sections from comparable DTC product pages
- Note: supplement/physical product FAQs include dosing, ingredients, interactions, shipping
- Source: `04-page-builder/specimens/raw/bioptimizers-magnesium-trial-raw.md` (supplement FAQ — 10+ items)
- Source: `04-page-builder/specimens/raw/lmnt-electrolyte-pdp-raw.md` (DTC FAQ — includes radical transparency DIY recipe)

**If specimen directory is sparse:** Reference the relevant brand examples from swipe-vault-index.md.

---

## FORBIDDEN BEHAVIORS

1. Fewer than 8 FAQ items — 8 is the hard minimum, no exceptions
2. Missing a price/value objection — this is the #1 purchase blocker; it MUST be addressed
3. Missing an efficacy/results objection — "does it work?" must be answered
4. Missing a trust/guarantee objection — the escape hatch must be visible
5. Sycophantic answer openers ("Great question!", "Absolutely!", "That's a common concern!")
6. Generic template answers that could apply to any product ("We stand behind our quality")
7. Answers longer than 4 sentences (except for complex technical questions where 5 is acceptable)
8. Closing with hedge language as the primary answer ("Results may vary" without first giving a direct answer)
9. AI telltales from the anti-slop word list — immediate revision required
10. Softball-only FAQ (all easy logistics questions, zero hard price/efficacy/trust questions)
11. FAQ audit score below 7.5 — must revise until score is met
12. Skipping specimen loading — specimens are required before any generation begins
13. Answering questions that were not asked — inventing concerns that do not exist in the research/brief
14. Using "FAQ" or "Frequently Asked Questions" as the only header option presented for Type A pages
15. Using more than 7 FAQ items for PDP pages (Baymard: curated top 5-7 only)
16. Using marketing language in PDP FAQ answers (Baymard: decreases trust)
17. Using inline/open-by-default FAQ format for PDP pages (accordion-only)
18. Running 1.2 + 2.2 + 2.3 + 2.4 for Type B/Hybrid pages when 1.4 + 2.5 should run instead

---

## faq-package.json SCHEMA

```json
{
  "schema_version": "1.0",
  "skill": "LP-12-faq-objections",
  "created": "[ISO timestamp]",
  "project_name": "[product name]",
  "page_type": "[type_a | type_b | hybrid]",

  "faq_header": {
    "headline": "[section headline text]",
    "subhead": "[subhead text or null]"
  },

  "faq_items": [
    {
      "position": 1,
      "question": "[question text]",
      "answer": "[full answer text]",
      "category": "[price_value | efficacy_results | trust_guarantee | timing | comparison | technical_logistics]",
      "hidden_objection": "[the real concern behind this question]",
      "answer_strategy": "[proof_based | reframe | direct | social_proof]",
      "proof_included": "[true | false]",
      "word_count": "[number]",
      "sentence_count": "[number]"
    }
  ],

  "coverage": {
    "total_items": "[number — must be 8-12]",
    "categories_covered": ["[list of categories]"],
    "mandatory_categories_present": {
      "price_value": "[true | false — must be true]",
      "efficacy_results": "[true | false — must be true]",
      "trust_guarantee": "[true | false — must be true]"
    },
    "total_categories": "[number — must be >= 4 of 6]"
  },

  "sequencing": {
    "strategy": "[hardest_first | hardest_last]",
    "rationale": "[why this sequence for this page type]",
    "hardest_objection": "[which question is positioned as the hardest]",
    "hardest_position": "[position number in sequence]"
  },

  "validation": {
    "faq_audit_score": "[X.X/10]",
    "coverage_audit": "[PASS | FAIL]",
    "sycophantic_openers": 0,
    "ai_telltales": 0,
    "all_gates_passed": true
  },

  "downstream_handoffs": {
    "lp_15_assembly": "Complete FAQ section copy in sequence order — ready for page assembly",
    "lp_17_conversion_audit": "Objection category coverage map — audit can verify all critical objections addressed"
  }
}
```

---

## FAQ-SUMMARY.MD REQUIRED SECTIONS

```markdown
# [Product Name] -- FAQ Section Summary

## Page Type: [Type A | Type B | Hybrid]

## FAQ Header
"[Headline text]"
"[Subhead text or: 'None']"

## Objection Categories Covered
| Category | Items | Mandatory? | Present? |
|----------|-------|-----------|----------|
| Price/Value | [count] | YES | [Y/N] |
| Efficacy/Results | [count] | YES | [Y/N] |
| Trust/Guarantee | [count] | YES | [Y/N] |
| Timing | [count] | No | [Y/N] |
| Comparison | [count] | No | [Y/N] |
| Technical/Logistics | [count] | No | [Y/N] |

Total items: [count]
Total categories: [count] of 6

## Sequencing Strategy
Strategy: [hardest_first | hardest_last]
Rationale: [1 sentence]
Hardest objection: "[question text]" — Position [X]

## All FAQ Items (Sequenced)
| # | Question | Category | Answer Strategy | Proof? | Sentences |
|---|----------|----------|----------------|--------|-----------|
[table of all items in sequence order]

## Audit
FAQ audit score: [X.X/10]
Coverage audit: [PASS | FAIL]
Sycophantic openers found: 0
AI telltales found: 0

## Downstream Handoffs
FAQ section feeds: LP-15 (Assembly)
Coverage map feeds: LP-17 (Conversion Audit)
```
