#!/bin/bash
# Quick start script for WebGUI

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  HiAni DL WebGUI Launcher${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check docker-compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: docker-compose not found${NC}"
    exit 1
fi

# Check if container is already running
if docker ps | grep -q hianime-webgui; then
    echo -e "${YELLOW}WebGUI is already running${NC}"
    echo ""
    echo "Actions:"
    echo "1) Open in browser"
    echo "2) View logs"
    echo "3) Stop WebGUI"
    echo "4) Restart WebGUI"
    echo "5) Exit"
    echo ""
    echo -n "Choose [1-5]: "
    read -r choice

    case $choice in
        1)
            echo -e "${GREEN}Opening browser...${NC}"
            if command -v open &> /dev/null; then
                open http://localhost:8080
            elif command -v xdg-open &> /dev/null; then
                xdg-open http://localhost:8080
            else
                echo "Please open http://localhost:8080 in your browser"
            fi
            ;;
        2)
            echo -e "${GREEN}Viewing logs (Ctrl+C to exit)...${NC}"
            docker-compose logs -f hianime-webgui
            ;;
        3)
            echo -e "${YELLOW}Stopping WebGUI...${NC}"
            docker-compose down hianime-webgui
            echo -e "${GREEN}WebGUI stopped${NC}"
            ;;
        4)
            echo -e "${YELLOW}Restarting WebGUI...${NC}"
            docker-compose restart hianime-webgui
            echo -e "${GREEN}WebGUI restarted${NC}"
            ;;
        5)
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            exit 1
            ;;
    esac
    exit 0
fi

# Not running - show startup menu
echo "WebGUI is not running"
echo ""
echo "Actions:"
echo "1) Start WebGUI (build if needed)"
echo "2) Rebuild and start WebGUI"
echo "3) Configure environment"
echo "4) Exit"
echo ""
echo -n "Choose [1-4]: "
read -r choice

case $choice in
    1)
        echo -e "${GREEN}Starting WebGUI...${NC}"
        docker-compose up -d hianime-webgui
        echo ""
        echo -e "${GREEN}WebGUI started!${NC}"
        echo -e "Access at: ${BLUE}http://localhost:8080${NC}"
        echo ""
        echo -e "${YELLOW}Important:${NC} Make sure URL_ALLOWLIST is configured in docker-compose.yml"
        ;;
    2)
        echo -e "${GREEN}Rebuilding WebGUI...${NC}"
        docker-compose build hianime-webgui
        docker-compose up -d hianime-webgui
        echo ""
        echo -e "${GREEN}WebGUI rebuilt and started!${NC}"
        echo -e "Access at: ${BLUE}http://localhost:8080${NC}"
        ;;
    3)
        echo ""
        echo -e "${BLUE}Current URL_ALLOWLIST configuration:${NC}"
        grep "URL_ALLOWLIST:" docker-compose.yml | head -1
        echo ""
        echo "To configure:"
        echo "1. Edit docker-compose.yml"
        echo "2. Find the hianime-webgui service"
        echo "3. Set URL_ALLOWLIST environment variable"
        echo ""
        echo "Example: URL_ALLOWLIST: \"hianime.to\""
        echo ""
        echo "For authentication, also set:"
        echo "  WEB_USER: admin"
        echo "  WEB_PASSWORD: your-password"
        ;;
    4)
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac
