"""Abstract adapter interface.

Every adapter returns enriched DataFrames with the same column names.
Domo adapter computes Beast Modes in pandas (Domo can't aggregate).
Snowflake adapter returns pre-computed columns from dbt models.
The model layer receives identical schemas either way.
"""

from abc import ABC, abstractmethod
import pandas as pd


class DataAdapter(ABC):
    """Interface that all data source adapters implement.

    Returns enriched DataFrames — the adapter is responsible for computing
    derived metrics (Beast Modes) appropriate to its source. The model layer
    only classifies and passes through.
    """

    @abstractmethod
    def fetch_ad_performance(self, date_from: str, date_to: str) -> pd.DataFrame:
        """Return one row per ad with all computed metrics.

        Expected output columns (at minimum):
            ad_name, spend, clicks, impressions,
            gross_revenue, net_revenue, gross_roas, net_roas,
            gross_profit, cpa, nc_cpa, net_aov, nlpt,
            nc_net_roas, nc_pct, cvr_pct, nc_cvr_pct, rc_cvr_pct,
            fixed_refund_net_revenue,
            total_customers, new_customers, total_orders, sc_trials,
            funnel, script_id, variation_id, platform,
            ad_category, expansion_type, asset_type,
            talent_code, editor_initials, copywriter_initials
        """
        ...

    @abstractmethod
    def fetch_raw(self, date_from: str, date_to: str, limit: int = 100000) -> pd.DataFrame:
        """Return raw rows with all columns. Adds email_address_hash for cohort tracking.

        For ad-hoc analysis or consumers that need the full dataset.
        PII stripping happens in the API layer, not here.
        """
        ...
