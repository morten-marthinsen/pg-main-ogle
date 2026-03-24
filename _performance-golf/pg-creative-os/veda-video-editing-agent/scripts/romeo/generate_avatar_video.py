"""
Generate AI avatar reference frames and videos across different environments.

Supports two modes:
  --mode image  (Step 3a) Generate still reference frames for review
  --mode video  (Step 3c) Generate videos from approved prompts + approved frames

Provider-aware — each provider writes to its own Airtable columns:
  Kling → Kling Video + Kling Video Status
  Veo   → Veo Video + Veo Video Status

Supports Veo 3.1 via Google AI Studio and Kling O3 via fal.ai.

Usage:
    # Generate reference frames from a brief (Step 3a)
    python execution/generate_avatar_video.py \
        --brief .tmp/offers/dqfe/womens/expansions/0036/brief.md \
        --avatar-image .tmp/avatars/female-blue-shirt/reference.png \
        --mode image \
        --output-dir .tmp/offers/dqfe/womens/expansions/0036/outputs/

    # Generate videos from approved prompts (Step 3c — Kling)
    python execution/generate_avatar_video.py \
        --avatar-image .tmp/avatars/female-blue-shirt/reference.png \
        --mode video \
        --expansion-id dqfe-0036 \
        --provider kling \
        --output-dir .tmp/offers/dqfe/womens/expansions/0036/outputs/

    # Generate videos from approved prompts (Step 3c — Veo)
    python execution/generate_avatar_video.py \
        --avatar-image .tmp/avatars/female-blue-shirt/reference.png \
        --mode video \
        --expansion-id dqfe-0036 \
        --provider veo \
        --output-dir .tmp/offers/dqfe/womens/expansions/0036/outputs/

    # Single image test
    python execution/generate_avatar_video.py \
        --avatar-image .tmp/avatars/female-blue-shirt/reference.png \
        --mode image \
        --image-prompt "A woman in a blue shirt at a driving range, facing camera. 9:16." \
        --environment "driving range" \
        --output-dir .tmp/offers/dqfe/womens/expansions/0036/outputs/

    # Single video from a reference frame
    python execution/generate_avatar_video.py \
        --avatar-image .tmp/avatars/female-blue-shirt/reference.png \
        --mode video \
        --reference-frame .tmp/.../v0017--golf_simulator.png \
        --script "Ladies, have you seen it?" \
        --environment "golf simulator" \
        --output-dir .tmp/offers/dqfe/womens/expansions/0036/outputs/
"""

import argparse
import json
import os
import re
import sys
import time
from abc import ABC, abstractmethod
from pathlib import Path

from dotenv import load_dotenv

WORKSPACE = Path(__file__).resolve().parent.parent
load_dotenv(WORKSPACE / ".env")


# --- Provider Abstraction ---

class VideoProvider(ABC):
    """Base class for video generation providers."""

    @abstractmethod
    def generate(
        self,
        reference_image: str,
        script: str,
        environment: str,
        aspect_ratio: str = "9:16",
        output_path: str = None,
        video_prompt: str = None,
        negative_prompt: str = None,
    ) -> str:
        """
        Generate a video of an avatar delivering a script in an environment.

        Args:
            reference_image: Path to the avatar reference image or approved frame.
            script: The dialogue/narration text.
            environment: Description of the visual environment.
            aspect_ratio: Target aspect ratio (default 9:16 for FB vertical).
            output_path: Where to save the output video.
            video_prompt: Pre-approved provider-specific prompt (overrides _build_prompt).
            negative_prompt: Things to exclude from generation.

        Returns:
            Path to the generated video file.
        """
        pass

    def generate_image(
        self,
        reference_image: str,
        image_prompt: str,
        aspect_ratio: str = "9:16",
        output_path: str = None,
    ) -> str:
        """
        Generate a still reference frame for review before video generation.

        Args:
            reference_image: Path to the avatar reference image.
            image_prompt: Prompt describing the composition and environment.
            aspect_ratio: Target aspect ratio (default 9:16).
            output_path: Where to save the output image.

        Returns:
            Path to the generated image file.
        """
        raise NotImplementedError(
            f"{self.__class__.__name__} does not support image generation. "
            "Use a provider that supports --mode image."
        )


class VeoProvider(VideoProvider):
    """Google Veo 2 (video) + Nano Banana 2 (image-to-image) via AI Studio API."""

    # Nano Banana 2: Gemini with native image generation, supports reference images
    IMAGE_MODEL = os.getenv("IMAGE_MODEL", "gemini-3.1-flash-image-preview")

    def __init__(self):
        from google import genai
        from google.genai import types

        self.genai = genai
        self.types = types

        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GOOGLE_API_KEY not set in .env")

        self.client = genai.Client(api_key=api_key)
        self.model = os.getenv("VEO_MODEL", "veo-2.0-generate-001")

    def generate_image(
        self,
        reference_image: str,
        image_prompt: str,
        aspect_ratio: str = "9:16",
        output_path: str = None,
    ) -> str:
        """Generate a reference frame using Nano Banana 2 (image-to-image with reference)."""
        import PIL.Image

        print(f"  Generating reference frame with {self.IMAGE_MODEL}...")
        print(f"  Reference: {Path(reference_image).name}")
        print(f"  Prompt: {image_prompt[:120]}...")

        # Load reference image for character consistency
        ref_img = PIL.Image.open(reference_image)

        response = self.client.models.generate_content(
            model=self.IMAGE_MODEL,
            contents=[
                ref_img,
                image_prompt,
            ],
            config=self.types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            ),
        )

        # Extract generated image from response
        for part in response.candidates[0].content.parts:
            if part.inline_data and part.inline_data.mime_type.startswith("image/"):
                img_data = part.inline_data.data

                if output_path is None:
                    output_path = str(WORKSPACE / ".tmp" / "reference_frame.png")

                Path(output_path).parent.mkdir(parents=True, exist_ok=True)
                with open(output_path, "wb") as f:
                    f.write(img_data)
                print(f"  Saved: {output_path}")
                return output_path

        print("  ERROR: No image generated in response")
        return None

    # Detailed avatar description for prompt consistency (Lauren)
    AVATAR_DESCRIPTION = (
        "A woman in her late 30s with dirty blonde hair pulled back in a low ponytail. "
        "She has fair skin, defined cheekbones, and a natural athletic build. "
        "She wears a fitted navy blue cap-sleeve athletic top and a black athletic skort. "
        "She has small stud earrings and blue-gray athletic sneakers."
    )

    def _build_image_prompt(self, environment: str) -> str:
        """Build the prompt for reference frame generation (image-to-image with Nano Banana)."""
        return (
            f"Using this character reference sheet as the exact person to depict, "
            f"generate a new photorealistic image of this same woman in a {environment} setting. "
            f"She should be facing the camera with a confident, approachable expression "
            f"as if recording a social media video. Framed from the chest up (talking head style). "
            f"The {environment} environment is clearly visible behind her. "
            f"She wears the same navy blue athletic top from the reference. "
            f"Natural lighting, high quality, realistic photography. "
            f"9:16 vertical aspect ratio for mobile viewing. "
            f"No text, no captions, no overlays, no watermarks, no subtitles."
        )

    def _build_prompt(self, script: str, environment: str) -> str:
        """Build the Veo video generation prompt."""
        return (
            f"A woman — {self.AVATAR_DESCRIPTION} — speaking directly to camera in a "
            f"{environment} setting. She is delivering a confident, natural "
            f"monologue as if recording a social media video. "
            f"The environment is clearly visible behind her. "
            f"Natural lighting, high quality, realistic. "
            f"9:16 vertical video format for mobile viewing. "
            f"Casual but professional delivery style, making eye contact "
            f"with the camera. The visual environment is a {environment}. "
            f"No text, no captions, no overlays, no watermarks."
        )

    def generate(
        self,
        reference_image: str,
        script: str,
        environment: str,
        aspect_ratio: str = "9:16",
        output_path: str = None,
        video_prompt: str = None,
        negative_prompt: str = None,
    ) -> str:
        image = self.types.Image.from_file(location=reference_image)
        prompt = video_prompt if video_prompt else self._build_prompt(script, environment)

        print(f"  Generating with {self.model}...")
        print(f"  Environment: {environment}")
        print(f"  Prompt: {prompt[:120]}...")

        operation = self.client.models.generate_videos(
            model=self.model,
            prompt=prompt,
            image=image,
            config=self.types.GenerateVideosConfig(
                person_generation="allow_adult",
                aspect_ratio=aspect_ratio,
                number_of_videos=1,
            ),
        )

        # Poll until done
        elapsed = 0
        while not operation.done:
            time.sleep(20)
            elapsed += 20
            print(f"  Generating... ({elapsed}s)")
            operation = self.client.operations.get(operation)

        if not operation.response or not operation.response.generated_videos:
            print("  ERROR: No video generated")
            return None

        # Save the video
        video = operation.response.generated_videos[0]
        self.client.files.download(file=video.video)

        if output_path is None:
            output_path = str(WORKSPACE / ".tmp" / "generated_hooks" / "output.mp4")

        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        video.video.save(output_path)
        print(f"  Saved: {output_path}")
        return output_path


class HedraProvider(VideoProvider):
    """Hedra/HigsField provider (placeholder for future implementation)."""

    def generate(self, reference_image, script, environment, aspect_ratio="9:16", output_path=None):
        raise NotImplementedError(
            "Hedra provider not yet implemented. "
            "Set VIDEO_PROVIDER=veo in .env or implement this provider."
        )


class KlingProvider(VideoProvider):
    """Kling O3 Standard via fal.ai — reference-to-video with character element system."""

    MODEL_ID = "fal-ai/kling-video/o3/standard/reference-to-video"

    def __init__(self):
        import fal_client

        self.fal_client = fal_client
        fal_key = os.getenv("FAL_KEY")
        if not fal_key:
            raise ValueError("FAL_KEY not set in .env")
        # fal_client reads FAL_KEY from env automatically
        self.duration = os.getenv("KLING_DURATION", "15")
        self.voice_id = os.getenv("KLING_VOICE_ID")

    _upload_cache = {}  # class-level cache for uploaded file URLs

    def _upload_file(self, local_path: str, max_retries: int = 3, timeout: int = 30) -> str:
        """Upload a local file to fal storage and return the CDN URL.
        Caches results to avoid redundant uploads. Times out after `timeout` seconds per attempt."""
        import concurrent.futures
        # If already a URL, return directly
        if local_path.startswith("http://") or local_path.startswith("https://"):
            return local_path
        # Check cache
        if local_path in self._upload_cache:
            print(f"  Using cached URL for {Path(local_path).name}")
            return self._upload_cache[local_path]
        print(f"  Uploading {Path(local_path).name} to fal storage...")
        for attempt in range(max_retries):
            try:
                with concurrent.futures.ThreadPoolExecutor() as executor:
                    future = executor.submit(self.fal_client.upload_file, local_path)
                    url = future.result(timeout=timeout)
                self._upload_cache[local_path] = url
                return url
            except concurrent.futures.TimeoutError:
                print(f"  Storage upload timed out (attempt {attempt + 1}/{max_retries})")
                if attempt >= max_retries - 1:
                    raise RuntimeError(f"fal storage upload timed out after {max_retries} attempts")
            except Exception as e:
                if attempt < max_retries - 1 and ("503" in str(e) or "502" in str(e) or "500" in str(e)):
                    wait = 5 * (attempt + 1)
                    print(f"  Storage upload failed (attempt {attempt + 1}), retrying in {wait}s...")
                    time.sleep(wait)
                else:
                    raise

    def _build_prompt(self, script: str, environment: str) -> str:
        """Fallback prompt with @Element1 syntax and Kling 3.0 dialogue format."""
        prompt = (
            f"Medium close-up, static camera. @Element1 at a {environment}, "
            f"speaking directly to camera like recording a casual social media video. "
            f"Natural daylight, relaxed energy. "
            f"[Character A: Lauren, warm confident voice]: \"{script[:300]}\" "
            f"9:16 vertical video. (no subtitles)"
        )
        if self.voice_id:
            prompt = prompt.replace("[Character A:", "<<<voice_1>>> [Character A:")
        return prompt

    def generate(
        self,
        reference_image: str,
        script: str,
        environment: str,
        aspect_ratio: str = "9:16",
        output_path: str = None,
        video_prompt: str = None,
        negative_prompt: str = None,
        avatar_image: str = None,
        duration: str = None,
    ) -> str:
        """Generate video using Kling O3 reference-to-video via fal.ai.

        Args:
            reference_image: Starting frame image (approved reference frame from Airtable).
            avatar_image: Original avatar reference sheet for character identity in elements.
                          If None, falls back to reference_image for both.
            duration: Clip duration in seconds (str). Kling O3 supports "3"-"15".
                      If None, uses self.duration (from KLING_DURATION env var).
        """
        import urllib.request

        clip_duration = duration or self.duration

        # Upload reference frame as the starting image
        start_url = self._upload_file(reference_image)

        # Upload avatar sheet for character consistency (elements)
        # Falls back to start_url (reference frame) if upload fails or not provided
        avatar_url = start_url
        if avatar_image and avatar_image != reference_image:
            try:
                avatar_url = self._upload_file(avatar_image)
            except Exception as e:
                print(f"  Avatar upload failed ({e}), using reference frame for elements")
                avatar_url = start_url

        # Build prompt — use pre-approved prompt if provided
        prompt = video_prompt if video_prompt else self._build_prompt(script, environment)

        print(f"  Generating with Kling O3 Standard...")
        print(f"  Environment: {environment}")
        print(f"  Duration: {clip_duration}s")
        print(f"  Prompt: {prompt[:120]}...")

        # Build the request input
        input_data = {
            "prompt": prompt,
            "start_image_url": start_url,
            "elements": [
                {
                    "frontal_image_url": avatar_url,
                    "reference_image_urls": [avatar_url],
                }
            ],
            "duration": clip_duration,
            "aspect_ratio": aspect_ratio,
            "negative_prompt": negative_prompt or "blur, distort, low quality, text, watermark, subtitle, caption, male golfer",
            "generate_audio": True,
        }

        # Add custom voice if configured (native audio works without this)
        if self.voice_id:
            input_data["voice_ids"] = [self.voice_id]

        # Submit and wait for result
        result = self.fal_client.subscribe(
            self.MODEL_ID,
            arguments=input_data,
            with_logs=True,
            on_queue_update=lambda update: (
                print(f"  Queue: {update.status}") if hasattr(update, "status") else None
            ),
        )

        # Download the video
        video_url = result["video"]["url"]
        if output_path is None:
            output_path = str(WORKSPACE / ".tmp" / "generated_hooks" / "output.mp4")

        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        print(f"  Downloading video...")
        urllib.request.urlretrieve(video_url, output_path)
        print(f"  Saved: {output_path}")

        file_size_mb = Path(output_path).stat().st_size / (1024 * 1024)
        print(f"  Size: {file_size_mb:.1f} MB")
        return output_path

    def generate_image(self, reference_image, image_prompt, aspect_ratio="9:16", output_path=None):
        raise NotImplementedError(
            "Kling O3 is video-only. Reference frames are always generated via "
            "Gemini (VeoProvider) regardless of video provider. Use --mode image "
            "with VIDEO_PROVIDER=veo."
        )


PROVIDERS = {
    "veo": VeoProvider,
    "hedra": HedraProvider,
    "kling": KlingProvider,
}


def get_provider(name: str = None) -> VideoProvider:
    """Get the configured video generation provider."""
    if name is None:
        name = os.getenv("VIDEO_PROVIDER", "veo")

    name = name.lower().strip()
    if name not in PROVIDERS:
        print(f"ERROR: Unknown provider '{name}'. Available: {list(PROVIDERS.keys())}")
        sys.exit(1)

    return PROVIDERS[name]()


# --- Brief Parsing ---

def parse_brief_for_generation(brief_path: str):
    """
    Parse an expansion brief to extract generation jobs.

    Returns a list of dicts, each containing:
        - ad_set: int
        - hook_label: str
        - transcript: str
        - environment: str
        - asset_id: str
        - image_prompt: str (for Step 3a)
        - video_prompt: str (for Step 3b)
    """
    with open(brief_path, "r") as f:
        content = f.read()

    jobs = []

    # Extract hook transcripts
    transcripts = {}
    transcript_pattern = r"### Hook Transcript (\d+): (.+?)\n\n```\n(.*?)```"
    for match in re.finditer(transcript_pattern, content, re.DOTALL):
        num = int(match.group(1))
        label = match.group(2).strip()
        text = match.group(3).strip()
        transcripts[num] = {"label": label, "text": text}

    # Extract environments
    environments = []
    env_pattern = r"### Environment (\d+): (.+?)\n"
    for match in re.finditer(env_pattern, content):
        environments.append(match.group(2).strip().lower())

    # Extract image and video prompts per environment
    image_prompts = {}
    video_prompts = {}
    # Match the dual prompt blocks added by generate_expansion_brief.py
    prompt_section_pattern = r"#### Prompts — (.+?)\n\n\*\*Image Prompt\*\*.*?\n> (.+?)\n\n\*\*Video Prompt\*\*.*?\n> (.+?)(?:\n\n|\Z)"
    for match in re.finditer(prompt_section_pattern, content, re.DOTALL):
        env_name = match.group(1).strip().lower()
        image_prompts[env_name] = match.group(2).strip()
        video_prompts[env_name] = match.group(3).strip()

    # Extract asset IDs from tables
    asset_id_pattern = r"\| (\d+) \| (.+?) \| `(.+?)` \|"
    current_ad_set = 0
    ad_set_pattern = r"### Ad Set (\d+)"

    lines = content.split("\n")
    for line in lines:
        ad_set_match = re.search(ad_set_pattern, line)
        if ad_set_match:
            current_ad_set = int(ad_set_match.group(1))

        asset_match = re.search(asset_id_pattern, line)
        if asset_match and current_ad_set > 0:
            env_name = asset_match.group(2).strip().lower()
            asset_id = asset_match.group(3).strip()

            transcript_data = transcripts.get(current_ad_set, {})

            jobs.append({
                "ad_set": current_ad_set,
                "hook_label": transcript_data.get("label", f"Hook {current_ad_set}"),
                "transcript": transcript_data.get("text", ""),
                "environment": env_name,
                "asset_id": asset_id,
                "image_prompt": image_prompts.get(env_name, ""),
                "video_prompt": video_prompts.get(env_name, ""),
            })

    return jobs


# --- Main ---

def sanitize_filename(name: str) -> str:
    """Make a string safe for use as a filename."""
    return re.sub(r"[^\w\-.]", "_", name.lower().strip())


def load_jobs_from_airtable(expansion_id: str, provider_name: str):
    """Load video generation jobs from Airtable approved prompts.

    Returns jobs list with video_prompt_approved and negative_prompt fields
    populated from the correct provider column.
    """
    from pyairtable import Api

    token = os.getenv("AIRTABLE_TOKEN")
    base_id = os.getenv("AIRTABLE_BASE_ID")
    if not token or not base_id:
        print("ERROR: AIRTABLE_TOKEN and AIRTABLE_BASE_ID must be set in .env")
        sys.exit(1)

    api = Api(token)
    table = api.table(base_id, "Environment Expansions")

    # Exclude records that already have a video generated/approved for this provider
    video_status_col = "Kling Video Status" if provider_name == "kling" else "Veo Video Status"
    formula = (
        f"AND({{Expansion ID}} = '{expansion_id}', {{Prompt Status}} = 'Approved', "
        f"{{{video_status_col}}} != 'Approved', {{{video_status_col}}} != 'Generated')"
    )
    records = table.all(formula=formula)

    if not records:
        print(f"No records with Prompt Status = 'Approved' for '{expansion_id}'.")
        print("Approve prompts in Airtable first, then re-run.")
        sys.exit(1)

    # Map provider to column name
    prompt_col = "Kling Prompt" if provider_name == "kling" else "Veo Prompt"

    jobs = []
    for r in records:
        f = r["fields"]
        prompt_text = f.get(prompt_col, "")
        if not prompt_text:
            print(f"  WARNING: {f.get('Asset ID', '?')} has no {prompt_col} — skipping")
            continue

        # Extract reference frame URL if available
        ref_frames = f.get("Reference Frame", [])
        ref_frame_url = ref_frames[0]["url"] if ref_frames else None

        # Scene-aware fields (populated by generate_video_prompts.py for chunked scripts)
        scene_num = f.get("Scene Number")
        total_scenes = f.get("Total Scenes")
        parent_asset_id = f.get("Parent Asset ID")

        # Calculate dynamic duration from scene transcript word count
        scene_transcript = f.get("Scene Transcript", "")
        if scene_transcript:
            word_count = len(scene_transcript.split())
            # ~3.2 wps + 1.5s breathing room, clamped to Kling's 5-10s range
            estimated_duration = (word_count / 3.2) + 1.5
            clip_duration = str(max(5, min(10, round(estimated_duration))))
        else:
            clip_duration = None  # Fall back to default

        jobs.append({
            "ad_set": f.get("Ad Set", 0),
            "hook_label": f.get("Hook Label", ""),
            "transcript": "",  # Not needed — prompt already contains the direction
            "environment": f.get("Environment", "").lower(),
            "asset_id": f.get("Asset ID", ""),
            "image_prompt": "",
            "video_prompt": "",
            "video_prompt_approved": prompt_text,
            "negative_prompt": f.get("Negative Prompt", ""),
            "record_id": r["id"],
            "reference_frame_url": ref_frame_url,
            "scene_num": scene_num,
            "total_scenes": total_scenes,
            "parent_asset_id": parent_asset_id,
            "clip_duration": clip_duration,
        })

    # Sort scene records by scene number for ordered generation
    jobs.sort(key=lambda j: (j.get("parent_asset_id") or j["asset_id"], j.get("scene_num") or 0))

    return jobs


def estimate_cost(jobs, mode: str, provider_name: str) -> float:
    """Estimate generation cost and display it."""
    if mode == "image":
        if provider_name == "veo":
            # Imagen 3 via AI Studio — free tier or ~$0.04/image
            cost_per = 0.04
            label = "Imagen 3"
        else:
            cost_per = 0.10
            label = provider_name
        total = len(jobs) * cost_per
        print(f"\n--- COST ESTIMATE ({label}) ---")
        print(f"  {len(jobs)} reference frames x ${cost_per:.2f} = ${total:.2f}")
    else:
        if provider_name == "veo":
            cost_per = 8 * 0.35  # 8 seconds * $0.35/sec
            label = "Veo 3.1"
        elif provider_name == "kling":
            duration = int(os.getenv("KLING_DURATION", "15"))
            rate = 0.224  # Native audio always enabled
            cost_per = duration * rate
            label = "Kling O3 Standard"
        else:
            cost_per = 2.80
            label = provider_name
        total = len(jobs) * cost_per
        print(f"\n--- COST ESTIMATE ({label}) ---")
        print(f"  {len(jobs)} videos x ~${cost_per:.2f} = ~${total:.2f}")

    return total


def main():
    parser = argparse.ArgumentParser(
        description="Generate AI avatar reference frames and videos across environments"
    )

    # Mode: image (Step 3a) or video (Step 3b)
    parser.add_argument(
        "--mode",
        choices=["image", "video"],
        default="video",
        help="Generation mode: 'image' for reference frames (Step 3a), 'video' for animation (Step 3b)",
    )

    # Input modes: brief-based (batch) or single
    parser.add_argument(
        "--brief", default=None, help="Path to expansion_brief.md for batch generation"
    )
    parser.add_argument(
        "--avatar-image", required=True, help="Path to avatar reference image"
    )
    parser.add_argument(
        "--script", default=None, help="Script text (for single video mode)"
    )
    parser.add_argument(
        "--image-prompt", default=None, help="Image prompt (for single image mode or revision)"
    )
    parser.add_argument(
        "--environment", default=None, help="Environment name (for single mode)"
    )
    parser.add_argument(
        "--reference-frame", default=None, help="Path to approved reference frame (for single video revision)"
    )
    parser.add_argument(
        "--provider",
        default=None,
        help="Provider (veo, hedra, kling, fal). Defaults to VIDEO_PROVIDER in .env",
    )
    parser.add_argument(
        "--expansion-id",
        default=None,
        help="Expansion ID for Airtable-based prompt loading (e.g., dqfe-0036). "
             "When set, video mode reads approved prompts from Airtable instead of the brief.",
    )
    parser.add_argument(
        "--output-dir",
        default=str(WORKSPACE / ".tmp" / "generated_hooks"),
        help="Output directory for generated assets",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be generated without calling the API",
    )
    parser.add_argument(
        "--yes",
        action="store_true",
        help="Skip cost confirmation prompt (for automation)",
    )
    args = parser.parse_args()

    # Validate avatar image
    if not Path(args.avatar_image).exists():
        print(f"ERROR: Avatar image not found: {args.avatar_image}")
        sys.exit(1)

    # Resolve provider name early (needed for Airtable column selection)
    provider_name = args.provider or os.getenv("VIDEO_PROVIDER", "veo")

    # Determine generation jobs
    if args.mode == "video" and args.expansion_id:
        # Airtable-based mode: load approved prompts
        jobs = load_jobs_from_airtable(args.expansion_id, provider_name)
        if not jobs:
            print("ERROR: No jobs loaded from Airtable.")
            sys.exit(1)
        print(f"Found {len(jobs)} approved prompts from Airtable for {provider_name}")
    elif args.brief:
        # Batch mode from brief
        if not Path(args.brief).exists():
            print(f"ERROR: Brief not found: {args.brief}")
            sys.exit(1)
        jobs = parse_brief_for_generation(args.brief)
        if not jobs:
            print("ERROR: No generation jobs found in brief. Check brief format.")
            sys.exit(1)
        print(f"Found {len(jobs)} assets to generate from brief")
    elif args.mode == "image" and args.image_prompt and args.environment:
        # Single image mode
        jobs = [{
            "ad_set": 1,
            "hook_label": "single_test",
            "transcript": "",
            "environment": args.environment,
            "asset_id": "test_frame",
            "image_prompt": args.image_prompt,
            "video_prompt": "",
        }]
    elif args.mode == "video" and args.script and args.environment:
        # Single video mode
        jobs = [{
            "ad_set": 1,
            "hook_label": "single_test",
            "transcript": args.script,
            "environment": args.environment,
            "asset_id": "test_output",
            "image_prompt": "",
            "video_prompt": "",
        }]
    else:
        if args.mode == "image":
            print("ERROR: Provide --brief for batch, or --image-prompt and --environment for single")
        else:
            print("ERROR: Provide --brief for batch, or --script and --environment for single")
        sys.exit(1)

    # Cost estimate and confirmation gate
    total_cost = estimate_cost(jobs, args.mode, provider_name)

    if args.dry_run:
        print("\n--- DRY RUN ---")
        for job in jobs:
            print(f"  Ad Set {job['ad_set']} | {job['environment']} | {job['asset_id']}")
            if args.mode == "image":
                print(f"    Image prompt: {job.get('image_prompt', 'N/A')[:80]}...")
            else:
                print(f"    Script: {job['transcript'][:80]}...")
        print(f"\nTotal: {len(jobs)} {'frames' if args.mode == 'image' else 'videos'}")
        print(f"Estimated cost: ~${total_cost:.2f}")
        return

    if not args.yes:
        print(f"\nProceed with generation? (y/n): ", end="", flush=True)
        confirm = input().strip().lower()
        if confirm not in ("y", "yes"):
            print("Cancelled.")
            return

    # Initialize provider
    provider = get_provider(args.provider)
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Generate assets
    results = []
    for i, job in enumerate(jobs, 1):
        print(f"\n[{i}/{len(jobs)}] Ad Set {job['ad_set']} — {job['environment']}")

        if args.mode == "image":
            # Step 3a: Generate reference frame
            filename = f"{job['asset_id']}.png"
            output_path = str(output_dir / filename)
            prompt = job.get("image_prompt", "")
            if not prompt:
                prompt = provider._build_image_prompt(job["environment"])

            try:
                result_path = provider.generate_image(
                    reference_image=args.avatar_image,
                    image_prompt=prompt,
                    aspect_ratio="9:16",
                    output_path=output_path,
                )
                results.append({
                    "job": job,
                    "output": result_path,
                    "status": "success",
                    "mode": "image",
                })
            except Exception as e:
                print(f"  ERROR: {e}")
                results.append({
                    "job": job,
                    "output": None,
                    "status": "error",
                    "error": str(e),
                    "mode": "image",
                })
        else:
            # Step 3c: Generate video (from approved reference frame)
            filename = f"{job['asset_id']}--{provider_name}.mp4"
            output_path = str(output_dir / filename)

            # Priority: per-job reference frame from Airtable > CLI flag > avatar image
            ref_frame_url = job.get("reference_frame_url")
            if ref_frame_url:
                # Pass Airtable URL directly to provider (avoids fal storage round-trip)
                # Provider's _upload_file will detect the URL and pass through
                ref_image = ref_frame_url
            else:
                ref_image = args.reference_frame or args.avatar_image

            try:
                # Pass avatar_image and dynamic duration for providers that support them
                extra_kwargs = {}
                if hasattr(provider, 'generate') and 'avatar_image' in provider.generate.__code__.co_varnames:
                    extra_kwargs["avatar_image"] = args.avatar_image
                if hasattr(provider, 'generate') and 'duration' in provider.generate.__code__.co_varnames:
                    clip_dur = job.get("clip_duration")
                    if clip_dur:
                        extra_kwargs["duration"] = clip_dur

                result_path = provider.generate(
                    reference_image=ref_image,
                    script=job["transcript"],
                    environment=job["environment"],
                    aspect_ratio="9:16",
                    output_path=output_path,
                    video_prompt=job.get("video_prompt_approved"),
                    negative_prompt=job.get("negative_prompt"),
                    **extra_kwargs,
                )
                # Compute actual cost
                if provider_name == "kling":
                    dur = int(os.getenv("KLING_DURATION", "15"))
                    job_cost = dur * 0.224  # Native audio always enabled
                elif provider_name == "veo":
                    job_cost = 8 * 0.35
                else:
                    job_cost = 2.80
                results.append({
                    "job": job,
                    "output": result_path,
                    "status": "success",
                    "mode": "video",
                    "cost": job_cost,
                })
            except Exception as e:
                print(f"  ERROR: {e}")
                results.append({
                    "job": job,
                    "output": None,
                    "status": "error",
                    "error": str(e),
                    "mode": "video",
                })

    # Summary
    print("\n" + "=" * 60)
    print(f"GENERATION SUMMARY ({args.mode.upper()} MODE)")
    print("=" * 60)
    success = sum(1 for r in results if r["status"] == "success")
    failed = sum(1 for r in results if r["status"] == "error")
    actual_cost = sum(r.get("cost", 0) for r in results if r["status"] == "success")
    print(f"  Success: {success}/{len(results)}")
    if failed:
        print(f"  Failed:  {failed}/{len(results)}")
        for r in results:
            if r["status"] == "error":
                print(f"    - {r['job']['asset_id']}: {r['error']}")
    if actual_cost > 0:
        print(f"  Total cost: ~${actual_cost:.2f}")

    # Save results manifest
    manifest_path = output_dir / "generation_manifest.json"
    with open(manifest_path, "w") as f:
        json.dump(results, f, indent=2, default=str)
    print(f"\nManifest saved: {manifest_path}")


if __name__ == "__main__":
    main()
