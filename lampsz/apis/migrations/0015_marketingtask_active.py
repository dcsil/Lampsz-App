# Generated by Django 4.1.3 on 2022-12-04 01:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0014_alter_marketingtask_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='marketingtask',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]