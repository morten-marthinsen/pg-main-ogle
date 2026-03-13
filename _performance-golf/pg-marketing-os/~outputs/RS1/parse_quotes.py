#!/usr/bin/env python3
"""Parse all raw-quotes markdown files into structured JSON for Layer 2 analysis.

Handles 3 quote formats:
1. Inline: **Bucket:** X / **Source:** Y / **Quote:** "Z" / [optional extra] / ---
2. Inline no-slash-end: **Bucket:** X / **Source:** Y / **Quote:** "Z"\n---
3. Multi-line: Separate lines for Bucket, Source, URL, Quote, followed by ---
"""
import re
import json
import glob
import os

BASE = os.path.dirname(os.path.abspath(__file__))
INPUT_DIR = os.path.join(BASE, "layer-1-outputs")
OUTPUT_DIR = os.path.join(BASE, "layer-2-outputs")


def normalize_bucket(bucket_name):
    """Normalize bucket names to standard 6 buckets."""
    bucket = bucket_name.strip().lower()
    mapping = {
        'pain': 'Pain',
        'hope': 'Hope',
        'root cause': 'Root Cause',
        'root_cause': 'Root Cause',
        'solutions tried': 'Solutions Tried',
        'solutions_tried': 'Solutions Tried',
        'competitor mechanism': 'Competitor Mechanism',
        'competitor_mechanism': 'Competitor Mechanism',
        'villain': 'Villain',
        'price/value': 'Villain',
        'fitting': 'Solutions Tried',
        'emotional transformation': 'Hope',
        'quantified results': 'Hope',
    }
    for key, val in mapping.items():
        if key in bucket:
            return val
    return bucket_name.strip()


def strip_quotes(text):
    """Remove surrounding quote marks."""
    text = text.strip()
    if (text.startswith('"') and text.endswith('"')) or \
       (text.startswith('\u201c') and text.endswith('\u201d')):
        text = text[1:-1]
    elif text.startswith('"') or text.startswith('\u201c'):
        text = text[1:]
    return text.strip()


def parse_multiline_format(content, filename):
    """Parse multi-line format where each field is on a separate line.

    Example:
    **Bucket:** Pain
    **Source:** GolfWRX
    **URL:** https://...
    **Quote:** "text"
    ---
    """
    quotes = []
    # Split on --- separators
    blocks = re.split(r'\n---\s*\n', content)

    for block in blocks:
        block = block.strip()
        if not block:
            continue

        bucket_m = re.search(r'\*\*Bucket:\*\*\s*(.+?)(?:\n|$)', block)
        source_m = re.search(r'\*\*Source:\*\*\s*(.+?)(?:\n|$)', block)
        url_m = re.search(r'\*\*URL:\*\*\s*(.+?)(?:\n|$)', block)
        video_m = re.search(r'\*\*Video:\*\*\s*(.+?)(?:\n|$)', block)
        quote_m = re.search(r'\*\*Quote:\*\*\s*(.+)', block, re.DOTALL)

        if not bucket_m or not quote_m:
            continue

        bucket = normalize_bucket(bucket_m.group(1).strip().rstrip('/'))
        source = source_m.group(1).strip().rstrip('/') if source_m else 'Unknown'
        quote_text = quote_m.group(1).strip()

        # Clean up quote text
        quote_text = strip_quotes(quote_text)
        quote_text = re.sub(r'\s+', ' ', quote_text).strip()

        if len(quote_text) < 10:
            continue

        obj = {
            'bucket': bucket,
            'source': source,
            'quote': quote_text,
            'file': filename,
        }
        if url_m:
            obj['url'] = url_m.group(1).strip()
        if video_m:
            obj['video'] = video_m.group(1).strip()

        quotes.append(obj)

    return quotes


def parse_inline_format(content, filename):
    """Parse inline format: **Bucket:** X / **Source:** Y / **Quote:** "Z" / ---

    Also handles variants:
    - With **URL:** or **Video:** fields
    - Quote ending with just newline+--- instead of / ---
    - Very long multi-paragraph quotes
    - Source names containing / (e.g., "Reddit r/golf")
    """
    quotes = []

    # Use field-boundary lookaheads instead of [^/] to handle / in source names
    # The key separator is " / **" (space-slash-space-doublestar)
    pattern = re.compile(
        r'\*\*Bucket:\*\*\s*(.+?)\s*/\s*\*\*Source:\*\*\s*(.+?)\s*/\s*\*\*Quote:\*\*\s*(.*?)(?=\n---|\s*/\s*---)',
        re.DOTALL
    )

    for match in pattern.finditer(content):
        bucket = normalize_bucket(match.group(1).strip())
        source = match.group(2).strip()
        raw_quote = match.group(3).strip()

        # Extract optional URL or Video from the quote portion
        url = None
        video = None

        # Check for inline URL or Video at end of quote
        url_match = re.search(r'\s*/\s*\*\*URL:\*\*\s*(.+?)$', raw_quote, re.DOTALL)
        video_match = re.search(r'\s*/\s*\*\*Video:\*\*\s*(.+?)$', raw_quote, re.DOTALL)

        if url_match:
            url = url_match.group(1).strip().rstrip('/')
            raw_quote = raw_quote[:url_match.start()].strip()
        elif video_match:
            video = video_match.group(1).strip().rstrip('/')
            raw_quote = raw_quote[:video_match.start()].strip()

        # Strip trailing / if present
        raw_quote = raw_quote.rstrip('/').strip()

        # Strip surrounding quotes
        quote_text = strip_quotes(raw_quote)
        quote_text = re.sub(r'\s+', ' ', quote_text).strip()

        if len(quote_text) < 10:
            continue

        obj = {
            'bucket': bucket,
            'source': source,
            'quote': quote_text,
            'file': filename,
        }
        if url:
            obj['url'] = url
        if video:
            obj['video'] = video

        quotes.append(obj)

    return quotes


def detect_format(content):
    """Detect which format a file uses."""
    # Check for multi-line format (Bucket on its own line, Quote on another)
    multiline_indicators = re.findall(
        r'^\*\*Bucket:\*\*\s*\w+\s*$',
        content, re.MULTILINE
    )

    # Check for inline format (Bucket / Source / Quote all on one+ lines with / separator)
    inline_indicators = re.findall(
        r'\*\*Bucket:\*\*\s*[^/]+?\s*/\s*\*\*Source:\*\*',
        content
    )

    if len(multiline_indicators) > len(inline_indicators):
        return 'multiline'
    return 'inline'


def parse_file(filepath):
    """Parse a single raw-quotes markdown file."""
    filename = os.path.basename(filepath)

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    fmt = detect_format(content)

    if fmt == 'multiline':
        quotes = parse_multiline_format(content, filename)
    else:
        quotes = parse_inline_format(content, filename)

    return quotes


def main():
    files = sorted(glob.glob(os.path.join(INPUT_DIR, "raw-quotes-*.md")))

    all_quotes = []
    file_stats = {}

    for filepath in files:
        quotes = parse_file(filepath)
        filename = os.path.basename(filepath)
        file_stats[filename] = len(quotes)
        all_quotes.extend(quotes)

    # Count by bucket
    bucket_counts = {}
    for q in all_quotes:
        b = q['bucket']
        bucket_counts[b] = bucket_counts.get(b, 0) + 1

    # Assign IDs
    for i, q in enumerate(all_quotes, 1):
        q['id'] = f"Q{i:04d}"

    # Build output
    output = {
        'metadata': {
            'consolidation_date': '2026-03-10',
            'total_quotes': len(all_quotes),
            'files_processed': len(files),
            'file_stats': file_stats,
            'bucket_counts': bucket_counts,
        },
        'quotes': all_quotes,
    }

    # Write quantified_buckets.json
    outpath = os.path.join(OUTPUT_DIR, "quantified_buckets.json")
    with open(outpath, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"Total quotes parsed: {len(all_quotes)}")
    print(f"Files processed: {len(files)}")
    print(f"\nBucket counts:")
    for bucket, count in sorted(bucket_counts.items(), key=lambda x: -x[1]):
        print(f"  {bucket}: {count}")
    print(f"\nFile stats:")
    for fname, count in sorted(file_stats.items()):
        print(f"  {fname}: {count}")
    print(f"\nOutput: {outpath}")


if __name__ == '__main__':
    main()
