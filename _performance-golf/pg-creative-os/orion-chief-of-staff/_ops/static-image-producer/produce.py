"""
Static Image Producer — Orchestrator

Reads a brief JSON, generates base images via Fal.ai, composes with PG brand
overlay, and outputs to local directory for review.

Usage:
    python produce.py --brief briefs/357-test-brief.json
    python produce.py --brief briefs/357-test-brief.json --dimensions 1080x1350
    python produce.py --brief briefs/357-test-brief.json --dimensions all --variations 2
"""

import argparse
import json
import os
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Optional

# Ensure we can import sibling modules
sys.path.insert(0, str(Path(__file__).parent))

from generate import generate_image
from compose import compose_image, load_layout


TEMPLATES_DIR = Path(__file__).parent / "templates"


def get_template_path(width: int, height: int) -> Path:
    return TEMPLATES_DIR / f"layout-{width}x{height}.json"


def run_production(brief_path: str, dimensions_filter: str = "all", variations: int = 1, seed: Optional[int] = None):
    """Run the full production pipeline from brief to composed images."""

    # Load brief
    with open(brief_path) as f:
        brief = json.load(f)

    product = brief["product"]
    funnel = brief["funnel"]
    angle = brief["angle"]
    headline = brief["headline"]
    cta = brief["cta"]
    prompt = brief["image_prompt"]
    negative = brief.get("negative_prompt", "")
    all_dims = brief["dimensions"]

    # Filter dimensions
    if dimensions_filter != "all":
        parts = dimensions_filter.split("x")
        w, h = int(parts[0]), int(parts[1])
        all_dims = [d for d in all_dims if d["width"] == w and d["height"] == h]
        if not all_dims:
            print(f"Error: dimension {dimensions_filter} not found in brief")
            sys.exit(1)

    # Create output directory
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    batch_dir = Path(__file__).parent / "output.nosync" / f"{funnel}-{timestamp}"
    batch_dir.mkdir(parents=True, exist_ok=True)

    # Save brief copy to batch for reference
    with open(batch_dir / "brief.json", "w") as f:
        json.dump(brief, f, indent=2)

    print(f"\n{'='*60}")
    print(f"  STATIC IMAGE PRODUCER — {product}")
    print(f"  Angle: {angle}")
    print(f"  Dimensions: {len(all_dims)} sizes × {variations} variation(s)")
    print(f"  Output: {batch_dir}")
    print(f"{'='*60}\n")

    total_images = len(all_dims) * variations
    completed = 0
    errors = []

    # Generate one base image per variation, then compose into all dimensions
    for v in range(1, variations + 1):
        var_seed = (seed or 42) + v - 1 if seed is not None else None

        print(f"\n--- Variation {v}/{variations} ---")

        # Generate a high-res base image (use largest dimension for quality)
        # We'll generate at the largest requested size and resize for smaller ones
        max_dim = max(all_dims, key=lambda d: d["width"] * d["height"])
        base_w = max_dim["width"]
        base_h = max_dim["height"]

        print(f"\n[1/2] Generating base image ({base_w}x{base_h})...")
        try:
            base_path = generate_image(
                prompt=prompt,
                width=base_w,
                height=base_h,
                output_dir=str(batch_dir),
                negative_prompt=negative,
                seed=var_seed,
            )
        except Exception as e:
            print(f"  ERROR generating base image: {e}")
            errors.append(f"v{v} base generation: {e}")
            continue

        print(f"\n[2/2] Composing {len(all_dims)} dimensions...")

        for dim in all_dims:
            w, h = dim["width"], dim["height"]
            dim_label = f"{w}x{h}"
            template_path = get_template_path(w, h)

            if not template_path.exists():
                print(f"  SKIP {dim_label} — no template found")
                errors.append(f"{dim_label}: no template")
                continue

            try:
                layout = load_layout(str(template_path))
                output_name = f"{funnel}-v{v:02d}-{dim_label}.png"
                output_path = str(batch_dir / output_name)

                compose_image(
                    base_path=base_path,
                    headline=headline,
                    cta=cta,
                    output_path=output_path,
                    layout=layout,
                )
                completed += 1

            except Exception as e:
                print(f"  ERROR composing {dim_label}: {e}")
                errors.append(f"v{v} {dim_label}: {e}")

    # Summary
    print(f"\n{'='*60}")
    print(f"  COMPLETE: {completed}/{total_images} images produced")
    if errors:
        print(f"  ERRORS: {len(errors)}")
        for err in errors:
            print(f"    - {err}")
    print(f"  Output: {batch_dir}")
    print(f"{'='*60}\n")

    # Open in Finder (macOS)
    if sys.platform == "darwin":
        subprocess.run(["open", str(batch_dir)])

    return str(batch_dir)


def main():
    parser = argparse.ArgumentParser(description="Produce branded static ad images from a brief")
    parser.add_argument("--brief", required=True, help="Path to brief JSON file")
    parser.add_argument(
        "--dimensions",
        default="all",
        help="Dimension filter: 'all' or specific like '1080x1350'",
    )
    parser.add_argument("--variations", type=int, default=1, help="Number of base image variations")
    parser.add_argument("--seed", type=int, default=None, help="Random seed for reproducibility")
    args = parser.parse_args()

    run_production(args.brief, args.dimensions, args.variations, args.seed)


if __name__ == "__main__":
    main()
