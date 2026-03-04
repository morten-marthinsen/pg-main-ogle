# DQFE1 Quiz — Screen 1 Optimization Action Plan

**Status:** READY FOR IMPLEMENTATION
**Deadline:** Friday, February 20, 2026
**Implementation:** Split test — Version A vs. Version B
**Owner:** [Assign team member]
**Source:** Ben [Senior Client Partner, HeyFlow] — video walkthrough + email feedback

---

## Situation

Our HeyFlow quiz launched Friday. Screen 1 is seeing a **92-94% drop-off rate** — meaning only 6-8% of users who land on the quiz actually start it. Ben identified the root cause as a combination of:

- **Ad-to-flow message mismatch** — The ad promises "personalized coaching from PGA professionals" but Screen 1 asks "What motivates you to play golf?" with no connection to coaching
- **No clear call-to-action** — Six tiles with no explicit "Continue" or "Start" button
- **No time expectation** — Users don't know how long the quiz takes, so they assume it's long and leave
- **Too many choices** — Six options creates survey fatigue and decision paralysis

**Goal:** Fix Screen 1 to dramatically improve the start rate. Both split test versions must be live by Friday.

---

## The Ad Copy (Reference)

All video ads share this same Facebook post text. Screen 1 must message-match this copy:

> **Play your best golf faster!**
> Join 1.5+ million golfers who've already made the switch to the smarter way to improve
>
> - Personalized coaching from PGA professionals
> - Complete practice plan built around YOUR goals, schedule, and skill level
> - Step-by-step guidance (not random drills)
> - Track your progress and know what to work on next
> - Covers all areas: irons, putting, driver, short game
> - Daily recommendations that adapt as you improve
>
> TAKE THE QUIZ and start your personalized coaching journey today

---

## Split Test: Let's Test Two Approaches

Both versions share the same Q1 elements (4 options, Continue CTA, trust signals) — the only variable is whether we use a dedicated start page or fuse the ad message directly into Question 1.

---

### VERSION A: Quiz Start Page

A dedicated intro screen before the first question. The user sees the coaching promise, then clicks to begin.

**Start Page layout (top to bottom):**

| Element | Copy |
|---------|------|
| Headline | **Get Your Personalized Golf Coaching Plan** |
| Subhead | **Take the ~3-minute quiz** |
| Trust signals | 2+ Million Golfers / 4.8 star rating |
| CTA Button | **Start the Quiz** |

After clicking "Start the Quiz," the user lands on **Question 1:**

| Element | Copy |
|---------|------|
| Question | **What should your plan focus on?** |
| 4 tiles | (see Question One Choice Options below) |
| CTA Button | **Continue** |
| Trust signals (bottom) | Existing trust elements + 2+ Million Golfers |

Note: No progress text on Q1 — the progress bar begins naturally. The start page already set the time expectation ("~3-minute quiz").

**Why test this:** The start page creates a clear contract — the user knows what they're getting and opts in. It also gives Meta's algorithm a clean headline match ("personalized coaching" in the ad → "personalized coaching" on the page). Risk: we tested a start page on another quiz and it performed poorly. This version tests whether better copy changes that outcome.

---

### VERSION B: Fused Question 1 (Recommended)

No start page. The ad message is fused directly into the first question screen. The top line bridges the ad promise, and the question itself continues the personalization narrative.

**Screen layout (top to bottom):**

| Element | Copy |
|---------|------|
| Top line (small text) | **Get your personalized coaching plan in ~3 mins** |
| Question (main text) | **What should your plan focus on?** |
| 4 tiles | (see Question One Choice Options below) |
| CTA Button | **Continue** |
| Trust signals (bottom) | Existing trust elements + 2+ Million Golfers |

**Why this works:**
- "Get your personalized coaching plan in ~3 mins" does triple duty: matches the ad, sets time expectation, and frames the quiz as a plan-builder — not a survey
- "What should your plan focus on?" uses the word "your plan" — the user is already inside the personalization process. They're not answering a survey question, they're shaping their coaching plan
- No extra click before Q1 — reduces friction

**Implementation note for Version B:** The tile selection behavior must be changed in HeyFlow. Currently, tapping a tile auto-navigates to the next screen. For this version, tapping a tile should **select** the option (highlight it), and the user clicks the **Continue** button to advance. This is required because we're adding a Continue CTA.

---

## Question One Choice Options (Both Versions)

Reduce from 6 options to 4. Each maps to one distinct golfer persona:

| # | Option Text | Persona |
|---|-------------|---------|
| 1 | **Having fun with friends** | Social / Recreational |
| 2 | **Shooting lower scores faster** | Growth / Self-Improvement |
| 3 | **Competing against others** | Competitive / Tournament |
| 4 | **Getting outdoors & staying fit** | Lifestyle / Wellness |

**Why 4 instead of 6:**
- Research shows choice paralysis kicks in above 4 options in multiple-choice formats
- 4 options feels like a "quick assessment" — 6 feels like a "survey"
- Each option maps to one distinct golfer persona, making downstream data more actionable
- The gerund form ("Having fun..." / "Shooting lower scores...") makes options feel like ongoing identities, not commands

---

## Continue CTA Button (Both Versions — Q1 Only)

Add a clear **"Continue"** button below the choice tiles on the Question 1 page for both Version A and Version B.

**Why:**
- A CTA button on the first question signals "you are starting something" — it's a commitment micro-action
- Without it, users may not realize tiles are interactive or feel uncertain about what happens when they click
- Ben: "For the first screen, this can help a ton"

**For Version A:** The start page has its own CTA ("Start the Quiz"). The Continue button appears on the Q1 page that follows.

**For Version B:** The Continue button appears on the Q1 page (the first screen the user sees). The implementer must change HeyFlow tile settings so that tapping an option **selects** it rather than auto-navigating. The user clicks Continue to advance.

The Continue button only needs to appear on Q1. Subsequent screens can continue using tile-click navigation.

---

## Trust Signals (Both Versions)

**Keep existing trust symbols at the bottom** (4.8 star rating, etc.)

**Add:** "2+ Million Golfers" — matches the ad copy claim and reinforces the user is in the right place.

**For Version A:** Trust signals appear in two places — on the start page (above the fold, alongside the headline) AND at the bottom of Q1.

**For Version B:** Trust signals stay at the bottom of the Q1 screen. The top line ("Get your personalized coaching plan in ~3 mins") handles above-the-fold persuasion.

---

## What to Measure

After both versions go live Friday:

- **Primary metric:** Screen 1 → Screen 2 conversion rate (currently ~6-8%)
- **Secondary metric:** Full quiz completion rate
- **Split test decision:** Run both versions for 48-72 hours with equal traffic split, then compare
- **Baseline:** Document exact current Screen 1 drop-off % before making changes

**What a win looks like:** Any meaningful improvement from the current 6-8% start rate. Ben's feedback suggests these changes alone can move conversion rates by multiple percentage points.

---

## HeyFlow Implementation Notes

From Ben's video:
- **Do NOT use the Results tab for testing** — it shows test data. Use the **Preview button** instead
- **To test a specific screen:** Add the screen name to the URL in preview mode to jump directly to that screen
- **Exception:** Logo and dynamic loading screens won't render correctly in preview mode

---

## Future Tests

These are not part of this sprint. Save for the next optimization round after we have split test results:

- **Add explainer text under the question:** "This helps us tailor your coaching plan" — gives users a reason to answer and reduces friction
- **Remove or minimize the back arrow on Screen 1** — a prominent back button on the first screen is an easy off-ramp. If it must exist, make it small/subtle
- **Ensure option labels across the full flow feel outcome-oriented** — not just on Q1
- **Add periodic progress text** throughout the flow (e.g., every 3rd screen) to "pull the user along" — Ben says this can drop CPL and increase conversion rates by multiple points

---

*Plan created: February 18, 2026*
*Source: Ben [HeyFlow] video walkthrough + email — February 2026*
*Approved by: Christopher Ogle*
