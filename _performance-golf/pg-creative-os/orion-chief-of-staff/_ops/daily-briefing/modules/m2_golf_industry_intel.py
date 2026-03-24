"""Module 2: Golf Industry Intel
Parses Google Alert emails for golf industry news and delivers
a daily briefing on trends, with hyperlinked sources and action steps."""

from .base import BriefingModule
from .gmail_helper import get_gmail_service, fetch_emails_with_content
from .prd_context import SCORECARD_CONTEXT


class GolfIndustryIntelModule(BriefingModule):
    name = "Golf Industry Intel"
    key = "m2_golf_industry_intel"
    setup_required = "—"

    def fetch_data(self):
        service = get_gmail_service(self.env)

        mod_config = self.config.get("modules", {}).get(self.key, {})
        query = mod_config.get("gmail_query", "from:googlealerts-noreply@google.com subject:golf")
        max_articles = mod_config.get("max_articles", 10)
        lookback = mod_config.get("lookback_hours", 24)

        # Add time filter
        full_query = f"{query} newer_than:{lookback}h"

        emails = fetch_emails_with_content(
            service, full_query, max_results=max_articles, logger=self.logger
        )
        self.logger.info(f"[{self.key}] Fetched {len(emails)} Google Alert emails")
        return emails

    def analyze(self, emails):
        if not emails:
            return "_No golf industry alerts found in the last 24 hours._\n"

        # Build summary table
        lines = [f"**{len(emails)} Google Alert email(s)** found in the last 24 hours.\n"]
        lines.append("| # | Subject | Date |")
        lines.append("|---|---------|------|")
        for i, e in enumerate(emails, 1):
            subj = e["subject"][:60].replace("|", "-")
            date_str = e["date"][:25] if e["date"] else "?"
            lines.append(f"| {i} | {subj} | {date_str} |")

        # Collect all article URLs from all emails for the AI to reference
        all_urls = []
        for e in emails:
            all_urls.extend(e.get("urls", []))

        # Build URL reference list for the AI prompt
        url_ref = ""
        if all_urls:
            url_lines = [f"  [{i+1}] {url}" for i, url in enumerate(all_urls[:30])]
            url_ref = (
                "\n\nAvailable article URLs (use the most relevant one for each takeaway):\n"
                + "\n".join(url_lines)
            )

        # AI summary with hyperlinks and action steps
        api_key = self.env.get("ANTHROPIC_API_KEY", "")
        if api_key and emails:
            email_content = "\n\n---\n\n".join(
                f"=== EMAIL {i} of {len(emails)} ===\nSubject: {e['subject']}\nDate: {e['date']}\n\n{e['body'][:2000]}"
                for i, e in enumerate(emails, 1)
            )
            ai_summary = self.call_anthropic(
                system_prompt=(
                    "You are Orion, a strategic Chief of Staff for the Interim Creative Lead "
                    "at Performance Golf. Summarize the golf industry news from these Google Alert "
                    "emails. Focus on:\n"
                    "1. Trends relevant to golf marketing, DTC brands, or content strategy\n"
                    "2. Competitor moves (other golf brands, golf media companies)\n"
                    "3. Anything Christopher should mention in meetings to sound informed\n\n"
                    "IMPORTANT: Cover stories from ALL provided emails equally. Do not let one "
                    "category (e.g., equipment/products) dominate over another (e.g., tournaments/"
                    "industry news). Ensure every email's content is represented in the output.\n\n"
                    f"{SCORECARD_CONTEXT}\n\n"
                    "OUTPUT FORMAT (follow exactly):\n"
                    "- Use a numbered list (1. 2. 3.) not bullets. One item per distinct news story "
                    "or trend. No artificial cap — include every story worth knowing about. Skip "
                    "only true duplicates or irrelevant filler.\n"
                    "- Each item: 1-2 sentences. Be specific — name companies and data points.\n"
                    "- Format each item as a markdown hyperlink over the takeaway name if a "
                    "source URL is available:\n"
                    "  1. [**Takeaway headline**](https://source-url) — Summary sentence. (from: Golf Products)\n"
                    "  If no matching URL is available, just bold the headline:\n"
                    "  1. **Takeaway headline** — Summary sentence. (from: Golf)\n"
                    "- After each takeaway, include a parenthetical source tag indicating which "
                    "email it came from — e.g., '(from: Golf Products)' or '(from: Golf)'. "
                    "Derive the tag from the email's subject line.\n"
                    "- IMMEDIATELY after each numbered item, add an indented sub-item:\n"
                    "    - **Proposed Action Step:** [One specific, concise action aligned to the "
                    "30/60/90 scorecard above. If no actionable opportunity exists, write "
                    "'None. Information only.']\n\n"
                    "Example:\n"
                    "1. [**Brand X launches AI-powered club fitting**](https://example.com/article) — "
                    "Brand X rolled out AI fitting kiosks in 200 retail locations, targeting DTC conversion.\n"
                    "   - **Proposed Action Step:** Brief Tess to monitor Brand X ad spend shifts "
                    "this quarter for competitive intel.\n"
                ),
                user_content=email_content + url_ref,
                max_tokens=1200,
            )
            lines.append(f"\n#### Key Takeaways\n\n{ai_summary}")

        return "\n".join(lines)
