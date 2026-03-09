# Architecture Template

Use this template for every `architecture.md`. All sections are required. For client-facing projects, the Delivery Architecture section is mandatory — if you can't fill it out with specific answers, the architecture is incomplete.

```markdown
# Architecture: [Project Name]

## Vision Reference
[One sentence summary of the Vision this architecture serves]
[Link or path to vision.md]

## Systems Overview

| System | Purpose | Status |
|--------|---------|--------|
| [System Name] | [What it does — one sentence] | [Existing / To Build] |
| [System Name] | [What it does — one sentence] | [Existing / To Build] |

## System Map

[Describe or diagram how all systems connect. What flows between them? What depends on what?]

```
[System A] → [data/triggers] → [System B]
[System B] → [data/triggers] → [System C]
```

All dependencies must be explicit. No system exists in isolation.

## Systems (Detail)

### [System Name]
**Purpose:** [What job does this system perform?]
**Inputs:** [What it receives, and from where]
**Outputs:** [What it produces, and where it goes]
**Dependencies:** [What must exist for this system to work]
**Connects to:** [Other systems in this architecture]

### [System Name]
**Purpose:**
**Inputs:**
**Outputs:**
**Dependencies:**
**Connects to:**

## Build Sequence

[What must be built before other things can work? List in order.]

1. [First — enables everything below it]
2. [Second — depends on #1]
3. [Third — depends on #1 and #2]

## Validation Gate

Before proceeding to Capability Map, verify:
- [ ] Someone can understand how all pieces fit together without knowing internals
- [ ] All dependencies are explicit — no "magic" connections
- [ ] No system exists in isolation
- [ ] Every system can be built with current resources
- [ ] The total number of systems is the minimum needed
- [ ] You could explain this architecture in 2 minutes

---

## Delivery Architecture (REQUIRED for client-facing projects)

Skip this section only if the project produces NO output for clients or students. If there is any deliverable that reaches another person, this section is mandatory. If you can't answer these questions specifically, the architecture is not complete.

### Distribution Mechanism
[How does this reach the client? Email? Portal? Installer download? ZIP file? Direct delivery?]

### Format
[What form does it take? HTML? PDF? Markdown? Install scripts? GitHub repo? ZIP archive?]

### Sequence & Timing

| Step | What Client Receives | Format | Trigger | Day/Timing |
|------|---------------------|--------|---------|------------|
| 1 | [Content] | [Format] | [What triggers this] | [When] |
| 2 | [Content] | [Format] | [What triggers this] | [When] |

### Prerequisites
[What must exist before delivery can happen?]
- [ ] [Infrastructure item — e.g., Keap campaign created, GitHub repo exists, hosting configured]
- [ ] [Infrastructure item]

### Tracking & Support
[How do we know if a client is stuck? How do they get help?]
- Tracking mechanism: [e.g., Keap tags, email open tracking, skill auto-transmission]
- Support channel: [e.g., support@strategicprofits.com, Slack, dedicated thread]
- Check-in: [e.g., manual check at Day -5]

### Edge Cases
| Scenario | How It's Handled |
|----------|-----------------|
| [e.g., FM team distribution] | [Specific handling] |
| [e.g., Client on wrong program] | [Specific handling] |
| [e.g., Missing prerequisites] | [Specific handling] |
```

## Validation Gate — Delivery Architecture

Before proceeding, verify (client-facing projects only):
- [ ] Distribution mechanism is specific, not vague ("email via Keap" not just "email")
- [ ] Format is defined (file types, packaging method)
- [ ] Sequence has specific triggers and timing, not "paced delivery"
- [ ] All prerequisites are listed — nothing assumed to already exist
- [ ] Tracking mechanism is defined
- [ ] Support channel is defined
- [ ] At least 2 edge cases documented

**If any box is unchecked, the architecture is incomplete. Do not proceed to Capability Map.**
