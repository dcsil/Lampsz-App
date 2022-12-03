from django.contrib import admin

from lampsz.apis import models


# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ["__str__"]

    class Meta:
        model = models.User


class InfluencerAdmin(admin.ModelAdmin):
    list_display = ["__str__"]

    class Meta:
        model = models.Influencer


class CompanyAdmin(admin.ModelAdmin):
    list_display = ["__str__"]

    class Meta:
        model = models.Company


class LocationAdmin(admin.ModelAdmin):
    list_display = ["__str__"]

    class Meta:
        model = models.Location


class MarketingTaskAdmin(admin.ModelAdmin):
    list_display = ["__str__"]

    class Meta:
        model = models.MarketingTask


admin.site.register(models.User, UserAdmin)
admin.site.register(models.Influencer, InfluencerAdmin)
admin.site.register(models.Company, CompanyAdmin)
admin.site.register(models.Location, LocationAdmin)
admin.site.register(models.MarketingTask, MarketingTaskAdmin)
