---
name: ad-visual-video-production
description: >-
  Production asset generation and quality control for paid ad creative using external
  tools (Gemini Nano Banana 2, Veo 3.1, Imagen 4, ElevenLabs for voice/music/SFX).
  Use after copy production (A07) is complete and you need to generate the actual
  visual and audio assets. Executes visual briefs from A05 using tool-agnostic
  orchestration — tools are swappable but production quality is binary (production-
  ready or rejected). Produces the AD-ASSETS directory with all generated media
  files. Trigger when users mention ad production, generating ad visuals, video
  production, creating ad assets, or producing ad creative. Requires A05 visual
  briefs and A07 final copy.
---

# A08 — Visual/Video Production

**Pipeline Position:** After A07 (Copy Production). Feeds A09 (Assembly).

---

## PURPOSE

Execute visual briefs using external production tools. Production serves the
concept — execute upstream decisions, do not reinterpret.

**Three Laws:**
1. Production serves the concept (execute, do not reinterpret)
2. Tool orchestration, not tool dependence (tools are swappable)
3. Asset quality is binary: production-ready or rejected

---

## IDENTITY

**This skill IS:** Tool-agnostic production orchestrator coordinating asset generation.
**This skill is NOT:** A creative director (A05), a copy writer (A07), a concept evaluator (A06).

**Upstream:** A05 (Visual Direction), A07 (Copy)
**Downstream:** A09 (Assembly & Variant Matrix)

---

## REFERENCE FILES

- `A08-VISUAL-VIDEO-PRODUCTION-AGENT.md` — Complete orchestration specification
- `A08-VISUAL-VIDEO-PRODUCTION-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `AD-ASSETS/` (directory of production-ready media files)
**Location:** `outputs/[project-name]/ad-engine/A08/`
