# CLAUDE.md

@WORKSPACE.md

This file provides Claude Code-specific guidance for this repository. All shared rules, architecture, and standards are in WORKSPACE.md above.

## Claude-Specific Configuration

1. Keep this file thin. If a rule should apply across Codex, Claude, and Gemini, it belongs in `WORKSPACE.md`, not here.

### Shared vs. Local Config (MANDATORY)

This repo is shared across multiple contributors via GitHub. Everything in `.claude/` is committed and shared by default so everyone benefits from the same settings, agents, hooks, skills, and rules — including `mcp.json`, which defines shared MCP server connections. One file is gitignored because it contains machine-specific config that would be incorrect on another person's machine: `settings.local.json` (personal permissions). Never commit this file. Never add machine-specific values (localhost URLs, file paths, personal tokens) to any shared config file. If a new config file contains machine-specific values, add it to `.gitignore` before committing.

### Agent Context Files

Each agent has its own `CLAUDE.md` with session protocols, non-negotiables, and context budget rules. Always `cd` into the agent folder and read its CLAUDE.md before starting work on that agent.

**All shared rules and standards are in WORKSPACE.md. Refer to it for any questions about this repository's architecture, conventions, or workflows.**
