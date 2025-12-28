# <span style="color: #FF9BCF">Optional Arguments Reference</span>

This document lists all available optional command-line arguments that can be used in the "Extra Arguments" field when creating downloads via the WebGUI, or when running the CLI directly.

## <span style="color: #FF9BCF">Quick Reference</span>

| Argument | Type | Default | Description | Example |
|----------|------|---------|-------------|---------|
| `--no-subtitles` | flag | `false` | Skip downloading subtitle files (.vtt) | `--no-subtitles` |
| `--aria` | flag | `false` | Use aria2c as external downloader for faster downloads | `--aria` |
| `--server` | string | *(auto)* | Specify streaming server to use | `--server HD-1` |
| `--download-type` | choice | *(prompt)* | Skip prompts for sub/dub selection | `--download-type sub` |
| `--ep-from` | integer | *(prompt)* | First episode number to download | `--ep-from 1` |
| `--ep-to` | integer | *(prompt)* | Last episode number to download | `--ep-to 12` |
| `--season` | integer | *(prompt)* | Season number | `--season 2` |
| `-o, --output-dir` | path | `/downloads` | Output directory (usually set by Docker) | `--output-dir /custom/path` |
| `-n, --filename` | string | *(auto)* | Custom filename or anime name | `--filename "My Anime"` |

## <span style="color: #FF9BCF">Detailed Descriptions</span>

### `--no-subtitles`

**Type:** Flag (no value needed)
**Default:** `false` (subtitles are downloaded)

Skip downloading subtitle files (.vtt). Use this if you don't want subtitles or if the source doesn't have them.

**Examples:**
```bash
--no-subtitles
```

**WebGUI Usage:**
```
Extra Arguments: --no-subtitles
```

---

### `--aria`

**Type:** Flag (no value needed)
**Default:** `true` (enabled by default for faster downloads)

Use aria2c as the external downloader. This is **enabled by default** as it significantly speeds up downloads, especially for large files or slow connections. You can disable it by setting `ARIA=false` in your environment variables.

**Requirements:** aria2 must be installed (included in Docker image)

**Examples:**
```bash
--aria
```

**WebGUI Usage:**
```
Extra Arguments: --aria
```

---

### `--server`

**Type:** String
**Default:** *(auto-selected)*
**Common Values:** `HD-1`, `HD-2`, `Vidstreaming`, `Vidcloud`

Specify which streaming server to download from. Different servers may have different quality options and availability.

**Examples:**
```bash
--server HD-1
--server Vidstreaming
```

**WebGUI Usage:**
```
Extra Arguments: --server HD-1
```

---

### `--download-type`

**Type:** Choice (`sub` or `dub`)
**Default:** *(prompts user)*

Specify whether to download subtitled (sub) or dubbed (dub) version. Use this to skip the interactive prompt.

**Examples:**
```bash
--download-type sub
--download-type dub
```

**WebGUI Usage:**
```
Profile: Subtitle  (or use Extra Arguments: --download-type sub)
```

**Note:** This is usually set via the "Output Profile" dropdown in WebGUI, but can also be specified here.

---

### `--ep-from` and `--ep-to`

**Type:** Integer
**Default:** *(prompts user)*

Define the episode range to download. Both values are inclusive.

**Examples:**
```bash
# Download episodes 1 through 12
--ep-from 1 --ep-to 12

# Download only episode 5
--ep-from 5 --ep-to 5

# Download episodes 10 to 24
--ep-from 10 --ep-to 24
```

**WebGUI Usage:**
```
Episode From: 1
Episode To: 12
```

Or in Extra Arguments:
```
Extra Arguments: --ep-from 1 --ep-to 12
```

**Note:** These are usually set via the "Episode From/To" fields in WebGUI, but can also be specified here for more complex scenarios.

---

### `--season`

**Type:** Integer
**Default:** *(prompts user or defaults to 1)*

Specify the season number to download.

**Examples:**
```bash
--season 1
--season 2
```

**WebGUI Usage:**
```
Season Number: 2
```

Or in Extra Arguments:
```
Extra Arguments: --season 2
```

---

### `--output-dir` / `-o`

**Type:** Path
**Default:** `/downloads` (set by Docker `OUTPUT_DIR`)

Specify a custom output directory. **In Docker environments, this is usually set via the volume mount and should not be changed.**

**Examples:**
```bash
-o /custom/output
--output-dir /downloads/anime
```

**WebGUI Usage:**
```
Extra Arguments: --output-dir /downloads/anime
```

**Note:** When using Docker, it's better to change the volume mount in `docker-compose.yml` rather than using this argument.

---

### `--filename` / `-n`

**Type:** String
**Default:** *(auto-detected from URL)*

Specify a custom filename or anime name. Useful for organizing downloads or when the auto-detected name is incorrect.

**Examples:**
```bash
-n "My Hero Academia"
--filename "Attack on Titan - Season 4"
```

**WebGUI Usage:**
```
Extra Arguments: --filename "Custom Anime Name"
```

---

## Common Combinations

### Fast download with aria2c, no subtitles
```
--aria --no-subtitles
```

### Download specific episodes from season 2
```
--season 2 --ep-from 1 --ep-to 12
```

### Use specific server and skip subtitles
```
--server HD-1 --no-subtitles
```

### Fast download with custom filename
```
--aria --filename "My Anime - S01"
```

### Complete example for episode range
```
--download-type sub --season 1 --ep-from 1 --ep-to 24 --server HD-1 --aria
```

---

## WebGUI Field Mapping

When using the WebGUI, some arguments have dedicated fields:

| WebGUI Field | Equivalent Argument |
|--------------|---------------------|
| Output Profile (sub/dub) | `--download-type sub` or `--download-type dub` |
| Episode From | `--ep-from <number>` |
| Episode To | `--ep-to <number>` |
| Season Number | `--season <number>` |

**Best Practice:** Use the dedicated WebGUI fields when available, and only use "Extra Arguments" for flags like `--aria`, `--no-subtitles`, or `--server`.

---

## Tips

1. **Faster Downloads:** Always use `--aria` for faster download speeds
2. **Server Issues:** If a download fails, try a different server with `--server HD-2` or `--server Vidstreaming`
3. **No Subtitles:** Add `--no-subtitles` if subtitles aren't needed or causing issues
4. **Batch Downloads:** Use `--ep-from` and `--ep-to` to download entire seasons efficiently
5. **Custom Names:** Use `--filename` to organize downloads with specific naming conventions

---

## Docker Environment Variable Equivalents

Some arguments can also be set as environment variables in Docker:

| Argument | Environment Variable | docker-compose.yml |
|----------|---------------------|-------------------|
| `--aria` | `ARIA=true` | `ARIA: "true"` |
| `--download-type` | `DOWNLOAD_TYPE=sub` | `DOWNLOAD_TYPE: sub` |
| `--ep-from` | `EP_FROM=1` | `EP_FROM: 1` |
| `--ep-to` | `EP_TO=12` | `EP_TO: 12` |
| `--season` | `SEASON=2` | `SEASON: 2` |
| `--server` | `SERVER=HD-1` | `SERVER: HD-1` |

**Note:** WebGUI mode typically doesn't use these environment variables - they're primarily for CLI mode.
