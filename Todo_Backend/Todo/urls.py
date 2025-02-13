from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet #which we created

router = DefaultRouter()

router.register(r'todos' ,TodoViewSet)

urlpatterns = [
    path('',include(router.urls))
]
