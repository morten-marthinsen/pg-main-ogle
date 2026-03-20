# Whisper Batch Transcription — Reference Commands

## Check Progress
```bash
tail -20 /tmp/vimeo-whisper/whisper-run.log
```

## See How Many Videos Are Done
```bash
cat /Users/TMB/Documents/ObsidianVaults/MyMainVault/knowledge-base/video-transcripts/_whisper-progress.json | python3 -c "import sys,json; print(len(json.load(sys.stdin)))"
```

## Stop Gracefully
Finishes the current video, saves progress, then exits.
```bash
kill -INT <PID>
```

## Restart After Stop or Reboot
Picks up where it left off automatically.
```bash
cd /Users/TMB/Documents/ObsidianVaults/MyMainVault/claude-skills/daily-knowledge-capture/scripts && nohup python3 vimeo-whisper-transcriber.py > /tmp/vimeo-whisper/whisper-run.log 2>&1 &
```

## Other Useful Flags
```bash
# Dry run — see what's left and estimated time
python3 vimeo-whisper-transcriber.py --dry-run

# Process only a specific Vimeo folder
python3 vimeo-whisper-transcriber.py --folder "E5 Accelerator"

# Limit to N videos
python3 vimeo-whisper-transcriber.py --limit 50

# Skip videos longer than 1 hour
python3 vimeo-whisper-transcriber.py --max-duration 3600
```
