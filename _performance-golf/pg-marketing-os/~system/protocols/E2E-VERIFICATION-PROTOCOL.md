# End-to-End Verification Protocol

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Full-piece reader agent evaluation and continuity verification. Runs after assembly, before editorial, across ALL engines. Reader agents (extended audience agent personas) read the complete assembled piece as a continuous customer experience — detecting drop-off points, emotional arc breaks, objection gaps, voice inconsistencies, and pacing failures that per-section evaluation cannot catch.
**Authority:** Referenced by editorial skills (Skill 20, EC-06, U5, CK-03, E4, ADV-05). Extends AUDIENCE-AGENT-PROTOCOL.md with Reader Mode.

---

## WHY THIS EXISTS

Per-section copy generation (Arena per skill) optimizes each section in isolation. But the customer reads the ENTIRE piece as a continuous experience. Problems invisible at the section level become obvious at the piece level:

- **Emotional arc breaks** — Section 3 builds tension, Section 4 resolves it, Section 5 tries to rebuild tension. The customer feels whiplash.
- **Drop-off cliffs** — Two heavy proof sections back-to-back. Neither is bad alone, but together they exhaust attention.
- **Objection gaps** — Section 6 raises an objection that Section 8 addresses. But the customer stopped reading at Section 7 because 2 sections of unaddressed doubt is too long.
- **Voice drift** — Section 2 is casual and warm. Section 5 is clinical and formal. Each Arena picked the "best" variant, but they came from different personas.
- **Threading failures** — The story introduced in Section 1 is never resolved. Feature names shift between sections. The mechanism description in Section 3 contradicts the explanation in Section 6.

These are **systemic failures** — they emerge from composition, not generation. The Arena catches per-section quality. E2E verification catches piece-level coherence.

---

## WHEN THIS RUNS

E2E verification runs at a specific point in each engine's pipeline: **after assembly, before editorial.**

### Trigger Points by Engine

| Engine | Assembly Skill | E2E Verification | Editorial Skill |
|--------|---------------|-----------------|----------------|
| Long-Form VSL | 19 (campaign-assembly) | Runs here | 20 (editorial) |
| E-Commerce | EC-05 (assembly) | Runs here | EC-06 (editorial) |
| Upsells | U4 (upsell-assembler) | Runs here | U5 (editorial) |
| Checkout | CK-01 + CK-02 (both complete) | Runs here | CK-03 (editorial) |
| Emails | E3 (sequence-assembler) | Runs here | E4 (editorial) |
| Advertorials | ADV-04 (assembly) | Runs here | ADV-05 (editorial) |
| Ads | A09 (assembly-variant-matrix) | Runs here | — (no editorial; review is A10 pre-launch scoring) |

### How It's Triggered

E2E verification is NOT a separate node in the Pipeline DAG. It is triggered as the **first step of each editorial skill's Layer 0** loading sequence. The editorial skill's upstream loader:

1. Loads the assembled piece (standard upstream load)
2. Triggers E2E verification on the assembled piece
3. Receives the E2E verification report
4. Uses the report as additional input for issue identification (Layer 1)

This keeps the DAG unchanged while ensuring E2E verification always runs before editorial revision.

### Tier Application

| Tier | E2E Verification | Reader Agents | Continuity Check |
|------|-----------------|---------------|-----------------|
| **Full** | All engines with assembly + editorial | 5-7 (all audience agent personas) | Full 6-dimension check |
| **Standard** | VSL + 1 priority engine (human chooses) | 3 (top audience agent personas) | 4-dimension check (drops threading detail, pacing granularity) |
| **Quick** | None | None | None |

---

## COMPONENT 1: READER AGENTS

### What Reader Agents Are

Reader agents are the SAME audience agent personas used in Arena evaluation (see `AUDIENCE-AGENT-PROTOCOL.md`), operating in **Reader Mode** instead of **Arena Mode**.

| | Arena Mode | Reader Mode |
|---|-----------|-------------|
| **Input** | Individual skill output variants (7 per round) | Complete assembled piece (one continuous read) |
| **Perspective** | Comparing variants | Experiencing the piece as a customer |
| **Evaluation** | 8 per-variant dimensions | 8 continuous-experience dimensions |
| **Output** | Per-variant structured reaction | Per-piece narrative journey report |
| **Length** | ~500 words per variant | ~800-1,200 words per piece |
| **Awareness** | Blind to writer identities, scores | Blind to section boundaries, skill origins |

### Reader Mode Evaluation Dimensions

Each reader agent reads the FULL assembled piece and responds across 8 dimensions — all in FIRST PERSON as their persona.

| # | Dimension | The Question | What It Catches |
|---|-----------|-------------|-----------------|
| 1 | **Continuous Engagement** | "Did I stay with this from start to finish? Where did my attention waver?" | Drop-off points, attention fatigue, pacing problems |
| 2 | **Emotional Journey** | "What did I FEEL at each stage? Did the piece take me somewhere?" | Emotional arc coherence, premature resolution, tension-dip-tension whiplash |
| 3 | **Objection Timeline** | "When did doubts arise, and were they addressed before I gave up?" | Objection gaps, delayed resolution, trust decay |
| 4 | **Voice Consistency** | "Did it feel like the same person talking throughout?" | Voice drift between sections, register shifts, vocabulary mismatches |
| 5 | **Story Completeness** | "Were threads that started early resolved by the end?" | Abandoned narratives, dangling references, setup without payoff |
| 6 | **Pacing** | "Did it drag? Rush? Feel uneven?" | Section length imbalance, information density spikes, repetitive passages |
| 7 | **Decision Readiness** | "By the end, do I have everything I need to decide?" | Missing information, unaddressed barriers, incomplete value articulation |
| 8 | **Final Verdict** | "After reading all of this — am I in or am I out? Why?" | Net conversion impact, lingering resistance, overall piece effectiveness |

### Reader Agent Response Format

```yaml
reader_report:
  agent_id: "AA-01"
  agent_name: "Frustrated Weekend Golfer"
  engine: "long_form_vsl"
  piece_evaluated: "[filename of assembled piece]"
  read_time_simulated: "[estimated minutes a real reader would spend]"

  continuous_engagement:
    stayed_to_end: true | false
    attention_wavered_at: "[quote the passage where attention dipped, or 'never']"
    strongest_hook_moment: "[quote the passage that pulled me in deepest]"
    reaction: "[first-person — 3-5 sentences about the reading experience]"

  emotional_journey:
    arc_description: "[2-3 sentences mapping the emotional path: started feeling X, then Y, then Z]"
    arc_breaks:
      - section: "[approximate location]"
        felt: "[emotion before]"
        then_felt: "[emotion after — if jarring, explain why]"
    peak_moment: "[the single most powerful emotional beat]"
    reaction: "[first-person — what the journey felt like]"

  objection_timeline:
    doubts_arose:
      - at: "[approximate location]"
        doubt: "[first-person objection]"
        resolved_at: "[location where addressed, or 'never']"
        wait_too_long: true | false
    unresolved_objections:
      - "[objection that was never addressed]"
    reaction: "[first-person — did I feel my concerns were heard?]"

  voice_consistency:
    felt_unified: true | false
    drift_points:
      - at: "[approximate location]"
        description: "[what changed — tone, vocabulary, formality, energy]"
    reaction: "[first-person — did it feel like one person or a committee?]"

  story_completeness:
    threads_resolved: true | false
    dangling_threads:
      - "[thread that started but was never finished]"
    reaction: "[first-person — did the narrative make sense as a whole?]"

  pacing:
    overall: "too_fast | just_right | too_slow | uneven"
    drag_points:
      - at: "[approximate location]"
        reason: "[why it dragged — repetitive, too dense, too abstract]"
    rush_points:
      - at: "[approximate location]"
        reason: "[why it felt rushed — important point glossed over]"
    reaction: "[first-person]"

  decision_readiness:
    have_enough_info: true | false
    missing_information:
      - "[what I still need to know]"
    remaining_barriers:
      - "[what's still holding me back]"
    reaction: "[first-person]"

  final_verdict:
    in_or_out: "in | leaning_in | on_the_fence | leaning_out | out"
    why: "[first-person — 3-5 sentences on the final decision and reasoning]"
    purchase_intent_score: 1-10
    compared_to_arena: "[higher | lower | same — how does the full piece compare to the best individual sections?]"

  journey_summary: "[3-5 sentences — the raw, unfiltered experience of reading this piece as a customer from start to finish]"
```

### Reader Agent Anti-Degradation

All rules from AUDIENCE-AGENT-PROTOCOL.md Section "Anti-Degradation Rules" apply, plus:

1. **Read the entire piece.** Do not skip sections. Do not skim. React to the FULL experience.
2. **Do not evaluate sections individually.** This is not Arena mode. React to the PIECE as a whole.
3. **Note transitions explicitly.** Pay attention to how one section flows into the next. These joints are where E2E problems live.
4. **Do not know section boundaries.** The assembled piece should be presented as a continuous document without section markers. If section headers exist (as they would in a VSL or sales page), the reader sees them as navigation, not as skill boundaries.
5. **Be honest about when you'd stop reading.** In Arena mode, agents evaluate the full variant. In Reader mode, if a real customer would have abandoned at page 3, say so. Subsequent reactions can note "I would have stopped here, but reading on I found..."

---

## COMPONENT 2: CONTINUITY CHECKER

The Continuity Checker is a separate analytical pass (NOT a reader agent — this is an ANALYTICAL tool, not a persona simulation).

### What It Checks

| # | Dimension | Method | Failure Signal |
|---|-----------|--------|----------------|
| 1 | **Voice Register** | Compare vocabulary complexity, sentence length, formality level across sections | Register shift > 2 levels (e.g., Grade 6 → Grade 10 reading level) |
| 2 | **Expression Anchoring** | Verify key expressions from Foundation skills appear correctly and consistently | Expression missing, mutated, or contradicted in later sections |
| 3 | **Feature/Mechanism Naming** | Cross-reference all feature names, mechanism names, product names against canonical sources | Name drift, abbreviation, paraphrasing, invention |
| 4 | **Narrative Threading** | Track story elements introduced in early sections and verify resolution | Setup without payoff, orphaned references, contradictory claims |
| 5 | **Tone Escalation** | Verify emotional intensity builds toward CTA sections | Plateau (flat energy), dip (energy drops before CTA), premature peak (climax too early) |
| 6 | **Proof Distribution** | Map proof elements across the full piece | Proof deserts (2+ consecutive sections without proof), proof clustering (all proof in one zone) |

### Continuity Checker Configuration

```yaml
continuity_checker_config:
  model: Opus 4.6         # Analytical — requires cross-referencing multiple sections
  tools: [Read]            # Read-only
  message_history: null    # Fresh context — no generation contamination

  inputs:
    - assembled_piece       # The full piece to verify
    - campaign_brief        # Canonical expressions, mechanism names, feature names
    - context_reservoir     # Voice register anchors
    - foundation_outputs    # Root cause, mechanism, promise, big idea — expression sources
    - soul_md               # Voice constraints (if exists)

  output: continuity_report.yaml
```

### Continuity Report Format

```yaml
continuity_report:
  engine: "[engine_id]"
  piece_evaluated: "[filename]"
  total_sections_analyzed: N
  evaluation_date: "[ISO 8601]"

  voice_register:
    consistent: true | false
    shifts:
      - from_section: "[section reference]"
        to_section: "[section reference]"
        shift_description: "[what changed]"
        severity: "P1 | P2 | P3"

  expression_anchoring:
    expressions_tracked: N
    all_correct: true | false
    issues:
      - expression: "[the canonical expression]"
        location: "[where the issue is]"
        issue: "missing | mutated | contradicted"
        severity: "P1 | P2"

  naming_consistency:
    names_tracked: N
    all_consistent: true | false
    issues:
      - canonical_name: "[correct name]"
        found_variant: "[what appeared instead]"
        location: "[where]"
        issue_type: "abbreviation | paraphrase | invention | case_drift"
        severity: "P2 | P3"

  narrative_threading:
    threads_tracked: N
    all_resolved: true | false
    issues:
      - thread: "[description of the narrative thread]"
        introduced_at: "[section]"
        expected_resolution: "[section]"
        actual_resolution: "resolved | orphaned | contradicted"
        severity: "P1 | P2"

  tone_escalation:
    pattern: "building | flat | dipping | premature_peak | strong_build"
    issues:
      - at: "[section]"
        description: "[what happened to energy/tone]"
        severity: "P2 | P3"

  proof_distribution:
    total_proof_elements: N
    proof_deserts: ["[section ranges with no proof]"]
    proof_clusters: ["[sections with disproportionate proof density]"]
    severity: "P2 | P3 | none"

  summary:
    total_issues: N
    p1_count: N
    p2_count: N
    p3_count: N
    recommendation: "PROCEED | REVISE_BEFORE_EDITORIAL | FLAG_FOR_HUMAN"
```

---

## COMPONENT 3: E2E VERIFICATION REPORT

The verification report synthesizes reader agent reactions and continuity checker findings into a single document consumed by the editorial skill.

### Synthesis Process

```
1. COLLECT all reader agent journey reports
2. COLLECT continuity checker report
3. SYNTHESIZE:
   a. Drop-off consensus — where did MULTIPLE readers lose interest?
   b. Emotional arc consensus — do readers agree on the journey shape?
   c. Objection gap consensus — which unresolved objections appeared across multiple readers?
   d. Voice drift correlation — do reader "felt like a committee" points match continuity checker voice register shifts?
   e. Pacing consensus — where do readers agree it drags or rushes?
   f. Conversion impact — what's the average final_verdict across readers?
4. CLASSIFY issues by severity:
   P1: Drop-off consensus (3+ readers), emotional arc break, voice register shift > 2 levels
   P2: Objection gap (2+ readers), naming inconsistency, threading failure
   P3: Pacing imbalance, proof distribution, single-reader concerns
5. GENERATE: e2e-verification-report.yaml
```

### Report Schema

```yaml
e2e_verification_report:
  engine: "[engine_id]"
  piece: "[filename]"
  evaluation_date: "[ISO 8601]"
  reader_agents_used: N
  tier: "full | standard"

  overall_verdict: "STRONG | ACCEPTABLE | NEEDS_REVISION | CRITICAL_ISSUES"
  average_purchase_intent: N  # 1-10 average across readers
  completion_rate: "N/N readers would finish"  # e.g., "4/5 readers would finish"

  drop_off_points:
    - location: "[approximate section/passage]"
      readers_affected: N
      consensus_reason: "[why they stopped]"
      severity: "P1 | P2"

  emotional_arc:
    consensus_shape: "[e.g., builds tension → resolves → rebuilds → strong close]"
    breaks:
      - location: "[section]"
        description: "[what the break feels like to readers]"
        readers_affected: N
        severity: "P1 | P2"

  objection_gaps:
    - objection: "[the unresolved concern]"
      raised_at: "[section]"
      resolved_at: "[section or 'never']"
      readers_affected: N
      severity: "P1 | P2"

  voice_issues:
    reader_perception: "[unified | mostly_unified | inconsistent]"
    continuity_correlation: "[do reader voice complaints match checker findings?]"
    issues:
      - location: "[section]"
        description: "[what readers and/or checker flagged]"
        severity: "P1 | P2 | P3"

  pacing_issues:
    - location: "[section]"
      type: "drag | rush | repetitive"
      readers_affected: N
      severity: "P2 | P3"

  threading_issues:
    - from continuity_report (incorporated directly)

  proof_distribution_issues:
    - from continuity_report (incorporated directly)

  issue_summary:
    total: N
    p1: N
    p2: N
    p3: N

  editorial_recommendations:
    - issue_ref: "[reference to specific issue above]"
      recommendation: "[specific action for editorial to take]"
      priority: "P1 | P2 | P3"

  raw_reader_reports: "[path to individual reader report files]"
  continuity_report: "[path to continuity report file]"
```

---

## ENGINE-SPECIFIC INTEGRATION

### How Each Editorial Skill Consumes E2E Verification

| Editorial Skill | Where E2E Report Loads | How It's Used |
|----------------|----------------------|---------------|
| **Skill 20** (VSL Editorial) | Layer 0 upstream loading | P1/P2 issues from E2E report fed into Layer 1 issue identification alongside Skill 20's 6 legendary lenses. Drop-off points map to engagement issues; voice drift maps to voice consistency audit. |
| **EC-06** (E-Comm Editorial) | Layer 0 upstream loading | E2E report feeds the 6-lens audit (Layer 1). Drop-off points → Scan Optimization audit (Lens 1). Voice issues → Feature Naming Consistency audit (Lens 3). Proof gaps → Proof Density audit (Lens 2). |
| **U5** (Upsell Editorial) | Layer 0 upstream loading | E2E report verifies congruence chain across the multi-piece upsell sequence. Reader journey across order-bump → upsell → downsell checks the emotional escalation pattern. |
| **CK-03** (Checkout Editorial) | Layer 0 upstream loading | E2E report feeds trust density audit. Reader objection timeline maps to checkout-specific friction points. Voice consistency verifies the checkout feels like the same brand as the main offer. |
| **E4** (Email Editorial) | Layer 0 upstream loading | E2E report verifies campaign-level criteria (C1-C5). Reader journey across the email sequence checks emotional arc, subject-to-body consistency, and voice stability across N emails. |
| **ADV-05** (Advertorial Editorial) | Layer 0 upstream loading | E2E report feeds editorial smell test. Reader voice_consistency checks whether the advertorial maintains editorial authenticity throughout. Drop-off points identify where it "starts to feel like an ad." |
| **A10** (Ad Pre-Launch Scoring) | Layer 0 input | For ads: E2E runs on assembled variant matrix. Reader reactions per variant type feed pre-launch scoring criteria. |

### Issue Severity Mapping to Editorial Treatment

| E2E Severity | Editorial Treatment | Rationale |
|-------------|-------------------|-----------|
| **P1** (drop-off consensus, arc break, voice shift) | Full Arena in editorial | Piece-level structural failures require competitive revision approaches |
| **P2** (objection gap, naming, threading) | Arena for compound issues; direct fix for isolated | Multiple interacting issues need Arena; single-point fixes don't |
| **P3** (pacing, proof distribution, single-reader) | Direct fix in editorial | Low-risk issues with clear solutions |

---

## TOKEN BUDGET

### Per Engine (Full Tier)

| Component | Tokens (est.) |
|-----------|---------------|
| Assembled piece (read by all agents) | ~20-40K |
| 5 reader agent persona specs | ~15K (loaded per agent) |
| 5 reader agent reports (output) | ~30-40K (~800-1200 words each) |
| Continuity checker inputs (piece + foundation refs) | ~25-35K |
| Continuity checker report (output) | ~5K |
| Synthesis into E2E report | ~5K |
| **Total per engine** | ~100-140K |
| **Cost estimate** | ~$0.40-1.50 (reader agents on Sonnet 4.5, continuity checker on Opus 4.6) |

### Model Routing

| Component | Model | Rationale |
|-----------|-------|-----------|
| Reader agents | Sonnet 4.5 | Persona simulation — rich but evaluative (same as Arena audience agents) |
| Continuity checker | Opus 4.6 | Cross-referencing multiple sections against canonical sources requires deep analytical reasoning |
| Report synthesis | Opus 4.6 | Causal analysis across reader + checker data |

---

## EXECUTION FLOW

```
Assembly skill completes (e.g., Skill 19, EC-05, U4, E3, ADV-04)
    ↓
Orchestrator resolves editorial skill as next eligible
    ↓
Editorial skill Layer 0 loads assembled piece
    ↓
Layer 0 checks tier: Full or Standard → trigger E2E verification
    ↓
┌─────────────────────────────────────────────────┐
│  E2E VERIFICATION (runs inside editorial Layer 0) │
│                                                     │
│  1. LOAD audience-agent-personas.json                │
│     → Select reader agents per tier                 │
│                                                     │
│  2. READER AGENT PASS                               │
│     → Each agent reads FULL assembled piece         │
│     → Produces journey report per reader agent      │
│     → Agents run in parallel (or sequentially       │
│       in single-context with file isolation)        │
│                                                     │
│  3. CONTINUITY CHECKER PASS                         │
│     → Analytical scan of full piece against         │
│       foundation outputs, expression anchors,       │
│       canonical names                               │
│     → Produces continuity report                    │
│                                                     │
│  4. SYNTHESIS                                       │
│     → Combine reader reports + continuity report    │
│     → Classify issues by severity                   │
│     → Generate e2e-verification-report.yaml         │
│                                                     │
│  OUTPUT: e2e-verification-report.yaml               │
│  STORED: ~outputs/[project-code]/[engine]/          │
└─────────────────────────────────────────────────┘
    ↓
Editorial skill Layer 1 loads E2E report alongside its standard inputs
    ↓
E2E P1/P2 issues feed into editorial issue identification
    ↓
Editorial proceeds with standard revision workflow (Arena for P1/P2, direct for P3)
    ↓
Post-editorial: verify E2E issues were addressed in final output
```

---

## SPECIAL CASES

### Case 1: Email Sequence (Multi-Piece)

The email engine produces N emails assembled by E3. E2E verification reads the FULL SEQUENCE as a continuous customer journey across emails:

1. Reader agents read Email 1 → Email 2 → ... → Email N in order
2. They react to the cumulative experience, not individual emails
3. Emotional arc maps across the sequence (tension builds across emails)
4. Voice consistency spans the sequence (same sender voice throughout)
5. Objection timeline spans emails (objection in Email 2, resolution by Email 5)

The continuity checker additionally verifies E4's campaign-level criteria (C1-C5): body type variety, emotional arc, cross-email continuity (Scheherazade threading), urgency escalation, subject line diversity.

### Case 2: Upsell Sequence (Multi-Piece)

The upsell engine produces 3 pieces: order bump, upsell, downsell. Reader agents read all 3 as a continuous post-purchase experience:

1. They start from "just bought the main product" mindset
2. Order bump → upsell → downsell is the journey
3. Congruence across pieces is the primary signal (mechanism threading, tone shifts post-decline)
4. Decision fatigue is monitored (does the sequence exhaust the buyer?)

### Case 3: Ads (Variant Matrix)

Ads don't have a traditional editorial. E2E verification runs on a SAMPLE of assembled variants (3-5 representative variants from A09's matrix):

1. Reader agents react to each variant as an ad encounter
2. No continuous read — each variant is independent
3. Focus dimensions: Attention (did it stop me?), Credibility (do I believe it?), Purchase Intent
4. Results feed A10 (pre-launch scoring) rather than an editorial skill

### Case 4: Checkout (Short-Form)

Checkout copy is brief. E2E verification adapts:

1. Reader agents evaluate the checkout experience holistically (trust signals, friction points, abandonment risk)
2. Continuity checker verifies checkout voice matches the main offer voice
3. Focus: trust density, completion likelihood, mobile experience
4. Shorter reader reports (~400-600 words) due to shorter piece

### Case 5: No Audience Agents Constructed

If a project skipped audience agent construction (e.g., Quick tier, or research was abbreviated):

1. E2E verification cannot run reader agents (no persona data)
2. Continuity checker STILL runs (doesn't need audience personas)
3. Editorial skill proceeds with continuity report only
4. Flag to human: "Reader agent evaluation skipped — no audience personas available. Continuity check only."

---

## ANTI-DEGRADATION RULES

### Reader Agent Rules

All rules from AUDIENCE-AGENT-PROTOCOL.md apply, plus:

1. **Read the full piece as a customer encounter.** Not as an evaluator processing sections. A real customer scrolls through this page or watches this video.
2. **Note your honest stopping point.** If a real customer would have bounced at Section 3, say so. Continue reading for the evaluation, but flag it.
3. **Track your emotional state throughout.** Not just "did I feel something" but "I felt X at the beginning, then Y in the middle, then Z at the end."
4. **Do not compare to Arena variants.** You may have evaluated individual sections during Arena. Forget those evaluations. React to the assembled piece fresh.
5. **Surface what's missing, not just what's broken.** "I kept waiting for them to address X and they never did" is as valuable as "Section 5 lost me."

### Continuity Checker Rules

1. **Reference canonical sources only.** Voice register anchors come from the context reservoir and Soul.md, not from "what sounds consistent."
2. **Evidence-based findings only.** Every issue must quote the specific passage AND the canonical reference it violates.
3. **Severity must be justified.** P1 requires demonstrable impact on piece coherence. Don't escalate style preferences to structural failures.

### Audience Agent Homogenization Detection

When audience agents (Reader Mode evaluation) produce suspiciously uniform feedback, this indicates LLM homogenization rather than genuine consumer consensus. Three detection mechanisms:

**Detection 1: Score Variance Check**
- Compute SD of `purchase_intent_score` across all reader agents
- **Flag if:** SD < 0.5 across all agents
- **Signal:** Agents are scoring too uniformly — insufficient differentiation between personas

**Detection 2: Pairwise Feedback Similarity**
- Compare structural patterns in reader agent feedback (objection timelines, drop-off points, emotional arcs)
- **Flag if:** >60% of agent pairs give structurally identical feedback (same drop-off points, same objections, same emotional arc shape)
- **Signal:** Agents may be producing the same evaluation in different words

**Detection 3: Segment Divergence Expectation**
- Agents from different audience segments SHOULD disagree on some dimensions. A skeptical high-income professional and an emotionally-driven casual buyer should not produce identical objection timelines.
- **Flag if:** Agents from 3+ different segments agree on ALL 8 dimensions with no meaningful divergence
- **Signal:** Persona differentiation may have collapsed during generation

**Remediation:**
- When any flag fires, present to human with note: "Audience agent reactions show unusual uniformity — this may indicate model bias rather than genuine consumer consensus."
- Include the specific flag(s) that fired and the evidence (e.g., "SD of purchase_intent_score = 0.3 across 5 agents")
- Does NOT auto-reject the E2E verification results — this is an informational flag for human judgment
- If homogenization is severe (all 3 flags fire), recommend re-running reader agents with increased temperature, stronger persona priming, or sequential isolation with context clearing between agents

### Forbidden Behaviors

- Running E2E verification on incomplete assemblies (all assembly must be complete)
- Allowing reader agents to see section/skill boundaries in the assembled piece
- Skipping continuity checker because reader agents "already covered voice"
- Downgrading P1 issues to P3 to avoid triggering Arena in editorial
- Running E2E verification on Quick tier projects
- Modifying the assembled piece during verification (verification is READ-ONLY)

---

## OUTPUT FILE LOCATIONS

```
~outputs/[project-code]/[engine-subdir]/
  ├── e2e-reader-reports/
  │   ├── AA-01-reader-report.yaml
  │   ├── AA-02-reader-report.yaml
  │   └── ...
  ├── e2e-continuity-report.yaml
  └── e2e-verification-report.yaml     ← synthesized report consumed by editorial
```

---

## CRITICAL RULES

1. **E2E verification is READ-ONLY.** It evaluates. It does not revise. Revision happens in the editorial skill.
2. **Reader agents use the same personas as Arena.** Do not construct separate personas. Reload from `audience-agent-personas.json`.
3. **The assembled piece is presented without skill boundaries.** Reader agents see continuous copy, not "Skill 10 output + Skill 11 output + ..."
4. **E2E report is ADDITIONAL input to editorial, not a replacement.** Editorial skills still run their full audit/revision workflow. E2E adds piece-level signal.
5. **Continuity checker always runs (Full and Standard tiers).** Even if reader agents are reduced for Standard tier.
6. **P1 issues from E2E verification MUST receive Arena treatment in editorial.** They cannot be downgraded to direct-fix.
7. **Post-editorial E2E verification is optional.** If the human wants to re-run E2E verification after editorial revision to confirm issues were addressed, that's a second pass — not mandatory.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation as part of Harness Architecture Phase 6. Reader agent mode, continuity checker, 6 engine integration points, multi-piece special cases (email sequence, upsell sequence), token budget, model routing. |
| 1.1 | 2026-03-20 | Added Audience Agent Homogenization Detection subsection — 3 detection mechanisms (score variance, pairwise similarity, segment divergence). Informational flags for human judgment, no auto-rejection. |
