# Creative OS — Setup Guide

**Version:** 2.0
**Updated:** 2026-03-18

---

## Prerequisites

| Tool | Version | Install | Verify |
|------|---------|---------|--------|
| Git | 2.x+ | Pre-installed on macOS | `git --version` |
| Python | 3.10+ | `brew install python` or pyenv | `python3 --version` |
| Node.js | 18+ | `brew install node` or nvm | `node --version` |
| FFmpeg | Any (Veda only) | `brew install ffmpeg` | `ffmpeg -version` |
| Claude Code CLI | Latest | See Anthropic docs | `claude --version` |

---

## Quick Start (5 Minutes)

```bash
# 1. Clone and navigate
git clone <repo-url>
cd _performance-golf/pg-creative-os/

# 2. Install agent dependencies
cd veda-video-editing-agent && npm install && cd ..
cd tess-strategic-scaling-system && pip install -r requirements.txt && cd ..
cd orion-chief-of-staff/_ops/daily-briefing && pip install -r requirements.txt && cd ../..
cd orion-chief-of-staff/_ops/orion-personal-bot && pip install -r requirements.txt && cd ../..

# 3. Verify Veda builds and tests pass
cd veda-video-editing-agent && npm test && npm run build && cd ..

# 4. Set up environment files (see below)

# 5. Start working — pick your agent and read its CLAUDE.md
```

**Neco has no dependencies.** It's an advisory agent — docs and reference files only.

---

## Environment Files

Each agent that needs API keys uses its own `.env` file (gitignored). Never commit `.env` files.

### Veda

```bash
cd veda-video-editing-agent
cp .env.template .env
# Fill in: ICONIK_APP_ID, ICONIK_AUTH_TOKEN, ICONIK_COLLECTION_ID, ICONIK_STORAGE_ID,
#          ICONIK_METADATA_VIEW_ID, FAL_KEY, VEDA_SPREADSHEET_ID
# Place your Google service account key as veda-sheets-sa-key.json (gitignored)
```

**Verify:** `node dist/cli.js --help` — should show CLI options without errors

### Orion Daily Briefing

```bash
cd orion-chief-of-staff/_ops/daily-briefing
# Create .env with: ANTHROPIC_API_KEY, SLACK_WEBHOOK_URL, CLICKUP_API_KEY
# Run OAuth setup for Google services:
#   python3 auth/calendar_auth.py
#   python3 auth/gmail_auth.py
#   python3 auth/docs_auth.py
```

**Verify:** `python3 daily_briefing.py` — should produce a report (or error with specific missing credentials)

### Orion Personal Bot

```bash
cd orion-chief-of-staff/_ops/orion-personal-bot
# Create .env with: SLACK_BOT_TOKEN, SLACK_APP_TOKEN, OWNER_SLACK_ID, ANTHROPIC_API_KEY
```

**Verify:** `python3 bot.py` — should connect to Slack (or error with specific missing token)

### Tess Pipeline

```bash
cd tess-strategic-scaling-system
# Create .env with: GOOGLE_SERVICE_ACCOUNT_KEY_PATH, SPREADSHEET_ID
```

---

## MCP Server Setup

Shared MCP servers are configured in `.claude/mcp.json` (committed). Most use `npx` and work out of the box.

| Server | Portable? | Setup Required | Verify |
|--------|-----------|---------------|--------|
| Figma | Yes | None — remote URL | Ask Claude "who am I on Figma?" |
| ClickUp | Yes | Set `CLICKUP_API_KEY` env var | `ToolSearch("clickup")` in Claude Code |
| Google Docs | Yes | None — uses `npx` | `ToolSearch("google-docs")` in Claude Code |
| Fathom | **No** | Custom local build — update path in `mcp.json` | `ToolSearch("fathom")` in Claude Code |

### Fathom Setup (Non-Portable)

The `fathom` entry in `.claude/mcp.json` points to a local path (`~/.claude/fathom-mcp/dist/index.js`). To set up on your machine:

1. Clone/build the fathom-mcp project to your preferred location
2. Edit `.claude/mcp.json` — update the `fathom` args path to match your install
3. **Do NOT commit this path change** — it's machine-specific

If you don't have Fathom set up, that's fine — only Orion's M9 transcript module uses it. Everything else works without it.

---

## Agent Dependency Matrix

| Dependency | Orion | Tess | Veda | Neco | Critical? |
|-----------|-------|------|------|------|-----------|
| Anthropic API | Yes | — | — | — | Yes (daily briefing AI drafts) |
| Google Sheets | Yes | Yes | Yes | — | Yes (SSS data) |
| ClickUp API | Yes | Yes | — | — | Yes (task sync) |
| Iconik DAM | — | — | Yes | — | Yes (for Veda production) |
| FAL.ai | — | — | Yes | — | Yes (for Veda AI pipeline) |
| Slack API | Yes | — | — | — | Optional (M4 + bot) |
| Google Calendar | Yes | — | — | — | Optional (M12) |
| Gmail OAuth | Yes | — | — | — | Optional (M6) |
| Fathom API | Yes | — | — | — | Optional (M9) |
| ElevenLabs | — | — | Yes | — | Optional (international) |
| Higgsfield | — | — | Yes | — | Optional (presenter-gen) |
| Figma MCP | Optional | — | — | Optional | Optional |

**Full details:** See `MCP-TOOL-REGISTRY.md` for the complete tool-to-agent-to-task matrix, cost estimates, and "Can I Run Without X?" answers.

---

## Scheduled Automation (macOS only)

Several agents use `launchd` plist files for scheduled jobs:

| Job | Agent | Schedule | Plist |
|-----|-------|----------|-------|
| Daily briefing | Orion | 8:00 AM + 8:30 AM | `com.performancegolf.orion` |
| Fathom transcript sync | Orion | Every 30 min | `com.performancegolf.fathom-sync` |
| ClickUp task sync | Orion | Every 5 min | `com.performancegolf.clickup-sync` |
| Neco autonomous hooks | Neco | 10:00 PM | `com.performancegolf.neco-autonomous` |
| LOMS nightly | Shared | Nightly | `com.performancegolf.loms-nightly` |
| Orion Personal Bot | Orion | Always-on (KeepAlive) | `com.performancegolf.orion-personal` |

Plists live in `~/Library/LaunchAgents/`. These contain machine-specific paths and are gitignored. See each agent's ops docs for setup details.

---

## Troubleshooting

### "ToolSearch returns nothing for ClickUp/Fathom"

The MCP server failed to start. Check:
- Is the env var set? (`echo $CLICKUP_API_KEY`)
- For Fathom: does the path in `.claude/mcp.json` point to a real file?
- Restart Claude Code after changing MCP config

### "Veda npm test fails"

Run `npm install` first. If tests still fail:
- Check Node.js version: `node --version` (needs 18+)
- Check for stale dist: `npm run build` then re-test
- Check `npx tsc --noEmit` for TypeScript errors

### "Orion daily briefing fails"

Check the log: `cat _ops/daily-briefing/logs/orion-*.log | tail -20`
Common causes:
- Missing `ANTHROPIC_API_KEY` → set in `.env`
- Google OAuth expired → re-run `python3 auth/calendar_auth.py`
- Slack webhook URL invalid → check `.env`

### "I don't have Iconik/FAL credentials"

You can still work on Veda code without production credentials:
- Tests run without credentials (`npm test` uses mocks)
- `--dry-run` flag skips Iconik upload
- Only actual production runs require live credentials

---

## Setup Complete Checklist

Run through this to confirm everything works:

1. [ ] `git --version` → 2.x+
2. [ ] `node --version` → 18+
3. [ ] `python3 --version` → 3.10+
4. [ ] `ffmpeg -version` → any version (Veda only)
5. [ ] `ls _performance-golf/pg-creative-os/` → shows 4 agent directories
6. [ ] `cd veda-video-editing-agent && npm test` → all pass
7. [ ] `cd veda-video-editing-agent && npm run build` → clean build
8. [ ] Veda `.env` created from `.env.template`
9. [ ] Orion `.env` files created (daily-briefing + personal-bot)
10. [ ] Open Claude Code → `ToolSearch("clickup")` → tools load
11. [ ] Google service account key placed (Veda: `veda-sheets-sa-key.json`)

**You're ready.** Pick your agent, read its `CLAUDE.md`, and start a session.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-08 | Initial creation. Prerequisites, dependency matrix, quick start, MCP setup, scheduled automation. |
| 2.0 | 2026-03-18 | Full upgrade: step-by-step install with verify commands, environment file setup per agent, troubleshooting section, setup complete checklist. References MCP-TOOL-REGISTRY.md for detailed tool docs. |
