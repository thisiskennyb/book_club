# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import UserProfile

class UpdateTopFiveView(APIView):
    def get(self, request):
        user = request.user
        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        top_five_books = user_profile.top_five_books
        return Response({'top_five_books': top_five_books}, status=status.HTTP_200_OK)
    def post(self, request):
        user = request.user
        top_five_books = request.data.get('top_five', [])

        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        user_profile.top_five_books = top_five_books
        user_profile.save()

        return Response({'success': 'Top five books updated successfully.'}, status=status.HTTP_200_OK)

