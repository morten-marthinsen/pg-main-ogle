#!/usr/bin/env python3
"""One-time seed script: populate .kb-completed-registry.json from existing data.

Sources:
  1. .kb-overrides.json — all items marked "closed"
  2. .kb-approvals.json — all items marked "rejected"
  3. .kb-triage-history.json — all historical rejections

Cross-references .transcript-kb.json to get item text for fuzzy matching.
"""

import json
import sys
from datetime import date
from pathlib import Path

DAILY_BRIEFING_DIR = Path(__file__).parent
KB_PATH = DAILY_BRIEFING_DIR / ".transcript-kb.json"
OVERRIDES_PATH = DAILY_BRIEFING_DIR / ".kb-overrides.json"
APPROVALS_PATH = DAILY_BRIEFING_DIR / ".kb-approvals.json"
TRIAGE_HISTORY_PATH = DAILY_BRIEFING_DIR / ".kb-triage-history.json"
REGISTRY_PATH = DAILY_BRIEFING_DIR / ".kb-completed-registry.json"


def main():
    # Load KB for item text lookup
    if not KB_PATH.exists():
        print("ERROR: .transcript-kb.json not found")
        sys.exit(1)

    with open(KB_PATH, encoding="utf-8") as f:
        kb = json.load(f)

    items_by_id = {}
    for ai in kb.get("action_items", []):
        items_by_id[ai.get("id", "")] = ai

    registry_entries = []
    seen_ids = set()

    def add_entry(item_id, reason, source=""):
        if item_id in seen_ids:
            return
        seen_ids.add(item_id)
        ai = items_by_id.get(item_id, {})
        text = ai.get("text", "")
        if not text:
            return
        registry_entries.append({
            "id": item_id,
            "text": text,
            "text_normalized": text.lower().strip(),
            "completed_date": date.today().isoformat(),
            "reason": reason,
            "source_transcript": ai.get("source_transcript", ""),
            "source_date": ai.get("source_date", ""),
        })

    # 1. Overrides (closed items)
    if OVERRIDES_PATH.exists():
        with open(OVERRIDES_PATH, encoding="utf-8") as f:
            overrides = json.load(f)
        for item_id, val in overrides.get("action_items", {}).items():
            if isinstance(val, str) and val == "closed":
                add_entry(item_id, "done", "overrides")
            elif isinstance(val, dict) and val.get("status") == "closed":
                add_entry(item_id, "done", "overrides")

    closed_count = len(registry_entries)
    print(f"  Overrides: {closed_count} closed items added")

    # 2. Approvals (rejected items)
    if APPROVALS_PATH.exists():
        with open(APPROVALS_PATH, encoding="utf-8") as f:
            approvals = json.load(f)
        for item_id, val in approvals.get("approvals", {}).items():
            if isinstance(val, str) and val == "rejected":
                add_entry(item_id, "not-relevant", "approvals")

    rejected_count = len(registry_entries) - closed_count
    print(f"  Approvals: {rejected_count} rejected items added")

    # 3. Triage history (additional rejected decisions not in approvals)
    if TRIAGE_HISTORY_PATH.exists():
        with open(TRIAGE_HISTORY_PATH, encoding="utf-8") as f:
            history = json.load(f)
        for dec in history.get("decisions", []):
            if dec.get("decision") == "rejected":
                item_id = dec.get("item_id", "")
                if item_id not in seen_ids:
                    # Use snapshot text if available
                    snap = dec.get("item_snapshot", {})
                    text = snap.get("text", "")
                    if text:
                        seen_ids.add(item_id)
                        registry_entries.append({
                            "id": item_id,
                            "text": text,
                            "text_normalized": text.lower().strip(),
                            "completed_date": date.today().isoformat(),
                            "reason": "not-relevant",
                            "source_transcript": snap.get("source_transcript", ""),
                            "source_date": "",
                        })

    history_count = len(registry_entries) - closed_count - rejected_count
    print(f"  Triage history: {history_count} additional rejected items added")

    # Write registry
    registry = {
        "version": 1,
        "seeded_date": date.today().isoformat(),
        "entries": registry_entries,
    }

    with open(REGISTRY_PATH, "w", encoding="utf-8") as f:
        json.dump(registry, f, indent=2, ensure_ascii=False)

    print(f"\nRegistry seeded: {len(registry_entries)} total entries")
    print(f"Written to: {REGISTRY_PATH}")


if __name__ == "__main__":
    main()
