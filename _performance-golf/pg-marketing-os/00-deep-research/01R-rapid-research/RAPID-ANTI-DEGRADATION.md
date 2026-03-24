# Rapid Research — Anti-Degradation Rules

**Version:** 1.0
**Purpose:** Condensed enforcement rules for rapid research. Derived from the 12 structural fixes in full deep research's RESEARCH-ANTI-DEGRADATION.md, adapted to the rapid research scope.

---

## THE 10 RULES

### 1. No Fabricated Quotes
Every quote must trace to a real source — a review, forum post, social media comment, or competitor page. If you cannot cite the source URL or platform, the quote does not exist. An empty bucket is better than a hallucinated one.

### 2. No Rationalized Shortcuts
These phrases are FORBIDDEN and trigger immediate halt:
- "quality over quantity"
- "sufficient for analysis"
- "close enough"
- "we have enough to proceed"
- "the quotes we have are high quality"
- "proceed with what we have"

If minimums are not met, expand or flag — do not rationalize.

### 3. Bucket Minimums Are Real
Pain 60, Hope 50, Root Cause 30, Solutions Tried 20. These are not suggestions. If a bucket is under minimum after the expansion round, flag it explicitly in the output with the actual count vs. required count. Do not silently proceed.

### 4. One Expansion Round Is Mandatory (If Needed)
If initial scraping falls below 150 total quotes, you MUST execute one expansion round — additional queries, additional sources, deeper scraping of existing sources. Do not skip expansion and proceed directly to analysis.

### 5. Source Attribution Is Non-Negotiable
Every quote carries: source platform, source URL (or "closed group" if inaccessible), and approximate date. Quotes without attribution are discarded before analysis.

### 6. Do Not Bias Scraping Toward Hypotheses
Hypotheses are tested AFTER collection, not used to direct collection. Collect broadly across all 4 buckets first, then test hypotheses against the full dataset. Confirmation bias is the most common failure mode in rapid research.

### 7. Real Language, Not Clean Language
Real people don't speak in marketing copy. If quotes read like polished ad copy, they are likely fabricated or over-edited. Preserve original grammar, spelling errors, abbreviations, and colloquialisms. The messiness is the signal.

### 8. Do Not Synthesize During Assembly
Phase 4 (Handoff Assembly) is an ASSEMBLY operation — compiling and organizing artifacts produced in Phases 2-3. It is NOT a synthesis phase. Do not generate new analysis, new patterns, or new conclusions during assembly. If it wasn't produced in Phases 2-3, it doesn't belong in the handoff.

### 9. Flag What You Didn't Do
The rapid research output MUST explicitly list:
- Competitor Mechanism bucket: NOT COLLECTED
- Villain bucket: NOT COLLECTED
- Proof Inventory: NOT RUN
- Layer 2.5 synthesis (transformation pairs, WEB analysis, grid): NOT PERFORMED
- RSF intelligence: NOT GENERATED
- Promise ceiling: NOT CALCULATED

This prevents downstream skills from assuming comprehensive research was conducted.

### 10. Recommend Upgrade When Evidence Is Thin
If any of these conditions are true, the output must recommend full deep research:
- Total quotes < 150 after expansion
- Any bucket below 50% of its minimum after expansion
- Fewer than 3 usable sources found
- Hypotheses return INCONCLUSIVE due to insufficient evidence
- The niche appears complex enough to warrant exhaustive research

---

## ANTI-PATTERN QUICK REFERENCE

```
BAD:  "I found 45 great pain quotes, proceeding to analysis"
WHY:  45 < 60 minimum. Expand first.

BAD:  "The hypothesis about trust seems validated by 3 quotes"
WHY:  3 quotes is anecdotal, not validated. Need pattern across multiple sources.

BAD:  "Scraping forums about pricing since the hypothesis mentions price sensitivity"
WHY:  Hypothesis-directed scraping creates confirmation bias. Scrape broadly.

BAD:  "Cleaning up this quote for readability: 'my kid literally threw the club lol'"
WHY:  "literally threw the club lol" is the gold. Preserve it.

BAD:  Writing the opportunity signals section from scratch during assembly
WHY:  Assembly compiles what 2.4-opportunity-signals produced. No new analysis.
```
