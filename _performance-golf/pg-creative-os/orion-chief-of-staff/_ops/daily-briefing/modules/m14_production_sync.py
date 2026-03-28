"""M14 — Production Calendar Sync Module.

Queries the ClickUp Production Calendar (list 901413170440) for shoot tasks,
updates per-offer production registries, and triggers CLM content + HTML +
Surge deploy when status changes are detected.

Detection signals:
- Task status changes (Open → in progress → upload + ingest + tag → Closed)
- "Raw Footage (URL)" custom field populated → footage delivered
- Product prefix in task name (e.g., "SF2 |", "RS1 |") → offer routing

Full chain: ClickUp → registry → sync_clm.py → MD + HTML → Surge deploy
"""

import json
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests

from .base import BriefingModule

# Status mapping: ClickUp status → CLM category
STATUS_MAP = {
    "open": "missing",
    "ready": "missing",
    "pre-production": "missing",
    "in progress": "in_production",
    "upload + ingest + tag": "in_production",
    "closed": "available",
}

LAUNCH_BOARDS_DIR = Path(__file__).resolve().parent.parent.parent / "launch-boards"


class ProductionSyncModule(BriefingModule):
    name = "Production Sync"
    key = "production_sync"
    setup_required = "ClickUp API token in .env (CLICKUP_API_TOKEN)"

    def fetch_data(self) -> Any:
        """Fetch all tasks from the Production Calendar list."""
        config = self.config.get("modules", {}).get("production_sync", {})
        if not config.get("enabled", False):
            return {"skipped": True, "reason": "production_sync.enabled = false"}

        token = self.env.get("CLICKUP_API_TOKEN", "")
        if not token:
            return {"error": "CLICKUP_API_TOKEN not set"}

        list_id = config.get("production_calendar_list_id", "901413170440")
        footage_field = config.get("footage_url_field_name", "Raw Footage (URL)")

        # Fetch all tasks (including closed) from Production Calendar
        url = f"https://api.clickup.com/api/v2/list/{list_id}/task"
        params = {"page": 0, "include_closed": "true", "subtasks": "true"}
        headers = {"Authorization": token}

        try:
            resp = requests.get(url, headers=headers, params=params, timeout=30)
            resp.raise_for_status()
            tasks = resp.json().get("tasks", [])
        except Exception as e:
            self.logger.error(f"[{self.key}] ClickUp API error: {e}")
            return {"error": str(e)}

        # Group tasks by product prefix
        offers_config = config.get("offers", {})
        offer_tasks = {}

        for offer_key, offer_cfg in offers_config.items():
            prefix = offer_cfg.get("prefix", "")
            if not prefix:
                continue
            matching = []
            for t in tasks:
                name = t.get("name", "")
                if name.startswith(f"{prefix} |"):
                    # Extract footage URL from custom fields
                    footage_url = None
                    for cf in t.get("custom_fields", []):
                        if cf.get("name") == footage_field and cf.get("value"):
                            footage_url = cf["value"]

                    matching.append({
                        "task_id": t.get("id", ""),
                        "name": name.replace(f"{prefix} | ", ""),
                        "full_name": name,
                        "status": t.get("status", {}).get("status", ""),
                        "assignees": [a.get("username", "?") for a in t.get("assignees", [])],
                        "footage_url": footage_url,
                    })
            offer_tasks[offer_key] = {
                "config": offer_cfg,
                "tasks": matching,
            }

        return {
            "total_tasks": len(tasks),
            "offers": offer_tasks,
        }

    def analyze(self, data: Any) -> str:
        """Compare ClickUp state against registries, update if changed."""
        if data.get("skipped"):
            return f"_Production sync disabled ({data.get('reason', '')})_"
        if data.get("error"):
            return f"_Production sync error: {data['error']}_"

        changes = []
        offers = data.get("offers", {})

        for offer_key, offer_data in offers.items():
            offer_cfg = offer_data["config"]
            tasks = offer_data["tasks"]
            registry_path = LAUNCH_BOARDS_DIR / offer_cfg.get("registry_path", "").lstrip("../")

            if not registry_path.exists():
                self.logger.warning(f"[{self.key}] Registry not found: {registry_path}")
                continue

            # Load existing registry
            with open(registry_path) as f:
                registry = json.load(f)

            registry_changed = False
            offer_changes = []

            for task in tasks:
                task_id = task["task_id"]
                status = task["status"].lower().strip()
                footage_url = task["footage_url"]
                clm_category = STATUS_MAP.get(status, "missing")

                # Determine footage status
                if footage_url:
                    footage_status = "delivered"
                    if clm_category == "missing":
                        clm_category = "in_production"
                elif status == "closed":
                    footage_status = "complete_no_footage"
                else:
                    footage_status = "pending"

                # Find matching registry entry
                matched = False
                for shoot in registry.get("shoots", []):
                    if shoot.get("clickup_task_id") == task_id:
                        matched = True
                        # Check for changes
                        if (shoot.get("clickup_status") != task["status"] or
                                shoot.get("footage_url") != footage_url or
                                shoot.get("footage_status") != footage_status):
                            old_status = shoot.get("clickup_status", "unknown")
                            shoot["clickup_status"] = task["status"]
                            shoot["footage_url"] = footage_url
                            shoot["footage_status"] = footage_status
                            shoot["clm_category"] = clm_category
                            shoot["owner"] = task["assignees"][0] if task["assignees"] else "Unassigned"
                            shoot["last_updated"] = datetime.now(timezone.utc).isoformat()
                            registry_changed = True
                            offer_changes.append(
                                f"{task['name']}: {old_status} → {task['status']}"
                                + (f" (footage: {footage_url[:50]})" if footage_url else "")
                            )
                        break

                # New task not in registry — add it
                if not matched:
                    new_shoot = {
                        "id": f"{offer_key}-{task_id}",
                        "clickup_task_id": task_id,
                        "name": task["name"],
                        "talent": None,
                        "owner": task["assignees"][0] if task["assignees"] else "Unassigned",
                        "clickup_status": task["status"],
                        "footage_status": footage_status,
                        "footage_url": footage_url,
                        "clm_section": "section_7",
                        "clm_category": clm_category,
                        "last_updated": datetime.now(timezone.utc).isoformat(),
                    }
                    registry["shoots"].append(new_shoot)
                    registry_changed = True
                    offer_changes.append(f"NEW: {task['name']} ({task['status']})")

            # Write registry if changed
            if registry_changed:
                registry["last_synced"] = datetime.now(timezone.utc).isoformat()
                with open(registry_path, "w") as f:
                    json.dump(registry, f, indent=2)
                    f.write("\n")
                self.logger.info(f"[{self.key}] {offer_key}: {len(offer_changes)} changes written to registry")

                # Trigger CLM sync + Surge deploy
                self._trigger_clm_sync(offer_key, offer_cfg)

            if offer_changes:
                changes.append((offer_key.upper(), offer_changes))

        # Build report
        if not changes:
            return "No production status changes detected."

        lines = ["### Production Status Changes\n"]
        for offer_name, offer_changes in changes:
            lines.append(f"**{offer_name}** ({len(offer_changes)} changes):\n")
            for c in offer_changes:
                lines.append(f"- {c}")
            lines.append("")

        return "\n".join(lines)

    def _trigger_clm_sync(self, offer_key: str, offer_cfg: dict):
        """Run sync_clm.py --apply for the offer, then deploy to Surge."""
        offer_dir = LAUNCH_BOARDS_DIR / offer_key
        sync_script = offer_dir / "sync_clm.py"

        if not sync_script.exists():
            self.logger.warning(f"[{self.key}] No sync_clm.py for {offer_key} at {sync_script}")
            return

        try:
            result = subprocess.run(
                ["python3", str(sync_script), "--apply"],
                capture_output=True, text=True, timeout=30,
                cwd=str(offer_dir),
            )
            if result.returncode == 0:
                self.logger.info(f"[{self.key}] sync_clm.py applied for {offer_key}")
            else:
                self.logger.error(f"[{self.key}] sync_clm.py failed for {offer_key}: {result.stderr}")
        except Exception as e:
            self.logger.error(f"[{self.key}] sync_clm.py error for {offer_key}: {e}")

        # Deploy to Surge
        surge_domains = offer_cfg.get("surge_domains", [])
        deploy_dir = offer_cfg.get("deploy_dir", "")
        if surge_domains and deploy_dir:
            deploy_path = offer_dir / deploy_dir
            # Copy HTML to deploy dir first
            html_file = offer_cfg.get("html_file", "")
            if html_file:
                html_path = offer_dir / html_file
                index_path = deploy_path / "index.html"
                if html_path.exists() and deploy_path.exists():
                    import shutil
                    shutil.copy2(str(html_path), str(index_path))
                    self.logger.info(f"[{self.key}] Copied {html_file} → {deploy_dir}/index.html")

            for domain in surge_domains:
                try:
                    result = subprocess.run(
                        ["surge", str(deploy_path), domain],
                        capture_output=True, text=True, timeout=60,
                    )
                    if result.returncode == 0:
                        self.logger.info(f"[{self.key}] Deployed {offer_key} to {domain}")
                    else:
                        self.logger.error(f"[{self.key}] Surge deploy failed for {domain}: {result.stderr}")
                except Exception as e:
                    self.logger.error(f"[{self.key}] Surge error for {domain}: {e}")
