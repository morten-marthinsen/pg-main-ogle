---
name: deep-research
description: >-
  Comprehensive deep research system producing 1,000+ verbatim quotes across 6
  buckets (Pain, Hope, Root Cause, Solutions Tried, Competitor Mechanism, Villain).
  Use when conducting market research for a new campaign, gathering audience
  intelligence, or building the evidence base for downstream copywriting. This is
  the most complex skill in the engine — it orchestrates multiple subagents across
  4 layers with 57 microskills. Produces the research handoff package with market
  snapshots, avatar profiles, competitive landscape analysis, and categorized
  verbatim quotes. Trigger when users mention research, market research, audience
  research, gathering quotes, competitive analysis, or building the evidence base
  for a promotion. Requires Soul.md from Skill 00.
skill_type: technique
persuasion_profile: commitment + moderate authority
---

# 01: DEEP RESEARCH

## 1,000+ Verbatim Quotes Across 6 Buckets

---

## PURPOSE

Build a comprehensive evidence base of real market language. This is not summary
research — it is verbatim quote mining from real people expressing real pain, hope,
frustration, and desire. The research handoff feeds every downstream skill.

**Output:** Research handoff package (market snapshot, avatar, competitive landscape, 1,000+ quotes)
**Unlocks:** Skill 02 (Proof Inventory) and all downstream skills

**Success Criteria:**
- 1,000+ verbatim customer quotes harvested across all 6 research buckets
- 5+ research sources scraped and synthesized
- All NON-NEGOTIABLE THRESHOLDS per bucket met (Pain 300, Hope 250, Root Cause 200, Solutions Tried 150, Competitor Mechanism 100, Villain 75)
- Market snapshot, avatar profile, and competitive landscape included
- Output file produced: research handoff package at 100KB+ minimum

---

## MCP TOOL DISCOVERY

This skill may require Firecrawl (web scraping), Apify (actor-based scraping), and Google Drive (source material access) depending on the research mode. At Layer 0, call:
- `ToolSearch("firecrawl")` for web research and scraping
- `ToolSearch("apify")` for platform-specific data collection
- `ToolSearch("google drive")` if source materials are in Google Drive

See `~system/MCP-TOOL-REGISTRY.md` for the complete tool-to-skill mapping.

---

## ARCHITECTURE

This skill is decomposed into 4 companion files (load only what you need):

1. `research-orchestrator.md` — workflow orchestration (always load)
2. `research-layer-specs.md` — per-layer execution specs (load relevant layer only)
3. `research-subagent-templates.md` — model selection, personas, context templates
4. `research-output-protocol.md` — output structure, checkpoints, session recap
5. `RESEARCH-ANTI-DEGRADATION.md` — structural enforcement rules

---

## NON-NEGOTIABLE THRESHOLDS

| Bucket | Minimum Quotes |
|--------|---------------|
| Pain | 300 |
| Hope | 250 |
| Root Cause | 200 |
| Solutions Tried | 150 |
| Competitor Mechanism | 100 |
| Villain | 75 |
| **TOTAL** | **1,000** |

Failure to meet any threshold = HALT. No conditional passes.
