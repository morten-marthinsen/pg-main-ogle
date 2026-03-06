# Implementation Plan: Taste Encoding + FSSIT Enforcement + Learning Capture
# Version: v3.6 Upgrade
# Date: 2026-02-15
# Status: IN PROGRESS

## Root Problems Addressed
- #3 (Taste Encoding) — Anthony's edits are richest taste signal but captured ad-hoc
- #4 (FSSIT Gap) — RSF/FSSIT specced but easily skipped, no downstream enforcement
- PAI-inspired Learning Capture Loop — no automated learning capture or rating system

## Root Problems NOT addressed here
- #1 (Scoring Paradox — needs market data)
- #5 (Speed-to-Market — operational)

---

## Work Stream 1: Taste Encoding System

### 1A. Create `./skills/TASTE-CAPTURE-PROTOCOL.md`
Master protocol defining:
- Edit Capture Schema (structured YAML for every Anthony revision)
- Pattern Accumulation (how edits cluster into reusable taste rules)
- Taste-to-Generation Bridge (structured taste data → generation constraints)
- Post-Campaign Review Protocol

### 1B. Update `./learning-log/SCHEMA.md` (v1.0 → v2.0)
Add two new entry types:
- `taste_revision_entry` — logged when Anthony edits Arena/editorial output
- `rating_entry` — explicit 1-10 quality rating after skill completion

### 1C. Create `./skills/00-brief/soul-md-template.md`
Ready-to-copy Soul.md template with all 10 sections from SOUL-MD-PROTOCOL.md

### 1D. Create RSF project Soul.md as proof-of-concept
`./outputs/rich-shefren-ai-opportunity/SOUL.md` (Finalized status)

### 1E. Update CLAUDE.md — Taste Capture Protocol section

---

## Work Stream 2: FSSIT Mandatory Integration

### 2A. Strengthen Gate 2.8 in `ENFORCEMENT-GATES.md`
- RSF skip → explicit degradation acknowledgment + RSF_SKIP_ACKNOWLEDGED.yaml

### 2B. Update `MASTER-AGENT.md`
- Add PERSONA_RESONANCE_ANALYST persona
- Add minimum FSSIT output requirements
- Add FSSIT-RANKING.md as mandatory output

### 2C. FSSIT loading enforcement in downstream AGENT.md files
- BIG-IDEA-AGENT.md — FSSIT Loading Gate (mandatory) before Layer 2A
- ROOT-CAUSE-AGENT.md — FSSIT as optional-but-recommended input
- MECHANISM-AGENT.md — FSSIT as optional-but-recommended input
- PROMISE-AGENT.md — FSSIT as optional-but-recommended input

### 2D. Create `skills/FSSIT-HANDOFF-TEMPLATE.md`
Standardized format for FSSIT candidates flowing Research → Strategic skills

---

## Work Stream 3: PAI-Inspired Learning Capture Loop

### 3A. Create `skills/LEARNING-CAPTURE-PROTOCOL.md`
- Explicit Rating Capture (1-10 after every skill)
- Implicit Sentiment Detection (edit volume as satisfaction signal)
- Learning Extraction (post-project)
- Integration points (Layer 4 LEARN sub-step)

### 3B. Add LEARN phase to CLAUDE.md
Universal post-execution protocol for all skills

---

## Files to CREATE (5 new files)
1. `skills/TASTE-CAPTURE-PROTOCOL.md` (8-10KB)
2. `skills/00-brief/soul-md-template.md` (4-5KB)
3. `skills/FSSIT-HANDOFF-TEMPLATE.md` (3-4KB)
4. `skills/LEARNING-CAPTURE-PROTOCOL.md` (6-8KB)
5. `outputs/rich-shefren-ai-opportunity/SOUL.md` (4-5KB)

## Files to MODIFY (8 existing files)
1. `learning-log/SCHEMA.md` — Add taste_revision_entry + rating_entry
2. `skills/01-research/ENFORCEMENT-GATES.md` — Strengthen Gate 2.8
3. `skills/01-research/MASTER-AGENT.md` — Add persona + FSSIT requirements
4. `skills/06-big-idea/BIG-IDEA-AGENT.md` — FSSIT Loading Gate
5. `skills/03-root-cause/ROOT-CAUSE-AGENT.md` — FSSIT recommended input
6. `skills/04-mechanism/MECHANISM-AGENT.md` — FSSIT recommended input
7. `skills/05-promise/PROMISE-AGENT.md` — FSSIT recommended input
8. `./CLAUDE.md` — Taste + Learning sections, v3.5 → v3.6

## Files to UPDATE (tracking)
1. `ROADMAP.md` — Phase 1D status
2. Memory MEMORY.md — 10th major structural fix

---

## Execution Order
1. Create protocols (TASTE-CAPTURE, LEARNING-CAPTURE, FSSIT-HANDOFF)
2. Update Learning Log schema
3. FSSIT enforcement (ENFORCEMENT-GATES, MASTER-AGENT, 4 AGENT.md files)
4. Soul.md template + RSF proof-of-concept
5. Update CLAUDE.md v3.6
6. Update tracking files
