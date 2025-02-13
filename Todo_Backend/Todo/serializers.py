from dataclasses import field
from rest_framework import serializers
from . models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta :
        model = Todo
        fields = '__all__' #for all fields serialize them , from here go to views to create api
    