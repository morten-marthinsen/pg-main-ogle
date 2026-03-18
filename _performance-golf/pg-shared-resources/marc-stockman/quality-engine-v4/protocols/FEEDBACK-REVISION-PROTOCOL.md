# Feedback-Revision Protocol
**Quality Engine v4** | Component: Protocol
**Purpose:** Prevent "drift to raw model" during interactive editing by re-engaging skills, specimens, and quality rules based on revision severity
**System-Agnostic:** Works with any AI model or agent framework

---

## WHY THIS PROTOCOL EXISTS

After competition and editorial, output quality is at its peak. Then the human gives feedback: "Change the headline." "Rewrite the mechanism section." "Make the offer punchier."

Without this protocol, the model processes that feedback using **raw capabilities** — no skill constraints, no specimens, no quality rules, no voice loading. The result: output that's technically responsive to the feedback but has lost its structural integrity. Terminology drifts. Voice degrades. Proof disappears. Formatting breaks.

**This is the #1 post-pipeline quality failure mode.** The fix: a severity-based protocol that determines HOW MUCH of the original skill infrastructure to re-engage based on the scope of the revision.

---

## THE 3 SEVERITY LEVELS

### Level 1: Light Edit
**Definition:** Word-level or sentence-level changes that don't alter the section's structure, approach, or strategy.

**Examples:**
- "Change 'Dynamic Control' to 'Precision System'" (rename)
- "Make this sentence shorter"
- "Fix the typo in section 4"
- "Remove the word 'revolutionary' from the headline"

**Scope:** Single sentence or phrase within a single section.

### Level 2: Structural Revision
**Definition:** Section-level changes that alter the approach, reorganize content, or substantially rewrite a section while keeping the overall architecture intact.

**Examples:**
- "Rewrite the headline with a curiosity angle instead of benefit"
- "The mechanism section needs more proof — rebuild it"
- "Move the guarantee higher and make it more aggressive"
- "The problem section doesn't resonate — take a different angle"
- "Combine sections 9 and 10 into one stronger section"

**Scope:** One or more sections, but not the entire piece.

### Level 3: Full Regeneration
**Definition:** Fundamental changes that invalidate the current approach — new strategy, new feature hierarchy, new voice direction, or complete rethink.

**Examples:**
- "Scrap this — the positioning is wrong"
- "The voice should be completely different — more clinical, less conversational"
- "We're changing the primary feature from X to Y"
- "Start over with a different section architecture"
- "The target audience has changed — rewrite everything"

**Scope:** Entire piece or entire strategic foundation.

---

## CONTEXT RE-LOADING MATRIX

This matrix defines what gets re-loaded at each severity level before the revision begins.

| Context Layer | Level 1: Light Edit | Level 2: Structural Revision | Level 3: Full Regeneration |
|---------------|--------------------|-----------------------------|---------------------------|
| **Quality Rules** | ALWAYS loaded | ALWAYS loaded | ALWAYS loaded |
| **Terminology Registry** | ALWAYS loaded | ALWAYS loaded | Re-derived from source |
| **Voice/Tone Constraints** | Referenced (not re-loaded) | Re-loaded from specimen | Full re-load + recalibration |
| **Domain Teachings** | Not re-loaded | Re-loaded for affected skill | Full re-load all skills |
| **Skill Specification** | Not re-loaded | Re-loaded for affected skill | Re-loaded for all affected skills |
| **Upstream Context** | Not re-loaded | Re-loaded for affected section | Full upstream re-load |
| **Context Reservoir** | Not re-loaded | Relevant sections re-loaded | Full re-load |
| **Specimens (Structural)** | Not re-loaded | Re-loaded for affected skill | Full re-load |
| **Specimens (Voice)** | Not re-loaded | Re-loaded for affected perspective(s) | Full re-load all perspectives |
| **Competition** | Not triggered | Optional (human decides) | Mandatory re-run |

### The Non-Negotiables (All Levels)

These constraints apply at EVERY severity level, including Light Edit:

```yaml
always_enforced:
  - quality_rules: "Read and acknowledge before ANY revision"
  - terminology_lock: "Locked terms are exact unless Level 1 explicitly renames"
  - anti_slop_lexicon: "Banned words cannot be introduced at any level"
  - proof_preservation: "Proof elements cannot be removed unless explicitly requested"
  - format_optimization: "Revised sections must pass readability test"
  - word_budgets: "Revised sections must stay within original word budget"
  - voice_register: "Revision cannot shift voice register without Level 2+ classification"
```

---

## REVISION EXECUTION PROTOCOL

### Step 1: Classify Severity

Before touching any output, classify the feedback:

```
RECEIVE feedback from human

CLASSIFY:
  IF feedback targets specific words/phrases within a section -> Level 1
  IF feedback requires rewriting/restructuring 1+ sections -> Level 2
  IF feedback invalidates strategy, voice, feature hierarchy, or architecture -> Level 3

ANNOUNCE classification to human:
  "This is a [Level 1/2/3] revision. I will [re-load X, Y, Z] before making changes."

IF uncertain about classification:
  ASK human: "This could be a Level 1 (light edit) or Level 2 (structural revision).
  Level 2 will re-load the skill spec and teachings for better quality but takes more context.
  Which do you prefer?"
```

### Step 2: Re-Load Context (Per Matrix)

```
Level 1:
  1. Read quality rules for this skill
  2. Confirm terminology registry
  3. Reference (not re-load) voice constraints
  4. Proceed to edit

Level 2:
  1. Read quality rules for this skill
  2. Confirm terminology registry
  3. Re-load skill specification for the affected skill
  4. Re-load teachings for the affected skill
  5. Re-load relevant context reservoir sections
  6. Re-load voice specimens for relevant perspective(s) if competition-derived
  7. Proceed to revision

Level 3:
  1. Read ALL quality rules for affected pipeline segment
  2. Re-derive terminology registry (if hierarchy changed)
  3. Re-load ALL skill specifications for affected skills
  4. Re-load ALL teachings
  5. Re-load full context reservoir
  6. Re-load ALL specimens (structural + voice)
  7. Re-run competition for affected skills (mandatory)
  8. Proceed to full regeneration
```

### Step 3: Execute Revision

```
EXECUTE revision with re-loaded context active

DURING execution:
  - Checkpoint at each paragraph boundary (Level 2+)
  - Quality self-check every 500 words (Level 2+)
  - Terminology consistency check on completion (all levels)
  - Format optimization check on completion (all levels)

AFTER execution:
  - Log revision to revision-log.yaml
  - Present revised output to human with change summary
```

### Step 4: Post-Revision Verification

```
Level 1:
  [ ] Changed only what was requested
  [ ] No new banned words introduced
  [ ] Terminology still exact
  [ ] Section still properly formatted

Level 2:
  [ ] All Level 1 checks
  [ ] Revised section(s) still pass standalone quality test
  [ ] Proof elements preserved or strengthened
  [ ] Voice register consistent with rest of piece
  [ ] Word budget maintained

Level 3:
  [ ] All Level 2 checks
  [ ] Competition results meet quality threshold
  [ ] Full piece coherence check
  [ ] All downstream dependencies updated
```

---

## REVISION-SPECIFIC ANTI-DEGRADATION RULES

### Forbidden Revision Behaviors

| Behavior | Why It's Forbidden | Detection |
|----------|-------------------|-----------|
| Revising with raw model (no skill re-load) | Produces structurally correct but quality-degraded output | Missing quality rules acknowledgment |
| Introducing banned words during revision | Light edits are especially vulnerable to slop injection | Anti-slop lexicon check |
| Changing terminology during non-rename edits | Terminology consistency is a piece-wide constraint | Terminology registry diff |
| Removing proof to "tighten" copy | Proof converts — it stays unless human explicitly removes | Proof count comparison |
| Expanding word count during revision | Revisions should tighten, not bloat | Word count diff |
| Breaking format optimization during revision | Format/readability is a primary quality criterion | Readability test |
| Shifting voice register during Light Edit | Voice drift is cumulative and subtle | Voice register comparison |
| Rewriting entire sections during Light Edit | That's a Level 2, not a Level 1 | Word change ratio (>30% = Level 2) |

### Forbidden Rationalizations

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "The feedback implies I should also improve..." | Do what was asked, nothing more | LIMIT scope to explicit feedback |
| "While I'm here, I'll also fix..." | Scope creep degrades quality | STOP — only revise what was requested |
| "This reads better without the proof" | Proof converts. It stays. | KEEP proof, reposition if needed |
| "A simpler term would be..." | Terminology is locked | DO NOT change unless Level 1 rename |
| "I don't need to re-load the skill spec for this" | Skill spec prevents structural drift | RE-LOAD at Level 2+ |
| "The teachings don't apply to this revision" | Teachings prevent principle violations | RE-LOAD at Level 2+ |
| "The quality rules are the same as last time" | They must be RE-READ, not remembered | RE-READ at every revision |

---

## FEEDBACK HIERARCHY

```
+-------------------------------------------------------------+
|  FEEDBACK PRIORITY (Highest to Lowest)                       |
+-------------------------------------------------------------+
|  1. Human feedback (explicit direction from client/user)     |
|  2. Competition results (multi-perspective competition)      |
|  3. Skill defaults (specification + teachings)               |
+-------------------------------------------------------------+
|                                                              |
|  BUT these constraints ALWAYS apply regardless:              |
|  - Quality rules (structural enforcement)                    |
|  - Voice/tone constraints (voice register)                   |
|  - Terminology locks (registry)                              |
|  - Anti-slop lexicon (banned words)                          |
|  - Format optimization (readability)                         |
|  - Proof preservation (unless explicit removal)              |
|                                                              |
|  Human CAN override constraints with explicit request:       |
|  "Remove the proof from section 4" -> OK (explicit)         |
|  "Tighten section 4" -> proof stays (implicit)              |
+-------------------------------------------------------------+
```

---

## HUMAN EDIT EXTRACTION — INTAKE MODE

When a human edits AI output directly — rather than giving revision feedback for the AI to execute — the revision is not classified into Levels 1-3. Instead, it is routed to the **Human Edit Extraction** procedure defined in `HUMANIZATION-PROTOCOL.md`.

**When this intake mode activates:**
- The human saves a new version of an AI-generated file with their own edits
- Client feedback results in human-made changes (not AI-revised changes)
- A human reviewer marks sections as "AI-sounding" and rewrites them
- Any batch of 5+ human edits occurs on a single output

**What happens:**
1. The 6-step Human Edit Extraction procedure runs (see HUMANIZATION-PROTOCOL.md)
2. Structural edits are pattern-analyzed against the Humanization Pattern Library
3. Existing pattern matches update frequency counts; new patterns create L1 observations
4. Voice-level edits are logged as specimen candidates
5. Extraction report is saved to project outputs

**Why this is a separate intake mode:** The Feedback-Revision Protocol's 3 severity levels assume the AI is executing the revision. When the human edits directly, the AI's job is not to revise — it is to LEARN from what the human changed.

---

## ESCALATION PROTOCOL

```
IF revision produces lower quality than original:
  -> STOP — present both versions to human
  -> "The revision may have degraded quality. Here's the original and revised.
     Which do you prefer, or should I try a different approach?"

IF human requests conflicting changes:
  -> STOP — surface the conflict
  -> "You asked me to [X], but this conflicts with [Y] from earlier.
     Which takes priority?"

IF revision at Level 1 requires Level 2 scope:
  -> STOP — reclassify
  -> "This change affects the section's structure. I'm upgrading to Level 2
     and re-loading the skill spec and teachings. Proceeding."

IF 3+ revisions to the same section:
  -> FLAG — potential deeper issue
  -> "This section has been revised 3 times. The issue may be upstream
     (strategy, feature hierarchy, or voice direction). Should we revisit
     the source skill instead?"

IF same issue class appears in 2+ revisions:
  -> FLAG — systemic pattern detected
  -> "The same issue class has appeared in 2+ revisions. This suggests a
     systemic issue — not a per-section fix. Route to the Self-Learning
     Promotion Protocol for pattern analysis and potential rule promotion."
```

---

## REVISION TRACKING

### revision-log.yaml

Every revision is logged for traceability:

```yaml
revision_log:
  - id: "REV-001"
    timestamp: "ISO timestamp"
    severity: 1  # 1, 2, or 3
    pipeline_segment: "e-commerce"
    skill: "hero-section"
    section: "headline"
    feedback: "Make the headline more specific — include a number"
    context_reloaded:
      - quality_rules: true
      - terminology_registry: true
      - skill_spec: false
      - teachings: false
      - specimens: false
    changes_made: "Headline changed from 'The Product That Changed Everything' to 'The Product That Added 23 Yards in 30 Days'"
    verification:
      slop_check: PASS
      terminology_consistency: PASS
      format_optimization: PASS
      word_budget: PASS
    human_approved: true
```

---

## MANDATORY READ DECLARATION

Before executing ANY revision:

```
I HAVE READ: FEEDBACK-REVISION-PROTOCOL.md
I HAVE CLASSIFIED this feedback as: Level [1/2/3]
I WILL RE-LOAD: [list of context layers per matrix]
I WILL VERIFY: [checklist for this level]
I WILL NOT: Revise with raw model, introduce slop, change terminology without explicit request,
            remove proof without explicit request, break formatting, expand word counts,
            exceed the scope of the feedback.
```
