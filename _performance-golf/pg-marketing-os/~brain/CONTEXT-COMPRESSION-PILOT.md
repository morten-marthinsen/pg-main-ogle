# Context Compression Pilot — Plan

**Version:** 1.0
**Created:** 2026-03-07
**Status:** PLAN — awaiting audit results review before execution
**Depends on:** CONTEXT-BUDGET-AUDIT.md findings

---

## TABLE OF CONTENTS

- [Purpose](#purpose)
- [Candidate Selection](#candidate-selection)
- [Compression Proposals](#compression-proposals)
- [Quality Comparison Protocol](#quality-comparison-protocol)
- [Results Template](#results-template)

---

## Purpose

The Context Budget Audit identified several skills exceeding optimal token loads. This pilot tests 2-3 compression techniques on the highest-load skills to determine if context can be reduced without quality degradation.

**Success criteria:** Compressed execution produces output within 0.5 score points of full-context execution across all quality dimensions.

**Rejection criteria:** Any quality dimension drops by >0.5 points → reject that compression technique.

---

## Candidate Selection

Based on CONTEXT-BUDGET-AUDIT.md findings, select 2-3 highest-load skills for pilot:

### Primary Candidates

| Skill | Current Load | Why Selected |
|-------|-------------|-------------|
| 01-Research | ~632K tokens (RED) | Highest load, heaviest skill files |
| 12-Story | ~294K tokens (ORANGE) | Highest copy generation skill, many microskill files |
| 06-Big Idea | ~203K tokens (ORANGE) | Highest foundation skill after Research |

### Selection Criteria

1. Load exceeds 200K tokens (ORANGE or RED zone)
2. Skill has multiple large files that could be split or conditionally loaded
3. Skill is used frequently enough that compression savings compound

---

## Compression Proposals

### Proposal A: CLAUDE-SKILL-INDEX Splitting — IMPLEMENTED

**Status:** IMPLEMENTED (2026-03-08)

**What was done:** Split CLAUDE-SKILL-INDEX.md into 24 per-skill files in `skills/skill-index/`. Original renamed to `CLAUDE-SKILL-INDEX-FULL.md` as master reference. All references updated across CLAUDE-CORE.md, OPERATIONS-MANUAL.md, audit script, and CONTEXT-BUDGET-AUDIT.md.

```
skills/skill-index/
  01-research.md
  02-proof-inventory.md
  ...
  20-editorial.md
  email-engine.md
  upsell-engine.md
  ad-engine.md
  landing-page-engine.md
```

**Actual savings:** ~5-6K tokens per skill execution (~120K cumulative across 21 skills)

**Risk realized:** None — sections were self-contained as predicted

### Proposal B: CLAUDE-CORE Conditional Loading

**Current state:** CLAUDE-CORE.md is loaded in full (~25KB, ~6.5K tokens) for every skill, but copy skills (10-20) don't need the full foundation protocol sections.

**Proposed change:** Split CLAUDE-CORE.md into:
- `CLAUDE-CORE-UNIVERSAL.md` — laws, MC-CHECK, output protocol, forbidden behaviors (~15KB)
- `CLAUDE-CORE-FOUNDATION.md` — foundation-specific protocols (~5KB, loaded for 00-09 only)
- `CLAUDE-CORE-GENERATION.md` — generation-specific protocols (~5KB, loaded for 10-20 only)

**Expected savings:** ~2-3K tokens per skill execution

**Risk:** Medium — must ensure no universal rules are accidentally excluded from split files

### Proposal C: Upstream Package Summarization

**Current state:** Copy skills (11-17) load full upstream packages from all foundation skills. Some of these packages contain detailed scoring breakdowns not needed for generation.

**Proposed change:** Create summarized upstream packages that retain essential fields but compress verbose scoring details:
- Keep: selected values, names, key decisions
- Remove: detailed scoring matrices, alternative candidates, reasoning chains
- Size target: <50% of original

**Expected savings:** Varies by skill — estimated 20-50K tokens for late-pipeline skills

**Risk:** Medium-High — must validate that no essential generation context is lost

---

## Quality Comparison Protocol

### Method

For each compression proposal:

1. **Baseline run:** Execute skill with full context loading (current state)
2. **Compressed run:** Execute same skill with compressed context
3. **Scoring:** Score both outputs across all quality dimensions using the skill's standard evaluation criteria
4. **Comparison:** Calculate per-dimension score deltas

### Acceptance Criteria

| Criterion | Threshold | Action |
|-----------|-----------|--------|
| All dimensions within 0.5 | ACCEPT | Proceed with compression |
| 1-2 dimensions drop 0.5-1.0 | INVESTIGATE | Check if drop is in critical vs secondary dimensions |
| Any dimension drops >1.0 | REJECT | Do not compress — quality cost too high |
| Score IMPROVES with compression | NOTE | Document — less context clutter may help focus |

### Comparison Template

```markdown
## Compression Test: [Proposal X] on [Skill Y]

**Date:** [date]
**Baseline tokens:** [count]
**Compressed tokens:** [count]
**Savings:** [count] ([percentage])

### Score Comparison

| Dimension | Baseline | Compressed | Delta |
|-----------|----------|------------|-------|
| [dim1]    | [score]  | [score]    | [+/-] |
| [dim2]    | [score]  | [score]    | [+/-] |

### Verdict: [ACCEPT / INVESTIGATE / REJECT]
### Notes: [observations]
```

---

## Results Template

Fill in as pilots are executed:

### Pilot 1: [Proposal] on [Skill]
**Status:** NOT STARTED
**Results:** —

### Pilot 2: [Proposal] on [Skill]
**Status:** NOT STARTED
**Results:** —

### Pilot 3: [Proposal] on [Skill]
**Status:** NOT STARTED
**Results:** —

---

## Phase C: Full Rollout Plan (Upgrade 1.1C)

**Status:** Awaiting pilot results before execution

After pilot results are reviewed and compression techniques validated:

### Rollout Sequence

1. **Foundation Skills (00-09)** — Implement accepted compressions
   - Apply CLAUDE-SKILL-INDEX splitting
   - Apply CLAUDE-CORE conditional loading (if Proposal B accepted)
   - Verify no quality regression on known test inputs
   - Human spot-check at each skill

2. **Copy Generation Skills (10-20)** — Implement accepted compressions
   - Apply upstream package summarization (if Proposal C accepted)
   - Apply CLAUDE-SKILL-INDEX splitting
   - Run quality comparison on 2-3 skills with known inputs
   - Human spot-check

3. **Branch Engines (Ads, Email, Organic, Upsell)** — Apply same patterns
   - Branch engines reference foundation outputs, so compression patterns propagate
   - Verify branch engine skills load compressed files correctly

4. **Re-Audit** — Run `scripts/audit_context_load.py` on fully compressed system
   - Compare before/after token loads per skill
   - Verify Standard-tier skills stay under 200K
   - Update SESSION-ARCHITECTURE.md token estimates

5. **Documentation Update**
   - Update ROADMAP.md Phase 6 status
   - Update OPERATIONS-MANUAL.md with compression notes
   - Update upstream loader comments in AGENT.md files

### Rollout Guardrails

- **One engine at a time.** Don't compress all engines simultaneously.
- **Known test input.** Every compressed skill is tested against a known input before going live.
- **Revertible.** Git commit per skill compression — easy to revert individual changes.
- **Human spot-check.** Human reviews 2-3 outputs per engine before proceeding.
- **Quality floor.** If ANY skill shows >0.5 degradation during rollout, halt and investigate.

### Cost Impact Targets

| Tier | Target Load After Compression | Current Estimate |
|------|------------------------------|------------------|
| Quick | <100K per skill | Variable |
| Standard | <200K per session | 120-180K (Session 5) |
| Full | <500K per session (premium justified) | 150-250K (Session 6) |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — pilot plan with 3 compression proposals |
| 1.1 | 2026-03-07 | Added Phase C rollout plan, rollout guardrails, cost impact targets |
