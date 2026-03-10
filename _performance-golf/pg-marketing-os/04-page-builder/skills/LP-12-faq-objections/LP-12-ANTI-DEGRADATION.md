# LP-12: FAQ/Objection Crusher — Anti-Degradation File

> **Version:** 1.1
> **Skill:** LP-12-faq-objections
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-12 has five specific failure modes — all related to the fact that FAQ sections are commonly treated as afterthoughts and models produce low-effort, generic, softball output:

1. **Softball Objections Only:** AI writes 8 questions that are all easy logistics ("How do I take it?" "How fast does it ship?" "What's in it?") and avoids the hard questions about price, efficacy, and trust. This produces a FAQ section that resolves zero purchase objections because it never addresses them. The three mandatory categories (price/value, efficacy/results, trust/guarantee) exist specifically to prevent this.

2. **Evasive Answers:** AI writes answers that dodge the real concern. "Results may vary" is not an answer to "Does it work?" — it is a legal disclaimer masquerading as an answer. "We stand behind our products" is not an answer to "What if I don't like it?" — it is a corporate platitude. Every answer must DIRECTLY address the question in the first sentence.

3. **Missing Purchase Objections:** AI fails to include the 3 mandatory objection categories. A FAQ section without a price/value question is incomplete. A FAQ section without an efficacy question is incomplete. A FAQ section without a trust/guarantee question is incomplete. These are the 3 reasons people do NOT buy — they must all be addressed.

4. **Generic FAQ Voice:** AI produces answers in a stiff, corporate, third-person voice that breaks the page's conversational tone. The FAQ voice must match the rest of the page. If the page is direct and conversational, "We formulate our product with..." is wrong — "Magnesium Breakthrough contains..." is right. If the page uses "you" and "your," the FAQ does too.

5. **Objection-Answer Mismatch:** AI writes a question about one concern but the answer addresses a different concern. "Is this safe to take with medications?" answered with ingredients list data instead of a specific safety/interaction statement. The answer must address the EXACT question asked AND the hidden objection behind it.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `packages-loaded.md` | Layer 1 |
| After Layer 0 | `objection-inventory.md` — with >= 8 objections | Layer 1 |
| After Layer 0 | `specimens-loaded.md` | Layer 1 |
| After Layer 1 | `objection-classification.md` | Layer 2 |
| After Layer 1 (Type A) | `sequence-plan.md` | Layer 2 |
| After Layer 1 (Type B/Hybrid) | `pdp-faq-curation.md` — with 5-7 items + source attribution | Layer 2 |
| After Layer 1 | `answer-strategies.md` | Layer 2 |
| After Layer 2 | `faq-header.md` | Layer 3 |
| After Layer 2 (Type A) | `core-objection-answers.md` — with mandatory categories | Layer 3 |
| After Layer 2 (Type A) | `technical-faq-answers.md` | Layer 3 |
| After Layer 2 (Type A) | `logistics-faq-answers.md` | Layer 3 |
| After Layer 2 (Type B/Hybrid) | `pdp-accordion-faq.md` — with 5-7 items + accordion UX spec | Layer 3 |
| After Layer 3 | `faq-audit.md` — shows score >= 7.5 | Layer 4 |
| After Layer 3 | `coverage-audit.md` — shows PASS | Layer 4 |
| Output | `faq-package.json` | All downstream |
| Output | `FAQ-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold (Type A) | Threshold (Type B/Hybrid) | If Not Met |
|------------|-------------------|--------------------------|------------|
| Total FAQ items | 8-12 | 5-7 (Baymard curated) | HALT -- Type A: if < 8, generate more; if > 15, consolidate. Type B: if < 5, add; if > 7, cut lowest-scoring |
| Price/value objection | >= 1 item | >= 1 item | HALT -- add price/value question |
| Efficacy/results objection | >= 1 item | >= 1 item | HALT -- add efficacy question |
| Trust/guarantee objection | >= 1 item | >= 1 item | HALT -- add trust/guarantee question |
| Total categories covered | >= 4 of 6 | >= 3 (mandatory categories) | HALT -- broaden objection coverage |
| Sycophantic openers | 0 in all answers | 0 in all answers | HALT -- remove every instance |
| AI telltales | 0 in all copy | 0 in all copy | HALT -- remove every instance |
| Marketing language (PDP) | N/A | 0 in all answers | HALT -- rewrite with factual language (Baymard: marketing in FAQ decreases trust) |
| Generic template answers | 0 | 0 | HALT -- rewrite with product-specific content |
| FAQ audit score | >= 7.5/10 | >= 7.5/10 | HALT -- revise until met |
| Answer length | 2-4 sentences per answer | 1-3 sentences per answer | HALT -- shorten or split long answers |
| Source attribution (PDP) | N/A | Every item must trace to a source | HALT -- add source for every FAQ item |
| Accordion UX spec (PDP) | N/A | Complete (behavior + typography + accessibility) | HALT -- complete the UX spec |
| Objection inventory (Layer 0) | >= 8 distinct objections | >= 8 distinct objections | HALT -- expand inventory before proceeding |
| FAQ format (PDP) | N/A | Accordion-only (not inline, not open-by-default) | HALT -- reformat to accordion pattern |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "6 FAQ items is enough for this product" | Minimum is 8. 6 is not 8. No product has fewer than 8 objections worth addressing. |
| "The price objection is handled in the offer section" | The FAQ must ALSO address it. Readers who scroll to the FAQ have not been convinced by the offer section. Redundancy is intentional. |
| "Results may vary is a sufficient answer" | It is a disclaimer, not an answer. The first sentence must directly answer "Does it work?" — then add the disclaimer. |
| "The product is straightforward so only 5 questions are needed" | Even simple products have price, efficacy, trust, shipping, ingredients, and comparison objections. 8 minimum. |
| "Great question! is friendly and builds rapport" | It is sycophantic padding. The reader did not ask to be complimented — they asked a question. Answer it. |
| "This FAQ section matches what I've seen on other landing pages" | Matching mediocre is not the standard. Most FAQ sections are terrible — 5 softball questions with evasive answers. That is what we are trying to beat. |
| "The answers are comprehensive at 6-8 sentences each" | Comprehensive does not mean effective. 2-4 sentences forces clarity. If the answer needs 6 sentences, the question is too broad — split it. |
| "I'll just include logistics questions since the hard objections are addressed elsewhere on the page" | The FAQ must address hard objections independently. Readers jump to FAQ specifically to have their doubts addressed. |
| "8 FAQ items is better than 7 for this PDP page" | Baymard rule: PDP FAQ is curated, not exhaustive. 5-7 maximum. 8 items means you failed to curate. Cut the lowest-scoring item. |
| "A little marketing language makes the FAQ answers more engaging" | Baymard research finds marketing language in FAQ answers DECREASES trust. PDP FAQ answers are factual. Period. |
| "Open-by-default accordion is better for visibility" | Baymard best practice: all closed by default, one open at a time. Open-by-default overwhelms the scanner and defeats the purpose of accordion format. |
| "I'll use the Type A microskills (2.2+2.3+2.4) since they're more thorough" | Type B/Hybrid pages use 1.4+2.5 specifically because PDP FAQ is a different architecture. Running Type A microskills produces Type A output (too long, too persuasive, too many items). Use the correct path. |
| "Source attribution is unnecessary — the questions are obviously common" | Source attribution proves the questions are REAL. Engine-generated questions are acceptable but must be marked as such. The point of PDP FAQ curation is sourcing from actual customers. |

---

## OBJECTION INVENTORY REQUIREMENTS

Before Layer 1 begins, verify `objection-inventory.md` contains:

```yaml
OBJECTION-INVENTORY-MC-CHECK:
  total_objections_inventoried: "[count -- must be >= 8]"

  mandatory_categories_present:
    price_value_objections: "[count -- must be >= 1]"
    efficacy_results_objections: "[count -- must be >= 1]"
    trust_guarantee_objections: "[count -- must be >= 1]"

  optional_categories:
    timing_objections: "[count]"
    comparison_objections: "[count]"
    technical_logistics_objections: "[count]"

  sources_used:
    from_research_quotes: "[count]"
    from_audience_profile: "[count]"
    from_competitor_analysis: "[count]"
    from_product_specifics: "[count]"

  IF total < 8: HALT -- expand inventory. Mine more objections from research quotes, audience pain profile, competitor weaknesses, product specifics.
  IF any mandatory = 0: HALT -- the three mandatory categories must each have at least 1 objection.
```

---

## ANSWER QUALITY REQUIREMENTS

Before Layer 3 begins, verify all FAQ answers meet:

```yaml
ANSWER-QUALITY-MC-CHECK:
  total_answers_written: "[count]"

  per_answer_checks:
    - question_id: "[Q1, Q2, etc.]"
      first_sentence_is_direct_answer: "[Y/N -- must be Y]"
      sycophantic_opener: "[Y/N -- must be N]"
      product_specific: "[Y/N -- must be Y]"
      proof_or_data_included: "[Y/N -- note if Y, at least 3 total must be Y]"
      sentence_count: "[2-4 acceptable, 5 acceptable for complex technical only]"
      hidden_objection_addressed: "[Y/N]"
      confidence_builder_ending: "[Y/N -- last sentence builds confidence]"
      ai_telltales: "[Y/N -- must be N]"

  aggregate:
    answers_with_proof: "[count -- must be >= 3]"
    sycophantic_openers_found: "[count -- must be 0]"
    ai_telltales_found: "[count -- must be 0]"
    generic_template_answers: "[count -- must be 0]"
    answers_over_4_sentences: "[count -- should be 0, max 2 for complex technical]"

  IF sycophantic_openers > 0: HALT -- remove all sycophantic openers
  IF ai_telltales > 0: HALT -- remove all AI telltales
  IF generic_template > 0: HALT -- rewrite with product-specific content
  IF answers_with_proof < 3: HALT -- add proof/data to more answers
```

---

## SEQUENCE VERIFICATION

Before assembly, verify the FAQ sequence:

```yaml
SEQUENCE-MC-CHECK:
  page_type: "[type_a | type_b | hybrid]"
  expected_strategy: "[hardest_first for Type A | hardest_last for Type B/Hybrid]"
  actual_strategy: "[strategy applied]"
  strategy_match: "[Y/N -- must be Y]"

  hardest_objection_identified: "[question text]"
  hardest_objection_position:
    type_a: "[should be position 1-2]"
    type_b: "[should be position 8-10]"

  first_item_category: "[category name]"
  last_item_category: "[category name]"

  type_a_check:
    first_3_items_include_hard_objection: "[Y/N -- must be Y for Type A]"
  type_b_check:
    last_3_items_include_hard_objection: "[Y/N -- must be Y for Type B]"

  IF strategy_match = N: HALT -- reorder FAQ items to match page type strategy
```

---

## THREE-FILE OUTPUT REQUIREMENT

LP-12 is NOT complete until all three exist:

**Type A:**
```
[ ] faq-package.json -- EXISTS
[ ] faq-package.json -- Contains: 8-12 FAQ items with questions, answers, categories, hidden objections
[ ] faq-package.json -- coverage.mandatory_categories_present all true
[ ] faq-package.json -- validation.faq_audit_score >= 7.5
[ ] faq-package.json -- validation.sycophantic_openers = 0
[ ] faq-package.json -- validation.ai_telltales = 0
[ ] FAQ-SUMMARY.md -- EXISTS
[ ] FAQ-SUMMARY.md -- Contains: category coverage table, all items in sequence order, audit scores
[ ] execution-log.md -- EXISTS
[ ] execution-log.md -- Shows all gates passed, objection inventory count, answer quality check

IF ANY CHECKBOX UNCHECKED -> LP-12 IS NOT COMPLETE
```

**Type B/Hybrid (PDP Enhancement Layer):**
```
[ ] faq-package.json -- EXISTS
[ ] faq-package.json -- Contains: 5-7 FAQ items (Baymard curated) with questions, answers, categories, sources
[ ] faq-package.json -- coverage.mandatory_categories_present all true
[ ] faq-package.json -- validation.faq_audit_score >= 7.5
[ ] faq-package.json -- validation.sycophantic_openers = 0
[ ] faq-package.json -- validation.ai_telltales = 0
[ ] faq-package.json -- validation.marketing_language = 0
[ ] pdp-faq-curation.md -- EXISTS (Layer 1 output)
[ ] pdp-faq-curation.md -- Contains: 5-7 curated items with source attribution + 3-criteria scores
[ ] pdp-accordion-faq.md -- EXISTS (Layer 2 output)
[ ] pdp-accordion-faq.md -- Contains: Section A (FAQ copy) + Section B (Accordion UX spec) + Section C (Implementation notes)
[ ] pdp-accordion-faq.md -- Accordion UX spec complete: behavior + typography + accessibility
[ ] FAQ-SUMMARY.md -- EXISTS
[ ] FAQ-SUMMARY.md -- Contains: category coverage table, all items in sequence order, audit scores
[ ] execution-log.md -- EXISTS
[ ] execution-log.md -- Shows all gates passed, PDP curation count, accordion spec verified

IF ANY CHECKBOX UNCHECKED -> LP-12 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run Before Every Major Execution)

```yaml
LP-12-MC-CHECK:
  trigger: "[before_generation | before_validation | before_output]"

  pre_generation:
    page_type: "[type_a | type_b | hybrid]"
    specimens_loaded: "[Y/N]"
    upstream_packages_loaded: "[Y/N]"
    objection_inventory_count: "[must be >= 8]"
    all_objections_classified: "[Y/N]"
    sequence_plan_locked: "[Y/N — via 1.2 for Type A, via 1.4 for Type B/Hybrid]"
    answer_strategies_assigned: "[Y/N]"
    mandatory_categories_in_inventory:
      price_value: "[Y/N]"
      efficacy: "[Y/N]"
      trust_guarantee: "[Y/N]"
    pdp_specific:
      correct_microskill_path: "[Y/N — Type A uses 1.2+2.2+2.3+2.4, Type B/Hybrid uses 1.4+2.5]"
      pdp_curation_count: "[5-7 for Type B/Hybrid, N/A for Type A]"
      source_attribution_present: "[Y/N for Type B/Hybrid, N/A for Type A]"

  pre_validation:
    total_faq_items_written: "[Type A: must be 8-12. Type B/Hybrid: must be 5-7]"
    mandatory_categories_in_answers:
      price_value: "[Y/N]"
      efficacy: "[Y/N]"
      trust_guarantee: "[Y/N]"
    sycophantic_openers_found: "[must be 0]"
    ai_telltales_found: "[must be 0]"
    generic_answers_found: "[must be 0]"
    pdp_specific:
      marketing_language_found: "[must be 0 for Type B/Hybrid, N/A for Type A]"
      accordion_ux_spec_complete: "[Y/N for Type B/Hybrid, N/A for Type A]"
      padded_answers: "[count of 1-sentence-answerable questions answered in >1 sentence — must be 0 for Type B/Hybrid]"

  rushing_detection:
    fewer_than_minimum_items: "[Y/N — <8 for Type A, <5 for Type B/Hybrid]"
    skipping_hard_objections: "[Y/N]"
    using_template_answers: "[Y/N]"
    skipping_specimen_load: "[Y/N]"
    all_answers_same_length: "[Y/N -- suspicious if all are exactly 2 sentences]"
    wrong_microskill_path: "[Y/N — running Type A path for Type B or vice versa]"

  IF any rushing = Y: STOP -- execute skipped step properly
  result: "[PROCEED | PAUSE | HALT]"
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection Signal | Response | Escalation |
|-------------|-----------------|----------|------------|
| Softball FAQ | < 2 hard objection categories in answers | HALT -- add price/efficacy/trust questions | Flag for human review if research data insufficient |
| Sycophantic Openers | "Great question" / "Absolutely" / "That's a common concern" in any answer | HALT -- remove opener, lead with direct answer | Auto-fix (delete opening phrase) |
| Generic Template Answers | Answer contains no product name, no specific data, could apply to any product | HALT -- rewrite with product-specific content | Review against specimen answers for specificity standard |
| Evasive Answers | First sentence is disclaimer ("Results may vary"), corporate platitude, or redirect | HALT -- rewrite first sentence as direct answer | Human review if question is legally sensitive |
| Over-Length Answers | Answer > 4 sentences (> 5 for complex technical) | HALT -- cut to 2-4 sentences or split into 2 questions | Trim least-essential sentence |
| Wrong Sequence | Hard objections appear in wrong position for page type | HALT -- reorder per sequencing strategy | Verify page type classification is correct |
| Insufficient Coverage | < 4 of 6 objection categories represented | HALT -- add questions from underrepresented categories | Review objection inventory for missed categories |
| Objection-Answer Mismatch | Answer addresses different concern than the question asks | HALT -- rewrite answer to address the specific question + hidden objection | Human review for ambiguous questions |
| AI Telltale Contamination | Forbidden word from anti-slop list appears in any copy | HALT -- remove and replace with specific language | Run full anti-slop scan before assembly |
| Voice Mismatch | FAQ answers use different register/tone than rest of page | HALT -- revise FAQ voice to match page voice direction | Compare against hero section and offer section voice |
| PDP FAQ Over-Count | More than 7 FAQ items for Type B/Hybrid page | HALT -- cut lowest-scoring items to 5-7 maximum (Baymard curated rule) | Re-run 1.4 curation with stricter filtering |
| Marketing Language in PDP FAQ | Persuasive/marketing language in any PDP FAQ answer ("revolutionary," "you'll love," "game-changing") | HALT -- rewrite with factual language only (Baymard: decreases trust) | Compare answer against the marketing-vs-factual table in 2.5 spec |
| Wrong FAQ Format for PDP | Inline text blocks, open-by-default, or tabs used instead of accordion for PDP FAQ | HALT -- reformat to accordion-only pattern with UX spec | Review 2.5 accordion behavior rules |
| Wrong Microskill Path for Page Type | Running 1.2+2.2+2.3+2.4 for Type B/Hybrid page (or 1.4+2.5 for Type A page) | HALT -- use correct path. Type A: 1.2+2.2+2.3+2.4. Type B/Hybrid: 1.4+2.5 | Check page_type from packages-loaded.md |
| Missing Source Attribution (PDP) | PDP FAQ item has no source (review, support ticket, competitor FAQ, research quote) | HALT -- trace item to a real source or mark as engine-generated with justification | Flag as DEGRADED_SOURCE_QUALITY if no real sources available |
| PDP Answer Padding | 1-sentence-answerable question padded to 2-3 sentences in PDP FAQ | HALT -- cut to 1 sentence. "Is this gluten-free?" needs "Yes" not a paragraph | Apply the 1-sentence test from 2.5 spec |
