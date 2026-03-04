# Retrospective: Phase 2 — Copy Development

*Post-completion synthesis triggered after phase completion. Used to update PRD/SOP.*

---

## Trigger

This document is created/updated when:
- Phase 2 (Copy Development) is fully completed
- Final copy document is approved and ready for design/dev handoff

---

## Execution Summary

**Project:** SF2 Forged Titanium Slice-Fix Driver PDP
**Date Started:** 2026-01-31
**Date Completed:** 2026-02-01
**Total Sessions:** 3
**Total Entries in Session Log:** 42

### Deliverables Created

- [x] **sf2-copy-pdp.md** — Final production copy (19 sections, ~4,200 words)
- [x] **sf2-copy-pdp-detailed-outline.md** — Working brief with full CPB, strategic notes
- [x] **_sf2-copy-micro-scripts.md** — 37 micro-scripts with pattern analysis
- [x] **_2-session-context.md** — Comprehensive session log (42 entries)
- [x] **2-retrospective.md** — This document

### Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Total sections | 19 | 19 |
| Total components | ~160 | 161 |
| Micro-scripts created | 30+ | 37 |
| Micro-scripts used in copy | 30+ | 34 |
| Binary frame touchpoints | 6+ | 11 |
| 7 SliceFix Technology features | 7 | 7 |
| ACTION items resolved | 4 | 4 |
| Total edits documented | — | 50+ |

---

## What Worked Well

### 1. Bill Schley Micro-Script Methodology
The structured approach to creating micro-scripts using Bill Schley's framework (from "The Micro-Script Rules") produced highly effective copy atoms. The 6-point quality checklist (Sound Device, Contrast/Paradox, Brevity, Repeatability, DSI Connection, Template Match) created consistent, memorable phrases.

**Evidence:** 34 of 37 micro-scripts made it into final copy. Top performers like "Bad Swing? Good Ball." and "Kill The Slice. Keep The Speed." scored 6/6 on quality checklist.

### 2. Binary Frame as Golden Thread
Establishing "Distance AND Accuracy vs. Distance OR Accuracy" as the core positioning frame early in the process created a consistent thread throughout all 19 sections. This prevented copy drift and ensured every section reinforced the DSI.

**Evidence:** 11 explicit binary frame expressions across the page, from Hero tagline through Final CTA.

### 3. Comprehensive Session Logging
Documenting every edit with before/after text, line numbers, and strategic rationale created:
- Accountability for every change
- Institutional memory for future phases
- Training data for system improvement
- Clear audit trail for stakeholder review

**Evidence:** 42 session log entries with full change documentation.

### 4. PAS Structure Discipline
Maintaining strict Problem-Agitation-Solution structure in Section 4 (Problem only) and Section 5 (Solution only) prevented premature solution introduction. When problem/solution conflation was detected, it was immediately corrected.

**Evidence:** ACTION Item 3 caught and fixed conflation within same session.

### 5. Category-of-One Positioning Discipline
Avoiding language that positioned SF2 as "another draw-bias driver" maintained premium, category-creating positioning. FAQ framing was explicitly corrected from "Will I lose distance like other draw-bias drivers?" to "Will the SF2 help me gain distance?"

**Evidence:** No direct competitor comparisons in body copy; comparison chart uses category labels not brand names.

---

## What Could Be Improved

### 1. File Sync/Caching Issues
**Issue:** User edits weren't immediately visible due to caching between IDE and Claude Code.
**Recommendation:** Establish explicit "save → confirm → read" protocol at session start. Consider implementing file watch or checksum verification.

### 2. Placeholder Management
**Issue:** Some placeholders ([X], [Name], [Shipping timeline]) persisted longer than necessary.
**Recommendation:** Create placeholder tracking table at session start. Review and resolve all placeholders before marking document FINAL.

### 3. Typo Detection Timing
**Issue:** Double-space typos (line 119, 195) detected late in process.
**Recommendation:** Run automated spacing/typo check before final status assignment. Consider regex pattern for common issues.

### 4. Micro-Script Chart Lifecycle
**Issue:** Micro-script usage chart was added then removed — unclear if it should live in final copy or reference document.
**Recommendation:** Define upfront which elements are "production copy" vs. "reference material" before adding to final document.

### 5. Testimonial Source Tracking
**Issue:** Testimonials referenced by code (H-160, H-153) but source document not always re-read to verify exact wording.
**Recommendation:** Create testimonial index with exact quotes and source citations at phase start.

---

## PRD/SOP Updates Needed

Based on this execution, the following updates should be made:

### PRD Updates

| Section | Current | Proposed Change | Rationale |
|---------|---------|-----------------|-----------|
| Deliverables | Lists "final copy document" | Add "detailed outline" and "micro-scripts document" as separate deliverables | These emerged as distinct, valuable artifacts |
| Quality Criteria | Not specified | Add 6-point micro-script quality checklist | Proved effective for copy quality |
| Binary Frame | Not specified | Add "Golden Thread" requirement — core positioning must be expressed 6+ times | Ensures message consistency |

### SOP Updates

| Section | Current | Proposed Change | Rationale |
|---------|---------|-----------------|-----------|
| Session Start | Generic | Add "establish file sync protocol" step | Prevents editing confusion |
| Placeholder Tracking | Not specified | Add placeholder inventory as required artifact | Ensures nothing missed |
| Problem Section | Generic | Add "Problem section must NOT introduce solution" rule | Maintains PAS purity |
| Category Positioning | Not specified | Add "Never position product as member of competitor category" rule | Maintains category-of-one |
| Final Review | Not specified | Add automated typo/spacing check before FINAL status | Catches minor issues |

---

## Patterns Discovered

*New patterns not documented in existing reference materials.*

### Pattern 1: Paradox Structure Dominance

**Observed in:** 26 of 37 micro-scripts (70%)
**Description:** The most effective micro-scripts use paradox structure — presenting two concepts that seem contradictory but resolve through the product. "Bad Swing? Good Ball." "Kill The Slice. Keep The Speed."
**Implication:** For products that solve a "pick one" problem, paradox micro-scripts outperform other templates. Prioritize A/B Equation template for similar products.

### Pattern 2: "For You" Personalization Chain

**Observed in:** Hero tagline, Product Highlights, Mechanism, Features
**Description:** The phrase "for you" or "FOR YOU" appears repeatedly, creating a personalization chain that shifts the product from general to personal.
**Implication:** Identify 1-2 word personalization phrases early and deploy consistently. Creates subconscious ownership before purchase.

### Pattern 3: Problem Section Purity Test

**Observed in:** Section 4 revision
**Description:** If a problem section mentions the product name, it has likely introduced the solution too early. Problem sections should only mention the category problem, not the branded solution.
**Implication:** Add "product name check" to problem section QA — if product name appears, restructure.

### Pattern 4: Guarantee Section Testimonial Type

**Observed in:** Section 14
**Description:** Guarantee sections benefit from testimonials that explicitly mention the guarantee ("I gave it a try because I knew I could return it").
**Implication:** Source guarantee-specific testimonials for risk reversal sections. Generic "great product" testimonials underperform here.

### Pattern 5: FAQ as Objection Handler + SEO Asset

**Observed in:** Section 19
**Description:** FAQs serve dual purpose: (1) handling buyer objections at decision point, (2) capturing long-tail search queries. Questions should be phrased as users would type them.
**Implication:** Structure FAQs as questions users actually ask, not questions brand wants to answer.

### Pattern 6: Feature Headline as Micro-Script Placement

**Observed in:** Section 6 (all 7 features)
**Description:** Each feature headline is a micro-script, creating 7 additional touchpoints for memorable phrases. Headlines like "Titanium Tames The Toe" and "Bad Swing? Good Drives." are scannable and sticky.
**Implication:** For products with multiple features, assign unique micro-script headline to each. Creates distributed memorability.

---

## Copy Architecture Summary

### Section Distribution by Type

| Type | Sections | Count |
|------|----------|-------|
| 🔶 PG-UNIQUE | 1, 3, 4, 7, 8, 10, 15 | 7 |
| HYBRID (OEM + PG) | 2, 5, 6, 9, 13, 14, 16, 17, 18, 19 | 10 |
| 📊 NLS (Baymard/Nielsen) | 12 | 1 |
| 🔶 PG Conversion | 11 | 1 |

### Micro-Script Distribution by Section

| Section | Micro-Scripts Used |
|---------|-------------------|
| Section 2 (Hero) | 4 (tagline + 3 overlay) |
| Section 3 (UGC) | 1 |
| Section 4 (Problem) | 2 |
| Section 5 (Mechanism) | 3 |
| Section 6 (Features) | 8 (section headline + 7 feature headlines) |
| Section 7 (Timeline) | 2 |
| Section 8 (Use Cases) | 3 |
| Section 9 (Target) | 2 |
| Section 10 (Expert) | 2 |
| Section 11 (Mid-CTA) | 1 |
| Section 12 (How To Use) | 2 |
| Section 13 (Social Proof) | 2 |
| Section 14 (Guarantee) | 1 |
| Section 15 (Challenge) | 1 |
| Section 16 (Category) | 2 |
| Section 18 (Final CTA) | 1 |

### Binary Frame Expression Map

| Section | Expression | Type |
|---------|------------|------|
| S2 Hero Tagline | "Fix your slice AND gain 20+ yards" | Explicit AND |
| S2 Hero Image 2 | "Slicing? Losing balls AND losing distance?" | Problem framing |
| S4 Headline | "Distance OR Accuracy (Pick One.)" | Explicit OR (problem) |
| S4 Problem Statement | "forced to choose: distance OR accuracy" | Explicit OR |
| S5 Headline | "Distance AND Accuracy (All-in-One!)" | Explicit AND |
| S6 Feature 2 | "Straight Is Far, And Far Is Fun" | Implicit AND |
| S6 Feature 6 | "your mis-hits fly straighter AND farther" | Explicit AND |
| S8 Scenario 3 | "distance AND accuracy" | Explicit AND |
| S9 Did You Know | "Distance AND accuracy — not distance OR accuracy" | Direct contrast |
| S16 Anti-OEM | "Straight AND great" | Explicit AND |
| S18 Pain Point | "Stop sacrificing distance just to hit it straight" | Implicit tradeoff rejection |

**Coverage:** 11 touchpoints — binary frame expressed without repetitive language

---

## Research Inputs Used

### Testimonial Sources
- H-160: "WOW — I never thought I'd lose my slice..."
- H-017: "HUGE difference. HUGGGE difference..."
- H-112: "sending piss missiles with zero f's given..."
- H-171: "I'm 80% on fairways..."
- H-153: "Changed my ability to drive it in play 95%..."

### Data Points Cited
- GolfTec: 96% of golfers slice
- GolfTec: Only 8% hit a draw
- Golf Digest: 70% improve immediately with draw driver
- MyGolfSpy: PING G440 SFT loses 8 yards vs standard
- MyGolfSpy: Cobra DS-ADAPT MAX-D ranked 34th of 37 in distance

### Methodology References
- Bill Schley: "The Micro-Script Rules" (5.2 avg word count, sound devices, templates)
- PAS: Problem-Agitation-Solution copywriting structure
- Baymard/Nielsen: E-commerce UX best practices for specs, fitting guides

---

## Questions for Future Research

1. **Testimonial Video Performance:** Do UGC video testimonials outperform written testimonials for this product category? A/B test opportunity.

2. **Micro-Script Headline Testing:** Which feature headline micro-scripts drive most engagement? Heat mapping opportunity.

3. **Binary Frame Saturation:** Is 11 touchpoints optimal, or is there a point of diminishing returns? Could test reduced version.

4. **Guarantee Naming:** Does "Demo Period" outperform "Money-Back Guarantee" for driver category? Conversion rate test.

5. **Price Anchoring:** Would showing OEM prices ($599) before SF2 price ($249) improve perceived value? Layout test.

6. **Expert Credibility Order:** Does Chris McGinley or Hank Haney drive more trust? Test lead expert positioning.

---

## Handoff Checklist

### For Design Team

- [ ] Hero gallery: 10 thumbnails with visual instructions + overlay copy
- [ ] Feature animations: 7 features with visual callouts specified
- [ ] Comparison charts: 2 tables with formatting
- [ ] Spec tables: Engineering specs + Shaft Flex Guide
- [ ] Timeline graphic: 5-stage progression
- [ ] UGC carousel: 5-7 video slots specified

### For Development Team

- [ ] Sticky header: Anchor links + rotating element
- [ ] Configuration selectors: Hand, Loft, Flex
- [ ] Pricing toggle: PG1 member vs non-member
- [ ] Countdown timer: Urgency element
- [ ] Review count: [X] placeholders need CMS connection
- [ ] Star rating: [X] placeholder needs CMS connection

### For Content/Ops Team

- [ ] Verify testimonial permissions for named quotes
- [ ] Confirm PG1 pricing ($29/month) accuracy
- [ ] Provide shipping timeline for FAQ
- [ ] Provide international shipping details
- [ ] Provide actual review count for placeholders

---

## Final Document Status

| Document | Status | Location |
|----------|--------|----------|
| sf2-copy-pdp.md | ✅ FINAL | /sf2-copy-pdp/sf2-copy-pdp.md |
| sf2-copy-pdp-detailed-outline.md | ✅ REFERENCE | /sf2-copy-pdp/sf2-copy-pdp-detailed-outline.md |
| _sf2-copy-micro-scripts.md | ✅ REFERENCE | /_sf2-copy-micro-scripts.md |
| _2-session-context.md | ✅ COMPLETE | /_session-log/_2-session-context.md |
| 2-retrospective.md | ✅ COMPLETE | /_session-log/2-retrospective.md |

---

## Phase 2 Sign-Off

**Copy Development Phase:** COMPLETE
**Ready for:** Design Implementation, Development Build
**Blockers:** None (minor typos flagged in session log)

---

*Retrospective completed: 2026-02-01*
*Next phase: Design/Dev Implementation*

---

*After completing this retrospective, apply updates to PRD.md and SOP.md, then update the Change Log in session-notes.md.*
