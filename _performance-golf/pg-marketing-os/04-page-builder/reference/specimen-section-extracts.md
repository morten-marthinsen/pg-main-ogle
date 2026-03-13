# Landing Page Engine — Specimen-Specific Section Extracts (Tier 3)

**Version:** 1.0
**Date:** 2026-03-06
**Source:** Unique interactive patterns from S-tier specimens
**Purpose:** On-demand reference for distinctive UI patterns that can't be captured by generic component templates. Load specific patterns when building pages with similar requirements.

---

## Table of Contents

1. [How To Use](#how-to-use)
2. [Condition-Specific Testimonial Selector (Jolie)](#1-condition-specific-testimonial-selector)
3. [Tabbed Clinical Results (ARMRA)](#2-tabbed-clinical-results)
4. [Gamified Progression System (Performance Golf)](#3-gamified-progression-system)
5. [Named Mechanism Ecosystem (Performance Golf)](#4-named-mechanism-ecosystem)
6. ["The Answer Is YES" Objection Crusher (Basecamp)](#5-the-answer-is-yes-objection-crusher)
7. [Exclusion Badge Wall / "The No List" (ARMRA)](#6-exclusion-badge-wall--the-no-list)
8. [Scrolling Benefit Ticker (ARMRA/Jolie)](#7-scrolling-benefit-ticker)
9. [Certification Stack (ARMRA)](#8-certification-stack)

---

## How To Use

These patterns are **unique to specific specimens** — they solve specialized conversion problems that generic components can't. Load the relevant pattern when:

- Your page needs condition-specific social proof → Pattern 1
- Your page has clinical/study data across multiple categories → Pattern 2
- Your product has a progressive mastery system → Pattern 3
- Your product has a named mechanism with sub-components → Pattern 4
- Your page needs to crush a long list of objections → Pattern 5
- Your product needs "free-from" or exclusion trust signals → Pattern 6
- You need ambient benefit reinforcement → Pattern 7
- Your product has multiple certifications → Pattern 8

Always pair these with tokens from `design-tokens-reference.md` and base layouts from `component-pattern-library.md`.

---

## 1. Condition-Specific Testimonial Selector

*Source: Jolie SPEC-30 "Choose Your Ailment" — 10/10 specimen*

**What makes it unique:** Instead of a generic testimonial carousel, visitors self-select their condition and see only relevant proof. This turns social proof from passive ("here are some reviews") to active ("here's proof it works for YOUR problem").

**When to use:** Products that solve multiple conditions (health, beauty, wellness, multi-symptom). Requires 20+ testimonials organized by condition.

```html
<section style="padding: 80px 0; background: var(--bg-secondary, #FAFAFA);">
  <div style="max-width: 900px; margin: 0 auto; padding: 0 24px;">
    <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 36px); text-align: center; margin: 0 0 12px;">Choose Your Concern</h2>
    <p style="text-align: center; font-size: 15px; color: var(--text-secondary); margin: 0 0 32px;">See what real customers say about your specific concern</p>

    <!-- Category Labels -->
    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
      <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary);">Skin:</span>
    </div>

    <!-- Ailment Tags -->
    <div id="ailment-tags" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px;">
      <button onclick="filterTestimonials('eczema')" class="ailment-tag active" style="padding: 8px 16px; font-size: 13px; font-weight: 600; border: 1.5px solid var(--primary); border-radius: 20px; background: var(--primary); color: var(--bg-primary, #FFF); cursor: pointer; transition: all 0.2s;">Eczema</button>
      <button onclick="filterTestimonials('acne')" class="ailment-tag" style="padding: 8px 16px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 20px; background: transparent; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;">Acne</button>
      <button onclick="filterTestimonials('dry-skin')" class="ailment-tag" style="padding: 8px 16px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 20px; background: transparent; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;">Dry Skin</button>
      <button onclick="filterTestimonials('psoriasis')" class="ailment-tag" style="padding: 8px 16px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 20px; background: transparent; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;">Psoriasis</button>
      <!-- Hair category -->
      <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary); margin-left: 8px; display: flex; align-items: center;">Hair:</span>
      <button onclick="filterTestimonials('hair-shedding')" class="ailment-tag" style="padding: 8px 16px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 20px; background: transparent; color: var(--text-secondary); cursor: pointer;">Hair Shedding</button>
      <button onclick="filterTestimonials('dandruff')" class="ailment-tag" style="padding: 8px 16px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 20px; background: transparent; color: var(--text-secondary); cursor: pointer;">Dandruff</button>
    </div>

    <!-- Testimonial Grid (filtered by JS) -->
    <div id="testimonial-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div class="testimonial-card" data-condition="eczema" style="background: var(--bg-primary, #FFF); padding: 24px; border-radius: var(--radius-lg, 8px);">
        <div style="color: #F59E0B; font-size: 14px; margin-bottom: 8px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <h4 style="font-size: 16px; font-weight: 700; margin: 0 0 8px;">"{TESTIMONIAL_TITLE}"</h4>
        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin: 0 0 12px;">{TESTIMONIAL_BODY}</p>
        <span style="font-size: 13px; font-weight: 600;">{REVIEWER_NAME}</span>
      </div>
      <!-- More testimonial cards with different data-condition values -->
    </div>
  </div>
</section>

<script>
function filterTestimonials(condition) {
  // Update active tag
  document.querySelectorAll('.ailment-tag').forEach(tag => {
    tag.style.background = 'transparent';
    tag.style.color = 'var(--text-secondary)';
    tag.style.borderColor = '#DDD';
  });
  event.target.style.background = 'var(--primary)';
  event.target.style.color = 'var(--bg-primary, #FFF)';
  event.target.style.borderColor = 'var(--primary)';

  // Filter cards
  document.querySelectorAll('.testimonial-card').forEach(card => {
    card.style.display = card.dataset.condition === condition ? 'block' : 'none';
  });
}
</script>
```

**Key details from Jolie specimen:**
- 35+ testimonials organized across 13 conditions
- Categories split by body area (Skin vs Hair)
- Each testimonial mentions specific condition by name
- Testimonials range from "1 week" to "2 years" — shows both quick wins and long-term results

---

## 2. Tabbed Clinical Results

*Source: ARMRA SPEC-31 — 9/10 specimen*

**What makes it unique:** Clinical percentages organized by benefit category (Gut Health / Performance / Skin & Hair). Each tab shows 3-5 stats with explanatory copy. Creates the impression of overwhelming scientific evidence.

**When to use:** Products with clinical study data across multiple benefit categories. Requires at least 3 categories with 3+ data points each.

```html
<section style="padding: 80px 0; background: var(--bg-secondary, #FAFAFA);">
  <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
    <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 40px); text-align: center; margin: 0 0 40px;">Transformational Results</h2>

    <!-- Tab Navigation -->
    <div style="display: flex; justify-content: center; gap: 0; margin-bottom: 40px; border-bottom: 2px solid #E5E5E5;">
      <button onclick="showTab('gut')" class="result-tab active" style="padding: 12px 24px; font-size: 15px; font-weight: 600; color: var(--primary); border: none; border-bottom: 3px solid var(--primary); background: none; cursor: pointer; margin-bottom: -2px;">Gut Health</button>
      <button onclick="showTab('performance')" class="result-tab" style="padding: 12px 24px; font-size: 15px; font-weight: 600; color: var(--text-secondary); border: none; border-bottom: 3px solid transparent; background: none; cursor: pointer; margin-bottom: -2px;">Performance</button>
      <button onclick="showTab('skin')" class="result-tab" style="padding: 12px 24px; font-size: 15px; font-weight: 600; color: var(--text-secondary); border: none; border-bottom: 3px solid transparent; background: none; cursor: pointer; margin-bottom: -2px;">Skin & Hair</button>
    </div>

    <!-- Tab Content: Gut Health -->
    <div id="tab-gut" class="tab-content" style="display: block;">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 24px;">
        <div style="text-align: center; padding: 28px; background: var(--bg-primary, #FFF); border-radius: var(--radius-lg, 8px);">
          <div style="font-family: var(--font-heading); font-size: 52px; font-weight: 700; color: var(--primary); line-height: 1;">86%</div>
          <p style="font-size: 14px; color: var(--text-secondary); margin: 8px 0 0;">experienced less bloating†</p>
        </div>
        <div style="text-align: center; padding: 28px; background: var(--bg-primary, #FFF); border-radius: var(--radius-lg, 8px);">
          <div style="font-family: var(--font-heading); font-size: 52px; font-weight: 700; color: var(--primary); line-height: 1;">69%</div>
          <p style="font-size: 14px; color: var(--text-secondary); margin: 8px 0 0;">reported less gas and better digestive well-being†</p>
        </div>
        <div style="text-align: center; padding: 28px; background: var(--bg-primary, #FFF); border-radius: var(--radius-lg, 8px);">
          <div style="font-family: var(--font-heading); font-size: 52px; font-weight: 700; color: var(--primary); line-height: 1;">61%</div>
          <p style="font-size: 14px; color: var(--text-secondary); margin: 8px 0 0;">reported significant improvement in regularity†</p>
        </div>
        <div style="text-align: center; padding: 28px; background: var(--bg-primary, #FFF); border-radius: var(--radius-lg, 8px);">
          <div style="font-family: var(--font-heading); font-size: 52px; font-weight: 700; color: var(--primary); line-height: 1;">52%</div>
          <p style="font-size: 14px; color: var(--text-secondary); margin: 8px 0 0;">reported less gut discomfort after meals†</p>
        </div>
      </div>
      <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.7; text-align: center;">{CATEGORY_EXPLANATION}</p>
    </div>

    <!-- Tab Content: Performance (hidden by default) -->
    <div id="tab-performance" class="tab-content" style="display: none;">
      <!-- Same grid structure with performance stats -->
    </div>

    <!-- Tab Content: Skin & Hair (hidden by default) -->
    <div id="tab-skin" class="tab-content" style="display: none;">
      <!-- Same grid structure with skin/hair stats -->
    </div>

    <p style="text-align: center; font-size: 11px; color: #999; margin-top: 24px;">{CITATION}</p>
  </div>
</section>

<script>
function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
  document.querySelectorAll('.result-tab').forEach(t => {
    t.style.color = 'var(--text-secondary)';
    t.style.borderBottomColor = 'transparent';
  });
  document.getElementById('tab-' + tabId).style.display = 'block';
  event.target.style.color = 'var(--primary)';
  event.target.style.borderBottomColor = 'var(--primary)';
}
</script>
```

**Key details from ARMRA specimen:**
- 9 total stats across 3 tabs (4 + 3 + 2)
- Stats range from 52% to 86% — specific enough to be credible
- Each tab has explanatory paragraph connecting stats to mechanism
- † footnote links to actual study citation

---

## 3. Gamified Progression System

*Source: Performance Golf Click Stick "10-Click Challenge"*

**What makes it unique:** Turns a training product into a game with numbered levels. The "challenge" framing makes practice feel like play. Visual progression creates anticipation and buy-in before purchase.

**When to use:** Training products, progressive-skill products, any product with levels/stages of mastery.

```html
<section style="padding: 80px 0; background: var(--bg-primary, #FFF);">
  <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
    <div style="text-align: center; margin-bottom: 48px;">
      <span style="display: inline-block; padding: 6px 16px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; background: var(--accent); color: var(--text-primary); border-radius: 20px; margin-bottom: 16px;">The Challenge</span>
      <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 36px); margin: 0 0 12px;">{CHALLENGE_NAME}</h2>
      <p style="font-size: 17px; color: var(--text-secondary); max-width: 560px; margin: 0 auto;">{CHALLENGE_PROMISE}</p>
    </div>

    <!-- Progression Steps -->
    <div style="position: relative; padding-left: 40px;">
      <!-- Vertical line -->
      <div style="position: absolute; left: 15px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--accent), var(--primary));"></div>

      <!-- Level -->
      <div style="position: relative; margin-bottom: 32px;">
        <div style="position: absolute; left: -40px; width: 32px; height: 32px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: var(--text-primary);">1</div>
        <div style="padding: 20px; background: var(--bg-secondary, #FAFAFA); border-radius: var(--radius-lg, 8px);">
          <h4 style="font-size: 16px; font-weight: 700; margin: 0 0 6px;">{LEVEL_TITLE}</h4>
          <p style="font-size: 14px; color: var(--text-secondary); margin: 0; line-height: 1.6;">{LEVEL_DESCRIPTION}</p>
        </div>
      </div>
      <!-- Repeat for each level, with circles getting progressively filled with --primary color -->

      <!-- Final Level (highlighted) -->
      <div style="position: relative; margin-bottom: 0;">
        <div style="position: absolute; left: -40px; width: 32px; height: 32px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: var(--bg-primary, #FFF);">10</div>
        <div style="padding: 20px; background: var(--primary); border-radius: var(--radius-lg, 8px); color: var(--bg-primary, #FFF);">
          <h4 style="font-size: 16px; font-weight: 700; margin: 0 0 6px; color: inherit;">{FINAL_LEVEL_TITLE}</h4>
          <p style="font-size: 14px; opacity: 0.9; margin: 0; line-height: 1.6;">{FINAL_RESULT}</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Key details from PG specimen:**
- 10 levels with escalating difficulty
- Each level has clear "what you'll feel" outcome
- Final level is highlighted as the "unlock" moment
- Challenge is also a pre-round warmup routine (dual utility)

---

## 4. Named Mechanism Ecosystem

*Source: Performance Golf 357 Fairway Hybrid "Tri-Fusion Technology"*

**What makes it unique:** A parent mechanism name (Tri-Fusion) contains 3-4 named sub-mechanisms (Bulldozer Face, Dual Stability Rails, C-Cup Construction, Power Launch Crown). Each gets its own visual card with technical explanation + user benefit.

**When to use:** Products with a proprietary technology system. Requires a named parent mechanism and 3-5 named sub-components.

```html
<section style="padding: 80px 0; background: var(--bg-secondary, #FAFAFA);">
  <div style="max-width: 1000px; margin: 0 auto; padding: 0 24px;">
    <!-- Parent Mechanism -->
    <div style="text-align: center; margin-bottom: 56px;">
      <span style="display: inline-block; padding: 8px 20px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border: 2px solid var(--primary); color: var(--primary); border-radius: 4px; margin-bottom: 16px;">{PARENT_MECHANISM_NAME}™</span>
      <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 40px); margin: 0 0 12px;">{MECHANISM_HEADLINE}</h2>
      <p style="font-size: 17px; color: var(--text-secondary); max-width: 600px; margin: 0 auto;">{MECHANISM_PROMISE}</p>
    </div>

    <!-- Sub-Mechanism Cards -->
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
      <div style="background: var(--bg-primary, #FFF); padding: 32px; border-radius: var(--radius-lg, 8px); border-top: 4px solid var(--accent);">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div style="width: 40px; height: 40px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px;">{ICON}</div>
          <h3 style="font-size: 18px; font-weight: 700; margin: 0;">{SUB_MECHANISM_NAME}™</h3>
        </div>
        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin: 0 0 12px;">{TECHNICAL_EXPLANATION}</p>
        <p style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin: 0;"><em>What this means for you:</em> {USER_BENEFIT}</p>
      </div>
      <!-- Repeat for 3-4 sub-mechanisms -->
    </div>
  </div>
</section>
```

**Key details from PG specimen:**
- Parent mechanism always trademarked (™)
- Each sub-mechanism has: technical name, how it works, "what this means for you" benefit translation
- Sub-mechanisms connect to different user problems (distance, accuracy, forgiveness, launch)
- Visual: each card has accent-colored top border for cohesion

---

## 5. "The Answer Is YES" Objection Crusher

*Source: Basecamp SPEC-18 — 9/10 specimen*

**What makes it unique:** Instead of burying objection-handling in FAQ, Basecamp turns it into a bold, entertaining section where every question is pre-answered with "YES." The format creates momentum and confidence.

**When to use:** Products replacing existing solutions (SaaS, tools, services). Requires 15+ common objection-questions that all resolve positively.

```html
<section style="padding: 80px 0; background: var(--bg-primary, #FFF);">
  <div style="max-width: 720px; margin: 0 auto; padding: 0 24px;">
    <div style="text-align: center; margin-bottom: 48px;">
      <p style="font-size: 18px; color: var(--text-secondary); margin: 0 0 8px;">{SETUP_QUESTION}</p>
      <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 48px); margin: 0;">The answer is <span style="color: var(--accent);">YES!</span></h2>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0;">
      <div style="padding: 16px 0; border-bottom: 1px solid #F0F0F0; display: flex; align-items: baseline; gap: 12px;">
        <span style="color: var(--accent); font-weight: 700; font-size: 18px; flex-shrink: 0;">&#10003;</span>
        <span style="font-size: 16px; color: var(--text-primary); line-height: 1.5;">{OBJECTION_QUESTION_1}</span>
      </div>
      <div style="padding: 16px 0; border-bottom: 1px solid #F0F0F0; display: flex; align-items: baseline; gap: 12px;">
        <span style="color: var(--accent); font-weight: 700; font-size: 18px; flex-shrink: 0;">&#10003;</span>
        <span style="font-size: 16px; color: var(--text-primary); line-height: 1.5;">{OBJECTION_QUESTION_2}</span>
      </div>
      <!-- Repeat for 15-25 questions -->
    </div>
  </div>
</section>
```

**Key details from Basecamp specimen:**
- 24 questions, all starting with "Can I..." or "Can Basecamp..."
- No answers needed — the format implies YES to everything
- Creates cumulative confidence ("if it can do ALL of this...")
- Final question breaks pattern for humor: "You wrote some books on how to run a business, too, right?"

---

## 6. Exclusion Badge Wall / "The No List"

*Source: ARMRA SPEC-31*

**What makes it unique:** Instead of listing what's IN the product, lists what's NOT in it. "The No List" framing turns absence into a feature. 13 exclusion badges create visual trust wall.

**When to use:** Health/wellness/food/supplement products. Products where ingredient purity is a buying concern.

```html
<section style="padding: 60px 0; background: var(--bg-secondary, #FAFAFA);">
  <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
    <h3 style="font-family: var(--font-heading); font-size: 24px; text-align: center; margin: 0 0 32px;">The No List</h3>

    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;">
      <span style="padding: 10px 20px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 24px; background: var(--bg-primary, #FFF); color: var(--text-primary);">No Sugar</span>
      <span style="padding: 10px 20px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 24px; background: var(--bg-primary, #FFF); color: var(--text-primary);">No Gluten</span>
      <span style="padding: 10px 20px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 24px; background: var(--bg-primary, #FFF); color: var(--text-primary);">No GMOs</span>
      <span style="padding: 10px 20px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 24px; background: var(--bg-primary, #FFF); color: var(--text-primary);">No Glyphosate</span>
      <span style="padding: 10px 20px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 24px; background: var(--bg-primary, #FFF); color: var(--text-primary);">No Hormones</span>
      <span style="padding: 10px 20px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 24px; background: var(--bg-primary, #FFF); color: var(--text-primary);">No Antibiotics</span>
      <span style="padding: 10px 20px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 24px; background: var(--bg-primary, #FFF); color: var(--text-primary);">No Soy</span>
      <span style="padding: 10px 20px; font-size: 13px; font-weight: 600; border: 1.5px solid #DDD; border-radius: 24px; background: var(--bg-primary, #FFF); color: var(--text-primary);">No Artificial Additives</span>
      <!-- Continue for all exclusions -->
    </div>
  </div>
</section>
```

**Key details from ARMRA:**
- 13 exclusion items — enough to create visual density
- Pill/badge shape (rounded) creates visual differentiation from content sections
- Pairs with certification stack section below
- "The No List" title is memorable and brand-ownable

---

## 7. Scrolling Benefit Ticker

*Source: ARMRA SPEC-31, Jolie SPEC-30*

**What makes it unique:** Continuous horizontal scroll of benefit keywords creates ambient reinforcement without taking up vertical space. Works as a visual divider between sections.

**When to use:** Between hero and first content section, or between major page sections. Products with 5+ distinct benefit categories.

```html
<div style="overflow: hidden; padding: 16px 0; background: var(--primary); white-space: nowrap;">
  <div class="ticker" style="display: inline-flex; animation: ticker 20s linear infinite;">
    <span style="padding: 0 32px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: var(--bg-primary, #FFF); opacity: 0.9;">{BENEFIT_1}</span>
    <span style="padding: 0 8px; color: var(--bg-primary, #FFF); opacity: 0.4;">|</span>
    <span style="padding: 0 32px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: var(--bg-primary, #FFF); opacity: 0.9;">{BENEFIT_2}</span>
    <span style="padding: 0 8px; color: var(--bg-primary, #FFF); opacity: 0.4;">|</span>
    <span style="padding: 0 32px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: var(--bg-primary, #FFF); opacity: 0.9;">{BENEFIT_3}</span>
    <span style="padding: 0 8px; color: var(--bg-primary, #FFF); opacity: 0.4;">|</span>
    <!-- Duplicate all items for seamless loop -->
  </div>
</div>

<style>
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
```

**Key details:**
- ARMRA uses: SKIN | FITNESS | IMMUNITY | GUT | ENERGY | HAIR
- Jolie uses: Less Tangled Curly Hair | Less Acne | Fewer Psoriasis Flare Ups
- Items must be duplicated in HTML for seamless loop (CSS translateX(-50%))
- Slower speed (20-30s) feels premium; faster feels promotional

---

## 8. Certification Stack

*Source: ARMRA SPEC-31*

**What makes it unique:** Visual row of certification badges (Non-GMO, Keto-Certified, GMP, FDA-registered) creating a "wall of legitimacy." Combined with The No List, these two sections form a complete trust architecture.

**When to use:** Regulated products (supplements, food, health devices). Products with 4+ third-party certifications.

```html
<section style="padding: 48px 0; background: var(--bg-primary, #FFF); border-top: 1px solid #EBEBEB;">
  <div style="max-width: 900px; margin: 0 auto; padding: 0 24px;">
    <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: var(--text-secondary); text-align: center; margin: 0 0 24px;">Certifications & Testing</h3>

    <div style="display: flex; justify-content: center; align-items: center; gap: 32px; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="width: 56px; height: 56px; border: 2px solid #DDD; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">&#10003;</div>
        <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); text-align: center;">Certified<br/>Non-GMO</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="width: 56px; height: 56px; border: 2px solid #DDD; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">&#10003;</div>
        <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); text-align: center;">Keto<br/>Certified</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="width: 56px; height: 56px; border: 2px solid #DDD; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">&#10003;</div>
        <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); text-align: center;">Glyphosate<br/>Free</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="width: 56px; height: 56px; border: 2px solid #DDD; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">&#10003;</div>
        <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); text-align: center;">GMP<br/>Certified</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="width: 56px; height: 56px; border: 2px solid #DDD; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">&#10003;</div>
        <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); text-align: center;">Made in USA<br/>FDA Facilities</span>
      </div>
    </div>
  </div>
</section>
```

**Key details from ARMRA:**
- 5 certification categories
- Circular badge icons with consistent sizing
- Placed near buy box or after No List for maximum trust impact
- Small text (11px) — these are visual trust signals, not reading content

---

## Pattern Selection Guide

| If your page needs... | Use this pattern | Source specimen |
|----------------------|-----------------|----------------|
| Proof for multiple conditions | #1 Ailment Selector | Jolie SPEC-30 |
| Clinical data across categories | #2 Tabbed Results | ARMRA SPEC-31 |
| Progressive skill/mastery product | #3 Gamified Progression | PG Click Stick |
| Proprietary technology system | #4 Mechanism Ecosystem | PG 357 Hybrid |
| 15+ objections to crush | #5 YES Crusher | Basecamp SPEC-18 |
| Ingredient purity concerns | #6 No List + #8 Certs | ARMRA SPEC-31 |
| Ambient benefit reinforcement | #7 Benefit Ticker | ARMRA/Jolie |
| Regulatory compliance proof | #8 Certification Stack | ARMRA SPEC-31 |

---

*This file is Tier 3 of the Code Specimen Architecture. See design-tokens-reference.md for Tier 1 (brand tokens) and component-pattern-library.md for Tier 2 (generic components).*
