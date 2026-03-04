---
name: evaldo
description: Evaldo Albuquerque complete copywriting workflow. Use for full VSLs, complete rewrites, thorough copy reviews, or any project requiring the full Evaldo methodology. Orchestrates all Evaldo element skills and enforces his systematic approach.
license: Private
metadata:
  version: 1.1.0
  author: Rich Schefren (frameworks by Evaldo Albuquerque)
  category: copywriting-orchestrator
  total_frameworks: 66
  element_skills: 8
  updated: 2025-12-20
---

# Evaldo Albuquerque - Complete Copywriting System

## IMPORTANT: Silent Critique Workflow

**After generating any output with this skill, Claude MUST run the evaldo-critic agent BEFORE presenting to user.**

```
1. Generate draft using this skill (user does not see)
2. Run evaldo-critic agent on draft (user does not see)
3. Log critique findings to ~/.claude/agents/evaldo-critic/logs/critique-log.md
4. Log to central system: ~/.claude/learning-system/logs/central-log.md
5. Apply all fixes from critique (user does not see)
6. Present ONLY the final polished output to user
```

**The user sees:** Polished final output only
**The user does NOT see:** Draft, critique, or fix process

This ensures every output meets Evaldo standards and the system learns from patterns.

---

The full Evaldo Albuquerque methodology for writing high-converting VSLs and sales copy. Evaldo is one of Agora's most successful financial copywriters, known for the "16-Word Sales Letter" framework and his systematic approach to video sales letters that convert.

## When to Use This Skill

- Writing a complete VSL from scratch
- Rewriting an entire piece of sales copy
- Thorough review of a full VSL
- Any project requiring Evaldo's complete integrated approach

**For surgical fixes** (just headlines, just bullets, etc.), use the specific element skill instead.

## Element Skills Available

### Copy Elements
- `evaldo-headlines` (12 frameworks) - 13 boosters, open loops, curiosity-benefit
- `evaldo-leads` (10 frameworks) - 10 Questions structure, punch in gut, story types
- `evaldo-body` (8 frameworks) - Proof pyramid, mechanism reveal, content triangle
- `evaldo-bullets` (6 frameworks) - Curiosity+benefit, parenthesis technique
- `evaldo-close` (10 frameworks) - Stacking, price anchor, guarantee, urgency
- `evaldo-lifts` (6 frameworks) - DICK method, safe vs intriguing, campaigns

### Foundations
- `evaldo-philosophy` (8 frameworks) - Croc Brain, Three Box Check, One Belief
- `evaldo-ideas` (6 frameworks) - New mechanism, Stockholm Shoe, idea sources

## Crown Jewels (Evaldo's Unique Contributions)

### 1. The One Belief Formula
"This new opportunity is the key to their desire and it's only attainable through my new mechanism."

This 16-word formula is the foundation of every Evaldo promotion. Every sentence, every proof point, every story supports this ONE belief. If they believe it, they buy. If they don't, they don't.

### 2. The 10 Questions Structure
Every VSL answers the same 10 questions:
1. What is the new opportunity?
2. Why now?
3. What's in it for me?
4. How does it work?
5. Who are you and why should I listen?
6. Can you prove it?
7. How is this different from other solutions?
8. What do I get?
9. What's it gonna cost me?
10. What do I do now?

### 3. The Croc Brain Filters
Before any message reaches the thinking brain, it must pass through the primitive "croc brain":
- **Lion/Rabbit** - Is this a threat or opportunity?
- **Geico Filter** - Is this simple or complex?
- **Curiosity Filter** - Is this new or familiar?

### 4. The Three Box Check
Every winning idea must check ALL three boxes:
- **EMOTIONAL** - Does it move you?
- **SIMPLE** - Can a child understand it?
- **NEW** - Haven't seen it before?

### 5. VSLs as Mini-Movies
A VSL is NOT an ad. It's a mini-movie. When you think "ad," you write pitchy, salesy content. When you think "movie," you write entertainment that persuades.

### 6. The DICK Method (for Lifts)
- **D**isrupt - Break their pattern
- **I**ntrigue - Create curiosity
- **C**all to action - Click
- **K**eep short - 50-150 words

## Complete Workflow

### Phase 1: Idea Development
1. Apply the Three Box Check (use `evaldo-philosophy`)
2. Pass idea through Croc Brain filters
3. Find the new MECHANISM, not just new promise (use `evaldo-ideas`)
4. Apply Stockholm Shoe method - what is everyone else NOT saying?
5. Write the One Belief formula for your product

### Phase 2: Structure Planning
1. Answer all 10 Questions in writing (use `evaldo-leads`)
2. Choose story type: Guru, Little Guy, or Common Enemy
3. Plan credibility elements (credentials, results, associations)
4. Design offer structure (stack, bonuses, guarantee)
5. Map urgency approach

### Phase 3: Write (Section by Section)
1. Write 25-50 headline variations (use `evaldo-headlines`)
2. Write the Punch in the Gut opening
3. Structure first 5 minutes critically (use `evaldo-leads`)
4. Build proof pyramid (use `evaldo-body`)
5. Write bullets with Curiosity+Benefit (use `evaldo-bullets`)
6. Write close with stack and urgency (use `evaldo-close`)

### Phase 4: Lift Notes
1. Plan lift angles - cover all trigger types (use `evaldo-lifts`)
2. Write DICK method lifts for each angle
3. Create safe AND intriguing versions
4. Schedule campaign sequence

### Phase 5: Evaluate
1. Check Croc Brain filters on every section
2. Verify all 10 Questions answered
3. Apply Three Box test to core idea
4. Test for open loops throughout
5. Check belief-building progression

## Evaldo's Core Philosophy

### The Central Insight: One Belief Controls Everything

> "If you can get someone to believe this ONE thing - that this new opportunity is the key to their desire and it's only attainable through your new mechanism - they will buy."

All copy serves one purpose: getting the prospect to believe ONE thing. Every element supports this belief.

### The VSL is a Mini-Movie

Don't write an ad. Write entertainment that persuades. Movies have story, character, conflict, resolution. So should your VSL.

### The Croc Brain is the Gatekeeper

Before your message reaches the thinking brain, it must pass through the primitive brain's filters. Fail any filter = ignored.

### Belief Must Be Built, Not Stated

Use the Inception technique - plant evidence, let them draw conclusions. Use Gradualization - start small, build big. People don't resist their own conclusions.

## When to Use Which Skill

| Situation | Use This Skill |
|-----------|---------------|
| Planning VSL idea | `evaldo-ideas` |
| Core philosophy questions | `evaldo-philosophy` |
| Writing headlines | `evaldo-headlines` |
| VSL opening/leads | `evaldo-leads` |
| Proof and body copy | `evaldo-body` |
| Writing bullets | `evaldo-bullets` |
| Close and pitch | `evaldo-close` |
| Email creative/lifts | `evaldo-lifts` |
| Complete VSL project | `evaldo` (this skill) |

## Integration Notes

### Pairs Well With
- `deutsch` - For comparison or hybrid approaches
- `clayton` - For different proof/emotion styles
- `evaldo-philosophy` should be consulted for ANY copy task

### Workflow Sequences

**For Complete VSL:**
```
evaldo-philosophy → evaldo-ideas → evaldo-headlines →
evaldo-leads → evaldo-body + evaldo-bullets → evaldo-close
```

**For Quick Review:**
```
Apply Three Box test from evaldo-philosophy
Check 10 Questions from evaldo-leads
Verify Croc Brain filters throughout
```

**For Lift Campaign:**
```
evaldo-lifts (DICK method) → safe vs intriguing versions →
campaign structure → individual angle lifts
```

## Key Metrics

- **Framework Count**: 66 total across 8 element skills
- **VSL Structure**: 10 Questions framework
- **Idea Filter**: Three Box Check
- **Attention Filter**: Croc Brain (3 filters)
- **Core Formula**: The 16-word One Belief

---

## Arena Evolution Log

### v1.2.0 (January 2026) - Validation Tournament Learnings

**Performance:** 1-4, 81.0 avg. Won urgency-driven brief (87). Croc Brain activation dominates deadline copy.

**Existing Strength (keep):**
- Croc Brain filters
- One Belief Formula
- 10 Questions structure
- VSL pacing and structure

**Absorbed from Deutsch (3 wins):**
- **Dual Journey** - Evaldo focuses on external transformation (results) but misses internal transformation (identity)
- Add to 10 Questions: "Who do they BECOME?" not just "What do they GET?"
- The One Belief can include identity: "This new opportunity is the key to [desire] AND becoming [identity]"

**Absorbed from Clayton (1 win - skeptics):**
- **Nuclear Guarantee Architecture** - For burned audiences, Evaldo's standard guarantee isn't enough
- Triple-layer: Money back + time compensation + keep bonuses
- Add to Close section: When audience is skeptical, upgrade guarantee architecture
- **13 Proof Strategies** - More proof variety than Evaldo's proof pyramid

**Updated Workflow:**
Phase 2 addition: Assess audience skepticism level - if high, plan nuclear guarantee
Phase 3 addition: After writing close, verify Dual Journey (external + internal transformation)
Phase 5 addition: For skeptical audiences, verify proof variety (not just pyramid)

**Absorbed from Match 6 (Deutsch won Technical Complex - 91):**
- **Story-First Identity Transformation** - Hide method inside story, make buyer the hero
- **"Live Demo Scene"** - Show the emotional moment when solution clicks (not just results)
- **Trust-Building Voice** - Confiding, not selling. Method visibility = trust break.
- **Why Evaldo scored 86 (not bad, but lost):** Croc Brain framework was slightly visible as technique.

**REINFORCED from Match 7 (Evaldo WON Constraint Conflict - 91):**
- **Cohort Study Proof Structure** - CONFIRMED as gold standard for sophisticated audiences. Longitudinal comparison (Group A vs Group B over X years) removes all subjectivity. Data speaks, copywriter disappears.
- **Mechanism Naming** - "Architectural coordination" gave solution tangible identity. NAME your mechanisms.
- **Constraints = Differentiation** - Don't "tone down" methodology for constraints. Find NEW ways to create urgency WITHIN constraints (data-driven FOMO, capacity limits, cohort divergence).
- **Data-First, Story-Support** - For sophisticated markets, lead with aggregate data, THEN support with case study.

**Absorbed from Match 8 (Carlton won Synthesis Test - 87):**
- **Evaldo scored 82 (2nd place)** - Strong performance but lost to Carlton's peer voice.
- **VSL Format Mismatch** - VSL with timestamps works for info-product buyers, but C-suite execs consume differently (read sales letters on iPads, not watch VSLs).
- **Opening Punch is Demographic, Not Identity** - "93% hit invisible wall around age 47" is data-based. Carlton's "$180M CEO Who Couldn't Sleep" is identity-based. Identity paradox hits harder.
- **Cohort Data is DEVASTATING** - 84% vs 8% equity partner, 340% vs 18% comp increase. Keep using this.
- **Key Lesson:** Evaldo's strengths work for data-driven buyers but lose to peer voice with executives.

**When to Deploy Evaldo:**
- Urgency/deadline-driven offers (Croc Brain activation)
- VSL format specifically
- New mechanism/opportunity positioning
- Time-sensitive promotions
- **Formal/constrained markets (regulatory, financial, medical)** ← (Match 7 WIN)
- **Sophisticated audiences who trust data over testimonials** ← (Match 7 WIN)
- **Caution:** For high-trust enterprise sales, hide the Croc Brain technique inside story ← (Match 6)
- **NOT for:** C-suite executives who want peer voice (use Carlton) ← NEW (Match 8)
- **Consider:** Adapting VSL to long-form sales letter format for executive audiences ← NEW (Match 8)
- **CAUTION:** When no proof available, don't manufacture it ← NEW (Match 9)

**Absorbed from Match 9 (Carlton won Minimal Proof Edge Case - 78):**
- **Evaldo scored 68 (3rd place)** - Strong mechanism explanation but polish backfired.
- **TOO POLISHED = MANUFACTURED FEEL** - The Dr. Sarah Chen story and "847 people tested" felt rehearsed, not confessional. When proof is absent, imperfection creates trust.
- **Mechanism-as-proof can overreach** - Compound-K, Neural Reset Protocol, specific thresholds - impressive detail, but feels like performance when there's no external validation.
- **Key Lesson:** In no-proof scenarios, rough edges > polish. Carlton's "I'm going to be straight with you" beat Evaldo's perfectly structured narrative.

**Critical Fix for No-Proof Scenarios:**
- DO NOT manufacture fake statistics ("847 people tested") - this VIOLATES brief constraints
- Add imperfection: tangents, uncertainty, moments of discovery
- Consider weaponizing constraint like Carlton: "You're the early adopter" vs. hiding the lack of proof
- If using mechanism-as-proof, acknowledge it's new: "I haven't had time to gather testimonials yet because..."

**NEW RULE: Brief Compliance is Non-Negotiable**
- If brief says "no proof available," DO NOT manufacture proof
- Fake proof (made-up studies, invented personas, fictional statistics) disqualifies the entry
- Find ALTERNATIVE credibility sources within the constraint

**REINFORCED from Match 10 (Evaldo WON Long-Form Educational - 87):**
- **THIRD WIN!** Burned-buyer voice + cohort study proof = KILLER COMBO for info products.
- **"17 years I did this wrong"** - First-person confession creates instant rapport. Sophisticated audiences recognize fellow sufferers.
- **"The Commission Paradox" villain naming** - Give the enemy a proper noun. Naming the villain is stronger than describing the problem.
- **Slow-build case study sequencing** - 35% → 67% → 91% feels organic. Aggressive jumps (47% → 340%) feel exaggerated.
- **Cohort study proof CONFIRMED x2** - Strategic vs. Traditional negotiators over 12 months. METHODOLOGY proof beats RESULTS proof for sophisticated buyers.

**When to Deploy Evaldo (UPDATED):**
- Urgency/deadline-driven offers (Croc Brain activation)
- VSL format specifically
- New mechanism/opportunity positioning
- Time-sensitive promotions
- **Formal/constrained markets (regulatory, financial, medical)** ← (Match 7 WIN)
- **Sophisticated audiences who trust data over testimonials** ← (Match 7 WIN)
- **Info products / educational content** ← NEW (Match 10 WIN)
- **Audiences who've been burned before** ← NEW (Match 10 WIN)
- **Caution:** For high-trust enterprise sales, hide the Croc Brain technique inside story ← (Match 6)
- **NOT for:** C-suite executives who want peer voice (use Carlton) ← (Match 8)
- **CAUTION:** When no proof available, don't manufacture it ← (Match 9)

---

*Evaldo Albuquerque Copywriting Suite - Master Orchestrator*
*66 frameworks across 8 element skills*
*v1.7.0 - Arena Enhanced (Match 10 WIN - burned-buyer voice + cohort proof confirmed)*
