# Generated by Django 4.1.3 on 2022-11-30 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("apis", "0002_influencer_age_influencer_likes_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="influencer",
            name="shortBio",
            field=models.TextField(default=""),
        ),
    ]
