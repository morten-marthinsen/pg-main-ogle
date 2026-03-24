"""Shared Google Sheets helper for daily briefing modules.

Handles authentication and data fetching. Mirrors gmail_helper.py pattern.
Read-only scope (spreadsheets.readonly).
"""

from pathlib import Path

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
SCRIPT_DIR = Path(__file__).resolve().parent.parent  # daily-briefing/


def get_sheets_service(env: dict):
    """Build and return an authenticated Google Sheets API v4 service."""
    creds_path = env.get("SHEETS_CREDENTIALS_PATH", "")
    token_path = env.get("SHEETS_TOKEN_PATH", "")

    if not creds_path or not token_path:
        raise RuntimeError("SHEETS_CREDENTIALS_PATH or SHEETS_TOKEN_PATH missing from .env")

    # Resolve relative paths from daily-briefing dir
    creds_path = SCRIPT_DIR / creds_path
    token_path = SCRIPT_DIR / token_path

    if not token_path.exists():
        raise RuntimeError(f"Sheets token not found at {token_path}. Run: python3 auth/sheets_auth.py")

    creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)

    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
        with open(token_path, "w") as f:
            f.write(creds.to_json())

    return build("sheets", "v4", credentials=creds)


def fetch_sheet_values(service, spreadsheet_id: str, tab_name: str, range_suffix: str = "") -> list:
    """Fetch all values from a sheet tab. Returns list of rows (each row is a list of strings).

    Args:
        service: Google Sheets API service.
        spreadsheet_id: The spreadsheet ID from the URL.
        tab_name: The name of the tab/sheet to read.
        range_suffix: Optional A1 range suffix (e.g., "!A1:C10").

    Returns:
        List of rows, where each row is a list of cell values.
    """
    range_str = f"'{tab_name}'{range_suffix}" if range_suffix else f"'{tab_name}'"
    result = service.spreadsheets().values().get(
        spreadsheetId=spreadsheet_id,
        range=range_str,
    ).execute()
    return result.get("values", [])


def extract_urls_from_rows(rows: list) -> dict:
    """Extract label→URL pairs from sheet rows.

    Expects rows where column 0 is a label and column 1 is a URL.
    Returns dict mapping lowercase-stripped label to URL string.
    """
    urls = {}
    for row in rows:
        if len(row) >= 2:
            label = row[0].strip()
            value = row[1].strip()
            if value.startswith(("http://", "https://")):
                urls[label.lower()] = value
            elif "http" in value:
                # Handle inline URLs like "Checkout: https://..."
                import re
                match = re.search(r'(https?://\S+)', value)
                if match:
                    urls[label.lower()] = match.group(1)
        elif len(row) == 1:
            # Single-cell rows may have "Label: URL" format
            import re
            match = re.search(r'(https?://\S+)', row[0])
            if match:
                label_part = row[0].split("http")[0].strip().rstrip(":").lower()
                if label_part:
                    urls[label_part] = match.group(0)
    return urls
