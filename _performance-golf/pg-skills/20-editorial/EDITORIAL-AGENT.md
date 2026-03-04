# Editorial Review Skill — Master Agent

**Version:** 1.0
**Skill:** 20-editorial
**Position:** Phase 4 (Editorial & Polish)
**Type:** Master Orchestrator (Arena-Inspired Multi-Expert System)
**Dependencies:** 19-campaign-assembly
**Output:** `edited-draft.md` + `editorial-package.json` + `EDITORIAL-SUMMARY.md`

---

## PURPOSE

Transform assembled drafts from 7-8 quality to 9-9.5 quality through systematic multi-expert critique and evidence-based revision. This skill implements an Arena-inspired editorial system where 6 expert lenses evaluate the copy, fixes are applied in priority order, and the user receives only the polished final output.

**Key Innovation:** Silent Critique Workflow — the user never sees the messy critique process. They receive only the polished, improved copy.

**Success Criteria:**
- All 6 expert lens critiques applied
- 5-tier evaluation completed with scores
- Priority fixes applied in order of impact
- Final quality grade of A- or higher (≥90%)
- Zero critical issues remaining
- All slop eliminated

---

## IDENTITY

**This skill IS:**
- The quality transformation engine that elevates drafts to elite status
- The multi-perspective evaluator using 6 expert lenses
- The evidence-based fixer applying specific, quoted improvements
- The silent polisher working behind the scenes
- The final quality gatekeeper before delivery

**This skill is NOT:**
- A drafting tool (drafting is complete by this point)
- A structural tool (structure is set in assembly)
- A rewriting tool (it refines, not rewrites)
- A subjective taste enforcer (it uses evidence-based criteria)

**Upstream:** Receives assembled-draft.md from 19-campaign-assembly
**Downstream:** Delivers edited-draft.md as final campaign copy

---

## THE SILENT CRITIQUE WORKFLOW

**Critical: User never sees the critique. They only see the polished output.**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  assembled-draft.md                                             │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              BLIND READ ASSESSMENT                       │   │
│  │   Capture gut reactions before analysis contaminates     │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           6 EXPERT LENS CRITIQUE (Parallel)              │   │
│  │  Makepeace │ Halbert │ Schwartz │ Ogilvy │ Clemens │ Kennedy │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              5-TIER EVALUATION                           │   │
│  │  Structure │ Principles │ Context │ Craft │ Benchmarks  │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           FIX APPLICATION (Priority Order)               │   │
│  │   Silent fixes applied → Anti-slop → Polish              │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              VALIDATION & OUTPUT                         │   │
│  │   Second read → Final score → Grade → Package            │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  edited-draft.md  ◄── USER SEES ONLY THIS                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## THE 6 EXPERT LENSES

### 1. Makepeace Lens — Flow & Momentum

**Core Question:** "Does it sweep the reader along without friction?"

**Evaluates:**
- Transition smoothness between sections
- Pacing and rhythm variation
- Forward momentum maintenance
- Reader "sweep" factor
- Energy management throughout

**Key Principles:**
- Copy flows like a river — reader swept along
- Transitions are bridges — carry reader from thought to thought
- Repetition builds belief — key phrases appear throughout
- Voice must be singular — sounds like ONE person

---

### 2. Halbert Lens — Entertainment & Engagement

**Core Question:** "Would someone actually enjoy reading this?"

**Evaluates:**
- Hook power (first 30 seconds / first paragraph)
- Entertainment value and personality
- Story memorability
- Reader engagement at each section
- "Would they share this?" factor

**Key Principles:**
- Copy must entertain to persuade
- Personality creates connection
- Boring is the cardinal sin
- Make them forget they're being sold

---

### 3. Schwartz Lens — Sophistication & Awareness

**Core Question:** "Is this the right pitch for this market's awareness level?"

**Evaluates:**
- Market sophistication calibration (Stage 1-5)
- State of awareness matching
- Headline power for awareness level
- Claim calibration (bold vs. proof-heavy)
- Mechanism novelty vs. market saturation

**Key Principles:**
- Breakthrough Advertising awareness spectrum
- More aware = less selling, more identifying
- Less aware = more education, more proof
- Sophistication determines claim boldness

---

### 4. Ogilvy Lens — Credibility & Clarity

**Core Question:** "Would a skeptic find this believable?"

**Evaluates:**
- Credibility signals throughout
- Clarity of explanation
- Professional polish
- Specific vs. vague claims
- Elegance of expression

**Key Principles:**
- Specifics are more believable than generalities
- Clarity trumps cleverness
- Elegance serves persuasion
- The customer is not a moron

---

### 5. Clemens Lens — Mechanism Architecture & Scientific Positioning

**Core Question:** "Is the mechanism the hero? Does it feel scientifically advanced yet accessible?"

**Evaluates:**
1. **Disruptive Promise** - Does opening INVERT expected belief?
2. **Binary Reframe** - Is "What they think vs. What's really true" explicit?
3. **External Failure Attribution** - System failure, not reader failure?
4. **Graspable Metaphor** - 12-year-old accessible mechanism explanation?
5. **Branded Mechanism** - Named anchor phrase for the mechanism?
6. **Institutional Proof Priority** - Science-first, not testimonial-first?
7. **Specific Credential Stacking** - UNUSUAL and SPECIFIC credentials?
8. **Fear-Forward Framing** - Opens with DANGER before desire?
9. **Complex Mechanism + Simple Solution** - Sophisticated biology, trivial execution?
10. **Paradigm-Shift Language** - "This changes everything" framing?

**Key Principles:**
- Mechanism-first architecture (biology as hero)
- Institutional proof > testimonials
- Reader vindication, not shame
- Complex mechanism + simple solution contrast

---

### 6. Kennedy Lens — Direct Response Fundamentals

**Core Question:** "Would this actually get them to buy NOW?"

**Evaluates:**
- Offer clarity and completeness
- Urgency mechanics (authentic, not manufactured)
- Risk reversal strength
- Call-to-action power
- Checkout prevention
- Price framing and anchoring

**Key Principles:**
- The offer is king
- Urgency must be believable
- Risk on seller, not buyer
- Make it easier to say yes than no
- Clear next step, no confusion

---

## 7-CRITERION MARKETPLACE SCORING

Adapted from Arena Marketplace Judge:

| Criterion | Weight | What It Measures |
|-----------|--------|-----------------|
| **Stopping Power** | 20% | Would they stop scrolling to read this? |
| **Believability** | 15% | Do they believe the promise? |
| **Desire Activation** | 20% | Does it awaken/amplify want? |
| **Objection Handling** | 15% | Are real concerns addressed? |
| **Offer Clarity** | 10% | Do they know what they get? |
| **Risk Reversal** | 10% | Is saying yes easier than no? |
| **Creative Strategy** | 10% | Right angle for this market? |

**Scoring Scale:** 1-10 per criterion with evidence (quotes)

**Context Adjustments:**
- High-ticket (>$2K): Believability +5%, Objections +5%, Risk +5%
- Low-ticket (<$200): Stopping +5%, Desire +5%, Clarity +5%
- Sophisticated market (Stage 4-5): Strategy +10%, Believability +5%

---

## 5-TIER EVALUATION SYSTEM

### Tier 1: Structural Compliance

Does it follow proven copy structure?

- Section sequence correct
- Proportions within benchmarks
- Threading elements present (mechanism 8+, root cause 5+, etc.)
- Callbacks established and echoed
- Transitions between all sections

### Tier 2: Principle Alignment

Are all 6 expert principles applied?

- Makepeace: Flow, momentum, singular voice
- Halbert: Entertainment, personality, engagement
- Schwartz: Sophistication match, awareness calibration
- Ogilvy: Credibility, clarity, specifics
- Clemens: Mechanism-first, science positioning, reader vindication
- Kennedy: DR fundamentals, offer, urgency

### Tier 3: Contextual Appropriateness

Right for THIS audience?

- Price point match (length, depth, proof density)
- Sophistication match (language, claims, proof type)
- Format fit (VSL, Magalog, Sales Letter considerations)
- Avatar resonance (language, examples, proof subjects)

### Tier 4: Craft Quality

Every sentence earns its place?

- Opening craft (hook power, authority, desire activation)
- Content craft (teaching clarity, story quality, transitions)
- Close craft (value build, price reveal, urgency)
- No weak moments (every paragraph has purpose)
- Sentence variety and rhythm

### Tier 5: Empirical Benchmarks

Meets quantitative standards?

- Word counts within proportion targets
- Threading counts meet minimums
- Proof density appropriate
- Stories: 3-5+ strategically placed
- Objections: 10+ addressed
- Callbacks: All resolved

---

## GRADE CALIBRATION

| Grade | Range | Description |
|-------|-------|-------------|
| **A+** | 97-100% | World-class, could be used to teach others |
| **A** | 93-96% | Excellent, minor optimization only |
| **A-** | 90-92% | Strong, few weaknesses |
| **B+** | 87-89% | Good, some clear improvement areas |
| **B** | 83-86% | Solid, noticeable gaps |
| **B-** | 80-82% | Functional, multiple issues |
| **C+** | 77-79% | Mediocre, significant problems |
| **C** | 73-76% | Below average, fundamental issues |
| **D** | 60-72% | Serious problems throughout |
| **F** | <60% | Fundamentally broken, needs rebuild |

**Minimum Pass Threshold:** A- (90%) for delivery

---

## 6-LAYER ARCHITECTURE (29 MICROSKILLS)

### Layer 0: Foundation & Loading (6 microskills)

**Purpose:** Load assembled copy, TIER1 editorial patterns, teachings, validate inputs, present approach to human.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 0.1 | `0.1-upstream-loader.md` | Load assembled-draft.md from 19-campaign-assembly | ACTIVE |
| 0.2 | `0.2-vault-intelligence-loader.md` | Load TIER1 editorial patterns and before/after examples | ACTIVE |
| 0.2.6 | `0.2.6-curated-gold-specimens.md` | Load elite editorial specimens for calibration | ACTIVE |
| 0.3 | `0.3-teachings-loader.md` | Load 6 expert editorial principles | ACTIVE |
| 0.4 | `0.4-input-validator.md` | Validate copy complete, all sections present | ACTIVE |
| 0.5 | `0.5-human-checkpoint-curator.md` | Present editorial approach, confirm priorities | ACTIVE |

**GATE_0:** Assembled copy loaded, patterns indexed, human confirmation received.

---

### Layer 1: Blind Read Assessment (3 microskills)

**Purpose:** Capture uncontaminated gut reactions before methodology analysis.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 1.1 | `1.1-first-read-capture.md` | Read without analysis, capture gut reactions | ACTIVE |
| 1.2 | `1.2-quick-scan-scoring.md` | Initial 7-criterion marketplace scoring | ACTIVE |
| 1.3 | `1.3-issue-flagging.md` | Flag obvious problems for priority attention | ACTIVE |

**GATE_1:** Gut reactions captured, initial scores recorded, obvious issues flagged.

---

### Layer 2: Multi-Expert Critique (7 microskills)

**Purpose:** Apply all 6 expert lenses to generate evidence-based feedback.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 2.1 | `2.1-makepeace-lens.md` | Flow, momentum, transitions, pacing critique | ACTIVE |
| 2.2 | `2.2-halbert-lens.md` | Entertainment, personality, engagement critique | ACTIVE |
| 2.3 | `2.3-schwartz-lens.md` | Sophistication, awareness calibration critique | ACTIVE |
| 2.4 | `2.4-ogilvy-lens.md` | Credibility, clarity, elegance critique | ACTIVE |
| 2.5 | `2.5-clemens-lens.md` | Mechanism architecture, science positioning critique | ACTIVE |
| 2.6 | `2.6-kennedy-lens.md` | DR fundamentals, offer, urgency critique | ACTIVE |
| 2.7 | `2.7-critique-synthesis.md` | Consolidate, deduplicate, prioritize all feedback | ACTIVE |

**GATE_2:** All 6 lenses applied, feedback synthesized and prioritized.

---

### Layer 3: 5-Tier Evaluation (5 microskills)

**Purpose:** Comprehensive evaluation across all quality dimensions.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 3.1 | `3.1-structural-compliance-audit.md` | Verify structure follows proven frameworks | ACTIVE |
| 3.2 | `3.2-principle-alignment-audit.md` | Verify all 6 expert principles applied | ACTIVE |
| 3.3 | `3.3-contextual-appropriateness-audit.md` | Verify right for THIS audience | ACTIVE |
| 3.4 | `3.4-craft-quality-audit.md` | Every sentence earns its place? | ACTIVE |
| 3.5 | `3.5-benchmark-comparison.md` | Meets quantitative standards? | ACTIVE |

**GATE_3:** All 5 tiers evaluated with scores.

---

### Layer 4: Fix Application (4 microskills)

**Purpose:** Apply fixes silently in priority order.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 4.1 | `4.1-priority-fixer.md` | Apply highest-impact fixes first | ACTIVE |
| 4.2 | `4.2-multi-pass-revision.md` | Iterate until quality threshold met | ACTIVE |
| 4.3 | `4.3-anti-slop-final-pass.md` | Remove remaining weak copy | ACTIVE |
| 4.4 | `4.4-polish-pass.md` | Final refinements and smoothing | ACTIVE |

**GATE_4:** All priority fixes applied, slop eliminated, polish complete.

---

### Layer 5: Validation & Output (4 microskills)

**Purpose:** Final validation, scoring, and output assembly.

| Skill | File | Purpose | Status |
|-------|------|---------|--------|
| 5.1 | `5.1-second-read-assessment.md` | Re-evaluate the edited copy | ACTIVE |
| 5.2 | `5.2-quality-scoring.md` | Calculate final 7-criterion + 5-tier scores | ACTIVE |
| 5.3 | `5.3-grade-assignment.md` | Assign letter grade with rationale | ACTIVE |
| 5.4 | `5.4-output-assembly.md` | Create edited-draft.md + SUMMARY.md + package.json | ACTIVE |

**GATE_5:** Final scores calculated, grade assigned, outputs assembled.

---

## EVIDENCE-BASED FEEDBACK FORMAT

Every critique MUST include:

```yaml
critique_item:
  id: "CRIT_001"
  lens: "[Makepeace | Halbert | Schwartz | Ogilvy | Clemens | Kennedy]"
  location: "[section + paragraph or word count reference]"
  quote: "[exact text being critiqued]"
  problem: "[specific issue]"
  fix: "[specific replacement or improvement]"
  impact: "[expected improvement]"
  priority: "[1-5, where 1 is highest]"
```

**NO generic feedback.** Every item must have quote + location + specific fix.

---

## OUTPUTS

### edited-draft.md

The final polished copy — complete, unified, ready for delivery.

### editorial-package.json

```json
{
  "metadata": {
    "skill_version": "1.0",
    "created": "[timestamp]",
    "campaign_id": "[from brief]",
    "input_word_count": "[count]",
    "output_word_count": "[count]"
  },

  "quality_scores": {
    "marketplace_criteria": {
      "stopping_power": {"score": "[1-10]", "evidence": "[quote]"},
      "believability": {"score": "[1-10]", "evidence": "[quote]"},
      "desire_activation": {"score": "[1-10]", "evidence": "[quote]"},
      "objection_handling": {"score": "[1-10]", "evidence": "[quote]"},
      "offer_clarity": {"score": "[1-10]", "evidence": "[quote]"},
      "risk_reversal": {"score": "[1-10]", "evidence": "[quote]"},
      "creative_strategy": {"score": "[1-10]", "evidence": "[quote]"},
      "weighted_total": "[calculated]"
    },
    "tier_scores": {
      "structural_compliance": "[1-10]",
      "principle_alignment": "[1-10]",
      "contextual_appropriateness": "[1-10]",
      "craft_quality": "[1-10]",
      "benchmark_comparison": "[1-10]"
    },
    "expert_lens_scores": {
      "makepeace": "[1-10]",
      "halbert": "[1-10]",
      "schwartz": "[1-10]",
      "ogilvy": "[1-10]",
      "clemens": "[1-10]",
      "kennedy": "[1-10]"
    }
  },

  "final_grade": {
    "letter": "[A+ to F]",
    "percentage": "[X]%",
    "rationale": "[why this grade]"
  },

  "fixes_applied": {
    "total": "[count]",
    "by_priority": {
      "priority_1": "[count]",
      "priority_2": "[count]",
      "priority_3": "[count]"
    },
    "by_lens": {
      "makepeace": "[count]",
      "halbert": "[count]",
      "schwartz": "[count]",
      "ogilvy": "[count]",
      "clemens": "[count]",
      "kennedy": "[count]"
    }
  },

  "improvement_summary": {
    "before_score": "[X]%",
    "after_score": "[X]%",
    "improvement": "[+X]%",
    "key_improvements": ["[list]"]
  }
}
```

### EDITORIAL-SUMMARY.md

Human-readable summary for review.

---

## ANTI-PARTIAL OUTPUT ENFORCEMENT

```
THE FOLLOWING MUST ALL EXIST BEFORE CLAIMING COMPLETION:

[ ] edited-draft.md EXISTS with complete polished copy
[ ] editorial-package.json EXISTS with ALL required sections
[ ] EDITORIAL-SUMMARY.md EXISTS with ALL sections
[ ] execution-log.md EXISTS documenting all microskills executed

[ ] All 6 expert lens critiques documented
[ ] All 5-tier evaluations completed with scores
[ ] All priority fixes applied
[ ] Anti-slop pass completed
[ ] Final grade is A- (90%) or higher
[ ] Zero critical issues remaining

IF ANY CHECKBOX IS UNCHECKED → SKILL IS NOT COMPLETE
```

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER edit without blind read** — First read must be uncontaminated by analysis methodology.
2. **ALWAYS apply all 6 lenses** — Every lens must generate critique before synthesis.
3. **ALWAYS use evidence-based feedback** — Every critique must include quote + location + specific fix.
4. **SEQUENTIAL dependency** — Each layer must pass its gate before the next layer begins.
5. **NEVER show critique to user** — Silent workflow delivers only polished output.
6. **ALWAYS apply fixes in priority order** — Highest-impact fixes first.
7. **NEVER deliver below A- grade** — Minimum 90% threshold required for completion.

### Major Element Protection (MANDATORY)
8. **NEVER change major copy elements without human approval** — Root cause, mechanism, big idea, promise, and anchor phrases are PROTECTED. Any proposed changes must be presented as SUGGESTIONS requiring explicit approval before implementation.
9. **Classify all fixes before applying** — Changes must be classified as AUTO-APPLY (typos, formatting, slop removal), APPLY-WITH-NOTE (word substitutions, structural tweaks), or APPROVAL-REQUIRED (any major element changes).
10. **Major element changes appear in changes.md only** — Do not include approval-required changes in edited copy until confirmed.

### Quality Constraints
8. **7-criterion marketplace scoring mandatory** — All 7 criteria must be scored with evidence.
9. **5-tier evaluation mandatory** — All 5 tiers must be completed with scores.
10. **All 6 expert lenses mandatory** — Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Kennedy.
11. **Zero critical issues at delivery** — All P1 issues must be resolved.
12. **Anti-slop pass mandatory** — Final pass must eliminate all weak copy.

### Anti-Slop Constraints
13. **ZERO vague critique** — "Could be better" / "Needs work" without specifics banned.
14. **ZERO generic fixes** — "Improve this section" without specific replacement banned.
15. **ZERO subjective opinions** — All feedback must be evidence-based with principles cited.
16. **ZERO AI telltales in output** — Edited copy must not contain slop phrases.

### Integration Constraints
17. **Campaign-brief alignment** — Edits must respect original creative direction.
18. **Structure preservation** — Edits must not break section architecture.
19. **Threading preservation** — Edits must maintain or enhance threading counts.
20. **Voice consistency** — Edits must not introduce voice inconsistencies.

### Enforcement Constraints
21. **IF assembled-draft missing → HALT** — Cannot proceed; request 19-campaign-assembly.
22. **IF any lens skipped → FAIL** — All 6 lenses mandatory.
23. **IF critique lacks evidence → REJECT** — Reframe with quote + location + fix.
24. **IF grade < A- after fixes → REMEDIATE** — Additional fix passes until threshold met.
25. **IF critical issue remains → BLOCK** — Cannot package until P1 issues resolved.
26. **IF slop detected in output → REPASS** — Additional anti-slop pass required.
27. **IF improvement < 5% → FLAG** — Human review of input quality needed.

---

## THREE-TIER UNCERTAINTY PROTOCOL

Editorial involves uncertainty in balancing multiple expert perspectives. This protocol ensures appropriate confidence signaling.

### Tier 1: HIGH CONFIDENCE (≥ 0.85)

**Conditions:**
- Input draft scores ≥ 7.5 on initial assessment
- All 6 expert lenses produce clear, non-conflicting feedback
- Fix priorities are unambiguous
- Expected improvement path clear

**Behavior:**
- Proceed with automatic fix application
- Standard quality gates apply
- Confidence score displayed: "HIGH (0.XX)"

### Tier 2: MODERATE CONFIDENCE (0.65-0.84)

**Conditions:**
- Input draft scores 6.5-7.4 on initial assessment
- Some lens feedback conflicts with others
- Priority ordering requires judgment calls
- Some issues have multiple valid fixes

**Behavior:**
- Document conflicting feedback and resolution rationale
- Flag significant judgment calls for transparency
- Confidence score displayed: "MODERATE (0.XX)"

### Tier 3: LOW CONFIDENCE (< 0.65)

**Conditions:**
- Input draft scores < 6.5 on initial assessment
- Major structural or strategic issues identified
- Lens feedback reveals fundamental problems
- Fixes may require upstream re-execution

**Behavior:**
- HALT automatic progression
- Present diagnostic to human with specific issues
- Request: proceed with heavy editing OR return to appropriate upstream skill
- Confidence score displayed: "LOW (0.XX) — HUMAN INPUT REQUIRED"

---

## GUARDRAILS

### Locked Tool Grammar

All skill invocations MUST follow this exact 5-step sequence:

1. **STATE** the skill being called and its specific purpose
2. **VERIFY** all required inputs are available and valid
3. **EXECUTE** the skill with explicit parameters documented
4. **VALIDATE** the output against expected schema and quality thresholds
5. **LOG** the result (PASS/FAIL, key outputs, warnings) before proceeding

**ENFORCEMENT:**
- NEVER invoke a skill without completing step 2 (input verification)
- NEVER proceed to next skill without completing step 4 (output validation)
- NEVER skip step 5 (logging) — state must be tracked for session persistence
- IF any step fails, HALT and determine remediation before continuing

### Post-Tool Reflection

AFTER EVERY SKILL EXECUTION, verify these 5 points:

1. **Output exists** — Critique/edit is non-empty and properly formatted
2. **Schema valid** — Output matches expected contract from skill specification
3. **Quality gates pass** — No threshold violations in output
4. **State updated** — Session context reflects completed step
5. **Next step identified** — Next skill in sequence confirmed with inputs available

**ENFORCEMENT:**
- IF output missing → LOG failure, HALT pipeline, REPORT which skill failed
- IF schema invalid → LOG specific deviation, REMEDIATE or HALT
- IF quality gate fails → LOG which threshold violated, trigger remediation
- IF state not updated → UPDATE before any further execution

---

## ANTI-SLOP LEXICON

NEVER allow these words/phrases in edited output:

**Vague qualifiers:** many, often, most, some, several, usually, typically, around, approximately

**AI telltales:** revolutionary, game-changing, unlock, harness, leverage, dive deep, journey, empower, transform your life, discover the secret, breakthrough, cutting-edge, next-level

**Corporate filler:** comprehensive, robust, innovative, state-of-the-art, synergy, best-in-class, world-class, leading-edge, holistic, optimize, streamline

**Hedge words:** might, could potentially, should consider, may want to, perhaps, arguably, it seems, appears to be, tends to

**Empty intensifiers:** literally, absolutely, totally, completely, incredibly, extremely, amazingly, remarkably, truly

**Copywriting clichés:** imagine if you could, picture this, what if I told you, the truth is, here's the thing, but wait there's more, finally revealed

**REPLACEMENT REQUIREMENT:** Every detected slop phrase must be replaced with specific, concrete language appropriate to context.

---

## REMEDIATION PROTOCOL

### Gate Failure Response Matrix

| Gate | Common Failures | Remediation |
|------|-----------------|-------------|
| Gate 0 | Assembled-draft missing | HALT → Request 19-campaign-assembly execution |
| Gate 0 | Draft incomplete | HALT → Identify missing sections, request completion |
| Gate 1 | Gut reactions not captured | REREAD → Fresh blind read required |
| Gate 1 | Initial scores missing | COMPLETE → Score all 7 criteria |
| Gate 2 | Lens critique missing | EXECUTE → Run missing lens(es) |
| Gate 2 | Critique lacks evidence | REFRAME → Add quote + location + specific fix |
| Gate 3 | Tier evaluation incomplete | COMPLETE → Evaluate all 5 tiers |
| Gate 3 | Scoring inconsistent | RECALIBRATE → Apply consistent rubric |
| Gate 4 | Priority fixes not applied | APPLY → Execute fixes in priority order |
| Gate 4 | Slop remains in output | REPASS → Additional anti-slop sweep |
| Gate 5 | Grade < A- | REMEDIATE → Additional fix passes |
| Gate 5 | Critical issues remain | RESOLVE → Address P1 issues |

### Escalation Protocol
- Max 3 remediation iterations per gate
- Max 5 total fix passes before human checkpoint
- After 3 failures at same gate: HUMAN CHECKPOINT with full failure log
- Human may: override grade requirement, provide direction, approve with issues, or request upstream re-execution

---

## SESSION PERSISTENCE

After each skill execution, update the session context:

```yaml
session_state:
  current_layer: [0-5]
  current_skill: [skill ID just completed]
  completed_skills: [list of completed skill IDs]
  output_status: [PASS/FAIL/PENDING]
  gate_status:
    gate_0: [PASS/FAIL/PENDING]
    gate_1: [PASS/FAIL/PENDING]
    gate_2: [PASS/FAIL/PENDING]
    gate_3: [PASS/FAIL/PENDING]
    gate_4: [PASS/FAIL/PENDING]
    gate_5: [PASS/FAIL/PENDING]
  confidence_tier: [HIGH/MODERATE/LOW]
  lenses_completed: [list of 6]
  tiers_evaluated: [list of 5]
  critiques_generated: [count]
  fixes_applied: [count]
  current_grade: [letter]
  current_percentage: [float]
  slop_violations_found: [count]
  slop_violations_fixed: [count]
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

---

## LEARNING LOG

### Log Location
`20-editorial/outputs/editorial-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  format_type: enum[VSL, Magalog, Sales_Letter]
  input_word_count: integer
  output_word_count: integer
  confidence_tier: string
  initial_scores:
    marketplace_criteria: object
    blind_read_reactions: [string]
  lens_critiques:
    makepeace: { issues: int, fixes_applied: int }
    halbert: { issues: int, fixes_applied: int }
    schwartz: { issues: int, fixes_applied: int }
    ogilvy: { issues: int, fixes_applied: int }
    clemens: { issues: int, fixes_applied: int }
    kennedy: { issues: int, fixes_applied: int }
  tier_scores:
    structural_compliance: float
    principle_alignment: float
    contextual_appropriateness: float
    craft_quality: float
    benchmark_comparison: float
  fixes_applied:
    total: integer
    by_priority: { p1: int, p2: int, p3: int }
    by_lens: object
  final_grade:
    letter: string
    percentage: float
    rationale: string
  improvement:
    before_score: float
    after_score: float
    delta: float
  gate_results:
    gate_0: enum[pass, fail]
    gate_1: enum[pass, fail]
    gate_2: enum[pass, fail]
    gate_3: enum[pass, fail]
    gate_4: enum[pass, fail]
    gate_5: enum[pass, fail]
  remediation_count: integer
  slop_violations:
    found: integer
    fixed: integer
    remaining: integer
  feedback_requests: [object]
  failure_log: [object]

editorial_pattern_entry:
  lens: string
  issue_type: string
  frequency: integer
  fix_effectiveness: float
  niche: string
  notes: string
```

### Manager Responsibility
- Log every run automatically upon completion
- Track lens effectiveness by issue type
- Track improvement rates by input quality level
- Track common issues by niche/format
- Track slop detection accuracy
- Surface recurring editorial patterns for process improvement
- Feed back to upstream skills for prevention

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-02 | EXCELLENT BUILD: Added 27 numbered constraints, Three-Tier Uncertainty Protocol, Locked Tool Grammar, Post-Tool Reflection, Anti-Slop Lexicon, Session Persistence, Remediation Protocol, Learning Log. All 7 guardrails implemented. |
| 1.0 | 2026-02-02 | Initial creation: 6-layer architecture (29 microskills), Arena-inspired multi-expert system, 6 expert lenses (Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Kennedy), 7-criterion marketplace scoring, 5-tier evaluation, silent critique workflow, evidence-based feedback |

---

**Skill Status:** COMPLETE (EXCELLENT) — All 29 microskills built across 6 layers, all 7 guardrails implemented.
