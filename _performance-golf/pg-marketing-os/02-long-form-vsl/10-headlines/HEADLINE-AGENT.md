# HEADLINE-AGENT.md

> **Version:** 1.3
> **Skill:** 10-headlines
> **Position:** Post-Campaign-Brief, Pre-Lead
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** 03-root-cause, 04-mechanism, 05-promise, 06-big-idea, 09-campaign-brief
> **Output:** `headline-package.json`

---

## PURPOSE

Engineer **E5 Campaign Headlines** — the first words a prospect sees that must stop them in their tracks and compel them to read/watch/listen. The headline is the ad for the ad. It must promise the Big Idea's core value in a way that creates an irresistible curiosity gap while remaining credible enough to engage rather than repel.

**Success Criteria:**
- Headline directly expresses or implies the Big Idea
- Curiosity gap created that the lead can fulfill
- Promise compressed to its most compelling form
- Schema distance calibrated (surprising but not confusing)
- Pattern type matched to niche and format expectations
- VSL adaptation considered (works above video if applicable)
- Multiple options generated for selection (3-5 variants)
- Selected headline achieves ≥ 7.5/10 weighted quality score
- Clear connection to lead architecture established

This agent is a **workflow orchestrator**. It delegates to microskills and validates outputs at each gate. It produces headline OPTIONS for human selection, not a single final headline.

---

## IDENTITY

**This skill IS:**
- The first-contact engineering system
- The promise compression engine
- The curiosity gap architect
- A schema distance calibrator
- The Big Idea's headline expression
- A format adapter (print, VSL, advertorial)
- An options generator (not a single-answer producer)

**This skill is NOT:**
- A lead writer (that is 11-lead)
- A body copy producer (downstream skills)
- A random headline generator (everything flows from Big Idea)
- A formula-following machine (formulas inform, not dictate)
- A headline swipe file copier (vault patterns inspire, not copy)
- A final decision maker (human selects from options)

**Upstream:** Receives `campaign-brief-package.json`, `big-idea-package.json`, `mechanism-package.json`, `promise-package.json`, `root-cause-package.json`
**Downstream:** Feeds `headline-package.json` to 11-lead (selected headline determines lead architecture)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Foundation + specimen loading | haiku | Input loading, no reasoning needed |
| 1 | Big Idea distillation + pattern type selection | sonnet | Classification + architecture decisions |
| 2 | Headline generation (5+ candidates × 10+ variations) | opus | Creative generation — max quality |
| 2.5 | Arena (7 competitors × 3 rounds) | opus | Maximum quality generation |
| 3 | Refinement + scoring | opus | Judgment-heavy evaluation |
| 4 | Selection packaging | sonnet | Assembly from scored candidates |

---

## TEACHING FOUNDATIONS

**Primary: The Headline's One Job (David Ogilvy)**
1. On average, five times as many people read the headline as read the body copy
2. When you have written your headline, you have spent eighty cents out of your dollar
3. The headline is the "ticket on the meat" — it must flag down the right prospects
4. Headlines that promise a benefit outsell those that don't by 4:1

**Secondary: The Big Idea Expression (Gary Bencivenga)**
1. A truly great ad is built around a Big Idea that expresses in a single sentence the benefit and the unique mechanism
2. The headline is where the Big Idea first makes contact with the prospect
3. If you can't express your Big Idea in a headline, you don't have a Big Idea yet

**Tertiary: Curiosity Gap Engineering (Stefan Georgi)**
1. The headline creates a gap between what the reader knows and what they need to know
2. The gap must be relevant to their desires/fears (not random curiosity)
3. The gap must feel resolvable (not impossible or irrelevant)
4. The lead's job is to partially close the gap while opening new ones

**Quaternary: Schema Distance Calibration (RSF Framework)**
1. Headlines that violate expectations capture attention
2. But too much violation creates confusion before engagement
3. Optimal schema distance: 6-7 (strong violation that still makes sense)
4. The resolution must feel achievable within the content

**Quinary: Headline Formulas as Starting Points (Vault Patterns)**
1. Formulas are extracted patterns from proven winners
2. They are starting points, not ending points
3. The best headlines riff on formulas rather than follow them rigidly
4. Vault intelligence provides niche-specific pattern frequencies

---

## STATE MACHINE

```
IDLE → LOADING → ARCHITECTURE → GENERATION → ARENA → REFINEMENT → SELECTION → COMPLETE
         │           │              │           │          │            │
         ▼           ▼              ▼           ▼          ▼            ▼
      [GATE_0]    [GATE_1]      [GATE_2]   [GATE_2.5]  [GATE_3]     [GATE_4]
      PASS/FAIL   PASS/FAIL     PASS/FAIL  HUMAN_SEL   PASS/FAIL    PASS/FAIL
         │           │              │           │          │            │
         └───────────┴──────────────┴───────────┴──────────┴────────────┘
                                        ▲
                                        │
                                  Max 3 iterations
                                  per layer, then
                                  HUMAN CHECKPOINT
```

**Gate 2.5 (Arena Layer):** HUMAN_SELECT gate — execution BLOCKS until human explicitly selects winning headline candidate from arena. No auto-selection permitted.

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

**Purpose:** Load all upstream packages, source teachings, and vault headline intelligence. Validate completeness before headline engineering begins.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load campaign-brief, big-idea, mechanism, promise, root-cause packages |
| 0.2 | `0.2-vault-intelligence-loader.md` | Load headline patterns from TIER1 extractions |
| 0.2.5 | `0.2.5-specimen-decomposer.md` | Decompose Gold headline specimens into templates and patterns |
| 0.3 | `0.3-teachings-loader.md` | Load Ogilvy, Bencivenga, Georgi, RSF headline principles |
| 0.4 | `0.4-input-validator.md` | Validate all inputs present and above minimum thresholds |

**Execution Order:**
1. 0.1, 0.2, 0.3 run in parallel (independent data loading)
2. 0.2.5 after 0.2 (requires vault data)
3. 0.4 runs after all complete (validates aggregated data)

**Gate 0:** All upstream packages loaded, teachings indexed, vault headline patterns available, Gold specimens decomposed, validation status = PASS. FAIL = missing Big Idea package OR campaign-brief absent OR vault intelligence empty.

---

### Layer 1: Headline Architecture

**Purpose:** Analyze the Big Idea for headline expression, determine optimal pattern type, establish curiosity architecture, and calibrate schema distance target.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-big-idea-distiller.md` | Extract headline-ready core from Big Idea |
| 1.2 | `1.2-pattern-type-selector.md` | Select optimal headline pattern type based on niche + vault patterns |
| 1.3 | `1.3-curiosity-architect.md` | Design the curiosity gap and resolution timing |
| 1.4 | `1.4-schema-distance-calibrator.md` | Set target schema distance and identify expectation to violate |

**Execution Order:**
1. 1.1 first (Big Idea distillation informs everything)
2. 1.2, 1.3, 1.4 in parallel after 1.1 (independent architecture decisions)

**Gate 1:** Big Idea distilled to headline core, pattern type selected with vault reference, curiosity gap designed with resolution timing, schema distance target set with identified violation. FAIL = Big Idea not expressible in headline OR pattern type mismatch OR no curiosity gap OR schema distance undefined.

---

### Layer 2: Headline Generation

**Purpose:** Generate 8-12 headline candidates using different approaches, then score and filter to top 5.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-formula-based-generator.md` | Generate candidates from proven headline formulas |
| 2.2 | `2.2-vault-inspired-generator.md` | Generate candidates riffing on Gold specimen patterns |
| 2.3 | `2.3-schema-violation-generator.md` | Generate candidates optimized for schema distance |
| 2.4 | `2.4-format-adapter.md` | Adapt top candidates for VSL, print, advertorial formats |
| 2.5 | `2.5-candidate-scorer.md` | Score all candidates on 6-dimension rubric |

**Execution Order:**
1. 2.1, 2.2, 2.3 in parallel (independent generation approaches)
2. 2.4 after 2.1, 2.2, 2.3 (requires raw candidates)
3. 2.5 after 2.4 (scores all candidates including adaptations)

**Gate 2:** 8-12 candidates generated, all candidates scored on 6 dimensions, top 5 selected with scores ≥ 7.0. FAIL = fewer than 5 candidates above threshold OR scoring incomplete OR no clear top 5.

---

### Layer 2.5: Arena Persona Panel (Multi-Perspective Generation)

**Purpose:** Generate headline candidates through 6 legendary copywriter personas, then judge against headline-specific criteria with 8.5/10 minimum quality threshold. Human selects winning candidate.

**Specification File:** `ARENA-LAYER.md`

**Execution Protocol:**
1. **Multi-Perspective Generation (Phase 1):** Each of 6 personas generates 2-3 headline candidates using their signature approach
2. **Judging Round (Phase 2):** All candidates scored against 7 headline-specific criteria
3. **Ranking & Rationale (Phase 3):** Candidates ranked with transparent scoring justification
4. **Human Selection Checkpoint (Phase 4):** BLOCKING — human explicitly selects winning headline

**7 Headline-Specific Judging Criteria:**

| Criterion | Weight | Focus |
|-----------|--------|-------|
| Stopping Power | 20% | Pattern interrupt strength, scroll-stopping ability |
| Curiosity Gap Strength | 20% | Gap created, resolution desire, information incompleteness |
| Specificity | 15% | Concrete numbers, names, timeframes, outcomes |
| Big Idea Expression | 15% | How clearly/compellingly headline expresses Big Idea |
| Schema Distance Calibration | 10% | Optimal 6-7 range, surprising but not confusing |
| TIER1 Pattern Match | 10% | Similarity to proven vault headline patterns |
| Lead Connection Quality | 10% | How naturally headline flows into lead options |

**Quality Threshold:** 8.5/10 minimum weighted score (elevated from standard 7.0-7.5)

**Human Selection Checkpoint:**
- BLOCKING checkpoint — execution HALTS until human input received
- No auto-selection permitted
- Human may: select as-is, request modification, request regeneration, provide custom headline
- Selection must be EXPLICIT (no "if no response, proceed with top-ranked")

**Gate 2.5:** Human has explicitly selected headline candidate from arena. FAIL = no human input received OR human requests full regeneration.

---

### Layer 3: Headline Refinement

**Purpose:** Refine top 5 candidates through power word injection, specificity enhancement, and lead connection design.

| Skill | File | Function |
|-------|------|----------|
| 3.1 | `3.1-power-word-injector.md` | Enhance candidates with emotional power words |
| 3.2 | `3.2-specificity-enhancer.md` | Add concrete numbers, names, timeframes |
| 3.3 | `3.3-subheadline-generator.md` | Generate matching subheadlines for each candidate |
| 3.4 | `3.4-lead-connection-mapper.md` | Map how each headline connects to lead options |
| 3.5 | `3.5-final-scorer.md` | Re-score refined candidates |

**Execution Order:**
1. 3.1, 3.2 in parallel (enhancement operations)
2. 3.3 after 3.1, 3.2 (subheadlines informed by refined headlines)
3. 3.4 after 3.3 (lead connection requires complete headline + sub)
4. 3.5 after 3.4 (final scoring of complete packages)

**Gate 3:** All 5 candidates refined with power words and specificity, matching subheadlines generated, lead connections mapped, final scores computed. Top candidate ≥ 7.5/10. FAIL = no candidate ≥ 7.5 after refinement.

---

### Layer 4: Selection & Packaging (Human-in-the-Loop)

**Purpose:** Present final candidates to human for selection, incorporate selection into headline-package.json, and prepare handoff to 11-lead.

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-presentation-formatter.md` | Format candidates for human review with scores and rationale |
| 4.2 | `4.2-selection-processor.md` | Process human selection and any modifications |
| 4.3 | `4.3-package-assembler.md` | Assemble headline-package.json with selected headline + metadata |
| 4.4 | `4.4-lead-handoff-preparer.md` | Prepare lead-specific context based on selected headline |

**Execution Order:**
1. 4.1 first (prepare for human review)
2. HUMAN CHECKPOINT — await selection
3. 4.2 after human input (process selection)
4. 4.3, 4.4 in parallel after 4.2 (package assembly and lead prep)

**Gate 4:** Human has selected headline (or provided custom), headline-package.json assembled with all fields, lead handoff context prepared. FAIL = human rejects all options without providing alternative OR package assembly fails.

---

## OUTPUT SCHEMA

```json
{
  "headline_package_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "10-headlines",

  "selected_headline": {
    "main_headline": "The final selected headline text",
    "subheadline": "The matching subheadline or null",
    "deck_copy": "Optional deck copy or null",
    "selection_source": "generated|human_modified|human_provided"
  },

  "headline_architecture": {
    "pattern_type": "curiosity|benefit|news|question|etc",
    "format_pattern": "question|statement|command|etc",
    "curiosity_gap": "What gap was created",
    "schema_distance": 7,
    "big_idea_expression": "How headline expresses Big Idea"
  },

  "lead_handoff": {
    "gap_resolution_timing": "instant|within_lead|delayed",
    "emotional_trajectory": "curiosity_to_hope|fear_to_relief|etc",
    "recommended_lead_type": "story|question|revelation|etc",
    "headline_callback_opportunity": "How lead can reference headline"
  },

  "alternatives": [
    {
      "headline": "Alternative option 1",
      "subheadline": "Matching sub",
      "score": 8.2,
      "rationale": "Why this was strong"
    }
  ],

  "vault_inspiration": {
    "primary_specimen": "swipe_id of main inspiration",
    "pattern_borrowed": "What pattern was borrowed",
    "differentiation": "How this differs from source"
  },

  "quality_scores": {
    "clarity": 8,
    "curiosity": 9,
    "specificity": 7,
    "emotional_impact": 8,
    "schema_distance": 7,
    "lead_connection": 8,
    "overall": 7.8
  }
}
```

---

## VAULT INTELLIGENCE REQUIREMENTS

The Headline Skill consumes:

1. **headline-vault-intelligence.json** — Aggregated headline patterns from TIER1 extractions
   - Pattern type distributions by niche
   - Power word frequency analysis
   - Specificity element patterns
   - Schema distance benchmarks
   - Formula frequency analysis

2. **Gold Specimens** — Top 10% headlines for decomposition
   - Promise compression patterns
   - Curiosity architecture templates
   - Schema violation examples
   - Lead connection models

3. **Niche-Specific Patterns** — What works in health vs. financial vs. golf
   - Health: Often leads with symptom callout or doctor authority
   - Financial: Often leads with prediction or secret knowledge
   - Golf: Often leads with specific yardage or swing mechanic promise

---

## HUMAN CHECKPOINTS

### Required Checkpoint: Headline Selection (Layer 4)

**When:** After Layer 3 refinement, before package assembly
**Presented:** Top 5 headlines with scores, subheadlines, and lead connection notes
**Decision Required:** Select one headline, modify one, or provide custom
**Override:** Human can select lower-scoring option with rationale
**Timeout:** No timeout — waits for human decision

### Optional Checkpoint: Architecture Review (Layer 1)

**When:** After Layer 1 architecture decisions
**Triggered By:** Low confidence scores (< 0.7) or competing pattern types
**Presented:** Pattern type recommendation with rationale
**Decision Required:** Approve or redirect architecture
**Override:** Human can override any architecture decision

---

## INTEGRATION WITH CAMPAIGN-BRIEF

The Campaign Brief (08) informs headline generation:

| Brief Field | Headline Use |
|-------------|--------------|
| `big_idea.core_expression` | Primary content for headline |
| `creative_direction.tone` | Informs word choice |
| `lead_type` (if selected) | Informs headline-lead connection |
| `avatar.primary_pain` | Informs emotional targeting |
| `mechanism.name` | May appear in headline |
| `coherence.promise_theme` | Constrains promise compression |

---

## INTEGRATION WITH LEAD

The Lead Skill (09) receives from headline:

| Headline Output | Lead Use |
|-----------------|----------|
| `selected_headline` | Opening reference/callback |
| `curiosity_gap` | What lead must begin resolving |
| `gap_resolution_timing` | When to fulfill headline promise |
| `emotional_trajectory` | Emotional arc to continue |
| `recommended_lead_type` | Strong suggestion for lead architecture |

---

## ERROR HANDLING

### Common Failures and Remediation

| Failure | Remediation |
|---------|-------------|
| Big Idea not headline-ready | Return to 06-big-idea for refinement |
| No candidates score ≥ 7.0 | Expand generation with additional formulas |
| Schema distance too extreme | Calibrate closer to 6-7 range |
| Curiosity gap too weak | Strengthen gap or identify different angle |
| Lead connection unclear | Work backward from lead types |
| Human rejects all options | Gather feedback, regenerate with new direction |

---

## TEACHING REFERENCES

**Source Teachings to Load:**
1. `ogilvy-headline-principles.md` — Classic headline wisdom
2. `bencivenga-big-idea-expression.md` — Big Idea in headline form
3. `georgi-curiosity-gap.md` — Curiosity engineering
4. `rsf-schema-distance.md` — RSF framework for headlines
5. `headline-formula-library.md` — Proven headline formulas

**Vault Intelligence Files:**
1. `headline-vault-intelligence.json` — Pattern aggregations
2. `headline-gold-specimens.json` — Top 10% headlines for decomposition

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER generate headlines without Big Idea** — Big Idea package must be loaded and validated before any headline generation begins.
2. **ALWAYS distill before generating** — Layer 1 distillation must complete before Layer 2 generation starts.
3. **ALWAYS score before presenting** — Every candidate must be scored on all 6 dimensions before human selection.
4. **SEQUENTIAL Layer dependency** — Each layer must pass its gate before the next layer begins.
5. **NEVER present fewer than 3 options** — Human must have meaningful choice; minimum 3 viable headlines required.
6. **ALWAYS include subheadlines** — Every headline option presented must have a matching subheadline.
7. **NEVER skip lead connection mapping** — Each headline must have explicit lead connection documented before presentation.

### Quality Constraints
8. **Schema distance 5-8 range only** — Headlines outside this range are automatically rejected and regenerated.
9. **Curiosity gap required** — Headlines without identifiable curiosity gap fail validation.
10. **Benefit must be implicit or explicit** — Headlines that don't promise or imply a benefit are rejected.
11. **No naked mechanism names** — Mechanism name alone without benefit framing is insufficient.
12. **Specificity minimum** — At least one concrete element (number, timeframe, outcome) required per headline.

### Anti-Slop Constraints
13. **ZERO vague qualifiers** — "amazing," "incredible," "revolutionary" without specifics are banned.
14. **ZERO AI telltales** — "unlock," "discover the secret," "transform your life" automatically rejected.
15. **ZERO clickbait patterns** — "You won't believe," "Number 5 will shock you" are banned.
16. **ZERO empty curiosity** — Curiosity must be tied to relevant desire/fear, not random intrigue.

### Integration Constraints
17. **Campaign-brief alignment** — Headline tone must match creative direction from campaign-brief-package.
18. **Promise ceiling respect** — Headline cannot exceed promise strength validated in promise-package.
19. **Mechanism coherence** — If mechanism appears in headline, naming must match mechanism-package exactly.
20. **Lead handoff clarity** — Every selected headline must have explicit lead_handoff section completed.

### Enforcement Constraints
21. **IF Big Idea package missing → HALT** — Cannot proceed; request 06-big-idea execution.
22. **IF schema distance < 5 or > 8 → REJECT** — Candidate fails; regenerate with calibration adjustment.
23. **IF curiosity gap absent → REJECT** — Candidate fails; regenerate with gap architecture focus.
24. **IF candidates < 8 generated → EXPAND** — Increase generation passes until 8+ candidates exist.
25. **IF top 5 all score < 7.0 → REMEDIATE** — Return to Layer 2 with adjusted parameters; max 3 iterations.
26. **IF human rejects all with no direction → PAUSE** — Request specific feedback before regeneration.
27. **IF subheadline missing → BLOCK** — Cannot present candidate without matching subheadline.
28. **IF slop phrase detected → AUTO-REJECT** — Phrase triggers immediate candidate elimination.

---

## THREE-TIER UNCERTAINTY PROTOCOL

Headlines involve inherent uncertainty in predicting what will capture attention. This protocol ensures appropriate confidence signaling.

### Tier 1: HIGH CONFIDENCE (≥ 0.85)

**Conditions:**
- Pattern type has ≥ 70% success rate in niche (from vault intelligence)
- Big Idea distillation produced clear single-sentence expression
- Schema distance calculated at 6-7 (optimal range)
- Multiple Gold specimens support the pattern choice
- Curiosity gap architecture matches proven templates

**Behavior:**
- Present pattern recommendation without hedging
- Lead with top recommendation, alternatives as backup
- Confidence score displayed: "HIGH (0.XX)"

### Tier 2: MODERATE CONFIDENCE (0.65-0.84)

**Conditions:**
- Pattern type has 40-69% success rate in niche
- Big Idea distillation produced viable expression with minor tension
- Schema distance calculated at 5-6 or 7-8 (acceptable but not optimal)
- Some vault specimens support the pattern, but sample size limited
- Curiosity gap viable but resolution timing unclear

**Behavior:**
- Present multiple pattern options with trade-off analysis
- Request human input on architecture direction before generation
- Confidence score displayed: "MODERATE (0.XX)"
- Trigger optional Layer 1 human checkpoint

### Tier 3: LOW CONFIDENCE (< 0.65)

**Conditions:**
- Pattern type has < 40% success rate OR no vault data for niche
- Big Idea does not compress cleanly to headline form
- Schema distance volatile (multiple calculations disagree)
- Vault specimens absent or contradictory for this angle
- Curiosity gap competing with clarity concerns

**Behavior:**
- HALT automatic progression
- Present diagnostic summary to human with specific uncertainty sources
- Request human direction: proceed with best guess OR return to 06-big-idea for refinement
- Log uncertainty for pattern learning
- Confidence score displayed: "LOW (0.XX) — HUMAN INPUT REQUIRED"

---

## GUARDRAILS

### Locked Tool Grammar

All skill invocations MUST follow this exact 5-step sequence:

1. **STATE** the skill being called and its specific purpose for this execution
2. **VERIFY** all required inputs are available, valid, and match expected schema
3. **EXECUTE** the skill with explicit parameters documented
4. **VALIDATE** the output against the expected schema and quality thresholds
5. **LOG** the result (PASS/FAIL, key outputs, any warnings) before proceeding

**ENFORCEMENT:**
- NEVER invoke a skill without completing step 2 (input verification)
- NEVER proceed to next skill without completing step 4 (output validation)
- NEVER skip step 5 (logging) — state must be tracked for session persistence
- IF any step fails, HALT and determine remediation before continuing

### Post-Tool Reflection

AFTER EVERY SKILL EXECUTION, verify these 5 points:

1. **Output exists** — File/object is non-empty and accessible
2. **Schema valid** — Output matches expected contract from skill specification
3. **Quality gates pass** — No threshold violations in output scores
4. **State updated** — Session context reflects completed step
5. **Next step identified** — Next skill in sequence confirmed with inputs available

**ENFORCEMENT:**
- IF output missing → LOG failure, HALT pipeline, REPORT which skill failed
- IF schema invalid → LOG specific deviation, REMEDIATE or HALT
- IF quality gate fails → LOG which threshold violated, trigger remediation protocol
- IF state not updated → UPDATE before any further execution
- IF next step unclear → PAUSE for architectural review

---

## ANTI-SLOP LEXICON

NEVER use these words/phrases in generated headline output:

**Vague qualifiers:** amazing, incredible, unbelievable, revolutionary, game-changing, mind-blowing, astonishing, remarkable, extraordinary, sensational

**AI telltales:** unlock, harness, leverage, dive deep, journey, empower, transform your life, discover the secret, breakthrough, cutting-edge, next-level, unleash

**Empty intensifiers:** literally, absolutely, totally, completely, incredibly, extremely, truly, really, very, super

**Clickbait patterns:** you won't believe, number X will shock you, what happens next, the truth about, doctors hate, one weird trick, this simple trick

**Vague time words:** soon, quickly, fast, rapid, instant (without specific timeframe)

**Generic benefit words:** better, improved, enhanced, optimized, upgraded (without specific outcome)

**Copywriting clichés:** imagine if you could, picture this, what if I told you, the truth is, here's the thing, finally revealed, exposed, shocking truth

**REPLACEMENT REQUIREMENT:** Every rejected phrase must be replaced with specific, concrete language:
- "Revolutionary" → specific mechanism name or unique differentiator
- "Transform your life" → specific outcome in prospect's words
- "Quickly" → "in 7 days" or "by next Tuesday" or other concrete timeframe
- "Better results" → "add 30 yards" or "drop 2 strokes" or specific measurable outcome

---

## REMEDIATION PROTOCOL

### Gate Failure Response Matrix

| Gate | Common Failures | Remediation |
|------|-----------------|-------------|
| Gate 0 | Big Idea package missing | HALT → Request 06-big-idea execution with specific fields needed |
| Gate 0 | Vault intelligence empty | WARN → Proceed with formula-only generation, reduce confidence tier |
| Gate 0 | Campaign-brief missing | HALT → Request 09-campaign-brief execution |
| Gate 1 | Big Idea won't distill | RETURN → 06-big-idea with diagnostic (too complex, too vague, etc.) |
| Gate 1 | Pattern type unclear | CHECKPOINT → Human selects from competing options |
| Gate 1 | Schema distance unstable | RECALIBRATE → Run 1.4 again with different expectation targets |
| Gate 2 | < 8 candidates generated | EXPAND → Additional generation passes with varied formulas |
| Gate 2 | All candidates < 7.0 | REDESIGN → Return to Layer 1, adjust architecture parameters |
| Gate 2 | Slop detected in candidates | PURGE → Remove violating candidates, regenerate to fill |
| Gate 3 | No candidate ≥ 7.5 | ENHANCE → Additional refinement pass with power word + specificity |
| Gate 3 | Subheadlines weak | REGENERATE → Focus 3.3 with explicit Big Idea callback |
| Gate 3 | Lead connections unclear | REMAP → Run 3.4 with explicit lead type options from vault |
| Gate 4 | Human rejects all | FEEDBACK → Gather specific objections, return to appropriate layer |
| Gate 4 | Package assembly fails | DEBUG → Check schema compliance, fix specific violations |

### Escalation Protocol
- Max 3 remediation iterations per gate
- After 3 failures at same gate: HUMAN CHECKPOINT with full failure log
- Human may: override threshold, provide direction, approve with exceptions, or request upstream skill re-execution

---

## SESSION PERSISTENCE

After each skill execution, update the session context:

```yaml
session_state:
  current_layer: [0-4]
  current_skill: [skill ID just completed]
  completed_skills: [list of completed skill IDs]
  output_status: [PASS/FAIL/PENDING]
  gate_status:
    gate_0: [PASS/FAIL/PENDING]
    gate_1: [PASS/FAIL/PENDING]
    gate_2: [PASS/FAIL/PENDING]
    gate_3: [PASS/FAIL/PENDING]
    gate_4: [PASS/FAIL/PENDING]
  confidence_tier: [HIGH/MODERATE/LOW]
  candidates_generated: [count]
  candidates_above_threshold: [count]
  remediation_count: [count per current gate]
  blockers: [any blocking issues]
  next_action: [next skill to execute]
```

**On Session Resume:**
1. Read session state from persistence
2. Identify last completed skill
3. Verify outputs from last skill still valid
4. Resume from next uncompleted skill
5. NEVER re-execute completed skills unless explicitly instructed

**ENFORCEMENT:**
- MUST update session state after every skill completion
- MUST persist state before any human checkpoint or pause
- MUST validate state integrity on resume before continuing

---

## LEARNING LOG

### Log Location
`10-headlines/outputs/headline-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  big_idea_core: string
  pattern_type_selected: string
  schema_distance_target: integer
  confidence_tier: string
  candidates_generated: integer
  candidates_above_7: integer
  top_candidate_score: float
  selected_headline: string
  selection_source: enum[generated, human_modified, human_provided]
  human_modifications: string | null
  gate_results:
    gate_0: enum[pass, fail]
    gate_1: enum[pass, fail]
    gate_2: enum[pass, fail]
    gate_3: enum[pass, fail]
    gate_4: enum[pass, fail]
  remediation_count: integer
  slop_violations_caught: integer
  vault_inspiration_used: string | null
  feedback_requests: [object]
  failure_log: [object]

pattern_effectiveness_entry:
  niche: string
  pattern_type: string
  schema_distance: integer
  score_achieved: float
  human_selected: boolean
  modifications_needed: boolean
  notes: string
```

### Manager Responsibility
- Log every run automatically upon completion
- Track pattern type effectiveness by niche
- Track schema distance sweet spots by niche
- Track human modification frequency (indicates generation quality)
- Track slop violation frequency (indicates lexicon gaps)
- Surface recurring failures for microskill improvement
- Feed effectiveness data back to vault intelligence

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.3 | 2026-02-12 | Model Assignment Table: Added Binding Model Assignment Table. Haiku for infrastructure (Pre/0), sonnet for classification (1) and packaging (4), opus for generation/Arena/scoring (2-3). |
| 1.2 | 2026-02-03 | ARENA LAYER INTEGRATION: Added Layer 2.5 (Arena Persona Panel) with 6-persona multi-perspective headline generation, 7 headline-specific judging criteria (Stopping Power 20%, Curiosity Gap 20%, Specificity 15%, Big Idea Expression 15%, Schema Distance 10%, TIER1 Pattern Match 10%, Lead Connection 10%), 8.5/10 minimum quality threshold, HUMAN_SELECT gate. Updated state machine with ARENA phase. |
| 1.1 | 2026-02-02 | COMPLETE BUILD: Added 28 numbered constraints, Three-Tier Uncertainty Protocol, Locked Tool Grammar, Post-Tool Reflection, Anti-Slop Lexicon, Session Persistence, Remediation Protocol, Learning Log. Status upgraded from SCAFFOLD to COMPLETE. |
| 1.0 | 2026-01-27 | Initial scaffold: layer architecture, state machine, output schema, teaching foundations |

---

**Skill Status:** COMPLETE — Full 5-layer architecture with 19 microskills, all guardrails implemented
**Next Steps:** Build vault intelligence files, test with sample campaigns, validate against production Big Ideas
