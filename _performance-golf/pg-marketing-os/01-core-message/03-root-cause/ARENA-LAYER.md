# Root Cause Arena Layer (Layer 2.5)

**Version:** 2.1
**Created:** 2026-02-03
**Updated:** 2026-02-05
**Position:** Between Layer 2 (Expression) and Layer 3 (Validation)
**Personas:** See [ARENA-PERSONA-PANEL.md](../../~system/protocols/ARENA-PERSONA-PANEL.md)

> **Arena Mode:** `strategic` — Competitors generate complete strategic packages. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation execution protocol.

---

## PURPOSE

The Arena Layer transforms root cause derivation from a single-perspective process into a multi-perspective competition. Seven competitors (6 personas + The Architect) each generate their version of the root cause expression, which are then judged against skill-specific criteria to surface the strongest candidate.

**The Problem It Solves:**
- AI tendency toward "cheesy" or generic root cause naming
- Insufficient use of TIER1 vault patterns
- Missing copy judgment in root cause selection
- Lack of villain specificity and dramatization
- Root causes that don't adequately explain past failures

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 2-round + audience evaluation execution protocol.**

> **Effort Level:** All generation phases use `effort: max`. Critique uses `effort: high`. See ~system/SYSTEM-CORE.md Effort Protocol.
> **Agent Team Mode:** When Agent Teams enabled, each persona runs as a separate teammate agent. See `~system/protocols/ARENA-CORE-PROTOCOL.md` v2.0 Agent Team Execution Mode.

This skill uses `arena_mode: strategic` — competitors generate COMPLETE strategic packages (no behavioral change from current generation approach). The Arena adds:
- **7 competitors** (6 personas + The Architect) generating independently
- **Adversarial critique** before scoring (The Critic identifies ONE weakest element per output)
- **Targeted revision** (each competitor fixes their identified weakness)
- **2 rounds** of competition with audience evaluation + analytical briefs between rounds
- **Post-arena synthesis** (Layer 2.6) creating 2-3 phrase-level hybrids
- **Human selection** from 9-10 candidates (7 pure + 2-3 hybrids)

### What Stays Skill-Specific (Below)
- 7 judging criteria with weights (used by both The Critic and the Judge)
- Persona generation instructions for this skill
- Critique-specific guidance for this skill
- Quality thresholds
- Anti-slop enforcement
- Input/output requirements

---

### Root Cause Judging Criteria

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Counter-Intuitiveness** | 20% | How unexpected is this root cause? Does it invert what the market believes? |
| **Externalization** | 20% | Is blame clearly EXTERNAL to the reader? (Reader is never at fault) |
| **Villain Specificity** | 15% | How specific and named is the villain? (Generic "the industry" scores low) |
| **Failure Explanation** | 15% | Does this explain ALL past failures? Does it give hope for a new worldview? |
| **Mechanism Setup** | 10% | Does this root cause lead naturally to the mechanism? |
| **TIER1 Pattern Match** | 10% | How closely does this match elite TIER1 vault patterns? |
| **Anchor Phrase Quality** | 10% | Is the anchor phrase memorable, repeatable, and distinctive? |

### Scoring Protocol

```
FOR each candidate:
  FOR each criterion:
    Score 1-10
    Provide evidence for score
    Flag if below minimum (6.0)

  Calculate weighted_total = sum(score * weight)

  Document:
    - Strongest elements
    - Weakest elements
    - Critical gaps (any criterion below 6.0)
```

### Scoring Rubric

**Counter-Intuitiveness (20%)**
- 9-10: Completely inverts market belief; "I never thought of it that way"
- 7-8: Unexpected angle; challenges common assumption
- 5-6: Somewhat fresh; mild surprise
- 3-4: Predictable; market has heard similar
- 1-2: Obvious; exactly what everyone already thinks

**Externalization (20%)**
- 9-10: Blame clearly external; reader feels relieved and vindicated
- 7-8: Mostly external; reader not blamed
- 5-6: Neutral; neither blames nor exonerates
- 3-4: Partially internal; reader might feel blamed
- 1-2: Reader blamed; "you've been doing it wrong"

**Villain Specificity (15%)**
- 9-10: Named entity with specific wrongdoing (e.g., "Big Pharma's calcium lie")
- 7-8: Specific industry practice or physiological process
- 5-6: Category-level villain (e.g., "the supplement industry")
- 3-4: Vague villain (e.g., "modern medicine")
- 1-2: No real villain; abstract forces only

**Failure Explanation (15%)**
- 9-10: Explains ALL past failures; provides hopeful new worldview; "this time will be different"
- 7-8: Explains most failures; provides reason for hope
- 5-6: Explains some failures; partial hope
- 3-4: Weak explanation; doesn't create hope
- 1-2: Doesn't explain failures; no worldview shift

**Mechanism Setup (10%)**
- 9-10: Root cause flows perfectly into mechanism; inevitable connection
- 7-8: Clear path to mechanism; logical connection
- 5-6: Mechanism connection possible but not obvious
- 3-4: Mechanism feels disconnected from root cause
- 1-2: Root cause and mechanism don't align

**TIER1 Pattern Match (10%)**
- 9-10: Matches elite TIER1 pattern exactly; same structural DNA
- 7-8: Strong similarity to TIER1 patterns
- 5-6: Some TIER1 elements present
- 3-4: Generic pattern; not TIER1-aligned
- 1-2: No TIER1 pattern recognition

**Anchor Phrase Quality (10%)**
- 9-10: Instantly memorable; could become brand IP (e.g., "Toe Lag")
- 7-8: Memorable and repeatable
- 5-6: Functional but not distinctive
- 3-4: Forgettable; generic phrasing
- 1-2: No clear anchor phrase

### Output Format

```yaml
arena_judging_output:
  layer: "2.5.2"
  scored_candidates:
    - persona: string
      criterion_scores:
        counter_intuitiveness:
          score: integer
          evidence: string
        externalization:
          score: integer
          evidence: string
        villain_specificity:
          score: integer
          evidence: string
        failure_explanation:
          score: integer
          evidence: string
        mechanism_setup:
          score: integer
          evidence: string
        tier1_pattern_match:
          score: integer
          evidence: string
        anchor_phrase_quality:
          score: integer
          evidence: string
      weighted_total: float
      strongest_elements: [string]
      weakest_elements: [string]
      critical_gaps: [string]
```

### Critique-Specific Guidance

**What The Critic should particularly target in Root Cause Arena:**
- Internalized blame (root cause blames the reader instead of external factor)
- Generic villain ("the industry" instead of specific named entity)
- Weak countersell (doesn't kill competitor solutions)
- Missing three-part structure element
- Anchor phrase that's forgettable or generic

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Candidates generated | 7 | One per competitor (6 personas + The Architect) |
| All criteria scored | 7 per candidate | 7 × 7 = 49 scores |
| Top candidate score | ≥ 7.0 | Weighted total |
| No critical gaps | None below 6.0 | Per-criterion review |
| Human selection received | Yes | Selection recorded |

### Gate Failure Protocol

```
IF candidates < 7:
  Re-run generation for missing competitors

IF any criterion unscored:
  Complete judging before proceeding

IF top candidate < 7.0:
  Option A: Return to Layer 2 for re-derivation
  Option B: Present to human with warning

IF critical gaps exist:
  Flag gaps in presentation to human
  Human decides whether to proceed or iterate

IF no human selection:
  BLOCK - cannot proceed without human input
```

---

## INTEGRATION WITH EXISTING LAYERS

### Layer 2 → Layer 2.5 Handoff

Layer 2 produces raw derivation and expression candidates. Layer 2.5 takes these inputs and generates 7 competitor-specific versions.

### Layer 2.5 → Layer 3 Handoff

Layer 2.5 produces a human-selected root cause candidate. Layer 3 validates this selection against truth, mechanism alignment, proof availability, and audience resonance.

### Feedback Loop

If Layer 3 validation fails, feedback can request:
- Re-run Layer 2.5 with different persona emphasis
- Re-run full Arena with specific criterion focus
- Return to Layer 2 for re-derivation

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ~system/protocols/ARENA-CORE-PROTOCOL.md v2.0 and ~system/SYSTEM-CORE.md. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: strategic. Replaced Phase 1-4 execution protocol with reference to ~system/protocols/ARENA-CORE-PROTOCOL.md (2-round + audience evaluation mandatory competition, adversarial critique-revise, 7 competitors including The Architect, analytical briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.0 | 2026-02-03 | Initial Arena Layer creation with 6-persona generation, 7-criterion judging, human checkpoint |
