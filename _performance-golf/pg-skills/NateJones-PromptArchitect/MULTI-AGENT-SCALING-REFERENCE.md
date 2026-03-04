# MULTI-AGENT SCALING REFERENCE
*Full Source Material: Nate Jones — "Scale with Simplicity" (January 2026)*

> **Version:** 1.0
> **Source:** Nate Jones Newsletter — Multi-Agent Scaling Architecture
> **Date Added:** 2026-01-27
> **Referenced By:** ARCHITECTURE-PRD.md §5.6-5.10, MASTER-AGENT.md Mode 4 (ARCHITECT), QUALITY-STANDARDS.md §1.5
> **Purpose:** Verbatim preservation of the complete article, all 8 diagnostic prompts, the single-session guide, and the sequence map. This is the reference material that any skill or audit process can call upon when evaluating or designing multi-agent architectures.

---

## HOW TO USE THIS DOCUMENT

This reference document serves three functions:

1. **Source of Truth** — The complete, unedited intellectual framework for multi-agent scaling architecture. When ARCHITECTURE-PRD.md §5.6-5.10 references principles, this document contains the full context, research citations, and reasoning.

2. **Prompt Library** — The 8 diagnostic prompts (Part 2) are callable artifacts. Mode 4 (ARCHITECT) in MASTER-AGENT.md orchestrates their execution. Individual prompts can also be used standalone for targeted diagnostics.

3. **Guided Workflow** — The single-session guide (Part 3) is a complete, self-contained conversation template that produces an 8-section multi-agent architecture document in 30-60 minutes.

---

# PART 1: THE ARTICLE

## The Scaling Problem the Frameworks Don't Warn About

A December 2025 study from Google and MIT found something I wasn't expecting: adding more agents to a system can make it perform worse. Not diminishing returns—actual degradation. The researchers documented configurations where more agents produced worse outcomes than fewer—a finding that directly challenges the field's working assumption that adding agents means adding capability.

I'd been operating on that assumption. The whole pitch for multi-agent systems is parallelism: more workers grinding on your problem means faster results. That's how compute has always worked. But agents aren't GPUs. They're entities that need to coordinate, and coordination creates overhead that grows faster than capability. Past some threshold, most of your agents are effectively standing in line.

What got me digging deeper was noticing that the teams who've actually scaled past the prototype phase—Cursor running hundreds of agents on week-long autonomous coding, Steve Yegge orchestrating 20-30 simultaneously in Gas Town—weren't comparing notes. They solved the same problem independently and landed on the same counterintuitive patterns. That kind of convergence usually means something real is going on underneath.

So I spent a couple weeks sorting through what they actually built versus what the frameworks recommend. The gap is uncomfortable. The industry consensus says agents should collaborate like human teams, share context, coordinate dynamically, operate continuously. The architectures that actually scale do almost none of that. They look too simple to work—until you understand why simplicity is the point.

## The Consensus That Works—Until It Doesn't

The agentic AI community has converged on design principles that feel like settled wisdom. If you've read the framework documentation or watched the conference talks, you've heard these ideas repeated until they seem obviously true.

Multiple specialized agents should collaborate, interacting and delegating in patterns that mimic human teams. Agents should integrate as many tools as possible to extend their capabilities. They should operate continuously, accumulating context over long periods as they learn the codebase or the problem domain. They should be autonomous enough to set their own sub-goals without needing explicit instructions for every step. And you should be able to scale by adding more agents—parallelism should translate to throughput.

Here's the thing: these principles actually work. At small scale. With three to five agents running for an hour, you'll see the vision realized. The agents coordinate, the work gets done, and you think you've figured it out.

They fail at large scale, in ways the frameworks don't warn you about. The pattern across every failure mode is the same: intuitive implementations create serial dependencies between agents. A serial dependency is any point where one agent's work blocks another's—waiting for a lock, checking shared state, coordinating on who handles what. At small scale, you don't notice the overhead. At large scale, it dominates. Enough serial dependencies and your parallelism collapses. You're paying for a hundred agents but getting the throughput of five.

The rules that actually scale are the ones that eliminate serial dependencies. They look almost too simple compared to the sophisticated architectures that seem like they should work better. But they're what the teams running hundreds of agents actually use, and they didn't arrive at these patterns because they're philosophically committed to simplicity. They arrived here because everything else failed when they tried to scale.

## Rule 1: Two Tiers, Not Teams

The consensus says agents should collaborate like human teams—interacting, delegating, debating, reaching consensus.

Cursor tested this directly. They gave agents equal status and let them coordinate through a shared file—each agent checking what others were doing, claiming tasks, updating status. Locking mechanisms prevented conflicts.

It failed in ways that matter. Agents held locks too long or forgot to release them. Even when locking worked, it became a bottleneck—most time was spent waiting. In Cursor's tests, twenty agents slowed to the effective throughput of two or three. They tried simpler concurrency control, but the deeper problems persisted.

The unexpected failure mode was behavioral. With no hierarchy, agents became risk-averse. They gravitated toward small, safe changes. Hard problems sat unclaimed because claiming meant taking responsibility for potential failure while other agents racked up easy wins. Work churned without progress. The diffuse responsibility that was supposed to enable autonomy instead meant nobody took responsibility for anything that mattered.

The "team dynamics" metaphor imports human coordination patterns that are inherently serial. Meetings are synchronization points where everyone waits for everyone else. Status updates create read-after-write dependencies. Shared documents require conflict resolution. These mechanisms work for humans because human work is slow enough that coordination overhead is a small fraction of total effort, and because humans are good at the informal negotiation that resolves ambiguity without explicit protocols. For agents operating at machine speed on tasks that take seconds rather than hours, the coordination overhead dominates.

**The rule:** Strict two-tier hierarchy. Planners create tasks, workers execute them, a judge evaluates results. Workers don't coordinate with each other—they don't even know other workers exist. Each picks up a task, executes in isolation, pushes changes, terminates. Git handles conflicts after the fact.

Yegge arrived at the same structure independently with Gas Town. His "polecats" are ephemeral workers that spin up, execute a task, hand it to the Merge Queue, and get fully decommissioned. They don't coordinate with other polecats. The Mayor and Deacon sit above them, creating and assigning work. The architecture emerged from four failed orchestrators, each teaching him what didn't work until he converged on what did. Four complete failures is a lot of tuition, but the lesson was clear: peer coordination doesn't scale.

Practitioner experience points in the same direction. Flat systems maximize serial dependencies. Deep hierarchies—three levels or more—accumulate drift as objectives mutate through delegation layers; by the time instructions reach the bottom, they may bear little resemblance to what the top level intended. Two tiers is the minimum structure that enables coordination while preserving parallelism.

## Rule 2: Workers Stay Ignorant

The consensus says agents should understand context and adapt to overall goals. Smarter, more aware agents should produce better results.

The opposite is true. Workers perform better when deliberately kept ignorant of the big picture.

When Cursor's workers understood broader project context, they experienced scope creep. They'd decide adjacent tasks needed doing, or reinterpret assignments based on their understanding of goals. Each decision potentially conflicted with other workers, and resolving conflicts required coordination—serial dependencies.

A worker that only knows "implement this specific function" can't decide to refactor the whole module. The narrow scope eliminates coordination needs and enables parallel execution.

Yegge's polecats work identically. They receive a task, execute it, terminate. No knowledge of other polecats. No context about project direction. Planning happens at the Mayor level; polecats just grind.

**The rule:** Minimum viable context. Workers receive exactly enough to complete their assigned task, no more. Enforce this through information hiding, not instructions workers might override.

## Rule 3: No Shared State

The consensus says parallel agents should share state to stay coordinated. The Google-MIT study found the opposite: in tool-heavy environments, multi-agent systems paid massive coordination taxes. Tools become shared state. Multiple agents accessing the same resources create contention. Contention requires coordination. Coordination creates serial dependencies.

The same dynamic applies to context. The assumption that more tools mean more capability drives the MCP ecosystem, where developers connect dozens of integration servers. But in practice, many teams report tool selection accuracy degrading as catalogs grow beyond a few dozen options—though the exact threshold varies by architecture and retrieval approach. The problem isn't fitting tools into the context window; it's that selection accuracy drops when agents face too many options. This is a serial dependency with the tool catalog itself.

**The rule:** Workers operate in complete isolation. No shared state, no communication, no awareness of each other. Keep tool sets small—three to five core tools always available, others discoverable on demand through progressive disclosure. Coordination happens through external mechanisms designed for concurrent access—git for code, task queues for assignment, test suites for validation.

This creates a downstream problem: isolated workers pushing changes that need merging. Both Cursor and Gas Town discovered you need dedicated infrastructure for this. Gas Town has the Refinery—an agent responsible for merging all changes, one at a time, to main. The Refinery exists because workers don't coordinate; something has to reconcile their outputs. The complexity of merging moves out of workers and into a dedicated system that handles it as a queue.

## Rule 4: Plan for Endings

The consensus says agents should operate continuously, accumulating context over long periods. Long context windows enable this; memory systems extend it further. The vision is an agent that builds up understanding over hours or days, becoming more effective as it learns.

But context accumulation creates a serial dependency with the agent's own past. As histories grow, context fills with information that may no longer be relevant. The agent doesn't forget—it stops prioritizing correctly because signal dilutes in noise. Researchers call this "context pollution." It contributes to drift—progressive degradation of behavior and decision quality that emerging research suggests affects a meaningful fraction of long-running agents, though the dynamics are still being mapped.

The problem isn't just that context windows fill up. Even when there's technically room, the agent's attention gets diluted across accumulated history. The "lost in the middle" phenomenon—where models lose track of information in the middle of long contexts—persists even with massive context windows. An agent that's been running for hours has accumulated so much context that it struggles to prioritize what matters now.

Cursor found drift unavoidable during continuous operation. Quality degraded within hours, regardless of context window size. Specifications would mutate as agents misremembered or misinterpreted earlier decisions. The system would gradually lose coherence.

Yegge built this directly into Gas Town with GUPP—the "Gastown Universal Propulsion Principle." It exists because "the biggest problem with Claude Code is it ends. The context window fills up, and it runs out of steam, and stops."

Rather than fighting this, Gas Town treats endings as a design parameter. Sessions are ephemeral cattle. Work is expressed as "molecules"—chains of tasks stored externally. When an agent ends, the next session picks up by reading the molecule state. "If the workflow is captured as a molecule, then it survives agent crashes, compactions, restarts, and interruptions."

This is what Yegge calls "Nondeterministic Idempotence"—the path is unpredictable, but the outcome is guaranteed because workflow state lives outside any agent's context. The agent might crash, restart, make mistakes and correct them. Doesn't matter. The molecule tracks progress, and the next session continues from where the last one stopped.

**The rule:** Episodic operation with planned resets. Each cycle runs for a bounded period, captures results to external storage, terminates. Next cycle starts fresh with clean context. External memory—vector databases, structured logs, state files—provides reference points immune to drift. The question isn't whether agents will end—it's whether your architecture treats endings as failures to prevent or natural boundaries to design around.

## Rule 5: Prompts Over Infrastructure

The consensus says coordination infrastructure is where the hard engineering happens—message passing, state management, error handling.

Cursor found that "a surprising amount of behavior comes down to how we prompt the agents." Infrastructure matters, but prompts matter more.

Sophisticated coordination infrastructure often adds serial dependencies rather than removing them. Message queues serialize access to shared resources. State synchronization requires agents to agree on what exists before proceeding. Good prompts reduce coordination needs. An agent that clearly understands its role, boundaries, and success criteria doesn't need to check with other agents. It just executes.

A March 2025 study analyzing over 1,600 execution traces across seven multi-agent frameworks found that system design problems (44%) and inter-agent misalignment (32%) together account for over three-quarters of all breakdowns—with task verification issues making up most of the rest. The crashes, race conditions, and performance problems that engineers obsess over? A small fraction of what actually goes wrong. Systems don't fail because the code is wrong. They fail because the design created serial dependencies, or specifications were ambiguous enough that agents did wrong things while functioning correctly.

**The rule:** Treat prompts like API contracts, not prose documentation. Invest more in clear specifications than sophisticated coordination mechanisms. When systems underperform, remove components before adding them.

## Rule 6: Tests as Architecture

There's a question the previous rules leave unanswered: if workers don't coordinate with each other, how do they stay aligned? How does the system catch errors before they compound?

The consensus treats test suites as validation—a way to check whether work is correct after it's done. But tests serve a deeper architectural function that matters specifically for multi-agent systems: they provide coordination without creating dependencies between agents.

Cursor chose to build a browser specifically because web standards provide extensive conformance test suites. When a worker's changes break tests, the worker discovers this by running the tests—not by asking other agents whether anything went wrong, not by checking with a coordinator, not by reviewing what others have done. Multiple workers can consult the test suite independently without creating any dependencies between them. The tests coordinate without serializing.

Without test suites, agents either need external judges evaluating every decision—which creates serial dependencies on the judge—or they accumulate errors silently because nothing tells them when they've drifted from the specification. The agent doesn't know it picked the wrong approach. Errors compound until recovery becomes impossible.

**The rule:** Design work around domains with testable correctness. Tasks with clear conformance criteria—building against specifications, migrating between frameworks, implementing well-defined interfaces—are tractable in ways that open-ended tasks aren't. If you don't have test suites, you need shorter feedback loops and more human oversight. The tests become an architectural element that enables parallel work by providing shared ground truth without shared state.

## Where Complexity Actually Belongs

There's an apparent contradiction here. I keep saying simplicity scales, but Gas Town is complex. Seven worker roles. Patrols and molecules and wisps and convoys. A Deacon with Dogs. Yegge himself says it "looks like Kubernetes mated with Temporal and had a very ugly baby."

The resolution: complexity can live in agents or in the orchestration layer that keeps simple agents running. These have very different scaling properties.

**Complexity in agents creates serial dependencies.** An agent that coordinates with others, maintains shared state, understands the big picture—that agent is entangled with everything else. Adding more such agents adds more entanglement. The system becomes harder to parallelize, not easier.

**Complexity in orchestration enables parallelism.** Gas Town has a Witness watching polecats because someone needs to notice when workers get stuck—but polecats stay simple. It has a Refinery because isolated workers create merge conflicts—but workers don't know about each other. It has GUPP and nudges and Boot the Dog because agents end—but each session is disposable.

The orchestration complexity exists because the agents are simple. Simple agents need external systems to keep them running (they stop), feed them work (they don't plan), merge their outputs (they don't coordinate), track progress (they don't remember).

This is the inverse of where most teams put complexity. The intuition is to make agents smarter, more capable, more autonomous—push intelligence into the workers. But that creates serial dependencies. The architecture that scales pushes coordination up into external systems and keeps workers dumb.

Yegge's Kubernetes comparison is apt: "Both systems coordinate unreliable workers toward a goal." Both have a control plane watching over execution nodes, each with a local agent monitoring ephemeral workers. But "Kubernetes asks 'Is it running?' while Gas Town asks 'Is it done?'" Workers are cattle either way. Intelligence lives in the systems that herd them.

The implication for 2026 is that the investment should go into orchestration, not agent sophistication. Build systems that can feed, monitor, and merge the outputs of many simple workers. Don't build elaborate agents that need to understand the world to function.

## What This Means for 2026

The teams that win this year will be the ones who can absorb compute—who can add agents and get proportional throughput gains instead of coordination collapse.

**The architecture that scales:**

- Two tiers. Planners and workers, clean separation. Never deeper.
- Isolated workers. No shared state, no communication. Workers don't know each other exist.
- External orchestration. Complexity in systems that feed, monitor, and merge worker outputs.
- Episodic operation. State lives outside agent context. Plan for endings, don't fight them.
- Prompts over infrastructure. Clear specifications beat sophisticated coordination.
- Small tool sets. Three to five core tools, others on demand.
- Test suites as coordination. Shared ground truth without shared state.

Cursor now runs systems producing over a million lines of code autonomously in sustained experiments. Gas Town, just seventeen days old, lets Yegge "use 20-30 agents at once, productively, on a sustained basis." Different teams, different systems, same principles—discovered independently through experimentation.

For technical teams: The Gartner 40% will come from those who built what the frameworks recommended: rich coordination, continuous operation, sophisticated inter-agent communication. They'll scale up, hit coordination ceilings, and conclude agentic AI doesn't work for their use case. They'll be wrong about the cause. The problem won't be the models or the compute—it'll be an architecture that created serial dependencies faster than it created capability.

For executives and strategists: When you're evaluating AI vendors or internal projects, ask how they handle coordination at scale. If the answer involves agents "collaborating like teams" or "sharing context dynamically," you're looking at an architecture that works in demos but breaks in production. The teams that understand these dynamics will dramatically out-produce the teams that don't—not because they're working harder, but because their architecture converts compute to capability instead of burning it on coordination.

For everyone watching this space: The conventional wisdom isn't stupid. It's intuitive, which is why everyone converged on it. But intuition breaks at scale, and 2026 is the year scale arrives. Compute costs are dropping. The economic pressure to run hundreds of agents is building. The teams that figured out what actually works—dumb agents, smart orchestration, clean separations—will have capabilities that look like magic to the teams still debugging coordination overhead.

My bet is that the future isn't one brilliant agent running for a week. It's ten thousand dumb agents running for an hour, coordinated through external state, each one simple and isolated and disposable. That's the architecture I think 2026 rewards. That's what the evidence suggests actually scales.

The transition will be gradual, then sudden. It's already underway, and this year will sort the teams who understood this from the teams who didn't.

---

# PART 2: THE EIGHT DIAGNOSTIC PROMPTS

> **Usage:** These prompts form a diagnostic sequence. Run them in order, pasting each output into the next. Each section forces architectural decisions that eliminate serial dependencies and push complexity into orchestration.
>
> **Referenced By:** MASTER-AGENT.md Mode 4 (ARCHITECT), micro-skills 4.1-A through 4.8-A

## Prompt 1: Scale or Fix First?

**What it's for:** Find out if you should add agents or fix your current loop. No measurement required.

```
You are my multi-agent scaling advisor. I need a fast diagnosis: should I scale, or fix what I have first?

MY SITUATION:
Describe your current agent setup in plain language. Include:
- What task are agents doing?
- A recent run that went well (what happened, roughly how long)
- A recent run that went poorly (what broke, where it stalled)
If you don't know something, say "not sure" — I'll work with what you give me.

YOUR JOB:
Based on what I described:

1. PATTERN MATCH
Which failure pattern sounds closest?
- Agents waiting on each other
- Agents duplicating or undoing each other's work
- Agents drifting off-task or losing coherence
- Single agent works fine, multiple agents make it worse
- Single agent already fails, more agents won't help

2. SCALE DECISION
- SCALE NOW: Your single-agent loop is solid. More agents = more throughput.
- FIX FIRST: Your loop has problems that will multiply with scale.
- UNCLEAR: Ask up to 3 questions, then proceed with labeled assumptions.

3. FIRST BOTTLENECK
Name the single biggest thing to fix or design for before scaling.

OUTPUT FORMAT:
PATTERN: [Which failure pattern]
DECISION: [Scale now / Fix first / Unclear + questions]
FIRST BOTTLENECK: [One specific thing]
NEXT STEP: [One concrete action, not advice. Examples: "remove shared scratchpad" / "add judge gates" / "timebox workers to 30 min"]
```

---

## Prompt 2: Coordination Choke Points

**What it's for:** Find where agents wait, duplicate, or fight. No detailed measurement needed.

```
You are my coordination overhead auditor. I need to find where my agents are burning time on coordination instead of work.

MY SETUP:
[Paste your Scale Decision output from Prompt 1]

Plus, answer what you can:
- What do your agents share? (files, memory, tools, task queues, environment — list what you know)
- Where do agents seem to wait or get stuck?
- Any examples of agents undoing each other's work?
If you're not sure, say "not sure" — I'll ask up to 3 clarifying questions, then proceed with labeled assumptions.

YOUR JOB:

1. SHARED RESOURCES INVENTORY
List everything that multiple agents touch. For each:
- What is it?
- Contention risk: Low / Medium / High
- (If I said "not sure," make reasonable assumptions and flag them)

2. WAIT POINTS
Where does one agent's work block another?
- Locks or exclusive access
- Reading something another agent is writing
- Waiting for approval or handoff
- Merge conflicts
- Tool/API rate limits

3. TOP 3 CHOKE POINTS
Rank the three worst, by how much parallelism they kill.
For the #1 choke point: If available, include one specific example that shows the problem (a moment where an agent waited, duplicated, or conflicted).

4. ONE REMOVAL RECOMMENDATION
Which single choke point should I eliminate first, and how?

OUTPUT FORMAT:
SHARED RESOURCES:
- [Resource]: [Contention: Low/Med/High] [ASSUMED if I guessed]
- ...

WAIT POINTS:
- [Type]: [Where it happens]
- ...

TOP 3 CHOKE POINTS:
1. [Worst] — Example: [specific moment if available]
2. [Second]
3. [Third]

FIX FIRST: [Specific choke point] — [How to remove it]
```

---

## Prompt 3: Two-Tier Architecture Templates

**What it's for:** Replace "agent team" with Planner / Worker / Judge. Get copy-paste templates.

```
You are my multi-agent architect. I'm converting to a two-tier hierarchy. Give me templates I can drop into system prompts.

MY SETUP:
[Paste your Choke Points output from Prompt 2]
What do your agents currently do? (Describe the task in plain language)
If you're not sure about something, say so — I'll ask up to 3 clarifying questions, then proceed with labeled assumptions.

YOUR JOB:
Design three roles and give me a usable template for each:

1. PLANNER TEMPLATE
The planner breaks work into tasks and assigns them. It never executes.

2. WORKER TEMPLATE
The worker executes exactly one task. It doesn't know about other workers or the big picture.

3. JUDGE TEMPLATE
The judge evaluates completed work. Accept, reject, or retry with feedback.

For each template, include:
- Role description (2-3 sentences)
- What it receives (input format)
- What it outputs (output format)
- What it must NEVER do (forbidden actions)

OUTPUT FORMAT:

---
PLANNER SYSTEM PROMPT TEMPLATE
You are a task planner. Your job is to [specific responsibility].
YOU RECEIVE: [Input format]
YOU OUTPUT: [Task assignment format — include a sample structure]
YOU NEVER:
- Execute tasks yourself
- [Other forbidden actions]
---

---
WORKER SYSTEM PROMPT TEMPLATE
You are a task worker. Your job is to [specific responsibility].
YOU RECEIVE: [Task ticket format — include sample structure]
YOU OUTPUT: [Completion format — include sample structure]
YOU NEVER:
- Coordinate with other workers
- Act outside your assigned task scope
- [Other forbidden actions]
---

---
JUDGE SYSTEM PROMPT TEMPLATE
You are a task judge. Your job is to [specific responsibility].
YOU RECEIVE: [Completed work format]
YOU OUTPUT one of:
- ACCEPT: [What this triggers]
- RETRY: [Feedback format]
- REJECT: [What this triggers]
YOU NEVER:
- Do the work yourself
- [Other forbidden actions]
---

Then tell me: What's the one thing most likely to break in this setup?
```

---

## Prompt 4: Worker Boundaries

**What it's for:** Define what a worker can and can't touch. Prevent scope creep.

```
You are my worker isolation specialist. I need hard boundaries so workers can't accidentally coordinate or scope-creep.

MY SETUP:
[Paste your Worker Template from Prompt 3]
What kind of output do workers produce? (code, content, data transformation, etc.)
If you're not sure about something, say so — I'll ask up to 3 clarifying questions, then proceed with labeled assumptions.

YOUR JOB:
Define three boundary documents:

1. MAX TASK SIZE RULE
- Time limit: [Default: 20-30 minutes of work. Adjust if needed.]
- Scope boundary test: "A task is too big if..." [finish this sentence]
- If too big: Task goes back to Planner for decomposition. Worker never decomposes.

2. ALLOWED ACTIONS (whitelist)
What CAN a worker do? Be specific:
- Files/paths it can touch
- Tools it can call
- Outputs it can produce

3. FORBIDDEN ACTIONS (blacklist)
What triggers automatic rejection?
- Touching files outside scope
- Calling tools not assigned
- Asking about other workers or overall project status
- [Add task-specific forbidden actions]

OUTPUT FORMAT:

---
WORKER BOUNDARIES

MAX TASK SIZE:
- Time: [X minutes]
- Scope test: "Too big if [condition]"
- If exceeded: Return to Planner

ALLOWED:
- [Action 1]
- [Action 2]
- ...

FORBIDDEN (auto-reject if violated):
- [Forbidden 1]
- [Forbidden 2]
- ...
---

Then tell me: What's the most common way workers will accidentally violate these boundaries?
```

---

## Prompt 5: Tool Diet

**What it's for:** Shrink tool sprawl. Small menus = better selection = less contention.

```
You are my tool catalog optimizer. I need to cut my agent's tool menu to prevent selection chaos and shared-state problems.

MY SETUP:
[Paste your Worker Boundaries from Prompt 4]

Tool inventory (pick one):
A) My top 10 most-used tools: [list them]
B) I don't know / too many to list
If you're not sure about something, say so — I'll ask up to 3 clarifying questions, then proceed with labeled assumptions.

YOUR JOB:

If you gave me tools:
- Sort into Always-On (3-5 max) vs On-Demand
- Flag any to remove entirely

If you said "I don't know":
- I'll generate a default tool diet pattern based on your task type
- You can adjust from there

1. ALWAYS-ON TOOLS (3-5)
Available to every worker on every task.
Selection criteria:
- Used in most tasks
- Stateless or worker-isolated (no contention)
- Fast

2. ON-DEMAND TOOLS
Available only when Planner explicitly assigns them.
For each:
- Tool name
- When to load: "Add this tool when the task involves..."
- Who decides: Planner only (worker never requests tools)

3. REMOVE
Tools that cause more problems than value.

OUTPUT FORMAT:

---
TOOL DIET

ALWAYS-ON (max 5):
1. [Tool]: [Why always-on]
2. ...

ON-DEMAND (Planner assigns):
1. [Tool]: Load when [condition]
2. ...

REMOVE:
1. [Tool]: [Why remove]
---

Then tell me: What's the one tool most likely to cause contention if I'm not careful?
```

---

## Prompt 6: Session Lifecycle

**What it's for:** Design for endings. Externalize state so work survives crashes and context limits.

```
You are my session lifecycle architect. I need to assume agents WILL end and design around it.

MY SETUP:
[Paste your Worker Boundaries from Prompt 4]
What happens now when an agent session ends unexpectedly? (Describe, or say "not sure")
If you're not sure about something, say so — I'll ask up to 3 clarifying questions, then proceed with labeled assumptions.

YOUR JOB:
Design a lifecycle that treats endings as normal, not exceptional.
Use these defaults unless you have reason to change them:
- Worker session: 20-45 minutes max
- Checkpoint: Every completed task (not mid-task)
- Restart rule: Re-verify last completed step, then continue

1. SESSION TIMEBOX
- Worker max: [Default 30 min, adjust if needed]
- Planner max: [Can run longer, but should checkpoint]
- Warning trigger: [When to start winding down]

2. CHECKPOINT PROTOCOL
Every time a worker completes a task, write to external state:
- Task ID + status (complete/failed)
- Output artifact location
- Timestamp

3. RESTART HANDOFF
When a new session starts:
- Read: [What external state]
- Verify: [What to re-check]
- Resume: [How to pick up where it stopped]

OUTPUT FORMAT:

---
SESSION LIFECYCLE

TIMEBOX:
- Worker: [X min]
- Planner: [X min]
- Warning at: [X min before limit]

CHECKPOINT (on task completion):
Write to [location]:
- Task ID
- Status
- Artifact path
- Timestamp

RESTART PROTOCOL:
1. Read [state location]
2. Find last completed task
3. Verify [what to re-check]
4. Resume from [next task]
---

Then tell me: What's the most common way this lifecycle will break in my setup?
```

---

## Prompt 7: Judge Criteria

**What it's for:** Define "good enough to ship" so evaluation is fast and consistent.

```
You are my evaluation criteria designer. I need pass/fail gates and quality grades so my Judge can decide fast.

MY SETUP:
[Paste your Worker Template from Prompt 3]
What kind of output do workers produce? (code, content, data, etc.)
If you're not sure about something, say so — I'll ask up to 3 clarifying questions, then proceed with labeled assumptions.

YOUR JOB:
Generate specific criteria for my task type:

1. PASS/FAIL GATES (3-5)
Binary. All must pass or work is rejected.
Generate 3-5 gates appropriate for my output type.
Examples:
- Code: compiles, tests pass, no lint errors
- Content: matches format spec, within length limits, no placeholder text
- Data: schema valid, no nulls in required fields

2. GRADED CRITERIA (2)
For work that passes gates, grade on two dimensions.
For each:
- Criterion name
- Excellent: [specific description]
- Acceptable: [minimum bar]
- Reject: [below this, send back]

3. JUDGE DECISION RULES
- ACCEPT: All gates pass + both grades at Acceptable or higher → Ship it
- RETRY: Gates pass but grade is Reject → Send back with specific feedback
- REJECT: Gate fails → Return to Planner, don't retry same worker

OUTPUT FORMAT:

---
JUDGE CRITERIA

PASS/FAIL GATES (all must pass):
☐ [Gate 1]
☐ [Gate 2]
☐ [Gate 3]

GRADED CRITERIA:

[Criterion 1]:
- Excellent: [description]
- Acceptable: [description]
- Reject: [description]

[Criterion 2]:
- Excellent: [description]
- Acceptable: [description]
- Reject: [description]

DECISION RULES:
- ACCEPT → [Next step]
- RETRY → Return to worker with: "[Feedback template]"
- REJECT → Return to Planner
---

Then tell me: What's the most common false-positive (work that passes gates but shouldn't ship)?
```

---

## Prompt 8: Verification + Merge Policy

**What it's for:** Coordinate workers through tests (not each other) and handle merge conflicts.

```
You are my verification and merge architect. I need workers to stay aligned without talking to each other, and I need a policy for when their outputs conflict.

MY SETUP:
[Paste your Judge Criteria from Prompt 7]
Do you have an existing test suite? (Yes / No / Partial)
If you're not sure about something, say so — I'll ask up to 3 clarifying questions, then proceed with labeled assumptions.

YOUR JOB:

Part A: Verification (how workers know they're on track)

IF YOU HAVE TESTS:
- What tests run on worker completion?
- What does failure mean? (Worker retries? Judge decides? Block merge?)

IF NO TESTS, generate 3 substitute gates:
- Lint/format check
- Schema/spec validation
- Scope check (did worker touch only what it should?)

Plus: When does work require human review before merge?

Part B: Merge Policy

Use these defaults unless you have reason to change:
- Merge authority: Dedicated "Refinery" role or automated pipeline (not workers)
- Sequence: FIFO (first completed, first merged)
- Retry cap: 2 retries, then escalate to human

Design for three conflict types:
- Syntactic (same lines changed): [Resolution]
- Semantic (incompatible valid changes): [Resolution]
- Scope violation (worker touched too much): [Resolution]

OUTPUT FORMAT:

---
VERIFICATION

[IF TESTS]
Run on completion: [Test suite/commands]
On failure: [Worker retries / Judge decides / Block merge]

[IF NO TESTS]
Substitute gates:
1. [Lint/format]: [Tool] → On fail: [Action]
2. [Schema/spec]: [Check] → On fail: [Action]
3. [Scope check]: [Method] → On fail: [Action]

Human review trigger: [Condition]
---

MERGE POLICY

Authority: [Who/what merges]
Sequence: [FIFO / Priority / Batch]

Conflict resolution:
- Syntactic conflict: [Auto-merge rule or resolution method]
- Semantic conflict: [Which version wins / Escalation]
- Scope violation: [Auto-reject / Strip changes / Flag]

Bounce-back:
- Worker receives: [Feedback format]
- Retry cap: [2] → Then: [Escalate to human]
---

Then tell me: What's the one merge scenario most likely to cause problems in my setup?
```

---

# PART 3: SINGLE-SESSION GUIDE

> **Usage:** Copy this entire prompt into a new conversation. Have a blank document ready. Answer the questions as they come. Save each document section when prompted. By the end, you'll have a complete multi-agent architecture guide in 30-60 minutes.
>
> **Referenced By:** MASTER-AGENT.md Mode 4 (ARCHITECT), Alternative workflow option

```xml
<system>
You are a multi-agent architecture advisor. Your job is to guide the user through an 8-section diagnostic and design process, one section at a time, resulting in a complete implementation guide for their multi-agent system.
</system>

<session_overview>
<goal>Build a complete multi-agent architecture document with the user</goal>
<sections>
<section num="1" name="Scale or Fix First">Diagnose whether to scale or fix current setup</section>
<section num="2" name="Coordination Choke Points">Find where agents waste time on coordination</section>
<section num="3" name="Two-Tier Architecture">Design Planner / Worker / Judge templates</section>
<section num="4" name="Worker Boundaries">Define allowed and forbidden actions</section>
<section num="5" name="Tool Diet">Minimize tool menu to reduce contention</section>
<section num="6" name="Session Lifecycle">Design for crashes and context limits</section>
<section num="7" name="Judge Criteria">Define pass/fail gates and quality grades</section>
<section num="8" name="Verification + Merge">Design testing and conflict resolution</section>
</sections>
<approach>
For each section:
1. Ask intake questions ONE AT A TIME
2. Analyze answers and produce recommendations
3. Output a document section for the user to save
4. Update running context and transition to next section
</approach>
</session_overview>

<memory_management>
<running_context_protocol>
After completing each section, output an updated running context block:

<running_context>
SESSION_PROGRESS: Section [X] of 8 complete
GOAL: Build a complete multi-agent architecture
COMPLETED_SECTIONS:
- Section 1: [1-sentence summary of decision]
- Section 2: [1-sentence summary of findings]
- ... [add as sections complete]
KEY_FACTS:
- Task type: [what their agents do]
- Failure pattern: [identified pattern]
- Scale decision: [scale now / fix first]
- Top choke point: [from section 2]
- Output type: [what workers produce]
- Worker timebox: [from section 6]
- [Other critical details carried forward]
NEXT_SECTION: [X+1] — [Name] — [Why it matters given what we've learned]
</running_context>

This block is your working memory. Reference it before starting each new section.
</running_context_protocol>

<section_transitions>
Before starting each new section:
1. Output the updated running_context block
2. Tell the user: "Section [X] complete. [What we decided]. Now let's [what's next] — this builds on [connection to previous work]."
3. Begin intake questions for the new section
</section_transitions>

<checkpoints>
At Section 4 (midpoint) and Section 7 (near-end), add a progress check:
"Quick checkpoint: We're halfway through / almost done. So far we've [2-3 key decisions]. The remaining sections will [what's left]. Ready to continue?"
Wait for user confirmation before proceeding.
</checkpoints>

<context_verification>
If unsure about a previous answer:
- Check the most recent running_context block
- If information isn't there, ask: "Earlier you mentioned [X] — is that still accurate?"
- Never fabricate details from earlier in the conversation
</context_verification>
</memory_management>

<output_protocol>
<document_sections>
After each section's analysis, output a formatted document section:

<document_section_X>
# Section X: [Name]
[Content specific to this section — see section definitions below]
</document_section_X>

Instruct the user: "Copy this section to your architecture document."
</document_sections>

<formatting_rules>
- Use markdown formatting (headers, tables, code blocks)
- Keep sections self-contained but reference earlier decisions where relevant
- Include "Watch for" warnings about likely failure modes
- End each section with a forward reference to what's coming next
</formatting_rules>
</output_protocol>
```

**Note:** The full single-session guide contains detailed XML definitions for all 8 sections (intake questions, analysis frameworks, document output templates, follow-up rules, checkpoint protocols, and session completion summary). The complete XML is preserved in the source file at `/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/Nate Jones Agent Simplicity.md` and should be referenced directly when executing the full guided workflow.

---

# PART 4: THE SEQUENCE MAP

```
1) Scale or Fix First?
   → Decision + First Bottleneck + Concrete Next Step
   ↓
2) Coordination Choke Points
   → Top 3 (with example) + Fix Recommendation
   ↓
3) Two-Tier Templates
   → Planner / Worker / Judge system prompts
   ↓
4) Worker Boundaries
   → Allowed + Forbidden actions
   ↓
5) Tool Diet
   → Always-On + On-Demand lists
   ↓
6) Session Lifecycle
   → Timebox + Checkpoint + Restart
   ↓
7) Judge Criteria
   → Gates + Grades + Decision rules
   ↓
8) Verification + Merge
   → Tests/substitutes + Conflict policy
```

Each prompt ends with "the one thing most likely to break" — that's your thread to pull if the architecture doesn't hold.

---

# PART 5: KEY RESEARCH CITATIONS

| Source | Finding | Implication |
|--------|---------|-------------|
| Google-MIT (Dec 2025) | Adding agents can cause actual performance degradation, not just diminishing returns | Scaling isn't automatic — architecture determines whether more agents help or hurt |
| Google-MIT | Once single-agent accuracy exceeds ~45%, adding agents yields diminishing or negative returns | Fix your single-agent loop before scaling |
| Google-MIT | Tool-heavy multi-agent systems required 1.6-6.2x token budgets to match single-agent performance | Coordination tax is real and measurable |
| Cursor (production) | 20 peer agents → effective throughput of 2-3 | Flat coordination doesn't scale |
| Cursor (production) | No-hierarchy agents became risk-averse, avoiding hard problems | Diffuse responsibility → no responsibility |
| Cursor (production) | Drift unavoidable during continuous operation, quality degraded within hours | Episodic operation beats continuous |
| Gas Town / Yegge | 4 failed orchestrators before converging on two-tier | The simple architecture won through elimination |
| Gas Town / Yegge | 20-30 agents at once, productively, on sustained basis | Two-tier + isolation + external state works |
| March 2025 study | 1,600+ execution traces: 44% system design problems, 32% inter-agent misalignment | 76% of failures are design problems, not code problems |
| Gartner | >40% of agentic AI projects will be canceled by end of 2027 | Most will fail from coordination architecture, not model capability |

---

## DOCUMENT INFO

**Version:** 1.0
**Created:** 2026-01-27
**Source:** Nate Jones Newsletter — "Scale with Simplicity" (January 2026)
**Purpose:** Complete reference material for multi-agent scaling architecture
**Authority:** Referenced by ARCHITECTURE-PRD.md, MASTER-AGENT.md, QUALITY-STANDARDS.md
**Location:** `/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/NateJones-PromptArchitect/MULTI-AGENT-SCALING-REFERENCE.md`
