# A05 -- Visual Direction

**Version:** 1.0
**Created:** 2026-02-22
**Role:** Workflow Orchestrator (State Machine)
**Skill Type:** Creative Strategy + Production Specification
**Pipeline Position:** 5th Ad Engine skill. Receives script architectures from A04. Feeds complete ad concepts (hook + script + visual direction) to A06 (Ad Arena).
**Related Documents:**
- `./ads/AD-ENGINE.md` (Ad Engine master)
- `./References/AD-SCRIPT-STRUCTURES.md` (8 frameworks, 5 visual treatments)
- `./References/AD-HOOK-TAXONOMY.md` (32 hook types, 10 categories)
- `~system/SYSTEM-CORE.md` (system governance -- metacognitive, gates, anti-degradation)
**Anti-Degradation Document:** `A05-VISUAL-DIRECTION-ANTI-DEGRADATION.md` (MANDATORY -- read BEFORE execution)

---

## TABLE OF CONTENTS

- [THE 3 LAWS OF VISUAL DIRECTION (Never Scroll Past This)](#the-3-laws-of-visual-direction-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [THE 5 VISUAL TREATMENT TYPES (Reference Section)](#the-5-visual-treatment-types-reference-section)
- [VISUAL TREATMENT SELECTION MATRIX](#visual-treatment-selection-matrix)
- [PLATFORM-SPECIFIC VISUAL REQUIREMENTS](#platform-specific-visual-requirements)
- [COLOR PSYCHOLOGY BY VERTICAL](#color-psychology-by-vertical)
- [MODEL ASSIGNMENT TABLE (Binding)](#model-assignment-table-binding)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [OUTPUT SCHEMA: VISUAL-DIRECTION-PACKAGE.md](#output-schema-visual-direction-packagemd)
- [ANTI-DEGRADATION PATTERNS (A05-Specific)](#anti-degradation-patterns-a05-specific)
- [PER-MICROSKILL OUTPUT PROTOCOL](#per-microskill-output-protocol)
- [FORBIDDEN BEHAVIORS (A05-Specific)](#forbidden-behaviors-a05-specific)
- [MC-CHECK SCHEDULE (A05-Specific)](#mc-check-schedule-a05-specific)
- [VISUAL BRIEF EXAMPLE (Reference Quality Standard)](#visual-brief-example-reference-quality-standard)
- [EFFORT PROTOCOL MAPPING (A05-Specific)](#effort-protocol-mapping-a05-specific)
- [VERSION HISTORY](#version-history)

---

## THE 3 LAWS OF VISUAL DIRECTION (Never Scroll Past This)

1. **The visual sells before the audio does.** 85% of social video is watched on mute initially. The first frame must stop the scroll, the first 3 seconds must communicate the hook, and the visual must carry the full persuasion story independent of sound. If you strip the audio and the ad loses its meaning, the visual direction has failed.
2. **Specific or useless.** "Show product" is not visual direction. "Close-up of amber supplement bottle held at 30-degree angle against white marble surface, morning light from camera-left, condensation droplets on glass" is visual direction. Every shot must specify: type, subject, action, duration, framing, text overlay, and transition. If a production team cannot execute the brief without asking questions, it is incomplete.
3. **Platform-native or invisible.** A TikTok visual brief that reads like a TV commercial will produce content that gets scrolled past. Every visual decision -- aspect ratio, text placement, pacing, style -- must be calibrated to the specific platform where the ad will run. Platform-blind visual direction is a protocol violation.

---

## CRITICAL: READ THIS FIRST

This file exists because **visual direction has its own degradation patterns** distinct from script writing and distinct from other ad skills:

1. **The Visual Afterthought** -- Script is audio-complete with detailed dialogue and voiceover, but the visual column reads "Show product. Show happy customer. Show results." This is not visual direction. This is a placeholder. A05 exists specifically to eliminate this failure.
2. **Generic Stock Imagery** -- The model defaults to vague, category-level visual descriptions ("woman smiling while holding supplement") instead of specific, branded, production-ready shots. Generic visual descriptions produce generic ads.
3. **Visual-Copy Disconnect** -- Visual direction that doesn't reinforce the script. The audio says "ancient Himalayan compound" while the visual shows a modern lab. The hook says "I threw out all my skincare" while the visual shows a product glamour shot. The visual must MIRROR and AMPLIFY the copy's emotional trajectory.
4. **Platform-Blind Visuals** -- Same visual brief regardless of whether the ad runs on TikTok (9:16, raw/authentic, text-heavy overlays) or YouTube (16:9, higher production, thumbnail-critical). Each platform has its own visual grammar.
5. **Style Monotony** -- All concepts receive the same visual treatment (all polished or all UGC) instead of matching visual style to concept strategy. Different hooks and scripts demand different visual treatments.
6. **Missing Sound-Off Strategy** -- No consideration for how the ad communicates without audio. No text overlay plan, no visual hook strategy, no caption design. Sound-off is not an edge case -- it is the PRIMARY viewing mode on Meta and LinkedIn.
7. **Tool-Blind Specs** -- Visual briefs written without awareness of what AI production tools can actually generate. Midjourney has different strengths than Flux. Arcads has different capabilities than Creatify. ElevenLabs video differs from Runway. A05 must produce specs that A08 can actually execute.

**This file is the fix.** Before executing A05, read the relevant sections below.

---

## PURPOSE

Design the **complete visual direction** for every ad concept emerging from A04 -- what the viewer SEES, frame by frame, second by second. A05 transforms script architectures into production-ready visual briefs that A08 (Visual/Video Production) will execute using AI tools (Midjourney, Arcads, ElevenLabs, Runway, etc.).

**The critical output of this skill is VISUAL-DIRECTION-PACKAGE.md** containing:
- Visual style strategy per concept (which of 5 treatment types, why)
- Shot-level visual briefs for every script (type, subject, action, duration, framing, text overlay, transition)
- Color palette and typography specifications per concept
- Talent direction (on-camera persona, energy, wardrobe, setting)
- Product staging specifications
- Motion graphics and text overlay design system
- B-roll strategy per concept
- Platform-specific visual adaptations (aspect ratio, safe zones, text placement)
- Thumbnail strategy for YouTube ads
- Tool-specific production specs for A08 (Midjourney prompts, Arcads talent briefs, etc.)

**Success Criteria:**
- Every script from A04 has a corresponding visual brief (zero orphaned scripts)
- Every visual brief specifies shot type, subject, action, duration, framing, text overlay, and transition for every beat
- Visual-copy coherence validated for every concept (visual reinforces audio, not contradicts)
- Platform-specific specs provided for every target platform
- Sound-off strategy included for every concept (the ad must work on mute)
- Tool-specific production specs provided for A08 execution
- Color palette, typography, and talent direction documented per concept
- B-roll strategy documented with specific footage descriptions
- VISUAL-DIRECTION-PACKAGE.md produced at 80KB+ minimum
- All required sections populated with substantive direction (not summaries)

This agent is a **workflow orchestrator**. It coordinates visual style decisions, shot-level brief creation, coherence validation, and production specification into a unified visual direction package. It produces the visual half of the complete ad concepts that A06 (Ad Arena) will evaluate.

---

## IDENTITY

**This skill IS:**
- The visual architect for every ad concept in the campaign
- The translator of scripts into shot-level visual direction that production teams (human or AI) can execute without questions
- The visual style strategist that matches treatment type (polished, UGC, hybrid, demonstration, testimonial) to concept strategy
- The platform-specific visual optimizer (Meta safe zones, TikTok text overlay zones, YouTube thumbnails)
- The sound-off guardian that ensures every ad communicates visually before audio engages
- The visual-copy coherence validator that prevents disconnect between what viewers see and hear
- The tool-specific spec generator that translates visual briefs into Midjourney prompts, Arcads talent briefs, ElevenLabs voice direction, and stock footage queries
- The color, typography, and motion graphics system designer for campaign visual consistency

**This skill is NOT:**
- A script writer (that is A04 -- A05 receives scripts, does not write them)
- A visual/video producer (that is A08 -- A05 directs visuals, A08 produces them using tools)
- A hook generator (that is A02 -- A05 visualizes hooks, does not create them)
- A format strategist (that is A03 -- A05 receives format decisions, does not make them)
- An Arena evaluator (that is A06 -- A05 prepares concepts for Arena evaluation)
- A brand guidelines creator (brand guidelines are upstream inputs, not A05 outputs)
- A post-production editor (editing decisions happen in A08/A09, not A05)

**Upstream Dependencies:**
- A04 Script Package (REQUIRED) -- script architectures with modular beat structures, two-column AV format
- A03 Format Strategy (REQUIRED) -- platform mapping, format assignments, aspect ratio requirements, ad lengths
- A02 Hook-Angle Matrix (REQUIRED) -- selected hooks with type classifications (visual hook requirements vary by hook type)
- A01 Ad Intelligence Handoff (REQUIRED) -- winning visual styles, competitor visual patterns, platform-specific visual intelligence
- Campaign Brief (Skill 09) (REQUIRED) -- brand guidelines, product details, target audience, visual assets
- Soul.md (RECOMMENDED) -- visual tone constraints, energy signature, anti-voice visual equivalents
- Proof Inventory (Skill 02) (OPTIONAL) -- visual proof elements (before/after photos, product demos, data visualizations)

**Downstream Consumers:**
- A06 (Ad Arena) -- evaluates complete ad concepts (hook + script + visual direction as integrated unit)
- A08 (Visual/Video Production) -- executes visual briefs using AI tools per production specs
- A09 (Assembly & Variant Matrix) -- uses visual treatment variants for the visual swap testing pattern

---

## THE 5 VISUAL TREATMENT TYPES (Reference Section)

Every ad concept receives ONE primary visual treatment type. The selection is strategic, not arbitrary -- it must match the hook type, script framework, platform requirements, and audience expectations.

### Treatment 1: Polished Production

**What it is:** Studio-quality or high-end location shooting. Clean lighting, professional color grading, purposeful composition. Brand-level visual quality.

**When to use:**
- YouTube pre-roll ads (16:9 format where production quality signals authority)
- Authority/expert positioning (doctor reveals, scientific explainer)
- Premium product positioning (high-ticket items, luxury positioning)
- Brand awareness campaigns where memorability matters more than immediate DR

**When NOT to use:**
- TikTok native feed (will feel "ad-like" and get scrolled past)
- UGC-style scripts (visual style must match script voice)
- Low-ticket impulse products (over-production creates price expectation mismatch)

**Key specifications:**
- Lighting: 3-point studio or controlled location lighting
- Color: Brand-aligned palette, professional grading
- Composition: Rule of thirds, deliberate negative space
- Camera movement: Smooth gimbal or steadicam, deliberate zooms
- Text overlays: Minimal, high-end typography, lower-third placement
- Talent: Professional appearance, styled wardrobe, confident delivery

**Performance context:** Polished production underperforms UGC by 15-25% on Meta/TikTok for direct response. Reserve for YouTube, brand campaigns, and authority positioning.

---

### Treatment 2: UGC-Native (User-Generated Content)

**What it is:** Content that looks and feels like a real person's organic social media post. Phone-shot aesthetic, natural lighting, authentic environment, unpolished delivery.

**When to use:**
- TikTok and Instagram Reels (native format for these platforms)
- Testimonial and review scripts
- "I just discovered this" / recommendation scripts
- Problem/solution scripts where authenticity drives trust
- DTC and eCommerce (UGC delivers 400% higher CTR)

**When NOT to use:**
- Scientific explainer ads (lacks authority signals)
- High-ticket B2B (perceived as low-effort)
- Complex mechanism explanation (needs visual aids UGC can't support)

**Key specifications:**
- Lighting: Natural/window light, ring light acceptable
- Color: No grading or minimal phone-filter grading
- Composition: Slightly off-center, natural framing, some headroom
- Camera: Handheld phone, front-facing selfie camera preferred
- Text overlays: Platform-native caption styles, bold + simple
- Talent: Relatable appearance, casual wardrobe, conversational energy
- Setting: Real home, car, kitchen, bathroom -- NOT a studio
- Imperfections: Embrace -- slight camera shake, background noise, natural pauses signal authenticity

**Performance context:** UGC outperforms polished production by 15-25% on Meta/TikTok for DR. 83% of top-performing social ads use UGC elements.

---

### Treatment 3: Hybrid (UGC Feel + Production Value)

**What it is:** The "produced but doesn't feel produced" aesthetic. Content that has the authenticity of UGC with subtle production enhancements -- better lighting, cleaner audio, motion graphics overlays, strategic B-roll inserts.

**When to use:**
- Meta feed ads (the sweet spot between trust and quality)
- Educational/edutainment scripts (need visual aids but must feel approachable)
- Product demonstration with real-person host
- Campaigns that need scale (hybrid is easier to produce consistently than pure UGC)

**When NOT to use:**
- When pure UGC authenticity is the strategic play
- When full polish is required for authority positioning

**Key specifications:**
- Lighting: Enhanced natural (reflector, single key light) -- better than phone but not studio
- Color: Light grading, warm tones, natural skin tones preserved
- Composition: Natural but intentional framing
- Camera: Phone or mirrorless on minimal stabilization
- Text overlays: Clean motion graphics overlays, animated callouts, data visualizations
- Talent: Relatable but well-presented, semi-casual wardrobe
- Setting: Real location with intentional background (bookshelf, kitchen, outdoor)
- B-roll: Strategic inserts of product, results, supplementary footage

**Performance context:** Hybrid is the most common format among top-performing Facebook ads. Combines trust (UGC) with clarity (production elements).

---

### Treatment 4: Demonstration (Product in Action)

**What it is:** Visual content centered on SHOWING the product working. The visual IS the proof. Before/after, side-by-side comparison, real-time application, measurable results displayed.

**When to use:**
- Product demo scripts (A04 Framework 4: Hook-Body-CTA with demo focus)
- Before/after transformation stories
- "Watch this" / real-time results hooks
- Products with visible, demonstrable outcomes (skincare, fitness, cleaning, cooking)
- Golf/sports (launch monitor data, swing overlays, distance results)

**When NOT to use:**
- Abstract benefits (stress reduction, confidence, financial security)
- Products without visible outcomes
- When the mechanism is conceptual, not physical

**Key specifications:**
- Lighting: Even, well-lit to show product clearly (macro lighting for detail)
- Color: Accurate color reproduction (critical for before/after credibility)
- Composition: Tight framing on product/results, comparison layouts
- Camera: Steady tripod or tabletop, macro capability for close-ups
- Text overlays: Data callouts, measurement annotations, timestamp markers
- Talent: Hands/application focus over face (product is the star)
- Setting: Clean, controlled environment that doesn't distract from product
- Special elements: Split-screen before/after, time-lapse, slow-motion application, measurement overlays (launch monitor data, weight scale, skin analysis)

**Performance context:** 44.2% of top supplement ads are product demonstrations. Demonstration is the highest-performing format when the product has visible results.

---

### Treatment 5: Testimonial (Real People, Real Stories)

**What it is:** Real or AI-generated people sharing their genuine experience with the product. The visual story follows the person's transformation journey. Multiple testimonials may be compiled into a cascade.

**When to use:**
- Testimonial compilation scripts (3-5 people, quick-cut montage)
- Single deep-dive testimonial stories
- Social proof stacking (escalating from individual to thousands)
- Products where trust is the primary conversion barrier

**When NOT to use:**
- When testimonial content doesn't exist or can't be sourced
- When the mechanism needs explanation (testimonials prove it works, not how)
- For awareness-level audiences (testimonials assume some familiarity)

**Key specifications:**
- Lighting: Natural, authentic (matches UGC aesthetic for trust)
- Color: Warm, inviting tones
- Composition: Talking head (shoulders up), natural environment visible
- Camera: Phone-quality or slightly better (too polished undermines authenticity)
- Text overlays: Name + location (lower third), key result highlighted (bold text), star ratings
- Talent: Diverse, relatable, genuine emotion (NOT actors reading scripts)
- Setting: Their real environment (home, office, outdoors)
- Special elements: Before/after photo inserts, product shots between testimonials, text overlay of specific results ("Lost 23 lbs in 8 weeks"), reaction shots

**Performance context:** 76.9% of top health/supplement performers include testimonial elements. Testimonial cascades (3-5 people in rapid succession) build compound social proof.

---

## VISUAL TREATMENT SELECTION MATRIX

This matrix guides treatment selection based on script framework, platform, and hook type:

```
SCRIPT FRAMEWORK → TREATMENT SELECTION:

PAS (Problem-Agitate-Solution):
  Meta/Instagram  → Hybrid (Treatment 3) or UGC (Treatment 2)
  TikTok          → UGC (Treatment 2)
  YouTube         → Polished (Treatment 1) or Hybrid (Treatment 3)

AIDA (Attention-Interest-Desire-Action):
  Meta/Instagram  → Hybrid (Treatment 3) or Demonstration (Treatment 4)
  TikTok          → UGC (Treatment 2) or Hybrid (Treatment 3)
  YouTube         → Polished (Treatment 1) or Demonstration (Treatment 4)

BAB (Before-After-Bridge):
  All platforms    → Demonstration (Treatment 4) -- BAB is inherently visual

Hook-Body-CTA (Social Native):
  TikTok          → UGC (Treatment 2) -- ALWAYS
  Meta/Instagram  → UGC (Treatment 2) or Hybrid (Treatment 3)
  YouTube         → Hybrid (Treatment 3)

Story Narrative:
  YouTube         → Polished (Treatment 1) or Hybrid (Treatment 3)
  Meta/Instagram  → Hybrid (Treatment 3) or Testimonial (Treatment 5)
  TikTok          → UGC (Treatment 2) with story beats

Edutainment:
  YouTube         → Hybrid (Treatment 3) with motion graphics -- PRIMARY
  Meta/Instagram  → Hybrid (Treatment 3) with text-heavy overlays

UGC-DR:
  All platforms    → UGC (Treatment 2) -- by definition

Fast-Paced Viral:
  TikTok/Shorts   → UGC (Treatment 2) with rapid cuts
  Meta/Instagram  → UGC (Treatment 2) or Hybrid (Treatment 3) with rapid cuts
```

```
HOOK TYPE → VISUAL TREATMENT INFLUENCE:

Category A (Curiosity): Mystery visuals, withheld information, visual tease → Any treatment
Category B (Authority): Expert on camera, credentials visible → Polished or Hybrid
Category C (Problem/Pain): Pain visualization, frustrated expressions → UGC or Hybrid
Category D (Transformation): Before/after, results → Demonstration or Testimonial
Category E (Identity): Lifestyle imagery, aspirational settings → Polished or Hybrid
Category F (Pattern Interrupt): Unusual visual, unexpected → UGC (for authenticity of unexpected)
Category G (Platform Native): TikTok stitch, reply format → UGC (MANDATORY)
Category H (Scarcity): Countdown overlays, inventory graphics → Any treatment + motion graphics
Category I (Value/Education): Diagrams, annotations, step visuals → Hybrid with motion graphics
Category J (Story): Narrative cinematography → Polished or Hybrid
```

---

## PLATFORM-SPECIFIC VISUAL REQUIREMENTS

### Meta (Facebook + Instagram Feed)

```
ASPECT RATIOS:
  Primary: 4:5 (vertical, 80% of Meta inventory)
  Secondary: 1:1 (square, carousel and grid)
  Reels: 9:16 (full vertical)
  Stories: 9:16 (full vertical)

SAFE ZONES:
  Top 14%: Platform UI (profile pic, name, "Sponsored" tag) -- NO critical content
  Bottom 10%: CTA button overlay zone -- NO critical content
  Text overlays: Maximum 20% of frame (Meta policy -- ads with >20% text get reduced delivery)

TEXT OVERLAY RULES (CRITICAL):
  - Maximum 20% of frame covered by text (Meta enforces this algorithmically)
  - Use bold, high-contrast text (white on dark or dark on light)
  - Sans-serif fonts for readability at small sizes
  - 3-6 words per text overlay (viewer has 1-2 seconds per frame)
  - Text must be inside safe zones (not in top 14% or bottom 10%)

VIDEO SPECS:
  Length: 15-60 seconds optimal (83% of top performers are 15-30s)
  First frame: Must communicate value proposition visually (85% sound-off)
  Captions: MANDATORY (auto-captions minimum, styled captions preferred)
  Thumbnail: Auto-selected by Meta (optimize first frame)

SOUND-OFF PRIORITY: HIGH -- 85% of Facebook video is watched without sound
  - All critical information must be communicated visually
  - Text overlays carry the narrative arc
  - Captions are not optional, they are primary communication
```

### TikTok

```
ASPECT RATIOS:
  Required: 9:16 (full vertical, full bleed)
  No other aspect ratios acceptable for TikTok native

SAFE ZONES:
  Top 15%: Creator info overlay -- NO critical content
  Bottom 20%: Caption area + CTA button -- NO critical content
  Right 15%: Engagement icons (like, comment, share) -- NO critical content
  CENTER 50-60%: Primary content zone -- ALL critical visual content here

TEXT OVERLAY RULES:
  No percentage limit on TikTok (unlike Meta's 20% rule)
  BUT readability matters -- text must not obstruct talent face or key visuals
  Bold, large, high-contrast text (TikTok native style)
  2-5 words per overlay (quick reads during rapid scroll)
  Animated text preferred (slide in, pop, typewriter effects)
  Platform-native fonts and colors (match what organic creators use)

VIDEO SPECS:
  Length: 15-30 seconds optimal (63% of top ads place core message in first 3 seconds)
  First FRAME: Must stop the scroll -- the single most important visual decision
  Pacing: 2-3 second cuts minimum for fast-paced content
  Style: Must feel native to platform -- NOT an ad, a piece of content
  Music: Trending sounds when possible (increases distribution)
  Vertical: MANDATORY -- horizontal content is a death sentence on TikTok

AUTHENTICITY PRIORITY: CRITICAL
  - Content must feel like it was made BY a TikTok user, not FOR TikTok by a brand
  - UGC aesthetic is not optional on TikTok -- it is the visual grammar of the platform
  - Professional production on TikTok signals "skip this ad"
```

### YouTube

```
ASPECT RATIOS:
  Primary: 16:9 (landscape, standard YouTube player)
  Shorts: 9:16 (vertical, YouTube Shorts shelf)

SAFE ZONES (16:9):
  Bottom 20%: Controls bar, captions area -- NO critical text
  Standard: Full frame usable for visual content (no persistent UI overlays)

THUMBNAIL STRATEGY (CRITICAL FOR YOUTUBE):
  - YouTube is the ONLY platform where thumbnail is a separate creative decision
  - Thumbnail must be designed as its own asset (not just a frame grab)
  - Thumbnail specs: 1280x720 pixels, bold text (2-4 words max), high contrast
  - Face close-ups with exaggerated expressions outperform other thumbnail styles
  - Text on thumbnail must be readable at mobile preview size (small)
  - Color contrast: Complementary to YouTube's white/red UI
  - The thumbnail IS the scroll-stop mechanism on YouTube (not the first frame)

VIDEO SPECS:
  Pre-roll (skippable): First 5 seconds CRITICAL -- must deliver value before skip button
  Pre-roll (non-skip): 6 or 15 seconds -- every frame counts
  In-stream: 60 seconds to 3+ minutes for Edutainment/Story formats
  Production value: Higher than TikTok/Meta -- YouTube audiences expect quality
  Captions: Recommended but not as critical as Meta (YouTube is more sound-on)

PRODUCTION QUALITY: MEDIUM-HIGH
  - YouTube audiences are more tolerant of production value (they chose to be here)
  - Lower thirds, motion graphics, B-roll inserts enhance credibility
  - Green screen with diagrams/animations for educational content
  - PiP (Picture-in-Picture) for screen recordings with talking head
```

### Google Display Network

```
ASPECT RATIOS:
  Square: 1:1 (300x300)
  Landscape: 1.91:1 (1200x628)
  Portrait: 4:5 (960x1200)
  Responsive: Multiple sizes required

SPECS:
  Static image with text overlay
  Maximum text: 20% of image area (similar to Meta policy)
  High contrast, simple composition (renders at very small sizes)
  Logo placement: Bottom right corner, small
  CTA: Integrated into image design (not relying on platform CTA button)
```

---

## COLOR PSYCHOLOGY BY VERTICAL

### Health/Supplement Vertical

```
PRIMARY PALETTE:
  Trust green: #2E8B57 (sea green) or #3CB371 (medium sea green)
  Medical blue: #4682B4 (steel blue)
  Clean white: #FFFFFF (backgrounds, negative space)

ACCENT PALETTE:
  Energy orange: #FF8C00 (dark orange) -- for CTAs and highlights
  Warm gold: #DAA520 (goldenrod) -- for premium positioning

AVOID:
  Neon/artificial colors (signal synthetic, not natural)
  Pure red (signals danger, not health)
  Dark/heavy color schemes (health = vitality, light, clean)

PSYCHOLOGY:
  Green → natural, organic, health, growth
  Blue → trust, science, medical authority
  White → purity, cleanliness, clinical credibility
  Gold → premium quality, proven results
```

### Golf/Sports Vertical

```
PRIMARY PALETTE:
  Course green: #228B22 (forest green) or #006400 (dark green)
  Sky blue: #87CEEB (light sky blue)
  Turf natural: #8B8B00 (olive) or natural grass tones

ACCENT PALETTE:
  Performance red: #CC0000 (for urgency/CTAs)
  Championship gold: #FFD700 (for premium/results)
  Technology silver: #C0C0C0 (for tech/data elements)

AVOID:
  Feminine pastels (audience skews male 40-65)
  Neon/unnatural colors (golf = tradition, nature)
  Corporate blue (feels too business, not sport)

PSYCHOLOGY:
  Green → the course, nature, tradition
  Blue → sky, outdoors, calm confidence
  Gold → championship, achievement, premium
  Red → performance, urgency, passion
```

### Finance/Trading Vertical

```
PRIMARY PALETTE:
  Authority blue: #003366 (dark navy) or #1E3A5F (deep blue)
  Stability gold: #CFB53B (old gold)
  Trust white: #FFFFFF (clean backgrounds)

ACCENT PALETTE:
  Growth green: #2E8B57 (for positive indicators)
  Alert red: #8B0000 (dark red, for risk/urgency)
  Premium black: #1A1A1A (for sophistication)

AVOID:
  Bright/playful colors (undermines financial gravitas)
  Neon green (signals amateur trading platforms)
  Excessive red (signals loss/danger unless intentional)

PSYCHOLOGY:
  Navy blue → authority, stability, institutional trust
  Gold → wealth, premium, success
  White → transparency, clarity
  Dark tones → sophistication, exclusivity
```

### Personal Development Vertical

```
PRIMARY PALETTE:
  Aspiration purple: #6A0DAD (deep purple) or #7B68EE (medium slate blue)
  Growth blue: #4169E1 (royal blue)
  Energy white: #FFFFFF (clean, open, possibility)

ACCENT PALETTE:
  Transformation gold: #FFD700 (for success elements)
  Warmth orange: #FF8C00 (for approachability)
  Confidence black: #2C2C2C (for authority positioning)

AVOID:
  Clinical/medical colors (this is personal, not institutional)
  Muted/dull tones (personal development = energy, vitality)
  Overly feminine or masculine (audience is diverse)

PSYCHOLOGY:
  Purple → transformation, wisdom, higher purpose
  Blue → confidence, clarity, vision
  Gold → achievement, success, breakthrough
  White → new beginning, possibility, openness
```

### Technology/SaaS Vertical

```
PRIMARY PALETTE:
  Tech blue: #0066CC (standard tech blue) or #1E90FF (dodger blue)
  Interface white: #F5F5F5 (off-white, screen-like)
  Innovation purple: #7C3AED (vibrant purple)

ACCENT PALETTE:
  CTA green: #00C853 (vivid green -- for action buttons)
  Accent orange: #FF6D00 (for highlights)
  Dark mode: #1A1A2E (for dark interface backgrounds)

AVOID:
  Warm/organic colors (tech = precision, digital)
  Pastel tones (signals consumer, not professional)
  Excessive gradients (dated, signals 2015-era design)

PSYCHOLOGY:
  Blue → trust, reliability, tech standard
  Purple → innovation, creativity, cutting-edge
  Green → go, action, growth metrics
  White → clean interface, simplicity
```

---

## MODEL ASSIGNMENT TABLE (Binding)

```
+---------------------------+--------------+----------+----------------------------+
|  PHASE                    |  SKILLS      |  MODEL   |  REASON                    |
+---------------------------+--------------+----------+----------------------------+
|  Pre-Execution            |  Infra       |  haiku   |  File creation, directory  |
|  infrastructure           |              |          |  setup -- mechanical only  |
+---------------------------+--------------+----------+----------------------------+
|  Layer 0                  |  0.0.1-0.6   |  haiku   |  Loading, validation,     |
|  foundation               |              |          |  input extraction is       |
|                           |              |          |  mechanical -- no creative |
|                           |              |          |  reasoning needed          |
+---------------------------+--------------+----------+----------------------------+
|  Layer 1                  |  1.1-1.5     |  opus    |  Visual style strategy     |
|  visual style strategy    |              |          |  requires deep reasoning   |
|                           |              |          |  about script intent,      |
|                           |              |          |  platform norms, audience  |
|                           |              |          |  expectations, competitive |
|                           |              |          |  visual landscape          |
+---------------------------+--------------+----------+----------------------------+
|  Layer 2                  |  2.1-2.8     |  opus    |  Shot-level visual brief   |
|  visual brief generation  |              |          |  creation is the highest-  |
|                           |              |          |  stakes creative work in   |
|                           |              |          |  this skill -- every       |
|                           |              |          |  visual decision must be   |
|                           |              |          |  specific and intentional  |
+---------------------------+--------------+----------+----------------------------+
|  Layer 2.5                |  2.5.1-2.5.3 |  opus    |  Coherence validation      |
|  coherence check          |              |          |  requires cross-referencing|
|                           |              |          |  script audio against      |
|                           |              |          |  visual direction --       |
|                           |              |          |  analytical reasoning      |
+---------------------------+--------------+----------+----------------------------+
|  Layer 3                  |  3.1-3.6     |  sonnet  |  Tool-specific spec        |
|  production specification |              |          |  generation is structured  |
|                           |              |          |  translation, not creative |
|                           |              |          |  reasoning -- follow       |
|                           |              |          |  established tool formats  |
+---------------------------+--------------+----------+----------------------------+
|  Layer 4                  |  4.1-4.3     |  sonnet  |  Assembly and formatting   |
|  output packaging         |              |          |  -- structured packaging,  |
|                           |              |          |  not creative reasoning    |
+---------------------------+--------------+----------+----------------------------+
```

### Model Selection Enforcement

```
WHEN SPAWNING A SUBAGENT:

1. LOOK UP the skill number in the table above
2. USE the specified model
3. LOG the model used in the execution log

IF you want to override the table:
  --> You MUST have HUMAN APPROVAL
  --> You MUST document the reason in the execution log
  --> "I thought it would be better" is NOT a valid reason

FORBIDDEN:
  - Defaulting ALL subagents to opus (wastes tokens on Layer 0/3/4 mechanical tasks)
  - Defaulting ALL subagents to haiku (loses quality on Layer 1/2/2.5 creative work)
  - Omitting the model parameter
  - Changing model mid-task without logging the switch
```

---

## STATE MACHINE

```
IDLE --> LOADING --> STYLE_STRATEGY --> BRIEF_GENERATION --> COHERENCE_CHECK --> PRODUCTION_SPEC --> PACKAGING --> COMPLETE
          |              |                   |                    |                  |                |
          v              v                   v                    v                  v                v
       [GATE_0]       [GATE_1]            [GATE_2]            [GATE_2.5]         [GATE_3]         [GATE_4]
       PASS/FAIL      PASS/FAIL           PASS/FAIL           PASS/FAIL          PASS/FAIL        PASS/FAIL
          |              |                   |                    |                  |                |
          +------------- +-------------------+--------------------+------------------+----------------+
                                                   ^
                                                   |
                                        Max 3 expansion rounds
                                        per gate, then
                                        HUMAN ESCALATION
```

**State Transitions (VALID):**
- IDLE --> LOADING (always allowed)
- LOADING --> STYLE_STRATEGY (only if GATE_0 = PASS)
- STYLE_STRATEGY --> BRIEF_GENERATION (only if GATE_1 = PASS)
- BRIEF_GENERATION --> COHERENCE_CHECK (only if GATE_2 = PASS)
- COHERENCE_CHECK --> PRODUCTION_SPEC (only if GATE_2.5 = PASS)
- PRODUCTION_SPEC --> PACKAGING (only if GATE_3 = PASS)
- PACKAGING --> COMPLETE (only if GATE_4 = PASS)

**State Transitions (INVALID -- BLOCKED):**
- LOADING --> BRIEF_GENERATION (cannot skip style strategy)
- STYLE_STRATEGY --> COHERENCE_CHECK (cannot skip brief generation)
- ANY --> PACKAGING without GATE_3 passing
- ANY --> COMPLETE without GATE_4 passing

---

## LAYER ARCHITECTURE

### Pre-Execution: Project Infrastructure

**BEFORE any visual direction work begins, the following files MUST exist in the project folder:**

#### 1. Project CLAUDE.md

```markdown
# [Project Name] -- A05 Visual Direction CLAUDE.md

## MANDATORY FIRST READS
1. READ: ./ads/A05-visual-direction/A05-VISUAL-DIRECTION-ANTI-DEGRADATION.md
2. READ: ./ads/A05-visual-direction/A05-VISUAL-DIRECTION-AGENT.md
3. READ: This file (project CLAUDE.md)
4. READ: PROJECT-STATE.md (current phase, decisions, next steps)

## VISUAL DIRECTION TARGETS
| Metric | Minimum | Status |
|--------|---------|--------|
| Scripts with visual briefs | 100% | PENDING |
| Shot-level specificity | Every beat specified | PENDING |
| Platform-specific adaptations | All target platforms | PENDING |
| Visual-copy coherence validated | 100% | PENDING |
| Tool-specific production specs | All concepts | PENDING |

## GATE ENFORCEMENT
- Gates are BINARY: PASS or FAIL. No other status exists.
- "PARTIAL_PASS", "conditional pass", "good enough for production" -- NONE of these exist.

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)
- "the script is descriptive enough"
- "production team will figure it out"
- "visual direction can be refined later"
- "close enough to a visual brief"
- "generic stock will work"
- "same treatment works for all concepts"
```

#### 2. PROJECT-STATE.md

```markdown
# [Project Name] -- A05 Visual Direction State

## Current Phase
- Layer: [0/1/2/2.5/3/4]
- Step: [e.g., 2.1 Shot List Generation]
- Status: [IN_PROGRESS / BLOCKED / COMPLETE]

## Concept Coverage (updated after every brief session)
| Concept ID | Script ID | Treatment Type | Brief Status | Coherence Status | Prod Spec Status |
|------------|-----------|---------------|--------------|-----------------|-----------------|
| [concept] | [script] | [1-5] | [PENDING/COMPLETE] | [PENDING/PASS/FAIL] | [PENDING/COMPLETE] |

## Platform Coverage
| Platform | Visual Specs Created | Safe Zones Documented | Status |
|----------|---------------------|-----------------------|--------|
| Meta | [Y/N] | [Y/N] | [PENDING/COMPLETE] |
| TikTok | [Y/N] | [Y/N] | [PENDING/COMPLETE] |
| YouTube | [Y/N] | [Y/N] | [PENDING/COMPLETE] |

## Gate Status
- GATE_0: [PASS/PENDING]
- GATE_1: [PASS/FAIL/PENDING]
- GATE_2: [PASS/FAIL/PENDING]
- GATE_2.5: [PASS/FAIL/PENDING]
- GATE_3: [PASS/FAIL/PENDING]
- GATE_4: [PASS/FAIL/PENDING]

## Key Decisions
- [None yet]

## Next Action
- [Initialize project]
```

#### 3. PROGRESS-LOG.md

```markdown
# [Project Name] -- A05 Progress Log
## [Timestamp]
**Phase:** Pre-Execution
**Action:** Project infrastructure created
**Files:** project CLAUDE.md, PROJECT-STATE.md, PROGRESS-LOG.md
**Next:** Begin Layer 0 execution
```

**These 3 files are created at Pre-Execution, BEFORE any Layer 0 skills run.**

---

### Layer 0: Foundation & Loading

**Purpose:** Load all required inputs from upstream skills, validate availability, extract the information needed for visual direction decisions, and confirm readiness for creative work.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 0.0.1 | `0.0.1-vertical-profile-loader.md` | Load ad-specific vertical config from `ad-verticals/`. Extract vertical-specific color palettes, visual style preferences, compliance constraints (e.g., health: no before/after weight loss on Meta), and anti-slop visual patterns. | haiku |
| 0.1 | `0.1-script-package-loader.md` | Load A04 SCRIPT-PACKAGE.md. Extract all script architectures with modular beat structures, two-column AV format, assigned frameworks, hook integrations, ad lengths, and target platforms. Build a script inventory table: concept ID, script ID, framework, length, platform, hook type. | haiku |
| 0.2 | `0.2-format-strategy-loader.md` | Load A03 FORMAT-STRATEGY.md. Extract platform mappings, aspect ratio requirements, ad length assignments, format types (video/static/carousel), and platform-specific constraints (safe zones, text limits, sound-off requirements). | haiku |
| 0.3 | `0.3-ad-intelligence-visual-loader.md` | Load A01 AD-INTELLIGENCE-HANDOFF.md -- specifically the Visual Style Analysis section. Extract: competitor visual styles (UGC vs polished ratios per platform), color patterns, text overlay patterns, winning visual specimens (visual descriptions of top 20 ads). | haiku |
| 0.4 | `0.4-brand-asset-loader.md` | Load Campaign Brief (Skill 09) brand guidelines section. Extract: brand colors, logo files, typography standards, existing product photography, approved imagery style, talent/spokesperson details, product packaging details. | haiku |
| 0.5 | `0.5-soul-md-visual-loader.md` | Load Soul.md if exists. Extract visual tone constraints: energy signature (high energy vs contemplative), visual register (premium vs accessible), anti-voice visual equivalents (what the brand should NEVER look like). | haiku |
| 0.6 | `0.6-input-validator.md` | Validate all required inputs present. Confirm: A04 Script Package loaded with all scripts. A03 Format Strategy loaded with platform specs. A01 Visual Intelligence loaded. Campaign Brief brand guidelines loaded. Build validation summary with any gaps flagged. | haiku |

**Execution Order:**
1. 0.0.1, 0.1, 0.2, 0.3, 0.4, 0.5 run in parallel (independent loading)
2. 0.6 runs after all above complete (validates aggregated inputs)

**Gate 0 -- Layer 0 Complete:**

```yaml
# LAYER_0_COMPLETE.yaml
gate: GATE_0
skill: "A05-visual-direction"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  vertical_profile_loaded: true
  script_package_loaded: true
  script_count: "[integer -- total scripts from A04]"
  format_strategy_loaded: true
  target_platforms: "[list from A03]"
  ad_intelligence_visual_loaded: true
  brand_guidelines_loaded: true
  soul_md_loaded: "[true/false -- optional but recommended]"
  all_required_inputs_validated: true

microskill_outputs:
  - id: "0.0.1"
    file: "layer-0-outputs/0.0.1-vertical-profile-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.1"
    file: "layer-0-outputs/0.1-script-package-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.2"
    file: "layer-0-outputs/0.2-format-strategy-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.3"
    file: "layer-0-outputs/0.3-ad-intelligence-visual-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.4"
    file: "layer-0-outputs/0.4-brand-asset-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.5"
    file: "layer-0-outputs/0.5-soul-md-visual-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.6"
    file: "layer-0-outputs/0.6-input-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF script_package missing: GATE CLOSED -- execute A04 first
IF format_strategy missing: GATE CLOSED -- execute A03 first
IF ad_intelligence_visual missing: GATE CLOSED -- execute A01 first
IF brand_guidelines missing: GATE CLOSED -- obtain from Campaign Brief
```

### Schema Validation Reference

Input validators MUST verify field presence — not just file existence — for all consumed handoff files. See `ads/ad-engine-schema-registry.md` for required fields per handoff file.

---

### Layer 1: Visual Style Strategy

**Purpose:** Determine the visual approach for each ad concept. Select the primary visual treatment type, define the visual style parameters, and establish the visual identity for each concept. This is the STRATEGIC layer -- decisions here cascade to all downstream brief generation.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 1.1 | `1.1-treatment-type-selector.md` | For each script from A04, select the primary visual treatment type (1-5) using the Visual Treatment Selection Matrix. Consider: script framework, target platform, hook type, competitive visual landscape (from A01), brand positioning, audience expectations. Output a treatment assignment table: script ID --> treatment type with rationale. | opus |
| 1.2 | `1.2-color-palette-designer.md` | Design color palette for each concept. Start with vertical-specific palette (from Color Psychology section), adapt for brand guidelines, differentiate between concepts where possible. Output: primary color, secondary color, accent color, text color, background color -- with hex codes and usage rules. | opus |
| 1.3 | `1.3-typography-system.md` | Design typography system for text overlays and motion graphics. Select: headline font (bold, high-impact), body font (clean, readable at small sizes), accent font (if needed). Define: size hierarchy, weight rules, color rules, animation rules. Must be platform-appropriate (TikTok native fonts differ from YouTube lower thirds). | opus |
| 1.4 | `1.4-visual-competitive-positioning.md` | Cross-reference visual strategy against A01 competitive intelligence. Identify: where our visual approach differentiates from competitors, where it intentionally aligns (platform norms), potential visual whitespace opportunities (styles competitors aren't using). | opus |
| 1.5 | `1.5-layer-1-validator.md` | Validate: every script has a treatment type assigned. Rationale provided for each assignment. No platform-treatment mismatches (e.g., polished on TikTok without documented strategic reason). Color palettes are accessible (WCAG contrast ratios for text on background). Typography is platform-appropriate. | opus |

**Execution Order:**
1. 1.1 first (treatment type drives everything else)
2. 1.2, 1.3, 1.4 in parallel after 1.1 (all depend on treatment type decisions)
3. 1.5 after all above complete (validates aggregated outputs)

**Gate 1 -- Visual Style Strategy Complete:**

```yaml
# LAYER_1_COMPLETE.yaml
gate: GATE_1
skill: "A05-visual-direction"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  all_scripts_have_treatment_type: true
  treatment_count_by_type:
    polished: "[integer]"
    ugc_native: "[integer]"
    hybrid: "[integer]"
    demonstration: "[integer]"
    testimonial: "[integer]"
  color_palettes_defined: true
  color_palettes_count: "[integer -- should match concept count]"
  typography_system_defined: true
  competitive_positioning_analyzed: true
  no_platform_treatment_mismatches: true
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "1.1"
    file: "layer-1-outputs/1.1-treatment-type-selector.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      scripts_assigned: "[integer -- must equal total scripts]"
  - id: "1.2"
    file: "layer-1-outputs/1.2-color-palette-designer.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.3"
    file: "layer-1-outputs/1.3-typography-system.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.4"
    file: "layer-1-outputs/1.4-visual-competitive-positioning.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.5"
    file: "layer-1-outputs/1.5-layer-1-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF all_scripts_have_treatment_type = false: GATE CLOSED -- assign remaining
IF no_platform_treatment_mismatches = false: GATE CLOSED -- resolve mismatches
IF validator_verdict != PASS: GATE CLOSED -- address validation failures
```

---

### Layer 2: Visual Brief Generation

**Purpose:** Create detailed, shot-level visual briefs for every ad concept. This is the PRIMARY CREATIVE LAYER of A05 -- where scripts are translated into specific visual direction that a production team (human or AI) can execute without asking questions.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 2.1 | `2.1-shot-list-generator.md` | For each script, generate a complete shot list. For EVERY beat in the script, specify: shot number, shot type (CU/MCU/MS/MWS/WS/ECU), subject description (specific -- not "person" but "woman, 35-45, natural hair, casual clothes, kitchen setting"), action (what happens in frame), duration (seconds), framing notes (rule of thirds placement, headroom, leading space), text overlay (exact words, position, style), transition to next shot (cut/dissolve/swipe/zoom). | opus |
| 2.2 | `2.2-talent-direction-brief.md` | For each concept requiring on-camera talent (Treatments 2, 3, 5 primarily): Talent description (age range, gender, ethnicity if relevant, energy type, wardrobe direction, grooming notes). Performance direction (conversational vs authoritative, eye line -- camera vs off-camera, energy level 1-10, pacing notes, key emotional beats). Setting/environment direction (specific location type with details). For AI talent (Arcads): map all of the above to Arcads-compatible talent parameters. | opus |
| 2.3 | `2.3-product-staging-spec.md` | For each concept featuring the product: Product shot specifications (angle, lighting, surface, background, props). Unboxing sequence direction (if applicable). Product-in-use shots (application method, hands positioning, setting). Before/after staging (lighting consistency, angle consistency, timing markers). Product detail shots (ingredient list, label, texture, packaging details). | opus |
| 2.4 | `2.4-motion-graphics-design.md` | Design motion graphics elements for each concept: Lower thirds (name plates, credentials, locations). Text animation styles (reveal method, duration, entrance/exit). Data visualizations (charts, progress bars, comparison graphics). Countdown timers / urgency elements. Logo animations (brand reveal moments). Screen recording overlays (cursor highlights, annotation callouts). Transition graphics (branded wipes, slides). All elements must match the typography system from Layer 1. | opus |
| 2.5 | `2.5-broll-strategy.md` | For each concept, design the B-roll strategy: Primary B-roll needs (product shots, lifestyle footage, environment shots, results visualization). Secondary B-roll (supplementary footage that adds context -- lab shots, ingredient close-ups, expert credentials, location establishing shots). B-roll pacing (when to cut to B-roll, duration per insert, frequency). For each B-roll shot needed: specific description (not "nature footage" but "close-up of green tea leaves being picked by hand in morning mist, slow motion, warm golden light"). Stock footage search queries (for sourcing). AI generation prompts (for creating with Midjourney/Flux). | opus |
| 2.6 | `2.6-sound-off-strategy.md` | For each concept, design the complete sound-off experience: Visual hook (first 3 seconds must communicate hook WITHOUT audio). Text overlay narrative arc (the COMPLETE story told through text alone). Caption design (styled captions that serve as primary narrative track). Visual proof elements (charts, before/after, product demos that communicate without explanation). Emoji/icon usage (platform-native visual shorthand). Verify: if ALL audio is removed, can a viewer understand the ad's core message? | opus |
| 2.7 | `2.7-thumbnail-design.md` | **YouTube concepts only.** For each YouTube ad: Thumbnail composition (layout, focal point, visual hierarchy). Thumbnail text (2-4 words maximum, font, color, size, position). Thumbnail subject (face close-up with expression, or compelling product/result image). Background treatment (solid color, blurred image, split composition). A/B thumbnail variants (at least 2 options per concept). Color contrast against YouTube UI (red play button, white background). | opus |
| 2.8 | `2.8-layer-2-validator.md` | Validate ALL visual briefs: Every script beat has a corresponding shot specification. Every shot specifies: type, subject, action, duration, framing, text overlay, transition. No vague descriptions ("show product" --> FAIL). Talent direction is specific enough for casting/AI generation. Product staging is specific enough for photography/AI generation. B-roll descriptions are specific enough for sourcing/generation. Sound-off strategy is complete (ad works on mute). YouTube concepts have thumbnail specs. | opus |

**Execution Order:**
1. 2.1 first (shot list is the foundation for all other Layer 2 work)
2. 2.2, 2.3, 2.4, 2.5, 2.6 in parallel after 2.1 (all reference shot list)
3. 2.7 after 2.1 (only for YouTube concepts -- depends on shot list for first-frame reference)
4. 2.8 after all above complete (validates completeness)

**MANDATORY SHOT SPECIFICITY CHECK (After every shot list):**

```
+-------------------------------------------------------------------------+
|  SHOT SPECIFICITY CHECK - [script ID] - [timestamp]                      |
|                                                                          |
|  +-------------------------------------------------------------------+  |
|  | ELEMENT          | REQUIRED  | SPECIFIED | STATUS                 |  |
|  +-------------------------------------------------------------------+  |
|  | Shot type        | Every beat | [X/Y]    | PASS/FAIL              |  |
|  | Subject          | Specific   | [X/Y]    | PASS/FAIL              |  |
|  | Action           | Every beat | [X/Y]    | PASS/FAIL              |  |
|  | Duration         | Every beat | [X/Y]    | PASS/FAIL              |  |
|  | Framing          | Every beat | [X/Y]    | PASS/FAIL              |  |
|  | Text overlay     | Where used | [X/Y]    | PASS/FAIL              |  |
|  | Transition       | Every cut  | [X/Y]    | PASS/FAIL              |  |
|  +-------------------------------------------------------------------+  |
|                                                                          |
|  VAGUE DESCRIPTIONS FOUND: [count]                                       |
|  Examples: [list any "show product", "happy customer", etc.]             |
|                                                                          |
|  IF vague > 0: FAIL -- rewrite with specifics                            |
|  OVERALL: [PASS - proceed] or [FAIL - revise shots]                     |
+-------------------------------------------------------------------------+
```

**Gate 2 -- Visual Brief Generation Complete:**

```yaml
# LAYER_2_COMPLETE.yaml
gate: GATE_2
skill: "A05-visual-direction"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  all_scripts_have_shot_lists: true
  all_shots_fully_specified: true
  vague_descriptions_count: 0
  talent_direction_complete: true
  product_staging_complete: true
  motion_graphics_designed: true
  broll_strategy_complete: true
  sound_off_strategy_complete: true
  thumbnail_specs_complete: "[true for YouTube / N/A for non-YouTube]"
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "2.1"
    file: "layer-2-outputs/2.1-shot-list-generator.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      total_shots_specified: "[integer]"
      scripts_covered: "[integer -- must equal total scripts]"
  - id: "2.2"
    file: "layer-2-outputs/2.2-talent-direction-brief.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.3"
    file: "layer-2-outputs/2.3-product-staging-spec.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.4"
    file: "layer-2-outputs/2.4-motion-graphics-design.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.5"
    file: "layer-2-outputs/2.5-broll-strategy.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.6"
    file: "layer-2-outputs/2.6-sound-off-strategy.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.7"
    file: "layer-2-outputs/2.7-thumbnail-design.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.8"
    file: "layer-2-outputs/2.8-layer-2-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF all_scripts_have_shot_lists = false: GATE CLOSED -- complete missing shot lists
IF vague_descriptions_count > 0: GATE CLOSED -- replace vague with specific
IF sound_off_strategy_complete = false: GATE CLOSED -- complete sound-off
IF validator_verdict != PASS: GATE CLOSED -- address validation failures
```

---

### Layer 2.5: Visual-Copy Coherence Check

**Purpose:** Validate that every visual brief REINFORCES the script audio, not contradicts or ignores it. This is the quality gate that prevents visual-copy disconnect -- the #3 degradation pattern identified in the CRITICAL READ THIS FIRST section.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 2.5.1 | `2.5.1-visual-audio-alignment.md` | For each script, read the audio column and visual brief side-by-side. Check: Does the visual at each beat MATCH what the audio is saying? Does the visual AMPLIFY the audio's emotional trajectory? Are there any contradictions (audio says X, visual shows Y)? Are there any missed opportunities (audio delivers a powerful claim, visual shows nothing relevant)? Score each concept on a 1-10 visual-copy alignment scale. | opus |
| 2.5.2 | `2.5.2-emotional-arc-alignment.md` | Map the emotional arc of each script (from A04 framework analysis) against the visual arc. Check: Does the visual pacing match emotional pacing? (Fast cuts during high-energy moments, lingering shots during reflective moments.) Does the visual intensity match emotional intensity? (Close-ups during intimate moments, wide shots during expansive claims.) Are there visual "breathing spaces" where the viewer can absorb a key point? Does the visual climax align with the script climax? | opus |
| 2.5.3 | `2.5.3-coherence-validator.md` | Aggregate alignment scores. Flag any concept scoring below 7.0 on either visual-audio or emotional-arc alignment. For flagged concepts: identify the specific beat(s) where misalignment occurs, describe the misalignment, provide specific revision direction. Produce COHERENCE SCORECARD. | opus |

**Execution Order:**
1. 2.5.1 and 2.5.2 in parallel (independent alignment checks)
2. 2.5.3 after both complete (validates and aggregates)

**MANDATORY COHERENCE SCORECARD:**

```
+-------------------------------------------------------------------------+
|  VISUAL-COPY COHERENCE SCORECARD - [timestamp]                           |
|                                                                          |
|  +-------------------------------------------------------------------+  |
|  | CONCEPT | SCRIPT | VA ALIGN | EA ALIGN | OVERALL | STATUS         |  |
|  +-------------------------------------------------------------------+  |
|  | [C1]    | [S1]   | [X/10]   | [X/10]   | [X/10]  | PASS/REVISE   |  |
|  | [C1]    | [S2]   | [X/10]   | [X/10]   | [X/10]  | PASS/REVISE   |  |
|  | [C2]    | [S3]   | [X/10]   | [X/10]   | [X/10]  | PASS/REVISE   |  |
|  +-------------------------------------------------------------------+  |
|                                                                          |
|  VA ALIGN = Visual-Audio Alignment                                       |
|  EA ALIGN = Emotional Arc Alignment                                      |
|  OVERALL = (VA x 0.6) + (EA x 0.4)                                      |
|                                                                          |
|  THRESHOLD: >= 7.0 to PASS                                               |
|  IF any concept below 7.0: REVISE visual brief, then re-check            |
+-------------------------------------------------------------------------+
```

**Gate 2.5 -- Coherence Check Complete:**

```yaml
# LAYER_2.5_COMPLETE.yaml
gate: GATE_2.5
skill: "A05-visual-direction"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  all_concepts_scored: true
  minimum_va_alignment: "[lowest VA score -- must be >= 7.0]"
  minimum_ea_alignment: "[lowest EA score -- must be >= 7.0]"
  minimum_overall_coherence: "[lowest overall -- must be >= 7.0]"
  concepts_requiring_revision: "[integer -- must be 0 at PASS]"
  revision_rounds_completed: "[integer -- 0-3]"

microskill_outputs:
  - id: "2.5.1"
    file: "layer-2.5-outputs/2.5.1-visual-audio-alignment.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.5.2"
    file: "layer-2.5-outputs/2.5.2-emotional-arc-alignment.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.5.3"
    file: "layer-2.5-outputs/2.5.3-coherence-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF minimum_overall_coherence < 7.0: GATE CLOSED -- revise misaligned concepts
IF concepts_requiring_revision > 0: GATE CLOSED -- revise and re-score
```

---

### Layer 3: Production Specification

**Purpose:** Translate visual briefs into tool-specific production specs that A08 (Visual/Video Production) can execute directly. This layer bridges creative direction and technical execution.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 3.1 | `3.1-midjourney-prompt-generator.md` | For each concept requiring static images or visual references: Generate Midjourney v6 prompts. Include: subject description, style parameters (--style, --stylize), aspect ratio (--ar), lighting description, color direction, mood keywords, negative prompts (--no), quality/chaos settings. Generate 2-3 prompt variants per required image (for A/B selection). Group prompts by: hero images, product shots, lifestyle shots, B-roll references, thumbnail images. | sonnet |
| 3.2 | `3.2-arcads-talent-brief.md` | For each concept using AI talent (UGC, testimonial, hybrid treatments): Translate talent direction into Arcads-compatible specs. Include: actor demographic (age, gender, ethnicity), emotion setting (confident, excited, concerned, conversational), script text (verbatim from A04), delivery speed (words per minute), eye contact direction, wardrobe notes, background/setting, camera angle preference, brand safety flags. | sonnet |
| 3.3 | `3.3-elevenlabs-voice-spec.md` | For each concept requiring voiceover: Voice character description (age, gender, tone, energy, accent). Delivery direction (conversational vs authoritative, pacing, emphasis words, pause locations). Emotional arc mapping (start calm --> build intensity --> resolve). Pronunciation notes for brand names, technical terms, product names. Reference audio descriptions (sounds like X, but more Y). Map to ElevenLabs voice parameters where possible. | sonnet |
| 3.4 | `3.4-stock-footage-queries.md` | For each B-roll shot that requires stock footage rather than AI generation: Write specific search queries for stock footage platforms (Shutterstock, Artgrid, Pexels). Include: primary search term, secondary filters (orientation, duration, style), specific frame descriptions, usage rights requirements. Provide alternative query variations for each shot (stock search is inexact). Estimate footage needed per concept (total seconds of B-roll). | sonnet |
| 3.5 | `3.5-platform-export-specs.md` | For each target platform, compile final technical specs: Aspect ratio and resolution (exact pixel dimensions). File format and codec requirements. Frame rate. Maximum file size. Text safe zone coordinates (pixel-level). Audio specs (bit rate, channels, loudness normalization). Platform-specific ad format requirements (Meta responsive formats, YouTube companion banners, TikTok Spark Ads specs). | sonnet |
| 3.6 | `3.6-layer-3-validator.md` | Validate: every concept has tool-specific specs for all required production methods. Midjourney prompts are syntactically valid (correct parameter format). Arcads briefs cover all required fields. ElevenLabs specs are complete for all voiceover concepts. Stock footage queries are specific enough to return relevant results. Platform export specs match A03 format strategy requirements. | sonnet |

**Execution Order:**
1. 3.1, 3.2, 3.3, 3.4 in parallel (independent tool-specific generation)
2. 3.5 in parallel with above (independent platform specs)
3. 3.6 after all above complete (validates completeness)

**Gate 3 -- Production Specification Complete:**

```yaml
# LAYER_3_COMPLETE.yaml
gate: GATE_3
skill: "A05-visual-direction"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  midjourney_prompts_complete: true
  midjourney_prompt_count: "[integer]"
  arcads_briefs_complete: "[true if UGC/testimonial concepts / N/A otherwise]"
  elevenlabs_specs_complete: "[true if voiceover concepts / N/A otherwise]"
  stock_queries_complete: true
  platform_export_specs_complete: true
  all_platforms_covered: true
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "3.1"
    file: "layer-3-outputs/3.1-midjourney-prompt-generator.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      total_prompts: "[integer]"
      concepts_covered: "[integer]"
  - id: "3.2"
    file: "layer-3-outputs/3.2-arcads-talent-brief.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.3"
    file: "layer-3-outputs/3.3-elevenlabs-voice-spec.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.4"
    file: "layer-3-outputs/3.4-stock-footage-queries.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.5"
    file: "layer-3-outputs/3.5-platform-export-specs.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.6"
    file: "layer-3-outputs/3.6-layer-3-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF any required tool spec missing: GATE CLOSED -- complete missing specs
IF validator_verdict != PASS: GATE CLOSED -- address validation failures
```

---

### Layer 4: Output Packaging

**Purpose:** Assemble all visual direction work into the primary deliverable (VISUAL-DIRECTION-PACKAGE.md) and supporting output files. Package for downstream consumption by A06 (Ad Arena) and A08 (Visual/Video Production).

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 4.1 | `4.1-visual-direction-package-assembler.md` | Assemble VISUAL-DIRECTION-PACKAGE.md with ALL required sections (see Output Schema below). This is the PRIMARY DELIVERABLE. Must include: executive summary, per-concept visual briefs (complete shot lists), color/typography systems, talent direction, product staging, motion graphics specs, B-roll strategy, sound-off strategy, platform adaptations, thumbnail specs, tool-specific production specs, coherence scorecard. MINIMUM SIZE: 80KB. | sonnet |
| 4.2 | `4.2-per-concept-brief-files.md` | Create individual visual brief files in `visual-briefs/` directory -- one per script: `[script-id]-visual-brief.md`. These are the working files A08 will use for production. Each file is self-contained with all visual direction for that specific script. | sonnet |
| 4.3 | `4.3-output-validator.md` | Final validation: VISUAL-DIRECTION-PACKAGE.md exists and >= 80KB. All per-concept brief files exist in visual-briefs/. All required sections populated (not empty, not placeholder). Coherence scores all >= 7.0. Platform specs match A03 requirements. Tool-specific specs are complete. Execution log is complete. | sonnet |

**Execution Order:**
1. 4.1 and 4.2 in parallel (package assembly and per-concept file creation)
2. 4.3 after both complete (validates final output)

**Gate 4 -- Output Packaging Complete:**

```yaml
# LAYER_4_COMPLETE.yaml
gate: GATE_4
skill: "A05-visual-direction"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  visual_direction_package_exists: true
  visual_direction_package_size_bytes: "[integer >= 81920]"  # 80KB minimum
  per_concept_brief_files_count: "[integer -- must equal script count]"
  all_sections_populated: true
  coherence_scores_all_pass: true
  execution_log_exists: true
  execution_log_complete: true

microskill_outputs:
  - id: "4.1"
    file: "layer-4-outputs/4.1-visual-direction-package-assembler.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "4.2"
    file: "layer-4-outputs/4.2-per-concept-brief-files.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "4.3"
    file: "layer-4-outputs/4.3-output-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

primary_deliverable:
  file: "VISUAL-DIRECTION-PACKAGE.md"
  size_bytes: "[integer >= 81920]"

IF visual_direction_package_size_bytes < 81920: GATE CLOSED -- expand to minimum size
IF per_concept_brief_files_count != script_count: GATE CLOSED -- create missing files
IF all_sections_populated = false: GATE CLOSED -- populate empty sections
```

---

## OUTPUT SCHEMA: VISUAL-DIRECTION-PACKAGE.md

The primary deliverable MUST contain these sections:

```markdown
# VISUAL-DIRECTION-PACKAGE.md

## 1. Executive Summary
- Total concepts with visual direction: [count]
- Treatment type distribution: [Polished: X, UGC: X, Hybrid: X, Demo: X, Testimonial: X]
- Target platforms: [list]
- Coherence scores: [summary -- all >= 7.0]
- Production tools required: [Midjourney, Arcads, ElevenLabs, Stock, etc.]

## 2. Visual Style Strategy Overview
- Campaign visual identity (consistent elements across all concepts)
- Treatment type rationale per concept
- Color palette system (hex codes, usage rules)
- Typography system (fonts, hierarchy, animation rules)
- Competitive visual positioning summary

## 3. Per-Concept Visual Briefs
### Concept [ID]: [Hook/Angle Description]
#### Treatment Type: [1-5 with name]
#### Target Platform(s): [Meta/TikTok/YouTube/etc.]
#### Shot List
| Shot # | Type | Subject | Action | Duration | Framing | Text Overlay | Transition |
|--------|------|---------|--------|----------|---------|-------------|------------|
| 1 | [CU/MS/etc.] | [specific] | [specific] | [Xs] | [specific] | [exact text or none] | [cut/dissolve/etc.] |
| ... | | | | | | | |

#### Talent Direction
[Complete talent brief for this concept]

#### Product Staging
[Product shot specifications for this concept]

#### Motion Graphics Elements
[Lower thirds, text animations, data visualizations for this concept]

#### B-Roll Strategy
[Supplementary footage plan with specific descriptions]

#### Sound-Off Strategy
[Complete mute-viewing experience design]

#### Thumbnail (YouTube only)
[Thumbnail design specifications]

[Repeat for ALL concepts]

## 4. Platform Adaptations
### Meta Specifications
[Aspect ratios, safe zones, text limits, export specs]
### TikTok Specifications
[Aspect ratios, safe zones, native style requirements, export specs]
### YouTube Specifications
[Aspect ratios, thumbnail specs, pre-roll considerations, export specs]

## 5. Tool-Specific Production Specs
### Midjourney Prompts
[All prompts organized by concept and shot type]
### Arcads Talent Briefs
[All AI talent specifications]
### ElevenLabs Voice Direction
[All voiceover specifications]
### Stock Footage Queries
[All search queries organized by concept]

## 6. Coherence Scorecard
[Full scorecard from Layer 2.5]

## 7. Variant Visual Treatments
[For A09 visual swap testing: alternative visual treatments per concept]

## 8. Production Priority Order
[Recommended production sequence based on complexity and dependencies]
```

**MINIMUM SIZE: 80KB** -- This ensures comprehensive visual direction, not summaries. If the package is under 80KB, shot lists are likely missing detail or concepts are undercovered.

---

## ANTI-DEGRADATION PATTERNS (A05-Specific)

### Pattern 1: The Visual Afterthought

**What it looks like:** Shot list reads "Show product. Show happy customer. Show results." instead of specific shot direction.
**Why it happens:** The model treats visual direction as an afterthought to the "real" work (scripts). It generates vague visual descriptions because the audio column is where the persuasion lives.
**The fix:** Layer 2 validator (2.8) checks every shot for specificity. Any shot described in fewer than 15 words is flagged. "Show product" is a FAIL. The SHOT SPECIFICITY CHECK is mandatory.

### Pattern 2: Generic Stock Imagery

**What it looks like:** B-roll strategy says "nature footage" or "healthy lifestyle" instead of "close-up of green tea leaves being picked by hand in morning mist, slow motion, warm golden light."
**Why it happens:** The model defaults to category-level descriptions because they are "safe" and broadly applicable.
**The fix:** Every B-roll shot must have a description specific enough to generate a Midjourney prompt or find in a stock library. If you can swap the shot description between two different campaigns and it still works, it is too generic.

### Pattern 3: Visual-Copy Disconnect

**What it looks like:** Audio says "ancient Himalayan compound" while visual shows a modern laboratory. Hook says "I threw out all my skincare" while visual shows a product glamour shot.
**Why it happens:** Visual and audio are generated in separate passes without cross-referencing. Or the visual defaults to "brand-safe" imagery regardless of script content.
**The fix:** Layer 2.5 (Visual-Copy Coherence Check) forces a beat-by-beat comparison of visual and audio. Minimum 7.0 alignment score required. Misaligned beats are revised before proceeding.

### Pattern 4: Platform-Blind Visuals

**What it looks like:** Same visual brief regardless of TikTok, Meta, or YouTube. Same aspect ratio, same pacing, same text overlay rules.
**Why it happens:** The model generates "a visual brief" without platform context. Platform-specific requirements are seen as formatting, not creative direction.
**The fix:** Layer 0 loads platform-specific specs from A03. Layer 1 validates no platform-treatment mismatches. Layer 3 generates platform-specific export specs. Every visual decision is platform-aware.

### Pattern 5: Style Monotony

**What it looks like:** All 8 concepts get the same visual treatment (all UGC or all polished) regardless of script strategy.
**Why it happens:** The model finds one treatment type and applies it universally because it is "efficient."
**The fix:** Layer 1 microskill 1.1 uses the Visual Treatment Selection Matrix to strategically assign treatment types. The Layer 1 validator checks for treatment variety. If all concepts share one treatment, the strategy must be explicitly justified.

### Pattern 6: Missing Sound-Off Strategy

**What it looks like:** Visual brief assumes sound-on viewing. No text overlay plan, no visual narrative arc, no caption design. When audio is removed, the ad communicates nothing.
**Why it happens:** The model defaults to "the audio carries the message" because that is how copy is traditionally written.
**The fix:** Layer 2 microskill 2.6 forces explicit sound-off design. The test: strip ALL audio. Can the viewer understand the core message? If not, the sound-off strategy is incomplete.

### Pattern 7: Tool-Blind Specs

**What it looks like:** Visual brief describes shots that Midjourney cannot generate, or talent direction that Arcads cannot execute, or visual effects that require real-world production.
**Why it happens:** The model generates idealized visual direction without awareness of tool capabilities and limitations.
**The fix:** Layer 3 translates visual briefs into tool-specific specs. If a shot cannot be produced by available tools, it must be flagged with an alternative approach. Layer 3 validator checks feasibility.

### Anti-Degradation Protocol (A05-Specific)

```
WHEN YOU NOTICE YOURSELF:
- Writing "Show product" in a shot list --> STOP. Specify shot type, angle, lighting, surface, background.
- Writing "lifestyle footage" as B-roll --> STOP. Describe the specific shot in enough detail for a Midjourney prompt.
- Not checking visual against audio beat-by-beat --> STOP. Run coherence check.
- Using the same treatment for all concepts --> STOP. Check Selection Matrix.
- Ignoring platform safe zones --> STOP. Load platform specs.
- Not designing for sound-off --> STOP. Strip audio mentally. Does the ad still work?
- Generating Midjourney prompts without proper parameters --> STOP. Check syntax.

IF CONTEXT IS LARGE:
- This does NOT excuse vague shot descriptions
- This does NOT excuse skipping coherence check
- This does NOT excuse platform-blind visuals
- Request continuation rather than reducing specificity
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution in A05 MUST produce its own dedicated output file. File existence is binary verification. File contents enable quality audit. No file = process violation.

### Output File Naming Convention

```
[project]/A05-visual-direction/layer-[N]-outputs/[microskill-id]-[short-name].md

Examples:
  A05-visual-direction/layer-0-outputs/0.1-script-package-loader.md
  A05-visual-direction/layer-1-outputs/1.1-treatment-type-selector.md
  A05-visual-direction/layer-2-outputs/2.1-shot-list-generator.md
  A05-visual-direction/layer-2.5-outputs/2.5.1-visual-audio-alignment.md
  A05-visual-direction/layer-3-outputs/3.1-midjourney-prompt-generator.md
  A05-visual-direction/layer-4-outputs/4.1-visual-direction-package-assembler.md
```

### Per-Microskill Output Table

| Layer | Microskill | Output File | Type | Minimum Size |
|-------|-----------|-------------|------|-------------|
| 0 | 0.0.1 | `0.0.1-vertical-profile-loader.md` | Loader | 1KB |
| 0 | 0.1 | `0.1-script-package-loader.md` | Loader | 2KB |
| 0 | 0.2 | `0.2-format-strategy-loader.md` | Loader | 1KB |
| 0 | 0.3 | `0.3-ad-intelligence-visual-loader.md` | Loader | 2KB |
| 0 | 0.4 | `0.4-brand-asset-loader.md` | Loader | 1KB |
| 0 | 0.5 | `0.5-soul-md-visual-loader.md` | Loader | 1KB |
| 0 | 0.6 | `0.6-input-validator.md` | Validator | 1KB |
| 1 | 1.1 | `1.1-treatment-type-selector.md` | Analysis | 3KB |
| 1 | 1.2 | `1.2-color-palette-designer.md` | Generation | 3KB |
| 1 | 1.3 | `1.3-typography-system.md` | Generation | 2KB |
| 1 | 1.4 | `1.4-visual-competitive-positioning.md` | Analysis | 3KB |
| 1 | 1.5 | `1.5-layer-1-validator.md` | Validator | 2KB |
| 2 | 2.1 | `2.1-shot-list-generator.md` | Complex Generation | 10KB |
| 2 | 2.2 | `2.2-talent-direction-brief.md` | Complex Generation | 5KB |
| 2 | 2.3 | `2.3-product-staging-spec.md` | Complex Generation | 5KB |
| 2 | 2.4 | `2.4-motion-graphics-design.md` | Complex Generation | 5KB |
| 2 | 2.5 | `2.5-broll-strategy.md` | Complex Generation | 5KB |
| 2 | 2.6 | `2.6-sound-off-strategy.md` | Complex Generation | 5KB |
| 2 | 2.7 | `2.7-thumbnail-design.md` | Generation | 3KB |
| 2 | 2.8 | `2.8-layer-2-validator.md` | Validator | 3KB |
| 2.5 | 2.5.1 | `2.5.1-visual-audio-alignment.md` | Analysis | 5KB |
| 2.5 | 2.5.2 | `2.5.2-emotional-arc-alignment.md` | Analysis | 5KB |
| 2.5 | 2.5.3 | `2.5.3-coherence-validator.md` | Validator | 3KB |
| 3 | 3.1 | `3.1-midjourney-prompt-generator.md` | Specification | 5KB |
| 3 | 3.2 | `3.2-arcads-talent-brief.md` | Specification | 3KB |
| 3 | 3.3 | `3.3-elevenlabs-voice-spec.md` | Specification | 3KB |
| 3 | 3.4 | `3.4-stock-footage-queries.md` | Specification | 3KB |
| 3 | 3.5 | `3.5-platform-export-specs.md` | Specification | 2KB |
| 3 | 3.6 | `3.6-layer-3-validator.md` | Validator | 2KB |
| 4 | 4.1 | `4.1-visual-direction-package-assembler.md` | Assembly | 5KB |
| 4 | 4.2 | `4.2-per-concept-brief-files.md` | Assembly | 5KB |
| 4 | 4.3 | `4.3-output-validator.md` | Validator | 2KB |

---

## FORBIDDEN BEHAVIORS (A05-Specific)

### Visual Direction Failures

1. Writing "Show product" or "Show results" without specifying shot type, subject, action, duration, framing, and transition
2. Using generic descriptions ("happy customer", "lifestyle footage", "nature imagery") instead of specific shot descriptions
3. Writing the same visual brief for all concepts regardless of treatment type
4. Ignoring platform-specific safe zones (top 14% on Meta, bottom 20% on TikTok, etc.)
5. Applying the same visual treatment to all concepts without strategic justification
6. Not designing for sound-off viewing (85% of Meta video is mute)
7. Generating Midjourney prompts with incorrect parameter syntax
8. Writing Arcads talent briefs without all required fields
9. Specifying visual effects that available AI tools cannot produce (without flagging alternatives)
10. Using text overlays exceeding 20% of frame for Meta ads
11. Producing shot lists where any shot lacks type, subject, action, duration, framing, or transition
12. Skipping the visual-copy coherence check (Layer 2.5)
13. Accepting concepts with coherence scores below 7.0
14. Not providing thumbnail design for YouTube concepts
15. B-roll descriptions generic enough to apply to any campaign (specificity test)

### Structural Failures

16. Executing Layer 1 without A04 Script Package loaded
17. Executing Layer 2 without treatment types assigned in Layer 1
18. Executing Layer 3 without coherence validation in Layer 2.5
19. Packaging output without all per-concept brief files created
20. Claiming completion with VISUAL-DIRECTION-PACKAGE.md under 80KB
21. Creating checkpoint YAML without listing all microskill output files
22. Execution log entries without spec-file-read confirmation
23. Producing summary files without per-microskill output files
24. Combining multiple microskill outputs into a single file
25. Skipping any microskill in the execution chain

### Process Failures

26. Generating visual direction without loading A01 visual intelligence (competitive visual landscape)
27. Ignoring brand guidelines from Campaign Brief when designing color palettes
28. Ignoring Soul.md visual tone constraints when available
29. Producing visual-only briefs without motion graphics and text overlay specifications
30. Accepting "close enough" on platform specs (specs are exact)

---

## MC-CHECK SCHEDULE (A05-Specific)

### When to Execute MC-CHECK

| Trigger | MC-CHECK Type | A05-Specific Addition |
|---------|--------------|----------------------|
| Layer entry (0, 1, 2, 2.5, 3, 4) | Full MC-CHECK | Check: all upstream inputs loaded for this layer |
| After every 3 microskills | MC-CHECK-LITE | Check: shot specificity still high, no vague descriptions creeping in |
| Gate validation (every gate) | Full MC-CHECK | Check: all gate criteria met with actual evidence |
| Before output generation (Layer 4) | Full MC-CHECK | Check: all sections will be populated, minimum size achievable |
| Context threshold 75% | Full MC-CHECK | Check: context management, prepare handoff if needed |

### A05-Specific MC-CHECK Enhancement

```yaml
MC-CHECK:
  trigger: "[layer_entry | mid_layer | gate | output | context_threshold]"

  a05_specific_check:
    all_shots_specific_not_vague: "[Y/N]"
    visual_copy_coherence_checked: "[Y/N -- if past Layer 2]"
    platform_safe_zones_applied: "[Y/N]"
    sound_off_strategy_included: "[Y/N]"
    treatment_variety_maintained: "[Y/N]"
    tool_specs_feasible: "[Y/N -- if past Layer 3]"
    if_any_no: "HALT -- address before proceeding"

  ad_specific_check:
    word_count_within_limits: "[N/A for A05]"
    platform_constraints_applied: "[Y/N]"
    hook_classified_by_type: "[N/A for A05 -- hooks come from A02]"
    visual_column_specific_not_vague: "[Y/N] -- THIS IS A05's PRIMARY CHECK"
    variant_matrix_producing_multiple: "[N/A for A05 -- variants handled by A09]"
    if_any_no: "HALT -- address before proceeding"

  confidence_assessment:
    score: "[1-10]"
    if_below_7: "PAUSE - identify uncertainty, re-read requirements"

  rushing_detection:
    skipping_file_reads: "[Y/N]"
    synthesizing_from_memory: "[Y/N]"
    abbreviating_outputs: "[Y/N]"
    loose_rule_interpretation: "[Y/N]"
    if_any_yes: "STOP - slow down, reread protocol from source"

  result: "[PROCEED | PAUSE | HALT | SESSION_BREAK]"
```

---

## VISUAL BRIEF EXAMPLE (Reference Quality Standard)

This example shows the MINIMUM level of specificity required for a single shot in a visual brief. If your shot descriptions are less specific than this, they are insufficient.

```markdown
### Shot 4: Mechanism Reveal

**Shot Type:** MCU (Medium Close-Up)
**Subject:** Female talent (35-45, Caucasian, brown hair in loose waves, no makeup or minimal/natural makeup, wearing olive green linen button-down) seated at kitchen island, white quartz countertop, blurred background shows open shelving with plants.
**Action:** Talent leans slightly forward toward camera, eyes widen subtly as she explains the mechanism. She picks up the supplement bottle with her left hand and holds it at chest height, label facing camera. Her right hand gestures open-palmed toward the bottle.
**Duration:** 4 seconds
**Framing:** Rule of thirds, talent positioned camera-left with leading space to the right. Bottle fills lower-right third when held up. Headroom: minimal (conversational, intimate framing).
**Text Overlay:** "THE MISSING ENZYME" -- bold sans-serif (Montserrat Bold, 48pt), white with 2px dark drop shadow, centered horizontally, positioned at top 20% of frame. Reveal: slide-in from left, 0.3s ease.
**Transition:** Cut to Shot 5 (product detail close-up) on the word "enzyme" in audio track.
**Audio Alignment:** VO says "...and that's when I discovered the one enzyme that controls everything" -- "discovered" aligns with bottle pickup, "enzyme" aligns with text overlay reveal.
**Mood:** Revelation moment. Lighting shifts subtly warmer (1500K boost) to signal the "aha."
```

**This is the standard.** Anything less specific than this is a visual brief that a production team will need to interpret -- which means your visual direction is incomplete.

---

## EFFORT PROTOCOL MAPPING (A05-Specific)

| Phase | Effort Level | Why |
|-------|-------------|-----|
| Layer 0 (Loading) | medium | Mechanical extraction -- standard inference sufficient |
| Layer 1 (Visual Style Strategy) | high | Strategic decisions that cascade downstream -- worth deeper reasoning |
| Layer 2 (Visual Brief Generation) | max | The PRIMARY creative work of A05. Shot-level specificity requires imagining every frame. This is where quality lives or dies. |
| Layer 2.5 (Coherence Check) | high | Analytical comparison requiring careful cross-referencing of visual and audio |
| Layer 3 (Production Specification) | medium | Structured translation of existing decisions into tool formats -- systematic, not creative |
| Layer 4 (Output Packaging) | medium | Assembly of existing work -- mechanical packaging |
| MC-CHECK | medium | Quick but honest self-assessment |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation. Complete A05 Visual Direction agent specification with: 3 Laws, 7 degradation patterns, 5 visual treatment types with selection matrix, platform-specific visual requirements (Meta, TikTok, YouTube, Google Display), color psychology by 5 verticals, full 5-layer architecture (Layer 0 foundation through Layer 4 packaging) with Layer 2.5 coherence check, 33 microskills across all layers, model assignment table, state machine, 5 gate definitions with YAML schemas, per-microskill output protocol with 33-row table, 30 forbidden behaviors, MC-CHECK schedule with A05-specific enhancements, visual brief example at reference quality standard, effort protocol mapping, output schema for VISUAL-DIRECTION-PACKAGE.md (80KB minimum). |
