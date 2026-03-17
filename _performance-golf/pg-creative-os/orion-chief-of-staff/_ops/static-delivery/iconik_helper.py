"""Iconik API client for static ad delivery — Python port of Veda's TypeScript client.

Handles: asset creation, file upload (GCS resumable), collection management.
Auth: App-ID + Auth-Token headers (Application Token).
"""

import os
import mimetypes
import requests
from typing import List, Optional, Tuple

# GCS storage ID (iconik-files-gcs) — same across all PG Iconik usage
GCS_STORAGE_ID = "be9c13ce-8dd3-11ec-8e6e-4eafb0a20354"


class IconikClient:
    def __init__(self, app_id: str, auth_token: str, base_url: str = "https://app.iconik.io/API"):
        self.base_url = base_url.rstrip("/")
        self.headers = {
            "App-ID": app_id,
            "Auth-Token": auth_token,
            "Content-Type": "application/json",
        }

    # ── Storage ──────────────────────────────────────────────────────────

    def get_files_storage(self) -> Tuple[str, str]:
        """Get the GCS FILES storage. Returns (storage_id, storage_method)."""
        resp = requests.get(
            f"{self.base_url}/files/v1/storages/{GCS_STORAGE_ID}/",
            headers=self.headers,
        )
        resp.raise_for_status()
        data = resp.json()
        return data["id"], data["method"]

    # ── Asset Creation ───────────────────────────────────────────────────

    def create_asset(self, title: str) -> Tuple[str, str]:
        """Create a new asset. Returns (asset_id, user_id)."""
        resp = requests.post(
            f"{self.base_url}/assets/v1/assets/",
            headers=self.headers,
            json={"title": title, "type": "ASSET"},
        )
        resp.raise_for_status()
        data = resp.json()
        return data["id"], data["user_id"]

    def create_format(self, asset_id: str, user_id: str, media_type: str, storage_method: str) -> str:
        """Create a format entry for an asset. Returns format_id."""
        resp = requests.post(
            f"{self.base_url}/files/v1/assets/{asset_id}/formats/",
            headers=self.headers,
            json={
                "name": "ORIGINAL",
                "user_id": user_id,
                "media_type": media_type,
                "storage_methods": [storage_method],
            },
        )
        resp.raise_for_status()
        return resp.json()["id"]

    def create_file_set(self, asset_id: str, format_id: str, storage_id: str, file_name: str) -> str:
        """Create a file set. Returns file_set_id."""
        resp = requests.post(
            f"{self.base_url}/files/v1/assets/{asset_id}/file_sets/",
            headers=self.headers,
            json={
                "format_id": format_id,
                "storage_id": storage_id,
                "name": file_name,
                "base_dir": "",
                "component_ids": [],
            },
        )
        resp.raise_for_status()
        return resp.json()["id"]

    def create_file_entry(
        self, asset_id: str, file_name: str, file_size: int,
        format_id: str, file_set_id: str, storage_id: str,
    ) -> Tuple[str, str]:
        """Create a file entry and get upload URL. Returns (file_id, upload_url)."""
        from datetime import datetime, timezone
        now = datetime.now(timezone.utc).isoformat()

        resp = requests.post(
            f"{self.base_url}/files/v1/assets/{asset_id}/files/",
            headers=self.headers,
            json={
                "original_name": file_name,
                "file_name": file_name,
                "size": file_size,
                "type": "FILE",
                "directory_path": "",
                "metadata": {},
                "format_id": format_id,
                "file_set_id": file_set_id,
                "storage_id": storage_id,
                "file_date_created": now,
                "file_date_modified": now,
            },
        )
        resp.raise_for_status()
        data = resp.json()
        return data["id"], data["upload_url"]

    # ── GCS Upload (resumable protocol) ──────────────────────────────────

    def upload_to_gcs(
        self, upload_url: str, file_path: str, file_size: int,
        asset_id: str, file_id: str,
    ) -> None:
        """Upload file to GCS via Iconik's resumable upload protocol.

        1. POST signed URL with x-goog-resumable: start → get upload ID
        2. PUT file data to signed URL + &upload_id=<id>
        3. POST to Iconik compose endpoint to finalize GCS object
        """
        # Step 1: Initiate resumable upload
        init_resp = requests.post(
            upload_url,
            headers={
                "content-length": "0",
                "x-goog-resumable": "start",
            },
        )
        if init_resp.status_code not in (200, 201):
            raise RuntimeError(f"GCS resumable init failed ({init_resp.status_code}): {init_resp.text}")

        upload_id = init_resp.headers.get("x-guploader-uploadid")
        if not upload_id:
            raise RuntimeError("GCS resumable init: missing X-GUploader-UploadID header")

        # Step 2: PUT file data
        with open(file_path, "rb") as f:
            file_data = f.read()

        put_url = upload_url + "&upload_id=" + upload_id
        put_resp = requests.put(
            put_url,
            headers={
                "content-length": str(file_size),
                "content-type": "application/octet-stream",
            },
            data=file_data,
        )
        if not put_resp.ok:
            raise RuntimeError(f"GCS upload PUT failed ({put_resp.status_code}): {put_resp.text}")

        # Step 3: Compose endpoint
        compose_url = f"{self.base_url}/files/v1/assets/{asset_id}/files/{file_id}/multipart/gcs/compose_url/"
        compose_resp = requests.post(
            compose_url,
            headers=self.headers,
            json={"parts_group": None, "content_type": "application/octet-stream"},
        )
        if not compose_resp.ok:
            raise RuntimeError(f"Iconik GCS compose failed ({compose_resp.status_code}): {compose_resp.text}")

    # ── Finalize ─────────────────────────────────────────────────────────

    def finalize_upload(self, asset_id: str, file_id: str) -> None:
        """Close the file record and trigger keyframe generation."""
        # PATCH file status to CLOSED
        patch_resp = requests.patch(
            f"{self.base_url}/files/v1/assets/{asset_id}/files/{file_id}/",
            headers=self.headers,
            json={"status": "CLOSED", "progress_processed": 100},
        )
        if not patch_resp.ok:
            raise RuntimeError(f"Finalize PATCH failed ({patch_resp.status_code}): {patch_resp.text}")

        # Trigger keyframe generation
        kf_resp = requests.post(
            f"{self.base_url}/files/v1/assets/{asset_id}/files/{file_id}/keyframes/",
            headers=self.headers,
            json={},
        )
        if not kf_resp.ok:
            raise RuntimeError(f"Keyframe trigger failed ({kf_resp.status_code}): {kf_resp.text}")

    # ── Full Upload Pipeline ─────────────────────────────────────────────

    def upload_file(self, file_path: str, title: str, collection_id: Optional[str] = None) -> str:
        """Upload a single file end-to-end. Returns asset_id.

        Steps: createAsset → createFormat → createFileSet → createFileEntry
               → uploadToGcs → finalizeUpload → (optionally) addToCollection
        """
        file_size = os.path.getsize(file_path)
        file_name = os.path.basename(file_path)

        # Detect media type
        mime, _ = mimetypes.guess_type(file_path)
        media_type = mime or "application/octet-stream"

        storage_id, storage_method = self.get_files_storage()
        asset_id, user_id = self.create_asset(title)
        format_id = self.create_format(asset_id, user_id, media_type, storage_method)
        file_set_id = self.create_file_set(asset_id, format_id, storage_id, file_name)
        file_id, upload_url = self.create_file_entry(
            asset_id, file_name, file_size, format_id, file_set_id, storage_id,
        )
        self.upload_to_gcs(upload_url, file_path, file_size, asset_id, file_id)
        self.finalize_upload(asset_id, file_id)

        if collection_id:
            self.add_asset_to_collection(collection_id, asset_id)

        return asset_id

    # ── Collection Methods ───────────────────────────────────────────────

    def get_sub_collections(self, parent_id: str) -> List[dict]:
        """List sub-collections inside a parent. Returns list of {id, title}."""
        all_subs = []
        url = f"{self.base_url}/assets/v1/collections/{parent_id}/contents/?content_types=collections&per_page=100"

        while url:
            resp = requests.get(url, headers=self.headers)
            resp.raise_for_status()
            data = resp.json()
            for o in data.get("objects", []):
                all_subs.append({"id": o["id"], "title": o["title"]})
            next_url = data.get("next_url")
            url = f"{self.base_url}{next_url}" if next_url else None

        return all_subs

    def find_or_create_sub_collection(self, title: str, parent_id: str) -> str:
        """Find existing sub-collection by title (case-insensitive) or create one. Returns collection_id."""
        subs = self.get_sub_collections(parent_id)
        for s in subs:
            if s["title"].lower() == title.lower():
                return s["id"]

        print(f"  [Iconik] Creating sub-collection '{title}' under {parent_id}")
        return self.create_collection(title, parent_id)

    def create_collection(self, title: str, parent_id: str) -> str:
        """Create a sub-collection. Returns collection_id."""
        resp = requests.post(
            f"{self.base_url}/assets/v1/collections/",
            headers=self.headers,
            json={"title": title, "parent_id": parent_id},
        )
        resp.raise_for_status()
        return resp.json()["id"]

    def add_asset_to_collection(self, collection_id: str, asset_id: str) -> None:
        """Add an asset to a collection (additive only)."""
        resp = requests.post(
            f"{self.base_url}/assets/v1/collections/{collection_id}/contents/",
            headers=self.headers,
            json={"object_id": asset_id, "object_type": "assets"},
        )
        resp.raise_for_status()

    def get_collection_assets(self, collection_id: str) -> List[dict]:
        """List assets inside a collection. Returns list of {id, title}."""
        all_assets = []
        url = f"{self.base_url}/assets/v1/collections/{collection_id}/contents/?content_types=assets&per_page=100"

        while url:
            resp = requests.get(url, headers=self.headers)
            resp.raise_for_status()
            data = resp.json()
            for o in data.get("objects", []):
                all_assets.append({"id": o["id"], "title": o["title"]})
            next_url = data.get("next_url")
            url = f"{self.base_url}{next_url}" if next_url else None

        return all_assets
