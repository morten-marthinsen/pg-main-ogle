"""
Assemble all inputs into a structured Environment Expansion Brief.

Combines hook transcripts, Gemini visual analysis, audience constraints,
environments, and the naming convention into a single actionable document.

Usage:
    python execution/generate_expansion_brief.py \
        --hook-transcripts \
            .tmp/offers/dqfe/womens/expansions/0036/inputs/hooks/36v3_tee_to_toe.txt \
            .tmp/offers/dqfe/womens/expansions/0036/inputs/hooks/12v16_ladies_did_you_see.txt \
        --visual-analysis .tmp/offers/dqfe/womens/expansions/0036/inputs/winning_ad_analysis.json \
        --avatar-image .tmp/avatars/female-blue-shirt/reference.png \
        --environments "golf simulator" "driving range" "golf cart" "clubhouse" "golf course fairway" \
        --audience "Women golfers, intermediate/amateur. No male golfers visible." \
        --funnel dqfe \
        --root-angle-id 0036 \
        --variation-start 17 \
        --output .tmp/offers/dqfe/womens/expansions/0036/brief.md
"""

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv

WORKSPACE = Path(__file__).resolve().parent.parent
load_dotenv(WORKSPACE / ".env")


# --- Naming Convention Builder (Tess v3.9) ---

def build_asset_id(
    funnel: str,
    root_angle_id: str,
    variation_num: int,
    platform: str = "fb",
    dimensions: str = "9x16",
    length_tier: str = "30s",
    ad_category: str = "exh",
    expansion_type: str = "env",
    asset_type: str = "avo",
    talent_code: str = "xxxx",
    editor_initials: str = "rv",
    copywriter_initials: str = "co",
    country_code: str = "us",
    delivery_date: str = None,
    promo_name: str = "",
) -> str:
    """Build a 15-position asset ID per Tess v3.9 naming convention."""
    if delivery_date is None:
        delivery_date = datetime.now().strftime("%Y%m%d")

    variation_id = f"v{variation_num:04d}"

    parts = [
        funnel,
        root_angle_id,
        variation_id,
        platform,
        dimensions,
        length_tier,
        ad_category,
        expansion_type,
        asset_type,
        talent_code,
        editor_initials,
        copywriter_initials,
        country_code,
        delivery_date,
    ]

    if promo_name:
        parts.append(promo_name)

    return "-".join(parts)


# --- Brief Generation ---

ENVIRONMENT_CREATIVE_DIRECTION = {
    "golf simulator": {
        "description": "Indoor golf simulator bay with screen showing a virtual course.",
        "visual_notes": "Modern, tech-forward feel. Warm indoor lighting. Simulator screen glowing in background. Avatar positioned as if standing in the bay.",
        "broll_suggestions": "Close-up of ball striking into screen, launch monitor data, simulator screen showing ball flight.",
        "image_prompt": (
            "A woman in a blue shirt standing confidently in a modern indoor golf "
            "simulator bay. A large screen behind her shows a virtual golf course. "
            "Warm indoor lighting, tech-forward feel. She faces the camera directly, "
            "hands relaxed at her sides. 9:16 vertical portrait format. "
            "High quality, realistic, natural skin tones."
        ),
        "video_prompt": (
            "The woman begins speaking directly to camera with confident, natural "
            "delivery. Subtle hand gestures as she talks. The simulator screen "
            "behind her glows softly. Slight ambient movement — screen graphics "
            "shifting. Casual but professional energy. She maintains eye contact "
            "with the camera throughout."
        ),
    },
    "driving range": {
        "description": "Outdoor driving range with green grass and distant targets.",
        "visual_notes": "Natural daylight, open sky. Avatar positioned at a bay or standing near the range. Other golfers visible in background adds authenticity.",
        "broll_suggestions": "Balls in flight against blue sky, hitting mats, bucket of balls, range targets.",
        "image_prompt": (
            "A woman in a blue shirt standing at an outdoor driving range. Green "
            "grass stretches behind her with distant target flags. Natural daylight, "
            "clear sky. She faces the camera directly with a relaxed posture. "
            "9:16 vertical portrait format. High quality, realistic."
        ),
        "video_prompt": (
            "The woman speaks directly to camera at the driving range. Natural "
            "breeze moves her hair slightly. Background shows distant golfers "
            "hitting balls. Natural outdoor ambient movement. Confident, casual "
            "delivery with occasional hand gestures. Eye contact maintained."
        ),
    },
    "golf cart": {
        "description": "Seated in or standing next to a golf cart on a course path.",
        "visual_notes": "Course greenery in background. Relaxed, casual feel. Cart provides framing element. Minimal movement OK (slight breeze, hair movement).",
        "broll_suggestions": "Cart path winding through course, clubs in cart bag, scenery passing by.",
        "image_prompt": (
            "A woman in a blue shirt seated in a golf cart on a scenic course path. "
            "Lush green fairways and trees in the background. Relaxed, casual feel. "
            "The golf cart provides a natural framing element. She faces the camera "
            "with a friendly expression. 9:16 vertical portrait format. "
            "High quality, realistic, natural lighting."
        ),
        "video_prompt": (
            "The woman speaks to camera from inside a golf cart. Slight breeze "
            "rustles nearby trees. She gestures casually while talking. The course "
            "scenery is visible behind her. Relaxed, conversational energy. "
            "Natural ambient movement in the background."
        ),
    },
    "clubhouse": {
        "description": "Inside or on the patio of a golf clubhouse. Casual, social setting.",
        "visual_notes": "Warm, inviting atmosphere. Could be at a table, at the bar area, or on the patio overlooking the course. Natural or warm artificial lighting.",
        "broll_suggestions": "View from patio over course, drinks on table, club interior details.",
        "image_prompt": (
            "A woman in a blue shirt seated on the patio of a golf clubhouse, "
            "overlooking a course. Warm, inviting atmosphere with natural light. "
            "A table with a drink is partially visible. She faces the camera with "
            "a welcoming, confident expression. 9:16 vertical portrait format. "
            "High quality, realistic."
        ),
        "video_prompt": (
            "The woman speaks to camera from a clubhouse patio. Warm natural "
            "lighting. Background shows the golf course stretching out behind her. "
            "She leans in slightly as she talks, creating intimacy. Gentle ambient "
            "sounds. Confident, social energy."
        ),
    },
    "golf course fairway": {
        "description": "Standing on the actual course mid-round. Most 'authentic golfer' feel.",
        "visual_notes": "Trees lining the fairway, manicured grass, maybe a flag in the distance. Natural outdoor lighting. Feels like a real round of golf — not a posed photoshoot.",
        "broll_suggestions": "Fairway stretching to green, flag stick in distance, trees framing the hole, golf bag on nearby cart.",
        "image_prompt": (
            "A woman in a blue shirt standing on a golf course fairway mid-round. "
            "Lush green fairway grass underfoot, mature trees lining both sides, "
            "a distant flag stick visible on the green. Natural outdoor lighting, "
            "clear sky. Authentic golfer feel — she looks like she paused mid-round "
            "to speak to camera. 9:16 vertical portrait format. "
            "High quality, realistic, natural skin tones."
        ),
        "video_prompt": (
            "The woman speaks directly to camera standing on a golf course fairway. "
            "Gentle breeze moves nearby tree branches and her hair slightly. "
            "The fairway stretches behind her with a distant flag. Natural outdoor "
            "ambient movement — birds, swaying grass. Confident, casual delivery "
            "as if sharing a tip mid-round. Eye contact maintained."
        ),
    },
}


def load_text_file(path: str) -> str:
    """Load a text file and return contents."""
    with open(path, "r") as f:
        return f.read().strip()


def load_json_file(path: str) -> dict:
    """Load a JSON file and return parsed data."""
    with open(path, "r") as f:
        return json.load(f)


def generate_brief(
    hook_transcripts,
    visual_analysis,
    avatar_image_path,
    environments,
    audience: str,
    funnel: str,
    root_angle_id: str,
    variation_start: int,
    editor_initials: str,
    copywriter_initials: str,
) -> str:
    """Generate the full expansion brief as markdown."""
    delivery_date = datetime.now().strftime("%Y%m%d")
    lines = []

    # Header
    lines.append("# Environment Expansion Brief")
    lines.append("")
    lines.append(f"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append(f"**Funnel:** `{funnel}`")
    lines.append(f"**Root Angle ID:** `{root_angle_id}`")
    lines.append(f"**Ad Category:** `exh` (Horizontal Expansion)")
    lines.append(f"**Expansion Type:** `env` (Environment)")
    lines.append("")

    # Target Audience
    lines.append("## Target Audience")
    lines.append("")
    lines.append(audience)
    lines.append("")

    # Avatar Specification
    lines.append("## Avatar Specification")
    lines.append("")
    if avatar_image_path:
        lines.append(f"- **Reference image:** `{avatar_image_path}`")
    else:
        lines.append("- **Reference image:** _(not provided — add before generation)_")
    lines.append("- **Character type:** Fictitious AI avatar (not based on real person)")
    lines.append("- **Key features:** Female, blue shirt (must be consistent across all environments)")
    lines.append("- **Consistency requirement:** Must look like the SAME person in all 5 environments")
    lines.append("")

    # Visual Blueprint (from Gemini analysis)
    lines.append("## Visual Blueprint (Source Ad Analysis)")
    lines.append("")
    if visual_analysis:
        analysis = visual_analysis.get("analysis", visual_analysis)

        if "raw_response" in analysis:
            lines.append("_(Analysis could not be parsed as structured data. Raw output below.)_")
            lines.append("")
            lines.append("```")
            lines.append(analysis["raw_response"][:2000])
            lines.append("```")
        else:
            # Avatar placement
            if "avatar_placement" in analysis:
                ap = analysis["avatar_placement"]
                lines.append("### Avatar Placement (replicate this)")
                lines.append(f"- **Position:** {ap.get('position', 'N/A')}")
                lines.append(f"- **Size ratio:** {ap.get('size_ratio', 'N/A')}")
                lines.append(f"- **Background visible:** {ap.get('background_visible', 'N/A')}")
                lines.append("")

            # B-roll integration
            if "broll_integration" in analysis:
                br = analysis["broll_integration"]
                lines.append("### B-Roll Pattern (replicate this)")
                lines.append(f"- **Pattern:** {br.get('pattern', 'N/A')}")
                lines.append(f"- **Types:** {br.get('broll_types', 'N/A')}")
                lines.append(f"- **Timing:** {br.get('timing', 'N/A')}")
                lines.append("")

            # Text overlays
            if "text_overlays" in analysis:
                to = analysis["text_overlays"]
                lines.append("### Text Overlays (replicate this)")
                lines.append(f"- **Style:** {to.get('style', 'N/A')}")
                lines.append(f"- **Position:** {to.get('position', 'N/A')}")
                lines.append(f"- **Timing:** {to.get('timing', 'N/A')}")
                lines.append(f"- **Emphasis:** {to.get('emphasis_technique', 'N/A')}")
                lines.append("")

            # Pacing
            if "visual_pacing" in analysis:
                vp = analysis["visual_pacing"]
                lines.append("### Pacing (replicate this)")
                lines.append(f"- **Avg cut duration:** {vp.get('avg_cut_duration', 'N/A')}")
                lines.append(f"- **Rhythm:** {vp.get('rhythm_pattern', 'N/A')}")
                lines.append("")

            # Full JSON for reference
            lines.append("<details>")
            lines.append("<summary>Full analysis JSON</summary>")
            lines.append("")
            lines.append("```json")
            lines.append(json.dumps(analysis, indent=2))
            lines.append("```")
            lines.append("</details>")
            lines.append("")
    else:
        lines.append("_(No visual analysis provided. Run analyze_winning_ad.py first.)_")
        lines.append("")

    # Hook Transcripts
    lines.append("---")
    lines.append("")
    lines.append("## Hook Transcripts")
    lines.append("")
    lines.append("**CRITICAL: These scripts must be delivered VERBATIM. The root angle must be preserved.**")
    lines.append("**The ONLY variable across environments is the visual setting.**")
    lines.append("")

    for i, (label, transcript) in enumerate(hook_transcripts, 1):
        lines.append(f"### Hook Transcript {i}: {label}")
        lines.append("")
        lines.append("```")
        lines.append(transcript)
        lines.append("```")
        lines.append("")

    # Environments
    lines.append("---")
    lines.append("")
    lines.append("## Environments (5 variations per ad set)")
    lines.append("")

    for i, env_name in enumerate(environments, 1):
        env_key = env_name.lower().strip()
        direction = ENVIRONMENT_CREATIVE_DIRECTION.get(env_key, {})

        lines.append(f"### Environment {i}: {env_name.title()}")
        lines.append("")
        if direction:
            lines.append(f"**Description:** {direction.get('description', env_name)}")
            lines.append("")
            lines.append(f"**Visual notes:** {direction.get('visual_notes', '')}")
            lines.append("")
            lines.append(f"**B-roll suggestions:** {direction.get('broll_suggestions', '')}")
        else:
            lines.append(f"**Description:** {env_name}")
            lines.append("")
            lines.append("**Visual notes:** _(add creative direction)_")
            lines.append("")
            lines.append("**B-roll suggestions:** _(add suggestions)_")
        lines.append("")

        # Dual prompts: image (composition) + video (motion)
        lines.append(f"#### Prompts — {env_name.title()}")
        lines.append("")
        img_prompt = direction.get("image_prompt", f"A woman in a blue shirt in a {env_name} setting, facing camera. 9:16 vertical portrait. High quality, realistic.")
        vid_prompt = direction.get("video_prompt", f"The woman speaks directly to camera in a {env_name}. Natural delivery, eye contact, subtle gestures.")
        lines.append(f"**Image Prompt** _(for reference frame — Step 3a):_")
        lines.append(f"> {img_prompt}")
        lines.append("")
        lines.append(f"**Video Prompt** _(for animation — Step 3b):_")
        lines.append(f"> {vid_prompt}")
        lines.append("")

    # Asset Naming Convention
    lines.append("---")
    lines.append("")
    lines.append("## Asset IDs (Tess v3.9 Naming Convention)")
    lines.append("")
    lines.append("Format: `[Funnel]-[RootAngleID]-[VariationID]-[Platform]-[Dimensions]-[LengthTier]-[AdCategory]-[ExpansionType]-[AssetType]-[TalentCode]-[EditorInitials]-[CopywriterInitials]-[CountryCode]-[DeliveryDate]`")
    lines.append("")

    var_num = variation_start
    for i, (label, _) in enumerate(hook_transcripts, 1):
        lines.append(f"### Ad Set {i} — {label}")
        lines.append("")
        lines.append("| # | Environment | Asset ID |")
        lines.append("|---|---|---|")

        for j, env_name in enumerate(environments, 1):
            asset_id = build_asset_id(
                funnel=funnel,
                root_angle_id=root_angle_id,
                variation_num=var_num,
                editor_initials=editor_initials,
                copywriter_initials=copywriter_initials,
                delivery_date=delivery_date,
            )
            lines.append(f"| {j} | {env_name.title()} | `{asset_id}` |")
            var_num += 1

        lines.append("")

    # Generation Checklist
    lines.append("---")
    lines.append("")
    lines.append("## Generation Checklist")
    lines.append("")
    lines.append("### Step 2b: Airtable")
    lines.append("- [ ] Prompts logged to Airtable (10 records)")
    lines.append("")
    lines.append("### Step 3a: Reference Frames")
    lines.append("- [ ] Cost estimate shown and approved")
    lines.append("- [ ] All 10 reference frames generated")
    lines.append("- [ ] Avatar consistency check across all 10 frames")
    lines.append("- [ ] No male golfers visible in any frame")
    lines.append("- [ ] All frames reviewed and approved in Airtable")
    lines.append("")
    lines.append("### Step 3b: Videos")
    lines.append("- [ ] Cost estimate shown and approved (~$28 for 10 Veo clips)")
    lines.append("- [ ] All approved frames animated to video")
    lines.append("- [ ] Script delivered verbatim (root angle preserved)")
    lines.append("- [ ] Clips exported at correct aspect ratio (9:16)")
    lines.append("- [ ] All videos reviewed and approved in Airtable")
    lines.append("")
    lines.append("### Delivery")
    lines.append("- [ ] Asset IDs applied to file names")
    lines.append("- [ ] Delivered to editor for stacking onto ad body")
    lines.append("")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="Generate an Environment Expansion Brief"
    )
    parser.add_argument(
        "--hook-transcripts",
        nargs="+",
        required=True,
        help="Paths to hook transcript text files",
    )
    parser.add_argument(
        "--hook-labels",
        nargs="+",
        default=None,
        help="Labels for each hook transcript (e.g., 'DQFE 36v3 Tee to Toe' 'DQFE 12v16 Ladies Did You See')",
    )
    parser.add_argument(
        "--visual-analysis",
        default=None,
        help="Path to visual_analysis.json from analyze_winning_ad.py",
    )
    parser.add_argument(
        "--avatar-image",
        default=None,
        help="Path to the avatar reference image",
    )
    parser.add_argument(
        "--environments",
        nargs="+",
        default=["golf simulator", "driving range", "golf cart", "clubhouse", "golf course fairway"],
        help="List of environment names",
    )
    parser.add_argument(
        "--audience",
        default="Women golfers, intermediate/amateur. No male golfers visible in any frame.",
        help="Target audience description and constraints",
    )
    parser.add_argument("--funnel", required=True, help="Funnel code (e.g., dqfe, wpss)")
    parser.add_argument("--root-angle-id", required=True, help="Root angle ID (e.g., 0036)")
    parser.add_argument(
        "--variation-start",
        type=int,
        default=1,
        help="Starting variation number (sequential from last existing variation)",
    )
    parser.add_argument(
        "--editor-initials", default="rv", help="Editor initials code"
    )
    parser.add_argument(
        "--copywriter-initials", default="co", help="Copywriter initials code"
    )
    parser.add_argument(
        "--output",
        default=str(WORKSPACE / ".tmp" / "expansion_brief.md"),
        help="Output path for the brief",
    )
    args = parser.parse_args()

    # Load hook transcripts
    hook_transcripts = []
    for i, path in enumerate(args.hook_transcripts):
        if not Path(path).exists():
            print(f"ERROR: Hook transcript not found: {path}")
            sys.exit(1)
        text = load_text_file(path)
        if args.hook_labels and i < len(args.hook_labels):
            label = args.hook_labels[i]
        else:
            label = Path(path).stem
        hook_transcripts.append((label, text))

    # Load visual analysis if provided
    visual_analysis = None
    if args.visual_analysis and Path(args.visual_analysis).exists():
        visual_analysis = load_json_file(args.visual_analysis)

    # Ensure output directory exists
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)

    # Generate brief
    brief = generate_brief(
        hook_transcripts=hook_transcripts,
        visual_analysis=visual_analysis,
        avatar_image_path=args.avatar_image,
        environments=args.environments,
        audience=args.audience,
        funnel=args.funnel,
        root_angle_id=args.root_angle_id,
        variation_start=args.variation_start,
        editor_initials=args.editor_initials,
        copywriter_initials=args.copywriter_initials,
    )

    with open(args.output, "w") as f:
        f.write(brief)

    print(f"Brief generated: {args.output}")
    print(f"  {len(hook_transcripts)} hook transcript(s)")
    print(f"  {len(args.environments)} environment(s)")
    total_assets = len(hook_transcripts) * len(args.environments)
    print(f"  {total_assets} total assets to generate")


if __name__ == "__main__":
    main()
