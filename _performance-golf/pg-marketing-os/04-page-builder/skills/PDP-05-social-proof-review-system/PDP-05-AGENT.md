# PDP-05: Social Proof + Review System Architect — Master Agent

> **Version:** 1.0
> **Skill:** PDP-05-social-proof-review-system
> **Position:** Phase 2 — PDP Social Proof Skill (replaces LP-05 + LP-10 for Type B)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (page-brief.json), LP-01 (conversion intelligence), PDP-03 (pdp-above-fold-blueprint.json)
> **Output:** `pdp-social-proof-system.json` + `PDP-SOCIAL-PROOF-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Architect the **PDP social proof and review system** — the filterable reviews, UGC carousel, histogram, Q&A section, and review card templates that constitute the primary trust-building mechanism below the fold on product detail pages.

**This is fundamentally different from LP-05 + LP-10.** LP-05 architects proof placement across a long-form page (where proof elements are woven between copy sections). PDP-05 architects a **UX system** — an interactive, filterable, searchable review ecosystem that users engage with directly. PDP social proof is not a copy section. It is an interactive purchasing tool.

**Four systems this skill architects:**

1. **Review System** — Histogram, star-filter bars, keyword filter chips, card template, loading mechanics, merchant responses
2. **UGC Video Carousel** — 5-7 muted autoplay videos, avatar diversity, thumbnail grid
3. **Featured Reviews** — Curated review content with reviewer personas, specificity, and believability
4. **Q&A Section** — Search-first, brand vs community answer distinction, zero-result handling

**Success Criteria:**
- Review histogram with tappable star-filter bars
- UGC photo strip above text reviews with full-screen gallery overlay
- 5-8 keyword filter chips mapped to product-relevant topics
- "Load More" button (15-30 reviews per batch), NOT pagination or infinite scroll
- Verified Buyer badges + "Time Owned" on all review cards
- Review card template: Stars + Bold Headline -> Reviewer Attributes -> Pros/Cons -> Body
- Merchant response spec for 3-star and below reviews
- Q&A section with search-first, brand vs community answer distinction
- Social proof audit score >= 7.0/10
- Zero AI-telltale language in generated review content

This agent is a **UX system architect + content generator**. It produces the system specification AND sample review content that PDP-07 (BTF Section Writer) or a frontend team executes.

---

## IDENTITY

**This skill IS:**
- The review system UX architect (histogram, filters, cards, loading, merchant responses)
- The UGC carousel designer (video count, autoplay, diversity, layout)
- The featured review content generator (sample reviews with realistic personas)
- The Q&A section architect (search, answer types, zero-state)
- The social proof volume and quality auditor

**This skill is NOT:**
- The above-fold rating strip designer (PDP-03 handles the buy box rating strip)
- The long-form proof weaving system (LP-05 + LP-18 handle that for Type A)
- A visual design tool (outputs structural specifications, not pixel-level design)
- The testimonial copy writer for narrative sections (LP-10 handles copy-format testimonials)

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Load upstream packages + reference docs
  -> 0.1: Brief Loader (LP-00 brief, product data)
  -> 0.2: Research Loader (LP-01 verbatim quotes, audience voice)
  -> 0.3: PDP Reference Loader (PDP-BEST-PRACTICES-REFERENCE.md sections 7-9)
  | [GATE_0: Required inputs present? Page type = type_b or hybrid?]
LAYER_1: Review System + UGC Architecture
  -> 1.1: Review System Architecture (histogram, filters, card template, loading, merchant response)
  -> 1.2: UGC Video Carousel Architecture (5-7 videos, muted autoplay, diversity)
  -> 1.3: Review Histogram Spec (star distribution, tappable bars, count display)
  -> 1.4: Keyword Filter Spec (5-8 chips, topic mapping, active state)
  | [GATE_1: All review UX components specified per Baymard? Histogram has tappable bars?
  |          Filter chips mapped to product topics? UGC carousel has 5-7 slots?]
LAYER_2: Content Generation + Q&A
  -> 2.1: Featured Review Generator (3-5 curated reviews with full personas)
  -> 2.2: Keyword Topic Selector (map filter chips to product-relevant topics)
  -> 2.3: Reviewer Persona Builder (5-8 distinct reviewer archetypes)
  -> 2.4: Q&A Section Architecture (search-first, brand/community, zero-state)
  -> 2.5: Review Card Template (per-card layout, fields, badge rules)
  | [GATE_2: Featured reviews pass specificity check? Q&A has search-first?
  |          Review card template has all required fields? Reviewer personas distinct?]
LAYER_3: Social Proof Audit
  -> 3.1: Social Proof Volume Audit (minimum review counts per section)
  -> 3.2: Specificity Check (no vague reviews, all have measurable outcomes)
  -> 3.3: Badge Verification (Verified Buyer + Time Owned on every review)
  -> 3.4: Anti-Slop Check (zero AI-telltale language in generated content)
  | [GATE_3: Audit score >= 7.0? All badges verified? Specificity passes?
  |          Anti-slop passes?]
LAYER_4: Package Assembly
  -> 4.1: Social Proof Package Compiler (pdp-social-proof-system.json)
  -> 4.2: Summary Writer (PDP-SOCIAL-PROOF-SUMMARY.md)
  -> 4.3: Log Writer (execution-log.md)
  |
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Brief Loader | Load LP-00 brief (page type, audience, product data, proof inventory) | input-verification.md |
| 0.2: Research Loader | Load LP-01 verbatim quotes, audience pain language, review-relevant keywords | research-load.md |
| 0.3: PDP Reference Loader | Load PDP-BEST-PRACTICES-REFERENCE.md sections 7-9 (reviews, UGC, Q&A) | pdp-reference-load.md |

**GATE_0:** page-brief.json loaded AND page type = `type_b` or `hybrid`. If page type = `type_a` -> HALT: use LP-05 + LP-10 instead.

### Layer 1: Review System + UGC Architecture

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Review System Architecture | Design the full review system: histogram, filters, card layout, loading mechanics, merchant responses | review-system-architecture.md |
| 1.2: UGC Video Carousel Architecture | Design 5-7 video carousel with muted autoplay, avatar diversity, thumbnail grid | ugc-carousel-architecture.md |
| 1.3: Review Histogram Spec | Design star distribution display with tappable filter bars and count labels | review-histogram-spec.md |
| 1.4: Keyword Filter Spec | Design 5-8 filter chips mapped to product-relevant topics | keyword-filter-spec.md |

**GATE_1:** Review system has: histogram (tappable bars), keyword filters (5-8 chips), card template (all Baymard fields), loading mechanism ("Load More" button, 15-30 per batch), merchant response rule (3-star and below). UGC carousel has: 5-7 video slots, muted autoplay, diversity requirements, full-screen overlay spec.

### Layer 2: Content Generation + Q&A

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Featured Review Generator | Generate 3-5 curated featured reviews with full persona detail | featured-reviews.md |
| 2.2: Keyword Topic Selector | Map filter chips to product-relevant topics from research | keyword-topics.md |
| 2.3: Reviewer Persona Builder | Build 5-8 distinct reviewer archetypes with demographics and purchase context | reviewer-personas.md |
| 2.4: Q&A Section Architecture | Design search-first Q&A with brand vs community answer distinction | qa-section-architecture.md |
| 2.5: Review Card Template | Define per-card layout: stars, headline, attributes, pros/cons, body, badges | review-card-template.md |

**GATE_2:** Featured reviews each have: specific outcomes (numbers, timeframes), named reviewer persona, product-relevant detail, no AI telltales. Q&A has: search field at top, brand vs community answer distinction, zero-question handling (hide section). Review card template has: Stars + Bold Headline -> Reviewer Attributes -> Pros/Cons -> Body + Verified Buyer badge + Time Owned.

### Layer 3: Social Proof Audit

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: Social Proof Volume Audit | Verify minimum review counts, star distribution realism, coverage | volume-audit.md |
| 3.2: Specificity Check | Verify all generated reviews have measurable outcomes, not vague praise | specificity-check.md |
| 3.3: Badge Verification | Verify Verified Buyer + Time Owned present on every review card | badge-verification.md |
| 3.4: Anti-Slop Check | Verify zero AI-telltale language in all generated content | anti-slop-check.md |

**GATE_3:** Social proof audit score >= 7.0/10 AND all reviews pass specificity check AND all cards have required badges AND anti-slop passes.

### Layer 4: Package Assembly

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Social Proof Package Compiler | Assemble pdp-social-proof-system.json with all systems | pdp-social-proof-system.json |
| 4.2: Summary Writer | Write PDP-SOCIAL-PROOF-SUMMARY.md | PDP-SOCIAL-PROOF-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## BAYMARD REVIEW SYSTEM REQUIREMENTS (Mandatory)

These are non-negotiable UX requirements from Baymard research. Every review system must include ALL of these.

### 1. Review Histogram (Mandatory)

| Requirement | Specification |
|------------|---------------|
| Display | Horizontal bar chart showing star distribution (5-star at top, 1-star at bottom) |
| Interaction | Each bar is TAPPABLE — tapping filters reviews to that star rating |
| Labels | Star count on left, bar in middle, review count on right |
| Position | Above the review list, below the aggregate rating |
| Empty states | Bars with 0 reviews still display (grayed out, not hidden) |

### 2. UGC Photo Strip (Mandatory)

| Requirement | Specification |
|------------|---------------|
| Position | ABOVE text reviews, below histogram |
| Layout | Horizontal scrollable strip of customer-submitted photos |
| Interaction | Tap any photo -> full-screen gallery overlay with swipe navigation |
| Diversity | Show photos from multiple customers, not repeated from one reviewer |
| Fallback | If no UGC photos available, omit section entirely (do not show placeholder) |

### 3. Keyword Filter Chips (Mandatory)

| Requirement | Specification |
|------------|---------------|
| Count | 5-8 chips |
| Content | Product-relevant topics ("Taste," "Shipping," "Texture," "Results," "Value," etc.) |
| Position | Below histogram, above review cards |
| Interaction | Tap to filter reviews containing that keyword. Toggle on/off. Multi-select allowed. |
| Active state | Filled background when active, outline when inactive |
| Source | Derived from actual review content keyword frequency, NOT generic labels |

### 4. Review Loading (Mandatory)

| Requirement | Specification |
|------------|---------------|
| Mechanism | "Load More" button at bottom of visible reviews |
| Batch size | 15-30 reviews per load |
| FORBIDDEN | Pagination (numbered pages) — disrupts mobile scroll flow |
| FORBIDDEN | Infinite scroll — causes performance issues and disorientation |
| Sort default | "Most Relevant" (not newest) — relevance considers helpfulness votes + recency + specificity |
| Sort options | Most Relevant, Newest, Highest Rated, Lowest Rated |

### 5. Verified Buyer Badge (Mandatory)

| Requirement | Specification |
|------------|---------------|
| Display | "Verified Buyer" badge next to reviewer name |
| Rule | Only on reviews from confirmed purchasers (order ID validated) |
| Position | Reviewer name line, after name and before date |

### 6. Time Owned (Mandatory)

| Requirement | Specification |
|------------|---------------|
| Display | "Owned for X months" or "Purchased X weeks ago" below reviewer name |
| Purpose | Signals long-term use credibility vs day-1 reviews |
| Format | Relative time (weeks/months), not absolute date |

### 7. Review Card Template (Mandatory)

```
[Stars: 1-5 filled/empty] + [Bold Headline: 1-line summary]
[Reviewer Name] | [Verified Buyer badge] | [Time Owned] | [Location optional]
[Reviewer Attributes: Age range, skin type, etc. — product-specific]
---
[Pros: bullet list]
[Cons: bullet list]
---
[Body: 2-5 sentences with specific experience]
---
[Helpful? Yes (count) / No (count)]
[Merchant Response: if rating <= 3 stars]
```

### 8. Merchant Response (Mandatory for <= 3 stars)

| Requirement | Specification |
|------------|---------------|
| Trigger | Any review rated 3 stars or below |
| Format | Indented response below review body, branded with company name |
| Tone | Empathetic, solution-oriented, NOT defensive |
| Content | Acknowledge concern + offer resolution + contact info |

### 9. "Write a Review" (De-emphasized)

| Requirement | Specification |
|------------|---------------|
| Format | Small text link, NOT a prominent button |
| Position | Top-right of reviews section or below last loaded review |
| Purpose | Available but not competing with review reading flow |

### 10. Q&A Section (Conditional)

| Requirement | Specification |
|------------|---------------|
| Search | Keyword search field at TOP of Q&A section (search-first pattern) |
| Answer types | Brand answer (official, badged) vs Community answer (other customers) |
| Zero state | If 0 questions exist, HIDE the entire Q&A section (do not show empty state) |
| Ask button | "Ask a Question" de-emphasized (small link, not button) |

---

## REVIEW STAR DISTRIBUTION REALISM TABLE

Generated review distributions must follow realistic patterns. Fake-looking distributions destroy trust.

| Product Quality Signal | 5-star | 4-star | 3-star | 2-star | 1-star | Avg Rating |
|----------------------|--------|--------|--------|--------|--------|-----------|
| Excellent product | 55-65% | 20-25% | 8-12% | 3-5% | 2-4% | 4.3-4.6 |
| Good product | 40-50% | 25-30% | 12-18% | 5-8% | 3-6% | 4.0-4.3 |
| Average product | 25-35% | 25-30% | 20-25% | 10-15% | 5-10% | 3.5-4.0 |

**FORBIDDEN:** 95%+ five-star distribution (looks fake), 0% one-star (looks censored), uniform distribution (looks generated).

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model |
|-------|------|-------|
| 0 | Input loading + reference loading | haiku |
| 1.1-1.2 | Review system + UGC architecture | opus |
| 1.3-1.4 | Histogram + filter specs | sonnet |
| 2.1 | Featured review generation | opus |
| 2.2-2.3 | Keyword topics + reviewer personas | sonnet |
| 2.4 | Q&A section architecture | opus |
| 2.5 | Review card template | sonnet |
| 3.1-3.4 | Audits + checks | sonnet |
| 4 | Package assembly | haiku |

---

## FORBIDDEN BEHAVIORS

1. ❌ Running PDP-05 for a Type A page — use LP-05 + LP-10 instead
2. ❌ Review pagination (numbered pages) — must use "Load More" button per Baymard
3. ❌ Infinite scroll for reviews — causes disorientation and performance issues
4. ❌ Missing review histogram — the histogram with tappable bars is mandatory
5. ❌ Histogram bars that are NOT tappable — each bar must filter to that star rating
6. ❌ Generic keyword filter labels ("Quality," "Great") — chips must be product-specific ("Taste," "Texture," "Shipping")
7. ❌ Reviews without Verified Buyer badge — every review card must include badge status
8. ❌ Reviews without Time Owned — "Owned for X months" is mandatory credibility signal
9. ❌ Prominent "Write a Review" button — must be de-emphasized small text link
10. ❌ Q&A section displayed with 0 questions — hide entirely if empty
11. ❌ Q&A without search field at top — search-first pattern is mandatory
12. ❌ AI-telltale language in generated reviews ("revolutionary," "game-changing," "I was skeptical but," "exceeded my expectations")
13. ❌ Fake-looking star distributions (95%+ five-star, 0% one-star, uniform)
14. ❌ No merchant response on 3-star-and-below reviews — must spec empathetic response template
15. ❌ UGC photos below text reviews — photo strip must be ABOVE review cards
16. ❌ Review card without Pros/Cons structure — every card needs structured feedback
17. ❌ Proceeding to package assembly with audit score below 7.0
