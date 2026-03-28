"""Orion Daily Briefing — Module Registry"""

from .m00a_today_summary import TodaySummaryModule
from .m00_overnight_summary import OvernightSummaryModule
from .m0b_pending_review import PendingReviewModule
from .m0_persistent_actions import PersistentActionsModule
from .m1_automation_scanner import AutomationScannerModule
from .m2_golf_industry_intel import GolfIndustryIntelModule
from .m3_golf_lexicon_builder import GolfLexiconBuilderModule
from .m4_slack_monitor import SlackMonitorModule
from .m5_wise_reply_context import WiseReplyContextModule
from .m6_ai_newsletter_digest import AINewsletterDigestModule
from .m7_clickup_inbox import ClickUpInboxModule
from .m8_agent_status import AgentStatusModule
from .m9_transcript_intelligence import TranscriptIntelligenceModule
from .m10_kb_analyzer import KBAnalyzerModule
from .m11_meeting_prep import MeetingPrepModule
from .m12_daily_schedule import DailyScheduleModule
from .m13_clm_sync import CLMSyncModule
from .m14_production_sync import ProductionSyncModule
from .m15_data_fetch import DataFetchModule

# Ordered list of all modules — execution order.
# M00a runs LAST (needs all other modules' shared_state) but renders FIRST.
# The display_first flag is handled in daily_briefing.py.
MODULE_REGISTRY = [
    ("m00_overnight_summary", OvernightSummaryModule),
    ("m0b_pending_review", PendingReviewModule),
    ("m0_persistent_actions", PersistentActionsModule),
    ("m1_automation_scanner", AutomationScannerModule),
    ("m2_golf_industry_intel", GolfIndustryIntelModule),
    ("m3_golf_lexicon_builder", GolfLexiconBuilderModule),
    ("m4_slack_monitor", SlackMonitorModule),
    ("m5_wise_reply_context", WiseReplyContextModule),
    ("m6_ai_newsletter_digest", AINewsletterDigestModule),
    ("m7_clickup_inbox", ClickUpInboxModule),
    ("m9_transcript_intelligence", TranscriptIntelligenceModule),
    ("m10_kb_analyzer", KBAnalyzerModule),  # Chief of Staff Analyzer — above Agent Status (S125)
    ("clm_sync", CLMSyncModule),        # CLM URL Sync — right after Analyzer (S125)
    ("production_sync", ProductionSyncModule),  # Production Sync — right after CLM (S125)
    ("m8_agent_status", AgentStatusModule),  # Agent Status — moved below Analyzer (S125)
    ("m11_meeting_prep", MeetingPrepModule),
    ("m12_daily_schedule", DailyScheduleModule),
    ("m15_data_fetch", DataFetchModule),
    # M00a runs last but display_first=True — inserted at top of report
    ("m00a_today_summary", TodaySummaryModule),
]
