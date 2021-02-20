from django.contrib import admin
from django.urls import include, path 

urlpatterns = [
    path('diagram/', include('diagram.urls')),
    path('admin/', admin.site.urls),
]
