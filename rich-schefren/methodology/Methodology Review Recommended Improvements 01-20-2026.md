## Methodology Review Complete

I've read all five documents in the methodology. Here's my assessment:

### What's Strong

1. **The Translation Stack is solid.** The five levels (Vision → Architecture → Capability → Specification → Implementation) correctly identify where most people fail - they skip from Vision straight to Implementation or Specification.
    
2. **The Three Questions Protocol is practical.** "What's the system? What must it do? How exactly?" - forces sequential thinking.
    
3. **The PRD Deep Dive is comprehensive.** Eight components, the quality checklist, anti-patterns - this is actionable.
    
4. **The Capability vs Feature distinction is important.** "Never lose information" (capability) vs "Vector database storage" (feature) - this is a crucial mental shift.
    

### Potential Improvements

1. **Missing: The Feedback Loop**
    
    The methodology is linear: Vision → build. But real building is iterative. What happens when:
    
    - You discover during building that a capability was wrong?
    - You realize the architecture needs adjustment?
    - A PRD reveals a Vision problem?
    
    There's no explicit guidance on when and how to revise upward. The "When to Update" sections are brief.
    
2. **Missing: The Verification Layer**
    
    After Implementation, there's CLAUDE.md for context preservation. But there's no explicit step for:
    
    - Verifying the build matches the PRD
    - Documenting what was actually built vs what was specified
    - Learning from gaps between spec and reality
    
    This is where you catch the pattern problems.
    
3. **The Architecture Map could use more structure**
    
    Document 03 gives an example format, but it's a paragraph. For complex systems, you need:
    
    - Visual diagram standards (you're already discovering this with the obsidian-diagram skill)
    - Integration protocol definitions (what format does data flow in?)
    - Dependency verification (does X exist before Y can be built?)
4. **PRD doesn't address iteration within a capability**
    
    The PRD is for "one build session." But complex capabilities need multiple builds. There's no guidance on:
    
    - How to sequence PRDs for a multi-part capability
    - How to version PRDs as understanding evolves
    - When a single PRD becomes multiple PRDs
5. **Missing: The Portability Principle**
    
    From your message that was captured - the shift to everything being portable. This should be woven throughout:
    
    - Vision should be tool-agnostic
    - Architecture should not assume any specific AI
    - Capabilities should be implementable on any platform
    - Skills, agents, memory - all external to the AI
    
    This is a design principle that affects every level.
    

### Suggested Additions

**Document 05: The Verification Protocol**

- After each build: Compare result to PRD
- Document deltas
- Decide: fix, accept, or revise spec
- Feed learning back up the stack

**Document 06: The Portability Principle** (based on your captured insight)

- All architecture, memory, and operating procedures reside outside the AI
- Zero switching cost between AI systems
- Externalized skill files, agent definitions, workflows
- The AI is the executor, not the system