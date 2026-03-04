# DQFE1 Quiz Build Plan

**Last Updated:** 2026-01-24
**Status:** Planning Phase - Ready for Implementation

---

## Project Overview

**Goal:** Build a custom-coded version of the DQFE1 (PG1 Universal Golf Quiz) that can be presented to the CEO as an in-house solution, replacing the external HeyFlow implementation.

**Strategic Context:** This quiz is the "spine" of PG1 acquisition for FY26, designed to shift from forced continuity to earned continuity by creating voluntary engagement in the first 60 days where 70% of LTV is captured.

**Key Decisions Made:**
- Codebase location: Undecided (build standalone for now, discuss with team)
- Payment integration: Build abstraction layer to support both Checkout Champ and Shopify
- Slide 23 images: Available in `dqfe1-icons-images/` folder

---

## Quiz Structure Summary

### Total Slides: 26 (with variants)
- **Linear slides:** 1, 2, 7, 8, 9, 10, 11, 15, 17, 21
- **Branching slides:** 3→4a/b/c/d, 5→6a/6b→6ba, 11→12a/b, 13→14a/b/15, 16→20a/b/c/d/e, 22→23a/b/c/d/e/f
- **Critical data capture:** Slide 24 (email), Slide 26 (checkout)

### Slide Categories

| Type | Slides | Purpose |
|------|--------|---------|
| Entry/Motivation | 1, 2 | Hook & initial engagement |
| Demographics | 3 | Age (routes to testimonial) |
| Testimonials | 4a, 4b, 4c, 4d | Age-matched social proof |
| Experience Level | 5, 6a, 6b, 6ba | Skill assessment |
| Golf Preferences | 7, 8, 9, 10, 11 | Multi-select interests |
| Confidence Check | 11→12a/b | Route by confidence score |
| Learning Style | 13, 14a, 14b | Practice preferences |
| Progress Markers | 15, 17 | Commitment building |
| Goal Selection | 16 | Up to 3 goals (Priority A/B logic) |
| Practice Frequency | 18 | Time commitment |
| Personalized Plan | 19 | Dynamic content from 4 inputs |
| Goal-Specific Result | 20a-e | Priority-based routing |
| Transition | 21 | Build anticipation |
| Focus Area | 22 | 6 options + "no preference" |
| Quick Win Preview | 23a-f | Topic-specific video preview |
| Email Capture | 24 | Klaviyo integration |
| Checkout | 26 | Yearly/Monthly pricing |

---

## Complete Branching Logic

### Slide 1 → 2 → 3 (Linear)
Entry flow, no branching.

### Slide 3 (Age) → Slide 4a/b/c/d (Testimonials)
| Age Selection | Routes To |
| ------------- | --------- |
| Under 18      | Slide 4a  |
| 18-35         | Slide 4a  |
| 36-49         | Slide 4b  |
| 50-64         | Slide 4c  |
| 65+           | Slide 4d  |

### Slide 5 (Experience) → Slide 6a or 6b
| Experience Level | Routes To |
|------------------|-----------|
| "No, I'm starting from scratch" | Slide 6a |
| "Yes, but I'm not very confident" | Slide 6b → 6ba |
| "Yes, I play well" | Slide 6b → 6ba |

### Slides 7 → 8 → 9 → 10 → 11 (Linear)
Multi-select preferences, no branching.

### Slide 11 (Confidence 1-5) → Slide 12a or 12b
| Rating | Routes To |
|--------|-----------|
| 1 or 2 | Slide 12a |
| 3, 4, or 5 | Slide 12b |

### Slide 13 (Learning Preference) → Slide 14a, 14b, or 15
| Selection | Routes To |
|-----------|-----------|
| "Having a practice routine" | Slide 14a → 15 |
| "Playing on my own" | Slide 14a → 15 |
| "Other, please specify" | Slide 14a → 15 |
| "Playing with friends or family" | Slide 14b → 15 |
| "Short video lessons that fit my schedule" | Slide 15 |
| "Support from private coaches" | Slide 15 |
| "Not sure right now" | Slide 15 |

### Slides 15 → 16 → 17 → 18 → 19 (Linear with data collection)

### Slide 16 Goals → Slide 20 (Priority Logic)

**Priority A (Score Goals - Check First):**
| Goal Selected | Routes To |
|---------------|-----------|
| Break 100 | Slide 20a |
| Break 90 | Slide 20a |
| Break 80 | Slide 20b |

**Priority B (If NO Priority A goal selected):**
| Goal Selected | Routes To |
|---------------|-----------|
| Hit shots where I want them to go | Slide 20c |
| Play golf confidently | Slide 20d |
| Learn swing mechanics and teach myself | Slide 20e |
| None of the above | Slide 20c (default) |

### Slide 22 (Focus Area) → Slide 23a-f
| Selection | Routes To |
|-----------|-----------|
| Hit My Targets / Accuracy | Slide 23a |
| Make Solid Contact | Slide 23b |
| Stop Slicing | Slide 23c |
| Boost My Distance | Slide 23d |
| Sharpen My Short Game | Slide 23e |
| Strengthen My Mental Game | Slide 23f |
| I don't have a preference | Slide 23a (default) |

### Slides 23 → 24 → 26 (Linear to checkout)
Note: Slide 25 (welcome freebie popup) is deferred for later.

---

## Personalized Plan Logic (Slide 19)

The personalized practice plan is built from 4 user inputs:

| Plan Section | Data Source | Display Value |
|--------------|-------------|---------------|
| "Aligning with your goals" | Slide 16 | "# goals selected" + list |
| "Personalizing your lessons" | Slide 7 | "# interests selected" + list |
| "Adjusting your content level" | Slide 5 | "Starting from scratch" / "Some experience" / "Play confidently" |
| "Building your practice plan" | Slide 18 | "Once in a while" / "A few times a week" / "Every day" / "Creating the right balance" (if "Not sure yet") |

---

## Technical Requirements

### Core Features Needed
1. **Quiz Engine** - Slide rendering, state management, branching logic
2. **Data Persistence** - Store all user responses for personalization
3. **Dynamic Content** - Render personalized plan based on inputs
4. **Email Integration** - Klaviyo API for lead capture
5. **Checkout Integration** - Checkout Champ (current) or Shopify (Feb 2026)
6. **Analytics** - Track completions, drop-offs, conversions

### Tech Stack (Recommended)
- **Framework:** Next.js 14 (React + App Router)
- **Styling:** Tailwind CSS
- **State Management:** React Context or Zustand
- **Deployment:** Vercel (instant deploys, easy preview URLs)
- **Email:** Klaviyo API
- **Payments:** Abstract layer supporting Checkout Champ + Shopify

---

## Assets

### Available Assets
**Location:** `./dqfe1-icons-images/`

| Asset | Filename | Used In |
|-------|----------|---------|
| Design Reference | `dqf1-slide-design.png` | Overall slide styling |
| Accuracy Image | `Slide 23a Image - Accuracy.png` | Slide 23a |
| Contact Image | `Slide 23b Image - Contact.png` | Slide 23b |
| Slice Image | `Slide 23c Image - Slice.png` | Slide 23c |
| Distance Image | `Slide 23d Image - Distance.png` | Slide 23d |
| Short Game Image | `Slide 23e Image - Short Gamepng.png` | Slide 23e |
| Mental Game Image | `Slide 23f Image - Mental Game.png` | Slide 23f |

### Assets Still Needed
| Asset Type | Status | Notes |
|------------|--------|-------|
| PG1 Logo | TBD | Need path from user |
| Slide 1 icons (6 motivation options) | TBD | Icons for: friends, challenge, solo, fitness, compete, new |
| Testimonial photos (4) | TBD | Photos for age groups: 18-35, 36-49, 50-64, 65+ |
| Slide 22 video thumbnails (6) | TBD | Thumbnails for focus area selection |
| Progress bar design | Build | Match SimplyPiano style (orange gradient) |

---

## Build Phases

### Phase 1: Foundation
- [ ] Set up Next.js project with Tailwind
- [ ] Create quiz state management system
- [ ] Build reusable slide components (single-select, multi-select, text input, info)
- [ ] Implement progress bar and navigation

### Phase 2: Slide Implementation
- [ ] Build all 26+ slide variants
- [ ] Implement branching logic engine
- [ ] Add personalization data collection

### Phase 3: Dynamic Content
- [ ] Build Slide 19 personalized plan generator
- [ ] Implement Priority A/B routing for Slide 20
- [ ] Create dynamic Slide 23 routing

### Phase 4: Integrations
- [ ] Klaviyo email capture (Slide 24)
- [ ] Checkout integration (Slide 26)
- [ ] Analytics/event tracking

### Phase 5: Polish & Testing
- [ ] Mobile-responsive design
- [ ] Cross-browser testing
- [ ] User flow testing
- [ ] Performance optimization

---

## Open Questions

1. **Where should the codebase live?** Standalone repo vs. existing PG infrastructure?
2. **Design assets:** Need paths to remaining icons, photos, thumbnails
3. **Klaviyo events:** What specific events need to be tracked? (Need Eric Hayden's requirements)
4. **Hosting:** Vercel, or internal infrastructure?

---

## Reference Documents (in this folder)

- `pg-fy26-strategic-focus.md` - FY26 strategy context
- `dqfe-1-logic-flow-loom-transcript.md` - Detailed logic flow explanation
- `dqfe1 back-end flow sync.md` - Klaviyo/email integration discussion
- `miro-board-loom-update-transcript.md` - Design direction context
- `meta email thread (full record).md` - Additional historical context

## Reference Screenshots

- `../dqfe1-wireframe-screenshots/` - All DQFE1 wireframe slides
- `../dqfe1-simply-piano-screenshots/` - SimplyPiano reference slides
- `../dqfe1-icons-images/` - Available image assets

---

## Verification Plan

1. Complete quiz flow from Slide 1 → 26
2. Test all branching paths (age → testimonial, experience → reassurance, etc.)
3. Verify personalized plan generates correct content from inputs
4. Confirm email capture sends to Klaviyo
5. Confirm checkout flow works with payment processor
6. Mobile responsiveness on iOS Safari and Android Chrome

---

## Next Steps

When resuming this project:
1. Review this plan document
2. Confirm remaining assets are available
3. Begin Phase 1: Foundation setup
4. Build quiz incrementally, testing each branching path as you go
