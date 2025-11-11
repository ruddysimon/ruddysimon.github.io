# Video Compression Guide

## Current Issue
Your background video is **143MB**, which is way too large for web use. It should be **5-10MB maximum**.

## Recommended Video Specifications
- **Resolution**: 1920x1080 (1080p) or lower (1280x720 works great)
- **Duration**: 10-30 seconds (it loops anyway)
- **File Size**: 5-10MB maximum
- **Format**: MP4 (H.264 codec)
- **Frame Rate**: 24-30 fps
- **Bitrate**: 2-5 Mbps

## How to Compress Your Video

### Option 1: Using FFmpeg (Recommended - Best Quality)
If you have FFmpeg installed:

```bash
# Compress to ~5MB with good quality
ffmpeg -i your-video.mp4 -vcodec h264 -acodec aac -b:v 2M -b:a 128k -movflags +faststart -vf "scale=1920:1080:force_original_aspect_ratio=decrease" background-video.mp4

# Or for smaller file (720p, ~3-5MB)
ffmpeg -i your-video.mp4 -vcodec h264 -acodec aac -b:v 1.5M -b:a 96k -movflags +faststart -vf "scale=1280:720:force_original_aspect_ratio=decrease" background-video.mp4
```

### Option 2: Using HandBrake (Free GUI Tool)
1. Download HandBrake: https://handbrake.fr/
2. Open your video
3. Preset: "Fast 1080p30" or "Fast 720p30"
4. Adjust quality slider to target ~5MB file size
5. Export as MP4

### Option 3: Using Online Tools
- **CloudConvert**: https://cloudconvert.com/mp4-compressor
- **FreeConvert**: https://www.freeconvert.com/video-compressor
- **Clideo**: https://clideo.com/compress-video

### Option 4: Using QuickTime (Mac)
1. Open video in QuickTime
2. File → Export As → Web
3. Choose quality (Medium or Low for smaller size)

## Quick Test
After compression, check the file size:
```bash
ls -lh public/background-video.mp4
```

The file should be under 10MB. If it's still too large, reduce the resolution or bitrate further.

## Tips
- **Shorter is better**: If your video is long, use just a 10-30 second clip that loops well
- **Lower resolution**: 720p (1280x720) is often enough for background videos
- **Remove audio if not needed**: If you don't need sound, removing audio track saves space
- **Test the loop**: Make sure the end connects smoothly to the beginning

