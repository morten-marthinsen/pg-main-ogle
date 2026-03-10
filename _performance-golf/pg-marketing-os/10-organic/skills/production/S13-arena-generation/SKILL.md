---
name: arena-generation
description: >-
  Seven-persona adversarial Arena competition for organic content quality control.
  Use when any production content (scripts, captions, carousels, threads) needs
  to be stress-tested through the Arena before finalization. Runs 7 specialized
  personas through 3 competitive rounds to produce a synthesized output that
  incorporates the best elements from all perspectives. This is mandatory for
  all production content before final assembly (S14). Trigger when users mention
  Arena, content competition, quality testing, adversarial review, or stress-
  testing content drafts. Requires Campaign Brief File (CBF) plus a content
  draft from S08-S12.
---

# S13: ARENA GENERATION
## 7 Personas × 3 Rounds for Any Content
## Gate: G07 (Requires S07 CBF) | Output: Arena Synthesis

---

## PURPOSE

This skill runs the full Arena competition on any content piece. It is MANDATORY for all production content before final assembly.

**Output:** Arena Synthesis (synthesized content + competition log)
**Requires:** Campaign Brief File (CBF) + Content Draft
**Process:** 7 Personas × 3 Rounds → Final Synthesis

## ANTI-DEGRADATION

- Read `S13-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `~system/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## REQUIRED CONTEXT

### Files to Load
- Campaign Brief: `outputs/[campaign]-CBF.yaml`
- All 7 Persona files from `arena/personas/`
- Arena Protocol: `arena/arena-protocol.md`
- Relevant specimens for content type

### Content to Compete
The Arena accepts any content type:
- Video scripts (from S08)
- Captions (from S09)
- Carousels (from S10)
- Threads (from S11)
- Any content piece requiring synthesis

---

## ARENA EXECUTION

### Phase 1: Brief Distribution

Prepare the Arena Brief for all personas:

```yaml
arena_brief:
  content_type: [Script/Caption/Carousel/Thread/etc.]
  platform: [Target platform]
  function: [Awareness/Engagement/Conversion/Community]
  campaign_reference: [CBF name]

  audience_context:
    segment: [From AIF via CBF]
    key_pain: [From AIF]
    key_desire: [From AIF]
    language_notes: [Key vocabulary]

  voice_context:
    tone: [From BVF via CBF]
    energy: [Level]
    avoid: [Anti-voice notes]

  content_request:
    topic: [What this content is about]
    key_message: [Core message to deliver]
    desired_action: [What we want]
    constraints: [Length, format, etc.]

  hook_options: [From HLF]
```

### Phase 2: Independent Generation (Round 1)

Each persona generates their approach independently:

```yaml
# Per Persona Output - Round 1
persona: "[Name]"
round: 1

strategic_rationale: |
  [2-3 sentences on why this approach from persona's philosophy]

hook:
  text: "[Exact hook text]"
  type: "[From hook taxonomy]"
  why_chosen: "[Strategic reasoning]"

structure:
  opening: "[Description]"
  body: "[How content flows]"
  close: "[How it ends]"

full_draft: |
  [Complete content piece as this persona would execute]

predicted_performance:
  virality_score_estimate: [0-100]
  primary_strength: "[What this does well]"
  known_weakness: "[Where this falls short]"
```

### Phase 3: Adversarial Critique (Round 1)

Each persona critiques all 6 others:

```yaml
# Per Critique
critic: "[Persona Name]"
target: "[Persona Name]"
round: 1

strengths:
  - element: "[Specific element that works]"
    why_strong: "[Reasoning]"
  - element: "[Specific element]"
    why_strong: "[Reasoning]"

weaknesses:
  - element: "[Specific element that fails]"
    why_weak: "[Reasoning]"
    suggested_fix: "[How to improve]"
  - element: "[Specific element]"
    why_weak: "[Reasoning]"
    suggested_fix: "[How to improve]"

stealing_for_round_2:
  - "[Element I'm incorporating into my revision]"
```

### Phase 4: Revision (Round 2)

Each persona revises based on critiques:

```yaml
# Per Persona - Round 2
persona: "[Name]"
round: 2

critiques_addressed:
  - critique: "[Specific critique]"
    source: "[Who made it]"
    change_made: "[How I addressed it]"
  - critique: "[Specific critique]"
    source: "[Who made it]"
    change_made: "[How I addressed it]"

elements_incorporated:
  - element: "[What I added]"
    from_persona: "[Who I took it from]"
    how_integrated: "[How I made it mine]"

revised_draft: |
  [Complete revised content piece]

improvement_notes: |
  [What's better and why]
```

### Phase 5: Adversarial Critique (Round 2)

Focus on synthesis opportunities:

```yaml
# Per Critique - Round 2
critic: "[Persona Name]"
target: "[Persona Name]"
round: 2

synthesis_candidates:
  - element: "[Must-include element]"
    why_essential: "[Reasoning]"
    combines_with: "[Element from another persona]"

remaining_gaps:
  - gap: "[What's still missing]"
    importance: "[Critical/Moderate/Minor]"

convergence_observed: |
  [Where this output now aligns with others]

final_recommendation:
  include_in_synthesis: "[Yes/Partially/No]"
  reasoning: "[Why]"
```

### Phase 6: Final Synthesis

Extract best elements, assemble final piece:

```yaml
synthesis:
  winning_hook:
    selected: "[Exact hook]"
    source_persona: "[Name]"
    source_round: [1 or 2]
    selection_reasoning: "[Why this hook won]"

  winning_structure:
    selected: "[Structure description]"
    source_persona: "[Name or combination]"
    selection_reasoning: "[Why]"

  winning_moments:
    - moment: "[Specific line/section]"
      source_persona: "[Name]"
      source_round: [1 or 2]
      placement: "[Where in final piece]"
    - moment: "[Specific line/section]"
      source_persona: "[Name]"
      source_round: [1 or 2]
      placement: "[Where in final piece]"

  winning_cta:
    selected: "[Exact CTA]"
    source_persona: "[Name]"
    selection_reasoning: "[Why]"

  rejected_elements:
    - element: "[What didn't make it]"
      source_persona: "[Name]"
      reason_rejected: "[Why]"

synthesized_draft: |
  [COMPLETE FINAL CONTENT PIECE]
```

---

## ARENA OUTPUT FORMAT

```markdown
# ARENA SYNTHESIS: [Content Title]

## Competition Summary
- **Content Type:** [Type]
- **Platform:** [Platform]
- **Function:** [Function]
- **Total Submissions:** 14 (7 personas × 2 rounds)
- **Critiques Generated:** 84 (42 per round)
- **Synthesis Difficulty:** [Easy/Medium/Hard]

---

## Winning Elements

| Component | Winner | Round | Rationale |
|-----------|--------|-------|-----------|
| Hook | [Persona] | [1/2] | [Why] |
| Structure | [Persona] | [1/2] | [Why] |
| Key Line 1 | [Persona] | [1/2] | [Why] |
| Key Line 2 | [Persona] | [1/2] | [Why] |
| CTA | [Persona] | [1/2] | [Why] |

---

## Rejected Elements

| Element | Source | Reason |
|---------|--------|--------|
| [X] | [Persona] | [Why rejected] |
| [X] | [Persona] | [Why rejected] |

---

## Final Synthesized Content

[THE ACTUAL CONTENT PIECE - COMPLETE AND READY FOR S14]

---

## Virality Score

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| EA: Emotional Activation | X/10 | [Why] |
| SC: Social Currency | X/10 | [Why] |
| PI: Pattern Interrupt | X/10 | [Why] |
| PF: Platform Fit | X/10 | [Why] |
| SH: Shareability | X/10 | [Why] |
| **TOTAL** | **XX/100** | |

---

## Arena Meta-Notes

**Strongest Persona for This Brief:**
[Name] — [Why they led]

**Most Valuable Critique:**
[Specific critique that most improved the output]

**Key Synthesis Insight:**
[What emerged from competition that no single approach would have produced]

**Pattern for Future:**
[What we learned that applies to similar content]

---

## Competition Log
[Full log of all submissions and critiques available in artifacts/]
```

---

## QUICK MODE

For time-sensitive content:

1. Select 3 most relevant personas
2. Single generation round
3. Brief critique exchange
4. Rapid synthesis
5. Time limit: 10 minutes

**Use for:** Trend responses, lower-stakes content
**Never use for:** Hero content, launches, promoted content

---

## VALIDATION

Arena output valid when:
- [ ] All 7 personas generated Round 1
- [ ] All 42 Round 1 critiques complete
- [ ] All 7 personas generated Round 2
- [ ] All 42 Round 2 critiques complete
- [ ] Synthesis includes elements from 3+ personas
- [ ] Virality Score calculated
- [ ] Score ≥ 60 (or ≥ minimum from CBF)

---

## OUTPUT LOCATION

Save to:
```
skills/production/S13-arena-generation/outputs/[campaign]-[content-id]-arena.md
```

---

*The Arena is where 7 minds compete so 1 output can win.*
