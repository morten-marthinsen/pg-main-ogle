# Visual Identity

## Brand Concept: There's A Story In Every Swing

Every golfer knows those unforgettable moments. The flush iron that splits the fairway. The putt that drops from twenty feet. The drive that makes your playing partners stop and stare. These aren't just good shots—they're magical moments that define why we love this game.

Our visual identity captures this cinematic quality. Drawing inspiration from film's ability to transform ordinary moments into something memorable, we've built a system that frames golf with precision, drama, and beauty.

---

## Color Palette

### Primary Colors

**Performance Orange** — #FD3300 / RGB(253, 51, 0) / Pantone 172 C
Our signature. Vibrant, passionate, high-performance.

**Dark Orange** — #DB2C00 / RGB(219, 44, 0) / Pantone 173 C
A deeper variant for emphasis and hierarchy.

**Black** — #1D1A1A / RGB(29, 26, 26) / Pantone Black 4 C
Strong, confident, grounding.

**UI Gray Text** — #7B726C / RGB(123, 114, 108)
For interface elements and supporting text.

### Neutrals

| Name | Hex | RGB | Pantone |
|------|-----|-----|---------|
| Stone | #B3AAA3 | 179, 170, 163 | Warm Gray 5 C |
| Pebble | #DFD9D5 | 223, 217, 213 | Warm Gray 2 C |
| Sand | #ECE9E4 | 236, 233, 228 | Warm Gray 1 C |
| Fog | #F4F2F0 | 244, 242, 240 | — |
| Mist | #FCFAFA | 252, 250, 250 | — |

### Secondary Colors (Use Sparingly)

| Name | Hex | RGB | Pantone |
|------|-----|-----|---------|
| Hi-Vis | #E4F222 | 228, 242, 34 | 379 C |
| Grass | #BCE9B1 | 188, 233, 177 | 2260 C |
| Forest | #2E4734 | 46, 71, 52 | 4209 C |
| Sky | #B2C6EB | 178, 198, 235 | 2708 C |
| Indigo | #4F41D5 | 79, 65, 213 | 2132 C |
| Polo | #C5A6CA | 197, 166, 202 | 522 C |

### Color Proportion

**60% neutrals, 30% Performance Orange/Dark Orange, 10% secondary colors and black**

### Accessibility

All approved color combinations meet WCAG accessibility standards (4.5:1 minimum contrast ratio for body text).

**Approved Combinations:**
- Performance Orange or Dark Orange on Warm Gray 05
- Black on Warm Gray 05 or Warm Gray 01
- Performance Orange on Warm Gray 04

---

## Typography

Typography is our primary visual voice. The way we set type communicates personality, establishes hierarchy, and creates the mood for every brand touchpoint.

### Typeface System

**PRIMARY: Repro**
A friendly, flexible sans serif that merges clean design with character. Forms the backbone of our visual communication.

**SECONDARY: GT Super Text**
An expressive serif based on calligraphic forms from the 1970s and 1980s. Adds warmth and conversational tone.

**TERTIARY: Repro Mono**
The technical counterpoint. Adds data-driven precision to our communications.

### Typographic Tone

| Style | Use Case |
|-------|----------|
| Repro Bold Uppercase | IMPACTFUL TITLES – Maximum impact and clarity |
| Repro Regular Sentence Case | Informative Body – Clear, accessible information |
| GT Super Text Book Sentence Case | Conversational Tone – Human and approachable |
| Repro Mono Regular Uppercase | TECHNICAL DATA – Precision, metrics, performance |

### Core Type Specifications

| Element | Font | Size | Leading | Tracking |
|---------|------|------|---------|----------|
| Headline | Repro Bold | 172pt | 87% | -3% |
| Subheadline | Repro Medium | 43pt | 104% | -3% |
| Body Serif | GT Super Text Book | 43pt | 140% | -2% |
| Body | Repro Regular | 43pt | 122% | -1% |
| Detail | Repro Mono Regular | 22pt | 135% | 0% |

### System Alternatives

When brand typefaces aren't available:
- **Times New Roman Regular** → GT Super Text
- **DM Sans Black / Medium** → Repro
- **DM Sans Mono Regular** → Repro Mono

---

## Logo System

The Performance Golf logo is our primary brand identifier—modern, technical, yet approachable.

### Core Elements

**The Symbol** – Most distilled brand mark. Crafted for optimal legibility at any scale.

**The Logotype** – Bold and clean. Maximum recognition at any size.

**The Combination Mark** – Symbol and logotype together for most branded expression.

### When to Use Each

| Logo Type | Use Case |
|-----------|----------|
| Symbol Only | Tight spaces (social avatars, app icons, watermarks) |
| Logotype Only | Broader applications (marketing materials, signage, packaging) |
| Combination Mark | High-visibility brand moments (product launches, campaigns, partnerships) |

### Logo Guidelines

- **Clear Space:** Always maintain adequate clear space around the logo
- **Contrast:** Ensure strong contrast when pairing with brand colors
- **Never:** Distort, rotate at odd angles, apply unapproved colors, or crowd the mark

---

## Product Positioning

### PG1 (Personalized Game Improvement)

**What it is:** Your personalized path to better golf. Smart system that identifies what YOU need and gives you step-by-step guidance.

**How to position:**
- The weapon against The Scattered Playbook
- ONE connected system vs. scattered random tips
- Personalized path (right thing, right time, right order)
- Adapts as you improve
- Eliminates guesswork

**Voice approach:**
- "Your game improvement plan—built for where you are now"
- "Know exactly what to work on next"
- "No more sifting through chaos"
- "Clear path forward"

### 72-Hour Golf Transformation Academy

**What it is:** Intensive in-person experience that identifies and fixes your root swing flaw in 72 hours.

**How to position:**
- Immersion method (vs. weekly lessons that don't stick)
- Root flaw identification (vs. treating symptoms)
- Permanent transformation (vs. temporary fixes)
- For golfers ready to eliminate confusion once and for all

**Voice approach:**
- "Your ONE root swing flaw causing all your symptoms"
- "Fix the root, everything else falls into place"
- "72 hours that change your golf forever"
- "Permanent breakthrough, not temporary band-aid"

---

## CSS Quick Start

```css
:root {
  /* Primary Colors */
  --per-orange: #FD3300;
  --per-dark-orange: #DB2C00;
  --per-black: #1D1A1A;
  --per-ui-gray: #7B726C;
  
  /* Neutrals */
  --per-stone: #B3AAA3;
  --per-pebble: #DFD9D5;
  --per-sand: #ECE9E4;
  --per-fog: #F4F2F0;
  --per-mist: #FCFAFA;
  
  /* Secondary Colors */
  --per-hi-vis: #E4F222;
  --per-grass: #BCE9B1;
  --per-forest: #2E4734;
  --per-sky: #B2C6EB;
  --per-indigo: #4F41D5;
  --per-polo: #C5A6CA;
  
  /* Typography */
  --font-display: 'GT Super Text', Georgia, serif;
  --font-heading: 'Repro', 'DM Sans', sans-serif;
  --font-mono: 'Repro Mono', 'DM Mono', monospace;
  
  /* Spacing Scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
}

/* Button System */
.per-button-primary {
  background: var(--per-orange);
  color: var(--per-mist);
  font-family: var(--font-heading);
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: background 0.2s ease;
}

.per-button-primary:hover {
  background: var(--per-dark-orange);
}

/* Typography System */
.per-headline {
  font-family: var(--font-heading);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.87;
}

.per-body {
  font-family: var(--font-heading);
  font-weight: 400;
  line-height: 1.22;
  letter-spacing: -0.01em;
}

.per-body-serif {
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.02em;
}

.per-detail {
  font-family: var(--font-mono);
  font-weight: 400;
  text-transform: uppercase;
  line-height: 1.35;
  letter-spacing: 0;
}
```
