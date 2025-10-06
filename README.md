> ⚠️ **Warning:**  
> This project currently contains **known issues** that are being investigated.  
> Some downloads may fail (e.g., `.m3u8` streams not detected correctly) or Chrome sessions may not start reliably.  
> Please check the Issues tab or follow project updates before using in production.

# GDownloader (HiAnime Downloader – Docker & Unraid Edition)

A simple CLI tool for downloading anime from [HiAnime.to](https://hianime.to) and media from various social platforms.

> 💡 This fork adds full **Docker** and **Unraid** support with a self-contained Chrome + ffmpeg environment.
> You can now run it headless, interactively, or fully automated through Unraid variables.

---

## 📦 Features

- Download anime from **HiAnime.to** (sub/dub, by range, by season)
- Download videos from social platforms (TikTok, YouTube, Instagram, etc.)
- Fully automated **Docker image** with:
  - Google Chrome preinstalled
  - ffmpeg
  - Non-root PUID/PGID support for Unraid
  - Configurable with environment variables (no manual input needed)

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
