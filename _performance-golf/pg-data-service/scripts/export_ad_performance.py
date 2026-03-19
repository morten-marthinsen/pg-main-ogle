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
