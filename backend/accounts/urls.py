from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SignupView, PageAmount, PageAmountUser, DecreasePages, Leaderboard

urlpatterns = [
    path('get-token', obtain_auth_token),
    path('signup/', SignupView.as_view()),
    path('page-amount/', PageAmount.as_view(), name='page-amount-logged-in'),
    path('page-amount/<int:pk>', PageAmountUser.as_view(), name='page-amount-specific-user'),
    path('page-decrease/', DecreasePages.as_view(), name='decrease-pages'),
    path('leaderboard/', Leaderboard.as_view(), name='leaderboard')
]