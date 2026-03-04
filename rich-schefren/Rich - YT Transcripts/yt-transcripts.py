#!/usr/bin/env python3
"""
YouTube Transcript Downloader
=============================
Download transcripts from entire YouTube channels.
Uses YouTube captions first, Deepgram API as fallback for videos without captions.

Usage:
    yt-transcripts --channel CHANNEL_NAME
    yt-transcripts --channel CHANNEL_NAME --deepgram
"""

import subprocess
import json
import sys
import os
import argparse
from datetime import datetime
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

# Add common user paths for finding installed tools
user_bin = Path.home() / "bin"
user_python_bins = [
    Path.home() / "Library" / "Python" / "3.9" / "bin",
    Path.home() / "Library" / "Python" / "3.10" / "bin",
    Path.home() / "Library" / "Python" / "3.11" / "bin",
    Path.home() / "Library" / "Python" / "3.12" / "bin",
    Path.home() / ".local" / "bin",
]
extra_paths = ":".join(str(p) for p in [user_bin] + user_python_bins if p.exists())
os.environ["PATH"] = f"{extra_paths}:" + os.environ.get("PATH", "")

# Import youtube-transcript-api
try:
    from youtube_transcript_api import YouTubeTranscriptApi
    YT_TRANSCRIPT_API = True
    yt_api = YouTubeTranscriptApi()
except ImportError:
    YT_TRANSCRIPT_API = False
    yt_api = None
    print("ERROR: youtube-transcript-api not installed.")
    print("Run: pip3 install --user youtube-transcript-api")
    print("Or run the installer: bash install.sh")
    sys.exit(1)

# Import scrapetube
try:
    import scrapetube
    SCRAPETUBE_AVAILABLE = True
except ImportError:
    SCRAPETUBE_AVAILABLE = False
    print("ERROR: scrapetube not installed.")
    print("Run: pip3 install --user scrapetube")
    print("Or run the installer: bash install.sh")
    sys.exit(1)

# Deepgram setup - reads from environment variable
DEEPGRAM_API_KEY = os.environ.get("DEEPGRAM_API_KEY", "")
DEEPGRAM_AVAILABLE = False
deepgram_client = None

if DEEPGRAM_API_KEY:
    try:
        from deepgram import DeepgramClient
        DEEPGRAM_AVAILABLE = True
    except ImportError:
        pass

# Configuration
DEFAULT_THREADS = 10
DEFAULT_OUTPUT_DIR = Path.home() / "Documents" / "youtube_transcripts"


def find_ytdlp():
    """Locate yt-dlp executable."""
    search_paths = [
        Path.home() / "Library" / "Python" / "3.9" / "bin" / "yt-dlp",
        Path.home() / "Library" / "Python" / "3.10" / "bin" / "yt-dlp",
        Path.home() / "Library" / "Python" / "3.11" / "bin" / "yt-dlp",
        Path.home() / "Library" / "Python" / "3.12" / "bin" / "yt-dlp",
        Path.home() / ".local" / "bin" / "yt-dlp",
        Path("/usr/local/bin/yt-dlp"),
        Path("/opt/homebrew/bin/yt-dlp"),
    ]
    for p in search_paths:
        if p.exists():
            return str(p)
    result = subprocess.run(["which", "yt-dlp"], capture_output=True, text=True)
    if result.returncode == 0:
        return result.stdout.strip()
    return "yt-dlp"


YT_DLP = find_ytdlp()

# Thread-safe progress tracking
progress_lock = threading.Lock()
progress = {"done": 0, "success": 0, "total": 0, "deepgram": 0}


def init_deepgram():
    """Initialize Deepgram client."""
    global deepgram_client
    if deepgram_client is None and DEEPGRAM_AVAILABLE:
        try:
            from deepgram import DeepgramClient
            deepgram_client = DeepgramClient()
            print("   Deepgram client initialized!")
        except Exception as e:
            print(f"   ERROR initializing Deepgram: {e}")
    return deepgram_client


def get_transcript_api(video_id):
    """Get transcript using YouTube's built-in captions."""
    if not YT_TRANSCRIPT_API or yt_api is None:
        return None

    try:
        # Try preferred languages first
        for lang in ["en", "en-US", "pt", "pt-BR", "es"]:
            try:
                transcript = yt_api.fetch(video_id, languages=[lang])
                return " ".join(entry.text for entry in transcript)
            except Exception:
                continue

        # Fallback: any available transcript
        try:
            transcript = yt_api.fetch(video_id)
            return " ".join(entry.text for entry in transcript)
        except Exception:
            pass

    except Exception:
        return None

    return None


def download_audio(video_id, temp_dir):
    """Download audio from YouTube video."""
    output_file = temp_dir / f"{video_id}.mp4"

    try:
        # Use Android client to bypass YouTube restrictions - no proxies needed!
        cmd = [
            YT_DLP,
            "--extractor-args", "youtube:player_client=android",
            "--force-ipv4",
            "-f", "18",  # 360p mp4 with audio - small and fast
            "--no-warnings",
            "-o", str(output_file),
            f"https://www.youtube.com/watch?v={video_id}",
        ]

        subprocess.run(cmd, capture_output=True, text=True, timeout=300)

        if not output_file.exists():
            possible = list(temp_dir.glob(f"{video_id}.*"))
            if possible:
                output_file = possible[0]
            else:
                return None

        return output_file
    except Exception:
        return None


def transcribe_with_deepgram(video_id, temp_dir):
    """Transcribe video using Deepgram API."""
    if deepgram_client is None:
        return None

    audio_file = download_audio(video_id, temp_dir)
    if audio_file is None:
        return None

    try:
        with open(audio_file, "rb") as f:
            buffer_data = f.read()

        response = deepgram_client.listen.v1.media.transcribe_file(
            request=buffer_data,
            model="nova-2",
            smart_format=True,
            language="en",
        )
        transcript = response.results.channels[0].alternatives[0].transcript

        # Cleanup temp file
        try:
            audio_file.unlink()
        except:
            pass

        if len(transcript) > 20:
            return transcript

    except Exception:
        try:
            if audio_file and audio_file.exists():
                audio_file.unlink()
        except:
            pass

    return None


def download_transcript(video_data, temp_dir, use_deepgram=False):
    """Download transcript for a single video."""
    video_id = video_data["video_id"]
    transcript = get_transcript_api(video_id)
    source = "youtube" if transcript else "none"

    # Try Deepgram fallback
    if transcript is None and use_deepgram:
        transcript = transcribe_with_deepgram(video_id, temp_dir)
        if transcript:
            source = "deepgram"

    with progress_lock:
        progress["done"] += 1
        if transcript:
            progress["success"] += 1
            if source == "deepgram":
                progress["deepgram"] += 1

        if progress["done"] % 10 == 0 or progress["done"] == progress["total"]:
            pct = (progress["done"] / progress["total"]) * 100
            extra_info = f" (Deepgram: {progress['deepgram']})" if use_deepgram else ""
            print(
                f"   [{progress['done']:04d}/{progress['total']}] "
                f"{pct:.0f}% - {progress['success']} transcripts{extra_info}"
            )
            sys.stdout.flush()

    video_data["transcript"] = transcript if transcript else "[Transcript not available]"
    video_data["source"] = source
    return video_data


def get_channel_videos(channel_name, limit=None):
    """Get list of videos from a YouTube channel."""
    if not SCRAPETUBE_AVAILABLE:
        print("ERROR: scrapetube is not installed.")
        print("Run: pip3 install --user scrapetube")
        sys.exit(1)

    print(f"Fetching videos from channel @{channel_name}...")

    try:
        videos = list(scrapetube.get_channel(channel_username=channel_name))
    except Exception as e:
        print(f"ERROR: Could not fetch channel. Error: {e}")
        print("Make sure you're using the channel username (from the URL), not the display name.")
        sys.exit(1)

    print(f"Total videos found: {len(videos)}")

    video_list = []
    for v in videos:
        video_list.append({
            "video_id": v.get("videoId"),
            "title": v.get("title", {}).get("runs", [{}])[0].get("text", "Untitled"),
            "published": v.get("publishedTimeText", {}).get("simpleText", ""),
            "url": f"https://www.youtube.com/watch?v={v.get('videoId')}",
        })

        if limit and len(video_list) >= limit:
            break

    return video_list


def save_results(results, output_dir, output_name):
    """Save results to Markdown and JSON files."""
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    success_count = sum(1 for r in results if r["transcript"] != "[Transcript not available]")
    deepgram_count = sum(1 for r in results if r.get("source") == "deepgram")
    youtube_count = sum(1 for r in results if r.get("source") == "youtube")

    # Save JSON
    json_file = output_dir / f"{output_name}.json"
    with open(json_file, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    # Save Markdown
    md_file = output_dir / f"{output_name}.md"
    with open(md_file, "w", encoding="utf-8") as f:
        f.write(f"# YouTube Transcripts - {output_name}\n\n")
        f.write(f"**Extraction date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"**Total videos:** {len(results)}\n")
        f.write(f"**Transcripts retrieved:** {success_count} (YouTube: {youtube_count}, Deepgram: {deepgram_count})\n\n")
        f.write("---\n\n")

        for item in results:
            badge = ""
            if item.get("source") == "deepgram":
                badge = " [Deepgram]"
            elif item.get("source") == "youtube":
                badge = " [YouTube]"

            f.write(f"## {item['title']}{badge}\n\n")
            f.write(f"- **URL:** {item['url']}\n")
            f.write(f"- **Published:** {item.get('published', 'N/A')}\n\n")
            f.write("### Transcript\n\n")
            f.write(item["transcript"])
            f.write("\n\n---\n\n")

    return md_file, json_file, success_count, deepgram_count


def main():
    parser = argparse.ArgumentParser(
        description="Download transcripts from YouTube channels"
    )

    parser.add_argument(
        "--channel", "-c",
        required=True,
        help="YouTube channel name (without @)",
    )
    parser.add_argument(
        "--output", "-o",
        default=str(DEFAULT_OUTPUT_DIR),
        help=f"Output directory (default: {DEFAULT_OUTPUT_DIR})",
    )
    parser.add_argument(
        "--threads", "-t",
        type=int,
        default=DEFAULT_THREADS,
        help=f"Number of parallel threads (default: {DEFAULT_THREADS})",
    )
    parser.add_argument(
        "--limit", "-l",
        type=int,
        help="Limit number of videos to process",
    )
    parser.add_argument(
        "--name", "-n",
        help="Output file name (without extension)",
    )
    parser.add_argument(
        "--deepgram", "-d",
        action="store_true",
        help="Use Deepgram as fallback for videos without captions",
    )

    args = parser.parse_args()

    print("=" * 70)
    print("YOUTUBE TRANSCRIPT DOWNLOADER")
    print("=" * 70)
    print(f"Start time: {datetime.now().strftime('%H:%M:%S')}")
    print(f"Channel: @{args.channel}")
    print(f"Threads: {args.threads}")
    print(f"Deepgram fallback: {'Yes' if args.deepgram else 'No'}")
    sys.stdout.flush()

    # Check Deepgram setup if requested
    if args.deepgram:
        if not DEEPGRAM_API_KEY:
            print("")
            print("=" * 70)
            print("ERROR: DEEPGRAM_API_KEY not set!")
            print("=" * 70)
            print("")
            print("To use Deepgram for videos without captions:")
            print("")
            print("1. Get a free API key at: https://deepgram.com")
            print("2. Add it to your shell:")
            print('   echo \'export DEEPGRAM_API_KEY="your-key-here"\' >> ~/.zshrc')
            print("   source ~/.zshrc")
            print("")
            print("Or run without --deepgram to only get videos with existing captions.")
            print("=" * 70)
            sys.exit(1)

        if not DEEPGRAM_AVAILABLE:
            print("")
            print("WARNING: deepgram-sdk not installed.")
            print("Run: pip3 install --user deepgram-sdk")
            print("Continuing without Deepgram fallback...")
            print("")
            args.deepgram = False
        else:
            init_deepgram()

    # Get channel videos
    videos = get_channel_videos(args.channel, args.limit)
    output_name = args.name or f"{args.channel}_transcripts"

    if not videos:
        print("No videos found!")
        sys.exit(1)

    print(f"\nVideos to process: {len(videos)}")
    sys.stdout.flush()

    # Reset progress
    progress["total"] = len(videos)
    progress["done"] = 0
    progress["success"] = 0
    progress["deepgram"] = 0

    # Create temp directory
    temp_dir = Path(args.output) / ".temp_audio"
    temp_dir.mkdir(parents=True, exist_ok=True)

    # Limit threads when using Deepgram (API rate limits)
    effective_threads = min(args.threads, 5) if args.deepgram else args.threads

    print("\nDownloading transcripts...")
    if args.deepgram:
        print(f"   (Using {effective_threads} threads with Deepgram)")
    print("   (Progress updates every 10 videos)\n")
    sys.stdout.flush()

    results = []

    with ThreadPoolExecutor(max_workers=effective_threads) as executor:
        futures = {
            executor.submit(download_transcript, v, temp_dir, args.deepgram): v
            for v in videos
        }

        for future in as_completed(futures):
            try:
                results.append(future.result())
            except Exception:
                video_data = futures[future]
                video_data["transcript"] = "[Transcript not available]"
                video_data["source"] = "none"
                results.append(video_data)

    # Cleanup temp files
    try:
        for f in temp_dir.glob("*"):
            f.unlink()
        temp_dir.rmdir()
    except Exception:
        pass

    # Save results
    print("\nSaving files...")
    md_file, json_file, success_count, deepgram_count = save_results(
        results, args.output, output_name
    )

    # Final report
    print("\n" + "=" * 70)
    print(f"DONE! - {datetime.now().strftime('%H:%M:%S')}")
    print(f"Transcripts: {success_count}/{len(results)} ({(success_count / len(results) * 100):.0f}%)")
    youtube_count = success_count - deepgram_count
    if args.deepgram:
        print(f"  - Via YouTube captions: {youtube_count}")
        print(f"  - Via Deepgram: {deepgram_count}")
    print("\nGenerated files:")
    print(f"  - {md_file}")
    print(f"  - {json_file}")
    print("=" * 70)


if __name__ == "__main__":
    main()
