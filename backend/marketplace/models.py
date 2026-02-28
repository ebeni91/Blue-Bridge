import uuid
from django.db import models
from core.models import FarmerProfile, User

class ProductCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True) # e.g., Teff, Coffee [cite: 3]
    base_price_per_kg = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class ActiveHarvest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    farmer = models.ForeignKey(FarmerProfile, on_delete=models.CASCADE, related_name='harvests')
    category = models.ForeignKey(ProductCategory, on_delete=models.PROTECT)
    available_weight_kg = models.DecimalField(max_digits=10, decimal_places=2)
    region = models.CharField(max_length=100, db_index=True)

    def __str__(self):
        return f"{self.category.name} - {self.farmer.user.username} ({self.available_weight_kg}kg)"

class OrderRequest(models.Model):
    class OrderState(models.TextChoices):
        REQUESTED = 'REQUESTED', 'Requested'
        MATCHING = 'MATCHING', 'Matching'
        FARMER_ACCEPTED = 'FARMER_ACCEPTED', 'Farmer Accepted'
        AWAITING_PAYMENT = 'AWAITING_PAYMENT', 'Awaiting Payment'
        ESCROW_LOCKED = 'ESCROW_LOCKED', 'Escrow Locked'
        AT_WAREHOUSE = 'AT_WAREHOUSE', 'At Warehouse'
        OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY', 'Out For Delivery'
        DELIVERED = 'DELIVERED', 'Delivered'
        COMPLETED = 'COMPLETED', 'Completed'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    category = models.ForeignKey(ProductCategory, on_delete=models.PROTECT)
    requested_weight_kg = models.IntegerField() # Enforces fixed weights like 25, 50 [cite: 6]
    target_region = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=OrderState.choices, default=OrderState.REQUESTED)
    total_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True) # Dynamic pricing applied here [cite: 8]
    created_at = models.DateTimeField(auto_now_add=True)

class FarmerOffer(models.Model):
    """Tracks which farmers were asked to fulfill an order and their responses[cite: 4, 5]."""
    class OfferStatus(models.TextChoices):
        PENDING = 'PENDING', 'Pending (SMS Sent)'
        ACCEPTED = 'ACCEPTED', 'Accepted'
        REJECTED = 'REJECTED', 'Rejected'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_request = models.ForeignKey(OrderRequest, on_delete=models.CASCADE, related_name='farmer_offers')
    farmer = models.ForeignKey(FarmerProfile, on_delete=models.CASCADE)
    allocated_weight_kg = models.DecimalField(max_digits=10, decimal_places=2) # Supports auto-clustering parts of a large order [cite: 7]
    status = models.CharField(max_length=20, choices=OfferStatus.choices, default=OfferStatus.PENDING)