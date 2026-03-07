#!/usr/bin/env python3
"""
ClickUp Notetaker Transcript Fetcher
Pulls meeting transcripts from ClickUp AI Notetaker and saves them locally
as markdown files following the MMDDYY-kebab-case-title.md convention.
"""

import os
import re
import json
import socket
import time
import requests
from datetime import datetime
from pathlib import Path

# ── Network helpers ───────────────────────────────────────────────────────────

def dns_preflight(host="api.clickup.com", timeout=5):
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
STATE_PATH = SCRIPT_DIR / ".last-fetch.json"
TRANSCRIPTS_DIR = SCRIPT_DIR.parent / "transcripts"

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
API_TOKEN = env["CLICKUP_API_TOKEN"]
WORKSPACE_ID = env["CLICKUP_WORKSPACE_ID"]
BASE_URL = "https://api.clickup.com/api/v3"
HEADERS = {
    "Authorization": API_TOKEN,
    "Content-Type": "application/json",
}

# ── State tracking ────────────────────────────────────────────────────────────

def load_state():
    """Load set of already-downloaded doc IDs."""
    if STATE_PATH.exists():
        with open(STATE_PATH) as f:
            return json.load(f)
    return {"downloaded_ids": []}

def save_state(state):
    """Persist downloaded doc IDs."""
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

def parse_doc_date(doc_name, date_created_ms):
    """
    Extract a datetime from the doc. Tries the doc name first
    (format: "Title - MM/DD/YYYY"), falls back to date_created timestamp.
    Returns (datetime, title_part) tuple.
    """
    date_match = re.search(r'(\d{1,2})/(\d{1,2})/(\d{4})\s*$', doc_name)
    if date_match:
        month, day, year = date_match.groups()
        dt = datetime(int(year), int(month), int(day))
        title_part = doc_name[:date_match.start()].rstrip(' -')
    else:
        dt = datetime.fromtimestamp(date_created_ms / 1000)
        title_part = doc_name
    return dt, title_part


def make_filename(doc_name, date_created_ms):
    """
    Generate filename: MMDDYY-kebab-case-title.md
    Also returns the YYYY-MM subfolder name for monthly organization.
    Returns (subfolder, filename) tuple.
    """
    dt, title_part = parse_doc_date(doc_name, date_created_ms)
    date_prefix = dt.strftime("%m%d%y")
    subfolder = dt.strftime("%Y-%m")

    kebab_title = to_kebab(title_part)
    if not kebab_title:
        kebab_title = "meeting"

    return subfolder, f"{date_prefix}-{kebab_title}.md"

# ── API calls ─────────────────────────────────────────────────────────────────

ATTENDEE_NAME = "Christopher Ogle"

def list_notetaker_docs():
    """Fetch all type-3 (notetaker) docs from the workspace, following pagination."""
    url = f"{BASE_URL}/workspaces/{WORKSPACE_ID}/docs"
    all_docs = []
    params = {"type": 3}
    while True:
        resp = requests_with_retry("get", url, headers=HEADERS, params=params)
        data = resp.json()
        docs = data.get("docs", [])
        all_docs.extend([d for d in docs if d.get("type") == 3])
        cursor = data.get("next_cursor")
        if not cursor:
            break
        params["next_cursor"] = cursor
    return all_docs

def is_my_meeting(doc_id):
    """Check if Christopher is listed as an attendee in the doc."""
    try:
        url = f"{BASE_URL}/workspaces/{WORKSPACE_ID}/docs/{doc_id}/pages"
        resp = requests_with_retry("get", url, headers=HEADERS)
        pages = resp.json()
        if pages:
            content = pages[0].get("content", "")
            header = content[:500]
            if "**Attendees:**" in header:
                attendee_line = header.split("**Attendees:**")[1].split("\n")[0]
                return ATTENDEE_NAME.lower() in attendee_line.lower()
        return False
    except Exception:
        return False

def get_doc_content(doc_id):
    """Fetch all pages of a doc and return combined content."""
    url = f"{BASE_URL}/workspaces/{WORKSPACE_ID}/docs/{doc_id}/pages"
    resp = requests_with_retry("get", url, headers=HEADERS)
    pages = resp.json()
    # Combine all pages into one markdown string
    parts = []
    for page in pages:
        content = page.get("content", "")
        if content:
            parts.append(content)
    return "\n\n---\n\n".join(parts)

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    import argparse
    parser = argparse.ArgumentParser(description="Fetch ClickUp notetaker transcripts")
    parser.add_argument("--backfill", action="store_true",
                        help="Download ALL transcripts, ignoring previous state")
    parser.add_argument("--dry-run", action="store_true",
                        help="Show what would be downloaded without actually downloading")
    parser.add_argument("--reorganize", action="store_true",
                        help="Move existing flat transcripts into YYYY-MM/ subdirectories")
    args = parser.parse_args()

    # ── DNS pre-flight ─────────────────────────────────────────────────────
    if not args.dry_run and not args.reorganize:
        if not dns_preflight():
            print("Network unavailable — skipping this run.")
            return

    # ── Reorganize existing flat files into YYYY-MM/ subdirs ────────────────
    if args.reorganize:
        import shutil
        flat_files = [f for f in TRANSCRIPTS_DIR.iterdir()
                      if f.is_file() and f.suffix == ".md"]
        moved = 0
        for f in flat_files:
            # Extract MMDDYY from filename prefix (e.g., 120325-title.md)
            m = re.match(r'^(\d{2})(\d{2})(\d{2})-', f.name)
            if m:
                mm, dd, yy = m.groups()
                year = f"20{yy}"
                subfolder = f"{year}-{mm}"
            else:
                # Can't parse date — skip
                print(f"  [SKIP] Can't parse date from: {f.name}")
                continue
            dest_dir = TRANSCRIPTS_DIR / subfolder
            dest_dir.mkdir(parents=True, exist_ok=True)
            dest = dest_dir / f.name
            if dest.exists():
                print(f"  [SKIP] Already exists: {subfolder}/{f.name}")
                continue
            if args.dry_run:
                print(f"  [DRY RUN] Would move: {f.name} -> {subfolder}/{f.name}")
            else:
                shutil.move(str(f), str(dest))
                print(f"  Moved: {f.name} -> {subfolder}/{f.name}")
            moved += 1
        print(f"\nReorganize done. {moved} file(s) {'would be ' if args.dry_run else ''}moved.")
        if not args.dry_run and moved == 0:
            print("All files already in subdirectories.")
        return

    state = load_state()
    downloaded = set(state["downloaded_ids"])

    if args.backfill:
        downloaded = set()
        print("BACKFILL MODE: downloading all transcripts")

    print(f"Fetching notetaker docs from ClickUp workspace {WORKSPACE_ID}...")
    docs = list_notetaker_docs()
    print(f"Found {len(docs)} notetaker doc(s)")

    new_count = 0
    skip_count = 0
    skip_not_mine = 0

    for doc in docs:
        doc_id = doc["id"]
        doc_name = doc["name"]
        date_created = doc["date_created"]

        if doc_id in downloaded:
            skip_count += 1
            continue

        # Attendee filter — skip meetings Christopher didn't attend
        if not is_my_meeting(doc_id):
            if args.dry_run:
                print(f"  [SKIP] Not my meeting: {doc_name}")
            downloaded.add(doc_id)
            skip_not_mine += 1
            continue

        subfolder, filename = make_filename(doc_name, date_created)
        month_dir = TRANSCRIPTS_DIR / subfolder
        filepath = month_dir / filename

        # Avoid overwriting existing files with different content
        if filepath.exists() and not args.backfill:
            # Append doc_id suffix to prevent collision
            stem = filepath.stem
            filepath = month_dir / f"{stem}-{doc_id.split('-')[-1]}.md"

        if args.dry_run:
            print(f"  [DRY RUN] Would download: {subfolder}/{filename}")
            print(f"             Doc: {doc_name}")
            new_count += 1
            continue

        # Create month subdirectory if needed
        month_dir.mkdir(parents=True, exist_ok=True)

        print(f"  Downloading: {doc_name}")
        print(f"    -> {subfolder}/{filename}")

        try:
            content = get_doc_content(doc_id)
            # Add a header with metadata
            dt = datetime.fromtimestamp(date_created / 1000)
            header = f"# {doc_name}\n\n**Date:** {dt.strftime('%B %d, %Y')}\n**Source:** ClickUp AI Notetaker\n\n---\n\n"
            full_content = header + content

            filepath.write_text(full_content, encoding="utf-8")
            downloaded.add(doc_id)
            new_count += 1
            print(f"    Saved ({len(content):,} chars)")
        except Exception as e:
            print(f"    ERROR: {e}")

    # Save state
    if not args.dry_run:
        state["downloaded_ids"] = list(downloaded)
        state["last_run"] = datetime.now().isoformat()
        save_state(state)

    print()
    print(f"Done. {new_count} new, {skip_count} skipped (already downloaded), {skip_not_mine} skipped (not my meeting)")

if __name__ == "__main__":
    main()
