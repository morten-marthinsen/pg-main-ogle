# Neco Learning Log

> Failure-driven learning system. Every mistake gets a structural fix, not just a correction.

## Protocol

When Neco makes a mistake during a session:

1. **Identify** the error category (fabrication, drift, generic language, skipped gate, etc.)
2. **Record** the entry using the template below
3. **Apply** the structural fix (update sub-agent spec, add to forbidden patterns, etc.)
4. **Verify** the fix would have prevented the original error
5. **Update** `CLAUDE.md` Common Mistakes section if the pattern is recurring

## Entry Template

```yaml
entry_id: "LEARN-YYYY-MM-DD-[seq]"
date: YYYY-MM-DD
session: NNN
category: "fabrication | angle_drift | generic_language | skipped_gate | quality_miss | constraint_violation"
what_happened: |
  [What went wrong — specific, not vague]
root_cause: |
  [Why it happened — the structural gap that allowed it]
structural_fix: |
  [What was changed to prevent recurrence — file, section, specific edit]
prevention: |
  [How this fix prevents the error structurally, not just by instruction]
```

## Categories

| Category | Description | Typical Fix |
|----------|-------------|-------------|
| `fabrication` | Invented statistics, product names, expert quotes | Add to forbidden fabrication patterns in #8 |
| `angle_drift` | Output drifted from confirmed core angle | Strengthen angle congruence check in #8 |
| `generic_language` | Used category emotions instead of specific visceral language | Add example to NECO-CHECK rushing detection |
| `skipped_gate` | Bypassed a structural gate with rationalization | Add rationalization to forbidden bypass patterns |
| `quality_miss` | Delivered below-threshold output | Adjust scoring criteria or add new check |
| `constraint_violation` | Broke a copy constraint or brand guideline | Update constraint reference or add to #8 checks |

## Files

- `patterns.md` — Recurring patterns across sessions (what works, what doesn't)
- `failure-fixes.md` — Specific failures and their structural fixes (the learning log proper)
