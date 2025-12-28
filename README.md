<div align="center">
  <img src="logo.svg" alt="GDownloader Logo" width="200" height="200">

  # GDownloader

  ### Docker & Unraid Media Downloader with Web Interface

  ![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)
  ![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-green)

  **Download anime from HiAnime.to and media from social platforms**
  **Now with a modern web interface for easy management**

</div>

---

## 📖 Overview

GDownloader is a powerful media downloader designed for Docker and Unraid environments. It provides both a command-line interface and a modern web-based GUI for downloading content from HiAnime.to and various social media platforms (YouTube, TikTok, Instagram, etc.).

**Key Features:**
- 🌐 **Web Interface** - Modern Bootstrap UI for managing downloads
- 🐳 **Docker-Ready** - Fully containerized with Chrome and ffmpeg included
- 🔒 **Secure** - URL allowlist, optional authentication, SSRF protection
- 📊 **Real-time Progress** - Live logs and progress tracking via Server-Sent Events
- 🎯 **Background Processing** - Downloads continue after closing browser
- 🎬 **Anime Downloads** - Full support for HiAnime.to (episodes, seasons, ranges)
- 📱 **Social Media** - Download from YouTube, TikTok, Instagram, and more
- 🔧 **Unraid Support** - PUID/PGID mapping and community app integration

> ⚠️ **Warning:**
> This project currently contains **known issues** that are being investigated.
> Some downloads may fail (e.g., `.m3u8` streams not detected correctly) or Chrome sessions may not start reliably.
> Please check the Issues tab or follow project updates before using in production.

---

## 🚀 Quick Start

### WebGUI (Recommended)

```bash
# Clone the repository
git clone https://github.com/benjaminmue/Docker_Unraid_HianimeDownloader.git
cd Docker_Unraid_HianimeDownloader

# Start the web interface
./webgui-start.sh

# Access at http://localhost:8080
```

### CLI Mode

```bash
# Use docker-compose
docker-compose up -d hianime-cli

# Or run directly
./docker-start.sh
```

---

## 🌐 WebGUI (New!)

GDownloader now includes a web interface for easier download management:

```bash
# Quick start
./webgui-start.sh

# Or manually with docker-compose
docker-compose up -d hianime-webgui

# Access at http://localhost:8080
```

**Key Features:**
- 📝 Submit downloads via web form
- 📊 Monitor progress with live updates (Server-Sent Events)
- 📜 View job history and detailed logs
- ❌ Cancel running jobs
- 📦 Download diagnostics bundles

**Security Features:**
- 🔒 URL allowlist (domain filtering)
- 🛡️ SSRF protection (blocks private IPs)
- 🔐 Optional basic authentication
- ✅ Input validation and sanitization
- 🚫 Command injection prevention
- 🔍 SQL injection prevention
- 🗂️ Path traversal protection

📖 **Documentation:**
- **[Full WebGUI Guide](WEBGUI.md)** - Setup and usage
- **[Security Documentation](SECURITY.md)** - Security features and best practices

---

## 🧰 Requirements (if running without Docker)

- Python 3.10+ and `pip`
- Google Chrome installed
- Optional: VPN with ad-blocking (to prevent redirect ads)
- Dependencies from `requirements.txt`

### Setup (Manual / Local)
```bash
git clone https://github.com/benjaminmue/Docker_Unraid_HianimeDownloader.git
cd Docker_Unraid_HianimeDownloader
pip install -r requirements.txt
python3 main.py
