"""One-off recovery script: Re-open Christopher's action items closed by S052 bulk cleanup.

Two-tier filter:
  - Items WITH deadlines: deadline must be today or future (>= 2026-02-26)
  - Items WITHOUT deadlines: source date must be recent (>= 2026-02-23, last 4 days)
  - Both: owner must be Christopher, closed by S052

Also removes re-opened IDs from .kb-overrides.json so they aren't re-closed.
"""

import json
import shutil
from datetime import date
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
KB_PATH = SCRIPT_DIR / ".transcript-kb.json"
MANUAL_PATH = SCRIPT_DIR / ".kb-manual-items.json"
OVERRIDES_PATH = SCRIPT_DIR / ".kb-overrides.json"

# Filters
TODAY = "2026-02-26"
RECENT_SOURCE_CUTOFF = "2026-02-23"  # no-deadline items must be from last 4 days
S052_TAG = "M0 redesign S052"
CHRISTOPHER_OWNERS = {"Christopher Ogle", "Christopher"}


def should_reopen(item: dict) -> bool:
    owner = item.get("owner", "")
    if owner not in CHRISTOPHER_OWNERS:
        return False

    closed_reason = item.get("closed_reason", "")
    if S052_TAG not in closed_reason:
        return False

    source_date = item.get("source_date") or item.get("created_date") or ""
    deadline = item.get("deadline") or ""

    if deadline:
        # Has deadline — only keep if today or future
        if deadline < TODAY:
            return False
    else:
        # No deadline — only keep if source is recent (last 4 days)
        if source_date < RECENT_SOURCE_CUTOFF:
            return False

    return True


def main():
    # --- Backup all files ---
    for path in [KB_PATH, MANUAL_PATH, OVERRIDES_PATH]:
        if path.exists():
            shutil.copy2(path, path.with_suffix(".bak.json"))
            print(f"  Backed up: {path.name} -> {path.with_suffix('.bak.json').name}")

    # --- Load KB ---
    with open(KB_PATH, encoding="utf-8") as f:
        kb = json.load(f)

    # --- Re-open KB items ---
    reopened_kb = []
    for item in kb.get("action_items", []):
        if item.get("status") == "closed" and should_reopen(item):
            item["status"] = "open"
            item.pop("closed_date", None)
            item.pop("closed_reason", None)
            reopened_kb.append(item)

    # --- Load manual items ---
    with open(MANUAL_PATH, encoding="utf-8") as f:
        manual = json.load(f)

    # --- Re-open manual items ---
    reopened_manual = []
    for item in manual.get("action_items", []):
        if item.get("status") == "closed" and should_reopen(item):
            item["status"] = "open"
            item.pop("closed_date", None)
            item.pop("closed_reason", None)
            reopened_manual.append(item)

    # --- Clean overrides (remove re-opened IDs) ---
    reopened_ids = set()
    for item in reopened_kb:
        reopened_ids.add(item.get("id", ""))
    for item in reopened_manual:
        reopened_ids.add(item.get("id", ""))

    overrides = {}
    if OVERRIDES_PATH.exists():
        with open(OVERRIDES_PATH, encoding="utf-8") as f:
            overrides = json.load(f)

    removed_from_overrides = 0
    if "action_items" in overrides:
        before = len(overrides["action_items"])
        overrides["action_items"] = {
            k: v for k, v in overrides["action_items"].items()
            if k not in reopened_ids
        }
        removed_from_overrides = before - len(overrides["action_items"])
    overrides["last_updated"] = str(date.today())

    # --- Save all files ---
    with open(KB_PATH, "w", encoding="utf-8") as f:
        json.dump(kb, f, indent=2, ensure_ascii=False)

    with open(MANUAL_PATH, "w", encoding="utf-8") as f:
        json.dump(manual, f, indent=2, ensure_ascii=False)

    with open(OVERRIDES_PATH, "w", encoding="utf-8") as f:
        json.dump(overrides, f, indent=2, ensure_ascii=False)

    # --- Report ---
    print(f"\n=== Recovery Complete ===")
    print(f"  KB items re-opened:      {len(reopened_kb)}")
    print(f"  Manual items re-opened:  {len(reopened_manual)}")
    print(f"  Override IDs removed:    {removed_from_overrides}")
    print(f"  Total re-opened:         {len(reopened_kb) + len(reopened_manual)}")

    print(f"\n--- Re-opened KB items ---")
    for item in reopened_kb:
        dl = item.get("deadline") or "no deadline"
        print(f"  [{item.get('source_date')}] {item.get('text', '')[:75]}  (deadline: {dl})")

    print(f"\n--- Re-opened Manual items ---")
    for item in reopened_manual:
        dl = item.get("deadline") or "no deadline"
        print(f"  [{item.get('created_date')}] {item.get('text', '')[:75]}  (deadline: {dl})")


if __name__ == "__main__":
    main()
