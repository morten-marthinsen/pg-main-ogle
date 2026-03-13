---
name: advertorial-assembly
description: >-
  Assemble the full advertorial from hook/lead (ADV-01), body (ADV-02),
  and bridge (ADV-03). Performs cross-section validation, editorial
  consistency check, and platform compliance audit. No Arena — this is
  an assembly and validation skill, not a generative skill. Trigger when
  users mention assembling the advertorial, advertorial compilation, or
  advertorial compliance check. Requires ADV-01, ADV-02, and ADV-03
  outputs.
---

# ADV-04 — Advertorial Assembly

**Pipeline Position:** Fifth skill in Advertorial Engine pipeline. Executes after ADV-01 (Hook & Lead), ADV-02 (Body Copy), and ADV-03 (Bridge). Feeds ADV-05 (Editorial).

---

## PURPOSE

Assemble the complete advertorial from its three component sections. Validate cross-section consistency (voice, tone, narrative thread), verify the editorial-to-bridge transition feels natural, and run a platform compliance check against the requirements defined in ADV-00.

**This skill does NOT generate new copy.** It assembles, validates, and flags issues for revision.

**Success Criteria:**
- Full advertorial assembled in correct sequence (hook → lead → body → bridge)
- Voice and tone consistent across all sections
- Narrative thread unbroken from hook through bridge
- No proof-block patterns (3+ proof elements in sequence without narrative)
- Platform compliance check passed (no flagged claims or violations)
- Traffic destination link correctly placed in bridge section

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + all section drafts | TBD (v2) |
| 1 | Assembly + cross-section validation | TBD (v2) |
| 2 | Compliance check + editorial consistency | TBD (v2) |
| 4 | Output packaging + issue flagging | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `ADV-04-AGENT.md` — Complete orchestration specification (planned)
- `ADV-04-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `09-advertorials/ADVERTORIAL-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `advertorial-assembled.md`
**Location:** `~outputs/[project-code]/advertorial/`
