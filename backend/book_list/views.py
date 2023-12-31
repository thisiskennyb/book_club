
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status
from .serializers import TopFiveSerializer, ToBeReadPostSerializer, CompletedBookSerializer, ToBeReadSerializer, CompletedBookPostSerializer, OthersCompletedSerializer
from .models import ToBeRead, TopFive, CompletedBook
from accounts.models import UserProfile, User
from book.models import Book
class BookListView(APIView):
    def get(self, request, pk=None):
       user = request.user
       if pk is not None:
           user= User.objects.get(pk=pk)
       tbr_books= ToBeRead.objects.filter(user_profile__user=user)
       tbr_serializer = ToBeReadSerializer(tbr_books, many=True)
       recommended= CompletedBook.objects.filter(user_profile__user=user, recommended=True)
       recommended_serializer = CompletedBookSerializer(recommended, many=True)
       completed_books= CompletedBook.objects.filter(user_profile__user=user).order_by("date_finished")
       completed_books_serializer = CompletedBookSerializer(completed_books, many=True)
       data = {
           "tbr": tbr_serializer.data,
           "recommended":recommended_serializer.data,
           "completed_books":completed_books_serializer.data

       }
       return Response(data)




# class TopFiveView(APIView):
#     def post(self, request):
#         top_five = request.data
#         serializer = TopFiveSerializer(data=top_five)
#         if serializer.is_valid(raise_exception=True):
#             top_five_saved = serializer.save()
#         return Response({"result": "saved"})

class CompletedView(APIView):
    def get(self, request):
        user = request.user
        completed_books= CompletedBook.objects.filter(user_profile__user=user)
        # completed_books = CompletedBook.objects.all()
        completed_books_serializer = CompletedBookSerializer(completed_books, many=True)
        return Response(completed_books_serializer.data)

    def post(self, request):
        completed_books = request.data
        # bookID =request.data['book']['id']
        completed_books['user_profile']=request.user.id
        # book = get_object_or_404(Book, open_library_id=completed_books['book']['open_library_id'])
        book = Book.get_or_create_book(completed_books)
        bookID= book.pk
        book_present = CompletedBook.objects.filter(book=book, user_profile=request.user.id).exists()
        if book_present:
            legacy_book = get_object_or_404(CompletedBook, book=book, user_profile=request.user.id)
            return Response({"result":"Book already in completed list","pk":legacy_book.pk})
        completed_books['book']=bookID
        serializer = CompletedBookPostSerializer(data=completed_books)
        if serializer.is_valid(raise_exception=True):
            completed_books_saved = serializer.save()
        return Response({"result": f"{completed_books_saved.book.title} Added to completed list","pk":completed_books_saved.pk})
    
    def put(self, request, pk):
        user = request.user
        completed_book = get_object_or_404(CompletedBook, user_profile__user=user, pk=pk)

        # Toggle the 'recommended' field value
        completed_book.recommended = not completed_book.recommended
        completed_book.save()

        # Serialize the updated object and return it
        serializer = CompletedBookSerializer(completed_book)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request, pk):
        user = request.user
        completed_book = get_object_or_404(CompletedBook, user_profile__user=user, pk=pk)
        completed_book.user_rating = request.data.get('rating')
        completed_book.save()
        
        return Response({"result": "Book UpDated"})

    
    def delete(self, request, pk):
        user = request.user
        completed_book = get_object_or_404(CompletedBook, user_profile__user=user, pk=pk)

        completed_book.delete()
        return Response({"result": "Book deleted"}, status=status.HTTP_204_NO_CONTENT)
 


class ToBeReadView(APIView):
    def post(self, request):
        tbr_book = request.data
        # bookID =request.data['book']['id']
        tbr_book['user_profile']=request.user.id
        # book = get_object_or_404(Book, open_library_id=tbr_book['book']['open_library_id'])
        book = Book.get_or_create_book(tbr_book)
        bookID= book.pk
       
        book_present = ToBeRead.objects.filter(book=book, user_profile=request.user.id).exists()
        

        if book_present:
            return Response({"result": "Book already in to be read list"})
        tbr_book['book']=bookID
        serializer = ToBeReadPostSerializer(data=tbr_book)
        if serializer.is_valid(raise_exception=True):
            completed_tbr_book = serializer.save()
        return Response({"result": f"{completed_tbr_book.book.title} added to tbr list"})



    def delete(self, request, pk):
        user = request.user
        book_tbr = get_object_or_404(ToBeRead, user_profile__user=user, pk=pk)

        book_tbr.delete()
        return Response({"result": "Book deleted"}, status=status.HTTP_204_NO_CONTENT)
    

    # def delete(self, request, pk):
    #     user = request.user
    #     completed_book = get_object_or_404(CompletedBook, user_profile__user=user, pk=pk)

    #     completed_book.delete()
    #     return Response({"result": "Book deleted"}, status=status.HTTP_204_NO_CONTENT)


class OthersCompletedView(APIView):
    def get(self, request, OLID):
        try:
            book = Book.objects.get(open_library_id=OLID)
            completed_books = CompletedBook.objects.filter(book=book)
            if completed_books.exists():  
                serializer = OthersCompletedSerializer(completed_books, many=True)
                serialized_data = serializer.data
                return Response({'other_readers': serialized_data})
            else:
                return Response({'other_readers': 'Be the first to read this'}, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response({'other_readers': 'Be the first to read this'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)