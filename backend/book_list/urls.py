from django.urls import path
from . import views

urlpatterns = [
    path('', views.BookListView.as_view()),
    path('top-five/', views.TopFiveView.as_view()),
    path('completed/', views.CompletedView.as_view()),
    path('to-be-read/', views.ToBeReadView.as_view()),
    # path('update/', views.UpdateRankView.as_view()),
]