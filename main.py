from seleniumwire import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from selenium_stealth import stealth
import yt_dlp
import os
import subprocess
import requests
from urllib.parse import urljoin


def configure_driver():
    mobile_emulation = {
        "deviceName": "iPhone X"
    }

    options = webdriver.ChromeOptions()
    options.add_experimental_option("mobileEmulation", mobile_emulation)
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_argument("window-size=600,1000")

    seleniumwire_options = {
        'verify_ssl': False,
        'disable_encoding': True,
    }

    driver = webdriver.Chrome(
        options=options,
        seleniumwire_options=seleniumwire_options
    )

    stealth(driver,
            languages=["en-US", "en"],
            vendor="Google Inc.",
            platform="Win32",
            webgl_vendor="Intel Inc.",
            renderer="Intel Iris OpenGL Engine",
            fix_hairline=True,
            )

    driver.implicitly_wait(10)
    return driver


class Main:
    def __init__(self):
        url = input("Enter URL: ")
        self.driver = configure_driver()

        print("Completed Setup")

        # Go to the anime page
        self.driver.get(url)

        print("Finding Element")
        server_element = self.find_server(download_type="sub")
        server_element.click()

        print("Waiting for video to load and requests to be made...")
        urls = self.capture_media_requests()
        print(f"Resulting URLs: \n\n{urls}")

        print("\nAttempting to download: \n\n")

        for i in range(len(urls["m3u8"])):
            self.download_video(urls["m3u8"][i], urls["m3u8-headers"][i])

    def find_server(self, download_type):
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.LINK_TEXT, "HD-1"))
        )
        servers = self.driver.find_elements(By.LINK_TEXT, "HD-1")
        return servers[0] if len(servers) == 1 or (download_type == "sub" or download_type == "s") else servers[1]

    def capture_media_requests(self):
        print("\nLooking for URLs:\n")
        found_any = False
        attempt_cap = 100
        attempt = 0
        urls = {"vtt": [], "m3u8": [], "mp4": [], "m3u8-headers": []}
        while not found_any and attempt_cap >= attempt:
            for request in self.driver.requests:
                if request.response:
                    if request.url.endswith(".m3u8"):
                        print(".m3u8 👉", request.url)
                        urls["m3u8"].append(request.url)
                        urls["m3u8-headers"].append(dict(request.headers))
                        found_any = True
                        continue
                    if ".mp4" in request.url:
                        print(".mp4 👉", request.url)
                        urls["mp4"].append(request.url)
                        found_any = True
                        continue
                    if ".vtt" in request.url:
                        if "thumbnail" in request.url:
                            print("thumbnail 👉", request.url)
                            urls["thumbnail"] = request.url
                            continue
                        print(".vtt 👉", request.url)
                        urls["vtt"].append(request.url)

            attempt += 1
            time.sleep(1)

        if not found_any:
            print("No .m3u8 or .mp4 streams found. Try increasing the wait time.")
        else:
            print("Done!")

        return urls

    def download_video(self, url, m3u8_headers):
        print(f"📲Attempting to download from: {url}")
        folder_name = "output"
        output_folder = os.path.join('./mp4_out', folder_name)
        os.makedirs(output_folder, exist_ok=True)

        number = 1
        title = "test"

        output_path = os.path.join(output_folder, f"{folder_name} - Episode {number} - {title}.mp4")

        # Extract cookies from Selenium
        selenium_cookies = self.driver.get_cookies()
        m3u8_headers["Cookie"] = "; ".join([f"{c['name']}={c['value']}" for c in selenium_cookies])
        headers = "".join(f"{k}: {v}\r\n" for k, v in m3u8_headers.items())
        with open("headers.txt", "w") as file:
            file.write(headers)

        # 1. Fetch master.m3u8 content
        try:
            response = requests.get(url, headers=m3u8_headers, timeout=10)
            response.raise_for_status()
        except Exception as e:
            print("❌ Failed to fetch master.m3u8:", e)
            return

        # 2. Look for first variant .m3u8 entry
        lines = response.text.splitlines()
        variant_url = None
        for line in lines:
            print(f"Line: {line}")
            if line.strip().endswith(".m3u8") and "iframe" not in line:
                variant_url = urljoin(url, line.strip())
                print("📺 Found variant playlist:", variant_url)
                break

        if not variant_url:
            print("❌ No valid video variant found in master.m3u8")
            return

        # 3. Use the variant URL instead of the master
        url = variant_url

        # Safely build and run the command as a shell string
        quoted_url = f'"{url}"'
        quoted_output = f'"{output_path}"'
        quoted_headers = headers.replace('"', '\\"').strip()

        cmd_str = f'ffmpeg -y -headers "{quoted_headers}" -i {quoted_url} -c copy -bsf:a aac_adtstoasc {quoted_output}'

        print("🔁 Running ffmpeg command:")
        print(cmd_str)

        result = subprocess.run(cmd_str, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        if result.returncode != 0:
            print("❌ ffmpeg failed:")
            print(result.stderr)
        else:
            print(f"✅ Download complete: {output_path}")

if __name__ == "__main__":
    Main()
