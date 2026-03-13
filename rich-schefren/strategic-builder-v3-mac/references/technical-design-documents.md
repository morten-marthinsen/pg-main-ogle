# Technical Design Documents (TDD)

## When to Use This vs. When Not To

**Use a Technical Design Document when:**
- Building software intended to run reliably for months or years
- Creating automated systems that run without human oversight
- Building something you'd feel confident giving to someone else
- The system connects to external services (APIs, databases, cloud services)
- Failure would cause meaningful disruption to your workflow
- You've been burned before by "quick builds" that broke silently

**Skip the Technical Design Document when:**
- Building a one-time script you'll run once and discard
- Prototyping to see if an idea is even feasible
- The entire system can be rebuilt in under 30 minutes
- You're explicitly in "throwaway" mode and know it

**The key question:** If this breaks in 3 months, will you remember how it works well enough to fix it? If not, you need a TDD.

---

## What Is a Technical Design Document?

A Technical Design Document is a blueprint created *before* building software. It forces you to think through how the system works, what can go wrong, and how you'll know if it's working—before you write any code.

Think of it like architectural plans for a house. You *could* start building without plans, and for a simple shed, that's fine. But for something you'll live in for years, you want to know where the plumbing goes before the walls are up.

## Why Use a Technical Design Document?

### 1. Prevents "Works Today, Breaks Tomorrow" Syndrome

Most software failures aren't dramatic explosions. They're quiet failures—the system stops working and nobody notices for weeks. A TDD forces you to answer: "How will I know this is still working?"

### 2. Captures Decisions and Reasoning

Three months from now, you won't remember why you built it a certain way. The TDD preserves that reasoning so future-you (or an AI helping future-you) can understand and modify the system intelligently.

### 3. Identifies Problems Before They're Expensive

Discovering a fundamental flaw in your approach takes 5 minutes to fix in a document. It takes hours or days to fix in working code. TDDs surface these issues early.

### 4. Creates a Debugging Reference

When something breaks, the TDD tells you: here's how it's supposed to work, here are the known failure modes, here's how to diagnose each one. Without this, debugging is archaeology.

### 5. Enables Confident Handoffs

Whether you're handing the system to another person, to an AI, or to future-you who's forgotten everything—the TDD provides the context needed to work on it safely.

---

## What a Technical Design Document Contains

### 1. Overview and Purpose

What does this system do? What problem does it solve? What's the scope—what's included and explicitly excluded?

*Keep this to one paragraph. If you can't explain it briefly, you don't understand it well enough yet.*

### 2. Architecture

How is the system structured? What are the major components? How do they communicate?

This is typically shown as a diagram plus written explanation. The goal is that someone could look at this section and understand the "shape" of the system without reading any code.

### 3. Dependencies

What external services, tools, or systems does this depend on? For each dependency:
- What is it?
- Why do we need it?
- What happens if it's unavailable?
- Are there alternatives?

*Dependencies are where most "quiet failures" originate. A service changes their API, a tool updates, a credential expires. Documenting dependencies means you know where to look when things break.*

### 4. Data Flow

How does data move through the system? What's the input? What transformations happen? What's the output?

*Following the data is often the fastest way to understand or debug a system.*

### 5. Failure Modes and Handling

What can go wrong? For each failure mode:
- How would we detect it?
- What's the impact?
- How should the system respond?
- How do we recover?

*This section is what separates production software from prototypes. Prototypes assume everything works. Production software assumes everything can fail.*

### 6. Observability

How do we know the system is working? How do we know it broke?

This includes:
- **Logging:** What gets logged, where, in what format?
- **Alerting:** What conditions trigger alerts? How are alerts delivered?
- **Health checks:** How does the system verify its own health?
- **Status dashboard:** Where can you see current system state?

*If you can't observe it, you can't operate it.*

### 7. Testing Strategy

How do we verify the system works before deploying? How do we verify it keeps working over time?

This includes:
- **Pre-deployment testing:** What tests run before the system goes live?
- **Ongoing testing:** Does the system self-test? How often?
- **Manual verification:** How would a human verify it's working?

### 8. Security and Privacy

What sensitive data does the system handle? How is it protected? What's the blast radius if something is compromised?

### 9. Operations

How do you operate this system day-to-day?
- How do you start/stop it?
- How do you deploy updates?
- How do you roll back if an update breaks things?
- What routine maintenance is required?

### 10. Recovery Procedures

When things go wrong, what are the step-by-step procedures to fix them? This is a runbook—specific instructions for specific scenarios.

---

## The TDD Process

### Step 1: Write the Overview
Start with what you're building and why. If you can't write this clearly, stop and clarify before proceeding.

### Step 2: Sketch the Architecture
Draw the components and connections. This doesn't need to be fancy—boxes and arrows work fine. The act of drawing forces clarity.

### Step 3: List Dependencies
Write down everything external the system needs. This is often more than you initially think.

### Step 4: Think Through Failures
For each component and each dependency, ask: "What if this fails?" Document the answer.

### Step 5: Design Observability
Before building the system, decide how you'll know if it's working. This often changes how you build things.

### Step 6: Review Before Building
Read through the complete TDD. Does it make sense? Are there gaps? This is your last cheap chance to catch problems.

### Step 7: Build, Referring to TDD
The TDD guides implementation. Update it if you discover things during building that change the design.

### Step 8: Maintain the TDD
When the system changes, update the document. An outdated TDD is sometimes worse than no TDD because it misleads.

---

## Common Mistakes

### Writing the TDD After Building
A TDD written after the fact is documentation, not design. It's still useful, but you've lost the main benefit—catching problems early.

### Over-Engineering the Document
A TDD for a simple system should be simple. Don't create a 20-page document for something that takes 100 lines of code. Scale the document to the system.

### Treating It as Permanent
The TDD is a living document. When the system changes, the TDD should change. Set a reminder to review it periodically.

### Skipping the Failure Modes Section
This is the most valuable section and the most commonly skipped. Force yourself to fill it out thoroughly.

---

## Template

A minimal TDD template:

```markdown
# [System Name] - Technical Design Document

## Overview
[One paragraph: what it does and why]

## Architecture
[Diagram + explanation of components]

## Dependencies
| Dependency | Purpose | If Unavailable |
|------------|---------|----------------|
| [Service]  | [Why]   | [What happens] |

## Data Flow
[Input → Processing → Output]

## Failure Modes
| Failure | Detection | Impact | Response | Recovery |
|---------|-----------|--------|----------|----------|
| [What]  | [How]     | [Severity] | [Automatic action] | [Manual steps] |

## Observability
- Logging: [What/Where]
- Alerting: [Conditions/Delivery]
- Health checks: [Method/Frequency]
- Status: [Where to look]

## Testing
- Pre-deployment: [Tests]
- Ongoing: [Self-tests]
- Manual: [Verification steps]

## Operations
- Start: [Command]
- Stop: [Command]
- Update: [Procedure]
- Rollback: [Procedure]

## Recovery Procedures
### [Scenario 1]
1. [Step]
2. [Step]

### [Scenario 2]
1. [Step]
2. [Step]
```

---

## Summary

A Technical Design Document is an investment. It costs time upfront but saves multiples of that time in debugging, maintenance, and recovery. For any system you want to work reliably over months or years, the TDD is not optional—it's the foundation that makes long-term reliability possible.

