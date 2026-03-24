"""One-time Slack OAuth setup script for the daily briefing pipeline.

Runs the OAuth flow to get a user token for read-only Slack access.
Opens a browser window for you to authorize, then saves the token locally.

Required scopes (read-only):
  channels:read, channels:history, groups:read, groups:history,
  im:read, im:history, mpim:read, mpim:history, users:read, users:read.email

Usage:
  1. Create a Slack app at https://api.slack.com/apps
  2. Add the redirect URL: https://localhost:3119/callback (Slack requires HTTPS)
  3. Set SLACK_CLIENT_ID and SLACK_CLIENT_SECRET in your .env
  4. Run: python3 setup/slack_auth.py
  5. Accept the self-signed cert in your browser when prompted
"""

import json
import os
import ssl
import subprocess
import webbrowser
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

import requests

AUTH_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "auth")
TOKEN_PATH = os.path.join(AUTH_DIR, "slack_token.json")
CERT_DIR = AUTH_DIR

# Read-only scopes
SCOPES = [
    "channels:read",
    "channels:history",
    "groups:read",
    "groups:history",
    "im:read",
    "im:history",
    "mpim:read",
    "mpim:history",
    "users:read",
    "users:read.email",
]
REDIRECT_PORT = 3119
REDIRECT_URI = f"https://localhost:{REDIRECT_PORT}/callback"

auth_code = None


class CallbackHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        global auth_code
        parsed = urlparse(self.path)
        if parsed.path == "/callback":
            qs = parse_qs(parsed.query)
            auth_code = qs.get("code", [None])[0]
            error = qs.get("error", [None])[0]
            if error:
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.end_headers()
                self.wfile.write(
                    f"<h1>Authorization failed</h1><p>Error: {error}</p>".encode()
                )
            else:
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.end_headers()
                self.wfile.write(
                    b"<h1>Success!</h1><p>You can close this window and return to the terminal.</p>"
                )
        else:
            self.send_error(404)

    def log_message(self, format, *args):
        pass


def _ensure_localhost_cert():
    """Create a self-signed cert for localhost if not present."""
    cert_pem = os.path.join(CERT_DIR, "localhost-cert.pem")
    key_pem = os.path.join(CERT_DIR, "localhost-key.pem")
    if os.path.exists(cert_pem) and os.path.exists(key_pem):
        return cert_pem, key_pem
    os.makedirs(CERT_DIR, exist_ok=True)
    print("Generating self-signed certificate for localhost...")
    subprocess.run(
        [
            "openssl", "req", "-new", "-x509", "-nodes",
            "-subj", "/CN=localhost",
            "-days", "365",
            "-out", cert_pem,
            "-keyout", key_pem,
        ],
        check=True,
        capture_output=True,
        cwd=CERT_DIR,
    )
    return cert_pem, key_pem


def main():
    os.makedirs(AUTH_DIR, exist_ok=True)

    client_id = os.environ.get("SLACK_CLIENT_ID") or _load_from_env_file("SLACK_CLIENT_ID")
    client_secret = os.environ.get("SLACK_CLIENT_SECRET") or _load_from_env_file("SLACK_CLIENT_SECRET")

    if not client_id or not client_secret:
        env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env")
        print("SLACK_CLIENT_ID and SLACK_CLIENT_SECRET required.")
        print(f"Add them to {env_path} or set as environment variables.")
        print("\nTo create a Slack app:")
        print("  1. Go to https://api.slack.com/apps -> Create New App -> From scratch")
        print("  2. OAuth & Permissions -> add Redirect URL: https://localhost:3119/callback")
        print("  3. Add User Token Scopes (read-only): channels:read, channels:history,")
        print("     groups:read, groups:history, im:read, im:history, mpim:read, mpim:history,")
        print("     users:read, users:read.email")
        print("  4. Basic Information -> copy Client ID and Client Secret to .env")
        return

    cert_pem, key_pem = _ensure_localhost_cert()

    auth_url = (
        "https://slack.com/oauth/v2/authorize"
        f"?client_id={client_id}"
        f"&user_scope={','.join(SCOPES)}"
        f"&redirect_uri={REDIRECT_URI}"
    )

    skip_browser = os.environ.get("SKIP_BROWSER", "").lower() in ("1", "true", "yes")
    if not skip_browser:
        print("Opening browser for Slack authorization...")
        print("(Accept the self-signed certificate warning if your browser prompts you)")
        webbrowser.open(auth_url)
    else:
        print("Waiting for authorization (SKIP_BROWSER=1, navigate to the URL manually)...")
        print(auth_url)

    server = HTTPServer(("localhost", REDIRECT_PORT), CallbackHandler)
    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ctx.load_cert_chain(cert_pem, key_pem)
    server.socket = ctx.wrap_socket(server.socket, server_side=True)
    server.handle_request()

    if not auth_code:
        print("No authorization code received. Did you approve the app?")
        return

    resp = requests.post(
        "https://slack.com/api/oauth.v2.access",
        data={
            "client_id": client_id,
            "client_secret": client_secret,
            "code": auth_code,
            "redirect_uri": REDIRECT_URI,
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    data = resp.json()

    if not data.get("ok"):
        print(f"Token exchange failed: {data.get('error', 'unknown')}")
        return

    token_data = {
        "access_token": data.get("authed_user", {}).get("access_token") or data.get("access_token"),
        "user_id": data.get("authed_user", {}).get("id", ""),
        "team_id": data.get("team", {}).get("id", ""),
        "scope": data.get("scope", ""),
    }

    with open(TOKEN_PATH, "w") as f:
        json.dump(token_data, f, indent=2)

    print(f"\nToken saved to: {TOKEN_PATH}")
    print("\nSlack OAuth setup complete!")


def _load_from_env_file(key):
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env")
    if not os.path.exists(env_path):
        return None
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                if k.strip() == key:
                    return v.strip()
    return None


if __name__ == "__main__":
    main()
