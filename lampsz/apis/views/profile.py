from django.contrib import messages
from django.http import Http404
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from lampsz.apis.models import Company, Influencer, User
from lampsz.apis.serializers import (
    CompanySerializer,
    InfluencerSerializer,
    MarketingTaskSerializer,
)
from lampsz.apis.services import get_youtube_channel_video_info


@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def public_user_detail(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        messages.error(request, "User does not exist!")
        raise Http404

    if user.is_influencer:
        influencer = Influencer.objects.get(user=user)
        influencer_serializer = InfluencerSerializer(influencer, many=False)
        data = dict(influencer_serializer.data)
        data.update(get_youtube_channel_video_info(influencer.channel_id))
    else:
        company = Company.objects.get(user=user)
        company_serializer = CompanySerializer(company, many=False)
        data = dict(company_serializer.data)
        marketing_task_serializer = MarketingTaskSerializer(
            company.marketingtask_set.all(), many=True
        )
        data["marketing_task"] = marketing_task_serializer.data

    return Response(data, status=status.HTTP_200_OK)


class InfluencerUpdate(generics.UpdateAPIView):
    """
    Generic view for updating Influencer info.
    """

    permission_classes = [IsAuthenticated]
    queryset = Influencer.objects.all()
    serializer_class = InfluencerSerializer


class CompanyUpdate(generics.UpdateAPIView):
    """
    Generic view for updating Company info.
    """

    permission_classes = [IsAuthenticated]
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
