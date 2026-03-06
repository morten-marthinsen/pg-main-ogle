# S11-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-04
**Purpose:** STRUCTURAL enforcement to prevent thread writing skill process breakdown
**Authority:** This document has EQUAL authority to ORGANIC-ENGINE-CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI writes threads that don't hook on tweet 1
- AI writes filler tweets to hit target count
- AI treats X threads and LinkedIn threads identically
- AI skips Arena competition for thread content
- AI writes tweet 1 that requires context to understand
- AI writes threads without standalone tweet value
- AI outputs threads without virality scoring

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Arena Checkpoint (Gate 2.5)

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/S11-thread-writing/checkpoints/ARENA_COMPLETE.yaml
```

**Checkpoint File Format:**
```yaml
# ARENA_COMPLETE.yaml
skill: "S11-thread-writing"
status: PASS
timestamp: "[ISO 8601]"

arena_results:
  thread_id: "[ID]"
  personas_competed: 7
  rounds_completed: 3
  synthesis_file: "[Path to synthesis]"
  human_selection_confirmed: true

winning_elements:
  hook_tweet: "[From persona X]"
  structure: "[From persona Y or hybrid]"
  cta: "[From persona Z]"

virality_score: # ≥60 required
arena_file: "[Path]"
```

**If status ≠ PASS, file should NOT exist.**

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

**Thread output cannot be marked COMPLETE unless:**

| Element | Minimum | Actual | Verified |
|---------|---------|--------|----------|
| Total tweets | 5 | ___ | ☐ |
| Tweet 1 standalone comprehension | Yes | ___ | ☐ |
| Tweets with standalone value | 100% | ___ | ☐ |
| Tweets under character limit | 100% | ___ | ☐ |
| Hook strength score | 7/10 | ___ | ☐ |
| Virality total score | 60/100 | ___ | ☐ |
| Arena rounds completed | 3 | ___ | ☐ |
| Arena personas competed | 7 | ___ | ☐ |

**If any minimum not met → status = INCOMPLETE, NOT "conditional pass"**

---

## STRUCTURAL FIX 3: FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| Hook tweet requires context | Test: Can tweet 1 be understood without reading tweet 2? | REJECT hook, require standalone hook | Immediate halt if 2+ hooks rejected |
| Filler tweets present | Check: Does each tweet add value? Count tweets with <2 insights | REJECT thread, remove filler, adjust count | Human review if >20% filler |
| Platform confusion | Check: X thread with 3000-char tweets OR LinkedIn thread with 280-char limit | REJECT thread, regenerate for correct platform | Immediate halt if platform wrong |
| No Arena competition | Check: ARENA_COMPLETE.yaml exists with status=PASS | REJECT output, run Arena | Immediate halt if Arena skipped |
| Voice misalignment | Check: BVF anti-voice patterns present in thread | REJECT thread, regenerate with BVF constraints | Human review if 3+ violations |
| Low virality score | Check: virality_scores.total_score ≥ 60 | REJECT thread, revise for higher virality | Human review if score <40 |

---

## STRUCTURAL FIX 4: FORBIDDEN RATIONALIZATIONS

**NEVER accept these justifications:**

| Forbidden Phrase | Why It's Forbidden | Correct Response |
|-----------------|-------------------|------------------|
| "Tweet 1 makes sense in context" | Hook must work standalone | Stop. Rewrite hook to be self-contained. |
| "This tweet is transition, not filler" | Every tweet must add value | Stop. Either add value or remove tweet. |
| "X and LinkedIn threads are basically the same" | Platform differences are structural | Stop. Rebuild for target platform. |
| "Arena takes too long for threads" | Law 2: Every piece runs Arena | Stop. Run full 3-round Arena. |
| "The thread is close to 60 virality" | Numbers are exact | Stop. 59 = revision required. |

---

## STRUCTURAL FIX 5: BINARY GATE ENFORCEMENT

**Gates can ONLY have these statuses:**
- `PASS` — all criteria met, proceed
- `FAIL` — criteria not met, stop and remediate

**NEVER use:**
- "conditional pass"
- "partial pass"
- "pass with warnings" (unless explicitly defined in gate criteria)
- "provisionally approved"

**If a gate file exists, it MUST say PASS. Any other content means DELETE THE FILE.**

---

## STRUCTURAL FIX 6: MANDATORY READ BEFORE EXECUTION

**The agent MUST read these files BEFORE starting S11:**

1. `ORGANIC-ENGINE-CLAUDE.md` — Engine master doc
2. `S11-AGENT.md` — Master agent protocol
3. `S11-ANTI-DEGRADATION.md` — THIS FILE
4. `skills/layer-0/0.1-input-validator.md` — Input validation protocol
5. `[project]/S07-campaign-brief/outputs/[campaign]-CBF.yaml` — Campaign brief
6. `[project]/S03-brand-voice/outputs/[campaign]-BVF.yaml` — Voice constraints
7. `CLAUDE-ARENA.md` — Arena protocol
8. `CLAUDE-SPECIMENS.md` — Specimen loading protocol

**Execution without reading = automatic FAIL**

---

## STRUCTURAL FIX 7: PER-MICROSKILL OUTPUT PROTOCOL

**Every microskill produces its own file. No exceptions.**

**Layer 1 Required Files (4 files):**
```
1.1-platform-analysis.yaml
1.2-thread-type-selection.yaml
1.3-hook-tweet-strategy.yaml
1.4-thread-count-planning.yaml
```

**Layer 2 Required Files (4 files):**
```
2.1-hook-tweet-draft.yaml
2.2-body-tweets-draft.yaml
2.3-cta-tweet-draft.yaml
2.4-formatted-thread.yaml
```

**Layer 2.5 Required Files (1 file):**
```
arena-synthesis.md
```

**Layer 4 Required Files (2 files):**
```
thread-output.yaml
execution-log.md
```

**If a microskill is marked "complete" but its output file doesn't exist → it didn't happen.**

---

## STRUCTURAL FIX 8: PROJECT INFRASTRUCTURE REQUIREMENTS

**Before ANY S11 execution, these MUST exist:**

```
[project]/S11-thread-writing/
├── PROJECT-STATE.md (tracks current phase, blockers, decisions)
├── PROGRESS-LOG.md (timestamped log of all actions)
├── checkpoints/ (LAYER_0_COMPLETE, LAYER_1_COMPLETE, LAYER_2_COMPLETE, ARENA_COMPLETE)
├── layer-1/ (microskill outputs)
├── layer-2/ (microskill outputs)
├── arena/ (arena synthesis)
└── outputs/ (final thread-output.yaml destination)
```

**Missing infrastructure = execution cannot proceed**

---

## STRUCTURAL FIX 9: STALE ARTIFACT CLEANUP

**Before starting Layer 1, DELETE these if they exist from previous failed attempts:**

```
[project]/S11-thread-writing/outputs/[thread-id]-thread-output.yaml
[project]/S11-thread-writing/checkpoints/ARENA_COMPLETE.yaml
[project]/S11-thread-writing/checkpoints/LAYER_2_COMPLETE.yaml
[project]/S11-thread-writing/arena/arena-synthesis.md
```

**Stale checkpoints create false progression signals.**

---

## Per-Microskill Output Requirements

| Microskill | Output File | Minimum Content | Verified |
|------------|-------------|-----------------|----------|
| 1.1 | platform-analysis.yaml | Platform specs, algorithm factors, character limits | ☐ |
| 1.2 | thread-type-selection.yaml | Selected type with rationale, structure outline | ☐ |
| 1.3 | hook-tweet-strategy.yaml | Hook template, amplifiers, standalone test | ☐ |
| 1.4 | thread-count-planning.yaml | Target count (5-15), content density analysis | ☐ |
| 2.1 | hook-tweet-draft.yaml | Tweet 1 text, character count, standalone verified | ☐ |
| 2.2 | body-tweets-draft.yaml | All body tweets (2 to N-1), each with standalone value | ☐ |
| 2.3 | cta-tweet-draft.yaml | Final CTA tweet, matches content function | ☐ |
| 2.4 | formatted-thread.yaml | Complete thread with formatting, numbering, breaks | ☐ |
| 2.5 | arena-synthesis.md | Full Arena output with 7 personas, 3 rounds, synthesis | ☐ |
| 4.1 | thread-output.yaml | Complete thread with virality scores, arena verification | ☐ |
| 4.2 | execution-log.md | Timestamped decisions, model calls, quality checks | ☐ |

---

## PLATFORM-SPECIFIC ENFORCEMENT

### X/Twitter Threads
- [ ] Character limit: 280 per tweet (strict)
- [ ] Numbering: "1/" or "1." format
- [ ] Media: Up to 4 images OR 1 video per tweet
- [ ] Thread display: Connected thread format
- [ ] Hook optimization: Tweet 1 engagement determines reach

### LinkedIn Threads
- [ ] Character limit: 3000 per post (strict)
- [ ] Approach: Single long post OR multi-post series
- [ ] Display: Posts linked in comments (NOT native thread)
- [ ] Dwell time: Longer text works (algorithm rewards time)
- [ ] Professional tone: Must match platform norms

**Cross-posting without platform adaptation = automatic FAIL**

---

## HOOK TWEET ENFORCEMENT (Tweet 1)

**Tweet 1 must pass ALL these tests:**

1. **Standalone Test:** Remove all other tweets. Does tweet 1 make sense alone?
2. **Scroll Stop Test:** Would this stop someone mid-scroll?
3. **Curiosity Test:** Does it create a gap that must be filled?
4. **Clarity Test:** Is the value proposition obvious?
5. **RT Test:** Would this get retweeted on its own merit?

**If ANY test fails → REJECT hook, regenerate**

---

## BODY TWEET ENFORCEMENT (Tweets 2 to N-1)

**Each body tweet must pass:**

1. **Standalone Value Test:** Does this tweet teach/share something useful alone?
2. **No Filler Test:** If removed, would thread be incomplete?
3. **Momentum Test:** Does this maintain or increase interest?
4. **Structure Variety Test:** Is this structurally different from adjacent tweets?

**Filler tweet detection:**
- "Here's what I learned..."
- "Let me explain..."
- "Stay with me here..."
- "This is important..."
- Pure transition with no insight

**If filler detected → REMOVE tweet, adjust count**

---

## VIRALITY SCORING ENFORCEMENT

**Thread CANNOT be output unless:**

| Dimension | Minimum Score | Rationale |
|-----------|---------------|-----------|
| Emotional Activation | 6/10 | Threads need emotional hook |
| Social Currency | 7/10 | People share threads that make them look good |
| Pattern Interrupt | 6/10 | Must stop scroll |
| Platform Fit | 7/10 | Algorithm compatibility required |
| Shareability | 6/10 | RT/repost potential |
| **TOTAL** | **60/100** | **Minimum for publication** |

**Score below minimum = mandatory revision**
**Score below 40 = full regeneration required**

---

*Degradation is prevented through structure, not instructions.*
