#chickenbiryani

from django.shortcuts import render, HttpResponse

#for api, import below
from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer


# Create your views here.
def home(request):
    return HttpResponse("hello")

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all() #fetching all objects
    serializer_class = TodoSerializer #and applying serializer that we created on data