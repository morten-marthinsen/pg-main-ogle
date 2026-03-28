"""M15 — Data Fetch Module.

Pulls yesterday's ad performance data from pg-data-service (Domo API)
and saves it as a daily CSV in pg-data-service/dataruns/YYYY-MM/.

Reports a simple Fetch Status (green check or red X) in the daily briefing.
"""
from __future__ import annotations

import sys
from datetime import datetime, timedelta
from pathlib import Path

from .base import BriefingModule


def _find_repo_root() -> Path:
    """Walk up from this file to find the git repo root."""
    p = Path(__file__).resolve()
    while p != p.parent:
        if (p / ".git").exists():
            return p
        p = p.parent
    raise RuntimeError("Could not find repo root (.git not found)")


class DataFetchModule(BriefingModule):
    name = "Fetch Status"
    key = "m15_data_fetch"
    setup_required = "pg-data-service .env with DOMO_CLIENT_ID and DOMO_CLIENT_SECRET"

    def fetch_data(self) -> dict:
        """Pull yesterday's ad performance data and save as CSV."""
        repo_root = _find_repo_root()
        data_service_path = repo_root / "_performance-golf" / "pg-data-service"
        dataruns_path = data_service_path / "dataruns"

        # Determine yesterday's date
        yesterday = datetime.now() - timedelta(days=1)
        date_str = yesterday.strftime("%Y-%m-%d")
        month_str = yesterday.strftime("%Y-%m")

        # Check for existing file (dedup)
        month_dir = dataruns_path / month_str
        csv_path = month_dir / f"{date_str}.csv"

        if csv_path.exists():
            # Already fetched — read row count for status
            import pandas as pd
            df = pd.read_csv(csv_path)
            return {
                "status": "skipped",
                "date": date_str,
                "rows": len(df),
                "ads": df["Ad"].nunique() if "Ad" in df.columns else len(df),
                "path": str(csv_path),
            }

        # Load data service .env and import API
        from dotenv import load_dotenv
        load_dotenv(data_service_path / ".env")

        if str(data_service_path) not in sys.path:
            sys.path.insert(0, str(data_service_path))

        from api import get_card

        # Pull data
        self.logger.info(f"[{self.key}] Fetching ad performance for {date_str}...")
        df = get_card("ad_performance_daily", date_str, date_str)

        if df.empty:
            return {
                "status": "empty",
                "date": date_str,
                "rows": 0,
                "ads": 0,
                "path": None,
            }

        # Ensure month directory exists
        month_dir.mkdir(parents=True, exist_ok=True)

        # Save CSV
        df.to_csv(csv_path, index=False)
        self.logger.info(
            f"[{self.key}] Saved {len(df)} rows ({df['Ad'].nunique()} ads) "
            f"to {csv_path}"
        )

        return {
            "status": "success",
            "date": date_str,
            "rows": len(df),
            "ads": df["Ad"].nunique(),
            "path": str(csv_path),
        }

    def analyze(self, data: dict) -> str:
        """Return a simple status line for the report."""
        status = data.get("status", "error")
        date = data.get("date", "unknown")
        rows = data.get("rows", 0)
        ads = data.get("ads", 0)

        if status == "success":
            return (
                f"- **Data Run Status**: ✅ {ads} ads fetched for {date} "
                f"({rows} rows) → `dataruns/{date[:7]}/{date}.csv`"
            )
        elif status == "skipped":
            return (
                f"- **Data Run Status**: ✅ Already fetched for {date} "
                f"({ads} ads, {rows} rows) — skipped"
            )
        elif status == "empty":
            return (
                f"- **Data Run Status**: ⚠️ No data returned for {date} "
                f"— Domo may not have refreshed yet"
            )
        else:
            return f"- **Data Run Status**: ❌ Error: {data.get('error', 'Unknown error')}"
