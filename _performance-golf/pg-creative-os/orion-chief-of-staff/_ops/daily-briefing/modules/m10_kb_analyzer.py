"""Module 10: Chief of Staff KB Analyzer

Reads the persistent Knowledge Base (populated by M9) and generates strategic
intelligence: pattern detection, scorecard gap analysis, risk/drift signals,
and closed-loop recommendation tracking.

No transcript processing — operates entirely on KB state.
"""

from datetime import date, timedelta
from typing import Any

from .base import BriefingModule
from .scorecard_context import current_day, get_scorecard_prompt
from .transcript_kb import load_kb, save_kb, kb_stats, generate_id


# Thresholds
STALE_ACTION_DAYS = 7       # Open action items not mentioned in N days
TOPIC_MOMENTUM_DAYS = 14    # Topics not mentioned in N days → losing momentum
HOT_TOPIC_MENTIONS = 3      # Minimum mentions to be "hot"
RECOMMENDATION_STALENESS = 7  # Days before a pending recommendation is flagged


class KBAnalyzerModule(BriefingModule):
    name = "Chief of Staff Analyzer"
    key = "m10_kb_analyzer"
    setup_required = "Depends on M9 (Transcript Intelligence)"

    def fetch_data(self) -> Any:
        kb = load_kb()
        stats = kb_stats(kb)
        day = current_day()
        today = date.today()

        # ── Stale action items (open, not mentioned in N days) ────────
        stale_actions = []
        for item in kb.get("action_items", []):
            if item.get("status") != "open":
                continue
            last = item.get("last_mentioned") or item.get("source_date", "")
            if not last:
                continue
            try:
                last_date = date.fromisoformat(last)
                age_days = (today - last_date).days
                if age_days >= STALE_ACTION_DAYS:
                    stale_actions.append({
                        "text": item["text"],
                        "owner": item.get("owner", "Unassigned"),
                        "age_days": age_days,
                        "scorecard": item.get("scorecard_alignment"),
                    })
            except (ValueError, TypeError):
                pass

        # Sort by staleness (oldest first)
        stale_actions.sort(key=lambda x: x["age_days"], reverse=True)

        # ── Hot topics (high mention count, still active) ─────────────
        hot_topics = []
        fading_topics = []
        for topic in kb.get("topics", []):
            mentions = topic.get("mention_count", 1)
            status = topic.get("status", "active")
            last = topic.get("last_mentioned", "")

            if status == "active" and mentions >= HOT_TOPIC_MENTIONS:
                hot_topics.append({
                    "name": topic["name"],
                    "mentions": mentions,
                    "scorecard": topic.get("scorecard_alignment"),
                })

            # Fading: active but not mentioned recently
            if status == "active" and last:
                try:
                    last_date = date.fromisoformat(last)
                    if (today - last_date).days >= TOPIC_MOMENTUM_DAYS:
                        fading_topics.append({
                            "name": topic["name"],
                            "last_mentioned": last,
                            "days_silent": (today - last_date).days,
                            "scorecard": topic.get("scorecard_alignment"),
                        })
                except (ValueError, TypeError):
                    pass

        hot_topics.sort(key=lambda x: x["mentions"], reverse=True)
        fading_topics.sort(key=lambda x: x["days_silent"], reverse=True)

        # ── People patterns ──────────────────────────────────────────
        people_with_open_items = []
        for name, info in kb.get("people", {}).items():
            open_ids = info.get("open_action_items", [])
            if open_ids:
                # Resolve IDs to text
                items = []
                for ai in kb.get("action_items", []):
                    if ai["id"] in open_ids and ai.get("status") == "open":
                        items.append(ai["text"])
                if items:
                    people_with_open_items.append({
                        "name": name,
                        "open_count": len(items),
                        "items": items[:3],  # Cap at 3 for display
                        "last_seen": info.get("last_seen"),
                    })

        people_with_open_items.sort(key=lambda x: x["open_count"], reverse=True)

        # ── Recent decisions (last 14 days) ───────────────────────────
        recent_decisions = []
        cutoff = (today - timedelta(days=14)).isoformat()
        for dec in kb.get("decisions", []):
            if dec.get("source_date", "") >= cutoff:
                recent_decisions.append({
                    "text": dec["text"],
                    "made_by": dec.get("made_by", []),
                    "scorecard": dec.get("scorecard_alignment"),
                })

        # ── Pending recommendations from prior runs ───────────────────
        stale_recommendations = []
        for rec in kb.get("recommendations", []):
            if rec.get("status") != "pending":
                continue
            gen_date = rec.get("generated_date", "")
            if gen_date:
                try:
                    rec_date = date.fromisoformat(gen_date)
                    age = (today - rec_date).days
                    if age >= RECOMMENDATION_STALENESS:
                        stale_recommendations.append({
                            "text": rec["text"],
                            "age_days": age,
                            "category": rec.get("category", ""),
                        })
                except (ValueError, TypeError):
                    pass

        return {
            "kb": kb,
            "stats": stats,
            "day": day,
            "stale_actions": stale_actions,
            "hot_topics": hot_topics,
            "fading_topics": fading_topics,
            "people_with_open_items": people_with_open_items,
            "recent_decisions": recent_decisions,
            "stale_recommendations": stale_recommendations,
        }

    def analyze(self, data: Any) -> str:
        stats = data["stats"]
        day = data["day"]
        kb = data["kb"]

        # If KB is empty or very sparse, give a bootstrap message
        if stats["transcripts_processed"] == 0 and stats["legacy_processed"] == 0:
            return (
                "_KB is empty — no transcripts processed yet. "
                "M9 must run first to populate the Knowledge Base._\n"
            )

        if stats["total_items"] < 3:
            return (
                f"_KB has only {stats['total_items']} items from "
                f"{stats['transcripts_processed']} transcript(s). "
                f"More data needed for pattern analysis._\n"
            )

        # ── Build structured data for AI analysis ─────────────────────
        scorecard_prompt = get_scorecard_prompt()

        kb_summary = (
            f"KB Summary: {stats['open_action_items']} open action items, "
            f"{stats['total_decisions']} decisions, "
            f"{stats['active_topics']} active topics, "
            f"{stats['people_tracked']} people tracked, "
            f"{stats['transcripts_processed']} transcripts processed.\n"
        )

        sections = [kb_summary]

        if data["stale_actions"]:
            sections.append("STALE ACTION ITEMS (open, not mentioned recently):")
            for sa in data["stale_actions"][:10]:
                sc = f" [{sa['scorecard']}]" if sa["scorecard"] else ""
                sections.append(
                    f"  - {sa['text']} (owner: {sa['owner']}, "
                    f"{sa['age_days']}d stale){sc}"
                )

        if data["hot_topics"]:
            sections.append("\nHOT TOPICS (frequently discussed):")
            for ht in data["hot_topics"][:5]:
                sc = f" [{ht['scorecard']}]" if ht["scorecard"] else ""
                sections.append(
                    f"  - {ht['name']} ({ht['mentions']} mentions){sc}"
                )

        if data["fading_topics"]:
            sections.append("\nFADING TOPICS (active but losing momentum):")
            for ft in data["fading_topics"][:5]:
                sc = f" [{ft['scorecard']}]" if ft["scorecard"] else ""
                sections.append(
                    f"  - {ft['name']} (silent {ft['days_silent']}d){sc}"
                )

        if data["people_with_open_items"]:
            sections.append("\nPEOPLE WITH OPEN ACTION ITEMS:")
            for p in data["people_with_open_items"][:5]:
                sections.append(
                    f"  - {p['name']} ({p['open_count']} open): "
                    + "; ".join(p["items"])
                )

        if data["recent_decisions"]:
            sections.append(f"\nRECENT DECISIONS (last 14 days):")
            for rd in data["recent_decisions"][:5]:
                who = ", ".join(rd["made_by"]) if rd["made_by"] else "unknown"
                sections.append(f"  - {rd['text']} (by {who})")

        if data["stale_recommendations"]:
            sections.append("\nSTALE RECOMMENDATIONS (pending, not acted on):")
            for sr in data["stale_recommendations"][:5]:
                sections.append(
                    f"  - [{sr['category']}] {sr['text']} ({sr['age_days']}d old)"
                )

        context = "\n".join(sections)

        # AI analysis
        analysis = self.call_anthropic(
            system_prompt=(
                "You are Orion, a strategic Chief of Staff. You're analyzing the "
                "Knowledge Base accumulated from Christopher Ogle's meeting transcripts "
                "to identify patterns, risks, and gaps.\n\n"
                f"{scorecard_prompt}\n\n"
                "Your job:\n"
                "1. SCORECARD GAPS — Which scorecard metrics have NO evidence or "
                "momentum in the KB? These are blind spots.\n"
                "2. RISK SIGNALS — Stale action items, fading topics, or people "
                "with growing backlogs that need attention.\n"
                "3. PATTERNS — What's Christopher spending meeting time on? Is it "
                "aligned with the scorecard phase?\n"
                "4. RECOMMENDATIONS — 2-3 specific, actionable moves Christopher "
                "should make this week based on the data.\n\n"
                "Rules:\n"
                "- Be concise. Use numbered lists (1. 2. 3.) not bullets.\n"
                "- Do not re-list individual stale action items — they appear in the Action Items Tracker (M0) at the top of the report. Focus on PATTERNS: which owners have the most stale items, which scorecard areas are neglected, systemic risks.\n"
                "- Recommendations must be specific actions, not vague advice.\n"
                "- If data is thin, say so — don't over-interpret sparse KB.\n"
                "- Tag each recommendation with the scorecard metric it advances.\n"
                "- Format each recommendation as: ACTION → SCORECARD METRIC\n"
            ),
            user_content=f"Day {day} of 90. Analyze this KB state:\n\n{context}",
            max_tokens=800,
        )

        # Store recommendations in KB for closed-loop tracking
        self._store_recommendations(kb, analysis, day)

        return analysis

    def _store_recommendations(self, kb: dict, analysis: str, day: int) -> None:
        """Extract and store recommendations from analysis for closed-loop tracking."""
        today_str = date.today().isoformat()
        recs = kb.setdefault("recommendations", [])

        # Simple heuristic: lines containing "→" are likely recommendations
        for line in analysis.split("\n"):
            line = line.strip().lstrip("- *")
            if "→" not in line or len(line) < 20:
                continue

            parts = line.split("→", 1)
            action_text = parts[0].strip().lstrip("*").strip()
            category = parts[1].strip().rstrip("*").strip() if len(parts) > 1 else ""

            # Skip if too similar to existing pending recommendation
            from .transcript_kb import _similarity
            is_dup = any(
                _similarity(r["text"], action_text) > 0.80
                for r in recs
                if r.get("status") == "pending"
            )
            if is_dup:
                continue

            rec_id = generate_id("rc", f"{action_text}{today_str}")
            recs.append({
                "id": rec_id,
                "text": action_text,
                "category": category,
                "status": "pending",
                "generated_date": today_str,
                "generated_day": day,
            })

        save_kb(kb)
