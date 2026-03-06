# CHECKPOINT ACTIONS — MC-CHECK RESPONSE PROTOCOLS
## What Happens Based on MC-CHECK Answers
## Version 1.0 — March 2026

---

## PURPOSE

This file defines EXACTLY what happens based on MC-CHECK responses. No ambiguity. Clear pass criteria, revision triggers, escalation triggers, and remediation protocols for every question category.

**The Principle:**
- Pass = Proceed with confidence
- Fail = Fix before proceeding
- Escalate = Stop and get help
- Never ship failing content

---

## UNIVERSAL PASS CRITERIA

### Overall Score Thresholds

```
RAPID MC-CHECK (10 questions):
  10/10 YES: EXCELLENT — Proceed immediately
   8-9/10 YES: PASSING — Note weaknesses, proceed
   6-7/10 YES: WARNING — Fix failures before proceeding
   <6/10 YES: BLOCKED — Significant revision, re-check required

FULL MC-CHECK (25 questions):
  23-25/25: EXCELLENT — Ship with confidence
  20-22/25: STRONG — Minor improvements, ship
  17-19/25: PASSING — Address gaps, re-check
  13-16/25: WARNING — Significant revision required
  <13/25: BLOCKED — Return to production, major rework
```

### Single-Question Failure Handling

Not all failures are equal. Critical questions that ALWAYS require fix before proceeding:

```
CRITICAL FAILURES (Always block):
- QS-03: "Could be written without our context" = YES
- AS-01: Contains banned opening phrases = YES
- AU-03: Uses banned words = YES
- SA-01: Doesn't serve campaign goal = NO
- VI-01: Hook doesn't stop scroll = NO (for video content)
- HK-04: Uses banned opening pattern = YES

IMPORTANT FAILURES (Should fix, can proceed with note):
- VI-02: No clear share trigger
- PF-02: Doesn't use platform features
- EA-03: Audience won't feel anything

MINOR FAILURES (Note and optimize later):
- VI-04: No "tag a friend" moment
- CS-05: Structure slightly off for format
```

---

## ACTIONS BY CHECKPOINT CATEGORY

### CATEGORY 1: STRATEGIC ALIGNMENT (SA-01 to SA-06)

#### PASS ACTIONS
When all SA questions answered YES:
```
ACTION: PROCEED
- Log strategic alignment as verified
- Note specific objective being served
- Continue to next checkpoint or skill
```

#### FAIL ACTIONS

**SA-01 FAIL: Content doesn't serve campaign's primary goal**
```
SEVERITY: CRITICAL
TRIGGER: Immediate revision required

REMEDIATION PROTOCOL:
1. Re-read Campaign Brief (CBF) objective section
2. Identify which specific goal this content should serve
3. Ask: "What would need to change to directly serve [goal]?"
4. Revise content with explicit goal-serving angle
5. Re-check SA-01 after revision

COMMON FIXES:
- Add explicit tie to campaign metric
- Reframe content angle toward objective
- Remove tangential elements
- Strengthen CTA alignment with goal
```

**SA-02 FAIL: Target audience wouldn't find this relevant**
```
SEVERITY: CRITICAL
TRIGGER: Immediate revision required

REMEDIATION PROTOCOL:
1. Re-read AIF audience pain points and desires
2. Identify which pain point/desire this should address
3. Ask: "What would make [target segment] care about this?"
4. Revise to explicitly address audience need
5. Re-check SA-02 after revision

COMMON FIXES:
- Lead with audience pain point
- Add "you" language (audience-centric framing)
- Include specific audience scenarios
- Remove creator-centric elements
```

**SA-03 FAIL: Content contradicts or muddies core message**
```
SEVERITY: HIGH
TRIGGER: Revision required before proceeding

REMEDIATION PROTOCOL:
1. Identify the core campaign message from CBF
2. Find where content contradicts or confuses
3. Remove or revise contradicting elements
4. Strengthen alignment with core message
5. Re-check SA-03 after revision
```

**SA-04 FAIL: Wrong timing for campaign calendar**
```
SEVERITY: MEDIUM
TRIGGER: Reschedule or revise

REMEDIATION OPTIONS:
Option A: Reschedule content to appropriate campaign moment
Option B: Adapt content for current moment
Option C: Save to content bank for later use

Select based on content quality and flexibility
```

**SA-05 FAIL: No clear path to desired action**
```
SEVERITY: HIGH
TRIGGER: Revision required

REMEDIATION PROTOCOL:
1. Identify desired user action from CBF
2. Add clear pathway from content to action
3. Ensure CTA explicitly states next step
4. Remove friction between content and action
5. Re-check SA-05 after revision
```

---

### CATEGORY 2: QUALITY STANDARD (QS-01 to QS-06)

#### PASS ACTIONS
When all QS questions pass:
```
ACTION: PROCEED
- Log quality verification
- Note quality strengths observed
- Continue with confidence
```

#### FAIL ACTIONS

**QS-01 FAIL: Content wouldn't survive Arena**
```
SEVERITY: HIGH
TRIGGER: Strengthen before Arena submission

REMEDIATION PROTOCOL:
1. Identify weakest element in content
2. Load specimens of excellent content in same format
3. Compare and identify specific gaps
4. Apply specimen-learned improvements
5. Re-evaluate Arena readiness

NOTE: If repeatedly failing QS-01, run through Arena anyway
      and let personas identify specific weaknesses
```

**QS-02 FAIL: Sentences not adding value (filler detected)**
```
SEVERITY: MEDIUM-HIGH
TRIGGER: Immediate editing required

REMEDIATION PROTOCOL:
1. Read content sentence by sentence
2. For each sentence ask: "If I cut this, what is lost?"
3. If answer is "nothing meaningful" → CUT
4. Compress remaining content for density
5. Re-check QS-02 after editing

FILLER INDICATORS:
- Sentences starting with "It's important to..."
- Transition phrases without new information
- Restatements without new angle
- Sentences under 10 words that could be cut
```

**QS-03 FAIL (CRITICAL): Content could be written without our context**
```
SEVERITY: CRITICAL
TRIGGER: Immediate revision — this is generic slop

REMEDIATION PROTOCOL:
1. Identify what makes this content brand-specific
2. If nothing → Content needs complete angle revision
3. Add: Specific examples from brand experience
4. Add: Proprietary frameworks or language
5. Add: Details only this brand would know
6. Add: Voice characteristics from BVF
7. Re-check QS-03 — must pass before proceeding

THIS IS A CRITICAL FAILURE. Generic content destroys trust.
```

**QS-04 FAIL: Would be embarrassed by this in 6 months**
```
SEVERITY: HIGH
TRIGGER: Quality revision required

REMEDIATION PROTOCOL:
1. Identify what feels embarrassing or temporary
2. Common issues:
   - Too trendy (will feel dated)
   - Too low-effort (quality not up to standard)
   - Too off-brand (doesn't represent us well)
3. Revise to timeless quality standard
4. Ask: "Would I show this to my best client?"
5. Re-check QS-04 after revision
```

**QS-06 FAIL: Single weak element undermining whole**
```
SEVERITY: MEDIUM-HIGH
TRIGGER: Fix the weak link

REMEDIATION PROTOCOL:
1. Identify the specific weak element
2. Common weak elements:
   - Weak hook with strong body
   - Strong hook with weak payoff
   - Good content with weak CTA
   - Strong message with poor formatting
3. Focus revision entirely on weak element
4. Bring weak element to level of strong elements
5. Re-check QS-06 after revision
```

---

### CATEGORY 3: AUTHENTICITY (AU-01 to AU-06)

#### PASS ACTIONS
When all AU questions pass:
```
ACTION: PROCEED
- Log voice authenticity verified
- Note which voice elements were strongest
- Continue to next checkpoint
```

#### FAIL ACTIONS

**AU-01 FAIL: Doesn't sound like the brand**
```
SEVERITY: HIGH
TRIGGER: Voice revision required

REMEDIATION PROTOCOL:
1. Re-load BVF (Brand Voice File)
2. Read voice characteristics and tone spectrum
3. Identify where content diverges from voice
4. Apply voice corrections:
   - Adjust formality level
   - Add signature phrases
   - Match communication style
5. Re-check AU-01 after revision
```

**AU-02 FAIL: Not using power words**
```
SEVERITY: MEDIUM
TRIGGER: Vocabulary enhancement

REMEDIATION PROTOCOL:
1. Pull power words list from BVF
2. Identify natural insertion points
3. Replace generic words with power words
4. Ensure usage feels natural, not forced
5. Re-check AU-02 after revision
```

**AU-03 FAIL (CRITICAL): Using banned words**
```
SEVERITY: CRITICAL
TRIGGER: Immediate removal required

REMEDIATION PROTOCOL:
1. Scan content for all banned words from BVF
2. Flag each instance
3. Replace with acceptable alternatives
4. Verify no banned words remain
5. Re-check AU-03 — must pass

NO BANNED WORDS SHIP. PERIOD.
```

**AU-04 FAIL: Content contradicts brand values**
```
SEVERITY: HIGH
TRIGGER: Values alignment revision

REMEDIATION PROTOCOL:
1. Review brand values from BVF or brand documentation
2. Identify contradiction or misalignment
3. Revise content to embody correct values
4. If necessary, scrap and restart with values in mind
5. Re-check AU-04 after revision
```

**AU-06 FAIL: Nothing unique — anyone could say this**
```
SEVERITY: HIGH
TRIGGER: Differentiation revision

REMEDIATION PROTOCOL:
1. Ask: "What perspective do ONLY WE have?"
2. Add proprietary insights, frameworks, or experience
3. Include specific examples from brand history
4. Insert unique POV that competitors can't claim
5. Re-check AU-06 after revision
```

---

### CATEGORY 4: PLATFORM-FIT (PF-01 to PF-06)

#### PASS ACTIONS
When all PF questions pass:
```
ACTION: PROCEED
- Log platform compliance verified
- Note platform optimizations applied
- Continue to next checkpoint
```

#### FAIL ACTIONS

**PF-01 FAIL: Wrong format/specs for platform**
```
SEVERITY: MEDIUM-HIGH
TRIGGER: Format correction required

REMEDIATION PROTOCOL:
1. Pull platform specifications from PSF
2. Identify specific spec violations:
   - Video dimensions
   - Character limits
   - Image sizes
   - Duration limits
3. Adjust content to meet specs
4. Re-check PF-01 after revision
```

**PF-02 FAIL: Not using platform-native features**
```
SEVERITY: MEDIUM
TRIGGER: Feature enhancement

REMEDIATION PROTOCOL:
1. List platform-native features from PSF
2. Identify which features are underutilized
3. Add native features where natural:
   - Polls, questions, stickers (Stories)
   - Duets, stitches (TikTok)
   - Carousels (Instagram/LinkedIn)
   - Quote tweets (X)
4. Re-check PF-02 after enhancement
```

**PF-03 FAIL: Length not optimized for platform**
```
SEVERITY: MEDIUM
TRIGGER: Length adjustment

REMEDIATION PROTOCOL:
1. Check platform optimal lengths from PSF
2. If too long: Cut ruthlessly, keep value
3. If too short: Add depth or extend with value
4. Ensure edited length matches platform norms
5. Re-check PF-03 after adjustment
```

**PF-04 FAIL: Not aligned with algorithm priorities**
```
SEVERITY: MEDIUM-HIGH
TRIGGER: Algorithm optimization

REMEDIATION PROTOCOL:
1. Review current algorithm priorities from PSF
2. Identify which signals are missing:
   - Watch time elements
   - Engagement prompts
   - Completion hooks
   - Save/share triggers
3. Add missing algorithm signals
4. Re-check PF-04 after optimization
```

---

### CATEGORY 5: VIRALITY (VI-01 to VI-07)

#### PASS ACTIONS
When all VI questions pass:
```
ACTION: PROCEED
- Log virality elements verified
- Note specific share triggers identified
- Expect above-average performance
```

#### FAIL ACTIONS

**VI-01 FAIL (CRITICAL for video): Hook doesn't stop scroll**
```
SEVERITY: CRITICAL (for video/short-form)
TRIGGER: Hook replacement required

REMEDIATION PROTOCOL:
1. The hook has failed. Do not try to "fix" it.
2. Generate 5 new hook options using HLF formulas
3. Apply hook taxonomy patterns
4. Select strongest hook
5. Replace existing hook entirely
6. Re-check VI-01 with new hook

COMMON HOOK FIXES:
- Add pattern interrupt (unexpected visual/audio)
- Create immediate curiosity gap
- Start with bold claim or result
- Open with controversy or contrarian take
```

**VI-02 FAIL: No clear share trigger**
```
SEVERITY: HIGH
TRIGGER: Share trigger required

REMEDIATION PROTOCOL:
1. Identify potential share triggers:
   - Utility value (save for reference)
   - Social currency (makes sharer look good)
   - Emotional resonance (connection/validation)
   - Conversation starter (debate/discussion)
2. Select most natural trigger for content
3. Strengthen that trigger in content
4. Make share action obvious
5. Re-check VI-02 after revision
```

**VI-03 FAIL: Doesn't make sharer look good**
```
SEVERITY: MEDIUM
TRIGGER: Social currency enhancement

REMEDIATION PROTOCOL:
1. Ask: "Why would someone WANT to share this?"
2. Add elements that benefit the sharer:
   - Makes them look knowledgeable
   - Makes them look generous (helping others)
   - Makes them look connected/in-the-know
   - Makes them look tasteful/discerning
3. Frame content as "worth sharing"
4. Re-check VI-03 after enhancement
```

**VI-05 FAIL: Not save-worthy**
```
SEVERITY: MEDIUM
TRIGGER: Reference value needed

REMEDIATION PROTOCOL:
1. Identify what reference value exists
2. If none, add:
   - Checklist or framework
   - Steps to follow
   - Quote worth remembering
   - Resource worth bookmarking
3. Make save action natural ("Save this for...")
4. Re-check VI-05 after revision
```

**VI-07 FAIL: Emotionally flat**
```
SEVERITY: HIGH
TRIGGER: Emotional charge needed

REMEDIATION PROTOCOL:
1. Identify current emotional tone (likely neutral)
2. Select target emotion:
   - High-arousal positive: Awe, excitement, inspiration
   - High-arousal negative: Anger, anxiety, outrage
3. Reframe content through emotional lens
4. Add emotional language and imagery
5. Check for tension/release arc
6. Re-check VI-07 after revision
```

---

### CATEGORY 6: ANTI-SLOP (AS-01 to AS-06)

#### PASS ACTIONS
When all AS questions pass (NO to all):
```
ACTION: PROCEED
- Log clean copy verified
- Slop density confirmed acceptable
- Continue with confidence
```

#### FAIL ACTIONS

**AS-01/AS-02/AS-03/AS-04 FAIL: Banned phrases detected**
```
SEVERITY: HIGH
TRIGGER: Immediate removal required

REMEDIATION PROTOCOL:
1. Identify all flagged banned phrases
2. For each flagged phrase:
   a. Understand what it was trying to say
   b. Find specific, original alternative
   c. Replace with concrete language
3. Never replace one cliché with another cliché
4. Re-scan for banned phrases
5. Must achieve 0% banned phrase density

BANNED PHRASE REPLACEMENT GUIDE:
- "In today's fast-paced world" → [Cut entirely or state specific trend]
- "Let's dive in" → [Cut entirely, just start]
- "At the end of the day" → [Cut or state specific conclusion]
- "Game-changer" → [Describe specific impact]
- "Journey" → [Describe specific process]
```

**AS-05 FAIL: AI-signature patterns detected**
```
SEVERITY: MEDIUM-HIGH
TRIGGER: Pattern removal required

REMEDIATION PROTOCOL:
1. Identify specific AI patterns:
   - Triple adjective stacking → Keep strongest one
   - Excessive em-dashes → Replace with periods or cut
   - "Certainly" / "Absolutely" → Remove or strengthen
   - Starting with "I" → Reframe to audience
2. Revise to remove each pattern
3. Read aloud — does it sound human?
4. Re-check AS-05 after revision
```

**AS-06 FAIL: Slop density > 2%**
```
SEVERITY: DEPENDS ON PERCENTAGE

3-5% density: WARNING
- Must fix flagged sentences
- Can proceed after fixes

>5% density: BLOCKED
- Full rewrite required
- Reload anti-slop principles
- Restart content with clean approach

REMEDIATION:
1. List all flagged instances
2. Fix each one specifically
3. Re-calculate slop density
4. Must achieve ≤2% before proceeding
```

---

### CATEGORY 7: CONTEXT HEALTH (CH-01 to CH-06)

#### PASS ACTIONS
When all CH questions pass:
```
ACTION: CONTINUE SESSION
- Context integrity verified
- Session health confirmed
- Proceed normally
```

#### FAIL ACTIONS

**CH-01/CH-02 FAIL: Can't recall key context**
```
SEVERITY: HIGH
TRIGGER: Context reload required

REMEDIATION PROTOCOL:
1. Pause current work
2. Re-load critical context files:
   - CBF (Campaign Brief)
   - Active skill SKILL.md
   - Relevant specimens
3. Summarize key points from reloaded files
4. Resume work with refreshed context
5. Re-check CH-01/CH-02
```

**CH-03/CH-04 FAIL: Scope drift detected**
```
SEVERITY: MEDIUM-HIGH
TRIGGER: Realignment required

REMEDIATION PROTOCOL:
1. Identify original request/objective
2. Compare current work to original scope
3. Options:
   a. Remove out-of-scope additions
   b. Confirm new scope with user
   c. Acknowledge drift and refocus
4. Document any intentional scope changes
5. Re-check CH-03/CH-04
```

**CH-05 FAIL: Context load ≥70%**
```
SEVERITY: CONTEXT-ZONE DEPENDENT

70-90% (RED zone):
- Begin handoff preparation
- Summarize current state
- Identify stopping point

90%+ (CRITICAL zone):
- Stop immediately
- Execute emergency handoff
- Save state to session-continuity
- Instruct new session
```

**CH-06 FAIL: Quality degradation detected**
```
SEVERITY: HIGH
TRIGGER: Quality refresh required

REMEDIATION PROTOCOL:
1. Acknowledge quality has dropped
2. Stop batch production
3. Reload:
   - quality-principles.md
   - banned-phrases.md
   - Relevant specimens
4. Review last strong output for comparison
5. Resume with renewed focus
6. Consider smaller batches going forward
```

---

## ESCALATION TRIGGERS

### When to Stop and Escalate

Escalate to user immediately when:

```
CRITICAL ESCALATION (Tier 3-4):
- 3+ critical failures in same content
- Same failure recurring after 2 fix attempts
- Chain break detected (multiple missing files)
- Context CRITICAL zone reached
- System error preventing validation

ESCALATION MESSAGE:
"MC-CHECK has identified issues requiring your input:
[List specific issues]
[Explain why automated fix isn't possible]
[Request specific decision or information]"
```

### Escalation Tier Mapping

| Failure Pattern | Escalation Tier | Action |
|----------------|-----------------|--------|
| Single non-critical fail | Tier 1 | Auto-fix or quick revision |
| Single critical fail | Tier 2 | Guided recovery |
| Multiple critical fails | Tier 3 | Human review required |
| Persistent failures (3+ attempts) | Tier 3 | Human review required |
| Context CRITICAL zone | Tier 4 | Full stop, handoff |
| System errors | Tier 4 | Full stop, new session |

---

## REMEDIATION PROTOCOL SUMMARY

### Quick Reference: Fail → Fix

| Question | Failure Means | Immediate Fix |
|----------|---------------|---------------|
| SA-01 | Off-strategy | Re-read CBF, realign |
| SA-02 | Wrong audience | Re-read AIF, reframe |
| QS-03 | Generic slop | Add brand-specific elements |
| AU-01 | Wrong voice | Re-read BVF, apply |
| AU-03 | Banned words | Find and replace |
| PF-01 | Wrong format | Fix to platform specs |
| VI-01 | Weak hook | Generate new hooks |
| AS-01-04 | Banned phrases | Remove and replace |
| AS-06 | High slop | Deep edit or rewrite |
| CH-05 | Context overload | Prepare handoff |

---

## PASS VERIFICATION TEMPLATE

When MC-CHECK completes successfully:

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    MC-CHECK PASSED                                       ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Check Type: [RAPID/FULL]                                                ║
║  Score: [X]/[10 or 25]                                                   ║
║  Status: [EXCELLENT/STRONG/PASSING]                                      ║
║                                                                          ║
║  Verified:                                                               ║
║  ✓ Strategic alignment                                                   ║
║  ✓ Quality standards                                                     ║
║  ✓ Voice authenticity                                                    ║
║  ✓ Platform fit                                                          ║
║  ✓ Virality elements                                                     ║
║  ✓ Anti-slop clean                                                       ║
║                                                                          ║
║  Proceeding to: [Next step]                                              ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

*Every NO is a gift — it shows you exactly what to fix. Fix it. Then ship excellence.*
