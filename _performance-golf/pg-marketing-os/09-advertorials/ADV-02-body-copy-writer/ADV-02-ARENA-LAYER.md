# Body Copy Arena Layer (Layer 2.5)

**Version:** 1.0
**Created:** 2026-03-09
**Position:** Between Layer 2 (Body Generation) and Layer 4 (Validation)
**Personas:** See `../../~system/protocols/ARENA-PERSONA-PANEL.md`

> **Arena Mode:** `generative_full_draft` -- Competitors write COMPLETE body copy from scratch using upstream strategy and lead draft.

---

## PURPOSE

The Arena Layer transforms single-perspective body copy into multi-perspective competition. Seven competitors each generate their complete body copy section, judged against advertorial-specific criteria that enforce proof density, editorial authenticity, and type structure compliance.

**The Problem It Solves:**
- AI tendency to stack proof elements (3+ in sequence = ad smell)
- Body copy that reads as product description instead of article
- Mechanism explanations framed as product features instead of editorial findings
- Generic body structures that ignore type-specific conventions
- Voice drift between lead and body sections
- Proof elements dropped verbatim instead of woven into narrative

---

## QUALITY STANDARD

```
+============================================================================+
|  MINIMUM QUALITY THRESHOLD: 8.0/10 WEIGHTED SCORE                          |
|                                                                             |
|  Body copy must deliver genuine editorial value while naturally             |
|  introducing the mechanism. A body scoring below 8.0 will be detected      |
|  as advertising by sophisticated readers.                                   |
+============================================================================+
```

---

## LAYER POSITION

```
Layer 0: Foundation (Strategy + Lead + Specimen Loading)
Layer 1: Architecture (Type Structure Routing, Proof Weaving Plan)
Layer 2: Generation (Body Sections, Proof Embedding)
    |
    v
+-----------------------------------------------------------------------+
|                         LAYER 2.5: ARENA                                |
|                                                                         |
|  2.5.1: Multi-Perspective Generation (7 competitor body drafts)        |
|  2.5.2: Judging Round (7 body-copy-specific criteria)                  |
|  2.5.3: Ranking & Rationale (Top 3 with evidence)                     |
|  2.5.4: Human Selection Checkpoint (BLOCKING)                         |
+-----------------------------------------------------------------------+
    |
    v
Layer 4: Validation (Smell Test, Proof Density Check, Packaging)
```

---

## ZERO ABBREVIATION MANDATE

```
+============================================================================+
|  CRITICAL: COMPLETE EXECUTION REQUIRED                                      |
|  All 7 competitors MUST generate full body copy.                           |
|  All 7 criteria MUST be scored for ALL candidates.                         |
|  ABBREVIATION IS FORBIDDEN.                                                |
+============================================================================+
```

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 2-round + audience evaluation execution protocol.**

### What Stays Skill-Specific (Below)
- 7 judging criteria with weights
- Proof density scoring
- Editorial smell test in judging
- Type structure compliance

---

## BODY COPY JUDGING CRITERIA

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Editorial Authenticity** | 20% | Does this body read as genuine article content? Would it pass in a real publication? |
| **Proof Integration Quality** | 20% | Are proof elements woven naturally into narrative? No stacking? Density compliant? |
| **Type Structure Compliance** | 15% | Does body follow the type-specific template? Section order and count correct? |
| **Mechanism Explanation Clarity** | 15% | Is mechanism explained clearly in editorial (not promotional) framing? |
| **Voice Consistency** | 10% | Does voice register match the lead throughout? No drift? |
| **Narrative Engagement** | 10% | Is the body compelling to read? Does it maintain interest through to bridge? |
| **Bridge Readiness** | 10% | Does final section create natural transition point for CTA bridge? |

### Scoring Rubric

**Editorial Authenticity (20%)**
- 9-10: Indistinguishable from genuine editorial; passes smell test completely
- 7-8: Reads as article; minor ad signals detectable by expert readers
- 5-6: Mixed; some sections editorial, some sections promotional
- 3-4: Reads as ad with editorial veneer; most readers would notice
- 1-2: Obvious ad copy; no editorial disguise

**Proof Integration Quality (20%)**
- 9-10: Proof woven invisibly into narrative; reader absorbs without noticing "proof"
- 7-8: Proof integrated well; distribution compliant; minor seams
- 5-6: Proof present but somewhat forced; density borderline
- 3-4: Proof stacking detected; reads as "evidence dump"
- 1-2: Proof listed or stacked; reads as product claims section

**Type Structure Compliance (15%)**
- 9-10: Perfect type template adherence; sections follow convention exactly
- 7-8: Strong adherence; minor deviations that don't break format
- 5-6: Partial adherence; some sections follow template, others drift
- 3-4: Weak adherence; generic structure despite type selection
- 1-2: No type adherence; generic body regardless of type

**Mechanism Explanation Clarity (15%)**
- 9-10: Mechanism crystal clear in editorial framing; reader understands without feeling sold to
- 7-8: Mechanism clear; mostly editorial framing; minor promotional moments
- 5-6: Mechanism present but explanation muddy or shifts to promotional
- 3-4: Mechanism unclear or heavily promotional in framing
- 1-2: Mechanism as product pitch; no editorial framing

**Voice Consistency (10%)**
- 9-10: Perfect voice lock from lead through body; unified piece
- 7-8: Strong consistency; minor fluctuations
- 5-6: Some drift; body feels different from lead
- 3-4: Significant drift; lead and body feel disconnected
- 1-2: Complete voice change between lead and body

**Narrative Engagement (10%)**
- 9-10: Compelling throughout; reader pulled forward; never wants to stop
- 7-8: Engaging; maintains interest; reader continues willingly
- 5-6: Adequate; some interesting parts, some flat
- 3-4: Dull in sections; reader's attention wanders
- 1-2: Boring; reader stops reading

**Bridge Readiness (10%)**
- 9-10: Perfect transition setup; bridge flows naturally from body's final section
- 7-8: Good setup; bridge entry point clear
- 5-6: Adequate setup; transition possible but not smooth
- 3-4: Weak setup; bridge would feel forced
- 1-2: No setup; body ends abruptly with no bridge path

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Candidates generated | 7 | One per competitor |
| All criteria scored | 7 per candidate | 49 total scores |
| Top candidate score | >= 8.0 | Weighted total |
| Proof density compliant | All candidates | Zero stacking violations |
| Editorial smell test | All pass | Smell test per candidate |
| Human selection | Yes | Selection recorded |

### Gate Failure Protocol

```
IF proof stacking in any candidate:
  FLAG but allow scoring (penalty reflected in Proof Integration score)
  Document stacking locations for remediation

IF smell test fails for winning candidate:
  BLOCK -- cannot proceed with ad-smelling body copy
  Return to generation or select different candidate

IF no human selection:
  BLOCK -- cannot proceed
```

---

## ANTI-SLOP ENFORCEMENT

**Auto-Reject Phrases:**
- "But that's not all", "What's even more amazing", "The results speak for themselves"
- "Thousands of satisfied customers", "Don't just take our word for it"
- "This breakthrough formula", "Our patented", "We developed"
- "Clinically proven" (without specific study citation)
- "Doctor recommended" (without named doctor)

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial Arena Layer: 7-criteria judging, proof density scoring, editorial smell test, type structure compliance, 8.0 minimum |
