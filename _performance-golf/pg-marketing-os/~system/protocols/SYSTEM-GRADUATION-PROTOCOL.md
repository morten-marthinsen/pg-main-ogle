# System Graduation Protocol

**Version:** 2.0
**Created:** 2026-03-13
**Purpose:** Manage divergence when PG graduates marketing-os items to their root/system level.

---

## Architecture

PG Main evolves in two directions:
1. **Improving** marketing-os content (skills, protocols, specs)
2. **Graduating** marketing-os infrastructure to root/system level (hooks, MCPs, workspace rules)

**Vault mirrors PG exactly.** When PG graduates something, the vault mirrors the deletion from marketing-os/ and adopts the system-level config at vault root. Only the share repo needs special handling.

```
PG Main:
├── root/.hooks/                      ← graduated
├── root/.claude/settings.json        ← graduated MCP configs
└── pg-marketing-os/                  ← thinner (graduated items removed)

Your Vault (mirrors PG):
├── .hooks/                           ← adopted at vault root
├── marketing-os/                     ← matches PG exactly
└── (other vault content)

Share Repo (standalone — built by Phase 4):
├── .hooks/                           ← INJECTED from vault root by Phase 4
├── ~system/, engines, etc.           ← from vault marketing-os/
└── (fully standalone, no PG dependencies)
```

## Rules

### Rule 1: Vault Mirrors PG
When PG graduates something from marketing-os to system level, the vault mirrors the deletion. The vault adopts the same system-level config at its root. No divergence between vault and PG's marketing-os content.

### Rule 2: Adopt System-Level Configs Locally
When PG moves hooks, MCPs, or workspace rules to root level, set up the equivalent at your vault root. This gives you the same developer experience as PG.

### Rule 3: Share Repo Gets Standalone Injection
Phase 4 of vault-sync reads `GRADUATION-MANIFEST.yaml` and injects graduated items into the share repo from their vault root locations. The share repo works standalone.

### Rule 4: Log Every Graduation
When PG graduates something, immediately add it to `~system/GRADUATION-MANIFEST.yaml` with:
- `mos_paths` — what was removed from marketing-os
- `vault_root_source` — where it now lives at vault root
- `share_repo_dest` — where Phase 4 should place it in the share repo

### Rule 5: Sync Pulls Everything
Phase 0 of vault-sync pulls ALL changes from upstream (improvements AND graduations), not just ~outputs/. No selective pulling, no manual diffing.

## Detecting New Graduations

### From PRs
When reviewing PRs on PG Main, check for marketing-os deletions paired with root-level additions.

### From Conversations
When Donnie/Ben mention "moving X to system level," log it in the manifest immediately.

### From Sync Output
Phase 0 reports what it pulled. If files were deleted from marketing-os, check if they appeared at PG's root level.

## When a Graduation Happens — Checklist

1. Add entry to `GRADUATION-MANIFEST.yaml`
2. Set up the graduated item at vault root level (copy/move from marketing-os/)
3. Mirror the deletion from marketing-os/ (sync will do this automatically on next pull)
4. Verify `--diff-upstream` shows the graduation correctly
5. Run sync — Phase 4 will inject the item into the share repo
