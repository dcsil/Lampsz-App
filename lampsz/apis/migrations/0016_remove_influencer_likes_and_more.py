# Generated by Django 4.1.3 on 2022-12-03 21:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("apis", "0015_influencer_channel_id"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="influencer",
            name="likes",
        ),
        migrations.RemoveField(
            model_name="influencer",
            name="subscribers",
        ),
    ]
