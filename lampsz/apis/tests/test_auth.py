from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from lampsz.apis.models import Company, User
from lampsz.apis.tests.utils import create_test_company_user
from lampsz.apis.utils import UserType
from lampsz.apis.views.auth import bad_credentials, logout_success


class TestLogin(APITestCase):
    def setUp(self) -> None:
        self.company_user, _ = create_test_company_user()

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
        self.assertEqual(response.data["userId"], self.company_user.id)
        self.assertEqual(response.data["username"], self.company_user.username)
        self.assertEqual(self.client.session["user_type"], UserType.BUSINESS)

    def test_company_login_incorrect_credentials(self) -> None:
        """
        Ensure login fails when incorrect password is provided.
        """
        url = reverse("login")
        data = {"username": "test", "password": "test"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["message"], bad_credentials)

    def test_company_login_incorrect_username(self) -> None:
        """
        Ensure login fails when non-existent username is provided.
        """
        url = reverse("login")
        data = {"username": "non-existent", "password": "correct"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["message"], bad_credentials)


class TestRegister(APITestCase):
    def setUp(self) -> None:
        self.company_user, _ = create_test_company_user()

    def tearDown(self) -> None:
        self.client.logout()

    def test_company_register_successful(self) -> None:
        """
        Ensure company register succeeds when all the provided values are valid.
        """
        url = reverse("register")
        data = {
            "username": "test",
            "email": "test@email.com",
            "password": "correct",
            "is_influencer": False,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Company.objects.count(), 2)
        self.assertEqual(User.objects.count(), 2)
        try:
            User.objects.get(username="test")
        except User.DoesNotExist:
            self.fail("User with username 'test' should be in queryset.")
        self.assertEqual(self.client.session["user_type"], UserType.BUSINESS)

    def test_company_register_duplicate_username(self) -> None:
        """
        Ensure register fails when provided username already exists.
        """
        url = reverse("register")
        data = {
            "username": "test_c",
            "email": "test2@email.com",
            "password": "correct",
            "is_influencer": False,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertIn("username", response.data)
        self.assertEqual(len(response.data["username"]), 1)
        self.assertEqual(
            response.data["username"][0],
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
            "username": "test_c",
            "email": "test_c@email.com",
            "password": "correct",
            "is_influencer": False,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertIn("email", response.data)
        self.assertEqual(len(response.data["email"]), 1)
        self.assertEqual(
            response.data["email"][0], "user with this email already exists."
        )
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(Company.objects.count(), 1)

    def test_company_register_invalid_characters_in_username(self) -> None:
        """
        Ensure register fails when provided username contains invalid chars.
        """
        url = reverse("register")
        data = {
            "username": ",./';p[]",
            "email": "test_c2@email.com",
            "password": "correct",
            "is_influencer": False,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)
        self.assertEqual(len(response.data["username"]), 1)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(Company.objects.count(), 1)


class TestAuthMisc(APITestCase):
    def setUp(self) -> None:
        self.company_user, _ = create_test_company_user()

    def test_get_session_when_unauthenticated(self) -> None:
        """
        Ensures get session fails when user is not authenticated.
        """
        url = reverse("session")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_session_after_login(self) -> None:
        """
        Ensures get session succeeds and returns proper data when a user is
        logged in.
        """
        self.client.login(username=self.company_user.username, password="correct")

        url = reverse("session")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["userType"], 0)
        self.assertEqual(response.data["username"], self.company_user.username)

    def test_logout_view(self) -> None:
        """
        Ensures logout succeeds after user login and correctly erases all the
        data in session.
        """
        self.client.login(username=self.company_user.username, password="correct")

        url = reverse("logout")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse("userType" in self.client.session)

    def test_get_messages_view_after_logout(self) -> None:
        """
        Ensures logout correctly gets logout message from API.
        """
        self.client.login(username=self.company_user.username, password="correct")
        self.client.get(reverse("logout"))

        url = reverse("messages")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data["messages"][0]["message"], logout_success)
        self.assertEqual(response.data["messages"][0]["level"], "success")
