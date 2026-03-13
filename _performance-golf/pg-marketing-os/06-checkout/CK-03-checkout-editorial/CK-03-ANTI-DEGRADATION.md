# CK-03-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent checkout editorial process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: CK-03-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Add new copy (review only), approve persuasion language, skip mobile audit, or accept trust density below 3 per viewport.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI GENERATES new copy instead of reviewing/cutting existing copy
- AI approves checkout with persuasion language ("compelling offer," "don't miss")
- AI skips mobile optimization audit ("implementation detail, not copy")
- AI accepts trust density below 3 without escalating to CK-01
- AI makes word cuts that change meaning
- AI does not produce both output files (checkout-copy-final.md AND checkout-audit-report.md)
- AI rubber-stamps existing copy without actually auditing

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### The Fix

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/CK-03/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/CK-03/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/CK-03/checkpoints/LAYER_2_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
layer: [N]
skill: "CK-03-checkout-editorial"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  word_reduction_audit: [COMPLETE/PENDING]
  trust_density_review: [COMPLETE/PENDING]
  mobile_optimization_audit: [COMPLETE/PENDING]
  persuasion_detection: [COMPLETE/PENDING]
  words_cut: [count]
  persuasion_violations: [count]
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Audit dimensions completed** | 4/4 (word, trust, mobile, persuasion) | HALT -- All audits required |
| **Trust density per viewport** | 3 signals | ESCALATE to CK-01 |
| **Persuasion language outside order bump** | Zero | REMOVE all instances |
| **Mobile spec per element** | 100% coverage | ADD missing specs |
| **Blaming error messages** | Zero | ESCALATE to CK-02 |
| **Output files produced** | 2 (final + report) | HALT -- Both required |
| **Words analyzed for cutting** | 100% of checkout copy | HALT -- Cannot skip any section |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "The copy looks good, no changes needed" | Every checkout can be made shorter. Rubber-stamping is not review. | HALT -- Do the audit |
| "A little persuasion helps the CTA" | Checkout CTA is functional. "Complete Order" outperforms "Claim Your Spot!" | HALT -- Remove persuasion |
| "Mobile optimization is a design concern" | Every copy element needs mobile behavior specified in the copy deliverable | HALT -- Add mobile spec |
| "Trust density is close enough at 2" | 3 is the minimum. Not negotiable. 2 is a failure. | ESCALATE to CK-01 |
| "I'll add some trust copy to fix density" | CK-03 does not generate copy. Escalate to CK-01 for new trust signals. | HALT -- Escalate, don't generate |
| "The audit report is optional" | Both output files are mandatory. | HALT -- Produce both files |

---

## STRUCTURAL FIX 4: REVIEW-NOT-GENERATE GATE

### The Problem
AI generates new checkout copy instead of reviewing and cutting existing copy. CK-03 is an editorial skill, not a generation skill.

### The Fix

**Content Generation Detection:**

```yaml
generation_detection:
  SCAN CK-03 output for new copy:
    - Any copy not found in CK-01 or CK-02 outputs is SUSPECT
    - Acceptable additions: mobile spec annotations, audit notes, word cut annotations
    - Unacceptable additions: new trust badge copy, new error messages, new labels,
      new helper text, new button text

  IF new copy detected:
    1. FLAG the new copy
    2. DETERMINE if it should be an escalation to CK-01 or CK-02
    3. REMOVE from CK-03 output
    4. Document as escalation item in audit report

  EXCEPTION: Minor word changes from cuts are not "new copy"
    - "For order confirmation and receipt" -> "For your receipt" = acceptable cut
    - "Secure Checkout Badge with Protection" -> adding entirely new badge copy = generation
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

**BEFORE any execution begins, create project infrastructure:**

```
[project]/CK-03/
  PROJECT-STATE.md
  PROGRESS-LOG.md
  checkpoints/
  checkout-copy-final.md       # PRIMARY OUTPUT 1
  checkout-audit-report.md     # PRIMARY OUTPUT 2
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 6: BINARY GATE ENFORCEMENT

**Gate statuses are BINARY: PASS or FAIL.**

```
VALID GATE STATUSES:
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / "good enough"
  "minor issues but approved"

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE output files created under false status
  3. RETURN to failing layer
  4. Re-evaluate with valid statuses only
```

---

## STRUCTURAL FIX 7: STALE ARTIFACT CLEANUP

**Before writing ANY replacement output file:**

```
STALE ARTIFACT PROTOCOL:
  1. SEARCH for existing checkout-copy-final.md and checkout-audit-report.md
  2. IF stale file exists at wrong location: DELETE it
  3. LOG deletion in PROGRESS-LOG.md
  4. ONLY THEN write new output files
```

---

## STRUCTURAL FIX 8: ANTI-DEGRADATION MANDATORY READ

**Session startup protocol:**

```
SESSION STARTUP:
  1. READ this file (CK-03-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ CK-03-AGENT.md
  3. IF resuming: READ PROJECT-STATE.md
  4. IF resuming: READ checkpoint files
  5. CREATE infrastructure if not exists
  6. ONLY THEN begin execution
```

---

## Per-Microskill Output Protocol

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-strategy-loader | layer-0-outputs/0.2-strategy-loader.md | 1KB |
| 1 | 1.1-word-reduction-auditor | layer-1-outputs/1.1-word-reduction-auditor.md | 3KB |
| 1 | 1.2-trust-density-reviewer | layer-1-outputs/1.2-trust-density-reviewer.md | 2KB |
| 2 | 2.1-mobile-optimization-auditor | layer-2-outputs/2.1-mobile-optimization-auditor.md | 3KB |
| 2 | 2.2-persuasion-language-detector | layer-2-outputs/2.2-persuasion-language-detector.md | 2KB |
| 4 | 4.1-editorial-validator | layer-4-outputs/4.1-editorial-validator.md | 2KB |
| 4 | 4.2-output-packager | layer-4-outputs/4.2-output-packager.md | 3KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] Anti-degradation read (THIS FILE)
[ ] CK-03-AGENT.md read
[ ] PROJECT-STATE.md created
[ ] checkpoints/ directory created
[ ] All 3 input packages loaded (strategy, trust, micro-copy)

LAYER 0 (FOUNDATION):
[ ] Trust copy package loaded from CK-01
[ ] Micro-copy package loaded from CK-02
[ ] Checkout strategy loaded from CK-00
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (AUDIT PASS 1):
[ ] Word reduction audit: every section reviewed for cuts
[ ] Specific cuts documented (original -> revised)
[ ] Trust density review: every viewport checked
[ ] Trust density: 3+ confirmed at all positions
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (AUDIT PASS 2):
[ ] Mobile optimization: every element has mobile spec
[ ] Mobile gaps identified and remediated
[ ] Persuasion detection: full scan of all copy
[ ] Persuasion language: zero outside order bump
[ ] LAYER_2_COMPLETE.yaml created

LAYER 4 (VALIDATION + PACKAGING):
[ ] All audit findings addressed
[ ] Checkout confirmed as shortest copy in funnel
[ ] checkout-copy-final.md written
[ ] checkout-audit-report.md written
[ ] Both output files verified
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] Both output files verified non-empty
[ ] Escalation items documented (if any)

ON CONTEXT RESUME:
[ ] Verify which audits are complete
[ ] Check for stale artifacts
[ ] Resume from next uncompleted audit
```

---

## KEY INSIGHT

> **"Editorial review is the art of subtraction. On checkout, the best edit is always a deletion. The ideal checkout copy is the one where removing any single word would break the meaning."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 8 structural fixes, review-not-generate gate, per-microskill output protocol, full checklist |
