# Generated by Django 4.1.2 on 2022-11-04 17:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("apis", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Category",
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
                ("category", models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name="Location",
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
                ("location", models.CharField(max_length=20)),
            ],
        ),
        migrations.RemoveField(
            model_name="influencer",
            name="tiktokUserID",
        ),
        migrations.AddField(
            model_name="influencer",
            name="about",
            field=models.TextField(default="Default"),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="influencer",
            name="tiktokUsername",
            field=models.CharField(default="Default Tiktok name", max_length=20),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name="Company",
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
                ("founded", models.DateField()),
                ("about", models.TextField()),
                ("categories", models.ManyToManyField(blank=True, to="apis.category")),
                (
                    "location",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="apis.location"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="influencer",
            name="categories",
            field=models.ManyToManyField(blank=True, to="apis.category"),
        ),
        migrations.AddField(
            model_name="influencer",
            name="location",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="apis.location",
            ),
            preserve_default=False,
        ),
    ]
