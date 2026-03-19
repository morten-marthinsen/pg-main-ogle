# PG Data Service — Architecture & Reference

> **Status**: Phase 1 shipped + code-reviewed + hardened (2026-03-16)
> **Owner**: Data Team (Patrick Hayes)
> **Runtime**: Python 3.x (pandas, requests, pyyaml, python-dotenv)
> **Primary interface**: `api.py` (Python API)
> **Metric reference**: `catalog/DATA_DICTIONARY.md`

---

## What This Is

Shared data access layer for all Creative OS agents and future systems. Queries Domo (now), will query Snowflake (Q3/Q4 2026). Adapter pattern means zero business logic rewrite when switching sources.

**Primary interface**: `api.py` -- `from api import get_raw, get_enriched, list_datasets` -- returns DataFrames, PII stripped

**Domo card replica**: `scripts/export_ad_performance.py` -- returns enriched DataFrame with Domo Ad Performance card column names (30 columns)

The API is the primary interface for Christopher Ogle's pipeline. Consumers work with DataFrames directly -- no CSV dumps.

---

## File Map

```
pg-data-service/
├── api.py                     # Public Python API: get_raw(), get_enriched(), list_datasets()
├── datasets.yaml              # Approved dataset allowlist (friendly name -> dataset ID)
├── config.yaml                # Adapter choice, dataset ID
├── README.md                  # Project overview, architecture decisions, usage
├── PG-DATA-SERVICE.md         # This file
├── docs/
│   └── OVERVIEW.md            # Plain-English overview of the system
├── adapters/
│   ├── base.py                # Abstract adapter interface (DataAdapter ABC)
│   └── domo.py                # Domo implementation: fetch, aggregate, Beast Modes
├── utils/
│   └── pii.py                 # PII stripping utility (strip_pii, load_pii_columns)
├── scripts/
│   └── export_ad_performance.py  # Domo Ad Performance card replica (30 columns)
└── catalog/
    ├── pii_manifest.yaml      # PII column list (single source of truth for stripping)
    ├── data_dictionary.yaml   # Metric definitions, formulas, business rules (OM Glossary format)
    └── DATA_DICTIONARY.md     # Human-readable data dictionary -- consuming agents MUST read this
```

---

## How the System Works

```
Consumer calls:    from api import get_raw, get_enriched

get_raw("ad_performance", "2026-01-01", "2026-03-15")
  1. VALIDATE   -- Check dataset name against allowlist (datasets.yaml)
  2. FETCH      -- Adapter talks to Domo API, pulls raw rows
  3. HASH       -- Adds email_address_hash (SHA-256, first 16 chars) for cohort tracking
  4. STRIP PII  -- Drops all PII columns (catalog/pii_manifest.yaml)
  5. RETURN     -- DataFrame ready to use

get_enriched("2026-01-01", "2026-03-15")
  1. FETCH      -- Adapter pulls ad-metric rows (Spend > 0) and order rows (totalAmount > 0)
  2. AGGREGATE  -- Sums each set separately, joins by ad name (lowercase)
  3. MATH       -- Computes all Beast Mode metrics (Net ROAS, CPA, NC %, etc.)
  4. STRIP PII  -- Drops all PII columns
  5. RETURN     -- DataFrame with all metrics
```

### Python API Usage

```python
from api import get_raw, get_enriched, list_datasets

# See what's available
list_datasets()
# {'ad_performance': 'Facebook ad performance + CheckoutChamp orders...'}

# Raw data -- any approved dataset, PII always stripped
df = get_raw("ad_performance", "2026-01-01", "2026-03-15")

# Enriched -- all Beast Modes computed, PII stripped
df = get_enriched("2026-01-01", "2026-03-15")

# Domo Ad Performance card replica (30 columns, Domo display names)
from scripts.export_ad_performance import get_ad_performance_card
df = get_ad_performance_card("2026-01-01", "2026-03-15", day="2026-03-15")
```

---

## Governance: datasets.yaml Allowlist

`datasets.yaml` is the gatekeeper for all API access. Only datasets registered there are queryable through `api.py`. Patrick controls this registry.

**Adding a new dataset:**

1. Get the Domo dataset ID
2. Add an entry to `datasets.yaml` with friendly name, dataset ID, description
3. Add metric definitions to `catalog/data_dictionary.yaml`
4. Done -- `get_raw("new_name", ...)` works immediately

Currently approved datasets:

| Name | Description |
|------|-------------|
| `ad_performance` | Facebook ad performance + CheckoutChamp orders (252 columns, joined by ad name) |

---

## PII Handling

PII stripping is unconditional. There is no `include_pii` parameter, no escape hatch, no way to get PII out of the API.

- **PII column list** lives in `catalog/pii_manifest.yaml` (single source of truth)
- **`strip_pii()`** is called on every API return path
- **`emailAddress`** is consumed during aggregation to produce distinct customer counts -- only the counts survive into the enriched DataFrame
- **`email_address_hash`** (SHA-256, first 16 chars) is added to raw data before PII is stripped, so consumers can do cohort tracking without seeing emails
- **Audited** against the full 252-column dataset on 2026-03-17

Columns stripped: `emailAddress`, `customerId`, `firstName`, `lastName`, `ipAddress`, `phoneNumber`, `phone`, all shipping/billing address fields, payment fields (`cardLast4`, `cardExpiryDate`, `achAccountNumber`, `achRoutingNumber`), alternate email columns, Klaviyo composite fields.

---

## Architecture Decisions (Locked)

### Beast Modes Live in the Adapter, Not the Models

**Decision (2026-03-16):** Beast Mode calculations (Net ROAS, NC Net ROAS, CPA, etc.) are Domo-specific workarounds. Domo can't do GROUP BY, so we compute everything in pandas inside `adapters/domo.py`. When Snowflake arrives with pre-computed dbt models, the Snowflake adapter returns the same columns natively. The model layer receives identical schemas either way.

**Why:** The Beast Mode code is throwaway. In the adapter, it dies naturally when `adapters/domo.py` is decommissioned.

### Security

- All date inputs validated via `_validate_date()` (YYYY-MM-DD regex) before SQL interpolation
- `DOMO_CLIENT_PATH` is a required env var -- no hardcoded machine paths in source code
- Credentials in `.env`, never committed

---

## Adapter Interface

The abstract interface in `adapters/base.py` defines two methods every adapter must implement:

```python
class DataAdapter(ABC):
    def fetch_ad_performance(self, date_from: str, date_to: str) -> pd.DataFrame
        # Returns one row per ad with all computed metrics + 15-position parsed fields

    def fetch_raw(self, date_from: str, date_to: str, limit: int = 100000) -> pd.DataFrame
        # Returns raw rows with all columns, email_address_hash added
```

### Switching to Snowflake (Q3/Q4 2026)

1. Create `adapters/snowflake.py` implementing `DataAdapter`
2. Change `config.yaml`: `adapter: snowflake`
3. Done. API unchanged.

The Snowflake adapter returns pre-computed columns from dbt models. No Beast Mode calculation needed -- the adapter just passes through what dbt already computed.

---

## Beast Mode Formulas

All formulas implemented in `adapters/domo.py::_compute_beast_modes()`. For full definitions, gotchas, and "do not derive" rules, see `catalog/DATA_DICTIONARY.md`.

| Metric | Formula | Note |
|--------|---------|------|
| **Net Revenue** | `totalAmount - COGS + Refunds(neg) - Agency Fees - CC Fees - Spend` | Refunds already negative |
| **Net ROAS** | `(Net Revenue / Spend) + 1` | 1.0 = 100% = breakeven |
| **Gross ROAS** | `totalAmount / Spend` | No cost deductions |
| **Gross Profit** | `totalAmount - COGS - Refunds` | Known sign bug -- see data dictionary |
| **NC Net ROAS** | Same as Net ROAS, revenue filtered to new customers, spend is total | Always <= Net ROAS |
| **CPA** | `Spend / total_customers` | Distinct email count |
| **NC CPA** | `Spend / new_customers` | Total spend / new customer count |
| **Net AOV** | `CPA * Net ROAS` | |
| **AOV** | `Gross Revenue / Orders` | Gross-based, distinct from Net AOV |
| **NC AOV** | `NC Gross Revenue / New Customers` | |
| **RC AOV** | `(Gross Revenue - NC Gross Revenue) / (Total Customers - New Customers)` | |
| **NLPT** | `Net Revenue / SC Trials Started` | |
| **Fixed Refund NLPT** | `Fixed Refund Net Revenue / SC Trials Started` | |
| **Cost / SC Trials** | `Spend / SC Trials Started` | |
| **NC %** | `new_customers / total_customers` | |
| **CVR %** | `total_customers / clicks` | |
| **NC CVR %** | `new_customers / clicks` | |
| **RC CVR %** | `returning_customers / clicks` | |
| **CPC** | `Spend / Clicks` | |
| **CTR** | `Clicks / Impressions` | |
| **CPM** | `(Spend / Impressions) * 1000` | |
| **Fixed Refund NR** | Same as Net Revenue but `totalAmount * 0.08` replaces actual refunds | 8% flat assumption |

### Known Issue: Gross Profit Sign Bug (2026-03-16)

Gross Profit formula subtracts `Refunded Revenue`, but Refunded Revenue is already negative. This inflates gross_profit. This matches Domo's Beast Mode output exactly -- intentionally replicated for parity. Do NOT fix without confirming Domo has been corrected first.

---

## Classification Thresholds (Reference — Not Applied by the Service)

From Tess PRD v1.4. The service provides the metrics — consumers apply classification.

| Class | Condition |
|-------|-----------|
| **Winner** | Net ROAS >= 1.0 (100%) AND spend >= $2,500 |
| **Potential** | Net ROAS 0.80-0.99 (80-99%) |
| **Underperformer** | Net ROAS < 0.80 (< 80%) |
| **Testing** | Spend < $2,500 (regardless of ROAS) |

- Testing takes priority -- low-spend ads are always Testing even if ROAS is high
- NaN net_roas -> Testing

---

## Key Data Facts

- **Two row types in one dataset**: Ad-metric rows (`Spend > 0`) and order rows (`totalAmount > 0`). Never both on same row. Aggregate separately, join on `Ad` name.
- **Domo SQL**: No GROUP BY, no aggregate functions. All aggregation happens in pandas after fetch.
- **`dateCreated`** is the date column used for all filtering.
- **`Valid 15-Position Ad Name?`**: Always filter on `= 1` for creative-level analysis. All queries do this.
- **`[Funnel]`**: Use the pre-parsed position, NOT the campaign-level `Funnel` column. They can disagree.
- **`New Customers`**: String field. `'0'` = returning, anything else = new. Do not cast to int.
- **`Refunded Revenue`**: Comes in as negative from the Domo transform. Do not negate.
- **`# SC Trials Started`**: Column name has `<BR>` / newline in Domo -- cleaned on fetch.
- **Ad names**: Normalized to lowercase. Domo may store uppercase.
- **email_address_hash**: SHA-256 of full emailAddress (hexdigest truncated to 16 chars), lowercased and trimmed before hashing. Available in raw data only.

### 15-Position Ad Naming Convention

Ads following the convention have all position fields pre-parsed in the dataset: `[Funnel]`, `[ScriptID]`, `[VariationID]`, `[AdCategory]`, `[ExpansionType]`, `[AssetType]`, `[TalentCode]`, `[EditorInitials]`, `[CopywriterInitials]`. Human-readable lookups also available: `Talent Name`, `Editor Name`, `Copywriter Name`, `Offer Name`, `Expansion Type`, `Asset Type`.

Not all ads follow the convention. The `Valid 15-Position Ad Name?` column is the filter. Facebook is the primary platform with structured naming.

### Platform Coverage

The dataset covers 12 platforms. Facebook is ~40% of rows and the only platform with 15-position naming:

| Platform | Approximate Rows (500K sample) |
|----------|-------------------------------|
| facebook | 201K |
| pmax | 165K |
| youtube | 44K |
| search | 26K |
| oddbytes | 24K |
| demand_gen | 19K |
| display | 7K |
| shopping | 5K |
| tiktok | 5K |
| microsoft ads | 4K |
| snapchat ads | 449 |
| x | 127 |

---

## Primary Dataset

**PGZ | CoC | May 2022 Forward Orders-OrderItems-Ads**
- **ID**: `a359ffd7-8175-40f3-b339-0a476cf624aa`
- **Rows**: ~3M (updated daily)
- **Columns**: 252
- **Owner**: Bill Ogier

Joins CheckoutChamp order data + ad attribution + 15-position parsed fields + ad performance + customer lifecycle + geographic data.

### Domo API Performance

| Rows | Time |
|------|------|
| 10K | ~4s |
| 50K | ~15s |
| 100K | ~28s |
| 500K | ~107s |

No hard cap found at 500K rows. Full Facebook pull (~201K rows) takes ~45s.

### LTV Columns (Not Available)

The schema includes `14-Day Ad Rev`, `30-Day Ad Rev`, `60-Day Ad Rev`, `90-Day Ad Rev` but these are **not populated**. We measure immediate conversion value (`totalAmount`), not lifetime value. LTV analysis will require `PGZ | CC | Order Item LTV` (10.3M rows) or the future Snowflake stack.

### Other Relevant Domo Datasets (154 total in PGZ)

| Dataset | Rows | Potential Use |
|---------|------|---------------|
| PGZ \| FB Ads \| All Accounts, Hourly Ads | 16.1M | Granular hourly ad performance |
| PGZ \| Paid Media Union (2nd layer) | 20.5M | Cross-platform paid media |
| PGZ \| CC \| Order Item LTV | 10.3M | Order-item level LTV |
| PGZ \| COC & Mixpanel \| Funnel Analytics | 15M | Funnel step conversion data |

---

## Adding a New Beast Mode Metric

1. Add the calculation in `adapters/domo.py::_compute_beast_modes()`
2. Add the term to `catalog/data_dictionary.yaml`
3. Update `catalog/DATA_DICTIONARY.md`
4. When Snowflake arrives, the dbt model provides it natively -- no adapter change needed

---

## Relationship to Other Systems

### Creative OS Agents

PG Data Service does NOT replace Creative OS agents. It sits upstream as a shared data layer.

- **Tess** can consume enriched data from the data service instead of processing raw CSV
- **Neco** gets programmatic access to performance data (no more data-blind operation)
- **Orion** gets ad performance visibility (no direct access today)
- **Veda** gets performance feedback for expansion recommendations

### OpenMetadata (Parallel Build)

OpenMetadata is the catalog and governance layer. The data dictionary (`catalog/data_dictionary.yaml`) mirrors the OpenMetadata Glossary Term schema for direct import when OM Phase 5 deploys. After that, the YAML becomes a read-only export from OM's Glossary API.

### Snowflake Migration (Q3/Q4 2026)

| Component | Change Required |
|-----------|----------------|
| `adapters/snowflake.py` | Build (same DataAdapter interface) |
| `config.yaml` | Change `adapter: snowflake` |
| `adapters/domo.py` | Decommission |
| Everything else | No change |

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Numbers disagree with Tess SSS | High -- destroys trust | Known divergence sources documented. Different freshness (daily vs weekly), different revenue metrics (totalAmount vs Net Revenue), different ROAS formulas. Reconcile on top 20 ads by spend. |
| PII leaks into outputs | Very High -- compliance | strip_pii() unconditional on every path. No escape hatch. Audited against full 252-column schema. |
| Consumer teams build own queries | Medium -- contradictory numbers | API is easier than raw queries. datasets.yaml enforces the funnel. |
| Snowflake migration mid-build | Low -- adapter pattern handles it | Keep Domo adapter thin. Models/formatters carry over unchanged. |
