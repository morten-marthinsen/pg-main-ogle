#!/usr/bin/env python3
"""
Burn callout text overlays onto hook stack videos.

Reads the brief.json for approved callout text and burns it onto
the hook portion of each assembled video.

Approach: Renders text as a transparent PNG overlay using Pillow,
then composites it onto the video using ffmpeg's overlay filter
with time-based enable/disable.

Style: White bold text on individual per-line red (#FD3300) boxes,
       each sized to text + padding, centered horizontally in upper third.
       Matches PG brand (ABC Repro Bold, PG red). See v0021 as reference.

For source hooks with baked-in old callout text:
  Default: Overlay new red boxes directly on top (opaque boxes cover old text).
  Fallback: Delogo erase + overlay (only if QA shows old text peeking through).
"""

import json
import shutil
import subprocess
import sys
import os
import tempfile
from PIL import Image, ImageDraw, ImageFont


# --- Brand style constants (reference at 1080x1920) ---
FONT_PATH = os.environ.get("PG_BRAND_FONT_PATH", os.path.expanduser("~/Library/Fonts/ABCRepro-Bold.otf"))
REF_WIDTH = 1080                  # reference design width
REF_HEIGHT = 1920                 # reference design height
REF_FONT_SIZE = 46
TEXT_COLOR = (255, 255, 255)       # white
BOX_COLOR = (253, 51, 0, 255)     # PG brand red #FD3300, fully opaque
REF_BOX_PADDING_H = 24           # horizontal padding inside red box
REF_BOX_PADDING_V = 20           # vertical padding inside red box
REF_LINE_SPACING = 6             # px gap between line boxes

# Delogo-mask defaults (fallback only — used when overlay alone can't cover old text)
MASK_HEIGHT_SINGLE = 150          # mask height for single-line old text
MASK_HEIGHT_MULTI = 250           # mask height for multi-line old text

# Position: center of callout text area in the upper third of 9:16.
# Derived from measuring old PG callout text positions (y=280-434, center=357).
REF_CALLOUT_CENTER_Y = 357

# Display duration: long enough that old text is gone before ours disappears.
DISPLAY_DURATION = 4.5


def get_video_dimensions(video_path: str) -> tuple[int, int]:
    """Get video width and height via ffprobe."""
    cmd = [
        "ffprobe", "-v", "quiet", "-show_entries", "stream=width,height",
        "-of", "csv=p=0", video_path
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0 and result.stdout.strip():
        parts = result.stdout.strip().split(",")
        return int(parts[0]), int(parts[1])
    return REF_WIDTH, REF_HEIGHT  # fallback


def render_callout_overlay(lines: list[str], output_path: str,
                           center_y: int = None,
                           min_box_widths: list[int] = None,
                           min_total_height: int = 0,
                           frame_width: int = None,
                           frame_height: int = None) -> tuple[int, int, int]:
    """Render callout text as a transparent PNG with individual per-line red boxes.

    Each line gets its own red box sized to text + padding, centered horizontally,
    with LINE_SPACING gaps between boxes. Matches PG brand style (v0021 reference).

    All dimensions scale proportionally to the actual video frame size.
    Reference design is 1080x1920 — a 720x1280 video gets 0.667x scaling.

    If min_box_widths is provided (one per line), each box will be at least that
    wide — used when covering old callout text to guarantee full coverage.

    If min_total_height > 0, the overlay is padded to be at least that tall,
    distributing extra height evenly across boxes. This ensures old callout
    areas are fully covered vertically.

    Returns (width, height, y_offset) — y_offset is where to place overlay
    so the text block is centered on center_y.
    """
    if frame_width is None:
        frame_width = REF_WIDTH
    if frame_height is None:
        frame_height = REF_HEIGHT

    # Scale factor relative to reference design
    scale = frame_width / REF_WIDTH
    font_size = max(12, round(REF_FONT_SIZE * scale))
    box_padding_h = max(4, round(REF_BOX_PADDING_H * scale))
    box_padding_v = max(4, round(REF_BOX_PADDING_V * scale))
    line_spacing = max(2, round(REF_LINE_SPACING * scale))

    if center_y is None:
        center_y = round(REF_CALLOUT_CENTER_Y * scale)
    font = ImageFont.truetype(FONT_PATH, font_size)

    # Measure each line
    line_metrics = []
    for i, line in enumerate(lines):
        bbox = font.getbbox(line)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]
        box_w = text_w + (box_padding_h * 2)
        box_h = text_h + (box_padding_v * 2)

        # Enforce minimum box width if covering old text
        if min_box_widths and i < len(min_box_widths):
            box_w = max(box_w, min_box_widths[i])

        line_metrics.append({
            "text": line,
            "text_w": text_w,
            "text_h": text_h,
            "box_w": box_w,
            "box_h": box_h,
            "y_offset": bbox[1],
        })

    # Total text block height (natural)
    natural_h = sum(m["box_h"] for m in line_metrics) + line_spacing * (len(lines) - 1)

    # If covering old text that's taller, expand boxes to fill the space
    text_block_h = natural_h
    if min_total_height > 0 and min_total_height > natural_h:
        extra = min_total_height - natural_h
        extra_per_box = extra // len(lines)
        for m in line_metrics:
            m["box_h"] += extra_per_box
        text_block_h = sum(m["box_h"] for m in line_metrics) + line_spacing * (len(lines) - 1)

    # Create transparent overlay at actual frame width (boxes are centered within it)
    overlay = Image.new("RGBA", (frame_width, text_block_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Draw individual per-line red boxes + white text, each centered horizontally
    y_cursor = 0
    for m in line_metrics:
        box_x = (frame_width - m["box_w"]) // 2
        # Draw red box for this line only
        draw.rectangle(
            [box_x, y_cursor, box_x + m["box_w"], y_cursor + m["box_h"]],
            fill=BOX_COLOR
        )
        # Draw white text centered vertically and horizontally within the box
        text_x = (frame_width - m["text_w"]) // 2
        text_y = y_cursor + (m["box_h"] - m["text_h"]) // 2 - m["y_offset"]
        draw.text((text_x, text_y), m["text"], font=font, fill=TEXT_COLOR)
        y_cursor += m["box_h"] + line_spacing

    overlay.save(output_path, "PNG")

    # Position so text block is centered on target center_y
    place_y = center_y - (text_block_h // 2)

    return overlay.size[0], overlay.size[1], place_y


def burn_callout(input_path: str, output_path: str, lines: list[str],
                 hook_duration: float, tmp_dir: str,
                 old_callout_override: dict = None) -> bool:
    """Burn callout text onto a video file.

    Cover modes when old_callout_override exists:

    1. "overlay_at_old_position" — Natural-sized red boxes overlaid at old
       text's center_y. The opaque red boxes cover old text underneath.
       No delogo, no inflation. Standard PG styling (identical to v0021).

    2. "overlay_at_standard" — Natural-sized red boxes at CALLOUT_CENTER_Y
       (upper third). Old text underneath is covered if nearby. No delogo.

    3. "delogo" — FALLBACK ONLY. Delogo erases old text area, then overlay
       at CALLOUT_CENTER_Y. Only use if QA shows old text peeking through
       after trying overlay-only modes first.

    If no old_callout_override: simple overlay at CALLOUT_CENTER_Y.
    """
    if not lines:
        print(f"  No callout text — skipping")
        return True

    # Detect actual video dimensions for scaling
    vid_w, vid_h = get_video_dimensions(input_path)
    scale = vid_w / REF_WIDTH
    std_center_y = round(REF_CALLOUT_CENTER_Y * scale)
    print(f"  Video: {vid_w}x{vid_h} (scale={scale:.3f})")

    overlay_path = os.path.join(tmp_dir, "callout_overlay.png")
    has_override = old_callout_override is not None
    cover_mode = old_callout_override.get("cover_mode", "delogo") if has_override else None

    if has_override and cover_mode in ("overlay_at_old_position", "overlay_at_standard", "delogo"):
        old_bbox = old_callout_override.get("old_bbox", {})
        mask_center_y = old_bbox.get("center_y", old_callout_override.get("center_y", std_center_y))

        callout_start = old_callout_override.get("start_time", 0.0)
        callout_end = old_callout_override.get("end_time", hook_duration)

        if cover_mode == "overlay_at_old_position":
            # --- Opaque red boxes at old text position (covers old text) ---
            # IMPORTANT: Do NOT use delogo here. Delogo interpolates surrounding
            # pixels and produces visible colored aura/halo artifacts when erasing
            # colored elements (e.g. red boxes → red smear). Instead, size the new
            # boxes to fully cover the old text area. The boxes are opaque — anything
            # underneath is hidden.  (Learned from v0024/v0025 red aura incident.)
            old_box_w = old_bbox.get("w", 0)
            old_box_h = old_bbox.get("h", 0)
            min_widths = [old_box_w] * len(lines) if old_box_w > 0 else None
            min_height = old_box_h if old_box_h > 0 else 0
            overlay_w, overlay_h, callout_y = render_callout_overlay(
                lines, overlay_path, center_y=mask_center_y,
                min_box_widths=min_widths, min_total_height=min_height,
                frame_width=vid_w, frame_height=vid_h
            )
            print(f"  Callout overlay: {overlay_w}x{overlay_h}px at y={callout_y} (center={mask_center_y})")
            print(f"  Cover mode: overlay_at_old_position (overlay-only, no delogo)")
            if min_widths:
                print(f"  Old text coverage: min_w={old_box_w}px, min_h={old_box_h}px")

            filter_complex = (
                f"[1:v]format=rgba[ovr];"
                f"[0:v][ovr]overlay=0:{callout_y}:"
                f"enable='between(t,{callout_start},{callout_end})'"
            )

        elif cover_mode == "overlay_at_standard":
            # --- Natural-sized red boxes at standard upper-third position ---
            callout_end_std = min(callout_end, hook_duration - 0.5)
            overlay_w, overlay_h, callout_y = render_callout_overlay(
                lines, overlay_path, center_y=std_center_y,
                frame_width=vid_w, frame_height=vid_h
            )
            print(f"  Callout overlay: {overlay_w}x{overlay_h}px at y={callout_y} (center={std_center_y})")
            print(f"  Cover mode: overlay_at_standard (overlay-only, no delogo)")

            filter_complex = (
                f"[1:v]format=rgba[ovr];"
                f"[0:v][ovr]overlay=0:{callout_y}:"
                f"enable='between(t,{callout_start},{callout_end_std})'"
            )

        else:
            # --- FALLBACK: delogo erases old text, new callout at standard position ---
            note = old_callout_override.get("note", "")
            is_multi = "/" in note or "\n" in note
            mask_h = old_bbox.get("h", MASK_HEIGHT_MULTI if is_multi else MASK_HEIGHT_SINGLE)
            mask_y = max(0, mask_center_y - mask_h // 2)
            if mask_y + mask_h > vid_h:
                mask_h = vid_h - mask_y
            mask_x = 1
            mask_w = vid_w - 2
            mask_start = old_callout_override.get("start_time", 0.0)
            mask_end = old_callout_override.get("end_time", hook_duration)

            callout_end_std = min(DISPLAY_DURATION, hook_duration - 0.5)
            overlay_w, overlay_h, callout_y = render_callout_overlay(
                lines, overlay_path, center_y=std_center_y,
                frame_width=vid_w, frame_height=vid_h
            )
            print(f"  Callout overlay: {overlay_w}x{overlay_h}px at y={callout_y} (center={std_center_y})")
            print(f"  Delogo mask: {mask_w}x{mask_h}px at y={mask_y} ({mask_start}s→{mask_end}s)")
            print(f"  Cover mode: delogo (FALLBACK — escalated from overlay)")

            filter_complex = (
                f"[0:v]delogo=x={mask_x}:y={mask_y}:w={mask_w}:h={mask_h}:"
                f"enable='between(t,{mask_start},{mask_end})'[masked];"
                f"[1:v]format=rgba[ovr];"
                f"[masked][ovr]overlay=0:{callout_y}:"
                f"enable='between(t,{callout_start},{callout_end_std})'"
            )

    else:
        # --- NO OVERRIDE: Simple overlay at standard position (like v0021) ---
        overlay_w, overlay_h, callout_y = render_callout_overlay(
            lines, overlay_path, center_y=std_center_y,
            frame_width=vid_w, frame_height=vid_h
        )
        print(f"  Callout overlay: {overlay_w}x{overlay_h}px at y={callout_y}")

        callout_start = 0.0
        callout_end = min(DISPLAY_DURATION, hook_duration - 0.5)

        filter_complex = (
            f"[1:v]format=rgba[ovr];"
            f"[0:v][ovr]overlay=0:{callout_y}:"
            f"enable='between(t,{callout_start},{callout_end})'"
        )

    tmp_output = os.path.join(tmp_dir, "burned_output.mp4")

    cmd = [
        "ffmpeg", "-y",
        "-i", input_path,
        "-i", overlay_path,
        "-filter_complex", filter_complex,
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "18",
        "-c:a", "copy",
        "-movflags", "+faststart",
        tmp_output
    ]

    print(f"  Burning: {' / '.join(lines)}")
    print(f"  Callout visible: {callout_start}s → {callout_end}s")
    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"  ERROR: {result.stderr[-500:]}")
        return False

    shutil.move(tmp_output, output_path)

    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"  Done → {os.path.basename(output_path)} ({size_mb:.1f} MB)")
    return True


def process_brief(brief_path: str, input_dir: str, output_dir: str,
                  variation_filter: str = None):
    """Process all variations from a brief.json file."""
    with open(brief_path) as f:
        brief = json.load(f)

    os.makedirs(output_dir, exist_ok=True)

    results = {"success": [], "skipped": [], "failed": []}

    with tempfile.TemporaryDirectory() as tmp_dir:
        for var in brief["variations"]:
            vid = var["variation_id"]

            if variation_filter and vid != variation_filter:
                continue

            callout = var.get("callout_text", {})
            approved = callout.get("approved")

            # Skip if no callout text
            if callout.get("burned_in", False) and approved is None:
                print(f"\n[{vid}] No callout text — skipping")
                results["skipped"].append(vid)
                continue

            if not approved:
                print(f"\n[{vid}] No approved text — skipping")
                results["skipped"].append(vid)
                continue

            filename = var["output_filename"]
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)
            hook_duration = var.get("hook_duration_seconds", 10.0)

            if not os.path.exists(input_path):
                print(f"\n[{vid}] Source not found: {filename}")
                results["failed"].append(vid)
                continue

            lines = approved.split("\n")

            # Read old callout override for blur-mask layer (if source has baked-in text)
            old_override = var.get("old_callout_override")

            mask_note = f", mode={old_override.get('cover_mode', 'delogo')}" if old_override else ""
            print(f"\n[{vid}] {len(lines)} line(s), hook={hook_duration}s{mask_note}")

            if burn_callout(input_path, output_path, lines, hook_duration, tmp_dir,
                            old_callout_override=old_override):
                results["success"].append(vid)
            else:
                results["failed"].append(vid)

    # Summary
    print(f"\n--- Results ---")
    print(f"Success: {results['success']}")
    print(f"Skipped: {results['skipped']}")
    print(f"Failed:  {results['failed']}")

    return results


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python burn_callout_text.py <hook_stack_dir> [variation_id]")
        print("  hook_stack_dir: path to hook stack folder (contains brief.json)")
        print("  variation_id:   optional, e.g. 'v0021' to process only one")
        sys.exit(1)

    hook_stack_dir = sys.argv[1]
    variation_filter = sys.argv[2] if len(sys.argv) > 2 else None

    brief_path = os.path.join(hook_stack_dir, "brief.json")
    input_dir = os.path.join(hook_stack_dir, "outputs")
    output_dir = os.path.join(hook_stack_dir, "outputs", "callout_sandbox")

    if not os.path.exists(brief_path):
        print(f"brief.json not found at {brief_path}")
        sys.exit(1)

    process_brief(brief_path, input_dir, output_dir, variation_filter)
