from seleniumwire import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from selenium_stealth import stealth
import yt_dlp
from colorama import Fore
import os
import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
    'Accept-Encoding': 'none',
    'Accept-Language': 'en-US,en;q=0.8',
    'Connection': 'keep-alive'
}

def configure_driver():
    mobile_emulation = {
        "deviceName": "iPhone X"
    }

    options = webdriver.ChromeOptions()
    options.add_experimental_option("mobileEmulation", mobile_emulation)
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_argument("window-size=600,1000")
    #options.add_argument("--load-extension=extensions" + os.sep + "Ghostery")

    seleniumwire_options = {
        'verify_ssl': False,
        'disable_encoding': True,
    }

    driver = webdriver.Chrome(
        options=options,
        seleniumwire_options=seleniumwire_options,
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

def get_rid_of_bad_chars(word):
    bad_chars = ['-', '.', '/', '\\', '?', '%', '*', '<', '>', '|', '"', "[", "]", ":"]
    for char in bad_chars:
        word = word.replace(char, '')
    return word

def get_episode_input(prompt, min_value, max_value):
    while True:
        try:
            episode_no = int(input(prompt))
            if min_value <= episode_no <= max_value:
                return episode_no
            else:
                print(f"Please enter a number between {min_value} and {max_value}.")
        except ValueError:
            print("Invalid input. Please enter a valid number.")

def get_urls_to_animes_from_html(html_of_page, start_episode, end_episode):
    episode_info_list = []
    soup = BeautifulSoup(html_of_page, 'html.parser')

    # Find all episode links with the attribute data-number
    links = soup.find_all('a', attrs={'data-number': True})

    for link in links:
        episode_number = int(link.get('data-number'))
        if start_episode <= episode_number <= end_episode:
            url = "https://hianime.to" + link['href']
            episode_title = link.get('title')
            episode_info = {
                'url': url,
                'number': int(episode_number),
                'title': episode_title,
                'M3U8': None  # Initialize M3U8 field as None
            }
            episode_info_list.append(episode_info)

    return episode_info_list

class Main:
    def __init__(self):
        print(Fore.LIGHTGREEN_EX + "HiAnime " + Fore.LIGHTWHITE_EX + "Downloader")

        name_of_anime = input("Enter Name of Anime: ")

        # GET ANIME ELEMENTS FROM PAGE
        url = "https://hianime.to/search?keyword=" + name_of_anime
        search_page_response = requests.get(url, headers=HEADERS)
        search_page_soup = BeautifulSoup(search_page_response.content, 'html.parser')

        main_content = search_page_soup.find('div', id='main-content')
        anime_elements = main_content.find_all('div', class_='flw-item')

        if not anime_elements:
            print("No anime found")
            return  # Exit if no anime is found

        # MAKE DICT WITH ANIME TITLES
        dict_with_anime_elements = {}
        for i, element in enumerate(anime_elements, 1):
            name_of_anime = get_rid_of_bad_chars(element.find('h3', class_='film-name').text)
            url_of_anime = "https://hianime.to" + element.find('a', class_='film-poster-ahref item-qtip')['href']
            try:
                # Some anime have no subs
                sub_episodes_available = element.find('div', class_="tick-item tick-sub").text
            except AttributeError:
                sub_episodes_available = 0
            try:
                dub_episodes_available = element.find('div', class_="tick-item tick-dub").text
            except AttributeError:
                dub_episodes_available = 0

            dict_with_anime_elements[i] = {
                'name': name_of_anime,
                'url': url_of_anime,
                'sub_episodes': int(sub_episodes_available),
                'dub_episodes': int(dub_episodes_available)
            }

        # PRINT ANIME TITLES TO THE CONSOLE
        for i, el in dict_with_anime_elements.items():
            print(
                Fore.LIGHTRED_EX + str(i) + ": " + Fore.LIGHTCYAN_EX + el['name'] + Fore.WHITE + " | " + "Episodes: " +
                Fore.LIGHTYELLOW_EX + str(
                    el['sub_episodes']) + Fore.LIGHTWHITE_EX + " sub" + Fore.LIGHTGREEN_EX + " / " +
                Fore.LIGHTYELLOW_EX + str(el['dub_episodes']) + Fore.LIGHTWHITE_EX + " dub")

        # USER SELECTS ANIME
        while True:
            try:
                number_of_anime = int(input("\nSelect an anime you want to download: "))
                if number_of_anime in dict_with_anime_elements:
                    chosen_anime_dict = dict_with_anime_elements[number_of_anime]
                    break
                else:
                    print("Invalid anime number. Please select a valid anime.")
            except ValueError:
                print("Invalid input. Please enter a valid number.")

        # Display chosen anime details
        print("\nYou have chosen " + Fore.LIGHTCYAN_EX + chosen_anime_dict['name'] + Fore.LIGHTWHITE_EX)
        print(f"URL: {chosen_anime_dict['url']}")
        print("Sub Episodes: " + Fore.LIGHTYELLOW_EX + str(chosen_anime_dict['sub_episodes']) + Fore.LIGHTWHITE_EX)
        print("Dub Episodes: " + Fore.LIGHTYELLOW_EX + str(chosen_anime_dict['dub_episodes']) + Fore.LIGHTWHITE_EX)

        download_type = 'sub'
        if chosen_anime_dict['dub_episodes'] != 0 and chosen_anime_dict['sub_episodes'] != 0:
            download_type = input(
                "\nBoth sub and dub episodes are available. Do you want to download sub or dub? (Enter 'sub' or 'dub'): ").strip().lower()
            while download_type not in ['sub', 'dub']:
                print("Invalid choice. Please enter 'sub' or 'dub'.")
                download_type = input(
                    "\nBoth sub and dub episodes are available. Do you want to download sub or dub? (Enter 'sub' or 'dub'): ").strip().lower()

        elif chosen_anime_dict['dub_episodes'] == 0:
            print("Dub episodes are not available. Defaulting to sub.")
        else:
            print("Sub episodes are not available. Defaulting to dub.")
            download_type = "dub"

        # Get starting and ending episode numbers
        if chosen_anime_dict[f"{download_type}_episodes"] != "1":
            start_episode = get_episode_input("Enter the starting episode number: ", 1,
                                              chosen_anime_dict[f"{download_type}_episodes"])
            end_episode = get_episode_input("Enter the ending episode number: ", start_episode,
                                            chosen_anime_dict[f"{download_type}_episodes"])
        else:
            start_episode = 1
            end_episode = 1

        self.driver = configure_driver()

        self.driver.get(chosen_anime_dict['url'])
        server_element = self.find_server(download_type=download_type)
        server_element.click()

        episode_info_list = get_urls_to_animes_from_html(self.driver.page_source, start_episode, end_episode)

        folder = "output" + os.sep + chosen_anime_dict['name']
        os.makedirs(folder + (f"{os.sep}Subtitles" if download_type=="sub" else ""), exist_ok=True)

        for episode in episode_info_list:
            url = episode['url']
            number = episode['number']
            title = episode['title']

            print(
                Fore.LIGHTGREEN_EX + f"Get" + Fore.LIGHTWHITE_EX + f" {title} (Episode {number}) from {url}" + Fore.LIGHTWHITE_EX)

            self.driver.get(url)
            urls = self.capture_media_requests()
            episode.update(urls)

        self.driver.quit()

        for episode in episode_info_list:
            name = f"Episode {episode['number']} - {episode['title']}"
            self.download_video(episode["m3u8"], episode["m3u8-headers"],
                                f"{folder}{os.sep}{name}.mp4")
            if episode["vtt"]:
                self.download_subtitles(episode["vtt"], episode["m3u8-headers"],
                                        f"{folder}{os.sep}Subtitles{os.sep}{name}.vtt")


    def find_server(self, download_type):
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.LINK_TEXT, "HD-1"))
        )
        servers = self.driver.find_elements(By.LINK_TEXT, "HD-1")
        return servers[0] if len(servers) == 1 or (download_type == "sub" or download_type == "s") else servers[1]

    def capture_media_requests(self):
        #print("\nLooking for URLs:\n")
        found_any = False
        attempt_cap = 100
        attempt = 0
        urls = {}
        while not found_any and attempt_cap >= attempt:
            for request in self.driver.requests:
                if request.response:
                    if request.url.endswith(".m3u8") and "master" in request.url:
                        print(".m3u8 👉", request.url)
                        urls["m3u8"] = request.url
                        urls["m3u8-headers"] = dict(request.headers)
                        found_any = True
                        continue
                    if ".vtt" in request.url:
                        if "thumbnail" in request.url:
                            print("thumbnail 👉", request.url)
                            urls["thumbnail"] = request.url
                            continue
                        if "eng" in request.url:
                            print(".vtt 👉", request.url)
                            urls["vtt"] = request.url

            attempt += 1
            time.sleep(1)

        if not found_any:
            print("No .m3u8 or .mp4 streams found. Try increasing the wait time.")
        else:
            print("Found URLs")

        return urls

    def download_video(self, m3u8_url, m3u8_headers, location):
        print(f"📲Attempting to download from: {m3u8_url}")

        response = requests.get(m3u8_url, headers=m3u8_headers, timeout=10)

        lines = response.text.splitlines()
        url = None
        for line in lines:
            if line.strip().endswith(".m3u8") and "iframe" not in line:
                url = urljoin(m3u8_url, line.strip())
                print("📺 Found variant playlist:", url)
                break

        if not url:
            print("❌ No valid video variant found in master.m3u8")
            return

        yt_dlp_options = {
            'no_warnings': False,
            'quiet': False,
            'outtmpl': location,
            'format': 'best',
            'http_headers': m3u8_headers,
        }

        with yt_dlp.YoutubeDL(yt_dlp_options) as ydl:
            ydl.download([url])

    def download_subtitles(self, url, headers, location):
        yt_dlp_options = {
            'no_warnings': False,
            'quiet': False,
            'outtmpl': location,
            'format': 'best',
            'http_headers': headers,
        }

        with yt_dlp.YoutubeDL(yt_dlp_options) as ydl:
            ydl.download([url])

if __name__ == "__main__":
    Main()
