from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import Book
from .serializers import BookSerializer


class BookView(APIView):
    def get(self, request):
        try:
            book_data = Book.objects.all()
            if not book_data:
                # If there are no books, return a 404 response
                return Response({"error": "No books found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = BookSerializer(book_data, many=True)
            return Response({"result": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            # Handle other exceptions (e.g., database errors) with an appropriate status code
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request):
        book = request.data
        serializer = BookSerializer(data=book)
        if serializer.is_valid(raise_exception=True):
            book_saved = serializer.save()
        return Response({"result": f"{book_saved.title} saved"})


        