#!/bin/bash
# Quick start script for HiAni DL Docker stack

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}  HiAni DL Docker Stack Setup${NC}"
echo -e "${BLUE}=====================================${NC}"
echo ""

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: docker-compose is not installed${NC}"
    echo "Please install Docker Compose first"
    exit 1
fi

# Create temp directory if it doesn't exist
TEMP_DIR="/Users/benjamin/Documents/GitHub/temp"
if [ ! -d "$TEMP_DIR" ]; then
    echo -e "${YELLOW}Creating temp directory: $TEMP_DIR${NC}"
    mkdir -p "$TEMP_DIR"
fi

# Check if .env exists, if not, prompt to create from example
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}No .env file found${NC}"
    echo -n "Would you like to create one from .env.example? (y/n): "
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        cp .env.example .env
        echo -e "${GREEN}.env file created! Please edit it with your settings.${NC}"
        echo ""
        echo "Edit with: nano .env"
        echo "          or"
        echo "          code .env"
        echo ""
        exit 0
    else
        echo -e "${YELLOW}Continuing without .env file (will run in interactive mode)${NC}"
    fi
fi

# Display menu
echo ""
echo "What would you like to do?"
echo "1) Build Docker image"
echo "2) Start container (automated mode with .env)"
echo "3) Run interactive mode"
echo "4) View logs"
echo "5) Stop container"
echo "6) Rebuild image (clean build)"
echo "7) One-time download (provide details)"
echo "8) Exit"
echo ""
echo -n "Enter choice [1-8]: "
read -r choice

case $choice in
    1)
        echo -e "${GREEN}Building Docker image...${NC}"
        docker-compose build
        echo -e "${GREEN}Build complete!${NC}"
        ;;
    2)
        echo -e "${GREEN}Starting container in automated mode...${NC}"
        docker-compose up
        ;;
    3)
        echo -e "${GREEN}Starting interactive mode...${NC}"
        docker-compose run --rm hianime-downloader
        ;;
    4)
        echo -e "${GREEN}Viewing logs (Ctrl+C to exit)...${NC}"
        docker-compose logs -f
        ;;
    5)
        echo -e "${YELLOW}Stopping container...${NC}"
        docker-compose down
        echo -e "${GREEN}Container stopped${NC}"
        ;;
    6)
        echo -e "${YELLOW}Rebuilding image (no cache)...${NC}"
        docker-compose build --no-cache
        echo -e "${GREEN}Rebuild complete!${NC}"
        ;;
    7)
        echo ""
        echo -e "${BLUE}One-time Download${NC}"
        echo ""
        echo "Enter anime name or URL:"
        read -r input

        if [[ "$input" =~ ^https?:// ]]; then
            # It's a URL
            echo -e "${GREEN}Downloading from URL: $input${NC}"
            docker-compose run --rm -e LINK="$input" hianime-downloader
        else
            # It's an anime name
            echo "Download type (sub/dub):"
            read -r dtype
            echo "Episode from:"
            read -r ep_from
            echo "Episode to:"
            read -r ep_to
            echo "Season (or press Enter to skip):"
            read -r season

            ENV_VARS="-e NAME=\"$input\" -e DOWNLOAD_TYPE=$dtype -e EP_FROM=$ep_from -e EP_TO=$ep_to"
            if [ -n "$season" ]; then
                ENV_VARS="$ENV_VARS -e SEASON=$season"
            fi

            echo -e "${GREEN}Starting download...${NC}"
            docker-compose run --rm $ENV_VARS hianime-downloader
        fi
        ;;
    8)
        echo -e "${BLUE}Goodbye!${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Done!${NC}"
echo -e "Downloads are saved to: ${BLUE}$TEMP_DIR${NC}"
