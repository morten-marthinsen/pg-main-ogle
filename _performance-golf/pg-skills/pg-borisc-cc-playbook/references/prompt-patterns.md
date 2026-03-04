# Prompt Patterns — Boris Coach Reference

> **Parent:** Boris ([BORIS-MASTER-AGENT.md](../BORIS-MASTER-AGENT.md))
> **Used by:** [Boris Coach](../agents/boris-coach.md)
> **Version:** 2.0
> **Last Updated:** 2026-02-06

8 copy-paste prompt patterns from Boris Cherny's methodology. Each pattern includes when to use it, the exact prompt, what Claude should do, and a PG-specific variation.

---

## 1. Plan Mode Entry

**Maps to:** Practice 2 (Plan Mode Discipline)

**When to use:** Any task touching 3+ files. Architecture decisions. Unfamiliar codebases. Any time you'd normally say "wait, let me think about this."

**The prompt:**

```
Enter plan mode. Create a detailed plan for [task].

Consider:
- [Constraint 1]
- [Constraint 2]
- [Any existing patterns to follow]

Don't implement anything until I approve the plan.
```

**Expected behavior:** Claude enters plan mode, reads relevant files, produces a structured plan with steps and file changes, then waits for your approval before writing any code.

**PG variation:**

```
Enter plan mode. Create a detailed plan for adding [feature] to the [project] funnel.

Consider:
- Follow existing component patterns in src/components/
- Reference PG brand guidelines for any UI elements
- No new dependencies without listing them for approval
- Must pass existing test suite

Don't implement until I approve.
```

**When NOT to use:** Single-file edits, tasks you've done before, obvious bug fixes where the path is clear.

---

## 2. The Reviewer Challenge

**Maps to:** Practice 3 (Level Up Your Prompting)

**When to use:** After Claude makes changes and presents them as done. Forces Claude to critically evaluate its own work instead of just saying "looks good."

**The prompt:**

```
Grill me on these changes. Act as a senior engineer reviewing a PR:

1. What could break?
2. What edge cases aren't handled?
3. What assumptions did you make that might be wrong?
4. If you had to bet $1,000 on this code working in production, would you?
```

**Expected behavior:** Claude shifts from "creator defending work" to "critic finding problems." It will often identify issues it glossed over during implementation — missing error handling, edge cases, untested paths.

**PG variation:**

```
Grill me on these changes. Act as a senior engineer reviewing a PR:

1. What could break in production?
2. What happens if the user drops off mid-funnel?
3. Are we handling the Stripe webhook timeout scenario?
4. Does this work on mobile viewports?
5. If you had to bet $1,000 on this working with 10k concurrent users, would you?
```

---

## 3. The Proof Demand

**Maps to:** Practice 3 (Level Up Your Prompting)

**When to use:** When Claude says "this should work" or "I believe this is correct." Requires evidence instead of claims.

**The prompt:**

```
Prove to me this works. Don't tell me it should work — show me:

1. Run the test suite and show the output
2. Trace through the logic with a specific example
3. Show me what happens with edge case: [specific case]
```

**Expected behavior:** Claude runs tests, walks through execution paths with concrete data, and demonstrates correctness rather than asserting it. Often discovers bugs during the proof process.

**PG variation:**

```
Prove to me this quiz flow works. Don't tell me — show me:

1. Run the tests and show passing output
2. Walk through what happens when a user selects "Beginner" on question 3
3. Show me the Domo payload that gets sent on quiz completion
4. What happens if the user closes the browser mid-quiz and comes back?
```

---

## 4. The Elegance Reset

**Maps to:** Practice 3 (Level Up Your Prompting)

**When to use:** When you've been iterating on something and it's gotten messy. When the solution works but feels over-engineered or patched together. When you want a fresh approach informed by everything Claude has learned so far.

**The prompt:**

```
Knowing everything you know now about this problem, scrap this
approach and rebuild from scratch.

What's the simplest, cleanest way to achieve [goal] given what
we've learned? Don't carry forward any baggage from the current
implementation.
```

**Expected behavior:** Claude starts fresh but retains all context about requirements, edge cases, and failed approaches. Often produces a dramatically simpler solution because it now understands the full problem space.

**PG variation:**

```
Knowing everything you know now about this tracking implementation,
scrap it and rebuild from scratch.

What's the simplest way to get accurate funnel step completion data
into Domo, given what we've learned about the Stripe webhook timing
issues? Don't carry forward any of the current workarounds.
```

**Warning:** Only use this when you're genuinely willing to throw away the current approach. Don't use it if you just want minor improvements — that's what the Reviewer Challenge is for.

---

## 5. The Bug Fix Handoff

**Maps to:** Practice 4 (Let Claude Fix Bugs)

**When to use:** When tests fail, CI breaks, or something stops working. Instead of debugging yourself, hand it to Claude with context.

**The prompt:**

```
The [tests/CI/build] are failing. Here's the error output:

[paste error output]

Go fix this. Run the tests after your fix to confirm they pass.
Don't just tell me what to change — make the changes and verify.
```

**Expected behavior:** Claude reads the error, identifies the cause, makes the fix, runs tests, and reports the result. If the first fix doesn't work, it iterates.

**PG variation:**

```
The Vercel deploy is failing. Here's the build error:

[paste error]

Go fix this. After your fix:
1. Run `npm run build` locally to confirm it passes
2. Run `npm test` to make sure nothing else broke
3. Show me the passing output
```

**When to take over:** If Claude fails twice on the same bug, it's likely a conceptual misunderstanding — not a code problem. Step in, explain the root cause, then let it try again with the new understanding.

---

## 6. The Subagent Delegation

**Maps to:** Practice 6 (Use Subagents)

**When to use:** When you have multiple independent tasks that don't depend on each other's output. Subagents work in parallel, reducing total time.

**The prompt:**

```
Use subagents for these independent tasks:

1. [Task 1 — specific, self-contained]
2. [Task 2 — specific, self-contained]
3. [Task 3 — specific, self-contained]

Each task is independent — don't wait for one to finish before starting another.
Report results when all are complete.
```

**Expected behavior:** Claude spawns subagents for each task. They run in parallel. Results are collected and presented together.

**Good subagent tasks:**
- "Search the codebase for all usages of `UserProfile`"
- "Run the test suite and report failures"
- "Analyze these 5 files for the logging pattern"

**Bad subagent tasks:**
- Anything needing your input mid-task
- Tasks that depend on each other's output
- Creative work requiring taste/judgment

**PG variation:**

```
Use subagents for these independent tasks:

1. Search all files in src/components/ for direct DOM manipulation (should use refs instead)
2. List all API routes that don't have error handling
3. Find all TODOs and FIXMEs in the codebase and categorize by severity

Report all results together.
```

---

## 7. The Learning Mode

**Maps to:** Practice 10 (Learn with Claude)

**When to use:** When you're trying to understand a concept, not just get code written. When you want to actually learn something — a new framework, an unfamiliar pattern, a debugging technique — instead of just receiving a solution you can't explain.

**The prompt:**

```
Explain [concept] to me. Use this approach:

1. Start with a simple ASCII diagram showing the key parts
2. Walk through how it works step by step
3. Give me a concrete example using our codebase
4. Then quiz me — ask 3 questions to check my understanding
5. Correct my wrong answers with specific explanations
```

**Expected behavior:** Claude teaches instead of builds. It creates visual diagrams, walks through examples, and actively tests your understanding. The quiz step is critical — it forces retrieval practice, which is how knowledge actually sticks.

**PG variation:**

```
Explain how Stripe webhooks work in our checkout flow. Use this approach:

1. ASCII diagram showing the request flow: user → our server → Stripe → webhook → our handler
2. Walk through what happens when a payment succeeds
3. Walk through what happens when a payment fails
4. Show me where in our codebase each step lives
5. Quiz me on 3 things about webhook reliability and error handling
```

---

## 8. The Backstory Pattern

**Maps to:** Practice 6 (Use Subagents) — Advanced Extension

**When to use:** When you're designing a reusable sub-agent — one that will be invoked repeatedly across sessions, not just run once. The backstory pattern gives the agent an identity narrative, contracts, and decision heuristics that make it consistently reliable.

**The prompt:**

```
Design a sub-agent with the following backstory:

Identity: [WHO — domain expertise + what it does]
Quality bar: [WHY IT CARES — the standard it holds itself to]
Sibling awareness: [HOW IT THINKS — what it doesn't do and who handles those things]

Input contract:
  Required: [what the agent needs to operate]
  Optional: [what improves output]

Output contract:
  Success: [what full completion looks like]
  Partial: [what it delivers when it can only complete part]

Scope boundary:
  Does: [explicit list]
  Does not: [explicit list, with routing to the correct sibling]

Failure modes:
  - [CONDITION] → [ACTION]
```

**Expected behavior:** Claude creates a sub-agent definition with a coherent identity that anchors its scope, a quality bar it can self-evaluate against, and explicit contracts that prevent drift.

**The 5 purposes of a backstory:**

1. **Scope anchoring** — The narrative defines boundaries, reducing drift on ambiguous requests
2. **Quality calibration** — A stated bar gives the agent a standard to evaluate its own output
3. **Decision heuristics** — Rules of thumb guide edge cases without exhaustive logic
4. **Sibling awareness** — Clean routing instead of scope creep
5. **Failure handling** — Explicit condition → action pairs prevent silent failures

**Advisory example (Boris):**

Boris's sub-agents are advisory — each produces output directly for the user. They use conversational contracts and advisory failure language:

```yaml
failure_modes:
  - CLAUDE.md doesn't exist → route to Boris Deploy
  - User wants full rewrite → recommend Boris Deploy for fresh start
```

**Pipeline example (VEDA):**

VEDA's video editing sub-agents are pipeline agents — they pass structured data through a sequential chain. They use typed schemas and pipeline failure language:

```yaml
failure_modes:
  - Invalid asset ID format → HALT with validation error
  - Upstream agent output missing required field → RETRY with error context
```

**When NOT to use:** One-off subagent tasks. If the agent runs once and is done, a 2-sentence brief (basic Pattern 6) is sufficient. Backstories are an investment that pays off over repeated invocations.

---

## Quick Reference Table

| # | Pattern | Trigger Phrase | When to Reach For It |
|---|---------|---------------|---------------------|
| 1 | Plan Mode Entry | "Enter plan mode" | Before complex tasks |
| 2 | Reviewer Challenge | "Grill me on these changes" | After implementation |
| 3 | Proof Demand | "Prove to me this works" | When Claude claims "done" |
| 4 | Elegance Reset | "Scrap this and rebuild" | When the approach feels wrong |
| 5 | Bug Fix Handoff | "Go fix this" | When tests/CI fail |
| 6 | Subagent Delegation | "Use subagents for these" | Multiple independent tasks |
| 7 | Learning Mode | "Explain [X] to me" | When you want to understand, not just use |
| 8 | Backstory Pattern | "Design a sub-agent with..." | When designing reusable sub-agents |
