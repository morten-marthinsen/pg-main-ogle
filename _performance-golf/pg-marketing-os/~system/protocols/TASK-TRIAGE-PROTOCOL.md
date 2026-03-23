# TASK TRIAGE PROTOCOL — Effort Tier Router

**Version:** 1.0
**Created:** 2026-03-07
**Authority:** STRUCTURAL — tier selection constrains exploration depth but NEVER quality thresholds
**Scope:** All engines (Foundation, Long-Form, Ads, Email, Organic, Upsell)

---

## TABLE OF CONTENTS

- [Purpose](#purpose)
- [The Three Tiers](#the-three-tiers)
- [Key Principle: Exploration vs Quality](#key-principle-exploration-vs-quality)
- [Tier Declaration](#tier-declaration)
- [Tier Change Rules](#tier-change-rules)
- [Cost Boundary Awareness](#cost-boundary-awareness)
- [Hook Integration](#hook-integration)

---

## Purpose

Not every project requires the full 7-competitor, 2-round + audience evaluation Arena with comprehensive verification across 6 sessions. The Task Triage Protocol defines three effort tiers that constrain **exploration depth** while maintaining **identical quality thresholds**.

---

## The Three Tiers

### Full Tier

**When:** Flagship campaigns, high-stakes launches, projects where quality must be 95th+ percentile.

| Dimension | Specification |
|-----------|--------------|
| **Model** | Opus 4.6 (up to 1M via extended sessions) |
| **Arena** | 2 rounds + audience evaluation, 7 competitors, adversarial Critic, Synthesizer |
| **Verification** | All layers (0-4): Foundation, midpoint, final, per-microskill outputs |
| **Context Budget** | Premium pricing acceptable — full context loading |
| **Sessions** | 6-7 (standard architecture) |
| **Human Checkpoints** | All documented checkpoints active |
| **Recitation** | Midpoint + 75% active recitation |

### Standard Tier (DEFAULT)

**When:** Regular client work, routine campaigns, most projects. **This is the default if no tier is declared.**

| Dimension | Specification |
|-----------|--------------|
| **Model** | Opus 4.6 (200K subscription boundary respected) |
| **Arena** | 1 round, 3 competitors, Critic review |
| **Verification** | Foundation + midpoint verification, Layer 0 + Layer 3 gates |
| **Context Budget** | Subscription pricing preferred — stay under 200K when possible |
| **Sessions** | 4-5 (combined foundation sessions) |
| **Human Checkpoints** | Research, root cause/mechanism, brief, final draft |
| **Recitation** | Midpoint only |

### Quick Tier

**When:** Internal drafts, explorations, proof-of-concept, content where speed matters more than polish.

| Dimension | Specification |
|-----------|--------------|
| **Model** | Opus or Sonnet (whichever fits the task) |
| **Arena** | No Arena — direct generation with best-effort quality |
| **Verification** | Layer 1 only — basic structural checks |
| **Context Budget** | Minimize — subscription pricing, single session when possible |
| **Sessions** | 2-3 (compressed foundation, direct generation) |
| **Human Checkpoints** | Brief review, final draft only |
| **Recitation** | None |

---

## Key Principle: Exploration vs Quality

**Tiers constrain EXPLORATION depth, NOT quality thresholds.**

This means:
- Minimum scores are **identical** across all three tiers (truth >= 6.0, mechanism_clarity >= 7.0, etc.)
- Quick tier does NOT mean "accept lower quality output"
- Standard tier does NOT mean "cut corners on scoring"
- The difference is HOW MUCH the system explores to find quality, not WHERE THE BAR IS SET

```
WRONG: "Quick tier → accept 5.0 truth score"
RIGHT: "Quick tier → generate fewer candidates, but winner must still score >= 6.0"

WRONG: "Standard tier → skip Arena scoring"
RIGHT: "Standard tier → run 1 round with 3 competitors, apply same scoring criteria"
```

---

## Tier Declaration

### How to Set the Tier

The human declares the tier at session start:

```
"Tier: Full"
"Tier: Standard"
"Tier: Quick"
```

### Default Behavior

If no tier is declared, the system defaults to **Standard**.

### Where the Tier Propagates

Once declared, the tier affects:
1. Arena configuration (rounds, competitor count)
2. Verification scope (which layers get full checks)
3. Session architecture (how many sessions, what's combined)
4. Context budget (premium vs subscription pricing)
5. Recitation frequency (see ACTIVE-RECITATION-PROTOCOL.md)
6. Hook validator thresholds (arena round counts adjusted per tier)

---

## Tier Change Rules

### Escalation (↑) — Always Allowed

You can escalate from Quick → Standard → Full at any point during a project. When escalating:
- Apply the higher tier's configuration from the current skill forward
- Previous outputs remain valid (they met quality thresholds)
- Re-running previous skills at higher tier is optional

### De-escalation (↓) — Only Before Arena

You can de-escalate from Full → Standard → Quick ONLY before the Arena phase begins. Once Arena is running:
- Cannot reduce competitor count mid-Arena
- Cannot skip remaining rounds
- Cannot downgrade verification

**Rationale:** Arena is the quality-critical phase. De-escalating during Arena would compromise output quality.

---

## Cost Boundary Awareness

| Tier | Expected Cost Profile | Context Target |
|------|----------------------|----------------|
| **Full** | Premium pricing likely — budget ~$50-100 per campaign | Up to 1M tokens across sessions |
| **Standard** | Subscription pricing preferred — budget ~$10-30 | Under 200K per session |
| **Quick** | Minimal — budget ~$2-10 | Under 100K total |

These are estimates, not hard limits. The token estimator hook tracks actual usage and provides zone warnings regardless of tier.

---

## Hook Integration

The automated validation hooks adjust their behavior based on the declared tier:

| Validator | Full | Standard | Quick |
|-----------|------|----------|-------|
| Gate validator | All gates enforced | All gates enforced | Layer 1 gates only |
| Checkpoint validator | 2 Arena rounds + audience evaluation expected | 1+ Arena round expected | No Arena expected |
| Output validator | Full completeness check | Full completeness check | Basic presence check |
| Schema validator | Full schema compliance | Full schema compliance | Required fields only |
| Proportionality check | Active | Active | Disabled |
| Token estimator | All zones active | All zones active | GREEN/YELLOW only |

**Note:** The hook system reads the tier from `PROJECT-STATE.md` in the active output directory. If no tier is found, Standard is assumed.
