---
name: email-campaign-strategist
description: >-
  Design complete email campaign strategy — campaign type, email-by-email sequence
  blueprint, body type assignments, emotional arc, and urgency escalation. Use when
  launching a new email campaign, planning an email sequence, or determining the
  strategic architecture of a promotional email series. This skill is the architect
  of the email campaign — it decides WHAT gets written; E1-E4 decide HOW. Operates
  in two modes: Mode A (downstream from Skills 01-09 with full strategic context)
  or Mode B (standalone from user brief). Produces campaign-blueprint.yaml for
  handoff to E1 (writer). Trigger when users mention email strategy, campaign
  planning, sequence design, email architecture, or starting an email promotion.
---

# E0 — Email Campaign Strategist

**Pipeline Position:** First skill in Email Engine pipeline. Executes after Campaign Brief (Skill 09) or from standalone brief. Feeds E1 (Email Writer).

---

## PURPOSE

Design a complete email campaign strategy — campaign type, email-by-email sequence blueprint, body type assignments, emotional arc, and urgency escalation. This skill is the ARCHITECT of the email campaign. It decides WHAT gets written; E1-E4 decide HOW.

**Success Criteria:**
- Campaign type selected from decision tree
- Email-by-email sequence blueprint with body type assignments
- Emotional arc mapped across sequence
- Urgency escalation planned
- campaign-blueprint.yaml produced for E1 handoff

---

## LAYER ARCHITECTURE

| Layer | Task |
|-------|------|
| 0 | Input loading + brief parsing |
| 1 | Campaign type selection + sequence design |
| 2 | Body type assignment + emotional arc + urgency mapping |
| 3 | Blueprint packaging + human checkpoint |

---

## REFERENCE FILES

For full execution specs, microskill details, and anti-degradation protocols:
- `EMAIL-STRATEGIST-AGENT.md` — Complete orchestration specification
- `EMAIL-STRATEGIST-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `campaign-blueprint.yaml`
**Location:** `~outputs/[project-code]/email/`
