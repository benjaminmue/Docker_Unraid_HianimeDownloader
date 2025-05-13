# HianimeDownloader

A simple CLI tool for downloading content from the streaming platform [hianime.to](hianime.to). \
This tool works best if you have a VPN installed with adblocker support, as I have not been able to get a working ad
blocker working with the chrome session.

## Requirements

* Python3 + PIP3
* Chrome Installed

## Setup

1. Download the files from the repository
2. Navigate into the directory it was downloaded to
3. Using pip install all the requirement from the ```requirements.txt``` file.
    + For Windows
      ```bash
       pip install -r requirements.txt
      ```
    + For Linux/macOS you may have to first create a virtual environment, so use the following commands
        ```bash
       python3 -m venv venv
       source venv/bin/activate
       python3 -m pip install -r requirements.txt
        ```
4. You are now ready to run the program with the following command
    + Windows
      ```bash 
       python main.py
       ```
    + Linux/MacOS
      ```bash
       python3 main.py
      ```

## Usage

+ After running the ```main.py``` file, enter the name of the anime you would like to search for
  from [hianime.to](hianime.to)
+ This will bring up a selection of options from the site, select the desired one with the corresponding number.
+ Next you will be prompted to either select which version of the anime you would like; either sub or dub. If only one
  was available, it will be automatically selected for you.
+ The next two prompts ask which episodes you want to download. You first provide the first episode, then the last
  episode you would like to download (both values are inclusive)
+ The final prompt asks what season in the series this content is as an integer.

## Options

You are able to pass parameters when running the file to add additional options.

+ ```-o ``` or ```--output-dir``` lets you provide a path for the output files. For example,
    ```bash
    python3 main.py -o ~/Movies/
    ```
+ ```--no-subtitles``` downloads the content without looking for subtitle files
+ ```--aria``` uses the aria2c downloader for yt-dlp to download the content (untested)