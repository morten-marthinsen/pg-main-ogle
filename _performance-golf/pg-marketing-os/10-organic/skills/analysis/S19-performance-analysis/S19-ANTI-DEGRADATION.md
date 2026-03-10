# S19-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-05
**Purpose:** STRUCTURAL enforcement to prevent performance analysis skill process breakdown
**Authority:** This document has EQUAL authority to ORGANIC-ENGINE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S19-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Report metrics without explaining WHY. Skip predicted vs actual comparison or accept vanity metrics only. Omit learning flags required for S20 handoff.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI reports metrics without explaining WHY
- AI skips predicted vs actual comparison
- AI accepts vanity metrics only (views without engagement)
- AI skips variance analysis when predictions miss
- AI produces analysis before minimum window
- AI doesn't set learning flags for S20

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: FORBIDDEN RATIONALIZATIONS

| Forbidden Phrase | Why It's Forbidden | Correct Response |
|-----------------|-------------------|------------------|
| "Analysis window is close enough" | Minimum windows are exact | Stop. Wait for minimum window completion. |
| "Variance explanation isn't needed" | WHY is mandatory | Stop. Explain deviation factors. |
| "Views are all that matter" | Engagement depth required | Stop. Track saves, shares, follows. |
| "Prediction comparison can wait" | Calibration is core purpose | Stop. Compare predicted vs actual now. |
| "Learning flags aren't necessary" | S20 dependency | Stop. Set all applicable flags. |

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

| Element | Minimum | Actual | Verified |
|---------|---------|--------|----------|
| Predicted vs actual comparison | REQUIRED | ___ | ☐ |
| Variance analysis (if deviation >20%) | REQUIRED | ___ | ☐ |
| Meaningful metrics (beyond views) | 3+ | ___ | ☐ |
| WHY explanations | Per insight | ___ | ☐ |
| Learning flags set | >= 1 | ___ | ☐ |
| Minimum analysis window met | Yes | ___ | ☐ |

---

## STRUCTURAL FIX 3: FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| Analysis before minimum window | Check timestamp vs posting time | REJECT analysis, wait for window | Immediate halt |
| Missing virality calibration | Check virality_calibration section exists | REJECT PAR, require calibration | Immediate halt |
| Vanity metrics only | Check if saves/shares/follows tracked | REJECT PAR, require engagement depth | Human review |
| No variance explanation | Check deviation >20% without WHY | REJECT PAR, require investigation | Immediate halt |
| No learning flags | Check learning_capture_flags section | REJECT PAR, require flags | Immediate halt |
| Missing WHY | Check insights have causal explanations | REJECT PAR, require explanations | Human review |

---

## STRUCTURAL FIX 4: BINARY GATE ENFORCEMENT

**Gates can ONLY have these statuses:**
- `PASS` — all criteria met, proceed
- `FAIL` — criteria not met, stop and remediate

**NEVER use: "conditional pass", "partial pass", "pass with warnings"**

---

## STRUCTURAL FIX 5: MANDATORY READ BEFORE EXECUTION

**The agent MUST read these files BEFORE starting S19:**

1. `S19-AGENT.md` — master agent protocol
2. `S19-ANTI-DEGRADATION.md` — THIS FILE
3. `skills/layer-0/0.1-input-validator.md` — input validation protocol
4. Performance data (platform metrics)
5. Virality score prediction (from S06 or content metadata)
6. Baseline data (historical performance)

**Execution without reading = automatic FAIL**

---

## Per-Microskill Output Requirements

| Microskill | Output File | Minimum Content | Verified |
|------------|-------------|-----------------|----------|
| 1.1 | metric-normalization.yaml | Normalized metrics + indices | ☐ |
| 1.2 | virality-calibration.yaml | Predicted vs actual + deviation + WHY | ☐ |
| 1.3 | hook-analysis.yaml | Hook effectiveness + category comparison | ☐ |
| 1.4 | format-analysis.yaml | Format performance + recommendations | ☐ |
| 1.5 | timing-analysis.yaml | Timing impact + optimal alternative | ☐ |
| 1.6 | variance-investigation.yaml | WHY predictions missed + factors | ☐ |
| 4.1 | [content-id]-PAR.yaml | Complete PAR with all sections + learning flags | ☐ |
| 4.2 | execution-log.md | Timestamped decisions and rationale | ☐ |

---

*Degradation is prevented through structure, not instructions.*
