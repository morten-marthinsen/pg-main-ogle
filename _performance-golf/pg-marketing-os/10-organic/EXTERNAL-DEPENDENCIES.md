# EXTERNAL-DEPENDENCIES.md — Platform Knowledge Base Locations
## OrganicMarketingEngine External Data Sources
## Version 1.0 — March 2026

---

## PURPOSE

This file documents external data sources that enrich the OrganicMarketingEngine but are NOT required for operation. The engine functions fully without these — they provide additional platform-specific knowledge for teachings and specimen sourcing.

---

## PLATFORM KNOWLEDGE BASES

These directories reference an Obsidian vault containing platform-specific marketing knowledge extracted from courses, case studies, and practitioner content.

| Platform | Documents | Key Themes |
|----------|-----------|------------|
| **YouTube** | 3,784 | offers_funnels, topic_strategy, retention_delivery, ops_systems, distribution_growth, packaging, monetization |
| **TikTok** | 180 | offers_funnels, distribution_growth, topic_strategy, retention_delivery, hook_packaging, monetization |
| **Instagram** | 1,828 | offers_funnels, community_engagement, distribution_growth, monetization, retention_delivery, topic_strategy, hook_packaging |
| **Facebook** | 1,842 | offers_funnels, distribution_growth, community_engagement, monetization, retention_delivery, topic_strategy |
| **X/Twitter** | 437 | offers_funnels, distribution_growth, community_engagement, monetization, topic_strategy |
| **LinkedIn** | 2,547 | offers_funnels, monetization, distribution_growth, community_engagement, ops_systems, topic_strategy |

**TOTAL: 10,638 validated documents**

---

## SETUP (Optional)

To connect an external knowledge base:

1. Place platform directories at any accessible path
2. Update the `PLATFORM-KNOWLEDGE-INTEGRATION.md` Location column with actual paths
3. Verify document counts match or exceed minimums above

Without external knowledge bases, the engine operates using:
- Internal teachings (44 YAML files in `teachings/`)
- Internal specimens (61+ files in `specimens/`)
- Vertical profiles (5 files in `vertical-profiles/`)

---

*External enrichment is optional. Internal knowledge is sufficient for operation.*
