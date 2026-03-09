#!/usr/bin/env python3
"""
Fathom Transcript Fetcher
Pulls meeting transcripts from Fathom API and saves them locally
as markdown files following the MMDDYY-kebab-case-title.md convention.
"""

import os
import re
import json
import socket
import time
import requests
from datetime import datetime, timedelta, timezone
from pathlib import Path

# ── Network helpers ───────────────────────────────────────────────────────────

def dns_preflight(host="api.fathom.ai", timeout=5):
    """Verify DNS resolution before attempting API calls."""
    try:
        socket.setdefaulttimeout(timeout)
        socket.getaddrinfo(host, 443)
        return True
    except (socket.gaierror, socket.timeout, OSError) as e:
        print(f"DNS pre-flight FAILED for {host}: {e}")
        return False

def requests_with_retry(method, url, max_retries=3, backoff=10, **kwargs):
    """HTTP request with retry + exponential backoff."""
    kwargs.setdefault("timeout", 30)
    for attempt in range(max_retries):
        try:
            resp = getattr(requests, method)(url, **kwargs)
            resp.raise_for_status()
            return resp
        except (requests.ConnectionError, requests.Timeout) as e:
            if attempt < max_retries - 1:
                wait = backoff * (2 ** attempt)
                print(f"  Retry {attempt + 1}/{max_retries} after {wait}s: {e}")
                time.sleep(wait)
            else:
                raise

# ── Config ────────────────────────────────────────────────────────────────────

SCRIPT_DIR = Path(__file__).resolve().parent
ENV_PATH = SCRIPT_DIR / ".env"
STATE_PATH = SCRIPT_DIR / ".last-fathom-fetch.json"
TRANSCRIPTS_DIR = SCRIPT_DIR.parent / "transcripts"

BASE_URL = "https://api.fathom.ai/external/v1"

def load_env():
    """Load credentials from .env file."""
    env = {}
    with open(ENV_PATH) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                env[key.strip()] = val.strip()
    return env

env = load_env()
API_KEY = env["FATHOM_API_KEY"]
HEADERS = {
    "X-Api-Key": API_KEY,
    "Content-Type": "application/json",
}

# ── State tracking ────────────────────────────────────────────────────────────

def load_state():
    """Load set of already-downloaded meeting IDs."""
    if STATE_PATH.exists():
        with open(STATE_PATH) as f:
            return json.load(f)
    return {"downloaded_ids": []}

def save_state(state):
    """Persist downloaded meeting IDs."""
    with open(STATE_PATH, "w") as f:
        json.dump(state, f, indent=2)

# ── Filename formatting ──────────────────────────────────────────────────────

def to_kebab(text):
    """Convert text to kebab-case suitable for filenames."""
    # Remove emojis and special unicode
    text = re.sub(r'[^\w\s\-/]', '', text, flags=re.UNICODE)
    # Remove non-ASCII
    text = text.encode('ascii', 'ignore').decode('ascii')
    # Normalize whitespace and separators
    text = re.sub(r'[\s_/|]+', '-', text.strip())
    # Collapse multiple hyphens
    text = re.sub(r'-+', '-', text)
    # Lowercase and strip leading/trailing hyphens
    return text.lower().strip('-')

def make_filename(title, created_at):
    """
    Generate filename: MMDDYY-kebab-case-title.md
    Also returns the YYYY-MM subfolder name for monthly organization.
    Returns (subfolder, filename) tuple.
    """
    dt = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
    date_prefix = dt.strftime("%m%d%y")
    subfolder = dt.strftime("%Y-%m")

    kebab_title = to_kebab(title)
    if not kebab_title:
        kebab_title = "meeting"

    return subfolder, f"{date_prefix}-{kebab_title}.md"

# ── API calls ─────────────────────────────────────────────────────────────────

ATTENDEE_EMAIL = "christopher@performancegolfzone.com"

def is_my_meeting(meeting):
    """Check if Christopher is a participant in this meeting."""
    # Check if Christopher recorded it
    recorded_by = meeting.get("recorded_by", {})
    if recorded_by.get("email", "").lower() == ATTENDEE_EMAIL:
        return True
    # Check if Christopher is in the invitees
    for invitee in meeting.get("calendar_invitees", []):
        if invitee.get("email", "").lower() == ATTENDEE_EMAIL:
            return True
    return False

def list_meetings(created_after=None):
    """Fetch all meetings from Fathom, following pagination."""
    url = f"{BASE_URL}/meetings"
    all_meetings = []
    params = {}
    if created_after:
        params["created_after"] = created_after

    while True:
        resp = requests_with_retry("get", url, headers=HEADERS, params=params)
        data = resp.json()
        meetings = data.get("items", [])
        all_meetings.extend(meetings)

        cursor = data.get("next_cursor")
        if not cursor:
            break
        params["cursor"] = cursor
        # Rate limit: 60 req/min — small delay between pages
        time.sleep(1)

    return all_meetings

def get_transcript(recording_id):
    """Fetch transcript for a recording."""
    url = f"{BASE_URL}/recordings/{recording_id}/transcript"
    resp = requests_with_retry("get", url, headers=HEADERS)
    return resp.json()

def format_transcript(transcript_data):
    """Format Fathom transcript data into readable markdown."""
    lines = []
    utterances = transcript_data.get("transcript", [])

    if isinstance(utterances, str):
        return utterances

    if isinstance(utterances, list):
        for entry in utterances:
            if isinstance(entry, dict):
                speaker_obj = entry.get("speaker", {})
                if isinstance(speaker_obj, dict):
                    speaker = speaker_obj.get("display_name", "Unknown")
                else:
                    speaker = str(speaker_obj)
                text = entry.get("text", "")
                timestamp = entry.get("timestamp", "")
                ts_prefix = f"[{timestamp}] " if timestamp else ""
                lines.append(f"{ts_prefix}**{speaker}:** {text}")
            elif isinstance(entry, str):
                lines.append(entry)

    return "\n\n".join(lines) if lines else str(transcript_data)

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    import argparse
    parser = argparse.ArgumentParser(description="Fetch Fathom meeting transcripts")
    parser.add_argument("--backfill", action="store_true",
                        help="Download ALL transcripts, ignoring previous state")
    parser.add_argument("--dry-run", action="store_true",
                        help="Show what would be downloaded without actually downloading")
    parser.add_argument("--since", type=str, default=None,
                        help="Only fetch meetings created after this date (YYYY-MM-DD) or relative like '7d' for 7 days ago")
    args = parser.parse_args()

    # ── DNS pre-flight ─────────────────────────────────────────────────────
    if not args.dry_run:
        if not dns_preflight():
            print("Network unavailable — skipping this run.")
            return

    state = load_state()
    downloaded = set(state["downloaded_ids"])

    if args.backfill:
        downloaded = set()
        print("BACKFILL MODE: downloading all transcripts")

    # Parse --since into ISO date for API filter
    created_after = None
    if args.since:
        if args.since.endswith("d"):
            days = int(args.since[:-1])
            created_after = (datetime.now(timezone.utc) - timedelta(days=days)).strftime("%Y-%m-%dT%H:%M:%SZ")
        else:
            created_after = f"{args.since}T00:00:00Z"
        print(f"Filtering to meetings created after: {created_after}")

    print(f"Fetching meetings from Fathom API...")
    meetings = list_meetings(created_after=created_after)
    print(f"Found {len(meetings)} meeting(s)")

    new_count = 0
    skip_count = 0
    skip_not_mine = 0
    error_count = 0

    for meeting in meetings:
        recording_id = str(meeting.get("recording_id", ""))
        title = meeting.get("meeting_title", meeting.get("title", "Untitled Meeting"))
        created_at = meeting.get("created_at", "")

        if recording_id in downloaded:
            skip_count += 1
            continue

        # Filter to only Christopher's meetings
        if not is_my_meeting(meeting):
            if args.dry_run:
                print(f"  [SKIP] Not my meeting: {title}")
            downloaded.add(recording_id)
            skip_not_mine += 1
            continue

        subfolder, filename = make_filename(title, created_at)
        month_dir = TRANSCRIPTS_DIR / subfolder
        filepath = month_dir / filename

        # Avoid overwriting existing files
        if filepath.exists() and not args.backfill:
            stem = filepath.stem
            filepath = month_dir / f"{stem}-fathom-{recording_id[-8:]}.md"

        if args.dry_run:
            print(f"  [DRY RUN] Would download: {subfolder}/{filename}")
            print(f"             Meeting: {title}")
            print(f"             Date: {created_at}")
            new_count += 1
            continue

        # Create month subdirectory if needed
        month_dir.mkdir(parents=True, exist_ok=True)

        print(f"  Downloading: {title}")
        print(f"    -> {subfolder}/{filename}")

        try:
            transcript_data = get_transcript(recording_id)
            transcript_text = format_transcript(transcript_data)

            # Parse date for header
            dt = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
            date_str = dt.strftime("%B %d, %Y")

            # Build attendees line from calendar_invitees
            attendees = meeting.get("calendar_invitees", [])
            attendee_names = []
            for a in attendees:
                name = a.get("name", a.get("email", ""))
                if name:
                    attendee_names.append(name)
            attendee_line = f"**Attendees:** {', '.join(attendee_names)}\n" if attendee_names else ""

            header = (
                f"# {title}\n\n"
                f"**Date:** {date_str}\n"
                f"**Source:** Fathom\n"
                f"{attendee_line}\n"
                f"---\n\n"
            )
            full_content = header + transcript_text

            filepath.write_text(full_content, encoding="utf-8")
            downloaded.add(recording_id)
            new_count += 1
            print(f"    Saved ({len(transcript_text):,} chars)")

            # Rate limit courtesy: small delay between transcript fetches
            time.sleep(1)

        except Exception as e:
            print(f"    ERROR: {e}")
            error_count += 1

    # Save state
    if not args.dry_run:
        state["downloaded_ids"] = list(downloaded)
        state["last_run"] = datetime.now().isoformat()
        save_state(state)

    print()
    print(f"Done. {new_count} new, {skip_count} skipped (already downloaded), {skip_not_mine} skipped (not my meeting), {error_count} errors")

if __name__ == "__main__":
    main()
