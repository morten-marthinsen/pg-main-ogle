"""PII stripping utility — strips PII columns from DataFrames before any output."""

import yaml
import pandas as pd
from pathlib import Path


_pii_cache: list[str] | None = None


def load_pii_columns(manifest_path: Path = None) -> list[str]:
    """Load PII column list from catalog manifest. Cached after first read."""
    global _pii_cache
    use_default = manifest_path is None
    if use_default and _pii_cache is not None:
        return _pii_cache
    if use_default:
        manifest_path = Path(__file__).parent.parent / "catalog" / "pii_manifest.yaml"
    with open(manifest_path) as f:
        manifest = yaml.safe_load(f)
    columns = manifest.get("columns", [])
    if use_default:
        _pii_cache = columns
    return columns


def strip_pii(df: pd.DataFrame, pii_columns: list[str] = None) -> pd.DataFrame:
    """Drop PII columns from DataFrame. Called unconditionally on every API return path."""
    if pii_columns is None:
        pii_columns = load_pii_columns()
    cols_to_drop = [c for c in pii_columns if c in df.columns]
    return df.drop(columns=cols_to_drop)
