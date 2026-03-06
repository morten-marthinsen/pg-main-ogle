# A01 — Ad Intelligence & Competitive Scan

**Version:** 1.1
**Created:** 2026-02-22
**Updated:** 2026-02-27 (v1.1 — Tool-Assisted Scan mode, Meta Ad Spy integration)
**Role:** Workflow Orchestrator (State Machine)
**Skill Type:** Intelligence / Research
**Pipeline Position:** First Ad Engine skill. Executes after Campaign Brief (Skill 09). Feeds A02 (Hook & Angle Discovery).
**Related Documents:**
- `./skills/ads/AD-ENGINE-CLAUDE.md` (Ad Engine master)
- `./References/AD-HOOK-TAXONOMY.md` (32 hook types, 10 categories)
- `./CLAUDE.md` (CopywritingEngine master — metacognitive, gates, anti-degradation)
**Anti-Degradation Document:** `A01-AD-INTELLIGENCE-ANTI-DEGRADATION.md` (MANDATORY — read BEFORE execution)

---

## TABLE OF CONTENTS

- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [TWO OPERATIONAL MODES](#two-operational-modes)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [OUTPUT SCHEMA: AD-INTELLIGENCE-HANDOFF.md](#output-schema-ad-intelligence-handoffmd)
- [GATE ARCHITECTURE — COMPLETE REFERENCE](#gate-architecture--complete-reference)
- [ANTI-DEGRADATION ENFORCEMENT](#anti-degradation-enforcement)
- [CONTINUOUS MONITOR MODE — DETAILED PROTOCOL](#continuous-monitor-mode--detailed-protocol)
- [MCP INTEGRATION SPECIFICATIONS](#mcp-integration-specifications)
- [SUBAGENT CONTEXT TEMPLATE](#subagent-context-template)
- [PER-MICROSKILL OUTPUT PROTOCOL](#per-microskill-output-protocol)
- [FORBIDDEN BEHAVIORS (A01-Specific)](#forbidden-behaviors-a01-specific)
- [VERSION HISTORY](#version-history)

---

## PURPOSE

Build a **comprehensive intelligence picture of what is working** in the target vertical's ad market. This is the ad-specific research layer — it mines what **ADS work**, complementing CopywritingEngine Skill 01 which mines what **PEOPLE say and feel**.

A01 answers the questions downstream skills cannot answer from strategic outputs alone:
- What hooks are competitors using? Which hook types dominate? Which are underused?
- What formats are winning? Video, static, carousel — and in what ratios?
- What visual styles are performing? UGC, polished, text-heavy — and on which platforms?
- Which ads have been running the longest (proxy for winning)? What do they look like verbatim?
- Where are the opportunity gaps — the hook types, formats, and messaging angles that competitors are NOT exploiting?

**Success Criteria:**
- 500+ competitor ads scraped across 2+ platforms
- 10+ competitor brands analyzed
- 100% of scraped ads classified by hook type (32-type taxonomy)
- 100% of scraped ads classified by format, visual style, and estimated run duration
- Top 20 winning ad specimens extracted with full verbatim copy transcription
- Opportunity gaps identified (underused hook types, format gaps, messaging whitespace)
- AD-INTELLIGENCE-HANDOFF.md produced at 100KB+ minimum
- All 10 required sections populated with substantive analysis (not summaries)

This agent is a **workflow orchestrator**. It delegates scraping, classification, and analysis to subagents and validates outputs at each gate. It produces intelligence for downstream consumption by A02 (Hook & Angle Discovery) and all subsequent Ad Engine skills.

---

## IDENTITY

**This skill IS:**
- The competitive intelligence engine for paid ads
- The ad market scanner that reveals what is ACTUALLY running and winning
- The hook type distribution analyzer (which of the 32 types are saturated vs. underexploited)
- The winning ad specimen collector (verbatim copy from longest-running ads)
- The opportunity gap detector (where competitors are NOT playing)
- A two-mode system: Initial Scan (per project) and Continuous Monitor (ongoing)
- A three-mode system when pre-scraped data is available: Tool-Assisted Scan imports Meta Ad Spy data

**This skill is NOT:**
- A hook generator (that is A02)
- A creative strategy tool (that is A03-A05)
- A general market research tool (that is CopywritingEngine Skill 01)
- A replacement for upstream strategic outputs (it supplements them with ad-specific intelligence)
- An ad performance analyzer (that is A12, which requires actual performance data)
- A one-time snapshot (the Continuous Monitor mode keeps intelligence current)

**Upstream:** Receives Campaign Brief (Skill 09 output), Vertical Profile (from `ad-verticals/`)
**Downstream:** Feeds `AD-INTELLIGENCE-HANDOFF.md` to A02 (Hook & Angle Discovery) and all subsequent Ad Engine skills via Layer 0 loading

---

## TWO OPERATIONAL MODES

| Mode | Trigger | Scope | Output | Frequency |
|------|---------|-------|--------|-----------|
| **Initial Scan** | New project/campaign launch | 500+ competitor ads across platforms | AD-INTELLIGENCE-HANDOFF.md (100KB+) | Once per project |
| **Continuous Monitor** | Scheduled (weekly/bi-weekly) for active campaigns | Delta since last scan | INTELLIGENCE-UPDATE.md | Bi-weekly minimum for active campaigns |

### Mode Selection Logic

```
IF no previous AD-INTELLIGENCE-HANDOFF.md exists for this project:
  → MODE = INITIAL SCAN
  → Execute full Layer 0-4 pipeline
  → Output: AD-INTELLIGENCE-HANDOFF.md

IF previous AD-INTELLIGENCE-HANDOFF.md exists AND campaign is active:
  → MODE = CONTINUOUS MONITOR
  → Load previous handoff as baseline
  → Layer 1 scrapes ONLY NEW ads since last scan date
  → Layer 3.6 (Trend Detection) is MANDATORY (skipped in Initial Scan)
  → Output: INTELLIGENCE-UPDATE.md (delta from previous)

IF previous handoff exists BUT is older than 30 days:
  → MODE = INITIAL SCAN (full rescan — data is stale)
```

### Mode 3: Tool-Assisted Scan
**When:** Pre-scraped data available from Meta Ad Spy tool (50+ DTC brands, impression-sorted)
**What:** Import pre-analyzed JSON from Meta Ad Spy tool for Meta ads; use standard Apify/Firecrawl scraping for TikTok/Google/other platforms. Combines tool data with live scraping for complete cross-platform intelligence.
**Key difference:** Impression data available for Meta ads → enables dual-signal performance scoring (run duration + impressions)
**Triggers:** JSON export from Meta Ad Spy tool provided as input
**Protocol:** Read meta-ad-spy-integration.md for JSON import schema and dual-signal formula

---

### Model Assignment Table (Binding)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  MODEL SELECTION IS MANDATORY, NOT ADVISORY.                                 │
│  The orchestrator MUST use the model specified below when spawning each       │
│  subagent type. Using a different model requires HUMAN APPROVAL with         │
│  documented reason.                                                          │
└──────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────┬──────────────┬──────────┬────────────────────────────┐
│  PHASE                │  SKILLS      │  MODEL   │  REASON                    │
├───────────────────────┼──────────────┼──────────┼────────────────────────────┤
│  Pre-Execution        │  Infra       │  haiku   │  File creation, directory  │
│  infrastructure       │              │          │  setup — mechanical only   │
├───────────────────────┼──────────────┼──────────┼────────────────────────────┤
│  Layer 0              │  0.0.1–0.4   │  haiku   │  Loading, validation,     │
│  foundation           │              │          │  competitor list is        │
│                       │              │          │  mechanical extraction     │
├───────────────────────┼──────────────┼──────────┼────────────────────────────┤
│  Layer 1              │  1.1–1.5     │  sonnet  │  MCP tool orchestration,  │
│  scraping             │              │          │  data extraction is        │
│                       │              │          │  mechanical — Opus adds   │
│                       │              │          │  zero quality here         │
├───────────────────────┼──────────────┼──────────┼────────────────────────────┤
│  Layer 2              │  2.1–2.6     │  opus    │  Pattern recognition,     │
│  classification       │              │          │  hook classification       │
│                       │              │          │  against 32-type taxonomy  │
│                       │              │          │  requires deep reasoning   │
├───────────────────────┼──────────────┼──────────┼────────────────────────────┤
│  Layer 3              │  3.1–3.7     │  opus    │  Strategic analysis,      │
│  synthesis            │              │          │  opportunity identification│
│                       │              │          │  cross-referencing with    │
│                       │              │          │  Skill 01 research         │
├───────────────────────┼──────────────┼──────────┼────────────────────────────┤
│  Layer 4              │  4.1–4.3     │  sonnet  │  Assembly and formatting  │
│  output               │              │          │  — structured packaging,   │
│                       │              │          │  not creative reasoning    │
└───────────────────────┴──────────────┴──────────┴────────────────────────────┘
```

### Model Selection Enforcement

```
WHEN SPAWNING A SUBAGENT:

1. LOOK UP the skill number in the table above
2. USE the specified model
3. LOG the model used in the execution log

IF you want to override the table:
  → You MUST have HUMAN APPROVAL
  → You MUST document the reason in the execution log
  → "I thought it would be better" is NOT a valid reason

FORBIDDEN:
  - Defaulting ALL subagents to opus (wastes tokens on scraping tasks)
  - Defaulting ALL subagents to haiku (loses quality on classification/synthesis)
  - Omitting the model parameter
  - Changing model mid-task without logging the switch
```

---

## STATE MACHINE

```
IDLE → LOADING → SCRAPING → CLASSIFICATION → SYNTHESIS → PACKAGING → COMPLETE
         │           │             │              │            │
         ▼           ▼             ▼              ▼            ▼
      [GATE_0]    [GATE_1]     [GATE_2]       [GATE_3]     [GATE_4]
      PASS/FAIL   PASS/FAIL    PASS/FAIL      PASS/FAIL    PASS/FAIL
         │           │             │              │            │
         └───────────┴─────────────┴──────────────┴────────────┘
                                      ▲
                                      │
                                Max 3 expansion rounds
                                per gate, then
                                HUMAN ESCALATION
```

**State Transitions (VALID):**
- IDLE → LOADING (always allowed)
- LOADING → SCRAPING (only if GATE_0 = PASS)
- SCRAPING → CLASSIFICATION (only if GATE_1 = PASS)
- CLASSIFICATION → SYNTHESIS (only if GATE_2 = PASS)
- SYNTHESIS → PACKAGING (only if GATE_3 = PASS)
- PACKAGING → COMPLETE (only if GATE_4 = PASS)

**State Transitions (INVALID — BLOCKED):**
- LOADING → CLASSIFICATION (cannot skip scraping)
- SCRAPING → SYNTHESIS (cannot skip classification)
- ANY → PACKAGING without GATE_3 passing
- ANY → COMPLETE without GATE_4 passing

---

## LAYER ARCHITECTURE

### Pre-Execution: Project Infrastructure

**BEFORE any intelligence gathering begins, the following files MUST exist in the project folder:**

#### 1. Project CLAUDE.md

```markdown
# [Project Name] — A01 Ad Intelligence CLAUDE.md

## MANDATORY FIRST READS
1. READ: ./skills/ads/A01-ad-intelligence/A01-AD-INTELLIGENCE-ANTI-DEGRADATION.md
2. READ: ./skills/ads/A01-ad-intelligence/A01-AD-INTELLIGENCE-AGENT.md
3. READ: This file (project CLAUDE.md)
4. READ: PROJECT-STATE.md (current phase, decisions, next steps)

## AD SCRAPING TARGETS
| Metric | Minimum | Status |
|--------|---------|--------|
| Total ads scraped | 500 | PENDING |
| Competitor brands | 10 | PENDING |
| Platforms covered | 2 | PENDING |
| Ads classified (hook type) | 100% | PENDING |
| Winning specimens extracted | 20 | PENDING |

## GATE ENFORCEMENT
- Gates are BINARY: PASS or FAIL. No other status exists.
- "PARTIAL_PASS", "conditional pass", "representative sample" — NONE of these exist.

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)
- "representative sample of competitor ads"
- "the top ads are sufficient"
- "this platform isn't relevant"
- "close enough to 500"
- "we have enough for analysis"
- "quality over quantity"
```

#### 2. PROJECT-STATE.md

```markdown
# [Project Name] — A01 Ad Intelligence State

## Current Phase
- Layer: [0/1/2/3/4]
- Step: [e.g., 1.1 Meta Ad Library Scraping]
- Mode: [INITIAL_SCAN / CONTINUOUS_MONITOR]
- Status: [IN_PROGRESS / BLOCKED / COMPLETE]

## Scraping Counts (updated after every scraping session)
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Total ads | 0 | 500 | PENDING |
| Meta ads | 0 | 200 | PENDING |
| TikTok ads | 0 | 150 | PENDING |
| Google ads | 0 | 100 | PENDING |
| Other platform ads | 0 | 50 | PENDING |
| Competitor brands | 0 | 10 | PENDING |

## Classification Progress
| Dimension | % Complete | Status |
|-----------|-----------|--------|
| Hook type | 0% | PENDING |
| Format | 0% | PENDING |
| Visual style | 0% | PENDING |
| Run duration | 0% | PENDING |

## Gate Status
- GATE_0: [PASS/PENDING]
- GATE_1: [PASS/FAIL/PENDING]
- GATE_2: [PASS/FAIL/PENDING]
- GATE_3: [PASS/FAIL/PENDING]
- GATE_4: [PASS/FAIL/PENDING]

## Key Decisions
- [None yet]

## Next Action
- [Initialize project]
```

#### 3. PROGRESS-LOG.md

```markdown
# [Project Name] — A01 Progress Log
## [Timestamp]
**Phase:** Pre-Execution
**Action:** Project infrastructure created
**Files:** project CLAUDE.md, PROJECT-STATE.md, PROGRESS-LOG.md
**Next:** Begin Layer 0 execution
```

**These 3 files are created at Pre-Execution, BEFORE any Layer 0 skills run.**

---

> **CRITICAL CONSTRAINTS REMINDER:** Read ANTI-DEGRADATION.md. Every microskill produces its own file. Gates are PASS/FAIL only. Numbers are exact.

### Layer 0: Foundation & Loading

**Purpose:** Load all required inputs, validate MCP tool availability, build the competitor brand list, and confirm readiness for intelligence gathering.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 0.0.1 | `0.0.1-vertical-profile-loader.md` | Load ad-specific vertical config from `ad-verticals/` (platform priorities, hook patterns, compliance constraints, anti-slop rules) | haiku |
| 0.1 | `0.1-campaign-brief-loader.md` | Load Skill 09 Campaign Brief output. Extract product category, target audience, competitor names, market positioning, awareness level. | haiku |
| 0.2 | `0.2-mcp-tool-validator.md` | Verify Firecrawl MCP server is available and responding. Verify Apify MCP server is available and responding. Test both with simple validation requests. Log tool versions and capabilities. | haiku |
| 0.3 | `0.3-competitor-list-builder.md` | Build list of 10-20 competitor brands to scan. Sources: (a) Competitors named in Campaign Brief, (b) Competitors identified in Skill 01 Research, (c) Additional brands discovered via Apify/Firecrawl search of the vertical. Output: competitor_list.yaml with brand name, known ad platforms, estimated market position. | haiku |
| 0.4 | `0.4-input-validator.md` | Validate all inputs present and above minimum thresholds. Confirm: Campaign Brief loaded, Vertical Profile loaded, MCP tools validated, Competitor list has 10+ brands. | haiku |
| 0.5 | JSON Import Loader | Parse Meta Ad Spy JSON, map fields | haiku | Tool-Assisted only |
| 0.6 | Brand Database Matcher | Match brands to vertical configs | haiku | Tool-Assisted only |

**Execution Order:**
1. 0.0.1 and 0.1 run in parallel (independent loading)
2. 0.2 runs in parallel with above (MCP validation is independent)
3. 0.3 runs after 0.1 completes (needs Campaign Brief for competitor names)
4. 0.4 runs after all above complete (validates aggregated inputs)

**Gate 0 — Layer 0 Complete:**

```yaml
# LAYER_0_COMPLETE.yaml
gate: GATE_0
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  vertical_profile_loaded: true
  campaign_brief_loaded: true
  mcp_firecrawl_available: true
  mcp_apify_available: true
  competitor_list_count: "[integer >= 10]"
  all_inputs_validated: true

microskill_outputs:
  - id: "0.0.1"
    file: "layer-0-outputs/0.0.1-vertical-profile-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.1"
    file: "layer-0-outputs/0.1-campaign-brief-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.2"
    file: "layer-0-outputs/0.2-mcp-tool-validator.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.3"
    file: "layer-0-outputs/0.3-competitor-list-builder.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.4"
    file: "layer-0-outputs/0.4-input-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF competitor_list_count < 10: GATE CLOSED — expand competitor discovery
IF any mcp tool unavailable: GATE CLOSED — resolve MCP configuration
IF campaign_brief missing: GATE CLOSED — execute Skill 09 first
```

### Schema Validation Reference

Input validators MUST verify field presence — not just file existence — for all consumed handoff files. See `skills/ads/ad-engine-schema-registry.md` for required fields per handoff file.

---

> **CRITICAL CONSTRAINTS REMINDER:** Read ANTI-DEGRADATION.md. Every microskill produces its own file. Gates are PASS/FAIL only. Numbers are exact.

### Layer 1: Ad Scraping & Collection

**Purpose:** Scrape 500+ competitor ads across 2+ platforms. Extract raw ad data including copy text, headlines, CTAs, format type, image/video URLs, and estimated run duration.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 1.1 | `1.1-meta-ad-library-scraper.md` | Scrape Facebook/Meta Ad Library for each competitor brand. Use Apify actor for Meta Ad Library scraping. Target: 200+ ads. Extract: ad copy text, headline, CTA, image/video URL, estimated run duration, format type (video/image/carousel), page name, start date. | sonnet |
| 1.2 | `1.2-tiktok-creative-center-scraper.md` | Scrape TikTok Creative Center top ads for the vertical. Use Firecrawl or Apify. Target: 150+ ads. Extract: script/text overlay, hook text (first 3 seconds), format (video length, style), engagement signals, advertiser name. | sonnet |
| 1.3 | `1.3-google-ads-transparency-scraper.md` | Scrape Google Ads Transparency Center for each competitor brand. Target: 100+ ads. Extract: ad copy text, format (search/display/video), advertiser name, campaign type, date range. | sonnet |
| 1.4 | `1.4-additional-platform-scanner.md` | CONDITIONAL: Only execute if vertical profile specifies LinkedIn, Pinterest, or other platforms as relevant. Target: 50+ ads if executed. Extract: platform-specific ad data. Skip with documented justification if vertical profile says platforms are not relevant. | sonnet |
| 1.5 | `1.5-raw-data-validator.md` | Validate total scraped ads >= 500. Validate competitor coverage >= 10 brands with ads found. Validate platform coverage >= 2 platforms with ads. Validate data quality: no duplicate ads, all required fields populated. Produce AD VOLUME CHECK table (mandatory). | sonnet |
| 1.6 | Meta Ad Spy Ingester | Ingest pre-scraped Meta ads | sonnet | Tool-Assisted only |

**Execution Order:**
1. 1.1, 1.2, 1.3 run in parallel (independent platform scraping)
2. 1.4 runs in parallel IF triggered by vertical profile (independent platform)
3. 1.5 runs after all scraping complete (validates aggregated data)

**MANDATORY AD VOLUME CHECK (After every scraping session):**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AD VOLUME CHECK - [timestamp]                                              │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ METRIC              │ REQUIRED │ ACTUAL │ STATUS     │ DEFICIT          │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │ TOTAL ADS           │ 500      │ [X]    │ PASS/FAIL  │ [500-X if fail]  │ │
│  │ Meta Ads            │ 200      │ [X]    │ PASS/FAIL  │ [deficit]        │ │
│  │ TikTok Ads          │ 150      │ [X]    │ PASS/FAIL  │ [deficit]        │ │
│  │ Google Ads          │ 100      │ [X]    │ PASS/FAIL  │ [deficit]        │ │
│  │ Other Platform Ads  │ 50*      │ [X]    │ PASS/FAIL  │ [deficit]        │ │
│  │ Competitor Brands   │ 10       │ [X]    │ PASS/FAIL  │ [deficit]        │ │
│  │ Platforms Covered   │ 2        │ [X]    │ PASS/FAIL  │ [deficit]        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  * Other Platform Ads required ONLY if vertical profile includes them.      │
│  OVERALL: [PASS - proceed] or [FAIL - expand before proceeding]            │
└─────────────────────────────────────────────────────────────────────────────┘
```

**IF OVERALL = FAIL:** You MUST expand (return to 1.1-1.4) before attempting Layer 2.

**Gate 1 — Layer 1 Complete:**

```yaml
# LAYER_1_COMPLETE.yaml
gate: GATE_1
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  total_ads_scraped: "[integer >= 500]"
  meta_ads: "[integer >= 200]"
  tiktok_ads: "[integer >= 150]"
  google_ads: "[integer >= 100]"
  competitor_brands_with_ads: "[integer >= 10]"
  platforms_covered: "[integer >= 2]"
  duplicates_removed: true
  all_required_fields_populated: true

expansion_rounds_completed: "[0-3]"

microskill_outputs:
  - id: "1.1"
    file: "layer-1-outputs/1.1-meta-ad-library-scraper.md"
    size_bytes: "[integer]"
    minimum_met: true
    ads_extracted: "[integer]"
  - id: "1.2"
    file: "layer-1-outputs/1.2-tiktok-creative-center-scraper.md"
    size_bytes: "[integer]"
    minimum_met: true
    ads_extracted: "[integer]"
  - id: "1.3"
    file: "layer-1-outputs/1.3-google-ads-transparency-scraper.md"
    size_bytes: "[integer]"
    minimum_met: true
    ads_extracted: "[integer]"
  - id: "1.4"
    file: "layer-1-outputs/1.4-additional-platform-scanner.md"
    size_bytes: "[integer]"
    minimum_met: true
    ads_extracted: "[integer]"
    executed: "[true/false — false if vertical profile excludes additional platforms]"
  - id: "1.5"
    file: "layer-1-outputs/1.5-raw-data-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF total_ads_scraped < 500: GATE CLOSED — continue scraping
IF competitor_brands_with_ads < 10: GATE CLOSED — expand competitor list
IF platforms_covered < 2: GATE CLOSED — add platform
```

---

> **CRITICAL CONSTRAINTS REMINDER:** Read ANTI-DEGRADATION.md. Every microskill produces its own file. Gates are PASS/FAIL only. Numbers are exact.

### Layer 2: Classification & Analysis

**Purpose:** Classify every scraped ad across 4 dimensions: hook type (from 32-type taxonomy), format, visual style, and estimated run duration. This layer produces the structured data that enables Layer 3 synthesis.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 2.1 | `2.1-hook-type-classifier.md` | Classify every scraped ad's hook against the 32-type taxonomy from `AD-HOOK-TAXONOMY.md`. Output per ad: `hook_type` (from taxonomy), `hook_category` (A-J), `hook_text` (verbatim first 3 seconds / first line), `confidence_score` (1-10). 100% of ads must be classified. Ads that don't fit a single type get classified as the CLOSEST type with a note. No "unclassified" bucket. | opus |
| 2.2 | `2.2-format-analyzer.md` | Classify each ad by format: video (with length), static image, carousel, stories/reels. Calculate format distribution percentages per platform and overall. Identify format x platform patterns (e.g., "TikTok is 90% video under 30s"). | opus |
| 2.3 | `2.3-visual-style-analyzer.md` | Classify each ad's visual style: UGC (user-generated content feel), polished/professional, motion graphics, text-overlay heavy, product demo, lifestyle, before/after, split-screen, green screen. Identify dominant visual patterns per competitor brand. Calculate visual style distribution per platform. | opus |
| 2.4 | `2.4-copy-pattern-extractor.md` | Extract copy patterns from all scraped ads. Headline patterns (most common structures, word counts). Body copy patterns (sentence lengths, paragraph structures). CTA patterns (most common CTAs, action words). Extract verbatim copy from top 50 ads (longest-running = proxy for winning). Identify copy length distribution by platform and format. | opus |
| 2.5 | `2.5-run-duration-estimator.md` | Estimate how long each ad has been running (using start date, last seen date, or platform signals). Flag ads running 90+ days as "proven winners" (TIER_WINNER). Flag ads running 30-89 days as "established performers" (TIER_PERFORMER). Flag ads running 7-29 days as "active tests" (TIER_TESTING). Flag ads running < 7 days as "new/unproven" (TIER_NEW). Calculate tier distribution per competitor brand. | opus |
| 2.6 | `2.6-layer-2-validator.md` | Verify: 100% of ads classified by hook type (zero unclassified). 100% of ads classified by format. 100% of ads classified by visual style. 100% of ads have run duration estimate. All analysis dimensions complete. No data gaps. Produce CLASSIFICATION COMPLETENESS CHECK table. | opus |
| 2.7 | Impression Scorer | Dual-signal performance scoring | opus | Tool-Assisted only |

**Execution Order:**
1. 2.1, 2.2, 2.3, 2.4, 2.5 run in parallel (independent classification dimensions)
2. 2.6 runs after all above complete (validates completeness)

**MANDATORY CLASSIFICATION COMPLETENESS CHECK:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CLASSIFICATION COMPLETENESS CHECK - [timestamp]                            │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ DIMENSION         │ TOTAL ADS │ CLASSIFIED │ % COMPLETE │ STATUS      │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │ Hook Type         │ [X]       │ [X]        │ [X]%       │ PASS/FAIL   │ │
│  │ Format            │ [X]       │ [X]        │ [X]%       │ PASS/FAIL   │ │
│  │ Visual Style      │ [X]       │ [X]        │ [X]%       │ PASS/FAIL   │ │
│  │ Copy Patterns     │ [X]       │ [X]        │ [X]%       │ PASS/FAIL   │ │
│  │ Run Duration      │ [X]       │ [X]        │ [X]%       │ PASS/FAIL   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  REQUIRED: 100% on ALL dimensions. Any row < 100% = FAIL.                  │
│  OVERALL: [PASS - proceed] or [FAIL - classify remaining]                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Gate 2 — Layer 2 Complete:**

```yaml
# LAYER_2_COMPLETE.yaml
gate: GATE_2
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  hook_type_classification_pct: 100
  format_classification_pct: 100
  visual_style_classification_pct: 100
  copy_patterns_extracted: true
  run_duration_estimated_pct: 100
  top_50_verbatim_copy_extracted: true
  all_dimensions_complete: true
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "2.1"
    file: "layer-2-outputs/2.1-hook-type-classifier.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      ads_classified: "[integer — must equal total scraped]"
      hook_types_found: "[integer — how many of the 32 types are represented]"
  - id: "2.2"
    file: "layer-2-outputs/2.2-format-analyzer.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.3"
    file: "layer-2-outputs/2.3-visual-style-analyzer.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.4"
    file: "layer-2-outputs/2.4-copy-pattern-extractor.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      verbatim_copies_extracted: "[integer >= 50]"
  - id: "2.5"
    file: "layer-2-outputs/2.5-run-duration-estimator.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      tier_winner_count: "[integer]"
      tier_performer_count: "[integer]"
  - id: "2.6"
    file: "layer-2-outputs/2.6-layer-2-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF any classification_pct < 100: GATE CLOSED — classify remaining ads
IF top_50_verbatim_copy_extracted = false: GATE CLOSED — extract copy
IF validator_verdict != PASS: GATE CLOSED — address validation failures
```

---

> **CRITICAL CONSTRAINTS REMINDER:** Read ANTI-DEGRADATION.md. Every microskill produces its own file. Gates are PASS/FAIL only. Numbers are exact.

### Layer 3: Intelligence Synthesis

**Purpose:** Transform classified data into actionable intelligence. Identify competitive landscape, hook type distribution, format patterns, winning specimens, and opportunity gaps.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 3.1 | `3.1-competitive-landscape-map.md` | Map competitor brands by: estimated ad volume (how many ads running), platform focus (which platforms they prioritize), creative strategy (dominant hook types, formats, visual styles), estimated market position (leader/challenger/niche). Identify the top 3 market leaders and their creative strategies. | opus |
| 3.2 | `3.2-hook-type-distribution.md` | Calculate prevalence of each of the 32 hook types across all scraped ads. Identify: overused types (saturated — top 5 by frequency), underused types (opportunity — bottom 10 by frequency), hook types with high TIER_WINNER representation (types that appear disproportionately in long-running ads). Cross-reference with AD-HOOK-TAXONOMY.md performance benchmark data. Calculate hook type diversity per competitor (are they stuck in 3 types or using 15?). | opus |
| 3.3 | `3.3-format-platform-intelligence.md` | Platform-specific format distribution (e.g., "Meta: 55% video, 30% static, 15% carousel"). Platform-specific hook type distribution (which hook types work on which platforms). Platform-specific visual style patterns. Identify platform-specific winning patterns (format x hook type x visual style combinations that appear in TIER_WINNER ads). | opus |
| 3.4 | `3.4-winning-ad-specimens.md` | Extract top 20 ads (longest running / TIER_WINNER) as full specimens. For each specimen: full verbatim copy transcription (headline, body, CTA — exact text), hook type classification (from taxonomy), hook text (first 3 seconds / first line), format and visual style notes, platform it ran on, competitor brand, estimated run duration, why it was selected (what makes this a winner). These specimens become input for downstream ad generation (A02-A05). | opus |
| 3.5 | `3.5-opportunity-gap-analysis.md` | Identify underused hook types that have high performance data (from AD-HOOK-TAXONOMY.md benchmarks). Identify format gaps (e.g., "no competitors using carousel in a vertical where carousel data is strong"). Identify messaging gaps by comparing ad intelligence with Skill 01 research output (pain points discovered in research that NO competitor is addressing in ads). Identify visual style gaps (e.g., "all competitors using polished production, zero UGC in a vertical where UGC outperforms"). Rank opportunities by estimated impact (high/medium/low). | opus |
| 3.6 | `3.6-trend-detection.md` | **CONTINUOUS MONITOR MODE ONLY — skip in Initial Scan.** Compare current scan to previous scan (load previous AD-INTELLIGENCE-HANDOFF.md). Identify: new ads launched since last scan, retired ads (no longer running), format shifts (e.g., "carousel up 15% this month"), hook type shifts (e.g., "UGC testimonial hooks surging"), new competitor entrants, competitors scaling (increasing ad volume). Flag emerging patterns for A02 attention. | opus |
| 3.7 | `3.7-layer-3-validator.md` | Verify all synthesis outputs complete. Verify competitive landscape covers all 10+ competitors. Verify hook distribution covers all 32 types (even if some are 0%). Verify winning specimens have full verbatim copy. Verify opportunity gaps are actionable (not vague). Verify trend detection ran if Continuous Monitor mode. | opus |
| 3.8 | Impression-Weighted Analysis | Performance-weighted distributions | opus | Tool-Assisted only |

**Execution Order:**
1. 3.1, 3.2, 3.3 run in parallel (independent analysis dimensions)
2. 3.4 after 2.5 complete (needs run duration tiers from Layer 2)
3. 3.5 after 3.1, 3.2, 3.3 complete (needs all analysis to identify gaps)
4. 3.6 runs after 3.2 and 3.3 (needs distribution data for comparison) — ONLY in Continuous Monitor mode
5. 3.7 runs after all above complete (validates completeness)

**Gate 3 — Layer 3 Complete:**

```yaml
# LAYER_3_COMPLETE.yaml
gate: GATE_3
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  competitive_landscape_brands: "[integer >= 10]"
  hook_distribution_types_covered: 32
  format_platform_analysis_complete: true
  winning_specimens_extracted: "[integer >= 20]"
  winning_specimens_have_verbatim_copy: true
  opportunity_gaps_identified: "[integer >= 5]"
  opportunity_gaps_ranked: true
  trend_detection_executed: "[true if Continuous Monitor / N/A if Initial Scan]"
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "3.1"
    file: "layer-3-outputs/3.1-competitive-landscape-map.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.2"
    file: "layer-3-outputs/3.2-hook-type-distribution.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.3"
    file: "layer-3-outputs/3.3-format-platform-intelligence.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.4"
    file: "layer-3-outputs/3.4-winning-ad-specimens.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      specimens_extracted: "[integer >= 20]"
      all_have_verbatim_copy: true
  - id: "3.5"
    file: "layer-3-outputs/3.5-opportunity-gap-analysis.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      gaps_identified: "[integer >= 5]"
  - id: "3.6"
    file: "layer-3-outputs/3.6-trend-detection.md"
    size_bytes: "[integer — 0 if Initial Scan mode]"
    minimum_met: "[true / N/A]"
    executed: "[true if Continuous Monitor / false if Initial Scan]"
  - id: "3.7"
    file: "layer-3-outputs/3.7-layer-3-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF winning_specimens_extracted < 20: GATE CLOSED — extract more specimens
IF winning_specimens_have_verbatim_copy = false: GATE CLOSED — transcribe copy
IF opportunity_gaps_identified < 5: GATE CLOSED — deepen analysis
IF validator_verdict != PASS: GATE CLOSED — address validation failures
```

---

> **CRITICAL CONSTRAINTS REMINDER:** Read ANTI-DEGRADATION.md. Every microskill produces its own file. Gates are PASS/FAIL only. Numbers are exact.

### Layer 4: Output Packaging

**Purpose:** Assemble all Layer 1-3 outputs into the primary deliverable: AD-INTELLIGENCE-HANDOFF.md. This is an ASSEMBLY operation — it combines pre-validated artifacts, it does NOT generate new analysis.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 4.1 | `4.1-handoff-assembler.md` | Assemble AD-INTELLIGENCE-HANDOFF.md from all Layer 1-3 outputs. Include all 10 required sections (see Output Schema below). Minimum size: 100KB. Use chunked assembly (8-12 write operations) because LLMs have ~30KB output limits per response. Size checkpoints at each phase. | sonnet |
| 4.2 | `4.2-execution-log.md` | Produce execution-log.md with per-microskill entries. Each entry: spec file read confirmation, output file created, output file size, key metrics, gate status. | sonnet |
| 4.3 | `4.3-checkpoint-files.md` | Create all checkpoint YAML files. Verify all output files exist with sizes. Create LAYER_4_COMPLETE.yaml. | sonnet |

**Execution Order:**
1. 4.1 first (primary deliverable)
2. 4.2 after 4.1 (logs assembly process)
3. 4.3 after 4.2 (final checkpoint)

**Gate 4 — Layer 4 Complete (Skill Complete):**

```yaml
# LAYER_4_COMPLETE.yaml
gate: GATE_4
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  handoff_file_exists: true
  handoff_file_path: "AD-INTELLIGENCE-HANDOFF.md"
  handoff_file_size_kb: "[integer >= 100]"
  all_10_sections_populated: true
  execution_log_exists: true
  all_checkpoint_files_exist: true

post_assembly_size_validation:
  file_size_kb: "[integer]"
  minimum_required_kb: 100
  status: "[PASS if >= 100KB / FAIL if < 100KB]"

IF handoff_file_size_kb < 100: GATE CLOSED — re-assemble with chunked protocol
IF any section missing or empty: GATE CLOSED — complete missing sections
```

---

## OUTPUT SCHEMA: AD-INTELLIGENCE-HANDOFF.md

**Minimum size: 100KB.** This is a comprehensive intelligence document, not a summary.

**Chunked Assembly Required:** LLMs have ~30KB output limits per response. A 100KB+ file CANNOT be assembled in a single write. Use 8-12 write operations across 3 phases:

```
PHASE 1: SKELETON + EXECUTIVE SUMMARY (>= 5KB)
  Write file structure with all 10 section headers + Section 1 (Executive Summary)

PHASE 2: COMPETITIVE + DISTRIBUTION DATA (>= 30KB cumulative)
  Append Sections 2-5 (Competitor Landscape, Hook Type Distribution,
  Format Distribution, Visual Style Analysis)

PHASE 3: SPECIMENS + INTELLIGENCE (>= 100KB cumulative)
  Append Sections 6-10 (Winning Ad Specimens [largest section],
  Emerging Trends, Opportunity Gaps, Platform Intelligence, Recommended Hooks)

SIZE CHECKPOINTS (BLOCKING):
  After Phase 1: File >= 5KB   → IF NOT: HALT
  After Phase 2: File >= 30KB  → IF NOT: HALT
  After Phase 3: File >= 100KB → IF NOT: HALT
```

### The 10 Required Sections

```markdown
# AD-INTELLIGENCE-HANDOFF.md
## Metadata
- Project: [name]
- Mode: [Initial Scan / Continuous Monitor]
- Scan Date: [ISO 8601]
- Previous Scan Date: [ISO 8601 if Continuous Monitor, N/A if Initial Scan]
- Total Ads Scraped: [integer]
- Competitor Brands Analyzed: [integer]
- Platforms Covered: [list]

## Section 1: Executive Summary
- Market overview: size, dominant players, competitive intensity
- Dominant creative patterns: what most competitors are doing
- Key opportunity signals: where the market is NOT looking
- Top 3 recommended hook types for this campaign (with rationale)
- 3-sentence intelligence summary for quick consumption

## Section 2: Competitor Landscape
- For each competitor brand (10+):
  - Brand name and URL
  - Estimated ad volume (total ads found)
  - Platforms active on
  - Dominant hook types (top 3)
  - Dominant formats (top 2)
  - Dominant visual style
  - Estimated market position (leader / challenger / niche)
  - Notable creative strategies
- Market leader vs. challenger analysis
- Competitive intensity score (how crowded is this market)

## Section 3: Hook Type Distribution
- Distribution table: all 32 hook types with:
  - Count of ads using this type
  - Percentage of total
  - Representation in TIER_WINNER ads (percentage)
  - Saturation assessment (oversaturated / balanced / underused / absent)
- Top 5 most prevalent hook types (with examples)
- Bottom 10 least used hook types (opportunity zones)
- Hook type diversity score per competitor
- Cross-reference with AD-HOOK-TAXONOMY.md performance benchmarks

## Section 4: Format Distribution
- Overall format distribution (video / static / carousel / stories-reels)
- Platform-specific format distribution table
- Video length distribution (6s / 15s / 30s / 60s / 2-3min)
- Format x hook type cross-tabulation (which hooks use which formats)
- Format trends (if Continuous Monitor: change from previous scan)

## Section 5: Visual Style Analysis
- Visual style distribution (UGC / polished / motion graphics / text-overlay /
  product demo / lifestyle / before-after / split-screen / green screen)
- Platform-specific visual style patterns
- Competitor-specific visual style profiles
- Visual style x performance correlation (which styles appear in TIER_WINNER ads)
- Visual production quality assessment (is the market UGC-heavy or polished-heavy?)

## Section 6: Winning Ad Specimens (Top 20)
- For each of the top 20 ads (longest-running / TIER_WINNER):
  - Specimen ID (WS-001 through WS-020)
  - Competitor brand
  - Platform
  - Format and length
  - VERBATIM copy transcription:
    - Headline / hook text (exact first 3 seconds or first line)
    - Full body copy / script (exact text)
    - CTA (exact text)
  - Hook type classification (from taxonomy)
  - Visual style classification
  - Estimated run duration
  - Why this ad is a winner (specific analysis)
  - Key patterns to learn from this specimen
- NOTE: This section should be the LARGEST section. 20 full verbatim transcriptions
  with analysis will be 30-50KB alone. Do NOT summarize specimens.

## Section 7: Emerging Trends
- Initial Scan: General market trend observations based on run duration tiers
  (what's new and getting traction vs. what's been running forever)
- Continuous Monitor: Specific changes since last scan:
  - New ads launched (count, notable examples)
  - Retired ads (count, what was pulled)
  - Format shifts (% change by format type)
  - Hook type shifts (% change by hook type)
  - New competitor entrants
  - Competitors scaling (increasing volume)
- Trend implications for this campaign

## Section 8: Opportunity Gaps
- For each identified opportunity (5+ minimum):
  - Gap type: hook type gap / format gap / messaging gap / visual style gap
  - Description: what is underused or missing
  - Evidence: specific data showing the gap
  - Estimated impact: HIGH / MEDIUM / LOW
  - Recommended action for this campaign
- Cross-reference with Skill 01 Research:
  - Pain points from research that NO competitor addresses in ads
  - Language patterns from audience that NO competitor uses in ad copy
  - Awareness level mismatches (competitors targeting wrong awareness stage)
- Opportunity ranking (prioritized for this campaign)

## Section 9: Platform-Specific Intelligence
- For each platform (Meta, TikTok, Google, others):
  - Platform ad volume and competitive density
  - Platform-specific winning patterns (format x hook x visual combinations)
  - Platform-specific compliance constraints
  - Platform-specific creative recommendations
  - Sound-on vs. sound-off patterns (Meta / TikTok)
  - Vertical vs. horizontal format distribution
  - CTA button / format recommendations

## Section 10: Recommended Hooks for This Campaign
- Top 10 hook types to prioritize, ranked by:
  1. Performance data from AD-HOOK-TAXONOMY.md
  2. Competitive gap (underused by competitors = opportunity)
  3. Alignment with Skill 01 research (audience language/pain/hope)
  4. Vertical profile recommendations
- For each recommended hook type:
  - Taxonomy classification (type and category)
  - Why this type for this campaign (specific rationale)
  - Example from winning specimens (reference WS-XXX)
  - Platform recommendation (which platform to deploy this type on)
  - Estimated competition level (low / medium / high)
- These 10 recommendations flow directly into A02 (Hook & Angle Discovery)
```

---

## GATE ARCHITECTURE — COMPLETE REFERENCE

### Gate Summary Table

| Gate | Location | Blocks | Key Criteria | Expansion Protocol |
|------|----------|--------|--------------|-------------------|
| GATE_0 | Layer 0 → Layer 1 | Scraping entry | Campaign Brief loaded, MCP tools validated, 10+ competitors listed | Fix missing inputs |
| GATE_1 | Layer 1 → Layer 2 | Classification entry | 500+ ads scraped, 10+ brands covered, 2+ platforms | 3 expansion rounds, then human escalation |
| GATE_2 | Layer 2 → Layer 3 | Synthesis entry | 100% classification on all dimensions | Classify remaining |
| GATE_3 | Layer 3 → Layer 4 | Output entry | 20+ winning specimens with verbatim copy, 5+ opportunity gaps | Deepen analysis |
| GATE_4 | Skill completion | Downstream consumption | AD-INTELLIGENCE-HANDOFF.md exists at 100KB+ | Re-assemble with chunked protocol |

### Structural Checkpoint Files

```
[project]/A01-ad-intelligence/checkpoints/
  LAYER_0_COMPLETE.yaml
  LAYER_1_COMPLETE.yaml
  LAYER_2_COMPLETE.yaml
  LAYER_3_COMPLETE.yaml
  LAYER_4_COMPLETE.yaml
```

**IF checkpoint file does not exist, the next layer is BLOCKED.**

### Gate Failure Response Protocol

```
GATE FAILED → DO NOT proceed. DO NOT invent new gate statuses.
Gate status can ONLY be PASS or FAIL.

EXPANSION ROUND 1:
  1. IDENTIFY which metrics failed (from volume/completeness check table)
  2. For scraping failures: Add 5+ new sources per deficit platform
  3. For classification failures: Classify unprocessed ads
  4. For synthesis failures: Deepen analysis on incomplete dimensions
  5. UPDATE PROJECT-STATE.md with new counts
  6. Re-run the relevant check table
  7. IF PASS → proceed. IF FAIL → ROUND 2.

EXPANSION ROUND 2:
  1. IDENTIFY REMAINING deficits
  2. For scraping: Try DIFFERENT Apify actors, different search queries
  3. For classification: Review unclassifiable ads with human guidance
  4. For synthesis: Add cross-references, deepen competitive analysis
  5. UPDATE PROJECT-STATE.md
  6. Re-run check
  7. IF PASS → proceed. IF FAIL → ROUND 3.

EXPANSION ROUND 3:
  1. IDENTIFY REMAINING deficits
  2. Use all available fallback tools
  3. Manual discovery if automated tools insufficient
  4. UPDATE PROJECT-STATE.md
  5. Re-run check
  6. IF PASS → proceed. IF FAIL → ESCALATE TO HUMAN.

HUMAN ESCALATION (only after ALL 3 rounds):
  Present exact metrics vs targets, what was tried, why platform/market may lack data.
  Options: (a) approve reduced threshold, (b) provide competitor names, (c) suggest sources, (d) adjust scope.
```

### Forbidden Rationalizations (IMMEDIATE HALT)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  IF ANY OF THESE PHRASES APPEAR IN GATE REASONING, THE GATE CHECK           │
│  IS INVALID AND EXECUTION MUST HALT IMMEDIATELY.                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

| Rationalization | Why Forbidden | Required Response |
|-----------------|---------------|-------------------|
| "representative sample of competitor ads" | ALL competitors on the list must be scanned. Sampling is forbidden. | HALT — scan remaining competitors |
| "the top ads are sufficient" | Classification must cover 100% of scraped ads, not just "top" ones. | HALT — classify ALL ads |
| "this platform isn't relevant" | Minimum 2 platforms is mandatory. Platform relevance was determined at Layer 0 by vertical profile. | HALT — scrape the required platforms |
| "500 is approximately 500" / "close enough" | Numbers are exact. 499 is not 500. | HALT — scrape until threshold met |
| "quality over quantity" | BOTH required. Quality assessment happens AFTER quantity threshold met. | HALT — meet quantity first |
| "we have enough for analysis" | "Enough" is defined by exact thresholds, not subjective assessment. | HALT — meet thresholds |
| "the market doesn't have that many ads" | This requires verification through 3 expansion rounds before escalation. | HALT — run expansion rounds |
| "I can infer the patterns from a subset" | Inference from subset is sampling. 100% classification is required. | HALT — classify all |
| "partial pass" / "conditional pass" | Does not exist. Gates are PASS or FAIL only. | HALT — gates are binary |
| "these 300 ads are highly representative" | 300 is not 500. Numbers are exact. | HALT — continue scraping |

---

## ANTI-DEGRADATION ENFORCEMENT

### Session Startup Protocol (MANDATORY)

```
BEFORE executing ANY A01 skill:
  1. READ: A01-AD-INTELLIGENCE-ANTI-DEGRADATION.md (full file)
  2. READ: A01-AD-INTELLIGENCE-AGENT.md (this file)
  3. READ: PROJECT-STATE.md (current phase and counts)
  4. VERIFY: Which layer are you in? What gate must pass next?
  5. VERIFY: What are the current scraping/classification counts?

  IF you have NOT read the anti-degradation file:
    ┌────────────────────────────────────────────────────────────────────┐
    │  STRUCTURAL BLOCK: ANTI-DEGRADATION NOT READ                      │
    │                                                                    │
    │  You CANNOT execute A01 skills without reading the anti-           │
    │  degradation file. This is not optional.                          │
    │                                                                    │
    │  ACTION: READ A01-AD-INTELLIGENCE-ANTI-DEGRADATION.md first.     │
    └────────────────────────────────────────────────────────────────────┘
    HALT — DO NOT PROCEED
```

### Specific Anti-Degradation Rules for A01

```
RULE 1: 500 IS NOT 200. NUMBERS ARE EXACT.
  The scraping threshold is 500 ads. Not "approximately 500."
  Not "a representative sample of 350." Not "enough for analysis at 280."
  500 means 500. COUNT them. VERIFY the count.

RULE 2: ALL COMPETITORS MUST BE SCANNED.
  If the competitor list has 15 brands, all 15 must be scraped.
  "The top 8 brands cover 90% of market share" is NOT acceptable.
  The long tail often reveals the most interesting creative strategies.

RULE 3: 100% CLASSIFICATION. NO EXCEPTIONS.
  Every scraped ad must be classified on every dimension.
  "95% classified, the remaining 5% were edge cases" is NOT acceptable.
  Edge cases get classified as the CLOSEST type with a documented note.

RULE 4: VERBATIM MEANS VERBATIM.
  Winning ad specimens must contain EXACT copy text.
  "The ad promotes a gut health supplement with a doctor hook" is NOT a specimen.
  The EXACT headline, body copy, and CTA text must be transcribed character by character.

RULE 5: 100KB IS THE FLOOR, NOT THE CEILING.
  AD-INTELLIGENCE-HANDOFF.md must be 100KB minimum.
  If the file is 50KB, it is a summary, not intelligence.
  20 full verbatim specimen transcriptions alone should be 30-50KB.
  Use chunked assembly (8-12 write operations).

RULE 6: OPPORTUNITY GAPS MUST BE ACTIONABLE.
  "There are opportunities in the market" is not a gap analysis.
  Each gap must specify: what is underused, the evidence, estimated impact, and
  recommended action. Vague observations are not intelligence.
```

### A01-Specific MC-CHECK (Every 30 minutes during execution)

```yaml
A01-MC-CHECK:
  current_layer: "[0/1/2/3/4]"
  ads_scraped_total: "[exact count]"
  ads_scraped_vs_target: "[X/500]"
  platforms_covered: "[count >= 2?]"
  competitors_scanned: "[count >= 10?]"
  classification_pct: "[X% — is it 100%?]"

  am_i_sampling_instead_of_scraping_all: "[Y/N]"
  am_i_thinking_representative_sample: "[Y/N]"
  am_i_skipping_a_platform: "[Y/N]"
  am_i_summarizing_instead_of_transcribing_verbatim: "[Y/N]"
  am_i_thinking_close_enough: "[Y/N]"
  am_i_thinking_quality_over_quantity: "[Y/N]"

  IF any rationalization detected: "HALT — re-read anti-degradation rules"
  IF ads_scraped < 500: "CONTINUE SCRAPING — do not proceed to Layer 2"
  IF classification_pct < 100: "CONTINUE CLASSIFYING — do not proceed to Layer 3"
```

---

## CONTINUOUS MONITOR MODE — DETAILED PROTOCOL

### Differences from Initial Scan

| Aspect | Initial Scan | Continuous Monitor |
|--------|-------------|-------------------|
| **Input** | Campaign Brief + Vertical Profile | Campaign Brief + Vertical Profile + PREVIOUS AD-INTELLIGENCE-HANDOFF.md |
| **Layer 1 scope** | All ads from all competitors | ONLY new ads since last scan date |
| **Layer 2 scope** | Classify all scraped ads | Classify only new ads |
| **Layer 3.6** | SKIPPED | MANDATORY — Trend Detection |
| **Output** | AD-INTELLIGENCE-HANDOFF.md (100KB+) | INTELLIGENCE-UPDATE.md (delta report) |
| **Gate 1 threshold** | 500+ total ads | No minimum on new ads (market may be quiet) |
| **Frequency** | Once per project launch | Bi-weekly minimum for active campaigns |

### Continuous Monitor Layer 0 Enhancement

```
0.5 — Previous Intelligence Loader (CONTINUOUS MONITOR ONLY)
  Load previous AD-INTELLIGENCE-HANDOFF.md
  Extract: last scan date, competitor list, hook type distribution baseline,
           format distribution baseline, winning specimen list
  These become comparison baselines for Layer 3.6 (Trend Detection)
```

### Continuous Monitor Layer 1 Modification

```
Layer 1 scraping uses date filters:
  - Meta Ad Library: filter by ads started AFTER [last scan date]
  - TikTok Creative Center: filter by recency (last 14 days)
  - Google Ads Transparency: filter by date range since last scan

IF zero new ads found across all platforms:
  → This is a VALID result (market may be quiet)
  → Layer 2 and 3 still execute on existing classified data
  → Layer 3.6 reports "No new creative activity detected"
  → Output INTELLIGENCE-UPDATE.md with "no changes" assessment
```

### Continuous Monitor Output: INTELLIGENCE-UPDATE.md

```markdown
# INTELLIGENCE-UPDATE.md
## Metadata
- Project: [name]
- Scan Date: [ISO 8601]
- Previous Scan Date: [ISO 8601]
- Days Since Last Scan: [integer]
- New Ads Found: [integer]

## Delta Summary
- New ads found: [count] across [platforms]
- Ads retired since last scan: [count]
- New competitor entrants: [list or "none"]
- Competitors scaling: [list or "none"]

## Hook Type Shifts
- [Type] increased from [X]% to [Y]% (+[Z]%)
- [Type] decreased from [X]% to [Y]% (-[Z]%)
- New types appearing: [list or "none"]

## Format Shifts
- [Format] increased from [X]% to [Y]%
- [Format] decreased from [X]% to [Y]%

## New Winning Specimens (if any)
- [Specimen details for any new TIER_WINNER ads]

## Emerging Patterns
- [Observations about creative direction shifts]

## Recommended Actions
- [Specific actions based on intelligence changes]
- [Hook type adjustments for active campaign]
- [Format or platform adjustments]
```

---

## MCP INTEGRATION SPECIFICATIONS

### Apify Integration (Primary tool for Meta Ad Library)

```
TOOL: mcp__apify__call-actor
PURPOSE: Scrape Facebook/Meta Ad Library for competitor ads

RECOMMENDED ACTOR: "apify/facebook-ads-library-scraper"
  (or search for current best actor via mcp__apify__search-actors
   with query "facebook ad library")

USAGE PATTERN:
  1. Search for appropriate actor:
     mcp__apify__search-actors(query="facebook ad library scraper")

  2. Fetch actor details to understand input schema:
     mcp__apify__fetch-actor-details(actorId="[actor-id]")

  3. Call actor with competitor brand parameters:
     mcp__apify__call-actor(
       actorId="[actor-id]",
       input={
         "searchQuery": "[competitor brand name]",
         "country": "[target country, e.g., US]",
         "adType": "all",
         "mediaType": "all",
         "maxResults": 50  # per competitor — adjust based on actor limits
       }
     )

  4. Get results:
     mcp__apify__get-actor-run(runId="[run-id]")
     mcp__apify__get-actor-output(runId="[run-id]")

PAGINATION:
  - If actor supports pagination, iterate through ALL pages
  - Do NOT stop at first page of results
  - Track total results extracted per competitor

RATE LIMITING:
  - Space actor calls by 5-10 seconds between competitors
  - If rate limited, wait 60 seconds and retry
  - Log all rate limit encounters in execution log

PER-COMPETITOR EXTRACTION:
  - Run actor ONCE per competitor brand (not one massive query)
  - This ensures complete coverage per brand
  - Track: brand_name, ads_found, pages_scraped
```

### Apify Integration (TikTok Creative Center)

```
TOOL: mcp__apify__call-actor
PURPOSE: Scrape TikTok Creative Center top ads

RECOMMENDED ACTOR: Search for "tiktok creative center" or "tiktok ads"
  via mcp__apify__search-actors

USAGE PATTERN:
  1. Search for TikTok-specific actor:
     mcp__apify__search-actors(query="tiktok creative center ads")

  2. If actor exists, follow same pattern as Meta above

  3. If NO Apify actor available for TikTok, FALLBACK to Firecrawl:
     Use Firecrawl to scrape TikTok Creative Center website directly
     (see Firecrawl integration below)
```

### Firecrawl Integration (Fallback scraping + Google Ads)

```
TOOL: mcp__firecrawl-mcp__firecrawl_scrape
PURPOSE: Direct web scraping when Apify actors are unavailable

USAGE FOR TIKTOK CREATIVE CENTER:
  mcp__firecrawl-mcp__firecrawl_scrape(
    url="https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en",
    formats=["markdown"],
    waitFor=5000  # TikTok pages load dynamically
  )

USAGE FOR GOOGLE ADS TRANSPARENCY CENTER:
  mcp__firecrawl-mcp__firecrawl_scrape(
    url="https://adstransparency.google.com/?region=US&topic=[category]",
    formats=["markdown"],
    waitFor=3000
  )

PAGINATION WITH FIRECRAWL:
  - For multi-page results, construct next-page URLs manually
  - Scrape each page separately
  - Track total pages scraped per source

ALTERNATIVE FIRECRAWL TOOLS:
  - mcp__firecrawl-mcp__firecrawl_map: Map site structure to find ad listing pages
  - mcp__firecrawl-mcp__firecrawl_crawl: Crawl multiple pages from a starting URL
  - mcp__firecrawl-mcp__firecrawl_search: Search for specific ad content
```

### Error Handling Protocol

```
MCP TOOL FAILURE HIERARCHY:

LEVEL 1: Transient failure (timeout, rate limit)
  → Wait 30 seconds
  → Retry up to 3 times
  → Log each retry in execution log

LEVEL 2: Actor/tool not found
  → Search for alternative actor: mcp__apify__search-actors(query="[platform] ads")
  → If alternative found, use alternative and document in execution log
  → If NO alternative, fall back to Firecrawl direct scraping

LEVEL 3: Platform blocked / inaccessible
  → Log the failure with specific error
  → Attempt Firecrawl as fallback
  → If Firecrawl also fails, attempt Perplexity deep research as last resort:
    mcp__perplexity__perplexity_research(query="[competitor brand] [platform] ad examples")
  → Log what was accessible and what was not

LEVEL 4: All tools fail for a platform
  → Log comprehensive failure report
  → Continue with other platforms
  → At Gate 1: if total ads < 500 or platforms < 2, begin expansion protocol
  → At expansion round 3: escalate to human with tool failure report

CRITICAL RULE:
  Tool failure does NOT excuse missing thresholds.
  If Meta scraper fails, you MUST try alternatives before declaring the platform unreachable.
  Only after ALL fallbacks fail can you escalate to human.
```

### MCP Tool Validation (Layer 0.2)

```
AT LAYER 0.2, validate BOTH MCP servers:

FIRECRAWL VALIDATION:
  Test: mcp__firecrawl-mcp__firecrawl_scrape(
    url="https://example.com",
    formats=["markdown"]
  )
  Expected: Successful response with content
  If fails: LOG "Firecrawl MCP unavailable" — GATE_0 BLOCKED until resolved

APIFY VALIDATION:
  Test: mcp__apify__search-actors(query="facebook")
  Expected: List of actor results
  If fails: LOG "Apify MCP unavailable" — GATE_0 BLOCKED until resolved

BOTH MUST PASS for GATE_0 to open.
If one fails, the orchestrator MUST attempt to resolve (check MCP server configuration,
restart server, etc.) before declaring the tool unavailable.
```

---

## SUBAGENT CONTEXT TEMPLATE

**Every subagent spawned by the A01 orchestrator MUST receive this structured context. Ad-hoc prompts like "scrape Meta for ads" are FORBIDDEN.**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  SUBAGENT CONTEXT TEMPLATE — ALL 8 SECTIONS MANDATORY                        │
│  Do NOT spawn a subagent without all 8 sections populated.                   │
│  Ad-hoc prompts produce ad-hoc results.                                      │
└──────────────────────────────────────────────────────────────────────────────┘

## 1. MODEL
[haiku | sonnet | opus — from Binding Model Assignment Table]

## 2. PERSONA
[Task-specific persona from the Persona Library below]

## 3. OBJECTIVE
[Exact task description — what this subagent must produce]

## 4. SCRAPING/CLASSIFICATION TARGETS
[Exact numeric targets from this agent file]
- Total ads to scrape: [X]
- Platform: [specific platform]
- Competitors to cover: [list or count]
- Classification dimensions: [list if Layer 2]

## 5. INPUTS
[Exact file paths the subagent must read]
- Campaign Brief: [path]
- Competitor List: [path]
- Previous outputs: [paths if any]
- AD-HOOK-TAXONOMY.md: [path — REQUIRED for Layer 2 classification]

## 6. CONSTRAINTS
[Skill-specific rules that apply to this subagent]
- Verbatim extraction only (no paraphrasing)
- All required fields must be populated
- Date range filter: [if Continuous Monitor]

## 7. ERROR HANDLING
[What to do if tool fails]
- Retry protocol: 3 retries with 30-second waits
- Fallback tool: [specific fallback]
- Escalation: log failure and continue with other tasks

## 8. OUTPUT FORMAT
[Exact output file path and required structure]
- Output file: [path]
- Required sections: [list]
- Minimum size: [X]KB
```

### Subagent Persona Library

#### PERSONA_AD_SCRAPER (Skills 1.1–1.4)

```
You are an exhaustive ad data collector. Your ONLY job is extracting COMPLETE ad data
from advertising platforms. You extract EVERY ad you find — you do NOT filter, curate,
or judge quality. You extract the EXACT text of every headline, body copy, and CTA.
You record the EXACT format, platform, and all available metadata.

You are contributing to a project that needs 500+ total ads scraped. Every ad you miss
is an ad the project doesn't have. Extract MORE than you think you need. When in doubt,
extract it. An ad that gets filtered later costs nothing. An ad you missed is gone forever.

CRITICAL: You extract VERBATIM text. "A doctor recommends a supplement" is NOT extraction.
"Board-Certified Cardiologist Dr. Steven Gundry reveals the #1 food destroying your gut"
IS extraction. Character for character. No paraphrasing. No summarizing.
```

#### PERSONA_HOOK_CLASSIFIER (Skill 2.1)

```
You are an expert ad hook classifier. You have internalized the 32-type hook taxonomy
from AD-HOOK-TAXONOMY.md and can classify any hook into its correct type with high
confidence. You classify 100% of ads — there is no "unclassifiable" bucket. If a hook
doesn't fit perfectly, you assign the CLOSEST type and add a classification note.

For every ad, you identify:
1. The hook TYPE (one of 32 types)
2. The hook CATEGORY (A through J)
3. The hook TEXT (verbatim first 3 seconds or first line)
4. Your confidence score (1-10)

You do NOT skip ads. You do NOT batch-classify ("these 50 are all curiosity hooks").
Each ad gets individual classification with specific reasoning.
```

#### PERSONA_AD_ANALYST (Skills 2.2–2.5)

```
You are a meticulous ad format and style analyst. You classify every ad across multiple
dimensions with precision. You do NOT use vague categories. "Professional-looking" is
NOT a visual style classification. "Polished studio production with product close-ups
on white background" IS.

You track patterns across competitors and platforms. You notice when Competitor A uses
90% video but Competitor B uses 60% static. You notice when TikTok ads are all under
30 seconds but YouTube ads run 2-3 minutes. These patterns are intelligence.

You produce COMPLETE classification — 100% of ads on 100% of dimensions.
```

#### PERSONA_INTELLIGENCE_SYNTHESIZER (Skills 3.1–3.5)

```
You are a strategic ad intelligence analyst. You transform classified data into
actionable competitive intelligence. You identify what competitors ARE doing (landscape),
what they are NOT doing (gaps), and what is WORKING (winning patterns).

Your analysis is specific and actionable. "There are opportunities in underused hook
types" is NOT intelligence. "Hook type D3 (Testimonial/UGC) represents 28% of
TIER_WINNER ads but only 8% of total ads — competitors are underweighting the
highest-performing hook type" IS intelligence.

You cross-reference ad data with market research (Skill 01 output) to find messaging
gaps: audience pain points that NO competitor is addressing in their ads.
```

#### PERSONA_SPECIMEN_EXTRACTOR (Skill 3.4)

```
You are a forensic ad copy transcriber. Your job is extracting the TOP 20 winning ads
as complete specimens with VERBATIM copy transcription. Every word, every punctuation
mark, every line break matters.

A specimen is NOT a summary. "This ad uses a doctor authority hook to promote a gut
health supplement" is NOT a specimen. A specimen is:

Headline: "Board-Certified Cardiologist Reveals the #1 Food Destroying Your Gut"
Body: "If you've been eating this 'healthy' vegetable, you need to watch this
immediately. Dr. Steven Gundry, a world-renowned heart surgeon who's performed
over 10,000 open-heart surgeries, has discovered that a specific plant protein
called lectin is wreaking havoc on your digestive system..."
CTA: "Watch the Free Presentation"

Character for character. Full transcription. No shortcuts.
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce its own dedicated output file. File existence is binary verification. File contents enable quality audit.

### Output File Naming Convention

```
[project]/A01-ad-intelligence/layer-[N]-outputs/[microskill-id]-[short-name].md

Examples:
  A01-ad-intelligence/layer-0-outputs/0.0.1-vertical-profile-loader.md
  A01-ad-intelligence/layer-0-outputs/0.1-campaign-brief-loader.md
  A01-ad-intelligence/layer-0-outputs/0.2-mcp-tool-validator.md
  A01-ad-intelligence/layer-0-outputs/0.3-competitor-list-builder.md
  A01-ad-intelligence/layer-1-outputs/1.1-meta-ad-library-scraper.md
  A01-ad-intelligence/layer-1-outputs/1.2-tiktok-creative-center-scraper.md
  A01-ad-intelligence/layer-2-outputs/2.1-hook-type-classifier.md
  A01-ad-intelligence/layer-3-outputs/3.1-competitive-landscape-map.md
  A01-ad-intelligence/layer-3-outputs/3.4-winning-ad-specimens.md
  A01-ad-intelligence/layer-4-outputs/4.1-handoff-assembler.md
```

### Minimum File Size Thresholds

| Microskill Type | Minimum Size | Examples |
|-----------------|-------------|---------|
| **Loader/Validator** (Layer 0) | 1KB | Input verification, MCP validation, competitor list |
| **Scraper Output** (Layer 1) | 5KB per platform | Raw scraped ad data with all fields |
| **Classification Output** (Layer 2) | 5KB per dimension | Hook type assignments, format analysis |
| **Synthesis Output** (Layer 3) | 5KB per analysis | Competitive landscape, distribution analysis |
| **Specimen Extraction** (Layer 3.4) | 30KB | 20 verbatim specimens with analysis |
| **Handoff Assembly** (Layer 4) | 100KB | AD-INTELLIGENCE-HANDOFF.md |

### Required Section Headers Per Output

Every per-microskill output file MUST contain:

```markdown
# [Microskill ID]: [Microskill Name]
## Execution Context
- Skill: A01 — Ad Intelligence & Competitive Scan
- Layer: [layer number]
- Mode: [Initial Scan / Continuous Monitor]
- Timestamp: [execution time]
- Input files read: [list]
- Model used: [haiku / sonnet / opus]

## Output
[Microskill-specific output]

## Quality Metrics
- [Microskill-specific quality measures]
- Schema compliance: [Y/N]
- Minimum thresholds met: [Y/N]
```

---

## FORBIDDEN BEHAVIORS (A01-Specific)

### Scraping Failures
1. Claiming scraping is complete with fewer than 500 ads
2. Scraping only 3-5 competitors and calling it "sufficient coverage"
3. Scraping one platform and skipping others
4. Using generic search queries instead of per-competitor scraping
5. Stopping pagination before all pages are extracted
6. Accepting MCP tool failures without trying fallbacks

### Classification Failures
7. Classifying fewer than 100% of scraped ads
8. Using "unclassified" or "other" as a hook type (closest type with note instead)
9. Batch-classifying ads without individual analysis ("these 50 are all curiosity hooks")
10. Classifying hooks without loading AD-HOOK-TAXONOMY.md
11. Skipping any of the 4 classification dimensions (hook type, format, visual style, run duration)

### Specimen Failures
12. Extracting fewer than 20 winning ad specimens
13. Specimens without verbatim copy transcription (summaries are NOT specimens)
14. Specimens without hook type classification
15. Selecting specimens subjectively instead of by run duration (longest-running = winning)

### Synthesis Failures
16. Opportunity gaps that are vague ("there are opportunities") instead of specific and actionable
17. Hook distribution analysis that doesn't cover all 32 types
18. Competitive landscape that covers fewer than 10 brands
19. Trend detection skipped in Continuous Monitor mode

### Output Failures
20. AD-INTELLIGENCE-HANDOFF.md under 100KB
21. Missing any of the 10 required sections
22. Sections that are summaries instead of comprehensive analysis
23. Assembling handoff in a single write operation (chunked assembly required)
24. Claiming skill complete without all 5 checkpoint YAML files

### Process Failures
25. Executing Layer N+1 without LAYER_N_COMPLETE.yaml existing
26. Inventing gate statuses other than PASS or FAIL
27. Spawning subagents without the 8-section structured context template
28. Using wrong model for a subagent (not matching the Binding Model Assignment Table)
29. Skipping MC-CHECK for more than 30 minutes during execution
30. Not updating PROJECT-STATE.md after every scraping/classification session

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation. Full 4-layer architecture with 22 microskills. Two operational modes (Initial Scan + Continuous Monitor). MCP integration specs for Apify and Firecrawl. 5 gates with binary enforcement. 32-type hook taxonomy classification. 10-section output schema at 100KB minimum. 6 subagent personas. 30 forbidden behaviors. Anti-degradation enforcement with forbidden rationalizations. Chunked assembly protocol for output. |
| 1.1 | 2026-02-27 | Tool-Assisted Scan mode: 5 new microskills (0.5, 0.6, 1.6, 2.7, 3.8), dual-signal performance scoring, Meta Ad Spy JSON import, impression-weighted analysis. Modified 4 existing microskills (0.3, 2.5, 3.2, 3.4) for impression awareness. |
