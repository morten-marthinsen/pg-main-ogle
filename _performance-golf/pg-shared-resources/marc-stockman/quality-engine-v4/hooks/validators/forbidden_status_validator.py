#!/usr/bin/env python3
"""Forbidden Status Validator — Catches invented gate statuses in ANY file.

Quality Engine v4 — NEW validator (not present in the original Marketing OS)

This is a broader net than gate_validator.py, which only fires on checkpoint files.
The forbidden_status_validator scans ANY YAML or markdown file for status-like
patterns that use forbidden values. This catches status degradation in:
- Session logs
- Build state blocks
- Handoff documents
- Progress tracking files
- Any file where an agent might invent a soft-pass status

The core principle: Gates are PASS or FAIL only. There is no middle ground.
"Conditional pass" is a FAIL that the agent rationalized into passing.

Usage:
    python3 forbidden_status_validator.py <file_path>

Returns JSON feedback on stdout if forbidden statuses found, empty {} otherwise.
"""

import json
import re
import sys
from pathlib import Path
from typing import Optional

# =============================================================================
# FORBIDDEN STATUS PATTERNS
# =============================================================================
# These are the exact strings (case-insensitive) that indicate degradation.
# They represent attempts to create a middle ground between PASS and FAIL.

FORBIDDEN_STATUSES = [
    # Conditional variants — the most common degradation pattern
    "conditional pass",
    "conditional_pass",
    "conditionally passed",
    "conditionally approved",
    "conditional approval",

    # Partial variants — "some of it passed"
    "partial pass",
    "partial_pass",
    "partially passed",
    "partially complete",
    "partial approval",

    # Soft variants — weakening the gate
    "soft pass",
    "soft_pass",
    "soft fail",
    "soft_fail",

    # Qualifier variants — adding hedges to PASS
    "qualified pass",
    "qualified_pass",
    "near pass",
    "near_pass",
    "almost pass",

    # Provisional variants — "pass for now"
    "provisional",
    "provisional pass",
    "provisional_pass",
    "tentative",
    "tentative pass",
    "tentative_pass",

    # "Good enough" variants — lowering the bar
    "good enough",
    "good_enough",
    "acceptable",
    "marginal",
    "borderline",
    "borderline pass",

    # Approval-with-conditions variants
    "approved with concerns",
    "approved_with_concerns",
    "approved with conditions",
    "approved_with_conditions",
    "approved with reservations",
    "pass with concerns",
    "pass with conditions",
    "pass with caveats",
]

# Valid statuses that should NOT trigger warnings
VALID_STATUSES = [
    "pass", "fail", "complete", "incomplete", "blocked",
    "in_progress", "in progress", "approved", "rejected",
    "pending", "not started", "skipped",
]

# =============================================================================
# CONTEXT PATTERNS — where statuses typically appear
# =============================================================================
# We look for these patterns to identify status-bearing lines:
#   status: VALUE
#   result: VALUE
#   gate: VALUE
#   verdict: VALUE
#   outcome: VALUE

STATUS_CONTEXT_PATTERNS = [
    r'(?:status|result|gate|verdict|outcome|check|validation)\s*:\s*["\']?(.+?)["\']?\s*$',
]


def validate_forbidden_statuses(file_path: str) -> Optional[dict]:
    """Scan a file for forbidden status values.

    Performs two types of checks:
    1. Broad scan: searches for forbidden strings anywhere in the file
    2. Context-aware scan: checks status-bearing fields specifically

    Args:
        file_path: Path to the file to validate

    Returns:
        Dict with validation feedback, or None if no issues
    """
    path = Path(file_path)

    if not path.exists():
        return None

    # Only validate YAML, YML, and markdown files
    if path.suffix not in (".yaml", ".yml", ".md"):
        return None

    content = path.read_text(encoding="utf-8")
    content_lower = content.lower()
    issues = []

    # --- CHECK 1: Scan status-bearing fields for forbidden values ---
    for pattern in STATUS_CONTEXT_PATTERNS:
        for match in re.finditer(pattern, content, re.MULTILINE | re.IGNORECASE):
            value = match.group(1).strip().strip("\"'").lower()

            # Check if the value is a forbidden status
            for forbidden in FORBIDDEN_STATUSES:
                if forbidden in value:
                    line_num = content[: match.start()].count("\n") + 1
                    issues.append({
                        "line": line_num,
                        "field_value": match.group(1).strip(),
                        "forbidden_pattern": forbidden,
                        "context": "status field",
                        "message": (
                            f"Line {line_num}: Status field contains forbidden value "
                            f"'{match.group(1).strip()}' (matches '{forbidden}'). "
                            f"Gates are PASS or FAIL only."
                        ),
                    })
                    break  # One match per field value is enough

    # --- CHECK 2: Broad scan for forbidden phrases in any context ---
    # This catches cases where the forbidden status appears outside a formal
    # status field, e.g., in prose: "This is a conditional pass because..."
    for forbidden in FORBIDDEN_STATUSES:
        # Only flag multi-word forbidden phrases in prose (single words like
        # "marginal" or "borderline" might appear in legitimate content)
        if " " not in forbidden and "_" not in forbidden:
            continue

        # Search for the forbidden phrase
        for match in re.finditer(re.escape(forbidden), content_lower):
            line_num = content[: match.start()].count("\n") + 1

            # Check if this was already caught in Check 1
            already_caught = any(
                i["line"] == line_num and i["forbidden_pattern"] == forbidden
                for i in issues
            )
            if already_caught:
                continue

            # Get the surrounding context for the message
            line_start = content.rfind("\n", 0, match.start()) + 1
            line_end = content.find("\n", match.end())
            if line_end == -1:
                line_end = len(content)
            line_text = content[line_start:line_end].strip()

            issues.append({
                "line": line_num,
                "field_value": line_text[:80],  # Truncate long lines
                "forbidden_pattern": forbidden,
                "context": "prose/content",
                "message": (
                    f"Line {line_num}: Forbidden status phrase '{forbidden}' "
                    f"found in content. If this is a gate result, it must be "
                    f"PASS or FAIL only."
                ),
            })

    if not issues:
        return None

    # Deduplicate by line number
    seen_lines = set()
    unique_issues = []
    for issue in issues:
        if issue["line"] not in seen_lines:
            seen_lines.add(issue["line"])
            unique_issues.append(issue)

    return {
        "validator": "forbidden_status_validator",
        "file": str(path),
        "severity": "WARNING",
        "issues": [i["message"] for i in unique_issues],
        "details": unique_issues,
        "message": (
            f"FORBIDDEN STATUS: {path.name} contains {len(unique_issues)} instance(s) "
            f"of forbidden gate statuses. Gates are PASS or FAIL only. "
            f"'Conditional pass' is a FAIL that was rationalized into passing."
        ),
        "reminder": {
            "type": "reminder",
            "detector": "status_degradation",
            "severity": "critical",
            "message": (
                f"STATUS DEGRADATION: {len(unique_issues)} forbidden status(es) in {path.name}. "
                f"There is no conditional pass, no partial pass, no soft pass. "
                f"Either fix the issue and write PASS, or write FAIL and halt."
            ),
            "action_required": (
                "Replace all forbidden statuses with PASS or FAIL. "
                "If the output is not good enough to pass, it is a FAIL — "
                "fix the underlying issue rather than inventing a middle status."
            ),
        },
    }


def main():
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    file_path = sys.argv[1]
    result = validate_forbidden_statuses(file_path)

    if result:
        print(json.dumps(result))
    else:
        print("{}")


if __name__ == "__main__":
    main()
