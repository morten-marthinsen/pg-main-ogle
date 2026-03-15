# Evaluation Instructions

You are conducting a rigorous, multi-phase evaluation of the Quality Engine (QE). Read `QE-System-Map.md` thoroughly before starting. The current version is 3.0.

This evaluation produces standardized, comparable data. Follow the output formats exactly. Do not skip phases unless the evaluator has requested the abbreviated version (Phases 1, 3, and 5 only).

**Safety constraint:** This is a read-only evaluation. Do not create, modify, or delete any files outside this evaluation folder. Do not modify any of the evaluator's existing system files, prompts, or configurations. The only file you create is the final output review file.

## What You're Evaluating

The QE 3.0 is a methodology document — a "building code" for AI quality systems. It describes 15 interconnected mechanisms organized in a 4-layer architecture (Layer 0: Infrastructure & Observability, Layer 1: Behavioral Governance, Layer 2: Production Pipeline, Layer 3: Learning Loop), plus templates, worked examples, and implementation guidance.

The QE is platform-agnostic — it describes what to build and why, not how to implement it on a specific tool.

## Your Lens

Evaluate through the lens of a practitioner who builds and runs AI quality systems daily. Compare everything against this system's own rules, mechanisms, and experience. Be specific. "Looks good" is not useful. "Mechanism #6 doesn't account for X because Y" is useful.

## Output Structure

Your output must start with a Bottom Line, then proceed through 5 phases in order.

## BOTTOM LINE

Complete all 5 phases (Phases 1 through 5) first. Then write this Bottom Line section using the Phase 5A Overall Scorecard as the source of truth for the score and letter grade. Once written, move the Bottom Line section to the top of the document. **The score in the Bottom Line must match the Phase 5A weighted total exactly.**

```
## Bottom Line

**Overall Score:** [X.XX] / 5.00
**Letter Grade:** [A/B/C/D/F]
**One-Line Verdict:** [Single sentence capturing the most important thing about this QE]

**Strongest element:** [1-2 sentences]
**Biggest gap:** [1-2 sentences]
**Highest-value mechanism for our system:** [name the single mechanism that would deliver the most value if adopted]
```

## PHASE 1: STRUCTURAL ANALYSIS (Scored)

Evaluate the QE across 10 dimensions. For each dimension, assign a score from 1-5 using the rubric below, then provide specific evidence.

**Scoring Rubric (use for all scored sections):**

| Score | Label | Definition |
|-------|-------|------------|
| 1 | Critical Gap | Absent or fundamentally broken. Would cause system failure. |
| 2 | Significant Weakness | Present but major gaps or contradictions. Needs substantial rework. |
| 3 | Adequate | Functional. Covers basics but lacks depth or edge case coverage. |
| 4 | Strong | Well-developed, clear thinking, good coverage, minor gaps only. |
| 5 | Exceptional | Best-in-class. Comprehensive, nuanced, battle-tested. |

**The 10 Dimensions:**

**D1. Architectural Coherence** — Do the 4 layers and 15 mechanisms form a coherent system? Are dependencies clear? Any circular dependencies, orphaned mechanisms, or missing connections?

**D2. Failure Mode Coverage** — Does the QE address the real failure modes practitioners encounter? What common AI quality failures aren't addressed?

**D3. Enforcement Realism** — Are the enforcement mechanisms (structural gates, convergence loops, event-driven reminders) realistic to implement? Would they actually work in practice?

**D4. Self-Learning Loop Integrity** — Is the self-learning system (issue logging → pattern detection → rule promotion → structural enforcement) well-designed? Does it actually compound over time?

**D5. Practitioner Accessibility** — Can a skilled AI practitioner (not a developer) read this and implement it? Is the Getting Started path realistic?

**D6. Platform Agnosticism** — Does the QE separate "what to build" from "how to build it"? Would it work on Claude Code, ChatGPT, Gemini, Cursor?

**D7. Measurement and Observability** — Can you measure whether the QE is working? Are the health metrics meaningful and not gameable?

**D8. Scalability Across Task Types** — Does it scale from simple tasks to complex multi-step workflows? Is the task-type decision tree practical?

**D9. Edge Case and Stress Handling** — How does it handle long sessions, context pressure, conflicting rules, user disagreement? Are kill criteria well-designed?

**D10. Completeness vs. Overwhelm** — Right length and depth? Should anything be cut or added? Does the structure help or hinder a first-time reader?

**Output format:**

```
## Phase 1: Structural Analysis

| Dimension | Score (1-5) | Key Evidence |
|-----------|-------------|--------------|
| D1. Architectural Coherence | [score] | [2-3 sentences of specific evidence] |
| D2. Failure Mode Coverage | [score] | [2-3 sentences] |
| D3. Enforcement Realism | [score] | [2-3 sentences] |
| D4. Self-Learning Loop Integrity | [score] | [2-3 sentences] |
| D5. Practitioner Accessibility | [score] | [2-3 sentences] |
| D6. Platform Agnosticism | [score] | [2-3 sentences] |
| D7. Measurement and Observability | [score] | [2-3 sentences] |
| D8. Scalability Across Task Types | [score] | [2-3 sentences] |
| D9. Edge Case and Stress Handling | [score] | [2-3 sentences] |
| D10. Completeness vs. Overwhelm | [score] | [2-3 sentences] |

**Phase 1 Composite Score:** [average of all 10, to 2 decimal places] / 5.00
```

## PHASE 2: DELTA ANALYSIS (Comparative)

**Important:** This phase requires knowledge of your system. Before beginning Phase 2:
- If your system files were added to this folder (e.g., a CLAUDE.md, system prompt, skill library), read them now before proceeding
- If no system files are available, state what you can infer about this system from context, and flag explicitly that the delta is inferred rather than verified

Compare the QE's mechanisms against your system's mechanisms. For every mechanism or principle in the QE, classify it into exactly one category:

**Category A — New to Us:** The QE has something we don't. Explain what it is, why it matters, and implementation effort.

**Category B — Already Covered:** Both systems have it (possibly different names/implementations). Map to your equivalent. Rate: QE Better / Equivalent / Ours Better.

**Category C — We Do It Better:** Same mechanism, but your approach is superior. Explain why. (C items are candidates to contribute back to the QE.)

**Category D — QE Is Weaker:** The QE's version is actively weaker — not just different, but measurably inferior. Only use D when the QE's approach would produce worse outcomes. If approaches are just different, use B with "Ours Better."

**Output format:**

```
## Phase 2: Delta Analysis

### Category A — New to Us (QE has, we don't)
| # | Mechanism/Principle | What It Does | Effort (Low/Med/High) | Priority (1-5) |
|---|--------------------|--------------|-----------------------|----------------|
| A1 | [name] | [description] | [effort] | [priority] |

### Category B — Already Covered (Both have)
| # | QE Mechanism | Our Equivalent | Comparison | Notes |
|---|-----------------|----------------|------------|-------|
| B1 | [name] | [our name] | [QE Better / Equivalent / Ours Better] | [differences] |

### Category C — We Do It Better
| # | QE Mechanism | Our Superior Approach | Why Ours Is Stronger |
|---|-----------------|----------------------|---------------------|
| C1 | [name] | [our approach] | [evidence] |

### Category D — QE Is Weaker
| # | Mechanism | Specific Weakness | How Our Version Addresses It |
|---|-----------|-------------------|----------------------------|
| D1 | [name] | [gap] | [our solution] |

**Delta Summary:**
- New to us (Category A): [count] — High-priority (4-5): [count]
- Already covered (Category B): [count] — QE better: [count], Equivalent: [count], Ours better: [count]
- We do it better (Category C): [count]
- QE is weaker (Category D): [count]
```

## PHASE 3: LIVE TESTING (Empirical)

This is the most important phase. You will actually test the QE's mechanisms — not theorize about them.

**Note on real tasks:** These tests are most valuable when run against actual work from your system. Ideal: run this evaluation inside your existing project where prior session context is available. Acceptable: use deliverable files that were copied into this evaluation folder as test inputs. If no real work is available, note this clearly and run the test on a hypothetical example — but flag the results as theoretical, not live-tested. Theoretical tests should receive "PARTIALLY WORKS" at best in the verdict.

**Select 3 test cases from the menu below.** Choose the 3 that would deliver the most value to your system. For each, execute the mechanism on a real task from your recent work.

**Test Case Menu (pick 3 of 9):**

**T1. Research Gate Test**
Pick a topic you've recently worked on where you made factual claims.
- Step 1: List every factual claim in the work
- Step 2: For each claim, classify the evidence type using the QE's taxonomy: empirical, analytical, practitioner, theoretical, or analogical
- Step 3: For each claim, determine whether it was grounded in a live source or assumed from training data
- Step 4: Count grounded vs. ungrounded claims
- Step 5: For ungrounded claims, assess whether grounding them would have changed the conclusion
Report what the mechanism caught, what it missed, and whether the taxonomy was useful.

**T2. Convergence Loop Test**
Take a recent deliverable (document, analysis, plan) that you consider finished.
- Step 1: Run Pass 1 (Verification) — cross-check every factual claim, number, date against sources
- Step 2: Run Pass 2 (Adversarial) — adopt a hostile skeptic perspective, challenge assumptions, test logic chains, check for internal contradictions
- Step 3: Run Pass 3 (Pre-Mortem) — assume the deliverable failed. Work backward: what caused the failure? What's missing? What could be misunderstood?
- Step 4: Run Pass 4 (Revise) — apply only material changes from Passes 1-3. Count them.
- Step 5: If material changes > 0, loop back to Pass 1. Repeat until a full cycle produces zero material changes.
Report how many loops it took, what each loop caught, and whether the final version was materially better.

**T3. Self-Learning Pipeline Test**
Take a recent mistake or quality failure from your system.
- Step 1: Log the issue using the QE's format: what happened, root cause, fix applied
- Step 2: Assess recurrence potential: could this class of problem happen again?
- Step 3: Map to existing rules: which rule should have prevented this?
- Step 4: Classify the gap: (a) rule is missing, (b) rule exists but incomplete, (c) rule exists but wasn't followed, (d) net-new gap
- Step 5: For (a), (b), or (d): propose a specific patch. For (c): note as execution discipline issue.
Report whether the pipeline produced an actionable patch and whether the classification was useful.

**T4. Kill Criteria Test**
Think of a time your AI system went off the rails — a session that consumed too many resources or should have been stopped.
- Step 1: Define what the kill criteria would have been (using the QE's default thresholds: convergence loop > 3 iterations, time > 2x estimate, quality regression detected)
- Step 2: Walk through the session timeline and mark where each threshold was crossed
- Step 3: Determine the remediation path the QE would have triggered (stop, pivot, simplify, or escalate)
- Step 4: Assess whether the outcome would have been better with the kill criteria active
Report whether the criteria would have caught it, at what point, and whether the thresholds are sensible.

**T5. Event-Driven Reminder Test**
Identify your system's top 3 rules that get violated under context pressure.
- Step 1: For each rule, define a detector using the QE's pattern: trigger condition (specific observable action), reminder text (the rule to inject), linked rule (what it enforces), tier (hard = blocks action, soft = warns)
- Step 2: For each detector, identify the 3 most recent times the rule was violated
- Step 3: For each violation, determine whether the detector would have fired in time to prevent it
- Step 4: Assess false positive risk — would the detector fire on legitimate actions?
Report whether the detectors would have caught the violations and whether the pattern is implementable.

**T6. Task-Type Scaling Test**
Pick 3 different tasks you commonly handle: one simple (< 5 min), one moderate (30-60 min), one complex (multi-hour, multi-step).
- Step 1: For each task, use the QE's task-type decision tree to determine which mechanisms activate
- Step 2: Apply the 3-mechanism floor (Research Gate + Success Criteria + Convergence Loop minimum)
- Step 3: For the simple task: does the floor feel like overhead, or does it actually help?
- Step 4: For the complex task: is anything missing that should activate?
- Step 5: Compare the QE's recommendations against what your system currently does for each task type
Report whether the scaling feels right and what adjustments would be needed.

**T7. Structural Gate Conversion Test**
Identify a behavioral rule in your system that keeps getting violated (3+ times same class of failure).
- Step 1: Name the rule and document its violation history (at least 3 instances)
- Step 2: Define the structural gate: trigger condition (what action precedes the violation), binary check (yes/no verification), block action (what happens on failure), enforcement tier (hard gate, soft gate, or audit-only)
- Step 3: Mentally apply the gate to each historical violation — would it have prevented it?
- Step 4: Assess costs: overhead per check, false positive rate, complexity added to the system
Report whether the gate would prevent the failures and whether the cost is justified.

**T8. Arena Deliberation Test**
Pick a recent strategic decision or high-stakes recommendation your system produced.
- Step 1: Define the question the Arena will evaluate
- Step 2: Run 3 independent perspectives in fresh contexts (no visibility into each other's output):
  - **Strategist** — evaluates against goals, constraints, and long-term impact
  - **Reframer** — challenges the question itself. Is this the right question? What assumptions are embedded?
  - **End User** — evaluates from the perspective of whoever receives or uses the output
- Step 3: Perform the divergence audit: where do the 3 perspectives agree? Where do they disagree? Is disagreement about facts (resolvable) or values (requires human judgment)?
- Step 4: Synthesize a recommendation that accounts for all 3 perspectives
- Step 5: Compare the Arena's recommendation against your system's original output
Report whether the Arena produced a materially different (and better) result, and whether the 3-perspective model is the right set for your domain.

**T9. Competitive Simulation + Arena Chain Test**
This tests the QE's two-stage pipeline: optimize the strategy first (Competitive Simulation), then optimize the execution (Arena Deliberation).
- Step 1: Pick a task where strategic direction matters — something where multiple valid approaches exist
- Step 2: **Competitive Simulation:** Generate 2-3 candidate strategies for the task, each grounded in research and using proven frameworks appropriate to the domain. Run independent evaluations on each candidate, scoring against pre-defined success criteria. Select the strongest strategy. Note: if the judge can't differentiate between candidates, that's a signal your success criteria are too vague — loop back and sharpen them.
- Step 3: **Arena Deliberation on the winner:** Take the winning strategy and run it through the 3-perspective Arena (Strategist, Reframer, End User) to stress-test its execution
- Step 4: Compare the final output against what your system would have produced without this pipeline
Report whether the two-stage pipeline produced a better outcome than direct execution, and whether the sequencing (simulation first, Arena second) is the right order.

**Output format for each test:**

```
## Phase 3: Live Testing

### Test [T#]: [Test Name]
**Task/Context:** [What real task you applied this to — be specific]

**Execution:**
[Walk through each step. Show your work. Include actual findings at each step, not just summaries.]

**Results:**
- What the mechanism caught: [specific findings]
- What it missed: [gaps, if any]
- Surprises: [anything unexpected]

**Verdict:** WORKS / PARTIALLY WORKS / DOESN'T WORK
**Evidence:** [Why you gave this verdict — cite specific examples from the test]
**Adaptation needed:** [What would change for this to work in our system — be specific]
**Value if implemented:** HIGH / MEDIUM / LOW — [1-2 sentence justification]
```

## PHASE 4: STRESS TEST (Adversarial)

Attack the QE. Find where it breaks. For each scenario, reason through what would happen and score the QE's resilience.

**S1. The 100-Tool-Call Session**
A session hits 100+ tool calls. Context compresses. Rules are forgotten. Walk through exactly what happens at tool calls 30, 60, and 100. Where does the system degrade? What fails first?

**S2. The Motivated Faker**
The AI fakes quality steps — produces checkpoint files with thin content, claims verification without doing it, generates plausible but unverified citations. How does the QE detect and prevent this?

**S3. The Rule Explosion**
After 50 sessions of self-learning, the system has 200+ rules. Rules conflict. Compliance overhead exceeds production work. How does the QE prevent this?

**S4. The Cross-Platform Migration**
A practitioner migrates their QE from Claude Code to Cursor (or vice versa). What transfers cleanly? What breaks? What needs rebuilding?

**S5. The Disagreement Spiral**
The AI says the work is good. The practitioner says it's not. The practitioner keeps overriding quality gates. Does the system distinguish legitimate overrides from quality erosion?

**Scoring:**

| Score | Definition |
|-------|------------|
| 1 | Breaks completely. No recovery path. |
| 2 | Degrades badly. Major intervention needed. |
| 3 | Bends but holds. Core mechanisms still function. Some quality loss. |
| 4 | Handles well. Minor degradation. Clear recovery path. |
| 5 | Designed for this. Has specific mechanisms to handle it. |

**Output format:**

```
## Phase 4: Stress Test

| Scenario | Score (1-5) | What Happens | Where It Breaks | What's Missing |
|----------|-------------|-------------|-----------------|----------------|
| S1. 100-Tool-Call Session | [score] | [description] | [failure point] | [gap] |
| S2. Motivated Faker | [score] | [description] | [failure point] | [gap] |
| S3. Rule Explosion | [score] | [description] | [failure point] | [gap] |
| S4. Cross-Platform Migration | [score] | [description] | [failure point] | [gap] |
| S5. Disagreement Spiral | [score] | [description] | [failure point] | [gap] |

**Phase 4 Composite Score:** [average, 2 decimal places] / 5.00
```

## PHASE 5: SYNTHESIS AND RECOMMENDATIONS

**5A. Overall Scorecard**

```
## Phase 5A: Overall Scorecard

| Component | Score | Weight | Weighted Score |
|-----------|-------|--------|----------------|
| Phase 1: Structural Analysis | [composite] / 5.00 | 25% | [calculated] |
| Phase 2: Delta Balance | [see formula] / 5.00 | 15% | [calculated] |
| Phase 3: Live Testing | [avg verdict: WORKS=5, PARTIAL=3, DOESN'T=1] / 5.00 | 35% | [calculated] |
| Phase 4: Stress Test | [composite] / 5.00 | 25% | [calculated] |

**Delta Balance Formula:** 3.00 + (0.25 x high-priority A items) - (0.25 x D items), clamped to 1.00-5.00.

**OVERALL SCORE: [weighted total] / 5.00**

**Letter Grade:**
- 4.50-5.00 = A (Exceptional — adopt as-is)
- 4.00-4.49 = B (Strong — adopt with targeted improvements)
- 3.00-3.99 = C (Adequate — significant adaptation needed)
- 2.00-2.99 = D (Weak — fundamental rework before adoption)
- 1.00-1.99 = F (Not viable — start over)
```

**Abbreviated version scorecard (Phases 1, 3, 5 only):** If Phases 2 and 4 were skipped, use this rescaled weighting instead:

```
| Component | Score | Weight | Weighted Score |
|-----------|-------|--------|----------------|
| Phase 1: Structural Analysis | [composite] / 5.00 | 40% | [calculated] |
| Phase 3: Live Testing | [avg verdict: WORKS=5, PARTIAL=3, DOESN'T=1] / 5.00 | 60% | [calculated] |

**OVERALL SCORE: [weighted total] / 5.00**
```

Use the same letter grade scale. Note in the output that Phases 2 and 4 were skipped and the score reflects Phases 1 and 3 only.

**5B. Top 5 Highest-Value Items**

```
| Rank | Item | Source Phase | What To Do (specific action) | Effort | Expected Impact |
|------|------|--------------|-----------------------------|--------|-----------------|
| 1 | [item] | [phase] | [action] | [Low/Med/High] | [description] |
```

**5C. Top 5 Gaps to Report Back**

```
| Rank | Gap | Why It Matters | Specific Recommendation |
|------|-----|---------------|------------------------|
| 1 | [gap] | [impact] | [fix] |
```

**5C Extended (optional):** If your analysis produced more than 5 significant gaps, list additional findings here using the same Phase 5C format. Label this section "Phase 5C Extended: Additional Findings." This section is optional and will not affect the standardized scorecard. It is for Marc's use in identifying patterns across evaluators.

**5D. Cross-System Intelligence**

What does your system know or do that the QE doesn't capture? These are building blocks to contribute back.

```
| # | Building Block from Our System | What It Does | Why the QE Should Consider It |
|---|-------------------------------|-------------|-------------------------------|
| 1 | [name] | [description] | [rationale] |
```

## IMPORTANT: Output File Format

Your complete output should be a single markdown document starting with the Bottom Line section, then Phases 1-5 in order. Save it as:

`[EvaluatorName]-QE-3.0-Review-R1-YYYY-MM-DD.md`
