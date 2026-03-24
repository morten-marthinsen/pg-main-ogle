"""Shared ClickUp helper for daily briefing modules.

Centralizes ClickUp API constants, status filtering, and task
detail fetching so individual modules don't duplicate logic.
"""

import requests
from typing import List, Optional, Set

# ClickUp API v2
BASE_URL = "https://api.clickup.com/api/v2"
CHRISTOPHER_USER_ID = "88456385"

# Statuses that mean "done" in Christopher's workflow.
# These tasks should be excluded from active reports.
# Case-insensitive matching applied at filter time.
DEFAULT_EXCLUDE_STATUSES = {"approved", "closed", "done", "complete", "live"}


def filter_active_tasks(
    tasks: list,
    exclude_statuses: Optional[Set[str]] = None,
) -> list:
    """Remove tasks whose status matches any excluded status (case-insensitive).

    Args:
        tasks: Raw task dicts from ClickUp API.
        exclude_statuses: Set of lowercase status strings to exclude.
            Defaults to DEFAULT_EXCLUDE_STATUSES.

    Returns:
        Filtered list of tasks with completed-like statuses removed.
    """
    if exclude_statuses is None:
        exclude_statuses = DEFAULT_EXCLUDE_STATUSES

    return [
        t for t in tasks
        if t.get("status", {}).get("status", "").lower().strip()
        not in exclude_statuses
    ]


def fetch_task_detail(
    task_id: str,
    token: str,
    timeout: int = 15,
) -> Optional[dict]:
    """Fetch full task detail from ClickUp API v2.

    GET /task/{task_id}
    Returns the full task object including description, or None on failure.
    """
    headers = {"Authorization": token, "Content-Type": "application/json"}
    try:
        resp = requests.get(
            f"{BASE_URL}/task/{task_id}",
            headers=headers,
            params={"include_subtasks": "false"},
            timeout=timeout,
        )
        resp.raise_for_status()
        return resp.json()
    except Exception:
        return None


def fetch_task_comments(
    task_id: str,
    token: str,
    timeout: int = 15,
) -> List[dict]:
    """Fetch comments for a ClickUp task.

    GET /task/{task_id}/comment
    Returns list of comment dicts, or empty list on failure.
    """
    headers = {"Authorization": token, "Content-Type": "application/json"}
    try:
        resp = requests.get(
            f"{BASE_URL}/task/{task_id}/comment",
            headers=headers,
            timeout=timeout,
        )
        resp.raise_for_status()
        return resp.json().get("comments", [])
    except Exception:
        return []
