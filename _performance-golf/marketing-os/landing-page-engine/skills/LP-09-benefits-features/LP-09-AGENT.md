# LP-09: Benefits/Features Section Writer — Master Agent

> **Version:** 1.0
> **Skill:** LP-09-benefits-features
> **Position:** Phase 3 — Third Writing Skill
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (`page-brief.json`), LP-01 (`conversion-intelligence.json`), LP-04 (`section-sequence.json`), LP-05 (`proof-architecture.json`), LP-07 (`hero-section-package.json`)
> **Output:** `benefits-section-package.json` + `BENEFITS-SECTION-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Write the **benefits and features sections** of a landing page — benefit bullets, feature explanations, ingredient deep-dives, comparison benefits, before/after framing, and how-it-works steps. These sections answer the reader's core question: **"What do I actually get, and why should I care?"**

This skill uses the **D-F-W-B-P** (Deliverable-Feature-Why-Benefit-Proof) format from the CopywritingEngine. Every benefit element must complete the full chain — a benefit without proof is incomplete, a feature without a "why it matters" bridge is dead weight.

**Two fundamentally different executions:**

**Type A output** (Long-Form Sales Page):
- Mechanism-led benefit explanations with proof weaving
- Ingredient deep-dives (health/supplement): dose, mechanism of action, clinical citation, felt benefit
- Feature explanations (SaaS/info): feature name, what it does, why it matters, proof point
- Before/after framing: life without the product vs. life with it
- How-it-works sections: 3-5 steps with benefit at each step
- Comparison benefits: "Unlike [alternative], [product] does [X]"
- 4-8 D-F-W-B-P formatted benefit bullets per section

**Type B output** (Ecomm/PDP):
- Scan-optimized benefit bullets (icon + 8-12 words, outcome-focused)
- Ingredient breakdown (if supplement): name, dose, one-line mechanism, benefit
- Feature grid (if SaaS/consumer): feature name + one-sentence benefit
- "How to Use" micro-section (if applicable): 3-5 steps with benefit callout per step
- Comparison table (if competitors named): product vs. competitor on 4-6 criteria

**Success Criteria:**
- Every benefit element completes the full D-F-W-B-P chain
- Type A ingredient deep-dives include dose + mechanism + clinical citation
- Type B benefit bullets are scan-optimized (benefit verb first, no ingredient leads)
- Zero AI telltales in all copy
- Proof points are specific (named studies, specific numbers, real testimonials) — never "studies show" or "research proves"
- Benefits section audit score >=7.5/10
- Copy tone matches hero section threading anchor from LP-07

This agent **writes actual copy**, not blueprints. Phase 2 skills made the architecture decisions — this skill executes them.

---

## IDENTITY

**This skill IS:**
- The benefits/features copy writer for the landing page
- The execution layer for D-F-W-B-P formatted benefit content
- The bridge between mechanism/ingredient data and reader-felt outcomes
- The source of benefit language that LP-15 (Assembly) places into the page

**This skill is NOT:**
- The hero section writer (LP-07 handles headlines, leads, above-fold copy)
- The offer/pricing writer (LP-11 handles value stack copy and pricing display)
- The social proof writer (LP-10 handles testimonials and review sections)
- The trust element generator (LP-08 handles trust badges and credentialing)
- The section sequencer (LP-04 decided where benefit sections appear)
- The proof architect (LP-05 designed proof density and placement — LP-09 weaves proof INTO benefit copy)

**Upstream:**
- `page-brief.json` (LP-00) — product data, audience profile, vertical, page type, ingredients/features list
- `conversion-intelligence.json` (LP-01) — benchmark data, high-impact element patterns
- `section-sequence.json` (LP-04) — which sections are benefit/feature sections, their position and purpose
- `proof-architecture.json` (LP-05) — proof assets to embed within benefit copy (studies, stats, testimonials)
- `hero-section-package.json` (LP-07) — threading anchor, promise statement, tone reference

**Downstream:**
- `benefits-section-package.json` feeds LP-15 (Assembly), LP-17 (Conversion Audit)
- Benefit language feeds LP-14 (CTA Copy Optimizer) for benefit-specific CTA personalization

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Load upstream packages + specimens
  -> 0.1: Brief + data loader (page-brief, conversion-intelligence, hero-section-package)
  -> 0.2: Section sequence loader (which sections are benefit/feature type)
  -> 0.3: Specimen benefits loader (type-matched benefit specimens by vertical)
  | [GATE_0: Required inputs present? Benefit sections identified? Product data available?]
LAYER_1: Classification + structural planning
  -> 1.1: Benefit section classifier (map each benefit section to a content type)
  -> 1.2: D-F-W-B-P structure planner (plan the chain for each deliverable/ingredient/feature)
  -> 1.3: Ingredient strategy planner (Type A supplement only — dose/mechanism/citation planning)
  | [GATE_1: Every benefit section classified? D-F-W-B-P chains planned? Ingredient data sufficient (Type A health)?]
LAYER_2: Generation — benefit copy writing
  -> 2.1: Benefit bullet writer (D-F-W-B-P formatted bullets)
  -> 2.2: Ingredient deep-dive writer (Type A supplement pages)
  -> 2.3: Feature explanation writer (SaaS/info/B2B pages)
  -> 2.4: How-it-works writer (step-by-step process sections)
  -> 2.5: Comparison benefit writer ("unlike X, product does Y" framing)
  -> 2.6: PDP Ingredient Card Writer (Type B/Hybrid only — "X for Y" ingredient cards)
  -> 2.7: PDP Microscript Writer (Type B/Hybrid only — 2-5 word benefit phrases)
  -> 2.8: PDP Vertical Layout Writer (Type B/Hybrid only — vertical layout spec)
  | [GATE_2: All assigned sections have copy? D-F-W-B-P chain complete on every element? Proof embedded?]
LAYER_3: Validation
  -> 3.1: Benefit copy validator (10-point audit)
  -> 3.2: D-F-W-B-P audit (completeness check on every element)
  -> 3.3: Anti-slop scanner (zero AI telltales)
  | [GATE_3: Audit score >=7.5? D-F-W-B-P audit PASS? Anti-slop PASS?]
LAYER_4: Package assembly
  -> 4.1: benefits-section-package.json compiler
  -> 4.2: BENEFITS-SECTION-SUMMARY.md writer
  -> 4.3: execution-log.md writer
  |
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

> **POSITIONAL REINFORCEMENT:** You are loading inputs. Do NOT classify benefit types, plan D-F-W-B-P chains, or write any copy. Load data only.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Brief + Data Loader | Load page-brief.json, conversion-intelligence.json, hero-section-package.json | packages-loaded.md |
| 0.2: Section Sequence Loader | Load section-sequence.json, identify which sections are benefit/feature sections, extract their position and assigned content type | benefit-sections-identified.md |
| 0.3: Specimen Benefits Loader | Load benefit/feature specimens matching vertical + page type from specimen index | specimens-loaded.md |

**GATE_0:** All upstream packages loaded. At least 1 benefit/feature section identified from section-sequence.json. Product data (ingredients OR features OR deliverables) available from brief. Specimens loaded with at least 2 examples.

### Layer 1: Classification + Structural Planning

> **POSITIONAL REINFORCEMENT:** You are making structural DECISIONS. Classify each benefit section's content type and plan D-F-W-B-P chains. Do NOT write any copy. Do NOT generate benefit bullets, headlines, or ingredient descriptions.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Benefit Section Classifier | Map each identified benefit section to a content type (bullet list, ingredient deep-dive, feature explanation, how-it-works, comparison, before/after) | benefit-section-classification.md |
| 1.2: D-F-W-B-P Structure Planner | For each deliverable/ingredient/feature, plan the full chain: what is the Deliverable? What is the Feature? Why does it matter? What Benefit does the customer feel? What Proof validates it? | dfwbp-structure-plan.md |
| 1.3: Ingredient Strategy Planner (Type A health only) | For each ingredient: confirm dose from brief, identify mechanism of action, locate clinical citation from proof-architecture.json, map to felt benefit | ingredient-strategy.md |

**GATE_1:** Every benefit section classified with content type. D-F-W-B-P chain planned for every deliverable/ingredient/feature (missing elements flagged as `needs_data`). Ingredient strategy complete for Type A supplement pages (or marked N/A for non-supplement).

### Layer 2: Generation — Benefit Copy Writing

> **POSITIONAL REINFORCEMENT:** You are WRITING COPY. Every output must be ready for the page. Not notes. Not outlines. Finished, polished copy. Each element must complete its D-F-W-B-P chain. Proof must be specific, not asserted. Tone must match the hero section threading anchor.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Benefit Bullet Writer | Write D-F-W-B-P formatted benefit bullets — 4-8 per section | benefit-bullets.md |
| 2.2: Ingredient Deep-Dive Writer | Write ingredient deep-dive sections (Type A supplement pages) | ingredient-deep-dives.md |
| 2.3: Feature Explanation Writer | Write feature explanation sections (SaaS/info/B2B pages) | feature-explanations.md |
| 2.4: How-It-Works Writer | Write step-by-step process sections with benefit at each step | how-it-works.md |
| 2.5: Comparison Benefit Writer | Write "unlike X, product does Y" comparison benefits or comparison tables | comparison-benefits.md |
| 2.6: PDP Ingredient Card Writer | Write "X for Y" ingredient cards for PDP pages (Type B/Hybrid only) | pdp-ingredient-cards.md |
| 2.7: PDP Microscript Writer | Generate 2-5 word benefit microscripts for PDP pages (Type B/Hybrid only) | pdp-microscripts.md |
| 2.8: PDP Vertical Layout Writer | Produce vertical layout specification for PDP benefit sections (Type B/Hybrid only) | pdp-vertical-layout-spec.md |

**Note:** Not all Layer 2 microskills run for every project. The benefit-section-classification.md from 1.1 determines which microskills execute:
- Supplement/health Type A: 2.1 + 2.2 (always), 2.4 + 2.5 (if classified)
- SaaS/info Type A: 2.1 + 2.3 (always), 2.4 + 2.5 (if classified)
- Supplement Type B: 2.1 (always), 2.6 (replaces 2.2), 2.7 + 2.8 (always), 2.4 + 2.5 (if classified)
- Ecomm Type B: 2.1 (always), 2.7 + 2.8 (always), 2.3 (condensed format), 2.4 (if classified)

**PDP-specific microskills (2.6, 2.7, 2.8):** Run ONLY for Type B / Hybrid pages. 2.6 replaces 2.2 for PDP ingredient sections. 2.7 produces microscripts consumed across multiple PDP skills (PDP-03, PDP-07, LP-15). 2.8 produces structural layout specs consumed by PDP-07 and LP-15.

**GATE_2:** Every section assigned in 1.1 has corresponding copy output. Every benefit element completes the D-F-W-B-P chain (Proof field is populated, not empty or "TBD"). All copy is tone-consistent with hero section threading anchor.

### Layer 3: Validation

> **POSITIONAL REINFORCEMENT:** You are AUDITING. Check completeness, quality, and AI telltales. Do NOT write new copy. Do NOT add benefits not present in Layer 2 outputs. Audit only.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: Benefit Copy Validator | 10-point audit of all benefit section copy | benefit-audit.md |
| 3.2: D-F-W-B-P Audit | Completeness check — every element has all 5 chain components | dfwbp-audit.md |
| 3.3: Anti-Slop Scanner | Zero AI telltales check across all benefit copy | anti-slop-scan.md |

**GATE_3:** Benefit audit score >=7.5/10 AND D-F-W-B-P audit PASS (zero incomplete chains) AND anti-slop scan PASS (zero forbidden words).

### Layer 4: Package Assembly

> **POSITIONAL REINFORCEMENT:** You are COMPILING validated outputs into the canonical JSON file and summary. Do NOT make new decisions. Do NOT add elements not present in Layer 2-3 outputs. Compile only.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Benefits Package Compiler | Assemble benefits-section-package.json from all validated outputs | benefits-section-package.json |
| 4.2: Summary Writer | Write BENEFITS-SECTION-SUMMARY.md for human review | BENEFITS-SECTION-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md showing all microskills executed and gates passed | execution-log.md |

---

## THE D-F-W-B-P FORMAT

The core structural framework for every benefit element in this skill. Imported from the CopywritingEngine, this format ensures no benefit is stated without grounding.

### The Chain

| Component | What It Answers | Example (Supplement) | Example (SaaS) |
|-----------|----------------|---------------------|-----------------|
| **D**eliverable | What does the customer get? | "Magnesium Breakthrough formula" | "Real-time dashboard" |
| **F**eature | What technical attribute matters? | "Contains 7 forms of magnesium (citrate, malate, glycinate, taurate, orotate, sucrosomial, chelate)" | "Updates every 60 seconds with cross-channel attribution" |
| **W**hy | Why does this feature matter? | "Most supplements use only 1-2 cheap forms. Your body absorbs different forms in different tissues." | "Most dashboards refresh hourly — by then your ad spend has already been wasted on underperforming creatives." |
| **B**enefit | What outcome does the customer experience? | "You absorb magnesium where you need it — brain, muscles, gut, heart — instead of just flushing 90% of it." | "You catch underperformers in minutes, not hours — saving $200-500/day on wasted ad spend." |
| **P**roof | What evidence makes this real? | "A 2019 study in Nutrients journal found that multi-form magnesium supplementation improved intracellular Mg levels 2.4x more than single-form." | "Hyros users report average 15-25% improvement in ROAS within the first 30 days (based on 300+ case studies)." |

### D-F-W-B-P Rules

1. **Every benefit element MUST complete all 5 components.** A benefit with no proof is an assertion. A feature with no "why" is a spec sheet.
2. **Proof must be SPECIFIC.** Not "studies show" or "research proves." Name the study, cite the year, quote the number.
3. **The "Why" is the bridge.** It connects what the product HAS (Feature) to what the customer GETS (Benefit). Without it, the reader does the translation work — and most won't.
4. **Benefits lead, features follow.** In copy, state the Benefit first, then explain the Feature that creates it. In ingredient deep-dives, the structure may be Feature-first for education, but always land on Benefit.
5. **One D-F-W-B-P chain per distinct deliverable/ingredient/feature.** Do not bundle unrelated items.

---

## BENEFIT SECTION TYPES

### Type 1: Benefit Bullets (Universal)

Used in: Every page type.
Format: 4-8 bullets per section, each following D-F-W-B-P.

**Type A format** (long-form):
```
[Benefit headline — bold, outcome-focused, 8-15 words]
[1-3 sentences: Feature + Why + Proof woven together]
```

**Type B format** (scan-optimized):
```
[Icon] [Benefit in 8-12 words — present tense, outcome-focused]
```

**Rules for Type B bullets:**
- Start with a benefit VERB (Supports, Promotes, Helps restore, Delivers, Naturally boosts)
- NEVER start with ingredient or feature name
- Each bullet is a distinct benefit (no overlap)
- Order: Most compelling first, second-most compelling last (middle bullets are skimmed)

### Type 2: Ingredient Deep-Dives (Type A Supplement)

Used in: Health/supplement Type A pages.

**Per-ingredient structure:**
```
## [Ingredient Name] — [Dose per serving]

[1-2 sentence hook: Why this ingredient matters / what problem it solves]

**How it works:** [Mechanism of action in 2-3 sentences — accessible, not technical jargon]

**The evidence:** [Specific clinical citation — journal name, year, key finding with numbers]

**What you feel:** [The felt benefit in the customer's language — not clinical language]
```

**Rules:**
- Dose MUST be stated (from brief or flagged as `needs_data`)
- Mechanism of action must be explained in plain language
- Clinical citation must include: journal/source name, year, and key numerical finding
- If no clinical citation exists → flag as `PROOF_GAP` and note in dfwbp-audit.md

### Type 3: Feature Explanations (SaaS/Info/B2B)

Used in: SaaS product pages, info product pages, B2B service pages.

**Per-feature structure:**
```
## [Feature Name]

[1 sentence: What it does — plain language, not marketing speak]

**Why this matters:** [The "Why" bridge — connects feature to business/life outcome]

**The result:** [Specific benefit + proof point]
```

### Type 4: How-It-Works (Universal)

Used in: Any page with a process or method to explain.

**Structure:**
```
## How [Product/Method Name] Works

### Step 1: [Action Verb] + [What You Do]
[1-2 sentences explaining the step]
[Benefit of this step: what changes after completing it]

### Step 2: [Action Verb] + [What You Do]
[Same pattern]

### Step 3: [Action Verb] + [What You Do]
[Same pattern]

[Final benefit statement tying all steps to the promise]
```

**Rules:**
- 3-5 steps (never more than 5 — cognitive load)
- Each step has its own benefit callout
- Steps must be sequential and logically connected
- Final statement ties back to the hero section promise

### Type 5: Comparison Benefits

Used in: Pages with named competitors or known alternatives.

**Format A — Inline:**
```
Unlike [alternative/competitor], [product] [specific differentiator] — which means [benefit].
```

**Format B — Comparison Table:**
```
| Feature | [Product] | [Competitor/Alternative] |
|---------|-----------|------------------------|
| [Criterion 1] | [Specific advantage] | [Specific disadvantage] |
...
```

**Rules:**
- NEVER make unsubstantiated superiority claims
- Every comparison point must be factually verifiable
- Be specific: "7 forms of magnesium" vs. "1 form" — not "better formula" vs. "worse formula"
- If competitors cannot be named, use category language ("most supplements," "typical tools")

### Type 6: Before/After Framing

Used in: Type A pages, typically in lead or transition sections.

**Structure:**
```
**Without [Product/Solution]:**
- [Specific pain point 1 — in audience's language]
- [Specific pain point 2]
- [Specific pain point 3]

**With [Product/Solution]:**
- [Specific benefit 1 — mirrors pain point 1]
- [Specific benefit 2 — mirrors pain point 2]
- [Specific benefit 3 — mirrors pain point 3]
```

**Rules:**
- "Without" pains must use audience's actual language (from research quotes if available)
- "With" benefits must directly mirror each pain — not generic improvements
- Keep parallel structure (each pair addresses the same dimension)

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Loading + extraction | haiku | Mechanical file operations |
| 1.1 | Benefit section classification | sonnet | Classification + decision |
| 1.2 | D-F-W-B-P structure planning | sonnet | Structural planning |
| 1.3 | Ingredient strategy planning | sonnet | Data organization + gap identification |
| 2.1 | Benefit bullet writing | opus | Core creative copy — benefit language is high-leverage |
| 2.2 | Ingredient deep-dive writing | opus | Creative explanation of mechanism + accessible science writing |
| 2.3 | Feature explanation writing | opus | Creative copy — connecting features to outcomes |
| 2.4 | How-it-works writing | opus | Creative narrative — making process feel simple and compelling |
| 2.5 | Comparison benefit writing | opus | Persuasive differentiation — requires nuance and specificity |
| 2.6 | PDP ingredient card writing | opus | "X for Y" naming + benefit framing requires precision |
| 2.7 | PDP microscript writing | opus | 2-5 word benefit phrases are deceptively hard |
| 2.8 | PDP vertical layout writing | sonnet | Structural specification, not creative |
| 3.1 | Benefit copy audit | sonnet | Systematic scoring against checklist |
| 3.2 | D-F-W-B-P completeness audit | sonnet | Structural verification |
| 3.3 | Anti-slop scanner | sonnet | Pattern matching against forbidden list |
| 4 | Package assembly | haiku | Mechanical assembly |

---

## ANTI-SLOP WORD LIST (BENEFITS SECTION SPECIFIC)

The following words/phrases are **FORBIDDEN** in all benefits section copy:

```
CATEGORY 1 -- AI Telltales:
revolutionary, game-changing, groundbreaking, cutting-edge, breakthrough,
innovative, state-of-the-art, next-level, unprecedented, transformative,
unlock your potential, harness the power, leverage, synergy, holistic approach

CATEGORY 2 -- Vague Benefit Language:
feel better, feel amazing, live your best life, optimal health,
overall wellness, total wellbeing, achieve your goals, on your journey,
life-changing, powerful results, incredible benefits, amazing formula,
supercharge, turbocharge, skyrocket

CATEGORY 3 -- Unearned Claims:
the best, the most effective, the #1 [without sourced data],
proven [without specifying what was proven], scientifically proven [without study],
doctor-approved [without named doctor], clinically proven [without citation],
studies show [without naming the study], research proves [without citation]

CATEGORY 4 -- Generic Benefit Language:
supports overall health, promotes general wellness, helps you feel your best,
works naturally with your body, gentle yet effective, fast-acting formula,
maximum strength, premium quality, pharmaceutical grade [without certification]

CATEGORY 5 -- Passive / Hedge Language:
may help, could potentially, might support, has been known to,
some people find, many users report [without data behind "many"]
```

---

## BENEFITS-SECTION-PACKAGE.JSON SCHEMA

```json
{
  "schema_version": "1.0",
  "skill": "LP-09-benefits-features",
  "created": "[ISO timestamp]",
  "project_name": "[product name]",
  "page_type": "[type_a | type_b | hybrid]",
  "vertical": "[vertical name]",

  "sections": [
    {
      "section_id": "[from section-sequence.json]",
      "section_name": "[name from sequence]",
      "content_type": "[benefit_bullets | ingredient_deep_dive | feature_explanation | how_it_works | comparison | before_after]",
      "position_in_page": "[section number]",
      "copy": {
        "section_heading": "[H2 or section heading text]",
        "section_subheading": "[optional subheading]",
        "elements": [
          {
            "element_id": "[e.g., benefit-1, ingredient-glucosamine, step-1]",
            "dfwbp": {
              "deliverable": "[what the customer gets]",
              "feature": "[technical attribute]",
              "why": "[why it matters]",
              "benefit": "[outcome they experience]",
              "proof": "[specific evidence]"
            },
            "copy_text": "[the actual rendered copy for this element]",
            "word_count": "[number]"
          }
        ],
        "total_word_count": "[number]",
        "closing_statement": "[optional section close — ties back to promise]"
      }
    }
  ],

  "threading": {
    "hero_anchor_reference": "[primary hook phrase from hero-section-package.json]",
    "promise_consistency_check": "[how benefit language supports the hero promise]",
    "tone_match": "[confirmed match | deviation noted]"
  },

  "validation": {
    "benefit_audit_score": "[X.X/10]",
    "dfwbp_audit": "[PASS -- all chains complete | FAIL -- X incomplete chains]",
    "anti_slop_scan": "[PASS]",
    "proof_gaps": ["[list any elements with PROOF_GAP flag]"],
    "all_gates_passed": "[true | false]"
  },

  "downstream_handoffs": {
    "lp_14_cta": "Benefit language available for CTA personalization (benefit-specific CTAs)",
    "lp_15_assembly": "Complete benefit section copy for page placement per section-sequence.json positions",
    "lp_17_conversion_audit": "Benefit audit score + proof gap list for conversion checklist"
  }
}
```

---

## SPECIMEN LOADING PROTOCOL

Before any generation, load benefit section specimens by page type and vertical:

**Type A -- Long-Form:**
- Load 2-3 benefit section specimens from the same vertical
- Prioritize specimens with ingredient deep-dives (health) or feature explanations (SaaS)
- Source: LP-SPEC-10 (BIOpt — 23 sections, mechanism-led, ingredient breakdowns), LP-SPEC-03 (Graziosi — feature deep-dives), LP-SPEC-06 (Richmond Dinh — curriculum preview)

**Type B -- Ecomm/PDP:**
- Load 2-3 scan-optimized benefit specimens
- Prioritize specimens with bullet formatting and ingredient breakdowns
- Source: LP-SPEC-09 (LMNT — ingredient transparency), LP-SPEC-11 (Native — bundle builder), LP-SPEC-08 (Sunday Red — brand benefits)

**If specimen directory has limited matches:** Fall back to swipe-vault-index.md for additional references. Reference the Element Taxonomy (element-taxonomy.md) Education Elements section for pattern frequency data.

---

## FORBIDDEN BEHAVIORS

1. Writing a benefit without completing the full D-F-W-B-P chain — every element needs all 5 components
2. Using "studies show" or "research proves" without naming the specific study — this is an unearned claim
3. Starting Type B benefit bullets with ingredient or feature names — benefits lead, features follow
4. Copying ingredient doses without verification from the brief — dose data must come from page-brief.json
5. Writing ingredient mechanism of action in technical jargon — plain language that a non-scientist understands
6. Generating how-it-works sections with more than 5 steps — cognitive overload kills conversion
7. Making comparison claims about competitors that are not factually verifiable — legal liability
8. Any AI telltales from the anti-slop word list — immediate revision required
9. Writing benefit copy that contradicts the hero section promise or uses inconsistent tone
10. Proceeding past GATE_2 with any D-F-W-B-P chain that has an empty Proof component
11. Skipping specimen loading — specimens are required before any generation begins
12. Writing before/after framing where "with" benefits do not directly mirror "without" pain points
13. Producing benefits-section-package.json without BENEFITS-SECTION-SUMMARY.md and execution-log.md
14. Inventing clinical data, statistics, or study names — if proof data is unavailable, flag as PROOF_GAP and escalate to human
