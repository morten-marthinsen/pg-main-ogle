# PG Data Service

> **Path**: `_performance-golf/pg-data-service/`
> **Owner**: Data Team (Patrick Hayes)
> **Runtime**: Python 3.x (pandas, requests, pyyaml, python-dotenv)
> **Architecture Doc**: `PG-DATA-SERVICE.md`

---

## What This Is

Shared data layer for all Creative OS agents and future systems. Queries Domo (now), will query Snowflake (Q3/Q4 2026). Adapter pattern means zero business logic rewrite when switching sources.

**Primary interface**: `api.py` — `from api import get_raw, get_enriched, list_datasets` (returns DataFrames, PII stripped)

**Domo card replica**: `scripts/export_ad_performance.py` — returns enriched DataFrame with Domo Ad Performance card column names (30 columns)

The API is the primary interface for Christopher Ogle's pipeline. `datasets.yaml` is the allowlist — only datasets registered there are queryable.

---

## Architecture Decisions (Locked)

### Beast Modes Live in the Adapter, Not the Models

**Decision (2026-03-16):** Beast Mode calculations (Net ROAS, NC Net ROAS, CPA, etc.) are Domo-specific workarounds. Domo can't do GROUP BY, so we compute everything in pandas inside `adapters/domo.py`. When Snowflake arrives with pre-computed dbt models, the Snowflake adapter returns the same columns natively.

**Why:** The Beast Mode code is throwaway. If it lived in models, you'd delete "business logic" during migration. In the adapter, it dies naturally when `adapters/domo.py` is decommissioned.

### Classification is Consumer-Side (Not in the Service)

Classification (Winner/Potential/Underperformer/Testing) is a Tess business rule, not a data access concern. The data dictionary documents the thresholds if a consumer wants to implement it. The service provides the metrics — consumers decide what to do with them.

### PII Handling

- `emailAddress` is the distinct customer key (used for CPA, NC%, CVR% calculations)
- PII values are consumed in the adapter's aggregation step — only counts survive into the enriched DataFrame
- `strip_pii()` is called unconditionally on every API return path — no escape hatch, no `include_pii` parameter
- PII column list lives in `catalog/pii_manifest.yaml` (single source of truth)

### Security

- All date inputs are validated via `_validate_date()` (YYYY-MM-DD regex) before SQL interpolation
- `DOMO_CLIENT_PATH` is a required env var — no hardcoded machine paths in source code
- **Enriched pipeline** filters `Ad Platform = 'facebook'` (prevents cross-platform inflation in Beast Mode calculations)
- **Raw pipeline** returns all platforms — consumers get the full dataset for ad-hoc analysis

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
| **CPA** | `Spend / total_customers` (pre-computed distinct count) |
| **NC CPA** | `Spend / new_customers` (pre-computed distinct count) |
| **Net AOV** | `CPA * Net ROAS` |
| **AOV** | `Gross Revenue / Orders` |
| **NC AOV** | `NC Gross Revenue / New Customers` |
| **RC AOV** | `(Gross Revenue - NC Gross Revenue) / (Total Customers - New Customers)` |
| **NLPT** | `Net Revenue / # SC Trials Started` |
| **Fixed Refund NLPT** | `Fixed Refund Net Revenue / # SC Trials Started` |
| **Cost / SC Trials** | `Spend / # SC Trials Started` |
| **NC %** | `new_customers / total_customers` |
| **CVR %** | `total_customers / clicks` |
| **NC CVR %** | `new_customers / clicks` |
| **RC CVR %** | `returning_customers / clicks` |
| **CPC** | `Spend / Clicks` |
| **CTR** | `Clicks / Impressions` |
| **CPM** | `(Spend / Impressions) * 1000` |
| **Fixed Refund Net Revenue** | Same as Net Revenue but uses `totalAmount * 0.08` instead of actual Refunded Revenue |

### Known Issue (2026-03-16)
Gross Profit formula in Domo subtracts `Refunded Revenue`, but Refunded Revenue is already negative. This may be a Domo Beast Mode bug — implementing as-is to match Domo numbers. Investigate later.

---

## Classification (Reference Only)

The service does not classify ads. Classification is a consumer-side business rule. Tess PRD v1.4 thresholds are documented in `catalog/DATA_DICTIONARY.md` for consumers who want to implement them.

---

## Key Data Facts

- **Two row types in one dataset**: ad-metric rows (`Spend > 0`) and order rows (`totalAmount > 0`). Never both on same row. Aggregate separately, join on `Ad` name.
- **Domo SQL**: No GROUP BY, no aggregate functions. All aggregation in pandas.
- **`Valid 15-Position Ad Name?`**: Always filter on this = 1 for creative-level analysis.
- **`[Funnel]`**: Use the pre-parsed position, NOT the campaign-level `Funnel` column.
- **`New Customers`**: String field. `'0'` = returning, anything else = new.
- **`Refunded Revenue`**: Comes in as negative from the Domo transform.
- **SC Trials**: Computed by counting distinct non-empty `SC Trial Start PurchaseIDs` per ad. The raw dataset has no `# SC Trials Started` column — that's a Domo Beast Mode.
- **Ad names**: Normalized to lowercase. Domo may store uppercase.

---

## File Map

| File | What It Does |
|------|-------------|
| `api.py` | Public Python API — `get_raw()`, `get_enriched()`, `list_datasets()` |
| `datasets.yaml` | Approved dataset allowlist (friendly name → dataset ID) |
| `config.yaml` | Adapter choice, dataset ID |
| `adapters/base.py` | Abstract adapter interface |
| `adapters/domo.py` | Domo implementation — fetch, aggregate, Beast Modes |
| `utils/pii.py` | PII stripping utility (`strip_pii()`, `load_pii_columns()`) |
| `scripts/export_ad_performance.py` | Domo Ad Performance card replica (30 columns, Domo display names) |
| `catalog/pii_manifest.yaml` | PII column list (single source of truth) |
| `catalog/data_dictionary.yaml` | Metric definitions, formulas, business rules (OM Glossary format) |
| `catalog/DATA_DICTIONARY.md` | Human-readable data dictionary — consuming agents MUST read this |

---

## Python API Usage

```python
from api import get_raw, get_enriched, list_datasets

# See what's available
list_datasets()
# {'ad_performance': 'Facebook ad performance + CheckoutChamp orders...'}

# Raw data — any approved dataset, PII always stripped
df = get_raw("ad_performance", "2026-01-01", "2026-03-15")

# Enriched — all Beast Modes computed, PII stripped
df = get_enriched("2026-01-01", "2026-03-15")

# Domo Ad Performance card replica (30 columns, Domo display names)
from scripts.export_ad_performance import get_ad_performance_card
df = get_ad_performance_card("2026-01-01", "2026-03-15", day="2026-03-15")
```

### Adding a New Dataset

1. Get the Domo dataset ID
2. Add an entry to `datasets.yaml` with friendly name, dataset ID, description
3. Done — `get_raw("new_name", ...)` works immediately

## Adding a New Beast Mode Metric

1. Add the calculation in `adapters/domo.py::_compute_beast_modes()`
2. Add the term to `catalog/data_dictionary.yaml`
3. When Snowflake arrives, the dbt model provides it natively — no adapter change needed.

## Switching to Snowflake

1. Create `adapters/snowflake.py` implementing `DataAdapter`
2. Change `config.yaml`: `adapter: snowflake`
3. Done. API unchanged.
