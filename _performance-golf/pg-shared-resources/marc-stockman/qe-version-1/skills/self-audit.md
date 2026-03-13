---
name: self-audit
version: 1.0
updated: 2026-03-06
author: Marc Stockman
description: 7-stage quality loop (self audit command) — Orientation, Verify, Adversarial, Pre-Mortem, Revise, Share, System Learning
scope: Post-delivery quality audit on any deliverable
trigger: Marc says 'self audit' (no hyphen)
---

# Self Audit Command Protocol

**Version:** 1.0 | March 5, 2026
**Trigger:** Marc says "self audit" (no hyphen)

---

## Action

Stop all current work. Execute the following 7-stage protocol (Step 0 through Pass 6) on the most recent deliverable. Post results. Share revised deliverable.

---

### Step 0: Pre-Audit Orientation

Before any pass begins, spend 30 seconds answering these six questions. Document the answers at the top of the audit log.

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
Protocol: SELF AUDIT
Status: IN PROGRESS
Current Step: 0
Deliverable: [name and path]
Domain: [classification]
Risk Focus: [highest-risk area]
Timestamp: [current time]
---
```

---

### Pass 1: Verification

Cross-check every factual claim, number, date, attribution, and external reference in the deliverable against its source material. Weight per Step 0 classification.

- For each claim: identify the source, verify accuracy, flag any claim that cannot be verified
- For unverifiable claims: mark as "ASSUMED CORRECT — source not accessible" and note in findings

**R-20 Source Verification sub-pass:** For every Tier 1 claim in the deliverable (pricing, plan names, feature availability per tier, API specs, compatibility, vendor timelines, any claim driving a recommendation):
1. Was the primary source (vendor's own page) fetched at writing time, not inherited from a prior search or comparison site?
2. Does the citation point to the vendor's own page?
3. If pricing is cited, was the vendor's pricing page fetched directly?
4. Flag any Tier 1 claim that relies on secondary sources, unfetched URLs, or cached results from a different session

**Update checkpoint:** Completed Steps: [0, 1], findings count

---

### Pass 2: Adversarial Testing

Attack the deliverable's claims, logic, and structure. Adopt a hostile skeptic perspective. Weight per Step 0 classification.

- Challenge assumptions: "What if this assumption is wrong?"
- Test logic chains: "Does conclusion X actually follow from premises Y and Z?"
- Identify weaknesses a critic, competitor, or skeptical reader would exploit
- Check for internal consistency — do different sections contradict each other?
- Look for unstated assumptions that could fail silently

**Update checkpoint:** Completed Steps: [0, 1, 2], findings count

---

### Pass 3: Pre-Mortem

Assume the deliverable has been delivered and has failed to achieve its purpose. Work backward to identify why.

- "What would cause Marc/the audience to say this didn't work?"
- "What's missing that would make this incomplete?"
- "What could be misunderstood?"
- "What would be embarrassing to get wrong?"
- "If I were a competitor reading this, where would I attack?"

**Update checkpoint:** Completed Steps: [0, 1, 2, 3], findings count

---

### Pass 4: Revise

Apply all material findings from Passes 1–3 to the deliverable.

- Only material changes — findings that affect accuracy, completeness, or the deliverable's ability to achieve its purpose
- Do NOT apply cosmetic changes, stylistic preferences, or changes that don't affect substance
- Document each change: what changed, why, which pass surfaced it

**Update checkpoint:** Completed Steps: [0, 1, 2, 3, 4], changes applied count

---

### Pass 5: Share

Share the revised deliverable and the audit log with Marc via share_file.

**Quality Gate update:** If the deliverable being audited is a skill file (SKILL.md), update its Quality Gate table at the bottom of the file to record this audit's results:
- Set Self Audit status to PASSED (if no unresolved findings) or FINDINGS (with count)
- Set date to today's date
- Set auditor to AI
- Add a brief notes summary (finding count, key actions taken)

This ensures the skill itself records that it has been audited, which is visible to any future session that loads the skill.

The audit log includes:
- Step 0 orientation (domain, risk focus, pass weights)
- All findings from Passes 1–3 with classifications
- All changes from Pass 4 with rationale
- Recommendation for next command (check, audit, or proceed)

**Update checkpoint:** Completed Steps: [0, 1, 2, 3, 4, 5]

---

### Pass 6: System Learning

After sharing, ask these questions about the audit findings themselves — not the deliverable:

**1. Did any finding reveal a recurring pattern?**
- If no: Pass 6 ends. Note "No systemic patterns identified."
- If yes: continue to question 2

**2. Which Accelerator rule should have prevented this finding?**
- Map each recurring-pattern finding to the most relevant rule (Q1–Q6, L1–L6)

**3. Classify the gap:**
- (a) Rule is missing — no rule covers this class of issue
- (b) Rule exists but is incomplete — triggers or checks don't cover this scenario
- (c) Rule exists and is sufficient — it just wasn't followed (execution discipline gap)
- (d) Net-new gap — doesn't fit any current rule

**4. For (a), (b), or (d): Propose a specific patch or new rule**
- State what the patch is, where it goes, and the provenance (which self-audit finding triggered it)
- Present to Marc for approval — never auto-apply

**5. For (c): Note as execution discipline issue**
- No rule change needed, but record the pattern for CHECK's class-(c) tracking

**6. Update checkpoint:** Completed Steps: [0, 1, 2, 3, 4, 5, 6], Status: COMPLETE
- Delete checkpoint file (audit is complete)

---

## Checkpoint Behavior

Write `/workspace/audit-checkpoint.md` after every step.

**Checkpoint format:**
```
---
Protocol: SELF AUDIT
Status: IN PROGRESS | COMPLETE
Deliverable: [name and path]
Domain: [classification from Step 0]
Risk Focus: [from Step 0]
Completed Steps: [list]
Current Step: [number and name]
Findings So Far:
- Pass 1: [count] findings ([key items])
- Pass 2: [count] findings ([key items])
- Pass 3: [count] findings ([key items])
Changes Applied: [count from Pass 4]
Timestamp: [current time]
---
```

**On session resume (context reload):** Check for `/workspace/audit-checkpoint.md`:
- If it exists and is less than 2 hours old:
  - Read the checkpoint
  - Verify the referenced deliverable still exists and is the current version
  - If confirmed: resume from last completed step (do not restart from Step 0)
  - Note in audit log: "Resumed from checkpoint at Step [X]"
- If deliverable cannot be confirmed (file missing, different version, cross-thread): start fresh
- If checkpoint is older than 2 hours: start fresh (context may have shifted materially)

**On completion:** Delete checkpoint file.

---

*This is the canonical definition of the self audit command. Paired with check-protocol for the CHECK command.*

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Self Audit | NOT RUN | — | — | — |
| CHECK | NOT RUN | — | — | — |