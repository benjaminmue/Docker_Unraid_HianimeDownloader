import os
from yt_dlp import YoutubeDL


class GeneralExtractor:
    def __init__(self, args):
        self.args = args

    def run(self):
        self.yt_dlp_download(
            self.args.link,
            self.args.output_dir,
            (
                self.args.filename
                if self.args.filename
                else input("Enter a file name for the file: ")
            ),
        )

    @staticmethod
    def yt_dlp_download(url: str, location: str, name: str):
        os.makedirs(location, exist_ok=True)
        yt_dlp_options = {
            "no_warnings": False,
            "quiet": False,
            "outtmpl": location + os.sep + name + ".mp4",
            "format": "bv*+ba/best",
            "fragment_retries": 10,
            "retries": 10,
            "socket_timeout": 60,
            "sleep_interval_requests": 1,
            "force_keyframes_at_cuts": True,
            # "allow_unplayable_formats": True,  # Disable this for now
            "merge_output_format": "mp4",
            "keepvideo": True,
        }

        if os.path.exists("cookies.txt"):
            print("Using local cookies")
            yt_dlp_options["cookies"] = "cookies.txt"

        with YoutubeDL(yt_dlp_options) as ydl:
            ydl.download([url])
