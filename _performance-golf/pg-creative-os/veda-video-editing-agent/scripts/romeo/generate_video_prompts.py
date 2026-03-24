"""
Generate high-quality, provider-specific video prompts via Gemini and push to Airtable.

This is Step 3b in the environment expansion workflow. It sits between:
  - Step 3a: Reference frame generation + approval
  - Step 3c: Video generation from approved prompts + approved frames

For each Airtable record with Frame Status = "Approved", the script:
  1. Gathers context (transcript, environment, visual analysis, audience)
  2. Calls Gemini to generate a provider-specific video prompt
  3. Writes the prompt to the correct Airtable column (Kling Prompt / Veo Prompt)
  4. Sets Prompt Status = "Generated" for human review

Usage:
    # Generate prompts for both providers
    python execution/generate_video_prompts.py \
        --brief .tmp/offers/dqfe/womens/expansions/0036/brief.md \
        --expansion-id dqfe-0036 \
        --providers kling veo

    # Generate only Kling prompts
    python execution/generate_video_prompts.py \
        --brief .tmp/offers/dqfe/womens/expansions/0036/brief.md \
        --expansion-id dqfe-0036 \
        --providers kling

    # With visual analysis for richer context
    python execution/generate_video_prompts.py \
        --brief .tmp/offers/dqfe/womens/expansions/0036/brief.md \
        --visual-analysis .tmp/offers/dqfe/womens/expansions/0036/inputs/winning_ad_analysis.json \
        --expansion-id dqfe-0036 \
        --providers kling veo
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path

from dotenv import load_dotenv
from pyairtable import Api

WORKSPACE = Path(__file__).resolve().parent.parent
load_dotenv(WORKSPACE / ".env")

TABLE_NAME = "Environment Expansions"

# --- Provider-specific prompt engineering rules ---

KLING_RULES = """\
You are writing a video generation prompt for Kling O3 (via fal.ai) with native audio.

THINK IN SHOTS, NOT CLIPS. Describe what the camera sees and what the audience hears.

PROMPT STRUCTURE (follow this order):
1. Camera & framing (1 short sentence): shot type, camera motion or static, angle
2. Scene setup (1 sentence): @Element1 in environment, lighting, atmosphere
3. Dialogue with character label and emotional tone:
   [Character A: Lauren, {emotional tone that matches THIS section of the script}]: "{exact transcript chunk}"
4. Ambient/SFX (1 sentence): background sounds, environment texture
5. End with: (no subtitles)

FORMATTING RULES:
- Reference the avatar as @Element1. Example: "@Element1 stands at a driving range..."
- STRICT 600 CHARACTER LIMIT. Count carefully. Kling performs best with focused prompts.
- Use character labeling for dialogue: [Character A: Lauren, warm confident voice]: "dialogue"
- Specify camera explicitly (e.g., "medium close-up, static camera" or "slow push in")
- Describe lighting with one specific detail (e.g., "warm golden-hour sidelight")
- UGC / iPhone selfie / social media aesthetic — NOT cinematic or polished

PACING — CRITICAL:
- NO dead air. Dialogue must start IMMEDIATELY — no "camera settles" or setup beats.
- The character should already be mid-conversation energy from the first frame.
- Speak at an energetic, natural UGC pace (~3.2 words/second). NOT slow or deliberate.
- Do NOT use temporal pacing words like "Pause," "Beat," "Immediately" — these create dead air.
- The delivery should feel like someone excitedly telling a friend a story on their phone.

EMOTIONAL TONE — MUST MATCH THE SCRIPT CONTENT:
- Read the transcript carefully. The tone label MUST reflect the emotion of THAT specific section.
- Example: if she's talking about frustration → "frustrated, venting energy"
- Example: if she's sharing a discovery → "excited, conspiratorial warmth"
- Example: if she's listing problems → "exasperated, building intensity"
- The emotion should be SPECIFIC to the words, not generic "warm confident voice" for everything.

CRITICAL — DO NOT:
- Choreograph specific gestures or body movements (no "she taps her temple", "slight shrug")
- Describe micro-expressions (no "slight frown of concern", "eyes sparkling with enthusiasm")
- Script beat-by-beat physical actions — let the model animate naturally
- Add ANY pre-dialogue setup, camera settling, or establishing beats
- Exceed 600 characters

INSTEAD — DO:
- Direct energy and mood that matches the script content (e.g., "frustrated energy shifting to excited relief")
- Describe the emotional tone of delivery specific to what she's saying
- Let the model decide how the character physically expresses the emotion
- Keep it feeling like a friend talking to you, not an actor hitting marks

OUTPUT FORMAT (JSON):
{
  "video_prompt": "Medium close-up, static camera. @Element1 at a... [Character A: Lauren, {specific emotional tone}]: \\"dialogue\\" ... (no subtitles)",
  "negative_prompt": "blur, distort, low quality, text, watermark, subtitle, caption, male golfer, multiple people"
}"""

VEO_RULES = """\
You are writing a video generation prompt for Google Veo 3.1 with native audio and dialogue.

USE THE 5-PART FORMULA (follow this order):
[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]

PROMPT STRUCTURE:
1. Cinematography (shot type, camera motion, lens): "Medium close-up, static camera, shallow depth of field."
2. Subject (avatar description inline — Veo has no element system): "A woman — [concise description] —"
3. Action + Dialogue (what she does, with quoted speech for native audio):
   "speaking directly to camera with [energy/mood]. She says, \\"[exact transcript chunk]\\""
4. Context (environment + sound design):
   "[environment description]. SFX: [specific sounds]. Ambient noise: [background atmosphere]."
5. Style: "UGC smartphone aesthetic, natural lighting, 9:16 vertical video."

USE TIMESTAMP PROMPTING for pacing control within the clip:
[00:00-00:02] Camera settles on subject in environment...
[00:02-00:08] She speaks to camera: "dialogue..."

FORMATTING RULES:
- Include avatar description inline (Veo has no element reference system)
- Put dialogue in quotation marks — Veo 3.1 generates synchronized speech from quoted text
- Use SFX: prefix for sound effects, Ambient noise: for background sounds
- Use professional cinematography terms for camera (medium close-up, tracking shot, etc.)
- STRICT 800 CHARACTER LIMIT
- UGC / social media video feel — natural, not overproduced
- Always include "9:16 vertical video"

CRITICAL — DO NOT:
- Choreograph specific gestures or body movements beat-by-beat
- Describe micro-expressions ("slight frown", "eyes sparkling", "taps her temple")
- Over-describe the avatar's physical actions — let the model animate naturally
- Exceed 800 characters

INSTEAD — DO:
- Direct energy and mood ("frustrated energy", "brightening relief", "casual confidence")
- Describe emotional tone of voice ("warm conspiratorial tone", "genuine excitement")
- Use timestamp prompting to control pacing within the clip
- Write negative prompts as descriptive exclusions ("a scene with no visible text or overlays")
- Keep the feel of a real person talking to a friend on their phone

OUTPUT FORMAT (JSON):
{
  "video_prompt": "[00:00-00:02] Medium close-up... [00:02-00:08] She says, \\"dialogue\\"... 9:16 vertical video.",
  "negative_prompt": "blur, distort, low quality, text, watermark, subtitle, caption, male golfer"
}"""

AVATAR_DESCRIPTION = (
    "A woman in her late 30s with dirty blonde hair pulled back in a low ponytail. "
    "She has fair skin, defined cheekbones, and a natural athletic build. "
    "She wears a fitted navy blue cap-sleeve athletic top and a black athletic skort. "
    "She has small stud earrings and blue-gray athletic sneakers."
)

SYSTEM_PROMPT_TEMPLATE = """\
You are an expert AI video prompt engineer. Your job is to write a single, \
high-quality video generation prompt for ONE SCENE of a talking-head social media video. \
The avatar delivers part of a hook script in a specific environment.

{provider_rules}

CONTEXT:
- Avatar: {avatar_description}
- Environment: {environment}
- Scene transcript (what she says in THIS scene — verbatim, do NOT change): {transcript}
- Audience: {audience}
- Creative direction for this environment: {creative_direction}
{visual_analysis_section}
{scene_context}

PERFORMANCE DIRECTION — THIS IS CRITICAL:
The avatar must feel like a REAL PERSON excitedly telling a friend a story on their phone.
- DO NOT describe specific facial micro-expressions (frowns, eye movements, brow raises)
- DO NOT choreograph specific gestures (no "taps temple", "waves hand", "shrugs")
- DO NOT script beat-by-beat physical actions for each sentence
- DO NOT add any pre-dialogue setup or "camera settles" beats — start talking IMMEDIATELY
- DO direct overall energy and mood that MATCHES the emotional content of the transcript
- DO describe emotional tone of voice SPECIFIC to what she's saying in this section
- DO let the AI model decide how to physically express the emotions naturally
- The more you micro-manage movements, the more robotic and AI-looking the result will be.

EMOTIONAL TONE MUST MATCH SCRIPT CONTENT:
Read the transcript carefully. The emotional direction must reflect what she's actually saying:
- Talking about a problem/frustration → frustrated, venting, exasperated tone
- Sharing a discovery or tip → excited, conspiratorial, "you gotta hear this" energy
- Listing things that went wrong → building intensity, relatable annoyance
- Revealing a solution → brightening relief, genuine enthusiasm
Do NOT use generic "warm confident voice" — be SPECIFIC to the emotional content of each scene.

CRITICAL CONSTRAINTS:
- The transcript must be delivered VERBATIM — the visual environment is the ONLY variable.
- For women's golf offer: NO male golfers visible. All visible people must be female.
- Avatar must look like the SAME person across all environments (consistency).
- The video should feel like a real person recorded this on their phone — UGC aesthetic.
- Dialogue starts IMMEDIATELY from the first frame. No dead air. No establishing shots.
- Energetic UGC pacing (~3.2 words/second). NOT slow, NOT deliberate. Natural and quick.
- Output ONLY valid JSON, nothing else."""


# --- Provider duration limits (seconds of dialogue per clip) ---

PROVIDER_DIALOGUE_LIMITS = {
    "veo": 6.5,   # Veo max clip = 8s, target ~6.5s of dialogue to leave breathing room
    "kling": 13.0,  # Kling duration = 15s, target ~13s of dialogue to leave breathing room
}

WORDS_PER_SECOND = 3.2  # Energetic UGC speaking pace (faster than conversational)


def split_script_into_scenes(transcript: str, provider: str) -> list:
    """Split a transcript into scenes that fit within a provider's clip duration.

    Uses sentence boundaries to split naturally. Each scene gets enough dialogue
    to fill the target duration without rushing. Merges undersized scenes (<4s)
    with neighbors to avoid generating many tiny clips.

    Returns:
        List of dicts: [{"scene_num": 1, "transcript_chunk": "...", "duration_estimate": 6.4,
                         "total_scenes": N, "emotional_arc": "opening"}, ...]
    """
    dialogue_limit = PROVIDER_DIALOGUE_LIMITS.get(provider, 7.0)
    max_words = int(dialogue_limit * WORDS_PER_SECOND)
    min_words = int(4.0 * WORDS_PER_SECOND)  # Minimum ~4s per scene
    # Hard limit for merging undersized scenes (actual clip duration, not breathing-room target)
    hard_limits = {"veo": 8.0, "kling": 15.0}
    merge_max_words = int(hard_limits.get(provider, 8.0) * WORDS_PER_SECOND)

    # Split into sentences
    sentences = re.split(r'(?<=[.!?])\s+', transcript.strip())
    if not sentences:
        return [{"scene_num": 1, "transcript_chunk": transcript, "duration_estimate": 0,
                 "total_scenes": 1, "emotional_arc": "single scene"}]

    # Check if entire transcript fits in one clip
    total_words = len(transcript.split())
    total_duration = total_words / WORDS_PER_SECOND
    if total_duration <= dialogue_limit:
        return [{"scene_num": 1, "transcript_chunk": transcript,
                 "duration_estimate": total_duration, "total_scenes": 1,
                 "emotional_arc": "single scene"}]

    # Group sentences into scenes
    scenes = []
    current_chunk = []
    current_words = 0

    for sentence in sentences:
        sentence_words = len(sentence.split())

        # If adding this sentence would exceed limit, close current scene
        if current_words + sentence_words > max_words and current_chunk:
            chunk_text = " ".join(current_chunk)
            scenes.append({
                "transcript_chunk": chunk_text,
                "duration_estimate": current_words / WORDS_PER_SECOND,
                "_words": current_words,
            })
            current_chunk = [sentence]
            current_words = sentence_words
        else:
            current_chunk.append(sentence)
            current_words += sentence_words

    # Don't forget the last chunk
    if current_chunk:
        chunk_text = " ".join(current_chunk)
        scenes.append({
            "transcript_chunk": chunk_text,
            "duration_estimate": current_words / WORDS_PER_SECOND,
            "_words": current_words,
        })

    # Merge undersized scenes with neighbors (allow up to hard clip limit)
    merged = []
    for scene in scenes:
        if merged and merged[-1]["_words"] + scene["_words"] <= merge_max_words:
            # Merge with previous if either is undersized and combined fits hard limit
            if merged[-1]["_words"] < min_words or scene["_words"] < min_words:
                combined_words = merged[-1]["_words"] + scene["_words"]
                merged[-1]["transcript_chunk"] += " " + scene["transcript_chunk"]
                merged[-1]["duration_estimate"] = combined_words / WORDS_PER_SECOND
                merged[-1]["_words"] = combined_words
                continue
        merged.append(scene)

    # If last scene is too short, merge it back
    if len(merged) > 1 and merged[-1]["_words"] < min_words:
        last = merged.pop()
        combined_words = merged[-1]["_words"] + last["_words"]
        merged[-1]["transcript_chunk"] += " " + last["transcript_chunk"]
        merged[-1]["duration_estimate"] = combined_words / WORDS_PER_SECOND
        merged[-1]["_words"] = combined_words

    scenes = merged
    # Clean up internal field
    for s in scenes:
        s.pop("_words", None)

    # Assign scene numbers, totals, and emotional arc positions
    total = len(scenes)
    for i, scene in enumerate(scenes):
        scene["scene_num"] = i + 1
        scene["total_scenes"] = total
        # Simple arc labeling
        if total == 1:
            scene["emotional_arc"] = "single scene"
        elif i == 0:
            scene["emotional_arc"] = "opening — establish energy and hook the viewer"
        elif i == total - 1:
            scene["emotional_arc"] = "closing — deliver the payoff, leave viewer wanting more"
        else:
            scene["emotional_arc"] = f"building — scene {i + 1} of {total}, escalate tension or shift energy"

    return scenes


def get_table():
    """Get the Airtable table instance."""
    token = os.getenv("AIRTABLE_TOKEN")
    base_id = os.getenv("AIRTABLE_BASE_ID")
    if not token or not base_id:
        print("ERROR: AIRTABLE_TOKEN and AIRTABLE_BASE_ID must be set in .env")
        sys.exit(1)
    api = Api(token)
    return api.table(base_id, TABLE_NAME)


def parse_brief_context(brief_path: str):
    """Extract transcripts, environments, audience, and creative direction from brief."""
    with open(brief_path, "r") as f:
        content = f.read()

    # Extract audience
    audience_match = re.search(r"## Target Audience\n\n(.+?)(?:\n\n)", content, re.DOTALL)
    audience = audience_match.group(1).strip() if audience_match else "Women golfers, intermediate/amateur."

    # Extract hook transcripts
    transcripts = {}
    transcript_pattern = r"### Hook Transcript (\d+): (.+?)\n\n```\n(.*?)```"
    for match in re.finditer(transcript_pattern, content, re.DOTALL):
        label = match.group(2).strip()
        text = match.group(3).strip()
        transcripts[label] = text

    # Extract environment creative direction
    env_directions = {}
    env_sections = re.split(r"### Environment \d+: ", content)[1:]
    for section in env_sections:
        lines = section.split("\n")
        env_name = lines[0].strip()

        desc_match = re.search(r"\*\*Description:\*\* (.+)", section)
        visual_match = re.search(r"\*\*Visual notes:\*\* (.+)", section)
        broll_match = re.search(r"\*\*B-roll suggestions:\*\* (.+)", section)

        env_directions[env_name.lower()] = {
            "description": desc_match.group(1) if desc_match else env_name,
            "visual_notes": visual_match.group(1) if visual_match else "",
            "broll_suggestions": broll_match.group(1) if broll_match else "",
        }

    return {
        "audience": audience,
        "transcripts": transcripts,
        "env_directions": env_directions,
    }


def load_visual_analysis(path: str) -> str:
    """Load visual analysis JSON and format as context string."""
    if not path or not Path(path).exists():
        return ""
    with open(path, "r") as f:
        data = json.load(f)
    analysis = data.get("analysis", data)
    # Summarize key fields for the prompt
    parts = []
    if "avatar_placement" in analysis:
        ap = analysis["avatar_placement"]
        parts.append(f"Avatar position: {ap.get('position', 'N/A')}, size: {ap.get('size_ratio', 'N/A')}")
    if "visual_pacing" in analysis:
        vp = analysis["visual_pacing"]
        parts.append(f"Pacing: {vp.get('avg_cut_duration', 'N/A')} avg cut, {vp.get('rhythm_pattern', 'N/A')}")
    if "broll_integration" in analysis:
        br = analysis["broll_integration"]
        parts.append(f"B-roll: {br.get('pattern', 'N/A')}")
    if "text_overlays" in analysis:
        to = analysis["text_overlays"]
        parts.append(f"Text overlays: {to.get('style', 'N/A')} at {to.get('position', 'N/A')}")
    return "; ".join(parts) if parts else json.dumps(analysis, indent=2)[:500]


def generate_prompt_via_gemini(
    provider: str,
    environment: str,
    transcript: str,
    audience: str,
    creative_direction: dict,
    visual_analysis_str: str,
    scene_info: dict = None,
) -> dict:
    """Call Gemini to generate a provider-specific video prompt.

    Args:
        scene_info: Optional dict with scene_num, total_scenes, emotional_arc,
                    duration_estimate for multi-scene scripts.
    """
    from google import genai
    from google.genai import types

    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GOOGLE_API_KEY not set in .env")

    client = genai.Client(api_key=api_key)
    model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

    # Select provider rules
    provider_rules = KLING_RULES if provider == "kling" else VEO_RULES

    # Build creative direction string
    cd_str = (
        f"Description: {creative_direction.get('description', environment)}. "
        f"Visual notes: {creative_direction.get('visual_notes', '')}. "
        f"B-roll: {creative_direction.get('broll_suggestions', '')}."
    )

    # Build visual analysis section
    va_section = ""
    if visual_analysis_str:
        va_section = f"- Visual blueprint from winning ad: {visual_analysis_str}"

    # Build scene context section
    scene_ctx = ""
    if scene_info and scene_info.get("total_scenes", 1) > 1:
        prev_transcript = scene_info.get("prev_transcript", "")
        next_transcript = scene_info.get("next_transcript", "")
        continuity_notes = ""
        if scene_info["scene_num"] == 1:
            continuity_notes = (
                f"- This is the OPENING scene. Start with hook energy — grab attention instantly.\n"
                f"- The next scene continues with: \"{next_transcript[:60]}...\"\n"
                f"- End this scene's energy so it flows naturally INTO the next section."
            )
        elif scene_info["scene_num"] == scene_info["total_scenes"]:
            continuity_notes = (
                f"- This is the FINAL scene. The previous scene ended with: \"{prev_transcript[-60:]}...\"\n"
                f"- MATCH the energy and cadence from the previous scene — no jarring shift.\n"
                f"- Deliver the payoff/cliffhanger that leaves the viewer wanting more."
            )
        else:
            continuity_notes = (
                f"- Previous scene ended with: \"{prev_transcript[-60:]}...\"\n"
                f"- Next scene continues with: \"{next_transcript[:60]}...\"\n"
                f"- MATCH the energy and cadence from the previous scene — smooth transition.\n"
                f"- The emotional shift should feel natural, not abrupt."
            )

        scene_ctx = (
            f"\nSCENE CONTEXT:\n"
            f"- This is scene {scene_info['scene_num']} of {scene_info['total_scenes']}\n"
            f"- Target duration: ~{scene_info['duration_estimate']:.1f}s of dialogue\n"
            f"- Emotional arc position: {scene_info['emotional_arc']}\n"
            f"\nSCENE CONTINUITY — CRITICAL:\n"
            f"{continuity_notes}\n"
            f"- The avatar MUST maintain the SAME position, framing, and environment across all scenes\n"
            f"- Pacing: energetic UGC pace (~3.2 words/second). Quick, natural, NOT slow or deliberate.\n"
            f"- Dialogue starts IMMEDIATELY — no pause, no setup, no dead air at the start."
        )

    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(
        provider_rules=provider_rules,
        avatar_description=AVATAR_DESCRIPTION,
        environment=environment,
        transcript=transcript,
        audience=audience,
        creative_direction=cd_str,
        visual_analysis_section=va_section,
        scene_context=scene_ctx,
    )

    response = client.models.generate_content(
        model=model,
        contents=system_prompt,
        config=types.GenerateContentConfig(
            temperature=0.7,
            response_mime_type="application/json",
        ),
    )

    # Parse JSON response
    text = response.text.strip()
    # Strip markdown code fences if present
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)

    try:
        result = json.loads(text)
    except json.JSONDecodeError:
        print(f"    WARNING: Could not parse JSON, using raw text")
        result = {"video_prompt": text, "negative_prompt": ""}

    return result


def main():
    parser = argparse.ArgumentParser(
        description="Generate provider-specific video prompts and push to Airtable"
    )
    parser.add_argument("--brief", required=True, help="Path to expansion brief.md")
    parser.add_argument("--visual-analysis", default=None, help="Path to winning_ad_analysis.json")
    parser.add_argument("--expansion-id", required=True, help="Expansion identifier (e.g., dqfe-0036)")
    parser.add_argument(
        "--providers",
        nargs="+",
        choices=["kling", "veo"],
        required=True,
        help="Which providers to generate prompts for",
    )
    parser.add_argument(
        "--only-approved-frames",
        action="store_true",
        default=True,
        help="Only generate prompts for records with Frame Status = Approved (default: True)",
    )
    parser.add_argument("--dry-run", action="store_true", help="Print prompts without writing to Airtable")
    args = parser.parse_args()

    # Parse brief for context
    if not Path(args.brief).exists():
        print(f"ERROR: Brief not found: {args.brief}")
        sys.exit(1)

    brief_ctx = parse_brief_context(args.brief)
    visual_analysis_str = load_visual_analysis(args.visual_analysis)

    # Fetch Airtable records
    table = get_table()
    if args.only_approved_frames:
        formula = f"AND({{Expansion ID}} = '{args.expansion_id}', {{Frame Status}} = 'Approved')"
    else:
        formula = f"{{Expansion ID}} = '{args.expansion_id}'"

    records = table.all(formula=formula)
    if not records:
        status_note = " with Frame Status = 'Approved'" if args.only_approved_frames else ""
        print(f"No records found for '{args.expansion_id}'{status_note}.")
        print("Approve reference frames in Airtable first, then re-run.")
        sys.exit(1)

    print(f"Found {len(records)} record(s) to generate prompts for")
    print(f"Providers: {', '.join(args.providers)}")
    print(f"Using Gemini model: {os.getenv('GEMINI_MODEL', 'gemini-2.5-flash')}")
    print()

    # Generate prompts (with scene chunking for long scripts)
    total_generated = 0
    scene_records_created = 0
    for i, record in enumerate(records, 1):
        fields = record["fields"]
        record_id = record["id"]
        environment = fields.get("Environment", "unknown").lower()
        hook_label = fields.get("Hook Label", "")
        asset_id = fields.get("Asset ID", "")

        # Find matching transcript
        transcript = ""
        for label, text in brief_ctx["transcripts"].items():
            if label.lower() == hook_label.lower() or hook_label.lower() in label.lower():
                transcript = text
                break
        if not transcript:
            # Fallback: use first transcript
            transcript = list(brief_ctx["transcripts"].values())[0] if brief_ctx["transcripts"] else ""

        creative_direction = brief_ctx["env_directions"].get(environment, {"description": environment})

        print(f"[{i}/{len(records)}] {asset_id} | {environment} | {hook_label}")

        # Split script into scenes per provider
        # Use the most restrictive provider to determine scene count for consistency
        representative_provider = "veo" if "veo" in args.providers else args.providers[0]
        scenes = split_script_into_scenes(transcript, representative_provider)
        total_words = len(transcript.split())
        total_duration = total_words / WORDS_PER_SECOND

        if len(scenes) > 1:
            print(f"  Script: {total_words} words, ~{total_duration:.1f}s → split into {len(scenes)} scenes")
        else:
            print(f"  Script: {total_words} words, ~{total_duration:.1f}s → single scene")

        for scene in scenes:
            scene_num = scene["scene_num"]
            scene_transcript = scene["transcript_chunk"]

            # Add prev/next transcript for scene continuity
            if len(scenes) > 1:
                prev_idx = scene_num - 2  # 0-indexed
                next_idx = scene_num      # 0-indexed
                scene["prev_transcript"] = scenes[prev_idx]["transcript_chunk"] if prev_idx >= 0 else ""
                scene["next_transcript"] = scenes[next_idx]["transcript_chunk"] if next_idx < len(scenes) else ""

            if len(scenes) > 1:
                print(f"\n  --- Scene {scene_num}/{scene['total_scenes']} "
                      f"(~{scene['duration_estimate']:.1f}s) ---")
                print(f"  Transcript: {scene_transcript[:80]}...")

            # For multi-scene: create child records in Airtable
            if len(scenes) > 1:
                scene_asset_id = f"{asset_id}--s{scene_num}"
                # Copy parent fields for the scene record
                scene_fields = {
                    "Asset ID": scene_asset_id,
                    "Expansion ID": args.expansion_id,
                    "Environment": fields.get("Environment", ""),
                    "Hook Label": hook_label,
                    "Ad Set": fields.get("Ad Set", 0),
                    "Scene Number": scene_num,
                    "Total Scenes": scene["total_scenes"],
                    "Parent Asset ID": asset_id,
                    "Scene Transcript": scene_transcript,
                    "Frame Status": "Approved",  # Inherit parent frame approval
                }
                # Copy reference frame from parent (Airtable requires url-only for new attachments)
                if fields.get("Reference Frame"):
                    scene_fields["Reference Frame"] = [
                        {"url": att["url"]} for att in fields["Reference Frame"]
                        if att.get("url")
                    ]
            else:
                scene_fields = {}
                scene_asset_id = asset_id

            update_fields = {}
            for provider in args.providers:
                print(f"  Generating {provider} prompt for {scene_asset_id}...")

                result = generate_prompt_via_gemini(
                    provider=provider,
                    environment=environment,
                    transcript=scene_transcript,
                    audience=brief_ctx["audience"],
                    creative_direction=creative_direction,
                    visual_analysis_str=visual_analysis_str,
                    scene_info=scene if len(scenes) > 1 else None,
                )

                video_prompt = result.get("video_prompt", "")
                negative_prompt = result.get("negative_prompt", "")

                # Map to correct Airtable column
                if provider == "kling":
                    update_fields["Kling Prompt"] = video_prompt
                elif provider == "veo":
                    update_fields["Veo Prompt"] = video_prompt

                # Negative prompt is shared — use the last one generated
                if negative_prompt:
                    update_fields["Negative Prompt"] = negative_prompt

                print(f"    Prompt ({len(video_prompt)} chars): {video_prompt[:100]}...")

            update_fields["Prompt Status"] = "Generated"

            if args.dry_run:
                if len(scenes) > 1:
                    print(f"  [DRY RUN] Would create scene record: {scene_asset_id}")
                print(f"  [DRY RUN] Would update: {list(update_fields.keys())}")
            else:
                if len(scenes) > 1:
                    # Create a new scene record in Airtable
                    scene_fields.update(update_fields)
                    table.create(scene_fields)
                    scene_records_created += 1
                    print(f"  Created scene record: {scene_asset_id}")
                else:
                    # Single scene — update the existing record directly
                    table.update(record_id, update_fields)
                    print(f"  Updated Airtable: {list(update_fields.keys())}")

        # For multi-scene: update parent record to note it was split
        if len(scenes) > 1 and not args.dry_run:
            parent_update = {"Total Scenes": len(scenes)}
            try:
                parent_update["Prompt Status"] = "Split into Scenes"
                table.update(record_id, parent_update)
            except Exception:
                # "Split into Scenes" may not exist as a select option — fall back
                parent_update["Prompt Status"] = "Generated"
                table.update(record_id, parent_update)
                print(f"  Note: Set parent Prompt Status to 'Generated' (add 'Split into Scenes' option to Airtable manually)")

        total_generated += 1
        print()

    print("=" * 60)
    print(f"PROMPT GENERATION COMPLETE")
    print(f"  Records processed: {total_generated}")
    if scene_records_created:
        print(f"  Scene records created: {scene_records_created}")
    print(f"  Providers: {', '.join(args.providers)}")
    print(f"  Prompt Status: Generated")
    print()
    print("Next step: Review prompts in Airtable, then set Prompt Status = 'Approved'")
    print("After approval, run generate_avatar_video.py --mode video to generate videos.")


if __name__ == "__main__":
    main()
