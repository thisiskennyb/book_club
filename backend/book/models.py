from django.db import models


class Book(models.Model):
    author = models.CharField()
    title = models.CharField()
    pages = models.IntegerField()
    book_cover_id = models.CharField(null=True)
    open_library_id = models.CharField(default=None)

    # def get_or_create_book(book):
    #     print(book)
    #     book_present = Book.objects.filter(open_library_id=book['book']['open_library_id']).exists()
    #     if book_present:
    #         return Book.objects.filter(open_library_id=book['book']['open_library_id'])
    #     else:
    #         createdBook = Book.objects.create(author=book['book']['author'], title=book['book']['title'], pages=book['book']['pages'], book_cover_id=book['book']['book_cover_id'], open_library_id=book['book']['open_library_id'])
    #         return createdBook
    @classmethod
    def get_or_create_book(cls, book_data):
        open_library_id = book_data['book']['open_library_id']
        book, created = cls.objects.get_or_create(open_library_id=open_library_id, defaults={
            'author': book_data['book']['author'],
            'title': book_data['book']['title'],
            'pages': book_data['book']['pages'],
            'book_cover_id': book_data['book']['book_cover_id'],
        })
        return book



