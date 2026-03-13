---
name: ad-assembly-variant-matrix
description: >-
  Assemble copy and visual/audio assets into coherent ad variants and generate an
  exhaustive testable variant matrix. Use after visual/video production (A08) is
  complete and all creative elements need to be combined. Validates coherence of
  every variant (copy + visual + audio must work as a complete ad unit) and generates
  the full combinatorial matrix of all testable combinations. Every variant must map
  to concrete files with platform and format specs. The matrix is the product —
  exhaustive, validated, and deployable. Trigger when users mention ad assembly,
  variant matrix, combining ad elements, ad variants, or building the testing matrix.
  Requires A07 copy and A08 production assets.
---

# A09 — Assembly & Variant Matrix

**Pipeline Position:** After A08 (Visual/Video Production). Feeds A10 (Pre-Launch Scoring).

---

## PURPOSE

Assemble copy + assets into coherent variants and generate an exhaustive
deployment matrix of all testable combinations.

**Three Laws:**
1. Coherence is non-negotiable (every variant works as complete ad unit)
2. Every variant must be testable (maps to concrete files + specs)
3. The matrix is the product (exhaustive, validated, deployable catalog)

---

## IDENTITY

**This skill IS:** Coherence-enforcing assembler building exhaustive variant catalogs.
**This skill is NOT:** A copy writer (A07), a production tool (A08), a scorer (A10).

**Upstream:** A07 (Copy), A08 (Production Assets)
**Downstream:** A10 (Pre-Launch Scoring)

---

## REFERENCE FILES

- `A09-ASSEMBLY-VARIANT-MATRIX-AGENT.md` — Complete orchestration specification
- `A09-ASSEMBLY-VARIANT-MATRIX-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `AD-VARIANT-MATRIX/` (directory with variant catalog)
**Location:** `~outputs/[project-name]/ad-engine/A09/`
