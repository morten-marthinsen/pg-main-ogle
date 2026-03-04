#!/usr/bin/env python3
"""
Disable auto-sizing (shrinkToFit) in a Keynote presentation.

This script unpacks the Keynote file, modifies the shrinkToFit property
in the DocumentStylesheet, and repacks it.

Usage: python3 disable_autosize.py <keynote_file>
"""

import sys
import os
import shutil
import tempfile
from zipfile import ZipFile
from glob import glob

try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper
import yaml

from keynote_parser.codec import IWAFile


def disable_autosize(keynote_path):
    """
    Disable auto-sizing in a Keynote file by setting shrinkToFit: false.

    Args:
        keynote_path: Path to the .key file
    """
    if not os.path.exists(keynote_path):
        print(f"Error: File not found: {keynote_path}")
        return False

    # Create a backup
    backup_path = keynote_path + ".backup"
    if not os.path.exists(backup_path):
        shutil.copy2(keynote_path, backup_path)
        print(f"Created backup: {backup_path}")

    # Create temporary directory for extraction
    temp_dir = tempfile.mkdtemp(prefix="keynote_")
    print(f"Working in: {temp_dir}")

    replacement_count = 0

    try:
        # Extract the keynote file
        with ZipFile(keynote_path, 'r') as zipfile:
            zipfile.extractall(temp_dir)

        # Find and process the DocumentStylesheet.iwa file
        stylesheet_path = os.path.join(temp_dir, "Index", "DocumentStylesheet.iwa")
        if os.path.exists(stylesheet_path):
            print("Processing DocumentStylesheet.iwa...")
            with open(stylesheet_path, 'rb') as f:
                iwa_file = IWAFile.from_buffer(f.read(), "DocumentStylesheet.iwa")

            # Convert to dict for modification
            data = iwa_file.to_dict()

            # Recursively find and modify shrinkToFit properties
            def modify_shrink_to_fit(obj, path=""):
                nonlocal replacement_count
                if isinstance(obj, dict):
                    for key, value in obj.items():
                        current_path = f"{path}.{key}" if path else key
                        if key == "shrinkToFit" and value == True:
                            obj[key] = False
                            replacement_count += 1
                            print(f"  Changed shrinkToFit: true -> false at {current_path}")
                        else:
                            modify_shrink_to_fit(value, current_path)
                elif isinstance(obj, list):
                    for i, item in enumerate(obj):
                        modify_shrink_to_fit(item, f"{path}[{i}]")

            modify_shrink_to_fit(data)

            # Convert back to IWA and save
            modified_iwa = IWAFile.from_dict(data)
            with open(stylesheet_path, 'wb') as f:
                f.write(modified_iwa.to_buffer())
            print(f"Saved modified DocumentStylesheet.iwa")

        # Also process all Slide files for any per-slide overrides
        slide_files = glob(os.path.join(temp_dir, "Index", "Slide-*.iwa"))
        for slide_path in slide_files:
            with open(slide_path, 'rb') as f:
                try:
                    iwa_file = IWAFile.from_buffer(f.read(), os.path.basename(slide_path))
                    data = iwa_file.to_dict()

                    original_count = replacement_count
                    modify_shrink_to_fit(data)

                    if replacement_count > original_count:
                        modified_iwa = IWAFile.from_dict(data)
                        with open(slide_path, 'wb') as f:
                            f.write(modified_iwa.to_buffer())
                        print(f"  Modified {os.path.basename(slide_path)}")
                except Exception as e:
                    print(f"  Warning: Could not process {os.path.basename(slide_path)}: {e}")

        # Repack the keynote file
        print(f"\nRepacking to {keynote_path}...")
        with ZipFile(keynote_path, 'w') as zipfile:
            for root, dirs, files in os.walk(temp_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, temp_dir)
                    zipfile.write(file_path, arcname)

        print(f"\nSuccessfully modified {replacement_count} shrinkToFit properties")
        return True

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        # Restore from backup
        if os.path.exists(backup_path):
            shutil.copy2(backup_path, keynote_path)
            print("Restored from backup due to error")
        return False

    finally:
        # Cleanup temp directory
        shutil.rmtree(temp_dir, ignore_errors=True)


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)

    keynote_path = sys.argv[1]
    success = disable_autosize(keynote_path)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
