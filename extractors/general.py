import os
from yt_dlp import YoutubeDL

from tools.functions import yt_dlp_download


class GeneralExtractor:
    def __init__(self, args):
        self.args = args

    def run(self):
        yt_dlp_download(
            self.args.link,
            self.args.output_dir,
            (
                self.args.filename
                if self.args.filename
                else input("Enter a file name for the file: ")
            ),
        )
