# QE 3.0 Evaluation — Don French

**Evaluator:** Don French (Performance Golf Marketing OS)
**Date:** 2026-03-15
**Version:** R1 (Round 1)
**Scope:** Phases 1, 2, 3, and 5 (Phase 4 Stress Test skipped)
**Evaluator's System:** Marketing OS — a 67-skill, 11-engine copywriting pipeline with programmatic validation hooks, 7-competitor Arena, and multi-layer learning loops

---

## Bottom Line

**Overall Score:** 4.31 / 5.00
**Letter Grade:** B (Strong — adopt with targeted improvements)
**One-Line Verdict:** The QE 3.0 is a rigorous, well-evidenced methodology that correctly identifies the core failure modes of AI quality systems — but it was designed for general-purpose AI work, and creative production pipelines expose gaps in upstream-downstream synchronization, voice governance, and multi-candidate generation that the QE doesn't yet address.

**Strongest element:** The self-learning pipeline (Mechanisms #9-12) is the QE's most valuable contribution. The Issue Classification → Pattern Detection → Rule Promotion → Structural Gate escalation path is a complete, well-designed feedback loop that genuinely compounds over time. The 3+ class-c escalation threshold is the right trigger point.

**Biggest gap:** No mechanism for upstream-downstream data synchronization. When a human decision mid-pipeline changes a factual data point (e.g., a credential or guarantee term), the QE has no mechanism to propagate that change back to upstream files. In real multi-step workflows, this is the #1 source of data inconsistency — and Phase 3 live testing confirmed it against a real deliverable.

**Highest-value mechanism for our system:** Kill Criteria (#14). The Marketing OS has "STOP" as Law #7 but lacks formalized thresholds, governance, and remediation paths. Adopting the QE's structured kill governance would prevent the escalation-of-commitment failures that occur during long overnight execution runs.

---

## Phase 1: Structural Analysis

| Dimension | Score (1-5) | Key Evidence |
|-----------|-------------|--------------|
| D1. Architectural Coherence | 4 | The 4-layer architecture (L0 Infrastructure, L1 Behavioral Governance, L2 Production Pipeline, L3 Learning Loop) is clean and logical. Cross-cutting behaviors are explicitly noted ("Kill Criteria lives in L3 but fires during L2"). The mechanism dependency graph in Getting Started makes the connections clear. Minor gap: the cross-cutting behaviors could be formalized into a dependency matrix rather than prose notes. |
| D2. Failure Mode Coverage | 4 | Covers the major AI failure modes well: analyzing from memory (#3), single-pass verification (#6), source fabrication (#7), gamed compliance (#1 Content Substance tier), escalation of commitment (#14), context degradation (#2), rule decay (#12). Does NOT address: upstream-downstream data synchronization, human edits that bypass the system, or overnight/unattended execution without human gates. These are real practitioner-level workflow failures that the RS1 pipeline exposed. |
| D3. Enforcement Realism | 4 | The three implementation levels (L1 prompt-only, L2 prompt+files, L3 agent harness) are honest and practical. The admission that "a hard gate at L1 is enforced by explicit instructions + audit-trail verification" is appropriately modest. The Content Substance tier for gamed compliance is sophisticated — it addresses the second-generation failure mode where AI satisfies the letter of a gate while violating its spirit. The convergence loop's material change taxonomy provides clear, testable definitions. |
| D4. Self-Learning Loop Integrity | 4 | The pipeline is complete: Issue Classification (a/b/c/d) → Pattern Detection → Rule Promotion → Structural Gate escalation. The 3+ class-c threshold for escalation to structural enforcement is well-calibrated. The human approval gate on rule changes is non-negotiable (correct). The bloat-prevention check (verify existing rules before creating new ones) addresses a real risk. The Eval Case Bank concept adds regression-testability. Minor gap: no explicit mechanism for retiring obsolete rules. |
| D5. Practitioner Accessibility | 4 | The 4-tier Getting Started path with explicit transition criteria is well-designed. The worked example (competitive analysis task) walks through end-to-end with realistic detail. The templates are immediately usable. The cherry-pick warning is essential and well-placed. However, at 1,100+ lines, the document demands significant investment from a first-time reader. The task-type scaling table helps manage complexity but still requires internalization. |
| D6. Platform Agnosticism | 5 | This is the QE's cleanest achievement. The three implementation levels (L1/L2/L3) map naturally to any platform. Mechanisms are described in terms of what they do and why, never how to code them. The document explicitly names Claude Code, ChatGPT, Gemini, Cursor, and Perplexity as valid platforms. No mechanism requires a specific tool. |
| D7. Measurement and Observability | 4 | The QE Scoreboard's 5 metrics (Criteria Coverage, Source Grounding, Mean Convergence Loops, Top Recurring Issue Class, Rule Promotion Rate) are meaningful and hard to game. The interpretation matrix (what combinations of strong/weak metrics signal) is especially valuable — it converts dashboard numbers into diagnostic insight. The Eval Case Bank adds regression-testability. Minor gap: no guidance on how to measure Arena effectiveness or research quality specifically. |
| D8. Scalability Across Task Types | 4 | The 6-type task classification with a mechanism activation matrix is practical. The 3-mechanism floor (Research Gate + Success Criteria + one convergence pass) ensures even trivial tasks get minimum quality without excessive overhead. The floor feels right — it's light enough not to annoy on quick lookups but catches the most common failure (analyzing from memory). Minor gap: the scaling doesn't address multi-deliverable pipelines where 67 skills run in sequence with cascading dependencies. |
| D9. Edge Case and Stress Handling | 3 | Kill Criteria with default thresholds, governance model, and 4 remediation paths handle escalation-of-commitment well. The convergence iteration cap (default 3) prevents infinite loops. Context efficiency addresses degradation under length. However: the document doesn't deeply address human-AI disagreement spirals, conflicting rules (what happens when Rule A and Rule B produce contradictory guidance), or multi-agent coordination. The "motivated faker" scenario (AI faking quality steps) is acknowledged via the Content Substance tier but not stress-tested. |
| D10. Completeness vs. Overwhelm | 4 | 15 mechanisms is the right count — comprehensive without being paralyzing. The 4-tier implementation path manages overwhelm effectively. The evidence typology labels add useful transparency. The templates are essential for practitioners. However, the document could benefit from a 2-page executive summary for initial orientation. The Getting Started section does this partially but is deep in the document rather than up front. |

**Phase 1 Composite Score:** 4.00 / 5.00

---

## Phase 2: Delta Analysis

**System evaluated against:** Marketing OS at `/Users/donfrench/pg-main-hub/pg-main/_performance-golf/pg-marketing-os/`

**System inventory:** 67 specialized skills across 11 engines, 36 protocol files, 8 Python validation hooks + shell dispatcher, 7-competitor 3-round Arena, 5-zone context management system, multi-channel learning capture, and programmatic enforcement at L3 implementation level.

### Category A — New to Us (QE has, we don't)

| # | Mechanism/Principle | What It Does | Effort (Low/Med/High) | Priority (1-5) |
|---|--------------------|--------------|-----------------------|----------------|
| A1 | Kill Criteria Formalization (#14) | Structured default thresholds table (convergence loops > 3, time > 2x estimate, scope drift, assumption failure, complexity threshold), kill governance model (system flags → human evaluates → override requires justification → logged), 4 remediation paths (simplify, reframe, decompose, escalate). Marketing OS has Law #7 "STOP" and MC-CHECK HALT, but no formalized thresholds, governance, or remediation routing. | Low | 5 |
| A2 | Success-Pattern Tracking (#15) | Systematic reference class database tracking what worked and why — parallel to failure tracking. Provides real data for calibrating future estimates (e.g., "deliverables of this complexity historically required 2-3 convergence loops"). Marketing OS captures taste preferences (Taste Capture) and explicit ratings (Learning Capture Channel 1) but doesn't systematically track process/methodology success patterns as calibration data for future work. | Med | 4 |
| A3 | Material Change Taxonomy (part of #6) | Explicit 4-category definition of what counts as a "material change" during convergence: (1) factual error — always material, (2) logical/structural flaw — always material, (3) meaning-affecting wording — material, (4) cosmetic — never material. Test: "Would the target audience's understanding or decision change if this were left unfixed?" Marketing OS's Arena uses scoring thresholds but doesn't define a material change taxonomy for verification passes. | Low | 4 |
| A4 | Eval Case Bank (Scoreboard extension) | Library of real examples per recurring issue class (3+ occurrences): input that triggered the issue, incorrect output, corrected output. Converts compounding claims into testable, demonstrable regression tests. Marketing OS has TIER1 reference (395+ extraction files) and bounded trial validation (test on 3 recent examples) but no permanent case bank of quality failures as regression tests. | Med | 3 |

### Category B — Already Covered (Both have)

| # | QE Mechanism | Our Equivalent | Comparison | Notes |
|---|-------------|----------------|------------|-------|
| B1 | Structural Gates (#1) | `.hooks/validators/` — 8 Python validators + Stop Hook + dispatch-validator.sh | Ours Better | We have L3 programmatic enforcement firing on every file write. QE describes the pattern and tiers; we execute them as code. Our proportionality_check.py specifically addresses gamed compliance (the QE's Content Substance tier). |
| B2 | Context Efficiency (#2) | 5-zone context system (GREEN→CRITICAL) + Adaptive Compaction (5 stages) + Context Reservoir (~15-17KB) + Skill Pre-Flight Planning (30-50% context reduction) + Protocol Manifest (priority-banded loading) + Active Recitation Protocol | Ours Better | 6 interlocking context mechanisms vs. QE's conceptual "treat context like a budget." Our system is operationally battle-tested across multi-session pipelines with zone-based triggers and progressive compaction. |
| B3 | Research-Before-Reasoning Gate (#3) | Deep Research Engine (Skills 00-02) — Brief → Research → Proof Inventory. Gate 1 requires 1,000+ quotes across 6 buckets with enforced minimums. Expression Anchoring scores against data BEFORE Arena. | Ours Better | Same principle, purpose-built implementation. RS1 research produced 1,442 quotes from 12 sources using 4 MCP tools. The QE's Research Gate is the right mechanism; our implementation is deeper for our domain. |
| B4 | Pre-Action Reasoning (#4) | Pre-Mortem Protocol (3 questions before every skill) + Task Triage (3 effort tiers) + MC-CHECK (metacognitive checkpoints with PROCEED/PAUSE/HALT/SESSION_BREAK) | Equivalent | The QE includes stakeholder orientation and rollback planning that we handle implicitly rather than explicitly. Our MC-CHECK adds rushing detection and synthesis verification that the QE doesn't have. Different structures, similar coverage. |
| B5 | Success Criteria Lock (#5) | Gate checkpoints with explicit score thresholds + binary PASS/FAIL (Law #3) + per-skill success criteria in skill-loading profiles | Equivalent | Both enforce explicit criteria before starting. The QE's generic worksheet is more portable; our skill-specific criteria are more precise for our domain. |
| B6 | Convergence Loop (#6) | 3-round Arena (7 competitors) + Scoped Verification Protocol (5 verification points) + Convergence Intervention Protocol (3 detection modes) + Adversarial Critic + per-round Learning Briefs | Ours Better | Our Arena is more sophisticated for creative work — multi-candidate competition with diversity enforcement. The QE's 4-pass single-deliverable iteration (Verify → Attack → Pre-Mortem → Revise) is a complementary approach we should adopt for verification passes. The QE's material change taxonomy (A3 above) is a valuable addition. |
| B7 | Source Verification (#7) | Uncertainty Calibration Protocol (3 dimensions rated 1-10) + confidence tagging ([FACTUAL]/[RESEARCHED]/[INFERRED]) + proof ceiling discipline | QE Better | We do deep initial research with confidence tagging, but lack reverification at point of use. The RS1 evidence shows claims propagating downstream without reverification when facts changed mid-pipeline. The QE's emphasis on "fetch the primary source directly at time of writing" addresses exactly this gap. |
| B8 | Arena Deliberation (#8) | 7-competitor 3-round Arena with Adversarial Critic, diversity enforcement, convergence detection, learning briefs, post-Arena synthesis, single-context hardening | Ours Better | Our Arena is purpose-built for creative generation with programmatic diversity enforcement (pairwise convergence checks across 21 pairs, competitive distance scoring, pattern break bonuses). The QE's 3-perspective model (Strategist, Reframer, End User) is designed for strategic evaluation, not creative generation. Both valid for their domains. |
| B9 | Learning Ledger (#9) | Self-Learning Promotion Protocol (L1-L6 progression) + Learning Capture Protocol (3 channels: explicit rating, implicit sentiment, post-project extraction) + Taste Capture Protocol + universal LEARN phase on every skill | Ours Better | More elaborate learning infrastructure with multiple capture channels and a 6-level maturation path. The QE's Learned/Memorialized/Activated three-column format is clean and could serve as a summary template. |
| B10 | Issue Classification (#10) | Self-Learning Promotion Protocol — J1/J2 classification, 10 issue classes, graduated escalation (2x = flag/rule, 3x = propose hook, 5x = mandatory engineering review) | Ours Better | More granular classification (10 classes vs. 4) and more graduated escalation thresholds. The QE's a/b/c/d taxonomy is cleaner to teach; ours is more precise to operate. |
| B11 | Forensic Intake (#11) | Expression Anchoring Protocol (score against 3 data sources) + TIER1 Reference System (395+ extraction files from elite DR controls) + Analytical Reasoning Capture (6 capture points) | Equivalent | Different scopes, similar intent. The QE's principle ("different domain is never sufficient grounds for dismissal") is broader. Our implementation is deeper for copywriting-specific inputs but doesn't formalize cross-domain transfer. |
| B12 | Progressive Rule Promotion (#12) | Self-Learning Promotion Protocol (L1-L6 progression) + bounded trial validation (test on 3 recent examples, 3/3 must pass) + System Graduation Protocol | Equivalent | Similar maturity. The QE's rollback protocol (version number + timestamp + prior text on every promoted rule) is a useful addition we should adopt. Our bounded trial validation (3/3 must pass) is more rigorous than the QE's implicit testing. |
| B13 | Operational Simulation (#13) | AutoResearch Loop (Karpathy-pattern: branch → modify → test → evaluate → keep/discard) + Skill Rollback Protocol (git snapshots at skill boundaries) | Equivalent | The QE's cold receiver test, stress test, and scenario walkthrough are broader. Our AutoResearch Loop is more specific (prompt optimization) but more automated (git worktree integration). |

### Category C — We Do It Better

| # | QE Mechanism | Our Superior Approach | Why Ours Is Stronger |
|---|-------------|----------------------|---------------------|
| C1 | Context Efficiency Discipline (#2) | 5-zone system with Adaptive Compaction (5 progressive stages: upstream summarization → prose windowing → reservoir triage → history pruning → emergency micro-reservoir), Context Reservoir (human-curated ~15-17KB), Skill Pre-Flight Planning (Haiku subagent, 30-50% context reduction), Active Recitation (externalize 5 strategic anchors VERBATIM at midpoint and 75%), Protocol Manifest (priority-banded loading) | The QE describes "treat context like a budget." We built the budget system. Our 5-zone architecture with automatic compaction triggers, progressive degradation stages, and human-curated context reservoirs is what operational context management looks like across multi-session creative pipelines. The QE's guidance is correct but insufficient for systems running 6-7 sessions on a single deliverable. |
| C2 | Arena Deliberation (#8) | 7-competitor 3-round Arena with: Adversarial Critic (dedicated role, NOT self-critique), Arena Diversity Protocol (pairwise convergence check across 21 pairs, competitive distance scoring at 10% weight, pattern break bonus at 5% weight, memorability test), Convergence Intervention Protocol (3 detection modes: persona convergence, round stagnation, output repetition), controlled inter-round diversity (vary presentation order, emphasize different scoring dimension each round), single-context hardening (4 personas, n-gram similarity check, file I/O as contamination barrier), Post-Arena Synthesizer (2-3 phrase-level hybrids), BLOCKING human selection | The QE's 3-perspective Arena (Strategist, Reframer, End User) is a deliberation tool — it evaluates a question from multiple angles. Our Arena is a competition engine — it generates multiple competing outputs and selects the best through adversarial critique and programmatic diversity enforcement. For creative work, competition produces better outcomes than deliberation because it explores the solution space more broadly. The QE's Arena is well-designed for strategic decisions; ours is purpose-built for creative generation. |
| C3 | No equivalent in QE | Voice/Taste Governance: Soul.md (project-level taste constraint with lifecycle: Seed → Expanded → Finalized), Dual-System Specimen Architecture (395+ TIER1 structural patterns + 101 persona specimens across 6 personas), Anti-Slop Enforcement (banned word categories), Taste Capture Protocol (per-edit schema capturing before/after + pattern + category), Voice Drift Detection (reminder_detector.py), Persona Voice Loading Protocol | The QE has no mechanism for maintaining creative voice consistency across a pipeline. For any creative system, voice governance is as fundamental as fact-checking. Without it, AI output sounds generically competent but never distinctly branded. Our Soul.md alone — a living document capturing voice register, emotional range, energy signature, anti-voice, pacing signature, and taste decisions — is a mechanism class the QE should consider adding. |
| C4 | No equivalent in QE | Multi-Step Pipeline Management: 67 skills across 11 engines with cascading prose pattern (each skill reads predecessor's actual written prose), pipeline-handoff-registry (schema validation on every handoff), Constraint Ledger (per-task YAML tracking upstream decisions and downstream implications), per-microskill output protocol (every microskill produces its own dedicated file), Skill Rollback (git snapshots at skill boundaries) | The QE's Production Pipeline is a 6-phase linear sequence for a single deliverable. Real creative production involves dozens of interdependent skills producing hundreds of files over multiple sessions. Our cascading prose pattern ensures each skill reads its predecessor's actual output (not a summary), and our pipeline-handoff-registry validates the handoff schema at every transition. The QE needs a "pipeline orchestration" mechanism for multi-deliverable workflows. |
| C5 | Structural Gates (#1) | Programmatic Validation: 8 Python validators (gate_validator.py, output_validator.py, checkpoint_validator.py, schema_validator.py, proportionality_check.py, token_estimator.py, reminder_detector.py, convergence_detector.py) + dispatch-validator.sh + Stop Hook (blocks agent completion on critical failures) | The QE describes structural gates as a pattern. We execute them as Python code that fires on every file write, with 8 specialized validators covering gate status, output quality, checkpoint integrity, schema compliance, proportionality (anti-gaming), token estimation, degradation detection, and convergence monitoring. The dispatch-validator.sh routes file writes to the appropriate validators automatically. This is what L3 implementation looks like. |

### Category D — QE Is Weaker

| # | Mechanism | Specific Weakness | How Our Version Addresses It |
|---|-----------|-------------------|----------------------------|
| D1 | Convergence Loop (#6) — creative application | The QE's 4-pass single-deliverable iteration model (Verify → Attack → Pre-Mortem → Revise) converges on a local optimum. For creative work, iterating on one piece is actively weaker than generating multiple competing pieces and selecting the best. The QE's approach would improve a mediocre headline by refining it; our approach would generate 7 competing headlines and pick the strongest. Refinement ≠ exploration. | Our Arena generates 7 competing outputs per round across 3 rounds, with adversarial critique driving genuine creative variety. Diversity enforcement (pairwise convergence checks, pattern break bonuses) prevents the competition from collapsing into refinement. The winning output is then refined through scoped verification — competition first, convergence second. |

**Delta Summary:**
- New to us (Category A): 4 — High-priority (4-5): 2
- Already covered (Category B): 13 — QE better: 1, Equivalent: 5, Ours better: 7
- We do it better (Category C): 5
- QE is weaker (Category D): 1

---

## Phase 3: Live Testing

**Note on test inputs:** All three tests were run against the RS1 putter output tree — a completed pipeline that ran Skills 00-09 (Deep Research through Campaign Brief), EC-00 through EC-05 (E-Commerce Strategy through Assembly), producing 100+ files across 14 subdirectories. This is live work, not hypothetical.

### Test T1: Research Gate Test

**Task/Context:** The RS1 e-commerce product page — the canonical assembled copy file (`ec-05-outputs/ecomm-copy-assembled.md`) plus its upstream research files (1,442 quotes from 12 sources, story elements research, feature package, product deck).

**Execution:**

**Step 1 — List every factual claim in the work:**

| # | Claim | Location |
|---|-------|----------|
| 1 | RS1 uses Forward Axis Weighting | Throughout — DSI, hero, feature cards |
| 2 | 75%+ of 360g head weight in front 25% of head | Feature card F-001, hero carousel |
| 3 | 10-piece multi-material construction | Feature card F-002, product highlights |
| 4 | 74-degree upright lie angle | Feature card F-003, product specs |
| 5 | Chris McGinley has "30+ years" of putter design experience | Hero, McGinley section, FAQ |
| 6 | McGinley worked with "11 world #1 players" | McGinley section |
| 7 | Face Down Balance (FDB) demonstrates face-neutral stability | FDB section, comparison chart |
| 8 | LAB Golf acquired for $200M by L Catterton | Not in final copy (research only) |
| 9 | "95% of putters have the weight in the wrong place" | Problem section (BTF-02), carousel |
| 10 | Face drift causes "1-3 degrees open at impact" | Problem section (BTF-02) |
| 11 | 365-day guarantee, full refund, no questions asked | Guarantee section, CTA areas |
| 12 | $399 (RS1) / $429 (RS1+) pricing | Pricing section, CTA areas |
| 13 | PG1 app with 30-day free trial included | Technology section |
| 14 | Mallet putters: 82% make rate from 6ft vs blade 75% | Research files (MyGolfSpy citation) |
| 15 | Patented Dual Pistol Grip — "only dual-sided pistol in golf" | Feature card F-005 |
| 16 | McGinley was VP of Marketing for Golf Clubs at Titleist | Research files (story elements) |
| 17 | McGinley worked 21 years at Titleist | Research files (story elements) |

**Step 2 — Classify evidence type for each claim:**

| # | Claim | Evidence Type |
|---|-------|---------------|
| 1 | Forward Axis Weighting | Analytical — engineering principle verified via product deck |
| 2 | 75%+/360g/25% spec | Empirical — measurable spec from product deck (primary source) |
| 3 | 10-piece construction | Empirical — enumerated components from product deck |
| 4 | 74-degree lie angle | Empirical — measurable spec from product deck |
| 5 | McGinley "30+ years" | Practitioner — credential claim, human-directed override |
| 6 | "11 world #1 players" | Practitioner — INFERRED from Titleist roster during McGinley's tenure |
| 7 | FDB demonstration | Analytical — physical demonstration of engineering principle |
| 8 | LAB $200M acquisition | Empirical — public business news, Perplexity-verified |
| 9 | "95% of putters" | Theoretical — rounded assertion, no source cited |
| 10 | "1-3 degrees open" | Theoretical — specific range, no source cited |
| 11 | 365-day guarantee | Practitioner — business decision (not a research claim) |
| 12 | $399/$429 pricing | Practitioner — business decision |
| 13 | PG1 app free trial | Practitioner — product feature |
| 14 | 82% vs 75% make rate | Empirical — MyGolfSpy data with attribution |
| 15 | "Only dual-sided pistol" | Practitioner — uniqueness claim, implies market survey |
| 16-17 | McGinley Titleist history | Empirical — Perplexity research, tagged [RESEARCHED] |

**Step 3 — Grounded vs. ungrounded:**

*Grounded in live source (fetched during production):*
- Claims 1-4, 7, 8, 14, 16-17: Grounded via product deck (primary) or Perplexity research (secondary verified)
- Claims 11-13: Business decisions — grounded in brief and human directives

*Ungrounded (training data or unverified):*
- Claim 9: "95% of putters" — no source. Rounded assertion that sounds precise.
- Claim 10: "1-3 degrees open at impact" — no source. Specific range that demands evidence.
- Claim 6: "11 world #1 players" — flagged as INFERRED in research file (`story_elements_research.md`), but used as factual in all downstream copy.

*Inconsistent (grounded but contradictory across files):*
- Claim 5: McGinley's years of experience. Research found career starting mid-1980s (35+ years). Core message pipeline used "25+ years." E-comm copy updated to "30+ years" per human directive. Three different values exist in the output tree.

**Step 4 — Count:**
- Grounded: 12 claims
- Ungrounded: 3 claims
- Inconsistent: 1 claim (with 3 conflicting values)

**Step 5 — Would grounding change conclusions?**

- **"95% of putters"** — If the real number is 70% or 80%, the copy still works directionally. But the precision of "95%" implies a specific data point that doesn't exist. Changing to "the vast majority" or "virtually every putter" (which appears in the root-cause package) would be more defensible and equally persuasive.
- **"1-3 degrees open at impact"** — This specific range sounds like it comes from a study. If no study exists, the claim is fabricated precision. Removing the specific number ("your putter face drifts open at impact") preserves the argument without the liability.
- **"11 world #1 players"** — The research file itself flagged this as "INFERRED — directional count, needs Chris's confirmation for marketing use." Using an inferred count as a factual credential in customer-facing copy is a research integrity issue. Should be confirmed with McGinley or qualified ("worked with multiple world #1 players").
- **McGinley credential (25+/30+/35+)** — The discrepancy itself is the issue. Any single number would be fine; having three different numbers across the system means the next agent that loads upstream data will produce copy with the wrong credential.

**Results:**
- What the mechanism caught: The QE's Research Gate taxonomy correctly surfaces the 3 ungrounded claims and 1 inconsistent credential. The evidence type classification (theoretical vs. empirical vs. practitioner) immediately flags which claims need sourcing.
- What it missed: The Research Gate fires BEFORE analysis — it wouldn't catch the inconsistency that emerged AFTER research, when a human decision mid-pipeline overrode the research finding. The gate prevents analyzing from memory; it doesn't prevent data drift.
- Surprises: The Marketing OS's own research DID flag the "11 world #1 players" as inferred — the system caught it, but the finding didn't prevent the claim from propagating into final copy. The gate worked; the downstream enforcement didn't.

**Verdict:** WORKS
**Evidence:** The Research Gate's evidence typology correctly classified all 17 claims. The grounded/ungrounded distinction immediately surfaced the 3 claims needing sourcing. The taxonomy is practical and adds genuine diagnostic value — knowing that "95% of putters" is theoretical (vs. empirical) changes how you treat it. The mechanism would catch 3 of the 4 issues identified in the RS1 output if applied at writing time.
**Adaptation needed:** Add a "downstream verification trigger" — when a Research Gate fires during a downstream skill and reads an upstream file, it should check whether any claims in that file have been superseded by human directives or newer research. This closes the gap between "research before reasoning" and "verify at point of use."
**Value if implemented:** HIGH — The Research Gate is already the foundation of the Marketing OS's Deep Research engine. Adopting the QE's evidence typology labels as a formal classification step would add transparency to our confidence tagging system ([FACTUAL]/[RESEARCHED]/[INFERRED]) and help downstream skills treat claims appropriately.

---

### Test T2: Convergence Loop Test

**Task/Context:** The RS1 assembled e-commerce page (`ec-05-outputs/ecomm-copy-assembled.md`) — the canonical final deliverable for the RS1 product page, assembled from 15 individually-approved section drafts plus human edits.

**Execution:**

**Pass 1 — Verification (cross-check every factual claim against sources):**

| Finding | Source Check | Material? |
|---------|------------|-----------|
| McGinley "30+ years" | Matches user directive (commit cdc49a52) but NOT research finding (35+ from Perplexity, career starting mid-1980s). Upstream pipeline files (Soul.md, campaign-brief.json) still say "25+". | Yes — factual claim about a real person with 3 conflicting values in the system |
| "95% of putters have the weight in the wrong place" | No source found in research files, product deck, or scraped data. Appears first in the e-comm copy without attribution. | Yes — specific-sounding stat with no source |
| "1-3 degrees open at impact" from face drift | No source found. The problem section uses this as a factual claim but it has no research backing. | Yes — fabricated precision |
| "11 world #1 players" | Research file (`story_elements_research.md`) explicitly flags: "INFERRED — directional count, needs Chris's confirmation for marketing use." Used as factual in downstream copy. | Yes — inferred claim presented as fact |
| "free trail" in EC-03 section copy | Typo: should be "free trial" | No — cosmetic (per QE taxonomy: cosmetic changes are never material) |
| Two "What to Expect" items incomplete | "Feel The Face" has one line of body copy; "See The Line Before You Sink It" has none | Yes — missing content in a published section |
| Feature name drift: "Face Square Focus" → "T-Trac Alignment Lines" | Assembled version uses new name; feature-package.json still uses old name | No for the copy (assembled is canonical); Yes for the registry |

**Pass 1 result:** 4 material changes identified.

**Pass 2 — Adversarial (hostile skeptic perspective):**

| Challenge | Assessment | Material? |
|-----------|-----------|-----------|
| FDB demo → performance bridge | The Face Down Balance demo proves the putter sits face-down on a table. A skeptic asks: "So what? Does it actually improve putting?" The copy bridges from the demo to "gravity keeps the face square through your stroke" — this is the mechanism explanation, not proof of performance. No putting performance data, robot test results, or on-course evidence is presented. The bridge from physical property → on-course benefit is asserted, not proven. | Yes — the single most important proof point (FDB demo) lacks a performance bridge |
| "Traditional rear-weighted putters" as the villain | The copy attributes face drift to "traditional rear-weighted putters." But mallet putters have been face-balanced or near-face-balanced for decades. The claim conflates blades (rear-weighted) with mallets (often center/face-balanced). A golfer who owns a face-balanced mallet would challenge: "My putter doesn't have rear weighting." The distinction between rear-weighted, center-balanced, and forward-weighted needs qualification. | Yes — the problem statement over-generalizes across putter types |
| Comparison chart uses generic categories | "Traditional Mallets" and "Zero-Torque Putters" are obvious proxies for "everything else" and "LAB Golf." A sophisticated buyer recognizes the avoidance of naming competitors. The chart is legally safe but feels evasive to a knowledgeable audience. | No — this is a strategic positioning choice, not a factual error |
| "The only premium putter with Forward Axis Weighting" | Axis1 exists with forward CG. The promise output itself notes "ONLY is harder to defend than FIRST since Axis1 exists." The copy uses "ONLY" language throughout without acknowledging Axis1. A buyer who knows Axis1 questions the exclusivity claim. | No — the "premium" qualifier and the promise output's own analysis suggest this was a deliberate positioning decision with eyes open |

**Pass 2 result:** 2 material changes identified.

**Pass 3 — Pre-Mortem (assume the page failed, work backward):**

*Scenario: The RS1 page launches. Conversion rate is below target. Why did it fail?*

1. **The sophisticated buyer bounced.** They know the mallet market. They've seen LAB Golf. They may know Axis1. The page doesn't address Axis1 at all — not even in the FAQ. The "only" claim feels wrong to them. They leave and Google "RS1 vs Axis1" and find nothing from PG. *Fix: Add an FAQ entry addressing how RS1 differs from other forward-weighted putters (without naming Axis1).*

2. **The LAB Golf owner wasn't converted.** The comparison chart positions RS1 against "Zero-Torque Putters" but doesn't answer the LAB owner's core question: "I already have a putter that eliminates face drift — why would I switch?" The "active vs. passive" distinction is in the upstream pipeline (Three-Position Competitive Spectrum) but only partially surfaces in the copy. *Fix: Make the active gravity assist distinction more prominent — it's the reason to switch FROM LAB, not just the reason to switch from a blade.*

3. **The "What to Expect" section signaled an unfinished page.** Two items with missing or single-line body copy in a section that's supposed to dimensionalize the ownership experience. A buyer scrolling through sees the gap and questions whether the product is ready. *Fix: Complete the section or remove the incomplete items.*

**Pass 3 result:** 1 material change (Axis1 gap in FAQ — the others are strategic recommendations, not material changes to the existing copy).

**Convergence assessment:**
- Total material changes across 3 passes: 7
- Per QE protocol: material changes > 0 → loop back to Pass 1
- This deliverable would require at least a second convergence loop

**Loop 2 would address:**
1. Source or remove "95% of putters" (replace with "virtually every putter" from root-cause package)
2. Source or remove "1-3 degrees open at impact" (replace with directional language)
3. Confirm or qualify "11 world #1 players" with McGinley
4. Add performance bridge after FDB demo (reference robot testing videos planned for Section 9)
5. Qualify "rear-weighted" claim to distinguish blades from mallets
6. Complete "What to Expect" section items
7. Add FAQ entry for forward-weighted putter comparison

**Results:**
- What the mechanism caught: 7 material issues in a deliverable the system considered finished and ready for EC-06 editorial. The most impactful findings came from Pass 2 (adversarial) — the FDB-to-performance bridge gap and the rear-weighting over-generalization — issues that verification alone wouldn't surface.
- What it missed: Nothing in scope. The 4-pass structure (Verify → Attack → Pre-Mortem → Revise) is genuinely complementary to the Marketing OS's existing verification, which focuses on internal consistency rather than adversarial challenge.
- Surprises: The Pre-Mortem (Pass 3) was the least productive pass — it mostly surfaced strategic concerns already visible in the competitive positioning. The Attack pass (Pass 2) was the most productive, catching issues that no amount of fact-checking would find.

**Verdict:** WORKS
**Evidence:** The Convergence Loop identified 7 material issues in a page the pipeline considered complete. The 4-pass structure adds genuine diagnostic value beyond what the Marketing OS's existing scoped verification catches — specifically, the adversarial pass surfaces logic-chain weaknesses and assumption gaps that fact-checking misses. The material change taxonomy made classification unambiguous: "95% of putters" is clearly material (factual, no source), while "free trail" is clearly cosmetic. No judgment calls needed.
**Adaptation needed:** The Convergence Loop should be positioned as a POST-Arena, POST-Assembly verification step in the Marketing OS. It doesn't replace the Arena (which generates competing creative outputs) but adds a systematic verification layer that the Arena's creative competition doesn't provide. Sequence: Arena → Assembly → Convergence Loop → Editorial.
**Value if implemented:** HIGH — The RS1 page would have been materially stronger if this 4-pass convergence had run before EC-06 editorial. The 7 issues identified are real, specific, and actionable. This mechanism fills a genuine gap between our Arena (creative selection) and our Scoped Verification (internal consistency checking).

---

### Test T3: Self-Learning Pipeline Test

**Task/Context:** The McGinley credential inconsistency — "25+ years" in upstream pipeline files, "30+ years" in e-comm copy, "35+ years" in research — as a real quality failure from the RS1 production run.

**Execution:**

**Step 1 — Log the issue using the QE's format:**

| Field | Value |
|-------|-------|
| **What happened** | McGinley's years-of-experience credential exists in 3 different versions across the RS1 output tree. The Perplexity research (story_elements_research.md) found his career started in the mid-1980s, yielding "35+ years." The core message pipeline (Skills 03-09) used "25+ years" throughout all JSON/YAML packages and markdown summaries. The e-comm copy (EC-02, EC-03, EC-05) was updated to "30+ years" per a user directive, applied via git commit cdc49a52. Upstream files were never updated. |
| **Root cause** | Human decision mid-pipeline changed a factual data point without backward propagation to upstream files. The system has no mechanism for retroactive updates when a downstream decision overrides an upstream value. |
| **Fix applied** | E-comm files were updated (commit cdc49a52: "fix: Update McGinley credential to 30+ years across e-comm specimens"). MEMORY.md was updated to lock "30+ years" as the canonical value. Upstream pipeline files (Soul.md, campaign-brief.json, offer-package.json, all core message packages) remain stale at "25+ years." |

**Step 2 — Assess recurrence potential:**

**HIGH.** This exact pattern has already recurred:

| Instance | Old Value | New Value | Upstream Updated? |
|----------|-----------|-----------|-------------------|
| McGinley credential | 25+ years → 30+ years | Applied to e-comm | No — Soul.md, campaign-brief.json, all core message packages still say "25+" |
| Guarantee terms | 30-day conditional (play 3 rounds) → 365-day unconditional (no questions asked) | Applied to EC-03, EC-05 | No — offer-package.json still says "30-day conditional" |
| Feature names | "Face Square Focus" → "T-Trac Alignment Lines"; "10-Piece Premium Construction" → "10-Piece Hammerhead Construction" | Applied to EC-05 assembled page | No — feature-package.json still uses old names |
| Founders 500 | Included in offer-package.json → Excluded from PDP (key decision #9) | Applied to EC-03 | No — offer-package.json still references Founders 500 |

This is a **systemic pattern**, not a one-off. Every human decision that overrides an upstream data point creates the same drift.

**Step 3 — Map to existing rules:**

| Candidate Rule | Assessment |
|---------------|-----------|
| Marketing OS Constraint Ledger | Closest mechanism. Tracks upstream decisions and downstream implications. But tracks FORWARD (upstream → downstream), not BACKWARD (downstream decision → upstream update). Would log the change but not trigger upstream propagation. |
| Marketing OS pipeline-handoff-registry | Validates handoff schemas between skills. Checks that required fields exist. Does NOT check that field values are consistent across the pipeline. |
| QE Source Verification Protocol (#7) | Says to "fetch the primary source directly at time of writing." If applied, would catch the inconsistency when a downstream skill reads the stale upstream file — but only if the skill re-verifies claims rather than trusting the upstream package. |
| QE Research Gate (#3) | Fires before analysis, not during execution. Would not catch mid-pipeline human overrides. |
| Marketing OS Law #2 | "Every microskill produces its own file." Ensures traceability but not consistency. Each file is correct for when it was written; the problem is that earlier files become stale. |

**No existing rule prevents this class of failure.** The closest mechanisms track decisions forward or validate schemas, but none propagate fact changes backward through the pipeline.

**Step 4 — Classify the gap:**

**(d) Net-new gap.** This doesn't fit any existing classification:
- Not (a) rule missing — there are rules about data integrity, but none about backward propagation
- Not (b) rule incomplete — the Constraint Ledger is complete for its stated purpose (forward tracking)
- Not (c) rule not followed — no rule exists to follow
- **(d) Net-new gap** — this is a mechanism class that neither the QE nor the Marketing OS currently addresses

**Step 5 — Propose a specific patch:**

**New mechanism: Fact Change Propagation Gate**

*Trigger condition:* When a human directive changes a factual data point that exists in upstream output files (credentials, specs, guarantee terms, feature names, pricing, product claims).

*Check (binary):*
1. Identify all upstream files containing the old value (search the output tree)
2. Present the full list to the operator: "These [N] files contain the old value [X]. The new value is [Y]."
3. For each file: update the value OR add a `[SUPERSEDED]` marker pointing to the canonical source

*Pass behavior:* All upstream files updated or marked. Constraint Ledger entry created with `supersedes` field. Proceed with downstream work.

*Fail behavior:* Block downstream execution until propagation is complete. Log as class-d issue.

*Implementation at each QE level:*
- **L1 (Prompt-only):** Add standing instruction: "When a human directive changes a factual data point, search all upstream output files for the old value and flag them before proceeding."
- **L2 (Prompt + files):** Add to Constraint Ledger schema: `supersedes` field that triggers a propagation checklist. Add a `FACT-CHANGES.md` file per project tracking all mid-pipeline overrides.
- **L3 (Agent harness):** Automated grep of output tree when a human directive contains a fact change. Programmatic flagging of stale files. Gate blocks downstream file writes until propagation is confirmed.

**Results:**
- What the mechanism caught: The Issue Classification Pipeline correctly identified this as a net-new gap (class d). The 4-category classification was clean — no ambiguity about which class this belongs to.
- What it missed: Nothing. The pipeline's value is in the classification and routing, and it classified correctly.
- Surprises: The recurrence assessment (Step 2) revealed this isn't a one-off — it's a 4-instance systemic pattern already present in the RS1 output. The same class of failure (McGinley credential, guarantee terms, feature names, Founders 500 exclusion) repeats every time a human decision overrides an upstream value. This is the Marketing OS's single largest quality gap.

**Verdict:** WORKS
**Evidence:** The Self-Learning Pipeline produced a correctly classified gap (class d), a specific and implementable patch (Fact Change Propagation Gate with L1/L2/L3 implementations), and — most valuably — surfaced that this is a 4-instance systemic pattern, not an isolated incident. The classification system was unambiguous and the routing (class d → propose new mechanism) was correct.
**Adaptation needed:** The patch should be implemented as a new protocol in the Marketing OS's `~system/protocols/` directory, with a corresponding validator in `.hooks/validators/` that checks for stale upstream values when a new human directive is received. The Constraint Ledger schema needs a `supersedes` field.
**Value if implemented:** HIGH — This addresses the Marketing OS's #1 systemic quality gap. Four instances of the same failure class in a single project run is a clear signal. The proposed gate is low-effort (grep the output tree) and high-impact (prevents every future instance of data drift).

---

## Phase 5: Synthesis and Recommendations

### Phase 5A: Overall Scorecard

| Component | Score | Weight | Weighted Score |
|-----------|-------|--------|----------------|
| Phase 1: Structural Analysis | 4.00 / 5.00 | 33.3% | 1.33 |
| Phase 2: Delta Balance | 3.25 / 5.00 | 20.0% | 0.65 |
| Phase 3: Live Testing | 5.00 / 5.00 | 46.7% | 2.33 |

**Delta Balance Formula:** 3.00 + (0.25 x 2 high-priority A items) - (0.25 x 1 D item) = 3.00 + 0.50 - 0.25 = **3.25**

**Phase 3 Scoring:** All 3 tests received WORKS verdict. WORKS = 5. Average = 5.00 / 5.00.

**Note:** Phase 4 (Stress Test) was skipped. Weights rescaled from the full evaluation (Phase 1: 25%, Phase 2: 15%, Phase 3: 35%, Phase 4: 25%) to exclude Phase 4, yielding Phase 1: 33.3%, Phase 2: 20.0%, Phase 3: 46.7%.

**OVERALL SCORE: 4.31 / 5.00**

**Letter Grade: B** (Strong — adopt with targeted improvements)

---

### Phase 5B: Top 5 Highest-Value Items

| Rank | Item | Source Phase | What To Do (specific action) | Effort | Expected Impact |
|------|------|--------------|-----------------------------|--------|-----------------|
| 1 | Fact Change Propagation Gate | Phase 3 (T3) | Create new protocol: when a human directive changes a factual data point, grep the output tree for the old value, present the stale file list, and block downstream execution until all upstream files are updated or marked `[SUPERSEDED]`. Add to Constraint Ledger schema. Implement as validator in `.hooks/`. | Med | Eliminates the Marketing OS's #1 systemic quality gap. 4 instances found in RS1 alone (credential, guarantee, feature names, Founders 500). |
| 2 | Kill Criteria Formalization | Phase 2 (A1) | Adopt the QE's default thresholds table and kill governance model. Add to SYSTEM-CORE.md: convergence loops > 3 = stop signal, time > 2x estimate = stop signal, scope drift = stop signal, assumption failure = immediate stop. Add 4 remediation paths (simplify, reframe, decompose, escalate). Add override logging requirement. | Low | Prevents escalation-of-commitment during long overnight runs. Law #7 says "STOP" but gives no thresholds or governance. RS1 Skills 04-09 ran overnight with self-approval — kill criteria would have flagged excessive time investment. |
| 3 | Post-Assembly Convergence Loop | Phase 3 (T2) | Add a 4-pass convergence step (Verify → Attack → Pre-Mortem → Revise) between EC-05 (Assembly) and EC-06 (Editorial). Apply the QE's material change taxonomy to classify findings. Loop until zero material changes or 3 iterations. | Low | RS1 live test found 7 material issues in the "finished" assembled page. This fills the gap between Arena (creative selection) and Scoped Verification (internal consistency). |
| 4 | Material Change Taxonomy | Phase 2 (A3) | Add the QE's 4-category taxonomy to the Scoped Verification Protocol and any future convergence loop: (1) factual error — always material, (2) logical/structural flaw — always material, (3) meaning-affecting wording — material, (4) cosmetic — never material. Include the test: "Would the target audience's understanding or decision change?" | Low | Removes ambiguity from verification passes. Currently, the Marketing OS's verification relies on score thresholds and binary gates but doesn't define what counts as a material finding during review. |
| 5 | Success-Pattern Tracking | Phase 2 (A2) | Create a success-pattern database alongside the existing issue log. After each completed project, capture: approach used, what worked, why it worked, actual effort vs. estimated effort. Use this data to calibrate future kill criteria thresholds and task triage decisions. | Med | The Marketing OS tracks failures (issue logger) and taste preferences (taste capture) but doesn't systematically track what methodologies/approaches produced good outcomes. This data would calibrate triage decisions and kill criteria thresholds based on actual reference class data. |

---

### Phase 5C: Top 5 Gaps to Report Back

| Rank | Gap | Why It Matters | Specific Recommendation |
|------|-----|---------------|------------------------|
| 1 | No upstream-downstream synchronization mechanism | The QE assumes a linear pipeline where facts established in research remain stable through production. In real multi-step workflows, human decisions routinely override upstream data (credentials, guarantee terms, feature names, pricing). Without backward propagation, every downstream override creates data drift that will corrupt future agent runs loading stale upstream files. The RS1 pipeline has 4 confirmed instances of this failure. | Add a "Fact Change Propagation" mechanism to the QE. When any factual data point changes during downstream execution, the system must identify and update all upstream references. This could be Mechanism #16 or an extension of Source Verification (#7). |
| 2 | No voice/taste governance for creative systems | The QE has no mechanism for maintaining creative voice consistency across a pipeline. For creative production systems (copywriting, content, design), voice governance is as fundamental as fact-checking. Without it, the AI produces generically competent output that lacks distinctive brand character. The Marketing OS addresses this with Soul.md, persona specimens, and anti-slop enforcement — mechanisms with no QE equivalent. | Consider adding a "Voice Governance" section to the QE, acknowledging that creative AI systems need mechanisms for voice calibration, taste constraint, and drift detection. The Soul.md concept (a living document capturing voice register, emotional range, and anti-patterns) is a portable pattern. |
| 3 | Convergence Loop assumes single deliverable | The QE's 4-pass loop works well for verifying a single document but doesn't address multi-deliverable pipelines where a change in one deliverable invalidates work in others. In the RS1 pipeline, changing the guarantee from 30-day to 365-day should have triggered re-verification of every file referencing the guarantee — but the Convergence Loop has no mechanism for cross-deliverable impact analysis. | Add guidance for "pipeline-level convergence" — when a material change is identified in one deliverable, assess which other deliverables reference the same data point and flag them for re-verification. This extends the loop from document-level to pipeline-level. |
| 4 | Arena Deliberation under-specified for creative generation | The QE's 3-perspective Arena (Strategist, Reframer, End User) is designed for evaluating strategic decisions. For creative generation (writing, design, naming), competition between multiple outputs produces better results than deliberation about a single output. The QE acknowledges this gap implicitly (Competitive Simulation is strategy-focused) but doesn't address creative competition. | Add a "Creative Competition" variant to Arena Deliberation — or a note explaining that for generative tasks, practitioners should implement multi-candidate competition with diversity enforcement rather than perspective-based deliberation. The Marketing OS's Arena is a worked example. |
| 5 | Context management is conceptual, not operational | "Treat context like a budget" is correct guidance but insufficient for systems running 6-7 sessions on a single pipeline. The QE's Context Efficiency Discipline (#2) doesn't address: zone-based degradation triggers, progressive compaction strategies, human-curated context reservoirs for cross-session continuity, or pre-flight planning to reduce executor context. These are operational necessities for long-running systems. | Expand Context Efficiency (#2) with implementation guidance for multi-session workflows. Consider adding a "Context Reservoir" template (human-curated essential context for session boundaries) and a "Compaction Strategy" worked example showing progressive degradation stages. |

### Phase 5C Extended: Additional Findings

| Rank | Gap | Why It Matters | Specific Recommendation |
|------|-----|---------------|------------------------|
| 6 | No mechanism for human edits that bypass the system | After the Marketing OS produces copy, the human edits the assembled page directly (normal workflow). These edits are not captured by the system — they exist only in the file diff. Feature names change, copy is added or removed, sections are restructured. The QE doesn't address this because it assumes AI produces and AI verifies. In practice, the human's edits are the most important signal in the system. | Consider a "Human Edit Capture" mechanism — when the human modifies a system-produced deliverable, the system should: (1) identify what changed, (2) classify changes (factual, structural, voice/taste, cosmetic), (3) route factual/structural changes to the Fact Change Propagation mechanism, and (4) route voice/taste changes to the learning system. |
| 7 | Overnight/unattended execution not addressed | The QE's human-in-the-loop assumption ("human approval gate is non-negotiable") doesn't account for overnight batch runs where no human is available. The RS1 pipeline ran Skills 04-09 overnight with self-approval. Kill Criteria (#14) says "always human decision" but doesn't define what happens when the human isn't available. | Add guidance for unattended execution: define which gates can be self-approved (low-stakes, well-precedented), which must wait for human review (novel, high-stakes), and what the system should do when it hits a gate that requires human approval during an unattended run (queue the decision, continue other work, or stop). |
| 8 | The 3-mechanism floor may be insufficient for complex creative tasks | The QE's floor (Research Gate + Success Criteria + one convergence pass) is designed for quick tasks where full process is overhead. But in the Marketing OS, even "quick" creative tasks benefit from expression anchoring (grounding in audience language) and voice calibration (loading the right specimens). The floor is right for analytical tasks but light for creative ones. | Consider a "creative floor" variant: Research Gate + Success Criteria + Voice Calibration + one convergence pass. The addition of a voice/taste loading step ensures creative output is on-brand even for quick tasks. |

---

### Phase 5D: Cross-System Intelligence

| # | Building Block from Our System | What It Does | Why the QE Should Consider It |
|---|-------------------------------|-------------|-------------------------------|
| 1 | **Soul.md** | Project-level taste constraint document with lifecycle (Seed → Expanded → Finalized). Captures voice register, emotional range, energy signature, anti-voice, audience voice samples, cultural context, positive/negative specimens, pacing signature, and taste decisions. Loaded at every skill. Evolves through the pipeline as research deepens understanding. | For any creative AI system, voice governance is as important as fact-checking. Soul.md is a portable pattern — it could be adapted for any domain where output needs to sound like a specific brand, person, or style. The lifecycle concept (seed with minimal info, expand with research, finalize with human curation) means it doesn't require upfront investment. |
| 2 | **Expression Anchoring Protocol** | Scores every creative candidate against three data sources BEFORE Arena: Quote Penetration (40% weight — semantic overlap with audience's actual words), TIER1 Pattern Match (30% — alignment with conversion-validated patterns), FSSIT Echo (30% — resonance with "Finally Someone Said It" candidates). Enables bottom-up expression generation from audience language. | The QE's Research Gate grounds analysis in evidence. Expression Anchoring grounds CREATIVE OUTPUT in evidence — it ensures that the words used in copy are the words the audience actually uses. This is the creative equivalent of the Research Gate: "ground your language before generating" rather than "ground your reasoning before analyzing." |
| 3 | **Adaptive Compaction Protocol** | 5-stage progressive context management triggered by zone transitions: (1) Upstream Package Summarization (~30-40% savings), (2) Prior Prose Windowing (~20-30%), (3) Context Reservoir Triage (Part 2 NEVER compressed), (4) Execution History Pruning, (5) Emergency Micro-Reservoir (~1,500 tokens survival mode). Each stage preserves the most valuable context while shedding the least valuable. | The QE's Context Efficiency Discipline describes the principle. This protocol is the operational implementation. For practitioners building multi-session systems, a concrete compaction strategy with specific savings percentages and preservation priorities is more useful than the guidance to "treat context like a budget." |
| 4 | **Constraint Ledger** | Per-task YAML tracking every upstream decision and its downstream implications. Loaded at every skill. Entries never deleted (only superseded). Ensures no downstream skill can unknowingly contradict an upstream decision — and when they must, the override is explicit and logged. | The QE's Production Pipeline doesn't track inter-mechanism dependencies at the data level. The Constraint Ledger solves this: every decision in the pipeline creates a constraint that downstream skills must respect or explicitly override. For multi-step workflows, this is essential infrastructure. |
| 5 | **Programmatic Validation Hooks** | 8 Python validators + shell dispatcher firing on every file write: gate_validator.py (forbidden statuses), output_validator.py (minimum sizes, naming), checkpoint_validator.py (required fields, timestamps), schema_validator.py (handoff compliance), proportionality_check.py (anti-gaming), token_estimator.py (context tracking), reminder_detector.py (degradation detection), convergence_detector.py (Arena convergence). | The QE describes Structural Gates as a pattern with 4 enforcement tiers. These validators are a worked example of L3 implementation — real code that fires on every file write and blocks completion on critical failures. The proportionality_check.py is especially novel: it detects when scores cluster suspiciously close to minimums, catching the "gate-passing optimization" failure mode. |

---

*Evaluation completed 2026-03-15. Phase 4 (Stress Test) not conducted. Score reflects Phases 1, 2, and 3 with rescaled weights.*
