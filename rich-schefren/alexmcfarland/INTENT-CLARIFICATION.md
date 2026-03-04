# PG-MOS Context Architecture: Intent Clarification

**Created:** January 18, 2026  
**Purpose:** Clarify and confirm understanding of the layered context architecture intent

---

## YOUR INTENT (As I Understand It)

You're building a **dependency-graph marketing operating system** where:

1. **Research is the foundation** - Everything flows from research
2. **Sales Page/VSL is the primary copy output** - This becomes the "source of truth" for messaging
3. **All other assets reference back** - Upsells, emails, ads all tie to the primary copy
4. **Performance feedback loops back** - What works updates the system

---

## THE DEPENDENCY FLOW

```
STEP 1: RESEARCH PROJECT
├── Discovers: audience, pain/hope, opportunities, messaging framework
└── Outputs: FINAL_HANDOFF.md (research intelligence)

STEP 2: PRIMARY COPY CREATION
├── Sales Page Agent OR VSL Agent
├── References: Research FINAL_HANDOFF.md
├── References: Master Constitution (brand, rules, patterns)
├── References: Agent-Specific Context (structure, components, what works)
└── Outputs: Sales Page Copy OR VSL Script

STEP 3: SECONDARY ASSETS (Reference Primary Copy)
├── Upsell Page Agent
│   ├── References: Research FINAL_HANDOFF.md (product context)
│   └── References: Sales Page/VSL Copy (messaging consistency)
│
├── Email Agent
│   ├── References: Research FINAL_HANDOFF.md (angles, language)
│   ├── References: Sales Page Copy (messaging consistency)
│   └── References: VSL Copy (angles, hooks)
│
└── Ads Agent
    ├── References: Sales Page Copy (congruency)
    ├── References: VSL Copy (angles, hooks)
    └── References: Research FINAL_HANDOFF.md (new angles when exhausted)

STEP 4: PERFORMANCE FEEDBACK
├── Extract: What worked, what didn't work
├── Update: Master Constitution (winning patterns)
└── Update: Agent-Specific Context (winning patterns)
```

---

## MASTER CONSTITUTION SCOPE (Confirmed)

### What Goes In Master Constitution:

1. **Brand Guidelines**
   - Voice, principles, forbidden patterns
   - Signature phrases
   - Brand boundaries

2. **Avatar Profiles (PG Level)**
   - Who we speak to at Performance Golf level
   - General demographics, psychographics
   - Language patterns
   - **NOT:** Specific research findings (those are project-specific)

3. **Product Catalog**
   - All products we've sold
   - How products work together
   - Mechanisms used
   - Outcomes promised
   - Authority markers

4. **Research Patterns/Methodologies**
   - How we conduct research
   - Quality standards
   - Decision frameworks
   - Market structure patterns

5. **A to Z Copywriting Rules**
   - Universal copywriting rules that ALWAYS apply
   - Rules that govern ALL copy creation
   - Not format-specific, but principle-based

### What Does NOT Go In Master Constitution:

- ❌ Specific research findings (audience profiles, pain/hope buckets from research)
- ❌ Project-specific messaging frameworks
- ❌ Campaign-specific objectives

---

## AGENT CONTEXT BOUNDARIES (Confirmed)

### Agent Context Needs to Be VERY Specific

**Example: Sales Page Agent**

**Agent Context Includes:**
1. **Structure** - How we structure sales pages
2. **Competitor Analysis Framework** - How we analyze competitor pages
   - References research FINAL_HANDOFF.md for competitor intelligence
3. **Component Library** - Components that go on pages
4. **Winning Components Registry** - What components have worked
5. **Cross-Reference System** - How to cross-reference components to winning patterns
6. **Multiple Sub-Skills** - Different skills within the agent for different tasks

**The Agent is a SYSTEM, not just instructions:**
- Has multiple skills/sub-agents
- Has component libraries
- Has pattern matching
- Has cross-referencing capabilities

---

## PROJECT CROSS-REFERENCING (Confirmed)

### The Dependency Chain:

**Research Project (Step 1)**
- Discovers everything fresh
- Outputs: FINAL_HANDOFF.md

**Primary Copy Creation (Step 2)**
- Sales Page Agent OR VSL Agent
- References: Research FINAL_HANDOFF.md
- Outputs: Sales Page Copy OR VSL Script

**Secondary Assets (Step 3) - All Reference Primary Copy:**

**Upsell Page Agent:**
- References: Research FINAL_HANDOFF.md (product context for upsell)
- References: Sales Page/VSL Copy (messaging consistency - "tie together seamlessly")

**Email Agent:**
- References: Research FINAL_HANDOFF.md (angles, language patterns)
- References: Sales Page Copy (messaging consistency)
- References: VSL Copy (angles, hooks to pull out)

**Ads Agent:**
- References: Sales Page Copy (congruency - ads must match sales page)
- References: VSL Copy (angles, hooks)
- When exhausted angles from sales page/VSL:
  - Goes back to Research FINAL_HANDOFF.md
  - Finds new angles
  - Ties to: big idea, mechanism, problem-solution structure from sales page

---

## MAINTENANCE & FEEDBACK LOOP (Confirmed)

### Performance Feedback System:

**What Gets Updated:**

1. **Master Constitution**
   - Winning copywriting patterns
   - Winning messaging angles
   - Winning component patterns
   - Updated based on performance data

2. **Agent-Specific Context**
   - Winning components (for Sales Page Agent)
   - Winning email patterns (for Email Agent)
   - Winning ad angles (for Ads Agent)
   - Updated based on performance data

3. **Sub-Agents/Skills**
   - Individual skills within agents
   - Updated based on what worked/didn't work

**The Feedback Loop:**
```
Performance Data → Extract Patterns → Update Master/Agent Context → System Gets Better
```

---

## KEY INSIGHTS FROM YOUR CLARIFICATION

### Insight 1: Research is the Foundation

**Research Project is ALWAYS Step 1:**
- Everything else depends on research
- Research discovers what's NEW
- All other agents use research findings

### Insight 2: Sales Page/VSL is the Primary Copy

**Sales Page/VSL becomes the "source of truth":**
- All other assets reference it
- Ensures messaging consistency
- Creates seamless customer experience

### Insight 3: Cascading References

**The Reference Chain:**
- Research → Sales Page/VSL
- Sales Page/VSL → Upsell, Email, Ads
- Research → Email, Ads (when primary copy exhausted)

**This creates:**
- Consistency (all assets reference primary copy)
- Freshness (can go back to research for new angles)
- Efficiency (don't rebuild messaging for each asset)

### Insight 4: Agents Are Systems, Not Just Instructions

**Each Agent Has:**
- Multiple skills/sub-agents
- Component libraries
- Pattern matching
- Cross-referencing
- Winning pattern registries

**This is more than "instructions" - it's a SYSTEM.**

---

## QUESTIONS TO CLARIFY

### Question 1: Master Constitution - Avatar Profiles

**You said:** "Avatar profiles at Performance Golf level"

**Clarification needed:**
- Are these GENERAL avatar profiles (e.g., "Everyday golfer, 45-65, 15-25 handicap")?
- Or are these SPECIFIC avatar profiles from research (e.g., "ONE.1 Wedge target: frustrated short game player")?

**My understanding:** General PG-level avatars (who we speak to in general), NOT specific research findings.

**Confirm?**

---

### Question 2: A to Z Copywriting Rules

**You said:** "A to Z copywriting rules that it always follows"

**Clarification needed:**
- Are these universal principles (e.g., "Benefit-first, always")?
- Or are these specific rules (e.g., "Always include social proof in paragraph 3")?

**My understanding:** Universal copywriting principles that apply to ALL copy, regardless of format.

**Confirm?**

---

### Question 3: Agent Sub-Skills Structure

**You said:** Sales Page Agent has "multiple layers within there that that sales page agent is going to have skills to do"

**Clarification needed:**
- Are these sub-skills WITHIN the agent (like your research micro-skills)?
- Or are these separate agents that the Sales Page Agent calls?

**My understanding:** Sub-skills within the agent (similar to your research micro-skills pattern).

**Confirm?**

---

### Question 4: Performance Feedback Extraction

**You said:** "Feedback loop that we pull in from data that we extract to show what worked, what didn't work"

**Clarification needed:**
- What data sources? (Ad performance, email open rates, conversion rates?)
- How is it extracted? (Automated? Manual? Hybrid?)
- What triggers an update? (Threshold? Schedule? Manual review?)

**My understanding:** Performance data (conversions, engagement, etc.) gets analyzed, patterns extracted, and master/agent context updated.

**Confirm?**

---

## MY UNDERSTANDING OF YOUR INTENT

**You're building a Marketing Operating System that:**

1. **Starts with Research** - Discovers everything fresh for each product
2. **Creates Primary Copy** - Sales Page/VSL becomes the messaging source of truth
3. **Cascades to Secondary Assets** - All other assets reference primary copy for consistency
4. **Maintains Freshness** - Can go back to research when primary copy angles are exhausted
5. **Learns from Performance** - Feedback loop updates the system based on what works

**The System Architecture:**
- Master Constitution = Universal principles (brand, rules, patterns)
- Agent Context = Function-specific systems (structure, components, what works)
- Project Context = Discoveries (research findings, created copy)

**The Flow:**
- Research → Primary Copy → Secondary Assets
- Performance → Feedback → System Updates

**Is this correct?**
