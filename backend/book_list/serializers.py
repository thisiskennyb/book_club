from rest_framework import serializers
from .models import CompletedBook, TopFive, ToBeRead  
from book.models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class CompletedBookSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    class Meta:
        model = CompletedBook
        fields = '__all__'

class TopFiveSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    class Meta:
        model = TopFive
        fields = '__all__'

class ToBeReadSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    class Meta:
        model = ToBeRead
        fields = '__all__'
   

class CompletedBookPostSerializer(serializers.ModelSerializer):
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    class Meta:
        model = CompletedBook
        fields = '__all__'

class ToBeReadPostSerializer(serializers.ModelSerializer):
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    class Meta:
        model = ToBeRead
        fields = '__all__'

class OthersCompletedSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'