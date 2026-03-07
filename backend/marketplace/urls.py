from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.views import CategoryViewSet, ProductViewSet, SupplyRequestViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'supply-requests', SupplyRequestViewSet, basename='supply-request')

urlpatterns = [
    path('', include(router.urls)),
]