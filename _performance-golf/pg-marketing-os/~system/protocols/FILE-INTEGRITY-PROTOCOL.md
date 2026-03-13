# File Integrity Protocol — Configuration Drift Detection

**Version:** 1.0
**Created:** 2026-03-07
**Purpose:** Detect when core system files have been modified, preventing silent configuration drift
**Sources:** Agents of Chaos — Markdown File Injection finding, Mastermind Rec 3

---

## Why This Exists

The entire Marketing-OS system is markdown files in a git repo. The Agents of Chaos study proved that agents referencing externally-editable markdown execute planted instructions without question. In Marketing-OS, this isn't about malicious attack — it's about accidental drift: merge conflicts, misedits, threshold changes that go unnoticed.

---

## Session Start Check

At the start of every session, before executing any skill:

### Quick Check (Lightweight — always run)

```bash
git diff --name-only HEAD~5 -- \
  ~system/SYSTEM-CORE.md \
  ~system/protocols/ARENA-CORE-PROTOCOL.md \
  ~system/ARENA-PROTOCOL.md \
  ~system/SPECIMEN-GUIDE.md \
  ~system/SESSION-ARCHITECTURE.md \
  ~system/pipeline-handoff-registry.md
```

**If any files changed in recent commits:**
1. Report which files changed
2. Show a brief diff summary
3. Human confirms: "Changes are expected" or "Investigate before proceeding"

**If no files changed:** Proceed normally.

### Structural Integrity Check (Run periodically or after major updates)

Verify core structural invariants:

```yaml
integrity_check:
  7_laws:
    expected_count: 7
    action_if_wrong: "HALT — 7 Laws must be exactly 7"

  forbidden_behaviors:
    output_failures_count: 6
    execution_failures_count: 5
    per_microskill_failures_count: 10
    expression_anchoring_failures_count: 3
    arena_failures_count: 9
    quality_failures_count: 5
    action_if_wrong: "FLAG — count mismatch may indicate deleted or added rules"

  anti_degradation_files:
    expected_minimum: 20  # One per main skill
    action_if_wrong: "FLAG — missing AD files"
```

---

## Core Files Registry

| File | Role | Modification Sensitivity |
|------|------|------------------------|
| `~system/SYSTEM-CORE.md` | Universal execution constraints | **CRITICAL** — changes affect every skill |
| `~system/protocols/ARENA-CORE-PROTOCOL.md` | Arena execution protocol | **HIGH** — changes affect all Arena skills |
| `~system/ARENA-PROTOCOL.md` | Arena reference | HIGH |
| `~system/SPECIMEN-GUIDE.md` | Specimen loading protocol | HIGH |
| `~system/SESSION-ARCHITECTURE.md` | Session structure | MEDIUM |
| `~system/pipeline-handoff-registry.md` | Handoff contracts | HIGH |
| `~system/protocols/EXECUTION-GUARDRAILS.md` | Universal enforcement | **CRITICAL** |
| Skill ANTI-DEGRADATION.md files | Per-skill enforcement | HIGH (per skill) |

---

## Heavy Approach (Future — when automation justifies it)

For production environments with frequent modifications:

### Manifest File

Create `.claude/integrity-manifest.yaml`:

```yaml
# integrity-manifest.yaml
# SHA-256 hashes of core system files at last known-good state
generated: "[ISO 8601]"
files:
  ~system/SYSTEM-CORE.md: "[sha256]"
  ~system/protocols/ARENA-CORE-PROTOCOL.md: "[sha256]"
  # ... etc
```

**Validation:** At session start, compute current hashes and compare to manifest. Any mismatch = FLAG.

**Update:** After any intentional modification, regenerate the manifest:
```bash
python3 scripts/generate_integrity_manifest.py
git commit -m "chore: update integrity manifest"
```

**Status:** This heavy approach is PLANNED but not yet implemented. The lightweight git diff approach is sufficient for current usage patterns.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — session start git diff check, structural integrity validation, core files registry |
