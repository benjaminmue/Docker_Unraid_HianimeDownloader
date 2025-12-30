# Issue Labels Setup

This document explains how to set up the issue labels defined in `labels.yml`.

## Automatic Setup (Recommended)

Use GitHub CLI to create all labels at once:

```bash
# Navigate to repository root
cd /path/to/HiAni-DL

# Install GitHub CLI if not already installed
# https://cli.github.com/

# Authenticate with GitHub
gh auth login

# Create labels from the labels.yml file
# Note: This requires manual parsing or using a label sync action

# Or use this script to create each label individually:
```

## Manual Label Creation Script

Save this as `create-labels.sh` and run it:

```bash
#!/bin/bash

# Issue Types
gh label create "bug" --color "d73a4a" --description "Something isn't working correctly" --force
gh label create "enhancement" --color "a2eeef" --description "New feature or request" --force
gh label create "documentation" --color "0075ca" --description "Improvements or additions to documentation" --force
gh label create "question" --color "d876e3" --description "Further information is requested" --force

# Priority Levels
gh label create "priority-critical" --color "b60205" --description "Critical issue requiring immediate attention" --force
gh label create "priority-high" --color "d93f0b" --description "High priority issue" --force
gh label create "priority-medium" --color "fbca04" --description "Medium priority issue" --force
gh label create "priority-low" --color "0e8a16" --description "Low priority issue" --force

# Status Labels
gh label create "needs-triage" --color "ededed" --description "Issue needs initial review and categorization" --force
gh label create "needs-review" --color "fbca04" --description "Awaiting review from maintainer" --force
gh label create "needs-info" --color "d4c5f9" --description "More information needed from reporter" --force
gh label create "in-progress" --color "1d76db" --description "Currently being worked on" --force
gh label create "blocked" --color "d93f0b" --description "Blocked by external dependency or other issue" --force

# Component Areas
gh label create "area-webgui" --color "bfdadc" --description "Related to web interface and frontend" --force
gh label create "area-download-engine" --color "bfdadc" --description "Related to download logic and stream extraction" --force
gh label create "area-docker" --color "bfdadc" --description "Related to Docker configuration and deployment" --force
gh label create "area-selenium" --color "bfdadc" --description "Related to Selenium browser automation" --force
gh label create "area-logging" --color "bfdadc" --description "Related to logging and progress tracking" --force
gh label create "area-parallel-processing" --color "bfdadc" --description "Related to concurrent episode downloads" --force

# Issue Categories
gh label create "stream-extraction" --color "c5def5" --description "Issues with finding or extracting video streams" --force
gh label create "download-failure" --color "c5def5" --description "Issues with downloading video files" --force
gh label create "performance" --color "c5def5" --description "Performance or speed issues" --force
gh label create "reliability" --color "c5def5" --description "Intermittent failures or stability issues" --force
gh label create "ux-ui" --color "c5def5" --description "User experience or interface improvements" --force

# Resolution Status
gh label create "wontfix" --color "ffffff" --description "This will not be worked on" --force
gh label create "duplicate" --color "cfd3d7" --description "This issue already exists" --force
gh label create "invalid" --color "e4e669" --description "This issue is not valid or off-topic" --force
gh label create "help-wanted" --color "008672" --description "Extra attention is needed - contributions welcome" --force
gh label create "good-first-issue" --color "7057ff" --description "Good for newcomers to the project" --force

# Known Issues
gh label create "known-issue-multi-episode" --color "fbca04" --description "Related to known multi-episode download reliability issues" --force

echo "✅ All labels created successfully!"
```

## Manual Creation via GitHub Web UI

1. Go to: https://github.com/benjaminmue/HiAni-DL/labels
2. Click "New label" for each entry in `labels.yml`
3. Copy the name, color (hex code without #), and description
4. Click "Create label"

## Label Categories

### Issue Types
- **bug** - Something isn't working
- **enhancement** - New features
- **documentation** - Docs improvements
- **question** - Requests for information

### Priority Levels
- **priority-critical** - Immediate attention required
- **priority-high** - Important issues
- **priority-medium** - Standard priority
- **priority-low** - Nice to have

### Status Labels
- **needs-triage** - New issue, needs review
- **needs-review** - Awaiting maintainer review
- **needs-info** - Waiting for more details
- **in-progress** - Being worked on
- **blocked** - Waiting on dependency

### Component Areas
- **area-webgui** - Web interface
- **area-download-engine** - Download logic
- **area-docker** - Container/deployment
- **area-selenium** - Browser automation
- **area-logging** - Logging system
- **area-parallel-processing** - Concurrent downloads

### Issue Categories
- **stream-extraction** - Stream finding issues
- **download-failure** - Download problems
- **performance** - Speed/efficiency
- **reliability** - Stability issues
- **ux-ui** - User experience

### Resolution Status
- **wontfix** - Will not address
- **duplicate** - Already reported
- **invalid** - Not valid issue
- **help-wanted** - Community contributions welcome
- **good-first-issue** - Good for newcomers

### Project-Specific
- **known-issue-multi-episode** - Multi-episode download problems

## Using Labels

### For Bug Reports
Start with: `bug`, `needs-triage`, then add:
- Priority: `priority-*`
- Area: `area-*`
- Category: `stream-extraction`, `download-failure`, etc.

### For Feature Requests
Start with: `enhancement`, `needs-review`, then add:
- Area: `area-*`
- Category: `ux-ui`, `performance`, etc.

### Lifecycle Example
1. **New Issue**: `bug` + `needs-triage`
2. **After Triage**: Add `priority-high` + `area-selenium` + `stream-extraction`
3. **Working On It**: Add `in-progress`
4. **Completed**: Close issue (labels remain for reference)
