# Advertorial Engine — ADVERTORIAL-ENGINE.md

**Version:** 1.0
**Created:** 2026-03-09
**Purpose:** Institutional memory and execution constraints for Advertorial Engine sessions. This is the master instruction file for the Advertorial Engine subsystem of Marketing-OS.

---

## TABLE OF CONTENTS

- [THE 5 LAWS (Never Scroll Past This)](#the-5-laws-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [THE CORE PROBLEM: ADVERTORIAL-SPECIFIC DEGRADATION PATTERNS](#the-core-problem-advertorial-specific-degradation-patterns)
- [ARCHITECTURE OVERVIEW](#architecture-overview)
- [HOOK & LEAD ARCHITECTURE (ADV-01)](#hook--lead-architecture-adv-01)
- [BODY COPY ARCHITECTURE (ADV-02)](#body-copy-architecture-adv-02)
- [CTA & BRIDGE ARCHITECTURE (ADV-03)](#cta--bridge-architecture-adv-03)
- [ADVERTORIAL TYPES](#advertorial-types)
- [SPECIMEN VAULT](#specimen-vault)
- [SKILL BUILD STATUS](#skill-build-status)
- [VERSION HISTORY](#version-history)

---

## THE 5 LAWS (Never Scroll Past This)

1. **The advertorial is NOT an ad.** It must read like editorial content. If the reader recognizes it as advertising before the bridge, you've failed.
2. **The hook determines everything.** 80% of advertorial success is the first 3 sentences. Curiosity gap or pattern interrupt required.
3. **Social proof is woven, not stacked.** Unlike sales pages, advertorials embed proof naturally within narrative. No proof cascades, no testimonial blocks.
4. **The bridge is the conversion point.** The transition from "article" to "offer" must feel natural — a recommendation, not a pitch. "I found this..." not "Buy now."
5. **Platform compliance is non-negotiable.** Native ad networks (Taboola, Outbrain) and Meta have content policies. Copy that gets flagged never runs.

---

## CRITICAL: READ THIS FIRST

This file exists because **advertorial copy has its own degradation patterns** distinct from long-form sales copy and landing pages. Advertorials live or die by their editorial feel — the moment they read like marketing, the reader bounces.

**This file is the fix.** Before executing ANY Advertorial Engine skill, read the relevant sections below.

---

## THE CORE PROBLEM: ADVERTORIAL-SPECIFIC DEGRADATION PATTERNS

### Pattern 1: The Dressed-Up Ad
The model writes an ad with editorial formatting — benefit bullets, feature stacks, urgency language — wrapped in article headers. It looks like content but reads like a pitch. **The fix:** ADV-02 (Body Copy) enforces narrative structure. Every body section must have a story thread, not a feature list. Test: remove the product name. Does it still read like an article?

### Pattern 2: The Weak Hook
The model opens with a generic statement ("Are you tired of...?" / "Did you know...?") instead of a pattern interrupt or curiosity gap. 80% of readers are lost in the first 3 sentences. **The fix:** ADV-01 (Hook & Lead) uses specimen-derived hook formulas. Every hook must pass the "scroll-stop test" — would this stop a thumb on a feed?

### Pattern 3: The Hard Bridge
The model transitions from editorial content to offer with a sudden gear shift — "Click here to learn more!" or "Order now!" The bridge must feel like a recommendation from a friend, not a CTA from an advertiser. **The fix:** ADV-03 (Bridge Writer) enforces recommendation framing. "I started using..." or "After researching, I found..." — first-person discovery language.

### Pattern 4: The Proof Stack
The model dumps testimonials, statistics, and social proof into a dedicated section — exactly like a sales page. Advertorials embed proof within narrative. A doctor's quote mid-story, a statistic in context, a neighbor's experience woven into the narrative. **The fix:** ADV-02 (Body Copy) checks for proof-block patterns. If 3+ proof elements appear in sequence without narrative, restructure.

### Pattern 5: The Compliance Violation
The model makes claims that would get flagged by native ad networks or Meta. Income claims, before/after without disclaimer, health cure language, unsubstantiated statistics. **The fix:** ADV-04 (Assembly) runs a compliance check against common platform policies. ADV-00 (Strategist) identifies platform constraints upfront.

### Pattern 6: The Generic Type
The model produces a generic "article" regardless of the advertorial type specified. A listicle has different structure than a PAS advertorial, which is different from a review. **The fix:** ADV-00 (Strategist) selects the advertorial type and ADV-02 (Body Copy) enforces type-specific structure templates.

### Anti-Degradation Protocol (Advertorial-Specific)

```
WHEN YOU NOTICE YOURSELF:
- Writing benefit bullets or feature stacks → STOP. Use narrative embedding.
- Opening with "Are you tired of..." or "Did you know..." → STOP. Use pattern interrupt or curiosity gap.
- Transitioning with "Click here" or "Order now" → STOP. Use recommendation framing.
- Stacking 3+ proof elements in sequence → STOP. Weave into narrative.
- Making health/income/performance claims without hedging → STOP. Check platform policies.
- Ignoring the specified advertorial type → STOP. Follow type-specific structure.

IF CONTEXT IS LARGE:
- This does NOT excuse ad-like language in advertorials
- This does NOT excuse weak hooks
- This does NOT excuse hard bridges
- Request continuation rather than compressing quality
```

---

## ARCHITECTURE OVERVIEW

The Advertorial Engine is a 6-skill pipeline that generates advertorial content — typically downstream from the Campaign Brief (Skill 09) and optionally from the Ad Engine (A02 hook angles).

### Skill Pipeline

```
ADV-00: Advertorial Strategist
  → Analyze campaign brief, select advertorial type (listicle/native/blog/review/PAS/sponsored/editorial),
    define angle, audience targeting, platform compliance requirements
  → Outputs: advertorial-strategy.yaml

ADV-01: Hook & Lead Writer
  → Write opening hook/lead (most critical — determines if reader stays or bounces)
  → Arena: generative_full_draft
  → Outputs: advertorial-lead-draft.md

ADV-02: Body Copy Writer
  → Write main body (story/problem/mechanism/social proof, type-specific structure)
  → Arena: generative_full_draft
  → Outputs: advertorial-body-draft.md

ADV-03: CTA & Bridge Writer
  → Write transition from editorial content to offer (the "bridge" to sales page)
  → Must feel like a recommendation, not a pitch
  → Arena: generative_full_draft (short)
  → Outputs: advertorial-bridge-draft.md

ADV-04: Advertorial Assembly
  → Assemble full advertorial, cross-section validation, compliance check
  → No Arena
  → Outputs: advertorial-assembled.md

ADV-05: Advertorial Editorial
  → Quality review, "editorial smell" test (does it read like content or an ad?)
  → Arena: editorial_revision
  → Outputs: advertorial-final.md
```

### Dependency Chain

```
Skill 09 (Campaign Brief) ──→ ADV-00 (Strategy) ──→ ADV-01 (Hook & Lead)
A02 (Hook Angles, optional)─┘                   ──→ ADV-02 (Body Copy)
                                                 ──→ ADV-03 (Bridge)
                         ADV-01 + ADV-02 + ADV-03 ──→ ADV-04 (Assembly) ──→ ADV-05 (Editorial)
```

### Integration Points

| From | To | What Passes |
|------|-----|------------|
| Skill 09 (Campaign Brief) | ADV-00 | campaign-brief.json (mechanism, story elements, proof inventory, audience targeting) |
| A02 (Hook Angles, optional) | ADV-01 | Hook angle candidates for advertorial adaptation |
| ADV-04 (Assembly) | Traffic destination | advertorial-assembled.md links to sales page / landing page / e-comm page |

---

## HOOK & LEAD ARCHITECTURE (ADV-01)

### Hook Formula Categories

| Formula | Structure | Example |
|---------|-----------|---------|
| Curiosity Gap | "[Surprising fact] — and [implication]" | "Scientists found a high-altitude flower that..." |
| Pattern Interrupt | Statement that breaks expectations | "Your doctor is wrong about cholesterol." |
| Story Open | Drop into a scene mid-action | "When James collapsed at the gym, his trainer..." |
| Listicle Hook | Number + unexpected framing | "5 Reasons Your Golf Swing Gets Worse After Lessons" |
| Question Hook | Provocative question the reader can't ignore | "What if the reason you can't sleep has nothing to do with stress?" |

### Hard Constraints
- **First 3 sentences determine 80% of success.** Front-load impact.
- **No benefit language.** The hook is editorial, not promotional.
- **Match the platform.** Taboola hooks differ from Meta hooks differ from email advertorial hooks.
- **The lead must establish editorial voice.** By paragraph 2, the reader should feel they're reading an article.

---

## BODY COPY ARCHITECTURE (ADV-02)

### Type-Specific Body Structures

| Type | Body Structure | Key Constraint |
|------|---------------|---------------|
| Listicle | Numbered points with narrative per point | Each point must standalone |
| Native | Journalistic flow: who/what/when/where/why | No benefit language until bridge |
| Blog Style | Personal narrative with discovery arc | First-person voice required |
| Review | Product evaluation with pros/cons framework | Must include genuine cons |
| PAS | Problem → Agitation → Solution (editorial tone) | Agitation via story, not hype |
| Sponsored | Expert/influencer collaboration narrative | Expert voice must feel authentic |
| Editorial | Opinion piece with supporting evidence | Strong POV required |

### Proof Embedding Rules
- **Weave, don't stack.** Proof appears within narrative, not in blocks.
- **Maximum 1 proof element per paragraph.** Doctor quote, statistic, or testimonial — pick one.
- **Attribution adds credibility.** "A 2024 study from Johns Hopkins found..." beats "Studies show..."
- **User stories > testimonials.** "Sarah from Denver noticed..." beats "★★★★★ This changed my life!"

---

## CTA & BRIDGE ARCHITECTURE (ADV-03)

### Bridge Framing Templates

| Frame | Language Pattern | Best For |
|-------|-----------------|----------|
| Personal Discovery | "I started using [X] and..." | Blog, Review |
| Recommendation | "After researching, the one that stood out was..." | Listicle, Editorial |
| Expert Endorsement | "Dr. [Name] recommends [X] because..." | PAS, Sponsored |
| Community Consensus | "Thousands of [audience] have already..." | Native, Listicle |

### Hard Constraints
- **No "Buy Now" language.** The bridge is a recommendation, not a CTA.
- **Transition must feel earned.** The body copy should naturally lead to "so what do I do about this?"
- **Include exactly ONE CTA.** Multiple CTAs break the editorial illusion.
- **The CTA is a link, not a button.** Editorial articles link out — they don't have "Add to Cart" buttons.

---

## ADVERTORIAL TYPES

| Type | Best For | Word Count | Conversion Mechanism |
|------|----------|-----------|---------------------|
| Listicle | DTC products, supplements, SaaS | 800-1500 | Product appears in list (usually #1 or #3) |
| Native | Health, finance, lifestyle | 1000-2000 | Journalistic discovery leads to product |
| Blog Style | Personal care, wellness, gifts | 600-1200 | First-person recommendation |
| Review | Electronics, supplements, services | 800-1500 | Objective evaluation with clear winner |
| PAS | Health, pain points, frustration-driven | 1000-2000 | Problem/agitation drives to solution |
| Sponsored | Authority-dependent products | 800-1500 | Expert credibility transfers to product |
| Editorial | Opinion-driven, contrarian positioning | 1000-2000 | Strong POV creates conviction |

---

## SPECIMEN VAULT

**Total Specimens:** 11 (external URLs — not yet scraped into local files)
**Source:** `Advertorial Specimens.md` (vault root)
**Future Source:** Anstrex scrapes (per Donnie's recommendation)

### Specimen Index

| # | URL | Type | Notes |
|---|-----|------|-------|
| 1 | topdust.com/metabolic-renewal-tummy-weight | PAS | Health/weight |
| 2 | try.miraclebrand.co/a/s6-reasons | Listicle | DTC product |
| 3 | researchintohealth.com/knee-relief | PAS | Health/joint |
| 4 | info.blissy.com/my-perfect-gift-2 | Blog style | Gift angle |
| 5 | thequalityedit.com/.../feals-review | Review | Hemp/CBD |
| 6 | kachava.com/lp/9-reasons-why | Listicle | Nutrition |
| 7 | go.noobru.com/5-surprising-reasons | Listicle | Nootropic |
| 8 | qualialife.com/qualia-mind | PAS | Brain fog |
| 9 | healthybear.co/thryve | Native | Gut health |
| 10 | getpapmd.com/pages/lp007-01 | Listicle | **Top sample** |
| 11 | primalviking.com/pages/10-reasons-trt | Listicle | TRT/hormone |

**Note:** Specimens are external URLs only. No tier1-extractions — those are general long-form copy, irrelevant to advertorial structure. Future iterations will add Anstrex scrapes for expanded specimen coverage.

---

## SKILL BUILD STATUS

| Skill | Status | Files | Built |
|-------|--------|-------|-------|
| ADV-00 — Advertorial Strategist | COMPLETE | SKILL.md, ADV-00-AGENT.md, ADV-00-ANTI-DEGRADATION.md, microskills | 2026-03-09 |
| ADV-01 — Hook & Lead Writer | COMPLETE | SKILL.md, ADV-01-AGENT.md, ADV-01-ANTI-DEGRADATION.md, microskills | 2026-03-09 |
| ADV-02 — Body Copy Writer | COMPLETE | SKILL.md, ADV-02-AGENT.md, ADV-02-ANTI-DEGRADATION.md, microskills | 2026-03-09 |
| ADV-03 — CTA & Bridge Writer | COMPLETE | SKILL.md, ADV-03-AGENT.md, ADV-03-ANTI-DEGRADATION.md, microskills | 2026-03-09 |
| ADV-04 — Advertorial Assembly | COMPLETE | SKILL.md, ADV-04-AGENT.md, ADV-04-ANTI-DEGRADATION.md, microskills | 2026-03-09 |
| ADV-05 — Advertorial Editorial | COMPLETE | SKILL.md, ADV-05-AGENT.md, ADV-05-ANTI-DEGRADATION.md, microskills | 2026-03-09 |

**All 6 skills fully built with AGENT.md (orchestrator), ANTI-DEGRADATION.md (structural enforcement), and complete microskill architecture.**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation — architecture, 5 Laws, 6 degradation patterns, skill pipeline, advertorial type taxonomy, specimen vault (11 external URLs), 6 v1 skill scaffolds. |
