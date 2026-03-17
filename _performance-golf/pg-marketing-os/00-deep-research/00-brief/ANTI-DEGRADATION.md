# BRIEF-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-12
**Purpose:** STRUCTURAL enforcement to prevent brief intake degradation
**Authority:** This document has EQUAL authority to ~system/SYSTEM-CORE.md

---

## WHY THIS DOCUMENT EXISTS

00-brief is the **first skill in the entire pipeline**. Every campaign starts here. A degraded brief cascades into every downstream skill — bad inputs produce bad research, bad research produces bad foundation packages, bad foundation packages produce bad copy.

**The brief is the single highest-leverage point in the entire system.** Enforcing quality here prevents problems in all 20+ downstream skills.

---

## DEGRADATION PATTERNS

### Pattern 1: Incomplete Product Specification
**WHEN:** The brief contains vague product descriptions ("it's a health supplement"), missing ingredient lists, no dosage information, or no competitive differentiation.
**STOP:** A brief without specific product details produces a research skill that searches for the wrong things. Do NOT proceed with vague product specs.
**ENFORCE:** The research-brief-template.md requires specific fields. Every field must be populated or explicitly marked as "not available — operator will provide."

### Pattern 2: Missing Audience Definition
**WHEN:** The brief lacks target audience demographics, psychographics, or awareness level. Generic descriptions like "health-conscious adults" are insufficient.
**STOP:** The persona development skill (07) and all copy generation skills (10-17) depend on precise audience definition from the brief. Garbage in = garbage out.
**ENFORCE:** Minimum 3 audience characteristics must be documented: age range, primary pain point, and current solution/alternative they're using.

### Pattern 3: Vague Campaign Objectives
**WHEN:** The brief says "write a sales page" or "create marketing materials" without specifying: target format, conversion goal, traffic source, price point, or funnel position.
**STOP:** The structure skill (08), offer skill (06), and all copy skills need specific campaign context. "Write good copy" is not an objective.
**ENFORCE:** At minimum: format (VSL/landing page/email/ad), primary conversion action (purchase/lead/trial), and price range.

### Pattern 4: No Source Material Provided
**WHEN:** The operator provides zero research material — no existing copy, no competitor URLs, no customer reviews, no product documentation.
**STOP:** The research skill (01) needs starting material to work with. Running research on thin air produces hallucinated proof elements and fabricated quotes.
**ENFORCE:** At minimum ONE source must be provided: product URL, existing sales page, customer review source, or competitor reference.

### Pattern 5: Rushing Through Brief Intake
**WHEN:** The brief is completed in under 5 minutes or contains mostly placeholder text ("TBD", "will add later", "same as last time").
**STOP:** The brief sets constraints for the entire campaign. Placeholders propagate as real constraints downstream.
**ENFORCE:** Every template field must contain actual content, not promises of future content. If information is unavailable, the field must say "NOT AVAILABLE" and the operator must confirm this gap is acceptable before proceeding.

### Pattern 6: Contradictory Requirements
**WHEN:** The brief contains conflicting instructions (e.g., "premium positioning" + "$9.99 price point", or "scientific credibility" + "no clinical studies available").
**STOP:** Contradictions force downstream skills to make arbitrary choices that may not align with the operator's intent.
**ENFORCE:** Flag contradictions explicitly. Present them to the operator for resolution before proceeding. Do NOT resolve contradictions silently.

---

## ISSUE LOGGING

When any degradation pattern fires during brief intake, log to `~outputs/issue-log.md`:
- **Class:** `missing-input` (patterns 1-4) or `specification-gap` (patterns 5-6)
- **Skill:** 00-brief
- **Description:** Which pattern fired and what was missing/vague

This feeds the Self-Learning Promotion Protocol for cross-campaign pattern detection.
