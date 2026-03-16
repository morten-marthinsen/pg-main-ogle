# PG Data Platform — Architecture & Approach

> **Status**: Phase 0 — Architecture documented, proof of value in progress
> **Owner**: Data Team (Patrick Hayes)
> **Created**: 2026-03-13
> **Last Updated**: 2026-03-13

## What This Is

The PG Data Platform is the **foundation layer** underneath every system in the Performance Golf monorepo that touches data. It is three things:

| Layer | System | What It Does |
|-------|--------|-------------|
| **Warehouse** | Snowflake + dbt | Stores and transforms data (Q3/Q4 2026) |
| **Logic** | PG Data Service | Queries, classifies, and serves data to agents and teams |
| **Catalog & Governance** | OpenMetadata | Documents, discovers, traces lineage, and governs data assets |

The data team owns this platform. We are the logic layer — we understand how the data comes together at a level the rest of the company does not. Other teams consume from it. Changes go through the data team like PRs go through code review.

## Where This Sits in the Monorepo

```
_performance-golf/
├── pg-creative-os/        ← Consumes data (Orion, Tess, Neco, Veda)
├── pg-marketing-os/       ← Consumes data (funnels, campaigns, audiences)
├── pg-data-service/       ← THIS — the logic layer that serves both
├── _pg-digital-products/  ← Future consumer (product funnel analytics)
├── _pg-physical-products/ ← Future consumer (product launch performance)
└── pg-skills/             ← Shared prompts and standards
```

Creative OS and Marketing OS are **consumer systems**. They produce content, manage agents, and orchestrate workflows. They should never query raw data sources, define their own metric calculations, or maintain their own data pipelines. That's the data platform's job.

This is a deliberate architectural choice: **govern the data layer before the systems on top of it scale further.** Creative OS already has four agents making decisions from performance data. Marketing OS is coming. If every system builds its own data pipeline, you get contradictory numbers, duplicated logic, and no lineage. The data platform prevents that by establishing one shared source of truth with contracts, governance, and traceability from day one.

### The Layering Principle

Every system in the monorepo fits into one of three roles:

1. **Foundation layers** produce and govern data. They are upstream of everything. PG Data Platform is the foundation layer.
2. **Operating systems** consume data and orchestrate work. Creative OS and Marketing OS are operating systems. They don't own data definitions — they consume contracts.
3. **Output layers** are what the business sees — ads, emails, videos, dashboards. These are produced by the operating systems using data from the foundation.

```
Foundation:    PG Data Platform (Snowflake + dbt → Data Service → OpenMetadata)
                        │
                        ▼
Operating:     Creative OS          Marketing OS          Future Systems
               (Orion/Tess/         (funnels/campaigns/   (product analytics,
                Neco/Veda)           audiences)            finance, ops)
                        │                    │
                        ▼                    ▼
Output:        Ads, videos,         Email sequences,
               scripts, briefs      landing pages, offers
```

This layering means:
- **When the data source changes** (Domo → Snowflake), only the foundation layer changes. Operating systems don't rewrite anything.
- **When a new OS spins up**, it gets a formatter and a contract. The queries and models already exist.
- **When numbers disagree**, there's one place to look — the data platform — not N pipelines across N systems.
- **When someone asks "where does this number come from,"** OpenMetadata shows the full lineage from source to dashboard. No one has to ask Patrick.

### Why We're Building This Now (Not After Snowflake)

The Snowflake migration is targeted for Q3/Q4 2026. It would be natural to wait — "let's get the warehouse right first, then worry about governance." That's backwards, and here's why:

1. **The governance gap exists today.** Creative OS agents are already making decisions from data with no lineage, no documentation, and no quality checks. Every week that passes without governance is another week of decisions made on unvalidated numbers.

2. **Building the platform now makes the Snowflake migration easier, not harder.** OpenMetadata maps every Domo asset, so the migration punch list writes itself. The adapter pattern means zero rewrite of business logic. The catalog tracks migration progress automatically as dbt models replace Domo dataflows.

3. **Everything carries over.** Models, formatters, contracts, glossary terms, PII tags, governance workflows — none of these are Domo-specific. They're business logic and metadata about PGZ's data. When Snowflake goes live, you swap one adapter and connect one more OM connector. The platform is already running.

4. **The team builds muscle memory.** The DE, AE, and data consumers all learn the platform workflows (catalog search, lineage tracing, contract requests) on the current stack. By the time Snowflake arrives, governance is a habit, not a new initiative layered on top of a migration.

The sequence is: **govern first, migrate second.** Build the map before you move the territory.

## Why This Exists

### The Problem

Creative OS runs four agents (Orion, Tess, Neco, Veda) that all need performance data. Today:

- **Tess** gets a weekly CSV export from Domo with limited columns. She processes it into Google Sheets (SSS spreadsheet) and serves as the intelligence hub.
- **Neco** (ad copy agent) is supposed to "pull performance data from Tess" at session start. That pull mechanism doesn't exist. Neco operates data-blind or waits for a human to paste context.
- **Veda** (video editing agent) gets expansion recommendations from Tess via an intake queue. No performance feedback flows back.
- **Orion** (strategic chief of staff) reads session logs and ClickUp. No direct access to ad performance.

Beyond Creative OS, Marketing OS and future systems will need the same underlying data — ad performance, order economics, audience segments, funnel analytics.

### The Bottlenecks

1. **Tess is the single data gateway.** All performance data flows through one agent's weekly pipeline. Other agents wait or go without.
2. **Manual bridges.** 4 of 6 inter-agent data bridges have no code implementation. Humans relay data between agents.
3. **Weekly cadence is too slow.** Media buyers and agents make decisions daily. The data refreshes weekly.
4. **Data source migration coming.** The team is building a modern data stack on Snowflake. Anything built directly on Domo SQL will need to be rewritten.

### The Opportunity

The data team holds the keys to the data castle. Domo has **154 datasets** in the PG Zone, including a unified 252-column, 3M-row dataset (`PGZ | CoC | May 2022 Forward Orders-OrderItems-Ads`) that joins:

- Checkout Champ order data (customer, product, price, COGS, refunds)
- Ad attribution (full 15-position Asset ID, pre-parsed into named fields)
- Ad performance (spend, clicks, impressions, video views)
- Customer lifecycle (acquisition channel, Scratch Club trials, Mixpanel events)
- Geographic data (state, country)
- LTV windows (14/30/60/90-day ad revenue columns)

This is richer than what Tess currently processes. By building a shared service layer on top of it, we serve all agents and all systems — not just one.

---

## Architecture

### Design Principles

1. **Abstract the data source.** Domo today, Snowflake tomorrow. Business logic never touches the adapter directly. This is a non-negotiable — every query, model, and formatter must be source-agnostic.
2. **One source, many consumers.** Every agent gets data in the format it needs, but the underlying queries and logic are shared. Adding a new consumer is writing one formatter, not rebuilding queries.
3. **Data team owns the contracts.** Other teams request fields and formats. Data team reviews, implements, ships. No one queries raw data sources directly — that's how you get contradictory numbers across systems.
4. **Daily cadence minimum.** The Domo dataset updates daily. Our service should match or exceed. Weekly is too slow for operational decisions.
5. **Self-serve by design.** The goal is infrastructure that agents and teams consume independently, not a request queue the data team has to process.
6. **PII never leaves the service.** The source datasets contain full customer records (email, name, address, phone, IP). All formatters strip PII before writing outputs. No exceptions.
7. **Numbers must match.** If Tess says an ad has $5,000 in revenue and the data service says $4,800, trust is destroyed. Reconciliation logic and known discrepancy documentation are first-class concerns.
8. **Catalog everything you build.** Every pipeline, metric, and business rule the data service produces gets registered in OpenMetadata. If it's not in the catalog, it doesn't exist to the rest of the org.
9. **Push, don't poll.** The data service pushes metadata to OpenMetadata after each run (pipeline status, freshness, row counts). The catalog stays current without separate polling infrastructure.

### Directory Structure

```
_performance-golf/pg-data-service/
│
├── PG-DATA-SERVICE.md          # This document
├── CLAUDE.md                   # Agent instructions for working in this directory
├── SESSION-LOG.md              # Standard session log (Build State + sessions)
│
├── adapters/                   # Data source connectors
│   ├── base.py                 # Abstract interface all adapters implement
│   ├── domo.py                 # Current: wraps DomoClient, translates SQL
│   └── snowflake.py            # Future: Snowflake connector (same interface)
│
├── models/                     # Business logic — source-agnostic
│   ├── ad_performance.py       # What is a winning ad? ROAS calc, classification
│   ├── angle_analysis.py       # Root angle saturation, variation counts, performance
│   ├── expansion_analysis.py   # Which expansion types work for which products
│   ├── audience.py             # Geographic and behavioral segmentation
│   ├── order_economics.py      # AOV, upsell rate, COGS, profit per ad
│   ├── talent_performance.py   # Talent/editor/copywriter combo analysis
│   └── creative_velocity.py    # Launch cadence, testing vs proven assets
│
├── contracts/                  # Versioned data contracts (schemas)
│   ├── v1/
│   │   ├── ad_performance.yaml # Field names, types, descriptions, update frequency
│   │   ├── angle_analysis.yaml
│   │   └── ...
│   └── CHANGELOG.md            # Contract version history
│
├── formatters/                 # Per-consumer output renderers
│   ├── neco_brief.py           # Markdown performance brief for Neco Context Gatherer
│   ├── tess_enrichment.py      # Structured data to backfill/enrich SSS
│   ├── orion_summary.py        # Executive KPI summary for daily briefing
│   ├── veda_priorities.py      # Expansion priority list with performance justification
│   ├── raw_export.py           # CSV/JSON for ad-hoc or new consumers
│   └── marketing_os.py         # Future: Marketing OS consumer
│
├── outputs/                    # Generated files (gitignored, regenerated on demand)
│   ├── neco/                   # Per-funnel briefs for Neco
│   ├── tess/                   # Enrichment data for Tess
│   ├── orion/                  # Executive summaries for Orion
│   ├── veda/                   # Expansion priorities for Veda
│   └── raw/                    # Raw exports
│
├── catalog/                    # OpenMetadata integration
│   ├── push.py                 # Push pipeline status, freshness, row counts to OM API
│   ├── glossary.py             # Sync business rule definitions to OM glossary
│   └── pii_manifest.yaml       # Columns flagged as PII (source for formatter stripping)
│
├── config.yaml                 # Funnel list, refresh schedule, output paths, thresholds
├── service.py                  # Orchestrator: run queries → format → push metadata → write outputs
└── requirements.txt            # Python dependencies
```

### Adapter Pattern

The adapter abstracts the data source. Every adapter implements the same interface:

```python
class DataAdapter:
    def query_ad_performance(self, funnel: str, date_range: tuple) -> pd.DataFrame
    def query_orders(self, funnel: str, date_range: tuple) -> pd.DataFrame
    def query_audience_geo(self, funnel: str, date_range: tuple) -> pd.DataFrame
    # ... etc
```

`domo.py` translates these into Domo SQL via DomoClient. When Snowflake is ready, `snowflake.py` translates the same calls into Snowflake SQL. The models, formatters, and service layer never know or care which adapter is active.

**Switching data sources = changing one line in config.yaml.**

### Models (Business Logic)

This is where the data team's value lives. Models define the rules that turn raw data into intelligence:

- **Classification thresholds**: Winner (ROAS >= 1.0, spend >= $2,500), Potential (0.8-0.99), Underperformer (<= 0.79), Testing (< $2,500). These thresholds are sourced from Tess's PRD v1.4 — any changes must be coordinated.
- **Saturation rules**: 3+ variations of the same root angle = saturated
- **ROAS calculation**: Must deduplicate spend across order-level rows (same ad appears many times, once per order it drove). See "Known Data Challenges" below.
- **Expansion effectiveness**: Win rate and weighted ROAS by expansion type
- **Root Angle Principle**: Every Asset ID tests exactly ONE root angle. Expansions preserve the root angle. This is sacred across all systems — see WORKSPACE.md.

These rules are the institutional knowledge of how PG evaluates creative performance. They don't change when the data source changes.

### Known Data Challenges

These are structural characteristics of the source data that affect how models must be built. Documenting them here prevents future engineers from making the same mistakes.

#### Two Row Types — Spend and Revenue Are Mutually Exclusive (Critical)

The dataset contains **two distinct row types** per ad, identified by which fields are populated:

| Row Type | Spend | totalAmount | orderId | Clicks/Impressions | Granularity |
|----------|-------|-------------|---------|--------------------|----|
| **Ad-metric** | > 0 | NaN | empty | populated | One row per ad per day |
| **Order** | 0 | > 0 | populated | 0 | One row per order |

**These never overlap.** No single row has both Spend > 0 and totalAmount > 0.

**Aggregation rule**: Filter by row type first, aggregate separately, then join by `Ad` name.
- Total Spend = `SUM(Spend) WHERE Spend > 0` grouped by Ad
- Total Revenue = `SUM(totalAmount) WHERE totalAmount > 0` grouped by Ad
- ROAS = Total Revenue / Total Spend

This is simpler than initially feared — no deduplication gymnastics needed.

#### Mixed Ad Naming Conventions

Not all ads use the 15-position naming convention. The dataset includes:
- **Valid 15-position ads** (Facebook, newer campaigns) — fully parseable
- **Legacy/non-standard ads** (pmax, search, demand_gen, older campaigns) — `Ad` field contains campaign-style names, not asset IDs
- **The `Valid 15-Position Ad Name?` column** (0 or 1) is the filter. Always use it.

In our exploratory sample of 5,000 Facebook rows, 661 (13.2%) had valid 15-position names. The rest are older-format or non-standard. This ratio will vary by date range — newer campaigns are more likely to use the convention.

#### Platform Coverage

The dataset covers **12 platforms** (confirmed via 500K row sample):

| Platform | Rows (sample) | Notes |
|----------|--------------|-------|
| facebook | 201,016 | Primary — 15-position naming convention applies |
| pmax | 165,181 | Google Performance Max — no asset-level naming |
| youtube | 44,337 | May have campaign-level naming |
| search | 25,680 | Google Search — keyword-level, no creative naming |
| oddbytes | 23,637 | Affiliate/partner channel |
| demand_gen | 18,934 | Google Demand Gen — campaign-level |
| display | 7,326 | Google Display Network |
| shopping | 5,167 | Google Shopping |
| tiktok | 4,622 | TikTok Ads — may have own naming convention |
| microsoft ads | 3,524 | Microsoft/Bing Ads |
| snapchat ads | 449 | Snapchat Ads |
| x | 127 | X/Twitter Ads |

- **Facebook is ~40% of rows** — largest platform but not a majority. Cross-platform spend context is valuable.
- **15-position naming** is primarily Facebook. Other platforms use campaign-level or no structured naming.
- **For v1**: Creative-level analysis on Facebook (naming convention gives granularity). Other platforms aggregate at campaign/funnel level.
- **No cross-dataset join needed** — this single dataset covers all platforms with both ad-metric and order rows.

#### LTV Revenue Columns (Not Available)

The schema includes `14-Day Ad Rev`, `30-Day Ad Rev`, `60-Day Ad Rev`, `90-Day Ad Rev` but these columns are **not populated in this dataset**. This has been confirmed — the dataset has historically not provided LTV data.

**Impact**: We measure immediate conversion value (`totalAmount` = point-of-sale order value), not customer lifetime value. An ad that drives $67 trial orders which convert to $500+ in LTV looks the same as one that drives $67 orders that churn.

**Future path**: LTV analysis will require either:
- Querying `PGZ | CC | Order Item LTV` (10.3M rows) and joining by customer/order
- The Snowflake data stack (Q3/Q4) where LTV attribution can be modeled properly
- This is a Phase 2+ enrichment, not a v1 blocker

#### Funnel Code Mismatches

In the exploratory data, some valid 15-position ads had `[Funnel]` parsed correctly but the top-level `Funnel` column (from campaign-level attribution) showed a different value. Example: an ad with `[Funnel]` = `dqfe` had `Funnel` = `jr` (the editor initials from a different part of the campaign name).

**Rule**: Always use the parsed `[Funnel]` field from the 15-position name, never the campaign-level `Funnel` field, for asset-level analysis. The campaign-level field is derived from different logic and can disagree.

### Contracts

Contracts define what data is available to consumers. **OpenMetadata is the system of record** for contract definitions — field names, types, descriptions, ownership, update frequency, and PII classification all live in the catalog. Local YAML files serve as validation schemas and version snapshots, not the source of truth.

```yaml
# contracts/v1/ad_performance.yaml
# Validation schema — canonical definitions live in OpenMetadata
name: ad_performance
version: 1
description: Ad-level performance metrics aggregated from order data
update_frequency: daily
openmetadata_table: pg_data_service.ad_performance  # ← links to catalog entry
fields:
  - name: asset_id
    type: string
    description: Full 15-position Asset ID
  - name: funnel
    type: string
    description: Product/offer code (357, sf1, clst, etc.)
  - name: root_angle_id
    type: string
    description: Script ID (position 2 of Asset ID)
  - name: total_orders
    type: integer
    description: Count of orders attributed to this ad
  - name: total_revenue
    type: float
    description: Sum of order totalAmount
  - name: total_spend
    type: float
    description: Deduplicated ad spend
  - name: roas
    type: float
    description: total_revenue / total_spend
  - name: classification
    type: string
    enum: [winner, potential, underperformer, testing]
  # ... etc
```

When a consumer needs a new field, they open a request. Data team evaluates, implements in the model, updates the contract in OpenMetadata (and the local YAML snapshot), bumps the version.

### Formatters

Same data, different rendering:

| Consumer | Format | What It Contains |
|----------|--------|------------------|
| **Neco** | Markdown brief per funnel | Top performers, winning hooks, saturated angles, audience segments — reads like a Context Gatherer intake |
| **Tess** | Structured JSON/CSV | Enrichment data to backfill SSS (e.g., root angle names for the 421 unmapped assets, daily performance updates) |
| **Orion** | Executive summary markdown | Portfolio KPIs, flags (new winners, decaying performers), weekly delta |
| **Veda** | Priority-ranked YAML | Expansion recommendations with performance justification |
| **Marketing OS** | TBD | Funnel-level metrics, campaign performance, audience insights |
| **Raw** | CSV/JSON | Full query results for ad-hoc analysis or new consumers |

Adding a new consumer = writing one new formatter. The queries and models don't change.

---

## Data Sources

### Current: Domo

**Instance**: Performance Golf Zone (PGZ)
**Auth**: OAuth2 client credentials (stored in `.env`, never committed)
**API**: REST + SQL query endpoint
**Client**: `DomoClient` class (Python, existing implementation at `~/Development/domo/`)

#### Key Dataset

**PGZ | CoC | May 2022 Forward Orders-OrderItems-Ads**
- ID: `a359ffd7-8175-40f3-b339-0a476cf624aa`
- Rows: 3,072,105
- Columns: 252
- Updated: Daily (last run 2026-03-13)
- Owner: Bill Ogier

This is the primary dataset. It joins orders + order items + ad attribution with the 15-position naming convention pre-parsed. Key column groups:

| Column Group | Examples | What It Gives Us |
|--------------|----------|------------------|
| Order data | `totalAmount`, `price`, `discountPrice`, `refundRemaining`, `orderStatus`, `orderType` | Revenue attribution at the order level |
| Customer data | `customerId`, `emailAddress`, `country`, `State`, `city` | Geographic segmentation, customer identification |
| Ad attribution | `Ad`, `Ad Set`, `Campaign`, `AdId`, `AdsetId`, `Ad Platform` | Which ad drove which order |
| 15-position parsed | `[Funnel]`, `[ScriptID]`, `[VariationID]`, `[AdCategory]`, `[ExpansionType]`, `[AssetType]`, `[TalentCode]`, `[EditorInitials]`, `[CopywriterInitials]` | Pre-parsed naming convention fields |
| Human-readable lookups | `Offer Name`, `Ad Category`, `Expansion Type`, `Asset Type`, `Talent Name`, `Editor Name`, `Copywriter Name` | Resolved names (not just codes) |
| Ad metrics | `Spend`, `Clicks`, `Impressions`, `video_views_p25/p50/p75/p100` | Performance metrics |
| COGS | `Physical COGS Per Order`, `Landed Cost COGS Per Order`, `Royalties COGS Per Order`, `Fulfillment COGS Per Order`, `Shipping COGS Per Order` | Profitability calculation |
| LTV windows | `14-Day Ad Rev`, `30-Day Ad Rev`, `60-Day Ad Rev`, `90-Day Ad Rev` | Cohorted revenue attribution (availability TBD) |
| Lifecycle | `hasUpsell`, `Order Contains UPSALE`, `SC Order Type`, `SwingFix AI Order Type`, `New Customers` | Customer journey attribution |
| Validity | `Valid 15-Position Ad Name?`, `15 Position Validity Check`, `# of Positions in Ad Name` | Data quality flags |

#### Other Relevant Datasets (154 total in PGZ)

| Dataset | Rows | Potential Use |
|---------|------|---------------|
| PGZ \| FB Ads \| All Accounts, Hourly Ads | 16.1M | Granular hourly ad performance (spend/impressions/clicks without order join) |
| PGZ \| Paid Media Union (2nd layer) | 20.5M | Cross-platform paid media (FB + Google + Microsoft unified) |
| PGZ \| CC \| Order Item LTV | 10.3M | Order-item level LTV — deeper than order-level |
| PGZ \| COC & Mixpanel \| Funnel Analytics | 15M | Funnel step conversion data — where drop-off happens |
| PGZ \| Klaviyo \| Flows (definitions) | 107 | Email flow definitions |
| PGZ \| Klaviyo \| Campaigns (definitions) | 768 | Email campaign definitions |
| PGZ \| Hubspot \| Contacts PREP | 504K | CRM contact data |
| PGZ \| FB Ads \| GEO/State Raw Recursive | 649K | Facebook ads with geographic audience breakdowns |
| PGZ \| Generic Funnel Accts \| Daily/GEO/Country | 204 | Funnel-level daily performance with geo |
| PGZ \| Digi Named Funnels \| Daily/GEO/Country | 317 | Digital product funnels with geo |

### Future: Snowflake (Q3/Q4 2026)

The team is building a modern data stack with Snowflake as the warehouse and dbt as the transformation layer. This is not a separate initiative — it's Phase 5 of the PG Data Platform.

**What changes when Snowflake goes live:**

| Component | Change Required |
|-----------|----------------|
| `adapters/snowflake.py` | Build (same `DataAdapter` interface) |
| `config.yaml` | Point to Snowflake |
| `adapters/domo.py` | Decommission |
| OpenMetadata | Add Snowflake + dbt connectors (lineage auto-updates) |

**What doesn't change:**

| Component | Why |
|-----------|-----|
| Models (all business logic) | Source-agnostic by design |
| Formatters (all output renderers) | Consume from models, not adapters |
| Contracts (all field definitions) | Business definitions, not source definitions |
| `catalog/push.py` | Talks to OM API, not to any data source |
| OpenMetadata glossary, PII tags, tiers, ownership | Metadata about the business, not about Domo |
| Governance workflows | Process, not plumbing |

**What gets better:**

- Snowflake query history ingestion → usage analytics and popularity ranking in OpenMetadata
- dbt model lineage → auto-stitched into catalog as models are built
- dbt test results → data quality signals in OpenMetadata
- SQL-based lineage parsing → OpenMetadata traces Snowflake queries automatically
- OpenMetadata becomes the migration dashboard: which assets still depend on Domo, which have moved

The adapter pattern and the catalog layer both exist specifically for this migration. Everything built in Phases 1-4 carries over.

---

## Governance

### Data Team Responsibilities

- Own all business logic (models) — classification thresholds, ROAS calculations, saturation rules
- Own all data contracts — field definitions, types, update frequency
- Review and approve requests for new fields or formats
- Maintain adapter layer as sources change
- Monitor data quality and freshness

### Consumer Team Responsibilities

- Request new fields/formats through the contract process (like a PR)
- Consume from `outputs/` or call the service — never query raw data sources directly
- Report data quality issues or unexpected results
- Define their own formatter requirements (what fields, what format, what structure)

### Contract Change Process

1. Consumer opens request: "Need [field] on [contract] for [reason]"
2. Data team evaluates: Does the source support it? Is the logic sound? Edge cases?
3. Data team implements in model, updates contract YAML, bumps version
4. Consumer gets it in their next output refresh

---

## Current State of Creative OS Data Flows

### What's Working

| Flow | Status | Mechanism |
|------|--------|-----------|
| Domo → Tess (weekly CSV) | LIVE | Manual CSV export, Python pipeline ingests |
| Tess → Google Sheets (SSS) | LIVE | Python writes to Ad Level Tracking (1,102 rows), Raw_Daily_Data (33,693 rows), Asset Registry (776 rows) |
| Tess → Veda (intake queue) | LIVE, PRODUCTION-GRADE | 29-column Google Sheets queue, typed schemas, CLI integration, 620+ tests |
| ClickUp → Tess (root angles) | LIVE | API sync + Google Apps Script webhook |
| ClickUp → Orion (tasks/calendar) | LIVE | 5-minute launchd sync |
| Fathom → Orion (transcripts) | LIVE | 30-minute launchd sync |

### What's Broken

| Flow | Status | Impact |
|------|--------|--------|
| Tess → Neco (performance data) | DOC-ONLY, NO CODE | Neco operates data-blind; copy can contradict known performance |
| Neco → Veda (production orders) | FORMAT DEFINED, NO RECEIVER | Scripts sit in `_output/`; manually transferred |
| Veda → Tess (completion feedback) | NONEXISTENT | Tess can't close the loop on expansion recommendations |
| Agent → Orion (escalation) | NONEXISTENT | Agents can't flag blockers autonomously |
| Tess root angle coverage | 62% (681/1102) | 421 assets unmapped — funnels not in ClickUp |

### What PG Data Service Fixes

| Problem | How |
|---------|-----|
| Neco is data-blind | Formatter generates per-funnel performance brief; Context Gatherer reads it at session start |
| 421 unmapped assets | Query Domo directly by funnel — bypass ClickUp gap entirely |
| Weekly cadence too slow | Daily refresh from Domo (dataset updates daily) |
| Tess is the bottleneck | Agents consume from data service directly; Tess becomes one consumer, not the gateway |
| No cross-platform view | Domo has Google, Microsoft, YouTube — Paid Media Union dataset unifies them |
| No order-level attribution | Primary dataset is order-level — know which ad drove which order |
| No profitability data | COGS columns enable profit-per-ad calculation, not just revenue |
| No upsell/LTV insight | `hasUpsell`, `SC Order Type`, upsell SKUs — know which ads drive high-value buyers |
| Data source migration risk | Adapter pattern means Snowflake swap is one file change |

---

## Relationship to Existing Systems

### Tess (Creative OS Intelligence)

PG Data Service does NOT replace Tess. Tess has domain-specific value:
- Google Sheets SSS management (tabs, formatting, lookup tables)
- Veda intake queue lifecycle management (PENDING → CLAIMED → COMPLETED)
- Asset Registry webhook (ClickUp → Google Sheets)
- Naming convention enforcement (v3.9)

What changes: Tess can consume enriched data from PG Data Service instead of processing raw CSV. The data service handles the heavy querying and aggregation; Tess focuses on agent-specific orchestration and Google Sheets management.

### Orion (Creative OS Chief of Staff)

Orion currently has no direct ad performance visibility. The data service provides an executive summary formatter that feeds directly into Orion's daily briefing modules — portfolio KPIs, new winners, decaying performers, weekly deltas.

### Neco (Creative OS Copy Agent)

The biggest unlock. Neco's Context Gatherer sub-agent gets a per-funnel performance brief at session start. No more data-blind operation, no more manual human relay.

### Marketing OS

Future consumer. Same underlying data, different formatter. The data service is built to serve Marketing OS from day one — it's not a Creative OS tool.

---

## Exploratory Findings (2026-03-13)

These observations come from live queries against the Domo API during initial discovery. They inform architecture decisions and flag areas that need deeper investigation.

### Dataset Characteristics

- **3,072,105 rows** in the primary dataset, updated daily (last dataflow run: 2026-03-13T15:12:23)
- **252 columns** — significantly richer than what Tess currently processes from the weekly CSV
- **Order-level granularity** — one row per order, with ad attribution joined. NOT one row per ad per day.
- **Domo SQL limitations** — the query endpoint does not support `GROUP BY`, aggregate functions, or complex quoting. Aggregation must happen in Python (pandas) after fetching filtered rows with `SELECT * ... WHERE ... LIMIT`.

### What We Confirmed Works

- `DomoClient.query_dataset()` returns DataFrames via SQL queries
- Filtering by `Ad Platform`, `Spend`, and `Valid 15-Position Ad Name?` works
- The 15-position parsed columns (`[Funnel]`, `[ScriptID]`, `[AdCategory]`, etc.) are populated correctly for valid ads
- Human-readable lookup columns (`Offer Name`, `Expansion Type`, `Talent Name`, etc.) are populated and accurate
- Order data (`totalAmount`, `price`, `orderStatus`, `orderType`, COGS fields) is present on every row
- Customer geo (`country`, `State`) is available for segmentation

### Sample Data Profile (5,000 Facebook rows)

| Metric | Value |
|--------|-------|
| Valid 15-position ads | 661 / 5,000 (13.2%) |
| Unique funnels (in valid 15-pos) | 10: sf1, ossf, dqfe, 357, wdg1, pgf, ssts, clst, gbf, dqfe1 |
| Non-zero totalAmount | 5,000 / 5,000 (100% — every row is an order) |
| Non-zero Spend | 0 / 5,000 in this batch (see note below) |
| Non-zero 14-Day Ad Rev | 0 / 5,000 (empty in this batch) |

**RESOLVED — Spend and Revenue Coexist in the Same Dataset (Different Row Types)**

Follow-up investigation confirmed the dataset contains **two distinct row types** for each ad:

1. **Ad-metric rows** — Spend > 0, Clicks, Impressions populated. totalAmount = NaN. No orderId. One row per ad per day.
2. **Order rows** — totalAmount > 0, orderId, customer data, orderStatus populated. Spend = 0. One row per order.

Both row types share the same `Ad` field (the asset name). They are **never both populated on the same row** — Spend and Revenue are mutually exclusive per row. Example for ad `dqfe-0027-v0005-fb-9x16-180s-nn-xx-sad-erla-dr-ch-us-20260306`:
- 7 ad-metric rows (one per day) → Total Spend: $3,574.73
- 40 order rows → Total Revenue: $8,549.00 across 40 unique orders
- ROAS: 2.39x

**Implication for the model layer**: Aggregation must split rows by type, sum separately, then join by Ad name. This is clean and reliable — no cross-dataset joins needed. Spend deduplication is also simpler than feared: each ad-metric row is already one-per-day, so `SUM(Spend) WHERE Spend > 0 GROUP BY Ad` gives correct total spend.

### Funnels Observed in Data

From the full 5,000-row sample (all platforms):

| Funnel | Orders | Notes |
|--------|--------|-------|
| 357 | 2,381 | Highest volume — Fairway Hybrid |
| pgc | 1,203 | PG Club / general |
| sf1 | 397 | SF1 Driver |
| ssdp | 217 | Senior Swing Distance Program |
| sqse | 210 | Squat Sequence |
| clst | 147 | Click Stick |
| wpss | 126 | Women's Pendulum Swing |
| srsw | 96 | |
| ossf | 56 | One Shot Slice Fix |
| sqp | 47 | |
| pss | 37 | Pendulum Swing Sequence (retired) |
| ssts | 24 | Simple Strike Sequence |
| pgf | 24 | Fitness Program |
| thr | 19 | |

This funnel distribution is useful context — 357 dominates order volume, which means it will also dominate any portfolio-level analysis.

### Ad Name Patterns Observed

Three distinct naming patterns in the data:

1. **15-position (new standard)**: `ssts-0761-v0018-fb-9x16-180s-exv-hs-aio-mult-jk-ch-us-20260305`
   - Fully parseable, all fields populated

2. **Legacy (pre-standard)**: `sf1-0001-v0483-9x16-exp-vd-5min-hank-shne-cshne-06112025-sca`
   - Similar structure but different position count and field names
   - `-sca` suffix indicates scaling campaign

3. **Platform-native**: `pmax`, `search`, `demand_gen`
   - No asset-level naming — these are Google platform formats
   - Cannot be parsed into the 15-position convention

The data service must handle all three gracefully: parse type 1 fully, extract what's possible from type 2, and categorize type 3 as platform-native (useful for spend/revenue but not for creative analysis).

### Proof of Value: Funnel 357 Performance Analysis

To validate the full pipeline, we ran a live aggregation against funnel 357 (Fairway Hybrid — highest order volume). This is what the data service will produce automatically.

**Query**: 6,119 rows for Facebook ads in funnel 357 (4,481 ad-metric rows + 907 order rows across 77 unique ads).

#### Portfolio Summary

| Metric | Value |
|--------|-------|
| Unique ads | 77 |
| Total Spend | $95,455.53 |
| Total Revenue | $187,527.00 |
| Overall ROAS | 1.96x |
| Winners | 7 (9.1%) |
| Testing | 70 (90.9%) |

#### Top Winners (by Revenue)

| Ad | Spend | Revenue | ROAS | Orders |
|----|-------|---------|------|--------|
| 357-i073-v0005 (image, Black Friday) | $29,806 | $61,042 | 2.05x | 307 |
| 357-i071-v0005 (image, Black Friday) | $15,639 | $34,681 | 2.22x | 182 |
| 357-i070-v0004 (image, Black Friday) | $7,070 | $17,726 | 2.51x | 94 |
| 357-i074-v0001 (image, Black Friday) | $8,434 | $16,730 | 1.98x | 89 |
| 357-i074-v0003 (image, Black Friday) | $4,413 | $10,441 | 2.37x | 52 |
| 357-i070-v0001 (image, Black Friday) | $2,944 | $5,432 | 1.85x | 28 |
| 357-0088-v0003 (video, 60s, Gary McCord) | $2,607 | $2,988 | 1.15x | 10 |

**Observation**: 6 of 7 winners are image ads (`i0xx` prefix) from the Black Friday 2025 campaign. Only 1 video ad (0088-v0003, Gary McCord talent, 60s) crossed the winner threshold. This is a strong signal for Neco — image creative is dominating for 357.

#### Expansion Type Effectiveness

| Expansion Type | Ads | Spend | Revenue | ROAS | Win Rate |
|----------------|-----|-------|---------|------|----------|
| (none/original) | 14 | $71,891 | $153,425 | 2.13x | 42.9% |
| Not Applicable (net new) | 57 | $20,812 | $31,533 | 1.52x | 1.8% |
| Ad Format | 6 | $2,753 | $2,569 | 0.93x | 0% |

**Observation**: Original/base creatives massively outperform net-new and format expansions. Ad Format expansions are underperforming (0.93x ROAS). This tells Veda to prioritize other expansion types over format changes for 357.

#### Root Angle Saturation (3+ Variations)

| ScriptID | Variations | Spend | Revenue | ROAS | Winners |
|----------|-----------|-------|---------|------|---------|
| i074 | 3 | $13,257 | $28,065 | 2.12x | 2 |
| i070 | 3 | $10,168 | $23,914 | 2.35x | 2 |
| i081 | 8 | $6,517 | $14,354 | 2.20x | 0 |
| 0088 | 8 | $4,913 | $6,140 | 1.25x | 1 |
| 0087 | 6 | $2,753 | $2,569 | 0.93x | 0 |
| i082 | 8 | $2,569 | $4,591 | 1.79x | 0 |

**Observation**: 13 root angles have 3+ variations (saturated territory). i074 and i070 are the strongest angles with proven winners. i081 has 8 variations and strong ROAS but zero winners (all below spend threshold — more budget needed). 0087 (6 variations, 0.93x) and 0081 (5 variations, 0.19x) are angles to avoid expanding further.

This is exactly the kind of intelligence Neco's Context Gatherer needs.

---

## OpenMetadata Integration

### How the Two Systems Relate

PG Data Service and OpenMetadata are **complementary layers**, not competing systems:

| Layer | System | What It Does |
|-------|--------|--------------|
| **Logic** | PG Data Service | Queries, transforms, classifies, and serves data to agents/teams |
| **Catalog & Governance** | OpenMetadata | Documents, discovers, traces lineage, governs, and monitors data assets |

The data service is the engine. OpenMetadata is the map and the guardrails.

### Push Model (Architecture Decision — 2026-03-13)

The data service **pushes metadata to OpenMetadata** after each pipeline run. This is ~20 lines in `catalog/push.py` called at the end of `service.py`. OpenMetadata does not poll or crawl the data service.

**What gets pushed after each run:**

| Metadata | Example | Why |
|----------|---------|-----|
| Pipeline status | `SUCCESS` / `FAILED` at `2026-03-14T06:00:12Z` | Replaces custom freshness monitoring |
| Row counts | `funnel_357: 6,119 rows processed` | Data quality signal — unexpected drops are anomalies |
| Output manifest | `neco/357_brief.md updated, orion/daily_summary.md updated` | Consumers know what's fresh |
| Duration | `47.3s total (12.1s query, 35.2s format)` | Performance tracking without custom tooling |

**What OpenMetadata handles natively (no push needed):**

| Metadata | Source | Connector |
|----------|--------|-----------|
| Domo dataset schemas, lineage, dashboards | Domo API | Native Domo connector |
| Snowflake table schemas, query history | Snowflake | Native Snowflake connector |
| dbt model lineage, test results | dbt artifacts | Native dbt connector |
| Data service contract field definitions | OpenMetadata UI | Manual + AI-assisted documentation |

### What OpenMetadata Gives the Data Service

1. **PII manifest** — OpenMetadata tags PII columns across all 154 Domo datasets. The data service reads `catalog/pii_manifest.yaml` (exported from OM) to know which fields every formatter must strip. PII tagging happens once in the catalog; enforcement happens in code.

2. **Lineage for reconciliation** — The Tess CSV pipeline and the data service pipeline both trace back to Domo through OpenMetadata. When numbers diverge, anyone can visually trace the two paths and see where the divergence enters — without asking Patrick.

3. **Glossary as business logic documentation** — Every classification threshold (`winner = ROAS >= 1.0 AND spend >= $2,500`), every metric definition (`ROAS = total_revenue / total_spend`), every saturation rule (`3+ variations = saturated`) gets a glossary entry. Media buyers find definitions in the catalog, not in Python source code.

4. **Schema change detection** — When a Domo dataset schema changes (columns added/removed/renamed), OpenMetadata detects it on the next ingestion run and notifies downstream owners. The data service adapter doesn't silently break — someone gets alerted.

5. **Migration tracking** — As dbt models replace Domo dataflows (Q3/Q4 Snowflake migration), lineage shifts automatically. The catalog becomes the migration dashboard: which datasets still depend on Domo vs. which have moved to Snowflake.

### Claude Code Integration

OpenMetadata ships a first-party Claude Code skills plugin for AI-assisted connector development. This is directly relevant to PGZ because:

1. **Custom connectors for Domo gaps.** The native Domo connector doesn't capture beast mode formulas, alert definitions, or App Studio apps. The `/scaffold-connector` skill generates boilerplate + implementation brief for a custom connector, and can dispatch a research sub-agent to study the Domo API first. Building a beast-modes connector becomes a structured workflow, not a from-scratch project.

2. **Mixpanel connector.** No native Mixpanel connector exists (as of Feb 2026). If Mixpanel data doesn't fully land in Snowflake, we scaffold a custom connector using the same tooling.

3. **Free QA via `/connector-review`.** Any custom connector gets validated against 17 golden standards by 5 parallel sub-agents — schema registration, connection handling, source topology, test quality, code conventions. Catches registration gaps and pagination bugs before production.

4. **Future: PG Data Service as a proper connector.** The lightweight `catalog/push.py` script works for v1, but the scaffold tooling could upgrade it to a first-class OpenMetadata connector — pipeline runs in the native UI, auto-registered lineage, standard error handling and pagination patterns. Consider for Phase 4+ if the push script proves limiting.

**Setup:**
```bash
# Inside cloned OpenMetadata repo
git clone https://github.com/open-metadata/OpenMetadata.git
cd OpenMetadata
python3.11 -m venv env && source env/bin/activate
make install_dev generate

# Install skills plugin
claude plugin install skills/

# Available slash commands:
# /scaffold-connector — generate new connector boilerplate + TODO brief
# /connector-review — validate against 17 golden standards (5 parallel agents)
# /load-standards — load all connector dev standards into context
```

A SessionStart hook auto-loads golden standards when working on connectors — no manual `/load-standards` needed.

**Reference:** https://docs.open-metadata.org/v1.12.x/developers/contribute/developing-a-new-connector/ai-assisted-development/build-with-ai

### Deployment Timeline (Parallel With Data Service Build)

OpenMetadata deploys in parallel with the data service, not after. The catalog informs the build.

| Week | Data Service | OpenMetadata |
|------|-------------|--------------|
| 1 | Phase 0 finish (sample brief, reconciliation) | Deploy VM + Docker Compose, initial config |
| 1-2 | Phase 1 (adapters, first model, first formatter) | Connect Domo — catalog 154 datasets, start PII tagging |
| 2-3 | Phase 2 (core models) | PII tagging complete, glossary terms for core metrics |
| 3-4 | Phase 3 (formatters) | Connect Snowflake + dbt, register data service pipelines |
| 4-6 | Phase 4 (automation + push integration) | Self-serve rollout, Slack alerts, governance workflows |

---

## Implementation Plan

### Phase 0: Proof of Value (Current)
- [x] Domo API client exists and works (`~/Development/domo/`)
- [x] Unified dataset identified and schema mapped (252 columns, 3M rows)
- [x] Architecture documented (this document)
- [x] Exploratory queries run — data quality findings documented above
- [x] Spend/revenue row structure confirmed — two row types, same dataset, no cross-join needed
- [x] ROAS calculation validated — aggregation logic works correctly
- [x] Funnel 357 performance analysis run — 77 ads, $95K spend, $187K revenue, 1.96x ROAS, 7 winners identified
- [x] Expansion type and angle saturation analysis validated
- [x] LTV columns confirmed unavailable in this dataset — will need separate source or Snowflake
- [x] Query limits tested to 500K rows — no cap, linear scaling (~45s for full Facebook pull)
- [x] Platform distribution mapped — 12 platforms, Facebook dominant (201K), cross-platform viable
- [ ] Generate a formatted sample brief for Creative OS team review
- [ ] Run reconciliation check: compare 357 top ads between data service and Tess SSS

### Phase 1: Foundation
- [ ] Create `pg-data-service/` directory structure (adapters, models, contracts, formatters, catalog, outputs)
- [ ] Implement `adapters/base.py` (abstract interface) and `adapters/domo.py` (wraps existing DomoClient)
- [ ] Build first model: `ad_performance.py` — ROAS, classification, spend deduplication logic
- [ ] Build first contract: `contracts/v1/ad_performance.yaml` (validation schema; canonical defs go in OpenMetadata)
- [ ] Build first formatter: `neco_brief.py` — proof that the pipeline works end-to-end
- [ ] Add `config.yaml` with funnel list and thresholds
- [ ] Add `outputs/` to `.gitignore` (generated files, not committed)
- [ ] Add `.env` handling (credentials never committed)
- [ ] **OpenMetadata:** Deploy instance (VM + Docker Compose), connect Domo connector, begin PII tagging on source datasets
- [ ] **OpenMetadata:** Create `catalog/pii_manifest.yaml` from initial PII audit — formatters reference this for stripping rules

### Phase 2: Core Models
- [ ] `angle_analysis.py` — root angle saturation, variation counts, performance by angle
- [ ] `expansion_analysis.py` — which expansion types win for which products
- [ ] `order_economics.py` — AOV, upsell rate, COGS, profit per ad
- [ ] `audience.py` — geographic and behavioral segmentation
- [ ] `talent_performance.py` — talent/editor/copywriter combo analysis
- [ ] `creative_velocity.py` — launch cadence, testing vs proven assets
- [ ] **OpenMetadata:** Glossary entries for all classification thresholds, metric definitions, and business rules defined in models
- [ ] **OpenMetadata:** Complete PII tagging across all 154 Domo datasets

### Phase 3: All Formatters
- [ ] `tess_enrichment.py` — backfill root angles, daily performance updates for SSS
- [ ] `orion_summary.py` — executive KPIs for daily briefing modules
- [ ] `veda_priorities.py` — expansion recommendations with performance justification
- [ ] `raw_export.py` — CSV/JSON for ad-hoc use or new consumers
- [ ] `marketing_os.py` — TBD format for Marketing OS consumption

### Phase 4: Automation & Catalog Integration
- [ ] Daily refresh schedule (launchd or cron)
- [ ] On-demand query capability (CLI: `python service.py --funnel 357 --consumer neco`)
- [ ] **OpenMetadata push:** `catalog/push.py` — after each run, push pipeline status, row counts, output manifest, duration to OpenMetadata API (replaces custom freshness monitoring)
- [ ] Automated PII stripping verification on all formatter outputs (validates against `catalog/pii_manifest.yaml`)
- [ ] **OpenMetadata:** Register data service pipelines as lineage (Domo → adapter → model → formatter → output)
- [ ] **OpenMetadata:** Document both data paths (Tess CSV pipeline + data service pipeline) for reconciliation traceability
- [ ] **OpenMetadata:** Slack integration — schema change alerts, freshness failures, quality threshold breaches

### Phase 4.5: Claude Code Skills + Custom Connectors
- [ ] **Install OpenMetadata Claude Code skills plugin** — clone OM repo, `claude plugin install skills/`. Gives `/scaffold-connector`, `/connector-review`, `/load-standards`
- [ ] **Scaffold custom Domo beast-modes connector** — use `/scaffold-connector` to build a connector that extracts beast mode formulas from Domo API (using existing DomoClient). Surfaces tribal knowledge the native connector misses. Validate with `/connector-review`
- [ ] **Evaluate Mixpanel connector need** — if Mixpanel events don't fully land in Snowflake, scaffold a custom Mixpanel connector using the same tooling
- [ ] **Evaluate upgrading push.py to a proper OM connector** — if the lightweight push script proves limiting, use `/scaffold-connector` to build a first-class PG Data Service connector (pipeline runs in native UI, auto-registered lineage)

### Phase 5: Snowflake Migration
- [ ] Build `adapters/snowflake.py` implementing same `DataAdapter` interface
- [ ] Validate output parity (Domo vs Snowflake for same queries, same date ranges)
- [ ] Switch config to Snowflake
- [ ] Decommission Domo adapter
- [ ] **OpenMetadata:** Connect Snowflake + dbt connectors — lineage auto-updates as dbt models replace Domo dataflows
- [ ] **OpenMetadata:** Self-serve rollout — onboard marketing, product, finance stakeholders with team-based permissions

---

## Key Decisions Made

1. **Data service lives at `_performance-golf/pg-data-service/`** — same level as Creative OS and Marketing OS. Not inside any single OS.
2. **Adapter pattern for source abstraction** — Domo today, Snowflake tomorrow. Business logic never touches the adapter.
3. **Data team owns contracts** — other teams request via PR-like process. Data team reviews, implements, ships.
4. **Daily cadence** — Domo dataset updates daily. Our service should match or exceed.
5. **Self-serve model** — agents and teams consume from `outputs/` or call the service. No human relay.
6. **Tess is a consumer, not the gateway** — data service sits upstream. Tess, Neco, Veda, Orion, Marketing OS all consume directly.
7. **OpenMetadata is the catalog/governance layer** — deployed in parallel with the data service, not after. Provides discovery, lineage, glossary, PII governance, and freshness monitoring.
8. **Push model for catalog integration** — `service.py` pushes pipeline metadata to OpenMetadata API after each run. No separate polling infrastructure.
9. **OpenMetadata is the system of record for contract definitions** — local YAML files are validation schemas and version snapshots. Canonical field definitions, ownership, and PII tags live in the catalog.
10. **Claude Code skills for custom connectors** — OpenMetadata's first-party Claude Code plugin (`/scaffold-connector`, `/connector-review`) is the workflow for building custom connectors (Domo beast modes, Mixpanel, and potentially a PG Data Service connector). AI-assisted development with built-in QA against 17 golden standards.

---

## Open Questions

### Data Quality (Must Resolve Before Phase 1)

1. ~~**Where does Spend live?**~~ **RESOLVED.** Spend and revenue coexist in the same dataset as different row types. Ad-metric rows have Spend (one per ad per day). Order rows have totalAmount (one per order). Same `Ad` field, mutually exclusive values. No cross-dataset join needed. See "Exploratory Findings" section for full detail.

2. ~~**14/30/60/90-Day Ad Rev columns**~~ **CLOSED.** This dataset has not historically provided LTV data. LTV analysis will need to come from a different source — either `PGZ | CC | Order Item LTV` (10.3M rows) or the future Snowflake stack. For now, we use `totalAmount` (same-day order value) as the revenue metric. This is a known limitation — we're measuring immediate conversion value, not customer lifetime value.

3. ~~**Spend deduplication method**~~ **RESOLVED.** Ad-metric rows are already one-per-ad-per-day. Simple `SUM(Spend) WHERE Spend > 0 GROUP BY Ad` gives correct totals. No prorating or deduplication logic needed beyond filtering out zero-spend order rows.

### Architecture (Should Resolve During Phase 1)

4. **On-demand vs scheduled** — daily cron is simpler and predictable. On-demand (query at session start) is always fresh but adds latency and API load. Could do both: daily cron for baseline, on-demand for specific funnel deep-dives. Leaning toward daily cron + on-demand CLI.

5. ~~**Domo SQL limitations / query size limits**~~ **RESOLVED.** Tested up to 500,000 rows in a single query — no hard cap hit. Performance scales linearly:

   | Rows | Time | Notes |
   |------|------|-------|
   | 10,000 | 3.7s | |
   | 25,000 | 7.7s | |
   | 50,000 | 14.7s | |
   | 100,000 | 27.5s | |
   | 250,000 | 70.7s | |
   | 500,000 | 107.4s | Full dataset has 3M rows; 500K is ~16% |

   Aggregation must still happen in Python (no GROUP BY in Domo SQL), but row volume is not a constraint. A full Facebook pull (201K rows) takes ~45s. Per-funnel queries are well under 30s. Daily refresh is easily feasible.

   **Platform distribution** (from 500K row sample): Facebook 201K, pmax 165K, YouTube 44K, search 26K, oddbytes 24K, demand_gen 19K, display 7K, shopping 5K, TikTok 5K, Microsoft Ads 4K, Snapchat 449, X 127. Cross-platform analysis is viable from this single dataset.

6. ~~**Multi-dataset joins**~~ **RESOLVED.** Spend and revenue are in the same dataset (different row types). No cross-dataset join needed for core ROAS/performance analysis. Multi-dataset joins only needed for enrichment (e.g., LTV from `CC | Order Item LTV`, funnel analytics from `COC & Mixpanel`).

### Strategic (Resolve Before Phase 2)

7. ~~**Snowflake timeline**~~ **ANSWERED: Q3/Q4 2026.** The modern data stack (Snowflake as source of truth) is targeted for Q3/Q4. This means the Domo adapter needs to be solid enough to run reliably for 4-6 months, but not over-engineered. Keep the adapter thin, invest in models and formatters (which carry over to Snowflake unchanged).

8. **Cross-platform scope for v1** — the 15-position naming convention is primarily Facebook. Google pmax/search ads can't be parsed the same way. For v1, should we focus exclusively on Facebook (where the naming convention gives us creative-level analysis) and treat other platforms as aggregate-only?

9. **Reconciliation with Tess** — this is the trust question. When numbers disagree, people stop using both systems. The known divergence sources are:

   **Why numbers WILL differ:**
   - **Data freshness**: Tess runs weekly from a CSV export. Data service queries Domo daily. Same ad will show different spend/revenue depending on when you look.
   - **Revenue metric**: Tess uses `Net Revenue` from the CSV (which may include returns/refunds adjustments). Data service uses `totalAmount` from order rows (point-of-sale value before refunds). These are structurally different numbers.
   - **ROAS formula**: Tess calculates `Net ROAS = (Spend + Net Revenue) / Spend`. Data service calculates `ROAS = Total Revenue / Total Spend`. If Tess's "Net Revenue" is already net of spend (i.e., profit), the formulas produce different results.
   - **Spend source**: Tess gets spend from the weekly Domo CSV. Data service gets spend from ad-metric rows in the orders dataset. These may come from different Domo dataflows with different refresh times.
   - **Asset coverage**: Tess tracks 1,102 assets. Data service sees whatever the Domo dataset contains — potentially more (older assets) or fewer (if the dataset has a time window filter).
   - **Classification thresholds**: Both use Winner >= 1.0 ROAS / $2,500 spend, but applied to different underlying numbers = different classifications for borderline assets.

   **Proposed reconciliation rules (needs alignment with Christopher):**
   1. **Neither system is "wrong."** They measure different things from different vantage points. Document the differences, don't hide them.
   2. **Data service is the source for order-level attribution.** How many orders did this ad drive? What did those customers buy? What's the AOV? Data service owns this.
   3. **Tess SSS remains the operational system of record for the Creative OS team.** Tess's numbers are what the media buyers and creative team have been using. Don't unilaterally replace them.
   4. **When a discrepancy matters, trace it.** Build a reconciliation check: for the top 20 ads by spend, compare Tess SSS values vs data service values. Document the delta and the reason. Run this weekly.
   5. **Converge over time.** As the data service matures, Tess can consume from it instead of the raw CSV — eliminating the divergence at the source. But this is a Phase 3+ change, not a launch requirement.

10. **Naming convention version alignment** — Tess owns the naming convention at v3.9. Our parser must match exactly. If Tess updates to v4.0, our parser breaks. Need a sync mechanism or shared definition file.

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| ~~Spend and revenue in different datasets~~ | ~~Medium~~ | ~~High~~ | **RESOLVED** — same dataset, different row types. Aggregation logic confirmed working. |
| ~~Domo API query size limits~~ | ~~Low~~ | ~~Medium~~ | **RESOLVED** — tested to 500K rows, linear scaling, no cap. Full Facebook pull (~201K rows) in ~45s. |
| Numbers disagree with Tess SSS | High | High — destroys trust in both systems | Define reconciliation rules before launch. Document known discrepancy sources. |
| Snowflake migration happens mid-build (Q3/Q4) | Medium | Low — adapter pattern handles this | Keep Domo adapter thin. Invest in models/formatters (carry over). 4-6 months of Domo runway. |
| Consumer teams build their own data queries instead of using the service | Medium | Medium — contradictory numbers, duplicated effort | Make the service easier to use than raw queries. Document the "one source of truth" principle in WORKSPACE.md. |
| PII leaks into agent-consumable outputs | Low | Very High — legal/compliance risk | PII stripping is a non-negotiable in every formatter. Validated against OpenMetadata PII manifest. |
| OpenMetadata becomes shelfware | Medium | Medium — lose governance/discovery value | Deploy in parallel with data service (not after). Immediate value from Domo connector + PII tagging. Push model means catalog stays current without manual effort. |
