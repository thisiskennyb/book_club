from django.urls import path
from . import views

urlpatterns = [
    path('', views.BookClubView.as_view()),
    path('<int:pk>', views.BookClubView.as_view()),
]