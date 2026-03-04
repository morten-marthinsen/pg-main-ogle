# SINGLE FILE — CLAUDE CODE BUILD PROMPT
# ONE.1 "AUTO-CORRECT" WEDGE SALES PAGE
# Copy everything below and paste directly into Claude Code

---

## TABLE OF CONTENTS

1. [Purpose & Output Expectations](#purpose--output-expectations)
2. [Critical Non-Negotiable Rules](#critical-non-negotiable-rules)
3. [Build Target & Tech Stack](#build-target--tech-stack)
4. [Performance Golf Brand System](#performance-golf-brand-system)
5. [Global Design System](#global-design-system)
6. [Motion Design System](#motion-design-system)
7. [Component Specifications](#component-specifications)
8. [Section-by-Section Build Specifications](#section-by-section-build-specifications)
9. [Content Model — JSON](#content-model--json)
10. [File Structure](#file-structure)
11. [Acceptance Criteria](#acceptance-criteria)
12. [Fallback Instructions](#fallback-instructions)

---

## PURPOSE & OUTPUT EXPECTATIONS

Generate a **complete, production-quality sales page** from this specification.

This document is the **single source of truth** for: copy, structure, typography, colors, components, motion, spacing, and accessibility.

**Expected output**: A single `index.html` file with all CSS inline in `<style>` tags and all JS inline in `<script>` tags — ready for asset integration and deployment.

**Design Standard**: Apple Studio Display-level polish. Restraint signals confidence. Let the product speak.

---

## CRITICAL NON-NEGOTIABLE RULES

### Copy Integrity (MOST IMPORTANT)
1. **DO NOT rewrite, rephrase, edit, or "improve" any copy** — not a single word, comma, space, or line break.
2. **DO NOT add claims, benefits, guarantees, numbers, endorsements, or testimonials** beyond what's in the JSON.
3. **DO NOT reorder sections** — sequence is intentional for persuasion flow.
4. **Preserve blank lines** — empty strings `""` in the JSON arrays represent intentional visual breathing room.
5. **Bracketed text** (`[Product Image Gallery]`, `[Trust Badges]`, `[Hero Animation]`) are placeholders:
   - Render them as styled placeholder containers with descriptive text
   - Add TODO comments for developers
   - **Never replace with invented content**

### Motion Integrity
6. **Respect `prefers-reduced-motion`**:
   - Do not initialize GSAP when reduced motion is preferred
   - Render all elements in their final visible state immediately
   - No autoplay on any motion media
7. **Animate only `transform` and `opacity`** — never animate layout properties (width, height, padding, margin).
8. **Prevent CLS**: All images/media must have explicit `width`/`height` or `aspect-ratio` containers.

### Mobile-First (NON-NEGOTIABLE)
9. **Design for 375px FIRST**, then enhance for larger screens.
10. **Touch targets minimum 44x44px** — all buttons, selectors, toggles.
11. **Sticky mobile CTA bar** is critical for conversion — must appear after scrolling past first CTA.
12. **All animations must perform smoothly on mobile** — prefer simpler animations over janky complex ones.

### Code Quality
13. **No placeholder images from external URLs** — use solid color boxes with aspect ratios and TODO comments.
14. **No `console.log` statements** in final output.
15. **No inline styles on elements** — use CSS classes only.

---

## BUILD TARGET & TECH STACK

```
Output:         Single index.html file (~80-120KB)
Styling:        Inline CSS in <style> tags with CSS custom properties
Motion:         GSAP 3.12+ with ScrollTrigger (CDN)
Fonts:          Google Fonts (DM Sans, DM Mono, Playfair Display)
Images:         Placeholder containers with aspect ratios
```

**CDN Dependencies (load in <head>):**
```html
<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">

<!-- GSAP + Plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
```

---

## PERFORMANCE GOLF BRAND SYSTEM

### Brand Essence
**Tagline**: "There's a story in every swing."
**Visual Tone**: Precise, dramatic, premium, modern — never gimmicky or over-designed.
**Design Philosophy**: Restraint is sophistication. Let the product speak. Confidence, not desperation.

### Color Palette (Use Exact HEX Values)

#### Primary Colors
| Name | HEX | CSS Variable | Usage |
|------|-----|--------------|-------|
| Performance Orange | `#FD3300` | `--pg-orange` | CTAs, key accents ONLY |
| Dark Orange | `#DB2C00` | `--pg-orange-dark` | CTA hover states |
| Black | `#1D1A1A` | `--pg-black` | Primary text, headings |
| UI Gray | `#7B726C` | `--pg-gray` | Secondary text, captions |

#### Neutral Palette
| Name | HEX | CSS Variable | Usage |
|------|-----|--------------|-------|
| Stone | `#B3AAA3` | `--pg-stone` | Borders, dividers |
| Pebble | `#DFD9D5` | `--pg-pebble` | Card borders, subtle lines |
| Sand | `#ECE9E4` | `--pg-sand` | Alternate section backgrounds |
| Fog | `#F4F2F0` | `--pg-fog` | Card backgrounds, CTA panels |
| Mist | `#FCFAFA` | `--pg-mist` | Page background (default) |

#### Color Proportion Rule
- **60%** Neutrals (Mist, Fog, Sand, white)
- **30%** Black + UI Gray (text)
- **10%** Performance Orange (CTAs and small accents only)

**Critical**: Orange is precious — use it sparingly for maximum impact. Never use orange for large background fills.

### Typography System

#### Font Variables
```css
:root {
  --font-heading: 'DM Sans', system-ui, sans-serif;
  --font-body: 'Playfair Display', Georgia, serif;
  --font-mono: 'DM Mono', ui-monospace, monospace;
}
```

#### Type Scale (Mobile → Desktop)

| Element | Font | Weight | Mobile | Desktop | Line Height | Letter Spacing |
|---------|------|--------|--------|---------|-------------|----------------|
| H1 (Hero only) | DM Sans | 700 | 32px | 56px | 1.1 | -0.02em |
| H2 (Section heads) | DM Sans | 700 | 26px | 40px | 1.15 | -0.01em |
| H3 (Feature titles) | DM Sans | 500 | 20px | 28px | 1.25 | 0 |
| Body (paragraphs) | Playfair Display | 400 | 17px | 19px | 1.6 | 0 |
| UI Text | DM Sans | 400 | 14px | 15px | 1.4 | 0.01em |
| Eyebrow | DM Mono | 400 | 11px | 12px | 1.3 | 0.1em |
| CTA Button | DM Sans | 600 | 15px | 16px | 1 | 0.02em |
| Price | DM Sans | 700 | 24px | 32px | 1 | -0.01em |

#### Font Application Rules
- **Headlines/CTAs/UI**: `var(--font-heading)`
- **Body paragraphs**: `var(--font-body)` — provides warmth and readability
- **Technical labels/eyebrows/specs**: `var(--font-mono)` — signals precision
- Eyebrows use `text-transform: uppercase` via CSS (do not modify source strings)

---

## GLOBAL DESIGN SYSTEM

### Layout & Spacing

#### Container Widths
```css
--container-max: 1200px;      /* Standard sections */
--container-narrow: 800px;    /* Text-heavy sections */
--container-tight: 640px;     /* Single-column reading */
```

#### Responsive Padding
| Breakpoint | Horizontal Padding |
|------------|-------------------|
| Mobile (<640px) | 20px |
| Tablet (640-1024px) | 32px |
| Desktop (>1024px) | 40px |

#### Section Spacing
| Element | Mobile | Desktop |
|---------|--------|---------|
| Section padding (vertical) | 64px | 96px |
| Between content blocks | 32px | 48px |
| Between paragraphs | 20px | 24px |
| Card internal padding | 20px | 32px |

#### Section Rhythm (Apple-Inspired)
Sections alternate between:
- **"Wow Moment" zones** (hero animations, feature reveals) — larger, more dramatic
- **"Reading" zones** (body copy, testimonials, specs) — tighter, let content breathe

### Card Styling
```css
.card {
  background: white;
  border: 1px solid var(--pg-pebble);
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
```

### Button System
```css
.btn-primary {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: white;
  background: var(--pg-orange);
  padding: 16px 32px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  min-height: 52px; /* Touch target */
}

.btn-primary:hover {
  background: var(--pg-orange-dark);
  transform: scale(1.02);
}

.btn-primary:focus-visible {
  outline: 3px solid var(--pg-orange);
  outline-offset: 3px;
}
```

### Trust Badge Styling
```css
.trust-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pg-gray);
}
```

---

## MOTION DESIGN SYSTEM

### Core Principles (Apple-Inspired)
1. **Purposeful**: Motion guides attention, never distracts
2. **Restrained**: No bounce, no overshoot, no playful effects
3. **Scroll-driven**: Triggered by scroll position, not time
4. **One focal point**: Maximum one major animation per viewport
5. **Silent reading**: No motion while content is being read
6. **Mobile-performant**: Simpler animations on mobile, same impact

### Default Animation Values
```javascript
const motionDefaults = {
  y: 30,                    // translateY start offset
  opacity: 0,               // start opacity
  duration: 0.6,            // seconds
  ease: "power2.out",       // GSAP easing
  stagger: 0.1,             // seconds between items
  trigger: "top 85%",       // ScrollTrigger start
  once: true                // play only once
};
```

### Animation Patterns

#### Pattern 1: Fade Up (Default for most elements)
```javascript
gsap.from('[data-anim="fade-up"]', {
  y: 30,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  scrollTrigger: {
    trigger: element,
    start: "top 85%",
    once: true
  }
});
```

#### Pattern 2: Stagger List (For bullet points, features, cards)
```javascript
gsap.from('[data-anim="stagger-item"]', {
  y: 20,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: container,
    start: "top 80%",
    once: true
  }
});
```

#### Pattern 3: Hero Reveal (For hero sections only)
```javascript
const heroTl = gsap.timeline({ delay: 0.3 });
heroTl
  .from('.hero-headline', { y: 40, opacity: 0, duration: 0.7 })
  .from('.hero-subhead', { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
  .from('.hero-cta', { y: 20, opacity: 0, duration: 0.5 }, "-=0.3");
```

#### Pattern 4: Feature Reveal (For mechanism/feature animations)
```javascript
ScrollTrigger.create({
  trigger: ".feature-section",
  start: "top 60%",
  onEnter: () => {
    gsap.to(".feature-visual", { opacity: 1, scale: 1, duration: 0.8 });
    gsap.to(".feature-text", { y: 0, opacity: 1, duration: 0.6, delay: 0.2 });
  },
  once: true
});
```

### Reduced Motion Fallback
```javascript
// Check FIRST, before any GSAP initialization
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Make all elements visible immediately
  document.querySelectorAll('[data-anim]').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
} else {
  gsap.registerPlugin(ScrollTrigger);
  // Initialize animations...
}
```

### Mid-Page Refresh Handling
```javascript
// Run BEFORE CSS loads to prevent flash
if (window.scrollY > 100) {
  document.documentElement.classList.add('scrolled-start');
}

// CSS to handle scrolled state
// html.scrolled-start [data-anim] { opacity: 1 !important; transform: none !important; }
```

---

## COMPONENT SPECIFICATIONS

### Required Components

```
PageShell              — HTML structure, meta tags, font loading, CSS variables
Header                 — Logo + minimal nav (sticky on scroll)
HeroSection            — Above-fold with product image, title, config, CTA
ProductConfigurator    — Hand/Loft selectors with PG1 membership toggle
UGCCarousel            — Video testimonials carousel
ProblemAgitation       — "The Consistency Crisis" section
MechanismReveal        — "No Dig. No Doubt." with animation
FeatureCard            — Reusable feature block (5 instances)
VersatilityGrid        — 4-up grid of lie types
QuizSection            — Interactive 6-question quiz with results
BuyBox                 — Product config + CTA (reusable)
TestimonialCard        — Quote card component
DesignerStory          — Authority/credibility section
GuaranteeBlock         — 365-day guarantee
BundleBuilder          — Multi-product selector with tiered pricing
ComparisonChart        — Us vs Them table
FinalCTA               — Final conversion block
FAQAccordion           — Expandable Q&A
Footer                 — Support info
StickyCTABar           — Mobile-only sticky bottom CTA
```

### Product Configurator Component

**States:**
```
┌─────────────────────────────────────────┐
│ HAND SELECTOR                           │
│ ┌─────────┐ ┌─────────┐                 │
│ │  Right  │ │  Left   │  ← Pill buttons │
│ │(active) │ │         │                 │
│ └─────────┘ └─────────┘                 │
├─────────────────────────────────────────┤
│ LOFT SELECTOR                           │
│ ┌────┐ ┌────┐ ┌────┐ ┌────────────┐    │
│ │50° │ │56° │ │60° │ │ 63° ONE.1S │    │
│ │    │ │(●) │ │    │ │            │    │
│ └────┘ └────┘ └────┘ └────────────┘    │
├─────────────────────────────────────────┤
│ PG1 MEMBERSHIP TOGGLE                   │
│ ┌──────────────────────────────────┐   │
│ │ [●] PG1 Member Pricing           │   │
│ │     As a PG1 Member, you're      │   │
│ │     saving big. Cancel anytime.  │   │
│ └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Toggle States:**
- ON (default): "As a PG1 Member, you're saving big. Cancel online anytime."
- OFF: "Serious golfers join PG1 to save more. You're in control, cancel online anytime."

**Styling:**
```css
.config-pill {
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: 14px;
  padding: 12px 20px;
  border: 2px solid var(--pg-pebble);
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
}

.config-pill.active {
  border-color: var(--pg-black);
  background: var(--pg-black);
  color: white;
}

.config-pill:hover:not(.active) {
  border-color: var(--pg-stone);
}
```

### Quiz Component

**Flow:**
```
Q1 (Confidence) → Q2 (Frustration) → Q3 (DETERMINING: Where lose strokes?)
                                            ↓
                        ┌───────────────────┼───────────────────┐
                        ↓                   ↓                   ↓
                    Bunkers (A)      Approach (B)        Chips/Bad Lies (C/D)
                        ↓                   ↓                   ↓
                   Q4, Q5, Q6          Q4, Q5, Q6           Q4, Q5, Q6
                        ↓                   ↓                   ↓
               ┌────────┴────────┐          ↓                   ↓
               ↓                 ↓          ↓                   ↓
        Long Hitter (A/B)  Short Hitter (C) ↓                   ↓
               ↓                 ↓          ↓                   ↓
           60° Result      63° ONE.S     50° Result         56° Result
```

**Quiz UI (Mobile-First):**
```
┌─────────────────────────────────────┐
│ Question 1 of 6                     │ ← Progress indicator
│ ████████░░░░░░░░░░░░░░░░░░░░░░░░░  │
├─────────────────────────────────────┤
│                                     │
│ How confident are you over          │
│ chip shots right now?               │ ← Question text
│                                     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ A) Very confident               │ │ ← Answer option (full width on mobile)
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ B) Somewhat confident           │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ C) Not confident at all         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Quiz Answer Styling:**
```css
.quiz-option {
  width: 100%;
  text-align: left;
  padding: 16px 20px;
  border: 2px solid var(--pg-pebble);
  border-radius: 12px;
  background: white;
  font-family: var(--font-body);
  font-size: 17px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 12px;
}

.quiz-option:hover {
  border-color: var(--pg-stone);
  background: var(--pg-fog);
}

.quiz-option.selected {
  border-color: var(--pg-orange);
  background: rgba(253, 51, 0, 0.05);
}
```

### FAQ Accordion Component

**States:**
```
CLOSED:
┌─────────────────────────────────────────┐
│ What is the ONE.1 and why is it    [+] │
│ better than other wedges?               │
└─────────────────────────────────────────┘

OPEN:
┌─────────────────────────────────────────┐
│ What is the ONE.1 and why is it    [-] │
│ better than other wedges?               │
├─────────────────────────────────────────┤
│ The ONE.1 is the only wedge with an    │
│ Auto-Glide Sole that glides through    │
│ turf instead of digging into it...     │
└─────────────────────────────────────────┘
```

**Animation:**
```javascript
// Height animation for accordion
gsap.to(answerEl, {
  height: isOpen ? 'auto' : 0,
  opacity: isOpen ? 1 : 0,
  duration: 0.3,
  ease: "power2.out"
});
```

---

## SECTION-BY-SECTION BUILD SPECIFICATIONS

---

### SECTION 1A: ABOVE THE FOLD — PDP

#### UX Intent
Immediate product clarity. Establish trust with professional presentation. Enable quick configuration and purchase for ready-to-buy visitors.

#### Layout (Mobile — PRIMARY)
```
┌─────────────────────────────────────┐
│         [Product Image Gallery]      │ ← Square aspect, swipeable
│              400x400                 │
├─────────────────────────────────────┤
│ Never Chunk Again                    │ ← Pre-headline (eyebrow)
│ ONE.1 "Auto-Correct" Wedge          │ ← H1
├─────────────────────────────────────┤
│ The only premium wedge with an       │
│ Auto-Glide Sole that glides...      │ ← Tagline
├─────────────────────────────────────┤
│ ★★★★★ (reviews)                      │ ← Star rating
├─────────────────────────────────────┤
│ $XXX                                 │ ← Price (TBD)
├─────────────────────────────────────┤
│ [Hand Selector: Right | Left]        │
│ [Loft Selector: 50° | 56° | 60° | 63°]│
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ ☑ PG1 Member Pricing (toggle)  │ │
│ │   As a PG1 Member, you're      │ │
│ │   saving big                   │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ ✓ ONE.1 Wedge                       │
│ ✓ Fast & Free Shipping              │
│ ✓ 365-Day Money Back Guarantee      │
│ ✓ PG1 App (included/free trial)     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │   GET MY ONE.1 WEDGE NOW        │ │ ← Primary CTA
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 365-Day "No Dig, No Doubt" Demo     │
│ Period & Money Back Guarantee       │
├─────────────────────────────────────┤
│ [Trust Badges]                       │
└─────────────────────────────────────┘
```

#### Layout (Desktop >1024px)
```
┌──────────────────────────────────────────────────────────┐
│  ┌────────────────────┐  ┌─────────────────────────────┐ │
│  │                    │  │ Never Chunk Again           │ │
│  │  [Product Image    │  │ ONE.1 "Auto-Correct" Wedge │ │
│  │   Gallery]         │  │                             │ │
│  │   600x600          │  │ The only premium wedge...   │ │
│  │                    │  │                             │ │
│  │  ○ ○ ○ ○ (dots)    │  │ ★★★★★ (reviews)            │ │
│  │                    │  │ $XXX                        │ │
│  │                    │  │                             │ │
│  │                    │  │ [Config selectors]          │ │
│  │                    │  │ [Offer box]                 │ │
│  │                    │  │ [CTA]                       │ │
│  │                    │  │ [Guarantee + Trust]         │ │
│  └────────────────────┘  └─────────────────────────────┘ │
│         55%                         45%                  │
└──────────────────────────────────────────────────────────┘
```

#### Visual Asset: Product Image Gallery
**Art Direction:**
- Hero angle: 3/4 view from above, showing the sole AND the face
- Background: Pure white or very light gray gradient
- Lighting: Clean, product photography style — no dramatic shadows
- Additional images: Sole detail, face grooves close-up, address position
- Gallery format: Swipeable on mobile, thumbnail strip on desktop

#### Typography
- Pre-headline: `--font-mono`, 11px, uppercase, `--pg-gray`
- H1: `--font-heading`, 700, 28px mobile / 40px desktop
- Tagline: `--font-body`, 17px, `--pg-gray`
- Price: `--font-heading`, 700, 24px mobile / 32px desktop

#### Motion Sequence
```javascript
// No scroll trigger — animate on page load
const pdpTl = gsap.timeline({ delay: 0.2 });
pdpTl
  .from('.product-gallery', { opacity: 0, y: 20, duration: 0.6 })
  .from('.product-title', { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
  .from('.product-config', { opacity: 0, y: 15, duration: 0.5 }, "-=0.2")
  .from('.product-cta', { opacity: 0, y: 10, duration: 0.4 }, "-=0.2");
```

---

### SECTION 1B: ABOVE THE FOLD — SALES PAGE (Alternative Hero)

#### UX Intent
Emotional hook for visitors who need convincing. Lead with the promise, show the mechanism. This is the "wow moment" entry point.

#### Layout (Mobile)
```
┌─────────────────────────────────────┐
│ Never Chunk Again                    │ ← Pre-headline
├─────────────────────────────────────┤
│ New "Auto-Correct"                   │
│ Wedge Glides Through                │
│ Any Lie                             │ ← H1 (3 lines)
├─────────────────────────────────────┤
│ The only premium wedge with an       │
│ Auto-Glide Sole that glides through │
│ the ground instead of digging...    │ ← Sub-headline
├─────────────────────────────────────┤
│                                     │
│    [Auto-Glide Sole Animation]      │ ← Hero visual (16:9)
│                                     │
├─────────────────────────────────────┤
│ ✓ Eliminate chunks so you stop      │
│   coming up short                   │
│ ✓ Make good contact on bad swings   │
│ ✓ Break the "yips" cycle            │
│ ✓ No more bladed balls              │
│ ✓ Make one simple swing...          │
│ ✓ Have more tap-ins and less        │
│   20 footers                        │
│ ✓ Looks professional. Feels         │
│   friendly.                         │ ← Benefit stack
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │   GET MY ONE.1 WEDGE NOW        │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 365-Day "No Dig, No Doubt"...       │
├─────────────────────────────────────┤
│ [Trust Badges]                       │
└─────────────────────────────────────┘
```

#### Visual Asset: Auto-Glide Sole Hero Animation
**Art Direction:**
- Concept: Side-by-side comparison — traditional wedge DIGGING vs ONE.1 GLIDING
- Camera angle: Low angle, turf level, showing club interacting with ground
- Motion: Slow-motion capture of impact, soil/grass particle effects
- Mood: Cinematic, dramatic lighting, shallow depth of field
- Duration: 3-5 second loop
- Format: Video or animated WebP

**Placeholder:**
```html
<div class="hero-visual" style="aspect-ratio: 16/9; background: var(--pg-fog);">
  <span class="placeholder-text">[Auto-Glide Sole hero animation showing GLIDE vs DIG comparison]</span>
  <!-- TODO: Replace with actual hero animation/video -->
</div>
```

#### Motion Sequence
```javascript
const heroTl = gsap.timeline({ delay: 0.3 });
heroTl
  .from('.hero-preheadline', { opacity: 0, y: 20, duration: 0.4 })
  .from('.hero-headline', { opacity: 0, y: 40, duration: 0.7 }, "-=0.2")
  .from('.hero-subheadline', { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
  .from('.hero-visual', { opacity: 0, scale: 0.98, duration: 0.8 }, "-=0.3")
  .from('.hero-benefits li', { opacity: 0, x: -20, stagger: 0.08, duration: 0.4 }, "-=0.4")
  .from('.hero-cta', { opacity: 0, y: 20, duration: 0.5 }, "-=0.2");
```

---

### SECTION 2: UGC CAROUSEL

#### UX Intent
Immediate social proof. Real golfers, real results. Build trust before diving into features.

#### Layout (Mobile)
```
┌─────────────────────────────────────┐
│                                     │
│  [UGC Video Card]                   │ ← Swipeable carousel
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │    ▶ (play button)          │   │
│  │                             │   │
│  │    "Changed my short game"  │   │
│  │    - Mike T., 14 handicap   │   │
│  └─────────────────────────────┘   │
│                                     │
│        ○ ● ○ ○ ○                    │ ← Pagination dots
│                                     │
└─────────────────────────────────────┘
```

#### Carousel Behavior
- Swipe to navigate on mobile
- Auto-advance every 6 seconds (pause on interaction)
- Videos play inline, muted by default
- Tap to unmute/fullscreen

---

### SECTION 3: PROBLEM AGITATION

#### UX Intent
Create tension. Name the enemy. Make the reader feel understood. This is "wow, they get me."

#### Layout (Mobile)
```
┌─────────────────────────────────────┐
│                                     │
│    The Consistency Crisis           │ ← H2
│                                     │
│    Did You Know?                    │ ← Subheadline
│                                     │
├─────────────────────────────────────┤
│                                     │
│  84% of golfers use cavity-backed   │
│  irons because they help you hit    │
│  straighter, more consistent shots  │
│  without perfect technique.         │
│                                     │
│  But those same golfers use bladed  │
│  wedges that punish anything but    │
│  perfection. One degree off, and    │
│  you dig into the turf chunking it  │
│  short... or blade it long.         │
│                                     │
└─────────────────────────────────────┘
```

#### Visual Treatment
- Background: `--pg-sand` (subtle shift from default)
- The "84%" stat should be visually emphasized (larger, bolder)
- Consider a subtle visual: split image of cavity-back iron vs bladed wedge

#### Motion Sequence
```javascript
gsap.from('.problem-stat', {
  textContent: 0,
  duration: 1.5,
  ease: "power2.out",
  snap: { textContent: 1 },
  scrollTrigger: { trigger: '.problem-section', start: 'top 75%', once: true }
});
```

---

### SECTION 4: THE MECHANISM (SOLUTION)

#### UX Intent
This is the "aha moment." Reveal the secret. The Auto-Glide Sole is the hero. Show, don't just tell.

#### Layout (Mobile)
```
┌─────────────────────────────────────┐
│                                     │
│      No Dig. No Doubt.              │ ← H2
│                                     │
├─────────────────────────────────────┤
│  The ONE.1 "Auto-Correct" Wedge     │
│  looks like a normal, premium       │
│  wedge, but it gives you an         │
│  invisible advantage:               │
│                                     │
│  The Auto-Glide Sole glides through │
│  any lie instead of digging into it.│
│                                     │
│  That means it manages ground       │
│  interaction for you... so you get  │
│  up and on the green in one shot –  │
│  even when you make a steep, quick  │
│  swing or hit way behind the ball.  │
├─────────────────────────────────────┤
│                                     │
│   [Auto-Glide Sole Animation]       │ ← Hero mechanism visual
│   (4-way cambered surface           │
│    highlighting GLIDE vs DIG)       │
│                                     │
└─────────────────────────────────────┘
```

#### Visual Asset: Mechanism Animation
**Art Direction:**
- Split-screen or animated comparison
- Left: Traditional wedge — leading edge digs, grass/dirt spray, club decelerates
- Right: ONE.1 — sole glides smoothly, clean contact, ball pops up
- Annotation callouts showing "4-way cambered surface"
- Loop duration: 4-6 seconds

#### Motion Sequence
This is a **pinned scroll reveal** — the animation plays as user scrolls through.
```javascript
ScrollTrigger.create({
  trigger: '.mechanism-section',
  start: 'top top',
  end: '+=800',
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    // Progress-based animation (0-1)
    animateMechanismVisual(self.progress);
  }
});
```

---

### SECTION 5: FEATURES & BENEFITS

#### UX Intent
Deep dive into the "how." Each feature solves a specific pain point. Feature 1 (Auto-Glide Sole) is the star — others support.

#### Feature Card Layout (Mobile)
```
┌─────────────────────────────────────┐
│ FEATURE 1: AUTO-GLIDE SOLE          │ ← Eyebrow
├─────────────────────────────────────┤
│                                     │
│    Your Fat Shot Fix                │ ← H3
│                                     │
├─────────────────────────────────────┤
│  The "Auto-Glide Sole" gives you    │
│  Four-Way Forgiveness because       │
│  instead of digging, it's four-way  │
│  cambered shape glides through the  │
│  ground automatically...            │ ← Body copy
├─────────────────────────────────────┤
│                                     │
│    [Feature Animation]              │ ← Visual (16:9 or 4:3)
│                                     │
└─────────────────────────────────────┘
```

#### Feature Visual Art Direction

**Feature 1: Auto-Glide Sole**
- 3D render of sole with 4-way camber highlighted
- Animated arrows showing glide direction
- Before/after impact comparison

**Feature 2: Distance Control Weighting**
- Cross-section showing weight distribution
- Highlight Sole Stability Wing and toe weight
- Face heatmap showing consistent ball speed

**Feature 3: Square and Shoot Alignment**
- Top-down view showing straight leading edge
- Center-face markings highlighted
- Alignment guide visualization

**Feature 4: Spin-Fast Face**
- Close-up of groove pattern and laser etchings
- Slow-mo ball contact showing spin generation
- Ball trajectory with spin numbers

**Feature 5: Motion Swing Weighting**
- Stepless shaft visualization
- 40g counterweight callout
- Swing path comparison (flip vs. proper release)

#### Motion Sequence (Staggered reveal)
```javascript
const features = gsap.utils.toArray('.feature-card');
features.forEach((card, i) => {
  gsap.from(card, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      once: true
    }
  });
});
```

---

### SECTION 6: VERSATILITY CALLOUTS

#### UX Intent
Prove it works everywhere. Remove doubt about specific situations. Sand, rough, wet, tight lies — covered.

#### Layout (Mobile)
```
┌─────────────────────────────────────┐
│  Grip It And Chip It — From Any Lie │ ← H2
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ [Sand shot visual]              │ │
│ │ Sand? Solved.                   │ │
│ │ The four-way camber glides      │ │
│ │ through sand instead of digging │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [Rough shot visual]             │ │
│ │ Rough? Ready.                   │ │
│ │ Heavy winged sole cuts through  │ │
│ │ thick grass without grabbing.   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [Wet conditions visual]         │ │
│ │ Wet? No Worries.                │ │
│ │ Trailing edge extension         │ │
│ │ prevents digging into soft turf.│ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [Tight lie visual]              │ │
│ │ Tight Lies? Tamed.              │ │
│ │ The "Un-Chunkable" cambered     │ │
│ │ sole provides just enough bounce│ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### Layout (Desktop — 2x2 Grid)
```
┌──────────────────────────────────────────────────────────┐
│            Grip It And Chip It — From Any Lie            │
├──────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────┐       │
│  │ Sand? Solved.       │  │ Rough? Ready.       │       │
│  │ [visual]            │  │ [visual]            │       │
│  └─────────────────────┘  └─────────────────────┘       │
│  ┌─────────────────────┐  ┌─────────────────────┐       │
│  │ Wet? No Worries.    │  │ Tight Lies? Tamed.  │       │
│  │ [visual]            │  │ [visual]            │       │
│  └─────────────────────┘  └─────────────────────┘       │
└──────────────────────────────────────────────────────────┘
```

#### Visual Asset Art Direction
Each should be a short looping video or animated WebP:
- **Sand**: Ball popping out of bunker, sand spray, clean escape
- **Rough**: Club cutting through thick grass, ball coming out clean
- **Wet**: Morning dew, muddy conditions, still clean contact
- **Tight**: Hardpan or bare lie, no chunk, ball flies true

---

### SECTION 7: PERSONALIZATION QUIZ

#### UX Intent
Interactive engagement. Personalized recommendation increases confidence. This is the "tool" that makes the decision for them.

#### Layout (Mobile)
```
┌─────────────────────────────────────┐
│       Less Grind, More Glide.       │ ← H2
├─────────────────────────────────────┤
│  Unlike traditional wedges that     │
│  require you to choose between      │
│  dozens of lofts, grind options...  │
│                                     │
│  To find out which ONE.1 Wedge      │
│  will save you the most strokes,    │
│  take the 60-Second quiz.           │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │     Find My ONE.1 Wedge         │ │ ← CTA opens quiz
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘

[Quiz overlay/modal when CTA clicked]
┌─────────────────────────────────────┐
│ Question 1 of 6     [×]             │
│ ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
├─────────────────────────────────────┤
│                                     │
│ How confident are you over          │
│ chip shots right now?               │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Very confident                  │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Somewhat confident              │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Not confident at all            │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### Quiz Result Display
```
┌─────────────────────────────────────┐
│  Your Perfect Wedge: 56° Wedge      │ ← Result headline
├─────────────────────────────────────┤
│  [56° Product Image]                │
├─────────────────────────────────────┤
│  Delicate chips and touch shots     │
│  around the green require           │
│  confidence — and that starts with  │
│  consistent contact...              │ ← Result copy
├─────────────────────────────────────┤
│  Your Primary Recommendation:       │
│  56° Wedge                          │
│                                     │
│  Build Your Set: Add the 60° for    │
│  bunker escapes, then the 50° for   │
│  longer approach shots.             │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │   GET MY 56° WEDGE NOW          │ │ ← Dynamic CTA
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [Show All Specs] (opens specs div)  │
└─────────────────────────────────────┘
```

#### Quiz Interaction States
```css
/* Progress bar */
.quiz-progress {
  height: 4px;
  background: var(--pg-pebble);
  border-radius: 2px;
}
.quiz-progress-fill {
  height: 100%;
  background: var(--pg-orange);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Transitions between questions */
.quiz-question-enter {
  opacity: 0;
  transform: translateX(20px);
}
.quiz-question-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.3s ease;
}
```

---

### SECTION 8: CTA/BUY BOX

#### UX Intent
Mid-page conversion point. For readers who are convinced and ready to buy. Same configurator as Section 1A.

(Same layout as Section 1A — reuse component)

---

### SECTION 9: SOCIAL PROOF — TESTIMONIALS

#### UX Intent
Transformation stories. Pain → Hope. Show variety of handicaps to prove broad appeal.

#### Layout (Mobile)
```
┌─────────────────────────────────────┐
│  Real Golfers. Real Results.        │ ← H2
│  Join [X] golfers who've upgraded   │ ← Subheadline
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ "I used to dread every chip     │ │
│ │ shot. The anxiety would build   │ │
│ │ in my backswing and I'd freeze  │ │
│ │ at impact. After switching to   │ │
│ │ the ONE.1, I don't fear the     │ │
│ │ chip anymore..."                │ │
│ │                                 │ │
│ │ — [Customer Name], [Handicap]   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ (4 more testimonial cards)          │
│                                     │
│ [UGC Testimonials Grid]             │
└─────────────────────────────────────┘
```

#### Testimonial Card Styling
```css
.testimonial-card {
  background: white;
  border: 1px solid var(--pg-pebble);
  border-radius: 16px;
  padding: 24px;
}

.testimonial-quote {
  font-family: var(--font-body);
  font-size: 17px;
  font-style: italic;
  line-height: 1.6;
  color: var(--pg-black);
  margin-bottom: 16px;
}

.testimonial-author {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--pg-gray);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

### SECTION 10: AUTHORITY — DESIGNER STORY

#### UX Intent
Credibility through expertise. Chris McGinley's resume is the proof. Tour players, 25+ years, 250K amateurs. This is the "why trust this product" moment.

#### Layout (Mobile)
```
┌─────────────────────────────────────┐
│      The Wizard of Wedges           │ ← Section header
├─────────────────────────────────────┤
│                                     │
│    [Chris McGinley Headshot]        │ ← Circular, professional
│                                     │
│    Chris McGinley                   │
│    Equipment Innovation Engineer    │
├─────────────────────────────────────┤
│  ✓ 25+ years building clubs for     │
│    Tour players like Tiger Woods,   │
│    Rory McIlroy, Jordan Spieth,    │
│    and Adam Scott                   │
│                                     │
│  ✓ 250,000+ amateur golfers helped  │
│    and counting                     │
├─────────────────────────────────────┤
│  "I spent 30 years watching golfers │
│  struggle with wedges. Not because  │
│  you lack skill, but because your   │
│  equipment punishes you any time    │
│  you're not perfect..."             │ ← Designer quote
└─────────────────────────────────────┘
```

#### Visual Asset: Designer Headshot
**Art Direction:**
- Professional portrait, workshop/club building background
- Warm lighting, approachable expression
- Holding or near golf clubs
- High-quality, not stock photo feeling

---

### SECTION 11: GUARANTEE

#### UX Intent
Risk reversal. Remove the final objection. 365 days is bold — it signals confidence.

#### Layout (Mobile)
```
┌─────────────────────────────────────┐
│          Trust Your Sole            │ ← H2
├─────────────────────────────────────┤
│  365-Day "No Dig, No Doubt"         │
│  Demo Period & Money Back Guarantee │ ← Named guarantee
├─────────────────────────────────────┤
│  Demo your ONE.1 risk-free for      │
│  365 days...                        │
│                                     │
│  Feel the Auto-Glide Sole control   │
│  ground interaction for you...      │
│                                     │
│  So you make consistent contact     │
│  from every lie and enjoy total     │
│  short-game confidence.             │
│                                     │
│  Or... we insist you request a      │
│  full refund.                       │
├─────────────────────────────────────┤
│  Email: support@performancegolf.com │
│  Call: 1(800)PG1-GOLF               │
└─────────────────────────────────────┘
```

#### Visual Treatment
- Background: `--pg-fog`
- Consider a badge/seal graphic for the guarantee
- Contact info in `--font-mono`

---

### SECTION 12: BUNDLE UPSELL

#### UX Intent
Increase AOV. "Buy more, save more" is irresistible. Make building a set feel natural.

#### Layout (Mobile)
```
┌─────────────────────────────────────┐
│    [ONE.1 Wedge Set Display]        │
│    ★★★★★ [X] Reviews                │
├─────────────────────────────────────┤
│       Buy More, Save More           │ ← H2
│                                     │
│  Eliminate guesswork from your      │
│  entire short game by building      │
│  your wedge set.                    │
├─────────────────────────────────────┤
│  Build Your ONE Wedge Set           │
│  ┌─────────────────────────────────┐│
│  │ Pick Any 2     │    Save $XX   ││
│  │ Pick Any 3     │    Save $XX   ││
│  │ Pick All 4     │    Save $XX   ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│  Step 1: Choose Your Lofts          │
│  ☐ 50°  ☐ 56°  ☐ 60°  ☐ 63° ONE.S  │
├─────────────────────────────────────┤
│  Step 2: Choose Your Hand           │
│  ◉ Right Hand  ◯ Left Hand          │
├─────────────────────────────────────┤
│  Your Order                         │
│  [Dynamic summary based on          │
│   selections]                       │
│                                     │
│  ☑ PG1 Member Pricing (toggle)      │
│                                     │
│  Total: $XXX                        │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │  BUILD MY ONE WEDGE SET NOW     │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│  [Guarantee + Trust Badges]         │
└─────────────────────────────────────┘
```

#### Bundle Selector Behavior
- Checkboxes for loft selection (multi-select)
- Pricing updates dynamically as selections change
- Savings tier highlights current tier
- "Your Order" summary updates in real-time

---

### SECTION 13: US VS THEM — COMPARISON CHART

#### UX Intent
Positioning. We're not a gimmick chipper. We're not an unforgiving blade. We're the best of both.

#### Layout (Mobile — Scrollable Table)
```
┌─────────────────────────────────────┐
│     ONE.1: The One And Only         │ ← H2
├─────────────────────────────────────┤
│  ← Swipe to compare →               │
│ ┌──────────────────────────────────┐│
│ │Feature    │ONE.1│Blade│Chipper  ││
│ │───────────│─────│─────│─────────││
│ │Appearance │ ✓   │ ✓   │ ✗       ││
│ │Forgiveness│ ✓   │ ✗   │ ✓       ││
│ │Versatility│ ✓   │ ✓   │ ✗       ││
│ │Loft Opts  │ ✓   │ ✓   │ ✗       ││
│ │Counter-   │ ✓   │ ✗   │ Some    ││
│ │ weight    │     │     │         ││
│ │Embarrass- │None │None │ High    ││
│ │ ment      │     │     │         ││
│ │Learning   │None │High │ None    ││
│ │ Curve     │     │     │         ││
│ └──────────────────────────────────┘│
├─────────────────────────────────────┤
│  "The ONE.1 gives you what the      │
│  expensive blade wedges can't —     │
│  forgiveness — and what the gimmick │
│  chippers won't — respect."         │ ← Positioning statement
└─────────────────────────────────────┘
```

#### Table Styling
```css
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 12px;
}

.comparison-table th {
  background: var(--pg-black);
  color: white;
  padding: 12px 8px;
  text-align: center;
}

.comparison-table td {
  padding: 12px 8px;
  border-bottom: 1px solid var(--pg-pebble);
  text-align: center;
}

/* Highlight ONE.1 column */
.comparison-table td:nth-child(2) {
  background: rgba(253, 51, 0, 0.05);
  font-weight: 500;
}
```

---

### SECTION 14: FINAL CTA

#### UX Intent
Last push. Benefit recap. Urgency without desperation. This is the "if you've scrolled this far, you're interested" moment.

#### Layout (Mobile)
```
┌─────────────────────────────────────┐
│  ONE.1: Your Short Game's Sole Mate │ ← H2
├─────────────────────────────────────┤
│     [Hero Product Image]            │
├─────────────────────────────────────┤
│  ★★★★★ [X] stars from [X] reviews   │
│  $XXX                               │
├─────────────────────────────────────┤
│  ✓ Eliminate chunks...              │
│  ✓ Make good contact on bad swings  │
│  ✓ Break the "yips" cycle           │
│  ✓ No more bladed balls             │
│  ✓ Make one simple swing...         │
│  ✓ Have more tap-ins...             │
│  ✓ Looks professional. Feels        │
│    friendly.                        │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │    Get Your ONE.1 Now           │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│  [Trust Badges]                     │
├─────────────────────────────────────┤
│  [X] golfers have upgraded their    │
│  short game this month.             │
│  IN STOCK: Ships within 24 hours.   │ ← Urgency/scarcity
└─────────────────────────────────────┘
```

---

### SECTION 15: FAQ

#### UX Intent
Objection handling. Answer every question they might have. Reduce friction to zero.

#### Layout (Mobile)
```
┌─────────────────────────────────────┐
│  Frequently Asked Questions         │ ← H2
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ What is the ONE.1 and why is   [+]│ │
│ │ it better than other wedges?    │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ How does the Auto-Glide Sole   [+]│ │
│ │ work from every lie?            │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Is the ONE.1 legal?            [+]│ │
│ └─────────────────────────────────┘ │
│                                     │
│ (14 total questions)                │
└─────────────────────────────────────┘
```

#### FAQ Accordion Styling
```css
.faq-item {
  border: 1px solid var(--pg-pebble);
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  cursor: pointer;
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: 15px;
}

.faq-answer {
  padding: 0 20px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.faq-item.open .faq-answer {
  padding: 0 20px 20px;
  max-height: 500px;
}
```

---

### SECTION 16: SUPPORT INFORMATION

#### UX Intent
Accessibility. Make help easy to find. Professional closing.

#### Layout
```
┌─────────────────────────────────────┐
│        Customer Support             │
├─────────────────────────────────────┤
│  Email: [support email]             │
│  Phone: [support phone]             │
│  Hours: [support hours]             │
├─────────────────────────────────────┤
│  [Contact form or chat widget]      │
└─────────────────────────────────────┘
```

---

### STICKY CTA BAR (Mobile Only)

#### Behavior
- Hidden by default
- Appears after user scrolls past first CTA (Section 1)
- Fixed to bottom of viewport
- Contains primary CTA button

#### Implementation
```html
<div class="sticky-cta" data-sticky-cta>
  <button class="btn-primary btn-full-width">
    GET MY ONE.1 WEDGE NOW
  </button>
</div>
```

```css
.sticky-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 20px;
  background: white;
  border-top: 1px solid var(--pg-pebble);
  box-shadow: 0 -4px 12px rgba(0,0,0,0.08);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 100;
}

.sticky-cta.visible {
  transform: translateY(0);
}

/* Hide on desktop */
@media (min-width: 1024px) {
  .sticky-cta { display: none; }
}
```

```javascript
// Show sticky CTA after scrolling past first CTA
const firstCTA = document.querySelector('.hero-cta');
const stickyCTA = document.querySelector('[data-sticky-cta]');

ScrollTrigger.create({
  trigger: firstCTA,
  start: 'bottom top',
  onEnter: () => stickyCTA.classList.add('visible'),
  onLeaveBack: () => stickyCTA.classList.remove('visible')
});
```

---

## CONTENT MODEL — JSON

All copy is structured below. **Every string must match exactly — do not modify.**

```json
{
  "section1a_pdp": {
    "preHeadline": "Never Chunk Again",
    "title": "ONE.1 \"Auto-Correct\" Wedge",
    "tagline": "The only premium wedge with an Auto-Glide Sole that glides through the ground instead of digging into it. No special technique. Just square it, swing it, and stick it close with confidence.",
    "configOptions": {
      "hand": ["Right", "Left"],
      "loft": ["50°", "56°", "60°", "63° ONE.1S"]
    },
    "offerItems": [
      "ONE.1 \"Auto-Correct\" Wedge",
      "Fast & Free Shipping",
      "365-Day \"No Dig, No Doubt\" Demo Period & Money Back Guarantee",
      "PG1 Personalized Game-Improvement App"
    ],
    "toggleCopy": {
      "on": "As a PG1 Member, you're saving big. Cancel online anytime.",
      "off": "Serious golfers join PG1 to save more. You're in control, cancel online anytime."
    },
    "cta": "GET MY ONE.1 WEDGE NOW",
    "guarantee": "365-Day \"No Dig, No Doubt\" Demo Period & Money Back Guarantee"
  },
  "section1b_hero": {
    "preHeadline": "NEVER. CHUNK. AGAIN.",
    "headline": "New: \"Auto-Correct\" Wedge Glides Through Any Lie",
    "subHeadline": "The only premium wedge with an Auto-Glide Sole that glides through the ground instead of digging into it... even on your \"bad swings.\"",
    "benefits": [
      "**Eliminate fat shots and chunks** so you stop coming up short even when you mis-hit it",
      "**Break the \"yips\" cycle** – commit to every wedge shot without flinching",
      "**No more bladed balls.** Thump the ground with confidence knowing the Auto-Glide Sole does NOT dig – it manages ground interaction *for you*",
      "**Finish close to the hole** with distance control from tight lies, thick rough, and sand",
      "**Looks professional. Feels friendly.** Your playing partners won't know what hit 'em"
    ],
    "cta": "GET MY ONE.1 WEDGE NOW",
    "guarantee": "365-Day \"No Dig, No Doubt\" Demo Period & Money Back Guarantee"
  },
  "section3_problem": {
    "headline": "The Consistency Crisis",
    "subheadline": "Did You Know?",
    "copy": [
      "84% of golfers use cavity-backed irons because they help you hit straighter, more consistent shots without perfect technique.",
      "",
      "But those same golfers use bladed wedges that punish anything but perfection. One degree off, and you dig into the turf chunking it short... or blade it long."
    ]
  },
  "section4_mechanism": {
    "headline": "No Dig. No Doubt.",
    "copy": [
      "The ONE.1 \"Auto-Correct\" Wedge looks like a normal, premium wedge, but it gives you an invisible advantage:",
      "",
      "The Auto-Glide Sole glides through any lie instead of digging into it.",
      "",
      "That means it manages ground interaction for you... so you get up and on the green in one shot – even when you make a steep, quick swing or hit way behind the ball."
    ]
  },
  "section5_features": [
    {
      "id": "auto-glide-sole",
      "eyebrow": "FEATURE 1: Auto-Glide Sole",
      "headline": "Your Fat Shot Fix",
      "copy": "The \"Auto-Glide Sole\" gives you Four-Way Forgiveness because instead of digging, it's four-way cambered shape glides through the ground automatically – regardless of your attack angle.\n\nThis means you make consistently clean contact and finish closer to the hole – even when you're in a bad lie or you hit way behind the ball."
    },
    {
      "id": "distance-control",
      "eyebrow": "FEATURE 2: Distance Control Weighting",
      "headline": "Delicate Distance Control... Even On Mis-Hits",
      "copy": "Enjoy consistent ball speed across the entire face — not just the sweet spot... thanks to Distance Control Weighting.\n\nThe Sole Stability Wing and high toe weight pad stabilize the face when you miss the *sweet spot* – so even your mis-hits reach the green."
    },
    {
      "id": "alignment",
      "eyebrow": "FEATURE 3: Square and Shoot Alignment",
      "headline": "Perfect Aim – Every Time.",
      "copy": "\"Square and Shoot\" Alignment pairs a straight leading edge with center-face markings, so you instantly square the face at address.\n\nThis means you know exactly where the ball is going before you swing. No second-guessing your setup. No alignment anxiety. Just Square It, Swing It, Stick It."
    },
    {
      "id": "spin-face",
      "eyebrow": "FEATURE 4: Spin-Fast Face",
      "headline": "Spin It To Win It (Legally!)",
      "copy": "The \"Spin-Fast Face\" combines max-volume conforming grooves with laser etchings to generate maximum *legal* spin on full swings AND partial shots.\n\nSo whether you're finessing a greenside chip that needs to check fast instead of rolling off the green... or you're 100 yards away and want to land it past the pin and watch it rip back... you'll have the spin to Stop, Drop, And Roll It Close."
    },
    {
      "id": "swing-weighting",
      "eyebrow": "FEATURE 5: Motion Swing Weighting",
      "headline": "Stops Flipping For Better Chipping",
      "copy": "We added \"Swing Stability Weighting\" — a stepless shaft combined with a 40-gram counterweight — that stops you from flipping at impact and promotes solid contact.\n\nPlus, this weighting accelerates through the ball – even when you \"quit\" on the shot... so you make good contact on bad swings."
    }
  ],
  "section6_versatility": {
    "headline": "Grip It And Chip It — From Any Lie",
    "conditions": [
      {
        "title": "Sand? Solved.",
        "copy": "The four-way camber glides through sand instead of digging deep. Escape bunkers with confidence."
      },
      {
        "title": "Rough? Ready.",
        "copy": "Heavy winged sole cuts through thick grass without grabbing. Clean contact every time."
      },
      {
        "title": "Wet? No Worries.",
        "copy": "Trailing edge extension prevents the leading edge from digging into soft turf."
      },
      {
        "title": "Tight Lies? Tamed.",
        "copy": "The \"Un-Chunkable\" cambered sole provides just enough bounce to glide without blading."
      }
    ]
  },
  "section7_quiz": {
    "headline": "Less Grind, More Glide.",
    "intro": "Unlike traditional wedges that require you to choose between dozens of lofts, grind options, bounce angles, and shaft flexes... we engineered the ONE.1 to *simplify* your short game.\n\nTo find out which ONE.1 Wedge will save you the most strokes, take the 60-Second \"Find Your One\" quiz.",
    "cta": "Find My ONE.1 Wedge",
    "questions": [
      {
        "id": "q1",
        "text": "How confident are you over chip shots right now?",
        "options": ["Very confident", "Somewhat confident", "Not confident at all"]
      },
      {
        "id": "q2",
        "text": "What frustrates you most about your short game?",
        "options": ["Chunking chips fat", "Blading chips over the green", "Inconsistent distance control", "All of the above"]
      },
      {
        "id": "q3",
        "determining": true,
        "text": "Where do you lose the most strokes?",
        "options": ["Bunker shots and sand saves", "Full swing approach shots from 75 to 125 yards", "Delicate chips and touch shots around the green", "Bad lies and unpredictable situations"]
      },
      {
        "id": "q4",
        "text": "What's your current wedge setup?",
        "options": ["Gap wedge + sand wedge", "Gap wedge + sand wedge + lob wedge", "Gap wedge + sand wedge + lob wedge + pitching wedge", "I'm not sure what I have"]
      },
      {
        "id": "q5",
        "text": "How far do you typically hit your pitching wedge?",
        "options": ["80-100 yards", "100-120 yards", "120-140 yards", "140+ yards"]
      },
      {
        "id": "q6",
        "text": "How far do you currently hit your drives?",
        "options": ["250+ yards", "200-250 yards", "200 yards or less"]
      }
    ],
    "results": {
      "bunkers_long": {
        "condition": "q3=A AND (q6=A OR q6=B)",
        "recommendation": "60°",
        "headline": "Your Perfect Wedge: 60° Wedge",
        "copy": "The Auto-Glide Sole is built for bunkers. Its four-way cambered design glides through sand instead of digging deep — so you enjoy effortless escapes that pop out and onto the green.\n\nThe 60° loft gives you the height you need to clear the lip and land soft. No more leaving it in the bunker or blading it across the green.",
        "buildSet": "Add the 56° for chips and pitches around the green (from any lie), then the 50° for full-swing approach shots."
      },
      "bunkers_short": {
        "condition": "q3=A AND q6=C",
        "recommendation": "63° ONE.S",
        "headline": "Your Perfect Wedge: 63° ONE.S",
        "copy": "For golfers with moderate swing speeds, the 63° ONE.S is specifically engineered to maximize your bunker performance. The extra loft helps you get the ball up quickly without needing to swing hard.\n\nCombined with the Auto-Glide Sole, you'll escape bunkers with ease — even from plugged lies or wet sand.",
        "buildSet": "Add the 56° for chips and pitches, then the 60° for delicate touch shots or longer bunker escapes, then the 50° for full-swing approach shots."
      },
      "approach": {
        "condition": "q3=B",
        "recommendation": "50°",
        "headline": "Your Perfect Wedge: 50° Wedge",
        "copy": "You're losing strokes on full swing approach shots from 75-125 yards. The 50° Gap Wedge fills the distance gap between your pitching wedge and sand wedge — giving you a dedicated club for those in-between yardages.\n\nThe Auto-Glide Sole delivers consistent contact even when you catch it a little heavy, so your approach shots find the green instead of coming up short.",
        "buildSet": "Add the 56° for chips, pitches, and touch shots from any lie, then the 60° for bunkers."
      },
      "chips": {
        "condition": "q3=C",
        "recommendation": "56°",
        "headline": "Your Perfect Wedge: 56° Wedge",
        "copy": "Delicate chips and touch shots around the green require confidence — and that starts with consistent contact. The 56° is your Wedge Workhorse, built to handle any lie and every situation with one simple swing.\n\nThe Auto-Glide Sole eliminates the fear of chunking and delivers delicious distance control, so you commit to your shots knowing the club will do the work.",
        "buildSet": "Add the 60° for bunker escapes and high soft shots, then the 50° for longer approach shots."
      },
      "bad_lies": {
        "condition": "q3=D",
        "recommendation": "56°",
        "headline": "Your Perfect Wedge: 56° Wedge",
        "copy": "Bad lies and unpredictable situations are exactly what the ONE.1 is designed for. The Auto-Glide Sole's four-way cambered surface glides through thick rough, hardpan, and everything in between — without digging or grabbing.\n\nThe 56° handles any lie you face, so you've got total confidence to stick it close – even when you're buried in the rough to sitting down in a divot.",
        "buildSet": "Add the 60° for bunker escapes and greenside touch shots, then the 50° for full-swing approach shots."
      }
    }
  },
  "section9_testimonials": {
    "headline": "Real Golfers. Real Results.",
    "subheadline": "Join [X] golfers who've upgraded their short game",
    "testimonials": [
      {
        "quote": "I used to dread every chip shot. The anxiety would build in my backswing and I'd freeze at impact. After switching to the ONE.1, I don't fear the chip anymore. The consistent contact I've been able to achieve is incredible.",
        "author": "[Customer Name]",
        "handicap": "[Handicap]"
      },
      {
        "quote": "If I could become an average chipper, my handicap would drop by 3 strokes. That's what I kept telling myself. After two months with the ONE.1, it has realistically decreased 3-5 strokes off my game.",
        "author": "[Customer Name]",
        "handicap": "[Handicap]"
      },
      {
        "quote": "I've taken lessons from highly regarded short game coaches. I would grind for hours at the practice area. Nothing worked. The ONE.1? It's night and day from my old wedge. So much easier to hit!",
        "author": "[Customer Name]",
        "handicap": "[Handicap]"
      },
      {
        "quote": "I was close to quitting the game. My short game had become a living hell. Now? It's so easy to use, it's almost like cheating. My buddies keep asking what changed.",
        "author": "[Customer Name]",
        "handicap": "[Handicap]"
      },
      {
        "quote": "I'm a 3 handicap and this chipping problem destroyed my golf for the last two years. The ONE.1 gave me my confidence back. I now expect decent results instead of just hitting and hoping.",
        "author": "[Customer Name]",
        "handicap": "[Handicap]"
      }
    ]
  },
  "section10_designer": {
    "sectionHeader": "The Wizard of Wedges",
    "name": "Chris McGinley",
    "title": "Equipment Innovation Engineer",
    "credentials": [
      "25+ years building clubs for Tour players like Tiger Woods, Rory McIlroy, Jordan Spieth, and Adam Scott",
      "250,000+ amateur golfers helped and counting"
    ],
    "quote": "I spent 30 years watching golfers struggle with wedges. Not because you lack skill, but because your equipment punishes you any time you're not perfect. Problem is, golf is hard. Even the pros aren't perfect. So I asked myself: What if we could engineer a wedge that manages ground contact FOR you? A wedge that glides instead of digs... so you stop worrying about chips and pitches and start loving your game. THAT'S the ONE.1 Wedge."
  },
  "section11_guarantee": {
    "headline": "Trust Your Sole",
    "guaranteeName": "365-Day \"No Dig, No Doubt\" Demo Period & Money Back Guarantee",
    "copy": [
      "Demo your ONE.1 risk-free for 365 days...",
      "",
      "Feel the Auto-Glide Sole control ground interaction for you...",
      "",
      "So you make consistent contact from every lie and enjoy total short-game confidence.",
      "",
      "Or... we insist you request a full refund."
    ],
    "contact": {
      "email": "support@performancegolf.com",
      "phone": "1(800)PG1-GOLF"
    }
  },
  "section12_bundle": {
    "headline": "Buy More, Save More",
    "intro": "Eliminate guesswork from your entire short game by building your wedge set.",
    "tiers": [
      { "quantity": "Pick Any 2", "savings": "Save $XX" },
      { "quantity": "Pick Any 3", "savings": "Save $XX" },
      { "quantity": "Pick All 4", "savings": "Save $XX" }
    ],
    "loftOptions": ["50°", "56°", "60°", "63° ONE.S"],
    "handOptions": ["Right Hand", "Left Hand"],
    "cta": "BUILD MY ONE WEDGE SET NOW",
    "belowCta": "Not sure which lofts are right for you? Take the 60-Second Wedge Workshop to find your perfect ONE.1 setup."
  },
  "section13_specs": {
    "headline": "ONE.1: The One And Only",
    "positioningStatement": "The ONE.1 is the only wedge that delivers Tour-quality looks with game-improving performance.",
    "subheadline": "Detailed Specifications",
    "soleConstruction": [
      { "spec": "Sole Design", "value": "Auto-Glide Sole: 4-way cambered" },
      { "spec": "Sole Features", "value": "Trailing edge extension, heavy winged sole" },
      { "spec": "Shaft", "value": "Stepless steel, R+ Wedge Flex | 0.370 Tip, 0.600\" Butt" },
      { "spec": "Grip", "value": "R58 Core, Velvet Pattern" }
    ],
    "headFace": [
      { "spec": "Leading Edge", "value": "Straight (for alignment)" },
      { "spec": "Face", "value": "Max volume conforming grooves + laser-etched texture" },
      { "spec": "Finish", "value": "Premium black" },
      { "spec": "Weighting", "value": "40g counterweight + high toe weight + deep cavity" },
      { "spec": "D4 Swingweight", "value": "Pre Counterbalance" }
    ],
    "loftOptions": [
      { "loft": "50°", "lieAngle": "64°", "length": "35.75\"", "swingweight": "D4", "counterweight": "40g" },
      { "loft": "56°", "lieAngle": "64°", "length": "35.50\"", "swingweight": "D4", "counterweight": "40g" },
      { "loft": "60°", "lieAngle": "64°", "length": "35.25\"", "swingweight": "D4", "counterweight": "40g" },
      { "loft": "63° (ONE.S)", "lieAngle": "64°", "length": "35.00\"", "swingweight": "D4", "counterweight": "40g" }
    ],
    "availability": "Men's Right Hand and Left Hand"
  },
  "section14_finalCta": {
    "headline": "ONE.1: Your Short Game's Sole Mate",
    "benefits": [
      "**Eliminate fat shots and chunks** so you stop coming up short even when you mis-hit it",
      "**Break the \"yips\" cycle** – commit to every wedge shot without flinching",
      "**No more bladed balls.** Thump the ground with confidence knowing the Auto-Glide Sole does NOT dig – it manages ground interaction *for you*",
      "**Finish close to the hole** with distance control from tight lies, thick rough, and sand",
      "**Looks professional. Feels friendly.** Your playing partners won't know what hit 'em"
    ],
    "cta": "Get Your ONE.1 Now",
    "urgency": "[X] golfers have upgraded their short game this month. IN STOCK: Ships within 24 hours."
  },
  "section15_faq": {
    "headline": "Frequently Asked Questions",
    "items": [
      {
        "q": "What is the ONE.1 and why is it better than other wedges?",
        "a": "The ONE.1 is the only wedge with an Auto-Glide Sole that glides through turf instead of digging into it. Traditional wedges dig — unless you have perfect technique. But the ONE.1's four-way cambered sole manages ground contact FOR you, so it glides across the ground automatically... even when you make a steep, quick swing. No technique changes. No hours of practice. Just square the face, swing, and let the sole do the work."
      },
      {
        "q": "How does the Auto-Glide Sole work from every lie?",
        "a": "Traditional wedges have flat or minimally cambered soles that dig into turf unless you deliver the perfect angle of attack. One degree off, and you chunk it fat or blade it thin. The ONE.1's four-way cambered Auto-Glide Sole is engineered to glide through any ground conditions, so you make consistent contact from tight lies, thick rough, and sand — without changing your swing."
      },
      {
        "q": "Is the ONE.1 legal?",
        "a": "Yes. The ONE.1 features max volume conforming grooves and meets all USGA and R&A equipment rules. You can use it in any tournament."
      },
      {
        "q": "Will it look weird in my bag?",
        "a": "Not at all. The ONE.1 looks like a premium wedge, because it IS a premium wedge. Nobody will know you have an Invisible Advantage just by looking at it. They'll only notice when you start sticking it close."
      },
      {
        "q": "Shouldn't I just practice more?",
        "a": "Of course you should practice more! We all should. But 84% of golfers are fighting equipment designed for Tour pros who practice 40 hours a week. The ONE.1 manages ground contact FOR you, so you can get results without endless practice. As one golfer put it: \"I've taken lessons, watched every video, reached the edge of the internet... nothing worked.\" Sometimes the answer isn't more practice — it's better equipment."
      },
      {
        "q": "I'm a good player — shouldn't I use regular wedges?",
        "a": "Skill level doesn't protect you from chunking and blading your wedges. We've heard from 3-handicaps who say the chipping yips \"destroyed their golf.\" The ONE.1 delivers Tour-quality spin and control with added forgiveness. You don't have to choose."
      },
      {
        "q": "Will I lose spin with a forgiving wedge?",
        "a": "No — the opposite, actually. Extensive testing with recreational golfers shows the combination of the Spin-Fast Face and Distance Control Weighting produces MORE spin and control than standard wedges. Because even when you don't catch it clean, you get consistent ball speed (which means consistent distance). Plus, when you're not worried about chunking it, you commit to your shot — and commitment creates spin."
      },
      {
        "q": "My technique is the problem. Can a wedge really fix that?",
        "a": "We both know there's no such thing as a magic wand. But the truth is, your technique CAN'T work if your equipment digs. Traditional wedges punish anything less than Tour-level precision. The ONE.1's Auto-Glide Sole manages ground contact FOR you — so your existing swing produces clean contact automatically. You don't need to fix your technique. You need equipment that works WITH it."
      },
      {
        "q": "What loft should I get?",
        "a": "56° is the most versatile for most golfers because it handles bunkers, thick rough, and tight lies. You'll find yourself pulling it out of the bag for delicate chips and pitches... AND for full swing approach shots from ~60-100 yards. This means you step up to any situation knowing you can strike it solid and finish closer to the hole.\n\nStill not sure? Take the \"Find Your ONE\" quiz above to find the right wedge for your game."
      },
      {
        "q": "Do I need a custom fitting?",
        "a": "No. The ONE.1 is engineered with a 64° lie angle, optimized lengths, and a stepless steel shaft in R+ Wedge Flex — all designed to work for the vast majority of golfers. The R58 Core grip with Velvet Pattern is a proven, comfortable grip used by golfers worldwide. Unlike traditional wedges with dozens of grind, bounce, and shaft options, the ONE.1's Auto-Glide Sole adapts to your swing automatically so you have less to think about... and can love your game faster."
      },
      {
        "q": "How long does shipping take?",
        "a": "Orders ship within 24 hours. Standard delivery takes 3-5 business days. Expedited shipping options available at checkout if you need it in time for your next round."
      },
      {
        "q": "Is shipping really free?",
        "a": "Yes — we pay for shipping on all orders to the contiguous United States. Alaska, Hawaii, and international orders may have additional shipping costs calculated at checkout."
      },
      {
        "q": "Do you ship internationally?",
        "a": "Yes, we ship to [list countries]. International shipping times vary by location."
      },
      {
        "q": "What's your return policy?",
        "a": "We offer a 365-Day \"No Dig, No Doubt\" Demo Period & Money Back Guarantee. Take the ONE.1 to the course — hit it from the fairway, the rough, and the sand. Let the Auto-Glide Sole do the work. You either hit better wedge shots, or return it for a full refund. No questions asked."
      }
    ]
  },
  "section16_support": {
    "headline": "Customer Support",
    "email": "[support email]",
    "phone": "[support phone]",
    "hours": "[support hours]"
  },
  "specs": {
    "general": [
      { "spec": "Sole Design", "value": "Auto-Glide Sole: 4-way cambered" },
      { "spec": "Sole Features", "value": "Trailing edge extension, heavy winged sole" },
      { "spec": "Weighting", "value": "40g counterweight + high toe weight + deep cavity" },
      { "spec": "D4 Swingweight", "value": "Pre Counterbalance" },
      { "spec": "Leading Edge", "value": "Straight (for alignment)" },
      { "spec": "Face", "value": "Max volume conforming grooves + laser-etched texture" },
      { "spec": "Finish", "value": "Premium black" },
      { "spec": "Shaft", "value": "Stepless steel, R+ Wedge Flex | 0.370 Tip, 0.600\" Butt" },
      { "spec": "Grip", "value": "R58 Core, Velvet Pattern" }
    ],
    "byLoft": [
      { "loft": "50°", "lieAngle": "64°", "length": "35.75\"", "swingweight": "D4", "counterweight": "40g" },
      { "loft": "56°", "lieAngle": "64°", "length": "35.50\"", "swingweight": "D4", "counterweight": "40g" },
      { "loft": "60°", "lieAngle": "64°", "length": "35.25\"", "swingweight": "D4", "counterweight": "40g" },
      { "loft": "63° (ONE.S)", "lieAngle": "64°", "length": "35.00\"", "swingweight": "D4", "counterweight": "40g" }
    ],
    "availability": "Men's Right Hand and Left Hand"
  }
}
```

---

## FILE STRUCTURE

```
/ONE.1-Sales-Page/
├── index.html              ← Single HTML file with inline CSS/JS
└── public/
    ├── images/
    │   ├── product/        ← Product photography
    │   ├── features/       ← Feature animations/videos
    │   ├── ugc/            ← User-generated content
    │   └── misc/           ← Designer headshot, trust badges, etc.
    └── brand/
        └── logos/          ← PG logos (optional, can inline as SVG)
```

---

## ACCEPTANCE CRITERIA

### Copy Integrity
- [ ] All text matches JSON content model exactly (character-for-character)
- [ ] No copy has been added, removed, or reordered
- [ ] Blank lines in arrays render as visual spacing
- [ ] Placeholders render literally with TODO comments

### Brand Compliance
- [ ] All brand colors used from defined palette
- [ ] Color proportions follow 60/30/10 rule
- [ ] Performance Orange used only for CTAs and small accents
- [ ] Typography hierarchy matches spec (heading/body/mono)
- [ ] Fonts loaded from Google Fonts CDN

### Layout & Responsiveness
- [ ] All 16 sections rendered in correct order
- [ ] Mobile layout works at 320px width (no horizontal scroll)
- [ ] Desktop layout works at 1440px width
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Sticky CTA bar appears on mobile after scrolling past first CTA

### Motion & Performance
- [ ] GSAP + ScrollTrigger loaded from CDN
- [ ] Animations use only transform and opacity
- [ ] `prefers-reduced-motion` fully respected (no animation init)
- [ ] All images have aspect-ratio containers (no CLS)
- [ ] Mid-page refresh handling implemented

### Interactive Components
- [ ] Product configurator updates price/copy on selection
- [ ] PG1 membership toggle switches copy dynamically
- [ ] Quiz flows through 6 questions to correct result
- [ ] FAQ accordions expand/collapse smoothly
- [ ] Bundle selector updates pricing in real-time

### Accessibility
- [ ] Single `<h1>` (hero headline)
- [ ] Logical heading hierarchy (H1 → H2 → H3)
- [ ] All buttons keyboard accessible
- [ ] Focus states visible and AA contrast compliant
- [ ] Color contrast meets WCAG 4.5:1 for body text

### Code Quality
- [ ] No external placeholder images — styled containers only
- [ ] No console.log statements
- [ ] All CSS in single `<style>` block
- [ ] All JS in single `<script>` block at end of body
- [ ] Semantic HTML used throughout

---

## FALLBACK INSTRUCTIONS

### If Fonts Fail to Load
```css
:root {
  --font-heading: system-ui, -apple-system, sans-serif;
  --font-body: Georgia, 'Times New Roman', serif;
  --font-mono: ui-monospace, monospace;
}
```

### If GSAP Fails to Load
```javascript
// Check if GSAP loaded
if (typeof gsap === 'undefined') {
  // Make all animated elements visible
  document.querySelectorAll('[data-anim]').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}
```

### Placeholder Image Pattern
```html
<div class="image-placeholder" style="aspect-ratio: 16/9; background: var(--pg-fog); display: flex; align-items: center; justify-content: center; border-radius: 12px;">
  <span style="color: var(--pg-gray); font-family: var(--font-mono); font-size: 12px; text-align: center; padding: 20px;">
    [Description of intended image]
  </span>
</div>
<!-- TODO: Replace with actual image -->
```

---

## FINAL INSTRUCTION

Generate the complete `index.html` implementation now. Follow every specification exactly. Do not ask clarifying questions — all information needed is in this document.

When in doubt:
- Refer to the JSON content model for exact copy
- Follow mobile-first layout patterns
- Use Apple-inspired restraint (let the product speak)
- Ensure all interactive components work as specified

The output should be production-ready, requiring only asset integration (images, final pricing, testimonial names) before deployment.
