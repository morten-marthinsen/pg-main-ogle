# GEMINI.md

@WORKSPACE.md

This file provides Gemini CLI-specific guidance for this repository. `WORKSPACE.md` above is the single source of truth for all shared rules, architecture, routing, commands, and standards.

## Gemini-Specific Notes

1. Keep this file thin. If a rule should apply across Codex, Claude, and Gemini, it belongs in `WORKSPACE.md`, not here.
2. Read the relevant agent-specific instructions file after routing the request from `WORKSPACE.md`.
3. Do not duplicate or override workspace policy here unless the difference is genuinely Gemini-specific.
