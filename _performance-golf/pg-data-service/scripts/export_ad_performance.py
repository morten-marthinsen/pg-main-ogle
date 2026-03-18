#!/usr/bin/env python3
"""Export enriched ad performance data matching the Domo Ad Performance card schema.

Returns a DataFrame with 30 columns using Domo's display names (including <BR> artifacts).
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
from datetime import datetime, timedelta
from pathlib import Path

import pandas as pd

# Ensure pg-data-service root is importable when run as a script
ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))

from api import get_enriched  # noqa: E402

# Internal column name -> Domo Ad Performance card display name.
# Order matches the Domo card CSV export exactly. <BR> artifacts are intentional.
COLUMN_MAP = {
    "ad_name":                  "Ad",
    # "day" is injected, not from the adapter
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

# Column output order (matches Domo card CSV)
COLUMN_ORDER = [
    "Ad", "Day", "Status", "Spend", "Net Revenue", "Net ROAS", "NC Net ROAS",
    "Cost /<BR># SC Trials", "CPA", "NC CPA", "Net Loss<BR>Per Trial",
    "Fixed Refund<BR>NLPT", "NC %", "Gross Revenue", "Gross<BR>ROAS",
    "CVR", "NC CVR%", "RC CVR%", "AOV", "NC AOV", "RC AOV",
    "CPC", "CTR", "CPM", "Orders", "# SC Trials<BR>Started", "NC Orders",
    "Clicks", "Impressions", "Fixed Refund<BR>Net Revenue",
]


def _rename_and_order(df: pd.DataFrame) -> pd.DataFrame:
    """Rename internal columns to Domo display names and apply column order."""
    available = {k: v for k, v in COLUMN_MAP.items() if k in df.columns}
    df = df.rename(columns=available)
    present = [c for c in COLUMN_ORDER if c in df.columns]
    return df[present]


def get_ad_performance_card(date_from: str, date_to: str):
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
    start = datetime.strptime(date_from, "%Y-%m-%d")
    end = datetime.strptime(date_to, "%Y-%m-%d")

    frames = []
    current = start
    while current <= end:
        day_str = current.strftime("%Y-%m-%d")
        df = get_enriched(day_str, day_str)
        if not df.empty:
            df["Day"] = day_str
            frames.append(df)
        current += timedelta(days=1)

    if not frames:
        return pd.DataFrame()

    combined = pd.concat(frames, ignore_index=True)
    return _rename_and_order(combined)


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
