---
name: audit
description: "Convergence-loop quality gate with Learning Ledger. Unified audit command: Step 0 orientation, Pre-Flight, then loop Passes 1-4 until zero material changes, then system learning and share."
---

# Audit Command Protocol

**Version:** 3.4 | March 11, 2026
**Trigger:** Marc says "audit" (or "self audit", "check", "check yourself", "run a check", "checkpoint" — all route here)

---

## Action

Stop all current work. Execute the audit protocol on the most recent deliverable or body of work. The protocol runs Step 0 (orientation) once, then Pre-Flight (operational hygiene checks) once, then loops Passes 1–4 until convergence, then runs Pass 5 (system learning + Learning Ledger) and Pass 6 (share) once each.

**Convergence rule (HARD GATE):** If Pass 4 applies any material changes, loop back to Pass 1 and run the full cycle again. Continue looping until a complete Pass 1→2→3→4 cycle produces zero material changes. Only then proceed to Pass 5 (system learning + Learning Ledger) and Pass 6 (share). Do not stop early. Do not ask Marc whether to continue. The loop is automatic.

---

### Step 0: Pre-Audit Orientation (runs once)

Before any pass begins, answer these six questions. Document the answers at the top of the audit log.

**1. What is this deliverable?**
- Type: strategic proposal, PRD, term sheet, technical spec, creative brief, operational document
- Domain: financial/legal, strategic/architecture, technical/specification, creative/communications, operational/process
- Audience: Marc only, Marc + Jeff, external stakeholders, implementation team, attorney

**2. What are the success criteria Marc defined?**
- Pull from the deliverable itself, from memory, or from the conversation
- If no explicit criteria exist, state what implicit criteria are being assumed and flag this for Marc

**3. What is the highest-risk area?**
- Factual accuracy? Structural completeness? Tone/audience fit? Technical correctness? Internal consistency? Attribution accuracy?
- Base on domain classification:
  - Financial/legal → factual accuracy
  - Strategic → structural completeness + pre-mortem
  - Technical → adversarial testing
  - Creative → tone/audience

**4. Based on 1–3, which passes need the heaviest attention?**

Assign weight to each pass: Heavy (2x effort, 2x claims checked) / Standard / Light (abbreviated, material items only)

Default weights by domain:

| Domain | Pass 1 (Verify) | Pass 2 (Adversarial) | Pass 3 (Pre-Mortem) |
|--------|----------------|---------------------|-------------------|
| Financial/Legal | Heavy | Standard | Standard |
| Strategic/Architecture | Standard | Standard | Heavy |
| Technical/Specification | Standard | Heavy | Standard |
| Creative/Communications | Light | Heavy | Light |
| Operational/Process | Standard | Standard | Standard |

**5. R-07 Research Gate: What needs live verification?**
- Scan the deliverable for every factual claim about current state: API capabilities, pricing, legal status, technical specs, tool features, platform limitations
- For each: was this claim sourced from a live web search during creation, or from training data / memory?
- Any claim not backed by a live source is flagged for mandatory live verification in Pass 1
- This converts Pass 1 from purely post-hoc checking into targeted, proactive research on the highest-risk claims

**6. Checkpoint file initialization**
Write `/workspace/audit-checkpoint.md`:
```
---
Protocol: AUDIT
Status: IN PROGRESS
Current Step: 0
Loop: 1
Deliverable: [name and path]
Domain: [classification]
Risk Focus: [highest-risk area]
Timestamp: [current time]
---
```

---

## Pre-Flight: Operational Hygiene (runs once, after Step 0, before convergence loop)

These checks verify the operational infrastructure is accurate and current before the deliverable-focused convergence loop begins. Fix any issues found before proceeding to Pass 1.

### PF-0: Operational File Existence Gate (HARD GATE)

Before checking accuracy, verify each operational file has been populated proportional to the work done this session. This catches the failure mode where files exist as empty scaffolding while significant work has been completed.

For each file, count entries vs. session actions:

| File | Minimum Expected |
|------|------------------|
| `commitment-registry.md` | At least 1 entry per commitment made or fulfilled this session |
| `reasoning-log.md` | At least 1 entry per major action taken this session (skill created, skill modified, architectural decision) |
| `staleness-map.md` | At least 1 entry per artifact created or modified this session |
| `session-learning-log.md` | At least 1 entry per lesson learned or mistake caught (may be 0 if session was error-free) |
| `session-state.md` | Must reflect current task, not a stale prior state |

**Scoring (tempo-aware per Q1 tempo scaling):**
- If any file (except session-learning-log) has 0 entries but the session has completed 1+ major actions: **FAIL — R-24 violation.** Populate the file before proceeding.
- If any file has entries but the count is significantly below what the session warrants (e.g., 2 entries for 8 actions): **FLAG — likely incomplete.** Review and fill gaps.
- If all files are proportionally populated: **PASS.** Proceed to PF-1.
- **Tempo adjustment:** For sessions where Q1 classified work as light-tempo, "proportional" means session-state.md updated + at least one-line reasoning log entries. Full ceremony across all files is expected only for standard and strategic tempo.

This gate enforces R-24 (Milestone Persistence). Any FAIL here is logged as a class-c execution discipline issue in the session learning log.

### PF-1: Commitment Accuracy

Read commitment registry (`commitment-registry.md`). Verify every status against actual artifacts:
- For each commitment marked BUILT: verify the artifact exists at the stated path
- For each commitment marked IN PROGRESS: verify work has actually progressed
- For each commitment marked PLANNED: verify it hasn't been superseded or abandoned
- Flag any status that doesn't match reality

### PF-2: Reasoning Log Completeness

Read reasoning log (`reasoning-log.md`). Verify:
- All entries have complete pre-action columns (A–F)
- All completed actions have post-action columns (G–J) filled
- Flag any TBD entries or incomplete post-action columns
- Per R-16: if the log hasn't been updated in 2+ hours or after 3+ major actions, flag as stale

### PF-3: Staleness Sweep

Read staleness map (`staleness-map.md`). Check all artifacts for currency against recent work:
- Any artifact referenced in current work that hasn't been updated to reflect recent changes
- Any file paths in documents that point to moved or deleted files
- Any rule counts, version numbers, or dates that no longer match current state
- Per L3: flag anything not updated in 2+ hours or after 3+ major actions

### PF-4: File Visibility

Verify every file created or modified since last audit has been shared with Marc via share_file (R-11):
- Check conversation history for share_file calls
- Compare against files modified in workspace
- Flag any file that was created or updated but never shared

### Pre-Flight Resolution

- Fix all issues found in PF-0 through PF-4 before proceeding
- Document findings and fixes in the audit log under "Pre-Flight"
- If no issues found, note "Pre-Flight clean" and proceed

**Update checkpoint:** Current Step: Pre-Flight, findings count, fixes applied

---

## Convergence Loop (Passes 1–4, repeats until clean)

Each cycle through Passes 1–4 is one "loop." Track the loop number in the checkpoint.

### Pass 1: Verification

Cross-check every factual claim, number, date, attribution, and external reference in the deliverable against its source material. Weight per Step 0 classification.

- For each claim: identify the source, verify accuracy, flag any claim that cannot be verified
- For unverifiable claims: mark as "ASSUMED CORRECT — source not accessible" and note in findings

**R-20 Source Verification sub-pass:** For every Tier 1 claim in the deliverable (pricing, plan names, feature availability per tier, API specs, compatibility, vendor timelines, any claim driving a recommendation):
1. Was the primary source (vendor's own page) fetched at writing time, not inherited from a prior search or comparison site?
2. Does the citation point to the vendor's own page?
3. If pricing is cited, was the vendor's pricing page fetched directly?
4. Flag any Tier 1 claim that relies on secondary sources, unfetched URLs, or cached results from a different session

**Update checkpoint:** Current Step: 1, Loop: [N], findings count

---

### Pass 2: Adversarial Testing

Attack the deliverable's claims, logic, and structure. Adopt a hostile skeptic perspective. Weight per Step 0 classification.

- Challenge assumptions: "What if this assumption is wrong?"
- Test logic chains: "Does conclusion X actually follow from premises Y and Z?"
- Identify weaknesses a critic, competitor, or skeptical reader would exploit
- Check for internal consistency — do different sections contradict each other?
- Look for unstated assumptions that could fail silently

**Work quality sub-pass:** Assess the substance and quality of the deliverable itself:
- Is the work substantive? (R-04 — 70%+ substance, not quality theater)
- Is there spec-as-goal? (Degradation Pattern 2.2 — the AI described what should be done rather than doing it)
- Is there quality degradation? (Patterns: lazy output, invisible refusal, enthusiastic agreement, assumption cascading, self-congratulation, scope drift)
- Are visual assets properly formatted? (Q3 — fonts readable, no text wrapping/truncation/overflow)

**Update checkpoint:** Current Step: 2, Loop: [N], findings count

---

### Pass 3: Pre-Mortem

Assume the deliverable has been delivered and has failed to achieve its purpose. Work backward to identify why.

- "What would cause Marc/the audience to say this didn't work?"
- "What's missing that would make this incomplete?"
- "What could be misunderstood?"
- "What would be embarrassing to get wrong?"
- "If I were a competitor reading this, where would I attack?"

**Update checkpoint:** Current Step: 3, Loop: [N], findings count

---

### Pass 4: Revise

Apply all material findings from Passes 1–3 to the deliverable.

- Only material changes — findings that affect accuracy, completeness, or the deliverable's ability to achieve its purpose
- Do NOT apply cosmetic changes, stylistic preferences, or changes that don't affect substance
- Document each change: what changed, why, which pass surfaced it
- Record the count of material changes applied

**CONVERGENCE GATE (HARD GATE):**
- If material changes applied > 0: Log "Loop [N] applied [X] material changes. Looping." Update checkpoint to Loop [N+1]. Return to Pass 1.
- If material changes applied = 0: Log "Loop [N] clean. Convergence reached." Proceed to Pass 5 (System Learning).

**Update checkpoint:** Current Step: 4, Loop: [N], changes applied count, convergence status

---

## Post-Convergence (runs once)

### Pass 5: System Learning + Learning Ledger (MANDATORY — runs on every audit)

Before sharing with Marc, evaluate every material finding from the convergence loop for self-learning potential. This is the closed-loop mechanism that turns audit findings into permanent system improvements. By running this before sharing, the Learning Ledger is assembled and included in the final output Marc sees.

**Step 1: Enumerate all material findings.**
List every finding from all convergence loops that resulted in a material change (Pass 4 changes) or was flagged as significant in Passes 1–3. Do not filter by recurrence — a single finding can justify a rule if the class of problem is high-risk.

**Scope expansion (HARD GATE):** Also enumerate any material problems encountered during audit setup — Step 0 (orientation), Pre-Flight, session recovery, and skill reloading. If `load_skill` overwrote a modified workspace file, if a checkpoint was stale, if session recovery required manual reconstruction — these are all material findings that must enter the learning pipeline. The audit's learning scope is the entire audit execution, not just the convergence loop. Any problem encountered anywhere during the audit is learning material.

**Step 2: For each material finding, assess recurrence potential.**
Ask: "Could this class of problem recur in future sessions?" Not just "has it recurred" — assess whether the conditions that caused it could arise again.
- If the answer is clearly no (one-time, context-specific issue): note as NON-RECURRING and move to the next finding.
- If the answer is yes or uncertain: continue to Step 3 for this finding.

**Step 3: Map to existing rules.**
For each finding with recurrence potential: which Directive, Preventive Rule, or Accelerator rule should have prevented this?
- If a clear rule maps: continue to Step 4.
- If no rule maps: note as UNMAPPED and continue to Step 4.

**Step 4: Classify the gap.**
- (a) Rule is missing — no rule covers this class of issue
- (b) Rule exists but is incomplete — triggers or checks don't cover this scenario
- (c) Rule exists and is sufficient — it just wasn't followed (execution discipline gap)
- (d) Net-new gap — doesn't fit any current rule

**Step 5: Action by classification.**
- For (a), (b), or (d): **Propose a specific patch or new rule.** State what the patch is, where it goes, and the provenance (which audit finding triggered it). Present to Marc for approval — never auto-apply.
- For (c): **Note as execution discipline issue.** No rule change needed, but record the pattern for class-(c) tracking. **Class-c monitoring threshold (HARD GATE):** After logging a class-(c) issue, check memory and session-learning-log for prior class-(c) occurrences of the same rule. If the same rule has accumulated 3+ class-(c) violations across sessions, escalate immediately: propose a structural enforcement conversion (making the behavioral rule mechanically enforced, following the R-24 → PF-0 pattern). Present the conversion proposal to Marc with the violation history as evidence.

**Step 6: Commitment tracking (HARD GATE).**
For every approved patch from Step 5:
- Add to `commitment-registry.md` with status IN PROGRESS, the specific patch description, and provenance (audit finding that triggered it).
- If the patch can be implemented immediately (same session): implement, audit, and mark BUILT.
- If the patch requires a future session: leave as IN PROGRESS so it surfaces on next `initialize`.

This ensures no approved improvement gets lost between sessions.

**Step 7: Log to issue-logger.**
For every finding evaluated in Steps 1–5, create an `issue-logger` entry using the standard format (what/why/fix/rule). This creates the permanent record that feeds L2 (Same-Turn Lesson Promotion) for pattern detection across sessions.

**Step 8: Assemble the Learning Ledger (MANDATORY OUTPUT).**

Every audit must produce a Learning Ledger table summarizing what the system learned. This table makes audit learning visible to Marc across three dimensions he defined: what was learned, where it was memorialized, and what changed as a result.

**Learning Ledger format:**

| # | Learned | Memorialized | Activated |
|---|---------|-------------|----------|
| 1 | [The specific insight — what was discovered or recognized] | [Where it was recorded: session-learning-log entry #X, memory, commitment-registry, etc.] | [What rule, mechanism, or behavior changed as a result — or "No activation needed" if it was a one-time fix, or "PENDING Marc approval" if a proposal was presented] |

**Rules for the Learning Ledger:**
- One row per material finding from the convergence loop
- If the audit converged immediately (0 findings), include a single row: `| — | No material findings. Audit converged immediately. | — | — |`
- The Learned column describes the insight in plain language, not technical jargon
- The Memorialized column cites the specific persistent location (file + entry number, memory key, skill section)
- The Activated column names the specific rule ID, mechanism, or gate that was created/modified — or states why no activation was needed
- Pre-Flight findings that were fixed also get ledger rows (they represent operational learning)
- This table is included in the audit output shared with Marc in Pass 6

**Step 9: Update checkpoint.** Current Step: 5, Status: POST-CONVERGENCE

---

### Pass 6: Share

Share the revised deliverable and the audit log (including the Learning Ledger) with Marc via share_file.

**Quality Gate update:** If the deliverable being audited is a skill file (SKILL.md), update its Quality Gate table at the bottom of the file to record this audit's results:
- Add a row for each loop that applied changes, plus the final clean loop
- Set date to today's date
- Set auditor to AI
- Add a brief notes summary (finding count, key actions taken per loop)

This ensures the skill itself records that it has been audited, which is visible to any future session that loads the skill.

The audit log includes:
- Step 0 orientation (domain, risk focus, pass weights)
- Pre-Flight findings and fixes
- Per-loop findings from Passes 1–3 with classifications
- Per-loop changes from Pass 4 with rationale
- Total loop count and convergence summary
- **Learning Ledger table** (mandatory — assembled in Pass 5 Step 8)

**Post-Audit Chat Output (MANDATORY — standing requirement from Marc, March 11, 2026):**

Every audit must present 3 parts in the chat response to Marc (not just in the log file):

1. **Audit Summary** — What was audited, how many loops, what changed, convergence status. Brief narrative.
2. **Learning Ledger** — The table from Pass 5 Step 8. Copy it into the chat response.
3. **Attention Items** — Bullet list calling out what's most relevant for Marc: decisions needed, proposals pending, risks identified, or "no action needed" if clean.

This output replaces the previous pattern of sharing a log file and expecting Marc to read it. Marc wants to see the results summarized in conversation, with the log file as backup documentation.

**Update checkpoint:** Status: COMPLETE
- Delete checkpoint file (audit is complete)

---

## Checkpoint Behavior

Write `/workspace/audit-checkpoint.md` after every step.

**Checkpoint format:**
```
---
Protocol: AUDIT
Status: IN PROGRESS | POST-CONVERGENCE | COMPLETE
Deliverable: [name and path]
Domain: [classification from Step 0]
Risk Focus: [from Step 0]
Loop: [current loop number]
Current Step: [number and name]
Pre-Flight: [CLEAN / X findings, Y fixed]
Findings So Far:
- Loop 1: Pass 1: [count], Pass 2: [count], Pass 3: [count] → [X] material changes
- Loop 2: Pass 1: [count], Pass 2: [count], Pass 3: [count] → [X] material changes
- Loop N: ...
Convergence: [NOT YET | REACHED at Loop N]
Timestamp: [current time]
---
```

**On session resume (context reload):** Check for `/workspace/audit-checkpoint.md`:
- If it exists and is less than 2 hours old:
  - Read the checkpoint
  - Verify the referenced deliverable still exists and is the current version
  - If confirmed: resume from last completed step and loop (do not restart from Step 0)
  - Note in audit log: "Resumed from checkpoint at Loop [N], Step [X]"
- If deliverable cannot be confirmed (file missing, different version, cross-thread): start fresh
- If checkpoint is older than 2 hours: start fresh (context may have shifted materially)

**On completion:** Delete checkpoint file.

---

*This is the canonical audit command. As of v3.0, "check" and "audit" are unified — both trigger this protocol. The former `check-protocol` skill is deprecated.*

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Audit | PASSED | 2026-03-11 | AI | v3.3: Post-Audit Chat Output added. 3 loops. Convergence reached. |
| Audit | PASSED | 2026-03-11 | AI | v3.4: Pass 5 scope expansion. R-26 tests: 10/10 PASS. Immediate convergence. |