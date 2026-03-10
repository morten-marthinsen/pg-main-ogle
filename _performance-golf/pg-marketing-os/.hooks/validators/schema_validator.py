#!/usr/bin/env python3
"""Schema Compliance Validator — Validates handoff package files against the
pipeline-handoff-registry.md contracts.

When a -package.json or -package.yaml file is written, validates:
- Required field presence and non-emptiness
- arena_selection_verified: true on arena-dependent handoffs
- File size vs minimum threshold from registry

Usage:
    python3 schema_validator.py <package_file_path>

Returns JSON feedback on stdout if issues found, empty otherwise.
"""

import json
import sys
from pathlib import Path
from typing import Optional, Tuple

# Schema contracts derived from pipeline-handoff-registry.md
# Maps package filename patterns to required fields
SCHEMA_CONTRACTS = {
    "research-package": {
        "required_fields": [
            "total_quotes", "pain_bucket", "hope_bucket",
            "root_cause_bucket", "solutions_tried_bucket",
        ],
        "arena_dependent": False,
        "min_size_kb": 50,
    },
    "proof-inventory": {
        "required_fields": [
            "proof_elements", "gap_analysis",
            "maximum_promise_level",
        ],
        "arena_dependent": False,
        "min_size_kb": 10,
    },
    "root-cause-package": {
        "required_fields": [
            "root_cause", "villain", "reframe",
            "expression_variants",
        ],
        "arena_dependent": True,
        "min_size_kb": 15,
    },
    "mechanism-package": {
        "required_fields": [
            "mechanism_name", "mechanism_analogy",
            "scorecard",
        ],
        "arena_dependent": True,
        "min_size_kb": 15,
    },
    "promise-package": {
        "required_fields": [
            "big_idea", "primary_promise",
            "rsf_scores",
        ],
        "arena_dependent": True,
        "min_size_kb": 10,
    },
    "offer-package": {
        "required_fields": [
            "offer_structure", "pricing",
        ],
        "arena_dependent": False,
        "min_size_kb": 10,
    },
    "structure-package": {
        "required_fields": [
            "section_sequence", "word_budgets",
        ],
        "arena_dependent": False,
        "min_size_kb": 10,
    },
    "campaign-brief": {
        "required_fields": [
            "thesis", "avatar", "tone",
            "mechanism_name", "root_cause",
            "big_idea", "offer_summary",
        ],
        "arena_dependent": False,
        "min_size_kb": 20,
    },
    "headline-package": {
        "required_fields": [
            "headline_candidates",
        ],
        "arena_dependent": True,
        "min_size_kb": 5,
    },
    "lead-package": {
        "required_fields": [
            "lead_type", "assembled_prose_path",
        ],
        "arena_dependent": True,
        "min_size_kb": 5,
    },
    "story-package": {
        "required_fields": [
            "story_type", "assembled_prose_path",
        ],
        "arena_dependent": True,
        "min_size_kb": 5,
    },
    "root-cause-narrative-package": {
        "required_fields": [
            "assembled_prose_path",
        ],
        "arena_dependent": True,
        "min_size_kb": 5,
    },
    "mechanism-narrative-package": {
        "required_fields": [
            "assembled_prose_path",
        ],
        "arena_dependent": True,
        "min_size_kb": 5,
    },
    "product-intro-package": {
        "required_fields": [
            "assembled_prose_path",
        ],
        "arena_dependent": True,
        "min_size_kb": 5,
    },
    "offer-copy-package": {
        "required_fields": [
            "assembled_prose_path",
        ],
        "arena_dependent": True,
        "min_size_kb": 5,
    },
    "close-package": {
        "required_fields": [
            "assembled_prose_path",
        ],
        "arena_dependent": True,
        "min_size_kb": 5,
    },
}


def find_matching_schema(filename: str) -> Optional[Tuple[str, dict]]:
    """Find the schema contract matching a given filename."""
    filename_lower = filename.lower()
    for pattern, schema in SCHEMA_CONTRACTS.items():
        if pattern in filename_lower:
            return pattern, schema
    return None


def validate_json_schema(file_path: str, content: str, schema: dict, pattern: str) -> list:
    """Validate JSON content against schema requirements."""
    issues = []

    try:
        data = json.loads(content)
    except json.JSONDecodeError as e:
        issues.append(f"Invalid JSON: {e}")
        return issues

    # Check required fields
    for field in schema["required_fields"]:
        # Support nested field access with dots
        parts = field.split(".")
        obj = data
        found = True
        for part in parts:
            if isinstance(obj, dict) and part in obj:
                obj = obj[part]
            else:
                found = False
                break

        if not found:
            issues.append(f"Missing required field: '{field}'")
        elif obj is None or (isinstance(obj, str) and not obj.strip()):
            issues.append(f"Required field '{field}' is empty")
        elif isinstance(obj, list) and len(obj) == 0:
            issues.append(f"Required field '{field}' is an empty array")

    # Check arena_selection_verified for arena-dependent handoffs
    if schema["arena_dependent"]:
        arena_verified = data.get("arena_selection_verified")
        if arena_verified is not True:
            issues.append(
                f"Arena-dependent handoff '{pattern}' is missing "
                f"'arena_selection_verified: true'. Per pipeline-handoff-registry.md, "
                f"this field must be true to confirm Arena + human selection completed."
            )

    return issues


def validate_yaml_schema(file_path: str, content: str, schema: dict, pattern: str) -> list:
    """Validate YAML content against schema requirements (basic text matching)."""
    issues = []

    # Basic field presence check via text search (avoids PyYAML dependency)
    for field in schema["required_fields"]:
        # Check if field appears as a key
        if f"{field}:" not in content and f"{field} :" not in content:
            issues.append(f"Missing required field: '{field}'")

    # Check arena_selection_verified for arena-dependent handoffs
    if schema["arena_dependent"]:
        if "arena_selection_verified" not in content:
            issues.append(
                f"Arena-dependent handoff '{pattern}' is missing "
                f"'arena_selection_verified: true'."
            )
        elif "arena_selection_verified: true" not in content.lower():
            issues.append(
                f"Arena-dependent handoff '{pattern}' has "
                f"'arena_selection_verified' but it's not set to true."
            )

    return issues


def validate_schema(file_path: str) -> Optional[dict]:
    """Validate a package file against its schema contract."""
    path = Path(file_path)

    if not path.exists():
        return None

    # Find matching schema
    match = find_matching_schema(path.name)
    if not match:
        return None

    pattern, schema = match
    content = path.read_text(encoding="utf-8")
    file_size_kb = path.stat().st_size / 1024

    issues = []

    # Check minimum size
    if file_size_kb < schema["min_size_kb"]:
        issues.append(
            f"File is {file_size_kb:.1f}KB — below the {schema['min_size_kb']}KB "
            f"minimum for '{pattern}' handoffs."
        )

    # Validate schema based on file type
    if path.suffix == ".json":
        issues.extend(validate_json_schema(file_path, content, schema, pattern))
    elif path.suffix in (".yaml", ".yml"):
        issues.extend(validate_yaml_schema(file_path, content, schema, pattern))

    if not issues:
        return None

    return {
        "validator": "schema_validator",
        "file": str(path),
        "schema": pattern,
        "severity": "WARNING",
        "issues": issues,
        "message": (
            f"SCHEMA WARNING: {path.name} has {len(issues)} compliance issue(s) "
            f"against '{pattern}' contract. " + " | ".join(issues)
        ),
    }


def main():
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    file_path = sys.argv[1]
    result = validate_schema(file_path)

    if result:
        print(json.dumps(result))
    else:
        print("{}")


if __name__ == "__main__":
    main()
