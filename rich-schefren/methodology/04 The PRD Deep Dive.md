# The PRD Deep Dive

## How to Write Specifications That AI Can Execute

---

## The Breakthrough You Had

Two days ago, you discovered the PRD. You realized that the quality of what AI builds is directly proportional to the quality of your specification.

This document takes that insight deeper. It's not enough to know that PRDs matter—you need to know how to write them well enough that AI can execute without questions, without assumptions, and without building the wrong thing.

---

## The PRD Principle

**A complete PRD removes all ambiguity.**

Every ambiguity in your specification is a decision the AI will make for you. Sometimes it will decide well. Often it won't. You'll only find out after the build is done.

The purpose of the PRD is not documentation. It's not a formality. The purpose is to force you to think through every decision before building starts—so the AI executes your decisions, not its own.

---

## The Anatomy of a PRD

A complete PRD has eight components. Most people write only two or three and wonder why results are inconsistent.

### 1. Objective

**What it answers:** What capability is this implementing, and why does it matter?

**How to write it:**
- Link to the Capability Map ("This implements the Retrieve capability...")
- One sentence on what this achieves
- Focus on outcome, not mechanism

**Example (weak):**
> Build a search feature.

**Example (strong):**
> Implement the Retrieve capability of the Second Brain. Enable on-demand access to any stored knowledge artifact through natural language queries.

**Why it matters:**
The Objective keeps the build anchored to purpose. Without it, features can drift toward what's easy to build rather than what's needed.

---

### 2. Scope

**What it answers:** What's included and what's explicitly excluded?

**How to write it:**
Two sections: In Scope and Out of Scope. Both are equally important.

The Out of Scope section is where most PRDs fail. If you don't explicitly state what's excluded, the AI may include it. Or you'll think it should have and be disappointed when it didn't.

**Example (weak):**
> Build search for my notes.

**Example (strong):**
> **In Scope:**
> - Natural language query input
> - Semantic search across all indexed notes
> - Ranked results with relevance scores
> - Source display (file name, date, preview)
> - Response time optimization
>
> **Out of Scope:**
> - Voice input
> - Multi-modal search (images, audio)
> - Proactive surfacing (that's a different capability)
> - Search history/saved queries
> - Batch operations
> - API access (this is for direct user interaction only)

**Why it matters:**
Scope creep is the #1 killer of projects. Out of Scope is your explicit defense against it.

---

### 3. Requirements

**What it answers:** What specific, testable statements must be true when this is complete?

**How to write it:**
Each requirement should be:
- **Specific** - No vague language ("should be fast" → "responds in under 3 seconds")
- **Testable** - You can verify it's true or false
- **Independent** - Each requirement stands alone
- **Necessary** - If you removed it, the build would fail

**Example (weak):**
> - The search should work well
> - It should find relevant results
> - It should be user-friendly

**Example (strong):**
> 1. Accept natural language queries up to 500 characters
> 2. Search across all indexed notes (current count: ~2,500)
> 3. Use semantic similarity, not just keyword matching
> 4. Return top 5 results ranked by relevance
> 5. Display relevance score (0-100) for each result
> 6. Show source file path for each result
> 7. Show document date for each result
> 8. Show 150-character preview for each result
> 9. Return results in under 3 seconds for 95% of queries
> 10. Handle queries with no results gracefully (defined in Edge Cases)

**Why it matters:**
Requirements are the contract. If a requirement isn't met, the build isn't complete. If something isn't a requirement, it can't be demanded later.

---

### 4. Acceptance Criteria

**What it answers:** How will you verify each requirement is met?

**How to write it:**
Acceptance criteria are testable scenarios. They're written as checkboxes—each one can be checked or not checked.

**The relationship:**
- Requirements say what must be true
- Acceptance criteria say how you'll prove it's true

**Example:**
> - [ ] Query "What did I decide about pricing last quarter?" returns relevant notes
> - [ ] Query "conversations with John about the partnership" returns at least one relevant note
> - [ ] Query "asdfghjkl" (nonsense) returns "No relevant results" message
> - [ ] Each result displays: file path, date, relevance score, preview
> - [ ] Query "pricing" returns results in under 2 seconds
> - [ ] Query complex: "What was my strategic rationale for the Q2 product launch decision and who was involved in the discussion?" returns results in under 4 seconds

**Why it matters:**
Acceptance criteria make "done" objective. Without them, "done" is subjective—and you and the AI will have different subjective opinions.

---

### 5. Integration Points

**What it answers:** What does this connect to, and how?

**How to write it:**
Three sections:
- **Inputs** - What this receives and from where
- **Outputs** - What this produces and where it goes
- **Dependencies** - What must exist for this to work

**Example:**
> **Inputs:**
> - User query (string, via chat interface)
> - Indexed notes (from Pinecone vector store, ~2,500 documents)
>
> **Outputs:**
> - Search results (structured JSON → formatted display)
> - Displays in: Claude Code chat interface
>
> **Dependencies:**
> - Pinecone vector store must be populated
> - Notes must be indexed with embeddings
> - Claude Code session must be active

**Why it matters:**
Systems don't exist in isolation. Integration points ensure the build connects to the architecture. Without them, you create islands.

---

### 6. Edge Cases

**What it answers:** What happens in unusual situations?

**How to write it:**
List every unusual scenario and specify the expected behavior for each.

If you don't specify, the AI will make decisions. Those decisions may not match your expectations.

**Example:**
> | Scenario | Expected Behavior |
> |----------|------------------|
> | No results found | Display: "No relevant notes found. Try rephrasing or broadening your query." |
> | Query too short (<3 chars) | Display: "Please enter a longer query for better results." |
> | Query too long (>500 chars) | Truncate to 500 characters, process, note truncation in response |
> | Pinecone unavailable | Display: "Search temporarily unavailable. Please try again in a few minutes." |
> | Very slow response (>10s) | Display timeout message, suggest retry |
> | Query contains only stop words | Process anyway (semantic search handles this) |
> | Special characters in query | Process as-is (embeddings handle special characters) |

**Why it matters:**
Edge cases are where things break. Specifying them upfront prevents surprises and support requests from your future self.

---

### 7. Constraints

**What it answers:** What limitations exist that affect this build?

**How to write it:**
List any technical, business, or practical limitations that constrain the implementation.

**Types of constraints:**
- **Technical** - Platform limitations, API limits, performance requirements
- **Business** - Budget, timeline pressures, compliance requirements
- **Practical** - Existing code to work with, dependencies that can't change

**Example:**
> - Must use existing Pinecone index (don't recreate)
> - Must work within Claude Code chat interface (no external UI)
> - Pinecone free tier limits: 1M vectors, 1GB storage
> - Results must display without requiring additional tools
> - Must maintain conversation context (don't clear on each query)

**Why it matters:**
Constraints prevent overbuilding. Without them, the AI may propose solutions that don't fit your environment.

---

### 8. Out of Scope (Revisited)

**What it answers:** What are we explicitly NOT building?

**Why it's listed twice:**
This component is so important it deserves emphasis. Most PRDs fail because Out of Scope is vague or absent.

**How to write it:**
Be specific. Don't say "advanced features." Say exactly what you're not including and why.

**Example:**
> **Out of Scope for this build:**
>
> | Feature | Reason |
> |---------|--------|
> | Voice input | Different capability (Capture), will be separate PRD |
> | Proactive surfacing | Different capability (Surface), will be separate PRD |
> | Search history | Nice-to-have, not essential for core Retrieve capability |
> | Saved queries | Nice-to-have, adds complexity without proportional value |
> | API access | This build is for direct user interaction only |
> | Multi-modal search | Requires image/audio embedding—future enhancement |
> | Batch queries | No current use case; premature optimization |

**Why it matters:**
Out of Scope is your commitment to what you won't do. It prevents scope creep and keeps the build focused.

---

## The PRD Writing Process

**Step 1: Start with Objective and Scope**
What capability are you implementing? What's in, what's out?

**Step 2: List Requirements**
What must be true? Be specific. Be testable.

**Step 3: Write Acceptance Criteria**
How will you verify each requirement? Write as checkboxes.

**Step 4: Map Integration Points**
What does this connect to? What are inputs, outputs, dependencies?

**Step 5: Brainstorm Edge Cases**
What could go wrong? What unusual situations exist? Specify behavior for each.

**Step 6: Identify Constraints**
What limitations exist? Technical, business, practical?

**Step 7: Finalize Out of Scope**
What are you explicitly NOT doing? Be specific.

**Step 8: Review Against Capability Map**
Does this PRD implement the capability you intended? Does it stay within bounds?

---

## The PRD Quality Checklist

Before handing a PRD to the AI, check:

- [ ] **Objective links to Capability Map** - This implements a defined capability
- [ ] **Scope is explicit** - Both In Scope and Out of Scope are specific
- [ ] **All requirements are testable** - No vague language
- [ ] **Acceptance criteria are verifiable** - Each is a yes/no checkbox
- [ ] **Integration points are mapped** - Inputs, outputs, dependencies defined
- [ ] **Edge cases are specified** - Unusual scenarios have defined behaviors
- [ ] **Constraints are listed** - Technical and practical limitations stated
- [ ] **Out of Scope is explicit** - Features not included are specifically named

---

## The PRD Anti-Patterns

### Anti-Pattern 1: The Vague PRD

> "Build a search feature for my notes that's fast and easy to use."

**Why it fails:** "Fast" and "easy to use" are subjective. The AI will interpret these however it wants.

**Fix:** Define exactly what "fast" means (under 3 seconds) and what "easy to use" means (single input field, clear results, no configuration required).

### Anti-Pattern 2: The Kitchen Sink PRD

> A PRD that tries to build everything at once.

**Why it fails:** Too much scope = too many decisions = too many places for things to go wrong.

**Fix:** One PRD per capability (or sub-capability). Sequence multiple PRDs rather than combining them.

### Anti-Pattern 3: The Assumption-Heavy PRD

> A PRD that leaves decisions implicit because "the AI should know."

**Why it fails:** The AI will make decisions. They won't be your decisions.

**Fix:** Make every decision explicit. If you're unsure, specify a default and note that it might change.

### Anti-Pattern 4: The Feature-First PRD

> A PRD that lists features without connecting to capabilities.

**Why it fails:** Features built without capability context don't add up to a coherent system.

**Fix:** Start every PRD with "This implements the [X] capability of the [Y] system."

### Anti-Pattern 5: The Missing Edge Case PRD

> A PRD that only specifies the happy path.

**Why it fails:** The happy path is 20% of reality. Edge cases are 80%.

**Fix:** For every requirement, ask "What could go wrong?" and specify behavior.

---

## The PRD Template

```markdown
# PRD: [Name]

## Objective
Implement the [Capability] capability of the [System].
[One sentence on what this achieves]

## Scope

### In Scope
- [Specific item]
- [Specific item]

### Out of Scope
- [Specific exclusion]
- [Specific exclusion]

## Requirements
1. [Testable requirement]
2. [Testable requirement]
3. [Testable requirement]

## Acceptance Criteria
- [ ] [Verifiable criterion]
- [ ] [Verifiable criterion]
- [ ] [Verifiable criterion]

## Integration Points

### Inputs
- [What this receives and from where]

### Outputs
- [What this produces and where it goes]

### Dependencies
- [What must exist for this to work]

## Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| [Scenario] | [Behavior] |
| [Scenario] | [Behavior] |

## Constraints
- [Limitation]
- [Limitation]

## Notes
[Any additional context]
```

---

## The PRD Conversation Pattern

When working with AI on a PRD, use this pattern:

**You:** "Here is my PRD for [X]. Before building, confirm you understand all requirements and have no clarifying questions."

**AI:** [Either confirms understanding or asks questions]

**You:** [Answer questions, refine PRD if needed]

**Loop until AI confirms:** "I understand all requirements and have no clarifying questions."

**Only then:** "Build according to the PRD."

**The rule:** Never say "build" until the AI confirms full understanding with no questions.

---

## Summary

The PRD is your specification. Its quality determines the quality of what gets built.

A complete PRD has eight components:
1. Objective - What capability, why it matters
2. Scope - In and Out
3. Requirements - Specific, testable
4. Acceptance Criteria - Verifiable checkboxes
5. Integration Points - Inputs, outputs, dependencies
6. Edge Cases - Unusual scenarios with defined behaviors
7. Constraints - Limitations
8. Out of Scope - Explicit exclusions

Never start building until the AI confirms full understanding with no questions.

The time you invest in PRD quality is repaid many times over in build quality.

---

*This completes the core methodology. Next: Apply it to your specific projects.*
