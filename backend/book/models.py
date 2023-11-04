from django.db import models


class Book(models.Model):
    author = models.CharField()
    title = models.CharField()
    pages = models.IntegerField()
    book_cover_id = models.CharField(null=True)
    open_library_id = models.CharField(default=None)

    



