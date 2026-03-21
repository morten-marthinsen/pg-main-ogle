# AGENTS.md

**Read WORKSPACE.md first.** It is the single source of truth for this repository — all shared rules, architecture, routing, commands, and standards live there.

This file provides OpenAI Codex-specific guidance for this repository.

## Codex-Specific Notes

1. `AGENTS.md` is the Codex entrypoint, not the workspace rulebook. Keep shared policy in `WORKSPACE.md`.
2. Codex should explicitly open and read `WORKSPACE.md` at session start before substantive work. Do not rely on this file alone.
3. After routing the request from `WORKSPACE.md`, read the relevant agent-specific instructions file inside that agent folder.
4. Use Codex-specific strengths when helpful: parallel agents for independent side tasks and worktrees for isolated parallel implementations. Do not use either if they would create overlapping write scopes or violate phase-stop discipline.
5. **Before writing any customer-facing copy file** (any `.md` or `.html` within `_performance-golf/`), re-read the "Copywriting Principles — Persuasion Craft" section of `WORKSPACE.md`. Write every sentence THROUGH those principles — not checked after. After writing, re-read what you wrote and verify: no jargon the reader hasn't been taught, no system-focused language, no doubt planted, no redundancy, no absolutes the reader can argue with. Fix violations before presenting.
