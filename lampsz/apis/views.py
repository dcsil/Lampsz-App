import uuid

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated

from lampsz.apis import models, serializers


@api_view(["POST"])
def company_login_view(request, *args, **kwargs):
    if request.user.IsAuthenticated():
        return JsonResponse(
            {"message": "Alreayd logged in"}, status=status.HTTP_400_BAD_REQUEST
        )
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse(
            {"message": "Login successful"}, status=status.HTTP_404_NOT_FOUND
        )
    else:
        return JsonResponse(
            {"message": "This user either doesn't exist or username/password invalid"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_influencer_view(request, influencer_id, *args, **kwargs):
    try:
        influencer = models.Influencer.objects.get(pk=influencer_id)
    except models.Influencer.DoesNotExist:
        return JsonResponse(
            {"message": "The Influencer does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )
    if influencer.user.id != request.user.id:
        return JsonResponse(
            {"message": "This user is not authorized to access this data"},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    influencer_serializer = serializers.InfluencerSerializer(influencer, many=False)
    return JsonResponse(influencer_serializer.data)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def company_detail_view(request, company_id, *args, **kwargs):
    try:
        company = models.Company.objects.get(pk=company_id)
    except models.Company.DoesNotExist:
        return JsonResponse(
            {"message": "The Company does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    if company.user.id != request.user.id:
        return JsonResponse(
            {"message": "This user is not authorized to access this data"},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    if request.method == "GET":
        company_serializer = serializers.CompanySerializer(company, many=False)
        return JsonResponse(company_serializer.data)
    elif request.method == "PUT":
        company_data = request.data
        company_serializer = serializers.CompanySerializer(
            company, data=company_data, partial=True
        )
        if company_serializer.is_valid():
            company_serializer.save()
            return JsonResponse(company_serializer.data)
        else:
            return JsonResponse(
                company_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
    return JsonResponse(company_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_view(request, user_id, *args, **kwargs):
    if request.user.id != user_id:
        return JsonResponse(
            {"message": "This user is not authorized to access this data"},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return JsonResponse(
            {"message": "The Influencer does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )
    user_serializer = serializers.UserSerializer(user, many=False)
    return JsonResponse(user_serializer.data)


@api_view(["POST"])
def company_create_view(request, *args, **kwargs):
    user_data = request.data
    user_serializer = serializers.UserSerializer(data=user_data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        login(request, user)
        company = models.Company.objects.create(user=user)
        company_serializer = serializers.CompanySerializer(company, many=False)
        return JsonResponse(company_serializer.data, status=status.HTTP_201_CREATED)
    elif "username" in user_serializer.errors:
        return JsonResponse(user_serializer.errors, status=status.HTTP_409_CONFLICT)
    else:
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def influencer_create_view(request, *args, **kwargs):
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
def tiktok_auth_view(request, *args, **kwargs):
    CLIENT_KEY = "SET_LATER"
    csrfState = str(uuid.uuid1())
    url = "https://www.tiktok.com/auth/authorize/"
    response = redirect(url)
    response.set_cookie("csrfState", csrfState, max_age=6000)
    queryString = "?"
    queryString += "client_key=" + CLIENT_KEY
    queryString += "&scope=user.info.basic,video.list"
    queryString += "&response_type=code"
    queryString += "&redirect_uri=localhost:8000/api/redirectTT"
    queryString += "&state=" + csrfState
    response["Location"] += queryString
    return response


@api_view(["POST"])
def create_marketing_task(request):
    data = JSONParser().parse(request)
    serializer = serializers.MarketingTaskSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)
