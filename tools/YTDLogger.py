import sys

from colorama import Fore


class YTDLogger:
    @staticmethod
    def debug(msg: str):
        if not msg.startswith("[download]"):
            return
        color = (
            Fore.LIGHTRED_EX
            if "fragment not found" in msg
            else (Fore.YELLOW + "\n" if "error" in msg else Fore.LIGHTCYAN_EX)
        )
        new_msg = f"{color}[YT-DLP] {msg[11:]}"
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

