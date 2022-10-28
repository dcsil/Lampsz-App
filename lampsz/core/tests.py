from django.test import TestCase


class DummyTestForCI(TestCase):
    def test_simple(self):
        self.assertEqual(1, 1)
