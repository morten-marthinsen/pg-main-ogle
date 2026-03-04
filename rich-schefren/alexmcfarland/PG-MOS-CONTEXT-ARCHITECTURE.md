# PG-MOS Context Architecture: Layered Context System

**Created:** January 18, 2026  
**Purpose:** Define the layered context architecture for the Performance Golf Marketing Operating System

---

## THE CORE INSIGHT

**The Marketing Operating System needs THREE LAYERS of context:**

1. **Master Constitution Level** - Shared across ALL agents (brand, research, products, promises, avatars)
2. **Agent-Specific Level** - Unique to each agent's function (VSL structure, sales page patterns, email sequences)
3. **Project-Specific Level** - Unique to each project (current product, current research, current campaign)

**The Principle:** Context flows DOWN (master → agent → project), but discovery flows UP (project → agent → master).

---

## LAYER 1: MASTER CONSTITUTION CONTEXT

### What It Is

**Shared context that ALL agents need:**
- Brand guidelines (voice, principles, forbidden patterns)
- Previous research (aggregated patterns, not specific findings)
- Product catalog (what we've done, mechanisms used, outcomes promised)
- Promises made (what we've committed to, guarantees, risk reversals)
- Avatar profiles (who we speak to, but NOT specific audience profiles from research)

### Why It's Master Level

**Every agent needs to:**
- Stay aligned with brand (VSL writer, sales page writer, email writer all need brand voice)
- Avoid repeating what we've done (all agents need mechanism exclusion registry)
- Respect promises made (all agents need to know what we've committed to)
- Speak to our avatars (all agents need to know who we're talking to)

### What Goes In Master Constitution

```json
{
  "master_constitution": {
    "brand_principles": {
      "core_values": ["Transformation", "Empowerment", "Accessibility"],
      "enemy": "The Scattered Playbook",
      "weapon": "One Connected System",
      "forbidden_patterns": [...],
      "voice_pillars": [...],
      "signature_phrases": [...]
    },
    "product_registry": {
      "mechanisms_used": [...],
      "messaging_angles_used": [...],
      "outcomes_promised": [...],
      "authority_markers": [...]
    },
    "promises_made": {
      "guarantees": [...],
      "risk_reversals": [...],
      "commitments": [...]
    },
    "avatar_profiles": {
      "primary_avatars": [...],
      "demographics": {...},
      "psychographics": {...},
      "language_patterns": {...}
    },
    "research_patterns": {
      "market_structure": {...},
      "competitive_intelligence": {...},
      "methodology": {...}
    }
  }
}
```

### Key Distinction

**Master Context = PRINCIPLES & BOUNDARIES**
- What we stand for
- What we don't do
- What we've done
- Who we speak to

**NOT = SPECIFIC FINDINGS**
- Not specific audience profiles from research (those are project-specific)
- Not specific pain/hope buckets (those are project-specific)
- Not specific messaging frameworks (those are project-specific)

---

## LAYER 2: AGENT-SPECIFIC CONTEXT

### What It Is

**Context unique to each agent's function:**
- VSL Agent: How we structure VSLs, what sections we use, what's worked/not worked
- Sales Page Agent: How we review competitor pages, our PDP structure, what converts
- Email Agent: Our email sequence patterns, what's worked/not worked
- Research Agent: Research methodology, quality standards, decision frameworks

### Why It's Agent-Specific

**Each agent has unique needs:**
- VSL Agent needs to know VSL structure patterns, not sales page patterns
- Sales Page Agent needs to know competitor page analysis, not VSL structure
- Research Agent needs to know research methodology, not copywriting patterns

### Example: Sales Page Agent Context

```json
{
  "agent_context": {
    "agent_type": "sales_page",
    "master_references": [
      "master_constitution/brand_principles.json",
      "master_constitution/product_registry.json",
      "master_constitution/promises_made.json"
    ],
    "agent_specific": {
      "pg_sales_page_structure": {
        "required_sections": [...],
        "section_order": [...],
        "section_patterns": {...}
      },
      "competitor_analysis_framework": {
        "review_elements": [...],
        "scoring_criteria": {...},
        "what_works": [...],
        "what_doesnt_work": [...]
      },
      "conversion_patterns": {
        "high_converting_elements": [...],
        "low_converting_elements": [...],
        "tested_variations": [...]
      },
      "pg_do_and_dont": {
        "do": [...],
        "dont": [...],
        "rationale": {...}
      }
    }
  }
}
```

### Example: VSL Agent Context

```json
{
  "agent_context": {
    "agent_type": "vsl_script",
    "master_references": [
      "master_constitution/brand_principles.json",
      "master_constitution/product_registry.json"
    ],
    "agent_specific": {
      "vsl_structure": {
        "required_sections": [...],
        "section_patterns": {...},
        "transition_formulas": [...]
      },
      "vsl_patterns": {
        "hook_formulas": [...],
        "story_structures": [...],
        "proof_patterns": [...]
      },
      "what_works": {
        "high_performing_vsls": [...],
        "winning_patterns": [...]
      },
      "what_doesnt_work": {
        "failed_vsls": [...],
        "patterns_to_avoid": [...]
      }
    }
  }
}
```

### Example: Research Agent Context

```json
{
  "agent_context": {
    "agent_type": "deep_research",
    "master_references": [
      "master_constitution/brand_principles.json",
      "master_constitution/research_patterns.json"
    ],
    "agent_specific": {
      "research_methodology": {
        "context_expansion_patterns": {...},
        "source_type_priorities": {...},
        "quality_standards": {...}
      },
      "decision_frameworks": {
        "expansion_rules": {...},
        "validation_gates": {...}
      },
      "research_patterns": {
        "golf_market_structure": {...},
        "source_quality_patterns": {...}
      }
    }
  }
}
```

---

## LAYER 3: PROJECT-SPECIFIC CONTEXT

### What It Is

**Context unique to each project:**
- Current product (what we're researching/writing about)
- Current research findings (audience profiles, pain/hope buckets, opportunities)
- Current campaign (objectives, constraints, timeline)
- Project brief (specific requirements for this project)

### Why It's Project-Specific

**Each project discovers:**
- New audience profiles (from research)
- New pain/hope buckets (from research)
- New messaging opportunities (from research)
- New competitive intelligence (from research)

**These are DISCOVERED, not reused.**

### Example: Research Project Context

```json
{
  "project_context": {
    "project_id": "one1-wedge-v4",
    "project_type": "deep_research",
    "master_references": [
      "master_constitution/brand_principles.json",
      "master_constitution/research_patterns.json"
    ],
    "agent_references": [
      "agent_context/deep_research.json"
    ],
    "project_specific": {
      "product": {
        "name": "ONE.1 Wedge",
        "category": "Wedges",
        "description": "..."
      },
      "research_findings": {
        "audience_profiles": [...], // DISCOVERED, not reused
        "pain_buckets": [...], // DISCOVERED, not reused
        "hope_buckets": [...], // DISCOVERED, not reused
        "opportunities": [...] // DISCOVERED, not reused
      },
      "campaign": {
        "objectives": [...],
        "constraints": {...},
        "timeline": "..."
      }
    }
  }
}
```

### Example: Sales Page Project Context

```json
{
  "project_context": {
    "project_id": "one1-wedge-sales-page",
    "project_type": "sales_page",
    "master_references": [
      "master_constitution/brand_principles.json",
      "master_constitution/product_registry.json"
    ],
    "agent_references": [
      "agent_context/sales_page.json"
    ],
    "project_specific": {
      "product": {
        "name": "ONE.1 Wedge",
        "research_handoff": "projects/one1-wedge-v4/FINAL_HANDOFF.md"
      },
      "research_intelligence": {
        "audience_profile": {...}, // FROM research project
        "pain_points": [...], // FROM research project
        "messaging_framework": {...}, // FROM research project
        "objection_handling": [...] // FROM research project
      },
      "campaign": {
        "objectives": [...],
        "constraints": {...}
      }
    }
  }
}
```

---

## CONTEXT FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────┐
│              MASTER CONSTITUTION CONTEXT                 │
│  (Brand, Products, Promises, Avatars, Research Patterns)│
│                    ↓ References                          │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ↓                 ↓                 ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ VSL Agent    │  │ Sales Page   │  │ Research     │
│ Context      │  │ Agent Context│  │ Agent Context│
│              │  │              │  │              │
│ VSL structure│  │ Page patterns│  │ Methodology  │
│ VSL patterns │  │ Competitor   │  │ Quality      │
│ What works   │  │ analysis     │  │ standards    │
└──────────────┘  └──────────────┘  └──────────────┘
        │                 │                 │
        ↓                 ↓                 ↓
┌─────────────────────────────────────────────────────────┐
│              PROJECT-SPECIFIC CONTEXT                   │
│  (Current product, Research findings, Campaign details) │
│                                                          │
│  Research Project:                                      │
│  - Discovers: audience, pain/hope, opportunities        │
│                                                          │
│  Sales Page Project:                                     │
│  - Uses: research findings from research project        │
└─────────────────────────────────────────────────────────┘
```

---

## CONTEXT REFERENCE PATTERN

### How Agents Reference Context

**Master Constitution:**
- All agents reference master constitution
- Master constitution is READ-ONLY during project execution
- Updated only through maintenance protocol

**Agent-Specific:**
- Each agent references its own agent context
- Agent context is READ-ONLY during project execution
- Updated only through agent-specific maintenance

**Project-Specific:**
- Each project has its own project context
- Project context is WRITTEN during project execution
- Research project WRITES findings to project context
- Downstream projects READ from research project context

---

## EXAMPLE: SALES PAGE AGENT EXECUTION

### Context Loading Sequence

```
1. Load Master Constitution:
   - Brand principles
   - Product registry
   - Promises made
   - Avatar profiles

2. Load Agent-Specific Context:
   - Sales page structure
   - Competitor analysis framework
   - Conversion patterns
   - PG do's and don'ts

3. Load Project-Specific Context:
   - Current product (ONE.1 Wedge)
   - Research findings (from research project)
   - Campaign objectives

4. Execute:
   - Use master context for brand alignment
   - Use agent context for structure/patterns
   - Use project context for specific content
```

---

## MAINTENANCE PROTOCOL

### Master Constitution Maintenance

**When:** Quarterly  
**Who:** System architects  
**What:**
- Update brand principles (if changed)
- Add new products to registry
- Update promises made
- Refine avatar profiles
- Aggregate research patterns

**Process:**
- Review all projects since last update
- Extract reusable patterns
- Update master constitution
- Version control changes

---

### Agent-Specific Context Maintenance

**When:** After each project using that agent  
**Who:** Agent owner  
**What:**
- Extract what worked (add to "what works")
- Extract what didn't work (add to "what doesn't work")
- Refine patterns based on learnings

**Process:**
- Review project outputs
- Identify patterns
- Update agent context
- Version control changes

---

### Project-Specific Context

**When:** During project execution  
**Who:** Project agent  
**What:**
- Write research findings
- Write project outputs
- Write learnings

**Process:**
- Research project writes findings
- Downstream projects read findings
- Project context is project-specific (not reused)

---

## KEY PRINCIPLES

### Principle 1: Context Flows Down

**Master → Agent → Project**
- Master context guides all agents
- Agent context guides agent execution
- Project context guides specific project

### Principle 2: Discovery Flows Up

**Project → Agent → Master**
- Project discovers new findings
- Agent extracts patterns from projects
- Master aggregates patterns from agents

### Principle 3: Separation of Concerns

**Master = Principles & Boundaries**
- What we stand for
- What we don't do
- What we've done

**Agent = Function-Specific Patterns**
- How to execute this function
- What works for this function
- What doesn't work for this function

**Project = Specific Discoveries**
- What we discovered in this project
- What we're creating in this project
- What we learned in this project

---

## IMPLEMENTATION QUESTIONS

### Question 1: What Goes in Master vs. Agent?

**Master:** Shared across ALL agents
- Brand principles (all agents need)
- Product registry (all agents need)
- Promises made (all agents need)

**Agent:** Specific to agent function
- VSL structure (only VSL agent needs)
- Sales page patterns (only sales page agent needs)
- Research methodology (only research agent needs)

### Question 2: What Goes in Agent vs. Project?

**Agent:** Reusable patterns
- How we structure VSLs (reusable)
- What's worked in VSLs (reusable)
- VSL patterns (reusable)

**Project:** Specific discoveries
- This VSL's specific content (project-specific)
- This product's research findings (project-specific)
- This campaign's objectives (project-specific)

### Question 3: How Do Projects Reference Each Other?

**Research Project → Sales Page Project:**
- Research project writes FINAL_HANDOFF.md
- Sales page project reads FINAL_HANDOFF.md
- Sales page project uses research findings in project context

**Not:**
- Sales page project doesn't reference research project's audience profile as reusable context
- Sales page project uses research findings for THIS project only

---

## NEXT STEPS FOR DISCUSSION

1. **Define Master Constitution Structure**
   - What exactly goes in master constitution?
   - How is it organized?
   - How is it maintained?

2. **Define Agent Context Structure**
   - What agents exist?
   - What context does each agent need?
   - How is agent context maintained?

3. **Define Project Context Structure**
   - How do projects reference master/agent context?
   - How do projects write findings?
   - How do projects reference other projects?

4. **Define Maintenance Protocols**
   - How is master constitution updated?
   - How is agent context updated?
   - How are patterns extracted from projects?

---

## CONCLUSION

**The Layered Context Architecture:**
- **Master Constitution** = Principles & boundaries (shared)
- **Agent-Specific** = Function patterns (reusable)
- **Project-Specific** = Discoveries (one-time)

**The Flow:**
- Context flows DOWN (master → agent → project)
- Discovery flows UP (project → agent → master)

**The Key:**
- Master and Agent context GUIDE execution
- Project context CAPTURES discoveries
- Maintenance EXTRACTS patterns from projects
