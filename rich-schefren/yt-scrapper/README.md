# YouTube Transcript Downloader

Download transcripts from entire YouTube channels. No proxies, no hassle.

## How It Works

1. **Primary:** Grabs existing YouTube captions (free, instant)
2. **Fallback:** For videos without captions, downloads audio and transcribes via Deepgram AI

---

## Setup (One-Time, ~10 minutes)

### Step 1: Get a Deepgram API Key (Free)

1. Go to **https://deepgram.com**
2. Click "Start Free" and create an account
3. In the dashboard, go to **API Keys**
4. Click **Create Key**, give it a name, copy the key
5. Save that key - you'll need it in Step 3

**Cost:** $200 free credits to start. After that, ~$0.004/minute (~$0.04 per 10-min video). Most channels cost $5-15 total to transcribe since many videos already have captions.

### Step 2: Run the Installer

Open Terminal and run:

```bash
cd ~/Downloads/youtube-transcript-package
bash install.sh
```

This installs all the required tools automatically.

### Step 3: Add Your Deepgram Key

The installer will prompt you for your Deepgram API key. Paste it when asked.

Or add it manually later:

```bash
echo 'export DEEPGRAM_API_KEY="your-key-here"' >> ~/.zshrc
source ~/.zshrc
```

---

## Usage

### Basic: Download from a Channel

```bash
# Without Deepgram (only gets videos that have captions)
yt-transcripts --channel AlexHormozi

# With Deepgram fallback (gets ALL videos)
yt-transcripts --channel AlexHormozi --deepgram
```

### Test First (Recommended)

```bash
# Just grab 5 videos to make sure it works
yt-transcripts --channel AlexHormozi --deepgram --limit 5
```

### All Options

| Option | Description |
|--------|-------------|
| `--channel, -c` | YouTube channel name (without the @) |
| `--deepgram, -d` | Use Deepgram for videos without captions |
| `--limit, -l` | Only process first N videos |
| `--output, -o` | Output folder (default: ~/Documents/youtube_transcripts) |
| `--name, -n` | Custom output filename |
| `--threads, -t` | Parallel downloads (default: 10) |

### Examples

```bash
# Alex Hormozi's channel
yt-transcripts -c AlexHormozi -d

# Lenny's Podcast, save to Desktop
yt-transcripts -c LennysPodcast -d -o ~/Desktop/transcripts

# Gary Vee, just 20 videos
yt-transcripts -c GaryVee -d -l 20
```

---

## Output

Creates two files in `~/Documents/youtube_transcripts/`:

- **`ChannelName_transcripts.md`** - Human-readable Markdown
- **`ChannelName_transcripts.json`** - Machine-readable JSON

---

## Troubleshooting

### "Command not found: yt-transcripts"
```bash
source ~/.zshrc
```

### "Deepgram API key not set"
```bash
echo 'export DEEPGRAM_API_KEY="your-key-here"' >> ~/.zshrc
source ~/.zshrc
```

### "No videos found"
- Make sure you're using the channel name, not the display name
- Try the channel URL: go to YouTube, find the channel, look at the URL
- Example: `youtube.com/@AlexHormozi` → use `AlexHormozi`

### Reinstall Everything
```bash
bash install.sh --force
```

---

## What Gets Installed

- **yt-dlp** - Downloads audio from YouTube (no restrictions)
- **youtube-transcript-api** - Fetches existing captions
- **scrapetube** - Lists all videos from a channel
- **deepgram-sdk** - Transcription API client

All installed to your user directory, no admin/sudo required.
