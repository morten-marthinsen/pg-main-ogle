# Capability Map Template

Use this template for every `capabilities.md`. All sections are required. For client-facing projects, the Delivery & Support section is mandatory.

**Key rule:** Capabilities are jobs/outcomes, not features. Every capability must be statable as: "The system must be able to [achieve outcome]." If you can only state it one way, it's probably a feature — go up a level.

**Test:** For each capability, ask: "Can I imagine 3 different ways to implement this?" If yes = capability. If no = feature, rewrite it.

```markdown
# Capability Map: [Project Name / System Name]

## Architecture Reference
[Link or path to architecture.md]
[Which system from the architecture does this map cover?]

---

## Capabilities

### [Capability ID] — [Capability Name]

**Job:** [The system must be able to ___. State as an outcome, not a feature.]

**Inputs:**
- [What does this capability receive?]
- [From where / from what?]

**Outputs:**
- [What does this capability produce?]
- [Where does it go?]

**Dependencies:**
- [What must exist for this capability to work?]
- [Which other capabilities does this depend on?]

**Capability test (3 implementations):**
1. [Implementation option A]
2. [Implementation option B]
3. [Implementation option C]

**Phase:** [Which phase builds this? Phase 1 / Phase 2 / etc.]

---

### [Capability ID] — [Capability Name]

**Job:**
**Inputs:**
**Outputs:**
**Dependencies:**
**Phase:**

---

## Capability Summary

| ID | Name | Job (one line) | Depends On | Phase |
|----|------|---------------|------------|-------|
| C1 | [Name] | [Outcome] | [IDs] | P1 |
| C2 | [Name] | [Outcome] | C1 | P1 |
| C3 | [Name] | [Outcome] | C1, C2 | P2 |

---

## Validation Gate

Before proceeding to Phased Delivery Plan, verify:
- [ ] Every capability is stated as a job/outcome, not a feature
- [ ] For each capability, 3 different implementations are imaginable
- [ ] Inputs and outputs are defined for each capability
- [ ] Every capability can be built with tools that exist today
- [ ] No capability requires "magic"
- [ ] Total number of capabilities is the minimum needed
- [ ] Every capability traces to a system in the Architecture
- [ ] No architectural system has zero capabilities
- [ ] No capability lacks a parent system

---

## Delivery & Support Capabilities (REQUIRED for client-facing projects)

Skip this section only if the project produces NO output for clients or students. If any deliverable reaches another person, every capability below must be defined. Vague answers are not acceptable.

### D1 — Package Materials for Distribution

**Job:** The system must be able to produce client-ready packages from raw content.

**Inputs:**
**Outputs:** [Format: e.g., install.sh, install.ps1, ZIP archive, PDF, HTML]
**Method:** [How packaging happens — e.g., student-package-builder skill, manual, scripted]
**Versioning:** [How package versions are tracked]
**Phase:** [Which phase builds this?]

---

### D2 — Distribute Materials to Clients

**Job:** The system must be able to deliver packaged materials to clients in a usable format.

**Mechanism:** [Specific: email via Keap, Whop portal, direct download link, etc.]
**Timing:** [When and how — e.g., 10-day drip starting at registration]
**Prerequisites:** [What must exist before distribution can happen]
**Phase:** [Which phase builds this?]

---

### D3 — Track Client Progress

**Job:** The system must be able to show whether each client has received and completed each step.

**Mechanism:** [Specific: Keap tags, spreadsheet, auto-transmission from skill, etc.]
**What gets tracked:** [List each checkpoint]
**Where data lives:** [Specific system or file]
**Phase:** [Which phase builds this?]

---

### D4 — Support Stuck Clients

**Job:** The system must be able to get a stuck client unstuck.

**Support channel:** [Specific email, Slack channel, etc.]
**Response SLA:** [Expected response time]
**Escalation path:** [What happens if support can't resolve it]
**Troubleshooting resources:** [What exists to help before they have to ask]
**Phase:** [Which phase builds this?]

---

### D5 — Handle Edge Cases

**Job:** The system must be able to handle non-standard client situations.

| Edge Case | How It's Handled |
|-----------|-----------------|
| [e.g., FM team distribution] | [Specific process] |
| [e.g., Multiple program seats] | [Specific process] |
| [e.g., Missing prerequisites] | [Specific process] |
| [e.g., Wrong program assigned] | [Specific process] |

**Phase:** [Which phase builds this?]

---

## Delivery Validation Gate

Before proceeding to Phased Delivery Plan, verify (client-facing only):
- [ ] D1: Packaging method is specific and buildable
- [ ] D2: Distribution mechanism is specific (not "email" — which system, which sequence)
- [ ] D3: Tracking mechanism is defined and points to a real system
- [ ] D4: Support channel is named (not "support" — specific email or channel)
- [ ] D5: At least 3 edge cases documented with specific handling
- [ ] All delivery capabilities are assigned to a phase

**If any box is unchecked, the capability map is incomplete. Do not proceed.**
```
