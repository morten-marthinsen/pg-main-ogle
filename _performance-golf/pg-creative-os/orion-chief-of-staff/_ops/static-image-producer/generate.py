"""
Fal.ai Flux Pro image generation client.

Usage:
    from generate import generate_image
    path = generate_image("a senior golfer on a fairway", 1080, 1350, "output.nosync/")
"""

import os
import time
from typing import Optional

import requests
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

FAL_ENDPOINT = "https://queue.fal.run/fal-ai/flux-pro"
POLL_INTERVAL = 5  # seconds
MAX_POLLS = 120


def generate_image(
    prompt: str,
    width: int,
    height: int,
    output_dir: str,
    negative_prompt: str = "",
    seed: Optional[int] = None,
) -> str:
    """Generate an image via Fal.ai Flux Pro. Returns path to downloaded PNG."""
    api_key = os.getenv("FAL_KEY")
    if not api_key:
        raise RuntimeError("FAL_KEY not set in environment or .env file")

    os.makedirs(output_dir, exist_ok=True)

    # Build request body
    body = {
        "prompt": prompt,
        "image_size": {"width": width, "height": height},
        "num_images": 1,
    }
    if negative_prompt:
        body["negative_prompt"] = negative_prompt
    if seed is not None:
        body["seed"] = seed

    headers = {
        "Authorization": f"Key {api_key}",
        "Content-Type": "application/json",
    }

    # Submit to queue
    submit_res = requests.post(FAL_ENDPOINT, json=body, headers=headers)
    if not submit_res.ok:
        raise RuntimeError(f"FAL submit failed ({submit_res.status_code}): {submit_res.text}")

    submit_data = submit_res.json()
    request_id = submit_data["request_id"]
    status_url = submit_data["status_url"]
    response_url = submit_data["response_url"]

    print(f"  Submitted to Fal.ai (request: {request_id})")
    print(f"  Generating {width}x{height} image...")

    # Poll for completion
    for i in range(MAX_POLLS):
        time.sleep(POLL_INTERVAL)

        status_res = requests.get(status_url, headers={"Authorization": f"Key {api_key}"})
        status = status_res.json().get("status", "UNKNOWN")

        if status == "COMPLETED":
            # Fetch result
            result_res = requests.get(response_url, headers={"Authorization": f"Key {api_key}"})
            result = result_res.json()

            # Get image URL from result
            image_url = None
            if "images" in result and result["images"]:
                image_url = result["images"][0].get("url")
            elif "image" in result:
                image_url = result["image"].get("url")

            if not image_url:
                raise RuntimeError(f"FAL result missing image URL: {result}")

            # Download image
            output_path = os.path.join(output_dir, f"fal-{request_id}.png")
            img_res = requests.get(image_url)
            img_res.raise_for_status()
            with open(output_path, "wb") as f:
                f.write(img_res.content)

            print(f"  Downloaded: {output_path} ({len(img_res.content) / 1024:.0f} KB)")
            return output_path

        if status == "FAILED" or status == "ERROR":
            raise RuntimeError(f"FAL generation failed for request {request_id}")

        if i % 6 == 5:
            print(f"  Still generating... ({(i + 1) * POLL_INTERVAL}s elapsed)")

    raise RuntimeError(f"FAL generation timed out after {MAX_POLLS * POLL_INTERVAL}s")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate an image via Fal.ai Flux Pro")
    parser.add_argument("--prompt", required=True, help="Image generation prompt")
    parser.add_argument("--width", type=int, default=1080, help="Image width")
    parser.add_argument("--height", type=int, default=1350, help="Image height")
    parser.add_argument("--output", default="output.nosync", help="Output directory")
    parser.add_argument("--seed", type=int, default=None, help="Random seed for reproducibility")
    args = parser.parse_args()

    path = generate_image(args.prompt, args.width, args.height, args.output, seed=args.seed)
    print(f"Generated: {path}")
