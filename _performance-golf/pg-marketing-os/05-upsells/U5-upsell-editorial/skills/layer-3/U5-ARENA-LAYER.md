# U5-ARENA-LAYER.md — Upsell Editorial (U5)

> **Version:** 1.0
> **Layer Position:** 2 (within Revision Executor — triggers per P1/P2 fix group)
> **Type:** Multi-Perspective Revision + Judgment + Human Selection
> **Dependency:** Requires GATE_1 PASS (baseline scored, issues identified and clustered)
> **Output:** Revised passage(s) for each P1/P2 fix group
> **Arena Mode:** `editorial_revision` — Competitors generate REVISIONS of existing copy per identified issues. Per-issue competition. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation execution protocol.

---

## PURPOSE

Generate multiple **revision candidates** for P1/P2 issues through 7 upsell-editorial competitors. Each competitor offers their approach to fixing the identified issues while preserving congruence, post-purchase tone, and speed compliance. Human selects the optimal revision for each fix group.

**Key Distinction from U3 Arena (generative) and Skill 20 Arena (editorial):**
- U3 Arena generates COMPLETE downsell pages from scratch (generative_full_draft)
- Skill 20 Arena generates revisions for 10,000+ word promos with 6 legendary copywriter lenses
- U5 Arena generates targeted REVISIONS for specific upsell sequence issues using 7 upsell-specific editorial competitors

---

## ARENA COMPETITORS FOR EDITORIAL REVISION

### 1. The Congruence Surgeon

**Approach:** Fix the issue with MAXIMUM congruence preservation. Every revision decision is filtered through "does this maintain the mechanism thread?" First priority is always the congruence chain.

**Revision Focus:**
- Re-insert mechanism name if missing
- Restore verbatim root cause language
- Strengthen promise extension logic
- Maintain language register from FE
- Conservative approach — change as little as possible while fixing the issue

**Signature Moves:**
- Inserts mechanism name at natural points (not forced)
- Echoes FE language patterns in revision
- Strengthens the "one decision extended" feeling

**Weakness to Watch:** Can be too conservative — fixes the congruence issue but doesn't address underlying quality problems.

---

### 2. The Brevity Blade

**Approach:** Fix the issue by CUTTING. If a passage has problems, the answer is usually that it's too long, too complex, or too wordy. Cut first, then evaluate if more is needed.

**Revision Focus:**
- Cut first, add later (if ever)
- Replace 3 sentences with 1 stronger sentence
- Eliminate proof cascade by selecting the single strongest element
- Compress CAIRO/ARO sections to proportion targets
- Reading time is the ultimate judge

**Signature Moves:**
- Cuts 30-50% of problematic passage and replaces with concentrated version
- "If it takes 3 sentences to say it, it's not clear enough for 1"
- Eliminates transition padding between sections

**Weakness to Watch:** Can cut too aggressively — losing nuance, proof, or emotional warmth. Speed is important but not at the expense of persuasion.

---

### 3. The Tone Recalibrator

**Approach:** Fix the issue by adjusting TONE. If the upsell sounds like a sales page, or the downsell sounds like a guilt trip, the tone is wrong. Rewrite for post-purchase/post-decline psychology.

**Revision Focus:**
- Replace selling language with celebration/acknowledgment language
- Convert urgency to logic ("this makes sense because" not "don't miss out")
- Warm up cold passages, calm down aggressive ones
- Ensure the binary choice has zero manipulation
- Check Acknowledge sections for any hint of guilt

**Signature Moves:**
- Rewrites aggressive CTAs to clean binary choices
- Converts PAS fragments to CAIRO/ARO extensions
- Adds buyer validation language ("You've already made a great choice...")

**Weakness to Watch:** Can over-soften — making the copy so warm it loses directness. Post-purchase tone is warm AND direct, not just warm.

---

### 4. The Value Reframer

**Approach:** Fix the issue by improving value presentation. If pricing feels wrong, if anchoring is weak, if the value stack is confusing — restructure the value architecture.

**Revision Focus:**
- Strengthen price anchoring (higher anchor → lower actual → per-day breakdown)
- Clarify value stack (what they get, what it's worth, what they pay)
- Fix inverted or missing comparisons
- Ensure "descending commitment, ascending value" at every step
- Make the MATH obvious

**Signature Moves:**
- Adds comparison anchors ("less than your daily coffee")
- Restructures bonus stack for clarity
- Simplifies guarantee language
- Per-day/per-use breakdown calculations

**Weakness to Watch:** Can make copy feel transactional. Value math should support emotional momentum, not replace it.

---

### 5. The Flow Weaver

**Approach:** Fix the issue by improving TRANSITIONS. If the sequence feels disjointed, if page-to-page momentum breaks, if sections within a page feel disconnected — fix the flow.

**Revision Focus:**
- Bridge sentences between CAIRO/ARO sections
- Cross-page callbacks (upsell references bump, downsell references upsell decision)
- Momentum maintenance through the entire sequence
- Open loop → resolution threading
- "One decision flow" feeling

**Signature Moves:**
- Adds callback to previous page: "Remember when you chose [FE product]? This is the next step."
- Bridges between sections without adding word bloat
- Creates narrative momentum that carries the buyer forward

**Weakness to Watch:** Can add word count through transition language. Flow improvements must not break speed compliance.

---

### 6. The CTA Architect

**Approach:** Fix the issue by optimizing the CHOICE architecture. If CTAs are unclear, guilty, manipulative, or buried — redesign the decision point.

**Revision Focus:**
- Clean binary choice on every page
- YES option: specific product name + price
- NO option: zero guilt, zero manipulation, respectful
- CTA placement and prominence
- Decision framing (easy yes/no, not complex evaluation)

**Signature Moves:**
- Standardizes CTA format across all pages for consistency
- Removes all guilt language from NO options
- Adds product name + price to YES button text
- Simplifies decision language

**Weakness to Watch:** Can focus too narrowly on the CTA while ignoring the copy that leads to it. A perfect CTA on weak copy still converts poorly.

---

### 7. The Integrator

**Approach:** Holistic fix that addresses the root cause of the issue, not just the symptom. Looks at how the fix affects the entire sequence, not just the local passage.

**Revision Focus:**
- Root cause analysis: WHY does this issue exist?
- Systemic fix: does this fix solve the problem everywhere, or just here?
- Cross-piece impact: how does this fix affect other pages?
- Weakest link identification: what's the REAL bottleneck?
- Integration of multiple fix approaches into one coherent revision

**Signature Moves:**
- Fixes the issue AND addresses an adjacent issue in the same revision
- Considers sequence-level impact of every local change
- Draws techniques from multiple other competitors

**Weakness to Watch:** Can over-engineer fixes. Sometimes a simple cut or tone adjustment is better than a systemic redesign.

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 2-round + audience evaluation execution protocol.**

> **Effort Level:** All revision generation uses `effort: max`. Critique uses `effort: high`.

This skill uses `arena_mode: editorial_revision`:
- **Competitors generate REVISIONS of existing copy** — NOT complete rewrites
- Each P1/P2 fix group triggers a separate Arena round
- 7 competitors generating revision candidates per fix group
- Adversarial critique targets: congruence preservation, tone preservation, speed preservation, CTA clarity
- 2 rounds with audience evaluation + analytical briefs
- Human selects winning revision per fix group

### Input Requirements

Each competitor receives:
- The specific passage(s) to revise
- The identified issue(s) in that fix group (severity, lens, specific problem)
- The full assembled sequence (for context)
- Congruence thread data (mechanism name, root cause language, promise)
- Word count constraints for the affected piece
- The 5 Laws of Upsell (always)

---

## EDITORIAL REVISION JUDGING CRITERIA

| Criterion | Weight | Scoring Focus |
|-----------|--------|---------------|
| Issue Resolution | 25% | Does the revision actually fix the identified problem? Not adjacent improvements — the ACTUAL issue. |
| Congruence Preservation | 25% | Does the fix maintain mechanism name, root cause language, promise threading? Zero congruence regression. |
| Tone Preservation | 20% | Does the fix maintain post-purchase warmth (upsell) or post-decline acknowledgment (downsell)? No selling language introduced. |
| Speed Preservation | 15% | Does the fix maintain or improve brevity? No word count bloat. Reading time not increased. |
| CTA Clarity | 15% | Does the fix maintain clean binary choice? Zero guilt in NO. Product + price in YES. |

### Scoring Rubric (Per Criterion)

#### Issue Resolution (25%)

| Score | Description |
|-------|-------------|
| 9-10 | Completely resolves the issue with elegant solution that improves surrounding copy |
| 7-8 | Fully resolves the issue without side effects |
| 5-6 | Partially resolves or creates minor new concerns |
| 3-4 | Addresses symptoms but not root cause |
| 1-2 | Fails to resolve or makes worse |

#### Congruence Preservation (25%)

| Score | Description |
|-------|-------------|
| 9-10 | Congruence strengthened — mechanism/root cause/promise more prominent after fix |
| 7-8 | Congruence maintained — no regression |
| 5-6 | Minor congruence drift — mechanism still named but language slightly shifted |
| 3-4 | Congruence weakened — mechanism reference generic or root cause paraphrased |
| 1-2 | Congruence broken — mechanism missing or root cause replaced |

#### Tone Preservation (20%)

| Score | Description |
|-------|-------------|
| 9-10 | Tone improved — warmer, more celebratory/acknowledging |
| 7-8 | Tone maintained — no regression |
| 5-6 | Minor tone shift — slightly more "salesy" but not dominant |
| 3-4 | Tone break — selling language introduced |
| 1-2 | Complete tone reversal — reads like pre-purchase sales page |

#### Speed Preservation (15%)

| Score | Description |
|-------|-------------|
| 9-10 | Words reduced while maintaining/improving quality |
| 7-8 | Word count neutral — fix didn't add bloat |
| 5-6 | Slight word increase (5-10%) — acceptable if quality gain justifies it |
| 3-4 | Significant word increase (10-20%) — pushing against limits |
| 1-2 | Major word increase or exceeds hard limits |

#### CTA Clarity (15%)

| Score | Description |
|-------|-------------|
| 9-10 | CTA cleaner after fix — binary choice strengthened, zero guilt confirmed |
| 7-8 | CTA maintained — no regression |
| 5-6 | CTA slightly affected — still functional but less clean |
| 3-4 | CTA degraded — guilt introduced or options unclear |
| 1-2 | CTA broken — manipulative language, missing options, or confusing |

---

## ANTI-SLOP ENFORCEMENT (U5-SPECIFIC)

**Auto-Reject in Editorial Revisions:**
- Introducing any phrase from the anti-slop lists in U2/U3 ARENA-LAYER.md
- Adding PAS structure elements where CAIRO/ARO existed
- Introducing urgency/fear where celebration/acknowledgment existed
- Adding proof elements that push past limits (>2 for upsell, >1 for downsell)
- Introducing guilt language in any CTA or Acknowledge section
- Generic mechanism references replacing specific names

---

## CRITIQUE-SPECIFIC GUIDANCE

**What The Critic should particularly target in U5 Arena:**
1. **Congruence regression** — the #1 risk in editorial revision. Fixing one thing while breaking the mechanism thread.
2. **Tone regression** — fixing a structural issue while introducing selling language.
3. **Word count bloat** — "improving" copy by adding words. In upsell context, addition is usually regression.
4. **CTA manipulation** — "strengthening" the CTA by adding guilt or urgency.
5. **Cross-piece inconsistency** — fixing one page's issue in a way that creates inconsistency with another page.

---

## GATE 2 CRITERIA (Per Fix Group)

**Per fix group Arena PASSES when:**
- [ ] All 7 revision candidates generated
- [ ] All candidates scored on 5 criteria
- [ ] At least 1 candidate scores >= 8.0 weighted average
- [ ] Human selects winning revision
- [ ] Selected revision preserves congruence (verified)
- [ ] Selected revision preserves tone (verified)
- [ ] Selected revision within word count limits (verified)

---

## CRITICAL REMINDERS

1. **Editorial revision, not generation.** Fix specific issues. Don't rewrite pages.
2. **Congruence preservation is 25%.** Equal to issue resolution. A fix that breaks congruence is NOT a fix.
3. **7 upsell-specific competitors.** NOT the 6 legendary copywriter lenses from Skill 20.
4. **Per fix group.** Each P1/P2 fix group gets its own Arena. Don't batch unrelated issues.
5. **Human selection per fix group.** BLOCKING.
6. **Speed is sacred.** Don't add words to fix problems. Cut or restructure.
7. **2 rounds + audience evaluation mandatory.** No shortcuts.
8. **Zero guilt in CTAs.** Non-negotiable through all revisions.
9. **Post-purchase/post-decline tone.** Every revision must maintain the psychological frame.
10. **Carry forward U4 flags.** Don't lose upstream intelligence.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-27 | Initial creation — 7 upsell-editorial competitors, 5 weighted scoring criteria with rubrics, editorial_revision mode, congruence/tone/speed preservation emphasis |
