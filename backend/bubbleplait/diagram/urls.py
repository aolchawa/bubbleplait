from django.urls import path

from .views import DataApi

urlpatterns = [
    path('', DataApi.as_view(), name='api'),
]
