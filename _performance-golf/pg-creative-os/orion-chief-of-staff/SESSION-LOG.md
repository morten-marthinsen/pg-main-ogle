# Orion — Session Log (Append-Only)

> Build State lives in `CLAUDE.md` (auto-loaded every session). This file is append-only history.
> For sessions 001-089, see `SESSION-LOG-ARCHIVE.md`.

---

## S090 — 2026-03-12 — Save Context Shortcut: EXECUTION

### What Happened
1. **Phase 1: Context library + kb_ops helper.** Created `_shared/context-library/.gitkeep`. Added `save_context_file(filename, frontmatter, body)` to kb_ops.py — resolves path 4 parents up, writes YAML frontmatter + markdown body, handles filename collisions (-2, -3, etc.).

2. **Phase 2: Agent tool.** Added `save_context` tool to agent.py TOOLS list (9 input fields), `execute_tool()` branch (builds frontmatter dict, calls `save_context_file()`), and system prompt instructions (product slug list, filename format, propose-then-confirm rule). Bot now has 7 tools.

3. **Phase 3: Bot shortcut handler.** Added `@app.shortcut("save_orion_context")` to bot.py — mirrors existing `create_orion_task` pattern. Extracts message text, sender name (via `users_info`), channel name/ID, message_ts. Builds prompt enforcing propose-then-confirm. Posts placeholder DM, calls `process_message()`, updates with proposal.

4. **Phase 4: Documentation.** Updated README.md — 2 shortcuts in setup, 7 tools table, dual shortcut testing section, updated troubleshooting.

### Files Modified
- `_shared/context-library/.gitkeep` — CREATED
- `_ops/orion-personal-bot/kb_ops.py` — added `save_context_file()` (~25 lines)
- `_ops/orion-personal-bot/agent.py` — added tool def + execute branch + system prompt (~55 lines)
- `_ops/orion-personal-bot/bot.py` — added `save_orion_context` handler (~70 lines)
- `_ops/orion-personal-bot/README.md` — updated for 2 shortcuts, 7 tools
- `CLAUDE.md` — Build State v9.1, S090

### Status: CODE COMPLETE — Needed Slack app config + E2E test

---

## S091 — 2026-03-12 — Save Context Shortcut: SLACK CONFIG + GO LIVE

### What Happened
1. **Phase 1: Slack app config via Playwright.** Opened api.slack.com/apps → Orion (Personal) → Interactivity & Shortcuts → Created new message shortcut: Name "Save Context", Description "Save this message as tagged context to the shared library", Callback ID `save_orion_context`. Saved changes — success banner confirmed.

2. **Phase 2: Bot restart.** Killed PID 16070, launchd auto-restarted as PID 45659. Confirmed clean boot: "Bolt app is running!" in logs.

3. **Phase 3: E2E test.** Christopher tested Save Context shortcut on a real Slack message (forwarded from Chris McGinley with Google Doc attachment). Bot fired correctly, sent proposal DM. **Gap discovered**: bot can't read Google Doc content — only sees the URL. Bot asked Christopher for manual context instead of reading the doc.

### Gap Identified
- **Google Doc reading**: When a message contains a Google Doc link, the bot should extract the doc ID, fetch content via Google Docs API (reusing daily-briefing OAuth), and use it to auto-propose metadata. Currently the bot has no Google Docs tool.

### Files Modified
- `CLAUDE.md` — Build State v9.2, S091

### Status: LIVE — Save Context shortcut working. Google Doc reading is next enhancement (S092).

---

## S092 — 2026-03-12 (Thu)

**Focus**: Personal bot Google Doc fix + Team bot Docs rules + Brixton intro

### What Happened
1. **Personal bot: Google Doc URL extraction for Save Context.** Added `_extract_google_doc_urls()` helper to `bot.py` — extracts Google Doc URLs from Slack message text (angle-bracket format), attachments (unfurled links), and blocks. When URLs found, shortcut handler injects explicit "CALL read_google_doc FIRST" instruction into the prompt. Root cause of S091 gap: Haiku wasn't reliably following the system prompt instruction without per-message reinforcement. Bot restarted (PID 73426).

2. **Team bot: Google Docs formatting + revision rules.** Added to system prompt in `agent.py`: (a) Always use proper formatting — bold headings, italics for notes, clean hierarchy with line breaks. (b) When revising copy, replace the original — don't append a "revised" section. Redeployed to Railway.

3. **Brixton intro message drafted and approved.** Casual, 3-sentence DM introducing the bot, how to use it (DM "Orion - PG Creative Intel"), and request for VM feedback.

### Key Decisions
- **Prompt injection over model upgrade** — rather than switching personal bot to Sonnet for Save Context flows, added explicit per-message instructions when Google Doc URLs are detected. Cheaper and more reliable.
- **Replace-not-append for doc revisions** — Brixton's feedback: overwrite originals with improved versions, don't create "revised" sections.

### Files Modified
- `_ops/orion-personal-bot/bot.py` — Added `re` import, `_extract_google_doc_urls()` helper, Google Doc URL detection in save context handler
- `_ops/orion-team-bot/agent.py` — Added Google Docs Rules section to system prompt (formatting + revision behavior)
- `CLAUDE.md` — Build State v9.3, S092

### Status: DEPLOYED — Both bots updated. Pending: Google Drive permissions for personal bot E2E test. Brixton testing team bot.
