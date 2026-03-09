# Creative OS — Setup Guide

## Prerequisites

- Git
- Python 3.10+
- Node.js 18+ (for Veda and Tess dashboard)
- Claude Code CLI

## Agent Dependency Matrix

| Dependency | Orion | Tess | Veda | Neco | Critical? |
|-----------|-------|------|------|------|-----------|
| Anthropic API | Yes | — | — | — | Yes (daily briefing) |
| Google Sheets MCP | Yes | Yes | Yes | — | Yes (SSS data) |
| ClickUp API | Yes | Yes | — | — | Yes (task sync) |
| Slack MCP | Yes | — | — | — | Optional (M4 module) |
| Google Calendar MCP | Yes | — | — | — | Optional (M12 module) |
| Gmail OAuth | Yes | — | — | — | Optional (M6 module) |
| Fathom API | Yes | — | — | — | Optional (transcripts) |
| Iconik DAM API | — | — | Yes | — | Yes (for Veda) |
| FAL.ai API | — | — | Yes | — | Yes (for Veda) |
| Figma MCP | — | — | — | — | Optional |

## Quick Start

1. Clone the repo and navigate to `_performance-golf/pg-creative-os/`
2. Read the root `CLAUDE.md` for routing rules and architecture overview
3. Pick the agent you need (see Agent Map in CLAUDE.md)
4. `cd` into that agent's folder and read its `CLAUDE.md` before starting work

## Environment Files

Each agent that needs API keys uses its own `.env` file in its directory (gitignored). Copy from `.env.example` if one exists, or create manually with the required keys from the dependency matrix above.

## MCP Server Setup

Shared MCP servers are configured in `.claude/mcp.json` (committed). Most use `npx` and work out of the box. One requires per-user adjustment:

| Server | Portable? | Notes |
|--------|-----------|-------|
| Figma | Yes | Remote URL, no local setup needed |
| ClickUp | Yes | Uses `npx`, read-only mode. Requires `CLICKUP_API_KEY` env var |
| Google Docs | Yes | Uses `npx` |
| Fathom | **No** | Custom local build — path in `mcp.json` must be updated to your local install location. See `args` in the `fathom` entry and adjust `/Users/.../fathom-mcp/dist/index.js` to match your machine |

## Scheduled Automation (macOS only)

Several agents use `launchd` plist files for scheduled jobs:

| Job | Agent | Schedule | Plist |
|-----|-------|----------|-------|
| Daily briefing | Orion | 8:00 AM | `com.performancegolf.orion` |
| Fathom transcript sync | Orion | Every 30 min | `com.performancegolf.fathom-sync` |
| ClickUp task sync | Orion | Every 5 min | `com.performancegolf.clickup-sync` |
| Neco autonomous hooks | Neco | 10:00 PM | `com.performancegolf.neco-autonomous` |
| LOMS nightly | Shared | Nightly | `com.performancegolf.loms-nightly` |

Plists live in `~/Library/LaunchAgents/`. See each agent's ops docs for setup details.

## Agent Runtimes

| Agent | Install | Test | Build |
|-------|---------|------|-------|
| **Veda** | `cd veda-video-editing-agent && npm install` | `npm test` | `npm run build` |
| **Tess Dashboard** | `cd tess-strategic-scaling-system/tess-dashboard && npm install` | — | `npm run build` |
| **Tess Pipeline** | `cd tess-strategic-scaling-system && pip install -r requirements.txt` | — | — |
| **Orion** | `cd orion-chief-of-staff/_ops/daily-briefing && pip install -r requirements.txt` | — | — |
| **Neco** | No runtime dependencies (advisory agent — docs + reference files) | — | — |
