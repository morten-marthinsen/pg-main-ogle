# CopywritingEngine — ~system/ARENA-PROTOCOL.md

**Version:** 1.0 (decomposed from CLAUDE.md v4.0)
**Created:** 2026-02-25
**Purpose:** Arena Layer protocol, Synthesizer, Agent Teams. Load for Arena skills ONLY.
**Parent:** Read `~system/SYSTEM-CORE.md` first (always loaded).

---

## ARENA LAYER (2.5) MANDATORY PROTOCOL

The Arena Layer transforms single-perspective generation into **7-competitor, 3-round competition with adversarial critique-revise cycles**. Seven competitors (6 legendary copywriter personas + The Architect) each generate their version, receive adversarial critique, revise, get scored, learn from winners, and compete again across 3 mandatory rounds.

**Full Protocol:** `~system/protocols/ARENA-CORE-PROTOCOL.md`
**Persona Specs:** `~system/protocols/ARENA-PERSONA-PANEL.md`

**Arena Layer Position:** Between Layer 2 (drafting/critique) and Layer 3 (validation).

**Skills with Arena Layers:**
- Strategic skills (03-08): Root Cause, Mechanism, Promise, Big Idea, Offer, Structure — `arena_mode: strategic`
- Generative skills (10-18): Headlines, Lead, Story, Root Cause Narrative, Mechanism Narrative, Product Introduction, Offer Copy, Close, Proof Weaving — `arena_mode: generative_full_draft`
- Editorial (20): Editorial — `arena_mode: editorial_revision`

### The 7 Arena Competitors

| # | Competitor | Editorial Lens | Generation Focus |
|---|-----------|---------------|------------------|
| 1 | **Makepeace** | Flow & Architecture | Momentum, transitions, seamless structure |
| 2 | **Halbert** | Entertainment & Personality | Story, drama, hook power |
| 3 | **Schwartz** | Sophistication Calibration | Market awareness, claim calibration |
| 4 | **Ogilvy** | Credibility & Clarity | Evidence, specificity, intelligent reader respect |
| 5 | **Craig Clemens** | Scientific Clarity | Binary reframes, 12-year-old language |
| 6 | **Bencivenga** | Proof-First Authority | Evidence pathway, institutional backing |
| 7 | **The Architect** | Integration & Synthesis | Multi-lens balanced optimization |

### The Critic (Adversarial Role — NOT a Competitor)

A **dedicated adversarial critic** evaluates every output using the SAME 7 skill-specific criteria as the judge:
- Identifies **ONE weakest element** per output (forces prioritization)
- Maps weakness to a **specific criterion**
- Provides **actionable fix direction** (not vague "make it better")
- Must **cite evidence** from the output

### 3-Round Mandatory Execution Flow

```
ROUND 1:
  1A: 7 Competitors Generate → 1B: Critic Identifies Weakness →
  1C: Targeted Revision → 1D: Scoring → 1E: Ranking → 1F: Learning Brief
  --- Context compression: non-winners compressed to summaries ---

ROUND 2:
  2A: Learning Brief distributed → 2B: 7 Re-generate (incorporating learnings) →
  2C: Critique → 2D: Revision → 2E: Scoring → 2F: Cumulative Learning Brief
  --- Context compression ---

ROUND 3:
  3A: Cumulative Brief distributed → 3B: 7 Generate FINAL →
  3C: Critique → 3D: Revision → 3E: FINAL Scoring → 3F: FINAL Ranking

POST-ARENA (Layer 2.6):
  Synthesizer decomposes all 7 Round 3 outputs → 2-3 phrase-level hybrids

HUMAN SELECTION (BLOCKING):
  7 pure Round 3 outputs + 2-3 hybrids = 9-10 candidates
```

**This is NOT optional. NOT a flag. 3 rounds DEFAULT. Every Arena runs 3 rounds.**

### Learning Between Rounds: Techniques Not Voice

Losers absorb the winner's TECHNIQUES but maintain their persona voice:
- Halbert learning Ogilvy's credibility technique doesn't make Halbert sound like Ogilvy
- Bencivenga using Makepeace's flow transitions doesn't abandon proof-first architecture
- The Learning Brief MUST include `voice_preservation_note` per competitor

### Arena Modes

| Mode | Skills | What Changes |
|------|--------|-------------|
| `strategic` | 03-08 | No behavioral change. Add 3-round + critique. |
| `generative_full_draft` | 10-18 | Competitors write COMPLETE PIECES from upstream packages. Layer 2 draft = reference material, not template. |
| `editorial_revision` | 20 | Stays revision-based. Per-issue competition. P1/P2 = 3 rounds; P3+ can bypass with human confirmation. |

### The 7 Default Judging Criteria

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| **Issue Resolution / Goal Achievement** | 20% | Does this actually accomplish the objective? |
| **Voice Preservation** | 20% | Does it maintain established voice/tone? |
| **Flow Enhancement** | 15% | Does it improve or maintain momentum? |
| **Clarity Improvement** | 15% | Clearer without oversimplifying? |
| **Slop Elimination** | 10% | Zero AI telltales, no corporate filler |
| **Brevity** | 10% | Same impact with fewer words |
| **Threading Preservation** | 10% | Mechanism name, root cause anchor intact? |

### Quality Thresholds

```
MINIMUM SCORES FOR ACCEPTANCE:
- Overall weighted score: >= 8.5
- Voice preservation: >= 7.0 (deal-breaker if below)
- Threading preservation: >= 7.0
- Issue/goal resolution: >= 7.0
```

### BLOCKING Human Selection Checkpoint

**Arena Layer is BLOCKING** — Cannot proceed to Layer 3 until:

```
[ ] All 7 competitors generated across all 3 rounds
[ ] Adversarial critique completed each round
[ ] All candidates scored against 7 criteria
[ ] Post-arena synthesis complete (2-3 hybrids)
[ ] 9-10 candidates presented with rationale
[ ] Human selection received OR bypass confirmed for minor issues
[ ] Any APPROVAL-REQUIRED changes explicitly approved
```

### Anti-Slop Enforcement in Arena

**Revision Poison Words (NEVER introduce):**

| Category | Words to Avoid |
|----------|---------------|
| AI Telltales | revolutionary, game-changing, unlock, harness, leverage, dive deep, journey, empower, transform, breakthrough |
| Corporate Filler | comprehensive, robust, innovative, state-of-the-art, synergy, best-in-class, holistic, optimize, streamline |
| Hedge Words | might, could potentially, may want to, perhaps, arguably, it seems, appears to be |
| Empty Intensifiers | literally, absolutely, totally, completely, incredibly, extremely, amazingly, truly |
| Copywriting Clichés | imagine if you could, picture this, what if I told you, the truth is, here's the thing |

### Arena Context Management

| Transition | Keep (Verbatim) | Compress (to Summaries) |
|-----------|-----------------|------------------------|
| R1 → R2 | Winner output + Learning Brief + all scores | Non-winning outputs → 2-3 sentences each |
| R2 → R3 | R1+R2 winners + Cumulative Learning Brief + R2 scores | R1 non-winners + R2 non-winners |
| R3 → Selection | ALL 7 Round 3 outputs (full) + hybrids | Prior round summaries can be dropped |

---

## AGENT TEAM ARENA EXECUTION

**Why This Exists:** In single-context mode, 7 "competitors" are actually one model simulating 7 voices in sequence — causing persona contamination, context pressure, and self-critique weakness. Agent Teams solves this by giving each persona its own independent Claude instance.

### Single-Context Mode = DEGRADED MODE (Hardened)

**Single-context Arena caps at B+ quality without hardening. With hardening, approaches A-. A-grade output requires Agent Teams.**

When Agent Teams is not available:
- Revert to single-context arena execution
- Use `effort: max` for all generation phases
- Apply strict context compression between rounds
- **Apply Single-Context Hardening** (see `~system/protocols/ARENA-CORE-PROTOCOL.md` Upgrade 3.6):
  - Reduce to **4 personas** (Makepeace, Halbert, Clemens, Architect)
  - Load **fresh voice sample** before each persona generates
  - Run **programmatic similarity check** after each round (flag >40% 5-gram overlap)
- Use Sequential Isolation protocol (below) to minimize contamination
- Quality ceiling raised from B+ to A- with hardening applied

### Sequential Isolation Protocol (Single-Context Contamination Barrier)

When running Arena in single-context mode, use file I/O as a contamination barrier:

```
FOR EACH COMPETITOR IN SEQUENCE:
  1. Write previous competitor's output to file
  2. Clear conversation of previous competitor's generation content
  3. Re-read ONLY: upstream packages + specimens + persona spec + Learning Brief
  4. Generate current competitor's output from file-loaded context ONLY
  5. Write output to file immediately

CRITIC:
  1. Read ONLY the output files (not the generation context)
  2. Critique is genuinely external to generation process

JUDGE:
  1. Read ONLY the output files + critique files
  2. Scoring is genuinely independent of generation
```

This doesn't achieve full isolation (same model still generates all), but file I/O as boundary reduces sequential contamination.

### Agent Team Structure

```
TEAM LEAD (Arena Coordinator)
├── PERSONA TEAMMATES (7 — generate in parallel):
│   ├── Makepeace Agent   → Full 200K context
│   ├── Halbert Agent     → Full 200K context
│   ├── Schwartz Agent    → Full 200K context
│   ├── Ogilvy Agent      → Full 200K context
│   ├── Clemens Agent     → Full 200K context
│   ├── Bencivenga Agent  → Full 200K context
│   └── Architect Agent   → Full 200K context
├── CRITIC AGENT (adversarial — NO generation context)
└── JUDGE AGENT (scoring — separate from Critic)
```

### Agent Team Round Coordination

```
ROUND 1:
  Team Lead → Distributes upstream packages + specimens + persona instructions to all 7
  All 7 persona teammates generate IN PARALLEL (effort: max)
  Team Lead → Collects 7 outputs → Sends to Critic Agent
  Critic Agent → Returns critique for each output (effort: high)
  Team Lead → Distributes critiques back to persona teammates
  All 7 revise targeted weakness IN PARALLEL (effort: max)
  Team Lead → Collects revised outputs → Sends to Judge Agent
  Judge Agent → Scores all 7, generates Learning Brief (effort: high)

ROUNDS 2-3: Same flow with cumulative learning.

POST-ARENA:
  Architect Agent → Creates 2-3 phrase-level hybrids (effort: max)
  Team Lead → Presents 9-10 candidates to human
```

---

## MULTI-ROUND ARENA ENFORCEMENT

**Why 3 Rounds Are Mandatory:**

- Round 1: Raw talent — each competitor's natural approach
- Round 2: Informed talent — winners' techniques distributed, losers improve
- Round 3: Peak performance — cumulative learning, final competitive push

**There is NO exception for fewer than 3 rounds.** The only bypass is `editorial_revision` mode for P3+ issues.

---

## SYNTHESIZER LAYER (2.6) MANDATORY PROTOCOL

The Synthesizer Layer creates hybrid candidates by extracting the best **phrases and micro-elements** from each competitor's Round 3 output and reconstructing new unified outputs.

**The Architect plays a DUAL ROLE:**
1. **In-Arena Competitor** (Rounds 1-3)
2. **Post-Arena Hybrid Creator** (After Round 3)

**Reference:** Full protocol in `SYNTHESIZER-LAYER.md`

### The Synthesis Process

1. **Micro-Element Decomposition** — Break each output into smallest meaningful units
2. **Function Tagging** — Tag what each phrase accomplishes
3. **Cross-Competitor Scoring** — Score each micro-element on function strength, specificity, originality
4. **Best-Element Matrix** — Identify winning phrase for each function
5. **Hybrid Reconstruction** — WRITE (not splice) new outputs using best phrases as ingredients
6. **Coherence Validation** — Ensure hybrids read naturally

### Quality Thresholds

- Hybrids must score **>= 8.0** to be presented
- All coherence checks must pass (6/6)
- At least 2 meaningfully different hybrids required

### Synthesizer Forbidden Behaviors

1. ❌ Splicing phrases without rewriting into coherent output
2. ❌ Presenting hybrids that fail coherence checks
3. ❌ Creating redundant hybrids
4. ❌ Skipping attribution tracking
5. ❌ Running synthesis BEFORE Arena
