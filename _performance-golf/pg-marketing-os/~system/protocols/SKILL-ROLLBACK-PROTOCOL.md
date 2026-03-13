# Skill-Level Rollback Protocol

**Version:** 1.0
**Created:** 2026-03-10
**Authority:** Companion to EXECUTION-GUARDRAILS.md — structural safety net for all skill executions
**Source:** OpenDev Enhancement 8 (Shadow Snapshots)

---

## Purpose

Automatic git snapshots of `~outputs/[project]/` at skill boundaries enable clean rollback without disrupting vault history. Every skill execution creates two checkpoints: pre-skill (before Layer 1) and post-skill (after Layer 4).

---

## Snapshot Points

### Pre-Skill Snapshot

| Field | Value |
|-------|-------|
| **When** | After Layer 0 completes (upstream loaded, validated) but BEFORE Layer 1 begins |
| **What** | Git commit + lightweight tag of `~outputs/[project]/` |
| **Label** | `pre-skill-[XX]-[name]` |
| **Purpose** | Enables clean rollback to "before this skill touched anything" |

### Post-Skill Snapshot

| Field | Value |
|-------|-------|
| **When** | After Layer 4 completes (all outputs written, execution log closed) |
| **What** | Git commit + lightweight tag of `~outputs/[project]/` |
| **Label** | `post-skill-[XX]-[name]` |
| **Purpose** | Marks a known-good state to return to |

---

## Snapshot Commands

### Creating a Pre-Skill Snapshot

```bash
# Stage only the project's output directory
git add "marketing-os/~outputs/[project]/"
git commit -m "snapshot: pre-skill-[XX]-[name] — [project]" --allow-empty
git tag "snapshot/[project]/pre-[XX]-[name]"
```

### Creating a Post-Skill Snapshot

```bash
git add "marketing-os/~outputs/[project]/"
git commit -m "snapshot: post-skill-[XX]-[name] — [project]" --allow-empty
git tag "snapshot/[project]/post-[XX]-[name]"
```

**CRITICAL:** Always use specific paths (`marketing-os/~outputs/[project]/`), never `git add -A` or `git add .`. Snapshots must not capture unrelated vault changes.

---

## Rollback Commands

### Rollback to Before a Skill Ran

```bash
git checkout "snapshot/[project]/pre-[XX]-[name]" -- "marketing-os/~outputs/[project]/"
```

### Rollback to After a Skill Completed (Revert a Later Skill's Damage)

```bash
git checkout "snapshot/[project]/post-[XX]-[name]" -- "marketing-os/~outputs/[project]/"
```

---

## When to Use Rollback

| Scenario | Rollback To | Action After |
|----------|-------------|-------------|
| Skill produced bad output, want to re-run | `pre-skill-[XX]` | Re-execute entire skill |
| Later skill corrupted earlier outputs | `post-skill-[XX]` (last good state) | Re-execute from corrupted skill forward |
| Arena produced contaminated results | `pre-skill-[XX]` | Re-run entire skill with fresh Arena |
| Human rejects skill output at checkpoint | `pre-skill-[XX]` | Re-execute with revised inputs |
| Foundation Integrity Check flags drift | `post-skill-[last-good]` | Investigate drift source before re-running |

---

## Agent Responsibilities

Since hooks cannot detect skill boundaries automatically, the agent MUST explicitly create snapshots:

1. **At Layer 0 completion:** Run pre-skill snapshot commands before starting Layer 1
2. **At Layer 4 completion:** Run post-skill snapshot commands after all outputs are written
3. **Log snapshot tags** in the execution log for each skill

### Execution Log Entry Format

```yaml
snapshots:
  pre_skill_tag: "snapshot/[project]/pre-[XX]-[name]"
  pre_skill_commit: "[short hash]"
  post_skill_tag: "snapshot/[project]/post-[XX]-[name]"
  post_skill_commit: "[short hash]"
```

---

## Cleanup

Snapshot tags accumulate per project. Clean up after project completion:

```bash
# List all snapshots for a project
git tag -l "snapshot/[project]/*"

# Delete all snapshots for a completed project
git tag -l "snapshot/[project]/*" | xargs git tag -d
```

---

## Interaction with Vault Git

- Snapshots use the vault's existing git repo — no additional infrastructure
- Snapshot commits are small (only `~outputs/[project]/` files) and lightweight tags
- Normal vault commits proceed independently — snapshot commits are additional history entries
- If vault has uncommitted changes outside `~outputs/`, snapshot commits are scoped and do not interfere
- Snapshot tags can be cleaned up after project completion with `git tag -d snapshot/[project]/pre-[XX]-[name]` per tag

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-10 | Initial creation — per-skill git snapshot protocol from OpenDev Enhancement 8 |
