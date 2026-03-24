#!/usr/bin/env python3
"""CLM URL Injector — Reads rs1-url-registry.json and updates both
rs1-launch-board-content.md and rs1-launch-board.html with live URLs.

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
REGISTRY_PATH = SCRIPT_DIR / "rs1-url-registry.json"
CONTENT_MD = SCRIPT_DIR / "rs1-launch-board-content.md"
CONTENT_HTML = SCRIPT_DIR / "rs1-launch-board.html"


def load_registry() -> dict:
    with open(REGISTRY_PATH) as f:
        return json.load(f)


def get_live_urls(registry: dict) -> dict:
    """Return dict of clm_line_marker → {url, label, type} for live entries."""
    live = {}
    for key, entry in registry.get("urls", {}).items():
        if entry["status"] == "live" and entry.get("url"):
            live[key] = entry
    return live


# ── Markdown updaters ──────────────────────────────────────────────────────


def update_markdown(content: str, live_urls: dict) -> tuple:
    """Update the markdown content with live URLs. Returns (new_content, changes)."""
    changes = []
    lines = content.split("\n")
    new_lines = []

    for i, line in enumerate(lines):
        new_line = line

        # Section 7: Asset Links table (lines ~694-700)
        # Pattern: | ClickUp | #product-rs1-putter-launch | ...
        # Pattern: | Figma | TBD | ...
        # Pattern: | Iconik | RS1 folder | ...
        for key, entry in live_urls.items():
            marker = entry.get("clm_line_marker", "")
            if not marker:
                continue

            # Match table rows starting with the marker
            # e.g., "| ClickUp | #product-rs1-putter-launch |"
            # or "| Figma | TBD |"
            pattern = rf"^\|\s*{re.escape(marker)}\s*\|"
            if re.match(pattern, line.strip()):
                url = entry["url"]
                label = entry["label"]
                url_type = entry.get("type", "")

                # Determine display text based on type
                display = _url_display_text(url, url_type)

                if "| TBD |" in line or "| RS1 folder |" in line:
                    # Replace TBD or plain text with clickable link
                    if "| TBD |" in line:
                        new_line = line.replace("| TBD |", f"| [{display}]({url}) |", 1)
                    elif "| RS1 folder |" in line:
                        new_line = line.replace("| RS1 folder |", f"| [{display}]({url}) |", 1)

                    if new_line != line:
                        changes.append(f"MD L{i+1}: {marker} → {url[:60]}")

        # Section 3 & 11: Funnel Pages tables
        # Pattern: "| PDP (with nav) | Site PDP | TBD | Design: March 23 - April 1 |"
        for key, entry in live_urls.items():
            marker = entry.get("clm_line_marker", "")
            if not marker or entry.get("section") != "funnel_pages":
                continue

            # Match funnel page rows
            pattern = rf"^\|\s*\**{re.escape(marker)}\**\s*\|"
            if re.match(pattern, line.strip()) and "| TBD |" in line:
                url = entry["url"]
                display = _url_display_text(url, entry.get("type", ""))
                new_line = line.replace("| TBD |", f"| [{display}]({url}) |", 1)
                if new_line != line:
                    changes.append(f"MD L{i+1}: {marker} → {url[:60]}")

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
        "google_sheets": "Google Sheets",
        "loom": "Loom",
        "web_page": url.split("//")[-1].split("?")[0][:40],
    }
    return type_labels.get(url_type, url.split("//")[-1][:40])


# ── HTML updaters ──────────────────────────────────────────────────────────


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

        # Section 7 Asset Links: Replace TBD spans or plain text in asset link rows
        # Pattern: <td style="font-weight:600">Figma</td><td><span class="tag tag-yellow">TBD...</span></td>
        # Replace with: <td style="font-weight:600">Figma</td><td><a href="URL" target="_blank" style="color:var(--orange)">Display →</a></td>
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
            changes.append(f"HTML asset: {marker} → {url[:60]} ({count}x)")

        # Also handle plain text like: <td>RS1 folder</td> or <td>#product-rs1...</td>
        if marker == "Iconik":
            old = f'<td style="font-weight:600">Iconik</td><td>RS1 folder</td>'
            new = (
                f'<td style="font-weight:600">Iconik</td>'
                f'<td><a href="{url}" target="_blank" '
                f'style="color:var(--orange)">Iconik &rarr;</a></td>'
            )
            if old in content:
                content = content.replace(old, new)
                changes.append(f"HTML asset: Iconik → {url[:60]}")

        if marker == "ClickUp":
            old = '<td style="font-weight:600">ClickUp</td><td>#product-rs1-putter-launch</td>'
            new = (
                f'<td style="font-weight:600">ClickUp</td>'
                f'<td><a href="{url}" target="_blank" '
                f'style="color:var(--orange)">ClickUp &rarr;</a></td>'
            )
            if old in content:
                content = content.replace(old, new)
                changes.append(f"HTML asset: ClickUp → {url[:60]}")

        # Funnel pages: Replace TBD spans in Section 3 and Section 11 tables
        if section == "funnel_pages":
            # Section 3 pattern: <td style="font-weight:600">PDP (with nav)</td><td>Site PDP</td><td><span class="tag tag-yellow">TBD</span></td>
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
                changes.append(f"HTML funnel: {marker} → {url[:60]} ({count}x)")

    return content, changes


# ── Main ───────────────────────────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(description="Sync CLM files from URL registry")
    parser.add_argument("--apply", action="store_true", help="Write changes (default: dry run)")
    args = parser.parse_args()

    registry = load_registry()
    live_urls = get_live_urls(registry)

    print(f"Registry: {len(live_urls)} live URLs, "
          f"{sum(1 for v in registry['urls'].values() if v['status'] == 'tbd')} TBD\n")

    # Update markdown
    md_content = CONTENT_MD.read_text()
    new_md, md_changes = update_markdown(md_content, live_urls)

    # Update HTML
    html_content = CONTENT_HTML.read_text()
    new_html, html_changes = update_html(html_content, live_urls)

    all_changes = md_changes + html_changes
    if not all_changes:
        print("No changes needed — CLM files are up to date with registry.")
        return

    print(f"Changes ({len(all_changes)}):")
    for c in all_changes:
        print(f"  {c}")

    if args.apply:
        if new_md != md_content:
            CONTENT_MD.write_text(new_md)
            print(f"\nWrote: {CONTENT_MD.name}")
        if new_html != html_content:
            CONTENT_HTML.write_text(new_html)
            print(f"Wrote: {CONTENT_HTML.name}")
        print("\nCLM files updated.")
    else:
        print("\nDry run — use --apply to write changes.")


if __name__ == "__main__":
    main()
