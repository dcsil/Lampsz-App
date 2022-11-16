from django.contrib.auth.models import User
from django.db import models


# Filter classes
class Location(models.Model):
    location = models.CharField(max_length=20)

    def __str__(self):
        return self.location


class Category(models.Model):
    category = models.CharField(max_length=20)


class Influencer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category, blank=True)
    tiktokUsername = models.CharField(null=False, blank=False, max_length=20)
    about = models.TextField()

    def __str__(self):
        return self.user.username


class Company(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE, null=True, blank=True
    )
    categories = models.ManyToManyField(Category, blank=True)
    founded = models.DateField(null=True, blank=True)
    about = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.username
