# ARENA PROTOCOL — COMPETITION & SYNTHESIS RULES
## How the 7 Personas Compete and Combine
## Version 1.0 — March 2026

---

## THE ARENA PROCESS

### Overview
The Arena is a 5-phase structured competition that transforms a content brief into synthesis-quality output no single perspective would create.

```
BRIEF → GENERATION → CRITIQUE → REVISION → CRITIQUE 2 → SYNTHESIS
         (Phase 1)   (Phase 2)   (Phase 3)   (Phase 4)    (Phase 5)
```

---

## PHASE 1: INDEPENDENT GENERATION

**Duration:** 7 persona outputs generated independently
**Rule:** No persona sees another's work during this phase

### Input Required
```yaml
brief:
  campaign: [Campaign Brief reference]
  content_type: [What we're creating]
  platform: [Where it will live]
  function: [awareness/engagement/conversion/community]
  audience_segment: [Who this is for]
  constraints: [Length, format, tone requirements]
  objective: [What success looks like]
```

### Per-Persona Output Format
```yaml
persona: [Persona Name]
phase: 1

strategic_rationale: |
  Why I'm approaching it this way...
  What my philosophy says about this brief...
  What I'm prioritizing and why...

hook:
  text: [Exact hook/opening]
  type: [From hook taxonomy]
  why_chosen: [Strategic reasoning]

structure:
  opening: [What happens first]
  body: [How the middle flows]
  close: [How it ends]

full_draft: |
  [Complete content piece as I would execute it]

predicted_performance:
  virality_score: [My estimate]
  primary_strength: [What this does best]
  known_weakness: [Where this might fall short]
```

---

## PHASE 2: ADVERSARIAL CRITIQUE (Round 1)

**Duration:** Each persona critiques all 6 other outputs
**Total:** 42 critiques generated

### Critique Rules
1. Be SPECIFIC — cite exact elements, not vague assessments
2. Be CONSTRUCTIVE — critique to improve, not to win
3. Be HONEST — surface real weaknesses
4. Acknowledge STRENGTHS — what works must be noted
5. Offer SOLUTIONS — don't just identify problems

### Critique Format
```yaml
critic: [Persona Name]
target: [Persona Being Critiqued]

strengths:
  - element: [Specific element]
    why_strong: [Reasoning]
  - element: [Specific element]
    why_strong: [Reasoning]

weaknesses:
  - element: [Specific element]
    why_weak: [Reasoning]
    fix: [How to improve]
  - element: [Specific element]
    why_weak: [Reasoning]
    fix: [How to improve]

stealing_for_round_2:
  - element: [What I'm incorporating]
    from_target: [Yes/No — from this target or general learning]
```

### Critique Dimensions
Each critique should address:
- **Hook Strength:** Does the opening stop the scroll?
- **Value Delivery:** Does this deliver on its promise?
- **Platform Fit:** Is this native to the platform?
- **Brand Alignment:** Does this feel on-brand?
- **Shareability:** Would someone share this?
- **Emotional Resonance:** Does this create feeling?

---

## PHASE 3: REVISION (Round 2)

**Duration:** Each persona revises their output based on critiques
**Rule:** Must address at least 2 critiques; must incorporate at least 1 element from another persona

### Revision Requirements
1. Address critiques that came from 2+ personas (consensus)
2. Address your acknowledged weakness from Phase 1
3. Incorporate at least 1 strong element you saw elsewhere
4. Maintain your core strategic identity while improving

### Revision Format
```yaml
persona: [Persona Name]
phase: 2

critiques_addressed:
  - critique: [Specific critique]
    source: [Who made it]
    change_made: [How I addressed it]
  - critique: [Specific critique]
    source: [Who made it]
    change_made: [How I addressed it]

elements_incorporated:
  - element: [What I added]
    source_persona: [Who I got it from]
    integration: [How I made it mine]

revised_draft: |
  [Complete revised content piece]

improvement_delta:
  predicted_new_score: [Updated estimate]
  what_improved: [Key improvements]
```

---

## PHASE 4: ADVERSARIAL CRITIQUE (Round 2)

**Duration:** Each persona critiques all 6 revised outputs
**Focus:** Synthesis opportunities, remaining weaknesses

### Phase 4 Critique Focus
This round focuses on:
1. **Synthesis Opportunities:** What elements from different personas could combine?
2. **Remaining Gaps:** What still isn't working?
3. **Convergence Points:** Where are multiple personas now agreeing?
4. **Final Recommendations:** What should make the synthesis?

### Phase 4 Critique Format
```yaml
critic: [Persona Name]
target: [Persona Being Critiqued]

synthesis_candidates:
  - element: [Specific element]
    why_essential: [Should definitely make synthesis]
    combine_with: [Element from another persona it pairs with]

remaining_gaps:
  - gap: [What's still missing/weak]
    importance: [Critical/Moderate/Minor]

convergence_noted: |
  [Where this output now agrees with others]

final_recommendation:
  include_in_synthesis: [Yes/Partially/No]
  reasoning: [Why]
```

---

## PHASE 5: FINAL SYNTHESIS

**Duration:** Extract best elements from all 21 outputs (7 × 3)
**Output:** One unified content piece that is greater than any single submission

### Synthesis Protocol

**Step 1: Identify Winning Elements**
```yaml
winning_hook:
  selected: [Exact hook]
  source: [Which persona]
  round: [Phase 1, 2, or combination]
  selection_reasoning: [Why this one]

winning_structure:
  selected: [Structure description]
  source: [Which persona(s)]
  selection_reasoning: [Why this approach]

winning_moments:
  - moment: [Specific line/section/element]
    source: [Which persona, which round]
    placement: [Where in final piece]
  - moment: [...]
    source: [...]
    placement: [...]

winning_cta:
  selected: [Exact CTA]
  source: [Which persona]
  selection_reasoning: [Why]
```

**Step 2: Assemble Draft**
```yaml
synthesized_draft: |
  [Complete content piece assembled from winning elements]
```

**Step 3: Coherence Check**
```yaml
coherence_check:
  flows_naturally: [Yes/No — if No, smooth transitions]
  single_voice: [Yes/No — if No, unify voice]
  no_frankenpiece: [Yes/No — if No, identify seams]
```

**Step 4: Virality Score**
```yaml
final_score:
  ea: [1-10] — [Rationale]
  sc: [1-10] — [Rationale]
  pi: [1-10] — [Rationale]
  pf: [1-10] — [Rationale]
  sh: [1-10] — [Rationale]
  total: [Calculated]
```

**Step 5: Score Validation**
- If score ≥ 70: Proceed to output
- If score 60-69: Revise weakest dimension
- If score < 60: Re-run synthesis with focus on weak dimensions

---

## SYNTHESIS OUTPUT FORMAT

```markdown
## ARENA SYNTHESIS: [Content Title]

### Brief Summary
[What was requested in one line]

### Synthesis Stats
- Total Submissions: 21 (7 personas × 3 rounds)
- Critiques Generated: 84 (42 per round)
- Synthesis Difficulty: [Easy/Medium/Hard]

### Winning Elements

| Element | Source Persona | Round | Why Selected |
|---------|----------------|-------|--------------|
| Hook | [X] | [1/2] | [Rationale] |
| Structure | [X] | [1/2] | [Rationale] |
| [Moment 1] | [X] | [1/2] | [Rationale] |
| [Moment 2] | [X] | [1/2] | [Rationale] |
| CTA | [X] | [1/2] | [Rationale] |

### Rejected Elements

| Element | Source | Reason Rejected |
|---------|--------|-----------------|
| [X] | [Persona] | [Why it didn't make cut] |
| [X] | [Persona] | [Why it didn't make cut] |

### Final Synthesized Content

[THE ACTUAL CONTENT PIECE]

### Virality Score Breakdown

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| EA: Emotional Activation | X/10 | [Why] |
| SC: Social Currency | X/10 | [Why] |
| PI: Pattern Interrupt | X/10 | [Why] |
| PF: Platform Fit | X/10 | [Why] |
| SH: Shareability | X/10 | [Why] |
| **TOTAL** | **XX/100** | |

### Arena Meta-Notes
- Strongest persona for this brief: [X]
- Most valuable critique: [Specific]
- Key synthesis insight: [What emerged from competition]
```

---

## ARENA QUICK MODE

For time-sensitive content, truncated Arena:

**When to Use:**
- Trend response (speed critical)
- Lower-stakes content
- Already have strong brief

**Process:**
1. Select 3 most relevant personas
2. Single generation round
3. Brief critique exchange
4. Rapid synthesis
5. Time limit: 10 minutes

**When NOT to Use:**
- Hero/tentpole content
- Campaign launches
- Content that will be promoted
- Brand-defining content

---

## ARENA ANTI-PATTERNS

### 1. The False Consensus
**Sign:** All 7 personas agree completely
**Problem:** No diversity = no synthesis value
**Fix:** Push personas to differentiate more

### 2. The Dominant Voice
**Sign:** Synthesis is one persona's work with minor edits
**Problem:** Not actually synthesized
**Fix:** Require elements from 4+ personas

### 3. The Frankenpiece
**Sign:** Synthesis feels stitched together, no flow
**Problem:** Mechanical assembly vs. true synthesis
**Fix:** Rewrite transitions, unify voice

### 4. The Rushed Critique
**Sign:** Generic critiques ("good" / "needs work")
**Problem:** No learning, no improvement
**Fix:** Require specific element citations

### 5. The Ignored Consensus
**Sign:** Same weakness noted by 4+ personas, not addressed
**Problem:** Obvious flaw survives
**Fix:** Consensus critiques are mandatory fixes

---

*The Arena is where 7 minds compete so 1 output can win.*
