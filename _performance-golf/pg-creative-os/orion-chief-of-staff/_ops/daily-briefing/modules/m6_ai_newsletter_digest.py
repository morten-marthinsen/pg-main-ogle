"""Module 6: AI Newsletter Digest
Summarizes AI newsletter subscriptions and maps actionable takeaways
to Orion PRD and Creative-OS objectives, with proposed action steps."""

from .base import BriefingModule
from .gmail_helper import get_gmail_service, fetch_emails_with_content
from .prd_context import SCORECARD_CONTEXT


class AINewsletterDigestModule(BriefingModule):
    name = "AI Newsletter Digest"
    key = "m6_ai_newsletter_digest"
    setup_required = "—"

    def fetch_data(self):
        service = get_gmail_service(self.env)

        mod_config = self.config.get("modules", {}).get(self.key, {})
        query = mod_config.get(
            "gmail_query",
            "label:newsletters newer_than:1d"
        )

        emails = fetch_emails_with_content(
            service, query, max_results=15, logger=self.logger
        )
        self.logger.info(f"[{self.key}] Fetched {len(emails)} newsletter emails")
        return emails

    def analyze(self, emails):
        if not emails:
            return "_No AI newsletter emails found in the last 24 hours._\n"

        lines = [f"**{len(emails)} AI-related email(s)** found.\n"]
        lines.append("| # | Subject | From |")
        lines.append("|---|---------|------|")
        for i, e in enumerate(emails, 1):
            subj = e["subject"][:55].replace("|", "-")
            sender = e["from"][:35].replace("|", "-")
            lines.append(f"| {i} | {subj} | {sender} |")

        # Collect URLs from all newsletter emails for AI to reference
        all_urls = []
        for e in emails:
            all_urls.extend(e.get("urls", []))

        # Build URL reference list for the AI prompt
        url_ref = ""
        if all_urls:
            url_lines = [f"  [{i+1}] {url}" for i, url in enumerate(all_urls[:30])]
            url_ref = (
                "\n\nAvailable article URLs (use the most relevant one for each insight):\n"
                + "\n".join(url_lines)
            )

        # AI summary with action steps
        api_key = self.env.get("ANTHROPIC_API_KEY", "")
        if api_key and emails:
            email_content = "\n\n---\n\n".join(
                f"Subject: {e['subject']}\nFrom: {e['from']}\n\n{e['body'][:2000]}"
                for e in emails
            )
            ai_summary = self.call_anthropic(
                system_prompt=(
                    "You are Orion, a strategic Chief of Staff. Christopher is building an AI-powered "
                    "Creative Operating System at Performance Golf with 4 agents: Orion (strategy), "
                    "Tess (data intelligence), Veda (video editing), Neco (copywriting).\n\n"
                    f"{SCORECARD_CONTEXT}\n\n"
                    "Summarize these AI newsletters. Focus on:\n"
                    "1. New AI capabilities relevant to creative production (video, copy, images)\n"
                    "2. Workflow automation patterns Christopher could apply\n"
                    "3. Industry shifts in AI-assisted marketing or content creation\n\n"
                    "OUTPUT FORMAT (follow exactly):\n"
                    "- Use a numbered list (1. 2. 3.) not bullets. One item per distinct insight. "
                    "Tag each with [AGENT: name] if it maps to a specific agent, or [STRATEGY] "
                    "if broader. Skip promotional fluff.\n"
                    "- Each item: 1-2 sentences with specific details.\n"
                    "- Format each insight as a markdown hyperlink over the headline if a "
                    "source URL is available:\n"
                    "  1. [AGENT: NECO] [**Insight headline**](https://source-url) — Details.\n"
                    "  If no matching URL is available, just bold the headline:\n"
                    "  1. [AGENT: NECO] **Insight headline** — Details.\n"
                    "- After each numbered insight, add the action step on a NEW line with a "
                    "blank line before it — NOT as an indented sub-item. Use this format:\n\n"
                    "  1. [AGENT: NECO] [**Insight headline**](url) — Insight text here.\n\n"
                    "     **Proposed Action Step:** Specific action Christopher takes in 15-30 min.\n\n"
                    "Align action steps to the 30/60/90 scorecard above. Examples: 'Test this "
                    "technique in the next Neco session', 'Ask Tess to benchmark this metric', "
                    "'Add this to the Creative OS demo talking points for John'. If no actionable "
                    "opportunity, write 'None. Information only.'\n\n"
                    "The goal is 1-3 small AI steps Christopher can take TODAY, not overwhelm. "
                    "Keep action steps concrete and achievable."
                ),
                user_content=email_content + url_ref,
                max_tokens=1000,
            )
            lines.append(f"\n#### AI Insights for Creative OS\n\n{ai_summary}")

        return "\n".join(lines)
