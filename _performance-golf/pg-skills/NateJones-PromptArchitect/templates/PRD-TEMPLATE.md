# [SYSTEM NAME] — Architecture PRD
*Product Requirements Document for [System Name] Agentic Skill System*

**Version:** 1.0
**Created:** [YYYY-MM-DD]
**Author:** [Name]
**Status:** [DRAFT | REVIEW | APPROVED | ACTIVE]

---

## 1. SYSTEM IDENTITY

### 1.1 What This System Does
[2-3 sentences. Clear statement of the system's purpose. What problem does it solve? For whom?]

### 1.2 What This System Does NOT Do
[Explicit boundaries. List 3-5 things that are OUT OF SCOPE. Prevents feature creep.]

- NOT: [Out-of-scope item 1]
- NOT: [Out-of-scope item 2]
- NOT: [Out-of-scope item 3]

### 1.3 Success Criteria
[How do you know this system is working correctly? Measurable outcomes.]

| Criterion | Measurement | Target |
|-----------|-------------|--------|
| [Criterion 1] | [How measured] | [Specific target] |
| [Criterion 2] | [How measured] | [Specific target] |
| [Criterion 3] | [How measured] | [Specific target] |

---

## 2. ARCHITECTURAL PRINCIPLES

### 2.1 Core Design Philosophy
[3-5 principles that govern ALL design decisions in this system. These resolve ambiguity.]

1. **[Principle Name]:** [One sentence explanation. This principle means X, not Y.]
2. **[Principle Name]:** [Explanation]
3. **[Principle Name]:** [Explanation]

### 2.2 Architectural Constraints
[Hard rules the architecture MUST follow. Non-negotiable.]

- MUST: [Constraint 1 — e.g., "Single orchestrator, no peer-to-peer agent communication"]
- MUST: [Constraint 2 — e.g., "Every skill produces structured output, never prose"]
- MUST NOT: [Anti-pattern 1 — e.g., "No skill may call itself recursively"]
- MUST NOT: [Anti-pattern 2]

### 2.3 Quality Standards
[Reference the specific quality benchmarks this system must meet.]

- Constraint Ratio: ≥[threshold] for all skills
- Specificity Score: ≥[threshold] for all sections
- Guardrail Coverage: ≥[threshold] for [skill type]
- Slop Density: ≤[threshold] across all outputs

---

## 3. SYSTEM ARCHITECTURE

### 3.1 Execution Modes
[Define how the system can be invoked. Most systems have 1-3 modes.]

**Mode 1: [MODE NAME]**
- Trigger: [What activates this mode]
- Pipeline: [Which layers/skills execute]
- Output: [What gets delivered]

**Mode 2: [MODE NAME]**
- Trigger: [Activation condition]
- Pipeline: [Skill sequence]
- Output: [Deliverable]

### 3.2 Layer Architecture

```
┌─────────────────────────────────────────┐
│           MASTER AGENT                   │
│     (Orchestration & Routing)            │
└──────────┬──────────┬──────────┬────────┘
           │          │          │
    ┌──────▼──┐ ┌────▼────┐ ┌──▼──────┐
    │ Layer 1  │ │ Layer 2  │ │ Layer 3  │
    │[Purpose] │ │[Purpose] │ │[Purpose] │
    └──────────┘ └──────────┘ └──────────┘
```

**Layer 1: [Name] — [Purpose in 3 words]**
- Responsibility: [What this layer does]
- Skills: [Count] micro-skills
- Output: [What it produces for the next layer]

**Layer 2: [Name] — [Purpose in 3 words]**
- Responsibility: [What this layer does]
- Skills: [Count] micro-skills
- Input: [What it receives from Layer 1]
- Output: [What it produces for Layer 3]

**Layer 3: [Name] — [Purpose in 3 words]**
- Responsibility: [What this layer does]
- Skills: [Count] micro-skills
- Input: [What it receives from Layer 2]
- Output: [Final deliverable]

### 3.3 Data Flow

```
[Input] → [Layer 1 Skills] → [Intermediate Output 1]
         → [Layer 2 Skills] → [Intermediate Output 2]
         → [Layer 3 Skills] → [Final Output]
```

**Critical Rule:** [Any rules about data flow — e.g., "No layer may skip. Layer 2 cannot execute without Layer 1 output."]

---

## 4. SKILL REGISTRY

### 4.1 Layer 1: [Layer Name]

| ID | Skill Name | Purpose | Input | Output |
|----|-----------|---------|-------|--------|
| [1.0-A] | [Name] | [What it does] | [Input source] | [Output format] |
| [1.1-A] | [Name] | [What it does] | [Input source] | [Output format] |

### 4.2 Layer 2: [Layer Name]

| ID | Skill Name | Purpose | Input | Output |
|----|-----------|---------|-------|--------|
| [2.1-A] | [Name] | [What it does] | [Input source] | [Output format] |

### 4.3 Layer 3: [Layer Name]

| ID | Skill Name | Purpose | Input | Output |
|----|-----------|---------|-------|--------|
| [3.1-A] | [Name] | [What it does] | [Input source] | [Output format] |

---

## 5. INPUT REQUIREMENTS

### 5.1 Required Inputs
[What the system needs to start execution.]

| Input | Format | Source | Validation |
|-------|--------|--------|------------|
| [Input 1] | [Format] | [Where from] | [How to validate] |
| [Input 2] | [Format] | [Where from] | [How to validate] |

### 5.2 Optional Inputs
[Configuration or context that improves output but isn't required.]

| Input | Format | Default | Effect |
|-------|--------|---------|--------|
| [Optional 1] | [Format] | [Default value] | [What it changes] |

---

## 6. OUTPUT SPECIFICATIONS

### 6.1 Primary Outputs
[What the system delivers when execution completes.]

| Output | Format | Location | Consumer |
|--------|--------|----------|----------|
| [Output 1] | [Format] | [Where saved] | [Who uses it] |
| [Output 2] | [Format] | [Where saved] | [Who uses it] |

### 6.2 Output Quality Gates
[Criteria that outputs MUST meet before delivery.]

- Gate 1: [Quality requirement — e.g., "All scores must be numeric, not qualitative"]
- Gate 2: [Completeness requirement — e.g., "No empty sections in final report"]
- Gate 3: [Format requirement — e.g., "Must parse as valid YAML"]

---

## 7. ERROR HANDLING

### 7.1 Failure Modes
[Predictable ways this system can fail and how to handle each.]

| Failure Mode | Detection | Recovery | Severity |
|-------------|-----------|----------|----------|
| [Mode 1] | [How detected] | [Recovery action] | [Critical/High/Medium/Low] |
| [Mode 2] | [How detected] | [Recovery action] | [Severity] |

### 7.2 Escalation Protocol
```
IF [minor failure]: [Self-recover — describe how]
IF [moderate failure]: [Degrade gracefully — describe what gets skipped]
IF [critical failure]: [HALT — describe what to report to user]
```

---

## 8. INTEGRATION POINTS

### 8.1 Upstream Dependencies
[What this system depends on. Other systems, files, tools.]

- [Dependency 1]: [What it provides, where to find it]
- [Dependency 2]: [What it provides, where to find it]

### 8.2 Downstream Consumers
[Who/what uses this system's output.]

- [Consumer 1]: [How they use the output]
- [Consumer 2]: [How they use the output]

### 8.3 Tool Requirements
[MCP tools, APIs, or capabilities required.]

- [Tool 1]: [What it's used for in this system]
- [Tool 2]: [What it's used for]

---

## 9. CONSTRAINTS & GUARDRAILS

### 9.1 System-Level Constraints
[Rules that apply to the ENTIRE system, not just individual skills.]

- NEVER: [System-level prohibition]
- NEVER: [System-level prohibition]
- ALWAYS: [System-level requirement]
- ALWAYS: [System-level requirement]

### 9.2 Performance Boundaries
[Limits on execution scope to prevent runaway processes.]

- Maximum [items/iterations/depth]: [limit]
- Timeout behavior: [what happens if execution exceeds reasonable bounds]
- Resource limits: [any caps on tool calls, file reads, etc.]

---

## 10. VERSIONING & EVOLUTION

### 10.1 Current Version
- **Version:** [X.Y]
- **Last Modified:** [Date]
- **Change Log:** [Brief description of most recent changes]

### 10.2 Planned Improvements
[Known gaps or future enhancements. NOT commitments — just awareness.]

- [ ] [Improvement 1]
- [ ] [Improvement 2]

### 10.3 Deprecation Notes
[Any skills or patterns being phased out.]

- [Deprecated item]: [Replacement, if any]

---

## DOCUMENT AUTHORITY

This PRD is the **requirements authority** for the [System Name] system. In case of conflict:
- PRD > MASTER-AGENT (PRD defines WHAT; MASTER-AGENT defines HOW)
- PRD > Individual Skills (Skills implement PRD requirements)
- QUALITY-STANDARDS defines measurement methodology referenced by this PRD
