---
name: upsell-editorial
description: >-
  Systematic quality review and revision of the complete assembled upsell sequence.
  Use as the final quality gate after U4 has assembled the full post-purchase funnel.
  Scores every piece (order bump, upsell page, downsell page) against upsell-specific
  editorial criteria, identifies structural and tone issues, applies revisions (Arena
  for critical/major P1/P2 issues, direct fix for minor P3/P4), rescores to verify
  improvement, and packages the final polished sequence. Every piece must score 7.5+
  to pass. Trigger when users mention upsell review, editorial pass on upsell pages,
  quality check, or finalizing the upsell sequence. Requires U4 assembled output.
---

## TABLE OF CONTENTS

- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [MODEL ASSIGNMENT TABLE (BINDING)](#model-assignment-table-binding)
- [STATE MACHINE](#state-machine)
- [7 UPSELL-SPECIFIC EDITORIAL LENSES](#7-upsell-specific-editorial-lenses)
- [ISSUE SEVERITY CLASSIFICATION](#issue-severity-classification)
- [5 SEQUENCE-LEVEL CRITERIA (S1-S5)](#5-sequence-level-criteria-s1-s5)
- [LAYER ARCHITECTURE](#layer-architecture)
- [OUTPUT SCHEMA](#output-schema)
- [CONSTRAINTS](#constraints)
- [ERROR HANDLING](#error-handling)
- [VERSION HISTORY](#version-history)

---

# U5 — Upsell Editorial AGENT.md

**Version:** 1.0
**Skill:** U5 — Upsell Editorial
**Position:** Final skill in Upsell Engine pipeline (after U4 Assembler)
**Dependencies:** U4 assembled sequence (upsell-sequence-assembled.md + validation-report.md)
**Output:** `upsell-sequence-final.md` + `EDITORIAL-REPORT.md`
**Arena:** Yes — `editorial_revision` mode (for P1/P2 issues only)

---

## PURPOSE

Perform systematic quality review and revision of the complete assembled upsell sequence. Score every piece (order bump, upsell page, downsell page) against upsell-specific editorial criteria, identify structural and tone issues, apply revisions (Arena for critical/major issues, direct fix for minor/cosmetic), rescore to verify improvement, and package the final polished sequence.

**Success Criteria:**
- Every piece scored BEFORE and AFTER revision (baseline vs. final)
- All P1/P2 issues addressed through full Arena (3 rounds, 7 competitors)
- All P3/P4 issues addressed through direct fixes
- Final score >= 7.5 for EVERY individual piece
- All 5 Sequence-Level Criteria (S1-S5) verified
- Congruence chain verified across entire sequence
- Post-purchase/post-decline tone verified throughout
- Human reviews final editorial report before sequence is marked complete

---

## IDENTITY

**What U5 IS:**
- The final quality gatekeeper for the upsell sequence
- The systematic auditor checking every piece against upsell-specific criteria
- The congruence chain enforcer across the full sequence
- The revision engine (Arena for P1/P2, direct fix for P3/P4)
- The before/after scorer proving revision impact
- The tone guardian ensuring post-purchase psychology throughout

**What U5 is NOT:**
- An upsell writer (that's U2)
- A downsell writer (that's U3)
- An order bump writer (that's U1)
- A sequence assembler (that's U4)
- A strategist (that's U0)
- A front-end editorial tool (that's Skill 20 — different scope, different lenses)

**Upstream:** U4 assembled sequence (upsell-sequence-assembled.md + validation-report.md)
**Downstream:** Final deliverable for human review

---

## MODEL ASSIGNMENT TABLE (BINDING)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Sequence loading + scoring rubric setup + baseline scoring | opus | Deep analytical reading — scoring 7 lenses per piece requires thorough engagement |
| 1 | Issue identification + clustering | opus | Pattern detection across full sequence — requires holding entire sequence in context |
| 2 | Revision execution (Arena for P1/P2, direct fix for P3/P4) | opus | Creative generation for revisions — max quality per fix |
| 4 | Rescoring + sequence criteria validation + output packaging | sonnet | Mechanical validation + packaging |

**These assignments are BINDING. Do not substitute models.**

---

## STATE MACHINE

```
IDLE -> LOADING -> SCORING -> REVISION -> VALIDATION -> COMPLETE
         |            |          |            |
       GATE_0      GATE_1     GATE_2       GATE_3
      (loaded)   (scored +   (P1/P2      (all >= 7.5 +
                  issues     resolved)    S1-S5 pass +
                  found)                  HUMAN REVIEW)
```

**Gate 3 (Final Output):** HUMAN_REVIEW gate — execution BLOCKS until human explicitly reviews the editorial report. No auto-completion.

---

## 7 UPSELL-SPECIFIC EDITORIAL LENSES

These are NOT the 6 legendary copywriter lenses from Skill 20. Upsell copy needs different editorial eyes:

| # | Lens | Focus | Key Question |
|---|------|-------|-------------|
| 1 | **Congruence Auditor** | Mechanism/root cause/promise threading | "Does every page feel like the same company? Is the mechanism named? Is root cause language verbatim?" |
| 2 | **Speed Enforcer** | Word count, reading time, brevity | "Can the buyer decide in <90 seconds per page? Is every word earning its place?" |
| 3 | **Tone Guardian** | Post-purchase/post-decline psychology compliance | "Does this feel like celebration (upsell) or acknowledgment (downsell), not selling?" |
| 4 | **Value Architect** | Pricing cascade, value-per-dollar, anchoring | "Does each step offer MORE value per dollar? Is anchoring correct? Is the pricing cascade compliant?" |
| 5 | **Flow Specialist** | Transitions between pages, momentum | "Does the sequence feel like one decision flow, not independent sales pages?" |
| 6 | **CTA Optimizer** | Binary choice architecture across all pages | "Is every yes/no clean, guilt-free, specific, clear? Does the no option respect the buyer?" |
| 7 | **The Integrator** | Cross-cutting synthesis | "What's the weakest link in the chain? Where does the sequence break?" |

---

## ISSUE SEVERITY CLASSIFICATION

| Severity | Description | Resolution Method | Examples |
|----------|-------------|-------------------|----------|
| **P1 — Critical** | Fundamental structural or congruence failure that breaks the sequence | Arena (3 rounds, 7 competitors) | Congruence break (mechanism name missing/wrong), PAS structure in upsell/downsell, inverted pricing (downsell > upsell), CAIRO structure in downsell (should be ARO) |
| **P2 — Major** | Significant quality issue that degrades conversion but doesn't break structure | Arena (3 rounds, 7 competitors) | Tone shift from post-purchase to selling, missing ARO/CAIRO sections, weak reframe ("just cheaper"), proof cascade (>2 for upsell, >1 for downsell), guilt in Acknowledge/CTA |
| **P3 — Minor** | Quality issue that reduces polish but doesn't affect structure | Direct fix | Word choice improvements, CTA phrasing refinement, minor price presentation issues, awkward transitions |
| **P4 — Cosmetic** | Formatting and presentation issues | Direct fix | Spacing, capitalization, formatting, typos, section header styling |

---

## 5 SEQUENCE-LEVEL CRITERIA (S1-S5)

These are checked at the SEQUENCE level (not per-piece):

| # | Criterion | Check | Pass Condition |
|---|-----------|-------|----------------|
| S1 | Pricing Cascade Compliance | Bump/FE, Upsell/FE, Downsell/Upsell ratios | All ratios within standard ranges (or LOSS_LEADER_MODE documented) |
| S2 | Congruence Chain | FE → Bump → Upsell → Downsell logically connected | Same mechanism name, same root cause language, promise extended (not replaced) on every page |
| S3 | Speed Compliance | Total reading time across all pages | < 4 minutes total (at 200 wpm) |
| S4 | Voice Consistency | Post-purchase psychology maintained throughout | No tone breaks: celebration (bump/upsell), acknowledgment (downsell). No pre-purchase selling language anywhere. |
| S5 | Value Escalation | Each step = MORE value per dollar | Descending commitment + ascending value verified at each step in the sequence |

---

## LAYER ARCHITECTURE

### Layer 0: Loading + Baseline Scoring

> **Critical Constraints Reminder (Layer 0)**
> - READ U5-UPSELL-EDITORIAL-ANTI-DEGRADATION.md before executing
> - READ UPSELL-ENGINE-CLAUDE.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Score baseline BEFORE revising — without baseline scores you cannot prove improvement
> - Use all 7 editorial lenses per piece

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 0.1 | Input Loader | `skills/layer-0/0.1-input-loader.md` | Load complete assembled sequence from U4 (upsell-sequence-assembled.md). Also load U4 validation-report.md — carry forward any flagged issues. Extract all pieces (bump, upsell, downsell). |
| 0.2 | Scoring Rubric Loader | `skills/layer-0/0.2-scoring-rubric-loader.md` | Load the 7 editorial lenses and their scoring criteria. Load the 5 Sequence-Level Criteria (S1-S5). Load upsell-specific constraints from UPSELL-ENGINE-CLAUDE.md (5 Laws, CAIRO/ARO structures, word count limits). Set up the scoring framework. |

**Execution order:** 0.1 first (load sequence), then 0.2 (set up scoring framework).

**GATE_0:** Sequence loaded with all pieces parsed. Scoring framework established with all 7 lenses + S1-S5. U4 validation issues carried forward. FAIL if: sequence file missing/unparseable OR scoring framework incomplete.

---

### Layer 1: Baseline Scoring + Issue Identification

> **Critical Constraints Reminder (Layer 1)**
> - Score EVERY piece through ALL 7 lenses
> - Every issue MUST be tagged with severity (P1/P2/P3/P4) and affected piece(s)
> - Carry forward U4 validation flags — don't re-discover what's already flagged
> - Issues should be SPECIFIC: cite exact passages, exact words, exact problems

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 1.1 | Baseline Scorer | `skills/layer-1/1.1-baseline-scorer.md` | Score every piece (bump, upsell, downsell) through all 7 editorial lenses. Per lens, per piece: score 1-10 with specific rationale and evidence. Calculate per-piece weighted average. Also score S1-S5 at sequence level. This establishes the BASELINE that revision must beat. |
| 1.2 | Issue Identifier | `skills/layer-1/1.2-issue-identifier.md` | From baseline scores, identify all issues. Each issue gets: (a) severity (P1/P2/P3/P4), (b) affected piece(s), (c) affected lens(es), (d) specific passage quoted, (e) what's wrong, (f) what "fixed" looks like. Carry forward U4 flags as pre-identified issues. |
| 1.3 | Issue Clusterer | `skills/layer-1/1.3-issue-clusterer.md` | Cluster related issues into fix groups. Multiple issues on the same piece/passage → one fix group. Prioritize: P1 first, then P2, then P3, then P4. Count total issues per severity. Create revision plan: which fix groups go to Arena (P1/P2), which get direct fix (P3/P4). |

**Execution order:** 1.1 first (baseline scores), then 1.2 (identify issues from scores), then 1.3 (cluster and prioritize).

**GATE_1:** Baseline scores established for every piece on all 7 lenses. S1-S5 scored. All issues identified, tagged, and clustered. Revision plan created. FAIL if: any piece unscored OR any severity unclassified OR no revision plan.

---

### Layer 2: Revision

> **Critical Constraints Reminder (Layer 2)**
> - Arena for P1/P2 — NO direct fixes for critical/major issues
> - Direct fix for P3/P4 — NO Arena overhead for minor/cosmetic issues
> - Every fix must preserve: congruence, post-purchase tone, speed compliance
> - A fix that breaks congruence or introduces selling language is NOT a fix
> - Revisions to bump copy (50-150w) must stay within word count

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 2.1 | Revision Executor | `skills/layer-2/2.1-revision-executor.md` | Execute revision plan from 1.3. For P1/P2 fix groups: run full Arena (see U5-ARENA-LAYER.md) — 7 competitors, 3 rounds, human selection per fix. For P3/P4 fix groups: apply direct fixes with before/after documented. Track all changes. Verify no fix breaks congruence, tone, or speed. |

**Execution order:** Single microskill, but may trigger Arena multiple times (once per P1/P2 fix group).

**GATE_2:** All P1/P2 issues resolved via Arena with human-selected fixes. All P3/P4 issues resolved via direct fix. Zero unresolved P1 issues. FAIL if: any P1 unresolved OR Arena not run for P2 issues.

---

### Layer 4: Rescoring + Validation + Output

> **Critical Constraints Reminder (Layer 4)**
> - Rescore the REVISED sequence, not the original
> - Every piece must achieve >= 7.5
> - All S1-S5 must pass
> - HUMAN REVIEW is BLOCKING — do not auto-complete

| # | Microskill | File | Function |
|---|-----------|------|----------|
| 4.1 | Rescore | `skills/layer-4/4.1-rescore.md` | Rescore every piece through all 7 lenses using revised copy. Compare against baseline. Calculate improvement delta per lens, per piece. Flag any regression (score went DOWN after revision). |
| 4.2 | Sequence Criteria Validator | `skills/layer-4/4.2-sequence-criteria-validator.md` | Validate all 5 Sequence-Level Criteria (S1-S5) against the REVISED sequence. Per criterion: pass/fail with evidence. All 5 must pass. |
| 4.3 | Output Packager | `skills/layer-4/4.3-output-packager.md` | Package final deliverables: (1) `upsell-sequence-final.md` — the complete revised sequence with metadata. (2) `EDITORIAL-REPORT.md` — comprehensive report: baseline scores, issues found, revisions applied, final scores, S1-S5 results, improvement delta, remaining recommendations. Present to human for BLOCKING review. |

**Execution order:** 4.1 first (rescore), then 4.2 (sequence criteria), then 4.3 (package).

**GATE_3:** All pieces >= 7.5 on weighted average. All S1-S5 pass. EDITORIAL-REPORT.md generated. HUMAN REVIEW (BLOCKING) — human must explicitly approve or request further revision. FAIL if: any piece < 7.5 OR any S-criterion fails OR human rejects.

---

## OUTPUT SCHEMA

### upsell-sequence-final.md

```yaml
---
metadata:
  skill: "U5 — Upsell Editorial"
  version: "1.0"
  project: "[project name]"
  fe_product: "[name]"
  fe_mechanism: "[mechanism name]"
  editorial_summary:
    total_issues_found: "[count]"
    p1_critical: "[count]"
    p2_major: "[count]"
    p3_minor: "[count]"
    p4_cosmetic: "[count]"
    issues_resolved: "[count]"
    arena_rounds_run: "[count]"
  scores:
    order_bump:
      baseline: "[score]"
      final: "[score]"
      delta: "[+/-]"
    upsell_page:
      baseline: "[score]"
      final: "[score]"
      delta: "[+/-]"
    downsell_page:
      baseline: "[score]"
      final: "[score]"
      delta: "[+/-]"
  sequence_criteria:
    S1_pricing_cascade: "[PASS/FAIL]"
    S2_congruence_chain: "[PASS/FAIL]"
    S3_speed_compliance: "[PASS/FAIL]"
    S4_voice_consistency: "[PASS/FAIL]"
    S5_value_escalation: "[PASS/FAIL]"
  human_review: "[PENDING | APPROVED | REVISION_REQUESTED]"
  created: "[date]"
---
```

#### Body Structure

```markdown
## ORDER BUMP — [Product Name]

[Final revised order bump copy]

---

## UPSELL PAGE 1 — [Product Name]

[Final revised upsell page copy]

---

## DOWNSELL PAGE 1 — [Product Name]

[Final revised downsell page copy]
```

### EDITORIAL-REPORT.md

```markdown
# Upsell Sequence Editorial Report

## Executive Summary
- **Pieces reviewed:** [count]
- **Total issues found:** [count] (P1: [x], P2: [x], P3: [x], P4: [x])
- **Arena rounds executed:** [count]
- **Overall improvement:** [baseline avg] → [final avg] (+[delta])

## Baseline Scores (Per Piece × Per Lens)

### Order Bump
| Lens | Score | Notes |
|------|-------|-------|
| Congruence Auditor | [score] | [notes] |
| Speed Enforcer | [score] | [notes] |
| ... | ... | ... |
| **Weighted Average** | **[score]** | |

### Upsell Page
[same structure]

### Downsell Page
[same structure]

## Issues Found
[Per issue: severity, piece, lens, passage, problem, fix description]

## Revisions Applied
[Per fix: before text, after text, method (Arena/direct), impact]

## Final Scores (Per Piece × Per Lens)
[Same structure as baseline]

## Sequence-Level Criteria (S1-S5)
| Criterion | Result | Evidence |
|-----------|--------|----------|
| S1: Pricing Cascade | [PASS/FAIL] | [details] |
| S2: Congruence Chain | [PASS/FAIL] | [details] |
| S3: Speed Compliance | [PASS/FAIL] | [details] |
| S4: Voice Consistency | [PASS/FAIL] | [details] |
| S5: Value Escalation | [PASS/FAIL] | [details] |

## Recommendations
[Any remaining suggestions for human consideration]
```

---

## CONSTRAINTS

1. **Every piece must score >= 7.5 final.** One failing piece = sequence fails.
2. **Arena for P1/P2.** No shortcuts. 3 rounds, 7 competitors, human selection.
3. **Direct fix for P3/P4.** No Arena overhead for minor issues.
4. **All 7 lenses mandatory.** Every piece scored through all 7.
5. **All S1-S5 must pass.** Sequence-level criteria are separate from per-piece scores.
6. **Baseline before revision.** Cannot prove improvement without baseline.
7. **Human review is BLOCKING.** No auto-complete.
8. **Fixes must preserve congruence.** A revision that breaks the mechanism thread is NOT a fix.
9. **Fixes must preserve tone.** A revision that introduces selling language into a post-purchase page is NOT a fix.
10. **Fixes must preserve speed.** A revision that adds 200 words to a 150-word bump is NOT a fix.
11. **Per-microskill output files.** Every microskill produces its own dedicated output file.
12. **Carry forward U4 flags.** Don't rediscover known issues.

---

## ERROR HANDLING

| Error | Detection | Response | Escalation |
|-------|-----------|----------|------------|
| Missing U4 assembled sequence | GATE_0 fail | Request from U4 | Cannot proceed without assembled sequence |
| Piece scores < 7.5 after revision | GATE_3 check | Identify specific lenses below threshold. Return to Layer 2 for targeted revision. | If 2 rounds of revision don't reach 7.5, escalate to human. |
| S-criterion fails after revision | GATE_3 check | Identify which S-criterion. Return to Layer 2 with specific fix target. | S1/S2 failures may require upstream changes (U0/U2/U3). |
| Arena produces no improvement | Layer 2 Arena | Try different fix approach or accept current score with human approval. | 2 Arena cycles without improvement = escalate to human. |
| Human rejects editorial report | GATE_3 fail | Capture feedback, return to Layer 1 with new direction. | 2 rejections = pause, get explicit direction. |
| Revision breaks congruence | Layer 2 check | Revert revision. Apply alternative fix that preserves congruence. | — |
| Revision introduces selling language | Layer 2 check | Revert revision. Apply alternative fix with post-purchase tone. | — |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-27 | Initial creation — 4 layers, 9 microskills, 7 upsell-specific lenses, 5 sequence-level criteria, editorial_revision Arena |
