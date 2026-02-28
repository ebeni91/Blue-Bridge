from decimal import Decimal
from django.db import transaction
from django.db.models import F
from .models import OrderRequest, ActiveHarvest, FarmerOffer

class MatchingEngineService:
    @staticmethod
    @transaction.atomic
    def process_order_request(order: OrderRequest):
        """
        Finds farmers with active harvests in the target region and creates offers.
        Uses database transactions to ensure data integrity.
        """
        # 1. Update order status to indicate the engine is running
        order.status = OrderRequest.OrderState.MATCHING
        order.save(update_fields=['status'])

        remaining_weight_needed = Decimal(str(order.requested_weight_kg))

        # 2. Find eligible farmers in the requested region
        # SECURITY & CONCURRENCY: select_for_update() locks these rows in PostgreSQL.
        # If two buyers order Teff from Shewa at the exact same millisecond, 
        # the database processes them one at a time so inventory isn't oversold.
        eligible_harvests = ActiveHarvest.objects.select_for_update().filter(
            category=order.category,
            region=order.target_region,
            available_weight_kg__gt=0,
            farmer__is_active=True
        ).order_by(
            '-farmer__trust_score', # Sort by highest trust score first
            '-available_weight_kg'  # Then by who has the most inventory
        )

        offers_created = []

        # 3. Auto-Clustering Loop
        for harvest in eligible_harvests:
            if remaining_weight_needed <= 0:
                break # Order is fully allocated

            # Determine how much we can take from this specific farmer
            allocation = min(harvest.available_weight_kg, remaining_weight_needed)

            # Create the pending offer (This triggers the SMS/USSD system later)
            offer = FarmerOffer.objects.create(
                order_request=order,
                farmer=harvest.farmer,
                allocated_weight_kg=allocation,
                status=FarmerOffer.OfferStatus.PENDING
            )
            offers_created.append(offer)

            # Deduct from the remaining needed weight
            remaining_weight_needed -= allocation

            # IMPORTANT: We do NOT deduct the harvest's available_weight_kg yet.
            # We only reserve/deduct it when the farmer replies '1' to accept the SMS.

        # 4. Check if we found enough inventory
        if remaining_weight_needed > 0:
            # We couldn't fulfill the whole order. 
            # In a production system, you might flag this for an admin or alert the buyer.
            # For this MVP, we will rollback the transaction by raising an exception,
            # or you can choose to fulfill a partial order. Let's raise an error to fail safe.
            raise ValueError(f"Insufficient supply in {order.target_region}. Short by {remaining_weight_needed}kg.")

        return offers_created