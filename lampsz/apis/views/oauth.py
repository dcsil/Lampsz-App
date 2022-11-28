from django.shortcuts import redirect
from django.urls import reverse
from google_auth_oauthlib.flow import Flow

from lampsz.apis.models import Influencer, User
from lampsz.apis.services import credentials_to_dict, get_youtube_channel_details

# Constants
CLIENT_SECRETS_FILE = "client_secret_dev.json"
SCOPES = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]


def authorize(request, user_id: int):
    flow = Flow.from_client_secrets_file(CLIENT_SECRETS_FILE, scopes=SCOPES)

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
    request.session["curr_user_id"] = user_id
    return redirect(authorization_url)


def oauth2callback(request):
    state = request.session["state"]
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES, state=state
    )
    flow.redirect_uri = request.build_absolute_uri(reverse("oauth2callback"))

    # Use the authorization server's response to fetch the OAuth 2.0 tokens.
    authorization_response = request.build_absolute_uri().replace("http", "https")
    flow.fetch_token(authorization_response=authorization_response)

    # Store credentials in the session.
    # ACTION ITEM: In a production app, you likely want to save these
    #              credentials in a persistent database instead.
    credentials = flow.credentials
    request.session["credentials"] = credentials_to_dict(credentials)

    # Get Youtube channel detail
    channel_detail = get_youtube_channel_details(credentials)

    # Get or create new user and influencer object
    influencer = Influencer.objects.create(
        user=User.objects.get(id=request.session["curr_user_id"]),
        description=channel_detail["description"],
        home_page=channel_detail["channel_url"],
        thumbnail_url=channel_detail["thumbnail"],
        location=channel_detail["country"],
    )
    influencer.save()

    return redirect("/login")
