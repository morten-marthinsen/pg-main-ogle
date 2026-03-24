"""Module 3: Golf Lexicon Builder
Extracts golf-specific terminology from industry articles (via M2 Gmail data)
and presents 10 numbered suggestions for Christopher to accept or deny.
Accepted terms are appended to pg-golf-lexicon.csv during the daily review pass."""

import csv
from pathlib import Path
from .base import BriefingModule
from .gmail_helper import get_gmail_service, fetch_emails_with_content

LEXICON_CSV = Path(__file__).resolve().parents[3] / "_reference" / "pg-golf-lexicon.csv"


def load_existing_terms(csv_path: Path) -> set:
    """Load existing WORD/PHRASE values from the lexicon CSV (lowercased for dedup)."""
    terms = set()
    if not csv_path.exists():
        return terms
    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            word = row.get("WORD/PHRASE", "").strip().lower()
            if word:
                terms.add(word)
    return terms


def append_terms_to_csv(csv_path: Path, terms: list):
    """Append accepted terms to the lexicon CSV.
    Each term is a dict with keys: word, triggered, definition."""
    with open(csv_path, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        for t in terms:
            writer.writerow([t["word"], t.get("triggered", ""), t.get("definition", "")])


class GolfLexiconBuilderModule(BriefingModule):
    name = "Golf Lexicon Suggestions"
    key = "m3_golf_lexicon_builder"
    setup_required = "—"

    def fetch_data(self):
        service = get_gmail_service(self.env)

        # Reuse M2's query to get the same golf industry emails
        m2_config = self.config.get("modules", {}).get("m2_golf_industry_intel", {})
        query = m2_config.get("gmail_query", "from:googlealerts-noreply@google.com subject:golf")
        lookback = m2_config.get("lookback_hours", 24)
        full_query = f"{query} newer_than:{lookback}h"

        emails = fetch_emails_with_content(
            service, full_query, max_results=10, logger=self.logger
        )
        self.logger.info(f"[{self.key}] Fetched {len(emails)} emails for lexicon extraction")
        return emails

    def analyze(self, emails):
        if not emails:
            return "_No golf articles to extract terminology from today._\n"

        api_key = self.env.get("ANTHROPIC_API_KEY", "")
        if not api_key:
            return "_ANTHROPIC_API_KEY required for terminology extraction._\n"

        # Load existing terms to avoid suggesting duplicates
        existing = load_existing_terms(LEXICON_CSV)
        existing_sample = ", ".join(sorted(list(existing))[:30])

        email_content = "\n\n---\n\n".join(
            f"Subject: {e['subject']}\n\n{e['body'][:2000]}"
            for e in emails
        )

        ai_extract = self.call_anthropic(
            system_prompt=(
                "You are a golf copywriting and advertising terminology expert helping a creative "
                "leader build a lexicon of high-impact words and phrases for ad copy.\n\n"
                "Extract golf-related terms, phrases, and vivid language from these articles that "
                "would be USEFUL IN ADVERTISING AND COPYWRITING. Prioritize:\n"
                "1. Emotionally charged phrases that create urgency or desire\n"
                "2. Vivid golf imagery that paints a picture (e.g., 'burned the edges')\n"
                "3. Power words and action phrases that work in headlines/hooks\n"
                "4. Technical terms that signal insider credibility\n"
                "5. Metaphors and analogies from golf that transfer to ad copy\n\n"
                "IMPORTANT: Do NOT suggest any of these terms that are already in the lexicon:\n"
                f"{existing_sample}\n"
                f"(There are {len(existing)} total existing terms.)\n\n"
                "Output EXACTLY 10 suggestions as a numbered list in this format:\n"
                "1. **Term or Phrase** — Why it's useful for copywriting/advertising. "
                "[Definition if needed]\n\n"
                "Each suggestion must be a distinct term. Focus on advertising utility, "
                "not just golf knowledge."
            ),
            user_content=email_content,
            max_tokens=800,
        )

        # Auto-add: parse suggestions and append to lexicon CSV
        mod_config = self.config.get("modules", {}).get(self.key, {})
        auto_add = mod_config.get("auto_add", False)
        added_count = 0

        if auto_add:
            import re
            terms_to_add = []
            for line in ai_extract.split("\n"):
                m = re.match(r"\d+\.\s+\*\*(.+?)\*\*\s*[—\-–]\s*(.+)", line.strip())
                if m:
                    word = m.group(1).strip()
                    definition = m.group(2).strip()
                    if word.lower() not in existing:
                        terms_to_add.append({
                            "word": word,
                            "triggered": "M3_auto",
                            "definition": definition,
                        })

            if terms_to_add:
                # Ensure CSV exists with header
                if not LEXICON_CSV.exists():
                    LEXICON_CSV.parent.mkdir(parents=True, exist_ok=True)
                    with open(LEXICON_CSV, "w", newline="", encoding="utf-8") as f:
                        import csv as csv_mod
                        csv_mod.writer(f).writerow(["WORD/PHRASE", "TRIGGERED BY", "DEFINITION"])

                append_terms_to_csv(LEXICON_CSV, terms_to_add)
                added_count = len(terms_to_add)
                self.logger.info(f"[{self.key}] Auto-added {added_count} terms to lexicon")

        lines = [
            f"**Scanned {len(emails)} golf article(s)** — 10 suggestions extracted.\n",
            f"_Existing lexicon: {len(existing)} terms. Duplicates excluded._\n",
            ai_extract,
        ]

        if auto_add and added_count:
            lines.append(f"\n**{added_count} term(s) auto-added** to `pg-golf-lexicon.csv`.")
        elif auto_add:
            lines.append("\n_All suggestions were duplicates — nothing added._")
        else:
            lines.append('\n**To accept**: reply "keep 1, 3, 7" (etc.) and I\'ll add them to `pg-golf-lexicon.csv`.')

        return "\n".join(lines)
