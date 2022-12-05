from typing import Any

import requests
from django.conf import settings
from django.contrib.auth import login
from django.core.handlers.wsgi import WSGIRequest
from google.auth.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build

from lampsz.apis.models import User

# Constants
YOUTUBE_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
OAUTH_SERVICE_NAME = "oauth2"
OAUTH_API_VERSION = "v2"

SCOPES = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]


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


def get_youtube_channel_details(
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
        "title": snippet["title"],
        "description": snippet["description"],
        "channel_url": f"https://www.youtube.com/{snippet['customUrl']}",
        "thumbnail": snippet["thumbnails"]["default"]["url"],
        "country": snippet.get("country", ""),
    }


def get_youtube_channel_detail_by_id(channel_id: str) -> dict:
    data = {}
    url = (
        "https://youtube.googleapis.com/youtube/v3/channels?"
        f"part=contentDetails%2Cstatistics&id={channel_id}&key={settings.GOOGLE_API_KEY}"
    )
    channel_data = requests.get(url).json()
    subscribers, views, videos = 0, 0, 0
    if "items" not in channel_data:
        data["subscribers"] = subscribers
        data["views"] = views
        data["videos"] = videos
        data["videoList"] = []
        return data
    for item in channel_data["items"]:
        subscribers += int(item["statistics"]["subscriberCount"])
        views += int(item["statistics"]["viewCount"])
        videos += int(item["statistics"]["videoCount"])
    data["subscribers"] = subscribers
    data["views"] = views
    data["videos"] = videos
    data.update(
        get_youtube_playlist_detail(
            [
                i["contentDetails"]["relatedPlaylists"]["uploads"]
                for i in channel_data["items"]
            ],
        )
    )
    return data


def get_youtube_playlist_detail(playlist_ids: list) -> dict:
    data = {}
    video_lists = []
    for playlist_id in playlist_ids:
        url = (
            "https://youtube.googleapis.com/youtube/v3/playlistItems?"
            f"part=snippet&playlistId={playlist_id}&key={settings.GOOGLE_API_KEY}"
        )
        playlist_data = requests.get(url).json()
        for item in playlist_data["items"]:
            video_lists.append(
                "https://www.youtube.com/embed?v="
                + item["snippet"]["resourceId"]["videoId"]
            )
    data["video_list"] = video_lists
    return data
