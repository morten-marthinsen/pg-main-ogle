# PG Data Service — What This Is and How It Works

## The Problem

Creative OS has 4 agents that all need ad performance data:

- **Tess** gets a weekly CSV from Domo. She processes it into a Google Sheet (the SSS spreadsheet). She's the only one with data access.
- **Neco** is supposed to pull performance data from Tess at session start. That pull mechanism doesn't exist. Neco writes copy blind.
- **Veda** gets expansion recommendations from Tess but never sees performance results.
- **Orion** reads session logs. No direct ad performance visibility.

The data flows between agents are mostly manual — someone reads the spreadsheet and pastes data into the next agent's context. 4 of 6 inter-agent data bridges have no code.

## What We Built

A Python program that:

1. **Talks directly to Domo's API** — no more manual CSV exports
2. **Does all the Beast Mode math** — Net ROAS, Gross ROAS, CPA, NC Net ROAS, NLPT, and every other metric from the Ad Performance dashboard
3. **Classifies every ad** — Winner, Potential, Underperformer, or Testing
4. **Outputs ready-to-use reports** for each agent that needs data

One command: `python service.py enrich --output all` → all reports generated in ~4 seconds.

## How It Works (Plain English)

```
You run:          python service.py enrich --output tess

Step 1 — FETCH:   The adapter talks to Domo's API and pulls two sets of rows:
                   • Ad-metric rows (spend, clicks, impressions per ad per day)
                   • Order rows (revenue, COGS, refunds per order)
                   These are two different row types in the same dataset.
                   An ad has spend rows AND order rows, but never both on the same row.

Step 2 — MATH:    The adapter aggregates each set separately, joins them by ad name,
                   then computes every Beast Mode metric:
                   • Net Revenue = totalAmount - COGS + Refunds - Agency Fees - CC Fees - Spend
                   • Net ROAS = (Net Revenue / Spend) + 1    (100% = breakeven)
                   • Gross ROAS = totalAmount / Spend
                   • CPA = Spend / unique customers
                   • NC Net ROAS = same formula, but only new customer revenue
                   • ... and 10+ more

Step 3 — CLASSIFY: The model layer tags each ad:
                   • Winner: Net ROAS >= 100% AND spend >= $2,500
                   • Potential: Net ROAS 80-99%
                   • Underperformer: Net ROAS < 80%
                   • Testing: spend < $2,500

Step 4 — FORMAT:  The formatter shapes the data for whoever needs it:
                   • Tess gets a CSV with all metrics (replaces the manual Domo export)
                   • Neco gets a markdown brief per funnel (top performers, winning angles, etc.)
                   • Raw mode dumps everything for ad-hoc analysis
```

## Why It's Built in Layers

The three layers exist for one reason: **Snowflake is coming in Q3/Q4 2026.**

```
ADAPTER LAYER          MODEL LAYER              FORMATTER LAYER
(Domo-specific)        (survives forever)       (survives forever)

adapters/domo.py  -->  models/ad_performance.py --> formatters/neco_brief.py
  Talks to Domo API      Classifies ads             Markdown brief per funnel
  Computes Beast Modes   Angle analysis
  Dies when Snowflake                            --> formatters/tess_enrichment.py
  arrives                                            CSV with all metrics

adapters/snowflake.py                            --> formatters/raw_export.py
  (future)                                           Full data dump
  Returns same columns
  from dbt models
```

**The Beast Mode math is a Domo workaround.** Domo can't do GROUP BY in its SQL API, so we compute everything in Python (pandas). When Snowflake arrives, dbt models will pre-compute Net ROAS, CPA, etc. The Snowflake adapter just returns those columns. The model and formatter layers never change.

**Switching to Snowflake = changing one line in `config.yaml`:**
```yaml
# Before:
adapter: domo

# After:
adapter: snowflake
```

That's it. Zero code changes in models or formatters.

## What's in Each Output

### Neco Brief (per funnel)

A markdown file that maps directly to Neco's Context Gatherer contract — the data Neco needs at session start to write informed copy:

- **Portfolio Summary**: total ads, spend, revenue, Net ROAS, winner count
- **Top Performers**: table of winners with expansion type, talent, ROAS
- **Winning Angles**: root angles producing winners, with variation counts
- **Saturated Angles**: angles with 3+ variations (signal to explore new territory)
- **Angles to Avoid**: saturated + underperforming (don't expand these further)
- **Expansion Type Effectiveness**: which expansion types work for this funnel

### Tess Enrichment (CSV)

A CSV with one row per ad and every Beast Mode metric — the same data Christopher sees in the Domo Ad Performance dashboard, but enriched with all 15-position parsed fields. Tess can consume this directly instead of the manual weekly CSV export.

### Raw Export (CSV)

Full dataset dump with all 252 columns. PII stripped by default. For when someone needs to dig into something the enriched pipeline doesn't cover.

## Beast Mode Formulas

These are the exact formulas from Domo's Beast Mode definitions, implemented in `adapters/domo.py`:

| Metric | Formula | What It Tells You |
|--------|---------|-------------------|
| **Net Revenue** | totalAmount - COGS + Refunds (neg) - Agency Fees - CC Fees - Spend | Actual profit after all costs |
| **Net ROAS** | (Net Revenue / Spend) + 1 | Return on ad spend after costs. 100% = breakeven. |
| **Gross Revenue** | totalAmount | Raw order revenue before any deductions |
| **Gross ROAS** | totalAmount / Spend | Return before deducting costs |
| **Gross Profit** | totalAmount - COGS - Refunds | Revenue minus product costs and refunds |
| **NC Net ROAS** | Same as Net ROAS but revenue/costs filtered to new customers only | Acquisition efficiency |
| **CPA** | Spend / unique customers (by email) | Cost to acquire one customer |
| **NC CPA** | Spend / unique new customers | Cost to acquire one NEW customer |
| **Net AOV** | CPA × Net ROAS | Net value per customer acquired |
| **NLPT** | Net Revenue / SC Trials Started | Net revenue per trial |
| **NC %** | New customers / total customers | What % of buyers are new |
| **CVR %** | Total customers / clicks | Overall click-to-customer rate |
| **NC CVR %** | New customers / clicks | New customer conversion rate |
| **RC CVR %** | Returning customers / clicks | Returning customer conversion rate |
| **Fixed Refund NR** | Same as Net Revenue but uses 8% flat refund estimate | Day-of-sale projection |

## Classification Thresholds

From Tess PRD v1.4 — these are the rules everyone uses:

| Class | Rule | What It Means |
|-------|------|---------------|
| **Winner** | Net ROAS >= 100% AND spend >= $2,500 | Profitable and proven at scale |
| **Potential** | Net ROAS 80-99% | Close to breakeven, worth watching |
| **Underperformer** | Net ROAS < 80% | Losing money at scale |
| **Testing** | Spend < $2,500 | Not enough data to judge |

**Saturation**: 3+ variations of the same root angle = saturated territory. Signal to explore new angles rather than expand further.

## The 15-Position Naming Convention

Every Facebook ad follows a 15-element naming format that Tess uses for analysis:

```
357-i081-v0005-xx-1080x1920-xx-nn-xx-img-xxxx-nlc-co-us-20260213
 |    |     |   |     |      |   |   |   |    |    |   |   |    |
 1    2     3   4     5      6   7   8   9   10   11  12  13   14
```

| # | Field | Example | What It Tells You |
|---|-------|---------|-------------------|
| 1 | Funnel | `357` | Which product (357 Fairway Hybrid) |
| 2 | Root Angle ID | `i081` | Which creative concept (`i` = image, `0` = video) |
| 3 | Variation ID | `v0005` | Which version of that concept |
| 4 | Platform | `xx` | Where it runs (`fb`, `yt`, `xx` for images) |
| 5 | Dimensions | `1080x1920` | Aspect ratio |
| 6 | Length Tier | `xx` | Video length (`30s`, `60s`, etc., `xx` for images) |
| 7 | Ad Category | `nn` | Net New, Expansion, Mashup, etc. |
| 8 | Expansion Type | `xx` | Hook swap, duration change, etc. |
| 9 | Asset Type | `img` | Image, video, podcast, etc. |
| 10 | Talent Code | `xxxx` | Who's in it |
| 11 | Editor | `nlc` | Who edited it |
| 12 | Copywriter | `co` | Who wrote the copy |
| 13 | Country | `us` | Target market |
| 14 | Delivery Date | `20260213` | When it shipped |
| 15 | Promo Name | *(blank)* | Black Friday, Xmas, etc. |

This is why Christopher was so keen on the naming convention — it's the only way to analyze *why* an ad works, not just *that* it works. Domo dashboards show you what's spending and what's converting. The naming convention lets you slice by talent, expansion type, root angle, editor — that's Tess's superpower.

## Key Data Facts

- **`dateCreated`** is the date column used for filtering
- **`emailAddress`** is the unique customer identifier (PII — used for counts, never in outputs)
- **`New Customers`** field: `'0'` = returning customer, anything else = new
- **`Refunded Revenue`** comes in as a negative number from Domo's transform
- **`# SC Trials Started`** has a line-break in the column name (Domo quirk) — cleaned automatically
- **`Valid 15-Position Ad Name?`** = 1 filters to ads with the naming convention. Only ~13% of Facebook rows have it.
- **Always use `[Funnel]`** (the parsed position) not the campaign-level `Funnel` column — they can disagree

## CLI Quick Reference

```bash
# All outputs (Neco briefs + Tess CSV)
python service.py enrich --output all

# Just Neco briefs
python service.py enrich --output neco

# Just Tess CSV
python service.py enrich --output tess

# Custom date range
python service.py enrich --from 2026-01-01 --to 2026-03-15 --output all

# Raw data dump (all columns, PII stripped)
python service.py raw --limit 10000

# Defaults to last 90 days if no dates specified
```

## File Map

```
pg-data-service/
├── service.py              ← Run this. The CLI entry point.
├── config.yaml             ← Adapter choice, thresholds, dataset ID
├── CLAUDE.md               ← Agent instructions for working in this directory
├── PG-DATA-SERVICE.md      ← Full architecture doc (905 lines, all decisions)
├── docs/
│   └── OVERVIEW.md         ← This file
├── adapters/
│   ├── base.py             ← Abstract interface (what any adapter must return)
│   └── domo.py             ← Domo implementation (Beast Modes, aggregation)
├── models/
│   ├── ad_performance.py   ← Classification (Winner/Potential/etc.)
│   └── angle_analysis.py   ← Root angle grouping, saturation flags
├── formatters/
│   ├── _shared.py          ← PII stripping utility
│   ├── neco_brief.py       ← Markdown brief per funnel
│   ├── tess_enrichment.py  ← CSV with all metrics
│   └── raw_export.py       ← Full data dump
├── contracts/v1/
│   └── ad_performance.yaml ← Output schema definition
├── catalog/
│   └── pii_manifest.yaml   ← PII column list (what gets stripped)
└── outputs/                ← Generated files (gitignored)
    ├── neco/               ← Per-funnel markdown briefs
    ├── tess/               ← Enriched CSVs
    └── raw/                ← Raw dumps
```
