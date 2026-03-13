# Editorial Skill — Arena Layer (Layer 2.5)

**Version:** 2.1
**Date:** 2026-02-05
**Parent Skill:** 20-editorial
**Position:** After Layer 2 (Multi-Expert Critique), Before Layer 3 (5-Tier Evaluation)
**Gate:** GATE_2.5 — BLOCKING (requires human revision selection)

> **Arena Mode:** `editorial_revision` — Competitors generate REVISIONS of existing copy per critique issues. Per-issue competition. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 3-round execution protocol.

---

## PURPOSE

Generate multiple REVISION CANDIDATES for high-priority issues through 7 competitors (6 legendary copywriter personas + The Architect). While Layer 2 generates critique, Layer 2.5 generates competing FIXES. Each competitor offers their distinct approach to solving the identified issues, allowing human selection of the optimal revision strategy.

**Key Distinction from Layer 2:**
- Layer 2 (Multi-Expert Critique) = IDENTIFYING what's wrong
- Layer 2.5 (Arena Revision) = GENERATING competing fixes
- Layer 3 (5-Tier Evaluation) = VALIDATING selected approach

**Why Arena Revision Matters:** A single automated fix path often produces generic improvements. By generating 7 competing revision approaches, the Arena ensures the editorial direction matches human creative intent.

---

## TRIGGER CONDITIONS

Arena Layer 2.5 activates when:

1. **Priority 1 Issues Identified** — Any P1 critique from Layer 2 triggers Arena revision
2. **Multiple Valid Fixes Exist** — Issue has >1 legitimate solution approach
3. **Major Element Adjacent** — Fix touches root cause, mechanism, promise, or anchor phrase
4. **Voice Conflict Potential** — Different personas would approach revision differently

If ALL issues are P3+ (minor) and have clear single fixes, Arena may be bypassed with human confirmation.

---

## PERSONA PANEL (7 COMPETITORS)

Each competitor generates revision candidates based on their editorial philosophy:

| Persona | Editorial Lens | Revision Style |
|---------|---------------|----------------|
| **Makepeace** | Flow & Architecture | Restructure for momentum — if it slows, cut or resequence; if it stalls, add bridge |
| **Halbert** | Entertainment & Personality | Inject life — boring passages get story, drama, or personality injection |
| **Schwartz** | Sophistication Calibration | Pitch adjustment — recalibrate claims, proof depth, and language to awareness level |
| **Ogilvy** | Credibility & Clarity | Precision surgery — replace vague with specific, cut fluff, add proof density |
| **Clemens** | Scientific Clarity | Simplification — complex ideas into 12-year-old language, binary reframes, mechanism clarity |
| **Bencivenga** | Proof-First Authority | Evidence upgrade — strengthen proof, add institutional backing, increase believability |

---

## 7 JUDGING CRITERIA

All revision candidates scored against these criteria:

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| **Issue Resolution Impact** | 20% | Does this revision actually fix the identified problem? Not adjacent improvements — the ACTUAL issue — CRITICAL |
| **Voice Preservation** | 20% | Does it maintain the established voice, tone, and personality? Voice breaks destroy credibility |
| **Flow Enhancement** | 15% | Does it improve or at minimum maintain momentum and transitions? No flow regression allowed |
| **Clarity Improvement** | 15% | Does it make the passage clearer without oversimplifying or dumbing down? |
| **Slop Elimination** | 10% | Does it remove AI telltales, corporate filler, and weak language? |
| **Brevity** | 10% | Does it say the same or more with fewer words? Compression without loss |
| **Threading Preservation** | 10% | Does it maintain mechanism name, root cause anchor, framework references, callbacks? |

### Critique-Specific Guidance

**What The Critic should particularly target in Editorial Arena:**
- Revisions that break established voice/tone (voice preservation is critical)
- Threading elements lost during revision (mechanism name, root cause anchor, framework references)
- Revisions that introduce AI slop words (the very thing editorial should eliminate)
- "Fixes" that create new problems (flow regression, clarity loss)
- Revisions that change APPROVAL-REQUIRED elements without flagging them

---

## SCORING RUBRICS

### Issue Resolution Impact (20%) — CRITICAL

| Score | Definition |
|-------|------------|
| 9-10 | Completely resolves the issue with elegant solution that improves surrounding copy |
| 7-8 | Fully resolves the issue without side effects |
| 5-6 | Partially resolves issue or creates minor new concerns |
| 3-4 | Addresses symptoms but not root cause of the issue |
| 1-2 | Fails to resolve or makes the issue worse |

### Voice Preservation (20%)

| Score | Definition |
|-------|------------|
| 9-10 | Seamless — cannot tell where original ends and revision begins |
| 7-8 | Natural fit — slight polishing detectable but appropriate |
| 5-6 | Noticeable shift — competent but voice drift present |
| 3-4 | Voice break — clearly different writer feel |
| 1-2 | Complete mismatch — destroys established voice |

### Flow Enhancement (15%)

| Score | Definition |
|-------|------------|
| 9-10 | Actively improves momentum — reader pulled forward faster |
| 7-8 | Maintains or slightly improves existing flow |
| 5-6 | Neutral — no degradation but no improvement |
| 3-4 | Flow disruption — creates reading friction |
| 1-2 | Flow destruction — reader stops or must re-read |

### Clarity Improvement (15%)

| Score | Definition |
|-------|------------|
| 9-10 | Crystal clear while maintaining depth and sophistication |
| 7-8 | Clearer than original without dumbing down |
| 5-6 | Same clarity level — lateral move |
| 3-4 | Oversimplifies or confuses differently |
| 1-2 | More confusing than original |

### Slop Elimination (10%)

| Score | Definition |
|-------|------------|
| 9-10 | Zero slop — every word earns its place, no AI telltales |
| 7-8 | Minimal slop — 1-2 weak phrases maximum |
| 5-6 | Some slop present — 3-5 weak phrases |
| 3-4 | Slop-heavy — multiple AI telltales and filler |
| 1-2 | Worse than original — introduces new slop |

### Brevity (10%)

| Score | Definition |
|-------|------------|
| 9-10 | Significant compression (>20% fewer words) with same or more impact |
| 7-8 | Good compression (10-20% reduction) without loss |
| 5-6 | Similar length — no compression achieved |
| 3-4 | Longer than original without proportional value |
| 1-2 | Bloated — significantly longer with less impact |

### Threading Preservation (10%)

| Score | Definition |
|-------|------------|
| 9-10 | All threading maintained + opportunities for new callbacks identified |
| 7-8 | All existing threading preserved |
| 5-6 | Most threading preserved — minor terminology drift |
| 3-4 | Threading damage — key terms changed or callbacks lost |
| 1-2 | Threading destroyed — mechanism name changed, anchors lost |

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 3-round execution protocol.**

> **Effort Level:** All revision generation phases use `effort: max`. Critique uses `effort: high`. See ~system/SYSTEM-CORE.md Effort Protocol.
> **Agent Team Mode:** When Agent Teams enabled, each persona runs as a separate teammate agent generating revisions in its own 200K context. See `~system/protocols/ARENA-CORE-PROTOCOL.md` v2.0 Agent Team Execution Mode.

This skill uses `arena_mode: editorial_revision`:
- **Competitors generate REVISIONS** of existing copy (per critique issues from Layer 2)
- Per-issue competition — each issue gets its own Arena
- **7 competitors** (6 personas + The Architect) generating revision candidates
- **Adversarial critique** before scoring (The Critic identifies ONE weakest element per revision)
- **Targeted revision** (each competitor refines their fix)
- **Human selection** from 9-10 candidates per issue (7 pure + 2-3 hybrids)

### Priority-Based Round Rules
- **P1 issues (critical):** MANDATORY 3 rounds — full Arena protocol
- **P2 issues (important):** MANDATORY 3 rounds — full Arena protocol
- **P3+ issues (minor):** CAN bypass with human confirmation
  - Human asked: "P3 issues detected. Run 3-round arena or apply quick fixes?"
  - If human confirms bypass: apply fixes without full arena
  - If human requests arena: run full 3 rounds

### Issue Processing Flow
```
FOR EACH issue from Layer 2 critique:
  1. Classify priority (P1/P2/P3+)
  2. IF P3+ AND human confirms bypass → apply quick fix
  3. ELSE → run full 3-round Arena per ~system/protocols/ARENA-CORE-PROTOCOL.md
     - 7 competitors generate revision candidates
     - Critique-revise cycle each round
     - Learning briefs between rounds
     - Post-arena synthesis (2-3 hybrids)
     - Human selects winning revision
```

### What Stays Skill-Specific (Below)
- 7 judging criteria with weights (used by both The Critic and the Judge)
- Persona generation instructions for this skill
- Critique-specific guidance for this skill
- Critique-to-revision mapping
- Issue type to revision approach
- Quality thresholds
- Anti-slop enforcement
- Output schema

---

## GATE_2.5 REQUIREMENTS

**BLOCKING GATE** — Cannot proceed to Layer 3 until:

- [ ] All P1 issues have Arena revision candidates generated
- [ ] All P2 issues with multiple fix paths have candidates generated
- [ ] All candidates scored against 7 criteria
- [ ] Top 5 ranked with rationale for each prioritized issue
- [ ] Human selection received for each issue OR bypass confirmed for minor issues
- [ ] Any APPROVAL-REQUIRED changes explicitly approved before inclusion

**Bypass Conditions:**
- ALL critique items are P3+ (minor)
- ALL fixes have single obvious solution
- Human confirms bypass

---

## ANTI-SLOP ENFORCEMENT

### Revision Poison Words (NEVER introduce in revisions)

**AI Telltales:** revolutionary, game-changing, unlock, harness, leverage, dive deep, journey, empower, transform, breakthrough

**Corporate Filler:** comprehensive, robust, innovative, state-of-the-art, synergy, best-in-class, holistic, optimize, streamline

**Hedge Words:** might, could potentially, may want to, perhaps, arguably, it seems, appears to be

**Empty Intensifiers:** literally, absolutely, totally, completely, incredibly, extremely, amazingly, truly

**Copywriting Clichés:** imagine if you could, picture this, what if I told you, the truth is, here's the thing

### Revision Quality Signals (PREFER these patterns)

**Makepeace Flow Markers:** Bridge transitions, paragraph momentum, section connectivity

**Halbert Entertainment Markers:** Story injection, personality phrases, dramatic tension

**Schwartz Sophistication Markers:** Claim calibration, proof depth matching, awareness-appropriate language

**Ogilvy Credibility Markers:** Specifics over generalities, source attribution, elegant precision

**Clemens Clarity Markers:** Binary reframes, 12-year-old language, mechanism simplification

**Bencivenga Proof Markers:** Evidence stacking, institutional backing, believability enhancement

---

## INTEGRATION WITH LAYER 2 CRITIQUE

### Critique-to-Revision Mapping

| Layer 2 Lens | Layer 2.5 Lead Persona |
|--------------|------------------------|
| Makepeace Lens critique | Makepeace + Clemens revisions prioritized |
| Halbert Lens critique | Halbert + Makepeace revisions prioritized |
| Schwartz Lens critique | Schwartz + Ogilvy revisions prioritized |
| Ogilvy Lens critique | Ogilvy + Bencivenga revisions prioritized |
| Clemens Lens critique | Bencivenga + Schwartz revisions prioritized |
| Kennedy Lens critique | Clemens + Ogilvy revisions prioritized |

### Issue Type to Revision Approach

| Issue Type | Primary Persona | Secondary Persona |
|------------|-----------------|-------------------|
| Flow/transition problems | Makepeace | Clemens |
| Engagement/entertainment gaps | Halbert | Makepeace |
| Sophistication mismatch | Schwartz | Ogilvy |
| Credibility/clarity issues | Ogilvy | Bencivenga |
| Mechanism weakness | Bencivenga | Schwartz |
| Offer/urgency problems | Clemens | Ogilvy |
| Voice inconsistency | Halbert | Makepeace |
| Threading loss | Ogilvy | Makepeace |

---

## OUTPUT SCHEMA

```json
{
  "arena_layer": {
    "version": "2.0",
    "issues_processed": "[count]",
    "revisions_generated": "[count]",
    "human_selections": "[count]",
    "bypassed_issues": "[count]"
  },

  "revision_candidates": [
    {
      "issue_id": "CRIT_001",
      "issue_description": "[from Layer 2]",
      "original_text": "[quoted]",
      "section": "[lead/story/mechanism/etc.]",
      "priority": "[P1/P2]",
      "approval_required": "[true/false]",

      "revisions": {
        "makepeace": {
          "revised_text": "[text]",
          "rationale": "[why this approach]",
          "scores": {
            "issue_resolution": "[1-10]",
            "voice_preservation": "[1-10]",
            "flow_enhancement": "[1-10]",
            "clarity_improvement": "[1-10]",
            "slop_elimination": "[1-10]",
            "brevity": "[1-10]",
            "threading_preservation": "[1-10]"
          },
          "weighted_total": "[calculated]",
          "rank": "[1-7]"
        },
        "[... all 7 competitors ...]"
      },

      "top_5_ranking": [
        {
          "rank": 1,
          "persona": "[name]",
          "score": "[X.X]",
          "rationale": "[why ranked here]"
        }
      ],

      "human_selection": {
        "selected_persona": "[name]",
        "custom_direction": "[if any]",
        "timestamp": "[ISO]"
      }
    }
  ],

  "gate_2_5_status": {
    "all_p1_processed": "[true/false]",
    "all_p2_multifixed_processed": "[true/false]",
    "all_selections_received": "[true/false]",
    "approval_required_cleared": "[true/false]",
    "gate_passed": "[true/false]"
  }
}
```

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER generate revisions without Layer 2 critique** — Critique must exist before fix generation
2. **ALWAYS generate all 7 competitor revisions** — No competitor skipping allowed
3. **ALWAYS score against all 7 criteria** — Complete evaluation required
4. **ALWAYS present top 5 with rationale** — Human needs comparison context
5. **BLOCKING human selection** — Cannot proceed without selection or confirmed bypass

### Quality Constraints
6. **Minimum 8.5 weighted score for application** — Lower-scoring revisions flagged
7. **Voice preservation minimum 7.0** — Voice breaks are deal-breakers
8. **Threading preservation minimum 7.0** — Cannot sacrifice threading for other improvements
9. **Issue resolution minimum 7.0** — Revision must actually fix the problem

### Major Element Protection
10. **Root cause changes = APPROVAL-REQUIRED** — Human must explicitly approve
11. **Mechanism name changes = APPROVAL-REQUIRED** — Cannot change without approval
12. **Promise changes = APPROVAL-REQUIRED** — Core promise is protected
13. **Anchor phrase changes = APPROVAL-REQUIRED** — Memorable phrases protected

### Anti-Slop Constraints
14. **Zero AI telltales in revisions** — Any slop introduction is revision rejection
15. **No vague improvements** — Every revision must be specific and quoted
16. **No generic fixes** — "Make it better" is not a revision

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ~system/protocols/ARENA-CORE-PROTOCOL.md v2.0 and ~system/SYSTEM-CORE.md. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: editorial_revision with priority-based round rules (P1/P2 = mandatory 3 rounds, P3+ = can bypass with human confirmation). Replaced execution protocol with reference to ~system/protocols/ARENA-CORE-PROTOCOL.md (3-round mandatory competition, adversarial critique-revise, 7 competitors including The Architect, learning briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.1 | 2026-02-03 | Added SPECIMEN ALIGNMENT section with persona-to-specimen mapping, issue-type-indexed loading matrix, before/after calibration specimens, 7-step loading protocol |
| 1.0 | 2026-02-03 | Initial creation with 7 judging criteria (Issue Resolution Impact 20%, Voice Preservation 20%, Flow Enhancement 15%, Clarity Improvement 15%, Slop Elimination 10%, Brevity 10%, Threading Preservation 10%), 6-persona revision generation, critique-to-revision mapping, major element protection, BLOCKING human selection |

---

**Status:** COMPLETE — Ready for integration with EDITORIAL-AGENT.md
