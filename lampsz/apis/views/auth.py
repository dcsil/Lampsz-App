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


@api_view(["POST"])
def company_login_view(request):
    print(request.user)
    username = request.data.get("username")
    password = request.data.get("password")
    user_type = request.data.get("userType")
    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse(
            {"message": "Incorrect username or password!"},
            status=status.HTTP_404_NOT_FOUND,
        )

    login(request, user)
    request.session["userType"] = user_type
    user_id = models.Company.objects.get(user_id=user.id).id
    return JsonResponse({"id": user_id, "message": "Login successful"})


@api_view(["GET"])
def user_logout(request):
    logout(request)
    return JsonResponse({}, status=status.HTTP_200_OK)


@api_view(["POST"])
def company_create_view(request):
    user_serializer = serializers.UserSerializer(data=request.data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        login(request, user)
        company = models.Company.objects.create(user=user)
        company_serializer = serializers.CompanySerializer(company, many=False)
        return JsonResponse(company_serializer.data, status=status.HTTP_201_CREATED)

    errors = user_serializer.errors
    if [error for error in errors.get("username") if error.code == "unique"]:
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
    return JsonResponse({"userType": request.session.get("userType", 0)})


def get_csrf(request):
    response = JsonResponse({"detail": "CSRF cookie set"})
    response["X-CSRFToken"] = get_token(request)
    return response
