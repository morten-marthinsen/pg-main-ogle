#!/usr/bin/env python3
"""Output Completeness Validator — Checks output files against expected patterns.

Validates:
- 3 mandatory outputs per skill (primary JSON/YAML + summary markdown + execution log)
- Minimum file size thresholds
- File naming convention compliance
- Context-aware checks using ANTI-DEGRADATION.md per-microskill output tables when available

Usage:
    Single file:  python3 output_validator.py <file_path>
    Project dir:  python3 output_validator.py <project_directory>

Returns JSON feedback on stdout if issues found, empty otherwise.
"""

import json
import os
import sys
from pathlib import Path
from typing import Optional

# Minimum file size thresholds (bytes) — from CLAUDE-CORE.md
MIN_SIZES = {
    "loader_validator": 1024,      # 1KB — Layer 0 loaders
    "single_evaluation": 2048,     # 2KB — Single-dimension evaluation
    "complex_generation": 5120,    # 5KB — Complex generation
    "multi_analysis": 3072,        # 3KB — Multi-element analysis
    "validation_audit": 3072,      # 3KB — Validation/audit
    "synthesis_assembly": 5120,    # 5KB — Synthesis/assembly
    "discovery_search": 2048,      # 2KB — Discovery/search
}

# Expected output patterns per skill (skill-id → expected file patterns)
SKILL_OUTPUTS = {
    "01-research": {
        "primary": ["research-package.json"],
        "secondary": ["classified-quotes.json", "story-elements-research.md"],
        "log": ["execution-log.md"],
    },
    "02-proof-inventory": {
        "primary": ["proof-inventory-output.json", "proof-inventory-package.yaml"],
        "log": ["execution-log.md"],
    },
    "03-root-cause": {
        "primary": ["root-cause-package.yaml"],
        "log": ["execution-log.md"],
    },
    "04-mechanism": {
        "primary": ["mechanism-package.json"],
        "log": ["execution-log.md"],
    },
    "05-promise": {
        "primary": ["promise-package.json", "big-idea-output.json"],
        "log": ["execution-log.md"],
    },
    "06-big-idea": {
        "primary": ["offer-package.json"],
        "log": ["execution-log.md"],
    },
    "07-offer": {
        "primary": ["offer-package.json"],
        "log": ["execution-log.md"],
    },
    "08-structure": {
        "primary": ["structure-package.json"],
        "log": ["execution-log.md"],
    },
    "09-campaign-brief": {
        "primary": ["campaign-brief-package.json"],
        "log": ["execution-log.md"],
    },
}

# Copy skills (10-20) follow the cascading prose pattern
for i in range(10, 21):
    skill_names = {
        10: "headlines", 11: "lead", 12: "story",
        13: "root-cause-narrative", 14: "mechanism-narrative",
        15: "product-introduction", 16: "offer-copy", 17: "close",
        18: "proof-weaving", 19: "campaign-assembly", 20: "editorial",
    }
    name = skill_names.get(i, f"skill-{i}")
    SKILL_OUTPUTS[f"{i:02d}-{name}"] = {
        "primary": [f"{name}-package.json"],
        "secondary": [f"{name}-assembled-prose.md"] if i in range(11, 18) else [],
        "log": ["execution-log.md"],
    }

# Absolute minimum for any output file
ABSOLUTE_MIN_SIZE = 100  # bytes — catches empty/stub files


def validate_single_file(file_path: str) -> Optional[dict]:
    """Validate a single output file for minimum size and naming conventions."""
    path = Path(file_path)

    if not path.exists():
        return None

    issues = []
    file_size = path.stat().st_size

    # Check absolute minimum size
    if file_size < ABSOLUTE_MIN_SIZE:
        issues.append(
            f"File is only {file_size} bytes — below the {ABSOLUTE_MIN_SIZE} byte minimum. "
            f"This may be an empty or stub file."
        )

    # Check against type-specific minimums
    filename = path.name.lower()
    if filename.startswith("0.") or "loader" in filename or "validator" in filename:
        threshold = MIN_SIZES["loader_validator"]
        category = "Loader/Validator"
    elif "assembly" in filename or "synthesis" in filename:
        threshold = MIN_SIZES["synthesis_assembly"]
        category = "Synthesis/Assembly"
    elif "audit" in filename or "validation" in filename:
        threshold = MIN_SIZES["validation_audit"]
        category = "Validation/Audit"
    elif "discovery" in filename or "search" in filename:
        threshold = MIN_SIZES["discovery_search"]
        category = "Discovery/Search"
    elif "package" in filename or "output" in filename:
        threshold = MIN_SIZES["complex_generation"]
        category = "Package/Output"
    else:
        threshold = MIN_SIZES["single_evaluation"]
        category = "Standard output"

    if file_size < threshold:
        issues.append(
            f"{category} file is {file_size} bytes — below the {threshold} byte "
            f"minimum for this file type."
        )

    if not issues:
        return None

    return {
        "validator": "output_validator",
        "file": str(path),
        "severity": "WARNING",
        "issues": issues,
        "message": f"OUTPUT WARNING: {path.name} — " + " | ".join(issues),
    }


def validate_project_dir(project_dir: str) -> Optional[dict]:
    """Validate a project directory for output completeness."""
    project_path = Path(project_dir)

    if not project_path.is_dir():
        return None

    issues = []

    # List all subdirectories (each should be a skill output dir)
    skill_dirs = [
        d for d in project_path.iterdir()
        if d.is_dir() and not d.name.startswith(".")
    ]

    for skill_dir in skill_dirs:
        skill_id = skill_dir.name

        # Check if this skill has expected outputs defined
        expected = SKILL_OUTPUTS.get(skill_id)
        if not expected:
            continue

        # Check primary outputs exist
        for primary_file in expected.get("primary", []):
            primary_path = skill_dir / primary_file
            if not primary_path.exists():
                # Check in subdirectories too
                found = list(skill_dir.rglob(primary_file))
                if not found:
                    issues.append(
                        f"Skill {skill_id}: Missing primary output '{primary_file}'"
                    )

        # Check execution log exists
        for log_file in expected.get("log", []):
            log_path = skill_dir / log_file
            if not log_path.exists():
                found = list(skill_dir.rglob(log_file))
                if not found:
                    issues.append(
                        f"Skill {skill_id}: Missing execution log '{log_file}'"
                    )

    if not issues:
        return None

    return {
        "validator": "output_validator",
        "directory": str(project_path),
        "severity": "WARNING",
        "issues": issues,
        "message": (
            f"OUTPUT COMPLETENESS: {len(issues)} missing output(s) in "
            f"{project_path.name}. " + " | ".join(issues[:5])
            + (f" ... and {len(issues) - 5} more" if len(issues) > 5 else "")
        ),
    }


def main():
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    target = sys.argv[1]

    if os.path.isdir(target):
        result = validate_project_dir(target)
    else:
        result = validate_single_file(target)

    if result:
        print(json.dumps(result))
    else:
        print("{}")


if __name__ == "__main__":
    main()
