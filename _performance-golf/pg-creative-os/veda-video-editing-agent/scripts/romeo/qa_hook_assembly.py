#!/usr/bin/env python3
"""
Automated QA for Hook Stack Assembly

Verifies assembled hook+body videos BEFORE manual review by checking:
1. First word — hook opens with expected dialogue (not clipped)
2. Last hook word — hook's final word is complete (not cut mid-syllable)
3. Body start — body's expected opening phrase follows the hook
4. First frame — visual check (no B-roll bleed from before hook start)
5. Join frame — visual check at hook→body splice point

Usage:
    python execution/qa_hook_assembly.py \
        --outputs-dir .tmp/hook_stacks/<stack>/outputs/ \
        --expected-hooks '{"v0006": {"first_word": "I", "last_word": "this", "hook_duration": 6.0}}'

    Or with a JSON file:
    python execution/qa_hook_assembly.py \
        --outputs-dir .tmp/hook_stacks/<stack>/outputs/ \
        --expected-file .tmp/hook_stacks/<stack>/qa_expectations.json

The script uses Whisper (word_timestamps=True) for audio verification and
FFmpeg frame extraction for visual verification.

Requires: openai-whisper, ffmpeg
"""

import argparse
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path


def get_duration(video_path):
    result = subprocess.run(
        ["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
         "-of", "csv=p=0", str(video_path)],
        capture_output=True, text=True
    )
    return float(result.stdout.strip())


def extract_audio_segment(video_path, output_wav, start=0, duration=5):
    """Extract a short audio segment as WAV for Whisper analysis."""
    cmd = [
        "ffmpeg", "-y",
        "-i", str(video_path),
        "-ss", str(start),
        "-t", str(duration),
        "-vn", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1",
        str(output_wav)
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.returncode == 0


def extract_frame(video_path, timestamp, output_jpg):
    """Extract a single frame as JPG at exact timestamp (frame-accurate)."""
    cmd = [
        "ffmpeg", "-y",
        "-i", str(video_path),
        "-ss", str(timestamp),
        "-frames:v", "1",
        "-q:v", "2",
        str(output_jpg)
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.returncode == 0


def whisper_transcribe(audio_path, model=None):
    """Run Whisper with word timestamps on an audio file."""
    if model is None:
        import whisper
        model = whisper.load_model("base")

    result = model.transcribe(str(audio_path), word_timestamps=True)
    words = []
    for segment in result.get("segments", []):
        for word_info in segment.get("words", []):
            words.append({
                "word": word_info["word"].strip().strip(".,!?;:").lower(),
                "word_raw": word_info["word"].strip(),
                "start": round(word_info["start"], 3),
                "end": round(word_info["end"], 3),
            })
    return words, result.get("text", "").strip()


def check_first_word(words, expected_word):
    """Check if the first transcribed word matches expected."""
    if not words:
        return {"pass": False, "reason": "No words detected in first 3 seconds"}

    first = words[0]
    matches = first["word"].lower() == expected_word.lower()

    return {
        "pass": matches,
        "expected": expected_word,
        "got": first["word_raw"],
        "timestamp": f"{first['start']:.3f}s",
        "reason": None if matches else f"Expected '{expected_word}', got '{first['word_raw']}' at {first['start']:.3f}s"
    }


def check_last_hook_word(words, expected_word, hook_duration):
    """Check if the last word before the hook→body join is complete."""
    if not words:
        return {"pass": False, "reason": "No words detected around join point"}

    # Find words that end before or at the hook duration
    hook_words = [w for w in words if w["end"] <= hook_duration + 0.3]
    if not hook_words:
        return {"pass": False, "reason": f"No words found ending before hook duration ({hook_duration}s)"}

    last = hook_words[-1]
    matches = last["word"].lower() == expected_word.lower()

    # Check if the word might be clipped (ends very close to or past hook duration)
    possibly_clipped = last["end"] > hook_duration - 0.05

    return {
        "pass": matches and not possibly_clipped,
        "expected": expected_word,
        "got": last["word_raw"],
        "word_end": f"{last['end']:.3f}s",
        "hook_duration": f"{hook_duration:.3f}s",
        "margin": f"{hook_duration - last['end']:.3f}s",
        "possibly_clipped": possibly_clipped,
        "reason": None if (matches and not possibly_clipped) else
                  f"Last hook word '{last['word_raw']}' ends at {last['end']:.3f}s "
                  f"(hook cuts at {hook_duration:.3f}s, margin: {hook_duration - last['end']:.3f}s)"
                  + (" — POSSIBLY CLIPPED" if possibly_clipped else "")
    }


def check_body_start(words, expected_phrase, hook_duration):
    """Check if the body's opening phrase appears after the hook."""
    if not words:
        return {"pass": False, "reason": "No words detected in body region"}

    # Find words starting after hook duration
    body_words = [w for w in words if w["start"] >= hook_duration - 0.5]
    if not body_words:
        return {"pass": False, "reason": f"No words found after hook duration ({hook_duration}s)"}

    # Check first few body words against expected phrase
    expected_words = expected_phrase.lower().split()
    body_text = " ".join([w["word"].lower() for w in body_words[:len(expected_words) + 2]])

    found = all(ew in body_text for ew in expected_words[:2])  # Check first 2 words

    return {
        "pass": found,
        "expected_phrase": expected_phrase,
        "got": body_text,
        "first_body_word_at": f"{body_words[0]['start']:.3f}s" if body_words else "N/A",
        "reason": None if found else f"Expected body to start with '{expected_phrase}', got '{body_text}'"
    }


def qa_single_video(video_path, expectations, model, qa_frames_dir):
    """Run all QA checks on a single assembled video."""
    results = {"file": video_path.name, "checks": {}, "overall": True}

    hook_duration = expectations.get("hook_duration")
    if hook_duration is None:
        results["checks"]["setup"] = {"pass": False, "reason": "hook_duration not provided"}
        results["overall"] = False
        return results

    with tempfile.TemporaryDirectory() as tmpdir:
        tmpdir = Path(tmpdir)

        # Check 1: First word (first 3s of video)
        if "first_word" in expectations:
            audio_start = tmpdir / "audio_start.wav"
            if extract_audio_segment(video_path, audio_start, start=0, duration=3):
                words, text = whisper_transcribe(audio_start, model)
                results["checks"]["first_word"] = check_first_word(words, expectations["first_word"])
            else:
                results["checks"]["first_word"] = {"pass": False, "reason": "Audio extraction failed"}

        # Check 2: Last hook word + Check 3: Body start
        # Transcribe a window around the join point
        if "last_word" in expectations or "body_start_phrase" in expectations:
            join_start = max(0, hook_duration - 3)
            audio_join = tmpdir / "audio_join.wav"
            if extract_audio_segment(video_path, audio_join, start=join_start, duration=8):
                words, text = whisper_transcribe(audio_join, model)
                # Adjust timestamps to absolute (add join_start offset)
                for w in words:
                    w["start"] += join_start
                    w["end"] += join_start

                if "last_word" in expectations:
                    results["checks"]["last_hook_word"] = check_last_hook_word(
                        words, expectations["last_word"], hook_duration)

                if "body_start_phrase" in expectations:
                    results["checks"]["body_start"] = check_body_start(
                        words, expectations["body_start_phrase"], hook_duration)
            else:
                if "last_word" in expectations:
                    results["checks"]["last_hook_word"] = {"pass": False, "reason": "Audio extraction failed"}
                if "body_start_phrase" in expectations:
                    results["checks"]["body_start"] = {"pass": False, "reason": "Audio extraction failed"}

        # Check 4: First frame visual
        version = video_path.stem.split("-")[2]  # e.g., "v0006"
        first_frame = qa_frames_dir / f"{version}_first_frame.jpg"
        if extract_frame(video_path, 0.0, first_frame):
            results["checks"]["first_frame"] = {
                "pass": True,
                "file": str(first_frame),
                "reason": "Frame extracted — visually inspect for B-roll bleed"
            }
        else:
            results["checks"]["first_frame"] = {"pass": False, "reason": "Frame extraction failed"}

        # Check 5: Join frame visual
        join_frame = qa_frames_dir / f"{version}_join_frame.jpg"
        if extract_frame(video_path, hook_duration, join_frame):
            results["checks"]["join_frame"] = {
                "pass": True,
                "file": str(join_frame),
                "reason": "Frame extracted — visually inspect for splice artifacts"
            }
        else:
            results["checks"]["join_frame"] = {"pass": False, "reason": "Frame extraction failed"}

    # Overall pass/fail
    for check_name, check_result in results["checks"].items():
        if not check_result.get("pass", False):
            results["overall"] = False

    return results


def main():
    parser = argparse.ArgumentParser(description="Automated QA for hook stack assembly")
    parser.add_argument("--outputs-dir", required=True, help="Directory containing assembled videos")
    parser.add_argument("--expected-hooks", default=None,
                        help="JSON string with expected values per version")
    parser.add_argument("--expected-file", default=None,
                        help="Path to JSON file with expected values")
    parser.add_argument("--body-start-phrase", default=None,
                        help="Expected first words of the body (applied to all versions)")
    args = parser.parse_args()

    outputs_dir = Path(args.outputs_dir)
    if not outputs_dir.exists():
        print(f"ERROR: outputs directory not found: {outputs_dir}")
        sys.exit(1)

    # Load expectations
    if args.expected_file:
        with open(args.expected_file) as f:
            expectations = json.load(f)
    elif args.expected_hooks:
        expectations = json.loads(args.expected_hooks)
    else:
        print("ERROR: provide --expected-hooks or --expected-file")
        sys.exit(1)

    # Create QA frames directory
    qa_frames_dir = outputs_dir / ".tmp_assembly" / "qa_frames"
    qa_frames_dir.mkdir(parents=True, exist_ok=True)

    # Load Whisper model once
    print("Loading Whisper model...")
    import whisper
    model = whisper.load_model("base")

    # Find assembled videos
    videos = sorted(outputs_dir.glob("dqfe-*-v*-*.mp4"))
    if not videos:
        print("No assembled videos found.")
        sys.exit(1)

    all_results = []
    pass_count = 0
    fail_count = 0

    print(f"\nRunning QA on {len(videos)} videos...")
    print("=" * 70)

    for video in videos:
        # Extract version from filename (e.g., "v0006")
        parts = video.stem.split("-")
        version = parts[2] if len(parts) > 2 else None

        if version not in expectations:
            print(f"\n  SKIP {video.name} — no expectations for {version}")
            continue

        print(f"\n  QA: {video.name}")
        exp = expectations[version].copy()

        # Apply global body_start_phrase if not per-version
        if args.body_start_phrase and "body_start_phrase" not in exp:
            exp["body_start_phrase"] = args.body_start_phrase

        result = qa_single_video(video, exp, model, qa_frames_dir)
        all_results.append(result)

        # Print results
        for check_name, check_result in result["checks"].items():
            status = "PASS" if check_result.get("pass") else "FAIL"
            icon = "  ✓" if check_result.get("pass") else "  ✗"
            print(f"    {icon} {check_name}: {status}")
            if check_result.get("reason"):
                print(f"      {check_result['reason']}")

        if result["overall"]:
            pass_count += 1
        else:
            fail_count += 1

    # Summary
    print("\n" + "=" * 70)
    print("QA SUMMARY")
    print("=" * 70)
    print(f"  Passed: {pass_count}/{pass_count + fail_count}")
    print(f"  Failed: {fail_count}/{pass_count + fail_count}")

    if fail_count > 0:
        print("\n  FAILURES:")
        for r in all_results:
            if not r["overall"]:
                print(f"    {r['file']}:")
                for check_name, check_result in r["checks"].items():
                    if not check_result.get("pass"):
                        print(f"      - {check_name}: {check_result.get('reason', 'unknown')}")

    print(f"\n  QA frames saved to: {qa_frames_dir}")

    # Save results
    results_path = outputs_dir / ".tmp_assembly" / "qa_results.json"
    with open(results_path, "w") as f:
        json.dump(all_results, f, indent=2, default=str)
    print(f"  Full results: {results_path}")

    return 0 if fail_count == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
