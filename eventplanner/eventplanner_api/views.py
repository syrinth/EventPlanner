from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.contrib import messages
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt 
from django.conf import settings
from django.shortcuts import render, redirect
from uuid import uuid4

from .models import Event, EventUser, ContactList
from .serializers import EventSerializer, EventUserSerializer, ContactListSerializer, RegisterUserSerializer

#User Views
class CustomUserRegister(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            newuser = reg_serializer.save()
            if newuser:
                return Response("User successfully registered!", status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
class ListEventUser(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = EventUser.objects.all()
    serializer_class = EventUserSerializer


class DetailUserMe(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        menuItem = EventUser.objects.get(pk=self.request.user.id)
        serializer = EventUserSerializer(menuItem)
        return Response(serializer.data, status = status.HTTP_200_OK)


#Event Views
class ListEvent(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    def get_queryset(self):
        return Event.objects.filter(owner=self.request.user.id)
    
    def post(self, request, *args, **kwargs):
        request.data["owner"] = self.request.user.id
        serializer = EventSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class DetailEvent(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


#ContactList Views
class ListContactList(generics.ListCreateAPIView):
    queryset = ContactList.objects.all()
    serializer_class = ContactListSerializer


class DetailContactList(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactList.objects.all()
    serializer_class = ContactListSerializer