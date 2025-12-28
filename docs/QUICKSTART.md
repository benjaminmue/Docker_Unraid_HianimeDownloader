# <span style="color: #FF9BCF">Quick Start Guide</span>

Complete guide to get HiAni DL up and running in minutes - from Docker installation to your first download.

---

## <span style="color: #FF9BCF">Prerequisites</span>

### Step 1: Install Docker

HiAni DL requires Docker to be installed on your system.

**Choose your operating system:**

<details>
<summary><b>🪟 Windows</b></summary>

1. Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
2. Run the installer and follow the prompts
3. Restart your computer when prompted
4. Launch Docker Desktop from the Start menu
5. Wait for Docker to start (you'll see the Docker icon in the system tray)

**Verify installation:**
```powershell
docker --version
docker-compose --version
```
</details>

<details>
<summary><b>🍎 macOS</b></summary>

1. Download [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
2. Open the `.dmg` file and drag Docker to Applications
3. Launch Docker from Applications
4. Grant necessary permissions when prompted
5. Wait for Docker to start (you'll see the Docker icon in the menu bar)

**Verify installation:**
```bash
docker --version
docker-compose --version
```
</details>

<details>
<summary><b>🐧 Linux</b></summary>

**Ubuntu/Debian:**
```bash
# Update package index
sudo apt update

# Install Docker
sudo apt install docker.io docker-compose -y

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (logout/login required)
sudo usermod -aG docker $USER
```

**Other distributions:** See [Docker Installation Guide](https://docs.docker.com/engine/install/)

**Verify installation:**
```bash
docker --version
docker-compose --version
```
</details>

---

## <span style="color: #FF9BCF">Installation</span>

### Step 2: Create Project Directory

Create a folder for HiAni DL configuration:

**Windows (PowerShell):**
```powershell
# Create directory
mkdir C:\HiAni-DL
cd C:\HiAni-DL
```

**macOS/Linux:**
```bash
# Create directory
mkdir -p ~/hiani-dl
cd ~/hiani-dl
```

### Step 3: Create docker-compose.yml

Create a file named `docker-compose.yml` in your HiAni-DL folder with the following content:

**Windows Example:**
```yaml
version: '3.8'

services:
  hianime-webgui:
    image: ghcr.io/benjaminmue/hiani-dl:latest
    container_name: hianime-webgui
    environment:
      # Your timezone - see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
      TZ: America/New_York

      # Web interface port
      WEB_PORT: 8080

      # Optional: Limit to specific domains (recommended)
      URL_ALLOWLIST: "hianime.to"

      # Optional: Enable password protection (uncomment to use)
      # WEB_USER: admin
      # WEB_PASSWORD: your-secure-password

    volumes:
      # Downloaded anime files - Windows path example
      - C:/Users/YourUsername/Downloads/Anime:/downloads

      # Persistent configuration and database
      - hianime-config:/config

    ports:
      - "8080:8080"

    restart: unless-stopped

volumes:
  hianime-config:
    driver: local
```

**macOS/Linux Example:**
```yaml
version: '3.8'

services:
  hianime-webgui:
    image: ghcr.io/benjaminmue/hiani-dl:latest
    container_name: hianime-webgui
    environment:
      # Your timezone - see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
      TZ: Europe/London

      # Web interface port
      WEB_PORT: 8080

      # Optional: Limit to specific domains (recommended)
      URL_ALLOWLIST: "hianime.to"

      # Optional: Enable password protection (uncomment to use)
      # WEB_USER: admin
      # WEB_PASSWORD: your-secure-password

    volumes:
      # Downloaded anime files - Linux/Mac path example
      - /home/username/Downloads/Anime:/downloads
      # Or for macOS: /Users/username/Downloads/Anime:/downloads

      # Persistent configuration and database
      - hianime-config:/config

    ports:
      - "8080:8080"

    restart: unless-stopped

volumes:
  hianime-config:
    driver: local
```

### Step 4: Customize Configuration

**Required Changes:**

1. **Download Path** - Change the volume path to where you want anime downloaded:
   - Windows: `C:/Users/YourUsername/Downloads/Anime:/downloads`
   - macOS: `/Users/yourusername/Downloads/Anime:/downloads`
   - Linux: `/home/yourusername/Downloads/Anime:/downloads`

2. **Timezone** - Set your timezone (examples):
   - `America/New_York` (US East Coast)
   - `America/Los_Angeles` (US West Coast)
   - `Europe/London` (UK)
   - `Europe/Paris` (Central Europe)
   - `Asia/Tokyo` (Japan)
   - Full list: [Timezone Database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

**Optional Changes:**

3. **Port** - If port 8080 is already in use, change it:
   ```yaml
   ports:
     - "8081:8080"  # Access at http://localhost:8081
   ```

4. **Authentication** - For shared networks, uncomment and set:
   ```yaml
   WEB_USER: admin
   WEB_PASSWORD: your-secure-password
   ```

---

## <span style="color: #FF9BCF">Starting HiAni DL</span>

### Step 5: Create Download Directory

Create the folder where anime will be downloaded:

**Windows:**
```powershell
mkdir C:\Users\YourUsername\Downloads\Anime
```

**macOS/Linux:**
```bash
mkdir -p ~/Downloads/Anime
```

### Step 6: Start the Container

Navigate to your HiAni-DL folder and start the container:

**All Platforms:**
```bash
docker-compose up -d
```

**What happens:**
- Docker downloads the HiAni DL image (first time only, ~2-3 minutes)
- Container starts automatically
- WebGUI becomes available at `http://localhost:8080`

**Check Status:**
```bash
# View running containers
docker ps

# View logs
docker-compose logs -f
```

You should see output similar to:
```
✓ Container hianime-webgui  Started
```

---

## <span style="color: #FF9BCF">First Download</span>

### Step 7: Access the WebGUI

1. **Open your browser** and navigate to:
   ```
   http://localhost:8080
   ```

2. **You should see** the HiAni DL interface with a dark theme

3. **If you enabled authentication**, enter your username and password

### Step 8: Download Your First Anime

1. **Find an anime** on [HiAnime.to](https://hianime.to)

2. **Copy the URL**, for example:
   ```
   https://hianime.to/watch/frieren-beyond-journeys-end-18542
   ```

3. **In the WebGUI**, paste the URL into the "Media URL" field

4. **Configure download** (all optional):
   - Output Profile: `Subtitle` or `Dubbed`
   - Episode From: `1`
   - Episode To: `12`
   - Season: `1`

5. **Click "Start Download"**

6. **Monitor progress** in real-time on the Jobs page

7. **Find your files** in the download directory you configured:
   - Windows: `C:\Users\YourUsername\Downloads\Anime`
   - macOS/Linux: `~/Downloads/Anime`

---

## <span style="color: #FF9BCF">Common Commands</span>

### Managing the Container

```bash
# Start HiAni DL
docker-compose up -d

# Stop HiAni DL
docker-compose down

# Restart HiAni DL
docker-compose restart

# View logs
docker-compose logs -f

# Update to latest version
docker-compose pull
docker-compose up -d

# Stop and remove (keeps downloaded files and database)
docker-compose down
```

### Accessing from Other Devices on Your Network

If you want to access the WebGUI from other devices (phone, tablet, another computer):

1. **Find your computer's IP address:**
   - Windows: `ipconfig` (look for IPv4 Address)
   - macOS/Linux: `ifconfig` or `ip addr` (look for inet)

2. **Access from other device:**
   ```
   http://192.168.1.100:8080
   ```
   (Replace `192.168.1.100` with your actual IP address)

---

## <span style="color: #FF9BCF">Troubleshooting</span>

### WebGUI Not Loading

**Check if container is running:**
```bash
docker ps
```

If not listed, start it:
```bash
docker-compose up -d
```

**Check logs for errors:**
```bash
docker-compose logs
```

### Port Already in Use

If you see "port is already allocated":

1. Edit `docker-compose.yml`
2. Change the port mapping:
   ```yaml
   ports:
     - "8081:8080"  # Changed from 8080 to 8081
   ```
3. Restart:
   ```bash
   docker-compose down
   docker-compose up -d
   ```
4. Access at `http://localhost:8081`

### Download Directory Not Found

**Ensure the directory exists:**

**Windows:**
```powershell
mkdir C:\Users\YourUsername\Downloads\Anime
```

**macOS/Linux:**
```bash
mkdir -p ~/Downloads/Anime
```

**Check permissions:**

On Linux/macOS, ensure the directory is writable:
```bash
chmod 755 ~/Downloads/Anime
```

### Container Keeps Restarting

**View logs to see the error:**
```bash
docker-compose logs
```

**Common issues:**
- Invalid path in volumes
- Port conflict
- Insufficient disk space

---

## <span style="color: #FF9BCF">Next Steps</span>

✅ **You're all set!** HiAni DL is now running.

**Learn More:**
- **[User Guide](USER_GUIDE.md)** - Detailed usage instructions and URL formats
- **[Docker Configuration](DOCKER.md)** - Advanced environment variables and options
- **[Arguments Reference](ARGS.md)** - Command-line arguments for downloads
- **[Security Guide](SECURITY.md)** - Securing your deployment

**Need Help?**
- [GitHub Issues](https://github.com/benjaminmue/HiAni-DL/issues) - Report bugs or request features
- Check the logs: `docker-compose logs -f`

---

## <span style="color: #FF9BCF">Quick Reference</span>

### Example docker-compose.yml (Copy & Paste)

```yaml
version: '3.8'

services:
  hianime-webgui:
    image: ghcr.io/benjaminmue/hiani-dl:latest
    container_name: hianime-webgui
    environment:
      TZ: America/New_York
      WEB_PORT: 8080
      URL_ALLOWLIST: "hianime.to"
    volumes:
      - /path/to/downloads:/downloads
      - hianime-config:/config
    ports:
      - "8080:8080"
    restart: unless-stopped

volumes:
  hianime-config:
```

**Remember to change:**
- `/path/to/downloads` → Your actual download path
- `America/New_York` → Your timezone

---

<div align="center">

**Happy Downloading! 🎬**

[Back to Main Documentation](../README.md)

</div>
