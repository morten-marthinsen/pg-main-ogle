# Creative OS — MCP Tool Registry

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Map every external tool to every agent and task. Setup verification, cost guidance, and "can I run without it?" answers.

---

## Tool-to-Agent-to-Task Matrix

| Tool | Orion | Tess | Veda | Neco | Tasks |
|------|-------|------|------|------|-------|
| **Anthropic API** | CRITICAL | — | Optional | — | Daily briefing AI drafts, Slack bot agent, task parsing, intent classification |
| **Google Sheets MCP** | CRITICAL | CRITICAL | CRITICAL | — | SSS data read/write, intake queue, asset registry, daily report data |
| **Google Docs MCP** | Optional | — | — | — | Read Google Docs for context saving, daily report enrichment |
| **ClickUp MCP** | CRITICAL | Optional | — | — | Task sync, transcript extraction, static delivery name generation |
| **Slack API** | Optional | — | — | — | M4 Slack monitor, daily briefing notification, personal bot |
| **Google Calendar API** | Optional | — | — | — | M12 calendar module, daily report scheduling context |
| **Gmail OAuth** | Optional | — | — | — | M6 email module |
| **Fathom API** | Optional | — | — | — | M9 transcript intelligence extraction |
| **Iconik DAM API** | — | — | CRITICAL | — | Source video download, asset upload, metadata tagging |
| **FAL.ai API** | — | — | CRITICAL | — | BiRefNet segmentation, Flux background generation, wav2lip |
| **ElevenLabs API** | — | — | Optional | — | Voice dubbing (international expansion agent) |
| **Higgsfield API** | — | — | Optional | — | Character generation (presenter-gen expansion agent) |
| **Figma MCP** | Optional | — | — | Optional | Design context, launch boards, static image briefs |

---

## MCP Servers (Shared via `.claude/mcp.json`)

These are configured in the repo's `.claude/mcp.json` and load automatically in Claude Code sessions.

### Figma
- **What it does:** Read Figma designs, get screenshots, generate FigJam diagrams
- **Which agents:** Orion (launch boards), Neco (static image briefs)
- **Portable:** Yes — remote URL, no local setup
- **Verify:** Open a Claude Code session and ask "who am I on Figma?" — should return your Figma account

### ClickUp
- **What it does:** Read tasks, custom fields, assignees, statuses
- **Which agents:** Orion (task sync, triage intelligence), Tess (asset registry sync)
- **Portable:** Yes — uses `npx`, read-only mode
- **Env var:** `CLICKUP_API_KEY` (in shell environment or `.env`)
- **Verify:** `ToolSearch("clickup")` in Claude Code — tools should load. Try reading a known task ID.

### Google Docs
- **What it does:** Read/write Google Docs, list documents, manage tabs
- **Which agents:** Orion (context saving, doc enrichment)
- **Portable:** Yes — uses `npx`
- **Verify:** `ToolSearch("google-docs")` in Claude Code — tools should load

### Fathom
- **What it does:** Read meeting transcripts from Fathom
- **Which agents:** Orion (M9 transcript intelligence)
- **Portable:** NO — custom local build. Path in `mcp.json` must be updated to your machine
- **Setup:** Clone/build the fathom-mcp project, then update the path in `.claude/mcp.json`
- **Verify:** `ToolSearch("fathom")` — if tools don't load, check the path

---

## External APIs (Per-Agent `.env` Files)

These are NOT MCP servers — they're direct API integrations configured via `.env` files in each agent's directory.

### Anthropic API
- **What it does:** Powers Orion's daily briefing AI drafts (M4 Slack response options, task parsing, intent classification)
- **Which agent:** Orion (daily-briefing + personal bot)
- **Env var:** `ANTHROPIC_API_KEY`
- **Env file:** `orion-chief-of-staff/_ops/daily-briefing/.env` and `orion-chief-of-staff/_ops/orion-personal-bot/.env`
- **Cost:** ~$0.10-0.50 per daily briefing run (Haiku for classification, Sonnet/Haiku for drafts)

### Iconik DAM
- **What it does:** Source video download, asset upload with GCS resumable upload, metadata tagging
- **Which agent:** Veda
- **Env vars:** `ICONIK_APP_ID`, `ICONIK_AUTH_TOKEN`, `ICONIK_METADATA_VIEW_ID`, `ICONIK_COLLECTION_ID`, `ICONIK_STORAGE_ID`
- **Env file:** `veda-video-editing-agent/.env`
- **Cost:** Included in PG's Iconik license

### FAL.ai
- **What it does:** BiRefNet background segmentation, Flux background generation, wav2lip lip-sync
- **Which agent:** Veda
- **Env var:** `FAL_KEY`
- **Env file:** `veda-video-editing-agent/.env`
- **Cost:** ~$0.05-0.20 per AI background swap (segmentation + generation)

### ElevenLabs
- **What it does:** Voice dubbing for international expansion agent
- **Which agent:** Veda (optional — only for international expansions)
- **Env var:** `ELEVENLABS_API_KEY`
- **Env file:** `veda-video-editing-agent/.env`
- **Cost:** Depends on plan tier

### Higgsfield
- **What it does:** Character generation for presenter-gen expansion agent
- **Which agent:** Veda (optional — only for presenter generation)
- **Env vars:** `HIGGSFIELD_API_KEY`, `HIGGSFIELD_SECRET`
- **Env file:** `veda-video-editing-agent/.env`
- **Cost:** Per-generation pricing

### Google Sheets (Service Account)
- **What it does:** Read/write SSS spreadsheet (intake queue, asset registry, ad-level tracking)
- **Which agent:** Veda (direct API via service account), Tess (direct API), Orion (via MCP)
- **Env vars:** `GOOGLE_SERVICE_ACCOUNT_KEY_PATH`, `VEDA_SPREADSHEET_ID`
- **Env file:** `veda-video-editing-agent/.env` (Veda uses service account key file)
- **Note:** Service account key file (`*-sa-key.json`) is gitignored. Each user needs their own.

### Slack API
- **What it does:** Bot messaging, DM monitoring, message shortcuts
- **Which agent:** Orion (personal bot + daily briefing webhook)
- **Env vars:** `SLACK_BOT_TOKEN`, `SLACK_APP_TOKEN`, `SLACK_WEBHOOK_URL`, `OWNER_SLACK_ID`
- **Env file:** `orion-chief-of-staff/_ops/orion-personal-bot/.env`

### Google Calendar API
- **What it does:** Read calendar events for daily briefing context
- **Which agent:** Orion (M12 module)
- **Setup:** OAuth credentials via `daily-briefing/auth/` scripts

### Gmail OAuth
- **What it does:** Read recent emails for daily briefing
- **Which agent:** Orion (M6 module)
- **Setup:** OAuth credentials via `daily-briefing/auth/` scripts

### Fathom API (Direct)
- **What it does:** Fetch recent meeting transcripts for extraction
- **Which agent:** Orion (M9 module, separate from MCP)
- **Setup:** API token configured in daily-briefing `.env`

---

## Local Tools

| Tool | Required By | Purpose | Install |
|------|------------|---------|---------|
| **Node.js 18+** | Veda, Tess Dashboard | TypeScript runtime, build, test | `brew install node` or nvm |
| **Python 3.10+** | Tess Pipeline, Orion | Pipeline scripts, daily briefing, bots | `brew install python` or pyenv |
| **FFmpeg** | Veda | Video processing, compositing, audio manipulation | `brew install ffmpeg` |
| **Git** | All | Version control | Pre-installed on macOS |

---

## "Can I Run This Agent Without X?" Matrix

| Agent | Run Without... | Impact |
|-------|---------------|--------|
| **Neco** | Everything | Neco is advisory — no external dependencies. Works with just the AI model + repo files. |
| **Orion** | Slack API | No M4 draft responses, no bot. Daily briefing still runs. |
| **Orion** | Fathom API | No M9 transcript intelligence. Everything else works. |
| **Orion** | Google Calendar | No M12 calendar context in daily report. Everything else works. |
| **Orion** | Gmail OAuth | No M6 email section. Everything else works. |
| **Orion** | ClickUp API | No task sync, no transcript extraction. Major capability loss. |
| **Orion** | Anthropic API | No AI-generated draft responses (M4). Falls back to template-based output. |
| **Orion** | Google Sheets | No SSS data in daily report. Critical. |
| **Tess** | Google Sheets | Cannot read/write SSS. Pipeline non-functional. |
| **Tess** | ClickUp API | No asset registry sync. Pipeline still works for data analysis. |
| **Veda** | Iconik | Cannot download source videos or upload finished assets. Pipeline non-functional for production. Can still run tests and dry-run. |
| **Veda** | FAL.ai | No AI background swaps. Non-AI expansion types still work (hook-stack, duration, scroll-stopper). |
| **Veda** | ElevenLabs | No international dubbing. All other expansion types work. |
| **Veda** | Higgsfield | No presenter generation. All other expansion types work. |
| **Veda** | Google Sheets | Cannot read intake queue or update status. Manual mode only. |

---

## Setup Verification Checklist

Run through this list to confirm your environment is ready:

1. [ ] **Git:** `git --version` returns 2.x+
2. [ ] **Node.js:** `node --version` returns 18+
3. [ ] **Python:** `python3 --version` returns 3.10+
4. [ ] **FFmpeg** (Veda only): `ffmpeg -version` returns a version
5. [ ] **Repo cloned:** `ls _performance-golf/pg-creative-os/` shows 4 agent directories
6. [ ] **Veda deps:** `cd veda-video-editing-agent && npm install && npm test` — all pass
7. [ ] **Tess deps:** `cd tess-strategic-scaling-system && pip install -r requirements.txt`
8. [ ] **Orion deps:** `cd orion-chief-of-staff/_ops/daily-briefing && pip install -r requirements.txt`
9. [ ] **Orion bot deps:** `cd orion-chief-of-staff/_ops/orion-personal-bot && pip install -r requirements.txt`
10. [ ] **MCP servers load:** Open Claude Code, run `ToolSearch("clickup")` — tools appear
11. [ ] **Veda `.env`:** Copy `.env.template` → `.env`, fill in Iconik + FAL credentials
12. [ ] **Orion `.env`:** Create `.env` files in daily-briefing and orion-personal-bot directories
13. [ ] **Service account key** (Veda): Place your `*-sa-key.json` in the Veda directory

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. Maps all external tools across 4 agents with critical/optional flags, cost estimates, and verification steps. |
