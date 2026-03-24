# Romeo — Veda Contributor Runbook

> **This file is for the AI tool (Claude Code / Anti-Gravity), not for Romeo to read manually.**
> The AI reads this file on session start and executes the setup, checks, and protocols automatically.

---

## Identity

Romeo is a video editor contributing to Veda (the Video Editing Agent) within Performance Golf's Creative OS. His focus areas are two expansion types:
- **Hook Stack (hs)** — vertical expansion. Stacking a new hook on the front of an existing winning asset.
- **Environment Change (env)** — horizontal expansion. Changing the visual setting while keeping presenter and script.

Romeo works in his own fork of Christopher's repo. All changes go through PR review before merging.

---

## First Session — Automated Setup

Run these checks in order. If any step fails, HALT and report the issue to Romeo.

### Step 1: Verify Git Fork & Remotes

```bash
# Check if remotes are configured
git remote -v
```

**Expected state:**
- `origin` → Romeo's fork (e.g., `https://github.com/<romeo-username>/pg-main-ogle.git`)
- `upstream` → Christopher's repo (`https://github.com/christophero90/pg-main-ogle.git`)

**If `upstream` is missing:**
```bash
git remote add upstream https://github.com/christophero90/pg-main-ogle.git
git fetch upstream
```

**If this is a fresh clone with no fork yet:**
1. Tell Romeo: "You need to fork Christopher's repo first. Go to https://github.com/christophero90/pg-main-ogle and click 'Fork' in the top right."
2. Once forked, Romeo clones his fork locally.
3. Then configure `upstream` as shown above.

### Step 2: Verify Branch

```bash
git branch --show-current
```

**Expected:** `pg-dev-romeo`

**If branch doesn't exist:**
```bash
git fetch upstream
git checkout -b pg-dev-romeo upstream/main
git push -u origin pg-dev-romeo
```

### Step 3: Sync with Upstream

```bash
git fetch upstream
git log upstream/main --oneline -1
git log pg-dev-romeo --oneline -1
```

**If behind upstream/main:**
```bash
git merge upstream/main
```

Resolve any conflicts. If conflicts are in files outside `veda-video-editing-agent/`, tell Romeo — those are likely Christopher's changes in other agents.

### Step 4: Environment Check

```bash
cd _performance-golf/pg-creative-os/veda-video-editing-agent
npm install
npx tsc --noEmit
npm test
npm run build
```

**All 4 must succeed.** If any fails, HALT — do not proceed with work until the environment is clean.

Report to Romeo:
- TypeScript: PASS/FAIL (error count)
- Tests: PASS/FAIL (test count — baseline is 879)
- Build: PASS/FAIL

### Step 5: Read Veda Context

Read these files in order before any work begins:
1. `SESSION-LOG.md` — Build State block only (top ~25 lines). This is the current state snapshot.
2. `CLAUDE.md` — Session protocol, non-negotiables, structural gates (this entire file).
3. `VEDA-ANTI-DEGRADATION.md` — 6 structural gates, forbidden rationalizations (this entire file).

**Do NOT read on first session (too large, not needed for contributor work):**
- VEDA-MASTER-AGENT.md (366 lines — use Grep for specific sections)
- VEDA-SUB-AGENTS.md (1074 lines — use Grep for specific sub-agent specs)
- VEDA-PRD.md (849 lines — use Grep for specific requirements)

---

## Every Session — Automated Protocol

Run these checks at the START of every session, before any work.

### 1. Sync Check

```bash
git fetch upstream
git log upstream/main..pg-dev-romeo --oneline | wc -l  # Romeo's commits ahead
git log pg-dev-romeo..upstream/main --oneline | wc -l  # Commits behind upstream
```

**If behind upstream:** Merge before starting work.
```bash
git merge upstream/main
```

### 2. Environment Verify

```bash
cd _performance-golf/pg-creative-os/veda-video-editing-agent
npx tsc --noEmit && npm test
```

If either fails before Romeo has made any changes, the upstream merge introduced a problem. HALT and report.

### 3. Read Build State

```bash
# Read only the Build State block
```
Read `SESSION-LOG.md` top ~25 lines. Report current session number, test count, and any blockers.

### 4. Begin Work

Romeo describes what he wants to work on. Follow Phase-Stop Discipline:
- State phases and "done" criteria before starting
- One phase, one stop, report, wait for confirmation
- Never combine phases

---

## Pre-Push Gate (MANDATORY)

Before ANY `git push`, run all 3 checks:

```bash
cd _performance-golf/pg-creative-os/veda-video-editing-agent
npx tsc --noEmit && npm test && npm run build
```

**ALL must pass. No exceptions. No `--no-verify`.**

- TypeScript errors → fix before push
- Test failures → fix before push (test count must NOT decrease below baseline)
- Build failure → fix before push

Only after all 3 pass:
```bash
git push origin pg-dev-romeo
```

---

## PR Creation Guide

When Romeo is ready to submit work for Christopher's review:

```bash
# Push latest changes
git push origin pg-dev-romeo

# Verify all gates pass
npx tsc --noEmit && npm test && npm run build
```

Then tell Romeo to open a PR on GitHub:
- **From:** `<romeo-username>/pg-main-ogle` branch `pg-dev-romeo`
- **To:** `christophero90/pg-main-ogle` branch `main`
- **Title:** Brief description of changes (e.g., "Improve hook stack assembly workflow")
- **Body:** What was changed, what expansion type(s) affected, test results (count + pass/fail)

If Romeo prefers, use `gh` CLI:
```bash
gh pr create --repo christophero90/pg-main-ogle --base main --head <romeo-username>:pg-dev-romeo --title "..." --body "..."
```

---

## Scope Boundaries (ENFORCED)

### Romeo CAN modify:
- `_performance-golf/pg-creative-os/veda-video-editing-agent/` — all files within Veda
- Specifically: `src/expansion-agents/hook-stack/` and `src/expansion-agents/environment/`
- Tests for the above
- `SESSION-LOG.md` (Veda's session log only)

### Romeo CANNOT modify (BLOCK any attempt):
- `orion-chief-of-staff/` — Christopher's private operations, daily briefings, personal bot
- `neco-neurocopy-agent/` — Copy agent, not Romeo's scope
- `tess-strategic-scaling-system/` — Data pipeline internals (Romeo reads `TESS-NAMING-CONVENTION.md` only)
- `.claude/` — Machine-specific Claude Code configuration
- Any `SESSION-LOG.md` outside Veda
- `WORKSPACE.md` or root `CLAUDE.md` — repo-level governance files

**If Romeo asks to modify a blocked file:** Explain that changes to those files go through Christopher directly. Romeo's scope is Veda.

---

## Non-Negotiable Rules (Machine-Enforced)

These rules apply to every change Romeo makes. The AI must enforce them.

1. **Root Angle Principle is sacred.** Every expansion MUST preserve the root angle unchanged. Root angles come from SSS Column C — never fabricated. If a root angle is missing or uncertain, HALT. Do not guess.

2. **15-position naming convention compliance.** Every Asset ID must comply with `TESS-NAMING-CONVENTION.md` (v3.10). Position 7 (AdCategory) is the SOLE indicator of Net New vs Expansion.

3. **Hook stack = stacking on front.** A hook stack places a new hook clip on the front of an existing winning asset. The source asset's body and CTA remain unchanged. This is NOT swapping or replacing the hook.

4. **No new dependencies without Christopher's approval.** Before adding any npm package, library, or external tool — stop and tell Romeo to check with Christopher first.

5. **Match existing patterns.** Before writing new code, look at how the other expansion agents are structured. Follow the `ExpansionAgent` interface (`src/expansion-agents/types.ts`).

6. **Test count must not decrease.** Current baseline: 879 tests. Romeo's changes can add tests but must never reduce the count.

---

## Key Files for Romeo's Work

### Expansion Agent Architecture
- `src/expansion-agents/types.ts` — The `ExpansionAgent` interface contract (validate + execute)
- `src/expansion-agents/registry.ts` — Maps type codes to agents
- `src/expansion-agents/init.ts` — Registers all agents on startup

### Hook Stack (hs — vertical)
- `src/expansion-agents/hook-stack/index.ts` — Hook stack agent implementation
- `src/utils/hook-selector.ts` — Hook clip selection logic
- `src/utils/ffmpeg-executor.js` — `buildHookStackArgs()` function

### Environment Change (env — horizontal)
- `src/expansion-agents/environment/index.ts` — Environment agent (v1 clip overlay + v2 AI pipeline)
- `src/utils/ai-client.ts` — AI client for FAL BiRefNet + Flux (env v2)

### Naming & Types
- `src/types/pipeline.ts` — IntakeData, AssetIdPositions, EditOperation types
- `src/tables/` — Code lookup tables
- `../tess-strategic-scaling-system/TESS-NAMING-CONVENTION.md` — 15-position Asset ID standard (READ ONLY)

---

## Session End Protocol

At the end of each work session:

1. Run pre-push gate (tsc + test + build)
2. If all pass and there are uncommitted changes, commit with a descriptive message
3. Push to `origin pg-dev-romeo`
4. Append session summary to `SESSION-LOG.md` (Veda's)
5. Report to Romeo: what changed, test results, next steps
