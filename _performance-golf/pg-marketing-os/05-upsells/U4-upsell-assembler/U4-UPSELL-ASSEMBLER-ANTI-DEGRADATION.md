# U4 — Upsell Sequence Assembler ANTI-DEGRADATION.md

**Version:** 1.0
**Skill:** U4 — Upsell Sequence Assembler
**Mandatory Read:** YES — before ANY execution of U4

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: U4-UPSELL-ASSEMBLER-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL: Assemble and validate the upsell sequence — NOT rewrite copy.
I WILL NOT: Invent gate statuses, generate new copy, skip validation dimensions,
            accept drift >15%, or combine microskill outputs.
```

**Write this declaration to your first output file before executing any microskill.**

---

## FAILURE MODE TABLE

| # | Failure Mode | Detection | Response | Escalation |
|---|-------------|-----------|----------|------------|
| F1 | **Copy Rewriting** — Agent rewrites or "improves" upstream copy instead of assembling it verbatim | Compare assembled text against source files. Any differences beyond whitespace/formatting = rewriting. | Revert to original text. U4 assembles, it does NOT edit. | If copy needs improvement, that's U5's job. |
| F2 | **Missing Piece Ignored** — Agent proceeds with assembly despite a missing upstream piece in Mode A | GATE_0 check: all 4 required inputs present for Mode A | HALT. Request missing piece. Do NOT assemble partial sequence in Mode A. | Switch to Mode B (partial) only with human approval. |
| F3 | **Validator Skipped** — One or more of the 5 validators not run | Check output directory: must have 5 validator output files (1.1 through 1.5) | Run missing validator(s). All 5 are mandatory. | — |
| F4 | **Thread Violation Dismissed** — Mechanism name missing from a page but not flagged as a failure | Scan 1.2 output for mechanism name check on every page | Re-run 1.2 with explicit per-page mechanism name verification | Thread violations are GATE_1 failures. |
| F5 | **Pricing Cascade Not Checked** — Prices assembled without ratio validation | Check for 1.4 output with actual ratio calculations | Run 1.4. Pricing cascade is a hard constraint. | — |
| F6 | **Speed Violation Ignored** — Total reading time >4 minutes but not flagged | Check 1.5 output for total word count / reading time calculation | Flag for U5 with speed reduction recommendation. | If way over (>6 min), escalate to human. |
| F7 | **Drift Report Missing** — Assembly packaged without deviation measurement against U0 plan | Check 4.1 output for drift analysis | Re-run with explicit U0 comparison. Drift report is mandatory. | — |
| F8 | **E0 Handoff Missing** — Only U5 handoff generated, E0 email strategy handoff omitted | Check for e0-handoff.yaml in output | Generate E0 handoff. Both handoffs required. | — |
| F9 | **Synthesized Output** — Multiple microskills combined into one file | Check output directory: each microskill must have its own file | Delete combined file. Re-execute with dedicated files. | — |
| F10 | **Arena-Selected Copy Not Used** — Assembly uses pre-Arena draft instead of Arena-selected version from U2/U3 | Cross-reference assembled text against Arena-selected outputs (GATE_2.5 checkpoints in U2/U3 project dirs) | Replace with Arena-selected version. CRITICAL: this exact error happened with Skill 19 — pre-Arena draft was assembled instead of Arena hybrid. | — |

---

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "I'll just clean up this sentence while assembling" | NO. U4 does NOT edit copy. That's U5's job. Assemble verbatim. |
| "The mechanism name is slightly different on one page but close enough" | NO. Mechanism name must be EXACT across all pages. Flag the discrepancy for U5. |
| "The pricing cascade is slightly off but within reason" | NO. Check against U0 ratios. If off, document the exact deviation. LOSS_LEADER_MODE is the only exception. |
| "Speed is 4.2 minutes — close enough" | NO. < 4 minutes is the threshold. 4.2 minutes = FAIL. Flag for U5 trimming. |
| "I don't need to generate the E0 handoff — that's optional" | NO. Both handoffs (U5 + E0) are required. E0 needs the upsell sequence data for email strategy. |
| "One validator flagged issues but the others are fine, so I'll pass GATE_1" | GATE_1 evaluates total failures. >3 failures across all validators = systemic issue = FAIL regardless of which validator caught them. |
| "The draft I'm using looks like the final version" | CHECK. Verify it's the Arena-selected version by looking for GATE_2.5 checkpoint files. Pre-Arena drafts look similar but are NOT the approved versions. This error cost an entire session with Skill 19. |

---

## BINARY GATE ENFORCEMENT

| Gate | PASS Condition | FAIL Condition |
|------|---------------|----------------|
| GATE_0 | All upstream outputs loaded + mode determined | Mode A: any of 4 required inputs missing. Mode B: less than U0 + 1 copy piece. |
| GATE_1 | All 5 validators complete + total failures across all validators <= 3 | Any validator incomplete OR total failures > 3 (systemic issue) |
| GATE_2 | Assembled sequence complete + validation report with all 5 dimensions + drift < 15% + U5 handoff + E0 handoff generated | Assembled doc missing pieces OR validation report incomplete OR drift >= 15% OR either handoff missing |

---

## PER-MICROSKILL OUTPUT TABLE

| Microskill | Output File | Contents |
|-----------|------------|----------|
| 0.1 Input Loader | `layer-0/0.1-input-context.md` | Loaded pieces, extracted key fields, mode determination, piece inventory |
| 1.1 Sequence Collector | `layer-1/1.1-sequence-order.md` | Ordered sequence with piece boundaries, word counts, funnel map |
| 1.2 Narrative Thread Validator | `layer-1/1.2-thread-validation.md` | Per-thread check: mechanism name per page, root cause count, promise extension per page, buyer validation per page, price anchoring |
| 1.3 Congruence Chain Validator | `layer-1/1.3-congruence-chain.md` | Page-to-page congruence check: FE→Bump, Bump→Upsell, Upsell→Downsell. Language register, tone progression, mechanism consistency |
| 1.4 Pricing Cascade Validator | `layer-1/1.4-pricing-cascade.md` | Ratio calculations: Bump/FE, Upsell/FE, Downsell/Upsell. Pass/fail per ratio. LOSS_LEADER_MODE check. |
| 1.5 Speed Validator | `layer-1/1.5-speed-validation.md` | Per-page word count + reading time. Total reading time. Pass/fail vs 4-minute threshold. |
| 4.1 Sequence Packager | `upsell-sequence-assembled.md` + `validation-report.md` | Full assembled sequence with metadata + comprehensive validation report with drift analysis |
| 4.2 Handoff Generator | `e0-handoff.yaml` | Structured email strategy handoff data |

---

## PROJECT INFRASTRUCTURE

```
[project-dir]/U4-upsell-assembler/
├── layer-0/
│   └── 0.1-input-context.md
├── layer-1/
│   ├── 1.1-sequence-order.md
│   ├── 1.2-thread-validation.md
│   ├── 1.3-congruence-chain.md
│   ├── 1.4-pricing-cascade.md
│   └── 1.5-speed-validation.md
├── layer-4/
│   └── [packager + handoff outputs go to project root]
├── checkpoints/
│   ├── GATE_0_VERIFIED.yaml
│   ├── GATE_1_VERIFIED.yaml
│   └── GATE_2_VERIFIED.yaml
├── upsell-sequence-assembled.md
├── validation-report.md
└── e0-handoff.yaml
```

---

## STALE ARTIFACT CLEANUP

Before starting execution, check for and DELETE:
- Any `GATE_*.yaml` files from previous runs
- Any `upsell-sequence-assembled.md` from previous runs
- Any `validation-report.md` from previous runs
- Any `e0-handoff.yaml` from previous runs
- Any microskill output files from previous runs

---

## CRITICAL: ARENA-SELECTED COPY VERIFICATION

**This has failed before.** Skill 19 (Campaign Assembly) used a pre-Arena section-2B-draft.md instead of the Arena-selected Hybrid A, resulting in the entire lead being missing from the assembled draft.

**Before assembling U2 output:** Check for GATE_2.5_HUMAN_SELECTED.yaml in U2's project directory. The file specified in that checkpoint is the Arena-selected version.

**Before assembling U3 output:** Check for GATE_2.5_HUMAN_SELECTED.yaml in U3's project directory. Same verification.

**If GATE_2.5 checkpoint files don't exist:** The upstream skill may not have completed Arena. HALT and request clarification.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-27 | Initial creation — 10 failure modes, 7 forbidden rationalizations, 3 gates, 8 per-microskill outputs, Arena-selected copy verification, project infrastructure |
