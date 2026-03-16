#!/usr/bin/env python3
"""PG Data Service — CLI orchestrator.

Usage:
    python service.py enrich --from 2026-01-01 --to 2026-03-15 --output neco
    python service.py enrich --from 2026-01-01 --to 2026-03-15 --output tess
    python service.py enrich --from 2026-01-01 --to 2026-03-15 --output all
    python service.py raw --from 2026-01-01 --to 2026-03-15 --limit 10000
"""

import argparse
import time
import yaml
from datetime import datetime, timedelta
from pathlib import Path

from models.ad_performance import build_ad_performance
from models.angle_analysis import build_angle_analysis
from formatters.neco_brief import format_neco_brief
from formatters.tess_enrichment import format_tess_enrichment
from formatters.raw_export import format_raw_export


ROOT = Path(__file__).parent


def load_config() -> dict:
    with open(ROOT / "config.yaml") as f:
        return yaml.safe_load(f)


def get_adapter(config: dict):
    """Instantiate the configured adapter. Import is deferred so switching
    adapters only requires changing config.yaml — no code edits."""
    adapter_type = config.get("adapter", "domo")
    dataset_id = config["dataset_id"]

    if adapter_type == "domo":
        from adapters.domo import DomoAdapter
        return DomoAdapter(dataset_id)
    elif adapter_type == "snowflake":
        raise NotImplementedError("Snowflake adapter not yet implemented. Change config.yaml to adapter: domo")
    else:
        raise ValueError(f"Unknown adapter: {adapter_type}")


def cmd_enrich(args, config):
    """Run enriched pipeline: adapter -> model -> formatter."""
    start = time.time()
    output_dir = ROOT / config.get("output_dir", "outputs")

    adapter = get_adapter(config)

    print(f"Fetching ad performance data ({args.date_from} to {args.date_to})...")
    ad_perf_df = build_ad_performance(adapter, args.date_from, args.date_to)

    if ad_perf_df.empty:
        print("No data returned. Check date range and adapter config.")
        return

    print(f"  {len(ad_perf_df)} ads found")

    # Classification summary
    if "classification" in ad_perf_df.columns:
        counts = ad_perf_df["classification"].value_counts()
        for cls, count in counts.items():
            print(f"  {cls}: {count}")

    # Angle analysis (threshold from config)
    sat_threshold = config.get("thresholds", {}).get("saturation_variation_count", 3)
    angle_df = build_angle_analysis(ad_perf_df, saturation_threshold=sat_threshold)
    if not angle_df.empty:
        print(f"  {len(angle_df)} root angles, {angle_df['is_saturated'].sum()} saturated")

    # Route to formatter(s)
    outputs = args.output if args.output != "all" else ["neco", "tess"]
    if isinstance(outputs, str):
        outputs = [outputs]

    for output in outputs:
        if output == "neco":
            written = format_neco_brief(ad_perf_df, angle_df, output_dir, args.date_from, args.date_to)
            for funnel, path in written.items():
                print(f"  Neco brief: {path}")
        elif output == "tess":
            path = format_tess_enrichment(ad_perf_df, output_dir, args.date_from, args.date_to)
            print(f"  Tess enrichment: {path}")
        else:
            print(f"  Unknown output: {output}")

    elapsed = time.time() - start
    print(f"\nDone in {elapsed:.1f}s")


def cmd_raw(args, config):
    """Run raw export: adapter -> CSV dump."""
    start = time.time()
    output_dir = ROOT / config.get("output_dir", "outputs")

    adapter = get_adapter(config)

    print(f"Fetching raw data (limit {args.limit})...")
    raw_df = adapter.fetch_raw(args.date_from, args.date_to, limit=args.limit)

    if raw_df.empty:
        print("No data returned.")
        return

    print(f"  {len(raw_df)} rows, {len(raw_df.columns)} columns")

    path = format_raw_export(raw_df, output_dir, args.date_from, args.date_to)
    print(f"  Raw export: {path}")

    elapsed = time.time() - start
    print(f"\nDone in {elapsed:.1f}s")


def main():
    config = load_config()

    # Default date range from config
    lookback = config.get("default_lookback_days", 90)
    default_to = datetime.now().strftime("%Y-%m-%d")
    default_from = (datetime.now() - timedelta(days=lookback)).strftime("%Y-%m-%d")

    parser = argparse.ArgumentParser(description="PG Data Service")
    subparsers = parser.add_subparsers(dest="command", help="Command to run")

    # enrich command
    enrich_parser = subparsers.add_parser("enrich", help="Run enriched pipeline")
    enrich_parser.add_argument("--from", dest="date_from", default=default_from, help="Start date (YYYY-MM-DD)")
    enrich_parser.add_argument("--to", dest="date_to", default=default_to, help="End date (YYYY-MM-DD)")
    enrich_parser.add_argument("--output", default="all", help="Output format: neco, tess, all")

    # raw command
    raw_parser = subparsers.add_parser("raw", help="Raw data export")
    raw_parser.add_argument("--from", dest="date_from", default=default_from, help="Start date (YYYY-MM-DD)")
    raw_parser.add_argument("--to", dest="date_to", default=default_to, help="End date (YYYY-MM-DD)")
    raw_parser.add_argument("--limit", type=int, default=10000, help="Max rows to fetch")

    args = parser.parse_args()

    if args.command == "enrich":
        cmd_enrich(args, config)
    elif args.command == "raw":
        cmd_raw(args, config)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
