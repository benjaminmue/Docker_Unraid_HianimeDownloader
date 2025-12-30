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


def write_to_episode_log(episode_log_files: Dict[int, object], ep_num: Optional[int], line: str):
    """Write a line to the appropriate episode log file."""
    if ep_num is not None and ep_num in episode_log_files:
        try:
            episode_log_files[ep_num].write(line)
        except (IOError, ValueError):
            pass  # File might be closed or invalid


async def run_with_progress(job_id: int, db_path: str, command: list):
    """Run command and emit episode-specific progress based on output patterns."""
    db = Database(db_path)

    # Episode tracking state - support parallel processing
    active_episodes: Dict[int, Dict] = {}  # episode_number -> episode data
    episode_map: Dict[int, int] = {}  # episode_number -> episode_id
    episode_log_files: Dict[int, object] = {}  # episode_number -> open file handle
    last_episode_searching: Optional[int] = None  # Track last episode that started searching (for ambiguous patterns)
    last_ytdlp_episode: Optional[int] = None  # Track which episode YT-DLP is currently downloading
    total_episodes = 0
    completed_episodes = 0

    # Get log directory from job log file
    job_log_dir = Path(db_path).parent / "logs"
    job_log_dir.mkdir(parents=True, exist_ok=True)

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
                active_episodes[ep_num] = {"id": episode_id, "number": ep_num, "title": ep_title}
                last_episode_searching = ep_num  # Track for ambiguous patterns

                # Create per-episode log file
                episode_log_path = job_log_dir / f"job_{job_id}_episode_{ep_num}.log"
                episode_log_files[ep_num] = open(episode_log_path, "w", buffering=1)  # Line buffered

                # Update database with log file path
                await db.update_episode(
                    episode_id,
                    status=EpisodeStatus.GET_STREAM.value,
                    progress_percent=10,
                    stage_data={},
                    log_file=str(episode_log_path)
                )

                # Write initial log entry
                episode_log_files[ep_num].write(f"=== Episode {ep_num}: {ep_title} ===\n")
                episode_log_files[ep_num].write(clean_line)

                await emit_progress(
                    db, job_id,
                    STAGE_PROGRESS[JobStage.DOWNLOAD],
                    JobStage.DOWNLOAD.value,
                    f"Episode {ep_num}: Finding stream..."
                )

            # Pattern: "Episode X: Starting download..." - explicit episode download start
            episode_download_start = re.search(r"Episode\s+(\d+):\s+Starting download", clean_line, re.IGNORECASE)
            if episode_download_start:
                ep_num = int(episode_download_start.group(1))
                if ep_num in active_episodes:
                    write_to_episode_log(episode_log_files, ep_num, clean_line)
                    episode_id = active_episodes[ep_num]["id"]
                    await db.update_episode(
                        episode_id,
                        status=EpisodeStatus.DOWNLOAD_VIDEO.value,
                        progress_percent=30,
                        stage_data={}
                    )
                    await emit_progress(
                        db, job_id,
                        STAGE_PROGRESS[JobStage.DOWNLOAD],
                        JobStage.DOWNLOAD.value,
                        f"Episode {ep_num}: Downloading video..."
                    )

            # Pattern: "Episode X: Download completed!" - explicit episode completion
            episode_completed = re.search(r"Episode\s+(\d+):\s+Download completed", clean_line, re.IGNORECASE)
            if episode_completed:
                ep_num = int(episode_completed.group(1))
                if ep_num in active_episodes:
                    write_to_episode_log(episode_log_files, ep_num, clean_line)
                    episode_id = active_episodes[ep_num]["id"]
                    await db.update_episode(
                        episode_id,
                        status=EpisodeStatus.COMPLETE.value,
                        progress_percent=100,
                        stage_data={}
                    )
                    completed_episodes += 1
                    # Close episode log file
                    if ep_num in episode_log_files:
                        episode_log_files[ep_num].close()
                        del episode_log_files[ep_num]
                    # Remove from active episodes
                    del active_episodes[ep_num]

            # Pattern: No streams found (episode failed)
            no_stream_match = re.search(r"No \.m3u8 streams found|No streams found|Could not find.*stream", clean_line, re.IGNORECASE)
            if last_episode_searching is not None and no_stream_match:
                ep_num = last_episode_searching
                if ep_num in active_episodes:
                    write_to_episode_log(episode_log_files, ep_num, clean_line)
                    error_msg = "No streams found for this episode"
                    await db.update_episode(
                        active_episodes[ep_num]["id"],
                        status=EpisodeStatus.FAILED.value,
                        error_message=error_msg,
                        stage_data={}
                    )
                    await emit_progress(
                        db, job_id,
                        STAGE_PROGRESS[JobStage.DOWNLOAD],
                        JobStage.DOWNLOAD.value,
                        f"Episode {ep_num}: {error_msg}"
                    )
                    # Close episode log file
                    if ep_num in episode_log_files:
                        episode_log_files[ep_num].close()
                        del episode_log_files[ep_num]
                    # Remove failed episode from active episodes
                    del active_episodes[ep_num]
                    last_episode_searching = None
                continue

            # Pattern: Clicked play button (stream found)
            if last_episode_searching is not None and re.search(r"Clicked play button:|Found MASTER m3u8:", clean_line):
                ep_num = last_episode_searching
                if ep_num in active_episodes:
                    write_to_episode_log(episode_log_files, ep_num, clean_line)
                    await db.update_episode(
                        active_episodes[ep_num]["id"],
                        status=EpisodeStatus.DOWNLOAD_VIDEO.value,
                        progress_percent=20,
                        stage_data={}
                    )

            # Pattern: YT-DLP download progress
            # [YT-DLP] Destination: /downloads/.../s01e06 - Title.mp4
            yt_dlp_dest_match = re.search(r"\[YT-DLP\]\s+Destination:\s+(.+)", clean_line)
            if yt_dlp_dest_match:
                dest_path = yt_dlp_dest_match.group(1).strip()
                # Extract episode number from filename pattern like "s01e06"
                ep_match = re.search(r"s\d+e(\d+)", dest_path, re.IGNORECASE)
                if ep_match:
                    ep_num = int(ep_match.group(1))
                    last_ytdlp_episode = ep_num  # Track which episode YT-DLP is downloading
                    if ep_num in active_episodes:
                        write_to_episode_log(episode_log_files, ep_num, clean_line)
                        episode_id = active_episodes[ep_num]["id"]
                        await db.update_episode(
                            episode_id,
                            status=EpisodeStatus.DOWNLOAD_VIDEO.value,
                            progress_percent=30,
                            stage_data={}
                        )
                        await emit_progress(
                            db, job_id,
                            STAGE_PROGRESS[JobStage.DOWNLOAD],
                            JobStage.DOWNLOAD.value,
                            f"Episode {ep_num}: Downloading video..."
                        )

            # Pattern: YT-DLP progress percentage with details
            # [YT-DLP]  45.2% of ~ 165.16MiB at 7.25MiB/s ETA 00:27 (frag 19/311)
            yt_dlp_progress_match = re.search(
                r"\[YT-DLP\]\s+(\d+(?:\.\d+)?)\s*%\s+of\s+~?\s+([\d.]+\w+)\s+at\s+([\d.]+\w+/s)\s+ETA\s+([\d:]+)\s+\(frag\s+(\d+)/(\d+)\)",
                clean_line
            )
            if yt_dlp_progress_match and last_ytdlp_episode is not None:
                try:
                    ep_num = last_ytdlp_episode
                    if ep_num in active_episodes:
                        write_to_episode_log(episode_log_files, ep_num, clean_line)
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
                            active_episodes[ep_num]["id"],
                            status=EpisodeStatus.DOWNLOAD_VIDEO.value,
                            progress_percent=episode_percent,
                            stage_data=stage_data
                        )
                except (ValueError, IndexError):
                    pass

            # Pattern: Merging fragments
            if last_ytdlp_episode is not None and re.search(r"Merging|muxing|ffmpeg.*concat", clean_line, re.IGNORECASE):
                ep_num = last_ytdlp_episode
                if ep_num in active_episodes:
                    write_to_episode_log(episode_log_files, ep_num, clean_line)
                    await db.update_episode(
                        active_episodes[ep_num]["id"],
                        status=EpisodeStatus.MERGE_VIDEO.value,
                        progress_percent=92,
                        stage_data={}
                    )
                    await emit_progress(
                        db, job_id,
                        STAGE_PROGRESS[JobStage.POSTPROCESS],
                        JobStage.POSTPROCESS.value,
                        f"Episode {ep_num}: Merging video..."
                    )

            # Pattern: Subtitle download
            if last_ytdlp_episode is not None and re.search(r"\.vtt", clean_line, re.IGNORECASE):
                ep_num = last_ytdlp_episode
                if ep_num in active_episodes:
                    write_to_episode_log(episode_log_files, ep_num, clean_line)
                    # Check if it's a skip message or actual download
                    if "Skipping" not in clean_line:
                        await db.update_episode(
                            active_episodes[ep_num]["id"],
                            status=EpisodeStatus.DOWNLOAD_SUBTITLES.value,
                            progress_percent=95,
                            stage_data={}
                        )
                        await emit_progress(
                            db, job_id,
                            STAGE_PROGRESS[JobStage.DOWNLOAD],
                            JobStage.DOWNLOAD.value,
                            f"Episode {ep_num}: Downloading subtitles..."
                        )
                    else:
                        # No subtitles, mark complete
                        await db.update_episode(
                            active_episodes[ep_num]["id"],
                            status=EpisodeStatus.COMPLETE.value,
                            progress_percent=100,
                            stage_data={}
                        )
                        completed_episodes += 1
                        # Close episode log file
                        if ep_num in episode_log_files:
                            episode_log_files[ep_num].close()
                            del episode_log_files[ep_num]
                        del active_episodes[ep_num]

        # Wait for completion
        return_code = process.wait()

        # Handle remaining active episodes (combined approach: status checking + failure marking)
        # Fix: Check actual status, mark stuck episodes as failed, provide accurate feedback
        if return_code == 0:
            incomplete_episodes = []
            failed_episodes = []

            for ep_num, episode_data in list(active_episodes.items()):
                # Query actual episode status from database
                episode = await db.get_episode(episode_data["id"])

                if episode:
                    current_status = episode["status"]

                    if current_status == EpisodeStatus.COMPLETE.value:
                        # Episode already completed, just clean up
                        if ep_num in episode_log_files:
                            episode_log_files[ep_num].close()
                            del episode_log_files[ep_num]
                    elif current_status == EpisodeStatus.FAILED.value:
                        # Already marked as failed
                        failed_episodes.append(ep_num)
                        if ep_num in episode_log_files:
                            episode_log_files[ep_num].close()
                            del episode_log_files[ep_num]
                    else:
                        # Episode stuck in non-terminal state - mark as failed
                        incomplete_episodes.append(ep_num)
                        error_msg = "Episode did not complete before process exit"
                        await db.update_episode(
                            episode_data["id"],
                            status=EpisodeStatus.FAILED.value,
                            error_message=error_msg,
                            stage_data={}
                        )
                        print(f"WARNING: Episode {ep_num} did not complete - marked as failed", flush=True)

                        if ep_num in episode_log_files:
                            episode_log_files[ep_num].close()
                            del episode_log_files[ep_num]

            # Provide accurate completion feedback
            if incomplete_episodes or failed_episodes:
                all_failed = incomplete_episodes + failed_episodes
                await emit_progress(
                    db, job_id,
                    STAGE_PROGRESS[JobStage.DOWNLOAD],
                    JobStage.DOWNLOAD.value,
                    f"{len(all_failed)} episode(s) failed"
                )
                print(f"WARNING: Process exited with {len(all_failed)} failed episode(s): {all_failed}", flush=True)
            else:
                # All episodes genuinely completed
                await emit_progress(db, job_id, 100, JobStage.DONE.value, "All episodes downloaded")
        else:
            print(f"PROGRESS: {json.dumps({'percent': 0, 'stage': 'failed', 'text': f'Exit code {return_code}'})}", flush=True)

        # Close any remaining log files
        for ep_num in list(episode_log_files.keys()):
            try:
                episode_log_files[ep_num].close()
            except:
                pass
            del episode_log_files[ep_num]

        return return_code

    except Exception as e:
        print(f"PROGRESS: {json.dumps({'percent': 0, 'stage': 'failed', 'text': str(e)})}", flush=True)
        # Mark all active episodes as failed
        for ep_num, episode_data in active_episodes.items():
            await db.update_episode(
                episode_data["id"],
                status=EpisodeStatus.FAILED.value,
                error_message=str(e),
                stage_data={}
            )
        # Close all log files
        for ep_num in list(episode_log_files.keys()):
            try:
                episode_log_files[ep_num].close()
            except:
                pass
            del episode_log_files[ep_num]
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
