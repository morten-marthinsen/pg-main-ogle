# NeuroCopy Master Agent — Product Requirements Document

**Version:** 1.0
**Last Updated:** January 2026
**Purpose:** Master control document for the NeuroCopy short-form copywriting system

---

## VISION

NeuroCopy is a **market intelligence engine** that uses Chase Hughes' behavioral frameworks to:
1. **Discover untapped audience segments** that human marketers cannot see from their limited vantage point
2. **Identify psychological leverage points** within those segments through forensic analysis
3. **Generate copy that converts** by applying the right frameworks to the right audiences

**The Primary Value:** Surface hidden market opportunities by identifying audience segments that follow behavioral principles—segments the human operator would never have found on their own.

**The Output Standard:** Copy so good people don't even know it's copy. A conversation directly to their soul.

---

## OBJECTIVES

1. **Market Discovery** — Recommend audience segments the human hasn't considered based on behavioral science
2. **Psychological Precision** — Identify angles using Chase Hughes' complete framework library
3. **Quality Assurance** — Enforce 10-figure copy standards with zero tolerance for hallucinations
4. **Production Ready** — Output in exact format for copy-paste into Google Docs production system
5. **Tracking Enabled** — Full attribution on every output (Framework + Audience + Angle + Offer)

---

## SUCCESS CRITERIA

| Metric | Standard |
|--------|----------|
| Hallucinations | Zero tolerance — all credentials, statistics, claims verified |
| Hook Quality Score | 4+ average across all criteria |
| Body Quality Score | 4+ average across all criteria |
| CTA Quality Score | 4+ |
| Core Angle Congruence | 100% — all hooks/body serve ONE confirmed angle |
| Human Checkpoints | 2 required stops before generation |
| Output Format | 100% production-ready, copy-paste enabled |

---

## WORKFLOW ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        LAYER 1: CONTEXT ACQUISITION                      │
│                                                                          │
│  REQUIRED INPUTS (Agent STOPS until provided):                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ 1. Product/Offer Brief                                              │ │
│  │    - What is the product/offer?                                     │ │
│  │    - What problem does it solve?                                    │ │
│  │    - What is the mechanism/method?                                  │ │
│  │    - What makes it unique?                                          │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ 2. Proof Elements                                                   │ │
│  │    - Credentials (titles, certifications, awards)                   │ │
│  │    - Statistics (lessons given, customers served, results)          │ │
│  │    - Associations (celebrity clients, media mentions)               │ │
│  │    - Testimonials (named, specific)                                 │ │
│  │    → If missing: Ask human for more OR where to find them           │ │
│  │    → If unavailable: Conduct web search for suggested proof         │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ 3. Audience Profiles (PLURAL)                                       │ │
│  │    - Human provides their known segments                            │ │
│  │    - Agent MUST recommend additional segments based on behavioral   │ │
│  │      principles (see Audience Recommendation Protocol below)        │ │
│  │    - Human confirms final segment list                              │ │
│  │    - Human specifies which segments get hooks                       │ │
│  │    - Human specifies which segment body is written for              │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ 4. Optional Inputs                                                  │ │
│  │    - Existing creative (what's been tested)                         │ │
│  │    - Performance data (what's working/not working)                  │ │
│  │    - Competitive landscape (what competitors are saying)            │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ★ CHECKPOINT: Agent cannot proceed until items 1-3 are complete ★      │
│                                                                          │
│  If human lacks context → Reference research agent to gather first      │
└─────────────────────────────────────────────────────────────────────────┘
                                      ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    AUDIENCE RECOMMENDATION PROTOCOL                      │
│                                                                          │
│  After receiving human's known segments, agent MUST:                    │
│                                                                          │
│  1. Analyze offer through Chase Hughes' behavioral lens                 │
│  2. Identify segments based on psychological configurations:            │
│     - FATE triggers that define distinct audience pockets               │
│     - Six-Axis scores that create behavioral segments                   │
│     - Behavior Compass patterns that reveal hidden audiences            │
│     - Cognitive bias susceptibilities that group audiences              │
│                                                                          │
│  3. Present recommendations to human:                                   │
│     "Based on behavioral principles, I've identified these additional   │
│      audience segments that may represent untapped opportunities:       │
│                                                                          │
│      - [Segment X]: [Why this segment exists based on framework]        │
│      - [Segment Y]: [Why this segment exists based on framework]        │
│      - [Segment Z]: [Why this segment exists based on framework]        │
│                                                                          │
│      Would you like to include any of these in hook generation?"        │
│                                                                          │
│  4. Human approves/rejects/modifies segment list                        │
│  5. Confirm final audience list before proceeding                       │
└─────────────────────────────────────────────────────────────────────────┘
                                      ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                   LAYER 2: FORENSIC ANGLE IDENTIFICATION                 │
│                                                                          │
│  FOR EACH APPROVED AUDIENCE SEGMENT, scan through Chase Hughes' lens:   │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ FATE Model Analysis                                                 │ │
│  │ - Which ancestral triggers are most activated for THIS audience?    │ │
│  │ - Focus: What captures their attention?                             │ │
│  │ - Authority: What authority signals do they respond to?             │ │
│  │ - Tribe: What tribal identity do they want to belong to?            │ │
│  │ - Emotion: What core emotion drives their decisions?                │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Six-Axis Model Analysis                                             │ │
│  │ - Where does THIS audience score on each axis?                      │ │
│  │ - Suggestibility | Focus | Openness | Connection | Compliance |     │ │
│  │   Expectancy                                                        │ │
│  │ - Which axes are highest leverage for THIS audience?                │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Behavior Compass Analysis                                           │ │
│  │ - Needs Map: What does THIS audience need?                          │ │
│  │ - Decision Map: How does THIS audience make decisions?              │ │
│  │ - Values Map: What does THIS audience value most?                   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ PCP Model Analysis                                                  │ │
│  │ - Perception: What perception must be shifted?                      │ │
│  │ - Context: What context must be established?                        │ │
│  │ - Permission: What permission must be granted for action?           │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Authority Triangle Analysis                                         │ │
│  │ - What authority signals are available?                             │ │
│  │ - What authority signals does THIS audience respond to?             │ │
│  │ - How to build authority within the copy?                           │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Cognitive Bias Analysis                                             │ │
│  │ - Which biases is THIS audience most susceptible to?                │ │
│  │ - How can these be ethically leveraged in copy?                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  OUTPUT: Ranked list of psychological angles PER AUDIENCE               │
│          with explicit framework sourcing                               │
│                                                                          │
│  ★ HUMAN VERIFICATION CHECKPOINT ★                                      │
│                                                                          │
│  Agent presents angle identification to human:                          │
│  "I've identified the following angles for each audience:               │
│                                                                          │
│   AUDIENCE A: [Segment Name]                                            │
│   - Primary Angle: [Angle] via [Framework]                              │
│   - Secondary Angles: [Angles] via [Frameworks]                         │
│                                                                          │
│   AUDIENCE B: [Segment Name]                                            │
│   - Primary Angle: [Angle] via [Framework]                              │
│   - Secondary Angles: [Angles] via [Frameworks]                         │
│                                                                          │
│   RECOMMENDED CORE ANGLE FOR THIS AD: [Angle]                           │
│   Rationale: [Why this angle should be the ONE core angle]              │
│                                                                          │
│   Please confirm the core angle before I proceed to generation."        │
│                                                                          │
│  Human confirms/modifies core angle → Agent proceeds                    │
└─────────────────────────────────────────────────────────────────────────┘
                                      ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                      LAYER 3: FRAMEWORK ROUTING                          │
│                                                                          │
│  Based on confirmed angles, route to appropriate frameworks:            │
│                                                                          │
│  FOR EACH AUDIENCE'S HOOK:                                              │
│  - Primary framework based on that audience's angle identification      │
│  - Style selection from Style Library (see style-library.md)            │
│  - Angle combination with proven patterns                               │
│                                                                          │
│  FOR THE BODY:                                                          │
│  - Framework for designated body audience                               │
│  - Style progression appropriate for that audience                      │
│  - If general: frameworks with cross-segment applicability              │
│                                                                          │
│  ROUTING LOGIC:                                                         │
│  - Same framework + different audience = different copy                 │
│  - Same audience + different framework = different copy                 │
│  - All output must serve the ONE confirmed core angle                   │
└─────────────────────────────────────────────────────────────────────────┘
                                      ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                      LAYER 4: OUTPUT GENERATION                          │
│                                                                          │
│  OUTPUT FORMAT (Production Ready):                                      │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ ### [Asset ID - Angle Description - Audience]                       │ │
│  │                                                                      │ │
│  │ **Core Angle:** [The ONE angle this ad serves]                      │ │
│  │ **Framework:** [Chase Hughes framework used]                        │ │
│  │ **Audience:** [Specific segment this hook targets]                  │ │
│  │                                                                      │ │
│  │ **Intro:**                                                          │ │
│  │ [Format = Education/Entertainment/etc.]                             │ │
│  │ [Style = Curiosity/Contrarian/Proclamation/etc.]                    │ │
│  │ [Angle = Specific hook angle]                                       │ │
│  │                                                                      │ │
│  │ [Hook copy - 2-5 lines]                                             │ │
│  │                                                                      │ │
│  │ **Body:**                                                           │ │
│  │ [Style = Credibility/UMP/UMS/Pain/Outcome/etc.]                     │ │
│  │ [Angle = Specific body angle]                                       │ │
│  │                                                                      │ │
│  │ [Body copy]                                                         │ │
│  │                                                                      │ │
│  │ **Close:**                                                          │ │
│  │ [Style = CTA]                                                       │ │
│  │ [Angle = Specific close angle]                                      │ │
│  │                                                                      │ │
│  │ [CTA copy]                                                          │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  A/B VARIANT GENERATION:                                                │
│  For each audience, generate:                                           │
│  - HOOK [X]A [Primary] — [Framework] + [Style]                         │
│  - HOOK [X]A-VAR [Style Variant] — Same framework, different style     │
│  - HOOK [X]A-ALT [Framework Variant] — Different framework             │
│                                                                          │
│  ATTRIBUTION (Required on every output):                                │
│  - Framework Used                                                       │
│  - Audience Segment                                                     │
│  - Angle Applied                                                        │
│  - Style Applied                                                        │
└─────────────────────────────────────────────────────────────────────────┘
                                      ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                      LAYER 5: QUALITY VALIDATION                         │
│                                                                          │
│  HALLUCINATION CHECK (CRITICAL - Zero Tolerance):                       │
│  - Flag all credentials with ❓ VERIFY                                  │
│  - Flag all statistics with ❓ VERIFY                                   │
│  - Flag all claims with ❓ VERIFY                                       │
│  - Human must confirm before delivery                                   │
│                                                                          │
│  CORE ANGLE CONGRUENCE CHECK:                                           │
│  - Verify all hooks serve the ONE confirmed core angle                  │
│  - Verify body serves the ONE confirmed core angle                      │
│  - Flag any drift: "🚨 ANGLE DRIFT: [element] shifts from core angle"  │
│                                                                          │
│  QUALITY SCORING:                                                       │
│  - Score each hook (must average 4+)                                    │
│  - Score body (must average 4+)                                         │
│  - Score CTA (must score 4+)                                            │
│                                                                          │
│  COPY CONSTRAINTS CHECK:                                                │
│  - Run against copy-constraints.md                                      │
│  - Verify no forbidden patterns                                         │
│  - Verify no banned phrases                                             │
│  - Verify Todd Brown principles compliance                              │
│  - Verify PG Brand guidelines compliance                                │
│                                                                          │
│  RECOMMENDATIONS (Not fail conditions):                                 │
│  - ⚡ SUGGESTION: Missing timeframe anchor                              │
│  - ⚡ SUGGESTION: Consider ease anchor                                  │
│  - ⚠️ STALE ALERT: Overused differentiation angle                       │
│  - Note: Hook-body style mismatch (intentional pattern interrupt)       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## HUMAN CHECKPOINTS (Required)

### Checkpoint 1: Audience Confirmation
**Location:** After Context Acquisition, before Angle Identification
**Purpose:** Confirm final audience segment list (human-provided + agent-recommended)
**Gate:** Agent cannot proceed to angle identification without human approval of audiences

### Checkpoint 2: Core Angle Confirmation
**Location:** After Angle Identification, before Framework Routing
**Purpose:** Confirm the ONE core angle that all hooks/body will serve
**Gate:** Agent cannot proceed to generation without human approval of core angle

### Checkpoint 3: Verification Review
**Location:** After Output Generation, before Delivery
**Purpose:** Human verifies all flagged credentials, statistics, claims
**Gate:** Agent cannot deliver copy with unverified factual claims

---

## REQUIRED TOOLS/PLUGINS

| Tool | Purpose | When Used |
|------|---------|-----------|
| **Web Search** | Research proof elements, competitive landscape, audience data | Context Acquisition (if proof missing) |
| **RefTools** | Deep research on topics, trends, market data | Audience recommendation, competitive differentiation |
| **Exa** | Semantic search for relevant content and examples | Framework application examples, proof sourcing |

---

## REFERENCE FILES

| File | Purpose |
|------|---------|
| `copy-constraints.md` | All copy rules, forbidden patterns, quality rubrics |
| `fate-model.md` | FATE ancestral triggers with audience application |
| `six-axis.md` | Influence axis analysis methodology |
| `behavior-compass.md` | Needs/Decisions/Values mapping framework |
| `pcp-model.md` | Perception → Context → Permission framework |
| `authority-triangle.md` | Authority building methodology |
| `cognitive-biases.md` | Bias library with audience susceptibility patterns |
| `style-library.md` | Winning styles taxonomy from $100K+ ads |
| `hook-library.md` | Winning hook patterns with framework/audience tags |

---

## ACCEPTANCE CRITERIA BY LAYER

### Layer 1: Context Acquisition
- [ ] Product/Offer brief is complete
- [ ] Proof elements are documented (or flagged for research)
- [ ] Human has provided their known audience segments
- [ ] Agent has recommended additional segments based on behavioral principles
- [ ] Human has confirmed final audience list
- [ ] Human has specified which segments get hooks
- [ ] Human has specified body target audience

### Layer 2: Angle Identification
- [ ] Each audience has been analyzed through all Chase Hughes frameworks
- [ ] Primary and secondary angles identified for each audience
- [ ] Core angle recommended with rationale
- [ ] Human has confirmed the ONE core angle

### Layer 3: Framework Routing
- [ ] Primary framework selected for each audience's hook
- [ ] Style selected for each hook
- [ ] Body framework selected for target audience
- [ ] All routing serves the confirmed core angle

### Layer 4: Output Generation
- [ ] Each approved audience has at least one hook
- [ ] A/B variants generated (primary, style variant, framework variant)
- [ ] Body written for specified target audience
- [ ] CTA included with required elements
- [ ] Full attribution on every output
- [ ] Production-ready format

### Layer 5: Quality Validation
- [ ] All factual claims flagged with ❓ VERIFY
- [ ] Human has verified all flagged items
- [ ] Zero hallucinations in final output
- [ ] Core angle congruence confirmed
- [ ] Hook scores 4+ average
- [ ] Body scores 4+ average
- [ ] CTA scores 4+
- [ ] No forbidden patterns
- [ ] No banned phrases
- [ ] Recommendations noted (timeframe, differentiation, etc.)

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial PRD with complete workflow architecture |
