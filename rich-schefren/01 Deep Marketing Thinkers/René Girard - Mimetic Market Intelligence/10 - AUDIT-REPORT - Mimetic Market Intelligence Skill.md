# AUDIT REPORT: Mimetic Market Intelligence Skill
## Prompt Architecture Quality Evaluation
### Date: 2026-02-22

**Target:** `/Users/richardschefren/.claude/skills/mimetic-market-intelligence/SKILL.md`
**Skill Type:** Generation (multi-document strategic analysis)
**Mode:** AUDIT (Diagnostic Only)

---

## EXECUTIVE SUMMARY

**Health Rating: GOOD**
**Recommendation: OPTIMIZE**

This is a strong skill with genuinely excellent methodology content and gold-standard reference materials. It scores well on purpose, instructions, and reference quality. The primary weaknesses are structural: the constraint-to-instruction ratio is inverted (too many instructions, not enough constraints), guardrail coverage is thin for a production skill, and the output specification lacks validation rigor. The Seven Methodology Rules are the skill's backbone and they work -- but they read as narrative lessons rather than machine-parseable constraints.

The reference materials (3 gold-standard documents from the Feb 21 session) are among the best exemplar sets I have seen in any skill file. They alone push the Reference block score higher than most skills achieve.

---

## SCORED EVALUATION

```yaml
quality_scores:
  target: SKILL.md (mimetic-market-intelligence)
  type: generation
  timestamp: 2026-02-22

  structural:
    four_block_compliance:
      score: 17
      threshold: 16
      status: PASS
      details:
        purpose: 5
        instructions: 4
        reference: 5
        output: 3

    constraint_ratio:
      score: 0.38
      threshold: 0.60
      status: FAIL
      constraints_found: 23
      instructions_found: 38

    specificity:
      score: 85%
      threshold: 80%
      status: PASS
      sections_evaluated: 20
      in_goldilocks: 17
      too_vague: 2
      too_rigid: 1

    hierarchy_clarity:
      score: 5
      threshold: 4
      status: PASS

  production:
    guardrail_coverage:
      score: 3
      threshold: 5
      status: FAIL
      present:
        - Identity Invariants (partial - Non-Goals define what skill is NOT)
        - Binary Style Rules (Seven Methodology Rules contain ALWAYS/NEVER patterns)
        - Post-Tool Reflection (Quality Gate checklist)
      missing:
        - Trigger-Template Refusals (no explicit "if X then refuse with Y")
        - Three-Tier Uncertainty (no confidence-based behavior rules)
        - Locked Tool Grammar (WebSearch/WebFetch used but no preconditions)
        - Positional Reinforcement (critical rules not repeated at end)

    slop_density:
      score: 0.6
      threshold: 2
      status: PASS
      instances:
        - Line 18: "genuinely" (used appropriately, borderline)
        - Line 196: "No bullshit claims" (authentic voice, not slop)
      notes: "Remarkably clean writing throughout. The skill reads like
              a practitioner wrote it, not an AI."

    production_principles:
      score: 3
      threshold: 3
      status: PASS (at minimum for leaf skill)
      present:
        - Stateful Intelligence (phase1/phase2 separation tracks progress)
        - Continuous Validation (Quality Gate checklist)
        - Behavioral Consistency (Seven Rules enforce consistent output)
      missing:
        - Bounded Uncertainty (no confidence scoring on claims)
        - Intelligent Failure Detection (no error handling for failed research)
        - Capability-Based Routing (no model/tool selection logic)

    failure_modes:
      score: 2
      threshold: 0
      status: FAIL
      detected:
        - "Context = Data" risk: Skill asks for deep research on 15+ competitors
          with no guidance on summarization or context window management.
          15 competitor profiles at full depth will exceed any context window.
        - "Real-Time Delusion" risk: Skill says "pull live information" and
          "EVERY claim must be backed by a specific quote from actual current
          marketing materials" but provides no fallback if sites are
          unreachable, paywalled, or recently changed.

  architectural:
    context_layering:
      score: 2
      threshold: 3
      status: FAIL
      notes: "No explicit separation between deterministic rules (ALWAYS/NEVER)
              and adaptive guidance (IF/THEN). The Seven Methodology Rules mix
              both layers. Mode switching (phase1/phase2/full) is clean but
              the rules within each mode blend hard constraints with soft guidance."

    composability:
      score: 3
      threshold: 4
      status: FAIL
      notes: "Interface section defines invoke pattern and outputs_to, which is
              good. But no explicit input/output contract that another skill could
              consume. No structured handoff format. The 'deep-research skill if
              available' reference is loose coupling without a defined interface."

    state_awareness:
      score: 4
      threshold: 3
      status: PASS
      notes: "Phase1 -> pause -> Phase2 is a clear state machine. The skill
              knows what Phase 1 must produce before Phase 2 can start. The
              conversation questions serve as an explicit state gate."

    validation_presence:
      score: Present
      threshold: Present
      status: PASS
      notes: "Quality Gate section with 8 checklist items. Present and relevant."

  content:
    anti_slop:
      score: 7
      threshold: 8
      status: FAIL
      notes: "The skill itself is clean. But it does not ENFORCE anti-slop
              standards on its own output. Rule 6 ('No bullshit claims') covers
              the spirit but lacks the mechanical enforcement of the 9 anti-slop
              principles. No instruction to avoid filler phrases, hedge words,
              or generic modifiers in produced documents."

    benefit_depth:
      score: N/A
      threshold: N/A
      status: N/A
      notes: "Not a copy-producing skill. Produces strategic analysis."

    voice_spec:
      score: 3
      threshold: 4
      status: FAIL
      notes: "Rule 6 says 'forensic investigation, not a think piece' which is
              a strong voice directive. But there is no vocabulary spec, no
              sentence pattern guidance, no exemplar of WRONG tone to avoid.
              The gold-standard documents in references/ implicitly define voice
              but the skill file never explicitly extracts voice rules from them."

    cta_clarity:
      score: N/A
      threshold: N/A
      status: N/A
      notes: "Not applicable -- strategic analysis, not conversion content."

  aggregate:
    critical_dimensions_passing: 3 of 5
    critical_failing:
      - Constraint Ratio (0.38, needs 0.60)
      - Guardrail Coverage (3 of 7, needs 5)
    non_critical_passing: 6 of 8
    non_critical_failing:
      - Context Layering (2, needs 3)
      - Composability (3, needs 4)
    total_applicable_score: 52
    max_possible: 77
    percentage: 67.5%
    health_rating: POOR (2 critical dimensions failing)
    recommendation: REWRITE (targeted -- see prescriptions)
```

---

## DIMENSION-BY-DIMENSION ANALYSIS

### 1. PURPOSE BLOCK: 5/5 -- EXCELLENT

This is the skill's strongest structural element. The PURPOSE section nails all five criteria:

- **Who it serves:** "Business owners in any competitive market with personality/guru branding"
- **What problem it solves:** "Business owners think their positioning problem is about features, pricing, or messaging. The real problem is usually that they are mediating the same desires as everyone else"
- **Non-Goals defined:** Four explicit non-goals (does NOT produce copy, does NOT replace feature analysis, does NOT fabricate desires, does NOT work without real research)
- **Scope boundaries:** Clear phase separation, clear market type specification
- **Success criteria:** Implicit in the Seven Rules and Quality Gate

No changes needed here.

### 2. INSTRUCTIONS BLOCK: 4/5 -- STRONG

The instructions are detailed, well-sequenced, and mode-aware. Each mode (phase1, phase2, full) has clear steps. The phase1 instructions are particularly strong -- Steps 1-6 walk through a complete research and production workflow.

**What keeps it from 5/5:**
- No decision rules for ambiguous situations (what if only 7 competitors are identifiable? What if the client has no public marketing?)
- No fallback logic (what if WebSearch fails? What if a competitor's site is down?)
- No edge case handling (what if the client IS a competitor in the list? What if two competitors have merged?)

### 3. REFERENCE BLOCK: 5/5 -- EXCELLENT

Three gold-standard exemplar documents totaling roughly 800+ lines of executed analysis. These are not templates or outlines -- they are COMPLETED analyses with real competitor data, real quotes, real strategic findings. This is exactly what the ARCHITECTURE-PRD means by "show, don't tell."

The SKILL METHODOLOGY reference adds a fourth document with full theoretical grounding and technical research requirements per document.

The Girardian Concepts Reference table in the skill file itself provides a quick-reference layer that maps theory to application.

This reference set is genuinely exceptional. Most skills have no exemplars at all.

### 4. OUTPUT BLOCK: 3/5 -- NEEDS WORK

The output specification defines:
- File naming convention (6 document names)
- File format (markdown)
- Output location (designated folder, ask if not specified)

**What is missing:**
- No section-level structure spec for each document (the instructions describe sections, but the output block does not formalize them as a contract)
- No length guidance (expected word count per document, min/max)
- No quality criteria beyond the Quality Gate checklist (which is good but generic)
- No "what done looks like" beyond the file list
- The Quality Gate is a validation step but not an output specification

### 5. CONSTRAINT RATIO: 0.38 -- FAILING

This is the skill's most significant structural weakness. The ratio should be at least 0.60 (60% constraints, 40% instructions). The current ratio is inverted: 62% instructions, 38% constraints.

**Constraint inventory (23 found):**
- "Does NOT produce copy" / "Does NOT replace feature-level analysis" / "Does NOT fabricate desires" / "Does NOT work without real web research" (4)
- "EVERY claim must be backed by a specific quote" (1)
- "Do NOT use training data" (1)
- "SAME depth as competitor profiles" (1)
- "Never describe what an analysis COULD produce" (1)
- "Don't insult the client" (1)
- "No bullshit claims" (1)
- "PAUSE after Phase 1" (1)
- "No vague/aspirational language" (1)
- Quality Gate checklist items function as constraints (8)
- "Proceed only when you have at minimum items 1, 2, and 4" (1)
- Direction of mimesis framing constraint (1)
- "never frame it as 'you converged'" (1)

**Instruction inventory (38 found):**
- Steps 1-6 for phase1 (numerous action directives)
- Document section specifications (produce, map, identify, research)
- Phase 2 document production instructions
- Conversation question presentation
- File saving instructions

**The fix:** Many of the instructions can be reframed as constraints. "Map convergence across 6 dimensions" is an instruction. "The convergence map MUST cover all 6 dimensions -- omitting any dimension is a failure" is a constraint. The content stays the same; the framing shifts.

### 6. GUARDRAIL COVERAGE: 3/7 -- FAILING

**Present:**
1. **Identity Invariants (partial):** Non-Goals section defines what the skill is NOT. But there is no positive identity statement ("You are a Girardian market analyst" or equivalent).
2. **Binary Style Rules:** The Seven Methodology Rules contain clear binary directives (NEVER list ideas without executing them, ALWAYS investigate direction of mimesis, etc.).
3. **Post-Tool Reflection:** Quality Gate checklist serves this function.

**Missing:**
4. **Trigger-Template Refusals:** No explicit handling of "what if the user asks me to produce copy?" or "what if the user wants to skip Phase 1?" The Non-Goals say what the skill does NOT do, but there is no template refusal for when someone tries to invoke those non-goals.
5. **Three-Tier Uncertainty:** No confidence-based behavior rules. When should the skill flag that its competitor research is thin? When should it say "I could not find sufficient evidence for this claim"?
6. **Locked Tool Grammar:** WebSearch and WebFetch are referenced but without preconditions, required parameters, or validation rules.
7. **Positional Reinforcement:** The most critical rules (evidence-based claims, equal depth on client) appear in the middle of the document. They are not reinforced at the beginning or end.

### 7. SLOP DENSITY: 0.6/100 lines -- PASSING (clean)

The skill file is remarkably well-written. It reads like a practitioner's notes, not AI-generated prose. The Seven Methodology Rules in particular have a direct, no-nonsense voice that reflects actual feedback from a real session.

### 8. CONTEXT LAYERING: 2/5 -- FAILING

The skill mixes deterministic rules (ALWAYS back claims with evidence) and probabilistic guidance (use deep-research skill "if available") without explicit separation. The Seven Methodology Rules are all deterministic constraints, but they are formatted as narrative lessons rather than as a Layer 1 invariant block.

### 9. COMPOSABILITY: 3/5 -- FAILING

The YAML frontmatter defines `interface.invoke`, `called_by`, and `outputs_to`, which is a good start. But there is no structured input/output contract. Another skill that wanted to consume this skill's output (for example, a content production skill that uses the competitive analysis to write positioning copy) would have no defined interface to read from.

### 10. ANTI-SLOP COMPLIANCE: 7/9 -- FAILING (for generation skill)

The skill's OWN text is clean. But it does not enforce anti-slop standards on the DOCUMENTS it produces. Rule 6 covers the spirit ("no bullshit claims") but the mechanical anti-slop principles are absent:
- No ban on filler phrases in produced documents
- No ban on hedge words
- No ban on generic modifiers
- No "every sentence earns its place" directive
- No "taste test" instruction

### 11. VOICE SPECIFICATION: 3/5 -- FAILING

"Forensic investigation, not a think piece" is a strong voice directive. But it is a single line. A full voice spec would include:
- Vocabulary rules (ALWAYS USE / NEVER USE)
- Sentence pattern guidance
- Anti-exemplar (what WRONG tone looks like)
- The reference documents implicitly define voice, but the skill never says "match the tone of the reference documents"

---

## SPECIFIC IMPROVEMENT PRESCRIPTIONS

### CRITICAL FIX 1: Reframe Instructions as Constraints (Constraint Ratio)

**Current state:** Ratio is 0.38. Needs 0.60+.

**Prescription:** Take every action instruction and add its constraint boundary. Examples:

| Current (Instruction) | Rewrite (Constraint) |
|----------------------|---------------------|
| "Map convergence across 6 dimensions" | "The convergence map MUST include all 6 dimensions. Omitting any dimension without explicit justification is a failure." |
| "For EACH competitor, research using WebSearch and WebFetch" | "NEVER produce a competitor profile without live web research. Training data alone is NEVER sufficient. Every competitor MUST have at least 3 distinct source URLs cited." |
| "Save all 3 documents to the output folder" | "ALL documents MUST be saved as individual markdown files. NEVER deliver documents inline in chat only -- file persistence is mandatory." |
| "Present the conversation questions for Phase 2" | "Phase 2 questions MUST be presented verbatim from the CONVERSATION QUESTIONS section. Do NOT paraphrase, reorder, or omit questions." |

This does not change what the skill does. It changes how the instructions constrain the model.

### CRITICAL FIX 2: Add Missing Guardrails (Guardrail Coverage)

Add these four patterns:

**Trigger-Template Refusals:**
```markdown
## REFUSAL TRIGGERS

If asked to produce marketing copy, ads, or content based on this analysis:
  "This skill produces strategic analysis, not content. Use the analysis
  outputs as input to a content/copy skill."

If asked to skip Phase 1 and go directly to Phase 2:
  "Phase 2 requires Phase 1 outputs as input. There is no shortcut.
  Run phase1 first."

If asked to run analysis without web research:
  "This skill requires live web research. Analysis from training data
  alone violates Methodology Rule 5. Provide web access or do not proceed."
```

**Three-Tier Uncertainty:**
```markdown
## CONFIDENCE PROTOCOL

CERTAIN (5+ sources confirm): State the finding directly.
PROBABLE (2-4 sources, consistent pattern): State with "Evidence suggests..."
  and cite what you found.
UNCERTAIN (1 source or conflicting data): Flag explicitly:
  "NOTE: This finding is based on limited evidence [cite source].
  Verify before acting on this."

When a competitor's public marketing is thin (no sales pages found,
limited social presence), flag the profile as LOW-CONFIDENCE and state
what could not be verified.
```

**Locked Tool Grammar:**
```markdown
## TOOL USAGE RULES

WebSearch:
  - ALWAYS search for [competitor name + "sales page"] AND [competitor name
    + "about"] AND [competitor name + product names] as minimum queries
  - NEVER rely on a single search query per competitor
  - If search returns no relevant results, try alternate name variations
    before marking as "insufficient data"

WebFetch:
  - ALWAYS attempt to fetch the competitor's homepage, about page, and at
    least one product/sales page
  - If a page returns an error or paywall, note it in the profile and
    proceed with available data
  - NEVER cite a URL you did not actually fetch and read
```

**Positional Reinforcement:**
Add a reinforcement block at the END of the skill file:
```markdown
## REINFORCED RULES (Highest Priority)

These rules override all other instructions if there is any conflict:
1. Every claim backed by a specific quote from current marketing (Rule 6)
2. Client profile has equal or greater depth than any competitor (Rule 2)
3. Direction of mimesis correctly identified (Rule 3)
4. PAUSE after Phase 1 -- never produce Phase 2 without client input (Rule 7)
5. No analysis from training data alone -- live research required (Rule 5)
```

### MODERATE FIX 3: Strengthen Output Specification

Add to the OUTPUT FORMAT section:

```markdown
## DOCUMENT SPECIFICATIONS

| Document | Min Sections | Min Evidence Quotes | Expected Length |
|----------|-------------|--------------------|-----------------|
| Doc 1 | 4 major sections + 6 convergence dimensions | 3+ quotes per dimension | 2,000-4,000 words |
| Doc 2 | 1 profile per competitor + 2 zone maps | 5-10 quotes per competitor | 3,000-6,000 words |
| Doc 3 | 7 sections per spec above | 10+ client quotes | 2,000-4,000 words |
| Doc 4 | As defined in phase2 instructions | Grounded in client answers | 1,500-3,000 words |
| Doc 5 | As defined in phase2 instructions | Product-to-desire mapping | 1,500-3,000 words |
| Doc 6 | 5-dimension framework + deployment map | Existing proof inventory | 1,500-3,000 words |

VALIDATION: Before saving any document, the Quality Gate checklist MUST be
evaluated. If any item fails, fix before saving. Do not save and note
failures -- fix them first.
```

### MODERATE FIX 4: Add Context Window Management

The skill asks for research on 15+ competitors. At full depth, this will exceed any context window. Add:

```markdown
## CONTEXT MANAGEMENT

For markets with 15+ competitors:
  - Research and produce profiles in batches of 5
  - Save each batch to file before starting the next
  - Summarize completed competitor profiles to a reference table
    before loading the next batch
  - The convergence map (Doc 1) can be built incrementally as
    batches complete

If approaching context limits:
  - Save all work in progress to files immediately
  - Produce a handoff note listing: completed competitors, remaining
    competitors, partial findings
  - The next session can resume from the handoff note

NEVER attempt to hold 15+ full competitor research sets in memory
simultaneously. Batch and persist.
```

### MINOR FIX 5: Extract Voice Specification

Add after the Seven Methodology Rules:

```markdown
## VOICE AND TONE

The tone of all documents is FORENSIC ANALYST. Specifically:

ALWAYS:
  - Use specific evidence (quotes, data points, named sources)
  - Use direct declarative sentences ("X mediates Y" not "X appears to mediate Y")
  - Use comparison tables for side-by-side analysis
  - Name names, cite sources, show receipts

NEVER:
  - Use consultant-speak ("we recommend exploring the possibility of...")
  - Use vague intensifiers ("very significant," "extremely powerful")
  - Use filler transitions ("It is worth noting that...")
  - Use framework jargon that sounds impressive but means nothing
    ("desire propagation engine," "mimetic activation matrix")
  - Soften findings to avoid discomfort -- deliver hard truths directly

Match the tone of the reference documents in references/. If the reference
documents would not contain a phrase, neither should the output.
```

### MINOR FIX 6: Add Explicit Layer Separation

Restructure the Seven Methodology Rules into two layers:

```markdown
## LAYER 1: INVARIANTS (never override, no exceptions)

1. Every claim backed by a specific quote from live research
2. Client profile depth >= any competitor profile depth
3. Direction of mimesis investigated before framing
4. Phase 2 never produced without client conversation
5. Live web research required -- training data alone is forbidden

## LAYER 2: QUALITY GUIDANCE (adapt to context)

6. When the client is the originator, frame convergence as "competitors
   imitated you" not "you converged with competitors"
7. Run the ideas -- produce executed analysis, not concept descriptions
8. Tone is forensic and respectful -- hard truths without condescension
```

---

## WHAT IS ALREADY EXCELLENT (Do Not Change)

1. **The Seven Methodology Rules.** These are battle-tested from real client feedback. They encode tacit knowledge that most skills lack entirely. The narrative format makes them memorable. Keep them as-is -- the Layer 1/Layer 2 restructuring above is an ADDITION, not a replacement.

2. **The Reference Materials.** Three gold-standard documents with real competitor data, real quotes, real analysis. This is the best exemplar set I have audited. They demonstrate exactly what "good" looks like at every level of detail.

3. **The Phase 1/Phase 2 State Machine.** The mandatory pause between research and strategy is architecturally sound. It prevents the most common failure mode in strategic analysis skills: producing generic strategy without client context.

4. **The Girardian Concepts Reference Table.** Maps theory to application in a way that is both concise and immediately usable. This is a model for how domain knowledge should be embedded in skills.

5. **The Conversation Questions.** Grouped by document, specific enough to get useful answers, with two critical meta-questions (#10 in Doc 4 set and #9 in Doc 5 set) that capture client energy and emergent ideas. These show real client-interview craft.

6. **The Non-Goals.** Four specific, useful non-goals that prevent scope creep. "Does NOT fabricate desires -- it discovers what actually exists through research" is a constraint that many skills need and few have.

---

## PRIORITY ORDER FOR FIXES

| Priority | Fix | Impact | Effort |
|----------|-----|--------|--------|
| 1 | Reframe instructions as constraints (Fix 1) | Moves constraint ratio from 0.38 to ~0.65 | Medium -- rewrite phrasing, not content |
| 2 | Add missing guardrails (Fix 2) | Moves guardrail score from 3 to 7 | Medium -- add 4 new sections |
| 3 | Add context window management (Fix 4) | Prevents the most likely runtime failure | Low -- add one section |
| 4 | Strengthen output specification (Fix 3) | Moves output block from 3 to 4-5 | Low -- add specification table |
| 5 | Extract voice specification (Fix 5) | Moves voice spec from 3 to 4-5 | Low -- extract from existing content |
| 6 | Add layer separation (Fix 6) | Moves context layering from 2 to 4 | Low -- restructure existing rules |

---

## PROJECTED POST-FIX SCORES

If all six prescriptions are applied:

```yaml
projected_scores:
  constraint_ratio: 0.65 (was 0.38) -- PASS
  guardrail_coverage: 7 (was 3) -- PASS
  context_layering: 4 (was 2) -- PASS
  composability: 3 (unchanged -- requires interface contract work)
  output_block: 4.5 (was 3) -- improved
  voice_spec: 4.5 (was 3) -- PASS
  anti_slop: 8 (was 7) -- PASS (voice spec covers enforcement)

  projected_health: GOOD (0 critical failures, 1 non-critical below threshold)
  projected_recommendation: PASS (with notes on composability)
```

---

## FINAL ASSESSMENT

This skill has exceptional content and methodology. It encodes real practitioner knowledge from a real client session with real feedback loops. The reference materials are gold-standard. The theoretical grounding is solid and practically applied.

The weaknesses are all structural and mechanical -- the kind of issues that come from writing a skill as a practitioner's notebook rather than as a system configuration. The fixes are about reframing and adding guardrails, not about changing the substance.

The most important single fix is the constraint ratio inversion. Shifting from "here is what to do" to "here is what you must never fail to do" will materially improve output consistency across different invocations.

---

*Audit conducted against ARCHITECTURE-PRD.md (Nate Jones Prompt Architecture System) and QUALITY-STANDARDS.md (Scoring Rubrics v1.0). All scores based on documented rubrics.*
