# Generated by Django 4.1.3 on 2022-12-01 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("apis", "0005_remove_influencer_tiktokusername"),
    ]

    operations = [
        migrations.AddField(
            model_name="company",
            name="industry",
            field=models.TextField(default=""),
        ),
        migrations.AlterField(
            model_name="user",
            name="is_influencer",
            field=models.BooleanField(default=False),
        ),
    ]
