from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from lampsz.apis import models, serializers, services, utils


@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def public_user_detail(request, user_id):
    try:
        user = models.User.objects.get(id=user_id)
        if user.is_influencer:
            influencer = models.Influencer.objects.filter(user=user).first()
        else:
            company = models.Company.objects.filter(user=user).first()
    except models.User.DoesNotExist:
        return Response(
            {"message": "The User does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )
    if user.get_user_type() == utils.UserType.INFLUENCER:
        influencer_serializer = serializers.InfluencerSerializer(influencer, many=False)
        data = dict(influencer_serializer.data)
        data.update({"user_type": user.get_user_type().value})
        data.update(services.get_youtube_channel_detail_by_id(influencer.channel_id))
        return Response(data, status=status.HTTP_200_OK)
    else:
        company_serializer = serializers.CompanySerializer(company, many=False)
        data = dict(company_serializer.data)
        data["userType"] = user.get_user_type().value
        data["marketing_task"] = company.marketingtask_set.all()
        return Response(data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def influencer_edit_view(request, user_id):
    try:
        user = models.User.objects.get(id=user_id)
        influencer = models.Influencer.objects.filter(user=user).first()
    except models.Influencer.DoesNotExist:
        return Response(
            {"message": "The Influencer does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )
    if influencer.user.id != request.user.id:
        return Response(
            {"message": "This user is not authorized to access this data"},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    data = request.data
    authorized_data = {
        "location": data["location"],
        "age": data["age"],
        "description": data["description"],
    }
    influencer_serializer = serializers.InfluencerSerializer(influencer, many=False)
    influencer_serializer.update(influencer, authorized_data)
    return Response(influencer_serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def company_edit_view(request, user_id):
    try:
        user = models.User.objects.get(id=user_id)
        company = models.Company.objects.filter(user=user).first()
    except models.Company.DoesNotExist:
        return Response(
            {"message": "The Company does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    if company.user.id != request.user.id:
        return Response(
            {"message": "This user is not authorized to access this data"},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    data = request.data
    authorized_data = {"location": data["location"], "industry": data["industry"]}
    company_serializer = serializers.CompanySerializer(company, many=False)
    company_serializer.update(company, authorized_data)
    return Response(company_serializer.data, status=status.HTTP_200_OK)
