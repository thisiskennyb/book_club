from rest_framework import serializers
from .models import CompletedBook, TopFive, ToBeRead  
from book.models import Book
from book.serializers import BookSerializer

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class CompletedBookSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    class Meta:
        model = CompletedBook
        fields = '__all__'

class TopFiveSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    class Meta:
        model = TopFive
        fields = '__all__'

class ToBeReadSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    class Meta:
        model = ToBeRead
        fields = '__all__'
    book = BookSerializer(read_only=True)

class CompletedBookPostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CompletedBook
        fields = '__all__'