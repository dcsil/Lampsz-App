from django.contrib.auth.models import User
from rest_framework import serializers

from lampsz.apis import models


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Location
        fields = ["id", "location"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]


class InfluencerSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    location = LocationSerializer(required=True)

    class Meta:
        model = models.Influencer
        fields = ["id", "user", "location", "categories", "tiktokUsername", "about"]
        depth = 2

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create(**user_data)
        location_data = validated_data.pop("location")
        location = models.Location.objects.get_or_create(
            location=location_data["location"]
        )
        influencer = models.Influencer.objects.create(
            user=user, location=location, **validated_data
        )
        return influencer


class CompanySerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    location = LocationSerializer(required=False)
    founded = serializers.DateField(format="YYYY-MM-DD", required=False)

    class Meta:
        model = models.Influencer
        fields = ["id", "user", "location", "categories", "founded", "about"]
        depth = 2

    def update(self, instance, validated_data):
        location_data = validated_data.pop("location")
        location, created = models.Location.objects.get_or_create(
            location=location_data["location"]
        )
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.location = location
        instance.save()
        return instance
