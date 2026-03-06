# Meta Ad Spy Integration Protocol

**Version:** 1.0
**Created:** 2026-02-27
**Purpose:** Define the integration protocol between the external Meta Ad Spy tool and the Ad Engine pipeline. This document is the single source of truth for how Meta Ad Spy data enters, transforms, and enriches the Ad Engine.

---

## WHY THIS EXISTS

The Meta Ad Spy tool provides **impression-sorted ad data** from the Meta Ad Library — a signal that the Ad Engine's native scraping (Apify/Firecrawl) cannot access. Impression data is a direct measure of platform distribution: high impressions = Meta is actively serving this ad = it's working.

Previously, A01's only performance proxy was **run duration** (how long an ad has been active). This is useful but incomplete:
- A short campaign with massive impressions (viral hit) would be classified as TIER_TESTING
- A long-running campaign with minimal impressions (low budget, niche) would be classified as TIER_WINNER
- Dual-signal scoring (run duration + impressions) produces more accurate winner identification

**This protocol is ADDITIVE, not replacement.** The Meta Ad Spy tool covers Meta only. A01 still needs Apify/Firecrawl for TikTok, Google, and other platforms. Tool-Assisted mode supplements existing scraping — it does not replace it.

---

## TOOL CAPABILITIES

### What the Meta Ad Spy Tool Provides
- Ads from the **Meta Ad Library** sorted by **highest impressions** (performance signal)
- **50+ DTC brands** pre-loaded with automated scraping
- **Weekly auto-scrape** cadence
- **Per-ad AI analysis:** headline, copy, CTA, asset type, visual format, messaging angle, hook tactic, offer type
- **Bookmark system + filters** for curation
- **JSON/API export** for programmatic consumption

### What the Tool Does NOT Provide
- TikTok ads (use A01 microskill 1.2 via Apify/Firecrawl)
- Google Ads (use A01 microskill 1.3 via Firecrawl)
- Other platform ads (use A01 microskill 1.4)
- Hook type classification against the 32-type taxonomy (tool uses its own `hook_tactic` field — A01 must map this)
- Run duration estimates (tool provides first_seen/last_seen — A01 computes duration)
- Brands NOT in the tool's 50+ pre-loaded set

---

## JSON IMPORT SCHEMA

### Source Fields (From Meta Ad Spy Tool)

```yaml
meta_ad_spy_per_ad:
  brand_name: string
  ad_text: string            # full copy text
  headline: string
  cta_text: string
  asset_type: enum[image, video, carousel]
  visual_format: string      # tool's visual format classification
  messaging_angle: string    # tool's messaging angle classification
  hook_tactic: string        # tool's hook classification — maps to A01 hook_type taxonomy
  offer_type: string
  impressions: integer       # NEW — not available from direct scraping
  first_seen: date           # ISO 8601
  last_seen: date            # ISO 8601
```

### Derived Fields (Computed by A01)

```yaml
a01_derived_fields:
  run_duration_days: integer
    # Computed: last_seen - first_seen
  performance_score: float
    # Computed: dual_signal_formula (see below)
  hook_type_code: string
    # Mapped: hook_tactic → 32-type taxonomy code (A1-J3)
  format_code: string
    # Mapped: asset_type + visual_format → A01 format classification
  copy_length_bucket: enum[micro, short, medium, long]
    # Computed: word_count(ad_text) → bucket
    #   micro: < 25 words
    #   short: 25-75 words
    #   medium: 76-150 words
    #   long: 150+ words
  data_source: "meta_ad_spy"
    # Fixed value — distinguishes from Apify/Firecrawl scraped ads
  impression_validated: true
    # Fixed value — indicates this ad has impression data
```

---

## DUAL-SIGNAL PERFORMANCE SCORING

### Formula

```
performance_score = (normalized_run_duration × 0.4) + (normalized_impressions × 0.6)
```

### Weight Rationale

- **Run Duration (40%):** Advertisers keep spending on ads that work. Long run = positive ROI signal. But some long-running ads are low-budget niche campaigns — run duration alone over-weights these.
- **Impressions (60%):** Direct measure of platform distribution. High impressions = Meta is actively serving this ad to users. This is a stronger signal of ad quality because Meta's algorithm optimizes for engagement/relevance.

### Normalization

Both signals are normalized to 0-1 within the dataset using min-max normalization **per brand**:

```
normalized_value = (value - min_value) / (max_value - min_value)
```

Per-brand normalization prevents a brand with $1M/day spend from dominating a brand with $1K/day spend on the impressions axis. Each brand's ads are scored relative to that brand's own distribution.

### Fallback (No Impressions Available)

When impressions are unavailable (non-Meta platforms, older data, brands not in Meta Ad Spy):

```
performance_score = normalized_run_duration × 1.0
```

This is the **current A01 behavior** — run duration as sole proxy. No breaking change.

### Tier Assignment with Dual-Signal

```yaml
tier_assignment:
  # When impressions ARE available (dual-signal):
  dual_signal:
    TIER_WINNER: "Top 20% by performance_score"
    TIER_PERFORMER: "Next 30% by performance_score (21st-50th percentile)"
    TIER_TESTING: "Next 30% by performance_score (51st-80th percentile)"
    TIER_NEW: "Bottom 20% by performance_score"

  # When impressions are NOT available (run-duration only):
  run_duration_only:
    TIER_WINNER: "90+ days running"
    TIER_PERFORMER: "30-89 days running"
    TIER_TESTING: "7-29 days running"
    TIER_NEW: "< 7 days running"
```

---

## BRAND DATABASE MAPPING

### How It Works

Each vertical config file (`ad-verticals/*.md`) contains a `meta_ad_spy_brands` section mapping the tool's pre-loaded brands to the engine's vertical classification.

### Mapping Rules

1. **Exact match:** Brand name in tool matches a known competitor in the vertical → direct mapping
2. **Category match:** Brand in tool sells products in the vertical's category → add to vertical
3. **No match:** Brand doesn't fit any of the 5 verticals → tagged `vertical: unclassified`
4. **Multi-vertical:** Some brands span verticals (e.g., a health + personal dev brand) → listed in primary vertical, cross-referenced in secondary

### At A01 Execution Time

```
FOR EACH brand in competitor_list:
  IF brand.name IN meta_ad_spy_brands[vertical]:
    → Flag as tool_assisted: true
    → Skip Apify scrape for this brand's Meta ads
    → Import from Meta Ad Spy JSON instead
    → STILL scrape this brand on TikTok/Google/other via Apify/Firecrawl
  ELSE:
    → Scrape normally via Apify/Firecrawl across ALL platforms
```

---

## GRACEFUL DEGRADATION

The integration is designed so that **every downstream consumer works identically** regardless of whether impression data is present.

### Per-Ad Level

| Field | With Meta Ad Spy | Without Meta Ad Spy |
|-------|-----------------|-------------------|
| `impressions` | integer (actual) | null |
| `impression_validated` | true | false |
| `performance_score` | dual-signal (0-1) | run-duration-only (0-1) |
| `tier` | percentile-based | day-count-based |
| `data_source` | "meta_ad_spy" | "apify" or "firecrawl" |

### Per-Analysis Level

| Analysis | With Impressions | Without Impressions |
|----------|-----------------|-------------------|
| Hook Distribution (3.2) | Impression-weighted + count-based | Count-based only |
| Specimen Selection (3.4) | Dual-signal ranked, impression_validated flag | Run-duration ranked |
| Tier Assignment (2.5) | Percentile-based on performance_score | Day-count thresholds |
| A10 Benchmarks | Impression benchmarks available | Run-duration benchmarks only |
| A12 Feedback | Weekly impression deltas tracked | No continuous signal |

### Rule: Never REQUIRE Impressions

No gate, threshold, or quality check may REQUIRE impression data. All requirements must work with run-duration-only fallback. Impression data ENHANCES accuracy — it never gates progress.

---

## WEEKLY SYNC PROTOCOL (A12 ↔ A01)

### How Meta Ad Spy Feeds Back

The Meta Ad Spy tool auto-scrapes weekly. A12 (Performance Learning Loop) can ingest this as a continuous competitive intelligence signal:

```
WEEKLY CYCLE:
  1. Meta Ad Spy tool scrapes all 50+ brands (automated)
  2. JSON export available via API
  3. A12 ingests new data as "competitive performance signal"
  4. A12 computes:
     - Impression deltas for tracked ads (which ads gained/lost impressions)
     - New ads detected (new entrants from tracked brands)
     - Ads that stopped running (creative fatigue / budget cut signal)
  5. A12 produces: tool_performance_update → fed back to A01 Continuous Monitor
```

### Integration with A12's Existing Architecture

A12 currently has 3 data source types:
1. **Platform analytics** (actual campaign performance)
2. **A10 predictions** (for prediction vs. reality comparison)
3. **NEW: Meta Ad Spy weekly data** (competitive intelligence signal)

The Meta Ad Spy data is a COMPETITIVE signal, not a CAMPAIGN PERFORMANCE signal. It tells us what's working for competitors — not what's working for us. A12 must keep these distinct.

---

## TOOL LIMITATIONS

1. **Meta only.** No TikTok, Google, YouTube, or other platform coverage.
2. **50+ brands only.** Brands not pre-loaded in the tool require manual addition or standard Apify scraping.
3. **Impression data is not spend data.** High impressions could mean high budget OR high organic virality. It's a distribution signal, not a cost signal.
4. **Weekly cadence.** Data refreshes weekly, not daily. Intra-week changes are not captured.
5. **AI analysis is the tool's, not ours.** The tool's `hook_tactic` and `messaging_angle` fields use the tool's taxonomy, not our 32-type hook taxonomy. A01 must map/reclassify.
6. **No historical data before tool activation.** Only ads scraped after tool deployment are available. Pre-existing competitive intelligence from A01's initial scans is not duplicated.

---

## A01 OPERATING MODE: TOOL-ASSISTED SCAN

This is the **3rd operating mode** for A01, alongside Initial Scan and Continuous Monitor:

```yaml
mode: TOOL_ASSISTED_SCAN
trigger: "Meta Ad Spy JSON export available for brands in the target vertical"
scope: "Import pre-scraped, pre-analyzed Meta ads from tool + standard scraping for non-Meta platforms"
output: "AD-INTELLIGENCE-HANDOFF.md (same as Initial Scan — enriched with impression data)"
frequency: "On-demand when tool data is available"
```

### How Tool-Assisted Differs from Initial Scan

| Aspect | Initial Scan | Tool-Assisted Scan |
|--------|-------------|-------------------|
| Meta scraping | Apify (Meta Ad Library) | Meta Ad Spy JSON import |
| TikTok scraping | Apify/Firecrawl | Apify/Firecrawl (unchanged) |
| Google scraping | Firecrawl | Firecrawl (unchanged) |
| Impression data | Not available | Available for Meta ads |
| Performance scoring | Run-duration only | Dual-signal (for Meta ads) |
| Speed | Slower (live scraping) | Faster (pre-scraped data) |
| Brand coverage | Any brand | Tool's 50+ brands (Meta) + any brand (other platforms) |

### Layer Modifications in Tool-Assisted Mode

- **Layer 0:** New microskills 0.5 (JSON Import Loader) and 0.6 (Brand Database Matcher) execute
- **Layer 1:** Microskill 1.1 (Meta Scraper) skipped for tool-assisted brands; 1.6 (Meta Ad Spy Ingester) runs instead
- **Layer 2:** New microskill 2.7 (Impression Scorer) computes dual-signal performance scores
- **Layer 3:** New microskill 3.8 (Impression-Weighted Analysis) generates impression-weighted distributions

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-27 | Initial creation. JSON import schema, dual-signal performance scoring (40/60 run duration/impressions), brand database mapping, graceful degradation protocol, weekly sync (A12↔A01), tool limitations, Tool-Assisted Scan mode specification. |
