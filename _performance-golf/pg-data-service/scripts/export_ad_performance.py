#!/usr/bin/env python3
"""Export enriched ad performance data matching the Domo Ad Performance card schema.

Returns a DataFrame with 30 columns using Domo's display names (including <BR> artifacts).
No CSV write — consumers use the DataFrame however they want.

Usage as a script:
    python scripts/export_ad_performance.py --from 2026-03-01 --to 2026-03-18 --day 2026-03-18

Usage as an import:
    from scripts.export_ad_performance import get_ad_performance_card
    df = get_ad_performance_card("2026-03-01", "2026-03-18", day="2026-03-18")
"""

import argparse
import sys
from pathlib import Path

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


def get_ad_performance_card(date_from: str, date_to: str, day: str = None):
    """Return enriched DataFrame with Domo Ad Performance card column names.

    Args:
        date_from: Start date (YYYY-MM-DD)
        date_to: End date (YYYY-MM-DD)
        day: Reporting date for the "Day" column. Defaults to date_to.

    Returns:
        DataFrame with 30 columns matching the Domo card schema.
    """
    if day is None:
        day = date_to

    df = get_enriched(date_from, date_to)

    if df.empty:
        return df

    # Inject the Day column
    df["Day"] = day

    # Rename internal names to Domo display names
    available = {k: v for k, v in COLUMN_MAP.items() if k in df.columns}
    df = df.rename(columns=available)

    # Select only the card columns, in order, skipping any that aren't present
    present = [c for c in COLUMN_ORDER if c in df.columns]
    return df[present]


def main():
    parser = argparse.ArgumentParser(
        description="Export enriched ad performance matching Domo card schema"
    )
    parser.add_argument("--from", dest="date_from", required=True, help="Start date YYYY-MM-DD")
    parser.add_argument("--to", dest="date_to", required=True, help="End date YYYY-MM-DD")
    parser.add_argument("--day", help="Reporting date for Day column (defaults to --to)")
    args = parser.parse_args()

    print(f"Fetching enriched data {args.date_from} to {args.date_to}...")
    df = get_ad_performance_card(args.date_from, args.date_to, day=args.day)

    if df.empty:
        print("No data returned.")
        sys.exit(0)

    print(f"  {len(df)} ads, {len(df.columns)} columns")
    print(f"  Columns: {list(df.columns)}")
    print(f"\nDataFrame ready. Use get_ad_performance_card() to access programmatically.")


if __name__ == "__main__":
    main()
