# Deep Research Engine — DEEP-RESEARCH-ENGINE.md

**Version:** 1.0
**Created:** 2026-03-13
**Purpose:** Institutional memory and execution constraints for Deep Research Engine sessions. This is the master instruction file for the foundational research subsystem of Marketing-OS.

---

## TABLE OF CONTENTS

- [THE 5 LAWS (Never Scroll Past This)](#the-5-laws-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [THE CORE PROBLEM: RESEARCH-SPECIFIC DEGRADATION PATTERNS](#the-core-problem-research-specific-degradation-patterns)
- [ARCHITECTURE OVERVIEW](#architecture-overview)
- [BRIEF ARCHITECTURE (Skill 00)](#brief-architecture-skill-00)
- [RESEARCH ARCHITECTURE (Skill 01)](#research-architecture-skill-01)
- [PROOF INVENTORY ARCHITECTURE (Skill 02)](#proof-inventory-architecture-skill-02)
- [REFERENCE SOURCES](#reference-sources)
- [SKILL BUILD STATUS](#skill-build-status)
- [VERSION HISTORY](#version-history)

---

## THE 5 LAWS (Never Scroll Past This)

1. **Verbatim or nothing.** Research collects REAL quotes from REAL people. If you cannot find a real quote, do NOT fabricate one. An empty bucket is better than a hallucinated one.
2. **Volume is non-negotiable.** 1,000+ verbatim quotes across 6 buckets. Not 200, not 500. The downstream pipeline depends on volume for pattern detection and emotional range.
3. **The brief sets every constraint.** A vague brief produces vague research. A rushed brief produces off-target research. Do not proceed past Skill 00 with gaps in the brief.
4. **Proof must be scored, not listed.** A raw list of testimonials is not a proof inventory. Every proof element is scored for persuasive power, gap analysis is mandatory, and the promise ceiling is calculated.
5. **If source material is thin, stop.** Running research on thin air produces hallucinated proof elements and fabricated quotes. If the operator provides zero source material, flag it and halt.

---

## CRITICAL: READ THIS FIRST

This file exists because **research is the invisible foundation** of every campaign. When research is weak, every downstream skill compensates — root cause framing becomes generic, mechanisms become abstract, headlines become cliches, and proof weaving has nothing to weave.

The Deep Research Engine produces the raw material that Skills 03-20 transform into campaigns. Its three skills form a strict sequence: Brief (00) → Research (01) → Proof Inventory (02). Each skill's output feeds the next, and Skill 01's output feeds nearly every downstream skill in the system.

**This file is the fix.** Before executing ANY Deep Research skill, read the relevant sections below.

---

## THE CORE PROBLEM: RESEARCH-SPECIFIC DEGRADATION PATTERNS

### Pattern 1: The Hallucinated Quote
The model generates plausible-sounding quotes instead of finding real ones. "I tried everything and nothing worked" appears in every research run because it is generic enough to be unfalsifiable. **The fix:** Verbatim enforcement — every quote must trace to a source (review site, forum post, social media, competitor page). If you cannot cite the source, the quote does not exist.

### Pattern 2: The Thin Brief
The operator provides a product name and says "go research." Without audience definition, competitive context, or product specs, research targets the wrong people, the wrong pain points, and the wrong competitors. **The fix:** Skill 00 enforces minimum brief completeness — every field populated or explicitly marked "NOT AVAILABLE" with operator confirmation.

### Pattern 3: The Bucket Imbalance
The model fills Pain and Hope buckets easily (surface emotions) but under-fills Root Cause, Competitor Mechanism, and Villain buckets (deeper analysis). **The fix:** Non-negotiable minimums per bucket: Pain 300, Hope 250, Root Cause 200, Solutions Tried 150, Competitor Mechanism 100, Villain 75.

### Pattern 4: The Proof Desert
The proof inventory skill produces a list of testimonials but skips clinical studies, data points, credentials, awards, and mechanism proof. Or worse — it lists them without scoring their persuasive power. **The fix:** Skill 02 scores every proof element across dimensions and calculates a promise ceiling. The ceiling determines what claims the copy can credibly make.

### Pattern 5: The Speed Run
Research is the longest skill in the system (it orchestrates 57 microskills across 4 layers). The temptation to abbreviate is constant. **The fix:** Volume thresholds are enforced programmatically. 1,000+ quotes is not a suggestion — it is a gate.

### Anti-Degradation Protocol (Research-Specific)

```
WHEN YOU NOTICE YOURSELF:
- Writing quotes that sound too clean → STOP. Real people don't speak in marketing copy.
- Filling buckets unevenly → STOP. Check minimums per bucket before proceeding.
- Skipping source citation → STOP. Every quote needs a source or it doesn't count.
- Listing proof without scoring → STOP. A list is not an inventory.
- Rushing through the brief → STOP. Every field matters.

IF CONTEXT IS LARGE:
- This does NOT excuse reducing quote minimums
- This does NOT excuse skipping proof scoring
- This does NOT excuse abbreviated brief intake
- Request continuation rather than compressing quality
```

---

## ARCHITECTURE OVERVIEW

The Deep Research Engine is a 3-skill pipeline that produces the foundational evidence base for every campaign. It is the entry point for the entire Marketing-OS system.

### Skill Pipeline

```
Skill 00: Project Brief
  → Ingest operator input, produce Soul.md (voice/identity) and Research Brief
  → Two outputs: Soul.md (seed) + [project]-brief.md (draft)
  → Human review checkpoint — nothing proceeds without sign-off

Skill 01: Deep Research
  → 1,000+ verbatim quotes across 6 buckets (Pain, Hope, Root Cause,
    Solutions Tried, Competitor Mechanism, Villain)
  → Orchestrates 57 microskills across 4 layers
  → Uses MCP tools (Firecrawl, Apify) for live data collection
  → Output: Research handoff package (market snapshot, avatar, competitive landscape, quotes)

Skill 02: Proof Inventory
  → Catalog, classify, and score all available proof elements
  → Testimonials, clinical studies, data points, credentials, awards, media mentions
  → Gap analysis + promise ceiling calculation
  → Output: proof-inventory-output.json
```

### Dependency Chain

```
Operator Input ──→ Skill 00 (Brief) ──→ Skill 01 (Research) ──→ Skill 02 (Proof Inventory)
                                     ──→ Skills 03-20 (all downstream skills)
                                                              ──→ Skill 18 (Proof Weaving)
```

### Integration Points

| From | To | What Passes |
|------|-----|------------|
| Operator | Skill 00 | Product info, audience description, objectives, source material |
| Skill 00 | Skill 01 | Research Brief (what to research, hypotheses, emphasis areas) |
| Skill 00 | Skills 10-20 | Soul.md (voice/identity for all copy generation) |
| Skill 01 | Skill 02 | Research handoff (quotes, market snapshot, avatar, competitive landscape) |
| Skill 01 | Skills 03-09 | Research handoff (evidence base for all Core Message skills) |
| Skill 02 | Skill 18 | Proof inventory (scored elements for Proof Weaving) |
| Skill 02 | Skills 03-09 | Promise ceiling (constrains what claims can be made) |

---

## BRIEF ARCHITECTURE (Skill 00)

### Two Outputs

| Output | Purpose | Status | Consumers |
|--------|---------|--------|-----------|
| **Soul.md** | Voice/identity document — defines register, audience relationship, emotional range, pacing | Seed (expanded by copy skills) | Skills 10-20 (all copy generation) |
| **Research Brief** | Input for Deep Research — defines what to research, business context, hypotheses | Draft (human reviews) | Skill 01 (Research) |

### Process: Voice Prompt → Brief Workflow

1. Collect product/brand information
2. Extract voice characteristics (register, personality, audience relationship)
3. Draft Soul.md from voice analysis
4. Collect business context (objectives, audience, competitors)
5. Draft Research Brief from business context
6. Present both documents for human review
7. Revise per feedback
8. Finalize with human sign-off — nothing proceeds without approval

---

## RESEARCH ARCHITECTURE (Skill 01)

### The 6 Buckets

| Bucket | Minimum | What It Contains |
|--------|---------|-----------------|
| Pain | 300 | Real language describing suffering, frustration, symptoms |
| Hope | 250 | Desired outcomes, aspirations, "I wish..." statements |
| Root Cause | 200 | Why the problem persists, hidden causes, systemic failures |
| Solutions Tried | 150 | What they have tried, why it failed, disillusionment language |
| Competitor Mechanism | 100 | How competitors explain their solutions, their mechanisms |
| Villain | 75 | Who/what they blame, systemic villains, industry frustrations |

### 4-Layer Architecture

- **Layer 0:** Source loading, brief parsing, MCP tool discovery
- **Layer 1:** Forum mining, review extraction, social listening, competitor page analysis
- **Layer 2:** Quote classification, bucket assignment, deduplication, quality scoring
- **Layer 3:** Market snapshot synthesis, avatar construction, competitive landscape mapping
- **Layer 4:** Handoff packaging, summary generation

---

## PROOF INVENTORY ARCHITECTURE (Skill 02)

### Proof Categories

| Category | Examples | Scoring Dimensions |
|----------|----------|-------------------|
| Testimonials | Customer reviews, case studies, before/after | Specificity, emotion, credibility, relevance |
| Clinical Studies | Published research, ingredient studies | Study quality, sample size, relevance, recency |
| Data Points | Statistics, percentages, survey results | Source credibility, specificity, verifiability |
| Credentials | Expert endorsements, certifications, patents | Authority level, relevance, recognition |
| Awards/Press | Media mentions, industry awards, ratings | Publication tier, recency, relevance |
| Mechanism Proof | Patent filings, process documentation, ingredient sourcing | Uniqueness, verifiability, scientific backing |

### Promise Ceiling

The proof inventory calculates a promise ceiling — the maximum claim level the available proof can credibly support. Copy skills (10-20) must not exceed this ceiling.

---

## REFERENCE SOURCES

- `00-brief/SKILL.md` — Brief skill entry point
- `00-brief/research-brief-template.md` — Research brief template
- `00-brief/soul-md-template.md` — Soul.md voice template
- `01-research/SKILL.md` — Research skill entry point
- `01-research/research-orchestrator.md` — Research orchestration architecture
- `01-research/research-layer-specs.md` — Layer-by-layer microskill specs
- `01-research/research-subagent-templates.md` — Subagent configuration templates
- `01-research/research-output-protocol.md` — Output formatting and handoff protocol
- `02-proof-inventory/SKILL.md` — Proof inventory skill entry point

---

## SKILL BUILD STATUS

| Skill | Status | Files | Built |
|-------|--------|-------|-------|
| 00 — Project Brief | COMPLETE | SKILL.md, ANTI-DEGRADATION.md, templates | 2026-02-25 |
| 01 — Deep Research | COMPLETE | SKILL.md, ANTI-DEGRADATION.md, orchestrator, layer specs, subagent templates, output protocol | 2026-02-25 |
| 02 — Proof Inventory | COMPLETE | SKILL.md, ANTI-DEGRADATION.md, microskills | 2026-02-25 |

**All 3 skills fully built with SKILL.md (entry point), ANTI-DEGRADATION.md (structural enforcement), and supporting architecture files.**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-13 | Initial creation — 5 Laws, 5 degradation patterns, skill pipeline, bucket architecture, proof inventory framework, integration points. |
