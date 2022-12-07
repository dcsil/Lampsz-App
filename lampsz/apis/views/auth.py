from typing import Any

from django.contrib import messages
from django.contrib.auth import authenticate, logout
from django.contrib.messages import get_messages
from django.core.handlers.wsgi import WSGIRequest
from rest_framework import status
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from lampsz.apis.models import Company, Influencer, User
from lampsz.apis.serializers import UserSerializer
from lampsz.apis.services import login_user
from lampsz.apis.utils import UserType, has_unique_error

__all__ = [
    "bad_credentials",
    "csrf_set",
    "login_success",
    "logout_success",
    "login_view",
    "register_view",
    "logout_view",
    "get_session_view",
    "get_auth_messages_view",
]

# Response messages
bad_credentials = "Incorrect username or password!"
csrf_set = "CSRF cookie set"
login_success = "Login successful!"
logout_success = "Logout successful!"
register_success = "Successfully register and login!"


@api_view(["POST"])
def login_view(request):
    """
    Login user and returns user ID, username, and user type if credentials are
    valid, otherwise respond with 404 Not Found.
    """
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({"message": bad_credentials}, status=status.HTTP_404_NOT_FOUND)

    login_user(request, user)
    messages.success(request, login_success)
    return Response(get_auth_success_data(request))


@api_view(["GET"])
def logout_view(request):
    """
    Wrapper around Django's built-in logout view that returns a JsonResponse.
    """
    logout(request)
    messages.success(request, logout_success)
    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
def register_view(request):
    """
    Creates a new User and Company object and returns user ID, username, and
    user type if register data is valid, otherwise return the validation errors.
    """
    user_serializer = UserSerializer(data=request.data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        Company.objects.create(user=user, company_name=request.data["company_name"])
        login_user(request, user)
        messages.success(request, register_success)
        return Response(get_auth_success_data(request), status=status.HTTP_201_CREATED)

    errors = user_serializer.errors
    if has_unique_error("username", errors) or has_unique_error("email", errors):
        return Response(errors, status=status.HTTP_409_CONFLICT)
    else:
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def get_session_view(request):
    """
    Returns user ID, username, and user type of the user that is logged in.
    """
    return Response(get_auth_success_data(request))


@api_view(["GET"])
def get_auth_messages_view(request):
    """
    Returns all the messages generated during authentication.
    """
    serialized = [
        {"message": message.message, "level": message.level_tag}
        for message in get_messages(request)
    ]
    return Response({"messages": serialized})


# Utility functions for auth.py
def get_user_display_name(user: User) -> str:
    """
    Returns the display name (e.g., company name, channel name) of the user.
    """
    if user.is_influencer:
        return Influencer.objects.get(pk=user.pk).channel_name
    else:
        return Company.objects.get(pk=user.pk).company_name


def get_auth_success_data(request: WSGIRequest) -> dict[str, Any]:
    """
    Returns success response data for authentication APIs.
    """
    return {
        "user_id": request.user.id,
        "display_name": get_user_display_name(request.user),
        "user_type": request.session.get("user_type", UserType.NONE),
    }
