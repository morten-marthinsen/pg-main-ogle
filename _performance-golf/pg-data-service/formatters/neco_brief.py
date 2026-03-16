"""Neco brief formatter — markdown performance brief per funnel.

Maps to Neco Context Gatherer's `existing_creative_summary` and
`competitive_landscape` fields (NECO-SUB-AGENTS.md lines 150-189).

PII is stripped before any output is written.
"""

import pandas as pd
from datetime import datetime
from pathlib import Path

from ._shared import strip_pii


def format_neco_brief(
    ad_perf_df: pd.DataFrame,
    angle_df: pd.DataFrame,
    output_dir: Path,
    date_from: str,
    date_to: str,
) -> dict[str, Path]:
    """Generate a markdown brief per funnel. Returns {funnel: output_path}."""
    df = strip_pii(ad_perf_df)
    written = {}

    funnels = df["funnel"].dropna().unique()
    for funnel in sorted(funnels):
        funnel_df = df[df["funnel"] == funnel]
        funnel_angles = angle_df[angle_df["funnel"] == funnel] if not angle_df.empty else pd.DataFrame()
        content = _render_brief(funnel, funnel_df, funnel_angles, date_from, date_to)

        out_path = output_dir / "neco" / f"{funnel}_brief.md"
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(content)
        written[funnel] = out_path

    return written


def _render_brief(
    funnel: str,
    df: pd.DataFrame,
    angle_df: pd.DataFrame,
    date_from: str,
    date_to: str,
) -> str:
    """Render markdown brief for a single funnel."""
    lines = []
    lines.append(f"# Performance Brief — {funnel.upper()}")
    lines.append(f"**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append(f"**Date Range**: {date_from} to {date_to}")
    lines.append("")

    # --- Portfolio Summary ---
    total_ads = len(df)
    total_spend = df["spend"].sum()
    total_revenue = df["gross_revenue"].sum()
    overall_roas = total_revenue / total_spend if total_spend > 0 else 0
    net_rev = df["net_revenue"].sum()
    overall_net_roas = (net_rev / total_spend) + 1 if total_spend > 0 else 0

    winners = df[df["classification"] == "Winner"]
    potentials = df[df["classification"] == "Potential"]
    underperformers = df[df["classification"] == "Underperformer"]
    testing = df[df["classification"] == "Testing"]

    lines.append("## Portfolio Summary")
    lines.append("")
    lines.append(f"| Metric | Value |")
    lines.append(f"|--------|-------|")
    lines.append(f"| Total Ads | {total_ads} |")
    lines.append(f"| Total Spend | ${total_spend:,.2f} |")
    lines.append(f"| Gross Revenue | ${total_revenue:,.2f} |")
    lines.append(f"| Gross ROAS | {overall_roas:.2f}x |")
    lines.append(f"| Net Revenue | ${net_rev:,.2f} |")
    lines.append(f"| Net ROAS | {overall_net_roas:.0%} |")
    lines.append(f"| Winners | {len(winners)} ({len(winners)/total_ads:.0%}) |")
    lines.append(f"| Potentials | {len(potentials)} |")
    lines.append(f"| Underperformers | {len(underperformers)} |")
    lines.append(f"| Testing | {len(testing)} |")
    lines.append("")

    # --- Top Performers ---
    if not winners.empty:
        lines.append("## Top Performers (Winners)")
        lines.append("")
        top = winners.sort_values("gross_revenue", ascending=False)
        lines.append("| Ad | Expansion | Talent | Spend | Revenue | Net ROAS | Gross ROAS |")
        lines.append("|-----|-----------|--------|-------|---------|----------|------------|")
        for _, row in top.iterrows():
            name = row.get("ad_name", "")
            exp = row.get("expansion_type_name", row.get("expansion_type", ""))
            talent = row.get("talent_name", row.get("talent_code", ""))
            nr = row.get("net_roas", 0)
            gr = row.get("gross_roas", 0)
            lines.append(
                f"| {name} | {exp} | {talent} "
                f"| ${row['spend']:,.0f} | ${row['gross_revenue']:,.0f} "
                f"| {nr:.0%} | {gr:.2f}x |"
            )
        lines.append("")

    # --- Potentials ---
    if not potentials.empty:
        lines.append("## Potentials (Near Winner Threshold)")
        lines.append("")
        top_p = potentials.sort_values("gross_revenue", ascending=False).head(10)
        lines.append("| Ad | Spend | Revenue | Net ROAS |")
        lines.append("|-----|-------|---------|----------|")
        for _, row in top_p.iterrows():
            nr = row.get("net_roas", 0)
            lines.append(f"| {row['ad_name']} | ${row['spend']:,.0f} | ${row['gross_revenue']:,.0f} | {nr:.0%} |")
        lines.append("")

    # --- Winning Angles ---
    if not angle_df.empty:
        winning_angles = angle_df[angle_df["winner_count"] > 0].sort_values("total_spend", ascending=False)
        if not winning_angles.empty:
            lines.append("## Winning Angles (Root Angles Producing Winners)")
            lines.append("")
            lines.append("| Script ID | Variations | Spend | Revenue | Net ROAS | Winners |")
            lines.append("|-----------|-----------|-------|---------|----------|---------|")
            for _, row in winning_angles.iterrows():
                nr = row.get("net_roas_weighted", 0)
                nr_str = f"{nr:.0%}" if pd.notna(nr) else "N/A"
                lines.append(
                    f"| {row['script_id']} | {row['variation_count']} "
                    f"| ${row['total_spend']:,.0f} | ${row['total_revenue']:,.0f} "
                    f"| {nr_str} | {row['winner_count']} |"
                )
            lines.append("")

        # --- Saturated Angles ---
        saturated = angle_df[angle_df["is_saturated"]]
        if not saturated.empty:
            lines.append("## Saturated Angles (3+ Variations)")
            lines.append("")
            lines.append("| Script ID | Variations | Net ROAS | Winners | Status |")
            lines.append("|-----------|-----------|----------|---------|--------|")
            for _, row in saturated.iterrows():
                nr = row.get("net_roas_weighted", 0)
                nr_str = f"{nr:.0%}" if pd.notna(nr) else "N/A"
                status = "Strong" if row["winner_count"] > 0 else "Explore new angles"
                lines.append(
                    f"| {row['script_id']} | {row['variation_count']} "
                    f"| {nr_str} | {row['winner_count']} | {status} |"
                )
            lines.append("")

        # --- Angles to Avoid ---
        avoid = angle_df[
            (angle_df["is_saturated"]) &
            (angle_df["winner_count"] == 0) &
            (angle_df["net_roas_weighted"].fillna(0) < 0.80)
        ]
        if not avoid.empty:
            lines.append("## Angles to Avoid (Saturated + Underperforming)")
            lines.append("")
            for _, row in avoid.iterrows():
                nr = row.get("net_roas_weighted", 0)
                nr_str = f"{nr:.0%}" if pd.notna(nr) else "N/A"
                lines.append(f"- **{row['script_id']}**: {row['variation_count']} variations, {nr_str} Net ROAS, 0 winners")
            lines.append("")

    # --- Expansion Type Effectiveness ---
    if "expansion_type_name" in df.columns:
        exp_groups = df.groupby("expansion_type_name", as_index=False).agg(
            ad_count=("ad_name", "count"),
            total_spend=("spend", "sum"),
            total_revenue=("gross_revenue", "sum"),
            winner_count=("classification", lambda x: (x == "Winner").sum()),
        )
        exp_groups["roas"] = exp_groups["total_revenue"] / exp_groups["total_spend"].replace(0, pd.NA)
        exp_groups["win_rate"] = exp_groups["winner_count"] / exp_groups["ad_count"]
        exp_groups = exp_groups.sort_values("total_spend", ascending=False)

        lines.append("## Expansion Type Effectiveness")
        lines.append("")
        lines.append("| Type | Ads | Spend | Revenue | ROAS | Win Rate |")
        lines.append("|------|-----|-------|---------|------|----------|")
        for _, row in exp_groups.iterrows():
            lines.append(
                f"| {row['expansion_type_name']} | {row['ad_count']} "
                f"| ${row['total_spend']:,.0f} | ${row['total_revenue']:,.0f} "
                f"| {row['roas']:.2f}x | {row['win_rate']:.0%} |"
            )
        lines.append("")

    return "\n".join(lines)
