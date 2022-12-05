from lampsz.apis.models import Company, Influencer, MarketingTask, User


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
    company = Company.objects.create(user=company_user, company_name="Test Company")
    return company_user, company


def create_test_influencer_user(num: int = 0) -> tuple[User, Influencer]:
    """
    Returns a test User and Influencer object.
    """
    influencer_user = User.objects.create_user(
        username=f"test_i{num}", email=f"test_i{num}@email.com", is_influencer=True
    )
    influencer = Influencer.objects.create(
        user=influencer_user, channel_name="TestChannel", channel_id="1"
    )
    return influencer_user, influencer


def create_test_marketing_task(company: Company = None) -> MarketingTask:
    """
    Returns a test marketing test using given Company object.
    """
    if not company:
        _, company = create_test_company_user()

    return MarketingTask.objects.create(
        company=company,
        title="Test Task",
        description="Test description",
        deliverables="Test deliverables",
        compensation=140.0,
        posted_date="2022-12-02",
        end_date="2022-12-02",
        location="Toronto",
    )
