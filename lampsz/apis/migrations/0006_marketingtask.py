# Generated by Django 4.1.3 on 2022-11-17 22:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("apis", "0005_alter_company_location"),
    ]

    operations = [
        migrations.CreateModel(
            name="MarketingTask",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.TextField()),
                ("description", models.TextField()),
                ("price", models.FloatField()),
                ("postedDate", models.DateField()),
                (
                    "company",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="apis.company"
                    ),
                ),
            ],
        ),
    ]
