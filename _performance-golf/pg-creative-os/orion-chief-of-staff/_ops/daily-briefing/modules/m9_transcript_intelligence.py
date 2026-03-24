"""Module 9: Transcript Intelligence Extractor

Replaces m9_transcript_prd_recommender.py with full-text structured extraction.
For each new transcript: extracts attendees, action items, decisions, topics,
scorecard signals via AI, then merges into the persistent Knowledge Base.

State tracking: KB extraction_state (replaces .m9-state.json).
Legacy migration: old .m9-state.json entries -> KB legacy_processed on first run.
Long transcript handling: AI summary sections + last 100 lines for >2000 line files.
Max 20 transcripts per run (safety ceiling).
"""

import json
import re
import time
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any

from .base import BriefingModule, MODULES_DIR
from .scorecard_context import current_day, get_scorecard_prompt
from .transcript_kb import (
    load_kb,
    save_kb,
    merge_action_items,
    merge_decisions,
    merge_topics,
    update_people,
    apply_overrides,
    apply_approvals,
    prune_stale,
    kb_stats,
)

# Resolve paths
DAILY_BRIEFING_DIR = MODULES_DIR.parent
TRANSCRIPTS_DIR = MODULES_DIR.parent.parent / "meetings" / "transcripts"
OLD_STATE_FILE = DAILY_BRIEFING_DIR / ".m9-state.json"

MAX_TRANSCRIPTS_PER_RUN = 3  # default; overridden by config.yaml max_transcripts_per_run
LONG_TRANSCRIPT_THRESHOLD = 2000  # lines
INTER_CALL_DELAY = 65  # seconds between AI calls to respect rate limits


def _load_old_state() -> dict:
    """Load the legacy .m9-state.json file."""
    if not OLD_STATE_FILE.exists():
        return {"processed": [], "last_run": None}
    try:
        with open(OLD_STATE_FILE, encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, KeyError):
        return {"processed": [], "last_run": None}


def _extract_transcript_text(filepath: Path) -> str:
    """Extract transcript text. Full text for most; summary sections + tail for long ones.

    For transcripts >2000 lines: extracts everything before the verbatim transcript
    section (Overview, Key Takeaways, Next Steps, Key Topics) + last 100 lines.
    """
    with open(filepath, encoding="utf-8") as f:
        lines = f.readlines()

    total = len(lines)
    if total <= LONG_TRANSCRIPT_THRESHOLD:
        return "".join(lines)

    # Find where the verbatim transcript section begins
    # ClickUp AI Notetaker uses "*   Transcript" or "### Transcript" as markers
    transcript_start = None
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped in ("Transcript", "* Transcript", "*   Transcript") or \
           stripped.startswith("### Transcript"):
            transcript_start = i
            break

    if transcript_start and transcript_start > 10:
        # Take the AI summary (everything before transcript) + last 100 lines
        summary = "".join(lines[:transcript_start])
        tail = "".join(lines[-100:])
        omitted = total - transcript_start - 100
        return (
            summary
            + f"\n\n[... {omitted} lines of verbatim dialogue omitted ...]\n\n"
            + "--- Last 100 lines of dialogue ---\n\n"
            + tail
        )

    # Fallback: first 200 + last 100 lines
    head = "".join(lines[:200])
    tail = "".join(lines[-100:])
    return (
        head
        + f"\n\n[... {total - 300} lines omitted ...]\n\n"
        + tail
    )


def _extract_date_from_path(rel_path: str) -> str:
    """Parse date from transcript filename like '2026-02/021726-name.md'.

    Filename prefix is MMDDYY. Returns YYYY-MM-DD or today's date as fallback.
    """
    filename = Path(rel_path).stem  # e.g., '021726-john-christopher-quick-sync'
    match = re.match(r"(\d{2})(\d{2})(\d{2})", filename)
    if match:
        mm, dd, yy = match.groups()
        year = 2000 + int(yy)
        try:
            return date(year, int(mm), int(dd)).isoformat()
        except ValueError:
            pass
    return date.today().isoformat()


def _find_new_transcripts(kb: dict) -> list:
    """Find transcript .md files not yet in KB processed or legacy_processed."""
    state = kb["extraction_state"]
    processed = set(state.get("processed", []))
    legacy = set(state.get("legacy_processed", []))
    all_processed = processed | legacy

    new_files = []
    if not TRANSCRIPTS_DIR.exists():
        return new_files

    for md_file in sorted(TRANSCRIPTS_DIR.rglob("*.md"), reverse=True):
        rel = str(md_file.relative_to(TRANSCRIPTS_DIR))
        if rel not in all_processed:
            new_files.append((rel, md_file))

    return new_files


def _migrate_legacy_state(kb: dict, logger) -> bool:
    """Migrate .m9-state.json entries to KB legacy_processed. Returns True if migrated."""
    state = kb["extraction_state"]
    if state.get("legacy_processed"):
        return False  # Already migrated

    old_state = _load_old_state()
    old_processed = old_state.get("processed", [])
    if not old_processed:
        return False

    state["legacy_processed"] = old_processed
    logger.info(
        f"[m9_transcript_intelligence] Migrated {len(old_processed)} entries "
        f"from .m9-state.json to KB legacy_processed"
    )
    return True


def _parse_json_response(text: str) -> dict:
    """Parse JSON from AI response. Handles raw JSON, markdown blocks, and truncated output."""
    text = text.strip()

    # Strip markdown code block wrapper
    if text.startswith("```"):
        lines = text.split("\n")
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        text = "\n".join(lines).strip()

    # Attempt 1: direct parse
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Attempt 2: find JSON object in text
    match = re.search(r'\{[\s\S]*\}', text)
    if match:
        try:
            return json.loads(match.group())
        except json.JSONDecodeError:
            pass

    # Attempt 3: repair truncated JSON (output cut off mid-array/object)
    # Close any open brackets/braces from right to left
    candidate = text
    if not candidate.startswith("{"):
        idx = candidate.find("{")
        if idx >= 0:
            candidate = candidate[idx:]
    open_braces = candidate.count("{") - candidate.count("}")
    open_brackets = candidate.count("[") - candidate.count("]")
    # Strip trailing comma or partial value
    candidate = re.sub(r',\s*$', '', candidate)
    candidate += "]" * max(0, open_brackets) + "}" * max(0, open_braces)
    try:
        return json.loads(candidate)
    except json.JSONDecodeError:
        pass

    return {}


class TranscriptIntelligenceModule(BriefingModule):
    name = "Transcript Intelligence"
    key = "m9_transcript_intelligence"
    setup_required = "—"

    def fetch_data(self) -> Any:
        kb = load_kb()

        # Migrate legacy state on first run
        migrated = _migrate_legacy_state(kb, self.logger)

        new_transcripts = _find_new_transcripts(kb)
        self.logger.info(
            f"[{self.key}] Found {len(new_transcripts)} new transcript(s), "
            f"{len(kb['extraction_state'].get('processed', []))} processed, "
            f"{len(kb['extraction_state'].get('legacy_processed', []))} legacy"
        )

        # Cap at MAX_TRANSCRIPTS_PER_RUN
        to_process = new_transcripts[:MAX_TRANSCRIPTS_PER_RUN]
        overflow = len(new_transcripts) - len(to_process)

        results = []
        for rel_path, abs_path in to_process:
            text = _extract_transcript_text(abs_path)
            results.append({
                "rel_path": rel_path,
                "abs_path": str(abs_path),
                "text": text,
                "line_count": len(open(abs_path).readlines()),
                "meeting_date": _extract_date_from_path(rel_path),
            })

        return {
            "kb": kb,
            "transcripts": results,
            "overflow": overflow,
            "migrated": migrated,
        }

    def analyze(self, data: Any) -> str:
        kb = data["kb"]
        transcripts = data["transcripts"]
        overflow = data["overflow"]
        migrated = data["migrated"]
        day = current_day()

        if not transcripts and not migrated:
            stats = kb_stats(kb)
            total = stats["transcripts_processed"] + stats["legacy_processed"]
            # Write empty receipt so M00 knows M9 ran but found nothing
            self.shared_state["m9_receipt"] = {
                "transcripts": [],
                "total_new_actions": 0,
                "total_new_decisions": 0,
                "overflow": 0,
                "ran": True,
            }
            return (
                f"_No new transcripts since last run._ "
                f"({total} transcripts tracked | "
                f"KB: {stats['total_items']} items)\n"
            )

        scorecard_prompt = get_scorecard_prompt()

        # Aggregate counters for summary report
        total_new_actions = 0
        total_new_decisions = 0
        total_scorecard_signals = 0
        all_action_summaries = []
        all_decision_summaries = []
        all_signal_summaries = []
        per_transcript_receipts = []

        failed_transcripts = []

        for i, t in enumerate(transcripts):
            rel = t["rel_path"]
            text = t["text"]
            meeting_date = t["meeting_date"]

            # Rate limit spacing: wait between calls (not before the first)
            if i > 0:
                self.logger.info(
                    f"[{self.key}] Waiting {INTER_CALL_DELAY}s for rate limit reset..."
                )
                time.sleep(INTER_CALL_DELAY)

            self.logger.info(
                f"[{self.key}] Extracting: {rel} ({t['line_count']} lines)"
            )

            try:
                # Structured extraction via AI
                extraction = self.call_anthropic(
                    system_prompt=(
                        "You are Orion, a strategic Chief of Staff extracting intelligence "
                        "from meeting transcripts for Christopher Ogle, Interim Creative Lead "
                        "at Performance Golf.\n\n"
                        f"{scorecard_prompt}\n\n"
                        "Extract ONLY Christopher-relevant items from this transcript as JSON. "
                        "Christopher is a LEADER — extract what HE needs to do and track, "
                        "not tasks for his team members.\n\n"
                        "Return ONLY valid JSON (no markdown, no explanation) with this structure:\n"
                        "{\n"
                        '  "attendees": ["Full Name", ...],\n'
                        '  "action_items": [\n'
                        "    {\n"
                        '      "text": "specific description",\n'
                        '      "owner": "Christopher Ogle",\n'
                        '      "category": "my_action or follow_up or milestone",\n'
                        '      "confidence": "explicit or inferred",\n'
                        '      "deadline": "YYYY-MM-DD or null",\n'
                        '      "deadline_text": "verbatim deadline language or null",\n'
                        '      "scorecard_alignment": "which 30/60/90 metric or null",\n'
                        '      "depends_on": "person Christopher is waiting on, or null"\n'
                        "    }\n"
                        "  ],\n"
                        '  "decisions": [\n'
                        "    {\n"
                        '      "text": "what was decided",\n'
                        '      "made_by": ["Name"],\n'
                        '      "context": "why this was decided"\n'
                        "    }\n"
                        "  ],\n"
                        '  "topics_discussed": [\n'
                        "    {\n"
                        '      "name": "short label (2-5 words)",\n'
                        '      "scorecard_alignment": "metric name or null"\n'
                        "    }\n"
                        "  ],\n"
                        '  "scorecard_signals": [\n'
                        "    {\n"
                        '      "metric": "scorecard metric name",\n'
                        '      "signal": "progress or risk or gap",\n'
                        '      "evidence": "what was said"\n'
                        "    }\n"
                        "  ]\n"
                        "}\n\n"
                        "CONFIDENCE FIELD:\n"
                        '- "explicit": Christopher used clear commitment language OR a trigger phrase.\n'
                        '- "inferred": You deduced the item from context but Christopher didn\'t explicitly commit.\n\n'
                        "TRIGGER PHRASES (always extract as explicit confidence):\n"
                        '- "add this as a task for my brief"\n'
                        '- "put this on my list"\n'
                        '- "Orion track this"\n'
                        '- "that\'s an action item for me"\n\n'
                        "ACTION ITEM CATEGORIES (only extract items that fit one of these):\n"
                        "- my_action: Christopher personally committed to doing something. "
                        "He said 'I will', 'I'll handle', 'let me', 'I need to', etc.\n"
                        "- follow_up: Someone ELSE committed to something that Christopher "
                        "needs to track or follow up on. Use 'depends_on' to name who.\n"
                        "- milestone: A key date, deadline, or checkpoint that Christopher "
                        "must be aware of (launch dates, review dates, hiring timelines).\n\n"
                        "DO NOT EXTRACT:\n"
                        "- Tasks assigned to team members that Christopher does not need to track\n"
                        "- Routine operational tasks (editing schedules, content calendars) "
                        "unless Christopher specifically committed to them\n"
                        "- Vague discussion points that aren't actionable\n"
                        "- Things Christopher MIGHT need to do based on context alone — "
                        "if he didn't say 'I will' or similar, DO NOT EXTRACT IT as my_action\n"
                        "- Team tasks where Christopher is not the directly responsible party\n\n"
                        "A transcript with ZERO action items is a valid result.\n\n"
                        "Rules:\n"
                        "- ALL action items must have owner 'Christopher Ogle'\n"
                        "- Infer deadlines from relative phrases using the meeting date: "
                        "\"next week\" → actual YYYY-MM-DD (Monday of next week), "
                        "\"by Friday\" → actual date of that Friday, "
                        "\"end of month\" → last day of month, "
                        "\"tomorrow\" → day after meeting date\n"
                        "- For follow_ups, fill 'depends_on' with the person's full name\n"
                        "- Map topics to scorecard metrics when there's a clear connection\n"
                        "- For scorecard_signals, only include genuine evidence of progress or risk\n"
                        "- If a section has no items, use an empty array []\n"
                        "- Quality over quantity: 2-4 high-signal action items per meeting is typical. "
                        "10+ items means you're capturing noise.\n"
                    ),
                    user_content=f"Meeting transcript ({rel}, {meeting_date}):\n\n{text}",
                    max_tokens=3000,
                )
            except Exception as e:
                # Per-transcript error isolation: log, record failure, continue to next
                self.logger.error(
                    f"[{self.key}] Failed to extract {rel}: {e}. Continuing with remaining transcripts."
                )
                stem = Path(rel).stem
                friendly = stem[7:].replace("-", " ").title() if len(stem) > 7 else stem
                failed_transcripts.append(friendly)
                per_transcript_receipts.append({
                    "rel_path": rel,
                    "friendly_name": friendly,
                    "meeting_date": meeting_date,
                    "action_items_added": 0,
                    "decisions_added": 0,
                    "scorecard_signals": 0,
                    "extraction_error": str(e),
                })
                # Do NOT mark as processed — retry next run
                continue

            # Parse the JSON response
            parsed = _parse_json_response(extraction)

            if not parsed:
                self.logger.warning(
                    f"[{self.key}] Failed to parse JSON for {rel}, skipping merge"
                )
                # Friendly name: strip date prefix and extension, replace hyphens
                stem = Path(rel).stem
                friendly = stem[7:].replace("-", " ").title() if len(stem) > 7 else stem
                per_transcript_receipts.append({
                    "rel_path": rel,
                    "friendly_name": friendly,
                    "meeting_date": meeting_date,
                    "action_items_added": 0,
                    "decisions_added": 0,
                    "scorecard_signals": 0,
                    "parse_failed": True,
                })
                kb["extraction_state"]["processed"].append(rel)
                continue

            # Merge into KB
            attendees = parsed.get("attendees", [])
            source_date = meeting_date

            ai_count, ai_ids = merge_action_items(
                kb, parsed.get("action_items", []), rel, source_date
            )
            dc_count = merge_decisions(
                kb, parsed.get("decisions", []), rel, source_date
            )
            tp_count, tp_ids = merge_topics(
                kb, parsed.get("topics_discussed", []), rel, source_date
            )

            # Update people
            update_people(kb, attendees, tp_ids, ai_ids, source_date)

            # Track scorecard signals
            signals = parsed.get("scorecard_signals", [])

            # Aggregate for summary
            total_new_actions += ai_count
            total_new_decisions += dc_count
            total_scorecard_signals += len(signals)

            for ai in parsed.get("action_items", []):
                cat = ai.get("category", "my_action")
                cat_label = {"my_action": "DO", "follow_up": "TRACK", "milestone": "DATE"}.get(cat, cat)
                depends = f" ← {ai['depends_on']}" if ai.get("depends_on") else ""
                all_action_summaries.append(f"  {len(all_action_summaries)+1}. [{cat_label}] {ai['text']}{depends}")

            for dc in parsed.get("decisions", []):
                all_decision_summaries.append(f"  {len(all_decision_summaries)+1}. {dc['text']}")

            for sig in signals:
                tag = sig.get("signal", "").upper()
                all_signal_summaries.append(
                    f"  {len(all_signal_summaries)+1}. [{tag}] {sig.get('metric', '')}: {sig.get('evidence', '')}"
                )

            # Mark as processed
            kb["extraction_state"]["processed"].append(rel)

            # Incremental KB save — preserve successful extractions even if later ones fail
            save_kb(kb)

            # Receipt entry for this transcript
            stem = Path(rel).stem
            friendly = stem[7:].replace("-", " ").title() if len(stem) > 7 else stem
            per_transcript_receipts.append({
                "rel_path": rel,
                "friendly_name": friendly,
                "meeting_date": meeting_date,
                "action_items_added": ai_count,
                "decisions_added": dc_count,
                "scorecard_signals": len(signals),
                "parse_failed": False,
            })

        # Apply overrides + approvals + prune stale items
        apply_overrides(kb)
        apply_approvals(kb)
        prune_counts = prune_stale(kb)

        # Save KB
        kb["extraction_state"]["last_run"] = datetime.now().isoformat()
        save_kb(kb)

        # Write receipt to shared_state for M00
        self.shared_state["m9_receipt"] = {
            "transcripts": per_transcript_receipts,
            "total_new_actions": total_new_actions,
            "total_new_decisions": total_new_decisions,
            "overflow": overflow,
            "ran": True,
            "decision_summaries": all_decision_summaries,
            "signal_summaries": all_signal_summaries,
        }

        # Build summary report
        stats = kb_stats(kb)
        lines = []

        succeeded = len(transcripts) - len(failed_transcripts)
        if failed_transcripts:
            lines.append(
                f"**{succeeded}/{len(transcripts)} transcript(s)** processed (Day {day} of 90)"
                + (f" | {overflow} more queued" if overflow else "")
                + ".\n"
            )
            lines.append(
                f"**Failed ({len(failed_transcripts)}):** {', '.join(failed_transcripts)} "
                f"— will retry next run.\n"
            )
        else:
            lines.append(
                f"**{len(transcripts)} new transcript(s)** processed (Day {day} of 90)"
                + (f" | {overflow} more queued" if overflow else "")
                + ".\n"
            )

        # Yesterday's Meetings status
        yesterday = date.today() - timedelta(days=1)
        yest_prefix = yesterday.strftime("%m%d%y")  # MMDDYY format matching filenames
        yest_label = yesterday.strftime("%b %d")
        processed_rels = [t["rel_path"] for t in transcripts]
        all_processed = set(kb["extraction_state"].get("processed", []))
        # Find all yesterday's transcripts (processed this run or previously)
        yest_processed = []
        yest_pending = []
        if TRANSCRIPTS_DIR.exists():
            for md_file in TRANSCRIPTS_DIR.rglob("*.md"):
                if md_file.stem.startswith(yest_prefix):
                    rel = str(md_file.relative_to(TRANSCRIPTS_DIR))
                    # Friendly name: strip date prefix and extension, replace hyphens
                    friendly = md_file.stem[7:].replace("-", " ").title() if len(md_file.stem) > 7 else md_file.stem
                    if rel in all_processed or rel in processed_rels:
                        yest_processed.append(friendly)
                    else:
                        yest_pending.append(friendly)
        yest_total = len(yest_processed) + len(yest_pending)
        if yest_total > 0:
            names = ", ".join(yest_processed) if yest_processed else "none yet"
            lines.append(
                f"**Yesterday's Meetings ({yest_label}, {len(yest_processed)}/{yest_total} processed):** {names}"
            )
            if yest_pending:
                lines.append(f"  _Pending:_ {', '.join(yest_pending)}")
            lines.append("")

        if migrated:
            legacy_count = len(kb["extraction_state"].get("legacy_processed", []))
            lines.append(
                f"_State migration complete: {legacy_count} legacy transcripts tracked._\n"
            )

        if total_new_actions > 0:
            lines.append(f"**New Items → Pending Review ({total_new_actions}):**")
            lines.extend(all_action_summaries[:10])  # Cap display at 10
            if len(all_action_summaries) > 10:
                lines.append(f"  - _...and {len(all_action_summaries) - 10} more_")
            lines.append("")

        if total_new_decisions > 0:
            lines.append(f"**Decisions Made ({total_new_decisions}):**")
            lines.extend(all_decision_summaries[:5])
            lines.append("")

        if total_scorecard_signals > 0:
            lines.append(f"**Scorecard Signals ({total_scorecard_signals}):**")
            lines.extend(all_signal_summaries)
            lines.append("")

        # KB status line
        pending_str = f" | {stats['pending_action_items']} pending review" if stats.get('pending_action_items') else ""
        lines.append(
            f"_KB: {stats['total_items']} items | "
            f"{stats['open_action_items']} open actions{pending_str} | "
            f"{stats['active_topics']} active topics | "
            f"{stats['people_tracked']} people tracked_"
        )

        if prune_counts["items_pruned"] or prune_counts["topics_dormant"]:
            lines.append(
                f"_Pruned: {prune_counts['items_pruned']} stale items, "
                f"{prune_counts['topics_dormant']} dormant topics_"
            )

        if overflow:
            lines.append(
                f"\n_**{overflow} additional transcript(s)** will be analyzed "
                f"in tomorrow's briefing._"
            )

        return "\n".join(lines)
