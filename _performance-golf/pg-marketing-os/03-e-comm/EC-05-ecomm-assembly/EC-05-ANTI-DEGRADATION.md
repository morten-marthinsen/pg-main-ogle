# EC-05-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent E-Comm Assembly process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: EC-05-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: Assembly uses existing copy only -- no new copy generated.
I WILL: Assemble in priority order, verify feature threading, include design notes.
I WILL NOT: Write new copy, change feature names, skip design notes, or reorder sections arbitrarily.
```

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI rewrites or "improves" copy during assembly (not its job)
- AI assembles sections in arbitrary order instead of EC-00 priority
- AI drops design notes during assembly
- AI breaks feature name consistency during assembly
- AI forgets to place micro-scripts at their mapped sections
- AI produces copy-only output without page builder handoff

---

## STRUCTURAL FIX 1: NO NEW COPY

```yaml
no_new_copy_rule:
  Assembly uses ONLY copy from EC-02, EC-03, EC-04.
  NO rewriting. NO "improving." NO editorial changes.
  Editorial is EC-06's job.

  IF tempted to rewrite: HALT -- "Assembly does not write. EC-06 edits."
```

---

## STRUCTURAL FIX 2: PRIORITY ORDER ENFORCEMENT

```yaml
assembly_order:
  MUST follow EC-00 strategy section priority exactly.
  Section 1 (Hero) is ALWAYS first.
  Remaining sections in priority order.

  IF sections reordered: HALT -- "Restore EC-00 priority order."
```

---

## STRUCTURAL FIX 3: FEATURE THREAD VERIFICATION

```yaml
feature_thread_check:
  hero_feature_name: [from EC-01]
  MUST appear in:
    [ ] Hero section (EC-02 output)
    [ ] At least 2 BTF sections (EC-03 output)
  IF missing from hero or fewer than 2 BTF: FAIL
```

---

## STRUCTURAL FIX 4: PAGE BUILDER HANDOFF REQUIRED

```yaml
handoff_check:
  page-builder-handoff.yaml MUST be generated.
  MUST include: section order, layout per section, mobile behavior, visual elements.
  IF missing: HALT -- "Page builder handoff is a required output."
```

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "This section reads better if I rewrite it" | Assembly doesn't write; EC-06 edits | DO NOT rewrite |
| "This order flows better" | EC-00 priority order is binding | KEEP priority order |
| "Design notes slow down assembly" | Design notes are a required output | INCLUDE design notes |
| "The page builder will figure it out" | Handoff YAML is required | GENERATE handoff |

---

## BINARY GATE ENFORCEMENT

```
VALID STATUSES: PASS, FAIL
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-strategy-loader | layer-0-outputs/0.2-strategy-loader.md | 1KB |
| 1 | 1.1-section-assembler | layer-1-outputs/1.1-section-assembler.md | 5KB |
| 1 | 1.2-feature-thread-checker | layer-1-outputs/1.2-feature-thread-checker.md | 2KB |
| 1 | 1.3-design-note-integrator | layer-1-outputs/1.3-design-note-integrator.md | 3KB |
| 2 | 2.1-page-builder-handoff-generator | layer-2-outputs/2.1-page-builder-handoff-generator.md | 5KB |
| 4 | 4.1-assembly-validator | layer-4-outputs/4.1-assembly-validator.md | 3KB |
| 4 | 4.2-output-packager | layer-4-outputs/4.2-output-packager.md | 1KB |

---

## KEY INSIGHT

> "Assembly is not editing. It's structural verification and packaging. The copy is done. Your job is to put it in order, verify consistency, and hand it off cleanly."

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: 4 structural fixes (no new copy, priority order, feature thread, page builder handoff). |
