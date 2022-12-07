from typing import Any

import en_core_web_lg
import requests
from django.conf import settings
from django.contrib.auth import login
from django.core.handlers.wsgi import WSGIRequest
from google.auth.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build

from lampsz.apis.models import Influencer, MarketingTask, User

# Constants
YOUTUBE_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
OAUTH_SERVICE_NAME = "oauth2"
OAUTH_API_VERSION = "v2"

CHANNEL_URL = "https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails%2Cstatistics"
PLAY_LIST_URL = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet"
VIDEO_EMBED_URL = "https://www.youtube.com/embed/"

SCOPES = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]

# Load spacy
nlp = en_core_web_lg.load()


def login_user(request: WSGIRequest, user: User) -> None:
    """Simple helper function that logs user in and update session content.

    :param request: request the view received.
    :param user: the user being logged in.
    """
    login(request, user)
    request.session["user_type"] = user.get_user_type()


def credentials_to_dict(credentials: Credentials) -> dict[str, str]:  # pragma: no cover
    """Converts Google authentication credential object into dictionary.

    :param credentials: Google authentication credential object.
    :return: dictionary containing credential info.
    """
    return {
        "token": credentials.token,
        "refresh_token": credentials.refresh_token,
        "token_uri": credentials.token_uri,
        "client_id": credentials.client_id,
        "client_secret": credentials.client_secret,
        "scopes": credentials.scopes,
    }


def get_oauth_flow(redirect_uri: str, state: str = None) -> Flow:  # pragma: no cover
    """Create new Google OAuth Flow object.

    :param redirect_uri: the redirect uri for Google OAuth flow.
    :param state: the CSRF token for Google OAuth flow.
    :return:
    """
    return Flow.from_client_config(
        settings.GOOGLE_CLIENT_SECRETS,
        redirect_uri=redirect_uri,
        scopes=SCOPES,
        state=state,
    )


def get_authorization_url(redirect_uri: str) -> tuple[str, str]:  # pragma: no cover
    """Get Google authorization URL and state.

    :param redirect_uri: the redirect uri for Google OAuth flow.
    :return: the authorization URL and state CSRF token.
    """
    flow = get_oauth_flow(redirect_uri)

    # Generate URL for request to Google's OAuth 2.0 server.
    # Use kwargs to set optional request parameters.
    return flow.authorization_url(
        # Enable offline access so that you can refresh an access token without
        # re-prompting the user for permission. Recommended for web server apps.
        access_type="offline",
        # Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes="true",
    )


def get_access_token(
    redirect_uri: str, response_url: str, state: str
) -> Credentials:  # pragma: no cover
    """Get Google API access token.

    :param redirect_uri: the redirect uri for Google OAuth flow.
    :param response_url: the authorization response URL.
    :param state: the CSRF token for Google OAuth flow.
    :return: a Google OAuth Credentials object that contains the access token.
    """
    flow = get_oauth_flow(redirect_uri, state)

    # Use the authorization server's response to fetch the OAuth 2.0 tokens.
    flow.fetch_token(authorization_response=response_url)
    return flow.credentials


def get_google_user_info(
    credentials: Credentials,
) -> dict[str, Any]:  # pragma: no cover
    """Get Google user info associated with the given OAuth credential.

    :param credentials: the Google OAuth Credential object.
    :return: dictionary containing user info.
    """
    oauth2 = build(OAUTH_SERVICE_NAME, OAUTH_API_VERSION, credentials=credentials)
    return oauth2.userinfo().get().execute()


def get_youtube_channel_info(
    credentials: Credentials,
) -> dict[str, Any]:  # pragma: no cover
    """Get YouTube channel info associated with the given OAuth credential.

    :param credentials: the Google OAuth Credential object.
    :return: dictionary containing YouTube channel info.
    """
    youtube = build(YOUTUBE_SERVICE_NAME, YOUTUBE_API_VERSION, credentials=credentials)
    channel = youtube.channels().list(mine=True, part="snippet").execute()
    if "items" not in channel:
        return {}

    item = channel["items"][0]
    snippet = item["snippet"]
    return {
        "id": item["id"],
        "channel_name": snippet["title"],
        "description": snippet["description"],
        "channel_url": f"https://www.youtube.com/{snippet['customUrl']}",
        "thumbnail": snippet["thumbnails"]["default"]["url"],
        "country": snippet.get("country", ""),
    }


def get_youtube_channel_video_info(
    channel_id: str, max_videos: int = 4
) -> dict[str, Any]:  # pragma: no cover
    """Get YouTube channel video info given channel ID.

    :param channel_id: the ID of the YouTube channel to query info for.
    :param max_videos: the maximum number of videos to return in video list.
    :return: a dictionary consisting subscribers, views, videos and video list.
    """
    url = f"{CHANNEL_URL}&id={channel_id}&key={settings.GOOGLE_API_KEY}"
    channel_data = requests.get(url).json()
    if "items" not in channel_data:
        return {"subscribers": 0, "views": 0, "videos": 0, "video_list": []}

    subscribers, views, videos = 0, 0, 0
    for item in channel_data["items"]:
        subscribers += int(item["statistics"]["subscriberCount"])
        views += int(item["statistics"]["viewCount"])
        videos += int(item["statistics"]["videoCount"])

    video_list = []
    for item in channel_data["items"]:
        if len(video_list) >= max_videos:
            break

        playlist_id = item["contentDetails"]["relatedPlaylists"]["uploads"]
        video_list.extend(get_youtube_playlist_detail(playlist_id))

    return {
        "subscribers": subscribers,
        "views": views,
        "videos": videos,
        "video_list": video_list,
    }


def get_youtube_playlist_detail(playlist_id: str) -> list[str]:  # pragma: no cover
    """Get YouTube playlist details given the playlist ID.

    :param playlist_id: the ID of the YouTube playlist.
    :return: a list of video embed URL from the playlist.
    """
    url = f"{PLAY_LIST_URL}&playlistId={playlist_id}&key={settings.GOOGLE_API_KEY}"
    playlist_data = requests.get(url).json()
    if "error" in playlist_data:
        return []

    return [
        f'{VIDEO_EMBED_URL}{item["snippet"]["resourceId"]["videoId"]}'
        for item in playlist_data["items"]
    ]


def get_similarity_score(task: MarketingTask, influencer: Influencer) -> float:
    """Compute the text similarity score between a marketing task an influencer.

    :param task: the marketing task object
    :param influencer: the influencer object
    :return: a similarity score based on description, location and title texts.
    """
    location_sim = nlp(task.location).similarity(nlp(influencer.location))

    task_data = f"{task.title} {task.description}"
    application_data = f"{influencer.description}"
    description_sim = nlp(task_data).similarity(nlp(application_data))
    return location_sim + description_sim
