# CK-01-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent trust & security copy process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: CK-01-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Write persuasion copy, fabricate social proof numbers, invent guarantee terms, or accept trust density below 3 signals per viewport.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI writes SALES COPY instead of TRUST COPY (benefits, urgency, persuasion language)
- AI fabricates social proof numbers ("Join 100,000+ happy customers" with no source)
- AI invents guarantee terms not in the offer package
- AI generates trust copy without checking density at every scroll position
- AI skips mobile placement specification
- AI uses vague trust language ("We care about your security") instead of specific ("256-bit SSL encryption")
- AI forgets contact information or fabricates phone numbers/emails

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### The Fix

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/CK-01/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/CK-01/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/CK-01/checkpoints/LAYER_2_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
layer: [N]
skill: "CK-01-trust-security-copy"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  trust_categories_mapped: [count/5]
  density_target_achievable: [Y/N]
  guarantee_terms_verified: [Y/N]
  persuasion_free: [Y/N]
  mobile_specified: [Y/N]
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Trust categories with copy** | 5/5 | HALT -- All categories required |
| **Trust density per viewport** | 3 signals | HALT -- Add signals until met |
| **Guarantee terms verified** | Against offer package | HALT -- Verify before packaging |
| **Persuasion language** | Zero instances | HALT -- Remove all instances |
| **Mobile placement specified** | Every signal | HALT -- Add mobile spec |
| **Contact info source** | Real or "[CLIENT TO PROVIDE]" | HALT -- Never fabricate |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "A little persuasion helps conversion" | Checkout is trust, not selling. Persuasion increases abandonment anxiety. | HALT -- Remove persuasion copy |
| "Round numbers are close enough for social proof" | Fabricated numbers destroy trust if discovered | HALT -- Use real numbers or placeholder |
| "The guarantee is probably 60 days" | Guarantee terms must match offer package exactly | HALT -- Verify against offer package |
| "2 trust signals per viewport is fine" | 3 is the minimum. Not negotiable. | HALT -- Add signals |
| "Mobile can be figured out in implementation" | Mobile behavior must be specified in copy deliverable | HALT -- Add mobile spec |
| "Generic security language builds trust" | Vague claims ("we care") build less trust than specific claims ("256-bit SSL") | HALT -- Make specific |

---

## STRUCTURAL FIX 4: PERSUASION LANGUAGE DETECTOR

### The Problem
The AI's training makes it default to persuasion-oriented copy. On checkout, this is counterproductive -- the buyer has already decided and persuasion language raises anxiety rather than reducing it.

### The Fix

**Automated Persuasion Scan:**

```yaml
persuasion_scan:
  SCAN all generated trust copy for:
    - Benefit language: "you'll love", "incredible results", "amazing value"
    - Urgency language: "limited time", "act now", "don't miss"
    - Emotional manipulation: "imagine", "picture this", "what if"
    - Sales framing: "deal", "offer", "exclusive", "special"
    - Superlatives without proof: "best", "most trusted", "leading"

  IF any detected:
    1. FLAG exact phrases
    2. REPLACE with trust-building alternative
    3. LOG violation count
    4. DO NOT proceed to packaging until all removed

  REPLACEMENT EXAMPLES:
    "Don't miss this incredible deal" -> [DELETE -- not trust copy]
    "You'll love the results" -> [DELETE -- not trust copy]
    "Exclusive security protection" -> "256-bit SSL encryption"
    "Best guarantee in the industry" -> "60-Day Money-Back Guarantee"
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

**BEFORE any execution begins, create project infrastructure:**

```
[project]/CK-01/
  PROJECT-STATE.md
  PROGRESS-LOG.md
  checkpoints/
  trust-copy-package.json    # PRIMARY OUTPUT
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

BEFORE writing trust-copy-package.json:
  1. SEARCH for existing files at ALL possible locations
  2. IF stale file exists at wrong location: DELETE it
  3. LOG deletion in PROGRESS-LOG.md
  4. ONLY THEN write new output files
```

---

## STRUCTURAL FIX 8: ANTI-DEGRADATION MANDATORY READ

**Session startup protocol:**

```
SESSION STARTUP:
  1. READ this file (CK-01-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ CK-01-AGENT.md
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
| 0 | 0.2-input-validator | layer-0-outputs/0.2-input-validator.md | 1KB |
| 1 | 1.1-trust-signal-mapper | layer-1-outputs/1.1-trust-signal-mapper.md | 3KB |
| 1 | 1.2-placement-optimizer | layer-1-outputs/1.2-placement-optimizer.md | 2KB |
| 2 | 2.1-trust-copy-generator | layer-2-outputs/2.1-trust-copy-generator.md | 4KB |
| 4 | 4.1-trust-density-validator | layer-4-outputs/4.1-trust-density-validator.md | 2KB |
| 4 | 4.2-output-packager | layer-4-outputs/4.2-output-packager.md | 3KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] Anti-degradation read (THIS FILE)
[ ] CK-01-AGENT.md read
[ ] PROJECT-STATE.md created
[ ] checkpoints/ directory created
[ ] checkout-strategy.yaml loaded

LAYER 0 (FOUNDATION):
[ ] Strategy loaded with trust architecture
[ ] Guarantee details extracted and verified
[ ] Inputs validated
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (MAPPING):
[ ] All 5 trust categories mapped with signals
[ ] Placement optimized for 3+ density
[ ] Mobile placement specified
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (GENERATION):
[ ] Copy generated for every mapped signal
[ ] Guarantee copy verified against offer package
[ ] Persuasion scan: ZERO violations
[ ] Word count within budget per signal
[ ] LAYER_2_COMPLETE.yaml created

LAYER 4 (VALIDATION + PACKAGING):
[ ] Trust density validated at every scroll position
[ ] No persuasion language in final output
[ ] trust-copy-package.json written
[ ] Schema validation passed
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] All output files verified

ON CONTEXT RESUME:
[ ] Verify execution state
[ ] Check for persuasion language in existing outputs
[ ] Check for stale artifacts
```

---

## KEY INSIGHT

> **"Trust copy has one job: make the buyer feel safe enough to type their card number. Every word that does not serve this purpose is friction."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 8 structural fixes, persuasion language detector, per-microskill output protocol, full checklist |
