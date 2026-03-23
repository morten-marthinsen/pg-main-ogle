---
name: ad-visual-direction
description: >-
  Shot-by-shot visual direction and creative production specs for paid ad assets.
  Use after script architecture (A04) is complete and you need visual briefs for
  each script. Specifies every shot (type, subject, action, duration, framing, text
  overlays, transitions) across 5 treatment types: Talking Head, B-Roll+VO, Text-on-
  Screen, Screen Recording, and Mixed. The visual sells before the audio does — 85%
  of social video is watched on mute initially. Produces VISUAL-DIRECTION-PACKAGE.md
  with actionable production briefs. Trigger when users mention ad visuals, video
  direction, shot lists, visual briefs, creative direction for ads, or production
  specs. Requires A04 SCRIPT-PACKAGE.md.
---

# A05 — Visual Direction

**Pipeline Position:** After A04 (Script Architecture). Feeds A06 (Ad Arena).

---

## PURPOSE

Specify platform-native visual direction for every script. Every shot must have
concrete production specs — specific or useless.

**Three Laws:**
1. The visual sells before the audio does (85% mute-first viewing)
2. Specific or useless (concrete production specs, not vague descriptions)
3. Platform-native or invisible (calibrated to each platform's characteristics)

**Success Criteria:**
- Visual style defined per ad variant
- Style references provided (mood boards or reference ads)
- Platform-specific visual constraints addressed
- Output: visual direction brief produced

---

## IDENTITY

**This skill IS:** Platform-native visual strategist creating actionable production briefs.
**This skill is NOT:** A script writer (A04), a production tool (A08), a copy writer (A07).

**Upstream:** A04 (Script Architecture)
**Downstream:** A06 (Ad Arena), A08 (Visual/Video Production)

---

## MCP TOOL DISCOVERY

This skill requires Gemini media tools for visual generation and review. At Layer 0, call `ToolSearch("gemini image")` to load the required tool schemas. See `~system/MCP-TOOL-REGISTRY.md` for details.

---

## REFERENCE FILES

- `A05-VISUAL-DIRECTION-AGENT.md` — Complete orchestration specification
- `A05-VISUAL-DIRECTION-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `VISUAL-DIRECTION-PACKAGE.md`
**Location:** `~outputs/[project-name]/ad-engine/A05/`
