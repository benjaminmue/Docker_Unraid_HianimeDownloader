from seleniumwire import webdriver
import undetected_chromedriver as uc
import time

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


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

        # Create driver with Selenium Wire's Chrome
        self.driver = webdriver.Chrome(
            options=options,
            seleniumwire_options=seleniumwire_options
        )

        # Apply UC stealth (manually patching UC’s evasion JS)
        uc.install()

        # Go to the anime page
        self.driver.get("https://hianime.to/watch/solo-leveling-18718?ep=114721")

        self.driver.implicitly_wait(10)
        time.sleep(2)

        server_element = self.find_server(download_type="sub")
        server_element.click()

        print("Waiting for video to load and requests to be made...")
        self.capture_media_requests()

        while True:
            time.sleep(1)

    def find_server(self, download_type):
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.LINK_TEXT, "HD-1"))
        )
        servers = self.driver.find_elements(By.LINK_TEXT, "HD-1")
        return servers[0] if len(servers) == 1 or download_type == "sub" else servers[1]

    def capture_media_requests(self):
        print("\n🎯 Media URLs Detected:\n")
        found_any = False
        for request in self.driver.requests:
            if request.response and (".m3u8" in request.url or ".mp4" in request.url):
                print("👉", request.url)
                found_any = True

        if not found_any:
            print("No .m3u8 or .mp4 streams found. Try increasing the wait time.")


if __name__ == "__main__":
    Main()
