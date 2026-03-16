"""Angle analysis — groups enriched ads by root angle (script_id).

Consumes the output of ad_performance (never touches the adapter).
Identifies saturated angles, winning angles, and angles to avoid.
"""

import pandas as pd


def build_angle_analysis(ad_perf_df: pd.DataFrame, saturation_threshold: int = 3) -> pd.DataFrame:
    """Group ads by script_id (root angle). Flag saturation.

    Returns one row per root angle with:
        script_id, funnel, variation_count, total_spend, total_revenue,
        net_roas_weighted, winner_count, classification_dist, is_saturated
    """
    if ad_perf_df.empty or "script_id" not in ad_perf_df.columns:
        return pd.DataFrame()

    # Filter to ads with valid script IDs
    df = ad_perf_df[ad_perf_df["script_id"].notna() & (ad_perf_df["script_id"] != "")].copy()
    if df.empty:
        return pd.DataFrame()

    grouped = df.groupby("script_id", as_index=False).agg(
        funnel=("funnel", "first"),
        variation_count=("ad_name", "count"),
        total_spend=("spend", "sum"),
        total_revenue=("gross_revenue", "sum"),
        winner_count=("classification", lambda x: (x == "Winner").sum()),
        potential_count=("classification", lambda x: (x == "Potential").sum()),
        underperformer_count=("classification", lambda x: (x == "Underperformer").sum()),
        testing_count=("classification", lambda x: (x == "Testing").sum()),
    )

    # Spend-weighted Net ROAS across all ads for this angle
    def _weighted_net_roas(group):
        valid = group.dropna(subset=["net_roas", "spend"])
        valid = valid[valid["spend"] > 0]
        if valid.empty:
            return pd.NA
        return (valid["net_roas"] * valid["spend"]).sum() / valid["spend"].sum()

    weighted = df.groupby("script_id").apply(_weighted_net_roas, include_groups=False).reset_index()
    weighted.columns = ["script_id", "net_roas_weighted"]
    grouped = grouped.merge(weighted, on="script_id", how="left")

    # Saturation flag
    grouped["is_saturated"] = grouped["variation_count"] >= saturation_threshold

    # Sort by spend descending
    grouped = grouped.sort_values("total_spend", ascending=False).reset_index(drop=True)

    return grouped
