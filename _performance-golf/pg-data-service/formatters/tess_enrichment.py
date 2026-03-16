"""Tess enrichment formatter — CSV with all metrics for SSS integration.

Outputs enriched per-ad data that Tess can consume directly.
Column names are human-readable to match SSS conventions.
PII is stripped before writing.
"""

import pandas as pd
from pathlib import Path

from ._shared import strip_pii


# Column rename map: internal name -> Tess-friendly display name
COLUMN_DISPLAY_NAMES = {
    "ad_name": "Ad Name",
    "funnel": "Funnel",
    "script_id": "Root Angle ID",
    "variation_id": "Variation ID",
    "platform": "Platform",
    "ad_category": "Ad Category",
    "expansion_type_name": "Expansion Type",
    "asset_type_name": "Asset Type",
    "talent_name": "Talent",
    "editor_name": "Editor",
    "copywriter_name": "Copywriter",
    "offer_name": "Offer Name",
    "spend": "Spend",
    "gross_revenue": "Gross Revenue",
    "net_revenue": "Net Revenue",
    "gross_roas": "Gross ROAS",
    "net_roas": "Net ROAS",
    "gross_profit": "Gross Profit",
    "nc_net_roas": "NC Net ROAS",
    "cpa": "CPA",
    "nc_cpa": "NC CPA",
    "net_aov": "Net AOV",
    "nlpt": "Net Loss Per Trial",
    "nc_pct": "NC %",
    "cvr_pct": "CVR %",
    "nc_cvr_pct": "NC CVR %",
    "rc_cvr_pct": "RC CVR %",
    "fixed_refund_net_revenue": "Fixed Refund Net Revenue",
    "clicks": "Clicks",
    "impressions": "Impressions",
    "total_orders": "Orders",
    "total_customers": "Customers",
    "new_customers": "New Customers",
    "sc_trials": "SC Trials",
    "classification": "Classification",
}

# Columns to include in output, in order
OUTPUT_COLUMNS = list(COLUMN_DISPLAY_NAMES.keys())


def format_tess_enrichment(
    ad_perf_df: pd.DataFrame,
    output_dir: Path,
    date_from: str,
    date_to: str,
) -> Path:
    """Write enriched CSV for Tess. Returns output path."""
    df = strip_pii(ad_perf_df)

    # Select and reorder columns (skip any missing)
    available = [c for c in OUTPUT_COLUMNS if c in df.columns]
    df = df[available].copy()

    # Rename to display names
    rename_map = {k: v for k, v in COLUMN_DISPLAY_NAMES.items() if k in df.columns}
    df = df.rename(columns=rename_map)

    # Sort by spend descending
    if "Spend" in df.columns:
        df = df.sort_values("Spend", ascending=False)

    out_path = output_dir / "tess" / f"enriched_{date_from}_to_{date_to}.csv"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(out_path, index=False)

    return out_path
