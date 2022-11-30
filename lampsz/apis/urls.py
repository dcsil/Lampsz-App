"""lampsz api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path

from lampsz.apis.views import auth, profile

urlpatterns = [
    path("company_register/", auth.company_create_view, name="company-register"),
    path(
        "influencer_register/", auth.influencer_create_view, name="influencer-register"
    ),
    path("company_login/", auth.company_login_view, name="company-login"),
    path("logout/", auth.logout_view, name="logout"),
    path("session/", auth.get_session_view, name="session"),
    path("csrf/", auth.get_csrf, name="csrf"),
]

urlpatterns += [
    path("profile/<int:user_id>", profile.public_user_detail),
    path("influencer/<int:influencer_id>", profile.influencer_detail_view),
    path(
        "influencerProfile/<str:influencer_username>", profile.public_influencer_detail
    ),
    path("company/<int:company_id>", profile.company_detail_view),
    path("create_task/", profile.create_marketing_task),
]
