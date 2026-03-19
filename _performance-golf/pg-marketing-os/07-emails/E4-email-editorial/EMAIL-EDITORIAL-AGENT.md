---
name: email-editorial
description: >-
  Systematic quality review and revision of the complete assembled email campaign.
  Use as the final quality gate after E3 has assembled the full sequence. Scores
  every email against the EMAIL-QUALITY-RUBRIC, identifies structural and voice
  issues, applies revisions (full Arena for critical/major issues, direct fix for
  minor/cosmetic), rescores to verify improvement, and packages the final revised
  campaign. Every email must score 7.5+ to pass. Trigger when users mention email
  review, editorial pass, quality check, email polish, campaign revision, or
  finalizing an email campaign. Requires E3 assembled-sequence.yaml output.
---

## TABLE OF CONTENTS

- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [ISSUE SEVERITY CLASSIFICATION](#issue-severity-classification)
- [CAMPAIGN-LEVEL CRITERIA (C1-C5)](#campaign-level-criteria-c1-c5)
- [ARENA INTEGRATION (P1/P2 Issues Only)](#arena-integration-p1p2-issues-only)
- [OUTPUT SCHEMA](#output-schema)
- [CONSTRAINTS](#constraints)
- [ERROR HANDLING](#error-handling)
- [TEACHING FOUNDATIONS](#teaching-foundations)
- [SPECIMEN QUICK-REFERENCE](#specimen-quick-reference)
- [VERSION HISTORY](#version-history)

---

# EMAIL-EDITORIAL-AGENT.md

> **Version:** 1.2
> **Skill:** E4-email-editorial
> **Position:** Final skill in Email Pipeline (post-Assembly E3)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** E3 assembled sequence (revised-sequence.yaml or assembled-sequence.yaml)
> **Output:** `revised-sequence.yaml` + `EDITORIAL-REPORT.md`

---

## PURPOSE

Perform systematic quality review and revision of the complete assembled email campaign. Score every email against the email-quality-rubric.md, identify structural and voice issues, apply revisions (Arena for critical/major issues, direct fix for minor/cosmetic), rescore to verify improvement, and package the final revised campaign.

**Success Criteria:**
- Every email scored BEFORE and AFTER revision (baseline vs. final)
- All P1/P2 issues addressed through full Arena (2 rounds + audience evaluation, 7 competitors)
- All P3/P4 issues addressed through direct fixes
- Final score >= 7.5 for EVERY individual email
- Campaign-level criteria (C1-C5) all verified
- Subject line / body alignment verified for every email
- Voice consistency verified across entire sequence
- Human reviews final editorial report before campaign is marked complete

This agent is a **workflow orchestrator**. It coordinates audit, revision, and validation across the entire email sequence, then packages the final output for human review.

---

## IDENTITY

**This skill IS:**
- The final quality gatekeeper for the email campaign
- The systematic auditor checking every email against rubric criteria
- The voice consistency enforcer across the full sequence
- The revision engine (Arena for P1/P2, direct fix for P3/P4)
- The before/after scorer proving revision impact

**This skill is NOT:**
- An email writer (that is E1)
- A subject line generator (that is E2)
- A sequence assembler (that is E3)
- A campaign strategist (that is E0)

**Upstream:** Receives assembled email sequence from E3 (assembled-sequence.yaml or revised-sequence.yaml)
**Downstream:** Delivers revised-sequence.yaml + EDITORIAL-REPORT.md as final campaign output for human review

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Sequence loading + baseline scoring | opus | Deep analytical reading — scoring 9 criteria per email requires thorough engagement |
| 1 | Issue identification (structural audit, voice check, ratio check, SL alignment) | opus | Pattern detection across full sequence — requires holding entire campaign in context |
| 2 | Issue clustering + revision (Arena for P1/P2, direct fix for P3/P4) | opus | Creative generation for revisions — max quality per fix |
| 3 | Rescoring + output packaging | opus | Final quality validation — must be as rigorous as baseline scoring |

---

## STATE MACHINE

```
IDLE -> LOADING -> AUDIT -> REVISION -> RESCORING -> COMPLETE
         |           |          |            |
         v           v          v            v
      [GATE_0]    [GATE_1]  [GATE_2]     [GATE_3]
      PASS/FAIL   PASS/FAIL  PASS/FAIL   PASS/FAIL + HUMAN_REVIEW
```

**Gate 3 (Final Output):** HUMAN_REVIEW gate -- execution BLOCKS until human explicitly reviews the editorial report. No auto-completion permitted.

---

## LAYER ARCHITECTURE

### Layer 0: Loading + Baseline Scoring

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Score baseline BEFORE revising — without baseline scores you cannot prove improvement
> - Read email-quality-rubric.md before scoring — scoring without rubric is a protocol violation

**Purpose:** Load the complete assembled sequence from E3 and score every email against email-quality-rubric.md to establish the baseline.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-sequence-loader.md` | Load complete assembled sequence from E3 output |
| 0.2 | `0.2-quality-baseline.md` | Score every email against email-quality-rubric.md (9 individual criteria + 5 campaign-level criteria) |

**Execution Order:**
1. 0.1 first (load sequence)
2. 0.2 after 0.1 (score what was loaded)

**Gate 0:** Sequence loaded successfully with all emails parsed. Baseline scores established for every email. Campaign-level criteria scored. FAIL = sequence file missing or unparseable, OR any email fails to score.

---

### Layer 1: Issue Identification

> **Critical Constraints Reminder (Layer 1)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Every issue MUST be tagged with severity (P1/P2/P3/P4) and affected email position(s)
> - All 4 audit dimensions must complete — incomplete audit is a gate FAIL

**Purpose:** Systematically audit every email across 4 dimensions. Produce a complete issue inventory with severity classifications.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-structural-audit.md` | Check each email's body type template compliance |
| 1.2 | `1.2-voice-consistency.md` | Check persona voice drift across the sequence and within individual emails |
| 1.3 | `1.3-pitch-ratio-check.md` | Verify 70-80% content / 20-30% pitch ratio for every email |
| 1.4 | `1.4-sl-body-alignment.md` | Verify each subject line accurately matches its email content |
| 1.5 | `1.5-reader-focus-deliverability.md` | Customer-centricity check + deliverability risk scan |

**Execution Order:**
1. 1.1 through 1.5 can run in parallel (independent audit dimensions)

**Gate 1:** All 5 audit dimensions complete. Every issue tagged with severity (P1/P2/P3/P4), affected email position(s), and specific criterion impacted. FAIL = any audit dimension incomplete.

---

### Layer 2: Revision

> **Critical Constraints Reminder (Layer 2)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Arena mandatory for P1/P2 severity issues — direct fixes are NOT acceptable for critical/major
> - Every fix must preserve voice, flow, and threading — if a fix breaks another dimension, it is not a fix

**Purpose:** Group issues by type and severity, then apply revisions. P1/P2 issues get full Arena treatment. P3/P4 issues get direct fixes.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-issue-clustering.md` | Group issues by type and severity (P1 critical, P2 major, P3 minor, P4 cosmetic). Create revision plan. |
| 2.2 | `2.2-revision-executor.md` | Apply revisions: P1/P2 = full Arena (2 rounds + audience evaluation, 7 competitors). P3/P4 = direct fix. |

**Execution Order:**
1. 2.1 first (cluster and prioritize)
2. 2.2 after 2.1 (execute revision plan)

**Gate 2:** All P1 and P2 issues addressed through Arena. All P3 and P4 issues addressed through direct fix. Zero unresolved P1 issues remaining. FAIL = any P1 issue unresolved, OR Arena not run for P2 issues.

---

### Layer 3: Final Output

> **Critical Constraints Reminder (Layer 3)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Every email must score >= 7.5 after revision — no exceptions, no "close enough"
> - Human must review editorial report before campaign is marked complete (BLOCKING gate)

**Purpose:** Rescore all revised emails against the rubric. Compare to baseline. Package the revised sequence and editorial report.

| Skill | File | Function |
|-------|------|----------|
| 3.1 | `3.1-rescore.md` | Rescore all revised emails against email-quality-rubric.md. Compare to baseline. Verify minimum 7.5 threshold. |
| 3.2 | `3.2-output-packager.md` | Package revised-sequence.yaml + EDITORIAL-REPORT.md for human review |

**Execution Order:**
1. 3.1 first (rescore)
2. 3.2 after 3.1 (package)

**Gate 3:** Every email scores >= 7.5 (no exceptions). Campaign-level criteria all pass. Editorial report complete with before/after comparisons. Human reviews report. FAIL = any email below 7.5, OR campaign-level criteria fail, OR human not yet reviewed.

---

## ISSUE SEVERITY CLASSIFICATION

### P1 — Critical (Full Arena Required)

Issues that fundamentally break the email's purpose or violate core principles.

| Issue | Why P1 |
|-------|--------|
| Content-to-pitch ratio violated (>30% pitch) | Email becomes a sales letter, not a Ben Settle-style email |
| Body type fundamentally wrong (email doesn't match assigned type) | Structural integrity compromised |
| Opening hook scores < 5 | Email will be deleted before being read |
| Voice completely inconsistent (different persona from the rest of the sequence) | Reader trust destroyed |
| CTA missing or completely disconnected from content | Email fails its core conversion function |

### P2 — Major (Full Arena Required)

Issues that significantly degrade quality but don't fundamentally break the email.

| Issue | Why P2 |
|-------|--------|
| Bridge/transition clumsy or broken | Reader feels the "now I'm being sold to" moment |
| Voice inconsistency within a single email | Credibility weakened mid-read |
| Subject line / body content mismatch | Reader feels deceived -- trust damage |
| Brand/company is subject of 30%+ sentences (reader-focus failure) | Email reads as company newsletter, not personal message |
| Word count way outside target range (>50% deviation) | Email feels bloated or starved |
| Entertainment/engagement value scores < 5 | Reader finishes but won't open next email |
| Niche-inappropriate language (cross-niche contamination) | Reader feels "this person doesn't get me" |

### P3 — Minor (Direct Fix)

Issues that weaken quality but are fixable without creative competition.

| Issue | Why P3 |
|-------|--------|
| Paragraph brevity violations (4+ sentence paragraphs) | Wall of text -- easy to fix by splitting |
| Minor voice wobbles (2-3 phrases off-register) | Localized word swaps fix it |
| CTA could be stronger (functional but not compelling) | Targeted rewrite of CTA only |
| Sign-off inconsistency across emails | Standardization fix |
| Minor word count deviation (10-30% off target) | Trim or expand specific sections |
| Deliverability risk words (1-2 minor spam triggers) | Swap individual words/phrases |

### P4 — Cosmetic (Direct Fix)

Issues that are noticeable but have minimal impact on effectiveness.

| Issue | Why P4 |
|-------|--------|
| Formatting inconsistencies | Standardize formatting |
| Minor word choice improvements | Swap individual words |
| Sign-off punctuation | Mechanical fix |
| Spacing/line break inconsistencies | Formatting pass |

---

## CAMPAIGN-LEVEL CRITERIA (C1-C5)

These apply to the complete email sequence, not individual emails. Checked during Layer 0 baseline and Layer 3 rescore.

| Code | Criterion | Pass Condition |
|------|-----------|----------------|
| C1 | Body Type Variety | No same type twice in a row. In any 5-email window, at least 3 different body types. |
| C2 | Emotional Arc | Sequence has clear emotional progression (trust -> education -> desire -> urgency). |
| C3 | Cross-Email Continuity (Scheherazade) | Later emails reference earlier content AND plant forward hooks. 60%+ of non-final emails have forward teases. 100% of post-first emails have backward callbacks. |
| C4 | Urgency Escalation | Launch sequences show clear escalation. No urgency in first 2/3 of sequence. |
| C5 | Subject Line Diversity | Subject lines use at least 3 different formula categories across the sequence. |

---

## ARENA INTEGRATION (P1/P2 Issues Only)

When P1 or P2 issues are identified, they are revised through the full Arena protocol:

- **Mode:** `editorial_revision` (same as Skill 20)
- **Competitors:** 7 personas (Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, Architect)
- **Rounds:** 3 mandatory
- **Scope:** Each Arena instance focuses on ONE issue cluster (e.g., "bridge problems in emails 3, 7, 12")
- **Critic criteria (email-specific):**
  - Issue resolution (does the revision actually fix the problem?)
  - Voice preservation (does the fix maintain persona voice?)
  - Flow preservation (does the fix maintain reading momentum?)
  - Ratio preservation (does the fix maintain content-to-pitch balance?)
  - Bridge smoothness (if bridge was the issue, is it now seamless?)
  - Engagement improvement (is the revised version more engaging?)
  - Niche appropriateness (does the fix stay niche-appropriate?)

### Arena Scope Rules

```
CLUSTER ARENA INSTANCES BY ISSUE TYPE:
  - All bridge/transition issues → ONE Arena
  - All voice consistency issues → ONE Arena
  - All opening hook issues → ONE Arena
  - All ratio violations → ONE Arena

DO NOT run separate Arenas for each individual email's version of the same issue.
```

---

## OUTPUT SCHEMA

### revised-sequence.yaml

```yaml
revised_sequence:
  version: "1.0"
  generated_at: "[ISO timestamp]"
  skill_id: "E4-email-editorial"
  baseline_timestamp: "[when baseline scores were taken]"
  revision_timestamp: "[when revisions were applied]"

  campaign_meta:
    campaign_name: "[from E3]"
    campaign_type: "[from E3]"
    total_emails: [integer]

  emails:
    - position: 1
      subject_line: "[final subject line]"
      body: "[full revised email body text]"
      body_type: "[CT|QO|TM|QA|LB|ST|NR]"
      function: "[DR|DU|PL|AL|BP|CP|AR]"
      word_count: [integer]
      baseline_score: [float]
      final_score: [float]
      improvement: [float]  # final - baseline
      issues_found: [integer]
      issues_resolved: [integer]
      revisions_applied:
        - issue_id: "[from issue inventory]"
          severity: "[P1|P2|P3|P4]"
          resolution_method: "[arena|direct_fix]"
          description: "[what was changed]"

    - position: 2
      # ... same structure

  campaign_level_scores:
    C1_body_type_variety: [PASS|FAIL]
    C2_emotional_arc: [PASS|FAIL]
    C3_cross_email_continuity: [PASS|FAIL]
    C4_urgency_escalation: [PASS|FAIL]
    C5_subject_line_diversity: [PASS|FAIL]

  summary:
    total_issues_found: [integer]
    p1_issues: [integer]
    p2_issues: [integer]
    p3_issues: [integer]
    p4_issues: [integer]
    total_resolved: [integer]
    arena_runs: [integer]
    direct_fixes: [integer]
    average_baseline_score: [float]
    average_final_score: [float]
    average_improvement: [float]
    lowest_final_score: [float]
    all_emails_above_7_5: [boolean]
```

### EDITORIAL-REPORT.md

Human-readable report containing:
1. Executive summary (total issues, resolution rate, score improvement)
2. Per-email before/after comparison (baseline score vs. final score)
3. Issue inventory with severity and resolution method
4. Arena results for P1/P2 issues (which hybrid/competitor was selected)
5. Campaign-level criteria results
6. Recommendations for future campaigns (patterns to avoid)

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER revise without establishing baseline scores first** -- must score BEFORE and AFTER
2. **ALWAYS use Arena for P1/P2 issues** -- direct fixes are NOT acceptable for critical/major issues
3. **SEQUENTIAL Layer dependency** -- each layer must pass its gate before the next begins
4. **NEVER auto-approve the final output** -- human must review editorial report (BLOCKING gate)
5. **ALWAYS read email-quality-rubric.md before scoring** -- scoring without rubric = protocol violation

### Quality Constraints
6. **Every email must score >= 7.5 after revision** -- no "close enough" at 7.4
7. **Campaign-level criteria (C1-C5) must all PASS** -- sequence-level quality is as important as email-level
8. **Voice consistency verified across the ENTIRE sequence** -- not just within individual emails
9. **Subject line / body alignment verified for EVERY email** -- no exceptions
10. **Content-to-pitch ratio verified for EVERY email** -- 70-80% content / 20-30% pitch

### Integration Constraints
11. **Load the complete assembled sequence** -- do not work from partial sequences
12. **Preserve E3 assembly structure** -- editorial improves quality, not restructures the campaign
13. **Preserve E2 subject lines unless SL-body alignment fails** -- do not rewrite SLs that align correctly

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| E3 assembled sequence not found | HALT -- cannot proceed without upstream input |
| email-quality-rubric.md not found | HALT -- cannot score without rubric |
| Email unparseable from sequence | Log error, attempt to parse remaining emails. If >20% unparseable, HALT. |
| P1 issue found but Arena cannot improve score above 7.5 | Flag for human intervention. Do not auto-pass. |
| All emails already score >= 8.5 baseline | Run Layer 1 audit anyway. If zero issues found, proceed to output with baseline = final. |
| Voice consistency fails across sequence | This is a P1 issue -- run Arena with explicit voice alignment instructions. |
| Subject line alignment fails | This is a P2 issue -- revise either SL or body (whichever is weaker). |

---

## TEACHING FOUNDATIONS

**Primary: Quality Is Measured, Not Assumed**
1. Score BEFORE revision. Score AFTER revision. Show the improvement.
2. Without baseline scores, you cannot prove the editorial improved anything.
3. The reader never sees the editorial process -- they only see the final quality.

**Secondary: Severity Drives Process**
1. Critical/major issues deserve the full creative competition (Arena).
2. Minor/cosmetic issues waste Arena compute -- fix them directly.
3. The severity classification IS the editorial judgment. Get it right.

**From Skill 20 (Editorial):**
1. The editorial is not rewriting -- it is refining. The structure is set.
2. Every fix must preserve voice, flow, and threading.
3. If a fix improves one dimension but breaks another, it is not a fix.

---

## SPECIMEN QUICK-REFERENCE

### P1 Fix: Content-to-Pitch Ratio Violation

**BEFORE** (ratio: 40% content / 60% pitch -- P1 CRITICAL):

```
Hey —

Quick tip: the key to building wealth isn't saving more. It's earning more.

Now here's what I want you to do.

Go to [link] right now and grab the Wealth Accelerator System.

It's got 14 modules, 3 bonus trainings, and lifetime access to the community. Plus the 60-day guarantee means you risk nothing.

But hurry — we're closing enrollment Friday at midnight.

Don't miss this.

— John
```

**Problem:** Only 2 sentences of content. The rest is CTA + pitch + urgency. Reader gets nothing of value from opening this email.

**AFTER** (ratio: 75% content / 25% pitch -- PASS):

```
Hey —

Quick tip: the key to building wealth isn't saving more. It's earning more.

Most people obsess over cutting expenses. They cancel Netflix. They clip coupons. They feel virtuous and broke at the same time.

Meanwhile, one extra income stream of $2,000/month does more for your net worth than a decade of penny-pinching.

The math is simple: earning $24,000 more per year beats saving $200/month for the rest of your life.

So the real question isn't "where can I cut?" It's "what can I build?"

I put together a training that walks you through the 3 fastest income streams to build alongside a day job. Takes about 40 minutes.

It's at [link] if you want it.

— John
```

**Why the fix works:** Content section expanded to 75%. Reader gets a genuine insight (earning > saving) with specific numbers ($2,000/month, $24,000/year). The pitch feels like a natural extension, not the point of the email.

### P2 Fix: Clumsy Bridge → Earned Transition

**BEFORE** (clumsy bridge -- P2 MAJOR):

```
[good content about why most diets fail]

...and that's why calorie counting alone never works long-term.

ANYWAY, speaking of health, I wanted to let you know about our new supplement...
```

**Problem:** "ANYWAY" is the universal signal for "I'm done providing value and now I'm going to sell you something." Reader's guard goes up instantly. The bridge is visible.

**AFTER** (earned transition):

```
[good content about why most diets fail]

...and that's why calorie counting alone never works long-term.

The missing piece? Your metabolism's "set point" — the weight your body defends regardless of what you eat.

Resetting that set point is exactly what Dr. Greer's research focused on for 11 years. And the protocol he developed is inside the program I've been telling you about.

Here's where to get it: [link]
```

**Why the fix works:** The bridge extends the content ("missing piece" → set point). The product enters as the ANSWER to the content's question, not an interruption. No "anyway" / "by the way" / "speaking of which."

### Voice Wobble Detection Example

```
Email 1 voice register: casual, first-person, slightly irreverent
  "Look, I'm not going to sugarcoat this..."
  "Here's the thing nobody wants to admit..."

Email 4 voice register: formal, third-person, academic
  "Research indicates that individuals who implement structured approaches..."
  "The evidence suggests a correlation between systematic methodology and..."

DIAGNOSIS: Voice drift from casual first-person (emails 1-3) to academic third-person (emails 4-5).
SEVERITY: P1 — reader feels like a different person wrote emails 4-5.
FIX: Rewrite emails 4-5 in the established voice. Same insights, casual register.

AFTER FIX (email 4):
  "Here's what the research actually shows — and I'll skip the jargon..."
  "Turns out, people who follow a simple system do 3x better than people who wing it..."
```

**Why this matters:** Readers build a relationship with a consistent voice. When the voice shifts, the relationship breaks. Voice consistency across the sequence is as important as within any single email.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.2 | 2026-03-02 | Added 1.5 reader-focus + deliverability audit, customer-centricity P2 issue, deliverability P3 issue, upgraded C3 with Scheherazade |
| 1.1 | 2026-02-25 | Added SPECIMEN QUICK-REFERENCE section with good/bad inline examples |
| 1.0 | 2026-02-21 | Initial creation -- full 4-layer architecture with 10 microskills |

---

**Skill Status:** COMPLETE -- Full 4-layer architecture with 10 microskills
