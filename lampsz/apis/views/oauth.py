from django.contrib import messages
from django.shortcuts import redirect
from django.urls import reverse
from googleapiclient.errors import HttpError
from oauthlib.oauth2 import AccessDeniedError

from lampsz.apis.models import Influencer, User
from lampsz.apis.services import (
    credentials_to_dict,
    get_access_token,
    get_authorization_url,
    get_google_user_info,
    get_youtube_channel_details,
    login_user,
)
from lampsz.apis.utils import ensure_https_url
from lampsz.apis.views.auth import failed_consent, login_success


def authorize(request):  # pragma: no cover
    """
    View that obtains authorization URL and redirects user to Google OAuth page.
    """
    redirect_uri = request.build_absolute_uri(reverse("oauth2callback"))
    authorization_url, state = get_authorization_url(redirect_uri)
    request.session["state"] = state
    return redirect(authorization_url)


def oauth2callback(request):  # pragma: no cover
    """
    View that handles Google OAuth callback by performing several tasks:
      1. If user with given Google ID already exists, then simply login the user
      2. Otherwise, create a new User object along with an Influencer object
         using information obtained from Youtube Data API.

    Redirects user to home page if login/register succeeds, otherwise to login
    page.
    """
    try:
        state = request.session["state"]
        redirect_uri = request.build_absolute_uri(reverse("oauth2callback"))
        response_url = ensure_https_url(request.build_absolute_uri())
        credentials = get_access_token(redirect_uri, response_url, state)

        # Store credentials in the session.
        # ACTION ITEM: In a production app, you likely want to save these
        #              credentials in a persistent database instead.
        request.session["credentials"] = credentials_to_dict(credentials)

        # Get Google user info and Youtube channel detail
        user_info = get_google_user_info(credentials)
        channel_detail = get_youtube_channel_details(credentials)
    except (AccessDeniedError, HttpError):
        messages.error(request, failed_consent)
        # Redirect back to login page if user doesn't give consent
        return redirect("/login")

    # Log user in if user associated with the Google account already exists,
    # else create a new user
    user = User.objects.filter(username=user_info["id"]).first()
    if user is None:
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
            channel_id=channel_detail["id"],
        )
        influencer.save()

    login_user(request, user)
    messages.success(request, login_success)
    return redirect("/")
