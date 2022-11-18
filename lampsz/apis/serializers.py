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
        fields= ['id','user', 'location', 'categories', 'founded', 'about']
        depth=2
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        location_data = validated_data.pop('location')
        location = models.Location.objects.filter(location__iexact=location_data['location'])
        location = models.Location.objects.create(location= location_data['location']) if len(location) < 1 else location[0]
        influencer = models.Company.objects.create(user=user, location=location, **validated_data)
        return influencer


class MarketingTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MarketingTask
        fields= ['id', 'company', 'title', 'description', 'price', 'postedDate']
    
    def create(self, validated_data):
        return models.MarketingTask.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.company = validated_data.get('company', instance.title)
        instance.title = validated_data.get('title', instance.code)
        instance.description = validated_data.get('description', instance.linenos)
        instance.price = validated_data.get('price', instance.language)
        instance.postedDate = validated_data.get('postedDate', instance.style)
        instance.save()
        return instance