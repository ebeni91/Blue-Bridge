from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AgentFarmerViewSet, UserRegistrationViewSet, FarmerProfileViewSet, BuyerDashboardView, AdminAgentViewSet, AdminFarmerViewSet

router = DefaultRouter()
router.register(r'register', UserRegistrationViewSet, basename='register')
router.register(r'farmers', FarmerProfileViewSet, basename='farmer')
router.register(r'agent/farmers', AgentFarmerViewSet, basename='agent-farmers')
router.register(r'admin/agents', AdminAgentViewSet, basename='admin-agents')
router.register(r'admin/farmers', AdminFarmerViewSet, basename='admin-farmers')

urlpatterns = [
    # The new Dashboard Endpoint (http://localhost:8000/api/core/buyer/dashboard/)
    path('buyer/dashboard/', BuyerDashboardView.as_view(), name='buyer-dashboard'),
    
    # The Default Router Endpoints
    path('', include(router.urls)),
]