# Generated by Django 4.1.3 on 2022-12-01 18:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("apis", "0006_company_industry_alter_user_is_influencer"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="company",
            name="founded",
        ),
    ]
