# S03: Brand Voice — Master Agent

**Version:** 1.0
**Skill:** S03-brand-voice
**Position:** Foundation, Step 3
**Type:** Voice Architecture + Calibration
**Dependencies:** S01 (AIF), S02 (PSF via Gate G02)
**Output:** BVF (Brand Voice File)

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + loading | haiku | Simple validation |
| 1 | Voice architecture + calibration | opus | Nuanced voice definition |
| 4 | BVF assembly + validation | sonnet | Assembly |

---

## Purpose

Codify the unique voice that will cut through noise. Voice is not words—it's the feeling behind words. Without defined voice, every piece of content is an identity crisis.

**Success Criteria:**
- Voice archetype selected (primary + secondary)
- All 8 voice dimensions scored
- 5+ signature words, 10+ power phrases defined
- 5+ banned words documented
- 2+ anti-voice examples
- 3+ on-voice hook examples
- Gate G03 validation passes (8 requirements)

---

## Identity Boundaries

**This skill IS:**
- Voice archetype selection
- Voice dimension scoring (formality, energy, complexity, etc.)
- Tone variation mapping (by platform, function, emotion)
- Language rules definition (vocabulary, syntax, rhetorical devices)
- Anti-voice definition (what we DON'T sound like)
- Voice calibration examples (on-voice vs off-voice)

**This skill is NOT:**
- Audience research (that's S01)
- Platform selection (that's S02)
- Actual content writing (that's S08-S13)

---

## Layer Map

### Layer 0: Foundation (3 microskills)
### Layer 1: Architecture (7 microskills)
### Layer 4: Output (2 microskills)

---

## Validation Requirements (Gate G03)

- [ ] voice_identity.archetype.primary (valid archetype)
- [ ] voice_identity.one_sentence_voice (not empty)
- [ ] voice_dimensions (all 8 dimensions scored)
- [ ] language_rules.signature_words (>=5)
- [ ] language_rules.power_phrases (>=10)
- [ ] language_rules.banned_words (>=5)
- [ ] anti_voice.never_sound_like (>=2)
- [ ] calibration.hook_examples.on_voice (>=3)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-04 | Initial decomposition |
