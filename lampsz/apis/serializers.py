from rest_framework import serializers

from lampsz.apis.models import Company, Influencer, MarketingTask, User

__all__ = [
    "UserSerializer",
    "PublicUserSerializer",
    "InfluencerSerializer",
    "CompanySerializer",
    "MarketingTaskSerializer",
]


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

    class Meta:
        model = Influencer
        fields = [
            "user",
            "location",
            "categories",
            "thumbnail_url",
            "home_page",
            "description",
            "platform",
            "age",
        ]
        depth = 2

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create(**user_data)
        influencer = Influencer.objects.create(user=user, **validated_data)
        return influencer

    def update(self, instance, validated_data):
        instance.location = validated_data.pop("location")
        instance.description = validated_data.pop("description")
        instance.age = validated_data.pop("age")
        instance.subscribers = validated_data.pop("subscribers")
        instance.likes = validated_data.pop("likes")
        instance.shortBio = validated_data.pop("shortBio")
        instance.save()
        return instance

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
