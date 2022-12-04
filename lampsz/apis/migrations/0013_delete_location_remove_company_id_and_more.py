# Generated by Django 4.1.3 on 2022-12-03 17:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0012_merge_20221203_0109'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Location',
        ),
        migrations.RemoveField(
            model_name='company',
            name='id',
        ),
        migrations.RemoveField(
            model_name='influencer',
            name='id',
        ),
        migrations.AlterField(
            model_name='company',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='influencer',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]
