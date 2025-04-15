from seleniumbase import Driver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import os

class Main:
    def __init__(self):
        self.driver = Driver(mobile=True, wire=True, headed=True, uc=True,
                        extension_dir=os.getcwd() + os.sep + 'extensions' + os.sep + 'Video-DownloadHelper-Chrome-Web-Store')

        self.driver.implicitly_wait(10)

        self.driver.get("https://hianimez.to/watch/solo-leveling-18718?ep=114721")
        window_before = self.driver.window_handles[0]
        self.driver.switch_to_window(window_before)

        server_element = self.find_server(download_type = "sub")
        server_element.click()



        while self.driver.is_connected():
            pass

    def find_server(self, download_type):
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.LINK_TEXT, "HD-1"))
        )

        servers = self.driver.find_elements(By.LINK_TEXT, "HD-1")
        return servers[0] if len(servers) == 1 or download_type == "sub" else servers[1]


if __name__ == "__main__":
    Main()