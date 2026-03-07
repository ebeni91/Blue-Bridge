import uuid
from django.db import models
from marketplace.models import SupplyRequest # <-- Updated to the new model!
from core.models import User

class WarehouseReceipt(models.Model):
    class QualityGrade(models.TextChoices):
        A = 'A', 'Premium'
        B = 'B', 'Standard'
        C = 'C', 'Subpar (Trust Score Penalty)'
        REJECTED = 'REJECTED', 'Rejected'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # Linked directly to the central SupplyRequest workflow
    supply_request = models.OneToOneField(SupplyRequest, on_delete=models.CASCADE, related_name='warehouse_receipt')
    grade = models.CharField(max_length=10, choices=QualityGrade.choices)
    received_at = models.DateTimeField(auto_now_add=True)

class DeliveryJob(models.Model):
    class DeliveryStatus(models.TextChoices):
        PENDING = 'PENDING', 'Waiting for Driver'
        ACCEPTED = 'ACCEPTED', 'Driver Assigned'
        PICKED_UP = 'PICKED_UP', 'In Transit'
        DELIVERED = 'DELIVERED', 'Delivered to Buyer'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.OneToOneField(SupplyRequest, on_delete=models.CASCADE, related_name='delivery') # <-- Updated here
    driver = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, limit_choices_to={'role': 'DRIVER'})
    status = models.CharField(max_length=20, choices=DeliveryStatus.choices, default=DeliveryStatus.PENDING)
    tracking_number = models.CharField(max_length=50, unique=True, null=True, blank=True) 

    def __str__(self):
        return f"Delivery {self.tracking_number} - {self.status}"