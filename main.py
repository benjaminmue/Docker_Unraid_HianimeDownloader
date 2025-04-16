from seleniumwire import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from selenium_stealth import stealth
import yt_dlp
import os
import subprocess



class Main:
    def __init__(self):
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

        self.driver = webdriver.Chrome(
            options=options,
            seleniumwire_options=seleniumwire_options
        )


        stealth(self.driver,
                languages=["en-US", "en"],
                vendor="Google Inc.",
                platform="Win32",
                webgl_vendor="Intel Inc.",
                renderer="Intel Iris OpenGL Engine",
                fix_hairline=True,
                )

        self.driver.implicitly_wait(10)

        print("Completed Setup")

        # Go to the anime page
        self.driver.get(input("Enter URL: "))

        print("Finding Element")
        server_element = self.find_server(download_type="sub")
        server_element.click()

        print("Waiting for video to load and requests to be made...")
        urls = self.capture_media_requests()
        print(f"Resulting URLs: \n\n{urls}")

        print("Using YT-DLP to get video: \n\n\n")

        resolution_height = 1080

        for i in range(len(urls["m3u8"])):
            self.download_video(urls["m3u8"][i], urls["m3u8-headers"][i])

        '''
        ydl_opts = {
            'no_warnings': False,
            'quiet': False,
            'outtmpl': os.path.join(output_folder, f"{folder_name} - Episode {number} - {title}.mp4"),
            'format': f'bestvideo[height<={resolution_height}]+bestaudio/best[height<={resolution_height}]',
            'http_headers': {
                'Referer': referer,
                'User-Agent': user_agent,
                'Cookie': cookie_header,  # ✅ this is the key
            }
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url]) 
        '''


    def apply_stealth(self):
        with open("stealth.min.js", "r") as f:
            stealth_js = f.read()
        self.driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
            "source": stealth_js
        })

    def find_server(self, download_type):
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.LINK_TEXT, "HD-1"))
        )
        servers = self.driver.find_elements(By.LINK_TEXT, "HD-1")
        return servers[0] if len(servers) == 1 or (download_type == "sub" or download_type == "s") else servers[1]

    def capture_media_requests(self):
        print("\n🎯 Media URLs Detected:\n")
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
                        urls["m3u8-headers"].append(request.headers)
                        print(request.headers)
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
        folder_name = "output"
        output_folder = os.path.join('./mp4_out', folder_name)
        os.makedirs(output_folder, exist_ok=True)

        number = 1
        title = "test"

        # Extract headers from Selenium
        referer = self.driver.current_url
        user_agent = self.driver.execute_script("return navigator.userAgent")

        # Extract cookies from Selenium
        selenium_cookies = self.driver.get_cookies()
        cookie_header = "; ".join([f"{c['name']}={c['value']}" for c in selenium_cookies])

        output_path = os.path.join(output_folder, f"{folder_name} - Episode {number} - {title}.mp4")

        header_dict = m3u8_headers
        headers = ""
        for k, v in header_dict.items():
            headers += f"{k}: {v}\r\n"

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
