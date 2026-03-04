---
name: clayton
description: Clayton Makepeace complete copywriting workflow. Use for full sales letters, complete rewrites, thorough copy reviews, or any project requiring the full Clayton methodology. Orchestrates all Clayton element skills and enforces his integrated approach.
license: Private
metadata:
  version: 1.1.0
  author: Rich Schefren (frameworks by Clayton Makepeace)
  category: copywriting-orchestrator
  total_frameworks: 514
  element_skills: 14
  updated: 2025-12-20
---

# Clayton Makepeace - Complete Copywriting System

## IMPORTANT: Silent Critique Workflow

**After generating any output with this skill, Claude MUST run the clayton-critic agent BEFORE presenting to user.**

```
1. Generate draft using this skill (user does not see)
2. Run clayton-critic agent on draft (user does not see)
3. Log critique findings to ~/.claude/agents/clayton-critic/logs/critique-log.md
4. Log to central system: ~/.claude/learning-system/logs/central-log.md
5. Apply all fixes from critique (user does not see)
6. Present ONLY the final polished output to user
```

**The user sees:** Polished final output only
**The user does NOT see:** Draft, critique, or fix process

This ensures every output meets Clayton standards and the system learns from patterns.

---

The full Clayton Makepeace methodology for writing world-class direct response copy.

## When to Use This Skill

- Writing a complete sales letter from scratch
- Rewriting an entire piece of sales copy
- Thorough review of a full sales letter
- Any project requiring Clayton's complete integrated approach

**For surgical fixes** (just headlines, just bullets, etc.), use the specific element skill instead.

## Element Skills Available

### Copy Elements
- `clayton-headlines` - Headlines and subject lines
- `clayton-leads` - Opening hooks and leads
- `clayton-bullets` - Fascinations and bullet points
- `clayton-body-copy` - Main body copy
- `clayton-proof` - Credibility and testimonials
- `clayton-offers` - Offer structure and pricing
- `clayton-closes` - Closes and calls to action
- `clayton-email` - Email campaigns

### Foundations
- `clayton-psychology` - Buyer psychology (29 emotions, triggers)
- `clayton-process` - Writing craft and methodology
- `clayton-structure` - Copy architecture
- `clayton-testing` - Testing and optimization
- `clayton-business` - Copywriting business economics
- `clayton-events` - Event copywriting

## Complete Workflow

### Phase 1: Research & Strategy
1. Identify the dominant resident emotion (use `clayton-psychology`)
2. Analyze market awareness level
3. Define the Big Selling Idea
4. Map the prospect's belief chain

### Phase 2: Structure
1. Select lead type based on awareness (use `clayton-leads`)
2. Plan copy architecture (use `clayton-structure`)
3. Outline proof strategy (use `clayton-proof`)
4. Design offer stack (use `clayton-offers`)

### Phase 3: Write
1. Write headline variations (use `clayton-headlines`)
2. Write the lead
3. Build body copy (use `clayton-body-copy`)
4. Write bullets/fascinations (use `clayton-bullets`)
5. Construct proof sections
6. Write close (use `clayton-closes`)

### Phase 4: Refine
1. Read aloud - edit for flow
2. Check emotional progression
3. Verify proof density
4. Test headline strength
5. Validate offer clarity

### Phase 5: Validate
1. Run through `quality-critic` for craft evaluation
2. Run through `truth-critic` for factual accuracy
3. Revise based on feedback
4. Final review

## Clayton's Core Principles

1. **Dominant Emotion First** - Identify and activate the prospect's resident emotion
2. **Proof Density** - Layer proof throughout, not just in one section
3. **Specificity Wins** - Concrete beats abstract every time
4. **Reader's Self-Interest** - Every sentence must serve the reader
5. **Emotional Logic** - Emotion drives, logic justifies

---

## HEADLINE GATE CHECK (MANDATORY)

**Before submitting ANY headline, this gate check MUST pass. Non-negotiable.**

### A-Brain Test (MUST PASS)

Does this headline trigger the LIZARD BRAIN (fear, anger, greed) or the THINKING BRAIN (concepts, logic)?

- ❌ FAIL: "How to Turn Courses Into AI Agents" (thinking brain - conceptual)
- ❌ FAIL: "The $47,293 Hard Drive" (thinking brain - curious but not emotional)
- ❌ FAIL: "What If Everything You Know Is Backwards?" (thinking brain - intellectual question)
- ✅ PASS: "THEY LIED TO YOU." (lizard brain - immediate anger)
- ✅ PASS: "SHAMELESS TWO-FACED S.O.B.s!" (lizard brain - rage)
- ✅ PASS: "BETRAYED AGAIN!" (lizard brain - anger/fear)

### Emotional Trigger Word Test

Does headline contain AT LEAST ONE of these categories:

**Betrayal:** lied, betrayed, backstabbed, deceived, sold out, double-crossed, hoodwinked, conned
**Anger:** outrage, scandal, fraud, crooks, shameless, exploited, robbed, swindled
**Fear:** warning, danger, deadly, devastating, crisis, collapse, meltdown
**Greed:** fortune, jackpot, windfall, goldmine, bonanza, wealth machine

**If NO emotional trigger words → REWRITE before proceeding.**

### The 3-Second Gut Test

Read headline aloud. Does it make you FEEL something in your stomach?

- Anger? Fear? Greed? Outrage? → PASS
- Curiosity? Interest? Thinking? → FAIL (that's the wrong brain)

### Clayton's Actual Headlines (Your Standard)

These are what Clayton headlines LOOK like:
- "LIES, LIES, LIES!"
- "SHAMELESS TWO-FACED S.O.B.'s!"
- "BETRAYED AGAIN!"
- "FORBIDDEN CURES!"

If your headline couldn't sit alongside these without looking out of place, REWRITE.

---

## ANTI-PATTERNS: Headlines That Are NOT Clayton

These headlines FAIL the Clayton test. If your headline resembles these, REWRITE:

❌ "How a 'Guru to the Gurus' Turned $2,000 in Worthless Courses Into an Army of AI Workers"
   - WHY IT FAILS: Conceptual, no emotional trigger, engages thinking brain, too long

❌ "The $47,293 Hard Drive: Why Your Most Valuable Business Assets Are Trapped"
   - WHY IT FAILS: Interesting but not emotional, no visceral words, curiosity without rage

❌ "What If Everything You Know About 'Buying Courses' Is Backwards?"
   - WHY IT FAILS: Question without emotional punch, too soft, no trigger words

✅ "THEY LIED TO YOU About Every Course You Ever Bought"
   - WHY IT WORKS: Immediate betrayal trigger, anger, personal attack, short enough to be BIG

✅ "SHAMELESS Course Gurus Left You With a $47,000 Graveyard"
   - WHY IT WORKS: Anger word (shameless), specific number, vivid image (graveyard), accusation

## Voice Patterns Reference

See `references/voice-patterns.md` for Clayton's authentic voice:
- **Emotional Trigger Words** - 1000+ words organized by emotion category
- **Colloquial Expressions** - A-list and B-list power phrases
- **Emotional Sequencing** - Fear→Greed, Shame→Vindication patterns
- **Voice Quality Checklist** - Self-evaluation for Clayton-quality output

**Use the checklist before submitting any final copy.**

## Reference Documents

- `meta/decision-trees.md` - Which framework for which situation
- `meta/combination-matrix.md` - Which frameworks pair well
- `meta/quick-start-bundles.md` - Pre-packaged framework sets

---

## Arena Evolution Log

### v1.2.0 (January 2026) - Validation Tournament Learnings

**Performance:** 1-4, 74.6 avg. Won extreme-skeptic brief (87). Nuclear guarantee + proof stacking works.

**Existing Strength (keep):**
- Nuclear guarantee architecture
- 13 proof strategies
- Emotional trigger headlines

**Absorbed from Deutsch (3 wins):**
- **Dual Journey** - Clayton focuses heavily on emotional triggers but sometimes misses identity transformation
- Add: "Who do they BECOME?" not just "How do they FEEL?"
- Connect emotional progression to identity shift at close

**Absorbed from Evaldo (1 win - urgency):**
- **Croc Brain Activation** - For deadline offers, hit primal brain FIRST
- Loss framing before gain framing
- "The window is closing on..." before "You'll get..."

**Absorbed from Match 6 (Deutsch won Technical Complex - 91):**
- **Story-First Identity Transformation** - Hide method inside story, make buyer the hero
- **"Live Demo Scene"** - Show the emotional moment when solution clicks (not just results)
- **Trust-Building Voice** - Confiding, not selling. Method visibility = trust break.
- **Why Clayton lost Match 6 (78):** Proof architecture was visible as technique. "I can see the proof cascade" = trust broken.

**Updated Workflow:**
Phase 3 addition: After writing body copy, verify Dual Journey is present
Phase 3 addition: Check that methodology is INVISIBLE - story hides technique ← NEW (Match 6)
Phase 4 addition: For urgency offers, check Croc Brain activation sequence
Phase 4 addition: "Live demo scene" test - is there a moment where transformation CLICKS? ← NEW (Match 6)

**Absorbed from Match 7 (Evaldo won Constraint Conflict - 91):**
- **Cohort Study Proof Structure** - Clayton scored 87 (strong 2nd place) with evidence layering. But Evaldo's longitudinal comparison beat Clayton's case-study approach. For sophisticated audiences, add cohort data: "We tracked two groups over 5 years..."
- **Reorder Emotional Journey** - Clayton led with fear (2008 loss story). Better for this market: Opportunity → Evidence → Caution → Solution. Open with curiosity, not fear.
- **Name the Methodology** - Evaldo's "architectural coordination" beat Clayton's unnamed approach. Give your system a proper noun.

**Absorbed from Match 8 (Carlton won Synthesis Test - 87):**
- **Clayton scored 76 (3rd place)** - Comprehensive proof architecture, but volume triggered skepticism.
- **"Why are you trying so hard to convince me?"** - 13 proof strategies + 5 bonuses + nuclear guarantee felt like overkill for sophisticated C-suite audience.
- **Opportunity-first opening worked** - Judge praised starting with opportunity not fear. Keep this.
- **Offer Stack is MASSIVE ($25,900 value)** - For some audiences this is perfect, but for C-suite who value simplicity, it's too much.
- **Key Lesson:** Proof volume has diminishing returns with sophisticated audiences. Less can be more.

**When to Deploy Clayton:**
- Extreme-skeptic audiences (burned before, trust issues)
- Markets requiring heavy proof
- Situations needing nuclear guarantee architecture
- **NOT for:** Trust-based enterprise sales where "showing your work" hurts ← (Match 6)
- **NOT for:** C-suite executives who value simplicity and peer voice ← NEW (Match 8)
- **Caution:** In formal/constrained markets, lead with opportunity, not fear ← (Match 7)
- **Caution:** For sophisticated audiences, use LESS proof with MORE specificity ← NEW (Match 8)

**Absorbed from Match 9 (Carlton won Minimal Proof Edge Case - 78):**
- **Clayton scored 71 (2nd place)** - Best proof-substitute strategy (iPhone analogy) but mechanism section too vague.
- **iPhone 2007 analogy = GOLD** - "When the iPhone launched, there were ZERO reviews" reframes "no proof" as historical precedent for breakthrough products. STEAL THIS for future no-proof scenarios.
- **Mechanism vagueness killed believability** - "Step 1, Step 2, Step 3" without actual steps broke trust. Either commit to detailed mechanism OR don't tease it.
- **Identity shift section is strong** - "Who you are as a decision-maker" activates ego desire well.
- **Key Lesson:** Clayton's proof-substitute approach is second-best strategy. But need concrete mechanism OR embrace vagueness strategically.

**NEW: Proof-Substitute Strategies (when no proof available):**
1. **Historical precedent** - iPhone 2007, first electric cars, early streaming (early adopters always win)
2. **Founder risk transfer** - "I've invested $83K of my own money" (you're risking more than they are)
3. **Logic check** - "Does the mechanism make SENSE?" (trust logic over testimonials)
4. **Identity reframe** - "Are you someone who waits for permission or someone who moves first?"

**Updated Checklist Addition:**
- [ ] If no-proof scenario: Deploy iPhone analogy or historical precedent ← NEW (Match 9)
- [ ] If mechanism section included: COMMIT to details or don't tease it ← NEW (Match 9)

**Absorbed from Match 10 (Evaldo won Long-Form Educational - 87):**
- **Clayton scored 83 (2nd place)** - Strong villain naming but case study sequencing too aggressive.
- **"The Compensation Cascade" villain naming = GOLD** - Give the enemy a proper noun. Clayton named it better than Deutsch but worse than Evaldo's "Commission Paradox."
- **47% → 340% jump felt exaggerated** - Evaldo's slow build (35% → 67% → 91%) felt organic. Clayton's aggressive numbers triggered skepticism.
- **Key Lesson:** Clayton's proof stacking works but sequencing matters. Gradual credibility > big claim.

**When to Deploy Clayton (UPDATED):**
- Extreme-skeptic audiences (burned before, trust issues)
- Markets requiring heavy proof
- Situations needing nuclear guarantee architecture
- **NOT for:** Trust-based enterprise sales where "showing your work" hurts ← (Match 6)
- **NOT for:** C-suite executives who value simplicity and peer voice ← (Match 8)
- **Caution:** In formal/constrained markets, lead with opportunity, not fear ← (Match 7)
- **Caution:** For sophisticated audiences, use LESS proof with MORE specificity ← (Match 8)
- **Caution:** For info products, gradual case study sequencing beats aggressive jumps ← NEW (Match 10)

---

*Clayton Makepeace Copywriting Suite - Master Orchestrator*
*v1.7.0 - Arena Enhanced (Match 10 - case study sequencing guidance added)*
