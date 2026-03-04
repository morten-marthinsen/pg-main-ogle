# Influencer Brief Standard

> Canonical standard for Neco Sub-Agent #6 (Influencer Brief Generation).  
> This file is the single source of truth for influencer brief structure and formatting.

## 1) Purpose

Create influencer briefs that are:

1. Fast to scan on page one
2. Persona-first before concept writing
3. General-use across creators (not talent-specific by default)
4. Structurally consistent across all offers

## 2) Required Top-Level Section Order

Use this order exactly:

1. `# [Product] - Influencer Creative Brief`
2. Product metadata line block (`Product`, `Funnel`, `Ad Type`, `Destination`)
3. `>>> START HERE:`
4. `## PERSONAS` (page-one hyperlink list only)
5. Page-one concept link map:
   - `PAIN-FOCUSED CONCEPTS`
   - `DESIRE-FOCUSED CONCEPTS`
   - `BONUS (OPTIONAL)`
6. `## Product Overview`
7. `## Target Audience Profile`
8. `## PERSONAS (DETAILED)`
9. `## Creative Direction`
10. `## The 13 Ad Concepts`
11. `# PAIN-FOCUSED CONCEPTS`
12. `# DESIRE-FOCUSED CONCEPTS`
13. `# BONUS`
14. `## Compliance Notes ([OFFER])`

## 3) Persona Rules

### 3.1 Page-One Persona Block

Must appear directly under `>>> START HERE:`.

Include:

1. `## PERSONAS`
2. One purpose line: helps the creator pick **who** they are speaking to.
3. Hyperlinked persona names only (no long copy on page one).

### 3.2 Persona Detail Block

Must appear between `Target Audience Profile` and `Creative Direction`.

Header: `## PERSONAS (DETAILED)`

Each persona must include exactly four one-line fields:

1. `Short Description`
2. `Core Wound`
3. `Core Desire`
4. `Voice Cue`

### 3.3 Persona Count + Gate

1. Exactly 4 personas per offer brief unless human explicitly changes count.
2. Persona set must be human-approved before concept generation/refinement.
3. This is a structural gate (`PERSONA_LOCK_CHECKPOINT`).

## 4) Link and Anchor Rules

1. Every page-one persona link must resolve to a matching anchor in `PERSONAS (DETAILED)`.
2. Every page-one concept link must resolve to its detailed concept section.
3. Anchor naming must be stable and lowercase kebab-case.

## 5) Concept System Rules

1. Keep 13-style architecture:
   - 7 pain-focused
   - 5 desire-focused
   - 1 bonus
2. Hooks live in concept sections, not persona cards.
3. Persona cards remain psychological and concise.
4. Any concept primarily built for women must append ` (Women's-Focused Angle)` in the concept title on page-one links and detailed headers.

## 6) General-Use Rules

1. Brief default audience is any influencer/team member.
2. Do not hardwire a single creator's name or delivery style unless explicitly requested.
3. If a call transcript is provided, extract and encode agreed personas/angles while keeping brief reusable.

## 7) Compliance Rules

1. Avoid guaranteed outcomes and absolute performance claims.
2. Prefer `can help`, `designed to`, `many golfers report` style language.
3. Keep mechanism claims aligned with verified product context.

## 8) Quality Checklist (Pre-Delivery)

1. Page one is concise and scannable.
2. Persona hyperlinks work.
3. Concept hyperlinks work.
4. Persona detail fields use required labels and one-line format.
5. `PERSONAS (DETAILED)` location is correct.
6. 13-concept structure is complete.
7. Compliance notes included.
