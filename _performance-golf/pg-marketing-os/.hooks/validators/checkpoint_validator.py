#!/usr/bin/env python3
"""Checkpoint Chain Validator — Validates checkpoint YAML structure and ordering.

When a checkpoint YAML is written, validates:
- Required fields present (status, timestamp, verification section)
- ISO 8601 timestamp format
- Arena checkpoints: rounds_completed, human_selection_received
- Chain ordering: warns if Layer N+1 checkpoint written before Layer N

Usage:
    python3 checkpoint_validator.py <checkpoint_file_path>

Returns JSON feedback on stdout if issues found, empty otherwise.
"""

import json
import re
import sys
from pathlib import Path
from typing import Optional

# Required fields in every checkpoint YAML
REQUIRED_FIELDS = ["status", "timestamp"]

# Fields required in verification section
VERIFICATION_FIELDS = ["all_microskills_executed", "minimum_thresholds_met"]

# ISO 8601 pattern (YYYY-MM-DDTHH:MM:SS or with timezone)
ISO_8601_PATTERN = re.compile(
    r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}"
    r"(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?"
)

# Layer ordering: maps checkpoint names to expected layer numbers
LAYER_ORDER = {
    "LAYER_0_COMPLETE": 0,
    "LAYER_1_COMPLETE": 1,
    "LAYER_2_COMPLETE": 2,
    "ARENA_COMPLETE": 2,  # Arena is within Layer 2
    "LAYER_3_COMPLETE": 3,
    "LAYER_4_COMPLETE": 4,
}


def validate_checkpoint(file_path: str) -> Optional[dict]:
    """Validate a checkpoint YAML file for structure and chain ordering.

    Args:
        file_path: Path to a YAML checkpoint file

    Returns:
        Dict with validation feedback, or None if no issues
    """
    path = Path(file_path)

    if not path.exists():
        return None

    if path.suffix not in (".yaml", ".yml"):
        return None

    # Only validate files that look like checkpoints
    if "_COMPLETE" not in path.name and "checkpoint" not in path.name.lower():
        return None

    content = path.read_text(encoding="utf-8")
    issues = []

    # Check required fields
    for field in REQUIRED_FIELDS:
        pattern = rf"^\s*{re.escape(field)}\s*:"
        if not re.search(pattern, content, re.MULTILINE):
            issues.append(f"Missing required field: '{field}'")

    # Check for verification/completeness section
    has_verification = bool(
        re.search(r"^\s*verification\s*:", content, re.MULTILINE)
        or re.search(r"^\s*completeness\s*:", content, re.MULTILINE)
    )
    if not has_verification:
        issues.append(
            "Missing 'verification' or 'completeness' section. "
            "Checkpoint files must document what was verified."
        )

    # Check timestamp format
    timestamp_match = re.search(r'timestamp\s*:\s*["\']?(.+?)["\']?\s*$', content, re.MULTILINE)
    if timestamp_match:
        timestamp_val = timestamp_match.group(1).strip("\"'")
        if not ISO_8601_PATTERN.match(timestamp_val):
            issues.append(
                f"Timestamp '{timestamp_val}' is not ISO 8601 format. "
                f"Expected format: YYYY-MM-DDTHH:MM:SS or YYYY-MM-DDTHH:MM:SSZ"
            )

    # Arena-specific checks
    if "ARENA" in path.name.upper():
        if "rounds_completed" not in content:
            issues.append(
                "Arena checkpoint missing 'rounds_completed' field. "
                "Arena checkpoints must document how many rounds were completed."
            )
        if "human_selection" not in content:
            issues.append(
                "Arena checkpoint missing 'human_selection_received' or similar field. "
                "Arena requires human selection — cannot be auto-selected."
            )

    # Chain ordering check
    current_layer = None
    for name, layer_num in LAYER_ORDER.items():
        if name in path.name:
            current_layer = layer_num
            break

    if current_layer is not None and current_layer > 0:
        # Check if predecessor checkpoint exists
        checkpoints_dir = path.parent
        predecessor_found = False

        for name, layer_num in LAYER_ORDER.items():
            if layer_num == current_layer - 1:
                predecessor_path = checkpoints_dir / f"{name}.yaml"
                if predecessor_path.exists():
                    predecessor_found = True
                    break
                # Also check .yml extension
                predecessor_yml = checkpoints_dir / f"{name}.yml"
                if predecessor_yml.exists():
                    predecessor_found = True
                    break

        if not predecessor_found:
            prev_layer = current_layer - 1
            issues.append(
                f"Layer {current_layer} checkpoint written but no Layer {prev_layer} "
                f"checkpoint found in {checkpoints_dir}. Layers must complete in order. "
                f"This may indicate a layer was skipped."
            )

    if not issues:
        return None

    return {
        "validator": "checkpoint_validator",
        "file": str(path),
        "severity": "WARNING",
        "issues": issues,
        "message": (
            f"CHECKPOINT WARNING: {path.name} has {len(issues)} issue(s). "
            + " | ".join(issues)
        ),
    }


def main():
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    file_path = sys.argv[1]
    result = validate_checkpoint(file_path)

    if result:
        print(json.dumps(result))
    else:
        print("{}")


if __name__ == "__main__":
    main()
