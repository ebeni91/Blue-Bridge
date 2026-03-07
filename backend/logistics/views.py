from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import DeliveryJob, WarehouseReceipt
from .serializers import DeliveryJobSerializer
from .services import QualityControlService
from marketplace.models import SupplyRequest
from core.permissions import IsDriver, IsAgent

class DeliveryJobViewSet(viewsets.ModelViewSet):
    serializer_class = DeliveryJobSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'DRIVER':
            return DeliveryJob.objects.filter(driver__isnull=True) | DeliveryJob.objects.filter(driver=user)
        return DeliveryJob.objects.all()

    @action(detail=True, methods=['post'], permission_classes=[IsDriver])
    def accept_job(self, request, pk=None):
        job = self.get_object()
        if job.status != DeliveryJob.DeliveryStatus.PENDING:
            return Response({"detail": "Job is no longer available."}, status=status.HTTP_400_BAD_REQUEST)
        
        job.driver = request.user
        job.status = DeliveryJob.DeliveryStatus.ACCEPTED
        job.save()
        return Response({"detail": "Job accepted successfully."})

class WarehouseActionViewSet(viewsets.ViewSet):
    permission_classes = [IsAgent]

    @action(detail=False, methods=['post'])
    def grade_product(self, request):
        supply_request_id = request.data.get('supply_request_id')
        grade = request.data.get('grade')

        try:
            receipt = QualityControlService.grade_delivery(request_id=supply_request_id, grade=grade)
            return Response({"detail": f"Product graded as {grade}. Trust score updated."})
        except SupplyRequest.DoesNotExist:
            return Response({"detail": "Supply Request not found."}, status=status.HTTP_404_NOT_FOUND)