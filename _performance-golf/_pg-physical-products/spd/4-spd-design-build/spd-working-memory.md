# SpeedTrac PDP — Working Memory

> **Purpose:** Living process document for the SpeedTrac PDP build. Read this at the start of every session to know where we are and what to do next. Update it at the end of every session.
>
> **Last Updated:** 2026-03-02 — Session 10 (Mobile alignment, spacing, copy fixes across 6 files)

---

## Project Overview

Building a Shopify PDP page for the **SpeedTrac Training System** — a swing trainer with adjustable Y-Trac weighting for Performance Golf.

Two templates share one section map:
- `page.pg-spd-pdp.json` — PDP with product gallery hero
- `page.pg-spd-sales-page.json` — Sales page with benefit stack hero

Only the hero section differs. Sections 0 and 2–20 are identical in both.

**Hard constraint:** Shopify has a **25-section limit per page**. The copy doc defines exactly **20 sections** (including footer). The page must have exactly 20 sections matching the copy doc — no splitting content across multiple sections.

---

## Environment

| Key | Value |
|-----|-------|
| GitHub repo | `Convertibles-dev/performance-golf-prod` |
| Branch | `pg-dev` |
| Shopify store | `performancegolf.myshopify.com` |
| Dev theme ID | `184298766657` (unpublished) |
| Live theme ID | `184630640961` — **NEVER TOUCH** |
| Custom command | `/new-section` — `.claude/commands/new-section.md` |

---

## Where To Find Things

These are the source-of-truth files. Read them directly when you need specific content — don't rely on summaries.

| What | Where |
|------|-------|
| **Copy (exact words for every section)** | `_pg-physical-products/spd/3-spd-copy-sauce/spd-copy-sales-page-pdp.md` |
| **Section mapping (what goes where)** | `_pg-physical-products/spd/4-spd-design-build/spd-section-mapping.md` |
| **Timeline content (14 entries)** | `_pg-physical-products/spd/spd-speed-training-timeline.md` |
| **PDP template (saved section settings)** | `templates/page.pg-spd-pdp.json` |
| **Design system (colors, fonts, patterns)** | See the `/new-section` command or PG-DESIGN-SYSTEM.md at `~/performance-golf/pg-brand/pg-brand-guidelines/PG-DESIGN-SYSTEM.md` |
| **Phase 2 section files to modify** | `sections/pg-pdp-hero-atf.liquid`, `sections/pg-bundle-offer-box.liquid`, `sections/pg-us-vs-them.liquid`, `sections/pg-feature.liquid` |
| **Phase 1 completed sections** | `sections/pg-timeline.liquid`, `sections/pg-interactive-feature.liquid` |
| **Reference sections (proven patterns)** | `sections/pg-feature.liquid`, `sections/pg-expect-timeline.liquid`, `sections/pg-ugc-carousel.liquid` |

**Copy doc key line ranges for Phase 2:**
- Section 1A (Hero ATF): Lines 1-50
- Section 5 (Problem — 2 sub-parts): Lines 175-219
- Section 6 (Consequence — headline + 5 sub-parts): Lines 222-279
- Section 9 (Features & Benefits — 3 sub-features): Lines 326-382
- Section 11 (Countersell — argument + comparison table): Lines 405-449
- Section 14 (Mid-Page CTA): Lines 490-524

---

## Build Phases & Current Status

### Phase 1 — New Sections ✅ COMPLETE
Two new sections built, committed, pushed, and confirmed synced:
1. **PG Timeline** (`pg-timeline.liquid`) — Horizontal scrollable speed training history
2. **PG Interactive Feature** (`pg-interactive-feature.liquid`) — Y-Trac weight position selector with 3 pulsing orbs

### Phase 2 — Modify/Extend Existing Sections ✅ COMPLETE
**4 section files** modified. No settings removed, no functionality deleted.

1. **`pg-pdp-hero-atf`** ✅ — Template JSON updated with SpeedTrac pricing ($249/$199), titles, tagline, CTA, gallery placeholders, FAQs
2. **`pg-bundle-offer-box`** ✅ — Template JSON updated with SpeedTrac pricing, CTA, checklist items
3. **`pg-us-vs-them`** ✅ — Liquid extended with: intro content area (heading, 3 body paragraphs, image), Row 7, ⚠️ warning indicator support, per-cell indicator selects (col2_indicator/col3_indicator) with backward-compatible fallback to sf1_positive boolean. Template JSON populated with SpeedTrac countersell argument + 7-row comparison table.
4. **`pg-feature`** ✅ — (Done in Session 4) Extended with transition headline + blocks 2-5. Template JSON populated with exact copy for all 6 pg-feature sections.

### Phase 3 — Template Assembly ✅ COMPLETE
All **20 sections** wired into `page.pg-spd-pdp.json` matching the copy doc 1:1. Every section populated with SpeedTrac copy from the copy doc. Sections updated:
- Header anchor links (announcements)
- Hero ATF (all SpeedTrac copy + pricing)
- UGC Carousel (heading/subheading)
- 6 pg-feature sections (exact copy from copy doc)
- Timeline (SpeedTrac history)
- Interactive Feature (Y-Trac positions)
- Us vs Them (intro argument + 7-row comparison with ✅/❌/⚠️)
- Expect Timeline (4 SpeedTrac milestones)
- Guru (Chris McGinley SpeedTrac quote)
- Bundle Offer Box (SpeedTrac CTA + pricing)
- Testimonials (6 SpeedTrac reviews)
- Guarantee (SpeedTrac guarantee copy)
- Specifications (15 SpeedTrac spec rows + flex guide)
- Urgency/Final CTA (5 SpeedTrac benefit bullets)
- FAQs (15 SpeedTrac questions)

### Phase 3.5 — Copy Audit Fixes ✅ COMPLETE
4 gaps identified during copy audit, all fixed in one commit (`439dbc8`):
1. **Timeline:** Added 12 missing entries (15 total, was 3). All copy verbatim from copy doc lines 140-168.
2. **Hero ATF sub-CTA:** Added `sub_cta_text` setting + HTML + CSS. Value: "(Because Fast AND Straight Is Better Than Fast OR Straight)"
3. **Bundle Offer Box sub-CTA:** Same pattern. Value: "(Because Hitting Straight AND Long Drives Makes Golf More Fun)"
4. **Guarantee stacked phone:** Added `phone_alt` setting for numeric equivalent displayed below vanity number. Monospace `Courier New` font for character alignment. Vanity line = white, numeric line = gray (#b3aaa3). Backward compatible when `phone_alt` is blank. Value: "1 (800) 741-4653"

### Phase 3.6 — Hero ATF Design Fixes ✅ COMPLETE
8-task plan + 3 rounds of user feedback corrections. Committed `cfa6856`. All synced.

**What was done:**
1. Gallery: scrollable thumbnails with arrow nav, auto-scroll to active on slide change
2. Shaft flex: only Regular + Strong, help text (14px, non-italic, ABC Repro)
3. Checklist: 6 items matching copy doc lines 25-30
4. Savings callout: visible both toggle states, member/non-member labels
5. Urgency: green flashing dot (renamed keyframes to `pg-urgency-dot-pulse` to avoid collision with `pg-urgency.liquid`)
6. Sub-CTA: updated text, tighter spacing, larger font
7. Social proof: emoji stars + title-case text
8. Spec dropdowns: hidden
9. FAQ answers 1-3: updated to match copy doc lines 72-74
10. Mobile: fixed viewport overflow (`minmax(0, 1fr)` + `overflow: hidden`)
11. Introducing pill: centered on mobile only
12. App text space: use `{% %}` not `{%- -%}` to preserve whitespace (Liquid dashes eat spaces)

### Phase 3.7 — Sec 5 & Sec 6 Design Refinements ✅ COMPLETE
Design pass on Sec 5 (Problem) and Sec 6 (Consequence). Committed `99768b9`. All synced.

**Sec 5 (Problem) changes:**
- `heading_full_width: true` — main heading centered above grid
- Font sizes reduced: heading 48→36, heading_mobile 32→26, accent 48→42, accent_mobile 32→28
- Line breaks added to heading_regular and heading_accent via `<br>` tags
- Max-width increased 900→1100px on `.pg-feature__heading-full-width .pg-feature__heading`
- Block_2 ("Science of Speed Sticks"): heading above grid via `block_2_heading_full_width`
- `--block` modifier class added to prevent serif font on block headings (keeps bold sans-serif)
- Block_3 ("ONE FATAL FLAW. TWO BIG PROBLEMS."): promoted from callout to full heading in own block via `block_3_heading_full_width`
- Conditional media rendering for block_3 (`block_3_has_media` check)
- CSS `:only-child` rule for full-width content when no media sibling exists
- `mobile_body_align` setting added (sec5 set to "left")
- `mobile_layout_order: "image_first"` for sec5
- `grid_gap_mobile` increased to 48 for sec5

**Sec 6 (Consequence) changes:**
- Transition headline font sizes reduced: heading 48→36, heading_mobile 32→22
- `mobile_body_align: "left"` added
- Block_3 media_note added (Reason #3 visual)
- Block_4 ("WHAT'S THAT MEAN FOR YOU?"): `block_4_heading_full_width` — regular heading centered above grid, accent stays in content column
- Per-block heading font size: `block_4_heading_font_size: 42`, `block_4_heading_font_size_mobile: 36`
- Per-block accent font size overrides for blocks 4 and 5: `block_4/5_accent_font_size: 32`, mobile: 24 (down from section-wide 48/28)
- CSS uses `.pg-feature__accent--block-4` / `--block-5` modifier classes with double-class specificity
- Mobile spacing: `grid_gap_mobile: 60` (block separator above), full-width wrapper margin-bottom: 40px + accent margin-top 8px = 48px below

**New pg-feature schema settings added:**
- `block_2_heading_full_width`, `block_2_callout_text`, `block_3_heading_full_width`
- `mobile_body_align` (select: center/left)
- `block_4_heading_full_width`, `block_4_heading_font_size`, `block_4_heading_font_size_mobile`
- `block_4_accent_font_size`, `block_4_accent_font_size_mobile`
- `block_5_accent_font_size`, `block_5_accent_font_size_mobile`

### Phase 4 — Design Assets 🔲 NOT STARTED
Images, videos, animations.

---

## 20-Section Page Structure (Copy Doc → Shopify)

This is the definitive section map. Each copy doc section = exactly 1 Shopify section on the page.

| # | Copy Doc Section | Shopify Section File | Phase | Notes |
|---|---|---|---|---|
| 0 | Sticky Nav | `pg-header-anchor-links` | As-is | Nav links + announcement bar |
| 1A | Hero ATF (PDP) | `pg-pdp-hero-atf` | **Phase 2** | Modify settings for SpeedTrac |
| 2 | UGC Carousel | `pg-ugc-carousel` | As-is | Video testimonials |
| 3 | Frame Claim | `pg-feature` | As-is | Single content block |
| 4 | Timeline | `pg-timeline` | **Phase 1 done** | Speed training history |
| 5 | Problem | `pg-feature` (extended) | **Phase 2** | 2 content blocks: Problem + Science |
| 6 | Consequence | `pg-feature` (extended) | **Phase 2** | Transition headline + 5 content blocks: 3 reasons + slice + hook |
| 7 | Mechanism / Solution | `pg-feature` | As-is | Single content block |
| 8 | Y-Trac Interactive | `pg-interactive-feature` | **Phase 1 done** | 3-orb weight selector |
| 9 | Features & Benefits | `pg-feature` (extended) | **Phase 2** | 3 content blocks: Speed Spoon + Stack + Grip |
| 10 | Training System | `pg-feature` | As-is | Single content block |
| 11 | Countersell | `pg-us-vs-them` (extended) | **Phase 2** | Countersell argument intro + comparison table |
| 12 | What to Expect | `pg-expect-timeline` | As-is | Week-by-week results |
| 13 | Expert Credibility | `pg-guru` | As-is | Chris McGinley profile |
| 14 | Mid-Page CTA | `pg-bundle-offer-box` | **Phase 2** | Modify settings for SpeedTrac |
| 15 | Testimonials | `pg-text-testimonials` | As-is | 6 text reviews |
| 16 | Guarantee | `pg-guarantee` | As-is | 365-day guarantee |
| 17 | Specifications | `pg-product-specifications` | As-is | 16 spec rows |
| 18 | Final CTA | `pg-urgency` | As-is | Final CTA block |
| 19 | FAQ | `pg-faqs` | As-is | 15 FAQ items |
| 20 | Footer | Theme footer | Theme-level | Doesn't count toward section limit |

**Total on-page sections: 20** (well under 25 limit)

**Note:** `pg-transition-headline` is NOT used on this page. Section 6's transition headline is handled as a setting within the extended `pg-feature`. The `pg-transition-headline` section file is NOT deleted — it just isn't placed on this page.

---

## Critical Rules

These are non-negotiable. They were established through direct user instruction or painful lessons.

### 1. COPY IS SACRED
Zero modifications to copy. Exact words from the copy doc. No adding, removing, rephrasing, or "improving." This was the single most emphasized constraint in the entire project.

### 2. NEVER REMOVE SETTINGS — ONLY ADD/MODIFY
**Established in Session 3.** These sections are shared across other pages. Removing settings or functionality would break those pages. Only modify existing settings and add new settings. When a page doesn't need the extended content, leave those settings blank and they won't render.

### 3. Schema Defaults vs Saved Template Data
**This caused major frustration TWICE.** Schema defaults only apply when a section is first added. Already-placed sections store values in the template JSON. To update an already-placed section, you MUST edit `templates/page.pg-spd-pdp.json` directly. Handle this proactively — never wait for the user to notice the discrepancy.

### 4. No Co-Authored-By in Commits
Never include `Co-Authored-By: Claude` in any commit message.

### 5. Sync Verification After Every Commit
Confirm local files, GitHub (`pg-dev`), and Shopify theme `184298766657` are all in sync. The user demands this every time.

### 6. Confirm Branch Before Commit
Always verify you're on `pg-dev` before committing.

### 7. Git Pull Before Push
Shopify theme dev auto-syncs to remote. Always `git pull --rebase origin pg-dev` before pushing.

### 8. Explain Process Before Executing
Present the plan and get approval before any major action.

### 9. Confirm Intent Before Major Actions
Don't assume — verify.

### 10. 20-Section Limit Matches Copy Doc
The page must have exactly 20 sections matching the copy doc structure. Shopify has a hard 25-section limit. Never split a copy doc section into multiple Shopify sections — extend the section to hold all sub-content instead.

---

## Phase 1 — What Was Built & Lessons Learned

### PG Timeline

**Summary:** Two-zone section. Zone 1 = white "Did You Know" intro (label, fact, punchline). Zone 2 = dark timeline viewer with CTA, horizontal dot navigation, left/right arrows, background image crossfade per entry. 14 timeline entries as blocks.

**Key decisions made:**
- CTA "Scroll Through The History of Speed Training" lives in Zone 2 (dark), not Zone 1 (white). This took multiple correction attempts.
- Horizontal layout with horizontal dot navigation. Originally built vertically — had to be restructured.
- CSS Grid with `grid-template-rows: auto 1fr auto` and 7% percentage-based spacing (user-approved value). Replaced flexbox with pixel padding that kept oscillating between too high and too low.
- Prev/next year teasers hidden with `opacity: 0` to prevent ghost text.
- Zone 1 simplified to 2 sentences only (was originally 4 text elements).

**Still needed:** 14 background images for timeline entries (Phase 4).

### PG Interactive Feature

**Summary:** Centered single-column layout. Intro copy on top (prehead, headline, body, "How It Works" subhead, CTA instruction). Interactive image viewer with 3 stacked images that crossfade on orb tap. 3 pulsing orb buttons positioned over the image. Position-specific copy beneath.

**Key decisions made:**
- 3-image crossfade, NOT sliding animation. User: "the juice isn't worth the squeeze."
- All orbs must pulse identically — no active state visual differences. Active orb had scale(1.4) and glow, user demanded they be identical.
- Orb labels: "Slice Fix" / "Straight-But-Short Fix" / "Hook Fix" (from copy doc line 313-314). NOT "Heel" / "Center" / "Toe."
- Default state: heel position (Slice Fix).
- min-height on viewer: 250px mobile, 400px desktop (prevents orbs from overlapping content when no images uploaded).
- Font sizes updated in template JSON directly (prehead 18/14, body 20/16) because schema defaults don't propagate.

**Still needed:** 3 Y-Trac product images (heel/center/toe positions), then orb X/Y positions need fine-tuning.

---

## Phase 2 — Detailed Requirements

**Cardinal rule:** No removing settings. Only modify existing and add new. Read the section file, copy doc, and section mapping before starting each section.

### `pg-pdp-hero-atf` (Section 1A — Hero ATF)

**What exists now:**
- Loft multi-select (50°/56°/60°/63°) — customers can select multiple lofts
- Flex selector with 5 options (X-Stiff/Stiff/Regular/Senior/Ladies)
- Hand selector (Right/Left) — already exists
- Pricing logic for multi-wedge bundles (`savings_per_wedge`)
- 10-slot image gallery with video support
- Checklist items reference ONE.1 wedge
- Default prices: $199 non-member / $149 member

**What needs to change (ADD/MODIFY ONLY — no removing):**
- Add new settings for SpeedTrac flex options (Strong/Regular with description lines)
- Add settings for SpeedTrac pricing ($249/$199, savings $50)
- Add settings for SpeedTrac-specific copy (CTA, sub-CTA, checklist, savings callout, urgency)
- Existing Loft settings stay in schema — just leave them blank/unused on SpeedTrac page
- Existing 5-option Flex settings stay — new SpeedTrac flex settings are additive

**Read copy doc lines 1-50 for exact copy.**

### `pg-bundle-offer-box` (Section 14 — Mid-Page CTA)

**What exists now:**
- Hand selector (Right/Left) — already exists
- Loft multi-select (50°/56°/60°/63°)
- Flex selector with 5 options
- Hardcoded checklist items reference ONE.1 wedge
- JS dynamically updates wedge line items based on loft selection
- Default prices: $199/$149

**What needs to change (ADD/MODIFY ONLY — no removing):**
- Add new settings for SpeedTrac flex options (Strong: 250+ yards, Regular: 250 yards or less)
- Add settings for SpeedTrac pricing ($249/$199)
- Add settings for SpeedTrac-specific checklist items (6 items)
- Add settings for SpeedTrac toggle copy, CTA, sub-CTA, review line, trust badges
- Existing Loft settings stay — unused on SpeedTrac page
- Existing flex/pricing settings stay — SpeedTrac settings are additive

**Read copy doc lines 490-524 for exact copy.**

### `pg-us-vs-them` (Section 11 — Countersell)

**What exists now:**
- 3 columns: SF2 Driver / SF1 Driver / Big-Name Drivers
- 6 hardcoded rows per `comparison_chart` block
- CSS classes reference SF2/SF1: `.pg-us-vs-them__th--sf2`, `.pg-us-vs-them__th--sf1`
- Column 1 is always positive (✅), Column 3 is always negative (❌)
- Column 2 has per-row `sf1_positive` toggle for ✅ or ❌
- Only supports ✅ and ❌ indicators — no ⚠️
- No intro/argument content above comparison table

**What needs to change (ADD/MODIFY ONLY — no removing):**
- Add countersell intro content settings above comparison table: heading, body text, image (for Section 11A argument copy)
- Add 7th row to schema and HTML (currently maxes at 6)
- Add ⚠️ (warning/caution) indicator support as a third option
- Add per-cell indicator type setting (✅, ❌, or ⚠️) for columns 2 and 3
- Existing SF2/SF1 CSS classes stay — add new generic classes alongside
- Existing column headers stay as settings — populated differently per page

**Read copy doc lines 405-449 for exact copy (argument + comparison table).**

### `pg-feature` (Sections 3, 5, 6, 7, 9, 10)

**What exists now:**
- Single content block: label, heading (2 lines), body (richtext), image/video, layout toggle
- Used as a workhorse section across many pages

**What needs to change (ADD/MODIFY ONLY — no removing):**
- Add optional **transition headline** settings (headline part 1, headline part 2) — renders above the main content when populated, doesn't render when blank
- Add support for **multiple content blocks** — additional sets of label, heading, body, image/video settings (content_block_2 through content_block_5 at minimum, possibly up to content_block_6 for Section 6)
- Each additional content block renders only when its heading or body is populated — blank = invisible
- All existing single-block functionality stays exactly as-is
- Pages using `pg-feature` with one content block see no change — extra settings are empty and nothing additional renders

**Section-specific usage:**
- **Section 3 (Frame Claim):** 1 block — existing behavior, no extensions needed
- **Section 5 (Problem):** 2 blocks — "The Problem" + "The Science of Speed Sticks"
- **Section 6 (Consequence):** Transition headline + 5 blocks — "3 Reasons..." headline, then Reason #1, #2, #3, Slice Application, Hook Application
- **Section 7 (Mechanism):** 1 block — existing behavior
- **Section 9 (Features & Benefits):** 3 blocks — Speed Spoon + SpeedTrac Stack + Molded Training Grip
- **Section 10 (Training System):** 1 block — existing behavior

**Read copy doc lines 175-279 (Sections 5-6) and 326-382 (Section 9) for exact copy.**

---

## Decision Log

| # | Decision | Reason |
|---|----------|--------|
| 1 | Copy is locked — zero modifications | User: "I've got the copy dialed in...to the exact words" |
| 2 | 2 new sections + 3 modifications needed | Section mapping analysis |
| 3 | `/new-section` custom command created | 4-step workflow for new sections |
| 4 | Timeline: horizontal layout, not vertical | User referenced golfgamebook.com design |
| 5 | Timeline: CTA in Zone 2 (dark), not Zone 1 (white) | Multiple corrections required |
| 6 | Timeline: CSS Grid with 7% spacing | Replaced oscillating flexbox pixel values |
| 7 | Timeline: prev/next year teasers hidden | Caused ghost text |
| 8 | Interactive Feature: crossfade, NOT sliding | User: "juice isn't worth the squeeze" |
| 9 | Interactive Feature: all orbs pulse identically | User demanded no active state differences |
| 10 | Interactive Feature: orb labels from copy doc line 313 | "Slice Fix" / "Straight-But-Short Fix" / "Hook Fix" |
| 11 | No Co-Authored-By in commits | User explicit request |
| 12 | Template JSON must be edited for placed sections | Schema defaults don't propagate (learned twice) |
| 13 | Working memory as mandatory living document | Standing directive in MEMORY.md |
| 14 | Never remove settings — only add/modify | Sections shared across pages; removing breaks other pages |
| 15 | Page must have exactly 20 sections matching copy doc | Shopify 25-section hard limit; copy doc defines 20 sections |
| 16 | `pg-feature` extended with multi-block + transition headline | Consolidates sub-sections into single Shopify sections |
| 17 | `pg-us-vs-them` extended with countersell intro content | Section 11 = argument + comparison in one section |
| 18 | `pg-transition-headline` not used on SpeedTrac page | Headline absorbed into Section 6's extended `pg-feature`; file not deleted |
| 19 | Phase 2 expanded from 3 to 4 section files | Added `pg-feature` for multi-block extension |
| 20 | Thumbnails with scroll arrows, not dot indicators | User wants thumbnails visible but scrollable to not stretch gallery |
| 21 | Grid `minmax(0, 1fr)` for 50/50 layout | Prevents content overflow from wide thumbnails |
| 22 | Urgency bar green theme, not yellow | Yellow bg + green dot + orange pulse looked terrible |
| 23 | Flex help text: non-italic, 14px, ABC Repro | Italic was too hard to read per user |
| 24 | `--block` modifier on full-width block headings | Prevents serif font from applying to content block headings (keeps bold sans-serif) |
| 25 | Per-block accent/heading font size overrides via modifier classes | Section-wide CSS vars affect all elements; blocks 4/5 needed smaller accents without changing transition headline |
| 26 | Soft reset + squash for clean commit messages | User wants authored commits with descriptive messages, not 39 Shopify auto-sync commits |
| 27 | Premium dark card design for charts/tables | Basic HTML tables look like "shitty spreadsheets" — use dark bg (#1d1a1a), rounded corners, accent color columns |
| 28 | Put both heading lines in heading_accent to avoid serif | Full-width heading CSS forces GT Super Text on heading_regular; workaround: put all content in heading_accent with inline color span for dark line |
| 29 | Shopify richtext rejects `<div>` and `style` attrs | Use schema checkbox + CSS class approach for styled containers instead of inline styles in richtext |
| 30 | GT Super Text doesn't render bold visibly | Force `font-family: 'ABC Repro'; font-weight: 700` on `strong` elements inside serif-font containers |
| 31 | Schema type "html" for headings with inline color spans | Richtext strips `style` attributes; "html" type stores raw strings without validation |
| 32 | Mobile-only `<br>` via CSS class toggle | `display: none` default, `display: block` in mobile MQ — cleaner than JS or separate settings |
| 33 | Always use `--allow-empty` for proof-of-work commits | Shopify auto-sync means content is already upstream; empty commits preserve authorship |
| 34 | Verify which HTML element renders visible content before editing CSS | Check template JSON to confirm which setting maps to which DOM element — don't assume from section name |

---

## Error History (Lessons to Not Repeat)

| Error | What Happened | Fix | Impact |
|-------|---------------|-----|--------|
| Schema defaults don't propagate | Changed schema defaults, customizer showed old values | Edit `templates/page.pg-spd-pdp.json` directly | **HIGH** — happened twice, major user frustration |
| CTA in wrong zone | Placed CTA in Zone 1 instead of Zone 2 | Moved HTML from `__dyk-container` to `__content` in Zone 2 | Multiple correction rounds |
| Vertical dots with horizontal arrows | Dots moved vertically, arrows were horizontal | Restructured to horizontal bottom bar | Full layout restructure |
| Dot line position oscillating | Pixel padding kept over/undercorrecting | Switched to CSS Grid + percentage-based spacing | Breakthrough fix |
| Active orb visually different | Active had scale(1.4) + glow effects | Removed all active orb visual overrides | User very frustrated |
| Git push rejected | Remote had Shopify theme dev auto-commits | `git pull --rebase` before push | Happened twice |
| Orb labels wrong | Used "Heel/Center/Toe" instead of copy doc labels | Used "Slice Fix" etc. from line 313 | Copy accuracy issue |
| Font sizes not updating | Changed schema defaults for placed section | Edited template JSON directly | Same root cause as #1 |
| Copy doc line mismatch | User's editor showed different line numbers than Read tool (unsaved changes in user's file) | Always confirm with user if line numbers don't match; user's editor is source of truth | **HIGH** — caused major frustration |
| Margin collapse miscalculation | Reported spacing as additive (48+24=72px) when margins were actually collapsing to max(48,24)=48px. Also missed accent span's 8px margin-top contributing to visual gap. | Account for ALL margin sources: parent/child collapse + inline element margins + line-height padding | Caused confusion about actual spacing values |
| Richtext `<div>` rejected by Shopify | Used `<div>` as top-level tag in richtext field for footnote box | Switch to `<p>` tag — but `style` attribute also rejected, so created CSS class + schema checkbox instead | Two rounds of errors |
| Richtext `style` attribute rejected | Used `style="..."` on `<p>` in richtext field | Created `.pg-feature__text--footnote` CSS class + `body_text_4_footnote` checkbox setting | Learned richtext strips inline styles |
| GT Super Text bold invisible | `<strong>` in us-vs-them intro body didn't render visually bold | Added CSS override forcing ABC Repro 700 on `.pg-us-vs-them__intro-body strong` | User frustrated by claim "it's already bold" |
| Shopify stripped chart settings from JSON | Race condition: Shopify synced JSON before schema definitions were recognized | Force push with all settings intact; Shopify re-synced correctly after | Same root cause as Session 6 race condition |
| Edited wrong CSS element for spacing | Spent 30+ min editing `.pg-us-vs-them__intro-heading` margins when the visible heading was `section_title` in `.pg-us-vs-them__header`. `intro_heading` was blank in JSON. | Added `.pg-us-vs-them__header { margin-bottom: 32px }` in mobile MQ | **HIGH** — user extremely frustrated |
| Rebase dropped commit as "already upstream" | Shopify auto-synced changes created remote commits. `git pull --rebase` saw identical content and dropped local commit. | Use `git commit --allow-empty` to create proof-of-work commit that won't be dropped | **HIGH** — user needs authored commits as proof of work |

---

## User Preferences

- **Copy accuracy is the #1 priority** — any deviation is unacceptable
- **Direct communication style** — uses strong language when frustrated, escalates when same issue recurs
- **Process-first** — wants the plan explained before execution
- **Confirms intent** — "make sure we're on the same page"
- **Pragmatic about scope** — will cut features that aren't worth the effort
- **Sync verification** — demands confirmation after every commit (local + GitHub + Shopify)
- **No Claude attribution** — remove from all commits
- **Persistent context** — created this working memory system to avoid losing context between sessions
- **Values honesty** — prefers transparent risk assessment over false confidence

---

## Pricing Reference

| | Price |
|--|-------|
| Non-Member | $249 |
| PG1 Member | $199 |
| Savings | $50 |
| Shipping | Free for PG1 members |

---

## Current Template Section Order

20 sections matching copy doc 1:1 (Phase 3 COMPLETE):

```
 0. pg_header_anchor_links_Q4YJBP   — Sticky Nav
 1. pg_pdp_hero_atf_NEhaXr          — Hero ATF (PDP) ✅
 2. pg_ugc_carousel_6iYXW9          — UGC Carousel ✅
 3. pg_feature_sec3_frame_claim     — Frame Claim ✅
 4. pg_timeline_Wz6NbN              — Timeline ✅
 5. pg_feature_sec5_problem         — Problem ✅
 6. pg_feature_sec6_consequence     — Consequence ✅
 7. pg_feature_sec7_mechanism       — Mechanism/Solution ✅
 8. pg_interactive_feature_Tdjx8z   — Y-Trac Interactive ✅
 9. pg_feature_sec9_benefits        — Features & Benefits ✅
10. pg_feature_sec10_training       — Training System ✅
11. pg_us_vs_them_sf2               — Countersell ✅
12. pg_expect_timeline_sf2          — What to Expect ✅
13. pg_guru_chris_mcginley          — Expert Credibility ✅
14. pg_bundle_offer_box_NLUp3p      — Mid-Page CTA ✅
15. pg_text_testimonials_bydRWe     — Testimonials ✅
16. pg_guarantee_7388rm             — Guarantee ✅
17. pg_product_specifications_fjLLCa — Specifications ✅
18. pg_urgency_spd                  — Final CTA ✅
19. pg_faqs_FyDNnp                  — FAQ ✅
```

---

## Session Log

### Session 1 (2026-02-28, 3:16 AM - ~5:25 AM)
- Established project: section mapping, custom `/new-section` command
- Built PG Timeline (multiple iterations — zone restructuring, CTA positioning, CSS Grid breakthrough)
- Built PG Interactive Feature (orb pulsing fixes, font size propagation to template JSON)
- Both sections committed, pushed, synced
- Phase 1 complete

### Session 2 (2026-02-28, 7:36 PM - ongoing)
- Created this working memory document
- Updated MEMORY.md with standing directive to read/update this file every session
- Read all 3 Phase 2 section files and copy doc sections for context
- Phase 2 not yet started

### Session 3 (2026-02-28)
- Reviewed working memory and confirmed project status
- **Major scope update:** Phase 2 expanded from 3 to 4 section files
- **New critical rule:** Never remove settings — only add/modify (sections shared across pages)
- **New critical rule:** Page must have exactly 20 sections matching copy doc (Shopify 25-section limit)
- `pg-feature` extended to support transition headline + multiple content blocks (for Sections 5, 6, 9)
- `pg-us-vs-them` extended to include countersell argument intro content above comparison table
- Section 11 (Countersell) consolidated into one section: argument + comparison table in `pg-us-vs-them`
- `pg-transition-headline` not used on SpeedTrac page (headline absorbed into Section 6's `pg-feature`)
- Defined complete 20-section page structure mapping copy doc to Shopify sections
- Updated all Phase 2 requirements to reflect ADD/MODIFY ONLY constraint
- Phase 2 not yet started

### Session 6 (2026-02-28)
- Copy audit fixes — 4 tasks, all completed in one commit (`439dbc8`)
- Timeline: 12 new blocks added (15 total), copy verbatim from copy doc lines 140-168
- Hero ATF: `sub_cta_text` schema + HTML + CSS added
- Bundle Offer Box: `sub_cta_text` schema + HTML + CSS added
- Guarantee: `phone_alt` schema + stacked phone HTML + monospace CSS added
- Confirmed Shopify theme dev syncs both `.liquid` and `.json` files bidirectionally
- Learned: Shopify may strip unrecognized JSON settings if schema hasn't synced yet (race condition) — resolved on re-sync
- Learned: Always `git pull --rebase` before push — Shopify GitHub integration pushes "Update from Shopify" commits to remote
- All 3 layers verified in sync: local, GitHub (`pg-dev`), Shopify theme `184298766657`

### Session 7 (2026-02-28)
- Implemented 8-task Hero ATF fix plan + 3 rounds of user feedback corrections
- Round 1: Initial 8 tasks implemented
- Round 2: 50/50 grid, non-italic flex help, single shipping bullet, blank guarantee meta, green urgency colors, larger sub-CTA, title-case social proof, thumbnail scroll arrows
- Round 3: bullet_training_text word order fix, FAQ answers 1-3 updated to copy doc, app text space fix (Liquid `{%- -%}` was eating spaces — use `{% %}` instead), introducing pill centered mobile only, urgency keyframes renamed to avoid collision, mobile viewport overflow fixed, thumbnail auto-scroll into view on slide change
- Key lesson: `@keyframes` names are global — `pg-urgency.liquid` had `pg-urgency-pulse` with orange that overrode the hero's same-named green keyframes. Renamed to `pg-urgency-dot-pulse`.
- Key lesson: Liquid `{%- -%}` strips ALL adjacent whitespace including intentional spaces. Use `{% %}` when you need to preserve a space.
- Committed as `cfa6856` (empty commit for authorship — Shopify auto-synced the actual changes)
- All 3 layers verified in sync: local, GitHub (`pg-dev`), Shopify theme `184298766657`

### Session 9 (2026-03-01)
- **Sec 9 (Features & Benefits):** Added premium dark-card weight comparison chart between Block 2 (Stack It & Swing It) and Block 3 (Molded Training Grip). 5 rows showing training modes, weights in grams, and comparison to standard driver. Schema: `block_2_show_chart` checkbox + 15 text settings (5 rows × 3 columns). Dark bg (#1d1a1a), rounded corners (16px), accent-colored weight column, 16px headers, 18px data cells.
- **Sec 10 (Training System):** Moved heading above two-column grid via `heading_full_width: true`. Both heading lines placed in `heading_accent` (avoids serif font forced by full-width CSS on `heading_regular`), with inline color span for dark first line. Body copy completely rewritten. Added footnote box for "Included Today" items via `body_text_4_footnote` checkbox + `.pg-feature__text--footnote` CSS class (background: #f5f3f0, border, rounded corners, centered text).
- **Sec 11 (Us vs Them):** Two-tone centered heading: "SPEEDTRAC IS" (black) + "ENGINEERED FOR AMATEURS" (orange) — changed `section_title` schema type from "text" to "html" for inline color spans, bumped font to 40px/56px. Complete body copy rewrite across intro_body_1/2/3. Chart title updated. Fixed bold rendering: GT Super Text doesn't show `<strong>` visibly, added CSS override forcing ABC Repro 700 on strong elements.
- Key lesson: Shopify richtext fields reject `<div>` tags AND `style` attributes. Use CSS class + schema checkbox approach for styled containers.
- Key lesson: Full-width heading CSS forces GT Super Text serif on `heading_regular`. Workaround: put content in `heading_accent` with inline color span for non-accent text.
- Committed as `d36c915` (soft reset + squash of 35 Shopify auto-sync commits into one clean commit)
- All 3 layers verified in sync: local, GitHub (`pg-dev`), Shopify theme `184298766657`

### Session 10 (2026-03-02)
- **Sec 9 (Benefits):** Added `mobile_body_align: "left"` in template JSON — all 4 body sentences left-aligned on mobile.
- **Sec 10 (Training):** Added `mobile_body_align: "left"` + `mobile_body_1_center: true` — body_text_2 left-aligned, body_text_1 stays centered. Updated footnote copy to single sentence: "Instant Access Inside PG1 Training Portal & App Included Today With Your SpeedTrac Swing Trainer." (multiple iterations on copy wording).
- **Sec 11 (Us vs Them):** Reduced mobile spacing between section_title header and image placeholder. Added `.pg-us-vs-them__header { margin-bottom: 32px; }` in mobile media query. **Major debugging saga:** spent 30+ minutes editing the wrong element (`.pg-us-vs-them__intro-heading`) when the visible heading was actually the `section_title` rendered in `.pg-us-vs-them__header`. The `intro_heading` in the JSON was blank.
- **Sec 13 (Guru):** Added mobile-only line breaks in headline using `<br class="pg-guru-mobile-br">` tags. CSS: `display: none` by default, `display: block` at max-width 899px. Result: "35+ Years," / "11 World #1's," / "700,000+ Amateurs" on 3 lines on mobile.
- **Sec 17 (Specifications):** Fixed 480px breakpoint — spec rows stay two-column (`120px 1fr`) instead of stacking to single column. Also fixed compact table (Shaft Flex Guide) to maintain `1fr 1fr` at 480px.
- **Hero ATF:** Changes from prior session (centering headline/tagline on mobile) included in this commit.
- Key lesson: **Section title vs intro heading in us-vs-them** — `section_title` renders in `.pg-us-vs-them__header`, NOT in `.pg-us-vs-them__intro-heading`. When `intro_heading` is blank in JSON, there is no intro heading element. Always verify which HTML element renders the visible content by checking template JSON settings.
- Key lesson: **Shopify auto-sync creates "Update from Shopify" commits** — when `git pull --rebase` detects content is already upstream from Shopify auto-sync, the local commit gets dropped as "patch contents already upstream." Must use `--allow-empty` commit to create proof-of-work commit on top.
- Committed as `d927671` (empty commit for authorship — Shopify auto-synced actual changes)
- All 3 layers verified in sync: local, GitHub (`pg-dev`), Shopify theme `184298766657`

### Session 8 (2026-02-28)
- Design refinement pass on Sec 5 (Problem) and Sec 6 (Consequence)
- **Sec 5:** Full-width headings for main heading + block_2 + block_3. Restructured block_2/block_3 split. Added `--block` modifier to keep sans-serif on block headings. Conditional media rendering. Mobile left-align body text. Mobile image-first layout.
- **Sec 6:** Reduced transition headline sizes. Added block_3 media_note (Reason #3 visual). Block_4 full-width heading with per-block font size overrides (42px desktop, 36px mobile). Per-block accent font size overrides for blocks 4 and 5 (32/24 down from 48/28). Mobile spacing tuned: 60px above block_4, 48px below (40px wrapper + 8px accent margin-top).
- Key lesson: Copy doc line numbers in user's editor may differ from what Read tool sees if user has unsaved changes. This caused significant frustration. Always confirm with user if line numbers don't match.
- Key lesson: Margin collapse — when H2 is inside a div with no padding/border, their bottom margins collapse to `max(parent, child)`. Inline element `margin-top` (e.g., accent span 8px) adds to visual gap even when wrapper margin is explicitly set. Must account for ALL contributors to visual spacing.
- Key lesson: Section-wide CSS variables (e.g., `--pg-feature-accent-size`) affect ALL elements using them. When a section has different sizes for transition headlines vs content block headings, use per-block override classes with double-class specificity (`.pg-feature__heading-accent.pg-feature__accent--block-4`).
- Committed as `99768b9` (soft reset + squash of 39 Shopify auto-sync commits into one clean commit)
- All 3 layers verified in sync: local, GitHub (`pg-dev`), Shopify theme `184298766657`

---

## Transcript Reference

Session 1 full transcript (if deep-dive needed):
`/Users/BenjaminMarcoux/.claude/projects/-Users-BenjaminMarcoux-Documents-performance-golf-performance-golf-prod/7991dc56-44f1-42e5-8239-646b2d0a6e8e.jsonl`
Note: Only lines 1-726 contain conversation. Lines 727-71,537 are a queue operation bug.
