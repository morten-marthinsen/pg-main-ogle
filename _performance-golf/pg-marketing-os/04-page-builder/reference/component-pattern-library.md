# Landing Page Engine — Component Pattern Library (Tier 2)

**Version:** 1.0
**Date:** 2026-03-06
**Source:** Synthesized from S-tier specimens (ARMRA, Jolie, Basecamp, AG1, Performance Golf)
**Purpose:** Clean HTML/CSS component templates that prevent "generic AI website" output. Use alongside design-tokens-reference.md.

---

## Table of Contents

1. [How To Use](#how-to-use)
2. [Hero + Buy Box (PDP)](#1-hero--buy-box-pdp)
3. [Hero Section (LP)](#2-hero-section-lp)
4. [Media Logo Bar](#3-media-logo-bar)
5. [Benefit Grid](#4-benefit-grid)
6. [Clinical/Data Proof Section](#5-clinicaldata-proof-section)
7. [Testimonial Carousel](#6-testimonial-carousel)
8. [Comparison Chart](#7-comparison-chart)
9. [FAQ Accordion](#8-faq-accordion)
10. [Pricing / Buy Box](#9-pricing--buy-box)
11. [Founder Story](#10-founder-story)
12. [CTA Block](#11-cta-block)
13. [Guarantee Block](#12-guarantee-block)
14. [Bonus Value Stack](#13-bonus-value-stack)

---

## How To Use

1. Match the project's vertical to design tokens from `design-tokens-reference.md`
2. Select component templates below that match your section sequence
3. Replace CSS custom properties (`--primary`, `--accent`, etc.) with actual brand tokens
4. Adapt content placeholders (marked with `{BRACKETS}`) to real copy
5. Mix sharp and rounded corners, vary section backgrounds, break symmetry

**Critical rule:** Never use all components with identical spacing, backgrounds, or border-radius. Real pages create visual rhythm through variation.

---

## 1. Hero + Buy Box (PDP)

*Source: Jolie SPEC-30, Performance Golf Click Stick*

```html
<section class="hero-pdp" style="padding: 40px 0 60px;">
  <div class="hero-pdp__container" style="max-width: 1200px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;">

    <!-- Left: Product Media -->
    <div class="hero-pdp__media">
      <div class="hero-pdp__gallery" style="position: relative; aspect-ratio: 1/1; background: var(--bg-secondary, #F5F5F5); border-radius: var(--radius-lg, 8px); overflow: hidden;">
        <img src="{PRODUCT_IMAGE}" alt="{PRODUCT_NAME}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div class="hero-pdp__thumbs" style="display: flex; gap: 8px; margin-top: 12px;">
        <div style="width: 72px; height: 72px; border-radius: var(--radius-sm, 4px); border: 2px solid var(--primary); overflow: hidden;">
          <img src="{THUMB_1}" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <!-- Repeat thumbnails -->
      </div>
    </div>

    <!-- Right: Buy Box -->
    <div class="hero-pdp__buybox">
      <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-secondary, #666); margin-bottom: 8px;">{BRAND_NAME}</p>
      <h1 style="font-family: var(--font-heading); font-size: var(--h1-size, 36px); font-weight: 700; color: var(--text-primary); margin: 0 0 12px; line-height: 1.15;">{PRODUCT_NAME}</h1>

      <!-- Rating -->
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
        <div style="color: #F59E0B; font-size: 16px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <span style="font-size: 14px; color: var(--text-secondary);">{RATING} ({REVIEW_COUNT} reviews)</span>
      </div>

      <!-- Product Description -->
      <p style="font-family: var(--font-body); font-size: var(--body-size, 16px); color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">{PRODUCT_DESCRIPTION}</p>

      <!-- Clinical Proof (if applicable) -->
      <div style="background: var(--bg-secondary, #F8F8F8); border-left: 3px solid var(--accent); padding: 16px 20px; margin-bottom: 20px; border-radius: 0 var(--radius-sm, 4px) var(--radius-sm, 4px) 0;">
        <p style="font-weight: 600; font-size: 14px; margin: 0 0 8px; color: var(--text-primary);">{PROOF_HEADLINE}</p>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; color: var(--text-secondary);">
          <li style="margin-bottom: 4px;"><strong>{PERCENTAGE_1}</strong> {PROOF_CLAIM_1}</li>
          <li style="margin-bottom: 4px;"><strong>{PERCENTAGE_2}</strong> {PROOF_CLAIM_2}</li>
        </ul>
      </div>

      <!-- Pricing -->
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
        <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 2px solid var(--primary); border-radius: var(--radius-sm, 4px); cursor: pointer; background: var(--bg-secondary, #FAFAFA);">
          <input type="radio" name="purchase" checked style="accent-color: var(--primary);" />
          <div>
            <span style="font-weight: 700; font-size: 15px;">Subscribe & Save</span>
            <span style="font-size: 13px; color: var(--accent); margin-left: 8px;">{DISCOUNT_LABEL}</span>
            <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">{SUBSCRIBE_PRICE}</div>
          </div>
        </label>
        <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 1px solid #DDD; border-radius: var(--radius-sm, 4px); cursor: pointer;">
          <input type="radio" name="purchase" />
          <div>
            <span style="font-weight: 600; font-size: 15px;">One Time Purchase</span>
            <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">{ONETIME_PRICE}</div>
          </div>
        </label>
      </div>

      <!-- CTA Button -->
      <button style="width: 100%; padding: 18px 32px; font-family: var(--font-body); font-size: 17px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--btn-text, #FFF); background: var(--btn-bg, var(--primary)); border: var(--btn-border, none); border-radius: var(--btn-radius, 4px); cursor: pointer; transition: opacity 0.2s;">{CTA_TEXT}</button>

      <!-- Trust Badges -->
      <div style="display: flex; justify-content: center; gap: 24px; margin-top: 16px; font-size: 12px; color: var(--text-secondary);">
        <span>&#128274; Secure Checkout</span>
        <span>&#128666; Free Shipping</span>
        <span>&#9989; {GUARANTEE_SHORT}</span>
      </div>
    </div>
  </div>
</section>
```

**Mobile adaptation:** Stack to single column, gallery goes full-width, buy box gets sticky bottom CTA bar.

---

## 2. Hero Section (LP)

*Source: Basecamp SPEC-18, ARMRA SPEC-31*

```html
<section class="hero-lp" style="padding: 80px 0 100px; background: var(--bg-primary, #FFF);">
  <div style="max-width: 720px; margin: 0 auto; padding: 0 24px; text-align: left;">
    <h1 style="font-family: var(--font-heading); font-size: var(--h1-size, 64px); font-weight: 700; color: var(--text-primary); line-height: 1.08; margin: 0 0 24px; letter-spacing: -0.02em;">{HEADLINE}</h1>
    <p style="font-family: var(--font-body); font-size: var(--body-size, 20px); color: var(--text-secondary, #555); line-height: 1.65; margin: 0 0 32px; max-width: 560px;">{SUBHEAD_PARAGRAPH}</p>

    <!-- CTA -->
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <a href="#" style="display: inline-flex; align-items: center; padding: 16px 32px; font-family: var(--font-body); font-size: 16px; font-weight: 600; color: var(--btn-text); background: var(--btn-bg); border-radius: var(--btn-radius, 6px); text-decoration: none; box-shadow: var(--btn-shadow, none); transition: transform 0.15s;">{PRIMARY_CTA}</a>
      <a href="#" style="font-size: 15px; color: var(--text-secondary); text-decoration: underline; text-underline-offset: 3px;">{SECONDARY_CTA}</a>
    </div>

    <!-- Proof snippet -->
    <div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #E5E5E5;">
      <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--text-secondary);">
        <span style="color: #F59E0B;">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        <span>{SOCIAL_PROOF_SNIPPET}</span>
      </div>
    </div>
  </div>
</section>
```

**Design note:** Basecamp uses left-aligned text with massive headings (85px). ARMRA centers with a featured review above-fold. Choose based on page type.

---

## 3. Media Logo Bar

*Source: ARMRA SPEC-31, Jolie SPEC-30*

```html
<section style="padding: 32px 0; border-top: 1px solid #EBEBEB; border-bottom: 1px solid #EBEBEB; background: var(--bg-primary, #FFF);">
  <div style="max-width: 1000px; margin: 0 auto; padding: 0 24px;">
    <p style="text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: var(--text-secondary, #999); margin: 0 0 20px;">As Featured In</p>
    <div style="display: flex; justify-content: center; align-items: center; gap: 40px; flex-wrap: wrap; opacity: 0.5; filter: grayscale(100%);">
      <img src="{LOGO_1}" alt="{MEDIA_1}" style="height: 24px; width: auto;" />
      <img src="{LOGO_2}" alt="{MEDIA_2}" style="height: 24px; width: auto;" />
      <img src="{LOGO_3}" alt="{MEDIA_3}" style="height: 24px; width: auto;" />
      <img src="{LOGO_4}" alt="{MEDIA_4}" style="height: 24px; width: auto;" />
      <img src="{LOGO_5}" alt="{MEDIA_5}" style="height: 24px; width: auto;" />
    </div>
  </div>
</section>
```

**Design note:** Always grayscale + reduced opacity. Consistent logo heights (20-28px). 5-8 logos max.

---

## 4. Benefit Grid

*Source: ARMRA 5-reason framework, AG1, Performance Golf feature deep-dives*

### Variant A: Numbered Reasons (ARMRA-style)

```html
<section style="padding: 80px 0; background: var(--bg-secondary, #FAFAFA);">
  <div style="max-width: 900px; margin: 0 auto; padding: 0 24px;">
    <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 40px); font-weight: 700; color: var(--text-primary); text-align: center; margin: 0 0 56px; line-height: 1.15;">{SECTION_HEADLINE}</h2>

    <div style="display: flex; flex-direction: column; gap: 48px;">
      <!-- Reason Card -->
      <div style="display: grid; grid-template-columns: 64px 1fr; gap: 24px; align-items: start;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 22px; font-weight: 700; color: var(--text-primary); flex-shrink: 0;">1</div>
        <div>
          <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 700; color: var(--text-primary); margin: 0 0 8px;">{REASON_TITLE}</h3>
          <p style="font-family: var(--font-body); font-size: var(--body-size, 16px); color: var(--text-secondary); line-height: 1.65; margin: 0;">{REASON_DESCRIPTION}</p>
        </div>
      </div>
      <!-- Repeat for reasons 2-5 -->
    </div>
  </div>
</section>
```

### Variant B: Icon Grid (3-column)

```html
<section style="padding: 80px 0; background: var(--bg-primary, #FFF);">
  <div style="max-width: 1100px; margin: 0 auto; padding: 0 24px;">
    <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 40px); text-align: center; margin: 0 0 16px;">{SECTION_HEADLINE}</h2>
    <p style="text-align: center; font-size: var(--body-size); color: var(--text-secondary); margin: 0 0 56px; max-width: 600px; margin-left: auto; margin-right: auto;">{SECTION_SUBHEAD}</p>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;">
      <div>
        <div style="width: 48px; height: 48px; background: var(--accent); border-radius: var(--radius-sm, 4px); margin-bottom: 16px; display: flex; align-items: center; justify-content: center; font-size: 24px;">{ICON}</div>
        <h3 style="font-size: 18px; font-weight: 700; margin: 0 0 8px; color: var(--text-primary);">{BENEFIT_TITLE}</h3>
        <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.6; margin: 0;">{BENEFIT_DESCRIPTION}</p>
      </div>
      <!-- Repeat for 3-6 benefits -->
    </div>
  </div>
</section>
```

**Mobile:** Grid collapses to single column. Numbered reasons keep their layout; icon grid stacks.

---

## 5. Clinical/Data Proof Section

*Source: ARMRA tabbed results, Jolie clinical banner*

```html
<section style="padding: 80px 0; background: var(--bg-secondary, #F8F8F8);">
  <div style="max-width: 900px; margin: 0 auto; padding: 0 24px;">
    <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 40px); text-align: center; margin: 0 0 16px;">{DATA_HEADLINE}</h2>
    <p style="text-align: center; font-size: 15px; color: var(--text-secondary); margin: 0 0 48px;">{DATA_SUBHEAD}</p>

    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
      <!-- Stat Card -->
      <div style="background: var(--bg-primary, #FFF); padding: 32px; border-radius: var(--radius-lg, 8px); text-align: center;">
        <div style="font-family: var(--font-heading); font-size: 56px; font-weight: 700; color: var(--primary); line-height: 1; margin-bottom: 8px;">{PERCENTAGE}%</div>
        <p style="font-size: 15px; color: var(--text-secondary); margin: 0; line-height: 1.5;">{STAT_DESCRIPTION}</p>
      </div>
      <!-- Repeat for 4-6 stats -->
    </div>

    <!-- Source citation -->
    <p style="text-align: center; font-size: 12px; color: #999; margin-top: 32px; font-style: italic;">{CITATION}</p>
  </div>
</section>
```

**Design note:** Stats should have visual weight — large numbers (48-64px) with the `%` sign. Never bury data in paragraph text.

---

## 6. Testimonial Carousel

*Source: ARMRA 20K+ reviews, Jolie condition-specific testimonials*

```html
<section style="padding: 80px 0; background: var(--bg-primary, #FFF);">
  <div style="max-width: 1100px; margin: 0 auto; padding: 0 24px;">
    <div style="text-align: center; margin-bottom: 48px;">
      <div style="color: #F59E0B; font-size: 20px; margin-bottom: 8px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 36px); margin: 0 0 8px;">{REVIEW_COUNT}+ Five-Star Reviews</h2>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      <!-- Testimonial Card -->
      <div style="background: var(--bg-secondary, #FAFAFA); padding: 32px; border-radius: var(--radius-lg, 8px);">
        <div style="color: #F59E0B; font-size: 14px; margin-bottom: 12px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <h4 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; margin: 0 0 12px; color: var(--text-primary);">"{TESTIMONIAL_TITLE}"</h4>
        <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.6; margin: 0 0 16px;">{TESTIMONIAL_BODY}</p>
        <div style="font-size: 14px;">
          <span style="font-weight: 600; color: var(--text-primary);">{REVIEWER_NAME}</span>
          <span style="color: var(--text-secondary);"> &mdash; Verified Buyer</span>
        </div>
      </div>
      <!-- Repeat for 3-6 testimonials -->
    </div>
  </div>
</section>
```

**Mobile:** Stacks to single column or horizontal scroll carousel.

---

## 7. Comparison Chart

*Source: Jolie SPEC-30, Performance Golf Click Stick*

```html
<section style="padding: 80px 0; background: var(--bg-primary, #FFF);">
  <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
    <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 36px); text-align: center; margin: 0 0 48px;">{COMPARISON_HEADLINE}</h2>

    <table style="width: 100%; border-collapse: collapse; font-family: var(--font-body);">
      <thead>
        <tr>
          <th style="text-align: left; padding: 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary); border-bottom: 2px solid #E5E5E5;">Feature</th>
          <th style="text-align: center; padding: 16px; font-size: 14px; font-weight: 700; color: var(--primary); border-bottom: 2px solid var(--primary);">{PRODUCT_NAME}</th>
          <th style="text-align: center; padding: 16px; font-size: 14px; color: var(--text-secondary); border-bottom: 2px solid #E5E5E5;">{COMPETITOR}</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #F0F0F0;">
          <td style="padding: 16px; font-size: 15px; color: var(--text-primary);">{FEATURE_1}</td>
          <td style="text-align: center; padding: 16px; font-size: 18px; color: #22C55E;">&#10003;</td>
          <td style="text-align: center; padding: 16px; font-size: 18px; color: #EF4444;">&#10007;</td>
        </tr>
        <!-- Repeat for 4-6 features -->
      </tbody>
    </table>
  </div>
</section>
```

**Design note:** Keep to 5-7 rows max. The product column should always "win" on every row. Use green checkmark / red X — not words.

---

## 8. FAQ Accordion

*Source: ARMRA SPEC-31, Basecamp SPEC-18, Performance Golf*

```html
<section style="padding: 80px 0; background: var(--bg-secondary, #FAFAFA);">
  <div style="max-width: 720px; margin: 0 auto; padding: 0 24px;">
    <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 36px); text-align: center; margin: 0 0 48px;">{FAQ_HEADLINE}</h2>

    <div style="display: flex; flex-direction: column; gap: 0;">
      <!-- FAQ Item -->
      <details style="border-bottom: 1px solid #E5E5E5;">
        <summary style="padding: 20px 0; font-family: var(--font-body); font-size: 17px; font-weight: 600; color: var(--text-primary); cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center;">
          {QUESTION}
          <span style="font-size: 24px; color: var(--text-secondary); transition: transform 0.2s;">+</span>
        </summary>
        <div style="padding: 0 0 20px; font-size: 15px; color: var(--text-secondary); line-height: 1.7;">
          {ANSWER}
        </div>
      </details>
      <!-- Repeat for 5-8 questions -->
    </div>
  </div>
</section>
```

**Design note:** Max width 720px keeps lines readable. 5-8 questions is the sweet spot. Basecamp groups by category (company, security, features) — use grouping for 8+ questions.

---

## 9. Pricing / Buy Box

*Source: ARMRA SPEC-31, Jolie SPEC-30*

```html
<section style="padding: 80px 0; background: var(--bg-primary, #FFF);">
  <div style="max-width: 480px; margin: 0 auto; padding: 0 24px; text-align: center;">
    <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 36px); margin: 0 0 8px;">{PRICING_HEADLINE}</h2>
    <p style="font-size: 15px; color: var(--text-secondary); margin: 0 0 32px;">{PRICING_SUBHEAD}</p>

    <!-- Price Card -->
    <div style="background: var(--bg-secondary, #FAFAFA); border: 2px solid var(--primary); border-radius: var(--radius-lg, 8px); padding: 40px 32px; margin-bottom: 24px;">
      <div style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 16px;">{PLAN_LABEL}</div>
      <div style="display: flex; align-items: baseline; justify-content: center; gap: 8px; margin-bottom: 8px;">
        <span style="font-family: var(--font-heading); font-size: 48px; font-weight: 700; color: var(--text-primary);">{PRICE}</span>
        <span style="font-size: 15px; color: var(--text-secondary);">/ {PERIOD}</span>
      </div>
      <div style="font-size: 14px; color: var(--text-secondary); text-decoration: line-through; margin-bottom: 24px;">{ORIGINAL_PRICE}</div>

      <ul style="list-style: none; padding: 0; margin: 0 0 32px; text-align: left;">
        <li style="padding: 8px 0; font-size: 15px; color: var(--text-secondary); display: flex; gap: 8px;"><span style="color: #22C55E;">&#10003;</span> {FEATURE_1}</li>
        <li style="padding: 8px 0; font-size: 15px; color: var(--text-secondary); display: flex; gap: 8px;"><span style="color: #22C55E;">&#10003;</span> {FEATURE_2}</li>
        <li style="padding: 8px 0; font-size: 15px; color: var(--text-secondary); display: flex; gap: 8px;"><span style="color: #22C55E;">&#10003;</span> {FEATURE_3}</li>
      </ul>

      <button style="width: 100%; padding: 18px; font-size: 17px; font-weight: 700; color: var(--btn-text); background: var(--btn-bg); border: var(--btn-border, none); border-radius: var(--btn-radius, 4px); cursor: pointer;">{CTA_TEXT}</button>
    </div>

    <p style="font-size: 13px; color: var(--text-secondary);">{GUARANTEE_LINE}</p>
  </div>
</section>
```

---

## 10. Founder Story

*Source: ARMRA SPEC-31 (Dr. Sarah Rahal), Basecamp (Jason Fried)*

```html
<section style="padding: 80px 0; background: var(--bg-primary, #FFF);">
  <div style="max-width: 900px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 280px 1fr; gap: 48px; align-items: center;">

    <!-- Founder Image -->
    <div style="border-radius: var(--radius-lg, 8px); overflow: hidden; aspect-ratio: 3/4;">
      <img src="{FOUNDER_IMAGE}" alt="{FOUNDER_NAME}" style="width: 100%; height: 100%; object-fit: cover;" />
    </div>

    <!-- Quote + Bio -->
    <div>
      <blockquote style="font-family: var(--font-body); font-size: 19px; font-style: italic; color: var(--text-primary); line-height: 1.7; margin: 0 0 24px; padding-left: 24px; border-left: 3px solid var(--accent);">
        "{FOUNDER_QUOTE}"
      </blockquote>
      <div>
        <p style="font-weight: 700; font-size: 17px; color: var(--text-primary); margin: 0;">{FOUNDER_NAME}, {CREDENTIALS}</p>
        <p style="font-size: 14px; color: var(--text-secondary); margin: 4px 0 0;">{FOUNDER_TITLE}</p>
      </div>
    </div>
  </div>
</section>
```

**Mobile:** Stacks vertically, image becomes 200px wide centered.

---

## 11. CTA Block

*Source: ARMRA final CTA, Basecamp "It's time" section*

```html
<section style="padding: 80px 0; background: var(--primary); color: var(--bg-primary, #FFF);">
  <div style="max-width: 640px; margin: 0 auto; padding: 0 24px; text-align: center;">
    <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 40px); font-weight: 700; margin: 0 0 16px; color: inherit;">{CTA_HEADLINE}</h2>
    <p style="font-size: 18px; opacity: 0.85; line-height: 1.6; margin: 0 0 32px;">{CTA_SUBHEAD}</p>
    <a href="#" style="display: inline-flex; align-items: center; padding: 18px 40px; font-size: 17px; font-weight: 700; color: var(--primary); background: var(--bg-primary, #FFF); border-radius: var(--btn-radius, 4px); text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px;">{CTA_BUTTON_TEXT}</a>
  </div>
</section>
```

**Design note:** Inverted colors (brand color background, white text/button). Creates strong visual break. Place after testimonials or proof section.

---

## 12. Guarantee Block

*Source: Performance Golf 365-day, Jolie 60-day*

```html
<section style="padding: 60px 0; background: var(--bg-secondary, #FAFAFA);">
  <div style="max-width: 640px; margin: 0 auto; padding: 0 24px; text-align: center;">
    <div style="width: 72px; height: 72px; margin: 0 auto 20px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px;">&#128737;</div>
    <h3 style="font-family: var(--font-heading); font-size: 24px; font-weight: 700; margin: 0 0 12px;">{GUARANTEE_HEADLINE}</h3>
    <p style="font-size: 16px; color: var(--text-secondary); line-height: 1.7; margin: 0;">{GUARANTEE_BODY}</p>
  </div>
</section>
```

---

## 13. Bonus Value Stack

*Source: Performance Golf Click Stick ($788 in bonuses)*

```html
<section style="padding: 80px 0; background: var(--bg-primary, #FFF);">
  <div style="max-width: 720px; margin: 0 auto; padding: 0 24px;">
    <h2 style="font-family: var(--font-heading); font-size: var(--h2-size, 36px); text-align: center; margin: 0 0 48px;">{BONUS_HEADLINE}</h2>

    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Bonus Item -->
      <div style="display: grid; grid-template-columns: 80px 1fr; gap: 20px; padding: 24px; background: var(--bg-secondary, #FAFAFA); border-radius: var(--radius-lg, 8px); border-left: 4px solid var(--accent);">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary);">Bonus</span>
          <span style="font-family: var(--font-heading); font-size: 28px; font-weight: 700; color: var(--primary);">#{BONUS_NUMBER}</span>
        </div>
        <div>
          <h4 style="font-size: 17px; font-weight: 700; color: var(--text-primary); margin: 0 0 4px;">{BONUS_TITLE} <span style="font-size: 14px; font-weight: 400; color: var(--text-secondary);">(Worth {BONUS_VALUE})</span></h4>
          <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.6; margin: 0;">{BONUS_DESCRIPTION}</p>
        </div>
      </div>
      <!-- Repeat for each bonus -->
    </div>

    <!-- Total Value -->
    <div style="text-align: center; margin-top: 32px; padding: 20px; background: var(--accent); border-radius: var(--radius-lg, 8px);">
      <span style="font-size: 15px; color: var(--text-secondary);">Total Bonus Value: </span>
      <span style="font-family: var(--font-heading); font-size: 28px; font-weight: 700; color: var(--text-primary);">{TOTAL_VALUE}</span>
    </div>
  </div>
</section>
```

---

## Section Background Rhythm Guide

Never use the same background for consecutive sections. Follow this alternation pattern:

```
Section 1 (Hero):          var(--bg-primary)     #FFF
Section 2 (Media Bar):     border-top/bottom     #FFF
Section 3 (Benefits):      var(--bg-secondary)   #FAFAFA
Section 4 (Proof/Data):    var(--bg-primary)      #FFF
Section 5 (Testimonials):  var(--bg-secondary)   #FAFAFA
Section 6 (Comparison):    var(--bg-primary)      #FFF
Section 7 (FAQ):           var(--bg-secondary)   #FAFAFA
Section 8 (CTA):           var(--primary)         Brand color
Section 9 (Guarantee):     var(--bg-secondary)   #FAFAFA
```

---

*This file is Tier 2 of the Code Specimen Architecture. See design-tokens-reference.md for Tier 1 (brand tokens) and specimen-section-extracts.md for Tier 3 (unique interactive patterns).*
