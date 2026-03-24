# Rapid Research Intake Template

**Version:** 1.0
**Purpose:** Capture the minimum information needed to execute a rapid research probe. This replaces the full 7-section research brief for rapid-mode engagements.

---

## How to Use

Fill in the 3 sections below. Section 1 is required. Sections 2-3 are strongly recommended but the system can infer defaults if blank.

Conversational intake is preferred — the agent asks questions and populates this template from the answers. The operator does NOT need to fill this template manually.

---

## Section 1: PRODUCT / NICHE (Required)

```yaml
product_or_niche:
  name: ""                    # Product name, brand name, or niche description
  category: ""                # Market category (e.g., "Golf Training Aid", "Supplement", "SaaS")
  description: ""             # 1-3 sentences — what it does or what the niche is about
  price_point: ""             # Approximate price or range (if applicable, "N/A" if niche scout)
  known_urls:                 # Existing URLs to start from (sales pages, competitor pages, forums)
    - ""
  source_material:            # Any docs the operator can provide (PDFs, Google Docs, etc.)
    - ""
```

**If niche scouting (no specific product):** Set `name` to the niche descriptor (e.g., "Youth Golf Training"), leave `price_point` as "N/A", and provide URLs to relevant communities or competitor products.

---

## Section 2: AUDIENCE (Recommended)

```yaml
audience:
  who: ""                     # Who experiences this problem / buys this product
  age_range: ""               # Approximate (e.g., "35-55", "parents of kids 5-12")
  awareness_level: ""         # Unaware / Problem-Aware / Solution-Aware / Product-Aware / Most-Aware
  where_they_talk:            # Platforms where this audience discusses the topic
    - ""                      # e.g., Reddit, Facebook Groups, Amazon reviews, forums
  known_pain_points:          # What you already suspect (to be validated, not assumed)
    - ""
```

**If unknown:** Leave blank. The agent will infer from source material and initial scraping. Flag inference in output.

---

## Section 3: HYPOTHESES (Recommended, max 3)

```yaml
hypotheses:
  - statement: ""             # e.g., "Parents feel guilty about screen time replacing outdoor play"
    evidence_direction: ""    # What would VALIDATE this? (e.g., "guilt language in forum posts")

  - statement: ""
    evidence_direction: ""

  - statement: ""
    evidence_direction: ""
```

**Rules:**
- Maximum 3 hypotheses. More than 3 diffuses the probe.
- Hypotheses are TESTED, not confirmed. The system may invalidate them.
- If no hypotheses: the probe runs in "open scout" mode — pattern detection without directional testing.

---

## Populated Example

```yaml
# Section 1
product_or_niche:
  name: "Youth Golf Training"
  category: "Sports Training / Youth Athletics"
  description: "Training aids and programs designed to teach golf to children ages 5-14"
  price_point: "$30-200 range for training aids, $500-2000 for programs"
  known_urls:
    - "https://www.reddit.com/r/golf/search?q=kids+golf"
    - "https://www.amazon.com/s?k=kids+golf+training+aid"
  source_material: []

# Section 2
audience:
  who: "Parents of children ages 5-14 interested in golf"
  age_range: "30-50 (parents)"
  awareness_level: "Problem-Aware"
  where_they_talk:
    - "Reddit r/golf, r/GolfSwing"
    - "Facebook groups for junior golf"
    - "Amazon reviews for kids golf equipment"
  known_pain_points:
    - "Kids lose interest quickly"
    - "Adult instruction methods don't work for kids"

# Section 3
hypotheses:
  - statement: "Parents want their kids to enjoy golf but feel the sport is too adult-oriented"
    evidence_direction: "Language about frustration with adult-focused instruction/equipment"

  - statement: "The biggest barrier is retention — kids try golf and quit within months"
    evidence_direction: "Reviews/posts mentioning kids quitting, losing interest, equipment gathering dust"
```

---

## Agent Processing Rules

After intake is complete, the agent:

1. Validates Section 1 has minimum fields populated (name, category, description)
2. Infers missing Section 2 fields from source material if available
3. Creates a `rapid-intake.yaml` file in the project folder
4. Proceeds to Phase 2 (Targeted Scraping) — no human checkpoint required on intake
5. If Section 1 is too thin to identify sources, asks 1-2 clarifying questions before proceeding

**Do NOT over-interview.** The intake should take ~5 minutes. If the operator gives you a product name and a URL, that is enough to start. Infer the rest.
