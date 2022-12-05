from django.contrib import messages
from django.http import Http404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from lampsz.apis.mixins import MultipleFieldLookupMixin
from lampsz.apis.models import MarketingTask, TaskApplication
from lampsz.apis.serializers import (
    TaskApplicationInfluencerSerializer,
    TaskApplicationSerializer,
)
from lampsz.apis.utils import access_nonexistent


class TaskApplicationList(generics.ListCreateAPIView):
    """
    Generic view for retrieving all task applications and creating new task
    application.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = TaskApplicationSerializer

    def get_queryset(self):
        influencer = self.request.user.influencer
        return influencer.taskapplication_set.all()


class TaskApplicationDetail(MultipleFieldLookupMixin, generics.RetrieveDestroyAPIView):
    """
    Generic view for deleting specific task application.
    """

    permission_classes = [IsAuthenticated]
    queryset = TaskApplication.objects.all()
    serializer_class = TaskApplicationSerializer
    lookup_fields = ("influencer", "marketing_task")


class MarketingTaskApplicants(generics.ListAPIView):
    """
    Generic view for retrieving all applicants of a given market task.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = TaskApplicationInfluencerSerializer

    def get_queryset(self):
        try:
            task = MarketingTask.objects.get(pk=self.kwargs["marketing_task"])
        except MarketingTask.DoesNotExist:
            messages.error(self.request, access_nonexistent)
            raise Http404

        return task.taskapplication_set.all()
