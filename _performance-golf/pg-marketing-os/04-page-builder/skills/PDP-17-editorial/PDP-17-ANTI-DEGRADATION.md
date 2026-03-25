# PDP-17-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent E-Comm Editorial process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: PDP-17-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: Editorial edits -- it does not rewrite. Feature names are locked. Proof is mandatory.
I WILL: Audit scan optimization, review proof density, revise flagged sections, score quality.
I WILL NOT: Rewrite sections from scratch, rename features, skip the Arena, or accept vague design notes.
```

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI rewrites entire sections instead of editing (editorial creep)
- AI renames features during revision ("improving" PDP-02 names)
- AI removes proof elements during revision to "tighten" copy
- AI adds slop words during revision (introduces "unlock", "transform")
- AI skips scan optimization audit (treats ecom like long-form)
- AI accepts vague design notes ("nice layout" instead of specific specs)
- AI inflates word counts during revision (bloating sections)

---

## STRUCTURAL FIX 1: EDIT, NOT REWRITE

### The Problem
AI rewrites entire sections during editorial, losing the voice and approach selected during Arena phases in PDP-03/PDP-07.

### The Fix
```yaml
edit_scope_limit:
  ALLOWED:
    - Tighten individual sentences (remove filler words)
    - Strengthen weak proof elements
    - Add bolding/formatting for scan optimization
    - Fix feature name inconsistencies
    - Improve transitions within a section
    - Add proof elements where missing

  FORBIDDEN:
    - Replacing more than 30% of a section's words
    - Changing the section's structural approach
    - Removing proof elements to "simplify"
    - Introducing new feature names
    - Changing the section's emotional tone

  IF revision changes > 30% of section words:
    HALT -- "Revision too extensive. This is an edit, not a rewrite."
```

---

## STRUCTURAL FIX 2: FEATURE NAMES LOCKED

```yaml
feature_name_lock:
  PDP-02 feature names are FINAL.
  Editorial CANNOT rename features.
  Editorial CANNOT add new feature names.
  Editorial CAN only correct inconsistent usage to match PDP-02.

  IF editorial renames a feature: REJECT revision
```

---

## STRUCTURAL FIX 3: PROOF CANNOT BE REMOVED

```yaml
proof_preservation:
  Proof elements from PDP-07 CANNOT be removed during editorial.
  Proof CAN be strengthened, repositioned, or supplemented.
  Additional proof CAN be added.

  IF editorial removes a proof element: REJECT revision
```

---

## STRUCTURAL FIX 4: SCAN OPTIMIZATION AUDIT MANDATORY

```yaml
scan_audit_check:
  Every section MUST be audited for scan optimization:
    [ ] Can the key message be understood in 3-5 seconds?
    [ ] Are key phrases bolded?
    [ ] Are paragraphs short (2-3 sentences max)?
    [ ] Are bullet points used where appropriate?
    [ ] Is the hierarchy clear (what to read first, second, third)?

  IF scan audit skipped: HALT -- "Scan optimization is the core editorial function."
```

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "This section reads better if I rewrite it" | Editorial edits, not rewrites. Max 30% word change. | LIMIT revision scope |
| "This feature name could be better" | Feature names are locked by PDP-02 | DO NOT change names |
| "The proof slows down the section" | Proof converts. It stays. | KEEP proof, reposition if needed |
| "Scan optimization doesn't apply to this section" | Every section is scanned on ecom | AUDIT every section |
| "The design notes are fine as-is" | Vague notes fail page builder | MAKE notes specific |

---

## BINARY GATE ENFORCEMENT

```
VALID STATUSES: PASS, FAIL
FORBIDDEN: "improved", "better", "close to passing"
```

---

## IMPLEMENTATION CHECKLIST — ARENA

```
LAYER 2.5 (ARENA -- MANDATORY):
[ ] ARENA-LAYER.md READ (MANDATORY — contains skill-specific judging criteria)
[ ] ARENA-CORE-PROTOCOL.md READ (path: ~system/protocols/ARENA-CORE-PROTOCOL.md)
[ ] ARENA-PERSONA-PANEL.md READ (path: ~system/protocols/ARENA-PERSONA-PANEL.md)
[ ] Persona names VERIFIED against protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect
[ ] All 7 competitors generated editorial revision packages
[ ] All packages scored against criteria
[ ] Human selection received (BLOCKING)
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-specimen-calibrator | layer-0-outputs/0.2-specimen-calibrator.md | 1KB |
| 0 | 0.3-strategy-loader | layer-0-outputs/0.3-strategy-loader.md | 1KB |
| 1 | 1.1-scan-optimization-auditor | layer-1-outputs/1.1-scan-optimization-auditor.md | 3KB |
| 1 | 1.2-proof-density-reviewer | layer-1-outputs/1.2-proof-density-reviewer.md | 2KB |
| 2 | 2.1-editorial-revision-generator | layer-2-outputs/2.1-editorial-revision-generator.md | 5KB |
| 2 | 2.2-design-note-completeness | layer-2-outputs/2.2-design-note-completeness.md | 2KB |
| 4 | 4.1-quality-scorer | layer-4-outputs/4.1-quality-scorer.md | 3KB |
| 4 | 4.2-feature-consistency-final | layer-4-outputs/4.2-feature-consistency-final.md | 2KB |
| 4 | 4.3-output-packager | layer-4-outputs/4.3-output-packager.md | 1KB |

---

## KEY INSIGHT

> "Editorial is the last line of defense before the page goes live. It catches what generation missed: slop words, broken scan optimization, missing proof, vague design notes, inconsistent feature names. Edit with precision. Do not rewrite with ego."

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: 4 structural fixes (edit not rewrite, feature names locked, proof preservation, scan audit mandatory). |
