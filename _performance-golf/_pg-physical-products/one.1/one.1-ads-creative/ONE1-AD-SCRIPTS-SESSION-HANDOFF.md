# ONE.1 Ad Scripts Session Handoff

**Created:** January 28, 2026
**Updated:** January 28, 2026 (Session 2)
**Purpose:** Complete context transfer for continuing ONE.1 short-form ad script creation
**Status:** SCRIPTS COMPLETE — Ready for Google Doc insertion

---

## Table of Contents

1. [Session 2 Summary](#session-2-summary)
2. [Completed Deliverables](#completed-deliverables)
3. [Confirmed Settings](#confirmed-settings)
4. [File Locations](#file-locations)
5. [Google Doc Integration Status](#google-doc-integration-status)
6. [Next Steps](#next-steps)
7. [Original Context (From Session 1)](#original-context-from-session-1)

---

## Session 2 Summary

### What Was Accomplished

1. **Read and analyzed Session 1 handoff** — Full context acquired
2. **Confirmed all pending decisions:**
   - Angles: All 3 confirmed (Confidence/Emotion, Problem/Reframe, Any Lie/One Swing)
   - Length: 60 seconds strict
   - Visuals: Include shot directions
   - Proof elements: All three approved
   - Funnel code: `one1`
3. **Quick framework pass** — Analyzed all 3 angles through FATE/PCP frameworks
4. **Wrote all 15 hooks + 3 bodies + 3 CTAs**
5. **Quality validated** — Checked forbidden patterns, banned phrases, proof elements
6. **Reformatted to team template** — Converted to weekly ad script assignments format with:
   - Ad Script column (spoken dialogue only)
   - Shoot Instructions/Editor Notes column (shot directions only)
7. **Attempted Google Docs MCP setup** — Partial success (see below)

---

## Completed Deliverables

### Scripts Location
```
/Users/christopherogle/Documents/The Sauce Vault/_performance-golf/_pg-physical-products/one.1/one.1-ads-creative/one.1-ad-scripts-batch1.md
```

### Script Structure (Per Angle)

Each angle follows the weekly ad script assignments template:

```
## **✎ one1-000X-v0001-v0005**

## **Ad Title / Description (Angle):** [Angle name and core message]

## **Copywriter:** Unknown

## **Aspect Ratio:** Unknown

## **Ad Format:** UGC Demonstration

## **Talent/Guru/Actor Name:** Unknown

|  | Ad Script | Shoot Instructions/Editor Notes |
| ----- | ----- | ----- |
| **Intro 1** | [Hook 1 spoken copy] | [Shot directions] |
| **Intro 2** | [Hook 2 spoken copy] | [Shot directions] |
| **Intro 3** | [Hook 3 spoken copy] | [Shot directions] |
| **Intro 4** | [Hook 4 spoken copy] | [Shot directions] |
| **Intro 5** | [Hook 5 spoken copy] | [Shot directions] |
| **Body** | [Body spoken copy] | [Shot directions] |
|  |  |  |
| **CTA** | [CTA spoken copy] | [Shot directions] |
```

### Summary Table

| Angle | Asset ID | Core Message |
|-------|----------|--------------|
| 1: Confidence/Emotion | one1-0001-v0001-v0005 | "Swing freely—without fear of chunking" |
| 2: Problem/Reframe | one1-0002-v0001-v0005 | "The hidden reason you chunk wedge shots" |
| 3: Any Lie/One Swing | one1-0003-v0001-v0005 | "Same swing from fairway, rough, sand, tight lies" |

**Total:** 15 hook variations + 3 bodies + 3 CTAs

---

## Confirmed Settings

| Setting | Value |
|---------|-------|
| **Angles** | 1: Confidence/Emotion, 2: Problem/Reframe, 3: Any Lie/One Swing |
| **Length** | 60 seconds strict |
| **Visuals** | Include shot directions |
| **Proof Elements** | All three approved (65K sold, 3.2 strokes saved, excessive spin rejection) |
| **Funnel Code** | `one1` |
| **Ad Format** | UGC Demonstration |
| **Platform** | Meta (FB/IG) + Influencer scripts |

---

## File Locations

### Ad Scripts (COMPLETED)
```
/Users/christopherogle/Documents/The Sauce Vault/_performance-golf/_pg-physical-products/one.1/one.1-ads-creative/one.1-ad-scripts-batch1.md
```

### Team Template Reference
```
/Users/christopherogle/Documents/The Sauce Vault/_performance-golf/pg-scaling-acquisition/ads-creative/templates/weekl-ad-script-assignments-template.md
```

### Target Google Doc
```
https://docs.google.com/document/d/1yEzyga9KDyzUBSoQTNCTMg9GSjWCQJF2vXlKxUMgLHw/edit?tab=t.aw6p1lexequv
```

### NeuroCopy Framework
```
/Users/christopherogle/Documents/The Sauce Vault/Cogle Bots/NeuroCopy/
```

### ONE.1 Product Files
```
/Users/christopherogle/Documents/The Sauce Vault/_performance-golf/_pg-physical-products/one.1/
```

---

## Google Doc Integration Status

### What Was Attempted

1. **Tried WebFetch** — Cannot access Google Docs (requires authentication)
2. **Checked existing MCP tools** — Only Google Sheets MCP available, not Google Docs
3. **Installed mcp-google-suite** — Package that supports Docs, Sheets, and Drive
4. **Updated MCP config** — Added google-suite entry to `~/.claude/.mcp.json`
5. **Authentication** — Did not complete (auth flow issue)

### Current MCP Config
```
/Users/christopherogle/.claude/.mcp.json
```

Contains:
- `obsidian` — Working
- `google-sheets` — Working
- `google-suite` — Installed but auth incomplete

### Google Suite MCP Setup (Partial)
```
# Package installed via uvx
uvx mcp-google-suite

# Credentials copied to
~/.google/oauth.keys.json

# Config added to .mcp.json
"google-suite": {
  "command": "uvx",
  "args": ["mcp-google-suite"],
  "env": {
    "GOOGLE_OAUTH_CREDENTIALS": "/Users/christopherogle/.google/oauth.keys.json"
  }
}
```

### To Complete Auth
1. Restart Claude Code to load new MCP config
2. Run: `uvx mcp-google-suite auth`
3. Complete browser authentication flow
4. Test with Google Doc access

---

## Next Steps

### Immediate (Next Session)

1. **Option A: Manual copy-paste** (fastest)
   - Open `one.1-ad-scripts-batch1.md`
   - Copy each angle's table into the Google Doc
   - Fill in Unknown fields (Copywriter, Aspect Ratio, Talent)

2. **Option B: Fix Google Docs MCP**
   - Restart Claude Code
   - Complete `uvx mcp-google-suite auth`
   - Use MCP to insert directly into Google Doc

### Fields to Fill In
- **Copywriter:** [Assign name]
- **Aspect Ratio:** [e.g., 9:16, 4:5]
- **Talent/Guru/Actor Name:** [Assign UGC creator]

### After Insertion
- Review scripts with team
- Make any edits to copy or shot directions
- Assign to production

---

## Original Context (From Session 1)

### Product Overview

**Name:** ONE.1 Wedge
**Category:** Physical product — Wedges / Short Game Equipment
**Launch:** February 16, 2026
**Price Point:** $149 (50% off $299)
**Lofts:** 52°, 56° (hero), 60°

### The Big Idea

**"GLIDE, DON'T DIG."**

The club that does the hard work through the ground for you.

### Core Promise

**"One swing. On the green."**

ONE.1 solves short game struggles by managing ground contact automatically — no technique changes required.

### Target Audience

| Attribute | Details |
|-----------|---------|
| Gender | Male and female |
| Age | 40-70 years old |
| Handicap | 12-28 |
| Rounds/Year | 15-30 |
| Mindset | Frustrated by short game despite practice/lessons |
| Psychology | Skeptical of gimmicks but desperate for credible proof |

### ONE Wedge Technology (5 Features)

| Feature | Benefit |
|---------|---------|
| **Auto Glide Sole** | Four-way cambered shape that increases surface area, reduces digging, maintains momentum through turf/sand |
| **Pitch Control Weighting** | Heavy sole wing + high toe weight stabilizes off-center contact, preserves ball speed |
| **Square & Shoot Alignment** | Straight leading edge + center-face marks make squaring simple |
| **Spin-Friction Face** | Traditional grooves + laser-etched texture for friction on partial swings |
| **Motion Swing Weighted** | Stepless steel shaft + 40g counterweight reduces flipping/deceleration |

### Proof Elements (Verified & Approved for Use)

| Proof Type | Details |
|------------|---------|
| **Credentials** | Martin Chuck: 150,000+ lessons, 40-year career, Golf Digest Top 7 Teacher |
| **Engineering** | Chris McGinley: 25+ years designing for Tiger, Rory, Spieth |
| **Volume** | 65,000+ Version 1 wedges sold |
| **Results** | Beta testing: 3.2 strokes saved per round (50+ golfers) |
| **Validation** | Face design initially rejected by Rules of Golf for "excessive spin" |
| **Guarantee** | 365-day full refund, return shipping covered |

### Copy Constraints (Must Follow)

**Forbidden Patterns:**
- No overhype ("CRUSH 50 YARDS!!!")
- No tech jargon ("AI-powered ML algorithms")
- No golf cliches ("take your game to the next level")
- No promising perfection (progress, not perfection)
- No vague emotions ("not happy with your game" → "frustrated walk back to the cart")
- No adjective overload

**Banned Phrases:**
- "Are you tired of..."
- "What if I told you..."
- "Imagine if..."
- "Take your game to the next level"
- "Unlock your potential"
- "Game-changer"
- "Revolutionary"
- "Best-kept secret"

### Video Ad Concepts (from Campaign Deck)

| Concept | Description | Mapped Angle |
|---------|-------------|--------------|
| "THE CHUNK TEST" | Side-by-side: Traditional wedge vs ONE.1 from challenging lies | Angle 2: Problem/Reframe |
| "FEAR TO FREEDOM" | Golfer's emotional journey. From tension to confident swings | Angle 1: Confidence/Emotion |
| "ONE SWING, ANY LIE" | Same golfer, same swing—fairway, rough, sand, tight lie | Angle 3: Any Lie/One Swing |

---

## Session Metadata

**Session 1 Date:** January 28, 2026
**Session 2 Date:** January 28, 2026
**Context Window:** Session 2 reached limit
**Phase Completed:** Phase 4 (Output Generation)
**Scripts Status:** COMPLETE — saved to `one.1-ad-scripts-batch1.md`
**Next Action:** Insert scripts into team Google Doc (manual or via MCP)

---

*This document contains complete context for continuing the ONE.1 ad script project. Load this file at the start of the next session to resume exactly where we left off.*
