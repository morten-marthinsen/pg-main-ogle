"""Module 5: Wise Reply Context Building
Updates working-relationship files with pattern-level observations
from processed Slack messages (M4 output). Only updates existing files."""

import json
import os
import re
from datetime import datetime
from pathlib import Path
from typing import Optional

from .base import BriefingModule

DAILY_BRIEFING_DIR = Path(__file__).resolve().parent.parent
M4_STATE_FILE = DAILY_BRIEFING_DIR / ".m4-state.json"
WR_DIR = Path(os.environ.get(
    "WORKING_RELATIONSHIPS_DIR",
    str(Path.home() / ".claude" / "memory" / "working-relationships"),
))
WR_INDEX = WR_DIR / "_index.md"


def _find_working_relationship_file(user_name: str) -> Optional[Path]:
    """Find existing WR file for this person. Matches by first name or slug."""
    if not WR_DIR.exists():
        return None
    first = user_name.split()[0].lower() if user_name else ""
    slug = user_name.lower().replace(" ", "-")[:20]
    for f in WR_DIR.glob("*.md"):
        if f.name.startswith("_"):
            continue
        stem = f.stem.lower()
        if first and stem.startswith(first):
            return f
        if slug and stem in slug or slug in stem:
            return f
    return None


def _append_to_communication_patterns(filepath: Path, new_bullet: str) -> bool:
    """Append a bullet to Communication Patterns section. Returns True if updated."""
    text = filepath.read_text(encoding="utf-8")
    today = datetime.now().strftime("%Y-%m-%d")
    bullet = f"- [Briefing {today}] {new_bullet}\n"

    if f"[Briefing {today}]" in text:
        return False  # Already added today

    # Find ## Communication Patterns section; append bullet before next ##
    start = text.find("## Communication Patterns\n")
    if start < 0:
        return False
    section_start = start + len("## Communication Patterns\n")
    next_h2 = text.find("\n## ", section_start)
    insert_pos = next_h2 if next_h2 > 0 else len(text)

    before = text[:insert_pos].rstrip()
    after = text[insert_pos:]
    new_text = before + "\n" + bullet + after

    # Update Last Updated in header
    new_text = re.sub(
        r"(> \*\*Last Updated\*\*: )\d{4}-\d{2}-\d{2}",
        rf"\1{today}",
        new_text,
        count=1,
    )
    filepath.write_text(new_text, encoding="utf-8")
    return True


class WiseReplyContextModule(BriefingModule):
    name = "Relationship Context Updates"
    key = "m5_wise_reply_context"
    setup_required = "Depends on Module 4 (Slack Monitor)"

    def fetch_data(self):
        if not M4_STATE_FILE.exists():
            return {"processed": [], "error": "M4 state not found (run M4 first)"}
        try:
            data = json.loads(M4_STATE_FILE.read_text(encoding="utf-8"))
            processed = data.get("processed", [])
            last_run = data.get("last_run", "")
            return {"processed": processed, "last_run": last_run, "error": None}
        except Exception as e:
            return {"processed": [], "error": str(e)}

    def analyze(self, data):
        if data.get("error"):
            return f"_No M4 data._ {data['error']}\n\n**Setup:** Enable and run Slack Monitor (M4) first."

        processed = data.get("processed", [])
        if not processed:
            return "_No Slack messages processed today — nothing to update._\n"

        mod_config = self.config.get("modules", {}).get(self.key, {})
        wr_dir = Path(mod_config.get("working_relationships_dir", str(WR_DIR))).expanduser()
        auto_append = mod_config.get("auto_append", True)

        # Group by sender
        by_sender = {}
        for p in processed:
            name = p.get("user_name", "Unknown")
            if name not in by_sender:
                by_sender[name] = []
            by_sender[name].append(p)

        lines = [f"**{len(processed)} message(s)** from {len(by_sender)} colleague(s) processed.\n"]
        updated = 0
        suggested = []

        for user_name, msgs in by_sender.items():
            # Extract pattern via AI
            msg_summary = "\n".join(
                f"- {m.get('last_message', '')[:300]}"
                for m in msgs
            )
            pattern = self.call_anthropic(
                system_prompt=(
                    "You are Orion. Extract ONE brief pattern-level observation from these Slack "
                    "message(s) that would help future response drafting. Focus on: communication "
                    "style, what tends to work, or a key dynamic. Output a single sentence, "
                    "20-40 words max. If nothing substantive, output exactly: NONE"
                ),
                user_content=f"Sender: {user_name}\n\nMessages:\n{msg_summary}\n\nPattern observation (or NONE):",
                max_tokens=80,
            )
            pattern = pattern.strip()
            if not pattern or "NONE" in pattern.upper():
                continue

            wr_file = _find_working_relationship_file(user_name)
            if wr_file and auto_append:
                if _append_to_communication_patterns(wr_file, pattern):
                    updated += 1
                    lines.append(f"- **{user_name}**: Pattern appended to `{wr_file.name}`")
            else:
                suggested.append((user_name, pattern))

        if suggested:
            lines.append("\n**Consider adding to working-relationships:**")
            for name, pat in suggested:
                lines.append(f"- **{name}**: {pat}")

        if updated:
            lines.insert(1, f"**{updated}** working-relationship file(s) updated.\n")
        elif not suggested:
            lines.append("_No pattern updates this run._")

        return "\n".join(lines)
