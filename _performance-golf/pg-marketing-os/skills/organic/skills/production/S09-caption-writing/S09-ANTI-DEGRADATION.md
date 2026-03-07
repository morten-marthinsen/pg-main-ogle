# S09 Caption Writing — ANTI-DEGRADATION PROTOCOL v1.0

**Status:** MANDATORY READ before execution
**Last Updated:** 2026-03-05
**Propagated From:** S08-ANTI-DEGRADATION.md structural fixes

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S09 Caption Writing — ANTI-DEGRADATION PROTOCOL v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Write generic captions that work across all platforms instead of platform-specific versions. Skip Arena for short content or claim it can be bypassed. Bury the hook after the truncation point or treat character counts as approximate.
```

**Write this declaration to your first output file before executing any microskill.**

---

## EXECUTIVE SUMMARY

This protocol prevents 9 failure modes that have degraded caption quality across organic marketing campaigns. Every agent executing S09 MUST read this file before beginning work.

**Core Principle:** Captions are platform-constrained creative. They must work within character limits, truncation points, and algorithmic preferences while maintaining voice and driving engagement.

---

## STRUCTURAL FIX 1: CHECKPOINT FILES REQUIRED

**Problem:** Agents skip Arena and generate final captions directly.

**Solution:** The following checkpoint files MUST exist before downstream execution:

```yaml
Required Checkpoints:
  PRE_ARENA:
    file: "pre-arena-caption-draft.md"
    minimum_size: 1500 chars
    contains: "PRE-ARENA" label

  ARENA_COMPLETE:
    file: "arena-results.md"
    minimum_size: 3000 chars
    contains:
      - 7 persona variants
      - 3 critique rounds
      - Human selection

  SELECTED_CAPTION:
    file: "selected-caption-final.md"
    minimum_size: 800 chars
    verified_from: "arena-results.md"
```

**Enforcement:** Layer 4 CANNOT execute without all 3 checkpoints.

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

**Platform-Specific Caption Requirements:**

| Platform | Max Chars | Truncation Point | Line Break Support | Hashtag Placement |
|----------|-----------|------------------|-------------------|-------------------|
| Instagram | 2200 | 125 chars ("...more") | YES (native) | End or inline |
| TikTok | 4000 | 70 chars | LIMITED | End only |
| LinkedIn | 3000 | ~150 chars | YES (native) | End only |
| X/Twitter | 280 | N/A (full visible) | NO | Inline or end |
| YouTube | 5000 | ~100 chars | YES (native) | Description separate |

**Hook Requirements:**
- MUST deliver value/curiosity BEFORE truncation point
- Instagram: Critical message in first 125 chars
- TikTok: Hook in first 70 chars
- LinkedIn: Professional hook in first 150 chars

**Structure Minimums:**
- Hook: 15-70 chars (platform-dependent)
- Body: 100-1500 chars (platform + content_function dependent)
- CTA: 20-80 chars
- Hashtags: 3-10 per platform norms

---

## STRUCTURAL FIX 3: FAILURE MODE TABLE

| Failure Mode | Detection Signal | Response Protocol | Escalation Threshold |
|--------------|------------------|-------------------|---------------------|
| Generic Caption | No platform-specific formatting, same caption for all platforms | REJECT. Rewrite per platform specs. | 2nd occurrence → human review |
| Truncation Failure | Key message after "...more" point | REJECT. Rewrite with front-loaded value. | 1st occurrence (critical) |
| Voice Drift | BVF mismatch detected in voice check | REGENERATE with persona specimens loaded. | BVF score <7.0 |
| Missing CTA | No action prompt in caption | ADD CTA matched to content_function. | 1st occurrence |
| Hashtag Spam | >15 hashtags or all trending/no branded | REDUCE to platform norms, balance branded/niche. | 2nd occurrence |
| Wall of Text | No line breaks, >500 chars unbroken | REFORMAT with line breaks every 1-2 sentences. | 1st occurrence |
| Weak Hook | First line doesn't stop scroll or create curiosity | REGENERATE hook using HLF framework. | Hook score <7.0 |

---

## STRUCTURAL FIX 4: FORBIDDEN RATIONALIZATIONS

**NEVER say:**
1. "The caption works across all platforms" → Each platform has unique constraints
2. "We can add line breaks later" → Formatting IS part of caption strategy
3. "Hashtags are optional" → Platform algorithms depend on them
4. "The hook is good enough" → Hook determines whether anyone reads past truncation
5. "Voice doesn't matter for captions" → BVF alignment is mandatory
6. "Arena can be skipped for short content" → Arena is ALWAYS mandatory for generative layers
7. "CTA can be implied" → Explicit CTA matched to content_function required
8. "Character count is approximate" → Hard platform limits MUST be respected
9. "Emoji placement is aesthetic" → Emojis signal tone and improve readability

---

## STRUCTURAL FIX 5: BINARY GATE ENFORCEMENT

**Gates are PASS or FAIL. No conditional, partial, or provisional passes.**

### GATE 0.1: Input Validation
- **Pass Criteria:** CBF exists, platform specified, content_type defined, caption_brief schema complete
- **Fail Response:** HALT. Request missing inputs from human.

### GATE 1.5: Strategy Complete
- **Pass Criteria:** All Layer 1 output files exist (platform analysis, structure strategy, hook strategy, CTA strategy, hashtag strategy)
- **Fail Response:** REGENERATE missing strategy files.

### GATE 2.4: Pre-Arena Draft Ready
- **Pass Criteria:** pre-arena-caption-draft.md exists, labeled PRE-ARENA, meets minimum size, passes platform char limits
- **Fail Response:** REWRITE. Cannot proceed to Arena.

### GATE 2.5: Arena Complete
- **Pass Criteria:** arena-results.md exists, 7 personas generated variants, 3 critique rounds complete, human made selection
- **Fail Response:** RESTART Arena. No synthesis without critique.

### GATE 4.0: Final Validation
- **Pass Criteria:** Selected caption verified from Arena, platform formatted, CTA present, BVF score ≥7.0, character limit respected
- **Fail Response:** REJECT handoff. Fix issues and re-gate.

---

## STRUCTURAL FIX 6: MANDATORY READ ENFORCEMENT

**Before ANY execution, agent MUST:**

1. Read `S09-AGENT.md` (Layer Map, Model Assignment Table, Execution Flow)
2. Read `S09-ANTI-DEGRADATION.md` (this file)
3. Read `CAPTION-BRIEF-SCHEMA.md` (input schema validation)
4. Load `ORGANIC-ARENA-PROTOCOL.md` (7 organic personas, 3-round critique)
5. Read individual microskill specs for current layer

**Violation Detection:** If agent proceeds without reading required files, output will fail validation. No exceptions.

---

## STRUCTURAL FIX 7: PER-MICROSKILL OUTPUT

**Every microskill MUST produce its own dedicated output file.**

### Layer 0 Outputs (4 files):
- `0.1-validation-result.json`
- `0.2-teaching-references.md`
- `0.3-specimen-references.md`
- `0.4-cbf-extraction.yaml`

### Layer 1 Outputs (5 files):
- `1.1-platform-caption-analysis.md`
- `1.2-caption-structure-strategy.md`
- `1.3-hook-strategy.md`
- `1.4-cta-strategy.md`
- `1.5-hashtag-strategy.md`

### Layer 2 Outputs (4 files):
- `2.1-hook-draft.md`
- `2.2-body-draft.md` (labeled PRE-ARENA)
- `2.3-cta-integration.md`
- `2.4-platform-formatted-caption.md`

### Layer 2.5 Outputs (3 files):
- `2.5.1-arena-submission.md`
- `2.5.2-adversarial-critique.md`
- `2.5.3-synthesis-hybrids.md`

**Synthesis Trap Prevention:** Agents CANNOT read only AGENT.md and synthesize. Each microskill spec defines unique execution requirements.

---

## STRUCTURAL FIX 8: PROJECT INFRASTRUCTURE

**Every S09 execution MUST occur within a project context with:**

```
project-directory/
├── PROJECT-STATE.md          # Current execution state, active layer
├── PROGRESS-LOG.md           # Session-by-session progress
├── caption-brief.yaml        # Input from S08 or standalone
├── checkpoints/              # PRE_ARENA, ARENA_COMPLETE
├── outputs/                  # Per-microskill outputs
└── final-caption.md          # Selected + formatted caption
```

**If project structure doesn't exist:** Agent creates it before Layer 0.

---

## STRUCTURAL FIX 9: STALE ARTIFACT CLEANUP

**Problem:** Old caption drafts, pre-Arena variants, or failed generations persist and contaminate downstream execution.

**Solution:** Before Layer 4 packaging, agent MUST:
1. Verify Arena selection is THE source for final caption
2. Archive or delete pre-Arena drafts (retain for learning, not execution)
3. Confirm character counts against platform limits
4. Validate BVF alignment of FINAL caption (not draft)

**File Naming Convention:**
- Drafts: `*-draft.md` or `PRE-ARENA-*`
- Arena: `arena-*`
- Final: `final-caption.md` or `selected-caption-final.md`

---

## ARENA REQUIREMENTS

**S09 uses the 7 Organic Persona Panel:**

1. **Volume Machine** — Maximize output, daily consistency
2. **Value Architect** — Dense, actionable, screenshot-worthy
3. **Virality Engineer** — Emotional contagion, shareability
4. **Community Builder** — Conversation starters, engagement loops
5. **Brand Purist** — Voice consistency, brand reinforcement
6. **Algorithm Hacker** — Platform optimization, reach maximization
7. **Storyteller** — Narrative arcs, character-driven hooks

**Arena Protocol:**
- Each persona generates their own caption variant
- 3 rounds of adversarial critique
- Scoring on: hook strength (30%), voice alignment (25%), platform fit (25%), engagement potential (20%)
- Generate 3+ hybrid variants pulling strongest elements
- Human selects final caption

---

## VOICE CHECK REQUIREMENTS

**BVF Alignment Mandatory:**

Every caption MUST be checked against Brand Voice File (loaded in Layer 0.4 via CBF):

```yaml
Voice Check:
  voice_attributes:
    - Check caption against BVF voice descriptor
    - Score 1-10 on tonal match

  anti_voice:
    - Scan for forbidden phrases/tones
    - Reject if ANY anti-voice detected

  persona_specimens:
    - Load persona-specific caption specimens
    - Compare pacing, word choice, punctuation

  threshold:
    - Minimum 7.0/10 BVF alignment
    - <7.0 → REGENERATE with persona voice loading
```

---

## PLATFORM-SPECIFIC ENFORCEMENT

### Instagram:
- Hook in first 125 chars (before "...more")
- Line breaks every 1-2 sentences
- Emoji usage: moderate (2-5 per caption)
- Hashtags: 5-10, mix of branded/niche/trending
- CTA: Natural, conversational

### TikTok:
- Hook in first 70 chars (truncation)
- Short, punchy lines
- Emoji usage: high (5-10)
- Hashtags: 3-5, trending + branded
- CTA: Urgent, action-oriented

### LinkedIn:
- Professional hook in first 150 chars
- Longer-form acceptable (1000-2000 chars)
- Emoji usage: minimal (0-2)
- Hashtags: 3-5, professional/industry
- CTA: Value-driven, thought leadership

### X/Twitter:
- Entire message in 280 chars
- No truncation, optimize for retweets
- Emoji usage: strategic (1-3)
- Hashtags: 1-3 max
- CTA: Concise, thread prompt

---

## COMMON CAPTION FAILURES

1. **Generic Multi-Platform Caption:** Same caption used for Instagram, TikTok, LinkedIn → Each platform needs custom formatting
2. **Buried Hook:** Key message at end of caption → Front-load value before truncation
3. **No Line Breaks:** Wall of text in 500+ char caption → Break every 1-2 sentences
4. **Hashtag Spam:** 20+ hashtags or all #trending → Platform-appropriate count, mix types
5. **Weak CTA:** "Let me know what you think" → Match CTA intensity to content_function (Soft/Medium/Hard)
6. **Voice Drift:** Formal tone for casual brand → Load BVF and persona specimens
7. **Character Limit Violation:** 2500-char Instagram caption → Hard limit 2200, respect platform

---

## ANTI-DEGRADATION CHECKLIST

Before marking S09 complete, verify:

- [ ] All 3 checkpoint files exist (PRE-ARENA, ARENA_COMPLETE, SELECTED)
- [ ] Arena had 7 personas, 3 critique rounds, human selection
- [ ] Selected caption meets platform character limits
- [ ] Hook delivers value BEFORE truncation point
- [ ] Line breaks applied (where platform supports)
- [ ] CTA matches content_function intensity
- [ ] Hashtags appropriate for platform (count + type)
- [ ] BVF alignment score ≥7.0
- [ ] All 16 microskill output files exist
- [ ] Stale drafts archived/removed from final handoff

---

## VERSION HISTORY

- **v1.0** (2026-03-05): Initial build. Propagated 9 structural fixes from S08. Added platform-specific enforcement table, Arena requirements, voice check protocol.

---

**END ANTI-DEGRADATION PROTOCOL**
