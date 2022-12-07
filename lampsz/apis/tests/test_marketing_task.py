from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from lampsz.apis.models import MarketingTask, TaskApplication
from lampsz.apis.tests.utils import (
    create_test_company_user,
    create_test_influencer_user,
    create_test_marketing_task,
)


class TestMarketingTaskList(APITestCase):
    def setUp(self) -> None:
        user, self.company = create_test_company_user()
        self.test_task = create_test_marketing_task(self.company)
        self.client.force_login(user)

    def test_get_all_tasks(self) -> None:
        """
        Ensure task list API correctly returns all the available tasks.
        """
        url = reverse("marketing_task_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Test Task")
        self.assertEqual(response.data[0]["posted_date"], "2022-12-02")
        self.assertEqual(response.data[0]["compensation"], 140.0)

    def test_get_tasks_with_company_that_has_no_tasks(self) -> None:
        """
        Ensure task list API correctly filters out existing task when query
        parameter is specified.
        """
        url = f"{reverse('marketing_task_list')}?user_id=1000"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_create_new_task(self) -> None:
        """
        Ensure new task is correctly created.
        """
        url = reverse("marketing_task_list")
        data = {
            "company_id": self.company.pk,
            "title": "Test Task 2",
            "description": "Test description",
            "deliverables": "Test deliverables",
            "compensation": 140.0,
            "posted_date": "2022-12-02",
            "end_date": "2022-12-02",
            "location": "Toronto",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MarketingTask.objects.count(), 2)
        self.assertEqual(response.data["title"], "Test Task 2")


class TestMarketingTaskDetail(APITestCase):
    def setUp(self) -> None:
        user, self.company = create_test_company_user()
        self.test_task = create_test_marketing_task(self.company)
        self.client.force_login(user)

    def test_get_task_detail(self) -> None:
        """
        Ensure get task detail API correctly returns the task with given ID.
        """
        url = reverse("marketing_task_detail", kwargs={"pk": self.test_task.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Test Task")
        self.assertEqual(response.data["posted_date"], "2022-12-02")
        self.assertEqual(response.data["compensation"], 140.0)

    def test_get_non_existent_task(self) -> None:
        """
        Ensure get task detail API fails with a message when requested task
        doesn't exist.
        """
        url = reverse("marketing_task_detail", kwargs={"pk": 10000})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_patch_task_detail(self) -> None:
        """
        Ensure patch task detail API correctly update the task with given ID
        """
        url = reverse("marketing_task_detail", kwargs={"pk": self.test_task.pk})
        data = {"compensation": 170.0, "end_date": "2022-12-04", "location": "Ottawa"}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["compensation"], 170.0)
        self.assertEqual(response.data["end_date"], "2022-12-04")
        self.assertEqual(response.data["location"], "Ottawa")

    def test_update_detail_calculate_similarity(self) -> None:
        """
        Ensure updating task description updates similarity scores for
        task applications.
        """
        _, influencer = create_test_influencer_user()
        application = TaskApplication.objects.create(
            influencer=influencer, marketing_task=self.test_task
        )
        old_similarity = application.similarity

        url = reverse("marketing_task_detail", kwargs={"pk": self.test_task.pk})
        data = {"description": "updating this"}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_similarity = TaskApplication.objects.get(pk=application.pk).similarity
        self.assertNotEqual(old_similarity, new_similarity)
