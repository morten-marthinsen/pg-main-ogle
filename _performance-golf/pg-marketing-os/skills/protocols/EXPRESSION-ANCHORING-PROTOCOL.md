# Expression Anchoring Protocol — Data-Grounded Expression Generation

**Version:** 1.0
**Created:** 2026-02-23
**Purpose:** Score candidate expressions against audience research quotes and TIER1 conversion-validated patterns BEFORE Arena or final selection
**Referenced by:** Skills 03 (Root Cause), 04 (Mechanism), 06 (Big Idea) — microskills 0.2.8 and anchoring score microskills

---

## Why This Protocol Exists

**The Problem:** Strategic expressions (root cause names, mechanism names, Big Idea wrappers) are generated top-down from concepts but never validated against the audience's actual language. The engine has world-class process but operates in a data vacuum at the expression layer.

**The Evidence:**
- No microskill scores research quotes against generated expressions
- No mechanism validates whether expressions use or ground specific audience language
- No abstraction-scoring system measures distance between raw audience language and strategic output

**The Fix:** Score every expression candidate against three data sources BEFORE it enters Arena or final selection. Additionally, generate expressions BOTTOM-UP from audience quotes (not just top-down from concepts).

**Key Insight:** "The next unit of progress comes from data, not process." This protocol closes the gap between research grounding (Skill 01) and expression generation (Skills 03-06).

---

## Three Scoring Dimensions

Every expression candidate is scored on three dimensions. Each dimension has its own 1-10 scale.

### Dimension 1: Quote Penetration (Weight: 40%)

**What it measures:** How closely does the expression mirror language the audience actually uses?

**Scoring protocol:**
1. Select the top 20 research quotes most relevant to this expression's domain (Pain + Solutions-Tried for root cause; Root Cause + Competitor Mechanism for mechanism; Pain + Hope + FSSIT for Big Idea)
2. For each quote, score semantic overlap with the expression on a 1-10 scale:
   - **1-3:** Expression uses completely different vocabulary and framing than audience
   - **4-6:** Expression captures the audience's concern but in different words
   - **7-8:** Expression uses recognizable audience vocabulary reorganized into a strategic frame
   - **9-10:** Expression feels like something the audience would say themselves, elevated into strategic insight
3. Average the top 5 quote overlap scores (not all 20 — we want resonance with the BEST matches, not average match)

**What good looks like:** A root cause expression like "Shallow Sleep Syndrome" scores high if research quotes contain phrases like "I never feel rested," "my sleep is light," "I wake up tired" — the expression crystallizes their exact experience into a named concept.

**What bad looks like:** An expression that uses technical or unfamiliar vocabulary the audience never uses, even if strategically correct.

### Dimension 2: TIER1 Pattern Match (Weight: 30%)

**What it measures:** Does this expression follow patterns that proved effective in conversion-validated TIER1 controls?

**Scoring protocol:**
1. Load the `tier1_expression_reference.json` produced by microskill 0.2.8 (TIER1 Expression Reference loader)
2. Compare the candidate expression against TIER1 patterns for this skill:
   - **Root Cause (Skill 03):** Compare against `root_cause_architecture` patterns — externalization method, blame framing, three-part structure, villain type
   - **Mechanism (Skill 04):** Compare against `mechanism` patterns — naming specificity, scientific grounding, simplification technique, metaphor anchor type
   - **Big Idea (Skill 06):** Compare against `headline` + `lead` + `rsf_analysis.fssit_candidates` patterns — schema violation type, emotional anchor, narrative reorganization
3. Score pattern alignment:
   - **1-3:** Expression uses no recognizable TIER1 pattern; novel but unvalidated approach
   - **4-6:** Expression follows a general pattern category seen in TIER1 but with significant deviation
   - **7-8:** Expression closely follows a proven TIER1 pattern with appropriate niche adaptation
   - **9-10:** Expression is a clear, well-executed instance of a high-frequency TIER1 pattern

**Important:** This scores STRATEGIC PATTERN match, NOT style or voice match. We're asking "does this expression use a structural approach that has worked in real campaigns?" — not "does it sound like this copywriter?"

### Dimension 3: FSSIT Echo (Weight: 30%)

**What it measures:** Does this expression resonate with the top FSSIT candidates? Would the audience say "finally someone said it" when they hear this expression?

**Scoring protocol:**
1. Load FSSIT-RANKING.md from the project's research outputs (or latent_resonance_field.json)
2. Identify the top 5 FSSIT candidates
3. For each FSSIT candidate, score whether this expression would trigger an FSSIT response:
   - **1-3:** Expression has no connection to any FSSIT candidate; audience wouldn't recognize themselves
   - **4-6:** Expression touches on FSSIT territory but doesn't crystallize the unspoken feeling
   - **7-8:** Expression directly activates one or more FSSIT candidates; audience would feel understood
   - **9-10:** Expression IS the FSSIT — it says exactly what they've been thinking but couldn't articulate
4. Take the highest single FSSIT score (not average — we need at least ONE strong FSSIT connection)

**Fallback:** If no FSSIT data exists (RSF skipped), score this dimension against audience Pain + Hope quotes as proxy. Note in output: "FSSIT data unavailable — scored against Pain/Hope proxy."

---

## Composite Score Calculation

```
Composite = (Quote_Penetration × 0.40) + (TIER1_Pattern × 0.30) + (FSSIT_Echo × 0.30)
```

### Thresholds

| Composite Score | Status | Action |
|----------------|--------|--------|
| **6.5+** | PROCEED | Expression is data-grounded. Eligible for Arena or selection. |
| **5.0–6.4** | FLAGGED | Expression has data gaps. Revise to strengthen weak dimension(s) before Arena. |
| **< 5.0** | REJECTED | Expression is not data-grounded. Remove from candidate pool. |

### Skill-Specific Threshold Overrides

| Skill | Minimum to Proceed | Rationale |
|-------|--------------------|-----------|
| **03 Root Cause** | 6.5 composite, ≥3 variants at 6.5+ | Root cause naming directly affects audience recognition |
| **04 Mechanism** | 6.5 composite, top 5 proceed | Mechanism names must balance audience vocabulary with novelty |
| **06 Big Idea** | 6.0 composite (flag, don't block) | Big Idea wrapping deliberately violates expectations; lower anchoring is expected |

---

## Quote-First Generation Protocol

**Why this exists:** Standard generation works top-down: concept → expression method → naming candidates. This misses bottom-up opportunities where the audience's own words contain latent expression candidates.

**Quote-First Generation produces additional expression candidates derived directly from audience language, alongside (not replacing) concept-down generation.**

### How It Works

```
STEP 1: EXTRACT EMOTIONAL LOAD
  FROM research quotes (top 20 by emotional intensity):
    IDENTIFY the most emotionally loaded phrases
    - Phrases that carry frustration, hope, anger, revelation
    - Phrases that show the audience's OWN framing of their problem
    - Phrases where the audience is already NAMING something (even informally)

STEP 2: REORGANIZE INTO EXPRESSION CANDIDATES
  FOR each emotionally loaded phrase cluster:
    ASK: "If I reorganized these phrases into a [root cause name / mechanism name / Big Idea wrapper], what would emerge?"
    GENERATE: 1-2 expression candidates that:
      - Use the audience's actual vocabulary (or close variants)
      - Apply the structural pattern required by this skill (three-part for root cause, named mechanism, schema-violating wrapper for Big Idea)
      - Feel like the audience's language elevated into strategic insight

STEP 3: MERGE WITH CONCEPT-DOWN CANDIDATES
  ADD quote-first candidates to the pool alongside concept-down candidates
  ALL candidates (concept-down AND quote-first) are scored using the same 3-dimension protocol
  Quote-first candidates will naturally score higher on Quote Penetration (Dimension 1)
  Concept-down candidates may score higher on TIER1 Pattern (Dimension 2)
  This tension is DESIRABLE — it expands the candidate pool quality distribution
```

### Per-Skill Quote-First Specifications

| Skill | Quote Buckets to Mine | Target Quote-First Candidates | What to Build |
|-------|----------------------|------------------------------|---------------|
| **03 Root Cause** | Pain, Solutions-Tried | 3+ additional expression variants | Root cause framings using audience's own frustration language |
| **04 Mechanism** | Root Cause, Competitor Mechanism | 5+ additional naming candidates | Mechanism names derived from how audience talks about solutions/science |
| **06 Big Idea** | Pain, Hope, FSSIT | 3+ additional wrapper concepts | Big Idea angles built from audience's "finally someone said it" moments |

---

## Output Format

Every anchoring score microskill produces a JSON file with this schema:

```yaml
expression_anchoring_scores:
  skill: "[03-root-cause | 04-mechanism | 06-big-idea]"
  timestamp: "[ISO 8601]"
  protocol_version: "1.0"

  inputs:
    research_quotes_loaded: [count]
    tier1_references_loaded: [count]
    fssit_candidates_loaded: [count]
    quote_first_candidates_generated: [count]

  candidates:
    - id: "[candidate identifier]"
      expression: "[the expression text]"
      source: "[concept_down | quote_first]"

      scores:
        quote_penetration:
          score: [1-10]
          top_5_quotes:
            - quote: "[verbatim research quote]"
              overlap_score: [1-10]
              source_bucket: "[pain | hope | solutions_tried | root_cause | competitor_mechanism]"
            # [4 more entries]

        tier1_pattern_match:
          score: [1-10]
          matched_pattern: "[pattern description]"
          tier1_sources: ["[swipe_id_1]", "[swipe_id_2]"]
          pattern_frequency: "[how common this pattern is in TIER1 vault]"

        fssit_echo:
          score: [1-10]
          strongest_fssit: "[the FSSIT candidate text]"
          connection_type: "[direct | thematic | proxy]"
          fssit_available: [true | false]

      composite: [weighted average]
      status: "[proceed | flagged | rejected]"

      revision_guidance: "[if flagged: which dimension to strengthen and how]"

  summary:
    total_candidates: [count]
    proceeded: [count]
    flagged: [count]
    rejected: [count]
    quote_first_vs_concept_down: "[X quote-first, Y concept-down]"
    gate_result: "[PASS | FAIL — PASS if minimum proceed count met]"
    weakest_dimension_overall: "[which dimension had lowest average score]"
```

---

## Integration Points

| System | How This Protocol Integrates |
|--------|----------------------------|
| **Research (Skill 01)** | Consumes research quotes as scoring input (Pain, Hope, Solutions-Tried, Root Cause, Competitor Mechanism, FSSIT) |
| **TIER1 Vault** | Consumes extraction JSON from `tier1-extractions/final_merged/[vertical]/` via 0.2.8 loader |
| **FSSIT Handoff** | Consumes FSSIT-RANKING.md or latent_resonance_field.json for Dimension 3 |
| **Soul.md** | Does NOT constrain anchoring scores (Soul.md constrains voice/energy; anchoring scores measure data grounding) |
| **Arena (Layer 2.5)** | Anchoring scores run BEFORE Arena. Only expressions that pass anchoring proceed to Arena. |
| **Concept Checkpoint** | Anchoring happens AFTER concept approval. Concepts are approved in plain language; anchoring scores their EXPRESSIONS. |

---

## Forbidden Behaviors

1. ❌ Presenting expression candidates to Arena without anchoring scores
2. ❌ Scoring expressions without loading actual research quotes (cannot score from memory)
3. ❌ Skipping Quote-First Generation (must produce quote-first candidates alongside concept-down)
4. ❌ Using TIER1 pattern match as a STYLE score instead of a STRATEGIC PATTERN score
5. ❌ Blocking Big Idea candidates solely on anchoring score (flag only — Big Ideas deliberately violate expectations)
6. ❌ Scoring FSSIT Echo without loading FSSIT-RANKING.md or latent_resonance_field.json (if available)
7. ❌ Averaging all 20 quote overlap scores instead of taking top 5 (we want best-match resonance, not average)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-23 | Initial creation. Three-dimension scoring (Quote Penetration 40%, TIER1 Pattern Match 30%, FSSIT Echo 30%). Quote-First Generation Protocol. Per-skill threshold overrides. Output schema. |
