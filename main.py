from seleniumbase import Driver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests
import os
import time

class Main:
    def __init__(self):
        self.driver = Driver(mobile=True, wire=True, headed=True, uc=True)
                        #extension_dir=os.getcwd() + os.sep + 'extensions' + os.sep + 'Video-DownloadHelper-Chrome-Web-Store')

        self.driver.implicitly_wait(10)

        # Go to anime page
        self.driver.get("https://hianimez.to/watch/solo-leveling-18718?ep=114721")

        # Wait for the server button and click it
        server_element = self.find_server(download_type="sub")
        server_element.click()

        print("Waiting for video to load and requests to be made...")

        self.capture_media_requests()

        # Keep browser open if needed
        while self.driver.is_connected():
            pass

    def find_server(self, download_type):
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.LINK_TEXT, "HD-1"))
        )

        servers = self.driver.find_elements(By.LINK_TEXT, "HD-1")
        return servers[0] if len(servers) == 1 or download_type == "sub" else servers[1]

    def capture_media_requests(self):
        print("\n🎯 Media URLs Detected:\n")
        found_any = False
        while not found_any:
            for request in self.driver:
                if request.response:
                    url = request.url
                    if ".m3u8" in url or ".mp4" in url:
                        print("👉", url)
                        found_any = True

        if not found_any:
            print("No .m3u8 or .mp4 streams found. Try increasing the wait time.")

if __name__ == "__main__":
    Main()