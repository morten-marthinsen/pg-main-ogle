"""Module 0b: Pending Review — Staging area for newly extracted action items.

Non-AI module. Shows items with status="pending" grouped by source transcript.
Christopher reviews and approves/rejects before they enter the main tracker (M0).
Positioned between M00 (overnight summary) and M0 (action items tracker).

Behavioral preferences (.kb-preferences.json):
- show_existing_match: Append "(already on your list for [day])" when a pending
  item fuzzy-matches an existing scheduled action item.
- suggest_session_blocks: Append "(suggest: add to your [X] session on [day])"
  when a pending item could fit a defined session block.
"""

import json
from collections import defaultdict
from datetime import date
from pathlib import Path
from typing import Any, Optional

from .base import BriefingModule, MODULES_DIR
from .transcript_kb import apply_overrides, apply_approvals, save_kb, load_schedule, _similarity, filter_by_registry, KB_APPROVALS_PATH
from .triage_intelligence import (
    enrich_pending_items, classify_score, route_depends_on_items,
    deduplicate_pending_items, filter_already_handled,
)

DAILY_BRIEFING_DIR = MODULES_DIR.parent
KB_PATH = DAILY_BRIEFING_DIR / ".transcript-kb.json"
MANUAL_ITEMS_PATH = DAILY_BRIEFING_DIR / ".kb-manual-items.json"
PREFERENCES_PATH = DAILY_BRIEFING_DIR / ".kb-preferences.json"

# Category labels matching M0's convention
CAT_LABELS = {"my_action": "DO", "follow_up": "TRACK", "milestone": "DATE"}

# Day-of-week abbreviations
DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


def _day_label(iso_date: str) -> str:
    """Convert '2026-03-04' to 'Wed Mar 04'."""
    try:
        d = date.fromisoformat(iso_date)
        dow = DAY_NAMES[d.weekday()]
        return f"{dow} {d.strftime('%b %d')}"
    except (ValueError, TypeError):
        return iso_date


class PendingReviewModule(BriefingModule):
    name = "Pending Review"
    key = "m0b_pending_review"
    setup_required = "---"

    def fetch_data(self) -> Any:
        if not KB_PATH.exists():
            return {"pending": [], "grouped": {}, "active_items": [], "schedule": {}, "prefs": {}, "session_blocks": {}}

        try:
            with open(KB_PATH, encoding="utf-8") as f:
                kb = json.load(f)
            apply_overrides(kb)
            approval_counts = apply_approvals(kb)
            # Persist approval state to disk so approved/rejected items don't
            # cycle back to "pending" on the next pipeline run.
            if approval_counts.get("approved", 0) or approval_counts.get("rejected", 0):
                try:
                    save_kb(kb)
                except Exception:
                    pass  # Non-fatal — approvals still applied in memory for this run
        except (json.JSONDecodeError, KeyError):
            return {"pending": [], "grouped": {}, "active_items": [], "schedule": {}, "prefs": {}, "session_blocks": {}}

        pending = [
            item for item in kb.get("action_items", [])
            if item.get("status") == "pending"
        ]

        # Filter items with explicit approval/rejection decisions (belt-and-suspenders)
        approvals_ids = set()
        if KB_APPROVALS_PATH.exists():
            try:
                with open(KB_APPROVALS_PATH, encoding="utf-8") as f:
                    approvals_data = json.load(f)
                approvals_ids = set(approvals_data.get("approvals", {}).keys())
            except (json.JSONDecodeError, KeyError):
                pass
        approval_filtered = 0
        if approvals_ids:
            before = len(pending)
            pending = [item for item in pending if item.get("id") not in approvals_ids]
            approval_filtered = before - len(pending)

        # Filter against closed manual items (fuzzy match)
        manual_loaded = None
        closed_manual_filtered = 0
        if MANUAL_ITEMS_PATH.exists():
            try:
                with open(MANUAL_ITEMS_PATH, encoding="utf-8") as f:
                    manual_loaded = json.load(f)
                closed_texts = [
                    ai.get("text", "").lower().strip()
                    for ai in manual_loaded.get("action_items", [])
                    if ai.get("status") == "closed"
                ]
                if closed_texts:
                    before = len(pending)
                    pending = [
                        item for item in pending
                        if not any(
                            _similarity(item.get("text", "").lower().strip(), ct) >= 0.75
                            for ct in closed_texts
                        )
                    ]
                    closed_manual_filtered = before - len(pending)
            except (json.JSONDecodeError, KeyError):
                pass

        # Filter against completed task registry
        registry_filtered = 0
        intel_config = self.config.get("intelligence", {})
        if intel_config.get("completed_registry", True):
            try:
                pending, registry_filtered = filter_by_registry(pending)
            except Exception:
                pass  # Graceful degradation
        registry_filtered += approval_filtered + closed_manual_filtered

        # Cross-reference filter: suppress items already on tracker, calendar, or ClickUp
        xref_stats = {"total_filtered": 0, "already_scheduled": 0,
                       "already_on_calendar": 0, "completed_in_clickup": 0}
        try:
            pending, xref_stats = filter_already_handled(
                pending, self.shared_state,
                kb_data=kb, manual_data=manual_loaded,
            )
        except Exception:
            pass  # Graceful degradation

        # Group by source transcript
        grouped = defaultdict(list)
        for item in pending:
            source = item.get("source_transcript", "unknown")
            grouped[source].append(item)

        # Load active (non-pending, non-closed) items for match detection
        active_items = [
            item for item in kb.get("action_items", [])
            if item.get("status") == "open"
        ]
        # Also include manual items
        if MANUAL_ITEMS_PATH.exists():
            try:
                with open(MANUAL_ITEMS_PATH, encoding="utf-8") as f:
                    manual = json.load(f)
                active_items.extend(
                    item for item in manual.get("action_items", [])
                    if item.get("status") == "open"
                )
            except (json.JSONDecodeError, KeyError):
                pass

        # Load schedule and preferences
        schedule = load_schedule()
        prefs = {}
        session_blocks = {}
        if PREFERENCES_PATH.exists():
            try:
                with open(PREFERENCES_PATH, encoding="utf-8") as f:
                    pdata = json.load(f)
                prefs = pdata.get("pending_review", {})
                session_blocks = pdata.get("session_blocks", {})
            except (json.JSONDecodeError, KeyError):
                pass

        # Auto-route depends_on items to Waiting On (skip triage)
        waiting_on = []
        try:
            triage_items, waiting_on = route_depends_on_items(pending, self.config)
        except Exception:
            triage_items = pending  # Graceful degradation

        # Deduplicate triage items (merge duplicates from multiple transcript passes)
        dedup_before = len(triage_items)
        try:
            triage_items = deduplicate_pending_items(triage_items)
        except Exception:
            pass  # Graceful degradation
        dedup_merged = dedup_before - len(triage_items)

        # Re-group triage items only (waiting_on rendered separately)
        grouped = defaultdict(list)
        for item in triage_items:
            source = item.get("source_transcript", "unknown")
            grouped[source].append(item)

        # Triage intelligence enrichment (only for triage items)
        enrichments = {}
        try:
            enrichments = enrich_pending_items(
                triage_items, self.shared_state, self.config
            )
        except Exception:
            pass  # Graceful degradation — render without enrichment

        return {
            "pending": triage_items,
            "grouped": dict(grouped),
            "active_items": active_items,
            "schedule": schedule,
            "prefs": prefs,
            "session_blocks": session_blocks,
            "enrichments": enrichments,
            "waiting_on": waiting_on,
            "registry_filtered": registry_filtered,
            "dedup_merged": dedup_merged,
            "xref_stats": xref_stats,
        }

    def _find_match(self, pending_text: str, active_items: list,
                    schedule: dict, threshold: float) -> Optional[str]:
        """Check if a pending item fuzzy-matches an already-scheduled active item.

        Returns a parenthetical note like '(already on your list for Wed Mar 04)'
        or None if no match found.
        """
        for active in active_items:
            active_text = active.get("text", "")
            if _similarity(pending_text, active_text) >= threshold:
                aid = active.get("id", "")
                sched_date = schedule.get(aid)
                if sched_date:
                    return f"(already on your list for {_day_label(sched_date)})"
                else:
                    return "(already on your list — unscheduled)"
        return None

    def _find_session_block(self, pending_text: str,
                            session_blocks: dict) -> Optional[str]:
        """Check if a pending item could fit into a defined session block.

        Returns a suggestion note or None.
        """
        text_lower = pending_text.lower()
        for block_date, block in session_blocks.items():
            scope_terms = [t.strip().lower() for t in block.get("scope", "").split(",")]
            for term in scope_terms:
                if term and term in text_lower:
                    label = block.get("label", "session")
                    return f"(suggest: add to your {label} on {_day_label(block_date)})"
        return None

    def analyze(self, data: Any) -> str:
        pending = data["pending"]
        grouped = data["grouped"]
        active_items = data.get("active_items", [])
        schedule = data.get("schedule", {})
        prefs = data.get("prefs", {})
        session_blocks = data.get("session_blocks", {})
        enrichments = data.get("enrichments", {})
        waiting_on = data.get("waiting_on", [])
        registry_filtered = data.get("registry_filtered", 0)
        dedup_merged = data.get("dedup_merged", 0)
        xref_stats = data.get("xref_stats", {})

        show_match = prefs.get("show_existing_match", False)
        threshold = prefs.get("match_threshold", 0.70)
        suggest_blocks = prefs.get("suggest_session_blocks", False)

        has_enrichment = bool(enrichments)

        if not pending and not waiting_on:
            return "_No items pending review._\n"

        lines = []

        # Count auto-approved items (Phase 5)
        auto_approved_count = sum(
            1 for e in enrichments.values() if e.get("auto_approved", False)
        ) if has_enrichment else 0

        # Summary line with auto-routed count
        if has_enrichment:
            from .triage_intelligence import LIKELY_REJECT, LEAN_REJECT, NEEDS_REVIEW, LEAN_APPROVE, LIKELY_APPROVE
            counts = {LIKELY_REJECT: 0, LEAN_REJECT: 0, NEEDS_REVIEW: 0, LEAN_APPROVE: 0, LIKELY_APPROVE: 0}
            for e in enrichments.values():
                if e.get("auto_approved", False):
                    continue  # Don't count auto-approved in triage counts
                cls = e.get("classification", NEEDS_REVIEW)
                counts[cls] = counts.get(cls, 0) + 1
            reject_ct = counts[LIKELY_REJECT] + counts[LEAN_REJECT]
            approve_ct = counts[LIKELY_APPROVE] + counts[LEAN_APPROVE]
            review_ct = counts[NEEDS_REVIEW]

            triage_count = len(pending) - auto_approved_count
            parts = [f"**{triage_count} to triage**"]
            if auto_approved_count:
                parts.append(f"{auto_approved_count} auto-approved")
            if waiting_on:
                parts.append(f"{len(waiting_on)} auto-routed to Waiting On")
            if dedup_merged:
                parts.append(f"{dedup_merged} duplicates merged")
            if registry_filtered:
                parts.append(f"{registry_filtered} filtered by completion registry")
            xref_total = xref_stats.get("total_filtered", 0)
            if xref_total:
                xref_detail = []
                if xref_stats.get("already_scheduled"):
                    xref_detail.append(f"{xref_stats['already_scheduled']} already scheduled")
                if xref_stats.get("already_on_calendar"):
                    xref_detail.append(f"{xref_stats['already_on_calendar']} already on calendar")
                if xref_stats.get("completed_in_clickup"):
                    xref_detail.append(f"{xref_stats['completed_in_clickup']} completed in ClickUp")
                detail_str = f" ({', '.join(xref_detail)})" if xref_detail else ""
                parts.append(f"{xref_total} filtered by cross-reference{detail_str}")
            if triage_count > 0:
                parts.append(f"{reject_ct} likely reject, {approve_ct} likely approve, {review_ct} need review")
            lines.append(f"> {' | '.join(parts)}\n")
        else:
            parts = [f"**{len(pending)} item(s) awaiting your review**"]
            if waiting_on:
                parts.append(f"{len(waiting_on)} auto-routed to Waiting On")
            lines.append(f"> {' | '.join(parts)}\n")

        if not pending and waiting_on:
            lines.append("_All pending items auto-routed to Waiting On._\n")

        counter = 0
        for source, items in sorted(grouped.items()):
            # Friendly source name
            stem = Path(source).stem
            friendly = stem[7:].replace("-", " ").title() if len(stem) > 7 else stem
            source_date = items[0].get("source_date", "")
            if source_date:
                try:
                    d = date.fromisoformat(source_date)
                    date_label = d.strftime("%b %d")
                except (ValueError, TypeError):
                    date_label = source_date
            else:
                date_label = "—"

            lines.append(f"**From: {friendly}** ({date_label})")
            if has_enrichment:
                lines.append("| # | Signal | Type | Item | Suggestion |")
                lines.append("|---|--------|------|------|------------|")
            else:
                lines.append("| # | Type | Confidence | Item | Deadline |")
                lines.append("|---|------|------------|------|----------|")

            for item in items:
                counter += 1
                cat = item.get("category", "my_action")
                cat_label = CAT_LABELS.get(cat, cat.upper())
                text = item.get("text", "")
                depends = f" ← {item['depends_on']}" if item.get("depends_on") else ""
                item_id = item.get("id", "")

                # Enrichment data
                enrich = enrichments.get(item_id, {}) if has_enrichment else {}

                if has_enrichment and enrich:
                    classification = enrich.get("classification", "NEEDS REVIEW")
                    # Badge for signal column
                    signal_badges = {
                        "LIKELY REJECT": "~~REJECT~~",
                        "LEAN REJECT": "~reject?~",
                        "NEEDS REVIEW": "**REVIEW**",
                        "LEAN APPROVE": "approve?",
                        "LIKELY APPROVE": "**APPROVE**",
                    }
                    signal = signal_badges.get(classification, classification)

                    # Override signal when calendar overlap detected
                    cal_overlap = enrich.get("calendar_overlap")
                    if cal_overlap:
                        signal = "~calendar?~"

                    # Build suggestion column
                    suggestions = []

                    # Calendar overlap note (shown first for visibility)
                    if cal_overlap:
                        person = cal_overlap.get("person", "")
                        event_summary = cal_overlap.get("event_summary", "")
                        event_time = cal_overlap.get("event_time", "")
                        is_today = cal_overlap.get("is_today", False)
                        is_yesterday = cal_overlap.get("is_yesterday", False)
                        yesterday_also = cal_overlap.get("yesterday_also", False)
                        if is_today:
                            cal_note = f"You have a call with {person} today at {event_time} — is this already covered?"
                        elif is_yesterday:
                            cal_note = f"You had a call with {person} yesterday ({event_summary}) — already handled?"
                        else:
                            cal_note = f"Call with {person} tomorrow at {event_time} ({event_summary}) — will this be covered?"
                        if yesterday_also:
                            cal_note += " (met yesterday too)"
                        suggestions.append(cal_note)

                    matched_rules = enrich.get("matched_rules", [])
                    # Filter out calendar_overlap from matched_rules display
                    # (already shown as a dedicated suggestion above)
                    display_rules = [r for r in matched_rules if not r.startswith("calendar_overlap:")]
                    if display_rules:
                        suggestions.append(", ".join(display_rules[:3]))
                    cu_match = enrich.get("clickup_match")
                    if cu_match:
                        suggestions.append(f"CU: {cu_match['task_name'][:30]}")
                    suggested_day = enrich.get("suggested_day")
                    suggestion_why = enrich.get("suggestion_why", "")
                    if suggested_day:
                        placement = f"→ {suggested_day}"
                        if suggestion_why:
                            placement += f" ({suggestion_why})"
                        suggestions.append(placement)
                    # Show merge indicator for deduplicated items
                    merged_count = enrich.get("merged_count", 1)
                    if merged_count > 1:
                        suggestions.append(f"[merged {merged_count}×]")

                    # Append existing match/session block annotations
                    if show_match:
                        match_note = self._find_match(text, active_items, schedule, threshold)
                        if match_note:
                            suggestions.append(match_note)
                    if suggest_blocks:
                        block_note = self._find_session_block(text, session_blocks)
                        if block_note:
                            suggestions.append(block_note)

                    suggestion_text = " | ".join(suggestions) if suggestions else "—"
                    lines.append(
                        f"| {counter} | {signal} | {cat_label} | {text}{depends} | {suggestion_text} |"
                    )
                else:
                    # Fallback: original format without enrichment
                    confidence = item.get("confidence", "inferred")
                    conf_label = "EXPLICIT" if confidence == "explicit" else "inferred"

                    annotation = ""
                    if show_match:
                        match_note = self._find_match(text, active_items, schedule, threshold)
                        if match_note:
                            annotation = f" {match_note}"
                    if suggest_blocks and not annotation:
                        block_note = self._find_session_block(text, session_blocks)
                        if block_note:
                            annotation = f" {block_note}"

                    deadline = item.get("deadline") or item.get("deadline_text") or "—"
                    lines.append(
                        f"| {counter} | {cat_label} | {conf_label} | {text}{depends}{annotation} | {deadline} |"
                    )

            lines.append("")

        # Waiting On section (auto-routed depends_on items)
        if waiting_on:
            lines.append(f"### Waiting On ({len(waiting_on)} items auto-routed)")
            lines.append("")
            lines.append("| # | Item | Waiting On | Source |")
            lines.append("|---|------|------------|--------|")
            for i, item in enumerate(waiting_on, 1):
                text = item.get("text", "")
                depends = item.get("_waiting_on", item.get("depends_on", "—"))
                source = item.get("source_transcript", "—")
                if source != "—":
                    stem = Path(source).stem
                    source = stem[7:].replace("-", " ").title() if len(stem) > 7 else stem
                lines.append(f"| {i} | {text} | {depends} | {source} |")
            lines.append("")

        return "\n".join(lines)

    def format_section(self) -> str:
        """H2 heading with section markers for re-render support."""
        if self._error:
            return (
                "<!-- M0b:START -->\n"
                f"## {self.name}\n\n"
                f"> **MODULE ERROR**: {self._error}\n"
                f"> This module failed but others continued normally.\n"
                "<!-- M0b:END -->"
            )
        if self._analysis:
            return (
                "<!-- M0b:START -->\n"
                f"## {self.name}\n\n{self._analysis}\n"
                "<!-- M0b:END -->"
            )
        return (
            "<!-- M0b:START -->\n"
            f"## {self.name}\n\n_No output produced._\n"
            "<!-- M0b:END -->"
        )
