"""Domo adapter — wraps DomoClient, computes Beast Modes in pandas.

Beast Mode calculations live HERE because they are Domo-specific workarounds.
Domo SQL has no GROUP BY, so all aggregation happens in pandas after fetch.
When Snowflake replaces Domo, this file dies. The model layer doesn't change.

Canonical DomoClient source: /Users/patrickhayes/Development/domo/domo_client.py
"""

import os
import sys

import pandas as pd
from dotenv import load_dotenv

from .base import DataAdapter

load_dotenv()

# Import DomoClient from external path
_domo_path = os.getenv("DOMO_CLIENT_PATH", "/Users/patrickhayes/Development/domo")
sys.path.insert(0, _domo_path)
from domo_client import DomoClient  # noqa: E402


# --- Column name constants ---
# These map to the actual Domo dataset column names.
# Centralised here so typos are caught once, not scattered across queries.

COL_AD = "Ad"
COL_SPEND = "Spend"
COL_CLICKS = "Clicks"
COL_IMPRESSIONS = "Impressions"
COL_PLATFORM = "Ad Platform"
COL_VALID_15 = "Valid 15-Position Ad Name?"
COL_TOTAL_AMOUNT = "totalAmount"
COL_ORDER_ID = "orderId"
COL_PHYSICAL_COGS = "Physical COGS Per Order"
COL_REFUNDED_REVENUE = "Refunded Revenue"
COL_AGENCY_FEES = "Agency Fees"
COL_CC_FEES = "CC Fees"
COL_EMAIL = "emailAddress"
COL_NEW_CUSTOMERS = "New Customers"
COL_SC_TRIALS = "# SC Trials\nStarted"  # Domo <BR> renders as newline
COL_HAS_UPSELL = "hasUpsell"

# Pre-parsed 15-position columns (already in dataset)
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

# Valid funnel codes from TESS-NAMING-CONVENTION.md v3.9
# Used to filter out rows where Domo's 15-position parser mis-flagged invalid ads
VALID_FUNNEL_CODES = {
    # Active Physical
    "357", "clst", "df1", "gbf", "ghd", "pio", "pll", "rs1",
    "sf1", "sf2", "spd", "ssp", "thr", "wdg1", "wdgs",
    # Active Digital
    "dqfe", "dqfe1", "htkt", "ossf", "pg1", "pgb", "pgf",
    "srsw", "ssdp", "ssts", "wpss",
    # Retired (may still appear in historical data)
    "pgapp", "pss", "sqse", "sqp", "tsst",
    # Additional observed in data
    "tow",
}


# Columns to select for ad-metric rows (Spend > 0)
AD_METRIC_COLS = [
    COL_AD, COL_SPEND, COL_CLICKS, COL_IMPRESSIONS,
    COL_PLATFORM, COL_VALID_15,
    COL_FUNNEL, COL_SCRIPT_ID, COL_VARIATION_ID,
    COL_AD_CATEGORY, COL_EXPANSION_TYPE, COL_ASSET_TYPE,
    COL_TALENT_CODE, COL_EDITOR, COL_COPYWRITER,
    COL_TALENT_NAME, COL_EDITOR_NAME, COL_COPYWRITER_NAME,
    COL_OFFER_NAME, COL_EXPANSION_TYPE_NAME, COL_ASSET_TYPE_NAME,
]

# Columns to select for order rows (totalAmount > 0)
ORDER_COLS = [
    COL_AD, COL_TOTAL_AMOUNT, COL_ORDER_ID,
    COL_PHYSICAL_COGS, COL_REFUNDED_REVENUE,
    COL_AGENCY_FEES, COL_CC_FEES,
    COL_EMAIL, COL_NEW_CUSTOMERS, COL_SC_TRIALS,
    COL_HAS_UPSELL,
]


def _clean_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Strip <BR> / newline artifacts from Domo column names."""
    df.columns = [c.replace("<BR>", " ").replace("\n", " ").strip() for c in df.columns]
    return df


def _safe_div(numerator: pd.Series, denominator: pd.Series) -> pd.Series:
    """Divide, returning NaN where denominator is 0."""
    return numerator / denominator.replace(0, pd.NA)


class DomoAdapter(DataAdapter):

    def __init__(self, dataset_id: str):
        self._client = DomoClient()
        self._dataset_id = dataset_id

    def _query(self, sql: str) -> pd.DataFrame:
        df = self._client.query_dataset(self._dataset_id, sql)
        return _clean_columns(df)

    def fetch_ad_performance(self, date_from: str, date_to: str) -> pd.DataFrame:
        """Fetch ad-metric + order rows, aggregate, compute Beast Modes.

        Returns one row per ad with all computed metrics and parsed 15-position fields.
        """
        ad_df = self._fetch_ad_metrics(date_from, date_to)
        order_df = self._fetch_orders(date_from, date_to)

        if ad_df.empty:
            return pd.DataFrame()

        # --- Aggregate spend side: one row per ad ---
        spend_agg = self._aggregate_spend(ad_df)

        # --- Aggregate order side: one row per ad ---
        order_agg = self._aggregate_orders(order_df) if not order_df.empty else pd.DataFrame()

        # --- Merge on ad name ---
        if order_agg.empty:
            merged = spend_agg.copy()
            for col in ["gross_revenue", "total_orders", "total_cogs",
                         "total_refunds", "total_agency_fees", "total_cc_fees",
                         "total_customers", "new_customers", "sc_trials",
                         "nc_gross_revenue", "nc_total_cogs", "nc_total_refunds",
                         "nc_total_agency_fees", "nc_total_cc_fees"]:
                merged[col] = 0
        else:
            merged = spend_agg.merge(order_agg, on="ad_name", how="left").fillna(0)

        # --- Compute Beast Modes ---
        merged = self._compute_beast_modes(merged)

        return merged

    def fetch_raw(self, date_from: str, date_to: str, limit: int = 10000) -> pd.DataFrame:
        """Return raw rows, all columns, no transformation."""
        sql = f'SELECT * FROM table WHERE `{COL_VALID_15}` = 1 LIMIT {limit}'
        return self._query(sql)

    # --- Private: fetch ---

    def _fetch_ad_metrics(self, date_from: str, date_to: str) -> pd.DataFrame:
        """Fetch rows where Spend > 0 (ad-metric rows)."""
        sql = (
            f'SELECT * FROM table '
            f'WHERE `{COL_SPEND}` > 0 '
            f'AND `{COL_VALID_15}` = 1 '
            f'AND `{COL_PLATFORM}` = \'facebook\' '
            f'AND `dateCreated` >= \'{date_from}\' '
            f'AND `dateCreated` <= \'{date_to}\''
        )
        df = self._query(sql)
        if df.empty:
            return df
        # Normalize ad names to lowercase
        df[COL_AD] = df[COL_AD].astype(str).str.lower().str.strip()
        # Filter to valid funnel codes (Domo's 15-position parser sometimes mis-flags)
        if COL_FUNNEL in df.columns:
            df = df[df[COL_FUNNEL].str.lower().str.strip().isin(VALID_FUNNEL_CODES)]
        return df

    def _fetch_orders(self, date_from: str, date_to: str) -> pd.DataFrame:
        """Fetch rows where totalAmount > 0 (order rows)."""
        sql = (
            f'SELECT * FROM table '
            f'WHERE `{COL_TOTAL_AMOUNT}` > 0 '
            f'AND `{COL_VALID_15}` = 1 '
            f'AND `dateCreated` >= \'{date_from}\' '
            f'AND `dateCreated` <= \'{date_to}\''
        )
        df = self._query(sql)
        if df.empty:
            return df
        df[COL_AD] = df[COL_AD].astype(str).str.lower().str.strip()
        if COL_FUNNEL in df.columns:
            df = df[df[COL_FUNNEL].str.lower().str.strip().isin(VALID_FUNNEL_CODES)]
        return df

    # --- Private: aggregation ---

    def _aggregate_spend(self, ad_df: pd.DataFrame) -> pd.DataFrame:
        """Group ad-metric rows by ad name. Sum spend/clicks/impressions."""
        # Ensure numeric
        for col in [COL_SPEND, COL_CLICKS, COL_IMPRESSIONS]:
            ad_df[col] = pd.to_numeric(ad_df[col], errors="coerce").fillna(0)

        spend_agg = ad_df.groupby(COL_AD, as_index=False).agg(
            spend=(COL_SPEND, "sum"),
            clicks=(COL_CLICKS, "sum"),
            impressions=(COL_IMPRESSIONS, "sum"),
        )
        spend_agg = spend_agg.rename(columns={COL_AD: "ad_name"})

        # Grab 15-position fields from first row per ad (they're the same across daily rows)
        first_rows = ad_df.drop_duplicates(subset=[COL_AD], keep="first")
        position_cols = {
            COL_FUNNEL: "funnel",
            COL_SCRIPT_ID: "script_id",
            COL_VARIATION_ID: "variation_id",
            COL_AD_CATEGORY: "ad_category",
            COL_EXPANSION_TYPE: "expansion_type",
            COL_ASSET_TYPE: "asset_type",
            COL_TALENT_CODE: "talent_code",
            COL_EDITOR: "editor_initials",
            COL_COPYWRITER: "copywriter_initials",
            COL_PLATFORM: "platform",
            COL_TALENT_NAME: "talent_name",
            COL_EDITOR_NAME: "editor_name",
            COL_COPYWRITER_NAME: "copywriter_name",
            COL_OFFER_NAME: "offer_name",
            COL_EXPANSION_TYPE_NAME: "expansion_type_name",
            COL_ASSET_TYPE_NAME: "asset_type_name",
        }
        keep = [COL_AD] + [c for c in position_cols if c in first_rows.columns]
        positions = first_rows[keep].rename(columns={COL_AD: "ad_name", **{k: v for k, v in position_cols.items() if k in first_rows.columns}})

        spend_agg = spend_agg.merge(positions, on="ad_name", how="left")
        return spend_agg

    def _aggregate_orders(self, order_df: pd.DataFrame) -> pd.DataFrame:
        """Group order rows by ad name. Compute revenue, costs, customer counts."""
        # Ensure numeric
        for col in [COL_TOTAL_AMOUNT, COL_PHYSICAL_COGS, COL_REFUNDED_REVENUE,
                     COL_AGENCY_FEES, COL_CC_FEES]:
            if col in order_df.columns:
                order_df[col] = pd.to_numeric(order_df[col], errors="coerce").fillna(0)

        # Clean SC Trials column name (may have been cleaned already)
        sc_trials_col = None
        for candidate in ["# SC Trials Started", COL_SC_TRIALS, "# SC Trials\nStarted"]:
            if candidate in order_df.columns:
                sc_trials_col = candidate
                break
        if sc_trials_col:
            order_df[sc_trials_col] = pd.to_numeric(order_df[sc_trials_col], errors="coerce").fillna(0)

        # --- All customers aggregation ---
        all_agg = order_df.groupby(COL_AD, as_index=False).agg(
            gross_revenue=(COL_TOTAL_AMOUNT, "sum"),
            total_orders=(COL_ORDER_ID, "nunique"),
            total_cogs=(COL_PHYSICAL_COGS, "sum"),
            total_refunds=(COL_REFUNDED_REVENUE, "sum"),
            total_agency_fees=(COL_AGENCY_FEES, "sum"),
            total_cc_fees=(COL_CC_FEES, "sum"),
            total_customers=(COL_EMAIL, "nunique"),
        )

        # SC Trials
        if sc_trials_col:
            sc_agg = order_df.groupby(COL_AD, as_index=False).agg(
                sc_trials=(sc_trials_col, "sum"),
            )
            all_agg = all_agg.merge(sc_agg, on=COL_AD, how="left")
        else:
            all_agg["sc_trials"] = 0

        # --- New customers only ---
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

    # --- Private: Beast Mode calculations ---

    def _compute_beast_modes(self, df: pd.DataFrame) -> pd.DataFrame:
        """Compute all Beast Mode metrics. These are Domo-specific — die with Domo.

        Formulas sourced from Domo Beast Mode definitions (2026-03-16).
        """
        s = df["spend"]
        gr = df["gross_revenue"]
        cogs = df["total_cogs"]
        refunds = df["total_refunds"]           # Already negative from transform
        agency = df["total_agency_fees"]
        cc = df["total_cc_fees"]
        customers = df["total_customers"]
        new_cust = df["new_customers"]
        clicks = df["clicks"]
        sc_trials = df["sc_trials"]

        # NC fields
        nc_gr = df["nc_gross_revenue"]
        nc_cogs = df["nc_total_cogs"]
        nc_refunds = df["nc_total_refunds"]
        nc_agency = df["nc_total_agency_fees"]
        nc_cc = df["nc_total_cc_fees"]

        # --- Gross metrics ---
        df["gross_roas"] = _safe_div(gr, s)

        # Gross Profit: totalAmount - Physical COGS - Refunded Revenue
        df["gross_profit"] = gr - cogs - refunds

        # --- Net metrics ---
        # Net Revenue = totalAmount - COGS + Refunded Revenue (negative) - Agency - CC - Spend
        df["net_revenue"] = gr - cogs + refunds - agency - cc - s
        df["net_roas"] = _safe_div(df["net_revenue"], s) + 1

        # --- NC Net ROAS ---
        # Same formula but revenue/cost side filtered to new customers only
        nc_net_rev = nc_gr - nc_cogs + nc_refunds - nc_agency - nc_cc - s
        df["nc_net_roas"] = _safe_div(nc_net_rev, s) + 1

        # --- CPA metrics ---
        df["cpa"] = _safe_div(s, customers)
        df["nc_cpa"] = _safe_div(s, new_cust)

        # --- Net AOV = CPA * Net ROAS ---
        df["net_aov"] = df["cpa"] * df["net_roas"]

        # --- NLPT = Net Revenue / SC Trials Started ---
        df["nlpt"] = _safe_div(df["net_revenue"], sc_trials)

        # --- NC % = new customers / total customers ---
        df["nc_pct"] = _safe_div(new_cust, customers)

        # --- Conversion rates ---
        df["cvr_pct"] = _safe_div(customers, clicks)
        df["nc_cvr_pct"] = _safe_div(new_cust, clicks)
        rc = customers - new_cust
        df["rc_cvr_pct"] = _safe_div(rc, clicks)

        # --- Fixed Refund Net Revenue (8% flat instead of actual refunds) ---
        fixed_refund = gr * 0.08
        df["fixed_refund_net_revenue"] = gr - cogs - fixed_refund - agency - cc - s

        return df
