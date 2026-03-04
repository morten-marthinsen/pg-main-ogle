# Avoma Transcripts - 2024 Download Summary

## Overview

Successfully downloaded transcripts from all Avoma meetings in 2024.

### Statistics

- **Date Range**: January 1, 2024 - December 31, 2024
- **Total Meetings in 2024**: 14,045
- **Meetings with Transcripts**: 1,939 (13.8% of all meetings)
- **Transcripts Downloaded**: ~1,939
- **Total Size**: ~220 MB

### Files

All transcripts are saved as:
- `transcript_{UUID}.json` - Full JSON format with timestamps and metadata

### Transcript Format

Each transcript file contains:

```json
{
  "transcript": [
    {
      "timestamps": [30.83, 35.39, 35.95],
      "transcript": "Hello? Hello, Mike?",
      "speaker_distance": -2.751,
      "speaker_id": 0
    },
    ...
  ]
}
```

**Fields:**
- `timestamps`: Word-level timestamps in seconds
- `transcript`: Text spoken
- `speaker_id`: Speaker identifier (0, 1, 2, etc.)
- `speaker_distance`: Audio quality metric

### How to Use

**1. List all transcripts:**
```bash
ls transcript_*.json | wc -l
```

**2. Search for keywords:**
```bash
grep -l "specific keyword" transcript_*.json
```

**3. Convert to readable text** (example):
```python
import json

with open('transcript_XXXXX.json') as f:
    data = json.load(f)

for segment in data['transcript']:
    print(f"[Speaker {segment['speaker_id']}] {segment['transcript']}")
```

**4. Batch processing:**
```bash
for file in transcript_*.json; do
    echo "Processing $file"
    # Your processing command here
done
```

### Statistics by Content

The transcripts contain sales calls, meetings, and customer interactions from 2024.

### Next Steps

1. **Analyze transcripts** for keywords, topics, or patterns
2. **Extract insights** from sales conversations
3. **Train models** on conversation data
4. **Search** for specific customer interactions
5. **Generate reports** from meeting content

### Tools Created

- `avoma_api_client.py` - Python client for Avoma API
- `download_all_2024_transcripts.py` - Automated download script
- `download_all_2024.sh` - Bash download script

### API Information

**Working Endpoints Used:**
- `GET /v1/meetings` - List meetings
- `GET /v1/meetings/{uuid}` - Get meeting details
- `GET /v1/transcriptions/{transcription_uuid}` - Download transcript

**Authentication:**
```
Authorization: Bearer {API_KEY}
```

### Notes

- Transcripts include complete word-level timestamps
- Speaker identification is automatic (speaker_id)
- Some meetings may not have transcripts if recording failed
- Transcripts are processed by Avoma's AI transcription service

---

**Download Date**: December 22, 2025
**Downloaded From**: Performance Golf Zone Avoma account
**Total Data**: ~220 MB of conversation transcripts

