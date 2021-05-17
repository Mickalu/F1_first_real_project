from django.shortcuts import render
from F1_main_app.models import Grand_Prix, Driver, Team
from F1_main_app.forms.forms import Grand_Prix_form
from django.contrib.auth.models import User

from django.http import JsonResponse
import datetime

