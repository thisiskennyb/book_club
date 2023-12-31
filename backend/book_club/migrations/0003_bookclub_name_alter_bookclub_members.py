# Generated by Django 4.2.7 on 2023-11-18 17:13

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('book_club', '0002_alter_bookclub_members'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookclub',
            name='name',
            field=models.CharField(default='book club name', max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='bookclub',
            name='members',
            field=models.ManyToManyField(related_name='book_club_members', to=settings.AUTH_USER_MODEL),
        ),
    ]
