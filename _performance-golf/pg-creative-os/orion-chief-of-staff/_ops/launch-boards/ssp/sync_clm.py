#!/usr/bin/env python3
"""CLM URL Injector — Reads ssp-url-registry.json and updates both
ssp-launch-board-content.md and ssp-launch-board.html with live URLs.

Usage:
    python3 sync_clm.py              # Preview changes (dry run)
    python3 sync_clm.py --apply      # Write changes to files

Designed to be called by M13 (daily pipeline) or run manually.
"""

import argparse
import json
import re
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
REGISTRY_PATH = SCRIPT_DIR / "ssp-url-registry.json"
CONTENT_MD = SCRIPT_DIR / "ssp-launch-board-content.md"
CONTENT_HTML = SCRIPT_DIR / "ssp-launch-board.html"


def load_registry() -> dict:
    with open(REGISTRY_PATH) as f:
        return json.load(f)


def get_live_urls(registry: dict) -> dict:
    """Return dict of clm_line_marker -> {url, label, type} for live entries."""
    live = {}
    for key, entry in registry.get("urls", {}).items():
        if entry["status"] == "live" and entry.get("url"):
            live[key] = entry
    return live


# -- Markdown updaters --------------------------------------------------------


def update_markdown(content: str, live_urls: dict) -> tuple:
    """Update the markdown content with live URLs. Returns (new_content, changes)."""
    changes = []
    lines = content.split("\n")
    new_lines = []

    for i, line in enumerate(lines):
        new_line = line

        # Section 7: Asset Links table
        for key, entry in live_urls.items():
            marker = entry.get("clm_line_marker", "")
            if not marker:
                continue

            pattern = rf"^\|\s*{re.escape(marker)}\s*\|"
            if re.match(pattern, line.strip()):
                url = entry["url"]
                url_type = entry.get("type", "")
                display = _url_display_text(url, url_type)

                if "| TBD |" in line:
                    new_line = line.replace("| TBD |", f"| [{display}]({url}) |", 1)
                    if new_line != line:
                        changes.append(f"MD L{i+1}: {marker} -> {url[:60]}")

        # Funnel pages tables (Section 3 & 11)
        for key, entry in live_urls.items():
            marker = entry.get("clm_line_marker", "")
            if not marker or entry.get("section") != "funnel_pages":
                continue

            pattern = rf"^\|\s*\**{re.escape(marker)}\**\s*\|"
            if re.match(pattern, line.strip()) and "| TBD |" in line:
                url = entry["url"]
                display = _url_display_text(url, entry.get("type", ""))
                new_line = line.replace("| TBD |", f"| [{display}]({url}) |", 1)
                if new_line != line:
                    changes.append(f"MD L{i+1}: {marker} -> {url[:60]}")

        new_lines.append(new_line)

    return "\n".join(new_lines), changes


def _url_display_text(url: str, url_type: str) -> str:
    """Generate display text for a URL based on its type."""
    type_labels = {
        "figma": "Figma",
        "iconik": "Iconik",
        "clickup": "ClickUp",
        "google_doc": "Google Doc",
        "google_slides": "Google Slides",
        "google_sheet": "Google Sheets",
        "loom": "Loom",
        "web_page": url.split("//")[-1].split("?")[0][:40],
    }
    return type_labels.get(url_type, url.split("//")[-1][:40])


# -- HTML updaters ------------------------------------------------------------


def update_html(content: str, live_urls: dict) -> tuple:
    """Update the HTML content with live URLs. Returns (new_content, changes)."""
    changes = []

    for key, entry in live_urls.items():
        marker = entry.get("clm_line_marker", "")
        url = entry.get("url", "")
        url_type = entry.get("type", "")
        section = entry.get("section", "")
        if not marker or not url:
            continue

        display = _url_display_text(url, url_type)

        # Asset links: Replace TBD spans
        asset_pattern = (
            rf'(<td style="font-weight:600">{re.escape(marker)}</td>)'
            rf'<td><span class="tag tag-yellow">TBD[^<]*</span></td>'
        )
        replacement = (
            rf'\1<td><a href="{url}" target="_blank" '
            rf'style="color:var(--orange)">{display} &rarr;</a></td>'
        )
        new_content, count = re.subn(asset_pattern, replacement, content)
        if count:
            content = new_content
            changes.append(f"HTML asset: {marker} -> {url[:60]} ({count}x)")

        # Funnel pages: Replace TBD spans
        if section == "funnel_pages":
            funnel_pattern = (
                rf'(<td style="font-weight:600">{re.escape(marker)}</td>'
                rf'<td>[^<]*</td>)'
                rf'<td><span class="tag tag-yellow">TBD</span></td>'
            )
            funnel_replacement = (
                rf'\1<td><a href="{url}" target="_blank" '
                rf'style="color:var(--orange)">{display} &rarr;</a></td>'
            )
            new_content, count = re.subn(funnel_pattern, funnel_replacement, content)
            if count:
                content = new_content
                changes.append(f"HTML funnel: {marker} -> {url[:60]} ({count}x)")

    return content, changes


# -- Main ---------------------------------------------------------------------


def main():
    parser = argparse.ArgumentParser(description="Sync SSP CLM files from URL registry")
    parser.add_argument("--apply", action="store_true", help="Write changes (default: dry run)")
    args = parser.parse_args()

    registry = load_registry()
    live_urls = get_live_urls(registry)

    print(f"Registry: {len(live_urls)} live URLs, "
          f"{sum(1 for v in registry['urls'].values() if v['status'] == 'tbd')} TBD\n")

    # Update markdown
    md_content = CONTENT_MD.read_text()
    new_md, md_changes = update_markdown(md_content, live_urls)

    # Update HTML (skip if file doesn't exist yet)
    html_changes = []
    new_html = None
    html_content = None
    if CONTENT_HTML.exists():
        html_content = CONTENT_HTML.read_text()
        new_html, html_changes = update_html(html_content, live_urls)

    all_changes = md_changes + html_changes
    if not all_changes:
        print("No changes needed -- CLM files are up to date with registry.")
        return

    print(f"Changes ({len(all_changes)}):")
    for c in all_changes:
        print(f"  {c}")

    if args.apply:
        if new_md != md_content:
            CONTENT_MD.write_text(new_md)
            print(f"\nWrote: {CONTENT_MD.name}")
        if new_html and html_content and new_html != html_content:
            CONTENT_HTML.write_text(new_html)
            print(f"Wrote: {CONTENT_HTML.name}")
        print("\nSSP CLM files updated.")
    else:
        print("\nDry run -- use --apply to write changes.")


if __name__ == "__main__":
    main()
