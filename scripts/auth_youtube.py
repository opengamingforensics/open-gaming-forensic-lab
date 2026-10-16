#!/usr/bin/env python3
"""
scripts/auth_youtube.py - Interactive OAuth 2.0 Authenticator for Open Gaming Forensic Lab

Usage:
    python3 scripts/auth_youtube.py [--port 8080]

Authorizes the @OpenGamingForensics channel and saves the valid token to config/token.json.
"""

import sys
import argparse
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from scripts.youtube_manager import YouTubeManager

def main():
    parser = argparse.ArgumentParser(description="Authorize YouTube Channel for Open Gaming Forensic Lab")
    parser.add_argument("--port", type=int, default=8080, help="Local redirect port (default: 8080)")
    args = parser.parse_args()

    print("=" * 70)
    print("  OPEN GAMING FORENSIC LAB - YOUTUBE AUTHENTICATION")
    print("=" * 70)

    yt = YouTubeManager()
    yt.authenticate(port=args.port)

    info = yt.channel_info
    if info.get("status") == "connected":
        print("\n" + "=" * 70)
        print("  AUTHENTICATION SUCCESSFUL!")
        print(f"  Channel Title : {info.get('title')}")
        print(f"  Channel ID    : {info.get('id')}")
        print(f"  Handle        : {info.get('handle')}")
        print(f"  Subscribers   : {info.get('subscribers')}")
        print("=" * 70)
    else:
        print(f"\n[WARNING] Authorization finished but channel status is: {info}")

if __name__ == "__main__":
    main()
