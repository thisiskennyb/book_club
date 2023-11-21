from django.urls import path
from . import views

urlpatterns = [
    path('', views.BookClubView.as_view()),
    path('<int:pk>', views.BookClubView.as_view()),
    path('clubs/<int:pk>', views.MemberBookClubView.as_view()),
    path('myclubs', views.MyBookClubsView.as_view()),
    path('message-board', views.BookClubMessageBoard.as_view()),
    path('message-board/<int:pk>', views.BookClubMessageBoard.as_view()),
]