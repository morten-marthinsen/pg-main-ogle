"""PG Data Service — Public API for programmatic access.

Usage:
    from api import get_raw, get_enriched, list_datasets

    # See available datasets
    list_datasets()

    # Raw data (PII stripped, all columns otherwise)
    df = get_raw("ad_performance", "2026-01-01", "2026-03-15")

    # Enriched data (Beast Modes computed, PII stripped)
    df = get_enriched("2026-01-01", "2026-03-15")

All functions strip PII before returning. No escape hatch.
"""

import warnings
import yaml
from pathlib import Path

import pandas as pd

from utils.pii import strip_pii

ROOT = Path(__file__).parent

_datasets_cache: dict | None = None
_config_cache: dict | None = None


def _load_datasets() -> dict:
    """Load the approved datasets registry. Cached after first read."""
    global _datasets_cache
    if _datasets_cache is None:
        with open(ROOT / "datasets.yaml") as f:
            _datasets_cache = yaml.safe_load(f).get("datasets", {})
    return _datasets_cache


def _load_config() -> dict:
    """Load service config. Cached after first read."""
    global _config_cache
    if _config_cache is None:
        with open(ROOT / "config.yaml") as f:
            _config_cache = yaml.safe_load(f)
    return _config_cache


def _get_adapter(dataset_id: str):
    """Create adapter for the given dataset ID."""
    config = _load_config()
    adapter_type = config.get("adapter", "domo")

    if adapter_type == "domo":
        from adapters.domo import DomoAdapter
        return DomoAdapter(dataset_id)
    elif adapter_type == "snowflake":
        raise NotImplementedError("Snowflake adapter not yet implemented.")
    else:
        raise ValueError(f"Unknown adapter: {adapter_type}")


def list_datasets() -> dict[str, str]:
    """Return {name: description} for all approved datasets.

    >>> list_datasets()
    {'ad_performance': 'Facebook ad performance + CheckoutChamp orders (252 columns, joined by ad name)'}
    """
    return {name: info["description"] for name, info in _load_datasets().items()}


def get_raw(
    dataset_name: str,
    date_from: str,
    date_to: str,
    limit: int = 100000,
) -> pd.DataFrame:
    """Fetch raw data from an approved dataset. PII is always stripped.

    Args:
        dataset_name: Friendly name from datasets.yaml (e.g., "ad_performance")
        date_from: Start date (YYYY-MM-DD)
        date_to: End date (YYYY-MM-DD)
        limit: Max rows (default 100,000)

    Returns:
        DataFrame with PII columns removed.

    Raises:
        KeyError: If dataset_name is not in the approved registry.
    """
    datasets = _load_datasets()
    if dataset_name not in datasets:
        available = ", ".join(sorted(datasets.keys()))
        raise KeyError(
            f"Dataset {dataset_name!r} not found. Available: {available}"
        )

    dataset_id = datasets[dataset_name]["dataset_id"]
    adapter = _get_adapter(dataset_id)
    df = adapter.fetch_raw(date_from, date_to, limit=limit)
    df = strip_pii(df)

    if len(df) >= limit:
        warnings.warn(
            f"Row limit reached ({limit:,} rows). Results may be incomplete. "
            f"Pass a higher limit= or narrow your date range.",
            stacklevel=2,
        )

    return df


def get_enriched(
    date_from: str,
    date_to: str,
) -> pd.DataFrame:
    """Fetch enriched ad performance data (Beast Modes computed, PII stripped).

    Uses the primary ad_performance dataset. Returns one row per ad with
    all computed metrics (Net ROAS, CPA, NC Net ROAS, etc.).

    Classification (Winner/Potential/etc.) is not applied — that's a
    consumer-side business rule. The data dictionary documents the
    thresholds if a consumer wants to implement it.

    Args:
        date_from: Start date (YYYY-MM-DD)
        date_to: End date (YYYY-MM-DD)

    Returns:
        DataFrame with computed metrics, PII removed.
    """
    datasets = _load_datasets()
    if "ad_performance" not in datasets:
        raise KeyError(
            "ad_performance dataset not found in datasets.yaml. "
            "Enriched pipeline requires this dataset."
        )
    dataset_id = datasets["ad_performance"]["dataset_id"]
    adapter = _get_adapter(dataset_id)
    df = adapter.fetch_ad_performance(date_from, date_to)
    return strip_pii(df)
