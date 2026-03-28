#!/usr/bin/env python3
"""Static ad delivery pipeline — orchestrator.

Usage:
    # Name generation only (preview filenames)
    python deliver.py --task 86b8qem80 --names-only

    # Dry run — show rename mapping without touching files
    python deliver.py --task 86b8qem80 --source ~/Downloads/nlc-files/ --dry-run

    # Full pipeline — rename + upload to Iconik + update ClickUp
    python deliver.py --task 86b8qem80 --source ~/Downloads/nlc-files/

    # Source can be a zip file (auto-extracted)
    python deliver.py --task 86b8qem80 --source ~/Downloads/delivery.zip --dry-run

    # Rename only, skip Iconik upload
    python deliver.py --task 86b8qem80 --source ~/Downloads/nlc-files/ --skip-upload

    # Override delivery date (default: today)
    python deliver.py --task 86b8qem80 --source ~/Downloads/nlc-files/ --date 20260313
"""

import argparse
import os
import re
import sys
import time
import zipfile
import tempfile
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv

from name_generator import generate_names
from iconik_helper import IconikClient

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".tiff", ".bmp"}

MAX_UPLOAD_RETRIES = 3
RETRY_DELAY_SECONDS = 5


# ── NLC Filename Parsing ─────────────────────────────────────────────────────

def parse_nlc_filename(filename: str):
    """Parse an NLC-delivered filename to extract variation and dimension.

    NLC naming pattern:
        {DesignLetter}{Number} - {WxH} - v{N} - {Code} - {Agency} - {ProjectID}.ext
    Example:
        C1 - 300x250 - v2 - JT - Blackfish Media - 357210.png

    Returns dict with keys: design_letter, variation_num, dimension, revision
    or None if the filename doesn't match the expected pattern.
    """
    stem = Path(filename).stem
    m = re.match(
        r"^([A-Za-z])(\d+)\s*-\s*(\d+x\d+)\s*-\s*v(\d+)\s*-\s*(.+)$",
        stem,
    )
    if not m:
        return None
    return {
        "design_letter": m.group(1).upper(),
        "variation_num": int(m.group(2)),
        "dimension": m.group(3),
        "revision": int(m.group(4)),
    }


# ── Source File Handling ──────────────────────────────────────────────────────

def resolve_source(source_path: str):
    """Resolve --source to a directory of image files.

    If source_path is a .zip file, extract it to a temp directory.
    Returns (directory_path, is_temp) — caller should clean up if is_temp.
    """
    p = Path(source_path)
    if p.suffix.lower() == ".zip":
        if not p.is_file():
            print(f"ERROR: Zip file does not exist: {source_path}")
            sys.exit(1)
        temp_dir = tempfile.mkdtemp(prefix="static-delivery-")
        print(f"  Extracting zip to temporary folder...")
        with zipfile.ZipFile(p, "r") as zf:
            zf.extractall(temp_dir)
        # The zip may contain a subfolder — find where the images are
        extracted = Path(temp_dir)
        image_files = list(extracted.rglob("*"))
        image_files = [f for f in image_files if f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS]
        if not image_files:
            print(f"ERROR: No image files found in zip")
            sys.exit(1)
        # Use the parent of the first image file as the source dir
        source_dir = image_files[0].parent
        print(f"  Extracted {len(image_files)} images to: {source_dir}")
        return source_dir, True
    elif p.is_dir():
        return p, False
    else:
        print(f"ERROR: Source must be a directory or .zip file: {source_path}")
        sys.exit(1)


def find_image_files(source_dir: Path):
    """Find all image files in source_dir, sorted by name."""
    files = [
        f for f in sorted(source_dir.iterdir())
        if f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS
    ]
    return files


def detect_extension(files) -> str:
    """Detect the most common file extension from source files."""
    if not files:
        return ".png"
    exts = [f.suffix.lower() for f in files]
    return max(set(exts), key=exts.count)


# ── Smart Rename Mapping ─────────────────────────────────────────────────────

def build_rename_mapping(source_files, generated):
    """Match NLC source files to generated PG filenames by variation + dimension.

    NLC files:  C1 - 300x250 - v2 - JT - Blackfish Media - 357210.png
    PG names:   sf2-i003-v0001-xx-300x250-xx-nn-xx-img-xxxx-nlc-cf-us-20260324.png

    Matching logic:
    - NLC C{N} → PG v{N:04d} (C1=v0001, C2=v0002, etc.)
    - NLC dimension → PG dimension (direct match)
    """
    # Build lookup from generated names: (variation, dimension) → generated entry
    gen_lookup = {}
    for entry in generated:
        key = (entry["variation"], entry["dimension"])
        gen_lookup[key] = entry

    # Also build a set of generated filenames for "already renamed" detection
    gen_filenames = {entry["filename"]: entry for entry in generated}
    gen_stems = {Path(entry["filename"]).stem: entry for entry in generated}

    # Parse each source file and match
    mapping = []
    unmatched_nlc = []
    matched_keys = set()

    for src in source_files:
        # First check: is this file already renamed to a PG convention name?
        if src.name in gen_filenames:
            entry = gen_filenames[src.name]
            mapping.append({
                "source": src,
                "target_name": src.name,
                "target_path": src,  # no rename needed
                "nlc_variation": 0,
                "nlc_dimension": entry["dimension"],
                "already_renamed": True,
            })
            matched_keys.add((entry["variation"], entry["dimension"]))
            continue

        if src.stem in gen_stems:
            entry = gen_stems[src.stem]
            mapping.append({
                "source": src,
                "target_name": src.name,
                "target_path": src,
                "nlc_variation": 0,
                "nlc_dimension": entry["dimension"],
                "already_renamed": True,
            })
            matched_keys.add((entry["variation"], entry["dimension"]))
            continue

        # Second check: parse as NLC filename
        parsed = parse_nlc_filename(src.name)
        if not parsed:
            unmatched_nlc.append(src.name)
            continue

        # Map NLC variation number to PG variation format
        pg_variation = f"v{parsed['variation_num']:04d}"
        pg_dimension = parsed["dimension"]
        key = (pg_variation, pg_dimension)

        if key in gen_lookup:
            entry = gen_lookup[key]
            target_name = entry["filename"]
            # Preserve source extension if different
            src_ext = src.suffix.lower()
            gen_ext = Path(target_name).suffix.lower()
            if src_ext != gen_ext:
                target_name = Path(target_name).stem + src_ext
            mapping.append({
                "source": src,
                "target_name": target_name,
                "target_path": src.parent / target_name,
                "nlc_variation": parsed["variation_num"],
                "nlc_dimension": parsed["dimension"],
            })
            matched_keys.add(key)
        else:
            unmatched_nlc.append(f"{src.name} (parsed: {pg_variation}, {pg_dimension})")

    # Report unmatched
    if unmatched_nlc:
        print(f"\n  WARNING: {len(unmatched_nlc)} NLC files could not be matched:")
        for name in unmatched_nlc:
            print(f"    - {name}")

    unmatched_gen = [
        f"{e['variation']} {e['dimension']}"
        for e in generated
        if (e["variation"], e["dimension"]) not in matched_keys
    ]
    if unmatched_gen:
        print(f"\n  WARNING: {len(unmatched_gen)} expected files have no NLC source:")
        for name in unmatched_gen:
            print(f"    - {name}")

    # Sort mapping by variation then dimension for clean output
    mapping.sort(key=lambda m: (m["nlc_variation"], m["nlc_dimension"]))

    return mapping


# ── Display ───────────────────────────────────────────────────────────────────

def print_names(result: dict) -> None:
    """Print generated filenames in a readable format."""
    print(f"\n{'='*70}")
    print(f"Task: {result['task_name']} ({result['task_id']})")
    print(f"Funnel: {result['funnel']}  |  Angle: {result['root_angle_id']}")
    print(f"Category: {result['ad_category']}  |  Editor: {result['editor']}  |  Copywriter: {result['copywriter']}  |  Country: {result['country']}")
    print(f"Variations: {', '.join(result['variations'])}  |  Dimensions: {', '.join(result['dimensions'])}")
    print(f"Total files: {result['total_files']}")
    print(f"{'='*70}\n")

    current_var = None
    for entry in result["filenames"]:
        if entry["variation"] != current_var:
            current_var = entry["variation"]
            print(f"  {current_var}:")
        print(f"    {entry['filename']}")
    print()


def print_rename_mapping(mapping) -> None:
    """Print the rename mapping."""
    print(f"\n{'='*70}")
    print(f"RENAME MAPPING ({len(mapping)} files)")
    print(f"{'='*70}\n")
    for m in mapping:
        print(f"  {m['source'].name}")
        print(f"    -> {m['target_name']}")
        print()


# ── Main Pipeline ─────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Static ad delivery pipeline")
    parser.add_argument("--task", required=True, help="ClickUp task ID (from the task URL)")
    parser.add_argument("--source", help="Directory or .zip file containing NLC images")
    parser.add_argument("--names-only", action="store_true", help="Only generate names, don't rename or upload")
    parser.add_argument("--dry-run", action="store_true", help="Show what would happen without making changes")
    parser.add_argument("--date", help="Delivery date YYYYMMDD (default: today)")
    parser.add_argument("--skip-upload", action="store_true", help="Rename files but skip Iconik upload")
    args = parser.parse_args()

    # Load .env from script directory
    script_dir = Path(__file__).parent
    load_dotenv(script_dir / ".env")

    clickup_token = os.environ.get("CLICKUP_API_TOKEN")
    if not clickup_token:
        print("ERROR: CLICKUP_API_TOKEN not set in .env")
        print("  Copy env.template to .env and fill in your credentials.")
        sys.exit(1)

    delivery_date = args.date or datetime.now().strftime("%Y%m%d")

    # ── Phase 1: Generate names ──────────────────────────────────────────
    print(f"\n[1/6] Fetching ClickUp task {args.task}...")

    # Resolve source (directory or zip) and detect extension
    extension = ".png"
    source_files = []
    source_dir = None
    is_temp_source = False

    if args.source:
        source_dir, is_temp_source = resolve_source(args.source)
        source_files = find_image_files(source_dir)
        if source_files:
            extension = detect_extension(source_files)
            print(f"  Found {len(source_files)} image files (extension: {extension})")

    result = generate_names(args.task, clickup_token, delivery_date, extension)
    print(f"  Generated {result['total_files']} filenames")
    print_names(result)

    if args.names_only:
        return

    # ── Phase 2: Build rename mapping ────────────────────────────────────
    if not args.source:
        print("No --source provided. Use --source to rename files.")
        return

    if not source_files:
        print(f"ERROR: No image files found in {args.source}")
        sys.exit(1)

    print(f"[2/6] Building rename mapping...")
    mapping = build_rename_mapping(source_files, result["filenames"])

    if not mapping:
        print("ERROR: No files could be matched. Check NLC filenames and ClickUp task.")
        sys.exit(1)

    print_rename_mapping(mapping)

    if args.dry_run:
        print(f"DRY RUN complete — {len(mapping)} files would be renamed. No files were modified.")
        return

    # ── Phase 3: Rename files ────────────────────────────────────────────
    already_count = sum(1 for m in mapping if m.get("already_renamed"))
    needs_rename = [m for m in mapping if not m.get("already_renamed")]

    if already_count > 0:
        print(f"[3/6] {already_count} files already renamed, {len(needs_rename)} to rename...")
    else:
        print(f"[3/6] Renaming {len(mapping)} files...")

    renamed_files = []
    for m in mapping:
        if m.get("already_renamed"):
            renamed_files.append(m["target_path"])
            print(f"  --  {m['target_name']} (already renamed)")
        else:
            m["source"].rename(m["target_path"])
            renamed_files.append(m["target_path"])
            print(f"  OK  {m['target_name']}")

    print(f"  Renamed {len(renamed_files)} files")

    if args.skip_upload:
        print("\n--skip-upload: Skipping Iconik upload.")
        return

    # ── Phase 4: Create Iconik subcollection ─────────────────────────────
    iconik_app_id = os.environ.get("ICONIK_APP_ID")
    iconik_auth_token = os.environ.get("ICONIK_AUTH_TOKEN")
    nlc_parent_id = os.environ.get("NLC_PARENT_COLLECTION_ID")

    if not iconik_app_id or not iconik_auth_token:
        print("ERROR: ICONIK_APP_ID and ICONIK_AUTH_TOKEN required in .env for upload")
        sys.exit(1)

    if not nlc_parent_id:
        print("ERROR: NLC_PARENT_COLLECTION_ID required in .env for upload")
        sys.exit(1)

    iconik = IconikClient(iconik_app_id, iconik_auth_token)

    collection_title = result["task_name"]
    print(f"\n[4/6] Creating Iconik subcollection '{collection_title}'...")
    collection_id = iconik.find_or_create_sub_collection(collection_title, nlc_parent_id)
    collection_url = f"https://app.iconik.io/collection/{collection_id}"
    print(f"  Collection: {collection_url}")

    # ── Phase 5: Upload files (with retry) ────────────────────────────────
    print(f"\n[5/6] Uploading {len(renamed_files)} files to Iconik...")
    uploaded = 0
    errors = []

    # Check for existing assets to avoid duplicates
    existing = iconik.get_collection_assets(collection_id)
    existing_titles = {a["title"] for a in existing}

    for file_path in renamed_files:
        asset_title = file_path.stem  # filename without extension
        if asset_title in existing_titles:
            print(f"  --  {file_path.name} (already exists, skipping)")
            uploaded += 1
            continue

        for attempt in range(1, MAX_UPLOAD_RETRIES + 1):
            try:
                asset_id = iconik.upload_file(str(file_path), asset_title, collection_id)
                uploaded += 1
                print(f"  OK  {file_path.name} -> {asset_id}")
                break
            except Exception as e:
                if attempt < MAX_UPLOAD_RETRIES:
                    print(f"  !!  {file_path.name}: attempt {attempt} failed ({e}), retrying in {RETRY_DELAY_SECONDS}s...")
                    time.sleep(RETRY_DELAY_SECONDS)
                else:
                    errors.append(f"{file_path.name}: {e}")
                    print(f"  XX  {file_path.name}: failed after {MAX_UPLOAD_RETRIES} attempts — {e}")

    print(f"\n  Uploaded: {uploaded}/{len(renamed_files)}")
    if errors:
        print(f"  Errors: {len(errors)}")
        for err in errors:
            print(f"    - {err}")

    # ── Phase 6: Write back to ClickUp ───────────────────────────────────
    print(f"\n[6/6] Writing Iconik URL back to ClickUp...")
    import requests as req
    headers = {"Authorization": clickup_token, "Content-Type": "application/json"}
    task_resp = req.get(
        f"https://api.clickup.com/api/v2/task/{args.task}",
        headers=headers,
        params={"include_subtasks": "false"},
    )

    if task_resp.ok:
        task_data = task_resp.json()

        # Update "Final Assets" custom field
        final_assets_field_id = None
        for f in task_data.get("custom_fields", []):
            if "final" in f.get("name", "").lower() and "asset" in f.get("name", "").lower():
                final_assets_field_id = f["id"]
                break

        if final_assets_field_id:
            update_resp = req.post(
                f"https://api.clickup.com/api/v2/task/{args.task}/field/{final_assets_field_id}",
                headers=headers,
                json={"value": collection_url},
            )
            if update_resp.ok:
                print(f"  OK  Final Assets field updated with: {collection_url}")
            else:
                print(f"  XX  Failed to update ClickUp field: {update_resp.status_code}")
        else:
            print(f"  --  'Final Assets' custom field not found — paste URL manually:")
            print(f"      {collection_url}")

        # NOTE: Script does NOT change ClickUp task status.
        # The human reviews the upload and moves the task manually.
    else:
        print(f"  XX  Failed to re-fetch task: {task_resp.status_code}")

    # ── Summary ──────────────────────────────────────────────────────────
    print(f"\n{'='*70}")
    print(f"UPLOAD COMPLETE — review in ClickUp, then move status manually")
    print(f"  Task: {result['task_name']}")
    print(f"  Files: {uploaded}/{len(renamed_files)} uploaded")
    if not args.skip_upload:
        print(f"  Iconik: {collection_url}")
    if errors:
        print(f"  Errors: {len(errors)} — re-run to retry failed uploads")
    print(f"{'='*70}\n")


if __name__ == "__main__":
    main()
