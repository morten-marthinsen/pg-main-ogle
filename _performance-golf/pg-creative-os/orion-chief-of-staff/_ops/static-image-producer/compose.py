"""
Pillow-based brand composition engine.

Takes a base image and overlays PG brand elements:
- Semi-transparent gradient for text legibility
- Headline text (Repro Bold, uppercase, white)
- CTA button (Performance Orange #FD3300)
- PG logo (corner placement)

Usage:
    from compose import compose_image
    path = compose_image("base.png", "THE FAIRWAY CLUB", "SHOP NOW", "output.png", layout)
"""

import json
import os
from typing import List
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Brand asset paths (relative to repo root)
REPO_ROOT = Path(__file__).resolve().parents[5]  # up to pg-main-ogle
BRAND_DIR = REPO_ROOT / "_performance-golf" / "pg-brand" / "pg-brand-assets"
FONT_REPRO_BOLD = str(BRAND_DIR / "fonts" / "repro" / "ABCRepro-Bold.otf")
FONT_REPRO_MEDIUM = str(BRAND_DIR / "fonts" / "repro" / "ABCRepro-Medium.otf")
FONT_GT_SUPER = str(BRAND_DIR / "fonts" / "gt-super-text" / "GT-Super-Text-Book.otf")
LOGO_SYMBOL_WHITE = str(BRAND_DIR / "logos" / "PER-Symbol-White.png")
LOGO_COMBO_WHITE = str(BRAND_DIR / "logos" / "PER-Combination-White.png")

# Brand colors
ORANGE = "#FD3300"
DARK_ORANGE = "#DB2C00"
BLACK = "#1D1A1A"
WHITE = "#FFFFFF"


def hex_to_rgb(hex_color: str) -> tuple:
    h = hex_color.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def load_layout(template_path: str) -> dict:
    with open(template_path) as f:
        return json.load(f)


def _draw_text_with_tracking(
    draw: ImageDraw.ImageDraw,
    position: tuple,
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: str,
    tracking_pct: float = -0.03,
) -> float:
    """Draw text with letter-spacing (tracking). Returns total width drawn."""
    x, y = position
    total_width = 0
    for char in text:
        bbox = font.getbbox(char)
        char_width = bbox[2] - bbox[0]
        draw.text((x, y), char, font=font, fill=fill)
        spacing = char_width * (1 + tracking_pct)
        x += spacing
        total_width += spacing
    return total_width


def _wrap_text(text: str, font: ImageFont.FreeTypeFont, max_width: int, tracking_pct: float = -0.03) -> List[str]:
    """Word-wrap text to fit within max_width, accounting for tracking."""
    lines = []
    for raw_line in text.split("\n"):
        words = raw_line.split()
        if not words:
            lines.append("")
            continue
        current_line = words[0]
        for word in words[1:]:
            test_line = current_line + " " + word
            # Measure with tracking
            width = sum(
                font.getbbox(c)[2] - font.getbbox(c)[0]
                for c in test_line
            ) * (1 + tracking_pct)
            if width <= max_width:
                current_line = test_line
            else:
                lines.append(current_line)
                current_line = word
        lines.append(current_line)
    return lines


def _smart_crop(img: Image.Image, target_w: int, target_h: int, focal_point: str = "center") -> Image.Image:
    """Crop image to target aspect ratio, then resize. Never stretches.

    focal_point options:
        "center"       — crop from center (default)
        "top"          — anchor crop to top edge
        "bottom"       — anchor crop to bottom edge
        "left"         — anchor crop to left edge
        "right"        — anchor crop to right edge
        "top-third"    — anchor crop to upper third
        "bottom-third" — anchor crop to lower third
    """
    src_w, src_h = img.size
    target_ratio = target_w / target_h
    src_ratio = src_w / src_h

    if abs(src_ratio - target_ratio) < 0.01:
        # Already the right ratio, just resize
        return img.resize((target_w, target_h), Image.LANCZOS)

    if src_ratio > target_ratio:
        # Source is wider than target — crop width
        new_w = int(src_h * target_ratio)
        new_h = src_h
        if focal_point == "left":
            x_offset = 0
        elif focal_point == "right":
            x_offset = src_w - new_w
        else:  # center (default for horizontal crops)
            x_offset = (src_w - new_w) // 2
        y_offset = 0
    else:
        # Source is taller than target — crop height
        new_w = src_w
        new_h = int(src_w / target_ratio)
        if focal_point == "top":
            y_offset = 0
        elif focal_point == "bottom":
            y_offset = src_h - new_h
        elif focal_point == "top-third":
            y_offset = max(0, (src_h - new_h) // 3)
        elif focal_point == "bottom-third":
            y_offset = min(src_h - new_h, (src_h - new_h) * 2 // 3)
        else:  # center (default for vertical crops)
            y_offset = (src_h - new_h) // 2
        x_offset = 0

    # Crop to target aspect ratio
    cropped = img.crop((x_offset, y_offset, x_offset + new_w, y_offset + new_h))

    # Resize to exact target dimensions
    return cropped.resize((target_w, target_h), Image.LANCZOS)


def compose_image(
    base_path: str,
    headline: str,
    cta: str,
    output_path: str,
    layout: dict,
    subheadline: str = "",
    subheadline_font_style: str = "medium",
) -> str:
    """Compose a branded ad image from a base image + text overlay.

    Args:
        base_path: Path to base image (from Fal.ai or Iconik)
        headline: Headline text (will be uppercased)
        cta: CTA button text
        output_path: Where to save the composed image
        layout: Layout configuration dict (from templates/)
        subheadline: Subheadline text (sentence case, optional)
        subheadline_font_style: "medium" for Repro Medium, "serif" for GT Super Text

    Returns:
        Path to the composed image
    """
    target_w = layout["width"]
    target_h = layout["height"]
    hl_cfg = layout["headline"]
    cta_cfg = layout["cta"]
    logo_cfg = layout["logo"]
    gradient_start = layout.get("gradient_start_pct", 0.55)
    colors = layout.get("colors", {})

    # Load base image and smart-crop to target aspect ratio (NEVER stretch)
    base = Image.open(base_path).convert("RGBA")
    base = _smart_crop(base, target_w, target_h, layout.get("focal_point", "center"))

    # Create overlay layer for gradient + text
    overlay = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Draw gradient (bottom portion)
    gradient_y_start = int(target_h * gradient_start)
    gradient_color = hex_to_rgb(colors.get("gradient_color", BLACK))
    for y in range(gradient_y_start, target_h):
        progress = (y - gradient_y_start) / (target_h - gradient_y_start)
        alpha = int(progress * 200)  # max 200/255 opacity
        draw.line([(0, y), (target_w, y)], fill=(*gradient_color, alpha))

    # Load fonts
    try:
        headline_font = ImageFont.truetype(FONT_REPRO_BOLD, hl_cfg["font_size"])
    except (OSError, IOError):
        print(f"  Warning: Could not load {FONT_REPRO_BOLD}, using default font")
        headline_font = ImageFont.load_default()

    try:
        cta_font = ImageFont.truetype(FONT_REPRO_BOLD, cta_cfg["font_size"])
    except (OSError, IOError):
        cta_font = ImageFont.load_default()

    # Draw headline (uppercase, with tracking)
    headline_upper = headline.upper()
    headline_color = colors.get("headline", WHITE)
    tracking = layout.get("tracking_pct", -0.03)

    wrapped_lines = _wrap_text(headline_upper, headline_font, hl_cfg["max_width"], tracking)
    line_height = int(hl_cfg["font_size"] * hl_cfg.get("line_spacing", 1.15))

    y_pos = hl_cfg["y"]
    for line in wrapped_lines:
        # Draw shadow for legibility
        _draw_text_with_tracking(draw, (hl_cfg["x"] + 2, y_pos + 2), line, headline_font, "#00000080", tracking)
        # Draw text
        _draw_text_with_tracking(draw, (hl_cfg["x"], y_pos), line, headline_font, headline_color, tracking)
        y_pos += line_height

    # Draw subheadline (between headline and CTA)
    if subheadline:
        sub_cfg = layout.get("subheadline", {})
        sub_font_size = sub_cfg.get("font_size", int(hl_cfg["font_size"] * 0.45))
        sub_color = colors.get("subheadline", "#E0E0E0")

        # Pick font based on style
        sub_font_path = FONT_GT_SUPER if subheadline_font_style == "serif" else FONT_REPRO_MEDIUM
        try:
            sub_font = ImageFont.truetype(sub_font_path, sub_font_size)
        except (OSError, IOError):
            sub_font = ImageFont.load_default()

        sub_x = sub_cfg.get("x", hl_cfg["x"])
        sub_y = sub_cfg.get("y", y_pos + int(sub_font_size * 0.4))
        sub_max_w = sub_cfg.get("max_width", hl_cfg["max_width"])
        sub_tracking = sub_cfg.get("tracking_pct", -0.01)
        sub_line_spacing = sub_cfg.get("line_spacing", 1.3)

        sub_lines = _wrap_text(subheadline, sub_font, sub_max_w, sub_tracking)
        sub_line_h = int(sub_font_size * sub_line_spacing)

        for sub_line in sub_lines:
            # Shadow
            _draw_text_with_tracking(draw, (sub_x + 1, sub_y + 1), sub_line, sub_font, "#00000060", sub_tracking)
            # Text
            _draw_text_with_tracking(draw, (sub_x, sub_y), sub_line, sub_font, sub_color, sub_tracking)
            sub_y += sub_line_h

    # Draw CTA button
    cta_color = hex_to_rgb(colors.get("cta_bg", ORANGE))
    cta_text_color = colors.get("cta_text", WHITE)
    cta_x = cta_cfg["x"]
    cta_y = cta_cfg["y"]
    cta_w = cta_cfg["width"]
    cta_h = cta_cfg["height"]
    radius = cta_cfg.get("corner_radius", 8)

    # Rounded rectangle for CTA
    draw.rounded_rectangle(
        [(cta_x, cta_y), (cta_x + cta_w, cta_y + cta_h)],
        radius=radius,
        fill=(*cta_color, 255),
    )

    # Center CTA text in button
    cta_upper = cta.upper()
    cta_bbox = cta_font.getbbox(cta_upper)
    cta_text_w = cta_bbox[2] - cta_bbox[0]
    cta_text_h = cta_bbox[3] - cta_bbox[1]
    cta_text_x = cta_x + (cta_w - cta_text_w) // 2
    cta_text_y = cta_y + (cta_h - cta_text_h) // 2 - cta_bbox[1]
    draw.text((cta_text_x, cta_text_y), cta_upper, font=cta_font, fill=cta_text_color)

    # Composite overlay onto base
    composed = Image.alpha_composite(base, overlay)

    # Add logo
    logo_path = logo_cfg.get("file", LOGO_SYMBOL_WHITE)
    if logo_cfg.get("variant") == "combination":
        logo_path = LOGO_COMBO_WHITE
    elif logo_cfg.get("variant") == "symbol":
        logo_path = LOGO_SYMBOL_WHITE

    try:
        logo = Image.open(logo_path).convert("RGBA")
        max_h = logo_cfg["max_height"]
        ratio = max_h / logo.height
        new_w = int(logo.width * ratio)
        logo = logo.resize((new_w, max_h), Image.LANCZOS)
        logo_x = logo_cfg.get("x", 40)
        logo_y = logo_cfg.get("y", 40)
        composed.paste(logo, (logo_x, logo_y), logo)
    except (OSError, IOError) as e:
        print(f"  Warning: Could not load logo: {e}")

    # Save as RGB PNG
    final = composed.convert("RGB")
    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    final.save(output_path, "PNG", quality=95)
    print(f"  Composed: {output_path}")
    return output_path


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Compose a branded ad image")
    parser.add_argument("--base", required=True, help="Path to base image")
    parser.add_argument("--headline", required=True, help="Headline text")
    parser.add_argument("--cta", default="SHOP NOW", help="CTA button text")
    parser.add_argument("--template", required=True, help="Path to layout template JSON")
    parser.add_argument("--output", required=True, help="Output path")
    args = parser.parse_args()

    layout = load_layout(args.template)
    compose_image(args.base, args.headline, args.cta, args.output, layout)
