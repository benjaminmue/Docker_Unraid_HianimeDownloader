#!/bin/bash
# Script to create all GitHub issue labels for HiAni DL
# Requires: GitHub CLI (https://cli.github.com/)
# Usage: ./create-labels.sh

set -e

echo "🏷️  Creating GitHub issue labels for HiAni DL..."
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "   Install from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub."
    echo "   Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is ready"
echo ""

# Repository
REPO="benjaminmue/HiAni-DL"

# Issue Types
echo "📋 Creating Issue Type labels..."
gh label create "bug" --repo "$REPO" --color "d73a4a" --description "Something isn't working correctly" --force 2>/dev/null || true
gh label create "enhancement" --repo "$REPO" --color "a2eeef" --description "New feature or request" --force 2>/dev/null || true
gh label create "documentation" --repo "$REPO" --color "0075ca" --description "Improvements or additions to documentation" --force 2>/dev/null || true
gh label create "question" --repo "$REPO" --color "d876e3" --description "Further information is requested" --force 2>/dev/null || true

# Priority Levels
echo "🔥 Creating Priority labels..."
gh label create "priority-critical" --repo "$REPO" --color "b60205" --description "Critical issue requiring immediate attention" --force 2>/dev/null || true
gh label create "priority-high" --repo "$REPO" --color "d93f0b" --description "High priority issue" --force 2>/dev/null || true
gh label create "priority-medium" --repo "$REPO" --color "fbca04" --description "Medium priority issue" --force 2>/dev/null || true
gh label create "priority-low" --repo "$REPO" --color "0e8a16" --description "Low priority issue" --force 2>/dev/null || true

# Status Labels
echo "📊 Creating Status labels..."
gh label create "needs-triage" --repo "$REPO" --color "ededed" --description "Issue needs initial review and categorization" --force 2>/dev/null || true
gh label create "needs-review" --repo "$REPO" --color "fbca04" --description "Awaiting review from maintainer" --force 2>/dev/null || true
gh label create "needs-info" --repo "$REPO" --color "d4c5f9" --description "More information needed from reporter" --force 2>/dev/null || true
gh label create "in-progress" --repo "$REPO" --color "1d76db" --description "Currently being worked on" --force 2>/dev/null || true
gh label create "blocked" --repo "$REPO" --color "d93f0b" --description "Blocked by external dependency or other issue" --force 2>/dev/null || true

# Component Areas
echo "🔧 Creating Component Area labels..."
gh label create "area-webgui" --repo "$REPO" --color "bfdadc" --description "Related to web interface and frontend" --force 2>/dev/null || true
gh label create "area-download-engine" --repo "$REPO" --color "bfdadc" --description "Related to download logic and stream extraction" --force 2>/dev/null || true
gh label create "area-docker" --repo "$REPO" --color "bfdadc" --description "Related to Docker configuration and deployment" --force 2>/dev/null || true
gh label create "area-selenium" --repo "$REPO" --color "bfdadc" --description "Related to Selenium browser automation" --force 2>/dev/null || true
gh label create "area-logging" --repo "$REPO" --color "bfdadc" --description "Related to logging and progress tracking" --force 2>/dev/null || true
gh label create "area-parallel-processing" --repo "$REPO" --color "bfdadc" --description "Related to concurrent episode downloads" --force 2>/dev/null || true

# Issue Categories
echo "📂 Creating Issue Category labels..."
gh label create "stream-extraction" --repo "$REPO" --color "c5def5" --description "Issues with finding or extracting video streams" --force 2>/dev/null || true
gh label create "download-failure" --repo "$REPO" --color "c5def5" --description "Issues with downloading video files" --force 2>/dev/null || true
gh label create "performance" --repo "$REPO" --color "c5def5" --description "Performance or speed issues" --force 2>/dev/null || true
gh label create "reliability" --repo "$REPO" --color "c5def5" --description "Intermittent failures or stability issues" --force 2>/dev/null || true
gh label create "ux-ui" --repo "$REPO" --color "c5def5" --description "User experience or interface improvements" --force 2>/dev/null || true

# Resolution Status
echo "✔️  Creating Resolution Status labels..."
gh label create "wontfix" --repo "$REPO" --color "ffffff" --description "This will not be worked on" --force 2>/dev/null || true
gh label create "duplicate" --repo "$REPO" --color "cfd3d7" --description "This issue already exists" --force 2>/dev/null || true
gh label create "invalid" --repo "$REPO" --color "e4e669" --description "This issue is not valid or off-topic" --force 2>/dev/null || true
gh label create "help-wanted" --repo "$REPO" --color "008672" --description "Extra attention is needed - contributions welcome" --force 2>/dev/null || true
gh label create "good-first-issue" --repo "$REPO" --color "7057ff" --description "Good for newcomers to the project" --force 2>/dev/null || true

# Known Issues
echo "⚠️  Creating Project-Specific labels..."
gh label create "known-issue-multi-episode" --repo "$REPO" --color "fbca04" --description "Related to known multi-episode download reliability issues" --force 2>/dev/null || true

echo ""
echo "✅ All labels created successfully!"
echo ""
echo "View labels at: https://github.com/benjaminmue/HiAni-DL/labels"
