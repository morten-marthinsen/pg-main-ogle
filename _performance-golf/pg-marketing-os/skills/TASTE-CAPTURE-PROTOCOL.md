# Taste Capture Protocol — Structured Edit Learning System

**Version:** 1.0
**Created:** 2026-02-15
**Purpose:** Capture, structure, and operationalize Anthony's revision patterns as reusable taste constraints
**Integration:** Learning Log (SCHEMA.md v2.0), Soul.md Protocol, Arena Criteria, Anti-Pattern Lists

---

## Why This Exists

Anthony's edits are the richest taste signal in the system. Every time he revises Arena output or editorial drafts, he's encoding preferences that should persist across projects. But currently:

1. Edit patterns are captured ad-hoc (prose style guide, scattered memory notes)
2. No structured data — patterns can't be queried, filtered, or weighted
3. No feedback loop — the same taste violations repeat across projects
4. Soul.md protocol exists but has zero actual Soul.md files

This protocol creates the structured capture → pattern accumulation → generation constraint pipeline.

---

## Edit Capture Schema

Every Anthony revision is captured as a structured taste edit entry.

```yaml
taste_edit:
  id: TE-[project-abbreviation]-[sequential-number]  # e.g., TE-RSF-001
  project: [project-name]                              # e.g., rich-shefren-ai-opportunity
  skill: [skill-id]                                    # e.g., 12-story, 16-offer-copy
  section: [section-identifier]                        # e.g., section-7-awakening, lead-v2
  timestamp: [ISO 8601]

  before: |
    [Exact original text — verbatim, preserving line breaks]

  after: |
    [Exact revised text — verbatim, preserving line breaks]

  pattern: [abstracted-pattern-name]
    # Examples: credential-lead, generous-framing, line-splitting,
    #           we-us-pivot, stakes-raising, salesman-removal,
    #           metric-simplification, contemporary-vernacular

  category: [one of the following]
    # voice        — WHO is speaking (register, persona, authority level)
    # structure    — HOW content is organized (line breaks, sections, flow)
    # pacing       — RHYTHM of the copy (sentence length, whitespace, emphasis)
    # framing      — PERSPECTIVE on ideas (generous vs adversarial, inclusive vs exclusive)
    # word-choice  — SPECIFIC WORDS preferred or rejected
    # removal      — WHAT WAS CUT and why

  reason: [1-2 sentence explanation of why this edit was made]

  generalizable: true | false
    # true  = applies across projects (e.g., "never attack competitors")
    # false = project-specific (e.g., "Rich speaks in first person")

  soul_dimension: [which Soul.md dimension this maps to]
    # voice_register | emotional_range | energy | pacing | anti_voice | taste_decisions

  confidence: high | medium | low
    # high   = clear, repeated pattern (3+ instances)
    # medium = emerging pattern (2 instances)
    # low    = single instance, may be context-specific
```

### Capture Trigger

```
AFTER EVERY HUMAN EDIT SESSION:
  1. COMPARE original output with Anthony's revised version
  2. IDENTIFY every discrete change (word-level, line-level, section-level)
  3. For EACH change:
     a. Record before/after text (verbatim)
     b. Classify pattern and category
     c. Write reason (ask Anthony if unclear)
     d. Assess generalizability
     e. Map to soul_dimension
  4. WRITE all taste_edit entries to:
     [project]/TASTE-EDITS.yaml
  5. LOG taste_revision_entry to LearningLog (see SCHEMA.md v2.0)
```

---

## Pattern Accumulation

Individual edits cluster into reusable taste rules as they recur across edits and projects.

### Pattern Lifecycle

```
Single Edit (TE-RSF-001)
  → confidence: low
  → stored in project TASTE-EDITS.yaml

Second Instance (TE-RSF-014 or TE-DDX-003)
  → confidence: medium
  → pattern flagged as "emerging"

Third+ Instance (across 2+ projects)
  → confidence: high
  → pattern promoted to TASTE-RULES.md
  → becomes active generation constraint
```

### Taste Rules File

Location: `skills/TASTE-RULES.md`

```yaml
taste_rule:
  id: TR-[sequential]
  name: [human-readable rule name]
  description: [what this rule requires/forbids]
  category: voice | structure | pacing | framing | word-choice | removal
  soul_dimension: [which Soul.md dimension]

  type: require | prefer | avoid | forbid
    # require = must always do this
    # prefer  = do this unless project Soul.md overrides
    # avoid   = don't do this unless project Soul.md explicitly allows
    # forbid  = never do this, no override

  evidence:
    - edit_id: TE-RSF-001
      project: rich-shefren-ai-opportunity
    - edit_id: TE-DDX-003
      project: myers-detox-daily-detox

  examples:
    do: [example of correct application]
    dont: [example of what this rule prevents]

  scope: universal | niche-specific | persona-specific
    # universal      = applies to all projects
    # niche-specific = applies to health/finance/info-product/etc.
    # persona-specific = applies when writing as specific voice (e.g., Rich Schefren)
```

### Known Taste Rules (from existing edit analysis)

These rules are already evidenced from the RSF project edits:

| ID | Rule | Type | Category | Evidence Count |
|----|------|------|----------|---------------|
| TR-001 | One sentence per line, blank lines between | require | structure | 20+ edits |
| TR-002 | Credential-lead for unfamiliar authorities | require | framing | 5+ edits |
| TR-003 | Never attack industry competitors | forbid | framing | 3+ edits |
| TR-004 | Shift to "we/us" at the argument pivot | prefer | voice | 4+ edits |
| TR-005 | Contemporary 2026 vernacular | prefer | word-choice | 5+ edits |
| TR-006 | Cut biographical self-credentialing | require | removal | 3+ edits |
| TR-007 | Raise stakes to generational/family | prefer | framing | 2+ edits |
| TR-008 | Soften assertions to beliefs | prefer | voice | 3+ edits |
| TR-009 | Standalone emphasis words for impact | prefer | pacing | 10+ edits |
| TR-010 | End narrative sections with open loops | require | structure | 3+ edits |
| TR-011 | No wage/salary framing for entrepreneurs | forbid | framing | 2+ edits |
| TR-012 | Generous understanding for competitors | require | framing | 3+ edits |
| TR-013 | "Distinctions" not "strategic frameworks" | require | word-choice | 2+ edits (RSF Sec 9) |
| TR-014 | Humble value statements ("modestly a $X value") | prefer | voice | 2+ edits (RSF Sec 9) |

---

## Taste-to-Generation Bridge

Structured taste data becomes generation constraints through three channels.

### Channel 1: Soul.md Enrichment

After each project, taste edits update the project's Soul.md:

```
FOR EACH taste_edit WHERE generalizable = false:
  → Map to corresponding Soul.md section
  → Add as positive specimen (if "after" text is exemplary)
  → Add as anti-specimen (if "before" text shows common failure)
  → Update taste_decisions with new locked-in choices
```

### Channel 2: Arena Criteria Enhancement

Taste rules with `type: require` or `type: forbid` become Arena judging criteria:

```
FOR EACH taste_rule WHERE type = require OR forbid:
  → Add to skill-specific Arena criteria
  → Weight based on confidence (high = criterion, medium = tiebreaker)
  → Critic uses taste rules as weakness detection heuristics
```

### Channel 3: Anti-Pattern Lists

Taste rules with `type: avoid` or `type: forbid` feed anti-pattern enforcement:

```
FOR EACH taste_rule WHERE type = avoid OR forbid:
  → Add to anti-slop validator checks
  → Include "before" examples as patterns to detect
  → Trigger revision when detected in generated output
```

### Generation Constraint Loading

```
AT GENERATION TIME (Layer 2, Arena Rounds):
  1. LOAD project Soul.md (project-specific taste)
  2. LOAD TASTE-RULES.md (cross-project taste rules)
  3. FILTER rules by scope (universal + niche-matched + persona-matched)
  4. APPLY as constraints:
     - require/forbid rules → HARD constraints (violation = rewrite)
     - prefer/avoid rules → SOFT constraints (weighted in scoring)
  5. HOLD in active context alongside specimens
```

---

## Post-Campaign Review Protocol

After every project reaches Campaign Assembly (Skill 19) or Editorial (Skill 20):

### Step 1: Edit Inventory

```
COLLECT all taste_edit entries from project TASTE-EDITS.yaml
CALCULATE:
  - total_edits: [count]
  - edits_by_category: {voice: X, structure: Y, pacing: Z, ...}
  - edits_by_skill: {12-story: X, 16-offer-copy: Y, ...}
  - edits_by_soul_dimension: {voice_register: X, anti_voice: Y, ...}
```

### Step 2: Pattern Extraction

```
GROUP edits by pattern name
FOR EACH pattern with 2+ occurrences:
  - IF pattern NOT in TASTE-RULES.md:
      → Propose new taste rule (human approval required)
  - IF pattern IS in TASTE-RULES.md:
      → Increment evidence count
      → Upgrade confidence if threshold met
```

### Step 3: Soul.md Accuracy Assessment

```
COMPARE pre-campaign Soul.md predictions with actual edits:
  - Did the voice register predict the actual voice corrections needed?
  - Did the anti-voice list catch the actual anti-patterns?
  - Did the energy signature match the actual emotional calibration?
  - Were there SURPRISE edits that Soul.md didn't predict?

SCORE: Soul.md Accuracy (1-10)
  - 9-10: Soul.md nearly perfectly predicted taste requirements
  - 7-8:  Soul.md caught most issues, a few surprises
  - 5-6:  Significant gaps in Soul.md predictions
  - 1-4:  Soul.md failed to capture actual taste requirements
```

### Step 4: Cross-Project Pattern Mining

```
IF generalizable taste_edits exist:
  → Check against existing TASTE-RULES.md
  → Propose new universal rules
  → Update niche-specific rules
  → Flag persona-specific patterns for Soul.md templates
```

### Step 5: Satisfaction Signal Analysis

```
CALCULATE implicit satisfaction score:
  - 0-5 edits   → high satisfaction (estimated 8+)
  - 6-20 edits  → moderate satisfaction (estimated 5-7)
  - 21+ edits   → low satisfaction (estimated 1-4)

CORRELATE with explicit rating (if captured):
  - Large gap between implicit and explicit → investigate
  - Consistent alignment → validate the signal model
```

### Step 6: Output

Write post-campaign taste report to:
`[project]/POST-CAMPAIGN-TASTE-REVIEW.md`

Sections:
1. Edit Inventory Summary
2. New Patterns Discovered
3. Existing Rules Reinforced
4. Soul.md Accuracy Assessment
5. Satisfaction Analysis
6. Recommendations for System Updates

---

## Integration Points

| System | How Taste Capture Integrates |
|--------|----------------------------|
| **Soul.md Protocol** | Taste edits enrich Soul.md with specimens and taste decisions |
| **Learning Log** | `taste_revision_entry` logged per edit session (SCHEMA.md v2.0) |
| **Arena** | Taste rules become judging criteria and Critic heuristics |
| **Anti-Slop** | Taste rules with `type: forbid` added to anti-slop validators |
| **CLAUDE.md** | Cross-references this protocol; mandates capture after every edit session |
| **Post-Campaign** | Systematic review extracts and promotes patterns |

---

## Operational Workflow

```
Anthony edits Arena output or editorial draft
  │
  ├── Claude captures each edit as taste_edit entry
  ├── Writes to [project]/TASTE-EDITS.yaml
  ├── Logs taste_revision_entry to LearningLog
  │
  ▼
Pattern accumulation runs
  │
  ├── New patterns flagged as "emerging" (confidence: medium)
  ├── Recurring patterns promoted to TASTE-RULES.md (confidence: high)
  │
  ▼
Next generation loads taste constraints
  │
  ├── Soul.md (project-specific)
  ├── TASTE-RULES.md (cross-project)
  ├── Applied as hard/soft constraints during generation
  │
  ▼
Post-campaign review
  │
  ├── Edit inventory analyzed
  ├── Soul.md accuracy scored
  ├── New rules proposed
  ├── System updated
  └── POST-CAMPAIGN-TASTE-REVIEW.md written
```

---

## Forbidden Behaviors

1. ❌ Holding taste edits in conversation context only — WRITE TO FILE IMMEDIATELY
2. ❌ Summarizing edits instead of capturing before/after verbatim
3. ❌ Skipping taste capture after a human edit session
4. ❌ Promoting patterns to TASTE-RULES.md without sufficient evidence (3+ instances)
5. ❌ Applying taste rules without checking project Soul.md for overrides
6. ❌ Ignoring generalizable patterns (failing to propose cross-project rules)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-15 | Initial protocol creation |
