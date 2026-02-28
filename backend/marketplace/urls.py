from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.views import OrderRequestViewSet, ProductCategoryViewSet # Import it

router = DefaultRouter()
router.register(r'orders', OrderRequestViewSet, basename='order')
router.register(r'categories', ProductCategoryViewSet, basename='category') # Register it

urlpatterns = [
    path('', include(router.urls)),
]