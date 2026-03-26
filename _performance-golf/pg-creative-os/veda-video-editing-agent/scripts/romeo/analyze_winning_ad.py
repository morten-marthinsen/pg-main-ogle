"""
Analyze a winning ad video using Gemini's video understanding.

Extracts visual structure, composition, pacing, and production patterns
that explain WHY the ad performs well — giving a visual blueprint for
recreating the hook in new environments.

Usage:
    python execution/analyze_winning_ad.py \
        --video .tmp/offers/dqfe/womens/expansions/0036/inputs/winning_ad.mp4 \
        --output .tmp/offers/dqfe/womens/expansions/0036/inputs/winning_ad_analysis.json

    # Optionally specify Gemini model
    python execution/analyze_winning_ad.py \
        --video .tmp/offers/dqfe/womens/expansions/0036/inputs/winning_ad.mp4 \
        --model gemini-2.5-pro \
        --output .tmp/offers/dqfe/womens/expansions/0036/inputs/winning_ad_analysis.json
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path

from dotenv import load_dotenv

# Load env from workspace root
WORKSPACE = Path(__file__).resolve().parent.parent
load_dotenv(WORKSPACE / ".env")


def get_client():
    """Initialize Google GenAI client."""
    from google import genai

    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("ERROR: GOOGLE_API_KEY not set in .env")
        sys.exit(1)
    return genai.Client(api_key=api_key)


def upload_video(client, video_path: str):
    """Upload video to Gemini Files API and wait for processing."""
    print(f"Uploading {video_path}...")
    video_file = client.files.upload(file=video_path)
    print(f"Uploaded: {video_file.name}")

    # Wait for video processing
    while video_file.state.name == "PROCESSING":
        print("  Processing video...")
        time.sleep(5)
        video_file = client.files.get(name=video_file.name)

    if video_file.state.name == "FAILED":
        print(f"ERROR: Video processing failed: {video_file.state}")
        sys.exit(1)

    print(f"  Ready (state: {video_file.state.name})")
    return video_file


ANALYSIS_PROMPT = """You are analyzing a winning performance marketing video ad for a golf company (Performance Golf). This ad has strong performance data, and we need to understand exactly WHY it works visually so we can recreate the hook in different environments.

Analyze this video and return a detailed JSON structure covering:

1. **hook_structure**: Break down the first 15 seconds frame by frame:
   - scroll_stopper (0-3s): What grabs attention in the first 3 seconds?
   - hook_body (3-15s): How does the hook develop?
   - transition_to_body: How does it transition to the main ad body?

2. **avatar_placement**: Where is the talking head/presenter in the frame?
   - position (e.g., "bottom-right PiP", "full frame center", "left third")
   - size_ratio (approximate % of frame)
   - background_visible (bool — can you see the environment behind them?)

3. **broll_integration**: How is B-roll used?
   - pattern (e.g., "intercut every 3-4 seconds", "continuous with PiP overlay")
   - broll_types (list of what B-roll shows — golf swings, course shots, etc.)
   - timing (when do B-roll cuts happen relative to script beats?)

4. **text_overlays**: Caption and text treatment:
   - style (font style, size relative to frame)
   - position (where on screen)
   - timing (continuous subtitles, keyword highlights, or both?)
   - emphasis_technique (bold keywords, color changes, animations?)

5. **visual_pacing**:
   - avg_cut_duration (approximate seconds between cuts)
   - rhythm_pattern (e.g., "fast-slow-fast", "steady 3s cuts")
   - energy_level (low/medium/high at different points)

6. **color_and_mood**:
   - dominant_colors (list)
   - lighting_style (natural, studio, mixed)
   - overall_mood (e.g., "casual and relatable", "professional", "aspirational")

7. **presenter_details**:
   - appearance (clothing, hair, approximate age, gender)
   - delivery_style (casual/professional, energy level, eye contact)
   - gestures (notable hand movements or body language)

8. **environment_details**:
   - setting (where is the presenter? what's the background?)
   - props_visible (any objects, equipment visible?)
   - depth_of_field (blurred background or sharp?)

9. **production_notes**:
   - estimated_resolution (720p, 1080p, 4K)
   - aspect_ratio (9:16, 16:9, 1:1)
   - any_ai_elements (does anything look AI-generated?)
   - quality_observations (anything notable about production quality)

Return ONLY valid JSON. No markdown code fences. No commentary outside the JSON.
Use snake_case for all keys. Use arrays for lists, strings for descriptions."""


def analyze_video(client, video_file, model: str) -> dict:
    """Send video to Gemini for analysis."""
    print(f"Analyzing with {model}...")

    response = client.models.generate_content(
        model=model,
        contents=[video_file, ANALYSIS_PROMPT],
    )

    # Parse the JSON response
    text = response.text.strip()
    # Strip markdown fences if model includes them despite instructions
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
    if text.endswith("```"):
        text = text.rsplit("```", 1)[0]
    if text.startswith("json"):
        text = text[4:].strip()

    try:
        analysis = json.loads(text)
    except json.JSONDecodeError as e:
        print(f"WARNING: Could not parse response as JSON: {e}")
        print("Raw response saved to output for manual review.")
        analysis = {"raw_response": text, "parse_error": str(e)}

    return analysis


def cleanup_file(client, video_file):
    """Delete uploaded video from Gemini Files API."""
    try:
        client.files.delete(name=video_file.name)
        print(f"Cleaned up uploaded file: {video_file.name}")
    except Exception as e:
        print(f"Note: Could not delete uploaded file: {e}")


def main():
    parser = argparse.ArgumentParser(
        description="Analyze a winning ad video using Gemini"
    )
    parser.add_argument(
        "--video", required=True, help="Path to the video file to analyze"
    )
    parser.add_argument(
        "--output",
        default=str(WORKSPACE / ".tmp" / "visual_analysis.json"),
        help="Output path for analysis JSON",
    )
    parser.add_argument(
        "--model",
        default=os.getenv("GEMINI_MODEL", "gemini-2.5-flash"),
        help="Gemini model to use",
    )
    parser.add_argument(
        "--keep-upload",
        action="store_true",
        help="Don't delete the uploaded video after analysis",
    )
    args = parser.parse_args()

    # Validate input
    if not Path(args.video).exists():
        print(f"ERROR: Video file not found: {args.video}")
        sys.exit(1)

    # Ensure output directory exists
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)

    # Run analysis
    client = get_client()
    video_file = upload_video(client, args.video)
    analysis = analyze_video(client, video_file, args.model)

    # Add metadata
    result = {
        "source_video": str(Path(args.video).name),
        "model_used": args.model,
        "analysis": analysis,
    }

    # Save output
    with open(args.output, "w") as f:
        json.dump(result, f, indent=2)
    print(f"\nAnalysis saved to: {args.output}")

    # Cleanup
    if not args.keep_upload:
        cleanup_file(client, video_file)


if __name__ == "__main__":
    main()
