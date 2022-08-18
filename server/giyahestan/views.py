from django.shortcuts import render
from django.shortcuts import HttpResponse
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated


def home(request):
    return HttpResponse("home page")


