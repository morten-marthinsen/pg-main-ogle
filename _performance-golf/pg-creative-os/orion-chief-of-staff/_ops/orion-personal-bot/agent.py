"""Orion Agent — Claude-powered conversational assistant for task management.

Replaces the rigid intent→handler pipeline with a Claude conversation that has
access to today's tasks, KB operations, and full thread history. Every message
goes to Claude (Haiku for cost), which decides what to do naturally.

Architecture:
    Slack message → agent.process_message(text, thread_history) → Claude API
    Claude sees: system prompt (today's tasks, context) + thread history + tools
    Claude responds: natural language + optional tool calls
"""

from __future__ import annotations

import json
import logging
import os
import re
import subprocess
import time
from datetime import date, timedelta
from pathlib import Path
from typing import Optional

import anthropic

from kb_ops import (
    complete_task,
    create_task,
    find_open_tasks,
    fix_schedule_task,
    get_day_tasks,
    read_google_doc,
    reschedule_task,
    save_context_file,
    send_slack_dm,
    suggest_schedule,
)
from checkin import run_checkin
from checkin_state import clear_suggestion, resolve_suggestion
from delegation_engine import build_agent_prompt, build_human_dm

logger = logging.getLogger(__name__)

# Daily report directory
REPORTS_DIR = Path(__file__).resolve().parent.parent / "daily-reports"
WEEKDAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

# ── Tools for Claude ─────────────────────────────────────────────────────────

TOOLS = [
    {
        "name": "get_today_tasks",
        "description": (
            "Get today's ranked task list with ABC tiers and positions. "
            "Returns the same ranking Christopher sees in his daily report."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "complete_task",
        "description": (
            "Mark a task as done. Use the task ID (e.g., mi-042, ai-f8e2ecd8). "
            "Always confirm with Christopher before calling this."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "task_id": {
                    "type": "string",
                    "description": "The task ID (e.g., mi-042, ai-f8e2ecd8)",
                },
            },
            "required": ["task_id"],
        },
    },
    {
        "name": "create_task",
        "description": (
            "Create a new task. Generates an ID, scores priority, and suggests scheduling. "
            "Always confirm title and scheduling with Christopher before calling."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string",
                    "description": "Task title (concise, starts with a verb, <60 chars)",
                },
                "description": {
                    "type": "string",
                    "description": "Optional longer description or context",
                },
                "scheduled_date": {
                    "type": "string",
                    "description": "ISO date (YYYY-MM-DD) to schedule. If omitted, uses auto-suggest.",
                },
                "priority_tier": {
                    "type": "string",
                    "enum": ["A", "B", "C"],
                    "description": "Priority tier override. If omitted, auto-scored.",
                },
            },
            "required": ["title"],
        },
    },
    {
        "name": "reschedule_task",
        "description": (
            "Move a task to a different day. Accepts task IDs or day names."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "task_id": {
                    "type": "string",
                    "description": "The task ID (e.g., mi-042)",
                },
                "new_date": {
                    "type": "string",
                    "description": "Day name (monday, tomorrow, wed) or ISO date (2026-03-12)",
                },
            },
            "required": ["task_id", "new_date"],
        },
    },
    {
        "name": "list_open_tasks",
        "description": (
            "Search or list all open tasks. Optionally fuzzy-match by query string."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "Optional search query for fuzzy matching",
                },
            },
            "required": [],
        },
    },
    {
        "name": "regenerate_report",
        "description": (
            "Regenerate today's daily briefing report so it reflects task changes "
            "(completions, reschedules, new tasks). Call this AFTER any task-modifying "
            "operation so Christopher's brief stays current. No confirmation needed."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "save_context",
        "description": (
            "Save a Slack message as contextual knowledge to the shared context library. "
            "Creates a markdown file with YAML frontmatter in _shared/context-library/. "
            "Always propose the metadata and wait for Christopher's confirmation before calling."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "filename": {
                    "type": "string",
                    "description": "Filename without .md (e.g., 2026-03-12-mcginley-sf2-pricing-feedback)",
                },
                "product": {
                    "type": "string",
                    "description": "Product slug: sf2, spd, one1, dqfe, brixton, hank-haney, andrew-rice, or general",
                },
                "tags": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Descriptive tags (e.g., product-feedback, pricing, strategy)",
                },
                "summary": {
                    "type": "string",
                    "description": "One-line summary of the context being saved",
                },
                "author": {
                    "type": "string",
                    "description": "Name of the person who wrote the original message",
                },
                "source_channel": {
                    "type": "string",
                    "description": "Slack channel name where the message was posted",
                },
                "source_channel_id": {
                    "type": "string",
                    "description": "Slack channel ID (C0XXXXXXX)",
                },
                "message_ts": {
                    "type": "string",
                    "description": "Slack message timestamp",
                },
                "message_text": {
                    "type": "string",
                    "description": "The full message text to save",
                },
            },
            "required": ["filename", "product", "tags", "summary", "author", "message_text"],
        },
    },
    {
        "name": "read_google_doc",
        "description": (
            "Read a Google Doc and return its content as plain text. "
            "Use this when a Slack message contains a Google Docs URL — extract the doc ID "
            "from the URL and call this tool to read the document content."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "doc_url_or_id": {
                    "type": "string",
                    "description": (
                        "A Google Docs URL (e.g., https://docs.google.com/document/d/DOC_ID/edit) "
                        "or a bare document ID"
                    ),
                },
            },
            "required": ["doc_url_or_id"],
        },
    },
    {
        "name": "fix_schedule",
        "description": (
            "Manually fix a task's scheduled date in .kb-schedule.json. "
            "Use when a task exists in the KB but has no scheduled date, "
            "or when Christopher says a task should be on a specific day but isn't showing up."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "task_id": {
                    "type": "string",
                    "description": "The task ID (e.g., mi-057)",
                },
                "scheduled_date": {
                    "type": "string",
                    "description": "ISO date to schedule (YYYY-MM-DD) or day name (tomorrow, monday)",
                },
            },
            "required": ["task_id", "scheduled_date"],
        },
    },
    {
        "name": "trigger_checkin",
        "description": (
            "Trigger an immediate check-in message — posts the task pulse + delegation ideas "
            "to Christopher's Slack DM right now, regardless of the hourly schedule. "
            "Use when Christopher says 'check in', 'what should I work on', or 'where do I stand'."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "resolve_checkin_code",
        "description": (
            "Look up a check-in suggestion code (e.g., '01', '02') and return the full "
            "agent prompt or human Slack DM draft for Christopher to approve. "
            "Use when Christopher replies with a 2-digit number to a check-in message."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "string",
                    "description": "2-digit suggestion code (e.g., '01', '02')",
                },
            },
            "required": ["code"],
        },
    },
    {
        "name": "send_slack_dm",
        "description": (
            "Send a Slack DM to a team member. Only call this AFTER Christopher has "
            "explicitly approved the message draft. Never send without approval."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "slack_id": {
                    "type": "string",
                    "description": "Slack user ID of the recipient (e.g., U0AGMC1EMM4)",
                },
                "message": {
                    "type": "string",
                    "description": "The message text to send",
                },
            },
            "required": ["slack_id", "message"],
        },
    },
]


# ── Tool Execution ───────────────────────────────────────────────────────────


def execute_tool(tool_name: str, tool_input: dict) -> str:
    """Execute a tool call and return the result as a string."""
    try:
        if tool_name == "get_today_tasks":
            # Use the report-based ID map for consistent rankings
            id_map = _build_task_id_map()
            if not id_map:
                return "No tasks scheduled for today."
            lines = []
            for pos, info in sorted(id_map.items()):
                lines.append(f"{pos} → {info['text']}")
            return "\n".join(lines)

        elif tool_name == "complete_task":
            task_id = tool_input["task_id"]
            success = complete_task(task_id)
            if success:
                return f"Task {task_id} marked as done."
            else:
                return f"Could not complete {task_id} — not found or already closed."

        elif tool_name == "create_task":
            title = tool_input["title"]
            desc = tool_input.get("description", "")
            sched = tool_input.get("scheduled_date")
            tier = tool_input.get("priority_tier")

            # Auto-suggest if no date given
            if not sched:
                suggestion = suggest_schedule(title)
                sched = suggestion.get("date")
                if not tier:
                    tier = suggestion.get("tier")

            item = create_task(
                title=title,
                description=desc,
                source_info="orion-personal-bot",
                scheduled_date=sched,
                priority_tier=tier,
            )
            verified = item.get("_schedule_verified")
            if sched and not verified:
                sched_status = f"SCHEDULE WRITE FAILED — intended {sched}, not saved. Run /fix-schedule {item['id']} {sched} to recover."
            elif verified:
                sched_status = f"{verified} (verified)"
            else:
                sched_status = "unscheduled"
            return (
                f"Created task {item['id']}: {title}\n"
                f"Scheduled: {sched_status}, Tier: {tier or 'auto'}"
            )

        elif tool_name == "reschedule_task":
            task_id = tool_input["task_id"]
            new_date = tool_input["new_date"]
            success = reschedule_task(task_id, new_date)
            if success:
                return f"Rescheduled {task_id} to {new_date}."
            else:
                return f"Could not reschedule {task_id} — not found or bad date."

        elif tool_name == "list_open_tasks":
            query = tool_input.get("query")
            tasks = find_open_tasks(query)
            if not tasks:
                return "No open tasks found." + (f" (searched: '{query}')" if query else "")
            lines = []
            for t in tasks[:15]:
                sim = t.get("_similarity", "")
                sim_str = f" (match: {sim:.0%})" if sim else ""
                lines.append(f"  {t.get('id', '?')}: {t.get('text', '?')}{sim_str}")
            result = f"{len(tasks)} open task(s):\n" + "\n".join(lines)
            if len(tasks) > 15:
                result += f"\n  ...and {len(tasks) - 15} more"
            return result

        elif tool_name == "regenerate_report":
            return _regenerate_report()

        elif tool_name == "save_context":
            frontmatter = {
                "type": "context",
                "source_channel": tool_input.get("source_channel", ""),
                "source_channel_id": tool_input.get("source_channel_id", ""),
                "message_ts": tool_input.get("message_ts", ""),
                "author": tool_input["author"],
                "date": date.today().isoformat(),
                "product": tool_input["product"],
                "tags": tool_input["tags"],
                "summary": tool_input["summary"],
            }
            body = tool_input["message_text"]
            filepath = save_context_file(tool_input["filename"], frontmatter, body)
            return f"Context saved: {filepath.name}"

        elif tool_name == "read_google_doc":
            raw = tool_input["doc_url_or_id"]
            # Extract doc ID from URL if needed
            doc_id_match = re.search(r"/document/d/([a-zA-Z0-9_-]+)", raw)
            if doc_id_match:
                doc_id = doc_id_match.group(1)
            else:
                doc_id = raw.strip()
            content = read_google_doc(doc_id)
            return content

        elif tool_name == "fix_schedule":
            task_id = tool_input["task_id"]
            raw_date = tool_input["scheduled_date"]
            success, result_date = fix_schedule_task(task_id, raw_date)
            if success:
                return f"Scheduled {task_id} to {result_date} (verified in KB)."
            else:
                return f"Fix failed for {task_id}: {result_date}"

        elif tool_name == "trigger_checkin":
            msg = run_checkin(force=True)
            if msg:
                return "Check-in posted to your Slack DM."
            return "Check-in skipped — no open tasks or posting failed."

        elif tool_name == "resolve_checkin_code":
            code = tool_input["code"].strip().zfill(2)
            suggestion = resolve_suggestion(code)
            if not suggestion:
                return f"No suggestion found for code {code}. The check-in may have expired — send 'check in' to get a fresh one."

            task_id = suggestion["task_id"]
            task_text = suggestion["task_text"]
            stype = suggestion["type"]
            target = suggestion["target"]

            if stype == "agent":
                # Build full agent prompt
                task = {"id": task_id, "text": task_text}
                prompt = build_agent_prompt(task, target)
                return (
                    f"*{code} → {target} prompt ready*\n\n"
                    f"```\n{prompt}\n```\n\n"
                    f"Copy this into a {target} Claude Code session. "
                    f"Reply *confirmed* once you've kicked it off and I'll clear this from your list."
                )
            elif stype == "human":
                slack_id = suggestion.get("slack_id", "")
                task = {"id": task_id, "text": task_text}
                dm_draft = build_human_dm(task, target)
                return (
                    f"*{code} → DM draft for {target}*\n\n"
                    f"{dm_draft}\n\n"
                    f"Reply *send* to send this, or edit the draft first."
                )
            else:
                return f"Code {code} is marked 'keep' — no delegation to run."

        elif tool_name == "send_slack_dm":
            slack_id = tool_input["slack_id"]
            message = tool_input["message"]
            success = send_slack_dm(slack_id, message)
            if success:
                return f"DM sent to {slack_id}."
            return f"DM send failed to {slack_id} — check logs."

        else:
            return f"Unknown tool: {tool_name}"

    except Exception as e:
        logger.error(f"Tool execution error ({tool_name}): {e}")
        return f"Error executing {tool_name}: {e}"


def _regenerate_report() -> str:
    """Quick-refresh today's daily briefing report.

    Runs quick_refresh.py which surgically re-renders only the task sections
    (M00a, M0b, M0) and patches them into the existing report. Takes ~10-20s
    vs ~10 min for the full pipeline.
    """
    briefing_dir = Path(__file__).resolve().parent.parent / "daily-briefing"
    python_bin = briefing_dir / ".venv" / "bin" / "python3"
    script = briefing_dir / "quick_refresh.py"

    if not python_bin.exists():
        return f"Error: daily-briefing venv not found at {python_bin}"
    if not script.exists():
        return f"Error: quick_refresh.py not found at {script}"

    try:
        result = subprocess.run(
            [str(python_bin), str(script)],
            cwd=str(briefing_dir),
            capture_output=True,
            text=True,
            timeout=60,
        )

        if result.returncode == 0:
            # Parse output
            report_path = ""
            duration = ""
            for line in result.stdout.splitlines():
                if line.startswith("REPORT_PATH="):
                    report_path = line.split("=", 1)[1]
                elif line.startswith("DURATION="):
                    duration = line.split("=", 1)[1]
            logger.info(f"Report refreshed in {duration}: {report_path}")
            return f"Daily brief updated ({duration}). Task sections refreshed."
        else:
            error_tail = (result.stderr or result.stdout or "unknown error")[-300:]
            logger.error(f"Report refresh failed: {error_tail}")
            return f"Report refresh failed: {error_tail}"

    except subprocess.TimeoutExpired:
        return "Report refresh timed out (60s limit)."
    except Exception as e:
        return f"Error refreshing report: {e}"


# ── Report Parsing ───────────────────────────────────────────────────────────


def _load_today_report_tasks() -> str:
    """Parse today's daily report to extract the ABC task list.

    Returns a formatted string of today's tasks as they appear in the report,
    which is the ground truth for what Christopher sees.
    """
    today = date.today()
    # Find today's report — directory pattern: {mon}-26-reports (e.g., mar-26-reports)
    month_abbr = today.strftime("%b").lower()
    month_dir = REPORTS_DIR / f"{month_abbr}-26-reports"
    report_path = month_dir / f"{today.isoformat()}.md"

    if not report_path.exists():
        # Fall back to programmatic ranking
        return _programmatic_task_list()

    try:
        text = report_path.read_text(encoding="utf-8")
    except Exception:
        return _programmatic_task_list()

    # Extract the "Today at a Glance" section (M00a)
    glance_match = re.search(
        r"<!-- M00a:START -->\s*\n(.*?)\n\s*<!-- M00a:END -->",
        text,
        re.DOTALL,
    )
    if not glance_match:
        return _programmatic_task_list()

    glance = glance_match.group(1)

    # Also extract the Action Items Tracker table for IDs
    # The M0 table has Priority | Item | Type | Deadline | Why
    tracker_match = re.search(
        r"### (?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), .*?\(TODAY\)\s*\n\n"
        r"\| Priority.*?\n\|[-| ]+\n((?:\|.*?\n)*)",
        text,
    )

    id_map = {}
    if tracker_match:
        for row in tracker_match.group(1).strip().split("\n"):
            cols = [c.strip() for c in row.split("|")[1:-1]]
            if len(cols) >= 2:
                priority = cols[0].replace("**", "").strip()
                item_text = cols[1].strip()[:60]
                id_map[item_text[:40]] = priority  # Map text fragment to priority

    # Build the task context from the glance section
    # Also get IDs from get_day_tasks for tool operations
    tasks = get_day_tasks(today)
    task_by_text = {}
    for t in tasks:
        # Use first 40 chars of text as a key
        key = t.get("text", "")[:40]
        task_by_text[key] = t.get("id", "?")

    return glance


def _programmatic_task_list() -> str:
    """Fallback: build task list from KB data when no report exists."""
    tasks = get_day_tasks(date.today())
    if not tasks:
        return "No tasks scheduled for today."
    lines = []
    for t in tasks:
        tier = t.get("_tier", "C")
        rank = t.get("_tier_rank", "")
        pos = f"{tier}{rank}" if tier in ("A", "B") else f"C{rank}"
        lines.append(f"  {pos}: {t.get('text', '?')} (id: {t.get('id', '?')})")
    return "\n".join(lines)


def _build_task_id_map() -> dict:
    """Build a mapping of position (A1, B1) → {id, text} from today's report.

    Parses the M0 Action Items Tracker table in the rendered report, then
    fuzzy-matches each row's text against open KB/manual items to find the ID.
    This ensures the ID map matches what Christopher sees in his report.
    """
    today = date.today()
    month_abbr = today.strftime("%b").lower()
    report_path = REPORTS_DIR / f"{month_abbr}-26-reports" / f"{today.isoformat()}.md"

    # Load ALL items (not just open) for ID matching — the report may reference
    # items in any status, and we need to match them all
    from kb_ops import load_kb, _load_manual_items
    all_items = []
    kb = load_kb()
    all_items.extend(kb.get("action_items", []))
    mi = _load_manual_items()
    all_items.extend(mi.get("action_items", []))

    text_to_id = {}
    for item in all_items:
        text_to_id[item.get("text", "").lower().strip()] = item.get("id", "?")

    id_map = {}

    if report_path.exists():
        try:
            report_text = report_path.read_text(encoding="utf-8")

            # Extract only the TODAY section from M0 table
            today_section = re.search(
                r"###.*?\(TODAY\)\s*\n\n\|.*?\n\|[-| ]+\n((?:\|.*?\n)*)",
                report_text,
            )
            if today_section:
                today_rows = today_section.group(1)
            else:
                today_rows = report_text  # fallback: scan full report

            # Parse table rows: | **A1** | Item text | Type | Deadline | Why |
            for match in re.finditer(
                r"\|\s*\*{0,2}([ABC]\d+)\*{0,2}\s*\|\s*(.+?)\s*\|",
                today_rows,
            ):
                pos = match.group(1).upper()
                item_text = match.group(2).strip()

                # Find matching ID via fuzzy match
                item_id = _match_text_to_id(item_text, text_to_id)
                id_map[pos] = {
                    "id": item_id,
                    "text": item_text[:80],
                }
        except Exception as e:
            logger.warning(f"Failed to parse report for ID map: {e}")

    # Fallback to programmatic ranking if report parsing failed
    if not id_map:
        tasks = get_day_tasks(today)
        for t in tasks:
            tier = t.get("_tier", "C")
            rank = t.get("_tier_rank", "")
            pos = f"{tier}{rank}" if tier in ("A", "B") else f"C{rank}"
            id_map[pos] = {
                "id": t.get("id", "?"),
                "text": t.get("text", "?"),
            }

    return id_map


def _match_text_to_id(report_text: str, text_to_id: dict) -> str:
    """Match a report row's text to an open item's ID via multi-strategy matching.

    Strategies (in order):
    1. Exact match
    2. Prefix match (first 30 chars)
    3. Key-word overlap (important nouns)
    4. SequenceMatcher fuzzy (threshold 0.45)
    """
    from difflib import SequenceMatcher

    report_lower = report_text.lower().strip()

    # 1. Exact match
    if report_lower in text_to_id:
        return text_to_id[report_lower]

    # 2. Prefix match (first 30 chars of either)
    for kb_text, item_id in text_to_id.items():
        if (kb_text[:30] == report_lower[:30]) or \
           kb_text.startswith(report_lower[:30]) or \
           report_lower.startswith(kb_text[:30]):
            return item_id

    # 3. Keyword overlap — extract significant words and check overlap
    report_words = set(re.findall(r"[a-z]{4,}", report_lower))
    # Remove common words
    stopwords = {"with", "from", "that", "this", "have", "been", "will", "into",
                 "task", "team", "also", "once", "them", "their", "about", "should"}
    report_words -= stopwords

    best_id = "?"
    best_score = 0.0

    for kb_text, item_id in text_to_id.items():
        kb_words = set(re.findall(r"[a-z]{4,}", kb_text)) - stopwords
        if report_words and kb_words:
            overlap = len(report_words & kb_words)
            union = len(report_words | kb_words)
            jaccard = overlap / union if union else 0
            if jaccard > best_score:
                best_score = jaccard
                best_id = item_id

    if best_score >= 0.2:
        return best_id

    # 4. SequenceMatcher fallback
    best_id = "?"
    best_ratio = 0.0
    for kb_text, item_id in text_to_id.items():
        ratio = SequenceMatcher(None, report_lower[:60], kb_text[:60]).ratio()
        if ratio > best_ratio:
            best_ratio = ratio
            best_id = item_id

    return best_id if best_ratio >= 0.40 else "?"


# ── System Prompt ────────────────────────────────────────────────────────────


def build_system_prompt() -> str:
    """Build the system prompt with today's context."""
    today = date.today()
    day_name = WEEKDAY_NAMES[today.weekday()]

    report_tasks = _load_today_report_tasks()
    task_id_map = _build_task_id_map()

    # Format the ID map so Claude can resolve tier refs to IDs
    id_lines = []
    for pos, info in sorted(task_id_map.items()):
        id_lines.append(f"  {pos} → {info['id']} ({info['text'][:50]})")
    id_map_str = "\n".join(id_lines) if id_lines else "  (no tasks scheduled)"

    return f"""\
You are Orion, Christopher's personal task management assistant at Performance Golf. \
You run as a Slack bot in his DMs. Be concise, direct, and helpful.

Today is {day_name}, {today.strftime('%B %d, %Y')}.

## Today's Tasks (from daily report)
{report_tasks}

## Task ID Map (for tool operations)
{id_map_str}

## How to handle requests

**Task completion**: When Christopher says a task is done (e.g., "B1 is finished", \
"done with the quiz concept", "mark mi-042 done"), identify the task using the Task ID Map \
above, then respond with the task name and ID and ask "Want me to mark it done?" \
Do NOT call the complete_task tool until Christopher confirms (yes/y/confirm). \
This is a two-step process: (1) identify and confirm, (2) execute after approval.

**Queries**: When he asks about today's tasks, what's on the schedule, or what a \
specific position (A1, B2) refers to — answer from the task list above.

**Formatting**: Never show item IDs (ai-xxx, mi-xxx) in responses. Christopher doesn't \
need to see internal codes. Format task lists as: "A1 → Task description". Use the \
Task ID Map internally for tool calls only.

**Task creation**: When he wants to add a task, confirm the title and scheduling \
before creating.

**Rescheduling**: When he wants to move a task, confirm and use reschedule_task.

**Check-in trigger**: When he says "check in", "where do I stand", or "what should I work on", \
call trigger_checkin immediately — it posts the full task pulse + delegation ideas to his DM.

**2-digit code replies**: If he replies with a number like "01" or "02", he is approving a \
check-in suggestion. Call resolve_checkin_code with that code to generate the full agent prompt \
or human DM draft. Present it and wait for "confirmed" (agent) or "send" (human DM) before acting.

**Delegation approvals**: \
- If he says "confirmed" after seeing an agent prompt → clear the suggestion from state (call \
  clear_suggestion with the task_id from the suggestion), tell him it's cleared from his list. \
- If he says "send" after seeing a human DM draft → call send_slack_dm with the slack_id and \
  message from the suggestion, then clear_suggestion. Never send without explicit "send" approval.

**Fix schedule**: When he says a task isn't showing up or "fix schedule for [task]", \
use fix_schedule to write the correct date.

**General conversation**: You can discuss tasks, priorities, strategy. If he corrects \
you about task rankings, defer to what he sees in his daily report — he's the authority.

**Saving context**: When Christopher uses the "Save Context" shortcut on a message, \
the bot may provide extracted content from Google Docs, PDFs, or Word documents \
directly in the prompt. Use ALL provided content (file text, Google Doc text, \
and message text) to intelligently propose metadata (product, tags, summary, filename). \
If file content is included in the prompt (between --- ATTACHED FILE and --- END FILE markers), \
READ AND USE THAT CONTENT — it has already been extracted for you. The text between those markers \
IS the document content, even if it was extracted via OCR from an image-based PDF. \
Do NOT say the file is blank or unreadable if there is text between those markers. \
Base your metadata proposal (product, tags, summary) on that extracted content. \
You should still call read_google_doc for any Google Doc URLs if instructed. \
Always present the proposal and wait for confirmation before calling save_context.

Product slugs: sf2, spd, one1, dqfe, brixton, hank-haney, andrew-rice, general.
Filename format: YYYY-MM-DD-author-slug-topic (e.g., 2026-03-12-mcginley-sf2-pricing-feedback).

## Rules
- Be brief. This is Slack, not email. 1-3 sentences is ideal.
- Use Slack mrkdwn formatting (*bold*, _italic_, `code`).
- When referencing tasks, include both the position (B1) and a brief title.
- ALWAYS use the Task ID Map above to resolve positions (A1, B1, etc.) to task IDs. \
The ID map is the source of truth — it matches the daily report Christopher sees.
- NEVER call complete_task, create_task, or reschedule_task without explicit confirmation first. \
State what you'll do, wait for "yes", then execute.
- AFTER any task-modifying tool call (complete_task, create_task, reschedule_task), \
ALWAYS call regenerate_report automatically — no confirmation needed. This keeps \
today's daily brief in sync with the changes you just made. Tell Christopher the \
brief has been updated.
- If you're unsure what he wants, ask a clarifying question — don't guess.
- Never fabricate task data. If you can't find a task, say so.
"""


# ── Thread History ───────────────────────────────────────────────────────────


class ThreadHistory:
    """In-memory thread history for multi-turn conversations."""

    def __init__(self, max_messages: int = 20, ttl_seconds: int = 3600):
        self._threads: dict[str, list] = {}
        self._timestamps: dict[str, float] = {}
        self._max_messages = max_messages
        self._ttl = ttl_seconds

    def add_user_message(self, thread_ts: str, text: str):
        self._ensure_thread(thread_ts)
        self._threads[thread_ts].append({"role": "user", "content": text})
        self._trim(thread_ts)

    def add_assistant_message(self, thread_ts: str, text: str):
        self._ensure_thread(thread_ts)
        self._threads[thread_ts].append({"role": "assistant", "content": text})
        self._trim(thread_ts)

    def get_messages(self, thread_ts: str) -> list:
        self._cleanup_expired()
        return list(self._threads.get(thread_ts, []))

    def _ensure_thread(self, thread_ts: str):
        if thread_ts not in self._threads:
            self._threads[thread_ts] = []
        self._timestamps[thread_ts] = time.time()

    def _trim(self, thread_ts: str):
        if len(self._threads[thread_ts]) > self._max_messages:
            self._threads[thread_ts] = self._threads[thread_ts][-self._max_messages:]

    def _cleanup_expired(self):
        now = time.time()
        expired = [ts for ts, t in self._timestamps.items() if now - t > self._ttl]
        for ts in expired:
            self._threads.pop(ts, None)
            self._timestamps.pop(ts, None)


# ── Agent Core ───────────────────────────────────────────────────────────────

# Module-level shared state
_client: anthropic.Anthropic | None = None
_system_prompt: str | None = None
_system_prompt_date: str | None = None
thread_history = ThreadHistory()


def _get_client() -> anthropic.Anthropic:
    global _client
    if _client is None:
        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            raise RuntimeError("ANTHROPIC_API_KEY not set")
        _client = anthropic.Anthropic(api_key=api_key)
    return _client


def _get_system_prompt() -> str:
    """Get system prompt, refreshing daily."""
    global _system_prompt, _system_prompt_date
    today = date.today().isoformat()
    if _system_prompt is None or _system_prompt_date != today:
        _system_prompt = build_system_prompt()
        _system_prompt_date = today
    return _system_prompt


def refresh_system_prompt():
    """Force refresh the system prompt (e.g., after a task change)."""
    global _system_prompt, _system_prompt_date
    _system_prompt = None
    _system_prompt_date = None


def process_message(text: str, thread_ts: str) -> str:
    """Process a message through the Claude agent.

    Args:
        text: The message text from Christopher
        thread_ts: Slack thread timestamp for conversation tracking

    Returns:
        The agent's response text for Slack
    """
    client = _get_client()
    system_prompt = _get_system_prompt()

    # Add user message to thread history
    thread_history.add_user_message(thread_ts, text)

    # Build messages from thread history
    messages = thread_history.get_messages(thread_ts)

    # Run the agent loop (handle tool calls)
    max_turns = 8
    for _ in range(max_turns):
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1500,
            system=system_prompt,
            messages=messages,
            tools=TOOLS,
        )

        # Check if we need to handle tool calls
        tool_calls = [b for b in response.content if b.type == "tool_use"]

        if not tool_calls:
            # Pure text response — extract and return
            text_parts = [b.text for b in response.content if b.type == "text"]
            reply = "\n".join(text_parts).strip()
            thread_history.add_assistant_message(thread_ts, reply)

            # Refresh system prompt if any task-modifying tool was called
            # (already handled in the tool_calls branch below)
            return reply

        # Process tool calls
        # First, add the assistant's response (with tool_use blocks) to messages
        messages.append({"role": "assistant", "content": response.content})

        # Execute each tool and build tool_result blocks
        tool_results = []
        task_modified = False
        for tc in tool_calls:
            logger.info(f"Tool call: {tc.name}({tc.input})")
            result = execute_tool(tc.name, tc.input)
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": tc.id,
                "content": result,
            })
            if tc.name in ("complete_task", "create_task", "reschedule_task"):
                task_modified = True

        messages.append({"role": "user", "content": tool_results})

        # Refresh system prompt after task modifications
        if task_modified:
            refresh_system_prompt()

    # If we hit max turns, return last text we got
    text_parts = [b.text for b in response.content if b.type == "text"]
    reply = "\n".join(text_parts).strip() or "I ran into an issue processing that. Could you try again?"
    thread_history.add_assistant_message(thread_ts, reply)
    return reply
