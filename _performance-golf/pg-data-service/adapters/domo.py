"""Domo adapter — dumb pipe that fetches raw rows.

All business logic (aggregation, Beast Modes) lives in enrichments/.
This adapter only knows how to talk to Domo and return DataFrames.

Canonical DomoClient source: see DOMO_CLIENT_PATH env var
"""

import hashlib
import os
import re
import sys

import pandas as pd
from dotenv import load_dotenv

from .base import DataAdapter

load_dotenv()

# Import DomoClient from external path
_domo_path = os.getenv("DOMO_CLIENT_PATH")
if not _domo_path:
    raise EnvironmentError(
        "DOMO_CLIENT_PATH environment variable is required. "
        "Set it to the directory containing domo_client.py "
        "(e.g., export DOMO_CLIENT_PATH=/path/to/domo)"
    )
sys.path.insert(0, _domo_path)
from domo_client import DomoClient  # noqa: E402

# Column names this adapter references (kept local to avoid coupling to enrichments/)
COL_AD = "Ad"
COL_EMAIL = "emailAddress"


def _clean_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Strip <BR> / newline artifacts from Domo column names."""
    df.columns = [c.replace("<BR>", " ").replace("\n", " ").strip() for c in df.columns]
    return df


def _validate_date(value: str) -> None:
    """Validate date string is YYYY-MM-DD format. Prevents SQL injection."""
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        raise ValueError(f"Invalid date format: {value!r}. Expected YYYY-MM-DD.")


def _build_date_query(date_from: str, date_to: str, limit: int | None = None) -> str:
    """Build a validated date-range SQL query."""
    _validate_date(date_from)
    _validate_date(date_to)
    sql = (
        f'SELECT * FROM table '
        f'WHERE `dateCreated` >= \'{date_from}\' '
        f'AND `dateCreated` <= \'{date_to}\''
    )
    if limit is not None:
        sql += f' LIMIT {limit}'
    return sql


class DomoAdapter(DataAdapter):

    def __init__(self, dataset_id: str):
        self._client = DomoClient()
        self._dataset_id = dataset_id

    def _query(self, sql: str) -> pd.DataFrame:
        df = self._client.query_dataset(self._dataset_id, sql)
        return _clean_columns(df)

    def fetch_all(self, date_from: str, date_to: str) -> pd.DataFrame:
        """Fetch all rows in date range. Single API call.

        Normalizes ad names to lowercase/stripped. No filtering, no aggregation.
        """
        df = self._query(_build_date_query(date_from, date_to))
        if df.empty:
            return df
        if COL_AD in df.columns:
            df[COL_AD] = df[COL_AD].astype(str).str.lower().str.strip()
        return df

    def fetch_raw(self, date_from: str, date_to: str, limit: int = 100000) -> pd.DataFrame:
        """Return raw rows with all columns. Adds email_address_hash for cohort tracking."""
        df = self._query(_build_date_query(date_from, date_to, limit=limit))
        if not df.empty and COL_EMAIL in df.columns:
            df["email_address_hash"] = df[COL_EMAIL].apply(
                lambda x: hashlib.sha256(str(x).lower().strip().encode()).hexdigest()[:16]
                if pd.notna(x) and str(x).strip() else None
            )
        return df
