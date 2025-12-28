#!/usr/bin/env python3
"""
Progress wrapper that runs the existing download script and emits progress events.
This is a thin wrapper that doesn't contain provider-specific logic.
"""

import argparse
import asyncio
import json
import subprocess
import sys
import re
from pathlib import Path
from typing import Optional, Dict

# Add parent directory to path to import database
sys.path.insert(0, str(Path(__file__).parent.parent))

from webgui.database import Database, JobStage, STAGE_PROGRESS, EpisodeStatus


async def emit_progress(db: Database, job_id: int, percent: int, stage: str, text: str = ""):
    """Emit progress update."""
    print(f"PROGRESS: {json.dumps({'percent': percent, 'stage': stage, 'text': text})}", flush=True)
    await db.update_progress(job_id, percent, stage, text)


async def run_with_progress(job_id: int, db_path: str, command: list):
    """Run command and emit episode-specific progress based on output patterns."""
    db = Database(db_path)

    # Episode tracking state
    current_episode: Optional[Dict] = None
    episode_map: Dict[int, int] = {}  # episode_number -> episode_id
    total_episodes = 0
    completed_episodes = 0

    # ANSI color code regex for stripping
    ansi_escape = re.compile(r'\x1b\[[0-9;]*m')

    current_stage = JobStage.INIT
    await emit_progress(db, job_id, STAGE_PROGRESS[JobStage.INIT], JobStage.INIT.value, "Starting download")

    try:
        # Run command
        process = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )

        # Stream output and detect episode progress
        for line in iter(process.stdout.readline, ""):
            if not line:
                break

            # Strip ANSI color codes for pattern matching and display
            clean_line = ansi_escape.sub('', line)
            print(clean_line, end="", flush=True)  # Forward clean output

            # Pattern: Getting Episode X - Title from URL
            episode_start_match = re.search(
                r"Getting\s+Episode\s+(\d+)\s+-\s+(.+?)\s+from\s+https?://",
                clean_line,
                re.IGNORECASE
            )
            if episode_start_match:
                ep_num = int(episode_start_match.group(1))
                ep_title = episode_start_match.group(2).strip()

                # Create episode in database if not exists
                episode = await db.find_episode_by_number(job_id, ep_num)
                if not episode:
                    episode_id = await db.create_episode(job_id, ep_num, ep_title)
                    total_episodes += 1
                else:
                    episode_id = episode["id"]

                episode_map[ep_num] = episode_id
                current_episode = {"id": episode_id, "number": ep_num, "title": ep_title}

                # Update episode status to GET_STREAM
                await db.update_episode(episode_id, status=EpisodeStatus.GET_STREAM.value, progress_percent=10, stage_data={})
                await emit_progress(
                    db, job_id,
                    STAGE_PROGRESS[JobStage.DOWNLOAD],
                    JobStage.DOWNLOAD.value,
                    f"Episode {ep_num}: Finding stream..."
                )

            # Pattern: No streams found (episode failed)
            no_stream_match = re.search(r"No \.m3u8 streams found|No streams found|Could not find.*stream", clean_line, re.IGNORECASE)
            if current_episode and no_stream_match:
                error_msg = "No streams found for this episode"
                await db.update_episode(
                    current_episode["id"],
                    status=EpisodeStatus.FAILED.value,
                    error_message=error_msg,
                    stage_data={}
                )
                await emit_progress(
                    db, job_id,
                    STAGE_PROGRESS[JobStage.DOWNLOAD],
                    JobStage.DOWNLOAD.value,
                    f"Episode {current_episode['number']}: {error_msg}"
                )
                # Clear current episode so we don't update it further
                current_episode = None
                continue

            # Pattern: Clicked play button (stream found)
            if current_episode and re.search(r"Clicked play button:|Found MASTER m3u8:", clean_line):
                await db.update_episode(
                    current_episode["id"],
                    status=EpisodeStatus.DOWNLOAD_VIDEO.value,
                    progress_percent=20,
                    stage_data={}
                )

            # Pattern: YT-DLP download progress
            # [YT-DLP] Destination: /downloads/...
            yt_dlp_dest_match = re.search(r"\[YT-DLP\]\s+Destination:\s+(.+)", clean_line)
            if yt_dlp_dest_match and current_episode:
                dest_path = yt_dlp_dest_match.group(1).strip()
                # Extract episode from path to match current episode
                # Just mark episode as downloading video
                await db.update_episode(
                    current_episode["id"],
                    status=EpisodeStatus.DOWNLOAD_VIDEO.value,
                    progress_percent=30,
                    stage_data={}
                )
                await emit_progress(
                    db, job_id,
                    STAGE_PROGRESS[JobStage.DOWNLOAD],
                    JobStage.DOWNLOAD.value,
                    f"Episode {current_episode['number']}: Downloading video..."
                )

            # Pattern: YT-DLP progress percentage with details
            # [YT-DLP]  45.2% of ~ 165.16MiB at 7.25MiB/s ETA 00:27 (frag 19/311)
            yt_dlp_progress_match = re.search(
                r"\[YT-DLP\]\s+(\d+(?:\.\d+)?)\s*%\s+of\s+~?\s+([\d.]+\w+)\s+at\s+([\d.]+\w+/s)\s+ETA\s+([\d:]+)\s+\(frag\s+(\d+)/(\d+)\)",
                clean_line
            )
            if yt_dlp_progress_match and current_episode:
                try:
                    percent_value = float(yt_dlp_progress_match.group(1))
                    file_size = yt_dlp_progress_match.group(2)
                    speed = yt_dlp_progress_match.group(3)
                    eta = yt_dlp_progress_match.group(4)
                    current_frag = yt_dlp_progress_match.group(5)
                    total_frags = yt_dlp_progress_match.group(6)

                    # Map YT-DLP percentage (0-100) to episode progress (30-90)
                    episode_percent = int(30 + (percent_value / 100) * 60)

                    # Store detailed progress data
                    stage_data = {
                        "percent": percent_value,
                        "size": file_size,
                        "speed": speed,
                        "eta": eta,
                        "frag": f"{current_frag}/{total_frags}"
                    }

                    await db.update_episode(
                        current_episode["id"],
                        status=EpisodeStatus.DOWNLOAD_VIDEO.value,
                        progress_percent=episode_percent,
                        stage_data=stage_data
                    )
                except (ValueError, IndexError):
                    pass

            # Pattern: Merging fragments
            if current_episode and re.search(r"Merging|muxing|ffmpeg.*concat", clean_line, re.IGNORECASE):
                await db.update_episode(
                    current_episode["id"],
                    status=EpisodeStatus.MERGE_VIDEO.value,
                    progress_percent=92,
                    stage_data={}
                )
                await emit_progress(
                    db, job_id,
                    STAGE_PROGRESS[JobStage.POSTPROCESS],
                    JobStage.POSTPROCESS.value,
                    f"Episode {current_episode['number']}: Merging video..."
                )

            # Pattern: Subtitle download
            if current_episode and re.search(r"\.vtt", clean_line, re.IGNORECASE):
                # Check if it's a skip message or actual download
                if "Skipping" not in clean_line:
                    await db.update_episode(
                        current_episode["id"],
                        status=EpisodeStatus.DOWNLOAD_SUBTITLES.value,
                        progress_percent=95,
                        stage_data={}
                    )
                    await emit_progress(
                        db, job_id,
                        STAGE_PROGRESS[JobStage.DOWNLOAD],
                        JobStage.DOWNLOAD.value,
                        f"Episode {current_episode['number']}: Downloading subtitles..."
                    )
                else:
                    # No subtitles, mark complete
                    await db.update_episode(
                        current_episode["id"],
                        status=EpisodeStatus.COMPLETE.value,
                        progress_percent=100,
                        stage_data={}
                    )
                    completed_episodes += 1
                    current_episode = None

            # Pattern: Download complete (when next episode starts or end of output)
            # Mark previous episode complete when new episode starts
            if episode_start_match and current_episode and current_episode["number"] != ep_num:
                # Previous episode is done
                prev_ep = current_episode
                if prev_ep["id"] in episode_map.values():
                    prev_episode_data = await db.get_episode(prev_ep["id"])
                    if prev_episode_data and prev_episode_data["status"] != EpisodeStatus.COMPLETE.value:
                        await db.update_episode(
                            prev_ep["id"],
                            status=EpisodeStatus.COMPLETE.value,
                            progress_percent=100,
                            stage_data={}
                        )
                        completed_episodes += 1

        # Wait for completion
        return_code = process.wait()

        # Mark last episode as complete if needed
        if current_episode:
            await db.update_episode(
                current_episode["id"],
                status=EpisodeStatus.COMPLETE.value,
                progress_percent=100,
                stage_data={}
            )
            completed_episodes += 1

        if return_code == 0:
            await emit_progress(db, job_id, 100, JobStage.DONE.value, "All episodes downloaded")
        else:
            print(f"PROGRESS: {json.dumps({'percent': 0, 'stage': 'failed', 'text': f'Exit code {return_code}'})}", flush=True)

        return return_code

    except Exception as e:
        print(f"PROGRESS: {json.dumps({'percent': 0, 'stage': 'failed', 'text': str(e)})}", flush=True)
        if current_episode:
            await db.update_episode(
                current_episode["id"],
                status=EpisodeStatus.FAILED.value,
                error_message=str(e),
                stage_data={}
            )
        return 1


def main():
    parser = argparse.ArgumentParser(description="Progress wrapper for download jobs")
    parser.add_argument("--job-id", type=int, required=True, help="Job ID")
    parser.add_argument("--db-path", required=True, help="Database path")
    parser.add_argument("command", nargs=argparse.REMAINDER, help="Command to run")

    args = parser.parse_args()

    # Remove '--' separator if present
    command = args.command
    if command and command[0] == "--":
        command = command[1:]

    if not command:
        print("Error: No command specified", file=sys.stderr)
        sys.exit(1)

    # Run with progress tracking
    exit_code = asyncio.run(run_with_progress(args.job_id, args.db_path, command))
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
