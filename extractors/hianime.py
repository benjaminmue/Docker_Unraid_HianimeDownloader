import json
import os
import sys
import time
import shlex
import threading
import tempfile
from argparse import Namespace
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import asdict, dataclass
from glob import glob
from typing import Any
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup, Tag
from colorama import Fore
from langdetect import detect as detect_lang
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium_stealth import stealth
from seleniumwire import webdriver
from selenium.webdriver.chrome.service import Service
from yt_dlp import YoutubeDL

from tools.functions import get_conformation, get_int_in_range, safe_remove
from tools.YTDLogger import YTDLogger

# Thread-safe print lock for parallel processing
print_lock = threading.Lock()

# Whitelist of allowed Chrome arguments for CHROME_EXTRA_ARGS
ALLOWED_CHROME_ARGS = {
    '--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
    '--disable-blink-features', '--disable-features', '--enable-features',
    '--window-size', '--user-agent', '--disable-extensions', '--disable-popup-blocking',
    '--disable-infobars', '--disable-notifications', '--mute-audio',
    '--autoplay-policy', '--disable-web-security', '--lang', '--proxy-server',
    '--user-data-dir', '--profile-directory', '--disable-background-networking',
    '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows',
    '--disable-renderer-backgrounding', '--disable-hang-monitor', '--disable-sync',
    '--metrics-recording-only', '--safebrowsing-disable-auto-update',
    '--password-store', '--use-mock-keychain', '--force-device-scale-factor',
    '--high-dpi-support', '--force-color-profile', '--enable-logging', '--log-level',
    '--v', '--vmodule', '--enable-automation', '--remote-debugging-port'
}


def validate_chrome_args(args_string: str) -> list[str]:
    """
    Validate and parse Chrome arguments from environment variable.

    Args:
        args_string: Space-separated Chrome arguments

    Returns:
        List of validated arguments

    Raises:
        ValueError: If arguments contain invalid flags or shell metacharacters
    """
    if not args_string or not args_string.strip():
        return []

    # Check for dangerous shell metacharacters
    dangerous_chars = [';', '|', '&', '`', '$', '(', ')', '<', '>', '\n', '\r']
    if any(char in args_string for char in dangerous_chars):
        print(f"{Fore.LIGHTRED_EX}Warning: CHROME_EXTRA_ARGS contains dangerous characters, ignoring.")
        return []

    # Parse safely using shlex
    try:
        parts = shlex.split(args_string)
    except ValueError as e:
        print(f"{Fore.LIGHTRED_EX}Warning: Invalid CHROME_EXTRA_ARGS format: {e}, ignoring.")
        return []

    validated = []
    for arg in parts:
        # Extract base argument (before = sign)
        base_arg = arg.split('=')[0] if '=' in arg else arg

        # Check if it's a Chrome argument (starts with --)
        if not base_arg.startswith('--'):
            print(f"{Fore.LIGHTRED_EX}Warning: Invalid Chrome arg '{base_arg}' (must start with --), skipping.")
            continue

        # Check against whitelist
        if base_arg not in ALLOWED_CHROME_ARGS:
            print(f"{Fore.LIGHTYELLOW_EX}Warning: Chrome arg '{base_arg}' not in whitelist, skipping.")
            continue

        validated.append(arg)

    return validated


@dataclass
class Anime:
    name: str
    url: str
    sub_episodes: int
    dub_episodes: int
    download_type: str = ""
    season_number: int = -1


class HianimeExtractor:
    def __init__(self, args: Namespace, name: str | None = None) -> None:
        self.args: Namespace = args

        self.link = self.args.link
        self.name = name

        self.HEADERS: dict[str, str] = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/123 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
            "Accept-Encoding": "identity",
            "Accept-Language": "en-US,en;q=0.8",
            "Connection": "keep-alive",
        }
        self.URL: str = "https://hianime.to"
        self.ENCODING = "utf-8"
        self.SUBTITLE_LANG: str = "en"
        self.OTHER_LANGS: list[str] = [
            "ita", "jpn", "pol", "por", "ara", "chi", "cze", "dan", "dut", "fin",
            "fre", "ger", "gre", "heb", "hun", "ind", "kor", "nob", "rum", "rus",
            "tha", "vie", "swe", "spa", "tur", "ces", "bul", "zho", "nld", "fra",
            "deu", "ell", "hin", "hrv", "msa", "may", "ron", "slk", "slo", "ukr",
        ]
        # make it a little more patient
        self.DOWNLOAD_ATTEMPT_CAP: int = 60
        self.DOWNLOAD_REFRESH: tuple[int, int] = (20, 40)
        self.BAD_TITLE_CHARS: list[str] = [
            "-", ".", "/", "\\", "?", "%", "*", "<", ">", "|", '"', "[", "]", ":",
        ]
        self.TITLE_TRANS: dict[int, Any] = str.maketrans("", "", "".join(self.BAD_TITLE_CHARS))

        # holders
        self.captured_video_urls: list[str] = []
        self.captured_subtitle_urls: list[str] = []

    def process_single_episode(self, episode: dict, anime: Anime, folder: str) -> dict:
        """
        Process a single episode: find stream, download video and subtitles.
        Designed for parallel execution - each episode runs in its own thread with its own driver.

        Args:
            episode: Episode dict with url, number, title
            anime: Anime metadata
            folder: Output folder path

        Returns:
            Updated episode dict with media URLs and download status
        """
        url = episode["url"]
        number = episode["number"]
        title = episode["title"]

        driver = None
        try:
            # Thread-safe output
            with print_lock:
                print(
                    Fore.LIGHTGREEN_EX
                    + "Getting"
                    + Fore.LIGHTWHITE_EX
                    + f" Episode {number} - {title} from {url}"
                    + Fore.LIGHTWHITE_EX
                )

            # Create dedicated driver for this episode
            driver = self.create_driver()

            # Navigate and find stream
            driver.requests.clear()
            driver.get(url)
            driver.execute_script("window.focus();")

            # Aggressive player initialization to trigger stream loading
            time.sleep(2)

            # Scroll to trigger lazy-loaded players
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight / 2);")
            time.sleep(0.5)

            try:
                # Try multiple times with delays to handle async player loading
                for attempt in range(3):
                    iframes = driver.find_elements(By.TAG_NAME, "iframe")
                    if iframes:
                        driver.switch_to.frame(iframes[0])
                        driver.execute_script("window.scrollTo(0, document.body.scrollHeight / 2);")

                    # Extended selector list for different player types
                    selectors = [
                        "button.jw-icon-play",
                        ".vjs-big-play-button",
                        ".plyr__control--overlaid",
                        "button[aria-label*='play' i]",
                        "button[aria-label*='Play' i]",
                        ".play-button",
                        "video"
                    ]

                    clicked = False
                    for sel in selectors:
                        els = driver.find_elements(By.CSS_SELECTOR, sel)
                        if els:
                            try:
                                driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", els[0])
                                time.sleep(0.3)
                                els[0].click()
                                clicked = True
                                with print_lock:
                                    print(f"{Fore.LIGHTYELLOW_EX}Clicked play button: {sel}")
                                break
                            except Exception:
                                try:
                                    driver.execute_script("arguments[0].click();", els[0])
                                    clicked = True
                                    with print_lock:
                                        print(f"{Fore.LIGHTYELLOW_EX}JS clicked play button: {sel}")
                                    break
                                except Exception:
                                    pass

                    # Always try to programmatically play video too
                    driver.execute_script("""
                        const videos = document.querySelectorAll('video');
                        videos.forEach(v => {
                            try {
                                v.muted = true;
                                v.play();
                            } catch(e) {}
                        });
                    """)

                    if clicked or attempt > 0:
                        break

                    time.sleep(1)

            finally:
                driver.switch_to.default_content()

            # Capture media requests using driver-specific method
            media_requests = self.capture_media_requests_from_driver(driver)

            if not media_requests:
                with print_lock:
                    print(f"{Fore.LIGHTRED_EX}Episode {number}: No m3u8 file found, skipping download")
                episode["status"] = "failed"
                episode["error"] = "No stream found"
                return episode

            episode.update(media_requests)
            episode["status"] = "stream_found"

        except Exception as e:
            with print_lock:
                print(f"{Fore.LIGHTRED_EX}Episode {number}: Error finding stream: {e}")
            episode["status"] = "failed"
            episode["error"] = str(e)
            return episode
        finally:
            # Clean up driver
            if driver:
                try:
                    driver.quit()
                except Exception:
                    pass

        # Download video immediately after finding stream
        try:
            name = f"{anime.name} - s{anime.season_number:02}e{number:02} - {title}"
            m3u8_url = episode.get("m3u8")
            headers = episode.get("headers") or {}

            if not m3u8_url:
                with print_lock:
                    print(f"{Fore.LIGHTRED_EX}Episode {number}: No M3U8 URL found")
                episode["status"] = "failed"
                return episode

            with print_lock:
                print(f"{Fore.LIGHTCYAN_EX}Episode {number}: Starting download...")

            result = self.yt_dlp_download(
                self.look_for_variants(m3u8_url, headers),
                headers,
                f"{folder}{name}.mp4",
            )

            if not result:
                episode["status"] = "failed"
                episode["error"] = "Download failed"
                return episode

            # Download subtitles if available
            vtt_url = episode.get("vtt")
            if vtt_url:
                self.yt_dlp_download(vtt_url, headers, f"{folder}{name}.vtt")
            elif not self.args.no_subtitles:
                with print_lock:
                    print(f"{Fore.LIGHTYELLOW_EX}Episode {number}: No VTT stream found")

            episode["status"] = "completed"
            with print_lock:
                print(f"{Fore.LIGHTGREEN_EX}Episode {number}: Download completed!")

        except Exception as e:
            with print_lock:
                print(f"{Fore.LIGHTRED_EX}Episode {number}: Download error: {e}")
            episode["status"] = "failed"
            episode["error"] = str(e)

        return episode

    def run(self):
        anime: Anime | None = (
            self.get_anime_from_link(self.link)
            if self.link
            else (self.get_anime(self.name) if self.name else self.get_anime())
        )
        if not anime:
            return

        print(
            Fore.LIGHTGREEN_EX
            + "\nYou have chosen "
            + Fore.LIGHTBLUE_EX
            + anime.name
            + Fore.LIGHTGREEN_EX
            + f"\nURL: {Fore.LIGHTBLUE_EX}{anime.url}{Fore.LIGHTGREEN_EX}"
            + "\nSub Episodes: "
            + Fore.LIGHTYELLOW_EX
            + str(anime.sub_episodes)
            + Fore.LIGHTGREEN_EX
            + "\nDub Episodes: "
            + Fore.LIGHTYELLOW_EX
            + str(anime.dub_episodes)
            + Fore.LIGHTCYAN_EX
        )

        if anime.sub_episodes != 0 and anime.dub_episodes != 0:
            # Check if download_type was already specified via command line
            if hasattr(self.args, 'download_type') and self.args.download_type:
                anime.download_type = self.args.download_type
                print(f"Using download type from command line: {anime.download_type}")
            # Default to 'sub' in non-interactive mode
            elif not sys.stdin.isatty():
                anime.download_type = "sub"
                print(f"Defaulting to download type 'sub' (non-interactive mode)")
            else:
                anime.download_type = self.get_download_type()
        elif anime.dub_episodes == 0:
            print("Dub episodes are not available. Defaulting to sub.")
            anime.download_type = "sub"
        else:
            print("Sub episodes are not available. Defaulting to dub.")
            anime.download_type = "dub"

        number_of_episodes = getattr(anime, f"{anime.download_type}_episodes")
        if number_of_episodes != 1:
            # Check if episode range was provided via command line
            if hasattr(self.args, 'ep_from') and self.args.ep_from is not None:
                start_ep = self.args.ep_from
                print(f"Using starting episode from command line: {start_ep}")
            else:
                # Default to episode 1 in non-interactive mode
                if sys.stdin.isatty():
                    start_ep = get_int_in_range(
                        f"{Fore.LIGHTCYAN_EX}Enter the starting episode number (inclusive):{Fore.LIGHTYELLOW_EX} ",
                        1, number_of_episodes,
                    )
                else:
                    start_ep = 1
                    print(f"Defaulting to starting episode: {start_ep}")

            if hasattr(self.args, 'ep_to') and self.args.ep_to is not None:
                end_ep = self.args.ep_to
                print(f"Using ending episode from command line: {end_ep}")
            else:
                # Default to all episodes in non-interactive mode
                if sys.stdin.isatty():
                    end_ep = get_int_in_range(
                        f"{Fore.LIGHTCYAN_EX}Enter the ending episode number (inclusive):{Fore.LIGHTYELLOW_EX} ",
                        1, number_of_episodes,
                    )
                else:
                    end_ep = number_of_episodes
                    print(f"Defaulting to ending episode: {end_ep}")
        else:
            start_ep = 1
            end_ep = 1

        # Check if season was provided via command line
        if hasattr(self.args, 'season') and self.args.season is not None:
            anime.season_number = self.args.season
            print(f"Using season number from command line: {anime.season_number}")
        else:
            # Default to season 1 if not specified (most common case)
            anime.season_number = 1
            print(f"Defaulting to season number: {anime.season_number}")

        # Create temporary driver to get episode URLs and server button
        print(f"{Fore.LIGHTCYAN_EX}Initializing browser to fetch episode list...")
        self.configure_driver()
        self.driver.get(anime.url)
        button: WebElement = self.find_server_button(anime)  # type: ignore

        try:
            button.click()
        except Exception as e:
            print(f"{Fore.LIGHTRED_EX}Error clicking server button:\n\n{Fore.LIGHTWHITE_EX}{e}")

        episode_list: list[dict] = self.get_episode_urls(self.driver.page_source, start_ep, end_ep)
        self.driver.quit()  # Close initial driver, parallel processing will create new ones

        # Create output folder
        folder = (
            os.path.abspath(self.args.output_dir)
            + os.sep
            + anime.name
            + f" ({anime.download_type[0].upper()}{anime.download_type[1:]}){os.sep}"
        )
        os.makedirs(folder, exist_ok=True)

        print(f"\n{Fore.LIGHTGREEN_EX}Starting parallel processing of {len(episode_list)} episodes...")
        print(f"{Fore.LIGHTCYAN_EX}Max concurrent operations: 3")
        print()

        # Process episodes in parallel with limit of 3 concurrent operations
        max_workers = 3
        completed_episodes = []

        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            # Submit all episodes for processing
            future_to_episode = {
                executor.submit(self.process_single_episode, episode, anime, folder): episode
                for episode in episode_list
            }

            # Process results as they complete
            for future in as_completed(future_to_episode):
                episode = future_to_episode[future]
                try:
                    result = future.result()
                    completed_episodes.append(result)
                except Exception as e:
                    with print_lock:
                        print(f"{Fore.LIGHTRED_EX}Episode {episode['number']} failed with exception: {e}")
                    episode["status"] = "failed"
                    episode["error"] = str(e)
                    completed_episodes.append(episode)

        # Save metadata JSON with results
        with open(f"{folder}{anime.name} (Season {anime.season_number}).json", "w") as json_file:
            json.dump({**asdict(anime), "episodes": completed_episodes}, json_file, indent=4)

        # Summary
        success_count = sum(1 for ep in completed_episodes if ep.get("status") == "completed")
        failed_count = len(completed_episodes) - success_count

        print()
        print(f"{Fore.LIGHTGREEN_EX}{'='*60}")
        print(f"{Fore.LIGHTGREEN_EX}Download Summary:")
        print(f"{Fore.LIGHTGREEN_EX}  Total episodes: {len(completed_episodes)}")
        print(f"{Fore.LIGHTGREEN_EX}  Successful: {success_count}")
        if failed_count > 0:
            print(f"{Fore.LIGHTRED_EX}  Failed: {failed_count}")
        print(f"{Fore.LIGHTGREEN_EX}{'='*60}")

    def download_streams(self, anime: Anime, episodes: list[dict[str, Any]]):
        folder = (
            os.path.abspath(self.args.output_dir)
            + os.sep
            + anime.name
            + f" ({anime.download_type[0].upper()}{anime.download_type[1:]}){os.sep}"
        )
        os.makedirs(folder, exist_ok=True)

        with open(f"{folder}{anime.name} (Season {anime.season_number}).json", "w") as json_file:
            json.dump({**asdict(anime), "episodes": episodes}, json_file, indent=4)

        for episode in episodes:
            name = f"{anime.name} - s{anime.season_number:02}e{episode['number']:02} - {episode['title']}"
            m3u8_url = episode.get("m3u8")
            headers = episode.get("headers") or {}
            if not m3u8_url:
                print(f"Skipping {name} (No M3U8 Stream Found)")
                continue

            result = self.yt_dlp_download(
                self.look_for_variants(m3u8_url, headers),
                headers,
                f"{folder}{name}.mp4",
            )
            if not result:
                break

            vtt_url = episode.get("vtt")
            if vtt_url:
                self.yt_dlp_download(vtt_url, headers, f"{folder}{name}.vtt")
            elif not self.args.no_subtitles:
                print(f"Skipping {name}.vtt (No VTT Stream Found)")

    @staticmethod
    def get_download_type():
        ans = (
            input(
                f"\n{Fore.LIGHTCYAN_EX}Both sub and dub episodes are available. Do you want to download sub or dub? "
                f"(Enter 'sub' or 'dub'):{Fore.LIGHTYELLOW_EX} "
            )
            .strip()
            .lower()
        )
        if ans in ("sub", "s"):
            return "sub"
        if ans in ("dub", "d"):
            return "dub"
        print(f"{Fore.LIGHTRED_EX}Invalid response, please respond with either 'sub' or 'dub'.")
        return HianimeExtractor.get_download_type()

    def configure_driver(self) -> None:
        mobile_emulation: dict[str, str] = {"deviceName": "iPhone X"}

        options: webdriver.ChromeOptions = webdriver.ChromeOptions()
        options.add_experimental_option("mobileEmulation", mobile_emulation)
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_argument("window-size=600,1000")
        options.add_experimental_option(
            "prefs",
            {
                "profile.default_content_setting_values.notifications": 2,
                "profile.default_content_setting_values.popups": 2,
                "profile.managed_default_content_settings.ads": 2,
            },
        )
        options.add_argument("--disable-features=PopupBlocking")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-notifications")
        options.add_argument("--disable-backgrounding-occluded-windows")
        options.add_argument("--disable-gpu")
        options.add_argument("--log-level=3")
        options.add_argument("--silent")
        options.add_argument("--autoplay-policy=no-user-gesture-required")
        options.add_argument("--disable-features=PreloadMediaEngagementData,MediaEngagementBypassAutoplayPolicies")
        options.add_experimental_option("excludeSwitches", ["enable-logging"])

        # ---------- merge CHROME_EXTRA_ARGS (validated) + ensure unique/writable user-data-dir ----------
        extra = os.environ.get("CHROME_EXTRA_ARGS", "")
        validated_args = validate_chrome_args(extra)
        for arg in validated_args:
            options.add_argument(arg)

        has_ud = any(str(a).startswith("--user-data-dir=") for a in getattr(options, "arguments", []))
        if not has_ud:
            xdg = os.environ.get("XDG_CONFIG_HOME", "/config")
            profile_dir = os.path.join(xdg, f"chrome-profile-{int(time.time())}-{os.getpid()}")
            try:
                os.makedirs(profile_dir, exist_ok=True)
            except PermissionError:
                xdg = "/tmp"
                profile_dir = os.path.join(xdg, f"chrome-profile-{int(time.time())}-{os.getpid()}")
                os.makedirs(profile_dir, exist_ok=True)
            options.add_argument(f"--user-data-dir={profile_dir}")

        def ensure(arg: str):
            if not any(arg in str(a) for a in getattr(options, "arguments", [])):
                options.add_argument(arg)

        ensure("--no-first-run")
        ensure("--no-default-browser-check")
        ensure("--disable-dev-shm-usage")
        ensure("--remote-debugging-port=0")
        if not any("--headless" in str(a) for a in getattr(options, "arguments", [])):
            options.add_argument("--headless=new")
        # ------------------------------------------------------------------------------------

        # Configure selenium-wire storage to use writable directory
        # Use /tmp/seleniumwire-{pid} to ensure app user has write access
        import tempfile
        seleniumwire_storage = os.path.join(tempfile.gettempdir(), f"seleniumwire-{os.getpid()}")
        os.makedirs(seleniumwire_storage, mode=0o755, exist_ok=True)

        seleniumwire_options: dict[str, Any] = {
            "verify_ssl": False,
            "disable_encoding": True,
            "request_storage_base_dir": seleniumwire_storage,
        }

        # Try Chrome first, fall back to Chromium (for ARM64 systems)
        try:
            self.driver: webdriver.Chrome = webdriver.Chrome(
                options=options,
                seleniumwire_options=seleniumwire_options,
            )
        except Exception as e:
            print(f"{Fore.LIGHTYELLOW_EX}Chrome not found, trying Chromium: {e}")
            # For ARM64 systems using Chromium
            options.binary_location = "/usr/bin/chromium"
            # Explicitly specify chromedriver path (Selenium manager doesn't support ARM64)
            service = Service(executable_path="/usr/bin/chromedriver")
            self.driver: webdriver.Chrome = webdriver.Chrome(
                service=service,
                options=options,
                seleniumwire_options=seleniumwire_options,
            )

        stealth(
            self.driver,
            languages=["en-US", "en"],
            vendor="Google Inc.",
            platform="Win32",
            webgl_vendor="Intel Inc.",
            renderer="Intel Iris OpenGL Engine",
            fix_hairline=True,
        )

        self.driver.implicitly_wait(10)

        self.driver.execute_script(
            """
                window.alert = function() {};
                window.confirm = function() { return true; };
                window.prompt = function() { return null; };
                window.open = function() {
                    console.log("Blocked a popup attempt.");
                    return null;
                };
            """
        )

    def create_driver(self) -> webdriver.Chrome:
        """Create and return a new configured Selenium driver instance for parallel processing."""
        mobile_emulation: dict[str, str] = {"deviceName": "iPhone X"}

        options: webdriver.ChromeOptions = webdriver.ChromeOptions()
        options.add_experimental_option("mobileEmulation", mobile_emulation)
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_argument("window-size=600,1000")
        options.add_experimental_option(
            "prefs",
            {
                "profile.default_content_setting_values.notifications": 2,
                "profile.default_content_setting_values.popups": 2,
                "profile.managed_default_content_settings.ads": 2,
            },
        )
        options.add_argument("--disable-features=PopupBlocking")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-notifications")
        options.add_argument("--disable-backgrounding-occluded-windows")
        options.add_argument("--disable-gpu")
        options.add_argument("--log-level=3")
        options.add_argument("--silent")
        options.add_argument("--autoplay-policy=no-user-gesture-required")
        options.add_argument("--disable-features=PreloadMediaEngagementData,MediaEngagementBypassAutoplayPolicies")
        options.add_experimental_option("excludeSwitches", ["enable-logging"])

        # Merge CHROME_EXTRA_ARGS (validated) + ensure unique/writable user-data-dir
        extra = os.environ.get("CHROME_EXTRA_ARGS", "")
        validated_args = validate_chrome_args(extra)
        for arg in validated_args:
            options.add_argument(arg)

        has_ud = any(str(a).startswith("--user-data-dir=") for a in getattr(options, "arguments", []))
        if not has_ud:
            # Use thread-safe unique profile directory for each driver
            profile_dir = tempfile.mkdtemp(prefix=f"chrome-profile-{threading.current_thread().ident}-")
            options.add_argument(f"--user-data-dir={profile_dir}")

        def ensure(arg: str):
            if not any(arg in str(a) for a in getattr(options, "arguments", [])):
                options.add_argument(arg)

        ensure("--no-first-run")
        ensure("--no-default-browser-check")
        ensure("--disable-dev-shm-usage")
        ensure("--remote-debugging-port=0")
        if not any("--headless" in str(a) for a in getattr(options, "arguments", [])):
            options.add_argument("--headless=new")

        # Configure selenium-wire storage with thread-safe unique directory
        seleniumwire_storage = tempfile.mkdtemp(prefix=f"seleniumwire-{threading.current_thread().ident}-")
        os.chmod(seleniumwire_storage, 0o755)

        seleniumwire_options: dict[str, Any] = {
            "verify_ssl": False,
            "disable_encoding": True,
            "request_storage_base_dir": seleniumwire_storage,
        }

        # Detect architecture and use appropriate browser
        import platform
        is_arm64 = platform.machine().lower() in ['aarch64', 'arm64']

        driver = None
        if is_arm64:
            # ARM64: Use Chromium directly (Chrome not available)
            try:
                options.binary_location = "/usr/bin/chromium"
                service = Service(executable_path="/usr/bin/chromedriver")
                driver = webdriver.Chrome(
                    service=service,
                    options=options,
                    seleniumwire_options=seleniumwire_options,
                )
            except Exception as e:
                with print_lock:
                    print(f"{Fore.LIGHTRED_EX}Failed to create Chromium driver: {e}")
                raise
        else:
            # x64: Try Chrome first, fall back to Chromium
            try:
                driver = webdriver.Chrome(
                    options=options,
                    seleniumwire_options=seleniumwire_options,
                )
            except Exception as e:
                with print_lock:
                    print(f"{Fore.LIGHTYELLOW_EX}Chrome not found, trying Chromium: {e}")
                try:
                    options.binary_location = "/usr/bin/chromium"
                    service = Service(executable_path="/usr/bin/chromedriver")
                    driver = webdriver.Chrome(
                        service=service,
                        options=options,
                        seleniumwire_options=seleniumwire_options,
                    )
                except Exception as e2:
                    with print_lock:
                        print(f"{Fore.LIGHTRED_EX}Failed to create Chromium driver: {e2}")
                    raise

        stealth(
            driver,
            languages=["en-US", "en"],
            vendor="Google Inc.",
            platform="Win32",
            webgl_vendor="Intel Inc.",
            renderer="Intel Iris OpenGL Engine",
            fix_hairline=True,
        )

        driver.implicitly_wait(10)

        driver.execute_script(
            """
                window.alert = function() {};
                window.confirm = function() { return true; };
                window.prompt = function() { return null; };
                window.open = function() {
                    console.log("Blocked a popup attempt.");
                    return null;
                };
            """
        )

        return driver

    def get_server_options(self, download_type: str) -> list[WebElement]:
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, "servers-content")))
        options = [
            _type.find_element(By.CLASS_NAME, "ps__-list").find_elements(By.TAG_NAME, "a")
            for _type in self.driver.find_element(By.ID, "servers-content").find_elements(
                By.XPATH, "./div[contains(@class, 'ps_-block')]"
            )
        ]
        return options[0] if len(options) == 1 or (download_type in ("sub", "s")) else options[1]

    def find_server_button(self, anime: Anime) -> WebElement | None:
        options = self.get_server_options(anime.download_type)
        selection = None

        if self.args.server:
            for option in options:
                if option.text.lower().strip() == self.args.server.lower().strip():
                    selection = option.text

        if not selection:
            server_names = []
            for i, option in enumerate(options):
                server_names.append(option.text)
                print(f"{Fore.LIGHTRED_EX} {i + 1}: {Fore.LIGHTCYAN_EX}{option.text}")

            self.driver.requests.clear()
            self.driver.quit()

            # Check if running in interactive mode (terminal available)
            if sys.stdin.isatty():
                if self.args.server:
                    print(f"{Fore.LIGHTGREEN_EX}The server name you provided does not exist\n")
                print(f"\n{Fore.LIGHTGREEN_EX}Select the server you want to download from: \n")
                selection = server_names[
                    get_int_in_range(f"\n{Fore.LIGHTCYAN_EX}Server:{Fore.LIGHTYELLOW_EX} ", 1, len(options)) - 1
                ]
            else:
                # Non-interactive mode (background job): default to first server
                selection = server_names[0]
                print(f"{Fore.LIGHTYELLOW_EX}No server specified, defaulting to first available: {selection}")
        else:
            self.driver.requests.clear()
            self.driver.quit()

        print(f"\n{Fore.LIGHTGREEN_EX}You chose: {Fore.LIGHTCYAN_EX}{selection}")

        self.configure_driver()
        self.driver.get(anime.url)

        options = self.get_server_options(anime.download_type)
        for option in options:
            if option.text == selection:
                return option

        print(f"{Fore.LIGHTRED_EX}No matching server button could be found")
        return None

    def get_episode_urls(self, page: str, start_episode: int, end_episode: int) -> list[dict[str, Any]]:
        episodes: list[dict[str, Any]] = []
        soup = BeautifulSoup(page, "html.parser")

        links: list[Tag] = soup.find_all("a", attrs={"data-number": True})  # type: ignore
        for link in links:
            episode_number: int = int(str(link.get("data-number")))
            if start_episode <= episode_number <= end_episode:
                url = urljoin(self.URL, str(link["href"]))
                episode_title = link.get("title")
                episode_info = {"url": url, "number": int(episode_number), "title": episode_title}
                episodes.append(episode_info)
        return episodes

    def capture_media_requests(self) -> dict[str, str] | None:
        found_m3u8: bool = False
        found_vtt: bool = self.args.no_subtitles
        attempt: int = 0
        urls: dict[str, Any] = {"all-vtt": []}
        previously_found_vtt: int = 0

        candidate_m3u8: tuple[str, dict[str, str]] | None = None
        all_urls: list[str] = []

        while (not found_m3u8 or not found_vtt) and self.DOWNLOAD_ATTEMPT_CAP >= attempt:
            sys.stdout.write(
                f"\r{Fore.CYAN}Attempt #{attempt} - {self.DOWNLOAD_ATTEMPT_CAP - attempt} Attempts Remaining"
            )
            sys.stdout.flush()

            # Debug: Log request count per attempt
            total_requests = len(self.driver.requests)
            requests_with_response = sum(1 for r in self.driver.requests if r.response)
            print(f"\n{Fore.LIGHTYELLOW_EX}DEBUG Attempt #{attempt}: Total requests={total_requests}, with_response={requests_with_response}")

            for request in self.driver.requests:
                if not request.response:
                    continue

                uri = request.url.lower()
                if uri not in all_urls:
                    all_urls.append(uri)
                    # Debug: Log new URLs as they're discovered
                    if ".m3u8" in uri or "master" in uri or "playlist" in uri:
                        print(f"{Fore.LIGHTMAGENTA_EX}DEBUG: New potential video URL: {uri[:150]}")

                # --- HLS detection: accept any .m3u8 (prefer "master" if seen) ---
                if ".m3u8" in uri and "thumbnail" not in uri and "iframe" not in uri:
                    if "master" in uri and uri not in self.captured_video_urls and not found_m3u8:
                        print(f"{Fore.LIGHTGREEN_EX}DEBUG: Found MASTER m3u8: {uri[:150]}")
                        urls["m3u8"] = uri
                        urls["headers"] = dict(request.headers)
                        found_m3u8 = True
                    elif candidate_m3u8 is None and uri not in self.captured_video_urls:
                        print(f"{Fore.LIGHTCYAN_EX}DEBUG: Found candidate m3u8: {uri[:150]}")
                        candidate_m3u8 = (uri, dict(request.headers))
                    elif uri in self.captured_video_urls:
                        print(f"{Fore.LIGHTRED_EX}DEBUG: Skipping already captured m3u8: {uri[:80]}...")

                # --- subtitle detection (language-filtered) ---
                if (
                    not found_vtt
                    and ".vtt" in uri
                    and "thumbnail" not in uri
                    and uri not in self.captured_subtitle_urls
                    and not any(lang in uri for lang in self.OTHER_LANGS)
                ):
                    try:
                        text = requests.get(uri, headers=dict(request.headers), timeout=10).content.decode(
                            self.ENCODING, errors="ignore"
                        )
                        if detect_lang(text) == self.SUBTITLE_LANG:
                            if uri in urls["all-vtt"]:
                                previously_found_vtt += 1
                                if previously_found_vtt >= len(urls["all-vtt"]):
                                    found_vtt = True
                            else:
                                urls["all-vtt"].append(uri)
                    except Exception:
                        pass

            # adopt first candidate if no master seen
            if not found_m3u8 and candidate_m3u8:
                urls["m3u8"], urls["headers"] = candidate_m3u8
                found_m3u8 = True

            attempt += 1
            if attempt in self.DOWNLOAD_REFRESH:
                self.driver.refresh()
            time.sleep(1)

        print()
        if not found_m3u8:
            print(f"{Fore.LIGHTRED_EX}No .m3u8 streams found.")
            print(f"{Fore.LIGHTYELLOW_EX}Debug: Captured {len(all_urls)} total requests")
            print(f"{Fore.LIGHTYELLOW_EX}Debug: Sample URLs (first 10):")
            for i, url in enumerate(all_urls[:10]):
                print(f"{Fore.LIGHTCYAN_EX}  {i+1}. {url[:150]}")
            # Check for any video-related URLs
            video_urls = [u for u in all_urls if any(ext in u for ext in ['.m3u8', '.mp4', '.ts', 'manifest', 'playlist'])]
            if video_urls:
                print(f"{Fore.LIGHTYELLOW_EX}Debug: Found {len(video_urls)} potential video URLs:")
                for url in video_urls[:5]:
                    print(f"{Fore.LIGHTMAGENTA_EX}  - {url[:150]}")
            return None

        if not found_vtt:
            print(
                f"\n{Fore.LIGHTRED_EX}No .vtt streams found. Check that the subtitles are not apart of the video file,"
                f" option '--no-subtitles' can be used to skip downloading subtitles."
            )
            self.args.no_subtitles = get_conformation(
                f"\n{Fore.LIGHTCYAN_EX}Would you like to skip the collection of subtiles on the following episodes (y/n): "
            )
            print()
        elif not self.args.no_subtitles:
            if len(urls["all-vtt"]) == 1:
                urls["vtt"] = urls["all-vtt"][0]
                return urls

            print("\nMore than one subtitle file was found, please select the one you would like to download:\n")
            for i, vtt in enumerate(urls["all-vtt"]):
                print(f" {i + 1} - {vtt}")

            selection = get_int_in_range("\nSelected Subtitle: ", 1, len(urls["all-vtt"]) + 1)
            print()
            urls["vtt"] = urls["all-vtt"][selection - 1]

        return urls

    def capture_media_requests_from_driver(self, driver: webdriver.Chrome) -> dict[str, str] | None:
        """
        Capture media requests from a specific driver instance (for parallel processing).
        Simplified version without interactive prompts.
        """
        found_m3u8: bool = False
        found_vtt: bool = self.args.no_subtitles
        attempt: int = 0
        urls: dict[str, Any] = {"all-vtt": []}
        previously_found_vtt: int = 0

        candidate_m3u8: tuple[str, dict[str, str]] | None = None
        all_urls: list[str] = []

        while (not found_m3u8 or not found_vtt) and self.DOWNLOAD_ATTEMPT_CAP >= attempt:
            for request in driver.requests:
                if not request.response:
                    continue

                uri = request.url.lower()
                if uri not in all_urls:
                    all_urls.append(uri)

                # HLS detection: accept any .m3u8 (prefer "master" if seen)
                if ".m3u8" in uri and "thumbnail" not in uri and "iframe" not in uri:
                    if "master" in uri and not found_m3u8:
                        with print_lock:
                            print(f"{Fore.LIGHTGREEN_EX}Found MASTER m3u8: {uri[:150]}")
                        urls["m3u8"] = uri
                        urls["headers"] = dict(request.headers)
                        found_m3u8 = True
                    elif candidate_m3u8 is None:
                        candidate_m3u8 = (uri, dict(request.headers))

                # Subtitle detection (language-filtered)
                if (
                    not found_vtt
                    and ".vtt" in uri
                    and "thumbnail" not in uri
                    and not any(lang in uri for lang in self.OTHER_LANGS)
                ):
                    try:
                        text = requests.get(uri, headers=dict(request.headers), timeout=10).content.decode(
                            self.ENCODING, errors="ignore"
                        )
                        if detect_lang(text) == self.SUBTITLE_LANG:
                            if uri in urls["all-vtt"]:
                                previously_found_vtt += 1
                                if previously_found_vtt >= len(urls["all-vtt"]):
                                    found_vtt = True
                            else:
                                urls["all-vtt"].append(uri)
                    except Exception:
                        pass

            # Adopt first candidate if no master seen
            if not found_m3u8 and candidate_m3u8:
                urls["m3u8"], urls["headers"] = candidate_m3u8
                found_m3u8 = True

            attempt += 1
            if attempt in self.DOWNLOAD_REFRESH:
                driver.refresh()
            time.sleep(1)

        if not found_m3u8:
            return None

        # For parallel processing, just take the first subtitle if available
        if not self.args.no_subtitles and urls["all-vtt"]:
            urls["vtt"] = urls["all-vtt"][0]

        return urls

    @staticmethod
    def look_for_variants(m3u8_url: str, m3u8_headers: dict[str, Any]) -> str:
        try:
            response = requests.get(m3u8_url, headers=m3u8_headers, timeout=15)
            response.raise_for_status()
            lines = response.text.splitlines()
            for line in lines:
                s = line.strip()
                if s.endswith(".m3u8") and "iframe" not in s:
                    return urljoin(m3u8_url, s)
        except Exception:
            pass
        return m3u8_url

    def yt_dlp_download(self, url: str, headers: dict[str, str], location: str) -> bool:
        yt_dlp_options: dict[str, Any] = {
            "no_warnings": False,
            "quiet": False,
            "outtmpl": location,
            "format": "best",
            "http_headers": headers,
            "logger": YTDLogger(),
            "fragment_retries": 10,
            "retries": 10,
            "socket_timeout": 60,
            "sleep_interval_requests": 1,
            "force_keyframes_at_cuts": True,
            "allow_unplayable_formats": True,
        }

        _return = True
        with YoutubeDL(yt_dlp_options) as ydl:
            try:
                ydl.download([url])
            except KeyboardInterrupt:
                print(
                    f"\n\n{Fore.LIGHTCYAN_EX}Canceling Downloads...\nRemoving Temp Files for "
                    f"{location[location.rfind(os.sep) + 1:-4]}"
                )
                _return = False
                ydl.close()

        if not _return:
            for file in [f for f in glob(location[:-4] + ".*") if not f.endswith((".mp4", ".vtt"))]:
                safe_remove(file)

        return _return

    def get_anime(self, name: str | None = None) -> Anime | None:
        # Clear screen (cross-platform, safer than os.system)
        print("\033[H\033[J", end="")
        print(Fore.LIGHTGREEN_EX + "\nHiAni " + Fore.LIGHTWHITE_EX + "DL\n")

        search_name: str = name if name else input("Enter Name of Anime: ")

        url: str = urljoin(self.URL, "/search?keyword=" + search_name)
        search_page_response: requests.Response = requests.get(url, headers=self.HEADERS)
        search_page_soup: BeautifulSoup = BeautifulSoup(search_page_response.content, "html.parser")

        main_content: Tag = search_page_soup.find("div", id="main-content")  # type: ignore
        anime_elements: list[Tag] = main_content.find_all("div", class_="flw-item")  # type: ignore

        if not anime_elements:
            print("No anime found")
            return

        anime_list: list[Anime] = []
        for element in anime_elements:
            raw_name: str = element.find("h3", class_="film-name").text  # type: ignore
            name_of_anime: str = raw_name.translate(self.TITLE_TRANS)
            url_of_anime: str = urljoin(
                self.URL, str(element.find("a", class_="film-poster-ahref item-qtip")["href"])  # type: ignore
            )

            try:
                sub_episodes_available: int = element.find("div", class_="tick-item tick-sub").text  # type: ignore
            except AttributeError:
                sub_episodes_available = 0
            try:
                dub_episodes_available: int = element.find("div", class_="tick-item tick-dub").text  # type: ignore
            except AttributeError:
                dub_episodes_available = 0

            anime_list.append(
                Anime(name_of_anime, url_of_anime, int(sub_episodes_available), int(dub_episodes_available))
            )

        for i, anime in enumerate(anime_list, start=1):
            print(
                " "
                + Fore.LIGHTRED_EX
                + str(i)
                + ": "
                + Fore.LIGHTCYAN_EX
                + anime.name
                + Fore.WHITE
                + " | Episodes: "
                + Fore.LIGHTYELLOW_EX
                + str(anime.sub_episodes)
                + Fore.LIGHTWHITE_EX
                + " sub"
                + Fore.LIGHTGREEN_EX
                + " / "
                + Fore.LIGHTYELLOW_EX
                + str(anime.dub_episodes)
                + Fore.LIGHTWHITE_EX
                + " dub"
            )

        return anime_list[
            get_int_in_range(
                f"\n{Fore.LIGHTCYAN_EX}Select an anime you want to download:{Fore.LIGHTYELLOW_EX} ",
                1,
                len(anime_list) + 1,
            )
            - 1
        ]

    def get_anime_from_link(self, link: str) -> Anime:
        link_page: requests.Response = requests.get(link, headers=self.HEADERS)
        link_page_soup = BeautifulSoup(link_page.content, "html.parser")
        main_div: Tag = link_page_soup.find("div", "anisc-detail")  # type: ignore

        if not main_div:
            print(f"{Fore.LIGHTRED_EX}Error: Could not find anime details on page")
            print(f"{Fore.LIGHTYELLOW_EX}Page title: {link_page_soup.title.text if link_page_soup.title else 'Unknown'}")
            print(f"{Fore.LIGHTYELLOW_EX}This might mean:")
            print(f"{Fore.LIGHTYELLOW_EX}  - The website structure has changed")
            print(f"{Fore.LIGHTYELLOW_EX}  - The URL is incorrect or the anime doesn't exist")
            print(f"{Fore.LIGHTYELLOW_EX}  - The page is blocked or requires JavaScript")
            raise ValueError(f"Could not find anime details on page: {link}")

        anime_stats: Tag = main_div.find("div", "film-stats")  # type: ignore

        try:
            sub_episodes_available: int = int(
                anime_stats.find("div", class_="tick-item tick-sub").text  # type: ignore
            )
        except (AttributeError, TypeError):
            sub_episodes_available = 0
        try:
            dub_episodes_available: int = int(
                anime_stats.find("div", class_="tick-item tick-dub").text  # type: ignore
            )
        except (AttributeError, TypeError):
            dub_episodes_available = 0

        film_name_tag = main_div.find("h2", "film-name")
        if not film_name_tag:
            print(f"{Fore.LIGHTRED_EX}Error: Could not find anime title element")
            raise ValueError(f"Could not find anime title on page: {link}")

        a_tag: Tag = film_name_tag.find("a")  # type: ignore
        if not a_tag:
            print(f"{Fore.LIGHTRED_EX}Error: Could not find anime link element")
            raise ValueError(f"Could not find anime link on page: {link}")

        return Anime(
            str(a_tag.text).translate(self.TITLE_TRANS),
            urljoin(self.URL, "/watch" + str(a_tag["href"])),
            sub_episodes_available,
            dub_episodes_available,
        )
