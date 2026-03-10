---
name: advertorial-hook-lead-writer
description: >-
  Write the opening hook and lead for an advertorial — the most critical
  section that determines whether the reader stays or bounces. 80% of
  advertorial success depends on the first 3 sentences. Uses curiosity
  gap, pattern interrupt, story open, or listicle hook formulas based on
  the advertorial type selected by ADV-00. Arena mode: generative_full_draft.
  Trigger when users mention advertorial hooks, advertorial openings, or
  native ad lead copy. Requires ADV-00 (Advertorial Strategy).
---

# ADV-01 — Hook & Lead Writer

**Pipeline Position:** Second skill in Advertorial Engine pipeline. Executes after ADV-00 (Strategist). Feeds ADV-04 (Assembly).

---

## PURPOSE

Write the opening hook and lead for the advertorial. This is the most critical section — 80% of advertorial success is determined by the first 3 sentences. The hook must stop the scroll and the lead must establish editorial voice so the reader believes they're reading content, not an ad.

**Success Criteria:**
- Hook passes the "scroll-stop test" — would this stop a thumb on a feed?
- Lead establishes editorial voice by paragraph 2
- No benefit language or promotional tone in the hook/lead
- Hook formula matches the advertorial type from ADV-00 strategy
- Platform-appropriate (Taboola hooks differ from Meta hooks)

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + strategy parsing + specimen review | TBD (v2) |
| 1 | Hook generation (multiple candidates per formula type) | TBD (v2) |
| 2 | Lead writing + editorial voice establishment | TBD (v2) |
| 3 | Arena: generative_full_draft (hook + lead candidates compete) | TBD (v2) |
| 4 | Selection + output packaging | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `ADV-01-AGENT.md` — Complete orchestration specification (planned)
- `ADV-01-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `09-advertorials/ADVERTORIAL-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `advertorial-lead-draft.md`
**Location:** `~outputs/[project-code]/advertorial/advertorial-copy/`
