import json
import re

OUTPUT_DIR = "/Users/BenjaminMarcoux/git/pg-main/_performance-golf/pg-marketing-os/~outputs/ION/research/layer-1-outputs"

# Bucket classification keywords
BUCKET_KEYWORDS = {
    "PAIN": [
        r"losing distance", r"lost \d+ yards", r"can.t hit it", r"getting shorter",
        r"losing \d+", r"frustrat", r"struggle", r"can.t seem", r"stuck at",
        r"slower every year", r"age.*distance", r"losing.*distance", r"not as far",
        r"can.t drive", r"shorter off the tee", r"lost.*club", r"don.t hit.*far",
        r"losing.*yardage", r"sucks", r"terrible", r"hurting", r"getting older",
        r"lost.*power", r"disappointed", r"hate", r"worst", r"no distance",
        r"can.t compress", r"too slow", r"doomed", r"giving up", r"not fair",
    ],
    "HOPE": [
        r"looking for", r"recommend", r"best ball for", r"want.*ball that",
        r"searching for", r"wish", r"hoping", r"considering", r"any suggestions",
        r"which ball", r"help me find", r"trying to find", r"want more distance",
        r"need.*ball", r"best.*for my", r"should I", r"would.*work for",
        r"want to improve", r"looking to", r"gain.*distance", r"add.*yards",
    ],
    "ROOT_CAUSE": [
        r"compression", r"swing speed", r"urethane", r"ionomer", r"surlyn",
        r"spin.*rate", r"launch.*angle", r"doesn.t matter", r"no.*difference",
        r"myth", r"debunk", r"science", r"data.*show", r"robot.*test",
        r"doesn.t affect", r"not.*important", r"marketing", r"won.t.*help",
        r"ball.*speed", r"doesn.t.*change", r"minimal.*difference",
        r"same.*distance", r"doesn.t really matter", r"ball.*choice",
    ],
    "SOLUTIONS_TRIED": [
        r"switched.*from", r"switched.*to", r"tried.*and", r"went from",
        r"changed.*to", r"tested", r"compared", r"side by side",
        r"after.*playing.*with", r"used to play", r"moved to", r"gave.*a try",
        r"bought.*and", r"started.*using", r"went back to", r"settled on",
    ],
    "COMPETITOR_MECHANISM": [
        r"pro ?v1", r"kirkland", r"chrome ?soft", r"supersoft", r"soft ?feel",
        r"bridgestone.*e6", r"vice.*pro", r"maxfli.*tour", r"tp5", r"avx",
        r"srixon.*q.star", r"z.star", r"noodle", r"duo.*soft", r"tour.*response",
        r"erc.*soft", r"callaway", r"titleist", r"taylormade", r"bridgestone",
        r"wilson", r"snell", r"cut.*blue", r"seed",
    ],
    "VILLAIN": [
        r"scam", r"rip.*off", r"overpriced", r"waste.*money", r"not worth",
        r"price.*goug", r"too.*expensive", r"\$5[0-9].*dozen", r"marketing.*bs",
        r"marketing.*bullshit", r"bamboozl", r"brand.*tax", r"just.*marketing",
        r"don.t.*waste", r"not.*good enough.*for", r"stop.*wasting",
        r"shouldn.t.*play", r"you.*don.t.*need", r"paying too much",
    ],
}

def classify_bucket(text):
    """Classify text into bucket based on keyword matches, return (bucket, match_count)."""
    text_lower = text.lower()
    scores = {}
    for bucket, patterns in BUCKET_KEYWORDS.items():
        count = 0
        for pattern in patterns:
            if re.search(pattern, text_lower):
                count += 1
        if count > 0:
            scores[bucket] = count
    if not scores:
        return None, 0
    best = max(scores, key=scores.get)
    return best, scores[best]

def score_quote(text, engagement=0):
    """Score a quote on emotional_intensity, specificity, copy_usefulness."""
    text_lower = text.lower()
    
    # Emotional intensity
    emotional_words = ["love", "hate", "frustrated", "amazing", "terrible", "shocked",
                       "can't believe", "finally", "worst", "best", "absolutely", 
                       "definitely", "huge", "insane", "ridiculous", "blown", "crushed"]
    emotional = min(10, 3 + sum(1 for w in emotional_words if w in text_lower))
    
    # Specificity (numbers, brands, distances)
    has_numbers = len(re.findall(r'\d+', text)) 
    has_brands = len(re.findall(r'pro ?v1|kirkland|callaway|bridgestone|srixon|titleist|taylormade|vice|maxfli|wilson', text_lower))
    specificity = min(10, 3 + has_numbers + has_brands * 2)
    
    # Copy usefulness (first person, length, engagement)
    first_person = 1 if re.search(r'\b(I|my|I\'m|I\'ve|me)\b', text) else 0
    good_length = 1 if 50 < len(text) < 500 else 0
    high_engagement = 1 if engagement >= 5 else 0
    copy_useful = min(10, 4 + first_person * 2 + good_length * 2 + high_engagement + has_numbers)
    
    composite = round((emotional + specificity + copy_useful) / 3, 1)
    return {"emotional_intensity": emotional, "specificity": specificity, 
            "copy_usefulness": copy_useful, "composite": composite}

def extract_from_reddit(data):
    """Extract quotes from Reddit dataset."""
    quotes = []
    for item in data:
        body = item.get("body", "")
        if not body or len(body) < 60 or body == "[deleted]" or body == "[removed]":
            continue
        if len(body) > 600:
            body = body[:600]  # Truncate very long posts
            
        bucket, match_count = classify_bucket(body)
        if bucket is None or match_count < 1:
            continue
            
        score = item.get("score", 0) or 0
        scores = score_quote(body, score)
        
        # Filter: only keep quotes with composite >= 5.5
        if scores["composite"] < 5.5:
            continue
            
        # Build source_id from URL
        query_url = item.get("query", "") or item.get("url", "")
        
        quotes.append({
            "text": body.replace("\n\n", " ").replace("\n", " ").strip(),
            "author": item.get("author", "anonymous"),
            "source_url": query_url[:120],
            "source_id": "R-auto",
            "source_title": item.get("title", ""),
            "platform": "Reddit",
            "bucket": bucket,
            "scores": scores,
            "context": f"Auto-extracted (engagement: {score}, bucket_matches: {match_count})",
            "engagement": score,
        })
    
    # Sort by composite score descending
    quotes.sort(key=lambda q: q["scores"]["composite"], reverse=True)
    return quotes

def extract_from_youtube(data):
    """Extract quotes from YouTube dataset."""
    quotes = []
    for item in data:
        if item.get("type") not in ("comment", "reply"):
            continue
        comment = item.get("comment", "")
        if not comment or len(comment) < 50:
            continue
        if len(comment) > 600:
            comment = comment[:600]
            
        bucket, match_count = classify_bucket(comment)
        if bucket is None or match_count < 1:
            continue
            
        votes = item.get("voteCount", 0) or 0
        scores = score_quote(comment, votes)
        
        if scores["composite"] < 5.5:
            continue
            
        quotes.append({
            "text": comment.replace("\n\n", " ").replace("\n", " ").strip(),
            "author": item.get("author", "anonymous"),
            "source_url": f"https://www.youtube.com/watch?v={item.get('videoId', '')}",
            "source_id": "Y-auto",
            "source_title": item.get("title", ""),
            "platform": "YouTube",
            "bucket": bucket,
            "scores": scores,
            "context": f"Auto-extracted (votes: {votes}, bucket_matches: {match_count})",
            "engagement": votes,
        })
    
    quotes.sort(key=lambda q: q["scores"]["composite"], reverse=True)
    return quotes

# Load datasets
print("Loading Reddit dataset...")
with open("/tmp/reddit_full_dataset.json") as f:
    reddit_data = json.load(f)
print(f"  {len(reddit_data)} items")

print("Loading YouTube dataset...")
with open("/tmp/youtube_full_dataset.json") as f:
    youtube_data = json.load(f)
print(f"  {len(youtube_data)} items")

# Extract
print("\nExtracting Reddit quotes...")
reddit_quotes = extract_from_reddit(reddit_data)
print(f"  {len(reddit_quotes)} candidate quotes")

print("Extracting YouTube quotes...")
youtube_quotes = extract_from_youtube(youtube_data)
print(f"  {len(youtube_quotes)} candidate quotes")

# Load existing manually-extracted quotes
print("\nLoading existing manual quotes...")
with open(f"{OUTPUT_DIR}/scrape-reddit.json") as f:
    existing_reddit = json.load(f)
with open(f"{OUTPUT_DIR}/scrape-youtube.json") as f:
    existing_youtube = json.load(f)
with open(f"{OUTPUT_DIR}/scrape-forums.json") as f:
    existing_forums = json.load(f)

manual_count = len(existing_reddit["quotes"]) + len(existing_youtube["quotes"]) + len(existing_forums["quotes"])
print(f"  {manual_count} existing manual quotes")

# Deduplicate: remove auto quotes that match existing text
existing_texts = set()
for src in [existing_reddit, existing_youtube, existing_forums]:
    for q in src["quotes"]:
        existing_texts.add(q["text"][:80].lower())

reddit_new = [q for q in reddit_quotes if q["text"][:80].lower() not in existing_texts]
youtube_new = [q for q in youtube_quotes if q["text"][:80].lower() not in existing_texts]
print(f"\nAfter dedup: {len(reddit_new)} new Reddit, {len(youtube_new)} new YouTube")

# Write auto-extracted files
auto_reddit = {
    "metadata": {
        "scraper": "1.4-C Reddit Auto-Extractor",
        "platform": "Reddit",
        "date": "2026-03-26",
        "method": "keyword-based auto-classification from full 2,611 item dataset",
        "total_quotes": len(reddit_new),
        "status": "AUTO-EXTRACTED — needs human review for accuracy"
    },
    "quotes": reddit_new,
    "bucket_counts": {}
}

auto_youtube = {
    "metadata": {
        "scraper": "1.4-B YouTube Auto-Extractor", 
        "platform": "YouTube",
        "date": "2026-03-26",
        "method": "keyword-based auto-classification from full 561 item dataset",
        "total_quotes": len(youtube_new),
        "status": "AUTO-EXTRACTED — needs human review for accuracy"
    },
    "quotes": youtube_new,
    "bucket_counts": {}
}

# Count buckets
for dataset in [auto_reddit, auto_youtube]:
    buckets = {}
    for q in dataset["quotes"]:
        b = q["bucket"]
        buckets[b] = buckets.get(b, 0) + 1
    dataset["bucket_counts"] = buckets

with open(f"{OUTPUT_DIR}/scrape-reddit-auto.json", "w") as f:
    json.dump(auto_reddit, f, indent=2)
with open(f"{OUTPUT_DIR}/scrape-youtube-auto.json", "w") as f:
    json.dump(auto_youtube, f, indent=2)

# Grand totals
all_quotes = (
    existing_reddit["quotes"] + existing_youtube["quotes"] + existing_forums["quotes"] +
    reddit_new + youtube_new
)
total = len(all_quotes)

all_buckets = {}
for q in all_quotes:
    b = q["bucket"]
    all_buckets[b] = all_buckets.get(b, 0) + 1

targets = {"PAIN": 300, "HOPE": 250, "ROOT_CAUSE": 200, "SOLUTIONS_TRIED": 150, 
           "COMPETITOR_MECHANISM": 100, "VILLAIN": 75}

print(f"\n{'='*60}")
print(f"GRAND TOTAL: {total} quotes")
print(f"  Manual: {manual_count}")
print(f"  Auto-Reddit: {len(reddit_new)}")
print(f"  Auto-YouTube: {len(youtube_new)}")
print(f"{'='*60}")
print(f"\n{'Bucket':<25} {'Current':>8} {'Target':>8} {'Gap':>8} {'%':>6}")
print("-" * 60)
for b in ["PAIN", "HOPE", "ROOT_CAUSE", "SOLUTIONS_TRIED", "COMPETITOR_MECHANISM", "VILLAIN"]:
    c = all_buckets.get(b, 0)
    t = targets[b]
    pct = round(c/t*100)
    print(f"{b:<25} {c:>8} {t:>8} {c-t:>+8} {pct:>5}%")
print("-" * 60)
print(f"{'TOTAL':<25} {total:>8} {1000:>8} {total-1000:>+8} {round(total/10):>5}%")

