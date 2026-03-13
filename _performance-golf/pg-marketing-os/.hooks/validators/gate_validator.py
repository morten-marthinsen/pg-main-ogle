#!/usr/bin/env python3
"""Gate Validator — Scans checkpoint YAML files for forbidden gate statuses.

Encodes rules from ROOT-CAUSE-ANTI-DEGRADATION.md Structural Fix 9:
Gates are PASS or FAIL only. No conditional pass, no partial pass, no invented statuses.

Usage:
    python3 gate_validator.py <checkpoint_file_path>

Returns JSON feedback on stdout if issues found, empty otherwise.
"""

import json
import re
import sys
from pathlib import Path
from typing import Optional

# Forbidden status values — any of these in a checkpoint file indicates degradation
FORBIDDEN_STATUSES = [
    "CONDITIONAL_PASS",
    "PARTIAL_PASS",
    "SOFT_PASS",
    "CONDITIONAL",
    "PARTIAL",
    "approved_with_concerns",
    "approved_with_conditions",
    "GOOD_ENOUGH",
    "NEAR_PASS",
    "TENTATIVE",
    "PROVISIONAL",
    "QUALIFIED_PASS",
    "MARGINAL",
    "BORDERLINE",
]

# Valid statuses — anything else is suspicious
VALID_STATUSES = [
    "COMPLETE",
    "PASS",
    "FAIL",
    "approved",
    "BLOCKED",
    "IN_PROGRESS",
]


def validate_gate(file_path: str) -> Optional[dict]:
    """Validate a checkpoint YAML file for forbidden statuses.

    Args:
        file_path: Path to a YAML checkpoint file

    Returns:
        Dict with validation feedback, or None if no issues
    """
    path = Path(file_path)

    if not path.exists():
        return None

    if not path.suffix in (".yaml", ".yml"):
        return None

    content = path.read_text(encoding="utf-8")
    issues = []

    # Check for forbidden statuses (case-insensitive search in status fields)
    for forbidden in FORBIDDEN_STATUSES:
        # Match status: VALUE or status: "VALUE" patterns
        pattern = rf'status\s*:\s*["\']?{re.escape(forbidden)}["\']?'
        matches = re.finditer(pattern, content, re.IGNORECASE)
        for match in matches:
            line_num = content[: match.start()].count("\n") + 1
            issues.append(
                f"Line {line_num}: Forbidden status '{forbidden}' detected. "
                f"Valid statuses: {', '.join(VALID_STATUSES[:3])}."
            )

    # Check for status values that aren't in the valid list
    status_pattern = r'status\s*:\s*["\']?(\S+?)["\']?\s*(?:#.*)?$'
    for match in re.finditer(status_pattern, content, re.MULTILINE):
        status_value = match.group(1).strip("\"'")
        if status_value.upper() not in [v.upper() for v in VALID_STATUSES]:
            line_num = content[: match.start()].count("\n") + 1
            # Check if it's a known forbidden one (already caught above)
            if status_value.upper() not in [f.upper() for f in FORBIDDEN_STATUSES]:
                issues.append(
                    f"Line {line_num}: Unrecognized status '{status_value}'. "
                    f"Valid statuses: {', '.join(VALID_STATUSES[:3])}. "
                    f"If this is a new status, it may indicate degradation."
                )

    # Check for missing anti_degradation section in LAYER_0 checkpoints
    if "LAYER_0_COMPLETE" in path.name or "layer_0" in path.name.lower():
        if "anti_degradation:" not in content and "anti_degradation :" not in content:
            issues.append(
                "LAYER_0_COMPLETE checkpoint is missing the required 'anti_degradation' section. "
                "Per EXECUTION-GUARDRAILS.md, this section is REQUIRED with file_read, version, "
                "and declaration_written_to fields."
            )

    if not issues:
        return None

    # Build base result
    result = {
        "validator": "gate_validator",
        "file": str(path),
        "severity": "WARNING",
        "issues": issues,
        "message": (
            f"VALIDATION WARNING: {path.name} has {len(issues)} gate validation issue(s). "
            + " | ".join(issues)
        ),
    }

    # Emit event-driven reminder for forbidden statuses (Detector 5)
    forbidden_found = []
    for forbidden in FORBIDDEN_STATUSES:
        pattern = rf'status\s*:\s*["\']?{re.escape(forbidden)}["\']?'
        if re.search(pattern, content, re.IGNORECASE):
            forbidden_found.append(forbidden)

    if forbidden_found:
        result["reminder"] = {
            "type": "reminder",
            "detector": "gate_drift",
            "severity": "critical",
            "message": (
                f'GATE VIOLATION: Status "{forbidden_found[0]}" is forbidden. '
                f"Gates are PASS or FAIL (Law 3). There is no conditional pass, "
                f"no partial pass, no invented statuses."
            ),
            "action_required": (
                "Either fix the issue and write PASS, or write FAIL and halt."
            ),
        }

    return result


def main():
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    file_path = sys.argv[1]
    result = validate_gate(file_path)

    if result:
        print(json.dumps(result))
    else:
        print("{}")


if __name__ == "__main__":
    main()
