import argparse
import os
import sys
import time

from colorama import Fore

from extractors.general import GeneralExtractor
from extractors.hianime import HianimeExtractor
from extractors.instagram import InstagramExtractor


class Main:
    def __init__(self):
        self.args = self.parse_args()
        extractor = self.get_extractor()
        extractor.run()

    def _has_tty(self) -> bool:
        return sys.stdin.isatty() and sys.stdout.isatty()

    def get_extractor(self):
        # If neither link nor filename provided, ask only when TTY is available
        if not self.args.link and not self.args.filename:
            if self._has_tty():
                os.system("cls" if os.name == "nt" else "clear")
                ans = input(
                    f"{Fore.LIGHTGREEN_EX}GDown {Fore.LIGHTCYAN_EX}Downloader\n\n"
                    f"Provide a link or search for an anime:\n{Fore.LIGHTYELLOW_EX}"
                )
                if ans.strip().lower().startswith(("http://", "https://")):
                    self.args.link = ans.strip()
                else:
                    return HianimeExtractor(args=self.args, name=ans.strip())
            else:
                print(
                    f"{Fore.LIGHTRED_EX}No LINK or FILENAME provided and no TTY available for prompts. "
                    f"Set -l/--link or -n/--filename (or provide env vars)."
                )
                sys.exit(2)

        # If no link but a filename was provided → treat as HiAnime search term
        if not self.args.link and self.args.filename:
            return HianimeExtractor(args=self.args, name=self.args.filename)

        link = self.args.link or ""
        if "hianime" in link:
            return HianimeExtractor(args=self.args)
        if "instagram.com" in link:
            return InstagramExtractor(args=self.args)
        return GeneralExtractor(args=self.args)

    def parse_args(self):
        parser = argparse.ArgumentParser(description="Anime downloader options")

        # Defaults from env where it makes sense (nice for Docker)
        default_output = os.environ.get("OUTPUT_DIR", "output")
        default_server = os.environ.get("SERVER")
        default_link = os.environ.get("LINK")
        default_filename = os.environ.get("NAME", "")

        parser.add_argument(
            "--no-subtitles",
            action="store_true",
            help="Skip downloading subtitle files (.vtt)",
        )

        parser.add_argument(
            "-o",
            "--output-dir",
            type=str,
            default=default_output,
            help=f"Directory to save downloaded files (default: {default_output})",
        )

        parser.add_argument(
            "-n",
            "--filename",
            type=str,
            default=default_filename,
            help="Used for name of anime, or name of output file when using other extractor",
        )

        parser.add_argument(
            "--aria",
            action="store_true",
            default=(os.environ.get("ARIA", "false").lower() == "true"),
            help="Use aria2c as external downloader",
        )

        parser.add_argument(
            "-l",
            "--link",
            type=str,
            default=default_link,
            help="Provide link to desired content",
        )

        parser.add_argument(
            "--server",
            type=str,
            default=default_server,
            help="Streaming Server to download from (e.g., HD-1)",
        )

        # New: non-interactive knobs (read from env too)
        parser.add_argument(
            "--download-type",
            type=str,
            choices=("sub", "dub"),
            default=os.environ.get("DOWNLOAD_TYPE"),
            help="Download type to skip prompt (sub|dub)",
        )
        parser.add_argument(
            "--ep-from",
            type=int,
            default=int(os.environ.get("EP_FROM", "0")) if os.environ.get("EP_FROM") else None,
            help="First episode (inclusive) to skip prompt",
        )
        parser.add_argument(
            "--ep-to",
            type=int,
            default=int(os.environ.get("EP_TO", "0")) if os.environ.get("EP_TO") else None,
            help="Last episode (inclusive) to skip prompt",
        )
        parser.add_argument(
            "--season",
            type=int,
            default=int(os.environ.get("SEASON", "0")) if os.environ.get("SEASON") else None,
            help="Season number to skip prompt",
        )

        return parser.parse_args()


if __name__ == "__main__":
    start = time.time()
    Main()
    elapsed = time.time() - start
    mm = int(elapsed // 60)
    ss = int(elapsed % 60)
    print(f"Took {mm:02d}:{ss:02d} to finish")
