---
name: ad-launch-package
description: >-
  Platform-compliant packaging and delivery preparation for ad campaign launch.
  Use after pre-launch scoring (A10) is complete and you need to package everything
  for the media buyer to go live. Launch-ready means COMPLETE — the media buyer can
  launch without asking a single question. Includes correct platform specs, file
  naming conventions, folder structure, campaign structure recommendations, and
  budget allocation suggestions. Trigger when users mention launch package, ad
  delivery, campaign packaging, preparing ads for launch, media buyer handoff,
  or getting ads ready to go live. Requires A10 scoring report and all upstream
  production assets.
---

# A11 — Launch Package

**Pipeline Position:** After A10 (Pre-Launch Scoring). Feeds A12 (Performance Learning) post-launch.

---

## PURPOSE

Package all assets with correct specs, naming, and folder structure so the
media buyer can go live without questions.

**Three Laws:**
1. Launch-ready means COMPLETE (no questions from media buyer)
2. Platform specs are non-negotiable (exact technical requirements)
3. The package serves the media buyer (organized for launch workflow)

---

## IDENTITY

**This skill IS:** Media buyer-focused packager ensuring complete deliverables.
**This skill is NOT:** A scorer (A10), a production tool (A08), a performance analyst (A12).

**Upstream:** A10 (Scoring), all production assets
**Downstream:** A12 (Performance Learning Loop) — after launch data arrives

---

## REFERENCE FILES

- `A11-LAUNCH-PACKAGE-AGENT.md` — Complete orchestration specification
- `A11-LAUNCH-PACKAGE-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `LAUNCH-PACKAGE/` (complete platform-ready directory)
**Location:** `~outputs/[project-name]/ad-engine/A11/`
