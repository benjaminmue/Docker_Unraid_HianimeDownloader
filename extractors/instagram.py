import os

import requests
from bs4 import BeautifulSoup
from gallery_dl import config, job

from extractors.general import GeneralExtractor


class InstagramExtractor(GeneralExtractor):
    def __init__(self, args):
        super().__init__(args)
        self.link: str = self.args.link

        self.HEADERS: dict[str, str] = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
            "Accept-Encoding": "none",
            "Accept-Language": "en-US,en;q=0.8",
            "Connection": "keep-alive",
        }
        self.URL = "instagram.com/"

        os.makedirs(self.args.output_dir, exist_ok=True)

    def configure_gallery_dl(self):
        config.load()  # load default config files
        config.set(("extractor",), "base-directory", "gallery-dl")
        config.set(
            ("extractor", "imgur"),
            "filename",
            (
                "{id}{title:?_//}.{extension}"
                if not self.args.filename
                else self.args.filename + ".{extension}"
            ),
        )
        config.set(
            ("extractor",),
            "postprocessors",
            [
                {
                    "name": "metadata",
                    "mode": "json",
                }
            ],
        )
        config.set(("extractor", "instagram"), "base-directory", self.args.output_dir)
        if os.path.exists("cookies.txt"):
            config.set(("extractor", "instagram"), "cookies", "cookies.txt")
        else:
            print(
                "No cookies.txt file exists for gallery-dl to pull posts from instagram, please create a cookies.txt file with your browser cookies."
            )

    def get_post_title(self):
        response = requests.get(self.args.link, headers=self.HEADERS)
        page_soup = BeautifulSoup(response.content, "html.parser")
        url: str = page_soup.find("meta", property="og:url").get("content")  # type: ignore
        return url[url.find(self.URL) + len(self.URL) : -1].replace("/reel/", " - ")

    def run(self):
        if "instagram.com/p/" in self.link:
            self.configure_gallery_dl()
            job.DownloadJob(self.link).run()
            return

        title = self.args.filename if self.args.filename else self.get_post_title()
        self.yt_dlp_download(
            self.link,
            f"{self.args.output_dir}{os.sep}{title}",
            title,
        )
