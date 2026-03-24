#!/usr/bin/env python3
"""Quick Report Refresh — re-renders task sections (M00a, M0b, M0) in-place.

Called by the Orion Personal Bot after task modifications (complete, create,
reschedule) to keep today's daily brief in sync without re-running the full
16-module pipeline (~10 min).

Approach:
1. Load config + env from daily-briefing
2. Fetch calendar events + compute week capacity (Phase 1.5 light)
3. Run M0, M0b, M00a modules in isolation
4. Patch those sections into the existing report using HTML comment markers
5. Exit with report path on stdout

Runs in ~10-20 seconds (one Calendar API call + pure data formatting).

Usage:
    .venv/bin/python3 quick_refresh.py
"""

import json
import logging
import re
import sys
import time
from collections import defaultdict
from datetime import date, timedelta
from pathlib import Path

import yaml

SCRIPT_DIR = Path(__file__).resolve().parent
REPORTS_BASE = SCRIPT_DIR.parent / "daily-reports"
CONFIG_PATH = SCRIPT_DIR / "config.yaml"
ENV_PATH = SCRIPT_DIR / ".env"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(name)s] %(levelname)s: %(message)s",
)
logger = logging.getLogger("quick-refresh")


def load_env() -> dict:
    env = {}
    if not ENV_PATH.exists():
        return env
    with open(ENV_PATH) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                env[key.strip()] = val.strip()
    return env


def reports_dir() -> Path:
    today = date.today()
    month_abbr = today.strftime("%b").lower()
    year_suffix = today.strftime("%y")
    return REPORTS_BASE / f"{month_abbr}-{year_suffix}-reports"


def load_existing_report(report_path: Path) -> str | None:
    if report_path.exists():
        return report_path.read_text(encoding="utf-8")
    return None


def patch_section(report: str, marker: str, new_content: str) -> str:
    """Replace content between <!-- {marker}:START --> and <!-- {marker}:END -->."""
    pattern = re.compile(
        rf"(<!-- {re.escape(marker)}:START -->\n)(.*?)(<!-- {re.escape(marker)}:END -->)",
        re.DOTALL,
    )
    match = pattern.search(report)
    if match:
        return pattern.sub(rf"\g<1>{new_content}\g<3>", report)
    else:
        logger.warning(f"Marker {marker} not found in report — skipping patch")
        return report


def build_shared_state(config: dict, env: dict) -> dict:
    """Build minimal shared_state with calendar events + week capacity."""
    shared_state = {}

    # Calendar events
    try:
        from modules.calendar_helper import get_calendar_service, fetch_events_range, parse_event
        service = get_calendar_service(env)
        today_date = date.today()
        yesterday = today_date - timedelta(days=1)
        week_end = today_date + timedelta(days=6)
        tz = config.get("report", {}).get("display_timezone",
             config.get("report", {}).get("timezone", "America/New_York"))
        raw_events = fetch_events_range(service, yesterday, week_end, tz)
        parsed = [parse_event(e, tz) for e in raw_events]
        parsed = [e for e in parsed if e["status"] != "cancelled"
                  and e["self_response"] != "declined"]

        day_loads = defaultdict(lambda: {"meeting_count": 0, "meeting_minutes": 0})
        calendar_day_events = defaultdict(list)
        for ev in parsed:
            if not ev["is_all_day"] and ev["start_dt"]:
                d = ev["start_dt"].date().isoformat()
                day_loads[d]["meeting_count"] += 1
                day_loads[d]["meeting_minutes"] += ev["duration_minutes"] or 0
                calendar_day_events[d].append(ev)

        shared_state["calendar_day_loads"] = dict(day_loads)
        shared_state["calendar_day_events"] = dict(calendar_day_events)
        logger.info(f"Calendar pre-fetch: {len(day_loads)} days loaded")
    except Exception as e:
        logger.warning(f"Calendar pre-fetch failed (non-fatal): {e}")

    # Week capacity
    try:
        from modules.capacity_engine import load_work_blocks, compute_week_capacity
        prefs_path = SCRIPT_DIR / ".kb-preferences.json"
        prefs = {}
        if prefs_path.exists():
            with open(prefs_path, encoding="utf-8") as f:
                prefs = json.load(f)
        work_blocks = load_work_blocks(prefs)
        today_date = date.today()
        cal_events = shared_state.get("calendar_day_events", {})
        day_type_rules = config.get("modules", {}).get(
            "triage_intelligence", {}).get("day_type_rules")
        week_cap = compute_week_capacity(
            today_date, 7, work_blocks, cal_events, day_type_rules
        )
        shared_state["week_capacity"] = week_cap
        logger.info(f"Week capacity computed: {len(week_cap)} days")
    except Exception as e:
        logger.warning(f"Week capacity computation failed (non-fatal): {e}")

    return shared_state


def run_module(module_class, config: dict, env: dict, shared_state: dict) -> str:
    """Run a single module and return its formatted section content (no header)."""
    mod = module_class(config=config, env=env, logger=logger, shared_state=shared_state)
    section = mod.run()
    return section


def main():
    start = time.time()
    logger.info("Quick refresh starting...")

    # Load config + env
    if CONFIG_PATH.exists():
        with open(CONFIG_PATH, encoding="utf-8") as f:
            config = yaml.safe_load(f) or {}
    else:
        config = {}
    env = load_env()

    # Find today's report
    report_path = reports_dir() / f"{date.today()}.md"
    report = load_existing_report(report_path)
    if report is None:
        logger.error(f"No existing report to patch: {report_path}")
        print(f"ERROR=No report found at {report_path}", file=sys.stderr)
        sys.exit(1)

    # Build shared_state (calendar + capacity)
    shared_state = build_shared_state(config, env)

    # Import and run the 3 task modules
    from modules.m0_persistent_actions import PersistentActionsModule
    from modules.m0b_pending_review import PendingReviewModule
    from modules.m00a_today_summary import TodaySummaryModule

    # M0b first (pending review)
    logger.info("Running M0b (Pending Review)...")
    m0b_section = run_module(PendingReviewModule, config, env, shared_state)

    # M0 (action items tracker)
    logger.info("Running M0 (Action Items Tracker)...")
    m0_section = run_module(PersistentActionsModule, config, env, shared_state)

    # M00a last (needs M0's shared_state contributions)
    logger.info("Running M00a (Today at a Glance)...")
    m00a_section = run_module(TodaySummaryModule, config, env, shared_state)

    # Extract inner content (between module header and end) for patching
    # The modules return "### Module Name\n\ncontent\n" — we need just the content
    # between the markers, which the module itself writes using markers.

    # Patch each section into the report
    # M00a includes its own markers in its output
    def extract_marker_content(section: str, marker: str) -> str | None:
        """Extract content between markers from a module's output."""
        pattern = re.compile(
            rf"<!-- {re.escape(marker)}:START -->\n(.*?)<!-- {re.escape(marker)}:END -->",
            re.DOTALL,
        )
        match = pattern.search(section)
        return match.group(1) if match else None

    # Check if modules embed markers in their output
    m00a_inner = extract_marker_content(m00a_section, "M00a")
    m0b_inner = extract_marker_content(m0b_section, "M0b")
    m0_inner = extract_marker_content(m0_section, "M0")

    if m00a_inner is not None:
        report = patch_section(report, "M00a", m00a_inner)
        logger.info("Patched M00a section")
    else:
        # Fallback: replace the full section between markers with module output
        logger.warning("M00a markers not found in module output — using full replace")
        # Strip the "### Module Name\n\n" header
        content = re.sub(r"^### .*?\n\n", "", m00a_section, count=1)
        report = patch_section(report, "M00a", content)

    if m0b_inner is not None:
        report = patch_section(report, "M0b", m0b_inner)
        logger.info("Patched M0b section")
    else:
        content = re.sub(r"^### .*?\n\n", "", m0b_section, count=1)
        report = patch_section(report, "M0b", content)

    if m0_inner is not None:
        report = patch_section(report, "M0", m0_inner)
        logger.info("Patched M0 section")
    else:
        content = re.sub(r"^### .*?\n\n", "", m0_section, count=1)
        report = patch_section(report, "M0", content)

    # Write the patched report
    report_path.write_text(report, encoding="utf-8")

    duration = time.time() - start
    logger.info(f"Quick refresh complete in {duration:.1f}s — {report_path}")
    print(f"REPORT_PATH={report_path}")
    print(f"DURATION={duration:.1f}s")


if __name__ == "__main__":
    main()
