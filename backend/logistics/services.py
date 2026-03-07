from decimal import Decimal
from django.db import transaction
from .models import WarehouseReceipt
from marketplace.models import SupplyRequest

class QualityControlService:
    SCORE_ADJUSTMENTS = {
        WarehouseReceipt.QualityGrade.A: Decimal('2.00'),       
        WarehouseReceipt.QualityGrade.B: Decimal('0.50'),       
        WarehouseReceipt.QualityGrade.C: Decimal('-5.00'),      
        WarehouseReceipt.QualityGrade.REJECTED: Decimal('-15.00') 
    }

    @staticmethod
    @transaction.atomic
    def grade_delivery(request_id: str, grade: str):
        supply_request = SupplyRequest.objects.get(id=request_id)
        
        receipt = WarehouseReceipt.objects.create(
            supply_request=supply_request,
            grade=grade
        )

        # Update the Assigned Farmer's Trust Score
        if supply_request.assigned_farmer and hasattr(supply_request.assigned_farmer, 'farmer_profile'):
            farmer_profile = supply_request.assigned_farmer.farmer_profile
            adjustment = QualityControlService.SCORE_ADJUSTMENTS.get(grade, Decimal('0.00'))
            
            new_score = farmer_profile.trust_score + adjustment
            new_score = max(Decimal('0.00'), min(Decimal('100.00'), new_score))
            
            farmer_profile.trust_score = new_score
            farmer_profile.save(update_fields=['trust_score'])

        return receipt