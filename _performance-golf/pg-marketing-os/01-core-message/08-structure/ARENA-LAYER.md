# Structure Arena Layer (Layer 2.5)

**Version:** 2.1
**Created:** 2026-02-03
**Updated:** 2026-02-05
**Position:** Between Layer 2 (CPB Chunk Construction) and Layer 3 (Sequencing & Flow)
**Personas:** See [ARENA-PERSONA-PANEL.md](../../~system/protocols/ARENA-PERSONA-PANEL.md)

> **Arena Mode:** `strategic` — Competitors generate complete strategic packages. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation execution protocol.

---

## PURPOSE

The Arena Layer transforms single-perspective structure development into multi-perspective competition. Seven competitors (6 personas + The Architect) each generate their complete campaign argument architecture, which are then judged against structure-specific criteria to surface the strongest candidate.

**The Problem It Solves:**
- AI tendency toward generic, formulaic argument structures
- Arguments disconnected from upstream mechanism and root cause
- Insufficient proof density across CPB chunks
- Claims that sound like opinion rather than verifiable facts
- Flow that feels choppy or forced rather than conversational
- Campaign thesis that fails to connect mechanism + promise + root cause

---

## QUALITY STANDARD

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  MINIMUM QUALITY THRESHOLD: 8.5/10 WEIGHTED SCORE                            ║
║                                                                               ║
║  This is NON-NEGOTIABLE. Campaign argument architecture that scores below    ║
║  8.5 will produce downstream copy that cannot build belief.                  ║
║                                                                               ║
║  7.0-7.5 is INSUFFICIENT for this skill. Elite structures require            ║
║  8.5+ or the entire campaign argument fails to persuade.                     ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

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

### Structure Judging Criteria

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Campaign Thesis Clarity** | 20% | Single-sentence thesis that clearly connects mechanism + promise + root cause. Does it crystallize the argument's purpose? |
| **Claim Defensibility** | 20% | Are all claims factual, specific, and verifiable? Zero opinion-based statements? |
| **Proof Density & Quality** | 15% | Every claim has mapped proof from inventory. Minimum 1 proof element per chunk. Proof strength adequate for claims. |
| **Benefit Dimensionalization** | 15% | Benefits include functional, dimensionalized, AND emotional layers. Benefits answer "So what does this mean for ME?" |
| **Gap Coverage** | 10% | All prospect questions addressed. Minimum 5 gaps. "How can I get started?" included as final. |
| **TIER1 Pattern Match** | 10% | Structure aligns with elite TIER1 vault patterns. Demonstrates structural sophistication. |
| **Flow Architecture** | 10% | Conversational flow. Coherence markers create continuation. Transitions not forced. Simple and SIN segues present. |

### Scoring Protocol

```
FOR each candidate:
  FOR each criterion:
    Score 1-10 using rubric below
    Provide SPECIFIC evidence for score (no vague justifications)
    Flag if below minimum (6.0)

  Calculate weighted_total = sum(score * weight)

  Document:
    - Strongest elements (with evidence)
    - Weakest elements (with evidence)
    - Critical gaps (any criterion below 6.0)
```

### Scoring Rubric

**Campaign Thesis Clarity (20%)**
- 9-10: Single sentence connecting mechanism + promise + root cause with crystalline clarity; thesis type immediately apparent
- 7-8: Clear thesis connecting all elements; may need minor refinement
- 5-6: Thesis present but connection to one element (mechanism/promise/root cause) is weak
- 3-4: Thesis is multi-sentence or fails to connect components
- 1-2: No clear thesis; components disconnected or missing

**Claim Defensibility (20%)**
- 9-10: Every claim passes three rules: no opinion, must be true, must be specific; zero violations
- 7-8: All claims defensible; one minor vagueness issue
- 5-6: Most claims defensible; 1-2 opinion-adjacent statements detected
- 3-4: Multiple opinion-based claims; weak specificity
- 1-2: Claims sound like opinions; unverifiable or generic

**Proof Density & Quality (15%)**
- 9-10: Every claim has 2+ proof elements; all traced to inventory; proof strength ≥ 7 for all
- 7-8: Every claim has 1+ proof element; all traced to inventory; proof strength ≥ 6
- 5-6: Some chunks have weak proof mapping; inventory tracing incomplete
- 3-4: Multiple chunks missing proof; fabricated proof elements detected
- 1-2: Minimal proof mapping; claims unsupported

**Benefit Dimensionalization (15%)**
- 9-10: Every chunk has functional + dimensionalized + emotional benefit; benefits vivid and specific
- 7-8: Most chunks have complete benefit triplet; some emotional benefits weak
- 5-6: Benefit triplets incomplete; benefits sound like features
- 3-4: Benefits missing or generic; "helps you" language
- 1-2: No benefit dimensionalization; features presented as benefits

**Gap Coverage (10%)**
- 9-10: All prospect questions mapped to chunks; minimum 5 gaps; "How can I get started?" is final; priority distribution clear
- 7-8: Good gap coverage; minor gap unmapped or priority unclear
- 5-6: Gaps present but fewer than 5; "How can I get started?" not final
- 3-4: Significant gaps unmapped; prospect questions unanswered
- 1-2: Minimal gap mapping; argument doesn't address prospect concerns

**TIER1 Pattern Match (10%)**
- 9-10: Structure matches elite TIER1 patterns exactly; demonstrates structural sophistication
- 7-8: Strong similarity to vault patterns; structural quality evident
- 5-6: Some TIER1 elements present; generic structure
- 3-4: Little alignment with elite patterns; formulaic
- 1-2: No structural sophistication; basic structure only

**Flow Architecture (10%)**
- 9-10: Conversational flow throughout; coherence markers natural; simple and SIN segues excellent; read-aloud passes
- 7-8: Good flow; occasional choppy transition; segues present
- 5-6: Flow adequate; some forced connectors; segues functional
- 3-4: Choppy flow; coherence markers missing or awkward; segues weak
- 1-2: No flow architecture; sections feel disconnected

### Output Format

```yaml
arena_judging_output:
  layer: "2.5.2"
  scored_candidates:
    - persona: string
      criterion_scores:
        campaign_thesis_clarity:
          score: integer
          evidence: string
        claim_defensibility:
          score: integer
          evidence: string
        proof_density_quality:
          score: integer
          evidence: string
        benefit_dimensionalization:
          score: integer
          evidence: string
        gap_coverage:
          score: integer
          evidence: string
        tier1_pattern_match:
          score: integer
          evidence: string
        flow_architecture:
          score: integer
          evidence: string
      weighted_total: float
      strongest_elements: [string]
      weakest_elements: [string]
      critical_gaps: [string]
```

### Critique-Specific Guidance

**What The Critic should particularly target in Structure Arena:**
- Campaign thesis that's unclear or multi-headed
- Claims without traceable proof (opinion-based)
- Proof density too thin in critical sections
- Flow architecture with dead spots or momentum loss
- Gap coverage that misses a critical persuasion element

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Candidates generated | 7 | One per competitor (6 personas + The Architect) |
| All criteria scored | 7 per candidate | 7 × 7 = 49 scores |
| Top candidate score | ≥ 8.5 | Weighted total (elevated threshold) |
| No critical gaps | None below 6.0 | Per-criterion review |
| All claims defensible | Zero opinion violations | Claim audit |
| All proof traced | Every proof_id valid | Inventory cross-reference |
| Human selection received | Yes | Selection recorded |

### Gate Failure Protocol

```
IF candidates < 7:
  Re-run generation for missing competitors

IF any criterion unscored:
  Complete judging before proceeding

IF top candidate < 8.5:
  Option A: Return to Layer 1-2 for stronger generation
  Option B: Present to human with warning ("Below optimal threshold")

IF critical gaps exist:
  Flag gaps in presentation to human
  Human decides whether to proceed or iterate

IF opinion-based claims detected:
  BLOCK — remediate claims before proceeding

IF proof_id not traceable:
  BLOCK — validate proof inventory mapping

IF no human selection:
  BLOCK — cannot proceed without human input
```

---

## INTEGRATION WITH PROOF INVENTORY

The Structure Arena has unique constraint: **every claim must trace to proof inventory**.

### Proof Traceability Enforcement

```
FOR each persona generation:
  BEFORE generating claims:
    Load proof-inventory-output.json
    Index all available proof_ids
  DURING generation:
    Every proof_id in CPB chunks MUST exist in inventory
    proof_strength must match inventory strength rating
  AFTER generation:
    Cross-reference all proof_ids
    REJECT any claim with fabricated proof

ANY candidate with untraced proof is AUTOMATICALLY disqualified
```

### Proof Ceiling Protocol

```
IF claim requires proof stronger than available:
  Option A: Weaken claim to match available proof
  Option B: Flag for proof discovery (feedback to 02-proof-inventory)
  Option C: Proceed with gap documented (human acknowledges risk)
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ~system/protocols/ARENA-CORE-PROTOCOL.md v2.0 and ~system/SYSTEM-CORE.md. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: strategic. Replaced Phase 1-4 execution protocol with reference to ~system/protocols/ARENA-CORE-PROTOCOL.md (2-round + audience evaluation mandatory competition, adversarial critique-revise, 7 competitors including The Architect, analytical briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.0 | 2026-02-03 | Initial Arena Layer creation with 6-persona generation, 7-criterion structure-specific judging, proof traceability enforcement, 8.5/10 minimum threshold, human checkpoint |
