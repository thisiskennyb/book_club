from django.db import models
from book.models import Book
from django.contrib.auth.models import User

class BookClub(models.Model):
    members = models.ManyToManyField(User, related_name='book_club_members', null=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_book_clubs')

    # @staticmethod
    # def create_book_club(request, ol_id):
    #     user = request.user
    #     book = Book.objects.get(pk=ol_id)
    #     book_club = BookClub.objects.create(user=user, book=book)
    #     book_club.members.add(user)
    #     return book
