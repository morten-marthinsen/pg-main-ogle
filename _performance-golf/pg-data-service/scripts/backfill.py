#!/usr/bin/env python3
"""Backfill dataruns/ with historical ad performance data from Domo.

Usage:
    python3 scripts/backfill.py                          # Jan 1 2026 to yesterday
    python3 scripts/backfill.py --from 2026-02-01        # Custom start date
    python3 scripts/backfill.py --from 2026-03-01 --to 2026-03-14  # Custom range

Saves one CSV per day to dataruns/YYYY-MM/YYYY-MM-DD.csv.
Skips days that already have a file (safe to re-run).
"""
from __future__ import annotations

import argparse
import sys
import time
from datetime import datetime, timedelta
from pathlib import Path

# Add pg-data-service root to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

from api import get_card


def backfill(date_from: str, date_to: str, dataruns_dir: Path) -> None:
    """Pull data for each day in range, saving CSVs to dataruns/."""
    start = datetime.strptime(date_from, "%Y-%m-%d")
    end = datetime.strptime(date_to, "%Y-%m-%d")

    total_days = (end - start).days + 1
    fetched = 0
    skipped = 0
    errors = 0

    print(f"Backfill: {date_from} → {date_to} ({total_days} days)")
    print(f"Output:   {dataruns_dir}\n")

    current = start
    while current <= end:
        date_str = current.strftime("%Y-%m-%d")
        month_str = current.strftime("%Y-%m")
        month_dir = dataruns_dir / month_str
        csv_path = month_dir / f"{date_str}.csv"

        day_num = (current - start).days + 1

        if csv_path.exists():
            print(f"  [{day_num}/{total_days}] {date_str} — skipped (exists)")
            skipped += 1
            current += timedelta(days=1)
            continue

        try:
            df = get_card("ad_performance_daily", date_str, date_str)

            if df.empty:
                print(f"  [{day_num}/{total_days}] {date_str} — empty (no data)")
                current += timedelta(days=1)
                continue

            month_dir.mkdir(parents=True, exist_ok=True)
            df.to_csv(csv_path, index=False)
            ads = df["Ad"].nunique()
            print(f"  [{day_num}/{total_days}] {date_str} — ✅ {ads} ads, {len(df)} rows")
            fetched += 1

        except Exception as e:
            print(f"  [{day_num}/{total_days}] {date_str} — ❌ {e}")
            errors += 1

        current += timedelta(days=1)

    print(f"\nDone: {fetched} fetched, {skipped} skipped, {errors} errors")


def main():
    parser = argparse.ArgumentParser(description="Backfill dataruns from Domo")
    parser.add_argument("--from", dest="date_from", default="2026-01-01",
                        help="Start date (YYYY-MM-DD), default: 2026-01-01")
    parser.add_argument("--to", dest="date_to", default=None,
                        help="End date (YYYY-MM-DD), default: yesterday")
    args = parser.parse_args()

    if args.date_to is None:
        args.date_to = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")

    dataruns_dir = Path(__file__).resolve().parent.parent / "dataruns"
    dataruns_dir.mkdir(exist_ok=True)

    backfill(args.date_from, args.date_to, dataruns_dir)


if __name__ == "__main__":
    main()
