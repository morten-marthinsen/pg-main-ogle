# Veda — Anti-Degradation Adapter

**Version:** 1.0
**Created:** 2026-02-08
**Core reference:** Read `../CREATIVE-OS-ANTI-DEGRADATION.md` first — it contains the universal system (session resume, phase-stop, forbidden rationalizations, context management, MC-CHECK, handoff protocol). This adapter adds Veda-specific structural gates.

---

## VEDA-SPECIFIC STRUCTURAL GATES

### Gate 1: TypeScript Compilation Gate

**Before any commit, `npx tsc --noEmit` MUST pass.**

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

### Gate 2: Test Suite Gate

**Before any commit, `npm test` MUST pass.**

```
BEFORE COMMIT:
  RUN: npm test
  IF failures > 0:
    HALT — Fix failing tests before committing
    DO NOT skip tests "to save time"
    DO NOT disable failing tests
  IF passes:
    PROCEED to commit
```

### Gate 3: Root Angle Integrity Gate

**Root angles are sacred. Never fabricated, never modified on expansion.**

```
BEFORE ANY PIPELINE OPERATION:
  [ ] Root angle name comes from SSS Column C (Ad Level Tracking)
  [ ] Root angle is NOT fabricated or guessed
  [ ] Expansion operations preserve root angle UNCHANGED
  [ ] --override-root-angle is ONLY used for testing (never production)

  IF ANY UNCHECKED → HALT
  A contaminated expansion makes the entire Script ID's performance data meaningless.
```

### Gate 4: Naming Convention Gate

**Every Asset ID must comply with TESS-NAMING-CONVENTION.md v3.4.**

```
BEFORE GENERATING ANY ASSET ID:
  [ ] 15-position format verified
  [ ] Position 7 (AdCategory) correctly indicates Net New vs Expansion
  [ ] New assets use exv/exh (not legacy ver/hor)
  [ ] All positions match valid codes from the naming convention

  IF ANY UNCHECKED → HALT — Fix before proceeding
```

### Gate 5: Hook Stack Gate

**Hook Stack requires a real hook clip. No placeholders.**

```
BEFORE HOOK STACK OPERATION:
  [ ] hook_clip_path points to a real file (not default placeholder)
  [ ] Hook clip dimensions are compatible with source
  [ ] buildHookStackArgs applies scale+pad+setsar=1 when sourceDims provided

  IF ANY UNCHECKED → HALT — Pipeline will fail
```

### Gate 6: Build Before CLI Gate

**`npm run build` is required before running CLI.**

```
BEFORE RUNNING CLI (node dist/cli.js):
  RUN: npm run build
  IF build fails:
    HALT — Fix build errors
  PROCEED with CLI

  DO NOT run CLI against stale dist/ directory
  DO NOT skip build "because I only changed a comment"
```

---

## VEDA-SPECIFIC FORBIDDEN RATIONALIZATIONS

| Rationalization | Why Invalid | Required Response |
|-----------------|-------------|-------------------|
| "It works, I'll add tests later" | "Later" never comes in session-based work | HALT — Add tests now |
| "This edge case won't happen in practice" | Edge cases cause production bugs | HALT — Handle or document why impossible |
| "The types are close enough" | TypeScript exists to catch mismatches. "Close enough" = wrong. | HALT — Fix the types |
| "We can skip the test run, I only changed one line" | One-line changes break things constantly | HALT — Run the tests |
| "The build is probably fine" | "Probably" is not verified | HALT — Run the build |
| "This root angle looks right" | Root angles are verified, not eyeballed | HALT — Check SSS Column C |

---

## VEDA-SPECIFIC MC-CHECK

```yaml
VEDA-MC-CHECK:
  trigger: "[phase_start | phase_end | before_commit | context_pressure]"

  # Include all universal MC-CHECK fields, plus:
  verification_status:
    typescript_clean: "[Y/N] — last tsc result"
    tests_passing: "[Y/N] — last npm test result"
    build_current: "[Y/N] — dist/ matches src/"
    git_state_verified: "[Y/N] — index checked"
    if_any_no_at_phase_end: "DO NOT claim phase complete"

  pipeline_integrity:
    root_angles_from_sss: "[Y/N]"
    naming_convention_compliant: "[Y/N]"
    hook_clips_real: "[Y/N]"
    if_any_no: "HALT — fix before proceeding"

  result: "[PROCEED | SLOW_DOWN | PREPARE_HANDOFF | SESSION_BREAK]"
```

---

## VEDA-SPECIFIC BRIDGE GATES

### Tess → Veda (Intake Queue)

```
BEFORE PROCESSING INTAKE QUEUE ENTRY:
  [ ] Asset IDs comply with 15-position naming convention
  [ ] Root angle names come from SSS Column C (never fabricated)
  [ ] Expansion types are valid codes from TESS-NAMING-CONVENTION.md
  [ ] Source asset IDs reference real assets
  [ ] Downloaded source matches aspect ratio in asset ID
```

### Veda → Iconik (Upload)

```
BEFORE ANY ICONIK UPLOAD:
  [ ] Enter plan mode — show what will be uploaded
  [ ] Human approval received
  [ ] Asset ID in filename matches the production spec
  [ ] After upload: verify asset appears in Iconik
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-08 | Initial creation. Adapter for Veda video production. Gates: TypeScript, tests, root angle, naming convention, hook stack, build-before-CLI. |
