"""
Fix/Re-encode crof.mp4 into multiple Windows Media Player-compatible versions.

The original video:
  - Codec: H.264 (avc1) High profile
  - Resolution: 1920x1080, 60fps
  - Pixel format: yuv420p (good)
  - Level: 42 (4.2) — some WMP versions only support up to 4.1
  - No audio stream
  - Duration: ~16s

We generate several variants so at least one plays properly.
"""

import subprocess
import sys
from pathlib import Path

INPUT = Path(__file__).parent / "crof.mp4"

def run_ffmpeg(cmd, description):
    """Run an ffmpeg command and print status."""
    print(f"\n{'='*60}")
    print(f">> {description}")
    print(f"{'='*60}")
    print(f"  Running: {' '.join(str(c) for c in cmd)}")
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        if result.stdout:
            for line in result.stdout.strip().splitlines():
                print(f"  {line}")
        print(f"  [OK] Done!")
    except subprocess.CalledProcessError as e:
        print(f"  [FAILED] (exit code {e.returncode})")
        if e.stderr:
            for line in e.stderr.strip().splitlines()[-10:]:
                print(f"  ! {line}")
        return False
    return True


def main():
    if not INPUT.exists():
        print(f"[ERROR] Input file not found: {INPUT}")
        sys.exit(1)

    size_mb = INPUT.stat().st_size / (1024 * 1024)
    print(f"Input: {INPUT.name} ({size_mb:.1f} MB)")

    # ──────────────────────────────────────────────
    # 1. Simple remux — fixes container metadata only (fastest)
    # ──────────────────────────────────────────────
    out1 = INPUT.parent / "crof_fixed_remux.mp4"
    run_ffmpeg([
        "ffmpeg", "-y",
        "-i", str(INPUT),
        "-map", "0:v:0",
        "-c", "copy",
        "-movflags", "+faststart",
        str(out1)
    ], "1/4: Quick remux (fix container metadata only)")

    # ──────────────────────────────────────────────
    # 2. Re-encode with Level 4.1 + silent audio track (best compatibility)
    # ──────────────────────────────────────────────
    out2 = INPUT.parent / "crof_fixed_wmp.mp4"
    run_ffmpeg([
        "ffmpeg", "-y",
        "-i", str(INPUT),
        # Add a silent AAC audio track (WMP hates video-only files)
        "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-profile:v", "high",
        "-level", "4.1",                    # WMP-safe level
        "-preset", "fast",
        "-crf", "18",
        "-c:a", "aac",
        "-b:a", "128k",
        "-shortest",
        "-movflags", "+faststart",
        str(out2)
    ], "2/4: Re-encode with Level 4.1 + silent audio (WMP-optimized)")

    # ──────────────────────────────────────────────
    # 3. Re-encode with Level 4.1 + NO audio (just re-encode)
    # ──────────────────────────────────────────────
    out3 = INPUT.parent / "crof_fixed_level41.mp4"
    run_ffmpeg([
        "ffmpeg", "-y",
        "-i", str(INPUT),
        "-map", "0:v:0",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-profile:v", "high",
        "-level", "4.1",
        "-preset", "fast",
        "-crf", "18",
        "-movflags", "+faststart",
        str(out3)
    ], "3/4: Re-encode with Level 4.1 (video-only, re-encoded)")

    # ──────────────────────────────────────────────
    # 4. Downscaled 720p version (fallback)
    # ──────────────────────────────────────────────
    out4 = INPUT.parent / "crof_fixed_720p.mp4"
    run_ffmpeg([
        "ffmpeg", "-y",
        "-i", str(INPUT),
        "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-profile:v", "high",
        "-level", "4.1",
        "-preset", "fast",
        "-crf", "18",
        "-vf", "scale=1280:720",
        "-c:a", "aac",
        "-b:a", "128k",
        "-shortest",
        "-movflags", "+faststart",
        str(out4)
    ], "4/4: Downscaled 720p + silent audio (ultimate fallback)")


    # ──────────────────────────────────────────────
    # Summary
    # ──────────────────────────────────────────────
    print(f"\n{'='*60}")
    print("[DONE] ALL DONE! Generated files:")
    print(f"{'='*60}")
    for f in [out1, out2, out3, out4]:
        if f.exists():
            mb = f.stat().st_size / (1024 * 1024)
            print(f"  [OK] {f.name} ({mb:.1f} MB)")
        else:
            print(f"  [FAIL] {f.name}")
    print()
    print("Try them in order:")
    print(f"  1. {out1.name} -- quick remux (try first)")
    print(f"  2. {out2.name} -- level 4.1 + silent audio (recommended for WMP)")
    print(f"  3. {out3.name} -- level 4.1 only")
    print(f"  4. {out4.name} -- 720p fallback")


if __name__ == "__main__":
    main()
