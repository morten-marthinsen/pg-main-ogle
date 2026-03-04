---
name: webinar-expert
description: Meta-skill synthesizing 6 webinar experts (Fladlien, Cage, Brunson, Kern, Joon, Kennedy) into superhuman webinar guidance. Provides cross-source synthesis, conflict resolution, and best-of-breed recommendations.
license: Private
metadata:
  version: 2.1.0
  author: Rich Schefren
  category: webinar-meta
  experts_integrated: 6
  total_frameworks: 604
  total_skills: 43
  updated: 2025-12-20
---

# Webinar Expert Meta-Skill

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

This ensures every output meets multi-expert standards and the system learns from patterns.

---

## Purpose

This meta-skill synthesizes the combined wisdom of 6 webinar masters into a single, superhuman guidance system. Rather than choosing between experts, it identifies universal truths, unique contributions, and provides context-based recommendations for when to apply each expert's approach.

**Total System:** 604 frameworks across 43 skills

## Integrated Expert Sources

### Complete Integration (v2.0.0)

1. **Jason Fladlien (One-to-Many System)** - 64 frameworks, 8 skills
   - Master of commitment psychology, emotional leverage, and pitch architecture
   - Known for: 150 Yeses, Price Cascade, Bonus Time Ratio, 6 Emotional Levers
   - Skills: webinar-fladlien (orchestrator) + 7 component skills

2. **Michael Cage (Teleseminar System)** - 12 frameworks, 5 skills
   - Master of desire activation, market diagnosis, and retention mechanics
   - Known for: Desire Tap Philosophy, 8-Question X-Ray, Stick Strategy Arsenal, Title Alchemy
   - Skills: webinar-cage (orchestrator) + 4 component skills

3. **Russell Brunson (Perfect Webinar)** - 120 frameworks, 7 skills
   - Master of paradigm shifts, The Stack, and 16-close architecture
   - Known for: One Thing Principle, Three Secrets, Permission Pattern, Stack methodology
   - Skills: webinar-brunson (orchestrator) + 6 component skills

4. **Frank Kern (Ultimate Webinar Blueprint)** - 265 frameworks, 9 skills
   - Master of pre/post webinar systems, NLP integration, and hybrid delivery
   - Known for: Liquidator Funnel, Indoctrination Sequence, BOND/PAYOFF, 12-Step Ultimate Offer
   - Skills: webinar-kern (orchestrator) + 8 component skills

5. **Peng Joon (Event Codex)** - 56 frameworks, 7 skills
   - Master of live events, energy management, and leverage systems
   - Known for: 5 Pillars, Table Rush, Price Marinade, Testimonial Acquisition, ACV Math
   - Skills: webinar-joon (orchestrator) + 6 component skills

6. **Dan Kennedy (Selling One To Many)** - 87 frameworks, 7 skills
   - Master of media-agnostic architecture, E-Factors, and direct-sales precision
   - Known for: Universal Structure, E-Factors, Assumed Knowledge Trap, Time Box Engineering
   - Skills: webinar-kennedy (orchestrator) + 6 component skills

## When to Use This Skill

### Primary Use Cases

1. **Building Complete Webinars** - When you need to create a webinar from scratch using best-of-breed practices from all experts

2. **Diagnosing Webinar Issues** - When a webinar isn't converting and you need multi-expert analysis to find the problem

3. **Optimizing Existing Webinars** - When you want to improve performance by applying insights from multiple methodologies

4. **Expert Comparison** - When you want to understand different approaches to the same challenge ("How would Fladlien handle this vs. Cage?")

5. **Context-Based Recommendations** - When you need guidance on which expert's approach fits your specific situation (price point, market sophistication, product type)

### When NOT to Use This Skill

- **Single-Expert Purity** - If you want to learn one specific methodology in isolation, use the individual expert skills instead
- **Non-Webinar Content** - This is specifically for one-to-many selling presentations, not all educational content
- **Too Early** - If you don't yet have a clear offer, use product development frameworks first

## Expert Comparison Matrix

| Expert | Frameworks | Best For | Unique Strength |
|--------|------------|----------|-----------------|
| **Fladlien** | 64 | High-conversion closes | Commitment psychology, 150 Yeses |
| **Cage** | 12 | Teleseminars, retention | Desire Tap, 8-Question X-Ray |
| **Brunson** | 120 | Course/coaching sales | Perfect Webinar structure, The Stack |
| **Kern** | 265 | Complete systems | Pre/post funnel, hybrid delivery |
| **Joon** | 56 | Live events | Energy management, table rush |
| **Kennedy** | 87 | Any media | Media-agnostic architecture, E-Factors |

## Universal Truths (All 6 Experts Agree)

These principles appear across ALL experts and represent fundamental laws:

1. **Structure Before Content** - All experts build architecture first
2. **Commitment Precedes Conversion** - Build commitment before asking for sale
3. **Objections Must Be Handled Before Close** - Never leave objections for Q&A
4. **Authority Must Be Established** - Even warm audiences need re-establishment
5. **The Close Is The Whole Presentation** - Not just the pitch section
6. **Tell Them What NOT To Do** - Contrast creates clarity
7. **Stories Beat Logic** - Emotion drives purchase, logic justifies
8. **Repetition Is Required** - Key points need 7-21 touches
9. **Scarcity Must Be Believed** - Fake scarcity destroys trust
10. **Risk Reversal Is Math** - Calculate and offer appropriately

## Unique Contributions By Expert

### Fladlien Only
- 150 Yeses commitment system
- 6 Emotional Levers framework
- Price Cascade architecture
- Bonus Time Ratio (exact minutes per dollar)

### Cage Only
- Desire Tap Philosophy (tap existing desires)
- 8-Question X-Ray (market diagnosis)
- 4-Layer System (Foundation → Positioning → Architecture → Conversion)
- Stick Strategy Arsenal (retention mechanics)

### Brunson Only
- One Thing Principle (single belief shift)
- Three Secrets structure (content framework)
- Break & Rebuild pattern
- Permission Pattern (they ASK you to sell)
- The Stack (visual value build)
- 16+ Close variations

### Kern Only
- Liquidator Funnel (front-end profit machine)
- Indoctrination Sequence (5-phase pre-webinar)
- BOND/PAYOFF content structure
- 12-Step Ultimate Offer
- Hybrid Method (live + recorded)
- 10 Re-Close Days system

### Joon Only
- 5 Pillars (ticket → show-up → fulfill → upsell → leverage)
- Table Rush mechanics
- Price Marinade (high-ticket early reveal)
- Bonus Marinade (build value during teaching)
- Energy Management systems
- Testimonial Acquisition Process (1000+ testimonials)
- ACV Math (funnel economics)

### Kennedy Only
- Media-agnostic architecture (stage = webcast = DVD)
- E-Factors (10 emotional drivers)
- Assumed Knowledge Trap
- Time Box Engineering
- Pre-Presentation Establishment Control
- Physical room sales prevention tactics
- Presenter Tells to Avoid (6 selling tells)

## Operational Modes

### Mode 1: Creation Mode

**Purpose:** Build webinars from scratch using synthesized best practices.

**How to Use:**
```
I need to create a webinar for [product/service].
Context: [price point, market sophistication, audience size]
Mode: Creation
```

**What You Get:**
- Synthesis of universal truths from all experts
- Context-based recommendations on which approaches to prioritize
- Complete structure incorporating best-of-breed elements
- Decision rationale (why we're using Fladlien's approach here, Cage's there)

**Process:**
1. Market analysis (Cage's 8-Question X-Ray + Fladlien's audience profiling)
2. Title development (Cage's Title Alchemy + Fladlien's hook principles)
3. Structure design (synthesized from both, context-dependent)
4. Content sequencing (best practices from both)
5. Close architecture (Fladlien's systems + Cage's objection handling)
6. Retention mechanics (Cage's Stick Strategy + Fladlien's commitment psychology)

### Mode 2: Analysis Mode

**Purpose:** Evaluate existing webinars against all expert standards.

**How to Use:**
```
Analyze this webinar: [content/outline/transcript]
Mode: Analysis
Show me compliance with: [all experts | specific expert | specific frameworks]
```

**What You Get:**
- Multi-expert evaluation scorecard
- Identification of which expert principles are present/missing
- Specific framework compliance checks
- Benchmarking against empirical standards
- Priority recommendations for improvement

**Evaluation Dimensions:**
- **Fladlien Standards:** Commitment psychology, emotional leverage, transition quality, pitch architecture
- **Cage Standards:** Desire activation, objection pre-handling, content chunking, retention mechanics
- **Universal Standards:** Authority building, story usage, handle-before-close, teasing quality
- **Empirical Benchmarks:** Time ratios, content density, engagement patterns

### Mode 3: Optimization Mode

**Purpose:** Diagnose and fix specific webinar issues using combined frameworks.

**How to Use:**
```
My webinar has this problem: [low attendance, poor engagement, weak close, etc.]
Mode: Optimization
Current metrics: [conversion rate, attendance rate, replay performance, etc.]
```

**What You Get:**
- Root cause diagnosis using all expert frameworks
- Multiple solution pathways (expert-specific recommendations)
- Prioritized fix list (highest-impact changes first)
- A/B test recommendations
- Expected outcome predictions based on expert benchmarks

**Problem-Solving Framework:**
1. Symptom identification
2. Multi-expert diagnosis (what would each expert say is the root cause?)
3. Solution synthesis (combine approaches or choose best-fit)
4. Implementation roadmap
5. Testing protocol

### Mode 4: Expert-Specific Mode

**Purpose:** Get one expert's pure perspective on a challenge.

**How to Use:**
```
What would [Fladlien | Cage] do about: [specific challenge]?
Mode: Expert-Specific
Expert: [name]
```

**What You Get:**
- Pure application of that expert's methodology
- Relevant frameworks from that expert only
- Language and concepts specific to that expert's system
- Case studies/examples from that expert's work

**When to Use:**
- You want to learn one methodology deeply
- You're already trained in one system and want purity
- You need to compare approaches side-by-side
- You're teaching one specific system

## How to Invoke Expert-Specific Guidance

### Command Structure

**Get Fladlien's approach:**
```
Webinar-expert: Fladlien lens
Challenge: [describe your situation]
```

**Get Cage's approach:**
```
Webinar-expert: Cage lens
Challenge: [describe your situation]
```

**Get synthesis:**
```
Webinar-expert: Synthesize
Challenge: [describe your situation]
Context: [price, audience, product type]
```

### Context Variables That Matter

When asking for guidance, include:

1. **Price Point** - Determines length, depth, sophistication
   - Under $500 (short, fast, Fladlien/Brunson bias)
   - $500-$2,000 (medium, Brunson's Perfect Webinar)
   - $2,000-$10,000 (longer, Kern/Cage bias)
   - $10,000+ (comprehensive, Joon's high-ticket, Kennedy's precision)

2. **Market Sophistication** - Determines content style
   - Level 1-2 (simple, Fladlien's directness)
   - Level 3-4 (moderate, Brunson's paradigm shifts)
   - Level 5 (nuanced, Kern's NLP, Kennedy's E-Factors)

3. **Delivery Format**
   - Live webinar (Brunson, Fladlien optimization)
   - Automated evergreen (Kern's hybrid method)
   - Live event/stage (Joon's energy management)
   - Any media (Kennedy's universal architecture)

4. **System Completeness Needed**
   - Webinar only (Brunson, Fladlien)
   - Pre + webinar + post (Kern's complete system)
   - Event ecosystem (Joon's 5 pillars)

5. **Goal**
   - Maximize conversion (Fladlien, Brunson)
   - Build relationship (Cage, Kern)
   - Live event excellence (Joon)
   - Media-agnostic precision (Kennedy)

## Synthesis Philosophy

### Core Principles

1. **Universal Truths First** - Where experts agree, that's law
2. **Context Determines Choice** - Use decision trees for conflicts
3. **Best-of-Breed Combination** - Take each expert's unique genius
4. **Test-Driven Resolution** - When in doubt, test both approaches
5. **Compound Rather Than Choose** - Often you can use both, sequentially

### Decision Framework

When experts conflict:
1. Check context variables (price, sophistication, type)
2. Apply decision trees (see `references/meta/decision-trees.md`)
3. If still unclear, default to test protocol
4. Document learnings for future synthesis

### Quality Standards

Recommendations from this meta-skill should be:
- **Grounded** - Traceable to specific expert frameworks
- **Context-Aware** - Acknowledge when/why to use each approach
- **Actionable** - Clear implementation steps
- **Testable** - Include success metrics and benchmarks
- **Comprehensive** - Don't miss unique contributions from any expert

## Reference Structure

```
~/.claude/skills/webinar-expert/
├── SKILL.md (this file)
├── references/
│   ├── meta/
│   │   ├── synthesis-map.md         # Universal truths + unique contributions
│   │   ├── decision-trees.md        # Context-based expert selection
│   │   └── benchmark-standards.md   # Empirical metrics from all experts
│   ├── fladlien/
│   │   └── [links to fladlien skill references]
│   └── cage/
│       └── [links to cage skill references]
```

## Integration with Other Skills

### Individual Expert Skills (Use for Pure Methodology)
- **webinar-fladlien** - Pure Fladlien One-to-Many system
- **webinar-cage** - Pure Cage Teleseminar system
- **webinar-brunson** - Pure Brunson Perfect Webinar
- **webinar-kern** - Pure Kern Ultimate Webinar Blueprint
- **webinar-joon** - Pure Joon Event Codex
- **webinar-kennedy** - Pure Kennedy Selling One To Many

### Critic Agent
**webinar-critic** - Uses this meta-skill for multi-expert evaluation
- Evaluates against ALL 6 expert standards simultaneously
- 5-tier evaluation system
- Provides specific improvement recommendations

### Supporting Skills
**Clayton Skills:**
- For copy within webinar (slides, emails, landing pages)
- Webinar-expert handles structure/psychology, Clayton handles words

**Product-Manager-Toolkit:**
- For offer creation before webinar design
- Webinar-expert assumes offer exists

## Complete Skill Map

```
webinar-expert (META-SYNTHESIS - 604 frameworks)
├── webinar-fladlien (64 frameworks)
│   ├── webinar-fladlien-architecture
│   ├── webinar-fladlien-intro
│   ├── webinar-fladlien-content
│   ├── webinar-fladlien-transition
│   ├── webinar-fladlien-close
│   ├── webinar-fladlien-delivery
│   └── webinar-fladlien-funnel
│
├── webinar-cage (12 frameworks)
│   ├── webinar-cage-foundation
│   ├── webinar-cage-positioning
│   ├── webinar-cage-architecture
│   └── webinar-cage-conversion
│
├── webinar-brunson (120 frameworks)
│   ├── webinar-brunson-architecture
│   ├── webinar-brunson-intro
│   ├── webinar-brunson-content
│   ├── webinar-brunson-transition
│   ├── webinar-brunson-close
│   └── webinar-brunson-delivery
│
├── webinar-kern (265 frameworks)
│   ├── webinar-kern-architecture
│   ├── webinar-kern-intro
│   ├── webinar-kern-content
│   ├── webinar-kern-transition
│   ├── webinar-kern-close
│   ├── webinar-kern-delivery
│   ├── webinar-kern-funnel (CROWN JEWEL)
│   └── webinar-kern-followup (CROWN JEWEL)
│
├── webinar-joon (56 frameworks)
│   ├── webinar-joon-funnel
│   ├── webinar-joon-intro
│   ├── webinar-joon-content
│   ├── webinar-joon-transition
│   ├── webinar-joon-close
│   ├── webinar-joon-leverage
│   └── webinar-joon-delivery
│
└── webinar-kennedy (87 frameworks)
    ├── webinar-kennedy-architecture
    ├── webinar-kennedy-intro
    ├── webinar-kennedy-content
    ├── webinar-kennedy-transition
    ├── webinar-kennedy-close
    └── webinar-kennedy-delivery
```

## Evolution Plan

### Version 2.0 (Current - December 2025)
- ✅ 6 experts fully integrated
- ✅ 604 frameworks across 43 skills
- ✅ Universal truths identified
- ✅ Unique contributions mapped
- ✅ Context-based recommendations

### Version 2.1 (Planned)
- Add conflict resolution decision trees for all 6 experts
- Empirical benchmark database
- Cross-expert workflow templates

### Version 3.0 (Vision)
- Machine learning on which expert approaches work best for which contexts
- Predictive modeling for conversion rates
- Automated A/B test generation
- Integration with webinar analytics tools

## Usage Examples

### Example 1: Creating a $2,000 Course Webinar

```
User: I need to create a webinar to sell my $2,000 course on Facebook ads to mid-level marketers.

Webinar-Expert Response:
Context Analysis:
- Price: $2,000 (medium-high) → Suggests 90-120 minute format
- Audience: Mid-level → Sophisticated enough for depth, need proof
- Product: Course → Educational, needs transformation promise

Synthesis Recommendation:
- Structure: Brunson's Perfect Webinar (proven for course sales)
- Content: Brunson's Three Secrets + Kern's BOND/PAYOFF
- Close: Brunson's Stack + Fladlien's Price Cascade
- Psychology: Kennedy's E-Factors + Fladlien's 150 Yeses

[Detailed implementation follows...]
```

### Example 2: Diagnosing Low Conversion

```
User: My webinar gets 200 attendees but only 3-5 sales. What's wrong?

Webinar-Expert Response:

6-Expert Diagnosis:

Fladlien: Not enough commitment buildup (150 Yeses check)
Cage: Wrong desire activated (8-Question X-Ray alignment)
Brunson: Missing paradigm shift (One Thing Principle)
Kern: No pre-webinar indoctrination (5-phase check)
Joon: Energy management failure (state change check)
Kennedy: Assumed Knowledge Trap (establishment check)

Universal Diagnosis:
- 1.5-2.5% conversion is normal baseline
- If below 1%: Fundamental mismatch (offer/audience/positioning)
- If 1-2%: Tactical fixes (commitment, objections, proof)

Priority Fix List:
1. Check pre-webinar sequence (Kern) - often the root cause
2. Verify paradigm shift in content (Brunson)
3. Add commitment mechanics (Fladlien)
4. Re-establish authority (Kennedy)
```

### Example 3: Live Event vs Webinar

```
User: I'm converting my webinar to a live 3-day event. What changes?

Webinar-Expert Response:

Primary Expert: Peng Joon (Event Codex - 56 frameworks)

Key Changes from Webinar to Live Event:

1. SHOW-UP (Joon's Pillar 2)
   - Micro-commitments before event
   - Pre-training content
   - Venue walkthrough video

2. ENERGY (Joon's unique contribution)
   - State change management (especially after lunch)
   - Written exercises → Partner shares → Class shares
   - PowerPoint for selling, flip charts for teaching

3. TABLE RUSH (Joon's Pillar 4)
   - Universal question → Hand raise → Stand up → Move
   - Bonus marinade during content
   - Price marinade for high-ticket (reveal early)

4. LEVERAGE (Joon's Pillar 5)
   - Testimonial acquisition process
   - Group photo boost strategy
   - Sizzle reel capture

Secondary Expert: Kennedy (physical room tactics)
- Block easy exit with product tables
- Stampede creation
- Second bite at apple (return after break)
```

### Example 4: Pre/Post Webinar Systems

```
User: My webinar converts well but I want a complete system around it.

Webinar-Expert Response:

Primary Expert: Frank Kern (265 frameworks - most complete system)

PRE-WEBINAR (Kern's Liquidator + Indoctrination):
1. Liquidator Funnel - profitable front-end
2. 5-Phase Indoctrination Sequence:
   - Confirmation (they made right choice)
   - The Difference (why you're different)
   - Hot Cognition Pattern Interrupt
   - Transformation stories
   - Why This Solution

POST-WEBINAR (Kern's 10 Re-Close Days):
- Day 1-3: Replay + urgency
- Day 4-6: Objection handling
- Day 7-10: Final push + deadline

Secondary Expert: Joon (Pillar 5 - Leverage)
- ACV Math (know your numbers)
- Testimonial acquisition
- Content repurposing
```

## Critical Success Factors

1. **Always State Source** - Make clear which expert a recommendation comes from
2. **Acknowledge Conflicts** - Don't hide when experts disagree
3. **Provide Context** - Explain WHY one approach fits better for this situation
4. **Enable Testing** - Give users tools to test competing approaches
5. **Document Learnings** - Feed results back into synthesis map

## Support & Evolution

This is a living skill. As we:
- Test recommendations in real webinars
- Add new expert sources
- Discover new synthesis patterns
- Find better conflict resolution rules

...the skill evolves. Document learnings in the references/meta/ folder and update the synthesis map.

---

## Quick Reference: Which Expert for What

| Challenge | Primary Expert | Why |
|-----------|----------------|-----|
| Low conversion | Fladlien | 150 Yeses commitment system |
| Weak authority | Kennedy | Pre-establishment control |
| Content overwhelm | Brunson | One Thing Principle |
| No pre-webinar | Kern | Liquidator + Indoctrination |
| Live event | Joon | Energy + Table Rush |
| Retention issues | Cage | Stick Strategy Arsenal |
| Price objections | Fladlien | Price Cascade |
| Boring content | Brunson | Break & Rebuild pattern |
| Post-webinar | Kern | 10 Re-Close Days |
| High-ticket | Kennedy + Joon | E-Factors + Price Marinade |
| Media conversion | Kennedy | Media-agnostic architecture |
| Testimonials | Joon | Acquisition Process |
| Complete system | Kern | 265 frameworks, full ecosystem |

---

*This meta-skill synthesizes 6 masters and 604 frameworks into superhuman webinar guidance. It honors each expert's unique contributions while creating something greater than the sum of its parts.*

*Version 2.0 - December 2025*
