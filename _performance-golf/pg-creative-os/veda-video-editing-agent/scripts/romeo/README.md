# Romeo Python Scripts Setup

These scripts handle callout text burning, QA, and the 5-step environment workflow.

## Setup

```bash
cd _performance-golf/pg-creative-os/veda-video-editing-agent/scripts/romeo
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Scripts

| Script | Purpose |
|--------|---------|
| `burn_callout_text.py` | Burns PG-branded callout text onto hook videos (PG red #FD3300, ABC Repro Bold) |
| `qa_hook_assembly.py` | Whisper-based audio QA at hook join points + frame extraction |
| `analyze_winning_ad.py` | Gemini video analysis of winning ads (visual blueprint extraction) |
| `generate_expansion_brief.py` | Generates expansion briefs from analysis with environment templates |
| `generate_video_prompts.py` | Creates provider-specific video prompts (Kling O3 / Veo 3.1 rules) |
| `generate_avatar_video.py` | Kling O3 avatar video generation with character consistency |

## How They're Called

These scripts are invoked from TypeScript via `src/utils/python-runner.ts`, which follows the same `CommandRunner` pattern Veda uses for FFmpeg. TypeScript orchestrates; Python executes.
