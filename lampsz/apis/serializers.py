from rest_framework import serializers

from lampsz.apis.models import Company, Influencer, MarketingTask, TaskApplication, User

__all__ = [
    "UserSerializer",
    "PublicUserSerializer",
    "InfluencerSerializer",
    "CompanySerializer",
    "MarketingTaskSerializer",
    "TaskApplicationSerializer",
    "TaskApplicationInfluencerSerializer",
]

from lampsz.apis.services import get_similarity_score


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "is_influencer"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class InfluencerSerializer(serializers.ModelSerializer):
    user = PublicUserSerializer(required=True)
    platform = serializers.CharField(source="get_platform_display")

    class Meta:
        model = Influencer
        fields = "__all__"
        depth = 2


class CompanySerializer(serializers.ModelSerializer):
    user = PublicUserSerializer(required=True)

    class Meta:
        model = Company
        fields = [
            "user",
            "location",
            "categories",
            "description",
            "industry",
            "short_bio",
            "industry",
            "company_name",
        ]
        depth = 2


class MarketingTaskSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(), write_only=True, source="company"
    )

    class Meta:
        model = MarketingTask
        fields = "__all__"

    def update(self, instance, validated_data):
        # Update the similarity score if description is updated
        if "description" in validated_data:
            for application in instance.taskapplication_set.all():
                influencer = Influencer.objects.get(pk=application.influencer)
                application.similarity = get_similarity_score(instance, influencer)
                application.save()

        return super().update(instance, validated_data)


class TaskApplicationSerializer(serializers.ModelSerializer):
    marketing_task = MarketingTaskSerializer(read_only=True)
    marketing_task_id = serializers.PrimaryKeyRelatedField(
        queryset=MarketingTask.objects.all(), write_only=True, source="marketing_task"
    )

    class Meta:
        model = TaskApplication
        fields = "__all__"


class TaskApplicationInfluencerSerializer(serializers.ModelSerializer):
    influencer = InfluencerSerializer(read_only=True)

    class Meta:
        model = TaskApplication
        fields = "__all__"
