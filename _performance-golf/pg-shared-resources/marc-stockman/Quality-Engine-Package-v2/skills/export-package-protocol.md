---
name: export-package-protocol
description: "Multi-document package consistency protocol with 9 passes for external distribution"
---
# Export Package Protocol

**Version:** 1.3 | March 12, 2026
**Trigger:** Preparing the QE system (or any subset) for external distribution — zip packaging, documentation bundles, handoff packages.
**Architecture role:** Closes Known Gap G-8 (Multi-Operator Knowledge Transfer). Complements R-17 (regression prevention for individual files) by preventing cross-document staleness across multi-file packages.

---

## The Problem This Solves

When the system is packaged for external consumption, multiple documents reference each other's version numbers, skill counts, rule counts, file names, and architectural claims. Each document was accurate when written. But the system evolves faster than the documentation — skill counts change, versions increment, commands get unified, file names change. Without a reconciliation sweep, the package ships with internal contradictions that undermine credibility and confuse receiving AI systems.

**Root cause:** Cross-document staleness. Unlike single-file staleness (caught by L3 and the staleness map), this involves N documents each referencing claims from M other documents. A change to any source-of-truth file potentially invalidates references across every document in the package.

**Why behavioral rules fail here:** The person packaging checks each file individually and finds it "looks right." The contradictions only surface when a receiver reads documents in sequence and notices that Document A says "25 skills" while Document B says "16 skills." The packager doesn't read sequentially — they know the current state and unconsciously resolve contradictions. The receiver doesn't.

---

## When to Fire This Protocol

- Before creating any zip archive of the QE system
- Before sharing any multi-document package externally
- Before posting documentation to a shared channel or repository
- When Marc says "package it up," "create the zip," "prepare it for [person]," or equivalent

---

## The Protocol: 8 Passes

### Pass 0: Structural Pre-Build Gate (HARD GATE)

Before any content or count checking, verify the package's mechanical integrity. This pass catches platform artifacts that silently break receiver experience.

**Step 0.1: YAML Frontmatter Verification**

For every `.md` file in the `skills/` folder:
1. Read the first line of the file
2. If the first line is NOT `---`, the file is missing YAML frontmatter
3. **FAIL behavior:** STOP packaging. Add frontmatter to every file that's missing it. Use this format:

```
---
name: skill-name-here
description: "Brief description of what this skill does"
---
```

**Why this exists:** The Perplexity platform strips YAML frontmatter when `load_skill` copies skill files to the workspace. If the package is built from workspace copies (which it always is), every file that was loaded during the session will be missing frontmatter. This is a known, recurring platform behavior — R-25 handles it for the `save_custom_skill` path, but the export path was unguarded until this gate was added.

**Provenance:** March 12, 2026 — 23 of 28 skill files shipped without frontmatter in QE Package v2, caught by Marc. Root cause: export path pulled from workspace copies where `load_skill` had stripped frontmatter. R-25 (Gate 1) only covers the save path, not the export path.

**Step 0.2: Platform Loading Instructions Verification**

Verify the README contains:
- A **review/feedback** section explaining how to read and analyze the package (Claude Code: open folder, ask Claude to read files)
- An **adoption** section explaining how to load skills as persistent instructions (Claude Code: CLAUDE.md + .claude/rules/)
- A note that the skills are platform-agnostic markdown and work on other platforms

If missing, add before proceeding. Note: Multi-platform step-by-step instructions are not required for every platform — Claude Code coverage is sufficient if all recipients use Claude Code. Include a fallback note directing other-platform users to ask the package author.

**Step 0.3: Smoke Test Verification**

Verify the README contains at least 2 smoke tests that a receiver can run to confirm the system is active after loading.

---

### Pass 1: Source-of-Truth Identification

Before checking anything, establish what the canonical current state is.

**Step 1.1:** Read `marc-ops-framework.md` (the root skill) and extract:
- Total skill count (active + deprecated)
- Total rule count (R-XX)
- Total directive count (D-XX)
- Total accelerator count (Q + L)
- Total structural gate count
- Total enforcement tier count
- Total standing command count
- Framework version number
- List of all skill names in the routing table

**Step 1.2:** Read every skill file in the package's `skills/` folder. For each, record:
- File name
- Version number (from the file header)
- Status (active, deprecated, current)

**Step 1.3:** Record these as the **canonical counts** for the package. Every other document will be checked against these.

**Output:** A canonical state table. Example:
```
Skills: 25 active + 1 deprecated = 26 total files
Rules: R-01 through R-28 = 28 rules
Directives: D-01 through D-13 = 13 directives
Accelerators: Q1-Q6 + L1-L6 = 12
Structural Gates: 9
Enforcement Tiers: 4
Standing Commands: 5
Framework: v3.2
```

---

### Pass 2: Cross-Document Count Reconciliation

For every document in the package (README, Explainer, Skill Registry, Intro doc, any other reference documents), check every numerical claim against the canonical counts from Pass 1.

**What to check:**
- Skill counts (any mention of "X skills" or "X skill files")
- Rule counts (any mention of "X rules" or "R-XX")
- Directive counts
- Gate counts
- Version numbers for any skill referenced by name
- Command counts and command names
- Enforcement tier counts
- Any "last updated" dates that predate the most recent skill modification

**For each mismatch found:**
- Record: document name, line/section, stale value, correct value
- Classify: CRITICAL (would confuse a receiving AI) or MINOR (cosmetic, wouldn't cause confusion)

**Hard gate:** All CRITICAL mismatches must be fixed before the package ships.

---

### Pass 3: Reference Integrity Check

Every file name, document reference, and cross-link mentioned in any package document must point to something that actually exists in the package.

**What to check:**
- File names in prose (e.g., "Read `Quality-Engine-Explainer.md`" — does that file exist with that exact name?)
- File names in tree diagrams and directory listings
- References to external documents (e.g., "See the `Accelerators_vs_QE_Reconciliation` document" — is it in the package?)
- Cross-references between skills (e.g., "Defers to `audit`" — is `audit.md` in the skills folder?)
- URL references (do they point to accessible resources?)

**For each broken reference:**
- Record: document name, the reference, what it points to, why it's broken
- Classify: MISSING (referenced file doesn't exist) or RENAMED (file exists under a different name) or ORPHANED (file exists but no document references it)

**For MISSING references:** Either add the missing file to the package, or remove/update the reference.
**For RENAMED references:** Update all references to the current file name.
**For ORPHANED files:** Evaluate whether the file should be referenced somewhere or removed from the package.

---

### Pass 4: Receiver Sequence Test

Walk through the package in the exact order a receiving AI would process it, checking for contradictions between sequential documents.

**The standard reading order:**
1. README.md (first document — sets expectations)
2. Explainer document (second — provides architectural context)
3. Master framework skill (third — the actual operating system)
4. Individual skill files (fourth — loaded on demand)
5. Reference documents (Skill Registry, Rules Log, Research Synthesis, etc.)

**For each pair of sequential documents, verify:**
- Claims in Document N are consistent with claims in Document N+1
- Terminology is consistent (same concepts use same names)
- The level of detail is appropriate (README summarizes, Explainer expands, Framework defines)
- Instructions in the README about what to read and in what order match the actual file names and content

**The "fresh eyes" test:** For each document, ask: "If I had only read the documents before this one (not the ones after), would I be confused by anything in this document?" If yes, that's a finding.

**Specific checks:**
- Does the README's "For AI Systems" sequence match the actual file names?
- Does the Explainer's skill inventory match the skills/ folder contents?
- Does the Skill Registry's version numbers match the actual skill file headers?
- Do "What Changed" sections accurately describe the delta from the prior version?

---

### Pass 4.5: Receiver Experience Walk-Through

Pass 4 checks the AI's reading experience. This pass checks the human's experience. Role-play a recipient who just received the zip file and has 5 minutes before deciding whether to engage.

**The "Donnie Test"** (named for Donnie French — pragmatic, busy, wants to know what to do):

1. Open README.md. Start reading from line 1.
2. **Time-to-action check:** How many lines before you reach clear instructions for what the recipient should DO? If the answer is more than ~60 lines, the instructions are buried. Flag as CRITICAL.
3. **Adjacency check:** Are the review/action instructions and the feedback prompt adjacent (within the same section or back-to-back sections)? If they're separated by more than one major section of other content, flag as CRITICAL. The two things a recipient needs — "how to engage" and "what to send back" — must be together.
4. **Cognitive load check:** Before the action instructions, how much technical depth does the recipient encounter? A brief "what this is" section is fine. Multiple sections of architecture diagrams, dependency maps, or skill inventories before the action instructions means the document is organized for the author, not the reader. Flag as finding if the technical deep-dive precedes the action instructions.
5. **Escape hatch check:** Can a recipient who just wants to give feedback do so without reading the full technical content? The review instructions should work even if the recipient skips every section between "What This Is" and "How to Review."

**What this pass catches that Pass 4 doesn't:** Pass 4 verifies that an AI reading all documents in sequence finds no contradictions. Pass 4.5 verifies that a human who opens one document and skims for 5 minutes finds what they need. Different audiences, different failure modes.

**Provenance:** March 12, 2026 — The "How to Review" instructions were at line 533 of a 653-line README through two zip builds and two audits. Caught only when Marc explicitly asked "empathize with someone on the receiving end." This pass makes that empathy structural.

---

### Pass 4.6: Receiver Functional Simulation

Pass 4.5 checks whether the packaging respects the reader (author-side empathy). This pass tests whether a recipient can actually accomplish the objectives the package was designed to support (receiver-side functional test).

**The distinction:**
- Pass 4.5 = "Does the packaging respect the reader?" — layout analysis from the author's perspective
- Pass 4.6 = "Can a real recipient actually do what we need them to do?" — functional test from the receiver's perspective

Pass 4.5 catches structural UX problems (buried instructions, fragmented feedback forms). Pass 4.6 catches execution gaps that only surface when someone actually tries to follow the instructions end-to-end.

**Protocol:**

**Step 1: Define the receiver objectives.**
Before simulating, explicitly list what the package is supposed to enable the recipient to do. These are the success criteria for the simulation. Minimum objectives for any QE package:
- Understand what the system is
- Understand what changed from the previous version
- Know how to evaluate it
- Know how to test it
- Know how to provide feedback

Marc may add additional objectives specific to the distribution context.

**Step 2: Spawn a fresh-context simulation agent.**
This step is critical — the simulation MUST run in a clean context (via `run_subagent`) that has never seen the package before. The author's context is contaminated by knowledge of what the package contains and how it was built. A fresh-context agent simulates what the recipient's AI will actually experience.

The subagent's objective should include:
- Read the package files in the order a recipient would encounter them (README first)
- For each defined objective, attempt to accomplish it using ONLY the information in the package
- Record: which document(s) were needed, what was clear, what was confusing, what was missing
- Note the first 60 seconds of experience — what does the recipient see first, is it clear what to do
- Identify jargon or undefined terms that would block a non-technical reader
- Score each objective: PASS / CONDITIONAL PASS / PARTIAL PASS / FAIL
- Produce ranked recommendations

**Step 3: Evaluate results against objectives.**
For each objective:
- PASS = the objective is fully achievable from the package alone
- CONDITIONAL PASS = achievable but with friction or prerequisites not stated in the package
- PARTIAL PASS = some aspects achievable, others require information not in the package
- FAIL = the objective cannot be accomplished from the package

Any FAIL is a hard blocker — fix before shipping. CONDITIONAL PASS and PARTIAL PASS are findings that should be addressed if time allows.

**Step 4: Act on findings.**
The simulation report becomes the punch list for final fixes. Address findings in order of impact:
1. Any FAIL objectives — hard blockers
2. Any PARTIAL PASS objectives — significant gaps
3. Top-ranked recommendations from the simulation
4. CONDITIONAL PASS items if time allows

**What this pass catches that Pass 4.5 doesn't:** Pass 4.5 evaluates the README's structure for a 5-minute skim. Pass 4.6 tests the entire package for a 30-45 minute deep engagement. Pass 4.5 catches "I can't find the instructions." Pass 4.6 catches "I found the instructions but they don't actually work" or "the feedback form exists in a document I was never told to read."

**Provenance:** March 12, 2026 — Receiver simulation of QE Package v2.0 found that the structured 7-section feedback form in `AI-Mastermind-QE-Package-Intro.md` was invisible from the README, jargon was undefined in the "accessible" walkthrough, and non-Claude Code users had no loading path. These issues survived two audits and one Pass 4.5 check because they only surface when someone actually tries to follow the instructions end-to-end.

---

### Pass 5: Adversarial Review Response Gate

If the package includes an adversarial review (or any external critique), the package must contain a response that maps each finding to a disposition.

**Check:** Does the package include any adversarial review, external feedback, or critique document?

**If yes, verify the package contains a response section (in the README or a dedicated response document) that addresses:**

For each substantive finding in the review:
- **Acknowledged + planned action:** The finding is valid, and here's what we'll do about it (with reference to Known Gaps, roadmap items, or planned work)
- **Acknowledged + already addressed:** The finding was valid when written but has since been addressed (with pointer to where)
- **Disagreed + reasoning:** The finding isn't applicable, and here's why
- **Deferred:** The finding is valid but lower priority than current work (with reasoning)

**What this prevents:** Including a critique without a response signals either (a) the packager agrees with everything and hasn't acted on it, or (b) the packager hasn't read it carefully. Either way, the receiver doesn't know how to interpret the critique relative to the current system state.

**Hard gate:** If an adversarial review is included, a response section must exist. The response doesn't need to address every minor point — but every section header and every "biggest blind spot" / "weakest element" / "one concrete suggestion" type finding must have a disposition.

---

### Pass 6: Adoption Path Check

Every package must include a viable path for someone who won't read all N files.

**Check for the existence of:**

1. **Quick Start section** — A "Minimum Viable" subset identifying the 3-5 highest-value pieces and the order to implement them. Must include:
   - Which files to read first (not all of them)
   - Which 3-5 rules deliver the most value
   - Which 1-2 skills to start with
   - A realistic time estimate for initial adoption

2. **Platform translation guidance** — At minimum, acknowledgment of what's platform-specific vs. platform-agnostic. Ideally, specific translation notes for common platforms (Claude Code, Cursor, ChatGPT, etc.)

3. **Feedback mechanism** — How should the receiver provide feedback, ask questions, or report issues? Even if it's just "send feedback to [person/channel]."

**Why this matters:** Fran Rengel's adversarial review identified this explicitly: "The QE would benefit from a 'Minimum Viable QE' — the 3-5 rules and 1-2 gates that deliver 80% of the value with 20% of the implementation." Without an adoption path, the package is impressive documentation that doesn't get implemented.

---

## Convergence

After all 9 passes (0 through 6, including 4.5 and 4.6), count total findings:
- If 0 CRITICAL findings and 0 broken references: Package is cleared for distribution.
- If any CRITICAL findings or broken references remain: Fix them, then re-run Passes 2-4 on the affected documents to verify fixes didn't introduce new issues.

---

## Output

The protocol produces:
1. **Package Audit Log** — All findings from all 9 passes with classifications and dispositions
2. **Canonical State Table** — The source-of-truth counts (from Pass 1)
3. **Fix Log** — What was changed, in which document, and why

---

## Integration with Existing System

- **R-17 (Feature Regression):** R-17 prevents regression in individual files. This protocol prevents cross-document regression across a multi-file package. They're complementary — R-17 fires on file updates, this protocol fires on package assembly.
- **L3 (Staleness Detection):** L3 catches staleness within a session. This protocol catches staleness that accumulated across sessions (a document written March 6 in a package assembled March 12).
- **Gate 6 Downstream Trace:** Gate 6 already requires checking permanent files when a skill is updated. This protocol extends that principle to package-level assembly.
- **G-8 (Multi-Operator Knowledge Transfer):** This protocol is a direct implementation step for G-8 — ensuring the package that transfers knowledge is internally consistent.

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Audit | PASSED | 2026-03-12 | AI | v1.0: Acceptance test PASSED — all 8 pre-build issues map to protocol passes. Applied to QE Package v2. 2 loops, convergence reached. |
| Patch | APPLIED | 2026-03-12 | AI | v1.1: Added Pass 0 (Structural Pre-Build Gate) with YAML frontmatter verification, platform loading instructions check, and smoke test check. Provenance: 23/28 files shipped without frontmatter — export path was unguarded by R-25. |
| Patch | APPLIED | 2026-03-12 | AI | v1.2: Added Pass 4.5 (Receiver Experience Walk-Through). The "Donnie Test" — role-plays a busy recipient opening the package. Checks time-to-action, instruction adjacency, cognitive load, and escape hatch. Provenance: review instructions were at line 533 of a 653-line README through two zip builds and two audits, caught only when Marc asked for receiver empathy. |
| Patch | APPLIED | 2026-03-12 | AI | v1.3: Added Pass 4.6 (Receiver Functional Simulation). Fresh-context subagent simulates receiving the package cold and tests whether defined objectives are achievable. Catches execution gaps that survive empathy checks. Provenance: simulation of QE Package v2.0 found feedback form invisible from README, jargon undefined in accessible sections, no non-Claude Code loading path — all survived 2 audits + Pass 4.5. |