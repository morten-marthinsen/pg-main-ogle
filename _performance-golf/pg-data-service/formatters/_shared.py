"""Shared formatter utilities — PII stripping, common helpers."""

import yaml
import pandas as pd
from pathlib import Path


def load_pii_columns(manifest_path: Path = None) -> list[str]:
    """Load PII column list from catalog manifest."""
    if manifest_path is None:
        manifest_path = Path(__file__).parent.parent / "catalog" / "pii_manifest.yaml"
    with open(manifest_path) as f:
        manifest = yaml.safe_load(f)
    return manifest.get("columns", [])


def strip_pii(df: pd.DataFrame, pii_columns: list[str] = None) -> pd.DataFrame:
    """Drop PII columns from DataFrame. First operation in every formatter."""
    if pii_columns is None:
        pii_columns = load_pii_columns()
    cols_to_drop = [c for c in pii_columns if c in df.columns]
    return df.drop(columns=cols_to_drop)
