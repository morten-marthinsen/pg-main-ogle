# PG Data Service — Architecture & Reference

> **Status**: Card-based API deployed. Validated against Domo (2026-03-18)
> **Owner**: Data Team (Patrick Hayes)
> **Runtime**: Python 3.x (pandas, requests, pyyaml, python-dotenv)
> **Primary interface**: `api.py` (Python API)
> **Metric reference**: `catalog/DATA_DICTIONARY.md`

---

## What This Is

Shared data access layer for all Creative OS agents and future systems. Queries Domo (now), will query Snowflake (Q3/Q4 2026). Adapter pattern means zero business logic rewrite when switching sources.

**Three entry points:**

| Function | What It Returns | Use Case |
|----------|----------------|----------|
| `get_card("ad_performance_daily", ...)` | Daily rows (one per ad per day), 30 columns with Domo display names | Christopher's pipeline, SSS sheet, anyone comparing against the Domo card |
| `get_card("ad_performance_summary", ...)` | One row per ad, all Beast Modes computed, snake_case columns | Programmatic consumers (Tess, Neco, Veda, Orion) |
| `get_raw()` | Raw rows with all 252 columns, email_address_hash added | Ad-hoc analysis, debugging |

All entry points strip PII unconditionally. No escape hatch.

---

## Setup

1. `cp .env.example .env`
2. Add your Domo credentials to `.env`:
   ```
   DOMO_CLIENT_ID=your_client_id_here
   DOMO_CLIENT_SECRET=your_client_secret_here
   ```
   Contact Patrick Hayes for credentials.
3. `pip install -r requirements.txt`

---

## How the System Works

```
┌─────────────────────────────────────────────────────────────────────┐
│  Consumer code                                                      │
│                                                                     │
│  from api import get_card, get_raw, list_cards, list_datasets       │
│  from scripts.export_ad_performance import get_ad_performance_card  │
└──────────┬──────────────────┬──────────────────┬────────────────────┘
           │                  │                  │
           ▼                  ▼                  ▼
┌───────────────┐  ┌──────────────────────┐  ┌──────────────────────────┐
│  get_raw()    │  │  get_card()          │  │ get_ad_performance_card() │
│               │  │                      │  │                          │
│  1. VALIDATE  │  │  1. LOAD cards.yaml  │  │  Wrapper — calls         │
│  2. FETCH     │  │  2. LOOKUP dataset   │  │  get_card(               │
│  3. HASH      │  │  3. LOOKUP enrichment│  │    "ad_performance_daily"│
│  4. STRIP PII │  │  4. FETCH raw rows   │  │    date_from, date_to)   │
│  5. RETURN    │  │  5. ENRICH           │  │                          │
└───────────────┘  │  6. FORMAT (daily)   │  └──────────────────────────┘
                   │  7. STRIP PII        │
                   │  8. RETURN           │
                   └──────────────────────┘
```

### Three Layers

| Layer | What It Does | Files |
|-------|-------------|-------|
| **Datasets** | Raw data sources. Fetched by the adapter. | `datasets.yaml`, `adapters/` |
| **Cards** | Enriched views of a dataset. Defines how to aggregate and compute. | `cards.yaml`, `enrichments/` |
| **Data Dictionary** | Governance and documentation. Formula definitions, gotchas, OpenMetadata integration. | `catalog/data_dictionary.yaml` |

### get_card() — deep dive

1. **Load `cards.yaml`** — look up card_name, get dataset, enrichment, output mode
2. **Look up dataset** — `datasets.yaml` → dataset_id
3. **Look up enrichment** — `enrichments/` registry → enrich function
4. **Fetch raw rows** — `adapter.fetch_all()` (single Domo API call)
5. **Enrich** — split spend/order rows, aggregate, compute Beast Modes
6. **Format** (daily only) — rename to Domo display names via `format_card_columns()`
7. **Strip PII** — unconditional
8. **Return** — DataFrame ready to use

**Daily vs Summary output:**
- **`daily`**: N adapter calls (one per day). Each day enriched independently. Tagged with `Day` column. Concat. Format to Domo display names.
- **`summary`**: Single adapter call for full date range. Enrich once. Snake_case columns.

### Data flow example

```
Consumer calls:  get_card("ad_performance_daily", "2026-03-08", "2026-03-14")

  1. LOOKUP     — cards.yaml: dataset=ad_performance, enrichment=ad_performance, output=daily
  2. LOOKUP     — datasets.yaml: dataset_id=a359ffd7-...
  3. ADAPTER    — DomoAdapter.fetch_all("2026-03-08", "2026-03-08") → raw DataFrame (day 1)
  4. ENRICH     — enrichments.ad_performance.enrich(raw_df) → enriched DataFrame (day 1)
  5. TAG        — Add Day="2026-03-08" column
  6. REPEAT     — Steps 3-5 for each day in range
  7. CONCAT     — Stack all days
  8. FORMAT     — format_card_columns() → Domo display names
  9. STRIP PII  — Drop PII columns
  10. RETURN    — DataFrame ready to use
```

**Validated 2026-03-18**: 928 ads, 7 days (3/8–3/14), all base columns match Domo CSV at 0.00% difference. Validation CSV committed at `notebooks/domo_ad_performance.csv`.

---

## Python API Usage

### get_card — primary interface

```python
from api import get_card, list_cards

# See available cards
list_cards()
# {'ad_performance_daily': 'Daily rows, 30 columns, Domo display names...',
#  'ad_performance_summary': 'One row per ad, all Beast Modes computed...'}

# Daily rows — Domo display names, one row per ad per day
df = get_card("ad_performance_daily", "2026-03-08", "2026-03-14")

# Summary — snake_case columns, one row per ad for entire range
df = get_card("ad_performance_summary", "2026-03-08", "2026-03-14")
```

### get_ad_performance_card — backwards-compatible wrapper

```python
from scripts.export_ad_performance import get_ad_performance_card

# Same output as get_card("ad_performance_daily", ...)
df = get_ad_performance_card("2026-03-08", "2026-03-14")

# Columns match Domo card exactly:
#   Ad, Day, Status, Spend, Net Revenue, Net ROAS, NC Net ROAS,
#   Cost /<BR># SC Trials, CPA, NC CPA, Net Loss<BR>Per Trial,
#   Fixed Refund<BR>NLPT, NC %, Gross Revenue, Gross<BR>ROAS,
#   CVR, NC CVR%, RC CVR%, AOV, NC AOV, RC AOV, CPC, CTR, CPM,
#   Orders, # SC Trials<BR>Started, NC Orders, Clicks, Impressions,
#   Fixed Refund<BR>Net Revenue
```

### get_raw — for ad-hoc analysis

```python
from api import get_raw, list_datasets

# See what's available
list_datasets()
# {'ad_performance': 'All-platform ad performance + CheckoutChamp orders...'}

# All 252 columns, email_address_hash added, PII stripped
df = get_raw("ad_performance", "2026-03-08", "2026-03-14")
```

### Requirements for all consumers

- `.env` with `DOMO_CLIENT_ID` and `DOMO_CLIENT_SECRET`
- PII is always stripped — no parameter to override this
- See `catalog/DATA_DICTIONARY.md` before calculating anything — if a metric exists, use it

---

## File Map

```
pg-data-service/
├── api.py                        # Public API: get_card(), get_raw(), list_cards(), list_datasets()
├── cards.yaml                    # Card registry (card name → dataset, enrichment, output mode)
├── datasets.yaml                 # Approved dataset allowlist (friendly name → dataset ID)
├── README.md                     # This file — full architecture reference
├── adapters/
│   ├── base.py                   # Abstract adapter interface (fetch_all + fetch_raw)
│   ├── domo.py                   # Domo implementation: raw row fetch only (no business logic)
│   └── domo_client.py            # Domo API client (bundled, no external path needed)
├── enrichments/
│   ├── __init__.py               # Enrichment function registry
│   └── ad_performance.py         # All aggregation + Beast Mode + column formatting
├── utils/
│   └── pii.py                    # PII stripping utility (strip_pii, load_pii_columns)
├── scripts/
│   ├── export_ad_performance.py  # Backwards-compat wrapper → get_card("ad_performance_daily")
│   └── validate_vs_domo.py       # CLI: validate enriched output vs Domo CSV export
├── notebooks/
│   ├── validate_enriched.ipynb   # Interactive validation notebook
│   ├── domo_ad_performance.csv   # Domo CSV export (3/8–3/14) for validation
│   └── demo_api.ipynb            # API usage demo
└── catalog/
    ├── pii_manifest.yaml         # PII column list (single source of truth for stripping)
    ├── data_dictionary.yaml      # Metric definitions, formulas, business rules (OM Glossary format)
    └── DATA_DICTIONARY.md        # Human-readable data dictionary — consuming agents MUST read this
```

---

## Adding a New Card

Example: adding a "Funnel Summary" card that groups by funnel instead of ad.

1. Add to `cards.yaml`:
   ```yaml
   funnel_summary:
     dataset: ad_performance
     enrichment: funnel_performance
     output: summary
     description: "One row per funnel, aggregated metrics"
   ```

2. Create `enrichments/funnel_performance.py` with `enrich()` function
3. Register in `enrichments/__init__.py`
4. Done — `get_card("funnel_summary", ...)` works

No changes to `api.py`, adapters, or existing cards.

## Adding a New Dataset

Example: adding `facebook_raw` dataset with its own Beast Modes.

1. Add to `datasets.yaml` (already have placeholder)
2. Add beast_modes to `data_dictionary.yaml` (already have placeholder)
3. Create `enrichments/facebook.py` with `enrich()` function
4. Add cards to `cards.yaml`
5. Done — `get_card("facebook_daily", ...)` works

---

## Governance: datasets.yaml Allowlist

`datasets.yaml` is the gatekeeper for all API access. Only datasets registered there are queryable. Data team to update — we're actively building out this registry.

**Adding a new dataset:**

1. Get the Domo dataset ID
2. Add an entry to `datasets.yaml` with friendly name, dataset ID, description
3. Add metric definitions to `catalog/data_dictionary.yaml`
4. Done -- `get_raw("new_name", ...)` works immediately

Currently approved datasets:

| Name | Description |
|------|-------------|
| `ad_performance` | All-platform ad performance + CheckoutChamp orders (252 columns, joined by ad name) |

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

### Card-Based Architecture (2026-03-18)

**Decision:** Replace hardcoded `get_enriched()` with `get_card()` driven by YAML config + per-dataset enrichment modules. Adapter is a dumb pipe. All business logic lives in `enrichments/`.

**Why:** `get_enriched()` was hardcoded to ad_performance. Beast Modes were baked into the adapter. Adding a new dataset with computed metrics meant editing adapter code. Now: add YAML entry + enrichment module.

### Single Fetch, Split in Pandas (2026-03-18)

The enriched pipeline makes **one** Domo API call per date range, then splits into spend rows and order rows in pandas. Previous design made 3 separate API calls — replaced for efficiency (~3x faster).

### Business Logic in Enrichments, Not Adapters (2026-03-18)

**Decision:** Beast Mode calculations (Net ROAS, NC Net ROAS, CPA, etc.) live in `enrichments/ad_performance.py`, not the adapter. The adapter only fetches raw rows.

**Why:** The adapter pattern requires that adapters are interchangeable. Business logic that lives in the adapter would need to be duplicated in every adapter (Domo, Snowflake, etc.). By putting it in enrichments/, it survives any backend switch. The Snowflake adapter may eventually return pre-computed columns from dbt models, at which point the enrichment module can be simplified or bypassed.

### No Filters — Service Returns Everything

The service applies **zero filters** to Domo data. No platform filter, no funnel code filter, no Valid 15-Position filter. Consumers filter as needed. This means:
- All 12 platforms included (Facebook, PMax, YouTube, Search, etc.)
- Zero-spend and zero-activity ads included
- Ads without 15-position naming included

### Security

- All date inputs validated via `_validate_date()` (YYYY-MM-DD regex) before SQL interpolation
- `DomoClient` is bundled in `adapters/domo_client.py` -- no external path dependencies
- Credentials in `.env`, never committed

---

## Adapter Interface

The abstract interface in `adapters/base.py` defines two methods every adapter must implement:

```python
class DataAdapter(ABC):
    def fetch_all(self, date_from: str, date_to: str) -> pd.DataFrame
        # Returns all rows in date range. No filtering, no aggregation.

    def fetch_raw(self, date_from: str, date_to: str, limit: int = 100000) -> pd.DataFrame
        # Returns raw rows with all columns, email_address_hash added
```

### Switching to Snowflake (Q3/Q4 2026)

1. Create `adapters/snowflake.py` implementing `DataAdapter`
2. Change `ADAPTER` in `api.py` to `"snowflake"`
3. Done. API unchanged. Enrichments unchanged.

---

## Beast Mode Formulas

All formulas implemented in `enrichments/ad_performance.py::_compute_beast_modes()`. For full definitions, gotchas, and "do not derive" rules, see `catalog/DATA_DICTIONARY.md`.

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

## Validation

The enriched pipeline has been validated against fresh Domo CSV exports:

- **2026-03-18**: 928 ads, 7 days (3/8–3/14). All base columns (Spend, Gross Revenue, Clicks, Impressions, Orders, SC Trials, NC Orders, Net Revenue, Fixed Refund NR) match at 0.00% difference. Tiny Impressions rounding (34 off out of 7.9M = 0.0004%).
- Validation CSV: `notebooks/domo_ad_performance.csv`
- Validation notebook: `notebooks/validate_enriched.ipynb`
- CLI validator: `scripts/validate_vs_domo.py`

**To re-validate:** Export a fresh CSV from the Domo Ad Performance card, save to `notebooks/domo_ad_performance.csv`, update dates in the notebook, run all cells.

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
- **Single API call**: Enriched pipeline fetches all rows once, splits in pandas. No redundant queries.
- **Domo SQL**: No GROUP BY, no aggregate functions. All aggregation happens in pandas after fetch.
- **`dateCreated`** is the date column used for all filtering.
- **`Valid 15-Position Ad Name?`**: 1 = ad follows the 15-position naming convention. The service returns all ads — consumers filter on this as needed for creative-level analysis.
- **`[Funnel]`**: Use the pre-parsed position, NOT the campaign-level `Funnel` column. They can disagree.
- **`New Customers`**: String field. `'0'` = returning, anything else = new. Do not cast to int.
- **`Refunded Revenue`**: Comes in as negative from the Domo transform. Do not negate.
- **SC Trials**: Computed by counting distinct non-empty `SC Trial Start PurchaseIDs` per ad. The raw dataset has no `# SC Trials Started` column — that's a Domo Beast Mode we replicate.
- **Ad names**: Normalized to lowercase. Domo may store uppercase.
- **email_address_hash**: SHA-256 of full emailAddress (hexdigest truncated to 16 chars), lowercased and trimmed before hashing. Available in raw data only.

### 15-Position Ad Naming Convention

Ads following the convention have all position fields pre-parsed in the dataset: `[Funnel]`, `[ScriptID]`, `[VariationID]`, `[AdCategory]`, `[ExpansionType]`, `[AssetType]`, `[TalentCode]`, `[EditorInitials]`, `[CopywriterInitials]`. Human-readable lookups also available: `Talent Name`, `Editor Name`, `Copywriter Name`, `Offer Name`, `Expansion Type`, `Asset Type`.

Not all ads follow the convention. The `Valid 15-Position Ad Name?` column indicates which ads do. Facebook ads are most likely to follow it, but the service returns all ads regardless.

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

No hard cap found at 500K rows. Enriched pipeline makes 1 API call per day in the date range (daily output) or 1 call total (summary output).

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

1. Add the calculation in `enrichments/ad_performance.py::_compute_beast_modes()`
2. Add the term to `catalog/data_dictionary.yaml`
3. Update `catalog/DATA_DICTIONARY.md`
4. When Snowflake arrives, the dbt model provides it natively -- no enrichment change needed

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
| `api.py:ADAPTER` | Change to `"snowflake"` |
| `adapters/domo.py` | Decommission |
| `enrichments/` | May simplify if dbt pre-computes metrics |
| Everything else | No change |

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Numbers disagree with Tess SSS | High -- destroys trust | Known divergence sources documented. Different freshness (daily vs weekly), different revenue metrics (totalAmount vs Net Revenue), different ROAS formulas. Reconcile on top 20 ads by spend. |
| PII leaks into outputs | Very High -- compliance | strip_pii() unconditional on every path. No escape hatch. Audited against full 252-column schema. |
| Consumer teams build own queries | Medium -- contradictory numbers | API is easier than raw queries. datasets.yaml enforces the funnel. |
| Snowflake migration mid-build | Low -- adapter pattern handles it | Keep adapters thin. Enrichments carry over unchanged. |
