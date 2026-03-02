from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserRegistrationViewSet, FarmerProfileViewSet, BuyerDashboardView

router = DefaultRouter()
router.register(r'register', UserRegistrationViewSet, basename='register')
router.register(r'farmers', FarmerProfileViewSet, basename='farmer')

urlpatterns = [
    # The new Dashboard Endpoint (http://localhost:8000/api/core/buyer/dashboard/)
    path('buyer/dashboard/', BuyerDashboardView.as_view(), name='buyer-dashboard'),
    
    # The Default Router Endpoints
    path('', include(router.urls)),
]