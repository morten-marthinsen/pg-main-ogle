# Dispatcher-Manager Agent

**An orchestration pattern where the AI takes the manager role - decomposing objectives, delegating to sub-agents, and reporting back to you with clear options and recommendations.**

---

## What This Does

Instead of you constantly directing Claude on what to do next, the Dispatcher-Manager pattern flips the script:

- **Claude becomes the manager** - It breaks down your objective into tasks
- **You become the stakeholder** - You approve plans and make key decisions
- **Sub-agents do the work** - Claude spawns specialized workers for each task
- **Quality gates enforce standards** - Work isn't considered done until it meets thresholds

This creates a more autonomous, reliable workflow where you can step away and trust that work is progressing correctly.

---

## The Three-Tier Model

```
+---------------------------------------------------------------+
|                           YOU                                  |
|                                                               |
|  Provide: Objectives, Constraints, Approvals, Decisions       |
|  Receive: Progress updates, Options, Quality reports          |
+---------------------------------------------------------------+
                              |
+---------------------------------------------------------------+
|                    CLAUDE (MANAGER)                           |
|                                                               |
|  Does:                                                        |
|  - Decomposes objectives into task graphs                     |
|  - Spawns sub-agents with personas                            |
|  - Monitors progress and enforces quality gates               |
|  - Reports with options + recommendations                     |
|                                                               |
|  Does NOT:                                                    |
|  - Generate content directly                                  |
|  - Make creative decisions without approval                   |
+---------------------------------------------------------------+
                              |
+---------------------------------------------------------------+
|                        SUB-AGENTS                             |
|                                                               |
|  Each receives: Task, Persona, Constraints, Output format     |
|  Each returns: Output, Self-assessment, Confidence score      |
+---------------------------------------------------------------+
```

---

## Key Benefits

### 1. Consistent Communication
Every update follows the same format:
- What was completed
- Options for next steps (with recommendations)
- Quality scores achieved

### 2. Quality Enforcement
Work must meet thresholds before being marked complete:
- **STANDARD (70%)** - Non-critical auxiliary tasks
- **ELEVATED (85%)** - Default for important work
- **CRITICAL (95%)** - Final output, client deliverables

### 3. No Surprise Decisions
The Manager always presents options with trade-offs and recommendations. You never get "I went ahead and did X" without your input on important decisions.

### 4. Persona-Optimized Execution
Sub-agents are assigned task-appropriate personas:
- **Dr. Elena Vasquez** - Analytical tasks (data, research)
- **Marcus Chen** - Creative tasks (ideation, breakthroughs)
- **Sarah Okonkwo** - Validation tasks (compliance, flaws)
- **Dr. James Liu** - Research tasks (exhaustive coverage)
- **Dr. Maya Patel** - Synthesis tasks (cross-domain connections)
- **Jack Morrison** - Copywriting tasks (direct response)

---

## Installation

### Mac (Terminal)

```bash
cd ~/Downloads/Dispatcher-Manager-Agent
chmod +x install.sh
./install.sh
```

### Windows (PowerShell)

```powershell
cd ~/Downloads/Dispatcher-Manager-Agent
.\install.ps1
```

---

## How to Use

Start any session with this prompt:

```
I want to use the Dispatcher/Manager pattern for this project.

Objective: [What you want to accomplish]
Constraints: [Any limitations]
Quality Level: [STANDARD / ELEVATED / CRITICAL]
```

### Example

```
I want to use the Dispatcher/Manager pattern for this project.

Objective: Create a landing page for our new AI course
Constraints: Must follow brand guidelines, deadline is Friday
Quality Level: ELEVATED
```

Claude will respond with:
1. A task graph breaking down the objective
2. Request for approval before starting
3. Persona assignments for each task

---

## Communication Protocol

| Event | What Claude Reports | Your Options |
|-------|---------------------|--------------|
| **Task Start** | "Beginning [X]. Task graph: [summary]. First milestone: [Y]." | Proceed / Adjust first |
| **Milestone Reached** | "Completed [X]. Summary: [...]. Moving to [Y]." | Continue / Review / Pause |
| **Quality Gate Passed** | "Gate [X] passed. Scores: [...]." | (Informational) |
| **Quality Gate Failed** | "Gate [X] failed. Options: (A) Retry, (B) Override, (C) Stop. Recommend: [X]" | Select A, B, or C |
| **Escalation** | "[Issue]. Options: [A, B, C]. Trade-offs: [...]. Recommend: [X]" | Select option |
| **Completion** | "Done. Summary: [...]. Scores: [...]. Outputs: [locations]" | Accept / Revise |

---

## When to Use This Pattern

**Good for:**
- Complex multi-step projects
- Work you want to walk away from
- Projects requiring quality enforcement
- Collaborative work where you want to stay informed

**Less suited for:**
- Quick one-off tasks
- Highly exploratory work where direction is unclear
- Tasks where you want to stay hands-on

---

## What Gets Installed

The install script adds this prompt to your `CLAUDE.md` file, making the pattern available in all your Claude Code sessions.

```
~/.claude/CLAUDE.md        # Updated with Dispatcher/Manager instructions
```

If you prefer to keep it separate, you can reference the `AGENT.md` file directly by copying it to your project folder.

---

## Advanced: Advisor Integration (Optional)

The Manager pattern supports specialized critic agents at intervention points. These are **not included** in this package -- they are an advanced extension you can build yourself.

**Example advisors you could create:**

| Advisor | When Invoked |
|---------|--------------|
| Quality Reviewer | Quality gate failure |
| Copy Critic | Sales copy produced |
| Technical Reviewer | Code or architecture produced |

To add advisors, create agent files in `~/.claude/agents/` following the same pattern as the AGENT.md in this package.

---

## Files Included

```
Dispatcher-Manager-Agent/
├── README.md           # This file
├── AGENT.md            # Full agent definition
├── how-it-works.md     # Visual explainer with diagrams
├── install.sh          # Mac installer
└── install.ps1         # Windows installer
```

---

*Packaged by Rich Schefren - Strategic Profits*
