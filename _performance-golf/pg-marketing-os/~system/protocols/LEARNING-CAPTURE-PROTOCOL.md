# Learning Capture Protocol — Continuous Improvement Loop

**Version:** 1.0
**Created:** 2026-02-15
**Purpose:** Automated learning capture with explicit ratings, implicit sentiment detection, and systematic extraction
**Inspiration:** PAI framework (hooks + ratings + 3-tier memory) adapted to CopywritingEngine's markdown architecture

---

## Why This Exists

The CopywritingEngine has a Learning Log (SCHEMA.md) but it's hand-curated with no systematic capture. No rating system exists. No way to correlate taste alignment with quality scores. The system cannot answer basic questions like:

- "Which skills consistently produce output the human reviewer is happy with?"
- "Which taste dimensions cause the most revisions?"
- "Is quality improving or declining over time?"

This protocol creates three feedback channels: explicit ratings, implicit sentiment, and structured learning extraction.

---

## Channel 1: Explicit Rating Capture

After every skill completion, prompt the human reviewer for a structured rating.

### Rating Schema

```yaml
rating_entry:
  run_id: [skill_XX_YYYYMMDD_HHMMSS]  # matches run_entry in Learning Log
  project: [project-name]
  skill: [skill-id]
  timestamp: [ISO 8601]

  overall: [1-10]  # Single most important number

  dimensions:  # All optional but encouraged
    taste_alignment: [1-10]
      # "Did the output match my taste/voice expectations?"
    voice_consistency: [1-10]
      # "Did the voice stay consistent throughout?"
    persuasive_strength: [1-10]
      # "How compelling/persuasive is this output?"
    strategic_depth: [1-10]
      # "How strong is the strategic thinking?" (strategic skills only)

  notes: |
    [Optional free-text — the human reviewer's specific feedback]

  edit_count: [integer]
    # Number of edits the human reviewer made (0 = no edits needed)

  satisfaction_signal: high | moderate | low
    # Derived from edit_count (see Channel 2)
```

### Rating Prompt Protocol

```
AFTER EVERY SKILL COMPLETION (Layer 4 output packaging):

  PROMPT: "Skill [XX] complete. Quick rating?
           Overall (1-10): ___
           Optional dimensions:
           - Taste alignment (1-10): ___
           - Voice consistency (1-10): ___
           - Persuasive strength (1-10): ___
           - Strategic depth (1-10): ___
           Any notes?"

  IF the human reviewer provides rating:
    → Log rating_entry to learning-log/[skill]-learning.json
    → Include in skill's execution-log.md

  IF the human reviewer declines or skips:
    → Log rating_entry with overall: null, notes: "Rating declined"
    → DO NOT nag or re-prompt
```

### Rating Scale Guide

| Score | Meaning | Action |
|-------|---------|--------|
| 9-10 | Exceptional — minimal or no edits needed | Capture as success pattern |
| 7-8 | Good — minor polish only | Note what worked well |
| 5-6 | Acceptable — noticeable gaps but usable | Identify gap patterns |
| 3-4 | Below standard — significant rework needed | Root cause analysis required |
| 1-2 | Failure — unusable output | Immediate system review |

---

## Channel 2: Implicit Sentiment Detection

The human reviewer's edit volume is a satisfaction signal. Many edits = the system missed their taste.

### Edit Volume → Satisfaction Mapping

```
0-5 edits    → HIGH satisfaction (estimated 8+)
  The output was close. Only minor polish.

6-20 edits   → MODERATE satisfaction (estimated 5-7)
  Noticeable gaps. System missed some taste dimensions.

21+ edits    → LOW satisfaction (estimated 1-4)
  Significant rework. System failed to match taste.
```

### Edit Category Distribution Analysis

Beyond volume, the CATEGORY of edits reveals which taste dimensions need work:

```
AFTER CAPTURING taste_edit entries (per TASTE-CAPTURE-PROTOCOL.md):

  CALCULATE category distribution:
    voice_edits:     [count] ([percentage]%)
    structure_edits: [count] ([percentage]%)
    pacing_edits:    [count] ([percentage]%)
    framing_edits:   [count] ([percentage]%)
    word_choice_edits: [count] ([percentage]%)
    removal_edits:   [count] ([percentage]%)

  IDENTIFY dominant category:
    IF any category > 40% of edits:
      → FLAG: "[category] is the primary taste gap for this skill"
      → RECOMMEND: Strengthen [category] constraints in Soul.md / TASTE-RULES.md

  IDENTIFY soul_dimension distribution:
    → Map each edit to soul_dimension
    → Flag dimensions with highest edit counts
    → These are the dimensions where the system most often misses
```

### Implicit vs Explicit Correlation

```
WHEN both explicit rating AND edit count are available:

  COMPARE:
    - explicit_overall vs implied_satisfaction
    - IF large gap (e.g., 8 explicit but 25 edits):
        → The human reviewer may be generous with ratings
        → Trust edit count as the harder signal
    - IF aligned (e.g., 6 explicit, 12 edits):
        → Signals are consistent, high confidence in assessment
```

---

## Channel 3: Learning Extraction

After each project, extract structured learnings for system improvement.

### Post-Project Learning Extraction

```
AFTER PROJECT COMPLETION (Skill 20 Editorial or client delivery):

  1. AGGREGATE all rating_entries for this project
  2. AGGREGATE all taste_revision_entries for this project
  3. CALCULATE project-level metrics:
     - average_overall_rating: [mean of all skill ratings]
     - total_edits: [sum across all skills]
     - worst_skill: [skill with lowest rating or most edits]
     - best_skill: [skill with highest rating or fewest edits]
     - dominant_taste_gap: [category with most edits]

  4. EXTRACT learnings:
     a. WHAT WORKED (replicate):
        - Skills rated 8+ with < 5 edits
        - Patterns from those skills to reinforce
     b. WHAT FAILED (avoid):
        - Skills rated < 5 or with 21+ edits
        - Root cause of failures
        - Anti-patterns to add to TASTE-RULES.md
     c. NEW TASTE PATTERNS (encode):
        - Emerging patterns (2+ instances) not yet in TASTE-RULES.md
        - Propose as new rules
     d. SYSTEM RECOMMENDATIONS (propagate):
        - Structural changes needed (new microskills, gate adjustments)
        - Soul.md gaps to address for future projects
        - Specimen gaps (voices not calibrated well enough)

  5. WRITE to: [project]/POST-PROJECT-LEARNING-EXTRACTION.md
  6. UPDATE: learning-log/cross-skill-patterns.json with new patterns
```

### Skill-Level Learning Triggers

```
AFTER EACH SKILL (not just post-project):

  IF rating < 5:
    → Create failure_entry in Learning Log
    → Identify specific dimension(s) that failed
    → Flag for system review

  IF edit_count > 20:
    → Create taste_revision_entry in Learning Log
    → Run edit category distribution analysis
    → Propose Soul.md or TASTE-RULES.md updates

  IF rating >= 9 AND edit_count <= 2:
    → Create success_entry in Learning Log
    → Document what made this execution exceptional
    → Flag patterns for replication
```

---

## Universal LEARN Phase

Every skill execution ends with a LEARN sub-step. This is NOT a new layer — it's appended to Layer 4 (output packaging).

### LEARN Phase Protocol

```
AFTER EVERY SKILL COMPLETION (appended to Layer 4):

  STEP 1: LOG RUN ENTRY
    → Create/append run_entry to learning-log/[skill]-learning.json
    → Include: input summary, output summary, quality scores, execution metadata

  STEP 2: CAPTURE TASTE REVISIONS (if applicable)
    → IF human edits were made during this skill:
        a. Capture each edit per TASTE-CAPTURE-PROTOCOL.md
        b. Write taste_edit entries to [project]/TASTE-EDITS.yaml
        c. Log taste_revision_entry to learning-log/[skill]-learning.json

  STEP 3: PROMPT FOR RATING
    → Present rating prompt to the human reviewer
    → Log rating_entry (or note if declined)

  STEP 4: LOG RATING ENTRY
    → Append rating_entry to learning-log/[skill]-learning.json
    → Include edit_count and satisfaction_signal

  STEP 5: PATTERN CHECK
    → IF 3+ taste revisions in this skill share the same category:
        FLAG: "Potential new taste rule detected: [pattern description]"
        Propose for TASTE-RULES.md (requires human approval)

  STEP 6: UPDATE PROJECT STATE
    → Update PROJECT-STATE.md with skill completion + rating
    → Update PROGRESS-LOG.md with LEARN phase entry
```

### LEARN Phase in Execution Log

The execution-log.md for every skill now includes:

```markdown
## LEARN Phase (Post-Completion)
- **Run entry logged:** [Y/N] — [path to learning log]
- **Taste revisions captured:** [count] edits — [path to TASTE-EDITS.yaml]
- **Rating captured:** [Y/N] — overall: [score], satisfaction: [high/moderate/low]
- **Patterns flagged:** [count] — [description if any]
- **Project state updated:** [Y/N]
```

---

## Querying Learning Data

### Trend Queries

```yaml
# How is skill quality trending?
query_skill_trend:
  skill_id: [skill]
  metric: overall_rating | edit_count | satisfaction_signal
  window: [last N projects]
  # Returns: trend line + average

# Which taste dimensions need the most work?
query_taste_gaps:
  scope: universal | project-specific
  window: [last N projects]
  # Returns: ranked list of taste categories by edit frequency

# Which skills have the highest satisfaction?
query_skill_satisfaction:
  metric: average_rating | average_edit_count
  window: [last N projects]
  # Returns: ranked skill list
```

### Actionable Insights

```
QUARTERLY (or every 3 projects):

  1. CALCULATE per-skill average ratings
  2. IDENTIFY skills with declining trends (3+ consecutive drops)
  3. IDENTIFY persistent taste gaps (same category appears in 3+ projects)
  4. GENERATE system improvement recommendations
  5. WRITE to: ./learning-log/QUARTERLY-REVIEW-[date].md
```

---

## Integration Points

| System | How Learning Capture Integrates |
|--------|-------------------------------|
| **TASTE-CAPTURE-PROTOCOL.md** | Taste edits feed implicit sentiment; patterns feed learning extraction |
| **Soul.md Protocol** | Post-project learnings update Soul.md accuracy; new taste decisions encoded |
| **Learning Log SCHEMA.md** | Two new entry types: `taste_revision_entry` + `rating_entry` |
| **~system/SYSTEM-CORE.md** | Universal LEARN phase documented; mandatory after every skill |
| **Arena** | Ratings correlate with Arena hybrid selection quality |
| **Anti-Degradation** | Low ratings trigger system review; specific degradation flags |

---

## Forbidden Behaviors

1. ❌ Skipping the LEARN phase after skill completion
2. ❌ Nagging the human reviewer for ratings if they decline
3. ❌ Fabricating ratings or edit counts
4. ❌ Holding learning data in conversation context only — WRITE TO FILES
5. ❌ Ignoring implicit sentiment signals (high edit count = system problem, not user pickiness)
6. ❌ Skipping post-project learning extraction
7. ❌ Promoting taste patterns to rules without sufficient evidence (3+ instances)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-15 | Initial protocol creation |
