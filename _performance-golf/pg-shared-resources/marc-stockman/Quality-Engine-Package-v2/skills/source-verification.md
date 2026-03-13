---
name: source-verification
description: "Source Verification Protocol (R-20). Level 2 verification for Tier 1 claims from primary vendor sources."
---

# Source Verification Protocol

**Rule:** R-20
**Version:** 1.0 | March 3, 2026
**Provenance:** Zine pricing failure in Life Brain Architecture project — plan names, prices, and tier structure were all materially wrong because a /vs/ comparison page URL was treated as verified without fetching the primary pricing page.

---

## The Problem This Solves

AI produces confident claims about pricing, features, and specs that are materially wrong. The failure mode is subtle: the AI cites a URL that exists, but either (a) the URL is a comparison/aggregator site that has stale or incorrect data, (b) the URL was fetched in a prior session and the data has changed, or (c) the AI never actually fetched the URL — it inferred the content from training data and attached a plausible-looking link.

This is Marc's #1 frustration across all sessions: AI relying on training data instead of live sources. R-20 adds verification depth to R-07's timing requirement. R-07 ensures research happens before reasoning; R-20 ensures the research reaches the primary source and is confirmed at writing time.

---

## Claim Classification

### Tier 1 Claims — MUST be Level 2 Verified

These are claims that drive recommendations, decisions, or could cause material harm if wrong:

- **Pricing** — Monthly/annual costs, plan names, what's included in each tier
- **Feature availability** — What's included vs. add-on, which tier has which capabilities
- **API specs** — Rate limits, endpoints, authentication methods, supported formats
- **Compatibility** — What integrates with what, supported platforms, version requirements
- **Vendor timelines** — Release dates, deprecation dates, migration deadlines
- **Legal/compliance** — Regulatory requirements, certification status, data residency
- **Any claim that drives a recommendation** — If the recommendation would change if this claim were wrong, it's Tier 1

### Tier 2 Claims — Level 1 Acceptable

These provide context but don't drive decisions:

- Industry trends and market estimates
- Analyst opinions and predictions
- Background context and history
- General capabilities described in reviews
- Non-specific competitive positioning

---

## Verification Levels

### Level 1: "URL Exists"

A source was found and data was extracted at some prior point. The data may be stale, secondary, or changed since extraction.

- **Acceptable for:** Tier 2 claims
- **NOT acceptable for:** Tier 1 claims
- **Citation format:** Standard markdown — [Source Name](URL)

### Level 2: "Content Verified"

The agent fetched the primary source URL at time of writing and confirmed the specific claim matches the live page.

- **Required for:** All Tier 1 claims
- **Process:**
  1. Identify the vendor's own page for the claim (not a comparison site, not a third-party article, not a review aggregator)
  2. Fetch that specific URL using fetch_url at time of writing
  3. Confirm the specific data points (prices, plan names, features, specs) match what the live page says
  4. If the page is behind a login or paywall, note this and flag the claim
- **Citation format:** `[Source Name — verified DATE](URL)`

---

## Verification Process

### During Research (R-07 Gate)

When the R-07 Research Gate fires (before any analysis/synthesis):

1. **Scan the task requirements** — identify every claim that will need to be made
2. **Classify each claim** — Tier 1 or Tier 2
3. **For Tier 1 claims:**
   - Identify the vendor's primary source page (e.g., their pricing page, their API docs, their feature comparison page)
   - Fetch that page directly using fetch_url
   - Extract the specific data points needed
   - Record in the research notes: claim, source URL, date verified, specific values found
4. **For Tier 2 claims:**
   - Standard web search is sufficient
   - Cite sources with standard Level 1 citations

### During Writing

- Every Tier 1 claim in the document uses the Level 2 citation format: `[Source Name — verified DATE](URL)`
- Every Tier 1 claim's data points match what was found during the Level 2 fetch
- If any Tier 1 claim cannot be Level 2 verified (primary source unreachable, behind login, data ambiguous), flag it explicitly: `[UNVERIFIED — primary source unreachable]` or `[UNVERIFIED — data ambiguous, see note]`
- Never silently downgrade a Tier 1 claim to Level 1 verification

### During Self Audit (Pass 1)

The self-audit R-20 sub-pass checks every Tier 1 claim in the deliverable:

1. Was the primary source (vendor's own page) fetched at writing time?
2. Does the citation point to the vendor's own page, not a comparison site?
3. If pricing is cited, was the vendor's pricing page fetched directly?
4. Flag any Tier 1 claim that relies on secondary sources, unfetched URLs, or cached results from a different session

### During CHECK (Step 1)

The CHECK R-20 specific check reviews all work since last CHECK:

1. Were Tier 1 claims verified to Level 2?
2. Were comparison sites or third-party articles treated as primary sources?
3. Flag any Tier 1 claim verified only to Level 1 that should have been Level 2

---

## Red Flags — Patterns That Indicate Verification Failure

Watch for these patterns that signal R-20 may be violated:

1. **Comparison site URLs as sources** — URLs containing `/vs/`, `/compare/`, `/alternatives/`, or aggregator domains (g2.com, capterra.com, alternativeto.net) for Tier 1 pricing/feature claims
2. **Stale session data** — Claims citing research done in a prior session without re-verification
3. **Training data confidence** — Stating pricing or features with high confidence but no fetch_url call in the current session
4. **Third-party article citations for specs** — Blog posts or news articles cited for API specs, pricing, or feature details instead of vendor docs
5. **Round numbers** — Pricing stated as round numbers ($10, $50, $100) without verification — real pricing is often non-round ($12/mo, $49/yr, $99.95)

---

## Examples

### Correct (Level 2 Verified)
> Zine's Pro plan costs $29/month and includes unlimited pages, custom domains, and analytics. ([Zine Pricing — verified Mar 3, 2026](https://zine.co/pricing))

### Incorrect (Level 1 Only — for a Tier 1 claim)
> Zine's Pro plan costs $25/month. ([TechRadar comparison](https://techradar.com/best/website-builders-vs-zine))

### Incorrect (No Verification)
> Zine offers plans starting at $10/month with basic features.

### Correct Handling When Source Unreachable
> Zine's Pro plan pricing could not be verified at time of writing. [UNVERIFIED — pricing page returned 403]. The last known price from cached search results was $29/month, but this should be confirmed before making a decision.

---

## Standing Rule

This protocol is a standing rule (R-20) that applies to every session. It is not optional and cannot be overridden by urgency, convenience, or the AI's confidence level. The Zine failure demonstrated that confident, well-formatted, citation-bearing claims can be completely wrong when the primary source is never fetched.

**Key principle:** A URL existing is not the same as the content being verified. Level 2 means the content was read and confirmed, not that a link was found.

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Self Audit | NOT RUN | — | — | — |
| CHECK | NOT RUN | — | — | — |