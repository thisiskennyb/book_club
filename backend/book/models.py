from django.db import models


class Book(models.Model):
    author = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    pages = models.IntegerField()
    book_cover_id = models.CharField(null=True, default=None, blank=True, max_length=255)
    open_library_id = models.CharField(default=None, max_length=255)


    @classmethod
    def get_or_create_book(cls, book_data):
        open_library_id = book_data['book']['open_library_id']
        book_cover_id = book_data.get('book_cover_id', None)
        book, created = cls.objects.get_or_create(open_library_id=open_library_id, defaults={
            'author': book_data['book']['author'],
            'title': book_data['book']['title'],
            'pages': book_data['book']['pages'],
            'book_cover_id': book_cover_id,
        
        })
        return book



