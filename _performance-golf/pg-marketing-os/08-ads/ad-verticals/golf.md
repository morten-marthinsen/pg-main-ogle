# Ad Vertical Profile — Golf / Sports Instruction

**Version:** 1.0
**Created:** 2026-02-23
**Vertical:** golf
**Display Name:** Golf / Sports Instruction Ads

---

## Ad Persona Panel Configuration

The Ad Arena uses these 7 competitors for golf ad projects. Golf audiences are Stage 4-5 sophisticated — they have seen every distance promise, every pro secret, every swing fix. Ads must earn attention through demonstration and credibility, not hype.

| Slot | Persona | Why This Persona for Golf Ads |
|------|---------|-------------------------------|
| 1 | **DR Strategist** | Calibrates offer positioning and CTA strategy for a skeptical, high-sophistication audience that has seen thousands of golf instruction ads. |
| 2 | **Scroll Stopper** | Creates hooks that interrupt the feed without resorting to burned claims. Distance promises and pro secrets need fresh angles to stop Stage 4-5 golfers. |
| 3 | **UGC Native** | Golf testimonials carry massive weight — a real golfer showing score improvement on camera outperforms any polished production. Authentic demonstration is the currency. |
| 4 | **Brand Builder** | Establishes instructor authority and program identity. Golf buyers invest in a teacher, not a product — brand trust drives LTV in this vertical. |
| 5 | **Data Scientist** | Optimizes for golf-specific metrics: hook-through rates on demo content, cost per qualified lead for instruction products, retention on 60-90s demo clips. |
| 6 | **Visual Storyteller** | Crafts transformation narratives — the golfer who went from 95 to 82, the retiree who found his swing again. Visual proof (swing comparison, scorecard) is the gold standard. |
| 7 | **The Architect** | Integration & Synthesis — always present. |

### Critic & Judge
- **Critic:** Standard adversarial role (unchanged)
- **Judge:** Standard scoring role (unchanged)

### Panel Overrides (if any)
No overrides — standard panel. Golf's mix of demo content, testimonial proof, and instructor authority maps well to the default 7-persona panel.

---

## Specimen Directories

```yaml
ad_specimens: "ad-persona-specimens/golf/"
ad_persona_registry: "ad-persona-registry/"
```

---

## Dominant Hook Types

| Hook Type | Description | Why It Works for Golf |
|-----------|-------------|-----------------------|
| Distance Promise | "Add 20+ Yards Without Changing Your Swing" | Golfers obsess over distance — but claims must be specific and qualified at Stage 4-5. |
| Pro Secret | "What Tour Pros Do That Amateurs Never Learn" | Authority gap between amateur and pro creates natural curiosity. Must feel like insider knowledge, not generic instruction. |
| Age-Defier | "How Golfers Over 50 Are Outdriving Their Buddies" | Age-related decline is a deep identity threat. Ads that address it directly earn attention. |
| Equipment Revelation | "The $12 Training Aid That Replaced My Swing Coach" | Golfers spend freely on equipment and gadgets. Affordable solutions with demonstrated results cut through. |
| Demo/Results | "Watch This 18-Handicapper Hit 3 Drives After One Drill" | Showing > telling. Visual demonstration is the highest-trust hook format for golf. |

---

## Script Structure Preferences

| Structure | Duration | When to Use |
|-----------|----------|-------------|
| Demo/Results | 30-90s | Short-form proof — show the drill, show the result, CTA. Highest ROI format for cold traffic. |
| "Secret/Hack" | 60-180s | Mid-funnel education that positions the instructor as authority. Works best with specific, actionable tip. |
| Comparison/Before-After | 30-60s | Side-by-side swing footage or scorecard comparison. Powerful for retargeting warm audiences. |
| Instructor Teaching | 2-5min | YouTube pre-roll and organic hybrid. Full lesson format that sells through demonstrated expertise. |
| Student Transformation | 60-120s | Testimonial format — real golfer tells their story with footage of improvement. |

---

## Platform Preferences

| Platform | Strength for Golf | Format Notes |
|----------|-------------------|--------------|
| YouTube | Primary platform — demo videos, full lessons, instructor authority content | 2-5min pre-roll and organic hybrid. Golf audiences actively search YouTube for instruction. |
| Meta (FB/IG) | Testimonial compilations, before/after, short demo clips | 30-90s maximum. Testimonial carousels and result-focused creatives dominate. |
| Instagram Reels/Stories | Quick tips, single-drill demonstrations | 15-60s. High volume, low production value works. Authenticity beats polish. |
| TikTok | Emerging but younger demographic skews away from core golf buyer | 15-30s trick shots and quick tips. Awareness only — not a primary conversion platform. |

---

## Vertical-Specific Taste Defaults

```yaml
taste_defaults:
  voice_register: "experienced golfer sharing what actually works — range conversation, not lecture hall"
  emotional_range:
    floor: "calm confidence, quiet demonstration"
    ceiling: "fired-up excitement about a visible result"
  anti_voice:
    - "infomercial hype — golfers tune out immediately"
    - "health supplement language — no 'ancient secrets' or 'hidden toxins'"
    - "financial urgency — no countdown timers without real justification"
    - "guru/enlightened tone — golf instruction is practical skill transfer"
    - "corporate polish — authenticity beats production value"
  energy_signature: "confident, results-focused, fellow-golfer, show-don't-tell"
  proof_style: "visual demonstration — swing footage, scorecards, handicap drops, on-course results"
  pacing: "quick hook → demonstrate → result → CTA. No slow builds in short-form. Let the footage do the selling."
```

---

## Vertical-Specific Ad Anti-Slop

```yaml
ad_anti_slop:
  health_contamination:
    - "hidden toxin"
    - "ancient secret"
    - "doctor reveals"
    - "miracle cure"
    - "your body's natural"
  finance_contamination:
    - "wealth secret"
    - "financial freedom"
    - "guaranteed returns"
  guru_contamination:
    - "unlock your potential"
    - "mindset shift"
    - "inner transformation"
    - "manifest your destiny"
  generic_ad_slop:
    - "game-changing"
    - "revolutionary"
    - "one weird trick"
    - "doctors hate this"
    - "you won't believe"
```

---

## Compliance Constraints

Golf has minimal compliance constraints compared to health or finance. Key considerations:

- **Distance claims should cite conditions** — "Added 23 yards (average across 50 students using a launch monitor)" is defensible. "Add 50 yards guaranteed" is not.
- **Instructor credential claims must be verifiable** — PGA certification, years of experience, notable students.
- **Before/after results** — no platform restrictions, but specificity adds credibility. "Dropped from 95 to 82 in 6 weeks" beats "improved dramatically."
- **No platform-specific restrictions** on golf content for Meta, YouTube, or TikTok. Golf is a clean vertical.

---

## Ad Market Context

### Audience Profile
- Serious recreational golfers, 10-25 handicap range (the "improvement zone")
- Male-dominant (75%+), age 35-65, disposable income for instruction and equipment
- Have tried multiple instruction programs — deeply skeptical of magic-fix claims
- Identity tied to their golf game — handicap is personal, improvement is emotional
- Heavy YouTube consumers for golf instruction content

### Ad Market Dynamics
- **Saturation level: HIGH.** Golf instruction ads flood Meta and YouTube. Creative fatigue is rapid — winning creatives burn out in 2-4 weeks.
- **What works:** Demo content showing real results, instructor personality/authority, student testimonials with specifics. Visual proof is king.
- **What doesn't work:** Generic distance promises without demonstration, polished corporate production without personality, claims without visible evidence.
- **Creative refresh cadence:** Every 2-3 weeks. Modular content (same instructor, different drill/tip) extends creative lifespan.
- **Key competitors:** Performance Golf, GolfPass, Me And My Golf, Rick Shiels, various individual instructors on YouTube.

### Proof Architecture (Ad-Specific)
- **Launch monitor data** — Trackman/FlightScope numbers showing ball speed, carry distance, launch angle changes
- **Scorecard footage** — Phone screenshots or physical scorecards showing round improvement
- **Side-by-side swing comparison** — Before/after footage with instructor annotation
- **Student testimonials with specifics** — Name, handicap change, timeframe, specific drill that helped
- **Instructor credentials** — PGA status, tour experience, years teaching, student count
- **On-course footage** — Real rounds, real conditions, real results

---

## Meta Ad Spy Brand Database

Brands from the Meta Ad Spy tool mapped to this vertical. Used by A01 microskill 0.6 (Brand Database Matcher) to determine which brands can use Tool-Assisted Scan mode.

```yaml
meta_ad_spy_brands:
  # Performance Golf ecosystem
  - brand_name: "Performance Golf"
    meta_ad_spy_id: "TBD"  # Populate when tool brand IDs are available
    scrape_frequency: weekly
    impression_data: true
    notes: "Primary client — also competitive intelligence target"

  # Competitor brands (populate from tool's DTC brand list)
  - brand_name: "GolfPass"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  - brand_name: "Me And My Golf"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  - brand_name: "Revolution Golf"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  # PLACEHOLDER: Add remaining golf/sports instruction brands from Meta Ad Spy tool
  # When tool brand list is available, populate brand_name + meta_ad_spy_id
  # Brands not in tool → standard Apify/Firecrawl scraping

brand_mapping_status: "PLACEHOLDER — awaiting tool brand list export"
last_updated: "2026-02-27"
```

**Reference:** `ads/meta-ad-spy-integration.md` for mapping rules and dual-signal scoring protocol.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-27 | Added Meta Ad Spy Brand Database section with placeholder brand mappings for Tool-Assisted Scan mode |
| 1.0 | 2026-02-23 | Initial creation |
