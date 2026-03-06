# LP-02: Competitive Page Audit — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-02-competitive-audit
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-02 has six specific failure modes:

1. **Scrape Failure Cascade:** All or most competitor URLs fail to scrape, and the agent either halts prematurely or proceeds with insufficient data. At least 3 competitor pages must be successfully scraped with usable content (headline extractable, sections identifiable, CTAs found). If a scrape returns only navigation, footer, or cookie consent — that is NOT usable content. Re-scrape with extended `waitFor`, try `firecrawl_agent`, or collect a replacement URL.

2. **Surface-Level Analysis:** The agent maps elements as "present/absent" binary without analyzing HOW they are used. "Hero image: present" is useless. "Hero image: product bottle on kitchen counter with morning light, lifestyle context, positioned left with CTA right, ~40% of above-fold viewport" is useful. Every element must include: function served, position, approximate word count, and a verbatim sample where possible.

3. **Competitor Plagiarism Risk:** The agent recommends copying competitor elements verbatim — specific headlines, CTA text, guarantee wording. LP-02 identifies PATTERNS to adapt: "3 of 4 competitors use performance guarantees with specific metrics" is a pattern. "Use the headline 'We'll Get You Clients, Guaranteed'" is plagiarism. Every recommendation must include adaptation notes.

4. **Freshness Assumption:** The agent uses cached, stale, or hallucinated page data instead of live Firecrawl scrapes. Every finding must trace to a scrape file from the current session. If a scrape file does not exist for a competitor, that competitor cannot be analyzed.

5. **Type Mismatch:** The agent compares Type A competitors to a Type B target page (or vice versa) without explicitly noting the type difference. This leads to inappropriate pattern recommendations. Always classify each competitor's page type AND note any type differences from the target page type in `page-brief.json`.

6. **Insufficient Competitor Count:** The agent analyzes only 1-2 pages when the minimum is 3. Two pages cannot establish patterns — you need at least 3 to identify what is universal vs. unique. If fewer than 3 URLs are available after scraping attempts, HALT.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `brief-load.md` | Layer 1 |
| After Layer 0 | `intelligence-load.md` | Layer 1 (optional — may not exist if LP-01 not run) |
| After Layer 0 | `competitor-urls.md` | Layer 1 |
| After Layer 1 | `scrape-1.md` through `scrape-[N].md` (at least 3) | Layer 2 |
| After Layer 1 | `scrape-validation.md` | Layer 2 |
| After Layer 2 | `element-map.md` | Layer 3 |
| After Layer 2 | `proof-strategy-analysis.md` | Layer 3 |
| After Layer 2 | `cta-architecture-analysis.md` | Layer 3 |
| After Layer 2 | `offer-framing-analysis.md` | Layer 3 |
| After Layer 2 | `differentiation-synthesis.md` | Layer 3 |
| After Layer 3 | `coverage-validation.md` | Layer 4 |
| After Layer 3 | `insights-ranking.md` | Layer 4 |
| Output | `competitive-audit.json` | Downstream skills, human |
| Output | `COMPETITIVE-AUDIT-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Competitors scraped | At least 3 with usable content | HALT — re-scrape or collect replacement URLs |
| Element mapping depth | Every element has: position, function, word count | HALT — re-map with full detail |
| Analysis dimensions per competitor | All 5 (element map, proof, CTA, offer, differentiation) | HALT — complete missing dimensions |
| Scrape freshness | All scrapes from current session | HALT — re-scrape stale URLs |
| Page type classification | Every competitor classified as Type A/B/Hybrid | HALT — classify before analyzing |
| Verbatim evidence | Every pattern claim backed by scraped content quotes | HALT — add evidence or remove claim |
| Three-file output | competitive-audit.json + COMPETITIVE-AUDIT-SUMMARY.md + execution-log.md | HALT — write missing files |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It Is Invalid |
|----------------|-----------------|
| "The scrape was mostly successful — we got enough" | Define "enough." Can you extract the headline? Count sections? Identify CTAs? Find proof elements? If any of those are missing, the scrape is not usable for that analysis dimension. |
| "This competitor's page is similar to the others" | Similar HOW? Document the specific similarities with evidence. "Similar" without specifics is lazy analysis that misses the differentiators. |
| "I'll use the competitor's headline approach" | You mean the pattern, not the headline itself. State the pattern: "result-outcome headline with specific metric." Do NOT quote the competitor's headline as a recommendation. |
| "Only 2 pages scraped successfully — that should be enough for a pattern" | Two data points do not establish a pattern. They establish a coincidence. You need 3+ to distinguish universal from coincidental. HALT and get more URLs. |
| "The proof strategy is standard" | Standard compared to what? Name the specific proof types, count them, note their positions. "Standard" is not an analysis — it is an avoidance of analysis. |
| "This element is present" | WHERE is it present? What FUNCTION does it serve? How many WORDS is it? What does it LOOK LIKE? "Present" alone provides zero strategic value. |
| "I'll skip the offer analysis because this competitor hides their pricing" | Hidden pricing IS an offer strategy (demo/application model). Analyze it: why do they hide it? What qualifies a visitor? What is the CTA action instead of a purchase? Hiding pricing is data, not a gap. |

---

## SCRAPE QUALITY STANDARDS

For a scrape to count as "usable," ALL of the following must be extractable from the scraped content:

| Required Element | Detection Method |
|-----------------|-----------------|
| Headline / H1 | Clear heading text in scraped markdown |
| At least 3 identifiable sections | Heading structure (H2/H3) or clear content blocks |
| At least 1 CTA | Button text, link text with action language |
| Enough body copy to assess | At least 500 words of page content (not nav/footer) |

If a scrape fails any of these, it is classified as `scrape_failed` or `scrape_partial` in `scrape-validation.md` and does NOT count toward the 3-competitor minimum.

### Common Scrape Failure Patterns

| Failure Pattern | Cause | Fix |
|----------------|-------|-----|
| Only nav bar + footer returned | JavaScript-rendered page, `waitFor` too short | Retry with `waitFor: 10000`, then try `firecrawl_agent` |
| Cookie consent wall | GDPR/CCPA popup blocking content | Retry with `firecrawl_agent` to navigate past consent |
| Login/paywall block | Gated content | Skip this URL — cannot scrape gated pages. Collect replacement URL. |
| Partial content (headline + 1 section) | Page lazy-loads sections | Retry with `waitFor: 15000` or `firecrawl_agent` with scroll instruction |
| Empty response | URL invalid, site down, or blocking bots | Verify URL is correct. Try alternative URL for same brand. Skip if unfixable. |

---

## PER-COMPETITOR ANALYSIS CHECKLIST

Before declaring any single competitor "fully analyzed," verify ALL of the following:

```
[ ] Page type classified (Type A / Type B / Hybrid)
[ ] Platform detected (Shopify / ClickFunnels / WordPress / etc.)
[ ] Element map: elements listed with position, function, word count
[ ] Proof strategy: density level, first-proof position, proof types with counts, proof-to-copy ratio
[ ] CTA architecture: count, all instances with text + position, consistency assessment, sticky CTA check
[ ] Offer framing: pricing model, anchoring technique, guarantee details, urgency/scarcity, bundle strategy
[ ] Verbatim samples: at least 3 direct quotes from scraped content supporting the analysis

IF ANY CHECKBOX UNCHECKED -> COMPETITOR ANALYSIS IS NOT COMPLETE
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| Scrape failure cascade | Fewer than 3 usable scrapes after all retry attempts | Re-scrape with extended waitFor, try firecrawl_agent, collect replacement URLs | HALT if still fewer than 3 after all retries — escalate to human for manual URL provision |
| Surface-level analysis | Any element listed as only "present/absent" without position, function, or word count | Re-analyze the element with full detail from scraped content | If scraped content is too thin for full analysis, downgrade scrape quality to "partial" and note the limitation |
| Competitor plagiarism risk | Any recommendation that includes specific competitor copy to use verbatim | Rewrite recommendation as a pattern with adaptation notes | Flag in execution-log.md if pattern consistently drifts toward plagiarism |
| Freshness assumption | Any analysis that references content not found in current session's scrape files | Re-verify every claim against scrape-[N].md files | Remove any claim that cannot be traced to a scrape file |
| Type mismatch | Competitor page type differs from target page type but analysis does not note the difference | Add explicit type comparison note to each analysis dimension | Flag in COMPETITIVE-AUDIT-SUMMARY.md that type-adjusted interpretation is needed |
| Insufficient competitor count | Fewer than 3 competitors in final analysis | Attempt to collect and scrape additional URLs | HALT — 2 competitors cannot establish competitive patterns |

---

## THREE-FILE OUTPUT REQUIREMENT

LP-02 is NOT complete until all three exist:

```
[ ] competitive-audit.json — EXISTS
[ ] competitive-audit.json — Has: all competitors with all 5 analysis dimensions
[ ] competitive-audit.json — Has: cross_page_synthesis with all 5 sub-arrays (universal_patterns, unique_differentiators, gaps_and_opportunities, recommended_patterns, patterns_to_avoid)
[ ] competitive-audit.json — Every claim backed by scrape evidence
[ ] COMPETITIVE-AUDIT-SUMMARY.md — EXISTS
[ ] COMPETITIVE-AUDIT-SUMMARY.md — Contains: competitor snapshot table, top 5 insights, universal patterns, differentiation opportunities, architecture recommendations
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all scrape attempts with success/fail status
[ ] execution-log.md — Shows all microskills executed with spec files read
[ ] execution-log.md — Shows all checkpoint files created

IF ANY CHECKBOX UNCHECKED -> LP-02 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
LP-02-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  brief_loaded: "[Y/N]"
  competitor_urls_collected: "[count]"
  scrapes_successful: "[count of usable scrapes]"
  page_types_classified: "[Y/N for each competitor]"
  taxonomy_loaded: "[Y/N — element-taxonomy.md read?]"

  # Degradation detection
  surface_level_analysis: "[Y/N — elements listed without function/position/wordcount?]"
  stale_data_used: "[Y/N — any claim not from current session scrapes?]"
  plagiarism_risk: "[Y/N — recommending specific competitor copy verbatim?]"
  type_mismatch_unnoted: "[Y/N — comparing different types without noting?]"
  insufficient_competitors: "[Y/N — fewer than 3 analyzed?]"
  skipping_analysis_dimension: "[Y/N — any of 5 dimensions missing for any competitor?]"

  IF any degradation_detection = Y: STOP — execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```
