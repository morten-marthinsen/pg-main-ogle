# Promise Arena Layer (Layer 2.5)

**Version:** 2.1
**Created:** 2026-02-03
**Updated:** 2026-02-05
**Position:** Between Layer 2 (Calibration) and Layer 3 (Validation)
**Personas:** See [ARENA-PERSONA-PANEL.md](../../~system/protocols/ARENA-PERSONA-PANEL.md)

> **Arena Mode:** `strategic` — Competitors generate complete strategic packages. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation execution protocol.

---

## PURPOSE

The Arena Layer transforms promise development from a single-perspective process into a multi-perspective competition. Seven competitors (6 personas + The Architect) each generate their version of the primary promise, which are then judged against skill-specific criteria to surface the strongest candidate.

**The Problem It Solves:**
- AI tendency toward generic promises ("lose weight fast", "make more money")
- Promises disconnected from mechanism
- Insufficient calibration to proof ceiling
- Missing emotional specificity
- Campaign thesis that doesn't unify root cause + mechanism + promise

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

### Promise Judging Criteria

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Emotional Resonance** | 20% | Does this promise tap the dominant emotion in the market? Does it FEEL right? |
| **Specificity** | 20% | Is this promise specific enough to be believable? Timeframe? Quantity? Sensory? |
| **Mechanism Delivery** | 15% | Does the mechanism clearly and inevitably deliver this promise? |
| **Proof Ceiling Respect** | 15% | Is this promise within the provable ceiling? No overclaims? |
| **Differentiation** | 10% | Is this promise distinct from competitors? Fresh in the market? |
| **TIER1 Pattern Match** | 10% | How closely does this match elite TIER1 promise patterns? |
| **Campaign Thesis Strength** | 10% | Does the thesis unify superiority + mechanism + promise powerfully? |

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

**Emotional Resonance (20%)**
- 9-10: Taps the exact dominant emotion; prospect feels immediately understood
- 7-8: Strong emotional connection; resonates with target
- 5-6: Some emotional appeal; generic emotional territory
- 3-4: Weak emotional connection; could apply to anyone
- 1-2: No emotional resonance; purely logical/informational

**Specificity (20%)**
- 9-10: Highly specific: timeframe + quantity + sensory detail
- 7-8: Good specificity: two of three elements
- 5-6: Moderate specificity: one element
- 3-4: Vague: "better", "improved", "more"
- 1-2: Completely generic: "the solution you need"

**Mechanism Delivery (15%)**
- 9-10: Mechanism INEVITABLY delivers promise; perfect alignment
- 7-8: Clear delivery path; strong connection
- 5-6: Delivery possible but not obvious
- 3-4: Weak connection; gap between mechanism and promise
- 1-2: No clear delivery path; seems disconnected

**Proof Ceiling Respect (15%)**
- 9-10: Well within ceiling; every claim provable with margin
- 7-8: Within ceiling; claims supported
- 5-6: At ceiling edge; some claims borderline
- 3-4: Slightly over ceiling; some unprovable claims
- 1-2: Far over ceiling; major overclaims

**Differentiation (10%)**
- 9-10: Completely unique promise; no competitor makes this claim
- 7-8: Clearly different; distinct positioning
- 5-6: Somewhat different; could be confused with others
- 3-4: Very similar to competitor promises
- 1-2: Identical to what market already hears

**TIER1 Pattern Match (10%)**
- 9-10: Matches elite TIER1 promise patterns exactly
- 7-8: Strong similarity to successful promises
- 5-6: Some TIER1 elements present
- 3-4: Generic promise; not TIER1-aligned
- 1-2: No TIER1 pattern recognition

**Campaign Thesis Strength (10%)**
- 9-10: Thesis powerfully unifies all elements; feels like singular truth
- 7-8: Strong thesis; clear unification
- 5-6: Functional thesis; elements connected
- 3-4: Weak thesis; elements feel separate
- 1-2: No real thesis; just promise + mechanism stated

### Output Format

```yaml
arena_judging_output:
  layer: "2.5.2"
  scored_candidates:
    - persona: string
      criterion_scores:
        emotional_resonance:
          score: integer
          evidence: string
        specificity:
          score: integer
          evidence: string
        mechanism_delivery:
          score: integer
          evidence: string
        proof_ceiling_respect:
          score: integer
          evidence: string
        differentiation:
          score: integer
          evidence: string
        tier1_pattern_match:
          score: integer
          evidence: string
        campaign_thesis_strength:
          score: integer
          evidence: string
      weighted_total: float
      strongest_elements: [string]
      weakest_elements: [string]
      critical_gaps: [string]
```

### Critique-Specific Guidance

**What The Critic should particularly target in Promise Arena:**
- Promise that exceeds the proof ceiling (overpromise)
- Vague promise without specificity (timeframe, quantity, sensory detail)
- Promise disconnected from mechanism delivery
- Emotional resonance that feels manufactured, not earned
- Campaign thesis that doesn't flow from promise

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Candidates generated | 7 | One per competitor (6 personas + The Architect) |
| All criteria scored | 7 per candidate | 7 × 7 = 49 scores |
| Top candidate score | ≥ 7.5 | Weighted total (higher for promise) |
| No critical gaps | None below 6.0 | Per-criterion review |
| Proof ceiling respected | All candidates | Ceiling check |
| Human selection received | Yes | Selection recorded |

### Gate Failure Protocol

```
IF candidates < 7:
  Re-run generation for missing competitors

IF any criterion unscored:
  Complete judging before proceeding

IF top candidate < 7.5:
  Option A: Return to Layer 1 for re-generation
  Option B: Present to human with warning

IF critical gaps exist:
  Flag gaps in presentation to human
  Human decides whether to proceed or iterate

IF proof ceiling violated:
  BLOCK - recalibrate promise to ceiling

IF no human selection:
  BLOCK - cannot proceed without human input
```

---

## INTEGRATION WITH PROOF CEILING

The Promise Arena has a unique constraint: **proof ceiling respect is non-negotiable**.

### Ceiling Enforcement

```
FOR each persona generation:
  BEFORE generating:
    Load proof ceiling from 01-proof-inventory
  DURING generation:
    Constrain all claims to ceiling
  AFTER generation:
    Verify no overclaims

ANY candidate that exceeds ceiling is AUTOMATICALLY disqualified
```

### Ceiling Override Protocol

```
IF all candidates score low due to restrictive ceiling:
  Present to human with explanation
  Option A: Accept best within-ceiling candidate
  Option B: Trigger feedback to 01-proof-inventory for proof discovery
  Option C: Accept ceiling breach with human acknowledgment (risk flagged)
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ~system/protocols/ARENA-CORE-PROTOCOL.md v2.0 and ~system/SYSTEM-CORE.md. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: strategic. Replaced Phase 1-4 execution protocol with reference to ~system/protocols/ARENA-CORE-PROTOCOL.md (2-round + audience evaluation mandatory competition, adversarial critique-revise, 7 competitors including The Architect, analytical briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.0 | 2026-02-03 | Initial Arena Layer creation with 6-persona generation, 7-criterion judging, proof ceiling integration, human checkpoint |
