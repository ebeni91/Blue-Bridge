from rest_framework import viewsets, permissions
from ..models import Category, Product, SupplyRequest
from ..serializers import CategorySerializer, ProductSerializer, SupplyRequestSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    # Only show active products to the public
    queryset = Product.objects.filter(is_active=True) 
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

class SupplyRequestViewSet(viewsets.ModelViewSet):
    serializer_class = SupplyRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Admins see everything, Buyers only see their own requests
        if user.role in ['SUPER_ADMIN', 'ADMIN']:
            return SupplyRequest.objects.all()
        return SupplyRequest.objects.filter(buyer=user)

    def perform_create(self, serializer):
        # Automatically attach the logged-in buyer to the request
        serializer.save(buyer=self.request.user)