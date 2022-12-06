from django.contrib import messages
from django.db.models import Q
from django.http import Http404
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from lampsz.apis.models import MarketingTask
from lampsz.apis.serializers import MarketingTaskSerializer

__all__ = ["MarketingTaskList", "MarketingTaskDetail", "get_marketing_tasks"]

from lampsz.apis.utils import access_nonexistent


class MarketingTaskList(generics.ListCreateAPIView):
    """
    Generic view for retrieving all marketing task and creating new task.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = MarketingTaskSerializer

    def get_queryset(self):
        """
        Return marketing task created by company with `user_id` given as query
        parameter in the URL.
        """
        queryset = MarketingTask.objects.all()
        user_id = self.request.query_params.get("user_id")
        if user_id is not None:
            queryset = queryset.filter(company=user_id)
        return queryset


class MarketingTaskDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Generic view for retrieve, update and remove marketing task details.
    """

    permission_classes = [IsAuthenticated]
    queryset = MarketingTask.objects.all()
    serializer_class = MarketingTaskSerializer

    def get(self, request, *args, **kwargs):
        try:
            return super().get(request, *args, **kwargs)
        except Http404:
            messages.error(self.request, access_nonexistent)
            raise Http404


@api_view(["POST"])
def get_marketing_tasks(request):
    query = request.data["query"]
    location = request.data["location"]

    qs = MarketingTask.objects.filter(
        Q(title__contains=query)
        | Q(description__contains=query)
        | Q(deliverables__contains=query)
    )
    if location != "":
        qs = qs.filter(location=location)

    results = []
    for task in qs:
        serializer = MarketingTaskSerializer(task)
        results.append(serializer.data)

    return Response({"tasks": results}, status=200)
