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
    except models.Influencer.DoesNotExist or models.Company.DoesNotExist or models.User.DoesNotExist:
        return Response(
            {"message": "The User does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )
    if user.get_user_type() == utils.UserType.INFLUENCER:
        influencer_serializer = serializers.InfluencerSerializer(influencer, many=False)
        data = dict(influencer_serializer.data)
        data["userType"] = user.get_user_type().value
        services.get_youtube_channel_detail(data, influencer.channel_id)
        return Response(data, status=status.HTTP_200_OK)
    else:
        company_serializer = serializers.CompanySerializer(company, many=False)
        data = dict(company_serializer.data)
        data["userType"] = user.get_user_type().value
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
    influencer_data = request.data
    influencer_serializer = serializers.InfluencerSerializer(influencer, many=False)
    influencer_serializer.update(influencer, influencer_data)
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
    company_data = request.data
    company_serializer = serializers.CompanySerializer(company, many=False)
    company_serializer.update(company, company_data)
    return Response(company_serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def create_marketing_task(request):
    data = {}
    data["company_id"] = request.data["user_id"]

    data["title"] = request.data["title"]
    data["description"] = request.data["description"]
    data["deliverables"] = request.data["deliverables"]
    data["compensation"] = float(request.data["compensation"])
    data["posted_date"] = request.data["posted_date"]
    data["end_date"] = request.data["end_date"]
    data["location"] = request.data["location"]
    data["image"] = request.data["image"]

    serializer = serializers.MarketingTaskSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)

    return Response({"message": "successful"}, status=200)


@api_view(["POST"])
def get_marketing_tasks(request):
    query = request.data["query"]
    location = request.data["location"]

    qs = models.MarketingTask.objects.filter(
        Q(title__contains=query)
        | Q(description__contains=query)
        | Q(deliverables__contains=query)
    )
    if location != "":
        qs = qs.filter(location=location)

    results = []
    for task in qs:
        serializer = serializers.MarketingTaskSerializer(task)
        results.append(serializer.data)

    print(results)
    return Response({"tasks": results}, status=200)
