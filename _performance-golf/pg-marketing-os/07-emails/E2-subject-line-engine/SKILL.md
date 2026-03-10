---
name: subject-line-engine
description: >-
  Generate high-performing email subject lines from 18 formula categories derived
  from analysis of 2,684 Ben Settle emails. Use AFTER email bodies are written by
  E1 — subject lines must match the WRITTEN email, not a planned or hypothetical
  one. Produces multiple subject line candidates per email, scores them against 7
  SL-specific criteria, and presents the top 5-10 for human selection. Targets
  6-7 word sweet spot from corpus analysis. Trigger when users mention subject
  lines, email subjects, SL testing, open rate optimization, or writing subject
  lines for existing email drafts. Requires E1 email draft output.
---

# E2 — Subject Line Engine

**Pipeline Position:** After E1 (Email Writer). Before E3 (Sequence Assembler). Subject lines must match WRITTEN emails, not planned ones.

---

## PURPOSE

Generate high-performing email subject lines from 18 formula categories derived from analysis of 2,684 Ben Settle emails. Produces multiple candidates per email, scores them, and presents top 5-10 for human selection.

**Success Criteria:**
- Multiple subject line candidates per email
- All 18 formula categories considered
- 6-7 word sweet spot targeted
- Scored against 7 SL-specific criteria
- Top 5-10 presented for human selection

---

## LAYER ARCHITECTURE

| Layer | Task |
|-------|------|
| 0 | Input loading + email draft ingestion |
| 1 | Formula category selection + candidate generation |
| 2 | Scoring + ranking |
| 3 | Arena — subject line competitive generation |

---

## REFERENCE FILES

For full execution specs, microskill details, and anti-degradation protocols:
- `SUBJECT-LINE-AGENT.md` — Complete orchestration specification
- `SUBJECT-LINE-ANTI-DEGRADATION.md` — Quality enforcement rules
- `ARENA-LAYER.md` — Arena specification

---

## OUTPUT

**Primary:** Subject line candidates with scores per email
**Location:** `~outputs/[project-code]/email/`
