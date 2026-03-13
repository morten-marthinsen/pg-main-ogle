#!/bin/bash
#
# YouTube Transcript Downloader - Installer for Mac
# Run with: bash install.sh
#

set -e

echo "=============================================="
echo "YouTube Transcript Downloader - Installer"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running on Mac
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}ERROR: This installer is for Mac only.${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Running on Mac"

# Check for Python 3
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}ERROR: Python 3 is not installed.${NC}"
    echo "Install it from: https://www.python.org/downloads/"
    exit 1
fi

PYTHON_VERSION=$(python3 --version 2>&1 | cut -d' ' -f2)
echo -e "${GREEN}✓${NC} Python $PYTHON_VERSION found"

# Determine the right pip location
PIP_CMD=""
if command -v pip3 &> /dev/null; then
    PIP_CMD="pip3"
elif python3 -m pip --version &> /dev/null; then
    PIP_CMD="python3 -m pip"
else
    echo -e "${RED}ERROR: pip not found. Installing...${NC}"
    python3 -m ensurepip --user
    PIP_CMD="python3 -m pip"
fi

echo -e "${GREEN}✓${NC} pip found"

# Create bin directory if needed
mkdir -p ~/bin

# Add ~/bin to PATH if not already there
if [[ ":$PATH:" != *":$HOME/bin:"* ]]; then
    echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
    export PATH="$HOME/bin:$PATH"
fi

echo ""
echo "Installing Python packages..."
echo "--------------------------------------------"

# Install packages
$PIP_CMD install --user --upgrade youtube-transcript-api
echo -e "${GREEN}✓${NC} youtube-transcript-api installed"

$PIP_CMD install --user --upgrade scrapetube
echo -e "${GREEN}✓${NC} scrapetube installed"

$PIP_CMD install --user --upgrade yt-dlp
echo -e "${GREEN}✓${NC} yt-dlp installed"

$PIP_CMD install --user --upgrade deepgram-sdk
echo -e "${GREEN}✓${NC} deepgram-sdk installed"

echo ""
echo "Installing the transcript downloader..."
echo "--------------------------------------------"

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Copy the main script to ~/bin
cp "$SCRIPT_DIR/yt-transcripts.py" ~/bin/yt-transcripts.py
chmod +x ~/bin/yt-transcripts.py

# Create a wrapper script
cat > ~/bin/yt-transcripts << 'EOF'
#!/bin/bash
python3 ~/bin/yt-transcripts.py "$@"
EOF
chmod +x ~/bin/yt-transcripts

echo -e "${GREEN}✓${NC} yt-transcripts command installed"

# Find where pip installed packages and add to PATH
PYTHON_USER_BASE=$(python3 -m site --user-base)
PYTHON_USER_BIN="$PYTHON_USER_BASE/bin"

if [[ -d "$PYTHON_USER_BIN" ]]; then
    if ! grep -q "$PYTHON_USER_BIN" ~/.zshrc 2>/dev/null; then
        echo "export PATH=\"$PYTHON_USER_BIN:\$PATH\"" >> ~/.zshrc
    fi
fi

echo ""
echo "=============================================="
echo "Deepgram API Key Setup"
echo "=============================================="
echo ""
echo "To transcribe videos without captions, you need a Deepgram API key."
echo ""
echo "1. Go to: https://deepgram.com"
echo "2. Create a free account (\$200 free credits)"
echo "3. Go to API Keys → Create Key"
echo "4. Copy your key"
echo ""

# Check if DEEPGRAM_API_KEY is already set
if [[ -n "$DEEPGRAM_API_KEY" ]]; then
    echo -e "${GREEN}✓${NC} DEEPGRAM_API_KEY is already set"
elif grep -q "DEEPGRAM_API_KEY" ~/.zshrc 2>/dev/null; then
    echo -e "${GREEN}✓${NC} DEEPGRAM_API_KEY found in ~/.zshrc"
else
    echo -e "${YELLOW}Do you want to add your Deepgram API key now? (y/n)${NC}"
    read -r ADD_KEY

    if [[ "$ADD_KEY" == "y" || "$ADD_KEY" == "Y" ]]; then
        echo "Paste your Deepgram API key:"
        read -r DEEPGRAM_KEY

        if [[ -n "$DEEPGRAM_KEY" ]]; then
            echo "export DEEPGRAM_API_KEY=\"$DEEPGRAM_KEY\"" >> ~/.zshrc
            export DEEPGRAM_API_KEY="$DEEPGRAM_KEY"
            echo -e "${GREEN}✓${NC} API key saved to ~/.zshrc"
        fi
    else
        echo ""
        echo "No problem! Add it later with:"
        echo "  echo 'export DEEPGRAM_API_KEY=\"your-key\"' >> ~/.zshrc"
        echo "  source ~/.zshrc"
    fi
fi

echo ""
echo "=============================================="
echo -e "${GREEN}INSTALLATION COMPLETE!${NC}"
echo "=============================================="
echo ""
echo "To activate the new commands, run:"
echo "  source ~/.zshrc"
echo ""
echo "Then try it out:"
echo "  yt-transcripts --channel AlexHormozi --deepgram --limit 5"
echo ""
echo "For help:"
echo "  yt-transcripts --help"
echo ""
