#!/usr/bin/env python3
"""
scripts/youtube_manager.py - Open Gaming Forensic Lab YouTube Publishing & Channel Operations Engine

Handles end-to-end YouTube channel management:
1. OAuth 2.0 authentication with persistent token storage.
2. Resumable chunked video uploading with forensic SEO metadata.
3. High-CTR 1280x720 / 8K custom thumbnail deployment.
4. Channel community & pinned comment posting.
5. Playlist organization.
"""

import os
import sys
import json
import time
import logging
from pathlib import Path
from typing import Dict, List, Optional, Any

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from googleapiclient.errors import HttpError

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("OGFL_YouTubeManager")

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CONFIG_DIR = PROJECT_ROOT / "config"
DEFAULT_CLIENT_SECRET = CONFIG_DIR / "client_secret.json"
DEFAULT_TOKEN_FILE = CONFIG_DIR / "token.json"

SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.force-ssl",
    "https://www.googleapis.com/auth/youtubepartner"
]

class YouTubeManager:
    def __init__(
        self,
        client_secret_path: Optional[Path] = None,
        token_path: Optional[Path] = None
    ):
        self.client_secret_path = client_secret_path or DEFAULT_CLIENT_SECRET
        self.token_path = token_path or DEFAULT_TOKEN_FILE
        self.youtube = None
        self.channel_info = {}

    def authenticate(self, port: int = 8080) -> Any:
        """Authenticates with YouTube Data API v3 and persists token."""
        creds = None
        
        if self.token_path.exists():
            try:
                with open(self.token_path, "r", encoding="utf-8") as f:
                    token_data = json.load(f)
                
                # Check if it's a mock/sandbox token
                if "OGFL_SANDBOX" in str(token_data.get("refresh_token", "")):
                    logger.warning("Existing token.json contains placeholder/sandbox credentials. Refreshing via OAuth flow...")
                    creds = None
                else:
                    creds = Credentials.from_authorized_user_info(token_data, SCOPES)
            except Exception as e:
                logger.warning(f"Failed to read existing token ({e}), will re-authenticate.")
                creds = None

        if creds and creds.expired and creds.refresh_token:
            try:
                logger.info("Refreshing expired YouTube OAuth access token...")
                creds.refresh(Request())
                with open(self.token_path, "w", encoding="utf-8") as f:
                    f.write(creds.to_json())
                logger.info("[OK] Access token refreshed.")
            except Exception as e:
                logger.warning(f"Token refresh failed: {e}. Re-authenticating...")
                creds = None

        if not creds or not creds.valid:
            if not self.client_secret_path.exists():
                raise FileNotFoundError(
                    f"Client secret not found at: {self.client_secret_path}. "
                    "Please provide a valid Google Cloud OAuth 2.0 client_secret.json."
                )
            
            logger.info("=" * 70)
            logger.info("OPEN GAMING FORENSIC LAB - YOUTUBE API AUTHORIZATION")
            logger.info(f"Client Secret: {self.client_secret_path}")
            logger.info(f"Target Token: {self.token_path}")
            logger.info("=" * 70)
            
            flow = InstalledAppFlow.from_client_secrets_file(
                str(self.client_secret_path),
                scopes=SCOPES
            )
            
            logger.info(f"Launching local OAuth web server on http://localhost:{port} ...")
            logger.info("A browser window will open. Please log in with the Google Account managing @OpenGamingForensics.")
            
            creds = flow.run_local_server(
                host="localhost",
                port=port,
                authorization_prompt_message="Please visit this URL to authorize OGFL: {url}",
                success_message="Open Gaming Forensic Lab authorization successful! You can safely close this browser tab.",
                open_browser=True,
                access_type="offline",
                prompt="consent"
            )
            
            self.token_path.parent.mkdir(parents=True, exist_ok=True)
            with open(self.token_path, "w", encoding="utf-8") as f:
                f.write(creds.to_json())
            logger.info(f"[SUCCESS] Credentials securely saved to: {self.token_path}")

        self.youtube = build("youtube", "v3", credentials=creds)
        self.refresh_channel_info()
        return self.youtube

    def refresh_channel_info(self) -> Dict[str, Any]:
        """Fetches and caches basic channel information."""
        if not self.youtube:
            return {}
        try:
            res = self.youtube.channels().list(mine=True, part="snippet,statistics").execute()
            items = res.get("items", [])
            if items:
                ch = items[0]
                self.channel_info = {
                    "id": ch["id"],
                    "title": ch["snippet"]["title"],
                    "handle": ch["snippet"].get("customUrl", ""),
                    "subscribers": ch["statistics"].get("subscriberCount", 0),
                    "videos": ch["statistics"].get("videoCount", 0),
                    "views": ch["statistics"].get("viewCount", 0),
                    "status": "connected"
                }
                logger.info(f"Authenticated as: [{self.channel_info['title']}] ({self.channel_info['handle']} / {self.channel_info['id']})")
            else:
                self.channel_info = {"status": "no_channel"}
                logger.warning("No YouTube channel found for the authenticated account.")
        except Exception as e:
            logger.error(f"Error fetching channel info: {e}")
            self.channel_info = {"status": "error", "error": str(e)}
        return self.channel_info

    def upload_video(
        self,
        video_path: str,
        title: str,
        description: str,
        tags: Optional[List[str]] = None,
        category_id: str = "20",  # 20 = Gaming, 28 = Science & Technology
        privacy_status: str = "public",  # 'public', 'private', or 'unlisted'
        thumbnail_path: Optional[str] = None,
        publish_at: Optional[str] = None,
        made_for_kids: bool = False
    ) -> Dict[str, Any]:
        """Uploads video with resumable upload, custom thumbnail, and metadata."""
        if not self.youtube:
            self.authenticate()

        video_file = Path(video_path)
        if not video_file.exists():
            raise FileNotFoundError(f"Video file not found: {video_path}")

        file_size = video_file.stat().st_size
        logger.info(f"Preparing upload: {video_file.name} ({file_size / (1024*1024):.2f} MB)")
        logger.info(f"Title: {title}")
        logger.info(f"Privacy: {privacy_status}" + (f" (Scheduled: {publish_at})" if publish_at else ""))

        status_body: Dict[str, Any] = {
            "privacyStatus": "private" if publish_at else privacy_status,
            "selfDeclaredMadeForKids": made_for_kids
        }
        if publish_at:
            status_body["publishAt"] = publish_at

        body = {
            "snippet": {
                "title": title[:100],
                "description": description[:5000],
                "tags": tags or [],
                "categoryId": category_id,
                "defaultLanguage": "en",
                "defaultAudioLanguage": "en"
            },
            "status": status_body
        }

        # 8MB chunk size for fast and reliable upload
        chunksize = 8 * 1024 * 1024
        media = MediaFileUpload(
            str(video_file),
            chunksize=chunksize,
            resumable=True,
            mimetype="video/mp4"
        )

        request = self.youtube.videos().insert(
            part="snippet,status",
            body=body,
            media_body=media
        )

        response = None
        start_time = time.time()
        logger.info("Beginning resumable video upload...")

        while response is None:
            status, response = request.next_chunk()
            if status:
                pct = int(status.progress() * 100)
                elapsed = time.time() - start_time
                mb_uploaded = (status.progress() * file_size) / (1024 * 1024)
                speed = mb_uploaded / max(elapsed, 0.1)
                logger.info(f"Uploading: {pct}% complete ({mb_uploaded:.1f}/{file_size/(1024*1024):.1f} MB @ {speed:.2f} MB/s)")

        video_id = response.get("id")
        video_url = f"https://youtu.be/{video_id}"
        logger.info(f"[SUCCESS] Video uploaded successfully! Video ID: {video_id} -> {video_url}")

        # Set Custom Thumbnail if provided
        if thumbnail_path and os.path.exists(thumbnail_path):
            logger.info(f"Uploading custom thumbnail: {thumbnail_path} ...")
            try:
                thumb_media = MediaFileUpload(thumbnail_path, mimetype="image/jpeg")
                self.youtube.thumbnails().set(
                    videoId=video_id,
                    media_body=thumb_media
                ).execute()
                logger.info(f"[SUCCESS] Custom thumbnail uploaded for {video_id}")
            except Exception as e:
                logger.warning(f"Thumbnail upload encountered warning: {e}")

        return {
            "video_id": video_id,
            "url": video_url,
            "response": response
        }

    def post_pinned_comment(self, video_id: str, comment_text: str) -> Optional[str]:
        """Posts an official top-level comment on the uploaded video."""
        if not self.youtube:
            self.authenticate()

        try:
            body = {
                "snippet": {
                    "videoId": video_id,
                    "topLevelComment": {
                        "snippet": {
                            "textOriginal": comment_text
                        }
                    }
                }
            }
            res = self.youtube.commentThreads().insert(
                part="snippet",
                body=body
            ).execute()
            comment_id = res.get("id")
            logger.info(f"[SUCCESS] Official channel comment posted with ID: {comment_id}")
            return comment_id
        except Exception as e:
            logger.warning(f"Could not post comment automatically: {e}")
            return None

    def add_to_playlist(self, video_id: str, playlist_id: str) -> bool:
        """Adds an uploaded video to a specified playlist."""
        if not self.youtube:
            self.authenticate()

        try:
            body = {
                "snippet": {
                    "playlistId": playlist_id,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": video_id
                    }
                }
            }
            self.youtube.playlistItems().insert(
                part="snippet",
                body=body
            ).execute()
            logger.info(f"[SUCCESS] Added video {video_id} to playlist {playlist_id}")
            return True
        except Exception as e:
            logger.warning(f"Could not add to playlist {playlist_id}: {e}")
            return False
