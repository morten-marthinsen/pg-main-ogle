# Long-Form VSL Engine — LONG-FORM-VSL-ENGINE.md

**Version:** 1.0
**Created:** 2026-03-13
**Purpose:** Institutional memory and execution constraints for Long-Form VSL Engine sessions. This is the master instruction file for the copy generation subsystem of Marketing-OS.

---

## TABLE OF CONTENTS

- [THE 5 LAWS (Never Scroll Past This)](#the-5-laws-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [THE CORE PROBLEM: COPY-SPECIFIC DEGRADATION PATTERNS](#the-core-problem-copy-specific-degradation-patterns)
- [ARCHITECTURE OVERVIEW](#architecture-overview)
- [THE CASCADING PROSE PATTERN](#the-cascading-prose-pattern)
- [MODEL ROUTING](#model-routing)
- [CONTEXT RESERVOIR](#context-reservoir)
- [SECTION-BY-SECTION ARCHITECTURE](#section-by-section-architecture)
- [REFERENCE SOURCES](#reference-sources)
- [LONG-FORM CROSSOVER MAP](#long-form-crossover-map)
- [SKILL BUILD STATUS](#skill-build-status)
- [VERSION HISTORY](#version-history)

---

## THE 5 LAWS (Never Scroll Past This)

1. **Read the Campaign Brief first.** Every copy skill depends on the Campaign Brief (Skill 09). If it has not been completed and approved by the human operator, do NOT write copy. Writing without the brief produces generic prose disconnected from the strategic foundation.
2. **Cascading prose is mandatory.** Each skill saves its assembled prose so the next skill can read it. Skill 11 reads Skill 10's prose. Skill 12 reads 11's prose. This creates a continuous narrative thread, not a collection of disconnected sections.
3. **Voice consistency is non-negotiable.** Soul.md defines the voice register for the entire campaign. Every section must sound like the same person wrote it. If Skill 14 sounds different from Skill 11, the piece is broken.
4. **Arena for critical sections.** Headlines (10), Story (12), and Big Idea reveals require Arena evaluation. Not every section — but the high-leverage ones that determine whether the reader stays or leaves.
5. **Proof weaving is strategic, not decorative.** Skill 18 places the right proof at the right moment to address the specific objection the reader is feeling at that point. Random testimonial insertion is a forbidden pattern.

---

## CRITICAL: READ THIS FIRST

This file exists because **long-form sales copy is the highest-value output of the Marketing-OS system** — and it is the most susceptible to degradation. A 5,000-word sales page has hundreds of failure points: voice drift, threading loss, proof gaps, pacing collapse, promise escalation beyond the proof ceiling.

Skills 10-20 run on Sonnet 4.5 (copy generation model) because they require fluent, emotionally resonant prose — not the deep strategic reasoning of the foundation skills. The Campaign Brief (Skill 09) provides the strategic constraints; these skills execute against those constraints.

The 11 skills form a strict sequence mirroring the reader's psychological journey: headline → lead → story → root cause reveal → mechanism reveal → product introduction → offer → close → proof integration → assembly → editorial review.

**This file is the fix.** Before executing ANY Long-Form VSL skill, read the relevant sections below.

---

## THE CORE PROBLEM: COPY-SPECIFIC DEGRADATION PATTERNS

### Pattern 1: The Voice Drift
The model starts with one voice register and gradually shifts across sections. By the close, it sounds like a different person wrote it than the lead. **The fix:** Every skill loads Soul.md and the assembled prose from the prior skill. Voice anchoring happens at the start of every section, not just at the start of the campaign.

### Pattern 2: The Threading Loss
The model writes each section as if it were standalone. The Big Idea introduced in the headline disappears by Skill 14. The root cause named in Skill 13 isn't referenced in the close. **The fix:** Cascading prose pattern — each skill reads the prior skill's output. Skill 19 (Campaign Assembly) validates end-to-end threading.

### Pattern 3: The Proof Desert
The model writes compelling prose but forgets to weave proof into the narrative. Or worse — adds generic "studies show" references without specific data. **The fix:** Skill 18 (Proof Weaving) is a dedicated skill that runs after all sections are written, strategically placing scored proof elements from the Skill 02 inventory.

### Pattern 4: The Pacing Collapse
Long-form copy has a rhythm — tension, release, tension, revelation, proof, escalation. The model often writes at a flat pace — same energy, same sentence length, same emotional register throughout. **The fix:** The Campaign Brief (Skill 09) designs an emotional arc. Each copy skill references the arc position for its section.

### Pattern 5: The Promise Escalation
As the copy builds momentum, the model escalates promises beyond what the proof supports. The headline says "reduce inflammation." By the close, the model is writing "transform your entire health." **The fix:** Promise ceiling from Skill 02 constrains every section. Skill 20 (Editorial) catches escalation in final review.

### Pattern 6: The Abrupt Close
The model writes a full campaign and then produces a 2-paragraph close with a generic CTA. The close is where all upstream work converts or fails — it deserves as much attention as the headline. **The fix:** Skill 17 (Close) has its own dedicated architecture with future pacing, urgency justification, and emotional callback.

### Anti-Degradation Protocol (Copy-Specific)

```
WHEN YOU NOTICE YOURSELF:
- Writing sections that could stand alone → STOP. Check threading to prior sections.
- Drifting from Soul.md voice register → STOP. Re-read Soul.md and prior section prose.
- Adding "studies show" without specific data → STOP. Reference proof inventory elements.
- Writing at the same pace throughout → STOP. Check emotional arc from Campaign Brief.
- Escalating promises beyond the headline → STOP. Check promise ceiling.
- Rushing the close → STOP. The close deserves equal investment to the headline.

IF CONTEXT IS LARGE:
- This does NOT excuse voice drift between sections
- This does NOT excuse skipping proof integration
- This does NOT excuse flat pacing
- Request continuation rather than compressing quality
```

---

## ARCHITECTURE OVERVIEW

The Long-Form VSL Engine is an 11-skill pipeline that generates complete long-form sales copy — downstream from the Campaign Brief (Skill 09).

### Skill Pipeline

```
Skill 10: Headline Generation
  → 5+ headline candidates via Arena, scored and ranked
  → Output: Headline package with variants

Skill 11: Lead Writing
  → First 200-500 words after headline, hooks reader into body
  → Lead type per Campaign Brief recommendation
  → Output: Lead section copy

Skill 12: Story Crafting
  → Narrative element (origin, transformation, discovery, case study)
  → Bypasses skepticism through identification
  → Output: Story section copy

Skill 13: Root Cause Narrative
  → Reveals WHY conventional solutions failed
  → Names the villain, reframes the problem
  → Output: Root cause narrative copy

Skill 14: Mechanism Narrative
  → Reveals HOW the solution works
  → Makes the promise believable through the mechanism
  → Output: Mechanism narrative copy

Skill 15: Product Introduction
  → Transitions from mechanism to product reveal
  → Makes the product feel inevitable, not pitched
  → Output: Product introduction copy

Skill 16: Offer Copy
  → Presents complete offer stack with value anchoring
  → Makes price feel like a fraction of value
  → Output: Offer section copy

Skill 17: Close Writing
  → Final push with CTA, urgency, future pacing, emotional callback
  → Where all upstream work converts or fails
  → Output: Close section copy

Skill 18: Proof Weaving
  → Strategic placement of proof throughout all sections
  → Right proof, right moment, right objection
  → Output: Proof-woven copy with placement annotations

Skill 19: Campaign Assembly
  → Combines all sections, writes transitions, validates threading
  → Assembly skill — does NOT draft new copy
  → Output: assembled-draft.md + validation report

Skill 20: Editorial Review
  → Final quality gate, scores every section
  → Identifies pacing, voice, threading, and structural issues
  → Output: Final polished copy + editorial report
```

### Dependency Chain

```
Campaign Brief (09)
  ──→ Skill 10 (Headlines) ──→ Skill 11 (Lead) ──→ Skill 12 (Story)
                                                  ──→ Skill 13 (Root Cause Narrative)
                                                  ──→ Skill 14 (Mechanism Narrative)
                                                  ──→ Skill 15 (Product Introduction)
                                                  ──→ Skill 16 (Offer Copy)
                                                  ──→ Skill 17 (Close)
                            Skills 10-17 ──→ Skill 18 (Proof Weaving)
                                          ──→ Skill 19 (Assembly)
                                          ──→ Skill 20 (Editorial)
```

---

## THE CASCADING PROSE PATTERN

Each copy skill saves its assembled prose for the next skill to read. This creates a continuous narrative thread:

```
Skill 10 (Headlines) → saves headline-prose.md
  ↓ reads
Skill 11 (Lead) → saves lead-prose.md
  ↓ reads
Skill 12 (Story) → saves story-prose.md
  ↓ reads
Skill 13 (Root Cause) → saves root-cause-narrative-prose.md
  ↓ reads
... and so on through Skill 17
```

**Why this matters:** Without cascading prose, each skill writes in isolation. The headline says one thing, the lead says another, the story goes a third direction. Cascading prose ensures the reader experiences one continuous argument, not 8 disconnected essays.

---

## MODEL ROUTING

| Skills | Model | Reason |
|--------|-------|--------|
| 00-09 (Foundation) | Opus 4.6 | Deep strategic reasoning, not prose |
| 10-20 (Copy) | Sonnet 4.5 | Fluent, emotionally resonant prose |
| Arena rounds | Per Arena Protocol | Persona-appropriate model per round |

---

## CONTEXT RESERVOIR

Between Sessions 3 (Foundation) and Session 4 (Copy), the human operator curates a **Context Reservoir** (~15-17KB). This document bridges the foundation → copy transition and includes:

- Campaign Brief summary
- Key strategic decisions (root cause, mechanism, promise, Big Idea)
- Selected headline and lead type
- Voice anchoring from Soul.md
- Priority proof elements from Skill 02

The Context Reservoir loads at the start of every copy session alongside the Campaign Brief.

---

## SECTION-BY-SECTION ARCHITECTURE

### Headlines (Skill 10)
The most critical copy element. 80% of readers make the continue/leave decision on the headline alone. 5+ candidates generated via Arena, scored against proven formula categories.

### Lead (Skill 11)
The first 200-500 words. Multiple lead types: story, problem-agitation, secret, prediction, quiz. Type selected per Campaign Brief recommendation.

### Story (Skill 12)
Narrative that builds emotional connection. Bypasses skepticism through identification — the reader sees themselves in the story. Types: origin, transformation, discovery, case study.

### Root Cause Narrative (Skill 13)
Reveals why conventional solutions failed. Transforms the strategic root cause (Skill 03) into a compelling narrative. After this section, the reader understands why they have been stuck.

### Mechanism Narrative (Skill 14)
Reveals how the solution works. Transforms the strategic mechanism (Skill 04) into a narrative that makes the promise feel inevitable. The credibility engine of the promotion.

### Product Introduction (Skill 15)
Transitions from concept to tangible product. The product should feel like the inevitable next step, not a pitch.

### Offer Copy (Skill 16)
Presents the complete offer stack. Value stack, "If all it did was..." framework, bonuses, guarantee, price reveal. Makes the price feel like a fraction of the value.

### Close (Skill 17)
Final section converting desire into action. Synthesizes every upstream element into a decisive moment. Includes CTA, urgency, future pacing, and emotional callback to the Big Idea.

### Proof Weaving (Skill 18)
Runs after all sections are written. Strategic placement of scored proof elements from Skill 02. Each placement addresses a specific objection at that exact point in the copy.

### Campaign Assembly (Skill 19)
Combines all drafted sections with transitions. Validates end-to-end threading, callback accuracy, voice consistency, and deduplication. Assembly skill — writes only transitions.

### Editorial Review (Skill 20)
Final quality gate. Scores every section, identifies pacing/voice/threading issues, applies targeted revisions, packages final polished copy.

---

## REFERENCE SOURCES

- `10-headlines/SKILL.md` — Headline skill entry point
- `11-lead/SKILL.md` — Lead skill entry point
- `12-story/SKILL.md` — Story skill entry point
- `13-root-cause-narrative/SKILL.md` — Root cause narrative entry point
- `14-mechanism-narrative/SKILL.md` — Mechanism narrative entry point
- `15-product-introduction/SKILL.md` — Product introduction entry point
- `16-offer-copy/SKILL.md` — Offer copy entry point
- `17-close/SKILL.md` — Close entry point
- `18-proof-weaving/SKILL.md` — Proof weaving entry point
- `19-campaign-assembly/SKILL.md` — Campaign assembly entry point
- `20-editorial/SKILL.md` — Editorial review entry point
- `~system/ARENA-PROTOCOL.md` — Arena protocol (governs headline Arena)
- `~system/SPECIMEN-GUIDE.md` — Specimen system (persona voice loading)

---

## LONG-FORM CROSSOVER MAP

These long-form skills have direct analogs in the E-Commerce Engine:

| Long-Form Skill | Ecom Application | E-Comm Skill |
|----------------|------------------|--------------|
| 10 — Headlines | Hero headlines, section headlines | EC-02 (Hero & Value Prop) |
| 13 — Root Cause Narrative | Problem/agitation section | EC-03 (Section Copy) |
| 14 — Mechanism Narrative | Technology/how-it-works section | EC-03 (Section Copy) |
| 15 — Product Introduction | Product highlights, features | EC-01 (Feature Naming) + EC-03 |
| 16 — Offer Copy | Offer/pricing/value stack sections | EC-03 (Section Copy) |
| 18 — Proof Weaving | UGC, reviews, social proof sections | EC-03 (Section Copy) |

Skills 11 (Lead), 12 (Story), 17 (Close) have minimal ecom relevance — story-driven, not scan-optimized.

---

## SKILL BUILD STATUS

| Skill | Status | Files | Built |
|-------|--------|-------|-------|
| 10 — Headline Generation | COMPLETE | SKILL.md, HEADLINE-ANTI-DEGRADATION.md, microskills | 2026-02-25 |
| 11 — Lead Writing | COMPLETE | SKILL.md, LEAD-ANTI-DEGRADATION.md, microskills | 2026-02-25 |
| 12 — Story Crafting | COMPLETE | SKILL.md, STORY-ANTI-DEGRADATION.md, microskills | 2026-02-25 |
| 13 — Root Cause Narrative | COMPLETE | SKILL.md, ROOT-CAUSE-NARRATIVE-ANTI-DEGRADATION.md, microskills | 2026-02-25 |
| 14 — Mechanism Narrative | COMPLETE | SKILL.md, MECHANISM-NARRATIVE-ANTI-DEGRADATION.md, microskills | 2026-02-25 |
| 15 — Product Introduction | COMPLETE | SKILL.md, PRODUCT-INTRODUCTION-ANTI-DEGRADATION.md, microskills | 2026-02-25 |
| 16 — Offer Copy | COMPLETE | SKILL.md, OFFER-COPY-ANTI-DEGRADATION.md, microskills | 2026-02-25 |
| 17 — Close Writing | COMPLETE | SKILL.md, CLOSE-ANTI-DEGRADATION.md, microskills | 2026-02-25 |
| 18 — Proof Weaving | COMPLETE | SKILL.md, PROOF-WEAVING-ANTI-DEGRADATION.md, microskills | 2026-02-25 |
| 19 — Campaign Assembly | COMPLETE | SKILL.md, CAMPAIGN-ASSEMBLY-ANTI-DEGRADATION.md, 5-layer microskills | 2026-02-25 |
| 20 — Editorial Review | COMPLETE | SKILL.md, EDITORIAL-ANTI-DEGRADATION.md, microskills | 2026-02-25 |

**All 11 skills fully built with SKILL.md (entry point), ANTI-DEGRADATION.md (structural enforcement), and supporting microskill architecture.**

---

### SSR Pre-Screen Validation

After Skill 20 (Editorial) completes, SSR pre-screening runs per `~system/protocols/SSR-PRESCREEN-PROTOCOL.md`. A synthetic consumer panel (75-100 personas) evaluates the final output and produces a GO / REVISE / KILL recommendation with segment-stratified diagnostics. The SSR report is included in the output package. Trigger microskill: `20-editorial/skills/layer-5/5.5-ssr-prescreen-trigger.md`

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-03-20 | Added SSR pre-screen validation reference (Skill 20 (Editorial) terminal gate) |
| 1.0 | 2026-03-13 | Initial creation — 5 Laws, 6 degradation patterns, 11-skill pipeline, cascading prose pattern, model routing, context reservoir, section-by-section architecture, crossover map. |
