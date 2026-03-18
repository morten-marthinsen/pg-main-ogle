#!/usr/bin/env python3
"""Schema Compliance Validator — Validates handoff package files against schema contracts.

Quality Engine v4 — Portable version

When a -package.json or -package.yaml file is written, validates:
- Required field presence and non-emptiness
- Arena/competition selection verification flag on dependent handoffs
- File size vs minimum threshold

CUSTOMIZATION:
    Edit the SCHEMA_CONTRACTS dictionary below to define your own package schemas.
    Each entry maps a filename pattern to its required fields, whether it depends on
    a competitive evaluation (arena) result, and a minimum file size.

Usage:
    python3 schema_validator.py <package_file_path>

Returns JSON feedback on stdout if issues found, empty {} otherwise.
"""

import json
import sys
from pathlib import Path
from typing import Optional, Tuple

# =============================================================================
# SCHEMA CONTRACTS — CUSTOMIZE THESE FOR YOUR SYSTEM
# =============================================================================
# Maps package filename patterns to their validation requirements.
#
# Each entry:
#   "filename-pattern": {
#       "required_fields": ["field1", "field2"],  # Fields that must exist and be non-empty
#       "arena_dependent": True/False,             # Requires arena_selection_verified: true
#       "min_size_kb": 10,                         # Minimum file size in KB
#   }
#
# For nested fields, use dot notation: "parent.child"

SCHEMA_CONTRACTS = {
    # --- EXAMPLE CONTRACTS (replace with your own) ---
    #
    # "research-package": {
    #     "required_fields": [
    #         "total_quotes", "pain_bucket", "hope_bucket",
    #     ],
    #     "arena_dependent": False,
    #     "min_size_kb": 50,
    # },
    # "mechanism-package": {
    #     "required_fields": [
    #         "mechanism_name", "mechanism_analogy", "scorecard",
    #     ],
    #     "arena_dependent": True,
    #     "min_size_kb": 15,
    # },
    # "campaign-brief": {
    #     "required_fields": [
    #         "thesis", "avatar", "tone",
    #         "mechanism_name", "root_cause",
    #     ],
    #     "arena_dependent": False,
    #     "min_size_kb": 20,
    # },
}


def find_matching_schema(filename: str) -> Optional[Tuple[str, dict]]:
    """Find the schema contract matching a given filename.

    Matches by checking if the pattern string appears in the filename (case-insensitive).
    """
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

    # Check required fields (supports dot notation for nested access)
    for field in schema["required_fields"]:
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
    if schema.get("arena_dependent"):
        arena_verified = data.get("arena_selection_verified")
        if arena_verified is not True:
            issues.append(
                f"Arena-dependent handoff '{pattern}' is missing "
                f"'arena_selection_verified: true'. This field must be true "
                f"to confirm competitive evaluation + human selection completed."
            )

    return issues


def validate_yaml_schema(file_path: str, content: str, schema: dict, pattern: str) -> list:
    """Validate YAML content against schema requirements.

    Uses basic text matching to avoid requiring PyYAML as a dependency.
    For production use with complex YAML, consider adding PyYAML.
    """
    issues = []

    # Basic field presence check via text search
    for field in schema["required_fields"]:
        if f"{field}:" not in content and f"{field} :" not in content:
            issues.append(f"Missing required field: '{field}'")

    # Check arena_selection_verified for arena-dependent handoffs
    if schema.get("arena_dependent"):
        if "arena_selection_verified" not in content:
            issues.append(
                f"Arena-dependent handoff '{pattern}' is missing "
                f"'arena_selection_verified: true'."
            )
        elif "arena_selection_verified: true" not in content.lower():
            issues.append(
                f"Arena-dependent handoff '{pattern}' has "
                f"'arena_selection_verified' but it is not set to true."
            )

    return issues


def validate_schema(file_path: str) -> Optional[dict]:
    """Validate a package file against its schema contract.

    Checks:
    1. Minimum file size
    2. Required fields (JSON or YAML)
    3. Arena selection verification (if applicable)
    """
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
