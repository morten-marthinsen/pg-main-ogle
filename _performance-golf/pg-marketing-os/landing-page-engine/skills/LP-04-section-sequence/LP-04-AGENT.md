# LP-04: Section Sequence Planner — Master Agent

> **Version:** 1.0
> **Skill:** LP-04-section-sequence
> **Position:** Phase 2 — Second Architecture Skill (runs after LP-03)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (page-brief.json), LP-03 (above-fold-blueprint.json)
> **Output:** `section-sequence.json` + `SECTION-SEQUENCE-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Engineer the complete **page section order** — every section from above-fold to P.S., with the exact persuasion function, word count target, visual density requirement, and proof density target for each.

This is the page's **skeletal architecture**. Just as the CopywritingEngine's 08-Structure skill builds the campaign argument's logical backbone before any copy is written, LP-04 builds the page's structural backbone before any section content is produced.

**Two outputs of equal importance:**

1. **Section Sequence** — The ordered list of sections, their purposes, and their proportions
2. **Persuasion Flow Logic** — The documented reasoning for WHY each section appears where it does, mapped to the audience's decision journey

**Success Criteria:**
- All mandatory sections present for classified page type
- Section order validated against 4 sequence logic tests
- Word count proportions within benchmark ranges for the page type
- Proof density plan specifies type + volume per section
- Visual density brief specifies image strategy per section
- Dead weight sections (no persuasion function) absent from sequence
- Sequence score ≥ 7.0/10 against 10-point validation checklist

This agent is a **workflow orchestrator**. It designs the sequence architecture. It does NOT write section content — that is Phase 3 (LP-07 through LP-14) and LP-15 Assembly.

---

## IDENTITY

**This skill IS:**
- The architectural blueprint for the complete page sequence
- The structural specification every Phase 3 writing skill uses as their context
- The document that answers "what sections, in what order, how long, how much proof"
- The proof density and visual density master plan

**This skill is NOT:**
- A copy-writing tool (Phase 3 writes the actual section content)
- The above-fold architect (LP-03 handled that)
- The social proof system designer (LP-05 handles proof strategy depth)
- The offer/CTA architect (LP-06 handles CTA placement detail)

**Upstream:** `page-brief.json` (LP-00), `above-fold-blueprint.json` (LP-03)
**Downstream:** `section-sequence.json` consumed by LP-05, LP-06, and ALL Phase 3 writing skills (LP-07 through LP-14)

---

## STATE MACHINE

```
IDLE → TRIGGERED
  ↓
LAYER_0: Load upstream packages
  → 0.1: Load page-brief.json (LP-00 output)
  → 0.2: Load above-fold-blueprint.json (LP-03 output)
  → 0.3: Load section sequence templates for classified page type
  ↓ [GATE_0: Required inputs present?]
LAYER_1: Base sequence construction
  → 1.1: Select base template for classified type
  → 1.2: Mandatory sections validation
  → 1.3: Optional sections decision (include/exclude per brief)
  → 1.4: Above-fold integration (pull from LP-03 output)
  ↓ [GATE_1: All mandatory sections present? Sequence logical?]
LAYER_2: Proportioning & density planning
  → 2.1: Word count proportioner
  → 2.2: Proof density planner (per section)
  → 2.3: Visual density planner (per section)
  → 2.4: CTA placement planner
  → 2.5: Awareness-stage pacing optimizer
  ↓ [GATE_2: Proportions within benchmarks? Proof/visual plans complete?]
LAYER_3: Sequence validation
  → 3.1: 4-test sequence logic validator
  → 3.2: Dead weight detector
  → 3.3: 10-point sequence audit
  → 3.4: Anti-slop check on section descriptions
  ↓ [GATE_3: Sequence score ≥7.0/10 AND zero dead weight sections?]
LAYER_4: Package assembly
  → 4.1: section-sequence.json compiler
  → 4.2: SECTION-SEQUENCE-SUMMARY.md writer
  → 4.3: execution-log.md writer
  ↓
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Brief Loader | Load and verify page-brief.json | brief-verified.md |
| 0.2: Above-Fold Loader | Load above-fold-blueprint.json, extract Section 1 spec | above-fold-loaded.md |
| 0.3: Template Loader | Load section template for page type (A / B / Hybrid) | template-loaded.md |

**GATE_0:** Both upstream files loaded AND page type confirmed from brief. If `page-brief.json` missing → HALT.

### Layer 1: Base Sequence Construction

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Template Selector | Select Type A, Type B, or Hybrid base template | template-selection.md |
| 1.2: Mandatory Section Validator | Confirm all mandatory sections present in template | mandatory-check.md |
| 1.3: Optional Section Decider | For each optional section: include/exclude based on brief | optional-decisions.md |
| 1.4: Above-Fold Integration | Pull LP-03 above-fold spec as Section 1, lock it | section-1-integration.md |

**GATE_1:** All mandatory sections confirmed present. No gaps in section numbering. Section 1 matches LP-03 above-fold blueprint.

### Layer 2: Proportioning & Density Planning

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Word Count Proportioner | Assign word count targets per section from benchmarks | word-count-plan.md |
| 2.2: Proof Density Planner | Specify proof type + volume required per section | proof-density-plan.md |
| 2.3: Visual Density Planner | Specify image count + type per section | visual-density-plan.md |
| 2.4: CTA Placement Planner | Mark which sections carry CTAs and what type | cta-placement-plan.md |
| 2.5: Awareness-Stage Pacing | Adjust section pacing for audience awareness stage | pacing-adjustment.md |

**GATE_2:** All sections have word count targets, proof density specs, and visual density specs. CTA plan shows ≥3 CTA placements. Pacing adjustment documented.

### Layer 3: Validation

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: 4-Test Logic Validator | Run the 4 sequence logic tests | logic-validation.md |
| 3.2: Dead Weight Detector | Identify and remove sections with no persuasion function | dead-weight-check.md |
| 3.3: 10-Point Sequence Audit | Score sequence against audit checklist | sequence-audit.md |
| 3.4: Anti-Slop Check | Verify section descriptions use specific language | anti-slop-check.md |

**GATE_3:** Sequence score ≥7.0/10 AND zero dead weight sections AND anti-slop passes.

### Layer 4: Package Assembly

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Sequence Compiler | Assemble section-sequence.json | section-sequence.json |
| 4.2: Summary Writer | Write SECTION-SEQUENCE-SUMMARY.md | SECTION-SEQUENCE-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## BASE SECTION TEMPLATES

### Type A Template — Long-Form Sales Page

Mandatory sections marked **[M]**, optional marked **[O]**.

| # | Section ID | Section Name | Persuasion Function | Mandatory? |
|---|-----------|-------------|---------------------|------------|
| 1 | `above_fold` | Above-Fold | Interrupt + hook + promise (from LP-03) | **[M]** |
| 2 | `lead` | Lead / Hook | Open loops, earn readership, qualify audience | **[M]** |
| 3 | `story` | Origin / Discovery Story | Emotional proof vehicle, establish Yoda | **[M]** if product has a founder/discovery story |
| 3a | `proof_block_early` | Early Social Proof | Authority anchor before education begins | **[M]** |
| 4 | `root_cause_narrative` | Root Cause Narrative | Worldview shift — "it's not your fault" | **[M]** |
| 5 | `mechanism_narrative` | Mechanism Narrative | The "aha moment" — why this works | **[M]** |
| 6 | `proof_block_mid` | Mid-Page Proof Block | Testimonial cascade, belief reinforcement | **[M]** |
| 7 | `product_introduction` | Product Introduction | Bridge education → product reveal | **[M]** |
| 8 | `ingredient_deep_dives` | Ingredient / Feature Deep-Dives | Per-ingredient mechanism proof | **[M]** if supplement |
| 9 | `proof_block_post_ingredients` | Post-Ingredient Proof | Social proof after feature education | **[O]** |
| 10 | `value_stack` | Value Stack / Offer Block | Total value before price | **[M]** if bonuses exist |
| 11 | `pricing_block` | Pricing Block | Price reveal with anchor | **[M]** |
| 12 | `guarantee_block` | Guarantee Block | Risk reversal | **[M]** |
| 13 | `urgency_scarcity` | Urgency / Scarcity | Reason to act now | **[M]** if justified |
| 14 | `proof_block_preclose` | Pre-Close Proof Block | Transformation proof, callbacks | **[M]** |
| 15 | `faq` | FAQ / Objection Handler | Remove final friction | **[M]** |
| 16 | `comparison_table` | Comparison Table | Competitive differentiation | **[O]** |
| 17 | `close` | Close | Final emotional push, binary choice | **[M]** |
| 18 | `ps_section` | P.S. Section | Guarantee + urgency restatement | **[M]** |

**Total mandatory sections:** 12–14 (depends on product type)
**Estimated word count range:** 4,000–15,000 words

---

### Type B Template — Ecomm / PDP Style Page

Mandatory sections marked **[M]**, optional marked **[O]**.

| # | Section ID | Section Name | Persuasion Function | Mandatory? |
|---|-----------|-------------|---------------------|------------|
| 1 | `above_fold` | Above-Fold | Product + rating + price + ATC (from LP-03) | **[M]** |
| 2 | `key_benefits` | Key Benefits Strip | Scannable benefit bullets | **[M]** |
| 3 | `variant_quantity` | Variant & Quantity Selector | Friction reduction + bundle incentive | **[M]** if variants exist |
| 4 | `trust_bar` | Trust Bar / Badges | Certifications, free shipping, guarantee | **[M]** |
| 5 | `how_it_works` | How It Works | Mechanism in 3–5 steps | **[M]** |
| 6 | `ingredient_deep_dives` | Ingredient / Feature Deep-Dives | Per-ingredient mechanism + proof | **[M]** if supplement |
| 7 | `social_proof_strip` | Social Proof Strip | Volume signal + counter | **[M]** if 500+ customers |
| 8 | `before_after` | Before & After Gallery | Transformation evidence | **[M]** if available |
| 9 | `review_cascade` | Customer Review Section | Volume reviews + filtering | **[M]** if 25+ reviews |
| 10 | `faq` | FAQ | Pre-purchase objection removal | **[M]** |
| 11 | `guarantee_block` | Guarantee Block | Branded risk reversal | **[M]** |
| 12 | `comparison_table` | Comparison Table | Competitive positioning | **[O]** |
| 13 | `upsell_bundle` | Upsell / Bundle | AOV maximization | **[O]** (recommended) |
| 14 | `related_products` | Related Products | Cross-sell, category depth | **[O]** |
| 15 | `sticky_atc_mobile` | Sticky ATC Bar (Mobile) | Always-visible conversion capture | **[M]** for mobile |

**Total mandatory sections:** 10–12
**Estimated word count range:** 1,500–4,000 words (above fold ~600, below fold ~900–3,400)

---

### Hybrid Template

Above-fold through Section 2 = Type B structure
Section 3 onward = Type A content sections within ecomm shell

| Zone | Sections | Template |
|------|---------|---------|
| **Zone 1: Above-Fold (Type B)** | Sections 1–3 | Type B above-fold + key benefits + variant/quantity |
| **Zone 2: Education Zone (Type A style)** | Sections 4–8 | How it works, root cause hint, mechanism, ingredient deep-dives, proof blocks |
| **Zone 3: Conversion Zone (Type B + Type A)** | Sections 9–14 | Reviews, FAQ, guarantee, comparison, offer/pricing, close |

---

## WORD COUNT BENCHMARK TABLE

### Type A — Long-Form

| Section | Short Page | Standard | Long Page |
|---------|-----------|---------|----------|
| Lead | 300–500 | 500–800 | 800–1,200 |
| Story | 500–800 | 800–1,500 | 1,500–2,500 |
| Root Cause Narrative | 400–600 | 600–1,000 | 1,000–1,800 |
| Mechanism Narrative | 400–700 | 700–1,200 | 1,200–2,000 |
| Proof Block (each) | 200–400 | 400–700 | 700–1,200 |
| Product Introduction | 300–500 | 500–800 | 800–1,200 |
| Ingredient Deep-Dives | 600–1,000 | 1,000–2,000 | 2,000–4,000 |
| Value Stack | 300–500 | 500–800 | 800–1,200 |
| Pricing + Guarantee | 200–350 | 350–550 | 550–800 |
| FAQ | 400–700 | 700–1,200 | 1,200–2,000 |
| Close + P.S. | 300–500 | 500–800 | 800–1,200 |
| **TOTAL** | **4,000–6,500** | **6,500–10,500** | **10,500–18,000** |

### Type B — Ecomm/PDP

| Section | Minimum | Standard | Extended |
|---------|--------|---------|---------|
| Above-Fold Copy | 50–100 | 100–200 | 200–350 |
| Key Benefits | 100–200 | 200–350 | 350–500 |
| How It Works | 150–250 | 250–400 | 400–600 |
| Per Ingredient (×4–8) | 75–125 each | 125–200 each | 200–350 each |
| Review Section | 300–500 | 500–800 | 800–1,500 |
| FAQ | 300–500 | 500–800 | 800–1,200 |
| Guarantee | 100–200 | 200–350 | 350–500 |
| **TOTAL** | **1,500–2,500** | **2,500–4,000** | **4,000–7,000** |

---

## PROOF DENSITY PLAN SCHEMA

Every section in the sequence gets a proof density spec:

```yaml
proof_density:
  section: "[section_id]"
  density_level: "[none | light | medium | heavy]"
  proof_elements:
    count: "[number]"
    types:
      - type: "[testimonial | study | before_after | authority | volume | demonstration]"
        count: "[number]"
        notes: "[specific details, e.g., 'named testimonial with specific result + location']"
  transition_required:
    into: "[Y/N — does this section need a proof transition in?]"
    out_of: "[Y/N — does the next section need a proof callback?]"
  wave_position: "[early | mid | heavy | light]"
```

### Proof Density by Section — Type A Defaults

| Section | Density | Primary Types |
|---------|---------|--------------|
| Lead | Light | 1 authority signal |
| Story | Embedded | Expert credentials, institutional names |
| Root Cause | Medium | 2–3 studies woven in |
| Mechanism | Heavy | 3–5 clinical supports |
| Proof Block 1 | Heavy | 2–4 testimonials + 1 study |
| Product Intro | Light | 1 authority endorsement |
| Ingredients | Medium per ingredient | 1 study + 1 testimonial per ingredient |
| Proof Block 2 | Heavy | 5–8 testimonials |
| Value Stack | Light | 1 value testimonial |
| Guarantee | Confidence proof | Visual certificate treatment |
| Proof Block 3 | Heavy | Transformation + callbacks |
| FAQ | Embedded | Proof woven into answers |
| Close | Medium | 3–5 benefit summary items |

### Proof Density by Section — Type B Defaults

| Section | Density | Primary Types |
|---------|---------|--------------|
| Above Fold | Heavy | Rating strip + review count (always visible) |
| Key Benefits | Light | Icons/badges only |
| How It Works | None | Illustration/diagram |
| Ingredients | Medium | 1 study per key ingredient |
| Social Proof Strip | Heavy | Volume counter + photo testimonials |
| Before/After | Heavy | Gallery with results |
| Review Section | Maximum | 25–50+ reviews |
| FAQ | Embedded | Answers reference proof |
| Guarantee | Confidence proof | Badge + visual |

---

## VISUAL DENSITY PLAN SCHEMA

Every section gets a visual density spec:

```yaml
visual_density:
  section: "[section_id]"
  image_count: "[number]"
  image_types:
    - type: "[product | lifestyle | ingredient | before_after | infographic | badge | headshot]"
      count: "[number]"
      requirement: "[specific brief — e.g., 'product in lifestyle context, woman 45-55, outdoor']"
  layout_type: "[text_primary | image_text_alternating | image_grid | full_width_banner | card_grid]"
  mobile_collapse: "[how this section collapses on mobile — e.g., 'stack vertically, image first']"
```

### Visual Density Targets by Page Type

**Type A — Long-Form:**
- Above fold: 1 hero image (large)
- Per proof block: 1–3 testimonial headshots
- Per ingredient: 1 ingredient photo (real, not icon)
- Guarantee block: 1 badge/certificate visual
- Overall: minimum 1 image per 400 words

**Type B — Ecomm/PDP:**
- Above fold: 1 hero image (large, lifestyle)
- Image gallery: 4–8 product + lifestyle images
- Per ingredient: 1 ingredient photo
- Before/after: 2+ comparison photos per result
- Review section: Photo reviews prioritized
- Overall: minimum 1 image per 200 words

**Design reference:** magnesiumbreakthrough.com style — image-heavy, never flat text sections

---

## 4-TEST SEQUENCE LOGIC VALIDATOR

Run all 4 tests. All must pass before GATE_3.

### Test 1: Value Before Price
**Question:** Does value establishment (value stack, ingredient proof, testimonials, mechanism) appear BEFORE the pricing block?
**Pass condition:** Pricing block number > mechanism narrative number AND > at least one proof block number
**Fail condition:** Pricing block appears before mechanism or before proof

### Test 2: Trust Before Ask
**Question:** Is there at least one social proof element or authority signal before the first CTA that asks for money?
**Pass condition:** At least 1 proof element appears before first paid CTA
**Fail condition:** First CTA appears in Lead/Story with no preceding trust signal

### Test 3: Education Before Mechanism Reveal
**Question:** (Type A only) Does the above-fold + lead section earn sufficient readership before the mechanism is named?
**Pass condition:** Lead section appears before mechanism narrative; mechanism named only after story/root cause
**Fail condition:** Mechanism named in headline or lead before story/root cause have run

### Test 4: Guarantee Proximate to Pricing
**Question:** Is the guarantee block within 2 sections of the pricing block (before or after)?
**Pass condition:** |guarantee_section_number - pricing_section_number| ≤ 2
**Fail condition:** Guarantee buried far from price or absent entirely

---

## 10-POINT SEQUENCE AUDIT

Score each point 0 (fail) or 1 (pass):

**Structure Integrity (3 points)**
1. All mandatory sections for page type are present
2. No sections appear before their dependencies (story before root cause, etc.)
3. No duplicate persuasion functions (two sections doing the same job)

**Proof Flow (3 points)**
4. Proof density follows wave pattern (early light → mechanism heavy → close heavy)
5. At least one heavy proof block appears in top 40% of page
6. Pre-close proof block present (final belief reinforcement before CTA)

**Conversion Architecture (2 points)**
7. ≥3 CTA placements mapped across page
8. Urgency/scarcity section justified (or correctly absent)

**Proportions (2 points)**
9. Section word counts within benchmark ranges for page type
10. No section exceeds 30% of total page word count (prevents imbalance)

**Scoring:**
- 9–10: Sequence ready for Phase 3
- 7–8: Minor adjustments, can proceed
- 5–6: Structural issues — revise before Phase 3
- Below 5: Sequence rebuild required

---

## SECTION-SEQUENCE.JSON SCHEMA

```json
{
  "schema_version": "1.0",
  "created": "[ISO timestamp]",
  "project_name": "[product name]",
  "page_type": "[type_a | type_b | hybrid]",
  "total_sections": "[count]",
  "estimated_word_count": {
    "minimum": "[number]",
    "target": "[number]",
    "maximum": "[number]"
  },
  "sequence_score": "[X.X / 10]",

  "sections": [
    {
      "number": 1,
      "section_id": "above_fold",
      "name": "Above-Fold",
      "mandatory": true,
      "persuasion_function": "[specific function — e.g., 'Interrupt cold traffic + communicate core promise + establish who this is for']",
      "content_source": "LP-03 output (above-fold-blueprint.json) — do not re-write this section",
      "word_count": {
        "target": "[number]",
        "range": "[min–max]"
      },
      "proof_density": {
        "level": "[none | light | medium | heavy]",
        "elements": []
      },
      "visual_density": {
        "image_count": "[number]",
        "primary_type": "[hero product | lifestyle | etc.]",
        "layout": "[type]"
      },
      "cta_present": "[Y/N]",
      "cta_type": "[none | buy_now | email_optin | etc.]",
      "notes": "[any special instructions for Phase 3 writing]"
    }
  ],

  "proof_wave_summary": {
    "early_zone": "[sections X–Y: proof density]",
    "mid_zone": "[sections X–Y: proof density]",
    "close_zone": "[sections X–Y: proof density]"
  },

  "cta_placement_summary": {
    "cta_1_section": "[section number and name]",
    "cta_1_type": "[e.g., primary buy CTA]",
    "cta_2_section": "[section number and name]",
    "cta_2_type": "[e.g., mid-page conversion capture]",
    "cta_3_section": "[section number and name]",
    "cta_3_type": "[e.g., pre-close CTA]",
    "sticky_mobile_cta": "[Y/N]"
  },

  "logic_validation": {
    "test_1_value_before_price": "[PASS | FAIL]",
    "test_2_trust_before_ask": "[PASS | FAIL]",
    "test_3_education_before_mechanism": "[PASS | FAIL]",
    "test_4_guarantee_proximate": "[PASS | FAIL]",
    "all_pass": "[Y/N]"
  },

  "downstream_handoffs": {
    "lp_05_proof_arch": "Section proof density specs — load section-sequence.json for per-section proof requirements",
    "lp_06_offer_cta": "CTA placement map — load section-sequence.json for CTA section numbers and types",
    "lp_07_hero": "Section 1 spec from LP-03, Section 2 lead spec from this sequence",
    "lp_08_trust": "Trust bar section spec from this sequence",
    "lp_09_benefits": "Benefits/ingredient section specs from this sequence",
    "lp_10_proof": "All proof block section specs with density targets",
    "lp_11_offer": "Value stack, pricing, guarantee section specs",
    "lp_12_faq": "FAQ section spec including mandatory inclusion check",
    "lp_13_urgency": "Urgency section spec and justification",
    "lp_14_cta": "CTA placement plan and type specs",
    "lp_15_assembly": "Complete section order and transitions map"
  }
}
```

---

## AWARENESS-STAGE PACING ADJUSTMENTS

The Schwartz awareness stage from `page-brief.json` modifies section pacing:

| Awareness Stage | Pacing Adjustment |
|----------------|------------------|
| **Stage 1 — Unaware** | Extend lead and story (educate the problem first). Delay mechanism until ~40% of page. No price until ~60%. |
| **Stage 2 — Problem-Aware** | Standard Type A pacing. Mechanism at ~30–35%. Price at ~55%. |
| **Stage 3 — Solution-Aware** | Compress story. Lead directly with mechanism differentiation. Price at ~45–50%. |
| **Stage 4 — Product-Aware** | Story optional or very short. Above-fold can show price. Proof density very high early. |
| **Stage 5 — Most Aware** | Skip story entirely. Product intro above fold. Price immediately visible. Proof = primary trust driver. |

---

## DEAD WEIGHT SECTION DETECTION

A section is **dead weight** if it has no unique persuasion function — it either duplicates another section or exists as convention without serving the conversion goal.

**Common dead weight patterns to detect and remove:**

| Pattern | Issue | Fix |
|---------|-------|-----|
| Second "About the Company" section | Duplicates authority established elsewhere | Remove or merge into story |
| Generic "Quality Commitment" section | No proof, just claims | Remove; merge into guarantee |
| Pure navigation/category text | No persuasion function | Remove |
| Redundant testimonial block back-to-back without transition | Proof fatigue without rhythm | Merge or space with educational content |
| "Our Mission" section | Brand-first, not customer-first | Remove or reframe as customer benefit |

**Rule:** Every section must answer "What does this section do to MOVE THE VISITOR TOWARD PURCHASE that no other section does?" If it can't be answered, the section is dead weight.

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model |
|-------|------|-------|
| 0 | Input loading + verification | haiku |
| 1 | Template selection + mandatory check | sonnet |
| 2.1–2.3 | Word count + proof/visual planning | sonnet |
| 2.4–2.5 | CTA planning + pacing optimization | opus |
| 3.1–3.2 | Logic validation + dead weight detection | opus |
| 3.3 | 10-point sequence audit | sonnet |
| 4 | Package assembly | sonnet |

---

## FORBIDDEN BEHAVIORS

1. ❌ Proceeding without loading `page-brief.json` — page type is required for template selection
2. ❌ Proceeding without loading `above-fold-blueprint.json` — Section 1 is locked to LP-03 output
3. ❌ Selecting Type A template for a classified Type B page (or vice versa)
4. ❌ Omitting mandatory sections — see template tables; mandatory sections cannot be excluded
5. ❌ Leaving word count targets as a range without a specific target number
6. ❌ Proof density plan that says "add testimonials" without specifying count and type
7. ❌ Visual density plan that says "add images" without specifying type, count, and requirement
8. ❌ Proceeding past GATE_3 with any of the 4 logic tests failing
9. ❌ Sequence score below 7.0 proceeding to Phase 3 writing
10. ❌ Dead weight sections surviving into the final sequence
11. ❌ Fewer than 3 CTA placements mapped — 3 is the absolute minimum
12. ❌ Guarantee block absent from any page type — every page must have a guarantee
13. ❌ Price appearing before mechanism + at least one proof block (Type A) — value must precede price
14. ❌ Awareness-stage pacing not applied — default pacing without stage adjustment is a protocol violation
