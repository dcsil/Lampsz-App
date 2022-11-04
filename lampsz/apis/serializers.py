from django.contrib.auth.models import User, Group
from rest_framework import serializers
from lampsz.apis import models

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Location
        fields= ['id', 'location']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields= ['id', 'username', 'first_name', 'last_name', 'password', 'email']

class InfluencerSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    location = LocationSerializer(required=True)
    class Meta:
        model = models.Influencer
        fields= ['id','user', 'location', 'categories', 'tiktokUsername', 'about']
        depth=2
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        location_data = validated_data.pop('location')
        location = models.Location.objects.filter(location__iexact=location_data['location'])
        location = models.Location.objects.create(location= location_data['location']) if len(location) < 1 else location[0]
        influencer = models.Influencer.objects.create(user=user, location=location, **validated_data)
        return influencer

class CompanySerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    location = LocationSerializer(required=True)
    founded = serializers.DateField(format='YYYY-MM-DD')
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