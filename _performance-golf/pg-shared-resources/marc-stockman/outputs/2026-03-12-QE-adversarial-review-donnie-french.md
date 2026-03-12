# QE Adversarial Review — Donnie French (PG Marketing OS)
## Date: 2026-03-12
## LLM Used: Claude Opus 4.6 (claude-opus-4-6) via Claude Code CLI

---

## Methodology

This review was conducted by having Claude Opus 4.6 read every markdown file in the Quality Engine Package v2 (README, Quality-Engine-Explainer, AI-Mastermind-QE-Package-Intro, QE-Research-Synthesis-Report, Skill-Registry, Rules-and-Decisions-Log, and all 35 skill files including deprecated ones), then perform a deep structural exploration of the PG Marketing OS system (85 skills across 11 engines, SYSTEM-CORE.md, AGENT.md, all protocol files, all hook validators, all anti-degradation files, the Arena system, learning logs, and production outputs). The analysis maps every QE mechanism against the Marketing OS's existing architecture.

---

### Section 1: Overall Assessment

- **Strongest element of the QE (and why):** The four-tier enforcement model (Behavioral → Structural → Event-Driven → Context-Isolated) is the single most important architectural insight in this package. It names the exact failure mode that every AI system hits — behavioral rules degrade under context pressure — and provides three escalation paths beyond writing more rules. The class-c violation tracking (3+ violations = structural conversion candidate) gives the system a principled mechanism for knowing WHEN to escalate enforcement, not just how. This is genuinely novel in how clearly it articulates the problem and the graduated response.

- **Weakest element of the QE (and why):** The 16-skill production pipeline (Layer 2) is the weakest element — not because it's wrong, but because it's generic. Skills 1-12 describe a universal quality process (triage → decompose → reason → draft → verify → stress-test → ship) that any competent AI will approximate by default. The pipeline doesn't encode domain knowledge, doesn't specify what "good" looks like for any particular output type, and doesn't provide the AI with examples of excellence. Compare this to the Marketing OS, where each of the 85 skills has its own ANTI-DEGRADATION.md with specific failure patterns, minimum thresholds (e.g., "1,000 quotes minimum — HALT if not met"), specimen injection (395+ conversion-validated controls), and 7-persona Arena competition. The QE pipeline tells the AI to "verify" and "stress-test" but doesn't give it the teeth to know what those words mean for a specific deliverable type.

- **Biggest blind spot you see:** The QE has no mechanism for **competitive quality generation** — no equivalent of the Arena layer. All quality enforcement in the QE is post-production (audit, verify, stress-test AFTER the draft exists). The Marketing OS generates 7 competing outputs per round, runs adversarial critique against each, forces learning briefs between rounds, and requires 3 full rounds before synthesis. This means the QE's first draft is its only draft — all quality work is corrective, never generative. The research synthesis cites Tony's Arena system as evidence but doesn't propose adopting competitive generation as an upgrade. This is the single largest capability gap.

- **One-line verdict:** Exceptional diagnosis of WHY AI quality fails, with a strong enforcement architecture — but the QE optimizes for preventing bad output rather than generating excellent output, and lacks the domain-specific teeth that turn principles into production results.

---

### Section 2: Phase 1 Upgrade Review

**Upgrade 1: Context-Isolated Quality Checks**
- **Rating: 4**
- **Failure modes not addressed:**
  1. **Subagent context starvation.** The protocol says "Pass only: (1) the deliverable, (2) success criteria, (3) relevant quality rules." But in copywriting, the quality of a headline can only be evaluated against the DSI, the target avatar's language, the competitive landscape, and the preceding copy flow. Stripping context to prevent contamination also strips the evaluator's ability to judge domain-specific quality. The Marketing OS solves this differently — the Arena's adversarial critic operates in the SAME context but from a hostile persona (dedicated Critic role, not the same AI re-reading its work). Context contamination is real, but context starvation produces false negatives (flagging good work as bad because the evaluator doesn't understand why a decision was made).
  2. **Subagent cost at scale.** If you're running 85 skills across 11 engines (as the Marketing OS does), spawning a subagent verifier for each skill's output would be prohibitively expensive. The protocol doesn't specify WHEN to use context-isolated checks vs. in-context checks. The Marketing OS handles this with tiered effort: Full tier gets 3-round Arena, Standard gets 1-round, Quick skips Arena entirely. The QE needs a similar triage mechanism for context isolation.
  3. **The ASI-ARCH refinement ("isolate judges, not builders") is correct but under-specified.** How does the system decide what's a "production" task vs. a "verification" task when the same AI is doing both in sequence? This decision point needs explicit criteria.
- **What would you change:** Add a context-isolation triage step: only isolate for (a) external-facing deliverables, (b) deliverables where the AI expressed low confidence (Skill 10 uncertainty score < 7), or (c) deliverables that failed a previous in-context quality pass. For everything else, use in-context adversarial critique with a forced perspective shift (the Marketing OS's Critic persona approach).

**Upgrade 2: Event-Driven System Reminders**
- **Rating: 5**
- **Failure modes not addressed:** The 8 proposed detectors are well-chosen and map directly to real failure modes. The Marketing OS independently built the same mechanism (reminder_detector.py with 7 detectors: abbreviation, rushing, stale reads, synthesis, gate drift, context pressure, proportionality clustering). The convergence is strong evidence this is the right approach.
  - One gap: neither system addresses **false positive fatigue**. If detectors fire too frequently on non-issues, the operator (or the AI itself) starts ignoring them. The Marketing OS's token_estimator.py partially addresses this by only escalating reminders as zones change (GREEN → YELLOW → ORANGE → RED → CRITICAL), but the behavioral detectors don't have a similar escalation model. The QE should consider a "reminder confidence threshold" — only fire when the detector is above a certain confidence that the failure mode is actually occurring.
- **What would you change:** Nothing structural. This is the most portable and immediately valuable upgrade in the package. The 8 detectors are the right 8. Suggest adding a 9th: **Specimen/Example Starvation Detector** — fires when the AI is generating creative output without having loaded any reference examples or specimens. This is the #1 failure mode in copywriting: the AI generates from its training distribution instead of from proven controls.

**Upgrade 3: Structural Gates (9 gates, 4 tiers)**
- **Rating: 4**
- **Failure modes not addressed:**
  1. **The Content Substance tier is the right diagnosis but lacks implementation specificity.** Tony and Rich both identified that gates shift failure from "skipping" to "faking." The QE proposes "5 detection heuristics for faking behavior" but doesn't list them. The Marketing OS addresses this more concretely: minimum file size thresholds per skill type (1KB for loaders, 2KB for evaluations, 5KB for complex generation), proportionality_check.py that detects threshold clustering (>50% of scores at minimums = problematic optimization), and checkpoint YAML files that must list every microskill output with file sizes. These are specific, measurable, automatable checks — not heuristics the AI self-reports.
  2. **Gate 5 (R-07 Research Gate) has a loophole.** The exception "topic already researched this session" allows the AI to cite early-session research for late-session claims, even if the claims are in a different domain than the original research. The Marketing OS handles this by requiring per-skill research loading at Layer 0 — each skill loads its own upstream packages fresh, not from session memory.
  3. **No gate addresses output completeness against a spec.** The Marketing OS's pipeline-handoff-registry.md defines required fields per handoff file (e.g., Skill 03 must output three_part structure with all sub-fields non-empty, truth_score >= 6.0, mechanism_alignment >= 7.0, composite_score >= 6.5). If ANY required field is missing or empty, the downstream skill HALTs at Layer 0 input validation. The QE has no equivalent mechanism — Quality Gate (Skill 12) checks "success criteria" but those criteria are defined ad hoc per task, not structurally per output type.
- **What would you change:** Add measurable thresholds to the Content Substance tier. Minimum word counts per output type. Required section headers per deliverable category. Schema validation for structured outputs. Make it so the AI can't game the gate with a thin file that technically "exists."

---

### Section 3: Roadmap Review (Upgrades 4-12)

- **Which upgrade should be prioritized next and why:** **Upgrade 5 (Programmatic Verification Layer)** should be the immediate Phase 2 priority. The Marketing OS already proves this works — gate_validator.py, output_validator.py, checkpoint_validator.py, schema_validator.py, and proportionality_check.py run as actual Python code in Claude Code hooks. They execute on every file write, return exit codes, and can block session completion. They cannot rationalize. They cannot be forgotten. They cannot be faked. Moving binary checks (file existence, field presence, size thresholds, schema compliance) from LLM self-report to code is the single highest-leverage remaining change. Ben's math proves why: 80% per step x 10 steps = 11% end-to-end. Programmatic checks run at ~100% for binary verifications.

- **Which upgrade should be deprioritized or cut and why:** **Upgrade 7 (Pre-QE Strategic Gate)** should be deprioritized. The "Three Questions" framework (What's the system? What must it do? How, specifically?) is good strategic discipline but it's a thinking framework, not a quality mechanism. It's already implicit in Q1 (Structured Pre-Action Reasoning) and Skill 0 (Prompt Optimizer). Making it a separate upgrade adds ceremony without adding enforcement. If Marc finds himself building the wrong thing, the fix is better objective-setting with the operator, not another gate for the AI.

- **Missing upgrade that should be added:**

  **Upgrade 13: Competitive Generation Layer (Arena Protocol)**

  **Principle:** For any creative or strategic output, generate multiple competing versions from different analytical perspectives before selecting and synthesizing the best elements.

  **Why:** The QE's entire quality model is corrective — it audits, verifies, and stress-tests a single draft. The Marketing OS's Arena layer is generative — it produces 7 competing outputs per round across 3 rounds, runs adversarial critique on each, constructs learning briefs between rounds, and synthesizes phrase-level hybrids from the top candidates. This is the difference between editing one essay and choosing the best paragraphs from 21 essays. The research synthesis itself cites the evidence: AutoGen multi-agent achieved 2x performance on the hardest GAIA questions; Anthropic's multi-agent outperformed single-agent by 90.2%. The QE uses these citations to justify context-isolated CHECKS but misses the larger implication: multiple competing generations, not just multiple checking passes, is where the quality ceiling lifts.

  **Scope:** This doesn't need to be 7 personas x 3 rounds for every task. A minimum viable version: for strategic/creative outputs, generate 3 competing approaches (each from a different analytical frame), run a structured comparison, and synthesize the best elements. The key mechanism is that the AI must CHOOSE between alternatives, not just refine a single draft. Choice forces discrimination. Discrimination forces quality.

  **Quantitative evidence:** Already in the synthesis report — the 90.2% multi-agent improvement and 2x GAIA performance apply more to competitive generation than to isolated checking.

---

### Section 4: Source Synthesis Check

- **Any source misinterpreted or misapplied:**
  - The Anthropic multi-agent research finding (+90.2% improvement) is correctly cited but narrowly applied. The synthesis uses it only to justify context-isolated quality CHECKS (Upgrade 1). But the Anthropic finding was about multi-agent RESEARCH AND PRODUCTION — the Opus lead directed Sonnet subagents to do parallel research and synthesis work, not just verification. The QE extracts only the verification implication and misses the production implication: multiple agents generating competing work products is at least as valuable as multiple agents checking a single work product.
  - Fran Rengel's "agreement rate" metric (85-90% AI recommendation acceptance, trending toward 95%) is cited as evidence of self-learning convergence. This is true but incomplete. A rising agreement rate could also indicate the AI learning to tell the operator what they want to hear — confirmation bias, not convergence. The Marketing OS addresses this with adversarial critique as a structural requirement: the Critic's job is to DISAGREE, and agreement between the Critic and the Generator is a yellow flag, not a green flag.

- **Any insight missed from a source you're familiar with:**
  - Rich Schefren's context isolation insight ("80% of the difference between agents and skills is that a skill is contaminated by the current context") is correctly captured. What's missed is Rich's related insight about SPECIMEN INJECTION — the idea that AI generates from its training distribution by default, and the only way to shift the distribution is to load specific examples of excellence into active context before generation. The Marketing OS implements this as a dual-system (type-indexed structural patterns + persona-specific voice specimens from 100+ real copywriting controls). The QE has no equivalent. Without specimen injection, context-isolated checks are verifying output against the AI's generic quality standard, not against the standard of proven excellence in the domain.

- **Attribution errors (wrong person credited):** None detected. Attribution appears accurate throughout.

---

### Section 5: From Your System's Experience

- **Pattern or failure from YOUR system that the QE doesn't account for:**

  **The "Optimization to Minimums" failure mode.** When the Marketing OS introduced minimum score thresholds (e.g., voice preservation >= 7.0, threading >= 7.0), the AI optimized TO the minimums rather than PAST them. Over 50% of scores would cluster at exactly the threshold — technically passing but not actually good. The Marketing OS built proportionality_check.py specifically to detect this: if >50% of scores in a package cluster at the minimum threshold, the package is flagged as "problematic optimization." The QE's structural gates check binary pass/fail but don't detect this subtler failure mode where the AI games the gate by producing the minimum acceptable output.

- **Rule or mechanism from YOUR system that the QE should adopt:**

  **The 7 Laws pattern — mandatory, numbered, non-negotiable, fits on one screen.** The Marketing OS distills its most critical rules into exactly 7 Laws that every skill must follow. They're short enough to hold in active context, specific enough to be unambiguous, and numbered so violations can be cited precisely ("Law 3 violation: gates are PASS/FAIL only"). The QE has 28 rules (R-01 through R-28), 13 directives (D-01 through D-13), 12 accelerator rules (Q1-Q6, L1-L6), and 5 standing commands — 58 behavioral constraints total. Under context pressure, 58 constraints cannot all stay active. The QE's own research confirms this: "instructions are reliably violated after 30+ tool calls." The fix isn't more enforcement tiers — it's distilling the 58 constraints down to 7-10 non-negotiable Laws that are ALWAYS in context, with everything else loaded conditionally.

  The QE partially addresses this with tiered loading in session-bootstrap v2.4 (~48% token reduction), but tiered loading is about what SKILLS are in memory, not what RULES are in memory. The rules themselves — all 28 of them — are in marc-ops-framework, which loads every session. 28 rules in a single file means the AI's attention is spread across all 28 even when only 5-7 are relevant to the current task.

- **Biggest lesson from YOUR AI work that's missing here:**

  **Examples beat rules.** The single biggest quality lever in the Marketing OS is not the rules, not the gates, not the Arena — it's the SPECIMENS. Loading 2-3 actual examples of excellent output before the AI generates shifts the output distribution more than any number of behavioral constraints. The QE is entirely rules-based. It tells the AI what NOT to do (28 rules), how to CHECK what it did (16-skill pipeline), and how to ENFORCE the checks (4-tier model). But it never shows the AI what GREAT looks like. A "Specimen Injection Protocol" — loading 2-3 curated examples of excellent output for the current task type before generation begins — would be the single highest-leverage addition to the QE, ahead of any of the 12 proposed upgrades.

---

### Section 6: Stress Test Results

- **Scenario where the QE would fail completely:**

  **Novel creative task with no existing runbook.** Marc asks the AI to write a sales page for a new product category. The QE pipeline fires: Skill 0 optimizes the prompt, Skill 1 triages, Skills 4-6 decompose and draft, Skills 7-12 verify and stress-test. But the AI has no examples of excellent sales pages in context. No specimens. No competitor analysis loaded. No proven controls to anchor against. The 16-skill pipeline runs perfectly — and produces a technically correct, thoroughly verified, mediocre sales page. Every gate passes. The audit finds no issues. The output is a B+. The QE literally cannot detect this failure because it has no reference point for what an A looks like. The Marketing OS handles this by requiring specimen loading at Layer 0 of every skill and running 7-persona Arena competition — even if the first draft is mediocre, 20 more competing drafts from different analytical frames will surface better approaches.

- **Scenario where the QE would degrade silently (work but produce bad output):**

  **Long multi-session project where early decisions constrain later quality.** The QE's self-learning loop captures mistakes WITHIN deliverables but doesn't capture strategic drift ACROSS deliverables. If Marc's AI makes a suboptimal framing choice in Session 1 that gets baked into all subsequent work, the QE will faithfully verify, stress-test, and audit every downstream deliverable against the wrong frame. The audit will pass because the individual deliverables are internally consistent. The Marketing OS addresses this with Foundation Integrity Checks (comparing foundation packages against actual prose at midpoint and 75% completion) and Active Recitation (requiring the AI to write out 5 strategic anchors verbatim from source packages, then drift-check). These catch strategic drift, not just tactical errors.

- **What happens after 50+ tool calls in a single session:**

  The QE's event-driven reminders (Upgrade 2) are designed for exactly this — 8 detectors sweep at 3 checkpoints, including "after every 10 tool calls." This is good architecture. The Marketing OS's token_estimator.py provides complementary data: it tracks cumulative context load across 5 zones (GREEN/YELLOW/ORANGE/RED/CRITICAL) and adjusts MC-CHECK frequency as zones escalate. The QE should consider adding a similar zone-based escalation to its reminder frequency — more frequent checks as context grows, not uniform frequency throughout. After 50+ tool calls, the QE's behavioral rules (all 28 of them in marc-ops-framework) will have degraded significantly in the AI's attention. The structural gates and event detectors will still fire, but any rule that ISN'T structurally enforced is effectively dormant by this point. This is why the "7 Laws" distillation matters — after 50+ tool calls, you need 7 rules in active attention, not 28.

- **What happens when the user disagrees with the AI's quality assessment:**

  The QE has no explicit protocol for this. D-02 says "Present Options, Don't Decide" — but that's about strategic decisions, not quality disputes. If Marc says "this passed your audit but it's not good enough," the QE would log the issue (R-06, issue-logger), potentially promote it to a rule (L2), and produce a Learning Ledger entry. But there's no mechanism for the AI to understand WHY Marc's quality bar is different from what the audit caught. The Marketing OS handles this with human selection gates (BLOCKING checkpoints where the AI presents 9-10 candidates and the human selects or gives feedback) and learning log entries that capture the specific quality dimension the human valued ("Human-directed hybrid combining Makepeace's villain architecture + Bencivenga's belief-gap specificity outperformed pure outputs"). Over time, these entries create a model of what "good" means to THIS operator for THIS type of output. The QE's learning loop captures mistakes but doesn't capture preferences.

---

### Section 7: Wild Card

**1. The "Building Code" metaphor is exactly right — and the QE should lean into it harder.**

Building codes don't tell architects how to design beautiful buildings. They tell architects what NOT to do so the building doesn't fall down. The QE is an excellent building code — it prevents structural failures (hallucination, regression, context loss, rule forgetting). But building codes alone don't produce great architecture. You also need pattern books (specimen injection), design competitions (Arena/competitive generation), and master builders (domain-specific quality standards). The QE should explicitly position itself as "the building code layer" and acknowledge that a complete quality system also needs a "design excellence layer" on top. This isn't a weakness — it's a clear scope definition that helps operators know what the QE provides and what they need to add.

**2. The QE's complexity is approaching a tipping point.**

25 skills, 28 rules, 13 directives, 12 accelerator rules, 5 standing commands, 10 structural gates, 8 event detectors, 4 enforcement tiers. The QE's own R-04 (Substance Ratio) says 70%+ of effort should be on substance, not ceremony. The reflect command's Complexity Audit dimension exists specifically to check this. But the system's growth trajectory (16 skills → 25 in one week; 20 rules → 28) suggests that the self-learning loop is promoting issues to rules faster than obsolete rules are being retired (G-6 is still OPEN). The Marketing OS handles this with protocol manifests (priority-banded loading where only ~4,600 tokens of core rules load always, with everything else conditional) and effort tiers (Quick/Standard/Full). The QE's tiered loading (session-bootstrap v2.4) is a step in this direction but doesn't go far enough — all 28 rules still load via marc-ops-framework on every session, regardless of task type.

**3. Platform gap: Perplexity Computer → Claude Code translation is harder than the package suggests.**

The QE was built on Perplexity Computer, which has different architectural primitives than Claude Code. Key differences:
- Perplexity Computer has `save_custom_skill` / `load_skill` / `run_subagent` — Claude Code has `.claude/rules/`, Agent tool, and hooks
- Perplexity Computer's "structural gates" are pseudo-structural (behavioral checks in code-like format) — Claude Code hooks are ACTUALLY structural (Python scripts that return exit codes and can block actions)
- Perplexity Computer's session-state files live in a `/workspace/` that persists within a thread — Claude Code's files live in the actual file system with git version control
- The QE's `share_file` concept (R-11, Gate 4) has no equivalent in Claude Code because all files are already visible in the project directory

The "building code, not construction manual" philosophy is correct, but the README's platform translation section (Claude Code = paste framework into CLAUDE.md, put skills in .claude/rules/) significantly understates the adaptation work. A Claude Code implementation would look architecturally different from the Perplexity Computer implementation — it would use Python hook validators instead of skill-embedded gates, git for version control instead of file versioning, and the Agent tool for context isolation instead of `run_subagent`.

**4. The quantitative evidence base is impressive but should be presented more honestly.**

Part 5a cites measured improvements from +11% to +340%. These numbers are real, but they come from very different contexts (HumanEval coding benchmarks, Minecraft exploration, WebArena web tasks, GAIA general assistant benchmark). None of them measure quality improvement in the specific domain the QE targets — business knowledge work. The "+11% to +340%" framing in the package intro implies these are measured improvements of the QE itself, when they're actually improvements of the underlying mechanisms in other contexts. This is exactly the kind of attribution precision that R-20 is designed to catch. The evidence base would be more credible if it explicitly said: "No one has measured these improvements on business knowledge work specifically. We're extrapolating from the mechanism-level evidence." Honesty over reassurance — D-standing preference.

**5. What I'd adopt tomorrow if I were Marc.**

In priority order:
1. **R-07 (Research-Before-Reasoning Gate)** — already have this in the Marketing OS as part of Skill 01 Deep Research, but the structural enforcement pattern (Gate 5) is cleaner and more portable
2. **The class-c violation tracking → structural conversion pipeline** — this is genuinely novel. The Marketing OS doesn't have a principled mechanism for knowing when a behavioral rule needs to become a structural gate. The QE's "3+ violations = conversion candidate" is elegant and actionable
3. **The Learning Ledger format (Learned / Memorialized / Activated)** — the Marketing OS has learning logs with 70+ entries but they're unstructured. The three-column taxonomy forces the question "did this learning actually change anything?" which is the difference between journaling and self-improvement
4. **R-17 (Feature Regression Prevention)** with the 8-dimension comparison — the Marketing OS's output_validator.py checks file sizes but doesn't compare new vs. old across 8 dimensions. The regression check is more thorough
5. **The Unified Audit convergence loop** — "loop until zero material changes" is a better stopping criterion than "run the audit once." The Marketing OS's Arena has 3 fixed rounds; applying the convergence loop to the Arena (stop when a round produces no material improvement over the previous) could reduce overhead on easy tasks and increase thoroughness on hard ones

**6. What Marc should consider adopting from the Marketing OS.**

In priority order:
1. **Specimen injection** — load examples of excellence before generation, not just rules about what to avoid
2. **Minimum file size thresholds per output type** — makes the Content Substance tier concrete and automatable
3. **Proportionality/clustering detection** — catches the "optimize to minimums" failure mode that binary gates miss
4. **The 7 Laws pattern** — distill the most critical rules down to a set that fits on one screen and never leaves active context
5. **Effort tiers (Quick/Standard/Full)** — not every task needs the full 16-skill pipeline. Match ceremony to stakes.

---

*This review was conducted adversarially as requested. The QE is a sophisticated and well-documented system — the criticisms above are about where it can improve, not whether it has value. The four-tier enforcement model, the class-c violation tracking, and the self-learning loop are genuine innovations that the Marketing OS would benefit from adopting. The gaps identified (no competitive generation, no specimen injection, complexity tipping point, 58 constraints competing for attention) are solvable within the QE's existing architecture.*

*Built on the PG Marketing OS (85 skills, 11 engines, 7 automated hook validators, 7-persona Arena, MC-CHECK metacognitive protocol, 5-zone context management) as the comparison baseline.*
