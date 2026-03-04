# AI Execution Specification
## Third Brain Knowledge Synthesis

---

## Document Metadata
| Field | Value |
|-------|-------|
| Synthesis Name | [SYNTHESIS TITLE — e.g., "Week of Jan 13 Synthesis"] |
| Version | 1.0 |
| Created | [DATE] |
| Synthesis Owner | Rich Schefren / Claude |
| Status | Collection / Processing / Synthesis / Complete |
| Time Period | [Date range covered] |

---

## 1. SYNTHESIS OBJECTIVE

**Core Purpose:**
Transform scattered conversations, learnings, and activities into compound intelligence artifacts that make both Rich and Claude smarter over time.

**Synthesis Type:**
- [ ] Weekly synthesis (standard)
- [ ] Project synthesis (single project deep-dive)
- [ ] Person synthesis (relationship intelligence)
- [ ] Topic synthesis (cross-cutting theme)
- [ ] Quarterly review (strategic patterns)

**Dual Output Required:**
1. **Audio Brief** — Compressed for Rich (spoken format, key insights only)
2. **Knowledge Artifact** — Comprehensive for Claude (detailed, indexed for retrieval)

---

## 2. SUCCESS CRITERIA

### Synthesis Success When:
- [ ] Patterns identified that weren't visible in individual conversations
- [ ] Actionable insights extracted
- [ ] Knowledge indexed to appropriate Pinecone namespace
- [ ] Both outputs produced (Audio Brief + Knowledge Artifact)
- [ ] Cross-references created to related knowledge

### Quality Indicators
| Criterion | Standard |
|-----------|----------|
| Signal vs. noise | Only significant learnings included |
| Pattern recognition | At least 1 non-obvious pattern surfaced |
| Actionability | Each insight has clear "so what" |
| Retrievability | Tagged and indexed for future queries |

---

## 3. INPUT SOURCES

### Primary Sources (Must Review)
| Source | Location | Content Type |
|--------|----------|--------------|
| Daily AI Logs | `Active-Brain/AI Integration/Daily AI Logs/` | Session summaries |
| Pinecone activity-logs | `business-operations/activity-logs` | Indexed conversations |
| Notion updates | People Hub, Projects Hub | Relationship/project changes |
| Async channels | Slack, Voxer logs (if available) | Informal exchanges |

### Secondary Sources (Review If Relevant)
| Source | Location | When to Include |
|--------|----------|-----------------|
| Meeting transcripts | Fireflies | If meetings occurred |
| Email threads | Gmail | If significant exchanges |
| Document changes | Drive/Obsidian | If major work produced |

### Period Covered
- **Start:** [Date]
- **End:** [Date]
- **Focus filter:** [Any specific focus for this synthesis]

---

## 4. DELIVERABLES

### Output 1: Audio Brief (For Rich)
| Attribute | Specification |
|-----------|---------------|
| Format | Markdown script (for TTS or recording) |
| Length | 3-5 minutes spoken (~600-900 words) |
| Structure | See template below |
| Tone | Direct, insight-dense, no fluff |
| Location | `Active-Brain/Third-Brain/Audio-Briefs/` |

**Audio Brief Template:**
```markdown
# Audio Brief: [Title]
## [Date Range]

### Headlines (30 seconds)
[3-5 bullet points of the most important things to know]

### Key Decisions Made
[What was decided this period and why it matters]

### Patterns Emerging
[What's becoming clearer across conversations/activities]

### Open Loops
[What needs attention but isn't resolved]

### Action Triggers
[What Rich should do based on this synthesis]

---
Duration: ~[X] minutes
```

### Output 2: Knowledge Artifact (For Claude)
| Attribute | Specification |
|-----------|---------------|
| Format | Structured Markdown |
| Length | Comprehensive (no limit, completeness > brevity) |
| Structure | See template below |
| Indexing | Must include Pinecone metadata |
| Location | `Active-Brain/Third-Brain/Knowledge-Artifacts/` |

**Knowledge Artifact Template:**
```markdown
# Knowledge Artifact: [Title]
## Synthesis Period: [Date Range]

### Pinecone Metadata
- namespace: third-brain
- category: synthesis
- period: [YYYY-MM-DD to YYYY-MM-DD]
- topics: [tag1, tag2, tag3]
- people: [person1, person2]
- projects: [project1, project2]

---

### Executive Summary
[2-3 paragraph synthesis of the period]

### Detailed Findings

#### Topic 1: [Topic Name]
**Context:** [What prompted this]
**Key Points:**
- [Point with source reference]
- [Point with source reference]
**Implications:** [So what]
**Cross-references:** [Related artifacts/conversations]

#### Topic 2: [Topic Name]
[Same structure]

#### Topic 3: [Topic Name]
[Same structure]

### Relationship Updates
[Changes in key relationships — especially Max Meyes context]

### Project Status Changes
[Movement on active projects]

### Decisions & Rationale
| Decision | Rationale | Date | Reversible? |
|----------|-----------|------|-------------|

### Patterns & Themes
[Higher-order patterns across topics]

### Unresolved Questions
[What remains unclear — for future resolution]

### Forward Pointers
[What to watch for in next period]

---

### Source Log
| Source | Date | Key Content |
|--------|------|-------------|
| [Daily log] | [Date] | [What was extracted] |

### Tags
#third-brain #synthesis #[topic-tags]
```

---

## 5. SCOPE

### Include
- All significant conversations and decisions
- Pattern changes and emerging themes
- Relationship dynamics (especially with key people)
- Project progress and blockers
- Strategic insights and learnings

### Exclude
- Routine administrative tasks
- One-off questions with no broader relevance
- Content that's already well-indexed elsewhere
- Personal non-business items (unless relevant to state/capacity)

### Depth Calibration
- **Go deep:** Strategic decisions, relationship dynamics, methodology refinements
- **Surface level:** Routine updates, task completion, scheduling

---

## 6. CONSTRAINTS

### Audio Brief Constraints
- Must be listenable in car/walking
- No visual references required
- Front-load the most important insight
- End with clear action items

### Knowledge Artifact Constraints
- Must be Claude-queryable (clear headers, consistent structure)
- Must include Pinecone metadata block
- Cross-reference to source conversations when possible
- Tag all people, projects, topics mentioned

### Time Constraint
- Weekly synthesis should take <30 minutes to produce
- Quarterly synthesis may take 1-2 hours

---

## 7. DECISION RULES

### Inclusion Decisions
| Situation | Decision |
|-----------|----------|
| Conversation seems routine | Include if it reveals pattern; skip if truly routine |
| Topic discussed before | Note evolution, don't repeat known information |
| Personal/emotional content | Include if affects capacity/strategy; otherwise skip |
| Uncertain significance | Include in Knowledge Artifact; skip in Audio Brief |

### Synthesis Decisions
| Situation | Decision |
|-----------|----------|
| Conflicting information across sources | Note conflict, most recent wins unless clearly wrong |
| Pattern uncertain | Flag as "emerging pattern — confidence: low" |
| Action item unclear | Make best judgment, flag for Rich's review |

### Indexing Decisions
| Situation | Decision |
|-----------|----------|
| Multiple topics in one synthesis | Create tags for all; primary topic determines namespace |
| Person mentioned in passing | Don't tag unless substantive |
| Project tangentially related | Tag only if actionable connection |

---

## 8. PROCESS

### Step 1: Collection (Automated/AI)
- [ ] Pull Daily AI Logs for period
- [ ] Query Pinecone activity-logs for period
- [ ] Check Notion hubs for updates
- [ ] Review Fireflies for meetings (if applicable)

### Step 2: Processing
- [ ] Extract key points from each source
- [ ] Identify topics and themes
- [ ] Flag significant decisions
- [ ] Note relationship dynamics

### Step 3: Pattern Recognition
- [ ] Look for connections across conversations
- [ ] Identify emerging themes
- [ ] Surface non-obvious insights
- [ ] Note what's changed from previous synthesis

### Step 4: Output Creation
- [ ] Draft Knowledge Artifact (comprehensive)
- [ ] Extract Audio Brief (compressed)
- [ ] Add Pinecone metadata
- [ ] Create cross-references

### Step 5: Indexing
- [ ] Save to Obsidian locations
- [ ] Push to Pinecone third-brain namespace
- [ ] Update any relevant Notion hubs
- [ ] Log synthesis completion to Daily AI Log

---

## 9. COMPLETION STANDARD

### Definition of Done
- [ ] Audio Brief produced and saved
- [ ] Knowledge Artifact produced and saved
- [ ] Both indexed to Pinecone
- [ ] Cross-references created
- [ ] Daily AI Log updated with synthesis completion

### Quality Check
- [ ] Audio Brief stands alone (no context needed)
- [ ] Knowledge Artifact queryable
- [ ] Patterns surfaced (not just summaries)
- [ ] Actions clear
- [ ] Tags comprehensive

---

## 10. SPECIAL CONSIDERATIONS

### Max Meyes Protocol
- Always capture relationship dynamics, not just technical/business
- Note emotional/trust indicators
- Track equity/partnership evolution
- Flag any tension or alignment shifts

### Strategic Profits Context
- Connect learnings to ZenithPro, ZenithMind, SOW programs
- Note competitive intelligence
- Track methodology evolution
- Flag content opportunities

### Compound Intelligence Goal
- Each synthesis should make future queries more valuable
- Build on previous syntheses (reference them)
- Create retrievable knowledge, not just summaries

---

#ai-execution-spec #third-brain #synthesis #knowledge-management
