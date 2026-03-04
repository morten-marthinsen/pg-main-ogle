# Build Review Board

## Purpose

A team of three expert personas that review any build plan before implementation begins. They catch over-engineering, wrong sequencing, scope creep, and plans that won't ship.

## The Problem This Solves

Without review, plans tend to:
- Try to build the full vision at once
- Over-engineer before validating the core works
- Sequence by technical layers instead of user value
- Delay shipping while pursuing completeness

The Build Review Board catches these patterns before time is wasted.

## The Team

### 1. The Product Strategist (Marty Cagan archetype)
**Focus:** Are we building the right thing?
**Questions:**
- What's the core problem this solves?
- Who needs this and how do we know?
- What's the minimum that validates the approach?
- Are we building what users need or what we imagine they need?

**File:** `product-strategist.md`

### 2. The Simplicity Engineer (Kent Beck archetype)
**Focus:** Are we overcomplicating this?
**Questions:**
- What's the simplest thing that could work?
- What are we building that we don't need yet?
- Can this be done in fewer pieces?
- Are we making it work before making it right?

**File:** `simplicity-engineer.md`

### 3. The Delivery Veteran (Principal Engineer archetype)
**Focus:** Will this actually ship?
**Questions:**
- What's going to break?
- What's the dependency chain and where are the risks?
- Have we built anything like this before? What did we learn?
- What's the sequence that gets value flowing fastest?

**File:** `delivery-veteran.md`

## How It Works

1. User invokes `/build-review` with a plan or TDD
2. Orchestrator loads all three personas
3. Each persona reviews the plan from their perspective
4. They discuss, challenge each other, find consensus
5. Output: Revised plan with:
   - Scope adjustments (what to cut/defer)
   - Sequencing recommendations (what order)
   - Risk flags (what might break)
   - Phase 1 definition (minimum viable build)

## Invocation

```
/build-review [path-to-plan-or-TDD]
```

Or in conversation:
"Run the build review board on this plan"

## Output Format

```markdown
# Build Review Board Assessment

## Consensus Verdict
[APPROVED / REVISE / REJECT]

## Summary
[2-3 sentences on the overall assessment]

## Product Strategist Assessment
[Their view]

## Simplicity Engineer Assessment
[Their view]

## Delivery Veteran Assessment
[Their view]

## Discussion Points
[Where they disagreed and how they resolved it]

## Recommended Changes
1. [Change]
2. [Change]

## Revised Phase 1 Scope
[What should actually be built first]

## Deferred to Later Phases
[What was cut and why]
```

## To Build

- [ ] Create `product-strategist.md` persona file
- [ ] Create `simplicity-engineer.md` persona file
- [ ] Create `delivery-veteran.md` persona file
- [ ] Create `/build-review` skill that orchestrates the three
- [ ] Test on a real plan

## Integration with Methodology

This review happens after the Phased Delivery Plan is drafted, before PRDs are written. It validates that:
- The phasing is correct
- Phase 1 is truly minimal
- The sequence makes sense
- Nothing obvious is being over-engineered

See: `AI Team Training/Content/methodology/05 Phased Delivery Planning.md`
