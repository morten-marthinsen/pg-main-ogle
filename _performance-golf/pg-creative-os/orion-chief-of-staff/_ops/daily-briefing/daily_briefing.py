#!/usr/bin/env python3
"""
Orion Daily Executive Briefing
=============================
Orchestrates 7 modular data-fetch + AI-analysis pipelines
and assembles a markdown daily report for Christopher.

Usage:
    python3 daily_briefing.py              # Normal run
    python3 daily_briefing.py --dry-run    # Show what would run without writing
"""

import argparse
import logging
import socket
import subprocess
import sys
import time
from datetime import datetime, date
from pathlib import Path

import yaml

# ── Paths ────────────────────────────────────────────────────────────────────

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent.parent  # exa-chief-of-staff/
REPORTS_BASE = SCRIPT_DIR.parent / "daily-reports"
LOG_DIR = SCRIPT_DIR / "logs"
CONFIG_PATH = SCRIPT_DIR / "config.yaml"
ENV_PATH = SCRIPT_DIR / ".env"

VERSION = "2.0.0"

# Day 1 of the 90-day plan: Feb 10, 2026
DAY_ONE = date(2026, 2, 10)


# ── Helpers ──────────────────────────────────────────────────────────────────

def load_env() -> dict:
    """Load credentials from .env file with retry for transient iCloud file locks."""
    env = {}
    if not ENV_PATH.exists():
        return env
    for attempt in range(3):
        try:
            with open(ENV_PATH) as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        key, val = line.split("=", 1)
                        env[key.strip()] = val.strip()
            return env
        except OSError as e:
            if attempt < 2:
                time.sleep(1)
            else:
                raise
    return env


def load_config() -> dict:
    """Load config.yaml."""
    if not CONFIG_PATH.exists():
        return {}
    with open(CONFIG_PATH) as f:
        return yaml.safe_load(f) or {}


def setup_logging() -> logging.Logger:
    """Configure logging to file + stdout."""
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    log_file = LOG_DIR / f"briefing-{datetime.now().strftime('%Y%m%d-%H%M%S')}.log"

    logger = logging.getLogger("orion_daily_briefing")
    logger.setLevel(logging.INFO)

    # File handler
    fh = logging.FileHandler(log_file)
    fh.setLevel(logging.INFO)
    fh.setFormatter(logging.Formatter("[%(asctime)s] %(levelname)s %(message)s"))
    logger.addHandler(fh)

    # Console handler
    ch = logging.StreamHandler(sys.stdout)
    ch.setLevel(logging.INFO)
    ch.setFormatter(logging.Formatter("[%(asctime)s] %(message)s"))
    logger.addHandler(ch)

    return logger


def day_count() -> int:
    """Calculate current day in the 90-day plan."""
    delta = date.today() - DAY_ONE
    return max(1, delta.days + 1)


def check_network(max_attempts: int = 6, delay: int = 10) -> bool:
    """Pre-flight: verify DNS resolution for critical APIs.

    Retries up to max_attempts with delay seconds between attempts to handle
    the common case where launchd fires before WiFi reconnects after sleep.

    Returns True if at least one host resolves (partial connectivity is enough
    for some modules to succeed). Returns False only if ALL hosts fail across
    all attempts — network is genuinely down.
    """
    log = logging.getLogger("orion_daily_briefing")
    hosts = ["api.anthropic.com", "api.clickup.com", "oauth2.googleapis.com"]
    for attempt in range(1, max_attempts + 1):
        for host in hosts:
            try:
                socket.getaddrinfo(host, 443)
                if attempt > 1:
                    log.info(f"Network available on attempt {attempt}")
                return True  # At least one resolves — proceed
            except socket.gaierror:
                continue
        if attempt < max_attempts:
            log.info(f"Network attempt {attempt}/{max_attempts} failed, retrying in {delay}s...")
            time.sleep(delay)
    return False  # All attempts exhausted — network genuinely down


def git_fetch(config: dict, logger: logging.Logger) -> dict:
    """Fetch from pg-main remote. Returns status dict for shared_state.

    Never merges — fetch only. Uses a short timeout so network issues
    don't block the rest of the report.
    """
    fetch_cfg = config.get("git_fetch", {})
    if not fetch_cfg.get("enabled", False):
        return {"status": "disabled"}

    remote = fetch_cfg.get("remote", "pg-main")
    branch = fetch_cfg.get("branch", "main")
    timeout = fetch_cfg.get("timeout_seconds", 10)

    try:
        result = subprocess.run(
            ["git", "fetch", remote, branch],
            capture_output=True, text=True, timeout=timeout,
            cwd=str(SCRIPT_DIR),
        )
        if result.returncode != 0:
            reason = (result.stderr or result.stdout or "unknown error").strip()
            logger.warning(f"[Git Fetch] Failed: {reason}")
            return {"status": "failed", "reason": reason}

        # Get new commits on remote since last merge
        # Find the merge-base (last common ancestor) between HEAD and the fetched branch
        merge_base = subprocess.run(
            ["git", "merge-base", "HEAD", f"{remote}/{branch}"],
            capture_output=True, text=True, timeout=5,
            cwd=str(SCRIPT_DIR),
        )
        if merge_base.returncode != 0:
            logger.info("[Git Fetch] Fetch OK but could not determine merge-base")
            return {"status": "success", "new_commits": []}

        base_sha = merge_base.stdout.strip()

        # List commits on remote/branch that are not yet merged
        log_result = subprocess.run(
            ["git", "log", "--oneline", f"{base_sha}..{remote}/{branch}"],
            capture_output=True, text=True, timeout=5,
            cwd=str(SCRIPT_DIR),
        )
        commits = []
        if log_result.returncode == 0 and log_result.stdout.strip():
            for line in log_result.stdout.strip().splitlines():
                commits.append(line.strip())

        logger.info(f"[Git Fetch] Success — {len(commits)} new commit(s) on {remote}/{branch}")
        return {"status": "success", "new_commits": commits}

    except subprocess.TimeoutExpired:
        logger.warning(f"[Git Fetch] Timed out after {timeout}s")
        return {"status": "failed", "reason": f"timed out after {timeout}s"}
    except FileNotFoundError:
        logger.warning("[Git Fetch] git command not found")
        return {"status": "failed", "reason": "git not found on PATH"}
    except Exception as e:
        logger.warning(f"[Git Fetch] Unexpected error: {e}")
        return {"status": "failed", "reason": str(e)}


def reports_dir() -> Path:
    """Return monthly subfolder for reports (e.g., daily-reports/feb-26-reports/)."""
    today = date.today()
    folder_name = f"{today.strftime('%b').lower()}-{today.strftime('%y')}-reports"
    return REPORTS_BASE / folder_name


# ── Report Assembly ──────────────────────────────────────────────────────────

def assemble_report(sections: list, module_statuses: list, config: dict) -> str:
    """Combine module outputs into the final markdown report."""
    today = date.today()
    now = datetime.now()
    current_day = day_count()

    total = len(module_statuses)
    active = sum(1 for s in module_statuses if s["status"] == "active")
    skeleton = sum(1 for s in module_statuses if s["status"] == "skeleton")
    failed = sum(1 for s in module_statuses if s["status"] == "error")

    # Header
    report = f"""# Orion Daily Briefing — {today.strftime('%A, %B %d, %Y')}

> **Generated**: {now.strftime('%I:%M %p')} | **Day {current_day}** of 90
> **Modules**: {active} active / {skeleton} pending setup / {failed} failed (of {total} total)

---

"""

    # Module sections
    for section in sections:
        report += section + "\n---\n\n"

    # Module status table
    report += "### Module Status\n\n"
    report += "| # | Module | Status | Setup Required |\n"
    report += "|---|--------|--------|----------------|\n"
    for i, ms in enumerate(module_statuses, 1):
        status_icon = {"active": "LIVE", "skeleton": "PENDING", "error": "ERROR"}.get(
            ms["status"], "?"
        )
        report += f"| {i} | {ms['name']} | {status_icon} | {ms.get('setup', '—')} |\n"

    report += f"\n---\n\n*Generated by Orion Daily Briefing v{VERSION}*\n"
    report += "*Target review time: 5 minutes*\n"

    return report


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Orion Daily Executive Briefing")
    parser.add_argument("--dry-run", action="store_true",
                        help="Show what would run without writing the report")
    args = parser.parse_args()

    logger = setup_logging()
    logger.info("=" * 50)
    logger.info("ORION DAILY BRIEFING — Starting")
    logger.info("=" * 50)

    config = load_config()
    env = load_env()

    logger.info(f"Day {day_count()} of 90-day plan")
    logger.info(f"Config loaded: {len(config.get('modules', {}))} modules configured")

    # Network pre-flight check — retries up to 60s for WiFi after sleep
    if not args.dry_run and not check_network():
        logger.error("Network pre-flight FAILED — all critical hosts unreachable "
                      "after 6 attempts. No report generated.")
        sys.exit(1)
    logger.info("Network pre-flight: OK")

    # Import module registry
    from modules import MODULE_REGISTRY

    modules_config = config.get("modules", {})
    sections = []
    module_statuses = []
    shared_state = {}

    # ── Git Fetch (before any module runs) ────────────────────────────────────
    if not args.dry_run:
        fetch_result = git_fetch(config, logger)
        shared_state["git_fetch"] = fetch_result

    # ── Phase 1: Run M9 first so it updates the KB before M0 reads it ────────
    m9_key = "m9_transcript_intelligence"
    m9_section = None
    m9_status = None

    if not args.dry_run:
        m9_config = modules_config.get(m9_key, {})
        m9_enabled = m9_config.get("enabled", False)
        if m9_enabled:
            logger.info(f"[Phase 1] Running {m9_key} first to update KB...")
            # Find M9 class from registry
            m9_class = None
            for rkey, rcls in MODULE_REGISTRY:
                if rkey == m9_key:
                    m9_class = rcls
                    break
            if m9_class:
                mod = m9_class(config=config, env=env, logger=logger, shared_state=shared_state)
                m9_section = mod.run()
                if mod._error:
                    m9_status = "error"
                else:
                    m9_status = "active"
                logger.info(f"[Phase 1] {m9_key} complete. Receipt written to shared_state.")

    # ── Phase 1.5: Pre-fetch calendar + ClickUp for triage intelligence ────────
    if not args.dry_run:
        # Calendar day loads for schedule suggestions
        try:
            from modules.calendar_helper import get_calendar_service, fetch_events_range, parse_event
            service = get_calendar_service(env)
            today_date = date.today()
            yesterday = today_date - __import__("datetime").timedelta(days=1)
            week_end = today_date + __import__("datetime").timedelta(days=6)
            tz = config.get("report", {}).get("display_timezone",
                 config.get("report", {}).get("timezone", "America/New_York"))
            raw_events = fetch_events_range(service, yesterday, week_end, tz)
            parsed = [parse_event(e, tz) for e in raw_events]
            parsed = [e for e in parsed if e["status"] != "cancelled"
                      and e["self_response"] != "declined"]
            from collections import defaultdict
            day_loads = defaultdict(lambda: {"meeting_count": 0, "meeting_minutes": 0})
            for ev in parsed:
                if not ev["is_all_day"] and ev["start_dt"]:
                    d = ev["start_dt"].date().isoformat()
                    day_loads[d]["meeting_count"] += 1
                    day_loads[d]["meeting_minutes"] += ev["duration_minutes"] or 0
            shared_state["calendar_day_loads"] = dict(day_loads)
            # Also store per-day events for capacity engine overlap calculation
            calendar_day_events = defaultdict(list)
            for ev in parsed:
                if not ev["is_all_day"] and ev["start_dt"]:
                    d = ev["start_dt"].date().isoformat()
                    calendar_day_events[d].append(ev)
            shared_state["calendar_day_events"] = dict(calendar_day_events)
            logger.info(f"[Phase 1.5] Calendar pre-fetch: {len(day_loads)} days loaded")
        except Exception as e:
            logger.warning(f"[Phase 1.5] Calendar pre-fetch failed: {e}")

        # ClickUp task names for dedup matching
        try:
            cu_token = env.get("CLICKUP_API_TOKEN", "")
            cu_workspace = env.get("CLICKUP_WORKSPACE_ID", "")
            if cu_token and cu_workspace:
                import requests as _req
                from modules.clickup_helper import BASE_URL as CU_URL, CHRISTOPHER_USER_ID as CU_USER, filter_active_tasks
                all_cu = []
                pg = 0
                while True:
                    r = _req.get(
                        f"{CU_URL}/team/{cu_workspace}/task",
                        headers={"Authorization": cu_token},
                        params={"assignees[]": CU_USER, "include_closed": "false", "page": str(pg)},
                        timeout=30,
                    )
                    r.raise_for_status()
                    batch = r.json().get("tasks", [])
                    if not batch:
                        break
                    all_cu.extend(batch)
                    if len(batch) < 100:
                        break
                    pg += 1
                exclude = set(config.get("clickup", {}).get("exclude_statuses", [])) or None
                active_cu = filter_active_tasks(all_cu, exclude)
                shared_state["clickup_tasks"] = [
                    {"id": t["id"], "name": t.get("name", ""),
                     "status": t.get("status", {}).get("status", ""),
                     "due_date": t.get("due_date"),
                     "tags": [tag.get("name", "") for tag in t.get("tags", [])],
                     "list_name": t.get("list", {}).get("name", ""),
                     "list_id": t.get("list", {}).get("id", "")}
                    for t in active_cu
                ]
                logger.info(f"[Phase 1.5] ClickUp pre-fetch: {len(active_cu)} tasks")

                # Launch detection — filter tasks by launch/milestone tags or list IDs
                intel_cfg = config.get("intelligence", {})
                if intel_cfg.get("launch_calendar", False):
                    launch_tags = set(
                        tag.lower() for tag in
                        intel_cfg.get("launch_indicators", {}).get("tags", [])
                    )
                    launch_list_ids = set(
                        intel_cfg.get("launch_indicators", {}).get("list_ids", [])
                    )
                    launches = []
                    for t in active_cu:
                        task_tags = {tag.get("name", "").lower() for tag in t.get("tags", [])}
                        task_list_id = t.get("list", {}).get("id", "")
                        if task_tags & launch_tags or (launch_list_ids and task_list_id in launch_list_ids):
                            launches.append({
                                "id": t["id"],
                                "name": t.get("name", ""),
                                "due_date": t.get("due_date"),
                                "status": t.get("status", {}).get("status", ""),
                                "list_name": t.get("list", {}).get("name", ""),
                            })
                    shared_state["launches"] = launches
                    logger.info(f"[Phase 1.5] Launch detection: {len(launches)} launch tasks found")
        except Exception as e:
            logger.warning(f"[Phase 1.5] ClickUp pre-fetch failed: {e}")

        # Compute week capacity from calendar + work blocks
        try:
            intel_cfg = config.get("intelligence", {})
            if intel_cfg.get("capacity_engine", False):
                from modules.capacity_engine import load_work_blocks, compute_week_capacity
                prefs_path = SCRIPT_DIR / ".kb-preferences.json"
                prefs = {}
                if prefs_path.exists():
                    import json as _json
                    with open(prefs_path, encoding="utf-8") as f:
                        prefs = _json.load(f)
                work_blocks = load_work_blocks(prefs)
                today_date = date.today()
                cal_events = shared_state.get("calendar_day_events", {})
                day_type_rules = config.get("modules", {}).get(
                    "triage_intelligence", {}).get("day_type_rules")
                week_cap = compute_week_capacity(
                    today_date, 7, work_blocks, cal_events, day_type_rules
                )
                shared_state["week_capacity"] = week_cap
                work_day_caps = [c for c in week_cap.values() if c.is_work_day]
                logger.info(
                    f"[Phase 1.5] Week capacity computed: "
                    f"{len(work_day_caps)} work days, "
                    f"{sum(c.a_task_slots for c in work_day_caps)} total A-slots"
                )
        except Exception as e:
            logger.warning(f"[Phase 1.5] Week capacity computation failed: {e}")

    # ── Phase 2: Run all modules in registry order ─────────────────────────────
    # M00a runs last (it's at end of MODULE_REGISTRY) but renders first.
    m00a_key = "m00a_today_summary"
    m00a_section = None
    m00a_status = None

    for key, module_class in MODULE_REGISTRY:
        mod_config = modules_config.get(key, {})
        enabled = mod_config.get("enabled", False)

        logger.info(f"Module {key}: enabled={enabled}")

        if args.dry_run:
            status = "active" if enabled else "skeleton"
            dry_status = {
                "name": module_class.name,
                "status": status,
                "setup": mod_config.get("setup_required", module_class.setup_required),
            }
            dry_section = f"### {module_class.name}\n\n_[DRY RUN] Would execute module._\n"
            # M00a: capture for display-first even in dry-run
            if key == m00a_key:
                m00a_section = dry_section
                m00a_status = dry_status
            else:
                module_statuses.append(dry_status)
                sections.append(dry_section)
            continue

        # M9 was already run in Phase 1 — insert its pre-computed section
        if key == m9_key:
            if m9_section is not None:
                sections.append(m9_section)
                module_statuses.append({
                    "name": module_class.name,
                    "status": m9_status,
                    "setup": mod_config.get("setup_required", module_class.setup_required),
                })
            else:
                # M9 disabled — still show it in status table
                module_statuses.append({
                    "name": module_class.name,
                    "status": "skeleton",
                    "setup": mod_config.get("setup_required", module_class.setup_required),
                })
                sections.append(f"### {module_class.name}\n\n_Module disabled._\n")
            continue

        # Instantiate and run — errors are caught inside module.run()
        mod = module_class(config=config, env=env, logger=logger, shared_state=shared_state)
        section = mod.run()

        if mod._error:
            status = "error"
        elif enabled:
            status = "active"
        else:
            status = "skeleton"

        # M00a: capture separately for display-first ordering
        if key == m00a_key:
            m00a_section = section
            m00a_status = {
                "name": module_class.name,
                "status": status,
                "setup": mod_config.get("setup_required", module_class.setup_required),
            }
            continue

        sections.append(section)
        module_statuses.append({
            "name": module_class.name,
            "status": status,
            "setup": mod_config.get("setup_required", module_class.setup_required),
        })

    # Insert M00a at the top of sections (display-first)
    if m00a_section is not None:
        sections.insert(0, m00a_section)
        module_statuses.insert(0, m00a_status)

    # Assemble report
    report = assemble_report(sections, module_statuses, config)

    if args.dry_run:
        logger.info("[DRY RUN] Report would be written to:")
        logger.info(f"  {reports_dir() / f'{date.today()}.md'}")
        print("\n" + report)
        return

    # Failure threshold — don't lock in a mostly-broken report
    total = len(module_statuses)
    failed = sum(1 for s in module_statuses if s["status"] == "error")
    if total > 0 and failed / total > 0.7:
        logger.warning(f"Too many failures ({failed}/{total}) — skipping report write, "
                        "will retry next cycle")
        sys.exit(0)

    # Write report
    out_dir = reports_dir()
    out_dir.mkdir(parents=True, exist_ok=True)
    report_path = out_dir / f"{date.today()}.md"
    report_path.write_text(report, encoding="utf-8")

    logger.info(f"Report written: {report_path}")
    logger.info(f"Report size: {len(report):,} chars")
    logger.info("=" * 50)
    logger.info("ORION DAILY BRIEFING — Complete")
    logger.info("=" * 50)

    # Print summary for wrapper script to parse
    print(f"REPORT_PATH={report_path}")
    print(f"MODULES_TOTAL={len(module_statuses)}")
    print(f"MODULES_ACTIVE={sum(1 for s in module_statuses if s['status'] == 'active')}")
    print(f"MODULES_FAILED={sum(1 for s in module_statuses if s['status'] == 'error')}")


if __name__ == "__main__":
    main()
