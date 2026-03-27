#!/usr/bin/env python3
"""
Build Gate 1 structural artifacts from 8 scrape files.
- scored_quotes.json (consolidated + numbered)
- pain_hope_pairs.json (25+ pairs matched by topic)
- why_how_pairs.json (25+ pairs matched by topic)
- mechanism_map.json (15+ competitor mechanisms mapped)
"""

import json
import os
import re
from collections import defaultdict

BASE = os.path.dirname(os.path.abspath(__file__))
L1 = os.path.join(BASE, "layer-1-outputs")

FILES = [
    "scrape-reddit.json",
    "scrape-reddit-auto.json",
    "scrape-youtube.json",
    "scrape-youtube-auto.json",
    "scrape-forums.json",
    "scrape-expansion-r1.json",
    "scrape-expansion-r2.json",
    "scrape-expansion-r3.json",
]

BUCKET_PREFIX = {
    "PAIN": "P",
    "HOPE": "H",
    "ROOT_CAUSE": "RC",
    "SOLUTIONS_TRIED": "ST",
    "COMPETITOR_MECHANISM": "CM",
    "VILLAIN": "V",
}

# Topic keywords for semantic matching
TOPICS = {
    "distance": ["distance", "yards", "yardage", "far", "long", "carry", "driver", "tee shot", "off the tee"],
    "price": ["price", "cost", "expensive", "cheap", "budget", "afford", "money", "dollar", "$", "worth", "value", "overpriced", "gouging"],
    "feel": ["feel", "soft", "hard", "click", "compression", "mushy", "clicky", "firm"],
    "spin": ["spin", "backspin", "sidespin", "spin rate", "low spin", "high spin", "slice", "hook", "draw", "fade"],
    "durability": ["durability", "durable", "scuff", "cut", "last", "worn", "shag", "beat up"],
    "consistency": ["consistent", "consistency", "reliable", "predictable", "repeatable", "every time", "same result"],
    "greenside": ["green", "chip", "putt", "wedge", "short game", "approach", "stopping", "check", "bite", "roll out"],
    "fitting": ["fitting", "fit", "match", "swing speed", "mph", "launch monitor", "trackman", "data"],
    "brand": ["titleist", "pro v1", "callaway", "bridgestone", "srixon", "taylormade", "vice", "kirkland", "snell", "tp5"],
    "alignment": ["alignment", "align", "line", "aim", "visual", "arrow", "triple track", "sidestamp"],
    "construction": ["urethane", "surlyn", "ionomer", "layer", "piece", "core", "mantle", "cover"],
    "testing": ["test", "robot", "laboratory", "lab", "compare", "comparison", "review", "head to head"],
    "score": ["score", "handicap", "improvement", "improve", "better", "lower", "stroke", "break"],
    "lost_balls": ["lose", "lost", "water", "woods", "pond", "ob", "out of bounds", "finding"],
}

# Brand/mechanism categories for mechanism map
MECHANISM_CATS = {
    "Titleist Pro V1 Performance System": ["titleist", "pro v1", "prov1", "pro-v1", "pro v"],
    "Callaway Chrome Tour Technology": ["callaway", "chrome soft", "chrome tour", "triple track"],
    "Bridgestone Fitting Approach": ["bridgestone", "e6", "e12", "tour b", "ball fitting"],
    "Srixon Z-Star Engineering": ["srixon", "z-star", "z star", "q-star", "q star"],
    "TaylorMade TP5 Layering": ["taylormade", "taylor made", "tp5", "tour response", "penta"],
    "Vice Direct-to-Consumer": ["vice", "vice pro", "direct to consumer", "dtc"],
    "Kirkland Value Play": ["kirkland", "costco", "warehouse"],
    "Snell Design Philosophy": ["snell", "dean snell"],
    "OnCore Innovation": ["oncore", "on core"],
    "Mizuno RB Technology": ["mizuno", "rb tour"],
    "Wilson Budget/Value Line": ["wilson", "duo soft", "wilson staff", "fifty elite", "wilson chaos", "wilson zip", "wilson boost"],
    "Urethane Cover Premium": ["urethane", "cast urethane", "thermoplastic urethane"],
    "Surlyn/Ionomer Durability": ["surlyn", "ionomer", "cut-proof", "durable cover"],
    "Dimple Aerodynamics": ["dimple", "aerodynamic", "drag", "dimple pattern", "flight"],
    "Multi-Layer Construction": ["3-piece", "4-piece", "5-piece", "three piece", "four piece", "five piece", "multi-layer", "layer"],
    "Compression Matching": ["compression", "low compression", "high compression", "compress"],
    "Robot/Lab Testing Claims": ["robot test", "laboratory", "lab test", "independent test", "robot", "testing data"],
    "Launch Monitor Validation": ["launch monitor", "trackman", "gc quad", "flightscope", "gcquad"],
    "Tour Player Endorsement": ["tour", "pga tour", "tour player", "played on tour", "tour ball"],
}


def get_topics(text):
    text_lower = text.lower()
    found = []
    for topic, keywords in TOPICS.items():
        if any(kw in text_lower for kw in keywords):
            found.append(topic)
    return found


def load_all_quotes():
    all_quotes = []
    for fname in FILES:
        path = os.path.join(L1, fname)
        if not os.path.exists(path):
            print(f"  WARNING: {fname} not found, skipping")
            continue
        with open(path) as fh:
            data = json.load(fh)
        quotes = data if isinstance(data, list) else data.get("quotes", data.get("extracted_quotes", []))
        for q in quotes:
            q["source_file"] = fname
        all_quotes.extend(quotes)
        print(f"  Loaded {len(quotes)} quotes from {fname}")
    return all_quotes


def assign_ids(quotes):
    counters = defaultdict(int)
    for q in quotes:
        bucket = q.get("bucket", "UNKNOWN")
        prefix = BUCKET_PREFIX.get(bucket, "X")
        counters[bucket] += 1
        q["id"] = f"{prefix}-{counters[bucket]:03d}"
    return quotes, dict(counters)


def build_pain_hope_pairs(quotes, target=30):
    pain = [q for q in quotes if q["bucket"] == "PAIN"]
    hope = [q for q in quotes if q["bucket"] == "HOPE"]

    # Pre-compute topics
    pain_topics = [(q, get_topics(q["text"])) for q in pain]
    hope_topics = [(q, get_topics(q["text"])) for q in hope]

    pairs = []
    used_hope_ids = set()

    for pq, pt in pain_topics:
        if len(pairs) >= target:
            break
        if not pt:
            continue
        best_match = None
        best_overlap = 0
        for hq, ht in hope_topics:
            if hq["id"] in used_hope_ids:
                continue
            overlap = len(set(pt) & set(ht))
            if overlap > best_overlap:
                best_overlap = overlap
                best_match = hq
                best_shared = list(set(pt) & set(ht))
        if best_match and best_overlap > 0:
            pairs.append({
                "pair_id": f"PH-{len(pairs)+1:03d}",
                "pain_id": pq["id"],
                "hope_id": best_match["id"],
                "shared_topics": best_shared,
                "pain_quote": pq["text"][:300],
                "hope_quote": best_match["text"][:300],
                "pain_source": pq.get("source_url", ""),
                "hope_source": best_match.get("source_url", ""),
            })
            used_hope_ids.add(best_match["id"])

    return pairs


def build_why_how_pairs(quotes, target=30):
    rc = [q for q in quotes if q["bucket"] == "ROOT_CAUSE"]
    st = [q for q in quotes if q["bucket"] == "SOLUTIONS_TRIED"]

    rc_topics = [(q, get_topics(q["text"])) for q in rc]
    st_topics = [(q, get_topics(q["text"])) for q in st]

    pairs = []
    used_st_ids = set()

    for rq, rt in rc_topics:
        if len(pairs) >= target:
            break
        if not rt:
            continue
        best_match = None
        best_overlap = 0
        for sq, st_t in st_topics:
            if sq["id"] in used_st_ids:
                continue
            overlap = len(set(rt) & set(st_t))
            if overlap > best_overlap:
                best_overlap = overlap
                best_match = sq
                best_shared = list(set(rt) & set(st_t))
        if best_match and best_overlap > 0:
            pairs.append({
                "pair_id": f"WH-{len(pairs)+1:03d}",
                "root_cause_id": rq["id"],
                "solution_tried_id": best_match["id"],
                "shared_topics": best_shared,
                "root_cause_quote": rq["text"][:300],
                "solution_tried_quote": best_match["text"][:300],
                "root_cause_source": rq.get("source_url", ""),
                "solution_tried_source": best_match.get("source_url", ""),
            })
            used_st_ids.add(best_match["id"])

    return pairs


def build_mechanism_map(quotes):
    cm = [q for q in quotes if q["bucket"] == "COMPETITOR_MECHANISM"]
    mechanisms = defaultdict(list)

    for q in cm:
        text_lower = q["text"].lower()
        matched_any = False
        for mech_name, keywords in MECHANISM_CATS.items():
            if any(kw in text_lower for kw in keywords):
                mechanisms[mech_name].append({
                    "id": q["id"],
                    "excerpt": q["text"][:200],
                    "source": q.get("source_url", ""),
                })
                matched_any = True
        if not matched_any:
            mechanisms["Other/General Golf Ball"].append({
                "id": q["id"],
                "excerpt": q["text"][:200],
                "source": q.get("source_url", ""),
            })

    return {
        "total_mechanisms": len(mechanisms),
        "total_quotes_mapped": sum(len(v) for v in mechanisms.values()),
        "mechanisms": {
            k: {"count": len(v), "quotes": v}
            for k, v in sorted(mechanisms.items(), key=lambda x: -len(x[1]))
        },
    }


def main():
    print("=" * 60)
    print("GATE 1 ARTIFACT BUILDER")
    print("=" * 60)

    # 1. Load all quotes
    print("\n[1/4] Loading quotes from 8 scrape files...")
    all_quotes = load_all_quotes()
    print(f"  TOTAL: {len(all_quotes)} quotes loaded")

    # 2. Assign IDs
    print("\n[2/4] Assigning numbered IDs...")
    all_quotes, counts = assign_ids(all_quotes)
    print("  Bucket counts:")
    for bucket, count in sorted(counts.items()):
        prefix = BUCKET_PREFIX.get(bucket, "?")
        print(f"    {bucket}: {count} ({prefix}-001 to {prefix}-{count:03d})")

    # Save scored_quotes.json
    scored_path = os.path.join(L1, "scored_quotes.json")
    with open(scored_path, "w") as f:
        json.dump({
            "metadata": {
                "generated": "2026-03-27",
                "total_quotes": len(all_quotes),
                "bucket_counts": counts,
                "source_files": FILES,
            },
            "quotes": all_quotes,
        }, f, indent=2)
    print(f"  Saved: scored_quotes.json ({len(all_quotes)} quotes)")

    # 3. Build pairs
    print("\n[3/4] Building structural pairs...")

    ph_pairs = build_pain_hope_pairs(all_quotes)
    ph_path = os.path.join(L1, "pain_hope_pairs.json")
    with open(ph_path, "w") as f:
        json.dump({"total_pairs": len(ph_pairs), "pairs": ph_pairs}, f, indent=2)
    print(f"  pain_hope_pairs: {len(ph_pairs)} pairs (target: 25)")

    wh_pairs = build_why_how_pairs(all_quotes)
    wh_path = os.path.join(L1, "why_how_pairs.json")
    with open(wh_path, "w") as f:
        json.dump({"total_pairs": len(wh_pairs), "pairs": wh_pairs}, f, indent=2)
    print(f"  why_how_pairs: {len(wh_pairs)} pairs (target: 25)")

    # 4. Build mechanism map
    print("\n[4/4] Building mechanism map...")
    mech_map = build_mechanism_map(all_quotes)
    mech_path = os.path.join(L1, "mechanism_map.json")
    with open(mech_path, "w") as f:
        json.dump(mech_map, f, indent=2)
    print(f"  mechanism_map: {mech_map['total_mechanisms']} mechanisms (target: 15)")
    for name, data in mech_map["mechanisms"].items():
        print(f"    {name}: {data['count']} quotes")

    # Summary
    print("\n" + "=" * 60)
    print("GATE 1 ARTIFACT SUMMARY")
    print("=" * 60)
    print(f"  scored_quotes.json:    {len(all_quotes)} quotes with IDs")
    print(f"  pain_hope_pairs.json:  {len(ph_pairs)} pairs {'PASS' if len(ph_pairs) >= 25 else 'FAIL'}")
    print(f"  why_how_pairs.json:    {len(wh_pairs)} pairs {'PASS' if len(wh_pairs) >= 25 else 'FAIL'}")
    print(f"  mechanism_map.json:    {mech_map['total_mechanisms']} mechanisms {'PASS' if mech_map['total_mechanisms'] >= 15 else 'FAIL'}")

    # Gate 1 volume check
    print("\n  QUOTE VOLUME CHECK:")
    targets = {"PAIN": 300, "HOPE": 250, "ROOT_CAUSE": 200, "SOLUTIONS_TRIED": 150, "COMPETITOR_MECHANISM": 100, "VILLAIN": 75}
    all_pass = True
    for bucket, target in targets.items():
        actual = counts.get(bucket, 0)
        status = "PASS" if actual >= target else "FAIL"
        if status == "FAIL":
            all_pass = False
        print(f"    {bucket:25s} {actual:>5d} / {target:>5d}  {status}")
    total_status = "PASS" if len(all_quotes) >= 1000 else "FAIL"
    if total_status == "FAIL":
        all_pass = False
    print(f"    {'TOTAL':25s} {len(all_quotes):>5d} / {'1000':>5s}  {total_status}")

    overall = "PASS" if (all_pass and len(ph_pairs) >= 25 and len(wh_pairs) >= 25 and mech_map["total_mechanisms"] >= 15) else "FAIL"
    print(f"\n  OVERALL GATE 1 STATUS: {overall}")

    return overall == "PASS"


if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
