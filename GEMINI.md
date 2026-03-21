# GEMINI.md

@WORKSPACE.md

This file provides Gemini CLI-specific guidance for this repository. `WORKSPACE.md` above is the single source of truth for all shared rules, architecture, routing, commands, and standards.

## Gemini-Specific Notes

1. Keep this file thin. If a rule should apply across Codex, Claude, and Gemini, it belongs in `WORKSPACE.md`, not here.
2. Read the relevant agent-specific instructions file after routing the request from `WORKSPACE.md`.
3. Do not duplicate or override workspace policy here unless the difference is genuinely Gemini-specific.
4. **Before writing any customer-facing copy file** (any `.md` or `.html` within `_performance-golf/`), re-read the "Copywriting Principles — Persuasion Craft" section of `WORKSPACE.md`. Write every sentence THROUGH those principles — not checked after. After writing, re-read what you wrote and verify: no jargon the reader hasn't been taught, no system-focused language, no doubt planted, no redundancy, no absolutes the reader can argue with. Fix violations before presenting.
