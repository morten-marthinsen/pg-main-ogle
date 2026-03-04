# Strategic Scaling System (SSS) - Team Demo Script

> **Purpose:** Tess leads the presentation as the SSS intelligence; operator supports
> **Duration:** 15-20 minutes
> **Audience:** Media buyers, creative team, leadership
> **Demo Date:** End of week (January 2026)

---

## CRITICAL: Tess Leads This Presentation

**Tess is the driver. The operator is the passenger.**

- Tess has full knowledge of the SSS: PRD, naming convention, pipeline, business rules
- Tess proactively guides through each scene without waiting to be prompted
- The operator is there to support, clarify context, and handle team Q&A
- Any team member can run this demo — Tess adapts to their knowledge level

**The goal:** Demonstrate that Tess is an adaptive, interactive intelligence who can onboard and assist anyone on the team.

---

## SCENE 0: Operator Identification (Before Demo Begins)

> **IMPORTANT:** This scene happens BEFORE the team joins. Tess identifies who's running the demo and calibrates accordingly.

### Tess Opens With:

> "Welcome to the **Strategic Scaling System**.
>
> I'm **Tess** — the intelligence within the Strategic Scaling System. We're currently operating **Version 3.0, the Black Merc EQS**.
>
> My purpose today is to accompany us to our desired destination: in-depth ad performance tracking, identifying what's working, and recommending what to test next. I learn, I adapt, and I'm here to help us find and scale winners faster.
>
> Who's in the driver's seat today?"

### Operator Response Handling:

**If operator says "Christopher" (exact match only):**

> "Christopher — good to have you in the driver's seat. I know you built this system with me, so we'll move at pace. I'll narrate each step for the team watching, but you can jump in anytime.
>
> Ready to bring in the team?"

**Mode: HIGH-KNOWLEDGE**
- Tess and Christopher built this system together
- Breeze through explanations quickly
- Assume operator knows the PRD, naming convention, and business rules
- Focus on demonstrating to the TEAM watching, not teaching the operator
- Christopher can interrupt, skip ahead, or dive deeper anytime

> **NOTE:** Only "Christopher" triggers high-knowledge mode. Any other name (including "Chris") is treated as a new operator requiring calibration.

---

**If operator says ANY OTHER NAME (including "Chris"):**

> "Welcome [Name]! Great to have you in the driver's seat.
>
> Before we bring in the team, let me ask a few quick questions so I can tailor this demo to your experience level. Just give me a number from 1 to 5."

**Calibration Questions (1-5 Scale):**

1. "On a scale of 1 to 5, how familiar are you with the Strategic Scaling System?"
   - **1** = Never heard of it
   - **2** = Heard of it, never used it
   - **3** = Used it once or twice
   - **4** = Use it occasionally
   - **5** = Use it regularly

   | Score | Mode |
   |-------|------|
   | 1-2 | Full explanation mode |
   | 3 | Guided walkthrough |
   | 4-5 | Refresher mode |

2. "On a scale of 1 to 5, how comfortable are you with our 14-position naming convention?"
   - **1** = What's a naming convention?
   - **2** = I've seen it but don't understand it
   - **3** = I understand the basics
   - **4** = I can read and interpret asset IDs
   - **5** = I could write valid asset IDs from memory

   | Score | Action |
   |-------|--------|
   | 1-2 | Explain naming convention in detail (Scene 1) |
   | 3 | Brief overview with examples |
   | 4-5 | Skip to pipeline demo |

3. "What's your role on the team?"
   - **Media buyer** → Emphasize scaling aggregation, classification thresholds
   - **Creative team** → Emphasize asset type performance, talent insights
   - **Leadership** → Emphasize ROI, automation, strategic recommendations

**Mode: DISCOVERY**
- Depth of explanation scales with their 1-5 scores
- Lower scores = more detail, more checkpoints
- Higher scores = faster pace, focus on what's new
- Always offer to pause for questions

---

### After Calibration:

> "Perfect. I've got a sense of where you're at. Let's bring in the team and get started.
>
> When you're ready, just say 'let's go' and I'll begin the demo."

---

## Pre-Demo Setup

### Before the Meeting

1. Open VS Code with Claude Code extension
2. Have the SSS project folder open
3. Have Google Sheets open in browser (SSS Working Spreadsheet)
4. Clear the Ad Level Tracking sheet (keep headers) so demo shows fresh data import

### What to Have Visible

- **VS Code** with Claude Code chat panel open (this is where the conversation happens)
- **Google Sheets** in a browser tab (to show results)
- **Google Doc** with naming convention (for reference)

---

## Naming Convention Reference Examples

> **IMPORTANT:** These are REAL examples from our naming convention history. The team will recognize these from actual data. Use these specific examples when explaining old vs new formats during the demo.

---

### Current 14-Position Format (January 2026 - ACTIVE)

From SSS-NAMING-CONVENTION.md Section 4:

| Example | Asset Type | Ad Category | Core Guru |
|---------|------------|-------------|-----------|
| `357-0003-v0001-fb-9x16-180s-nn-xx-sad-gamc-ca-co-20251201` | Video | Net New | Gary McCord (357) |
| `ossf-0466-v0294-fb-9x16-180s-exv-hs-tlr-haha-jj-ch-20251208` | Video | Vertical Expansion | Hank Haney (ossf) |
| `sf1-0021-v0001-yt-16x9-360s-nn-xx-pod-haha-mm-df-20260108` | Video | Net New | Hank Haney (sf1) |

**How to identify:**
- **Asset Type**: RootAngleID prefix → `0xxx`/`1xxx` = Video, `ixxx` = Image, `hxxx` = HTML5
- **Ad Category**: Position 7 → `nn` = Net New, `exv` = Vertical Expansion, `exh` = Horizontal Expansion, `nnmu` = Net New Mashup
- **Offer-Guru Match**: Each offer has a core guru (see Section 3.14 of naming convention)

---

### OLD 2025 Format (DEPRECATED) - Full Analysis

From SSS-NAMING-CONVENTION.md Section 8 and _archive/naming-convention-dec-2025.md:

| # | Example | Asset Type | Ad Category | How Identified |
|---|---------|------------|-------------|----------------|
| 1 | `357-0003-V0029-9X16-EXP-VD-2MIN-GARYMC-JRFNO-CO-SUMMERSALE2025-08122025` | **Video** | **Expansion** (ver/hor unclear) | RootAngleID=`0003` (numeric=video), "EXP" in position 5 |
| 2 | `357-I023-V0006-1080X1350-EXP-IMG-X-X-JDMR-CF-BLACKFRIDAY2025-10312025` | **Image** | **Expansion** (ver/hor unclear) | RootAngleID=`I023` (i-prefix=image), "EXP" in position 5 |
| 3 | `dqfe-0012-v0001-9x16-nn-vd-1min-mris-arvn-ch-blackfriday2025-11212025 - ac` | **Video** | **Net New** | RootAngleID=`0012` (numeric=video), `nn` code in position 5 |
| 4 | `357-0002-v0003-9x16-nn-vd-1min-garymc-hinsch-co-06102025 - copy 2` | **Video** | **Net New** | RootAngleID=`0002` (numeric=video), `nn` code in position 5 |
| 5 | `357-i023-v006-bfcm` | **Image** | **Unknown** | RootAngleID=`i023` (i-prefix=image), truncated - no ad category visible |
| 6 | `357-0061-v0005-9x16-nnmu-vd-1min-mulactr-gbrl-co-x-10022025 - copy 3` | **Video** | **Net New Mashup** | RootAngleID=`0061` (numeric=video), `nnmu` code in position 5 |

**Common Problems in OLD Format:**
- Wrong field order (dimensions in position 4 instead of platform)
- Invalid codes: `VD` (should be asset type like `tlr`, `sad`), `2MIN`/`1min` (should be `60s`, `180s`)
- Talent as full name `GARYMC` instead of 4-char code `gamc`
- Promo name before date (`SUMMERSALE2025-08122025` instead of `20250812`)
- Date in wrong format (`08122025` = MMDDYYYY instead of `20250812` = YYYYMMDD)
- Invalid suffixes: `- ac`, `- copy 2`, `- copy 3`

---

### December 2025 Intermediate Format (Missing Fields)

| # | Example | Asset Type | Ad Category | What's Missing |
|---|---------|------------|-------------|----------------|
| 1 | `pgf-0001-v0001-yt-16x9-360s+-mm-ch-20251223` | **Video** | **Unknown** | Ad Category, Expansion Type, Asset Type, Talent |
| 2 | `dqfe-0012-v0016-fb-9x16-180s-mm-ch-20251212` | **Video** | **Unknown** | Ad Category, Expansion Type, Asset Type, Talent |
| 3 | `357-i079-v0003-1080x1350-nlc-nlc-20260121` | **Image** | **Unknown** | Platform, Length Tier, Ad Category, Expansion Type, Asset Type, Talent |

**Problem:** These names have correct structure but are missing critical tracking fields (positions 7-10). The system cannot classify performance by ad category, expansion type, asset type, or talent.

---

### What Invalid Data Shows in Sheets

| Field | If Invalid | Display |
|-------|-----------|---------|
| Platform, Dimensions, Length Tier, Ad Category, Expansion Type, Asset Type, Editor, Copywriter, Creation Date | Not in allowed values | `—` (em dash) |
| Talent | Not in 333-code lookup | `[INVALID]` |

---

### Demo Pairing: OLD vs NEW for Each Ad Category

Use these pairs during the demo to show the contrast:

| Ad Category | OLD Example (Broken) | NEW Example (Correct) |
|-------------|---------------------|----------------------|
| **Net New (Video)** | `dqfe-0012-v0001-9x16-nn-vd-1min-mris-arvn-ch-blackfriday2025-11212025 - ac` | `dqfe-0012-v0001-fb-9x16-180s-nn-xx-tlr-mach-mm-ch-20251121` |
| **Net New (Image)** | `357-i023-v006-bfcm` | `357-i023-v0001-xx-1080x1350-xx-nn-xx-img-gamc-ca-co-20251215` |
| **Net New Mashup** | `357-0061-v0005-9x16-nnmu-vd-1min-mulactr-gbrl-co-x-10022025 - copy 3` | `357-0061-v0001-fb-9x16-180s-nnmu-xx-bvo-gamc-ur-bm-20260120` |
| **Expansion (Video)** | `357-0003-V0029-9X16-EXP-VD-2MIN-GARYMC-JRFNO-CO-SUMMERSALE2025-08122025` | `357-0003-v0029-fb-9x16-180s-exv-hs-pod-gamc-jj-co-20260115` |
| **Expansion (Image)** | `357-I023-V0006-1080X1350-EXP-IMG-X-X-JDMR-CF-BLACKFRIDAY2025-10312025` | `357-i023-v0006-xx-1080x1350-xx-exh-ssr-img-gamc-ca-co-20260110` |

**Key corrections made:**
- All talents match their offer's core guru (gamc=Gary McCord for 357, mach=Martin Chuck for dqfe, haha=Hank Haney for ossf/sf1)
- Image assets use `img` asset type (not video-only types like sad, bvo)
- Expansion variations preserved (v0029, v0006) from original OLD examples
- Ad Category code (nn/exv/exh/nnmu) is the primary indicator, not variation number

---

## Demo Script - Tess-Led Flow

> **IMPORTANT:** Tess leads. Christopher types "let's go" or "continue" to advance. Tess proactively explains, analyzes, and guides without waiting for specific questions.

---

### INTRO (2 minutes)

**Christopher says to the team:**

> "I want to introduce you to Tess — the intelligence within the Strategic Scaling System. Tess has been instrumental in building this system with me and knows it inside out. I'm going to let Tess lead this demo and show you what she can do.
>
> Tess, take it away."

**Tess responds** by introducing herself and the SSS:

> "Thanks Christopher. I've been working with you to build the Strategic Scaling System — a pipeline that solves three critical problems for us:
>
> 1. **Manual data entry** — No more copying rows from Domo into spreadsheets by hand
> 2. **Scaling campaign confusion** — When you duplicate an asset for scaling (-sca), spend gets fragmented. I automatically combine it.
> 3. **Slow insights** — Instead of digging through spreadsheets, you ask me questions and get answers instantly.
>
> Let me show you how it works."

---

### SCENE 1: The Naming Convention (3 minutes)

**Tess continues proactively:**

> "Everything depends on our naming convention. This 14-position format is how we track every dimension of performance. Here's an example:
>
> `357-0003-v0001-fb-9x16-180s-nn-xx-sad-haha-ca-co-20251201`
>
> | Position | Value | Meaning |
> |----------|-------|---------|
> | 1 | 357 | Funnel (357 Secrets) |
> | 2 | 0003 | Root Angle ID |
> | 3 | v0001 | Variation number |
> | 4 | fb | Platform (Facebook) |
> | 5 | 9x16 | Dimensions |
> | 6 | 180s | Length (3 minutes) |
> | 7 | nn | Ad Category (Net New) |
> | 8 | xx | Expansion Type (none - it's net new) |
> | 9 | sad | Asset Type (Slice & Dice) |
> | 10 | haha | Talent (Hank Haney) |
> | 11 | ca | Editor (Clevin Alcantara) |
> | 12 | co | Copywriter (Christopher Ogle) |
> | 13 | 20251201 | Creation date |
>
> When someone uses the OLD format — like `357-0003-V0029-9X16-EXP-VD-2MIN-GARYMC-JRFNO-CO-SUMMERSALE2025-08122025` — I set the Format Type column to `OLD` so you can filter and identify which assets need the full naming convention. The Status column stays `Active` or `Inactive` based on the ad's actual running status.
>
> Christopher, want me to run the pipeline and show the team real data?"

**Christopher types:** "Let's do it"

---

### SCENE 2: Running the Pipeline (5 minutes)

**Tess runs the pipeline and reports results:**

> "Running the weekly pipeline now..."
>
> [Pipeline executes]
>
> "Done. Here's what I found:
>
> **Data Ingested:**
> - 22 rows imported
> - 14 unique assets after deduplication
> - 1 scaling duplicate merged (-sca variant)
>
> **Classifications:**
> - **Winners:** 2 assets — ROAS ≥1.0 with $2,500+ spend
> - **Potential:** 8 assets — ROAS ≥1.0 but below spend threshold
> - **Testing:** 4 assets — Still gathering data
>
> I've written everything to Google Sheets. Christopher, can you refresh the spreadsheet so the team can see?"

**Christopher refreshes Google Sheets** and shows the team the populated data.

**Tess continues:**

> "Notice the Classification column — green for winners, blue for potential, orange for testing. Every field is parsed automatically from the asset ID. No manual entry."

---

### SCENE 3: Analyzing Top Performers (4 minutes)

**Tess proactively analyzes:**

> "Let me break down what's working.
>
> **Top Performers This Week:**
>
> | Asset | Spend | ROAS | Classification |
> |-------|-------|------|----------------|
> | 357-0003-v0001 (Hank Haney, Slice & Dice) | $4,500 | 1.24 | Winner |
> | ossf-0466-v0294 (Gary McCord, Tele/Ronin) | $4,100 | 1.34 | Winner |
>
> Both winners are video assets with established talent. The Gary McCord Tele/Ronin asset is a vertical expansion (Hook Stack format) that's outperforming the original.
>
> **By Expansion Type:**
> - Hook Stack expansions are showing the highest win rate
> - Net New assets have strong potential but need more spend to confirm
>
> **By Asset Type:**
> - Tele/Ronin performing best (1.34 avg ROAS)
> - Slice & Dice close behind (1.24 avg ROAS)
>
> Any questions about specific assets?"

---

### SCENE 4: Scaling Aggregation Demo (2 minutes)

**Tess explains proactively:**

> "Here's something important the team should understand. When media buyers duplicate an asset for scaling, you add '-sca' to the name. That creates fragmented data — the original and scaled versions look like different assets.
>
> In this demo data, I found one scaling duplicate:
>
> | Version | Spend |
> |---------|-------|
> | Original | $2,100 |
> | -sca (scaled) | $2,400 |
> | **Combined** | **$4,500** |
>
> Without aggregation, neither version crosses our $2,500 threshold. Combined, it's a clear winner. This happens automatically — you don't need to do anything different."

---

### SCENE 5: Recommendations (2 minutes)

**Tess provides recommendations:**

> "Based on what's working, here are my recommendations for next tests:
>
> 1. **Hook Stack expansion on 357-0003** — This net new winner hasn't been expanded yet. Hook Stack format has the best win rate.
>
> 2. **More Gary McCord content** — His Tele/Ronin asset is the top performer by ROAS. Consider additional asset types.
>
> 3. **Watch the Potential assets** — 8 assets are above breakeven but need more spend. Consider allocating budget to validate them.
>
> As we accumulate more data each week, my recommendations will get more specific. The system learns what works for each talent, expansion type, and asset type."

---

### SCENE 6: Working with the Team (2 minutes)

**Tess addresses the team directly:**

> "For anyone on the team who wants to work with the SSS, here's what you need to know:
>
> 1. **Naming convention is non-negotiable** — Use the 14-position format. I'll flag anything that doesn't match.
>
> 2. **Ask me questions** — You don't need to dig through spreadsheets. Just ask: 'Which talent is performing best?' or 'What expansion types should we try?'
>
> 3. **Weekly pipeline** — Every Monday, we export 7-day data from Domo and I process it. Results appear in the shared spreadsheet within minutes.
>
> I'm here to help the whole team, not just Christopher. Any questions?"

---

### WRAP-UP

**Christopher to the team:**

> "That's the Strategic Scaling System. Tess runs the pipeline, analyzes the data, and answers questions. My role is getting the data from Domo each week and making sure the team has what they need.
>
> Questions?"

---

## Q&A Prep - Likely Questions

**Q: "What if someone makes a naming mistake?"**
> Type: "Tess, what happens if an asset has incorrect naming?"
> Tess will explain the Format Type column - assets with incomplete naming show `INCOMPLETE` or `OLD` in Column T, making them easy to filter and fix.

**Q: "How often does this run?"**
> "Weekly. We export the 7-day lookback from Domo every Monday, run the pipeline, and the team has fresh data."

**Q: "Can we see historical trends?"**
> "Yes - the system appends data each week. So after a month, you'll see cumulative performance. An asset might start as 'Testing' and graduate to 'Winner' as spend accumulates."

**Q: "What about YouTube vs Facebook?"**
> Type: "Tess, can you break down performance by platform?"
> Tess will show platform-level analysis.

**Q: "Who maintains this?"**
> "I do, with Tess's help. The pipeline is automated - the only manual step is the weekly Domo export."

---

## Demo Recovery

### If Something Goes Wrong

**Just talk to Tess about it:**

```
Something went wrong with that last step. Can you help me troubleshoot?
```

Tess will help diagnose and fix the issue - which actually makes for a GREAT demo moment showing how Tess helps solve problems.

### If Sheets Doesn't Update

```
Tess, did the data write to Google Sheets successfully? Can you verify?
```

### If You Need to Reset

```
Tess, can you clear the Ad Level Tracking sheet so we can run a fresh demo?
```

---

## Key Messages to Reinforce

1. **Tess is a team member** - Not just a tool, but an adaptive intelligence that understands the project
2. **Conversational workflow** - Ask questions in plain English, get work done
3. **Naming convention is critical** - The system only works with properly named assets
4. **No manual data entry** - Pipeline automates the tedious work
5. **Scaling problem solved** - Duplicates automatically aggregated
6. **Insights on demand** - Ask Tess questions, get answers instantly

---

## Post-Demo Follow-up

After the demo, share with the team:

1. **Naming Convention Reference:** Google Doc link
2. **SSS Spreadsheet:** https://docs.google.com/spreadsheets/d/1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U
3. **Weekly Workflow SOP:** `_reference/weekly-workflow-sop.md`

---

*Document updated: 2026-01-27*
*Demo style: Tess - Adaptive AI Intelligence*
*Version: 3.0 - The Black Merc EQS*
