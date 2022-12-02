from lampsz.apis.models import Company, User


def create_test_company_user() -> tuple[User, Company]:
    """
    Returns a test User and Company object.
    """
    company_user = User.objects.create_user(
        username="test_c",
        email="test_c@email.com",
        password="correct",
        is_influencer=False,
    )
    company = Company.objects.create(user=company_user)
    return company_user, company
