# PG Data Service — What This Is and How It Works

## The Problem

Creative OS has 4 agents that all need ad performance data, but data access is bottlenecked through manual processes — CSV exports from Domo, copy-paste between agents, no programmatic access. Christopher Ogle has been asking for direct API access to the data.

## What We Built

A Python data access layer that:

1. **Talks directly to Domo's API** — no more manual CSV exports
2. **Does all the Beast Mode math** — Net ROAS, Gross ROAS, CPA, NC Net ROAS, AOV, CPC, CTR, CPM, and every other metric from the Ad Performance dashboard
3. **Strips PII automatically** — no email addresses, names, or payment info in any output
4. **Provides a dataset allowlist** — Patrick controls which datasets are queryable
5. **Replicates the Domo Ad Performance card** — 30 columns with Domo display names

Classification (Winner/Potential/Underperformer/Testing) is NOT applied by the service — that's a consumer-side business rule. The service provides the metrics; consumers decide what to do with them.

**Primary interface**: `api.py` — `from api import get_raw, get_enriched` — returns DataFrames

**Domo card replica**: `scripts/export_ad_performance.py` — returns enriched DataFrame with Domo Ad Performance card column names

## How It Works (Plain English)

```
Consumer calls:    from api import get_raw, get_enriched

get_raw("ad_performance", "2026-01-01", "2026-03-15")
  Step 1 — VALIDATE:  Check dataset name against allowlist (datasets.yaml)
  Step 2 — FETCH:     Adapter talks to Domo API, pulls raw rows
  Step 3 — HASH:      Adds email_address_hash for cohort tracking
  Step 4 — STRIP PII: Drops all PII columns (emailAddress, names, addresses, etc.)
  Step 5 — RETURN:    DataFrame ready to use

get_enriched("2026-01-01", "2026-03-15")
  Step 1 — FETCH:     Adapter pulls ad-metric rows (Spend > 0) and order rows (totalAmount > 0)
  Step 2 — MATH:      Aggregates each set, joins by ad name, computes all Beast Modes:
                       • Net Revenue, Net ROAS, Gross ROAS, CPA, NC CPA
                       • AOV, NC AOV, RC AOV, CPC, CTR, CPM
                       • NLPT, Fixed Refund NLPT, Cost per SC Trial
                       • NC %, CVR %, NC CVR %, RC CVR %
                       • ... and more
  Step 3 — STRIP PII: Drops all PII columns
  Step 4 — RETURN:    DataFrame with all metrics
```

## Why It's Built in Layers

The two layers exist for one reason: **Snowflake is coming in Q3/Q4 2026.**

```
ADAPTER LAYER          API LAYER
(Domo-specific)        (survives forever)

adapters/domo.py  -->  api.py
  Talks to Domo API      get_raw()
  Computes Beast Modes   get_enriched()
  Dies when Snowflake    strip_pii()
  arrives

adapters/snowflake.py
  (future)
  Returns same columns
  from dbt models
```

**Switching to Snowflake = changing one line in `config.yaml`:**
```yaml
# Before:
adapter: domo

# After:
adapter: snowflake
```

Zero code changes in API.

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
| **CPA** | Spend / total_customers | Cost to acquire one customer |
| **NC CPA** | Spend / new_customers | Cost to acquire one NEW customer |
| **Net AOV** | CPA x Net ROAS | Net value per customer acquired |
| **AOV** | Gross Revenue / Orders | Gross average order value |
| **NC AOV** | NC Gross Revenue / New Customers | New customer average order value |
| **RC AOV** | (Gross Revenue - NC Gross Revenue) / Returning Customers | Returning customer average order value |
| **NLPT** | Net Revenue / SC Trials Started | Net revenue per trial |
| **Fixed Refund NLPT** | Fixed Refund Net Revenue / SC Trials Started | NLPT with 8% flat refund assumption |
| **Cost / SC Trials** | Spend / SC Trials Started | Spend per trial started |
| **NC %** | new_customers / total_customers | What % of buyers are new |
| **CVR %** | total_customers / clicks | Overall click-to-customer rate |
| **NC CVR %** | new_customers / clicks | New customer conversion rate |
| **RC CVR %** | returning_customers / clicks | Returning customer conversion rate |
| **CPC** | Spend / Clicks | Cost per click |
| **CTR** | Clicks / Impressions | Click-through rate |
| **CPM** | (Spend / Impressions) x 1000 | Cost per thousand impressions |
| **Fixed Refund NR** | Same as Net Revenue but uses 8% flat refund estimate | Day-of-sale projection |

For full definitions, gotchas, and "do not derive" rules, see `catalog/DATA_DICTIONARY.md`.

## Classification (Reference Only)

Classification is a consumer-side business rule, not applied by the service. Tess PRD v1.4 thresholds for reference:

| Class | Rule | What It Means |
|-------|------|---------------|
| **Winner** | Net ROAS >= 100% AND spend >= $2,500 | Profitable and proven at scale |
| **Potential** | Net ROAS 80-99% | Close to breakeven, worth watching |
| **Underperformer** | Net ROAS < 80% | Losing money at scale |
| **Testing** | Spend < $2,500 | Not enough data to judge |

## Key Data Facts

- **`dateCreated`** is the date column used for filtering
- **`email_address_hash`** is the anonymized customer identifier for cohort analysis (SHA-256, first 16 chars)
- **`New Customers`** field: `'0'` = returning customer, anything else = new
- **`Refunded Revenue`** comes in as a negative number from Domo's transform
- **`# SC Trials Started`** has a line-break in the column name (Domo quirk) — cleaned automatically
- **`Valid 15-Position Ad Name?`** = 1 filters to ads with the naming convention
- **Always use `[Funnel]`** (the parsed position) not the campaign-level `Funnel` column

## File Map

```
pg-data-service/
├── api.py                  ← Primary interface. get_raw(), get_enriched(), list_datasets()
├── datasets.yaml           ← Approved dataset allowlist (friendly name → dataset ID)
├── config.yaml             ← Adapter choice, dataset ID
├── CLAUDE.md               ← Agent instructions for working in this directory
├── PG-DATA-SERVICE.md      ← Full architecture doc (all decisions)
├── docs/
│   └── OVERVIEW.md         ← This file
├── adapters/
│   ├── base.py             ← Abstract interface (what any adapter must return)
│   └── domo.py             ← Domo implementation (Beast Modes, aggregation, email hash)
├── utils/
│   └── pii.py              ← PII stripping utility (strip_pii, load_pii_columns)
├── scripts/
│   └── export_ad_performance.py  ← Domo Ad Performance card replica (30 columns)
└── catalog/
    ├── pii_manifest.yaml   ← PII column list (what gets stripped)
    ├── data_dictionary.yaml ← Per-dataset metric definitions (OM Glossary format)
    └── DATA_DICTIONARY.md  ← Human-readable data dictionary
```
