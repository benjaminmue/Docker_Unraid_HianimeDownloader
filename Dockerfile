FROM python:3.11-slim
ENV DEBIAN_FRONTEND=noninteractive PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

# Chrome + ffmpeg + runtime libs
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl gnupg ca-certificates apt-transport-https \
    ffmpeg fonts-liberation libasound2 libnspr4 libnss3 libx11-6 libxcomposite1 libxcursor1 \
    libxdamage1 libxext6 libxi6 libxrandr2 libxrender1 libxtst6 libglib2.0-0 libdrm2 libgbm1 \
    libu2f-udev xdg-utils \
 && mkdir -p /etc/apt/keyrings \
 && curl -fsSL https://dl.google.com/linux/linux-signing-key.pub | gpg --dearmor -o /etc/apt/keyrings/google.gpg \
 && echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/google.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
    > /etc/apt/sources.list.d/google-chrome.list \
 && apt-get update && apt-get install -y --no-install-recommends google-chrome-stable \
 && apt-get purge -y curl gnupg && rm -rf /var/lib/apt/lists/*

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
RUN chmod +x /usr/local/bin/entrypoint.sh && chown -R app:app /app

USER app
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
