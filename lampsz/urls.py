"""lampsz URL Configuration

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
from django.contrib import admin
from django.urls import path

from lampsz.frontend.views import index
from lampsz.apis import views

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('api/influencer_register', views.influencer_create_view),
    path('api/company_register', views.company_create_view),
    path('api/company_login', views.company_login_view),
    path('api/influencer/<int:influencer_id>', views.get_influencer_view),
    path('api/company/<int:company_id>', views.get_company_view),
    path('api/user/<int:user_id>', views.get_user_view),
]
