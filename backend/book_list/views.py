
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status
from .serializers import TopFiveSerializer, CompletedBookSerializer, ToBeReadSerializer, CompletedBookPostSerializer
from .models import ToBeRead, TopFive, CompletedBook
from accounts.models import UserProfile

class BookListView(APIView):
    def get(self, request):
       user = request.user
       
       tbr_books= ToBeRead.objects.filter(user_profile__user=user)
       tbr_serializer = ToBeReadSerializer(tbr_books, many=True)
       top_five= TopFive.objects.filter(user_profile__user=user).order_by("ranking")
       top_five_serializer = TopFiveSerializer(top_five, many=True)
       completed_books= CompletedBook.objects.filter(user_profile__user=user)
       completed_books_serializer = CompletedBookSerializer(completed_books, many=True)
       data = {
           "tbr": tbr_serializer.data,
           "top_five":top_five_serializer.data,
           "completed_books":completed_books_serializer.data

       }
       return Response(data)



class RecommendedView(APIView):

    pass



class TopFiveView(APIView):
    def post(self, request):
        top_five = request.data
        serializer = TopFiveSerializer(data=top_five)
        if serializer.is_valid(raise_exception=True):
            top_five_saved = serializer.save()
        return Response({"result": "saved"})

    # def delete(self, request):
    #     user = request.user
    #     data = request.data
    #     book_id = data.get('book_id')
    #     try:
    #         # Get the user's CoinCollection entry for the specified coin
    #         top_five = TopFive.objects.get(user_profile__user=user, book=book_id)

    #             coin_collection.delete()

    #             coin_collection.save()
    #         else:
    #             # Handle the case where the quantity is less than what's requested
    #             return Response({'error': 'Requested quantity exceeds available quantity.'}, status=status.HTTP_400_BAD_REQUEST)

class CompletedView(APIView):
    def get(self, request):
        user = request.user
        completed_books= CompletedBook.objects.filter(user_profile__user=user, recommended=True)
        # completed_books = CompletedBook.objects.all()
        completed_books_serializer = CompletedBookSerializer(completed_books, many=True)
        return Response(completed_books_serializer.data)

    def post(self, request):
        completed_books = request.data
        book_present = CompletedBook.objects.filter(book=completed_books.get('book.[open_library_id')).exists()
        # book_present = CompletedBook.objects.filter(CompletedBook.open_library_id=completed_books.book[open_library_id').exists()
        if book_present:
            return Response({"result":"book already completed"})
        
        serializer = CompletedBookPostSerializer(data=completed_books)
        if serializer.is_valid(raise_exception=True):
            completed_books_saved = serializer.save()
        return Response({"result":  "saved"})

class ToBeReadView(APIView):
    def post(self, request):
        to_be_read = request.data
        serializer = ToBeReadSerializer(data=to_be_read)
        if serializer.is_valid(raise_exception=True):
            to_be_read_saved = serializer.save()
        return Response({"result": "saved"})
    

# class UpdateRankView(APIView):
#     def put(self, request):
#         rank_data = request.data
#         for rank in rank_data:
#             book = TopFive.objects.get(book_id=)