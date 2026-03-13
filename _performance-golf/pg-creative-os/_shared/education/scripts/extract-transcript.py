#!/usr/bin/env python3
"""
extract-transcript.py — YouTube Transcript + Metadata Extractor

Extracts transcript and metadata from a YouTube video URL.
Primary: youtube-transcript-api | Fallback: yt-dlp subtitle download

Usage:
    python3 extract-transcript.py "https://www.youtube.com/watch?v=VIDEO_ID"
    python3 extract-transcript.py VIDEO_ID

Output: JSON to stdout
    {
        "metadata": { "title", "channel", "duration", "publish_date", "view_count", "url" },
        "transcript": "full text...",
        "transcript_type": "manual|auto-generated|none",
        "word_count": 1234,
        "error": null
    }
"""

import json
import logging
import os
import re
import subprocess
import sys
import tempfile

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s", stream=sys.stderr)
log = logging.getLogger(__name__)

# yt-dlp may not be on PATH; check user bin first
YT_DLP_PATHS = [
    os.path.expanduser("~/Library/Python/3.9/bin/yt-dlp"),
    "/usr/local/bin/yt-dlp",
    "yt-dlp",
]


def find_yt_dlp():
    for path in YT_DLP_PATHS:
        try:
            subprocess.run([path, "--version"], capture_output=True, check=True)
            return path
        except (FileNotFoundError, subprocess.CalledProcessError):
            continue
    return None


def parse_video_id(url_or_id):
    """Extract YouTube video ID from various URL formats or bare ID."""
    if re.match(r'^[A-Za-z0-9_-]{11}$', url_or_id):
        return url_or_id

    patterns = [
        r'(?:youtube\.com/watch\?.*v=)([A-Za-z0-9_-]{11})',
        r'(?:youtu\.be/)([A-Za-z0-9_-]{11})',
        r'(?:youtube\.com/embed/)([A-Za-z0-9_-]{11})',
        r'(?:youtube\.com/v/)([A-Za-z0-9_-]{11})',
        r'(?:youtube\.com/shorts/)([A-Za-z0-9_-]{11})',
    ]
    for pattern in patterns:
        match = re.search(pattern, url_or_id)
        if match:
            return match.group(1)

    return None


def fetch_metadata(video_id, yt_dlp_path):
    """Fetch video metadata via yt-dlp JSON dump."""
    if not yt_dlp_path:
        log.warning("yt-dlp not found — metadata will be incomplete")
        return {
            "title": "UNKNOWN",
            "channel": "UNKNOWN",
            "duration": 0,
            "duration_human": "UNKNOWN",
            "publish_date": "UNKNOWN",
            "view_count": 0,
            "url": f"https://www.youtube.com/watch?v={video_id}",
            "description": "",
        }

    url = f"https://www.youtube.com/watch?v={video_id}"
    try:
        result = subprocess.run(
            [yt_dlp_path, "-j", "--no-download", url],
            capture_output=True, text=True, timeout=30,
        )
        if result.returncode != 0:
            log.warning(f"yt-dlp metadata fetch failed: {result.stderr[:200]}")
            return fetch_metadata(video_id, None)  # fallback to unknown

        data = json.loads(result.stdout)
        duration = data.get("duration", 0) or 0
        hours, remainder = divmod(duration, 3600)
        minutes, seconds = divmod(remainder, 60)
        if hours:
            duration_human = f"{hours}h {minutes}m"
        else:
            duration_human = f"{minutes}m {seconds}s"

        raw_date = data.get("upload_date", "")
        if raw_date and len(raw_date) == 8:
            publish_date = f"{raw_date[:4]}-{raw_date[4:6]}-{raw_date[6:8]}"
        else:
            publish_date = raw_date or "UNKNOWN"

        return {
            "title": data.get("title", "UNKNOWN"),
            "channel": data.get("channel", data.get("uploader", "UNKNOWN")),
            "duration": duration,
            "duration_human": duration_human,
            "publish_date": publish_date,
            "view_count": data.get("view_count", 0),
            "url": data.get("webpage_url", url),
            "description": (data.get("description", "") or "")[:500],
        }
    except subprocess.TimeoutExpired:
        log.warning("yt-dlp metadata fetch timed out")
        return fetch_metadata(video_id, None)
    except (json.JSONDecodeError, KeyError) as e:
        log.warning(f"yt-dlp metadata parse error: {e}")
        return fetch_metadata(video_id, None)


def extract_transcript_primary(video_id):
    """Primary extraction via youtube-transcript-api."""
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        from youtube_transcript_api.formatters import TextFormatter

        ytt_api = YouTubeTranscriptApi()

        # Try manual English first, then auto-generated
        transcript = ytt_api.fetch(video_id, languages=["en"])
        formatter = TextFormatter()
        text = formatter.format_transcript(transcript)

        # Detect if manual or auto-generated
        transcript_list = ytt_api.list(video_id)
        transcript_type = "manual"
        for t in transcript_list:
            if t.language_code == "en" and t.is_generated:
                transcript_type = "auto-generated"
                break

        return text, transcript_type

    except ImportError:
        log.error("youtube-transcript-api not installed")
        return None, None
    except Exception as e:
        log.warning(f"Primary transcript extraction failed: {e}")
        return None, None


def extract_transcript_fallback(video_id, yt_dlp_path):
    """Fallback extraction via yt-dlp subtitle download."""
    if not yt_dlp_path:
        return None, None

    url = f"https://www.youtube.com/watch?v={video_id}"
    with tempfile.TemporaryDirectory() as tmpdir:
        output_template = os.path.join(tmpdir, "transcript")
        try:
            # Try auto-generated subs
            subprocess.run(
                [
                    yt_dlp_path,
                    "--write-auto-sub", "--write-sub",
                    "--sub-lang", "en",
                    "--sub-format", "vtt",
                    "--skip-download",
                    "-o", output_template,
                    url,
                ],
                capture_output=True, text=True, timeout=30,
            )

            # Find the VTT file
            vtt_file = None
            for f in os.listdir(tmpdir):
                if f.endswith(".vtt"):
                    vtt_file = os.path.join(tmpdir, f)
                    break

            if not vtt_file:
                return None, None

            with open(vtt_file, "r") as fh:
                vtt_content = fh.read()

            # Parse VTT: strip headers, timestamps, and formatting
            lines = []
            seen = set()
            for line in vtt_content.split("\n"):
                line = line.strip()
                if not line:
                    continue
                if line.startswith("WEBVTT") or line.startswith("Kind:") or line.startswith("Language:"):
                    continue
                if re.match(r'^\d{2}:\d{2}', line):
                    continue
                if re.match(r'^\d+$', line):
                    continue
                # Remove VTT tags
                clean = re.sub(r'<[^>]+>', '', line)
                clean = clean.strip()
                if clean and clean not in seen:
                    seen.add(clean)
                    lines.append(clean)

            text = " ".join(lines)
            return text, "auto-generated"

        except subprocess.TimeoutExpired:
            log.warning("yt-dlp subtitle download timed out")
            return None, None
        except Exception as e:
            log.warning(f"Fallback transcript extraction failed: {e}")
            return None, None


def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: extract-transcript.py <youtube-url-or-id>"}))
        sys.exit(1)

    input_arg = sys.argv[1]
    video_id = parse_video_id(input_arg)

    if not video_id:
        print(json.dumps({"error": f"Could not parse video ID from: {input_arg}"}))
        sys.exit(1)

    log.info(f"Video ID: {video_id}")

    yt_dlp_path = find_yt_dlp()
    if yt_dlp_path:
        log.info(f"yt-dlp found at: {yt_dlp_path}")
    else:
        log.warning("yt-dlp not found — metadata and fallback will be limited")

    # Fetch metadata
    log.info("Fetching metadata...")
    metadata = fetch_metadata(video_id, yt_dlp_path)
    metadata["video_id"] = video_id

    # Extract transcript (primary)
    log.info("Extracting transcript (primary: youtube-transcript-api)...")
    transcript, transcript_type = extract_transcript_primary(video_id)

    # Fallback if primary failed
    if not transcript:
        log.info("Primary failed — trying fallback (yt-dlp)...")
        transcript, transcript_type = extract_transcript_fallback(video_id, yt_dlp_path)

    if not transcript:
        transcript = ""
        transcript_type = "none"
        log.warning("No transcript available from either method")

    word_count = len(transcript.split()) if transcript else 0
    if 0 < word_count < 100:
        log.warning(f"Transcript is unusually short ({word_count} words) — may be incomplete")

    output = {
        "metadata": metadata,
        "transcript": transcript,
        "transcript_type": transcript_type,
        "word_count": word_count,
        "error": None if transcript else "No transcript available",
    }

    print(json.dumps(output, ensure_ascii=False))


if __name__ == "__main__":
    main()
