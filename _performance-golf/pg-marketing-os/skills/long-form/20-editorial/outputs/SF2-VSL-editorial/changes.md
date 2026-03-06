# SF2 VSL — Change Tracking Document
## Line-by-Line Editorial Changes

**Format Key:**
- ~~Strikethrough~~ = Original text (deleted/replaced)
- **[NEW]** = New text added
- **[CHANGED]** = Modified text
- **[REJECTED]** = Change that was rejected by client

---

## CHANGE LOG

### Line 10 — Opening Sentence
**Location:** First line after "Hank Haney Intro:"

~~What if I told you…~~

**[CHANGED]** The CIA spent 10 years and $34 million to master a single metal.

**Reason:** "What if I told you" is a recognized AI slop pattern. Replaced with specific, intriguing fact that ties to SR-71 narrative.

---

### Line 32 — "Absolutely" Removal
**Location:** Description of SR-71

~~It was absolutely untouchable.~~

**[CHANGED]** It was untouchable. Period.

**Reason:** "Absolutely" is a filler word that weakens rather than strengthens. "Period." adds punch.

---

### Lines 159-167 — Duplicate Paragraph Removal (MISSED IN ORIGINAL EDIT)
**Location:** Root cause introduction ("real problem" section)

**ORIGINAL (DUPLICATE):**
> That said, the real problem though…
>
> And the thing nobody really talks about…
>
> Is what's happening with the toe of the club through impact.
>
> If it's open by even a couple degrees, the ball starts right and curves further right. That's your slice.
>
> The real problem though… and the thing nobody really talks about… is what's happening with the toe of the club through impact.

**[CHANGED]:**
> That said, the real problem though… and the thing nobody really talks about… is what's happening with the toe of the club through impact.
>
> If it's open by even a couple degrees, the ball starts right and curves further right. That's your slice.

**Reason:** Original source file contained duplicate content (likely from Google Docs track changes export). Condensed to single occurrence.

**Note:** This duplicate was caught in post-editorial QA (Learning #51). Duplicate detection should be part of Layer 1 source validation.

---

### Lines 170-178 — REJECTED CHANGE
**Location:** Toe lag introduction

**ORIGINAL (KEEP):**
> This is what we call "toe lag."
>
> It's not anything new by any means…

**[REJECTED]** ~~This is what we call "toe lag" — or as I've come to call it, the **Hidden Slice Trigger**.~~

**Client Decision:** Keep original "toe lag" terminology. Do not rebrand as "Hidden Slice Trigger."

**Note:** All subsequent references to "Hidden Slice Trigger" should revert to "toe lag."

---

### Lines 175-177 — Door Metaphor Insertion (FIRST INSTANCE)
**Location:** Immediately after "This is what we call 'toe lag.'"

**ORIGINAL:** (No metaphor — went directly to "It's not anything new by any means…")

**[NEW]:**
> It's like a door with rusty hinges. Push on the handle, and the door fights you the whole way. Your clubface is that stuck door — physics won't let it close in time.

**Reason:** Added metaphor to make "toe lag" concept immediately tangible. This is the FIRST introduction of the door metaphor that is then called back later (lines 292-295 and 411-415).

**Classification:** APPLY-WITH-NOTE (new explanatory content — requires client awareness)

---

### Lines 188-189 — REJECTED CHANGE
**Location:** Partnership goal statement

**ORIGINAL (KEEP):**
> With one goal: **Fix toe lag and conquer it completely.**

**[REJECTED]** ~~With one goal: **Fix the Hidden Slice Trigger and conquer it completely.**~~

**Client Decision:** Revert to "toe lag"

---

### Lines 196-206 — Duplicate Paragraph Removal
**Location:** After SF1 introduction

**ORIGINAL:**
> That's why weWe called it SliceFix Technology™.
>
> And when we stacked all of these features together in the SF1 driver… which is the first club to ever do this…
>
> It worked.
>
> I mean, it **really** worked.
>
> And the SF1 driver… the first club to ever stack all of these SliceFix Technology features together… it worked.
>
> I mean, it really worked.

**[CHANGED]:**
> That's why we called it SliceFix Technology.
>
> And when we stacked all of these features together in the SF1 driver… which is the first club to ever do this…
>
> It worked. Thousands of chronic slicers started hitting draws.

**Changes Made:**
1. Fixed "weWe" typo → "we"
2. Removed trademark symbol (™) for cleaner read
3. Deleted duplicate paragraph (lines 204-206)
4. Removed "really" (filler word)
5. Combined with next sentence for flow

---

### Line 230 — "Incredible" Replacement
**Location:** Description of carbon fiber

~~Incredible for fixing toe lag… lightweight… and easy to close.~~

**[CHANGED]** Great for fixing toe lag… lightweight… and easy to close.

**Reason:** "Incredible" is generic superlative. "Great" is more natural in context.

---

### Line 248 — "Absolutely" Removal
**Location:** Cold War description

~~…and absolutely superior during the height of the Cold War…~~

**[CHANGED]** …and superior during the height of the Cold War…

**Reason:** Filler word removal.

---

### Lines 274-275 — "Magical" Replacement
**Location:** Three things that happen

~~Three magical things happen.~~

**[CHANGED]** Three things happen.

**Reason:** "Magical" is vague and slop-adjacent. The specifics that follow provide the impact.

---

### Lines 292-295 — Door Metaphor Addition (REVISED)
**Location:** After discretionary weight explanation

**ORIGINAL:** (No metaphor)

**[NEW — REVISED per client feedback 2026-02-02]:**
> This isn't just oiling rusty door hinges. This is replacing them with aerospace-grade titanium — the same material that made the SR-71 untouchable. That same push now swings the door shut effortlessly. That's what the SF2's weight distribution does to your clubface.

**Revision Note:** Updated to thread back to the SR-71/aerospace-grade titanium narrative from the opening. "Replacing hinges" > "oiling hinges" — transformation instead of maintenance. Callbacks create cohesion.

---

### Lines 411-415 — Door Metaphor Continuation (REVISED)
**Location:** Toe slot + keel explanation

**ORIGINAL:**
> To put this into perspective…

**[NEW — REVISED per client feedback 2026-02-02]:**
> To put this into perspective…
>
> Remember those aerospace-grade titanium hinges?
>
> Now imagine reducing the friction even more AND pushing harder on the handle. That door doesn't just close — it slams shut. Same principle here.

**Revision Note:** Updated to callback to "aerospace-grade titanium hinges" from the first metaphor. "Slams shut" > "closes faster" — stronger verb for the payoff. Creates closed loop between the two metaphor instances.

---

### Lines 420-421 — "Truly Incredible" Replacement
**Location:** Crown description

~~But what's truly incredible is that we have airflow moving over the entire clubhead as you swing.~~

**[CHANGED]** But what's truly remarkable is that we have airflow moving over the entire clubhead as you swing.

**Reason:** "Incredible" → "remarkable" — slightly more specific.

---

### Lines 490-493 — Slop Replacement
**Location:** After mishit explanation

~~Incredible, right?~~
~~Personally, if you ask me… it's revolutionary…~~

**[CHANGED]** This is what separates the SF2 from everything else on the market.

**Reason:** Removed generic superlatives, replaced with positioning statement.

---

### Line 604 — "Revolutionize" Replacement
**Location:** Value proposition

~~I'd say it would completely revolutionize it.~~

**[CHANGED]** I'd say it would completely transform it.

**Reason:** "Revolutionize" is overused in marketing copy.

---

### Lines 704, 712, 716, 745, 841 — Price Formatting
**Location:** All price mentions

~~$24999~~

**[CHANGED]** $249.99

**Reason:** Missing decimal point — critical error that would confuse customers.

---

### Line 703 — "Absolutely Nothing" Replacement
**Location:** Risk statement

~~You risk absolutely nothing…~~

**[CHANGED]** You risk nothing…

**Reason:** "Absolutely" is filler.

---

### Lines 751-752 — CTA Variation #1
**Location:** First CTA after urgency

**ORIGINAL:**
> Then I'd highly encourage you to click the order button below to claim yours immediately.

**[CHANGED]:**
> Then click below now to lock in your SF2 before this batch is gone.

**Reason:** More action-oriented, less formal.

---

### Lines 839-843 — CTA Variation #2
**Location:** Final CTA before sign-off

**ORIGINAL:**
> All for just a one time payment of $24999 for Performance Golf members on this page only.
>
> Again, all you have to do is click the button below…
>
> And watch your game absolutely transform before your eyes.

**[CHANGED]:**
> All for just a one time payment of $249.99 for Performance Golf members on this page only.
>
> Your SF2 is waiting — click below to claim it while this batch lasts.

**Reason:** Price fix + removed "absolutely" + varied CTA language.

---

### End of Document — P.S. Addition
**Location:** After "I'll see you in the fairway."

**ORIGINAL:** (No P.S. section)

**[NEW]:**
> **P.S.** Remember — you're protected by my personal 365-Day Permission to Fail Guarantee. Play 100 rounds, test it in every condition, and if you're not eliminating your slice AND gaining 20+ yards, send it back for a full refund. I'll even cover return shipping. You risk nothing.
>
> **P.P.S.** This initial batch of 300 SF2 drivers at the $249.99 member price won't last. Once they're gone, the price jumps back to $499. Don't wait and pay double — secure yours now while it's still available.

**Reason:** P.S. sections are high-readership areas. Added guarantee restatement and urgency.

---

## CHANGES REVERTED (Per Client Feedback — 2026-02-02)

The following changes have been **REVERTED** in the final edited-copy.md:

| Location | Change Made | Reverted To | Status |
|----------|-------------|-------------|--------|
| Line 175 | "Hidden Slice Trigger" branding | "toe lag" | ✅ REVERTED |
| Line 185 | "Hidden Slice Trigger" | "toe lag" | ✅ REVERTED |
| Line 195 | "Hidden Slice Trigger" | "toe lag" | ✅ REVERTED |
| Line 231 | "Hidden Slice Trigger" | "toe lag" | ✅ REVERTED |
| Line 393 | "Hidden Slice Trigger" | "toe lag" | ✅ REVERTED |
| Door metaphor (first instance, lines 175-177) | Insertion after "toe lag" | KEPT (pending approval) | ⏳ AWAITING APPROVAL |
| Door metaphor (lines 292-295) | Aerospace titanium hinges | KEPT (pending approval) | ⏳ AWAITING APPROVAL |
| Door metaphor (lines 411-415) | Callback to titanium hinges | KEPT (pending approval) | ⏳ AWAITING APPROVAL |

**Learning Applied:** Major copy elements (root cause, mechanism, anchor phrases) require explicit human approval before changes. See Learning #46.

---

## SUMMARY OF CHANGES

| Category | Count | Status |
|----------|-------|--------|
| AI Slop Fixes | 1 | Applied |
| Filler Word Removal | 6 | Applied |
| Price Formatting | 5 | Applied |
| Duplicate Content Removal | **2** | Applied (Learning #51) |
| CTA Variations | 3 | Applied |
| P.S. Section | 1 | Applied |
| Generic Superlative Fixes | 4 | Applied |
| **Hidden Slice Trigger Branding** | **4** | **REJECTED — REVERT** |
| Door Metaphor Insertions | **3** | Needs Approval |

---

## POST-EDITORIAL QA FIXES (2026-02-02)

The following issues were caught after initial editorial pass:

| Issue | Location | Fix | Learning |
|-------|----------|-----|----------|
| Duplicate "real problem" paragraph | Lines 159-167 | Removed duplicate, kept single occurrence | #51 |

**Note:** These duplicates likely resulted from Google Docs track changes/suggestions being exported to Markdown. Future editorial runs should include duplicate detection in Layer 1 source validation.

---

*Change tracking document generated for client review*
*Changes marked REJECTED should be reverted in final copy*
*Last updated: 2026-02-02 (post-QA fixes)*
