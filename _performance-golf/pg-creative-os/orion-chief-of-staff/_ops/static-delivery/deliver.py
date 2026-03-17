#!/usr/bin/env python3
"""Static ad delivery pipeline — orchestrator.

Usage:
    # Name generation only
    python deliver.py --task 86b8rpc5w --names-only

    # Dry run (show rename mapping, don't touch files)
    python deliver.py --task 86b8rpc5w --source ~/Downloads/nlc-delivery/ --dry-run

    # Full pipeline (rename + upload to Iconik)
    python deliver.py --task 86b8rpc5w --source ~/Downloads/nlc-delivery/

    # Override delivery date (default: today)
    python deliver.py --task 86b8rpc5w --source ~/Downloads/nlc-delivery/ --date 20260313
"""

import argparse
import os
import sys
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv

from name_generator import generate_names
from iconik_helper import IconikClient

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".tiff", ".bmp"}


def find_image_files(source_dir: str) -> list[Path]:
    """Find all image files in source_dir, sorted by name."""
    source = Path(source_dir)
    if not source.is_dir():
        print(f"ERROR: Source directory does not exist: {source_dir}")
        sys.exit(1)

    files = [
        f for f in sorted(source.iterdir())
        if f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS
    ]
    return files


def detect_extension(files: list[Path]) -> str:
    """Detect the most common file extension from source files."""
    if not files:
        return ".png"
    exts = [f.suffix.lower() for f in files]
    return max(set(exts), key=exts.count)


def build_rename_mapping(source_files: list[Path], generated: list[dict]) -> list[dict]:
    """Match source files to generated filenames.

    Sorts source files alphabetically and maps them 1:1 to the generated
    filenames (which are already ordered by variation then dimension).

    Returns list of {source, target_name, target_path} dicts.
    """
    if len(source_files) != len(generated):
        print(f"WARNING: Source has {len(source_files)} files, expected {len(generated)}")
        print("  Files will be mapped in sorted order. Review the mapping carefully.")

    count = min(len(source_files), len(generated))
    mapping = []
    for i in range(count):
        src = source_files[i]
        target_name = generated[i]["filename"]
        # Preserve source extension if different from generated
        src_ext = src.suffix.lower()
        gen_ext = Path(target_name).suffix.lower()
        if src_ext != gen_ext:
            target_name = Path(target_name).stem + src_ext
        mapping.append({
            "source": src,
            "target_name": target_name,
            "target_path": src.parent / target_name,
        })
    return mapping


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


def print_rename_mapping(mapping: list[dict]) -> None:
    """Print the rename mapping."""
    print(f"\n{'='*70}")
    print(f"RENAME MAPPING ({len(mapping)} files)")
    print(f"{'='*70}\n")
    for m in mapping:
        print(f"  {m['source'].name}")
        print(f"    → {m['target_name']}")
        print()


def main():
    parser = argparse.ArgumentParser(description="Static ad delivery pipeline")
    parser.add_argument("--task", required=True, help="ClickUp task ID")
    parser.add_argument("--source", help="Directory containing NLC files to rename")
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
        sys.exit(1)

    delivery_date = args.date or datetime.now().strftime("%Y%m%d")

    # ── Phase 1: Generate names ──────────────────────────────────────────
    print(f"\n[1/6] Fetching ClickUp task {args.task}...")

    # Detect extension from source files if provided
    extension = ".png"
    source_files = []
    if args.source:
        source_files = find_image_files(args.source)
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
        print("No --source directory provided. Use --source to rename files.")
        return

    if not source_files:
        print(f"ERROR: No image files found in {args.source}")
        sys.exit(1)

    print(f"[2/6] Building rename mapping...")
    mapping = build_rename_mapping(source_files, result["filenames"])
    print_rename_mapping(mapping)

    if args.dry_run:
        print("DRY RUN — no files were modified.")
        return

    # ── Phase 3: Rename files ────────────────────────────────────────────
    print(f"[3/6] Renaming {len(mapping)} files...")
    renamed_files = []
    for m in mapping:
        m["source"].rename(m["target_path"])
        renamed_files.append(m["target_path"])
        print(f"  ✓ {m['target_name']}")

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

    # ── Phase 5: Upload files ────────────────────────────────────────────
    print(f"\n[5/6] Uploading {len(renamed_files)} files to Iconik...")
    uploaded = 0
    errors = []

    # Check for existing assets to avoid duplicates
    existing = iconik.get_collection_assets(collection_id)
    existing_titles = {a["title"] for a in existing}

    for file_path in renamed_files:
        asset_title = file_path.stem  # filename without extension
        if asset_title in existing_titles:
            print(f"  ⊘ {file_path.name} (already exists, skipping)")
            uploaded += 1
            continue

        try:
            asset_id = iconik.upload_file(str(file_path), asset_title, collection_id)
            uploaded += 1
            print(f"  ✓ {file_path.name} → {asset_id}")
        except Exception as e:
            errors.append(f"{file_path.name}: {e}")
            print(f"  ✗ {file_path.name}: {e}")

    print(f"\n  Uploaded: {uploaded}/{len(renamed_files)}")
    if errors:
        print(f"  Errors: {len(errors)}")
        for err in errors:
            print(f"    - {err}")

    # ── Phase 6: Write back to ClickUp ───────────────────────────────────
    print(f"\n[6/6] Writing Iconik URL back to ClickUp...")
    # Find the "Final Assets" custom field ID
    task_data = result.get("_task_raw")
    # Re-fetch task to get custom field IDs
    import requests as req
    headers = {"Authorization": clickup_token, "Content-Type": "application/json"}
    task_resp = req.get(
        f"https://api.clickup.com/api/v2/task/{args.task}",
        headers=headers,
        params={"include_subtasks": "false"},
    )

    if task_resp.ok:
        task_data = task_resp.json()
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
                print(f"  ✓ Final Assets field updated with: {collection_url}")
            else:
                print(f"  ✗ Failed to update ClickUp field: {update_resp.status_code}")
        else:
            print(f"  ⊘ 'Final Assets' custom field not found — paste URL manually:")
            print(f"    {collection_url}")
    else:
        print(f"  ✗ Failed to re-fetch task: {task_resp.status_code}")

    # ── Summary ──────────────────────────────────────────────────────────
    print(f"\n{'='*70}")
    print(f"DELIVERY COMPLETE")
    print(f"  Task: {result['task_name']}")
    print(f"  Files: {uploaded}/{len(renamed_files)} uploaded")
    print(f"  Iconik: {collection_url}")
    print(f"{'='*70}\n")


if __name__ == "__main__":
    main()
