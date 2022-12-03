from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from lampsz.apis.models import MarketingTask
from lampsz.apis.tests.utils import create_test_company_user


class TestMarketingTaskList(APITestCase):
    def setUp(self) -> None:
        _, self.company = create_test_company_user()
        self.test_task = MarketingTask.objects.create(
            company=self.company,
            title="Test Task",
            description="Test description",
            deliverables="Test deliverables",
            compensation=140.0,
            posted_date="2022-12-02",
            end_date="2022-12-02",
            location="Toronto",
        )

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
        _, self.company = create_test_company_user()
        self.test_task = MarketingTask.objects.create(
            company=self.company,
            title="Test Task",
            description="Test description",
            deliverables="Test deliverables",
            compensation=140.0,
            posted_date="2022-12-02",
            end_date="2022-12-02",
            location="Toronto",
        )

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

    def test_put_task_detail(self) -> None:
        """
        Ensure put task detail API correctly update the task with given ID
        """
        url = reverse("marketing_task_detail", kwargs={"pk": self.test_task.pk})
        data = {"compensation": 170.0, "end_date": "2022-12-04", "location": "Ottawa"}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["compensation"], 170.0)
        self.assertEqual(response.data["end_date"], "2022-12-04")
        self.assertEqual(response.data["location"], "Ottawa")
