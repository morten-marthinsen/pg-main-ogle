"""Module 1: Automation Opportunity Scanner
Reviews Christopher's open task load and flags delegation / automation
opportunities.  Heuristic pass always runs; AI pass runs when
ANTHROPIC_API_KEY is available."""

import re
import requests
from datetime import datetime, date, timedelta
from pathlib import Path
from .base import BriefingModule
from .clickup_helper import BASE_URL, CHRISTOPHER_USER_ID, filter_active_tasks, fetch_task_detail
from .m8_agent_status import _parse_build_state, AGENT_PATHS, PG_CREATIVE_OS

# Keywords that signal IC-level execution (should be delegated)
IC_KEYWORDS = [
    "copy", "script", "edit", "revision", "cuts", "a-roll", "b-roll",
    "thumbnail", "upload", "batch", "render", "export", "subtitle",
    "caption", "proof", "qc", "format",
]

# Keywords that signal VP/strategic-level work (keep)
VP_KEYWORDS = [
    "strategy", "pipeline", "framework", "hire", "onboard", "review",
    "brief", "plan", "prd", "architecture", "campaign", "leadership",
    "figma", "scorecard", "roadmap",
]


# Words too generic to use for fuzzy matching tasks → projects
GENERIC_WORDS = {
    "copy", "video", "ads", "ad", "the", "for", "and", "new", "draft",
    "create", "update", "review", "edit", "write", "add", "get", "set",
}


class AutomationScannerModule(BriefingModule):
    name = "Automation Opportunities"
    key = "m1_automation_scanner"
    setup_required = "—"

    @staticmethod
    def _fetch_agent_project_context() -> list:
        """Read all agents' SESSION-LOG.md Build States and extract project statuses."""
        context = []
        for agent_name, folder in AGENT_PATHS.items():
            session_log = PG_CREATIVE_OS / folder / "SESSION-LOG.md"
            if not session_log.exists():
                continue
            try:
                with open(session_log) as f:
                    lines = []
                    for i, line in enumerate(f):
                        if i >= 80:
                            break
                        lines.append(line)
                text = "".join(lines)
                parsed = _parse_build_state(text)
                for proj in parsed.get("projects", []):
                    # Use deliverable file path if available, fallback to SESSION-LOG.md
                    deliverable = proj.get("file")
                    file_path = f"{folder}/{deliverable}" if deliverable else f"{folder}/SESSION-LOG.md"
                    context.append({
                        "agent": agent_name,
                        "project": proj["name"],
                        "status": proj["status"],
                        "file": file_path,
                    })
                # Also capture phase/next as a general entry
                if parsed.get("phase") and parsed["phase"] != "unknown":
                    context.append({
                        "agent": agent_name,
                        "project": f"{agent_name} overall",
                        "status": parsed["phase"][:120],
                        "file": f"{folder}/SESSION-LOG.md",
                    })
            except Exception:
                continue
        return context

    @staticmethod
    def _match_task_to_projects(task_name: str, agent_context: list) -> list:
        """Fuzzy match a task name against known agent projects.

        Extracts meaningful words from the task name (excluding generic words)
        and checks if any appear in project names.
        """
        task_words = set(
            w for w in re.findall(r"[a-zA-Z0-9]+", task_name.lower())
            if w not in GENERIC_WORDS and len(w) > 2
        )
        if not task_words:
            return []

        matches = []
        for entry in agent_context:
            proj_lower = entry["project"].lower()
            matching_words = [w for w in task_words if w in proj_lower]
            if matching_words:
                matches.append(entry)
        return matches

    def fetch_data(self):
        token = self.env.get("CLICKUP_API_TOKEN", "")
        workspace_id = self.env.get("CLICKUP_WORKSPACE_ID", "")
        if not token or not workspace_id:
            raise RuntimeError("CLICKUP_API_TOKEN or CLICKUP_WORKSPACE_ID missing from .env")

        headers = {"Authorization": token, "Content-Type": "application/json"}

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
                },
                timeout=30,
            )
            resp.raise_for_status()
            batch = resp.json().get("tasks", [])
            if not batch:
                break
            all_tasks.extend(batch)
            if len(batch) < 100:
                break
            page += 1

        self.logger.info(f"[{self.key}] Fetched {len(all_tasks)} tasks for analysis")
        return all_tasks

    @staticmethod
    def _parse_due(task: dict):
        """Parse ClickUp due_date (epoch ms) to a date, or None."""
        raw = task.get("due_date")
        if not raw:
            return None
        return datetime.fromtimestamp(int(raw) / 1000).date()

    def _fetch_immediate_details(self, immediate: list) -> list:
        """Fetch full task descriptions for immediate delegation candidates."""
        token = self.env.get("CLICKUP_API_TOKEN", "")
        if not token:
            return immediate

        max_fetch = self.config.get("modules", {}).get(
            self.key, {}
        ).get("max_task_detail_fetch", 10)

        for entry in immediate[:max_fetch]:
            task_id = entry.get("id", "")
            if not task_id:
                entry["description"] = ""
                entry["tags"] = []
                continue

            detail = fetch_task_detail(task_id, token)
            if detail:
                desc = detail.get("text_content") or detail.get("description") or ""
                entry["description"] = desc[:500]
                entry["tags"] = [
                    tag.get("name", "") for tag in detail.get("tags", [])
                ]
            else:
                entry["description"] = ""
                entry["tags"] = []

        return immediate

    def analyze(self, tasks):
        if not tasks:
            return "_No open tasks to analyse._\n"

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
            return "_No active open tasks to analyse (all matched exclude statuses)._\n"

        today = date.today()
        four_weeks = today + timedelta(days=28)

        delegate_candidates = []
        vp_aligned = []
        unclear = []

        for t in tasks:
            name_lower = t.get("name", "").lower()
            assignees = t.get("assignees", [])
            multi_assigned = len(assignees) > 1

            is_ic = any(kw in name_lower for kw in IC_KEYWORDS)
            is_vp = any(kw in name_lower for kw in VP_KEYWORDS)

            due = self._parse_due(t)

            entry = {
                "id": t.get("id", ""),
                "name": t.get("name", "?"),
                "status": t.get("status", {}).get("status", "?"),
                "list": t.get("list", {}).get("name", "?"),
                "multi": multi_assigned,
                "assignee_count": len(assignees),
                "due": due,
                "due_str": due.strftime("%b %d") if due else "No date",
            }

            if is_ic and not is_vp:
                delegate_candidates.append(entry)
            elif is_vp:
                vp_aligned.append(entry)
            else:
                unclear.append(entry)

        # Split delegation candidates: immediate (<=4 weeks) vs backlog
        immediate = [d for d in delegate_candidates if d["due"] and d["due"] <= four_weeks]
        backlog = [d for d in delegate_candidates if not d["due"] or d["due"] > four_weeks]

        # Sort immediate by due date ascending (soonest first)
        immediate.sort(key=lambda d: d["due"])

        # Fetch full task descriptions for actionable delegation steps
        if immediate:
            immediate = self._fetch_immediate_details(immediate)

        lines = []

        # Delegation ratio
        total = len(tasks)
        delegate_pct = round(len(delegate_candidates) / total * 100) if total else 0
        lines.append(f"**Task altitude scan:** {total} open tasks\n")
        lines.append(
            f"- VP-aligned: {len(vp_aligned)} | "
            f"Delegate candidates: {len(delegate_candidates)} total "
            f"({len(immediate)} due within 4 weeks, {len(backlog)} beyond) ({delegate_pct}%) | "
            f"Unclear: {len(unclear)}\n"
        )

        if delegate_pct > 30:
            lines.append(
                f"> **Altitude warning:** {delegate_pct}% of your tasks look like "
                f"IC-level execution (Individual Contributor — hands-on production work "
                f"that a team member should own). Target: <=30%. Consider delegating.\n"
            )

        if immediate:
            lines.append("\n#### Delegation Candidates — Due Within 4 Weeks\n")
            lines.append("| Task | Status | Due | List | Why |")
            lines.append("|------|--------|-----|------|-----|")
            for d in immediate:
                reason = "IC-level execution"
                if d["multi"]:
                    reason += f" ({d['assignee_count']} assignees — hand off)"
                lines.append(
                    f"| {d['name'][:50].replace('|','–')} "
                    f"| {d['status']} "
                    f"| {d['due_str']} "
                    f"| {d['list'][:25].replace('|','–')} "
                    f"| {reason} |"
                )

        if backlog:
            lines.append(f"\n_...plus {len(backlog)} delegation candidates beyond 4 weeks or with no due date._\n")

        if vp_aligned:
            lines.append("\n#### VP-Aligned Tasks (keep)\n")
            for v in vp_aligned[:5]:
                due_note = f" — due {v['due_str']}" if v["due"] else ""
                lines.append(f"- **{v['name'][:55]}** — {v['status']} ({v['list'][:25]}){due_note}")

        # AI analysis — enhanced with task details for actionable delegation
        api_key = self.env.get("ANTHROPIC_API_KEY", "")
        if api_key and immediate:
            # Fetch agent project context for cross-referencing
            agent_context = self._fetch_agent_project_context()

            task_lines = []
            for d in immediate:
                line = f"- [{d['status']}] {d['name']} (due: {d['due_str']}, list: {d['list']})"
                if d.get("description"):
                    line += f"\n  Brief: {d['description'][:300]}"
                if d.get("tags"):
                    line += f"\n  Tags: {', '.join(d['tags'])}"
                # Cross-reference against agent projects
                matches = self._match_task_to_projects(d["name"], agent_context)
                if matches:
                    for m in matches[:2]:  # cap at 2 matches per task
                        line += (
                            f"\n  Existing work: {m['agent']} — {m['project']}: "
                            f"{m['status'][:100]} [see `{m['file']}`]"
                        )
                task_lines.append(line)
            task_summary = "\n".join(task_lines)

            ai_analysis = self.call_anthropic(
                system_prompt=(
                    "You are Orion, a strategic Chief of Staff. Christopher is the Interim Creative Lead "
                    "at Performance Golf on a 90-day path to VP.\n\n"
                    "His delegation ratio target is >=70% (work done by others, not him).\n"
                    "These are his IC-level tasks due within the next 4 weeks — the ones that "
                    "need immediate delegation attention. Each task includes its brief/description "
                    "when available. All tasks shown are CONFIRMED ACTIVE (not approved/done).\n\n"
                    "Some tasks include an 'Existing work' line showing what an agent has already "
                    "done on a matching project. Use this to inform your delegation moves.\n\n"
                    "Christopher has these delegation resources:\n"
                    "- **Neco** (AI copy agent): Can draft ad copy, hooks, scripts, CTAs, "
                    "video ad copy, and commercial scripts autonomously\n"
                    "- **Video editors**: Handle A-roll cuts, B-roll, renders, exports, "
                    "thumbnails, subtitles\n"
                    "- **Designers**: Handle visual assets, thumbnails, static images\n\n"
                    "For each task (or group of related tasks), provide a numbered "
                    "**Proposed Delegation Move** using the format below. Each field goes on its "
                    "own line with a blank line between fields for visual separation. Do NOT use "
                    "bullet prefixes (- or •) on the field lines.\n\n"
                    "Format:\n"
                    "### N. **[Task Title]**\n\n"
                    "**Delegate to:** [resource]\n\n"
                    "**What they need:** [context]\n\n"
                    "**Christopher approves:** [deliverable]\n\n"
                    "**Proposed Action Step:** \"[instruction]\"\n\n"
                    "**What's Already Done:** [summary + file path link]\n\n"
                    "Field details:\n"
                    "- **Delegate to:** Name the specific resource (Neco, video editor, "
                    "designer, Chris F, etc.)\n"
                    "- **What they need:** Based on the task brief, what context or assets "
                    "the delegatee needs to start\n"
                    "- **Christopher approves:** What specific deliverable Christopher "
                    "reviews before it ships\n"
                    "- **Proposed Action Step:** Write the EXACT instruction Orion will deliver "
                    "to the delegatee once Christopher approves. Write it as a direct message — "
                    "e.g., 'Neco: Draft 3 video ad copy variations for the SF2 Driver campaign "
                    "targeting T2 audience.' This must be specific enough that Orion can "
                    "send it as-is with no further clarification needed.\n"
                    "- **What's Already Done:** If the task has an 'Existing work' match, "
                    "summarize what's already been completed by the agent and include the "
                    "deliverable file path as a markdown link. If no existing work exists, "
                    "write 'No prior work found.'\n\n"
                    "Prioritize soonest-due items. Keep to 3-5 concrete moves max."
                ),
                user_content=task_summary,
                max_tokens=1000,
            )
            lines.append(f"\n#### Proposed Delegation Moves\n\n{ai_analysis}")

        return "\n".join(lines)
