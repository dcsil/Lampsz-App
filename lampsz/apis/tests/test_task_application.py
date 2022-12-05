from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from lampsz.apis.models import TaskApplication
from lampsz.apis.tests.utils import (
    create_test_company_user,
    create_test_influencer_user,
    create_test_marketing_task,
)


class TestTaskApplicationList(APITestCase):
    def setUp(self) -> None:
        _, company = create_test_company_user()
        self.test_task = create_test_marketing_task(company)
        self.user, self.influencer = create_test_influencer_user()
        self.application = TaskApplication.objects.create(
            influencer=self.influencer, marketing_task=self.test_task
        )

    def test_get_all_applications(self) -> None:
        """
        Ensure application list API correctly returns all the task applications.
        """
        self.client.force_login(self.user)
        url = reverse("task_application_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["influencer"], self.influencer.pk)

    def test_get_applications_return_only_logged_in_user_data(self) -> None:
        """
        Ensure application list API only returns task applications of the user
        who is logged in.
        """
        # create and login a new user
        user, influencer = create_test_influencer_user(1)
        self.client.force_login(user)

        url = reverse("task_application_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(TaskApplication.objects.count(), 1)
        self.assertEqual(len(response.data), 0)

    def test_create_new_applications(self) -> None:
        """
        Ensure new task is correctly created.
        """
        user, influencer = create_test_influencer_user(1)
        self.client.force_login(user)
        url = reverse("task_application_list")
        data = {
            "influencer": influencer.pk,
            "marketing_task_id": self.test_task.pk,
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TaskApplication.objects.count(), 2)


class TestTaskApplicationDelete(APITestCase):
    def setUp(self) -> None:
        _, company = create_test_company_user()
        self.test_task = create_test_marketing_task(company)
        user, self.influencer = create_test_influencer_user()
        self.application = TaskApplication.objects.create(
            influencer=self.influencer, marketing_task=self.test_task
        )
        self.client.force_login(user)

    def test_get_task_application(self):
        """
        Ensure that application get API correctly queries using multiple fields.
        """
        url = reverse(
            "task_application_detail",
            kwargs={
                "influencer": self.influencer.pk,
                "marketing_task": self.test_task.pk,
            },
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_task_application(self) -> None:
        """
        Ensure that application delete API correctly deletes the application.
        """
        url = reverse(
            "task_application_detail",
            kwargs={
                "influencer": self.influencer.pk,
                "marketing_task": self.test_task.pk,
            },
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
