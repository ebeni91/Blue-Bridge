from django.db import transaction
from django.utils import timezone
from .models import EscrowAccount
from marketplace.models import OrderRequest

class EscrowService:
    @staticmethod
    @transaction.atomic
    def lock_funds(order: OrderRequest, amount_paid: float):
        """
        Triggered when the buyer successfully pays via the payment gateway.
        Locks the money in the platform's digital vault.
        """
        # 1. Security Check: Is the order actually waiting for payment?
        if order.status != OrderRequest.OrderState.AWAITING_PAYMENT:
            raise ValueError("Funds can only be locked for orders awaiting payment.")

        # 2. Update or Create the Escrow Account
        escrow, created = EscrowAccount.objects.get_or_create(
            order=order,
            defaults={'amount': amount_paid, 'status': EscrowAccount.EscrowStatus.PENDING}
        )

        # 3. Lock it
        escrow.status = EscrowAccount.EscrowStatus.LOCKED
        escrow.locked_at = timezone.now()
        escrow.save()

        # 4. Advance the order status so the farmer knows it's safe to deliver
        order.status = OrderRequest.OrderState.ESCROW_LOCKED
        order.save(update_fields=['status'])
        
        return escrow

    @staticmethod
    @transaction.atomic
    def release_funds(order: OrderRequest):
        """
        Triggered ONLY when the buyer confirms delivery, or the driver marks it delivered.
        Releases the money to the farmer's wallet/bank.
        """
        escrow = EscrowAccount.objects.select_for_update().get(order=order)

        if escrow.status != EscrowAccount.EscrowStatus.LOCKED:
            raise ValueError("Can only release funds that are currently locked.")
        
        if order.status != OrderRequest.OrderState.DELIVERED:
            raise ValueError("Cannot release funds until the product is explicitly delivered.")

        # In a real application, you would call your payment gateway payout API here.
        # e.g., Telebirr.transfer(amount=escrow.amount, to=order.farmer.bank_account)

        escrow.status = EscrowAccount.EscrowStatus.RELEASED
        escrow.released_at = timezone.now()
        escrow.save()

        order.status = OrderRequest.OrderState.COMPLETED
        order.save(update_fields=['status'])

        return escrow