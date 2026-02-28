from decimal import Decimal
from django.db import transaction
from .models import WarehouseReceipt
from marketplace.models import FarmerOffer, OrderRequest

class QualityControlService:
    # We define how much the score changes based on the grade
    SCORE_ADJUSTMENTS = {
        WarehouseReceipt.QualityGrade.A: Decimal('2.00'),       # Premium: +2 points
        WarehouseReceipt.QualityGrade.B: Decimal('0.50'),       # Standard: +0.5 points
        WarehouseReceipt.QualityGrade.C: Decimal('-5.00'),      # Subpar: -5 points penalty
        WarehouseReceipt.QualityGrade.REJECTED: Decimal('-15.00') # Rejected: Massive penalty
    }

    @staticmethod
    @transaction.atomic
    def grade_delivery(farmer_offer: FarmerOffer, grade: str):
        """
        Grades the product at the warehouse and permanently adjusts the farmer's trust score.
        """
        # 1. Create the receipt
        receipt = WarehouseReceipt.objects.create(
            farmer_offer=farmer_offer,
            grade=grade
        )

        # 2. Calculate new trust score
        farmer_profile = farmer_offer.farmer
        adjustment = QualityControlService.SCORE_ADJUSTMENTS.get(grade, Decimal('0.00'))
        
        new_score = farmer_profile.trust_score + adjustment

        # 3. Clamp the score strictly between 0 and 100
        new_score = max(Decimal('0.00'), min(Decimal('100.00'), new_score))
        
        farmer_profile.trust_score = new_score
        farmer_profile.save(update_fields=['trust_score'])

        # 4. If the product is good, advance the order state
        if grade in [WarehouseReceipt.QualityGrade.A, WarehouseReceipt.QualityGrade.B]:
            order = farmer_offer.order_request
            order.status = OrderRequest.OrderState.AT_WAREHOUSE
            order.save(update_fields=['status'])
        else:
            # If rejected, you would trigger logic to find a replacement farmer here
            pass

        return receipt