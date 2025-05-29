import argparse
import os
import time

from extractors.general import GeneralExtractor
from extractors.hianime import HianimeExtractor
from extractors.instagram import InstagramExtractor


class Main:
    def __init__(self):
        self.args = self.parse_args()
        extractor = self.get_extractor()
        extractor.run()

    def get_extractor(self):
        if not self.args.link:
            ans = input(
                "Provide a link to the content you are trying to download or the name of the anime\n=>"
            )
            if "http" in ans.lower():
                self.args.link = ans
            else:
                return HianimeExtractor(args=self.args, name=ans)

        if "hianime" in self.args.link:
            return HianimeExtractor(args=self.args)
        if "instagram.com" in self.args.link:
            return InstagramExtractor(args=self.args)
        return GeneralExtractor(args=self.args)

    def parse_args(self):
        parser = argparse.ArgumentParser(description="Anime downloader options")

        parser.add_argument(
            "--no-subtitles",
            action="store_true",
            help="Skip downloading subtitle files (.vtt)",
        )

        parser.add_argument(
            "-o",
            "--output-dir",
            type=str,
            default="output",
            help="Directory to save downloaded files",
        )

        parser.add_argument(
            "-n", "--filename", type=str, default="", help="Name of the output file"
        )

        parser.add_argument(
            "--aria",
            action="store_true",
            default=False,
            help="Use aria2c as external downloader",
        )

        parser.add_argument(
            "-l",
            "--link",
            type=str,
            default=None,
            help="Provide link to desired content",
        )

        return parser.parse_args()


if __name__ == "__main__":
    start = time.time()
    Main()
    elapsed = time.time() - start
    print(f"Took {int(elapsed / 60)}:{int((elapsed % 60))} to finish")
