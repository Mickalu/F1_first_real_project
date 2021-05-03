from django.contrib import admin
from django.urls import path
from users.views.register import *


urlpatterns = [
    path('', register, name="register"),
]