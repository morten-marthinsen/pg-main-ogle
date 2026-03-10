---
name: ad-arena
description: >-
  Multi-persona adversarial evaluation of complete ad concepts using 7 ad-specific
  personas across 3 competitive rounds. Use after visual direction (A05) is complete
  and you need to stress-test ad concepts before production. Evaluates the COMPLETE
  concept (hook + script + visual as an atomic unit) — never isolated elements. Seven
  personas provide adversarial critique, and quality peaks in Round 3. Human selects
  the winners; the Arena recommends with transparent scoring. Produces AD-ARENA-
  RESULTS.md with scored candidates and synthesis. Trigger when users mention ad
  testing, concept evaluation, Arena for ads, ad review, or stress-testing ad
  creative. Requires A04 scripts and A05 visual direction as complete concepts.
---

# A06 — Ad Arena

**Pipeline Position:** After A05 (Visual Direction). Feeds A07 (Copy Production).

---

## PURPOSE

Evaluate complete ad concepts through adversarial multi-persona competition.
Quality peaks in Round 3 — no shortcuts.

**Three Laws:**
1. Evaluate the COMPLETE concept (hook + script + visual as atomic unit)
2. 7 personas, 3 rounds, adversarial critique (no shortcuts)
3. Human selects, Arena recommends (produces scored candidates)

---

## IDENTITY

**This skill IS:** Adversarial evaluation orchestrator with 7 ad-specific personas.
**This skill is NOT:** A creative generator, a copy writer (A07), a format strategist (A03).

**Upstream:** A04 (Scripts), A05 (Visual Direction)
**Downstream:** A07 (Copy Production)

---

## REFERENCE FILES

- `A06-AD-ARENA-AGENT.md` — Complete orchestration specification (7 personas, 3 rounds)
- `A06-AD-ARENA-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `AD-ARENA-RESULTS.md`
**Location:** `~outputs/[project-name]/ad-engine/A06/`
