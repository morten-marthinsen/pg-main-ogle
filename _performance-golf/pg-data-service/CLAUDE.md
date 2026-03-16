# PG Data Service — Agent Instructions

> **Path**: `_performance-golf/pg-data-service/`
> **Owner**: Data Team (Patrick Hayes)
> **Runtime**: Python 3.x (pandas, requests, pyyaml, python-dotenv)
> **Architecture Doc**: `PG-DATA-SERVICE.md` (905 lines — all decisions locked)

---

## What This Is

Shared data layer for all Creative OS agents and future systems. Queries Domo (now), will query Snowflake (Q3/Q4 2026). Adapter pattern means zero business logic rewrite when switching sources.

---

## Architecture Decisions (Locked)

### Beast Modes Live in the Adapter, Not the Models

**Decision (2026-03-16):** Beast Mode calculations (Net ROAS, NC Net ROAS, CPA, etc.) are Domo-specific workarounds. Domo can't do GROUP BY, so we compute everything in pandas inside `adapters/domo.py`. When Snowflake arrives with pre-computed dbt models, the Snowflake adapter returns the same columns natively. The model layer receives identical schemas either way.

**Why:** The Beast Mode code is throwaway. If it lived in models, you'd delete "business logic" during migration. In the adapter, it dies naturally when `adapters/domo.py` is decommissioned.

### Model Layer is Thin

The model layer only does:
1. **Classification** — Winner/Potential/Underperformer/Testing based on Net ROAS and spend thresholds
2. **Angle analysis** — Group by root angle, flag saturation, identify winning angles

It does NOT compute metrics. It receives them from the adapter.

### Formatters Are Plain Functions

No registry, no plugin system. Each formatter is a function that receives a DataFrame, strips PII, and writes a file. Adding a new consumer = one new file.

### PII Handling

- `emailAddress` is the distinct customer key (used for CPA, NC%, CVR% calculations)
- PII values are consumed in the adapter's aggregation step — only counts survive into the enriched DataFrame
- Formatters call `strip_pii()` as belt-and-suspenders defense
- PII column list lives in `catalog/pii_manifest.yaml`

---

## Beast Mode Formulas (Source: Domo, 2026-03-16)

All formulas implemented in `adapters/domo.py::_compute_beast_modes()`.

| Metric | Formula |
|--------|---------|
| **Net Revenue** | `totalAmount - Physical COGS + Refunded Revenue (neg) - Agency Fees - CC Fees - Spend` |
| **Net ROAS** | `(Net Revenue / Spend) + 1` — displayed as %, 100% = breakeven |
| **Gross ROAS** | `totalAmount / Spend` |
| **Gross Profit** | `totalAmount - Physical COGS - Refunded Revenue` |
| **NC Net ROAS** | Same as Net ROAS but revenue/cost side filtered to `New Customers != '0'`, spend is total |
| **CPA** | `Spend / COUNT(DISTINCT emailAddress)` |
| **NC CPA** | `Spend / COUNT(DISTINCT emailAddress WHERE New Customers != '0')` |
| **Net AOV** | `CPA * Net ROAS` |
| **NLPT** | `Net Revenue / # SC Trials Started` |
| **NC %** | `new_customer_emails / total_emails` |
| **CVR %** | `total_customers / clicks` |
| **NC CVR %** | `new_customers / clicks` |
| **RC CVR %** | `returning_customers / clicks` |
| **Fixed Refund Net Revenue** | Same as Net Revenue but uses `totalAmount * 0.08` instead of actual Refunded Revenue |

### Known Issue (2026-03-16)
Gross Profit formula in Domo subtracts `Refunded Revenue`, but Refunded Revenue is already negative. This may be a Domo Beast Mode bug — implementing as-is to match Domo numbers. Investigate later.

---

## Classification Thresholds (from Tess PRD v1.4)

| Class | Condition |
|-------|-----------|
| Winner | Net ROAS >= 1.0 (100%) AND spend >= $2,500 |
| Potential | Net ROAS 0.80–0.99 (80–99%) |
| Underperformer | Net ROAS < 0.80 (< 80%) |
| Testing | Spend < $2,500 |

Saturation: 3+ variations of same root angle = saturated.

---

## Key Data Facts

- **Two row types in one dataset**: ad-metric rows (`Spend > 0`) and order rows (`totalAmount > 0`). Never both on same row. Aggregate separately, join on `Ad` name.
- **Domo SQL**: No GROUP BY, no aggregate functions. All aggregation in pandas.
- **`Valid 15-Position Ad Name?`**: Always filter on this = 1 for creative-level analysis.
- **`[Funnel]`**: Use the pre-parsed position, NOT the campaign-level `Funnel` column.
- **`New Customers`**: String field. `'0'` = returning, anything else = new.
- **`Refunded Revenue`**: Comes in as negative from the Domo transform.
- **`# SC Trials Started`**: Column name has `<BR>` / newline in Domo — cleaned on fetch.
- **Ad names**: Normalized to lowercase. Domo may store uppercase.

---

## File Map

| File | What It Does |
|------|-------------|
| `service.py` | CLI orchestrator — `python service.py enrich --output neco` |
| `config.yaml` | Adapter choice, dataset ID, thresholds, lookback days |
| `adapters/base.py` | Abstract adapter interface |
| `adapters/domo.py` | Domo implementation — fetch, aggregate, Beast Modes |
| `models/ad_performance.py` | Classification only (thin — adapter does the heavy lifting) |
| `models/angle_analysis.py` | Root angle grouping, saturation flags |
| `formatters/neco_brief.py` | Markdown brief per funnel for Neco Context Gatherer |
| `formatters/tess_enrichment.py` | CSV with all metrics for Tess SSS integration |
| `formatters/raw_export.py` | CSV dump of raw data |
| `formatters/_shared.py` | PII stripping utility |
| `contracts/v1/ad_performance.yaml` | Output schema definition |
| `catalog/pii_manifest.yaml` | PII column list |

---

## CLI Usage

```bash
# Enriched pipeline — all outputs
python service.py enrich --from 2026-01-01 --to 2026-03-15 --output all

# Enriched — Neco briefs only
python service.py enrich --output neco

# Enriched — Tess CSV only
python service.py enrich --output tess

# Raw dump (all columns, PII stripped)
python service.py raw --limit 10000

# Date range defaults to last 90 days from config.yaml
```

---

## Adding a New Consumer

1. Create `formatters/new_consumer.py` with a function that takes `(ad_perf_df, angle_df, output_dir, date_from, date_to)`
2. Call `strip_pii()` first
3. Add the output name to `service.py`'s routing
4. Done. No model or adapter changes needed.

## Adding a New Beast Mode Metric

1. Add the calculation in `adapters/domo.py::_compute_beast_modes()`
2. Add the column to `contracts/v1/ad_performance.yaml`
3. Update `formatters/tess_enrichment.py::COLUMN_DISPLAY_NAMES` if Tess needs it
4. When Snowflake arrives, the dbt model provides it natively — no adapter change needed.

## Switching to Snowflake

1. Create `adapters/snowflake.py` implementing `DataAdapter`
2. Change `config.yaml`: `adapter: snowflake`
3. Done. Models and formatters unchanged.
