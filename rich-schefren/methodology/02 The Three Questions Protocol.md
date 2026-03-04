# The Three Questions Protocol

## The Decision Framework for AI-Assisted Building

---

## The Problem with "Process"

Processes are step-by-step instructions. They work until they don't. When circumstances change, processes break.

Strategic entrepreneurs don't follow processes—they apply principles through frameworks. A framework gives you a way to think, not a recipe to follow.

The Three Questions Protocol is a framework. It's how you decide what to do next when building systems with AI.

---

## The Three Questions

| Order | Question | Translation Stack Level | Frequency |
|-------|----------|------------------------|-----------|
| 1 | **What's the system?** | Architecture | Asked once per major initiative; updated when strategy shifts |
| 2 | **What must it do?** | Capability | Asked for each major component of the system |
| 3 | **How exactly?** | Specification | Asked before each build session |

These questions are asked in order. The answer to each question depends on having answered the question above it.

---

## Question 1: What's the System?

**Level:** Architecture

**When Asked:** At the beginning of any major initiative. Revisited when strategy changes.

**What You're Asking:**

You're not asking about one project. You're asking about the system of systems. How does this thing you're building connect to everything else?

**The Sub-Questions:**

1. What systems already exist that this will interact with?
2. What systems don't exist yet but will need to exist?
3. What flows between systems? (Data, triggers, dependencies)
4. Where are the boundaries? What's inside each system, what's outside?
5. What's the sequence? What has to exist before other things can work?

**The Output:**

A System Architecture Map. This shows:
- All major systems (existing and planned)
- How they connect
- What flows between them
- Dependencies and sequences

**The Rule:**

If you can't draw the system of systems, you're not ready to build. You're still in discovery mode.

**Common Mistakes:**

- **Building in isolation.** You create a "Second Brain" without understanding how it serves your content system, your client delivery, your team. It becomes an island.
- **Treating projects as unrelated.** Your Second Brain, your Arena, your training systems—they're not separate projects. They're components of one infrastructure. Seeing them separately guarantees they won't integrate.
- **Starting with features.** "I want natural language search" is not a system. It's a feature. Features live inside systems. Systems live inside architectures.

**Example:**

*Wrong:* "Let me build a Second Brain."

*Right:* "Let me map my entire AI-powered business infrastructure. The Second Brain is one component. It connects to my content production system, my client delivery system, my team knowledge base, and my decision-support system. Here's how data flows between them."

---

## Question 2: What Must It Do?

**Level:** Capability

**When Asked:** For each major system or component. Revisited when you realize a capability is missing.

**What You're Asking:**

Not features. Jobs. What jobs must this system be able to perform?

A capability is an outcome the system produces, not a mechanism it uses.

**The Sub-Questions:**

1. What jobs will this system perform? (Stated as outcomes, not features)
2. For each job: What inputs are required?
3. For each job: What outputs are produced?
4. How do these capabilities depend on each other?
5. How do these capabilities serve other systems in the architecture?

**The Output:**

A Capability Map for the specific system. This shows:
- Each capability (stated as a job, not a feature)
- Inputs and outputs
- Dependencies between capabilities
- How this system serves the larger architecture

**The Rule:**

If you can state a capability only one way, it's probably a feature, not a capability.

True capabilities can be implemented multiple ways. "Store information in a vector database" is a feature. "Never lose information" is a capability.

**The Test:**

For each capability, ask: "Can I imagine at least three completely different ways to implement this?" If yes, it's a capability. If no, you've written a feature—go up a level.

**Common Mistakes:**

- **Skipping to features.** You start listing what you want: "vector database, natural language search, daily digests." These are features. You haven't defined what jobs they're meant to accomplish.
- **Confusing mechanisms with outcomes.** "Tagging system" is a mechanism. "Organize by meaning, not location" is an outcome. Build for outcomes; let the mechanisms emerge.
- **Not connecting to architecture.** You define capabilities for one system without asking how they serve other systems. The capabilities work in isolation but don't compound.

**Example:**

*Wrong:* "The Second Brain needs: Pinecone vector storage, natural language query, daily email summaries, Obsidian integration."

*Right:* "The Second Brain must be able to:
1. **Capture** - Ingest information from any source without friction
2. **Retain** - Never lose information; store indefinitely
3. **Retrieve** - Surface relevant context on demand, with precision
4. **Connect** - Reveal relationships between ideas across time and topic
5. **Surface** - Proactively present insights without being asked
6. **Serve** - Provide context to other systems (Arena, content production, etc.)

Each of these is a job. Each could be implemented multiple ways."

---

## Question 3: How Exactly?

**Level:** Specification

**When Asked:** Before each build session. Every time you're about to tell the AI to build something.

**What You're Asking:**

Given the architecture (Question 1) and the capability this implements (Question 2), what exactly must be true for this specific build to succeed?

**The Sub-Questions:**

1. What capability is this implementing? (Link back to Question 2)
2. What's in scope? What's explicitly out of scope?
3. What must be true when this is complete? (Acceptance criteria)
4. What does it connect to? What data flows in and out?
5. What happens at the edges? (Error states, unusual inputs, edge cases)
6. How will you verify it works?

**The Output:**

A PRD (Product Requirements Document) for this specific build. This includes:
- Objective (the capability being implemented)
- Scope (in and out)
- Requirements (testable statements)
- Acceptance criteria (how you verify)
- Integration points (what it connects to)
- Edge cases (what happens when things go wrong)

**The Rule:**

If the AI needs to ask clarifying questions, the PRD isn't done. A complete PRD should enable someone (or something) to build exactly what you imagined without further input.

**The Test:**

Read your PRD and ask: "Could someone build this if I disappeared right now and they couldn't ask me any questions?" If the answer is no, keep refining.

**Common Mistakes:**

- **Vague acceptance criteria.** "It should work well" is not a criterion. "When I input a question, it returns the three most relevant documents within 5 seconds" is a criterion.
- **No explicit out-of-scope section.** If you don't say what's NOT included, the build will creep. Scope creep is the #1 killer of projects.
- **Forgetting integration.** You specify what the thing does in isolation but not how it connects. Then you're surprised when it doesn't fit the architecture.
- **Skipping edge cases.** What happens when there's no data? When the connection fails? When the input is malformed? If you don't specify, the AI will make assumptions. Those assumptions will be wrong.

**Example:**

*Wrong:* "Build me natural language search for my notes."

*Right:* "PRD: Retrieve Capability Implementation

**Objective:** Implement the 'Retrieve' capability of the Second Brain—surface relevant context on demand with precision.

**Scope:**
- IN: Query input, relevance ranking, result display
- OUT: Voice input, proactive surfacing, daily digests (those are different capabilities)

**Requirements:**
1. Accept natural language queries up to 500 characters
2. Search across all indexed notes (currently ~2,500 documents)
3. Return top 5 most relevant results with relevance scores
4. Display source, date, and preview for each result
5. Response time under 3 seconds for 95% of queries

**Acceptance Criteria:**
- [ ] Query 'What did I decide about pricing in Q3?' returns relevant notes
- [ ] Query 'conversations with John about the partnership' returns relevant notes
- [ ] Results display source file name, date, and 100-character preview
- [ ] Response time logged and meeting threshold

**Integration:**
- Input: User query via chat interface
- Output: Formatted results displayed in chat
- Connects to: Pinecone vector store (existing)

**Edge Cases:**
- No results found: Display 'No relevant notes found. Try rephrasing or broadening your query.'
- Query too short (<3 characters): Prompt for more specific query
- API timeout: Display error message and suggest retry

**Out of Scope:**
- Voice input
- Proactive surfacing
- Multi-modal search (images, audio)
- Batch queries"

---

## The Protocol in Practice

**When you sit down to build:**

1. **Check Question 1.** Do you have a System Architecture Map? Is this build part of a coherent system of systems? If not, stop. Create the architecture first.

2. **Check Question 2.** Do you have a Capability Map for the system you're working on? Does this build implement a defined capability? If not, stop. Map the capabilities first.

3. **Check Question 3.** Do you have a PRD for this specific build? Is it complete enough that the AI could build without questions? If not, stop. Write the PRD first.

**The anti-pattern:**

You get an idea. You immediately tell the AI to build it. You're frustrated when it's not quite right. You iterate for hours. You end up with something that works but doesn't fit.

This is the pattern of the Opportunity Seeker—reactive, tactical, always starting from scratch.

**The pattern:**

You have an architecture. You know what system you're building. You know what capability it serves. You write a precise specification. You hand it to the AI. It builds. You verify. You move to the next capability.

This is the pattern of the Strategic Entrepreneur—proactive, systematic, always compounding.

---

## When to Revisit Each Question

| Question | Revisit When... |
|----------|-----------------|
| Question 1 (Architecture) | You realize systems are missing. Strategy shifts. New major initiative begins. |
| Question 2 (Capability) | A system needs new jobs. You discover a capability gap. You're designing a new system. |
| Question 3 (Specification) | Every build session. Each time you implement a new capability or modify an existing one. |

---

## The Hierarchy of Errors

Getting Question 1 wrong is the costliest error. You build systems that don't connect. Everything is rework.

Getting Question 2 wrong is expensive. You build features that don't add up to capabilities. The system works but doesn't serve.

Getting Question 3 wrong is annoying but recoverable. The build isn't quite right. You iterate. Time is wasted but not catastrophically.

**Invest your attention accordingly.**

Most people spend 90% of their attention on Question 3 (specifications) and almost none on Questions 1 and 2.

Strategic entrepreneurs invert this. They spend the majority of their attention on architecture and capabilities. Specifications become straightforward because the thinking has already been done.

---

## Summary

The Three Questions Protocol is not a process to follow. It's a framework for deciding what question you should be answering right now.

- If you don't have an architecture, answer Question 1.
- If you don't have a capability map, answer Question 2.
- If you're ready to build, answer Question 3.

Never answer Question 3 before you've answered Questions 1 and 2.

Never skip a level in the Translation Stack.

The time you invest in the upper levels is repaid tenfold in the lower levels.

---

*Next Document: [[03 The Document Hierarchy]] - What documents to create at each level and when*
