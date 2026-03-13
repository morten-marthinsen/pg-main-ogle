---
name: ad-intelligence
description: >-
  Build comprehensive competitive intelligence on what ads are running and winning
  in a target vertical. Use when launching a new ad campaign, entering a new market,
  or refreshing competitive intelligence. Scrapes 500+ competitor ads across 2+
  platforms (Meta Ad Library, TikTok Creative Center), classifies every ad by hook
  type (32-type taxonomy), format, visual style, and estimated run duration. Extracts
  top 20 winning ad specimens with full verbatim copy transcription and identifies
  opportunity gaps (underused hook types, format gaps, messaging whitespace). Three
  modes: Initial Scan (new projects), Continuous Monitor (active campaigns), and
  Tool-Assisted Scan (pre-scraped data import). Trigger when users mention ad
  research, competitor ads, ad intelligence, what ads are running, or competitive
  ad analysis. First skill in the Ad Engine pipeline.
---

# A01 — Ad Intelligence & Competitive Scan

**Pipeline Position:** First Ad Engine skill. Executes after Campaign Brief (Skill 09). Feeds A02 (Hook & Angle Discovery).

---

## PURPOSE

Build a comprehensive intelligence picture of what is working in the target vertical's
ad market. This is the ad-specific research layer — it mines what ADS work,
complementing Skill 01 which mines what PEOPLE say and feel.

A01 answers the questions downstream skills cannot answer from strategic outputs alone:
- What hooks are competitors using? Which hook types dominate? Which are underused?
- What formats are winning? Video, static, carousel — and in what ratios?
- What visual styles are performing? UGC, polished, text-heavy — and on which platforms?
- Which ads have been running the longest (proxy for winning)?
- Where are the opportunity gaps?

**Success Criteria:**
- 500+ competitor ads scraped across 2+ platforms
- 10+ competitor brands analyzed
- 100% of scraped ads classified by hook type (32-type taxonomy)
- Top 20 winning ad specimens extracted with full verbatim copy
- Opportunity gaps identified
- AD-INTELLIGENCE-HANDOFF.md produced at 100KB+ minimum

---

## IDENTITY

**This skill IS:** The competitive intelligence engine for paid ads, the hook type
distribution analyzer, the winning ad specimen collector, the opportunity gap detector.

**This skill is NOT:** A hook generator (A02), a creative strategy tool (A03-A05),
a general market research tool (Skill 01), an ad performance analyzer (A12).

**Upstream:** Campaign Brief (Skill 09), Vertical Profile
**Downstream:** Feeds AD-INTELLIGENCE-HANDOFF.md to A02 and all subsequent Ad Engine skills

---

## OPERATIONAL MODES

| Mode | Trigger | Scope | Output |
|------|---------|-------|--------|
| Initial Scan | New project launch | 500+ ads across platforms | AD-INTELLIGENCE-HANDOFF.md (100KB+) |
| Continuous Monitor | Scheduled for active campaigns | Delta since last scan | INTELLIGENCE-UPDATE.md |
| Tool-Assisted Scan | Pre-scraped data available | Import + classify | AD-INTELLIGENCE-HANDOFF.md |

---

## LAYER ARCHITECTURE

| Layer | Task | Model |
|-------|------|-------|
| Pre | Infrastructure + anti-degradation read | haiku |
| 0 | Context loading + vertical profile + MCP tool discovery | haiku |
| 1 | Platform scraping + data collection | sonnet |

**Layer 0 MCP Tool Discovery:** This skill requires Firecrawl and Apify tools. At Layer 0, call `ToolSearch("firecrawl")` and `ToolSearch("apify")` to load the required tool schemas. See `~system/MCP-TOOL-REGISTRY.md` for details.
| 2 | Classification + taxonomy mapping | opus |
| 3 | Specimen extraction + analysis | opus |
| 4 | Opportunity gap analysis + output packaging | sonnet |

---

## REFERENCE FILES

For full execution specs, microskill details, and anti-degradation protocols:
- `A01-AD-INTELLIGENCE-AGENT.md` — Complete orchestration specification
- `A01-AD-INTELLIGENCE-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `AD-INTELLIGENCE-HANDOFF.md` (10 required sections, 100KB+ minimum)
**Location:** `~outputs/[project-name]/ad-engine/A01/`
