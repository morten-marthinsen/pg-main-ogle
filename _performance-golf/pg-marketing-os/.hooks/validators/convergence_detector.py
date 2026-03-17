#!/usr/bin/env python3
"""Convergence Detector — Three-mode convergence detection for Arena outputs.

Implements Detector 3 from the Event-Driven Reminder Protocol
(~system/protocols/EVENT-DRIVEN-REMINDERS.md) and the full
Convergence Intervention Protocol (~system/protocols/CONVERGENCE-INTERVENTION-PROTOCOL.md).

Three detection modes:
  Mode 1: Persona Convergence — 5-gram overlap between persona outputs within a round
  Mode 2: Round Stagnation — score improvement between rounds
  Mode 3: Output Repetition — paragraph-level repetition within a single output

Usage:
    python3 convergence_detector.py <file_path>

Returns JSON reminder on stdout if a condition is detected, empty otherwise.
"""

import json
import os
import re
import sys
from collections import Counter
from pathlib import Path
from typing import Optional


# --- Thresholds ---

# Round-aware persona convergence thresholds (ASI-Arch convergence paradox)
PERSONA_OVERLAP_THRESHOLDS = {
    1: 0.40,  # Round 1: strict — maximum diversity expected
    2: 0.50,  # Round 2: relaxed — some convergence from Learning Brief
    3: 0.60,  # Round 3: permissive — refinement convergence is healthy
}
DEFAULT_OVERLAP_THRESHOLD = 0.40  # Fallback if round can't be determined

# Minimum cluster size to flag convergence
MIN_CONVERGENCE_CLUSTER = 3

# Round stagnation thresholds
ROUND_IMPROVEMENT_MINIMUM = 0.2  # Minimum score improvement per round

# Output repetition thresholds
REPETITION_BLOCK_SIZE = 3  # Sentences in a repetition block


def normalize_text(text: str) -> str:
    """Normalize text for comparison: lowercase, strip punctuation, remove articles."""
    text = text.lower()
    text = re.sub(r"[^\w\s]", "", text)
    # Remove common articles and filler words
    articles = {"the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
                "of", "with", "by", "is", "are", "was", "were", "be", "been", "being",
                "have", "has", "had", "do", "does", "did", "will", "would", "could",
                "should", "may", "might", "shall", "can", "this", "that", "these", "those"}
    words = text.split()
    words = [w for w in words if w not in articles]
    return " ".join(words)


def get_ngrams(text: str, n: int = 5) -> set:
    """Extract n-grams from normalized text."""
    normalized = normalize_text(text)
    words = normalized.split()
    if len(words) < n:
        return set()
    return {tuple(words[i : i + n]) for i in range(len(words) - n + 1)}


def calculate_ngram_overlap(text_a: str, text_b: str, n: int = 5) -> float:
    """Calculate Jaccard similarity of n-gram sets between two texts."""
    ngrams_a = get_ngrams(text_a, n)
    ngrams_b = get_ngrams(text_b, n)

    if not ngrams_a or not ngrams_b:
        return 0.0

    intersection = ngrams_a & ngrams_b
    union = ngrams_a | ngrams_b

    if not union:
        return 0.0

    return len(intersection) / len(union)


def extract_round_number(file_path: str) -> Optional[int]:
    """Extract the round number from an arena file path.

    Expected patterns:
      arena/round-1/persona-output.md
      arena/round-2/persona-revised.md
    """
    match = re.search(r"round-(\d+)", file_path)
    if match:
        return int(match.group(1))
    return None


def extract_persona_name(file_path: str) -> Optional[str]:
    """Extract the persona name from an arena output file path.

    Expected patterns:
      arena/round-1/makepeace-output.md
      arena/round-1/halbert-revised.md
    """
    path = Path(file_path)
    name = path.stem  # e.g., "makepeace-output" or "halbert-revised"
    # Remove the suffix (-output, -revised)
    name = re.sub(r"-(output|revised)$", "", name)
    return name if name else None


def find_round_outputs(round_dir: str) -> dict:
    """Find all persona output files in a round directory.

    Returns dict mapping persona name -> file content.
    """
    outputs = {}
    round_path = Path(round_dir)

    if not round_path.is_dir():
        return outputs

    for f in round_path.iterdir():
        if f.is_file() and f.suffix == ".md":
            if "-output" in f.stem or "-revised" in f.stem:
                persona = extract_persona_name(str(f))
                if persona:
                    try:
                        outputs[persona] = f.read_text(encoding="utf-8")
                    except (OSError, UnicodeDecodeError):
                        continue

    return outputs


def detect_persona_convergence(file_path: str) -> Optional[dict]:
    """Mode 1: Detect persona convergence within a round.

    Compares 5-gram overlap between all persona pairs. Flags if 3+ personas
    share >threshold overlap (threshold is round-aware).
    """
    round_num = extract_round_number(file_path)
    threshold = PERSONA_OVERLAP_THRESHOLDS.get(round_num, DEFAULT_OVERLAP_THRESHOLD)

    # Find the round directory from the file path
    path = Path(file_path)
    round_dir = path.parent

    # Get all persona outputs in this round
    outputs = find_round_outputs(str(round_dir))

    if len(outputs) < 3:
        return None  # Not enough outputs to check convergence yet

    # Compute pairwise overlap
    personas = list(outputs.keys())
    overlap_matrix = {}

    for i in range(len(personas)):
        for j in range(i + 1, len(personas)):
            p1, p2 = personas[i], personas[j]
            overlap = calculate_ngram_overlap(outputs[p1], outputs[p2])
            overlap_matrix[(p1, p2)] = overlap

    # Find convergence clusters: personas with >threshold overlap with 2+ others
    convergence_counts = Counter()
    converged_pairs = []

    for (p1, p2), overlap in overlap_matrix.items():
        if overlap > threshold:
            convergence_counts[p1] += 1
            convergence_counts[p2] += 1
            converged_pairs.append((p1, p2, overlap))

    # Find personas that converged with 2+ others (forming a cluster of 3+)
    converged_personas = [p for p, count in convergence_counts.items()
                          if count >= MIN_CONVERGENCE_CLUSTER - 1]

    if len(converged_personas) < MIN_CONVERGENCE_CLUSTER:
        return None

    # Calculate average overlap among converged personas
    avg_overlap = 0.0
    count = 0
    for (p1, p2), overlap in overlap_matrix.items():
        if p1 in converged_personas and p2 in converged_personas:
            avg_overlap += overlap
            count += 1
    avg_overlap = avg_overlap / count if count > 0 else 0

    round_label = f"Round {round_num}" if round_num else "this round"
    persona_names = ", ".join(sorted(converged_personas))

    return {
        "type": "reminder",
        "detector": "convergence",
        "mode": "persona_convergence",
        "severity": "warning",
        "round": round_num,
        "threshold": threshold,
        "converged_personas": sorted(converged_personas),
        "average_overlap": round(avg_overlap, 3),
        "message": (
            f"CONVERGENCE WARNING: Personas {persona_names} share "
            f"{avg_overlap:.0%} average 5-gram overlap in {round_label}. "
            f"Threshold for {round_label}: {threshold:.0%}. "
            f"This indicates persona contamination — the model is generating "
            f"variations, not independent voices."
        ),
        "action_required": (
            "Apply Divergence Protocol: (1) Re-read each persona's specimen files, "
            "(2) Add DIVERGENCE DIRECTIVE to each converged persona's prompt, "
            "(3) Regenerate ONLY the converged personas. "
            "See ~system/protocols/CONVERGENCE-INTERVENTION-PROTOCOL.md"
        ),
    }


def detect_round_stagnation(file_path: str) -> Optional[dict]:
    """Mode 2: Detect score stagnation between rounds.

    Compares winner scores across rounds by reading scores.yaml files.
    Flags if improvement < 0.2 AND same winner across rounds.
    """
    round_num = extract_round_number(file_path)
    if not round_num or round_num < 2:
        return None  # Need at least Round 2 to compare

    # Only trigger on scores.yaml files
    if "scores" not in Path(file_path).stem:
        return None

    path = Path(file_path)
    arena_dir = path.parent.parent  # arena/ directory

    # Read current round scores
    try:
        current_scores = json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        # Try YAML
        try:
            import yaml
            current_scores = yaml.safe_load(path.read_text(encoding="utf-8"))
        except Exception:
            return None

    # Read previous round scores
    prev_round_dir = arena_dir / f"round-{round_num - 1}"
    prev_scores_path = prev_round_dir / "scores.yaml"

    if not prev_scores_path.exists():
        prev_scores_path = prev_round_dir / "scores.json"

    if not prev_scores_path.exists():
        return None

    try:
        prev_text = prev_scores_path.read_text(encoding="utf-8")
        try:
            prev_scores = json.loads(prev_text)
        except json.JSONDecodeError:
            try:
                import yaml
                prev_scores = yaml.safe_load(prev_text)
            except Exception:
                return None
    except OSError:
        return None

    # Extract winner info — handle multiple possible schema formats
    def get_winner_info(scores_data):
        """Extract winner persona and score from scores data."""
        if isinstance(scores_data, dict):
            winner = scores_data.get("winner", scores_data.get("winning_persona", ""))
            score = scores_data.get("winner_score", scores_data.get("winning_score", 0))
            if not winner and "rankings" in scores_data:
                rankings = scores_data["rankings"]
                if isinstance(rankings, list) and rankings:
                    first = rankings[0]
                    winner = first.get("persona", first.get("name", ""))
                    score = first.get("score", first.get("overall_score", 0))
            return str(winner), float(score) if score else 0.0
        return "", 0.0

    current_winner, current_score = get_winner_info(current_scores)
    prev_winner, prev_score = get_winner_info(prev_scores)

    if not current_winner or not prev_winner:
        return None

    score_delta = current_score - prev_score
    same_winner = current_winner.lower().strip() == prev_winner.lower().strip()

    if score_delta >= ROUND_IMPROVEMENT_MINIMUM or not same_winner:
        return None  # Sufficient improvement or different winner — no stagnation

    return {
        "type": "reminder",
        "detector": "convergence",
        "mode": "round_stagnation",
        "severity": "info",
        "round": round_num,
        "current_winner": current_winner,
        "current_score": current_score,
        "prev_winner": prev_winner,
        "prev_score": prev_score,
        "score_delta": round(score_delta, 2),
        "message": (
            f"ROUND STAGNATION: Round {round_num} did not meaningfully improve "
            f"on Round {round_num - 1}. Winner: {current_winner} "
            f"(R{round_num - 1}: {prev_score:.1f} → R{round_num}: {current_score:.1f}, "
            f"delta: {score_delta:+.2f}). Same winner: {'Yes' if same_winner else 'No'}."
        ),
        "action_required": (
            "Present stagnation report to human. Options: "
            "(A) Continue to next round anyway, "
            "(B) Accept current results as final (human override), "
            "(C) Inject constraint to force divergence. "
            "See ~system/protocols/CONVERGENCE-INTERVENTION-PROTOCOL.md"
        ),
    }


def detect_output_repetition(content: str) -> Optional[dict]:
    """Mode 3: Detect repeated sentence blocks within a single output.

    Uses sliding window of 3 consecutive sentences. Flags if any block
    appears twice (after normalization).
    """
    # Split into sentences (simple heuristic: period/exclamation/question + space + capital)
    sentences = re.split(r"(?<=[.!?])\s+(?=[A-Z])", content)

    # Filter out very short sentences (headers, list items)
    sentences = [s for s in sentences if len(s.split()) >= 5]

    if len(sentences) < REPETITION_BLOCK_SIZE * 2:
        return None  # Not enough sentences to have a repeat

    # Create normalized blocks
    blocks = {}
    for i in range(len(sentences) - REPETITION_BLOCK_SIZE + 1):
        block = " ".join(sentences[i : i + REPETITION_BLOCK_SIZE])
        normalized = normalize_text(block)

        # Use a hash for comparison
        block_hash = hash(normalized)

        if block_hash in blocks:
            # Found a repeat
            first_occurrence = blocks[block_hash]
            repeated_text = " ".join(sentences[i : i + REPETITION_BLOCK_SIZE])

            # Truncate for display
            display = repeated_text[:200] + "..." if len(repeated_text) > 200 else repeated_text

            return {
                "type": "reminder",
                "detector": "convergence",
                "mode": "output_repetition",
                "severity": "error",
                "first_occurrence_sentence": first_occurrence,
                "second_occurrence_sentence": i,
                "message": (
                    f"OUTPUT REPETITION: A {REPETITION_BLOCK_SIZE}-sentence block "
                    f"appears twice in this output (sentences {first_occurrence + 1}-"
                    f"{first_occurrence + REPETITION_BLOCK_SIZE} and "
                    f"{i + 1}-{i + REPETITION_BLOCK_SIZE}). "
                    f"Repeated content: \"{display}\""
                ),
                "action_required": (
                    "HALT generation. This is a degradation signal. "
                    "(1) Trigger MC-CHECK, "
                    "(2) Re-read the skill spec for output structure, "
                    "(3) Regenerate from the repetition point. "
                    "If repetition persists, check context zone and apply compaction."
                ),
            }

        blocks[block_hash] = i

    return None


def main():
    if len(sys.argv) < 2:
        print("{}")
        sys.exit(0)

    file_path = sys.argv[1]

    if not os.path.exists(file_path):
        print("{}")
        sys.exit(0)

    # Read the file content
    try:
        content = Path(file_path).read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        print("{}")
        sys.exit(0)

    # Mode 3: Output repetition — check on any arena output file
    if "arena/" in file_path and ("-output" in file_path or "-revised" in file_path):
        result = detect_output_repetition(content)
        if result:
            print(json.dumps(result))
            sys.exit(0)

    # Mode 1: Persona convergence — check when we have enough outputs in a round
    if "arena/" in file_path and ("-output" in file_path or "-revised" in file_path):
        result = detect_persona_convergence(file_path)
        if result:
            print(json.dumps(result))
            sys.exit(0)

    # Mode 2: Round stagnation — check on scores files
    if "arena/" in file_path and "scores" in Path(file_path).stem:
        result = detect_round_stagnation(file_path)
        if result:
            print(json.dumps(result))
            sys.exit(0)

    print("{}")


if __name__ == "__main__":
    main()
