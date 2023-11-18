from rest_framework import serializers
from .models import BookClub
from book.models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class BookClubSerializer(serializers.ModelSerializer):
    book= BookSerializer()
    class Meta:
        model = BookClub
        fields = '__all__'

class BookClubPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookClub
        exclude = ('members',)