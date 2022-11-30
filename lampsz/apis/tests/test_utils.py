from unittest import TestCase

from rest_framework.exceptions import ErrorDetail

from lampsz.apis.utils import ensure_https_url, has_unique_error


class TestUtils(TestCase):
    def test_has_unique_error(self):
        validationErrors = {
            "password": [ErrorDetail("test", "other")],
            "username": [ErrorDetail("test", "unique")],
        }
        self.assertEqual(
            has_unique_error("username", validationErrors),
            True,
            "Failed to detect unique error for field username",
        )
        self.assertEqual(
            has_unique_error("email", validationErrors),
            False,
            "Shouldn't find unique error when field isn't present",
        )
        self.assertEqual(
            has_unique_error("password", validationErrors),
            False,
            "Shouldn't find unique error when error for field isn't unique",
        )

    def test_ensure_https_url(self):
        self.assertEqual(
            ensure_https_url("https://test.com"),
            "https://test.com",
            "Should produce same URL as the one passed in.",
        )
        self.assertEqual(
            ensure_https_url("http://test.com"),
            "https://test.com",
            "Should produce URL with same domain but now uses HTTPS.",
        )
