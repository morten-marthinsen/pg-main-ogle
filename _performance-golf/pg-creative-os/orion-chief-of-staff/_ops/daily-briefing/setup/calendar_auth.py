"""One-time Google Calendar OAuth setup script.

Runs the OAuth flow to get a refresh token for Calendar read+write access.
Opens a browser window for you to authorize, then saves the token locally.
Reuses the same GCP project credentials as Gmail (different scope + port).

Usage: python3 setup/calendar_auth.py
"""

import os
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

SCOPES = ["https://www.googleapis.com/auth/calendar.events"]

AUTH_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "auth")
CREDENTIALS_PATH = os.path.join(AUTH_DIR, "credentials.json")
TOKEN_PATH = os.path.join(AUTH_DIR, "calendar_token.json")


def main():
    os.makedirs(AUTH_DIR, exist_ok=True)

    if not os.path.exists(CREDENTIALS_PATH):
        print(f"Missing: {CREDENTIALS_PATH}")
        print("Download your OAuth client credentials from Google Cloud Console")
        print("and save as auth/credentials.json (see SETUP.md Step 3).")
        return

    creds = None

    if os.path.exists(TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print("Refreshing expired token...")
            creds.refresh(Request())
        else:
            print("Starting OAuth flow — a browser window will open.")
            print("Sign in with your Google account and click 'Allow'.\n")
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_PATH, SCOPES)
            creds = flow.run_local_server(port=8091)

        with open(TOKEN_PATH, "w") as f:
            f.write(creds.to_json())
        print(f"\nToken saved to: {TOKEN_PATH}")
    else:
        print("Token already exists and is valid.")

    # Quick verification — list upcoming events
    from datetime import datetime, timezone
    from googleapiclient.discovery import build
    service = build("calendar", "v3", credentials=creds)

    now = datetime.now(timezone.utc).isoformat()
    result = service.events().list(
        calendarId="primary",
        timeMin=now,
        maxResults=3,
        singleEvents=True,
        orderBy="startTime",
    ).execute()
    events = result.get("items", [])
    print(f"\nUpcoming events (next 3): {len(events)}")
    for ev in events:
        print(f"  - {ev.get('summary', '(no title)')}")

    print("\nGoogle Calendar OAuth setup complete! (scope: calendar.events — read + write)")


if __name__ == "__main__":
    main()
