# Feedback/Revision Protocol

**Version:** 1.2
**Created:** 2026-03-13
**Purpose:** Prevent "drift to raw model" during interactive editing by re-engaging skills, specimens, and anti-degradation rules based on revision severity.
**Authority:** This protocol has EQUAL authority to EXECUTION-GUARDRAILS.md and ENGINE-CORE.md

---

## WHY THIS PROTOCOL EXISTS

After Arena and editorial, copy quality is at its peak. Then the human gives feedback: "Change the headline." "Rewrite the mechanism section." "Make the offer punchier."

Without this protocol, the model processes that feedback using **raw capabilities** — no skill constraints, no specimens, no anti-degradation rules, no voice loading. The result: copy that's technically responsive to the feedback but has lost its structural integrity. Feature names drift. Voice degrades. Proof disappears. Scan optimization breaks.

**This is the #1 post-pipeline quality failure mode.** The fix: a severity-based protocol that determines HOW MUCH of the original skill infrastructure to re-engage based on the scope of the revision.

---

## THE 3 SEVERITY LEVELS

### Level 1: Light Edit
**Definition:** Word-level or sentence-level changes that don't alter the section's structure, approach, or strategy.

**Examples:**
- "Change 'Dynamic Loft Control' to 'Precision Loft System'" (rename)
- "Make this sentence shorter"
- "Fix the typo in section 4"
- "Remove the word 'revolutionary' from the headline"
- "Add a comma after 'control'"

**Scope:** Single sentence or phrase within a single section.

### Level 2: Structural Revision
**Definition:** Section-level changes that alter the approach, reorganize content, or substantially rewrite a section while keeping the overall page architecture intact.

**Examples:**
- "Rewrite the hero headline with a curiosity angle instead of benefit"
- "The mechanism section needs more proof — rebuild it"
- "Move the guarantee higher and make it more aggressive"
- "The problem section doesn't resonate — take a different angle"
- "Combine sections 9 and 10 into one stronger section"

**Scope:** One or more sections, but not the entire page.

### Level 3: Full Regeneration
**Definition:** Fundamental changes that invalidate the current approach — new strategy, new feature hierarchy, new voice direction, or complete page rethink.

**Examples:**
- "Scrap this — the product positioning is wrong"
- "The voice should be completely different — more clinical, less conversational"
- "We're changing the hero feature from X to Y"
- "Start over with a different section architecture"
- "The target audience has changed — rewrite everything"

**Scope:** Entire page or entire strategic foundation.

---

## CONTEXT RE-LOADING MATRIX

This matrix defines what gets re-loaded at each severity level before the revision begins.

| Context Layer | Level 1: Light Edit | Level 2: Structural Revision | Level 3: Full Regeneration |
|---------------|--------------------|-----------------------------|---------------------------|
| **Anti-Degradation Rules** | ALWAYS loaded | ALWAYS loaded | ALWAYS loaded |
| **Feature Name Registry** | ALWAYS loaded | ALWAYS loaded | Re-derived from EC-01 |
| **Voice/Soul Constraints** | Referenced (not re-loaded) | Re-loaded from specimen | Full re-load + recalibration |
| **Teachings** | Not re-loaded | Re-loaded for affected skill | Full re-load all skills |
| **Skill Spec (AGENT.md)** | Not re-loaded | Re-loaded for affected skill | Re-loaded for all affected skills |
| **Upstream Context** | Not re-loaded | Re-loaded for affected section | Full upstream re-load |
| **Context Reservoir** | Not re-loaded | Relevant sections re-loaded | Full re-load |
| **Specimens (System 1)** | Not re-loaded | Re-loaded for affected skill | Full re-load |
| **Specimens (System 2)** | Not re-loaded | Re-loaded for affected persona(s) | Full re-load all personas |
| **Arena** | Not triggered | Optional (human decides) | Mandatory re-run |

### The Non-Negotiables (All Levels)

These constraints apply at EVERY severity level, including Light Edit:

```yaml
always_enforced:
  - anti_degradation_rules: "Read and acknowledge before ANY revision"
  - feature_name_lock: "EC-01 names are exact unless Level 1 explicitly renames"
  - anti_slop_lexicon: "Banned words cannot be introduced at any level"
  - proof_preservation: "Proof elements cannot be removed unless explicitly requested"
  - scan_optimization: "Revised sections must pass 3-5 second scan test"
  - word_budgets: "Revised sections must stay within original word budget"
  - voice_register: "Revision cannot shift voice register without Level 2+ classification"
```

---

## REVISION EXECUTION PROTOCOL

### Step 1: Classify Severity

Before touching any copy, classify the feedback:

```
RECEIVE feedback from human

CLASSIFY:
  IF feedback targets specific words/phrases within a section → Level 1
  IF feedback requires rewriting/restructuring 1+ sections → Level 2
  IF feedback invalidates strategy, voice, feature hierarchy, or page architecture → Level 3

ANNOUNCE classification to human:
  "This is a [Level 1/2/3] revision. I will [re-load X, Y, Z] before making changes."

IF uncertain about classification:
  ASK human: "This could be a Level 1 (light edit) or Level 2 (structural revision).
  Level 2 will re-load the skill spec and teachings for better quality but takes more context.
  Which do you prefer?"
```

### Step 2: Re-Load Context (Per Matrix)

```
BASED ON classification:

Level 1:
  1. Read anti-degradation file for this skill
  2. Confirm feature name registry (EC-01 names)
  3. Reference (not re-load) voice constraints
  4. Proceed to edit

Level 2:
  1. Read anti-degradation file for this skill
  2. Confirm feature name registry (EC-01 names)
  3. Re-load AGENT.md for the affected skill
  4. Re-load teachings loader output for the affected skill
  5. Re-load relevant context reservoir sections
  6. Re-load System 2 specimens for relevant persona(s) if Arena-derived
  7. Proceed to revision

Level 3:
  1. Read ALL anti-degradation files for affected engine
  2. Re-derive feature name registry (if hierarchy changed)
  3. Re-load ALL AGENT.md files for affected skills
  4. Re-load ALL teachings loaders
  5. Re-load full context reservoir
  6. Re-load ALL specimens (System 1 + System 2)
  7. Re-run Arena for affected skills (mandatory)
  8. Proceed to full regeneration
```

### Step 3: Execute Revision

```
EXECUTE revision with re-loaded context active

DURING execution:
  - MC-CHECK at each paragraph boundary (Level 2+)
  - Anti-degradation self-check every 500 words (Level 2+)
  - Feature name consistency check on completion (all levels)
  - Scan optimization check on completion (all levels)

AFTER execution:
  - Log revision to revision-log.yaml
  - Present revised copy to human with change summary
```

### Step 4: Post-Revision Verification

```
VERIFY revised output against:

Level 1:
  [ ] Changed only what was requested
  [ ] No new slop words introduced
  [ ] Feature names still exact
  [ ] Section still scan-optimized

Level 2:
  [ ] All Level 1 checks
  [ ] Revised section(s) still pass standalone test
  [ ] Proof elements preserved or strengthened
  [ ] Design notes still actionable
  [ ] Voice register consistent with rest of page
  [ ] Word budget maintained

Level 3:
  [ ] All Level 2 checks
  [ ] Arena results meet quality threshold
  [ ] Full page coherence check
  [ ] All downstream dependencies updated
```

---

## REVISION-SPECIFIC ANTI-DEGRADATION RULES

### Forbidden Revision Behaviors

| Behavior | Why It's Forbidden | Detection |
|----------|-------------------|-----------|
| Revising with raw model (no skill re-load) | Produces structurally correct but quality-degraded copy | Missing anti-degradation acknowledgment |
| Introducing slop during revision | Light edits are especially vulnerable to slop injection | Anti-slop lexicon check |
| Changing feature names during non-rename edits | Feature name consistency is a page-wide constraint | Feature registry diff |
| Removing proof to "tighten" copy | Proof converts — it stays unless human explicitly removes | Proof count comparison |
| Expanding word count during revision | Revisions should tighten, not bloat | Word count diff |
| Breaking scan optimization during revision | Scan optimization is the #1 ecom quality criterion | 3-5 second scan test |
| Shifting voice register during Light Edit | Voice drift is cumulative and subtle | Voice register comparison |
| Rewriting entire sections during Light Edit | That's a Level 2, not a Level 1 | Word change ratio (>30% = Level 2) |

### Forbidden Rationalizations

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "The feedback implies I should also improve..." | Do what was asked, nothing more | LIMIT scope to explicit feedback |
| "While I'm here, I'll also fix..." | Scope creep degrades quality | STOP — only revise what was requested |
| "This reads better without the proof" | Proof converts. It stays. | KEEP proof, reposition if needed |
| "A simpler feature name would be..." | Feature names are locked (EC-01) | DO NOT change unless Level 1 rename |
| "I don't need to re-load the skill spec for this" | Skill spec prevents structural drift | RE-LOAD at Level 2+ |
| "The teachings don't apply to this revision" | Teachings prevent principle violations | RE-LOAD at Level 2+ |
| "The anti-degradation file is the same as last time" | It must be RE-READ, not remembered | RE-READ at every revision |

---

## FEEDBACK HIERARCHY

```
┌─────────────────────────────────────────────────────────┐
│  FEEDBACK PRIORITY (Highest to Lowest)                  │
├─────────────────────────────────────────────────────────┤
│  1. Human feedback (explicit direction from client/user)│
│  2. Arena results (multi-perspective competition)       │
│  3. Skill defaults (AGENT.md + teachings)               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  BUT these constraints ALWAYS apply regardless:         │
│  - Anti-degradation rules (structural enforcement)      │
│  - Voice/Soul constraints (voice register)              │
│  - Feature name locks (EC-01 registry)                  │
│  - Anti-slop lexicon (banned words)                     │
│  - Scan optimization (ecom-specific)                    │
│  - Proof preservation (unless explicit removal)         │
│                                                         │
│  Human CAN override constraints with explicit request:  │
│  "Remove the proof from section 4" → OK (explicit)     │
│  "Tighten section 4" → proof stays (implicit)          │
└─────────────────────────────────────────────────────────┘
```

---

## ENGINE-SPECIFIC INTEGRATION POINTS

### Long-Form VSL Engine (02-long-form-vsl)

| Severity | What Re-Loads | Engine-Specific Rules |
|----------|--------------|----------------------|
| Level 1 | Anti-degradation, expression anchors | Expression anchors cannot drift during light edits |
| Level 2 | AGENT.md, teachings, context reservoir, specimens | Cascading prose pattern must be maintained — if Skill 14 is revised, check Skill 15-17 for consistency |
| Level 3 | Everything + Arena re-run | Root cause, mechanism, and Big Idea must be re-validated if strategy changed |

**Long-Form Specific Constraints:**
- Cascading prose: If a mid-pipeline skill is revised (e.g., Skill 14 mechanism narrative), all downstream prose (Skills 15-17) must be checked for consistency
- Expression anchors: TIER1 expressions from Skill 06 cannot be changed at Level 1 — that's a Level 2 minimum
- Active Recitation: If Level 2 revision changes strategic anchors, recitation file must be updated

### E-Commerce Engine (03-e-comm)

| Severity | What Re-Loads | Engine-Specific Rules |
|----------|--------------|----------------------|
| Level 1 | Anti-degradation, feature name registry | Feature names are LOCKED at Level 1 (except explicit rename requests) |
| Level 2 | AGENT.md, teachings, context reservoir, specimens | Scan optimization must be re-checked on all revised sections |
| Level 3 | Everything + Arena re-run | Feature hierarchy may change — EC-01 must be re-run before downstream |

**E-Comm Specific Constraints:**
- Feature names: Locked at all levels unless Level 1 explicitly renames. If a feature IS renamed, ALL sections using that name must be updated (page-wide find-replace)
- Scan optimization: Every revised section must be re-tested for 3-5 second comprehension
- Proof density: Proof cannot be removed during any revision level
- Design notes: If copy is revised, check that design notes still match the revised copy
- Section independence: Revised sections must still pass the shuffle test (standalone)

---

## REVISION TRACKING

### revision-log.yaml

Every revision is logged for traceability:

```yaml
revision_log:
  - id: "REV-001"
    timestamp: "ISO timestamp"
    severity: 1  # 1, 2, or 3
    engine: "03-e-comm"
    skill: "EC-02-hero-value-prop"
    section: "hero_headline"
    feedback: "Make the headline more specific — include a number"
    context_reloaded:
      - anti_degradation: true
      - feature_registry: true
      - agent_md: false
      - teachings: false
      - specimens: false
    changes_made: "Headline changed from 'The Club That Changed Everything' to 'The Club That Added 23 Yards in 30 Days'"
    verification:
      slop_check: PASS
      feature_consistency: PASS
      scan_optimization: PASS
      word_budget: PASS
    human_approved: true
```

**Log location:** `~outputs/[project-code]/revision-log.yaml`

---

## ESCALATION PROTOCOL

```
IF revision produces lower quality than original:
  → STOP — present both versions to human
  → "The revision may have degraded quality. Here's the original and revised.
     Which do you prefer, or should I try a different approach?"

IF human requests conflicting changes:
  → STOP — surface the conflict
  → "You asked me to [X], but this conflicts with [Y] from earlier.
     Which takes priority?"

IF revision at Level 1 requires Level 2 scope:
  → STOP — reclassify
  → "This change affects the section's structure. I'm upgrading to Level 2
     and re-loading the skill spec and teachings. Proceeding."

IF 3+ revisions to the same section:
  → FLAG — potential deeper issue
  → "This section has been revised 3 times. The issue may be upstream
     (strategy, feature hierarchy, or voice direction). Should we revisit
     the source skill instead?"

IF same root cause class appears in 2+ revisions:
  → FLAG — systemic pattern detected
  → "The same root cause class ([class name]) has appeared in 2+ revisions.
     This suggests a systemic issue — not a per-section fix. Route to the
     Self-Learning Promotion Protocol for pattern analysis and potential
     rule promotion."
```

---

## HUMAN EDIT EXTRACTION — INTAKE MODE

**Added in v1.2.** When a human edits AI output directly — rather than giving revision feedback for the AI to execute — the revision is not classified into Levels 1-3. Instead, it is routed to the **Human Edit Extraction** procedure defined in `HUMANIZATION-PROTOCOL.md`.

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
5. Extraction report is saved to `~outputs/[project-code]/`

**Why this is a separate intake mode:** The Feedback-Revision Protocol's 3 severity levels assume the AI is executing the revision. When the human edits directly, the AI's job is not to revise — it is to LEARN from what the human changed. The extraction procedure captures that learning and feeds it into the Self-Learning Promotion Protocol.

---

## MANDATORY READ DECLARATION

Before executing ANY revision:

```
I HAVE READ: FEEDBACK-REVISION-PROTOCOL.md v1.2
I HAVE CLASSIFIED this feedback as: Level [1/2/3]
I WILL RE-LOAD: [list of context layers per matrix]
I WILL VERIFY: [checklist for this level]
I WILL NOT: Revise with raw model, introduce slop, change feature names without explicit request,
            remove proof without explicit request, break scan optimization, expand word counts,
            exceed the scope of the feedback.
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-13 | Initial creation: 3 severity levels, context re-loading matrix, revision-specific anti-degradation rules, feedback hierarchy, engine-specific integration points (long-form + e-comm), revision tracking via revision-log.yaml, escalation protocol. |
| 1.1 | 2026-03-15 | Added escalation trigger: "Same root cause class appears in 2+ revisions" — routes to Self-Learning Promotion Protocol for systemic pattern analysis. |
| 1.2 | 2026-03-15 | Added Human Edit Extraction as a recognized intake mode. When humans edit AI output directly, the extraction procedure from HUMANIZATION-PROTOCOL.md runs instead of the 3-level revision flow. Updated mandatory read declaration to v1.2. |
