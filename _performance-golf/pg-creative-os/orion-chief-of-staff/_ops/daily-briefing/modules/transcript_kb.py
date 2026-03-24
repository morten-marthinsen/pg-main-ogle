"""Transcript Knowledge Base — shared KB operations for M9/M10/M11.

Schema: 5 collections (action_items, decisions, topics, people, recommendations)
plus extraction_state for tracking processed files.

Storage: .transcript-kb.json (atomic writes via temp + os.replace)
Backup: .transcript-kb.bak.json (before each write)
"""

import hashlib
import json
import os
import shutil
import tempfile
from datetime import date, datetime
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any, Optional

from .base import MODULES_DIR

DAILY_BRIEFING_DIR = MODULES_DIR.parent
KB_PATH = DAILY_BRIEFING_DIR / ".transcript-kb.json"
KB_BACKUP_PATH = DAILY_BRIEFING_DIR / ".transcript-kb.bak.json"
KB_OVERRIDES_PATH = DAILY_BRIEFING_DIR / ".kb-overrides.json"
KB_APPROVALS_PATH = DAILY_BRIEFING_DIR / ".kb-approvals.json"
KB_SCHEDULE_PATH = DAILY_BRIEFING_DIR / ".kb-schedule.json"
KB_COMPLETED_REGISTRY_PATH = DAILY_BRIEFING_DIR / ".kb-completed-registry.json"
KB_VERSION = "1.0"


# ── Schema ────────────────────────────────────────────────────────────────

def _empty_kb() -> dict:
    """Return a fresh, empty KB with the current schema."""
    return {
        "version": KB_VERSION,
        "last_updated": datetime.now().isoformat(),
        "extraction_state": {
            "processed": [],
            "legacy_processed": [],
            "last_run": None,
        },
        "action_items": [],
        "decisions": [],
        "topics": [],
        "people": {},
        "recommendations": [],
    }


# ── Read / Write ──────────────────────────────────────────────────────────

def load_kb() -> dict:
    """Load the knowledge base from disk. Returns empty KB if not found."""
    if not KB_PATH.exists():
        return _empty_kb()
    try:
        with open(KB_PATH, encoding="utf-8") as f:
            kb = json.load(f)
        # Forward-compat: ensure all collections exist
        for key in ("action_items", "decisions", "topics", "recommendations"):
            if key not in kb:
                kb[key] = []
        if "people" not in kb:
            kb["people"] = {}
        if "extraction_state" not in kb:
            kb["extraction_state"] = {
                "processed": [], "legacy_processed": [], "last_run": None
            }
        return kb
    except (json.JSONDecodeError, KeyError):
        return _empty_kb()


def save_kb(kb: dict) -> None:
    """Atomic write: backup existing -> write to temp -> os.replace."""
    kb["last_updated"] = datetime.now().isoformat()

    # Backup existing KB
    if KB_PATH.exists():
        try:
            shutil.copy2(str(KB_PATH), str(KB_BACKUP_PATH))
        except OSError:
            pass

    # Atomic write via temp file in same directory
    fd, tmp_path = tempfile.mkstemp(
        dir=str(DAILY_BRIEFING_DIR), suffix=".tmp", prefix=".kb-"
    )
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(kb, f, indent=2, ensure_ascii=False)
        os.replace(tmp_path, str(KB_PATH))
    except Exception:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
        raise


def load_schedule() -> dict:
    """Load scheduled work days from .kb-schedule.json.

    Returns: dict mapping item_id -> date string (YYYY-MM-DD).
    """
    if not KB_SCHEDULE_PATH.exists():
        return {}
    try:
        with open(KB_SCHEDULE_PATH, encoding="utf-8") as f:
            data = json.load(f)
        return data.get("schedule", {})
    except (json.JSONDecodeError, KeyError):
        return {}


def save_schedule(schedule: dict) -> None:
    """Atomic write of .kb-schedule.json (backup + temp + replace)."""
    data = {
        "version": "1.0",
        "description": "Scheduled work days for action items (separate from deadlines)",
        "last_updated": date.today().isoformat(),
        "schedule": schedule,
    }
    backup_path = KB_SCHEDULE_PATH.with_suffix(".bak.json")
    if KB_SCHEDULE_PATH.exists():
        try:
            shutil.copy2(str(KB_SCHEDULE_PATH), str(backup_path))
        except OSError:
            pass

    fd, tmp_path = tempfile.mkstemp(
        dir=str(DAILY_BRIEFING_DIR), suffix=".tmp", prefix=".kb-sched-"
    )
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        os.replace(tmp_path, str(KB_SCHEDULE_PATH))
    except Exception:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
        raise


def load_overrides() -> dict:
    """Load manual overrides file (.kb-overrides.json).

    Format: {"action_items": {"ai-xxxx": "closed"}, "recommendations": {"rc-xxxx": "acted_on"}}
    """
    if not KB_OVERRIDES_PATH.exists():
        return {}
    try:
        with open(KB_OVERRIDES_PATH, encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, KeyError):
        return {}


# ── Completed Task Registry ──────────────────────────────────────────────

def load_completed_registry() -> dict:
    """Load the completed task registry from disk."""
    if not KB_COMPLETED_REGISTRY_PATH.exists():
        return {"version": 1, "entries": []}
    try:
        with open(KB_COMPLETED_REGISTRY_PATH, encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, KeyError):
        return {"version": 1, "entries": []}


def save_completed_registry(registry: dict) -> None:
    """Atomic write of completed task registry."""
    fd, tmp_path = tempfile.mkstemp(
        dir=str(DAILY_BRIEFING_DIR), suffix=".tmp", prefix=".kb-reg-"
    )
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(registry, f, indent=2, ensure_ascii=False)
        os.replace(tmp_path, str(KB_COMPLETED_REGISTRY_PATH))
    except Exception:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
        raise


def filter_by_registry(items: list, threshold: float = 0.80) -> tuple:
    """Filter items against the completed task registry.

    Removes items whose text fuzzy-matches a registry entry (>= threshold)
    or whose ID is already in the registry.

    Returns: (kept_items, filtered_count)
    """
    registry = load_completed_registry()
    entries = registry.get("entries", [])
    if not entries:
        return items, 0

    registry_ids = {e.get("id") for e in entries}
    normalized_texts = [e.get("text_normalized", "") for e in entries]

    kept = []
    filtered = 0
    for item in items:
        # Direct ID match
        if item.get("id") in registry_ids:
            filtered += 1
            continue
        # Fuzzy text match
        text = item.get("text", "").lower().strip()
        if any(_similarity(text, nt) >= threshold for nt in normalized_texts):
            filtered += 1
            continue
        kept.append(item)

    return kept, filtered


def check_schedule_protection(items: list) -> list:
    """Check if any items have future scheduled dates.

    Returns list of dicts: [{"id": str, "text": str, "scheduled_date": str}]
    for items scheduled in the future. These should NOT be closed without
    explicit confirmation.
    """
    schedule = load_schedule()
    if not schedule:
        return []

    today = date.today()
    protected = []
    for item in items:
        item_id = item.get("id", "")
        sched_str = schedule.get(item_id)
        if sched_str:
            try:
                sched_date = date.fromisoformat(sched_str)
                if sched_date > today:
                    protected.append({
                        "id": item_id,
                        "text": item.get("text", ""),
                        "scheduled_date": sched_str,
                    })
            except (ValueError, TypeError):
                pass
    return protected


def add_to_registry(items: list, reason: str = "done",
                    force: bool = False) -> int:
    """Add items to the completed task registry.

    Args:
        items: List of dicts with 'id', 'text', and optionally
               'source_transcript', 'source_date'.
        reason: One of 'done', 'stale', 'duplicate', 'not-relevant'.
        force: If False (default), items with future scheduled dates
               are skipped and a warning is printed. Set True to
               override schedule protection.

    Returns: count of items added.
    """
    registry = load_completed_registry()
    existing_ids = {e.get("id") for e in registry.get("entries", [])}
    added = 0

    # Schedule protection: skip items scheduled for future dates
    protected = []
    if not force:
        protected = check_schedule_protection(items)
    protected_ids = {p["id"] for p in protected}

    for item in items:
        item_id = item.get("id", "")
        if item_id in existing_ids:
            continue
        if item_id in protected_ids:
            print(f"⚠️  SCHEDULE PROTECTED: '{item.get('text', '')[:60]}' "
                  f"is scheduled for {[p['scheduled_date'] for p in protected if p['id'] == item_id][0]}. "
                  f"Skipping. Use force=True to override.")
            continue
        registry["entries"].append({
            "id": item_id,
            "text": item.get("text", ""),
            "text_normalized": item.get("text", "").lower().strip(),
            "completed_date": date.today().isoformat(),
            "reason": reason,
            "source_transcript": item.get("source_transcript", ""),
            "source_date": item.get("source_date", ""),
        })
        existing_ids.add(item_id)
        added += 1

    if added:
        save_completed_registry(registry)
    return added


# ── ID Generation ─────────────────────────────────────────────────────────

def generate_id(prefix: str, text: str) -> str:
    """Generate a short hash ID. prefix: 'ai', 'dc', 'tp', 'rc'."""
    h = hashlib.sha256(text.encode("utf-8")).hexdigest()[:8]
    return f"{prefix}-{h}"


# ── Similarity ────────────────────────────────────────────────────────────

def _similarity(a: str, b: str) -> float:
    """Quick text similarity (0.0-1.0) using SequenceMatcher."""
    return SequenceMatcher(None, a.lower().strip(), b.lower().strip()).ratio()


# ── Merge Operations ──────────────────────────────────────────────────────

def merge_action_items(kb: dict, new_items: list, source_transcript: str,
                       source_date: str) -> tuple:
    """Merge new action items into KB. Fuzzy-match by text+owner (>80%).

    Returns: (added_count, list_of_new_item_ids)
    """
    added = 0
    new_ids = []
    existing = kb["action_items"]

    # Load completed registry once for filtering
    registry = load_completed_registry()
    registry_ids = {e.get("id") for e in registry.get("entries", [])}
    registry_texts = [e.get("text_normalized", "") for e in registry.get("entries", [])]

    for item in new_items:
        text = item.get("text", "").strip()
        owner = item.get("owner")
        if not text:
            continue

        # Skip if matches completed registry (prevents re-extraction)
        if registry_texts:
            text_lower = text.lower().strip()
            if any(_similarity(text_lower, rt) > 0.80 for rt in registry_texts):
                continue

        # Fuzzy match: same owner + >80% text similarity -> update
        matched = False
        for ex in existing:
            same_owner = (
                (ex.get("owner") or "").lower() == (owner or "").lower()
            )
            if same_owner and _similarity(ex["text"], text) > 0.80:
                ex["last_mentioned"] = source_date
                ex["mention_count"] = ex.get("mention_count", 1) + 1
                matched = True
                break

        if not matched:
            item_id = generate_id("ai", f"{text}{owner}{source_date}")
            existing.append({
                "id": item_id,
                "text": text,
                "owner": owner,
                "category": item.get("category", "my_action"),
                "confidence": item.get("confidence", "inferred"),
                "deadline": item.get("deadline"),
                "deadline_text": item.get("deadline_text"),
                "status": "pending",
                "source_transcript": source_transcript,
                "source_date": source_date,
                "scorecard_alignment": item.get("scorecard_alignment"),
                "depends_on": item.get("depends_on"),
                "last_mentioned": source_date,
                "mention_count": 1,
            })
            new_ids.append(item_id)
            added += 1

    return added, new_ids


def merge_decisions(kb: dict, new_decisions: list, source_transcript: str,
                    source_date: str) -> int:
    """Add new decisions to KB. Dedup by >90% text similarity. Returns count added."""
    added = 0
    for dec in new_decisions:
        text = dec.get("text", "").strip()
        if not text:
            continue

        # Skip near-duplicates
        if any(_similarity(d["text"], text) > 0.90 for d in kb["decisions"]):
            continue

        kb["decisions"].append({
            "id": generate_id("dc", f"{text}{source_date}"),
            "text": text,
            "made_by": dec.get("made_by", []),
            "context": dec.get("context", ""),
            "source_transcript": source_transcript,
            "source_date": source_date,
            "scorecard_alignment": dec.get("scorecard_alignment"),
        })
        added += 1
    return added


def merge_topics(kb: dict, new_topics: list, source_transcript: str,
                 source_date: str) -> tuple:
    """Merge topics into KB. Match by name similarity (>75%).

    Returns: (added_count, list_of_all_touched_topic_ids)
    """
    added = 0
    touched_ids = []
    existing = kb["topics"]

    for topic in new_topics:
        name = topic.get("name", "").strip()
        if not name:
            continue

        # Match existing by name
        matched = False
        for ex in existing:
            if _similarity(ex["name"], name) > 0.75:
                ex["last_mentioned"] = source_date
                ex["mention_count"] = ex.get("mention_count", 1) + 1
                if source_transcript not in ex.get("transcripts", []):
                    ex.setdefault("transcripts", []).append(source_transcript)
                ex["status"] = "active"
                if topic.get("scorecard_alignment"):
                    ex["scorecard_alignment"] = topic["scorecard_alignment"]
                touched_ids.append(ex["id"])
                matched = True
                break

        if not matched:
            topic_id = generate_id("tp", f"{name}{source_date}")
            existing.append({
                "id": topic_id,
                "name": name,
                "first_mentioned": source_date,
                "last_mentioned": source_date,
                "mention_count": 1,
                "transcripts": [source_transcript],
                "status": "active",
                "scorecard_alignment": topic.get("scorecard_alignment"),
            })
            touched_ids.append(topic_id)
            added += 1

    return added, touched_ids


def update_people(kb: dict, attendees: list, topic_ids: list,
                  action_item_ids: list, source_date: str) -> None:
    """Update people dict with attendance and associations."""
    people = kb["people"]
    for name in attendees:
        name = name.strip()
        if not name:
            continue
        if name not in people:
            people[name] = {
                "meetings_attended": 0,
                "last_seen": source_date,
                "topics_involved": [],
                "open_action_items": [],
            }
        p = people[name]
        p["meetings_attended"] = p.get("meetings_attended", 0) + 1
        p["last_seen"] = source_date
        for tid in topic_ids:
            if tid not in p.get("topics_involved", []):
                p.setdefault("topics_involved", []).append(tid)
        # Associate action items where this person is the owner
        for ai in kb["action_items"]:
            if (ai.get("owner") or "").lower() == name.lower() and ai.get("status") == "open":
                if ai["id"] not in p.get("open_action_items", []):
                    p.setdefault("open_action_items", []).append(ai["id"])


def apply_overrides(kb: dict) -> int:
    """Apply manual overrides from .kb-overrides.json. Returns count applied.

    Supports two override formats:
      String:  "ai-xxxx": "closed"                 (status only)
      Dict:    "ai-xxxx": {"status": "delegated",
                            "delegated_to": "Neco",
                            "delegated_date": "2026-02-21"}
    """
    overrides = load_overrides()
    applied = 0

    # Action item overrides (string or dict)
    for item_id, override_value in overrides.get("action_items", {}).items():
        for ai in kb["action_items"]:
            if ai["id"] != item_id:
                continue
            if isinstance(override_value, str):
                # Simple status override
                if ai["status"] != override_value:
                    ai["status"] = override_value
                    applied += 1
            elif isinstance(override_value, dict):
                # Dict override — apply status + delegation fields
                changed = False
                if "status" in override_value and ai.get("status") != override_value["status"]:
                    ai["status"] = override_value["status"]
                    changed = True
                if "delegated_to" in override_value:
                    ai["delegated_to"] = override_value["delegated_to"]
                    changed = True
                if "delegated_date" in override_value:
                    ai["delegated_date"] = override_value["delegated_date"]
                    changed = True
                if changed:
                    applied += 1

    # Recommendation status overrides
    for rec_id, new_status in overrides.get("recommendations", {}).items():
        for rec in kb["recommendations"]:
            if rec["id"] == rec_id and rec["status"] != new_status:
                rec["status"] = new_status
                applied += 1

    return applied


def apply_approvals(kb: dict) -> dict:
    """Apply Christopher's approval decisions to pending items.

    Reads .kb-approvals.json and promotes pending → open or marks rejected.
    Returns: {"approved": N, "rejected": N}
    """
    if not KB_APPROVALS_PATH.exists():
        return {"approved": 0, "rejected": 0}
    try:
        with open(KB_APPROVALS_PATH, encoding="utf-8") as f:
            approvals = json.load(f)
    except (json.JSONDecodeError, KeyError):
        return {"approved": 0, "rejected": 0}

    counts = {"approved": 0, "rejected": 0}
    schedule_updates = {}

    # Lazy-load triage history for decision recording
    triage_history = None

    for item_id, decision in approvals.get("approvals", {}).items():
        for ai in kb["action_items"]:
            if ai["id"] != item_id or ai["status"] != "pending":
                continue

            decision_label = None
            if isinstance(decision, str) and decision == "rejected":
                ai["status"] = "rejected"
                counts["rejected"] += 1
                decision_label = "rejected"
            elif isinstance(decision, dict) and decision.get("status") == "open":
                ai["status"] = "open"
                if decision.get("deadline"):
                    ai["deadline"] = decision["deadline"]
                if decision.get("_priority_override"):
                    ai["_priority_override"] = decision["_priority_override"]
                ai["approved_date"] = date.today().isoformat()
                counts["approved"] += 1
                decision_label = "approved"
                # Collect scheduled_date for .kb-schedule.json
                if decision.get("scheduled_date"):
                    schedule_updates[item_id] = decision["scheduled_date"]

            # Record decision to triage history for pattern learning
            if decision_label:
                try:
                    if triage_history is None:
                        from .triage_intelligence import TriageHistory
                        triage_history = TriageHistory()
                    triage_history.record_decision(
                        item_id=item_id,
                        decision=decision_label,
                        item_snapshot={
                            "text": ai.get("text", ""),
                            "owner": ai.get("owner", ""),
                            "category": ai.get("category", ""),
                            "confidence": ai.get("confidence", ""),
                            "depends_on": ai.get("depends_on"),
                            "source_transcript": ai.get("source_transcript", ""),
                        },
                    )
                except Exception:
                    pass  # Don't break approvals if triage recording fails

    # Write any scheduled_date entries to .kb-schedule.json
    if schedule_updates:
        schedule = load_schedule()
        schedule.update(schedule_updates)
        save_schedule(schedule)

    return counts


# ── Pruning ───────────────────────────────────────────────────────────────

def prune_stale(kb: dict, today: Optional[date] = None) -> dict:
    """Prune closed items >90 days. Mark topics dormant after 60 days no mention.

    Returns: counts dict with items_pruned and topics_dormant.
    """
    if today is None:
        today = date.today()

    counts = {"items_pruned": 0, "topics_dormant": 0}

    # Action items: NO auto-removal. Only Christopher can close/remove items.
    # (Closed items preserved indefinitely for audit trail.)

    # Mark topics dormant after 60 days no mention
    for topic in kb["topics"]:
        if topic.get("status") == "active":
            try:
                last = date.fromisoformat(topic.get("last_mentioned", ""))
                if (today - last).days > 60:
                    topic["status"] = "dormant"
                    counts["topics_dormant"] += 1
            except (ValueError, TypeError):
                pass

    # Prune old acted_on/dismissed recommendations
    kept_recs = []
    for rec in kb.get("recommendations", []):
        if rec.get("status") in ("acted_on", "dismissed"):
            try:
                rec_date = date.fromisoformat(rec.get("generated_date", ""))
                if (today - rec_date).days > 90:
                    counts["items_pruned"] += 1
                    continue
            except (ValueError, TypeError):
                pass
        kept_recs.append(rec)
    kb["recommendations"] = kept_recs

    return counts


# ── Stats ─────────────────────────────────────────────────────────────────

def kb_stats(kb: dict) -> dict:
    """Return summary statistics for reporting."""
    open_items = [i for i in kb["action_items"] if i.get("status") == "open"]
    delegated_items = [i for i in kb["action_items"] if i.get("status") == "delegated"]
    pending_items = [i for i in kb["action_items"] if i.get("status") == "pending"]
    return {
        "total_items": (
            len(kb["action_items"])
            + len(kb["decisions"])
            + len(kb["topics"])
            + len(kb.get("recommendations", []))
        ),
        "open_action_items": len(open_items),
        "delegated_action_items": len(delegated_items),
        "pending_action_items": len(pending_items),
        "total_decisions": len(kb["decisions"]),
        "active_topics": len(
            [t for t in kb["topics"] if t.get("status") == "active"]
        ),
        "people_tracked": len(kb["people"]),
        "transcripts_processed": len(
            kb["extraction_state"].get("processed", [])
        ),
        "legacy_processed": len(
            kb["extraction_state"].get("legacy_processed", [])
        ),
        "pending_recommendations": len([
            r for r in kb.get("recommendations", [])
            if r.get("status") == "pending"
        ]),
    }
