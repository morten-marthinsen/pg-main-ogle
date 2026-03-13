# PDP-04: BTF Section Sequencer — Master Agent

> **Version:** 1.0
> **Skill:** PDP-04-btf-section-sequencer
> **Position:** PDP Enhancement Layer — Fourth Skill (runs after PDP-03)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (page-brief.json), PDP-03 (pdp-above-fold-blueprint.json)
> **Output:** `pdp-section-sequence.json` + `PDP-SECTION-SEQUENCE-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Engineer the complete **below-the-fold (BTF) section sequence** for PDP / Type B pages — every section from immediately below the buy box to the footer, with the exact persuasion function, word count target, visual density requirement, proof density target, and CTA integration plan for each.

This is the PDP's **modular architecture**. Unlike LP-04 which builds a linear story-driven argument, PDP-04 builds a **hunt-and-peck optimized module grid**. PDP visitors do NOT read top-to-bottom. They scan, jump to sections that match their objection or interest, and bounce back to the buy box. Every section must be self-contained — it must persuade independently without requiring the visitor to have read any other section.

**Two outputs of equal importance:**

1. **Section Sequence** — The ordered list of 8-14 BTF sections, their purposes, and their proportions
2. **Module Independence Map** — Documentation that each section functions as a standalone persuasion unit

**Success Criteria:**
- All mandatory BTF sections present for the product type
- Section ordering follows NLS-recommended PDP flow
- Each section is self-contained (no "as mentioned above" dependencies)
- Word count proportions within PDP benchmark ranges
- Proof density plan specifies type + volume per section
- Visual density plan specifies image strategy per section (PDP = image-heavy)
- Sticky ATC trigger point defined with scroll-depth rationale
- CTA placements integrated into natural buy-box return points
- Dead weight sections (no persuasion function) absent from sequence
- Sequence score >= 7.0/10 against 10-point validation checklist

This agent is a **workflow orchestrator**. It designs the BTF architecture. It does NOT write section content — that is handled by downstream writing skills (PDP-05 through PDP-07, LP-08, LP-09, LP-12, LP-13).

---

## IDENTITY

**This skill IS:**
- The modular blueprint for the complete PDP below-the-fold sequence
- The structural specification every downstream PDP writing skill uses as context
- The document that answers "which BTF sections, in what order, how long, how much proof, where do CTAs appear"
- The proof density, visual density, and sticky ATC master plan
- The hunt-and-peck optimization layer (each section must stand alone)

**This skill is NOT:**
- A copy-writing tool (downstream skills write the actual section content)
- The above-fold architect (PDP-03 handled buy box + hero)
- The social proof system designer (LP-05 handles proof strategy depth)
- The offer/CTA architect (LP-06 handles CTA placement detail)
- The LP-04 replacement for Type A pages (LP-04 still handles long-form story pages)

**Upstream:** `page-brief.json` (LP-00), `pdp-above-fold-blueprint.json` (PDP-03)
**Downstream:** `pdp-section-sequence.json` consumed by PDP-05, PDP-06, PDP-07, LP-08, LP-09, LP-12, LP-13, LP-15

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Load upstream packages
  -> 0.1: Load page-brief.json (LP-00 output)
  -> 0.2: Load pdp-above-fold-blueprint.json (PDP-03 output)
  -> 0.3: Load PDP reference data (NLS section taxonomy, benchmark ranges)
  | [GATE_0: Required inputs present? Page type confirmed as type_b or hybrid?]
LAYER_1: Section taxonomy + ordering
  -> 1.1: Section taxonomy selector (which of 16 BTF sections this product needs)
  -> 1.2: Section ordering (NLS-recommended PDP flow)
  -> 1.3: Mandatory section validator (confirm all required sections present)
  -> 1.4: Optional section decider (include/exclude per brief + proof inventory)
  | [GATE_1: All mandatory sections present? Ordering logical? No duplicates?]
LAYER_2: Proportioning & density planning
  -> 2.1: Word count proportioner (per-section targets)
  -> 2.2: Proof density planner (per-section proof specs)
  -> 2.3: Visual density planner (per-section image specs — PDP is image-heavy)
  -> 2.4: CTA placement planner (mid-page CTAs, buy-box return points)
  -> 2.5: Sticky ATC trigger planner (scroll depth, trigger logic)
  | [GATE_2: All sections have word count + proof + visual specs? Sticky ATC defined?]
LAYER_3: Validation
  -> 3.1: Sequence validator (4-test PDP logic validation)
  -> 3.2: Dead weight detector (remove sections with no persuasion function)
  -> 3.3: Anti-slop check (verify section descriptions use specific language)
  | [GATE_3: Sequence score >= 7.0/10 AND zero dead weight AND anti-slop passes?]
LAYER_4: Package assembly
  -> 4.1: pdp-section-sequence.json compiler
  -> 4.2: PDP-SECTION-SEQUENCE-SUMMARY.md writer
  -> 4.3: execution-log.md writer
  |
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Brief Loader | Load and verify page-brief.json, confirm type_b or hybrid | brief-verified.md |
| 0.2: Above-Fold Loader | Load pdp-above-fold-blueprint.json, extract buy box spec | above-fold-loaded.md |
| 0.3: PDP Reference Loader | Load NLS 16-section taxonomy + PDP benchmark data | pdp-reference-loaded.md |

**GATE_0:** Both upstream files loaded AND page type confirmed as type_b or hybrid. If `page-brief.json` missing -> HALT. If page type is type_a -> REDIRECT to LP-04.

### Layer 1: Section Taxonomy + Ordering

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Section Taxonomy Selector | Map product against 16 NLS BTF sections, mark applicable | taxonomy-selection.md |
| 1.2: Section Ordering | Order selected sections by NLS-recommended PDP flow | section-ordering.md |
| 1.3: Mandatory Section Validator | Confirm all mandatory BTF sections are present | mandatory-check.md |
| 1.4: Optional Section Decider | For each optional section: include/exclude based on brief + proof inventory | optional-decisions.md |

**GATE_1:** All mandatory sections confirmed present. No gaps. No duplicate persuasion functions. Section ordering follows PDP flow logic.

### Layer 2: Proportioning & Density Planning

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Word Count Proportioner | Assign word count targets per section from PDP benchmarks | word-count-plan.md |
| 2.2: Proof Density Planner | Specify proof type + volume per section | proof-density-plan.md |
| 2.3: Visual Density Planner | Specify image count + type per section (PDP = image-heavy) | visual-density-plan.md |
| 2.4: CTA Placement Planner | Map mid-page CTAs and buy-box return points | cta-placement-plan.md |
| 2.5: Sticky ATC Trigger Planner | Define when sticky ATC bar appears + trigger logic | sticky-atc-plan.md |

**GATE_2:** All sections have word count targets, proof density specs, and visual density specs. CTA plan shows >= 2 mid-page CTA placements. Sticky ATC trigger point defined with scroll-depth rationale.

### Layer 3: Validation

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: Sequence Validator | Run 4 PDP-specific sequence logic tests | sequence-validation.md |
| 3.2: Dead Weight Detector | Identify and remove sections with no persuasion function | dead-weight-check.md |
| 3.3: Anti-Slop Check | Verify section descriptions use specific, actionable language | anti-slop-check.md |

**GATE_3:** Sequence score >= 7.0/10 AND zero dead weight sections AND anti-slop passes.

### Layer 4: Package Assembly

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Sequence Compiler | Assemble pdp-section-sequence.json | pdp-section-sequence.json |
| 4.2: Summary Writer | Write PDP-SECTION-SEQUENCE-SUMMARY.md | PDP-SECTION-SEQUENCE-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## NLS 16-SECTION PDP BTF TAXONOMY

Every PDP draws from this master taxonomy. Not all 16 apply to every product — Layer 1 selects the applicable subset.

| # | Section ID | Section Name | Persuasion Function | Default Status |
|---|-----------|-------------|---------------------|---------------|
| 1 | `product_highlights` | Product Highlights (TLDR) | Top 3-5 questions as expandable tiles — scannable answers for impatient visitors | **[M]** |
| 2 | `ugc_video_carousel` | UGC Video Carousel | Social proof via real customer video — authenticity signal | **[M]** if 3+ UGC videos exist |
| 3 | `the_expert` | The Expert (Credibility) | White-coat authority — video preferred, credentials front-loaded | **[M]** if expert endorser exists |
| 4 | `whats_in_it` | What's in It (Ingredients) | Visual-first ingredient education — "X for Y" naming, vertical expanded | **[M]** if supplement or formulated product |
| 5 | `what_to_expect` | What to Expect (Benefits Timeline) | 3-5 milestones on vertical timeline, mechanism per phase — sets realistic expectations | **[M]** |
| 6 | `the_problem` | The Problem (Agitation) | Problem amplification — may consolidate with sections 7 and 8 | **[O]** — consolidation candidate |
| 7 | `the_solution` | The Solution (USP) | Paradigm shift -> real cause -> new solution — brand differentiation | **[M]** |
| 8 | `why_it_works` | Why It Works (Logic) | Biochem/mechanism diagram — logical proof for analytical buyers | **[M]** |
| 9 | `comparison_chart` | Comparison Chart (Advantages) | 3-column, 5-7 rows, primacy/recency optimization — competitive positioning | **[M]** if competitors exist |
| 10 | `cost_savings` | Cost Savings Chart (Affordability) | Individual vs bundle, "You Save $X" punchline — price objection neutralizer | **[O]** — include if bundle exists |
| 11 | `how_its_made` | How It's Made (Quality) | Sourcing, manufacturing, certifications — quality-conscious buyer proof | **[O]** — include if premium positioning |
| 12 | `how_to_use` | How to Use (Instructions) | 3-step, numbered, icons — friction reduction, simplicity signal | **[M]** |
| 13 | `reviews_ratings` | Reviews & Ratings (Social Proof) | Histogram, photo strip, keyword filters — volume social proof | **[M]** if 25+ reviews exist |
| 14 | `faq` | FAQ (Objections) | Curated top 5-7, accordion format — final friction removal | **[M]** |
| 15 | `identity_matching` | Identity Matching ("Who Is This For?") | 3-column persona grid — self-selection signal | **[O]** — include if broad audience |
| 16 | `the_proof` | The Proof (Data) | Study circles, survey data, graphs — evidence for skeptical buyers | **[O]** — include if clinical/survey data exists |

**Default mandatory count:** 8-10 sections (varies by product type and proof inventory)
**Default total BTF word count:** 1,200-4,500 words

---

## PDP SECTION ORDERING — NLS RECOMMENDED FLOW

The default NLS ordering follows this logic: **Immediate answers -> Social proof -> Authority -> Education -> Comparison -> Evidence -> Friction removal**.

```
RECOMMENDED PDP BTF FLOW:
  1. Product Highlights (TLDR) — immediate answers for scanners
  2. UGC Video Carousel — authentic social proof early
  3. The Expert — authority establishment
  4. What's in It (Ingredients) — education zone entry
  5. What to Expect (Benefits Timeline) — expectation setting
  6. The Problem / The Solution / Why It Works — education consolidation
  7. Comparison Chart — competitive positioning
  8. Cost Savings — price objection handling
  9. How It's Made — quality proof
  10. How to Use — friction reduction
  11. Reviews & Ratings — volume social proof
  12. The Proof (Data) — evidence for skeptics
  13. Identity Matching — self-selection
  14. FAQ — final objection removal
```

**Ordering principles:**
- Scannable sections FIRST (Highlights, UGC) — catch the hunt-and-peck visitor
- Authority sections EARLY (Expert, Ingredients) — establish trust before education
- Education MIDDLE (Problem/Solution/Why, Timeline) — for visitors who need convincing
- Comparison + Savings AFTER education — meaningful only after value established
- Reviews + FAQ LATE — final decision support before checkout return
- FAQ ALWAYS LAST BTF section — the closer for undecided visitors

**Key difference from LP-04:** Sections are self-contained modules, NOT sequential arguments. A visitor can land on FAQ without reading anything above it and still get value.

---

## PDP WORD COUNT BENCHMARK TABLE

| Section | Minimum | Standard | Extended |
|---------|--------|---------|---------|
| Product Highlights (TLDR) | 75-125 | 125-200 | 200-300 |
| UGC Video Carousel | 30-50 (labels only) | 50-100 (labels + context) | 100-150 |
| The Expert | 75-125 | 125-250 | 250-400 |
| What's in It (per ingredient x4-8) | 50-100 each | 100-175 each | 175-300 each |
| What to Expect | 100-175 | 175-300 | 300-500 |
| The Problem | 75-150 | 150-250 | 250-400 |
| The Solution | 75-150 | 150-250 | 250-400 |
| Why It Works | 100-175 | 175-300 | 300-450 |
| Comparison Chart | 50-100 (table + header) | 100-175 | 175-250 |
| Cost Savings | 50-100 | 100-175 | 175-250 |
| How It's Made | 75-125 | 125-200 | 200-350 |
| How to Use | 50-100 | 100-175 | 175-250 |
| Reviews & Ratings | 200-400 | 400-700 | 700-1,200 |
| FAQ (5-7 items) | 250-400 | 400-600 | 600-900 |
| Identity Matching | 75-125 | 125-200 | 200-300 |
| The Proof (Data) | 100-175 | 175-300 | 300-450 |
| **BTF TOTAL** | **1,200-2,200** | **2,200-3,800** | **3,800-6,500** |

---

## PROOF DENSITY BY SECTION — PDP DEFAULTS

| Section | Density | Primary Types |
|---------|---------|--------------|
| Product Highlights | Light | Badge/icon proof only |
| UGC Video Carousel | Heavy | Video testimonials (the section IS proof) |
| The Expert | Heavy | Credential strip, institution logos, video |
| What's in It | Medium per ingredient | 1 study or "clinically studied" badge per key ingredient |
| What to Expect | Light | Timeline icons, mechanism references |
| The Problem | None | Agitation, not proof |
| The Solution | Light | 1 differentiator claim supported |
| Why It Works | Medium | Mechanism diagram, 1-2 study references |
| Comparison Chart | Medium | Checkmarks = implicit proof of superiority |
| Cost Savings | None | Math, not proof |
| How It's Made | Medium | Certification badges, sourcing photos |
| How to Use | None | Instructional only |
| Reviews & Ratings | Maximum | 25-100+ reviews, histogram, photo strip |
| FAQ | Embedded | Proof woven into answers |
| Identity Matching | Light | Persona-matched testimonial snippets |
| The Proof (Data) | Maximum | Study circles, survey graphs, data visualizations |

---

## VISUAL DENSITY TARGETS — PDP

PDP pages are image-heavy by nature. Minimum 1 image per 150 words (vs LP-04's 1 per 400 words for Type A).

| Section | Image Strategy |
|---------|---------------|
| Product Highlights | Icon tiles, expandable with product shots |
| UGC Video Carousel | 3-6 video thumbnails, auto-play capable |
| The Expert | Expert headshot/video still, institution logos |
| What's in It | Ingredient hero images, "X for Y" visual cards |
| What to Expect | Timeline graphic with milestone icons |
| The Problem / Solution / Why | Diagrams, infographics, mechanism illustrations |
| Comparison Chart | Branded table with checkmark/X visual treatment |
| Cost Savings | Bundle visualization, savings callout graphic |
| How It's Made | Sourcing/manufacturing photography, cert badges |
| How to Use | 3-step numbered icons with product-in-use photos |
| Reviews & Ratings | Review cards with customer photos, histogram graphic |
| FAQ | Accordion UI (minimal imagery — text-focused) |
| Identity Matching | 3-column persona cards with lifestyle photos |
| The Proof (Data) | Study circle graphics, bar charts, data viz |

---

## STICKY ATC BAR LOGIC

The sticky Add-to-Cart bar appears on mobile (and optionally desktop) once the visitor scrolls past the above-fold buy box.

**Trigger rules:**
- **Mobile:** Activates when buy box scrolls out of viewport (typically 400-600px scroll depth)
- **Desktop:** Optional — activates at same scroll depth OR on hover-intent to leave
- **Content:** Product name (truncated), selected variant, price, [Add to Cart] button
- **Behavior:** Remains fixed to bottom of screen. Disappears when visitor scrolls back to above-fold buy box.

**Scroll depth milestones for CTA placement:**
- 25% scroll: First mid-page CTA opportunity (after Product Highlights or UGC)
- 50% scroll: Second mid-page CTA opportunity (after education sections)
- 75% scroll: Third mid-page CTA opportunity (after Reviews)
- Sticky bar: Persistent from first scroll past buy box

---

## 4-TEST PDP SEQUENCE LOGIC VALIDATOR

All 4 tests must pass before GATE_3.

### Test 1: Scannable Sections First
**Question:** Do the top 2-3 BTF sections serve hunt-and-peck visitors (quick answers, social proof)?
**Pass condition:** Sections 1-3 are from {product_highlights, ugc_video_carousel, the_expert, reviews_ratings}
**Fail condition:** Education or comparison sections appear before scannable sections

### Test 2: Authority Before Education
**Question:** Does at least one authority signal (Expert, UGC, review count) appear before the first education section?
**Pass condition:** Authority section number < first education section number (Problem/Solution/Why/Ingredients)
**Fail condition:** Education begins with no preceding trust signal

### Test 3: Value Before Comparison
**Question:** Is the product's value proposition (ingredients, mechanism, benefits) established before the comparison chart?
**Pass condition:** At least 2 of {whats_in_it, what_to_expect, why_it_works} appear before comparison_chart
**Fail condition:** Comparison chart appears before product education

### Test 4: FAQ Last (or Near-Last)
**Question:** Is the FAQ section in the final 3 BTF positions?
**Pass condition:** FAQ position >= total_btf_sections - 2
**Fail condition:** FAQ buried in the middle of the sequence

---

## 10-POINT PDP SEQUENCE AUDIT

Score each point 0 (fail) or 1 (pass):

**Module Independence (3 points)**
1. Every section functions as a standalone persuasion unit (no "as mentioned above")
2. Each section has a unique persuasion function (no duplicate jobs)
3. Section entry points are clear — a visitor landing on any section gets immediate value

**Proof Architecture (3 points)**
4. At least one heavy proof section in the first 3 BTF positions
5. Reviews & Ratings section present with volume proof spec (25+ reviews)
6. Proof type diversity — at least 3 different proof types across all sections

**Conversion Architecture (2 points)**
7. Sticky ATC trigger point defined with scroll-depth rationale
8. >= 2 mid-page CTA placements mapped (not counting sticky bar)

**Proportions (2 points)**
9. Section word counts within PDP benchmark ranges
10. No single section exceeds 25% of total BTF word count

**Scoring:**
- 9-10: Sequence ready for downstream writing
- 7-8: Minor adjustments, can proceed
- 5-6: Structural issues — revise before proceeding
- Below 5: Sequence rebuild required

---

## PDP-SECTION-SEQUENCE.JSON SCHEMA

```json
{
  "schema_version": "1.0",
  "created": "[ISO timestamp]",
  "project_name": "[product name]",
  "page_type": "type_b",
  "total_btf_sections": "[count]",
  "estimated_btf_word_count": {
    "minimum": "[number]",
    "target": "[number]",
    "maximum": "[number]"
  },
  "sequence_score": "[X.X / 10]",

  "pdp_section_taxonomy": {
    "product_highlights": { "included": true, "rationale": "[why included/excluded]" },
    "ugc_video_carousel": { "included": "[true/false]", "rationale": "[why]" },
    "the_expert": { "included": "[true/false]", "rationale": "[why]" },
    "whats_in_it": { "included": "[true/false]", "rationale": "[why]" },
    "what_to_expect": { "included": "[true/false]", "rationale": "[why]" },
    "the_problem": { "included": "[true/false]", "rationale": "[why]" },
    "the_solution": { "included": "[true/false]", "rationale": "[why]" },
    "why_it_works": { "included": "[true/false]", "rationale": "[why]" },
    "comparison_chart": { "included": "[true/false]", "rationale": "[why]" },
    "cost_savings": { "included": "[true/false]", "rationale": "[why]" },
    "how_its_made": { "included": "[true/false]", "rationale": "[why]" },
    "how_to_use": { "included": "[true/false]", "rationale": "[why]" },
    "reviews_ratings": { "included": "[true/false]", "rationale": "[why]" },
    "faq": { "included": true, "rationale": "[why]" },
    "identity_matching": { "included": "[true/false]", "rationale": "[why]" },
    "the_proof": { "included": "[true/false]", "rationale": "[why]" }
  },

  "sections": [
    {
      "number": 1,
      "section_id": "[from taxonomy]",
      "name": "[section name]",
      "mandatory": "[true/false]",
      "persuasion_function": "[specific function this section serves — must be unique across all sections]",
      "word_count": {
        "target": "[number]",
        "range": "[min-max]"
      },
      "proof_density": {
        "level": "[none | light | medium | heavy | maximum]",
        "elements": [
          {
            "type": "[testimonial | study | before_after | authority | volume | demonstration | badge | video | data_viz]",
            "count": "[number]",
            "notes": "[specific requirements]"
          }
        ]
      },
      "visual_density": {
        "image_count": "[number]",
        "primary_type": "[product | lifestyle | ingredient | infographic | badge | headshot | video_thumb | data_viz | icon]",
        "layout": "[card_grid | carousel | accordion | timeline | table | full_width | split_panel | icon_strip]"
      },
      "cta_present": "[true/false]",
      "cta_type": "[none | add_to_cart | learn_more | scroll_to_buy_box | email_capture]",
      "module_independence": "[confirmation this section works standalone]",
      "notes": "[special instructions for downstream writing skill]"
    }
  ],

  "sticky_atc_trigger_point": {
    "mobile_trigger": "[scroll depth in px or % — e.g., '500px' or 'buy box out of viewport']",
    "desktop_trigger": "[same scroll depth or 'disabled']",
    "bar_content": "[product name + variant + price + ATC button]",
    "disappear_condition": "[when buy box re-enters viewport]"
  },

  "cta_placement_summary": {
    "sticky_atc": "[trigger description]",
    "mid_page_ctas": [
      {
        "after_section": "[section number]",
        "cta_type": "[type]",
        "rationale": "[why here]"
      }
    ],
    "total_cta_touchpoints": "[count including sticky bar]"
  },

  "proof_wave_summary": {
    "early_zone": "[sections 1-3: proof density description]",
    "mid_zone": "[sections 4-8: proof density description]",
    "late_zone": "[sections 9+: proof density description]"
  },

  "logic_validation": {
    "test_1_scannable_first": "[PASS | FAIL]",
    "test_2_authority_before_education": "[PASS | FAIL]",
    "test_3_value_before_comparison": "[PASS | FAIL]",
    "test_4_faq_last": "[PASS | FAIL]",
    "all_pass": "[true/false]"
  },

  "downstream_handoffs": {
    "pdp_05": "Section content specs for PDP-specific writing (Highlights, Expert, Ingredients, Timeline, Problem/Solution/Why, Comparison, How to Use)",
    "pdp_06": "Visual density specs and image briefs per section",
    "pdp_07": "Sticky ATC specs and mid-page CTA copy briefs",
    "lp_08_trust": "Trust element specs from proof density plan",
    "lp_09_benefits": "Benefits/ingredient section specs with word count targets",
    "lp_12_faq": "FAQ section spec with curated question list",
    "lp_13_urgency": "Cost savings / urgency section spec (if included)",
    "lp_15_assembly": "Complete section order, transitions, and assembly map"
  }
}
```

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model |
|-------|------|-------|
| 0 | Input loading + verification | haiku |
| 1.1-1.2 | Taxonomy selection + ordering | sonnet |
| 1.3-1.4 | Mandatory validation + optional decisions | sonnet |
| 2.1-2.3 | Word count + proof/visual planning | sonnet |
| 2.4-2.5 | CTA planning + sticky ATC trigger | opus |
| 3.1 | 4-test PDP sequence validation | opus |
| 3.2-3.3 | Dead weight detection + anti-slop | sonnet |
| 4 | Package assembly | sonnet |

---

## FORBIDDEN BEHAVIORS

1. ❌ Proceeding without loading `page-brief.json` — page type must be confirmed as type_b or hybrid
2. ❌ Proceeding without loading `pdp-above-fold-blueprint.json` — above-fold/buy box spec is required context
3. ❌ Using LP-04 Type A templates for a PDP page — PDP has different section taxonomy, ordering logic, and module independence requirements
4. ❌ Omitting mandatory BTF sections — see taxonomy table; mandatory sections cannot be excluded
5. ❌ Treating PDP sections as sequential arguments — each section MUST be self-contained; no "as mentioned above"
6. ❌ Leaving word count targets as a range without a specific target number
7. ❌ Proof density plan that says "add testimonials" without specifying count and type
8. ❌ Visual density plan that says "add images" without specifying type, count, and layout
9. ❌ Proceeding past GATE_3 with any of the 4 PDP logic tests failing
10. ❌ Sequence score below 7.0 proceeding to downstream writing
11. ❌ Dead weight sections surviving into the final sequence
12. ❌ Fewer than 2 mid-page CTA placements mapped (not counting sticky bar)
13. ❌ Sticky ATC trigger point not defined — every PDP must have a sticky bar plan
14. ❌ FAQ section placed before the final 3 BTF positions — FAQ is a closer, not a mid-page section
15. ❌ Applying linear story-flow pacing from Type A to a PDP — PDP visitors hunt and peck, not read linearly
