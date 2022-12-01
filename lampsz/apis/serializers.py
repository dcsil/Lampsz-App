from rest_framework import serializers

from lampsz.apis.models import Company, Influencer, Location, MarketingTask, User


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "location"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "is_influencer"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class InfluencerSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    location = LocationSerializer(required=True)

    class Meta:
        model = Influencer
        fields = [
            "id",
            "user",
            "location",
            "categories",
            "thumbnail_url",
            "home_page",
            "description",
            "platform",
        ]
        depth = 2

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create(**user_data)
        location_data = validated_data.pop("location")
        location = Location.objects.get_or_create(location=location_data["location"])
        influencer = Influencer.objects.create(
            user=user, location=location, **validated_data
        )
        return influencer


class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class PublicInfluencerSerializer(serializers.ModelSerializer):
    user = PublicUserSerializer(required=True)

    class Meta:
        model = Influencer
        depth = 2
        fields = [
            "id",
            "user",
            "location",
            "categories",
            "description",
            "subscribers",
            "age",
            "likes",
            "shortBio",
        ]


class PublicCompanySerializer(serializers.ModelSerializer):
    user = PublicUserSerializer(required=True)

    class Meta:
        model = Company
        depth = 2
        fields = [
            "id",
            "user",
            "location",
            "categories",
            "founded",
            "description",
            "shortBio",
        ]


class CompanySerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    location = LocationSerializer(required=False)
    founded = serializers.DateField(format="YYYY-MM-DD", required=False)

    class Meta:
        model = Influencer
        fields = ["id", "user", "location", "categories", "founded", "about"]
        depth = 2

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create(**user_data)
        location_data = validated_data.pop("location")
        location = Location.objects.get_or_create(location=location_data["location"])
        influencer = Company.objects.create(
            user=user, location=location, **validated_data
        )
        return influencer


class MarketingTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketingTask
        fields = ["id", "company", "title", "description", "price", "postedDate"]

    def create(self, validated_data):
        return MarketingTask.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.company = validated_data.get("company", instance.title)
        instance.title = validated_data.get("title", instance.code)
        instance.description = validated_data.get("description", instance.linenos)
        instance.price = validated_data.get("price", instance.language)
        instance.postedDate = validated_data.get("postedDate", instance.style)
        instance.save()
        return instance
