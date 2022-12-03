from rest_framework import generics

from lampsz.apis.models import MarketingTask
from lampsz.apis.serializers import MarketingTaskSerializer

__all__ = ["MarketingTaskList", "MarketingTaskDetail"]


class MarketingTaskList(generics.ListCreateAPIView):
    """
    Generic view for retrieving all marketing task and creating new task.
    """

    serializer_class = MarketingTaskSerializer

    def get_queryset(self):
        """
        Return marketing task created by company with `user_id` given as query
        parameter in the URL.
        """
        queryset = MarketingTask.objects.all()
        user_id = self.request.query_params.get("user_id")
        if user_id is not None:
            queryset = queryset.filter(company__user_id=user_id)
        return queryset


class MarketingTaskDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Generic view for retrieve, update and remove marketing task details.
    """

    queryset = MarketingTask.objects.all()
    serializer_class = MarketingTaskSerializer