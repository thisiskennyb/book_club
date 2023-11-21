from rest_framework.generics import CreateAPIView
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.serializers import serialize
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny
from .models import UserProfile
import json

# handles request and parses body for username and password
class SignupView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            #create_user is special method. must be used to create user
            user = User.objects.create_user(username=username, password=password)
            user_profile = UserProfile(user=user)
            user_profile.save()

class PageAmount(APIView):

    def get(self, request, pk=None):
        user_profile = get_object_or_404(UserProfile, user=request.user)
        username = user_profile.user.username
        pages_completed = user_profile.pages_completed
        return Response({'username': username, 'pages_completed': pages_completed})

    
    def post(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        new_pages_completed = request.data.get('pages_completed')

        if new_pages_completed is not None:
            user_profile.pages_completed += new_pages_completed
            user_profile.save()
            return Response({'message': 'updated'})
        else:
            return Response({'error': 'Not updated'})
        
class PageAmountUser(APIView):

    def get(self, request, pk):
        user= User.objects.get(pk=pk)
        user = get_object_or_404(User, pk=pk)
        user_profile = get_object_or_404(UserProfile, user=user)
        username = user_profile.user.username
        pages_completed = user_profile.pages_completed

        return Response({'username': username, 'pages_completed': pages_completed})
    
class DecreasePages(APIView):
    def post(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        new_pages_completed = request.data.get('pages')

        if new_pages_completed is not None:
            user_profile.pages_completed -= new_pages_completed
            user_profile.save()
            return Response({'message': 'updated'})
        else:
            return Response({'error': 'Not updated'})