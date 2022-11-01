from django.contrib.auth.models import User, Group
from rest_framework import serializers
from models import Influencer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields= ['username', 'last_name', 'first_name']

class InfluencerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Influencer
        fields= ['username', 'last_name', 'first_name']