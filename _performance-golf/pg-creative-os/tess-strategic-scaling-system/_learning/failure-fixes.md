# Tess Failure Fixes

> Every failure gets a structural fix. Entries are added during sessions when errors are caught and corrected.
> **Issue Classes** (from Marketing OS): factual-error, voice-drift, structural-regression, missing-input, scope-creep, specification-gap, context-loss, hallucination, threading-failure, other
> **L-Scale**: L1 (observation) → L2 (pattern, 2+ occurrences) → L3 (tested fix) → L4 (promoted, human approved) → L5 (embedded in CLAUDE.md) → L6 (system behavior)

## Entry Template

```yaml
entry_id: "LEARN-YYYY-MM-DD-NNN"
date: YYYY-MM-DD
session: NNN
category: "[issue class from list above]"
l_level: "L1"  # L1-L6
what_happened: |
  [What went wrong — specific, not vague]
root_cause: |
  [Why it happened — structural gap, not "I made a mistake"]
structural_fix: |
  [What was changed to prevent recurrence — file, rule, or gate]
prevention: |
  [How the fix prevents this class of error going forward]
```

## Entries

_(No entries yet — add as failures are caught and corrected during Tess sessions.)_
