# Generated by Django 4.2.7 on 2023-12-02 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0004_remove_book_recommended'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='book_cover_id',
            field=models.CharField(blank=True, default=None, null=True),
        ),
    ]