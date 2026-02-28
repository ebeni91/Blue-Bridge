from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserRegistrationViewSet, FarmerProfileViewSet

router = DefaultRouter()
router.register(r'register', UserRegistrationViewSet, basename='register')
router.register(r'farmers', FarmerProfileViewSet, basename='farmer')

urlpatterns = [
    path('', include(router.urls)),
]