#!/usr/bin/env python3
"""SF2 CLM Production Sync — Reads sf2-production-registry.json and updates
sf2-launch-board-content.md and sf2-launch-board-v2.html with shoot status
and footage URLs.

Usage:
    python3 sync_clm.py              # Preview changes (dry run)
    python3 sync_clm.py --apply      # Write changes to files

Called by M14 (daily pipeline) or run manually.
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
REGISTRY_PATH = SCRIPT_DIR / "sf2-production-registry.json"
CONTENT_MD = SCRIPT_DIR / "sf2-launch-board-content.md"
CONTENT_HTML = SCRIPT_DIR / "sf2-launch-board-v2.html"
DEPLOY_DIR = SCRIPT_DIR / "deploy-v2"
SURGE_DOMAINS = ["pg-sf2-board.surge.sh", "pg-sf2-board-v2.surge.sh"]

# Status → display mapping for HTML tags
STATUS_TAGS = {
    "delivered": '<span class="tag tag-green">Delivered</span>',
    "complete_no_footage": '<span class="tag tag-green">Complete</span>',
    "in_production": '<span class="tag tag-yellow">In Production</span>',
    "pending": '<span class="tag tag-gray">Pending</span>',
    "missing": '<span class="tag tag-gray">TBD</span>',
}

# Status → display for markdown
STATUS_MD = {
    "delivered": "Delivered",
    "complete_no_footage": "Complete",
    "in_production": "In Production",
    "pending": "Scheduled",
    "missing": "TBD",
}


def load_registry() -> dict:
    with open(REGISTRY_PATH) as f:
        return json.load(f)


def get_delivered_shoots(registry: dict) -> list:
    """Return shoots with footage delivered."""
    return [s for s in registry.get("shoots", [])
            if s.get("footage_status") == "delivered" and s.get("footage_url")]


def get_completed_shoots(registry: dict) -> list:
    """Return all shoots that are complete or delivered."""
    return [s for s in registry.get("shoots", [])
            if s.get("footage_status") in ("delivered", "complete_no_footage")]


# ── Markdown updaters ──────────────────────────────────────────────────────


def update_markdown(content: str, registry: dict) -> tuple:
    """Update markdown with production status changes. Returns (new_content, changes)."""
    changes = []

    for shoot in registry.get("shoots", []):
        name = shoot.get("name", "")
        footage_url = shoot.get("footage_url")
        footage_status = shoot.get("footage_status", "pending")
        status_display = STATUS_MD.get(footage_status, "TBD")

        if not name:
            continue

        # Match table rows containing the shoot name in the Organic & Content table
        # Pattern: | Shoot Name | Owner | Type | ... | Status |
        lines = content.split("\n")
        new_lines = []
        for i, line in enumerate(lines):
            if name.lower() in line.lower() and "|" in line and "Shooting" in line:
                # Replace "Shooting" with actual status
                if footage_url:
                    new_line = line.replace("Shooting", f"Delivered — [Iconik]({footage_url})")
                else:
                    new_line = line.replace("Shooting", status_display)
                if new_line != line:
                    changes.append(f"MD L{i+1}: {name} → {status_display}")
                    line = new_line
            new_lines.append(line)
        content = "\n".join(new_lines)

    return content, changes


# ── HTML updaters ──────────────────────────────────────────────────────────


def update_html(content: str, registry: dict) -> tuple:
    """Update HTML with production status changes. Returns (new_content, changes)."""
    changes = []

    for shoot in registry.get("shoots", []):
        name = shoot.get("name", "")
        footage_url = shoot.get("footage_url")
        footage_status = shoot.get("footage_status", "pending")

        if not name:
            continue

        # Replace "Shooting" tags with delivered/complete tags for matching rows
        if footage_url:
            # Find rows containing the shoot name and replace status tag
            pattern = (
                rf'(<td[^>]*>{re.escape(name)}</td>.*?)'
                rf'<span class="tag tag-yellow">Shooting</span>'
            )
            replacement = (
                rf'\1<span class="tag tag-green">Delivered &mdash; '
                rf'<a href="{footage_url}" target="_blank" '
                rf'style="color:inherit">Iconik &rarr;</a></span>'
            )
            new_content, count = re.subn(pattern, replacement, content, flags=re.DOTALL)
            if count:
                content = new_content
                changes.append(f"HTML: {name} → Delivered ({count}x)")

    return content, changes


# ── Deploy ─────────────────────────────────────────────────────────────────


def deploy_to_surge(apply: bool = False):
    """Copy HTML to deploy dir and deploy to Surge."""
    if not apply:
        return

    # Copy HTML to deploy dir
    index_path = DEPLOY_DIR / "index.html"
    if CONTENT_HTML.exists() and DEPLOY_DIR.exists():
        shutil.copy2(str(CONTENT_HTML), str(index_path))
        print(f"Copied: {CONTENT_HTML.name} → {DEPLOY_DIR.name}/index.html")

    # Deploy to each Surge domain
    for domain in SURGE_DOMAINS:
        try:
            result = subprocess.run(
                ["surge", str(DEPLOY_DIR), domain],
                capture_output=True, text=True, timeout=60,
            )
            if result.returncode == 0:
                print(f"Deployed: {domain}")
            else:
                print(f"Surge error for {domain}: {result.stderr}", file=sys.stderr)
        except Exception as e:
            print(f"Surge error for {domain}: {e}", file=sys.stderr)


# ── Main ───────────────────────────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(description="Sync SF2 CLM from production registry")
    parser.add_argument("--apply", action="store_true", help="Write changes + deploy (default: dry run)")
    parser.add_argument("--no-deploy", action="store_true", help="Skip Surge deploy even with --apply")
    args = parser.parse_args()

    registry = load_registry()
    delivered = get_delivered_shoots(registry)
    completed = get_completed_shoots(registry)

    print(f"Registry: {len(registry.get('shoots', []))} shoots, "
          f"{len(delivered)} with footage, {len(completed)} complete\n")

    # Update markdown
    md_content = CONTENT_MD.read_text()
    new_md, md_changes = update_markdown(md_content, registry)

    # Update HTML
    html_content = CONTENT_HTML.read_text()
    new_html, html_changes = update_html(html_content, registry)

    all_changes = md_changes + html_changes
    if not all_changes:
        print("No changes needed — CLM files match production registry.")
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

        if not args.no_deploy:
            deploy_to_surge(apply=True)
    else:
        print("\nDry run — use --apply to write changes.")


if __name__ == "__main__":
    main()
