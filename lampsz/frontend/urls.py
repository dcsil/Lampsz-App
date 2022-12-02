from django.urls import path
from django.views.generic import TemplateView

urls = [
    "",
    "login",
    "signup",
    "profile/<int:userId>",
    "marketplace",
    "tasks/<int:taskId>",
    "applications",
    "tasks",
]

urlpatterns = [
    path(pattern, TemplateView.as_view(template_name="frontend/index.html"))
    for pattern in urls
]

urlpatterns += [
    path(
        "terms-and-conditions",
        TemplateView.as_view(template_name="frontend/terms_and_conditions.html"),
    ),
    path(
        "privacy-policy",
        TemplateView.as_view(template_name="frontend/privacy_policies.html"),
    ),
]
