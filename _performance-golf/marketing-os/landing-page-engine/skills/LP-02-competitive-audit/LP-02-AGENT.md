# LP-02: Competitive Page Audit — Master Agent

> **Version:** 1.0
> **Skill:** LP-02-competitive-audit
> **Position:** Phase 1 — Intelligence & Classification (runs after LP-01 Conversion Intelligence)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** `page-brief.json` (LP-00), `conversion-intelligence.json` (LP-01, if available), competitor URLs (user-provided or LP-01-sourced)
> **Output:** `competitive-audit.json` + `COMPETITIVE-AUDIT-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Analyze 3-5 competitor or reference landing pages in the vertical. Map their element order, proof strategy, CTA architecture, and offer framing. Identify what is saturated (table stakes) versus what is differentiated (opportunity). Produce a structured competitive audit that informs all downstream architecture and writing skills.

**This skill is unique in the Landing Page Engine:** It uses Firecrawl MCP for live competitor page scraping DURING EXECUTION. The agent accepts competitor URLs, scrapes each page in real-time, and analyzes the scraped content against the 40-element taxonomy from element-taxonomy.md.

**Success Criteria:**
- Minimum 3 competitor pages successfully scraped and analyzed (target: 5)
- Every competitor page mapped against the element taxonomy with element presence, position, and function
- Proof strategy, CTA architecture, and offer framing analyzed for EACH competitor — not summarized across competitors
- Cross-page synthesis identifies universal patterns (saturated), unique differentiators, and gaps/opportunities
- Zero fabricated content — every finding must trace to scraped page data
- Page type classification for each competitor (Type A / Type B / Hybrid) with explicit rationale

---

## IDENTITY

**This skill IS:**
- A competitive intelligence tool that scrapes and analyzes real competitor pages
- An element mapping engine that catalogs WHAT competitors use and WHERE they place it
- A pattern detector that identifies saturation (everyone does X) vs. differentiation (only they do Y)
- A strategic input that feeds architecture skills (LP-03, LP-04, LP-05, LP-06) with competitive context

**This skill is NOT:**
- A copywriter — it analyzes competitor copy but does not write new copy
- A copy thief — it identifies PATTERNS to adapt, not specific copy to steal
- A page builder — it informs architecture decisions but does not make them
- A quality judge — it maps what competitors DO, not whether they do it WELL (that is LP-17's job)

**Upstream:** LP-00 provides the brief (vertical, page type, audience). LP-01 provides conversion intelligence (benchmarks, competitor URLs if collected).
**Downstream:** Feeds `competitive-audit.json` to LP-03 (Above-Fold Architecture), LP-04 (Section Sequence), LP-05 (Social Proof Architecture), LP-06 (Offer/CTA Architecture). All architecture skills use competitive audit data to make informed structural decisions.

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Input Loading
  -> 0.1: Load page brief (from LP-00)
  -> 0.2: Load conversion intelligence (from LP-01, if available)
  -> 0.3: Collect competitor URLs (from user input, LP-01, or Firecrawl search)
  | [GATE_0: Page brief loaded AND at least 3 competitor URLs collected?]
LAYER_1: Competitor Scraping
  -> 1.1: Scrape each competitor URL via Firecrawl (markdown + structured extraction)
  -> 1.2: Validate scraped content quality (minimum 3 successful scrapes confirmed)
  | [GATE_1: At least 3 pages successfully scraped with usable content?]
LAYER_2: Analysis (the core evaluation layer)
  -> 2.1: Element Mapper (map each page against 40-element taxonomy)
  -> 2.2: Proof Strategy Analyzer (proof types, placement, density, first-proof position)
  -> 2.3: CTA Architecture Analyzer (count, positions, button text, appeals, supporting copy)
  -> 2.4: Offer Framing Analyzer (pricing, value stack, guarantee, urgency, bundles)
  -> 2.5: Differentiation Synthesizer (cross-page: saturated, unique, gaps, opportunities)
  | [GATE_2: All 5 analysis dimensions completed for each competitor?]
LAYER_3: Validation
  -> 3.1: Coverage Validator (all 5 dimensions complete for every competitor)
  -> 3.2: Competitive Insights Ranker (rank by strategic value)
  | [GATE_3: Coverage validated AND insights ranked?]
LAYER_4: Package Assembly
  -> 4.1: Compile competitive-audit.json
  -> 4.2: Write COMPETITIVE-AUDIT-SUMMARY.md (human-readable)
  -> 4.3: Write execution-log.md
  |
COMPLETE
```

---

## MODEL ASSIGNMENT TABLE

| Layer | Microskill | Model | Rationale |
|-------|-----------|-------|-----------|
| 0 | 0.1 Brief Loader | haiku | File loading, no judgment |
| 0 | 0.2 Intelligence Loader | haiku | File loading, no judgment |
| 0 | 0.3 Competitor URL Collector | haiku | URL collection, no judgment |
| 1 | 1.1 Page Scraper | sonnet | Firecrawl orchestration, error handling, retry logic |
| 1 | 1.2 Scrape Validator | sonnet | Content quality assessment, minimum threshold validation |
| 2 | 2.1 Element Mapper | opus | Critical judgment — mapping elements against taxonomy, assessing function served |
| 2 | 2.2 Proof Strategy Analyzer | opus | Critical judgment — evaluating proof architecture, density, placement patterns |
| 2 | 2.3 CTA Architecture Analyzer | opus | Critical judgment — evaluating CTA strategy, emotional appeals, supporting copy |
| 2 | 2.4 Offer Framing Analyzer | opus | Critical judgment — evaluating pricing psychology, value stacking, guarantee strategy |
| 2 | 2.5 Differentiation Synthesizer | opus | Critical judgment — cross-page synthesis, pattern identification, strategic insight |
| 3 | 3.1 Coverage Validator | sonnet | Validation check, no creative judgment |
| 3 | 3.2 Competitive Insights Ranker | sonnet | Sorting + strategic ranking |
| 4 | 4.1 Audit Compiler | haiku | JSON assembly |
| 4 | 4.2 Summary Writer | sonnet | Markdown formatting with strategic framing |
| 4 | 4.3 Log Writer | haiku | Execution logging |

**POSITIONAL REINFORCEMENT — READ THIS AT EVERY LAYER ENTRY:**
> You are LP-02, the Competitive Page Audit. You SCRAPE, MAP, and ANALYZE competitor pages. You do NOT write copy, design pages, or make architecture decisions. Every finding must trace to scraped page data. You identify PATTERNS to adapt — never specific copy to steal. Gates are PASS or FAIL — nothing else. Minimum 3 competitors analyzed, all 5 dimensions per competitor.

---

## LAYER DETAILS

### Layer 0: Input Loading

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 0.1 | Brief Loader | `skills/layer-0/0.1-brief-loader.md` | Load the page brief from LP-00 (vertical, page type, audience, product) | `page-brief.json` path | `brief-load.md` | haiku |
| 0.2 | Intelligence Loader | `skills/layer-0/0.2-intelligence-loader.md` | Load conversion intelligence from LP-01 (benchmarks, any competitor URLs already identified) | `conversion-intelligence.json` path | `intelligence-load.md` | haiku |
| 0.3 | Competitor URL Collector | `skills/layer-0/0.3-competitor-url-collector.md` | Collect 3-5 competitor URLs from user input, LP-01 data, or Firecrawl search | User input + `intelligence-load.md` | `competitor-urls.md` | haiku |

**GATE_0:** Page brief loaded AND at least 3 competitor URLs collected and confirmed. If fewer than 3 URLs available -> HALT with message: "LP-02 requires at least 3 competitor URLs to proceed. Provide URLs or run LP-01 to identify competitors."

### Layer 1: Competitor Scraping

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 1.1 | Page Scraper | `skills/layer-1/1.1-page-scraper.md` | Scrape each competitor URL via Firecrawl MCP — two passes per URL: full markdown content + structured extraction | `competitor-urls.md` | `scrape-[1-5].md` (one per competitor) | sonnet |
| 1.2 | Scrape Validator | `skills/layer-1/1.2-scrape-validator.md` | Validate scraped content quality, flag incomplete scrapes, confirm minimum 3 usable pages | All `scrape-[n].md` files | `scrape-validation.md` | sonnet |

**GATE_1:** At least 3 competitor pages successfully scraped with usable content (headline extractable, section structure identifiable, CTA text present). If fewer than 3 usable scrapes -> attempt re-scrape of failed URLs with extended waitFor. If still fewer than 3 -> HALT with message: "LP-02 requires at least 3 successful scrapes. [N] of [M] URLs returned usable content."

### Layer 2: Analysis

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 2.1 | Element Mapper | `skills/layer-2/2.1-element-mapper.md` | Map each page's elements against the 40-element taxonomy from element-taxonomy.md | All valid `scrape-[n].md` files, element-taxonomy.md | `element-map.md` | opus |
| 2.2 | Proof Strategy Analyzer | `skills/layer-2/2.2-proof-strategy-analyzer.md` | Analyze each page's proof architecture: types, placement, density, first-proof position, proof-to-copy ratio | All valid `scrape-[n].md` files, `element-map.md` | `proof-strategy-analysis.md` | opus |
| 2.3 | CTA Architecture Analyzer | `skills/layer-2/2.3-cta-architecture-analyzer.md` | Analyze each page's CTA strategy: count, positions, button text, emotional appeals, supporting copy, sticky elements | All valid `scrape-[n].md` files, `element-map.md` | `cta-architecture-analysis.md` | opus |
| 2.4 | Offer Framing Analyzer | `skills/layer-2/2.4-offer-framing-analyzer.md` | Analyze each page's offer presentation: pricing display, value stack, guarantee, urgency/scarcity, bundle strategy | All valid `scrape-[n].md` files, `element-map.md` | `offer-framing-analysis.md` | opus |
| 2.5 | Differentiation Synthesizer | `skills/layer-2/2.5-differentiation-synthesizer.md` | Cross-page synthesis: universal patterns, unique differentiators, gaps/opportunities, recommended patterns, patterns to avoid | All Layer 2 analysis files | `differentiation-synthesis.md` | opus |

**GATE_2:** All 5 analysis files exist. Every competitor has: element map, proof strategy analysis, CTA architecture analysis, offer framing analysis. Differentiation synthesis references all competitors. If any analysis dimension is missing for any competitor -> HALT, complete the missing analysis.

### Layer 3: Validation

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 3.1 | Coverage Validator | `skills/layer-3/3.1-coverage-validator.md` | Validate all 5 analysis dimensions are complete for each competitor page | All Layer 2 outputs | `coverage-validation.md` | sonnet |
| 3.2 | Competitive Insights Ranker | `skills/layer-3/3.2-competitive-insights-ranker.md` | Rank insights by strategic value: differentiation opportunity, pattern to replicate, pattern to avoid | `differentiation-synthesis.md`, `coverage-validation.md` | `insights-ranking.md` | sonnet |

**GATE_3:** Coverage validation passes for all competitors across all 5 dimensions. Insights ranked by strategic value with clear rationale for each ranking.

### Layer 4: Package Assembly

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 4.1 | Audit Compiler | `skills/layer-4/4.1-audit-compiler.md` | Compile all analysis into competitive-audit.json | All Layer 2 + Layer 3 outputs | `competitive-audit.json` | haiku |
| 4.2 | Summary Writer | `skills/layer-4/4.2-summary-writer.md` | Write human-readable COMPETITIVE-AUDIT-SUMMARY.md | `competitive-audit.json`, `insights-ranking.md` | `COMPETITIVE-AUDIT-SUMMARY.md` | sonnet |
| 4.3 | Log Writer | `skills/layer-4/4.3-log-writer.md` | Write execution-log.md | All outputs | `execution-log.md` | haiku |

---

## GATE CONDITIONS DETAIL

### GATE_0 (Inputs Collected)
**PASS:** `brief-load.md` exists with parseable page brief data AND `competitor-urls.md` exists with at least 3 confirmed URLs.
**FAIL:** Brief missing or fewer than 3 URLs. Action: HALT with message identifying what is missing. If brief is missing, run LP-00 first. If URLs are insufficient, prompt user for additional URLs or use Firecrawl search to discover competitors.

### GATE_1 (Scrapes Successful)
**PASS:** At least 3 `scrape-[n].md` files exist with usable content (headline text extractable, multiple sections identifiable, at least one CTA found).
**FAIL:** Fewer than 3 usable scrapes. Action: Re-scrape failed URLs with extended `waitFor: 10000`. If still failing, try `firecrawl_agent` for resistant pages. If fewer than 3 remain after retries, HALT.

### GATE_2 (Analysis Complete)
**PASS:** All 5 analysis files exist. Each competitor has data in all 5 analysis dimensions. Differentiation synthesis cross-references all analyzed competitors.
**FAIL:** Missing analysis for any competitor or any dimension. Action: Return to the incomplete analysis microskill.

### GATE_3 (Validation Passes)
**PASS:** `coverage-validation.md` confirms 100% coverage. `insights-ranking.md` has ranked insights with rationale.
**FAIL:** Coverage gaps found. Action: Return to Layer 2, complete the missing analysis.

---

## OUTPUT SCHEMA

### competitive-audit.json

```json
{
  "schema_version": "1.0",
  "skill_id": "LP-02",
  "created": "[ISO timestamp]",
  "project_name": "[from page-brief.json]",
  "target_page_type": "[type_a | type_b | hybrid]",
  "target_vertical": "[from page-brief.json]",
  "competitors_analyzed": "[3-5]",

  "competitors": [
    {
      "competitor_id": "C1",
      "url": "[scraped URL]",
      "brand": "[brand name]",
      "page_type": "[type_a | type_b | hybrid]",
      "platform_detected": "[shopify | clickfunnels | wordpress | framer | custom | unknown]",
      "scrape_quality": "[full | partial | minimal]",

      "element_map": {
        "total_elements_detected": "[count]",
        "sections_detected": "[count]",
        "elements": [
          {
            "element_name": "[from taxonomy]",
            "taxonomy_category": "[attention | trust | proof | education | conversion | offer | navigation | brand_story | capture]",
            "present": true,
            "position": "[above_fold | early | mid | late | footer]",
            "section_number": "[1-N]",
            "approximate_word_count": "[count]",
            "function_served": "[1-sentence description of what this element does on THIS page]",
            "verbatim_sample": "[short quote from the element, if available]"
          }
        ]
      },

      "proof_strategy": {
        "proof_density": "[zero | low | medium | high | extreme]",
        "first_proof_position": "[above_fold | section_2 | section_3 | mid_page | late | none]",
        "proof_types": [
          {
            "type": "[customer_reviews | video_testimonials | celebrity_endorsements | expert_authority | stat_claims | trust_badges | scientific_citations | performance_guarantee | case_studies | third_party_widget | screenshot_testimonials]",
            "count": "[number]",
            "placement": "[where on page]",
            "specificity": "[high | medium | low]",
            "sample": "[representative example]"
          }
        ],
        "proof_to_copy_ratio": "[estimated percentage of page dedicated to proof]",
        "proof_architecture_summary": "[2-3 sentence summary of overall proof strategy]"
      },

      "cta_architecture": {
        "cta_count": "[number]",
        "cta_instances": [
          {
            "position": "[above_fold | section_N | sticky | footer]",
            "button_text": "[exact text]",
            "emotional_appeal": "[action | urgency | value | curiosity | social | fear]",
            "supporting_copy": "[text near the CTA that supports the action]",
            "risk_reversal_attached": "[Y/N — guarantee text near CTA?]"
          }
        ],
        "cta_text_consistency": "[consistent | varying]",
        "sticky_cta": "[Y/N]",
        "cta_architecture_summary": "[2-3 sentence summary of CTA strategy]"
      },

      "offer_framing": {
        "pricing_display": "[above_fold | below_fold | hidden | application_required]",
        "pricing_model": "[one_time | subscription | trial | bundle_tiers | freemium | demo_required]",
        "price_anchoring": "[crossed_price | per_unit | savings_display | value_comparison | none]",
        "value_stack": "[Y/N — if Y, count items]",
        "guarantee": {
          "present": "[Y/N]",
          "type": "[money_back | performance | cancel_anytime | none]",
          "duration": "[days or description]",
          "branded_name": "[name if branded, null if generic]"
        },
        "urgency_scarcity": "[countdown | limited_stock | limited_time | deadline | none]",
        "bundle_strategy": "[good_better_best | single_option | quantity_discount | none]",
        "offer_framing_summary": "[2-3 sentence summary of offer strategy]"
      }
    }
  ],

  "cross_page_synthesis": {
    "universal_patterns": [
      {
        "pattern": "[description]",
        "found_in": "[C1, C2, C3...]",
        "frequency": "[N of M competitors]",
        "implication": "[what this means for our page — table stakes, must include]"
      }
    ],
    "unique_differentiators": [
      {
        "differentiator": "[description]",
        "found_in": "[C1 only | C2 only]",
        "effectiveness_assessment": "[appears effective | neutral | unclear]",
        "implication": "[opportunity to adopt or avoid]"
      }
    ],
    "gaps_and_opportunities": [
      {
        "gap": "[what NO competitor does]",
        "opportunity": "[how we could exploit this gap]",
        "confidence": "[high | medium | low]",
        "relevant_taxonomy_elements": "[element names from element-taxonomy.md]"
      }
    ],
    "recommended_patterns": [
      {
        "pattern": "[what to replicate]",
        "source": "[which competitor(s)]",
        "rationale": "[why this is worth replicating]",
        "adaptation_notes": "[how to make it ours, not a copy]"
      }
    ],
    "patterns_to_avoid": [
      {
        "pattern": "[what NOT to do]",
        "source": "[which competitor(s)]",
        "rationale": "[why this is a mistake or saturated]"
      }
    ]
  },

  "metadata": {
    "page_brief_source": "[path to page-brief.json]",
    "intelligence_source": "[path to conversion-intelligence.json or 'not available']",
    "taxonomy_source": "element-taxonomy.md v1.0",
    "pattern_analysis_source": "cross-page-pattern-analysis.md v1.0",
    "scrape_tool": "Firecrawl MCP (firecrawl_scrape)",
    "scrape_timestamps": {
      "C1": "[ISO timestamp]",
      "C2": "[ISO timestamp]"
    }
  }
}
```

### COMPETITIVE-AUDIT-SUMMARY.md

```markdown
# Competitive Page Audit Summary — [Project Name]

## Overview
- **Competitors Analyzed:** [N]
- **Target Vertical:** [vertical]
- **Target Page Type:** [type_a | type_b | hybrid]

## Competitor Snapshot
| # | Brand | Page Type | Platform | Sections | Proof Density | CTAs | Key Differentiator |
|---|-------|-----------|----------|----------|---------------|------|--------------------|
| C1 | [brand] | [type] | [platform] | [count] | [density] | [count] | [1-line] |
[...all competitors...]

## Top 5 Strategic Insights
1. **[Insight Title]** — [2-3 sentence explanation with competitor references]
2. **[Insight Title]** — [2-3 sentence explanation]
3. **[Insight Title]** — [2-3 sentence explanation]
4. **[Insight Title]** — [2-3 sentence explanation]
5. **[Insight Title]** — [2-3 sentence explanation]

## Universal Patterns (Table Stakes)
[Bulleted list of what every competitor does — our page must include these]

## Differentiation Opportunities
[Bulleted list of gaps and opportunities — what our page can do that competitors do not]

## Patterns to Avoid
[Bulleted list of competitive patterns that are saturated, ineffective, or inappropriate]

## Recommended Architecture Inputs
- **LP-03 (Above-Fold):** [1-2 sentence recommendation based on competitive above-fold analysis]
- **LP-04 (Section Sequence):** [1-2 sentence recommendation based on competitive section patterns]
- **LP-05 (Social Proof):** [1-2 sentence recommendation based on competitive proof strategies]
- **LP-06 (Offer/CTA):** [1-2 sentence recommendation based on competitive offer/CTA patterns]

## Competitor-by-Competitor Detail
[For each competitor: 1 paragraph covering element highlights, proof approach, CTA strategy, offer framing, and overall assessment]
```

---

## FORBIDDEN BEHAVIORS

1. Fabricating page content that was not in the scraped data — every finding must trace to actual scraped content
2. Recommending copying competitor copy verbatim — identify PATTERNS, not specific copy to steal
3. Analyzing fewer than 3 competitors and claiming the audit is complete
4. Mapping elements as simple "present/absent" without analyzing HOW they are used (function, position, word count)
5. Using stale/cached page data instead of live Firecrawl scrapes — every scrape must be from the current session
6. Comparing competitors of different page types without explicitly noting the type difference
7. Skipping any of the 5 analysis dimensions (element map, proof strategy, CTA architecture, offer framing, differentiation synthesis) for any competitor
8. Producing `competitive-audit.json` without `COMPETITIVE-AUDIT-SUMMARY.md` and `execution-log.md`
9. Claiming a scrape was successful when the returned content is too thin to analyze (e.g., only a nav bar and footer)
10. Generating strategic insights without grounding them in specific evidence from the scraped pages

---

## FIRECRAWL INTEGRATION REFERENCE

### Primary Scrape Tool
- **Tool:** `firecrawl_scrape`
- **Format:** `formats: ["markdown"]`
- **Settings:** `onlyMainContent: true`, `waitFor: 5000`

### Structured Extraction Schema
```json
{
  "page_type": "string",
  "headline": "string",
  "section_count": "number",
  "sections": [{"name": "string", "position": "number"}],
  "cta_count": "number",
  "cta_texts": ["string"],
  "testimonial_count": "number",
  "pricing_above_fold": "boolean",
  "guarantee_text": "string",
  "trust_signals": ["string"]
}
```

### Error Handling Chain
1. **First attempt:** `firecrawl_scrape` with `waitFor: 5000`
2. **Retry:** `firecrawl_scrape` with `waitFor: 10000`
3. **Fallback:** `firecrawl_agent` with prompt to extract page structure
4. **Skip:** Mark URL as `scrape_failed` in `scrape-validation.md`, proceed with remaining URLs

### Rate Limit Awareness
- Pause 2-3 seconds between scrape requests
- If rate limited, wait 10 seconds and retry
- Log all scrape attempts (success/fail/retry) in execution-log.md

---

## DOWNSTREAM HANDOFF

LP-02 outputs feed directly into Phase 2 architecture skills:

| Downstream Skill | What They Need from LP-02 | Field in competitive-audit.json |
|-----------------|--------------------------|-------------------------------|
| LP-03 Above-Fold Architecture | Competitor above-fold element patterns, headline approaches | `element_map` (position: above_fold), `cross_page_synthesis.universal_patterns` |
| LP-04 Section Sequence Planner | Competitor section order and count, education-before-sale patterns | `element_map` (all positions), `competitors[].element_map.sections_detected` |
| LP-05 Social Proof Architecture | Competitor proof density, types, placement, first-proof position | `competitors[].proof_strategy`, `cross_page_synthesis` |
| LP-06 Offer/CTA Architecture | Competitor CTA count, pricing, guarantee, urgency approaches | `competitors[].cta_architecture`, `competitors[].offer_framing` |
