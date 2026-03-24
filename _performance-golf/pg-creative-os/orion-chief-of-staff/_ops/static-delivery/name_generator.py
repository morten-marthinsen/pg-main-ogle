"""Generate 15-position filenames for static ad delivery from ClickUp task data.

Reads a ClickUp task, extracts custom fields, and produces properly formatted
filenames per the TESS naming convention.
"""

import re
import requests
import yaml
from pathlib import Path
from typing import Dict, List, Optional, Tuple

# ── ClickUp API ──────────────────────────────────────────────────────────────

BASE_URL = "https://api.clickup.com/api/v2"


def fetch_task(task_id: str, token: str, timeout: int = 15) -> dict:
    """Fetch full task detail from ClickUp API v2."""
    headers = {"Authorization": token, "Content-Type": "application/json"}
    resp = requests.get(
        f"{BASE_URL}/task/{task_id}",
        headers=headers,
        params={"include_subtasks": "false"},
        timeout=timeout,
    )
    resp.raise_for_status()
    return resp.json()


# ── Custom Field Extractors (ported from registry_sync.py) ───────────────────


def _get_field_dropdown(task: dict, field_name: str) -> Optional[str]:
    for f in task.get("custom_fields", []):
        if f.get("name", "").strip().lower() == field_name.strip().lower():
            val = f.get("value")
            if f.get("type") == "drop_down" and isinstance(val, int):
                opts = f.get("type_config", {}).get("options", [])
                for o in opts:
                    if o.get("orderindex") == val:
                        return o.get("name", "").strip()
            if isinstance(val, str):
                return val.strip()
    return None


def _get_field_labels(task: dict, field_name: str) -> List[str]:
    """Extract selected labels from a ClickUp labels field."""
    for f in task.get("custom_fields", []):
        if f.get("name", "").strip().lower() == field_name.strip().lower():
            val = f.get("value")
            if f.get("type") == "labels" and isinstance(val, list):
                opts = f.get("type_config", {}).get("options", [])
                opt_map = {o.get("id"): o.get("label", "") for o in opts}
                return [opt_map[v] for v in val if v in opt_map]
    return []


def _get_field_users(task: dict, field_name: str) -> List[dict]:
    """Return raw user dicts from a ClickUp users field."""
    for f in task.get("custom_fields", []):
        if f.get("name", "").strip().lower() == field_name.strip().lower():
            val = f.get("value")
            if isinstance(val, list):
                return val
    return []


def _get_field_text(task: dict, field_name: str) -> Optional[str]:
    for f in task.get("custom_fields", []):
        if f.get("name", "").strip().lower() == field_name.strip().lower():
            val = f.get("value")
            if isinstance(val, str):
                return val.strip()
    return None


# ── Code Tables ──────────────────────────────────────────────────────────────

# Load team member codes from config file (editable without code changes)
_TEAM_CODES_PATH = Path(__file__).parent / "team-codes.yaml"


def _load_team_codes() -> tuple:
    """Load copywriter and editor codes from team-codes.yaml."""
    if _TEAM_CODES_PATH.exists():
        with open(_TEAM_CODES_PATH, encoding="utf-8") as f:
            data = yaml.safe_load(f) or {}
        return data.get("copywriters", {}), data.get("editors", {})
    return {}, {}


COPYWRITER_CODES, EDITOR_CODES = _load_team_codes()

AD_CATEGORY_CODES = {
    "NN (Net New)": "nn",
    "NNMU (Net New Mashup)": "nnmu",
    "EXV (Vertical Expansion)": "exv",
    "EXH (Horizontal Expansion)": "exh",
    "PRM (Promo/Offer)": "prm",
    # Legacy labels (keep for backward compat)
    "Vertical Expansion": "exv",
    "Horizontal Expansion": "exh",
    "Net New Mashup": "nnmu",
    "Promo": "prm",
    "Evergreen": "evg",
}

# Categories where expansion type is always "xx"
EXPANSION_XX_CATEGORIES = {"nn", "nnmu", "prm", "evg"}

COUNTRY_CODES = {
    "US (United States)": "us",
    "AU (Australia)": "au",
    "CA (Canada)": "ca",
    "DE (Germany)": "de",
    "GB (United Kingdom)": "gb",
    "IE (Ireland)": "ie",
    "JP (Japan)": "jp",
    "KR (South Korea)": "kr",
    "MX (Mexico)": "mx",
    "NL (Netherlands)": "nl",
    "NZ (New Zealand)": "nz",
    "SE (Sweden)": "se",
    "TH (Thailand)": "th",
}


# ── Name Parsing ─────────────────────────────────────────────────────────────


def parse_task_name(name: str) -> Tuple[str, str, int, int]:
    """Parse ClickUp task name like 'clst-i223-v0001-v0005'.

    Returns (funnel, root_angle_id, var_start, var_end).
    """
    m = re.match(r"^([a-z0-9]+)-(i\d+|h\d+|\d+)-v(\d+)-v(\d+)$", name.lower().strip())
    if not m:
        raise ValueError(
            f"Task name '{name}' doesn't match expected pattern: "
            "{{funnel}}-{{angleId}}-v{{start}}-v{{end}}"
        )
    return m.group(1), m.group(2), int(m.group(3)), int(m.group(4))


def extract_dimensions(label_text: str) -> List[str]:
    """Extract dimension strings like '1200x1200' from the Ad Dimensions label."""
    return re.findall(r"(\d+x\d+)", label_text)


# ── Main Generator ───────────────────────────────────────────────────────────


def generate_names(
    task_id: str,
    token: str,
    delivery_date: str,
    extension: str = ".png",
) -> Dict:
    """Generate all filenames for a static ad delivery task.

    Args:
        task_id: ClickUp task ID.
        token: ClickUp API token.
        delivery_date: YYYYMMDD string.
        extension: File extension including dot (e.g., '.png').

    Returns:
        Dict with keys: task_name, funnel, root_angle_id, variations,
        dimensions, filenames (list of dicts with variation, dimension, filename).
    """
    task = fetch_task(task_id, token)
    task_name = task.get("name", "")

    # Parse task name
    funnel, root_angle_id, var_start, var_end = parse_task_name(task_name)

    # Extract custom fields
    ad_dimensions_labels = _get_field_labels(task, "ad dimensions")
    dim_text = " ".join(ad_dimensions_labels) if ad_dimensions_labels else ""
    # Fallback: try dropdown
    if not dim_text:
        dim_text = _get_field_dropdown(task, "ad dimensions") or ""
    dimensions = extract_dimensions(dim_text)
    if not dimensions:
        raise ValueError(f"No dimensions found in Ad Dimensions field: '{dim_text}'")

    ad_category_raw = _get_field_dropdown(task, "ad category") or ""
    ad_category = AD_CATEGORY_CODES.get(ad_category_raw, ad_category_raw.lower()[:3])

    country_raw = _get_field_dropdown(task, "country code") or ""
    country = COUNTRY_CODES.get(country_raw, country_raw.lower()[:2])

    # Editor — check group assignees first, then individual assignees
    editor_code = "xxxx"
    assignees = task.get("assignees", [])
    group_assignees = task.get("group_assignees", [])
    # Check group assignees (e.g., "No Limit Creative (Agency)")
    for ga in group_assignees:
        ga_name = ga.get("name", "")
        if ga_name in EDITOR_CODES:
            editor_code = EDITOR_CODES[ga_name]
            break
    # Fallback to individual assignees
    if editor_code == "xxxx":
        for a in assignees:
            username = a.get("username", "")
            if username in EDITOR_CODES:
                editor_code = EDITOR_CODES[username]
                break

    # Copywriter
    copywriter_code = "xxxx"
    copywriter_users = _get_field_users(task, "copywriter")
    for u in copywriter_users:
        uname = u.get("username", "")
        if uname in COPYWRITER_CODES:
            copywriter_code = COPYWRITER_CODES[uname]
            break

    # Expansion type
    if ad_category in EXPANSION_XX_CATEGORIES:
        expansion_type = "xx"
    else:
        expansion_type = _get_field_dropdown(task, "expansion type") or "xx"
        expansion_type = expansion_type.lower()[:3]

    # Asset type: images → "img"
    asset_type = "img"

    # Platform: images → "xx"
    platform = "xx"

    # Length tier: images → "xx"
    length_tier = "xx"

    # Talent: images → "xxxx"
    talent = "xxxx"

    # Promo name (Position 15) — required for prm, forbidden for evg
    promo_name = ""
    if ad_category == "prm":
        promo_raw = _get_field_dropdown(task, "promo name") or _get_field_text(task, "promo name") or ""
        promo_name = promo_raw.lower().strip().replace(" ", "")
        if not promo_name:
            print("WARNING: Ad Category is 'prm' but no Promo Name found — Position 15 will be empty")
    elif ad_category == "evg":
        promo_name = ""  # evg must NOT have promo code

    # Generate filenames
    variations = [f"v{v:04d}" for v in range(var_start, var_end + 1)]
    filenames = []

    for var_id in variations:
        for dim in dimensions:
            parts = [
                funnel,
                root_angle_id,
                var_id,
                platform,
                dim,
                length_tier,
                ad_category,
                expansion_type,
                asset_type,
                talent,
                editor_code,
                copywriter_code,
                country,
                delivery_date,
            ]
            if promo_name:
                parts.append(promo_name)
            filename = "-".join(parts) + extension
            filenames.append({
                "variation": var_id,
                "dimension": dim,
                "filename": filename,
            })

    return {
        "task_id": task_id,
        "task_name": task_name,
        "funnel": funnel,
        "root_angle_id": root_angle_id,
        "variations": variations,
        "dimensions": dimensions,
        "ad_category": ad_category,
        "editor": editor_code,
        "copywriter": copywriter_code,
        "country": country,
        "promo_name": promo_name,
        "total_files": len(filenames),
        "filenames": filenames,
    }
