import uuid
from django.db import models
from marketplace.models import OrderRequest

class EscrowAccount(models.Model):
    class EscrowStatus(models.TextChoices):
        PENDING = 'PENDING', 'Pending Deposit'
        LOCKED = 'LOCKED', 'Funds Locked in Vault'
        RELEASED = 'RELEASED', 'Funds Paid to Farmer'
        REFUNDED = 'REFUNDED', 'Refunded to Buyer'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.OneToOneField(OrderRequest, on_delete=models.PROTECT, related_name='escrow')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=EscrowStatus.choices, default=EscrowStatus.PENDING)
    locked_at = models.DateTimeField(null=True, blank=True)
    released_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Escrow for Order {self.order.id} - {self.status}"