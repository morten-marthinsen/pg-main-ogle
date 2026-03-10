---
name: advertorial-cta-bridge-writer
description: >-
  Write the transition from editorial content to offer — the "bridge"
  that connects the advertorial to the sales page. The bridge must feel
  like a recommendation, not a pitch. Uses first-person discovery language
  ("I found this..." not "Buy now"). This is the conversion point of the
  advertorial. Arena mode: generative_full_draft (short). Trigger when
  users mention advertorial CTA, advertorial bridge, or the transition
  from content to offer. Requires ADV-00 (Strategy) and ADV-02 (Body).
---

# ADV-03 — CTA & Bridge Writer

**Pipeline Position:** Fourth skill in Advertorial Engine pipeline. Executes after ADV-02 (Body Copy). Feeds ADV-04 (Assembly).

---

## PURPOSE

Write the transition from editorial content to offer — the "bridge" to the sales page or landing page. This is the conversion point. The bridge must feel like a natural recommendation earned by the editorial content, not a sudden CTA. The reader should feel they discovered the product, not that they were sold it.

**Success Criteria:**
- Bridge uses recommendation framing, not CTA framing
- Transition feels earned by the body content
- Exactly ONE link/CTA (multiple CTAs break the editorial illusion)
- CTA is a text link, not a button (editorial articles link out)
- Language matches bridge frame type from ADV-00 strategy (personal discovery, recommendation, expert endorsement, community consensus)
- No "Buy Now," "Order Now," or "Click Here" language

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + strategy parsing + body review | TBD (v2) |
| 1 | Bridge drafting (frame-specific: discovery/recommendation/expert/community) | TBD (v2) |
| 3 | Arena: generative_full_draft — short (bridge candidates compete) | TBD (v2) |
| 4 | Selection + output packaging | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `ADV-03-AGENT.md` — Complete orchestration specification (planned)
- `ADV-03-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `09-advertorials/ADVERTORIAL-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `advertorial-bridge-draft.md`
**Location:** `~outputs/[project-code]/advertorial/advertorial-copy/`
