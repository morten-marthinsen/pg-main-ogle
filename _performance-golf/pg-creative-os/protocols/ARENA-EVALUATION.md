# Creative OS — Arena Evaluation for Neco

**Type:** DECISION DOCUMENT — analysis only, no implementation
**Created:** 2026-03-18
**For:** Christopher Ogle + Donnie French
**Source:** Marketing OS Arena Core Protocol v1.0

---

## What Marketing OS Arena Does

Marketing OS uses a 7-competitor Arena for creative generation in Foundation skills (03-08) and copy skills (10-17):

- **7 personas** compete (copywriter archetypes: Schwartz, Halbert, Ogilvy, etc.)
- **3 rounds:** Independent generation → Head-to-head → Final synthesis
- **Dedicated critic** scores each output against dimensional rubrics
- **Human selects** the winner at each gate checkpoint
- **Output:** Arena-selected hybrid that combines the best elements

The Arena exists because a single generation pass produces "first-thought" output. Competition forces diverse approaches, and the synthesis captures the best of each.

---

## How Neco Currently Generates Creative

Neco uses a different architecture:

- **11 behavioral frameworks** (FATE, Six-Axis, Behavior Compass, PCP, Authority Triangle, etc.) provide psychological depth
- **Layered sub-agents** (Foundation → Creative Execution → Quality) with flexible routing
- **3 human checkpoints** (audience, angle, verification) ensure alignment
- **Hub-and-spoke routing** adapts the pipeline based on task type (hooks vs. scripts vs. briefs)
- **Specimen vault** ($50K quality threshold) grounds output in proven winners
- **HSP/SSP scoring** (Hook Scoring Protocol / Script Scoring Protocol) gates quality

---

## Where Arena Would Add Value

### Hook Generation (Sub-Agent #4)

**Current:** Neco generates hooks through behavioral framework analysis + specimen vault patterns. Single generation pass per framework lens.

**With Arena:** 3-5 hook "competitors" (each using a different behavioral framework as primary lens) generate independently, then a critic scores them on pattern interrupt strength, curiosity gap, and angle coherence. Human picks the winner(s).

**Value:** HIGH. Hook generation benefits most from diverse approaches. The difference between a good hook and a great hook is often a framing that the first-pass approach didn't consider. Arena-style competition would surface more creative angles.

### Angle Ideation (Sub-Agent #3)

**Current:** Multi-perspective analysis through behavioral frameworks, then human selects from recommended angles.

**With Arena:** Similar to current approach — Neco already generates multiple angle candidates. The improvement would be adding structured scoring dimensions (market novelty, emotional depth, proof support, expansion potential) rather than just presenting options.

**Value:** MEDIUM. The multi-perspective approach already generates diverse options. Structured scoring would help, but full Arena may be overkill — the human checkpoint already serves as the selection mechanism.

---

## Where Arena Would NOT Add Value

### Audience Intelligence (Sub-Agent #2)

Audience analysis is analytical, not creative. The "right" audience segments emerge from data, not from competitive generation. Arena would add overhead without improving output.

**Value:** LOW. Keep as-is.

### Script Writing (Sub-Agent #5)

Full scripts need coherence and voice consistency across hundreds of words. Arena competitors writing independent full scripts would produce divergent voices that are hard to synthesize. The current approach (locked angle → single generation with framework depth → quality scoring) produces better coherent output.

**Value:** LOW. Arena works for short-form (hooks, headlines). Long-form benefits more from depth than diversity.

### Quality Validation (Sub-Agent #8)

Validation is binary (pass/fail on factual claims, coherence checks). Competition doesn't apply.

**Value:** NONE. Keep as-is.

---

## Recommendation

**Hybrid approach — adopt Arena for hooks only.**

| Component | Recommendation | Rationale |
|-----------|---------------|-----------|
| Hook Generation | ADOPT Arena (3 competitors, 1 round) | Highest value — diverse approaches surface better hooks |
| Angle Ideation | ADD structured scoring dimensions | Arena-lite — keep multi-perspective but add rubric |
| Script Writing | KEEP current approach | Coherence > diversity for long-form |
| Audience Analysis | KEEP current approach | Analytical, not creative |
| Quality Validation | KEEP current approach | Binary, not competitive |

### Implementation Sketch (if approved)

1. **Hook Arena:** 3 competitors, each assigned a different behavioral framework as primary lens. 1 round. Critic scores on: pattern interrupt (0-10), curiosity gap (0-10), angle coherence (0-10), specimen-vault alignment (0-10). Human selects winners. Estimated overhead: +2-3 minutes per hook batch.

2. **Angle Scoring:** Add 4 scoring dimensions to existing angle ideation output: market novelty, emotional depth, proof support, expansion potential. No Arena — just structured rubric on existing output.

### Decision Required

Christopher and Donnie: approve, modify, or reject this recommendation. If approved, implementation would be a separate Phase in Neco's next session (update Sub-Agent #4 spec + add hook Arena protocol).

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial evaluation. Recommends hybrid: Arena for hooks, structured scoring for angles, keep current for scripts/audience/validation. |
