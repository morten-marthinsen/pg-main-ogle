"""Enrichment function registry.

Maps enrichment names (from cards.yaml) to enrich() and format_columns() functions.
get_card() looks up the name, grabs the functions, calls them.

Each enrichment module must export:
    enrich(raw_df) -> pd.DataFrame           # always snake_case columns
    format_card_columns(df) -> pd.DataFrame   # rename to display names (for daily output)
"""

from .ad_performance import enrich as ad_performance_enrich
from .ad_performance import format_card_columns as ad_performance_format

REGISTRY = {
    "ad_performance": {
        "enrich": ad_performance_enrich,
        "format_columns": ad_performance_format,
    },
}
