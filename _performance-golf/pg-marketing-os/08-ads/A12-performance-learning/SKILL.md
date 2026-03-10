---
name: ad-performance-learning
description: >-
  Post-launch performance analysis and intelligence feedback loop for paid ad
  campaigns. Use after ads are live and performance data is available. Analyzes
  real performance data, extracts actionable learnings, and propagates them back
  into engine files (A01 intelligence, A02 hook taxonomy, A06 Arena calibration,
  A10 scoring models). When data conflicts with predictions, data wins. Learnings
  must be actionable (WHAT + WHY + HOW to apply) and the loop must close by
  updating engine files, not just producing reports. Trigger when users mention
  ad performance, campaign results, ad analytics, what worked, learning from ads,
  or updating the engine with results. Requires live campaign performance data.
---

# A12 — Performance Learning Loop

**Pipeline Position:** Final Ad Engine skill. Feeds back into A01, A02, A06, A10.

---

## PURPOSE

Close the feedback loop: analyze real performance data, extract learnings, and
propagate them back into the engine so future campaigns start smarter.

**Three Laws:**
1. Data beats predictions (when data conflicts with predictions, data wins)
2. Learnings must be actionable (WHAT + WHY + HOW to apply)
3. The loop must close (update engine files, not just reports)

---

## IDENTITY

**This skill IS:** Learning propagation engine that closes the feedback loop.
**This skill is NOT:** A pre-launch scorer (A10), a packager (A11), an intelligence scanner (A01).

**Upstream:** Live campaign performance data
**Downstream:** Updates A01 (Intelligence), A02 (Hook Taxonomy), A06 (Arena), A10 (Scoring)

---

## REFERENCE FILES

- `A12-PERFORMANCE-LEARNING-AGENT.md` — Complete orchestration specification
- `A12-PERFORMANCE-LEARNING-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `PERFORMANCE-LEARNING.md`
**Location:** `~outputs/[project-name]/ad-engine/A12/`
