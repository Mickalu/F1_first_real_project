from django.contrib import admin
from django.urls import path
from F1_main_app.views.base import *
from F1_main_app.views.reglages import *

urlpatterns = [
    path('', index, name="F1-main-index-page"),
    path('reglages/', reglages, name="reglages"),
]