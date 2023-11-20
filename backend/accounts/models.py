from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pages_completed = models.IntegerField(default=0)
    top_five_books = models.JSONField(default=list)
