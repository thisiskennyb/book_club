from rest_framework import serializers
from .models import CompletedBook, TopFive, ToBeRead  
from accounts.models import UserProfile
from book.models import Book
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

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
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = ('user',)