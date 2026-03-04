# Boris Cherny's 10-Tip Methodology — Deep Reference

> **Parent:** Boris ([BORIS-MASTER-AGENT.md](../BORIS-MASTER-AGENT.md))
> **Version:** 2.0
> **Last Updated:** 2026-02-06
> **Source:** Boris Cherny, "10 Tips for Claude Code" (Anthropic, January 31, 2026)

This is the full reference document for Boris's 10 practices. Each practice includes the original principle, what it means in practice, how it maps to PG's stack, anti-patterns to avoid, and a concrete example.

For the summary table, see [BORIS-MASTER-AGENT.md](../BORIS-MASTER-AGENT.md).
For copy-paste prompts, see [prompt-patterns.md](./prompt-patterns.md).

---

## Practice 1: Invest in Your CLAUDE.md

### The Principle

Your `CLAUDE.md` file is the single highest-leverage artifact in any Claude Code project. Claude reads it at the start of every session. A well-written one eliminates the majority of repeated corrections. A missing or weak one means you re-teach Claude the same lessons every session.

### What This Means in Practice

- **Create CLAUDE.md before your first Claude Code session.** Use the [CLAUDE-MD-TEMPLATE](../templates/CLAUDE-MD-TEMPLATE.md) as your starting point.
- **Let Claude write its own rules.** When Claude makes a mistake and you correct it, end with: *"Update CLAUDE.md so you don't make that mistake again."* Claude adds the rule itself, in language it understands.
- **Prune monthly.** Models improve over time. Rules that were necessary 3 months ago may be unnecessary now. On the first Monday of each month, review CLAUDE.md and remove rules Claude no longer violates. Stale rules waste context tokens.
- **Track improvement.** If you're correcting Claude on the same issue repeatedly, the CLAUDE.md rule for it isn't specific enough. Rewrite it with more detail. If a rule has been there 30+ days without enforcement, Claude has learned it — prune it.

### PG Application

Every PG project should have a CLAUDE.md that includes:
- Project commands (install, test, lint, build, deploy)
- Tech stack and directory structure
- PG brand guidelines reference (`pg-skills/pg-brand-guidelines/`)
- Quality standards reference (`pg-skills/QUALITY-STANDARDS.md`)
- Project-specific non-negotiables (e.g., "All Stripe integration changes must be tested against the sandbox environment before committing")

For PG marketing projects (landing pages, quiz funnels, ad creative): include the funnel structure, CTA conventions, and tracking requirements in the architecture section.

### Anti-Patterns

- **Empty CLAUDE.md.** Having the file but leaving it blank or with placeholder text. Worse than not having one — it signals to Claude that there are no project-specific rules.
- **One-time setup, never updated.** CLAUDE.md is a living document. If it hasn't changed in a month, you're either not correcting Claude (unlikely) or not capturing your corrections.
- **Overly verbose rules.** "Please always ensure that your code follows best practices and is well-documented with comprehensive comments explaining the logic" — Claude ignores this. Instead: "Add JSDoc to all exported functions. No inline comments unless the logic is non-obvious."
- **Rules that contradict each other.** Often happens when two team members add rules at different times. Review for conflicts during monthly pruning.

### Example

A PG quiz funnel project's CLAUDE.md might include:

```markdown
## Common Mistakes to Avoid

- NEVER use `window.location` for navigation in the quiz flow.
  Use the `useQuizNavigation` hook. Direct location changes break
  the progress tracking.

- Stripe webhook handlers MUST be idempotent. Check for duplicate
  event IDs before processing. We've had double-charge issues
  from this.

- Quiz result pages use `getServerSideProps`, not `getStaticProps`.
  Results are dynamic based on user answers.
```

These rules were written by Claude after being corrected. They're specific, actionable, and in language Claude produced itself.

---

## Practice 2: Plan Mode Discipline

### The Principle

Plan Mode forces Claude to think before acting. It reads relevant files, produces a structured plan with steps and file changes, and waits for your approval before writing any code. For complex tasks, this eliminates the "Claude rewrote half my codebase and now nothing works" failure mode.

### What This Means in Practice

- **Use Plan Mode for any task touching 3+ files.** This is the threshold where Claude's decisions start compounding. One bad assumption in a 3-file change can cascade.
- **Use Plan Mode for architecture decisions.** Adding a new service, changing a database schema, restructuring directories — always plan first.
- **Skip Plan Mode for single-file edits, quick fixes, and tasks with an obvious path.** Don't add ceremony where it doesn't help.
- **Review the plan critically.** Plan Mode is only valuable if you actually read the plan and push back on bad ideas. Rubber-stamping defeats the purpose.

### PG Application

PG projects often involve cross-cutting changes — a new quiz question might touch the question config, the results logic, the tracking events, and the A/B test parameters. Plan Mode prevents Claude from making changes to one piece without considering the ripple effects.

For TESS-style data workflows: always use Plan Mode before modifying data processing pipelines. A mistake in the pipeline can corrupt spreadsheet data that takes sessions to fix.

### Anti-Patterns

- **Using Plan Mode for everything.** Simple typo fixes, single-line changes, and obvious bugs don't need a plan. Over-planning slows you down.
- **Approving plans without reading them.** If you're going to rubber-stamp, skip Plan Mode entirely. The value is in the review.
- **Not providing constraints.** "Enter plan mode and refactor the checkout" is too open-ended. "Enter plan mode. Refactor checkout.ts to extract payment logic into a separate service. Don't change the API contract. Don't add new dependencies." gives Claude guardrails.

### Example

```
Enter plan mode. I want to add a new question type ("slider") to the
quiz engine.

Consider:
- The existing question types are defined in src/config/questionTypes.ts
- Each type has a component in src/components/questions/
- Results calculation in src/lib/scoring.ts needs to handle the new type
- Tracking events in src/lib/analytics.ts need a new event shape
- Don't add any new npm packages — use native range input

Show me your plan before making any changes.
```

Claude will read all referenced files, identify the full scope of changes, and present a structured plan. You review, adjust, and approve before any code is written.

---

## Practice 3: Level Up Your Prompting

### The Principle

The quality of Claude's output is almost entirely determined by the quality of your prompt. Three principles separate good prompts from mediocre ones: specificity, examples, and proof demands.

### What This Means in Practice

**1. Be specific about what you want.**

The difference between "add error handling" and "add try/catch blocks to the Stripe payment functions in `checkout.ts`, with user-facing error messages that follow our toast notification pattern in `src/components/Toast.tsx`" is the difference between Claude guessing and Claude knowing.

Specificity means:
- Name the files
- Name the functions
- Name the patterns to follow
- Name the constraints

**2. Provide examples of good output.**

One example communicates more than a paragraph of instructions. If you want Claude to write commit messages in a specific style, show it one. If you want test files to follow a pattern, paste an existing test. Claude pattern-matches from examples faster and more accurately than from descriptions.

**3. Demand proof, not promises.**

"This should work" is not verification. Require Claude to:
- Run the test suite and show output
- Trace through logic with a specific input
- Demonstrate edge case handling
- Show the actual output, not describe what it would be

### PG Application

For PG copywriting tasks: provide example copy from successful campaigns. Don't describe the tone — show the tone. Paste a high-converting headline and say "match this energy and specificity level."

For PG data tasks: specify the exact spreadsheet tab, column range, and expected output format. "Analyze the ad data" loses to "Read the 'Ad Level Tracking' tab, columns A through R, and produce a pivot table showing spend vs. ROAS by Root Angle for active ads only."

### Anti-Patterns

- **Vague requests.** "Make this better" / "Clean this up" / "Add some tests." Claude has to guess what "better" means to you.
- **Accepting "should work" as proof.** Always require verification. "Run the tests and show me the output" costs nothing and catches real bugs.
- **Over-prompting simple tasks.** A 200-word prompt for a one-line change adds friction. Match prompt effort to task complexity.

### Example

**Bad prompt:**
```
Add error handling to the checkout.
```

**Good prompt:**
```
Add try/catch blocks to processPayment() and createSubscription() in
src/services/checkout.ts.

For user-facing errors: use our toast notification pattern from
src/components/Toast.tsx with type="error".

For server-side errors: log to our existing logger at src/lib/logger.ts
with level "error" and include the full error stack.

Follow the error handling pattern already used in src/services/auth.ts
for reference.

Run the checkout test suite after your changes to verify nothing broke.
```

---

## Practice 4: Let Claude Fix Bugs

### The Principle

When tests fail or something breaks, resist the urge to manually debug. Claude has the full codebase context. It wrote the code. It can often diagnose and fix faster than you can read the stack trace — especially for its own mistakes.

### What This Means in Practice

- **Paste the error, hand it back.** Don't analyze the error yourself and then tell Claude what to fix. Give it the raw error and let it work.
- **Require verification.** "Fix this" is not enough. "Fix this and run the tests to confirm they pass" ensures Claude doesn't just move the problem.
- **Know when to take over.** If Claude fails twice on the same bug, it's usually a conceptual misunderstanding, not a code problem. Step in, explain the concept, then let it try again with the new understanding.
- **Let Claude fix Claude.** If Claude introduced a bug in this session, it has the full context of what it changed and why. That context is your biggest debugging advantage.

### PG Application

Common PG debugging scenarios where this pattern shines:
- Stripe webhook failures (Claude can trace the event flow)
- Quiz scoring logic errors (Claude can walk through the scoring algorithm with specific inputs)
- Build failures after dependency updates (Claude can read changelogs and identify breaking changes)
- CSS/layout issues on mobile viewports (screenshot + "fix this" is often enough)

### Anti-Patterns

- **Debugging manually when Claude has context.** If Claude made the change that broke things, it's the best-positioned entity to fix it. Your manual debugging starts from scratch; Claude's starts from full context.
- **Infinite retry loops.** Two failures on the same bug = conceptual gap. Don't let Claude try a third time without new information. Explain what it's missing.
- **Not providing the error output.** "The tests are failing" without the actual error is like calling a mechanic and saying "my car is broken." Paste the full error output.

### Example

```
The Vercel deploy is failing. Here's the build error:

Error: Cannot find module './components/QuizResults'
  at Object.<anonymous> (src/pages/results.tsx:4:1)

The file exists at src/components/quiz/QuizResults.tsx.

Go fix this. After your fix:
1. Run `npm run build` to confirm it passes
2. Run `npm test` to make sure nothing else broke
3. Show me the passing output
```

---

## Practice 5: Create Custom Slash Commands

### The Principle

Slash commands turn repetitive multi-line prompts into one-line invocations. If you type the same prompt (or a close variation) more than twice, it should be a slash command. Commands live as `.md` files in `.claude/commands/` and are available via `/command-name` in any Claude Code session.

### What This Means in Practice

- **Build commands for repetitive tasks.** Code review, tech debt scanning, context export, test generation — anything you do regularly.
- **Commands are prompt templates.** Each `.md` file is a prompt with YAML frontmatter for metadata. When you run `/command-name`, Claude receives the prompt as if you typed it.
- **Start with 2-3 high-value commands.** Don't build 20 commands on day one. Build the ones you'd use daily, then add more as patterns emerge.
- **Commands can reference files.** Use `$FILE` and other variables to make commands context-aware.

### PG Application

High-value commands for PG projects:
- `/codereview` — Reviews code against PG standards, checks brand guideline compliance, flags common PG-specific issues (tracking events missing, funnel flow breaks, etc.)
- `/techdebt` — Scans for technical debt, dead code, missing tests, deprecated patterns. Prioritizes by impact.
- `/context-dump` — Exports current session context in a structured format for handoff to another session or team member.

### Anti-Patterns

- **Commands that are too generic.** `/review` that says "review this code" adds no value over typing it yourself. Commands should encode specific standards and checklists.
- **Commands that never get updated.** As your standards evolve, commands should evolve too. A command with stale quality criteria does more harm than good.
- **Too many commands.** If you can't remember what commands you have, you have too many. 5-8 well-crafted commands beats 20 mediocre ones.

### Example

A `/codereview` command for a PG project might encode:

```yaml
---
name: codereview
description: Review code against PG standards
---
```
```
Review the staged changes against these criteria:

1. PG brand compliance (colors, fonts, tone match brand guidelines)
2. Tracking completeness (every user action has an analytics event)
3. Error handling (all external API calls have try/catch)
4. Mobile responsiveness (no fixed widths, touch targets >= 44px)
5. Accessibility (alt text, ARIA labels, keyboard navigation)
6. Performance (no unnecessary re-renders, images optimized)

For each criterion: PASS, FAIL, or N/A with specific line references.
```

---

## Practice 6: Use Subagents

### The Principle

Subagents let Claude delegate subtasks to parallel workers. They're useful for independent, well-scoped work that doesn't need your input. The key word is **independent** — subagents can't talk to each other or to you mid-task.

### What This Means in Practice

**Good subagent tasks:**
- Searching the codebase for all usages of a function
- Running a test suite and reporting failures
- Analyzing multiple files for a specific pattern
- Gathering information from different parts of the codebase

**Bad subagent tasks:**
- Anything requiring back-and-forth with you
- Tasks that depend on each other's output
- Creative work requiring taste or judgment
- Tasks where you'd want to steer mid-execution

**Decision framework:** If you could hand it to an intern with a clear 2-sentence brief and walk away, it's a subagent task. If you'd need to check in during the work, do it in the main session.

### PG Application

PG-specific subagent tasks:
- "Search all components for hardcoded color values that should use the design system tokens"
- "Find all API routes that are missing rate limiting"
- "List every page that doesn't have Open Graph meta tags"
- "Scan all quiz config files and verify each question has a scoring weight defined"

### Anti-Patterns

- **Delegating everything.** Subagents have limited context compared to your main session. Complex reasoning and creative work should stay in the main session.
- **Subagents that depend on each other.** If Task B needs Task A's output, they can't be subagents. Run A first, then B, or do both in the main session.
- **Vague subagent briefs.** "Look for problems in the codebase" — too broad. "List every file in src/services/ that imports from a deprecated module" — clear and scoped.

### Example

```
Use subagents for these independent tasks:

1. Search src/components/ for any component using inline styles
   instead of our CSS modules pattern. List file and line number.

2. Check all files in src/services/ for API calls that don't have
   timeout configuration. List each one.

3. Find every quiz configuration in src/config/quizzes/ that is
   missing a "resultPageSlug" field.

Report all results when done.
```

### Advanced Pattern: The Sub-Agent Backstory

When sub-agents graduate from one-off tasks to reusable components of your workflow, they benefit from a **backstory** — an identity narrative that anchors scope, calibrates quality, and embeds decision heuristics.

**The 5 functional purposes of a backstory:**

1. **Scope anchoring** — The narrative defines what the agent does and doesn't do, reducing drift on ambiguous requests.
2. **Quality calibration** — A stated quality bar gives the agent a standard to self-evaluate against.
3. **Decision heuristics** — Rules of thumb guide edge-case decisions without exhaustive if/then logic.
4. **Sibling awareness** — Each agent knows its siblings exist, enabling clean routing instead of scope creep.
5. **Failure handling** — Explicit failure modes with actions prevent silent failures.

**When to use backstories vs. not:**

- **Use backstories** for reusable agents that will be invoked repeatedly across sessions. The upfront investment in identity and contracts pays off over dozens of invocations.
- **Skip backstories** for one-off subagent tasks (the basic Pattern 6 delegation). If the agent runs once and is done, a 2-sentence brief is sufficient.

**Sequential vs. parallel orchestration:**

Basic subagent delegation (Pattern 6) runs tasks in parallel — independent workers, no shared state. Advanced systems use **sequential pipelines** where ordered steps pass state from one agent to the next. Pipeline agents need typed contracts (schemas for input/output) because their audience is another agent, not a human. Advisory agents (like Boris's sub-agents) need only conversational contracts because their output goes directly to the user.

**Lightweight contracts for advisory agents:**

```yaml
input_contract:
  required: [what the agent needs]
  optional: [what improves output]
output_contract:
  success: [what full completion looks like]
  partial: [what partial completion delivers]
scope_boundary:
  does: [explicit list]
  does_not: [explicit list, referencing siblings]
failure_modes:
  - [CONDITION] → [ACTION: escalate / route to sibling / degrade gracefully]
```

For pipeline agents, replace conversational descriptions with typed schemas and pipeline-specific failure language (HALT, RETRY, SKIP).

### PG Application

Boris's 4 sub-agents (Deploy, Auditor, Coach, Scorekeeper) are **advisory agents** — each produces output directly for the user and is routed independently based on intent. Their backstories use conversational contracts and advisory failure language ("escalate", "route to sibling").

VEDA's video editing sub-agents are **pipeline agents** — they pass structured data through a sequential chain (naming → compliance → review → export). Their backstories use typed schemas and pipeline failure language ("HALT", "RETRY").

Both patterns extend the same core principle: well-scoped agents with clear boundaries outperform monolithic agents that try to do everything.

---

## Practice 7: Do More in Parallel

### The Principle

Run multiple Claude Code sessions simultaneously on independent tasks. Each session works on its own branch or concern. When all sessions finish, merge the results. This multiplies your throughput without multiplying your effort.

### What This Means in Practice

- **Break work into independent chunks.** Independent means no shared file dependencies. If two tasks edit the same file, they're not independent.
- **One session per concern.** Each session gets a clear, scoped objective.
- **Git worktrees or separate terminals.** Worktrees give the cleanest isolation (each session has its own working directory and branch). Separate terminals in the same repo work but risk merge conflicts.
- **Merge when done.** After all sessions complete, merge branches. Resolve any conflicts (rare if tasks were truly independent).

### PG Application

PG project parallelism example — launching a new quiz funnel:
- **Session 1:** Build the quiz UI components (questions, progress bar, result page)
- **Session 2:** Implement the scoring logic and results generation
- **Session 3:** Set up analytics tracking and Domo integration
- **Session 4:** Write the landing page copy and CTA components

None of these touch the same files. All four can run simultaneously. A task that would take one sequential session 4x as long now runs in ~1x.

### Anti-Patterns

- **Parallelizing dependent work.** If Session 2 needs Session 1's output, they're not parallel — they're sequential. Don't force parallelism where it doesn't fit.
- **Too many parallel sessions.** More than 4-5 concurrent sessions becomes hard to manage. You need to review output from each one. Diminishing returns set in around 3-4.
- **No merge strategy.** Launching 4 parallel sessions without thinking about how you'll merge them leads to conflict resolution pain. Plan the boundaries before you start.

### Example

```
I'm going to run 3 parallel sessions for the checkout redesign:

Session 1 (this terminal): Payment form UI in src/components/checkout/
Session 2 (new terminal): Stripe integration in src/services/stripe/
Session 3 (new terminal): Order confirmation email templates in src/email/

These are independent — no shared files. Each session commits to its
own branch:
- checkout-ui
- checkout-stripe
- checkout-email

I'll merge all three into main when they're done.
```

---

## Practice 8: Optimize Your Terminal & Environment

### The Principle

Your terminal environment directly affects Claude Code's performance. A larger visible area gives Claude more context. Shell integration lets Claude see command output. Statusline shows you token usage. Voice dictation speeds up prompt entry.

### What This Means in Practice

- **Maximize terminal window size.** More visible context = better output. Claude can see more of its own work and your project structure.
- **Enable shell integration.** Lets Claude see the output of commands it runs, enabling better debugging and verification.
- **Use the statusline.** Monitor token usage and session health. Know when you're approaching context limits before Claude starts degrading.
- **Consider voice dictation.** Tools like Whispr Flow with semantic correction make complex prompt entry faster than typing. Especially valuable for long, nuanced prompts.

### PG Application

For PG team members doing data work (TESS-style): a large terminal is critical. Data tables, CSV previews, and spreadsheet output all benefit from maximum visible area. Configure your terminal for at least 200 columns when doing data analysis sessions.

For PG team members doing creative work (copy, landing pages): voice dictation is particularly valuable. Describing the tone, audience, and constraints of a creative brief is faster spoken than typed.

### Anti-Patterns

- **Tiny terminal windows.** Claude in a 80x24 terminal is like reading through a keyhole. It can't see its own output and loses track of longer operations.
- **Ignoring token usage.** Running out of context mid-task without realizing it leads to degraded output. The statusline prevents this.
- **Over-optimizing the environment before using the tool.** Get Tier 1 practices working first. Environment optimization is Tier 3 for a reason — it's refinement, not foundation.

> Detailed setup guide: `references/environment-setup.md` (Phase 4)

---

## Practice 9: Use Claude for Data & Analytics

### The Principle

Claude Code excels at data tasks that traditionally require SQL + spreadsheets + visualization tools combined. It can read CSVs, write queries, produce tables, and interpret results in a single session — no tool-switching.

### What This Means in Practice

- **Feed Claude raw data, ask for analysis.** CSVs, SQL exports, API response dumps — Claude can parse, aggregate, and interpret all of these.
- **Ask for specific outputs.** "Pivot table of spend by channel" is better than "analyze this data."
- **Use Claude for the full pipeline.** Import → clean → analyze → visualize → interpret. Don't break the workflow across tools if Claude can handle the full chain.
- **Verify the math.** Claude occasionally makes arithmetic errors on large datasets. Spot-check key numbers against your source data.

### PG Application

PG data workflows where this practice shines:
- **Ad performance analysis:** Import Domo exports, calculate ROAS by Root Angle, identify top/bottom performers, recommend budget allocation changes. (This is TESS's core workflow.)
- **Funnel metrics:** Parse GA or Domo funnel data, calculate step-by-step drop-off rates, identify the highest-impact optimization point.
- **A/B test interpretation:** Feed Claude the raw test data and ask for statistical significance, confidence intervals, and a recommendation.
- **Revenue attribution:** Cross-reference ad spend data with revenue data to calculate true CAC and LTV by acquisition channel.

### Anti-Patterns

- **Not verifying calculations.** Claude can miscount rows, miscalculate percentages, or silently drop data during aggregation. Always spot-check key figures.
- **Asking for analysis without specifying the output.** "Tell me about this data" produces a vague summary. "Show me the top 10 Root Angles by ROAS with spend > $100, formatted as a table" produces something useful.
- **Using Claude for real-time dashboards.** Claude processes data in sessions, not continuously. For real-time monitoring, use dedicated tools (Domo, GA). Use Claude for the deep analysis those tools can't do easily.

> Detailed patterns: `references/data-analytics-patterns.md` (Phase 4)

---

## Practice 10: Learn with Claude

### The Principle

Claude is a technical mentor, not just a code generator. Use it to understand concepts, not just produce output. The difference between "Claude wrote the code" and "I understand the code Claude wrote" compounds over weeks and months.

### What This Means in Practice

- **Ask for explanations, not just implementations.** When Claude builds something you don't understand, don't just accept it — ask for a walkthrough.
- **Use ASCII diagrams.** Ask Claude to diagram architectures, data flows, and logic paths. Visual representations stick better than text explanations.
- **Request quizzes.** After an explanation, ask Claude to quiz you. Retrieval practice (being tested on what you learned) is the most effective learning technique known. It forces you to recall, not just recognize.
- **Correct misunderstandings immediately.** When you get a quiz answer wrong, ask Claude to explain why. Don't move on without understanding.

### PG Application

Learning scenarios for PG team members:
- Understanding Stripe webhook flows for checkout integration
- Learning how the quiz scoring algorithm works before modifying it
- Understanding the Domo data pipeline architecture before building TESS-style analyses
- Learning Git worktree commands before setting up parallel workflows
- Understanding CSS Grid/Flexbox for responsive landing page layouts

### Anti-Patterns

- **Accepting code you don't understand.** If you can't explain what the code does, you can't debug it when it breaks. And it will break.
- **Skipping the quiz step.** Reading an explanation feels like learning. Being quizzed on it reveals whether you actually learned. Always include the quiz.
- **Learning everything at once.** Focus on one concept per learning session. Deep understanding of one topic beats shallow exposure to five.

### Example

```
Explain how our quiz scoring system works. Use this approach:

1. ASCII diagram showing the data flow from user answer → scoring
   function → result page selection
2. Walk through what happens when a user answers all 5 questions
   with specific example values
3. Show me where in our codebase each step lives (file + function)
4. Quiz me on 3 things about how scores map to result pages
5. Correct my wrong answers with specific explanations
```

---

## How the 10 Practices Build on Each Other

```
Tier 1 (Foundation):
  Practice 1 (CLAUDE.md) ← Everything else depends on this
  Practice 2 (Plan Mode) ← Prevents costly mistakes
  Practice 3 (Prompting) ← Determines output quality
  Practice 4 (Bug Fixing) ← Closes the feedback loop

Tier 2 (Infrastructure):
  Practice 5 (Commands) ← Automates Tier 1 patterns
  Practice 6 (Subagents) ← Multiplies Tier 1 throughput
  Practice 7 (Parallel)  ← Multiplies overall throughput

Tier 3 (Optimization):
  Practice 8 (Environment)  ← Makes Tiers 1-2 faster
  Practice 9 (Data)         ← Extends Claude to new domains
  Practice 10 (Learning)    ← Makes YOU better, not just Claude
```

Each tier builds on the one below it. Deploying Tier 2 without Tier 1 solid means you're automating and parallelizing mediocre prompts. Deploying Tier 3 without Tier 2 means you're optimizing a manual workflow.

**Always start with Tier 1. Always.**
