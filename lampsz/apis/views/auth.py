from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework import status
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated

from lampsz.apis import models, serializers
from lampsz.apis.utils import UserType, has_unique_error

__all__ = [
    "login_successful",
    "bad_credentials",
    "csrf_set",
    "company_login_view",
    "company_create_view",
    "influencer_create_view",
    "logout_view",
    "get_session_view",
    "get_csrf",
]

# Response messages
login_successful = "Login successful"
bad_credentials = "Incorrect username or password!"
csrf_set = "CSRF cookie set"


@api_view(["POST"])
def company_login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse(
            {"message": bad_credentials}, status=status.HTTP_404_NOT_FOUND
        )

    login(request, user)
    request.session["userType"] = UserType.BUSINESS.value
    return JsonResponse(
        {
            "userId": request.user.id,
            "username": request.user.username,
            "userType": request.session.get("userType", 0),
            "message": login_successful,
        }
    )


@api_view(["GET"])
def logout_view(request):
    logout(request)
    return JsonResponse({}, status=status.HTTP_200_OK)


@api_view(["POST"])
def company_create_view(request):
    user_serializer = serializers.UserSerializer(data=request.data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        models.Company.objects.create(user=user)
        login(request, user)
        request.session["userType"] = UserType.BUSINESS.value
        return JsonResponse(
            {
                "userId": request.user.id,
                "username": request.user.username,
                "userType": request.session.get("userType", 0),
            },
            status=status.HTTP_201_CREATED,
        )

    errors = user_serializer.errors
    if has_unique_error("username", errors) or has_unique_error("email", errors):
        return JsonResponse(errors, status=status.HTTP_409_CONFLICT)
    else:
        return JsonResponse(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def influencer_create_view(request):
    influencer_data = request.data
    influencer_serializer = serializers.InfluencerSerializer(data=influencer_data)
    if influencer_serializer.is_valid():
        influencer = influencer_serializer.save()
        login(request, influencer.user)
        return JsonResponse(influencer_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(
        influencer_serializer.errors, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET"])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def get_session_view(request):
    return JsonResponse(
        {
            "userId": request.user.id,
            "username": request.user.username,
            "userType": request.session.get("userType", 0),
        }
    )


def get_csrf(request):
    response = JsonResponse({"detail": csrf_set})
    response["X-CSRFToken"] = get_token(request)
    return response
