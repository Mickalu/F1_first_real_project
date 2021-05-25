from django.shortcuts import render
from F1_main_app.models import Grand_Prix, Driver, Team, Achivement
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core import serializers
import datetime

def module_image(request):
    
    context = locals() 
    return render(request, 'pages/module_image.html', context)