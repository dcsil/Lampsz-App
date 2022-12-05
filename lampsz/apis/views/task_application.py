from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from lampsz.apis.mixins import MultipleFieldLookupMixin
from lampsz.apis.models import TaskApplication
from lampsz.apis.serializers import TaskApplicationSerializer


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
