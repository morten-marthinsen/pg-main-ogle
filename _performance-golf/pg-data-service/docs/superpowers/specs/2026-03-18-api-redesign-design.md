# PG Data Service API Redesign — Card-Based Architecture

> **Date**: 2026-03-18
> **Status**: Approved design, pending implementation
> **Owner**: Patrick Hayes

## Problem

`get_enriched()` is hardcoded to the `ad_performance` dataset. Beast Mode calculations are baked into `adapters/domo.py` as Python math, even though `data_dictionary.yaml` already defines all the formulas per dataset. Adding a new dataset with computed metrics means editing adapter code — it doesn't scale.

The API needs to support multiple datasets, each with multiple enriched views (cards), driven by YAML configuration and per-dataset enrichment modules.

## Design

### Concepts

Three layers, each with one job:

| Layer | What It Does | Files |
|-------|-------------|-------|
| **Datasets** | Raw data sources. Fetched by the adapter. | `datasets.yaml`, `adapters/` |
| **Cards** | Enriched views of a dataset. Defines how to aggregate and compute. | `cards.yaml`, `enrichments/` |
| **Data Dictionary** | Governance and documentation. Formula definitions, gotchas, OpenMetadata integration. | `catalog/data_dictionary.yaml` |

A **dataset** is a raw data source in Domo (or Snowflake later). `get_raw()` returns its rows with PII stripped.

A **card** is an enriched view of a dataset — a specific aggregation + computation. Multiple cards can reference the same dataset. `get_card()` returns the card's output with PII stripped.

The **data dictionary** documents what each metric means, how it's calculated, and what to watch out for. It's governance — not runtime config.

### Public API (`api.py`)

```python
get_card(card_name, date_from, date_to) -> pd.DataFrame
get_raw(dataset_name, date_from, date_to, limit=100000) -> pd.DataFrame
list_cards() -> dict[str, str]
list_datasets() -> dict[str, str]
```

`get_card()` flow:

1. Load `cards.yaml`, look up `card_name`
2. Get the card's `dataset` field → look up `dataset_id` in `datasets.yaml`
3. Get the card's `enrichment` field → load the enrichment function from the registry
4. Get the card's `output` field → determines daily vs summary
5. Fetch raw rows via adapter (`fetch_all`)
6. If `output: daily` — call enrichment once per day, tag with `Day`, concat
7. If `output: summary` — call enrichment once for the full date range
8. Strip PII
9. Return DataFrame

Card loading follows the same `_load_cards()` / `_cards_cache` pattern as the existing `_load_datasets()` / `_datasets_cache` in `api.py`. `cards.yaml` lives in the project root alongside `datasets.yaml`.

`datasets.yaml` structure is unchanged. Access pattern remains `datasets[name]["dataset_id"]` as in the current `_load_datasets()`.

Backwards compatibility: `get_enriched()` becomes a thin alias that calls `get_card("ad_performance_summary", ...)` with a deprecation warning. Removed once consumers update.

### Card Registry (`cards.yaml`)

```yaml
cards:
  ad_performance_daily:
    dataset: ad_performance
    enrichment: ad_performance
    output: daily
    description: "Daily rows, 30 columns, Domo display names. Replaces Domo Ad Performance card."

  ad_performance_summary:
    dataset: ad_performance
    enrichment: ad_performance
    output: summary
    description: "One row per ad, all Beast Modes computed. For programmatic consumers."
```

- `dataset`: which dataset in `datasets.yaml` to fetch from
- `enrichment`: which enrichment module to use (maps to a function in `enrichments/`)
- `output`: `daily` (one row per ad per day) or `summary` (one row per ad, aggregated)
- `description`: human-readable, shows up in `list_cards()`

Adding a new card = YAML entry. If it needs new computation, also add an enrichment module. If it reuses existing computation with a different aggregation window, YAML-only.

### Enrichment Modules (`enrichments/`)

```
enrichments/
  __init__.py          # registry — maps enrichment names to functions
  ad_performance.py    # aggregation + Beast Modes for ad_performance dataset
```

Each enrichment module exports:

```python
def enrich(raw_df: pd.DataFrame) -> pd.DataFrame:
    """Takes raw rows from the adapter, returns enriched one-row-per-ad DataFrame.

    Contract: ALWAYS returns snake_case column names. Display name formatting
    is a separate step via format_card_columns().

    Steps:
    1. Split into spend rows (Spend > 0) and order rows (totalAmount > 0)
    2. Extract ad list (all ads including zero-activity)
    3. Aggregate spend side (SUM spend, clicks, impressions per ad)
    4. Aggregate order side (SUM revenue/costs, COUNT DISTINCT customers/orders/trials per ad)
    5. Left-join onto full ad list
    6. Compute Beast Modes (22 metrics)
    7. Return enriched DataFrame (snake_case columns)
    """

def format_card_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Rename snake_case columns to Domo display names. Used by daily card output.

    COLUMN_MAP and COLUMN_ORDER constants (currently in scripts/export_ad_performance.py)
    move into this enrichment module alongside this function.
    """
```

This is the exact code currently in `adapters/domo.py` — `_fetch_all_rows`, `_extract_ad_list`, `_aggregate_spend`, `_aggregate_orders`, `_compute_beast_modes` — moved into the enrichment module.

The enrichment module owns all business logic: row splitting, aggregation, Beast Mode calculation, column formatting. The adapter knows nothing about it.

Registry in `enrichments/__init__.py`:

```python
from .ad_performance import enrich as ad_performance_enrich

REGISTRY = {
    "ad_performance": ad_performance_enrich,
}
```

`get_card()` looks up the enrichment name from `cards.yaml`, grabs the function from `REGISTRY`, calls it.

### Adapter Simplification (`adapters/`)

The adapter becomes a dumb pipe. Two methods:

```python
class DataAdapter(ABC):
    def fetch_all(self, date_from: str, date_to: str) -> pd.DataFrame:
        """Fetch all rows in date range. Single API call. No filtering, no aggregation.
        Must validate date inputs via _validate_date() before query execution."""

    def fetch_raw(self, date_from: str, date_to: str, limit: int = 100000) -> pd.DataFrame:
        """Fetch raw rows with all columns. Adds email_address_hash."""
```

Both `fetch_all` and `fetch_raw` survive in the ABC. `fetch_all` is used by `get_card()`, `fetch_raw` is used by `get_raw()`.

`fetch_all` must include `_validate_date()` calls — the current `_fetch_all_rows` already has them, carry them forward when renaming to public.

Removed from adapter:
- `fetch_ad_performance()` — replaced by enrichment module
- `_fetch_all_rows()` → renamed to `fetch_all()` (now public, keeps date validation)
- `_extract_ad_list()` → moves to enrichment
- `_aggregate_spend()` → moves to enrichment
- `_aggregate_orders()` → moves to enrichment
- `_compute_beast_modes()` → moves to enrichment

### Output Formatting

The `output` field in `cards.yaml` controls how `get_card()` invokes the enrichment:

- **`summary`**: call `enrich(raw_df)` once for the full date range. Returns snake_case columns. One row per ad.
- **`daily`**: for each day in the range, call `adapter.fetch_all(day, day)` (single-day fetch), then `enrich(day_df)`, tag with `Day` column. After all days, concat. Then call `format_card_columns()` to rename to Domo display names. One row per ad per day. **Important**: daily output makes N adapter calls (one per day), not one call sliced in memory. This matches the current `export_ad_performance.py` behavior and ensures per-day Beast Mode calculations are independent.

Column formatting (snake_case → Domo display names) is defined in the enrichment module, not in `api.py`. Different enrichment modules can have different display name mappings.

### Data Flow

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

For `summary` output, steps 3-4 happen once for the full range, no day iteration, no format step.

## File Changes

| File | Change |
|------|--------|
| `api.py` | Add `get_card()`, `list_cards()`. Deprecation alias for `get_enriched()`. Update docstring. |
| `cards.yaml` | **New** — card registry with `ad_performance_daily` and `ad_performance_summary` |
| `enrichments/__init__.py` | **New** — enrichment function registry |
| `enrichments/ad_performance.py` | **New** — all aggregation + Beast Mode code moved from `adapters/domo.py` |
| `adapters/base.py` | Replace `fetch_ad_performance` with `fetch_all`. Keep `fetch_raw`. Both methods in the ABC. |
| `adapters/domo.py` | Remove all aggregation/Beast Mode code. Rename `_fetch_all_rows` → `fetch_all` (public). Keep `fetch_raw` unchanged. |
| `scripts/export_ad_performance.py` | Update to use `get_card("ad_performance_daily", ...)` |
| `notebooks/validate_enriched.ipynb` | Update imports |
| `PG-DATA-SERVICE.md` | Update architecture docs |
| `README.md` | Update usage examples |
| `docs/OVERVIEW.md` | Update system overview |
| `datasets.yaml` | Unchanged |
| `catalog/data_dictionary.yaml` | Unchanged |

## Adding a New Card (Future)

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

## Adding a New Dataset (Future)

Example: adding `facebook_raw` dataset with its own Beast Modes.

1. Add to `datasets.yaml` (already have placeholder)
2. Add beast_modes to `data_dictionary.yaml` (already have placeholder)
3. Create `enrichments/facebook.py` with `enrich()` function
4. Add cards to `cards.yaml`
5. Done — `get_card("facebook_daily", ...)` works

## What This Does NOT Change

- `get_raw()` — unchanged, still general-purpose for any dataset
- `datasets.yaml` — unchanged, still the raw data allowlist
- `data_dictionary.yaml` — unchanged, still governance/OpenMetadata docs
- PII stripping — still unconditional on every return path
- Adapter pattern — still Domo now, Snowflake later
- Validation approach — still compare against Domo CSV exports

## Migration

Christopher's pipeline currently imports `get_ad_performance_card` from `scripts/export_ad_performance.py`. That script's **internal implementation** changes (calls `get_card("ad_performance_daily", ...)` instead of `get_enriched()` + day loop + column rename), but the **public function signature** (`get_ad_performance_card(date_from, date_to) -> DataFrame`) stays identical. Zero breaking changes for Christopher's import.

`get_enriched()` stays as a deprecation alias. Its internal implementation changes to call `get_card("ad_performance_summary", date_from, date_to)`. Consumers get a `DeprecationWarning` pointing them to `get_card("ad_performance_summary", ...)`.
