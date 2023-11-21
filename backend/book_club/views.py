from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import BookClub, MessageBoardPost
from .serializers import BookClubSerializer, BookClubPostSerializer, MessageBoardPostSerializer, MessageBoardSerializer
from book.models import Book

class BookClubView(APIView):
    def get(self, request, pk=None):
        userid = request.user.id
        if pk==None:
            try:
                book_club_data = BookClub.objects.all().order_by('name')
                if not book_club_data:
                    
                    return Response({"error": "No clubs found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = BookClubSerializer(book_club_data, many=True)
                return Response({"result": serializer.data, "myid":userid}, status=status.HTTP_200_OK)
            except Exception as e:
                
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            book_club_data = BookClub.objects.get(pk=pk)
            serializer = BookClubSerializer(book_club_data)
            member = book_club_data.members.filter(id=userid).exists()
            return Response({"result": serializer.data, "member":member, "myid":userid})
        
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
    
    def delete(self, request, pk):
        bookclub= get_object_or_404(BookClub, pk=pk)
        bookclub.delete()
        return Response({"result": "club deleted"}, status=status.HTTP_204_NO_CONTENT)
    
class MyBookClubsView(APIView):
    def get(self, request):
        userid = request.user.id
        book_club_data = BookClub.objects.filter(members=userid)
        serializer = BookClubSerializer(book_club_data, many=True)
        return Response({"result": serializer.data})
    
class MemberBookClubView(APIView):
    def get(self, request, pk):
        book_club_data = BookClub.objects.filter(members=pk)
        serializer = BookClubSerializer(book_club_data, many=True)
        return Response({"result": serializer.data})
    
class BookClubMessageBoard(APIView):
    def get(self, request, pk):
        
        book_club_data = MessageBoardPost.objects.filter(bookclub=pk).order_by("-time")
        if book_club_data.exists():
            serializer = MessageBoardSerializer(book_club_data, many=True)
            return Response({"result": serializer.data})
        else:
            return Response({"result": "Be the first to post"})
    
    def post(self, request, pk):
        messagePost= request.data
        messagePost["bookclub"]=pk
        
        messagePost["user"] = request.user.id
        serializer = MessageBoardPostSerializer(data=messagePost)
        if serializer.is_valid():
            addedMessage = serializer.save()
            return Response({"result": f"{addedMessage.message} saved"})
        else:
            errors = serializer.errors  
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        message = get_object_or_404(MessageBoardPost, pk=pk)
        message.delete()
        return Response({"result": "Message deleted"}, status=status.HTTP_204_NO_CONTENT)