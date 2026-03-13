---
name: objective-intake
description: "Orchestration layer between raw objective and Skill 0. Frames outcomes, selects personas, routes skills, selects agent/model per task, and classifies execution mode."
---

# Objective Intake — Orchestration Layer

**Version:** 2.0 | March 10, 2026
**Category:** Orchestration (Pre-Optimization)
**Position in Stack:** Runs AFTER session bootstrap, BEFORE Skill 0 (Prompt Optimization)

---

## Purpose

When Marc states what he wants, the system needs to answer five questions before Skill 0 optimizes the prompt:

1. **What does "done" look like?** (Outcome Framing)
2. **Who should the AI be for this?** (Persona Selection)
3. **What tools does this need?** (Skill Routing)
4. **Which model/agent handles each piece?** (Agent/Model Routing)
5. **How big is this?** (Execution Mode)

Today, Marc answers these implicitly through experience and real-time judgment. This skill codifies that judgment into a lightweight decision protocol — fast enough to not slow things down (R-04), thorough enough to prevent Skill 0 from optimizing toward the wrong target.

**The core insight (from Nate B. Jones's Intent Engineering):** If you walk into a meeting without knowing what you want, the most articulate person in the room decides for you. This layer ensures Marc's intent survives contact with the system's fluency — before prompt optimization even begins.

---

## When This Fires

**Trigger:** Marc provides a new objective — any substantive request that isn't a standing command or simple question.

**Sequence in the full stack:**

```
Marc says "initialize"
    ↓
Session Bootstrap loads (rules, preferences, ops files)
    ↓
Marc states objective (raw request)
    ↓
>>> OBJECTIVE INTAKE (THIS SKILL) <<<
    ↓
Skill 0 (Prompt Optimization) runs on the now-contextualized objective
    ↓
Marc says "run"
    ↓
Execution with full stack active
    ↓
Quality Engine (audit, check)
```

**Exception — skip Objective Intake when:**
- Marc explicitly says "just do it" / "skip intake" / "execute directly"
- The objective is a standing command (`check`, `audit`, `initialize`)
- The objective is a simple factual question requiring no structuring
- The objective is a continuation of an already-framed objective within the same session
- Skill 0 would classify this as Tier 1 (silent mode) — if the task is simple and low-stakes, Objective Intake adds no value. Let Skill 0 handle it directly.

**Interaction with Skill 0:** This skill is upstream of Skill 0. Its output — the Objective Brief — becomes the input that Skill 0 optimizes. Skill 0 no longer needs to guess at the business objective, persona context, or skill requirements. It receives them pre-resolved.

**Handoff to Skill 0:** When an Objective Brief is present, Skill 0 should recognize that questions 1 ("What is Marc actually trying to accomplish?"), 3 ("What does done look like?"), and parts of 6 ("What are the pieces?") from its Seven Questions have already been answered. Skill 0 should confirm the pre-resolved answers rather than re-derive them, and focus its optimization effort on the remaining questions (2: why it matters, 4: what "wrong" looks like, 5: unspoken context, 7: where the hard part is). This prevents redundant extraction.

**Dependency on session-bootstrap:** For this skill to fire reliably, `session-bootstrap` should reference it in its session flow — confirming that Objective Intake is loaded alongside Skill 0. Without this, the skill relies on the AI's judgment to load it, which is fragile. When saving this skill, also update `session-bootstrap` to include Objective Intake in its Step 7 readiness confirmation.

---

## The Protocol (5 Steps)

### Step 1: Outcome Framing

Frame the desired outcome in 1-3 sentences. This is NOT a PRD. It's a lightweight statement that answers:

- **What is the desired end state?** (What does Marc walk away with?)
- **What does success look like?** (How will Marc know this worked?)
- **Who is this for?** (Marc only? Marc + Jeff? External stakeholders? Implementation team?)

**Format:**
```
Desired outcome: [1-2 sentences — the end state, not the task]
Success signal: [1 sentence — how Marc knows it worked]
Audience: [who consumes the output]
```

**How to generate this:**
- Pull from Marc's raw request — what outcome is implied, even if not stated?
- Pull from memory and workspace — is this part of a known project? Does prior context clarify the outcome?
- If the outcome is genuinely ambiguous (you can't confidently state what "done" looks like), ask Marc directly. One question, not five: "What does 'done' look like for this?"

**What this is NOT:**
- Not a full PRD or specification (that's Skill 0's job)
- Not success criteria with testable metrics (that's Skill 0 Step 2)
- Not a project plan or phased breakdown (that's execution planning)

It's the 10-second answer to: "Why are we doing this and what do we want at the end?"

---

### Step 2: Persona Selection

Determine whether this objective requires a specialized persona — a domain identity that changes how the AI thinks, communicates, and prioritizes.

**Decision logic:**

```
1. What domain does this objective live in?
   → AI infrastructure / architecture → persona-ai-infrastructure-strategist
   → Mac/tool setup, learning, workflow optimization, staying current on releases → persona-ai-productivity-architect
   → [Future domains map to future personas as they're built]
   → General operations / no specialized domain → No persona needed

2. Does a persona exist for this domain?
   → Yes → Recommend loading it. State which one and why.
   → No, but the domain is specialized → Flag this: "No persona exists
     for [domain]. Proceeding without one. Consider building one if
     this becomes a recurring workstream."
   → No, and the domain is general → No persona needed. Proceed.

3. Is a persona already active in this session?
   → Yes, same domain → Keep it. No action needed.
   → Yes, different domain → Flag the conflict: "Current persona is
     [X], but this objective is in [Y] domain. Recommend switching
     to [Y persona] or proceeding without a persona."
   → No → Load the recommended one (with Marc's approval per D-10).
```

**Persona Registry:**

| Persona Skill | Domain Scope | Trigger Conditions | Skill ID |
|--------------|-------------|-------------------|----------|
| persona-ai-infrastructure-strategist | AI Life Brain, architecture, tool evaluation, Dossium/Graphlit, MCP, technical design | AI brain work, architecture sessions, tool selection, weekend builds | 4b7ee6b1-ae2d-43e4-aded-8e5d81b7c441 |
| persona-ai-productivity-architect | Mac/tool setup, configuration, integration wiring, learning workflows, staying current on releases | Tool install/config, "how do I use X?", workflow design, "what's new with X?", Phase A-D signals | ca55859b-c8c3-4f25-b5ee-2f0de937f631 |
| *(Add rows as new personas are created)* | | | |

**Important:** Per D-14, every persona skill declares its own dependency chain. When recommending a persona, the Objective Intake layer does NOT need to separately figure out which operational skills to co-load — that's encoded in the persona itself. Just recommend the persona; its dependencies follow automatically.

---

### Step 3: Skill Routing

Identify which skills beyond the always-on `marc-ops-framework` need to activate for this objective.

**Always-on (loaded by session bootstrap, never need explicit routing):**
- `marc-ops-framework` — master rulebook

**Auto-triggered (fire based on their own conditions, not routed here):**
- `prompt-optimizer` — fires on complex/multi-step tasks (Skill 0)
- `source-verification` — fires on research, analysis, document creation (R-20)
- `check-protocol` — fires on "check" command (R-13)
- `audit` — fires on "audit" command (also responds to "self audit")
- `session-bootstrap` — fires on "initialize" command

**Routed by Objective Intake (need explicit activation decision):**

| Skill | Route When | Skill ID |
|-------|-----------|----------|
| `marc-diagram-style` | Objective involves diagrams, visual assets, architecture graphics, system visualizations | af9b06ae-fab4-43f0-8b42-7ace669802b4 |
| `perplexity-capabilities` | Questions about Perplexity Computer capabilities, platform features, or what the AI can do | 6b099d63-c3aa-46e4-b10d-9ce4ad45e49f |
| Any persona skill | Per Step 2 decision | (varies) |
| *(Add rows as new skills are created)* | | |

**Built-in platform skills (route based on objective type):**

| Objective Type | Platform Skills to Load |
|---------------|------------------------|
| Document creation (DOCX, PPTX, XLSX, PDF) | `office/[format]`, `perplexity-brand` |
| Research-heavy task | `research-assistant` |
| Financial analysis | `finance-markets`, `investment-research` |
| Website or web app | `website-building` |
| Data analysis | `data/exploration`, `data/visualization` |
| Marketing content | `marketing/content-creation`, `marketing/brand-voice` |
| Product management (PRDs, specs, roadmaps) | `pm/feature-spec`, `pm/roadmap-management` |
| Sales (outreach, call prep, account research) | `sales/draft-outreach`, `sales/call-prep`, `sales/account-research` |
| Legal (contracts, compliance, NDAs) | `legal/contract-review`, `legal/compliance` |
| Customer support | `cx/ticket-triage`, `cx/response-drafting` |
| Accounting / financial ops | `accounting/financial-statements`, `accounting/reconciliation` |

This table is representative, not exhaustive. If the objective type doesn't match a row, check the platform's available skills catalog for applicable sub-skills.

**Output:** A simple list — "Skills to activate for this objective: [list]" with a one-line rationale for each non-obvious inclusion.

---

### Step 4: Agent/Model Routing

For each action or sub-task identified in Steps 1-3, determine the optimal execution agent and model. This step ensures D-08 (Budget Not a Constraint) is applied — always optimize for capability, not cost.

**Decision logic:**

```
1. Is this a subagent task?
   → Yes → Select the best model for the task type (see quick reference below)
   → No → Proceed with the main agent (default model)

2. Does this task involve an external platform (Claude, ChatGPT, Gemini, Perplexity)?
   → Yes → Route to the appropriate platform via `multi-llm-research-orchestration`
   → No → Use Perplexity Computer's native capabilities

3. Does the task require specialized tooling?
   → Browser automation → browser_task (default: Gemini 3 Flash; retry with Claude Sonnet 4.5 on failure)
   → Code execution → bash / coding subagent
   → File creation → asset subagent (Claude Opus 4.6)
   → Research → research subagent or native search tools
```

**Model Quick Reference (from `model-catalog`):**

| Task Type | Recommended Model | Rationale |
|-----------|------------------|----------|
| Website building | `claude_opus_4_6` | Complex multi-page sites need top-tier reasoning |
| Asset creation (PDF, DOCX, PPTX, XLSX) | `claude_opus_4_6` | Output quality depends on model capability |
| Complex multi-step reasoning | `claude_opus_4_6` | Best reasoning for hard problems |
| General research / data gathering | `claude_sonnet_4_6` | Sufficient quality, more efficient |
| Code generation / refactoring | `gpt_5_3_codex` | Specialized for software engineering |
| Math, logic, structured reasoning | `gpt_5_4` | Strong at formal reasoning tasks |
| Budget-friendly research | `gemini_3_1_pro` | Cost-effective for simple lookups |
| Video generation (default) | `sora_2` | Good balance of quality and efficiency |
| Video generation (premium) | `sora_2_pro` or `veo_3_1` | Cinematic realism or creative control |
| Image generation (default) | `nano_banana_2` | Cost-effective for most needs |
| Image generation (premium) | `nano_banana_pro` | Highest visual quality |
| Image with transparency | `gpt_image_1_5` | Only model supporting transparent backgrounds |

**D-08 Override:** Marc's standing directive is that budget is not a constraint. When in doubt between a cheaper and more capable model, always recommend the more capable one. Only suggest cheaper alternatives if the task is genuinely trivial or Marc explicitly requests cost optimization.

**Subagent vs. External Platform:**
- Subagents are Perplexity Computer's internal delegation mechanism — they run within the platform using the models listed above.
- External platforms (Claude, ChatGPT, Gemini) are separate services accessed via `multi-llm-research-orchestration` for cross-model research synthesis.
- Don't confuse the two: "use Claude Opus" means a Perplexity subagent running that model, not navigating to claude.ai.

**Output:** For each sub-task, specify: "[task] → [agent type] ([model])" or "[task] → main agent (native)".

---

### Step 5: Execution Mode Classification

Classify how the objective should be executed. This determines which quality gates, checkpoints, and convergence patterns apply.

| Mode | Criteria | Implications |
|------|----------|-------------|
| **Single-turn** | One deliverable, can be completed in one response cycle. No dependencies, no phases. | Skill 0 runs at Tier 1 or 2. Minimal quality gates. Share immediately on completion. |
| **Multi-phase** | Multiple deliverables or one complex deliverable requiring phases. Has dependencies between steps. | Skill 0 runs at Tier 3. R-14 phase pause applies — pause after each phase with summary. Convergence gate (R-10) before marking any phase complete. Full quality engine available. |
| **Recurring** | Ongoing monitoring, periodic updates, or maintenance tasks. | Design for repeatability (Q4). Define the cadence and what triggers each cycle. Build runbooks (Q2). |
| **Exploratory** | Marc is thinking out loud, brainstorming, or working through a problem. No defined deliverable yet. | Do NOT run Skill 0. Engage in collaborative dialogue. Help Marc refine the objective until it's ready for a formal intake. Then re-enter this protocol. |

**Exploratory mode exit signals:** Watch for Marc shifting from questioning to directing — statements like "Okay, let's do X," "I want to go with Y," or "Build me Z" signal the transition from exploration to a defined objective. When detected, confirm: "Sounds like we've landed on [X]. Ready to run formal intake?" If Marc confirms, re-enter the protocol at Step 1.

**Decision heuristic:**
- Can this be done in one response? → Single-turn
- Does this have 2+ distinct phases or deliverables? → Multi-phase
- Will this need to happen again? → Recurring
- Is Marc still figuring out what he wants? → Exploratory
- Does the request contain multiple distinct objectives with different execution modes? → Compound objective. Decompose into separate intakes. Present: "I see [N] distinct objectives here: [list]. Recommend running intake on each separately. Which should we start with?"

---

## Output: The Objective Brief

The output of this protocol is a structured brief that gets handed to Skill 0. Format:

**For simple objectives (Skill 0 Tier 1/2 expected):**
```
Objective Brief:
- Outcome: [1-2 sentences]
- Persona: [name or "none"]
- Skills: [list]
- Agent/Model: [default or specific routing]
- Mode: Single-turn

Proceeding to Skill 0.
```

**For complex objectives (Skill 0 Tier 3 expected):**
```
## Objective Brief

**Outcome framing:**
- Desired outcome: [1-2 sentences]
- Success signal: [1 sentence]
- Audience: [who]

**Persona:** [name + one-line rationale, or "None — general operations"]

**Skill activation:**
- [skill name] — [one-line rationale]
- [skill name] — [one-line rationale]

**Agent/Model routing:**
- [task] → [agent type] ([model])
- [task] → main agent (native)

**Execution mode:** [mode] — [one-line rationale]
[If multi-phase: rough phase sketch — not a full plan, just 2-4 phases named]

---
Recommend proceeding to Skill 0 with this context. Approve or adjust?
```

**Key principle:** For simple objectives, this entire protocol runs silently and produces a 4-line brief. For complex objectives, it surfaces the brief for Marc's approval before Skill 0 takes over. The complexity of the intake matches the complexity of the objective. Don't turn a 5-minute task into a 20-minute planning exercise.

---

## Presentation Tiers (Matching Skill 0's Pattern)

| Tier | When | What Marc Sees |
|------|------|---------------|
| **Silent** | Simple, low-stakes, obvious routing. Skill 0 would be Tier 1. | Nothing — Objective Intake runs internally, hands context to Skill 0, Skill 0 confirms intent in one sentence and executes. |
| **Light** | Medium complexity, but routing is fairly obvious. Skill 0 would be Tier 2. | 4-line brief (outcome, persona, skills, mode). "Proceeding to Skill 0." Marc can interrupt if something's off. |
| **Full** | High complexity, ambiguous domain, persona decision needed, multi-phase likely. Skill 0 would be Tier 3. | Full Objective Brief with all four sections. Explicit approval gate before Skill 0 fires. |

**Default to the lightest tier that still ensures accuracy.** If during intake you discover something that changes the trajectory (wrong persona, missing skill, misread execution mode), escalate to a heavier tier.

---

## Maintaining the Registry Tables

This skill contains two registry tables that grow over time:

1. **Persona Registry** (Step 2) — Add a row each time a new persona skill is created and saved.
2. **Skill Routing Table** (Step 3) — Add a row each time a new custom skill is created that requires explicit activation decisions.

**When to update:** After any new persona or custom skill is saved via `save_custom_skill`, update this skill's registry tables to include the new entry. This keeps the routing logic current without requiring Marc to manually maintain lookup tables.

**Staleness check:** Per L3, if a new persona or skill has been created but the registry tables haven't been updated, flag this during the next session bootstrap or CHECK protocol.

**Same-session awareness:** If a persona was created in the current session but the registry hasn't been updated yet, the AI should still be aware of it through conversation context. Don't let a stale registry table override what you know from the current session. Update the registry at end of session or before the next bootstrap.

---

## Constraints (from ops-framework)

- **D-02:** Present options, don't decide. The Objective Brief recommends; Marc approves.
- **D-09:** Portable and teachable. This protocol is simple enough for Marc to explain to anyone.
- **D-10:** No execution without approval. Complex objectives get an explicit approval gate.
- **R-04:** 70%+ substance ratio. This protocol is 4 steps, not 40. If the overhead exceeds the value, skip it.
- **R-19:** Next Step Anchor. The Objective Brief always ends with a clear "what happens next."

---

## Edge Cases

**Marc changes his mind mid-execution:**
If the objective shifts materially after Skill 0 has run, re-enter Objective Intake. Don't try to retrofit a new objective into the old brief. Fresh intake, fresh optimization.

**Objective spans multiple domains:**
If the objective crosses persona boundaries (e.g., AI infrastructure work that also involves marketing), recommend the primary domain's persona and note the secondary domain. Don't try to load two personas — personas are identity layers, and you can only be one identity at a time. The secondary domain's expertise can be covered by loading relevant platform skills without a full persona.

**Marc provides a fully specified objective:**
If Marc's raw request already contains outcome framing, specifies which persona/skills to use, and defines execution mode — don't re-derive what he's already given you. Confirm what he stated, fill any gaps, and pass through to Skill 0. Don't make Marc repeat himself.

**No persona exists and one should:**
If the objective is in a specialized domain where a persona would add clear value but none exists, flag it: "This workstream would benefit from a dedicated persona. Want to build one now, or proceed without?" If Marc says proceed, note the gap for future development. If Marc says build one, that becomes the immediate objective.

**Compound objectives:**
If a single request contains multiple distinct objectives (e.g., "create a diagram, write a memo, and set up a weekly check"), decompose into separate intakes. Present the list and let Marc prioritize which to tackle first. Each sub-objective gets its own brief. Don't try to force a compound request through a single intake — the persona, skills, and execution mode may differ for each part.

**Tier escalation mismatch:**
If Objective Intake runs at Light tier but Skill 0 later determines the task warrants Tier 3 (full optimization), Skill 0 handles its own escalation — it asks Marc directly for any missing context. Objective Intake does not need to re-run. The two systems operate in sequence, not in a loop.

---

## Complete Stack Flow (Updated)

```
Marc says "initialize"
    ↓
Session Bootstrap (reads ops files, searches memory, confirms readiness)
    ↓
Marc states objective
    ↓
OBJECTIVE INTAKE (this skill)
  Step 1: Outcome Framing → what does "done" look like?
  Step 2: Persona Selection → who should the AI be?
  Step 3: Skill Routing → what tools activate?
  Step 4: Agent/Model Routing → which model handles each piece?
  Step 5: Execution Mode → single-turn / multi-phase / recurring / exploratory?
    ↓
Objective Brief produced (silent / light / full based on complexity)
    ↓
Skill 0: Prompt Optimization (receives the contextualized objective)
  Steps 0-5: Classify → Extract Intent → Build Spec → Enhance → Calibrate → Assemble
    ↓
Marc reviews optimized prompt → "run"
    ↓
Execution (R-07 gate → Q1 → full stack)
    ↓
Quality Engine (audit, check)
```

---

*This skill is the orchestration layer between Marc's raw objective and the prompt optimization engine. It ensures every objective enters the system with clear outcome framing, the right identity, the right tools, and the right execution model. Per the design principle: minimal process for 90-95% coverage.*

---

## Calibration Note

This is v2.0 — updated March 10, 2026. After 2-3 sessions of real use, review:

1. **Are the tier boundaries calibrated correctly?** If Marc is seeing briefs on tasks that don't need them, the silent tier should absorb more cases. If important routing decisions are being made silently, the light tier needs to surface more.
2. **Is the Skill 0 handoff smooth?** Watch for redundant questioning — if Skill 0 is re-asking things the Objective Brief already covered, the handoff note isn't being applied.
3. **Is the overhead worth it?** If this protocol consistently adds value (catches wrong personas, routes to needed skills, prevents scope confusion), keep it. If it's rubber-stamping obvious decisions, tighten the skip conditions.

Adjust tier boundaries and skip conditions based on real-world usage, not theoretical complexity.

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Audit | PASSED | 2026-03-10 | AI | v2.0 upgrade — added Step 4 (Agent/Model Routing) |
| CHECK | NOT RUN | — | — | — |