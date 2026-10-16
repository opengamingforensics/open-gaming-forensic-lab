#!/usr/bin/env python3
"""
scripts/upload_ep01.py - Automated Publishing Pipeline for EP01: The $100 Billion Illusion

Uploads:
- Video: releases/EP01-dark-patents/video.mp4 (410MB master)
- Thumbnail: releases/EP01-dark-patents/thumbnail.jpg
- Metadata: releases/EP01-dark-patents/metadata.md
- Pinned Comment: releases/EP01-dark-patents/pinned_comment.md
"""

import os
import sys
import json
import logging
import argparse
from pathlib import Path
from datetime import datetime, timezone

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from scripts.youtube_manager import YouTubeManager

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("UploadEP01")

def parse_metadata(metadata_file: Path):
    """Parses title, description, and tags from metadata.md."""
    content = metadata_file.read_text(encoding="utf-8")
    
    title = "The $100 Billion Illusion: Reverse-Engineering Mobile Gaming's Dark Patents"
    description = ""
    tags = []
    
    # Extract Title
    if "# Title" in content:
        title_section = content.split("# Title")[1]
        lines = [line.strip() for line in title_section.split("\n") if line.strip()]
        if lines:
            title = lines[0]
            
    # Extract Description
    if "# Description" in content:
        desc_part = content.split("# Description")[1]
        if "TAGS:" in desc_part:
            description = desc_part.split("TAGS:")[0].strip()
            tags_part = desc_part.split("TAGS:")[1].strip()
            tags = [t.strip() for t in tags_part.split(",") if t.strip()]
        else:
            description = desc_part.strip()
            
    return title, description, tags

def main():
    parser = argparse.ArgumentParser(description="Upload EP01 to Open Gaming Forensic Lab YouTube Channel")
    parser.add_argument("--privacy", default="public", choices=["public", "unlisted", "private"], help="Video privacy status (default: public)")
    parser.add_argument("--port", type=int, default=8080, help="OAuth local callback port")
    args = parser.parse_args()

    ep_dir = PROJECT_ROOT / "releases" / "EP01-dark-patents"
    video_path = ep_dir / "video.mp4"
    thumb_path = ep_dir / "thumbnail.jpg"
    meta_path = ep_dir / "metadata.md"
    pin_path = ep_dir / "pinned_comment.md"
    manifest_path = ep_dir / "manifest.json"

    if not video_path.exists():
        logger.error(f"Master video not found at: {video_path}")
        sys.exit(1)

    title, description, tags = parse_metadata(meta_path)
    logger.info(f"Loaded title: {title}")
    logger.info(f"Tags count: {len(tags)}")

    pinned_comment = ""
    if pin_path.exists():
        pinned_comment = pin_path.read_text(encoding="utf-8").strip()

    yt = YouTubeManager()
    
    # 1. Authenticate / Initialize client
    logger.info("Initializing YouTube Data API client...")
    yt.authenticate(port=args.port)
    
    if yt.channel_info.get("status") != "connected":
        logger.error(f"Channel not properly connected: {yt.channel_info}")
        sys.exit(1)

    logger.info(f"Target Channel: {yt.channel_info.get('title')} ({yt.channel_info.get('handle')})")

    # 2. Upload Video + Thumbnail
    upload_result = yt.upload_video(
        video_path=str(video_path),
        title=title,
        description=description,
        tags=tags,
        category_id="20",  # Gaming
        privacy_status=args.privacy,
        thumbnail_path=str(thumb_path) if thumb_path.exists() else None,
        made_for_kids=False
    )

    video_id = upload_result.get("video_id")
    video_url = upload_result.get("url")

    # 3. Post Official Top Comment
    comment_id = None
    if video_id and pinned_comment:
        logger.info("Posting official docket discussion comment...")
        comment_id = yt.post_pinned_comment(video_id, pinned_comment)

    # 4. Update Manifest & Write Upload Receipt
    now_iso = datetime.now(timezone.utc).isoformat()
    receipt = {
        "channel_id": yt.channel_info.get("id"),
        "channel_title": yt.channel_info.get("title"),
        "episode_id": "EP01",
        "video_id": video_id,
        "video_url": video_url,
        "title": title,
        "privacy": args.privacy,
        "uploaded_at": now_iso,
        "comment_id": comment_id,
        "status": "PUBLISHED" if args.privacy == "public" else "STAGED"
    }

    receipt_file = ep_dir / "upload_receipt.json"
    with open(receipt_file, "w", encoding="utf-8") as f:
        json.dump(receipt, f, indent=2, ensure_ascii=False)
    logger.info(f"Upload receipt written to: {receipt_file}")

    if manifest_path.exists():
        try:
            with open(manifest_path, "r", encoding="utf-8") as f:
                manifest_data = json.load(f)
            manifest_data["status"] = "PUBLISHED" if args.privacy == "public" else "UPLOADED"
            manifest_data["video_id"] = video_id
            manifest_data["video_url"] = video_url
            manifest_data["uploaded_at"] = now_iso
            with open(manifest_path, "w", encoding="utf-8") as f:
                json.dump(manifest_data, f, indent=2, ensure_ascii=False)
            logger.info("Updated manifest.json with live YouTube details.")
        except Exception as e:
            logger.warning(f"Could not update manifest.json: {e}")

    print("\n" + "=" * 70)
    print("  EP01 PUBLISH COMPLETE")
    print(f"  Channel : {yt.channel_info.get('title')} ({yt.channel_info.get('handle')})")
    print(f"  Title   : {title}")
    print(f"  URL     : {video_url}")
    print(f"  Privacy : {args.privacy.upper()}")
    print("=" * 70 + "\n")

if __name__ == "__main__":
    main()
