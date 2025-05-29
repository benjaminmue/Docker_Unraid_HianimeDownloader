import os
from yt_dlp import YoutubeDL


def get_conformation(prompt: str) -> bool:
    ans: str = input(prompt).lower()
    if ans == "y" or ans == "yes" or ans == "true":
        return True
    elif ans == "n" or ans == "no" or ans == "false":
        return False
    else:
        print("Please provide a valid response")
        return get_conformation(prompt)


def get_int_in_range(prompt: str, _min: int = 0, _max: int = float("inf")) -> int:
    ans: str = input(prompt)
    try:
        _int: int = int(ans)
    except ValueError:
        print("Invalid input. Please provide a valid number.")
        return get_int_in_range(prompt, _min, _max)

    if _min <= _int <= _max:
        return _int

    print("Invalid input. The provide input was not within the expected range.")
    return get_int_in_range(prompt, _min, _max)


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
