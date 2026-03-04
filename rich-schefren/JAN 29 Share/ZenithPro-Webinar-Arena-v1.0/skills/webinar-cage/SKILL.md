---
name: webinar-cage
description: Michael Cage's Teleseminar System methodology orchestrator. Use for creating high-converting teleseminars using Cage's 4-layer system and Desire Tap philosophy. Trigger when user mentions "Cage", "teleseminar", "webinar conversion", or requests help with presentation/seminar structure.
license: Private
metadata:
  version: 1.1.0
  author: Rich Schefren (frameworks by Michael Cage)
  category: webinar-orchestrator
  framework_count: 12
  updated: 2025-12-20
---

# Michael Cage's Teleseminar System

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

## Core Philosophy: The Desire Tap

"You don't create desire—you tap it, structure it, and guide it to the close."

Michael Cage's methodology is built on a fundamental insight: your audience already wants something. Your job isn't to manufacture desire from nothing. It's to:

1. **Tap** existing desire through precise research (X-Ray)
2. **Structure** that desire through positioning and architecture (Title, 4-Act, Chunks)
3. **Guide** desire to conversion through anticipation and closing (Objections, Close)

This is radically different from most presentation systems that focus on "creating" desire through hype or persuasion. Cage's system is about alignment, not manipulation.

## The 4-Layer Architecture

Cage's system builds in four distinct layers, each with specific frameworks:

### Layer 1: Foundation (Research & Philosophy)
- **Desire Tap** - How to identify and tap existing desire
- **8-Question X-Ray** - Deep audience research methodology

This is where you understand WHO you're talking to and WHAT they already want.

### Layer 2: Positioning (Framing)
- **Title Alchemy** - Crafting magnetic titles that promise transformation
- **Authority Architecture** - Building credibility without ego

This is where you FRAME the conversation and establish your right to lead.

### Layer 3: Architecture (Building)
- **4-Act Structure** - The complete presentation framework
- **Stick Strategies** - Keeping them seated
- **Chunk Architecture** - Content unit design
- **Story Arsenal** - Narrative frameworks
- **Hook Formulas** - Opening attention grabbers
- **Tease-Don't-Tell Method** - Creating forward momentum

This is where you BUILD the actual presentation that delivers value and creates momentum.

### Layer 4: Conversion (Selling)
- **Objection Anticipation** - Preemptive objection handling
- **Close Architecture** - 5-10 minute conversion frameworks

This is where you GUIDE desire to action and close the sale.

## When to Use This Skill

Use the Cage orchestrator when:

- Building a complete teleseminar or webinar from scratch
- Converting existing content into high-converting presentations
- Diagnosing why a presentation isn't converting
- Planning presentation strategy (which frameworks to use when)
- Understanding how Cage's 12 frameworks interconnect
- Exploring combination frameworks for specific outcomes

**For focused work on specific elements:**
- Use `webinar-cage-foundation` for research and philosophy
- Use `webinar-cage-positioning` for title and authority work
- Use `webinar-cage-architecture` for structure and content design
- Use `webinar-cage-conversion` for objection handling and closing

## The 4-Layer Build Sequence

**Phase 1: Foundation First (Always)**
1. Run the 8-Question X-Ray on your audience
2. Identify the Desire Tap (what they already want)
3. Document findings before proceeding

**Phase 2: Position Yourself**
4. Craft your Title using Title Alchemy
5. Build your Authority Architecture
6. Test positioning against X-Ray findings

**Phase 3: Build the Presentation**
7. Map out 4-Act Structure
8. Design 5-10 Chunks (core content units)
9. Select Stick Strategies for each transition
10. Identify Stories that support each chunk
11. Craft Hooks for opening
12. Plan Teases throughout

**Phase 4: Close the Sale**
13. List all possible objections (Objection Anticipation)
14. Design 5-10 minute Close Architecture
15. Embed objection handling throughout

## The 8 Combination Frameworks

Cage's 12 individual frameworks can be combined into 8 powerful systems:

### Tier 1: Master Systems (Ace-Level)

**1. Conversion Cascade**
- Components: Desire Tap + 4-Act Structure + Close Architecture
- Use when: Building a complete conversion-focused presentation
- Output: End-to-end teleseminar optimized for sales

**2. Full-Funnel Presentation System**
- Components: All 12 frameworks integrated
- Use when: Creating a signature presentation or course-level teleseminar
- Output: Complete diagnostic and build system

### Tier 2: Core Frameworks (King/Queen-Level)

**3. Objection Burial Method**
- Components: Objection Anticipation + Story Arsenal + Chunk Architecture
- Use when: Audience is highly skeptical or resistant
- Output: Content that preemptively handles all objections

**4. Tease Architecture**
- Components: Tease-Don't-Tell + 4-Act Structure + Close Architecture
- Use when: High-ticket offers requiring sustained curiosity
- Output: Presentation that builds momentum through strategic withholding

**5. X-Ray to Title Pipeline**
- Components: 8-Question X-Ray + Title Alchemy + Desire Tap
- Use when: Starting from scratch with new audience/offer
- Output: Research-driven positioning

**6. Attention Retention Matrix**
- Components: Hook Formulas + Stick Strategies + Chunk Architecture
- Use when: Combating attention drop-off or low completion rates
- Output: Presentation engineered for retention

**7. Proof Layering System**
- Components: Authority Architecture + Story Arsenal + Chunk Architecture
- Use when: Building credibility with cold or skeptical audience
- Output: Content that systematically builds trust

### Tier 3: Tactical Integration (Jack-Level)

**8. Story-Chunk Integration Map**
- Components: Story Arsenal + Chunk Architecture + Tease-Don't-Tell
- Use when: Transforming teaching content into engaging narrative
- Output: Story-driven content delivery

## How to Use This Orchestrator

### For Complete Teleseminar Creation:

1. **Start with Foundation**
   - Invoke `webinar-cage-foundation` skill
   - Run 8-Question X-Ray
   - Identify Desire Tap

2. **Build Positioning**
   - Invoke `webinar-cage-positioning` skill
   - Create Title using Title Alchemy
   - Design Authority Architecture

3. **Construct Architecture**
   - Invoke `webinar-cage-architecture` skill
   - Map 4-Act Structure
   - Design Chunks, Sticks, Hooks, Teases, Stories

4. **Design Conversion**
   - Invoke `webinar-cage-conversion` skill
   - List objections and handling strategies
   - Build Close Architecture

### For Diagnostic Work:

1. **Identify the problem layer:**
   - Conversion issues → Layer 4 (Conversion)
   - Attention/retention issues → Layer 3 (Architecture)
   - Positioning/credibility issues → Layer 2 (Positioning)
   - Audience misalignment → Layer 1 (Foundation)

2. **Invoke the appropriate element skill**

3. **Consider combination frameworks** that address the specific issue

### For Optimization:

1. Review existing presentation against all 4 layers
2. Identify gaps (missing frameworks)
3. Apply missing frameworks systematically
4. Test combination frameworks for breakthrough improvements

## Quality Criteria

A Cage-compliant teleseminar includes:

**Foundation:**
- [ ] 8-Question X-Ray completed with specific answers
- [ ] Desire Tap clearly identified and articulated
- [ ] Audience understanding documented

**Positioning:**
- [ ] Title that taps desire and promises transformation
- [ ] Authority established without ego or over-credentialing
- [ ] Positioning aligned with X-Ray findings

**Architecture:**
- [ ] 4-Act Structure mapped (<2 min intro, sticks, 5-10 chunks, 5-10 min close)
- [ ] Stick Strategies at every transition point
- [ ] 5-10 Chunks with clear teaching points
- [ ] Stories supporting each major point
- [ ] Hooks that grab attention immediately
- [ ] Teases that create forward momentum

**Conversion:**
- [ ] All major objections listed and handled
- [ ] 5-10 minute Close Architecture designed
- [ ] Objection handling embedded throughout (not just at end)
- [ ] Clear call to action

**Integration:**
- [ ] Content flows from desire tap through to close
- [ ] No gaps or jumps in logic
- [ ] Stories, chunks, and teases work together
- [ ] Authority and objection handling reinforce each other

## Related Skills

**Element Skills (invoke for focused work):**
- `webinar-cage-foundation` - Research and philosophy layer
- `webinar-cage-positioning` - Title and authority layer
- `webinar-cage-architecture` - Structure and content layer
- `webinar-cage-conversion` - Objection and close layer

**Complementary Skills:**
- `clayton` - For written sales copy using Clayton Makepeace methodology
- `product-manager-toolkit` - For audience research and persona development
- `framework-forge` - For creating new frameworks from Cage content

## Reference Files

All Cage frameworks and blueprints are stored in:
- `references/blueprint.md` - Complete system overview
- `references/framework-index.md` - All 12 frameworks with tiers
- `references/combination-frameworks.md` - The 8 combination systems explained

## Notes

- Cage's system is DIAGNOSTIC as well as PRESCRIPTIVE
- Always start with Foundation (never skip X-Ray)
- The 4-Act Structure is the spine—everything else attaches to it
- Desire Tap philosophy should inform every framework application
- When stuck, return to the question: "What do they already want?"

---

*"The best presentations don't convince people to want something new. They help people get what they already want."* — Michael Cage principle
