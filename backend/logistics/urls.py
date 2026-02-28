from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DeliveryJobViewSet, WarehouseActionViewSet

# The router automatically generates the /deliveries/ and /deliveries/{id}/ URLs
router = DefaultRouter()
router.register(r'deliveries', DeliveryJobViewSet, basename='delivery')
router.register(r'warehouse', WarehouseActionViewSet, basename='warehouse')

urlpatterns = [
    path('', include(router.urls)),
]