# Performance Golf Design System

This document outlines the complete design system for Performance Golf, providing both general development patterns (CSS/Tailwind/HTML) and Shopify theme integration guidance.

## Design Philosophy

### Brand Concept: There's A Story In Every Swing

Every golfer knows those unforgettable moments. The flush iron that splits the fairway. The putt that drops from twenty feet. The drive that makes your playing partners stop and stare. These aren't just good shots—they're magical moments that define why we love this game.

Our visual identity captures this **cinematic quality**. Drawing inspiration from film's ability to transform ordinary moments into something memorable, we frame golf with precision, drama, and beauty.

### Design Principles

The Performance Golf visual system should feel:

- **Modern** — Clean, contemporary, forward-thinking
- **Technical** — Data-driven precision, performance-focused
- **Approachable** — Warm, inviting, never cold or clinical
- **Confident** — Bold without being aggressive
- **Premium** — High-quality feel without being elitist

### What We Are NOT

- Not brutalist or harsh
- Not cold or clinical
- Not elitist or exclusive
- Not cluttered or overwhelming
- Not generic "sports brand" aesthetic

---

## Code Organization Principles

### Section Structure Pattern

All sections follow this consistent structure for both general development and Shopify:

#### General HTML/CSS Pattern

```html
<section class="pg-section pg-section--[variant]" id="section-name">
  <div class="pg-container">
    <!-- Section header -->
    <header class="pg-section__header">
      <h2 class="pg-heading">Section Title</h2>
    </header>

    <!-- Section content -->
    <div class="pg-section__content">
      <!-- Content components -->
    </div>
  </div>
</section>

<style>
  /* 1. Structure & Layout */
  .pg-section { }
  .pg-container { }

  /* 2. Typography */
  .pg-heading { }

  /* 3. Components */
  .pg-card { }

  /* 4. States */
  .pg-card:hover { }

  /* 5. Media Queries */
  @media screen and (min-width: 768px) { }
</style>
```

#### Shopify Liquid Pattern

```liquid
{% comment %}
  Section Name - Brief Description

  Key features and behaviors
  Based on: Performance Golf Design System
{% endcomment %}

<section class="pg-section" id="{{ section.id }}">
  <div class="pg-container page-width">
    {%- comment -%} Section content {%- endcomment -%}
    {% if section.settings.heading != blank %}
      <h2 class="pg-heading">{{ section.settings.heading }}</h2>
    {% endif %}

    <!-- Section content -->
  </div>
</section>

<style>
  /* Section-specific styles */
  /* Mobile-first approach */

  @media screen and (min-width: 768px) {
    /* Desktop overrides */
  }
</style>

{% schema %}
{
  "name": "Section Name",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Section Title"
    }
  ],
  "presets": [
    {
      "name": "Section Name"
    }
  ]
}
{% endschema %}
```

### Class Naming Convention

Use **BEM-inspired** naming with `pg-` prefix for clarity and namespace isolation:

```css
/* Block */
.pg-hero { }
.pg-card { }
.pg-button { }

/* Block__Element */
.pg-hero__content { }
.pg-hero__headline { }
.pg-card__body { }

/* Block--Modifier */
.pg-button--primary { }
.pg-button--secondary { }
.pg-card--featured { }

/* Element with Modifier */
.pg-hero__headline--large { }
```

**Key principles:**
- Block: Top-level component (`.pg-hero`, `.pg-card`, `.pg-button`)
- Element: Child components use double underscore (`.pg-hero__content`)
- Modifier: Variations use double hyphen (`.pg-button--primary`)
- Always prefix with `pg-` to avoid conflicts
- Maximum 3 levels of nesting

### CSS Organization

Within `<style>` blocks, organize by:

1. Structure & Layout
2. Typography
3. Components
4. States (hover, focus, active)
5. Media Queries (always at end)

```css
<style>
  /* 1. Structure & Layout */
  .pg-section {
    padding: var(--pg-space-3xl) 0;
  }

  .pg-container {
    max-width: var(--pg-container-xl);
    margin: 0 auto;
    padding: 0 var(--pg-space-md);
  }

  /* 2. Typography */
  .pg-heading {
    font-family: var(--pg-font-heading);
    font-weight: 700;
    text-transform: uppercase;
  }

  /* 3. Components */
  .pg-card {
    background: var(--pg-mist);
    border-radius: var(--pg-radius);
    padding: var(--pg-space-lg);
  }

  /* 4. States */
  .pg-card:hover {
    box-shadow: var(--pg-shadow-md);
  }

  /* 5. Media Queries */
  @media screen and (min-width: 768px) {
    .pg-section {
      padding: var(--pg-space-4xl) 0;
    }
  }
</style>
```

---

## Color Palette

### Primary Colors

```css
/* Primary Brand Colors */
--pg-orange: #FD3300;        /* Performance Orange - signature brand color */
--pg-dark-orange: #DB2C00;   /* Dark Orange - hover states, emphasis */
--pg-black: #1D1A1A;         /* Black - text, strong elements */
--pg-ui-gray: #7B726C;       /* UI Gray - secondary text, interface elements */
```

| Name | Hex | RGB | Pantone | Usage |
|------|-----|-----|---------|-------|
| Performance Orange | #FD3300 | 253, 51, 0 | 172 C | CTAs, accents, highlights |
| Dark Orange | #DB2C00 | 219, 44, 0 | 173 C | Hover states, emphasis |
| Black | #1D1A1A | 29, 26, 26 | Black 4 C | Primary text, strong elements |
| UI Gray | #7B726C | 123, 114, 108 | — | Secondary text, UI elements |

### Neutral Colors

```css
/* Neutrals - 60% of visual weight */
--pg-stone: #B3AAA3;         /* Warm Gray 5 - borders, dividers */
--pg-pebble: #DFD9D5;        /* Warm Gray 2 - subtle backgrounds */
--pg-sand: #ECE9E4;          /* Warm Gray 1 - card backgrounds */
--pg-fog: #F4F2F0;           /* Light background alternate */
--pg-mist: #FCFAFA;          /* Lightest - primary background */
```

| Name | Hex | RGB | Pantone | Usage |
|------|-----|-----|---------|-------|
| Stone | #B3AAA3 | 179, 170, 163 | Warm Gray 5 C | Borders, dividers, muted elements |
| Pebble | #DFD9D5 | 223, 217, 213 | Warm Gray 2 C | Subtle backgrounds, badges |
| Sand | #ECE9E4 | 236, 233, 228 | Warm Gray 1 C | Card backgrounds, sections |
| Fog | #F4F2F0 | 244, 242, 240 | — | Alternate light background |
| Mist | #FCFAFA | 252, 250, 250 | — | Primary background, white space |

### Secondary Colors (Use Sparingly)

```css
/* Secondary Colors - 10% maximum */
--pg-hi-vis: #E4F222;        /* Hi-Vis Yellow - alerts, special callouts */
--pg-grass: #BCE9B1;         /* Grass Green - success, positive indicators */
--pg-forest: #2E4734;        /* Forest Green - premium, sophisticated */
--pg-sky: #B2C6EB;           /* Sky Blue - informational, calm */
--pg-indigo: #4F41D5;        /* Indigo - links, interactive elements */
--pg-polo: #C5A6CA;          /* Polo Purple - special features */
```

| Name | Hex | RGB | Pantone | Usage |
|------|-----|-----|---------|-------|
| Hi-Vis | #E4F222 | 228, 242, 34 | 379 C | Alerts, special callouts |
| Grass | #BCE9B1 | 188, 233, 177 | 2260 C | Success states, positive |
| Forest | #2E4734 | 46, 71, 52 | 4209 C | Premium accents |
| Sky | #B2C6EB | 178, 198, 235 | 2708 C | Informational |
| Indigo | #4F41D5 | 79, 65, 213 | 2132 C | Links, interactive |
| Polo | #C5A6CA | 197, 166, 202 | 522 C | Special features |

### Color Proportion

**60% neutrals, 30% Performance Orange/Dark Orange, 10% secondary colors and black**

```
┌─────────────────────────────────────────────────────────────┐
│ Neutrals (Mist, Fog, Sand, Pebble, Stone)              60% │
├─────────────────────────────────────────────────────────────┤
│ Performance Orange / Dark Orange                       30% │
├─────────────────────────────────────────────────────────────┤
│ Black + Secondary Colors                               10% │
└─────────────────────────────────────────────────────────────┘
```

### Selection Highlight

```css
::selection {
  background-color: var(--pg-orange);
  color: var(--pg-mist);
}
```

---

## Typography

### Font Families

```css
/* Primary - Headlines, UI, Body */
--pg-font-heading: 'Repro', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

/* Secondary - Conversational, Editorial */
--pg-font-display: 'GT Super Text', Georgia, 'Times New Roman', serif;

/* Tertiary - Data, Metrics, Technical */
--pg-font-mono: 'Repro Mono', 'DM Mono', 'Courier New', monospace;
```

| Font | Type | Usage |
|------|------|-------|
| Repro | Sans-serif | Headlines, body copy, UI elements |
| GT Super Text | Serif | Conversational tone, editorial content |
| Repro Mono | Monospace | Data, metrics, technical details |

### Font Loading

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/repro/repro-bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/repro/repro-regular.woff2" as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: 'Repro';
  src: url('/fonts/repro/repro-bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: 'Repro';
  src: url('/fonts/repro/repro-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'GT Super Text';
  src: url('/fonts/gt-super-text/gt-super-text-book.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Repro Mono';
  src: url('/fonts/repro-mono/repro-mono-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

### Type Scale

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--pg-text-hero` | 10vw / clamp(3rem, 10vw, 8rem) | 0.87 | Hero headlines |
| `--pg-text-7xl` | 4.5rem (72px) | 0.9 | Large section headlines |
| `--pg-text-6xl` | 3.75rem (60px) | 0.95 | Section headlines |
| `--pg-text-5xl` | 3rem (48px) | 1.0 | Section headlines |
| `--pg-text-4xl` | 2.25rem (36px) | 1.1 | Subheadings |
| `--pg-text-3xl` | 1.875rem (30px) | 1.2 | Card headlines |
| `--pg-text-2xl` | 1.5rem (24px) | 1.3 | Large body text |
| `--pg-text-xl` | 1.25rem (20px) | 1.4 | Emphasized body |
| `--pg-text-base` | 1rem (16px) | 1.5 | Body text |
| `--pg-text-sm` | 0.875rem (14px) | 1.5 | Small body text |
| `--pg-text-xs` | 0.75rem (12px) | 1.4 | Labels, captions |
| `--pg-text-2xs` | 0.625rem (10px) | 1.3 | Micro labels |

### Core Type Specifications

| Element | Font | Weight | Size | Leading | Tracking |
|---------|------|--------|------|---------|----------|
| Headline | Repro Bold | 700 | Responsive | 87% | -3% |
| Subheadline | Repro Medium | 500 | 43pt | 104% | -3% |
| Body Serif | GT Super Text Book | 400 | 1rem–1.125rem | 140% | -2% |
| Body | Repro Regular | 400 | 1rem | 122% | -1% |
| Detail | Repro Mono | 400 | 0.75rem | 135% | 0% |

### Typographic Patterns

#### Hero Headline

```css
.pg-hero-headline {
  font-family: var(--pg-font-heading);
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 700;
  line-height: 0.87;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: var(--pg-black);
}
```

#### Section Headline

```css
.pg-section-headline {
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-5xl);
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: var(--pg-black);
}

@media screen and (min-width: 768px) {
  .pg-section-headline {
    font-size: var(--pg-text-6xl);
  }
}
```

#### Conversational Body (Serif)

```css
.pg-body-serif {
  font-family: var(--pg-font-display);
  font-size: var(--pg-text-xl);
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.02em;
  color: var(--pg-black);
}
```

#### Data/Metric Display

```css
.pg-data-display {
  font-family: var(--pg-font-mono);
  font-size: var(--pg-text-sm);
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--pg-ui-gray);
}
```

#### Mixed Typography Pattern

Combining serif warmth with sans-serif impact:

```html
<h2 class="pg-mixed-headline">
  Stop guessing. <br/>
  Start <strong>making progress.</strong>
</h2>
```

```css
.pg-mixed-headline {
  font-family: var(--pg-font-display);
  font-style: italic;
  font-size: var(--pg-text-4xl);
  line-height: 1.2;
  color: var(--pg-black);
}

.pg-mixed-headline strong {
  font-family: var(--pg-font-heading);
  font-style: normal;
  font-weight: 700;
  color: var(--pg-orange);
}
```

### Line Heights

```css
--pg-leading-none: 1;
--pg-leading-tight: 1.1;
--pg-leading-snug: 1.25;
--pg-leading-normal: 1.5;
--pg-leading-relaxed: 1.625;
--pg-leading-loose: 2;
```

### Font Weights

```css
--pg-font-normal: 400;
--pg-font-medium: 500;
--pg-font-bold: 700;
```

### Letter Spacing

```css
--pg-tracking-tighter: -0.03em;   /* Headlines */
--pg-tracking-tight: -0.02em;     /* Subheadlines */
--pg-tracking-normal: -0.01em;    /* Body text */
--pg-tracking-wide: 0.025em;      /* Labels */
--pg-tracking-wider: 0.05em;      /* Buttons, uppercase */
--pg-tracking-widest: 0.1em;      /* Small caps, badges */
```

---

## Spacing System

Based on 4px increments:

```css
--pg-space-0: 0;
--pg-space-1: 0.25rem;     /* 4px */
--pg-space-2: 0.5rem;      /* 8px */
--pg-space-3: 0.75rem;     /* 12px */
--pg-space-4: 1rem;        /* 16px */
--pg-space-5: 1.25rem;     /* 20px */
--pg-space-6: 1.5rem;      /* 24px */
--pg-space-8: 2rem;        /* 32px */
--pg-space-10: 2.5rem;     /* 40px */
--pg-space-12: 3rem;       /* 48px */
--pg-space-16: 4rem;       /* 64px */
--pg-space-20: 5rem;       /* 80px */
--pg-space-24: 6rem;       /* 96px */
--pg-space-32: 8rem;       /* 128px */
```

### Shorthand Aliases

```css
--pg-space-xs: var(--pg-space-1);   /* 4px */
--pg-space-sm: var(--pg-space-2);   /* 8px */
--pg-space-md: var(--pg-space-4);   /* 16px */
--pg-space-lg: var(--pg-space-6);   /* 24px */
--pg-space-xl: var(--pg-space-8);   /* 32px */
--pg-space-2xl: var(--pg-space-12); /* 48px */
--pg-space-3xl: var(--pg-space-16); /* 64px */
--pg-space-4xl: var(--pg-space-24); /* 96px */
```

---

## Borders

```css
--pg-border-width: 1px;
--pg-border-color: var(--pg-stone);
--pg-border: 1px solid var(--pg-stone);

--pg-radius: 4px;                 /* Default - subtle rounding */
--pg-radius-sm: 2px;              /* Badges, small elements */
--pg-radius-md: 8px;              /* Cards, larger elements */
--pg-radius-lg: 12px;             /* Prominent elements */
--pg-radius-full: 9999px;         /* Pills, circular */
```

### Dividers

```css
.pg-divider {
  border: none;
  border-top: 1px solid var(--pg-pebble);
  margin: var(--pg-space-lg) 0;
}

.pg-divider--strong {
  border-top-color: var(--pg-stone);
}

.pg-divider--accent {
  border-top-color: var(--pg-orange);
  border-top-width: 2px;
}
```

---

## Shadows

Subtle, modern shadows (not brutalist):

```css
--pg-shadow-sm: 0 1px 2px 0 rgba(29, 26, 26, 0.05);
--pg-shadow: 0 1px 3px 0 rgba(29, 26, 26, 0.1), 0 1px 2px -1px rgba(29, 26, 26, 0.1);
--pg-shadow-md: 0 4px 6px -1px rgba(29, 26, 26, 0.1), 0 2px 4px -2px rgba(29, 26, 26, 0.1);
--pg-shadow-lg: 0 10px 15px -3px rgba(29, 26, 26, 0.1), 0 4px 6px -4px rgba(29, 26, 26, 0.1);
--pg-shadow-xl: 0 20px 25px -5px rgba(29, 26, 26, 0.1), 0 8px 10px -6px rgba(29, 26, 26, 0.1);

/* Orange glow for special emphasis */
--pg-shadow-orange: 0 4px 14px 0 rgba(253, 51, 0, 0.25);
--pg-shadow-orange-lg: 0 10px 25px 0 rgba(253, 51, 0, 0.3);
```

---

## Effects & Transforms

### Transitions

```css
--pg-transition-fast: 150ms ease;
--pg-transition-base: 200ms ease;
--pg-transition-slow: 300ms ease;
--pg-transition-slower: 500ms ease;

/* Specific property transitions */
--pg-transition-colors: color 200ms ease, background-color 200ms ease, border-color 200ms ease;
--pg-transition-transform: transform 200ms ease;
--pg-transition-shadow: box-shadow 200ms ease;
--pg-transition-all: all 200ms ease;
```

### Hover Effects

```css
/* Lift on hover */
.pg-hover-lift {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.pg-hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--pg-shadow-md);
}

/* Scale on hover */
.pg-hover-scale {
  transition: transform 300ms ease;
}

.pg-hover-scale:hover {
  transform: scale(1.02);
}

/* Brighten on hover (for images) */
.pg-hover-brighten {
  transition: filter 300ms ease;
}

.pg-hover-brighten:hover {
  filter: brightness(1.05);
}
```

### Opacity Levels

```css
--pg-opacity-disabled: 0.5;
--pg-opacity-muted: 0.6;
--pg-opacity-subtle: 0.8;
```

---

## Components

### Buttons

#### Primary Button

```css
.pg-button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--pg-space-2);

  background: var(--pg-orange);
  color: var(--pg-mist);

  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  padding: var(--pg-space-3) var(--pg-space-6);
  border: none;
  border-radius: var(--pg-radius);

  cursor: pointer;
  transition: var(--pg-transition-colors), var(--pg-transition-shadow);
}

.pg-button-primary:hover {
  background: var(--pg-dark-orange);
}

.pg-button-primary:focus-visible {
  outline: 2px solid var(--pg-orange);
  outline-offset: 2px;
}

.pg-button-primary:disabled {
  opacity: var(--pg-opacity-disabled);
  cursor: not-allowed;
}
```

**HTML:**
```html
<button class="pg-button-primary">
  Start Your Path
</button>
```

**Shopify Liquid:**
```liquid
{% comment %}
  Primary Button - Use for main CTAs
{% endcomment %}
<a href="{{ section.settings.button_link }}" class="pg-button-primary">
  {{ section.settings.button_text | default: 'Learn More' }}
</a>
```

#### Secondary Button

```css
.pg-button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--pg-space-2);

  background: transparent;
  color: var(--pg-black);

  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  padding: var(--pg-space-3) var(--pg-space-6);
  border: 2px solid var(--pg-black);
  border-radius: var(--pg-radius);

  cursor: pointer;
  transition: var(--pg-transition-colors);
}

.pg-button-secondary:hover {
  background: var(--pg-black);
  color: var(--pg-mist);
}
```

#### Text Button / Link

```css
.pg-button-text {
  display: inline-flex;
  align-items: center;
  gap: var(--pg-space-1);

  background: transparent;
  color: var(--pg-orange);

  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  padding: 0;
  border: none;

  cursor: pointer;
  transition: var(--pg-transition-colors);
}

.pg-button-text:hover {
  color: var(--pg-dark-orange);
}

/* Arrow icon animation */
.pg-button-text svg {
  transition: transform 200ms ease;
}

.pg-button-text:hover svg {
  transform: translateX(4px);
}
```

#### Button Sizes

```css
.pg-button--sm {
  font-size: var(--pg-text-xs);
  padding: var(--pg-space-2) var(--pg-space-4);
}

.pg-button--lg {
  font-size: var(--pg-text-base);
  padding: var(--pg-space-4) var(--pg-space-8);
}
```

### Badges

#### Standard Badge

```css
.pg-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--pg-space-1);

  background: var(--pg-pebble);
  color: var(--pg-black);

  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  padding: var(--pg-space-1) var(--pg-space-3);
  border-radius: var(--pg-radius-sm);
}
```

#### Orange Badge (Accent)

```css
.pg-badge--orange {
  background: var(--pg-orange);
  color: var(--pg-mist);
}
```

#### Data Badge (Metric)

```css
.pg-badge--data {
  font-family: var(--pg-font-mono);
  background: var(--pg-sand);
  color: var(--pg-ui-gray);
  letter-spacing: 0;
}
```

**Example HTML:**
```html
<span class="pg-badge">New</span>
<span class="pg-badge pg-badge--orange">Featured</span>
<span class="pg-badge pg-badge--data">+15 YDS</span>
```

### Cards

#### Standard Card

```css
.pg-card {
  background: var(--pg-mist);
  border-radius: var(--pg-radius-md);
  padding: var(--pg-space-lg);
  transition: var(--pg-transition-shadow);
}

.pg-card:hover {
  box-shadow: var(--pg-shadow-md);
}

.pg-card__header {
  margin-bottom: var(--pg-space-md);
}

.pg-card__title {
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-xl);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: var(--pg-black);
  margin: 0 0 var(--pg-space-2);
}

.pg-card__subtitle {
  font-family: var(--pg-font-mono);
  font-size: var(--pg-text-xs);
  text-transform: uppercase;
  color: var(--pg-ui-gray);
  margin: 0;
}

.pg-card__body {
  color: var(--pg-ui-gray);
  font-size: var(--pg-text-base);
  line-height: 1.6;
}

.pg-card__footer {
  margin-top: var(--pg-space-lg);
  padding-top: var(--pg-space-md);
  border-top: 1px solid var(--pg-pebble);
}
```

**Example HTML:**
```html
<article class="pg-card">
  <header class="pg-card__header">
    <p class="pg-card__subtitle">Lesson 3</p>
    <h3 class="pg-card__title">Perfect Your Grip</h3>
  </header>
  <div class="pg-card__body">
    <p>Master the fundamentals that unlock consistent ball striking.</p>
  </div>
  <footer class="pg-card__footer">
    <a href="#" class="pg-button-text">
      Start Lesson
      <svg><!-- arrow icon --></svg>
    </a>
  </footer>
</article>
```

#### Featured Card (with image)

```css
.pg-card--featured {
  overflow: hidden;
  padding: 0;
}

.pg-card--featured .pg-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.pg-card--featured .pg-card__content {
  padding: var(--pg-space-lg);
}
```

### Metric Display

```css
.pg-metric {
  display: flex;
  flex-direction: column;
  gap: var(--pg-space-1);
}

.pg-metric__value {
  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-5xl);
  font-weight: 700;
  line-height: 1;
  color: var(--pg-orange);
}

.pg-metric__label {
  font-family: var(--pg-font-mono);
  font-size: var(--pg-text-xs);
  text-transform: uppercase;
  color: var(--pg-ui-gray);
}
```

**Example:**
```html
<div class="pg-metric">
  <span class="pg-metric__value">+18</span>
  <span class="pg-metric__label">Yards Gained</span>
</div>
```

### Form Elements

#### Input Field

```css
.pg-input {
  width: 100%;

  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-base);
  color: var(--pg-black);

  background: var(--pg-mist);
  border: 1px solid var(--pg-stone);
  border-radius: var(--pg-radius);
  padding: var(--pg-space-3) var(--pg-space-4);

  transition: var(--pg-transition-colors);
}

.pg-input::placeholder {
  color: var(--pg-ui-gray);
}

.pg-input:focus {
  outline: none;
  border-color: var(--pg-orange);
  box-shadow: 0 0 0 3px rgba(253, 51, 0, 0.1);
}

.pg-input:disabled {
  background: var(--pg-fog);
  cursor: not-allowed;
}
```

#### Label

```css
.pg-label {
  display: block;

  font-family: var(--pg-font-heading);
  font-size: var(--pg-text-sm);
  font-weight: 500;
  color: var(--pg-black);

  margin-bottom: var(--pg-space-2);
}
```

---

## Layout Patterns

### Container

```css
.pg-container {
  width: 100%;
  max-width: var(--pg-container-xl);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--pg-space-md);
  padding-right: var(--pg-space-md);
}

/* Container Widths */
--pg-container-sm: 640px;
--pg-container-md: 768px;
--pg-container-lg: 1024px;
--pg-container-xl: 1280px;
--pg-container-2xl: 1536px;
```

### Section Spacing

```css
.pg-section {
  padding-top: var(--pg-space-3xl);
  padding-bottom: var(--pg-space-3xl);
}

@media screen and (min-width: 768px) {
  .pg-section {
    padding-top: var(--pg-space-4xl);
    padding-bottom: var(--pg-space-4xl);
  }
}

.pg-section--sm {
  padding-top: var(--pg-space-2xl);
  padding-bottom: var(--pg-space-2xl);
}
```

### Grid System

```css
.pg-grid {
  display: grid;
  gap: var(--pg-space-lg);
}

/* 2-Column Grid */
.pg-grid--2 {
  grid-template-columns: 1fr;
}

@media screen and (min-width: 768px) {
  .pg-grid--2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 3-Column Grid */
.pg-grid--3 {
  grid-template-columns: 1fr;
}

@media screen and (min-width: 768px) {
  .pg-grid--3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1024px) {
  .pg-grid--3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 4-Column Grid */
.pg-grid--4 {
  grid-template-columns: repeat(2, 1fr);
}

@media screen and (min-width: 768px) {
  .pg-grid--4 {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Flexbox Utilities

```css
.pg-flex {
  display: flex;
}

.pg-flex--center {
  align-items: center;
  justify-content: center;
}

.pg-flex--between {
  align-items: center;
  justify-content: space-between;
}

.pg-flex--col {
  flex-direction: column;
}

.pg-gap-sm { gap: var(--pg-space-sm); }
.pg-gap-md { gap: var(--pg-space-md); }
.pg-gap-lg { gap: var(--pg-space-lg); }
.pg-gap-xl { gap: var(--pg-space-xl); }
```

---

## Responsive Breakpoints

```css
/* Mobile first approach */
--pg-breakpoint-sm: 640px;
--pg-breakpoint-md: 768px;
--pg-breakpoint-lg: 1024px;
--pg-breakpoint-xl: 1280px;
--pg-breakpoint-2xl: 1536px;
```

**Usage:**
- Base styles: Mobile (320px+)
- `sm:` prefix: Small tablets (640px+)
- `md:` prefix: Tablets (768px+)
- `lg:` prefix: Desktop (1024px+)
- `xl:` prefix: Large desktop (1280px+)

```css
/* Example: Mobile-first responsive pattern */
.pg-hero__title {
  font-size: var(--pg-text-4xl);
}

@media screen and (min-width: 768px) {
  .pg-hero__title {
    font-size: var(--pg-text-6xl);
  }
}

@media screen and (min-width: 1024px) {
  .pg-hero__title {
    font-size: var(--pg-text-7xl);
  }
}
```

### Visibility Utilities

```css
.pg-hide-mobile {
  display: none;
}

@media screen and (min-width: 768px) {
  .pg-hide-mobile {
    display: block;
  }
}

.pg-hide-desktop {
  display: block;
}

@media screen and (min-width: 768px) {
  .pg-hide-desktop {
    display: none;
  }
}
```

---

## Animations

### Fade In

```css
@keyframes pg-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.pg-animate-fade-in {
  animation: pg-fade-in 300ms ease forwards;
}
```

### Slide Up

```css
@keyframes pg-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pg-animate-slide-up {
  animation: pg-slide-up 400ms ease forwards;
}
```

### Pulse (for loading states)

```css
@keyframes pg-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pg-animate-pulse {
  animation: pg-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## Image Treatment

### Standard Image

```css
.pg-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--pg-radius-md);
}
```

### Aspect Ratio Containers

```css
.pg-aspect-video {
  aspect-ratio: 16 / 9;
}

.pg-aspect-square {
  aspect-ratio: 1 / 1;
}

.pg-aspect-portrait {
  aspect-ratio: 3 / 4;
}
```

### Image Overlay

```css
.pg-image-overlay {
  position: relative;
}

.pg-image-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(29, 26, 26, 0.8));
}
```

---

## Accessibility

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--pg-orange);
  outline-offset: 2px;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Minimum Touch Targets

All interactive elements should be at least 44x44px on mobile devices.

```css
.pg-touch-target {
  min-width: 44px;
  min-height: 44px;
}
```

### Screen Reader Utilities

```css
.pg-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Color Contrast

All approved color combinations meet WCAG 4.5:1 minimum contrast ratio for body text.

**Approved Combinations:**
- Performance Orange on Mist/Fog
- Black on Mist/Fog/Sand/Pebble
- UI Gray on Mist only (for secondary text)
- Mist on Black/Dark Orange/Performance Orange

---

## Usage Guidelines

### Do's

- Use 60/30/10 color proportion (neutrals/orange/accents)
- Keep typography clean and hierarchical
- Maintain warm, approachable aesthetic
- Use Performance Orange for CTAs and emphasis
- Use subtle shadows and rounded corners
- Lead with emotion, support with data
- Write in Brixton's voice (encouraging, confident)
- Ensure adequate whitespace

### Don'ts

- Don't use harsh or brutalist design elements
- Don't be cold, clinical, or robotic
- Don't be elitist or exclusive in tone
- Don't overuse Performance Orange (maintain proportion)
- Don't use sharp corners or hard shadows
- Don't use tech jargon (say "personalized path" not "AI algorithm")
- Don't overhype results ("CRUSH 50 YARDS!!!")
- Don't crowd elements together

---

## Tailwind CSS Configuration

If using Tailwind CSS, extend your configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        pg: {
          orange: '#FD3300',
          'dark-orange': '#DB2C00',
          black: '#1D1A1A',
          'ui-gray': '#7B726C',
          stone: '#B3AAA3',
          pebble: '#DFD9D5',
          sand: '#ECE9E4',
          fog: '#F4F2F0',
          mist: '#FCFAFA',
          'hi-vis': '#E4F222',
          grass: '#BCE9B1',
          forest: '#2E4734',
          sky: '#B2C6EB',
          indigo: '#4F41D5',
          polo: '#C5A6CA',
        }
      },
      fontFamily: {
        'pg-heading': ['Repro', 'DM Sans', 'system-ui', 'sans-serif'],
        'pg-display': ['GT Super Text', 'Georgia', 'serif'],
        'pg-mono': ['Repro Mono', 'DM Mono', 'monospace'],
      },
      borderRadius: {
        'pg': '4px',
        'pg-md': '8px',
        'pg-lg': '12px',
      },
      boxShadow: {
        'pg': '0 1px 3px 0 rgba(29, 26, 26, 0.1), 0 1px 2px -1px rgba(29, 26, 26, 0.1)',
        'pg-md': '0 4px 6px -1px rgba(29, 26, 26, 0.1), 0 2px 4px -2px rgba(29, 26, 26, 0.1)',
        'pg-lg': '0 10px 15px -3px rgba(29, 26, 26, 0.1), 0 4px 6px -4px rgba(29, 26, 26, 0.1)',
        'pg-orange': '0 4px 14px 0 rgba(253, 51, 0, 0.25)',
      }
    }
  }
}
```

**Example Tailwind Usage:**

```html
<!-- Primary Button -->
<button class="bg-pg-orange hover:bg-pg-dark-orange text-pg-mist font-pg-heading font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded-pg transition-colors">
  Start Your Path
</button>

<!-- Card -->
<article class="bg-pg-mist rounded-pg-md p-6 shadow-pg hover:shadow-pg-md transition-shadow">
  <h3 class="font-pg-heading font-bold text-xl uppercase tracking-tight text-pg-black mb-2">
    Card Title
  </h3>
  <p class="text-pg-ui-gray">
    Card description goes here.
  </p>
</article>
```

---

## Shopify Integration Guide

### Section Template Pattern

```liquid
{% comment %}
  Section: Feature Grid

  A responsive grid of feature cards showcasing PG benefits.
  Based on: Performance Golf Design System
{% endcomment %}

<section class="pg-section pg-feature-grid" id="{{ section.id }}">
  <div class="pg-container page-width">

    {%- comment -%} Section Header {%- endcomment -%}
    {% if section.settings.heading != blank %}
      <header class="pg-feature-grid__header">
        <h2 class="pg-section-headline">
          {{ section.settings.heading }}
        </h2>
        {% if section.settings.subheading != blank %}
          <p class="pg-body-serif">
            {{ section.settings.subheading }}
          </p>
        {% endif %}
      </header>
    {% endif %}

    {%- comment -%} Feature Cards Grid {%- endcomment -%}
    <div class="pg-grid pg-grid--3">
      {% for block in section.blocks %}
        <article class="pg-card" {{ block.shopify_attributes }}>
          <header class="pg-card__header">
            {% if block.settings.label != blank %}
              <p class="pg-card__subtitle">{{ block.settings.label }}</p>
            {% endif %}
            <h3 class="pg-card__title">{{ block.settings.title }}</h3>
          </header>
          <div class="pg-card__body">
            <p>{{ block.settings.description }}</p>
          </div>
          {% if block.settings.button_text != blank %}
            <footer class="pg-card__footer">
              <a href="{{ block.settings.button_link }}" class="pg-button-text">
                {{ block.settings.button_text }}
                {% render 'icon-arrow-right' %}
              </a>
            </footer>
          {% endif %}
        </article>
      {% endfor %}
    </div>

  </div>
</section>

<style>
  /* Section-specific styles */
  .pg-feature-grid__header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto var(--pg-space-2xl);
  }

  .pg-feature-grid__header .pg-body-serif {
    margin-top: var(--pg-space-md);
    color: var(--pg-ui-gray);
  }
</style>

{% schema %}
{
  "name": "Feature Grid",
  "tag": "section",
  "class": "pg-feature-grid-section",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Why Performance Golf?"
    },
    {
      "type": "textarea",
      "id": "subheading",
      "label": "Subheading",
      "default": "Your personalized path to playing better golf."
    }
  ],
  "blocks": [
    {
      "type": "feature",
      "name": "Feature Card",
      "settings": [
        {
          "type": "text",
          "id": "label",
          "label": "Label",
          "default": "Feature"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Feature Title"
        },
        {
          "type": "textarea",
          "id": "description",
          "label": "Description",
          "default": "Feature description goes here."
        },
        {
          "type": "text",
          "id": "button_text",
          "label": "Button Text"
        },
        {
          "type": "url",
          "id": "button_link",
          "label": "Button Link"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Feature Grid",
      "blocks": [
        { "type": "feature" },
        { "type": "feature" },
        { "type": "feature" }
      ]
    }
  ]
}
{% endschema %}
```

### Global CSS Variables (Shopify)

Add to your theme's main CSS file (e.g., `base.css` or `theme.css`):

```css
/*
 * Performance Golf Design System Variables
 * Add to: assets/pg-design-system.css
 * Include in theme.liquid: {{ 'pg-design-system.css' | asset_url | stylesheet_tag }}
 */

:root {
  /* Primary Colors */
  --pg-orange: #FD3300;
  --pg-dark-orange: #DB2C00;
  --pg-black: #1D1A1A;
  --pg-ui-gray: #7B726C;

  /* Neutrals */
  --pg-stone: #B3AAA3;
  --pg-pebble: #DFD9D5;
  --pg-sand: #ECE9E4;
  --pg-fog: #F4F2F0;
  --pg-mist: #FCFAFA;

  /* Secondary Colors */
  --pg-hi-vis: #E4F222;
  --pg-grass: #BCE9B1;
  --pg-forest: #2E4734;
  --pg-sky: #B2C6EB;
  --pg-indigo: #4F41D5;
  --pg-polo: #C5A6CA;

  /* Typography */
  --pg-font-heading: 'Repro', 'DM Sans', var(--font-body-family, sans-serif);
  --pg-font-display: 'GT Super Text', Georgia, var(--font-heading-family, serif);
  --pg-font-mono: 'Repro Mono', 'DM Mono', monospace;

  /* Font Sizes */
  --pg-text-hero: clamp(3rem, 10vw, 8rem);
  --pg-text-7xl: 4.5rem;
  --pg-text-6xl: 3.75rem;
  --pg-text-5xl: 3rem;
  --pg-text-4xl: 2.25rem;
  --pg-text-3xl: 1.875rem;
  --pg-text-2xl: 1.5rem;
  --pg-text-xl: 1.25rem;
  --pg-text-base: 1rem;
  --pg-text-sm: 0.875rem;
  --pg-text-xs: 0.75rem;
  --pg-text-2xs: 0.625rem;

  /* Spacing */
  --pg-space-1: 0.25rem;
  --pg-space-2: 0.5rem;
  --pg-space-3: 0.75rem;
  --pg-space-4: 1rem;
  --pg-space-5: 1.25rem;
  --pg-space-6: 1.5rem;
  --pg-space-8: 2rem;
  --pg-space-10: 2.5rem;
  --pg-space-12: 3rem;
  --pg-space-16: 4rem;
  --pg-space-20: 5rem;
  --pg-space-24: 6rem;
  --pg-space-32: 8rem;

  /* Shorthand Spacing */
  --pg-space-xs: var(--pg-space-1);
  --pg-space-sm: var(--pg-space-2);
  --pg-space-md: var(--pg-space-4);
  --pg-space-lg: var(--pg-space-6);
  --pg-space-xl: var(--pg-space-8);
  --pg-space-2xl: var(--pg-space-12);
  --pg-space-3xl: var(--pg-space-16);
  --pg-space-4xl: var(--pg-space-24);

  /* Borders */
  --pg-radius: 4px;
  --pg-radius-sm: 2px;
  --pg-radius-md: 8px;
  --pg-radius-lg: 12px;
  --pg-radius-full: 9999px;

  /* Shadows */
  --pg-shadow-sm: 0 1px 2px 0 rgba(29, 26, 26, 0.05);
  --pg-shadow: 0 1px 3px 0 rgba(29, 26, 26, 0.1), 0 1px 2px -1px rgba(29, 26, 26, 0.1);
  --pg-shadow-md: 0 4px 6px -1px rgba(29, 26, 26, 0.1), 0 2px 4px -2px rgba(29, 26, 26, 0.1);
  --pg-shadow-lg: 0 10px 15px -3px rgba(29, 26, 26, 0.1), 0 4px 6px -4px rgba(29, 26, 26, 0.1);
  --pg-shadow-orange: 0 4px 14px 0 rgba(253, 51, 0, 0.25);

  /* Transitions */
  --pg-transition-fast: 150ms ease;
  --pg-transition-base: 200ms ease;
  --pg-transition-slow: 300ms ease;

  /* Containers */
  --pg-container-sm: 640px;
  --pg-container-md: 768px;
  --pg-container-lg: 1024px;
  --pg-container-xl: 1280px;
  --pg-container-2xl: 1536px;
}
```

### Asset Organization

```
<!-- PLACEHOLDER: Update paths once theme access is available -->

assets/
├── pg-design-system.css        <!-- Core design system variables -->
├── pg-components.css           <!-- Component styles -->
├── pg-utilities.css            <!-- Utility classes -->
│
├── fonts/
│   ├── repro-bold.woff2
│   ├── repro-regular.woff2
│   ├── gt-super-text-book.woff2
│   └── repro-mono-regular.woff2
│
└── logos/
    ├── pg-symbol.svg
    ├── pg-logotype.svg
    └── pg-combination-mark.svg

sections/
├── pg-hero.liquid
├── pg-feature-grid.liquid
├── pg-testimonials.liquid
└── pg-cta-banner.liquid

snippets/
├── pg-button.liquid
├── pg-card.liquid
├── pg-badge.liquid
└── icon-arrow-right.liquid
```

### Theme Integration Checklist

When integrating with the existing PG Shopify theme:

- [ ] Add `pg-design-system.css` to theme assets
- [ ] Include CSS in `theme.liquid` head
- [ ] Upload brand fonts to assets folder
- [ ] Create component snippets
- [ ] Update existing sections to use PG classes
- [ ] Test responsive behavior
- [ ] Verify color contrast meets accessibility standards
- [ ] Test all interactive states (hover, focus, active)

---

## Complete CSS Variables Reference

Copy this entire block to create a standalone CSS file:

```css
/* Performance Golf Design System v1.0.0 */

:root {
  /* ==================== COLORS ==================== */

  /* Primary */
  --pg-orange: #FD3300;
  --pg-dark-orange: #DB2C00;
  --pg-black: #1D1A1A;
  --pg-ui-gray: #7B726C;

  /* Neutrals */
  --pg-stone: #B3AAA3;
  --pg-pebble: #DFD9D5;
  --pg-sand: #ECE9E4;
  --pg-fog: #F4F2F0;
  --pg-mist: #FCFAFA;

  /* Secondary */
  --pg-hi-vis: #E4F222;
  --pg-grass: #BCE9B1;
  --pg-forest: #2E4734;
  --pg-sky: #B2C6EB;
  --pg-indigo: #4F41D5;
  --pg-polo: #C5A6CA;

  /* ==================== TYPOGRAPHY ==================== */

  /* Font Families */
  --pg-font-heading: 'Repro', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --pg-font-display: 'GT Super Text', Georgia, 'Times New Roman', serif;
  --pg-font-mono: 'Repro Mono', 'DM Mono', 'Courier New', monospace;

  /* Font Sizes */
  --pg-text-hero: clamp(3rem, 10vw, 8rem);
  --pg-text-7xl: 4.5rem;
  --pg-text-6xl: 3.75rem;
  --pg-text-5xl: 3rem;
  --pg-text-4xl: 2.25rem;
  --pg-text-3xl: 1.875rem;
  --pg-text-2xl: 1.5rem;
  --pg-text-xl: 1.25rem;
  --pg-text-base: 1rem;
  --pg-text-sm: 0.875rem;
  --pg-text-xs: 0.75rem;
  --pg-text-2xs: 0.625rem;

  /* Font Weights */
  --pg-font-normal: 400;
  --pg-font-medium: 500;
  --pg-font-bold: 700;

  /* Line Heights */
  --pg-leading-none: 1;
  --pg-leading-tight: 1.1;
  --pg-leading-snug: 1.25;
  --pg-leading-normal: 1.5;
  --pg-leading-relaxed: 1.625;
  --pg-leading-loose: 2;

  /* Letter Spacing */
  --pg-tracking-tighter: -0.03em;
  --pg-tracking-tight: -0.02em;
  --pg-tracking-normal: -0.01em;
  --pg-tracking-wide: 0.025em;
  --pg-tracking-wider: 0.05em;
  --pg-tracking-widest: 0.1em;

  /* ==================== SPACING ==================== */

  --pg-space-0: 0;
  --pg-space-1: 0.25rem;
  --pg-space-2: 0.5rem;
  --pg-space-3: 0.75rem;
  --pg-space-4: 1rem;
  --pg-space-5: 1.25rem;
  --pg-space-6: 1.5rem;
  --pg-space-8: 2rem;
  --pg-space-10: 2.5rem;
  --pg-space-12: 3rem;
  --pg-space-16: 4rem;
  --pg-space-20: 5rem;
  --pg-space-24: 6rem;
  --pg-space-32: 8rem;

  /* Shorthand */
  --pg-space-xs: var(--pg-space-1);
  --pg-space-sm: var(--pg-space-2);
  --pg-space-md: var(--pg-space-4);
  --pg-space-lg: var(--pg-space-6);
  --pg-space-xl: var(--pg-space-8);
  --pg-space-2xl: var(--pg-space-12);
  --pg-space-3xl: var(--pg-space-16);
  --pg-space-4xl: var(--pg-space-24);

  /* ==================== BORDERS ==================== */

  --pg-border-width: 1px;
  --pg-border-color: var(--pg-stone);
  --pg-border: 1px solid var(--pg-stone);

  --pg-radius: 4px;
  --pg-radius-sm: 2px;
  --pg-radius-md: 8px;
  --pg-radius-lg: 12px;
  --pg-radius-full: 9999px;

  /* ==================== SHADOWS ==================== */

  --pg-shadow-sm: 0 1px 2px 0 rgba(29, 26, 26, 0.05);
  --pg-shadow: 0 1px 3px 0 rgba(29, 26, 26, 0.1), 0 1px 2px -1px rgba(29, 26, 26, 0.1);
  --pg-shadow-md: 0 4px 6px -1px rgba(29, 26, 26, 0.1), 0 2px 4px -2px rgba(29, 26, 26, 0.1);
  --pg-shadow-lg: 0 10px 15px -3px rgba(29, 26, 26, 0.1), 0 4px 6px -4px rgba(29, 26, 26, 0.1);
  --pg-shadow-xl: 0 20px 25px -5px rgba(29, 26, 26, 0.1), 0 8px 10px -6px rgba(29, 26, 26, 0.1);
  --pg-shadow-orange: 0 4px 14px 0 rgba(253, 51, 0, 0.25);
  --pg-shadow-orange-lg: 0 10px 25px 0 rgba(253, 51, 0, 0.3);

  /* ==================== TRANSITIONS ==================== */

  --pg-transition-fast: 150ms ease;
  --pg-transition-base: 200ms ease;
  --pg-transition-slow: 300ms ease;
  --pg-transition-slower: 500ms ease;

  /* ==================== CONTAINERS ==================== */

  --pg-container-sm: 640px;
  --pg-container-md: 768px;
  --pg-container-lg: 1024px;
  --pg-container-xl: 1280px;
  --pg-container-2xl: 1536px;

  /* ==================== BREAKPOINTS ==================== */

  --pg-breakpoint-sm: 640px;
  --pg-breakpoint-md: 768px;
  --pg-breakpoint-lg: 1024px;
  --pg-breakpoint-xl: 1280px;
  --pg-breakpoint-2xl: 1536px;

  /* ==================== OPACITY ==================== */

  --pg-opacity-disabled: 0.5;
  --pg-opacity-muted: 0.6;
  --pg-opacity-subtle: 0.8;
}

/* Selection Highlight */
::selection {
  background-color: var(--pg-orange);
  color: var(--pg-mist);
}
```

---

## Maintenance

When adding new components or sections:

1. **Reference this design system first** — Check existing patterns before creating new ones
2. **Use existing tokens** — Colors, typography, spacing from CSS variables
3. **Follow naming convention** — Use `pg-` prefix with BEM-inspired naming
4. **Mobile-first responsive** — Base styles for mobile, `@media` for desktop
5. **Organize CSS** — Structure → Typography → Components → States → Media
6. **Test accessibility** — Focus states, contrast ratios, touch targets
7. **Document new patterns** — Update this file when adding novel patterns

---

**Design System Version:** 1.0.0
**Last Updated:** 2025-01-19
**Brand Guidelines Reference:** pg-brand-guidelines/SKILL.md
**Maintained by:** Performance Golf

**Changelog:**
- v1.0.0 (2025-01-19): Initial design system documentation with dual CSS/Shopify implementation
