"""Module 8: Agent Status
Reads each agent's SESSION-LOG.md Build State block and reports
session number, current phase, next steps, and blockers.
Includes a Neco seed section surfacing recommended next actions
and a daily skill-building micro-exercise.

Each agent uses a slightly different Build State format:
- Tess: ```yaml block with session_number, current_phase, blockers, next
- Orion:  ```yaml block with last_session, status
- Veda: session_number above yaml block; blockers as free text
- Neco: No yaml block; per-project markdown with Status/Next/Blockers bullets
"""

import re
import requests
from datetime import datetime, date, timedelta
from pathlib import Path
from .base import BriefingModule, MODULES_DIR
from .prd_context import SCORECARD_CONTEXT

# Resolve pg-creative-os root (modules/ → daily-briefing/ → _ops/ → orion/ → pg-creative-os/)
PG_CREATIVE_OS = MODULES_DIR.parent.parent.parent.parent

AGENT_PATHS = {
    "Orion": "orion-chief-of-staff",
    "Tess": "tess-strategic-scaling-system",
    "Veda": "veda-video-editing-agent",
    "Neco": "neco-neurocopy-agent",
}

# ClickUp constants for Neco seed (shared helper)
from .clickup_helper import BASE_URL, CHRISTOPHER_USER_ID, filter_active_tasks

# Keywords that signal Neco-relevant work
NECO_KEYWORDS = [
    "copy", "script", "hook", "brief", "angle", "vsl", "ad creation",
    "video ad copy", "ad copy", "headline", "cta",
]


def _parse_build_state(full_text: str) -> dict:
    """Extract key fields from the first ~80 lines of a SESSION-LOG.md.

    Handles multiple formats across agents by searching the full text
    (not just inside a YAML block) for known field patterns.
    """
    result = {}

    # Session number: try session_number first, then last_session (Orion)
    m = re.search(r"session_number:\s*(\d+)", full_text)
    if not m:
        m = re.search(r"last_session:\s*(\d+)", full_text)
    result["session"] = int(m.group(1)) if m else None

    # Phase/status: try current_phase first, then status (Orion)
    m = re.search(r"current_phase:\s*(.+)", full_text)
    if not m:
        m = re.search(r"^status:\s*(.+)", full_text, re.MULTILINE)
    result["phase"] = m.group(1).strip() if m else "unknown"

    # Version
    m = re.search(r"version:\s*\"?([^\"\n]+)\"?", full_text)
    result["version"] = m.group(1).strip() if m else ""

    # Blockers: try YAML list first, then free-text line
    m = re.search(r"blockers:\s*\[([^\]]*)\]", full_text)
    if m:
        inner = m.group(1).strip()
        result["blockers"] = (
            [b.strip().strip('"').strip("'") for b in inner.split(",") if b.strip()]
            if inner
            else []
        )
    else:
        m = re.search(r"blockers?:\s*(.+)", full_text)
        if m:
            val = m.group(1).strip()
            if val and val.lower() not in ("none", "[]", "—"):
                result["blockers"] = [val]
            else:
                result["blockers"] = []
        else:
            result["blockers"] = []

    # Next steps: numbered items with [P\d] tags (Tess format)
    next_steps = []
    for m in re.finditer(r"^\s+\d+\.\s+(.+)$", full_text, re.MULTILINE):
        line = m.group(1).strip()
        if re.match(r"\[P\d\]", line):
            next_steps.append(line)

    # Neco format: "- **Next**: ..." bullets
    if not next_steps:
        for m in re.finditer(r"^\s*-\s+\*\*Next\*\*:\s*(.+)", full_text, re.MULTILINE):
            next_steps.append(m.group(1).strip())

    result["next"] = next_steps

    # Neco per-project statuses (special handling)
    projects = []
    for m in re.finditer(
        r"^###\s+(.+)\n-\s+\*\*Status\*\*:\s*(.+)",
        full_text,
        re.MULTILINE,
    ):
        proj = {"name": m.group(1).strip(), "status": m.group(2).strip()}
        # Extract deliverable file path from **File**/**Files**/**Script** fields
        post_text = full_text[m.end():m.end() + 500]
        file_m = re.search(r"\*\*(?:File|Files|Script)\*\*:\s*`([^`]+)`", post_text)
        if file_m:
            proj["file"] = file_m.group(1)
        projects.append(proj)
    if projects:
        result["projects"] = projects

    return result


def _fetch_neco_tasks(env, logger):
    """Fetch ClickUp tasks relevant to Neco (copy/script/ad tasks)."""
    token = env.get("CLICKUP_API_TOKEN", "")
    workspace_id = env.get("CLICKUP_WORKSPACE_ID", "")
    if not token or not workspace_id:
        return []

    headers = {"Authorization": token, "Content-Type": "application/json"}
    try:
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

        # Filter out completed-like statuses (approved, done, etc.)
        all_tasks = filter_active_tasks(all_tasks)

        # Filter to Neco-relevant tasks
        neco_tasks = []
        for t in all_tasks:
            name_lower = t.get("name", "").lower()
            if any(kw in name_lower for kw in NECO_KEYWORDS):
                due_raw = t.get("due_date")
                due = datetime.fromtimestamp(int(due_raw) / 1000).date() if due_raw else None
                neco_tasks.append({
                    "name": t.get("name", "?"),
                    "status": t.get("status", {}).get("status", "?"),
                    "list": t.get("list", {}).get("name", "?"),
                    "due": due,
                    "due_str": due.strftime("%b %d") if due else "No date",
                })

        # Sort by due date (dated first, then undated)
        neco_tasks.sort(key=lambda t: (t["due"] is None, t["due"] or date.max))
        return neco_tasks

    except Exception as e:
        if logger:
            logger.warning(f"[m8_neco_seed] ClickUp fetch failed: {e}")
        return []


class AgentStatusModule(BriefingModule):
    name = "Agent Status"
    key = "m8_agent_status"
    setup_required = "—"

    def fetch_data(self):
        agents = {}
        for agent_name, folder in AGENT_PATHS.items():
            session_log = PG_CREATIVE_OS / folder / "SESSION-LOG.md"
            if not session_log.exists():
                agents[agent_name] = {"error": "SESSION-LOG.md not found"}
                continue

            try:
                with open(session_log) as f:
                    lines = []
                    for i, line in enumerate(f):
                        if i >= 80:
                            break
                        lines.append(line)
                text = "".join(lines)
                agents[agent_name] = _parse_build_state(text)
            except Exception as e:
                agents[agent_name] = {"error": str(e)}

        self.logger.info(f"[{self.key}] Parsed {len(agents)} agent Build States")

        # Fetch Neco-relevant ClickUp tasks for the seed section
        neco_tasks = _fetch_neco_tasks(self.env, self.logger)

        return {"agents": agents, "neco_tasks": neco_tasks}

    def analyze(self, data):
        agents = data.get("agents", {})
        neco_tasks = data.get("neco_tasks", [])

        if not agents:
            return "_No agent data available._\n"

        lines = []
        lines.append(f"**{len(agents)} agents** tracked across PG Creative OS.\n")

        # Status table
        lines.append("| Agent | Session | Status | Blockers |")
        lines.append("|-------|---------|--------|----------|")
        for agent_name, info in agents.items():
            if "error" in info:
                lines.append(f"| {agent_name} | — | {info['error']} | — |")
                continue
            session = f"S{info['session']:03d}" if info.get("session") else "?"
            phase = info.get("phase", "unknown")
            # Truncate phase for table readability
            if len(phase) > 65:
                phase = phase[:62] + "..."
            blockers = ", ".join(info.get("blockers", [])) or "None"
            if len(blockers) > 50:
                blockers = blockers[:47] + "..."
            lines.append(f"| {agent_name} | {session} | {phase} | {blockers} |")

        # Neco per-project statuses
        for agent_name, info in agents.items():
            projects = info.get("projects", [])
            if projects:
                lines.append(f"\n**{agent_name} Projects:**")
                for p in projects:
                    lines.append(f"- {p['name']}: {p['status']}")

        # Next steps by agent
        any_next = False
        for agent_name, info in agents.items():
            if "error" in info:
                continue
            next_steps = info.get("next", [])
            if next_steps:
                if not any_next:
                    lines.append("\n#### Next Steps\n")
                    any_next = True
                lines.append(f"**{agent_name}:**")
                for step in next_steps:
                    lines.append(f"- {step}")
                lines.append("")

        if not any_next:
            lines.append("\n_No pending next steps across agents._\n")

        # ── Neco Seed: Recommended Next Actions ──────────────────────────
        neco_info = agents.get("Neco", {})
        neco_projects = neco_info.get("projects", [])

        lines.append("\n#### Neco: Recommended Next Actions\n")

        if neco_tasks:
            lines.append("**Ready for Neco to draft** (ordered by due date):\n")
            for i, t in enumerate(neco_tasks[:8], 1):
                lines.append(
                    f"{i}. **{t['name'][:55]}** — due {t['due_str']} "
                    f"({t['status']}, {t['list'][:25]})"
                )
            if len(neco_tasks) > 8:
                lines.append(f"\n_...plus {len(neco_tasks) - 8} more Neco-eligible tasks._")
            lines.append("")
        else:
            lines.append("_No Neco-eligible tasks found in ClickUp._\n")

        # AI-generated skill-building suggestion
        api_key = self.env.get("ANTHROPIC_API_KEY", "")
        if api_key:
            project_context = ""
            if neco_projects:
                project_context = "Neco's current projects:\n" + "\n".join(
                    f"- {p['name']}: {p['status']}" for p in neco_projects
                )

            task_context = ""
            if neco_tasks:
                task_context = "\nNeco-eligible ClickUp tasks:\n" + "\n".join(
                    f"- {t['name']} (due: {t['due_str']})" for t in neco_tasks[:5]
                )

            skill_suggestion = self.call_anthropic(
                system_prompt=(
                    "You are Orion, a strategic Chief of Staff. Christopher wants his AI copywriting "
                    "agent (Neco) to get 1-10% better every day as a copywriter.\n\n"
                    f"{SCORECARD_CONTEXT}\n\n"
                    "Based on Neco's current project state and upcoming tasks, suggest ONE specific "
                    "micro-exercise that would sharpen Neco's copywriting skills. This should be:\n"
                    "- Directly relevant to an active or upcoming project\n"
                    "- Completable in one session (15-30 min of human review time)\n"
                    "- Focused on a specific skill: hook writing, emotion-forward framing, "
                    "audience psychology, angle ideation, CTA optimization, etc.\n"
                    "- Framed as a concrete exercise (e.g., 'Rewrite the SF2-0003 opening using "
                    "3 different psychological frames' or 'Generate 10 hooks for the SpeedTrac "
                    "launch targeting frustrated mid-handicappers')\n\n"
                    "Output: A single paragraph (2-3 sentences). Start with the skill being trained, "
                    "then the exercise, then why it matters for the current project pipeline."
                ),
                user_content=(project_context + task_context) or "No project context available.",
                max_tokens=200,
            )
            lines.append(f"**Skill-building opportunity:** {skill_suggestion}")

        return "\n".join(lines)
