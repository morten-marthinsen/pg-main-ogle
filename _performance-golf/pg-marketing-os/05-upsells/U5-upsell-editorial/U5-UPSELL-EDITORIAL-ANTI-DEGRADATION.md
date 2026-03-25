# U5 — Upsell Editorial ANTI-DEGRADATION.md

**Version:** 1.0
**Skill:** U5 — Upsell Editorial
**Mandatory Read:** YES — before ANY execution of U5

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: U5-UPSELL-EDITORIAL-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL: Score, identify issues, revise, and rescore the upsell sequence — using 7 upsell-specific lenses.
I WILL NOT: Invent gate statuses, skip baseline scoring, use direct fixes for P1/P2 issues,
            accept pieces < 7.5, or auto-complete without human review.
```

**Write this declaration to your first output file before executing any microskill.**

---

## FAILURE MODE TABLE

| # | Failure Mode | Detection | Response | Escalation |
|---|-------------|-----------|----------|------------|
| F1 | **No Baseline Scoring** — Revision applied without establishing baseline scores first | Check: does 1.1 output exist before 2.1 runs? | HALT. Run 1.1 first. Baseline is mandatory — cannot prove improvement without it. | — |
| F2 | **Direct Fix for P1/P2** — Critical or major issue resolved with direct fix instead of Arena | Check 2.1 output: all P1/P2 fix groups must reference Arena rounds | Return to 2.1. Run Arena for P1/P2 fix groups. No shortcuts. | — |
| F3 | **Piece Below 7.5 Accepted** — A piece scores below 7.5 but sequence marked as complete | Check 4.1 rescores: all pieces >= 7.5 | HALT. Return to Layer 2 for targeted revision of failing piece. | If 2 rounds don't reach 7.5, escalate to human. |
| F4 | **S-Criterion Ignored** — One or more S1-S5 criteria not checked or failure not addressed | Check 4.2 output: all 5 criteria scored with evidence | Run missing S-criterion checks. All 5 mandatory. | S1/S2 failures may require upstream changes. |
| F5 | **Revision Breaks Congruence** — Fix resolves the identified issue but introduces a congruence break | After each revision, check: mechanism name still present, root cause language still verbatim, promise still extended | Revert revision. Apply alternative fix that preserves congruence. | — |
| F6 | **Revision Introduces Selling** — Fix introduces pre-purchase selling language into post-purchase copy | After each revision, scan for: PAS structure, urgency language, fear-based framing, guilt-trip CTAs | Revert revision. Apply fix with post-purchase tone maintained. | — |
| F7 | **Revision Breaks Speed** — Fix adds significant word count, pushing piece or sequence past limits | After each revision, recount words. Bump <= 150w, Upsell <= 2000w, Downsell <= 1000w, Total < 4 min. | Revert if over limits. Apply fix that maintains brevity. | — |
| F8 | **Auto-Complete Without Human** — Sequence marked complete without human review of EDITORIAL-REPORT.md | GATE_3 requires HUMAN_REVIEW status | HALT. Present EDITORIAL-REPORT.md to human. Wait for explicit approval. | — |
| F9 | **Wrong Lenses Used** — Using Skill 20's 6 legendary copywriter lenses instead of U5's 7 upsell-specific lenses | Check scoring output: lens names should be Congruence Auditor, Speed Enforcer, Tone Guardian, Value Architect, Flow Specialist, CTA Optimizer, The Integrator | Rescore with correct lenses. U5 has its own editorial framework. | — |
| F10 | **U4 Flags Ignored** — U4 validation report flagged issues that U5 doesn't carry forward | Cross-reference U4 validation-report.md against U5 issue list | Add U4 flags to issue list with appropriate severity. | — |
| F11 | **Synthesized Output** — Multiple microskills combined into one file | Check: each microskill has its own output file | Delete combined file. Re-execute with dedicated files. | — |
| F12 | **Score Regression Not Flagged** — Revision causes a score to go DOWN but this isn't flagged | Check 4.1 output: compare baseline vs final per lens per piece. Any decrease = regression. | Flag regression. Revert fix if net negative. A "fix" that causes regression is not a fix. | — |

---

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "The bump is only 100 words — I'll skip detailed lens scoring" | NO. Every piece, every lens. The bump is short but still needs congruence, speed, tone, value, and CTA checks. |
| "This P1 issue has an obvious fix — Arena is overkill" | NO. P1/P2 = Arena. Always. The "obvious fix" might break congruence or tone. Arena generates alternatives. |
| "6.8 is close enough to 7.5" | NO. 7.5 is the minimum. 6.8 means the piece needs more revision. Close is not passing. |
| "I'll score after revision to save time" | NO. Baseline FIRST. You cannot prove improvement without a starting point. |
| "The sequence is ready — I'll note that human review is recommended" | NO. Human review is BLOCKING, not recommended. Gate 3 does not pass without explicit human approval. |
| "Skill 20's editorial lenses are more proven" | IRRELEVANT. U5 uses upsell-specific lenses. Skill 20's lenses are for 10,000+ word front-end promos. Upsell sequences are 1,500-3,000 words with completely different quality criteria. |
| "I'll combine the scoring and issue identification into one pass" | NO. Per-microskill output. 1.1 (scoring) and 1.2 (issue identification) are separate microskills with separate output files. |
| "The U4 validation already caught the congruence issue — I don't need to score it again" | U4 FLAGS issues. U5 SCORES, FIXES, and VERIFIES. Carry U4 flags forward as pre-identified issues, but still score independently. |

---

## BINARY GATE ENFORCEMENT

| Gate | PASS Condition | FAIL Condition |
|------|---------------|----------------|
| GATE_0 | Sequence loaded + scoring framework established + U4 flags carried forward | Sequence file missing OR scoring framework incomplete |
| GATE_1 | Baseline scores for all pieces (7 lenses each) + S1-S5 scored + all issues identified/tagged/clustered + revision plan created | Any piece unscored OR severity unclassified OR no revision plan |
| GATE_2 | All P1/P2 resolved via Arena + all P3/P4 resolved via direct fix + zero unresolved P1 | Any P1 unresolved OR Arena not run for P2 |
| GATE_3 | All pieces >= 7.5 + all S1-S5 pass + EDITORIAL-REPORT.md generated + HUMAN REVIEW explicit approval | Any piece < 7.5 OR any S-criterion fails OR no human review |

---

## PER-MICROSKILL OUTPUT TABLE

| Microskill | Output File | Contents |
|-----------|------------|----------|
| 0.1 Input Loader | `layer-0/0.1-input-context.md` | Loaded sequence, piece inventory, U4 flags carried forward |
| 0.2 Scoring Rubric Loader | `layer-0/0.2-scoring-rubric.md` | 7 lenses with scoring criteria, S1-S5 criteria, upsell constraints |
| 1.1 Baseline Scorer | `layer-1/1.1-baseline-scores.md` | Per piece x per lens scores (1-10), weighted averages, S1-S5 baseline |
| 1.2 Issue Identifier | `layer-1/1.2-issue-list.md` | All issues: severity, piece, lens, passage, problem, target fix |
| 1.3 Issue Clusterer | `layer-1/1.3-issue-clusters.md` | Fix groups, priority order, revision plan (Arena vs direct fix) |
| 2.1 Revision Executor | `layer-2/2.1-revisions.md` | Per fix group: method (Arena/direct), before text, after text, Arena selection info if applicable |
| 4.1 Rescore | `layer-4/4.1-rescores.md` | Per piece x per lens final scores, delta vs baseline, regression flags |
| 4.2 Sequence Criteria Validator | `layer-4/4.2-sequence-criteria.md` | S1-S5 pass/fail with evidence against revised sequence |
| 4.3 Output Packager | `upsell-sequence-final.md` + `EDITORIAL-REPORT.md` | Final polished sequence + comprehensive editorial report |

---

## PROJECT INFRASTRUCTURE

```
[project-dir]/U5-upsell-editorial/
├── layer-0/
│   ├── 0.1-input-context.md
│   └── 0.2-scoring-rubric.md
├── layer-1/
│   ├── 1.1-baseline-scores.md
│   ├── 1.2-issue-list.md
│   └── 1.3-issue-clusters.md
├── layer-2/
│   ├── 2.1-revisions.md
│   └── arena/  (if P1/P2 issues trigger Arena)
│       ├── fix-group-1/
│       │   ├── round-1/ through round-2/ + audience-evaluation/
│       │   └── synthesis/
│       └── fix-group-N/
├── layer-4/
│   ├── 4.1-rescores.md
│   ├── 4.2-sequence-criteria.md
│   └── 4.3-output-packager.md
├── checkpoints/
│   ├── GATE_0_VERIFIED.yaml
│   ├── GATE_1_VERIFIED.yaml
│   ├── GATE_2_VERIFIED.yaml
│   └── GATE_3_VERIFIED.yaml
├── upsell-sequence-final.md
└── EDITORIAL-REPORT.md
```

---

## STALE ARTIFACT CLEANUP

Before starting execution, check for and DELETE:
- Any `GATE_*.yaml` files from previous runs
- Any `upsell-sequence-final.md` from previous runs
- Any `EDITORIAL-REPORT.md` from previous runs
- Any microskill output files from previous runs
- Any `arena/` directory contents from previous runs

---

## ARENA EXECUTION CHECKLIST

```
LAYER 2.5 (ARENA -- MANDATORY, CANNOT BE SKIPPED):
[ ] ARENA-LAYER.md READ (MANDATORY — contains skill-specific judging criteria)
[ ] ARENA-CORE-PROTOCOL.md READ (path: ~system/protocols/ARENA-CORE-PROTOCOL.md)
[ ] ARENA-PERSONA-PANEL.md READ (path: ~system/protocols/ARENA-PERSONA-PANEL.md)
[ ] Persona names VERIFIED against protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect
[ ] All 7 competitors generated across 2 rounds + audience evaluation
[ ] Adversarial critique completed each round
[ ] Targeted revision completed each round
[ ] Post-Arena Synthesis: 2-3 hybrids created
[ ] 9-10 candidates presented to human
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-27 | Initial creation — 12 failure modes, 8 forbidden rationalizations, 4 gates, 9 per-microskill outputs, project infrastructure |
