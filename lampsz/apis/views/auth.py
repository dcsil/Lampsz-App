from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view

from lampsz.apis import models, serializers


@api_view(["POST"])
def user_login_view(request):
    # if request.user.IsAuthenticated():
    #     return JsonResponse(
    #         {"message": "Alreayd logged in"}, status=status.HTTP_400_BAD_REQUEST
    #     )
    print(request.user)
    username = request.data.get("username")
    password = request.data.get("password")
    userType = request.data.get("userType")
    print(username, password, userType)
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        if userType == 2:
            object_id = models.Influencer.objects.get(user_id=user.id).id
        else:
            object_id = models.Company.objects.get(user_id=user.id).id
        return JsonResponse(
            {"id": object_id, "message": "Login successful"},
            status=status.HTTP_200_OK,
        )
    else:
        return JsonResponse(
            {"message": "This user either doesn't exist or username/password invalid"},
            status=status.HTTP_404_NOT_FOUND,
        )


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
    elif "username" in user_serializer.errors:
        print(user_serializer.errors)
        return JsonResponse(user_serializer.errors, status=status.HTTP_409_CONFLICT)
    else:
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
