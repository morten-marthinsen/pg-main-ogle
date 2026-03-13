---
name: check-protocol
description: "DEPRECATED — merged into audit v3.0 as Pre-Flight phase. All check trigger words now route to the unified audit command."
---

# CHECK Command Protocol — DEPRECATED

**Status:** DEPRECATED as of v3.0 audit merge (March 10, 2026)
**Superseded by:** `audit` v3.0

---

## What happened

The CHECK protocol's unique steps (commitment accuracy, reasoning log completeness, staleness sweep, file visibility) were merged into the `audit` skill as a "Pre-Flight" phase. Steps that overlapped with audit (rules compliance, active work quality, rule integrity audit) were already covered by audit's Passes 1-3 and Pass 6.

All "check" trigger words ("check", "check yourself", "run a check", "checkpoint") now route to the unified `audit` command.

**Do not use this skill. Load `audit` instead.**

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Deprecation | COMPLETE | 2026-03-10 | AI | Merged into audit v3.0 as Pre-Flight phase. |