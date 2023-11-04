from django.db import models
from accounts.models import UserProfile
from book.models import Book
from django.utils import timezone

class CompletedBook(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    date_finished = models.DateTimeField(default=timezone.now)
    user_rating = models.IntegerField(null=True)
    recommended = models.BooleanField(default=False)


class TopFive(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    ranking = models.IntegerField()

class ToBeRead(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

#     {
#     "author": "Tomiwa",
#     "title": "Tomiwas adventure",
#     "pages": 500,
#     "book_cove_id": "sdf9898",
#     "open_library_id": "ol8743348"
# }