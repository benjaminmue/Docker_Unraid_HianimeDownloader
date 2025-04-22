import os
import sys
import time
from urllib.parse import urljoin

import requests
from glob import glob
from bs4 import BeautifulSoup
from colorama import Fore
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium_stealth import stealth
from seleniumwire import webdriver
from yt_dlp import YoutubeDL

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
    'Accept-Encoding': 'none',
    'Accept-Language': 'en-US,en;q=0.8',
    'Connection': 'keep-alive'
}

WEBSITE_URL = "https://hianimez.to"
SUBTITLE_LANGS = "eng"
OTHER_LANGS = ('ita', 'jpn', 'pol', 'por', 'ara', 'chi', 'cze', 'dan', 'dut', 'fin', 'fre', 'ger', 'gre', 'heb', 'hun',
               'ind', 'kor', 'nob', 'pol', 'rum', 'rus', 'tha', 'vie', 'swe', 'spa', 'tur')
DOWNLOAD_ATTEMPT_CAP = 45


def configure_driver():
    mobile_emulation = {
        "deviceName": "iPhone X"
    }

    options = webdriver.ChromeOptions()
    options.add_experimental_option("mobileEmulation", mobile_emulation)
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_argument("window-size=600,1000")
    # options.add_argument("--load-extension=extensions" + os.sep + )

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


def get_urls_to_anime_from_html(html_of_page, start_episode, end_episode):
    episode_info_list = []
    soup = BeautifulSoup(html_of_page, 'html.parser')

    # Find all episode links with the attribute data-number
    links = soup.find_all('a', attrs={'data-number': True})

    for link in links:
        episode_number = int(link.get('data-number'))
        if start_episode <= episode_number <= end_episode:
            url = WEBSITE_URL + link['href']
            episode_title = link.get('title')
            episode_info = {
                'url': url,
                'number': int(episode_number),
                'title': episode_title,
                'M3U8': None  # Initialize M3U8 field as None
            }
            episode_info_list.append(episode_info)

    return episode_info_list


class YTDLogger:
    @staticmethod
    def debug(msg: str):
        if not msg.startswith("[download]"):
            return
        new_msg = f"{Fore.LIGHTRED_EX if "fragment not found" in msg else Fore.LIGHTCYAN_EX}{Fore.YELLOW + "\n" if "error" in msg else ""}[YT-DLP] {msg[11:]}"
        if "ETA" in msg:
            sys.stdout.write(f"\r{new_msg}")
            sys.stdout.flush()
            return
        elif "100% of" in msg:
            sys.stdout.write(f"\r{new_msg}\n")
            sys.stdout.flush()
            return
        print(new_msg)

    @staticmethod
    def info(msg):
        print(f"[Logger Info] {msg}")

    @staticmethod
    def warning(msg):
        pass

    @staticmethod
    def error(msg):
        print(f"[Logger Error] {msg}")


class Main:
    def __init__(self):
        print(Fore.LIGHTGREEN_EX + "HiAnime " + Fore.LIGHTWHITE_EX + "Downloader")

        name_of_anime = input("Enter Name of Anime: ")

        # GET ANIME ELEMENTS FROM PAGE
        url = WEBSITE_URL + "/search?keyword=" + name_of_anime
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
            url_of_anime = WEBSITE_URL + element.find('a', class_='film-poster-ahref item-qtip')['href']
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

        season_number = int(input("Enter the season number for series: "))

        self.driver = configure_driver()

        self.driver.get(chosen_anime_dict['url'])
        server_element = self.find_server(download_type=download_type)
        server_element.click()

        episode_info_list = get_urls_to_anime_from_html(self.driver.page_source, start_episode, end_episode)

        folder = "output" + os.sep + chosen_anime_dict[
            'name'] + f" ({download_type[0].upper()}{download_type[1:].lower()})"
        os.makedirs(folder, exist_ok=True)

        print()

        for episode in episode_info_list:
            url = episode['url']
            number = episode['number']
            title = episode['title']

            print(
                Fore.LIGHTGREEN_EX + f"Getting" + Fore.LIGHTWHITE_EX + f" Episode {number} - {title} from {url}" + Fore.LIGHTWHITE_EX)

            try:
                self.driver.requests.clear()
                self.driver.get(url)
                urls = self.capture_media_requests(episode_info_list)
                episode.update(urls)
            except KeyboardInterrupt:
                print("\n\nCanceling media capture...")
                ans = 0
                while ans != "y" and ans != "n" and ans != "yes" and ans != "no":
                    if not type(ans) == int:
                        print("Please enter a valid response")
                    ans = input("Would you like to download link capture up to now? (y/n): ").lower()
                if ans == "n" or ans == "no":
                    self.driver.quit()
                    return

        self.driver.quit()

        for episode in episode_info_list:
            print()
            name = f"{chosen_anime_dict['name']} ({download_type[0].upper()}{download_type[1:].lower()}) - s{season_number:02}e{episode['number']:02} - {episode['title']}"
            try:
                if "m3u8" in episode.keys() and episode["m3u8"]:
                    self.yt_dlp_download(self.look_for_variants(episode["m3u8"], episode["m3u8-headers"]),
                                         episode["m3u8-headers"], f"{folder}{os.sep}{name}.mp4")
                else:
                    print(f"Skipping {name}.mp4 (No M3U8 Stream Found)")
                if "vtt" in episode.keys() and episode["vtt"]:
                    self.yt_dlp_download(episode["vtt"], episode["m3u8-headers"], f"{folder}{os.sep}{name}.vtt")
                else:
                    print(f"Skipping {name}.vtt (No VTT Stream Found)")
            except KeyboardInterrupt:
                print(f"\n\n{Fore.LIGHTCYAN_EX}Canceling Downloads...\nRemoving Temp Files for {name}")
                for file in glob(os.path.join(folder, f"{name}.*")):
                    os.remove(file)
                break
            except Exception as e:
                print(f"\n\nError while downloading {name}: \n{e}")

    def find_server(self, download_type):
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.LINK_TEXT, "HD-1"))
        )
        servers = self.driver.find_elements(By.LINK_TEXT, "HD-1")
        return servers[0] if len(servers) == 1 or (download_type == "sub" or download_type == "s") else servers[1]

    def capture_media_requests(self, found_episodes: list[dict]):
        # print("\nLooking for URLs:\n")
        found_m3u8 = False
        found_vtt = False
        attempt = 0
        urls = {"vtt": []}
        while (not found_m3u8 or not found_vtt) and DOWNLOAD_ATTEMPT_CAP >= attempt:
            sys.stdout.write(f"\rAttempt #{attempt} - {DOWNLOAD_ATTEMPT_CAP - attempt} Attempts Remaining")
            sys.stdout.flush()
            for request in self.driver.requests:
                if request.response:
                    if (request.url.endswith(".m3u8") and "master" in request.url and
                            request.url not in [e["m3u8"] for e in found_episodes if "m3u8" in e.keys()]):
                        # print(".m3u8 👉", request.url)
                        urls["m3u8"] = request.url
                        urls["m3u8-headers"] = dict(request.headers)
                        found_m3u8 = True
                        continue
                    if ".vtt" in request.url:
                        if "thumbnail" in request.url:
                            # print("thumbnail 👉", request.url)
                            urls["thumbnail"] = request.url
                            continue
                        # print(".vtt 👉", request.url)
                        if (request.url not in [e["vtt"] for e in found_episodes if "vtt" in e.keys()] and
                                (not any(lang in request.url for lang in OTHER_LANGS)) or
                                any(lang in request.url for lang in SUBTITLE_LANGS)):
                            urls["vtt"].append(request.url)
                            found_vtt = True

            attempt += 1
            if attempt == 30:
                self.driver.refresh()
            time.sleep(1)


        print()
        if not found_m3u8:
            print("No .m3u8 streams found. Try increasing the wait time.")
        if not found_vtt:
            print("No .vtt streams found. Try increasing the wait time.")
        else:
            if len(urls["vtt"]) > 1:
                # print(urls["vtt"])
                eng_urls = [url for url in urls["vtt"] if any(lang in url for lang in SUBTITLE_LANGS)]
                if len(eng_urls) > 0:
                    urls["vtt"] = eng_urls[0]
                else:
                    print("Available Subtitles: ")
                    for i in range(len(urls["vtt"])):
                        print(f"{i}: {urls["vtt"][i]}")

                    urls["vtt"] = urls["vtt"][input("Selection: ")]
            else:
                urls["vtt"] = urls["vtt"][0]

        return urls

    @staticmethod
    def look_for_variants(m3u8_url, m3u8_headers):
        response = requests.get(m3u8_url, headers=m3u8_headers, timeout=10)

        lines = response.text.splitlines()
        url = None
        for line in lines:
            if line.strip().endswith(".m3u8") and "iframe" not in line:
                url = urljoin(m3u8_url, line.strip())
                break

        if not url:
            print("No valid video variant found in master.m3u8")
            return

        return url

    @staticmethod
    def yt_dlp_download(url, headers, location):

        yt_dlp_options = {
            'no_warnings': False,
            'quiet': False,
            'outtmpl': location,
            'format': 'best',
            'http_headers': headers,
            'logger': YTDLogger(),
            'fragment_retries': 10,  # Retry up to 10 times for failed fragments
            'retries': 10,
            'socket_timeout': 60,
            'sleep_interval_requests': 1,
            'force_keyframes_at_cuts': True,
            'allow_unplayable_formats': True,
            # 'downloader': 'aria2c', # External downloader to use with yt-dlp, which is supposed to be better for not
            # losing fragments (untested)
            # 'external_downloader': 'aria2c',
            # 'external_downloader_args': ['-x', '16', '-k', '1M', '--timeout=60', '--retry-wait=5'],
        }

        with YoutubeDL(yt_dlp_options) as ydl:
            ydl.download([url])


if __name__ == "__main__":
    start = time.time()
    Main()
    elapsed = time.time() - start
    print(f"Took {int(elapsed / 60)}:{int((elapsed % 60))} to finish")
