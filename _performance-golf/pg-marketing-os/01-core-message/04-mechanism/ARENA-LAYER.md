# Mechanism Arena Layer (Layer 2.5)

**Version:** 2.1
**Created:** 2026-02-03
**Updated:** 2026-02-05
**Position:** Between Layer 2 (Scorecard Optimization) and Layer 3 (Validation)
**Personas:** See [ARENA-PERSONA-PANEL.md](../../~system/protocols/ARENA-PERSONA-PANEL.md)

> **Arena Mode:** `strategic` — Competitors generate complete strategic packages. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation execution protocol.

---

## PURPOSE

The Arena Layer transforms mechanism development from a single-perspective process into a multi-perspective competition. Seven competitors (6 personas + The Architect) each generate their version of the mechanism, which are then judged against skill-specific criteria to surface the strongest candidate.

**The Problem It Solves:**
- AI tendency toward "cheesy" mechanism names ("Deep Sleep Protocol", "Gut Reset System")
- Insufficient use of TIER1 vault patterns for naming and structure
- Missing copy judgment in mechanism selection
- Mechanisms that don't feel scientifically credible
- Poor integration between root cause and mechanism

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 2-round + audience evaluation execution protocol.**

> **Effort Level:** All generation phases use `effort: max`. Critique uses `effort: high`. See ~system/SYSTEM-CORE.md Effort Protocol.
> **Agent Team Mode:** When Agent Teams enabled, each persona runs as a separate teammate agent. See `~system/protocols/ARENA-CORE-PROTOCOL.md` v2.0 Agent Team Execution Mode.

This skill uses `arena_mode: strategic` — competitors generate COMPLETE strategic packages (no behavioral change from current generation approach). The Arena adds:
- **7 competitors** (6 personas + The Architect) generating independently
- **Adversarial critique** before scoring (The Critic identifies at most ONE weakest element per output; may report no_material_weakness if output is genuinely strong)
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

### Mechanism Judging Criteria

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Scientific Credibility** | 20% | Does this mechanism feel scientifically legitimate? Would a skeptic accept it? |
| **Simplicity** | 20% | Can a 12-year-old understand the core concept? Is complexity hidden in simplicity? |
| **Name Memorability** | 15% | Is the name memorable, distinctive, and repeatable? Could it become brand IP? |
| **Root Cause Resolution** | 15% | Does this mechanism naturally and inevitably solve the root cause? |
| **Proof Supportability** | 10% | Can every claim about this mechanism be supported with available proof? |
| **TIER1 Pattern Match** | 10% | How closely does this match elite TIER1 mechanism patterns? |
| **Differentiation** | 10% | Is this mechanism distinct from competitors? Fresh in the market? |

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

**Scientific Credibility (20%)**
- 9-10: Feels like a real scientific discovery; could cite studies
- 7-8: Sounds legitimate; skeptic would engage
- 5-6: Plausible but thin; might raise questions
- 3-4: Questionable; sounds made up
- 1-2: Clearly fake; would be dismissed immediately

**Simplicity (20%)**
- 9-10: 12-year-old could explain it; one clear image
- 7-8: Easy to grasp; minor complexity
- 5-6: Understandable with effort
- 3-4: Confusing; requires multiple reads
- 1-2: Incomprehensible; lost the reader

**Name Memorability (15%)**
- 9-10: Instantly memorable; could become brand IP (e.g., "AMPK Switch")
- 7-8: Memorable and distinctive
- 5-6: Functional but generic ("Deep Sleep Protocol")
- 3-4: Forgettable; interchangeable with competitors
- 1-2: Awkward or unmemorable

**Root Cause Resolution (15%)**
- 9-10: Mechanism INEVITABLY solves root cause; perfect alignment
- 7-8: Clear resolution path; strong connection
- 5-6: Resolution possible but not obvious
- 3-4: Weak connection; gap between root cause and mechanism
- 1-2: No clear resolution; seems disconnected

**Proof Supportability (10%)**
- 9-10: Every claim provable; evidence architecture complete
- 7-8: Most claims supportable; minor gaps
- 5-6: Some claims provable; significant gaps
- 3-4: Difficult to prove; relies on assertion
- 1-2: Unprovable claims; evidence absent

**TIER1 Pattern Match (10%)**
- 9-10: Matches elite TIER1 mechanism patterns exactly
- 7-8: Strong similarity to successful mechanisms
- 5-6: Some TIER1 elements present
- 3-4: Generic mechanism; not TIER1-aligned
- 1-2: No TIER1 pattern recognition

**Differentiation (10%)**
- 9-10: Completely unique in market; no close competitors
- 7-8: Clearly different; distinct positioning
- 5-6: Somewhat different; could be confused with others
- 3-4: Very similar to existing mechanisms
- 1-2: Identical to competitor mechanisms

### Output Format

```yaml
arena_judging_output:
  layer: "2.5.2"
  scored_candidates:
    - persona: string
      criterion_scores:
        scientific_credibility:
          score: integer
          evidence: string
        simplicity:
          score: integer
          evidence: string
        name_memorability:
          score: integer
          evidence: string
        root_cause_resolution:
          score: integer
          evidence: string
        proof_supportability:
          score: integer
          evidence: string
        tier1_pattern_match:
          score: integer
          evidence: string
        differentiation:
          score: integer
          evidence: string
      weighted_total: float
      strongest_elements: [string]
      weakest_elements: [string]
      critical_gaps: [string]
```

### Critique-Specific Guidance

**What The Critic should particularly target in Mechanism Arena:**
- Mechanism explanation that fails the 12-year-old test
- Mechanism name that's forgettable or too technical
- Missing metaphor anchor (no graspable image)
- Proof architecture that's disconnected from mechanism
- Doomsday scenario that feels forced or generic

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
  Option A: Return to Layer 1 for re-ideation
  Option B: Present to human with warning

IF critical gaps exist:
  Flag gaps in presentation to human
  Human decides whether to proceed or iterate

IF no human selection:
  BLOCK - cannot proceed without human input
```

---

## INTEGRATION WITH 13-DIMENSION SCORECARD

The Arena Layer works WITH the existing 13-dimension scorecard, not instead of it.

### Relationship

- **Layer 1-2:** Generate candidates, score on 13 dimensions
- **Layer 2.5:** 7 competitors generate variants, judge on 7 ARENA-SPECIFIC criteria
- **Layer 3:** Validate winner on full 13-dimension scorecard

### Arena Criteria vs Scorecard Dimensions

| Arena Criterion | Related Scorecard Dimensions |
|-----------------|------------------------------|
| Scientific Credibility | Image Strength, Simplicity, Delivery Tangible |
| Simplicity | Simplicity, Visceral Response |
| Name Memorability | Virality, Differentiation |
| Root Cause Resolution | Thesis Cohesion, Super Power |
| Proof Supportability | Proof Integration, Delivery Tangible |
| TIER1 Pattern Match | Differentiation, Visceral Response |
| Differentiation | Differentiation, Belief Compatibility |

The Arena criteria are **selection-focused** (which candidate to choose), while the Scorecard dimensions are **optimization-focused** (how to improve a candidate).

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ~system/protocols/ARENA-CORE-PROTOCOL.md v2.0 and ~system/SYSTEM-CORE.md. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: strategic. Replaced Phase 1-4 execution protocol with reference to ~system/protocols/ARENA-CORE-PROTOCOL.md (2-round + audience evaluation mandatory competition, adversarial critique-revise, 7 competitors including The Architect, analytical briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.0 | 2026-02-03 | Initial Arena Layer creation with 6-persona generation, 7-criterion judging, human checkpoint |
