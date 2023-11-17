from django.urls import path
from . import views

urlpatterns = [
    path('', views.BookClubView.as_view()),
]