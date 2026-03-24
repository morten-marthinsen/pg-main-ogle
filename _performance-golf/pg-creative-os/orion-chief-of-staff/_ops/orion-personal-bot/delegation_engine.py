from __future__ import annotations

"""Delegation Engine — determines the best delegation opportunity for each open task.

Priority order:
  1. Agents (Neco, Tess, Veda, Orion) — checked first
  2. Humans (Fatima, Romeo, Morten, Chris Hibbert)
  3. Keep — if no match, task stays with Christopher

Returns a one-line recommendation + proof point for the hourly check-in message.
"""

import json
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

BOT_DIR = Path(__file__).resolve().parent
ROSTER_PATH = BOT_DIR / "team_roster.json"

# ── Agent routing rules ───────────────────────────────────────────────────────
# Each entry: (agent_name, [keywords that signal this agent])
AGENT_ROUTES = [
    ("Neco", [
        "copy", "hook", "script", "angle", "brief", "vsl", "headline", "ad copy",
        "vo script", "voiceover", "influencer", "nlc", "static image", "write",
        "campaign theme", "women's angle", "persona", "messaging",
    ]),
    ("Tess", [
        "data", "performance", "dashboard", "spreadsheet", "analysis", "metrics",
        "domo", "lookup table", "root angle", "sss", "tracking", "classify",
    ]),
    ("Veda", [
        "video", "expansion", "cuts", "editing", "b-roll", "a-roll", "resize",
        "hook stack", "hook refresh", "asset creation", "bumper",
    ]),
    ("Orion", [
        "strategic", "meeting prep", "scorecard", "alignment", "prd", "brief creator",
        "launch map", "launch board", "delegation", "planning",
    ]),
]

# Agent proof points — what each agent already has loaded
AGENT_PROOF = {
    "Neco": "Neco has active briefs, locked personas, and copy frameworks ready",
    "Tess": "Tess has SSS access and classification pipeline running",
    "Veda": "Veda has the production pipeline and hook stack system live",
    "Orion": "Orion has the full launch map and scorecard context loaded",
}

# Agent action verbs for the one-liner
AGENT_VERBS = {
    "Neco": "draft",
    "Tess": "analyze",
    "Veda": "build",
    "Orion": "structure",
}

# ── Human routing rules ───────────────────────────────────────────────────────
# Each entry: (roster_key, [keywords that signal this person])
HUMAN_ROUTES = [
    ("fatima", [
        "automation", "process", "admin", "ticket processing", "static asset",
        "renaming", "uploading", "iconic", "downloading", "workflow",
    ]),
    ("romeo", [
        "creative asset", "hook stack", "video ad", "sub-agent", "ugc", "output",
        "tonality", "asset generation",
    ]),
    ("morten", [
        "naming convention", "naming", "launch review", "357 naming",
        "sf2 naming", "ticket naming",
    ]),
    ("chris_hibbert", [
        "expansion task", "physical expansion", "resize", "ic work", "assistant editor",
    ]),
]


def _load_roster() -> dict:
    """Load team_roster.json."""
    try:
        with open(ROSTER_PATH) as f:
            data = json.load(f)
        return data.get("roster", {})
    except Exception as e:
        logger.warning(f"Could not load team roster: {e}")
        return {}


def _match_keywords(text: str, keywords: list[str]) -> bool:
    """Return True if any keyword appears in text (case-insensitive)."""
    text_lower = text.lower()
    return any(kw.lower() in text_lower for kw in keywords)


def get_delegation_opportunity(task: dict) -> dict:
    """Determine the best delegation opportunity for a task.

    Args:
        task: Task dict with at minimum 'text' and optionally 'description'

    Returns:
        {
            "type": "agent" | "human" | "keep",
            "target": "Neco" | "Romeo" | ... | None,
            "slack_id": "U..." | None,  # only for human
            "one_liner": "one-line recommendation string",
            "proof": "proof point string",
        }
    """
    title = task.get("text", "")
    description = task.get("description", "")
    full_text = f"{title} {description}"

    # 1. Check agents first
    for agent_name, keywords in AGENT_ROUTES:
        if _match_keywords(full_text, keywords):
            verb = AGENT_VERBS.get(agent_name, "handle")
            proof = AGENT_PROOF.get(agent_name, f"{agent_name} is ready for this")
            # Build a specific one-liner using the task title
            short_title = title[:45] + "…" if len(title) > 45 else title
            one_liner = f"{agent_name} can {verb} this ({proof})"
            return {
                "type": "agent",
                "target": agent_name,
                "slack_id": None,
                "one_liner": one_liner,
                "proof": proof,
            }

    # 2. Check humans
    roster = _load_roster()
    for roster_key, keywords in HUMAN_ROUTES:
        if _match_keywords(full_text, keywords):
            person = roster.get(roster_key, {})
            name = person.get("name", roster_key.title())
            slack_id = person.get("slack_id")
            proof = f"{name} owns this type of work and has the context"
            one_liner = f"Delegate to {name} via Slack ({proof})"
            return {
                "type": "human",
                "target": name,
                "slack_id": slack_id,
                "one_liner": one_liner,
                "proof": proof,
            }

    # 3. No match — keep with Christopher
    return {
        "type": "keep",
        "target": None,
        "slack_id": None,
        "one_liner": "Keep — requires your strategic judgment",
        "proof": "No agent or team member has the context for this one",
    }


def build_agent_prompt(task: dict, agent: str) -> str:
    """Build a full Claude Code prompt for an agent to execute a task.

    Called when Christopher approves an agent delegation suggestion.
    """
    title = task.get("text", "")
    description = task.get("description", "")
    priority = task.get("_priority_override", "B")
    task_id = task.get("id", "")

    desc_block = f"\n\nContext: {description}" if description else ""
    priority_label = {"A": "A-priority (needle-mover)", "B": "B-priority", "C": "C-priority"}.get(priority, priority)

    agent_context = {
        "Neco": (
            "You are working in the Neco NeuroCopy Agent context. "
            "Load your SESSION-LOG.md and active briefs before starting. "
            "Follow Neco's Phase-Stop discipline."
        ),
        "Tess": (
            "You are working in the Tess Strategic Scaling System context. "
            "Load your SESSION-LOG.md and SSS spreadsheet context before starting."
        ),
        "Veda": (
            "You are working in the Veda Video Editing Agent context. "
            "Load your SESSION-LOG.md and review the production pipeline before starting."
        ),
        "Orion": (
            "You are working in the Orion Chief of Staff context. "
            "Load your CLAUDE.md Build State before starting."
        ),
    }

    ctx = agent_context.get(agent, f"You are working in the {agent} agent context.")

    return (
        f"Task for {agent}: {title}\n"
        f"Priority: {priority_label} | ID: {task_id}{desc_block}\n\n"
        f"{ctx}\n\n"
        f"Complete this task following your standard session protocol. "
        f"Report back with what was done and any decisions made."
    )


def build_human_dm(task: dict, person_name: str) -> str:
    """Build a Slack DM draft for delegating a task to a human.

    Called when Christopher approves a human delegation suggestion.
    """
    title = task.get("text", "")
    description = task.get("description", "")
    priority = task.get("_priority_override", "B")
    deadline = task.get("deadline", "")

    priority_label = {"A": "high priority", "B": "medium priority", "C": "low priority"}.get(priority, "")
    deadline_line = f"\n*Deadline:* {deadline}" if deadline else ""
    desc_line = f"\n*Context:* {description}" if description else ""

    return (
        f"Hey {person_name} — Christopher asked me to pass this along:\n\n"
        f"*Task:* {title}\n"
        f"*Priority:* {priority_label}{deadline_line}{desc_line}\n\n"
        f"Can you pick this up? Let Christopher know if you need anything."
    )
