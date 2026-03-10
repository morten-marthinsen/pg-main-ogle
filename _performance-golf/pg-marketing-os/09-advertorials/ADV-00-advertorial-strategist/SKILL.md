---
name: advertorial-strategist
description: >-
  Analyze campaign brief and select the optimal advertorial type
  (listicle/native/blog/review/PAS/sponsored/editorial), define angle,
  audience targeting, and platform compliance requirements. Use when
  planning an advertorial campaign, choosing advertorial format, or
  defining advertorial strategy. This skill does NOT write copy — it
  produces the strategic blueprint that ADV-01 through ADV-03 execute
  against. Operates in Mode A (downstream from Skills 01-09 with full
  context) or Mode B (standalone brief). Trigger when users mention
  advertorial strategy, native ad planning, or advertorial format
  selection. Requires Campaign Brief (Skill 09).
---

# ADV-00 — Advertorial Strategist

**Pipeline Position:** First skill in Advertorial Engine pipeline. Executes after Skill 09 (Campaign Brief). Optionally receives hook angles from A02 (Ad Engine). Feeds ADV-01 (Hook & Lead), ADV-02 (Body Copy), ADV-03 (Bridge).

---

## PURPOSE

Analyze the campaign brief and select the optimal advertorial type, define the editorial angle, map audience targeting, and identify platform compliance requirements. Determines how the advertorial should be structured and what editorial voice to adopt.

**This skill does NOT write copy.** It produces the strategic blueprint that ADV-01 through ADV-03 execute against.

**Success Criteria:**
- Advertorial type selected with rationale (listicle/native/blog/review/PAS/sponsored/editorial)
- Editorial angle defined (curiosity gap, pattern interrupt, story, discovery)
- Platform compliance requirements identified (Taboola, Outbrain, Meta, or other)
- Audience targeting mapped (who reads this type of content)
- Word budget set per section (hook, body, bridge)
- Traffic destination defined (sales page, landing page, e-comm page)

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + brief parsing + validation | TBD (v2) |
| 1 | Advertorial type selection + angle definition | TBD (v2) |
| 2 | Platform compliance mapping + audience targeting | TBD (v2) |
| 4 | Strategy validation + output packaging | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `ADV-00-AGENT.md` — Complete orchestration specification (planned)
- `ADV-00-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `09-advertorials/ADVERTORIAL-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `advertorial-strategy.yaml`
**Location:** `~outputs/[project-code]/advertorial/`
