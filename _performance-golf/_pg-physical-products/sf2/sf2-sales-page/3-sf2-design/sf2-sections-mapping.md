# SF2 Sales Page Sections Mapping

> **Purpose:** Complete mapping of 19 SF2 optimal sections to PG Shopify sections with implementation instructions
> **Created:** 2025-01-31
> **Status:** Implementation Reference

---

## Quick Reference: Section Mapping Summary

| # | SF2 Optimal Section | Best Match PG Section | Status | Priority |
|---|---------------------|----------------------|--------|----------|
| 1 | Sticky Header / Announcement Bar | PG Header Anchor Links | ENHANCE | HIGH |
| 2 | Hero / Above The Fold | PG PDP Hero ATF | ENHANCE (major) | HIGH |
| 3 | Problem Agitation | PG Problem | ✅ DONE | MEDIUM |
| 4 | Mechanism / Named Technology | PG Feature | ADAPT | MEDIUM |
| 5 | Technology Features | PG Feature (multi-use) | ✅ DONE | MEDIUM |
| 6 | What to Expect Timeline | pg-what-to-expect-timeline.liquid | ✅ CREATED | HIGH |
| 7 | Use Case Scenarios | PG Product Proof | ADAPT | MEDIUM |
| 8 | Target Audience / Pain Data | PG Problem + PG Feature | COMBINE | LOW |
| 9 | Expert Credibility | PG Guru | ✅ DONE | HIGH |
| 10 | Digital Bonus Stack | pg-digital-bonus-stack.liquid | ✅ CREATED | OPTIONAL |
| 11 | Mid-Page CTA + Pricing | PG Urgency | ADAPT | MEDIUM |
| 12 | How to Use Section | C-How It Works | ADAPT | LOW |
| 13 | Social Proof / Testimonials | PG UGC Carousel + PG Text Testimonials | USE AS-IS | LOW |
| 14 | Guarantee / Risk Reversal | PG Guarantee | USE AS-IS | LOW |
| 15 | Challenge Section | pg-challenge-section.liquid | ✅ CREATED | HIGH |
| 16 | Category Creation / Positioning | pg-us-vs-them.liquid | ✅ CREATED | HIGH |
| 17 | Specifications + Fitting | PG Product Specifications | ✅ DONE | MEDIUM |
| 18 | Final CTA Block | PG Urgency | ADAPT | MEDIUM |
| 19 | FAQ + Footer | PG FAQs + Standard Footer | USE AS-IS | LOW |

---

## Status Legend

| Status | Meaning | Work Required |
|--------|---------|---------------|
| **USE AS-IS** | Existing section meets all requirements | Configure in customizer only |
| **ADAPT** | Existing section needs content/config changes | Minor customizer adjustments |
| **ENHANCE** | Existing section needs new features | Code modifications required |
| **COMBINE** | Multiple sections used together | Strategic page placement |
| **CREATE** | No equivalent exists | Build new section from scratch |

---

## Implementation Approach

### The Hybrid Approach: Blank Defaults + Page JSON Values

This project uses a **hybrid approach** for implementing SF2-specific content while protecting existing pages (One Wedge, PG Test, etc.) from unintended changes.

#### Why Blank Schema Defaults?

Schema settings with hardcoded default values would affect **every page** using that section. For example, if we put `"LIMITED TIME: Save $100"` as a default in `pg-header-anchor-links.liquid`, that text would appear on:
- One Wedge sales page
- PG Test page
- Any other page using this section

**This is not what we want.**

#### The Solution: Page Template JSON

Instead, we use two layers:

1. **Section Schema (`.liquid` files):** Contains blank/empty defaults
   ```liquid
   {
     "type": "html",
     "id": "announcement_text",
     "label": "Announcement text",
     "default": ""
   }
   ```

2. **Page Template JSON (`templates/page.sf2-sales-page.json`):** Contains SF2-specific values
   ```json
   {
     "sections": {
       "header": {
         "type": "pg-header-anchor-links",
         "settings": {
           "announcement_text": "<b>LIMITED TIME:</b> Save $100 with code LAUNCH100"
         }
       }
     }
   }
   ```

#### How It Works

- When you add a section to the SF2 page, Shopify looks for values in the page JSON first
- If values exist in the JSON, those are used (SF2-specific content)
- If no values exist in the JSON, the schema defaults are used (blank)
- Existing pages are unaffected because they don't have SF2 values in their JSON

#### Document Structure

For each section in this document:
- **Schema Structure** — Shows the settings to add to the `.liquid` file (blank defaults)
- **SF2 Content Values** — Lists the SF2-specific values that go in the page template JSON


# SECTION 1: Sticky Header / Announcement Bar

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Sticky Header / Announcement Bar |
| **PG Match** | `pg-header-anchor-links.liquid` |
| **Match Type** | ENHANCE |
| **SF2 Priority** | PG-UNIQUE + NLS |

## Current Capabilities (PG Header Anchor Links)

The existing section provides:
- ✅ Sticky navigation behavior
- ✅ Logo display with link
- ✅ CTA button (customizable text/link)
- ✅ Anchor link navigation (up to 6 links)
- ✅ Mobile hamburger menu
- ✅ Responsive breakpoints
- ✅ Dark/light theme toggle

## Gap Analysis

| SF2 Requirement | Current Status | Gap |
|-----------------|----------------|-----|
| Rotating announcement messages | ❌ Missing | Need carousel/rotation functionality |
| Urgency timer in header | ❌ Missing | Add countdown integration |
| Promo code display | ❌ Missing | Add text field for code |
| Social proof snippet | ❌ Missing | Add review count/star display |
| Exit-intent behavior | ❌ Missing | Advanced JS trigger |

## Implementation Instructions

### Option A: Use Existing Section + Separate Announcement Bar

If keeping the existing header simple, use the **Shopify Announcement Bar** (theme setting) above `pg-header-anchor-links`:

**Customizer Path:** `Online Store → Customize → Theme Settings → Announcement Bar`

Settings to configure:
- Enable announcement bar
- Set announcement text: `"🔥 LIMITED TIME: Save $100 with code LAUNCH100 | Free Shipping + 60-Day Trial"`
- Background color: `#FD3300` (--pg-orange)
- Text color: `#FCFAFA` (--pg-mist)

### Option B: Enhance PG Header Anchor Links (Recommended)

Add announcement bar functionality directly into the section:

**New Schema Settings to Add:**

```liquid
{
  "type": "header",
  "content": "Announcement Bar"
},
{
  "type": "checkbox",
  "id": "show_announcement",
  "label": "Show announcement bar",
  "default": true
},
{
  "type": "html",
  "id": "announcement_text",
  "label": "Announcement text",
  "default": ""
},
{
  "type": "color",
  "id": "announcement_bg",
  "label": "Announcement background",
  "default": "#FD3300"
},
{
  "type": "color",
  "id": "announcement_text_color",
  "label": "Announcement text color",
  "default": "#FCFAFA"
},
{
  "type": "checkbox",
  "id": "announcement_rotating",
  "label": "Enable rotating messages",
  "default": false
},
{
  "type": "textarea",
  "id": "announcement_messages",
  "label": "Rotating messages (one per line)",
  "info": "Only used when rotating is enabled"
}
```

**CSS Classes to Add:**
```css
.pg-header-anchor-links__announcement { }
.pg-header-anchor-links__announcement-text { }
.pg-header-anchor-links__announcement--rotating { }
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 2: Hero / Above The Fold

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Hero / Above The Fold |
| **PG Match** | `pg-pdp-hero-atf.liquid` |
| **Match Type** | ENHANCE (major) |
| **SF2 Priority** | HYBRID (OEM + PG + DTC + NLS) |
| **Components** | 21 total |

## Current Capabilities (PG PDP Hero ATF)

The existing section provides:
- ✅ Two-column layout (media left, content right)
- ✅ Image gallery with 10 thumbnail slots
- ✅ Primary product image display
- ✅ Hand selector (Left/Right toggle)
- ✅ Loft selector (9°, 10.5°, 12° options)
- ✅ Multi-loft selection (NEW)
- ✅ Compare price / sale price display
- ✅ CTA button (Add to Cart)
- ✅ Checklist items (icon + text)
- ✅ Desktop/mobile responsive
- ✅ Trust badges display

## Gap Analysis

| SF2 Requirement | Current Status | Gap |
|-----------------|----------------|-----|
| Multi-part headline (4 lines) | ⚠️ Partial | Need styled line variants |
| Category label above headline | ❌ Missing | Add eyebrow text field |
| Star rating + review count | ❌ Missing | Add rating display |
| Price savings callout | ⚠️ Partial | Need "Save $XX" calculation |
| 10-thumbnail grid | ⚠️ Partial | Currently 5 slots, need expansion |
| Video thumbnail support | ❌ Missing | Add video modal trigger |
| Mobile sticky CTA | ❌ Missing | Add fixed bottom bar |
| Quick facts panel | ❌ Missing | Add collapsible specs |
| Guarantee badge inline | ⚠️ Partial | In checklist, need prominent badge |
| Urgency indicator | ❌ Missing | Add stock/timer display |

## Implementation Instructions

### Customizer Settings (Current Capabilities)

**Section Path:** `PG PDP Hero ATF`

**Content Settings:**
- Eyebrow text: `"THE #1 SELLING DRIVER IN GOLF"`
- Headline Part 1: `"The SF2 Driver"`
- Headline Part 2: `"Engineered for"`
- Headline Part 3: `"Distance"`
- Body text: Product description
- Product: Select SF2 Driver product

**Gallery Settings:**
- Image 1: Hero product shot (front angle)
- Image 2: Back view
- Image 3: Address position
- Image 4: Lifestyle shot
- Image 5: Technology callout

**Checklist Items:**
- Item 1: `"✓ Free Shipping"`
- Item 2: `"✓ 365-Day Risk-Free Trial"`
- Item 3: `"✓ Lifetime Warranty"`

### Schema Enhancements Needed

**New Settings to Add:**

```liquid
{
  "type": "header",
  "content": "Eyebrow / Category Label"
},
{
  "type": "text",
  "id": "eyebrow_text",
  "label": "Eyebrow text",
  "default": ""
},
{
  "type": "color",
  "id": "eyebrow_color",
  "label": "Eyebrow color",
  "default": "#FD3300"
},
{
  "type": "header",
  "content": "Social Proof"
},
{
  "type": "range",
  "id": "rating_stars",
  "label": "Star rating",
  "min": 0,
  "max": 5,
  "step": 0.1,
  "default": 4.8
},
{
  "type": "text",
  "id": "review_count",
  "label": "Review count text",
  "default": ""
},
{
  "type": "header",
  "content": "Mobile Sticky CTA"
},
{
  "type": "checkbox",
  "id": "show_mobile_sticky",
  "label": "Show mobile sticky CTA bar",
  "default": true
},
{
  "type": "text",
  "id": "mobile_sticky_text",
  "label": "Sticky bar text",
  "default": ""
}
```

**Expand Gallery to 10 Thumbnails:**
```liquid
{
  "type": "header",
  "content": "Gallery Images (1-10)"
},
{% for i in (1..10) %}
{
  "type": "image_picker",
  "id": "gallery_image_{{ i }}",
  "label": "Gallery image {{ i }}"
},
{% endfor %}
{
  "type": "video_url",
  "id": "gallery_video",
  "label": "Gallery video URL",
  "accept": ["youtube", "vimeo"],
  "info": "Displays as thumbnail with play icon"
}
```

**CSS Classes to Add:**
```css
.pg-pdp-hero-atf__eyebrow { }
.pg-pdp-hero-atf__rating { }
.pg-pdp-hero-atf__rating-stars { }
.pg-pdp-hero-atf__rating-count { }
.pg-pdp-hero-atf__mobile-sticky { }
.pg-pdp-hero-atf__gallery--expanded { }
.pg-pdp-hero-atf__thumbnail--video { }
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 3: Problem Agitation

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Problem Agitation |
| **PG Match** | `pg-problem.liquid` |
| **Match Type** | ✅ DONE |
| **SF2 Priority** | PG-UNIQUE |
| **Components** | 5 total |
| **Enhancement** | Added agitation bullet list (show_bullet_list, agitation_bullets) |

## Current Capabilities (PG Problem)

The existing section provides:
- ✅ Two-column layout (stat left, content right or reversed)
- ✅ Large animated statistic with count-up effect
- ✅ Stat label text
- ✅ Headline + body copy
- ✅ Supporting media (image/video)
- ✅ Background color options
- ✅ Desktop/mobile typography controls

## Gap Analysis

| SF2 Requirement | Current Status | Gap |
|-----------------|----------------|-----|
| Problem statement headline | ✅ Available | Use headline field |
| Agitation copy (pain expansion) | ✅ Available | Use body field |
| Statistical proof point | ✅ Available | Use animated stat |
| Visual representation | ✅ Available | Use media slot |
| Emotional trigger language | ⚠️ Content only | No structural gap |

## Implementation Instructions

### Customizer Settings

**Section Path:** `PG Problem`

**Content Configuration:**
- Statistic number: `87`
- Statistic suffix: `%`
- Statistic label: `"of amateur golfers lose distance off the tee due to outdated driver technology"`
- Headline: `"Your Driver Is Costing You Distance"`
- Body:
  ```
  That driver in your bag? It was designed for tour pros with 115+ mph swing speeds.

  For the average golfer swinging 85-95 mph, traditional drivers create:
  • Lower launch angles that kill carry distance
  • Excessive spin that balloons your shots
  • Gear effect that punishes off-center hits

  The result? You're leaving 20-30 yards on the table every single drive.
  ```
- Media: Image of frustrated golfer or comparison graphic

**Layout Settings:**
- Layout direction: `"Media Right"` (stat + content left, image right)
- Background: `--pg-mist` (#FCFAFA)

**Typography - Desktop:**
- Stat size: `72px` (--pg-text-7xl)
- Headline size: `48px` (--pg-text-5xl)
- Body size: `18px` (--pg-text-lg)

**Typography - Mobile:**
- Stat size: `48px` (--pg-text-5xl)
- Headline size: `30px` (--pg-text-3xl)
- Body size: `16px` (--pg-text-base)

### Schema Enhancements Needed

**Add for SF2:**
```liquid
{
  "type": "header",
  "content": "Agitation Points"
},
{
  "type": "checkbox",
  "id": "show_bullet_list",
  "label": "Show bullet point list",
  "default": true
},
{
  "type": "textarea",
  "id": "agitation_bullets",
  "label": "Agitation bullet points (one per line)",
  "default": ""
}
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 4: Mechanism / Named Technology

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | The Mechanism / Named Technology |
| **PG Match** | `pg-feature.liquid` |
| **Match Type** | ADAPT |
| **SF2 Priority** | HYBRID (OEM + PG) |
| **Components** | 7 total |

## Current Capabilities (PG Feature)

The existing section provides:
- ✅ Two-column layout (50/50 desktop, stacked mobile)
- ✅ Large headline
- ✅ Body copy with rich text
- ✅ Feature image (left or right placement)
- ✅ CTA button (optional)
- ✅ Background color options
- ✅ Image effects (shadow, border radius)

## Gap Analysis

| SF2 Requirement | Current Status | Gap |
|-----------------|----------------|-----|
| Technology name (branded) | ⚠️ Partial | Use headline, may need trademark styling |
| Technical explanation | ✅ Available | Use body copy |
| Visual diagram/illustration | ✅ Available | Use feature image |
| Science-backed claim | ✅ Available | Include in body |
| Patent/trademark indicator | ❌ Missing | Need superscript support |
| Animation/interaction | ❌ Missing | Consider for enhancement |

## Implementation Instructions

### Customizer Settings

**Section Path:** `PG Feature`

**Content Configuration:**
- Headline: `"SpeedFrame™ Technology"`
- Subheadline: `"The Secret to Effortless Distance"`
- Body:
  ```html
  <p>Traditional drivers waste energy at impact. SpeedFrame™ changes everything.</p>

  <p>Our patented frame design features a <b>flexible perimeter</b> that compresses and rebounds at impact, transferring maximum energy to the ball.</p>

  <p>The result: <b>Higher ball speeds</b> even on off-center hits. More distance without swinging harder.</p>
  ```
- Image: SpeedFrame technology diagram/explainer graphic
- CTA: Leave empty (no button for this section)

**Layout Settings:**
- Image position: `"Left"`
- Background: `--pg-fog` (#F4F2F0)

**Typography - Desktop:**
- Headline size: `48px` (--pg-text-5xl)
- Body size: `18px` (--pg-text-lg)

### Usage Notes

Use multiple `PG Feature` sections in sequence for additional technology callouts:
- SpeedFrame™ Technology
- OptiFace™ Design
- AeroSole™ Construction

Each should alternate image left/right for visual rhythm.


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 5: Technology Features

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Technology Features |
| **PG Match** | `pg-feature.liquid` (multi-use) |
| **Match Type** | ✅ DONE |
| **SF2 Priority** | HYBRID (OEM + PG + GAP FIX) |
| **Components** | 11 total |
| **Enhancement** | Added feature list with icons (show_feature_list, feature_list_columns, feature_item blocks) |

## Current Capabilities (PG Feature)

Same as Section 4 — using multiple instances.

## Gap Analysis

| SF2 Requirement | Current Status | Gap |
|-----------------|----------------|-----|
| Multiple feature cards | ⚠️ Partial | Use multiple sections |
| Icon-based feature list | ❌ Missing | Need icon support |
| Comparison to competitors | ❌ Missing | Covered in Section 16 |
| Technical specifications inline | ❌ Missing | Covered in Section 17 |
| Video demonstrations | ⚠️ Partial | Can use video in media slot |

## Implementation Instructions

### Page Structure

Use 3-4 `PG Feature` sections in sequence:

**Feature 1: Launch Optimization**
- Headline: `"Optimized Launch Angle"`
- Body: Explanation of higher launch for amateur swing speeds
- Image: Launch angle comparison graphic
- Position: Image Left
- Background: `--pg-mist`

**Feature 2: Spin Reduction**
- Headline: `"Reduced Spin. Maximum Carry."`
- Body: Explanation of spin reduction technology
- Image: Spin rate comparison or ball flight graphic
- Position: Image Right
- Background: `--pg-fog`

**Feature 3: Forgiveness**
- Headline: `"Forgiveness That Performs"`
- Body: MOI and gear effect explanation
- Image: Sweet spot heat map graphic
- Position: Image Left
- Background: `--pg-mist`

**Feature 4: Sound & Feel**
- Headline: `"Tour-Quality Sound & Feel"`
- Body: Premium materials and acoustic engineering
- Image: Material cross-section or lifestyle shot
- Position: Image Right
- Background: `--pg-fog`

### Schema Enhancement for Feature Icons

**Add to PG Feature schema:**
```liquid
{
  "type": "header",
  "content": "Feature List"
},
{
  "type": "checkbox",
  "id": "show_feature_list",
  "label": "Show feature list with icons",
  "default": false
},
{
  "type": "range",
  "id": "feature_list_columns",
  "label": "Feature list columns",
  "min": 1,
  "max": 3,
  "step": 1,
  "default": 2
}
```

**Block type to add:**
```liquid
{
  "type": "feature_item",
  "name": "Feature Item",
  "settings": [
    {
      "type": "text",
      "id": "feature_icon",
      "label": "Icon (emoji or SVG)",
      "default": "✓"
    },
    {
      "type": "text",
      "id": "feature_text",
      "label": "Feature text",
      "default": "Feature description"
    }
  ]
}
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 6: What to Expect Timeline

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | What to Expect Timeline |
| **PG Match** | `pg-what-to-expect-timeline.liquid` |
| **Match Type** | ✅ CREATED |
| **SF2 Priority** | NLS HIGH PRIORITY |
| **Components** | 8 total |

## Purpose

This section addresses the NLS research priority: setting clear expectations for product experience. Shows users what they'll experience at different time intervals after receiving the SF2 Driver.

## Components Required

1. **Section headline** — "What to Expect"
2. **Section subheadline** — Supportive context
3. **Timeline container** — Horizontal progression (desktop), vertical (mobile)
4. **Phase cards (5 total)**:
   - Phase 1: Day 1 (Unboxing)
   - Phase 2: Week 1 (First Rounds)
   - Phase 3: Week 2-4 (Adjustment Period)
   - Phase 4: Month 2 (Confidence Building)
   - Phase 5: Month 3+ (Full Performance)
5. **Phase card components**:
   - Time indicator (e.g., "Day 1")
   - Phase title
   - Description
   - Testimonial snippet (optional)
6. **Progress connector** — Visual line connecting phases
7. **Background options** — Color/image
8. **CTA** — Optional button at end

## Implementation Instructions

### File Creation

**File:** `sections/pg-what-to-expect-timeline.liquid`

### Schema Structure

```liquid
{% schema %}
{
  "name": "PG What to Expect Timeline",
  "tag": "section",
  "class": "pg-what-to-expect-timeline",
  "settings": [
    {
      "type": "header",
      "content": "Global Settings"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background color",
      "default": "#FCFAFA"
    },
    {
      "type": "color",
      "id": "card_background",
      "label": "Card background color",
      "default": "#FFFFFF"
    },
    {
      "type": "color",
      "id": "accent_color",
      "label": "Accent color (timeline)",
      "default": "#FD3300"
    },
    {
      "type": "header",
      "content": "Content"
    },
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow text",
      "default": ""
    },
    {
      "type": "text",
      "id": "headline",
      "label": "Headline",
      "default": ""
    },
    {
      "type": "textarea",
      "id": "subheadline",
      "label": "Subheadline",
      "default": ""
    },
    {
      "type": "header",
      "content": "Typography - Desktop"
    },
    {
      "type": "range",
      "id": "headline_size_desktop",
      "label": "Headline size",
      "min": 24,
      "max": 72,
      "step": 4,
      "default": 48,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "subheadline_size_desktop",
      "label": "Subheadline size",
      "min": 14,
      "max": 24,
      "step": 2,
      "default": 18,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "phase_title_size_desktop",
      "label": "Phase title size",
      "min": 16,
      "max": 32,
      "step": 2,
      "default": 20,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Typography - Mobile"
    },
    {
      "type": "range",
      "id": "headline_size_mobile",
      "label": "Headline size",
      "min": 20,
      "max": 48,
      "step": 4,
      "default": 32,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "subheadline_size_mobile",
      "label": "Subheadline size",
      "min": 14,
      "max": 20,
      "step": 2,
      "default": 16,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Spacing - Desktop"
    },
    {
      "type": "range",
      "id": "padding_top_desktop",
      "label": "Padding top",
      "min": 0,
      "max": 200,
      "step": 4,
      "default": 80,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "padding_bottom_desktop",
      "label": "Padding bottom",
      "min": 0,
      "max": 200,
      "step": 4,
      "default": 80,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Spacing - Mobile"
    },
    {
      "type": "range",
      "id": "padding_top_mobile",
      "label": "Padding top",
      "min": 0,
      "max": 120,
      "step": 4,
      "default": 48,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "padding_bottom_mobile",
      "label": "Padding bottom",
      "min": 0,
      "max": 120,
      "step": 4,
      "default": 48,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "CTA Button"
    },
    {
      "type": "checkbox",
      "id": "show_cta",
      "label": "Show CTA button",
      "default": false
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA text",
      "default": ""
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "CTA link"
    }
  ],
  "blocks": [
    {
      "type": "phase",
      "name": "Timeline Phase",
      "settings": [
        {
          "type": "text",
          "id": "time_indicator",
          "label": "Time indicator",
          "default": ""
        },
        {
          "type": "text",
          "id": "phase_title",
          "label": "Phase title",
          "default": ""
        },
        {
          "type": "textarea",
          "id": "phase_description",
          "label": "Phase description",
          "default": ""
        },
        {
          "type": "image_picker",
          "id": "phase_icon",
          "label": "Phase icon (optional)"
        },
        {
          "type": "text",
          "id": "testimonial_quote",
          "label": "Testimonial snippet (optional)"
        },
        {
          "type": "text",
          "id": "testimonial_author",
          "label": "Testimonial author"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "PG What to Expect Timeline",
      "blocks": [
        {
          "type": "phase",
          "settings": {
            "time_indicator": "",
            "phase_title": "",
            "phase_description": ""
          }
        },
        {
          "type": "phase",
          "settings": {
            "time_indicator": "",
            "phase_title": "",
            "phase_description": ""
          }
        },
        {
          "type": "phase",
          "settings": {
            "time_indicator": "",
            "phase_title": "",
            "phase_description": ""
          }
        },
        {
          "type": "phase",
          "settings": {
            "time_indicator": "",
            "phase_title": "",
            "phase_description": ""
          }
        },
        {
          "type": "phase",
          "settings": {
            "time_indicator": "",
            "phase_title": "",
            "phase_description": ""
          }
        }
      ]
    }
  ]
}
{% endschema %}
```

### HTML Structure

```liquid
<section class="pg-what-to-expect-timeline" style="
  --timeline-bg: {{ section.settings.background_color }};
  --timeline-card-bg: {{ section.settings.card_background }};
  --timeline-accent: {{ section.settings.accent_color }};
  --timeline-padding-top-desktop: {{ section.settings.padding_top_desktop }}px;
  --timeline-padding-bottom-desktop: {{ section.settings.padding_bottom_desktop }}px;
  --timeline-padding-top-mobile: {{ section.settings.padding_top_mobile }}px;
  --timeline-padding-bottom-mobile: {{ section.settings.padding_bottom_mobile }}px;
">
  <div class="pg-what-to-expect-timeline__container">
    <!-- Header -->
    <div class="pg-what-to-expect-timeline__header">
      {% if section.settings.eyebrow != blank %}
        <span class="pg-what-to-expect-timeline__eyebrow">{{ section.settings.eyebrow }}</span>
      {% endif %}
      <h2 class="pg-what-to-expect-timeline__headline">{{ section.settings.headline }}</h2>
      {% if section.settings.subheadline != blank %}
        <p class="pg-what-to-expect-timeline__subheadline">{{ section.settings.subheadline }}</p>
      {% endif %}
    </div>

    <!-- Timeline -->
    <div class="pg-what-to-expect-timeline__track">
      <div class="pg-what-to-expect-timeline__line"></div>
      <div class="pg-what-to-expect-timeline__phases">
        {% for block in section.blocks %}
          <div class="pg-what-to-expect-timeline__phase" {{ block.shopify_attributes }}>
            <div class="pg-what-to-expect-timeline__phase-marker">
              <span class="pg-what-to-expect-timeline__phase-dot"></span>
            </div>
            <div class="pg-what-to-expect-timeline__phase-card">
              <span class="pg-what-to-expect-timeline__phase-time">{{ block.settings.time_indicator }}</span>
              <h3 class="pg-what-to-expect-timeline__phase-title">{{ block.settings.phase_title }}</h3>
              <p class="pg-what-to-expect-timeline__phase-description">{{ block.settings.phase_description }}</p>
              {% if block.settings.testimonial_quote != blank %}
                <blockquote class="pg-what-to-expect-timeline__phase-testimonial">
                  <p>"{{ block.settings.testimonial_quote }}"</p>
                  {% if block.settings.testimonial_author != blank %}
                    <cite>— {{ block.settings.testimonial_author }}</cite>
                  {% endif %}
                </blockquote>
              {% endif %}
            </div>
          </div>
        {% endfor %}
      </div>
    </div>

    <!-- CTA -->
    {% if section.settings.show_cta and section.settings.cta_text != blank %}
      <div class="pg-what-to-expect-timeline__cta">
        <a href="{{ section.settings.cta_link }}" class="pg-what-to-expect-timeline__button">
          {{ section.settings.cta_text }}
        </a>
      </div>
    {% endif %}
  </div>
</section>
```

### CSS Structure

```css
.pg-what-to-expect-timeline {
  background-color: var(--timeline-bg);
  padding-top: var(--timeline-padding-top-mobile);
  padding-bottom: var(--timeline-padding-bottom-mobile);
}

@media (min-width: 1024px) {
  .pg-what-to-expect-timeline {
    padding-top: var(--timeline-padding-top-desktop);
    padding-bottom: var(--timeline-padding-bottom-desktop);
  }
}

.pg-what-to-expect-timeline__container {
  max-width: var(--pg-container-xl);
  margin: 0 auto;
  padding: 0 var(--pg-space-md);
}

.pg-what-to-expect-timeline__header {
  text-align: center;
  margin-bottom: var(--pg-space-2xl);
}

.pg-what-to-expect-timeline__eyebrow {
  font-family: var(--pg-font-mono);
  font-size: var(--pg-text-xs);
  letter-spacing: var(--pg-tracking-widest);
  text-transform: uppercase;
  color: var(--timeline-accent);
  display: block;
  margin-bottom: var(--pg-space-sm);
}

.pg-what-to-expect-timeline__headline {
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-5xl);
  line-height: 1.0;
  letter-spacing: var(--pg-tracking-tighter);
  color: var(--pg-black);
  margin: 0;
}

.pg-what-to-expect-timeline__subheadline {
  font-family: var(--pg-font-display);
  font-size: var(--pg-text-lg);
  color: var(--pg-ui-gray);
  margin-top: var(--pg-space-md);
}

/* Timeline Track */
.pg-what-to-expect-timeline__track {
  position: relative;
}

.pg-what-to-expect-timeline__line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: var(--pg-stone);
}

@media (min-width: 1024px) {
  .pg-what-to-expect-timeline__line {
    top: 24px;
    left: 0;
    right: 0;
    width: 100%;
    height: 2px;
    transform: none;
  }
}

.pg-what-to-expect-timeline__phases {
  display: flex;
  flex-direction: column;
  gap: var(--pg-space-xl);
}

@media (min-width: 1024px) {
  .pg-what-to-expect-timeline__phases {
    flex-direction: row;
    justify-content: space-between;
  }
}

.pg-what-to-expect-timeline__phase {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pg-what-to-expect-timeline__phase-marker {
  position: relative;
  z-index: 1;
}

.pg-what-to-expect-timeline__phase-dot {
  display: block;
  width: 16px;
  height: 16px;
  background: var(--timeline-accent);
  border: 3px solid var(--timeline-bg);
  border-radius: var(--pg-radius-full);
}

.pg-what-to-expect-timeline__phase-card {
  background: var(--timeline-card-bg);
  border-radius: var(--pg-radius-md);
  padding: var(--pg-space-lg);
  box-shadow: var(--pg-shadow);
  text-align: center;
  margin-top: var(--pg-space-md);
  max-width: 280px;
}

.pg-what-to-expect-timeline__phase-time {
  font-family: var(--pg-font-mono);
  font-size: var(--pg-text-sm);
  color: var(--timeline-accent);
  font-weight: 600;
}

.pg-what-to-expect-timeline__phase-title {
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-xl);
  color: var(--pg-black);
  margin: var(--pg-space-xs) 0;
}

.pg-what-to-expect-timeline__phase-description {
  font-family: var(--pg-font-display);
  font-size: var(--pg-text-sm);
  color: var(--pg-ui-gray);
  line-height: 1.5;
  margin: 0;
}

.pg-what-to-expect-timeline__phase-testimonial {
  margin-top: var(--pg-space-md);
  padding-top: var(--pg-space-md);
  border-top: 1px solid var(--pg-pebble);
  font-style: italic;
  font-size: var(--pg-text-sm);
  color: var(--pg-ui-gray);
}

.pg-what-to-expect-timeline__phase-testimonial cite {
  display: block;
  font-style: normal;
  font-weight: 600;
  margin-top: var(--pg-space-xs);
}

/* CTA */
.pg-what-to-expect-timeline__cta {
  text-align: center;
  margin-top: var(--pg-space-2xl);
}

.pg-what-to-expect-timeline__button {
  display: inline-block;
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-base);
  font-weight: 600;
  letter-spacing: var(--pg-tracking-wider);
  text-transform: uppercase;
  background: var(--pg-orange);
  color: var(--pg-mist);
  padding: var(--pg-space-md) var(--pg-space-xl);
  border-radius: var(--pg-radius);
  text-decoration: none;
  transition: background var(--pg-transition-base);
}

.pg-what-to-expect-timeline__button:hover {
  background: var(--pg-dark-orange);
}
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 7: Use Case Scenarios

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Use Case Scenarios |
| **PG Match** | `pg-product-proof.liquid` |
| **Match Type** | ADAPT |
| **SF2 Priority** | PG-UNIQUE |
| **Components** | 6 total |

## Current Capabilities (PG Product Proof)

The existing section provides:
- ✅ Carousel of proof cards
- ✅ Typewriter headline effect
- ✅ Card with image/video
- ✅ Card title and description
- ✅ Pagination controls
- ✅ Background options

## Gap Analysis

| SF2 Requirement | Current Status | Gap |
|-----------------|----------------|-----|
| Scenario headline | ✅ Available | Use card title |
| Scenario description | ✅ Available | Use card description |
| Visual representation | ✅ Available | Use card image/video |
| Course situation context | ⚠️ Partial | Content strategy, not structural |
| Before/after comparison | ❌ Missing | Would need new component |

## Implementation Instructions

### Customizer Settings

**Section Path:** `PG Product Proof`

**Content Configuration:**
- Section headline: `"Every Situation. Every Hole."`
- Headline effect: Enable typewriter animation

**Scenario Cards to Create (as blocks):**

**Card 1: Long Par 4**
- Title: `"The Daunting 420-Yard Par 4"`
- Description: `"Your buddies are laying up with hybrids. You're pulling driver with confidence, knowing your SF2 will find the fairway and set up a short iron approach."`
- Image: Long fairway shot

**Card 2: Tight Fairway**
- Title: `"Trees on Both Sides"`
- Description: `"Where others fear going OB, you trust the SF2's forgiveness. Even a slight mis-hit stays in play thanks to the expanded sweet spot."`
- Image: Tree-lined fairway

**Card 3: Par 5 Opportunity**
- Title: `"The Reachable Par 5"`
- Description: `"550 yards used to mean three shots. With your SF2, you're looking at eagle putts regularly thanks to those extra 20-30 yards."`
- Image: Green in two scenario

**Card 4: First Tee Nerves**
- Title: `"All Eyes on You"`
- Description: `"Pressure shot? No problem. The SF2's consistent launch and forgiving face means your warm-up swing is your real swing."`
- Image: First tee with crowd/group


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 8: Target Audience / Pain Data

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Target Audience / Pain Data |
| **PG Match** | `pg-problem.liquid` + `pg-feature.liquid` |
| **Match Type** | COMBINE |
| **SF2 Priority** | HYBRID (OEM + PG + NLS) |
| **Components** | 7 total |

## Current Capabilities

**PG Problem** handles:
- ✅ Statistical pain point
- ✅ Problem headline
- ✅ Agitation copy

**PG Feature** handles:
- ✅ Target persona description
- ✅ "If you..." qualification copy
- ✅ Visual representation

## Gap Analysis

| SF2 Requirement | Current Status | Gap |
|-----------------|----------------|-----|
| Target persona definition | ⚠️ Split across sections | Combine strategically |
| Pain data statistics | ✅ PG Problem | Use stat component |
| "This is for you if..." list | ❌ Missing | Add checklist block |
| Disqualification copy | ❌ Missing | Add "not for you if" |

## Implementation Instructions

### Page Structure Strategy

Use two sections in sequence:

**Part 1: PG Problem (Pain Data)**
- Statistic: `"73"`
- Suffix: `"%"`
- Label: `"of amateur golfers have never been properly fit for a driver"`
- Headline: `"You've Been Playing the Wrong Driver"`
- Body: Statistics and data about how golfers lose distance due to equipment mismatch

**Part 2: PG Feature (Target Persona)**
- Headline: `"The SF2 is Built For You If..."`
- Body with checklist:
  ```html
  <ul>
    <li>✓ Your swing speed is between 80-100 mph</li>
    <li>✓ You want more distance without changing your swing</li>
    <li>✓ You're tired of inconsistent tee shots</li>
    <li>✓ You value performance over brand names</li>
    <li>✓ You're ready to invest in your game</li>
  </ul>
  ```
- Image: Relatable golfer image (not pro tour player)

### Schema Enhancement for Target Audience Checklist

**Add to PG Feature:**
```liquid
{
  "type": "header",
  "content": "Qualification Checklist"
},
{
  "type": "checkbox",
  "id": "show_qualification_list",
  "label": "Show qualification checklist",
  "default": false
},
{
  "type": "textarea",
  "id": "qualification_items",
  "label": "Qualification items (one per line)",
  "info": "Items that describe ideal customer"
}
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 9: Expert Credibility

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Expert Credibility |
| **PG Match** | `pg-guru.liquid` |
| **Match Type** | ✅ DONE |
| **SF2 Priority** | PG-UNIQUE |
| **Components** | 15 total (2 experts) |
| **Enhancement** | Added video testimonial (show_video, video_url, video_thumbnail, video_border_radius) |

## Current Capabilities (PG Guru)

The existing section provides:
- ✅ Expert headshot image
- ✅ Expert name
- ✅ Credentials list (checklist format)
- ✅ Quote/testimonial box
- ✅ Two-column layout
- ✅ Background options

## Gap Analysis

| SF2 Requirement | Current Status | Gap |
|-----------------|----------------|-----|
| Expert headshot | ✅ Available | — |
| Credentials list | ✅ Available | — |
| Expert quote | ✅ Available | — |
| Video testimonial | ❌ Missing | Need video embed option |
| Multiple experts | ⚠️ Partial | Use multiple section instances |
| Product connection | ❌ Missing | Need "why I chose SF2" content |

## Implementation Instructions

### Page Structure

Use two `PG Guru` sections in sequence:

**Expert 1: Chris McGinley**
- Expert image: Chris McGinley headshot
- Name: `"Chris McGinley"`
- Title: `"Master Club Designer"`
- Credentials:
  - `"30+ years designing tour-level equipment"`
  - `"Former head of R&D at [Major OEM]"`
  - `"Designer of 47 tour-winning clubs"`
  - `"Hall of Fame club designer"`
- Quote: `"I've designed drivers for the best players in the world. The SF2 is the first driver I've created specifically for the average golfer's swing. The results speak for themselves."`
- Background: Light (--pg-mist)

**Expert 2: Hank Haney (if applicable)**
- Expert image: Hank Haney headshot
- Name: `"Hank Haney"`
- Title: `"World-Renowned Golf Instructor"`
- Credentials:
  - `"Coach to Tiger Woods (2004-2010)"`
  - `"PGA Teacher of the Year"`
  - `"Taught 200+ tour professionals"`
  - `"Host of The Haney Project"`
- Quote: `"I've seen every swing type imaginable. The SF2 is the only driver I recommend to my amateur students because it's designed for how they actually swing."`
- Background: Alternate (--pg-fog)

### Schema Enhancement for Video

**Add to PG Guru:**
```liquid
{
  "type": "header",
  "content": "Video Testimonial"
},
{
  "type": "checkbox",
  "id": "show_video",
  "label": "Show video testimonial",
  "default": false
},
{
  "type": "video_url",
  "id": "video_url",
  "label": "Video URL",
  "accept": ["youtube", "vimeo"]
},
{
  "type": "image_picker",
  "id": "video_thumbnail",
  "label": "Video thumbnail (optional)"
}
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 10: Digital Bonus Stack

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Digital Bonus Stack |
| **PG Match** | `pg-digital-bonus-stack.liquid` |
| **Match Type** | ✅ CREATED |
| **SF2 Priority** | PG-UNIQUE |
| **Components** | 8 total |
| **Status** | **OPTIONAL** |

## Purpose

Displays bundled digital products/bonuses that come with purchase, with individual and total value callouts. This is a direct response conversion tactic.

**Page Placement:** Between Section 9 (Expert Credibility / PG Guru) and Section 11 (Mid-Page CTA / PG Urgency)

## Components Required

1. **Section headline** — "PLUS: Get These FREE Bonuses"
2. **Value headline** — "Over $XXX in FREE Training & Resources"
3. **Bonus items (5-7)** with:
   - Bonus image/icon
   - Bonus title
   - Bonus description
   - Individual value ($XX Value)
4. **Total value statement**
5. **CTA button**
6. **Background options**

## Implementation Instructions

### File Creation

**File:** `sections/pg-digital-bonus-stack.liquid`

### Schema Structure

```liquid
{% schema %}
{
  "name": "PG Digital Bonus Stack",
  "tag": "section",
  "class": "pg-digital-bonus-stack",
  "settings": [
    {
      "type": "header",
      "content": "Global Settings"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background color",
      "default": "#1D1A1A"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text color",
      "default": "#FCFAFA"
    },
    {
      "type": "color",
      "id": "accent_color",
      "label": "Accent color",
      "default": "#FD3300"
    },
    {
      "type": "color",
      "id": "card_background",
      "label": "Card background",
      "default": "#2A2626"
    },
    {
      "type": "header",
      "content": "Content"
    },
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow text",
      "default": ""
    },
    {
      "type": "text",
      "id": "headline",
      "label": "Headline",
      "default": ""
    },
    {
      "type": "html",
      "id": "value_headline",
      "label": "Value headline",
      "default": ""
    },
    {
      "type": "textarea",
      "id": "subheadline",
      "label": "Subheadline",
      "default": ""
    },
    {
      "type": "header",
      "content": "Total Value Display"
    },
    {
      "type": "text",
      "id": "total_value_label",
      "label": "Total value label",
      "default": ""
    },
    {
      "type": "text",
      "id": "total_value_amount",
      "label": "Total value amount",
      "default": ""
    },
    {
      "type": "text",
      "id": "total_value_suffix",
      "label": "Total value suffix",
      "default": ""
    },
    {
      "type": "header",
      "content": "Typography - Desktop"
    },
    {
      "type": "range",
      "id": "headline_size_desktop",
      "label": "Headline size",
      "min": 24,
      "max": 72,
      "step": 4,
      "default": 48,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "value_headline_size_desktop",
      "label": "Value headline size",
      "min": 20,
      "max": 48,
      "step": 4,
      "default": 32,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Typography - Mobile"
    },
    {
      "type": "range",
      "id": "headline_size_mobile",
      "label": "Headline size",
      "min": 20,
      "max": 48,
      "step": 4,
      "default": 32,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "value_headline_size_mobile",
      "label": "Value headline size",
      "min": 18,
      "max": 32,
      "step": 2,
      "default": 24,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Spacing - Desktop"
    },
    {
      "type": "range",
      "id": "padding_top_desktop",
      "label": "Padding top",
      "min": 0,
      "max": 200,
      "step": 4,
      "default": 80,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "padding_bottom_desktop",
      "label": "Padding bottom",
      "min": 0,
      "max": 200,
      "step": 4,
      "default": 80,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Spacing - Mobile"
    },
    {
      "type": "range",
      "id": "padding_top_mobile",
      "label": "Padding top",
      "min": 0,
      "max": 120,
      "step": 4,
      "default": 48,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "padding_bottom_mobile",
      "label": "Padding bottom",
      "min": 0,
      "max": 120,
      "step": 4,
      "default": 48,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "CTA Button"
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA text",
      "default": ""
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "CTA link"
    }
  ],
  "blocks": [
    {
      "type": "bonus",
      "name": "Bonus Item",
      "settings": [
        {
          "type": "image_picker",
          "id": "bonus_image",
          "label": "Bonus image"
        },
        {
          "type": "text",
          "id": "bonus_title",
          "label": "Bonus title",
          "default": ""
        },
        {
          "type": "textarea",
          "id": "bonus_description",
          "label": "Bonus description",
          "default": ""
        },
        {
          "type": "text",
          "id": "bonus_value",
          "label": "Bonus value",
          "default": ""
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "PG Digital Bonus Stack",
      "blocks": [
        {
          "type": "bonus",
          "settings": {
            "bonus_title": "",
            "bonus_description": "",
            "bonus_value": ""
          }
        },
        {
          "type": "bonus",
          "settings": {
            "bonus_title": "",
            "bonus_description": "",
            "bonus_value": ""
          }
        },
        {
          "type": "bonus",
          "settings": {
            "bonus_title": "",
            "bonus_description": "",
            "bonus_value": ""
          }
        },
        {
          "type": "bonus",
          "settings": {
            "bonus_title": "",
            "bonus_description": "",
            "bonus_value": ""
          }
        },
        {
          "type": "bonus",
          "settings": {
            "bonus_title": "",
            "bonus_description": "",
            "bonus_value": ""
          }
        }
      ]
    }
  ]
}
{% endschema %}
```

### HTML Structure

```liquid
<section class="pg-digital-bonus-stack" style="
  --bonus-bg: {{ section.settings.background_color }};
  --bonus-text: {{ section.settings.text_color }};
  --bonus-accent: {{ section.settings.accent_color }};
  --bonus-card-bg: {{ section.settings.card_background }};
  --bonus-padding-top-desktop: {{ section.settings.padding_top_desktop }}px;
  --bonus-padding-bottom-desktop: {{ section.settings.padding_bottom_desktop }}px;
  --bonus-padding-top-mobile: {{ section.settings.padding_top_mobile }}px;
  --bonus-padding-bottom-mobile: {{ section.settings.padding_bottom_mobile }}px;
">
  <div class="pg-digital-bonus-stack__container">
    <!-- Header -->
    <div class="pg-digital-bonus-stack__header">
      {% if section.settings.eyebrow != blank %}
        <span class="pg-digital-bonus-stack__eyebrow">{{ section.settings.eyebrow }}</span>
      {% endif %}
      <h2 class="pg-digital-bonus-stack__headline">{{ section.settings.headline }}</h2>
      {% if section.settings.value_headline != blank %}
        <p class="pg-digital-bonus-stack__value-headline">{{ section.settings.value_headline }}</p>
      {% endif %}
      {% if section.settings.subheadline != blank %}
        <p class="pg-digital-bonus-stack__subheadline">{{ section.settings.subheadline }}</p>
      {% endif %}
    </div>

    <!-- Bonus Grid -->
    <div class="pg-digital-bonus-stack__grid">
      {% for block in section.blocks %}
        <div class="pg-digital-bonus-stack__item" {{ block.shopify_attributes }}>
          {% if block.settings.bonus_image != blank %}
            <div class="pg-digital-bonus-stack__item-image">
              {{ block.settings.bonus_image | image_url: width: 200 | image_tag }}
            </div>
          {% endif %}
          <div class="pg-digital-bonus-stack__item-content">
            <h3 class="pg-digital-bonus-stack__item-title">{{ block.settings.bonus_title }}</h3>
            <p class="pg-digital-bonus-stack__item-description">{{ block.settings.bonus_description }}</p>
            <span class="pg-digital-bonus-stack__item-value">{{ block.settings.bonus_value }}</span>
          </div>
        </div>
      {% endfor %}
    </div>

    <!-- Total Value -->
    <div class="pg-digital-bonus-stack__total">
      <span class="pg-digital-bonus-stack__total-label">{{ section.settings.total_value_label }}</span>
      <span class="pg-digital-bonus-stack__total-amount">{{ section.settings.total_value_amount }}</span>
      <span class="pg-digital-bonus-stack__total-suffix">{{ section.settings.total_value_suffix }}</span>
    </div>

    <!-- CTA -->
    {% if section.settings.cta_text != blank %}
      <div class="pg-digital-bonus-stack__cta">
        <a href="{{ section.settings.cta_link }}" class="pg-digital-bonus-stack__button">
          {{ section.settings.cta_text }}
        </a>
      </div>
    {% endif %}
  </div>
</section>
```

### CSS Structure

```css
.pg-digital-bonus-stack {
  background-color: var(--bonus-bg);
  color: var(--bonus-text);
  padding-top: var(--bonus-padding-top-mobile);
  padding-bottom: var(--bonus-padding-bottom-mobile);
}

@media (min-width: 1024px) {
  .pg-digital-bonus-stack {
    padding-top: var(--bonus-padding-top-desktop);
    padding-bottom: var(--bonus-padding-bottom-desktop);
  }
}

.pg-digital-bonus-stack__container {
  max-width: var(--pg-container-xl);
  margin: 0 auto;
  padding: 0 var(--pg-space-md);
}

.pg-digital-bonus-stack__header {
  text-align: center;
  margin-bottom: var(--pg-space-2xl);
}

.pg-digital-bonus-stack__eyebrow {
  font-family: var(--pg-font-mono);
  font-size: var(--pg-text-xs);
  letter-spacing: var(--pg-tracking-widest);
  text-transform: uppercase;
  color: var(--bonus-accent);
  display: block;
  margin-bottom: var(--pg-space-sm);
}

.pg-digital-bonus-stack__headline {
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-5xl);
  line-height: 1.0;
  letter-spacing: var(--pg-tracking-tighter);
  margin: 0;
}

.pg-digital-bonus-stack__value-headline {
  font-family: var(--pg-font-display);
  font-size: var(--pg-text-2xl);
  margin-top: var(--pg-space-md);
}

.pg-digital-bonus-stack__value-headline b {
  color: var(--bonus-accent);
}

.pg-digital-bonus-stack__subheadline {
  font-size: var(--pg-text-lg);
  color: var(--pg-stone);
  margin-top: var(--pg-space-sm);
}

/* Bonus Grid */
.pg-digital-bonus-stack__grid {
  display: grid;
  gap: var(--pg-space-lg);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .pg-digital-bonus-stack__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .pg-digital-bonus-stack__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.pg-digital-bonus-stack__item {
  background: var(--bonus-card-bg);
  border-radius: var(--pg-radius-md);
  padding: var(--pg-space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.pg-digital-bonus-stack__item-image {
  width: 80px;
  height: 80px;
  margin-bottom: var(--pg-space-md);
}

.pg-digital-bonus-stack__item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pg-digital-bonus-stack__item-title {
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-lg);
  font-weight: 600;
  margin: 0 0 var(--pg-space-sm) 0;
}

.pg-digital-bonus-stack__item-description {
  font-size: var(--pg-text-sm);
  color: var(--pg-stone);
  line-height: 1.5;
  margin: 0 0 var(--pg-space-md) 0;
  flex-grow: 1;
}

.pg-digital-bonus-stack__item-value {
  font-family: var(--pg-font-mono);
  font-size: var(--pg-text-sm);
  color: var(--bonus-accent);
  font-weight: 600;
}

/* Total Value */
.pg-digital-bonus-stack__total {
  text-align: center;
  margin-top: var(--pg-space-2xl);
  padding: var(--pg-space-lg);
  border: 2px dashed var(--bonus-accent);
  border-radius: var(--pg-radius-md);
}

.pg-digital-bonus-stack__total-label {
  font-family: var(--pg-font-mono);
  font-size: var(--pg-text-sm);
  letter-spacing: var(--pg-tracking-wider);
  display: block;
  margin-bottom: var(--pg-space-xs);
}

.pg-digital-bonus-stack__total-amount {
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-4xl);
  font-weight: 700;
  color: var(--bonus-accent);
  display: block;
}

.pg-digital-bonus-stack__total-suffix {
  font-family: var(--pg-font-display);
  font-size: var(--pg-text-lg);
  display: block;
  margin-top: var(--pg-space-xs);
}

/* CTA */
.pg-digital-bonus-stack__cta {
  text-align: center;
  margin-top: var(--pg-space-xl);
}

.pg-digital-bonus-stack__button {
  display: inline-block;
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-lg);
  font-weight: 600;
  letter-spacing: var(--pg-tracking-wider);
  text-transform: uppercase;
  background: var(--pg-orange);
  color: var(--pg-mist);
  padding: var(--pg-space-lg) var(--pg-space-2xl);
  border-radius: var(--pg-radius);
  text-decoration: none;
  transition: all var(--pg-transition-base);
  box-shadow: var(--pg-shadow-orange);
}

.pg-digital-bonus-stack__button:hover {
  background: var(--pg-dark-orange);
  transform: translateY(-2px);
}
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 11: Mid-Page CTA + Pricing

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Mid-Page CTA + Pricing |
| **PG Match** | `pg-urgency.liquid` |
| **Match Type** | ADAPT |
| **SF2 Priority** | PG Conversion |
| **Components** | 5 total |

## Current Capabilities (PG Urgency)

The existing section provides:
- ✅ Two-column layout
- ✅ Large headline
- ✅ Bullet card with checklist items
- ✅ Countdown timer (1-30 minute range)
- ✅ CTA button
- ✅ Background color options
- ✅ Urgency messaging

## Gap Analysis

| SF2 Requirement | Current Status | Gap |
|-----------------|----------------|-----|
| Pricing display | ❌ Missing | Need price + compare price |
| Savings callout | ❌ Missing | Need "Save $XX" calculation |
| Stock indicator | ❌ Missing | Need low stock warning |
| Timer integration | ✅ Available | Configure countdown |
| CTA button | ✅ Available | Configure text/link |

## Implementation Instructions

### Customizer Settings

**Section Path:** `PG Urgency`

**Content Configuration:**
- Headline: `"Ready to Add 20-30 Yards to Your Drive?"`
- Bullet items:
  - `"✓ SpeedFrame™ Technology for maximum distance"`
  - `"✓ 60-Day risk-free trial"`
  - `"✓ Free shipping + Lifetime warranty"`
  - `"✓ $497 in FREE bonuses included"`
- Timer: Enable, set to 15 minutes
- CTA text: `"Add to Cart — $299"`
- CTA link: Link to product or cart

**Visual Settings:**
- Background: `--pg-forest` (#2E4734) for premium feel
- Or: `--pg-black` (#1D1A1A) for urgency

### Schema Enhancements Needed

**Add pricing display:**
```liquid
{
  "type": "header",
  "content": "Pricing Display"
},
{
  "type": "checkbox",
  "id": "show_pricing",
  "label": "Show pricing",
  "default": true
},
{
  "type": "text",
  "id": "current_price",
  "label": "Current price",
  "default": ""
},
{
  "type": "text",
  "id": "compare_price",
  "label": "Compare at price",
  "default": ""
},
{
  "type": "text",
  "id": "savings_text",
  "label": "Savings text",
  "default": ""
}
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 12: How to Use Section

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | How to Use Section |
| **PG Match** | `c-how-it-works.liquid` (if exists) or `pg-feature.liquid` |
| **Match Type** | ADAPT |
| **SF2 Priority** | NLS MEDIUM PRIORITY |
| **Components** | 5 total |

## Current Capabilities

If `C-How It Works` exists:
- ✅ Numbered step format
- ✅ Step title + description
- ✅ Visual for each step

If using `PG Feature`:
- ⚠️ Would need creative adaptation with numbered content

## Gap Analysis

| SF2 Requirement | Current Status | Gap |
|-----------------|----------------|-----|
| Step 1-2-3 format | ⚠️ Depends on section | May need enhancement |
| Simple instructions | ✅ Available | Content strategy |
| Visual aids | ✅ Available | Use images |
| Reduces complexity anxiety | ⚠️ Content | Messaging focus |

## Implementation Instructions

### Option A: Use Existing How It Works Section (if available)

**Content Configuration:**

**Step 1: Unbox & Inspect**
- Description: `"Your SF2 arrives in premium packaging with headcover and adjustment tool. Simply remove and inspect."`
- Image: Unboxing photo

**Step 2: Set Your Loft**
- Description: `"Use the included wrench to adjust loft to your preference. Most golfers start at 10.5°."`
- Image: Loft adjustment close-up

**Step 3: Tee It Up**
- Description: `"That's it. Head to the range or course and experience the difference immediately."`
- Image: Address position photo

### Option B: Use PG Feature with Creative Formatting

Create a single `PG Feature` section with HTML-formatted steps in the body:

```html
<div class="steps-container">
  <div class="step">
    <span class="step-number">1</span>
    <h4>Unbox & Inspect</h4>
    <p>Your SF2 arrives in premium packaging...</p>
  </div>
  <div class="step">
    <span class="step-number">2</span>
    <h4>Set Your Loft</h4>
    <p>Use the included wrench to adjust...</p>
  </div>
  <div class="step">
    <span class="step-number">3</span>
    <h4>Tee It Up</h4>
    <p>Head to the range or course...</p>
  </div>
</div>
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 13: Social Proof / Testimonials

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Social Proof / Testimonials |
| **PG Match** | `pg-ugc-carousel.liquid` + `pg-text-testimonials.liquid` |
| **Match Type** | USE AS-IS |
| **SF2 Priority** | HYBRID (DTC + PG) |
| **Components** | 10 total |

## Current Capabilities

**PG UGC Carousel:**
- ✅ Video testimonial carousel
- ✅ 280px card width, 9:16 aspect ratio
- ✅ Pagination dots
- ✅ Auto-play option
- ✅ Customer name/location

**PG Text Testimonials:**
- ✅ 3-column grid layout
- ✅ Quote cards with attribution
- ✅ Orange quote icon styling
- ✅ Responsive stacking

## Gap Analysis

No significant gaps — existing sections meet all requirements.

## Implementation Instructions

### Page Structure

Use both sections in sequence:

**Part 1: PG UGC Carousel (Video Testimonials)**
- Section headline: `"Real Golfers. Real Results."`
- Add 5-8 video testimonials
- Each with customer name, location, and handicap

**Part 2: PG Text Testimonials (Written Reviews)**
- Add 6-9 text testimonials
- Mix of distance gains, consistency improvements, and value comments
- Include verified buyer badges where possible

### Customizer Settings

**PG UGC Carousel:**
- Enable auto-play: Yes
- Cards per view (desktop): 4
- Cards per view (mobile): 1.2 (peek effect)
- Background: `--pg-mist`

**PG Text Testimonials:**
- Columns: 3 (desktop), 1 (mobile)
- Show rating stars: Yes
- Background: `--pg-fog` (alternate)


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 14: Guarantee / Risk Reversal

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Guarantee / Risk Reversal |
| **PG Match** | `pg-guarantee.liquid` |
| **Match Type** | USE AS-IS |
| **SF2 Priority** | HYBRID (OEM + PG Extreme) |
| **Components** | 8 total |

## Current Capabilities (PG Guarantee)

The existing section provides:
- ✅ Dark theme design
- ✅ Guarantee seal/badge
- ✅ Main headline
- ✅ Guarantee copy
- ✅ Contact information box (email + phone)
- ✅ Background options

## Gap Analysis

No significant gaps — existing section meets all requirements.

## Implementation Instructions

### Customizer Settings

**Section Path:** `PG Guarantee`

**Content Configuration:**
- Headline: `"Our 60-Day 'Love It or Return It' Guarantee"`
- Body:
  ```
  We're so confident the SF2 will transform your game that we're giving you 60 full days to try it risk-free.

  Play it. Test it. Take it to the course.

  If you don't see a noticeable improvement in your distance and consistency, simply contact us for a full refund. No questions asked. No hassles. No fine print.

  You can even keep the FREE bonuses as our thanks for giving us a try.
  ```
- Contact email: `support@performancegolf.com`
- Contact phone: `1-800-XXX-XXXX`

**Visual Settings:**
- Background: `--pg-black` (#1D1A1A)
- Text color: `--pg-mist` (#FCFAFA)
- Accent: `--pg-orange` (#FD3300)


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 15: Challenge Section

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Challenge Section |
| **PG Match** | `pg-challenge-section.liquid` |
| **Match Type** | ✅ CREATED |
| **SF2 Priority** | PG-UNIQUE |
| **Components** | 4 total |

## Purpose

Invites customers to test the product against their current driver with a specific challenge protocol. Builds confidence through suggested validation method.

## Components Required

1. **Challenge headline** — Bold invitation to test
2. **Challenge instructions** — Step-by-step test protocol
3. **Confidence builder statement** — "We're so confident because..."
4. **Optional CTA** — Direct to purchase

## Implementation Instructions

### File Creation

**File:** `sections/pg-challenge-section.liquid`

### Schema Structure

```liquid
{% schema %}
{
  "name": "PG Challenge Section",
  "tag": "section",
  "class": "pg-challenge-section",
  "settings": [
    {
      "type": "header",
      "content": "Global Settings"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background color",
      "default": "#FD3300"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text color",
      "default": "#FCFAFA"
    },
    {
      "type": "header",
      "content": "Content"
    },
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow text",
      "default": ""
    },
    {
      "type": "html",
      "id": "headline",
      "label": "Challenge headline",
      "default": ""
    },
    {
      "type": "richtext",
      "id": "challenge_instructions",
      "label": "Challenge instructions",
      "default": ""
    },
    {
      "type": "textarea",
      "id": "confidence_statement",
      "label": "Confidence builder statement",
      "default": ""
    },
    {
      "type": "header",
      "content": "Typography - Desktop"
    },
    {
      "type": "range",
      "id": "headline_size_desktop",
      "label": "Headline size",
      "min": 32,
      "max": 80,
      "step": 4,
      "default": 56,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Typography - Mobile"
    },
    {
      "type": "range",
      "id": "headline_size_mobile",
      "label": "Headline size",
      "min": 24,
      "max": 48,
      "step": 4,
      "default": 36,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Spacing - Desktop"
    },
    {
      "type": "range",
      "id": "padding_top_desktop",
      "label": "Padding top",
      "min": 0,
      "max": 200,
      "step": 4,
      "default": 80,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "padding_bottom_desktop",
      "label": "Padding bottom",
      "min": 0,
      "max": 200,
      "step": 4,
      "default": 80,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Spacing - Mobile"
    },
    {
      "type": "range",
      "id": "padding_top_mobile",
      "label": "Padding top",
      "min": 0,
      "max": 120,
      "step": 4,
      "default": 48,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "padding_bottom_mobile",
      "label": "Padding bottom",
      "min": 0,
      "max": 120,
      "step": 4,
      "default": 48,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "CTA Button"
    },
    {
      "type": "checkbox",
      "id": "show_cta",
      "label": "Show CTA button",
      "default": true
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA text",
      "default": ""
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "CTA link"
    }
  ],
  "presets": [
    {
      "name": "PG Challenge Section"
    }
  ]
}
{% endschema %}
```

### HTML Structure

```liquid
<section class="pg-challenge-section" style="
  --challenge-bg: {{ section.settings.background_color }};
  --challenge-text: {{ section.settings.text_color }};
  --challenge-padding-top-desktop: {{ section.settings.padding_top_desktop }}px;
  --challenge-padding-bottom-desktop: {{ section.settings.padding_bottom_desktop }}px;
  --challenge-padding-top-mobile: {{ section.settings.padding_top_mobile }}px;
  --challenge-padding-bottom-mobile: {{ section.settings.padding_bottom_mobile }}px;
  --challenge-headline-desktop: {{ section.settings.headline_size_desktop }}px;
  --challenge-headline-mobile: {{ section.settings.headline_size_mobile }}px;
">
  <div class="pg-challenge-section__container">
    {% if section.settings.eyebrow != blank %}
      <span class="pg-challenge-section__eyebrow">{{ section.settings.eyebrow }}</span>
    {% endif %}

    <h2 class="pg-challenge-section__headline">{{ section.settings.headline }}</h2>

    <div class="pg-challenge-section__instructions">
      {{ section.settings.challenge_instructions }}
    </div>

    {% if section.settings.confidence_statement != blank %}
      <p class="pg-challenge-section__confidence">{{ section.settings.confidence_statement }}</p>
    {% endif %}

    {% if section.settings.show_cta and section.settings.cta_text != blank %}
      <div class="pg-challenge-section__cta">
        <a href="{{ section.settings.cta_link }}" class="pg-challenge-section__button">
          {{ section.settings.cta_text }}
        </a>
      </div>
    {% endif %}
  </div>
</section>
```

### CSS Structure

```css
.pg-challenge-section {
  background-color: var(--challenge-bg);
  color: var(--challenge-text);
  padding-top: var(--challenge-padding-top-mobile);
  padding-bottom: var(--challenge-padding-bottom-mobile);
  text-align: center;
}

@media (min-width: 1024px) {
  .pg-challenge-section {
    padding-top: var(--challenge-padding-top-desktop);
    padding-bottom: var(--challenge-padding-bottom-desktop);
  }
}

.pg-challenge-section__container {
  max-width: var(--pg-container-lg);
  margin: 0 auto;
  padding: 0 var(--pg-space-md);
}

.pg-challenge-section__eyebrow {
  font-family: var(--pg-font-mono);
  font-size: var(--pg-text-sm);
  letter-spacing: var(--pg-tracking-widest);
  text-transform: uppercase;
  opacity: 0.8;
  display: block;
  margin-bottom: var(--pg-space-md);
}

.pg-challenge-section__headline {
  font-family: var(--pg-font-heading);
  font-size: var(--challenge-headline-mobile);
  line-height: 1.0;
  letter-spacing: var(--pg-tracking-tighter);
  margin: 0 0 var(--pg-space-xl) 0;
}

@media (min-width: 1024px) {
  .pg-challenge-section__headline {
    font-size: var(--challenge-headline-desktop);
  }
}

.pg-challenge-section__headline b {
  font-style: italic;
}

.pg-challenge-section__instructions {
  font-family: var(--pg-font-display);
  font-size: var(--pg-text-lg);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto var(--pg-space-xl);
  text-align: left;
}

.pg-challenge-section__instructions ol {
  padding-left: var(--pg-space-lg);
  margin: var(--pg-space-md) 0;
}

.pg-challenge-section__instructions li {
  margin-bottom: var(--pg-space-sm);
}

.pg-challenge-section__confidence {
  font-family: var(--pg-font-display);
  font-size: var(--pg-text-xl);
  font-style: italic;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto var(--pg-space-xl);
}

.pg-challenge-section__button {
  display: inline-block;
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-lg);
  font-weight: 600;
  letter-spacing: var(--pg-tracking-wider);
  text-transform: uppercase;
  background: var(--pg-black);
  color: var(--pg-mist);
  padding: var(--pg-space-lg) var(--pg-space-2xl);
  border-radius: var(--pg-radius);
  text-decoration: none;
  transition: all var(--pg-transition-base);
}

.pg-challenge-section__button:hover {
  background: var(--pg-mist);
  color: var(--pg-black);
}
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 16: Category Creation / Positioning (Us vs Them)

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Category Creation / Positioning |
| **PG Match** | `pg-us-vs-them.liquid` |
| **Match Type** | ✅ CREATED |
| **SF2 Priority** | NLS HIGH PRIORITY + PG-UNIQUE |
| **Components** | 6 total |

## Purpose

Positions SF2 against big-name OEM drivers through direct comparison. Creates a new category ("Drivers for Average Golfers") and establishes Performance Golf's mission/values.

## Components Required

1. **Category headline** — "Why Pay More for Less?"
2. **Visual comparison chart** — SF2 vs Big-Name Drivers
3. **Feature-by-feature comparison** — With ✅/❌ icons
4. **Company introduction** — "Who is Performance Golf?"
5. **Mission statement** — Anti-OEM positioning
6. **Summary statement** — "Same performance. Half the price. Zero risk."

## Implementation Instructions

### File Creation

**File:** `sections/pg-us-vs-them.liquid`

### Schema Structure

```liquid
{% schema %}
{
  "name": "PG Us vs Them",
  "tag": "section",
  "class": "pg-us-vs-them",
  "settings": [
    {
      "type": "header",
      "content": "Global Settings"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background color",
      "default": "#FCFAFA"
    },
    {
      "type": "color",
      "id": "card_background",
      "label": "Comparison card background",
      "default": "#FFFFFF"
    },
    {
      "type": "color",
      "id": "highlight_color",
      "label": "Highlight color (our product)",
      "default": "#FD3300"
    },
    {
      "type": "header",
      "content": "Category Creation"
    },
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow text",
      "default": ""
    },
    {
      "type": "html",
      "id": "headline",
      "label": "Headline",
      "default": ""
    },
    {
      "type": "textarea",
      "id": "intro_copy",
      "label": "Introduction copy",
      "default": ""
    },
    {
      "type": "header",
      "content": "Comparison Settings"
    },
    {
      "type": "text",
      "id": "our_product_name",
      "label": "Our product name",
      "default": ""
    },
    {
      "type": "image_picker",
      "id": "our_product_image",
      "label": "Our product image"
    },
    {
      "type": "text",
      "id": "competitor_name",
      "label": "Competitor label",
      "default": ""
    },
    {
      "type": "image_picker",
      "id": "competitor_image",
      "label": "Competitor image (optional)"
    },
    {
      "type": "header",
      "content": "Company Introduction"
    },
    {
      "type": "checkbox",
      "id": "show_company_intro",
      "label": "Show company introduction",
      "default": true
    },
    {
      "type": "text",
      "id": "company_headline",
      "label": "Company headline",
      "default": ""
    },
    {
      "type": "richtext",
      "id": "company_description",
      "label": "Company description",
      "default": ""
    },
    {
      "type": "text",
      "id": "mission_statement",
      "label": "Mission statement",
      "default": ""
    },
    {
      "type": "header",
      "content": "Typography - Desktop"
    },
    {
      "type": "range",
      "id": "headline_size_desktop",
      "label": "Headline size",
      "min": 32,
      "max": 72,
      "step": 4,
      "default": 48,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Typography - Mobile"
    },
    {
      "type": "range",
      "id": "headline_size_mobile",
      "label": "Headline size",
      "min": 24,
      "max": 48,
      "step": 4,
      "default": 32,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Spacing - Desktop"
    },
    {
      "type": "range",
      "id": "padding_top_desktop",
      "label": "Padding top",
      "min": 0,
      "max": 200,
      "step": 4,
      "default": 80,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "padding_bottom_desktop",
      "label": "Padding bottom",
      "min": 0,
      "max": 200,
      "step": 4,
      "default": 80,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "Spacing - Mobile"
    },
    {
      "type": "range",
      "id": "padding_top_mobile",
      "label": "Padding top",
      "min": 0,
      "max": 120,
      "step": 4,
      "default": 48,
      "unit": "px"
    },
    {
      "type": "range",
      "id": "padding_bottom_mobile",
      "label": "Padding bottom",
      "min": 0,
      "max": 120,
      "step": 4,
      "default": 48,
      "unit": "px"
    },
    {
      "type": "header",
      "content": "CTA Button"
    },
    {
      "type": "checkbox",
      "id": "show_cta",
      "label": "Show CTA button",
      "default": true
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA text",
      "default": ""
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "CTA link"
    }
  ],
  "blocks": [
    {
      "type": "comparison_row",
      "name": "Comparison Row",
      "settings": [
        {
          "type": "text",
          "id": "feature_name",
          "label": "Feature name",
          "default": ""
        },
        {
          "type": "text",
          "id": "our_value",
          "label": "Our value",
          "default": ""
        },
        {
          "type": "select",
          "id": "our_status",
          "label": "Our status",
          "options": [
            { "value": "check", "label": "✅ Check (positive)" },
            { "value": "x", "label": "❌ X (negative)" },
            { "value": "text", "label": "Text only" }
          ],
          "default": "text"
        },
        {
          "type": "text",
          "id": "competitor_value",
          "label": "Competitor value",
          "default": ""
        },
        {
          "type": "select",
          "id": "competitor_status",
          "label": "Competitor status",
          "options": [
            { "value": "check", "label": "✅ Check (positive)" },
            { "value": "x", "label": "❌ X (negative)" },
            { "value": "text", "label": "Text only" }
          ],
          "default": "text"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "PG Us vs Them",
      "blocks": [
        {
          "type": "comparison_row",
          "settings": {
            "feature_name": "",
            "our_value": "",
            "our_status": "text",
            "competitor_value": "",
            "competitor_status": "text"
          }
        },
        {
          "type": "comparison_row",
          "settings": {
            "feature_name": "",
            "our_value": "",
            "our_status": "check",
            "competitor_value": "",
            "competitor_status": "x"
          }
        },
        {
          "type": "comparison_row",
          "settings": {
            "feature_name": "",
            "our_value": "",
            "our_status": "check",
            "competitor_value": "",
            "competitor_status": "x"
          }
        },
        {
          "type": "comparison_row",
          "settings": {
            "feature_name": "",
            "our_value": "",
            "our_status": "check",
            "competitor_value": "",
            "competitor_status": "text"
          }
        },
        {
          "type": "comparison_row",
          "settings": {
            "feature_name": "",
            "our_value": "",
            "our_status": "check",
            "competitor_value": "",
            "competitor_status": "x"
          }
        },
        {
          "type": "comparison_row",
          "settings": {
            "feature_name": "",
            "our_value": "",
            "our_status": "check",
            "competitor_value": "",
            "competitor_status": "x"
          }
        }
      ]
    }
  ]
}
{% endschema %}
```

### HTML Structure

```liquid
<section class="pg-us-vs-them" style="
  --uvt-bg: {{ section.settings.background_color }};
  --uvt-card-bg: {{ section.settings.card_background }};
  --uvt-highlight: {{ section.settings.highlight_color }};
  --uvt-padding-top-desktop: {{ section.settings.padding_top_desktop }}px;
  --uvt-padding-bottom-desktop: {{ section.settings.padding_bottom_desktop }}px;
  --uvt-padding-top-mobile: {{ section.settings.padding_top_mobile }}px;
  --uvt-padding-bottom-mobile: {{ section.settings.padding_bottom_mobile }}px;
">
  <div class="pg-us-vs-them__container">
    <!-- Header -->
    <div class="pg-us-vs-them__header">
      {% if section.settings.eyebrow != blank %}
        <span class="pg-us-vs-them__eyebrow">{{ section.settings.eyebrow }}</span>
      {% endif %}
      <h2 class="pg-us-vs-them__headline">{{ section.settings.headline }}</h2>
      {% if section.settings.intro_copy != blank %}
        <p class="pg-us-vs-them__intro">{{ section.settings.intro_copy }}</p>
      {% endif %}
    </div>

    <!-- Comparison Table -->
    <div class="pg-us-vs-them__comparison">
      <div class="pg-us-vs-them__comparison-header">
        <div class="pg-us-vs-them__comparison-cell pg-us-vs-them__comparison-cell--feature"></div>
        <div class="pg-us-vs-them__comparison-cell pg-us-vs-them__comparison-cell--ours pg-us-vs-them__comparison-cell--highlight">
          {% if section.settings.our_product_image != blank %}
            <div class="pg-us-vs-them__product-image">
              {{ section.settings.our_product_image | image_url: width: 120 | image_tag }}
            </div>
          {% endif %}
          <span class="pg-us-vs-them__product-name">{{ section.settings.our_product_name }}</span>
        </div>
        <div class="pg-us-vs-them__comparison-cell pg-us-vs-them__comparison-cell--theirs">
          {% if section.settings.competitor_image != blank %}
            <div class="pg-us-vs-them__product-image">
              {{ section.settings.competitor_image | image_url: width: 120 | image_tag }}
            </div>
          {% endif %}
          <span class="pg-us-vs-them__product-name">{{ section.settings.competitor_name }}</span>
        </div>
      </div>

      {% for block in section.blocks %}
        <div class="pg-us-vs-them__comparison-row" {{ block.shopify_attributes }}>
          <div class="pg-us-vs-them__comparison-cell pg-us-vs-them__comparison-cell--feature">
            {{ block.settings.feature_name }}
          </div>
          <div class="pg-us-vs-them__comparison-cell pg-us-vs-them__comparison-cell--ours pg-us-vs-them__comparison-cell--highlight">
            {% case block.settings.our_status %}
              {% when 'check' %}
                <span class="pg-us-vs-them__icon pg-us-vs-them__icon--check">✓</span>
              {% when 'x' %}
                <span class="pg-us-vs-them__icon pg-us-vs-them__icon--x">✗</span>
              {% else %}
                {{ block.settings.our_value }}
            {% endcase %}
          </div>
          <div class="pg-us-vs-them__comparison-cell pg-us-vs-them__comparison-cell--theirs">
            {% case block.settings.competitor_status %}
              {% when 'check' %}
                <span class="pg-us-vs-them__icon pg-us-vs-them__icon--check">✓</span>
              {% when 'x' %}
                <span class="pg-us-vs-them__icon pg-us-vs-them__icon--x">✗</span>
              {% else %}
                {{ block.settings.competitor_value }}
            {% endcase %}
          </div>
        </div>
      {% endfor %}
    </div>

    <!-- Company Introduction -->
    {% if section.settings.show_company_intro %}
      <div class="pg-us-vs-them__company">
        <h3 class="pg-us-vs-them__company-headline">{{ section.settings.company_headline }}</h3>
        <div class="pg-us-vs-them__company-description">
          {{ section.settings.company_description }}
        </div>
        {% if section.settings.mission_statement != blank %}
          <p class="pg-us-vs-them__mission">{{ section.settings.mission_statement }}</p>
        {% endif %}
      </div>
    {% endif %}

    <!-- CTA -->
    {% if section.settings.show_cta and section.settings.cta_text != blank %}
      <div class="pg-us-vs-them__cta">
        <a href="{{ section.settings.cta_link }}" class="pg-us-vs-them__button">
          {{ section.settings.cta_text }}
        </a>
      </div>
    {% endif %}
  </div>
</section>
```

### CSS Structure

```css
.pg-us-vs-them {
  background-color: var(--uvt-bg);
  padding-top: var(--uvt-padding-top-mobile);
  padding-bottom: var(--uvt-padding-bottom-mobile);
}

@media (min-width: 1024px) {
  .pg-us-vs-them {
    padding-top: var(--uvt-padding-top-desktop);
    padding-bottom: var(--uvt-padding-bottom-desktop);
  }
}

.pg-us-vs-them__container {
  max-width: var(--pg-container-xl);
  margin: 0 auto;
  padding: 0 var(--pg-space-md);
}

.pg-us-vs-them__header {
  text-align: center;
  margin-bottom: var(--pg-space-2xl);
}

.pg-us-vs-them__eyebrow {
  font-family: var(--pg-font-mono);
  font-size: var(--pg-text-xs);
  letter-spacing: var(--pg-tracking-widest);
  text-transform: uppercase;
  color: var(--uvt-highlight);
  display: block;
  margin-bottom: var(--pg-space-sm);
}

.pg-us-vs-them__headline {
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-5xl);
  line-height: 1.0;
  letter-spacing: var(--pg-tracking-tighter);
  color: var(--pg-black);
  margin: 0;
}

.pg-us-vs-them__headline b {
  color: var(--uvt-highlight);
}

.pg-us-vs-them__intro {
  font-family: var(--pg-font-display);
  font-size: var(--pg-text-xl);
  color: var(--pg-ui-gray);
  margin-top: var(--pg-space-md);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Comparison Table */
.pg-us-vs-them__comparison {
  background: var(--uvt-card-bg);
  border-radius: var(--pg-radius-lg);
  box-shadow: var(--pg-shadow-lg);
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto var(--pg-space-2xl);
}

.pg-us-vs-them__comparison-header,
.pg-us-vs-them__comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.pg-us-vs-them__comparison-header {
  background: var(--pg-sand);
  border-bottom: 2px solid var(--pg-pebble);
}

.pg-us-vs-them__comparison-cell {
  padding: var(--pg-space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.pg-us-vs-them__comparison-cell--feature {
  font-family: var(--pg-font-heading);
  font-weight: 600;
  text-align: left;
  align-items: flex-start;
}

.pg-us-vs-them__comparison-cell--highlight {
  background: rgba(253, 51, 0, 0.05);
  border-left: 3px solid var(--uvt-highlight);
  border-right: 3px solid var(--uvt-highlight);
}

.pg-us-vs-them__comparison-header .pg-us-vs-them__comparison-cell--highlight {
  border-top: 3px solid var(--uvt-highlight);
}

.pg-us-vs-them__comparison-row:last-child .pg-us-vs-them__comparison-cell--highlight {
  border-bottom: 3px solid var(--uvt-highlight);
}

.pg-us-vs-them__comparison-row {
  border-bottom: 1px solid var(--pg-pebble);
}

.pg-us-vs-them__comparison-row:last-child {
  border-bottom: none;
}

.pg-us-vs-them__product-image {
  width: 80px;
  height: 60px;
  margin-bottom: var(--pg-space-sm);
}

.pg-us-vs-them__product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pg-us-vs-them__product-name {
  font-family: var(--pg-font-heading);
  font-weight: 700;
  font-size: var(--pg-text-lg);
}

.pg-us-vs-them__icon {
  font-size: var(--pg-text-2xl);
  font-weight: 700;
}

.pg-us-vs-them__icon--check {
  color: #22C55E;
}

.pg-us-vs-them__icon--x {
  color: #EF4444;
}

/* Company Introduction */
.pg-us-vs-them__company {
  text-align: center;
  max-width: 700px;
  margin: 0 auto var(--pg-space-xl);
}

.pg-us-vs-them__company-headline {
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-3xl);
  color: var(--pg-black);
  margin: 0 0 var(--pg-space-md) 0;
}

.pg-us-vs-them__company-description {
  font-family: var(--pg-font-display);
  font-size: var(--pg-text-lg);
  color: var(--pg-ui-gray);
  line-height: 1.6;
}

.pg-us-vs-them__company-description p {
  margin: 0 0 var(--pg-space-md) 0;
}

.pg-us-vs-them__company-description p:last-child {
  margin-bottom: 0;
}

.pg-us-vs-them__mission {
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-2xl);
  font-weight: 700;
  color: var(--uvt-highlight);
  margin-top: var(--pg-space-lg);
}

/* CTA */
.pg-us-vs-them__cta {
  text-align: center;
}

.pg-us-vs-them__button {
  display: inline-block;
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-lg);
  font-weight: 600;
  letter-spacing: var(--pg-tracking-wider);
  text-transform: uppercase;
  background: var(--pg-orange);
  color: var(--pg-mist);
  padding: var(--pg-space-lg) var(--pg-space-2xl);
  border-radius: var(--pg-radius);
  text-decoration: none;
  transition: all var(--pg-transition-base);
  box-shadow: var(--pg-shadow-orange);
}

.pg-us-vs-them__button:hover {
  background: var(--pg-dark-orange);
  transform: translateY(-2px);
}
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 17: Specifications + Fitting

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Specifications + Fitting |
| **PG Match** | `pg-product-specifications.liquid` |
| **Match Type** | ✅ DONE |
| **SF2 Priority** | HYBRID (OEM + PG + GAP FIX) |
| **Components** | 10 total |
| **Enhancement** | Added fitting guide section (show_fitting_guide, fitting_headline, fitting_content, colors) |

## Current Capabilities (PG Product Specifications)

The existing section provides:
- ✅ Technical specs table layout
- ✅ Spec rows (label + value)
- ✅ Comparison layouts
- ✅ Section headline
- ✅ Background options

## Gap Analysis

| SF2 Requirement | Current Status | Gap |
|-----------------|----------------|-----|
| Club specifications | ✅ Available | Configure content |
| Loft options explained | ⚠️ Partial | May need additional copy |
| Fitting guidance | ❌ Missing | Add fitting recommendation block |
| Shaft options | ⚠️ Partial | Content configuration |
| Adjustment instructions | ❌ Missing | Add how-to content block |

## Implementation Instructions

### Customizer Settings

**Section Path:** `PG Product Specifications`

**Spec Rows to Create:**

| Specification | Value |
|---------------|-------|
| Loft Options | 9°, 10.5°, 12° |
| Face Angle | Adjustable ±2° |
| Head Volume | 460cc |
| Shaft | Premium graphite, Regular flex |
| Length | 45.5" |
| Swing Weight | D2 |
| Grip | Performance Golf Tour Grip |

**Fitting Guidance Content:**
```
**Which loft is right for you?**

• 9° — For faster swing speeds (100+ mph) who want lower spin and penetrating flight
• 10.5° — Our most popular option, ideal for 85-100 mph swing speeds
• 12° — For moderate swing speeds (75-90 mph) who want maximum launch and carry
```

### Schema Enhancement for Fitting Guide

**Add to PG Product Specifications:**
```liquid
{
  "type": "header",
  "content": "Fitting Guide"
},
{
  "type": "checkbox",
  "id": "show_fitting_guide",
  "label": "Show fitting guide",
  "default": true
},
{
  "type": "text",
  "id": "fitting_headline",
  "label": "Fitting guide headline",
  "default": ""
},
{
  "type": "richtext",
  "id": "fitting_content",
  "label": "Fitting guide content"
}
```


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 18: Final CTA Block

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | Final CTA Block |
| **PG Match** | `pg-urgency.liquid` |
| **Match Type** | ADAPT |
| **SF2 Priority** | HYBRID (OEM + PG) |
| **Components** | 9 total |

## Current Capabilities (PG Urgency)

Same as Section 11 — reused at page bottom.

## Gap Analysis

Same gaps as Section 11, plus:

| SF2 Requirement | Current Status | Gap |
|-----------------|----------------|-----|
| Final summary statement | ⚠️ Partial | Use headline field |
| Value recap | ❌ Missing | Add checklist content |
| Last chance messaging | ✅ Available | Use urgency copy |

## Implementation Instructions

### Customizer Settings

**Section Path:** `PG Urgency` (second instance)

**Content Configuration:**
- Headline: `"Don't Let Another Round Go By"`
- Subheadline: `"Start hitting longer, straighter drives tomorrow"`
- Bullet items:
  - `"✓ SF2 Driver — $299 (Save $100)"`
  - `"✓ $497 in FREE bonuses"`
  - `"✓ 60-Day risk-free trial"`
  - `"✓ Free shipping + Lifetime warranty"`
- Timer: Enable, set to 10 minutes (shorter than mid-page)
- CTA text: `"Yes! I Want Longer Drives →"`
- CTA link: Add to cart or checkout

**Visual Settings:**
- Background: `--pg-black` (#1D1A1A)
- Use stronger urgency messaging for final CTA


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# SECTION 19: FAQ + Footer

## Mapping Details

| Attribute | Value |
|-----------|-------|
| **SF2 Section** | FAQ + Footer |
| **PG Match** | `pg-faqs.liquid` + Standard Footer |
| **Match Type** | USE AS-IS |
| **SF2 Priority** | HYBRID (OEM + PG + GAP FIX) |
| **Components** | 12 total |

## Current Capabilities

**PG FAQs:**
- ✅ Accordion dropdown format
- ✅ Card design styling
- ✅ Smooth animations (300ms)
- ✅ Multiple FAQ blocks

**Standard Footer:**
- ✅ Company links
- ✅ Contact information
- ✅ Social media links
- ✅ Copyright

## Gap Analysis

No significant gaps — existing sections meet all requirements.

## Implementation Instructions

### FAQ Content to Create

**Category: Product**
1. What loft should I choose?
2. Is the SF2 legal for tournament play?
3. What's included with my order?
4. Can I adjust the loft after purchase?

**Category: Shipping & Returns**
5. How long does shipping take?
6. Do you ship internationally?
7. How does the 60-day trial work?
8. What if I don't like it?

**Category: Comparison**
9. How does the SF2 compare to [OEM brand]?
10. Why is the SF2 less expensive than other drivers?
11. Is this the same quality as expensive drivers?

**Category: Support**
12. Do you offer club fitting?
13. How do I contact customer service?
14. What's covered under the warranty?

### Customizer Settings

**Section Path:** `PG FAQs`

- Section headline: `"Frequently Asked Questions"`
- Background: `--pg-fog` (#F4F2F0)
- Add 12-14 FAQ blocks with questions/answers above


---

### SF2 Content Values (for page template JSON)

> **Note:** Fill in these values when SF2 copy is finalized. These go in `templates/page.sf2-sales-page.json`, NOT in the section schema defaults.

| Setting ID | SF2 Value |
|------------|-----------|
| | |

---

# APPENDIX A: Full Page Section Order

For reference, here is the complete SF2 sales page section order:

| Order | Section | PG Section File |
|-------|---------|-----------------|
| 1 | Sticky Header / Announcement Bar | `pg-header-anchor-links.liquid` (enhanced) |
| 2 | Hero / Above The Fold | `pg-pdp-hero-atf.liquid` (enhanced) |
| 3 | Problem Agitation | `pg-problem.liquid` |
| 4 | Mechanism / Named Technology | `pg-feature.liquid` |
| 5 | Technology Features | `pg-feature.liquid` (×3-4) |
| 6 | What to Expect Timeline | `pg-what-to-expect-timeline.liquid` (**NEW**) |
| 7 | Use Case Scenarios | `pg-product-proof.liquid` |
| 8 | Target Audience / Pain Data | `pg-problem.liquid` + `pg-feature.liquid` |
| 9 | Expert Credibility | `pg-guru.liquid` (×2) |
| 10 | Digital Bonus Stack | `pg-digital-bonus-stack.liquid` (**NEW** - OPTIONAL) |
| 11 | Mid-Page CTA + Pricing | `pg-urgency.liquid` |
| 12 | How to Use Section | `pg-feature.liquid` or How It Works |
| 13 | Social Proof / Testimonials | `pg-ugc-carousel.liquid` + `pg-text-testimonials.liquid` |
| 14 | Guarantee / Risk Reversal | `pg-guarantee.liquid` |
| 15 | Challenge Section | `pg-challenge-section.liquid` (**NEW**) |
| 16 | Category Creation / Positioning | `pg-us-vs-them.liquid` (**NEW**) |
| 17 | Specifications + Fitting | `pg-product-specifications.liquid` |
| 18 | Final CTA Block | `pg-urgency.liquid` |
| 19 | FAQ + Footer | `pg-faqs.liquid` + Footer |

---

# APPENDIX B: New Section Files Summary

| Section | File Name | Components | Priority |
|---------|-----------|------------|----------|
| What to Expect Timeline | `pg-what-to-expect-timeline.liquid` | 8 | HIGH |
| Challenge Section | `pg-challenge-section.liquid` | 4 | HIGH |
| Us vs Them | `pg-us-vs-them.liquid` | 6 | HIGH |
| Digital Bonus Stack | `pg-digital-bonus-stack.liquid` | 8 | OPTIONAL |

---

# APPENDIX C: Design System Quick Reference

## Colors
```css
--pg-orange: #FD3300      /* Primary CTA, accents */
--pg-dark-orange: #DB2C00 /* Hover states */
--pg-black: #1D1A1A       /* Primary text */
--pg-ui-gray: #7B726C     /* Secondary text */
--pg-mist: #FCFAFA        /* Primary background */
--pg-fog: #F4F2F0         /* Alternate background */
--pg-sand: #ECE9E4        /* Card backgrounds */
```

## Typography
```css
--pg-font-heading: 'Repro', sans-serif    /* Headlines */
--pg-font-display: 'GT Super Text', serif /* Body, editorial */
--pg-font-mono: 'Repro Mono', monospace   /* Labels, data */
```

## Spacing (4px increments)
```css
--pg-space-sm: 8px
--pg-space-md: 16px
--pg-space-lg: 24px
--pg-space-xl: 32px
--pg-space-2xl: 48px
--pg-space-3xl: 64px
--pg-space-4xl: 96px
```

## Border Radius
```css
--pg-radius: 4px       /* Default */
--pg-radius-md: 8px    /* Cards */
--pg-radius-lg: 12px   /* Prominent */
--pg-radius-full: 9999px /* Pills */
```

---

# APPENDIX D: Verification Checklist

- [x] All 19 optimal sections are mapped
- [x] Gap analysis is complete for each ENHANCE section
- [x] New section specs include full component lists
- [x] Implementation instructions use PG Design System terminology
- [x] Instructions are actionable in Shopify theme customizer
- [x] Schema structures follow C-Sections Guide standards
- [x] CSS classes follow BEM with pg- prefix
- [x] Range inputs have ≤101 steps
- [x] Optional section (Digital Bonus Stack) documented separately

---

# APPENDIX E: SF2 Page Template JSON Structure

> **Purpose:** Complete JSON structure for `templates/page.sf2-sales-page.json` containing all 19 sections with SF2-specific values.
> **Status:** PLACEHOLDER — Fill in when SF2 copy is finalized.

## File Location

```
templates/page.sf2-sales-page.json
```

## JSON Structure Template

```json
{
  "sections": {
    "header": {
      "type": "pg-header-anchor-links",
      "settings": {
        // SF2 values for Section 1
      }
    },
    "hero": {
      "type": "pg-pdp-hero-atf",
      "settings": {
        // SF2 values for Section 2
      }
    },
    "problem": {
      "type": "pg-problem",
      "settings": {
        // SF2 values for Section 3
      }
    },
    "mechanism": {
      "type": "pg-feature",
      "settings": {
        // SF2 values for Section 4
      }
    },
    "features-1": {
      "type": "pg-feature",
      "settings": {
        // SF2 values for Section 5a
      }
    },
    "features-2": {
      "type": "pg-feature",
      "settings": {
        // SF2 values for Section 5b
      }
    },
    "features-3": {
      "type": "pg-feature",
      "settings": {
        // SF2 values for Section 5c
      }
    },
    "timeline": {
      "type": "pg-what-to-expect-timeline",
      "settings": {
        // SF2 values for Section 6
      },
      "blocks": {
        // Timeline phase blocks
      }
    },
    "use-cases": {
      "type": "pg-product-proof",
      "settings": {
        // SF2 values for Section 7
      }
    },
    "target-audience": {
      "type": "pg-feature",
      "settings": {
        // SF2 values for Section 8
      }
    },
    "expert-1": {
      "type": "pg-guru",
      "settings": {
        // SF2 values for Section 9a
      }
    },
    "expert-2": {
      "type": "pg-guru",
      "settings": {
        // SF2 values for Section 9b
      }
    },
    "bonus-stack": {
      "type": "pg-digital-bonus-stack",
      "settings": {
        // SF2 values for Section 10 (OPTIONAL)
      },
      "blocks": {
        // Bonus item blocks
      }
    },
    "mid-cta": {
      "type": "pg-urgency",
      "settings": {
        // SF2 values for Section 11
      }
    },
    "how-to-use": {
      "type": "pg-feature",
      "settings": {
        // SF2 values for Section 12
      }
    },
    "ugc-carousel": {
      "type": "pg-ugc-carousel",
      "settings": {
        // SF2 values for Section 13a
      }
    },
    "text-testimonials": {
      "type": "pg-text-testimonials",
      "settings": {
        // SF2 values for Section 13b
      }
    },
    "guarantee": {
      "type": "pg-guarantee",
      "settings": {
        // SF2 values for Section 14
      }
    },
    "challenge": {
      "type": "pg-challenge-section",
      "settings": {
        // SF2 values for Section 15
      }
    },
    "us-vs-them": {
      "type": "pg-us-vs-them",
      "settings": {
        // SF2 values for Section 16
      },
      "blocks": {
        // Comparison row blocks
      }
    },
    "specifications": {
      "type": "pg-product-specifications",
      "settings": {
        // SF2 values for Section 17
      }
    },
    "final-cta": {
      "type": "pg-urgency",
      "settings": {
        // SF2 values for Section 18
      }
    },
    "faqs": {
      "type": "pg-faqs",
      "settings": {
        // SF2 values for Section 19
      },
      "blocks": {
        // FAQ item blocks
      }
    }
  },
  "order": [
    "header",
    "hero",
    "problem",
    "mechanism",
    "features-1",
    "features-2",
    "features-3",
    "timeline",
    "use-cases",
    "target-audience",
    "expert-1",
    "expert-2",
    "bonus-stack",
    "mid-cta",
    "how-to-use",
    "ugc-carousel",
    "text-testimonials",
    "guarantee",
    "challenge",
    "us-vs-them",
    "specifications",
    "final-cta",
    "faqs"
  ]
}
```

## Next Steps

1. Finalize SF2 copy and fill in "SF2 Content Values" tables in each section above
2. Transfer values from the tables into this JSON structure
3. Create the page template file in `templates/page.sf2-sales-page.json`
4. Test in Shopify Customizer

