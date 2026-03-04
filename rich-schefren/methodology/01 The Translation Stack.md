# The Translation Stack

## The Strategic Entrepreneur's Mental Model for AI-Assisted Building

---

## The Problem You Don't Know You Have

Most entrepreneurs using AI to build systems operate like this:

> "I have an idea. Let me tell the AI to build it."

Then they wonder why results are inconsistent, why the AI "doesn't understand," why they spend hours going back and forth, and why what gets built doesn't match what they imagined.

The problem isn't the AI. The problem is **invisible layers**.

Between your strategic intent and working code, there are five distinct levels of translation. Most people see only the top and bottom—Vision and Implementation—and try to jump directly between them.

This is like trying to build a skyscraper by describing your dream penthouse to a bricklayer.

---

## The Five Levels

| Level | What Lives Here | The Question It Answers |
|-------|-----------------|------------------------|
| **Vision** | The transformed state | "What does the world look like when this exists?" |
| **Architecture** | The system of systems | "How do the pieces relate to each other?" |
| **Capability** | What each piece does | "What job does this component perform?" |
| **Specification** | How it performs that job | "What exactly must be true for this to work?" |
| **Implementation** | The code itself | "How is it built?" |

Each level translates the one above it into something more concrete. Skip a level, and you're asking the next level down to do translation work it isn't designed for.

---

## Level 1: Vision

**The Question:** "What does the world look like when this exists?"

This is the 30,000-foot view. Not features. Not functionality. The transformed state.

**Characteristics:**
- Written in outcome language, not feature language
- Describes what becomes possible, not what gets built
- Should be stable—if your Vision changes frequently, it wasn't a Vision, it was a feature idea
- Short. One page maximum. Often one paragraph.

**Example (Bad):**
> "I want a system that stores my notes in a vector database and lets me query them with natural language."

**Example (Good):**
> "I have perfect recall across every conversation, decision, framework, and insight from my entire business history. Nothing is ever lost. Everything compounds. When I need something, it surfaces—either because I asked or because the system knew I'd need it."

The bad example describes a feature. The good example describes a transformed state.

**The Test:** If you can imagine multiple completely different implementations that would all achieve your Vision, it's a real Vision. If there's only one way to achieve it, you've written a feature description.

---

## Level 2: Architecture

**The Question:** "How do the pieces relate to each other?"

This is the system of systems. Not the details of any single system—the relationships between systems.

**Characteristics:**
- Shows what connects to what
- Identifies what data or value flows between components
- Reveals dependencies (what must exist before something else can work)
- Exposes the leverage points (where a change cascades through the system)

**Why It Matters:**

Most entrepreneurs build in isolation. They create a "Second Brain" without understanding how it relates to their content system, their team's workflows, their client delivery, their decision-making process.

Then they wonder why the thing they built sits unused—it doesn't connect to anything.

Architecture forces you to see the whole board before you optimize any single piece.

**What an Architecture Document Contains:**
- A visual or textual map of all major systems
- The flows between them (data, triggers, dependencies)
- Clear boundaries (what's inside each system, what's outside)
- Integration points (where systems touch)

**The Test:** Could someone unfamiliar with your business look at your Architecture and understand what systems exist and how they interact? If not, it's not an Architecture—it's notes.

---

## Level 3: Capability

**The Question:** "What job does this component perform?"

This is where most people skip directly to features—and it's where most projects go wrong.

A **Capability** is not a feature. It's a job to be done.

**The Difference:**

| Feature (Wrong Level) | Capability (Right Level) |
|----------------------|-------------------------|
| "Vector database storage" | "Never lose information" |
| "Natural language query" | "Retrieve relevant context on demand" |
| "Daily email digest" | "Surface insights without being asked" |
| "Tagging system" | "Organize by meaning, not location" |

Features are implementations of Capabilities. The same Capability could be implemented many different ways.

**Why This Level Matters:**

If you skip from Architecture to Specification (PRD), you'll write PRDs for features that may or may not add up to a coherent system.

Capability Maps force you to ask: "What must this system be able to DO?" before you ask "How will it do it?"

**What a Capability Map Contains:**
- Each major capability the system must have
- What inputs each capability requires
- What outputs each capability produces
- How capabilities relate to each other (which enables which)
- How this system's capabilities serve other systems in the Architecture

**The Test:** For each capability, can you imagine at least three completely different ways it could be implemented? If you can only imagine one, you've written a feature, not a capability.

---

## Level 4: Specification

**The Question:** "What exactly must be true for this to work?"

This is the PRD (Product Requirements Document). This is what you discovered two days ago.

But now you understand where it sits in the stack. A PRD is not where you start—it's where you arrive after Vision, Architecture, and Capability are clear.

**Characteristics:**
- Precise scope (what's included AND what's excluded)
- Testable acceptance criteria (how do you know it's working?)
- Integration points specified (what does it connect to?)
- Edge cases identified (what happens when things go wrong?)
- User scenarios documented (how will this actually be used?)

**What a PRD Contains:**
1. **Objective** - What capability is this implementing? (Links back to Capability Map)
2. **Scope** - What's in, what's out
3. **Requirements** - Specific, testable statements of what must be true
4. **Acceptance Criteria** - How you'll verify each requirement is met
5. **Integration** - What it connects to, what data flows in/out
6. **Constraints** - Technical or business limitations
7. **Out of Scope** - Explicit list of what this does NOT do (critical for preventing scope creep)

**The Test:** Could an AI (or a developer) read this PRD and build exactly what you imagined without any clarifying questions? If they need to ask "what do you mean by..." then the PRD isn't specific enough.

---

## Level 5: Implementation

**The Question:** "How is it built?"

This is the code. The actual system. The thing that runs.

When working with AI like Claude Code, this level is handled by the AI—but only if levels 1-4 are clear.

**The Insight:**

Implementation is not your job. Translation is your job.

Your role is to translate Vision → Architecture → Capability → Specification with enough clarity that Implementation can happen without you in the room.

---

## The Pattern of Failure

Here's what happens when you skip levels:

**Vision → Implementation (skipping 3 levels):**
- "Build me a second brain"
- AI makes assumptions about architecture, capabilities, and specifications
- You get something that doesn't match your vision
- You blame the AI

**Vision → Specification (skipping 2 levels):**
- "Write a PRD for a second brain that stores my notes and lets me query them"
- The PRD gets written, but it's for a feature, not a system
- What gets built works but doesn't connect to anything
- It sits unused because it wasn't designed within an architecture

**Architecture → Specification (skipping 1 level):**
- You know how systems connect but you're writing PRDs for features
- Features get built but they don't add up to coherent capabilities
- You have a Frankenstein system—technically functional, strategically incoherent

---

## The Pattern of Success

**Vision first.** Written once, updated rarely. Stable.

**Architecture second.** All systems mapped. All relationships visible. Updated when strategy shifts.

**Capability third.** For each system, what jobs must it perform? What are the inputs and outputs? How do capabilities relate?

**Specification fourth.** For each capability, what exactly must be true? Testable. Precise.

**Implementation fifth.** Hand the PRD to Claude Code (or any competent builder). They build. You verify against the spec.

---

## The Leverage Insight

Each level up the stack has more leverage than the level below it.

- A change at the Implementation level affects one feature
- A change at the Specification level affects one capability
- A change at the Capability level affects one system
- A change at the Architecture level affects multiple systems
- A change at the Vision level affects everything

This is why getting the Vision right matters more than getting the code right. It's why an hour spent on Architecture saves ten hours of building the wrong thing.

Strategic entrepreneurs operate at the highest-leverage level. Technicians operate at the lowest.

You've been building at the Specification and Implementation levels. It's time to step up to Architecture and Vision.

---

## Summary

| Level | Stability | Leverage | Your Role |
|-------|-----------|----------|-----------|
| Vision | Rarely changes | Highest | Define it |
| Architecture | Changes with strategy | Very high | Design it |
| Capability | Changes with systems | High | Map it |
| Specification | Changes with each build | Medium | Write it |
| Implementation | Changes constantly | Lowest | Verify it |

The Translation Stack is not a process. It's a mental model. It shows you where to focus your attention and what to delegate.

Your job is the top three levels. The bottom two can be handled by AI—but only if you've done your job first.

---

*Next Document: [[02 The Three Questions Protocol]] - The decision framework for moving between levels*
