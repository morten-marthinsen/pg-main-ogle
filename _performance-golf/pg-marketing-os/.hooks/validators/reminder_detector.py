#!/usr/bin/env python3
"""Reminder Detector — Event-driven system reminders for execution degradation.

Implements Detectors 1 (Synthesis), 2 (Rushing), 4 (Abbreviation), 7 (Stale Reads)
from the Event-Driven Reminder Protocol (~system/protocols/EVENT-DRIVEN-REMINDERS.md).

Detectors 5 (Gate Drift) and 6 (Context Pressure) are implemented in their respective
validators (gate_validator.py, token_estimator.py). Detector 3 (Convergence) is Phase 3 — not yet built.

Usage:
    python3 reminder_detector.py <file_path>

Returns JSON reminder on stdout if a condition is detected, empty otherwise.
"""

import json
import os
import re
import sys
from pathlib import Path
from typing import Optional

# State file for tracking reads/writes across hook invocations
STATE_FILE = Path(__file__).parent.parent / ".reminder-state.json"

# Minimum file size thresholds (bytes) per microskill type — from SYSTEM-CORE.md
# 60% of these triggers the rushing detector
MINIMUM_THRESHOLDS = {
    "loader": 1024,          # 1KB — Loader/Validator (Layer 0)
    "evaluation": 2048,      # 2KB — Single-Dimension Evaluation
    "generation": 5120,      # 5KB — Complex Generation
    "analysis": 3072,        # 3KB — Multi-Element Analysis
    "validation": 3072,      # 3KB — Validation/Audit
    "synthesis": 5120,       # 5KB — Synthesis/Assembly
    "discovery": 2048,       # 2KB — Discovery/Search
}

RUSHING_THRESHOLD_RATIO = 0.60  # Fire if below 60% of minimum

# Abbreviation patterns — Detector 4
ABBREVIATION_PATTERNS = [
    r"\[continues?\s*(with|for|in)\b",
    r"\[additional\s+\w+\]",
    r"similar pattern for",
    r"\betc\.\b",
    r"\band so on\b",
    r"\[more\s+\w+\]",
    r"repeats?\s+(the|this)\s+pattern",
    r"\[remaining\s+\w+\]",
    r"follows?\s+(the\s+)?same\s+(format|pattern|structure)",
    r"\.\.\.\s*\]",
]

# Stale read threshold — Detector 7
STALE_READ_THRESHOLD = 6  # Fire after 6 consecutive writes without a read


def load_state() -> dict:
    """Load detector state from state file."""
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text())
        except (json.JSONDecodeError, OSError):
            pass
    return {
        "files_read": [],
        "consecutive_writes": 0,
        "session_id": None,
    }


def save_state(state: dict):
    """Save detector state to state file."""
    try:
        STATE_FILE.write_text(json.dumps(state, indent=2))
    except OSError:
        pass


def make_reminder(detector: str, severity: str, message: str, action: str) -> dict:
    """Create a structured reminder in the standard format."""
    return {
        "type": "reminder",
        "detector": detector,
        "severity": severity,
        "message": message,
        "action_required": action,
    }


def detect_abbreviation(content: str) -> Optional[dict]:
    """Detector 4: Scan for summary placeholder patterns in output content.

    Fires when output contains phrases like 'continues with...', '[additional examples]',
    'etc.', 'and so on' — indicators that the agent is abbreviating instead of generating
    complete output.
    """
    matches = []
    for pattern in ABBREVIATION_PATTERNS:
        found = re.findall(pattern, content, re.IGNORECASE)
        if found:
            # Get the actual matched text for the first occurrence
            match = re.search(pattern, content, re.IGNORECASE)
            if match:
                matches.append(match.group(0))

    if not matches:
        return None

    matched_text = matches[0]
    return make_reminder(
        detector="abbreviation",
        severity="warning",
        message=(
            f'ABBREVIATION ALERT: Output contains summary placeholder language: '
            f'"{matched_text}". Full output is required. '
            f'"Close enough" does not exist (Law 6).'
        ),
        action="Replace the abbreviated section with complete, specific content.",
    )


def detect_stale_reads(state: dict) -> Optional[dict]:
    """Detector 7: Track read/write action ratio.

    Fires when the agent executes 6+ consecutive Write/Edit actions without any Read.
    Extended generation without source consultation risks drift from foundation decisions.
    """
    count = state.get("consecutive_writes", 0)

    if count < STALE_READ_THRESHOLD:
        return None

    return make_reminder(
        detector="stale_reads",
        severity="warning",
        message=(
            f"STALE READ WARNING: You have written {count} files without reading "
            f"any source files. Extended generation without source consultation "
            f"risks drift from foundation decisions."
        ),
        action=(
            "Re-read the context reservoir and current skill's upstream packages "
            "before continuing."
        ),
    )


def detect_rushing(filepath: str, content: str) -> Optional[dict]:
    """Detector 2: Compare file size against microskill minimum thresholds.

    Fires when an output file is below 60% of the expected minimum size for its
    microskill type. Uses filepath patterns to infer the microskill type.
    """
    file_size = len(content.encode("utf-8"))
    path = Path(filepath)

    # Only check files in outputs directories
    if "outputs" not in str(path) and "~outputs" not in str(path):
        return None

    # Skip non-content files
    if path.suffix not in (".md", ".json", ".yaml", ".yml"):
        return None

    # Skip small utility files (checkpoints, logs, state files)
    if any(
        kw in path.name.lower()
        for kw in ("checkpoint", "log", "state", "handoff", "session")
    ):
        return None

    # Infer microskill type from path/filename patterns
    name_lower = path.name.lower()
    threshold = None
    skill_type = None

    if "layer-0" in str(path) or "loader" in name_lower or "validator" in name_lower:
        threshold = MINIMUM_THRESHOLDS["loader"]
        skill_type = "Loader/Validator"
    elif "layer-3" in str(path) or "gate" in name_lower or "audit" in name_lower:
        threshold = MINIMUM_THRESHOLDS["validation"]
        skill_type = "Validation/Audit"
    elif "layer-2" in str(path) or "draft" in name_lower or "generation" in name_lower:
        threshold = MINIMUM_THRESHOLDS["generation"]
        skill_type = "Complex Generation"
    elif "synthesis" in name_lower or "assembly" in name_lower or "hybrid" in name_lower:
        threshold = MINIMUM_THRESHOLDS["synthesis"]
        skill_type = "Synthesis/Assembly"
    elif "analysis" in name_lower or "evaluation" in name_lower or "scoring" in name_lower:
        threshold = MINIMUM_THRESHOLDS["analysis"]
        skill_type = "Multi-Element Analysis"
    elif "discovery" in name_lower or "search" in name_lower:
        threshold = MINIMUM_THRESHOLDS["discovery"]
        skill_type = "Discovery/Search"

    if threshold is None:
        # Default to generation threshold for unclassified output files
        threshold = MINIMUM_THRESHOLDS["generation"]
        skill_type = "output"

    rushing_limit = int(threshold * RUSHING_THRESHOLD_RATIO)

    if file_size >= rushing_limit:
        return None

    file_kb = file_size / 1024
    threshold_kb = threshold / 1024

    return make_reminder(
        detector="rushing",
        severity="warning",
        message=(
            f"RUSHING ALERT: {path.name} is {file_kb:.1f}KB — the minimum for "
            f"{skill_type} is {threshold_kb:.1f}KB. This suggests abbreviated output."
        ),
        action=(
            "Re-read the microskill spec and re-execute with full output. "
            "Do not proceed to the next microskill."
        ),
    )


def detect_synthesis(content: str, state: dict) -> Optional[dict]:
    """Detector 1: Check for data references without corresponding reads.

    Fires when the output contains specific data patterns (scores with decimals,
    quoted text with attribution, mechanism names in title case) that suggest
    the agent is referencing upstream data it hasn't read in this session.
    """
    files_read = state.get("files_read", [])

    if not files_read:
        # No reads tracked yet — can't determine synthesis
        return None

    # Look for patterns that suggest referencing specific data
    # Score references: "scored 7.8", "rating: 8.2", "7.5/10"
    score_refs = re.findall(r"\b(?:scored?|rating|grade)[:\s]+\d+\.\d+", content, re.IGNORECASE)

    # Quoted text with attribution: '"exact quote" — Source'
    quote_refs = re.findall(r'"[^"]{20,}"(?:\s*[-—]\s*\w+)', content)

    # If we find specific data references in short content (likely from memory, not source),
    # flag it. This is a heuristic — false positives are acceptable as reminders are non-blocking.
    specific_refs = len(score_refs) + len(quote_refs)

    if specific_refs < 3:
        return None

    return make_reminder(
        detector="synthesis",
        severity="warning",
        message=(
            f"SYNTHESIS WARNING: Output contains {specific_refs} specific data references "
            f"(scores, quotes). Verify these were sourced from files read in THIS session, "
            f"not generated from cached memory."
        ),
        action=(
            "Re-read the upstream source files before continuing. "
            "Quote the specific lines you need."
        ),
    )


def track_and_detect(file_path: str) -> Optional[dict]:
    """Main entry: track the write event and run all detectors."""
    path = Path(file_path)

    if not path.exists():
        return None

    state = load_state()

    # Update consecutive write counter
    state["consecutive_writes"] = state.get("consecutive_writes", 0) + 1
    save_state(state)

    # Read file content for content-based detectors
    try:
        content = path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return None

    # Run detectors in priority order — return first match
    # (one reminder per write event to avoid overwhelming the agent)

    # Detector 4: Abbreviation (highest priority — immediate quality signal)
    result = detect_abbreviation(content)
    if result:
        return result

    # Detector 2: Rushing (output size check)
    result = detect_rushing(file_path, content)
    if result:
        return result

    # Detector 7: Stale reads (consecutive writes without reads)
    result = detect_stale_reads(state)
    if result:
        return result

    # Detector 1: Synthesis (data references without reads)
    result = detect_synthesis(content, state)
    if result:
        return result

    return None


def record_read(file_path: str):
    """Record a file read event — resets stale read counter and tracks read files."""
    state = load_state()
    state["consecutive_writes"] = 0

    files_read = state.get("files_read", [])
    abs_path = str(Path(file_path).resolve())
    if abs_path not in files_read:
        files_read.append(abs_path)
    state["files_read"] = files_read

    save_state(state)


def main():
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    # Handle --record-read flag (called by dispatch-validator for Read tool events)
    if sys.argv[1] == "--record-read":
        if len(sys.argv) >= 3:
            record_read(sys.argv[2])
        print("{}")
        sys.exit(0)

    file_path = sys.argv[1]
    result = track_and_detect(file_path)

    if result:
        print(json.dumps(result))
    else:
        print("{}")


if __name__ == "__main__":
    main()
