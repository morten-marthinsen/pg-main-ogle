#!/usr/bin/env python3
"""Proportionality Check — Detects threshold clustering in score fields.

When package files with scores are written, checks for gate-passing optimization:
scores that cluster suspiciously close to documented minimums instead of reflecting
genuine analytical assessment.

Detection signal: >50% of scores within 0.5 of documented minimums.

Usage:
    python3 proportionality_check.py <package_file_path>

Returns JSON feedback on stdout if threshold clustering detected, empty otherwise.
"""

import json
import re
import sys
from pathlib import Path
from typing import Dict, Optional

# Known minimum thresholds per scoring dimension
# These come from CLAUDE-SKILL-INDEX.md and per-skill ANTI-DEGRADATION files
KNOWN_MINIMUMS = {
    # Root cause scoring
    "truth": 6.0,
    "truth_score": 6.0,
    "mechanism_clarity": 7.0,
    "audience_resonance": 6.0,
    "emotional_charge": 6.0,
    "villain_clarity": 6.0,

    # Mechanism scoring
    "visual_metaphor": 6.0,
    "simplicity": 6.0,
    "provability": 6.0,
    "novelty": 6.0,
    "naming_memorability": 6.0,

    # Big Idea / Promise scoring
    "resonance": 6.0,
    "surprise": 6.0,
    "fascination": 6.0,
    "rsf_total": 18.0,

    # Narrative scoring
    "top_candidate_score": 7.5,
    "overall_score": 7.0,
    "quality_score": 7.0,

    # General
    "score": 6.0,
}

# Proximity threshold: scores within this range of minimum are suspicious
PROXIMITY_THRESHOLD = 0.5

# Clustering threshold: if this fraction of scores are at minimums, flag it
CLUSTERING_THRESHOLD = 0.5


def extract_scores_json(content: str) -> Dict[str, float]:
    """Extract score values from JSON content."""
    scores = {}
    try:
        data = json.loads(content)
        _extract_scores_recursive(data, scores)
    except json.JSONDecodeError:
        pass
    return scores


def _extract_scores_recursive(obj, scores: dict, prefix: str = ""):
    """Recursively extract numeric fields that look like scores."""
    if isinstance(obj, dict):
        for key, value in obj.items():
            full_key = f"{prefix}.{key}" if prefix else key
            if isinstance(value, (int, float)) and any(
                score_key in key.lower()
                for score_key in ("score", "truth", "clarity", "resonance",
                                  "charge", "metaphor", "simplicity",
                                  "provability", "novelty", "memorability",
                                  "surprise", "fascination")
            ):
                scores[full_key] = float(value)
            elif isinstance(value, (dict, list)):
                _extract_scores_recursive(value, scores, full_key)
    elif isinstance(obj, list):
        for i, item in enumerate(obj):
            _extract_scores_recursive(item, scores, f"{prefix}[{i}]")


def extract_scores_yaml(content: str) -> Dict[str, float]:
    """Extract score values from YAML content using regex."""
    scores = {}
    score_pattern = re.compile(
        r'(\w*(?:score|truth|clarity|resonance|charge|metaphor|simplicity|'
        r'provability|novelty|memorability|surprise|fascination)\w*)'
        r'\s*:\s*([0-9]+\.?[0-9]*)',
        re.IGNORECASE
    )
    for match in score_pattern.finditer(content):
        key = match.group(1).lower()
        value = float(match.group(2))
        scores[key] = value
    return scores


def check_proportionality(file_path: str) -> Optional[dict]:
    """Check a package file for threshold clustering."""
    path = Path(file_path)

    if not path.exists():
        return None

    if path.suffix not in (".json", ".yaml", ".yml"):
        return None

    content = path.read_text(encoding="utf-8")

    # Extract scores
    if path.suffix == ".json":
        scores = extract_scores_json(content)
    else:
        scores = extract_scores_yaml(content)

    if len(scores) < 3:
        return None  # Not enough scores to analyze

    # Check for clustering near minimums
    at_minimum_count = 0
    checked_count = 0
    clustering_details = []

    for key, value in scores.items():
        # Find the matching minimum
        base_key = key.split(".")[-1].lower()
        minimum = None
        for min_key, min_val in KNOWN_MINIMUMS.items():
            if min_key in base_key or base_key in min_key:
                minimum = min_val
                break

        if minimum is None:
            continue

        checked_count += 1
        distance = value - minimum

        if 0 <= distance <= PROXIMITY_THRESHOLD:
            at_minimum_count += 1
            clustering_details.append(
                f"{key}={value} (minimum={minimum}, distance={distance:.1f})"
            )

    if checked_count == 0:
        return None

    clustering_ratio = at_minimum_count / checked_count

    if clustering_ratio <= CLUSTERING_THRESHOLD:
        return None

    return {
        "validator": "proportionality_check",
        "file": str(path),
        "severity": "WARNING",
        "clustering_ratio": round(clustering_ratio, 2),
        "at_minimum_count": at_minimum_count,
        "total_checked": checked_count,
        "details": clustering_details,
        "message": (
            f"PROPORTIONALITY WARNING: {path.name} — {at_minimum_count}/{checked_count} "
            f"scores ({clustering_ratio:.0%}) cluster within {PROXIMITY_THRESHOLD} of "
            f"documented minimums. This pattern suggests gate-passing optimization rather "
            f"than genuine analytical assessment. Scores should be DERIVED from evidence, "
            f"not TARGETED to minimums. Overshoot is normal and expected. "
            f"Clustered scores: {', '.join(clustering_details[:5])}"
        ),
    }


def main():
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    file_path = sys.argv[1]
    result = check_proportionality(file_path)

    if result:
        print(json.dumps(result))
    else:
        print("{}")


if __name__ == "__main__":
    main()
