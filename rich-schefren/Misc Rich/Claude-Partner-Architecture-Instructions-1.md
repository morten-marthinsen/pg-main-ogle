# Instructions for AI: Continuing the Partner Architecture Project

**Purpose:** This document provides context and instructions for any AI session that continues work on Richard Schefren's "Partner Architecture" project.

**Related Documents:**
- `Claude-Partner-Architecture-Full-Conversation.md` - Complete conversation record with summary
- `Claude-Partner-Architecture-Analysis.md` - Detailed analysis of options, pros/cons

---

## Project Overview

Richard wants to transform how he works with Claude Code:

**Current State (Problem):**
- Single-threaded: Ask → Wait → Receive → Ask again
- Multiple chats require monitoring multiple places for authorization requests
- No ability to discuss/evolve work mid-stream
- Teaching content created separately from doing work

**Desired State (Solution):**
- Multi-threaded Partner: Continuous conversation while agents work in background
- Single conversation as command center for all projects
- Phase-based check-ins allow discussing and evolving outcomes
- Shadow Teacher agent automatically creates teaching content from work being done

---

## The Two Core Components

### 1. Partner Architecture
A way of working where:
- Claude acts as strategic partner maintaining main conversation
- Sub-agents execute tasks in background
- All authorization requests route through main conversation
- Work completes in phases with natural discussion points

**Technical Basis:**
- Claude Code's Task tool supports `run_in_background: true`
- Output goes to temp file that can be checked periodically
- Agents can be configured in `~/.claude/agents/`

### 2. Shadow Teacher Agent
A background agent that:
- Observes all work being done in main conversation
- Identifies teachable moments in real-time
- Generates lesson drafts, framework extractions, resource files
- Predicts student Q&A based on actual work
- Saves to structured location in Obsidian vault

**Value Proposition:**
- Teaching content is byproduct of doing work, not separate task
- Captures nuance lost when documenting after the fact
- Compounds over time into massive resource library

---

## Richard's Stated Reasons (Validate These)

Richard articulated three reasons for wanting this architecture:

1. **"Save me from opening numerous chats and paying attention to multiple authorization requests"**
   - Wants single attention stream
   - Partner owns all contexts, routes all requests

2. **"Get started, then discuss and potentially change the outcome"**
   - Wants iterative, not autonomous execution
   - Phase-based check-ins, not black boxes
   - Ability to evolve direction based on what's learned

3. **"I learn better when talking/having conversation about what I'm doing"**
   - Conversation is the value, not just the output
   - Continuous dialogue preserves cognitive momentum
   - Thinking partner, not task dispatcher

---

## Questions Richard Needs to Answer

Before implementation, these questions need answers:

### Teaching Context
1. **What format do you teach in?** Live calls? Courses? 1:1 coaching? Written content? Video? This affects what the Shadow Teacher should produce.

2. **Who are you teaching?** Entrepreneurs using AI? Copywriters? Coaches? Business strategists? This affects framing, examples, and assumed knowledge.

3. **Do you have an existing teaching content structure?** Should we match an existing format, or design fresh?

4. **How much editing do you want to do?** Should content be "ready to use" or "90% drafts for you to polish"?

### Work Patterns
5. **What's your typical work pattern?** Jump frequently between projects, or deep focus on one thing at a time?

6. **What tasks would you want running in background most often?** Research? First drafts? Critiques? Data analysis? Expert system runs?

### Technical Preferences
7. **How important is reliability?** Is "90% works, 10% needs manual recovery" acceptable? Or do you need 99%+ reliability?

8. **Dashboard preference?** Are you okay asking Claude for status, or do you want a visual dashboard you can check independently?

9. **Obsidian integration priority?** Should all task outputs land in your vault automatically? What folder structure?

### Additional Context Richard Mentioned
10. Richard said he wants to give "additional information to make this really work." Prompt him for that information - what else should the system know?

---

## Richard's Existing System (Context)

Richard already has a sophisticated Claude Code setup:

**Deployed Skills (163 total):**
- Webinar Expert System: 604 frameworks, 43 skills (Fladlien, Cage, Brunson, Kern, Joon, Kennedy)
- Copywriting Systems: 882+ frameworks, 50 skills (Deutsch, Clayton, Evaldo, Carlton)
- Arena System: Competitive copywriting with evolution engine
- Business Analytics: Stripe integration
- Meeting Intelligence: Read AI integration
- Many more utilities and specialized skills

**Deployed Agents (13):**
- Copywriting critics: deutsch-critic, clayton-critic, evaldo-critic, carlton-critic
- Arena system: marketplace-judge, synthesis-critic, arena-synthesist, skill-evolver, copywriter-spawner
- Webinar: webinar-critic

**Key Locations:**
- Skills: `~/.claude/skills/`
- Agents: `~/.claude/agents/`
- Mission Control: `/Users/richardschefren/Documents/Obsidian/Active-Brain/00 Mission Control/`
- Architecture doc: `ARCHITECTURE.md` in Mission Control

---

## Key Design Principles (From Research)

These principles emerged from the conversation and should guide implementation:

1. **Sub-agents are researchers, not executors**
   - They gather information and report back
   - Richard makes decisions
   - This preserves strategic control

2. **Shared context files are critical**
   - Agents reading/writing to common `context.md` stay aligned
   - File structure: `.claude/docs/tasks/context.md` or similar

3. **The 90% Rule**
   - Background agents should complete 90% of tasks without intervention
   - If constantly rescuing stuck agents, system is worse than doing it yourself
   - Design tasks to be self-contained with clear success criteria

4. **Phase-based, not autonomous**
   - Tasks complete in phases (research → draft → refine)
   - Each phase is a natural conversation point
   - User stays in control loop

5. **The conversation IS the interface**
   - No separate dashboard needed if Partner has good awareness
   - Ask "what's running?" to get status
   - Say "prioritize X" to shift work

---

## Recommended Implementation Approach

Based on the conversation, the recommended approach is:

### Phase 1: Immediate (0-30 mins)
- Test built-in `run_in_background: true` capability
- Dispatch a real research task while conversation continues
- Validate the pattern works

### Phase 2: Foundation (2-3 hours)
- Create project context file structure
- Build Partner Mode skill
- Create markdown-based task tracker

### Phase 3: Shadow Teacher (2-3 hours)
- Design Shadow Teacher agent
- Create teaching resource folder structure
- Define capture protocol (how main conversation feeds the Teacher)

### Phase 4: Refinement (Ongoing)
- Tune based on actual usage
- Add Inngest only if reliability issues arise
- Expand teaching content formats based on Richard's needs

---

## What to Do Next

When Richard returns to continue this project:

1. **Start by reviewing this document and the full conversation record**

2. **Ask Richard to answer the open questions** (especially teaching context questions)

3. **Ask Richard for the "additional information" he mentioned** - what else should the system know about how he works, teaches, or thinks?

4. **Propose a specific first test** - a real task to run in background while discussing next steps

5. **Don't over-engineer initially** - Start with minimal viable Partner pattern, expand based on actual usage

---

## Prompt to Resume This Conversation

When Richard wants to continue, he can use something like:

> "I want to continue working on the Partner Architecture project. I've read through the conversation record and I'm ready to answer your questions and give you additional context. Here are my answers:
>
> [Answers to the questions listed above]
>
> And here's additional context you should know:
>
> [Whatever Richard wants to add]
>
> Let's figure out the next steps."

---

## Technical Reference

### Background Task Syntax
```
Task tool with:
- run_in_background: true
- Returns task_id and output_file path
- Check with Read tool or `tail` on output_file
```

### Agent Definition Location
```
~/.claude/agents/[agent-name]/AGENT.md
```

### Skill Definition Location
```
~/.claude/skills/[skill-name]/SKILL.md
```

### Current Project Context Location
```
/Users/richardschefren/Documents/Obsidian/Active-Brain/00 Mission Control/
```

---

*Document created: January 14, 2026*
*Purpose: Enable seamless continuation of Partner Architecture project*
