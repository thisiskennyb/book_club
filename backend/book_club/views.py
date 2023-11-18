from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import BookClub
from .serializers import BookClubSerializer, BookClubPostSerializer
from book.models import Book

class BookClubView(APIView):
    def get(self, request, pk=None):
        if pk==None:
            try:
                book_club_data = BookClub.objects.all().order_by('name')
                if not book_club_data:
                    
                    return Response({"error": "No books found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = BookClubSerializer(book_club_data, many=True)
                return Response({"result": serializer.data}, status=status.HTTP_200_OK)
            except Exception as e:
                
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            userid = request.user.id
            book_club_data = BookClub.objects.get(pk=pk)
            serializer = BookClubSerializer(book_club_data)
            member = book_club_data.members.filter(id=userid).exists()
            return Response({"result": serializer.data, "member":member})
        
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
        
    def patch(self, request, pk):
        print(request.data)
        userInstance = request.user
        club = BookClub.objects.get(pk=pk)
        if request.data['modifier'] == "join":
            club.members.add(userInstance)
        elif request.data['modifier'] == "leave":
            club.members.remove(userInstance)
        club.save()
   
        return Response({"result":"Operation successful"})
class MyBookClubsView(APIView):
    def get(self, request):
        userid = request.user.id
        book_club_data = BookClub.objects.filter(members=userid)
        serializer = BookClubSerializer(book_club_data, many=True)
        return Response({"result": serializer.data})