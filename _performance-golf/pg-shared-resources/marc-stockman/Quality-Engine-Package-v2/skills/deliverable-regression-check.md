---
name: deliverable-regression-check
description: "Feature regression prevention for updated deliverables. Compares versions across 8 dimensions with PASS/FLAG/FAIL verdicts."
---

# Deliverable Regression Check

**Version:** 1.0 | March 6, 2026
**Scope:** Prevents feature regressions when updating existing deliverables. Fires on every revision — no exceptions.
**Rule Source:** R-17 (Feature Regression Prevention), marc-diagram-style Rule 11
**Frustration Addressed:** #6 — PDF lost all embedded images on revision (31MB → 158KB)

---

## When This Skill Fires

**Trigger:** Any time you are producing a new version of an existing file. This includes:
- Regenerating a PDF, PPTX, DOCX, or XLSX after edits
- Updating a diagram or visual asset
- Revising an HTML page or deployed website
- Re-running a generation script that previously produced an artifact
- Any instruction like "update the...", "fix the...", "revise the...", "regenerate the..."

**Does NOT fire on:**
- Brand-new deliverables (no prior version to compare against)
- Text-only markdown files (low regression risk — use diff instead)
- Conversation responses (not file deliverables)

---

## Defer-To Clauses

| Skill | Relationship |
|-------|-------------|
| `qe-quality-assurance` | QA checks content quality (accuracy, logic, completeness). This skill checks structural integrity between versions. Complementary — both can fire on the same deliverable. |
| `self-audit` | Self-audit is Marc's full 7-stage quality loop on deliverable substance. This skill is a narrow structural comparison that runs BEFORE self-audit's Pass 5 (Share). |
| `check-protocol` | CHECK is an 8-step compliance audit. This skill is not a compliance check — it's a version-comparison gate. |
| `marc-diagram-style` | Diagram style governs rendering rules. This skill verifies those rules weren't violated during an update. |

**Sequencing:** Run this skill's full protocol BEFORE calling `share_file`. If a regression is found, fix it before sharing. Self-audit and check-protocol operate on the shared deliverable — this skill ensures it's safe to share in the first place.

---

## The 8-Dimension Regression Check

When updating any deliverable, execute ALL applicable dimensions before sharing the new version.

### Dimension 1: Embedded Images

**Why:** The #1 regression Marc has experienced. Images silently disappear during regeneration.

**Procedure:**
1. Count all images in the prior version (embedded, referenced, generated inline)
2. Count all images in the new version
3. If count decreased: **FAIL** — identify which images are missing
4. If count matches: compare image placement (same sections? same order?)
5. For generated images (matplotlib, PIL, etc.): verify the generation code still executes and the image file exists before embedding

**Verdict:** PASS (same or more images, correctly placed) | FLAG (count matches but placement changed) | FAIL (images lost)

### Dimension 2: Sections & Headings

**Why:** Sections get silently dropped when regenerating from modified templates.

**Procedure:**
1. Extract all headings/section titles from the prior version
2. Extract all headings/section titles from the new version
3. Compare — identify any sections present in prior but missing from new
4. Check section ordering — did any sections move unexpectedly?

**Verdict:** PASS (all sections present) | FLAG (sections reordered but none lost) | FAIL (sections missing)

### Dimension 3: Tables

**Why:** Tables are structurally complex and prone to silent data loss during regeneration.

**Procedure:**
1. Count tables in prior version, note row/column counts per table
2. Count tables in new version, note row/column counts per table
3. If any table lost rows or columns: **FLAG** — verify the loss was intentional
4. If any table disappeared entirely: **FAIL**

**Verdict:** PASS (all tables present, dimensions match or intentionally changed) | FLAG (dimension changes) | FAIL (tables missing)

### Dimension 4: Diagrams & Visual Elements

**Why:** Diagrams rendered via code (matplotlib, mermaid, etc.) can fail silently if dependencies change.

**Procedure:**
1. Identify all diagrams/charts in prior version
2. Verify each exists in new version
3. For code-generated visuals: re-run generation code and verify output file exists and has non-zero size
4. For referenced images: verify file paths still resolve

**Verdict:** PASS (all visuals present and valid) | FLAG (visual present but rendering changed) | FAIL (visuals missing or zero-size)

### Dimension 5: Page / Slide Count

**Why:** A significant drop in page count is a strong signal that content was lost.

**Procedure:**
1. Record page/slide count of prior version
2. Record page/slide count of new version
3. If new version has fewer pages/slides: **FLAG** — verify the reduction was intentional (e.g., content was consolidated, not dropped)
4. Threshold: a drop of more than 20% without explicit justification is a **FAIL**

**Verdict:** PASS (same or more pages) | FLAG (fewer pages, justified) | FAIL (>20% drop without justification)

### Dimension 6: File Size

**Why:** The canary in the coal mine. The v1.5→v1.6 incident was instantly visible in file size (31MB → 158KB).

**Procedure:**
1. Record file size of prior version (in bytes)
2. Record file size of new version (in bytes)
3. Calculate percentage change
4. If new file is more than 50% smaller: **FAIL** — almost certainly lost embedded content
5. If new file is 20-50% smaller: **FLAG** — investigate what changed
6. If new file is larger or within 20%: PASS

**Thresholds:**
| Change | Verdict |
|--------|---------|
| Within ±20% | PASS |
| 20-50% smaller | FLAG |
| >50% smaller | FAIL |
| Larger | PASS (but note the increase) |

**Verdict:** PASS | FLAG | FAIL per thresholds above

### Dimension 7: Visual Formatting

**Why:** Font sizes, colors, and layout can regress when regenerating from modified code.

**Procedure:**
1. If prior version had specific formatting requirements (from marc-diagram-style or explicit instructions): verify each requirement still met
2. Check: fonts readable without zooming (marc-diagram-style minimum sizes)
3. Check: no text truncation, wrapping, or overflow
4. Check: color contrast sufficient (no dark text on dark backgrounds)
5. Check: all content visible (nothing clipped at page/slide boundaries)

**Verdict:** PASS (all formatting requirements met) | FLAG (minor formatting shifts) | FAIL (readability compromised)

### Dimension 8: Content Completeness

**Why:** Catch-all for content that doesn't fit the other dimensions — footnotes, citations, appendices, metadata.

**Procedure:**
1. Check: are all citations/references from the prior version still present?
2. Check: are all footnotes/endnotes preserved?
3. Check: are appendices, indices, or supplementary sections preserved?
4. Check: is document metadata intact (title, author, dates)?
5. If the revision was scoped to specific sections: verify unmodified sections are truly unchanged

**Verdict:** PASS (all content preserved) | FLAG (minor metadata changes) | FAIL (citations, footnotes, or appendices lost)

---

## Regression Report Format

After running all applicable dimensions, produce this report:

```
## Regression Check Report
**Deliverable:** [filename]
**Prior version:** [path or description] | Size: [X bytes] | Pages: [N]
**New version:** [path or description] | Size: [X bytes] | Pages: [N]

| Dimension | Verdict | Notes |
|-----------|---------|-------|
| 1. Images | PASS/FLAG/FAIL | [details] |
| 2. Sections | PASS/FLAG/FAIL | [details] |
| 3. Tables | PASS/FLAG/FAIL | [details] |
| 4. Diagrams | PASS/FLAG/FAIL | [details] |
| 5. Page Count | PASS/FLAG/FAIL | [details] |
| 6. File Size | PASS/FLAG/FAIL | [details] |
| 7. Visual Format | PASS/FLAG/FAIL | [details] |
| 8. Content | PASS/FLAG/FAIL | [details] |

**Overall:** PASS / BLOCKED
**Action:** [Deliver | Fix before delivering | Escalate to Marc]
```

**Decision rules:**
- All PASS → Deliver immediately (with `share_file` per R-11)
- Any FLAG, no FAIL → Deliver with flags noted in the report. Mention the flags when sharing.
- Any FAIL → **BLOCKED.** Fix all FAILs before delivering. If the fix is not straightforward, tell Marc what regressed and ask for direction.

---

## Quick-Path for Minor Updates

Not every update needs the full 8-dimension check. Use this decision tree:

1. **Text-only edit** (fixing a typo, updating a paragraph in a DOCX/PDF) → Run Dimensions 2, 5, 6, 8 only
2. **Style/formatting change** (font size, colors, layout) → Run Dimensions 5, 6, 7 only
3. **Content addition** (adding a section, appending data) → Run Dimensions 2, 3, 5, 6 only
4. **Full regeneration** (re-running the creation script) → Run ALL 8 dimensions
5. **Diagram/visual update** → Run Dimensions 1, 4, 5, 6, 7

When in doubt, run all 8. The cost of checking is minutes; the cost of a regression is Marc's trust.

---

## Implementation Notes

**How to get prior version data:**
- If the prior version file still exists in workspace: read it directly
- If the prior version was overwritten: check if a backup exists, or reference the generation script's prior output
- If no prior version is accessible: state this in the report and flag Dimensions 1-4 as UNABLE TO VERIFY. Proceed with Dimensions 5-8 using any available metadata.

**For Python-generated artifacts (PDF, PPTX, images):**
- Before running the updated generation script: record the current file's size and page count
- After running: compare immediately
- If the script fails or produces a zero-byte file: do NOT overwrite the prior version

**For deployed websites:**
- Take a screenshot of key pages before updating
- After deployment: take new screenshots and compare visually
- Check that all routes/pages still load

---

*This skill is a structural integrity gate. It answers: "Did we lose anything?" It does NOT answer: "Is the content good?" (that's qe-quality-assurance) or "Does this meet all of Marc's standards?" (that's self-audit / check-protocol). All three can and should operate on the same deliverable when appropriate.*