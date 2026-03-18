"""Naming Convention Validator — checks Asset IDs against 15-position convention.

Scans file content for Asset ID patterns and validates each against
TESS-NAMING-CONVENTION.md position definitions.

Usage: python3 naming_convention_validator.py <file_path>
Output: JSON with issues found, or {} if clean.
"""

import json
import re
import sys
from pathlib import Path


# 15-position Asset ID pattern: funnel-angleId-variation-platform-dimensions-lengthTier-adCategory-expansionType-assetType-talent-editor-copywriter-country-deliveryDate
# Example: clst-i223-v0001-fb-1080x1920-30s-exv-hook-vid-hh-nlc-cf-us-20260301
ASSET_ID_PATTERN = re.compile(
    r"\b([a-z0-9]+)-([a-z]\d+|\d+)-v(\d{4})-([a-z]{2})-(\d+x\d+)-([a-z0-9]+)-([a-z]+)-([a-z]+)-([a-z]+)-([a-z]+)-([a-z]+)-([a-z]+)-([a-z]{2})-(\d{8})\b"
)

# Valid codes for key positions
VALID_AD_CATEGORIES = {"nn", "nnmu", "exv", "exh", "prm", "evg"}
VALID_EXPANSION_TYPES = {"exv", "exh", "xx"}
VALID_ASSET_TYPES = {"vid", "img"}
VALID_PLATFORMS = {"fb", "yt", "ig", "tt", "xx"}
VALID_COUNTRIES = {
    "us", "au", "ca", "de", "gb", "ie", "jp", "kr", "mx", "nl", "nz", "se", "th"
}


def validate_asset_id(asset_id: str, line_num: int) -> list:
    """Validate a single Asset ID. Returns list of issue strings."""
    issues = []
    parts = asset_id.split("-")

    if len(parts) != 14:
        issues.append(f"Line {line_num}: Asset ID '{asset_id}' has {len(parts)} positions (expected 14)")
        return issues

    funnel, angle_id, variation, platform, dimensions, length_tier, ad_category, expansion_type, asset_type, talent, editor, copywriter, country, delivery_date = parts

    if ad_category not in VALID_AD_CATEGORIES:
        issues.append(f"Line {line_num}: Position 7 (ad_category) '{ad_category}' is not valid. Expected: {', '.join(sorted(VALID_AD_CATEGORIES))}")

    if expansion_type not in VALID_EXPANSION_TYPES and expansion_type != "xx":
        issues.append(f"Line {line_num}: Position 8 (expansion_type) '{expansion_type}' is not valid. Expected: {', '.join(sorted(VALID_EXPANSION_TYPES))}")

    if asset_type not in VALID_ASSET_TYPES:
        issues.append(f"Line {line_num}: Position 9 (asset_type) '{asset_type}' is not valid. Expected: {', '.join(sorted(VALID_ASSET_TYPES))}")

    if platform not in VALID_PLATFORMS:
        issues.append(f"Line {line_num}: Position 4 (platform) '{platform}' is not valid. Expected: {', '.join(sorted(VALID_PLATFORMS))}")

    if country not in VALID_COUNTRIES:
        issues.append(f"Line {line_num}: Position 13 (country) '{country}' is not valid. Expected: {', '.join(sorted(VALID_COUNTRIES))}")

    # Net new categories should have expansion_type = "xx"
    if ad_category in {"nn", "nnmu", "prm", "evg"} and expansion_type != "xx":
        issues.append(f"Line {line_num}: Ad category '{ad_category}' should have expansion_type 'xx', got '{expansion_type}'")

    return issues


def validate_file(file_path: str) -> dict:
    """Scan a file for Asset IDs and validate each one."""
    path = Path(file_path)
    if not path.exists():
        return {}

    try:
        content = path.read_text(encoding="utf-8")
    except Exception:
        return {}

    all_issues = []
    for line_num, line in enumerate(content.splitlines(), 1):
        for match in ASSET_ID_PATTERN.finditer(line):
            asset_id = match.group(0)
            issues = validate_asset_id(asset_id, line_num)
            all_issues.extend(issues)

    if not all_issues:
        return {}

    return {
        "validator": "naming_convention_validator",
        "file": file_path,
        "severity": "WARNING",
        "issues": all_issues,
        "message": f"Found {len(all_issues)} naming convention issue(s) in {path.name}",
    }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    result = validate_file(sys.argv[1])
    print(json.dumps(result) if result else "{}")
