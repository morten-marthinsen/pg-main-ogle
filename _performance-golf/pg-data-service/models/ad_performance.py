"""Ad performance model — classifies ads based on adapter output.

This is thin by design. The adapter returns enriched DataFrames with all
metrics pre-computed (Beast Modes in Domo, dbt models in Snowflake).
The model layer only classifies and validates. This survives migration.
"""

import pandas as pd
import yaml
from pathlib import Path


def load_thresholds(config_path: Path = None) -> dict:
    if config_path is None:
        config_path = Path(__file__).parent.parent / "config.yaml"
    with open(config_path) as f:
        cfg = yaml.safe_load(f)
    return cfg.get("thresholds", {})


def classify(row: pd.Series, thresholds: dict) -> str:
    """Classify a single ad based on Net ROAS and spend.

    Net ROAS is a ratio where 1.0 = 100% = breakeven.
    Classification thresholds from Tess PRD v1.4.
    """
    spend = row.get("spend", 0)
    net_roas = row.get("net_roas")

    min_spend = thresholds.get("min_spend_for_classification", 2500)
    winner_roas = thresholds.get("winner_net_roas", 1.0)
    potential_min = thresholds.get("potential_net_roas_min", 0.80)

    if pd.isna(net_roas) or spend < min_spend:
        return "Testing"
    if net_roas >= winner_roas:
        return "Winner"
    if net_roas >= potential_min:
        return "Potential"
    return "Underperformer"


def build_ad_performance(adapter, date_from: str, date_to: str) -> pd.DataFrame:
    """Fetch enriched ad data from adapter, apply classification.

    Returns a DataFrame with one row per ad, all metrics + classification.
    """
    thresholds = load_thresholds()

    df = adapter.fetch_ad_performance(date_from, date_to)
    if df.empty:
        return df

    df["classification"] = df.apply(lambda row: classify(row, thresholds), axis=1)

    return df
