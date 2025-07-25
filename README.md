# GDownloader

A simple CLI tool for downloading content from the streaming platform [hianime.to](hianime.to) + [social media platfroms](#supported-platforms). \
This tool works best if you have a VPN installed with Adblock support, as I have not been able to get a working ad
blocker working with the chrome session.

## Requirements

- Python3 + PIP3
- Chrome Installed

## Setup

1. Download the files from the repository.

   ```bash
   git clone https://github.com/gheatherington/HianimeDownloader
   ```

2. Navigate into the directory it was downloaded to in your terminal.
3. Using pip install all the requirement from the `requirements.txt` file.
   - For Windows

     ```bash
      pip install -r requirements.txt
     ```

   - For Linux/macOS you may have to first create a virtual environment, so use the following commands.

     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     python3 -m pip install -r requirements.txt
     ```

4. You are now ready to run the program with the following command.
   - Windows

     ```bash
      python main.py
     ```

   - Linux/MacOS

     ```bash
      python3 main.py
     ```

## Usage

- Update the repository before running (as it is still being worked on)

  ```bash
  git fetch https://github.com/gheatherington/HianimeDownloader
  ```

- After running the `main.py` file, enter the name of the anime you would like to search for
  from [hianime.to](hianime.to) or provide a link to the content you would like to download

- If you provided a link you will jump to either the [Downloading from HiAnime](#downloading-from-hianime) or [Downloading from Other](#downloading-from-other-platforms)
- If you enter a name of an anime it will bring up a selection of anime options from the site, select the desired one with the corresponding number.

### Downloading From HiAnime

- Next you will be prompted to either select which version of the anime you would like; either sub or dub. If only one
  was available, it will be automatically selected for you.
- The next two prompts ask which episodes you want to download. You first provide the first episode, then the last
  episode you would like to download (both values are inclusive)
- The next prompt asks what season in the series this content is as an integer.
- The final prompt asks you which of the streaming servers you would like to download from (HD-1, HD-2, etc.)
- **Note** if a redirect ad to a second tab is created, close the second tab manually and refresh the original site to
  continue download. (This will hopefully be patched eventually)

### Downloading from other platforms

- Depending on the platform ([view list of supported platforms](#supported-platforms)) you will either be prompted to select a file name or it will be automatically chosen for you

## Options

You are able to pass parameters when running the file to add additional options.

- `-o` or `--output-dir` lets you provide a path for the output files. For example,

  ```bash
  python3 main.py -o ~/Movies/
  ```

- `-l` or `--link` allows you to pass in a link to the content you want to download

- `-n` or `--filename` allows you to pass in the name of the anime you are looking for, or the filename for the downloaded content from [other platforms](#supported-platforms)

- `--no-subtitles` downloads the content without looking for subtitle files

- `--server` allows you to select the streaming server you would like to downlaod from.

- `--aria` uses the aria2c downloader for yt-dlp to download the content (untested)

### Usage Example

```bash
python3 main.py -o ~/Desktop/ --server "HD-1" -n "Solo Leveling" --no-subtitles

```

## Supported Platforms

Here is a current list of tested platforms

- TikTok
- Youtube (long form videos/shorts)
- Instagram (reels/images)
