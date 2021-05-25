from django.contrib import admin
from django.urls import path
from F1_main_app.views.base import *
from F1_main_app.views.reglages import *
from F1_main_app.views.drivers import *
from F1_main_app.views.module_image import *




urlpatterns = [
    path('', index, name="index"),
    path('reglages/', reglages, name="reglages"),
    path('reglages/drivers', reglages_drivers, name="reglages_drivers"),
    path('reglages/teams', reglages_teams, name="reglages_teams"),
    path('reglages/grand_prixs', reglages_grandprixs, name="reglages_grandprixs"),
    path('pages/drivers', page_drivers, name="page_drivers"),
    path('pages/ajax_drivers', ajax_drivers, name="ajax_drivers"),
    path('pages/module_image', module_image, name="module_image"),

]

from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)