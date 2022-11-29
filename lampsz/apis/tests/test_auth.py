from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.utils import json

from lampsz.apis.models import Company, User
from lampsz.apis.utils import UserType
from lampsz.apis.views.auth import bad_credentials


class TestLogin(APITestCase):
    def setUp(self) -> None:
        self.company_user = User.objects.create_user(
            username="test_c",
            email="test_c@email.com",
            password="correct",
            is_influencer=False,
        )
        Company.objects.create(user=self.company_user)

    def tearDown(self) -> None:
        self.client.logout()

    def test_company_login_successful(self) -> None:
        """
        Ensure company login succeeds when credentials are correct.
        """
        url = reverse("login")
        data = {"username": "test_c", "password": "correct"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content)
        self.assertEqual(response_data.get("userId"), self.company_user.id)
        self.assertEqual(response_data.get("username"), self.company_user.username)
        self.assertEqual(self.client.session["user_type"], UserType.BUSINESS)

    def test_company_login_incorrect_credentials(self) -> None:
        """
        Ensure login fails when incorrect password is provided.
        """
        url = reverse("login")
        data = {"username": "test", "password": "test"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(json.loads(response.content).get("message"), bad_credentials)

    def test_company_login_incorrect_username(self) -> None:
        """
        Ensure login fails when non-existent username is provided.
        """
        url = reverse("login")
        data = {"username": "non-existent", "password": "correct"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(json.loads(response.content).get("message"), bad_credentials)


class TestRegister(APITestCase):
    def setUp(self) -> None:
        self.company_user = User.objects.create_user(
            username="company",
            email="test@email.com",
            password="correct",
            is_influencer=False,
        )
        Company.objects.create(user=self.company_user)

    def test_company_register_successful(self) -> None:
        """
        Ensure company register succeeds when all the provided values are valid.
        """
        url = reverse("register")
        data = {
            "username": "test_c",
            "email": "test_c@email.com",
            "password": "correct",
            "is_influencer": False,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Company.objects.count(), 2)
        self.assertEqual(User.objects.count(), 2)
        try:
            User.objects.get(username="test_c")
        except User.DoesNotExist:
            self.fail("User with username 'test' should be in queryset.")
        self.assertEqual(self.client.session["user_type"], UserType.BUSINESS)

    def test_company_register_duplicate_username(self) -> None:
        """
        Ensure register fails when provided username already exists.
        """
        url = reverse("register")
        data = {
            "username": "company",
            "email": "test2@email.com",
            "password": "correct",
            "is_influencer": False,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        validation_error = json.loads(response.content)
        self.assertIn("username", validation_error)
        self.assertEqual(len(validation_error.get("username")), 1)
        self.assertEqual(
            validation_error.get("username")[0],
            "A user with that username already exists.",
        )
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(Company.objects.count(), 1)

    def test_company_register_duplicate_email(self) -> None:
        """
        Ensure register fails when provided email already exists.
        """
        url = reverse("register")
        data = {
            "username": "test",
            "email": "test@email.com",
            "password": "correct",
            "is_influencer": False,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        validation_error = json.loads(response.content)
        self.assertIn("email", validation_error)
        self.assertEqual(len(validation_error.get("email")), 1)
        self.assertEqual(
            validation_error.get("email")[0], "user with this email already exists."
        )
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(Company.objects.count(), 1)
