from django.urls import path
from django.views.generic import TemplateView

urls = ["", "login", "signup"]

urlpatterns = [
    path(pattern, TemplateView.as_view(template_name="frontend/index.html"))
    for pattern in urls
]
