from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import DeliveryJob, WarehouseReceipt
from .serializers import DeliveryJobSerializer
from .services import QualityControlService
from marketplace.models import FarmerOffer
from core.permissions import IsDriver, IsAgent

class DeliveryJobViewSet(viewsets.ModelViewSet):
    serializer_class = DeliveryJobSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'DRIVER':
            # Drivers only see pending jobs or jobs assigned directly to them
            return DeliveryJob.objects.filter(driver__isnull=True) | DeliveryJob.objects.filter(driver=user)
        return DeliveryJob.objects.all()

    @action(detail=True, methods=['post'], permission_classes=[IsDriver])
    def accept_job(self, request, pk=None):
        """
        Custom endpoint: POST /api/logistics/deliveries/{id}/accept_job/
        Drivers use this to claim a delivery.
        """
        job = self.get_object()
        if job.status != DeliveryJob.DeliveryStatus.PENDING:
            return Response({"detail": "Job is no longer available."}, status=status.HTTP_400_BAD_REQUEST)
        
        job.driver = request.user
        job.status = DeliveryJob.DeliveryStatus.ACCEPTED
        job.save()
        return Response({"detail": "Job accepted successfully."})

class WarehouseActionViewSet(viewsets.ViewSet):
    """
    A custom ViewSet purely for triggering warehouse operations.
    """
    permission_classes = [IsAgent]

    @action(detail=False, methods=['post'])
    def grade_product(self, request):
        """
        Custom endpoint: POST /api/logistics/warehouse/grade_product/
        Agents use this to log the quality of the farmer's delivery.
        """
        offer_id = request.data.get('farmer_offer_id')
        grade = request.data.get('grade')

        try:
            offer = FarmerOffer.objects.get(id=offer_id)
            # Call the secure service we built in Phase 6
            receipt = QualityControlService.grade_delivery(farmer_offer=offer, grade=grade)
            return Response({"detail": f"Product graded as {grade}. Trust score updated."})
        except FarmerOffer.DoesNotExist:
            return Response({"detail": "Offer not found."}, status=status.HTTP_404_NOT_FOUND)