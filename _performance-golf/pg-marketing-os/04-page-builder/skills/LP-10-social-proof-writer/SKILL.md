---
name: social-proof-writer
description: >-
  Write all social proof copy for the landing page — every word surrounding,
  introducing, formatting, and connecting testimonials, reviews, endorsements,
  before/afters, volume signals, and case studies. LP-05 designed the architecture
  (WHAT/WHERE/DENSITY); LP-10 writes the copy filling those slots. Writes 9 distinct
  copy types: testimonial intros, formatting, review headers, before/after captions,
  expert endorsement framing, proof transitions, volume signals, case study intros,
  video testimonial CTAs. Trigger when proof architecture is complete and you need
  the actual proof copy.
---

# LP-10 — Social Proof Writer

**Pipeline Position:** After LP-04 (Section Sequence), LP-05 (Proof Architecture). Feeds LP-15.

---

## PURPOSE

Write the copy that surrounds, introduces, and connects proof elements. Not the proof itself (testimonials, reviews) but the framing copy that makes proof work: section headers, intro paragraphs, transition language, volume signals, and formatting guidance.

**Success Criteria:**
- 9 proof copy types written (intros, formatting, headers, captions, endorsements, transitions, volume, case studies, video CTAs)
- Each proof slot from LP-05 architecture has corresponding framing copy
- social-proof-copy-package.json produced with all proof framing copy

---

## REFERENCE FILES

- `LP-10-AGENT.md` — Complete orchestration specification
- `LP-10-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/LANDING-PAGE-ENGINE.md` — Engine-level constraints

---

## OUTPUT

**Primary:** `social-proof-copy-package.json` + `SOCIAL-PROOF-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/LP-10-social-proof-writer/`
