from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import BookClub
from .serializers import BookClubSerializer, BookClubPostSerializer
from book.models import Book

class BookClubView(APIView):
    def get(self, request):
        try:
            book_club_data = BookClub.objects.all()
            if not book_club_data:
                # If there are no books, return a 404 response
                return Response({"error": "No books found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = BookClubSerializer(book_club_data, many=True)
            return Response({"result": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            # Handle other exceptions (e.g., database errors) with an appropriate status code
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request):
        print(request.data)
        user_id = request.user.id
        book_club_data = request.data
        book_club_data['user'] = user_id
        print(book_club_data)
        serializer = BookClubPostSerializer(data=book_club_data)
        if serializer.is_valid():
            book_club_saved = serializer.save()
            return Response({"result": f"{book_club_saved.book} saved"})
        else:
            errors = serializer.errors  
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)