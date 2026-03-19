"""PG Data Service — Public API for programmatic access.

Usage:
    from api import get_card, get_raw, list_cards, list_datasets

    # See available cards and datasets
    list_cards()
    list_datasets()

    # Enriched data via card (Beast Modes computed, PII stripped)
    df = get_card("ad_performance_daily", "2026-03-08", "2026-03-14")
    df = get_card("ad_performance_summary", "2026-03-08", "2026-03-14")

    # Raw data (PII stripped, all columns otherwise)
    df = get_raw("ad_performance", "2026-01-01", "2026-03-15")

All functions strip PII before returning. No escape hatch.
"""

import warnings
from datetime import datetime, timedelta

import yaml
from pathlib import Path

import pandas as pd

from enrichments import REGISTRY as ENRICHMENT_REGISTRY
from utils.pii import strip_pii

ROOT = Path(__file__).parent

_datasets_cache: dict | None = None
_cards_cache: dict | None = None

# Adapter selection — change to "snowflake" when Snowflake replaces Domo (Q3/Q4 2026)
ADAPTER = "domo"


def _load_datasets() -> dict:
    """Load the approved datasets registry. Cached after first read."""
    global _datasets_cache
    if _datasets_cache is None:
        with open(ROOT / "datasets.yaml") as f:
            _datasets_cache = yaml.safe_load(f).get("datasets", {})
    return _datasets_cache


def _load_cards() -> dict:
    """Load the card registry. Cached after first read."""
    global _cards_cache
    if _cards_cache is None:
        with open(ROOT / "cards.yaml") as f:
            _cards_cache = yaml.safe_load(f).get("cards", {})
    return _cards_cache


def _get_adapter(dataset_id: str):
    """Create adapter for the given dataset ID."""
    if ADAPTER == "domo":
        from adapters.domo import DomoAdapter
        return DomoAdapter(dataset_id)
    elif ADAPTER == "snowflake":
        raise NotImplementedError("Snowflake adapter not yet implemented.")
    else:
        raise ValueError(f"Unknown adapter: {ADAPTER}")


def list_datasets() -> dict[str, str]:
    """Return {name: description} for all approved datasets."""
    return {name: info["description"] for name, info in _load_datasets().items()}


def list_cards() -> dict[str, str]:
    """Return {name: description} for all available cards."""
    return {name: info["description"] for name, info in _load_cards().items()}


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


def get_card(
    card_name: str,
    date_from: str,
    date_to: str,
) -> pd.DataFrame:
    """Fetch an enriched card view. PII is always stripped.

    Args:
        card_name: Card name from cards.yaml (e.g., "ad_performance_daily")
        date_from: Start date (YYYY-MM-DD)
        date_to: End date (YYYY-MM-DD)

    Returns:
        DataFrame with computed metrics, PII removed.
        - daily output: one row per ad per day, Domo display name columns
        - summary output: one row per ad, snake_case columns

    Raises:
        KeyError: If card_name is not in cards.yaml or dataset not found.
    """
    cards = _load_cards()
    if card_name not in cards:
        available = ", ".join(sorted(cards.keys()))
        raise KeyError(
            f"Card {card_name!r} not found. Available: {available}"
        )

    card = cards[card_name]
    dataset_name = card["dataset"]
    enrichment_name = card["enrichment"]
    output_mode = card["output"]

    # Look up dataset
    datasets = _load_datasets()
    if dataset_name not in datasets:
        raise KeyError(
            f"Card {card_name!r} references dataset {dataset_name!r} "
            f"which is not in datasets.yaml."
        )
    dataset_id = datasets[dataset_name]["dataset_id"]

    # Look up enrichment functions
    if enrichment_name not in ENRICHMENT_REGISTRY:
        raise KeyError(
            f"Card {card_name!r} references enrichment {enrichment_name!r} "
            f"which is not in the enrichment registry."
        )
    enrichment = ENRICHMENT_REGISTRY[enrichment_name]
    enrich_fn = enrichment["enrich"]
    format_fn = enrichment["format_columns"]

    adapter = _get_adapter(dataset_id)

    if output_mode == "daily":
        # One adapter call per day, enrich independently, concat
        start = datetime.strptime(date_from, "%Y-%m-%d")
        end = datetime.strptime(date_to, "%Y-%m-%d")

        frames = []
        current = start
        while current <= end:
            day_str = current.strftime("%Y-%m-%d")
            raw_df = adapter.fetch_all(day_str, day_str)
            if not raw_df.empty:
                enriched = enrich_fn(raw_df)
                enriched["Day"] = day_str
                frames.append(enriched)
            current += timedelta(days=1)

        if not frames:
            return pd.DataFrame()

        combined = pd.concat(frames, ignore_index=True)

        # Strip PII on snake_case columns, then format display names
        combined = strip_pii(combined)
        combined = format_fn(combined)
        return combined

    elif output_mode == "summary":
        # Single call for full range, enrich once
        raw_df = adapter.fetch_all(date_from, date_to)
        if raw_df.empty:
            return pd.DataFrame()
        enriched = enrich_fn(raw_df)
        return strip_pii(enriched)

    else:
        raise ValueError(
            f"Card {card_name!r} has unknown output mode {output_mode!r}. "
            f"Expected 'daily' or 'summary'."
        )


def get_enriched(
    date_from: str,
    date_to: str,
) -> pd.DataFrame:
    """DEPRECATED: Use get_card("ad_performance_summary", ...) instead.

    Thin alias that calls get_card("ad_performance_summary", date_from, date_to).
    """
    warnings.warn(
        "get_enriched() is deprecated. Use get_card('ad_performance_summary', ...) instead.",
        DeprecationWarning,
        stacklevel=2,
    )
    return get_card("ad_performance_summary", date_from, date_to)
