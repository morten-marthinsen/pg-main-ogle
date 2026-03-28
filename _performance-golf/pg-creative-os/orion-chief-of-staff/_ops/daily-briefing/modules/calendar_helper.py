"""Shared Google Calendar helper for daily briefing modules.

Handles authentication and event fetching so individual modules
don't duplicate Calendar connection logic. Mirrors gmail_helper.py pattern.
"""

from datetime import datetime, date, timedelta, time
from pathlib import Path
from typing import Optional

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/calendar.events"]
SCRIPT_DIR = Path(__file__).resolve().parent.parent  # daily-briefing/


def get_calendar_service(env: dict):
    """Build and return an authenticated Google Calendar API service."""
    creds_path = env.get("CALENDAR_CREDENTIALS_PATH", "")
    token_path = env.get("CALENDAR_TOKEN_PATH", "")

    if not creds_path or not token_path:
        raise RuntimeError("CALENDAR_CREDENTIALS_PATH or CALENDAR_TOKEN_PATH missing from .env")

    # Resolve relative paths from daily-briefing dir
    creds_path = SCRIPT_DIR / creds_path
    token_path = SCRIPT_DIR / token_path

    if not token_path.exists():
        raise RuntimeError(f"Calendar token not found at {token_path}. Run: python3 auth/calendar_auth.py")

    creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)

    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
        with open(token_path, "w") as f:
            f.write(creds.to_json())

    return build("calendar", "v3", credentials=creds)


def fetch_events_for_date(service, target_date: date, timezone: str = "America/New_York") -> list:
    """Fetch all events for a single date. Returns raw event list."""
    start = datetime.combine(target_date, time.min).isoformat()
    end = datetime.combine(target_date + timedelta(days=1), time.min).isoformat()

    result = service.events().list(
        calendarId="primary",
        timeMin=start + "Z" if "T" in start else f"{target_date.isoformat()}T00:00:00Z",
        timeMax=end + "Z" if "T" in end else f"{(target_date + timedelta(days=1)).isoformat()}T00:00:00Z",
        timeZone=timezone,
        singleEvents=True,
        orderBy="startTime",
    ).execute()

    return result.get("items", [])


def fetch_events_range(service, start_date: date, end_date: date,
                       timezone: str = "America/New_York") -> list:
    """Fetch events across a date range (inclusive). Returns raw event list."""
    result = service.events().list(
        calendarId="primary",
        timeMin=f"{start_date.isoformat()}T00:00:00Z",
        timeMax=f"{(end_date + timedelta(days=1)).isoformat()}T00:00:00Z",
        timeZone=timezone,
        singleEvents=True,
        orderBy="startTime",
    ).execute()

    return result.get("items", [])


def parse_event(event: dict, timezone: str = "America/New_York") -> dict:
    """Normalize a Calendar API event into a clean dict.

    Handles both all-day events (date) and timed events (dateTime).
    Extracts attendees, conference links, and computes duration.
    """
    start_raw = event.get("start", {})
    end_raw = event.get("end", {})

    is_all_day = "date" in start_raw and "dateTime" not in start_raw

    if is_all_day:
        start_dt = None
        end_dt = None
        start_date_val = start_raw.get("date", "")
        duration_minutes = None
    else:
        start_str = start_raw.get("dateTime", "")
        end_str = end_raw.get("dateTime", "")
        start_dt = _parse_datetime(start_str) if start_str else None
        end_dt = _parse_datetime(end_str) if end_str else None
        start_date_val = start_dt.strftime("%Y-%m-%d") if start_dt else ""
        duration_minutes = int((end_dt - start_dt).total_seconds() / 60) if start_dt and end_dt else None

    # Extract attendees (exclude self/organizer for brevity)
    attendees = []
    for att in event.get("attendees", []):
        if att.get("self"):
            continue
        name = att.get("displayName") or att.get("email", "").split("@")[0]
        response = att.get("responseStatus", "needsAction")
        attendees.append({"name": name, "response": response})

    # Conference link (Google Meet, Zoom, etc.)
    conference_link = None
    conf_data = event.get("conferenceData", {})
    for ep in conf_data.get("entryPoints", []):
        if ep.get("entryPointType") == "video":
            conference_link = ep.get("uri")
            break

    # Self response status
    self_response = "accepted"
    for att in event.get("attendees", []):
        if att.get("self"):
            self_response = att.get("responseStatus", "accepted")
            break

    return {
        "id": event.get("id", ""),
        "summary": event.get("summary", "(No title)"),
        "is_all_day": is_all_day,
        "start_dt": start_dt,
        "end_dt": end_dt,
        "start_date": start_date_val,
        "duration_minutes": duration_minutes,
        "status": event.get("status", "confirmed"),
        "self_response": self_response,
        "attendees": attendees,
        "attendee_count": len(attendees),
        "conference_link": conference_link,
        "location": event.get("location", ""),
        "description": (event.get("description") or "")[:500],
    }


def format_time(dt: Optional[datetime], **kwargs) -> str:
    """Format a datetime for display (e.g., '9:30 AM').

    Times are already in the correct display timezone because the Calendar API
    is called with display_timezone from config (defaults to America/New_York).
    """
    if dt is None:
        return "All day"
    return dt.strftime("%-I:%M %p")


def format_duration(minutes: Optional[int]) -> str:
    """Format duration in minutes to human-readable string."""
    if minutes is None:
        return "All day"
    if minutes < 60:
        return f"{minutes}m"
    hours = minutes // 60
    remaining = minutes % 60
    if remaining == 0:
        return f"{hours}h"
    return f"{hours}h {remaining}m"


def append_agenda_item(service, event_id: str, agenda_item: str,
                       calendar_id: str = "primary") -> dict:
    """Append an agenda bullet to event description without notifying attendees.

    Uses sendUpdates='none' to suppress notification emails.
    """
    event = service.events().get(
        calendarId=calendar_id, eventId=event_id
    ).execute()
    description = event.get("description", "") or ""
    new_line = f"\n- {agenda_item}" if description else f"- {agenda_item}"
    event["description"] = description + new_line
    return service.events().patch(
        calendarId=calendar_id,
        eventId=event_id,
        body={"description": event["description"]},
        sendUpdates="none",
    ).execute()


def find_event_by_name(service, event_name: str, target_date: date,
                       timezone: str = "America/New_York") -> Optional[dict]:
    """Find an event by partial name match on a given date. Returns raw event or None."""
    events = fetch_events_for_date(service, target_date, timezone)
    for ev in events:
        if event_name.lower() in ev.get("summary", "").lower():
            return ev
    return None


def _parse_datetime(dt_str: str) -> Optional[datetime]:
    """Parse an ISO datetime string from Google Calendar API.

    Handles formats like:
    - 2026-02-21T09:00:00-05:00
    - 2026-02-21T14:00:00Z
    """
    if not dt_str:
        return None
    # Strip timezone suffix for naive parsing — the API returns
    # times already converted to the requested timezone
    dt_str_clean = dt_str
    if dt_str.endswith("Z"):
        dt_str_clean = dt_str[:-1]
    elif "+" in dt_str[10:] or dt_str.count("-") > 2:
        # Has timezone offset like -05:00 — strip it
        # Find the last +/- that's part of timezone (after the T)
        t_pos = dt_str.find("T")
        if t_pos > 0:
            rest = dt_str[t_pos:]
            for i in range(len(rest) - 1, 0, -1):
                if rest[i] in "+-":
                    dt_str_clean = dt_str[:t_pos + i]
                    break
    try:
        return datetime.fromisoformat(dt_str_clean)
    except ValueError:
        return None
