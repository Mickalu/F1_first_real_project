from django.contrib import admin
from django.urls import path
from F1_main_app.views.base import *
from F1_main_app.views.reglages import *

urlpatterns = [
    path('', index, name="index"),
    path('reglages/', reglages, name="reglages"),
    path('reglages/drivers', reglages_drivers, name="reglages_drivers"),
    path('reglages/teams', reglages_teams, name="reglages_teams"),
    path('reglages/grand_prixs', reglages_grandprixs, name="reglages_grandprixs"),
]