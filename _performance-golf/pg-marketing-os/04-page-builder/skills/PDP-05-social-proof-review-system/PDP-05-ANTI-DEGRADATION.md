# PDP-05: Social Proof + Review System Architect — Anti-Degradation File

> **Version:** 1.0
> **Skill:** PDP-05-social-proof-review-system
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

PDP-05 has seven specific failure modes:

1. **LP-05/LP-10 Pattern Leakage:** AI applies long-form proof-weaving patterns to a PDP. PDP social proof is a UX system (histogram, filters, cards, loading), NOT a copy section with embedded testimonials. If you're writing "proof placement" in narrative copy, you're in the wrong skill.

2. **Missing Histogram:** AI produces a review section without the star distribution histogram. The histogram with tappable filter bars is the single most important review UX element per Baymard. Reviews without a histogram are a significant trust failure.

3. **Pagination Instead of Load More:** AI specifies numbered pagination for reviews. Baymard: pagination disrupts mobile scroll flow and causes users to abandon. Must use "Load More" button with 15-30 reviews per batch.

4. **Generic Filter Chips:** AI generates generic filter labels like "Quality" or "Great Product." Filter chips must be derived from product-specific topics: "Taste," "Texture," "Results," "Shipping," "Flavor," etc. Generic chips signal a fake or lazy review system.

5. **AI-Telltale Reviews:** AI generates reviews that sound like AI wrote them. Telltales: "I was skeptical but..." opening, "exceeded my expectations," "revolutionary product," uniform sentence length, no typos or informal language, identical praise patterns across reviewers. Real reviews are messy, specific, and voice-diverse.

6. **Missing Badges:** AI omits Verified Buyer badge and/or Time Owned from review cards. These are the two highest-impact credibility signals per Baymard user testing. Missing them makes all reviews look potentially fake.

7. **Visible Empty Q&A:** AI includes a Q&A section with zero questions, showing an empty state. Baymard: an empty Q&A section signals that nobody cares about the product. If 0 questions exist, the entire section must be hidden.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `input-verification.md` | Layer 1 |
| After Layer 0 | `research-load.md` | Layer 1 |
| After Layer 0 | `pdp-reference-load.md` | Layer 1 |
| After Layer 1 | `review-system-architecture.md` | Layer 2 |
| After Layer 1 | `ugc-carousel-architecture.md` | Layer 2 |
| After Layer 1 | `review-histogram-spec.md` | Layer 2 |
| After Layer 1 | `keyword-filter-spec.md` | Layer 2 |
| After Layer 2 | `featured-reviews.md` | Layer 3 |
| After Layer 2 | `keyword-topics.md` | Layer 3 |
| After Layer 2 | `reviewer-personas.md` | Layer 3 |
| After Layer 2 | `qa-section-architecture.md` | Layer 3 |
| After Layer 2 | `review-card-template.md` | Layer 3 |
| After Layer 3 | `volume-audit.md` | Layer 4 |
| After Layer 3 | `specificity-check.md` | Layer 4 |
| After Layer 3 | `badge-verification.md` | Layer 4 |
| After Layer 3 | `anti-slop-check.md` | Layer 4 |
| Output | `pdp-social-proof-system.json` | Downstream (PDP-07, frontend) |
| Output | `PDP-SOCIAL-PROOF-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Review histogram | Present with tappable star-filter bars | HALT — add histogram |
| UGC photo position | Above text reviews, NOT below | HALT — reorder |
| Keyword filter chips | 5-8 product-specific chips | HALT — add/replace chips |
| Review loading | "Load More" button, 15-30 per batch | HALT — remove pagination/infinite scroll |
| Verified Buyer badge | Present on every review card | HALT — add badge |
| Time Owned | Present on every review card | HALT — add time owned |
| Review card structure | Stars + Headline -> Attributes -> Pros/Cons -> Body | HALT — restructure cards |
| Merchant response | Specified for all 3-star-and-below | HALT — add response spec |
| Q&A search-first | Keyword search field at TOP of Q&A | HALT — add search |
| Q&A zero-state | Section hidden if 0 questions | HALT — fix zero-state |
| "Write a Review" | De-emphasized small link, NOT button | HALT — change to link |
| Star distribution | Realistic per realism table (no 95%+ five-star) | HALT — regenerate |
| Social proof audit score | >= 7.0/10 | HALT — revise until met |
| Anti-slop check | 0 AI-telltale words in generated reviews | HALT — rewrite flagged reviews |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "We don't need a histogram for this product" | Baymard: the histogram with tappable bars is the #1 review UX element. Mandatory regardless of product. |
| "Pagination works fine for reviews" | Baymard: pagination disrupts mobile scroll flow, adds friction, and reduces review engagement by 40%+. "Load More" button is the validated pattern. |
| "Infinite scroll is a better UX" | Infinite scroll causes disorientation, performance degradation, and inability to reach footer content. "Load More" gives user control. |
| "Generic filter labels are fine" | Product-specific chips ("Taste," "Texture") signal real review analysis. Generic chips ("Quality," "Great") signal a fake system. |
| "We don't have enough reviews for a histogram" | The histogram structure is specified even for low-volume products. It shows the real distribution honestly. A product with 12 reviews and a histogram looks more trustworthy than one with 200 reviews and no histogram. |
| "Verified Buyer badges aren't necessary if all reviews are real" | Users CANNOT know reviews are real without the badge. The badge is a trust signal, not a data point. |
| "Q&A can show an empty state to encourage questions" | Baymard: an empty Q&A section signals zero customer engagement. It hurts rather than helps. Hide if empty. |
| "These generated reviews sound natural enough" | If a review contains ANY AI telltale ("exceeded expectations," "I was skeptical," "game-changing"), it fails. Real reviews have typos, run-on sentences, slang, and product-specific details that AI patterns avoid. |
| "We can skip the UGC carousel if no photos exist" | Correct — if no UGC photos exist, omit the section. But do NOT substitute stock photos or AI-generated images. Either real UGC or nothing. |
| "3-star reviews don't need merchant responses" | 3-star reviews are the most influential for fence-sitters. A thoughtful merchant response on a 3-star review often converts better than a 5-star review alone. Mandatory. |

---

## REVIEW SYSTEM UX VALIDATION

Before moving to Layer 2, verify all architectural requirements:

```yaml
REVIEW-SYSTEM-CHECK:
  histogram_present: "[Y/N — MUST BE Y]"
  histogram_bars_tappable: "[Y/N — MUST BE Y]"
  histogram_shows_all_5_ratings: "[Y/N — MUST BE Y, even if some are 0]"
  ugc_strip_above_text_reviews: "[Y/N — MUST BE Y if UGC exists]"
  ugc_fullscreen_overlay: "[Y/N — MUST BE Y]"
  keyword_chips_count: "[number — MUST BE 5-8]"
  keyword_chips_product_specific: "[Y/N — no generic labels]"
  loading_mechanism: "[load_more | pagination | infinite — MUST BE load_more]"
  batch_size: "[number — MUST BE 15-30]"
  sort_default: "[most_relevant | newest | highest — MUST BE most_relevant]"
  verified_buyer_badge: "[Y/N — MUST BE Y]"
  time_owned_field: "[Y/N — MUST BE Y]"
  card_has_pros_cons: "[Y/N — MUST BE Y]"
  card_has_headline: "[Y/N — MUST BE Y]"
  merchant_response_rule: "[3_star_and_below | all | none — MUST BE 3_star_and_below]"
  write_review_deemphasized: "[Y/N — MUST BE Y]"
  qa_search_first: "[Y/N — MUST BE Y]"
  qa_brand_vs_community: "[Y/N — MUST BE Y]"
  qa_zero_state_hidden: "[Y/N — MUST BE Y]"

  all_baymard_compliant: "[Y/N]"
  IF N: HALT — fix non-compliant components
```

---

## GENERATED REVIEW QUALITY VALIDATION

Before moving to Layer 3, verify generated content:

```yaml
REVIEW-CONTENT-CHECK:
  featured_review_count: "[number — MUST BE 3-5]"
  each_has_specific_outcome: "[Y/N — numbers, timeframes, measurable results]"
  each_has_named_persona: "[Y/N — name, demographics, purchase context]"
  each_has_product_detail: "[Y/N — mentions specific product attributes]"
  reviewer_personas_distinct: "[Y/N — 5-8 different archetypes]"
  no_repeated_praise_patterns: "[Y/N — varied language across reviews]"
  star_distribution_realistic: "[Y/N — follows realism table]"
  qa_has_search_field: "[Y/N]"
  qa_answer_types_distinguished: "[Y/N — brand vs community marked]"

  AI_TELLTALE_SCAN:
    contains_revolutionary: "[Y/N — MUST BE N]"
    contains_game_changing: "[Y/N — MUST BE N]"
    contains_exceeded_expectations: "[Y/N — MUST BE N]"
    contains_i_was_skeptical_but: "[Y/N — MUST BE N]"
    contains_transform: "[Y/N — MUST BE N]"
    contains_unlock: "[Y/N — MUST BE N]"
    contains_journey: "[Y/N — MUST BE N]"
    contains_blown_away: "[Y/N — MUST BE N]"
    uniform_sentence_length: "[Y/N — MUST BE N]"
    all_reviews_same_tone: "[Y/N — MUST BE N]"

  IF any AI telltale found: HALT — rewrite flagged reviews
```

---

## THREE-FILE OUTPUT REQUIREMENT

PDP-05 is NOT complete until all three exist:

```
[ ] pdp-social-proof-system.json — EXISTS
[ ] pdp-social-proof-system.json — Has: review_system (histogram, loading, card_template, filter_chips)
[ ] pdp-social-proof-system.json — Has: ugc_carousel (video_count, autoplay_behavior, diversity_requirements)
[ ] pdp-social-proof-system.json — Has: qa_section (search_spec, answer_types, zero_state_handling)
[ ] pdp-social-proof-system.json — Has: featured_reviews (3-5 reviews with full personas)
[ ] pdp-social-proof-system.json — Has: social_proof_audit_score (>= 7.0)
[ ] pdp-social-proof-system.json — review_system.loading = "load_more" (NOT pagination or infinite)
[ ] pdp-social-proof-system.json — review_system.histogram.bars_tappable = true
[ ] pdp-social-proof-system.json — review_system.card_template has: stars, headline, attributes, pros_cons, body, verified_buyer, time_owned
[ ] PDP-SOCIAL-PROOF-SUMMARY.md — EXISTS
[ ] PDP-SOCIAL-PROOF-SUMMARY.md — Contains: review system summary, UGC carousel summary, Q&A summary, audit score
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all microskills executed with spec files read
[ ] execution-log.md — Shows audit score and anti-slop check results

IF ANY CHECKBOX UNCHECKED -> PDP-05 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
PDP-05-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  page_brief_loaded: "[Y/N]"
  page_type_confirmed: "[type_b | hybrid — NOT type_a]"
  pdp_reference_loaded: "[Y/N]"
  research_loaded: "[Y/N]"

  # Rushing detection
  missing_histogram: "[Y/N]"
  using_pagination: "[Y/N]"
  using_infinite_scroll: "[Y/N]"
  generic_filter_chips: "[Y/N]"
  missing_verified_buyer_badge: "[Y/N]"
  missing_time_owned: "[Y/N]"
  visible_empty_qa: "[Y/N]"
  ai_telltale_in_reviews: "[Y/N]"
  applying_lp05_patterns: "[Y/N]"
  ugc_photos_below_text_reviews: "[Y/N]"
  prominent_write_review_button: "[Y/N]"

  IF any rushing_detection = Y: STOP — execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| LP-05/LP-10 pattern leakage | Output contains proof_placement, proof_density, narrative_testimonial instead of review system UX components | Restart from Layer 1 using PDP-05 architecture | Clear context of LP patterns, re-read PDP-05 AGENT.md |
| Missing histogram | Review system spec lacks histogram component | Add histogram with tappable bars, star counts, and filter behavior | Non-negotiable — no escalation, just add it |
| Pagination specified | Review loading mechanism = numbered pages | Change to "Load More" button with 15-30 batch size | Non-negotiable — no escalation, just fix it |
| Generic filter chips | Filter labels are "Quality," "Great," "Good" instead of product-specific | Regenerate chips from research keywords and product attributes | If no research available, use product category defaults (supplement: Taste, Results, Shipping, Value, Texture) |
| AI-telltale reviews | Generated reviews contain flagged phrases or uniform patterns | Rewrite flagged reviews with product-specific detail, varied sentence structure, informal language, minor imperfections | If all reviews flagged, rebuild reviewer personas first, then regenerate from persona voice |
| Missing badges | Review cards lack Verified Buyer and/or Time Owned | Add both fields to review card template | Non-negotiable — both are mandatory on every card |
| Visible empty Q&A | Q&A section rendered with 0 questions | Set zero-state behavior to hide entire section | Non-negotiable — empty Q&A hurts trust |
| Fake star distribution | 95%+ five-star, 0% one-star, or uniform distribution | Regenerate using realism table from AGENT.md | If product genuinely has extreme distribution, document evidence and flag for human review |
