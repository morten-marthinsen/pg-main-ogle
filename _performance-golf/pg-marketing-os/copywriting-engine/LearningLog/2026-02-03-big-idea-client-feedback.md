# Learning Log: Big Idea Skill Client Feedback
**Date:** 2026-02-03
**Skill:** 05-big-ideas
**Project:** UpWellness Ultra Liver

---

## FEEDBACK RECEIVED

### Learning #59: Big Idea Names Should Include Category Context — "The Missing Detox Phase" Not "The Missing Phase"

**What Happened:**
The 05-Big-Ideas pipeline generated the winning Big Idea as "The Missing Phase." Client revised to "The Missing Detox Phase" — adding "Detox" to anchor the Big Idea within the category the prospect already recognizes and is skeptical about.

**Why It Was Wrong:**
- "The Missing Phase" is too general — a prospect doesn't instantly know WHICH phase of WHAT
- "The Missing Detox Phase" immediately tells the prospect: this is about detox, which they already have a mental category for
- Adding "Detox" actually LEVERAGES skepticism: the prospect thinks "detox is BS" but the Big Idea says "you're right — they skipped the most important phase." It plays INTO the skepticism rather than fighting it
- The category word ("Detox") creates a hook for the countersell: "none of the detox gurus, influencers, or supplement companies" — it names the world the prospect already lives in
- Generic Big Idea names lose the emotional connection to the market the prospect is already frustrated with

**Why "Detox" Works Despite Skepticism:**
- The Big Idea doesn't defend detox — it reframes it: "There IS a real detox process, but everyone's been skipping the most important step"
- It positions the prospect's existing skepticism as CORRECT: "You were right to doubt those detox products — they were all incomplete"
- The word "Detox" in the name is a trojan horse — it brings the prospect into familiar territory, then reveals what nobody told them
- The countersell becomes: none of the detox influencers, supplement companies, or "liver cleanse" products include Phase 3

**Rule Established:**
> **MANDATORY:** Big Idea names must include the category/niche word that the prospect already identifies with, even (especially) if there's skepticism in that category. Pattern: "The [Adjective] [Category Word] [Concept]" — e.g., "The Missing DETOX Phase" not "The Missing Phase." The category word anchors the Big Idea in the prospect's existing mental model and creates leverage for the countersell. Generic Big Idea names lose emotional connection.

**Implementation:**
- Big Idea naming generator (2.2) should always test category-anchored vs. generic versions
- Category word inclusion should be a scoring dimension in the validation layer
- If the category has skepticism, the Big Idea brief should document how the category word leverages that skepticism

---

## REVISED BIG IDEA

**Before:** "The Missing Phase"
**After:** "The Missing Detox Phase"

**What changed:**
1. Added "Detox" — anchors Big Idea in the prospect's existing mental category
2. Leverages existing detox skepticism as a feature, not a bug
3. Creates natural countersell territory: "detox gurus," "detox industry," "detox supplements"

---

## FILES UPDATED

1. `05-big-ideas/outputs/big-idea-package.yaml` — 12 replacements
2. `05-big-ideas/outputs/BIG-IDEA-BRIEF.md` — 8 replacements
3. `05-big-ideas/outputs/execution-log.md` — 14 replacements

---

*Learning log entry for Big Idea skill improvement — Ultra Liver project*
