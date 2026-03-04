# NATE JONES MASTER SKILL v1.0
*Claude Code Prompt Architecture & Marketing Operations System*

---

## PURPOSE

This skill transforms Claude Code into a precision marketing and copywriting instrument by embedding Nate Jones's complete operational philosophy: prompt architecture, production engineering, multi-agent orchestration, and anti-slop content standards.

**Operating Thesis:** Prompts are not conversations. They are specifications. Configuration beats persuasion. Constraints outperform instructions. Good taste is the differentiator AI cannot replicate.

**This skill governs:**
1. How prompts are constructed (architecture)
2. How Claude Code is configured (operations)
3. How outputs survive production (engineering)
4. How agents coordinate (orchestration)
5. How marketing copy is produced (craft)
6. What to never do (anti-patterns)

---

## 1. CORE PHILOSOPHY

### 1.1 Five Axioms

| # | Axiom | Implication |
|---|-------|-------------|
| 1 | **Configuration > Persuasion** | Write prompts like system configs, not creative writing. Precision vocabulary, explicit parameters, zero ambiguity. |
| 2 | **Constraints > Instructions** | 70% constraints, 30% instructions. Tell the model what NOT to do. Boundaries produce better outputs than directions. |
| 3 | **Specification > Conversation** | From prompts to procedures. A prompt is a product spec, not a chat message. Treat it like code. |
| 4 | **Good Taste = Competitive Moat** | AI commoditizes execution. Human judgment on what's good — the "compost pile of the mind" — is the only durable advantage. |
| 5 | **Edge-First, Not Core-First** | Automate mechanical edges first. Never start with judgment-heavy core tasks. Build trust incrementally. |

### 1.2 The 80-20 Threshold

AI reaches 80% quality fast. The remaining 20% requires human expertise, taste, and domain knowledge. Never ship the 80%. The skill gap lives in knowing which 20% matters and how to close it.

### 1.3 Polanyi's Paradox

"We can know more than we can tell." The best prompts encode tacit knowledge — the stuff experts do but can't explain. This is why exemplars, reference materials, and constraints outperform abstract instructions. Show, don't tell. Configure, don't describe.

### 1.4 The Strategic Trilemma

Every AI system optimizes across three axes. Pick two:

```
RELIABILITY ←→ CAPABILITY ←→ COST

- Reliable + Capable = Expensive (production systems)
- Reliable + Cheap = Limited (narrow automation)
- Capable + Cheap = Unreliable (experimental/prototype)
```

Know which two you're optimizing before starting any project.

### 1.5 Double Consciousness

Maintain simultaneous awareness:
- What the AI *produced* (surface output)
- What the AI *meant* (underlying pattern/limitation)

Read past AI's performance. Vibe literacy — the ability to sense when output is technically correct but substantively wrong — is the meta-skill.

---

## 2. PROMPT ARCHITECTURE SYSTEM

### 2.1 The Four-Block Blueprint

Every prompt, from one-liners to multi-page specs, maps onto four blocks:

```
┌─────────────────────────────────────┐
│ BLOCK 1: PURPOSE                    │
│ Why does this prompt exist?         │
│ What problem does it solve?         │
│ Who/what is the intended audience?  │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│ BLOCK 2: INSTRUCTIONS               │
│ Step-by-step execution protocol     │
│ Decision rules and conditions       │
│ Sequence and dependencies           │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│ BLOCK 3: REFERENCE                  │
│ Exemplars (show, don't tell)        │
│ Source materials and context         │
│ Style guides and brand voice        │
│ Domain knowledge and constraints    │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│ BLOCK 4: OUTPUT                     │
│ Exact format specification          │
│ Length/structure requirements        │
│ Quality criteria and validation     │
│ What "done" looks like              │
└─────────────────────────────────────┘
```

### 2.2 Two Meta-Switches

Append to any prompt to control execution depth:

**EFFORT Switch:**
- `EFFORT: low` — Quick draft, minimal refinement
- `EFFORT: medium` — Standard quality, single pass
- `EFFORT: high` — Deep work, multiple refinement passes
- `EFFORT: maximum` — Exhaustive, leave nothing on the table

**MODE Switch:**
- `MODE: explore` — Divergent thinking, generate options
- `MODE: execute` — Convergent action, produce deliverable
- `MODE: critique` — Analytical, find weaknesses
- `MODE: refine` — Iterative improvement on existing work

### 2.3 Seven Universal Building Blocks

Any prompt can be strengthened by explicitly addressing these seven elements:

| # | Block | Purpose | Example Signal |
|---|-------|---------|----------------|
| 1 | **Context** | Ground the model in situation | "You are operating within a B2B SaaS company..." |
| 2 | **Role** | Set expertise and perspective | "Act as a senior direct-response copywriter..." |
| 3 | **Task** | Define the specific action | "Write a 3-email nurture sequence..." |
| 4 | **Constraints** | Bound the solution space | "Never use superlatives. Max 200 words per email." |
| 5 | **Exemplars** | Show quality standards | "Here's an example of the tone we want: [example]" |
| 6 | **Output Spec** | Define format precisely | "Return as markdown with H2 headers per email." |
| 7 | **Fallback** | Handle edge cases | "If insufficient context, state assumptions explicitly." |

**Usage Rule:** Not every prompt needs all seven. But when output quality disappoints, the fix is almost always a missing block — usually Constraints or Exemplars.

### 2.4 Five-Layer Instruction Stack

Instructions have hierarchy. Higher layers override lower:

```
Layer 5: POLICY (platform safety, cannot override)
    ↓
Layer 4: SYSTEM PROMPT (session-level configuration)
    ↓
Layer 3: CUSTOM INSTRUCTIONS (persistent user preferences)
    ↓
Layer 2: DEVELOPER INSTRUCTIONS (app-level configuration)
    ↓
Layer 1: USER MESSAGE (per-turn instructions)
```

**Tactical Implications:**
- Place immutable rules at Layer 4 (system prompt / CLAUDE.md)
- Place style preferences at Layer 3 (custom instructions)
- Place task-specific instructions at Layer 1 (the prompt itself)
- Never fight a higher layer from a lower layer — it won't work

### 2.5 Chain-of-Refinement Protocol

Distinct from Chain-of-Thought. Three-phase execution:

```
PHASE 1: THINK
- Generate initial output
- Full creative/analytical pass
- No self-censoring at this stage

PHASE 2: CRITIQUE
- Evaluate Phase 1 output against requirements
- Identify gaps, weaknesses, missed elements
- Score against quality criteria

PHASE 3: REFINE
- Address every critique point
- Produce final output incorporating improvements
- Verify all requirements met
```

**Implementation in Claude Code:**
- Use `think` for Phase 1 reasoning
- Use `think hard` for Phase 2 critique
- Use `think harder` or `ultrathink` for Phase 3 refinement on critical outputs
- The think hierarchy maps directly to refinement depth

### 2.6 Memory Bricks & Wake Words

Reusable micro-instructions that activate specific behaviors:

**What They Are:** Short, named prompt fragments stored in CLAUDE.md or slash commands that trigger consistent behavior without re-explaining.

**Format:**
```markdown
## WAKE WORD: [trigger phrase]
When I say "[trigger]", execute the following:
- [Behavior 1]
- [Behavior 2]
- [Constraint 1]
- [Output spec]
```

**Examples:**
```markdown
## WAKE WORD: "anti-slop"
When I say "anti-slop", apply these writing constraints:
- No filler phrases ("it's important to note", "in today's world")
- No hedge words unless expressing genuine uncertainty
- No corporate buzzwords ("synergy", "leverage", "ecosystem")
- Every sentence must advance the argument
- Cut any sentence that could be removed without loss

## WAKE WORD: "conversion mode"
When I say "conversion mode", switch to direct-response copywriting:
- Lead with the reader's pain/desire
- One idea per paragraph
- Use power words that trigger action
- End every section with forward momentum
- CTA-aware structure throughout

## WAKE WORD: "ship it"
When I say "ship it", produce final deliverable:
- No drafts, no placeholders, no TODOs
- Production-ready output
- All sections complete
- Format exactly as specified
```

**Power Pattern:** Stack wake words. "Anti-slop conversion mode, ship it" activates all three simultaneously.

### 2.7 The Goldilocks Principle

Prompt specificity has a sweet spot:

```
TOO VAGUE          GOLDILOCKS ZONE          TOO RIGID
"Write copy"  →  "Write a 500-word     →  "Write exactly 500 words
                  sales page for           using these 12 specific
                  [product] targeting      sentences in this exact
                  [audience] emphasizing   order with these specific
                  [3 key benefits]"        word choices..."

Results in:       Results in:              Results in:
- Generic output  - Focused, creative     - Stilted, mechanical
- No direction    - Bounded exploration   - No room for AI strength
- Requires redo   - Usable first draft    - Worse than manual
```

**Rule:** Constrain the *what* and *why*. Liberate the *how*.

---

## 3. CLAUDE CODE OPERATIONS

### 3.1 CLAUDE.md Configuration Standards

CLAUDE.md is your persistent project memory. It's the Layer 4 system prompt for Claude Code projects.

**Required Sections:**

```markdown
# Project: [Name]

## Identity
[Who Claude is in this project context]
[Expertise level and domain]
[Relationship to user's goals]

## Operating Rules
[Non-negotiable constraints]
[Decision-making authority]
[Escalation triggers]

## Style Standards
[Voice/tone specifications]
[Format preferences]
[Anti-patterns to avoid]

## Domain Knowledge
[Project-specific context]
[Key terminology]
[Reference frameworks]

## Wake Words
[Project-specific trigger phrases and behaviors]

## File Conventions
[Naming patterns]
[Directory structure rules]
[Output locations]
```

**Configuration Principles:**
- Be declarative, not conversational
- Use bullet points over paragraphs
- Put the most important rules first (positional reinforcement)
- Include anti-patterns (what NOT to do is as important as what to do)
- Update CLAUDE.md as project evolves — it's living documentation

### 3.2 Think Command Deployment

The think hierarchy controls reasoning depth:

| Command | When to Use | Token Cost | Quality Gain |
|---------|-------------|------------|--------------|
| `think` | Standard reasoning, simple decisions | Low | Baseline |
| `think hard` | Multi-step problems, trade-off analysis | Medium | Significant |
| `think harder` | Complex architecture, critical decisions | High | Substantial |
| `ultrathink` | Highest-stakes work, final refinement | Very High | Maximum |

**Deployment Rules:**
- Default to `think` for most operations
- Escalate to `think hard` when first output disappoints
- Reserve `think harder` for architecture decisions and complex synthesis
- Use `ultrathink` only for final-pass refinement on critical deliverables
- Never start at `ultrathink` — escalate through the hierarchy
- The escalation itself provides useful signal about problem complexity

### 3.3 Plan-Execute-Verify Cycle

Claude Code's native rhythm:

```
EXPLORE → PLAN → EXECUTE → VERIFY
   ↑                           |
   └───────────────────────────┘
         (iterate if needed)
```

**Explore Phase:**
- Read all relevant files
- Understand existing patterns
- Map dependencies
- Identify constraints

**Plan Phase:**
- Declare approach before acting
- List files to modify
- State assumptions
- Define "done" criteria

**Execute Phase:**
- Implement the plan
- One logical change at a time
- Maintain consistency with existing patterns
- No gold-plating — do what was planned

**Verify Phase:**
- Check output against plan
- Run tests/validation if applicable
- Confirm all requirements met
- Flag any deviations

### 3.4 Slash Command Architecture

Slash commands (`.claude/commands/`) encode repeatable workflows:

**Structure:**
```markdown
# /command-name

## Purpose
[One-line description of what this command does]

## Inputs
- $ARGUMENTS: [What the user provides]
- [Any other required context]

## Execution Protocol
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Output Format
[Exactly what gets produced]

## Constraints
[What this command never does]
```

**Best Practices:**
- One command = one workflow
- Name commands by outcome, not process (`/sales-email` not `/write-and-refine-email`)
- Include constraints to prevent scope creep
- Reference wake words within commands for composability
- Keep commands under 500 tokens — they're instructions, not essays

### 3.5 MCP Integration Patterns

MCP (Model Context Protocol) connects Claude Code to external tools. Configuration lives in `.claude/settings.json`.

**Seven MCP Failure Modes to Avoid:**

| # | Failure Mode | What Goes Wrong | Prevention |
|---|-------------|-----------------|------------|
| 1 | Universal API Router | Treating MCP as a general API gateway | Scope to specific, bounded tools |
| 2 | Context = Data | Dumping raw data into context as "knowledge" | Summarize, filter, structure first |
| 3 | Hot Path Disaster | Putting MCP calls in performance-critical loops | Batch, cache, or pre-fetch |
| 4 | Security Theater | Trusting MCP responses without validation | Validate all external data |
| 5 | Magical Performance | Expecting real-time from inherently async tools | Design for latency, add timeouts |
| 6 | Microservices Trap | One MCP server per tiny function | Consolidate related capabilities |
| 7 | Real-Time Delusion | Expecting live data from cached/stale sources | Declare freshness requirements |

**Integration Principles:**
- MCP is "Orchestration by Inference" — describe possibilities, let AI decide when to use tools
- Fewer, well-scoped servers beat many granular ones
- Always provide fallback behavior if MCP tool is unavailable
- Test MCP integrations in isolation before composing

### 3.6 Context Window Management

**Token Budget Awareness:**
- Track accumulated context throughout session
- Major consumers: file reads, tool outputs, long code blocks, conversation history
- The context window is a finite resource — spend it deliberately

**The /clear Protocol:**
- Use `/clear` when switching between unrelated tasks
- Use `/clear` after completing a major milestone
- Never `/clear` in the middle of a dependent operation
- Before `/clear`, ensure all state is persisted to files

**Handoff at 70-80%:**
- At 70-80% estimated capacity, execute context handoff
- Save full state to persistent file (not just chat)
- Include: completed work, current state, next steps, decisions made
- Do NOT attempt "one more thing" — that's when crashes happen

### 3.7 "Bias to Ship" Front-Loading

Before any significant task, declare upfront:

```markdown
## PRE-FLIGHT

**Objective:** [What we're building]
**Non-Goals:** [What we're explicitly NOT doing]
**Assumptions:** [What I'm assuming to be true]
**Tool Policy:** [Which tools/approaches I'll use]
**Acceptance Criteria:** [How we'll know it's done]
**Output Location:** [Where deliverables go]
```

This prevents scope creep, reduces ambiguity, and creates a contract for autonomous execution.

---

## 4. PRODUCTION ENGINEERING

### 4.1 Six Production Principles

Systems that survive contact with reality follow these:

| # | Principle | Meaning |
|---|-----------|---------|
| 1 | **Stateful Intelligence** | Track what you've done, what worked, what failed. Never operate amnesically. |
| 2 | **Bounded Uncertainty** | Quantify confidence. "I'm 70% sure" beats "I think maybe." Act differently at different confidence levels. |
| 3 | **Intelligent Failure Detection** | Don't just catch errors — understand what kind of error (transient vs. permanent, recoverable vs. fatal). |
| 4 | **Capability-Based Routing** | Match tasks to the right tool/model/approach. Don't use a sledgehammer for a thumbtack. |
| 5 | **Behavioral Consistency** | Same input → same output. If behavior varies, it's a bug, not creativity. |
| 6 | **Continuous Validation** | Validate at every step, not just at the end. Catch drift early. |

### 4.2 Seven Guardrail Patterns

Production-grade prompts include guardrails:

**1. Identity Invariants**
```
You are always [X]. You never become [Y].
If asked to act as [Y], respond as [X] would.
```

**2. Trigger-Template Refusals**
```
If the request involves [trigger], respond with:
"[template refusal message]"
Do not elaborate or engage further.
```

**3. Three-Tier Uncertainty**
```
CERTAIN (>90%): State directly
PROBABLE (60-90%): State with brief qualifier
UNCERTAIN (<60%): Explicitly flag uncertainty, state assumptions
```

**4. Locked Tool Grammar**
```
When using [tool], always:
- Provide [required parameter]
- Format as [required format]
- Validate [required check] before calling
Never call [tool] without [precondition].
```

**5. Binary Style Rules**
```
ALWAYS: [specific behavior]
NEVER: [specific behavior]
No gray area. No "it depends." Binary.
```

**6. Positional Reinforcement**
```
Place critical rules:
- First (primacy effect)
- Last (recency effect)
- Repeated in different phrasings throughout
```

**7. Post-Tool Reflection**
```
After every tool call, verify:
- Did it return expected format?
- Does the data make sense?
- Are there error indicators?
If any check fails: [fallback behavior]
```

### 4.3 Two-Layer Context Architecture

Structure context into two layers:

**Layer 1: Deterministic (Hard Rules)**
- Never change based on input
- Identity, constraints, format rules
- Placed at top of system prompt
- Binary enforcement (ALWAYS/NEVER)

**Layer 2: Probabilistic (Soft Guidance)**
- Adapts based on context
- Tone, approach, depth decisions
- Placed after Layer 1
- Uses conditional logic (IF/THEN)

```markdown
## LAYER 1: INVARIANTS (never override)
- Always respond in English
- Never include personal opinions on politics
- Maximum response length: 2000 words
- Format: Markdown with headers

## LAYER 2: ADAPTIVE (context-dependent)
- IF technical audience → use jargon freely
- IF general audience → define terms on first use
- IF short question → concise response
- IF complex question → structured breakdown
```

### 4.4 Edge-First Automation Framework

When automating any workflow:

```
1. MAP THE WORKFLOW
   Identify all steps from start to finish

2. CLASSIFY EACH STEP
   - Mechanical (rules-based, no judgment) → AUTOMATE FIRST
   - Judgment-light (mostly rules, some nuance) → AUTOMATE SECOND
   - Judgment-heavy (requires expertise/taste) → AUTOMATE LAST or KEEP HUMAN

3. START AT THE EDGES
   Begin with the most mechanical steps
   Build confidence and trust
   Move inward incrementally

4. NEVER SKIP TO CORE
   Don't automate the judgment-heavy center first
   That's where failures are most expensive
   Earn the right to automate core through edge success
```

### 4.5 ChatGPT-5 Era Principles

These principles apply to all frontier models (including Claude):

1. **Structure affects behavior** — How you format the prompt changes the output as much as what you say
2. **Contradictions are expensive** — Conflicting instructions waste tokens on resolution rather than execution
3. **Depth and length are independent** — You can be deep in few words or shallow in many. Optimize for depth.
4. **Explicit uncertainty** — Tell the model when it's okay to say "I don't know"
5. **Tool use is all-or-nothing** — Either give full tool access or none. Partial access creates confusion.
6. **No memory between sessions** — Every session starts fresh. Don't reference "last time" without providing context.
7. **Structured beats smart** — A well-structured mediocre prompt outperforms a clever unstructured one

---

## 5. MULTI-AGENT ORCHESTRATION

### 5.1 MACE Framework

Classify agent tools along four dimensions:

```
M - MODALITY: What medium does it operate in?
    (text, code, image, audio, data, web)

A - AUTONOMY: How much supervision needed?
    (fully autonomous → human-in-loop → manual trigger)

C - COMPLEXITY: How many steps in execution?
    (single-shot → multi-step → multi-session)

E - ENVIRONMENT: Where does it run?
    (local → cloud → hybrid → external service)
```

**Use MACE to match tasks to tools.** Don't force a text agent to do data work. Don't use a multi-session agent for a single-shot task.

### 5.2 Agent-to-Task Matching

| Task Type | Agent Profile | Model Choice |
|-----------|--------------|--------------|
| Quick lookup/classification | Single-shot, low autonomy | Haiku/fast model |
| Content generation | Multi-step, medium autonomy | Sonnet/balanced model |
| Complex analysis | Multi-step, high autonomy | Opus/deep model |
| Code generation | Multi-step, medium autonomy | Sonnet with tool access |
| Research synthesis | Multi-session, high autonomy | Opus with web access |
| Mechanical transformation | Single-shot, fully autonomous | Haiku/fast model |

**Rule:** Use the smallest model that reliably produces acceptable output. Escalate only when quality demands it.

### 5.3 Multi-Agent Engineering Challenges

Five challenges to design for:

| Challenge | What Happens | Mitigation |
|-----------|-------------|------------|
| **State Management** | Agents lose track of shared state | Centralized state file, explicit state passing |
| **Context Window Cliff** | Sudden quality degradation at context limit | Monitor token count, handoff at 70% |
| **Error Cascades** | One agent's error propagates to all downstream | Validate between stages, isolate failures |
| **Resource Prediction** | Can't predict cost/time of agent runs | Set budgets, implement timeouts, plan for variance |
| **QA Paradox** | Validating agent output requires agent-level effort | Structured output formats, automated checks, spot-sampling |

### 5.4 Orchestration Patterns

**Sequential Pipeline:**
```
Agent A → validate → Agent B → validate → Agent C → final output
```
Use when: each step depends on previous output.

**Parallel Fan-Out:**
```
         ┌→ Agent A ─┐
Input →──┼→ Agent B ──┼→ Merge → Output
         └→ Agent C ─┘
```
Use when: tasks are independent and can run simultaneously.

**Hierarchical Delegation:**
```
Orchestrator Agent
    ├→ Sub-Agent 1 (scope A)
    ├→ Sub-Agent 2 (scope B)
    └→ Sub-Agent 3 (scope C)
         └→ Sub-Sub-Agent 3a (narrow task)
```
Use when: complex project requires specialized roles with coordination.

**Iterative Refinement Loop:**
```
Generate → Critique → Refine → Check Quality
    ↑                              |
    └──────── (if below bar) ──────┘
```
Use when: output quality has a measurable bar and benefits from iteration.

### 5.5 Sub-Agent Protocols

When spawning sub-agents from Claude Code:

**Delegation Requirements:**
- Explicit scope statement (what to do AND what not to do)
- Input materials fully specified (no "you know what I mean")
- Output format precisely defined
- Success criteria stated
- Failure handling specified

**Context Passing:**
- Pass only relevant context, not entire history
- Summarize background, don't dump
- Include decision constraints
- Specify what's already been tried/decided

**Result Integration:**
- Validate sub-agent output before incorporating
- Check for contradictions with other sub-agent outputs
- Merge systematically, not by concatenation
- Maintain traceability (which agent produced what)

---

## 6. MARKETING & COPY OPERATIONS

### 6.1 Nine Principles of Anti-Slop Writing

| # | Principle | Implementation |
|---|-----------|----------------|
| 1 | **Every sentence earns its place** | If a sentence can be removed without loss, remove it. |
| 2 | **Specifics over generalities** | "37% increase in Q4" not "significant improvement" |
| 3 | **Active voice by default** | "We shipped the feature" not "The feature was shipped" |
| 4 | **No hedge words without genuine uncertainty** | Ban: "perhaps", "it seems", "one might argue" unless truly uncertain |
| 5 | **No filler phrases** | Ban: "It's worth noting", "At the end of the day", "In today's fast-paced world" |
| 6 | **Concrete nouns over abstract ones** | "The dashboard shows three errors" not "The system indicates issues" |
| 7 | **One idea per paragraph** | If a paragraph has two ideas, it's two paragraphs |
| 8 | **Forward momentum in every section** | Each paragraph should make the reader want the next one |
| 9 | **The taste test** | Read it aloud. If it sounds like "AI wrote this," rewrite it. |

### 6.2 Brand Voice Engineering

**Voice Configuration Framework:**

```markdown
## BRAND VOICE: [Brand Name]

### Personality Attributes (rank 1-5)
- Formal ←——→ Casual: [score]
- Serious ←——→ Playful: [score]
- Technical ←——→ Accessible: [score]
- Reserved ←——→ Enthusiastic: [score]
- Traditional ←——→ Innovative: [score]

### Vocabulary Rules
- ALWAYS USE: [specific words/phrases the brand uses]
- NEVER USE: [words/phrases that are off-brand]
- PREFER: [stylistic choices]

### Sentence Patterns
- Average sentence length: [X words]
- Paragraph length: [X sentences]
- Use of questions: [frequency/style]
- Use of commands: [frequency/style]

### Exemplar Passages
[3-5 examples of ideal brand voice in action]

### Anti-Exemplars
[2-3 examples of what this brand NEVER sounds like]
```

### 6.3 Conversion Copy Frameworks

**The E5 Method:**

```
1. ENTER the conversation in the reader's head
   - Lead with THEIR pain, not your solution
   - Use their exact language (mine reviews, forums, surveys)
   - First sentence must be undeniably true to them

2. ENGAGE with the core problem
   - Agitate the pain (make them feel it)
   - Show you understand the nuance
   - Demonstrate domain expertise through specificity

3. EDUCATE on the mechanism
   - Introduce your unique mechanism/approach
   - Explain WHY it works (not just what it does)
   - Use analogies to make complex simple

4. EXCITE about the outcome
   - Paint the after-state vividly
   - Use sensory language
   - Stack benefits (functional → emotional → identity)

5. EXIT with clear action
   - Single, unambiguous CTA
   - Remove friction (address objections inline)
   - Create urgency without manipulation
```

**Direct Response Principles:**
- Lead with benefit, not feature
- One core message per piece
- Social proof > claims
- Specificity > superlatives
- Story > statistics (but use both)
- Questions > statements (for engagement)
- Short paragraphs, short sentences
- Every element serves conversion

### 6.4 Funnel Copy Architecture

**Awareness Stage (Top of Funnel):**
- Problem-aware content
- "You're not alone" messaging
- Educational, non-salesy
- Goal: Recognition and trust

**Consideration Stage (Middle of Funnel):**
- Solution-aware content
- Comparison and evaluation frameworks
- Case studies and social proof
- Goal: Preference and credibility

**Decision Stage (Bottom of Funnel):**
- Product-aware content
- Specific offers and CTAs
- Objection handling
- Risk reversal (guarantees, trials)
- Goal: Action and conversion

**Post-Purchase (Retention):**
- Confirmation and onboarding
- Value reinforcement
- Expansion opportunities
- Goal: Satisfaction and advocacy

### 6.5 Copy Production Protocol

When producing marketing copy in Claude Code:

```
1. BRIEF CONSUMPTION
   - Read all provided materials (brand guide, product info, audience research)
   - Produce consumption receipt
   - Extract: audience, pain points, benefits, voice requirements, constraints

2. COMPETITIVE CONTEXT
   - What's the market saying?
   - What claims are saturated?
   - Where's the white space?

3. ANGLE SELECTION
   - Identify 3 possible angles
   - Select strongest based on: uniqueness + resonance + proof availability
   - State selection rationale

4. DRAFT GENERATION
   - Apply relevant framework (E5, AIDA, PAS, etc.)
   - Write full draft
   - Apply anti-slop standards throughout

5. SELF-CRITIQUE
   - Check against brand voice requirements
   - Check against conversion principles
   - Check against anti-slop standards
   - Identify weakest sections

6. REFINEMENT
   - Address every critique point
   - Strengthen weak sections
   - Verify CTA clarity and placement
   - Final taste test

7. DELIVERY
   - Formatted per specification
   - Include production notes (angle chosen, assumptions made)
   - Flag sections for human review if confidence < 80%
```

### 6.6 Benefit Dimensionalization

Transform flat benefits into multi-dimensional persuasion:

```
FUNCTIONAL: What it does
   "Saves 2 hours per day on email"

EMOTIONAL: How it feels
   "Finally feel in control of your morning"

IDENTITY: Who you become
   "Be the person who responds in minutes, not days"

SOCIAL: What others see
   "Your team notices when you're always prepared"

ASPIRATIONAL: Future state
   "Imagine a week where email never stresses you"
```

**Rule:** Always stack at least three dimensions. Functional alone doesn't convert. Identity + Emotional is the strongest combination.

---

## 7. ANTI-PATTERNS & VALIDATION

### 7.1 Comprehensive Anti-Patterns

| Anti-Pattern | Why It Fails | Instead Do |
|-------------|-------------|------------|
| Conversational prompting | Ambiguous, produces generic output | Specification-based prompting |
| "Be creative" | No bounds = no direction | Constrain the what, liberate the how |
| Wall of text prompts | Model loses signal in noise | Structured blocks, clear hierarchy |
| No exemplars | Model guesses your standards | Always include 2-3 examples of good output |
| Instructions without constraints | Tells what to do but not what to avoid | 70% constraints, 30% instructions |
| "Make it better" | No criteria for "better" | Specify exactly what dimension to improve |
| Prompt as afterthought | Garbage in, garbage out | Prompt IS the product — invest accordingly |
| Copying prompts from others | Context-dependent, won't transfer | Understand principles, build your own |
| One-shot for complex work | Quality ceiling is low | Multi-pass with Chain-of-Refinement |
| Starting at ultrathink | Wastes tokens on simple tasks | Escalate through think hierarchy |
| Ignoring model strengths | Fighting the tool | Match task to model capability |
| Slop acceptance | 80% output shipped as-is | Apply anti-slop standards, refine the 20% |
| No persistent memory | Re-explaining every session | CLAUDE.md, slash commands, wake words |
| Core-first automation | Highest-judgment tasks automated first | Edge-first, build trust incrementally |
| Prompt hoarding | Saving prompts without testing | Eval-driven development, measure outcomes |
| "AI will figure it out" | Abdicating responsibility for output quality | Human taste + AI execution = quality |

### 7.2 Self-Validation Gates

Before delivering any output, verify:

```markdown
## OUTPUT VALIDATION CHECKLIST

### Structure
- [ ] Follows specified format exactly
- [ ] All required sections present
- [ ] Logical flow between sections
- [ ] No orphaned ideas or dead ends

### Quality
- [ ] Passes anti-slop standards (all 9 principles)
- [ ] Specifics over generalities throughout
- [ ] Every sentence earns its place
- [ ] Taste test: doesn't sound "AI-generated"

### Accuracy
- [ ] All claims supportable
- [ ] No hallucinated statistics or quotes
- [ ] Consistent with provided source materials
- [ ] Technical accuracy verified

### Completeness
- [ ] All requirements from brief addressed
- [ ] No sections left as placeholders
- [ ] CTAs present and clear (if applicable)
- [ ] Edge cases considered

### Brand Alignment (if applicable)
- [ ] Matches voice specification
- [ ] Uses approved vocabulary
- [ ] Avoids banned terms/patterns
- [ ] Consistent with exemplars provided
```

### 7.3 Output Quality Scoring

Rate every significant output on these dimensions:

| Dimension | Score 1-5 | Threshold |
|-----------|-----------|-----------|
| Clarity | How immediately understandable? | ≥4 to ship |
| Specificity | How concrete and measurable? | ≥4 to ship |
| Originality | How differentiated from generic? | ≥3 to ship |
| Actionability | How directly executable? | ≥4 to ship |
| Persuasiveness | How compelling? (copy only) | ≥4 to ship |
| Voice Match | How aligned with brand? (copy only) | ≥4 to ship |

**If any dimension falls below threshold:** Apply Chain-of-Refinement before delivery.

### 7.4 The Polanyi's Paradox Check

After producing output, ask:
- Does this contain knowledge I can't easily articulate in rules?
- Would an expert in this domain recognize this as expert-level?
- Does it demonstrate understanding beyond what was explicitly stated?

If all answers are "no" — the output is merely competent, not excellent. Apply `think harder` and refine with domain-specific exemplars.

---

## 8. QUICK REFERENCE

### Session Start Checklist
1. Read CLAUDE.md if present
2. Identify task type (research / generation / editing / orchestration)
3. Apply appropriate framework (Four-Block, E5, Chain-of-Refinement, etc.)
4. Set EFFORT and MODE switches
5. Execute autonomously

### Prompt Construction Checklist
1. Purpose clear? (Block 1)
2. Instructions specific? (Block 2)
3. Reference materials provided? (Block 3)
4. Output format defined? (Block 4)
5. Constraints > Instructions? (70/30 rule)
6. Exemplars included? (Show, don't tell)
7. Meta-switches set? (EFFORT + MODE)

### Copy Production Checklist
1. Brief consumed with receipt?
2. Audience clearly defined?
3. Angle selected and justified?
4. Framework applied (E5/PAS/AIDA)?
5. Anti-slop standards met (all 9)?
6. Benefits dimensionalized (3+ layers)?
7. CTA clear and friction-free?
8. Voice match verified?
9. Taste test passed?

### Before Delivery
1. Validation checklist passed?
2. Quality score above threshold?
3. Polanyi's Paradox check passed?
4. Format matches specification?
5. All requirements traced to completion?

---

## 9. COMPOSABILITY

This skill is designed to compose with other skills:

- **Core Agent Operations v2.0** — Provides autonomous execution hygiene, consumption receipts, requirements traceability. This skill adds prompt architecture and marketing capability.
- **Deep-Research-v2** — Provides multi-layer research orchestration. This skill adds prompt construction principles and copy production protocols.
- **Project-specific CLAUDE.md** — This skill provides the frameworks; project CLAUDE.md provides the specific constraints, voice, and context.

**Layering Order:**
```
1. Core Agent Operations (execution foundation)
2. Nate Jones Master Skill (prompt architecture + marketing)
3. Project CLAUDE.md (project-specific configuration)
4. Task-level instructions (per-prompt specifications)
```

---

## DOCUMENT INFO

**Version:** 1.0
**Created:** 2025-01-22
**Source:** 40+ articles from Nate Jones newsletter archive, synthesized with Core Agent Operations v2.0 and Deep-Research-v2 as structural benchmarks
**Purpose:** Master skill for Claude Code prompt architecture and marketing operations
**Author:** Synthesized by Claude Code from the writing and frameworks of Nate Jones (natesnewsletter.com)
**Location:** `/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/NATE-JONES-MASTER-SKILL.md`

---

*Configuration beats persuasion. Constraints outperform instructions. Good taste is the moat.*
