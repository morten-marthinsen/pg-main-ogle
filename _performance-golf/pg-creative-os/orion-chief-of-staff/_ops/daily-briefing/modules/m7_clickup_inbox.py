"""Module 7: ClickUp Inbox — Task Triage
Pulls all open tasks assigned to Christopher, groups by urgency
(overdue / today / this week / upcoming / no date), and produces
a prioritised briefing section."""

import requests
from datetime import datetime, date, timedelta
from .base import BriefingModule
from .clickup_helper import BASE_URL, CHRISTOPHER_USER_ID, filter_active_tasks, fetch_task_comments


class ClickUpInboxModule(BriefingModule):
    name = "ClickUp Inbox Triage"
    key = "m7_clickup_inbox"
    setup_required = "—"

    # ── fetch ────────────────────────────────────────────────────────────────

    def fetch_data(self):
        token = self.env.get("CLICKUP_API_TOKEN", "")
        workspace_id = self.env.get("CLICKUP_WORKSPACE_ID", "")
        if not token or not workspace_id:
            raise RuntimeError("CLICKUP_API_TOKEN or CLICKUP_WORKSPACE_ID missing from .env")

        headers = {"Authorization": token, "Content-Type": "application/json"}

        # Paginate through all open tasks assigned to Christopher
        all_tasks = []
        page = 0
        while True:
            resp = requests.get(
                f"{BASE_URL}/team/{workspace_id}/task",
                headers=headers,
                params={
                    "assignees[]": CHRISTOPHER_USER_ID,
                    "include_closed": "false",
                    "subtasks": "true",
                    "page": str(page),
                    "order_by": "due_date",
                },
                timeout=30,
            )
            resp.raise_for_status()
            batch = resp.json().get("tasks", [])
            if not batch:
                break
            all_tasks.extend(batch)
            if len(batch) < 100:  # ClickUp default page size
                break
            page += 1

        self.logger.info(f"[{self.key}] Fetched {len(all_tasks)} open tasks")

        # Fetch recent comments for overdue + today tasks (cap 10)
        exclude = set(
            self.config.get("clickup", {}).get("exclude_statuses", [])
        ) or None
        active = filter_active_tasks(all_tasks, exclude)
        today_date = date.today()

        urgent_tasks = []
        for t in active:
            if not t.get("due_date"):
                continue
            due = datetime.fromtimestamp(int(t["due_date"]) / 1000).date()
            if due <= today_date:
                urgent_tasks.append(t)

        cutoff = datetime.now() - timedelta(hours=24)
        comments_map = {}
        for t in urgent_tasks[:10]:
            task_id = t.get("id")
            if not task_id:
                continue
            raw_comments = fetch_task_comments(task_id, token)
            recent = [
                c for c in raw_comments
                if c.get("date") and datetime.fromtimestamp(int(c["date"]) / 1000) >= cutoff
            ]
            if recent:
                comments_map[task_id] = recent

        self.logger.info(
            f"[{self.key}] Fetched comments for {len(urgent_tasks[:10])} urgent tasks, "
            f"{sum(len(v) for v in comments_map.values())} recent comments"
        )

        return {"tasks": all_tasks, "comments": comments_map}

    # ── analyse ──────────────────────────────────────────────────────────────

    def analyze(self, data):
        # Unpack dict from fetch_data (backwards-compatible with raw list)
        if isinstance(data, dict):
            tasks = data.get("tasks", [])
            comments_map = data.get("comments", {})
        else:
            tasks = data
            comments_map = {}

        if not tasks:
            return "_No open tasks assigned to you in ClickUp._\n"

        # Filter out completed-like statuses (approved, done, etc.)
        exclude = set(
            self.config.get("clickup", {}).get("exclude_statuses", [])
        ) or None
        original_count = len(tasks)
        tasks = filter_active_tasks(tasks, exclude)
        self.logger.info(
            f"[{self.key}] After status filter: {len(tasks)} active "
            f"(from {original_count} fetched)"
        )
        if not tasks:
            return "_No active open tasks assigned to you in ClickUp._\n"

        today = date.today()
        end_of_week = today + timedelta(days=(6 - today.weekday()))  # Sunday

        # Filter: only tasks WITH a due date
        dated_tasks = [t for t in tasks if t.get("due_date")]
        undated_count = len(tasks) - len(dated_tasks)

        buckets = {
            "overdue": [],
            "today": [],
            "this_week": [],
            "upcoming": [],
        }

        for t in dated_tasks:
            due = datetime.fromtimestamp(int(t["due_date"]) / 1000).date()
            if due < today:
                buckets["overdue"].append(t)
            elif due == today:
                buckets["today"].append(t)
            elif due <= end_of_week:
                buckets["this_week"].append(t)
            else:
                buckets["upcoming"].append(t)

        # Sort each bucket by due date (nearest first)
        for bucket_list in buckets.values():
            bucket_list.sort(key=lambda t: int(t.get("due_date", 0)))

        # Build markdown
        lines = []
        lines.append(f"**{len(dated_tasks)} tasks with due dates** assigned to you.")
        if undated_count:
            lines.append(f"_({undated_count} additional tasks have no due date — excluded from this report.)_")
        lines.append("")

        # Summary counts
        counts = []
        if buckets["overdue"]:
            counts.append(f"**{len(buckets['overdue'])} overdue**")
        if buckets["today"]:
            counts.append(f"{len(buckets['today'])} due today")
        if buckets["this_week"]:
            counts.append(f"{len(buckets['this_week'])} due this week")
        if buckets["upcoming"]:
            counts.append(f"{len(buckets['upcoming'])} upcoming")
        lines.append(" | ".join(counts) + "\n")

        # Detail tables per bucket
        for label, emoji, tasks_in_bucket in [
            ("Overdue", "\U0001f534", buckets["overdue"]),
            ("Due Today", "\U0001f7e1", buckets["today"]),
            ("Due This Week", "\U0001f535", buckets["this_week"]),
            ("Upcoming", "\u26aa", buckets["upcoming"]),
        ]:
            if not tasks_in_bucket:
                continue
            lines.append(f"\n#### {emoji} {label} ({len(tasks_in_bucket)})\n")
            lines.append("| Task | Status | Due | List |")
            lines.append("|------|--------|-----|------|")
            for t in tasks_in_bucket:
                name = t.get("name", "?")[:55].replace("|", "\u2013")
                status = t.get("status", {}).get("status", "?")
                due_str = datetime.fromtimestamp(int(t["due_date"]) / 1000).strftime("%b %d")
                list_name = t.get("list", {}).get("name", "?")[:25].replace("|", "\u2013")
                lines.append(f"| {name} | {status} | {due_str} | {list_name} |")

        # Recent Task Messages section (comments from last 24h)
        if comments_map:
            lines.append("\n#### Recent Task Messages (last 24h)\n")
            lines.append("| Task | Author | Comment | Time |")
            lines.append("|------|--------|---------|------|")
            for task_id, comments in comments_map.items():
                task_name = "?"
                for t in tasks:
                    if t.get("id") == task_id:
                        task_name = t.get("name", "?")[:35].replace("|", "\u2013")
                        break
                for c in comments:
                    author = c.get("user", {}).get("username", "?")
                    text = (c.get("comment_text", "") or "")[:60].replace("|", "\u2013").replace("\n", " ")
                    comment_dt = datetime.fromtimestamp(int(c.get("date", 0)) / 1000)
                    time_str = comment_dt.strftime("%H:%M")
                    lines.append(f"| {task_name} | {author} | {text} | {time_str} |")

        # AI triage (if Anthropic key available) — bucketed with today's date
        api_key = self.env.get("ANTHROPIC_API_KEY", "")
        if api_key and dated_tasks:
            bucket_lines = [f"Today's date: {today.strftime('%b %d, %Y')}\n"]
            for label, tasks_in_bucket in [
                ("OVERDUE", buckets["overdue"]),
                ("DUE TODAY", buckets["today"]),
                ("DUE THIS WEEK", buckets["this_week"]),
                ("UPCOMING (not overdue)", buckets["upcoming"]),
            ]:
                if not tasks_in_bucket:
                    continue
                bucket_lines.append(f"\n## {label}")
                for t in tasks_in_bucket:
                    bucket_lines.append(
                        f"- [{t.get('status',{}).get('status','?')}] {t.get('name','?')} "
                        f"(due: {datetime.fromtimestamp(int(t['due_date'])/1000).strftime('%b %d')}, "
                        f"priority: {t.get('priority',{}).get('priority','none') if t.get('priority') else 'none'})"
                    )

            # Include recent comments context for AI triage
            if comments_map:
                bucket_lines.append("\n## RECENT TASK COMMENTS (last 24h)")
                for task_id, comments in comments_map.items():
                    task_name = "?"
                    for t in tasks:
                        if t.get("id") == task_id:
                            task_name = t.get("name", "?")
                            break
                    for c in comments:
                        author = c.get("user", {}).get("username", "?")
                        text = (c.get("comment_text", "") or "")[:120]
                        bucket_lines.append(f"- [{task_name}] {author}: {text}")

            task_summary = "\n".join(bucket_lines)
            ai_analysis = self.call_anthropic(
                system_prompt=(
                    "You are Orion, a strategic Chief of Staff. Christopher is the Interim Creative Lead "
                    "at Performance Golf on a 90-day path to VP. His time must be spent at VP altitude — "
                    "strategy, delegation, visible leadership — not IC execution.\n\n"
                    "Review his ClickUp task list below. Tasks are organized by urgency bucket "
                    "(OVERDUE, DUE TODAY, DUE THIS WEEK, UPCOMING). Today's date is included at "
                    "the top. All tasks shown are CONFIRMED ACTIVE — completed/approved/done/live "
                    "statuses have already been filtered out.\n\n"
                    "If RECENT TASK COMMENTS are included, factor them into your triage — they "
                    "indicate active conversations or blockers that need attention.\n\n"
                    "In 3-5 numbered points (1. 2. 3.):\n"
                    "1. Flag overdue items (from the OVERDUE section only) that need immediate action\n"
                    "2. Identify tasks that should be delegated (IC-level work)\n"
                    "3. Note any tasks that align with VP-level scorecard priorities\n"
                    "4. If task comments suggest someone is waiting on Christopher, flag it\n"
                    "IMPORTANT: Only tasks in the OVERDUE section are overdue. Tasks in UPCOMING "
                    "are NOT overdue — do not misreport them. Keep it concise and actionable."
                ),
                user_content=task_summary,
                max_tokens=500,
            )
            lines.append(f"\n#### AI Triage\n\n{ai_analysis}")

        return "\n".join(lines)
