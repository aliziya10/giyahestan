from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Account
from django.contrib.auth.forms import UserCreationForm
from django import forms

# class UserSerializer(serializers.ModelSerializer):
class UserSerializer(UserCreationForm):
    password2 = forms.CharField(max_length=40)
    class Meta:
        model = User
        fields = ("id",'username','email','password1',"password2")



    def create(self, validated_data):
        Account.objects.create(
            email=validated_data['email'],
            password=validated_data['password']
        ).save()

        user = User.objects.create(
            username=validated_data['email'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
