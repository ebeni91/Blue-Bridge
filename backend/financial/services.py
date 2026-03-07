from django.db import transaction
from django.utils import timezone
from .models import EscrowAccount
from marketplace.models import SupplyRequest

class EscrowService:
    @staticmethod
    @transaction.atomic
    def lock_funds(order: SupplyRequest, amount_paid: float):
        # Only allow funding if Farmer has accepted
        if order.status != SupplyRequest.RequestStatus.ACCEPTED:
            raise ValueError("Funds can only be locked for orders awaiting payment.")

        escrow, created = EscrowAccount.objects.get_or_create(
            order=order,
            defaults={'amount': amount_paid, 'status': EscrowAccount.EscrowStatus.PENDING}
        )

        escrow.status = EscrowAccount.EscrowStatus.LOCKED
        escrow.locked_at = timezone.now()
        escrow.save()

        # Advance status
        order.status = SupplyRequest.RequestStatus.PAYMENT_COMPLETE
        order.save(update_fields=['status'])
        
        return escrow

    @staticmethod
    @transaction.atomic
    def release_funds(order: SupplyRequest):
        escrow = EscrowAccount.objects.select_for_update().get(order=order)

        if escrow.status != EscrowAccount.EscrowStatus.LOCKED:
            raise ValueError("Can only release funds that are currently locked.")
        
        if order.status != SupplyRequest.RequestStatus.DELIVERED:
            raise ValueError("Cannot release funds until the product is explicitly delivered.")

        escrow.status = EscrowAccount.EscrowStatus.RELEASED
        escrow.released_at = timezone.now()
        escrow.save()

        return escrow