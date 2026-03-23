---
name: brief-page-type-classifier
description: >-
  Ingest all available inputs — product brief, CopywritingEngine packages, or both —
  and produce a complete, structured page brief that every downstream Landing Page
  Engine skill consumes. Makes two critical decisions: (1) Page Type Classification
  (Type A/B/Hybrid) based on 7 signals; (2) Operating Mode declaration (Downstream
  vs. Standalone). Trigger when starting any landing page project or when a new
  product needs page type determination. This is the entry point for the entire
  Landing Page Engine.
skill_type: technique
persuasion_profile: commitment + moderate authority
---

# LP-00 — Brief & Page Type Classifier

**Pipeline Position:** Entry point. None → this skill → ALL downstream LP and PDP skills.

---

## PURPOSE

Ingest product brief and/or CopywritingEngine packages and produce a structured page brief with page type classification. The page type decision (Type A / Type B / Hybrid) governs every downstream architecture and writing decision.

**Success Criteria:**
- Page type classified via 7-signal checklist with documented reasoning
- Operating mode declared (Downstream or Standalone)
- All available upstream packages extracted and structured
- page-brief.json produced with complete field population
- PDP routing triggered if Type B or Hybrid detected

---

## REFERENCE FILES

- `LP-00-AGENT.md` — Complete orchestration specification
- `LP-00-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/LANDING-PAGE-ENGINE.md` — Engine-level constraints and 7 Laws
- `04-page-builder/PDP-ENGINE.md` — PDP routing (loaded when Type B/Hybrid detected)

---

## OUTPUT

**Primary:** `page-brief.json` + `PAGE-BRIEF-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/LP-00-brief-classifier/`
