# Pre-Mortem Protocol — Process Risk Identification

**Version:** 1.0
**Created:** 2026-03-07
**Purpose:** Pre-execution risk assessment for each skill — what could go wrong with THIS execution before it starts
**Sources:** Marc Stockman Quality Engine gap analysis (Tier 2 gap)

---

## Why This Exists

The current system has adversarial risk assessment for copy quality (Arena Critic) but not for process risk. The Critic asks "what's wrong with this output?" The Pre-Mortem asks "what could go wrong with this execution BEFORE it starts?"

---

## When It Fires

Before executing any skill, the model answers 3 questions. This takes 1-2 minutes and is logged but does NOT gate execution.

**Tier applicability:**
- **Full:** Mandatory for all skills
- **Standard:** Mandatory for Foundation skills (00-09), optional for copy skills (10-20)
- **Quick:** Optional (recommended for Foundation skills)

---

## The 3 Questions

### Q1: Failure Mode Prediction
**"What are the 3 most likely failure modes for THIS skill with THIS input?"**

Consider:
- What has gone wrong in past executions of this skill?
- What about THIS specific input makes it harder or unusual?
- Where does this skill's ANTI-DEGRADATION.md list the most common failures?

### Q2: Input Confidence
**"Which upstream inputs am I least confident about?"**

Consider:
- Which upstream packages feel thin or generic?
- Which human review points might have been rushed?
- Is the context reservoir complete and high-quality?
- Are there gaps in the research data for this specific topic?

### Q3: Quality Degradation Prediction
**"If I had to bet on where quality degrades in this execution, where would it be?"**

Consider:
- Which microskills are the most complex?
- Where does context load peak?
- Which output dimensions are hardest for this input?

---

## Pre-Mortem Format

```yaml
pre_mortem:
  skill: "[skill name]"
  timestamp: "[ISO 8601]"
  tier: "[Full|Standard|Quick]"

  failure_modes:
    - mode: "[description]"
      likelihood: "[high|medium|low]"
      mitigation: "[what to watch for during execution]"
    - mode: "[description]"
      likelihood: "[high|medium|low]"
      mitigation: "[what to watch for]"
    - mode: "[description]"
      likelihood: "[high|medium|low]"
      mitigation: "[what to watch for]"

  weakest_inputs:
    - input: "[upstream package or file]"
      concern: "[what's weak about it]"

  predicted_degradation_point:
    location: "[specific microskill or layer]"
    reason: "[why quality might drop here]"
```

---

## Output Location

Logged to the skill's execution log. NOT a separate file — it's part of the execution record.

```markdown
## Pre-Mortem Assessment
[YAML block above]
```

---

## How Results Are Used

1. **Awareness, not enforcement.** The pre-mortem doesn't block execution. It primes the model (and the human reviewer) to watch for specific issues.
2. **MC-CHECK targeting.** If the pre-mortem predicts degradation at a specific microskill, the MC-CHECK at that point should be MORE thorough.
3. **Human review targeting.** If the pre-mortem flags weak inputs, the human can supplement or check those inputs before the skill runs.
4. **Post-execution comparison.** After the skill completes, compare actual outcomes to pre-mortem predictions. Did the predicted failures occur? This builds calibration over time.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — 3-question pre-mortem for process risk identification |
