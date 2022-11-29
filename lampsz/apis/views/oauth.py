from django.conf import settings
from django.shortcuts import redirect
from django.urls import reverse
from google_auth_oauthlib.flow import Flow
from oauthlib.oauth2 import AccessDeniedError

from lampsz.apis.models import Influencer, User
from lampsz.apis.services import (
    credentials_to_dict,
    get_google_user_info,
    get_youtube_channel_details,
    login_user,
)

# Constants
SCOPES = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]


def authorize(request):
    flow = Flow.from_client_secrets_file(
        settings.GOOGLE_CLIENT_SECRETS_FILE, scopes=SCOPES
    )

    flow.redirect_uri = request.build_absolute_uri(reverse("oauth2callback"))
    # Generate URL for request to Google's OAuth 2.0 server.
    # Use kwargs to set optional request parameters.
    authorization_url, state = flow.authorization_url(
        # Enable offline access so that you can refresh an access token without
        # re-prompting the user for permission. Recommended for web server apps.
        access_type="offline",
        # Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes="true",
    )
    request.session["state"] = state
    return redirect(authorization_url)


def oauth2callback(request):
    state = request.session["state"]
    flow = Flow.from_client_secrets_file(
        settings.GOOGLE_CLIENT_SECRETS_FILE, scopes=SCOPES, state=state
    )
    flow.redirect_uri = request.build_absolute_uri(reverse("oauth2callback"))

    # Use the authorization server's response to fetch the OAuth 2.0 tokens.
    authorization_response = request.build_absolute_uri().replace("http", "https")
    try:
        flow.fetch_token(authorization_response=authorization_response)
    except AccessDeniedError:
        # Redirect back to login page if user doesn't give consent
        return redirect("/login")

    # Store credentials in the session.
    # ACTION ITEM: In a production app, you likely want to save these
    #              credentials in a persistent database instead.
    credentials = flow.credentials
    request.session["credentials"] = credentials_to_dict(credentials)

    # Get Google user info and Youtube channel detail
    user_info = get_google_user_info(credentials)
    channel_detail = get_youtube_channel_details(credentials)

    # Log user in if user associated with the Google account already exists,
    # else create a new user
    user = User.objects.filter(username=user_info["id"]).first()
    if user is not None:
        login_user(request, user)
        return redirect("/")

    user = User.objects.create_user(
        username=user_info["id"], email=user_info["email"], is_influencer=True
    )
    user.save()

    # We assume if user object doesn't exist, then it's corresponding
    # influencer object doesn't exist either
    influencer = Influencer.objects.create(
        user=user,
        description=channel_detail["description"],
        home_page=channel_detail["channel_url"],
        thumbnail_url=channel_detail["thumbnail"],
        location=channel_detail["country"],
    )
    influencer.save()

    login_user(request, user)
    return redirect("/")
