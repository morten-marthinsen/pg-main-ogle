# Editorial Skill Learning Log

**Skill:** 20-editorial
**Purpose:** Dedicated learning repository for editorial skill refinement through hyper-iteration
**Created:** 2026-02-02
**Last Updated:** 2026-02-02

---

## HOW TO USE THIS LOG

This is not a general CopywritingEngine learning log. This is a **dedicated editorial learning log** for capturing every insight, failure, and improvement specific to the editing process.

**When to add entries:**
- Client feedback on editorial output
- Discovered failure patterns
- New rules established
- Process improvements implemented
- Quality gate additions/modifications

**Entry format:**
```
### Learning #[N]: [Brief Title]

**Date:** YYYY-MM-DD
**Project:** [Project name]
**Trigger:** [What caused this learning - client feedback, self-discovery, etc.]

**What Happened:**
[Specific incident description]

**Why It Matters:**
[Impact on editorial quality, client experience, or process]

**Rule Established:**
> [Quoted rule that is now MANDATORY]

**Implementation:**
- [Specific changes to make]

**Status:** [Implemented | Pending | In Progress]
```

---

## LEARNING INDEX

| # | Title | Date | Status |
|---|-------|------|--------|
| 1 | Major Copy Elements Require Human Approval | 2026-02-02 | Pending |
| 2 | Change-Tracking Document Is Mandatory | 2026-02-02 | Implemented |
| 3 | Placeholder Elements Don't Penalize Score | 2026-02-02 | Pending |
| 4 | Change Classification System Required | 2026-02-02 | Pending |
| 5 | Inline Track Changes Required | 2026-02-02 | Implemented |
| 6 | Duplicate Content Detection in Layer 1 | 2026-02-02 | Pending |
| 7 | All Changes in BOTH Output Files | 2026-02-02 | Implemented |

---

## LEARNINGS

### Learning #1: Major Copy Elements Require Human Approval Before Changes

**Date:** 2026-02-02
**Project:** SF2 SliceFix Driver VSL
**Trigger:** Client feedback - rejected "Hidden Slice Trigger" rebranding of "toe lag"

**What Happened:**
During editorial revision, I rebranded "toe lag" as "Hidden Slice Trigger" — creating an anchor phrase to strengthen memorability. Client rejected this change.

**Why It Matters:**
- The original terminology ("toe lag") was intentional and strategically chosen
- Major copy elements (root cause, mechanism, big idea, anchor phrases) are strategic decisions that precede the editorial phase
- Even if a change seems like an improvement, it may conflict with positioning, market testing, or client preferences we don't see

**Rule Established:**
> **MANDATORY:** Any proposed change to root cause, mechanism, big idea, promise, or other major copy elements requires explicit human approval BEFORE implementation — even during editing/revision phases. This applies whether working with upstream CopywritingEngine outputs OR external copy.

**Implementation:**
- Add checkpoint in Layer 4 (Fix Application) that flags major element changes
- Present proposed changes as SUGGESTIONS requiring approval
- Do not include in edited copy until approved

**Status:** Pending

---

### Learning #2: Change-Tracking Document Is Mandatory Output

**Date:** 2026-02-02
**Project:** SF2 SliceFix Driver VSL
**Trigger:** Client feedback - couldn't see what changed

**What Happened:**
Editorial output included edited-copy.md but no way to see what specifically changed. Client couldn't efficiently review edits.

**Why It Matters:**
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

**Status:** Implemented

---

### Learning #3: Placeholder Elements Should Not Penalize Score

**Date:** 2026-02-02
**Project:** SF2 SliceFix Driver VSL
**Trigger:** Self-discovery during scoring review

**What Happened:**
Testimonial placeholders (e.g., "[Testimonial Section]") were treated as proof gaps and lowered the Believability score.

**Why It Matters:**
- Placeholders are intentional — client will add real content
- Penalizing placeholders penalizes the editing process, not the copy quality
- Score should reflect copy that IS present, not content that's obviously pending

**Rule Established:**
> **Scoring Adjustment:** When evaluating copy with acknowledged placeholders (marked with brackets, "[Testimonial Section]", etc.), do not penalize for missing content. Note placeholders in output but score based on present copy only.

**Implementation:**
- Modify 5.2-quality-scoring.md to exclude acknowledged placeholders from scoring
- Add placeholder detection to Layer 1 (identify as "pending content" not "missing content")
- Final report should list placeholders as "awaiting client content" not "gaps"

**Status:** Pending

---

### Learning #4: Suggestions vs. Implementations - Change Classification Required

**Date:** 2026-02-02
**Project:** SF2 SliceFix Driver VSL
**Trigger:** Client feedback - changes applied without classification

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

**Status:** Pending

---

### Learning #5: Inline Track Changes Required (Not Just Change Log)

**Date:** 2026-02-02
**Project:** SF2 SliceFix Driver VSL
**Trigger:** Client feedback - need to see changes in context

**What Happened:**
Created a `changes.md` file showing all changes with strikethrough, [NEW]/[CHANGED] markers, and reasons. Client feedback: while helpful, changes need to be shown INLINE in ONE document — like Word Track Changes or Google Docs editing mode.

**Why It Matters:**
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

**Status:** Implemented

---

### Learning #6: Duplicate Content Detection Required in Layer 1

**Date:** 2026-02-02
**Project:** SF2 SliceFix Driver VSL
**Trigger:** Post-editorial QA discovery

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

**Why It Matters:**
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

**Status:** Pending

---

### Learning #7: ALL Insertions Must Be Documented in BOTH Output Files

**Date:** 2026-02-02
**Project:** SF2 SliceFix Driver VSL
**Trigger:** Client feedback - "This is the kind of change that it's important that we show the client"

**What Happened:**
A door metaphor was inserted after "This is what we call 'toe lag'" — making "toe lag" immediately tangible with a rusty hinges analogy. The insertion WAS marked in `track-changes.md` with **[INSERTED]**, but was NOT documented in `changes.md`.

**Why It Matters:**
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

**Status:** Implemented

---

## PENDING IMPLEMENTATIONS

| Learning | File to Update | Change Required |
|----------|---------------|-----------------|
| #1 | EDITORIAL-AGENT.md | Add major element approval rule |
| #1 | 4.1-priority-fixer.md | Add checkpoint for major elements |
| #3 | 5.2-quality-scoring.md | Add placeholder exclusion |
| #4 | 4.1-priority-fixer.md | Add change classification system |
| #6 | 1.1-first-read-capture.md | Add duplicate detection check |
| #7 | 5.4-output-assembly.md | Add cross-verification step |

---

## QUALITY GATES ESTABLISHED

From learnings, the following quality gates are now MANDATORY:

| Gate | Layer | Check |
|------|-------|-------|
| Duplicate Detection | L1 | Zero duplicate content detected |
| Major Element Flagging | L4 | All major element changes flagged for approval |
| Change Classification | L4 | Every change classified (AUTO/NOTE/APPROVAL) |
| Output Cross-Verification | L5 | All changes in BOTH changes.md AND tracked-changes.md |
| Placeholder Handling | L5 | Placeholders noted but not penalized in scoring |

---

## MANDATORY OUTPUT FILES

Every editorial execution MUST produce:

| File | Purpose | Learning Source |
|------|---------|-----------------|
| `edited-copy.md` | Final edited copy | Original requirement |
| `editorial-report.md` | Assessment and scoring | Original requirement |
| `execution-log.md` | Process verification | Original requirement |
| `changes.md` | Change log with reasons | Learning #2 |
| `tracked-changes.md` | Full copy with inline markup | Learning #5 |

---

*This learning log is updated with every editorial feedback cycle.*
*Last entry: Learning #7 (2026-02-02)*
