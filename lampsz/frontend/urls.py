from django.shortcuts import render
from django.urls import path
from django.views.generic import TemplateView

urls = [
    "",
    "login",
    "signup",
    "profile/<int:userId>",
    "marketplace",
    "task/<int:taskId>",
    "applications",
    "tasks",
]


# @ensure_csrf_cookie
def index(request, **kwargs):
    return render(request, template_name="frontend/index.html")


urlpatterns = [path(pattern, index) for pattern in urls]

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
