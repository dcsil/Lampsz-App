from rest_framework import serializers

from lampsz.apis.models import Company, Influencer, Location, MarketingTask, User


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "location"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "is_influencer"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class InfluencerSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

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
            "age",
            "subscribers",
            "likes",
            "shortBio",
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


class CompanySerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Company
        fields = [
            "id",
            "user",
            "location",
            "categories",
            "description",
            "industry",
            "shortBio",
        ]
        depth = 2

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create(**user_data)
        company = Company.objects.create(user=user, **validated_data)
        return company

    def update(self, instance, validated_data):
        instance.location = validated_data.get("location")
        instance.description = validated_data.pop("description")
        instance.shortBio = validated_data.pop("shortBio")
        instance.industry = validated_data.pop("industry")
        instance.save()
        return instance


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
