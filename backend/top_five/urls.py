# urls.py

from django.urls import path
from .views import UpdateTopFiveView

urlpatterns = [
    # Other URLs...
    path('', UpdateTopFiveView.as_view(), name='update_top_five'),

]
