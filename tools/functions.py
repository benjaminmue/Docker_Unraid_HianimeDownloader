import os
import time
from typing import Union


def get_conformation(prompt: str) -> bool:
    """Prompt the user for a yes/no confirmation and return True or False."""
    while True:
        ans = input(prompt).strip().lower()
        if ans in {"y", "yes", "true"}:
            return True
        if ans in {"n", "no", "false"}:
            return False
        print("Please provide a valid response (y/n).")


def get_int_in_range(prompt: str, _min: int = 0, _max: Union[int, float] = float("inf")) -> int:
    """Prompt for an integer within a given range and keep retrying until valid."""
    while True:
        ans = input(prompt).strip()
        try:
            value = int(ans)
        except ValueError:
            print("Invalid input. Please enter a valid number.")
            continue

        if _min <= value <= _max:
            return value

        print(f"Invalid input. Please enter a number between {_min} and {_max}.")


def safe_remove(file: str, retries: int = 5, delay: int = 2) -> None:
    """
    Safely remove a file with retry logic.
    Useful in Docker/Unraid environments where file locks may persist briefly.
    """
    for attempt in range(retries):
        try:
            if os.path.exists(file):
                os.remove(file)
                print(f"Removed file: {file}")
                return
            else:
                # Not an error; file already gone
                return
        except PermissionError:
            print(f"Retrying deletion of {file} (attempt {attempt + 1}/{retries})...")
            time.sleep(delay)
        except Exception as e:
            print(f"Unexpected error removing {file}: {e}")
            time.sleep(delay)

    print(f"⚠️ Failed to remove file after {retries} attempts: {file}")
