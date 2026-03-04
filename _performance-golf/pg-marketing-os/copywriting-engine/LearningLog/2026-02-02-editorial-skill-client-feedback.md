# Learning Log: Editorial Skill Client Feedback
**Date:** 2026-02-02
**Skill:** 20-editorial
**Project:** SF2 SliceFix Driver VSL

---

## FEEDBACK RECEIVED

### Learning #46: Major Copy Elements Require Human Approval Before Changes

**What Happened:**
During editorial revision, I rebranded "toe lag" as "Hidden Slice Trigger" — creating an anchor phrase to strengthen memorability. Client rejected this change.

**Why It Was Wrong:**
- The original terminology ("toe lag") was intentional and strategically chosen
- Major copy elements (root cause, mechanism, big idea, anchor phrases) are strategic decisions that precede the editorial phase
- Even if a change seems like an improvement, it may conflict with positioning, market testing, or client preferences we don't see

**Rule Established:**
> **MANDATORY:** Any proposed change to root cause, mechanism, big idea, promise, or other major copy elements requires explicit human approval BEFORE implementation — even during editing/revision phases. This applies whether working with upstream CopywritingEngine outputs OR external copy.

**Implementation:**
- Add checkpoint in Layer 4 (Fix Application) that flags major element changes
- Present proposed changes as SUGGESTIONS requiring approval
- Do not include in edited copy until approved

---

### Learning #47: Change-Tracking Document Is Mandatory Output

**What Happened:**
Editorial output included edited-copy.md but no way to see what specifically changed. Client couldn't efficiently review edits.

**Why This Matters:**
- Clients need to see original vs. new text
- Line-by-line tracking enables targeted feedback
- Diff format enables learning from accepted/rejected changes
- Standard in professional editing (Google Docs, Word track changes)

**Rule Established:**
> **MANDATORY:** Every editorial skill execution must produce a `changes.md` file showing:
> - Original text (strikethrough format)
> - New text (highlighted/marked)
> - Reason for each change
> - Location references
> - Clear marking of changes that require approval

**Implementation:**
- Add `changes.md` to mandatory output files in 5.4-output-assembly.md
- Format: strikethrough for removed, [NEW]/[CHANGED] for additions
- Include rejection status for changes not approved

---

### Learning #48: Placeholder Elements Should Not Penalize Score

**What Happened:**
Testimonial placeholders (e.g., "[Testimonial Section]") were treated as proof gaps and lowered the Believability score.

**Why This Is Wrong:**
- Placeholders are intentional — client will add real content
- Penalizing placeholders penalizes the editing process, not the copy quality
- Score should reflect copy that IS present, not content that's obviously pending

**Rule Established:**
> **Scoring Adjustment:** When evaluating copy with acknowledged placeholders (marked with brackets, "[Testimonial Section]", etc.), do not penalize for missing content. Note placeholders in output but score based on present copy only.

**Implementation:**
- Modify 5.2-quality-scoring.md to exclude acknowledged placeholders from scoring
- Add placeholder detection to Layer 1 (identify as "pending content" not "missing content")
- Final report should list placeholders as "awaiting client content" not "gaps"

---

### Learning #49: Suggestions vs. Implementations

**What Happened:**
Changes were implemented directly in edited-copy.md without distinguishing between:
- Safe changes (typos, formatting, slop removal)
- Approval-required changes (major element modifications)

**Rule Established:**
> **Change Classification Required:**
> - **AUTO-APPLY:** Typos, formatting errors, clear grammatical issues, price formatting
> - **APPLY WITH NOTE:** Slop removal, word substitutions, structural tweaks
> - **APPROVAL REQUIRED:** Any change to root cause, mechanism, big idea, promise, anchor phrases, major positioning

**Implementation:**
- Layer 4 must classify each fix before applying
- Approval-required changes appear in `changes.md` as SUGGESTIONS only
- Edited copy uses original text for approval-required items until confirmed

---

### Learning #50: Inline Track Changes Required (Not Just Change Log)

**What Happened:**
Created a `changes.md` file showing all changes with strikethrough, [NEW]/[CHANGED] markers, and reasons. Client feedback: while helpful, changes need to be shown INLINE in ONE document — like Word Track Changes or Google Docs editing mode.

**Why This Matters:**
- Reviewers need to see changes IN CONTEXT of surrounding copy
- A separate change log requires cross-referencing with the edited copy
- Professional editing workflows show edits inline as you read
- This is the ONLY way to give line-by-line feedback on editing
- Enables quantum improvement with each review pass

**Rule Established:**
> **MANDATORY:** Every editorial skill execution must produce a `tracked-changes.md` file showing:
> - The COMPLETE copy with ALL changes shown inline
> - ~~Strikethrough~~ for deleted/original text
> - **[NEW]** or **[CHANGED]** markers for added/modified text
> - Changes visible exactly where they occur in the document
> - Format key at top explaining the markup
> - Summary table at end for quick reference

**Key Distinction:**
- `changes.md` = Change LOG (list of changes with locations and reasons)
- `tracked-changes.md` = Full COPY with inline track changes (like Word/Google Docs edit mode)

Both are MANDATORY. They serve different purposes:
- `changes.md` for reviewing the nature of changes quickly
- `tracked-changes.md` for reviewing changes in context while reading

**Implementation:**
- Add `tracked-changes.md` to mandatory output files in 5.4-output-assembly.md
- Generate during Layer 5 output assembly
- Full copy with inline markup, not abbreviated excerpts

---

### Learning #51: Duplicate Content Detection Required in Layer 1

**What Happened:**
Original source file (exported from Google Docs) contained duplicate paragraphs — likely from track changes/suggestions being exported with both original and suggested text. The editorial process failed to catch these duplicates.

**Example Found:**
```
That said, the real problem though…
And the thing nobody really talks about…
Is what's happening with the toe of the club through impact.
If it's open by even a couple degrees, the ball starts right and curves further right. That's your slice.
The real problem though… and the thing nobody really talks about… is what's happening with the toe of the club through impact.
```
The same content appears twice in different formats.

**Why This Matters:**
- Duplicates make copy feel unprofessional and confusing
- They suggest incomplete editing
- They're especially common when source files come from Google Docs with track changes
- The editorial skill's purpose is to produce FINAL copy — duplicates are unacceptable

**Rule Established:**
> **MANDATORY:** Layer 1 (Blind Read) must include duplicate content detection. Check for:
> - Repeated paragraphs (exact or near-exact)
> - Repeated sentences within 20 lines of each other
> - Content that appears to be both "original" and "suggested" versions exported together
> - Concatenated text that looks like merge artifacts

**Implementation:**
- Add duplicate detection check to Layer 1 blind read microskill
- Flag all duplicates in Execution Log
- Auto-remove exact duplicates
- Flag near-duplicates for human review
- Add quality gate: "Zero duplicate content detected"

---

### Learning #52: ALL Insertions Must Be Documented in BOTH Output Files

**What Happened:**
A door metaphor was inserted after "This is what we call 'toe lag'" — making "toe lag" immediately tangible with a rusty hinges analogy. The insertion WAS marked in `track-changes.md` with **[INSERTED]**, but was NOT documented in `changes.md`. Client feedback: "This is the kind of change that it's important that we show the client and that we learn from."

**Why This Matters:**
- `changes.md` is the CHANGE LOG — clients scan this to see WHAT changed
- `track-changes.md` shows changes IN CONTEXT — clients read this to see HOW changes fit
- If an insertion appears in one but not the other, the client either:
  - Misses the change entirely (if only in track-changes)
  - Can't see the context (if only in changes.md)
- BOTH files must contain EVERY change for complete visibility

**Rule Established:**
> **MANDATORY:** Every editorial change — whether deletion, modification, OR INSERTION — must be documented in BOTH:
> 1. `changes.md` (change log with location, original, new, reason)
> 2. `track-changes.md` (inline in full copy with markup)
>
> A change appearing in only ONE file is a PROTOCOL VIOLATION.

**Implementation:**
- Add cross-verification step in Layer 5 output assembly
- After generating both files, verify every change in changes.md appears in track-changes.md AND vice versa
- Add quality gate: "Zero orphaned changes (all changes in both files)"

---

## SCORING RECALCULATION

With Learning #48 applied (placeholders not penalized):

| Criterion | Original Score | Adjusted Score |
|-----------|---------------|----------------|
| Believability | 7.5 | 8.5 |
| Other criteria | (unchanged) | (unchanged) |

**Recalculated Weighted Score:**
- Original: 8.275 (B+)
- Adjusted: 8.725 (B+ / borderline A-)

**Note:** With real testimonials added, projected score would be 9.2+ (A-)

---

## QUESTION TO ADDRESS: What Would Push to 99.5%?

Beyond testimonials, what additional persona or approach could address remaining weaknesses?

### Current Gaps (After Placeholder Adjustment)

1. **Institutional Proof** — No specific aerospace citations
2. **Value Stack** — No bonus items with dollar values
3. **Competitor Specificity** — "Big Golf" is vague; naming specific competitors could sharpen contrast
4. **Social Proof Scale** — No aggregate numbers ("Over 10,000 golfers...")

### Potential Additional Persona/Lens

**Recommendation:** Add a **"Proof Density Specialist"** lens to Layer 2 that specifically:
- Counts proof elements per section
- Identifies proof gaps that could be filled with web research
- Suggests specific institutional sources (e.g., "NASA titanium studies from 1960s")
- Calculates proof-to-claim ratio

**Alternative:** Add a **"Competitive Intelligence"** lens that:
- Identifies where competitor names could replace vague references
- Researches actual competitor pricing for stronger anchors
- Finds competitor claims that could be countersold

---

## FILES TO UPDATE

1. ✅ `changes.md` — Created + updated with post-QA fixes + added first door metaphor entry (Learning #52)
2. ✅ `tracked-changes.md` — Created (Learning #50) + updated with duplicate removal
3. ✅ `edited-copy.md` — Fixed duplicate content (Learning #51)
4. ✅ `5.4-output-assembly.md` — Added changes.md AND tracked-changes.md to mandatory outputs
5. ⏳ `EDITORIAL-AGENT.md` — Add major element approval rule
6. ⏳ `5.2-quality-scoring.md` — Add placeholder exclusion
7. ⏳ `4.1-priority-fixer.md` — Add change classification system
8. ⏳ `1.1-blind-read-executor.md` — Add duplicate detection check (Learning #51)
9. ⏳ `5.4-output-assembly.md` — Add cross-verification step for changes.md ↔ track-changes.md (Learning #52)

---

*Learning log entry for editorial skill improvement*
