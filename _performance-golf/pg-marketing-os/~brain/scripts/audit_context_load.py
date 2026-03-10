#!/usr/bin/env python3
"""Context Load Audit — Analyzes token load per skill across the marketing-os pipeline.

For each skill (00-20 + engine skills): identifies all files loaded at Layer 0,
calculates KB sizes, estimates tokens. Outputs a matrix of Skill x System File
showing Required/Optional/Not Loaded with KB sizes.

Usage:
    python3 audit_context_load.py [--output <path>]

Output:
    Markdown table to stdout (or to --output file if specified)

This is a ONE-TIME analysis tool, not an ongoing validation hook.
"""

import argparse
import os
import sys
from pathlib import Path

# Token estimation: ~4 characters per token
CHARS_PER_TOKEN = 4

# Base path for marketing-os
BASE_PATH = Path(__file__).parent.parent

# Universal system files loaded for EVERY skill
UNIVERSAL_FILES = [
    "CLAUDE-CORE.md",
]

# Per-skill index files (replace monolithic CLAUDE-SKILL-INDEX.md)
# Each skill loads only its own file from skills/skill-index/
SKILL_INDEX_MAP = {
    "00-brief": None,  # No skill index entry for brief
    "01-research": "skills/skill-index/01-research.md",
    "02-proof-inventory": "skills/skill-index/02-proof-inventory.md",
    "03-root-cause": "skills/skill-index/03-root-cause.md",
    "04-mechanism": "skills/skill-index/04-mechanism.md",
    "05-promise": "skills/skill-index/05-promise.md",
    "06-big-idea": "skills/skill-index/06-big-idea.md",
    "07-offer": "skills/skill-index/07-offer.md",
    "08-structure": "skills/skill-index/08-structure.md",
    "09-campaign-brief": "skills/skill-index/09-campaign-brief.md",
    "10-headlines": "skills/skill-index/10-headlines.md",
    "11-lead": "skills/skill-index/11-lead.md",
    "12-story": "skills/skill-index/12-story.md",
    "13-root-cause-narrative": "skills/skill-index/13-root-cause-narrative.md",
    "14-mechanism-narrative": "skills/skill-index/14-mechanism-narrative.md",
    "15-product-introduction": "skills/skill-index/15-product-introduction.md",
    "16-offer-copy": "skills/skill-index/16-offer-copy.md",
    "17-close": "skills/skill-index/17-close.md",
    "18-proof-weaving": "skills/skill-index/18-proof-weaving.md",
    "19-campaign-assembly": "skills/skill-index/19-campaign-assembly.md",
    "20-editorial": "skills/skill-index/20-editorial.md",
}

# Conditional system files
CONDITIONAL_FILES = {
    "CLAUDE-ARENA.md": "Arena skills (03-20)",
    "CLAUDE-SPECIMENS.md": "Generation skills (10-20)",
    "pipeline-handoff-registry.md": "Skills consuming upstream packages",
}

# Skill definitions with their directories and loaded files
SKILLS = {}

# Foundation skills (00-09)
foundation_skills = {
    "00-brief": "skills/foundation/00-brief",
    "01-research": "skills/foundation/01-research",
    "02-proof-inventory": "skills/foundation/02-proof-inventory",
    "03-root-cause": "skills/foundation/03-root-cause",
    "04-mechanism": "skills/foundation/04-mechanism",
    "05-promise": "skills/foundation/05-promise",
    "06-big-idea": "skills/foundation/06-big-idea",
    "07-offer": "skills/foundation/07-offer",
    "08-structure": "skills/foundation/08-structure",
    "09-campaign-brief": "skills/foundation/09-campaign-brief",
}

# Long-form skills (10-20)
longform_skills = {
    "10-headlines": "skills/long-form/10-headlines",
    "11-lead": "skills/long-form/11-lead",
    "12-story": "skills/long-form/12-story",
    "13-root-cause-narrative": "skills/long-form/13-root-cause-narrative",
    "14-mechanism-narrative": "skills/long-form/14-mechanism-narrative",
    "15-product-introduction": "skills/long-form/15-product-introduction",
    "16-offer-copy": "skills/long-form/16-offer-copy",
    "17-close": "skills/long-form/17-close",
    "18-proof-weaving": "skills/long-form/18-proof-weaving",
    "19-campaign-assembly": "skills/long-form/19-campaign-assembly",
    "20-editorial": "skills/long-form/20-editorial",
}

SKILLS.update(foundation_skills)
SKILLS.update(longform_skills)


def get_file_size_kb(file_path: Path) -> float:
    """Get file size in KB."""
    try:
        return file_path.stat().st_size / 1024
    except OSError:
        return 0.0


def estimate_tokens(size_kb: float) -> int:
    """Estimate tokens from KB size."""
    chars = size_kb * 1024
    return int(chars / CHARS_PER_TOKEN)


def get_skill_files(skill_dir: Path) -> list[tuple[str, float]]:
    """Get all markdown files in a skill directory with their sizes."""
    files = []
    if not skill_dir.exists():
        return files

    for f in sorted(skill_dir.rglob("*.md")):
        rel_path = f.relative_to(BASE_PATH)
        size_kb = get_file_size_kb(f)
        files.append((str(rel_path), size_kb))

    return files


def audit_skill(skill_id: str, skill_rel_dir: str) -> dict:
    """Audit context load for a single skill."""
    skill_dir = BASE_PATH / skill_rel_dir
    result = {
        "skill_id": skill_id,
        "skill_dir": skill_rel_dir,
        "universal_files": [],
        "conditional_files": [],
        "skill_files": [],
        "total_kb": 0.0,
        "total_tokens": 0,
    }

    # Universal files
    for uf in UNIVERSAL_FILES:
        uf_path = BASE_PATH / uf
        size_kb = get_file_size_kb(uf_path)
        result["universal_files"].append((uf, size_kb, "REQUIRED"))
        result["total_kb"] += size_kb

    # Per-skill index file (replaces monolithic CLAUDE-SKILL-INDEX.md)
    index_file = SKILL_INDEX_MAP.get(skill_id)
    if index_file:
        idx_path = BASE_PATH / index_file
        size_kb = get_file_size_kb(idx_path)
        result["universal_files"].append((index_file, size_kb, "REQUIRED"))
        result["total_kb"] += size_kb

    # Conditional files
    skill_num = skill_id.split("-")[0]
    for cf, condition in CONDITIONAL_FILES.items():
        cf_path = BASE_PATH / cf
        size_kb = get_file_size_kb(cf_path)

        # Determine if this skill loads this file
        loaded = False
        if cf == "CLAUDE-ARENA.md" and skill_num.isdigit() and int(skill_num) >= 3:
            loaded = True
        elif cf == "CLAUDE-SPECIMENS.md" and skill_num.isdigit() and int(skill_num) >= 10:
            loaded = True
        elif cf == "pipeline-handoff-registry.md" and skill_num.isdigit() and int(skill_num) >= 2:
            loaded = True

        status = "REQUIRED" if loaded else "NOT LOADED"
        result["conditional_files"].append((cf, size_kb, status))
        if loaded:
            result["total_kb"] += size_kb

    # Skill-specific files
    skill_files = get_skill_files(skill_dir)
    for sf, size_kb in skill_files:
        result["skill_files"].append((sf, size_kb, "REQUIRED"))
        result["total_kb"] += size_kb

    # Protocols (loaded conditionally)
    protocols_dir = BASE_PATH / "skills" / "protocols"
    if protocols_dir.exists():
        # EXECUTION-GUARDRAILS is always loaded
        eg_path = protocols_dir / "EXECUTION-GUARDRAILS.md"
        if eg_path.exists():
            size_kb = get_file_size_kb(eg_path)
            result["skill_files"].append(
                (str(eg_path.relative_to(BASE_PATH)), size_kb, "REQUIRED")
            )
            result["total_kb"] += size_kb

    result["total_tokens"] = estimate_tokens(result["total_kb"])
    return result


def generate_report(results: list[dict]) -> str:
    """Generate the audit report as markdown."""
    lines = []
    lines.append("# Context Budget Audit — Marketing-OS")
    lines.append("")
    lines.append(f"**Generated:** {__import__('datetime').datetime.now().isoformat()}")
    lines.append("**Scope:** All 21 main pipeline skills (00-20)")
    lines.append("**Method:** File size → token estimation (4 chars/token)")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Summary table (sorted by total load)
    lines.append("## Summary Table (Sorted by Total Load)")
    lines.append("")
    lines.append("| Skill | Total KB | Est. Tokens | Universal KB | Skill KB | Zone |")
    lines.append("|-------|---------|-------------|-------------|---------|------|")

    sorted_results = sorted(results, key=lambda r: r["total_kb"], reverse=True)
    for r in sorted_results:
        universal_kb = sum(s for _, s, st in r["universal_files"])
        conditional_kb = sum(s for _, s, st in r["conditional_files"] if st == "REQUIRED")
        skill_kb = sum(s for _, s, _ in r["skill_files"])
        total_tokens = r["total_tokens"]

        if total_tokens < 150_000:
            zone = "GREEN"
        elif total_tokens < 200_000:
            zone = "YELLOW"
        elif total_tokens < 500_000:
            zone = "ORANGE"
        else:
            zone = "RED"

        lines.append(
            f"| {r['skill_id']} | {r['total_kb']:.1f} | {total_tokens:,} | "
            f"{universal_kb + conditional_kb:.1f} | {skill_kb:.1f} | {zone} |"
        )

    lines.append("")
    lines.append("---")
    lines.append("")

    # Universal files analysis
    lines.append("## Universal Files Analysis")
    lines.append("")
    lines.append("These files are loaded for EVERY skill execution:")
    lines.append("")
    lines.append("| File | Size (KB) | Est. Tokens | Impact |")
    lines.append("|------|----------|-------------|--------|")

    for uf in UNIVERSAL_FILES:
        uf_path = BASE_PATH / uf
        size_kb = get_file_size_kb(uf_path)
        tokens = estimate_tokens(size_kb)
        lines.append(f"| {uf} | {size_kb:.1f} | {tokens:,} | Per-skill overhead |")

    lines.append("")

    # Conditional files
    lines.append("## Conditional Files")
    lines.append("")
    lines.append("| File | Size (KB) | Est. Tokens | Loaded By |")
    lines.append("|------|----------|-------------|-----------|")

    for cf, condition in CONDITIONAL_FILES.items():
        cf_path = BASE_PATH / cf
        size_kb = get_file_size_kb(cf_path)
        tokens = estimate_tokens(size_kb)
        lines.append(f"| {cf} | {size_kb:.1f} | {tokens:,} | {condition} |")

    lines.append("")
    lines.append("---")
    lines.append("")

    # Session-level totals
    lines.append("## Session-Level Totals")
    lines.append("")
    lines.append("| Session | Skills | Combined Est. Tokens | Zone |")
    lines.append("|---------|--------|---------------------|------|")

    sessions = [
        ("Session 1", ["01-research"]),
        ("Session 2", ["02-proof-inventory", "03-root-cause", "04-mechanism", "05-promise"]),
        ("Session 3", ["06-big-idea", "07-offer", "08-structure", "09-campaign-brief"]),
        ("Session 4", ["10-headlines", "11-lead", "12-story", "13-root-cause-narrative"]),
        ("Session 5", ["14-mechanism-narrative", "15-product-introduction", "16-offer-copy", "17-close"]),
        ("Session 6", ["18-proof-weaving", "19-campaign-assembly", "20-editorial"]),
    ]

    result_map = {r["skill_id"]: r for r in results}
    for session_name, skill_ids in sessions:
        session_tokens = 0
        for sid in skill_ids:
            if sid in result_map:
                session_tokens += result_map[sid]["total_tokens"]

        if session_tokens < 150_000:
            zone = "GREEN"
        elif session_tokens < 200_000:
            zone = "YELLOW"
        elif session_tokens < 500_000:
            zone = "ORANGE"
        else:
            zone = "RED"

        lines.append(
            f"| {session_name} | {', '.join(skill_ids)} | {session_tokens:,} | {zone} |"
        )

    lines.append("")
    lines.append("---")
    lines.append("")

    # Optimization opportunities
    lines.append("## Optimization Opportunities")
    lines.append("")
    lines.append("### 1. CLAUDE-CORE.md Overhead")
    core_path = BASE_PATH / "CLAUDE-CORE.md"
    core_kb = get_file_size_kb(core_path)
    core_tokens = estimate_tokens(core_kb)
    lines.append(
        f"CLAUDE-CORE.md is {core_kb:.1f}KB (~{core_tokens:,} tokens) and loaded for "
        f"EVERY skill. This is {core_tokens * 21:,} tokens of cumulative overhead across "
        f"21 skills. Consider conditional loading: skills 10-20 may not need the full "
        f"foundation sections."
    )
    lines.append("")
    lines.append("### 2. CLAUDE-SKILL-INDEX.md Loading — RESOLVED")
    lines.append(
        "CLAUDE-SKILL-INDEX.md has been split into per-skill files in "
        "skills/skill-index/. Each skill now loads only its own section "
        "(~0.3-6KB instead of the full 27KB)."
    )
    lines.append("")
    lines.append("### 3. Protocol Files")
    lines.append(
        "Multiple protocol files are loaded for every skill via EXECUTION-GUARDRAILS.md "
        "references. Consider which protocols are truly needed per skill vs. universally required."
    )
    lines.append("")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Audit context load per skill")
    parser.add_argument("--output", help="Output file path (default: stdout)")
    args = parser.parse_args()

    # Audit each skill
    results = []
    for skill_id, skill_dir in SKILLS.items():
        result = audit_skill(skill_id, skill_dir)
        results.append(result)

    # Generate report
    report = generate_report(results)

    if args.output:
        Path(args.output).write_text(report, encoding="utf-8")
        print(f"Audit written to: {args.output}")
    else:
        print(report)


if __name__ == "__main__":
    main()
