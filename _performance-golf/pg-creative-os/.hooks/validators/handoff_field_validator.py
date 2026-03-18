"""Handoff Field Validator — checks required fields per PIPELINE-HANDOFF-REGISTRY.md.

Validates that handoff files contain all required fields before inter-agent
consumption. Prevents silent schema mismatches that cause downstream failures.

Usage: python3 handoff_field_validator.py <file_path>
Output: JSON with issues found, or {} if clean.
"""

import json
import sys
from pathlib import Path

# Bridge field contracts (from PIPELINE-HANDOFF-REGISTRY.md)
# These define the minimum required fields per handoff type.

BRIDGE_CONTRACTS = {
    # Tess → Neco data protocol output
    "data_protocol": {
        "description": "Tess → Neco data protocol",
        "required_fields": [
            "root_angle",
            "performance",
            "classification",
            "audience_segments",
            "brand_thread",
        ],
        "file_patterns": ["data-protocol", "tess-to-neco", "neco-context"],
    },
    # Neco → Veda copy handoff (future)
    "copy_handoff": {
        "description": "Neco → Veda copy handoff",
        "required_fields": [
            "script_text",
            "root_angle",
            "target_asset_id",
            "script_type",
            "brand_thread",
            "verification_status",
            "framework_attribution",
        ],
        "file_patterns": ["copy-handoff", "neco-to-veda", "script-handoff"],
    },
    # Orion strategic directive
    "strategic_directive": {
        "description": "Orion → All strategic directive",
        "required_fields": [
            "directive_type",
            "affected_agents",
            "effective_date",
            "description",
            "scorecard_alignment",
        ],
        "file_patterns": ["directive", "strategic-directive", "orion-directive"],
    },
}


def find_matching_contract(file_path: str) -> dict | None:
    """Find a bridge contract matching the file path."""
    path_lower = file_path.lower()
    for contract_name, contract in BRIDGE_CONTRACTS.items():
        for pattern in contract["file_patterns"]:
            if pattern in path_lower:
                return contract
    return None


def validate_file(file_path: str) -> dict:
    """Validate a handoff file against its bridge contract."""
    path = Path(file_path)
    if not path.exists():
        return {}

    contract = find_matching_contract(file_path)
    if contract is None:
        return {}  # No matching contract — not a handoff file

    try:
        content = path.read_text(encoding="utf-8")
    except Exception:
        return {}

    # Check for YAML/JSON content
    content_lower = content.lower()
    missing_fields = []
    empty_fields = []

    for field in contract["required_fields"]:
        # Check if the field name appears in the content (YAML key or JSON key)
        field_patterns = [
            f"{field}:",      # YAML
            f'"{field}"',     # JSON
            f"'{field}'",     # YAML quoted
            field.replace("_", " "),  # Natural language in markdown
        ]
        found = any(p in content_lower for p in field_patterns)
        if not found:
            missing_fields.append(field)
        else:
            # Check if the field has a value (not just the key)
            for p in field_patterns:
                idx = content_lower.find(p)
                if idx >= 0:
                    # Look at what follows the field name
                    after = content[idx + len(p):idx + len(p) + 50].strip()
                    if not after or after.startswith("\n") or after in ("''", '""', "null", "~"):
                        empty_fields.append(field)
                    break

    if not missing_fields and not empty_fields:
        return {}

    issues = []
    for field in missing_fields:
        issues.append(f"Required field '{field}' is MISSING")
    for field in empty_fields:
        issues.append(f"Required field '{field}' is EMPTY")

    return {
        "validator": "handoff_field_validator",
        "file": file_path,
        "bridge": contract["description"],
        "severity": "WARNING",
        "issues": issues,
        "message": (
            f"Handoff validation for {contract['description']}: "
            f"{len(missing_fields)} missing, {len(empty_fields)} empty field(s) in {path.name}"
        ),
    }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    result = validate_file(sys.argv[1])
    print(json.dumps(result) if result else "{}")
