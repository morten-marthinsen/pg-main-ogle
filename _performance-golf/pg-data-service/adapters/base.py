"""Abstract adapter interface.

Adapters are dumb pipes — they fetch raw rows and return DataFrames.
All business logic (aggregation, Beast Modes) lives in enrichments/.
"""

from abc import ABC, abstractmethod
import pandas as pd


class DataAdapter(ABC):
    """Interface that all data source adapters implement.

    fetch_all: returns all rows in a date range. No filtering, no aggregation.
    fetch_raw: returns raw rows with email hash. For ad-hoc analysis.
    """

    @abstractmethod
    def fetch_all(self, date_from: str, date_to: str) -> pd.DataFrame:
        """Fetch all rows in date range. Single API call. No filtering, no aggregation.
        Must validate date inputs before query execution."""
        ...

    @abstractmethod
    def fetch_raw(self, date_from: str, date_to: str, limit: int = 100000) -> pd.DataFrame:
        """Return raw rows with all columns. Adds email_address_hash for cohort tracking.
        PII stripping happens in the API layer, not here."""
        ...
