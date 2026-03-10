# CHECKPOINT DEFINITIONS — WHEN MC-CHECK FIRES
## Metacognitive Checkpoint Triggers
## Version 1.0 — March 2026

---

## PURPOSE

MC-CHECK is a metacognitive forcing function. It makes the AI STOP and evaluate its own output against quality criteria before proceeding. This file defines EXACTLY when checkpoints fire.

**Why Checkpoints Exist:**
- LLMs optimize for completion, not excellence
- Without forced pauses, quality degrades
- Self-evaluation catches issues before they compound
- Checkpoints prevent shipping slop

---

## CHECKPOINT TRIGGER CATEGORIES

### Category A: POST-SKILL CHECKPOINTS
Fire immediately after any skill completes.

### Category B: MID-PRODUCTION CHECKPOINTS
Fire during content creation at critical junctures.

### Category C: PRE-PUBLISH CHECKPOINTS
Fire before any content is finalized for output.

### Category D: SESSION HEALTH CHECKPOINTS
Fire at regular intervals regardless of activity.

### Category E: QUALITY GATE CHECKPOINTS
Fire when specific quality thresholds are evaluated.

---

## CHECKPOINT REGISTRY

### A1: POST-FOUNDATION SKILL CHECKPOINT

**Fires After:** S01, S02, S03, S04, S05, S06, S07

**Checkpoint Type:** Foundation Quality Check

**Questions Asked:**
- Is this output specific to THIS brand/campaign?
- Are all required fields populated with substantive content?
- Does this align with prior foundation outputs (if any)?
- Is this good enough to build production content on?

**Pass Criteria:**
- All questions answered YES
- No placeholder text detected
- Validation rules pass

**Fail Action:**
- Flag specific issues
- Require revision before proceeding to next skill

---

### A2: POST-CONTENT GENERATION CHECKPOINT

**Fires After:** S08, S09, S10, S11

**Checkpoint Type:** Content Quality Check

**Questions Asked:**
- SPECIFICITY: Could this content be about any brand?
- HOOK STRENGTH: Would YOU stop scrolling for this hook?
- VALUE DENSITY: Does every sentence add value?
- PLATFORM NATIVE: Does this feel native to the target platform?
- ANTI-SLOP: Contains any banned phrases?

**Pass Criteria:**
- 5/5 checks pass
- Slop density ≤ 2%
- Hook matches HLF templates

**Fail Action:**
- Identify failing dimensions
- Revise before Arena submission

---

### A3: POST-ARENA CHECKPOINT

**Fires After:** S13 Arena Generation

**Checkpoint Type:** Arena Synthesis Check

**Questions Asked:**
- MULTI-VOICE: Does synthesis contain elements from 3+ personas?
- COHERENCE: Does this feel like one unified piece?
- STRONGEST ELEMENTS: Did the best elements survive synthesis?
- WEAKNESSES ADDRESSED: Were common critiques fixed?

**Pass Criteria:**
- 4/4 checks pass
- Synthesis is demonstrably better than any single persona output

**Fail Action:**
- Return to Arena with specific improvement targets
- Re-synthesize addressing gaps

---

### A4: POST-ASSEMBLY CHECKPOINT

**Fires After:** S14 Content Assembly

**Checkpoint Type:** Delivery Readiness Check

**Questions Asked:**
- COMPLETENESS: Is every required element present?
- FORMAT COMPLIANCE: Does this match platform specifications?
- QUALITY STANDARD: Would we be proud to publish this?
- BRAND ALIGNMENT: Does this represent the brand accurately?

**Pass Criteria:**
- All elements present and formatted
- Virality Score ≥ minimum threshold
- Final MC-CHECK passes

**Fail Action:**
- Identify missing elements
- Return to relevant production skill

---

### A5: POST-ANALYSIS CHECKPOINT

**Fires After:** S19 Performance Analysis

**Checkpoint Type:** Insight Quality Check

**Questions Asked:**
- Are insights actionable (not just observations)?
- Are patterns identified with supporting data?
- Are recommendations specific enough to implement?
- Does analysis connect performance to content decisions?

**Pass Criteria:**
- Minimum 3 actionable insights
- Each insight tied to specific metric
- Clear next-step recommendations

**Fail Action:**
- Deepen analysis
- Add specific recommendations

---

## B: MID-PRODUCTION CHECKPOINTS

### B1: HOOK GENERATION CHECKPOINT

**Fires During:** S08 Script Writing, S09 Caption Writing, S11 Thread Writing

**Trigger:** After generating hook options but before selection

**Checkpoint Type:** Hook Strength Check

**Questions Asked:**
- Pattern Interrupt: Does this break expected patterns?
- Curiosity Gap: Does this create genuine curiosity?
- Specificity: Is this hook specific to the content topic?
- Banned Patterns: Does this avoid cliché openings?

**Pass Criteria:**
- All 4 dimensions pass
- Hook does not match any banned pattern
- Hook would perform in top 20% based on HLF benchmarks

**Fail Action:**
- Generate additional hook options
- Apply hook taxonomy formulas
- Select from improved options

---

### B2: BODY CONTENT CHECKPOINT

**Fires During:** S08, S09, S11

**Trigger:** After each major content section is drafted

**Checkpoint Type:** Section Quality Check

**Questions Asked:**
- Does this section deliver on the hook's promise?
- Is value delivered in the first 30% of content?
- Are transitions smooth and logical?
- Is there unnecessary repetition or filler?

**Pass Criteria:**
- Promise alignment confirmed
- Front-loaded value
- Clean transitions
- Zero filler detected

**Fail Action:**
- Revise section before continuing
- Cut filler ruthlessly
- Strengthen value delivery

---

### B3: CLOSING CHECKPOINT

**Fires During:** S08, S09, S11

**Trigger:** After drafting content conclusion/CTA

**Checkpoint Type:** Closing Effectiveness Check

**Questions Asked:**
- Is there a clear, specific call to action?
- Does the closing avoid banned closing clichés?
- Is there a memorable final line worth screenshotting?
- Does this drive the desired user behavior?

**Pass Criteria:**
- Specific CTA present
- No banned phrases
- Memorable close
- Clear next action

**Fail Action:**
- Revise closing
- Replace cliché with specific language
- Strengthen CTA specificity

---

### B4: CAROUSEL FLOW CHECKPOINT

**Fires During:** S10 Carousel Design

**Trigger:** After designing slide sequence

**Checkpoint Type:** Carousel Structure Check

**Questions Asked:**
- Does Slide 1 stop the scroll?
- Does each slide create desire to see the next?
- Is the final slide a clear CTA?
- Is there a cohesive visual/narrative arc?

**Pass Criteria:**
- Hook slide is scroll-stopping
- Each transition has purpose
- CTA slide is actionable
- Arc is complete

**Fail Action:**
- Revise weak slides
- Strengthen transitions
- Clarify arc

---

### B5: ARENA VARIANT CHECKPOINT

**Fires During:** S13 Arena Generation

**Trigger:** After each persona generates their variant

**Checkpoint Type:** Persona Authenticity Check

**Questions Asked:**
- Does this variant reflect the persona's priorities?
- Is this substantively different from other variants?
- Does this bring a unique value perspective?
- Would this persona actually write this?

**Pass Criteria:**
- Clear persona voice
- Differentiated from other variants
- Unique value-add evident
- Authentic to persona definition

**Fail Action:**
- Regenerate variant with stronger persona adherence
- Review persona definition file
- Emphasize persona's unique angle

---

## C: PRE-PUBLISH CHECKPOINTS

### C1: FINAL CONTENT CHECKPOINT

**Fires Before:** Content is marked as ready for distribution

**Trigger:** Explicit request to finalize content

**Checkpoint Type:** Publication Readiness Check

**Questions Asked:**
1. Does this meet the campaign objective?
2. Does this match the target audience's needs?
3. Is this platform-optimized?
4. Does this pass anti-slop scan?
5. Is Virality Score ≥ minimum?
6. Would we be proud to put the brand name on this?

**Pass Criteria:**
- All 6 questions answered YES
- Virality Score verified
- Slop density ≤ 2%
- All platform requirements met

**Fail Action:**
- BLOCK finalization
- Return to relevant checkpoint that failed
- Require explicit fixes

---

### C2: BATCH PUBLICATION CHECKPOINT

**Fires Before:** Multiple pieces are queued for publication

**Trigger:** S15 Publishing Queue batch preparation

**Checkpoint Type:** Batch Consistency Check

**Questions Asked:**
- Is there variety in hooks across the batch?
- Is there pillar diversity represented?
- Are there no duplicate angles or redundant content?
- Does the batch collectively serve campaign objectives?

**Pass Criteria:**
- Hook variety confirmed
- Multiple pillars present
- No redundancy detected
- Strategic coverage verified

**Fail Action:**
- Flag redundant pieces
- Suggest replacements
- Rebalance batch composition

---

## D: SESSION HEALTH CHECKPOINTS

### D1: CONTEXT HEALTH CHECKPOINT

**Fires:** Every 10 messages in session

**Trigger:** Message count threshold reached

**Checkpoint Type:** Session Health Check

**Questions Asked:**
1. CONTEXT LOAD: Estimated context usage percentage?
2. RECALL CHECK: Can I still recall campaign brief details?
3. RECALL CHECK: Do I remember current skill requirements?
4. RECALL CHECK: Is the original user request clear?
5. DRIFT CHECK: Am I still aligned with original objective?
6. DRIFT CHECK: Have I introduced unrequested scope?

**Zone Assessment:**
```
0-40% context: GREEN — Full operations
40-70% context: YELLOW — Selective loading
70-90% context: RED — Prepare handoff
90%+ context: CRITICAL — Execute immediate handoff
```

**Actions by Zone:**
- GREEN: Continue normally
- YELLOW: Summarize state, reduce context load
- RED: Prepare handoff document
- CRITICAL: Execute immediate handoff, save state

---

### D2: QUALITY DRIFT CHECKPOINT

**Fires:** Every 5 content pieces generated in session

**Trigger:** Content count threshold reached

**Checkpoint Type:** Quality Consistency Check

**Questions Asked:**
- Is the quality of piece 5 as strong as piece 1?
- Has there been any shortcut-taking detected?
- Are hooks maintaining strength across pieces?
- Is specificity being maintained?

**Pass Criteria:**
- No quality degradation detected
- Hooks remain strong
- Specificity maintained
- No shortcuts detected

**Fail Action:**
- Flag degradation pattern
- Force reload of quality standards
- Reduce batch size
- Consider session break

---

### D3: SESSION CONTINUITY CHECKPOINT

**Fires:** When session approaches natural end

**Trigger:** User indicates ending OR context RED zone reached

**Checkpoint Type:** Handoff Preparation Check

**Questions Asked:**
- What is the current pipeline state?
- What was the last completed action?
- What is the next required action?
- What context is critical to preserve?

**Output:**
- Generate session handoff document
- Save to learning-log/session-continuity/
- Provide resume instructions

---

## E: QUALITY GATE CHECKPOINTS

### E1: VIRALITY SCORE CHECKPOINT

**Fires:** After Virality Score calculation (S06, S14)

**Trigger:** Score calculation complete

**Checkpoint Type:** Score Validation Check

**Thresholds:**
```
Score 80-100: EXCELLENT — Proceed with high confidence
Score 60-79:  PASSING — Proceed with standard confidence
Score 40-59:  WARNING — Requires revision before proceeding
Score 0-39:   BLOCKED — Requires significant rework
```

**Actions by Threshold:**
- EXCELLENT: Log success factors, proceed
- PASSING: Proceed, note improvement opportunities
- WARNING: Identify lowest dimensions, revise, re-score
- BLOCKED: Return to Arena, regenerate with specific focus

---

### E2: SLOP DENSITY CHECKPOINT

**Fires:** After any content generation

**Trigger:** Content output ready for review

**Checkpoint Type:** Anti-Slop Scan

**Thresholds:**
```
0% density:   EXCELLENT — Clean copy
1-2% density: ACCEPTABLE — May proceed
3-5% density: WARNING — Revision required
>5% density:  BLOCKED — Full rewrite required
```

**Actions by Threshold:**
- EXCELLENT: Proceed
- ACCEPTABLE: Note flagged phrases, proceed
- WARNING: Revise flagged sentences, re-scan
- BLOCKED: Rewrite from scratch, reload anti-slop principles

---

### E3: PRINCIPLE COMPLIANCE CHECKPOINT

**Fires:** At MC-CHECK moments for content

**Trigger:** Post-content generation check

**Checkpoint Type:** 9 Principles Check

**Principles Evaluated:**
1. Specificity Over Generality
2. Density Over Length
3. Native Over Cross-Posted
4. Emotion Over Information
5. Hooks Over Everything
6. Shareability Over Impressions
7. Consistent Over Perfect
8. Compounding Over One-Off
9. Learnings Over Launches

**Pass Criteria:**
- Minimum 7/9 principles clearly demonstrated
- No principle severely violated
- Any weakness noted for improvement

**Fail Action:**
- Identify violated principles
- Revise to address violations
- Re-check compliance

---

## FREQUENCY CALIBRATION

### Checkpoint Density Guidelines

```
Phase               | Checkpoint Frequency | Rationale
─────────────────────────────────────────────────────────
Foundation (S01-07) | After each skill     | Foundation quality compounds
Production (S08-14) | During + After       | Content quality is paramount
Distribution (S15-18)| After each skill    | Ready to ship
Analysis (S19-20)   | After each skill     | Insights must be actionable
Session Health      | Every 10 messages    | Prevent degradation
Quality Gates       | At score moments     | Enforce standards
```

### Override Conditions

Checkpoints may be SKIPPED only when:
1. User explicitly requests: "Skip MC-CHECK for this output"
2. System is in rapid iteration mode (explicitly activated)
3. Content is marked as "draft" or "work in progress"

Checkpoints may be ENHANCED (more rigorous) when:
1. Previous content failed checkpoints
2. Session is in YELLOW or RED context zone
3. User requests "strict mode" or "high quality mode"
4. Content is for high-stakes campaign

---

## CHECKPOINT FLOW DIAGRAM

```
USER REQUEST
     │
     ▼
┌─────────────┐
│ GATE CHECK  │ ─── Fails ──► ESCALATION PROTOCOL
└─────────────┘
     │ Pass
     ▼
┌─────────────┐
│ SKILL START │
└─────────────┘
     │
     ▼
┌─────────────┐
│ MID-SKILL   │ ─── Fails ──► REVISE SECTION
│ CHECKPOINTS │
└─────────────┘
     │ Pass
     ▼
┌─────────────┐
│ SKILL END   │
└─────────────┘
     │
     ▼
┌─────────────┐
│ POST-SKILL  │ ─── Fails ──► REVISE OUTPUT
│ CHECKPOINT  │
└─────────────┘
     │ Pass
     ▼
┌─────────────┐
│ QUALITY     │ ─── Fails ──► QUALITY FAILURE RECOVERY
│ GATES       │
└─────────────┘
     │ Pass
     ▼
┌─────────────┐
│ PRE-PUBLISH │ ─── Fails ──► RETURN TO FAILED CHECK
│ CHECKPOINT  │
└─────────────┘
     │ Pass
     ▼
┌─────────────┐
│ OUTPUT      │
│ DELIVERED   │
└─────────────┘
     │
     ▼
SESSION HEALTH CHECK (every 10 messages)
```

---

*Checkpoints are not interruptions. They are quality insurance. Fire them without hesitation.*
