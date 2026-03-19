# Card-Based API Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hardcoded `get_enriched()` with a card-based architecture where `get_card(card_name, ...)` loads config from `cards.yaml`, delegates to per-dataset enrichment modules, and supports daily vs summary output modes.

**Architecture:** Three layers — datasets (raw sources via adapter), cards (enriched views defined in `cards.yaml` + `enrichments/`), data dictionary (governance). Adapter becomes a dumb pipe (`fetch_all` + `fetch_raw`). All business logic (aggregation, Beast Modes) moves to enrichment modules. `get_enriched()` becomes a deprecation alias.

**Tech Stack:** Python 3.11+, pandas, PyYAML, existing DomoClient

**Spec:** `docs/superpowers/specs/2026-03-18-api-redesign-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `cards.yaml` | **Create** | Card registry — maps card names to dataset, enrichment, output mode |
| `enrichments/__init__.py` | **Create** | Enrichment function registry |
| `enrichments/ad_performance.py` | **Create** | All aggregation + Beast Mode code (moved from `adapters/domo.py`) + column formatting |
| `adapters/base.py` | **Modify** | Replace `fetch_ad_performance` with `fetch_all` in ABC |
| `adapters/domo.py` | **Modify** | Remove all business logic, rename `_fetch_all_rows` → `fetch_all` (public) |
| `api.py` | **Modify** | Add `get_card()`, `list_cards()`, `_load_cards()`. Deprecation alias for `get_enriched()` |
| `scripts/export_ad_performance.py` | **Modify** | Use `get_card("ad_performance_daily", ...)` internally. Same public signature. |

---

## Chunk 1: Enrichment Layer + Card Registry

### Task 1: Create `cards.yaml`

**Files:**
- Create: `cards.yaml`

- [ ] **Step 1: Create `cards.yaml` with two ad_performance cards**

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

- [ ] **Step 2: Commit**

```bash
git add cards.yaml
git commit -m "feat: add cards.yaml card registry with ad_performance_daily and ad_performance_summary"
```

---

### Task 2: Create enrichment module — move business logic from `adapters/domo.py`

**Files:**
- Create: `enrichments/__init__.py`
- Create: `enrichments/ad_performance.py`
- Source (read-only reference): `adapters/domo.py:75-365`, `scripts/export_ad_performance.py:31-72`

This is the largest task. All aggregation and Beast Mode code moves from `adapters/domo.py` into `enrichments/ad_performance.py`. The `COLUMN_MAP` and `COLUMN_ORDER` constants move from `scripts/export_ad_performance.py` into this module as well.

- [ ] **Step 3: Create `enrichments/__init__.py` with registry**

```python
"""Enrichment function registry.

Maps enrichment names (from cards.yaml) to their enrich() functions.
get_card() looks up the name, grabs the function, calls it.
"""

from .ad_performance import enrich as ad_performance_enrich

REGISTRY = {
    "ad_performance": ad_performance_enrich,
}
```

- [ ] **Step 4: Create `enrichments/ad_performance.py`**

This file receives the following from `adapters/domo.py`:
- All `COL_*` constants (lines 38-72)
- `_safe_div()` helper (lines 87-89)
- `_extract_ad_list()` method → standalone function (lines 193-210)
- `_aggregate_spend()` method → standalone function (lines 214-226)
- `_aggregate_orders()` method → standalone function (lines 228-280)
- `_compute_beast_modes()` method → standalone function (lines 284-365)
- The `fetch_ad_performance()` orchestration logic (lines 102-151) → becomes `enrich()`

And from `scripts/export_ad_performance.py`:
- `COLUMN_MAP` constant (lines 31-62)
- `COLUMN_ORDER` constant (lines 65-72)
- `_rename_and_order()` → becomes `format_card_columns()`

The full file:

```python
"""Ad performance enrichment — aggregation + Beast Mode calculations.

Moved from adapters/domo.py. This module owns all business logic for the
ad_performance dataset: row splitting, aggregation, Beast Mode computation,
and column formatting.

The adapter fetches raw rows. This module transforms them.

Contract: enrich() ALWAYS returns snake_case column names.
format_card_columns() renames to Domo display names (used by daily output).
"""

import pandas as pd


# --- Column name constants (match Domo dataset column names) ---

COL_AD = "Ad"
COL_SPEND = "Spend"
COL_CLICKS = "Clicks"
COL_IMPRESSIONS = "Impressions"
COL_PLATFORM = "Ad Platform"
COL_TOTAL_AMOUNT = "totalAmount"
COL_ORDER_ID = "orderId"
COL_PHYSICAL_COGS = "Physical COGS Per Order"
COL_REFUNDED_REVENUE = "Refunded Revenue"
COL_AGENCY_FEES = "Agency Fees"
COL_CC_FEES = "CC Fees"
COL_EMAIL = "emailAddress"
COL_NEW_CUSTOMERS = "New Customers"
COL_SC_TRIAL_PURCHASE_IDS = "SC Trial Start PurchaseIDs"
COL_HAS_UPSELL = "hasUpsell"
COL_STATUS = "Status"

# Pre-parsed 15-position columns
COL_FUNNEL = "[Funnel]"
COL_SCRIPT_ID = "[ScriptID]"
COL_VARIATION_ID = "[VariationID]"
COL_AD_CATEGORY = "[AdCategory]"
COL_EXPANSION_TYPE = "[ExpansionType]"
COL_ASSET_TYPE = "[AssetType]"
COL_TALENT_CODE = "[TalentCode]"
COL_EDITOR = "[EditorInitials]"
COL_COPYWRITER = "[CopywriterInitials]"

# Human-readable lookups
COL_TALENT_NAME = "Talent Name"
COL_EDITOR_NAME = "Editor Name"
COL_COPYWRITER_NAME = "Copywriter Name"
COL_OFFER_NAME = "Offer Name"
COL_EXPANSION_TYPE_NAME = "Expansion Type"
COL_ASSET_TYPE_NAME = "Asset Type"


# --- Display name mapping (Domo Ad Performance card) ---

COLUMN_MAP = {
    "ad_name":                  "Ad",
    "status":                   "Status",
    "spend":                    "Spend",
    "net_revenue":              "Net Revenue",
    "net_roas":                 "Net ROAS",
    "nc_net_roas":              "NC Net ROAS",
    "cost_per_sc_trial":        "Cost /<BR># SC Trials",
    "cpa":                      "CPA",
    "nc_cpa":                   "NC CPA",
    "nlpt":                     "Net Loss<BR>Per Trial",
    "fixed_refund_nlpt":        "Fixed Refund<BR>NLPT",
    "nc_pct":                   "NC %",
    "gross_revenue":            "Gross Revenue",
    "gross_roas":               "Gross<BR>ROAS",
    "cvr_pct":                  "CVR",
    "nc_cvr_pct":               "NC CVR%",
    "rc_cvr_pct":               "RC CVR%",
    "aov":                      "AOV",
    "nc_aov":                   "NC AOV",
    "rc_aov":                   "RC AOV",
    "cpc":                      "CPC",
    "ctr":                      "CTR",
    "cpm":                      "CPM",
    "total_orders":             "Orders",
    "sc_trials":                "# SC Trials<BR>Started",
    "new_customers":            "NC Orders",
    "clicks":                   "Clicks",
    "impressions":              "Impressions",
    "fixed_refund_net_revenue": "Fixed Refund<BR>Net Revenue",
}

COLUMN_ORDER = [
    "Ad", "Day", "Status", "Spend", "Net Revenue", "Net ROAS", "NC Net ROAS",
    "Cost /<BR># SC Trials", "CPA", "NC CPA", "Net Loss<BR>Per Trial",
    "Fixed Refund<BR>NLPT", "NC %", "Gross Revenue", "Gross<BR>ROAS",
    "CVR", "NC CVR%", "RC CVR%", "AOV", "NC AOV", "RC AOV",
    "CPC", "CTR", "CPM", "Orders", "# SC Trials<BR>Started", "NC Orders",
    "Clicks", "Impressions", "Fixed Refund<BR>Net Revenue",
]


# --- Helpers ---

def _safe_div(numerator: pd.Series, denominator: pd.Series) -> pd.Series:
    """Divide, returning NaN where denominator is 0."""
    return numerator / denominator.replace(0, pd.NA)


def _extract_ad_list(df: pd.DataFrame) -> pd.DataFrame:
    """Extract distinct ad names + position fields from raw DataFrame."""
    position_renames = {
        COL_FUNNEL: "funnel", COL_SCRIPT_ID: "script_id",
        COL_VARIATION_ID: "variation_id", COL_AD_CATEGORY: "ad_category",
        COL_EXPANSION_TYPE: "expansion_type", COL_ASSET_TYPE: "asset_type",
        COL_TALENT_CODE: "talent_code", COL_EDITOR: "editor_initials",
        COL_COPYWRITER: "copywriter_initials", COL_PLATFORM: "platform",
        COL_TALENT_NAME: "talent_name", COL_EDITOR_NAME: "editor_name",
        COL_COPYWRITER_NAME: "copywriter_name", COL_OFFER_NAME: "offer_name",
        COL_EXPANSION_TYPE_NAME: "expansion_type_name",
        COL_ASSET_TYPE_NAME: "asset_type_name", COL_STATUS: "status",
    }
    keep_cols = [COL_AD] + [c for c in position_renames if c in df.columns]
    result = df[keep_cols].copy()
    result = result.drop_duplicates(subset=[COL_AD], keep="first")
    result = result.rename(columns={k: v for k, v in position_renames.items() if k in result.columns})
    return result


def _aggregate_spend(ad_df: pd.DataFrame) -> pd.DataFrame:
    """Group ad-metric rows by ad name. Sum spend/clicks/impressions."""
    ad_df = ad_df.copy()
    for col in [COL_SPEND, COL_CLICKS, COL_IMPRESSIONS]:
        ad_df[col] = pd.to_numeric(ad_df[col], errors="coerce").fillna(0)

    spend_agg = ad_df.groupby(COL_AD, as_index=False).agg(
        spend=(COL_SPEND, "sum"),
        clicks=(COL_CLICKS, "sum"),
        impressions=(COL_IMPRESSIONS, "sum"),
    )
    spend_agg = spend_agg.rename(columns={COL_AD: "ad_name"})
    return spend_agg


def _aggregate_orders(order_df: pd.DataFrame) -> pd.DataFrame:
    """Group order rows by ad name. Compute revenue, costs, customer counts."""
    order_df = order_df.copy()
    for col in [COL_TOTAL_AMOUNT, COL_PHYSICAL_COGS, COL_REFUNDED_REVENUE,
                 COL_AGENCY_FEES, COL_CC_FEES]:
        if col in order_df.columns:
            order_df[col] = pd.to_numeric(order_df[col], errors="coerce").fillna(0)

    all_agg = order_df.groupby(COL_AD, as_index=False).agg(
        gross_revenue=(COL_TOTAL_AMOUNT, "sum"),
        total_orders=(COL_ORDER_ID, "nunique"),
        total_cogs=(COL_PHYSICAL_COGS, "sum"),
        total_refunds=(COL_REFUNDED_REVENUE, "sum"),
        total_agency_fees=(COL_AGENCY_FEES, "sum"),
        total_cc_fees=(COL_CC_FEES, "sum"),
        total_customers=(COL_EMAIL, "nunique"),
    )

    if COL_SC_TRIAL_PURCHASE_IDS in order_df.columns:
        sc_col = order_df[COL_SC_TRIAL_PURCHASE_IDS].astype(str).str.strip()
        sc_df = order_df[sc_col.ne("") & sc_col.ne("nan")]
        sc_agg = sc_df.groupby(COL_AD, as_index=False)[COL_SC_TRIAL_PURCHASE_IDS].nunique()
        sc_agg = sc_agg.rename(columns={COL_SC_TRIAL_PURCHASE_IDS: "sc_trials"})
        all_agg = all_agg.merge(sc_agg, on=COL_AD, how="left")
    else:
        all_agg["sc_trials"] = 0

    nc_df = order_df[order_df[COL_NEW_CUSTOMERS].astype(str) != "0"]
    if not nc_df.empty:
        nc_agg = nc_df.groupby(COL_AD, as_index=False).agg(
            new_customers=(COL_EMAIL, "nunique"),
            nc_gross_revenue=(COL_TOTAL_AMOUNT, "sum"),
            nc_total_cogs=(COL_PHYSICAL_COGS, "sum"),
            nc_total_refunds=(COL_REFUNDED_REVENUE, "sum"),
            nc_total_agency_fees=(COL_AGENCY_FEES, "sum"),
            nc_total_cc_fees=(COL_CC_FEES, "sum"),
        )
        all_agg = all_agg.merge(nc_agg, on=COL_AD, how="left")
    else:
        all_agg["new_customers"] = 0
        all_agg["nc_gross_revenue"] = 0
        all_agg["nc_total_cogs"] = 0
        all_agg["nc_total_refunds"] = 0
        all_agg["nc_total_agency_fees"] = 0
        all_agg["nc_total_cc_fees"] = 0

    all_agg = all_agg.fillna(0)
    all_agg = all_agg.rename(columns={COL_AD: "ad_name"})
    return all_agg


def _compute_beast_modes(df: pd.DataFrame) -> pd.DataFrame:
    """Compute all Beast Mode metrics.

    Formulas sourced from Domo Beast Mode definitions (2026-03-16).
    """
    s = df["spend"]
    gr = df["gross_revenue"]
    cogs = df["total_cogs"]
    refunds = df["total_refunds"]
    agency = df["total_agency_fees"]
    cc = df["total_cc_fees"]
    customers = df["total_customers"]
    new_cust = df["new_customers"]
    clicks = df["clicks"]
    sc_trials = df["sc_trials"]

    nc_gr = df["nc_gross_revenue"]
    nc_cogs = df["nc_total_cogs"]
    nc_refunds = df["nc_total_refunds"]
    nc_agency = df["nc_total_agency_fees"]
    nc_cc = df["nc_total_cc_fees"]

    df["gross_roas"] = _safe_div(gr, s)
    df["gross_profit"] = gr - cogs - refunds
    df["net_revenue"] = gr - cogs + refunds - agency - cc - s
    df["net_roas"] = _safe_div(df["net_revenue"], s) + 1

    nc_net_rev = nc_gr - nc_cogs + nc_refunds - nc_agency - nc_cc - s
    df["nc_net_roas"] = _safe_div(nc_net_rev, s) + 1

    df["cpa"] = _safe_div(s, customers)
    df["nc_cpa"] = _safe_div(s, new_cust)
    df["net_aov"] = df["cpa"] * df["net_roas"]
    df["nlpt"] = _safe_div(df["net_revenue"], sc_trials)
    df["nc_pct"] = _safe_div(new_cust, customers)

    df["cvr_pct"] = _safe_div(customers, clicks)
    df["nc_cvr_pct"] = _safe_div(new_cust, clicks)
    rc_customers = (customers - new_cust).clip(lower=0)
    df["rc_cvr_pct"] = _safe_div(rc_customers, clicks)

    fixed_refund = gr * 0.08
    df["fixed_refund_net_revenue"] = gr - cogs - fixed_refund - agency - cc - s

    df["cpc"] = _safe_div(s, clicks)
    df["ctr"] = _safe_div(clicks, df["impressions"])
    df["cpm"] = _safe_div(s, df["impressions"]) * 1000

    orders = df["total_orders"]
    df["aov"] = _safe_div(gr, orders)
    df["nc_aov"] = _safe_div(nc_gr, new_cust)
    df["rc_aov"] = _safe_div(gr - nc_gr, rc_customers)

    df["cost_per_sc_trial"] = _safe_div(s, sc_trials)
    df["fixed_refund_nlpt"] = _safe_div(df["fixed_refund_net_revenue"], sc_trials)

    return df


# --- Public API ---

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
    if raw_df.empty:
        return pd.DataFrame()

    all_ads_df = _extract_ad_list(raw_df)

    spend_col = COL_SPEND if COL_SPEND in raw_df.columns else None
    order_col = COL_TOTAL_AMOUNT if COL_TOTAL_AMOUNT in raw_df.columns else None

    ad_df = raw_df[pd.to_numeric(raw_df[spend_col], errors="coerce").fillna(0) > 0].copy() if spend_col else pd.DataFrame()
    order_df = raw_df[pd.to_numeric(raw_df[order_col], errors="coerce").fillna(0) > 0].copy() if order_col else pd.DataFrame()

    spend_agg = _aggregate_spend(ad_df) if not ad_df.empty else pd.DataFrame()
    order_agg = _aggregate_orders(order_df) if not order_df.empty else pd.DataFrame()

    all_ads = all_ads_df.rename(columns={COL_AD: "ad_name"})

    if not spend_agg.empty:
        all_ads = all_ads.merge(spend_agg, on="ad_name", how="left")
    if not order_agg.empty:
        all_ads = all_ads.merge(order_agg, on="ad_name", how="left")

    numeric_cols = ["spend", "clicks", "impressions",
                    "gross_revenue", "total_orders", "total_cogs",
                    "total_refunds", "total_agency_fees", "total_cc_fees",
                    "total_customers", "new_customers", "sc_trials",
                    "nc_gross_revenue", "nc_total_cogs", "nc_total_refunds",
                    "nc_total_agency_fees", "nc_total_cc_fees"]
    for col in numeric_cols:
        if col not in all_ads.columns:
            all_ads[col] = 0
    all_ads[numeric_cols] = all_ads[numeric_cols].fillna(0)

    return _compute_beast_modes(all_ads)


def format_card_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Rename snake_case columns to Domo display names and apply column order.

    Used by daily card output. Different enrichment modules can define
    their own COLUMN_MAP and COLUMN_ORDER.
    """
    available = {k: v for k, v in COLUMN_MAP.items() if k in df.columns}
    df = df.rename(columns=available)
    present = [c for c in COLUMN_ORDER if c in df.columns]
    return df[present]
```

- [ ] **Step 5: Verify enrichment module imports correctly**

Run: `cd _performance-golf/pg-data-service && python -c "from enrichments import REGISTRY; print(REGISTRY)"`
Expected: `{'ad_performance': <function enrich at 0x...>}`

- [ ] **Step 6: Commit enrichment layer**

```bash
git add enrichments/__init__.py enrichments/ad_performance.py
git commit -m "feat: add enrichments layer — move all business logic from adapters/domo.py"
```

---

## Chunk 2: Adapter Simplification

### Task 3: Simplify `adapters/base.py`

**Files:**
- Modify: `adapters/base.py`

- [ ] **Step 7: Replace `fetch_ad_performance` with `fetch_all` in ABC**

The new ABC has two methods:
- `fetch_all(date_from, date_to) -> DataFrame` — all rows, no filtering, no aggregation. Used by `get_card()`.
- `fetch_raw(date_from, date_to, limit) -> DataFrame` — raw rows with email hash. Used by `get_raw()`.

```python
"""Abstract adapter interface.

Adapters are dumb pipes — they fetch raw rows and return DataFrames.
All business logic (aggregation, Beast Modes) lives in enrichments/.
"""

from abc import ABC, abstractmethod
import pandas as pd


class DataAdapter(ABC):
    """Interface that all data source adapters implement.

    fetch_all: returns all rows in a date range. No filtering, no aggregation.
    fetch_raw: returns raw rows with email hash. For ad-hoc analysis.
    """

    @abstractmethod
    def fetch_all(self, date_from: str, date_to: str) -> pd.DataFrame:
        """Fetch all rows in date range. Single API call. No filtering, no aggregation.
        Must validate date inputs via _validate_date() before query execution."""
        ...

    @abstractmethod
    def fetch_raw(self, date_from: str, date_to: str, limit: int = 100000) -> pd.DataFrame:
        """Return raw rows with all columns. Adds email_address_hash for cohort tracking.
        PII stripping happens in the API layer, not here."""
        ...
```

- [ ] **Step 8: Commit**

```bash
git add adapters/base.py
git commit -m "refactor: simplify adapter ABC — fetch_all + fetch_raw, no business logic"
```

---

### Task 4: Gut `adapters/domo.py`

**Files:**
- Modify: `adapters/domo.py`

- [ ] **Step 9: Remove all business logic, rename `_fetch_all_rows` → `fetch_all`**

After this change, `adapters/domo.py` contains ONLY:
- Imports and DomoClient setup (lines 1-31)
- `_clean_columns()` helper (stays — Domo-specific column cleaning)
- `_validate_date()` helper (stays — input validation)
- `DomoAdapter.__init__()` (stays)
- `DomoAdapter._query()` (stays)
- `DomoAdapter.fetch_all()` (renamed from `_fetch_all_rows`, now public)
- `DomoAdapter.fetch_raw()` (unchanged)

Removed entirely:
- All `COL_*` constants (moved to `enrichments/ad_performance.py`)
- `_safe_div()` (moved to `enrichments/ad_performance.py`)
- `fetch_ad_performance()` (replaced by enrichment module)
- `_extract_ad_list()` (moved)
- `_aggregate_spend()` (moved)
- `_aggregate_orders()` (moved)
- `_compute_beast_modes()` (moved)

The new file:

```python
"""Domo adapter — dumb pipe that fetches raw rows.

All business logic (aggregation, Beast Modes) lives in enrichments/.
This adapter only knows how to talk to Domo and return DataFrames.

Canonical DomoClient source: see DOMO_CLIENT_PATH env var
"""

import hashlib
import os
import re
import sys

import pandas as pd
from dotenv import load_dotenv

from .base import DataAdapter

load_dotenv()

# Import DomoClient from external path
_domo_path = os.getenv("DOMO_CLIENT_PATH")
if not _domo_path:
    raise EnvironmentError(
        "DOMO_CLIENT_PATH environment variable is required. "
        "Set it to the directory containing domo_client.py "
        "(e.g., export DOMO_CLIENT_PATH=/path/to/domo)"
    )
sys.path.insert(0, _domo_path)
from domo_client import DomoClient  # noqa: E402


def _clean_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Strip <BR> / newline artifacts from Domo column names."""
    df.columns = [c.replace("<BR>", " ").replace("\n", " ").strip() for c in df.columns]
    return df


def _validate_date(value: str) -> None:
    """Validate date string is YYYY-MM-DD format. Prevents SQL injection."""
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        raise ValueError(f"Invalid date format: {value!r}. Expected YYYY-MM-DD.")


class DomoAdapter(DataAdapter):

    def __init__(self, dataset_id: str):
        self._client = DomoClient()
        self._dataset_id = dataset_id

    def _query(self, sql: str) -> pd.DataFrame:
        df = self._client.query_dataset(self._dataset_id, sql)
        return _clean_columns(df)

    def fetch_all(self, date_from: str, date_to: str) -> pd.DataFrame:
        """Fetch all rows in date range. Single API call.

        Normalizes ad names to lowercase/stripped. No filtering, no aggregation.
        """
        _validate_date(date_from)
        _validate_date(date_to)
        sql = (
            f'SELECT * FROM table '
            f'WHERE `dateCreated` >= \'{date_from}\' '
            f'AND `dateCreated` <= \'{date_to}\''
        )
        df = self._query(sql)
        if df.empty:
            return df
        if "Ad" in df.columns:
            df["Ad"] = df["Ad"].astype(str).str.lower().str.strip()
        return df

    def fetch_raw(self, date_from: str, date_to: str, limit: int = 100000) -> pd.DataFrame:
        """Return raw rows with all columns. Adds email_address_hash for cohort tracking."""
        _validate_date(date_from)
        _validate_date(date_to)
        sql = (
            f'SELECT * FROM table '
            f'WHERE `dateCreated` >= \'{date_from}\' '
            f'AND `dateCreated` <= \'{date_to}\' '
            f'LIMIT {limit}'
        )
        df = self._query(sql)
        if not df.empty and "emailAddress" in df.columns:
            df["email_address_hash"] = df["emailAddress"].apply(
                lambda x: hashlib.sha256(str(x).lower().strip().encode()).hexdigest()[:16]
                if pd.notna(x) and str(x).strip() else None
            )
        return df
```

- [ ] **Step 10: Commit**

```bash
git add adapters/domo.py
git commit -m "refactor: gut adapter — remove all business logic, rename _fetch_all_rows to fetch_all"
```

---

## Chunk 3: API Layer + Script Update

### Task 5: Update `api.py` — add `get_card()`, `list_cards()`, deprecation alias

**Files:**
- Modify: `api.py`

- [ ] **Step 11: Rewrite `api.py`**

New public API:
- `get_card(card_name, date_from, date_to) -> pd.DataFrame`
- `get_raw(dataset_name, date_from, date_to, limit=100000) -> pd.DataFrame` (unchanged)
- `list_cards() -> dict[str, str]`
- `list_datasets() -> dict[str, str]` (unchanged)
- `get_enriched(date_from, date_to)` → deprecation alias for `get_card("ad_performance_summary", ...)`

```python
"""PG Data Service — Public API for programmatic access.

Usage:
    from api import get_card, get_raw, list_cards, list_datasets

    # See available cards and datasets
    list_cards()
    list_datasets()

    # Enriched data via card (Beast Modes computed, PII stripped)
    df = get_card("ad_performance_daily", "2026-03-08", "2026-03-14")
    df = get_card("ad_performance_summary", "2026-03-08", "2026-03-14")

    # Raw data (PII stripped, all columns otherwise)
    df = get_raw("ad_performance", "2026-01-01", "2026-03-15")

All functions strip PII before returning. No escape hatch.
"""

import warnings
from datetime import datetime, timedelta

import yaml
from pathlib import Path

import pandas as pd

from enrichments import REGISTRY as ENRICHMENT_REGISTRY
from utils.pii import strip_pii

ROOT = Path(__file__).parent

_datasets_cache: dict | None = None
_cards_cache: dict | None = None

# Adapter selection — change to "snowflake" when Snowflake replaces Domo (Q3/Q4 2026)
ADAPTER = "domo"


def _load_datasets() -> dict:
    """Load the approved datasets registry. Cached after first read."""
    global _datasets_cache
    if _datasets_cache is None:
        with open(ROOT / "datasets.yaml") as f:
            _datasets_cache = yaml.safe_load(f).get("datasets", {})
    return _datasets_cache


def _load_cards() -> dict:
    """Load the card registry. Cached after first read."""
    global _cards_cache
    if _cards_cache is None:
        with open(ROOT / "cards.yaml") as f:
            _cards_cache = yaml.safe_load(f).get("cards", {})
    return _cards_cache


def _get_adapter(dataset_id: str):
    """Create adapter for the given dataset ID."""
    if ADAPTER == "domo":
        from adapters.domo import DomoAdapter
        return DomoAdapter(dataset_id)
    elif ADAPTER == "snowflake":
        raise NotImplementedError("Snowflake adapter not yet implemented.")
    else:
        raise ValueError(f"Unknown adapter: {ADAPTER}")


def list_datasets() -> dict[str, str]:
    """Return {name: description} for all approved datasets."""
    return {name: info["description"] for name, info in _load_datasets().items()}


def list_cards() -> dict[str, str]:
    """Return {name: description} for all available cards."""
    return {name: info["description"] for name, info in _load_cards().items()}


def get_raw(
    dataset_name: str,
    date_from: str,
    date_to: str,
    limit: int = 100000,
) -> pd.DataFrame:
    """Fetch raw data from an approved dataset. PII is always stripped.

    Args:
        dataset_name: Friendly name from datasets.yaml (e.g., "ad_performance")
        date_from: Start date (YYYY-MM-DD)
        date_to: End date (YYYY-MM-DD)
        limit: Max rows (default 100,000)

    Returns:
        DataFrame with PII columns removed.

    Raises:
        KeyError: If dataset_name is not in the approved registry.
    """
    datasets = _load_datasets()
    if dataset_name not in datasets:
        available = ", ".join(sorted(datasets.keys()))
        raise KeyError(
            f"Dataset {dataset_name!r} not found. Available: {available}"
        )

    dataset_id = datasets[dataset_name]["dataset_id"]
    adapter = _get_adapter(dataset_id)
    df = adapter.fetch_raw(date_from, date_to, limit=limit)
    df = strip_pii(df)

    if len(df) >= limit:
        warnings.warn(
            f"Row limit reached ({limit:,} rows). Results may be incomplete. "
            f"Pass a higher limit= or narrow your date range.",
            stacklevel=2,
        )

    return df


def get_card(
    card_name: str,
    date_from: str,
    date_to: str,
) -> pd.DataFrame:
    """Fetch an enriched card view. PII is always stripped.

    Args:
        card_name: Card name from cards.yaml (e.g., "ad_performance_daily")
        date_from: Start date (YYYY-MM-DD)
        date_to: End date (YYYY-MM-DD)

    Returns:
        DataFrame with computed metrics, PII removed.
        - daily output: one row per ad per day, Domo display name columns
        - summary output: one row per ad, snake_case columns

    Raises:
        KeyError: If card_name is not in cards.yaml or dataset not found.
    """
    cards = _load_cards()
    if card_name not in cards:
        available = ", ".join(sorted(cards.keys()))
        raise KeyError(
            f"Card {card_name!r} not found. Available: {available}"
        )

    card = cards[card_name]
    dataset_name = card["dataset"]
    enrichment_name = card["enrichment"]
    output_mode = card["output"]

    # Look up dataset
    datasets = _load_datasets()
    if dataset_name not in datasets:
        raise KeyError(
            f"Card {card_name!r} references dataset {dataset_name!r} "
            f"which is not in datasets.yaml."
        )
    dataset_id = datasets[dataset_name]["dataset_id"]

    # Look up enrichment function
    if enrichment_name not in ENRICHMENT_REGISTRY:
        raise KeyError(
            f"Card {card_name!r} references enrichment {enrichment_name!r} "
            f"which is not in the enrichment registry."
        )
    enrich_fn = ENRICHMENT_REGISTRY[enrichment_name]

    adapter = _get_adapter(dataset_id)

    if output_mode == "daily":
        # One adapter call per day, enrich independently, concat
        start = datetime.strptime(date_from, "%Y-%m-%d")
        end = datetime.strptime(date_to, "%Y-%m-%d")

        frames = []
        current = start
        while current <= end:
            day_str = current.strftime("%Y-%m-%d")
            raw_df = adapter.fetch_all(day_str, day_str)
            if not raw_df.empty:
                enriched = enrich_fn(raw_df)
                enriched["Day"] = day_str
                frames.append(enriched)
            current += timedelta(days=1)

        if not frames:
            return pd.DataFrame()

        combined = pd.concat(frames, ignore_index=True)

        # Format columns — enrichment module owns the display name mapping
        from enrichments.ad_performance import format_card_columns
        combined = format_card_columns(combined)

        return strip_pii(combined)

    elif output_mode == "summary":
        # Single call for full range, enrich once
        raw_df = adapter.fetch_all(date_from, date_to)
        if raw_df.empty:
            return pd.DataFrame()
        enriched = enrich_fn(raw_df)
        return strip_pii(enriched)

    else:
        raise ValueError(
            f"Card {card_name!r} has unknown output mode {output_mode!r}. "
            f"Expected 'daily' or 'summary'."
        )


def get_enriched(
    date_from: str,
    date_to: str,
) -> pd.DataFrame:
    """DEPRECATED: Use get_card("ad_performance_summary", ...) instead.

    Thin alias that calls get_card("ad_performance_summary", date_from, date_to).
    """
    warnings.warn(
        "get_enriched() is deprecated. Use get_card('ad_performance_summary', ...) instead.",
        DeprecationWarning,
        stacklevel=2,
    )
    return get_card("ad_performance_summary", date_from, date_to)
```

- [ ] **Step 12: Commit**

```bash
git add api.py
git commit -m "feat: add get_card() and list_cards() — card-based API with daily/summary output"
```

---

### Task 6: Update `scripts/export_ad_performance.py`

**Files:**
- Modify: `scripts/export_ad_performance.py`

- [ ] **Step 13: Rewrite internals to use `get_card()`, keep public signature identical**

Christopher imports `get_ad_performance_card(date_from, date_to)`. That signature does NOT change. Internal implementation changes from day-loop + `get_enriched()` to single `get_card("ad_performance_daily", ...)` call.

`COLUMN_MAP` and `COLUMN_ORDER` are removed (now in `enrichments/ad_performance.py`). `_rename_and_order` is removed (now `format_card_columns` in enrichment module).

```python
#!/usr/bin/env python3
"""Export enriched ad performance data matching the Domo Ad Performance card schema.

Returns a DataFrame with 30 columns using Domo's display names.
Produces daily rows (one per ad per day) to match the Domo card structure.
No CSV write — consumers use the DataFrame however they want.

Usage as a script:
    python scripts/export_ad_performance.py --from 2026-03-15 --to 2026-03-18

Usage as an import:
    from scripts.export_ad_performance import get_ad_performance_card
    df = get_ad_performance_card("2026-03-15", "2026-03-18")
"""

import argparse
import sys
from pathlib import Path

import pandas as pd

# Ensure pg-data-service root is importable when run as a script
ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))

from api import get_card  # noqa: E402


def get_ad_performance_card(date_from: str, date_to: str) -> pd.DataFrame:
    """Return enriched DataFrame with Domo Ad Performance card column names.

    Produces daily rows (one per ad per day) matching the Domo card structure.
    Each day is enriched independently — same as how Domo computes Beast Modes
    per day.

    Args:
        date_from: Start date (YYYY-MM-DD)
        date_to: End date (YYYY-MM-DD)

    Returns:
        DataFrame with 30 columns matching the Domo card schema,
        one row per ad per day.
    """
    return get_card("ad_performance_daily", date_from, date_to)


def main():
    parser = argparse.ArgumentParser(
        description="Export enriched ad performance matching Domo card schema"
    )
    parser.add_argument("--from", dest="date_from", required=True, help="Start date YYYY-MM-DD")
    parser.add_argument("--to", dest="date_to", required=True, help="End date YYYY-MM-DD")
    args = parser.parse_args()

    print(f"Fetching enriched data {args.date_from} to {args.date_to}...")
    df = get_ad_performance_card(args.date_from, args.date_to)

    if df.empty:
        print("No data returned.")
        sys.exit(0)

    days = df["Day"].nunique() if "Day" in df.columns else 0
    print(f"  {len(df)} rows, {df['Ad'].nunique()} ads, {days} days, {len(df.columns)} columns")
    print(f"\nDataFrame ready. Use get_ad_performance_card() to access programmatically.")


if __name__ == "__main__":
    main()
```

- [ ] **Step 14: Commit**

```bash
git add scripts/export_ad_performance.py
git commit -m "refactor: export script uses get_card() internally, public signature unchanged"
```

---

## Chunk 4: Validation + Docs

### Task 7: Validate against Domo CSV

**Files:**
- Modify: `notebooks/validate_enriched.ipynb` (update imports)

- [ ] **Step 15: Update notebook to use `get_card("ad_performance_daily", ...)`**

Change the import from `get_enriched` to `get_card` and update the call to use the daily card. Verify the output still matches the Domo CSV at `notebooks/domo_ad_performance.csv`.

- [ ] **Step 16: Run validation notebook and confirm 0% divergence on base columns**

Run: `cd _performance-golf/pg-data-service && python -c "from api import get_card; df = get_card('ad_performance_summary', '2026-03-08', '2026-03-14'); print(f'{len(df)} rows, {len(df.columns)} columns')"`

Expected: `928 rows, XX columns` (same row count as before the refactor)

- [ ] **Step 17: Commit validation updates**

```bash
git add notebooks/validate_enriched.ipynb
git commit -m "chore: update validation notebook to use get_card()"
```

---

### Task 8: Update documentation

**Files:**
- Modify: `PG-DATA-SERVICE.md`
- Modify: `README.md`

- [ ] **Step 18: Update PG-DATA-SERVICE.md**

Update the "How the System Works" section to reflect the card-based architecture:
- `get_card()` as primary enriched data entry point
- `get_raw()` unchanged
- `get_enriched()` shown as deprecated alias
- `get_ad_performance_card()` shown as backwards-compat wrapper
- Card registry and enrichment modules explained
- Data flow diagram updated

- [ ] **Step 19: Update README.md usage examples**

Update any usage examples to show `get_card()` as the primary interface.

- [ ] **Step 20: Commit docs**

```bash
git add PG-DATA-SERVICE.md README.md
git commit -m "docs: update architecture docs for card-based API"
```
