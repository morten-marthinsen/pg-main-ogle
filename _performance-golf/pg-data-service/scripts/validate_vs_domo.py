#!/usr/bin/env python3
"""Compare our enriched output against the Domo Ad Performance card CSV.

Strategy: The Domo CSV has daily rows (one per ad per day). Our pipeline
aggregates across a date range. So we sum the Domo CSV's additive columns
across all days, then compare those base numbers. If the base numbers match,
the computed ratios (ROAS, CPA, etc.) must also match since the formulas
are the same.

Usage:
    python scripts/validate_vs_domo.py \
        --csv "/Users/patrickhayes/Downloads/Ad Performance.csv" \
        --from 2026-03-15 --to 2026-03-18
"""

import argparse
import sys
from pathlib import Path

import pandas as pd
import numpy as np

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))

from scripts.export_ad_performance import get_ad_performance_card  # noqa: E402


# Columns that are additive (can be summed across days)
ADDITIVE_COLS = [
    "Spend", "Gross Revenue", "Clicks", "Impressions",
    "Orders", "# SC Trials<BR>Started", "NC Orders",
    "Net Revenue", "Fixed Refund<BR>Net Revenue",
]


def main():
    parser = argparse.ArgumentParser(description="Validate enriched output vs Domo CSV")
    parser.add_argument("--csv", required=True, help="Path to Domo Ad Performance CSV")
    parser.add_argument("--from", dest="date_from", required=True)
    parser.add_argument("--to", dest="date_to", required=True)
    parser.add_argument("--top", type=int, default=20, help="Compare top N ads by spend")
    args = parser.parse_args()

    # --- Load & aggregate Domo CSV ---
    print(f"Loading Domo CSV: {args.csv}")
    domo_raw = pd.read_csv(args.csv)
    domo_raw["Ad"] = domo_raw["Ad"].astype(str).str.lower().str.strip()
    print(f"  {len(domo_raw)} rows, {domo_raw['Day'].nunique()} days ({sorted(domo_raw['Day'].unique())})")
    print(f"  {domo_raw['Ad'].nunique()} unique ads")

    # Coerce additive columns to numeric
    for c in ADDITIVE_COLS:
        if c in domo_raw.columns:
            domo_raw[c] = pd.to_numeric(domo_raw[c], errors="coerce").fillna(0)

    # Aggregate: sum additive columns per ad
    agg_dict = {c: "sum" for c in ADDITIVE_COLS if c in domo_raw.columns}
    domo = domo_raw.groupby("Ad", as_index=False).agg(**{c: (c, f) for c, f in agg_dict.items()})
    print(f"  Aggregated to {len(domo)} ads")

    # --- Load our enriched data for the same date range ---
    print(f"\nFetching enriched data {args.date_from} to {args.date_to}...")
    ours = get_ad_performance_card(args.date_from, args.date_to, day=args.date_to)
    if ours.empty:
        print("No enriched data returned.")
        sys.exit(1)
    ours["Ad"] = ours["Ad"].astype(str).str.lower().str.strip()
    print(f"  {len(ours)} ads")

    # --- Find common ads, focus on top N ---
    common_ads = set(domo["Ad"]) & set(ours["Ad"])
    print(f"  Common ads: {len(common_ads)}")
    domo_only = set(domo["Ad"]) - set(ours["Ad"])
    ours_only = set(ours["Ad"]) - set(domo["Ad"])
    if domo_only:
        print(f"  Domo-only (not in ours): {len(domo_only)}")
    if ours_only:
        print(f"  Ours-only (not in Domo): {len(ours_only)}")

    if not common_ads:
        print("No overlapping ads!")
        sys.exit(1)

    # Top N by Domo spend
    domo_c = domo[domo["Ad"].isin(common_ads)].nlargest(args.top, "Spend")
    top_ads = domo_c["Ad"].tolist()

    domo_top = domo[domo["Ad"].isin(top_ads)].set_index("Ad")
    ours_top = ours[ours["Ad"].isin(top_ads)].drop_duplicates(subset=["Ad"]).set_index("Ad")

    # --- Compare additive columns ---
    compare_cols = [c for c in ADDITIVE_COLS if c in domo_top.columns and c in ours_top.columns]

    print(f"\n{'='*80}")
    print(f"COMPARING TOP {len(top_ads)} ADS — ADDITIVE BASE COLUMNS")
    print(f"If these match, computed ratios (ROAS, CPA, etc.) match by construction.")
    print(f"{'='*80}\n")

    issues = []
    for col in compare_cols:
        domo_vals = domo_top[col]
        ours_vals = pd.to_numeric(ours_top.reindex(domo_top.index)[col], errors="coerce")

        diff = (ours_vals - domo_vals).abs()
        denom = domo_vals.abs().clip(lower=0.01)
        rel_diff = diff / denom

        max_rel = rel_diff.max()
        mean_rel = rel_diff.mean()

        if max_rel > 0.01:
            status = "MISMATCH"
            issues.append(col)
        elif max_rel > 0.001:
            status = "CLOSE"
        else:
            status = "OK"

        worst_ad = rel_diff.idxmax()
        d_val = domo_vals.get(worst_ad, 0)
        o_val = ours_vals.get(worst_ad, 0)

        print(f"  {status:10s} | {col:35s} | max: {max_rel:.2%} mean: {mean_rel:.2%}")
        if max_rel > 0.01:
            print(f"             | worst: {worst_ad[:60]}")
            print(f"             | domo={d_val:.2f}  ours={o_val:.2f}")
            print()

    # --- Also show a few specific ads side by side ---
    print(f"\n{'='*80}")
    print(f"SIDE-BY-SIDE: TOP 5 ADS BY SPEND")
    print(f"{'='*80}\n")

    for ad in top_ads[:5]:
        d = domo_top.loc[ad] if ad in domo_top.index else None
        o = ours_top.loc[ad] if ad in ours_top.index else None
        if d is None or o is None:
            continue
        print(f"  Ad: {ad[:70]}")
        for col in compare_cols:
            d_val = d[col] if col in d.index else "N/A"
            o_val = o[col] if col in o.index else "N/A"
            try:
                match = "ok" if abs(float(d_val) - float(o_val)) / max(abs(float(d_val)), 0.01) < 0.01 else "!!"
            except (ValueError, TypeError):
                match = "??"
            print(f"    {col:35s}  domo={str(d_val):>15s}  ours={str(o_val):>15s}  {match}")
        print()

    print(f"{'='*80}")
    if issues:
        print(f"MISMATCHES ({len(issues)} columns):")
        for c in issues:
            print(f"  - {c}")
    else:
        print("ALL BASE COLUMNS MATCH — computed ratios are correct by construction")
    print(f"{'='*80}")


if __name__ == "__main__":
    main()
