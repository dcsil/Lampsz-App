from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from lampsz.apis import models, serializers, utils


@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def public_user_detail(request, user_id):
    try:
        user = models.User.objects.get(id=user_id)
        if user.is_influencer:
            influencer = models.Influencer.objects.filter(user=user).first()
        else:
            company = models.Company.objects.filter(user=user).first()
    except models.Influencer.DoesNotExist or models.Company.DoesNotExist or models.User.DoesNotExist:
        return JsonResponse(
            {"message": "The User does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )
    if user.get_user_type() == utils.UserType.INFLUENCER:
        influencer_serializer = serializers.InfluencerSerializer(influencer, many=False)
        data = dict(influencer_serializer.data)
        data["userType"] = user.get_user_type().value
        utils.get_youtube_channel_detail(data, influencer.channel_id)
        return JsonResponse(data, status=status.HTTP_200_OK)
    else:
        company_serializer = serializers.CompanySerializer(company, many=False)
        data = dict(company_serializer.data)
        data["userType"] = user.get_user_type().value
        return JsonResponse(data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def influencer_edit_view(request, user_id):
    try:
        user = models.User.objects.get(id=user_id)
        influencer = models.Influencer.objects.filter(user=user).first()
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
    influencer_data = request.data
    influencer_serializer = serializers.InfluencerSerializer(influencer, many=False)
    influencer_serializer.update(influencer, influencer_data)
    return JsonResponse(influencer_serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def company_edit_view(request, user_id):
    try:
        user = models.User.objects.get(id=user_id)
        company = models.Company.objects.filter(user=user).first()
    except models.Company.DoesNotExist:
        return JsonResponse(
            {"message": "The Company does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    if company.user.id != request.user.id:
        return JsonResponse(
            {"message": "This user is not authorized to access this data"},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    company_data = request.data
    company_serializer = serializers.CompanySerializer(company, many=False)
    company_serializer.update(company, company_data)
    return JsonResponse(company_serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def create_marketing_task(request):
    userId = request.data["userId"]
    data = {}
    data["company"] = models.Company.objects.filter(user_id=userId)[0].id

    data["title"] = request.data["title"]
    data["description"] = request.data["description"]
    data["deliverables"] = request.data["deliverables"]
    data["compensation"] = float(request.data["compensation"])
    data["posted_date"] = request.data["postedDate"]
    data["end_date"] = request.data["endDate"]
    data["location"] = request.data["location"]
    data["image"] = request.data["image"]

    serializer = serializers.MarketingTaskSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)

    return Response({"message": "successful"}, status=200)
