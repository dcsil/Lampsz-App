from unittest import TestCase

from rest_framework.exceptions import ErrorDetail

from lampsz.apis.utils import has_unique_error


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
