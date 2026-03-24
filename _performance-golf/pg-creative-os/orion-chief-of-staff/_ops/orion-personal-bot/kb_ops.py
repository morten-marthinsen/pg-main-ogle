"""KB Operations — thin wrappers over existing daily-briefing modules.

All actual KB logic lives in daily-briefing/modules/transcript_kb.py and
daily-briefing/reconcile.py. This module adds bot-specific convenience
functions (next ID, create task, fuzzy find, schedule suggestion).
"""

import importlib
import importlib.util
import json
import logging
import sys
from datetime import date, timedelta
from difflib import SequenceMatcher
from pathlib import Path

logger = logging.getLogger(__name__)

# ── Import daily-briefing modules WITHOUT triggering modules/__init__.py ──
# The __init__.py eagerly imports all modules (Google Calendar, Gmail, etc.)
# which pulls in heavy deps (google-auth, etc.) not needed by this bot.
# We import transcript_kb, capacity_engine, and base directly by file path.

DAILY_BRIEFING_DIR = Path(__file__).resolve().parent.parent / "daily-briefing"
MODULES_DIR = DAILY_BRIEFING_DIR / "modules"


def _import_module_from_file(name: str, filepath: Path):
    """Import a Python module directly from a file path, bypassing __init__.py."""
    spec = importlib.util.spec_from_file_location(name, filepath)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[name] = mod
    spec.loader.exec_module(mod)
    return mod


# Pre-register modules.base (dependency of transcript_kb)
_base = _import_module_from_file("modules.base", MODULES_DIR / "base.py")
_transcript_kb = _import_module_from_file("modules.transcript_kb", MODULES_DIR / "transcript_kb.py")
_capacity_engine = _import_module_from_file("modules.capacity_engine", MODULES_DIR / "capacity_engine.py")

# Add daily-briefing to path for reconcile (top-level script, no __init__.py issue)
if str(DAILY_BRIEFING_DIR) not in sys.path:
    sys.path.insert(0, str(DAILY_BRIEFING_DIR))

from modules.transcript_kb import (
    KB_SCHEDULE_PATH,
    _similarity,
    load_completed_registry,
    load_kb,
    load_schedule,
    save_schedule,
)
from modules.capacity_engine import (
    DAY_TYPE_DEFAULTS,
    PriorityScorer,
    WEEKDAY_NAMES,
    WORK_WEEKDAYS,
    compute_day_capacity,
    load_work_blocks,
    next_weekday,
)
from reconcile import (
    MANUAL_ITEMS_PATH,
    SCHEDULE_PATH,
    load_json,
    mark_done,
    parse_day,
    reschedule,
    save_json,
)

# Load config for scorecard keywords
import yaml
CONFIG_PATH = DAILY_BRIEFING_DIR / "config.yaml"
PRIORITIES_PATH = DAILY_BRIEFING_DIR / ".kb-priorities.json"


def _load_config() -> dict:
    if CONFIG_PATH.exists():
        with open(CONFIG_PATH, encoding="utf-8") as f:
            return yaml.safe_load(f) or {}
    return {}


def _load_manual_items() -> dict:
    return load_json(MANUAL_ITEMS_PATH)


def _save_manual_items(data: dict) -> None:
    data["last_updated"] = date.today().isoformat()
    save_json(MANUAL_ITEMS_PATH, data)


# ── ID Generation ──────────────────────────────────────────────────────────


def get_next_mi_id() -> str:
    """Scan .kb-manual-items.json, find max mi-NNN, return mi-{N+1}."""
    data = _load_manual_items()
    max_num = 0
    for item in data.get("action_items", []):
        item_id = item.get("id", "")
        if item_id.startswith("mi-"):
            try:
                num = int(item_id.split("-")[1])
                max_num = max(max_num, num)
            except (ValueError, IndexError):
                pass
    return f"mi-{max_num + 1:03d}"


# ── Task Creation ──────────────────────────────────────────────────────────


def create_task(
    title: str,
    description: str = "",
    source_info: str = "orion-personal-bot",
    scheduled_date: str = None,
    priority_tier: str = None,
    position: int = None,
) -> dict:
    """Create a new task in .kb-manual-items.json and .kb-schedule.json.

    Returns the created item dict with its assigned ID.
    """
    item_id = get_next_mi_id()

    item = {
        "id": item_id,
        "text": title,
        "description": description,
        "owner": "Christopher",
        "status": "open",
        "source": source_info,
        "created_date": date.today().isoformat(),
        "scorecard_alignment": "",
    }

    if priority_tier:
        item["_priority_override"] = priority_tier

    # Add to manual items
    data = _load_manual_items()
    if "action_items" not in data:
        data["action_items"] = []
    data["action_items"].append(item)
    _save_manual_items(data)

    # Add to schedule
    schedule_verified = None
    if scheduled_date:
        schedule = load_schedule()
        schedule[item_id] = scheduled_date
        save_schedule(schedule)
        # Verify the entry actually landed in the file
        verified = load_schedule()
        if verified.get(item_id) == scheduled_date:
            schedule_verified = scheduled_date
        else:
            logger.error(
                f"Schedule write verification FAILED for {item_id}: "
                f"expected {scheduled_date}, got {verified.get(item_id)!r}"
            )

    item["_schedule_verified"] = schedule_verified
    logger.info(f"Created task {item_id}: {title} (scheduled: {scheduled_date}, verified: {schedule_verified})")
    return item


# ── Task Completion ────────────────────────────────────────────────────────


def complete_task(item_id: str) -> bool:
    """Mark a task as done using reconcile.mark_done().

    Returns True if task was found and marked done.
    """
    # Find the item
    item = None

    # Check manual items
    manual_data = _load_manual_items()
    for ai in manual_data.get("action_items", []):
        if ai.get("id") == item_id and ai.get("status") == "open":
            item = ai
            break

    # Check KB items
    if item is None:
        kb = load_kb()
        for ai in kb.get("action_items", []):
            if ai.get("id") == item_id and ai.get("status") in ("open", "pending"):
                item = ai
                break

    if item is None:
        return False

    schedule_data = load_json(SCHEDULE_PATH)
    registry = load_json(Path(str(SCHEDULE_PATH).replace("schedule", "completed-registry")))
    if "entries" not in registry:
        registry["entries"] = []

    mark_done(item, schedule_data, registry)

    # Save schedule and registry
    save_json(SCHEDULE_PATH, schedule_data)
    save_json(Path(str(SCHEDULE_PATH).replace("schedule", "completed-registry")), registry)

    return True


# ── Task Search ────────────────────────────────────────────────────────────


def find_open_tasks(query: str = None) -> list:
    """Load all open tasks from KB + manual items. Fuzzy match if query provided.

    Returns list of dicts, each with 'id', 'text', 'status', 'similarity' (if query).
    Sorted by similarity descending when query is provided.
    """
    all_items = []

    # KB items
    kb = load_kb()
    for ai in kb.get("action_items", []):
        if ai.get("status") in ("open", "pending"):
            all_items.append(ai)

    # Manual items
    manual_data = _load_manual_items()
    for ai in manual_data.get("action_items", []):
        if ai.get("status") == "open":
            all_items.append(ai)

    if query is None:
        return all_items

    # Fuzzy match
    query_lower = query.lower().strip()
    scored = []
    for item in all_items:
        text = item.get("text", "").lower().strip()
        sim = _similarity(query_lower, text)
        # Also check substring match (boosts short queries)
        if query_lower in text:
            sim = max(sim, 0.7)
        item_copy = dict(item)
        item_copy["_similarity"] = round(sim, 3)
        scored.append(item_copy)

    scored.sort(key=lambda x: x["_similarity"], reverse=True)
    return scored


def get_day_tasks(target_date: date) -> list:
    """Load all open tasks scheduled for a specific day, scored and ranked.

    Returns list of items with _priority_score, _tier, _tier_rank set.
    """
    # Build items list directly (reconcile.get_today_items has a bug with schedule wrapper)
    schedule = load_schedule()  # Returns flat {id: date_str} via transcript_kb
    target_iso = target_date.isoformat()

    # Load all open items
    kb = load_kb()
    kb_items = {i.get("id"): i for i in kb.get("action_items", []) if i.get("status") in ("open", "pending")}
    manual_data = _load_manual_items()
    manual_items = {i.get("id"): i for i in manual_data.get("action_items", []) if i.get("status") == "open"}
    all_items = {**kb_items, **manual_items}

    # Load priority overrides (.kb-priorities.json) so rankings match the daily report
    priority_overrides = {}
    if PRIORITIES_PATH.exists():
        try:
            with open(PRIORITIES_PATH, encoding="utf-8") as f:
                priority_overrides = json.load(f).get("priorities", {})
        except Exception:
            pass

    items = []
    for item_id, sched_date in schedule.items():
        if not isinstance(sched_date, str):
            continue
        if sched_date == target_iso and item_id in all_items:
            item = all_items[item_id]
            # Attach priority override if present
            if item_id in priority_overrides:
                item["_priority_override"] = priority_overrides[item_id]
            items.append(item)

    if not items:
        return []

    # Score them
    config = _load_config()
    scorecard_kw = config.get("intelligence", {}).get("scorecard_keywords", [])
    scorer = PriorityScorer(scorecard_keywords=scorecard_kw)

    weekday_name = WEEKDAY_NAMES[target_date.weekday()]
    day_type = DAY_TYPE_DEFAULTS.get(weekday_name, "execution")

    from modules.capacity_engine import classify_day_items
    classified = classify_day_items(items, target_date, day_type, scorer)

    # Flatten back to a single list with tier info
    result = []
    for tier in ("A", "B", "C"):
        for item in classified[tier]:
            result.append(item)

    return result


# ── Schedule Suggestion ────────────────────────────────────────────────────


def suggest_schedule(task_text: str, urgency_signals: list = None) -> dict:
    """Suggest the best day + tier + position for a new task.

    Returns: {
        "date": "YYYY-MM-DD",
        "date_label": "Tue, Mar 10",
        "day_type": "execution",
        "tier": "A" | "B" | "C",
        "position": 1-3,
        "score": 0.0-1.0,
        "score_breakdown": {...},
        "existing_tasks": [...],  # tasks already on that day in same tier
        "slots_remaining": int,
    }
    """
    config = _load_config()
    scorecard_kw = config.get("intelligence", {}).get("scorecard_keywords", [])
    scorer = PriorityScorer(scorecard_keywords=scorecard_kw)
    work_blocks = load_work_blocks()

    # Build a synthetic item for scoring
    item = {"text": task_text, "owner": "Christopher", "status": "open"}

    # Check urgency for deadline hints
    if urgency_signals:
        for sig in urgency_signals:
            sig_lower = sig.lower()
            if "asap" in sig_lower or "urgent" in sig_lower:
                item["deadline"] = date.today().isoformat()
            elif "eod" in sig_lower or "end of day" in sig_lower:
                item["deadline"] = date.today().isoformat()

    # Try today through next 7 weekdays
    today = date.today()
    best = None

    for offset in range(14):
        d = today + timedelta(days=offset)
        if d.weekday() not in WORK_WEEKDAYS:
            continue

        weekday_name = WEEKDAY_NAMES[d.weekday()]
        day_type = DAY_TYPE_DEFAULTS.get(weekday_name, "execution")

        # Score the item for this day
        score = scorer.score(dict(item), d, day_type)

        # Get existing tasks for this day
        day_tasks = get_day_tasks(d)
        a_count = sum(1 for t in day_tasks if t.get("_tier") == "A")
        b_count = sum(1 for t in day_tasks if t.get("_tier") == "B")

        # Determine tier
        if score >= 0.35 and a_count < 3:
            tier = "A"
            position = a_count + 1
            slots_remaining = 3 - a_count - 1
        elif score >= 0.15 and b_count < 3:
            tier = "B"
            position = b_count + 1
            slots_remaining = 3 - b_count - 1
        elif score >= 0.35 and b_count < 3:
            # A-tier score but A slots full — suggest as B
            tier = "B"
            position = b_count + 1
            slots_remaining = 3 - b_count - 1
        else:
            tier = "C"
            position = None
            c_count = sum(1 for t in day_tasks if t.get("_tier") == "C")
            slots_remaining = None  # No cap on C

        # Check if this day has room
        if tier == "A" and a_count >= 3:
            continue
        if tier == "B" and b_count >= 3:
            continue

        day_name = ["Mon", "Tue", "Wed", "Thu", "Fri"][d.weekday()]
        date_label = f"{day_name}, {d.strftime('%b %d')}"

        # Get same-tier tasks for context
        same_tier_tasks = [t for t in day_tasks if t.get("_tier") == tier]

        candidate = {
            "date": d.isoformat(),
            "date_label": date_label,
            "day_type": day_type,
            "tier": tier,
            "position": position,
            "score": round(score, 3),
            "score_breakdown": dict(item).get("_priority_factors", {}),
            "existing_tasks": [
                {"id": t.get("id"), "text": t.get("text", "")[:50], "score": t.get("_priority_score", 0)}
                for t in same_tier_tasks
            ],
            "slots_remaining": slots_remaining,
        }

        # Prefer today or tomorrow if they have room; otherwise first open day
        if best is None:
            best = candidate
            break  # Take the first viable day

    if best is None:
        # Fallback: today as C
        d = next_weekday(today)
        best = {
            "date": d.isoformat(),
            "date_label": f"{['Mon','Tue','Wed','Thu','Fri'][d.weekday()]}, {d.strftime('%b %d')}",
            "day_type": DAY_TYPE_DEFAULTS.get(WEEKDAY_NAMES[d.weekday()], "execution"),
            "tier": "C",
            "position": None,
            "score": 0.0,
            "score_breakdown": {},
            "existing_tasks": [],
            "slots_remaining": None,
        }

    return best


# ── Context Library ────────────────────────────────────────────────────────

CONTEXT_LIBRARY_DIR = Path(__file__).resolve().parent.parent.parent.parent / "_shared" / "context-library"


def save_context_file(filename: str, frontmatter: dict, body: str) -> Path:
    """Save a context file to _shared/context-library/ with YAML frontmatter.

    Handles filename collisions by appending -2, -3, etc.
    Returns the Path of the written file.
    """
    CONTEXT_LIBRARY_DIR.mkdir(parents=True, exist_ok=True)

    # Resolve collision
    stem = filename.removesuffix(".md")
    target = CONTEXT_LIBRARY_DIR / f"{stem}.md"
    counter = 2
    while target.exists():
        target = CONTEXT_LIBRARY_DIR / f"{stem}-{counter}.md"
        counter += 1

    # Write file with YAML frontmatter
    fm_str = yaml.dump(frontmatter, default_flow_style=False, sort_keys=False).strip()
    content = f"---\n{fm_str}\n---\n\n{body}\n"
    target.write_text(content, encoding="utf-8")

    logger.info(f"Saved context file: {target.name}")
    return target


def read_google_doc(doc_id: str) -> str:
    """Read a Google Doc and return its content as plain text.

    Uses the Google Docs API v1 with OAuth credentials from daily-briefing.
    Returns the document text content, truncated to ~4000 chars if very long.
    """
    import os
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build

    SCOPES = ["https://www.googleapis.com/auth/documents.readonly"]

    # Resolve paths relative to this file's directory
    bot_dir = Path(__file__).resolve().parent
    creds_env = os.environ.get("GOOGLE_DOCS_CREDENTIALS_PATH")
    token_env = os.environ.get("GOOGLE_DOCS_TOKEN_PATH")
    if not creds_env or not token_env:
        return "Error: GOOGLE_DOCS_CREDENTIALS_PATH and GOOGLE_DOCS_TOKEN_PATH must be set in .env"
    creds_path = bot_dir / creds_env
    token_path = bot_dir / token_env

    if not token_path.exists():
        raise RuntimeError(
            f"Google Docs token not found at {token_path}. "
            "Run: cd ../daily-briefing && python3 auth/docs_auth.py"
        )

    creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
        with open(token_path, "w") as f:
            f.write(creds.to_json())

    service = build("docs", "v1", credentials=creds)
    doc = service.documents().get(documentId=doc_id).execute()

    title = doc.get("title", "(Untitled)")
    # Extract plain text from document body
    text_parts = []
    for element in doc.get("body", {}).get("content", []):
        paragraph = element.get("paragraph", {})
        for pe in paragraph.get("elements", []):
            text_run = pe.get("textRun", {})
            content = text_run.get("content", "")
            if content:
                text_parts.append(content)

    full_text = "".join(text_parts).strip()

    # Truncate if very long (keep first ~4000 chars for Claude context)
    if len(full_text) > 4000:
        full_text = full_text[:4000] + "\n\n[...truncated — document is very long]"

    return f"Title: {title}\n\n{full_text}"


def reschedule_task(item_id: str, new_date_str: str) -> bool:
    """Reschedule a task to a new date. Returns True on success."""
    try:
        new_date = parse_day(new_date_str, date.today())
    except ValueError:
        try:
            new_date = date.fromisoformat(new_date_str)
        except ValueError:
            return False

    schedule = load_schedule()
    if item_id not in schedule:
        return False

    schedule[item_id] = new_date.isoformat()
    save_schedule(schedule)
    return True


def fix_schedule_task(item_id: str, date_str: str) -> tuple[bool, str]:
    """Write a schedule entry for a task, even if it wasn't previously scheduled.

    Unlike reschedule_task, this works for unscheduled tasks too.
    Verifies the write by re-reading the file.

    Returns:
        (True, date_iso) on success
        (False, error_message) on failure
    """
    try:
        new_date = parse_day(date_str, date.today())
    except ValueError:
        try:
            new_date = date.fromisoformat(date_str)
        except ValueError:
            return False, f"Could not parse date: {date_str!r}"

    date_iso = new_date.isoformat()
    schedule = load_schedule()
    schedule[item_id] = date_iso
    save_schedule(schedule)

    # Verify
    verified = load_schedule()
    if verified.get(item_id) == date_iso:
        logger.info(f"fix_schedule_task: {item_id} → {date_iso} (verified)")
        return True, date_iso
    else:
        logger.error(f"fix_schedule_task: write verification failed for {item_id}")
        return False, f"Write failed — expected {date_iso}, got {verified.get(item_id)!r}"


def send_slack_dm(slack_id: str, message: str) -> bool:
    """Send a Slack DM to a user by their Slack ID.

    Uses SLACK_BOT_TOKEN from environment. Returns True on success.
    """
    import os
    token = os.environ.get("SLACK_BOT_TOKEN", "")
    if not token:
        logger.error("send_slack_dm: SLACK_BOT_TOKEN not set")
        return False
    try:
        from slack_sdk import WebClient
        client = WebClient(token=token)
        client.chat_postMessage(channel=slack_id, text=message)
        logger.info(f"send_slack_dm: DM sent to {slack_id}")
        return True
    except Exception as e:
        logger.error(f"send_slack_dm: failed to DM {slack_id}: {e}")
        return False
