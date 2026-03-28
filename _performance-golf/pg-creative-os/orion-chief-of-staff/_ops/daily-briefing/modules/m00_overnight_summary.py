"""Module 00: What Was Added Overnight

Lightweight, non-AI module. Reads the receipt written by M9 (Transcript Intelligence)
via shared_state and renders a top-of-report summary showing which transcripts were
processed, how many items were extracted from each, and flags for anything needing review.
"""

from typing import Any

from .base import BriefingModule


class OvernightSummaryModule(BriefingModule):
    name = "What Was Added Overnight"
    key = "m00_overnight_summary"
    setup_required = "---"

    def fetch_data(self) -> Any:
        return {
            "receipt": self.shared_state.get("m9_receipt"),
            "auto_approved": self.shared_state.get("auto_approved_items", []),
        }

    def analyze(self, data: Any) -> str:
        receipt = data.get("receipt") if isinstance(data, dict) else data
        auto_approved = data.get("auto_approved", []) if isinstance(data, dict) else []

        # M9 didn't run at all (disabled or dry-run before phase 1)
        if receipt is None:
            return "_Transcript Intelligence did not run. No overnight data available._"

        transcripts = receipt.get("transcripts", [])
        total_actions = receipt.get("total_new_actions", 0)
        total_decisions = receipt.get("total_new_decisions", 0)
        overflow = receipt.get("overflow", 0)

        # M9 ran but found nothing new
        if not transcripts:
            return "_No new transcripts processed overnight._"

        # Build the summary
        lines = []

        # Header counts
        t_count = len(transcripts)
        parts = [f"**{t_count} transcript{'s' if t_count != 1 else ''}** processed"]
        if total_actions:
            parts.append(f"**{total_actions} action item{'s' if total_actions != 1 else ''}**")
        if total_decisions:
            parts.append(f"{total_decisions} decision{'s' if total_decisions != 1 else ''}")
        lines.append(" | ".join(parts))
        lines.append("")

        # Per-transcript breakdown
        for t in transcripts:
            name = t.get("friendly_name", t.get("rel_path", "Unknown"))
            date_str = t.get("meeting_date", "")
            date_part = f" ({date_str})" if date_str else ""

            if t.get("parse_failed"):
                lines.append(f"- **{name}**{date_part} -- PARSE FAILED, needs review")
                continue

            ai = t.get("action_items_added", 0)
            dc = t.get("decisions_added", 0)
            sig = t.get("scorecard_signals", 0)

            if ai == 0 and dc == 0 and sig == 0:
                lines.append(f"- **{name}**{date_part} -- no items extracted -- review needed?")
                continue

            detail_parts = []
            if ai:
                detail_parts.append(f"{ai} action{'s' if ai != 1 else ''}")
            if dc:
                detail_parts.append(f"{dc} decision{'s' if dc != 1 else ''}")
            if sig:
                detail_parts.append(f"{sig} signal{'s' if sig != 1 else ''}")
            lines.append(f"- **{name}**{date_part} -- {', '.join(detail_parts)}")

        if overflow:
            lines.append(f"\n_{overflow} additional transcript{'s' if overflow != 1 else ''} queued for next run._")

        # Decisions Made — REMOVED S125: not actionable, Christopher skims over it.
        # Data still extracted by M9 into KB for Chief of Staff Analyzer to consume.

        # Scorecard Signals — REMOVED S125: redundant with Chief of Staff Analyzer section.
        # Signals still extracted by M9 into KB and routed to scorecard-progress.md.

        # Auto-approved items summary (Phase 5)
        if auto_approved:
            lines.append(f"\n**{len(auto_approved)} item{'s' if len(auto_approved) != 1 else ''} auto-approved** (score ≥ threshold):")
            for aa in auto_approved:
                text = aa.get("text", "?")[:60]
                score = aa.get("score", 0)
                day = aa.get("suggested_day", "unscheduled")
                lines.append(f"- {text} (score: {score:.2f}, → {day})")

        return "\n".join(lines)

    def format_section(self) -> str:
        """Use H2 heading for top-level prominence."""
        if self._error:
            return (
                f"## {self.name}\n\n"
                f"> **MODULE ERROR**: {self._error}\n"
                f"> This module failed but others continued normally.\n"
            )
        if self._analysis:
            return f"## {self.name}\n\n{self._analysis}\n"
        return f"## {self.name}\n\n_No output produced._\n"
