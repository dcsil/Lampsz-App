from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from lampsz.apis.tests.utils import (
    create_test_company_user,
    create_test_influencer_user,
)


class TestInfluencerDetail(APITestCase):
    def setUp(self) -> None:
        self.influencer_user, self.influencer = create_test_influencer_user()

    def test_get_influencer_detail(self) -> None:
        """
        Ensure get influencer detail API correctly returns the influencer with the given id
        """
        url = reverse("public_user_detail", kwargs={"user_id": self.influencer_user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["user"]["id"], self.influencer_user.id)
        self.assertEqual(
            response.data["user"]["username"], self.influencer_user.username
        )
        self.assertEqual(response.data["channel_name"], self.influencer.channel_name)
        self.assertEqual(response.data["channel_id"], self.influencer.channel_id)

    def test_get_non_existent_influencer(self) -> None:
        """
        Ensure get influencer detail API fails with a message when requested influencer
        doesn't exist.
        """
        url = reverse(
            "public_user_detail", kwargs={"user_id": self.influencer_user.id + 10}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_influencer(self) -> None:
        """
        Ensure put influencer detail API correctly update the influencer with given ID
        """
        self.client.force_login(self.influencer_user)
        url = reverse("influencer_edit", kwargs={"user_id": self.influencer_user.id})
        data = {"location": "Toronto", "age": 20, "description": "test_description"}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["location"], "Toronto")
        self.assertEqual(response.data["age"], 20)


class TestCompanyDetail(APITestCase):
    def setUp(self) -> None:
        self.company_user, self.company = create_test_company_user()

    def test_get_company_detail(self) -> None:
        """
        Ensure get company detail API correctly returns the company with the given id
        """
        url = reverse("public_user_detail", kwargs={"user_id": self.company_user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["user"]["id"], self.company_user.id)
        self.assertEqual(response.data["user"]["username"], self.company_user.username)
        self.assertEqual(response.data["company_name"], self.company.company_name)

    def test_get_non_existent_company(self) -> None:
        """
        Ensure get company detail API fails with a message when requested company
        doesn't exist.
        """
        url = reverse(
            "public_user_detail", kwargs={"user_id": self.company_user.id + 10}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_company(self) -> None:
        """
        Ensure put company detail API correctly update the company with given ID
        """
        self.client.force_login(self.company_user)
        url = reverse("company_edit", kwargs={"user_id": self.company_user.id})
        data = {
            "industry": "Food",
            "location": "Toronto",
            "description": "test_description",
        }
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["location"], "Toronto")
        self.assertEqual(response.data["industry"], "Food")
