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

    nc_val = order_df[COL_NEW_CUSTOMERS].astype(str).str.strip()
    nc_df = order_df[nc_val.ne("") & nc_val.ne("0") & nc_val.ne("nan")]
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

    # WARNING: refunds is already negative from Domo transform, so subtracting
    # a negative inflates gross_profit. This matches Domo's Beast Mode output
    # exactly — likely a bug in Domo, but we replicate it for parity.
    # Do NOT "fix" the sign without first confirming Domo has been corrected.
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
