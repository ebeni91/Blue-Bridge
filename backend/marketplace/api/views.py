from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models import Category, Product, SupplyRequest
from ..serializers import CategorySerializer, ProductSerializer, SupplyRequestSerializer
from core.models import User

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True) 
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

class SupplyRequestViewSet(viewsets.ModelViewSet):
    serializer_class = SupplyRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['SUPER_ADMIN', 'ADMIN']:
            return SupplyRequest.objects.all().order_by('-created_at')
        return SupplyRequest.objects.filter(buyer=user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)

    # --- NEW: ADMIN PROCESS ENGINE API ---
    @action(detail=True, methods=['patch'])
    def process(self, request, pk=None):
        user = request.user
        if user.role not in ['SUPER_ADMIN', 'ADMIN']:
            return Response({"error": "Only Admins can process requests."}, status=status.HTTP_403_FORBIDDEN)
        
        supply_request = self.get_object()
        new_status = request.data.get('status')
        price = request.data.get('final_agreed_price')

        if new_status:
            supply_request.status = new_status
        if price:
            supply_request.final_agreed_price = price
            
        supply_request.save()
        
        return Response(SupplyRequestSerializer(supply_request).data)