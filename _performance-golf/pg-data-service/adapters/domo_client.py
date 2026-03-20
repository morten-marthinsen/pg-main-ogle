"""Domo API client.

Bundled into the project so consumers don't need an external path dependency.

Requires DOMO_CLIENT_ID and DOMO_CLIENT_SECRET in .env.
"""

import os

import pandas as pd
import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "https://api.domo.com"

ALL_SCOPES = ["data", "user", "dashboard", "audit", "account", "workflow"]


class DomoClient:
    def __init__(self, client_id=None, client_secret=None, scopes=None):
        self.client_id = client_id or os.getenv("DOMO_CLIENT_ID")
        self.client_secret = client_secret or os.getenv("DOMO_CLIENT_SECRET")
        self.scopes = scopes or ALL_SCOPES
        self.token = None
        self._authenticate()

    def _authenticate(self):
        granted = []
        for scope in self.scopes:
            resp = requests.get(
                f"{BASE_URL}/oauth/token",
                params={"grant_type": "client_credentials", "scope": scope},
                auth=(self.client_id, self.client_secret),
            )
            if resp.status_code == 200:
                granted.append(scope)

        if not granted:
            raise Exception("No scopes were granted. Check your client credentials and permissions.")

        params = [("grant_type", "client_credentials")]
        for scope in granted:
            params.append(("scope", scope))
        resp = requests.get(
            f"{BASE_URL}/oauth/token",
            params=params,
            auth=(self.client_id, self.client_secret),
        )
        resp.raise_for_status()
        self.token = resp.json()["access_token"]
        self.granted_scopes = granted
        # Authenticated with scopes: granted

    def _headers(self):
        return {"Authorization": f"Bearer {self.token}"}

    def _get(self, path, params=None):
        resp = requests.get(
            f"{BASE_URL}{path}",
            headers=self._headers(),
            params=params,
        )
        resp.raise_for_status()
        return resp.json()

    def _get_text(self, path, params=None):
        resp = requests.get(
            f"{BASE_URL}{path}",
            headers=self._headers(),
            params=params,
        )
        resp.raise_for_status()
        return resp.text

    # --- Datasets ---

    def list_datasets(self, limit=50, offset=0):
        return self._get("/v1/datasets", {"limit": limit, "offset": offset})

    def list_all_datasets(self):
        all_datasets = []
        offset = 0
        while True:
            batch = self.list_datasets(limit=50, offset=offset)
            if not batch:
                break
            all_datasets.extend(batch)
            offset += len(batch)
        return all_datasets

    def get_dataset(self, dataset_id):
        return self._get(f"/v1/datasets/{dataset_id}")

    def get_dataset_data(self, dataset_id, include_csv_header=True):
        return self._get_text(
            f"/v1/datasets/{dataset_id}/data",
            {"includeHeader": str(include_csv_header).lower()},
        )

    def query_dataset(self, dataset_id, sql):
        """Run a SQL query against a dataset. e.g. 'SELECT * FROM table LIMIT 100'"""
        resp = requests.post(
            f"{BASE_URL}/v1/datasets/query/execute/{dataset_id}",
            headers={**self._headers(), "Content-Type": "application/json"},
            json={"sql": sql},
        )
        resp.raise_for_status()
        result = resp.json()
        columns = result.get("columns", [])
        rows = result.get("rows", [])
        return pd.DataFrame(rows, columns=columns)

    def get_dataset_schema(self, dataset_id):
        """Get the column schema for a dataset."""
        meta = self.get_dataset(dataset_id)
        return meta.get("schema", {}).get("columns", [])

    # --- Users ---

    def list_users(self, limit=500, offset=0):
        return self._get("/v1/users", {"limit": limit, "offset": offset})

    def list_all_users(self):
        all_users = []
        offset = 0
        while True:
            batch = self.list_users(limit=500, offset=offset)
            if not batch:
                break
            all_users.extend(batch)
            offset += len(batch)
        return all_users

    def get_user(self, user_id):
        return self._get(f"/v1/users/{user_id}")

    # --- Groups ---

    def list_groups(self, limit=500, offset=0):
        return self._get("/v1/groups", {"limit": limit, "offset": offset})

    # --- Pages / Dashboards ---

    def list_pages(self, limit=50, offset=0):
        return self._get("/v1/pages", {"limit": limit, "offset": offset})

    def list_all_pages(self):
        all_pages = []
        offset = 0
        while True:
            batch = self.list_pages(limit=50, offset=offset)
            if not batch:
                break
            all_pages.extend(batch)
            offset += len(batch)
        return all_pages

    def get_page(self, page_id):
        return self._get(f"/v1/pages/{page_id}")

    # --- Activity Log (Audit) ---

    def get_activity_log(self, start, end, limit=50, offset=0):
        """start/end as epoch milliseconds."""
        return self._get("/v1/audit", {
            "start": start,
            "end": end,
            "limit": limit,
            "offset": offset,
        })

    # --- Accounts ---

    def list_accounts(self):
        return self._get("/v1/accounts")
