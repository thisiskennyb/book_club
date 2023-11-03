from django.urls import path
from . import views

urlpatterns = [
    path('title/', views.TitleView.as_view()),
    path('author/', views.AuthorView.as_view()),
    path('subject/', views.SubjectView.as_view()),

]