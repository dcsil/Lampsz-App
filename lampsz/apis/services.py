from typing import Any

from django.contrib.auth import login
from django.core.handlers.wsgi import WSGIRequest
from google.auth.credentials import Credentials
from googleapiclient.discovery import build

from lampsz.apis.models import User

# Constants
YOUTUBE_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
OAUTH_SERVICE_NAME = "oauth2"
OAUTH_API_VERSION = "v2"


def login_user(request: WSGIRequest, user: User) -> None:
    """Simple helper function that logs user in and update session content.

    :param request: request the view received.
    :param user: the user being logged in.
    """
    login(request, user)
    request.session["user_type"] = user.get_user_type()


def credentials_to_dict(credentials: Credentials) -> dict[str, str]:
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


def get_google_user_info(credentials: Credentials) -> dict[str, Any]:
    """Get Google user info associated with the given OAuth credential.

    :param credentials: the Google OAuth Credential object.
    :return: dictionary containing user info.
    """
    oauth2 = build(OAUTH_SERVICE_NAME, OAUTH_API_VERSION, credentials=credentials)
    return oauth2.userinfo().get().execute()


def get_youtube_channel_details(credentials: Credentials) -> dict[str, Any]:
    """Get Youtube channel info associated with the given OAuth credential.

    :param credentials: the Google OAuth Credential object.
    :return: dictionary containing Youtube channel info.
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
