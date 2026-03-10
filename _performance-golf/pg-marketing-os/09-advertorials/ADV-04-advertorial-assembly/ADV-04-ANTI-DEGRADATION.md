# ADV-04-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent advertorial assembly process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: ADV-04-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Validate voice at every seam, verify narrative continuity, check compliance.
I WILL NOT: Skip seam validation, concatenate without checking, modify section content, or bypass compliance audit.
```

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI concatenates sections without checking voice consistency at seams
- AI skips narrative thread validation ("sections were individually validated")
- AI misses CTA count issue when sections combined (e.g., stray link in body)
- AI fails to place disclosure per platform requirements
- AI produces assembled piece outside word count bounds
- AI modifies section content during assembly (scope creep)
- AI skips compliance audit ("ADV-00 already mapped compliance")

---

## STRUCTURAL FIX 1: SEAM VALIDATION ENFORCEMENT

### The Problem
Each section (lead, body, bridge) may pass individual validation but fail at the seams where they connect. Voice register can shift, narrative can gap, tone can break.

### The Fix

```yaml
seam_validation:
  seams:
    - hook_to_lead: [voice_score, narrative_score]
    - lead_to_body: [voice_score, narrative_score]
    - body_to_bridge: [voice_score, narrative_score]
    - bridge_to_cta: [voice_score, narrative_score]

  FOR each seam:
    READ last 2 sentences of preceding section
    READ first 2 sentences of following section
    SCORE voice_consistency (1-10)
    SCORE narrative_continuity (1-10)

    IF voice_score < 7:
      HALT: "Voice drift at [seam] -- score [N]"
      ACTION: Smooth transition (add/modify connecting sentence)

    IF narrative_score < 7:
      HALT: "Narrative gap at [seam] -- score [N]"
      ACTION: Add transitional element
```

---

## STRUCTURAL FIX 2: ASSEMBLY-ONLY SCOPE

### The Problem
AI sees the complete advertorial during assembly and starts editing content -- rewriting body paragraphs, strengthening the bridge, adding proof. This exceeds assembly scope and can undo validated work.

### The Fix

```yaml
scope_enforcement:
  ALLOWED actions:
    - Concatenate sections in correct order
    - Add transitional sentences at seams (max 1 per seam)
    - Place disclosure per platform requirements
    - Verify CTA count in assembled piece
    - Check word count against bounds

  FORBIDDEN actions:
    - Rewrite any section content
    - Add new proof elements
    - Modify CTA language
    - Change voice register
    - Add additional CTAs
    - Remove content from any section

  IF scope violation detected:
    HALT: "Assembly scope exceeded -- [specific violation]"
    REVERT: to original section content
```

---

## STRUCTURAL FIX 3: CTA RE-VERIFICATION

### The Problem
When sections are combined, stray links from body sections or footnotes can create unintended additional CTAs in the assembled piece.

### The Fix

```yaml
cta_reverification:
  AFTER assembly:
    SCAN entire assembled piece for ALL links and CTA-like elements
    COUNT total: [N]

    IF count > 1:
      IDENTIFY all CTA elements with locations
      DETERMINE which is the intentional CTA (from ADV-03)
      FLAG extras for removal
      HALT: "Assembled piece has [N] CTAs -- must be exactly 1"

    IF count == 0:
      HALT: "No CTA in assembled piece -- bridge CTA missing"
```

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Sections were individually validated" | Seam quality is separate from section quality | HALT -- Validate seams |
| "I can improve the body while assembling" | Assembly scope is concatenation + seams only | HALT -- Stay in scope |
| "Compliance was checked in ADV-00" | ADV-00 mapped rules; ADV-04 verifies the assembled piece complies | HALT -- Run compliance audit |
| "The narrative flows obviously" | Obvious to AI != obvious to reader | HALT -- Validate formally |
| "Word count is approximate" | Type bounds are constraints, not suggestions | HALT -- Check bounds |

---

## BINARY GATE ENFORCEMENT

```
VALID: COMPLETE, PASS
FORBIDDEN: PARTIAL_PASS, CONDITIONAL_PASS, SOFT_PASS
IF forbidden: HALT -> DELETE -> RETURN -> Re-evaluate
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-strategy-loader | layer-0-outputs/0.2-strategy-loader.md | 1KB |
| 1 | 1.1-section-assembler | layer-1-outputs/1.1-section-assembler.md | 5KB |
| 1 | 1.2-voice-consistency-checker | layer-1-outputs/1.2-voice-checker.md | 2KB |
| 1 | 1.3-compliance-auditor | layer-1-outputs/1.3-compliance-auditor.md | 2KB |
| 2 | 2.1-narrative-thread-validator | layer-2-outputs/2.1-narrative-validator.md | 3KB |
| 4 | 4.1-assembly-validator | layer-4-outputs/4.1-assembly-validator.md | 2KB |
| 4 | 4.2-output-packager | layer-4-outputs/4.2-output-packager.md | 1KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] ADV-04-ANTI-DEGRADATION.md read
[ ] All three section drafts available
[ ] Strategy available for compliance reference

LAYER 0: All sections + strategy loaded
LAYER 1: Sections assembled, voice checked at seams, compliance audited
LAYER 2: Narrative thread validated across full piece
LAYER 4: Final validation passed, advertorial-assembled.md packaged

POST-EXECUTION:
[ ] Voice consistent across all seams (>= 7 each)
[ ] CTA count = 1 in assembled piece
[ ] Word count within type bounds
[ ] Disclosure properly placed
[ ] No content modifications (assembly-only scope)
```

---

## KEY INSIGHT

> **"Assembly is not concatenation. Three individually excellent sections can produce a disjointed piece if the seams are not validated. The reader experiences the advertorial as one continuous piece -- any seam they notice is a failure."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: seam validation, scope enforcement, CTA re-verification, compliance audit |
