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

from lampsz.apis.views import auth, marketing_task, oauth, profile, task_application

urlpatterns = [
    path("register/", auth.register_view, name="register"),
    path("login/", auth.login_view, name="login"),
    path("logout/", auth.logout_view, name="logout"),
    path("session/", auth.get_session_view, name="session"),
    path("messages/", auth.get_auth_messages_view, name="messages"),
]

urlpatterns += [
    path("authorize/", oauth.authorize, name="authorize"),
    path("oauth2callback/", oauth.oauth2callback, name="oauth2callback"),
]

urlpatterns += [
    path(
        "profile/<int:user_id>", profile.public_user_detail, name="public_user_detail"
    ),
    path(
        "influencer/<int:user_id>", profile.influencer_edit_view, name="influencer_edit"
    ),
    path("company/<int:user_id>", profile.company_edit_view, name="company_edit"),
]

urlpatterns += [
    path(
        "tasks/", marketing_task.MarketingTaskList.as_view(), name="marketing_task_list"
    ),
    path(
        "tasks/<int:pk>",
        marketing_task.MarketingTaskDetail.as_view(),
        name="marketing_task_detail",
    ),
    path("get_tasks/", marketing_task.get_marketing_tasks),
]

urlpatterns += [
    path(
        "applications/",
        task_application.TaskApplicationList.as_view(),
        name="task_application_list",
    ),
    path(
        "applications/<int:influencer>/<int:marketing_task>",
        task_application.TaskApplicationDelete.as_view(),
        name="task_application_delete",
    ),
]
