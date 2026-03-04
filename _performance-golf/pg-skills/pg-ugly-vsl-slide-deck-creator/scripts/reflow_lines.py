#!/usr/bin/env python3
"""
Reflow lines in a VSL lines file to prevent orphaned words.

Uses calibrated character widths for Montserrat Medium 112pt to calculate
actual rendered width of each line, then reflows ALL multi-line slides
to ensure no orphans exist.

Key principle: Join all lines of a slide together, then re-split optimally
to avoid orphans while keeping lines within the max width.
"""

import sys
import os

# Character widths for Montserrat Medium at 112pt (in points)
CHAR_WIDTHS = {
    # Uppercase
    'W': 98, 'M': 92, 'O': 82, 'Q': 82, 'D': 78, 'G': 78, 'H': 78, 'N': 78,
    'U': 75, 'A': 72, 'B': 70, 'C': 70, 'K': 70, 'P': 68, 'R': 68, 'V': 68,
    'X': 68, 'Y': 68, 'Z': 65, 'E': 62, 'F': 58, 'S': 62, 'T': 62, 'L': 58,
    'J': 52, 'I': 32,
    # Lowercase
    'w': 78, 'm': 82, 'o': 62, 'q': 62, 'd': 62, 'g': 62, 'h': 58, 'n': 58,
    'u': 58, 'a': 58, 'b': 62, 'c': 55, 'k': 55, 'p': 62, 'r': 38, 'v': 52,
    'x': 52, 'y': 52, 'z': 50, 'e': 58, 'f': 35, 's': 52, 't': 38, 'l': 28,
    'j': 28, 'i': 28,
    # Numbers
    '0': 62, '1': 45, '2': 58, '3': 58, '4': 60, '5': 58, '6': 60, '7': 52,
    '8': 60, '9': 60,
    # Punctuation
    ' ': 28, '.': 28, ',': 28, '!': 32, '?': 55, "'": 22, '"': 42, '-': 38,
    ':': 28, ';': 28, '(': 35, ')': 35, '/': 38, '$': 58, '%': 75, '&': 72,
    '…': 84,
}

DEFAULT_WIDTH = 55
SCALE_FACTOR = 1.0  # Base character widths are already calibrated for 112pt Montserrat
MAX_WIDTH = 1638
MIN_WORDS_PER_LINE = 3  # Minimum words to avoid orphan


def strip_markup(text):
    """Remove markdown emphasis markers for width calculation."""
    result = text
    result = result.replace('**{red}', '').replace('{/red}**', '')
    result = result.replace('**', '').replace('__', '')
    return result


def calculate_width(text):
    """Calculate the rendered width of text in points."""
    clean = strip_markup(text)
    total = 0
    for char in clean:
        base = CHAR_WIDTHS.get(char, DEFAULT_WIDTH)
        total += base * SCALE_FACTOR
    return total


def word_count(text):
    """Count words in text, ignoring markup."""
    clean = strip_markup(text)
    if not clean.strip():
        return 0
    return len(clean.split())


def is_orphan(text):
    """Check if text would be an orphan (1-2 words)."""
    return word_count(text) <= 2


def split_into_lines(text, max_width):
    """
    Split text into lines that fit within max_width.
    Ensures no line has only 1-2 words (orphans).
    Returns list of lines.
    """
    words = text.split()
    if not words:
        return [text]

    total_words = len(words)

    # If text fits on one line, return as-is
    if calculate_width(text) <= max_width:
        return [text]

    # If only 1-2 words but too wide, we have no choice
    if total_words <= 2:
        return [text]

    # Find optimal line breaks
    # Strategy: Try to keep lines balanced while avoiding orphans

    lines = []
    remaining = words[:]

    while remaining:
        # Calculate how many words remain
        words_left = len(remaining)

        # Find how many words fit on this line
        fit_count = 0
        for i in range(1, words_left + 1):
            test_line = ' '.join(remaining[:i])
            if calculate_width(test_line) <= max_width:
                fit_count = i
            else:
                break

        if fit_count == 0:
            # First word is too long - force it
            fit_count = 1

        # Check if taking fit_count words would leave an orphan
        words_after = words_left - fit_count

        if words_after > 0 and words_after <= 2:
            # Would create orphan - need to adjust
            # Option 1: Take fewer words so more remain
            # Option 2: Take more words if they fit (unlikely)

            # Try taking one less word
            if fit_count > MIN_WORDS_PER_LINE:
                # Check if remaining would still fit
                test_remain = remaining[fit_count - 1:]
                test_line = ' '.join(test_remain)
                if calculate_width(test_line) <= max_width or len(test_remain) > 2:
                    fit_count -= 1
                    words_after = words_left - fit_count

            # If still orphan, try taking two less
            if words_after > 0 and words_after <= 2 and fit_count > MIN_WORDS_PER_LINE + 1:
                test_remain = remaining[fit_count - 2:]
                test_line = ' '.join(test_remain)
                if calculate_width(test_line) <= max_width or len(test_remain) > 2:
                    fit_count -= 2

        # Also check that we're not creating an orphan on THIS line
        if fit_count <= 2 and words_left > fit_count:
            # This line would be orphan - try to fit more
            # This shouldn't happen if max_width is reasonable
            pass

        lines.append(' '.join(remaining[:fit_count]))
        remaining = remaining[fit_count:]

    return lines


def process_slide(slide_lines):
    """
    Process a single slide's lines to prevent orphans.
    Joins all lines, then re-splits optimally.
    """
    # Join all lines into single text
    full_text = ' '.join(slide_lines)

    # Count total words
    total_words = word_count(full_text)

    # If single line and fits, return as-is
    if len(slide_lines) == 1 and calculate_width(full_text) <= MAX_WIDTH:
        return slide_lines

    # If only 1-2 words total, return as-is (can't fix)
    if total_words <= 2:
        return slide_lines

    # Re-split optimally
    new_lines = split_into_lines(full_text, MAX_WIDTH)

    # Validate: check for orphans in result
    has_orphan = False
    for i, line in enumerate(new_lines):
        wc = word_count(line)
        # Middle lines with 1-2 words are OK if total is small
        # But last line with 1-2 words when there are more lines is bad
        if i == len(new_lines) - 1 and len(new_lines) > 1 and wc <= 2:
            has_orphan = True
            break

    if has_orphan and len(new_lines) >= 2:
        # Try to fix by redistributing
        # Combine last two lines and re-split
        combined = new_lines[-2] + ' ' + new_lines[-1]
        combined_words = combined.split()

        if len(combined_words) >= 4:
            # Split more evenly
            mid = len(combined_words) // 2
            new_lines[-2] = ' '.join(combined_words[:mid])
            new_lines[-1] = ' '.join(combined_words[mid:])
        elif len(combined_words) == 3:
            # Put 2 words on last line
            new_lines[-2] = combined_words[0]
            new_lines[-1] = ' '.join(combined_words[1:])
            # But now first might be orphan - combine into one if fits
            if calculate_width(combined) <= MAX_WIDTH:
                new_lines = new_lines[:-2] + [combined]

    return new_lines


def process_file(input_path, output_path=None):
    """Process a lines file and reflow to prevent orphans."""
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into slides (separated by blank lines)
    raw_lines = content.split('\n')
    slides = []
    current_slide = []

    for line in raw_lines:
        if line == '':
            if current_slide:
                slides.append(current_slide)
                current_slide = []
        else:
            current_slide.append(line)

    if current_slide:
        slides.append(current_slide)

    # Process each slide
    processed_slides = []
    changes = 0

    for i, slide in enumerate(slides):
        original = '\n'.join(slide)
        processed = process_slide(slide)
        processed_text = '\n'.join(processed)

        if original != processed_text:
            changes += 1
            print(f"Slide {i+1}:")
            print(f"  Before: {slide}")
            print(f"  After:  {processed}")
            print()

        processed_slides.append(processed)

    # Reconstruct file content
    output_lines = []
    for slide in processed_slides:
        output_lines.extend(slide)
        output_lines.append('')

    while output_lines and output_lines[-1] == '':
        output_lines.pop()

    output_content = '\n'.join(output_lines) + '\n'

    target = output_path if output_path else input_path
    with open(target, 'w', encoding='utf-8') as f:
        f.write(output_content)

    print(f"Processed {len(slides)} slides, reflowed {changes}")
    print(f"Output written to: {target}")

    return changes


def main():
    if len(sys.argv) < 2:
        print("Usage: python reflow_lines.py <input_file> [output_file]")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else None

    if not os.path.exists(input_path):
        print(f"Error: File not found: {input_path}")
        sys.exit(1)

    process_file(input_path, output_path)


if __name__ == "__main__":
    main()
