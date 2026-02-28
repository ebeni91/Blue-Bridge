from rest_framework import viewsets, status
from rest_framework.response import Response
from ..models import OrderRequest
from ..serializers import OrderRequestSerializer
from ..services import MatchingEngineService

class OrderRequestViewSet(viewsets.ModelViewSet):
    serializer_class = OrderRequestSerializer
    
    # Security: Ensure buyers only see their own orders
    def get_queryset(self):
        user = self.request.user
        if user.role == 'SUPER_ADMIN' or user.role == 'ADMIN':
            return OrderRequest.objects.all()
        return OrderRequest.objects.filter(buyer=user)

    def perform_create(self, serializer):
        # 1. Save the order attached to the current user
        order = serializer.save(buyer=self.request.user)
        
        # 2. Trigger the matching engine immediately after the order is saved
        try:
            MatchingEngineService.process_order_request(order)
        except ValueError as e:
            # If the matching engine fails (e.g., not enough inventory)
            # we capture the error and tell the frontend
            order.delete() # Clean up the unfulfillable request
            raise serializers.ValidationError({"detail": str(e)})