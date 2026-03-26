# Resume iON+ Deep Research

**Last updated:** 2026-03-26
**Status:** Step 1.4 COMPLETE. Ready for Gate 1 + Layer 2.

---

## What to tell Claude

Read this file, then read `PROJECT-STATE.md` in this same folder, then execute.

---

## Current State

Step 1.4 Deep Scraping is COMPLETE. 1,080 quotes collected across all 6 buckets, all minimums met.

| Bucket | Count | Target | Status |
|--------|-------|--------|--------|
| Pain | 302 | 300 | MET |
| Hope | 250 | 250 | MET |
| Root Cause | 201 | 200 | MET |
| Solutions Tried | 152 | 150 | MET |
| Competitor Mechanism | 100 | 100 | MET |
| Villain | 75 | 75 | MET |
| **TOTAL** | **1,080** | **1,000** | **MET** |

## What Was Done

- Scraped Reddit (2,611 items, 42 threads), YouTube (561 comments, 16 videos), GolfWRX forums (15+ threads), articles/reviews (4 sources) using Apify + Firecrawl
- Built Python auto-extraction script for keyword-based quote classification
- Ran 4 reclassification passes to fix bucket distribution
- Ran 3 expansion rounds to close PAIN and HOPE gaps
- All raw data saved locally in `raw-data/` subfolder

## What To Do Next

1. **Gate 1 validation** — verify all bucket minimums, spot-check quote quality
2. **If Gate 1 passes** — begin Layer 2 Intelligence Analysis (pattern recognition, insight synthesis across 1,080 quotes)
3. Layer 2 skills: emotional pattern mapping, competitor landscape analysis, frame claim development, transformation narrative construction

## Key Files In This Folder

| File | What It Is |
|------|-----------|
| `PROJECT-STATE.md` | Current phase, quote counts, gate status, next actions |
| `CLAUDE.md` | Project rules, model assignments, subagent templates, gate definitions |
| `ion-brief.md` | Approved research brief |
| `market_config.yaml` | Market configuration (platforms, competitors, terminology) |
| `layer-1-outputs/scrape-*.json` | 8 quote files (1,080 total quotes) |
| `raw-data/reddit_dataset.json` | Full Reddit dataset (2,611 items, 1.3MB) |
| `raw-data/youtube_dataset.json` | Full YouTube dataset (561 items, 209KB) |
| `raw-data/extract_quotes.py` | Reusable extraction script |

## Important Notes

- ~900 of 1,080 quotes were auto-extracted by keyword matching. Quality varies. Some may be misclassified.
- COMPETITOR_MECHANISM went through 4 reclassification passes (originally 530, reduced to 100). Distribution is reasonable but not perfect.
- Apify datasets may have expired. Raw data is saved locally in `raw-data/`.
- The feedback doc at `_performance-golf/pg-ai/marketing-os-feedback.md` has the full retrospective with 15 issues and 15 behavioral rules.

## Do NOT

- Re-read the orchestrator, PRD, or anti-degradation docs (waste of time, already internalized)
- Re-run any Layer 0 or Layer 1 pre-scraping skills (already complete)
- Regenerate any config files (all exist and are current)
- Use background subagents for MCP tool calls (they can't approve permissions)
