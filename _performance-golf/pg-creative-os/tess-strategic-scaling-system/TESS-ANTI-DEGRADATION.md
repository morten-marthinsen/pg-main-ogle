# Tess — Anti-Degradation Adapter

**Version:** 1.1
**Updated:** 2026-02-08
**Core reference:** Read `../CREATIVE-OS-ANTI-DEGRADATION.md` first — it contains the universal system (session resume, phase-stop, forbidden rationalizations, context management, MC-CHECK, iCloud guard, handoff protocol). This adapter adds Tess-specific structural gates.
**Authority:** This document has EQUAL authority to CLAUDE.md and TESS-MASTER-AGENT.md

Tess is 108+ sessions deep. SESSION-LOG.md is 93K+. Context pressure is real. The universal anti-degradation system plus these Tess-specific gates provide structural protection.

---

## TESS-SPECIFIC STRUCTURAL GATES

### Gate 1: TypeScript Compilation Gate (Dashboard)

**Before any commit in tess-dashboard/, `npx tsc --noEmit` MUST pass.**

```
BEFORE COMMIT:
  RUN: npx tsc --noEmit
  IF errors > 0:
    HALT — Fix TypeScript errors before committing
    DO NOT rationalize "it's just a type warning"
    DO NOT commit with --no-verify
  IF passes:
    PROCEED to commit
```

### Gate 2: Git State Verification Gate

**Before any git operation, verify index integrity.**

```
BEFORE ANY GIT OPERATION:
  RUN: ls -la .git/index*
  IF "index 2" exists:
    RUN: mv ".git/index 2" .git/index
    VERIFY: git status shows expected state (not all-deleted)
  ONLY THEN proceed with git operation

AFTER ANY GIT WRITE (commit, add, reset):
  RUN: ls -la .git/index*
  IF "index 2" appeared again:
    FIX immediately — do not leave corrupted state for next session
```

### Gate 3: Visual Verification Gate (Dashboard)

**Before claiming any UI phase complete, verify in browser.**

```
BEFORE MARKING UI PHASE COMPLETE:
  RUN: npm run dev (if not already running)
  CHECK: All modified pages render without errors
  CHECK: Console shows 0 errors
  CHECK: Data totals match spreadsheet (see Dashboard KPI Gate below)

  IF any check fails:
    HALT — Fix before claiming completion
  IF cannot verify (server won't start, etc.):
    REPORT to user — do not skip verification
```

### Gate 4: Phase Completion Gate

**A phase is NOT complete until ALL items pass.**

```
PHASE COMPLETION CHECKLIST:
  [ ] All planned changes implemented
  [ ] TypeScript compilation passes (Gate 1)
  [ ] Git state is clean/expected (Gate 2)
  [ ] Visual verification done (Gate 3, if UI phase)
  [ ] Phase report output to user
  [ ] User confirmation received

  IF ANY UNCHECKED → PHASE IS NOT COMPLETE
```

---

## TESS-SPECIFIC FORBIDDEN RATIONALIZATIONS

| Rationalization | Why Invalid | Required Response |
|-----------------|-------------|-------------------|
| "It works, I'll add tests later" | "Later" never comes in session-based work | HALT — Add verification now |
| "This edge case won't happen in practice" | Edge cases cause production bugs | HALT — Handle or document why impossible |
| "The types are close enough" | TypeScript catches mismatches. "Close enough" = wrong. | HALT — Fix the types |
| "We can skip visual verification, the code looks right" | Code that "looks right" has caused every UI bug ever. | HALT — Run the dev server and verify |
| "The iCloud index thing probably won't happen this time" | It happens EVERY time. Structural check is mandatory. | HALT — Check `ls -la .git/index*` |
| "This is basically the same as what we did for the other page" | "Basically the same" hides critical differences. | HALT — Read the actual file |

---

## TESS-SPECIFIC MC-CHECK

```yaml
TESS-MC-CHECK:
  trigger: "[phase_start | phase_end | before_commit | context_pressure]"

  # Include all universal MC-CHECK fields, plus:
  verification_status:
    typescript_clean: "[Y/N] — last tsc result"
    git_state_verified: "[Y/N] — index checked"
    visual_check_done: "[Y/N] — browser verified"
    if_any_no_at_phase_end: "DO NOT claim phase complete"

  result: "[PROCEED | SLOW_DOWN | PREPARE_HANDOFF | SESSION_BREAK]"
```

---

## TESS-SPECIFIC BRIDGE GATES

### Tess → Veda (Intake Queue)

```
BEFORE WRITING TO INTAKE QUEUE:
  [ ] Asset IDs comply with 15-position naming convention
  [ ] Root angle names come from SSS Column C (never fabricated)
  [ ] Expansion types are valid codes from TESS-NAMING-CONVENTION.md
  [ ] Source asset IDs reference real assets in the spreadsheet

  IF ANY UNCHECKED → DO NOT WRITE TO INTAKE QUEUE
```

### Tess → Neco (Data Protocol)

```
BEFORE HANDING DATA TO Neco:
  [ ] Root angle data includes actual performance metrics (not summaries)
  [ ] Asset classification is based on verified ROAS thresholds
  [ ] Brand Thread tagging is present (Thread 1 or Thread 2)
```

### Spreadsheet Write Verification

```
BEFORE ANY SPREADSHEET WRITE:
  [ ] Enter plan mode — show what will be written
  [ ] Human approval received
  [ ] Row/column targets verified against current sheet state
  [ ] After write: verify by re-reading the affected range
```

---

## DASHBOARD-SPECIFIC QUALITY GATES

### Data Integrity Gate (Every Session)

```
AFTER ANY DATA-RELATED CHANGE:
  Verify these KPIs still match the spreadsheet:
  - Total assets: 1,058
  - Total spend: $1,052,854
  - Overall ROAS: 94.4%
  - Winner rate: 3.0%
  - Winners count: 32

  IF any KPI doesn't match:
    HALT — Data transformation has a bug
    DO NOT commit until KPIs match
```

### Brand Compliance Gate

```
AFTER ANY UI CHANGE:
  - Primary accent is PG Orange (#FD3300), not blue or default
  - Dark background maintained (not shifted to light)
  - Classification colors follow PG mapping (emerald/sky/orange/indigo)
  - No generic gray admin-panel aesthetic
```

---

## SESSION RESUME (TESS-SPECIFIC ADDITIONS)

In addition to the universal session resume verification (core Part 1):

```
TESS SESSION RESUME — ADDITIONAL CHECKS:
  - git status (in tess-dashboard/) — what files are actually modified?
  - ls -la .git/index* — is the iCloud index bug active?
  - Does file count match the handoff claim?
  - If git state shows all files as "deleted + untracked":
    → iCloud index bug. Run: mv ".git/index 2" .git/index
    → Re-run git status to get real state
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-08 | Refactored to adapter model. Universal content moved to CREATIVE-OS-ANTI-DEGRADATION.md (core). This file now contains only Tess-specific gates: TypeScript, git, visual, phase completion, dashboard KPIs, brand compliance, bridge gates. |
| 1.0 | 2026-02-08 | Initial creation. Full standalone anti-degradation system for Tess. |
