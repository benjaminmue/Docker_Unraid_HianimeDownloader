<div align="center">
  <img src="logo.svg" alt="HiAni DL Logo" width="200" height="200">

  # <span style="color: #FF9BCF">HiAni DL</span>

  ### Anime Downloader with Modern Web Interface

  ![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)
  ![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-green)

  **Download anime from HiAnime.to with a beautiful dark-themed web interface**

</div>

---

## 📖 What is HiAni DL?

HiAni DL is a **Docker-only** anime downloader designed for **local network (LAN) use**. It features a modern web interface with real-time progress tracking and background processing.

> 🏠 **LAN-Only Deployment**
> This application is designed for **private home networks only**. Never expose it directly to the internet without proper security measures.

> 🐳 **Docker Required**
> HiAni DL **only runs in Docker** - no standalone Python installation is supported. All dependencies, Chrome, and ffmpeg are included in the Docker image.

**Key Features:**
- 🌐 **Modern Web Interface** - Dark theme inspired by HiAnime.to
- 🎬 **Full Anime Support** - Episodes, seasons, and ranges
- 📊 **Real-time Progress** - Live updates via Server-Sent Events
- 🎯 **Background Downloads** - Continue after closing browser
- 🐳 **Docker-Ready** - Chrome and ffmpeg included
- 🔧 **Unraid Support** - PUID/PGID mapping

---

## 🚀 Quick Start

**New to Docker or HiAni DL?** Follow our step-by-step guide:

<div align="center">

### **[📘 Complete Quick Start Guide](docs/QUICKSTART.md)**

Walks you through:

✅ Installing Docker (Windows/Mac/Linux)

✅ Creating your docker-compose.yml

✅ Starting the container

✅ Your first download

**Takes ~10 minutes to get up and running!**

</div>

---

**Already have Docker?** Here's the express version:

```bash
# Create docker-compose.yml with your paths and timezone
docker-compose up -d

# Access WebGUI at http://localhost:8080
```

See the [Quick Start Guide](docs/QUICKSTART.md) for the complete docker-compose.yml template.

> 💡 **Pre-built Image:** The Docker image is automatically built and published to GitHub Container Registry as `ghcr.io/benjaminmue/hiani-dl:latest` on every commit to main.

---

## 📚 Documentation

<div align="center">

| Document | Description |
|----------|-------------|
| **[Quick Start Guide](docs/QUICKSTART.md)** | Complete installation guide from Docker setup to first download |
| **[User Guide](docs/USER_GUIDE.md)** | How to use HiAni DL, select URLs, and manage downloads |
| **[Docker Setup](docs/DOCKER.md)** | Environment variables, volumes, and configuration |
| **[WebGUI Guide](docs/WEBGUI.md)** | Web interface features and usage |
| **[Arguments Reference](docs/ARGS.md)** | Command-line arguments and options |
| **[Security](docs/SECURITY.md)** | Security features and deployment guidance |

</div>

---

## 📸 Screenshots

<div align="center">

| Web Interface | Available Arguments |
|---------------|---------------------|
| ![WebGUI](docs/img/startpage.png) | ![Arguments](docs/img/startpage-availableOptionalArguments.png) |

| Job Progress | Job List |
|--------------|----------|
| ![Progress](docs/img/job-detailPage.png) | ![Jobs](docs/img/jobs.png) |

</div>

---

## ⚡ Features

### Web Interface
- 📝 Submit downloads via web form
- 📊 Monitor progress with live updates
- 📜 View job history and detailed logs
- ❌ Cancel running jobs
- 🎨 Beautiful dark theme inspired by HiAnime.to

### Download Options
- Single episodes or full seasons
- Episode range selection (e.g., episodes 1-12)
- Sub or dub selection
- Custom output directory
- Server selection (HD-1, HD-2, Vidstreaming)

### Technical
- Aria2c integration for fast downloads
- Chrome automation with Selenium
- SQLite job database
- Server-Sent Events for real-time updates
- Automatic retry on failure

---

## 🔧 Configuration

**The WebGUI is the default mode and starts automatically with `docker-compose up -d`.**

### Basic Setup (LAN Use)

The default `docker-compose.yml` is pre-configured for home/LAN use:

```yaml
services:
  hianime-webgui:  # Starts automatically (no profile needed)
    image: hianime-downloader
    ports:
      - "8080:8080"
    volumes:
      - /path/to/downloads:/downloads
      - hianime-config:/config
    environment:
      TZ: Europe/Zurich
      URL_ALLOWLIST: "hianime.to"  # Optional for home use
```

### Optional Security

```yaml
environment:
  WEB_USER: admin              # Optional: Enable authentication
  WEB_PASSWORD: your-password  # Optional: Set password
```

### CLI Mode (Advanced)

CLI mode is available but **requires explicit activation**:

```bash
docker-compose --profile cli up -d hianime-downloader
```

See **[Docker Setup](docs/DOCKER.md)** for complete configuration options.

---

## 📜 Origin

This project is a **disconnected fork** of [HianimeDownloader](https://github.com/gheatherington/HianimeDownloader) by gheatherington. It has diverged significantly with:
- Docker and Unraid support
- Modern web interface with dark theme
- Real-time progress tracking
- Enhanced security features
- Comprehensive documentation

---

## ⚠️ Disclaimer

- **For personal use only** - Respect copyright laws in your region
- **LAN deployment only** - Not designed for public internet exposure
- **No warranty** - Use at your own risk
- **Known issues** - Some downloads may fail (check Issues tab)

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

<div align="center">

**Made with ❤️ for the anime community**

[Report Bug](https://github.com/benjaminmue/HiAni-DL/issues) · [Request Feature](https://github.com/benjaminmue/HiAni-DL/issues) · [Documentation](docs/)

</div>
