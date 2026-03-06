# PDP-16: PDP Mobile + Conversion Audit — Master Agent

> **Version:** 1.0
> **Skill:** PDP-16-mobile-conversion-audit
> **Position:** Phase 4 — PDP Quality Gate (replaces LP-16 + LP-17 for Type B / Hybrid)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-15 (assembled page output), PDP-03 through PDP-07 outputs, PDP-BEST-PRACTICES-REFERENCE.md
> **Output:** `pdp-audit-report.json` + `PDP-AUDIT-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Audit the fully assembled PDP page against Baymard Institute best practices across 8 mobile UX / conversion dimensions. For PDP, mobile UX and conversion are inseparable — Baymard's research sections are ALL mobile UX patterns that directly impact conversion. A bad carousel kills conversion. A dropdown variant selector kills conversion. A missing sticky ATC kills conversion. There is no "mobile audit" separate from "conversion audit" on a PDP.

**Why this replaces LP-16 + LP-17 for PDP:**
LP-16 (Mobile/Speed Audit) evaluates 7 generic mobile dimensions. LP-17 (Conversion Audit) evaluates 20 conversion points. Neither knows about carousel thumbnails vs dots, buy box chip selectors vs dropdowns, review histogram tappability, or sticky ATC trigger points. PDP-16 audits the 8 Baymard sections that matter for PDP mobile conversion, scoring each against specific Baymard research findings with documented statistics.

**The 8 Baymard Audit Sections:**
1. Image Gallery / Carousel
2. Buy Box / Purchase Interface
3. Product Information
4. BTF Section Quality
5. Social Proof System
6. Navigation / Sticky Elements
7. Mobile Performance
8. Conversion Flow

**This is the quality gate for the entire PDP build.** No PDP should proceed to LP-18 (A/B Test Plan) without passing this audit. A low score here means the upstream skills (PDP-03 through PDP-07) produced work that will underperform on mobile — the device where 70%+ of ecommerce traffic lands.

**Success Criteria:**
- All 8 Baymard sections audited with per-criterion pass/fail
- Composite weighted score calculated
- All failed/partial items ranked by conversion impact x fix effort
- pdp-audit-report.json assembled with structured data
- PDP-AUDIT-SUMMARY.md written for human review
- Composite score >= 7.0/10 to proceed to LP-18

---

## IDENTITY

**This skill IS:**
- The final quality gate for PDP page assembly before A/B test planning
- The Baymard compliance validator — every finding traced to specific research
- The mobile-first conversion auditor — 70%+ of ecommerce traffic is mobile
- The prioritized optimization recommender — not just "what's wrong" but "fix this first"

**This skill is NOT:**
- LP-16 or LP-17 — those are for Type A pages. PDP-16 is purpose-built for Type B / Hybrid.
- A visual design auditor — it audits structural and UX patterns, not pixel-level aesthetics
- A copy quality checker — PDP-07 and the CopywritingEngine handle copy quality
- A page speed test tool — it estimates performance from specifications, it does not run Lighthouse

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Load upstream packages + reference docs
  -> 0.1: Assembled Page Loader (LP-15 output, verify PDP route)
  -> 0.2: PDP Reference Loader (PDP-BEST-PRACTICES-REFERENCE.md)
  -> 0.3: Benchmark Loader (conversion-data-reference.md)
  | [GATE_0: LP-15 output loaded? Page type = type_b or hybrid? Reference docs loaded?]
LAYER_1: Audit Scope Configuration
  -> 1.1: PDP Audit Criteria Builder (8 Baymard sections -> per-criterion checklist)
  -> 1.2: Weight Assignment (impact weights per section from Baymard conversion data)
  | [GATE_1: All 8 sections have criteria? Weights sum to 100%?]
LAYER_2: Audit Execution (8 parallel audits)
  -> 2.1: Image Gallery Audit
  -> 2.2: Buy Box Audit
  -> 2.3: Product Information Audit
  -> 2.4: BTF Section Audit
  -> 2.5: Social Proof Audit
  -> 2.6: Navigation Audit
  -> 2.7: Mobile Performance Audit
  -> 2.8: Conversion Flow Audit
  | [GATE_2: All 8 audit files written? Each has per-criterion PASS/FAIL?]
LAYER_3: Scoring + Prioritization
  -> 3.1: Per-Section Scoring (0-10 per section)
  -> 3.2: Composite Score Calculator (weighted composite)
  -> 3.3: Priority Ranking (failed items ranked by impact x effort)
  | [GATE_3: Composite score calculated? Priority ranking complete?]
LAYER_4: Package Assembly
  -> 4.1: Audit Report Compiler (pdp-audit-report.json)
  -> 4.2: Summary Writer (PDP-AUDIT-SUMMARY.md)
  -> 4.3: Log Writer (execution-log.md)
  |
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

| Microskill | Purpose | Output | Model |
|-----------|---------|--------|-------|
| 0.1: Assembled Page Loader | Load LP-15 assembled page output, verify PDP route | assembled-page-load.md | haiku |
| 0.2: PDP Reference Loader | Load PDP-BEST-PRACTICES-REFERENCE.md (full Baymard checklist) | pdp-reference-load.md | haiku |
| 0.3: Benchmark Loader | Load conversion-data-reference.md for industry benchmarks | benchmark-load.md | haiku |

**GATE_0:** LP-15 output loaded AND page type = `type_b` or `hybrid`. PDP-BEST-PRACTICES-REFERENCE.md loaded (all 8 Baymard sections). conversion-data-reference.md loaded. If page type = `type_a` -> HALT: use LP-16 + LP-17 instead.

### Layer 1: Audit Scope Configuration

| Microskill | Purpose | Output | Model |
|-----------|---------|--------|-------|
| 1.1: PDP Audit Criteria Builder | Build audit checklist from 8 Baymard sections with specific pass/fail criteria | pdp-audit-criteria.md | sonnet |
| 1.2: Weight Assignment | Assign conversion impact weights per section based on Baymard data | weight-assignment.md | sonnet |

**GATE_1:** All 8 sections have enumerated criteria. Weights assigned to all 8 sections. Weights sum to 100%. Each criterion has a specific pass/fail definition (not vague).

### Layer 2: Audit Execution

| Microskill | Purpose | Output | Model |
|-----------|---------|--------|-------|
| 2.1: Image Gallery Audit | Thumbnails, zoom, in-scale, overlay, back-button, video | image-gallery-audit.md | sonnet |
| 2.2: Buy Box Audit | Full 10-point buy box check from PDP-03 | buy-box-audit.md | sonnet |
| 2.3: Product Information Audit | Title, short description, facts panel | product-info-audit.md | sonnet |
| 2.4: BTF Section Audit | Scannability, module independence, proof density | btf-section-audit.md | sonnet |
| 2.5: Social Proof Audit | Review histogram, filters, UGC, load more, badges, card template | social-proof-audit.md | sonnet |
| 2.6: Navigation Audit | Sticky ATC, header behavior, breadcrumbs, back-button | navigation-audit.md | sonnet |
| 2.7: Mobile Performance Audit | Touch targets, font sizes, image optimization, load time, viewport fit | mobile-performance-audit.md | sonnet |
| 2.8: Conversion Flow Audit | Cart path, express payments, dead ends, error states | conversion-flow-audit.md | sonnet |

**GATE_2:** All 8 audit output files exist. Each file contains per-criterion PASS/FAIL with evidence. No criterion left unscored.

### Layer 3: Scoring + Prioritization

| Microskill | Purpose | Output | Model |
|-----------|---------|--------|-------|
| 3.1: Per-Section Scoring | Score each of 8 sections 0-10, with per-criterion pass/fail roll-up | per-section-scores.md | sonnet |
| 3.2: Composite Score Calculator | Weighted composite from all 8 sections using Layer 1 weights | composite-score.md | sonnet |
| 3.3: Priority Ranking | Rank all failed/partial items by conversion impact x fix effort | priority-ranking.md | opus |

**GATE_3:** Composite score calculated. Priority ranking includes every FAIL item. If composite score < 7.0 -> FLAG for revision (do not halt — complete audit and report, but flag the score).

### Layer 4: Package Assembly

| Microskill | Purpose | Output | Model |
|-----------|---------|--------|-------|
| 4.1: Audit Report Compiler | Assemble pdp-audit-report.json | pdp-audit-report.json | haiku |
| 4.2: Summary Writer | Write PDP-AUDIT-SUMMARY.md (executive summary) | PDP-AUDIT-SUMMARY.md | haiku |
| 4.3: Log Writer | Write execution-log.md | execution-log.md | haiku |

---

## 8 BAYMARD AUDIT SECTIONS

### Section 1: Image Gallery / Carousel
| Criterion | Baymard Finding | Pass Condition |
|-----------|----------------|----------------|
| Thumbnails (not dots) | 50-80% of users miss content when only dots are used | Thumbnails visible below main image |
| Pinch-to-zoom support | 40% of mobile users fail at gesture controls without proper implementation | Both double-tap AND pinch supported |
| In-scale image | Users lose sense of scale on 6-inch screens | At least 1 image showing product relative to everyday object |
| Gallery overlay | Carousel for browsing; overlay for inspecting | Tap main image -> full-screen dark overlay with swipe + deep zoom |
| Back-button behavior | Users hit browser back to close overlay -> leaves PDP | Back button hijacked to close overlay only |
| Video integration | Users expect to see product in motion | At least 1 video in carousel with prominent play icon |

### Section 2: Buy Box / Purchase Interface
| Criterion | Baymard Finding | Pass Condition |
|-----------|----------------|----------------|
| Full product title | Users confirm correct variation via title | Title never truncated, 3 lines OK |
| Rating strip anchor | Users want to verify why not 5 stars | Stars + count = anchor link to reviews |
| Price with savings | Users don't do mental math on mobile | Savings shown as BOTH % and $ |
| Shipping proximity | Users combine price + shipping for value | Shipping cost/status visible near price |
| Variant chips | Dropdowns = 3+ taps, hide options -> 60% more friction | Exposed chips, NOT dropdowns |
| Subscription tiles | Sneaky subscriptions = top cause of cart abandonment | Selectable tiles, NOT pre-selected |
| Quantity stepper | Dropdowns = high interaction cost, 90% want "1" | Stepper (+/-), NOT dropdown |
| ATC full-width | Standard "Add to Cart" label | Full-width button, standard label |
| Post-click mini-cart | Cart redirect interrupts shopping flow | Slide-out mini-cart, NOT cart redirect |
| Micro-trust signals | Last-second anxieties right before ATC tap | 3-4 signals in small gray text below ATC |

### Section 3: Product Information
| Criterion | Pass Condition |
|-----------|----------------|
| Title not truncated | Full product title displayed, never clipped |
| Short description specific | 3-5 bullet KSPs, not generic claims |
| Facts panel present | Supplement/nutrition facts visible (for applicable products) |
| Ingredient naming | "X for Y" format (e.g., "Lion's Mane for Focus") |

### Section 4: BTF Section Quality
| Criterion | Pass Condition |
|-----------|----------------|
| Section scannability | Each section digestible at a glance (headers, bullets, short blocks) |
| Module independence | Each section works standalone (does not require reading prior section) |
| Proof density met | Minimum proof elements per section per PDP-04 spec |
| No dead weight | Every section has a clear conversion purpose |

### Section 5: Social Proof System
| Criterion | Pass Condition |
|-----------|----------------|
| Review histogram | Bar chart at top of reviews, bars tappable to filter |
| Keyword filters | 5-8 keyword chips above reviews |
| UGC positioning | Customer photos/videos above text reviews |
| Load More (not pagination) | "Load More" button, not page numbers or infinite scroll |
| Verified buyer badges | Verified buyer badge on review cards |
| Review card template | Stars + headline + attributes + body + verified badge |

### Section 6: Navigation / Sticky Elements
| Criterion | Baymard Finding | Pass Condition |
|-----------|----------------|----------------|
| Sticky ATC trigger | Pages 4-10x viewport length on mobile -> sticky ATC mandatory | Sticky footer bar appears when main ATC scrolls out of view |
| Header behavior | Header must not obscure content | Header collapses or is minimal on scroll |
| Breadcrumbs | Users need orientation | Breadcrumbs present above title |
| Back-button behavior | Must not trap users | Back button works correctly throughout page |

### Section 7: Mobile Performance
| Criterion | Pass Condition |
|-----------|----------------|
| Touch targets | All interactive elements >= 44x44px |
| Font sizes | Body >= 14px, headlines >= 20px, no auto-zoom triggers |
| Image optimization | Images specify responsive sizing, lazy loading for BTF |
| Viewport fit | No horizontal scroll at 375px width |

### Section 8: Conversion Flow
| Criterion | Pass Condition |
|-----------|----------------|
| Cart path | ATC -> mini-cart -> checkout (no dead ends) |
| Express payments | Below ATC with OR divider, one row of logos |
| Error states | Out-of-stock variant handling, quantity limits, payment errors specified |
| No dead ends | Every page state has a clear next action |

---

## SCORING METHODOLOGY

### Per-Section Score (0-10)
Each section is scored based on the percentage of criteria passed:
- 100% pass = 10.0
- 80-99% pass = 8.0-9.9 (proportional)
- 60-79% pass = 6.0-7.9 (proportional)
- Below 60% pass = proportional score below 6.0

### Composite Score
Weighted average of all 8 section scores using Layer 1 weights.

### Default Weight Distribution (adjustable in 1.2)
| Section | Default Weight | Rationale |
|---------|---------------|-----------|
| Image Gallery | 12% | 50-80% of users miss content with dots. Carousel is PDP conversion driver. |
| Buy Box | 25% | 80% of purchase decision happens here. Most criteria, highest impact. |
| Product Information | 10% | Supporting role to buy box. Title/description/facts. |
| BTF Sections | 10% | Hunt-and-peck reassurance. Important but secondary to above-fold. |
| Social Proof | 15% | Reviews are the #2 conversion driver after buy box. |
| Navigation / Sticky | 10% | Sticky ATC is mandatory for long pages. Critical for mobile. |
| Mobile Performance | 10% | Touch targets and font sizes prevent basic usability failures. |
| Conversion Flow | 8% | Cart path and error states. Critical but often handled by platform. |

### Composite Thresholds
- 9.0-10.0: Exceptional — proceed to LP-18
- 7.0-8.9: Good — proceed to LP-18 with notes
- 5.0-6.9: Needs revision — FLAG for upstream skill rework before LP-18
- Below 5.0: Structural issues — HALT, major rework required

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model |
|-------|------|-------|
| 0 | Input loading + reference loading | haiku |
| 1.1 | Audit criteria building | sonnet |
| 1.2 | Weight assignment | sonnet |
| 2.1-2.8 | Audit execution (8 sections) | sonnet |
| 3.1 | Per-section scoring | sonnet |
| 3.2 | Composite score calculation | sonnet |
| 3.3 | Priority ranking (conversion impact x fix effort) | opus |
| 4 | Package assembly | haiku |

---

## FORBIDDEN BEHAVIORS

1. Running PDP-16 for a Type A page — use LP-16 + LP-17 instead
2. Auditing without loading PDP-BEST-PRACTICES-REFERENCE.md — every finding must trace to Baymard research
3. Using generic mobile audit criteria from LP-16 — PDP-16 has PDP-specific criteria (carousel, buy box, review system)
4. Scoring without evidence — every PASS/FAIL must cite specific assembled page content
5. Inventing Baymard statistics — use only the statistics in PDP-BEST-PRACTICES-REFERENCE.md
6. Skipping a section because "it looks fine" — every criterion in every section must be evaluated
7. Giving a passing score to a page with dropdown variant selectors — this is an automatic buy box FAIL
8. Giving a passing score to a page with dot-only carousel navigation — this is an automatic image gallery FAIL
9. Proceeding without writing all 8 Layer 2 audit files — each section audit produces its own file
10. Combining multiple section audits into a single file — each of the 8 sections gets its own output file
11. Rating an unspecified criterion as PASS — if the assembled page does not specify a behavior, it is UNSPECIFIED (treated as FAIL for scoring)
12. Skipping the priority ranking — fixing in the right order matters as much as finding the problems
