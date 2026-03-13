# Marketing OS Quality Engine Audit

Requested outcome: review the target repository using Marc Stockman's Quality Engine and produce a final audit deliverable.

**Date:** 2026-03-06  
**Target:** repository-level audit of the marketing OS at the user-provided path  
**Grounding:** local file inspection and direct filesystem checks only  
**Gate Decision:** REVISE  
**Confidence:** High on structural findings, medium on runtime impact because no end-to-end skill execution was performed

## Success Criteria

- Understand how the repository is meant to operate.
- Identify current, live defects rather than repeating stale audit notes.
- Separate architecture strengths from execution risks.
- Produce a short, prioritized action list.

## Objective Intake + Skill 0

**Outcome framing**
- Desired outcome: determine whether the repository is structurally ready to be used as a dependable operating system for marketing work.
- Success signal: a grounded report that names the strongest assets, the highest-risk defects, and the next fixes to make.
- Audience: operator/owner of the system.

**Execution mode**
- Mode: Multi-phase, thorough.
- Reason: the target is a large documentation-native system with multiple sub-engines, cross-file routing, and prior audit history.

**Constraint ledger**
- Only make claims that can be verified from files on disk.
- Treat "run the quality engine" as a quality assessment of the repository itself, since the target is not a runnable binary application.
- Prioritize live defects over stylistic opinions.

## Phase 1: Strategic Reasoning

**Task type**
- Analysis / architecture audit

**Effort mode**
- Thorough

**Execution contract**
- Allowed: read architecture docs, count files, verify referenced paths, compare current state to prior audit notes
- Forbidden: claim end-to-end runtime validity without executing a full skill pipeline

**Key assumptions**
- High sensitivity: the repo's top-level docs are intended to be the operator's source of truth.
- High sensitivity: broken router paths materially affect execution because the system's own laws require reading those files before work starts.
- Medium sensitivity: mixed skill formats are intentional in some places, but still increase operator overhead.

## Phase 2-3: Reasoning Synthesis

The repository is a serious, documentation-first operating system with meaningful enforcement design. It has broad subsystem coverage, explicit handoff contracts, anti-degradation doctrine, and evidence of active self-correction.

Direct inspection also shows the system is in a hybrid state. Some subsystems are fully decomposed into `AGENT.md` plus `ANTI-DEGRADATION.md` patterns, while the core foundation and long-form pipelines are still `SKILL.md`-led. That does not make the system weak, but it does make the operator model inconsistent.

Quantitative signals from direct inspection:

- `skills/` contains 1,391 files.
- `landing-page-engine/` contains 548 files.
- `tier1-extractions/` contains 414 files.
- Foundation layer contains 9 `SKILL.md` files and 0 `AGENT.md` / `ANTI-DEGRADATION.md` files.
- Long-form layer contains 10 `SKILL.md` files and 0 `AGENT.md` / `ANTI-DEGRADATION.md` files.
- Ads layer contains 12 `SKILL.md` files plus 24 `AGENT.md` / `ANTI-DEGRADATION.md` files.
- Organic subsystem contains 24 `AGENT.md` files and 48 `AGENT.md` / `ANTI-DEGRADATION.md` files.

## Phase 4-6: Verified Findings

### 1. The root router is missing, but the system still depends on it

**What was verified**
- No root `CLAUDE.md` exists at the repository root.
- `CLAUDE-HISTORY.md` says the monolithic file was split into focused files plus a `CLAUDE.md` router.
- `organic-handoff.md` says the root router was updated to v4.4.
- `skills/organic/skills/production/S08-script-writing/S08-ANTI-DEGRADATION.md` still requires reading `marketing-os/CLAUDE.md` before execution.

**Why this matters**
- The system's own "read before you execute" law becomes impossible to follow literally.
- Operators are forced to guess whether `CLAUDE-CORE.md`, `CLAUDE-SKILL-INDEX.md`, or another file is the real entrypoint.
- This weakens the credibility of all mandatory read chains downstream.

**Recommendation**
- Either restore a real root `CLAUDE.md` router immediately, or remove every dependency on it and formally designate the new entry sequence.

### 2. Landing Page Engine routing still points to a nonexistent path

**What was verified**
- `CLAUDE-SKILL-INDEX.md` instructs operators to read `LandingPageEngine/CLAUDE.md`.
- `pipeline-handoff-registry.md` repeats the same path.
- The only `CLAUDE.md` present in the repository is `landing-page-engine/CLAUDE.md`.
- `LandingPageEngine/CLAUDE.md` does not exist.

**Why this matters**
- Cross-engine onboarding for landing page work is broken at the documentation layer.
- A system built on exact routing loses reliability when the path itself is wrong.

**Recommendation**
- Normalize all Landing Page Engine references to `landing-page-engine/CLAUDE.md` and add a simple path-integrity check to catch future regressions.

### 3. The repository uses multiple execution idioms at once

**What was verified**
- Foundation and long-form skills are `SKILL.md`-led, with zero top-level `AGENT.md` / `ANTI-DEGRADATION.md` wrappers.
- Ads and organic subsystems use the more decomposed `AGENT.md` + `ANTI-DEGRADATION.md` model.
- Some foundation skills already include microskill directories, which means the system is partially decomposed but not normalized.

**Why this matters**
- Operators must switch mental models between subsystems.
- Enforcement is not externalized uniformly.
- Maintenance cost rises because "how to execute a skill" depends on which engine you are in.

**Recommendation**
- Choose one of two paths:
- Path A: keep the hybrid model, but explicitly document it as intentional.
- Path B: finish decomposing foundation and long-form into the same wrapper pattern used by ads and organic.

### 4. Documentation truth is aging faster than the system itself

**What was verified**
- `ROADMAP.md` still treats `CLAUDE.md` as the master protocol in current-state sections.
- `implementation-plan-v3.6.md` still assigns updates to `CLAUDE.md`.
- `migration-audit-report.md` reported `09-campaign-brief` as missing, but the directory and layered structure exist now.
- Current search did not reproduce the earlier `PERSONA-SYSTEM.md` breakage noted in that audit.

**Why this matters**
- The repository is learning and changing, which is good.
- The reporting layer is not staying current enough to remain authoritative, which is bad.
- Operators cannot tell which audit findings are historical and which are still live without re-checking the filesystem.

**Recommendation**
- Add a single "current system map" file with a freshness date, and give audits an explicit validity window.

## What Is Working

- The structural-enforcement philosophy is strong. `CLAUDE-CORE.md`, `LLM-ANTI-DEGRADATION-SYSTEM.md`, and `claim-verification-protocol.md` show clear understanding that file-based gates beat instruction-only compliance.
- The repository has real subsystem breadth: foundation, long-form, ads, email, upsells, landing pages, organic, persona registries, and handoff infrastructure.
- The schema discipline is materially better than average. `pipeline-handoff-registry.md` demonstrates explicit field-level validation instead of file-exists theater.
- The system shows a real learning culture. `ROADMAP.md`, `CLAUDE-HISTORY.md`, `migration-audit-report.md`, and `boris-cherny-technical-audit.md` all reflect iterative improvement rather than static documentation.

## Risk Pre-Mortem

Assume the system is handed to a new operator and fails. The most likely root causes are:

1. The operator follows mandatory instructions and immediately hits missing router files.
2. The operator switches between subsystems and applies the wrong execution model because the repo is structurally hybrid.
3. The operator trusts a stale audit and wastes time fixing issues that no longer exist while missing current ones.

**Gate decision from pre-mortem:** REVISE, not ABSTAIN. The system is valuable and salvageable, but the routing truth needs tightening before broad operational use.

## Scorecard

| Dimension | Score (1-5) | Rationale |
|---|---:|---|
| Structural rigor | 4.5 | Strong anti-degradation and gating philosophy |
| Execution clarity | 2.5 | Missing root router and broken LP routing weaken actual usability |
| Cross-engine contract discipline | 4.0 | Handoff registry and schema thinking are strong |
| Self-learning discipline | 4.5 | Audits, history, and roadmap show real iteration |
| Maintainability | 3.0 | Hybrid architecture creates avoidable operator overhead |

**Composite:** 3.7 / 5  
**Verdict:** Strong system, but not yet cleanly self-routing

## Recommended Next Moves

1. Restore or formally retire the root `CLAUDE.md` router.
2. Fix every `LandingPageEngine/CLAUDE.md` and `marketing-os/CLAUDE.md` reference.
3. Publish one current-state map that names the official entry files for each engine.
4. Decide whether foundation and long-form remain `SKILL.md`-led by design or should be decomposed into the same wrapper model as ads and organic.

## What's Next

After the routing truth is fixed, the right next pass is a narrower execution audit: pick one foundation skill, one long-form skill, and one cross-engine handoff, then run them end-to-end to see whether the documented gates actually hold under live execution.
