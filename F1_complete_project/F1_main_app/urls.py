from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('', admin.site.urls),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)