from django.contrib import admin
from django.urls import path
from .views import *

from . import views

urlpatterns = [
    path('register/', CustomUserRegister.as_view(), name='register_user'),
    path('events/', views.ListEvent.as_view()),
    path('events/<int:pk>/', views.DetailEvent.as_view()),
    path('users/', views.ListEventUser.as_view()),
    path('users/me/', views.DetailUserMe.as_view()),
    path('contactlists/<int:pk>/', views.DetailContactList.as_view()),
]