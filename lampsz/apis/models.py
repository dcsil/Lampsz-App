from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from lampsz.apis.utils import UserType


class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_influencer = models.BooleanField(default=False)

    def get_user_type(self):
        """Returns UserType enum for current user."""
        return UserType.INFLUENCER if self.is_influencer else UserType.BUSINESS


# Filter classes
class Location(models.Model):
    location = models.CharField(max_length=20)

    def __str__(self):
        return self.location


class Category(models.Model):
    category = models.CharField(max_length=20)


class Influencer(models.Model):
    class SocialPlatform(models.TextChoices):
        YOUTUBE = "YT", _("Youtube")

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    platform = models.CharField(
        max_length=10, choices=SocialPlatform.choices, default=SocialPlatform.YOUTUBE
    )
    description = models.TextField()
    home_page = models.URLField(blank=True)
    thumbnail_url = models.URLField(blank=True)
    location = models.CharField(max_length=100)
    categories = models.ManyToManyField(Category, blank=True)
    age = models.IntegerField(default=18)
    subscribers = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    shortBio = models.TextField(default="")

    def __str__(self):
        return self.user.username


class Company(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    location = models.CharField(max_length=100)
    categories = models.ManyToManyField(Category, blank=True)
    description = models.TextField(null=True, blank=True)
    shortBio = models.TextField(default="")
    industry = models.TextField(default="")

    def __str__(self):
        return self.user.username


class MarketingTask(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, null=False, blank=False
    )
    title = models.TextField(null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    price = models.FloatField(null=False, blank=False)
    postedDate = models.DateField(null=False, blank=False)
