import uuid

from django.http import JsonResponse
from django.shortcuts import redirect
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated

from lampsz.apis import models, serializers


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def influencer_detail_view(request, influencer_id):
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
    if request.method == "GET":
        influencer_serializer = serializers.InfluencerSerializer(influencer, many=False)
        return JsonResponse(influencer_serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        influencer_data = request.data
        influencer_serializer = serializers.InfluencerSerializer(
            influencer, data=influencer_data, partial=True
        )
        if influencer_serializer.is_valid():
            influencer_serializer.save()
            return JsonResponse(influencer_serializer.data)
        else:
            return JsonResponse(
                influencer_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
    return JsonResponse(
        influencer_serializer.errors, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def company_detail_view(request, company_id):
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
        return JsonResponse(company_serializer.data, status=status.HTTP_200_OK)
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
