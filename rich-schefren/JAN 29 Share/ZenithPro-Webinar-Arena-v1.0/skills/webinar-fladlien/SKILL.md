---
name: webinar-fladlien
description: Jason Fladlien's complete One-to-Many webinar methodology orchestrator. Use for end-to-end webinar creation, analysis, and optimization using Fladlien's proven system.
license: Private
metadata:
  version: 1.1.0
  author: Rich Schefren (frameworks by Jason Fladlien)
  category: webinar-orchestrator
  framework_count: 64
  element_skills: 7
  updated: 2025-12-20
---

# Jason Fladlien - Complete One-to-Many Webinar System

## IMPORTANT: Silent Critique Workflow

**After generating any output with this skill, Claude MUST run the webinar-critic agent BEFORE presenting to user.**

```
1. Generate draft using this skill (user does not see)
2. Run webinar-critic agent on draft (user does not see)
3. Log critique findings to ~/.claude/agents/webinar-critic/logs/critique-log.md
4. Log to central system: ~/.claude/learning-system/logs/central-log.md
5. Apply all fixes from critique (user does not see)
6. Present ONLY the final polished output to user
```

**The user sees:** Polished final output only
**The user does NOT see:** Draft, critique, or fix process

---

The full Jason Fladlien methodology for creating high-converting webinars that turn one presentation into infinite sales.

## When to Use This Skill

- Creating a complete webinar from scratch
- Rewriting an entire webinar presentation
- Thorough review of a full webinar
- Any project requiring Fladlien's complete integrated approach

**For surgical fixes** (just intro, just close, etc.), use the specific element skill instead.

## Core Philosophy

**"Build in reverse order of presentation"** - The counter-intuitive method that works:

1. **Build CLOSE first** - Know your destination before mapping the journey
2. **Build CONTENT second** - Know the path that leads there
3. **Build INTRO third** - Know how to foreshadow and set up
4. **Build TRANSITION last** - Bridge everything with momentum

## The 8 Aces (Master These First)

These are the crown jewels—unique, ownable IP that gives you 80% of results:

| Order | Framework | Why Essential | Study Time |
|-------|-----------|---------------|------------|
| **1** | E1. Close Sequence | The structure everything supports | 2-3 hours |
| **2** | E5. Price Anchor Cascade | How you present price determines buying | 2-3 hours |
| **3** | C10. CVCS Method | Definitive content teaching structure | 3-4 hours |
| **4** | C13. Commitment Spectrum | 150 yeses before the ask | 2-3 hours |
| **5** | C2. Knowing-Feeling Distinction | The meta-principle of teaching | 2-3 hours |
| **6** | C4. Six Emotional Levers | Complete emotional toolkit | 2-3 hours |
| **7** | B1. Introduction Pentad | Five objectives every intro must accomplish | 2-3 hours |
| **8** | E18. Money/Time Scripts | Two universal objections handled | 3-4 hours |

## Element Skills Available

### Webinar Sections
- `webinar-fladlien-architecture` - Overall structure (3 frameworks)
- `webinar-fladlien-intro` - Opening 15 minutes (14 frameworks)
- `webinar-fladlien-content` - Teaching section (15 frameworks)
- `webinar-fladlien-transition` - The bridge (4 frameworks)
- `webinar-fladlien-close` - The pitch (18 frameworks)

### Supporting Systems
- `webinar-fladlien-funnel` - Before/after webinar (6 frameworks)
- `webinar-fladlien-delivery` - Presentation craft (4 frameworks)

## Complete Workflow

### Phase 1: Plan & Prepare
1. Validate webinar is right approach (use `webinar-fladlien-architecture`)
2. Define your clearly defined outcome (C7)
3. Identify the dominant emotions to trigger (C4)
4. Map your commitment arc (C13)

### Phase 2: Build the Close (First!)
1. Structure your close sequence (use `webinar-fladlien-close`)
2. Design price anchor cascade (E5)
3. Select and sequence bonuses (E8-E13)
4. Prepare objection handling (E18)
5. **VALIDATE**: Does this close lead to the outcome?

### Phase 3: Build the Content (Second!)
1. Define outcome precisely (use `webinar-fladlien-content`)
2. Structure using CVCS Method (C10)
3. Constrain to 3-5 steps (C8)
4. Layer emotional engagement (C4)
5. Build commitment escalation (C13-C15)
6. **VALIDATE**: Does this content set up the close?

### Phase 4: Build the Introduction (Third!)
1. Apply Introduction Pentad framework (use `webinar-fladlien-intro`)
2. Build authority stack (B2-B6)
3. Get early commitment (B7-B8)
4. Handle pre-objections (B9-B12)
5. Create hope and mystery (B13-B14)
6. **VALIDATE**: Does this intro tease the content and close?

### Phase 5: Build the Transition (Last!)
1. Use all 4 transition frameworks in sequence (use `webinar-fladlien-transition`)
2. D1: Reframe your mindset
3. D2: Recap in 60 seconds
4. D3: Get half-dozen yeses
5. D4: Frame the two choices
6. **VALIDATE**: Does this bridge naturally from teaching to selling?

### Phase 6: Optimize the Funnel
1. Calculate attrition math (use `webinar-fladlien-funnel`)
2. Optimize registration page (F1)
3. Design thank-you page (F2)
4. Create email sequence (F6)
5. Build replay system (F4)

### Phase 7: Polish Presentation
1. Apply show-and-tell principle (use `webinar-fladlien-delivery`)
2. Iterate slides (G2)
3. Add defocus animations (G3)
4. Cut 25% of content (G4)

### Phase 8: Ship & Iterate
1. Get to 80% shippable (A2)
2. Run live webinar
3. Gather data
4. Recalibrate based on real people

## Fladlien's Core Principles

1. **Build in Reverse** - Create in reverse order of presentation
2. **Less Is More** - They want ONE clear path, not four (C1. Value Paradox)
3. **Feeling Over Knowing** - It's not what you know, it's how you FEEL (C2)
4. **Commitments Create Identities** - 150 yeses before the ask (C13)
5. **Transition Serves You** - Puts YOU in right state to sell boldly (D1)
6. **Bonuses Beat Offers** - Spend 2-3x MORE time on bonuses (E8)
7. **Don't Give Up** - Ask 26 times before stopping (E7)
8. **Funnel Math Matters** - Optimization often matters more than webinar (F5)

## Four-Section Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    WEBINAR FLOW                               │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  INTRO (15%)     CONTENT (45%)    TRANSITION (5%)   CLOSE (35%) │
│  0-15 min        15-45 min        45-50 min        50-90 min │
│                                                               │
│  • Authority     • Teaching       • Recap          • Offer   │
│  • Commitment    • Emotion        • State          • Price   │
│  • Objections    • Steps          • Bridge         • Bonuses │
│  • Hope          • Vision                         • Guarantee│
│  • Mystery                                        • Objections│
│                                                   • Scarcity │
│                                                               │
│  BUT BUILD IN REVERSE ORDER:                                 │
│  CLOSE → CONTENT → INTRO → TRANSITION                        │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

## Reference Documents

- `references/blueprint.md` - Complete methodology overview
- `references/meta/build-sequence.md` - Step-by-step build order
- `references/meta/decision-trees.md` - Which framework for which situation
- `references/meta/ace-frameworks.md` - Deep dive on the 8 Aces

## Quality Standards

### Maintain:
- Fladlien's authentic teaching style (clear, direct, strategic)
- Specific psychological insights and mechanisms
- Practical, actionable frameworks
- Counter-intuitive wisdom that works

### Avoid:
- Building in presentation order (kills effectiveness)
- Too much content (violates Value Paradox)
- Rushing through bonuses (violates Bonus Time Ratio)
- Giving up too soon (violates 26 Asks Principle)

## Common Mistakes to Avoid

1. **Building in Presentation Order** - Creates intro that doesn't set up anything
2. **Too Much Content** - Violates Value Paradox (C1)
3. **Rushing Through Bonuses** - Should be 2-3x longer than offer (E8)
4. **Skipping Transition** - Goes directly from teaching to selling (fails)
5. **Not Enough Yeses** - Need 150 commitments before the ask (C13)
6. **Fear of Closing** - Must ask 26 times (E7)

## Related Skills

- `webinar-fladlien-*` - All element skills for specific sections
- `quality-critic` - Evaluate webinar against Fladlien's standards (future)
- `truth-critic` - Verify factual accuracy of claims (future)

---

*Jason Fladlien One-to-Many Suite - Master Orchestrator*
