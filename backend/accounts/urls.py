from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SignupView, PageAmount

urlpatterns = [
    path('get-token', obtain_auth_token),
    path('signup/', SignupView.as_view()),
    path('pages/', PageAmount.as_view()),
    
]