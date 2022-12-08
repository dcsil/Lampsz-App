import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from lampsz.apis.utils import UserType

__all__ = [
    "User",
    "Category",
    "Company",
    "Influencer",
    "MarketingTask",
    "TaskApplication",
]


class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_influencer = models.BooleanField(default=False)

    def get_user_type(self):
        """
        Returns UserType enum for current user.
        """
        return UserType.INFLUENCER if self.is_influencer else UserType.BUSINESS


class Category(models.Model):
    category = models.CharField(max_length=20)


class Influencer(models.Model):
    class SocialPlatform(models.TextChoices):
        YOUTUBE = "YT", _("Youtube")

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    platform = models.CharField(
        max_length=10, choices=SocialPlatform.choices, default=SocialPlatform.YOUTUBE
    )
    description = models.TextField()
    channel_name = models.CharField(max_length=100)
    home_page = models.URLField(blank=True)
    thumbnail_url = models.URLField(blank=True)
    location = models.CharField(max_length=100)
    categories = models.ManyToManyField(Category, blank=True)
    age = models.IntegerField(default=18)
    short_bio = models.TextField(default="")
    channel_id = models.CharField(max_length=400)


class Company(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    company_name = models.CharField(max_length=100)
    location = models.CharField(blank=True, max_length=100)
    categories = models.ManyToManyField(Category, blank=True)
    description = models.TextField(blank=True, default="")
    short_bio = models.TextField(blank=True, default="")
    industry = models.TextField(blank=True, default="")


class MarketingTask(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, null=False, blank=False
    )
    title = models.TextField(blank=False)
    description = models.TextField(blank=True)
    deliverables = models.TextField(blank=True)
    compensation = models.FloatField(null=False, blank=False)
    posted_date = models.DateField(null=False, blank=False)
    end_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=100, blank=True)
    image = models.ImageField(default="", blank=True)
    active = models.BooleanField(default=True)


class TaskApplication(models.Model):
    influencer = models.ForeignKey(Influencer, on_delete=models.CASCADE)
    marketing_task = models.ForeignKey(MarketingTask, on_delete=models.CASCADE)
    applied_on = models.DateField(default=datetime.date.today)
    similarity = models.FloatField(default=0.0)

    class Meta:
        ordering = ("similarity",)
        constraints = [
            models.UniqueConstraint(
                fields=["influencer", "marketing_task"],
                name="unique_influencer_marketing_task",
            )
        ]
