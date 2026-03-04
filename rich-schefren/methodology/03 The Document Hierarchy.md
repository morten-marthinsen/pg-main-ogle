# The Document Hierarchy

## What to Write, When to Write It, and Why

---

## The Principle

Documents are not bureaucracy. Documents are externalized thinking.

When you write something down, you discover what you don't know. You find the gaps. You expose the assumptions. You create something that can be reviewed, refined, and handed off.

The strategic entrepreneur uses documents to think at scale—to make the invisible visible, to make the complex manageable, and to make the implicit explicit.

But not all documents are created equal. Different levels of the Translation Stack require different documents. Using the wrong document at the wrong level creates confusion rather than clarity.

---

## The Document Hierarchy

| Level | Document | Purpose | When Created | When Updated |
|-------|----------|---------|--------------|--------------|
| Vision | Vision Document | Define the transformed state | Once per major initiative | Rarely; only when vision evolves |
| Architecture | System Architecture Map | Show all systems and their relationships | Once at start of initiative | When strategy shifts or new systems emerge |
| Capability | Capability Map | Define what each system must do | Once per system | When capabilities are added or refined |
| Specification | PRD | Specify exactly what to build | Before each build session | Refined until complete; archived after build |
| Implementation | CLAUDE.md | Project context for AI | After each build | After each build or significant change |

---

## Level 1: Vision Document

**Purpose:** Define the transformed state you're working toward.

**What It Is:**

A short document (one page maximum, often one paragraph) that describes not what you're building, but what becomes possible when it exists.

**What It Contains:**

1. **The Transformed State** - What does the world look like when this exists? Not features—outcomes.
2. **The Why** - Why does this matter? What problem does it solve? What opportunity does it unlock?
3. **The Test** - How will you know you've achieved it? Not metrics—felt experience.

**What It Does NOT Contain:**

- Features
- Technical details
- Timelines
- How things work

**Example:**

> **Second Brain Vision**
>
> I have perfect recall across every conversation, decision, framework, and insight from my entire business history. Nothing is ever lost. Everything compounds.
>
> When I need information, it surfaces—either because I asked or because the system knew I'd need it. I never wonder "didn't I think about this before?" because the answer is always available.
>
> My thinking extends beyond the limits of biological memory. Ideas from five years ago connect to conversations from yesterday. Patterns across decades become visible. The cumulative weight of my experience is finally accessible.
>
> I'll know this is working when I stop saying "I know I thought about this somewhere" and start saying "here's what I've learned about this over time."

**The Test for Completeness:**

Can someone read this and understand what you're trying to achieve, without knowing anything about how you'll achieve it? If they can only understand it by knowing the implementation, it's not a Vision—it's a feature description.

**When to Write:**

At the very beginning of a major initiative. Before anything else.

**When to Update:**

Rarely. A Vision that changes frequently was never a Vision. If you're updating often, you were writing at the wrong level. True Visions are stable—they describe where you're going, not how you'll get there.

---

## Level 2: System Architecture Map

**Purpose:** Show all systems and how they relate to each other.

**What It Is:**

A map (visual or textual) that shows every major system in your infrastructure and the relationships between them.

**What It Contains:**

1. **Systems List** - Every major system, existing or planned
2. **Relationships** - What connects to what
3. **Flows** - What moves between systems (data, triggers, dependencies)
4. **Boundaries** - What's inside each system, what's outside
5. **Sequence** - What must exist before other things can work (dependencies)

**What It Does NOT Contain:**

- Feature details
- How each system works internally
- Technical implementation specifics

**Structure Options:**

*Option A: Visual Map*
A diagram showing systems as nodes and relationships as edges. Include labels on the edges to show what flows between systems.

*Option B: Textual Map*
A structured document with:
- List of all systems with one-line descriptions
- Relationship matrix or list
- Data flow descriptions
- Dependency sequence

**Example (Textual):**

> **Rich Schefren AI Infrastructure - Architecture Map**
>
> **Systems:**
> 1. **Second Brain** - Knowledge capture, storage, and retrieval
> 2. **The Arena** - Webinar content creation and optimization
> 3. **Content Production** - Long-form content creation and publishing
> 4. **Client Delivery** - Training and program delivery systems
> 5. **Team Knowledge Base** - Team-accessible documentation and SOPs
> 6. **Decision Support** - Data and insights for strategic decisions
>
> **Relationships:**
> - Second Brain → Arena: Frameworks and historical insights feed webinar creation
> - Second Brain → Content Production: Past content and thinking inform new content
> - Second Brain → Decision Support: Historical context for current decisions
> - Arena → Content Production: Webinar content repurposed for articles
> - Client Delivery → Second Brain: Client interactions captured as knowledge
> - Team Knowledge Base ← Second Brain: Selected knowledge published for team
>
> **Dependencies:**
> - Second Brain is foundational—most systems depend on it
> - Arena requires Second Brain to function optimally
> - Decision Support requires Second Brain and business data sources
>
> **Boundaries:**
> - Second Brain handles capture and retrieval; it doesn't create content
> - Arena handles webinar creation; it doesn't handle delivery
> - Content Production handles creation; distribution is separate

**The Test for Completeness:**

Could someone understand how all your systems fit together without knowing the details of any one system? If they need to understand the internals to see the architecture, you've gone too detailed.

**When to Write:**

After the Vision Document, before any Capability Maps. The Architecture shows the whole board before you optimize any piece.

**When to Update:**

- When a new system is added
- When relationships between systems change
- When strategy shifts require restructuring
- NOT for internal changes to a single system (those belong in Capability Maps)

---

## Level 3: Capability Map

**Purpose:** Define what a specific system must be able to do.

**What It Is:**

A document that lists all capabilities of a single system, framed as jobs to be done rather than features.

**What It Contains:**

1. **Capability List** - What jobs must this system perform?
2. **For Each Capability:**
   - Inputs required
   - Outputs produced
   - Dependencies on other capabilities
   - How it serves other systems (from Architecture)
3. **Capability Relationships** - Which capabilities enable which

**What It Does NOT Contain:**

- How capabilities will be implemented
- Feature specifications
- Technical details

**Structure:**

```
# [System Name] Capability Map

## Overview
[One paragraph on what this system is and its role in the Architecture]

## Capabilities

### Capability 1: [Name as a Job]
- **Description:** [What this capability does, stated as an outcome]
- **Inputs:** [What it needs to perform this job]
- **Outputs:** [What it produces]
- **Depends On:** [Other capabilities that must exist first]
- **Serves:** [Other systems or capabilities that use this output]

### Capability 2: [Name as a Job]
...

## Capability Dependencies
[Visual or textual representation of which capabilities depend on which]

## Architecture Integration
[How this system's capabilities serve the larger Architecture]
```

**Example:**

> **Second Brain Capability Map**
>
> **Overview:**
> The Second Brain is the foundational knowledge layer of the AI infrastructure. It captures, retains, and surfaces information from across the business, making institutional memory accessible and useful.
>
> **Capabilities:**
>
> ### Capability 1: Capture
> - **Description:** Ingest information from any source without friction
> - **Inputs:** Conversations, documents, notes, audio, external content
> - **Outputs:** Structured, indexed knowledge artifacts
> - **Depends On:** None (foundational)
> - **Serves:** Retain, all other systems
>
> ### Capability 2: Retain
> - **Description:** Store information indefinitely without loss
> - **Inputs:** Knowledge artifacts from Capture
> - **Outputs:** Persistent, searchable knowledge store
> - **Depends On:** Capture
> - **Serves:** Retrieve, Connect, Surface
>
> ### Capability 3: Retrieve
> - **Description:** Surface relevant context on demand with precision
> - **Inputs:** User queries, system requests
> - **Outputs:** Relevant knowledge artifacts with context
> - **Depends On:** Retain
> - **Serves:** Arena, Content Production, Decision Support, User directly
>
> ### Capability 4: Connect
> - **Description:** Reveal relationships between ideas across time and topic
> - **Inputs:** Knowledge artifacts
> - **Outputs:** Relationship maps, connected insights
> - **Depends On:** Retain
> - **Serves:** Decision Support, Content Production
>
> ### Capability 5: Surface
> - **Description:** Proactively present insights without being asked
> - **Inputs:** User context, patterns in data
> - **Outputs:** Timely, relevant insights delivered proactively
> - **Depends On:** Retrieve, Connect
> - **Serves:** User directly, Decision Support
>
> ### Capability 6: Serve
> - **Description:** Provide context to other systems in the Architecture
> - **Inputs:** Requests from other systems
> - **Outputs:** Formatted knowledge appropriate for the requesting system
> - **Depends On:** Retrieve
> - **Serves:** Arena, Content Production, Decision Support, Team Knowledge Base

**The Test for Completeness:**

For each capability, can you imagine at least three different ways to implement it? If you can only see one way, you've written a feature, not a capability. Go back up a level.

**When to Write:**

After the Architecture Map is complete. Before any PRDs for that system.

**When to Update:**

- When a capability is added or removed
- When you discover a capability gap during building
- When the Architecture changes in a way that affects this system's responsibilities

---

## Level 4: PRD (Product Requirements Document)

**Purpose:** Specify exactly what to build for one implementation.

**What It Is:**

A detailed specification for a single build session. It implements one capability (or part of one capability) and contains everything needed for the AI to build without questions.

**What It Contains:**

1. **Objective** - What capability is this implementing? (Links to Capability Map)
2. **Scope** - What's included AND what's explicitly excluded
3. **Requirements** - Specific, testable statements
4. **Acceptance Criteria** - How you'll verify each requirement
5. **Integration Points** - What it connects to, what flows in/out
6. **Edge Cases** - What happens in unusual situations
7. **Constraints** - Limitations (technical, business, or other)
8. **Out of Scope** - Explicit list of what this does NOT include

**What It Does NOT Contain:**

- How to implement (that's for the AI to determine)
- Vague requirements ("it should be fast")
- Unstated assumptions

**Structure:**

```
# PRD: [Feature/Implementation Name]

## Objective
Implement the [Capability Name] capability of the [System Name].
[One sentence on what this achieves]

## Scope
**In Scope:**
- [Specific item 1]
- [Specific item 2]

**Out of Scope:**
- [Specific exclusion 1]
- [Specific exclusion 2]

## Requirements
1. [Testable requirement]
2. [Testable requirement]
3. [Testable requirement]

## Acceptance Criteria
- [ ] [Verifiable criterion]
- [ ] [Verifiable criterion]
- [ ] [Verifiable criterion]

## Integration
- **Inputs:** [What this receives and from where]
- **Outputs:** [What this produces and where it goes]
- **Connections:** [What systems/components this interacts with]

## Edge Cases
- [Scenario 1]: [Expected behavior]
- [Scenario 2]: [Expected behavior]

## Constraints
- [Any limitations]

## Notes
[Any additional context]
```

**The Test for Completeness:**

Could someone (or an AI) read this and build exactly what you imagined, without asking any clarifying questions? If not, the PRD is incomplete.

**When to Write:**

Before every build session. After the Capability Map for that system exists.

**When to Update:**

During the PRD writing process until it's complete. Once building starts, the PRD should be stable. If you need to change requirements mid-build, that's a sign the PRD wasn't complete—note what was missing for next time.

---

## Level 5: CLAUDE.md

**Purpose:** Provide project context for the AI in future sessions.

**What It Is:**

A document that lives in the project and tells Claude Code (or any AI) everything it needs to know to work effectively on this system.

**What It Contains:**

1. **Project Overview** - What this is and what it does
2. **Architecture Notes** - How this fits in the larger system
3. **Current State** - What's built, what's in progress
4. **Technical Details** - Stack, dependencies, conventions
5. **Skills/Commands** - Available capabilities
6. **Workflow Patterns** - How to work on this system

**What It Does NOT Contain:**

- PRD-level requirements (those are separate)
- Vision (that's in the Vision Document)
- Generic AI instructions

**When to Write:**

After each build session. The CLAUDE.md evolves as the system evolves.

**When to Update:**

After every significant change. The CLAUDE.md should always reflect current reality.

---

## The Hierarchy in Practice

**Starting a New Initiative:**

1. Write the Vision Document (Level 1)
2. Create the System Architecture Map (Level 2)
3. Create a Capability Map for the first system you'll build (Level 3)
4. Write a PRD for the first capability (Level 4)
5. Build
6. Update CLAUDE.md (Level 5)
7. Repeat from step 4 for the next capability

**Adding a New System:**

1. Update the Architecture Map to include the new system
2. Create a Capability Map for the new system
3. Proceed as above

**Maintaining Existing Systems:**

1. Review the relevant Capability Map
2. Write a PRD for the change
3. Build
4. Update CLAUDE.md

---

## Document Ownership and Storage

| Document | Storage Location | Owner | Review Frequency |
|----------|-----------------|-------|-----------------|
| Vision Document | Project root | You | Quarterly |
| System Architecture Map | Central location (Mission Control) | You | When strategy shifts |
| Capability Map | Per-system folder | You | When capabilities change |
| PRD | Per-system folder or archive | You | Per build |
| CLAUDE.md | Project root | You + AI | Per build |

---

## Summary

Documents are thinking tools, not bureaucracy.

Each level of the Translation Stack has a corresponding document type:
- Vision → Vision Document
- Architecture → System Architecture Map
- Capability → Capability Map
- Specification → PRD
- Implementation → CLAUDE.md

Write documents in order. Don't write a PRD before you have a Capability Map. Don't create a Capability Map before you have an Architecture. Don't build an Architecture without a Vision.

The time invested in upper-level documents pays compound returns in lower-level clarity.

---

*Next Document: [[04 The PRD Deep Dive]] - How to write specifications that AI can execute*
