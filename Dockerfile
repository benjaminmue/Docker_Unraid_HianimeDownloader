FROM python:3.11-slim
ENV DEBIAN_FRONTEND=noninteractive PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

# --- system deps + Chrome + ffmpeg -------------------------------------------------
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      wget ca-certificates apt-transport-https \
      ffmpeg fonts-liberation \
      libasound2 libnspr4 libnss3 libx11-6 libxcomposite1 libxcursor1 \
      libxdamage1 libxext6 libxi6 libxrandr2 libxrender1 libxtst6 \
      libglib2.0-0 libdrm2 libgbm1 libu2f-udev xdg-utils \
 && wget -q -O /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
 && apt-get install -y /tmp/chrome.deb || apt-get -f install -y \
 && rm -f /tmp/chrome.deb \
 && rm -rf /var/lib/apt/lists/*

# Non-root app user (PUID/PGID overridable at build)
ARG PUID=1000
ARG PGID=1000
RUN groupadd -g ${PGID} app && useradd -u ${PUID} -g ${PGID} -m app

WORKDIR /app
COPY . /app

# Python deps
RUN pip install --no-cache-dir -r requirements.txt

# Optional: aria2 for yt-dlp --aria
RUN apt-get update && apt-get install -y --no-install-recommends aria2 && rm -rf /var/lib/apt/lists/*

# Volumes
VOLUME ["/downloads", "/config"]

ENV OUTPUT_DIR=/downloads CHROME_EXTRA_ARGS="" PYTHONPATH=/app

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY docker/webgui-entrypoint.sh /app/docker/webgui-entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh /app/docker/webgui-entrypoint.sh && chown -R app:app /app

# Don't set USER here for webgui - entrypoint will handle it
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
