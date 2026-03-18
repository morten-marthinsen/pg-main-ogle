"""Forbidden Gate Status Validator — catches invented middle-ground statuses.

Scans file content for gate status phrases that DO NOT EXIST in Creative OS.
Gates are PASS or FAIL — there is no middle ground.

Usage: python3 forbidden_gate_status_validator.py <file_path>
Output: JSON with issues found, or {} if clean.
"""

import json
import re
import sys
from pathlib import Path

# These status values do not exist in Creative OS (SYSTEM-CORE.md Law 3)
FORBIDDEN_STATUSES = [
    "conditional pass",
    "partial pass",
    "sufficient for analysis",
    "good enough for now",
    "quality over quantity",
    "close enough",
    "effectively complete",
]

# Compile case-insensitive patterns
PATTERNS = [
    (status, re.compile(re.escape(status), re.IGNORECASE))
    for status in FORBIDDEN_STATUSES
]


def validate_file(file_path: str) -> dict:
    """Scan a file for forbidden gate statuses."""
    path = Path(file_path)
    if not path.exists():
        return {}

    try:
        content = path.read_text(encoding="utf-8")
    except Exception:
        return {}

    # Skip files that DEFINE the forbidden statuses (anti-degradation, system-core)
    basename = path.name.lower()
    if basename in (
        "system-core.md",
        "creative-os-anti-degradation.md",
        "forbidden_gate_status_validator.py",
    ):
        return {}

    issues = []
    for line_num, line in enumerate(content.splitlines(), 1):
        for status, pattern in PATTERNS:
            if pattern.search(line):
                # Skip if the line is quoting the forbidden list (e.g., in a "do not use" section)
                line_lower = line.lower().strip()
                if line_lower.startswith("-") and line_lower.strip("- ").startswith('"'):
                    continue  # Likely a list of banned items
                if "do not exist" in line_lower or "forbidden" in line_lower:
                    continue  # Likely defining the rule, not violating it

                issues.append(
                    f"Line {line_num}: Forbidden gate status '{status}' found: \"{line.strip()[:100]}\""
                )

    if not issues:
        return {}

    return {
        "validator": "forbidden_gate_status_validator",
        "file": file_path,
        "severity": "WARNING",
        "issues": issues,
        "message": f"Found {len(issues)} forbidden gate status(es) in {path.name}. Gates are PASS or FAIL only.",
    }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    result = validate_file(sys.argv[1])
    print(json.dumps(result) if result else "{}")
