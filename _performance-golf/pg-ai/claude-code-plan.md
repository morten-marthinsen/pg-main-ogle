# Claude Code Setup — Plan (Finalized)

> Created 2026-03-19. Updated after interview.

---

## Goal

ALL official Anthropic/Claude Code content synced into pg-main daily via GitHub Action, audited against the ENTIRE pg-main repo, with a Slack message confirming the sync and providing 0-3 applicable action items.

---

## Decisions (from interview)

- **All repos from day one** — no phased rollout, everything syncs immediately
- **Full repo contents** — everything, not just docs/markdown
- **Flat structure** — `pg-ai/claude-code/` with each repo as a subfolder, docs and feeds as files alongside
- **GitHub Action** — runs on GitHub's servers daily, works when computer is off
- **Commits under** existing Perfect Pitch Publishing GitHub identity (github-actions[bot])
- **Slack notification** — confirms sync completed, then 0-3 action items ONLY if applicable. Zero busywork.
- **Audit scope** — scans entire pg-main repo, not just .claude/ config files
- **Later** — replicate for Codex + Gemini (inventories already filed)

---

## What's Built

### Phase 1: Sync ✅

**GitHub Action:** `.github/workflows/sync-claude-code.yml`
- Runs daily at 6:00 AM EST (11:00 UTC)
- Can also be triggered manually (workflow_dispatch)
- Clones all 12 Anthropic repos (shallow clone, strips .git)
- Fetches docs (llms-full.txt, platform llms.txt)
- Fetches feeds (releases atom, status atom)
- Downloads whitepaper PDF
- Records sync metadata with timestamp
- Commits only if changes detected
- Sends Slack notification (requires SLACK_WEBHOOK_URL secret)

**Gitignore override:** `pg-ai/claude-code/.gitignore`
- Un-ignores PDFs, media, node_modules, build dirs blocked by root .gitignore
- Ensures all synced content gets committed regardless of file type

### Phase 2: Audit — TODO

After sync, audit the entire pg-main repo against the synced content:
- CLAUDE.md / WORKSPACE.md / AGENTS.md / GEMINI.md structure and completeness
- Hooks — which events used vs. which exist
- Settings — ours vs. Anthropic's example configs
- MCP servers — configured vs. available
- Plugins — running vs. official directory
- Skills — ours vs. anthropics/skills
- Slash commands — ours vs. examples
- Agents — configs vs. best practices
- GitHub Actions — using claude-code-action, security-review?
- Agent SDK — leveraging it?
- Monitoring/observability — per monitoring-guide

Output: scored report → feeds into action items.

### Phase 3: Slack Action Items — Partially built

Slack notification framework is in the workflow. Currently sends:
- Sync confirmation with change count
- "No changes" message when nothing updated

**TODO:** Add audit results and 0-3 action items to the Slack message.

---

## Setup Required

1. **Slack webhook URL** — user needs to create an incoming webhook in Slack
2. **Add as GitHub secret** — `SLACK_WEBHOOK_URL` in pg-main repo settings
3. **First run** — trigger manually via GitHub Actions tab to do initial sync
4. **Pull locally** — `git pull` after first sync to get all content

---

## Folder Structure (after first sync)

```
_performance-golf/pg-ai/
├── anthropic-inventory.md
├── openai-inventory.md              ← filed for later
├── google-inventory.md              ← filed for later
├── claude-code-plan.md              ← this file
└── claude-code/
    ├── .gitignore                   ← overrides root gitignore
    ├── sync-metadata.yml            ← last sync timestamp
    ├── claude-code-docs-full.txt    ← all 65 doc pages
    ├── platform-docs-index.txt      ← 606 API/platform pages index
    ├── releases.atom                ← release feed
    ├── status.atom                  ← status feed
    ├── anthropic-whitepaper.pdf     ← how Anthropic uses Claude Code
    ├── claude-code/                 ← anthropics/claude-code repo
    ├── skills/                      ← anthropics/skills repo
    ├── claude-plugins-official/     ← official plugin directory
    ├── claude-code-action/          ← GitHub Action for PRs
    ├── claude-code-security-review/ ← security review Action
    ├── claude-code-monitoring-guide/← ROI + observability
    ├── claude-agent-sdk-python/     ← Python Agent SDK
    ├── claude-agent-sdk-typescript/ ← TypeScript Agent SDK
    ├── claude-agent-sdk-demos/      ← 8 demo apps
    ├── claude-cookbooks/            ← recipes + notebooks
    ├── claude-quickstarts/          ← 5 starter projects
    └── courses/                     ← educational courses
```
