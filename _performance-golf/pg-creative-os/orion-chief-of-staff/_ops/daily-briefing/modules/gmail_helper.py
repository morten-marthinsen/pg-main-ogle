"""Shared Gmail helper for daily briefing modules.

Handles authentication and email fetching so individual modules
don't duplicate Gmail connection logic.
"""

import base64
import re
from datetime import datetime, timedelta
from pathlib import Path

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]
SCRIPT_DIR = Path(__file__).resolve().parent.parent  # daily-briefing/


def get_gmail_service(env: dict):
    """Build and return an authenticated Gmail API service."""
    creds_path = env.get("GMAIL_CREDENTIALS_PATH", "")
    token_path = env.get("GMAIL_TOKEN_PATH", "")

    if not creds_path or not token_path:
        raise RuntimeError("GMAIL_CREDENTIALS_PATH or GMAIL_TOKEN_PATH missing from .env")

    # Resolve relative paths from daily-briefing dir
    creds_path = SCRIPT_DIR / creds_path
    token_path = SCRIPT_DIR / token_path

    if not token_path.exists():
        raise RuntimeError(f"Gmail token not found at {token_path}. Run: python3 auth/gmail_auth.py")

    creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)

    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
        with open(token_path, "w") as f:
            f.write(creds.to_json())

    return build("gmail", "v1", credentials=creds)


def search_emails(service, query: str, max_results: int = 20):
    """Search Gmail and return a list of message dicts with id and threadId."""
    result = service.users().messages().list(
        userId="me", q=query, maxResults=max_results
    ).execute()
    return result.get("messages", [])


def get_email_content(service, msg_id: str) -> dict:
    """Fetch a single email and return parsed dict with subject, from, date, body, urls."""
    msg = service.users().messages().get(
        userId="me", id=msg_id, format="full"
    ).execute()

    headers = {h["name"].lower(): h["value"] for h in msg.get("payload", {}).get("headers", [])}

    body_text = _extract_body(msg.get("payload", {}))
    urls = _extract_urls_from_html(msg.get("payload", {}))

    return {
        "id": msg_id,
        "subject": headers.get("subject", "(no subject)"),
        "from": headers.get("from", ""),
        "date": headers.get("date", ""),
        "snippet": msg.get("snippet", ""),
        "body": body_text[:5000],  # cap body length for context budget
        "urls": urls,
    }


def fetch_emails_with_content(service, query: str, max_results: int = 10, logger=None):
    """Search + fetch content for matching emails. Returns list of email dicts."""
    messages = search_emails(service, query, max_results)
    if logger:
        logger.info(f"[gmail] Query '{query[:50]}' returned {len(messages)} messages")

    emails = []
    for m in messages:
        try:
            email = get_email_content(service, m["id"])
            emails.append(email)
        except Exception as e:
            if logger:
                logger.warning(f"[gmail] Failed to fetch message {m['id']}: {e}")
    return emails


def _extract_urls_from_html(payload: dict):
    """Extract href URLs from <a> tags in HTML email body.

    Google Alert emails embed article links as <a href="..."> in HTML.
    This extracts those URLs before tag-stripping so modules can
    reference original article sources.  Filters out Google tracking
    URLs, unsubscribe links, and mailto: links.
    """
    html = _find_html(payload)
    if not html:
        return []

    raw_urls = re.findall(r'href=["\']([^"\']+)["\']', html, re.IGNORECASE)

    filtered = []
    skip_patterns = (
        "google.com/alerts",
        "accounts.google.com",
        "support.google.com",
        "mailto:",
        "unsubscribe",
        "#",
    )
    for url in raw_urls:
        if any(pat in url.lower() for pat in skip_patterns):
            continue
        # Google Alerts wrap real URLs in a redirect; extract the actual URL
        if "google.com/url?" in url:
            match = re.search(r'[?&]url=([^&]+)', url)
            if match:
                from urllib.parse import unquote
                url = unquote(match.group(1))
        if url.startswith(("http://", "https://")) and url not in filtered:
            filtered.append(url)

    return filtered


def _find_html(payload: dict) -> str:
    """Find and decode the HTML body from a Gmail payload."""
    if payload.get("mimeType") == "text/html" and payload.get("body", {}).get("data"):
        return base64.urlsafe_b64decode(payload["body"]["data"]).decode("utf-8", errors="replace")

    for part in payload.get("parts", []):
        html = _find_html(part)
        if html:
            return html

    return ""


def _extract_body(payload: dict) -> str:
    """Recursively extract plain text body from Gmail payload."""
    if payload.get("mimeType") == "text/plain" and payload.get("body", {}).get("data"):
        return base64.urlsafe_b64decode(payload["body"]["data"]).decode("utf-8", errors="replace")

    # Check parts recursively
    for part in payload.get("parts", []):
        text = _extract_body(part)
        if text:
            return text

    # Fallback: try HTML and strip tags
    if payload.get("mimeType") == "text/html" and payload.get("body", {}).get("data"):
        html = base64.urlsafe_b64decode(payload["body"]["data"]).decode("utf-8", errors="replace")
        return re.sub(r"<[^>]+>", " ", html).strip()

    for part in payload.get("parts", []):
        if part.get("mimeType") == "text/html" and part.get("body", {}).get("data"):
            html = base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8", errors="replace")
            return re.sub(r"<[^>]+>", " ", html).strip()

    return ""
