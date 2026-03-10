#!/usr/bin/env python3
"""Token Estimator — Tracks cumulative context load and classifies into cost/quality zones.

Monitors written files and estimates total token load. Classifies into zones:
- GREEN:    0-150K tokens  — within subscription, optimal quality
- YELLOW:   150K-200K      — approaching premium pricing boundary
- ORANGE:   200K-500K      — premium pricing active, moderate context rot risk
- RED:      500K-750K      — significant rot, prepare for session break
- CRITICAL: 750K-1M        — approaching limit, halt recommended

Usage:
    Single file:  python3 token_estimator.py <file_path>
    Summary:      python3 token_estimator.py --summary <project_directory>

Returns JSON feedback on stdout when zone transitions occur or when in warning zones.
"""

import json
import os
import sys
from pathlib import Path
from typing import Optional

# Token estimation: ~4 characters per token (conservative estimate)
CHARS_PER_TOKEN = 4

# Zone boundaries (in tokens)
ZONES = {
    "GREEN":    (0,      150_000),
    "YELLOW":   (150_000, 200_000),
    "ORANGE":   (200_000, 500_000),
    "RED":      (500_000, 750_000),
    "CRITICAL": (750_000, 1_000_000),
}

# Zone messages
ZONE_MESSAGES = {
    "GREEN": None,  # No message needed
    "YELLOW": (
        "CONTEXT ZONE: YELLOW (150K-200K tokens). Approaching premium pricing boundary "
        "(Opus 200K limit). Consider whether remaining work justifies premium pricing or "
        "if a session break would be more cost-effective. Quality remains optimal."
    ),
    "ORANGE": (
        "CONTEXT ZONE: ORANGE (200K-500K tokens). Premium pricing active. Moderate context "
        "rot risk — double MC-CHECK frequency. Monitor for synthesis-from-memory behavior. "
        "If using Opus, you have exceeded the 200K window — switch to Sonnet or take a session break."
    ),
    "RED": (
        "CONTEXT ZONE: RED (500K-750K tokens). Significant context rot risk. Prepare "
        "SESSION-HANDOFF.md for session break. MC-CHECK every microskill. Complete current "
        "gate then recommend session break to the operator."
    ),
    "CRITICAL": (
        "CONTEXT ZONE: CRITICAL (750K-1M tokens). Approaching context limit. HALT new "
        "complex operations. Complete ONLY the current atomic action. Generate mandatory "
        "state handoff. DO NOT attempt new skills. Recommend immediate session break."
    ),
}

# State file for tracking cumulative sizes across hook invocations
STATE_FILE = Path(__file__).parent.parent / ".token-estimator-state.json"


def estimate_tokens(file_path: str) -> int:
    """Estimate token count for a file based on character count."""
    try:
        size = os.path.getsize(file_path)
        return size // CHARS_PER_TOKEN
    except OSError:
        return 0


def get_zone(tokens: int) -> str:
    """Classify token count into a zone."""
    for zone, (low, high) in ZONES.items():
        if low <= tokens < high:
            return zone
    if tokens >= 1_000_000:
        return "CRITICAL"
    return "GREEN"


def load_state() -> dict:
    """Load cumulative state from state file."""
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text())
        except (json.JSONDecodeError, OSError):
            pass
    return {"total_tokens": 0, "files_tracked": {}, "last_zone": "GREEN"}


def save_state(state: dict):
    """Save cumulative state to state file."""
    try:
        STATE_FILE.write_text(json.dumps(state, indent=2))
    except OSError:
        pass


def track_file(file_path: str) -> Optional[dict]:
    """Track a file write and return zone feedback if warranted."""
    path = Path(file_path)

    if not path.exists():
        return None

    # Skip non-content files
    if path.suffix not in (".md", ".json", ".yaml", ".yml", ".txt", ".py"):
        return None

    state = load_state()

    # Estimate tokens for this file
    file_tokens = estimate_tokens(file_path)
    abs_path = str(path.resolve())

    # Update tracking (replace if file was already tracked)
    old_tokens = state["files_tracked"].get(abs_path, 0)
    state["total_tokens"] = state["total_tokens"] - old_tokens + file_tokens
    state["files_tracked"][abs_path] = file_tokens

    # Determine current zone
    current_zone = get_zone(state["total_tokens"])
    previous_zone = state.get("last_zone", "GREEN")
    state["last_zone"] = current_zone

    save_state(state)

    # Return feedback on zone transition or if in warning zone
    message = ZONE_MESSAGES.get(current_zone)

    if message is None:
        return None

    # Only report if zone changed or if in RED/CRITICAL
    if current_zone == previous_zone and current_zone not in ("RED", "CRITICAL"):
        return None

    result = {
        "validator": "token_estimator",
        "file": str(path),
        "severity": "INFO" if current_zone == "YELLOW" else "WARNING",
        "zone": current_zone,
        "total_tokens_estimated": state["total_tokens"],
        "files_tracked_count": len(state["files_tracked"]),
        "message": message,
    }

    # Emit event-driven reminder on zone transitions (Detector 6)
    if current_zone != previous_zone and current_zone != "GREEN":
        result["reminder"] = {
            "type": "reminder",
            "detector": "context_pressure",
            "severity": "warning" if current_zone in ("YELLOW", "ORANGE") else "critical",
            "message": (
                f"CONTEXT PRESSURE: Zone transition {previous_zone} -> {current_zone}. "
                f"Estimated {state['total_tokens']:,} tokens."
            ),
            "action_required": (
                "Follow Zone Response Protocol in SYSTEM-CORE.md for "
                f"{current_zone} zone."
            ),
        }

    return result


def summarize_project(project_dir: str) -> Optional[dict]:
    """Summarize token load for an entire project directory."""
    project_path = Path(project_dir)

    if not project_path.is_dir():
        return None

    total_tokens = 0
    file_count = 0

    for ext in (".md", ".json", ".yaml", ".yml", ".txt"):
        for f in project_path.rglob(f"*{ext}"):
            total_tokens += estimate_tokens(str(f))
            file_count += 1

    zone = get_zone(total_tokens)
    message = ZONE_MESSAGES.get(zone)

    if message is None and zone == "GREEN":
        return None

    return {
        "validator": "token_estimator",
        "directory": str(project_path),
        "severity": "INFO" if zone in ("GREEN", "YELLOW") else "WARNING",
        "zone": zone,
        "total_tokens_estimated": total_tokens,
        "total_files": file_count,
        "message": message or f"Project context load: {total_tokens:,} tokens ({zone} zone).",
    }


def main():
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    if sys.argv[1] == "--summary":
        if len(sys.argv) < 3:
            print("{}")
            sys.exit(0)
        result = summarize_project(sys.argv[2])
    else:
        result = track_file(sys.argv[1])

    if result:
        print(json.dumps(result))
    else:
        print("{}")


if __name__ == "__main__":
    main()
