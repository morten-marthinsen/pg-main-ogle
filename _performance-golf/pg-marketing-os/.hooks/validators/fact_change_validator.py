#!/usr/bin/env python3
"""Fact Change Validator — Detects stale upstream values in output files.

Reads fact-changes.yaml from the project output directory and checks written
files for old values that should have been propagated.

Usage:
    python3 fact_change_validator.py <file_path>

Returns JSON feedback on stdout if stale values found, empty otherwise.
"""

import json
import re
import sys
from pathlib import Path
from typing import Optional


def find_fact_changes_file(file_path: str) -> Optional[Path]:
    """Walk up from file_path to find a fact-changes.yaml in the project output dir."""
    path = Path(file_path).resolve()

    # Look for fact-changes.yaml in parent directories up to ~outputs/
    current = path.parent
    for _ in range(10):  # max depth
        candidate = current / "fact-changes.yaml"
        if candidate.exists():
            return candidate
        # Stop at ~outputs level
        if current.name == "~outputs" or current == current.parent:
            break
        current = current.parent

    return None


def load_fact_changes(yaml_path: Path) -> list:
    """Parse fact-changes.yaml for incomplete propagation entries.

    Simple YAML parsing without external dependencies.
    """
    content = yaml_path.read_text(encoding="utf-8")
    entries = []

    current_entry = {}
    in_entry = False

    for line in content.splitlines():
        stripped = line.strip()

        # Detect entry start
        if stripped.startswith("- id:"):
            if current_entry:
                entries.append(current_entry)
            current_entry = {"id": stripped.split(":", 1)[1].strip().strip('"').strip("'")}
            in_entry = True
            continue

        if in_entry and ":" in stripped and not stripped.startswith("-") and not stripped.startswith("#"):
            key, _, value = stripped.partition(":")
            key = key.strip()
            value = value.strip().strip('"').strip("'")

            if key in ("old_value", "new_value", "field", "propagation_status"):
                current_entry[key] = value

    if current_entry:
        entries.append(current_entry)

    # Filter to incomplete/deferred entries only
    return [
        e for e in entries
        if e.get("propagation_status") in ("incomplete", "deferred")
        and e.get("old_value")
        and e.get("new_value")
    ]


def validate_fact_changes(file_path: str) -> Optional[dict]:
    """Check a written file for stale values from incomplete fact changes.

    Args:
        file_path: Path to the file just written

    Returns:
        Dict with validation feedback, or None if no issues
    """
    path = Path(file_path)

    if not path.exists():
        return None

    # Only check text-based output files
    if path.suffix not in (".md", ".json", ".yaml", ".yml", ".txt"):
        return None

    # Don't validate the fact-changes file itself
    if path.name == "fact-changes.yaml":
        return None

    # Find the project's fact-changes.yaml
    fact_changes_path = find_fact_changes_file(file_path)
    if not fact_changes_path:
        return None

    # Load incomplete fact changes
    changes = load_fact_changes(fact_changes_path)
    if not changes:
        return None

    # Read the written file
    content = path.read_text(encoding="utf-8")
    issues = []

    for change in changes:
        old_val = change["old_value"]
        new_val = change["new_value"]
        field = change.get("field", "unknown field")
        change_id = change.get("id", "?")

        # Search for old value (case-sensitive — factual data points are exact)
        if old_val in content:
            # Find the line number(s)
            lines_found = []
            for i, line in enumerate(content.splitlines(), 1):
                if old_val in line:
                    lines_found.append(i)

            issues.append({
                "change_id": change_id,
                "field": field,
                "old_value": old_val,
                "new_value": new_val,
                "lines": lines_found,
                "message": (
                    f"STALE VALUE: '{old_val}' found on line(s) {lines_found}. "
                    f"Canonical value is '{new_val}' (fact change {change_id}: {field}). "
                    f"Update this file or mark as deferred in fact-changes.yaml."
                ),
            })

    if not issues:
        return None

    return {
        "validator": "fact_change_validator",
        "file": str(path),
        "severity": "WARNING",
        "issues": [i["message"] for i in issues],
        "details": issues,
        "message": (
            f"FACT CHANGE PROPAGATION: {path.name} contains {len(issues)} stale value(s) "
            f"from incomplete fact changes. See FACT-CHANGE-PROPAGATION-PROTOCOL.md."
        ),
        "reminder": {
            "type": "reminder",
            "detector": "fact_drift",
            "severity": "critical",
            "message": (
                f"FACT DRIFT DETECTED: {len(issues)} stale value(s) in {path.name}. "
                f"Per FACT-CHANGE-PROPAGATION-PROTOCOL, update or mark superseded "
                f"before proceeding with downstream work."
            ),
            "action_required": (
                "Update stale values to canonical values, or mark as deferred "
                "in fact-changes.yaml with a reason."
            ),
        },
    }


def main():
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    file_path = sys.argv[1]
    result = validate_fact_changes(file_path)

    if result:
        print(json.dumps(result))
    else:
        print("{}")


if __name__ == "__main__":
    main()
