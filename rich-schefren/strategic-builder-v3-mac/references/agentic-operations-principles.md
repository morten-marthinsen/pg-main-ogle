# Agentic Operations Principles

## For Entrepreneurs Working Daily with AI Agents

---

## What This Is

This document captures operational principles for working effectively with AI agents in daily practice. These are extracted from Peter Steinberger's "Just Talk To It" methodology (developed while building a 300K+ line application entirely with AI agents) and filtered for relevance to strategic entrepreneurs building business systems — not just software.

These principles complement the Strategic Builder Methodology (which covers WHAT to build and HOW to think about it) by addressing HOW TO OPERATE day-to-day with agents once you're building.

**Source:** Peter Steinberger, "Just Talk To It — the no-bs Way of Agentic Engineering" (2025-2026)

---

## Principle 1: Think in Blast Radius, Not Complexity

Before starting any task with an agent, estimate the scope by asking: "How many files/documents will this touch?"

A task that sounds simple ("update the pricing") might touch 15 files. A task that sounds complex ("redesign the onboarding flow") might only touch 3. The number of files affected — the blast radius — is a better predictor of how the work will go than your intuition about difficulty.

**Application:**
- Small blast radius (1-3 files): Give the agent clear direction and let it run
- Medium blast radius (4-10 files): Break into sequential steps, commit between each
- Large blast radius (10+ files): Decompose into multiple independent tasks, potentially run in parallel

**Why this matters for entrepreneurs:** You're not a coder estimating time. You're a strategic builder estimating risk. Blast radius tells you how much can go wrong and how hard it is to recover if it does.

---

## Principle 2: Interrupting Agents Is Standard Practice

Most people treat agent tasks like loading bars — start it, wait for it to finish, hope for the best. This is wrong.

Interrupt agents mid-task the way you'd check in with a team member. Hit escape (or stop the agent), ask "what's the status?" or "what have you done so far?" — and the agent will pick up where it left off. File changes are atomic. Nothing breaks.

**Application:**
- If an agent has been working for more than a few minutes on what should be a quick task, interrupt and check
- If you realize mid-task that the direction is wrong, stop immediately — don't wait for it to finish going the wrong way
- Use interruption as a steering mechanism, not a last resort

**Why this matters for entrepreneurs:** Your time is the constraint, not the agent's. Active steering produces better results than passive waiting. Think of it as managing a team member, not running a script.

---

## Principle 3: Context Tax Is Real — Choose Tools Wisely

Every tool, integration, or MCP server an agent loads consumes context tokens — the finite working memory the agent has for your actual task. Some integrations cost 20-30K tokens just to be available, whether or not they're used.

**The principle:** If a standard command-line tool can do the job, prefer it over an MCP integration. The agent already knows how to use common CLI tools (git, gh, npm, curl, etc.) without any context overhead.

**Application:**
- Before adding an MCP server, ask: "Could the agent just run a CLI command instead?"
- Reserve MCP integrations for tools that genuinely need deep integration (database access, browser automation, specialized APIs)
- When agents feel sluggish or lose track of context, check whether unnecessary integrations are consuming working memory

**Why this matters for entrepreneurs:** Context is your agent's cognitive budget. Every token spent on tool overhead is a token not spent on your actual task. Lean setups produce sharper results.

---

## Principle 4: Screenshots Are Half of Context Engineering

When you need to show an agent what you're looking at — an error, a UI, a document layout, a design — drag a screenshot into the conversation instead of describing it in text.

AI agents are strong visual processors. A screenshot takes 2 seconds and gives the agent exact context. A text description takes 2 minutes and often misses the detail that matters.

**Application:**
- Error messages: screenshot > copy-paste > description
- UI issues: screenshot of what's wrong + screenshot of what you want
- Design references: screenshot of the inspiration
- Document structure: screenshot of the layout you're trying to match

**Target:** Roughly half your interactions with agents should include visual context.

**Why this matters for entrepreneurs:** You think visually about your business. Screenshots let you communicate with agents the same way you'd communicate with a designer or developer — by pointing at things.

---

## Principle 5: Instruction Files Should Evolve From Failures, Not Be Designed Upfront

The most effective agent instruction files (CLAUDE.md, project rules, etc.) are not architected in advance. They grow organically from things that went wrong.

Every time an agent makes a mistake — misunderstands a convention, uses the wrong pattern, breaks a rule you didn't know you had — add a note to the instruction file. Over time, the file becomes a precise map of your specific preferences and your project's quirks.

**Application:**
- Start with a minimal instruction file (project name, key conventions, a few rules)
- When something goes wrong, add a rule addressing it
- Periodically clean up: remove rules the agent has learned to follow naturally, consolidate duplicates
- Expect the file to shrink over time as models improve

**Why this matters for entrepreneurs:** This is the "scar tissue" principle. Your instruction file should reflect real problems you've had, not theoretical problems you might have. Premature over-specification wastes effort and can actually confuse agents.

---

## Principle 6: Better Models Need Shorter Prompts

As AI models improve, they need less hand-holding. A frontier model with strong reasoning will read files, understand context, and infer intent from brief instructions. Older or weaker models need more explicit direction.

**Application:**
- With strong models (Opus, GPT-5): Start with 1-2 sentence instructions. Add detail only if the agent misunderstands.
- With capable models (Sonnet, GPT-4.1): Provide moderate context. Be explicit about constraints and expectations.
- With all models: Let the agent's behavior tell you how much prompting it needs. If it gets it right with less, use less.

**The test:** If you're writing a paragraph of instructions and the agent would have gotten it right from the first sentence, you're over-prompting. Over-prompting can actually degrade output by constraining the agent's natural problem-solving.

**Why this matters for entrepreneurs:** Your instinct may be to write detailed specs for everything. That was right for human teams. For AI agents, it's often counterproductive. Match your prompt length to the model's capability.

---

## Principle 7: Refactoring and Cleanup Are Low-Focus Work

With AI agents, refactoring and code/document cleanup becomes the kind of work you can do when you're tired. The agent does the mechanical work. You provide strategic direction.

**Application:**
- Reserve ~20% of your agent time for maintenance: cleaning up files, removing dead content, reorganizing, improving consistency
- Schedule this for low-energy periods (end of day, post-meeting recovery)
- Queue multiple cleanup tasks and let the agent work through them
- This keeps your system healthy without requiring peak cognitive effort

**Why this matters for entrepreneurs:** You have limited high-focus hours. Spend them on strategic work (architecture, mechanisms, offers, content). Let agents handle the cleanup during your off-peak hours.

---

## Principle 8: Intuition Compounds Faster Than Frameworks

Direct, high-volume interaction with AI agents builds operational intuition that no framework can teach. The skills that matter most — knowing when to interrupt, how much to specify, when to trust the agent, when to steer — develop only through practice.

**The skills that compound:**
- Blast radius estimation (how big is this task really?)
- Stopping timing (when is the agent going off track?)
- Specification calibration (how much detail does this need?)
- Recovery judgment (is it faster to fix or restart?)
- Parallel task management (what can run simultaneously?)

**Application:**
- Prioritize doing over studying. One hour of actual agent work teaches more than five hours of reading about agents.
- When something goes wrong, diagnose why and adjust — don't reach for a new framework
- Your existing management intuition (from leading teams) transfers directly to managing agents

**Why this matters for entrepreneurs:** Frameworks will be commoditized. Models will improve. Tools will converge. What won't be commoditized is your intuition for working with AI — and that only develops through reps.

---

## How These Principles Relate to the Strategic Builder Methodology

| Strategic Builder Methodology | These Principles |
|------------------------------|-----------------|
| WHAT to build (Translation Stack) | HOW to operate while building |
| System thinking (Three Questions) | Session-level working practices |
| Architecture and planning | Execution and steering |
| Document-first approach | Agent-first interaction |

These principles don't replace the Strategic Builder Methodology. They sit underneath it — governing how you actually interact with agents during the daily work of building what the methodology defines.

---

## Anti-Patterns to Avoid

| Anti-Pattern | Better Approach |
|-------------|----------------|
| Writing a full spec before touching the agent | Start with a brief instruction, iterate based on results |
| Waiting for agent to finish before checking | Interrupt and steer actively |
| Adding every possible MCP integration | Start lean, add only what you actually need |
| Designing elaborate instruction files upfront | Let them grow from real failures |
| Writing long prompts for capable models | Start short, add detail only if needed |
| Treating agent work as all-or-nothing | Break into small blast-radius tasks, commit between each |
| Saving all cleanup for a "big refactor day" | Do 20% maintenance continuously during low-energy time |
| Reading about agent workflows instead of using them | Prioritize direct interaction; intuition compounds through practice |

---

*Extracted from Peter Steinberger's "Just Talk To It" methodology*
*Filtered and adapted for strategic entrepreneurs building business systems with AI*
*Original source: steipete.me/posts/just-talk-to-it*
