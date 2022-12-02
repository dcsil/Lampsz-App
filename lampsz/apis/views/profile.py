import json

from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

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
        publicInfluencerSerializer = serializers.PublicInfluencerSerializer(
            influencer, many=False
        )
        data = dict(publicInfluencerSerializer.data)
        data["userType"] = user.get_user_type().value
        return JsonResponse(data, status=status.HTTP_200_OK)
    else:
        company_serializer = serializers.CompanySerializer(company, many=False)
        data = dict(company_serializer.data)
        data["userType"] = user.get_user_type().value
        return JsonResponse(data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def public_influencer_detail(request, influencer_username):
    try:
        user = models.User.objects.get(username=influencer_username)
        influencer = models.Influencer.objects.get(user=user)
    except models.Influencer.DoesNotExist or models.User.DoesNotExist:
        return JsonResponse(
            {"message": "The User does not exist"},
            status=status.HTTP_404_NOT_FOUND,
        )
    publicInfluencerSerializer = serializers.PublicInfluencerSerializer(
        influencer, many=False
    )
    return JsonResponse(publicInfluencerSerializer.data, status=status.HTTP_200_OK)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def influencer_detail_view(request, user_id):
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
    if request.method == "GET":
        influencer_serializer = serializers.InfluencerSerializer(influencer, many=False)
        return JsonResponse(influencer_serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        influencer_data = request.data
        influencer_serializer = serializers.InfluencerSerializer(influencer, many=False)
        influencer_serializer.update(influencer, influencer_data)
        return JsonResponse(influencer_serializer.data, status=status.HTTP_200_OK)
    return JsonResponse(
        influencer_serializer.errors, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def company_detail_view(request, user_id):
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
    if request.method == "GET":
        company_serializer = serializers.CompanySerializer(company, many=False)
        return JsonResponse(company_serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        company_data = request.data
        company_serializer = serializers.CompanySerializer(company, many=False)
        company_serializer.update(company, company_data)
        return JsonResponse(company_serializer.data, status=status.HTTP_200_OK)
    return JsonResponse(company_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def create_marketing_task(request):
    userId = request.data["userId"]
    company = models.Company.objects.filter(user_id=userId)[0]
    title = request.data["title"]
    description = request.data["description"]
    deliverables = request.data["deliverables"]
    compensation = float(request.data["compensation"])
    posted_date = request.data["postedDate"]
    end_date = request.data["endDate"]
    location = request.data["location"]
    image = request.data["image"]

    models.MarketingTask.objects.create(
        company=company,
        title=title,
        description=description,
        deliverables=deliverables,
        compensation=compensation,
        posted_date=posted_date,
        end_date=end_date,
        location=location,
        image=image,
    )
    return HttpResponse({"message": "successful"}, status=200)


@api_view(["POST"])
def get_company_tasks(request):
    userId = request.data["userId"]
    company = models.Company.objects.filter(user=userId)[0]
    tasks = models.MarketingTask.objects.filter(company=company)
    data = serialize(
        "json",
        tasks,
        fields=(
            "company",
            "title",
            "description",
            "deliverables",
            "compensation",
            "posted_date",
            "end_date",
            "location",
            "image",
        ),
    )
    y = json.loads(data)
    fields_data = []
    for item in y:
        fields_data.append(item["fields"])
    return JsonResponse({"yo": fields_data}, status=200)
