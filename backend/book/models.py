from django.db import models


class Book(models.Model):
    author = models.CharField(max_length=60)
    title = models.CharField(max_length=60)
    pages = models.IntegerField()
    book_cover_id = models.CharField(null=True, max_length=60)
    ratings = models.DecimalField()
    first_sentence = models.CharField(null=True, max_length=255)



